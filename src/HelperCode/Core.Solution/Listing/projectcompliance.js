// Remove particles animation
$("div#particles-foreground, div#particles-background, .vertical-centered-box").animate(
    { opacity: 0 },
    {
        duration: 333,
        complete: function () {
            $("div#particles-foreground, div#particles-background, .vertical-centered-box").remove();
        },
    }
);

changeResources();

function sanitizeSharePointHTML(input) {
    if (!input) return '';
    return input
        .replace(/<[^>]+>/g, '')   // remove all tags like <p>, <div>, etc.
        .replace(/\n{2,}/g, '\n')
        .trim();
}

function normalizeRole(role) {
    return ((role || "") + "").trim().toLowerCase();
}

function isCurrentRole(roleName) {
    var target = normalizeRole(roleName);
    var candidates = [
        typeof currentUserRole !== "undefined" ? currentUserRole : "",
        typeof UserRole !== "undefined" ? UserRole : "",
        localStorage.getItem("userRole") || ""
    ];
    var expanded = [];
    candidates.forEach(function (r) {
        if (!r) return;
        expanded.push(r);
    });
    return expanded.some(function (r) { return normalizeRole(r) === target; });
}

function userHasAssignedRole(roleName) {
    var target = normalizeRole(roleName);
    if (!target) return false;

    var roles = [];
    function addRole(role) {
        var normalized = normalizeRole(role);
        if (normalized && roles.indexOf(normalized) === -1) {
            roles.push(normalized);
        }
    }

    addRole(typeof currentUserRole !== "undefined" ? currentUserRole : "");
    addRole(typeof UserRole !== "undefined" ? UserRole : "");
    addRole(localStorage.getItem("userRole") || "");

    if (typeof GroupItem !== "undefined" && GroupItem && GroupItem.length) {
        for (var i = 0; i < GroupItem.length; i++) {
            if (GroupItem[i] && GroupItem[i].Role) {
                addRole(GroupItem[i].Role);
            }
        }
    }

    if (typeof Groups !== "undefined" && Groups && Groups.length) {
        if (Groups.indexOf("Initiative Manager") > -1) {
            addRole("InitiativeManager");
        }
        if (Groups.indexOf("Project Managers for Project Web App") > -1) {
            addRole("ProjectManager");
        }
    }

    if (typeof isInManager !== "undefined" && isInManager) {
        addRole("InitiativeManager");
    }
    if (typeof isPManager !== "undefined" && isPManager) {
        addRole("ProjectManager");
    }

    return roles.indexOf(target) > -1;
}

function extractCurrentPhaseFinishDate(additionalInfo) {
    if (!additionalInfo) return "";

    var info = String(additionalInfo)
        .replace(/\\r\\n/g, "\n")
        .replace(/\\n/g, "\n")
        .replace(/\r\n/g, "\n");

    var match = info.match(
        /Current\s*Phase\s*Finish\s*Date\s*=\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/i
    );
    return match && match[1] ? match[1] : "";
}

function normalizeAdditionalInfoText(additionalInfo) {
    return String(additionalInfo || "")
        .replace(/\\r\\n/g, "\n")
        .replace(/\\n/g, "\n")
        .replace(/\r\n/g, "\n")
        .trim();
}

function buildComplianceBlockMessage(data, lang) {
    var detailsAr = normalizeAdditionalInfoText(data && data.additionalInfoAr ? data.additionalInfoAr : "");
    var detailsEn = normalizeAdditionalInfoText(data && data.additionalInfo ? data.additionalInfo : "");
    var details = lang === "ar" ? (detailsAr || detailsEn) : (detailsEn || detailsAr);

    if (lang === "ar") {
        return details
            ? "لا يمكن الانتقال الى المرحلة التالية بسبب:\n\n" + details
            : "لا يمكن الانتقال الى المرحلة التالية";
    }

    return details
        ? "Cannot move to the next stage because:\n\n" + details
        : "Cannot move to the next stage";
}

function buildComplianceSystemErrorMessage(data, lang) {
    var errAr = data && (data.errorMessageAr || "");
    var errEn = data && (data.errorMessageEn || data.errorMessage || "");
    var details = (lang === "ar" && errAr ? errAr : errEn) || errEn || errAr;

    if (lang === "ar") {
        return details
            ? "لا يمكن الانتقال إلى المرحلة التالية بسبب:\n" + details
            : "لا يمكن الانتقال إلى المرحلة التالية";
    }

    return details
        ? "Cannot move to the next stage because:\n" + details
        : "Cannot move to the next stage";
}

async function checkCanMoveProjectToNextStage(projectCode) {
    var lang = localStorage.getItem("lng") || "ar";
    try {
        if (typeof APIURL === "undefined" || !APIURL || !projectCode) {
            return {
                allowed: false,
                message:
                    lang === "ar"
                        ? "تعذر التحقق من إمكانية الانتقال للمرحلة التالية"
                        : "Unable to validate moving to the next stage",
            };
        }

        var url =
            APIURL +
            "/general/CheckIfWeCanMoveProjectToNextStage?projectCode=" +
            encodeURIComponent(projectCode);

        var data = await $.ajax({
            url: url,
            method: "GET",
            headers: { Accept: "application/json" },
        });

        // isSuccess = false -> stop and show system/error message
        if (!data || data.isSuccess === false) {
            return {
                allowed: false,
                message: buildComplianceSystemErrorMessage(data, lang),
            };
        }

        // isSuccess = true, result = true -> allow
        if (data.result === true) {
            return { allowed: true, message: "" };
        }

        // isSuccess = true, result = false -> block and show message/date from additionalInfo
        return {
            allowed: false,
            message: buildComplianceBlockMessage(data, lang),
        };
    } catch (e) {
        console.error("[ProjectCompliance] checkCanMoveProjectToNextStage failed:", e);
        var fallback =
            (e &&
                e.responseJSON &&
                (e.responseJSON.errorMessageEn ||
                    e.responseJSON.errorMessageAr ||
                    e.responseJSON.errorMessage)) ||
            (lang === "ar"
                ? "تعذر التحقق من إمكانية الانتقال للمرحلة التالية"
                : "Unable to validate moving to the next stage");
        return { allowed: false, message: fallback };
    }
}

function applyEPMOReadOnlyMode() {
    if (!isCurrentRole("EPMO")) return;
    // Project / Initiative Manager can edit even when the same user also has EPMO.
    if (
        userHasAssignedRole("ProjectManager") ||
        userHasAssignedRole("InitiativeManager")
    ) {
        return;
    }

    document
        .querySelectorAll(
            ".btn-Save, .btn-details, .btn-move-next-stage, button.btn-action"
        )
        .forEach(function (btn) {
            btn.style.display = "none";
            btn.disabled = true;
        });

    document
        .querySelectorAll(
            ".phase-section select, .phase-section textarea, .phase-section input"
        )
        .forEach(function (el) {
            el.disabled = true;
        });
}

