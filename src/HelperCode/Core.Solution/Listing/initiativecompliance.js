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
debugger;
var icode = new URLSearchParams(window.location.search).get('ICODE');
if(!icode)
{
    var listicode = new URLSearchParams(window.location.search).getAll('ICODE');
    for(var i=0;i<listicode.length;i++)
    {
        if(listicode[i] != '' && listicode[i] != "")
        { icode = listicode[i]; }
    }
}
var phaseItemMap = {};
window.phaseItemMap = phaseItemMap;
$(document).ready(async function () {
    console.log(UserRole);
    var lang = localStorage.getItem('lng') || 'ar';
    var phasesJson = localStorage.getItem('Dynamo_IPhases');
    var initiativeTitle;
    var detailsMap = {};
    var phaseItemMap = {};
    var renderedPhaseCodes = [];
    var currentInitiativeData = null;
  

    // Validate required parameters
    if (!icode) {
        alert((lang === 'ar') ? "رمز المبادرة مطلوب" : "Initiative code is required");
        return;
    }

    // إضافة متغير لتخزين مرحلة المبادرة الحالية
var currentInitiativePhase = null;

// إضافة دالة جديدة للحصول على مرحلة المبادرة
async function getInitiativePhase() {
    try {
        const initiativeResponse = await fetch(
            _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Initiatives')/items?$filter=Title eq '" + icode + "'",
            {
                headers: {
                    Accept: "application/json;odata=nometadata",
                },
            }
        );
        
        if (!initiativeResponse.ok) {
            throw new Error("HTTP error! status: " + initiativeResponse.status);
        }
        
        const initiativeData = await initiativeResponse.json();
        if (initiativeData.value && initiativeData.value.length > 0) {
            currentInitiativePhase = initiativeData.value[0].Phase;
            currentInitiativeData = initiativeData.value[0];
            console.log("Current initiataive phase:", currentInitiativePhase);
         setTimeout(() => {

            $(".page-title").html(
                '<a href="' +
                  _spPageContextInfo.webAbsoluteUrl +
                  "/sitepages/InitiativeHome.aspx?ICODE=" +
                  icode +
                  '">' +
                  initiativeData.value[0].Name +
                
                  "</a> &nbsp;>&nbsp; " +
                  '<a href="' +
                  _spPageContextInfo.webAbsoluteUrl +
                  "/sitepages/InitiativeCompliance.aspx?ICODE=" +
                  icode +
                  '">' +
                  (lang === "ar" ? "امتثال المبادرات" : "Initiative Compliance") +
                 
                  "</a>"
              );
              


                }, 1000);
                document.title = lang === "ar" ? "امتثال المبادرات" : "Initiative Compliance"
                } else {
                    console.warn("No Initiative found with code:", icode);
                    currentInitiativePhase = null;
                }
            } catch (error) {
                console.error("Error getting Initiative phase:", error);
                currentInitiativePhase = null;
                currentInitiativeData = null;
            }
}

// إضافة دالة لتصفية المراحل
// تعديل دالة shouldShowPhase للتعامل مع الحروف الكبيرة والصغيرة
function shouldShowPhase(phaseCode) {
    if (!currentInitiativePhase) {
        return true; // إذا لم نجد مرحلة المبادرة، نعرض كل المراحل
    }
    
    // تحويل كلاهما إلى حروف صغيرة للمقارنة
    var currentPhaseNum = parseInt(currentInitiativePhase.toLowerCase().replace('p', ''));
    var checkPhaseNum = parseInt(phaseCode.toLowerCase().replace('p', ''));
    
    console.log("Comparing phases - Current:", currentPhaseNum, "Check:", checkPhaseNum, "Should show:", checkPhaseNum <= currentPhaseNum);
    
    // نعرض المراحل من p1 حتى المرحلة الحالية فقط
    return checkPhaseNum <= currentPhaseNum;
}

 // تعديل جزء إنشاء sections في document ready
if (phasesJson) {
    const phases = JSON.parse(phasesJson);
    const container = document.getElementById('initiative-compliance');

    if (!container) {
        console.error("Container 'initiative-compliance' not found");
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

    async function gettingInitiativeTitle() {
        try {
            await getInitiativePhase();

            const response = await fetch(
                _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InitiativeCompliance')/items?$filter=InitiativeCode eq '" + icode + "'",
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
                initiativeTitle = data.value[0].Title;
                await gettingComplianceDetails();
                ComplianceMajors_Info_Request.init();
            } else {
                console.warn("No initiative found with code:", icode);
                // Still initialize the compliance majors even if no existing initiative
                ComplianceMajors_Info_Request.init();
            }
        } catch (error) {
            console.error("Error in gettingInitiativeTitle:", error);
            alert((lang === 'ar') ? "خطأ في تحميل بيانات المبادرة" : "Error loading initiative data");
        }
    }

  // دالة معدلة لجلب تفاصيل الامتثال لكل المراحل
async function gettingComplianceDetails() {
    try {
        const response = await fetch(
            _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('InitiativeComplianceDetails')/items?$filter=startswith(InitiativeComplianceCode, 'IC-" + icode + "')",
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
                
                // استخراج رقم المرحلة من InitiativeComplianceCode
                var phaseMatch = item.InitiativeComplianceCode.match(/IC-.*-P(\d+)/);
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
            var oList = clientContext.get_web().get_lists().getByTitle("IComplianceMajors");
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

                        var isCurrentPhase = isCurrentInitiativePhase(currentPhaseCode);
                        var progressStage = isCurrentPhase;
                        var redirect = true;

                        if (typeof currentUserRole !== 'undefined') {
                            if (currentUserRole === 'CQTeam') {
                                // CQTeam: save only, no stage move, no redirect
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
    
                // Check if user is not a Initiatve Manager
                var isInitiativeManager = false;
                if (typeof currentUserRole !== 'undefined' && currentUserRole === 'InitiativeManager') {
                    isInitiativeManager = true;
                }
    
           // Add Need Info button for non-Initiatve Managers
           if (!isInitiativeManager) {
            var rejectBtn = document.createElement('button');
            rejectBtn.className = 'btn btn-action btn-details ms-2';
            rejectBtn.disabled = false;
            rejectBtn.textContent = (lang === 'ar') ? 'طلب معلومات إضافيه' : 'Request more info';
            rejectBtn.setAttribute("type", "button");
            
            (function(currentPhaseCode) {
                rejectBtn.addEventListener('click', function() {
                    var confirmMsg = (lang === 'ar') ? 
                        'هل أنت متأكد من طلب معلومات إضافيه للمبادرة' : 
                        'Are you sure you want to request more info for the initiative?';
                    
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
        
                    rejectInitiative(currentPhaseCode, results, this, compliantCount, nonCompliantCount, phaseStatus);
                });
            })(phaseCode);
            
            buttonCol.appendChild(rejectBtn);
        }

        // Add "Move to Next Stage" button only for CQTeam on current phase
        if (typeof currentUserRole !== 'undefined' &&
            currentUserRole === 'CQTeam' &&
            isCurrentInitiativePhase(phaseCode)) {

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

                    // For CQTeam via Move To Next Stage: progress and redirect
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

          
        },
    
        onError: function (sender, args) {
            console.error("Error:", args.get_message());
            alert((localStorage.getItem('lng') === 'ar') ? "حدث خطأ أثناء تحميل البيانات" : "Error loading data");
        }
    }
    
    async function rejectInitiative(phaseCode, results, buttonElement, compliantCount, nonCompliantCount, phaseStatus) {
        const initiativeCode = icode || new URLSearchParams(window.location.search).get('ICODE');
        const lang = localStorage.getItem('lng') || 'ar';
        
        if (!initiativeCode) {
            alert((lang === 'ar') ? "لا يوجد رمز مبادرة صالح" : "No valid initiative code found.");
            if (buttonElement) {
                buttonElement.disabled = false;
                buttonElement.textContent = (lang === 'ar') ? 'طلب معلومات إضافيه' : 'Request more info';
            }
            return;
        }
    
        try {
            // 1. Save compliance data first
            await saveComplianceDataOnly(phaseCode, results, compliantCount, nonCompliantCount, phaseStatus);
            
            // 2. Get stage from initiatives
            const initiativeResponse = await fetch(
                `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Initiatives')/items?$filter=Title eq '${initiativeCode}'`,
                {
                    headers: {
                        Accept: "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose"
                    },
                }
            );
    
            if (!initiativeResponse.ok) {
                throw new Error(`Failed to fetch initiative: ${initiativeResponse.status}`);
            }
    
            const initiativeData = await initiativeResponse.json();
            if (!initiativeData.d || !initiativeData.d.results || initiativeData.d.results.length === 0) {
                throw new Error(`No initiative found with code: ${initiativeCode}`);
            }
    
            const initiative = initiativeData.d.results[0];
            const currentStage = initiative.WFStage;
            const initiativeId = initiative.Id;
    
            // 3. Get task data
            const tasksResponse = await fetch(
                `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Tasks')/items?$filter=Title eq '${currentStage}' and RelatedItemTitle eq '${initiativeCode}' and Status eq 'Open'`,
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
                throw new Error(`No task found for stage ${currentStage} and initiative ${initiativeCode}`);
            }
    
            const task = tasksData.d.results[0];
            const rejectStage = task.StageIDReject;
            const taskId = task.Id;
    
            // 4. Update task status with reject action
            await updateTaskStatusReject(taskId);
    
            // 5. Update initiataive stage to reject stage
            await updateInitiativeStageReject (initiativeId, rejectStage ,  compliantCount, nonCompliantCount, phaseStatus);
    
            alert((lang === 'ar') ? "تم طلب معلومات إضافيه المبادرة بنجاح" : "Initiative request more info successfully");
            
            // Redirect to initiataive home page
            setTimeout(function() {
                window.location.href = _spPageContextInfo.webAbsoluteUrl + 
                    "/sitepages/InitiativeHome.aspx?ICODE=" + initiativeCode;
            }, 500);
    
        } catch (err) {
            console.error("Error in rejecting initiative:", err);
            alert((lang === 'ar') ? "حدث خطأ أثناء طلب معلومات إضافيه المبادرة: " + err.message : "An error occurred during initiative request more info: " + err.message);
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
    
    // دالة تحديث مرحلة المبادرة للرفض
    async function updateInitiativeStageReject (initiativeId, rejectStage , compliantCount, nonCompliantCount, phaseStatus) {
        const initiativeResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Initiatives')/items(${initiativeId})`,
            {
                headers: {
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                },
            }
        );
    
        let etag = "*";
        if (initiativeResponse.ok) {
            const initiativeData = await initiativeResponse.json();
            etag = initiativeData.d.__metadata ? initiativeData.d.__metadata.etag : "*";
        }
    
        const updateInitiativeResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Initiatives')/items(${initiativeId})`,
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
                    "WFStage": rejectStage,
                    "__metadata": { "type": "SP.Data.InitiativesListItem" },
                    "ComplianceDegree": compliantCount,
                    "Status": phaseStatus,
                    "NonComplianceDegree": nonCompliantCount
                }),
            }
        );
    
        if (!updateInitiativeResponse.ok) {
            const errorText = await updateInitiativeResponse.text();
            throw new Error(`Failed to update initiataive stage: ${updateInitiativeResponse.status} - ${errorText}`);
        }
    }

    // دالة حفظ بيانات الامتثال فقط (بدون تغيير المرحلة)
    async function saveComplianceDataOnly(phaseCode, results, compliantCount, nonCompliantCount, phaseStatus) {
        const initiativeCode = icode || new URLSearchParams(window.location.search).get('ICODE');
        
        if (!initiativeCode || !results || results.length === 0) {
            return;
        }
    
        let initiativeTitle = null;
    
        // Check or create InitiaitveCompliance item
        const icResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('InitiativeCompliance')/items?$filter=InitiativeCode eq '${initiativeCode}' and Phase eq '${phaseCode}'`, {
            headers: { 
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose"
            },
        });
    
        if (!icResponse.ok) {
            throw new Error(`HTTP error! status: ${icResponse.status}`);
        }
    
        const icData = await icResponse.json();
    
        if (icData.d && icData.d.results && icData.d.results.length > 0) {
            const existingIC = icData.d.results[0];
            initiativeTitle = existingIC.Title;
    
            const itemResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('InitiativeCompliance')/items(${existingIC.Id})`, {
                headers: { 
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                },
            });
    
            if (itemResponse.ok) {
                const itemData = await itemResponse.json();
                const etag = itemData.d.__metadata ? itemData.d.__metadata.etag : "*";
    
                await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('InitiativeCompliance')/items(${existingIC.Id})`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose",
                        "IF-MATCH": etag,
                        "X-HTTP-Method": "MERGE",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    },
                    body: JSON.stringify({
                        "__metadata": { "type": "SP.Data.InitiativeComplianceListItem" },
                        "ComplianceDegree": compliantCount,
                        "Status": phaseStatus,
                        "NonComplianceDegree": nonCompliantCount,
                        "DeletionStatus": "",
                        "MasterKey": "initiaitves"
                    }),
                });
            }
        } else {
            initiativeTitle = `IC-${initiativeCode}-${phaseCode}`;
            const createIC = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('InitiativeCompliance')/items`, {
                method: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                },
                body: JSON.stringify({
                    "__metadata": { "type": "SP.Data.InitiativeComplianceListItem" },
                    "Title": initiativeTitle,
                    "InitiativeCode": initiativeCode,
                    "Phase": phaseCode,
                    "ComplianceDegree": compliantCount,
                    "Status": phaseStatus,
                    "NonComplianceDegree": nonCompliantCount,
                    "DeletionStatus": "",
                    "MasterKey": "initiatives",
                }),
            });
    
            if (!createIC.ok) {
                const errorText = await createIC.text();
                throw new Error(`Failed to create InitiativeCompliance item: ${createIC.status} - ${errorText}`);
            }
    
            const createdData = await createIC.json();
            initiativeTitle = createdData.d.Title;
        }
    
        // Save compliance details
        for (let item of results) {
            const detailResponse = await fetch(
                `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('InitiativeComplianceDetails')/items?$filter=InitiativeComplianceCode eq '${initiativeTitle}' and ComplianceCode eq '${item.title}'`,
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
                
                const itemResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('InitiativeComplianceDetails')/items(${detailId})`, {
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
    
                await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('InitiativeComplianceDetails')/items(${detailId})`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose",
                        "IF-MATCH": etag,
                        "X-HTTP-Method": "MERGE",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    },
                    body: JSON.stringify({
                        "__metadata": { "type": "SP.Data.InitiativeComplianceDetailsListItem" },
                        "ComplianceCode": item.title,
                        "InitiativeComplianceCode": initiativeTitle,
                        "ComplianceValue": item.selection,
                        "Status": item.representation,
                        "Notes": item.notes || ""
                    }),
                });
            } else {
                await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('InitiativeComplianceDetails')/items`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    },
                    body: JSON.stringify({
                        "__metadata": { "type": "SP.Data.InitiativeComplianceDetailsListItem" },
                        "Title": item.title,
                        "ComplianceCode": item.title,
                        "InitiativeComplianceCode": initiativeTitle,
                        "ComplianceValue": item.selection,
                        "Status": item.representation,
                        "Notes": item.notes || ""
                    }),
                });
            }
        }
    }
 // Helper function to check if the phase being saved is the current initiataive phase
function isCurrentInitiativePhase(phaseCode) {
    if (!currentInitiativePhase) {
        return false; // If no initiataive phase found, don't update Initiative List
    }

    // Convert both to lowercase for comparison
    var currentPhaseNum = parseInt(currentInitiativePhase.toLowerCase().replace('p', ''));
    var savePhaseNum = parseInt(phaseCode.toLowerCase().replace('p', ''));
    
    // Only update Initiative List if the phase being saved matches the current initiative phase
    return savePhaseNum === currentPhaseNum;
}
// Function to handle stage progression workflow using existing initiative data
async function progressInitiativeStage(initiativeCode, initiativeData) {
    try {
        // Step 1: Use existing initiative data (from getInitiativePhase function)
        if (!initiativeData || !initiativeData.WFStage) {
            throw new Error(`No valid initiative data or stage found for initiative: ${initiativeCode}`);
        }

        const currentStage = initiativeData.WFStage; 
        const initiativeId = initiativeData.Id;

        // Step 2: Get StageIDApprove and ID from Tasks List
        const tasksResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Tasks')/items?$filter=Title eq '${currentStage}' and RelatedItemTitle eq '${initiativeCode}' and Status eq 'Open'`,
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
            throw new Error(`No task found for stage ${currentStage} and initiative ${initiativeCode}`);
        }

        const task = tasksData.d.results[0];
        const nextStage = task.StageIDApprove; 
        const taskId = task.Id;

        // Step 3: Update Task Status to Closed and clear WFInstanceID
        await updateTaskStatus(taskId);

        // Step 4: Update Initiative Stage and remove draft status
        await updateInitiativeStage (initiativeId, nextStage, initiativeData);

        return { success: true, nextStage: nextStage };

    } catch (error) {
        console.error("Error in progressInitiativeStage:", error);
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

// Function to update initiative stage
async function updateInitiativeStage (initiativeId, nextStage, currentInitiaitve) {
    // Get initiative etag
    const initiativeResponse = await fetch(
        `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Initiatives')/items(${initiativeId})`,
        {
            headers: {
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose"
            },
        }
    );

    let etag = "*";
    if (initiativeResponse.ok) {
        const initiativeData = await initiativeResponse.json();
        etag = initiativeData.d.__metadata ? initiativeData.d.__metadata.etag : "*";
    }

    debugger;
    var phase = currentInitiativePhase;

    if(nextStage == "SInStage10" || nextStage == "VInStage12" || nextStage == "LInStage09")
    {
        phase ="P1";
    }

    if(nextStage == "SInStage12" || nextStage == "VInStage14" || nextStage == "LInStage11")
    {
        phase ="P2";
    }

    if(nextStage == "SInStage14" || nextStage == "VInStage16" || nextStage == "LInStage13")
    {
        phase ="P3";
    }

    if(nextStage == "SInStage16" || nextStage == "VInStage18" || nextStage == "LInStage15")
    {
        phase ="P4";
    }

    // Prepare update data - remove DraftStatus and WFStage, update WFStage
    const updateData = {
        "__metadata": { "type": "SP.Data.InitiativesListItem" },
        "WFStage": nextStage,
        "Phase" : phase
   
    };

    // Keep existing compliance data if present
    if (currentInitiaitve.ComplianceStatus) {
        updateData.ComplianceStatus = currentInitiaitve.ComplianceStatus;
    }
    if (currentInitiaitve.ComplianceDegree !== undefined) {
        updateData.ComplianceDegree = currentInitiaitve.ComplianceDegree;
    }
    if (currentInitiaitve.NonComplianceDegree !== undefined) {
        updateData.NonComplianceDegree = currentInitiaitve.NonComplianceDegree;
    }

    // Update initiative
    const updateInitiativeResponse = await fetch(
        `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Initiatives')/items(${initiativeId})`,
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
                "__metadata": { "type": "SP.Data.InitiativesListItem" },
                "WFStage": nextStage,
                "Phase" : phase
           
            }),
        }
    );

    if (!updateInitiativeResponse.ok) {
        const errorText = await updateInitiativeResponse.text();
        throw new Error(`Failed to update initiaitve stage: ${updateInitiativeResponse.status} - ${errorText}`);
    }

}

