var hrefOriginal = window.location.href;
var href = hrefOriginal.toLowerCase();
window.isNew = href.indexOf("isnew=true") > -1;
window.isView = href.indexOf("isview=true") > -1;
window.isEdit = href.indexOf("isedit=true") > -1;
window.isWF =
  window.location.href.indexOf("&WFs") > -1 ||
  window.location.href.indexOf("&wfs") > -1;
window.crItemCode = "";
window.crItemId = 0;
window.currentIsActive = true; // Track IsActive status from API
// IMPORTANT: don't lowercase CR code; it is case-sensitive for folders and display (e.g., NCR-25-0001)
try {
  var m = hrefOriginal.match(/critemcode=([^&]+)/i);
  if (m && m[1] !== undefined) {
    crItemCode = decodeURIComponent(m[1]);
  }
} catch (e) { }

var taskID = window.location.href.includes("TID=")
  ? window.location.href.split("TID=")[1].split("&")[0]
  : "";
var taskId = taskID; // Keep both for compatibility
var stageId = "";

// Flag to prevent automatic dynamic fields loading during initial data load in edit/view mode
window.isLoadingChangeRequestData = false;

var LoggedInUser = null;
var LoggedInUserTitle = null;
var LoggedInUserId = null;
var duSubSectorTitlesCache = null;
var duSubSectorTitlesPromise = null;
var currentApprovalPath = "";
var currentSecurityGroupName = "";

// Attachments (Change Requests)
var CR_ATTACHMENTS_LIBRARY = "SPM General Services";
var CR_ATTACHMENTS_ROOT_FOLDER = "changerequests";
var CR_ALLOWED_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "png",
  "jpg",
  "jpeg",
];
var CR_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB per file

function normalizeFileName(name) {
  if (!name) return "file";
  // SharePoint sometimes shows weird replacement chars; also avoid slashes
  return String(name)
    .replaceAll("�", "")
    .replace(/[\/\\]/g, "-");
}