var pcode = new URLSearchParams(window.location.search).get('PCODE');
var phaseItemMap = {};
window.phaseItemMap = phaseItemMap;
$(document).ready(async function () {
    console.log(UserRole);
    var lang = localStorage.getItem('lng') || 'ar';
    var phasesJson = localStorage.getItem('Dynamo_Phases');
    var projectTitle;
    var detailsMap = {};
    var phaseItemMap = {};
    var renderedPhaseCodes = [];
    var currentProjectData = null;
  

    // Validate required parameters
    if (!pcode) {
        alert((lang === 'ar') ? "رمز المشروع مطلوب" : "Project code is required");
        return;
    }

    // إضافة متغير لتخزين مرحلة المشروع الحالية
var currentProjectPhase = null;

// إضافة دالة جديدة للحصول على مرحلة المشروع
async function getProjectPhase() {
    try {
        const projectResponse = await fetch(
            _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Projects')/items?$filter=Title eq '" + pcode + "'",
            {
                headers: {
                    Accept: "application/json;odata=nometadata",
                },
            }
        );
        
        if (!projectResponse.ok) {
            throw new Error("HTTP error! status: " + projectResponse.status);
        }
        
        const projectData = await projectResponse.json();
        if (projectData.value && projectData.value.length > 0) {
            currentProjectPhase = projectData.value[0].Phase;
            currentProjectData = projectData.value[0];
            console.log("Current project phase:", currentProjectPhase);
         setTimeout(() => {

            $(".page-title").html(
                '<a href="' +
                  _spPageContextInfo.webAbsoluteUrl +
                  "/sitepages/ProjectHome.aspx?PCODE=" +
                  pcode +
                  '">' +
                  projectData.value[0].Name +
                
                  "</a> &nbsp;>&nbsp; " +
                  '<a href="' +
                  _spPageContextInfo.webAbsoluteUrl +
                  "/sitepages/ProjectCompliance.aspx?PCODE=" +
                  pcode +
                  '">' +
                  (lang === "ar" ? "امتثال المشروع" : "Project Compliance") +
                 
                  "</a>"
              );
              


                }, 1000);
                document.title = lang === "ar" ? "امتثال المشروع" : "Project Compliance"
                } else {
                    console.warn("No project found with code:", pcode);
                    currentProjectPhase = null;
                }
            } catch (error) {
                console.error("Error getting project phase:", error);
                currentProjectPhase = null;
                currentProjectData = null;
            }
}

// إضافة دالة لتصفية المراحل
// تعديل دالة shouldShowPhase للتعامل مع الحروف الكبيرة والصغيرة
function shouldShowPhase(phaseCode) {
    if (!currentProjectPhase) {
        return true; // إذا لم نجد مرحلة المشروع، نعرض كل المراحل
    }
    
    // تحويل كلاهما إلى حروف صغيرة للمقارنة
    var currentPhaseNum = parseInt(currentProjectPhase.toLowerCase().replace('p', ''));
    var checkPhaseNum = parseInt(phaseCode.toLowerCase().replace('p', ''));
    
    console.log("Comparing phases - Current:", currentPhaseNum, "Check:", checkPhaseNum, "Should show:", checkPhaseNum <= currentPhaseNum);
    
    // نعرض المراحل من p1 حتى المرحلة الحالية فقط
    return checkPhaseNum <= currentPhaseNum;
}

 // تعديل جزء إنشاء sections في document ready
if (phasesJson) {
    const phases = JSON.parse(phasesJson);
    const container = document.getElementById('project-compliance');

    if (!container) {
        console.error("Container 'project-compliance' not found");
        return;
    }

    phases.forEach(function (phase) {
        const phaseCode = String(phase.code);
        
        // فحص ما إذا كانت هذه المرحلة يجب عرضها أم لا
        if (!shouldShowPhase(phaseCode)) {
            return; // تخطي هذه المرحلة
        }
        
        const phaseTitle = (lang === 'ar' ? phase.name : phase.nameEn) || '';
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'phase-section';
        sectionDiv.innerHTML =
            '<div class="phase-header">' +
                '<h3 class="phase-content" data-phase-code="' + phaseCode + '">' + phaseTitle + '</h3>' +
            '</div>' +
            '<div class="compliance-items-container"></div>';
        container.appendChild(sectionDiv);
        renderedPhaseCodes.push(phaseTitle);
    });
}

    async function gettingProjectTitle() {
        try {
            await getProjectPhase();

            const response = await fetch(
                _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectCompliance')/items?$filter=ProjectCode eq '" + pcode + "'",
                {
                    headers: {
                        Accept: "application/json;odata=nometadata",
                    },
                }
            );
            
            if (!response.ok) {
                throw new Error("HTTP error! status: " + response.status);
            }
            
            const data = await response.json();
            if (data.value && data.value.length > 0) {
                projectTitle = data.value[0].Title;
                await gettingComplianceDetails();
                ComplianceMajors_Info_Request.init();
            } else {
                console.warn("No project found with code:", pcode);
                // Still initialize the compliance majors even if no existing project
                ComplianceMajors_Info_Request.init();
            }
        } catch (error) {
            console.error("Error in gettingProjectTitle:", error);
            alert((lang === 'ar') ? "خطأ في تحميل بيانات المشروع" : "Error loading project data");
        }
    }

  // دالة معدلة لجلب تفاصيل الامتثال لكل المراحل
async function gettingComplianceDetails() {
    try {
        const response = await fetch(
            _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('ProjectComplianceDetails')/items?$filter=startswith(ProjectComplianceCode, 'PC-" + pcode + "')",
            {
                headers: {
                    Accept: "application/json;odata=nometadata",
                },
            }
        );
        
        if (!response.ok) {
            throw new Error("HTTP error! status: " + response.status);
        }
        
        const data = await response.json();
        detailsMap = {}; // إعادة تهيئة الخريطة
        
        if (data.value && data.value.length > 0) {
            // تجميع البيانات حسب المرحلة
            data.value.forEach(function (item) {
                var complianceCode = item.ComplianceCode || '';
                var idParts = complianceCode.split('-');
                var idNumber = idParts.length > 1 ? idParts[1].replace(/^0+/, '') : complianceCode;
                
                // استخراج رقم المرحلة من ProjectComplianceCode
                var phaseMatch = item.ProjectComplianceCode.match(/PC-.*-P(\d+)/);
                var phaseCode = phaseMatch ? 'P' + phaseMatch[1] : 'no-phase';

                if (!detailsMap[phaseCode]) {
                    detailsMap[phaseCode] = {};
                }

                var complianceValue = (item.ComplianceValue && sanitizeSharePointHTML(item.ComplianceValue.toString()).toLowerCase()) || "";
                var statusValue = (item.Status && sanitizeSharePointHTML(item.Status.toString()).toLowerCase()) || "";

                var selectionValue = "";
                if (complianceValue === "done" || complianceValue === "تم") selectionValue = "done";
                else if (complianceValue === "none" || complianceValue === "لم يتم") selectionValue = "none";
                else if (complianceValue === "note" || complianceValue === "ملاحظات") selectionValue = "note";
                else if (complianceValue === "notapplicable" || complianceValue === "غير مطابق") selectionValue = "notapplicable";

                var representationValue = "";
                if (statusValue === "compliance" || statusValue === "ممتثل") representationValue = "compliance";
                else if (statusValue === "noncompliance" || statusValue === "غير ممتثل") representationValue = "noncompliance";

                if (idNumber) {
                    detailsMap[phaseCode][idNumber] = {
                        selection: selectionValue,
                        representation: representationValue,
                        notes: sanitizeSharePointHTML((item.Notes || "").toString())
                    };
                }
            });
            
            console.log("Compliance details organized by phase:", detailsMap);
        }
    } catch (error) {
        console.error("Error in gettingComplianceDetails:", error);
    }
}

// دالة معدلة لتطبيق البيانات على الـ inputs
function applyComplianceData() {
    for (var phaseCode in phaseItemMap) {
        if (detailsMap[phaseCode]) {
            phaseItemMap[phaseCode].forEach(function(item) {
                var existingData = detailsMap[phaseCode][item.title];
                if (existingData) {
                    item.selectEl.value = existingData.selection || '';
                    item.representedEl.value = existingData.representation || 'noncompliance';
                    
                    if (existingData.selection === 'note' || existingData.selection === 'notapplicable') {
                        item.textareaEl.value = existingData.notes || '';
                        item.textareaEl.classList.remove('d-none');
                        item.representedEl.disabled = false;
                    } else {
                        item.textareaEl.classList.add('d-none');
                        item.textareaEl.value = '';
                        item.representedEl.disabled = true;
                    }
                    
                    console.log("Applied data for:", phaseCode, item.title, existingData);
                }
            });
        }
    }
}
    // Function to calculate and display compliance statistics for a phase
    function updatePhaseStatistics(phaseCode) {
        if (!phaseItemMap[phaseCode]) return;

        var items = phaseItemMap[phaseCode];
        var compliantCount = 0;
        var nonCompliantCount = 0;
        var totalItems = items.length;

        items.forEach(function(item) {
            if (item.representedEl.value === 'compliance') {
                compliantCount++;
            } else if (item.representedEl.value === 'noncompliance') {
                nonCompliantCount++;
            }
        });

        var phaseStatus = nonCompliantCount > 0 ? 
            (lang === 'ar' ? 'غير ممتثل' : 'Non-Compliant') : 
            (lang === 'ar' ? 'ممتثل' : 'Compliant');

        // Find the statistics div for this phase
        var phaseSection = document.querySelector('.phase-section h3[data-phase-code="' + phaseCode + '"]').closest('.phase-section');
        var statsDiv = phaseSection.querySelector('.phase-statistics');
        
        if (statsDiv) {
            statsDiv.innerHTML = 
            '<div class="alert alert-info mt-3">' +
                '<div class="row">' +
                    '<div class="col-md-4"><strong>' + (lang === 'ar' ? 'درجة الامتثال: ' : 'Compliance Score: ') + '</strong>' + compliantCount + '</div>' +
                    '<div class="col-md-4"><strong>' + (lang === 'ar' ? 'حالة الامتثال للمرحلة: ' : 'Phase Compliance Status: ') + '</strong>' + phaseStatus + '</div>' +
                    '<div class="col-md-4"><strong>' + (lang === 'ar' ? 'درجة غير الامتثال: ' : 'Non-Compliance Score: ') + '</strong>' + nonCompliantCount + '</div>' +
                '</div>' +
            '</div>';
        }
    }

    const ComplianceMajors_Info_Request = {
        g: {},
    
        init: function () {
            // Check if SP is available
            if (typeof SP === 'undefined') {
                console.error("SharePoint JavaScript Object Model is not loaded");
                return;
            }
    
            var clientContext = SP.ClientContext.get_current();
            var oList = clientContext.get_web().get_lists().getByTitle("ComplianceMajors");
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml(
                "<View>" +
                "<Query>" +
                "<Where>" +
                "<Neq>" +
                "<FieldRef Name='DeletionStatus' />" +
                "<Value Type='Text'>Deleted</Value>" +
                "</Neq>" +
                "</Where>" +
                "<OrderBy>" +
                "<FieldRef Name='Created' Ascending='True' />" +
                "</OrderBy>" +
                "</Query>" +
                "</View>"
            );
    
            this.g.collListItem = oList.getItems(camlQuery);
            clientContext.load(this.g.collListItem);
            clientContext.executeQueryAsync(
                Function.createDelegate(this, this.onSuccess),
                Function.createDelegate(this, this.onError)
            );
        },
    
        onSuccess: function () {
            var listItemEnum = this.g.collListItem.getEnumerator();
            var phasesWithItems = new Set();
            var allItems = [];
    
            while (listItemEnum.moveNext()) {
                var item = listItemEnum.get_current();
                allItems.push(item);
                var phaseCode = String(item.get_item("Phase") || "no-phase");
                phasesWithItems.add(phaseCode);
            }
    
            // Remove phase sections that don't have items
            var phaseSections = document.querySelectorAll('.phase-section');
            for (var i = 0; i < phaseSections.length; i++) {
                var section = phaseSections[i];
                var phaseContent = section.querySelector('.phase-content');
                if (!phaseContent) continue;
    
                var phaseCode = phaseContent.getAttribute('data-phase-code');
                var phaseTitle = phaseContent.textContent.trim();
    
                // Remove phases that do not have items or should not be displayed
                if (phaseCode && (!phasesWithItems.has(phaseCode) || !shouldShowPhase(phaseCode))) {
                    section.parentNode.removeChild(section);
                    var index = renderedPhaseCodes.indexOf(phaseTitle);
                    if (index !== -1) renderedPhaseCodes.splice(index, 1);
                }
            }
    
            // Build compliance items
            allItems.forEach(function (oListItem) {
                var rawName = oListItem.get_item("Name") || "Unnamed";
                var name = sanitizeSharePointHTML(rawName);
                var phaseCode = String(oListItem.get_item("Phase") || "no-phase");
                var title = oListItem.get_item("Title") || "CM-00";
    
                var idParts = title.split('-');
                var idNumber = idParts.length > 1 ? idParts[1].replace(/^0+/, '') : title;
                var formattedId = idParts.length > 1 ? idParts[1] : idNumber;
    
                var matchingSection = null;
                var allSections = document.querySelectorAll('.phase-section');
                for (var i = 0; i < allSections.length; i++) {
                    var sec = allSections[i];
                    var h3 = sec.querySelector('h3[data-phase-code="' + phaseCode + '"]');
                    if (h3) {
                        matchingSection = sec;
                        break;
                    }
                }
                if (!matchingSection) return;
    
                var complianceContainer = matchingSection.querySelector('.compliance-items-container');
                if (!complianceContainer) return;
    
                var itemRow = document.createElement('div');
                itemRow.className = 'row justify-content-between align-items-start mb-3 compliance-item';
                itemRow.setAttribute('data-compliance-id', idNumber);
    
                var colTitle = document.createElement('div');
                colTitle.className = 'col-md-2 font-weight-bold';
                colTitle.textContent = name;
    
                var colStatus = document.createElement('div');
                colStatus.className = 'col-md-3';
                var selectEl = document.createElement('select');
                selectEl.className = 'form-control';
                selectEl.id = 'CM-' + formattedId + '-status';
                selectEl.innerHTML =
                    '<option value="" disabled selected>' + (lang === 'ar' ? 'اختر الحالة' : 'Select Status') + '</option>' +
                    '<option value="done">' + (lang === 'ar' ? 'تم' : 'Done') + '</option>' +
                    '<option value="none">' + (lang === 'ar' ? 'لم يتم' : 'none') + '</option>' +
                    '<option value="note">' + (lang === 'ar' ? 'ملاحظات' : 'With Comments') + '</option>' +
                    '<option value="notapplicable">' + (lang === 'ar' ? 'غير مطابق' : 'Not Applicable') + '</option>';
                colStatus.appendChild(selectEl);
    
                var colRepresented = document.createElement('div');
                colRepresented.className = 'col-md-3';
                var representedEl = document.createElement('select');
                representedEl.className = 'form-control';
                representedEl.id = 'CM-' + formattedId + '-representation';
                representedEl.innerHTML =
                    '<option value="noncompliance" selected>' + (lang === 'ar' ? 'غير ممتثل' : 'Non-Compliant') + '</option>' +
                    '<option value="compliance">' + (lang === 'ar' ? 'ممتثل' : 'Compliant') + '</option>';
                colRepresented.appendChild(representedEl);
    
                var textareaEl = document.createElement('textarea');
                textareaEl.className = 'form-control d-none';
                textareaEl.placeholder = lang === 'ar' ? 'يرجى توضيح الملاحظات' : 'Please clarify notes';
                textareaEl.id = 'CM-' + formattedId + '-notes';
    
                var colNotes = document.createElement('div');
                colNotes.className = 'col-md-3';
                colNotes.appendChild(textareaEl);
    
                // Event listener for status change
                selectEl.addEventListener('change', function () {
                    var textarea = this.parentNode.parentNode.querySelector('textarea');
                    var representedSelect = this.parentNode.parentNode.querySelector('select[id*="-representation"]');
                    
                    if (!textarea || !representedSelect) return;
                    
                    if (this.value === 'note' || this.value === 'notapplicable') {
                        textarea.classList.remove('d-none');
                        representedSelect.disabled = false;
                        if (representedSelect.value === '') {
                            representedSelect.value = 'compliance'; // Default to compliant for comments
                        }
                    } else {
                        textarea.classList.add('d-none');
                        textarea.value = '';
                        representedSelect.disabled = true;
                        if (this.value === 'done') {
                            representedSelect.value = 'compliance';
                        } else if (this.value === 'none' || this.value === 'notapplicable') {
                            representedSelect.value = 'noncompliance';
                        }
                    }
                    
                    // Update phase statistics
                    updatePhaseStatistics(phaseCode);

                    applyDURulesToButtons(phaseCode);
                });
    
                // Event listener for representation change (to update statistics)
                representedEl.addEventListener('change', function () {
                    updatePhaseStatistics(phaseCode);

                    applyDURulesToButtons(phaseCode);

                });
    
                // Apply existing data
                var existingData = detailsMap[phaseCode] ? detailsMap[phaseCode][idNumber] : null;
                if (existingData) {
                    selectEl.value = existingData.selection || '';
                    representedEl.value = existingData.representation || 'noncompliance';
                    
                    if (existingData.selection === 'note' || existingData.selection === 'notapplicable') {
                        textareaEl.value = existingData.notes || '';
                        textareaEl.classList.remove('d-none');
                        representedEl.disabled = false; // Enable for notes
                        } else if (existingData.selection === 'done' || existingData.selection === 'none' || existingData.selection === 'notapplicable') {
                        representedEl.disabled = true; // Disable for done/none
                    }
                } else {
                    representedEl.value = 'noncompliance';
                    representedEl.disabled = true;
                }
    
                itemRow.appendChild(colTitle);
                itemRow.appendChild(colStatus);
                itemRow.appendChild(colRepresented);
                itemRow.appendChild(colNotes);
    
                complianceContainer.appendChild(itemRow);
    
                // Store in phase item map
                if (!phaseItemMap[phaseCode]) phaseItemMap[phaseCode] = [];
                phaseItemMap[phaseCode].push({
                    title: idNumber,
                    name: name,
                    selectEl: selectEl,
                    representedEl: representedEl,
                    textareaEl: textareaEl
                });
            });
    
            // Add statistics and submit buttons for each phase
            renderedPhaseCodes.forEach(function (phaseTitle) {
                var sections = document.querySelectorAll('.phase-section');
                var section = null;
                for (var i = 0; i < sections.length; i++) {
                    var sec = sections[i];
                    var content = sec.querySelector('.phase-content');
                    if (content && content.textContent.trim() === phaseTitle) {
                        section = sec;
                        break;
                    }
                }
                if (!section) return;
    
                var phaseContent = section.querySelector('.phase-content');
                var phaseCode = phaseContent ? phaseContent.getAttribute('data-phase-code') : null;
                var complianceContainer = section.querySelector('.compliance-items-container');
                
                // Skip if no phase code, container, or items for this phase
                if (!phaseCode || !complianceContainer || !phaseItemMap[phaseCode] || phaseItemMap[phaseCode].length === 0) return;
    
                // Add statistics div
                var statisticsDiv = document.createElement('div');
                statisticsDiv.className = 'phase-statistics';
                complianceContainer.appendChild(statisticsDiv);
    
                // Add submit button in separate row
                var buttonRow = document.createElement('div');
                buttonRow.className = 'row mt-3';
                var buttonCol = document.createElement('div');
                buttonCol.className = 'col-md-12 text-left';
    
                var submitBtn = document.createElement('button');
                submitBtn.className = 'btn btn-action btn-Save Resources';
                submitBtn.disabled = false;
                submitBtn.textContent = (lang === 'ar') ? 'حفظ' : 'Save';
                submitBtn.setAttribute("type", "button");
                
                // Create closure to capture phaseCode correctly
                (function(currentPhaseCode) {
                    submitBtn.addEventListener('click', function () {
                        // Disable button to prevent multiple clicks
                        this.disabled = true;
                        this.textContent = (lang === 'ar') ? 'جاري الحفظ...' : 'Saving...';
                        
                        var results = phaseItemMap[currentPhaseCode].map(function (item) {
                            return {
                                title: 'CM-' + item.title.padStart(2, '0'),
                                name: item.name,
                                selection: item.selectEl.value,
                                representation: item.representedEl.value,
                                notes: (item.selectEl.value === 'note' || item.selectEl.value === 'notapplicable') ? item.textareaEl.value : ''
                            };
                        });
                        
                        // Call save function
                        var phaseItems = phaseItemMap[currentPhaseCode] || [];
                        var compliantCount = phaseItems.filter(function(item) {
                            return item.representedEl.value === 'compliance';
                        }).length;
                        var nonCompliantCount = phaseItems.filter(function(item) {
                            return item.representedEl.value === 'noncompliance';
                        }).length;
                        var phaseStatus = nonCompliantCount > 0 ? 'noncompliance' : 'compliance';

                        var isCurrentPhase = isCurrentProjectPhase(currentPhaseCode);
                        var progressStage = isCurrentPhase;
                        var redirect = true;

                        if (typeof currentUserRole !== 'undefined') {
                            if (currentUserRole === 'DU') {
                                // DU: save only, no stage move, no redirect
                                progressStage = false;
                                redirect = false;
                            } else if (currentUserRole === 'IPME') {
                                // IPME: save only, redirect, no stage move
                                progressStage = false;
                                redirect = true;
                            }
                        }

                        savePhaseCompliance(
                            currentPhaseCode,
                            results,
                            this,
                            compliantCount,
                            nonCompliantCount,
                            phaseStatus,
                            { progressStage: progressStage, redirect: redirect }
                        );
                    });
                })(phaseCode);
    
                buttonCol.appendChild(submitBtn);
                buttonRow.appendChild(buttonCol);
                complianceContainer.appendChild(buttonRow);
    
                // Add horizontal line after each section
                var hrElement = document.createElement('hr');
                complianceContainer.appendChild(hrElement);
                
                // Initialize statistics for this phase
                updatePhaseStatistics(phaseCode);
    
                // Check if user is not a Project Manager
                var isProjectManager = false;
                if (typeof currentUserRole !== 'undefined' && currentUserRole === 'ProjectManager') {
                    isProjectManager = true;
                }
    
           // Add Need Info button for non-Project Managers
           if (!isProjectManager) {
            var rejectBtn = document.createElement('button');
            rejectBtn.className = 'btn btn-action btn-details ms-2';
            rejectBtn.disabled = false;
            rejectBtn.textContent = (lang === 'ar') ? 'طلب معلومات إضافيه' : 'Request more info';
            rejectBtn.setAttribute("type", "button");
            
            (function(currentPhaseCode) {
                rejectBtn.addEventListener('click', function() {
                    var confirmMsg = (lang === 'ar') ? 
                        'هل أنت متأكد من طلب معلومات إضافيه المشروع؟' : 
                        'Are you sure you want to request more info for the project?';
                    
                    if (!confirm(confirmMsg)) {
                        return;
                    }
                    
                    this.disabled = true;
                    this.textContent = (lang === 'ar') ? 'جاري المعالجة...' : 'Processing...';
        
                    // Gather current compliance data
                    var results = phaseItemMap[currentPhaseCode].map(function(item) {
                        return {
                            title: 'CM-' + item.title.padStart(2, '0'),
                            name: item.name,
                            selection: item.selectEl.value,
                            representation: item.representedEl.value,
                            notes: (item.selectEl.value === 'note' || item.selectEl.value === 'notapplicable') ? item.textareaEl.value : ''
                        };
                    });
        
                    // Save compliance data and reject
                    var phaseItems = phaseItemMap[currentPhaseCode] || [];
                    var compliantCount = phaseItems.filter(function(item) {
                        return item.representedEl.value === 'compliance';
                    }).length;
                    var nonCompliantCount = phaseItems.filter(function(item) {
                        return item.representedEl.value === 'noncompliance';
                    }).length;
                    var phaseStatus = nonCompliantCount > 0 ? 'noncompliance' : 'compliance';
        
                    rejectProject(currentPhaseCode, results, this, compliantCount, nonCompliantCount, phaseStatus);
                });
            })(phaseCode);
            
            buttonCol.appendChild(rejectBtn);
        }

        // Add "Move to Next Stage" button only for DU on current phase
        if (typeof currentUserRole !== 'undefined' &&
            currentUserRole === 'DU' &&
            isCurrentProjectPhase(phaseCode)) {

            var moveNextBtn = document.createElement('button');
            moveNextBtn.className = 'btn btn-action ms-2 Resources btn-move-next-stage';
            moveNextBtn.disabled = true;
            moveNextBtn.textContent = (lang === 'ar') ? 'الانتقال للمرحلة التالية' : 'Move to Next Stage';
            moveNextBtn.setAttribute("type", "button");

            (function(currentPhaseCode) {
                moveNextBtn.addEventListener('click', function () {
                    this.disabled = true;
                    this.textContent = (lang === 'ar') ? 'جاري المعالجة...' : 'Processing...';

                    var results = phaseItemMap[currentPhaseCode].map(function (item) {
                        return {
                            title: 'CM-' + item.title.padStart(2, '0'),
                            name: item.name,
                            selection: item.selectEl.value,
                            representation: item.representedEl.value,
                            notes: item.selectEl.value === 'note' ? item.textareaEl.value : ''
                        };
                    });

                    var phaseItems = phaseItemMap[currentPhaseCode] || [];
                    var compliantCount = phaseItems.filter(function(item) {
                        return item.representedEl.value === 'compliance';
                    }).length;
                    var nonCompliantCount = phaseItems.filter(function(item) {
                        return item.representedEl.value === 'noncompliance';
                    }).length;
                    var phaseStatus = nonCompliantCount > 0 ? 'noncompliance' : 'compliance';

                    // For DU via Move To Next Stage: progress and redirect
                    savePhaseCompliance(
                        currentPhaseCode,
                        results,
                        this,
                        compliantCount,
                        nonCompliantCount,
                        phaseStatus,
                        { progressStage: true, redirect: true, action: "moveToNextStage" }
                    );
                });
            })(phaseCode);

            buttonCol.appendChild(moveNextBtn);
        }
            })
    
            // Update page title
            var pageTitleElem = document.querySelector(".page-title");
            if (pageTitleElem && typeof ar_UserRole !== 'undefined' && typeof en_UserRole !== 'undefined') {
                pageTitleElem.innerHTML = (lang === "ar" || !lang) ? ar_UserRole : en_UserRole;
            }
    
            // Apply compliance data after building items
            applyComplianceData();
            applyEPMOReadOnlyMode();

          
        },
    
        onError: function (sender, args) {
            console.error("Error:", args.get_message());
            alert((localStorage.getItem('lng') === 'ar') ? "حدث خطأ أثناء تحميل البيانات" : "Error loading data");
        }
    }
    
    async function rejectProject(phaseCode, results, buttonElement, compliantCount, nonCompliantCount, phaseStatus) {
        const projectCode = pcode || new URLSearchParams(window.location.search).get('PCODE');
        const lang = localStorage.getItem('lng') || 'ar';
        
        if (!projectCode) {
            alert((lang === 'ar') ? "لا يوجد رمز مشروع صالح" : "No valid project code found.");
            if (buttonElement) {
                buttonElement.disabled = false;
                buttonElement.textContent = (lang === 'ar') ? 'طلب معلومات إضافيه' : 'Request more info';
            }
            return;
        }
    
        try {
            // 1. Save compliance data first
            await saveComplianceDataOnly(phaseCode, results, compliantCount, nonCompliantCount, phaseStatus);
            
            // 2. Get stage from projects
            const projectResponse = await fetch(
                `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Projects')/items?$filter=Title eq '${projectCode}'`,
                {
                    headers: {
                        Accept: "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose"
                    },
                }
            );
    
            if (!projectResponse.ok) {
                throw new Error(`Failed to fetch project: ${projectResponse.status}`);
            }
    
            const projectData = await projectResponse.json();
            if (!projectData.d || !projectData.d.results || projectData.d.results.length === 0) {
                throw new Error(`No project found with code: ${projectCode}`);
            }
    
            const project = projectData.d.results[0];
            const currentStage = project.Stage;
            const projectId = project.Id;
    
            // 3. Get task data
            const tasksResponse = await fetch(
                `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Tasks')/items?$filter=Title eq '${currentStage}' and RelatedItemTitle eq '${projectCode}' and Status eq 'Open'`,
                {
                    headers: {
                        Accept: "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose"
                    },
                }
            );
    
            if (!tasksResponse.ok) {
                throw new Error(`Failed to fetch tasks: ${tasksResponse.status}`);
            }
    
            const tasksData = await tasksResponse.json();
            if (!tasksData.d || !tasksData.d.results || tasksData.d.results.length === 0) {
                throw new Error(`No task found for stage ${currentStage} and project ${projectCode}`);
            }
    
            const task = tasksData.d.results[0];
            const rejectStage = task.StageIDReject;
            const taskId = task.Id;
    
            // 4. Update task status with reject action
            await updateTaskStatusReject(taskId);
    
            // 5. Update project stage to reject stage
            await updateProjectStageReject(projectId, rejectStage ,  compliantCount, nonCompliantCount, phaseStatus);
    
            // 6. Update project stages decision to false
            await updateProjectStagesDecision(projectCode, rejectStage, false);
    
            alert((lang === 'ar') ? "تم طلب معلومات إضافيه المشروع بنجاح" : "Project request more info successfully");
            
            // Redirect to project home page
            setTimeout(function() {
                window.location.href = _spPageContextInfo.webAbsoluteUrl + 
                    "/sitepages/ProjectHome.aspx?PCODE=" + projectCode;
            }, 500);
    
        } catch (err) {
            console.error("Error in rejecting project:", err);
            alert((lang === 'ar') ? "حدث خطأ أثناء طلب معلومات إضافيه المشروع: " + err.message : "An error occurred during project request more info: " + err.message);
        } finally {
            if (buttonElement) {
                buttonElement.disabled = false;
                buttonElement.textContent = (lang === 'ar') ? 'طلب معلومات إضافيه' : 'Request more info';
            }
        }
    }
    
    // دالة تحديث حالة المهمة للرفض
    async function updateTaskStatusReject(taskId) {
        const taskResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Tasks')/items(${taskId})`,
            {
                headers: {
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                },
            }
        );
    
        let etag = "*";
        if (taskResponse.ok) {
            const taskData = await taskResponse.json();
            etag = taskData.d.__metadata ? taskData.d.__metadata.etag : "*";
        }
    
        const updateTaskResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Tasks')/items(${taskId})`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose",
                    "IF-MATCH": etag,
                    "X-HTTP-Method": "MERGE",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                },
                body: JSON.stringify({
                    "__metadata": { "type": "SP.Data.TasksListItem" },
                    "Status": "Closed",
                    "TakenAction": "reject",
                    "WFInstanceID": null
                }),
            }
        );
    
        if (!updateTaskResponse.ok) {
            const errorText = await updateTaskResponse.text();
            throw new Error(`Failed to update task status: ${updateTaskResponse.status} - ${errorText}`);
        }
    }
    
    // دالة تحديث مرحلة المشروع للرفض
    async function updateProjectStageReject(projectId, rejectStage , compliantCount, nonCompliantCount, phaseStatus) {
        const projectResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Projects')/items(${projectId})`,
            {
                headers: {
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                },
            }
        );
    
        let etag = "*";
        if (projectResponse.ok) {
            const projectData = await projectResponse.json();
            etag = projectData.d.__metadata ? projectData.d.__metadata.etag : "*";
        }
    
        const updateProjectResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Projects')/items(${projectId})`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose",
                    "IF-MATCH": etag,
                    "X-HTTP-Method": "MERGE",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                },
                body: JSON.stringify({
                    "Stage": rejectStage,
                    "__metadata": { "type": "SP.Data.ProjectsListItem" },
                    "ComplianceDegree": compliantCount,
                    "Status": phaseStatus,
                    "NonComplianceDegree": nonCompliantCount
                }),
            }
        );
    
        if (!updateProjectResponse.ok) {
            const errorText = await updateProjectResponse.text();
            throw new Error(`Failed to update project stage: ${updateProjectResponse.status} - ${errorText}`);
        }
    }
    
    // دالة تحديث قرار مراحل المشروع
    async function updateProjectStagesDecision(projectCode, stageCode, decision) {
        const stagesResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Project Stages')/items?$filter=ProjectCode eq '${projectCode}' and StageCode eq '${stageCode}'`,
            {
                headers: {
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                },
            }
        );
    
        if (!stagesResponse.ok) {
            throw new Error(`Failed to fetch ProjectStages: ${stagesResponse.status}`);
        }
    
        const stagesData = await stagesResponse.json();
        
        if (stagesData.d && stagesData.d.results && stagesData.d.results.length > 0) {
            const stageItem = stagesData.d.results[0];
            const stageId = stageItem.Id;
            
            const stageItemResponse = await fetch(
                `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Project Stages')/items(${stageId})`,
                {
                    headers: {
                        Accept: "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose"
                    },
                }
            );
    
            let stageEtag = "*";
            if (stageItemResponse.ok) {
                const stageItemData = await stageItemResponse.json();
                stageEtag = stageItemData.d.__metadata ? stageItemData.d.__metadata.etag : "*";
            }
    
            const updateStageResponse = await fetch(
                `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Project Stages')/items(${stageId})`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose",
                        "IF-MATCH": stageEtag,
                        "X-HTTP-Method": "MERGE",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    },
                    body: JSON.stringify({
                        "__metadata": { "type": "SP.Data.ProjectStagesListItem" },
                        "Decision": decision
                    }),
                }
            );
    
            if (!updateStageResponse.ok) {
                const errorText = await updateStageResponse.text();
                throw new Error(`Failed to update ProjectStages Decision: ${updateStageResponse.status} - ${errorText}`);
            }
        }
    }
    
    // دالة حفظ بيانات الامتثال فقط (بدون تغيير المرحلة)
    async function saveComplianceDataOnly(phaseCode, results, compliantCount, nonCompliantCount, phaseStatus) {
        const projectCode = pcode || new URLSearchParams(window.location.search).get('PCODE');
        
        if (!projectCode || !results || results.length === 0) {
            return;
        }
    
        let projectTitle = null;
    
        // Check or create ProjectCompliance item
        const pcResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('ProjectCompliance')/items?$filter=ProjectCode eq '${projectCode}' and Phase eq '${phaseCode}'`, {
            headers: { 
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose"
            },
        });
    
        if (!pcResponse.ok) {
            throw new Error(`HTTP error! status: ${pcResponse.status}`);
        }
    
        const pcData = await pcResponse.json();
    
        if (pcData.d && pcData.d.results && pcData.d.results.length > 0) {
            const existingPC = pcData.d.results[0];
            projectTitle = existingPC.Title;
    
            const itemResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('ProjectCompliance')/items(${existingPC.Id})`, {
                headers: { 
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                },
            });
    
            if (itemResponse.ok) {
                const itemData = await itemResponse.json();
                const etag = itemData.d.__metadata ? itemData.d.__metadata.etag : "*";
    
                await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('ProjectCompliance')/items(${existingPC.Id})`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose",
                        "IF-MATCH": etag,
                        "X-HTTP-Method": "MERGE",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    },
                    body: JSON.stringify({
                        "__metadata": { "type": "SP.Data.ProjectComplianceListItem" },
                        "ComplianceDegree": compliantCount,
                        "Status": phaseStatus,
                        "NonComplianceDegree": nonCompliantCount,
                        "DeletionStatus": "",
                        "MasterKey": "projects"
                    }),
                });
            }
        } else {
            projectTitle = `PC-${projectCode}-${phaseCode}`;
            const createPC = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('ProjectCompliance')/items`, {
                method: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                },
                body: JSON.stringify({
                    "__metadata": { "type": "SP.Data.ProjectComplianceListItem" },
                    "Title": projectTitle,
                    "ProjectCode": projectCode,
                    "Phase": phaseCode,
                    "ComplianceDegree": compliantCount,
                    "Status": phaseStatus,
                    "NonComplianceDegree": nonCompliantCount,
                    "DeletionStatus": "",
                    "MasterKey": "projects",
                }),
            });
    
            if (!createPC.ok) {
                const errorText = await createPC.text();
                throw new Error(`Failed to create ProjectCompliance item: ${createPC.status} - ${errorText}`);
            }
    
            const createdData = await createPC.json();
            projectTitle = createdData.d.Title;
        }
    
        // Save compliance details
        for (let item of results) {
            const detailResponse = await fetch(
                `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('ProjectComplianceDetails')/items?$filter=ProjectComplianceCode eq '${projectTitle}' and ComplianceCode eq '${item.title}'`,
                {
                    headers: { 
                        Accept: "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose"
                    },
                }
            );
    
            if (!detailResponse.ok) {
                throw new Error(`Failed to fetch detail for ${item.title}: ${detailResponse.status}`);
            }
    
            const detailData = await detailResponse.json();
            const isUpdate = detailData.d && detailData.d.results && detailData.d.results.length > 0;
    
            if (isUpdate) {
                const existingDetail = detailData.d.results[0];
                const detailId = existingDetail.Id;
                
                const itemResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('ProjectComplianceDetails')/items(${detailId})`, {
                    headers: { 
                        Accept: "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose"
                    },
                });
    
                let etag = "*";
                if (itemResponse.ok) {
                    const itemData = await itemResponse.json();
                    etag = itemData.d.__metadata ? itemData.d.__metadata.etag : "*";
                }
    
                await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('ProjectComplianceDetails')/items(${detailId})`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose",
                        "IF-MATCH": etag,
                        "X-HTTP-Method": "MERGE",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    },
                    body: JSON.stringify({
                        "__metadata": { "type": "SP.Data.ProjectComplianceDetailsListItem" },
                        "ComplianceCode": item.title,
                        "ProjectComplianceCode": projectTitle,
                        "ComplianceValue": item.selection,
                        "Status": item.representation,
                        "Notes": item.notes || ""
                    }),
                });
            } else {
                await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('ProjectComplianceDetails')/items`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    },
                    body: JSON.stringify({
                        "__metadata": { "type": "SP.Data.ProjectComplianceDetailsListItem" },
                        "Title": item.title,
                        "ComplianceCode": item.title,
                        "ProjectComplianceCode": projectTitle,
                        "ComplianceValue": item.selection,
                        "Status": item.representation,
                        "Notes": item.notes || ""
                    }),
                });
            }
        }
    }
 // Helper function to check if the phase being saved is the current project phase
function isCurrentProjectPhase(phaseCode) {
    if (!currentProjectPhase) {
        return false; // If no project phase found, don't update Project List
    }
    
    // Convert both to lowercase for comparison
    var currentPhaseNum = parseInt(currentProjectPhase.toLowerCase().replace('p', ''));
    var savePhaseNum = parseInt(phaseCode.toLowerCase().replace('p', ''));
    
    // Only update Project List if the phase being saved matches the current project phase
    return savePhaseNum === currentPhaseNum;
}
// Function to handle stage progression workflow using existing project data
async function progressProjectStage(projectCode, projectData) {
    try {
        // Step 1: Use existing project data (from getProjectPhase function)
        if (!projectData || !projectData.Stage) {
            throw new Error(`No valid project data or stage found for project: ${projectCode}`);
        }

        const currentStage = projectData.Stage; // Ex: S01
        const projectId = projectData.Id;

        // Step 2: Get StageIDApprove and ID from Tasks List
        const tasksResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Tasks')/items?$filter=Title eq '${currentStage}' and RelatedItemTitle eq '${projectCode}' and Status eq 'Open'`,
            {
                headers: {
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                },
            }
        );

        if (!tasksResponse.ok) {
            throw new Error(`Failed to fetch tasks: ${tasksResponse.status}`);
        }

        const tasksData = await tasksResponse.json();
        if (!tasksData.d || !tasksData.d.results || tasksData.d.results.length === 0) {
            throw new Error(`No task found for stage ${currentStage} and project ${projectCode}`);
        }

        const task = tasksData.d.results[0];
        const nextStage = task.StageIDApprove; // Ex: S03
        const taskId = task.Id;

        // Step 3: Update Task Status to Closed and clear WFInstanceID
        await updateTaskStatus(taskId);

        // Step 4: Update Project Stage and remove draft status
        await updateProjectStage(projectId, nextStage, projectData);

        return { success: true, nextStage: nextStage };

    } catch (error) {
        console.error("Error in progressProjectStage:", error);
        throw error;
    }
}
// Function to update task status
async function updateTaskStatus(taskId) {
    // Get task etag
    const taskResponse = await fetch(
        `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Tasks')/items(${taskId})`,
        {
            headers: {
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose"
            },
        }
    );

    let etag = "*";
    if (taskResponse.ok) {
        const taskData = await taskResponse.json();
        etag = taskData.d.__metadata ? taskData.d.__metadata.etag : "*";
    }

    // Update task
    const updateTaskResponse = await fetch(
        `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Tasks')/items(${taskId})`,
        {
            method: "POST",
            headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "IF-MATCH": etag,
                "X-HTTP-Method": "MERGE",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            },
            body: JSON.stringify({
                "__metadata": { "type": "SP.Data.TasksListItem" },
                "Status": "Closed",
                "WFInstanceID": ""
            }),
        }
    );

    if (!updateTaskResponse.ok) {
        const errorText = await updateTaskResponse.text();
        throw new Error(`Failed to update task status: ${updateTaskResponse.status} - ${errorText}`);
    }
}