// إضافة هذه الدالة الجديدة قبل دالة savePhaseCompliance
async function updateInitiaitveListCompliance(initiativeCode, compliantCount, nonCompliantCount, phaseStatus) {
    try {
        // الحصول على بيانات المبادرة من Initiatives list
        const initiativeResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Initiatives')/items?$filter=Title eq '${initiativeCode}'`,
            {
                headers: {
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                },
            }
        );

        if (!initiativeResponse.ok) {
            throw new Error(`Failed to fetch Initiatives: ${initiativeResponse.status}`);
        }

        const initiativeData = await initiativeResponse.json();
        
        if (!initiativeData.d || !initiativeData.d.results || initiativeData.d.results.length === 0) {
            throw new Error(`No Initiatives found with code: ${initiativeCode}`);
        }

        const initiaitve = initiativeData.d.results[0];
        const initiativeId = initiaitve.Id;

        // الحصول على etag للمبادرة
        const initiaitveItemResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Initiatives')/items(${initiativeId})`,
            {
                headers: {
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                },
            }
        );

        let etag = "*";
        if (initiaitveItemResponse.ok) {
            const initiaitveItemData = await initiaitveItemResponse.json();
            etag = initiaitveItemData.d.__metadata ? initiaitveItemData.d.__metadata.etag : "*";
        }

        // تحديث المبادرة بالبيانات الجديدة
        const updateInitiativeResponse = await fetch(
            `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Initiatives')/items(${initiativeId})`,
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
                    "__metadata": { "type": "SP.Data.InitiativesListItem" },
                    "ComplianceStatus": phaseStatus,
                    "ComplianceDegree": compliantCount,
                    "NonComplianceDegree": nonCompliantCount,
                }),
            }
        );

        if (!updateInitiativeResponse.ok) {
            const errorText = await updateInitiativeResponse.text();
            throw new Error(`Failed to update initiative compliance data: ${updateInitiativeResponse.status} - ${errorText}`);
        }

        console.log(`Successfully updated initiative ${initiativeCode} with compliance data`);
        
    } catch (error) {
        console.error("Error updating initiative list compliance:", error);
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
// Added button parameter to re-enable it after save
// options: { progressStage: boolean, redirect: boolean }
async function savePhaseCompliance(phaseCode, results, buttonElement, compliantCount, nonCompliantCount, phaseStatus, options) {
    const initiativeCode = icode || new URLSearchParams(window.location.search).get('ICODE');
    const lang = localStorage.getItem('lng') || 'ar';
    
    if (!initiativeCode) {
        alert((lang === 'ar') ? "لا يوجد رمز مبادرة صالح" : "No valid initiative code found.");
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

    let initiativeTitle = null;

    // Default options if not provided
    if (!options) {
        options = { progressStage: true, redirect: true };
    }

    try {
        // 1. Check or create InitiativeCompliance item
        const icResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('InitiativeCompliance')/items?$filter=InitiativeCode eq '${initiativeCode}' and Phase eq '${phaseCode}'`, {
            headers: { 
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose"
            },
        });

        if (!icResponse.ok) {
            throw new Error(`HTTP error! status: ${icResponse.status}`);
        }

        const icData = await icResponse.json();

        if (icData.d && icData.d.results && icData.d.results.length > 0) {
            // Exists: get the title
            const existingIC = icData.d.results[0];
            initiativeTitle = existingIC.Title;

            // Get the item's __metadata for proper etag
            const itemResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('InitiativeCompliance')/items(${existingIC.Id})`, {
                headers: { 
                    Accept: "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                },
            });

            if (itemResponse.ok) {
                const itemData = await itemResponse.json();
                const etag = itemData.d.__metadata ? itemData.d.__metadata.etag : "*";

                // Update with proper headers and etag
                const updateResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('InitiativeCompliance')/items(${existingIC.Id})`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose",
                        "IF-MATCH": etag,
                        "X-HTTP-Method": "MERGE",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    },
                    body: JSON.stringify({
                        "__metadata": { "type": "SP.Data.InitiativeComplianceListItem" },
                        "ComplianceDegree": compliantCount,
                        "Status": phaseStatus,
                        "NonComplianceDegree": nonCompliantCount,
                        "DeletionStatus": "",
                        "MasterKey": "initiatives"
                    }),
                });

                if (!updateResponse.ok) {
                    console.warn("Failed to update LastSaved timestamp:", await updateResponse.text());
                }
            }
        } else {
              // Generate unique title for this phase
            initiativeTitle = `IC-${initiativeCode}-${phaseCode}`;
            // Not found: create new
            const createIC = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('InitiativeCompliance')/items`, {
                method: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                },
                body: JSON.stringify({
                    "__metadata": { "type": "SP.Data.InitiativeComplianceListItem" },
                    "Title": initiativeTitle,
                    "InitiativeCode": initiativeCode,
                    "Phase": phaseCode,
                    "ComplianceDegree": compliantCount,
                    "Status": phaseStatus,
                    "NonComplianceDegree": nonCompliantCount,
                    "DeletionStatus": "",
                    "MasterKey": "initiatives",
                }),
            });

            if (!createIC.ok) {
                const errorText = await createIC.text();
                throw new Error(`Failed to create InitiaitveCompliance item: ${createIC.status} - ${errorText}`);
            }

            const createdData = await createIC.json();
            initiativeTitle = createdData.d.Title;
        }

        // 2. Save compliance details
        for (let item of results) {
            try {
                const detailResponse = await fetch(
                    `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('InitiativeComplianceDetails')/items?$filter=InitiativeComplianceCode eq '${initiativeTitle}' and ComplianceCode eq '${item.title}'`,
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
                    const itemResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('InitiativeComplianceDetails')/items(${detailId})`, {
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

                    const updateDetailResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('InitiativeComplianceDetails')/items(${detailId})`, {
                        method: "POST",
                        headers: {
                            "Accept": "application/json;odata=verbose",
                            "Content-Type": "application/json;odata=verbose",
                            "IF-MATCH": etag,
                            "X-HTTP-Method": "MERGE",
                            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                        },
                        body: JSON.stringify({
                            "__metadata": { "type": "SP.Data.InitiativeComplianceDetailsListItem" },
                            "ComplianceCode": item.title,
                            "InitiativeComplianceCode": initiativeTitle,
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
                    const createDetailResponse = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('InitiativeComplianceDetails')/items`, {
                        method: "POST",
                        headers: {
                            "Accept": "application/json;odata=verbose",
                            "Content-Type": "application/json;odata=verbose",
                            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                        },
                        body: JSON.stringify({
                            "__metadata": { "type": "SP.Data.InitiativeComplianceDetailsListItem" },
                            "Title": item.title,
                            "ComplianceCode": item.title,
                            "InitiativeComplianceCode": initiativeTitle,
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

           // Update Initiative List with compliance data ONLY if saving current phase
           if (isCurrentInitiativePhase(phaseCode) &&
               options.progressStage &&
               currentInitiativeData) {
        
                // Progress stage only if saving current phase and initiative data is available
                try {
                    const stageResult = await progressInitiativeStage(initiativeCode, currentInitiativeData);
                    console.log("Stage progressed to:", stageResult.nextStage);
                } catch (stageError) {
                    console.error("Failed to progress stage:", stageError);
                    // Don't throw error - stage progression failure shouldn't stop the save
                }
           }
        await updateInitiaitveListCompliance(initiativeCode, compliantCount, nonCompliantCount, phaseStatus);

        if (options && options.action === "moveToNextStage") {
            alert((lang === 'ar') ? "تم الانتقال للمرحلة التالية بنجاح" : "Moved to next stage successfully");
        } else {
            alert((lang === 'ar') ? "تم الحفظ بنجاح" : "Saved successfully");
        }

        // CQTeam: after successful "Save" (no stage move), call compliance history API
        if (typeof currentUserRole !== "undefined" &&
            currentUserRole === "CQTeam" &&
            options &&
            options.progressStage === false) {

            let masterID = currentInitiativeData && currentInitiativeData.Id ? String(currentInitiativeData.Id) : "";
            if (!masterID) {
                try {
                    const initiativeResponse = await fetch(
                        `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getbytitle('Initiatives')/items?$filter=Title eq '${initiativeCode}'`,
                        { headers: { Accept: "application/json;odata=verbose" } }
                    );
                    if (initiativeResponse.ok) {
                        const initiativeData = await initiativeResponse.json();
                        if (initiativeData.d && initiativeData.d.results && initiativeData.d.results.length) {
                            masterID = String(initiativeData.d.results[0].Id);
                        }
                    }
                } catch (e) {
                    console.warn("Failed to resolve masterID for compliance history:", e);
                }
            }

            const payloads = (results || []).map(function (r) {
                return {
                    relatedItemTitle: initiativeCode,
                    phase: phaseCode,
                    complianceCode: r.title,
                    complianceValue: r.selection || "",
                    status: r.representation || "",
                    notes: r.notes || "",
                    masterID: masterID,
                    masterKey: "initiatives",
                };
            });

            await callCreateComplianceHistoryItems(payloads);
        }

        // Enable "Move to Next Stage" button for this phase (if exists and we stayed on page)
        // For CQTeam: enable only AFTER API call above completes.
        if (buttonElement && !options.progressStage) {
            var section = buttonElement.closest('.phase-section');
            if (section) {
                var moveBtn = section.querySelector('.btn-move-next-stage');
                if (moveBtn) {
                    moveBtn.disabled = false;
                }
            }
        }
        
        // Redirect to initiative home page after successful save if allowed
        if (options.redirect) {
            setTimeout(function() {
                window.location.href = _spPageContextInfo.webAbsoluteUrl + 
                    "/sitepages/InitiativeHome.aspx?ICODE=" + initiativeCode;
            }, 500);
        }

    } catch (err) {
        console.error("Error in saving data:", err);
     
        alert((lang === 'ar') ? "حدث خطأ أثناء الحفظ: " + err.message : "An error occurred during save: " + err.message);
    } finally {
        // Always re-enable the button
        if (buttonElement) {
            buttonElement.disabled = false;
            buttonElement.textContent = (lang === 'ar') ? 'حفظ' : 'Save';
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

     // تحديد ما إذا كانت هذه المرحلة هي المرحلة الحالية للمبادرة
     // تأكد أن currentInitiativePhase تم تعيينه قبل استدعاء هذه الدالة
     const isCurrentPhase = isCurrentInitiativePhase(phaseCode);

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

    const isCurrentPhase = isCurrentInitiativePhase(phaseCode);

    // هذا المنطق ينطبق فقط على المرحلة الحالية للمبادرة
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


    await gettingInitiativeTitle();

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