function getCRAttachmentsFolderServerRelativeUrl() {
  // Do NOT create folders. Just return the existing folder:
  // <SPM General Services>/changerequests
  return new Promise(function (resolve) {
    try {
      function escapeODataString(s) {
        return String(s || "").replace(/'/g, "''");
      }

      $.ajax({
        url:
          _spPageContextInfo.webAbsoluteUrl +
          "/_api/web/lists/getbytitle('" +
          escapeODataString(CR_ATTACHMENTS_LIBRARY) +
          "')/RootFolder/ServerRelativeUrl",
        method: "GET",
        headers: { Accept: "application/json; odata=verbose" },
        success: function (data) {
          var rootUrl =
            data && data.d && data.d.ServerRelativeUrl
              ? data.d.ServerRelativeUrl
              : "";
          if (!rootUrl) return resolve("");
          resolve(rootUrl + "/" + CR_ATTACHMENTS_ROOT_FOLDER);
        },
        error: function () {
          resolve("");
        },
      });
    } catch (e) {
      resolve("");
    }
  });
}

function getSelectedChangeItemMeta() {
  var $opt = $("#ChangeItem option:selected");
  return {
    actionType: ($opt.data("actiontype") || $opt.attr("data-actiontype") || "")
      .toString()
      .toLowerCase(),
    listName: ($opt.data("listname") || $opt.attr("data-listname") || "")
      .toString()
      .toLowerCase(),
  };
}

function getCRAttachmentFiles() {
  var el = document.getElementById("CRAttachments");
  if (!el || !el.files) return [];
  return Array.prototype.slice.call(el.files);
}

function initCRAttachmentsUI() {
  try {
    // Enforce allowed extensions + accept attribute (unlimited count, 5MB per file)
    $("#CRAttachments")
      .attr(
        "accept",
        CR_ALLOWED_EXTENSIONS.map(function (e) {
          return "." + e;
        }).join(",")
      )
      .parent()
      .find(".acceptedfile")
      .text(CR_ALLOWED_EXTENSIONS.join(", "));

    // Set max size text to 5MB (do NOT use data-trans-fileSize because changeResources() would overwrite it)
    var isArabic =
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar";
    $("#CRAttachments")
      .parent()
      .find(".crFileSizeText")
      .text(
        isArabic ? "حجم الملف المسموح به هو : 5MB" : "Maximum file size: 5MB"
      );

    // Update chosen files UI (fallback if global handler isn't present)
    $("body").off("change.CRAttachments", "#CRAttachments");
    $("body").on("change.CRAttachments", "#CRAttachments", function () {
      var files = this.files ? Array.prototype.slice.call(this.files) : [];
      var $parent = $(this).parent();
      var $chosen = $parent.find("#file-chosen");
      var $noFile = $chosen.find("#nofile");
      var names = files
        .map(function (f) {
          return f && f.name ? f.name : "";
        })
        .filter(Boolean);

      // Hide errors initially
      $parent.find(".AttErrorMsg").hide();
      $parent.find(".notacceptedext").empty();

      // Show chosen names
      if (names.length) {
        if ($noFile.length) $noFile.remove();
        $chosen.text(names.join(", "));
      } else {
        // restore placeholder
        $chosen.html(
          '<span data-trans-nofile id="nofile" class="Resources"></span>'
        );
        changeResources();
      }

      // Basic extension + size checks (same behavior as global attachment validation)
      var hasInvalid = false;
      var invalidExts = [];
      var oversized = false;

      var exts = CR_ALLOWED_EXTENSIONS;

      files.forEach(function (file) {
        if (!file) return;
        if (file.size && file.size > CR_MAX_FILE_SIZE_BYTES) oversized = true;
        if (Array.isArray(exts) && exts.length) {
          var ext = (file.name || "").split(".").pop().toLowerCase();
          if (exts.indexOf(ext) === -1) {
            hasInvalid = true;
            invalidExts.push(ext);
          }
        }
      });

      if (hasInvalid) {
        $parent.find(".notacceptedext").text(invalidExts.join(", "));
        $parent.find(".AttErrorMsg").show();
      }
      if (oversized) {
        // Keep it simple: rely on existing text "Maximum file size: 5MB"
        $parent.find(".attErrorMsg").addClass("redColor");
      } else {
        $parent.find(".attErrorMsg").removeClass("redColor");
      }
    });
  } catch (e) { }
}

function loadCRExistingAttachments() {
  try {
    var id = parseInt(window.crItemId || 0, 10) || 0;
    var $list = $("#CRExistingAttachments");
    var $wrapper = $("#CRExistingAttachmentsWrapper");
    if (!$list.length || !$wrapper.length) return;

    $list.empty();

    if (!id) {
      $wrapper.hide();
      return;
    }

    var url =
      _spPageContextInfo.webAbsoluteUrl +
      "/_api/web/lists/getbytitle('" +
      CR_ATTACHMENTS_LIBRARY.replace(/'/g, "''") +
      "')/items?$top=5000&$select=Id,Title,ItemID,FileRef,FileLeafRef,FSObjType&$filter=ItemID eq " +
      id +
      " and FSObjType eq 0";

    $.ajax({
      url: url,
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (data) {
        var results = data && data.d && data.d.results ? data.d.results : [];
        if (!results.length) {
          $wrapper.hide();
          return;
        }

        $wrapper.show();
        results.forEach(function (it) {
          var name = it.FileLeafRef || it.Title || "File " + it.Id;
          var href = it.FileRef || "#";
          var canDelete = !!window.isEdit;
          var fileTitle = it.Title || "";
          var safeName = escapeHtml(name);
          var safeHref = escapeHtml(href);
          var safeTitle = escapeHtml(fileTitle);

          var deleteBtn = canDelete
            ? '<a class="delete-file" href="javascript:" title="Delete ' +
            safeName +
            '" data-fileref="' +
            safeHref +
            '" data-filename="' +
            safeName +
            '"><i class="fas fa-times"><span class="filePurpose"></span></i></a>'
            : "";

          // Match other forms markup: file-container + File-Link (+ delete-file in edit)
          $list.append(
            '<div class="file-container">' +
            '<a class="File-Link" file-id="' +
            it.Id +
            '" file-title="' +
            safeTitle +
            '" href="' +
            safeHref +
            '" download="' +
            safeName +
            '" title="Download ' +
            safeName +
            '">' +
            '<i class="fas fa-file-download"></i>' +
            safeName +
            "</a>" +
            deleteBtn +
            "</div>"
          );
        });
      },
      error: function () {
        $wrapper.hide();
      },
    });
  } catch (e) { }
}

function deleteCRAttachmentByFileRef(fileRef) {
  return new Promise(function (resolve) {
    try {
      if (!fileRef) return resolve(false);
      var digest = $("#__REQUESTDIGEST").val();
      $.ajax({
        url:
          _spPageContextInfo.webAbsoluteUrl +
          "/_api/web/getfilebyserverrelativeurl('" +
          String(fileRef).replace(/'/g, "''") +
          "')",
        type: "POST",
        headers: {
          Accept: "application/json; odata=verbose",
          "X-RequestDigest": digest,
          "IF-MATCH": "*",
          "X-HTTP-Method": "DELETE",
        },
        success: function () {
          resolve(true);
        },
        error: function () {
          resolve(false);
        },
      });
    } catch (e) {
      resolve(false);
    }
  });
}

$(document).off("click.CRDeleteAttach", ".delete-file");
$(document).on("click.CRDeleteAttach", ".delete-file", function () {
  try {
    if (!window.isEdit) return;
    var fileRef = $(this).attr("data-fileref");
    if (!fileRef) return;

    var confirmMsg =
      localStorage.getItem("lng") == "en"
        ? "Are you sure you want to delete this attachment?"
        : "هل أنت متأكد أنك تريد حذف هذا المرفق؟";

    if (!confirm(confirmMsg)) return;

    $(this).addClass("disabled");
    deleteCRAttachmentByFileRef(fileRef).then(function () {
      setTimeout(loadCRExistingAttachments, 300);
    });
  } catch (e) { }
});

function uploadCRAttachments(crCode, itemId) {
  // IMPORTANT: attachments upload must never block submit (New/Edit). We always resolve.
  return new Promise(function (resolve) {
    try {
      var files = getCRAttachmentFiles();
      if (!files.length) return resolve();
      if (!crCode) return resolve(); // no code => skip upload
      var docTitle = "changerequests-" + crCode;
      var normalizedItemId = parseInt(itemId || window.crItemId || 0, 10) || 0;

      // Filter files by allowed extensions and max size (5MB per file)
      files = files.filter(function (file) {
        if (!file || !file.name) return false;
        if (file.size && file.size > CR_MAX_FILE_SIZE_BYTES) return false;
        var ext = file.name.split(".").pop().toLowerCase();
        return CR_ALLOWED_EXTENSIONS.indexOf(ext) > -1;
      });
      if (!files.length) return resolve();

      var hadUploadError = false;

      // Upload using SharePoint REST (works without $SP)
      getCRAttachmentsFolderServerRelativeUrl().then(function (
        folderServerRelativeUrl
      ) {
        if (!folderServerRelativeUrl) {
          alert(
            localStorage.getItem("lng") == "en"
              ? "Saved, but attachments could not be uploaded."
              : "تم الحفظ، لكن تعذر رفع المرفقات."
          );
          return resolve();
        }

        function uploadOne(file) {
          return new Promise(function (r) {
            try {
              var reader = new FileReader();
              reader.onloadend = function (e) {
                try {
                  var safeName = normalizeFileName(file.name);
                  var uploadName =
                    new Date().toISOString().replaceAll(":", "-") +
                    "_-_" +
                    safeName;
                  var fileServerRelativeUrl =
                    folderServerRelativeUrl + "/" + uploadName;
                  var url =
                    _spPageContextInfo.webAbsoluteUrl +
                    "/_api/web/GetFolderByServerRelativeUrl('" +
                    encodeURIComponent(folderServerRelativeUrl).replace(
                      /'/g,
                      "''"
                    ) +
                    "')/Files/add(overwrite=true,url='" +
                    encodeURIComponent(uploadName).replace(/'/g, "''") +
                    "')";

                  $.ajax({
                    url: url,
                    method: "POST",
                    data: e.target.result,
                    processData: false,
                    headers: {
                      Accept: "application/json;odata=verbose",
                      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    },
                    success: function () {
                      // Update metadata on uploaded file item (ItemID + Title), non-blocking
                      if (normalizedItemId) {
                        var updateUrl =
                          _spPageContextInfo.webAbsoluteUrl +
                          "/_api/web/GetFileByServerRelativeUrl('" +
                          String(fileServerRelativeUrl).replace(/'/g, "''") +
                          "')/ListItemAllFields";

                        // Use ValidateUpdateListItem (most reliable way to update library item fields)
                        $.ajax({
                          url: updateUrl + "/ValidateUpdateListItem",
                          method: "POST",
                          contentType: "application/json;odata=verbose",
                          data: JSON.stringify({
                            formValues: [
                              { FieldName: "Title", FieldValue: docTitle },
                              {
                                FieldName: "ItemID",
                                FieldValue: String(normalizedItemId),
                              },
                            ],
                            bNewDocumentUpdate: false,
                          }),
                          headers: {
                            Accept: "application/json;odata=verbose",
                            "Content-Type": "application/json;odata=verbose",
                            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                          },
                          success: function () {
                            // Even if field doesn't exist, don't block submit
                            r();
                          },
                          error: function () {
                            // Don't block submit; also don't show "upload failed" since the file uploaded
                            r();
                          },
                        });
                      } else {
                        r();
                      }
                    },
                    error: function () {
                      hadUploadError = true;
                      r();
                    },
                  });
                } catch (ex) {
                  hadUploadError = true;
                  r();
                }
              };
              reader.onerror = function () {
                hadUploadError = true;
                r();
              };
              reader.readAsArrayBuffer(file);
            } catch (ex) {
              hadUploadError = true;
              r();
            }
          });
        }

        Promise.all(files.map(uploadOne))
          .then(function () {
            if (hadUploadError) {
              alert(
                localStorage.getItem("lng") == "en"
                  ? "Saved, but some attachments could not be uploaded."
                  : "تم الحفظ، لكن تعذر رفع بعض المرفقات."
              );
            }
            resolve();
          })
          .catch(function () {
            alert(
              localStorage.getItem("lng") == "en"
                ? "Saved, but attachments could not be uploaded."
                : "تم الحفظ، لكن تعذر رفع المرفقات."
            );
            resolve();
          });
      });
    } catch (e) {
      resolve();
    }
  });
}

function getLoggedInUser() {
  return new Promise(function (resolve, reject) {
    if (LoggedInUser && LoggedInUserId) {
      resolve({ user: LoggedInUser, userId: LoggedInUserId });
      return;
    }
    $.ajax({
      url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (data) {
        LoggedInUser = data.d.Title || data.d.LoginName || data.d.Email;
        LoggedInUserTitle = data.d.Title;
        LoggedInUserId = data.d.Id;
        resolve({ user: LoggedInUser, userId: LoggedInUserId });
      },
      error: function (err) {
        reject(err);
      },
    });
  });
}

// Helper function to get user display name from user ID
function getUserDisplayNameFromId(userId) {
  return new Promise(function (resolve) {
    if (!userId || !String(userId).trim()) {
      resolve("");
      return;
    }
    var userIdNum = parseInt(userId, 10);
    if (isNaN(userIdNum)) {
      resolve(String(userId)); // Return as-is if not a number
      return;
    }
    $.ajax({
      url:
        _spPageContextInfo.webAbsoluteUrl +
        "/_api/web/GetUserById(" +
        userIdNum +
        ")",
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (data) {
        resolve(data.d.Title || data.d.LoginName || String(userId));
      },
      error: function () {
        resolve(String(userId)); // Fallback to ID if error
      },
    });
  });
}

function getLocalizedMessage(key) {
  const lang = localStorage.getItem("lng");
  const isArabic = lang == null || lang == "ar";

  const messages = {
    saveSuccess: {
      ar: "تم الحفظ بنجاح. الرجاء استكمال الطلب من خلال التعديل !",
      en: "Saved successfully. Please complete the request through editing!",
    },
    editSuccess: {
      ar: "تم التعديل بنجاح. طلبك قيد الموافقة !",
      en: "Updated successfully. Your request is pending approval!",
    },
    apiError: {
      ar: "حدث خطأ أثناء حفظ التفاصيل الإضافية",
      en: "An error occurred while saving additional details",
    },
    noItemCode: {
      ar: "لا يمكن التعديل: لم يتم تحديد كود التغيير.",
      en: "Cannot edit: Change request code is not specified.",
    },
    itemNotFound: {
      ar: "لم يتم العثور على العنصر.",
      en: "Item not found.",
    },
    itemNotFoundByTitle: {
      ar: "لم يتم العثور على العنصر.",
      en: "Item not found.",
    },
  };

  return messages[key] ? (isArabic ? messages[key].ar : messages[key].en) : "";
}

function getAllowedParentItemTypes() {
  var currentRole = window.currentUserRole || "";

  if (
    currentRole === "Administrator" ||
    currentRole === "DU" ||
    currentRole === "EPMO" ||
    currentRole === "HeadCommitte"
  ) {
    return ["SOs", "MainKpi", "Initiatives", "Projects"];
  } else if (currentRole === "ObjectiveOwner") {
    return ["SOs"];
  } else if (currentRole === "PerformanceLeader") {
    return ["MainKpi"];
  } else if (currentRole === "InitiativeManager") {
    return ["Initiatives"];
  } else if (currentRole === "ProjectManager") {
    return ["Projects"];
  }

  return [];
}

function filterParentItemTypeOptions() {
  var allowedTypes = getAllowedParentItemTypes();
  var $parentSelect = $("#ParentItemType");

  if (!$parentSelect.length) {
    setTimeout(filterParentItemTypeOptions, 500);
    return;
  }

  if (allowedTypes.length === 0) {
    $parentSelect.find("option").not(":first").prop("disabled", true).hide();
    return;
  }

  $parentSelect.find("option").each(function () {
    var $option = $(this);
    var value = $option.val();

    if (!value) {
      $option.prop("disabled", false).show();
      return;
    }

    if (allowedTypes.indexOf(value) > -1) {
      $option.prop("disabled", false).show();
    } else {
      $option.prop("disabled", true).hide();
    }
  });
}

var checkchangerequestshtml = setInterval(function () {
  if ($("#ChangeRequests .col-12").length) {
    clearInterval(checkchangerequestshtml);

    $(
      "div#particles-foreground, div#particles-background, .vertical-centered-box"
    ).animate(
      { opacity: 0 },
      {
        duration: 333,
        complete: function () {
          $(
            "div#particles-foreground, div#particles-background, .vertical-centered-box"
          ).remove();
        },
      }
    );

    $("#ChangeRequests .col-12").html(`
    <div class="changeRequests-container p-3">
      <div class="row mb-3 ItemPseudoFields">
        <div class="col-md-6 mb-3">
          <label data-trans-relatedstrategy class="Resources"></label>
          <select id="RelatedStrategy" class="form-control">
            <option value=""></option>
          </select>
        </div>

        <div class="col-md-6 mb-3">
          <label data-trans-parentitemtype class="Resources"
            >Parent Item Type</label
          >
          <select id="ParentItemType" class="form-control">
            <option
              data-trans-parentitemtype
              class="Resources"
              value=""
            ></option>
            <option data-trans-objective class="Resources" value="SOs"></option>
            <option data-trans-kpi class="Resources" value="MainKpi"></option>
            <option
              data-trans-initiative
              class="Resources"
              value="Initiatives"
            ></option>
            <option data-trans-project class="Resources" value="Projects"></option>
          </select>
        </div>

        <div class="col-md-6 mb-3">
          <label data-trans-parentselecteditem class="Resources">
            Parent Selected Item</label
          >
          <select id="ParentItemCode" class="form-control">
            <option
              data-trans-parentselecteditem
              class="Resources"
              value=""
            ></option>
          </select>
        </div>

        <div class="col-md-6 mb-3" id="ChildItemTypeDiv" style="display: none">
          <label data-trans-childitemtype class="Resources"></label>
          <select id="ChildItemType" class="form-control">
            <option data-trans-childitemtype value=""></option>
          </select>
        </div>

        <div class="col-md-6 mb-3" id="ChildItemCodeDiv" style="display: none">
          <label data-trans-childselecteditem class="Resources"
            >Child Selected Item</label
          >
          <select id="ChildItemCode" class="form-control">
            <option
              data-trans-childselecteditem
              class="Resources"
              value=""
            ></option>
          </select>
        </div>

        <div class="col-md-6 mb-3">
          <label data-trans-changeitem class="Resources"></label>
          <select id="ChangeItem" class="form-control">
            <option
              data-trans-changeitem
              class="Resources"
              value=""
            ></option>
          </select>
        </div>

        <div class="col-md-6 mb-3">
          <label data-trans-sector class="Resources">Sector</label>
          <select id="Sector" class="form-control" disabled>
            <option value=""></option>
          </select>
        </div>

        <div class="col-md-6 mb-3">
          <label data-trans-subsector class="Resources"></label>
          <select id="SubSector" class="form-control" disabled>
            <option value=""></option>
          </select>
        </div>

        <div class="col-md-6 mb-3" id="ClassificationDiv" style="display: none;">
          <label data-trans-kpiclassification class="Resources">نوع المؤشر</label>
          <select id="Classification" class="form-control" disabled>
            <option value=""></option>
            <option data-trans-kpistrategic class="Resources" value="kpistrategic"></option>
            <option data-trans-kpioperational class="Resources" value="kpioperational"></option>
            
          </select>
        </div>

        <div class="col-md-6 mb-3">
          <label data-trans-approvallevel class="Resources"></label>
          <select id="ApprovalLevel" class="form-control" disabled>
            <option
              data-trans-approvallevel
              class="Resources"
              value=""
            ></option>
            <option
              data-trans-approvallevel1
              class="Resources"
              value="level1"
            ></option>
            <option
              data-trans-approvallevel2
              class="Resources"
              value="level2"
            ></option>
          </select>
        </div>

        <div class="col-md-12 mb-3">
          <label data-trans-changedescription class="Resources"></label>
          <textarea id="ChangeDescription" class="form-control" rows="3" required></textarea>
        </div>

        <div class="col-md-12 mb-3">
          <label data-trans-justification class="Resources"></label>
          <textarea
            id="ChangeJustification"
            class="form-control"
            rows="3"
            required
          ></textarea>
        </div>

        <div class="col-md-12 mb-3">
          <label data-trans-positiveimpact class="Resources"></label>
          <textarea
            id="ExpectedPositiveImpact"
            class="form-control"
            rows="3"
            required
          ></textarea>
        </div>

        <div class="col-md-6 mb-3">
          <label data-trans-impactlevel class="Resources"></label>
          <select id="ImpactType" class="form-control" required>
            <option
              data-trans-impactlevel
              class="Resources"
              value=""
            ></option>
            <option data-trans-high class="Resources" value="high"></option>
            <option data-trans-medium class="Resources" value="medium"></option>
            <option data-trans-low class="Resources" value="low"></option>
          </select>
        </div>

        <div class="col-md-6 mb-3" id="WFStageDiv" style="display: none;">
          <label data-trans-stage class="Resources">المرحلة / Stage</label>
          <input id="WFStage" type="text" class="form-control" disabled />
        </div>
      </div>
      <div class="row mt-5 mb-3 CRAttachmentsBlock">
        <div class="col-md-12 mb-3 CFIELD">
          <label data-trans-document class="Resources">مرفقات :</label>
          <input id="CRAttachments" type="file" class="form-control SPIField" hidden multiple="multiple" />
          <label data-trans-choosefile id="chooseFile" for="CRAttachments" class="Resources"></label>
          <span id="file-chosen"><span data-trans-nofile id="nofile" class="Resources"></span></span>
          <div class="AttErrorMsg attErrorMsg" style="display:none"><span data-trans-file class="Resources"></span><span class="notacceptedext"></span><span data-trans-notallowed class="Resources"></span></div>
          <div class="attErrorMsg"><span data-trans-acceptedfiles class="Resources"></span><span class="acceptedfile"></span></div>
          <div class="attErrorMsg"><span class="crFileSizeText">Maximum file size: 5MB</span></div>
        </div>
        <div class="col-md-12 mb-3" id="CRExistingAttachmentsWrapper" style="display:none;">
          <div class="file-container-parent" id="CRExistingAttachments"></div>
        </div>
      </div>
      <div class="row mt-5 mb-3 CRObservationsBlock" id="CRObservationsBlock" style="display: none;">
        <div class="col-md-12 mb-3">
          <label data-trans-observations class="Resources">Observations</label>
          <textarea id="Observations" class="form-control" rows="5"></textarea>
        </div>
      </div>
      <div class="downseperator" style="display: none;">
      <div class="mb-3 d-flex justify-content-center w-100 align-item-center mt-4">
        <i class="fas fa-angle-double-down"></i>
      </div>
      </div>
      <div class="row mb-3 changeItemsRow mt-4" style="display: none;">
        <div class="changeCaption d-flex align-items-center mb-2 w-100 pt-2">
          <h3 class="d-flex align-items-center">
            <span data-trans-crrelateditem class="Resources"></span>
            <i class="fas fa-sync"></i>
          </h3>
        </div>
      </div>
      <div class="row my-4">
        <div class="col-12 d-flex justify-content-end w-100 buttonsRow p-0">
          <button id="CRSubmitButton" class="btn btn-primary mx-3" type="button"><span data-trans-savebutton class="Resources d-flex justify-content-center align-items-center"></span></button>
          <button id="CREditButton" class="btn btn-primary" type="button" style="display: none"><span data-trans-edit class="Resources d-flex justify-content-center align-items-center"></span></button>
          <button id="CRWorkflowButton" class="btn pop-green mx-3" type="button" style="display: none"><span data-trans-sendcrtext class="Resources d-flex justify-content-center align-items-center"></span></button>
        </div>
      </div>
    </div>
    `);

    // Update save button text based on isEdit
    if (window.isEdit) {
      $("#CRSubmitButton span").attr("data-trans-savebutton", null);
      $("#CRSubmitButton span").attr("data-trans-savecredit", "");
    }

    // Ensure Sector, SubSector, and ApprovalLevel are always disabled
    $("#Sector").prop("disabled", true);
    $("#SubSector").prop("disabled", true);
    $("#ApprovalLevel").prop("disabled", true);
    
    changeResources();
    initCRAttachmentsUI();
    loadCRExistingAttachments();

    // Add required-field class to labels for required inputs
    setTimeout(function () {
      $("#Sector").closest(".col-md-6").find("label").addClass("required-field");
      $("#SubSector").closest(".col-md-6").find("label").addClass("required-field");
      $("#RelatedStrategy").closest(".col-md-6").find("label").addClass("required-field");
      $("#ParentItemType").closest(".col-md-6").find("label").addClass("required-field");
      $("#ParentItemCode").closest(".col-md-6").find("label").addClass("required-field");
      $("#ChangeItem").closest(".col-md-6").find("label").addClass("required-field");
      $("#ApprovalLevel").closest(".col-md-6").find("label").addClass("required-field");
      $("#ChangeDescription").closest(".col-md-12").find("label").addClass("required-field");
      $("#ChangeJustification").closest(".col-md-12").find("label").addClass("required-field");
      $("#ExpectedPositiveImpact").closest(".col-md-12").find("label").addClass("required-field");
      $("#ImpactType").closest(".col-md-6").find("label").addClass("required-field");
      
      // Disable RelatedStrategy field in new and edit modes
      if (window.isNew || window.isEdit) {
        $("#RelatedStrategy").prop("disabled", true);
      }
    }, 100);

    // Update page title link based on current mode (new/edit/view)
    updatePageTitleLink();

    getLoggedInUser()
      .then(function () {
        filterParentItemTypeOptions();
        loadSectors();
        loadStrategyOptions();

        if ((isView || isEdit) && crItemCode) {
          initViewMode(crItemCode);
        } else if (window.isNew) {
          // In new mode, handle Parent/Child fields visibility after ChangeItem is selected
          // This will be called again when ChangeItem changes, but we call it here as initial setup
          setTimeout(function() {
            handleParentChildFieldsVisibility();
          }, 500);
        }
      })
      .catch(function (err) {
        filterParentItemTypeOptions();
        loadSectors();
        loadStrategyOptions();

        if ((isView || isEdit) && crItemCode) {
          initViewMode(crItemCode);
        } else if (window.isNew) {
          // In new mode, handle Parent/Child fields visibility after ChangeItem is selected
          // This will be called again when ChangeItem changes, but we call it here as initial setup
          setTimeout(function() {
            handleParentChildFieldsVisibility();
          }, 500);
        }
      });
  }
}, 500);

function updatePageTitleLink() {
  var listingUrl =
    _spPageContextInfo.webAbsoluteUrl +
    "/SitePages/Listing.aspx?ListKey=changerequests";
  if ($(".page-title a").length) {
    $(".page-title a").attr("href", listingUrl);
  } else {
    setTimeout(function () {
      if ($(".page-title a").length) {
        $(".page-title a").attr("href", listingUrl);
      }
    }, 500);
  }
}

let selectedParentTitle = "";
let selectedParentType = "";

$(document).on("change", "#ParentItemType", function () {
  var parent = $(this).val();
  
  // Show/hide Classification div based on ParentItemType (only for MainKpi)
  if (parent === "MainKpi") {
    $("#ClassificationDiv").show();
  } else {
    $("#ClassificationDiv").hide();
    $("#Classification").val("");
  }
  
  // Clear ParentItemCode when ParentItemType changes (only in New mode)
  if (window.isNew) {
    $("#ParentItemCode").empty().append('<option value=""></option>');
  }
  
  // Remove required from ChildItemCode when ParentItemType changes
  var $childItemCode = $("#ChildItemCode");
  var $childItemCodeLabel = $childItemCode.closest(".col-md-6").find("label");
  $childItemCode.prop("required", false);
  $childItemCodeLabel.removeClass("required-field");
  $childItemCode.removeClass("is-invalid");
  
  handleParentChange(parent);
});
$(document).on("change", "#ChildItemType", function () {
  // Don't process change event during initial data load in edit/view mode
  if (window.isLoadingChangeRequestData && (window.isEdit || window.isView)) {
    return;
  }
  
  const childList = $(this).val();
  const $childItemCode = $("#ChildItemCode");
  const $childItemCodeLabel = $childItemCode.closest(".col-md-6").find("label");

  // Always clear ChildItemCode when ChildItemType changes
  $childItemCode
    .empty()
    .append(
      '<option data-trans-childselecteditem class="Resources" value=""></option>'
    );

  const parentTitle = $("#ParentItemCode").val();
  const parentType = $("#ParentItemType").val();

  // Handle required attribute for ChildItemCode
  if (childList && childList.trim() !== "") {
    $childItemCode.prop("required", true);
    $childItemCodeLabel.addClass("required-field");
  } else {
    $childItemCode.prop("required", false);
    $childItemCodeLabel.removeClass("required-field");
    $childItemCode.removeClass("is-invalid");
  }

  if (!parentTitle || !parentType) {
    $("#ChangeItem")
      .empty()
      .append(
        '<option data-trans-changeitem class="Resources" value=""></option>'
      );
    return;
  }

  if (parentType === "Initiatives" || parentType === "Projects") {
    if (childList && childList.trim() !== "") {
      loadChildItems(childList, parentTitle, parentType);
    }
  }

  if (childList && childList.trim() !== "") {
    loadChangeItems(childList);
  } else {
    loadChangeItems(parentTitle, parentType);
  }
  changeResources();
});
$(document).on("change", "#Sector", function () {
  const sectorTitle = $(this).val();
  loadSubSectors(sectorTitle);
  // Clear and reload ParentItemCode when Sector changes (only in New mode, not View/Edit)
  if (window.isNew) {
    const parentType = $("#ParentItemType").val();
    if (parentType) {
      $("#ParentItemCode").empty().append('<option value=""></option>');
      // Classification is no longer used - commented out
      // Clear Classification if MainKpi to force re-selection
      // if (parentType === "MainKpi") {
      //   $("#Classification").val("");
      //   $("#ApprovalLevel").prop("disabled", false);
      // }
      loadParentItems(parentType, "#ParentItemCode");
    }
  }
  changeResources();
});

$(document).on("change", "#SubSector", function () {
  // Clear and reload ParentItemCode when SubSector changes (only in New mode, not View/Edit)
  if (window.isNew) {
    const parentType = $("#ParentItemType").val();
    if (parentType) {
      $("#ParentItemCode").empty().append('<option value=""></option>');
      // Classification is no longer used - commented out
      // Clear Classification if MainKpi to force re-selection
      // if (parentType === "MainKpi") {
      //   $("#Classification").val("");
      //   $("#ApprovalLevel").prop("disabled", false);
      // }
      loadParentItems(parentType, "#ParentItemCode");
    }
  }
  changeResources();
});

$(document).on("change", "#RelatedStrategy", function () {
  // Clear and reload ParentItemCode when RelatedStrategy changes (only in New mode, not View/Edit)
  // For all types except Projects
  if (window.isNew) {
    const parentType = $("#ParentItemType").val();
    if (parentType && parentType !== "Projects") {
      $("#ParentItemCode").empty().append('<option value=""></option>');
      // Classification is no longer used - commented out
      // Clear Classification if MainKpi to force re-selection
      // if (parentType === "MainKpi") {
      //   $("#Classification").val("");
      //   $("#ApprovalLevel").prop("disabled", false);
      // }
      loadParentItems(parentType, "#ParentItemCode");
    }
  }
  changeResources();
});

// Classification change handler commented out - Classification div is no longer used
// $(document).on("change", "#Classification", function () {
//   const typesValue = $(this).val();
//   const parentType = $("#ParentItemType").val();
//   
//   // Only process if ParentItemType is MainKpi
//   if (parentType === "MainKpi") {
//     // Clear ApprovalLevel when Types changes
//     $("#ApprovalLevel").val("").prop("disabled", false);
//     
//     // Clear and reload ParentItemCode with Classification filter (only in New mode)
//     if (window.isNew) {
//       $("#ParentItemCode").empty().append('<option value=""></option>');
//       loadParentItems(parentType, "#ParentItemCode");
//     }
//   }
//   
//   changeResources();
// });

$(document).on("change", "#ParentItemCode", function () {
  selectedParentTitle = $(this).val();
  selectedParentType = $("#ParentItemType").val();
  
  // ApprovalLevel will be set by API call - no need to set it here based on KPI type
  // For MainKpi, set ApprovalLevel based on data-kpitype attribute - commented out
  // if (selectedParentType === "MainKpi" && selectedParentTitle) {
  //   const $selectedOption = $(this).find("option:selected");
  //   const kpiType = $selectedOption.attr("data-kpitype") || "";
  //   
  //   if (kpiType === "main") {
  //     $("#ApprovalLevel").val("level1").prop("disabled", true);
  //   } else if (kpiType === "sub" || kpiType === "sublevel2") {
  //     $("#ApprovalLevel").val("level2").prop("disabled", true);
  //   } else {
  //     $("#ApprovalLevel").prop("disabled", false);
  //   }
  // }
  
  // Reset ChildItemType to empty value when ParentItemCode changes
  const $childItemType = $("#ChildItemType");
  const $childItemCode = $("#ChildItemCode");
  const $childItemCodeLabel = $childItemCode.closest(".col-md-6").find("label");
  
  if (selectedParentType === "Initiatives" || selectedParentType === "Projects") {
    // Reset ChildItemType to empty value
    $childItemType.val("");
    // Remove required from ChildItemCode
    $childItemCode.prop("required", false);
    $childItemCodeLabel.removeClass("required-field");
    $childItemCode.removeClass("is-invalid");
  }
  
  // Clear ChildItemCode
  $childItemCode
    .empty()
    .append(
      '<option data-trans-childselecteditem class="Resources" value=""></option>'
    );
  
  // Don't call API here - it will be called by the general change event handler
  // This prevents duplicate API calls when ParentItemCode changes
  
  changeResources();
});

// Function to load list options and return a Promise
function loadListOptionsPromise(listName, selectId, dispFieldKey, dispFieldKeyEn, valFieldKey, filter, orderBy) {
  return new Promise(function(resolve, reject) {
    const lang = localStorage.getItem("lng");
    let query =
      _spPageContextInfo.webAbsoluteUrl +
      `/_api/web/lists/getbytitle('${listName}')/items?$top=5000&$filter=DeletionStatus ne 'Deleted'`;
    if (filter) query += ` and ${filter}`;
    if (orderBy) query += `&$orderby=${orderBy}`;
    
    $.ajax({
      url: query,
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (data) {
        const $select = $(selectId);
        $select.empty().append(`<option value=""></option>`);
        data.d.results.forEach((item) => {
          let text = "";
          if (listName === "MainKpi" || listName === "Projects" || listName === "Initiatives" || listName === "SOs") {
            text = item[dispFieldKey] || "";
          } else {
            text = lang == null || lang == "ar"
              ? item[dispFieldKey]
              : item[dispFieldKeyEn];
          }
          const val = item[valFieldKey] ? item[valFieldKey] : "";
          $select.append(`<option value="${val}">${text}</option>`);
        });
        resolve();
      },
      error: function (err) {
        reject(err);
      }
    });
  });
}

// Function to call API and populate Sector, SubSector, and ApprovalLevel
// authItemCode: parent item used for agency/IsActive (SubSector authorization)
// detailsItemCode: selected item for getchangeitemsdetails (parent or child)
function callGetSectorAndSubSectorAPI(changeItemCode, authItemCode, detailsItemCode) {
if (!changeItemCode || !authItemCode) {
  return;
}
detailsItemCode = detailsItemCode || authItemCode;

// Clear dynamic fields before calling API
$(".changeItemsRow").find(".dynamicField").remove();

const url = `${APIURL}/general/getsectorandsubsectorforselecteditem/${encodeURIComponent(changeItemCode)}/${encodeURIComponent(authItemCode)}`;

$.ajax({
  url: url,
  method: "GET",
  contentType: "application/json; charset=utf-8",
  success: function (response) {
    if (response && response.isSuccess && response.result) {
      var result = response.result;
      var isActiveRaw = result.IsActive !== undefined ? result.IsActive : result.isActive;
      // "no" = not allowed, "yes" or missing = allowed (backward compatibility)
      var isActive = isActiveRaw === undefined || isActiveRaw === null || String(isActiveRaw).toLowerCase() === "yes";

      // Populate Sector
      if (result.sector) {
        if ($("#Sector option").length <= 1) {
          loadListOptionsPromise("Internal Entities", "#Sector", "Name", "NameEn", "Title", "EntityType eq 'Sector'", "Name")
            .then(function() {
              setSelectValue("#Sector", result.sector);
            })
            .catch(function(err) {
              console.error("Error loading Sector options:", err);
            });
        } else {
          setSelectValue("#Sector", result.sector);
        }
      }
      
      // Populate SubSector
      if (result.subSector) {
        if ($("#SubSector option").length <= 1) {
          loadListOptionsPromise("Internal Entities", "#SubSector", "Name", "NameEn", "Title", "EntityType eq 'Department'", "Name")
            .then(function() {
              setSelectValue("#SubSector", result.subSector);
            })
            .catch(function(err) {
              console.error("Error loading SubSector options:", err);
            });
        } else {
          setSelectValue("#SubSector", result.subSector);
        }
      }
      
      // Populate Classification (only for MainKpi)
      const parentType = $("#ParentItemType").val();
      if (parentType === "MainKpi" && result.classification) {
        $("#Classification").val(result.classification).prop("disabled", true);
      } else {
        $("#Classification").val("");
      }
      
      // Populate ApprovalLevel and ensure it's always disabled
      if (result.approvalLevel) {
        $("#ApprovalLevel").val(result.approvalLevel).prop("disabled", true);
      } else {
        $("#ApprovalLevel").val("").prop("disabled", true);
        $("#Classification").val("");
        $(".changeItemsRow").find(".dynamicField").remove();
      }

      // New change request: enforce IsActive - if "no", agency is not allowed to submit
      if (window.isNew) {
        window.currentIsActive = isActive;
        if (!isActive) {
          setChangeItemsVisibility(false);
          $(".changeItemsRow").find(".dynamicField").remove();
          if ($("#CRSubmitButton").length) {
            $("#CRSubmitButton").hide();
          }
          alert(
            localStorage.getItem("lng") == "en"
              ? "The selected item belongs to a Subsector  not authorized to submit change requests!"
              : "العنصر الذي تم اختياره يتبع لوكالة غير مخوّلة بتقديم طلبات التغيير !"
          );
          return;
        }
        if ($("#CRSubmitButton").length) {
          $("#CRSubmitButton").show().css("display", "inline-block");
        }
      }

      // After setting ApprovalLevel, call getchangeitemsdetails (for edit/view always; for new only when agency is allowed)
      if (result.approvalLevel && (!window.isNew || window.currentIsActive !== false)) {
        const classification = (parentType === "MainKpi" && result.classification) ? result.classification : null;
        fetchChangeItemDetails(changeItemCode, result.approvalLevel, detailsItemCode, classification);
      } else if (!result.approvalLevel) {
        $(".changeItemsRow").find(".dynamicField").remove();
      }
    } else {
      console.error("API Error:", response.errorMessageEn || response.errorMessageAr || "Unknown error");
      $("#Sector").val("");
      $("#SubSector").val("");
      $("#ApprovalLevel").val("").prop("disabled", true);
      $("#Classification").val("");
      $(".changeItemsRow").find(".dynamicField").remove();
    }
  },
  error: function (xhr, status, error) {
    console.error("Error calling getSectorAndSubSector API:", error);
    $("#Sector").val("");
    $("#SubSector").val("");
    $("#ApprovalLevel").val("").prop("disabled", true);
    $("#Classification").val("");
    $(".changeItemsRow").find(".dynamicField").remove();
  }
});
}

$(document).on(
"change",
"#ChangeItem, #ApprovalLevel, #ParentItemCode, #ChildItemCode",
function () {
  const fieldId = $(this).attr("id");
  
  // Don't process change event during initial data load in edit/view mode
  if (window.isLoadingChangeRequestData && (window.isEdit || window.isView)) {
    return;
  }
  
  // Get current values
  const changeItemCode = $("#ChangeItem").val();
  const parentItemCode = $("#ParentItemCode").val();
  let detailsItemCode = parentItemCode;
  if ($("#ChildItemCodeDiv").is(":visible") && $("#ChildItemCode").val()) {
    detailsItemCode = $("#ChildItemCode").val();
  }
  const approvalLevel = $("#ApprovalLevel").val();
  
  // Reset IsActive status when key fields change (will be updated by API call)
  if (window.isNew && (fieldId === "ChangeItem" || fieldId === "ParentItemCode" || fieldId === "ChildItemCode" || fieldId === "ApprovalLevel")) {
    window.currentIsActive = true;
    if ($("#CRSubmitButton").length) {
      $("#CRSubmitButton").prop("disabled", false).show().css("display", "inline-block");
    }
  }
  
  // If ChangeItem, ParentItemCode, or ChildItemCode changed
  if (fieldId === "ChangeItem" || fieldId === "ParentItemCode" || fieldId === "ChildItemCode") {
    handleParentChildFieldsVisibility();
    changeResources();

    if (!changeItemCode || !parentItemCode) {
      if (fieldId !== "ChildItemCode") {
        $("#Sector").val("");
        $("#SubSector").val("");
        $("#ApprovalLevel").val("");
        $("#Classification").val("");
      }
      $(".changeItemsRow").find(".dynamicField").remove();
      return;
    }

    // Child has no Sector/SubSector — keep parent values; only refresh change-item details
    if (fieldId === "ChildItemCode") {
      $(".changeItemsRow").find(".dynamicField").remove();
      if (detailsItemCode && approvalLevel) {
        const parentType = $("#ParentItemType").val();
        const classification =
          parentType === "MainKpi" && $("#Classification").val()
            ? $("#Classification").val()
            : null;
        fetchChangeItemDetails(
          changeItemCode,
          approvalLevel,
          detailsItemCode,
          classification
        );
      }
      return;
    }

    // ChangeItem or ParentItemCode: Sector/SubSector/ApprovalLevel/IsActive from parent only
    $("#Sector").val("");
    $("#SubSector").val("");
    $("#ApprovalLevel").val("");
    $("#Classification").val("");
    $(".changeItemsRow").find(".dynamicField").remove();
    callGetSectorAndSubSectorAPI(changeItemCode, parentItemCode, detailsItemCode);
    return;
  }
  
  // If ApprovalLevel changed manually (not from API), call getchangeitemsdetails
  if (fieldId === "ApprovalLevel") {
    // Check actionType - if add, merge, split, or delete, hide dynamic section
    var meta = getSelectedChangeItemMeta();
    if (meta.actionType === "add" || meta.actionType === "merge" || meta.actionType === "split" || meta.actionType === "delete") {
      setChangeItemsVisibility(false);
      $(".changeItemsRow").find(".dynamicField").remove();
    } else {
      // Call getchangeitemsdetails if all required fields are available
      if (changeItemCode && approvalLevel && detailsItemCode) {
        $(".changeItemsRow").find(".dynamicField").remove();
        // Get classification if it's MainKpi
        const parentType = $("#ParentItemType").val();
        const classification = (parentType === "MainKpi" && $("#Classification").val()) ? $("#Classification").val() : null;
        fetchChangeItemDetails(changeItemCode, approvalLevel, detailsItemCode, classification);
      }
    }
  }
  
  // Handle Parent/Child fields visibility and required state based on actionType
  handleParentChildFieldsVisibility();
  
  changeResources();
}
);

$(document).on("change", "#ParentItemType, #ChildItemType", function () {
$(".changeItemsRow").find(".dynamicField").remove();
handleParentChildFieldsVisibility();
changeResources();
});
function setChangeItemsVisibility(visible) {
  const $row = $(".changeItemsRow");
  const $sep = $(".downseperator");
  if (visible) {
    $row.show();
    $sep.show();
  } else {
    $row.hide();
    $sep.hide();
  }
}

// Function to handle visibility and required state of Parent/Child fields based on actionType
function handleParentChildFieldsVisibility() {
  var meta = getSelectedChangeItemMeta();
  var actionType = (meta.actionType || "").toLowerCase();
  var shouldHideHierarchyFields = actionType === "add";
  
  // Get field elements
  var $parentItemType = $("#ParentItemType");
  var $parentItemCode = $("#ParentItemCode");
  var $childItemType = $("#ChildItemType");
  var $childItemCode = $("#ChildItemCode");
  var $classification = $("#Classification");
  var $sector = $("#Sector");
  var $subSector = $("#SubSector");
  var $approvalLevel = $("#ApprovalLevel");
  
  // Get parent containers
  var $parentItemTypeDiv = $parentItemType.closest(".col-md-6");
  var $parentItemCodeDiv = $parentItemCode.closest(".col-md-6");
  var $childItemTypeDiv = $("#ChildItemTypeDiv");
  var $childItemCodeDiv = $("#ChildItemCodeDiv");
  var $classificationDiv = $("#ClassificationDiv");
  var $sectorDiv = $sector.closest(".col-md-6");
  var $subSectorDiv = $subSector.closest(".col-md-6");
  var $approvalLevelDiv = $approvalLevel.closest(".col-md-6");
  
  // Get labels for required class
  var $parentItemTypeLabel = $parentItemTypeDiv.find("label");
  var $parentItemCodeLabel = $parentItemCodeDiv.find("label");
  var $childItemTypeLabel = $childItemTypeDiv.find("label");
  var $childItemCodeLabel = $childItemCodeDiv.find("label");
  var $classificationLabel = $classificationDiv.find("label");
  var $sectorLabel = $sectorDiv.find("label");
  var $subSectorLabel = $subSectorDiv.find("label");
  var $approvalLevelLabel = $approvalLevelDiv.find("label");
  
  if (shouldHideHierarchyFields) {
    // Hide fields
    $parentItemTypeDiv.hide();
    $parentItemCodeDiv.hide();
    $childItemTypeDiv.hide();
    $childItemCodeDiv.hide();
    $classificationDiv.hide();
    $sectorDiv.hide();
    $subSectorDiv.hide();
    $approvalLevelDiv.hide();
    
    // Remove required attribute and classes
    $parentItemType.prop("required", false);
    $parentItemTypeLabel.removeClass("required-field");
    $parentItemType.removeClass("is-invalid");
    
    $parentItemCode.prop("required", false);
    $parentItemCodeLabel.removeClass("required-field");
    $parentItemCode.removeClass("is-invalid");
    
    $childItemType.prop("required", false);
    $childItemTypeLabel.removeClass("required-field");
    $childItemType.removeClass("is-invalid");
    
    $childItemCode.prop("required", false);
    $childItemCodeLabel.removeClass("required-field");
    $childItemCode.removeClass("is-invalid");
    
    // Classification is disabled and not required (read-only for MainKpi)
    $classification.prop("required", false);
    $classificationLabel.removeClass("required-field");
    $classification.removeClass("is-invalid");
    
    $sector.prop("required", false);
    $sectorLabel.removeClass("required-field");
    $sector.removeClass("is-invalid");
    
    $subSector.prop("required", false);
    $subSectorLabel.removeClass("required-field");
    $subSector.removeClass("is-invalid");
    
    $approvalLevel.prop("required", false);
    $approvalLevelLabel.removeClass("required-field");
    $approvalLevel.removeClass("is-invalid");
    
    // Clear hidden values in New mode add action
    $parentItemType.val("");
    $parentItemCode.val("");
    $childItemType.val("");
    $childItemCode.val("");
    $classification.val("");
    $sector.val("");
    $subSector.val("");
    $approvalLevel.val("");
  } else {
    // Restore visible state when user switches from add to other actions
    $parentItemTypeDiv.show();
    $parentItemCodeDiv.show();
    $childItemTypeDiv.show();
    $childItemCodeDiv.show();
    $sectorDiv.show();
    $subSectorDiv.show();
    $approvalLevelDiv.show();

    // Keep Classification visibility controlled by parent type
    if ($("#ParentItemType").val() === "MainKpi") {
      $classificationDiv.show();
    } else {
      $classificationDiv.hide();
    }

    // Restore required markers for main hierarchy fields
    $parentItemType.prop("required", true);
    $parentItemTypeLabel.addClass("required-field");
    $parentItemCode.prop("required", true);
    $parentItemCodeLabel.addClass("required-field");
    $sector.prop("required", true);
    $sectorLabel.addClass("required-field");
    $subSector.prop("required", true);
    $subSectorLabel.addClass("required-field");
    $approvalLevel.prop("required", true);
    $approvalLevelLabel.addClass("required-field");

    // Child fields remain conditionally required by validation logic
    $childItemType.prop("required", false);
    $childItemTypeLabel.removeClass("required-field");
    $childItemCode.prop("required", false);
    $childItemCodeLabel.removeClass("required-field");
  }
}

function toggleFormEditable(isEditable) {
  const disabled = !isEditable;

  $(
    ".changeRequests-container input, .changeRequests-container select, .changeRequests-container textarea"
  ).prop("disabled", disabled);

  // In workflow edit mode, disable all dynamic fields as well
  if (window.isWF && window.isEdit) {
    $(
      ".changeItemsRow .dynamicField input, .changeItemsRow .dynamicField textarea, .changeItemsRow .dynamicField select"
    ).prop("disabled", true);
    $(".changeItemsRow .dynamicField .sp-peoplepicker-topLevel").css({
      "pointer-events": "none",
      opacity: "0.6",
    });
  }

  // Ensure WFStage stays disabled (it should always be disabled)
  $("#WFStage").prop("disabled", true);
  
  // Ensure RelatedStrategy stays disabled in new and edit modes
  if (window.isNew || window.isEdit) {
    $("#RelatedStrategy").prop("disabled", true);
  }

  $(".sp-peoplepicker-topLevel").css({
    "pointer-events": disabled ? "none" : "auto",
    opacity: disabled ? "0.6" : "1",
  });

  if ($("#CRSubmitButton").length && $("#CREditButton").length) {
    if (window.isWF) {
      // Hide edit button and save button, show workflow button (works for both isview and isedit in workflow mode)
      $("#CREditButton").hide();
      $("#CRSubmitButton").hide();
      if ($("#CRWorkflowButton").length) {
        $("#CRWorkflowButton").css("display", "inline-block");
      }
    } else if (isEditable) {
      $("#CRSubmitButton").css("display", "inline-block");
      $("#CREditButton").hide();
      if ($("#CRWorkflowButton").length) {
        $("#CRWorkflowButton").hide();
      }
    } else {
      $("#CRSubmitButton").hide();
      $("#CREditButton").show();
      if ($("#CRWorkflowButton").length) {
        $("#CRWorkflowButton").hide();
      }
    }
  }
}

function toggleEditModeFields() {
  // Disable all form fields first
  $(
    ".changeRequests-container input, .changeRequests-container select, .changeRequests-container textarea"
  ).prop("disabled", true);

  // Ensure WFStage stays disabled (it should always be disabled)
  $("#WFStage").prop("disabled", true);

  // In workflow edit mode, disable all fields including dynamic fields
  if (window.isWF) {
    // Disable dynamic fields in workflow edit mode
    $(
      ".changeItemsRow .dynamicField input, .changeItemsRow .dynamicField textarea, .changeItemsRow .dynamicField select"
    ).prop("disabled", true);
    $(".changeItemsRow .dynamicField .sp-peoplepicker-topLevel").css({
      "pointer-events": "none",
      opacity: "0.6",
    });
    
    // Check if this is the last stage to enable Observations
    checkAndShowObservationsSection();
  } else {
    // Enable only the fields that are allowed to be edited in edit mode (non-workflow)
    $("#ChangeDescription").prop("disabled", false);
    $("#ChangeJustification").prop("disabled", false);
    $("#ExpectedPositiveImpact").prop("disabled", false);
    $("#ImpactType").prop("disabled", false);

    // Enable dynamic fields (fields that are generated based on change item selection)
    $(
      ".changeItemsRow .dynamicField input, .changeItemsRow .dynamicField textarea, .changeItemsRow .dynamicField select"
    ).prop("disabled", false);
  }

  // Enable attachments in edit mode
  if ($("#CRAttachments").length) {
    $("#CRAttachments").prop("disabled", false);
  }
  // Refresh existing attachments to show delete buttons in edit mode
  setTimeout(loadCRExistingAttachments, 200);

  // Enable People Picker controls in dynamic fields (Edit mode)
  $(".changeItemsRow .dynamicField .sp-peoplepicker-topLevel").css({
    "pointer-events": "auto",
    opacity: "1",
  });
  $(".changeItemsRow .dynamicField .sp-peoplepicker-editorInput").prop("disabled", false);

  // Disable People Picker controls in non-dynamic fields (main form fields)
  $(".changeRequests-container .sp-peoplepicker-topLevel").not(".changeItemsRow .dynamicField .sp-peoplepicker-topLevel").css({
    "pointer-events": "none",
    opacity: "0.6",
  });

  // Show save button and hide edit button
  if ($("#CRSubmitButton").length && $("#CREditButton").length) {
    $("#CRSubmitButton").css("display", "inline-block");
    $("#CREditButton").hide();
  }
}

$(document).on("click", "#CRSubmitButton", function (e) {
  e.preventDefault();
  e.stopPropagation();
  
  // Check IsActive for new forms - prevent submission if agency is not authorized
  if (window.isNew && window.currentIsActive === false) {
    alert(
      localStorage.getItem("lng") == "en"
        ? "The selected item belongs to an agency not authorized to submit change requests!"
        : "العنصر الذي تم اختياره يتبع لوكالة غير مخوّلة بتقديم طلبات التغيير !"
    );
    return false;
  }
  
  // Check actionType for New mode add action
  var meta = getSelectedChangeItemMeta();
  var actionType = (meta.actionType || "").toLowerCase();
  var isNewAddAction = window.isNew && actionType === "add";
  
  // Validate actionType - must be one of: add, split, merge, delete
  if (!meta.actionType || meta.actionType.trim() === "") {
    console.log("يرجى اختيار نوع الإجراء (add, split, merge, delete)");
    return false;
  }
  
  // If actionType is not add, split, merge, or delete, check if dynamicField exists
  if (meta.actionType !== "add" && meta.actionType !== "split" && 
      meta.actionType !== "merge" && meta.actionType !== "delete") {
    const dynamicFieldsCount = $(".changeItemsRow .dynamicField").length;
    if (dynamicFieldsCount === 0) {
      alert(
        localStorage.getItem("lng") == "en"
          ? "There are no fields to change according to your choices. Please review the data!"
          : "ليس هناك حقول للتغيير وفقًا لخياراتك. يرجى مراجعة البيانات !"
      );
      return false;
    }
  }
  
  var isAddAction = actionType === "add";

  // Validate required fields (same as searchDocuments.js)
  let isValid = true;
  let firstInvalid = null;

  // Validate Sector - skip if actionType is "add"
  if (!isAddAction && !isNewAddAction) {
    var sectorVal = $("#Sector").val();
    if (!sectorVal || sectorVal.trim() === "") {
      $("#Sector").addClass("is-invalid");
      if (!firstInvalid) firstInvalid = $("#Sector");
      isValid = false;
    } else {
      $("#Sector").removeClass("is-invalid");
    }
  } else {
    $("#Sector").removeClass("is-invalid");
  }

  // Validate SubSector - skip if actionType is "add"
  if (!isAddAction && !isNewAddAction) {
    var subSectorVal = $("#SubSector").val();
    if (!subSectorVal || subSectorVal.trim() === "") {
      $("#SubSector").addClass("is-invalid");
      if (!firstInvalid) firstInvalid = $("#SubSector");
      isValid = false;
    } else {
      $("#SubSector").removeClass("is-invalid");
    }
  } else {
    $("#SubSector").removeClass("is-invalid");
  }

  // Validate RelatedStrategy
  var relatedStrategyVal = $("#RelatedStrategy").val();
  if (!relatedStrategyVal || relatedStrategyVal.trim() === "") {
    $("#RelatedStrategy").addClass("is-invalid");
    if (!firstInvalid) firstInvalid = $("#RelatedStrategy");
    isValid = false;
  } else {
    $("#RelatedStrategy").removeClass("is-invalid");
  }

  // Validate ParentItemType - skip if actionType is "add"
  if (!isAddAction && !isNewAddAction) {
    var parentItemTypeVal = $("#ParentItemType").val();
    if (!parentItemTypeVal || parentItemTypeVal.trim() === "") {
      $("#ParentItemType").addClass("is-invalid");
      if (!firstInvalid) firstInvalid = $("#ParentItemType");
      isValid = false;
    } else {
      $("#ParentItemType").removeClass("is-invalid");
    }
  } else {
    $("#ParentItemType").removeClass("is-invalid");
  }

  // Validate ParentItemCode - skip if actionType is "add"
  if (!isAddAction && !isNewAddAction) {
    var parentItemCodeVal = $("#ParentItemCode").val();
    if (!parentItemCodeVal || parentItemCodeVal.trim() === "") {
      $("#ParentItemCode").addClass("is-invalid");
      if (!firstInvalid) firstInvalid = $("#ParentItemCode");
      isValid = false;
    } else {
      $("#ParentItemCode").removeClass("is-invalid");
    }
  } else {
    $("#ParentItemCode").removeClass("is-invalid");
  }

  // Validate ChangeItem
  var changeItemVal = $("#ChangeItem").val();
  if (!changeItemVal || changeItemVal.trim() === "") {
    $("#ChangeItem").addClass("is-invalid");
    if (!firstInvalid) firstInvalid = $("#ChangeItem");
    isValid = false;
  } else {
    $("#ChangeItem").removeClass("is-invalid");
  }

  // Validate ApprovalLevel (skip in New+add where field is hidden)
  var approvalLevelVal = $("#ApprovalLevel").val();
  if (!isNewAddAction) {
    if (!approvalLevelVal || approvalLevelVal.trim() === "") {
      $("#ApprovalLevel").addClass("is-invalid");
      if (!firstInvalid) firstInvalid = $("#ApprovalLevel");
      isValid = false;
    } else {
      $("#ApprovalLevel").removeClass("is-invalid");
    }
  } else {
    $("#ApprovalLevel").removeClass("is-invalid");
  }

  // Validate ChangeDescription
  var changeDescVal = $("#ChangeDescription").val();
  if (!changeDescVal || changeDescVal.trim() === "") {
    $("#ChangeDescription").addClass("is-invalid");
    if (!firstInvalid) firstInvalid = $("#ChangeDescription");
    isValid = false;
  } else {
    $("#ChangeDescription").removeClass("is-invalid");
  }

  // Validate ChangeJustification
  var changeJustVal = $("#ChangeJustification").val();
  if (!changeJustVal || changeJustVal.trim() === "") {
    $("#ChangeJustification").addClass("is-invalid");
    if (!firstInvalid) firstInvalid = $("#ChangeJustification");
    isValid = false;
  } else {
    $("#ChangeJustification").removeClass("is-invalid");
  }

  // Validate ExpectedPositiveImpact
  var expectedImpactVal = $("#ExpectedPositiveImpact").val();
  if (!expectedImpactVal || expectedImpactVal.trim() === "") {
    $("#ExpectedPositiveImpact").addClass("is-invalid");
    if (!firstInvalid) firstInvalid = $("#ExpectedPositiveImpact");
    isValid = false;
  } else {
    $("#ExpectedPositiveImpact").removeClass("is-invalid");
  }

  // Validate ImpactType
  var impactTypeVal = $("#ImpactType").val();
  if (!impactTypeVal || impactTypeVal.trim() === "") {
    $("#ImpactType").addClass("is-invalid");
    if (!firstInvalid) firstInvalid = $("#ImpactType");
    isValid = false;
  } else {
    $("#ImpactType").removeClass("is-invalid");
  }

  // Validate ChildItemCode - required if ChildItemType is selected and not empty, but skip if actionType is "add"
  if (!isAddAction && !isNewAddAction) {
    var childItemTypeVal = $("#ChildItemType").val();
    if (childItemTypeVal && childItemTypeVal.trim() !== "") {
      var childItemCodeVal = $("#ChildItemCode").val();
      if (!childItemCodeVal || childItemCodeVal.trim() === "") {
        $("#ChildItemCode").addClass("is-invalid");
        if (!firstInvalid) firstInvalid = $("#ChildItemCode");
        isValid = false;
      } else {
        $("#ChildItemCode").removeClass("is-invalid");
      }
    } else {
      $("#ChildItemCode").removeClass("is-invalid");
    }
  } else {
    $("#ChildItemCode").removeClass("is-invalid");
  }

  // If validation fails, stop here and don't call saveAllChangeRequestFields
  if (!isValid) {
    if (firstInvalid && firstInvalid.length) {
      // Scroll to the first invalid field with smooth animation
      $("html, body").animate(
        { scrollTop: firstInvalid.offset().top - 150 },
        500
      );
      // Focus on the first invalid field
      setTimeout(function () {
        firstInvalid.focus();
      }, 500);
    }
    return false; // Explicitly return false to prevent any further execution
  }

  // All fields are valid, proceed with save
  saveAllChangeRequestFields();
  return false;
});

// Remove is-invalid class when user starts typing/selecting (same as searchDocuments.js pattern)
$(document).on(
  "input change",
  "#Sector, #SubSector, #RelatedStrategy, #ParentItemType, #ParentItemCode, #ChangeItem, #ApprovalLevel, #ChangeDescription, #ChangeJustification, #ExpectedPositiveImpact, #ImpactType, #ChildItemCode, #ChildItemType",
  function () {
    if ($(this).val() && $(this).val().trim() !== "") {
      $(this).removeClass("is-invalid");
    }
    // If ChildItemCode changes and has value, remove invalid class
    if ($(this).attr("id") === "ChildItemCode") {
      var childItemCodeVal = $(this).val();
      if (childItemCodeVal && childItemCodeVal.trim() !== "") {
        $(this).removeClass("is-invalid");
      }
    }
    // If ChildItemType changes, validate ChildItemCode
    if ($(this).attr("id") === "ChildItemType") {
      var childItemTypeVal = $(this).val();
      var $childItemCode = $("#ChildItemCode");
      var $childItemCodeLabel = $childItemCode.closest(".col-md-6").find("label");
      if (childItemTypeVal && childItemTypeVal.trim() !== "") {
        $childItemCode.prop("required", true);
        $childItemCodeLabel.addClass("required-field");
        var childItemCodeVal = $childItemCode.val();
        if (childItemCodeVal && childItemCodeVal.trim() !== "") {
          $childItemCode.removeClass("is-invalid");
        }
      } else {
        $childItemCode.prop("required", false);
        $childItemCodeLabel.removeClass("required-field");
        $childItemCode.removeClass("is-invalid");
      }
    }
  }
);

$(document).on("click", "#CRWorkflowButton", function () {
  if (window.isWF && (taskID || taskId)) {
    // Show workflow approval popup
    showWorkflowApprovalPopup();
  } else {
    alert("Workflow mode or Task ID not found");
  }
});
$(document).on("click", "#CREditButton", function () {
  let href = window.location.href;
  if (href.toLowerCase().indexOf("isview=true") > -1) {
    // If coming from view mode, reload the page with isedit=true
    href = href.replace(/isview=true/i, "isedit=true");
    window.location.href = href;
    return;
  } else if (href.toLowerCase().indexOf("isedit=true") === -1) {
    href += (href.indexOf("?") > -1 ? "&" : "?") + "isedit=true";
  }
  window.history.replaceState(null, "", href);
  window.isEdit = true;
  window.isView = false;
  
  // Save current ChangeItem value before initializing edit mode
  const currentChangeItem = $("#ChangeItem").val() || "";
  
  toggleEditModeFields();
  initializeEditMode(currentChangeItem);
  updatePageTitleLink();
  
  // If in workflow mode, check and show Observations section
  if (window.isWF) {
    checkAndShowObservationsSection();
  }
});
function loadListOptions(
  listName,
  selectId,
  dispFieldKey,
  dispFieldKeyEn,
  valFieldKey,
  filter = "",
  orderBy = ""
) {
  const lang = localStorage.getItem("lng");
  let query =
    _spPageContextInfo.webAbsoluteUrl +
    `/_api/web/lists/getbytitle('${listName}')/items?$top=5000&$filter=DeletionStatus ne 'Deleted'`;
  if (filter) query += ` and ${filter}`;
  if (orderBy) query += `&$orderby=${orderBy}`;
  // For MainKpi, ensure Types field is included in the response
  if (listName === "MainKpi") {
    query += `&$select=Title,Name,Types,${dispFieldKey}`;
  }

  if (
    window.currentUserRole === "PerformanceLeader" &&
    listName === "MainKpi"
  ) {
  }

  $.ajax({
    url: query,
    method: "GET",
    headers: { Accept: "application/json; odata=verbose" },
    success: function (data) {
      const $select = $(selectId);
      // Save current value before emptying (especially important for ParentItemCode during initial load)
      const currentValue = (window.isLoadingChangeRequestData && (window.isEdit || window.isView)) 
        ? $select.val() || "" 
        : "";
      
      $select.empty().append(`<option value=""></option>`);
      data.d.results.forEach((item) => {
        // For MainKpi, Projects, Initiatives, SOs: use Name for both Arabic and English
        // For other lists: use dispFieldKey/dispFieldKeyEn based on language
        let text = "";
        if (listName === "MainKpi" || listName === "Projects" || listName === "Initiatives" || listName === "SOs") {
          text = item[dispFieldKey] || ""; // Use Name for both languages
        } else {
          text = lang == null || lang == "ar"
            ? item[dispFieldKey]
            : item[dispFieldKeyEn];
        }
        const val = item[valFieldKey] ? item[valFieldKey] : "";
        
        // For MainKpi, add data-kpitype attribute from Types field
        let optionHtml = `<option value="${val}">${text}</option>`;
        if (listName === "MainKpi" && item.Types) {
          const kpiType = item.Types || "";
          optionHtml = `<option value="${val}" data-kpitype="${kpiType}">${text}</option>`;
        }
        
        $select.append(optionHtml);
      });
      
      // Restore current value if it was saved (during initial data load)
      if (currentValue && currentValue.trim() !== "") {
        setTimeout(function() {
          setSelectValue(selectId, currentValue);
        }, 50);
      }
    },
    error: function (err) { },
  });
}

function loadSectors() {
  loadListOptions(
    "Internal Entities",
    "#Sector",
    "Name",
    "NameEn",
    "Title",
    "EntityType eq 'Sector'",
    "Created"
  );
}

function loadSubSectors(sectorTitle) {
  const $subSector = $("#SubSector");
  if (!sectorTitle) {
    // Add empty option if no sector selected
    $subSector.empty().append(`<option value=""></option>`);
    return;
  }
  loadListOptions(
    "Internal Entities",
    "#SubSector",
    "Name",
    "NameEn",
    "Title",
    `EntityType eq 'Department' and ParentEntity eq '${sectorTitle}'`,
    "Created"
  );
}

function loadStrategyOptions() {
  // Filter: DeletionStatus ne 'Deleted' and Types eq 'ministry'
  const filter = "Types eq 'ministry'";
  loadOptionsOnly(
    "GoalStrategy",
    "#RelatedStrategy",
    "Name",
    "NameEn",
    "Title",
    filter,
    "Created"
  ).then(function() {
    // Select the first non-empty option (skip the empty option)
    const $select = $("#RelatedStrategy");
    const firstOption = $select.find("option:not([value='']):first");
    if (firstOption.length > 0 && window.isNew) {
      $select.val(firstOption.val());
    }
    
    // Disable RelatedStrategy field in new and edit modes
    if (window.isNew || window.isEdit) {
      $select.prop("disabled", true);
    }
  });
}

function isDuParentItemsList(listName) {
  return (
    listName === "Projects" ||
    listName === "Initiatives" ||
    listName === "MainKpi" ||
    listName === "SOs"
  );
}

function needsParentItemsSecurityFilter(currentRole, listName) {
  return (
    (currentRole === "ObjectiveOwner" && listName === "SOs") ||
    (currentRole === "PerformanceLeader" && listName === "MainKpi") ||
    (currentRole === "InitiativeManager" && listName === "Initiatives") ||
    (currentRole === "ProjectManager" && listName === "Projects") ||
    (currentRole === "DU" && isDuParentItemsList(listName))
  );
}

function getDuSubSectorTitles() {
  return new Promise(function (resolve, reject) {
    if (duSubSectorTitlesCache !== null) {
      resolve(duSubSectorTitlesCache);
      return;
    }
    if (duSubSectorTitlesPromise) {
      duSubSectorTitlesPromise.then(resolve).catch(reject);
      return;
    }

    function fetchDuDepartments() {
      var query =
        _spPageContextInfo.webAbsoluteUrl +
        "/_api/web/lists/getbytitle('Internal Entities')/items?$top=5000&$select=Title&$filter=DeletionStatus ne 'Deleted' and EntityType eq 'Department' and SPMO/Id eq " +
        LoggedInUserId;

      return new Promise(function (resolveFetch, rejectFetch) {
        $.ajax({
          url: query,
          method: "GET",
          headers: { Accept: "application/json; odata=verbose" },
          success: function (data) {
            var titles = (data.d.results || [])
              .map(function (item) {
                return item.Title;
              })
              .filter(function (title) {
                return title && String(title).trim() !== "";
              });
            duSubSectorTitlesCache = titles;
            resolveFetch(titles);
          },
          error: function (err) {
            rejectFetch(err);
          },
        });
      });
    }

    var fetchChain = LoggedInUserId
      ? fetchDuDepartments()
      : getLoggedInUser().then(fetchDuDepartments);

    duSubSectorTitlesPromise = fetchChain
      .then(function (titles) {
        resolve(titles);
        return titles;
      })
      .catch(function (err) {
        duSubSectorTitlesPromise = null;
        reject(err);
      });
  });
}

function buildDuSubSectorODataFilter(titles) {
  if (!titles || titles.length === 0) {
    return "SubSector eq '__DU_NO_ACCESS__'";
  }
  var parts = titles.map(function (title) {
    return "SubSector eq '" + String(title).replace(/'/g, "''") + "'";
  });
  if (parts.length === 1) {
    return parts[0];
  }
  return "(" + parts.join(" or ") + ")";
}

function getParentItemsRoleSecurityFilterParts(currentRole, listName) {
  var securityFilterParts = [];
  if (currentRole === "ObjectiveOwner" && listName === "SOs") {
    if (LoggedInUserId) {
      securityFilterParts.push(`ObjectiveOwner/Id eq ${LoggedInUserId}`);
    }
  } else if (currentRole === "PerformanceLeader" && listName === "MainKpi") {
    if (LoggedInUserId) {
      securityFilterParts.push(
        `(PerformanceLeader/Id eq ${LoggedInUserId} or PerformanceLeader2/Id eq ${LoggedInUserId})`
      );
    }
  } else if (
    currentRole === "InitiativeManager" &&
    listName === "Initiatives"
  ) {
    if (LoggedInUserId) {
      securityFilterParts.push(`InitiativePM/Id eq ${LoggedInUserId}`);
    }
  } else if (currentRole === "ProjectManager" && listName === "Projects") {
    if (LoggedInUserId) {
      securityFilterParts.push(`ProjectManager/Id eq ${LoggedInUserId}`);
    }
  }
  return securityFilterParts;
}

function getParentItemsSectorFilterParts(listName) {
  var sectorFilterParts = [];
  var relatedStrategy = $("#RelatedStrategy").val();
  var parentItemType = $("#ParentItemType").val();

  if (parentItemType === "Projects" && listName === "Projects") {
    sectorFilterParts.push(`IsStrategicProject eq 'strategy'`);
  }

  if (parentItemType === "MainKpi" && listName === "MainKpi") {
    sectorFilterParts.push(
      `(Classification eq 'kpistrategic' or Classification eq 'kpioperational')`
    );
  }

  if (relatedStrategy && listName !== "Projects") {
    if (listName === "MainKpi" || listName === "SOs" || listName === "Initiatives") {
      sectorFilterParts.push(
        `RelatedStrategy eq '${relatedStrategy.replace(/'/g, "''")}'`
      );
    }
  }

  return sectorFilterParts;
}

function resolveParentItemsFilter(listName) {
  return new Promise(function (resolve) {
    var currentRole = window.currentUserRole || "";
    var securityFilterParts = getParentItemsRoleSecurityFilterParts(
      currentRole,
      listName
    );
    var sectorFilterParts = getParentItemsSectorFilterParts(listName);

    function combineFilters(duSubSectorFilter) {
      var allFilterParts = [];
      if (securityFilterParts.length > 0) {
        allFilterParts.push("(" + securityFilterParts.join(" and ") + ")");
      }
      if (duSubSectorFilter) {
        allFilterParts.push("(" + duSubSectorFilter + ")");
      }
      if (sectorFilterParts.length > 0) {
        allFilterParts.push("(" + sectorFilterParts.join(" and ") + ")");
      }
      resolve(allFilterParts.length > 0 ? allFilterParts.join(" and ") : "");
    }

    if (currentRole === "DU" && isDuParentItemsList(listName)) {
      getDuSubSectorTitles()
        .then(function (titles) {
          combineFilters(buildDuSubSectorODataFilter(titles));
        })
        .catch(function () {
          combineFilters("SubSector eq '__DU_NO_ACCESS__'");
        });
      return;
    }

    combineFilters(null);
  });
}

function loadParentItems(listName, selectId) {
  var currentRole = window.currentUserRole || "";

  if (needsParentItemsSecurityFilter(currentRole, listName) && !LoggedInUserId) {
    getLoggedInUser()
      .then(function () {
        loadParentItems(listName, selectId);
      })
      .catch(function (err) {
        loadListOptions(
          listName,
          selectId,
          "Name",
          "Name",
          "Title",
          "",
          "Name asc"
        );
      });
    return;
  }

  resolveParentItemsFilter(listName).then(function (filter) {
    loadListOptions(
      listName,
      selectId,
      "Name",
      "Name",
      "Title",
      filter,
      "Name asc"
    );
  });
}

function loadChildItems(listName, parentTitle, parentType) {
  if (!parentTitle || !parentType) return;
  
  // Don't reload if we're still loading initial data (values are already set)
  if (window.isLoadingChangeRequestData && (window.isEdit || window.isView)) {
    return;
  }
  
  var currentRole = window.currentUserRole || "";

  let filter =
    parentType === "Initiatives"
      ? `InitiativeCode eq '${parentTitle}'`
      : `ProjectCode eq '${parentTitle}'`;

  if (currentRole === "InitiativeManager" && parentType === "Initiatives") {
  }

  if (currentRole === "ProjectManager" && parentType === "Projects") {
  }

  loadListOptions(listName, "#ChildItemCode", "Name", "Name", "Title", filter);
}

function loadChangeItems(listName, parentType = "", childType = "") {
  // Don't reload if we're still loading initial data (values are already set)
  if (window.isLoadingChangeRequestData && (window.isEdit || window.isView)) {
    return;
  }
  
  const $changeItem = $("#ChangeItem");
  $changeItem
    .empty()
    .append(
      '<option data-trans-changeitem class="Resources" value=""></option>'
    );
  $(".changeItemsRow").find(".dynamicField").remove();
  if (!listName) return;

  let filter = "";
  if (childType) filter = `ListName eq '${childType}'`;
  else if (parentType) filter = `ListName eq '${parentType}'`;
  else filter = `ListName eq '${listName}'`;

  const url =
    _spPageContextInfo.webAbsoluteUrl +
    `/_api/web/lists/getbytitle('ChangeItems')/items?$filter=${filter} and DeletionStatus ne 'Deleted'&$orderby=ID`;

  $.ajax({
    url: url,
    method: "GET",
    headers: { Accept: "application/json; odata=verbose" },
    success: function (data) {
      data.d.results.forEach((item) => {
        $changeItem.append(
          `<option value="${item.Title}" data-name="${item.ItemName}" data-column="${item.ColumnInternalName}" data-actiontype="${item.ActionType}" data-listname="${item.ListName}" data-updatetype="${item.UpdateType}">${item.ItemName}</option>`
        );
      });
      
      // Handle Parent/Child fields visibility based on actionType after loading options
      handleParentChildFieldsVisibility();
    },
    error: function (err) { },
  });
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildInputHtml(fieldName, fieldType, value, readOnly) {
  const safeName = escapeHtml(fieldName || "");
  const safeValue = escapeHtml(
    value === null || value === undefined ? "" : String(value)
  );
  const disabledAttr = readOnly ? " disabled" : "";

  if (fieldType === "boolean") {
    const isChecked =
      value === true || String(value).toLowerCase() === "true"
        ? " checked"
        : "";
    return `<input type="checkbox" id="${safeName}"${isChecked}${disabledAttr}>`;
  }

  if (fieldType === "textarea") {
    return `<textarea id="${safeName}" class="form-control" rows="3"${disabledAttr}>${safeValue}</textarea>`;
  }

  // Support for People Picker (type = "picker") - only handle if type is picker
  if (fieldType === "picker") {
    // Return a simple input that will be replaced by initPeoplePicker() with full PPField structure
    return `<input type="text" class="form-control peoplePicker" id="${safeName}" value="${safeValue}" data-user-id="${safeValue}"${disabledAttr}>`;
  }

  // Support for Lookup (type = "lookup") - return select dropdown
  if (fieldType === "lookup") {
    return `<select id="${safeName}" class="form-control"${disabledAttr}><option value="" disabled selected></option></select>`;
  }

  // Support for DropdownValues (type = "dropdownValues") - return select dropdown
  if (fieldType === "dropdownvalues") {
    return `<select id="${safeName}" class="form-control"${disabledAttr}><option value="" disabled selected></option></select>`;
  }

  // Support for date, datetime, datetimetoparent - use type="date" 
  // Input type="date" requires yyyy-mm-dd format, but we'll convert to mm/dd/yyyy on submit
  if (fieldType === "date" || fieldType === "datetime" || fieldType === "datetimetoparent") {
    // Convert value to yyyy-mm-dd format for input type="date"
    // Remove time part if exists (e.g., "12/14/2023 21:00:00" -> "12/14/2023")
    let dateValue = "";
    if (value && value !== "" && value !== "null" && value !== "undefined") {
      try {
        // Remove time part if exists - handle both space and T separator
        let dateStr = String(value).split(" ")[0].split("T")[0]; // Get date part only (before space or T)
        
        // Try to parse mm/dd/yyyy format first (most common)
        const mmddyyyy = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        let d;
        if (mmddyyyy) {
          // Parse mm/dd/yyyy format
          d = new Date(parseInt(mmddyyyy[3]), parseInt(mmddyyyy[1]) - 1, parseInt(mmddyyyy[2]));
        } else {
          // Try to parse as Date (handles ISO format and other formats)
          d = new Date(dateStr);
        }
        
        if (!isNaN(d)) {
          const year = d.getFullYear();
          const month = ("0" + (d.getMonth() + 1)).slice(-2);
          const day = ("0" + d.getDate()).slice(-2);
          dateValue = `${year}-${month}-${day}`;
        }
      } catch (e) { }
    }
    return `<input type="date" id="${safeName}" class="form-control date-input" value="${dateValue}"${disabledAttr}>`;
  }

  const inputType =
    fieldType === "number" ? fieldType : "text";
  return `<input type="${inputType}" id="${safeName}" class="form-control" value="${safeValue}"${disabledAttr}>`;
}

function renderDynamicChangeFields(columns) {
  const lang = localStorage.getItem("lng");
  const container = $(".changeItemsRow");
  container.find(".dynamicField").remove();

  // Check actionType - if add, merge, split, or delete, hide dynamic section and don't render fields
  var meta = getSelectedChangeItemMeta();
  if (meta.actionType === "add" || meta.actionType === "merge" || meta.actionType === "split" || meta.actionType === "delete") {
    setChangeItemsVisibility(false);
    return;
  }

  if (!columns || columns.length === 0) {
    setChangeItemsVisibility(false);
    return;
  }

  setChangeItemsVisibility(true);

  // Check if we need to fetch DisplayNames from API
  const changeItemCode = $("#ChangeItem").val();
  const approvalLevel = $("#ApprovalLevel").val();
  let itemCode = $("#ParentItemCode").val();
  if ($("#ChildItemCodeDiv").is(":visible") && $("#ChildItemCode").val()) {
    itemCode = $("#ChildItemCode").val();
  }

  // Always call API if we have required values to get DisplayNames
  // But skip API call if actionType is add, merge, split, or delete
  if (changeItemCode && approvalLevel && itemCode) {
    // Check actionType - if add, merge, split, or delete, don't call API
    var meta = getSelectedChangeItemMeta();
    if (meta.actionType === "add" || meta.actionType === "merge" || meta.actionType === "split" || meta.actionType === "delete") {
      // Don't call API, just render fields directly without API
      renderFieldsWithDisplayNames(columns, {}, lang, container, []);
      return;
    }
    
    // Build URL with classification parameter if it's MainKpi
    let url = `${APIURL}/general/getchangeitemsdetails/${encodeURIComponent(
      changeItemCode
    )}/${encodeURIComponent(approvalLevel)}/${encodeURIComponent(itemCode)}`;
    
    const parentType = $("#ParentItemType").val();
    const classification = (parentType === "MainKpi" && $("#Classification").val()) ? $("#Classification").val() : null;
    if (parentType === "MainKpi" && classification) {
      url += `?classification=${encodeURIComponent(classification)}`;
    }

    $.ajax({
      url: url,
      method: "GET",
      headers: { Accept: "application/json" },
      success: function (res) {
        const result = res && res.result ? res.result : {};
        
        // Check IsActive for new forms
        if (!handleIsActiveCheck(result)) {
          // Item is not active, don't proceed with rendering fields
          return;
        }

        const apiColumns =
          res && res.result && res.result.columnsDetails
            ? res.result.columnsDetails
            : [];

        const displayNameMap = {};
        apiColumns.forEach((apiCol) => {
          let jsonField = {};
          try {
            jsonField = JSON.parse(apiCol.jsonField || "{}");
          } catch (e) { }
          if (jsonField.InternalName) {
            displayNameMap[jsonField.InternalName] = {
              DisplayName: jsonField.DisplayName || "",
              DisplayNameEn: jsonField.DisplayNameEn || "",
            };
          }
        });

        renderFieldsWithDisplayNames(apiColumns, displayNameMap, lang, container, apiColumns);
      },
      error: function (xhr) {
        renderFieldsWithDisplayNames(columns, {}, lang, container, []);
      },
    });
  } else {
    // Render fields directly (DisplayNames already available or API not available)
    renderFieldsWithDisplayNames(columns, {}, lang, container, []);
  }
}

function renderFieldsWithDisplayNames(
  columns,
  displayNameMap,
  lang,
  container,
  apiColumns = []
) {
  columns.forEach((col) => {
    let meta = {};
    try {
      if (col.jsonField) {
        meta =
          typeof col.jsonField === "string"
            ? JSON.parse(col.jsonField)
            : col.jsonField || {};
      }
    } catch (e) { }
    
    if (!meta.type && apiColumns && apiColumns.length > 0) {
      const fieldName = col.ColumnInternalName || meta.InternalName;
      if (fieldName) {
        const matchingApiCol = apiColumns.find((apiCol) => {
          let jsonField = {};
          try {
            jsonField = JSON.parse(apiCol.jsonField || "{}");
          } catch (e) { }
          return jsonField.InternalName === fieldName;
        });
        if (matchingApiCol && matchingApiCol.jsonField) {
          try {
            const apiJsonField = JSON.parse(matchingApiCol.jsonField || "{}");
            meta = Object.assign({}, meta, apiJsonField);
          } catch (e) { }
        }
      }
    }

    const fieldName =
      col.ColumnInternalName ||
      meta.InternalName ||
      "field_" + Math.random().toString(36).substr(2, 5);

    // Search in displayNameMap using fieldName (InternalName)
    let displayNameInfo = displayNameMap[fieldName] || {};

    // If not found, try to find it in the map by searching through all entries
    if (!displayNameInfo.DisplayName && !displayNameInfo.DisplayNameEn) {
      // Try to find matching entry in displayNameMap
      for (let key in displayNameMap) {
        if (key === fieldName) {
          displayNameInfo = displayNameMap[key];
          break;
        }
      }
    }

    // Use DisplayName from API map if available, otherwise use meta
    const labelText =
      lang == null || lang == "ar"
        ? displayNameInfo.DisplayName ||
        meta.DisplayName ||
        displayNameInfo.DisplayNameEn ||
        meta.DisplayNameEn ||
        fieldName
        : displayNameInfo.DisplayNameEn ||
        meta.DisplayNameEn ||
        displayNameInfo.DisplayName ||
        meta.DisplayName ||
        fieldName;

    const fieldType = (meta.type || "string").toLowerCase();
    const rawValue =
      col.value === null || col.value === undefined ? "" : col.value;
    const colClass = fieldType === "textarea" ? "col-md-12" : "col-md-6";
    let displayValue = rawValue;

    // Handle date, datetime, datetimetoparent - convert to yyyy-mm-dd for input type="date"
    // Remove time part if exists (e.g., "12/14/2023 21:00:00" -> "12/14/2023")
    if (fieldType === "date" || fieldType === "datetime" || fieldType === "datetimetoparent") {
      let dateValue = "";
      try {
        if (rawValue) {
          // Remove time part if exists
          let dateStr = String(rawValue).split(" ")[0]; // Get date part only (before space)
          
          let d = new Date(dateStr);
          if (isNaN(d)) {
            // Try to parse mm/dd/yyyy format
            const mmddyyyy = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
            if (mmddyyyy) {
              d = new Date(parseInt(mmddyyyy[3]), parseInt(mmddyyyy[1]) - 1, parseInt(mmddyyyy[2]));
            }
          }
          if (!isNaN(d)) {
            const year = d.getFullYear();
            const month = ("0" + (d.getMonth() + 1)).slice(-2);
            const day = ("0" + d.getDate()).slice(-2);
            dateValue = `${year}-${month}-${day}`;
          }
        }
      } catch (e) { }
      displayValue = dateValue;
    }

    // For picker fields: convert oldValue (ID) to display name
    let oldValueDisplay = rawValue;
    let oldValueId = ""; // Store original ID for picker fields
    if (fieldType === "picker" && rawValue && rawValue !== "0" && rawValue !== 0) {
      const userId = parseInt(rawValue, 10);
      if (!isNaN(userId)) {
        // oldValue is an ID, save it for API submission
        oldValueId = rawValue;
        // Convert to display name for display
        getUserDisplayNameFromId(rawValue).then(function (displayName) {
          const $oldValueSpan = container
            .find(`#${fieldName}`)
            .closest(".dynamicField")
            .find(".oldValue");
          if ($oldValueSpan.length) {
            $oldValueSpan.text(displayName || rawValue);
          }
        }).catch(function (err) { });
        oldValueDisplay = "Loading..."; // Temporary text while loading
      }
    } else if (fieldType === "picker" && (rawValue === "0" || rawValue === 0)) {
      oldValueDisplay = "0";
      oldValueId = "0";
    } else if (fieldType === "picker") {
      oldValueDisplay = "";
    }

    // For lookup fields: convert oldValue (valfieldkey) to display text (Dispfieldkey)
    // IMPORTANT: Save the original value (valfieldkey) in data attribute for API submission
    let lookupOriginalValue = ""; // Store original value for lookup fields
    if (fieldType === "lookup" && rawValue && rawValue !== "" && rawValue !== "null" && rawValue !== "undefined") {
      const source = meta.source || "";
      const dispFieldKey = meta.Dispfieldkey || "Name";
      const dispFieldKeyEn = meta.DispfieldkeyEn || dispFieldKey;
      const valFieldKey = meta.valfieldkey || "Title";
      
      lookupOriginalValue = rawValue;
      
      if (source) {
        const query = _spPageContextInfo.webAbsoluteUrl +
          `/_api/web/lists/getbytitle('${source}')/items?$top=5000&$filter=DeletionStatus ne 'Deleted' and ${valFieldKey} eq '${rawValue.replace(/'/g, "''")}'`;
        
        $.ajax({
          url: query,
          method: "GET",
          headers: { Accept: "application/json; odata=verbose" },
          success: function (data) {
            if (data.d && data.d.results && data.d.results.length > 0) {
              const item = data.d.results[0];
              const displayText = lang == null || lang == "ar"
                ? (item[dispFieldKey] || rawValue)
                : (item[dispFieldKeyEn] || item[dispFieldKey] || rawValue);
              
              const $fieldDiv = container
                .find(`#${fieldName}`)
                .closest(".dynamicField");
              const $oldValueSpan = $fieldDiv.find(".oldValue");
              if ($oldValueSpan.length) {
                $oldValueSpan.text(displayText);
                $fieldDiv.attr("data-lookup-old-value", lookupOriginalValue);
              }
            }
          },
            error: function (err) {
              const $fieldDiv = container
                .find(`#${fieldName}`)
                .closest(".dynamicField");
              if ($fieldDiv.length) {
                $fieldDiv.attr("data-lookup-old-value", lookupOriginalValue);
              }
            }
        });
        oldValueDisplay = "Loading..."; // Temporary text while loading
      }
    }

    // Format oldValue for display: empty/null/undefined -> "No data", 0 -> "0", otherwise -> value
    // For date fields, convert oldValue to mm/dd/yyyy format
    if ((fieldType === "date" || fieldType === "datetime" || fieldType === "datetimetoparent") && oldValueDisplay && oldValueDisplay !== "" && oldValueDisplay !== "null" && oldValueDisplay !== "undefined" && oldValueDisplay !== "0" && oldValueDisplay !== 0 && oldValueDisplay !== "Loading...") {
      try {
        let d = new Date(oldValueDisplay);
        if (isNaN(d)) {
          // Try to parse mm/dd/yyyy format
          const mmddyyyy = String(oldValueDisplay).match(/(\d{2})\/(\d{2})\/(\d{4})/);
          if (mmddyyyy) {
            d = new Date(parseInt(mmddyyyy[3]), parseInt(mmddyyyy[1]) - 1, parseInt(mmddyyyy[2]));
          }
        }
        if (!isNaN(d)) {
          const month = ("0" + (d.getMonth() + 1)).slice(-2);
          const day = ("0" + d.getDate()).slice(-2);
          const year = d.getFullYear();
          oldValueDisplay = `${month}/${day}/${year}`;
        }
      } catch (e) { }
    }
    
    let oldValueHtml = "";
    if (!oldValueDisplay || oldValueDisplay === "" || oldValueDisplay === "null" || oldValueDisplay === "undefined") {
      oldValueHtml = '<span data-trans-nodata class="Resources"></span>';
    } else if (oldValueDisplay === "0" || oldValueDisplay === 0) {
      oldValueHtml = "0";
    } else if (oldValueDisplay === "Loading...") {
      oldValueHtml = "Loading...";
    } else {
      oldValueHtml = escapeHtml(oldValueDisplay);
    }

    if (fieldType === "dropdownvalues") {
      const selectId = fieldName;
      // Use rawValue for comparison (not displayValue) to match choice.value exactly
      const currentValue = rawValue || "";
      
      // Get oldValue from col.ColumnOldValue (for view/edit mode) or use oldValueDisplay (for new mode)
      const oldValueRaw = col.ColumnOldValue || oldValueDisplay || "";
      
      // Format oldValue - if it's a value from choices, use data-trans attribute for translation
      let oldValueDisplayHtml = oldValueHtml;
      if (oldValueRaw && oldValueRaw !== "" && oldValueRaw !== "null" && oldValueRaw !== "undefined" && oldValueRaw !== "0" && oldValueRaw !== 0) {
        // Check if oldValue matches one of the choice values
        if (meta.options && meta.options.choices && Array.isArray(meta.options.choices)) {
          const matchingChoice = meta.options.choices.find(function(choice) {
            return choice.value === oldValueRaw;
          });
          if (matchingChoice) {
            // Use data-trans attribute for translation
            const oldValueTransAttr = `data-trans-${oldValueRaw}`;
            oldValueDisplayHtml = `<span ${oldValueTransAttr} class="Resources"></span>`;
          }
        }
      }
      
      // Build options HTML directly from meta.options.choices
      // Only select empty option if no value is set
      const emptyOptionSelected = !currentValue ? " selected" : "";
      let optionsHtml = `<option value="" disabled${emptyOptionSelected}></option>`;
      if (meta.options && meta.options.choices && Array.isArray(meta.options.choices)) {
        meta.options.choices.forEach(function(choice) {
          const choiceValue = escapeHtml(choice.value || "");
          const choiceDisplay = escapeHtml(choice.display || choice.value || "");
          const selectedAttr = (currentValue && choice.value === currentValue) ? " selected" : "";
          const transAttr = `data-trans-${choice.value}`;
          optionsHtml += `<option value="${choiceValue}" ${transAttr} class="Resources"${selectedAttr}>${choiceDisplay}</option>`;
        });
      }
      
      const selectHtml = `<select id="${selectId}" class="form-control">${optionsHtml}</select>`;
      
      // Save original oldValue (before translation) in data attribute for API submission
      const oldValueOriginal = oldValueRaw || "";
      const oldValueAttr = oldValueOriginal ? ` data-dropdown-old-value="${escapeHtml(oldValueOriginal)}"` : "";
      
      // Add data-trans attribute to label - use DisplayNameEn as translation key (standard format)
      const labelTransKey = meta.DisplayNameEn || meta.DisplayName || "";
      const labelTransAttr = labelTransKey ? ` data-trans="${labelTransKey}"` : "";
      const labelClass = labelTransKey ? " class=\"Resources\"" : "";
      
      const fieldBlock = `
        <div class="${colClass} mb-3 dynamicField" data-field-id="${fieldName}" data-field-type="${fieldType}"${oldValueAttr}>
          <label${labelTransAttr}${labelClass}>${escapeHtml(
        labelText
      )} (<span data-trans-previousvalue class="Resources"></span> <span class="oldValue">${oldValueDisplayHtml}</span>)</label>
          ${selectHtml}
        </div>
      `;

      container.append(fieldBlock);
      changeResources();
      return;
    }

    if (fieldType === "yesnoradio") {
      const currentValue = rawValue || "";
      
      // Get oldValue from col.ColumnOldValue (for view/edit mode) or use oldValueDisplay (for new mode)
      const oldValueRaw = col.ColumnOldValue || oldValueDisplay || "";
      
      // Format oldValue - if it's a value from choices, use data-trans attribute for translation
      let oldValueDisplayHtml = oldValueHtml;
      if (oldValueRaw && oldValueRaw !== "" && oldValueRaw !== "null" && oldValueRaw !== "undefined" && oldValueRaw !== "0" && oldValueRaw !== 0) {
        // Check if oldValue matches one of the choice values
        if (meta.options && meta.options.choices && Array.isArray(meta.options.choices)) {
          const matchingChoice = meta.options.choices.find(function(choice) {
            return choice.value === oldValueRaw;
          });
          if (matchingChoice) {
            // Use data-trans attribute for translation
            const oldValueTransAttr = `data-trans-${oldValueRaw}`;
            oldValueDisplayHtml = `<span ${oldValueTransAttr} class="Resources"></span>`;
          }
        }
      }
      
      let radioButtonsHtml = "";
      if (meta.options && meta.options.choices && Array.isArray(meta.options.choices)) {
        meta.options.choices.forEach(function(choice) {
          const choiceValue = escapeHtml(choice.value || "");
          const choiceDisplay = escapeHtml(choice.display || choice.value || "");
          const checkedAttr = (currentValue && choice.value === currentValue) ? " checked" : "";
          const transAttr = `data-trans-${choice.value}`;
          const radioId = fieldName + "_" + choice.value;
          radioButtonsHtml += `<input class="form-control yesnolistener" type="radio" name="${escapeHtml(labelText)}" id="${radioId}" value="${choiceValue}" placeholder="${escapeHtml(labelText)}" data-targetfieldrequired="undefined" data-targetfield="undefined" data-targetfieldvalue="undefined"${checkedAttr} /><label ${transAttr} for="${radioId}" class="Resources radiolabel">${choiceDisplay}</label>`;
        });
      }
      
      // Save original oldValue (before translation) in data attribute for API submission
      const oldValueOriginal = oldValueRaw || "";
      const oldValueAttr = oldValueOriginal ? ` data-dropdown-old-value="${escapeHtml(oldValueOriginal)}"` : "";
      
      // Add data-trans attribute to label - use DisplayNameEn as translation key (standard format)
      const labelTransKey = meta.DisplayNameEn || meta.DisplayName || "";
      const labelTransAttr = labelTransKey ? ` data-trans="${labelTransKey}"` : "";
      const labelClass = labelTransKey ? " class=\"Resources\"" : "";
      
      const fieldBlock = `
        <div class="${colClass} mb-3 dynamicField radioLabelField" data-field-id="${fieldName}" data-field-type="${fieldType}"${oldValueAttr}>
          <label${labelTransAttr}${labelClass}>${escapeHtml(
        labelText
      )} (<span data-trans-previousvalue class="Resources"></span> <span class="oldValue">${oldValueDisplayHtml}</span>)</label>
          <div>${radioButtonsHtml}</div>
        </div>
      `;

      container.append(fieldBlock);
      changeResources();
      return;
    }

    if (fieldType === "lookup") {
      const source = meta.source || "";
      const dispFieldKey = meta.Dispfieldkey || "Name";
      const dispFieldKeyEn = meta.DispfieldkeyEn || dispFieldKey;
      const valFieldKey = meta.valfieldkey || "Title";
      
      // Create dropdown HTML
      const selectId = fieldName;
      const safeValue = escapeHtml(displayValue || "");
      const selectHtml = `<select id="${selectId}" class="form-control"><option value="" disabled selected></option></select>`;
      
      // Save original value (valfieldkey) in data attribute if available
      // Use lookupOriginalValue if it was set, otherwise use rawValue
      const originalValue = lookupOriginalValue || (rawValue && rawValue !== "" && rawValue !== "null" && rawValue !== "undefined" ? rawValue : "");
      const oldValueIdAttr = "";
      const lookupOldValueAttr = originalValue ? ` data-lookup-old-value="${escapeHtml(originalValue)}"` : "";
      const fieldBlock = `
        <div class="${colClass} mb-3 dynamicField" data-field-id="${fieldName}" data-field-type="${fieldType}" data-lookup-source="${escapeHtml(source)}" data-lookup-disp="${escapeHtml(dispFieldKey)}" data-lookup-disp-en="${escapeHtml(dispFieldKeyEn)}" data-lookup-val="${escapeHtml(valFieldKey)}"${oldValueIdAttr}${lookupOldValueAttr}>
          <label>${escapeHtml(
        labelText
      )} (<span data-trans-previousvalue class="Resources"></span> <span class="oldValue">${oldValueHtml}</span>)</label>
          ${selectHtml}
        </div>
      `;

      container.append(fieldBlock);
      
      // Load options from list
      if (source) {
        // Use alphabetical order by dispFieldKey
        const orderBy = dispFieldKey + " asc";
        loadListOptions(source, `#${selectId}`, dispFieldKey, dispFieldKeyEn, valFieldKey, "", orderBy);
        
        // Set selected value after options are loaded
        setTimeout(function() {
          const $select = $(`#${selectId}`);
          if ($select.length && safeValue) {
            $select.val(safeValue);
          }
        }, 1000);
      }
      
      return; // Exit early for lookup fields
    }

    // Only create input if not lookup and not dropdownValues and not yesnoradio (all were handled above)
    if (fieldType !== "lookup" && fieldType !== "dropdownvalues" && fieldType !== "yesnoradio") {
      const inputHtml = buildInputHtml(fieldName, fieldType, displayValue, false);

      // IMPORTANT: Add data-field-id attribute so handleChangeItemsAPI can find the field
      // For picker fields, also add data-old-value-id to store the original ID
      const oldValueIdAttr = (fieldType === "picker" && oldValueId) ? ` data-old-value-id="${escapeHtml(oldValueId)}"` : "";
      const fieldBlock = `
        <div class="${colClass} mb-3 dynamicField" data-field-id="${fieldName}" data-field-type="${fieldType}"${oldValueIdAttr}>
          <label>${escapeHtml(
        labelText
      )} (<span data-trans-previousvalue class="Resources"></span> <span class="oldValue">${oldValueHtml}</span>)</label>
          ${inputHtml}
        </div>
      `;

      container.append(fieldBlock);
    }
  });

  changeResources();

  // After all fields are appended, initialize People Pickers using interval (for New mode)
  let pickerInitAttempts = 0;
  const pickerInitInterval = setInterval(function () {
    pickerInitAttempts++;

    // Check if MyPeoplePicker is available
    if (typeof window.MyPeoplePicker === "undefined") {
      if (pickerInitAttempts >= 20) {
        clearInterval(pickerInitInterval);
      }
      return;
    }

    const $pickers = $("input.peoplePicker");
    const $container = $(".changeItemsRow");

    if ($pickers.length > 0) {
      clearInterval(pickerInitInterval);
      initPeoplePicker();
    } else if (pickerInitAttempts >= 20) {
      clearInterval(pickerInitInterval);
    }
  }, 500);

  // If in edit mode, ensure dynamic fields remain enabled
  if (window.isEdit) {
    $(
      ".changeItemsRow .dynamicField input, .changeItemsRow .dynamicField textarea, .changeItemsRow .dynamicField select"
    ).prop("disabled", false);
  }
}

// This function is kept for backward compatibility but is no longer used
// The logic is now directly in event handlers and callGetSectorAndSubSectorAPI
function tryFetchChangeDetails() {
  const changeItemCode = $("#ChangeItem").val();
  const approvalLevel = $("#ApprovalLevel").val();
  let itemCode = $("#ParentItemCode").val();
  if ($("#ChildItemCodeDiv").is(":visible") && $("#ChildItemCode").val())
    itemCode = $("#ChildItemCode").val();
  
  if (!changeItemCode || !approvalLevel || !itemCode) {
    $(".changeItemsRow").find(".dynamicField").remove();
    return;
  }
  
  var meta = getSelectedChangeItemMeta();
  if (meta.actionType === "add" || meta.actionType === "merge" || meta.actionType === "split" || meta.actionType === "delete") {
    setChangeItemsVisibility(false);
    $(".changeItemsRow").find(".dynamicField").remove();
    return;
  }
  
  fetchChangeItemDetails(changeItemCode, approvalLevel, itemCode);
}
// Helper function to handle IsActive check for new forms
function handleIsActiveCheck(result) {
  // Store IsActive value globally (API returns isActive with lowercase 'i')
  if (result && result.hasOwnProperty("isActive")) {
    window.currentIsActive = result.isActive !== false; // true if isActive is true or undefined, false if explicitly false
  }
  
  // Only check IsActive for new forms
  if (window.isNew && result && result.isActive === false) {
    // Show alert
    alert(
      localStorage.getItem("lng") == "en"
        ? "The item is not editable"
        : "العنصر غير قابل للتعديل"
    );
    // Disable submit button
    if ($("#CRSubmitButton").length) {
      $("#CRSubmitButton").prop("disabled", true);
    }
    return false; // Indicates item is not active
  } else {
    // Enable submit button if it was disabled
    if ($("#CRSubmitButton").length && window.isNew) {
      $("#CRSubmitButton").prop("disabled", false);
    }
    return true; // Indicates item is active
  }
}

function fetchChangeItemDetails(changeItemCode, approvalLevel, itemCode, classification) {
if (!changeItemCode || !approvalLevel || !itemCode) {
  $(".changeItemsRow").find(".dynamicField").remove();
  currentApprovalPath = "";
  currentSecurityGroupName = "";
  return;
}

// Clear dynamic fields before fetching new ones
$(".changeItemsRow").find(".dynamicField").remove();

  // Check actionType - if add, merge, split, or delete, hide dynamic section and don't call API
  var meta = getSelectedChangeItemMeta();
  if (meta.actionType === "add" || meta.actionType === "merge" || meta.actionType === "split" || meta.actionType === "delete") {
    setChangeItemsVisibility(false);
    $(".changeItemsRow").find(".dynamicField").remove();
    currentApprovalPath = "";
    currentSecurityGroupName = "";
    return;
  }

  // Build URL with classification parameter if it's MainKpi and classification is provided
  let url = `${APIURL}/general/getchangeitemsdetails/${encodeURIComponent(
    changeItemCode
  )}/${encodeURIComponent(approvalLevel)}/${encodeURIComponent(itemCode)}`;
  
  // Add classification parameter if it's MainKpi and classification is provided
  const parentType = $("#ParentItemType").val();
  if (parentType === "MainKpi" && classification) {
    url += `?classification=${encodeURIComponent(classification)}`;
  }

  $.ajax({
    url: url,
    method: "GET",
    headers: { Accept: "application/json" },
    success: function (res) {
      const result = res && res.result ? res.result : {};
      currentApprovalPath = result.approvalPath || "";
      currentSecurityGroupName = result.securityGroupName || "";

      // Check IsActive for new forms
      if (!handleIsActiveCheck(result)) {
        // Item is not active, don't proceed with rendering fields
        $(".changeItemsRow").find(".dynamicField").remove();
        currentApprovalPath = "";
        currentSecurityGroupName = "";
        return;
      }

      if (
        res &&
        res.isSuccess &&
        result &&
        result.columnsDetails &&
        result.columnsDetails.length
    ) {
      renderDynamicChangeFields(result.columnsDetails);
    } else {
      $(".changeItemsRow").find(".dynamicField").remove();
      currentApprovalPath = "";
      currentSecurityGroupName = "";
      // Show general alert if no fields to change
      alert(
        localStorage.getItem("lng") == "en"
          ? "There are no fields to change according to your choices. Please review the data!"
          : "ليس هناك حقول للتغيير وفقًا لخياراتك. يرجى مراجعة البيانات !"
      );
    }
  },
  error: function (xhr) {
    console.error("🟠 [fetchChangeItemDetails] Error:", xhr);
    $(".changeItemsRow").find(".dynamicField").remove();
    currentApprovalPath = "";
    currentSecurityGroupName = "";
    // Show general alert for all errors
    alert(
      localStorage.getItem("lng") == "en"
        ? "There are no fields to change according to your choices. Please review the data!"
        : "ليس هناك حقول للتغيير وفقًا لخياراتك. يرجى مراجعة البيانات !"
    );
  },
  });
}
function saveAllChangeRequestFields() {
  // Check actionType for New mode add action
  var meta = getSelectedChangeItemMeta();
  var actionType = (meta.actionType || "").toLowerCase();
  var isAddAction = actionType === "add";
  var isNewAddAction = window.isNew && actionType === "add";
  
  // Double-check required fields before proceeding (safety check)
  // Also check ChildItemCode if ChildItemType is selected (only if not add action)
  var childItemTypeVal = $("#ChildItemType").val();
  var childItemCodeVal = $("#ChildItemCode").val();
  var childItemCodeRequired =
    !isAddAction &&
    !isNewAddAction &&
    childItemTypeVal &&
    childItemTypeVal.trim() !== "" &&
    (!childItemCodeVal || childItemCodeVal.trim() === "");
  
  var validationErrors = [];
  if (!isAddAction && !isNewAddAction && (!$("#Sector").val() || $("#Sector").val().trim() === "")) validationErrors.push("Sector");
  if (!isAddAction && !isNewAddAction && (!$("#SubSector").val() || $("#SubSector").val().trim() === "")) validationErrors.push("SubSector");
  if (!$("#RelatedStrategy").val() || $("#RelatedStrategy").val().trim() === "") validationErrors.push("RelatedStrategy");
  if (!isAddAction && !isNewAddAction && (!$("#ParentItemType").val() || $("#ParentItemType").val().trim() === "")) validationErrors.push("ParentItemType");
  if (!isAddAction && !isNewAddAction && (!$("#ParentItemCode").val() || $("#ParentItemCode").val().trim() === "")) validationErrors.push("ParentItemCode");
  if (childItemCodeRequired) validationErrors.push("ChildItemCode");
  if (!$("#ChangeItem").val() || $("#ChangeItem").val().trim() === "") validationErrors.push("ChangeItem");
  if (!isNewAddAction && (!$("#ApprovalLevel").val() || $("#ApprovalLevel").val().trim() === "")) validationErrors.push("ApprovalLevel");
  if (!$("#ChangeDescription").val() || $("#ChangeDescription").val().trim() === "") validationErrors.push("ChangeDescription");
  if (!$("#ChangeJustification").val() || $("#ChangeJustification").val().trim() === "") validationErrors.push("ChangeJustification");
  if (!$("#ExpectedPositiveImpact").val() || $("#ExpectedPositiveImpact").val().trim() === "") validationErrors.push("ExpectedPositiveImpact");
  if (!$("#ImpactType").val() || $("#ImpactType").val().trim() === "") validationErrors.push("ImpactType");
  
  if (validationErrors.length > 0) {
    alert(
      localStorage.getItem("lng") == "en"
        ? "Please fill all required fields"
        : "يرجى ملء جميع الحقول المطلوبة"
    );
    return;
  }

  var clientContext = new SP.ClientContext.get_current();
  var oList = clientContext
    .get_web()
    .get_lists()
    .getByTitle("NewChangeRequests");
  if (isNew) {
    var oListItem = oList.addItem(new SP.ListItemCreationInformation());

    // Fields to save - exclude Parent/Child fields and Sector/SubSector if actionType is "add"
    var fieldsToSave = [
      "ChangeItem",
      "RelatedStrategy",
      "ChangeDescription",
      "ChangeJustification",
      "ExpectedPositiveImpact",
      "ImpactType",
    ];
    if (!isNewAddAction) {
      fieldsToSave.splice(1, 0, "ApprovalLevel");
    }
    
    // Only add Parent/Child fields and Sector/SubSector when not New add action
    if (!isAddAction && !isNewAddAction) {
      fieldsToSave.unshift("ParentItemType", "ParentItemCode", "ChildItemType", "ChildItemCode");
      fieldsToSave.splice(fieldsToSave.indexOf("RelatedStrategy"), 0, "Sector", "SubSector");
    }
    
    fieldsToSave.forEach((f) => {
      oListItem.set_item(f, $("#" + f).val() || "");
    });

    oListItem.set_item("ApprovalPath", currentApprovalPath || "");
    oListItem.set_item("SecurityGroupName", currentSecurityGroupName || "");

    // NOTE: People Picker fields (like InitiativeOwner) are dynamic fields
    // They should NOT be saved directly to NewChangeRequests list
    // They will be saved via handleChangeItemsAPI() which sends them to the API

    oListItem.update();
    clientContext.load(oListItem);
    var year = new Date().getFullYear().toString().slice(-2);

    clientContext.executeQueryAsync(
      function () {
        var newId = oListItem.get_id();
        window.crItemId = newId;
        var newCRCode = "NCR-" + year + "-" + newId.toString().padStart(4, "0");
        oListItem.set_item("Title", newCRCode);
        oListItem.update();

        clientContext.executeQueryAsync(
          function () {
            // Check actionType - if add, merge, split, or delete, skip API call
            var meta = getSelectedChangeItemMeta();
            var shouldCallAPI = !(meta.actionType === "add" || meta.actionType === "merge" || meta.actionType === "split" || meta.actionType === "delete");
            
            if (shouldCallAPI) {
              handleChangeItemsAPI(newCRCode)
                .then(function () {
                  return startChangeRequestWorkflow(newCRCode);
                })
                .then(function () {
                  // Upload attachments (if any) to SPM General Services/changerequests/<CRCODE>/
                  return uploadCRAttachments(newCRCode, window.crItemId);
                })
                .then(function () {
                  // Refresh attachments list (in case user stays on page)
                  setTimeout(loadCRExistingAttachments, 500);
                  alert(getLocalizedMessage("saveSuccess"));

                  // Check if ChangeItem has actiontype == "add" and redirect to New.aspx
                  if (window.isNew) {
                    if (meta.actionType === "add" && meta.listName) {
                      window.location.replace(
                        _spPageContextInfo.webAbsoluteUrl +
                        "/SitePages/New.aspx?ListKey=" +
                        meta.listName
                      );
                      return;
                    }
                  }

                  // Default redirect
                  window.location.replace(
                    _spPageContextInfo.webAbsoluteUrl +
                    "/SitePages/Listing.aspx?ListKey=changerequests"
                  );
                })
                .catch(function (err) {
                  alert(getLocalizedMessage("apiError"));
                });
            } else {
              // Skip handleChangeItemsAPI call, but still call workflow
              startChangeRequestWorkflow(newCRCode)
                .then(function () {
                  // Upload attachments (if any) to SPM General Services/changerequests/<CRCODE>/
                  return uploadCRAttachments(newCRCode, window.crItemId);
                })
                .then(function () {
                  // Refresh attachments list (in case user stays on page)
                  setTimeout(loadCRExistingAttachments, 500);
                  alert(getLocalizedMessage("saveSuccess"));

                  // Check if ChangeItem has actiontype == "add" and redirect to New.aspx
                  if (window.isNew) {
                    if (meta.actionType === "add" && meta.listName) {
                      window.location.replace(
                        _spPageContextInfo.webAbsoluteUrl +
                        "/SitePages/New.aspx?ListKey=" +
                        meta.listName
                      );
                      return;
                    }
                  }

                  // Default redirect
                  window.location.replace(
                    _spPageContextInfo.webAbsoluteUrl +
                    "/SitePages/Listing.aspx?ListKey=changerequests"
                  );
                })
                .catch(function (err) {
                  // Even if workflow fails, still upload attachments and redirect
                  uploadCRAttachments(newCRCode, window.crItemId)
                    .then(function () {
                      setTimeout(loadCRExistingAttachments, 500);
                      alert(getLocalizedMessage("saveSuccess"));

                      if (window.isNew) {
                        if (meta.actionType === "add" && meta.listName) {
                          window.location.replace(
                            _spPageContextInfo.webAbsoluteUrl +
                            "/SitePages/New.aspx?ListKey=" +
                            meta.listName
                          );
                          return;
                        }
                      }

                      window.location.replace(
                        _spPageContextInfo.webAbsoluteUrl +
                        "/SitePages/Listing.aspx?ListKey=changerequests"
                      );
                    });
                });
            }
          },
          function (sender, args) {
            alert("Error updating Title: " + args.get_message());
          }
        );
      },
      function (sender, args) {
        alert("Error creating item: " + args.get_message());
      }
    );
  } else {
    if (!crItemCode) {
      alert(getLocalizedMessage("noItemCode"));
      return;
    }

    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      `<View><Query><Where><Eq><FieldRef Name='Title'/><Value Type='Text'>${crItemCode}</Value></Eq></Where></Query></View>`
    );

    var items = oList.getItems(camlQuery);
    clientContext.load(items);

    clientContext.executeQueryAsync(
      function () {
        if (items.get_count() === 0) {
          alert(getLocalizedMessage("itemNotFoundByTitle"));
          return;
        }

        var oListItem = items.getItemAtIndex(0);
        try {
          window.crItemId = oListItem.get_id();
        } catch (e) {
          window.crItemId = 0;
        }

        [
          "ParentItemType",
          "ParentItemCode",
          "ChildItemType",
          "ChildItemCode",
          "ChangeItem",
          "ApprovalLevel",
          "Sector",
          "SubSector",
          "RelatedStrategy",
          "ChangeDescription",
          "ChangeJustification",
          "ExpectedPositiveImpact",
          "ImpactType",
        ].forEach((f) => {
          oListItem.set_item(f, $("#" + f).val() || "");
        });

        oListItem.set_item("ApprovalPath", currentApprovalPath || "");
        oListItem.set_item("SecurityGroupName", currentSecurityGroupName || "");

        // NOTE: People Picker fields (like InitiativeOwner) are dynamic fields
        // They should NOT be saved directly to NewChangeRequests list
        // They will be saved via handleChangeItemsAPI() which sends them to the API

        oListItem.update();
        clientContext.load(oListItem);

        clientContext.executeQueryAsync(
          function () {
            // Check actionType - if add, merge, split, or delete, skip handleChangeItemsAPI call
            var meta = getSelectedChangeItemMeta();
            var shouldCallAPI = !(meta.actionType === "add" || meta.actionType === "merge" || meta.actionType === "split" || meta.actionType === "delete");
            
            if (shouldCallAPI) {
              handleChangeItemsAPI(crItemCode)
                .then(function () {
                  // Upload attachments (if any) to SPM General Services/changerequests/<CRCODE>/
                  return uploadCRAttachments(crItemCode, window.crItemId);
                })
                .then(function () {
                  setTimeout(loadCRExistingAttachments, 500);
                  alert(getLocalizedMessage("editSuccess"));
                  window.location.replace(
                    _spPageContextInfo.webAbsoluteUrl +
                    "/SitePages/Listing.aspx?ListKey=changerequests"
                  );
                })
                .catch(function (err) {
                  alert(getLocalizedMessage("apiError"));
                });
            } else {
              // Skip handleChangeItemsAPI call, just upload attachments and redirect
              uploadCRAttachments(crItemCode, window.crItemId)
                .then(function () {
                  setTimeout(loadCRExistingAttachments, 500);
                  alert(getLocalizedMessage("editSuccess"));
                  window.location.replace(
                    _spPageContextInfo.webAbsoluteUrl +
                    "/SitePages/Listing.aspx?ListKey=changerequests"
                  );
                });
            }
          },
          function (sender, args) {
            alert("Error updating item: " + args.get_message());
          }
        );
      },
      function (sender, args) {
        alert("Error retrieving item: " + args.get_message());
      }
    );
  }
}
function handleChangeItemsAPI(crCode) {
  return new Promise(function (resolve, reject) {
    const changeItemCode = $("#ChangeItem").val() || "";
    const fields = [];
    const pickerPromises = [];

    const $dynamicFields = $(".changeItemsRow .dynamicField");

    // First, collect all fields and create promises for People Picker fields
    $dynamicFields.each(function (index) {
      const $field = $(this);

      // Get the correct InternalName from data-field-id attribute (not from input ID)
      const fieldInternalName = $field.attr("data-field-id") || "";

      if (!fieldInternalName) {
        return; // Skip if no InternalName found
      }

      // Check if this is a People Picker field
      const $ppField = $field.find(".PPField[type='picker']");

      if ($ppField.length) {
        // This is a People Picker field - need to get ID asynchronously
        const picker = $ppField.data("MyPeoplePicker");
        // For picker fields, Old Value should be ID, not Display Name
        // Try to get ID from data attribute first, otherwise try to convert Display Name to ID
        let oldValueId = $field.attr("data-old-value-id") || "";
        const oldValueDisplayName = $field.find(".oldValue").text() || "";

        // If we have Display Name but no ID, we need to lookup the ID
        // But for now, we'll store the Display Name and let the backend handle it
        // OR we can store it in a data attribute when we convert it
        if (!oldValueId && oldValueDisplayName) {
          // Try to get from stored data or use the display name as fallback
          // The backend should handle converting Display Name to ID if needed
          oldValueId = oldValueDisplayName; // Temporary - will be fixed
        }

        const fieldData = {
          fieldId: fieldInternalName, // Use InternalName, not input ID
          dataType: "picker",
          columnOldValue: oldValueId, // Use ID if available, otherwise Display Name
          $field: $field
        };

        if (picker && picker.getUsersID) {
          // Create a promise for this picker to get User ID
          const pickerPromise = new Promise(function (pickerResolve) {
            picker.getUsersID(function () {
              // getUsersID callback receives IDs as separate arguments, not as array
              // Convert arguments to array
              const userIds = Array.prototype.slice.call(arguments);

              let userId = "";

              // getUsersID returns user IDs as numbers (from user.get_id())
              if (userIds && userIds.length > 0) {
                // First argument is the user ID (number)
                const firstId = userIds[0];
                if (typeof firstId === "number") {
                  userId = firstId.toString();
                } else if (typeof firstId === "string") {
                  // If string, try to parse as number
                  const userIdNum = parseInt(firstId, 10);
                  if (!isNaN(userIdNum)) {
                    userId = userIdNum.toString();
                  }
                }
              }

              // If we still don't have userId, try fallback: get from hidden input and extract ID
              if (!userId) {
                // Try to get from hidden input value (contains JSON with user info)
                const hiddenInputId = $ppField.attr("id") + "_TopSpan_HiddenInput";
                const $hiddenInput = $("#" + hiddenInputId);
                if ($hiddenInput.length) {
                  const hiddenValue = $hiddenInput.val();
                  try {
                    const parsed = JSON.parse(hiddenValue);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                      // Extract Key from People Picker JSON and get user ID from it
                      const key = parsed[0].Key || "";
                      const displayText = parsed[0].DisplayText || "";

                      // Use Key to get user ID via SharePoint API
                      if (key) {
                        // Key format: "i:0#.w|domain\\user" or similar
                        // We need to use ensureUser to get the ID
                        var context = new SP.ClientContext.get_current();
                        var user = context.get_web().ensureUser(key);
                        context.load(user);
                        context.executeQueryAsync(
                          function () {
                            userId = user.get_id().toString();
                            fieldData.columnNewValue = userId;
                            pickerResolve(fieldData);
                          },
                          function (sender, args) {
                            // Final fallback: try stored userId
                            const storedUserId = $ppField.data("userId");
                            if (storedUserId) {
                              fieldData.columnNewValue = storedUserId.toString();
                            } else {
                              fieldData.columnNewValue = "";
                            }
                            pickerResolve(fieldData);
                          }
                        );
                        return; // Exit early, will resolve in executeQueryAsync callback
                      }
                    }
                  } catch (e) {
                    // Error parsing hidden input
                  }
                }

                // Final fallback: try stored userId from data attribute
                const storedUserId = $ppField.data("userId");
                if (storedUserId) {
                  userId = storedUserId.toString();
                }
              }

              fieldData.columnNewValue = userId;
              pickerResolve(fieldData);
            });
          });
          pickerPromises.push(pickerPromise);
        } else {
          // Fallback: try to get stored userId from data attribute
          const storedUserId = $ppField.data("userId");
          if (storedUserId) {
            fieldData.columnNewValue = storedUserId.toString();
          } else {
            fieldData.columnNewValue = "";
          }
          fields.push(fieldData);
        }
      } else {
        // Check if this is a lookup field
        const fieldType = $field.attr("data-field-type") || "";
        
        if (fieldType === "dropdownvalues") {
          // This is a dropdownValues field - get value from select
          const $select = $field.find("select");
          if ($select.length === 0) {
            return;
          }
          const selectValue = $select.val() || "";
          // IMPORTANT: Get original value (before translation) from data attribute, not from .oldValue text
          const oldValue = $field.attr("data-dropdown-old-value") || "";
          
          const fieldData = {
            fieldId: fieldInternalName,
            dataType: "dropdownValues",
            columnOldValue: oldValue, // This is the original value (choice.value), not translated text
            columnNewValue: selectValue
          };
          
          fields.push(fieldData);
        } else if (fieldType === "yesnoradio") {
          const $checkedRadio = $field.find('input[type="radio"]:checked');
          if ($checkedRadio.length === 0) {
            return;
          }
          const radioValue = $checkedRadio.val() || "";
          const oldValue = $field.attr("data-dropdown-old-value") || "";
          
          const fieldData = {
            fieldId: fieldInternalName,
            dataType: "yesnoradio",
            columnOldValue: oldValue,
            columnNewValue: radioValue
          };
          
          fields.push(fieldData);
        } else if (fieldType === "lookup") {
          const $select = $field.find("select");
          if ($select.length === 0) {
            return;
          }
          const selectValue = $select.val() || "";
          // IMPORTANT: Get original value (valfieldkey) from data attribute, not display text
          const oldValue = $field.attr("data-lookup-old-value") || "";
          
          const fieldData = {
            fieldId: fieldInternalName,
            dataType: "lookup",
            columnOldValue: oldValue, // This is the valfieldkey value, not display text
            columnNewValue: selectValue
          };
          
          fields.push(fieldData);
        } else {
          // Regular input/textarea/select
          const input = $field.find("input, textarea, select").not("[id$='_TopSpan_HiddenInput'], [id$='_HiddenInput']");

          if (input.length === 0) {
            return;
          }

          // Get the first input (in case there are multiple)
          const $firstInput = input.first();
          let inputValue = $firstInput.val() || "";
          const inputType = $firstInput.prop("type") || "text";
          const oldValue = $field.find(".oldValue").text() || "";

          // Convert date input (yyyy-mm-dd) to mm/dd/yyyy format for date, datetime, datetimetoparent
          if ((fieldType === "date" || fieldType === "datetime" || fieldType === "datetimetoparent") && inputType === "date" && inputValue) {
            try {
              // Input type="date" gives yyyy-mm-dd format
              const parts = inputValue.split("-");
              if (parts.length === 3) {
                const year = parts[0];
                const month = parts[1];
                const day = parts[2];
                inputValue = `${month}/${day}/${year}`;
              }
            } catch (e) {
              // If conversion fails, use original value
            }
          }

          const fieldData = {
            fieldId: fieldInternalName, // Use InternalName from data-field-id
            dataType: (fieldType === "date" || fieldType === "datetime" || fieldType === "datetimetoparent") ? fieldType : (inputType === "date" ? "date" : (inputType === "number" ? "number" : "string")),
            columnOldValue: oldValue,
            columnNewValue: inputValue
          };

          fields.push(fieldData);
        }
      }
    });

    // If no picker promises, resolve immediately with regular fields
    if (pickerPromises.length === 0) {
      const apiBody = fields.map(function (field) {
        return {
          columnInternalName: field.fieldId,
          dataType: field.dataType,
          columnOldValue: field.columnOldValue,
          columnNewValue: field.columnNewValue || ""
        };
      });

      if (apiBody.length === 0) {
        resolve({ success: true, message: "No dynamic fields to save" });
        return;
      }

      $.ajax({
        url: `${APIURL}/general/addnewchangerequestdetails/${crCode}/${changeItemCode}`,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(apiBody),
        success: function (res) {
          resolve(res);
        },
        error: function (xhr) {
          reject(xhr);
        },
      });
      return;
    }

    // Wait for all People Picker promises to resolve
    Promise.all(pickerPromises).then(function (pickerFields) {
      // Add picker fields to fields array
      fields.push.apply(fields, pickerFields);

      // Build API body
      const apiBody = fields.map(function (field) {
        // IMPORTANT: For picker fields, ensure we send ID, not JSON object
        if (field.dataType === "picker") {
          return {
            columnInternalName: field.fieldId,
            dataType: field.dataType,
            columnOldValue: field.columnOldValue || "",
            columnNewValue: field.columnNewValue || ""
          };
        } else {
          return {
            columnInternalName: field.fieldId,
            dataType: field.dataType,
            columnOldValue: field.columnOldValue,
            columnNewValue: field.columnNewValue || ""
          };
        }
      });

      // If no dynamic fields, skip API call and resolve immediately
      if (apiBody.length === 0) {
        resolve({ success: true, message: "No dynamic fields to save" });
        return;
      }

      $.ajax({
        url: `${APIURL}/general/addnewchangerequestdetails/${crCode}/${changeItemCode}`,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(apiBody),
        success: function (res) {
          resolve(res);
        },
        error: function (xhr) {
          reject(xhr);
        },
      });
    }).catch(function (error) {
      reject(error);
    });
  });
}

function startChangeRequestWorkflow(crCode) {
  return new Promise(function (resolve, reject) {
    if (!crCode) {
      reject(new Error("Missing CR code for workflow"));
      return;
    }

    $.ajax({
      url: `${APIURL}/general/startchangerequestworkflow/${crCode}`,
      method: "GET",
      headers: { Accept: "application/json" },
      success: function (res) {
        if (res && res.isSuccess) {
          resolve(res);
        } else {
          reject(res || { message: "Workflow start failed" });
        }
      },
      error: function (xhr) {
        reject(xhr);
      },
    });
  });
}

function initPeoplePicker() {
  // Check if MyPeoplePicker is available
  if (typeof window.MyPeoplePicker === "undefined") {
    return;
  }

  // Look for input.peoplePicker elements (these are placeholders that need to be replaced with PPField divs)
  const $allPickerInputs = $("input.peoplePicker");

  $allPickerInputs.each(function () {
    const $input = $(this);
    const inputId = this.id;
    const userId = $input.attr("data-user-id") || $input.val() || "";
    // In New mode, People Picker should be enabled (not disabled)
    // Only disable in View mode (not Edit and not New)
    const isDisabled = window.isView === true && window.isEdit !== true;

    if (!inputId) {
      return;
    }

    // Check if already replaced with PPField div
    const $existingPPDiv = $input.closest(".dynamicField").find("div[type='picker']");
    if ($existingPPDiv.length > 0 && $existingPPDiv.data("MyPeoplePicker")) {
      return;
    }

    // Replace input with PPField div (like Form_Render.js does)
    const $ppDiv = $('<div class="PPField SPIField form-control" type="picker" id="' + inputId + '" INppicker="' + inputId + '" value="" placeholder=""></div>');
    $input.replaceWith($ppDiv);

    // Initialize People Picker (like Form_Request.js does)
    try {
      var picker = new window.MyPeoplePicker();
      picker.init(inputId, {
        PrincipalAccountType: "User",
        AllowMultipleValues: false
      });

      // Store picker instance
      $ppDiv.data("MyPeoplePicker", picker);
      $ppDiv.data("userId", userId);

      // Wait for People Picker to render, then set the value if we have a user ID
      if (userId) {
        setTimeout(function () {
          setPeoplePickerValue(inputId, userId, picker, $ppDiv);
        }, 1000); // Wait 1000ms for People Picker to fully initialize
      }

      // Add event handler to save User ID when user is selected/changed (for New mode)
      // This ensures that when user selects a new user, the ID is saved
      setTimeout(function () {
        try {
          // Listen for user resolution events
          var topSpan = $("#" + inputId + "_TopSpan");
          if (topSpan.length && topSpan[0].SPClientPeoplePicker) {
            // Use SPClientPeoplePicker events to detect when user is selected
            var originalProcessUser = topSpan[0].SPClientPeoplePicker.ProcessUser;
            if (originalProcessUser) {
              topSpan[0].SPClientPeoplePicker.ProcessUser = function (user) {
                // Call original function
                var result = originalProcessUser.call(this, user);

                // After user is processed, get the ID and save it
                if (picker && picker.getUsersID) {
                  picker.getUsersID(function () {
                    // getUsersID returns IDs as separate arguments
                    const userIds = Array.prototype.slice.call(arguments);

                    var selectedUserId = "";
                    if (userIds && userIds.length > 0) {
                      const firstId = userIds[0];
                      if (typeof firstId === "number") {
                        selectedUserId = firstId.toString();
                      } else if (typeof firstId === "string") {
                        const userIdNum = parseInt(firstId, 10);
                        if (!isNaN(userIdNum)) {
                          selectedUserId = userIdNum.toString();
                        }
                      }
                    }

                    // Save the ID
                    if (selectedUserId) {
                      $ppDiv.data("userId", selectedUserId);
                    }
                  });
                }

                return result;
              };
            }
          }

          // Also listen for changes in the resolved list
          var resolvedList = $("#" + inputId + "_TopSpan_ResolvedList");
          if (resolvedList.length) {
            // Use MutationObserver to detect when user is added/removed
            var observer = new MutationObserver(function (mutations) {
              // When user is added or removed, get the ID
              if (picker && picker.getUsersID) {
                picker.getUsersID(function () {
                  // getUsersID returns IDs as separate arguments
                  const userIds = Array.prototype.slice.call(arguments);

                  var selectedUserId = "";
                  if (userIds && userIds.length > 0) {
                    const firstId = userIds[0];
                    if (typeof firstId === "number") {
                      selectedUserId = firstId.toString();
                    } else if (typeof firstId === "string") {
                      const userIdNum = parseInt(firstId, 10);
                      if (!isNaN(userIdNum)) {
                        selectedUserId = userIdNum.toString();
                      }
                    }
                  } else {
                    // User was removed
                    $ppDiv.data("userId", "");
                    return;
                  }

                  // Save the ID
                  if (selectedUserId) {
                    $ppDiv.data("userId", selectedUserId);
                  }
                });
              }
            });

            observer.observe(resolvedList[0], {
              childList: true,
              subtree: true
            });
          }
        } catch (e) {
        }
      }, 1500); // Wait a bit longer for People Picker to fully initialize

      // If disabled (View mode only), disable People Picker after it renders
      if (isDisabled) {
        setTimeout(function () {
          $ppDiv.find(".sp-peoplepicker-topLevel").css({
            "pointer-events": "none",
            opacity: "0.6",
          });
          $ppDiv.find(".sp-peoplepicker-editorInput").prop("disabled", true);
        }, 1000);
      } else {
        // In New/Edit mode, ensure People Picker is enabled
        setTimeout(function () {
          $ppDiv.find(".sp-peoplepicker-topLevel").css({
            "pointer-events": "auto",
            opacity: "1",
          });
          $ppDiv.find(".sp-peoplepicker-editorInput").prop("disabled", false);
        }, 1000);
      }
    } catch (e) {
    }
  });
}

// Function to get user by ID and set it in People Picker
function setPeoplePickerValue(pickerId, userId, picker, $ppDiv) {
  var userIdNum = parseInt(userId, 10);
  if (isNaN(userIdNum)) {
    return;
  }

  // Get user info from SharePoint by ID
  $.ajax({
    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetUserById(" + userIdNum + ")",
    method: "GET",
    headers: { Accept: "application/json; odata=verbose" },
    success: function (userData) {
      var userTitle = userData.d.Title || userData.d.LoginName || "";
      var userEmail = userData.d.Email || "";
      var userLoginName = userData.d.LoginName || "";

      if (userTitle && picker) {
        // Try multiple methods to add user to People Picker
        var userAdded = false;

        // Method 1: Try addUser with Title
        if (typeof picker.addUser === "function") {
          try {
            picker.addUser(userTitle);
            userAdded = true;
          } catch (e) {
          }
        }

        // Method 2: Try addUser with LoginName
        if (!userAdded && typeof picker.addUser === "function" && userLoginName) {
          try {
            picker.addUser(userLoginName);
            userAdded = true;
          } catch (e) {
          }
        }

        // Method 3: Try setting value directly in the input
        if (!userAdded) {
          try {
            var $editorInput = $("#" + pickerId + "_TopSpan_EditorInput");
            var $initialHelpText = $("#" + pickerId + "_TopSpan_InitialHelpText");
            if ($editorInput.length && $initialHelpText.length) {
              $editorInput.val(userTitle);
              $initialHelpText.text(userTitle).hide();
              $editorInput.show();
              userAdded = true;
            }
          } catch (e) {
          }
        }

        // Method 4: Try using SPClientPeoplePicker API directly
        if (!userAdded) {
          try {
            var schema = {};
            schema['PrincipalType'] = 'User';
            schema['DisplayName'] = userTitle;
            schema['Email'] = userEmail || userLoginName;
            schema['Title'] = userTitle;
            schema['IsResolved'] = true;
            schema['EntityType'] = 'User';
            schema['Description'] = userTitle;
            schema['Key'] = userLoginName || userEmail || userTitle;

            var topSpan = $("#" + pickerId + "_TopSpan");
            if (topSpan.length && topSpan[0].SPClientPeoplePicker) {
              topSpan[0].SPClientPeoplePicker.AddUserKeys(userLoginName || userEmail || userTitle);
              userAdded = true;
            }
          } catch (e) {
          }
        }

        // Always save the userId in data attribute, even if user wasn't added visually
        // This ensures we can retrieve the ID when submitting
        $ppDiv.data("userId", userIdNum.toString());
        if (userAdded) {
          $ppDiv.attr("data-email", userTitle);
        }
      }
    },
    error: function (err) { }
  });
}
function loadExistingChangeDetails(crCode) {
  if (!crCode) return;

  const url =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('NewChangeRequestDetails')/items?" +
    `$filter=DeletionStatus ne 'Deleted' and NewChangeRequestCode eq '${crCode}'`;

  $.ajax({
    url: url,
    method: "GET",
    headers: { Accept: "application/json; odata=verbose" },
    success: function (data) {
      const results = data.d.results;

      if (!results.length) return;

      const $row = $(".changeItemsRow");
      const $sep = $(".downseperator");

      $row.show();
      $sep.show();

      results.forEach(function (item) {
        const internal = item.ColumnInternalName;
        const oldVal = item.ColumnOldValue ? item.ColumnOldValue : "";
        const newVal = item.ColumnNewValue ? item.ColumnNewValue : "";
        const dataType = item.DataType ? item.DataType.toLowerCase() : "string";

        let html = `
          <div class="col-md-6 dynamicField">
            <label>${internal}</label>
            <input type="text" class="form-control prevValue" value="${oldVal}" readonly>
            <input type="text" class="form-control mt-2 newValue" data-field="${internal}" value="${newVal}">
          </div>
        `;

        $row.append(html);
      });
    },
    error: function (err) { },
  });
}

function initViewMode(code) {
  var ctx = new SP.ClientContext.get_current();
  var list = ctx.get_web().get_lists().getByTitle("NewChangeRequests");
  var camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(
    "<View><Query><Where>" +
    "<And>" +
    "<Eq><FieldRef Name='Title'/><Value Type='Text'>" +
    code +
    "</Value></Eq>" +
    "<Neq><FieldRef Name='DeletionStatus'/><Value Type='Text'>Deleted</Value></Neq>" +
    "</And>" +
    "</Where></Query></View>"
  );

  var items = list.getItems(camlQuery);
  ctx.load(items);
  ctx.executeQueryAsync(
    function () {
      var enumerator = items.getEnumerator();
      if (enumerator.moveNext()) {
        var mainItem = enumerator.get_current();
        try {
          window.crItemId = mainItem.get_id();
        } catch (e) { }
        fillViewFields(mainItem, code);
        setTimeout(loadCRExistingAttachments, 300);
      } else {
        alert(getLocalizedMessage("itemNotFound"));
      }
    },
    function (sender, args) {
    }
  );
}

// Helper function to wait for select options to be loaded
function waitForSelectOptions(selectId, maxWait = 5000) {
  return new Promise((resolve) => {
    const $select = $(selectId);
    const startTime = Date.now();
    
    const checkOptions = () => {
      // Check if select has options (more than just empty option)
      const hasOptions = $select.find('option').length > 1;
      const elapsed = Date.now() - startTime;
      
      if (hasOptions || elapsed >= maxWait) {
        resolve();
      } else {
        setTimeout(checkOptions, 100);
      }
    };
    
    checkOptions();
  });
}

// Helper function to load options without setting values
function loadOptionsOnly(listName, selectId, dispFieldKey, dispFieldKeyEn, valFieldKey, filter = "", orderBy = "") {
  return new Promise((resolve) => {
    const lang = localStorage.getItem("lng");
    let query =
      _spPageContextInfo.webAbsoluteUrl +
      `/_api/web/lists/getbytitle('${listName}')/items?$top=5000&$filter=DeletionStatus ne 'Deleted'`;
    if (filter) query += ` and ${filter}`;
    if (orderBy) query += `&$orderby=${orderBy}`;
    if (listName === "MainKpi") {
      query += `&$select=Title,Name,Types,${dispFieldKey}`;
    }

    $.ajax({
      url: query,
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (data) {
        const $select = $(selectId);
        $select.empty().append(`<option value=""></option>`);
        data.d.results.forEach((item) => {
          let text = "";
          if (listName === "MainKpi" || listName === "Projects" || listName === "Initiatives" || listName === "SOs") {
            text = item[dispFieldKey] || "";
          } else {
            text = lang == null || lang == "ar"
              ? item[dispFieldKey]
              : item[dispFieldKeyEn];
          }
          const val = item[valFieldKey] ? item[valFieldKey] : "";
          
          let optionHtml = `<option value="${val}">${text}</option>`;
          if (listName === "MainKpi" && item.Types) {
            const kpiType = item.Types || "";
            optionHtml = `<option value="${val}" data-kpitype="${kpiType}">${text}</option>`;
          }
          $select.append(optionHtml);
        });
        resolve();
      },
      error: function (err) {
        resolve(); // Resolve anyway to continue
      }
    });
  });
}

// Helper function to load ParentItems options
function loadParentItemsOptionsOnly(listName, selectId) {
  return new Promise((resolve) => {
    var currentRole = window.currentUserRole || "";

    if (needsParentItemsSecurityFilter(currentRole, listName) && !LoggedInUserId) {
      getLoggedInUser()
        .then(function () {
          loadParentItemsOptionsOnly(listName, selectId).then(resolve);
        })
        .catch(function (err) {
          loadOptionsOnly(listName, selectId, "Name", "Name", "Title", "", "Name asc").then(resolve);
        });
      return;
    }

    resolveParentItemsFilter(listName).then(function (filter) {
      loadOptionsOnly(listName, selectId, "Name", "Name", "Title", filter, "Name asc").then(resolve);
    });
  });
}

// Helper function to load ChildItems options
function loadChildItemsOptionsOnly(listName, parentTitle, parentType) {
  return new Promise((resolve) => {
    if (!parentTitle || !parentType) {
      resolve();
      return;
    }
    
    let filter =
      parentType === "Initiatives"
        ? `InitiativeCode eq '${parentTitle}'`
        : `ProjectCode eq '${parentTitle}'`;

    loadOptionsOnly(listName, "#ChildItemCode", "Name", "Name", "Title", filter).then(resolve);
  });
}

// Helper function to load ChangeItems options
function loadChangeItemsOptionsOnly(listName, parentType = "", childType = "") {
  return new Promise((resolve) => {
    const $changeItem = $("#ChangeItem");
    $changeItem.empty().append('<option data-trans-changeitem class="Resources" value=""></option>');
    
    if (!listName) {
      resolve();
      return;
    }

    let filter = "";
    if (childType) filter = `ListName eq '${childType}'`;
    else if (parentType) filter = `ListName eq '${parentType}'`;
    else filter = `ListName eq '${listName}'`;

    const url =
      _spPageContextInfo.webAbsoluteUrl +
      `/_api/web/lists/getbytitle('ChangeItems')/items?$filter=${filter} and DeletionStatus ne 'Deleted'&$orderby=ID`;

    $.ajax({
      url: url,
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (data) {
        data.d.results.forEach((item) => {
          $changeItem.append(
            `<option value="${item.Title}" data-name="${item.ItemName}" data-column="${item.ColumnInternalName}" data-actiontype="${item.ActionType}" data-listname="${item.ListName}" data-updatetype="${item.UpdateType}">${item.ItemName}</option>`
          );
        });
        resolve();
      },
      error: function (err) {
        resolve();
      }
    });
  });
}

function fillViewFields(item, code) {
  try {
    window.crItemId = item.get_id();
  } catch (e) { }
  
  // Set flag to prevent automatic dynamic fields loading during initial data load
  if (window.isEdit || window.isView) {
    window.isLoadingChangeRequestData = true;
    window.pendingChangeItemColumnInternalName = undefined;
  }
  
  // Extract all field values from item
  const sector = item.get_item("Sector");
  const subSector = item.get_item("SubSector");
  const relatedStrategy = item.get_item("RelatedStrategy");
  const parentType = item.get_item("ParentItemType");
  const parentCode = item.get_item("ParentItemCode");
  const childType = item.get_item("ChildItemType");
  const childCode = item.get_item("ChildItemCode");
  const changeItem = item.get_item("ChangeItem");
  const observations = item.get_item("Observations");
  currentApprovalPath = item.get_item("ApprovalPath") || "";
  currentSecurityGroupName = item.get_item("SecurityGroupName") || "";

  // Set simple field values immediately (textareas and simple selects)
  [
    "ChangeDescription",
    "ChangeJustification",
    "ExpectedPositiveImpact",
    "ImpactType",
  ].forEach((f) => {
    var val = item.get_item(f);
    if (val) $("#" + f).val(val);
  });
  
  // Set Observations value
  if (observations) {
    $("#Observations").val(observations);
  }

  // Set ApprovalLevel
  var approvalLevelVal = item.get_item("ApprovalLevel");
  if (approvalLevelVal) {
    setSelectValue("#ApprovalLevel", approvalLevelVal);
  }

  // Set WFStage value and show field in edit/view modes
  if (window.isEdit || window.isView) {
    var wfStageVal = item.get_item("WFStage");
    if (wfStageVal) {
      var stagesConfig = localStorage.getItem("Dynamo_GenericWFStagesConfig");
      var translatedStage = wfStageVal;
      
      if (stagesConfig) {
        try {
          var stagesArray = JSON.parse(stagesConfig);
          var lang = localStorage.getItem("lng");
          var foundStage = stagesArray.find(function(stage) {
            return stage.code === wfStageVal;
          });
          
          if (foundStage) {
            translatedStage = (lang === "en" && foundStage.nameEn) ? foundStage.nameEn : foundStage.name;
          }
        } catch (e) {
        }
      }
      
      $("#WFStage").val(translatedStage);
    }
    $("#WFStageDiv").show();
  }

  // STEP 1: Load all options first (without setting values)
  (async function() {
    try {
      // Load Sector options
      await loadOptionsOnly("Internal Entities", "#Sector", "Name", "NameEn", "Title", "EntityType eq 'Sector'", "Created");
      
      // Set Sector value and load SubSector options
      if (sector) {
        setSelectValue("#Sector", sector);
        if (sector) {
          await loadOptionsOnly("Internal Entities", "#SubSector", "Name", "NameEn", "Title", `EntityType eq 'Department' and ParentEntity eq '${sector}'`, "Created");
        }
      } else {
        $("#SubSector").empty().append(`<option value=""></option>`);
      }
      
      // Set SubSector value
      if (subSector) {
        setSelectValue("#SubSector", subSector);
      }
      
      // Load Strategy options
      await loadOptionsOnly("GoalStrategy", "#RelatedStrategy", "Name", "NameEn", "Title", "Types eq 'ministry'", "Created");
      
      // Set RelatedStrategy value
      if (relatedStrategy) {
        setSelectValue("#RelatedStrategy", relatedStrategy);
      } else if (window.isNew) {
        // Select the first non-empty option in new mode
        const $select = $("#RelatedStrategy");
        const firstOption = $select.find("option:not([value='']):first");
        if (firstOption.length > 0) {
          $select.val(firstOption.val());
        }
      }
      
      // Disable RelatedStrategy field in new and edit modes
      if (window.isNew || window.isEdit) {
        $("#RelatedStrategy").prop("disabled", true);
      }
      
      // Set ParentItemType value
      if (parentType) {
        setSelectValue("#ParentItemType", parentType);
        
        // Classification div is commented out - no longer needed
        // Show Types field if ParentItemType is MainKpi
        // if (parentType === "MainKpi") {
        //   $("#ClassificationDiv").show();
        // }
        
        // Load ParentItemCode options
        await loadParentItemsOptionsOnly(parentType, "#ParentItemCode");
        
        // Set ParentItemCode value
        if (parentCode) {
          setSelectValue("#ParentItemCode", parentCode);
        }
        
        // Handle ChildItemType and ChildItemCode for Initiatives/Projects
        if (parentType == "Initiatives" || parentType == "Projects") {
          // Populate ChildItemType options (without triggering change events)
          const childSelect = $("#ChildItemType");
          childSelect.empty().append('<option value="" data-trans-childitemtype class="Resources"></option>');
          
          if (parentType === "Initiatives") {
            ["InitiativeMilestones", "InitiativeDeliverables", "Benefits"].forEach((c) =>
              childSelect.append(`<option value="${c}" class="Resources" data-trans-${c.toLowerCase()}>${c}</option>`)
            );
          } else if (parentType === "Projects") {
            ["Deliverables", "Milestones"].forEach((c) =>
              childSelect.append(`<option value="${c}" class="Resources" data-trans-${c.toLowerCase()}>${c}</option>`)
            );
          }
          
          $("#ChildItemTypeDiv, #ChildItemCodeDiv").show();
          
          // Set ChildItemType value and load ChildItemCode options
          if (childType) {
            setSelectValue("#ChildItemType", childType);
            await loadChildItemsOptionsOnly(childType, parentCode, parentType);
            
            // Set ChildItemCode value
            if (childCode) {
              setSelectValue("#ChildItemCode", childCode);
            }
            
            // Load ChangeItems options
            await loadChangeItemsOptionsOnly(childType, parentType, childType);
          } else {
            // No child type, load change items directly
            await loadChangeItemsOptionsOnly(parentCode, parentType);
          }
        } else {
          // Not Initiatives/Projects, load change items directly
          await loadChangeItemsOptionsOnly(parentCode, parentType);
        }
        
        // Load ChangeItem value (if exists)
        if (changeItem) {
          await loadChangeItemsForView(changeItem, code);
        }
      } else {
        // Add requests may not have parent fields; still load ChangeItem option/value.
        if (changeItem) {
          await loadChangeItemsForView(changeItem, code);
        }
      }
      
      // STEP 2: All options loaded, now translate and load dynamic fields
      // Translate all elements
      changeResources();
      
      // Handle Parent/Child fields visibility based on actionType
      handleParentChildFieldsVisibility();
      
      // Toggle edit/view mode
      if (window.isEdit && window.isWF) {
        // In workflow edit mode, behave like view mode but show Observations field
        toggleFormEditable(false);
        var currentTaskID = taskID || taskId || window.taskID || window.taskid;
        if ($("#CRWorkflowButton").length) {
          $("#CRWorkflowButton").css("display", "inline-block");
        }
        // Check if this is the last stage (stageIDApprove == "approved") to show Observations
        checkAndShowObservationsSection();
      } else if (window.isEdit) {
        toggleEditModeFields();
      } else if (window.isWF) {
        toggleFormEditable(false);
        var currentTaskID = taskID || taskId || window.taskID || window.taskid;
        if ($("#CRWorkflowButton").length) {
          $("#CRWorkflowButton").css("display", "inline-block");
        }
        // Check if this is the last stage (stageIDApprove == "approved") to show Observations
        checkAndShowObservationsSection();
      } else {
        toggleFormEditable(false);
      }
      
      // Show Observations section in view mode
      if (window.isView) {
        $("#CRObservationsBlock").show();
      }
      
      // STEP 3: Load dynamic fields once after all data is loaded
      if ((window.isEdit || window.isView) && window.isLoadingChangeRequestData) {
        const changeItemCode = $("#ChangeItem").val();
        
        if (changeItemCode && window.pendingChangeItemColumnInternalName !== undefined) {
          // Load dynamic fields once with the stored changeItemColumnInternalName
          setTimeout(function () {
            loadNewChangeRequestDetails(code, window.pendingChangeItemColumnInternalName);
            window.isLoadingChangeRequestData = false;
            window.pendingChangeItemColumnInternalName = undefined;
          }, 300);
        } else {
          // Reset flag even if no changeItem
          window.isLoadingChangeRequestData = false;
          window.pendingChangeItemColumnInternalName = undefined;
        }
      }
    } catch (error) {
      window.isLoadingChangeRequestData = false;
      window.pendingChangeItemColumnInternalName = undefined;
    }
  })();
}

function loadChangeItemsForView(changeItemCode, newCRCode) {
  return new Promise((resolve) => {
    if (!changeItemCode) {
      resolve();
      return;
    }
    
    const $changeItem = $("#ChangeItem");
    // Don't empty if options are already loaded (during initial data load)
    if (!window.isLoadingChangeRequestData || $changeItem.find('option').length <= 1) {
      $changeItem.empty().append('<option data-trans-changeitem class="Resources" value=""></option>');
    }

    $.ajax({
      url:
        _spPageContextInfo.webAbsoluteUrl +
        `/_api/web/lists/getbytitle('ChangeItems')/items?$filter=Title eq '${changeItemCode}'`,
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (data) {
        let changeItemColumnInternalName = null;
        let optionExists = false;
        
        // Check if option already exists
        const existingOption = $changeItem.find(`option[value="${changeItemCode}"]`);
        if (existingOption.length > 0) {
          optionExists = true;
        }
        
        // Only append if option doesn't exist
        if (!optionExists) {
          data.d.results.forEach((item) => {
            $changeItem.append(
              `<option value="${item.Title}" data-name="${item.ItemName}" data-column="${item.ColumnInternalName}" data-actiontype="${item.ActionType}" data-listname="${item.ListName}" data-updatetype="${item.UpdateType}">${item.ItemName}</option>`
            );
            if (item.ColumnInternalName) {
              changeItemColumnInternalName = item.ColumnInternalName;
            }
          });
        } else {
          // Get ColumnInternalName from existing option or data
          data.d.results.forEach((item) => {
            if (item.ColumnInternalName) {
              changeItemColumnInternalName = item.ColumnInternalName;
            }
          });
        }
        
        setSelectValue("#ChangeItem", changeItemCode);

        // In edit/view mode, don't load dynamic fields automatically during initial data load
        // They will be loaded once after all data is loaded
        if (!window.isLoadingChangeRequestData) {
          setTimeout(function () {
            loadNewChangeRequestDetails(newCRCode, changeItemColumnInternalName);
            resolve();
          }, 300);
        } else {
          // Store changeItemColumnInternalName for later use
          window.pendingChangeItemColumnInternalName = changeItemColumnInternalName;
          resolve();
        }
      },
      error: function (err) {
        resolve();
      }
    });
  });
}

function loadNewChangeRequestDetails(code, changeItemColumnInternalName) {
  if (!code) {
    return;
  }

  // Check if dynamic fields are already loaded (to prevent reloading)
  const dynamicFieldsExist = $(".changeItemsRow .dynamicField").length > 0;
  if (dynamicFieldsExist && (window.isEdit || window.isView)) {
    return; // Don't reload if fields already exist in edit/view mode
  }

  // Handle Parent/Child fields visibility based on actionType
  handleParentChildFieldsVisibility();

  // Get required values from form
  const changeItemCode = $("#ChangeItem").val();
  const approvalLevel = $("#ApprovalLevel").val();
  let itemCode = $("#ParentItemCode").val();
  if ($("#ChildItemCodeDiv").is(":visible") && $("#ChildItemCode").val()) {
    itemCode = $("#ChildItemCode").val();
  }

  // Parse ColumnInternalName from ChangeItems to get DisplayName map
  let displayNameMapFromChangeItems = {};
  if (changeItemColumnInternalName) {
    try {
      // ColumnInternalName is a JSON string array, but may have invalid JSON (type without quotes, trailing comma)
      // Fix JSON by adding quotes around the "type" property and removing trailing comma
      let fixedJson = changeItemColumnInternalName
        .replace(/type:\s*"([^"]+)"/g, '"type": "$1"')
        .replace(/,(\s*})/g, "$1"); // Remove trailing comma before closing brace

      // ColumnInternalName is a JSON string array
      const columnArray = JSON.parse(fixedJson);
      if (Array.isArray(columnArray)) {
        columnArray.forEach((col) => {
          if (col.InternalName) {
            displayNameMapFromChangeItems[col.InternalName] = {
              DisplayName: col.DisplayName || "",
              DisplayNameEn: col.DisplayNameEn || "",
            };
          }
        });
      }
    } catch (e) {
      // Try alternative parsing: extract DisplayName and DisplayNameEn using regex
      try {
        const internalNameMatch = changeItemColumnInternalName.match(
          /"InternalName"\s*:\s*"([^"]+)"/
        );
        const displayNameMatch = changeItemColumnInternalName.match(
          /"DisplayName"\s*:\s*"([^"]+)"/
        );
        const displayNameEnMatch = changeItemColumnInternalName.match(
          /"DisplayNameEn"\s*:\s*"([^"]+)"/
        );

        if (internalNameMatch && (displayNameMatch || displayNameEnMatch)) {
          const internalName = internalNameMatch[1];
          displayNameMapFromChangeItems[internalName] = {
            DisplayName: displayNameMatch ? displayNameMatch[1] : "",
            DisplayNameEn: displayNameEnMatch ? displayNameEnMatch[1] : "",
          };
        }
      } catch (regexError) {
        // Silent fail - will use fallback
      }
    }
  }

  // First, load data from SharePoint list
  const url =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('NewChangeRequestDetails')/items?$filter=NewChangeRequestCode eq '" +
    code +
    "' and DeletionStatus ne 'Deleted'&$orderby=ID";
  $.ajax({
    url: url,
    method: "GET",
    headers: { Accept: "application/json; odata=verbose" },
    success: function (data) {
      // Check actionType - if add, merge, split, or delete, hide dynamic section and don't render fields
      var meta = getSelectedChangeItemMeta();
      if (meta.actionType === "add" || meta.actionType === "merge" || meta.actionType === "split" || meta.actionType === "delete") {
        setChangeItemsVisibility(false);
        return;
      }
      
      if (data.d && data.d.results && data.d.results.length > 0) {
        // If we have changeItemCode, approvalLevel, and itemCode, call API to get DisplayNames
        // But skip API call if actionType is add, merge, split, or delete
        if (changeItemCode && approvalLevel && itemCode) {
          // Check actionType - if add, merge, split, or delete, don't call API
          var meta = getSelectedChangeItemMeta();
          if (meta.actionType === "add" || meta.actionType === "merge" || meta.actionType === "split" || meta.actionType === "delete") {
            // Don't call API, just render fields directly without API
            renderViewDynamicFields(
              data.d.results,
              null,
              displayNameMapFromChangeItems
            );
            if (window.isEdit && !window.isLoadingChangeRequestData) {
              setTimeout(function () {
                initializeEditMode(changeItemCode);
              }, 500);
            }
            return;
          }
          
          // Build URL with classification parameter if it's MainKpi
          let apiUrl = `${APIURL}/general/getchangeitemsdetails/${encodeURIComponent(
            changeItemCode
          )}/${encodeURIComponent(approvalLevel)}/${encodeURIComponent(
            itemCode
          )}`;
          
          const parentType = $("#ParentItemType").val();
          const classification = (parentType === "MainKpi" && $("#Classification").val()) ? $("#Classification").val() : null;
          if (parentType === "MainKpi" && classification) {
            apiUrl += `?classification=${encodeURIComponent(classification)}`;
          }

          $.ajax({
            url: apiUrl,
            method: "GET",
            headers: { Accept: "application/json" },
            success: function (apiRes) {
              const result = apiRes && apiRes.result ? apiRes.result : {};
              
              // Check IsActive for new forms
              if (!handleIsActiveCheck(result)) {
                // Item is not active, don't proceed with rendering fields
                return;
              }

              renderViewDynamicFields(
                data.d.results,
                apiRes,
                displayNameMapFromChangeItems
              );
              // If in edit mode, initialize edit mode after fields are rendered
              // But only if not still loading initial data
              if (window.isEdit && !window.isLoadingChangeRequestData) {
                setTimeout(function () {
                  initializeEditMode(changeItemCode);
                }, 500);
              }
            },
            error: function (xhr) {
              // Render with ChangeItems DisplayName map (fallback)
              renderViewDynamicFields(
                data.d.results,
                null,
                displayNameMapFromChangeItems
              );
              // If in edit mode, initialize edit mode after fields are rendered
              // But only if not still loading initial data
              if (window.isEdit && !window.isLoadingChangeRequestData) {
                setTimeout(function () {
                  initializeEditMode(changeItemCode);
                }, 500);
              }
            },
          });
        } else {
          // Render with ChangeItems DisplayName map if API values are missing
          renderViewDynamicFields(
            data.d.results,
            null,
            displayNameMapFromChangeItems
          );
          // If in edit mode, initialize edit mode after fields are rendered
          // But only if not still loading initial data
          if (window.isEdit && !window.isLoadingChangeRequestData) {
            setTimeout(function () {
              initializeEditMode(changeItemCode);
            }, 500);
          }
        }
      } else {
        setChangeItemsVisibility(false);
      }
    },
    error: function (err) {
      // Silent fail
    },
  });
}
function setSelectValue(selectId, value) {
  const $sel = $(selectId);
  if (!$sel.find(`option[value='${value}']`).length && value) {
    $sel.append(`<option value="${value}" selected>${value}</option>`);
  }
  // Set value - change events will be blocked by event handlers checking isLoadingChangeRequestData flag
  $sel.val(value);
}
function renderViewDynamicFields(
  columns,
  apiResponse,
  displayNameMapFromChangeItems
) {
  const container = $(".changeItemsRow");
  container.find(".dynamicField").remove();

  // Check actionType - if add, merge, split, or delete, hide dynamic section and don't render fields
  var meta = getSelectedChangeItemMeta();
  if (meta.actionType === "add" || meta.actionType === "merge" || meta.actionType === "split" || meta.actionType === "delete") {
    setChangeItemsVisibility(false);
    return;
  }

  const changeItemCode = $("#ChangeItem").val();
  const approvalLevel = $("#ApprovalLevel").val();
  let itemCode = $("#ParentItemCode").val();
  if ($("#ChildItemCodeDiv").is(":visible") && $("#ChildItemCode").val()) {
    itemCode = $("#ChildItemCode").val();
  }

  const lang = localStorage.getItem("lng");

  if (
    (!columns || columns.length === 0) &&
    (!changeItemCode || !approvalLevel || !itemCode)
  ) {
    setChangeItemsVisibility(false);
    return;
  }

  setChangeItemsVisibility(true);

  function appendField(col, labelText) {
    const fieldName =
      col.ColumnInternalName ||
      "field_" + Math.random().toString(36).substr(2, 5);
    const oldValueRaw = col.ColumnOldValue || "";
    const newValue = col.ColumnNewValue || "";
    const dataType = (col.DataType || "string").toLowerCase();
    const colClass = dataType === "textarea" ? "col-md-12" : "col-md-6";
    let displayValue = newValue;

    // Handle date, datetime, datetimetoparent - convert to yyyy-mm-dd for input type="date"
    // Remove time part if exists (e.g., "12/14/2023 21:00:00" -> "12/14/2023")
    if (dataType === "date" || dataType === "datetime" || dataType === "datetimetoparent") {
      let dateValue = "";
      try {
        if (newValue) {
          // Remove time part if exists
          let dateStr = String(newValue).split(" ")[0]; // Get date part only (before space)
          
          let d = new Date(dateStr);
          if (isNaN(d)) {
            // Try to parse mm/dd/yyyy format
            const mmddyyyy = dateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
            if (mmddyyyy) {
              d = new Date(parseInt(mmddyyyy[3]), parseInt(mmddyyyy[1]) - 1, parseInt(mmddyyyy[2]));
            }
          }
          if (!isNaN(d)) {
            const year = d.getFullYear();
            const month = ("0" + (d.getMonth() + 1)).slice(-2);
            const day = ("0" + d.getDate()).slice(-2);
            dateValue = `${year}-${month}-${day}`;
          }
        }
      } catch (e) { }
      displayValue = dateValue;
    }
    const readOnly = !window.isEdit;

    // Handle Picker type - only add special handling if type is picker
    if (dataType === "picker") {
      // For picker fields:
      // - ColumnOldValue contains the User ID (not display name) - IMPORTANT: save original ID
      // - ColumnNewValue contains the User ID (not display name)
      // - We need to convert ID to display name for display only
      // - The actual value stored should remain the ID

      const oldValueId = col.ColumnOldValue || "";

      let oldValueDisplay = oldValueId;
      if (oldValueDisplay && oldValueDisplay !== "0" && oldValueDisplay !== 0) {
        const userId = parseInt(oldValueDisplay, 10);
        if (!isNaN(userId)) {
          getUserDisplayNameFromId(oldValueDisplay).then(function (displayName) {
            const $oldValueSpan = container
              .find(`#${fieldName}`)
              .closest(".dynamicField")
              .find(".oldValue");
            if ($oldValueSpan.length) {
              $oldValueSpan.text(displayName || oldValueDisplay);
              // IMPORTANT: Save the original ID in data attribute for submit
              $oldValueSpan.attr("data-original-id", oldValueId);
            }
          }).catch(function (err) {
          });
          oldValueDisplay = "Loading..."; // Temporary text while loading
        }
      } else if (oldValueDisplay === "0" || oldValueDisplay === 0) {
        oldValueDisplay = "0";
      } else {
        oldValueDisplay = "";
      }

      // Format oldValue for display: empty/null/undefined -> "No data", 0 -> "0", otherwise -> value
      let oldValueHtmlPicker = "";
      if (!oldValueDisplay || oldValueDisplay === "" || oldValueDisplay === "null" || oldValueDisplay === "undefined") {
        oldValueHtmlPicker = '<span data-trans-nodata class="Resources"></span>';
      } else if (oldValueDisplay === "0" || oldValueDisplay === 0) {
        oldValueHtmlPicker = "0";
      } else if (oldValueDisplay === "Loading...") {
        oldValueHtmlPicker = "Loading...";
      } else {
        oldValueHtmlPicker = escapeHtml(oldValueDisplay);
      }

      // For picker: displayValue should be the ID (from ColumnNewValue)
      // The ID will be stored in data-user-id attribute
      // initPeoplePicker will convert ID to display name for visual display
      const pickerValue = newValue || ""; // This is the User ID

      const inputHtml = buildInputHtml(fieldName, dataType, pickerValue, readOnly);
      const fieldBlock = `
        <div class="${colClass} mb-3 dynamicField" data-field-id="${fieldName}" data-field-type="${dataType}" data-picker-old-id="${oldValueId}" data-old-value-id="${escapeHtml(oldValueId)}">
            <label>${escapeHtml(
        labelText
      )} (<span data-trans-previousvalue class="Resources"></span> <span class="oldValue" data-original-id="${oldValueId}">${oldValueHtmlPicker}</span>)</label>
            ${inputHtml}
        </div>
      `;
      container.append(fieldBlock);

      // Initialize People Picker for this field after a delay
      // initPeoplePicker will read the ID from data-user-id and convert it to display name
      setTimeout(function () {
        const $pickerInput = $("#" + fieldName);
        if ($pickerInput.length && $pickerInput.hasClass("peoplePicker")) {
          initPeoplePicker();
        }
      }, 500);

      return; // Exit early for picker fields
    }

    // Handle dropdownValues type - create dropdown with options from meta.options.choices
    if (dataType === "dropdownvalues") {
      // Get dropdownValues metadata from API response or columns
      let dropdownMeta = {};
      if (apiResponse && apiResponse.result && apiResponse.result.columnsDetails) {
        const apiColumns = apiResponse.result.columnsDetails || [];
        const matchingApiCol = apiColumns.find((apiCol) => {
          let jsonField = {};
          try {
            jsonField = JSON.parse(apiCol.jsonField || "{}");
          } catch (e) { }
          return jsonField.InternalName === fieldName;
        });
        if (matchingApiCol) {
          try {
            dropdownMeta = JSON.parse(matchingApiCol.jsonField || "{}");
          } catch (e) { }
        }
      }
      
      // Format oldValue for display - if it's a value from choices, use data-trans attribute for translation
      let oldValueDisplayHtml = "";
      if (!oldValueRaw || oldValueRaw === "" || oldValueRaw === "null" || oldValueRaw === "undefined") {
        oldValueDisplayHtml = '<span data-trans-nodata class="Resources"></span>';
      } else if (oldValueRaw === "0" || oldValueRaw === 0) {
        oldValueDisplayHtml = "0";
      } else {
        // Check if oldValue matches one of the choice values
        if (dropdownMeta.options && dropdownMeta.options.choices && Array.isArray(dropdownMeta.options.choices)) {
          const matchingChoice = dropdownMeta.options.choices.find(function(choice) {
            return choice.value === oldValueRaw;
          });
          if (matchingChoice) {
            // Use data-trans attribute for translation
            const oldValueTransAttr = `data-trans-${oldValueRaw}`;
            oldValueDisplayHtml = `<span ${oldValueTransAttr} class="Resources"></span>`;
          } else {
            oldValueDisplayHtml = escapeHtml(oldValueRaw);
          }
        } else {
          oldValueDisplayHtml = escapeHtml(oldValueRaw);
        }
      }
      
      const selectId = fieldName;
      // Use newValue (raw value) for comparison (not escaped) to match choice.value exactly
      const currentValue = newValue || "";
      
      // Build options HTML directly from dropdownMeta.options.choices
      // Only select empty option if no value is set
      const emptyOptionSelected = !currentValue ? " selected" : "";
      let optionsHtml = `<option value="" disabled${emptyOptionSelected}></option>`;
      if (dropdownMeta.options && dropdownMeta.options.choices && Array.isArray(dropdownMeta.options.choices)) {
        dropdownMeta.options.choices.forEach(function(choice) {
          const choiceValue = escapeHtml(choice.value || "");
          const choiceDisplay = escapeHtml(choice.display || choice.value || "");
          const selectedAttr = (currentValue && choice.value === currentValue) ? " selected" : "";
          const transAttr = `data-trans-${choice.value}`;
          optionsHtml += `<option value="${choiceValue}" ${transAttr} class="Resources"${selectedAttr}>${choiceDisplay}</option>`;
        });
      }
      
      const selectHtml = `<select id="${selectId}" class="form-control"${readOnly ? " disabled" : ""}>${optionsHtml}</select>`;
      
      // Save original oldValue (before translation) in data attribute for API submission
      const oldValueOriginal = oldValueRaw || "";
      const oldValueAttr = oldValueOriginal ? ` data-dropdown-old-value="${escapeHtml(oldValueOriginal)}"` : "";
      
      // Add data-trans attribute to label - use DisplayNameEn as translation key (standard format)
      const labelTransKey = dropdownMeta.DisplayNameEn || dropdownMeta.DisplayName || "";
      const labelTransAttr = labelTransKey ? ` data-trans="${labelTransKey}"` : "";
      const labelClass = labelTransKey ? " class=\"Resources\"" : "";
      
      const fieldBlock = `
        <div class="${colClass} mb-3 dynamicField" data-field-id="${fieldName}" data-field-type="${dataType}"${oldValueAttr}>
            <label${labelTransAttr}${labelClass}>${escapeHtml(
        labelText
      )} (<span data-trans-previousvalue class="Resources"></span> <span class="oldValue">${oldValueDisplayHtml}</span>)</label>
            ${selectHtml}
        </div>
      `;
      container.append(fieldBlock);
      changeResources();
      return;
    }

    // Handle yesnoradio type - create radio buttons with options from dropdownMeta.options.choices
    if (dataType === "yesnoradio") {
      // Get yesnoradio metadata from API response or columns
      let yesnoMeta = {};
      if (apiResponse && apiResponse.result && apiResponse.result.columnsDetails) {
        const apiColumns = apiResponse.result.columnsDetails || [];
        const matchingApiCol = apiColumns.find((apiCol) => {
          let jsonField = {};
          try {
            jsonField = JSON.parse(apiCol.jsonField || "{}");
          } catch (e) { }
          return jsonField.InternalName === fieldName;
        });
        if (matchingApiCol) {
          try {
            yesnoMeta = JSON.parse(matchingApiCol.jsonField || "{}");
          } catch (e) { }
        }
      }
      
      // Format oldValue for display - if it's a value from choices, use data-trans attribute for translation
      let oldValueDisplayHtml = "";
      if (!oldValueRaw || oldValueRaw === "" || oldValueRaw === "null" || oldValueRaw === "undefined") {
        oldValueDisplayHtml = '<span data-trans-nodata class="Resources"></span>';
      } else if (oldValueRaw === "0" || oldValueRaw === 0) {
        oldValueDisplayHtml = "0";
      } else {
        // Check if oldValue matches one of the choice values
        if (yesnoMeta.options && yesnoMeta.options.choices && Array.isArray(yesnoMeta.options.choices)) {
          const matchingChoice = yesnoMeta.options.choices.find(function(choice) {
            return choice.value === oldValueRaw;
          });
          if (matchingChoice) {
            // Use data-trans attribute for translation
            const oldValueTransAttr = `data-trans-${oldValueRaw}`;
            oldValueDisplayHtml = `<span ${oldValueTransAttr} class="Resources"></span>`;
          } else {
            oldValueDisplayHtml = escapeHtml(oldValueRaw);
          }
        } else {
          oldValueDisplayHtml = escapeHtml(oldValueRaw);
        }
      }
      
      // Use newValue (raw value) for comparison (not escaped) to match choice.value exactly
      const currentValue = newValue || "";
      
      let radioButtonsHtml = "";
      if (yesnoMeta.options && yesnoMeta.options.choices && Array.isArray(yesnoMeta.options.choices)) {
        yesnoMeta.options.choices.forEach(function(choice) {
          const choiceValue = escapeHtml(choice.value || "");
          const choiceDisplay = escapeHtml(choice.display || choice.value || "");
          const checkedAttr = (currentValue && choice.value === currentValue) ? " checked" : "";
          const transAttr = `data-trans-${choice.value}`;
          const radioId = fieldName + "_" + choice.value;
          radioButtonsHtml += `<input class="form-control yesnolistener" type="radio" name="${escapeHtml(labelText)}" id="${radioId}" value="${choiceValue}" placeholder="${escapeHtml(labelText)}" data-targetfieldrequired="undefined" data-targetfield="undefined" data-targetfieldvalue="undefined"${readOnly ? " disabled" : ""}${checkedAttr} /><label ${transAttr} for="${radioId}" class="Resources radiolabel">${choiceDisplay}</label>`;
        });
      }
      
      // Save original oldValue (before translation) in data attribute for API submission
      const oldValueOriginal = oldValueRaw || "";
      const oldValueAttr = oldValueOriginal ? ` data-dropdown-old-value="${escapeHtml(oldValueOriginal)}"` : "";
      
      // Add data-trans attribute to label - use DisplayNameEn as translation key (standard format)
      const labelTransKey = yesnoMeta.DisplayNameEn || yesnoMeta.DisplayName || "";
      const labelTransAttr = labelTransKey ? ` data-trans="${labelTransKey}"` : "";
      const labelClass = labelTransKey ? " class=\"Resources\"" : "";
      
      const fieldBlock = `
        <div class="${colClass} mb-3 dynamicField radioLabelField" data-field-id="${fieldName}" data-field-type="${dataType}"${oldValueAttr}>
            <label${labelTransAttr}${labelClass}>${escapeHtml(
        labelText
      )} (<span data-trans-previousvalue class="Resources"></span> <span class="oldValue">${oldValueDisplayHtml}</span>)</label>
            <div>${radioButtonsHtml}</div>
        </div>
      `;
      container.append(fieldBlock);
      changeResources();
      return;
    }

    // Handle lookup type - create dropdown
    if (dataType === "lookup") {
      // Get lookup metadata from API response or columns
      let lookupMeta = {};
      if (apiResponse && apiResponse.result && apiResponse.result.columnsDetails) {
        const apiColumns = apiResponse.result.columnsDetails || [];
        const matchingApiCol = apiColumns.find((apiCol) => {
          let jsonField = {};
          try {
            jsonField = JSON.parse(apiCol.jsonField || "{}");
          } catch (e) { }
          return jsonField.InternalName === fieldName;
        });
        if (matchingApiCol) {
          try {
            lookupMeta = JSON.parse(matchingApiCol.jsonField || "{}");
          } catch (e) { }
        }
      }
      
      const source = lookupMeta.source || "";
      const dispFieldKey = lookupMeta.Dispfieldkey || "Name";
      const dispFieldKeyEn = lookupMeta.DispfieldkeyEn || dispFieldKey;
      const valFieldKey = lookupMeta.valfieldkey || "Title";
      
      // Convert oldValue (valfieldkey) to display text (Dispfieldkey)
      // IMPORTANT: Save the original value (valfieldkey) in data attribute for API submission
      let oldValueDisplay = oldValueRaw;
      const originalValue = oldValueRaw; // This is the valfieldkey value
      if (oldValueDisplay && oldValueDisplay !== "" && oldValueDisplay !== "null" && oldValueDisplay !== "undefined" && oldValueDisplay !== "0" && oldValueDisplay !== 0) {
        // Fetch display text from list
        if (source) {
          const query = _spPageContextInfo.webAbsoluteUrl +
            `/_api/web/lists/getbytitle('${source}')/items?$top=5000&$filter=DeletionStatus ne 'Deleted' and ${valFieldKey} eq '${oldValueDisplay.replace(/'/g, "''")}'`;
          
          $.ajax({
            url: query,
            method: "GET",
            headers: { Accept: "application/json; odata=verbose" },
            success: function (data) {
              if (data.d && data.d.results && data.d.results.length > 0) {
                const item = data.d.results[0];
                const displayText = lang == null || lang == "ar"
                  ? (item[dispFieldKey] || oldValueDisplay)
                  : (item[dispFieldKeyEn] || item[dispFieldKey] || oldValueDisplay);
                
                const $fieldDiv = container
                  .find(`#${fieldName}`)
                  .closest(".dynamicField");
                const $oldValueSpan = $fieldDiv.find(".oldValue");
                if ($oldValueSpan.length) {
                  $oldValueSpan.text(displayText);
                  $fieldDiv.attr("data-lookup-old-value", originalValue);
                }
              }
            },
            error: function (err) {
              const $fieldDiv = container
                .find(`#${fieldName}`)
                .closest(".dynamicField");
              if ($fieldDiv.length) {
                $fieldDiv.attr("data-lookup-old-value", originalValue);
              }
            }
          });
          oldValueDisplay = "Loading..."; // Temporary text while loading
        } else {
          // If source is not available, still save original value
          // This will be set in the fieldBlock below
        }
      }
      
      // Format oldValue for display
      let oldValueHtml = "";
      if (!oldValueDisplay || oldValueDisplay === "" || oldValueDisplay === "null" || oldValueDisplay === "undefined") {
        oldValueHtml = '<span data-trans-nodata class="Resources"></span>';
      } else if (oldValueDisplay === "0" || oldValueDisplay === 0) {
        oldValueHtml = "0";
      } else if (oldValueDisplay === "Loading...") {
        oldValueHtml = "Loading...";
      } else {
        oldValueHtml = escapeHtml(oldValueDisplay);
      }
      
      // Create dropdown HTML
      const selectId = fieldName;
      const safeValue = escapeHtml(newValue || "");
      const selectHtml = `<select id="${selectId}" class="form-control"${readOnly ? " disabled" : ""}><option value="" disabled selected></option></select>`;
      
      // Save original value (valfieldkey) in data attribute if available
      // originalValue is already set above from oldValueRaw
      const lookupOldValueAttr = originalValue && originalValue !== "" && originalValue !== "null" && originalValue !== "undefined" && originalValue !== "0" && originalValue !== 0 ? ` data-lookup-old-value="${escapeHtml(originalValue)}"` : "";
      
      const fieldBlock = `
        <div class="${colClass} mb-3 dynamicField" data-field-id="${fieldName}" data-field-type="${dataType}" data-lookup-source="${escapeHtml(source)}" data-lookup-disp="${escapeHtml(dispFieldKey)}" data-lookup-disp-en="${escapeHtml(dispFieldKeyEn)}" data-lookup-val="${escapeHtml(valFieldKey)}"${lookupOldValueAttr}>
            <label>${escapeHtml(
        labelText
      )} (<span data-trans-previousvalue class="Resources"></span> <span class="oldValue">${oldValueHtml}</span>)</label>
            ${selectHtml}
        </div>
      `;
      container.append(fieldBlock);
      
      // Load options from list
      if (source) {
        // Use alphabetical order by dispFieldKey
        const orderBy = dispFieldKey + " asc";
        loadListOptions(source, `#${selectId}`, dispFieldKey, dispFieldKeyEn, valFieldKey, "", orderBy);
        
        // Set selected value after options are loaded
        setTimeout(function() {
          const $select = $(`#${selectId}`);
          if ($select.length && safeValue) {
            $select.val(safeValue);
          }
        }, 1000);
      }
      
      return; // Exit early for lookup fields
    }

    // Regular fields (non-picker, non-lookup) - original code
    const inputHtml = buildInputHtml(
      fieldName,
      dataType,
      displayValue,
      readOnly
    );

    // Format oldValue for display: empty/null/undefined -> "No data", 0 -> "0", otherwise -> value
    // For date fields, convert oldValue to mm/dd/yyyy format
    let formattedOldValue = oldValueRaw;
    if ((dataType === "date" || dataType === "datetime" || dataType === "datetimetoparent") && oldValueRaw && oldValueRaw !== "" && oldValueRaw !== "null" && oldValueRaw !== "undefined" && oldValueRaw !== "0" && oldValueRaw !== 0) {
      try {
        let d = new Date(oldValueRaw);
        if (isNaN(d)) {
          // Try to parse mm/dd/yyyy format
          const mmddyyyy = String(oldValueRaw).match(/(\d{2})\/(\d{2})\/(\d{4})/);
          if (mmddyyyy) {
            d = new Date(parseInt(mmddyyyy[3]), parseInt(mmddyyyy[1]) - 1, parseInt(mmddyyyy[2]));
          }
        }
        if (!isNaN(d)) {
          const month = ("0" + (d.getMonth() + 1)).slice(-2);
          const day = ("0" + d.getDate()).slice(-2);
          const year = d.getFullYear();
          formattedOldValue = `${month}/${day}/${year}`;
        }
      } catch (e) { }
    }
    
    let oldValueHtml = "";
    if (!formattedOldValue || formattedOldValue === "" || formattedOldValue === "null" || formattedOldValue === "undefined") {
      oldValueHtml = '<span data-trans-nodata class="Resources"></span>';
    } else if (formattedOldValue === "0" || formattedOldValue === 0) {
      oldValueHtml = "0";
    } else {
      oldValueHtml = escapeHtml(formattedOldValue);
    }

    // IMPORTANT: Add data-field-id attribute so handleChangeItemsAPI can find the field
    const fieldBlock = `
      <div class="${colClass} mb-3 dynamicField" data-field-id="${fieldName}" data-field-type="${dataType}">
          <label>${escapeHtml(
      labelText
    )} (<span data-trans-previousvalue class="Resources"></span> <span class="oldValue">${oldValueHtml}</span>)</label>
          ${inputHtml}
      </div>
    `;
    container.append(fieldBlock);
  }

  // If API response is provided, use it directly
  if (apiResponse && apiResponse.result && apiResponse.result.columnsDetails) {
    const apiColumns = apiResponse.result.columnsDetails || [];
    const labelMap = {};
    apiColumns.forEach((apiCol) => {
      let jsonField = {};
      try {
        jsonField = JSON.parse(apiCol.jsonField || "{}");
      } catch (e) { }
      if (jsonField.InternalName) {
        labelMap[jsonField.InternalName] =
          lang == null || lang == "ar"
            ? jsonField.DisplayName ||
            jsonField.DisplayNameEn ||
            jsonField.InternalName
            : jsonField.DisplayNameEn ||
            jsonField.DisplayName ||
            jsonField.InternalName;
      }
    });

    if (columns && columns.length) {
      columns.forEach((col) => {
        let labelText = labelMap[col.ColumnInternalName];

        // IMPORTANT: For picker fields, get the old value ID from API response
        // Find matching API column to get the value (which is the User ID)
        const matchingApiCol = apiColumns.find((apiCol) => {
          let jsonField = {};
          try {
            jsonField = JSON.parse(apiCol.jsonField || "{}");
          } catch (e) { }
          return jsonField.InternalName === col.ColumnInternalName;
        });

        if (matchingApiCol) {
          let jsonField = {};
          try {
            jsonField = JSON.parse(matchingApiCol.jsonField || "{}");
          } catch (e) { }

          // Get label from jsonField
          if (!labelText) {
            labelText =
              lang == null || lang == "ar"
                ? jsonField.DisplayName ||
                jsonField.DisplayNameEn ||
                col.ColumnInternalName
                : jsonField.DisplayNameEn ||
                jsonField.DisplayName ||
                col.ColumnInternalName;
          }

          // IMPORTANT: For picker fields, save the API value (User ID) as old value
          if (jsonField.type && jsonField.type.toLowerCase() === "picker" && matchingApiCol.value) {
            // API returns User ID in value field - save it as old value ID
            col.ColumnOldValue = matchingApiCol.value.toString();
          }
          
          // IMPORTANT: For lookup fields, save the API value as old value
          if (jsonField.type && jsonField.type.toLowerCase() === "lookup" && matchingApiCol.value) {
            // API returns lookup value in value field - save it as old value
            col.ColumnOldValue = matchingApiCol.value ? matchingApiCol.value.toString() : "";
          }
        }

        // If not found in API labelMap, try ChangeItems displayNameMap
        if (
          !labelText &&
          displayNameMapFromChangeItems &&
          displayNameMapFromChangeItems[col.ColumnInternalName]
        ) {
          const changeItemDisplayName =
            displayNameMapFromChangeItems[col.ColumnInternalName];
          labelText =
            lang == null || lang == "ar"
              ? changeItemDisplayName.DisplayName ||
              changeItemDisplayName.DisplayNameEn ||
              col.ColumnInternalName
              : changeItemDisplayName.DisplayNameEn ||
              changeItemDisplayName.DisplayName ||
              col.ColumnInternalName;
        }

        if (!labelText) {
          labelText = col.Title || col.ColumnInternalName;
        }

        appendField(col, labelText);
      });

      // Initialize People Pickers if any picker fields exist
      setTimeout(function () {
        const $pickers = $("input.peoplePicker");
        if ($pickers.length > 0) {
          initPeoplePicker();
        }
      }, 500);
    }

    changeResources();

    if (window.isEdit) {
      $(
        ".changeItemsRow .dynamicField input, .changeItemsRow .dynamicField textarea, .changeItemsRow .dynamicField select"
      ).prop("disabled", false);
    }
    return;
  }

  // Otherwise, call API if we have the required values
  // But skip API call if actionType is add, merge, split, or delete
  if (changeItemCode && approvalLevel && itemCode) {
    // Check actionType - if add, merge, split, or delete, don't call API
    var meta = getSelectedChangeItemMeta();
    if (meta.actionType === "add" || meta.actionType === "merge" || meta.actionType === "split" || meta.actionType === "delete") {
      // Don't call API, just render fields directly without API
      if (columns && columns.length) {
        columns.forEach((col) => {
          let labelText = col.Title || col.ColumnInternalName;
          if (
            displayNameMapFromChangeItems &&
            displayNameMapFromChangeItems[col.ColumnInternalName]
          ) {
            const changeItemDisplayName =
              displayNameMapFromChangeItems[col.ColumnInternalName];
            labelText =
              lang == null || lang == "ar"
                ? changeItemDisplayName.DisplayName ||
                changeItemDisplayName.DisplayNameEn ||
                col.ColumnInternalName
                : changeItemDisplayName.DisplayNameEn ||
                changeItemDisplayName.DisplayName ||
                col.ColumnInternalName;
          }
          appendField(col, labelText);
        });
      }
      changeResources();
      return;
    }
    
    // Build URL with classification parameter if it's MainKpi
    let url = `${APIURL}/general/getchangeitemsdetails/${encodeURIComponent(
      changeItemCode
    )}/${encodeURIComponent(approvalLevel)}/${encodeURIComponent(itemCode)}`;
    
    const parentType = $("#ParentItemType").val();
    const classification = (parentType === "MainKpi" && $("#Classification").val()) ? $("#Classification").val() : null;
    if (parentType === "MainKpi" && classification) {
      url += `?classification=${encodeURIComponent(classification)}`;
    }

    $.ajax({
      url: url,
      method: "GET",
      headers: { Accept: "application/json" },
      success: function (res) {
        const apiColumns =
          res && res.result && res.result.columnsDetails
            ? res.result.columnsDetails
            : [];

        const labelMap = {};
        apiColumns.forEach((apiCol) => {
          let jsonField = {};
          try {
            jsonField = JSON.parse(apiCol.jsonField || "{}");
          } catch (e) { }
          if (jsonField.InternalName) {
            labelMap[jsonField.InternalName] =
              lang == null || lang == "ar"
                ? jsonField.DisplayName ||
                jsonField.DisplayNameEn ||
                jsonField.InternalName
                : jsonField.DisplayNameEn ||
                jsonField.DisplayName ||
                jsonField.InternalName;
          }
        });

        if (columns && columns.length) {
          columns.forEach((col) => {
            // Try to get label from labelMap first
            let labelText = labelMap[col.ColumnInternalName];

            // If not found in API labelMap, try ChangeItems displayNameMap
            if (
              !labelText &&
              displayNameMapFromChangeItems &&
              displayNameMapFromChangeItems[col.ColumnInternalName]
            ) {
              const changeItemDisplayName =
                displayNameMapFromChangeItems[col.ColumnInternalName];
              labelText =
                lang == null || lang == "ar"
                  ? changeItemDisplayName.DisplayName ||
                  changeItemDisplayName.DisplayNameEn ||
                  col.ColumnInternalName
                  : changeItemDisplayName.DisplayNameEn ||
                  changeItemDisplayName.DisplayName ||
                  col.ColumnInternalName;
            }

            // If not found in labelMap, try to find it in apiColumns directly
            // IMPORTANT: Find matching API column to get value (User ID for picker fields)
            const matchingApiCol = apiColumns.find((apiCol) => {
              let jsonField = {};
              try {
                jsonField = JSON.parse(apiCol.jsonField || "{}");
              } catch (e) { }
              return jsonField.InternalName === col.ColumnInternalName;
            });

            if (matchingApiCol) {
              let jsonField = {};
              try {
                jsonField = JSON.parse(matchingApiCol.jsonField || "{}");
              } catch (e) { }

              // Get label from jsonField
              if (!labelText) {
                labelText =
                  lang == null || lang == "ar"
                    ? jsonField.DisplayName ||
                    jsonField.DisplayNameEn ||
                    col.ColumnInternalName
                    : jsonField.DisplayNameEn ||
                    jsonField.DisplayName ||
                    col.ColumnInternalName;
              }

              // IMPORTANT: For picker fields, save the API value (User ID) as old value
              if (jsonField.type && jsonField.type.toLowerCase() === "picker" && matchingApiCol.value) {
                // API returns User ID in value field - save it as old value ID
                col.ColumnOldValue = matchingApiCol.value.toString();
              }
              
              // IMPORTANT: For lookup fields, save the API value as old value
              if (jsonField.type && jsonField.type.toLowerCase() === "lookup" && matchingApiCol.value) {
                // API returns lookup value in value field - save it as old value
                col.ColumnOldValue = matchingApiCol.value ? matchingApiCol.value.toString() : "";
              }
            }

            // Fallback to Title or ColumnInternalName
            if (!labelText) {
              labelText = col.Title || col.ColumnInternalName;
            }

            appendField(col, labelText);
          });

          // Initialize People Pickers if any picker fields exist
          setTimeout(function () {
            const $pickers = $("input.peoplePicker");
            if ($pickers.length > 0) {
              initPeoplePicker();
            }
          }, 500);
        }

        changeResources();

        // If in edit mode, ensure dynamic fields remain enabled
        if (window.isEdit) {
          $(
            ".changeItemsRow .dynamicField input, .changeItemsRow .dynamicField textarea, .changeItemsRow .dynamicField select"
          ).prop("disabled", false);
        }
      },
      error: function (xhr) {
        // Check actionType - if add, merge, split, or delete, don't call API
        var meta = getSelectedChangeItemMeta();
        if (meta.actionType === "add" || meta.actionType === "merge" || meta.actionType === "split" || meta.actionType === "delete") {
          // Don't call API, just render fields directly without API
          if (columns && columns.length) {
            columns.forEach((col) => {
              let labelText = col.Title || col.ColumnInternalName;
              if (
                displayNameMapFromChangeItems &&
                displayNameMapFromChangeItems[col.ColumnInternalName]
              ) {
                const changeItemDisplayName =
                  displayNameMapFromChangeItems[col.ColumnInternalName];
                labelText =
                  lang == null || lang == "ar"
                    ? changeItemDisplayName.DisplayName ||
                    changeItemDisplayName.DisplayNameEn ||
                    col.ColumnInternalName
                    : changeItemDisplayName.DisplayNameEn ||
                    changeItemDisplayName.DisplayName ||
                    col.ColumnInternalName;
              }
              appendField(col, labelText);
            });
          }
          changeResources();
          return;
        }
        
        if (columns && columns.length) {
          // Try to fetch DisplayName from API even on error
          // Build URL with classification parameter if it's MainKpi
          let url = `${APIURL}/general/getchangeitemsdetails/${encodeURIComponent(
            changeItemCode
          )}/${encodeURIComponent(approvalLevel)}/${encodeURIComponent(
            itemCode
          )}`;
          
          const parentType = $("#ParentItemType").val();
          const classification = (parentType === "MainKpi" && $("#Classification").val()) ? $("#Classification").val() : null;
          if (parentType === "MainKpi" && classification) {
            url += `?classification=${encodeURIComponent(classification)}`;
          }

          $.ajax({
            url: url,
            method: "GET",
            headers: { Accept: "application/json" },
            success: function (res) {
              const result = res && res.result ? res.result : {};
              
              // Check IsActive for new forms
              if (!handleIsActiveCheck(result)) {
                // Item is not active, don't proceed with rendering fields
                return;
              }

              const apiColumns =
                res && res.result && res.result.columnsDetails
                  ? res.result.columnsDetails
                  : [];

              const labelMap = {};
              apiColumns.forEach((apiCol) => {
                let jsonField = {};
                try {
                  jsonField = JSON.parse(apiCol.jsonField || "{}");
                } catch (e) { }
                if (jsonField.InternalName) {
                  labelMap[jsonField.InternalName] =
                    lang == null || lang == "ar"
                      ? jsonField.DisplayName ||
                      jsonField.DisplayNameEn ||
                      jsonField.InternalName
                      : jsonField.DisplayNameEn ||
                      jsonField.DisplayName ||
                      jsonField.InternalName;
                }
              });

              columns.forEach((col) => {
                const labelText =
                  labelMap[col.ColumnInternalName] ||
                  col.Title ||
                  col.ColumnInternalName;
                appendField(col, labelText);
              });

              changeResources();

              // Initialize People Pickers for any picker fields
              setTimeout(function () {
                initPeoplePicker();
              }, 300);

              if (window.isEdit) {
                $(
                  ".changeItemsRow .dynamicField input, .changeItemsRow .dynamicField textarea, .changeItemsRow .dynamicField select"
                ).prop("disabled", false);
              }
            },
            error: function (err) {
              // If API fails, use ChangeItems displayNameMap or Title/ColumnInternalName as fallback
              columns.forEach((col) => {
                let labelText = col.Title || col.ColumnInternalName;
                if (
                  displayNameMapFromChangeItems &&
                  displayNameMapFromChangeItems[col.ColumnInternalName]
                ) {
                  const changeItemDisplayName =
                    displayNameMapFromChangeItems[col.ColumnInternalName];
                  labelText =
                    lang == null || lang == "ar"
                      ? changeItemDisplayName.DisplayName ||
                      changeItemDisplayName.DisplayNameEn ||
                      col.ColumnInternalName
                      : changeItemDisplayName.DisplayNameEn ||
                      changeItemDisplayName.DisplayName ||
                      col.ColumnInternalName;
                }
                appendField(col, labelText);
              });

              // After all fields are appended, initialize People Pickers using interval
              let pickerInitAttempts = 0;
              const pickerInitInterval = setInterval(function () {
                pickerInitAttempts++;
                const $pickers = $("input.peoplePicker");

                if ($pickers.length > 0) {
                  clearInterval(pickerInitInterval);
                  initPeoplePicker();
                } else if (pickerInitAttempts >= 10) {
                  clearInterval(pickerInitInterval);
                }
              }, 500);

              changeResources();

              if (window.isEdit) {
                $(
                  ".changeItemsRow .dynamicField input, .changeItemsRow .dynamicField textarea, .changeItemsRow .dynamicField select"
                ).prop("disabled", false);
              }
            },
          });
        }
      },
    });
  } else {
    // No API call - use ChangeItems displayNameMap or Title/ColumnInternalName
    columns.forEach((col) => {
      let labelText = col.Title || col.ColumnInternalName;
      if (
        displayNameMapFromChangeItems &&
        displayNameMapFromChangeItems[col.ColumnInternalName]
      ) {
        const changeItemDisplayName =
          displayNameMapFromChangeItems[col.ColumnInternalName];
        labelText =
          lang == null || lang == "ar"
            ? changeItemDisplayName.DisplayName ||
            changeItemDisplayName.DisplayNameEn ||
            col.ColumnInternalName
            : changeItemDisplayName.DisplayNameEn ||
            changeItemDisplayName.DisplayName ||
            col.ColumnInternalName;
      }
      appendField(col, labelText);
    });

    // Initialize People Pickers if any picker fields exist
    setTimeout(function () {
      const $pickers = $("input.peoplePicker");
      if ($pickers.length > 0) {
        initPeoplePicker();
      }
    }, 500);

    changeResources();

    // If in edit mode, ensure dynamic fields remain enabled
    if (window.isEdit) {
      $(
        ".changeItemsRow .dynamicField input, .changeItemsRow .dynamicField textarea, .changeItemsRow .dynamicField select"
      ).prop("disabled", false);
    }
  }
}
function handleParentChange(parent) {
  const childSelect = $("#ChildItemType");
  const childDiv = $("#ChildItemTypeDiv");
  const childCodeDiv = $("#ChildItemCodeDiv");

  childSelect
    .empty()
    .append(
      '<option value="" data-trans-childitemtype class="Resources"></option>'
    );

  if (parent === "Initiatives") {
    ["InitiativeMilestones", "InitiativeDeliverables", "Benefits"].forEach(
      (c) =>
        childSelect.append(
          `<option value="${c}" class="Resources" data-trans-${c.toLowerCase()}>${c}</option>`
        )
    );
    childDiv.show();
    childCodeDiv.show();
  } else if (parent === "Projects") {
    ["Deliverables", "Milestones"].forEach((c) =>
      childSelect.append(
        `<option value="${c}" class="Resources" data-trans-${c.toLowerCase()}>${c}</option>`
      )
    );
    childDiv.show();
    childCodeDiv.show();
  } else {
    childDiv.hide();
    childCodeDiv.hide();
  }

  // Don't reload ParentItemCode if we're still loading initial data (it's already loaded)
  if (!window.isLoadingChangeRequestData) {
    loadParentItems(parent, "#ParentItemCode");
  }

  if (isEdit) {
    const selectedParentCode = $("#ParentItemCode").val();
    const selectedChildCode = $("#ChildItemCode").val() || "";
    const currentChangeItem = $("#ChangeItem").val() || "";

    // Don't reload ChangeItem if we're still loading initial data
    if (!window.isLoadingChangeRequestData) {
      loadChangeItemsForEdit(
        parent,
        selectedParentCode,
        selectedChildCode,
        currentChangeItem
      );
    }
  } else {
    if (!window.isLoadingChangeRequestData) {
      loadChangeItems(parent, parent);
    }
  }

  // Don't call changeResources during initial data load to prevent triggering change events
  if (!window.isLoadingChangeRequestData) {
    changeResources();
  }
}
function loadChangeItemsForEdit(
  parentType,
  parentCode,
  childCode,
  changeItemValue
) {
  const currentChangeItem = changeItemValue || $("#ChangeItem").val() || "";
  const $changeItem = $("#ChangeItem");
  $changeItem
    .empty()
    .append(
      '<option value="" data-trans-changeitem class="Resources"></option>'
    );
  const childType = $("#ChildItemType").val();
  const listName = childType || parentType;

  let filter = "";
  if (childType) filter = `ListName eq '${childType}'`;
  else filter = `ListName eq '${listName}'`;

  const url =
    _spPageContextInfo.webAbsoluteUrl +
    `/_api/web/lists/getbytitle('ChangeItems')/items?$filter=${filter} and DeletionStatus ne 'Deleted'&$orderby=ID`;

  $.ajax({
    url: url,
    method: "GET",
    headers: { Accept: "application/json; odata=verbose" },
    success: function (data) {
      data.d.results.forEach((item) => {
        $changeItem.append(
          `<option value="${item.Title}" data-name="${item.ItemName}" data-column="${item.ColumnInternalName}" data-actiontype="${item.ActionType}" data-listname="${item.ListName}" data-updatetype="${item.UpdateType}">${item.ItemName}</option>`
        );
      });
      
      // Handle Parent/Child fields visibility based on actionType after loading options
      handleParentChildFieldsVisibility();
      
          // Always restore the current ChangeItem value if it exists
      if (currentChangeItem && currentChangeItem.trim() !== "") {
        setTimeout(function() {
          const previousValue = $changeItem.val();
          setSelectValue("#ChangeItem", currentChangeItem);
          
          // Check if dynamic fields are already loaded (to prevent reloading)
          // Only prevent reloading in Edit/View mode, allow reloading in New mode
          const dynamicFieldsExist = $(".changeItemsRow .dynamicField").length > 0;
          const shouldPreventReload = dynamicFieldsExist && (window.isEdit || window.isView);
          
          // In edit/view mode, don't trigger change event during initial data load
          // Dynamic fields will be loaded after all data is loaded
          if (!window.isLoadingChangeRequestData && !shouldPreventReload) {
            // Only trigger change event if value actually changed (to avoid loops)
            if (previousValue !== currentChangeItem) {
              $changeItem.trigger("change");
            } else {
              // Value didn't change, but we still need to load dynamic fields
              // Only if they don't already exist (or if in New mode)
              tryFetchChangeDetails();
            }
          }
        }, 100);
      }
    },
    error: function (err) { },
  });
}
function initializeViewOrEdit() {
  const parentValue = $("#ParentItemType").val();
  if (parentValue) {
    handleParentChange(parentValue);
    const childValue = $("#ChildItemType").data("currentValue");
    if (childValue) $("#ChildItemType").val(childValue);
  }
}
function initializeEditMode(changeItemValue) {
  const parentValue = $("#ParentItemType").val();
  const parentCode = $("#ParentItemCode").val();
  const childType = $("#ChildItemType").val();
  const childCode = $("#ChildItemCode").val();

  if (!parentValue) return;

  // Check if dynamic fields are already loaded (to prevent reloading)
  const dynamicFieldsExist = $(".changeItemsRow .dynamicField").length > 0;
  
  // If dynamic fields are already loaded, don't reload them
  if (dynamicFieldsExist) {
    return;
  }

  // Don't call handleParentChange if we're still loading initial data
  // ChildItemType options should already be populated from fillViewFields
  if (!window.isLoadingChangeRequestData) {
    handleParentChange(parentValue);
  }

  if (childType) {
    setTimeout(() => {
      if (parentCode) $("#ParentItemCode").val(parentCode);
      // Don't set ChildItemType value if we're still loading (it's already set)
      if (!window.isLoadingChangeRequestData) {
        $("#ChildItemType").val(childType);
      }
      loadChildItems(childType || "", parentCode, parentValue);
      setTimeout(() => {
        if (childCode) $("#ChildItemCode").val(childCode);

        // Only load ChangeItem if not already loading initial data and dynamic fields don't exist
        if (!window.isLoadingChangeRequestData && !dynamicFieldsExist) {
          loadChangeItemsForEdit(
            parentValue,
            parentCode,
            childCode,
            changeItemValue
          );
        }
      }, 300);
    }, 300);
  } else {
    setTimeout(() => {
      if (parentCode) $("#ParentItemCode").val(parentCode);
      // Only load ChangeItem if not already loading initial data and dynamic fields don't exist
      if (!window.isLoadingChangeRequestData && !dynamicFieldsExist) {
        loadChangeItemsForEdit(parentValue, parentCode, "", changeItemValue);
      }
    }, 300);
  }
}