// Function to update project stage
async function updateProjectStage(projectId, nextStage, currentProject) {
    // Get project etag
    const projectResponse = await fetch(
        `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Projects')/items(${projectId})`,
        {
            headers: {
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose"
            },
        }
    );

    let etag = "*";
    if (projectResponse.ok) {
        const projectData = await projectResponse.json();
        etag = projectData.d.__metadata ? projectData.d.__metadata.etag : "*";
    }

    // Prepare update data - remove DraftStatus and WFStage, update Stage
    const updateData = {
        "__metadata": { "type": "SP.Data.ProjectsListItem" },
        "Stage": nextStage
   
    };

    // Keep existing compliance data if present
    if (currentProject.ComplianceStatus) {
        updateData.ComplianceStatus = currentProject.ComplianceStatus;
    }
    if (currentProject.ComplianceDegree !== undefined) {
        updateData.ComplianceDegree = currentProject.ComplianceDegree;
    }
    if (currentProject.NonComplianceDegree !== undefined) {
        updateData.NonComplianceDegree = currentProject.NonComplianceDegree;
    }

    // Update project
    const updateProjectResponse = await fetch(
        `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Projects')/items(${projectId})`,
        {
            method: "POST",
            headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "IF-MATCH": etag,
                "X-HTTP-Method": "MERGE",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            },
            body: JSON.stringify({
                "__metadata": { "type": "SP.Data.ProjectsListItem" },
                "Stage": nextStage
           
            }),
        }
    );

    if (!updateProjectResponse.ok) {
        const errorText = await updateProjectResponse.text();
        throw new Error(`Failed to update project stage: ${updateProjectResponse.status} - ${errorText}`);
    }

    // Add this code after the successful project update in updateProjectStage function