// Display rejection note section after changeItemsRow
function displayRejectionNoteSection(rejectionNote, isArabic) {
  // Remove existing rejection note section if any
  $(".rejection-note-section").remove();

  if (!rejectionNote) {
    return;
  }

  var lastNoteLabel = isArabic ? "آخر ملحوظة مسجلة:" : "Last recorded note:";
  var directionClass = isArabic ? "ar" : "en";

  // Escape HTML in rejection note
  var lastRejectionNoteEscaped = (rejectionNote || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "\\'").replace(/"/g, "&quot;");

  var rejectionNoteSection =
    '<div class="row mb-3 rejection-note-row">' +
    '<div class="my-4 d-flex w-100">' +
    '<div class="rejection-note-section ' + directionClass + '">' +
    '<label class="rejection-note-label">' + lastNoteLabel + '</label>' +
    '<div class="rejection-note-content">' + lastRejectionNoteEscaped + '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

  // Insert after changeItemsRow
  $(".changeItemsRow").after(rejectionNoteSection);
  changeResources();
}

// Function to check if this is the last stage and show Observations section
function checkAndShowObservationsSection() {
  var currentTaskID = taskID || taskId || window.taskID || window.taskid;
  if (!currentTaskID || !window.isWF) {
    return;
  }

  var ctx = SP.ClientContext.get_current();
  var taskList = ctx.get_web().get_lists().getByTitle("Tasks");
  var taskItem = taskList.getItemById(parseInt(currentTaskID));

  ctx.load(taskItem);
  ctx.executeQueryAsync(
    function () {
      var stageIDApprove = taskItem.get_item("StageIDApprove") || "";
      
      // If stageIDApprove == "approved", show Observations section
      if (stageIDApprove && stageIDApprove.toLowerCase() === "approved") {
        $("#CRObservationsBlock").show();
        // Enable Observations field in edit mode (workflow edit)
        if (window.isEdit) {
          $("#Observations").prop("disabled", false);
        }
      } else {
        // Hide Observations section if not the last stage
        $("#CRObservationsBlock").hide();
      }
    },
    function (sender, args) {
      // Error loading task, hide Observations section
      $("#CRObservationsBlock").hide();
    }
  );
}

// Workflow approval popup function
function showWorkflowApprovalPopup() {
  var currentTaskID = taskID || taskId || window.taskID || window.taskid;
  if (!currentTaskID) {
    alert("Task ID not found");
    return;
  }

  var ctx = SP.ClientContext.get_current();
  var taskList = ctx.get_web().get_lists().getByTitle("Tasks");
  var taskItem = taskList.getItemById(parseInt(currentTaskID));

  ctx.load(taskItem);
  ctx.executeQueryAsync(
    function () {
      // Get StageIDApprove and StageIDReject directly from Task
      var stageIDApprove = taskItem.get_item("StageIDApprove") || "";
      var stageIDReject = taskItem.get_item("StageIDReject") || "";
      var taskTitle = taskItem.get_item("Title");
      var stageName = taskTitle;
      var relatedItemTitle = taskItem.get_item("RelatedItemTitle") || "";
      var currentTaskCreated = taskItem.get_item("Created");
      var taskType = taskItem.get_item("TaskType") || "";

      // Get task configuration from localStorage for display name
      var tasktitlearr = [];
      if (localStorage.getItem("Dynamo_Tasks Configuration") != null) {
        tasktitlearr = JSON.parse(
          localStorage.getItem("Dynamo_Tasks Configuration") || "[]"
        );
        tasktitlearr = tasktitlearr.filter(function (item) {
          return item.code == taskTitle;
        });

        if (tasktitlearr.length > 0) {
          // Use StageIDApprove and StageIDReject from Task if available, otherwise from localStorage
          if (!stageIDApprove && tasktitlearr[0].StageIDApprove) {
            stageIDApprove = tasktitlearr[0].StageIDApprove;
          }
          if (!stageIDReject && tasktitlearr[0].StageIDReject) {
            stageIDReject = tasktitlearr[0].StageIDReject;
          }

          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            stageName = tasktitlearr[0].name || taskTitle;
          } else {
            stageName = tasktitlearr[0].nameEn || taskTitle;
          }
        }
      }

      //Show the cause of rejection
      // If StageIDReject is empty, get the last rejection note
      var lastRejectionNote = "";
      var showLastRejectionNote = false;

      if (!stageIDReject && relatedItemTitle) {
        showLastRejectionNote = true;
        // Query all tasks with same RelatedItemTitle and filter in JavaScript
        // This is more reliable than CAML date filtering
        var ctx3 = SP.ClientContext.get_current();
        var taskList3 = ctx3.get_web().get_lists().getByTitle("Tasks");
        var camlQuery2 = new SP.CamlQuery();
        var queryXml2 = "<View><Query><Where>" +
          "<Eq><FieldRef Name='RelatedItemTitle'/><Value Type='Text'>" + relatedItemTitle.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</Value></Eq>" +
          "</Where><OrderBy><FieldRef Name='Created' Ascending='True'/></OrderBy></Query><RowLimit>100</RowLimit></View>";
        camlQuery2.set_viewXml(queryXml2);
        var allTasks = taskList3.getItems(camlQuery2);
        ctx3.load(allTasks);
        ctx3.executeQueryAsync(
          function () {
            var allTasksEnum = allTasks.getEnumerator();
            var rejectedTasks = [];

            while (allTasksEnum.moveNext()) {
              var task = allTasksEnum.get_current();
              var taskTakenAction = task.get_item("TakenAction");
              var taskCreated = task.get_item("Created");
              var taskBody = task.get_item("Body") || "";

              // Filter: TakenAction = reject AND Created < currentTaskCreated
              if (taskTakenAction && taskTakenAction.toLowerCase() === "reject") {
                if (currentTaskCreated && taskCreated) {
                  if (taskCreated < currentTaskCreated) {
                    rejectedTasks.push({
                      created: taskCreated,
                      body: taskBody
                    });
                  }
                } else if (!currentTaskCreated) {
                  // If no currentTaskCreated, take all rejected tasks
                  rejectedTasks.push({
                    created: taskCreated,
                    body: taskBody
                  });
                }
              }
            }

            // Get the oldest rejected task (first in ascending order)
            if (rejectedTasks.length > 0) {
              // Sort by Created ascending to get the oldest
              rejectedTasks.sort(function (a, b) {
                return a.created - b.created;
              });
              lastRejectionNote = rejectedTasks[0].body || "";
            }

            showPopupWithRejectionNote();
          },
          function (sender, args) {
            // If query fails, show popup without rejection note
            showPopupWithRejectionNote();
          }
        );
      } else {
        showPopupWithRejectionNote();
      }

      function showPopupWithRejectionNote() {
        // Show popup with approve/reject buttons - using same format as Workflow.js
        var isArabic =
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar";
        var notesLabel = isArabic ? "ملاحظات" : "Notes";
        var approveLabel = isArabic ? "موافق" : "Approve";
        var rejectLabel = isArabic ? "طلب معلومات اضافية" : "Request Additional Information";
        var cancelLabel = isArabic ? "إلغاء" : "Cancel";
        var fillNotesMsg = isArabic
          ? "يرجى تعبئة الملاحظات"
          : "Please fill notes";
        var lastNoteLabel = isArabic ? "آخر ملحوظة مسجلة:" : "Last recorded note:";

        // Escape single quotes in stage IDs for use in onclick
        var stageIDApproveEscaped = (stageIDApprove || "").replace(/'/g, "\\'");
        var stageIDRejectEscaped = (stageIDReject || "").replace(/'/g, "\\'");

        // Escape HTML in rejection note
        var lastRejectionNoteEscaped = (lastRejectionNote || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "\\'").replace(/"/g, "&quot;");

        // Display rejection note section after changeItemsRow if exists
        if (showLastRejectionNote && lastRejectionNote) {
          displayRejectionNoteSection(lastRejectionNote, isArabic);
        }

        // Check if TaskType is "Submit" to hide reject button
        var showRejectButton = taskType !== "Submit";
        var rejectButtonHtml = showRejectButton 
          ? '<button class="commentsub btn btn-action" onclick="handleWorkflowApproval(false, \'' +
            stageIDApproveEscaped +
            "', '" +
            stageIDRejectEscaped +
            '\')" style="background: #853232; margin-left: 10px;">' +
            rejectLabel +
            "</button>"
          : "";

        if (isArabic) {
          $("body").append(
            '<div class="popupComment"><div class="wrapcomments">' +
            "<label>" +
            notesLabel +
            "</label>" +
            '<textarea id="commenttext" rows="4" cols="50"></textarea>' +
            "<div class='btn-cont'>" +
            '<button class="commentsub btn btn-action btn-save" onclick="handleWorkflowApproval(true, \'' +
            stageIDApproveEscaped +
            "', '" +
            stageIDRejectEscaped +
            "')\">" +
            approveLabel +
            "</button>" +
            rejectButtonHtml +
            '<button onclick="$(\'.popupComment\').remove();" class="commentsub" style="margin-left: 10px;">' +
            cancelLabel +
            "</button>" +
            "</div>" +
            '<p class="fillcomment"></p>' +
            "</div></div>"
          );
        } else {
          $("body").append(
            '<div class="popupComment"><div class="wrapcomments">' +
            "<label>" +
            notesLabel +
            "</label>" +
            '<textarea id="commenttext" rows="4" cols="50"></textarea>' +
            "<div class='btn-cont'>" +
            '<button class="commentsub btn btn-action btn-save" onclick="handleWorkflowApproval(true, \'' +
            stageIDApproveEscaped +
            "', '" +
            stageIDRejectEscaped +
            "')\">" +
            approveLabel +
            "</button>" +
            rejectButtonHtml +
            '<button onclick="$(\'.popupComment\').remove();" class="commentsub" style="margin-left: 10px;">' +
            cancelLabel +
            "</button>" +
            "</div>" +
            '<p class="fillcomment"></p>' +
            "</div></div>"
          );
        }
      }
    },
    function (sender, args) {
      alert("Error loading task information: " + args.get_message());
    }
  );
}

// Handle workflow approval/rejection - must be in global scope for onclick
window.handleWorkflowApproval = function (
  isApproved,
  stageIDApprove,
  stageIDReject
) {
  var currentTaskID = taskID || taskId || window.taskID || window.taskid;
  var comment = $("#commenttext").val();

  // If rejected, comment is required
  if (!isApproved && !comment) {
    $(".fillcomment").html(
      "<p style='color: red;'>" +
      (localStorage.getItem("lng") == "en"
        ? "Please fill notes"
        : "يرجى تعبئة الملاحظات") +
      "</p>"
    );
    return;
  }

  var stageToSet = isApproved ? stageIDApprove : stageIDReject;

  if (!stageToSet) {
    alert(
      localStorage.getItem("lng") == "en"
        ? "Stage ID not found"
        : "لم يتم العثور على معرف المرحلة"
    );
    return;
  }

  if (!currentTaskID) {
    alert(
      localStorage.getItem("lng") == "en"
        ? "Task ID not found"
        : "لم يتم العثور على معرف المهمة"
    );
    return;
  }

  // Update Task first - save comment to Body field (same as Workflow.js)
  var ctx = SP.ClientContext.get_current();
  var taskList = ctx.get_web().get_lists().getByTitle("Tasks");
  var taskItem = taskList.getItemById(parseInt(currentTaskID));

  var stageAction = isApproved ? "approve" : "reject";
  taskItem.set_item("Status", "Closed");
  taskItem.set_item("WFInstanceID", null);
  taskItem.set_item("Body", comment || "");
  taskItem.set_item("TakenAction", stageAction);
  taskItem.update();
  ctx.load(taskItem);

  ctx.executeQueryAsync(
    function () {
      // Update WFStage field in NewChangeRequests list
      var list = ctx.get_web().get_lists().getByTitle("NewChangeRequests");
      var camlQuery = new SP.CamlQuery();
      camlQuery.set_viewXml(
        "<View><Query><Where>" +
        "<Eq><FieldRef Name='Title'/><Value Type='Text'>" +
        crItemCode +
        "</Value></Eq>" +
        "</Where></Query></View>"
      );

      var items = list.getItems(camlQuery);
      ctx.load(items);
      ctx.executeQueryAsync(
        function () {
          var enumerator = items.getEnumerator();
          if (enumerator.moveNext()) {
            var item = enumerator.get_current();
            item.set_item("WFStage", stageToSet);
            
            // If approved and stageIDApprove == "approved", save Observations field
            if (isApproved && stageIDApprove && stageIDApprove.toLowerCase() === "approved") {
              var observations = $("#Observations").val() || "";
              item.set_item("Observations", observations);
            }
            
            item.update();
            ctx.load(item);
            ctx.executeQueryAsync(
              function () {
                $(".popupComment").remove();

                // If approved and stageIDApprove == "approved", call apply API
                // last stage 
                if (
                  isApproved &&
                  stageIDApprove &&
                  stageIDApprove.toLowerCase() === "approved" &&
                  crItemCode
                ) {
                  $.ajax({
                    url: `${APIURL}/general/applychangerequestchanges/${crItemCode}`,
                    method: "GET",
                    headers: { Accept: "application/json" },
                    success: function (res) {
                      alert(
                        localStorage.getItem("lng") == "en"
                          ? "Submitted successfully"
                          : "تم الإرسال بنجاح"
                      );
                      // Redirect to listing page
                      var listingUrl =
                        _spPageContextInfo.webAbsoluteUrl +
                        "/SitePages/Listing.aspx?ListKey=changerequests";
                      window.location.href = listingUrl;
                    },
                    error: function (xhr) {
                      alert(
                        localStorage.getItem("lng") == "en"
                          ? "Submitted successfully, but error applying changes"
                          : "تم الإرسال بنجاح، لكن حدث خطأ في تطبيق التغييرات"
                      );
                      // Redirect to listing page
                      var listingUrl =
                        _spPageContextInfo.webAbsoluteUrl +
                        "/SitePages/Listing.aspx?ListKey=changerequests";
                      window.location.href = listingUrl;
                    },
                  });
                } else {
                  alert(
                    localStorage.getItem("lng") == "en"
                      ? "Submitted successfully"
                      : "تم الإرسال بنجاح"
                  );
                  // Redirect to listing page
                  var listingUrl =
                    _spPageContextInfo.webAbsoluteUrl +
                    "/SitePages/Listing.aspx?ListKey=changerequests";
                  window.location.href = listingUrl;
                }
              },
              function (sender, args) {
                alert(
                  localStorage.getItem("lng") == "en"
                    ? "Error updating item"
                    : "خطأ في تحديث العنصر"
                );
              }
            );
          } else {
            alert(
              localStorage.getItem("lng") == "en"
                ? "Item not found"
                : "لم يتم العثور على العنصر"
            );
          }
        },
        function (sender, args) {
          alert(
            localStorage.getItem("lng") == "en"
              ? "Error loading items"
              : "خطأ في تحميل العناصر"
          );
        }
      );
    },
    function (sender, args) {
      alert(
        localStorage.getItem("lng") == "en"
          ? "Error updating task"
          : "خطأ في تحديث المهمة"
      );
    }
  );
};