// Update ProjectStages Decision field
try {
    // Get the current stage from project data
    const currentStage = currentProject.Stage;
    const projectCode = pcode || new URLSearchParams(window.location.search).get('PCODE');
    
    // Find the ProjectStages item to update
    const stagesResponse = await fetch(
        `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Project Stages')/items?$filter=StageCode eq '${currentStage}' and ProjectCode eq '${projectCode}'`,
        {
            headers: {
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose"
            },
        }
    );

    if (!stagesResponse.ok) {
        throw new Error(`Failed to fetch ProjectStages: ${stagesResponse.status}`);
    }

    const stagesData = await stagesResponse.json();
    
    if (stagesData.d && stagesData.d.results && stagesData.d.results.length > 0) {
        const stageItem = stagesData.d.results[0];
        const stageId = stageItem.Id;
        
        // Get etag for the stage item
        const stageItemResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Project Stages')/items(${stageId})`,
            {
                headers: {
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                },
            }
        );

        let stageEtag = "*";
        if (stageItemResponse.ok) {
            const stageItemData = await stageItemResponse.json();
            stageEtag = stageItemData.d.__metadata ? stageItemData.d.__metadata.etag : "*";
        }

        // Update Decision field to "yes"
        const updateStageResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Project Stages')/items(${stageId})`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose",
                    "IF-MATCH": stageEtag,
                    "X-HTTP-Method": "MERGE",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                },
                body: JSON.stringify({
                    "__metadata": { "type": "SP.Data.ProjectStagesListItem" },
                    "Decision": true
                }),
            }
        );

        if (!updateStageResponse.ok) {
            const errorText = await updateStageResponse.text();
            console.warn(`Failed to update ProjectStages Decision: ${updateStageResponse.status} - ${errorText}`);
        } else {
            console.log(`Successfully updated ProjectStages Decision to 'yes' for stage ${currentStage}`);
        }
    } else {
        console.warn(`No ProjectStages item found for StageCode: ${currentStage} and ProjectCode: ${projectCode}`);
    }
} catch (stageUpdateError) {
    console.error("Error updating ProjectStages Decision:", stageUpdateError);
    // Don't throw error - this shouldn't stop the main process
}
}
// إضافة هذه الدالة الجديدة قبل دالة savePhaseCompliance
async function updateProjectListCompliance(projectCode, compliantCount, nonCompliantCount, phaseStatus) {
    try {
        // الحصول على بيانات المشروع من Projects list
        const projectResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Projects')/items?$filter=Title eq '${projectCode}'`,
            {
                headers: {
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                },
            }
        );

        if (!projectResponse.ok) {
            throw new Error(`Failed to fetch project: ${projectResponse.status}`);
        }

        const projectData = await projectResponse.json();
        
        if (!projectData.d || !projectData.d.results || projectData.d.results.length === 0) {
            throw new Error(`No project found with code: ${projectCode}`);
        }

        const project = projectData.d.results[0];
        const projectId = project.Id;

        // الحصول على etag للمشروع
        const projectItemResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Projects')/items(${projectId})`,
            {
                headers: {
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                },
            }
        );

        let etag = "*";
        if (projectItemResponse.ok) {
            const projectItemData = await projectItemResponse.json();
            etag = projectItemData.d.__metadata ? projectItemData.d.__metadata.etag : "*";
        }

        // تحديث المشروع بالبيانات الجديدة
        const updateProjectResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Projects')/items(${projectId})`,
            {
                method: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose",
                    "IF-MATCH": etag,
                    "X-HTTP-Method": "MERGE",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                },
                body: JSON.stringify({
                    "__metadata": { "type": "SP.Data.ProjectsListItem" },
                    "ComplianceStatus": phaseStatus,
                    "ComplianceDegree": compliantCount,
                    "NonComplianceDegree": nonCompliantCount,
                }),
            }
        );

        if (!updateProjectResponse.ok) {
            const errorText = await updateProjectResponse.text();
            throw new Error(`Failed to update project compliance data: ${updateProjectResponse.status} - ${errorText}`);
        }

        console.log(`Successfully updated project ${projectCode} with compliance data`);
        
    } catch (error) {
        console.error("Error updating project list compliance:", error);
        throw error;
    }
}

async function callCreateComplianceHistoryItems(payloads) {
    try {
        if (typeof APIURL === "undefined" || !APIURL) return;
        if (!payloads || !payloads.length) return;

        const url = `${APIURL}/general/createcompliancehistoryitem`;

        // cache current user id for this page/session
        if (typeof window.__complianceHistoryCreatedByUserId === "undefined") {
            try {
                const userData = await $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/currentuser",
                    method: "GET",
                    headers: { Accept: "application/json;odata=verbose" },
                });
                window.__complianceHistoryCreatedByUserId = userData && userData.d ? userData.d.Id : null;
            } catch (e) {
                console.warn("Failed to load current user id:", e);
                window.__complianceHistoryCreatedByUserId = null;
            }
        }

        for (const payload of payloads) {
            try {
                if (window.__complianceHistoryCreatedByUserId != null && payload && !payload.createdByUserId) {
                    payload.createdByUserId = window.__complianceHistoryCreatedByUserId;
                }
                const res = await $.ajax({
                    url,
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(payload),
                });

                console.log("createcompliancehistoryitem success. body:", payload, "response:", res);
                if (!res || res.isSuccess === false) {
                    console.warn("createcompliancehistoryitem returned failure:", res);
                }
            } catch (xhr) {
                console.warn("createcompliancehistoryitem failed. body:", payload, "error:", xhr);
            }
        }
    } catch (err) {
        console.warn("callCreateComplianceHistoryItems error:", err);
    }
}

async function callUpdateProjectOverallComplianceStatus(projectCode) {
    try {
        if (typeof APIURL === "undefined" || !APIURL) return;
        if (!projectCode) return;

        const url = `${APIURL}/job/updateprojectoverallcompliancestatus/${projectCode}`;
        const res = await $.ajax({
            url,
            method: "POST",
            contentType: "application/json; charset=utf-8",
        });

        console.log("updateprojectoverallcompliancestatus success:", res);
        if (!res || res.isSuccess === false) {
            console.warn("updateprojectoverallcompliancestatus returned failure:", res);
        }
    } catch (xhr) {
        console.warn("updateprojectoverallcompliancestatus failed:", xhr);
    }
}
// Added button parameter to re-enable it after save
// options: { progressStage: boolean, redirect: boolean }
async function savePhaseCompliance(phaseCode, results, buttonElement, compliantCount, nonCompliantCount, phaseStatus, options) {
    const projectCode = pcode || new URLSearchParams(window.location.search).get('PCODE');
    const lang = localStorage.getItem('lng') || 'ar';
    
    if (!projectCode) {
        alert((lang === 'ar') ? "لا يوجد رمز مشروع صالح" : "No valid project code found.");
        if (buttonElement) {
            buttonElement.disabled = false;
            buttonElement.textContent = (lang === 'ar') ? 'حفظ' : 'Save';
        }
        return;
    }

    if (!results || results.length === 0) {
        alert((lang === 'ar') ? "لا توجد بيانات للحفظ" : "No data to save.");
        if (buttonElement) {
            buttonElement.disabled = false;
            buttonElement.textContent = (lang === 'ar') ? 'حفظ' : 'Save';
        }
        return;
    }

    let projectTitle = null;

    // Default options if not provided
    if (!options) {
        options = { progressStage: true, redirect: true };
    }

    try {
        // 1. Check or create ProjectCompliance item
        const pcResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('ProjectCompliance')/items?$filter=ProjectCode eq '${projectCode}' and Phase eq '${phaseCode}'`, {
            headers: { 
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose"
            },
        });

        if (!pcResponse.ok) {
            throw new Error(`HTTP error! status: ${pcResponse.status}`);
        }

        const pcData = await pcResponse.json();

        if (pcData.d && pcData.d.results && pcData.d.results.length > 0) {
            // Exists: get the title
            const existingPC = pcData.d.results[0];
            projectTitle = existingPC.Title;

            // Get the item's __metadata for proper etag
            const itemResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('ProjectCompliance')/items(${existingPC.Id})`, {
                headers: { 
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                },
            });

            if (itemResponse.ok) {
                const itemData = await itemResponse.json();
                const etag = itemData.d.__metadata ? itemData.d.__metadata.etag : "*";

                // Update with proper headers and etag
                const updateResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('ProjectCompliance')/items(${existingPC.Id})`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose",
                        "IF-MATCH": etag,
                        "X-HTTP-Method": "MERGE",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    },
                    body: JSON.stringify({
                        "__metadata": { "type": "SP.Data.ProjectComplianceListItem" },
                        "ComplianceDegree": compliantCount,
                        "Status": phaseStatus,
                        "NonComplianceDegree": nonCompliantCount,
                        "DeletionStatus": "",
                        "MasterKey": "projects"
                    }),
                });

                if (!updateResponse.ok) {
                    console.warn("Failed to update LastSaved timestamp:", await updateResponse.text());
                }
            }
        } else {
              // Generate unique title for this phase
            projectTitle = `PC-${projectCode}-${phaseCode}`;
            // Not found: create new
            const createPC = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('ProjectCompliance')/items`, {
                method: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                },
                body: JSON.stringify({
                    "__metadata": { "type": "SP.Data.ProjectComplianceListItem" },
                    "Title": projectTitle,
                    "ProjectCode": projectCode,
                    "Phase": phaseCode,
                    "ComplianceDegree": compliantCount,
                    "Status": phaseStatus,
                    "NonComplianceDegree": nonCompliantCount,
                    "DeletionStatus": "",
                    "MasterKey": "projects",
                }),
            });

            if (!createPC.ok) {
                const errorText = await createPC.text();
                throw new Error(`Failed to create ProjectCompliance item: ${createPC.status} - ${errorText}`);
            }

            const createdData = await createPC.json();
            projectTitle = createdData.d.Title;
        }

        // 2. Save compliance details
        for (let item of results) {
            try {
                const detailResponse = await fetch(
                    `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('ProjectComplianceDetails')/items?$filter=ProjectComplianceCode eq '${projectTitle}' and ComplianceCode eq '${item.title}'`,
                    {
                        headers: { 
                            Accept: "application/json;odata=verbose",
                            "Content-Type": "application/json;odata=verbose"
                        },
                    }
                );

                if (!detailResponse.ok) {
                    throw new Error(`Failed to fetch detail for ${item.title}: ${detailResponse.status}`);
                }

                const detailData = await detailResponse.json();
                const isUpdate = detailData.d && detailData.d.results && detailData.d.results.length > 0;

                if (isUpdate) {
                    // Update existing detail
                    const existingDetail = detailData.d.results[0];
                    const detailId = existingDetail.Id;
                    
                    // Get the item's etag for proper update
                    const itemResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('ProjectComplianceDetails')/items(${detailId})`, {
                        headers: { 
                            Accept: "application/json;odata=verbose",
                            "Content-Type": "application/json;odata=verbose"
                        },
                    });

                    let etag = "*";
                    if (itemResponse.ok) {
                        const itemData = await itemResponse.json();
                        etag = itemData.d.__metadata ? itemData.d.__metadata.etag : "*";
                    }

                    const updateDetailResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('ProjectComplianceDetails')/items(${detailId})`, {
                        method: "POST",
                        headers: {
                            "Accept": "application/json;odata=verbose",
                            "Content-Type": "application/json;odata=verbose",
                            "IF-MATCH": etag,
                            "X-HTTP-Method": "MERGE",
                            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                        },
                        body: JSON.stringify({
                            "__metadata": { "type": "SP.Data.ProjectComplianceDetailsListItem" },
                            "ComplianceCode": item.title,
                            "ProjectComplianceCode": projectTitle,
                            "ComplianceValue": item.selection,
                            "Status": item.representation,
                            "Notes": item.notes || ""
                        }),
                    });

                    if (!updateDetailResponse.ok) {
                        const errorText = await updateDetailResponse.text();
                        throw new Error(`Failed to update detail ${item.title}: ${updateDetailResponse.status} - ${errorText}`);
                    }
                } else {
                    // Insert new detail
                    const createDetailResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('ProjectComplianceDetails')/items`, {
                        method: "POST",
                        headers: {
                            "Accept": "application/json;odata=verbose",
                            "Content-Type": "application/json;odata=verbose",
                            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                        },
                        body: JSON.stringify({
                            "__metadata": { "type": "SP.Data.ProjectComplianceDetailsListItem" },
                            "Title": item.title,
                            "ComplianceCode": item.title,
                            "ProjectComplianceCode": projectTitle,
                            "ComplianceValue": item.selection,
                            "Status": item.representation,
                            "Notes": item.notes || ""
                        }),
                    });

                    if (!createDetailResponse.ok) {
                        const errorText = await createDetailResponse.text();
                        throw new Error(`Failed to create detail ${item.title}: ${createDetailResponse.status} - ${errorText}`);
                    }
                }
            } catch (itemError) {
                console.error(`Error processing item ${item.title}:`, itemError);
                throw itemError;
            }
        }

           // Update Project List with compliance data ONLY if saving current phase
           var stageBlockedByDeadline = false;
           if ((isCurrentProjectPhase(phaseCode) || (options && options.action === "moveToNextStage")) &&
               options.progressStage &&
               currentProjectData) {

                try {
                    var moveGate = await checkCanMoveProjectToNextStage(projectCode);
                    if (!moveGate.allowed) {
                        stageBlockedByDeadline = true;
                        alert(moveGate.message);
                    } else {
                        const stageResult = await progressProjectStage(projectCode, currentProjectData);
                        console.log("Stage progressed to:", stageResult.nextStage);
                    }
                } catch (stageError) {
                    console.error("Failed to progress stage:", stageError);
                    stageBlockedByDeadline = true;
                    alert(
                        (lang === "ar")
                            ? "حدث خطأ أثناء الانتقال للمرحلة التالية: " + stageError.message
                            : "An error occurred while moving to the next stage: " + stageError.message
                    );
                }
           }
        await updateProjectListCompliance(projectCode, compliantCount, nonCompliantCount, phaseStatus);

        if (stageBlockedByDeadline) {
            if (options) options.redirect = false;
        } else if (options && options.action === "moveToNextStage") {
            alert((lang === 'ar') ? "تم الانتقال للمرحلة التالية بنجاح" : "Moved to next stage successfully");
        } else {
            alert((lang === 'ar') ? "تم الحفظ بنجاح" : "Saved successfully");
        }

        // DU: after successful "Save" (no stage move), call compliance history API
        if (typeof currentUserRole !== "undefined" &&
            currentUserRole === "DU" &&
            options &&
            options.progressStage === false) {

            let masterID = currentProjectData && currentProjectData.Id ? String(currentProjectData.Id) : "";
            if (!masterID) {
                try {
                    const projectResponse = await fetch(
                        `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Projects')/items?$filter=Title eq '${projectCode}'`,
                        { headers: { Accept: "application/json;odata=verbose" } }
                    );
                    if (projectResponse.ok) {
                        const projectData = await projectResponse.json();
                        if (projectData.d && projectData.d.results && projectData.d.results.length) {
                            masterID = String(projectData.d.results[0].Id);
                        }
                    }
                } catch (e) {
                    console.warn("Failed to resolve masterID for compliance history:", e);
                }
            }

            const payloads = (results || []).map(function (r) {
                return {
                    relatedItemTitle: projectCode,
                    phase: phaseCode,
                    complianceCode: r.title,
                    complianceValue: r.selection || "",
                    status: r.representation || "",
                    notes: r.notes || "",
                    masterID: masterID,
                    masterKey: "projects",
                };
            });

            await callCreateComplianceHistoryItems(payloads);
        }

        // Enable "Move to Next Stage" button for this phase (if exists and we stayed on page)
        // For DU: enable only AFTER API call above completes.
        if (buttonElement && !options.progressStage) {
            var section = buttonElement.closest('.phase-section');
            if (section) {
                var moveBtn = section.querySelector('.btn-move-next-stage');
                if (moveBtn) {
                    moveBtn.disabled = false;
                }
            }
        }

        // After Move To Next Stage and before redirection, refresh overall compliance status.
        if (options && options.action === "moveToNextStage" && !stageBlockedByDeadline) {
            await callUpdateProjectOverallComplianceStatus(projectCode);
        }

        // Redirect to project home page after successful save if allowed
        if (options.redirect) {
            setTimeout(function() {
                window.location.href = _spPageContextInfo.webAbsoluteUrl + 
                    "/sitepages/ProjectHome.aspx?PCODE=" + projectCode;
            }, 500);
        }

    } catch (err) {
        console.error("Error in saving data:", err);
     
        alert((lang === 'ar') ? "حدث خطأ أثناء الحفظ: " + err.message : "An error occurred during save: " + err.message);
    } finally {
        // Always re-enable the button
        if (buttonElement) {
            buttonElement.disabled = false;
            if (options && options.action === "moveToNextStage") {
                buttonElement.textContent = (lang === 'ar') ? 'الانتقال للمرحلة التالية' : 'Move to Next Stage';
            } else {
                buttonElement.textContent = (lang === 'ar') ? 'حفظ' : 'Save';
            }
        }
    }
}

 // دالة مساعدة لتحديث حالة أزرار الحفظ والرفض لمرحلة معينة
 function updateButtonStates(phaseCode) {
     const lang = localStorage.getItem('lng') || 'ar';

     // البحث عن القسم الخاص بهذه المرحلة
     var section = document.querySelector('.phase-section h3[data-phase-code="' + phaseCode + '"]').closest('.phase-section');
     if (!section) return;

     var submitBtn = section.querySelector('.btn-action.btn-Save');
     var rejectBtn = section.querySelector('.btn-action.btn-details.ms-2'); // زر الرفض

     if (!submitBtn) return; // يجب أن يكون زر الحفظ موجودًا دائمًا

     // تحديد ما إذا كانت هذه المرحلة هي المرحلة الحالية للمشروع
     // تأكد أن currentProjectPhase تم تعيينه قبل استدعاء هذه الدالة
     const isCurrentPhase = isCurrentProjectPhase(phaseCode);

     // إعادة حساب الإحصائيات للحصول على أحدث حالة امتثال للمرحلة
     // هذه الإحصائيات تعتمد على البيانات المحملة من SharePoint عند فتح الصفحة
     var itemsForPhase = phaseItemMap[phaseCode] || [];
     var currentCompliantCount = 0;
     var currentNonCompliantCount = 0;
     itemsForPhase.forEach(function(item) {
         // استخدم القيمة الحالية في الـ select box (التي تم تطبيقها من detailsMap)
         if (item.representedEl.value === 'compliance') {
             currentCompliantCount++;
         } else if (item.representedEl.value === 'noncompliance') {
             currentNonCompliantCount++;
         }
     });
     const currentPhaseComplianceStatus = currentNonCompliantCount > 0 ? 'noncompliance' : 'compliance';

     // تطبيق المنطق على زر الحفظ
     if (isCurrentPhase) {
         submitBtn.disabled = false;
     } else {
         if (currentPhaseComplianceStatus === 'noncompliance') {
             submitBtn.disabled = false;
         } else {
             submitBtn.disabled = true;
         }
     }

     // تطبيق المنطق على زر الرفض
     if (rejectBtn) { // تأكد من وجود الزر قبل محاولة الوصول إليه
         if (isCurrentPhase) {
             rejectBtn.disabled = false;
         } else {
             if (currentPhaseComplianceStatus === 'noncompliance') {
                 rejectBtn.disabled = false;
             } else {
                 rejectBtn.disabled = true;
             }
         }
     }
 }
 
 // دالة لتطبيق قواعد مدير وحدة الإنجاز (DU) على الأزرار
 function applyDURulesToButtons(phaseCode) {
    // تحقق أولاً إذا كان المستخدم هو DU
    var isDU = (typeof currentUserRole !== 'undefined' && currentUserRole === 'DU');
    if (!isDU) {
        return; // لا تفعل شيئًا إذا لم يكن المستخدم DU
    }

    var section = document.querySelector('.phase-section h3[data-phase-code="' + phaseCode + '"]').closest('.phase-section');
    if (!section) return;

    var submitBtn = section.querySelector('.btn-action.btn-Save.Resources');
    var rejectBtn = section.querySelector('.btn-action.btn-details.ms-2');

    if (!submitBtn) return;

    const isCurrentPhase = isCurrentProjectPhase(phaseCode);

    // هذا المنطق ينطبق فقط على المرحلة الحالية للمشروع
    if (isCurrentPhase) {
        var itemsForPhase = phaseItemMap[phaseCode] || [];
        var currentNonCompliantCount = 0;
        itemsForPhase.forEach(function(item) {
            // نعتمد على قيمة representedEl.value لتحديد الامتثال
            if (item.representedEl.value === 'noncompliance') {
                currentNonCompliantCount++;
            }
        });
        const currentPhaseComplianceStatus = currentNonCompliantCount > 0 ? 'noncompliance' : 'compliance';

        console.log(`DU Rules for Phase: ${phaseCode}`);
        console.log(`Is Current Phase: ${isCurrentPhase}`);
        console.log(`Compliance Status: ${currentPhaseComplianceStatus}`);
        console.log(`Non-Compliant Count: ${currentNonCompliantCount}`);

        if (currentPhaseComplianceStatus === 'compliance') {
            submitBtn.disabled = false; // إذا كانت ممتثلة -> حفظ فعال
            if (rejectBtn) rejectBtn.disabled = true; // طلب معلومات معطل
            console.log("DU: Current Phase - Compliance. Save Enabled, Reject Disabled.");
        } else { // noncompliance
            submitBtn.disabled = true; // إذا كانت غير ممتثلة -> حفظ معطل
            if (rejectBtn) rejectBtn.disabled = false; // طلب معلومات فعال
            console.log("DU: Current Phase - Non-Compliance. Save Disabled, Reject Enabled.");
        }
    } else {
        // للمراحل غير الحالية، يتم تعطيل كلا الزرين لـ DU
        // هذا يضمن أن قواعد DU تتجاوز أي شيء آخر للمراحل غير الحالية أيضًا
        submitBtn.disabled = true;
        if (rejectBtn) rejectBtn.disabled = true;
        console.log("DU: Not Current Phase. Save Disabled, Reject Disabled.");
    }
}


    await gettingProjectTitle();

   setTimeout(function() {
     // ابحث عن جميع أقسام المراحل الموجودة حاليًا في الـ DOM
     var allPhaseSections = document.querySelectorAll('.phase-section');
     allPhaseSections.forEach(function(section) {
         var phaseContent = section.querySelector('.phase-content');
         if (phaseContent) {
             var phaseCode = phaseContent.getAttribute('data-phase-code');
             if (phaseCode) {
                 updateButtonStates(phaseCode);

                 applyDURulesToButtons(phaseCode);
             }
         }
     });
 }, 1000); 

});