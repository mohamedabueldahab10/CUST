// var logo = require("../../../HelperRessources/img/print-logo.png");
var logo = "";
//= isArabic ? require('../../../HelperRessources/img/main-logo.svg') : require('../../../HelperRessources/img/main-logo-en.svg');
(window.isNew = window.location.href.toLowerCase().indexOf("new.aspx") > -1),
  (window.isEdit =
    window.location.href.toLowerCase().indexOf("edit.aspx") > -1),
  (window.isView =
    window.location.href.toLowerCase().indexOf("view.aspx") > -1),
  window.JSON_File_Name,
  (window.MasterDetailsArrayRequest = []),
  (window.MasterDetailsArrayNew = []),
  (window.MasterDetailsArrayEdit = []),
  (window.stringUniqueArr = []),
  (window.RelativeServerURL =
    _spPageContextInfo.siteServerRelativeUrl == "/"
      ? ""
      : _spPageContextInfo.siteServerRelativeUrl);
window.isPrint = false;
window.valueBasedOnParent = []; //valueBasedOnParent for wf delivrable as an ex
var attachCount = 0;
var printDate;
var pluseAttachCount = 0;
var RevenuesAmount = 0;
var RevenuesAmountInit = 0;
var revenuesAmountInitMiles = 0;
var parentBudgetValue = 0;
var HolidaysOff = [];
var EngineeringProjectCode = null;
var LastProjectHistory = [];
var ManHoursHistory = [];
var requiredFieldsSections = []; // return required field when show hide toggle for master like deliv and miles in proj when change on zero proj
if (typeof window.getMasterDetailCodeIndex !== "function") {
  window.getMasterDetailCodeIndex = function (title, fallbackId) {
    var lastPart = String(title || "").split("-").pop();
    var idx = parseInt(lastPart, 10);
    if (!isNaN(idx) && idx > 0) {
      return idx;
    }
    var idNum = parseInt(fallbackId, 10);
    return !isNaN(idNum) && idNum > 0 ? idNum : 0;
  };
}
if (typeof window.getNextMasterDetailIndex !== "function") {
  window.getNextMasterDetailIndex = function ($section) {
    var maxIndex = 0;
    if (!$section || !$section.length) {
      return 1;
    }
    $section.find(".Details-Item").each(function () {
      var idx = parseInt($(this).attr("data-index"), 10);
      if (!isNaN(idx) && idx > maxIndex) {
        maxIndex = idx;
      }
    });
    return maxIndex + 1;
  };
}
if (
  localStorage.getItem("lng") == null ||
  localStorage.getItem("lng") == "ar"
) {
  var enternameemail = Resources.ar["enternameemail"];
  window.notEditableItem = Resources.ar["notEditableItem"];
  window.editablebyowneronly = Resources.ar["editablebyowneronly"];
} else {
  var enternameemail = Resources.en["enternameemail"];
  window.notEditableItem = Resources.en["notEditableItem"];
  window.editablebyowneronly = Resources.en["editablebyowneronly"];
}

if (
  localStorage.getItem("lng") == null ||
  localStorage.getItem("lng") == "ar"
) {
  var No_Data = "لا يوجد";
} else {
  var No_Data = "No Data";
}

// Url Parameters
(window.IID = ""),
  window.SP_ListName,
  window.listkey,
  window.isPrjRelated,
  (window.KeysFolders = []),
  window.PageTitle,
  (window.PCODE = ""),
  (window.ICODE = ""),
  (window.STCODE = ""),
  (window.sosCode = ""),
  (window.PCODE_STRING = ""),
  (window.KPICODE_STRING = "");
window.btnDeleteLabel = "";
var siteRootName = window.location.href.split("/")[4];
window.validattachments = [];
if (window.location.href.indexOf("IID=") > -1) {
  IID = window.location.href.split("IID=")[1].split("&")[0];
}
if (window.location.href.indexOf("ListKey") > -1) {
  listkey = window.location.href.split("ListKey=")[1].split("&")[0];
  isPrjRelated = USERProjRelated.indexOf(listkey) > -1 ? true : false;
  for (var i = 0; i < ListArray.length; i++) {
    var obj = ListArray[i];
    if (obj.subfolder) KeysFolders.push(Object.keys(obj)[0]);
    for (var key in obj) {
      if (key == window.location.href.split("ListKey=")[1].split("&")[0]) {
        SP_ListName = obj[key];
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          PageTitle = obj["FormTitle"];
          btnDeleteLabel = obj["DeleteLabel"];
        } else {
          PageTitle = obj["TitleEn"];
          btnDeleteLabel = obj["DeleteLabelEn"];
        }
      }
    }
  }
}

if (window.location.href.indexOf("PCODE=") > -1) {
  PCODE = window.location.href.split("PCODE=")[1].split("&")[0];
  PCODE_STRING = "&PCODE=" + PCODE;
} else if (window.location.href.indexOf("ICODE=") > -1) {
  ICODE = window.location.href.split("ICODE=")[1].split("&")[0];
  PCODE_STRING = "&ICODE=" + ICODE;
} else if (window.location.href.indexOf("STCODE=") > -1) {
  STCODE = window.location.href.split("STCODE=")[1].split("&")[0];
  PCODE_STRING = "&STCODE=" + STCODE;
} else if (window.location.href.indexOf("sosCode=") > -1) {
  sosCode = decodeURIComponent(window.location.href.split("sosCode=")[1].split("&")[0]);
  PCODE_STRING = "&sosCode=" + encodeURIComponent(sosCode);
}
//determinig json file name
if (isNew) {
  JSON_File_Name =
    window.location.href.split("ListKey=")[1].split("&")[0] + "_New.js";
} else if (isEdit) {
  JSON_File_Name =
    window.location.href.split("ListKey=")[1].split("&")[0] + "_Edit.js";
} else if (isView) {
  JSON_File_Name =
    window.location.href.split("ListKey=")[1].split("&")[0] + "_View.js";
}
//calling relevant function
var checkStatusHtml = setInterval(function () {
  if (isView) View_ListInfo.preinit();
  else if (!isView) {
    ListInfo.preinit();
  }
}, 1000);

window.extractYearFromDateValue = function (dateVal) {
  if (!dateVal) return "";
  var s = String(dateVal).trim();
  var iso = s.match(/^(\d{4})[-/]/);
  if (iso) return iso[1];
  var parts = s.split(/[\/\-\.]/);
  for (var i = 0; i < parts.length; i++) {
    if (/^\d{4}$/.test(parts[i])) return parts[i];
  }
  var parsed = new Date(s);
  if (!isNaN(parsed.getTime())) {
    var y = parsed.getFullYear();
    if (y >= 1900 && y <= 2099) return String(y);
  }
  return "";
};

window.syncYearFromDateField = function (el) {
  var $el = $(el);
  var targetId = $el.attr("data-setyeartofield") || "ToDate";
  var year = window.extractYearFromDateValue($el.val());
  if (!year) return;
  var $target = $("#" + targetId);
  if ($target.length) {
    $target.val(year).trigger("change");
  }
};

window.bindBenefitPlannedDateToYear = function () {
  if (typeof listkey === "undefined" || listkey != "benefits") return;
  if (typeof isNew === "undefined" || !isNew) return;
  $(document)
    .off("change.benefitToYear input.benefitToYear")
    .on(
      "change.benefitToYear input.benefitToYear",
      "#PlannedAchievementDate",
      function () {
        window.syncYearFromDateField(this);
      }
    );
  var $planned = $("#PlannedAchievementDate");
  if ($planned.length && $planned.val()) {
    window.syncYearFromDateField($planned[0]);
  }
};

$(document).on(
  "change.benefitToYear input.benefitToYear",
  "#PlannedAchievementDate",
  function () {
    if (typeof listkey === "undefined" || listkey != "benefits") return;
    if (typeof isNew === "undefined" || !isNew) return;
    window.syncYearFromDateField(this);
  }
);

//for edit and new forms
window.ListInfo = {
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".container-body").length) {
      //username
      $(".navbar .user-name").text(
        UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join("")
      );
      $(".user-name-full").text(UserN.Title);
      clearInterval(checkStatusHtml);
      //get form's json
      $.getScript(
        "" +
          _spPageContextInfo.webAbsoluteUrl +
          "/Style%20Library/spm/JSON/" +
          listkey +
          "/" +
          JSON_File_Name
      ).done(function (script, textStatus) {
        SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
          ListInfo.InfoLoop();
        });
      });
    }
  },
  InfoLoop: function () {
    var htmlBuilder = isWF
      ? '<div class="section1 approvalHeader col-12"><div class="d-flex justify-content-between w-100"><div class=""><span class="bold Resources" data-trans-' +
        USERlistkey +
        "></span>" +
        " " +
        '<span class="mx-3 wf-project-name"></span></div><div class=""><span class="bold Resources" data-trans-taskname></span><span class="mx-3 wf-task-name"></span></div></div></div><h2 class="approvalHeader Resources"></h2>'
      : "";

    // var htmlBuilder = "";
    var Label, Description;
    var printHtml = "";
    var toggleSectionName;
    var selectedInitiativeDeliverable;
    // to handle the default form value
    var formDefaultValues = [],
      dataFormDefaultValue = "";

    var workflowSetValues = [],
      dataWorkflowSetValues = "";

    var basedOnParentSetValues = [],
      dataBasedOnParentSetValues = "";

    var basedOnParentSetValuesListiner = "";
    var notBasedOnParentSetValues = [],
    dataNotBasedOnParentSetValues = "";

    asyncFor.seqProcess(
      Information_Form,
      function (item, index, resolve) {
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          Label = item.label;
          Description = item.description;
        } else {
          Label = item.labelEn;
          Description = item.descriptionEn;
        }

        // to handle the default form value
        formDefaultValues = item.formDefaultValues;

        if (formDefaultValues && formDefaultValues.length) {
          dataFormDefaultValue =
            'data-formdefaultvalue="' +
            JSON.stringify(formDefaultValues).replaceAll(`"`, `'`) +
            '"';
        } else {
          dataFormDefaultValue = "";
        }

        // to handle the workflowSetValues
        workflowSetValues = item.workflowSetValues;

        if (workflowSetValues && workflowSetValues.length) {
          dataWorkflowSetValues =
            'data-workflowSetValue="' +
            JSON.stringify(workflowSetValues).replaceAll(`"`, `'`) +
            '"';
        } else {
          dataWorkflowSetValues = "";
        }
        //

        //to handle set value based on parent
        basedOnParentSetValues = item.formValuesBasedOnParent;
        if (basedOnParentSetValues && basedOnParentSetValues.length) {
          dataBasedOnParentSetValues =
            'data-basedOnParentSetValues="' +
            JSON.stringify(basedOnParentSetValues).replaceAll(`"`, `'`) +
            '"';

          var code = "";
          if (PCODE) {
            code = PCODE;
          } else if (ICODE) {
            code = ICODE;
          }
          // else if (listkey == "mainkpi") {
          //   basedOnParentSetValuesListiner = basedOnParentSetValues

          //   var listinerField = basedOnParentSetValuesListiner[0].listinerField

          //   code = $(`#${listinerField}`).val()
          // }
          if (PCODE || ICODE) {
            basedOnParentSetValues.forEach((el) => {
              get_parent_data.init(
                el.parentList,
                code,
                el.parentFieldName,
                el.fieldName,
                el.getGrandParent
              ); // to get value from parent list to use it when submit
            });
          } else {
            basedOnParentSetValuesListiner = basedOnParentSetValues;

            var listinerField = basedOnParentSetValuesListiner[0].listinerField;

            $("body").on("change", `#${listinerField}`, function (event) {
              // change it to body to can invoke the listiner in master details
              get_parent_data.init(
                basedOnParentSetValuesListiner[0].parentList,
                event.target.value,
                basedOnParentSetValuesListiner[0].parentFieldName,
                basedOnParentSetValuesListiner[0].fieldName,
                basedOnParentSetValuesListiner[0].getGrandParent
              ); // to get value from parent list to use it when submit
            });
          }
        } else {
          dataBasedOnParentSetValues = "";
        }
        notBasedOnParentSetValues = item.formValuesNotBasedOnParent;
        if (notBasedOnParentSetValues && notBasedOnParentSetValues.length) {
          dataNotBasedOnParentSetValues =
            'data-notbasedonparentsetvalues="' +
            JSON.stringify(notBasedOnParentSetValues).replaceAll(`"`, `'`) +
            '"';
        } else {
          dataNotBasedOnParentSetValues = "";
        }
        //

        toggleSectionName = item.toggleName;

        //Handle security
        var groups = [],
          notAllowForGroups = [], //notAllowForGroups  to make the field disable if  not allow for current group and on current form like groups
          targetList = "",
          sectionType = "",
          rendersection = true;
        if (item.hasOwnProperty("security")) {
          if (item.security.groups.length > 0) {
            for (var z = 0; z < item.security.groups.length; z++) {
              groups.push(item.security.groups[z]);

              if (Groups.indexOf(item.security.groups[z]) == -1) {
                rendersection = false;
              } else {
                rendersection = true;
                // break; // to save all groups in data-groups to can open and close the fields
              }
            }
            groups = groups.join(" ");
          }
          ///
          if (item.security.notAllowTo && item.security.notAllowTo.length > 0) {
            for (var i = 0; i < item.security.notAllowTo.length; i++) {
              notAllowForGroups.push(item.security.notAllowTo[i]);
            }

            // notAllowForGroups = notAllowForGroups.join(" ");

            notAllowForGroups =
              'data-notallowforgroups="' +
              JSON.stringify(notAllowForGroups).replaceAll(`"`, `'`) +
              '"';
          }
        }

        if (item.hasOwnProperty("sectiontype")) {
          //both attr should be available
          targetList = 'data-target_list="' + item.targetlist + '"';
          sectionType = 'data-section_type="' + item.sectiontype + '"';
        }

      
        
        
        
        htmlBuilder +=
          '<div style="display:' +
          item.display +
          '" class="py-5 border-bottom section-container ' +
          listkey +
          ' " ' +
          targetList +
          " " +
          sectionType +
          ' data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ">" +
          '<div class="form-row">' +
          '<div class="col-lg-3 col-md-4 mb-4">' +
          "<h3 class='sideTitle'>" +
          Label +
          "</h3>" +
          '<span class="font-14">' +
          Description +
          "</span>" +
          "</div>" +
          "<div data-togglename=" +
          toggleSectionName +
          " " +
          dataFormDefaultValue +
          " " +
          dataWorkflowSetValues +
          " " +
          dataBasedOnParentSetValues +
          " " + dataNotBasedOnParentSetValues +
          ' class="col-lg-9 col-md-8 white-box p-4 fieldset-container ' +
          item.className +
          '">';
          
        asyncFor.seqProcess(
          item.subFields,
          function (subitemField, indexField, resolveField) {
            ListInfo.RenderForm(
              subitemField,
              null,
              function (flag, htmlResult) {
                resolveField(subitemField, indexField, {
                  htmlResult: htmlResult,
                });
              }
            );
          },
          function (subitemField, indexField, dataField, isDoneField) {
            htmlBuilder += dataField.htmlResult;
            if (isDoneField) {
              resolve(item, index, dataField, true);
            }
          }
        );
      },
      function (item, index, data, isDone) {
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          Label = item.label;
        } else {
          Label = item.labelEn;
        }
        // console.log('Finishing label ' + Label + ' - IsDone: ' + isDone);
        htmlBuilder += "</div></div></div>";

        if (isDone) {
          actionTaskHeader = "";
          if (isWF) {
            actionTaskHeader =
              '<h2 class="approvalHeader Resources mb-5" data-trans-taskDecision>	القرار</h2>';
          }
          htmlBuilder +=
            '<div class="py-5 btnactionrow savecancelBtns">' +
            actionTaskHeader +
            '<div class="form-row justify-content-end form-btns-wrapper">' +
            '<button data-trans-CancelButton class="btn btn-action btn-cancel cancel Resources" type="button"></button>' +
            '<button data-trans-SaveButton class="btn btn-action btn-save Resources" type="button"></button>' +
            "</div>" +
            "</div>";

          $(".container-body").html(htmlBuilder);

          // working on integration btn
          if (
            (isEdit && PCODE && listkey == "projectcharter") ||
            (isEdit && ICODE && listkey == "initiativecards")
          ) {
            if (
              localStorage.getItem("lng") == null ||
              localStorage.getItem("lng") == "ar"
            ) {
              $(".form-btns-wrapper").append(
                '<button  class="data-trans-integrationbutton btn btn-action integration-save Resources" type="button">الربط مع نظام الأرشفة</button>'
              );
            } else {
              $(".form-btns-wrapper").append(
                '<button  class="data-trans-integrationbutton btn btn-action integration-save Resources" type="button">Integration With Achive</button>'
              );
            }
            $(".integration-save").css({
              "pointer-events": "none",
              opacity: "0.6",
              "min-width": "25rem",
            });
          }
          // end working on integration btn

          // hide section create in cr
          //           // hide creation section in cr if there is no access
          if (
            CreateChangeRequest_Access.length == 0 &&
            listkey == "changerequest" &&
            isNew
          ) {
            $(".container-body .section-container.changerequest:first").hide();
          }
          //

          //$('.project-Title-Name').text(PageTitle);
          $(".breakLine").before('<div class="col-md-12"></div>');
          SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
            if (
              (workflowname == "Project" || SP_ListName == "Projects") &&
              IID
            ) {
              GetProject_Info.init();
            } else {
              GetCurrentStage_Info.init();
            }
          });
          changeResources();
          //handle master details
          // var masterDetailsIndex = 1
          if ($("[data-section_type]").length > 0) {
            $("[data-section_type]").each(function () {
              Masterindex = "1";
              MasterDetailsArrayRequest.push($(this).attr("data-target_list"));
              // if(isNew)
              // {
              $(this)
                .find(".fieldset-container > .CFIELD")
                .wrapAll(
                  '<div class="Details-Item NewItem" data-index="' +
                    Masterindex +
                    '"></div>'
                );
              // }
              // else if(isEdit)
              // {
              //     $(this).find('.fieldset-container > .CFIELD').wrapAll('<div class="Details-Item EditItem"></div>');
              // }
            });
            //pluss
            MasterDetailsArrayRequest = Array.from(
              new Set(MasterDetailsArrayRequest)
            ); //remove duplicates

            MasterDetailsArrayNew = MasterDetailsArrayRequest;
            MasterDetailsArrayEdit = MasterDetailsArrayRequest;
            if (isNew) {
              ListInfo.g.newDetail();
            }
          }
          if (ListInfo.g.uniqueMasterDetailRadioNames) {
            ListInfo.g.uniqueMasterDetailRadioNames();
          }
          //handle people picker inputs
          $("div[type=picker]").each(function () {
            var mp = new MyPeoplePicker();
            var pickerId = $(this).attr("id");
            var currentPickerId = pickerId; // Store in local variable to avoid closure issues
            mp.init(
              pickerId,
              {
                PrincipalAccountType: "User",
                AllowMultipleValues: false,
              },
              function () {
                // Special handling for DelegateFrom field in delegations
                if (listkey == "delegations" && currentPickerId == "DelegateFrom") {
                  var allowedRoles = ["InitiativeManager", "InitiativeOwner", "ProjectManager", "ProjectOwner", "KPIOwner", "ObjectiveOwner","PerformanceLeader"];
                  var currentRole = window.currentUserRole || "";
                  
                  if (allowedRoles.indexOf(currentRole) > -1) {
                    // In New mode: set current user and wait for resolution
                    if (isNew && UserN && UserN.LoginName) {
                      setTimeout(function() {
                        var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[currentPickerId + "_TopSpan"];
                        if (peoplePicker) {
                          peoplePicker.AddUserKeys(UserN.LoginName);
                          
                          // Wait for user to be resolved, then add missing fields
                          setTimeout(function() {
                            var hiddenInput = $("#" + currentPickerId + "_TopSpan_HiddenInput");
                            if (hiddenInput.length && hiddenInput.val()) {
                              try {
                                var inputValue = hiddenInput.val().replace(/&quot;/g, '"');
                                var userData = JSON.parse(inputValue);
                                if (userData && userData.length > 0) {
                                  var user = userData[0];
                                  if (!user.AutoFillKey) user.AutoFillKey = user.Key || UserN.LoginName;
                                  if (!user.AutoFillDisplayText) user.AutoFillDisplayText = user.DisplayText || UserN.Title;
                                  if (!user.AutoFillSubDisplayText) user.AutoFillSubDisplayText = (user.EntityData && user.EntityData.Title) ? user.EntityData.Title : "";
                                  if (!user.AutoFillTitleText) {
                                    var email = (user.EntityData && user.EntityData.Email) ? user.EntityData.Email : "";
                                    user.AutoFillTitleText = email + "\n" + (user.ProviderDisplayName || "") + "\n" + (user.Description || "");
                                  }
                                  if (!user.DomainText) {
                                    var domainMatch = user.Key ? user.Key.match(/[^|]+$/i) : null;
                                    user.DomainText = domainMatch ? domainMatch[0].split('\\')[0] : window.location.hostname;
                                  }
                                  if (!user.LocalSearchTerm) {
                                    user.LocalSearchTerm = user.DisplayText ? user.DisplayText.split(' ')[0].toLowerCase() : "";
                                  }
                                  hiddenInput.val(JSON.stringify(userData));
                                  $("#" + currentPickerId).find(".sp-peoplepicker-userSpan").removeAttr("aria-invalid");
                                  $("#" + currentPickerId).removeClass("picker-error").addClass("picker-valid");
                                  
                                  var $groupsPicker = $("#GroupName");
                                  if ($groupsPicker.length) {
                                    var userLogin = user.Key || user.AutoFillKey || UserN.LoginName;
                                    if (userLogin) {
                                      loadUserGroupsFromSharePoint(userLogin, "GroupName");
                                    }
                                  }
                                }
                              } catch (e) {}
                            }
                            $(".PPField.SPIField.form-control#DelegateFrom").attr('disabled', true);
                            $("#DelegateFrom_TopSpan_InitialHelpText").css('display', 'none');
                          }, 2000);
                        } else {
                          $(".PPField.SPIField.form-control#DelegateFrom").attr('disabled', true);
                          $("#DelegateFrom_TopSpan_InitialHelpText").css('display', 'none');
                        }
                      }, 500);
                    } else {
                      // In Edit mode: just disable
                      setTimeout(function() {
                        $(".PPField.SPIField.form-control#DelegateFrom").attr('disabled', true);
                        $("#DelegateFrom_TopSpan_InitialHelpText").css('display', 'none');
                      }, 500);
                    }
                  }
                }
              }
            );
          });
          $("div[type=multipicker]").each(function () {
            var mp = new MyPeoplePicker();
            mp.init(
              $(this).attr("id"),
              {
                PrincipalAccountType: "User",
                AllowMultipleValues: true,
              },
              function () {
              }
            );
          });
          
          // handling dynamic fields that change data on the form
          $("select[dynamic=mainfield]").on("change", function () {
            var dyfieldname = $(this).attr("id");
            var dyid = $(this)
              .find("option[value=" + $(this).val() + "]")
              .attr("option-id");
            if (dyid) {
              Dynamic_Data_Request.init(
                $(this).data("listname"),
                dyid,
                dyfieldname
              );
            }
          });
          // date controlling feature
          $("[date-controling-field]").each(function(){

            let maxDateField = $(this).attr("date-max-field");
            // let minDateField = $(this).attr("date-min-field");
            let dateControlingInput = $(this).attr("date-controling-field");
            dateControlingInput = $(`#${dateControlingInput}`);
            let $this = $(this);
            dateControlingInput.on("change", function (e){
              let controlingCode = $(this).val();
              // let controlingCodeForMinDate = $(this).val();
              let controlingListName = $(this).data("listname");
              // let controlingListNameForMinDate = $(this).data("listname");
              date_Controlling_Call.init(controlingListName, controlingCode, maxDateField, dateControlingInput, $this);
              // date_Controlling_Call.init(controlingListName, controlingCode, maxDateField, dateControlingInput, $this,minDateField,controlingListNameForMinDate, controlingCodeForMinDate);
            });
          });


          // this affectes on lookup selects
          $("select[dynamic=parent]").on("change", function () {
            let parentFieldName = $(this).attr("id");
            let parentFieldValue =
              typeof ListInfo !== "undefined" &&
              ListInfo.g &&
              ListInfo.g.getEffectiveFieldValue
                ? ListInfo.g.getEffectiveFieldValue($(this))
                : $(this).val() ||
                  $(this).attr("value") ||
                  $(this).attr("data-lookup-value") ||
                  "";
            let isDisabled = $(this).prop("disabled");
            let customFilterValue = $(this)
              .find("option[value=" + parentFieldValue + "]")
              .data("customfiltervalue");

            let isCustomFilterValue = $(this).attr("iscustomfiltervalue");

            let affectedSelectsInfo = [];

            let parentCustomFilterValueFromSibling = $(this).attr(
              "data-parentcustomfiltervalue"
            );
            let notInvokeListiner = $(this).data("notinvokelistiner");
            let forceCascadeObjectives = $(this).data("forcecascadeobjectives");
            if(!isDisabled){
            $("[dynamic=" + parentFieldName + "]").each(function () {
              let affectedFieldName = $(this).attr("id");
              let listName = $(this).data("listname");
              let filterField = $(this).data("filterfield");
              let filterFieldType = $(this).data("filterfieldtype");
              let valFieldKey = $(this).data("valfieldkey");
              let dispFieldKey = $(this).data("dispfieldkey");
              // let specificVal = $(this).data("queryfieldvalue");
              let queryFieldValue = $(this).data("queryfieldvalue");
              let queryFieldName = $(this).data("queryfield");
              let queryFieldType = $(this).data("queryfieldtype");

              affectedSelectsInfo.push({
                affectedFieldName: affectedFieldName,
                listName: listName,
                isCustomFilterValue: isCustomFilterValue,
                filterField: filterField,
                filterFieldType: filterField,
                parentFieldValue: parentFieldValue,
                customFilterValue: customFilterValue,
                filterFieldType: filterFieldType,
                valFieldKey: valFieldKey,
                dispFieldKey: dispFieldKey,
                queryFieldValue: queryFieldValue,
                queryFieldName: queryFieldName,
                queryFieldType: queryFieldType,
                parentCustomFilterValueFromSibling:
                  parentCustomFilterValueFromSibling,
                additionalFilterField: $(this).data("additionalfilterfield"),
                additionalFilterFieldType: $(this).data("additionalfiltertype"),
                additionalFilterFromField: $(this).data("additionalfilterfrom"),
                additionalFilterRequireWhenTypes: $(this).attr(
                  "data-additionalfilterrequiretypes"
                ),
                additionalFilterTypesFormField: $(this).attr(
                  "data-additionalfiltertypesfield"
                ),
                additionalFilterLookupId:
                  $(this).attr("data-additionalfilterlookupid") === "true",
                // dataSiblingvalue:dataSiblingvalue
              });
            });

            // added to handel the field to be dynamicparemnt and other (the filed can be parent and child on the same time)
            $("[seconeddynamic*=" + parentFieldName + "]").each(function () {
              let affectedFieldName = $(this).attr("id");
              let listName = $(this).data("listname");
              let filterField = $(this).data("filterfield");
              let filterFieldType = $(this).data("filterfieldtype");
              let valFieldKey = $(this).data("valfieldkey");
              let dispFieldKey = $(this).data("dispfieldkey");
              // let specificVal = $(this).data("queryfieldvalue");
              let queryFieldValue = $(this).data("queryfieldvalue");
              let queryFieldName = $(this).data("queryfield");
              let queryFieldType = $(this).data("queryfieldtype");

              // let dataSiblingvalue = $(this).data("siblingvalue")

              // console.log($(this).data("queryFieldValue"), "sssssssa")
              affectedSelectsInfo.push({
                affectedFieldName: affectedFieldName,
                listName: listName,
                isCustomFilterValue: isCustomFilterValue,
                filterField: filterField,
                filterFieldType: filterField,
                parentFieldValue: parentFieldValue,
                customFilterValue: customFilterValue,
                filterFieldType: filterFieldType,
                valFieldKey: valFieldKey,
                dispFieldKey: dispFieldKey,
                queryFieldValue: queryFieldValue,
                queryFieldName: queryFieldName,
                queryFieldType: queryFieldType,
                parentCustomFilterValueFromSibling:
                  parentCustomFilterValueFromSibling,
                additionalFilterField: $(this).data("additionalfilterfield"),
                additionalFilterFieldType: $(this).data("additionalfiltertype"),
                additionalFilterFromField: $(this).data("additionalfilterfrom"),
                additionalFilterRequireWhenTypes: $(this).attr(
                  "data-additionalfilterrequiretypes"
                ),
                additionalFilterTypesFormField: $(this).attr(
                  "data-additionalfiltertypesfield"
                ),
                additionalFilterLookupId:
                  $(this).attr("data-additionalfilterlookupid") === "true",
                // dataSiblingvalue:dataSiblingvalue
              });
            });
            //
            //

            if (notInvokeListiner && !forceCascadeObjectives) {
              // will not invoke the function if this attr true (we use it on hrsd initiative to filter on sos when chose startegy and level)
              console.log("Inside not invoke listiner");
            } else {
              if (forceCascadeObjectives) {
                $(this).removeData("forcecascadeobjectives");
              }
              dynamicAffectSelect.init(affectedSelectsInfo);
            }
          }});

          $(document)
            .off("change.formAdditionalFilterChain", "select")
            .on("change.formAdditionalFilterChain", "select", function (event) {
              var fid = $(this).attr("id");
              if (!fid) {
                return;
              }
              var $deps = $(
                "select[data-additionalfilterfrom], ul[data-additionalfilterfrom]"
              ).filter(function () {
                var v =
                  $(this).attr("data-additionalfilterfrom") ||
                  $(this).data("additionalfilterfrom");
                return v === fid;
              });
              if (!$deps.length) {
                return;
              }
              $deps.each(function () {
                var depId = $(this).attr("id");
                if (depId) {
                  var $depCtrl = $("#" + depId);
                  // Re-sync level / grand-child query metadata (same as grandFieldInvoke)
                  // so SO lists always read current RelatedObjectiveLevel when only SubSector changes.
                  $(".grandFieldInvoke").each(function () {
                    var cid = $(this).data("childfieldid");
                    if (!cid || cid !== depId) {
                      return;
                    }
                    var elVal = $(this).val();
                    var srcName = $(this).data("childfieldidsource");
                    if (elVal && srcName) {
                      var $child = $("#" + cid);
                      if ($child.length) {
                        $child.data("queryfield", srcName);
                        $child.data("queryfieldvalue", elVal);
                        $child.data("queryfieldtype", "Text");
                      }
                    }
                  });
                  if ($depCtrl.length && $depCtrl.attr("type") === "multiselect") {
                    $depCtrl
                      .find("ul.dropdown-menu input:checked")
                      .prop("checked", false);
                    $depCtrl.find("ul.dropdown-menu").html("");
                  } else if ($depCtrl.length && $depCtrl.is("select")) {
                    // User changed SubSector (etc.): wipe persisted lookup value too.
                    // Programmatic triggers keep data-lookup-value so edit load can restore.
                    if (
                      event.originalEvent &&
                      typeof ListInfo !== "undefined" &&
                      ListInfo.g &&
                      ListInfo.g.clearSelectFieldValue
                    ) {
                      ListInfo.g.clearSelectFieldValue($depCtrl);
                    } else {
                      $depCtrl.val("");
                    }
                  }
                }
                var parentDyn = $(this).attr("dynamic");
                if (!parentDyn) {
                  return;
                }
                var $p = $("#" + parentDyn);
                if (!$p.length || !$p.val()) {
                  return;
                }
                // RelatedStrategy has notInvokeListiner; without this flag change() is ignored and SOs never reload
                $p.data("forcecascadeobjectives", true);
                $p.trigger("change");
              });
            });
          
          // Handle lookupWithDynamicQuery - update lookup when source field changes
          $(document).on("change", "select, input", function () {
            var sourceFieldName = $(this).attr("id");
            if (!sourceFieldName) return;
            
            // Check if any lookupWithDynamicQuery field depends on this field
            $(".lookupWithDynamicQuery[data-queryfieldvaluefromfield='" + sourceFieldName + "']").each(function () {
              var $lookupField = $(this);
              var sourceFieldValue = $("#" + sourceFieldName).val();
              var listName = $lookupField.data("listname");
              var valFieldKey = $lookupField.data("valfieldkey");
              var dispFieldKey = $lookupField.data("dispfieldkey");
              var queryField = $lookupField.data("queryfield");
              var queryFieldType = $lookupField.data("queryfieldtype");
              
              // Clear current options except the first one
              $lookupField.find("option:not(:first)").remove();
              $lookupField.val("");
              
              if (sourceFieldValue) {
                var customQuery =
                  "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"" +
                  queryField +
                  '" /><Value Type="' +
                  queryFieldType +
                  '">' +
                  sourceFieldValue +
                  "</Value></Eq></And></Where><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";
                
                var itemsID = [];
                sphttp.get(
                  _spPageContextInfo.siteServerRelativeUrl,
                  listName,
                  customQuery,
                  [valFieldKey, dispFieldKey],
                  function (records, record, listItem, isDone) {
                    if (listItem) itemsID.push(listItem.get_id());
                    if (isDone) {
                      records.forEach(function (el, index) {
                        $lookupField.append(
                          '<option option-id="' +
                          itemsID[index] +
                          '" value="' +
                          el[valFieldKey] +
                          '">' +
                          el[dispFieldKey] +
                          "</option>"
                        );
                      });
                    }
                  }
                );
              }
            });
          });
          
          //max min dates
          $("input[type=date]:not([minimumdate=undefined])").change(
            function () {
              var start = $("#" + $(this).attr("minimumdate"));
              if ($(this).val()) start.attr("max", $(this).val());
            }
          );
          $("input[type=date]:not([maximumdate=undefined])").change(
            function () {
              var end = $("#" + $(this).attr("maximumdate"));
              if ($(this).val()) end.attr("min", $(this).val());
            }
          );
          $(
            'input[type=number][data-manipulates="year"]:not([mindata=undefined])'
          ).change(function () {
            var minData = $("#" + $(this).attr("mindata"));
            if ($(this).val()) minData.attr("max", $(this).val());
          });
          $(
            'input[type=number][data-manipulates="year"]:not([maxdata=undefined])'
          ).change(function () {
            var maxData = $("#" + $(this).attr("maxdata"));
            if ($(this).val()) maxData.attr("min", $(this).val());
          });
          $(".showhide-trigger").on("click", function () {
            if ($(this).hasClass("active")) {
              $(this).parent().find(":not(.showhide-trigger)").fadeIn();
              $(this).removeClass("active");
              $(this).parent().find("label").css("display", "inline-block");
            } else {
              $(this).parent().find(":not(.showhide-trigger)").fadeOut();
              $(this).addClass("active");
            }
          });
          //new validation listiner

          //////////////////////////////// get siblings value like AcceptanceCriteria in benefits when change on delivrable

          if (typeof window.bindBenefitPlannedDateToYear === "function") {
            window.bindBenefitPlannedDateToYear();
          }

          $("body").on("change", ".getsiblingdata", function (event) {
            // get sibling value based on oter value

            var siblingData = $(this).find(":selected").data("siblingvalue");
            var siblingTarget = $(this).data("siblingtarget");

            if (siblingTarget && siblingTarget != "undefined") {
              $(this)
                .parent()
                .parent()
                .find(`#${siblingTarget}`)
                .val(siblingData);
            }

            // handle array values

            var arraySibling = $(this)
              .find(":selected")
              .data("arraysiblingvalues");

            if (arraySibling && arraySibling.length) {
              arraySibling = eval(arraySibling);

              arraySibling.forEach((el) => {
                if (listkey == "projects") {
                  if (el.name == "StartDate") {
                    // to handle project baselinestart and finish to be with duration of initiative
                    var finishDate = arraySibling.filter(function (a) {
                      return a.name == "FinishDate";
                    });

                    let projectBaseLineFinishDate = "";
                    let projectBaseLineStartDate = "";

                    if (el.value) {
                      if (finishDate.length) {
                        projectBaseLineFinishDate = new Date(
                          finishDate[0].value
                        )
                          .toISOString()
                          .split("T")[0];
                      }

                      projectBaseLineStartDate = new Date(el.value)
                        .toISOString()
                        .split("T")[0];
                    }

                    $("input#BaselineStartDate").attr(
                      "min",
                      projectBaseLineStartDate
                    );
                    $("input#BaselineStartDate").attr(
                      "max",
                      projectBaseLineFinishDate
                    );
                  } else if (el.name == "FinishDate") {
                    var startDate = arraySibling.filter(function (a) {
                      return a.name == "StartDate";
                    });

                    let projectBaseLineStartDate = "";
                    let projectBaseLineFinishDate = "";
                    if (el.value) {
                      if (startDate.length) {
                        projectBaseLineStartDate = new Date(startDate[0].value)
                          .toISOString()
                          .split("T")[0];
                      }

                      projectBaseLineFinishDate = new Date(el.value)
                        .toISOString()
                        .split("T")[0];
                    }

                    $("input#BaselineFinishDate").attr(
                      "min",
                      projectBaseLineStartDate
                    );
                    $("input#BaselineFinishDate").attr(
                      "max",
                      projectBaseLineFinishDate
                    );
                  } else {
                    $(this).parent().parent().find(`#${el.name}`).val(el.value);
                  }
                } else {
                  $(this).parent().parent().find(`#${el.name}`).val(el.value);
                }
              });
            }
          });
          ////////////////////////////// calculate the tax 15% as ksa
          $("input.tax").keyup(function (event) {
            var taxElement = $(this).data("targetelementtax");
            var amountElement = $(this).data("targetelementamount");
            var fieldValue = event.target.value;
            var amount = Number((fieldValue / 1.15).toFixed("2"));
            var tax = Number((fieldValue - amount).toFixed("2"));

            $(`#${amountElement}`).val(amount);
            $(`#${taxElement}`).val(tax);
          });
          ////////////////////////////// calculate the end date based on start date and duration

          $("input.autoSetDate").change(function (event) {
            var datePicked = event.target.value;

            var totalDurElement = $(this).data("totaldurelement");
            var totalWHElement = $(this).data("totalwhelement");
            var date1 = $(this).data("date1element");
            var date2 = $(this).data("date2element");
            var date3 = $(this).data("date3element");
            var statuschangeElement = $(this).data("statuschangeelement");

            var sourceElement = $(this).data("sourceelement");
            var sourceElementValue = $(`#${sourceElement}`).val();
            var targetElement = $(this).data("targetelement");


            var durationelement = $(this).data("durationelement");
            var startdateelement = $(this).data("startdateelement");
            var enddateelement = $(this).data("enddateelement");

            if (sourceElementValue && datePicked) {
              sourceElementValue = Number(sourceElementValue);

              let start = new Date(datePicked);
              let end = new Date(start);
              end.setMonth(end.getMonth() + sourceElementValue);

              start = Dynamic_Data_Request.g.convertdate(start);
              end = Dynamic_Data_Request.g.convertdate(end);

              $(`#${targetElement}`).val(end);

              console.log(start, "start");
              console.log(end, "end");
            }

            if (
              totalDurElement &&
              totalDurElement != "undefined" &&
              date1 &&
              date1 != "undefined" &&
              date2 &&
              date2 != "undefined"
            ) {
              var statusval = "";
              if(statuschangeElement &&
                statuschangeElement != "undefined")
                {
                   statusval = $(`#${statuschangeElement}`).val();
                }

              var value1 = $(`#${date1}`).val();
              var value2 = $(`#${date2}`).val();
              var start_date =  new Date(value1);
              if(date3 &&
                date3 != "undefined")
                {
                 value2 =   $(`#${date3}`).val();
                 if(value2 == "")
                 {
                  value2 = $(`#${date2}`).val();
                 }
                }

              var end_date =  new Date(value2);

              let todaydate = new Date();
              todaydate  = end_date > todaydate ? todaydate : end_date;
              let todayDiff = Math.round( (todaydate.getTime() - start_date.getTime()) / (1000 * 3600 * 24));
              let dateDiff = Math.round( (end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24) );
              

              var total =  parseFloat((todayDiff / dateDiff) * 100).toFixed("2");
              
              if(statusval == "" || statusval != "finished")
              $(`#${totalDurElement}`).val(total);
            }

            if(totalWHElement &&
              totalWHElement != undefined &&
              date1 &&
              date1 != undefined)
              {
                  var value1 = $(`#${date1}`).val();
                  var start_day = new Date(value1).getDate();
                  var start_month =  new Date(value1).getMonth();
                  var start_year =  new Date(value1).getFullYear();

                  let todaydate = new Date();
                  let day = new Date().getDate();
                  let month = new Date().getMonth();
                  let year = new Date().getFullYear();

                  /*
                  const minute = 1000 * 60;
                  const hour = minute * 60;
                  const calc_day = hour * 24;
                  const calc_month = day * 30;
                  const calc_year = day * 365;
                 
                  let dayDiff = Math.round( (todaydate.getTime() - value1.getTime()) / (1000 * 3600 * 24) );
                  let monthDiff = Math.round( (todaydate.getTime() - value1.getTime()) / (1000 * 3600 * 24 * 30) );
                  let yearDiff = Math.round( (todaydate.getTime() - value1.getTime()) / (1000 * 3600 * 24 * 365) );*/

                 var excludedays = 0;
                  var workdays = 0;
                  let _month = start_month + 1;
                  let _localmonth = month + 1;

                  for(var y = start_year; y <= year ; y++){
                    for(var m = _month; m <= _localmonth ; m++){  
                        var monthdays = new Date(y, m, 0).getDate();
                        let newmonth = m - 1 ;
                        for(var i = 1; i <= monthdays; i++) {
                          var _date  = new Date(y,newmonth,i);
                        if(todaydate > _date){
                         
                          var weekday = _date.getDay();
                           if(weekday != undefined)
                            {
                              if (weekday != 5)
                                  workdays++;
                            }
                          
                            HolidaysOff.forEach(oListItem =>{
                              if(oListItem.getTime() == _date.getTime())
                                {
                                  excludedays++;
                                }
                            });
                          }
                      }
                    } 
                  }

                  var total = (workdays  - excludedays) * 8;
    
                  $(`#${totalWHElement}`).val(total);
                
              }

              if(durationelement &&
                durationelement != undefined &&
                startdateelement &&
                startdateelement != undefined &&
                enddateelement &&
                enddateelement != undefined)
                {
                //  debugger;
                    var value1 = $(`#${startdateelement}`).val();
                    var value2 = $(`#${enddateelement}`).val();

                    if(value2 != "" && value2 != undefined)
                    {
                      
                    var start_date =  new Date(value1);
                    var end_date =  new Date(value2);

                    let dayDiff = Math.round( (end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24) );
                  
                    $(`#${durationelement}`).val(dayDiff);
                    }
                }
          });

          //

          $("input.autoEndDate").keyup(function (event) {
            //
            if (event.which >= 37 && event.which <= 40) return;

            $(this).val(function (index, value) {
              return value.replace(/\D/g, "");
            });

            var duration = event.target.value;

            var sourceElement = $(this).data("sourceelementdate");
            var sourceElementValue = $(`#${sourceElement}`).val();
            var targetElement = $(this).data("targetelementdate");

            if (sourceElementValue && duration) {
              duration = Number(duration);
              let start = new Date(sourceElementValue);
              let end = new Date(start);

              end.setMonth(end.getMonth() + duration);

              start = Dynamic_Data_Request.g.convertdate(start);
              end = Dynamic_Data_Request.g.convertdate(end);
              console.log(start, "start");
              console.log(end, "end");
              $(`#${targetElement}`).val(end);

              // const date2 = new Date(BaselineFinishDate);
              // const diffTime = Math.abs(date2 - date1);
              // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              // New_Data_Submit.g.oListItem.set_item("BaselineDuration", diffDays);
            }
          });

          ///////////////////////////////
          $("body").on("keyup", "input.percentbyparent", function (event) {
            // change it to body to can invoke the listiner in master details

            // $("input.percentbyparent").keyup(function (event) {
            // calculate the target elemnt like in delivrable

            var isMasterDetails = $(this)
              .parent()
              .parent()
              .hasClass("Details-Item");
            var parentValue = 0,
              targetElement = "",
              fieldValue = 0,
              weight = 0;
            if (isMasterDetails) {
              // for new validation in master details
              if (listkey == "projects") {
                var actualBudget = $("#ActualBudget").val();
                var assignedBudget = $("#Amount").val();
                parentValue =
                  actualBudget && actualBudget != 0
                    ? actualBudget
                    : assignedBudget;
              } else if (listkey == "initiatives") {
                var initiativeBudget = $("#InitiativeBudget").val();

                parentValue = initiativeBudget;
              }
              if (parentValue) {
                parentValue = parentValue.replaceAll(",", "");
                parentValue = Number(parentValue);
                targetElement = $(this).data("targetelem");
                fieldValue = event.target.value;
                weight = (fieldValue / parentValue) * 100;
                weight = weight.toFixed(2);
                $(this).parent().parent().find(`#${targetElement}`).val(weight);
              }
            } else {
              targetElement = $(this).data("targetelem");
              parentValue = $(this).data("parentval");
              fieldValue = event.target.value;
              weight = (fieldValue / parentValue) * 100;
              weight = weight.toFixed(2);
              $(`#${targetElement}`).val(weight);
            }
          });

          ///////////////////////////////
          $("body").on(
            "keyup",
            "input.weightfloatpercentage",
            function (event) {
              // change it to body to can invoke the listiner in master details

              // $("input.weightfloatpercentage").keyup(function (event) {
              //
              var isMasterDetails = $(this)
                .parent()
                .parent()
                .hasClass("Details-Item");
              var parentValue = 0,
                targetElement = "",
                fieldValue = 0,
                amount = 0;

              if (isMasterDetails) {
                // for new validation in master details

                if (listkey == "projects") {
                  var actualBudget = $("#ActualBudget").val();
                  var assignedBudget = $("#Amount").val(); // change AssignedBudget to Amount
                  parentValue =
                    actualBudget && actualBudget != 0
                      ? actualBudget
                      : assignedBudget;
                } else if (listkey == "initiatives") {
                  var initiativeBudget = $("#InitiativeBudget").val();

                  parentValue = initiativeBudget;
                }
                if (parentValue && parentValue != 0) {
                  parentValue = parentValue.replaceAll(",", "");
                  parentValue = Number(parentValue);
                  targetElement = $(this).data("targetelem");
                  fieldValue = event.target.value;
                  amount = (parentValue * fieldValue) / 100;
                  amount = amount.toFixed(2);
                  $(this)
                    .parent()
                    .parent()
                    .find(`#${targetElement}`)
                    .val(amount);
                }
              } else {
                parentValue = parentBudgetValue;
                targetElement = $(this).data("targetelem");
                fieldValue = event.target.value;
                amount = (parentValue * fieldValue) / 100;
                amount = amount.toFixed(2);
                $(`#${targetElement}`).val(amount);
              }
            }
          );

          // listiner on ppicker
          //   $("div[type=picker] input[id$='TopSpan_HiddenInput']").on("change", function () {
          //     console.log("fffffffffffffffff")
          //     alert('People Picker Value Changed');
          // })
          // $("body").on('change',"div[type=picker] input[id$='TopSpan_HiddenInput']",function(){
          //   console.log("BHHHHHHHHHHHHHHHHHHHHHHHHH")
          // })
          // $('input[id$="TopSpan_HiddenInput"]').on('change', function () {
          //   alert('People Picker Value Changed');
          // });
          //
          //////////////////////////////// disable_enable_section like master details if there is a value or not
          $("body").on("keyup", ".disable_enable_section", function (event) {
            var value = event.target.value;
            if (value) {
              if (listkey == "projects") {
                $(
                  "[data-target_list=Deliverables] .fieldset-container"
                ).removeClass("disable_section");
                $(
                  "[data-target_list=Milestones] .fieldset-container"
                ).removeClass("disable_section");
              } else if (listkey == "initiatives") {
                $(
                  "[data-target_list=InitiativeDeliverables] .fieldset-container"
                ).removeClass("disable_section");
                $(
                  "[data-target_list=InitiativeMilestones] .fieldset-container"
                ).removeClass("disable_section");
              }
            } else {
              if (listkey == "projects") {
                $(
                  "[data-target_list=Deliverables] .fieldset-container"
                ).addClass("disable_section");
                $("[data-target_list=Milestones] .fieldset-container").addClass(
                  "disable_section"
                );
              } else if (listkey == "initiatives") {
                $(
                  "[data-target_list=InitiativeDeliverables] .fieldset-container"
                ).addClass("disable_section");
                $(
                  "[data-target_list=InitiativeMilestones] .fieldset-container"
                ).addClass("disable_section");
              }
            }
          });

          //////////////////////////////// make attachement required when change on radio yes
          var previuosTargetVal = "";
          $("body").off("change.yesnolistener").on("change.yesnolistener", "input.yesnolistener", function (event) {
            var value = event.target.value;
            var $row = $(this).closest(".Details-Item");
            var findTargetField = function (fieldId) {
              if ($row.length) {
                return $row.find('[id="' + fieldId + '"]').filter("input,select,textarea").first();
              }
              return $("#" + fieldId);
            };

            var targetElementRequired = $(this).data("targetfieldrequired");

            // if we need to apply that when click on is delivered yes the status will be completed
            var targetElement = $(this).data("targetfield");
            var targetElementValue = $(this).data("targetfieldvalue");

            if (
              value == "yes" &&
              targetElement &&
              targetElement != "undefined" &&
              targetElementValue &&
              targetElementValue != "undefined"
            ) {
              previuosTargetVal = findTargetField(targetElement).val();
              findTargetField(targetElement).val(targetElementValue);
              findTargetField(targetElement).attr("disabled", true);
            } else if (
              value == "no" &&
              targetElement &&
              targetElement != "undefined" &&
              targetElementValue &&
              targetElementValue != "undefined"
            ) {
              console.log(previuosTargetVal, "previuosTargetVal in else");
              findTargetField(targetElement).val(previuosTargetVal);
              findTargetField(targetElement).attr("disabled", false);
            }

            // to handle required on attachement
            if (
              (value == "yes" || value == "true") &&
              targetElementRequired &&
              targetElementRequired != "undefined"
            ) {
              targetElementRequired = targetElementRequired.split(",");

              targetElementRequired.forEach((el) => {
                var $targetField = findTargetField(el);
                $targetField.attr("required", true);
                if ($row.length) {
                  $row.find('label[for="' + el + '"]').attr("required", true);
                } else {
                  $('label[for="' + el + '"]').attr("required", true);
                }

                var checkAttach = $targetField
                  .parent()
                  .find(">*")
                  .closest(".attlabel");

                if (checkAttach.length > 0) {
                  $targetField
                    .parent()
                    .find(">*")
                    .closest(".attlabel")
                    .attr("required", true);
                } else {
                  $targetField.parent().find(">*").attr("required", true);
                }
              });

              // $(`#${targetElementRequired}`).attr("required", true);

              // var checkAttach =$(`#${targetElementRequired}`).parent().find(">*").closest(".attlabel")

              // if(checkAttach.length > 0){
              // $(`#${targetElementRequired}`)
              //   .parent()
              //   .find(">*")
              //   .closest(".attlabel")
              //   .attr("required", true);
              // }else{
              //   $(`#${targetElementRequired}`)
              //   .parent()
              //   .find(">*")
              //   .attr("required", true);
              // }
            } else if (
              (value == "no" || value == "false") &&
              targetElementRequired &&
              targetElementRequired != "undefined"
            ) {
              targetElementRequired = targetElementRequired.split(",");

              targetElementRequired.forEach((el) => {
                var $targetField = findTargetField(el);
                $targetField.attr("required", false);
                if ($row.length) {
                  $row.find('label[for="' + el + '"]').removeAttr("required");
                } else {
                  $('label[for="' + el + '"]').removeAttr("required");
                }

                var checkAttach = $targetField
                  .parent()
                  .find(">*")
                  .closest(".attlabel");

                if (checkAttach.length > 0) {
                  $targetField
                    .parent()
                    .find(">*")
                    .closest(".attlabel")
                    .attr("required", false);
                } else {
                  $targetField.parent().find(">*").attr("required", false);
                }
              });

              // $(`#${targetElementRequired}`).attr("required", false);

              // var checkAttach =$(`#${targetElementRequired}`).parent().find(">*").closest(".attlabel")

              // if(checkAttach.length > 0){
              //   $(`#${targetElementRequired}`)
              //   .parent()
              //   .find(">*")
              //   .closest(".attlabel")
              //   .attr("required", false);
              // }else{
              //   $(`#${targetElementRequired}`)
              //   .parent()
              //   .find(">*")
              //   .attr("required", false);
              // }
            }
            //
          });
          if (listkey == "deliverables" && isEdit) {
            console.log("mutasem 1");
            $(document).on("change", "#Exchangetype", function () {
              var selectedValue = $(this).val();
          
              if (selectedValue === "delivery") {
                // Case 1: نوع الصرف = delivery
                $("#Delivered[value='yes']").prop("checked", true);
                $("input#Delivered").prop("disabled", true);
          
                // Enable and make DeliveredDate required
                $("#DeliveredDate").prop("disabled", false).prop("required", true);
                $("label[for='DeliveredDate']").attr("required", true);
          
              } else {
                // Case 2: نوع الصرف = anything else (كلي او جزئي)
                $("#Delivered[value='no']").prop("checked", true);
                $("input#Delivered").prop("disabled", true);
          
                // Disable and remove required from DeliveredDate + label
                $("#DeliveredDate").prop("disabled", true).prop("required", false).val("");
                $("label[for='DeliveredDate']").removeAttr("required");
              }
            });
          }
          // add new style for wf

          if (isWF) {
            $(".FormContainer").addClass("wf-mode");
            $("#navbarsParent").addClass("wfMode");
            $(".page-nav").attr("style", "display: none !important");
            // $(".sidebar").attr("style", "display: none !important");
            $(".main-panel").attr("style", "width: 100% !important");
            // getTaskHistory.init();
            Get_TaskHistory.init();
          }
          //
          //////add section to cr
          if (!isCrMode && crListKey) {
            //on new custom cr
            handleCustomeCr.init();
            $(
              "div#particles-foreground, div#particles-background, .vertical-centered-box"
            ).animate(
              {
                opacity: 0,
              },
              {
                duration: 333,
                complete: function () {
                  $(
                    "div#particles-foreground, div#particles-background, .vertical-centered-box"
                  ).remove();

                  // $('div#particles-foreground, div#particles-background, .vertical-centered-box').hide();
                },
              }
            );
          } else {
            $(
              "div#particles-foreground, div#particles-background, .vertical-centered-box"
            ).animate(
              {
                opacity: 0,
              },
              {
                duration: 333,
                complete: function () {
                  $(
                    "div#particles-foreground, div#particles-background, .vertical-centered-box"
                  ).remove();

                  // $('div#particles-foreground, div#particles-background, .vertical-centered-box').hide();
                },
              }
            );
          }
          // get getTotalSelectedValues
          var totalValuesWeight = 0;
          $("input.getTotalSelectedValues").change(function () {
            var fieldValue = $(this).data("getothervalue");
            var targettotalelement = $(this).data("targettotalelement");

            var budget = 0;
            var amount = 0;

            if (isEdit) {
              totalValuesWeight = $(`#${targettotalelement}`).val();
              totalValuesWeight = Number(totalValuesWeight);
            }

            if (projectActualBudget > 0) {
              budget = projectActualBudget;
            } else {
              budget = projectAssignedBudget;
            }

            if (fieldValue && fieldValue != "undefined") {
              fieldValue = Number(fieldValue);
            } else {
              fieldValue = 0;
            }

            amount = (budget * fieldValue) / 100;

            if ($(this).is(":checked")) {
              totalValuesWeight = totalValuesWeight + amount;
            } else {
              totalValuesWeight = totalValuesWeight - amount;
            }
            $(`#${targettotalelement}`).val(totalValuesWeight);
            $("input.tax").trigger("keyup"); // invoke tax  feature after fill the total amount
          });
          //
          //////// apply grandFieldInvoke
          $(".grandFieldInvoke").on("change", function (event) {
            var grandId = $(this).data("grandfieldid");
            var childId = $(this).data("childfieldid");
            var childFieldIdSource = $(this).data("childfieldidsource");

            var elementValue = event.target.value;
            var $childField = childId ? $("#" + childId) : $();
            var isUserChange = !!(event && event.originalEvent);

            // User changed RelatedObjectiveLevel (etc.): clear child so we never keep a stale SO.
            // Programmatic .trigger("change") on edit load must NOT clear — restore needs data-lookup-value.
            if (isUserChange && $childField.length) {
              if (
                typeof ListInfo !== "undefined" &&
                ListInfo.g &&
                ListInfo.g.clearSelectFieldValue
              ) {
                ListInfo.g.clearSelectFieldValue($childField);
              } else {
                $childField.val("");
                $childField.removeAttr("value");
                $childField.removeAttr("data-lookup-value");
              }
            }

            if (grandId && elementValue && childId && childFieldIdSource) {
              var customFilterValue = $(this)
                .find("option[value=" + elementValue + "]")
                .data("customfiltervalue"); // will add the value on parent to can handle the query in dynamic func

              $(`#${grandId}`).data("notinvokelistiner", false);
              $(`#${grandId}`).attr("data-seconedvaluelistiner", elementValue);
              $(`#${grandId}`).attr(
                "data-parentcustomfiltervalue",
                customFilterValue
              );
              $(`#${childId}`).data("queryfield", childFieldIdSource);
              $(`#${childId}`).data("queryfieldvalue", elementValue);
              $(`#${childId}`).data("queryfieldtype", "Text");

              // window.setTimeout(function(){
              var $grandSel = $(`select[dynamic=parent][id=${grandId}]`);
              $grandSel.data("forcecascadeobjectives", true);
              $grandSel.trigger("change"); // to trigger only one field (correct field)
              // },1500)
              setTimeout(function () {
                var depField =
                  $("#" + childId).attr("data-additionalfilterfrom") ||
                  $("#" + childId).data("additionalfilterfrom");
                if (depField) {
                  var $dep = $("#" + depField);
                  if ($dep.length) {
                    $dep.trigger("change");
                  }
                }
              }, 0);
            }
          });

          ///
          $("input.number").keyup(function (event) { 
            // skip for arrow keys
            if (event.which >= 37 && event.which <= 40) return;
            // format number
            $(this).val(function (index, value) {
              value = value.replace(/[^\d.]/g, '');
              // Split the value into integer and decimal parts
              const parts = value.split('.');
              // Format the integer part with commas
              parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              // Join the parts with a decimal point if there's a fractional part
              return parts.join('.');
              // return value
              //   .replace(/\D/g, "")
              //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            });

            var totalElement = $(this).data("totalelement");
            var sum1 = $(this).data("sum1element");
            var sum2 = $(this).data("sum2element");

            var totalSubElement = $(this).data("totalsubelement");
            var sub1 = $(this).data("sub1element");
            var sub2 = $(this).data("sub2element");
            
            var totalperElement = $(this).data("totalperelement");
            var per1 = $(this).data("per1element");
            var per2 = $(this).data("per2element");

            var totalMBElement = $(this).data("totalmbelement");
            var mb1 = $(this).data("mb1element");
            var mb2 = $(this).data("mb2element");
            var fmb = $(this).data("totalwrelement");
            var date1 = $(this).data("date1element");
            var date2 = $(this).data("date2element");

            var totalProgressElement = $(this).data("totalprogresselement");
            var prog1 = $(this).data("prog1element");
            var prog2 = $(this).data("prog2element");

            var statuschangeElement = $(this).data("statuschangeelement");
            var status1 = $(this).data("status1element");
            var status2 = $(this).data("status2element");
            var status3= $(this).data("status3element");

            var max = $(this).data("maxfield");
            var resetElement = $(this).data("resetelement");
            var elementVal = event.target.value;
            // set max value
            
            if (max && max != "undefined") {
              var maxValue = 0;
              if (listkey == "projects") {
                if ($(`#${max}`).val()) {
                  maxValue = $(`#${max}`).val() ? $(`#${max}`).val() : 0;
                } else if ($(`#Amount`).val()) {
                  maxValue = $(`#Amount`).val() ? $(`#Amount`).val() : 0;
                }
              } else {
                maxValue = $(`#${max}`).val() ? $(`#${max}`).val() : 0;
              }
              if (maxValue.includes(",")) {
                maxValue = maxValue.replaceAll(",", "");
              }
              if (elementVal.includes(",")) {
                elementVal = elementVal.replaceAll(",", "");
              }
              elementVal = Number(elementVal);
              maxValue = Number(maxValue);

              if (elementVal <= maxValue) {
                $(this).val(function (index, value) {
                  value = value.replace(/[^\d.]/g, '');
                  // Split the value into integer and decimal parts
                  const parts = value.split('.');
                  // Format the integer part with commas
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                  // Join the parts with a decimal point if there's a fractional part
                  return parts.join('.');
                  // return value
                  //   .replace(/\D/g, "")
                  //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                });
              } else {
                $(this).val(null);
              }
            } else if (resetElement && resetElement != "undefined") {
              resetElement = eval(resetElement);
              resetElement.forEach((el) => {
                $(`#${el}`).val(null);
              });
            } else {
              // format number
              $(this).val(function (index, value) {
                value = value.replace(/[^\d.]/g, '');
                  // Split the value into integer and decimal parts
                  const parts = value.split('.');
                  // Format the integer part with commas
                  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                  // Join the parts with a decimal point if there's a fractional part
                  return parts.join('.');
                // return value
                //   .replace(/\D/g, "")
                //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              });
            }
            ///

            if (
              totalElement &&
              totalElement != "undefined" &&
              sum1 &&
              sum1 != "undefined" &&
              sum2 &&
              sum2 != "undefined"
            ) {
              var value1 = $(`#${sum1}`).val();
              value1 = value1.replaceAll(",", "");
              value1 = Number(value1);
              var value2 = $(`#${sum2}`).val();
              value2 = value2.replaceAll(",", "");
              value2 = Number(value2);
              var total = value1 + value2;
              $(`#${totalElement}`).val(total);

              fieldsDependsOnTotal = $(`#${totalElement}`).data("resetelement");

              if (fieldsDependsOnTotal) {
                fieldsDependsOnTotal = eval(fieldsDependsOnTotal);

                fieldsDependsOnTotal.forEach((el) => {
                  var resVal = $(`#${el}`).val();
                  if (resVal.includes(",")) {
                    resVal = resVal.replaceAll(",", "");
                    resVal = Number(resVal);
                  }
                  if (resVal > total) {
                    $(`#${el}`).val(null);
                  }
                });
              }
            }

            
            if (
              totalSubElement &&
              totalSubElement != "undefined" &&
              sub1 &&
              sub1 != "undefined" &&
              sub2 &&
              sub2 != "undefined"
            ) {
              var value1 = $(`#${sub1}`).val();
              value1 = value1.replaceAll(",", "");
              value1 = Number(value1);
              var value2 = $(`#${sub2}`).val();
              value2 = value2.replaceAll(",", "");
              value2 = Number(value2);
              var total = value2 - value1;
              $(`#${totalSubElement}`).val(total);
            }

            if (
              totalperElement &&
              totalperElement != "undefined" &&
              per1 &&
              per1 != "undefined" &&
              per2 &&
              per2 != "undefined"
            ) {
              var value1 = $(`#${per1}`).val();
              value1 = value1.replaceAll(",", "");
              value1 = parseFloat(value1);
              var value2 = $(`#${per2}`).val();
              value2 = value2.replaceAll(",", "");
              value2 = parseFloat(value2);
             
              if(value1 >= 1)
              { value1 = value1 / 100; }

              var total = value1 * value2;

              $(`#${totalperElement}`).val(total);
            }

            if (
              totalMBElement &&
              totalMBElement != "undefined" &&
              mb1 &&
              mb1 != "undefined" &&
              mb2 &&
              mb2 != "undefined" &&
              date1 &&
              date1 != "undefined" &&
              date2 &&
              date2 != "undefined") 
              {
                
              var value1 = $(`#${mb1}`).val();
              value1 = value1.replaceAll(",", "");
              value1 = parseFloat(value1);

              var value2 = $(`#${mb2}`).val();
              value2 = value2.replaceAll(",", "");
              value2 = parseFloat(value2);
            
              var startdt =  $(`#${date1}`).val();
              var enddt =  $(`#${date2}`).val();

             
              /*
              var value3 = $(`#${date1}`).val();
              value3 = value3.replaceAll(",", "");
              value3 = new Date(value3);


              let daydate = value3.getDate();
              let monthdate = value3.getMonth();
              let yeardate = value3.getFullYear();

              let plandate = new Date(yeardate,monthdate,daydate);
              plandate >= new Date(year,month,day) ? plan : 
*/

              let todaydate = new Date(enddt);// new Date();
              let startdate = new Date(startdt);
              
              /*
              let day = 1;
              let month = new Date().getMonth();
              let year = new Date().getFullYear();
              */

              let day = startdate.getDate();
              let month = startdate.getMonth();
              let year = startdate.getFullYear();

              let firstdayinmonth = new Date(year,month,day);

              let Difference_In_Time = todaydate.getTime() - firstdayinmonth.getTime();
              let Diffdays = Math.round(Difference_In_Time / (1000 * 3600 * 24));

              var excludedays = 0;
              let finalmonth = month + 1;
              var monthdays = new Date(year, finalmonth, 0).getDate();
              for(var i = 1; i <= monthdays; i++) {
                      var _date = new Date(year,month,i);
                    if(_date <= todaydate){
                      HolidaysOff.forEach(oListItem =>{
                        if(oListItem.getTime() == _date.getTime())
                          {
                            excludedays++;
                          }
                      });
                      
                     };
              } 
              
              var workdays = 0;
              for(var i=1; i<= Diffdays; i++) {
               
                var weekday = new Date(year, month, i).getDay();
                  if (weekday != 5)
                     workdays++;
              }
              
              workdays = workdays - excludedays;
              
              var total = ((value1 + value2) * 8) * workdays;

              $(`#${totalMBElement}`).val(total);
            }

            if(fmb &&
               fmb != "undefined")
            {
              var total = $(`#${totalMBElement}`).val();
              total = parseFloat(total);

              var totalwhk = 0;
             
              if( prog2 &&  prog2 != "undefined")
              {
                var code = $(`#${prog2}`).val();
               EngineeringProjectCode = code;
              
               var existlist = [];
               ManHoursHistory.forEach(_project => {
                
                if(_project.get_item("Title") == EngineeringProjectCode)
                    {
                        existlist.push(_project);
                    }
              });
              var lastProg = 0;
              if(existlist.length > 0)
              {
                  existlist.forEach(_ManHour => {
                  if(_ManHour.get_item("ManHours") > 0)
                  {
                  lastProg = _ManHour.get_item("ManHours") + lastProg;
                  }

                });
              }

               totalwhk =  lastProg;

              }

              totalwhk = totalwhk + total;
              $(`#${fmb}`).val(totalwhk);
            }


            if (
              totalProgressElement &&
              totalProgressElement != "undefined" &&
              prog1 &&
              prog1 != "undefined" &&
              prog2 &&
              prog2 != "undefined")
              {
                
                var lastProg = 0;
                var value1 = $(`#${prog1}`).val();
                value1 = value1.replaceAll(",", "");
                value1 = parseFloat(value1);

                var value2 = $(`#${prog2}`).val();

                EngineeringProjectCode = value2;
                
                var existlist = [];
                LastProjectHistory.forEach(_project => {
                  
                  if(_project.get_item("Title") == EngineeringProjectCode)
                      {
                          existlist.push(_project);
                      }
                });

                if(existlist.length > 0)
                {
                  if(existlist.length == 1)
                  {
                    lastProg = existlist[0].get_item("ActualProgress");
                  }
                }

                var total = value1 - lastProg;

                $(`#${totalProgressElement}`).val(total);
              }
              
              if (
                statuschangeElement &&
                statuschangeElement != "undefined" &&
                status1 &&
                status1 != "undefined" &&
                status2 &&
                status2 != "undefined" &&
                status3 &&
                status3 != "undefined")
              {
              //  debugger;
                var value1 = $(`#${status1}`).val(); // PlanPercentge
                value1 = value1.replaceAll(",", "");
                value1 = parseFloat(value1);
                var value2 = $(`#${status2}`).val(); // ActualProgress
                value2 = value2.replaceAll(",", "");
                value2 = parseFloat(value2);
                var value3 = $(`#${status3}`).val(); // FinishTime
                value3 = value3.replaceAll(",", "");
                value3 = parseFloat(value3);

                var newstatus = "epending";

                if(value1 >= 100 && value2 >= 100)
                    newstatus = "finished";
                else
                    if(value2 > value1)
                    newstatus = "regular";
                else
                    if(value1 > value2)
                    newstatus = "elate";
                else
                    if(value1 >= 100 && value3 >= 110)
                    newstatus = "troubled";

                


                $(`#${statuschangeElement}`).val(newstatus);
              }


          });

          //maxOnChild
          $("body").on("change", ".maxOnChild", function (event) {
            var value = event.target.value;
            var targetOn = $(this).data("targeton");
            var childsId = $(this).data("childsid");
            childsId = eval(childsId);

            childsId.forEach((el) => {
              var checkElem = "";
              // to use it for current form not only master details
              if (listkey == "changerequest") {
                checkElem = $(
                  `.section-container:not([data-target_list]) .CFIELD:not(.hide-field)`
                ).find(`#${el}`).length;
              } else {
                checkElem = $(
                  `.section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)`
                ).find(`#${el}`).length;
              }

              if (checkElem > 0) {
                if (listkey == "changerequest") {
                  $(
                    `.section-container:not([data-target_list]) .CFIELD:not(.hide-field) #${el}`
                  ).each(function () {
                    $(this).attr(targetOn, value);
                  });
                } else {
                  $(
                    `.section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field) #${el}`
                  ).each(function () {
                    $(this).attr(targetOn, value);
                  });
                }
              }

              $("[data-target_list] .Details-Item").each(function () {
                $(this).find(`#${el}`).attr(targetOn, value);
              });
            });
          });
          //

          $("body").on("change", ".decimalnumber", function (event) {
            // add this to handle the num with dots in weight in initiative milestone
            // var input = $(this);

            var val = event.target.value;

            var splitVal = val.split(".");

            if (splitVal.length == 2 && splitVal[1].length > 1) {
              return (event.target.value =
                splitVal[0] + "." + splitVal[1].substr(0, 1));
            }

            if (val >= 0 && val <= 100) {
              event.target.value = val;
            } else {
              event.target.value = "";
            }
          });
          //////////////////////////////////////////////////////////////

          // disabled enable fields based on selection & onload

          $("[data-toggledisabledvalues]").on("change", function () {
            ListInfo.g.toggleDisabledFields($(this));
          });

          // hide show required based on selection & onload
          $("[data-requiredvalues]").on("change", function () {
            ListInfo.g.toggleRequiredFields($(this));
          });

          //hide show fields based on selection & onload
          $("[data-togglevalues]").on("change", function () {
            ListInfo.g.toggleFields($(this));
          });
          $("body")
            .off("change.masterLookupKeep")
            .on(
              "change.masterLookupKeep",
              "[data-target_list] select[type=dropdown]",
              function () {
                var v = $(this).val() || "";
                $(this).attr("data-saved-value", v);
                $(this).attr("data-lookup-value", v);
                $(this).attr("value", v);
              }
            );
          // #add validation on amount field to be like weight
          $(".percentbyparent[data-targetelem]").each(function () {
            let percentField = $(`#${$(this).attr("data-targetelem")}`);
            let maxValue =
              parseFloat(percentField.attr("max"))/100 *
              parseFloat($(this).attr("data-parentval"));
            $(this).attr("max", maxValue);
          });
          //remove require on disbaled fields
          setTimeout(function () {
            $(".CFIELD .disabled").removeAttr("required");
            $(".CFIELD :disabled").removeAttr("required");
            $('.CFIELD [disabled="disabled"]').removeAttr("required");
          }, 2000);
          //
          if (isEdit) {
            Idea_Info.init();
            // $('.title-item').text('تعديل');
            SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
              Edit_Data_Request.init();
            });
            Edit_Data_Submit.g.clickbait();
            Edit_Data_Submit.g.Cancel();
            if (listkey == "kpiequations") {
              bindKPIComponentLinkApi();
            }

            // if (listkey == "invoices") {
            //   ListInfo.g.InvoicesTotal();
            // }
            if (listkey == "deliverables") {
              ListInfo.g.DeliverablesDelivered();
            }
            if (listkey == "goalstrategy") {
              ListInfo.g.requiredSpillarsName();
            }
            if (listkey == "projectcharter") {
              $("button.btn-save").on("click", function () {
                window.location =
                  _spPageContextInfo.siteAbsoluteUrl +
                  "/SitePages/ProjectHome.aspx?PCODE=" +
                  PCODE;
              });
              // working on integration btn
              $("button.integration-save").on("click", function () {
                Integration_Handler.Save_Integration();
              });
              // end working on integration btn
            }

            if (listkey == "initiativecards") {
              // working on integration btn
              $("button.integration-save").on("click", function () {
                Integration_Handler.Save_Integration();
              });
              // end working on integration btn
            }

            if (listkey == "projects") {
              Sectors_Info.init();
              $("#RelatedInitiative").on("change", function () {
                var initiativeCode = $(this).val();
                ProjectInitiativeDelevrable.init(
                  "InitiativeDeliverables",
                  initiativeCode
                );
              });
            }

            if (listkey == "engineeringprojects") {
              GetHolidaysOFF.preinit();
              GetLastProgressFromHistory.preinit();
              GetManHoursHistory.preinit();
              }

            if (listkey == "cryearlycalendar") {
              $("#Year").attr("min", 1900).attr("max", 2100);
              $("#Quarter").attr("min", 1).attr("max", 4);
              $("#Month").attr("min", 1).attr("max", 12);
            }

            if (listkey == "mainkpiissues" || listkey == "mainkpianalysis" || listkey == "sosanalysis") {
              setTimeout(function () {
                window.updatePageTitleLinkForKpiOrSos && window.updatePageTitleLinkForKpiOrSos();
              }, 500);
            }

            // if (USERisWF) {
            //   $(".form-btns-wrapper").hide();
            // }
            if (listkey == "initiatives") {
              Sectors_Info.init(); // to get the department related to sector on edit
              // ListInfo.g.showFieldsIfInitiativeVision();
              // $("#Types").on("change", function () {
              //   var type = $(this).val();
              //   Initiative_Sos.init("SOs", type); //get related sos depends on type
              //   if (type == "vision") {
              //     Initiative_Strategy_Sos.init("SOs");
              //   }
              // });
            }
            //change in Edit
            if (listkey == "sos") {
              Sectors_Info.init(); // to get the department related to sector on edit
              $("#RelatedStrategy").on("change", function () {
                var relatedStrategy = $(this).val();
                Goal_Strategy_Info.init(relatedStrategy);
              });
            }

            if (listkey == "mainkpi") {

              // $("#RelatedStrategyObjective").prop("disabled", true);

              // var relatedStrategyCode = $('#RelatedStrategy').val()
              // var indexType = $('#Types').val();

              // Goal_Strategy_Info.init(relatedStrategyCode)
              // Kpi_Related_Goal.init(relatedStrategyCode, indexType)

              // $("select#Types").change(function () {
              //   var relatedStrategyCode = $("#RelatedStrategy").val();
              //   var indexType = $(this).val();
              //   Goal_Strategy_Info.init(relatedStrategyCode);
              //   Kpi_Related_Goal.init(relatedStrategyCode, indexType);
              // });

              // $("select#RelatedStrategy").change(function () {
              //   var relatedStrategyCode = $(this).val();
              //   var indexType = $("#Types").val();
              //   Goal_Strategy_Info.init(relatedStrategyCode);
              //   Kpi_Related_Goal.init(relatedStrategyCode, indexType);
              // });

              // $("select#SubRelatedObjective").change(function () {
              //   var sosStrategy = $(this).val();
              //   Get_Related_Sos_Sector.init(sosStrategy);
              // });

              // get the sector of related strategy obj from sos limk we cant us dynamic cause there is no name for sector just code

              $("select#RelatedStrategyObjective").change(function () {
                var sosStrategy = $(this).val();
                Get_Related_Sos_Sector.init(sosStrategy);
              });
            }

            //
          } else {
            //custom
            if (listkey == "budgetitems") {
              ListInfo.g.budgetitem();
            }

            if (listkey == "engineeringprojects") {
              GetHolidaysOFF.preinit();
              }

            // if (listkey == "invoices") {
            //   ListInfo.g.InvoicesTotal();
            // }

            if (listkey == "initiatives") {
              // Initiative_Stages_Data_Request.init();
              Sectors_Info.init(); // sector
              // ListInfo.g.showFieldsIfInitiativeVision();
              // $("#Types").on("change", function () {
              //   var type = $(this).val();
              //   Initiative_Sos.init("SOs", type); //get related sos depends on type

              //   if (type == "vision") {
              //     Initiative_Strategy_Sos.init("SOs");
              //   }
              // });
            }
            if (listkey == "deliverables") {
              ListInfo.g.DeliverablesDelivered();
            }
            if (listkey == "goalstrategy") {
              ListInfo.g.requiredSpillarsName();
            }

            if (isNew && (listkey === "mainkpianalysis" || listkey === "sosanalysis")) {
              if (window.CheckActiveCalendarQuarterForAnalysis) {
                window.CheckActiveCalendarQuarterForAnalysis(function (data) {
                  if (data.isSuccess && data.result && data.result.isActive) {
                    var r = data.result;
                    function tryFillFields() {
                      var $year = $("#Year");
                      var $quarter = $("#Quarter");
                      var $mLaunch = $("#MeasurementLaunchDate");
                      var $mEnd = $("#MeasurementLaunchEndDate");
                      if (!$year.length || !$quarter.length) return false;
                      $year.val(r.year).prop("readonly", true).addClass("disabled");
                      $quarter.val(r.quarter).prop("readonly", true).addClass("disabled");
                      if (r.measurementLaunchDate) {
                        var d1 = r.measurementLaunchDate.slice(0, 10);
                        $mLaunch.val(d1).prop("readonly", true).addClass("disabled");
                      }
                      if (r.dataReceptionEndDate) {
                        var d2 = r.dataReceptionEndDate.slice(0, 10);
                        $mEnd.val(d2).prop("readonly", true).addClass("disabled");
                      }
                      $(".CFIELD .disabled").removeAttr("required");
                      return true;
                    }
                    if (!tryFillFields()) {
                      setTimeout(tryFillFields, 300);
                    }
                  } else {
                    $("body").append(
                      "<style>" +
                        ".btn-add,.btn-save{opacity: .6;pointer-events: none;display:none}" +
                        ".form-control{color: #b1b1b1 !important;" +
                        "border-color: #e1e1e1 !important;" +
                        "background-color: #fdfdfd !important;" +
                        "opacity: .6;pointer-events: none;}" +
                        "</style>"
                    );
                    alert("الربع الاستراتيجي غير نشط. لا يمكن إضافة تحليل.");
                  }
                });
              }
            }
            // Prevent New Benefit when initiative Weight sum >= 100
            if (isNew && listkey == "benefits" && ICODE && window.BenefitsWeightGuard) {
              BenefitsWeightGuard.checkAndBlockNew();
            }
            if (isNew && listkey == "benefits" && window.bindBenefitPlannedDateToYear) {
              window.bindBenefitPlannedDateToYear();
            }
            if (
              isNew &&
              typeof Edit_Data_Request !== "undefined" &&
              Edit_Data_Request.populateDerivedLookupViewFields &&
              $("[data-field-type]").length
            ) {
              setTimeout(function () {
                Edit_Data_Request.populateDerivedLookupViewFields(null);
              }, 500);
            }
            // if (USERisWF || UserHaveLicense == false) {
            //   $(".form-btns-wrapper").hide();
            //   $(".btnactionrow").hide();
            // }
            if (UserHaveLicense == false) {
              $(".container-body").prepend(
                '<div class="noLicense"><span data-trans-nolicense class="Resources"></span></div>'
              );
              changeResources();
            }
            // $('.title-item').text('إضافة');
            //disable types dropdowns ghufran
            // if (isVROP) {
            //   if (listkey == "mainkpi") {
            //     // $('#Types').val('main');
            //     // $('#Types').prop('disabled', true);
            //     // ListInfo.g.toggleFields($("#Types")); // call the toggle fied when field is disabled
            //   } else if (listkey == "goalstrategy") {
            //     $("#Types").val("vision");
            //     $("#Types").prop("disabled", true);
            //     ListInfo.g.toggleFields($("#Types")); // call the toggle fied when field is disabled and should the type be vision on vrop
            //   }
            // }
            // if (isVROE) {
            //   if (listkey == "initiatives") {
            //     $("#Types").val("vision");
            //     $("#Types").prop("disabled", true);
            //   }
            // }
            // if (isNew && isEPMO) {
            //   if (listkey == "initiatives") {
            //     $("#Types").val("strategically");
            //     $("#Types").prop("disabled", true);
            //   }
            // }
            // if (isEdit && isEPMO) {
            //   if (listkey == "initiatives") {
            //     // $('#Types').val('strategically');
            //     $("#Types").prop("disabled", true);
            //   }
            // }
            // if (isStrategyTeam || isVROP) {
            //   if (listkey == "sos") {
            //     // $("#Types").val("main");
            //     // $("#Types").prop("disabled", true);
            //   }
            // }
            // if (listkey == "goalstrategy") {
            //   if (isVROP) {
            //     $("#Types").val("vision");
            //     $("#Types").prop("disabled", true);
            //   }
            // }

            // if (isSPMAdmin) {
            //   if (listkey == "sos") {
            //     $("#Types").val("sub");
            //     $("#Types").prop("disabled", true);
            //     $("#RelatedObjective").parent().css("display", "block");
            //   }
            // }
            if (listkey == "benefits" && ICODE && (isNew || isEdit || isView)) {
              //hide Initiative field if we are in the Initiative
              $("#InitiativeCode").parent().css("display", "none");
            }
            // Initiative Manager: MesureStatus disabled; default unmersurable on New
            // Skip disable during InitiativeBenefits workflow edit so IM can change it
            if (listkey == "benefits" && isInManager && (isNew || isEdit)) {
              var isInitiativeBenefitsWfEdit =
                typeof USERisWF !== "undefined" &&
                USERisWF &&
                isEdit &&
                ((typeof workflowname !== "undefined" &&
                  String(workflowname) == "InitiativeBenefits") ||
                  window.location.href.indexOf("benefits&InitiativeBenefits") > -1);
              if (isNew) {
                $("#MesureStatus").val("unmersurable");
              }
              if (!isInitiativeBenefitsWfEdit) {
                $("#MesureStatus").prop("disabled", true);
              }
            }
            // EPMO at InitiativeBenefits00: MesureStatus + CompletionStatus read-only
            if (listkey == "benefits" && isEdit) {
              var applyEpmoInitiativeBenefits00ReadOnly = function () {
                var isWfNow =
                  (typeof USERisWF !== "undefined" && USERisWF) ||
                  (typeof isWF !== "undefined" && isWF);
                var isEpmoUser =
                  (typeof isEPMO !== "undefined" && isEPMO) ||
                  (typeof currentUserRole !== "undefined" &&
                    currentUserRole == "EPMO");
                if (!isWfNow || !isEpmoUser) return false;
                var wfStageVal =
                  $("#WFStage").val() || $("#WFStage").attr("value") || "";
                var sid =
                  typeof stageid !== "undefined" ? String(stageid) : "";
                var cstage =
                  typeof currentstage !== "undefined"
                    ? String(currentstage)
                    : "";
                var isStage00 =
                  sid === "InitiativeBenefits00" ||
                  cstage === "InitiativeBenefits00" ||
                  wfStageVal === "InitiativeBenefits00";
                if (!isStage00) return false;
                $("#MesureStatus").prop("disabled", true);
                $("input#CompletionStatus").prop("disabled", true);
                return true;
              };
              if (!applyEpmoInitiativeBenefits00ReadOnly()) {
                setTimeout(applyEpmoInitiativeBenefits00ReadOnly, 800);
                setTimeout(applyEpmoInitiativeBenefits00ReadOnly, 2000);
              }
            }
            // PeriodType: same access as Weight (EPMO 01/02/03, IM 00)
            if (listkey == "benefits" && isEdit) {
              var applyBenefitPeriodTypeEditable = function () {
                var canEdit = false;
                if (
                  window.BenefitsWeightGuard &&
                  BenefitsWeightGuard.canCurrentUserEditWeight
                ) {
                  canEdit = BenefitsWeightGuard.canCurrentUserEditWeight();
                } else if (
                  typeof End_Workflow !== "undefined" &&
                  End_Workflow.canEditBenefitPeriodType
                ) {
                  canEdit = End_Workflow.canEditBenefitPeriodType();
                }
                var $period = $("#PeriodType");
                if (!$period.length) return false;
                if (canEdit) {
                  if (!$period.attr("data-original-periodtype") && $period.val()) {
                    $period.attr("data-original-periodtype", $period.val());
                  }
                  $period.prop("disabled", false).removeAttr("disabled");
                  $period.find("option").not('[value=""]').prop("disabled", false);
                  $period
                    .off("change.epmoPeriodReplace")
                    .on("change.epmoPeriodReplace", function () {
                      var selectedPeriod = String($(this).val() || "").trim();
                      if (
                        typeof End_Workflow !== "undefined" &&
                        End_Workflow.clearMismatchedBenefitPeriodFields
                      ) {
                        End_Workflow.clearMismatchedBenefitPeriodFields(
                          selectedPeriod
                        );
                      }
                      if (
                        typeof ListInfo !== "undefined" &&
                        ListInfo.g &&
                        ListInfo.g.toggleFields
                      ) {
                        ListInfo.g.toggleFields($(this));
                      }
                    });
                  return true;
                }
                $period.prop("disabled", true);
                return false;
              };
              applyBenefitPeriodTypeEditable();
              setTimeout(applyBenefitPeriodTypeEditable, 800);
              setTimeout(applyBenefitPeriodTypeEditable, 2000);
            }
            // Initiative Manager: A–G required when empty on New/Edit
            if (
              listkey == "benefits" &&
              (isNew || isEdit) &&
              window.BenefitsEquationComponentsRequired
            ) {
              setTimeout(function () {
                BenefitsEquationComponentsRequired.bind();
              }, 500);
            }
            // Initiative Manager + Edit + not WF: PerformanceAnalysis + attachments required
            if (
              listkey == "benefits" &&
              isEdit &&
              window.BenefitsActualFieldsRequired
            ) {
              setTimeout(function () {
                BenefitsActualFieldsRequired.bind();
              }, 500);
            }
            // EPMO + Edit: equation section required only after any change in the section
            if (
              listkey == "benefits" &&
              isEdit &&
              window.BenefitsEpmoEquationSectionRequired
            ) {
              setTimeout(function () {
                BenefitsEpmoEquationSectionRequired.bind();
              }, 800);
            }
            // Weight: EPMO at InitiativeBenefits01/02/03; Initiative Manager at InitiativeBenefits00
            if (
              listkey == "benefits" &&
              (isNew || isEdit) &&
              window.BenefitsWeightGuard
            ) {
              setTimeout(function () {
                BenefitsWeightGuard.applyWeightEditAccess();
                BenefitsWeightGuard.applyRemainingMax();
                BenefitsWeightGuard.bindClamp();
              }, 800);
              setTimeout(function () {
                BenefitsWeightGuard.applyWeightEditAccess();
              }, 2000);
            }

            if (listkey == "projects") {
              SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
                Phases_Data_Request.init();
                //Stages_Data_Request.init();
                Sectors_Info.init();
                if (isNew & USERisWF) {
                  window.Idea_Info.init();
                }
                if (isNew & USERisWF) {
                  $(
                    ".CFIELD.autofill input,.CFIELD.autofill textarea ,.CFIELD.autofill select"
                  ).prop("disabled", true);
                } else if (isNew & !USERisWF) {
                  $(
                    ".CFIELD.autofill input,.CFIELD.autofill textarea,.CFIELD.autofill select"
                  ).prop("disabled", false);
                }
              });
              //work on related initiative delevrable
              $("#RelatedInitiative").on("change", function () {
                var initiativeCode = $(this).val();
                ProjectInitiativeDelevrable.init(
                  "InitiativeDeliverables",
                  initiativeCode
                );
                // ProjectInitiativeMilestone.init('InitiativeMilestones', initiativeCode) //to get related initiativeMilestone
                // lookuptoparentchild uses PCODE (missing on New) — refill master Deliverables dropdown from form value
                ListInfo.g.fillMasterRelatedInitiativeDeliverable(initiativeCode);
              });
              //end of related initiative delevrable
              $("#IsStrategicProject").on("change", function () {
                var isStrategicProject = $(this).val();
                Stages_Data_Request.init(isStrategicProject);
              });
            }
            // get the strategy type related to strategy choice
            if (listkey == "sos") {
              Sectors_Info.init();
              $("#RelatedStrategy").on("change", function () {
                var relatedStrategy = $(this).val();
                Goal_Strategy_Info.init(relatedStrategy);
              });
            }
            if (listkey == "mainkpi") {
              // $("select#RelatedStrategy").change(function () {
              //   var relatedStrategyCode = $(this).val();
              //   var indexType = $("#Types").val();
              //   Goal_Strategy_Info.init(relatedStrategyCode);
              //   Kpi_Related_Goal.init(relatedStrategyCode, indexType);
              // });

              // get the sector from goal strategy i choosed

              // $("select#SubRelatedObjective").change(function () {
              //   var sosStrategy = $(this).val();
              //   Get_Related_Sos_Sector.init(sosStrategy);
              // });

              $("select#RelatedStrategyObjective").change(function () {
                var sosStrategy = $(this).val();
                Get_Related_Sos_Sector.init(sosStrategy);
              });
            }
            //
            //to get the milestones related to initiative that assigned to project
            if (listkey == "milestones" && PCODE) {
              Get_ProjectData_ByCode.init();
              // ProjectInitiativeMilestone.init('InitiativeMilestones', initiativeCode) //to get related initiativeMilestone
            }
            //

            New_Data_Submit.g.clickbait();
            New_Data_Submit.g.Cancel();
            $(".loader-box").fadeOut();
            //Risk Grade Matrix
            if (listkey == "risks") {
              $("input#RiskGrade").css(
                "background",
                "linear-gradient(to right, #c1c1c1 , #f6f7f9)"
              );
              $("select#Impact, select#Probability").on("change", function () {
                //Custom Priority formula
                var imp_trivial = $("select#Impact").val() == "Trivial";
                var prob_rare = $("select#Probability").val() == "Rare";
                //
                var imp_minor = $("select#Impact").val() == "Minor";
                var prob_unlikely = $("select#Probability").val() == "Unlikely";
                //
                var imp_moderate = $("select#Impact").val() == "Moderate";
                var prob_moderate = $("select#Probability").val() == "Moderate";
                //
                var imp_major = $("select#Impact").val() == "Major";
                var prob_likely = $("select#Probability").val() == "Likely";
                //
                var imp_extreme = $("select#Impact").val() == "Extreme";
                var prob_verylikely =
                  $("select#Probability").val() == "Very Likely";
                //
                // Low
                if (
                  (imp_trivial && prob_rare) ||
                  (imp_minor && prob_unlikely) ||
                  (imp_minor && prob_rare) ||
                  (imp_moderate && prob_rare) ||
                  (imp_trivial && prob_unlikely) ||
                  (imp_trivial && prob_moderate)
                ) {
                  // console.log("Low");
                  $("input#RiskGrade").val("Low");
                  $("input#RiskGrade").css(
                    "background",
                    "linear-gradient(to right, #37723b, #8cbd90)"
                  );
                }
                //Medium
                else if (
                  (imp_major && prob_rare) ||
                  (imp_extreme && prob_rare) ||
                  (imp_moderate && prob_unlikely) ||
                  (imp_major && prob_unlikely) ||
                  (imp_extreme && prob_unlikely) ||
                  (imp_minor && prob_moderate) ||
                  (imp_moderate && prob_moderate) ||
                  (imp_major && prob_moderate) ||
                  (imp_trivial && prob_likely) ||
                  (imp_minor && prob_likely) ||
                  (imp_moderate && prob_likely) ||
                  (imp_trivial && prob_verylikely) ||
                  (imp_minor && prob_verylikely)
                ) {
                  // console.log("Average");
                  $("input#RiskGrade").val("Medium");
                  $("input#RiskGrade").css(
                    "background",
                    "linear-gradient(to right, #dbdb28, #ffffb0)"
                  );
                }
                //High
                else if (
                  (imp_extreme && prob_moderate) ||
                  (imp_major && prob_likely) ||
                  (imp_extreme && prob_likely) ||
                  (imp_moderate && prob_verylikely) ||
                  (imp_major && prob_verylikely) ||
                  (imp_extreme && prob_verylikely)
                ) {
                  $("input#RiskGrade").val("High");
                  $("input#RiskGrade").css(
                    "background",
                    "linear-gradient(to right, #cc0000, #de9b9b)"
                  );
                } else {
                  $("input#RiskGrade").val("");
                  $("input#RiskGrade").css(
                    "background",
                    "linear-gradient(to right, #c1c1c1 , #f6f7f9)"
                  );
                }
              });
            }
          }
          ListInfo.g.pcodeval(); //no special and spaces allowed
          $(
            "div#particles-foreground, div#particles-background, .vertical-centered-box"
          ).animate(
            {
              opacity: 0,
            },
            {
              duration: 333,
              complete: function () {
                $(
                  "div#particles-foreground, div#particles-background, .vertical-centered-box"
                ).remove();

                // $('div#particles-foreground, div#particles-background, .vertical-centered-box').hide();
              },
            }
          );

          // goalstrategy change the title
          // to handle the title change and the master details section show and hide
          // if (listkey == "initiativedeliverables") {
          //   deliverabeInitiativePercent.init();
          // }
          if (listkey == "initiativemilestones") {
            //initMilestPercent.init();
            // set min max date on planned date for milestones
            if (InitiativeStartDate) {
              let initFinishDate = new Date(InitiativeFinishDate)
                .toISOString()
                .split("T")[0];
              $("input#PlannedCompletedDate").attr("max", initFinishDate);
            }
            if (InitiativeFinishDate) {
              let initStartDate = new Date(InitiativeStartDate)
                .toISOString()
                .split("T")[0];

              $("input#PlannedCompletedDate").attr("min", initStartDate);
            }
          }
          if (listkey == "benefitmetrics") {
            benefitmetricsPercent.init();
          }
          if (listkey == "goalstrategy") {
            $("#Types").on("change", function () {
              if ($(this).val() == "vision") {
                if ($("[data-section_type]").length > 0) {
                  $("[data-section_type]").each(function () {
                    if (
                      localStorage.getItem("lng") == null ||
                      localStorage.getItem("lng") == "ar"
                    ) {
                      $(this)
                        .find("label[for=Name]")
                        .html("البرنامج الاستراتيجي");
                      $(this)
                        .find("#Name")
                        .attr("placeholder", "البرنامج الاستراتيجي");
                      $(this).find(".sideTitle").html("البرامج الاستراتيجية");
                      $(document)
                        .find("label[for=PillarsExist]")
                        .html("هل يوجد برامج؟");
                    } else {
                      $(this).find("label[for=Name]").html("Strategy Program");
                      $(this)
                        .find("#Name")
                        .attr("placeholder", "Strategy Program");
                      $(this).find(".sideTitle").html("Strategy Programs");
                      $(document)
                        .find("label[for=PillarsExist]")
                        .html("Is Programs Exist?");
                    }
                  });
                  // $("[data-section_type]").show()
                }
              } else if (
                $(this).val() == "ministry" ||
                $(this).val() == "sectorial" ||
                $(this).val() == "lms" ||
                $(this).val() == "sub"
              ) {
                if ($("[data-section_type]").length > 0) {
                  $("[data-section_type]").each(function () {
                    if (
                      localStorage.getItem("lng") == null ||
                      localStorage.getItem("lng") == "ar"
                    ) {
                      $(this)
                        .find("label[for=Name]")
                        .html("المحور الاستراتيجي");
                      $(this)
                        .find("#Name")
                        .attr("placeholder", "المحور الاستراتيجي");
                      $(this).find(".sideTitle").html("المحاور الاستراتيجية");
                      $(document)
                        .find("label[for=PillarsExist]")
                        .html("هل يوجد محاور؟");
                    } else {
                      $(this).find("label[for=Name]").html("Name");
                      $(this).find("#Name").attr("placeholder", "Name");
                      $(this).find(".sideTitle").html("Strategy pillars");
                      $(document)
                        .find("label[for=PillarsExist]")
                        .html("Is Pillars Exist?");
                    }
                  });
                  // $("[data-section_type]").show();
                }
              } else {
                $("[data-section_type]").hide();
              }
            });
            if (!isVROP) {
              // to make the pillers radio appear on load when the user is VROP because the default type should be vision
              $("[data-section_type]").hide();
              $("#PillarsExist").parent().hide();
            } else {
              if ($("[data-section_type]").length > 0) {
                $("[data-section_type]").each(function () {
                  if (
                    localStorage.getItem("lng") == null ||
                    localStorage.getItem("lng") == "ar"
                  ) {
                    $(this)
                      .find("label[for=Name]")
                      .html("البرنامج الاستراتيجي");
                    $(this)
                      .find("#Name")
                      .attr("placeholder", "البرنامج الاستراتيجي");
                    // $(this).find("#Name").attr("required", "required")
                    $(this).find(".sideTitle").html("البرامج الاستراتيجية");
                    $(document)
                      .find("label[for=PillarsExist]")
                      .html("هل يوجد برامج؟");
                  } else {
                    $(this).find("label[for=Name]").html("Strategy Program");
                    $(this)
                      .find("#Name")
                      .attr("placeholder", "Strategy Program");
                    $(this).find(".sideTitle").html("Strategy Programs");
                    $(document)
                      .find("label[for=PillarsExist]")
                      .html("Is Programs Exist?");
                  }
                });
              }
              $("[data-section_type]").hide();
            }

            $("body").on("change", "#PillarsExist", function (e) {
              var pillerExistVal = $(this).val();
              if (pillerExistVal == "yes") {
                $("[data-section_type]").show();
              } else {
                $("[data-section_type]").hide();
              }
            });
          }

          // arabic and english field on portfolio listkey
          if (listkey == "portfolio") {
            var arabicVal = "",
              englishVal = "";
            $("#Name").keyup(function (e) {
              //once u press out form keyboard
              var isArabic =
                /^([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd]|[\u0621-\u064A\s0-9]|[ ])*$/g;
              if (isArabic.test(e.target.value)) {
                $(this).val(e.target.value);
                arabicVal = e.target.value;
              } else {
                $(this).val(arabicVal);
              }
            });
            $("#NameEn").keyup(function (e) {
              //to stop writing Arabic language in English Field
              var isEnglish = /^([A-Za-z0-9]|[ ])*$/;
              if (e.target.value.match(isEnglish)) {
                $(this).val(e.target.value);
                englishVal = e.target.value;
              } else {
                $(this).val(englishVal);
              }
            });
          }
          // end arabic and english fields

          //calcul amount from Sum of all costs
          if (listkey == "budgetitems") {
            $('[id^="Cost"]').keyup(function () {
              var sum = 0;
              $('[id^="Cost"]').each(function () {
                var item_val = parseFloat($(this).val());
                if (isNaN(item_val)) {
                  item_val = 0;
                }
                sum += item_val;
                $("#Amount").val(sum);
              });
            });
          }
          if (listkey == "mainkpi" && isEdit) {
            $("#Year").on("change", function () {
              var yearValue = $(this).val();
              Get_ActualAnnualTotal.init(yearValue);
            });
            $("#A, #B, #CC, #D, #E, #F, #G").on("input change", function () {
              // set date to be today 
              var today = new Date();
              var yyyy = today.getFullYear();
              var mm = String(today.getMonth() + 1).padStart(2, '0'); 
              var dd = String(today.getDate()).padStart(2, '0'); 
              var formattedDate = yyyy + '-' + mm + '-' + dd;
          
              $("#ActualkpiDate").val(formattedDate);

                var kpiTitle = $("#Title").val(); // Current KPI title

                // Get the KPI equation from list
                $.ajax({
                    url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('KPIEquations')/items?$filter=DeletionStatus ne 'Deleted' and KPI eq '" + kpiTitle + "'",
                    method: "GET",
                    headers: { "Accept": "application/json;odata=verbose" },
                    success: function (data) {
                        if (data.d.results.length > 0) {
                            var kpiInput = data.d.results[0].KPIInput;
                            var varsMap = {
                                A: parseFloat($("#A").val()) || 0,
                                B: parseFloat($("#B").val()) || 0,
                                C: parseFloat($("#CC").val()) || 0, 
                                D: parseFloat($("#D").val()) || 0,
                                E: parseFloat($("#E").val()) || 0,
                                F: parseFloat($("#F").val()) || 0,
                                G: parseFloat($("#G").val()) || 0
                            };

                            // Replace letters in equation with values
                            var safeEquation = kpiInput.replace(/\b[A-G]\b/g, function(match){
                                return varsMap[match];
                            });

                            try {
                                // Calculate and set result
                                var result = Function('"use strict";return (' + safeEquation + ')')();
                                if (isNaN(result) || !isFinite(result)) result = 0;
                                $("#Equation").val(result);
                            } catch (err) {
                                $("#Equation").val(0);
                                console.error("Error calculating KPI equation:", err);
                            }
                        }
                    },
                    error: function (err) {
                        console.error("Error fetching KPI equation:", err);
                    }
                });
            });
          }
          if (listkey == "benefits" && isEdit) {
            $("#Year").on("change", function () {
              var yearValue = $(this).val();
              Get_BenefitActualAnnualTotal.init(yearValue);
            });
            $("#A, #B, #CC, #D, #E, #F, #G").on("input change", function () {
              if (window.BenefitsEquationComponentsRequired) {
                BenefitsEquationComponentsRequired.refreshField($(this));
              }
              // set date to be today
              var today = new Date();
              var yyyy = today.getFullYear();
              var mm = String(today.getMonth() + 1).padStart(2, "0");
              var dd = String(today.getDate()).padStart(2, "0");
              var formattedDate = yyyy + "-" + mm + "-" + dd;

              $("#ActualkpiDate").val(formattedDate);

              var benefitTitle = $("#Title").val(); // Current Benefit title

              // Get the Benefit equation from KPIEquations list (BenefitCode)
              $.ajax({
                url:
                  _spPageContextInfo.webAbsoluteUrl +
                  "/_api/web/lists/getbytitle('KPIEquations')/items?$filter=DeletionStatus ne 'Deleted' and BenefitCode eq '" +
                  benefitTitle +
                  "'",
                method: "GET",
                headers: { Accept: "application/json;odata=verbose" },
                success: function (data) {
                  if (data.d.results.length > 0) {
                    var benefitInput = data.d.results[0].KPIInput;
                    var varsMap = {
                      A: parseFloat($("#A").val()) || 0,
                      B: parseFloat($("#B").val()) || 0,
                      C: parseFloat($("#CC").val()) || 0,
                      D: parseFloat($("#D").val()) || 0,
                      E: parseFloat($("#E").val()) || 0,
                      F: parseFloat($("#F").val()) || 0,
                      G: parseFloat($("#G").val()) || 0,
                    };

                    var safeEquation = benefitInput.replace(
                      /\b[A-G]\b/g,
                      function (match) {
                        return varsMap[match];
                      }
                    );

                    try {
                      var result = Function(
                        '"use strict";return (' + safeEquation + ")"
                      )();
                      if (isNaN(result) || !isFinite(result)) result = 0;
                      $("#Equation").val(result);
                    } catch (err) {
                      $("#Equation").val(0);
                      console.error(
                        "Error calculating Benefit equation:",
                        err
                      );
                    }
                  }
                },
                error: function (err) {
                  console.error("Error fetching Benefit equation:", err);
                },
              });
            });
            if (window.BenefitsEquationComponentsRequired) {
              BenefitsEquationComponentsRequired.bind();
            }
          }
          if (listkey == "initiatives") {
            function recalcBenefits(benefitsSection) {
              if (!benefitsSection || !benefitsSection.length) return;
          
              var benefitItems = benefitsSection.find(".Details-Item");
              var totalWeight = 0;
          
              benefitItems.each(function () {
                var weightValue = parseFloat($(this).find("input#Weight").val());
                if (!isNaN(weightValue)) totalWeight += weightValue;
              });
          
              var remainingPercentage = 100 - totalWeight;
              if (remainingPercentage < 0) remainingPercentage = 0;
              benefitsSection.find(".remainPercentageVal").text(remainingPercentage + "%");
          
              benefitItems.each(function (index) {
                var $weightInput = $(this).find("input#Weight");
                if (!$weightInput.length) return;
          
                if (index === 0) {
                  $weightInput.removeAttr("max").prop("disabled", false);
                } else {
                  var previousTotal = 0;
                  benefitItems.slice(0, index).each(function () {
                    var prevValue = parseFloat($(this).find("input#Weight").val());
                    if (!isNaN(prevValue)) previousTotal += prevValue;
                  });
          
                  var maxAllowed = 100 - previousTotal;
                  if (maxAllowed < 0) maxAllowed = 0;
          
                  $weightInput.attr("max", maxAllowed).prop("disabled", false);
          
                  var currentValue = parseFloat($weightInput.val());
                  if (!isNaN(currentValue) && currentValue > maxAllowed) {
                    $weightInput.val(maxAllowed);
                  }
                }
              });
            }
          
            var $benefitsSections = $('div[data-target_list="Benefits"]');
            var initialized = false;
          
            function initializeRecalc($section) {
              if (initialized) return;
              initialized = true;
          
              $benefitsSections.on("input change", "input#Weight", function () {
                var $currentSection = $(this).closest('div[data-target_list="Benefits"]');
                var maxAllowed = parseFloat($(this).attr("max"));
                var currentValue = parseFloat($(this).val());
                if (!isNaN(maxAllowed) && !isNaN(currentValue) && currentValue > maxAllowed) {
                  $(this).val(maxAllowed);
                }
                recalcBenefits($currentSection);
              });
          
              $benefitsSections.on("click", ".add-New-Detail, .remove-New-Detail", function () {
                var $currentSection = $(this).closest('div[data-target_list="Benefits"]');
                setTimeout(function () {
                  recalcBenefits($currentSection);
                }, 50);
              });
            }
          
            if (isNew) {
              // على صفحة جديدة: نفعّل الكود فوراً
              $benefitsSections.each(function () {
                recalcBenefits($(this));
              });
              initializeRecalc($benefitsSections);
            }
          
            if (isEdit) {
              // على صفحة تعديل: ننتظر أول تعديل أو إضافة
              $benefitsSections.on("input", "input#Weight", function () {
                initializeRecalc($(this).closest('div[data-target_list="Benefits"]'));
              });
          
              $benefitsSections.on("click", ".add-New-Detail", function () {
                initializeRecalc($(this).closest('div[data-target_list="Benefits"]'));
              });
            }
          
            window.recalcBenefitsForBenefitsSection = function () {
              $benefitsSections.each(function () {
                recalcBenefits($(this));
              });
            };
          }
                  
          ListInfo.g.attachmentsExtensions();

        }
      }
    );
  },
  RenderForm: async function (element, flag, OnSuccess) {
   
 
    if (listkey == "goalstrategy") {
      ListInfo.g.requiredSpillarsName();
    }


    // if(element.useAccessPolicy){
    //   await FunctionAsync(element.useAccessPolicyList)
    // //  initiateDataLevelAccess(element.useAccessPolicyList)
    // }

    var htmlBody = "";
    var groups = [],
      notAllowForGroups = [], //notAllowForGroups  to make the field disable if  not allow for current group and on current form
      hidestagesIDs = "",
      isWfhidestagesIDs = "",
      isWfshowstagesIDs = "",
      showstagesIDs = "",
      disablestagesIDs = "",
      enablestagesIDs = "",
      requireOnWfTaskstagesIDs = "",
      isWfdisablestagesIDs = "",
      isWfenablestagesIDs = "",
      selected = "",
      dynamic = "",
      seconeddynamic = "",
      toggleValues = "",
      toggleFields = "",
      ToggleName = element.hasOwnProperty("ToggleName")
        ? "data-togglename=" + element.ToggleName
        : "",
      editableBy = element.hasOwnProperty("editableBy")
        ? 'data-editableby="' + element.editableBy + '"'
        : "",
      dontSubmit = element.hasOwnProperty("dontSubmit") ? "dont-submit" : "",
      hideField = element.display == "none" ? "hide-field" : "",
      dontSubmitRequired = element.hasOwnProperty("dontSubmitRequired")
        ? "dont-submit even-required"
        : "",
      dontRequest = element.hasOwnProperty("dontRequest") ? "dont-request" : "", // to avoid err on view
      inputLisKey = element.hasOwnProperty("listKey")
        ? `data-listkey="${element.listKey}" `
        : ` `,
      requiredValues = "",
      RequiredName = element.hasOwnProperty("RequiredName")
        ? "data-requiredname=" + element.RequiredName
        : "",
      toggleDisabledValues = "",
      toggleDisabledName = element.hasOwnProperty("ToggleDisabledName")
        ? "data-toggledisabledname=" + element.ToggleDisabledName
        : "";

    renderfield = true;
    window.acceptedExtensions;
    var datecontrolingfield="", dmaxControlingField="",dMinControlingField="", datecontrolingfieldForMinDate="";
        // to handle date controlling field
    if (element.hasOwnProperty("dateControlingField")){
        datecontrolingfield = `date-controling-field="${element.dateControlingField}"`;
      dmaxControlingField=`date-max-field="${element.maxinternalName}"`;
      dMinControlingField=`date-min-field="${element.minInternalName}"`;
      datecontrolingfieldForMinDate = `date-controling-field="${element.listname}"`;

    }
    if (element.hasOwnProperty("security")) {
      if (element.security.groups.length > 0) {
        for (var z = 0; z < element.security.groups.length; z++) {
          groups.push(element.security.groups[z]); //.replace(/\s/g, '')

          if (Groups.indexOf(element.security.groups[z]) == -1) {
            renderfield = false;
          } else {
            renderfield = true;
            // break; // to save all groups in data-groups to can open and close the fields
          }
        }
        groups = groups.join(",");
      }

      //
      if (
        element.security.notAllowTo &&
        element.security.notAllowTo.length > 0
      ) {
        for (var i = 0; i < element.security.notAllowTo.length; i++) {
          notAllowForGroups.push(element.security.notAllowTo[i]);
        }

        notAllowForGroups =
          'data-notallowforgroups="' +
          JSON.stringify(notAllowForGroups).replaceAll(`"`, `'`) +
          '"';
      }
    }

    if (element.hasOwnProperty("requireOnWfTaskStage") && USERisWF) {
      requireOnWfTaskstagesIDs =
        'data-isWfrequirestageID="' + element.requireOnWfTaskStage + '"';
    }

    if (element.hasOwnProperty("hideOnWfTaskStage") && USERisWF) {
      isWfhidestagesIDs =
        'data-isWfhidestageID="' + element.hideOnWfTaskStage + '"';
    }
    if (element.hasOwnProperty("showOnWfTaskStage") && USERisWF) {
      isWfshowstagesIDs =
        'data-isWfshowstageID="' + element.showOnWfTaskStage + '"';
    }
    if (element.hasOwnProperty("disableOnWfTaskStage") && USERisWF) {
      isWfdisablestagesIDs =
        'data-isWfdisablestageID="' + element.disableOnWfTaskStage + '"';
    }
    if (element.hasOwnProperty("enableOnWfTaskStage") && USERisWF) {
      isWfenablestagesIDs =
        'data-isWfenablestageID="' + element.enableOnWfTaskStage + '"';
    }
    if (element.hasOwnProperty("hideonstage") && !USERisWF) {
      hidestagesIDs = 'data-hidestageID="' + element.hideonstage + '"';
    }
    if (element.hasOwnProperty("showonstage") && !USERisWF) {
      showstagesIDs = 'data-showstageID="' + element.showonstage + '"';
    }
    if (element.hasOwnProperty("disableonstage") && !USERisWF) {
      disablestagesIDs = 'data-disablestageID="' + element.disableonstage + '"';
    }
    if (element.hasOwnProperty("enableonstage") && !USERisWF) {
      enablestagesIDs = 'data-enablestageID="' + element.enableonstage + '"';
    }
    if (element.hasOwnProperty("dynamic")) {
      dynamic = "dynamic=" + element.dynamic;
    }

    if (element.hasOwnProperty("seconeddynamic")) {
      seconeddynamic = "seconeddynamic=" + element.seconeddynamic;
    }

    if (element.hasOwnProperty("toggleValues")) {
      element.toggleValues.forEach(function (item, i, arr) {
        var seperator = i == arr.length - 1 ? '"' : ":::";
        toggleValues +=
          i == 0
            ? 'data-toggleValues="' +
              item.value +
              "[" +
              item.fields.join(",") +
              "]" +
              seperator
            : item.value + "[" + item.fields.join(",") + "]" + seperator;
      });

    }
    /////////////////////////
    if (element.hasOwnProperty("requiredValues")) {
      element.requiredValues.forEach(function (item, i, arr) {
        var seperator = i == arr.length - 1 ? '"' : ":::";
        requiredValues +=
          i == 0
            ? 'data-requiredValues="' +
              item.value +
              "[" +
              item.fields.join(",") +
              "]" +
              seperator
            : item.value + "[" + item.fields.join(",") + "]" + seperator;
      });
    }
    /////////////////////////// to handle toggle disabled value
    if (element.hasOwnProperty("toggleDisabledValues")) {
      element.toggleDisabledValues.forEach(function (item, i, arr) {
        var seperator = i == arr.length - 1 ? '"' : ":::";
        toggleDisabledValues +=
          i == 0
            ? 'data-toggleDisabledValues="' +
              item.value +
              "[" +
              item.fields.join(",") +
              "]" +
              seperator
            : item.value + "[" + item.fields.join(",") + "]" + seperator;
      });
    }

    var thistip;
    if (element.tooltip == undefined) {
      thistip = "";
    } else {
      thistip = 'data-tip="' + element.tooltip + '"';
    }
    var infoIconHtml = getFieldInfoIconHtml(element);

    var min;
    if (element.min == "today") {
      min = new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
    } else {
      min = "";
    }
    var max;
    if (element.max == "today") {
      max = new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
    } else {
      max = "9999-12-31";
    }
    selected = "selected";
    var displayName;
    var dispfieldkey;
    var descPhrase, isexist;

    var jsonListKey;

    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {
      displayName = element.DisplayName;
      descPhrase = element.descPhraseAr;
    } else {
      displayName = element.DisplayNameEn;
      descPhrase = element.descPhraseEn;
    }
    if (descPhrase == undefined) {
      isexist = false;
    } else isexist = true;

    if (localStorage.getItem("lng") == "en" && element.DispfieldkeyEn) {
      dispfieldkey = element.DispfieldkeyEn;
    } else dispfieldkey = element.Dispfieldkey;

    //If fileExtensions is added to JSON we should read it from it else we should read it from vaildattchments in List_Name_Config

    if (element.fileExtensions == undefined) {
      acceptedExtensions = FilesExtensions;
    } else {
      acceptedExtensions = element.fileExtensions;
    }

    if (element.Errmsgkey == undefined) {
      Errmsgkey = "fieldIsRequired";
    } else {
      Errmsgkey = element.Errmsgkey;
    }

    // to use it in cr new links
    jsonListKey = element.listkey;
    switch (element.type) {

      case "string":
        var letterPattern = "";
        if (element.withletters) {
          // letterPattern = `pattern="^\\d*[a-zA-Z\\u0600-\\u06FF][a-zA-Z0-9\\u0600-\\u06FF_ -]*$"`;
          letterPattern = `pattern="^(?=.*[a-zA-Z\u0600-\u06FF])(?:[a-zA-Z\u0600-\u06FF]|[\\s\\d\\-\\/@+!&$\\(\\)])+"`;


        }
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '       data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          infoIconHtml +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="text" ' +
          letterPattern +
          ' maxlength="' +
          element.maxchar +
          '" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          "<span data-trans-" +
          Errmsgkey +
          ' class="errMsgField Resources"></span>' +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "stringunique":
        var customQuery =
          "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.listname,
          customQuery,
          [element.InternalName],
          function (records, record, listItem, isDone) {
            if (isDone) {
              records.forEach(function (el, index) {
                var uniqueFieldVal = el[element.InternalName];
                if (uniqueFieldVal) {
                  stringUniqueArr = [...stringUniqueArr, uniqueFieldVal];
                }
              });

              var letterPattern = "";
              if (element.withletters) {
                    letterPattern = `pattern="^(?=.*[a-zA-Z\u0600-\u06FF])(?:[a-zA-Z\u0600-\u06FF]|[\\s\\d\\-\\/@+!&$\\(\\)])+"`;

              }

              var stringUniqueValues =
                'data-stringuniquevalues="' +
                JSON.stringify(stringUniqueArr).replaceAll(`"`, `'`) +
                '"';

              htmlBody =
                '<div class="col-md-6 CFIELD ' +
                dontSubmit +
                " " +
                dontRequest +
                " " +
                dontSubmitRequired +
                " " +
                " " +
                element.className +
                " " +
                hideField +
                ' " ' +
                thistip +
                " " +
                stringUniqueValues +
                " " +
                hidestagesIDs +
                " " +
                editableBy +
                " " +
                showstagesIDs +
                "  " +
                disablestagesIDs +
                "  " +
                enablestagesIDs +
                "   " +
                isWfhidestagesIDs +
                " " +
                requireOnWfTaskstagesIDs +
                " " +
                isWfshowstagesIDs +
                "  " +
                isWfdisablestagesIDs +
                "  " +
                isWfenablestagesIDs +
                '       data-groups="' +
                groups +
                '" ' +
                notAllowForGroups +
                ' style="display:' +
                element.display +
                '">' +
                '<label for="' +
                element.InternalName +
                '" ' +
                element.validation +
                ">" +
                displayName +
                "</label>" +
                "<input " +
                ToggleName +
                " " +
                toggleDisabledName +
                " " +
                RequiredName +
                ' type="text" ' +
                letterPattern +
                ' maxlength="' +
                element.maxchar +
                '" uniqueValueField="yes" placeholder="' +
                displayName +
                '" ' +
                dynamic +
                ' class="form-control SPIField" id="' +
                element.InternalName +
                '" ' +
                element.state +
                " " +
                element.validation +
                ">" +
                "<span data-trans-" +
                Errmsgkey +
                ' class="errMsgField Resources"></span>' +
                '<div class="inputInfo ' +
                isexist +
                '">' +
                descPhrase +
                "</div>" +
                "</div>";
              OnSuccess(flag, htmlBody);
            }
          }
        );

        break;

      case "yearInput":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          " " +
          disablestagesIDs +
          " " +
          enablestagesIDs +
          " " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          " " +
          isWfdisablestagesIDs +
          " " +
          isWfenablestagesIDs +
          ' data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="number" data-manipulates="year" min="" max="2099" step="1" maxdata="' +
          element.max +
          '" mindata="' +
          element.min +
          '" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "number":
        var numberOfDigits = "";
        if (element.numberOfDigits) {
          numberOfDigits = `maxlength=${element.numberOfDigits}`;
        }
        var numberMinMax = "";
        if (listkey == "cryearlycalendar") {
          if (element.InternalName == "Year") numberMinMax = ' min="1900" max="2100"';
          else if (element.InternalName == "Quarter") numberMinMax = ' min="1" max="4"';
          else if (element.InternalName == "Month") numberMinMax = ' min="1" max="12"';
        }

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '"' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="number" ' +
          numberOfDigits +
          numberMinMax +
          ' step="any" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "formula":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '       data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="text" maxlength="' +
          element.maxchar +
          '" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ' style="direction: ltr !important;">' +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "email":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="email" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "code":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="text" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField NoSpChar" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "floattax":
        var numberOfDigits = "";
        if (element.numberOfDigits) {
          numberOfDigits = `maxlength=${element.numberOfDigits}`;
        }
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="float"  ' +
          numberOfDigits +
          '  placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField tax" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          'data-targetelementtax="' +
          element.targetelementtax +
          '"' +
          'data-targetelementamount="' +
          element.targetelementamount +
          '"' +
          " " +
          element.validation +
          ">" +
          "<span data-trans-" +
          Errmsgkey +
          ' class="errMsgField Resources"></span>' +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "floatDuration":
        var numberOfDigits = "";
        if (element.numberOfDigits) {
          numberOfDigits = `maxlength=${element.numberOfDigits}`;
        }

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="float" ' +
          numberOfDigits +
          ' placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField autoEndDate" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          'data-targetelementdate="' +
          element.targetelementdate +
          '"' +
          'data-sourceelementdate="' +
          element.sourceelementdate +
          '"' +
          " " +
          element.validation +
          ">" +
          "<span data-trans-" +
          Errmsgkey +
          ' class="errMsgField Resources"></span>' +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "float":
        var numberOfDigits = "";
        if (element.numberOfDigits) {
          numberOfDigits = `maxlength=${element.numberOfDigits}`;
        }

        // to handle that the value should be smaller than other value
        var max = "",
          resetElement = "";

        var totalElement = "",
          sum1Element = "",
          sum2Element = "",
          reset = "";

          var totalSubElement = "",
          sub1Element = "",
          sub2Element = "";

        var totalperElement = "",
          per1Element = "",
          per2Element = "";

          var totalMBElement = "",
          mb1Element = "",
          mb2Element = "",
          totalWRElement = "",
          date1Element = "",
          date2Element = "";

          var totalProgressElement = "",
          prog1Element = "",
          prog2Element = "";
       
          var statuschangeElement = "",
          status1Element = "",
          status2Element = "",
          status3Element = "";

        if (element.max) {
          max = `data-maxField=${element.max}`;
        }

        if (element.resetElement) {
          reset = "resetElements";

          resetElement =
            'data-resetElement="' +
            JSON.stringify(element.resetElement).replaceAll(`"`, `'`) +
            '"';
          // resetElement = `data-resetElement=${element.resetElement}`
        }

        if (
          element.totalElement &&
          element.sum1Element &&
          element.sum2Element
        ) {
          totalElement = `data-totalElement=${element.totalElement}`;
          sum1Element = `data-sum1Element=${element.sum1Element}`;
          sum2Element = `data-sum2Element=${element.sum2Element}`;
        }

        if (
          element.totalperElement &&
          element.per1Element &&
          element.per2Element
        ) {
          totalperElement = `data-totalperElement=${element.totalperElement}`;
          per1Element = `data-per1Element=${element.per1Element}`;
          per2Element = `data-per2Element=${element.per2Element}`;
        }

        if (
          element.totalSubElement &&
          element.sub1Element &&
          element.sub2Element
        ) {
          totalSubElement = `data-totalSubElement=${element.totalSubElement}`;
          sub1Element = `data-sub1Element=${element.sub1Element}`;
          sub2Element = `data-sub2Element=${element.sub2Element}`;
        }

        if (
          element.totalMBElement &&
          element.mb1Element &&
          element.mb2Element &&
          element.date1Element &&
          element.date2Element ) {
          totalMBElement = `data-totalMBElement=${element.totalMBElement}`;
          mb1Element = `data-mb1Element=${element.mb1Element}`;
          mb2Element = `data-mb2Element=${element.mb2Element}`;
          date1Element = `data-date1Element=${element.date1Element}`;
          date2Element = `data-date2Element=${element.date2Element}`;
        }

        if(element.totalWRElement)
        {
          totalWRElement = `data-totalWRElement=${element.totalWRElement}`;
        }

        if (
          element.totalProgressElement &&
          element.prog1Element ) {
          totalProgressElement = `data-totalProgressElement=${element.totalProgressElement}`;
          prog1Element = `data-prog1Element=${element.prog1Element}`;
        }
       
        if(element.prog2Element)
          {
           prog2Element = `data-prog2Element=${element.prog2Element}`;
          }

        if (
          element.statuschangeElement &&
          element.status1Element  &&
          element.status2Element &&
          element.status3Element
        ) {
          statuschangeElement = `data-statuschangeElement=${element.statuschangeElement}`;
          status1Element = `data-status1Element=${element.status1Element}`;
          status2Element = `data-status2Element=${element.status2Element}`;
          status3Element = `data-status3Element=${element.status3Element}`;
        }

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          totalElement +
          " " +
          sum1Element +
          " " +
          sum2Element +
          " " +
          totalSubElement +
          " " +
          sub1Element +
          " " +
          sub2Element +
          " " +
          totalperElement +
          " " +
          per1Element +
          " " +
          per2Element +
          " " +
          totalMBElement +
          " " +
          mb1Element +
          " " +
          mb2Element +
          " " +
          date1Element +
          " " +
          date2Element +
          " " +
          totalWRElement +
          " " +
          totalProgressElement +
          " " +
          prog1Element + 
          " " +
          prog2Element + 
          " " +
          statuschangeElement +
          " " +
          status1Element + 
          " " +
          status2Element +
          " " +
          status3Element +
          " " +
          max +
          " " +
          resetElement +
          " " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="float" ' +
          numberOfDigits +
          ' placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField number ' +
          reset +
          '" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "phonenumber": // ksa phone number validation
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="text" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ' pattern="(05|5|009665|9665|01|009661|9661)(5|0|3|6|4|9|1|8|7)([0-9]{7})"/>' +
          "<span data-trans-" +
          Errmsgkey +
          ' class="errMsgField Resources"></span>' +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "floatwithoutformatting":
        var numberOfDigits = "";
        if (element.numberOfDigits) {
          numberOfDigits = `maxlength=${element.numberOfDigits}`;
        }

        var totalElement = "",
        sum1Element = "",
        sum2Element = "",
        reset = "";

        if (
          element.totalElement &&
          element.sum1Element &&
          element.sum2Element
        ) {
          totalElement = `data-totalElement=${element.totalElement}`;
          sum1Element = `data-sum1Element=${element.sum1Element}`;
          sum2Element = `data-sum2Element=${element.sum2Element}`;
        }

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          totalElement +
          " " +
          sum1Element +
          " " +
          sum2Element +
          " " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="float" ' +
          numberOfDigits +
          ' placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "weightfloatpercentage":
        var code = activeCode;

        var customQuery =
          "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='" +
          element.targetcode +
          '\' /><Value Type="Text">' +
          code +
          "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

        // also there is some code in edit data request
        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.listname,
          customQuery,
          [element.targetelement],
          function (records, record, listItem, isDone) {
            if (isDone) {
              var totalWeight = 0;
              records.forEach(function (el, index) {
                totalWeight += el[element.targetelement]
                  ? el[element.targetelement]
                  : 0;
              });

              var RemainingBudget = 100 - totalWeight;
              RemainingBudget = Number(RemainingBudget.toFixed(1));

              var newVal;
              var inpVal = 0;
              newVal =
                RemainingBudget + inpVal >= 100
                  ? RemainingBudget
                  : RemainingBudget + inpVal;
              newVal = Number(newVal.toFixed("2"));

              htmlBody =
                '<div class="col-md-6 CFIELD ' +
                dontSubmit +
                " " +
                dontRequest +
                " " +
                dontSubmitRequired +
                " " +
                " " +
                element.className +
                " " +
                hideField +
                ' " ' +
                thistip +
                " " +
                hidestagesIDs +
                " " +
                editableBy +
                " " +
                showstagesIDs +
                "  " +
                disablestagesIDs +
                "  " +
                enablestagesIDs +
                "   " +
                isWfhidestagesIDs +
                " " +
                requireOnWfTaskstagesIDs +
                " " +
                isWfshowstagesIDs +
                "  " +
                isWfdisablestagesIDs +
                "  " +
                isWfenablestagesIDs +
                '        data-groups="' +
                groups +
                '" ' +
                notAllowForGroups +
                ' style="display:' +
                element.display +
                '">' +
                '<label for="' +
                element.InternalName +
                '" ' +
                element.validation +
                ">" +
                displayName +
                '<span data-trans-remainperc class="Resources remainpercstyle"></span><span class="remainpercstyle remainPercentageVal">' +
                newVal +
                "]</span>" +
                "</label>" +
                "<input " +
                ToggleName +
                " " +
                toggleDisabledName +
                " " +
                RequiredName +
                ' type="number" max=' +
                newVal +
                ' title="Please enter value between 0 and 100" step="any" placeholder="' +
                displayName +
                '" ' +
                dynamic +
                ' class="form-control SPIField weightfloatpercentage" data-weightvalue="" id="' +
                element.InternalName +
                '" ' +
                element.state +
                " " +
                'data-targetelem="' +
                element.seconedtarget +
                '"' +
                " " +
                element.validation +
                ` onchange="this.value = (this.value && Math.abs(this.value) >= 0) && (this.value && Math.abs(this.value) <= 100) ? Math.abs(this.value) : null">` +
                "<span data-trans-" +
                Errmsgkey +
                ' class="errMsgField Resources"></span>' +
                '<div class="inputInfo ' +
                isexist +
                '">' +
                descPhrase +
                "</div>" +
                "</div>";
              OnSuccess(flag, htmlBody);
            }
          }
        );
        break;

      case "floatpercentagemaxfromparent":
          var code = activeCode;
        
          // Build the CAML query to get sibling records from the same list and same parent
          var customQuery =
            "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='" +
            element.siblingstargetcode +
            '\' /><Value Type="Text">' +
            code +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        
          sphttp.get(
            _spPageContextInfo.siteServerRelativeUrl,
            element.siblingslistname,
            customQuery,
            [element.InternalName, "ID"],
            function (records, record, listItem, isDone) {
              if (isDone) {
                var totalWeight = 0;
                var currentItemId =
                  typeof isEdit !== "undefined" &&
                  isEdit &&
                  typeof listkey !== "undefined" &&
                  listkey == "benefits" &&
                  typeof IID !== "undefined" &&
                  IID
                    ? String(IID)
                    : "";
        
                // Sum sibling weights (exclude current benefit on Edit so remaining = 100 - others)
                records.forEach(function (el) {
                  if (currentItemId && String(el.ID) === currentItemId) return;
                  totalWeight += el[element.InternalName] ? el[element.InternalName] : 0;
                });
        
                // Calculate remaining percentage
                var Remaining = 100 - totalWeight;
                Remaining = Number(Remaining.toFixed(1));
        
                // Prevent negative or invalid remaining values
                if (Remaining < 0) Remaining = 0;
        
                // Build the HTML field, similar to floatpercentage
                htmlBody =
                  '<div class="col-md-6 CFIELD ' +
                  dontSubmit +
                  " " +
                  dontRequest +
                  " " +
                  dontSubmitRequired +
                  " " +
                  element.className +
                  " " +
                  hideField +
                  ' " ' +
                  thistip +
                  " " +
                  hidestagesIDs +
                  " " +
                  editableBy +
                  " " +
                  showstagesIDs +
                  "  " +
                  disablestagesIDs +
                  "  " +
                  enablestagesIDs +
                  "   " +
                  isWfhidestagesIDs +
                  " " +
                  requireOnWfTaskstagesIDs +
                  " " +
                  isWfshowstagesIDs +
                  "  " +
                  isWfdisablestagesIDs +
                  "  " +
                  isWfenablestagesIDs +
                  ' data-groups="' +
                  groups +
                  '" ' +
                  notAllowForGroups +
                  ' style="display:' +
                  element.display +
                  '">' +
                  '<label for="' +
                  element.InternalName +
                  '" ' +
                  element.validation +
                  ">" +
                  displayName +
                  '<span data-trans-remainperc class="Resources remainpercstyle"></span><span class="remainpercstyle remainPercentageVal">' +
                  Remaining +
                  "]</span>" +
                  "</label>" +
                  "<input " +
                  ToggleName +
                  " " +
                  toggleDisabledName +
                  " " +
                  RequiredName +
                  ' type="number" min="0" max="' +
                  Remaining +
                  '" title="Please enter value between 0 and ' +
                  Remaining +
                  '" step="any" placeholder="' +
                  displayName +
                  '" ' +
                  dynamic +
                  ' class="form-control SPIField floatpercentagemaxfromparent" id="' +
                  element.InternalName +
                  '" ' +
                  element.state +
                  " " +
                  element.validation +
                  ' oninput="var m=parseFloat(this.getAttribute(\'max\'));var n=Math.abs(parseFloat(this.value));if(this.value===\'\'||isNaN(n)){this.value=\'\';return;}if(!isNaN(m)&&n>m){this.value=m;}else{this.value=n;}">' +
                  '<span data-trans-' +
                  Errmsgkey +
                  ' class="errMsgField Resources"></span>' +
                  '<div class="inputInfo ' +
                  isexist +
                  '">' +
                  descPhrase +
                  "</div>" +
                  "</div>";
        
                OnSuccess(flag, htmlBody);
              }
            }
          );
          break;
        
      case "floatpercentage":
      
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="number" title="Please enter value between 0 and 100" step="any" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ' oninput="this.value = (this.value && Math.abs(this.value) >= 0) && (this.value && Math.abs(this.value) <= 100) ? Math.abs(this.value) : null">' +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "percentbyrelatedparent":

    

        var code = activeCode;

        var customQuery =
          '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
          code +
          "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>";

        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.listname,
          customQuery,
          [element.parentinternalname],
          function (records, record, listItem, isDone) {
            if (isDone) {
              var parentValue = "";
              records.forEach(function (el, index) {
                parentValue = el[element.parentinternalname];
              });

              parentBudgetValue = parentValue;
            
              htmlBody =
                '<div class="col-md-6 CFIELD ' +
                dontSubmit +
                " " +
                dontRequest +
                " " +
                dontSubmitRequired +
                " " +
                " " +
                element.className +
                " " +
                hideField +
                ' " ' +
                thistip +
                " " +
                hidestagesIDs +
                " " +
                editableBy +
                " " +
                showstagesIDs +
                "  " +
                disablestagesIDs +
                "  " +
                enablestagesIDs +
                "   " +
                isWfhidestagesIDs +
                " " +
                requireOnWfTaskstagesIDs +
                " " +
                isWfshowstagesIDs +
                "  " +
                isWfdisablestagesIDs +
                "  " +
                isWfenablestagesIDs +
                '        data-groups="' +
                groups +
                '" ' +
                notAllowForGroups +
                ' style="display:' +
                element.display +
                '">' +
                '<label for="' +
                element.InternalName +
                '" ' +
                element.validation +
                ">" +
                displayName +
                "</label>" +
                "<input " +
                ToggleName +
                " " +
                toggleDisabledName +
                " " +
                RequiredName +
                ' type="number" title="" step="any" placeholder="' +
                displayName +
                '" ' +
                dynamic +
                ' class="form-control SPIField percentbyparent" id="' +
                element.InternalName +
                '" ' +
                'data-parentval="' +
                parentValue +
                '"' +
                'data-targetelem="' +
                element.targetelement +
                '"' +
                element.state +
                " " +
                element.validation +
                ">" +
                "<span data-trans-" +
                Errmsgkey +
                ' class="errMsgField Resources"></span>' +
                '<div class="inputInfo ' +
                isexist +
                '">' +
                descPhrase +
                "</div>" +
                "</div>";
                if ((listkey == 'initiativedeliverables' || listkey == 'milestones') && IsZeroBudgetProject == true && element.InternalName == "Amount") {
                  OnSuccess(flag, '');
                } else {

                  OnSuccess(flag, htmlBody);
                }
            }
          }
        );
        break;
      case "decimalpercentage":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="number" title="Please enter value between 0 and 100" step="any" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField decimalnumber" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ' pattern="^d*(.d{0,2})?$">' +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "percentage":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="number" min="0" max="100" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "datetime":
        var maxOnChild = "";
        var targetOn = "";

        var autoSetDate = "",
          sourceelement = "",
          targetelement = "";

          var totalDurElement = "",
          date1Element = "",
          date2Element = "",
          date3Element = "",
          totalWHElement="",
          statuschangeElement = "";

          var durationelement = "",
          startdateelement = "",
          enddateelement = "";

        if (element.maxOnChild) {
          maxOnChild = "maxOnChild";
        }

        if (element.autoSetDate) {
          autoSetDate = "autoSetDate";
          sourceelement = `data-sourceelement=${element.sourceelement}`;
          targetelement = `data-targetelement=${element.targetelement}`;
        }

        if (
          element.durationelement &&
          element.startdateelement &&
          element.enddateelement
        ) {
          durationelement = `data-durationelement=${element.durationelement}`;
          startdateelement = `data-startdateelement=${element.startdateelement}`;
          enddateelement = `data-enddateelement=${element.enddateelement}`;
        }

        if (
          element.totalDurElement &&
          element.date1Element &&
          element.date2Element &&
          element.date3Element
        ) {
          totalDurElement = `data-totalDurElement=${element.totalDurElement}`;
          date1Element = `data-date1Element=${element.date1Element}`;
          date2Element = `data-date2Element=${element.date2Element}`;
          date3Element = `data-date3Element=${element.date3Element}`;
          totalWHElement = `data-totalWHElement=${element.totalWHElement}`;
          if(element.statuschangeElement)
          {
             statuschangeElement = $(this).data("statuschangeelement");
          }
        }

        if (element.targetOn && element.targetOn != "undefined") {
          targetOn = `data-targetOn=${element.targetOn}`;
        } else {
          targetOn = "";
        }

        let childrenIDs = element.childsId
          ? 'data-childsId="' +
            JSON.stringify(element.childsId).replaceAll(`"`, `'`) +
            '"'
          : "";

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          " " +
          childrenIDs +
          " " +
          targetOn +
          " " +
          totalDurElement +
          " " +
          date1Element +
          " " +
          date2Element +
          " " +
          date3Element +
          " " +
          totalWHElement +
          " " +
          statuschangeElement + 
          " " +
          startdateelement +
          " " +
          enddateelement +
          " " +
          durationelement+
          " " +
          sourceelement +
          " " +
          targetelement +
          ' type="date" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField ' +
          maxOnChild +
          " " +
          autoSetDate +
          '" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ' minimumdate="' +
          element.min +
          '" maximumdate="' +
          element.max +
          '"  max="' +
          max +
          '" min=' +
          min +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;
      case "datecontrolingfield":

        var maxOnChild = "";
        var targetOn = "";

        var autoSetDate = "",
          sourceelement = "",
          targetelement = "";

        if (element.maxOnChild) {
          maxOnChild = "maxOnChild";
        }

        if (element.autoSetDate) {
          autoSetDate = "autoSetDate";
          sourceelement = `data-sourceelement=${element.sourceelement}`;
          targetelement = `data-targetelement=${element.targetelement}`;
        }

        if (element.targetOn && element.targetOn != "undefined") {
          targetOn = `data-targetOn=${element.targetOn}`;
        } else {
          targetOn = "";
        }

        let childsId = element.childsId
          ? 'data-childsId="' +
            JSON.stringify(element.childsId).replaceAll(`"`, `'`) +
            '"'
          : "";

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          " " +
          childsId +
          " " +
          targetOn +
          " " +
          sourceelement +
          " " +
          targetelement +
          ' type="date" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField ' +
          maxOnChild +
          " " +
          autoSetDate +
          '" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ' minimumdate="' +
          element.min +
          '" maximumdate="' +
          element.max +
          '"  max="' +
          max +
          '" min=' +
          min
          + ' '
          + datecontrolingfield
          + dmaxControlingField
          + dMinControlingField
          +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "datetimetoparent": // handle date from parent (start/end optional: only fetch & apply if present)
        var code = activeCode;

        //activecode
        var customQuery =
          '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
          code +
          "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>";

        var startDate = "",
          finishDate = "";
        var parentDateFields = [];
        if (element.startinternalname) {
          parentDateFields.push(element.startinternalname);
        }
        if (element.endinternalname) {
          parentDateFields.push(element.endinternalname);
        }

        var buildDateToParentHtml = function (minDateVal, maxDateVal) {
          var minAttr = minDateVal ? ' min="' + minDateVal + '"' : "";
          var maxAttr = maxDateVal ? ' max="' + maxDateVal + '"' : "";
          var setYearToFieldName =
            element.setYearToField ||
            (listkey == "benefits" &&
            isNew &&
            element.InternalName == "PlannedAchievementDate"
              ? "ToDate"
              : "");
          var setYearToFieldAttr = setYearToFieldName
            ? ' data-setyeartofield="' +
              setYearToFieldName +
              '" oninput="if(window.syncYearFromDateField){window.syncYearFromDateField(this);}" onchange="if(window.syncYearFromDateField){window.syncYearFromDateField(this);}"'
            : "";

          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            " " +
            hideField +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            editableBy +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            "<input " +
            ToggleName +
            " " +
            toggleDisabledName +
            " " +
            RequiredName +
            ' type="date" onkeydown="return false" placeholder="' +
            displayName +
            '" ' +
            dynamic +
            ' class="form-control SPIField" id="' +
            element.InternalName +
            '" ' +
            element.state +
            " " +
            element.validation +
            ' minimumdate="' +
            element.min +
            '" maximumdate="' +
            element.max +
            '"' +
            maxAttr +
            minAttr +
            setYearToFieldAttr +
            ">" +
            "<span data-trans-" +
            Errmsgkey +
            ' class="errMsgField Resources"></span>' +
            '<div class="inputInfo ' +
            isexist +
            '">' +
            descPhrase +
            "</div>" +
            "</div>";
          OnSuccess(flag, htmlBody);
        };

        if (parentDateFields.length && element.listname) {
          sphttp.get(
            _spPageContextInfo.siteServerRelativeUrl,
            element.listname,
            customQuery,
            parentDateFields,
            function (records, record, listItem, isDone) {
              // if (listItem) itemsID.push(listItem.get_id());
              if (isDone) {
                records.forEach(function (el, index) {
                  if (element.startinternalname) {
                    startDate = el[element.startinternalname];
                  }
                  if (element.endinternalname) {
                    finishDate = el[element.endinternalname];
                  }
                });

                var minDateVal =
                  element.startinternalname && startDate
                    ? Dynamic_Data_Request.g.convertdate(startDate)
                    : "";
                var maxDateVal =
                  element.endinternalname && finishDate
                    ? Dynamic_Data_Request.g.convertdate(finishDate)
                    : "";
                buildDateToParentHtml(minDateVal, maxDateVal);
              }
            }
          );
        } else {
          buildDateToParentHtml("", "");
        }
        break;

      case "datewithtimetoparent":
        var code = activeCode;

        //activecode
        var customQuery =
          '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
          code +
          "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>";

        var startDate = "",
          finishDate = "";

        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.listname,
          customQuery,
          [element.startinternalname, element.endinternalname],
          function (records, record, listItem, isDone) {
            if (isDone) {
              records.forEach(function (el, index) {
                startDate = el[element.startinternalname];
                finishDate = el[element.endinternalname];
              });

              minDate = Dynamic_Data_Request.g.convertdate(startDate);
              maxDate = Dynamic_Data_Request.g.convertdate(finishDate);
              htmlBody =
                '<div class="col-md-6 CFIELD dateTime' +
                dontSubmit +
                " " +
                dontRequest +
                " " +
                dontSubmitRequired +
                " " +
                " " +
                element.className +
                " " +
                hideField +
                ' " ' +
                thistip +
                " " +
                hidestagesIDs +
                " " +
                editableBy +
                " " +
                showstagesIDs +
                "  " +
                disablestagesIDs +
                "  " +
                enablestagesIDs +
                "   " +
                isWfhidestagesIDs +
                " " +
                requireOnWfTaskstagesIDs +
                " " +
                isWfshowstagesIDs +
                "  " +
                isWfdisablestagesIDs +
                "  " +
                isWfenablestagesIDs +
                '        data-groups="' +
                groups +
                '" ' +
                notAllowForGroups +
                ' style="display:' +
                element.display +
                '">' +
                '<label for="' +
                element.InternalName +
                '" ' +
                element.validation +
                ">" +
                displayName +
                "</label>" +
                "<div " +
                ToggleName +
                " " +
                toggleDisabledName +
                " " +
                RequiredName +
                ' class="datetimeinputs"><input type="datetime-local" placeholder="' +
                displayName +
                '" ' +
                dynamic +
                ' class="form-control SPIField withTime" id="' +
                element.InternalName +
                '" ' +
                element.state +
                " " +
                element.validation +
                ' minimumdate="' +
                element.min +
                '" maximumdate="' +
                element.max +
                '"  max="' +
                maxDate +
                'T00:00" min=' +
                minDate +
                "T00:00>" +
                "</div>" +
                '<div class="inputInfo ' +
                isexist +
                '">' +
                descPhrase +
                "</div>" +
                "</div>";
              OnSuccess(flag, htmlBody);
            }
          }
        );

        break;

      case "datewithtime":
        htmlBody =
          '<div class="col-md-6 CFIELD dateTime' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<div " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' class="datetimeinputs"><input type="datetime-local" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField withTime" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ' minimumdate="' +
          element.min +
          '" maximumdate="' +
          element.max +
          '"  max="' +
          max +
          '" min=' +
          min +
          ">" +
          "</div>" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

        
      // case 'datewithtime':
      //     htmlBody =
      //         '<div class="col-md-6 CFIELD dateTime' + element.className + ' " ' + thistip + ' ' + hidestagesIDs + ' '+editableBy+' ' + showstagesIDs + '  ' + disablestagesIDs + '  ' + enablestagesIDs + '   ' + isWfhidestagesIDs + ' '+requireOnWfTaskstagesIDs+' ' + isWfshowstagesIDs + '  ' + isWfdisablestagesIDs + '  ' + isWfenablestagesIDs + '        data-groups="' + groups + '" style="display:' + element.display + '">' +
      //         '<label for="' + element.InternalName + '" ' + element.validation + '>' + displayName + '</label>' +
      //         '<div class="datetimeinputs"><input type="date" placeholder="' + displayName + '" ' + dynamic + ' class="form-control SPIField withTime" id="' + element.InternalName + '" ' + element.state + ' ' + element.validation + ' minimumdate="' + element.min + '" maximumdate="' + element.max + '"  max="9999-12-31" min="1900-01-01">' +
      //         '<input type="time"  class="form-control SPIField" id="Time"></div>' +
      //         '</div>';
      //     OnSuccess(flag, htmlBody);
      //     break;

      case "picker":
        var targetsiblingarr = "";
        var addSeblingClass = "";

        if (
          element.targetsiblingarr &&
          element.targetsiblingarr != "undefined"
        ) {
          targetsiblingarr = element.targetsiblingarr;
          addSeblingClass = "getpickersiblingdata";
          targetsiblingarr =
            'data-targetsiblingarr="' +
            JSON.stringify(element.targetsiblingarr).replaceAll(`"`, `'`) +
            '"';
        }

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<div " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' class="PPField SPIField form-control ' +
          addSeblingClass +
          '" type="picker" id="' +
          element.InternalName +
          '" value="" placeholder="' +
          displayName +
          '" INppicker="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          targetsiblingarr +
          ' style="display:' +
          element.display +
          '" ' +
          element.validation +
          "></div>" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "multipicker":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<div " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' class="PPField SPIField form-control" type="multipicker" id="' +
          element.InternalName +
          '" value="" placeholder="' +
          displayName +
          '" INppicker="' +
          element.InternalName +
          '" ' +
          element.state +
          ' style="display:' +
          element.display +
          '" ' +
          element.validation +
          "></div>" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "dropdown":
        var statusElement = "",
        sourceElement = "",
        targetElement = ""; 


        if (
          element.statusElement &&
          element.sourceElement &&
          element.targetElement
        ) {
          statusElement = `data-statusElement=${element.statusElement}`;
          sourceElement = `data-sourceElement=${element.sourceElement}`;
          targetElement = `data-targetElement=${element.targetElement}`;
        }

        var classNameValue = element.hasOwnProperty("className") ? element.className : "";
        var displayValue = element.hasOwnProperty("display") ? element.display : "";

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          classNameValue +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          displayValue +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<select " +
          toggleDisabledValues +
          " " +
          toggleValues +
          " " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          " " +
          requiredValues +
          ' type="dropdown" value="" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          statusElement +
          " " +
          sourceElement +
          " " +
          targetElement +
          " " +
          element.validation +
          '><option value="" ' +
          selected +
          " disabled>" +
          displayName +
          "</option>";
        for (var i = 0; i < element.options.choices.length; i++) {
          //
          htmlBody +=
            '<option value="' +
            element.options.choices[i] +
            '">' +
            element.options.choices[i] +
            "</option>";
        }
        htmlBody +=
          "</select>" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "groupsOfPicker":
        // Support both 'parent' and 'parentField' properties
        var parentFieldName = element.hasOwnProperty("parentField") 
          ? element.parentField 
          : (element.hasOwnProperty("parent") ? element.parent : "");
        
        var parentFieldAttr = parentFieldName 
          ? `data-parent-field="${parentFieldName}"` 
          : "";
        
        var classNameValue = element.hasOwnProperty("className") ? element.className : "";
        var displayValue = element.hasOwnProperty("display") ? element.display : "";

        // Check if options and choices exist
        var choices = [];
        if (element.hasOwnProperty("options") && 
            element.options && 
            element.options.hasOwnProperty("choices") && 
            Array.isArray(element.options.choices)) {
          choices = element.options.choices;
        }

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          classNameValue +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          displayValue +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<select " +
          toggleDisabledValues +
          " " +
          toggleValues +
          " " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          " " +
          requiredValues +
          ' type="groupsOfPicker" value="" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField groups-of-picker" id="' +
          element.InternalName +
          '" ' +
          parentFieldAttr +
          " " +
          element.state +
          " " +
          element.validation +
          '><option value="" ' +
          selected +
          " disabled>Select Group</option>";
        for (var i = 0; i < choices.length; i++) {
          var groupName = choices[i];
          var role = window.getRoleForGroupName ? window.getRoleForGroupName(groupName) : null;
          var dataTransAttr = role ? ' data-trans-' + role + ' class="Resources"' : '';
          htmlBody +=
            '<option value="' +
            groupName +
            '"' +
            dataTransAttr +
            '>' +
            groupName +
            "</option>";
        }
        htmlBody +=
          "</select>" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        
        // Call changeResources after DOM is ready to translate groups options
        setTimeout(function() {
          if (typeof changeResources === 'function') {
            changeResources();
          }
        }, 100);
        
        // Add event listener to load groups when parent picker changes
        if (parentFieldName) {
          var groupsOfPickerId = element.InternalName;
          var parentPickerId = parentFieldName;
          
          // Use setTimeout to ensure the DOM is ready and picker is initialized
          setTimeout(function() {
            // Listen for user:changed event from the parent picker
            $('#' + parentPickerId).on("user:changed", function() {
              var groupsSelect = $('#' + groupsOfPickerId);
              if (groupsSelect.length) {
                // Get the selected user from picker
                var hiddenInput = $('#' + parentPickerId + '_TopSpan_HiddenInput');
                if (hiddenInput.length && hiddenInput.val()) {
                  try {
                    // Replace &quot; with " before parsing JSON
                    var inputValue = hiddenInput.val().replace(/&quot;/g, '"');
                    var userData = JSON.parse(inputValue);
                    if (userData && userData.length > 0) {
                      var userLogin = userData[0].Key || userData[0].AutoFillKey || "";
                      if (userLogin) {
                        // Use the full Key format for SharePoint API (e.g., "i:0#.w|prod\\g.zouebi")
                        loadUserGroupsFromSharePoint(userLogin, groupsOfPickerId);
                      } else {
                        groupsSelect.find('option:not(:first)').remove();
                      }
                    } else {
                      groupsSelect.find('option:not(:first)').remove();
                    }
                  } catch (e) {
                    console.error("Error parsing user data:", e);
                    groupsSelect.find('option:not(:first)').remove();
                  }
                } else {
                  groupsSelect.find('option:not(:first)').remove();
                }
              }
            });
            
            // Also trigger on initial load if picker already has a value (for edit mode or pre-filled forms)
            setTimeout(function() {
              var hiddenInput = $('#' + parentPickerId + '_TopSpan_HiddenInput');
              if (hiddenInput.length && hiddenInput.val()) {
                try {
                  // Replace &quot; with " before parsing JSON
                  var inputValue = hiddenInput.val().replace(/&quot;/g, '"');
                  var userData = JSON.parse(inputValue);
                  if (userData && userData.length > 0) {
                    var userLogin = userData[0].Key || userData[0].AutoFillKey || "";
                    if (userLogin) {
                      // Use the full Key format for SharePoint API
                      loadUserGroupsFromSharePoint(userLogin, groupsOfPickerId);
                    }
                  }
                } catch (e) {
                  console.error("Error parsing user data on initial load:", e);
                }
              }
            }, 1000);
          }, 500);
        }
        
        OnSuccess(flag, htmlBody);
        break;

      case "dropdownValues":
        // added for CR module
        let customFilter = element.options.choices[0].hasOwnProperty(
          "customFilterValue"
        )
          ? 'iscustomfiltervalue="true"'
          : "";
        let customCr = element.hasOwnProperty("customCr")
          ? element.customCr
          : false;

        //////////////////
        //to not invoke dynamic in edit cause الاستراتيجية المرتبطة don't submit so the value will disappear
        var stopinvokeparent = "";

        if (element.stopinvokeparent) {
          stopinvokeparent = `data-stopinvokeparent=${element.stopinvokeparent}`;
        } else {
          stopinvokeparent = "";
        }
        //////////////////

        var grandFieldId = "";
        if (element.grandFieldId) {
          grandFieldId = `data-grandFieldId=${element.grandFieldId}`;
        } else {
          grandFieldId = "";
        }

        var childFieldId = "";
        if (element.childFieldId) {
          childFieldId = `data-childFieldId=${element.childFieldId}`;
        } else {
          childFieldId = "";
        }

        var grandFieldInvokeclass = "";

        if (grandFieldId && childFieldId) {
          grandFieldInvokeclass = "grandFieldInvoke";
        }

        var childFieldIdSource = "";

        if (element.childFieldIdSource) {
          childFieldIdSource = `data-childFieldIdSource=${element.childFieldIdSource}`;
        } else {
          childFieldIdSource = "";
        }

      

        if (crListKey && isCrMode && customCr) {
          htmlBody = "";
          //ended
        } else {
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            " " +
            hideField +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            editableBy +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            "<select " +
            toggleDisabledValues +
            " " +
            toggleValues +
            " " +
            ToggleName +
            " " +
            toggleDisabledName +
            " " +
            RequiredName +
            " " +
            requiredValues +
            " " +
            grandFieldId +
            " " +
            childFieldId +
            " " +
            childFieldIdSource +
            " " +
            stopinvokeparent +
            (element.getValueFromLookup ? ' data-getvaluefromlookup="true" data-getvaluefromlookup-field="' + element.getValueFromLookup.lookupField + '" data-getvaluefromlookup-list="' + element.getValueFromLookup.lookupList + '" data-getvaluefromlookup-fieldtoget="' + element.getValueFromLookup.lookupFieldToGet + '"' : '') +
            ' type="dropdown" value="" placeholder="' +
            displayName +
            '" ' +
            dynamic +
            " " +
            seconeddynamic +
            ' data-listname="' +
            element.source +
            '" data-valfieldkey="' +
            element.valfieldkey +
            '" data-Dispfieldkey="' +
            dispfieldkey +
            '"data-filterfield="' +
            element.filterField +
            '"data-queryfieldvalue="' + //
            element.queryFieldValue +
            '"data-queryfield="' + //
            element.queryField +
            '"data-queryfieldtype="' + //
            element.queryFieldType +
            '" data-filterfieldtype="' +
            element.filterFieldType +
            '" class="form-control SPIField ' +
            grandFieldInvokeclass +
            '" id="' +
            element.InternalName +
            '" ' +
            element.state +
            " " +
            element.validation +
            '><option value="" ' +
            selected +
            " disabled>" +
            displayName +
            "</option>";
          for (var i = 0; i < element.options.choices.length; i++) {
            let customValue = element.options.choices[i].customFilterValue
              ? 'data-customfiltervalue="' +
                element.options.choices[i].customFilterValue +
                '"'
              : "";

            let fieldsValue = element.options.choices[i].fields
              ? 'data-fieldsvalue="' +
                JSON.stringify(element.options.choices[i].fields).replaceAll(
                  `"`,
                  `'`
                ) +
                '"'
              : "";

            let isRenderOption = true;
            let optionHasRole =
              element.options.choices[i].hasOwnProperty("roles");
            if (
              optionHasRole &&
              !element.options.choices[i].roles.includes(myRoleConfig[0].Role)
            ) {
              isRenderOption = false;
            }
            // working on other value

            let otherFieldsValue = element.options.choices[i].otherFields
              ? 'data-otherfields="' +
                JSON.stringify(
                  element.options.choices[i].otherFields
                ).replaceAll(`"`, `'`) +
                '"'
              : "";
            //

            if (isRenderOption) {
              htmlBody +=
                "<option data-trans-" +
                element.options.choices[i].display +
                ' class="Resources" value="' +
                element.options.choices[i].value +
                '" ' +
                customValue +
                " " +
                fieldsValue +
                " " +
                otherFieldsValue +
                " " +
                element.options.choices[i].selected +
                "></option>";
            }
          }
          htmlBody +=
            "</select>" +
            '<div class="inputInfo ' +
            isexist +
            '">' +
            descPhrase +
            "</div>" +
            "</div>";
        }
        // if(){
        //   grandFieldInvoke
        // }
        OnSuccess(flag, htmlBody);
        break;

      case "radio":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          "<label " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>";
        for (var i = 0; i < element.options.choices.length; i++) {
          htmlBody +=
            "<input " +
            element.validation +
            " " +
            dynamic +
            ' class="form-control" type="radio" name="' +
            displayName +
            '" id="' +
            element.InternalName +
            '" value="' +
            element.options.choices[i] +
            '" placeholder="' +
            displayName +
            '" ' +
            element.state +
            ">" +
            element.options.choices[i];
        }
        htmlBody +=
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div></div>";
        OnSuccess(flag, htmlBody);
        break;

      case "yesnoradio":
        htmlBody =
          '<div class="col-md-6 CFIELD radioLabelField" ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          "<label " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>";
        for (var i = 0; i < element.options.choices.length; i++) {
          htmlBody +=
            "<input  " +
            element.validation +
            " " +
            dynamic +
            '  class="form-control yesnolistener" type="radio" name="' +
            displayName +
            '" id="' +
            element.InternalName +
            '" value="' +
            element.options.choices[i].value +
            '" placeholder="' +
            displayName +
            '" ' +
            element.state +
            " data-targetfieldrequired=" +
            element.targetfieldrequired +
            " data-targetfield=" +
            element.targetfield +
            " data-targetfieldvalue=" +
            element.targetfieldvalue +
            "><label data-trans-" +
            element.options.choices[i].display +
            ' for="' +
            element.options.choices[i].value +
            '" ' +
            element.validation +
            ' class="Resources radiolabel"></label>';
        }
        htmlBody +=
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div></div>";
        OnSuccess(flag, htmlBody);
        break;

      case "checkbox":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="checkbox" value="' +
          true +
          '" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;


      case "multiselect":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          '<ul myfield="' +
          element.InternalName +
          '" id="' +
          element.InternalName +
          '" type="multiselect" class="multiselect-container form-control" type="multiselect">' +
          '<li class="dropdown">' +
          '<a href="#" data-toggle="dropdown" class="dropdown-toggle">' +
          displayName +
          '<b class="caret"></b></a>' +
          '<ul type="" class="dropdown-menu multiselect_scroll">';
        for (var i = 0; i < element.options.choices.length; i++) {
          htmlBody +=
            "<li>" +
            '<div class="checkbox">' +
            "<label>" +
            '<input value="' +
            element.options.choices[i] +
            '" id="' +
            element.InternalName +
            '" type="checkbox">' +
            element.options.choices[i] +
            "</label>" +
            "</div>" +
            "</li>";
        }
        htmlBody +=
          "</ul>" +
          "</li>" +
          "</ul>" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>";
        "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "lookupmultiselect":
        var customQuery;
        if (
          PCODE &&
          element.source != "Vendors" &&
          element.source != "InitiativeDeliverables"
        ) {
          // to avoid the error on edit page for multi select
          customQuery =
            "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
            PCODE +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        } else if (
          ICODE &&
          element.queryFieldValue &&
          element.queryFieldValue != "undefined" &&
          element.queryFieldValue.length == 2
        ) {
          //show sublevel2 and sublevel3 kpi only in form benefit in field RelatedSubKpis
          customQuery = `<View><Query><Where>
          <And>
          <Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq>
          <Or>
          <Eq><FieldRef Name="${element.queryField}"/><Value Type="${element.queryFieldType}">${element.queryFieldValue[0]}</Value></Eq>
          <Eq><FieldRef Name="${element.queryField}"/><Value Type="${element.queryFieldType}">${element.queryFieldValue[1]}</Value></Eq>
          </Or>
          </And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>`;
        } else {
          customQuery =
            "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        }
        //ghufran User dropdown security
        // if (isEPMO
        //   // || isSPMAdmin
        //   //|| isSPMTeam

        //   ) {
        //   if (
        //     (listkey == "benefitmetrics" &&
        //       element.InternalName == "RelatedBenefit") ||
        //     (listkey == "benefitmatrix" &&
        //       element.InternalName == "RelatedBenefit") ||
        //     (listkey == "deliverablemetrics" &&
        //       element.InternalName == "RelatedInitiativeDeliverable")
        //   ) {
        //     if (localStorage.getItem("Dynamo_Initiatives") != null) {
        //       var visionarr = JSON.parse(
        //         localStorage.getItem("Dynamo_Initiatives") || "[]"
        //       );
        //       visionarr = visionarr.filter(function (item) {
        //         return item.name == "vision";
        //       });
        //       var strategicallyarr = JSON.parse(
        //         localStorage.getItem("Dynamo_Initiatives") || "[]"
        //       );
        //       strategicallyarr = strategicallyarr.filter(function (item) {
        //         return item.name == "strategically";
        //       });
        //       console.log("visionarr", visionarr);
        //       console.log("strategic", strategicallyarr);
        //     }
        //     customQuery =
        //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"InitiativeCode\" /><Values>";
        //     strategicallyarr.forEach(function (item) {
        //       customQuery += '<Value Type="Text">' + item.code + "</Value>";
        //     });
        //     customQuery +=
        //       "</Values></In></And></Where></Query><RowLimit>100</RowLimit></View>";
        //   } else if (
        //     (listkey == "Benefits" &&
        //       element.InternalName == "InitiativeCode") ||
        //     (listkey == "BenefitMatrix" &&
        //       element.InternalName == "RelatedInitiative")
        //   ) {
        //     customQuery =
        //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">strategically</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        //   } else if ("benefitmatrix" && element.InternalName == "RelatedKPI") {
        //     customQuery =
        //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus'/><Value Type='Text'>Deleted</Value></Neq><Or><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">strategically</Value></Eq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">sub</Value></Eq></Or></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        //   }
        // }
        // if (isVROE || isVROP) {
        //   if (
        //     (listkey == "Benefits" &&
        //       element.InternalName == "InitiativeCode") ||
        //     (listkey == "BenefitMatrix" &&
        //       element.InternalName == "RelatedInitiative")
        //   ) {
        //     customQuery =
        //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">vision</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        //   } else if (
        //     (listkey == "benefitmetrics" &&
        //       element.InternalName == "RelatedBenefit") ||
        //     (listkey == "benefitmatrix" &&
        //       element.InternalName == "RelatedBenefit") ||
        //     (listkey == "deliverablemetrics" &&
        //       element.InternalName == "RelatedInitiativeDeliverable")
        //   ) {
        //     if (localStorage.getItem("Dynamo_Initiatives") != null) {
        //       var visionarr = JSON.parse(
        //         localStorage.getItem("Dynamo_Initiatives") || "[]"
        //       );
        //       visionarr = visionarr.filter(function (item) {
        //         return item.name == "vision";
        //       });
        //       var strategicallyarr = JSON.parse(
        //         localStorage.getItem("Dynamo_Initiatives") || "[]"
        //       );
        //       strategicallyarr = strategicallyarr.filter(function (item) {
        //         return item.name == "strategically";
        //       });
        //       console.log("visionarr", visionarr);
        //       console.log("strategic", strategicallyarr);
        //     }
        //     customQuery =
        //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"InitiativeCode\" /><Values>";
        //     visionarr.forEach(function (item) {
        //       customQuery += '<Value Type="Text">' + item.code + "</Value>";
        //     });
        //     customQuery +=
        //       "</Values></In></And></Where></Query><RowLimit>100</RowLimit></View>";
        //   } else if ("benefitmatrix" && element.InternalName == "RelatedKPI") {
        //     customQuery =
        //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">vision</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        //   }
        // }
        if (listkey == "BenefitMatrix") {
          if (
            isSPMAdmin
            //  || isSPMTeam
          ) {
            if (element.source == "MainKPI") {
              customQuery =
                "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus'/><Value Type='Text'>Deleted</Value></Neq><Or><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">strategically</Value></Eq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">sub</Value></Eq></Or></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
            } else if (
              element.source == "InitiativeDeliverables" ||
              element.source == "Benefits" ||
              element.source == "BenefitMetrics"
            ) {
              if (localStorage.getItem("Dynamo_Initiatives") != null) {
                var visionarr = JSON.parse(
                  localStorage.getItem("Dynamo_Initiatives") || "[]"
                );
                visionarr = visionarr.filter(function (item) {
                  return item.name == "vision";
                });
                var strategicallyarr = JSON.parse(
                  localStorage.getItem("Dynamo_Initiatives") || "[]"
                );
                strategicallyarr = strategicallyarr.filter(function (item) {
                  return item.name == "strategically";
                });
              }
              customQuery =
                "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"InitiativeCode\" /><Values>";
              strategicallyarr.forEach(function (item) {
                customQuery += '<Value Type="Text">' + item.code + "</Value>";
              });
              customQuery +=
                "</Values></In></And></Where></Query><RowLimit>100</RowLimit></View>";
            } else if (element.source == "Initiatives") {
              customQuery =
                "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">strategically</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
            }
          }
          // else if (isVROP) {
          //   if (element.source == "MainKPI") {
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">vision</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          //   } else if (element.source == "Initiatives") {
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">vision</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          //   } else if (
          //     element.source == "InitiativeDeliverables" ||
          //     element.source == "Benefits" ||
          //     element.source == "BenefitMetrics"
          //   ) {
          //     if (localStorage.getItem("Dynamo_Initiatives") != null) {
          //       var visionarr = JSON.parse(
          //         localStorage.getItem("Dynamo_Initiatives") || "[]"
          //       );
          //       visionarr = visionarr.filter(function (item) {
          //         return item.name == "vision";
          //       });
          //       var strategicallyarr = JSON.parse(
          //         localStorage.getItem("Dynamo_Initiatives") || "[]"
          //       );
          //       strategicallyarr = strategicallyarr.filter(function (item) {
          //         return item.name == "strategically";
          //       });
          //       console.log("visionarr", visionarr);
          //       console.log("strategic", strategicallyarr);
          //     }
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"InitiativeCode\" /><Values>";
          //     visionarr.forEach(function (item) {
          //       customQuery += '<Value Type="Text">' + item.code + "</Value>";
          //     });
          //     customQuery +=
          //       "</Values></In></And></Where></Query><RowLimit>100</RowLimit></View>";
          //   }
          // }
        }

        // to handle dont submit in edit

        var listFields = [
          element.valfieldkey,
          dispfieldkey,
          element.grpfieldkey,
        ];

        if (element.sourcefieldlvl1) {
          // to handle sector and subsector (get the element from list)
          parentFieldKey = element.fieldsinformlvl1;
          // listFields = [element.valfieldkey, dispfieldkey, element.filterField];
          listFields.push(element.sourcefieldlvl1);

          if (element.sourcefieldlvl2) {
            listFields.push(element.sourcefieldlvl2);
          }
        } else {
          parentFieldKey = "";
        }
        //////////////////////////////////
        var grandFieldId = "";
        if (element.grandFieldId) {
          grandFieldId = `data-grandFieldId=${element.grandFieldId}`;
        } else {
          grandFieldId = "";
        }
        var notInvokeListinerData = "",
          seconedValueListiner = "",
          parentCustomFilterValue = "";
        if (element.notInvokeListiner) {
          notInvokeListinerData = `data-notInvokeListiner=${element.notInvokeListiner}`;
          seconedValueListiner = `data-seconedvaluelistiner=""`;

          parentCustomFilterValue = `data-parentcustomfiltervalue=""`;
        }
        ////////////////////////////////////
        var additionalFilterDataAttrsMs = "";
        if (
          element.additionalFilterField &&
          element.additionalFilterFromField
        ) {
          additionalFilterDataAttrsMs =
            ' data-additionalfilterfield="' +
            element.additionalFilterField +
            '" data-additionalfiltertype="' +
            (element.additionalFilterFieldType || "Lookup") +
            '" data-additionalfilterfrom="' +
            element.additionalFilterFromField +
            '"';
          if (
            element.additionalFilterRequireWhenTypes &&
            element.additionalFilterRequireWhenTypes.length
          ) {
            additionalFilterDataAttrsMs +=
              ' data-additionalfilterrequiretypes="' +
              (Array.isArray(element.additionalFilterRequireWhenTypes)
                ? element.additionalFilterRequireWhenTypes.join(",")
                : String(element.additionalFilterRequireWhenTypes)) +
              '"';
          }
          if (element.additionalFilterTypesFormField) {
            additionalFilterDataAttrsMs +=
              ' data-additionalfiltertypesfield="' +
              element.additionalFilterTypesFormField +
              '"';
          }
          if (element.additionalFilterLookupId) {
            additionalFilterDataAttrsMs +=
              ' data-additionalfilterlookupid="true"';
          }
        }

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          '<div style="display:inline-' +
          element.toggledisplay +
          '" class="showhide-trigger" title="Show/Hide ' +
          displayName +
          '"></div>' +
          "<ul " +
          ToggleName +
          " " +
          grandFieldId +
          " " +
          notInvokeListinerData +
          " " +
          parentCustomFilterValue +
          " " +
          seconedValueListiner +
          " " +
          dynamic +
          " " +
          seconeddynamic +
          " " +
          additionalFilterDataAttrsMs +
          ' data-listname="' +
          element.source +
          '" data-valfieldkey="' +
          element.valfieldkey +
          '" data-Dispfieldkey="' +
          dispfieldkey +
          '"data-filterfield="' +
          element.filterField +
          '"data-queryfieldvalue="' + //
          element.queryFieldValue +
          '"data-queryfield="' + //
          element.queryField +
          '"data-queryfieldtype="' + //
          element.queryFieldType +
          '" data-filterfieldtype="' +
          element.filterFieldType +
          '" myfield="' +
          element.InternalName +
          '" id="' +
          element.InternalName +
          '" type="multiselect" class="multiselect-container form-control" type="multiselect">' +
          '<li class="dropdown ul-bullet-remove">' +
          '<a href="#" data-toggle="dropdown" class="dropdown-toggle">' +
          displayName +
          '<b class="caret"></b></a>' +
          '<ul class="dropdown-menu multiselect_scroll ' +
          element.validation +
          '">';

        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.source,
          customQuery,
          listFields,
          function (records, record, listItem, isDone) {
            if (isDone) {
              var grpfield = element.grpfieldkey;
              window.result = records.reduce(function (r, a) {
                r[a[grpfield]] = r[a[grpfield]] || [];
                r[a[grpfield]].push(a);
                return r;
              }, Object.create(null));

              Object.entries(result).forEach((el) => {
                htmlBody += '<label class="grp-select">' + el[0] + "</label>";
                el[1].forEach((dl) => {
                  htmlBody +=
                    "<li data-parentrelatedvaluelvl1=" +
                    dl[element.sourcefieldlvl1] +
                    " data-parentrelatedkeylvl1= " +
                    element.fieldsinformlvl1 +
                    " data-parentrelatedvaluelvl2=" +
                    dl[element.sourcefieldlvl2] +
                    " data-parentrelatedkeylvl2=" +
                    element.fieldsinformlvl2 +
                    " class='limulti'>" + // we add class limulti to can check if this element multi select or not in dontsubmit feature to get the data
                    '<div class="checkbox">' +
                    "<label>" +
                    '<input value="' +
                    dl[element.valfieldkey] +
                    '" id="' +
                    element.InternalName +
                    '" type="checkbox">' +
                    dl[dispfieldkey] +
                    "</label>" +
                    "</div>" +
                    "</li>";
                });
              });
              htmlBody +=
                "</ul>" +
                "</li>" +
                "</ul>" +
                "<span data-trans-" +
                Errmsgkey +
                ' class="errMsgField Resources"></span>' +
                '<div class="inputInfo ' +
                isexist +
                '">' +
                descPhrase +
                "</div>" +
                "</div>";
              //console.log(`htmlBody from lookup success`, htmlBody);

              OnSuccess(flag, htmlBody);
            }
          }
        );
        break;

      case "lookupmultiselectfromrelatedparent":
          var customQuery = "";
          var parentFieldValue = "";
      
          if ((PCODE || ICODE) && element.parentsource && element.parentlistQueryField) {
              // determine parent code
              var parentCode = "";
              if (PCODE) {
                  parentCode = PCODE;
              } else if (ICODE) {
                  parentCode = ICODE;
              }
      
              // get parent item to retrieve the related field value
              sphttp.get(
                  _spPageContextInfo.siteServerRelativeUrl,
                  element.parentsource,
                  `<View><Query><Where><Eq><FieldRef Name='Title'/><Value Type='Text'>${parentCode}</Value></Eq></Where></Query></View>`,
                  [element.parentlistQueryField],
                  function (parentRecords, parentRecord, parentItem, isDoneParent) {
                      if (isDoneParent && parentRecords.length > 0) {
                          parentFieldValue = parentRecords[0][element.parentlistQueryField];
      
                          // now build child list query using the parentFieldValue
                          customQuery = `<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus'/><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name="${element.currentlistQueryField}"/><Value Type="Text">${parentFieldValue}</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False'/></OrderBy></Query></View>`;
      
                          // to handle dont submit in edit
                          var listFields = [element.valfieldkey, element.Dispfieldkey, element.grpfieldkey];
      
                          if (element.sourcefieldlvl1) {
                              parentFieldKey = element.fieldsinformlvl1;
                              listFields.push(element.sourcefieldlvl1);
      
                              if (element.sourcefieldlvl2) {
                                  listFields.push(element.sourcefieldlvl2);
                              }
                          } else {
                              parentFieldKey = "";
                          }
      
                          var grandFieldId = element.grandFieldId ? `data-grandFieldId=${element.grandFieldId}` : "";
                          var notInvokeListinerData = element.notInvokeListiner ? `data-notInvokeListiner=${element.notInvokeListiner}` : "";
                          var seconedValueListiner = element.notInvokeListiner ? `data-seconedvaluelistiner=""` : "";
                          var parentCustomFilterValue = element.notInvokeListiner ? `data-parentcustomfiltervalue=""` : "";
      
                          htmlBody =
                              '<div class="col-md-6 CFIELD ' +
                              dontSubmit +
                              " " +
                              dontRequest +
                              " " +
                              dontSubmitRequired +
                              " " +
                              element.className +
                              " " +
                              hideField +
                              ' " ' +
                              thistip +
                              " " +
                              hidestagesIDs +
                              " " +
                              editableBy +
                              " " +
                              showstagesIDs +
                              "  " +
                              disablestagesIDs +
                              "  " +
                              enablestagesIDs +
                              "   " +
                              isWfhidestagesIDs +
                              " " +
                              requireOnWfTaskstagesIDs +
                              " " +
                              isWfshowstagesIDs +
                              "  " +
                              isWfdisablestagesIDs +
                              "  " +
                              isWfenablestagesIDs +
                              '        data-groups="' +
                              groups +
                              '" ' +
                              notAllowForGroups +
                              ' style="display:' +
                              element.display +
                              '">' +
                              '<label for="' +
                              element.InternalName +
                              '" ' +
                              element.validation +
                              ">" +
                              displayName +
                              "</label>" +
                              '<div style="display:inline-' +
                              element.toggledisplay +
                              '" class="showhide-trigger" title="Show/Hide ' +
                              displayName +
                              '"></div>' +
                              "<ul " +
                              ToggleName +
                              " " +
                              grandFieldId +
                              " " +
                              notInvokeListinerData +
                              " " +
                              parentCustomFilterValue +
                              " " +
                              seconedValueListiner +
                              " " +
                              dynamic +
                              " " +
                              seconeddynamic +
                              " " +
                              'data-listname="' +
                              element.source +
                              '" data-valfieldkey="' +
                              element.valfieldkey +
                              '" data-Dispfieldkey="' +
                              element.Dispfieldkey +
                              '" data-filterfield="' +
                              element.filterField +
                              '" data-queryfieldvalue="' +
                              parentFieldValue +
                              '" data-queryfield="' +
                              element.currentlistQueryField +
                              '" data-queryfieldtype="Text" myfield="' +
                              element.InternalName +
                              '" id="' +
                              element.InternalName +
                              '" type="multiselect" class="multiselect-container form-control">' +
                              '<li class="dropdown ul-bullet-remove">' +
                              '<a href="#" data-toggle="dropdown" class="dropdown-toggle">' +
                              displayName +
                              '<b class="caret"></b></a>' +
                              '<ul class="dropdown-menu multiselect_scroll ' +
                              element.validation +
                              '">';
      
                          sphttp.get(
                              _spPageContextInfo.siteServerRelativeUrl,
                              element.source,
                              customQuery,
                              listFields,
                              function (records, record, listItem, isDone) {
                                  if (isDone) {
                                      var grpfield = element.grpfieldkey;
                                      window.result = records.reduce(function (r, a) {
                                          r[a[grpfield]] = r[a[grpfield]] || [];
                                          r[a[grpfield]].push(a);
                                          return r;
                                      }, Object.create(null));
      
                                      Object.entries(result).forEach((el) => {
                                          htmlBody += '<label class="grp-select">' + el[0] + "</label>";
                                          el[1].forEach((dl) => {
                                              htmlBody +=
                                                  "<li data-parentrelatedvaluelvl1=" +
                                                  dl[element.sourcefieldlvl1] +
                                                  " data-parentrelatedkeylvl1= " +
                                                  element.fieldsinformlvl1 +
                                                  " data-parentrelatedvaluelvl2=" +
                                                  dl[element.sourcefieldlvl2] +
                                                  " data-parentrelatedkeylvl2=" +
                                                  element.fieldsinformlvl2 +
                                                  " class='limulti'>" +
                                                  '<div class="checkbox">' +
                                                  "<label>" +
                                                  '<input value="' +
                                                  dl[element.valfieldkey] +
                                                  '" id="' +
                                                  element.InternalName +
                                                  '" type="checkbox">' +
                                                  dl[element.Dispfieldkey] +
                                                  "</label>" +
                                                  "</div>" +
                                                  "</li>";
                                          });
                                      });
                                      htmlBody +=
                                          "</ul>" +
                                          "</li>" +
                                          "</ul>" +
                                          "<span data-trans-" +
                                          element.Errmsgkey +
                                          ' class="errMsgField Resources"></span>' +
                                          '<div class="inputInfo ' +
                                          isexist +
                                          '">' +
                                          descPhrase +
                                          "</div>" +
                                          "</div>";
      
                                      OnSuccess(flag, htmlBody);
                                  }
                              }
                          );
                      }
                  }
              );
          }
          break;      

      case "dropdownValuesMultiselect":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            element.className +
            ' " style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '">' +
            displayName +
            "</label>" +
            '<div style="display:inline-' +
            element.toggledisplay +
            '" class="showhide-trigger" title="Show/Hide ' +
            displayName +
            '"></div>' +
            '<ul myfield="' +
            element.InternalName +
            '" id="' +
            element.InternalName +
            '" type="multiselect" class="multiselect-container form-control" type="multiselect">' +
            '<li class="dropdown ul-bullet-remove">' +
            '<a href="#" data-toggle="dropdown" class="dropdown-toggle">' +
            displayName +
            '<b class="caret"></b></a>' +
            '<ul class="dropdown-menu multiselect_scroll">';
            element.options.choices.forEach(function (choice) {
              var dataTrans = 'data-trans-' + choice.display;
            
              htmlBody +=
                '<li class="limulti">' +
                  '<div class="checkbox">' +
                    '<label>' +
                      '<input type="checkbox" value="' + choice.value + '">' +
                      '<span ' + dataTrans + ' class="Resources">' + choice.display + '</span>' +
                    '</label>' +
                  '</div>' +
                '</li>';
            });            
      
          htmlBody +=
            "</ul>" + // close dropdown-menu
            "</li>" + // close dropdown li
            "</ul>" + // close multiselect-container
            '<div class="inputInfo false"></div>' +
            "</div>";
      
          OnSuccess(flag, htmlBody);
          break;

      case "lookupchildtoparent":
        var code = activeCode;
        var customQuery =
          "<View><Query><Where><And><Eq><FieldRef Name=" +
          element.childinternalparentname +
          " /><Value Type=" +
          element.childinternalparenttype +
          ">" +
          code +
          "</Value></Eq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

        var itemsID = [];

        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.childlist,
          customQuery,
          [element.childinternalname],
          function (records, record, listItem, isDone) {
            var allRelatedChild = []; // to get all related child
            if (isDone) {
              records.forEach(function (el, index) {
                allRelatedChild.push(el[element.childinternalname]);
              });

              if (allRelatedChild.length == 0) {
                // to render an empty drop down when there is no item or related child value
                allRelatedChild.push("");
              }

              var internalQuery =
                '<View><Query><Where><And><In><FieldRef Name="' +
                element.sourceinternalname +
                '" /><Values>';

              allRelatedChild.forEach(function (item) {
                internalQuery += '<Value Type="Text">' + item + "</Value>";
              });

              internalQuery +=
                "</Values></In><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

              var filedsArr = [element.valfieldkey, element.Dispfieldkey];
              if (element.hasOwnProperty("valsiblingkey")) {
                filedsArr = [
                  element.valfieldkey,
                  element.Dispfieldkey,
                  element.valsiblingkey,
                ];
              }
              sphttp.get(
                _spPageContextInfo.siteServerRelativeUrl,
                element.source,
                internalQuery,
                filedsArr,
                function (records, record, listItem, isDone) {
                  if (listItem) itemsID.push(listItem.get_id());
                  if (isDone) {
                    htmlBody =
                      '<div class="col-md-6 CFIELD ' +
                      dontSubmit +
                      " " +
                      dontRequest +
                      " " +
                      dontSubmitRequired +
                      " " +
                      " " +
                      element.className +
                      " " +
                      hideField +
                      ' " ' +
                      thistip +
                      " " +
                      hidestagesIDs +
                      " " +
                      editableBy +
                      " " +
                      showstagesIDs +
                      "  " +
                      disablestagesIDs +
                      "  " +
                      enablestagesIDs +
                      "   " +
                      isWfhidestagesIDs +
                      " " +
                      requireOnWfTaskstagesIDs +
                      " " +
                      isWfshowstagesIDs +
                      "  " +
                      isWfdisablestagesIDs +
                      "  " +
                      isWfenablestagesIDs +
                      '        data-groups="' +
                      groups +
                      '" ' +
                      notAllowForGroups +
                      ' style="display:' +
                      element.display +
                      '">' +
                      '<label for="' +
                      element.InternalName +
                      '" ' +
                      element.validation +
                      ">" +
                      displayName +
                      "</label>" +
                      "<select " +
                      ToggleName +
                      " " +
                      toggleDisabledName +
                      " " +
                      RequiredName +
                      " " +
                      inputLisKey +
                      element.validation +
                      " " +
                      dynamic +
                      ' data-listname="' +
                      element.source +
                      '" data-valfieldkey="' +
                      element.valfieldkey +
                      '" data-Dispfieldkey="' +
                      dispfieldkey +
                      '" data-filterfield="' +
                      element.filterField +
                      '" data-queryfieldvalue="' +
                      element.queryFieldValue +
                      '"data-queryfield="' +
                      element.queryField +
                      '"data-queryfieldtype="' +
                      element.queryFieldType +
                      '" data-filterfieldtype="' +
                      element.filterFieldType +
                      '" data-siblingtarget="' +
                      element.targetsiblingkey +
                      '" class="form-control getsiblingdata" type="dropdown" id="' +
                      element.InternalName +
                      '" value="" placeholder="' +
                      displayName +
                      '" ' +
                      element.state +
                      '><option value="" ' +
                      selected +
                      " disabled>" +
                      displayName +
                      "</option>";

                    records.forEach(function (el, index) {
                      htmlBody +=
                        '<option data-siblingvalue="' +
                        el[element.valsiblingkey] +
                        '" option-id="' +
                        itemsID[index] +
                        '" value="' +
                        el[element.valfieldkey] +
                        '">' +
                        el[element.Dispfieldkey] +
                        "</option>";
                    });

                    htmlBody +=
                      "</select>" +
                      "<span data-trans-" +
                      Errmsgkey +
                      ' class="errMsgField Resources"></span>' +
                      '<div class="inputInfo ' +
                      isexist +
                      '">' +
                      descPhrase +
                      "</div>" +
                      "</div>";

                    OnSuccess(flag, htmlBody);
                  }
                }
              );
            }
          }
        );
        break;

      case "lookupchildtoparentmultiselect":
        if (listkey == "changerequest") {
          // to get the initiative selected in cr
          activeCode = $("#InitiativeCode").val();
        }

        var code = activeCode;
        var customQuery =
          "<View><Query><Where><And><Eq><FieldRef Name=" +
          element.childinternalparentname +
          " /><Value Type=" +
          element.childinternalparenttype +
          ">" +
          code +
          "</Value></Eq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

        var itemsID = [];

        var fieldTargetList = "";
        var fieldmasterkey = "";
        if (element.fieldtargetlist && element.fieldtargetlist != "undefined") {
          fieldTargetList = `data-fieldTargetList=${element.fieldtargetlist}`;
          fieldmasterkey = `data-fieldmasterkey=${element.fieldmasterkey}`;
        }

        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.childlist,
          customQuery,
          [element.childinternalname],
          function (records, record, listItem, isDone) {
            var allRelatedChild = []; // to get all related child
            if (isDone) {
              htmlBody =
                '<div class="col-md-6 CFIELD ' +
                dontSubmit +
                " " +
                dontRequest +
                " " +
                dontSubmitRequired +
                " " +
                element.className +
                " " +
                hideField +
                ' " ' +
                thistip +
                " " +
                hidestagesIDs +
                " " +
                editableBy +
                " " +
                showstagesIDs +
                "  " +
                disablestagesIDs +
                "  " +
                enablestagesIDs +
                "   " +
                isWfhidestagesIDs +
                " " +
                requireOnWfTaskstagesIDs +
                " " +
                isWfshowstagesIDs +
                "  " +
                isWfdisablestagesIDs +
                "  " +
                isWfenablestagesIDs +
                '        data-groups="' +
                groups +
                '" ' +
                notAllowForGroups +
                ' style="display:' +
                element.display +
                '">' +
                '<label for="' +
                element.InternalName +
                '" ' +
                element.validation +
                ">" +
                displayName +
                "</label>" +
                '<div style="display:inline-' +
                element.toggledisplay +
                '" class="showhide-trigger" title="Show/Hide ' +
                displayName +
                '"></div>' +
                "<ul " +
                grandFieldId +
                " " +
                notInvokeListinerData +
                " " +
                parentCustomFilterValue +
                " " +
                seconedValueListiner +
                " " +
                dynamic +
                " " +
                seconeddynamic +
                " " +
                fieldTargetList +
                " " +
                fieldmasterkey +
                " " +
                'data-listname="' +
                element.source +
                '" data-valfieldkey="' +
                element.valfieldkey +
                '" data-Dispfieldkey="' +
                dispfieldkey +
                '"data-filterfield="' +
                element.filterField +
                '"data-queryfieldvalue="' + //
                element.queryFieldValue +
                '"data-queryfield="' + //
                element.queryField +
                '"data-queryfieldtype="' + //
                element.queryFieldType +
                '" data-filterfieldtype="' +
                element.filterFieldType +
                '" myfield="' +
                element.InternalName +
                '" id="' +
                element.InternalName +
                '" type="multiselect" class="multiselect-container form-control" type="multiselect">' +
                '<li class="dropdown ul-bullet-remove">' +
                '<a href="#" data-toggle="dropdown" class="dropdown-toggle">' +
                displayName +
                '<b class="caret"></b></a>' +
                '<ul class="dropdown-menu multiselect_scroll ' +
                element.validation +
                '">';

              records.forEach(function (el, index) {
                allRelatedChild.push(el[element.childinternalname]);
              });

              if (allRelatedChild.length == 0) {
                // to render an empty drop down when there is no item or related child value
                allRelatedChild.push("");
              }

              var internalQuery =
                '<View><Query><Where><And><In><FieldRef Name="' +
                element.sourceinternalname +
                '" /><Values>';

              allRelatedChild.forEach(function (item) {
                internalQuery += '<Value Type="Text">' + item + "</Value>";
              });

              internalQuery +=
                "</Values></In><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

              var filedsArr = [element.valfieldkey, element.Dispfieldkey];
              if (element.hasOwnProperty("valsiblingkey")) {
                filedsArr = [
                  element.valfieldkey,
                  element.Dispfieldkey,
                  element.valsiblingkey,
                ];
              }
              sphttp.get(
                _spPageContextInfo.siteServerRelativeUrl,
                element.source,
                internalQuery,
                filedsArr,
                function (records, record, listItem, isDone) {
                  if (listItem) itemsID.push(listItem.get_id());
                  if (isDone) {
                    var grpfield = element.grpfieldkey;
                    window.result = records.reduce(function (r, a) {
                      r[a[grpfield]] = r[a[grpfield]] || [];
                      r[a[grpfield]].push(a);
                      return r;
                    }, Object.create(null));

                    Object.entries(result).forEach((el) => {
                      el[1].forEach((dl) => {
                        htmlBody +=
                          "<li data-parentrelatedvaluelvl1=" +
                          dl[element.sourcefieldlvl1] +
                          " data-parentrelatedkeylvl1= " +
                          element.fieldsinformlvl1 +
                          " data-parentrelatedvaluelvl2=" +
                          dl[element.sourcefieldlvl2] +
                          " data-parentrelatedkeylvl2=" +
                          element.fieldsinformlvl2 +
                          " class='limulti'>" + // we add class limulti to can check if this element multi select or not in dontsubmit feature to get the data
                          '<div class="checkbox">' +
                          "<label>" +
                          '<input value="' +
                          dl[element.valfieldkey] +
                          '" id="' +
                          element.InternalName +
                          '" type="checkbox">' +
                          dl[dispfieldkey] +
                          "</label>" +
                          "</div>" +
                          "</li>";
                      });
                    });

                    htmlBody +=
                      "</ul>" +
                      "</li>" +
                      "</ul>" +
                      "<span data-trans-" +
                      Errmsgkey +
                      ' class="errMsgField Resources"></span>' +
                      '<div class="inputInfo ' +
                      isexist +
                      '">' +
                      descPhrase +
                      "</div>" +
                      "</div>";
                    OnSuccess(flag, htmlBody);
                  }
                }
              );
            }
          }
        );
        break;

      case "lookuptoparentchild":
        var code = activeCode;

        var customQuery =
          '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
          code +
          "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>";

        var itemsID = [];

        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.parentlist,
          customQuery,
          [element.parentinternalname],
          function (records, record, listItem, isDone) {
            var parentCode = "";
            if (isDone) {
              records.forEach(function (el, index) {
                parentCode = el[element.parentinternalname];
              });

              var internalQuery =
                '<View><Query><Where><Eq><FieldRef Name="' +
                element.sourceinternalname +
                '" /><Value Type="Text">' +
                parentCode +
                "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

              sphttp.get(
                _spPageContextInfo.siteServerRelativeUrl,
                element.source,
                internalQuery,
                [element.valfieldkey, element.Dispfieldkey],
                function (records, record, listItem, isDone) {
                  if (listItem) itemsID.push(listItem.get_id());

                  if (isDone) {
                    htmlBody =
                      '<div class="col-md-6 CFIELD ' +
                      dontSubmit +
                      " " +
                      dontRequest +
                      " " +
                      dontSubmitRequired +
                      " " +
                      " " +
                      element.className +
                      " " +
                      hideField +
                      ' " ' +
                      thistip +
                      " " +
                      hidestagesIDs +
                      " " +
                      editableBy +
                      " " +
                      showstagesIDs +
                      "  " +
                      disablestagesIDs +
                      "  " +
                      enablestagesIDs +
                      "   " +
                      isWfhidestagesIDs +
                      " " +
                      requireOnWfTaskstagesIDs +
                      " " +
                      isWfshowstagesIDs +
                      "  " +
                      isWfdisablestagesIDs +
                      "  " +
                      isWfenablestagesIDs +
                      '        data-groups="' +
                      groups +
                      '" ' +
                      notAllowForGroups +
                      ' style="display:' +
                      element.display +
                      '">' +
                      '<label for="' +
                      element.InternalName +
                      '" ' +
                      element.validation +
                      ">" +
                      displayName +
                      "</label>" +
                      "<select " +
                      ToggleName +
                      " " +
                      toggleDisabledName +
                      " " +
                      RequiredName +
                      " " +
                      inputLisKey +
                      element.validation +
                      " " +
                      dynamic +
                      ' data-listname="' +
                      element.source +
                      '" data-valfieldkey="' +
                      element.valfieldkey +
                      '" data-Dispfieldkey="' +
                      dispfieldkey +
                      '" data-filterfield="' +
                      element.filterField +
                      '" data-queryfieldvalue="' +
                      element.queryFieldValue +
                      '"data-queryfield="' +
                      element.queryField +
                      '"data-queryfieldtype="' +
                      element.queryFieldType +
                      '" data-filterfieldtype="' +
                      element.filterFieldType +
                      '" class="form-control" type="dropdown" id="' +
                      element.InternalName +
                      '" value="" placeholder="' +
                      displayName +
                      '" ' +
                      element.state +
                      '><option value="" ' +
                      selected +
                      " disabled>" +
                      displayName +
                      "</option>";

                    records.forEach(function (el, index) {
                      htmlBody +=
                        '<option option-id="' +
                        itemsID[index] +
                        '" value="' +
                        el[element.valfieldkey] +
                        '">' +
                        el[element.Dispfieldkey] +
                        "</option>";
                    });

                    htmlBody +=
                      "</select>" +
                      "<span data-trans-" +
                      Errmsgkey +
                      ' class="errMsgField Resources"></span>' +
                      '<div class="inputInfo ' +
                      isexist +
                      '">' +
                      descPhrase +
                      "</div>" +
                      "</div>";

                    OnSuccess(flag, htmlBody);
                  }
                }
              );
            }
          }
        );
        break;

      case "lookupmultiselectwithoutrepeat":
        var customQuery;
        var sourcelistQuery;
        var RelatedItemUsed = [];
        var listItemArr = [element.valfieldkey, element.Dispfieldkey];
        var getValuesfor = element.getValuesfor ? element.getValuesfor : "";
        var listenerClass = "";
        var targetTotalElement = element.targetTotalElement;

        customQuery =
          "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

        sourcelistQuery =
          "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

        if (ICODE && element.initiativeCodeInList) {
          sourcelistQuery =
            "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
            ICODE +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        } else if (PCODE && element.projectCodeInList) {
          sourcelistQuery =
            "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
            PCODE +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        } else if (sosCode && element.sosCodeInList) {
          var sosCodeEscaped = (sosCode || "").replace(/'/g, "''");
          sourcelistQuery =
            "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"SOCode\" /><Value Type=\"Text\">" +
            sosCodeEscaped +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        }

        if (
          element.queryField &&
          element.queryField != "undefined" &&
          element.queryFieldType &&
          element.queryFieldType != "undefined" &&
          element.queryFieldValue &&
          element.queryFieldValue != "undefined"
        ) {
          sourcelistQuery =
            '<View><Query><Where><Eq><FieldRef Name="' +
            element.queryField +
            '" /><Value Type="' +
            element.queryFieldType +
            '">' +
            element.queryFieldValue +
            "</Value></Eq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
        }

        // to handle get thired value like weight in coc list in delivrables field
        if (getValuesfor) {
          listItemArr.push(getValuesfor);
          listenerClass = "getTotalSelectedValues";
        }
        //

        var itemIDlist = [],
          itemsID = [];
        var listItemId = "";

        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.listname,
          customQuery,
          [element.valfieldkey, element.targetelement],
          function (records, record, listItem, isDone) {
            if (listItem) itemIDlist.push(listItem.get_id());

            if (isDone) {
              records.forEach(function (el, index) {
                if (el[element.targetelement]) {
                  if (!RelatedItemUsed.includes(el[element.targetelement])) {
                    if (itemIDlist[index] != IID) {
                      // console.log(el[element.targetelement],"el[element.targetelement]")
                      if (el[element.targetelement].indexOf(":::") > -1) {
                        var splitMultiVal =
                          el[element.targetelement].split(":::");
                        splitMultiVal.forEach((item) => {
                          if (!RelatedItemUsed.includes(item)) {
                            RelatedItemUsed.push(item);
                          }
                        });
                      } else {
                        RelatedItemUsed.push(el[element.targetelement]);
                      }
                    }
                  }
                }
              });

              htmlBody =
                '<div class="col-md-6 CFIELD ' +
                dontSubmit +
                " " +
                dontRequest +
                " " +
                dontSubmitRequired +
                " " +
                " " +
                element.className +
                " " +
                hideField +
                ' " ' +
                thistip +
                " " +
                hidestagesIDs +
                " " +
                editableBy +
                " " +
                showstagesIDs +
                "  " +
                disablestagesIDs +
                "  " +
                enablestagesIDs +
                "   " +
                isWfhidestagesIDs +
                " " +
                requireOnWfTaskstagesIDs +
                " " +
                isWfshowstagesIDs +
                "  " +
                isWfdisablestagesIDs +
                "  " +
                isWfenablestagesIDs +
                '        data-groups="' +
                groups +
                '" ' +
                notAllowForGroups +
                ' style="display:' +
                element.display +
                '">' +
                '<label for="' +
                element.InternalName +
                '" ' +
                element.validation +
                ">" +
                displayName +
                "</label>" +
                '<div style="display:inline-' +
                element.toggledisplay +
                '" class="showhide-trigger" title="Show/Hide ' +
                displayName +
                '"></div>' +
                '<ul myfield="' +
                element.InternalName +
                '" id="' +
                element.InternalName +
                '" type="multiselect" class="multiselect-container form-control" type="multiselect">' +
                '<li class="dropdown ul-bullet-remove">' +
                '<a href="#" data-toggle="dropdown" class="dropdown-toggle">' +
                displayName +
                '<b class="caret"></b></a>' +
                '<ul class="dropdown-menu multiselect_scroll ' +
                element.validation +
                '" >';

              sphttp.get(
                _spPageContextInfo.siteServerRelativeUrl,
                element.source,
                sourcelistQuery,
                listItemArr,
                function (records, record, listItem, isDone) {
                  if (isDone) {
                    var grpfield = element.grpfieldkey;

                    window.resultMulti = records.reduce(function (r, a) {
                      r[a[grpfield]] = r[a[grpfield]] || [];
                      if (!RelatedItemUsed.includes(a[element.valfieldkey])) {
                        r[a[grpfield]].push(a);
                      }
                      return r;
                    }, Object.create(null));

                    Object.entries(resultMulti).forEach((el) => {
                      htmlBody +=
                        '<label class="grp-select">' + el[0] + "</label>";
                      el[1].forEach((dl) => {
                        htmlBody +=
                          "<li>" +
                          '<div class="checkbox">' +
                          "<label>" +
                          '<input class="' +
                          listenerClass +
                          '" value="' +
                          dl[element.valfieldkey] +
                          '" id="' +
                          element.InternalName +
                          '" type="checkbox" data-targettotalelement=' +
                          element.targetTotalElement +
                          " data-getothervalue=" +
                          dl[element.getValuesfor] +
                          ">" +
                          dl[dispfieldkey] +
                          "</label>" +
                          "</div>" +
                          "</li>";
                      });
                    });

                    htmlBody +=
                      "</ul>" +
                      "</li>" +
                      "</ul>" +
                      "<span data-trans-" +
                      Errmsgkey +
                      ' class="errMsgField Resources"></span>' +
                      '<div class="inputInfo ' +
                      isexist +
                      '">' +
                      descPhrase +
                      "</div>" +
                      "</div>";

                    OnSuccess(flag, htmlBody);
                  }
                }
              );
            }
          }
        );

        break;

      case "lookupwithoutrepeat":
        var customQuery;
        var sourcelistQuery;
        var RelatedItemUsed = [];

        customQuery =
          "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

        sourcelistQuery =
          "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

        if (
          element.queryField &&
          element.queryField != "undefined" &&
          element.queryFieldType &&
          element.queryFieldType != "undefined" &&
          element.queryFieldValue &&
          element.queryFieldValue != "undefined"
        ) {
          sourcelistQuery =
            '<View><Query><Where><Eq><FieldRef Name="' +
            element.queryField +
            '" /><Value Type="' +
            element.queryFieldType +
            '">' +
            element.queryFieldValue +
            "</Value></Eq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
        }

        if (ICODE && element.initiativeCodeInList) {
          sourcelistQuery =
            "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
            ICODE +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        } else if (sosCode && element.sosCodeInList) {
          var sosCodeEscaped2 = (sosCode || "").replace(/'/g, "''");
          sourcelistQuery =
            "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"SOCode\" /><Value Type=\"Text\">" +
            sosCodeEscaped2 +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        }

        var itemIDlist = [],
          itemsID = [];
        var listItemId = "";

        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.listname,
          customQuery,
          [element.valfieldkey, element.targetelement, element.Dispfieldkey],
          function (records, record, listItem, isDone) {
            if (listItem) itemIDlist.push(listItem.get_id());
            if (isDone) {
              records.forEach(function (el, index) {
                if (el[element.targetelement]) {
                  if (!RelatedItemUsed.includes(el[element.targetelement])) {
                    if (itemIDlist[index] != IID) {
                      RelatedItemUsed.push(el[element.targetelement]);
                    }
                  }
                }
              });

              htmlBody =
                '<div class="col-md-6 CFIELD ' +
                dontSubmit +
                " " +
                dontRequest +
                " " +
                dontSubmitRequired +
                " " +
                " " +
                element.className +
                " " +
                hideField +
                ' " ' +
                thistip +
                " " +
                hidestagesIDs +
                " " +
                editableBy +
                " " +
                showstagesIDs +
                "  " +
                disablestagesIDs +
                "  " +
                enablestagesIDs +
                "   " +
                isWfhidestagesIDs +
                " " +
                requireOnWfTaskstagesIDs +
                " " +
                isWfshowstagesIDs +
                "  " +
                isWfdisablestagesIDs +
                "  " +
                isWfenablestagesIDs +
                '        data-groups="' +
                groups +
                '" ' +
                notAllowForGroups +
                ' style="display:' +
                element.display +
                '">' +
                '<label for="' +
                element.InternalName +
                '" ' +
                element.validation +
                ">" +
                displayName +
                "</label>" +
                "<select " +
                ToggleName +
                " " +
                toggleDisabledName +
                " " +
                RequiredName +
                " " +
                inputLisKey +
                element.validation +
                " " +
                dynamic +
                ' data-listname="' +
                element.source +
                '" data-valfieldkey="' +
                element.valfieldkey +
                '" data-Dispfieldkey="' +
                dispfieldkey +
                '" data-filterfield="' +
                element.filterField +
                '" data-queryfieldvalue="' +
                element.queryFieldValue +
                '"data-queryfield="' +
                element.queryField +
                '"data-queryfieldtype="' +
                element.queryFieldType +
                '" data-filterfieldtype="' +
                element.filterFieldType +
                '" class="form-control" type="dropdown" id="' +
                element.InternalName +
                '" value="" placeholder="' +
                displayName +
                '" ' +
                element.state +
                '><option value="" ' +
                selected +
                " disabled>" +
                displayName +
                "</option>";

              sphttp.get(
                _spPageContextInfo.siteServerRelativeUrl,
                element.source,
                sourcelistQuery,
                [element.valfieldkey, element.Dispfieldkey],
                function (records, record, listItem, isDone) {
                  if (isDone) {
                    records.forEach(function (el, index) {
                      if (!RelatedItemUsed.includes(el[element.valfieldkey])) {
                        htmlBody +=
                          '<option option-id="' +
                          itemsID[index] +
                          '" value="' +
                          el[element.valfieldkey] +
                          '">' +
                          el[dispfieldkey] +
                          "</option>";
                      }
                    });

                    htmlBody +=
                      "</select>" +
                      "<span data-trans-" +
                      Errmsgkey +
                      ' class="errMsgField Resources"></span>' +
                      '<div class="inputInfo ' +
                      isexist +
                      '">' +
                      descPhrase +
                      "</div>" +
                      "</div>";
                    //console.log(`htmlBody from lookup success`, htmlBody);
                    OnSuccess(flag, htmlBody);
                  }
                }
              );
            }
          }
        );

        break;

      case "lookupFromMultiselectedParent":
        var selectedParentCode = "";
        if (typeof USERPCODE !== "undefined" && USERPCODE) {
          selectedParentCode = USERPCODE;
        } else if (typeof UserICode !== "undefined" && UserICode) {
          selectedParentCode = UserICode;
        } else if (typeof UserSTCode !== "undefined" && UserSTCode) {
          selectedParentCode = UserSTCode;
        } else if (typeof PCODE !== "undefined" && PCODE) {
          selectedParentCode = PCODE;
        } else if (typeof ICODE !== "undefined" && ICODE) {
          selectedParentCode = ICODE;
        } else if (typeof STCODE !== "undefined" && STCODE) {
          selectedParentCode = STCODE;
        }

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<select " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          " " +
          dynamic +
          ' class="form-control SPIField" type="dropdown" id="' +
          element.InternalName +
          '" value="" placeholder="' +
          displayName +
          '" ' +
          element.state +
          " " +
          element.validation +
          '><option value="" ' +
          selected +
          " disabled>" +
          displayName +
          "</option>";

        if (!selectedParentCode) {
          htmlBody +=
            "</select>" +
            "<span data-trans-" +
            Errmsgkey +
            ' class="errMsgField Resources"></span>' +
            '<div class="inputInfo ' +
            isexist +
            '">' +
            descPhrase +
            "</div>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;
        }

        var parentQuery =
          "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"" +
          element.codeParentList +
          "\" /><Value Type=\"Text\">" +
          selectedParentCode +
          "</Value></Eq></And></Where><RowLimit>1</RowLimit><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.parentlistname,
          parentQuery,
          [element.fieldToGetParent],
          function (records, record, listItem, isDone) {
            if (isDone) {
              var linkedCodes = [];
              if (
                records &&
                records.length > 0 &&
                records[0][element.fieldToGetParent]
              ) {
                linkedCodes = records[0][element.fieldToGetParent]
                  .split(":::")
                  .map(function (v) {
                    return v ? v.trim() : "";
                  })
                  .filter(function (v) {
                    return v !== "";
                  });
              }

              var sourceQuery =
                "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";

              sphttp.get(
                _spPageContextInfo.siteServerRelativeUrl,
                element.source,
                sourceQuery,
                [element.valfieldkey, element.Dispfieldkey, dispfieldkey],
                function (srcRecords, srcRecord, srcListItem, srcDone) {
                  if (srcDone) {
                    srcRecords.forEach(function (el) {
                      if (linkedCodes.indexOf(el[element.valfieldkey]) > -1) {
                        htmlBody +=
                          '<option value="' +
                          el[element.valfieldkey] +
                          '">' +
                          el[dispfieldkey] +
                          "</option>";
                      }
                    });

                    htmlBody +=
                      "</select>" +
                      "<span data-trans-" +
                      Errmsgkey +
                      ' class="errMsgField Resources"></span>' +
                      '<div class="inputInfo ' +
                      isexist +
                      '">' +
                      descPhrase +
                      "</div>" +
                      "</div>";
                    OnSuccess(flag, htmlBody);
                  }
                }
              );
            }
          }
        );
        break;

      case "pickerFromParent":
        var pickerFromParentId = element.InternalName;
        var pickerFromParentListener = "#" + element.valfieldkeyCurrentList;
        var pickerFromParentSource = element.source;
        var pickerFromParentValField = element.valfieldkey;
        var pickerFromParentDispField = element.Dispfieldkey;
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<div " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' class="PPField SPIField form-control picker-from-parent" type="picker" id="' +
          element.InternalName +
          '" value="" placeholder="' +
          displayName +
          '" INppicker="' +
          element.InternalName +
          '" data-source="' +
          element.source +
          '" data-valfieldkeycurrentlist="' +
          element.valfieldkeyCurrentList +
          '" data-valfieldkey="' +
          element.valfieldkey +
          '" data-dispfieldkey="' +
          element.Dispfieldkey +
          '" data-listenerfield="#' +
          element.valfieldkeyCurrentList +
          '" ' +
          element.state +
          " " +
          element.validation +
          "></div>" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";

        // Keep pickerFromParent logic in Render (same approach as groupsOfPicker).
        setTimeout(function () {
          function clearPickerValue(pickerId) {
            try {
              var delBtn = $(
                "#" + pickerId + "_TopSpan_ResolvedList .sp-peoplepicker-delImage"
              ).first();
              if (delBtn.length) delBtn.click();
              $("#" + pickerId + "_TopSpan_HiddenInput").val("");
              $("#" + pickerId + "_TopSpan_EditorInput").val("");
            } catch (e) {}
            $("#" + pickerId).attr("data-email", enternameemail);
            $("#" + pickerId).removeAttr("user-email");
          }

          function setPickerValue(pickerId, userKey, displayText, emailKey) {
            var retry = 0;
            var maxRetry = 20;
            var trySet = function () {
              retry++;
              var pp =
                SPClientPeoplePicker &&
                SPClientPeoplePicker.SPClientPeoplePickerDict
                  ? SPClientPeoplePicker.SPClientPeoplePickerDict[
                      pickerId + "_TopSpan"
                    ]
                  : null;
              if (pp && pp.AddUserKeys) {
                if (displayText) {
                  $("#" + pickerId).attr("data-email", displayText);
                }
                if (emailKey) {
                  $("#" + pickerId).attr("user-email", emailKey);
                } else if (userKey) {
                  $("#" + pickerId).attr("user-email", userKey);
                }
                pp.AddUserKeys(userKey);
                return;
              }
              if (retry < maxRetry) setTimeout(trySet, 200);
            };
            trySet();
          }

          $(document)
            .off("change.pickerFromParent." + pickerFromParentId)
            .on(
              "change.pickerFromParent." + pickerFromParentId,
              pickerFromParentListener,
              function () {
                var parentValue = $(this).val();

                clearPickerValue(pickerFromParentId);
                if (!parentValue) return;

                var safeParentValue = (parentValue || "").replace(/'/g, "''");
                var apiUrl =
                  _spPageContextInfo.webAbsoluteUrl +
                  "/_api/web/lists/getbytitle('" +
                  pickerFromParentSource +
                  "')/items?$select=ID," +
                  pickerFromParentValField +
                  "," +
                  pickerFromParentDispField +
                  "/Name," +
                  pickerFromParentDispField +
                  "/EMail," +
                  pickerFromParentDispField +
                  "/Title&$expand=" +
                  pickerFromParentDispField +
                  "&$filter=" +
                  pickerFromParentValField +
                  " eq '" +
                  safeParentValue +
                  "' and DeletionStatus ne 'Deleted'&$top=1";

                $.ajax({
                  url: apiUrl,
                  type: "GET",
                  headers: { Accept: "application/json;odata=verbose" },
                  success: function (data) {
                    var results =
                      data && data.d && Array.isArray(data.d.results)
                        ? data.d.results
                        : [];
                    if (!results.length) return;

                    var manager = results[0][pickerFromParentDispField];
                    var managerObj = null;
                    if (manager && Array.isArray(manager.results)) {
                      managerObj = manager.results[0];
                    } else if (Array.isArray(manager)) {
                      managerObj = manager[0];
                    } else {
                      managerObj = manager;
                    }
                    if (!managerObj) return;

                    var displayText = managerObj.Title || "";
                    var emailKey = managerObj.EMail || "";
                    var userKey =
                      managerObj.Name || managerObj.EMail || managerObj.Title || "";
                    if (userKey)
                      setPickerValue(
                        pickerFromParentId,
                        userKey,
                        displayText,
                        emailKey
                      );
                  },
                  error: function () {},
                });
              }
            );
        }, 500);

        OnSuccess(flag, htmlBody);
        break;

      case "lookup":
        // dontSubmit lookups stay as read-only text; disabled-only (e.g. WFStage) use select below
        if (element.dontSubmit) {
          if (element.BIlanguage == true) {
            if (
              localStorage.getItem("lng") == null ||
              localStorage.getItem("lng") == "ar"
            ) {
              dispfieldkey = element.Dispfieldkey;
            } else {
              dispfieldkey = element.DispfieldkeyEn || element.Dispfieldkey;
            }
          } else {
            dispfieldkey = element.Dispfieldkey;
          }
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            (element.className || "") +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            '  style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            (element.validation || "") +
            ">" +
            displayName +
            "</label>" +
            '<input type="text" class="form-control SPIField" ' +
            (element.state || "disabled") +
            ' readonly data-field-type="lookup" data-listname="' +
            element.source +
            '" data-valfieldkey="' +
            (element.valfieldkey || "Title") +
            '" data-dispfieldkey="' +
            dispfieldkey +
            '" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            ' value="" />' +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;
        }
        var customQuery;
        let roleAccess = [];

        if (
          element.hasOwnProperty("useAccessPolicy") &&
          element.useAccessPolicy &&
          myRoleConfig &&
          myRoleConfig[0] &&
          myRoleConfig[0].hasOwnProperty("dataFilter")
        ) {
            isRoleDataLevelAccess = true;

            await get_hierarchies.init(element.source);

            myRoleConfig[0].dataFilter.hierarchies.forEach((el, i, a) => {
              let accessConditions = el.accessConditions;
              let isListConditional1 = el.listName == element.source;
              let isListConditional2 =
                el.subRelation.listName == element.source;
              let isListConditional3 =
                el.subRelation.subRelation.listName == element.source;
              let isListConditional4 = el.subRelation.subRelation.subRelation
                ? el.subRelation.subRelation.subRelation.listName ==
                  element.source
                : false;
              if (isListConditional1) {
                customQuery = data_Level1_Access.g.dataLevelQuery;
              } else if (isListConditional2) {
                customQuery = data_Level2_Access.g.dataLevelQuery;
              } else if (isListConditional3) {
                customQuery = data_Level3_Access.g.dataLevelQuery;
              } else if (isListConditional4) {
                customQuery = data_Level3_Access.g.dataLevelQuery;
              }
            });

            // }
        }
        // filter data based on role access
        else if (
          element.hasOwnProperty("accessFilter") &&
          myRoleConfig &&
          myRoleConfig[0]
        ) {
          roleAccess = element.accessFilter.filter((el) => {
            return el.role == myRoleConfig[0].Role;
          });
          if (roleAccess.length > 0) {
            customQuery = await ListInfo.roleQuery(roleAccess[0].conditions);
          }
        }
        if (
          roleAccess.length == 0 &&
          !element.hasOwnProperty("useAccessPolicy")
        ) {
          // can't put else cause when the roleAccess will be empty arrray will nor render a query so all data(deleted and not deleted will appear)

          if (element.isSector == "True") {
            customQuery =
              "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"EntityType\" /><Value Type=\"Choice\">" +
              element.EntityType +
              "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          } else if (PCODE && element.projectCodeInList) {
            customQuery =
              "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
              PCODE +
              "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
            if (element.hasOwnProperty("projectScopeSecondConditionField")) {
              customQuery = `<View><Query><Where><And>
								<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><And>
								<Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">${PCODE}</Value></Eq>
								<Eq><FieldRef Name=\"${element.projectScopeSecondConditionFieldType}\" /><Value Type=\"${element.projectScopeSecondConditionFieldType}\">${element.projectScopeSecondConditionFieldValue}</Value></Eq></And></And>
								</Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>`;
            }
          } else if (sosCode && element.sosCodeInList) {
            var sosCodeEscaped3 = (sosCode || "").replace(/'/g, "''");
            customQuery =
              "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"SOCode\" /><Value Type=\"Text\">" +
              sosCodeEscaped3 +
              "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          } else if (
            typeof UserSTCode !== "undefined" &&
            UserSTCode &&
            element.StrategicPartnershipCodeInList
          ) {
            customQuery =
              "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"StrategicPartnershipCode\" /><Value Type=\"Text\">" +
              UserSTCode +
              "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          } else if (
            (ICODE && element.initiativeCodeInList) ||
            (RListKey == "initiatives" && element.initiativeCodeInList)
          ) {
            // get the data on same parent depends on ICODE in cr
            if (RListKey == "initiatives" && listkey == "changerequest") {
              ICODE = $("#InitiativeCode").val();
            }
            customQuery =
              "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
              ICODE +
              "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          } else {
            //change FieldRef to Name and Acending True to can sort alphapetics arabic and english
            customQuery =
              "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";
          }

          // should remove all comments when check the security role

          // if (
          //   (listkey == "sos" && element.InternalName == "RelatedStrategy") ||
          //   (listkey == "mainkpi" && element.InternalName == "RelatedStrategy")
          // ) {
          //   // to get the related strategy type based on user Role
          //   if (isVROP) {
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">vision</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          //   } else {

          //   }
          // }

          //if ICODE and listkey = 'initiativedeli'
          // if (ICODE && element.source == "Benefits") {
          //   //change FieldRef to Name and Acending True to can sort alphapetics arabic and english
          //   customQuery =
          //     "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
          //     ICODE +
          //     "</Value></Eq></And></Where><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";
          // }
          // if (
          //   ICODE &&
          //   element.source == "InitiativeDeliverables" &&
          //   listkey == "initiativemilestones"
          // ) {
          //   //change FieldRef to Name and Acending True to can sort alphapetics arabic and english
          //   customQuery =
          //     "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
          //     ICODE +
          //     "</Value></Eq></And></Where><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";
          // }
          //ghufran User dropdown security
          // if (isEPMO || isSPMAdmin || isSPMTeam) {
          //   if (
          //     (listkey == "benefitmetrics" &&
          //       element.InternalName == "RelatedBenefit") ||
          //     (listkey == "benefitmatrix" &&
          //       element.InternalName == "RelatedBenefit") ||
          //     (listkey == "deliverablemetrics" &&
          //       element.InternalName == "RelatedInitiativeDeliverable")
          //   ) {
          //     if (localStorage.getItem("Dynamo_Initiatives") != null) {
          //       var visionarr = JSON.parse(
          //         localStorage.getItem("Dynamo_Initiatives") || "[]"
          //       );
          //       visionarr = visionarr.filter(function (item) {
          //         return item.name == "vision";
          //       });
          //       var strategicallyarr = JSON.parse(
          //         localStorage.getItem("Dynamo_Initiatives") || "[]"
          //       );
          //       strategicallyarr = strategicallyarr.filter(function (item) {
          //         return item.name == "strategically";
          //       });
          //       console.log("visionarr", visionarr);
          //       console.log("strategic", strategicallyarr);
          //     }
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"InitiativeCode\" /><Values>";
          //     strategicallyarr.forEach(function (item) {
          //       customQuery += '<Value Type="Text">' + item.code + "</Value>";
          //     });
          //     customQuery +=
          //       "</Values></In></And></Where></Query><RowLimit>100</RowLimit></View>";
          //   } else if (
          //     (listkey == "Benefits" &&
          //       element.InternalName == "InitiativeCode") ||
          //     (listkey == "BenefitMatrix" &&
          //       element.InternalName == "RelatedInitiative")
          //   ) {
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">strategically</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          //   } else if (
          //     "benefitmatrix" &&
          //     element.InternalName == "RelatedKPI"
          //   ) {
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus'/><Value Type='Text'>Deleted</Value></Neq><Or><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">strategically</Value></Eq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">sub</Value></Eq></Or></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          //   }
          // }
          // if (isVROE || isVROP) {
          //   if (
          //     (listkey == "Benefits" &&
          //       element.InternalName == "InitiativeCode") ||
          //     (listkey == "BenefitMatrix" &&
          //       element.InternalName == "RelatedInitiative")
          //   ) {
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">vision</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          //   } else if (
          //     (listkey == "benefitmetrics" &&
          //       element.InternalName == "RelatedBenefit") ||
          //     (listkey == "benefitmatrix" &&
          //       element.InternalName == "RelatedBenefit") ||
          //     (listkey == "deliverablemetrics" &&
          //       element.InternalName == "RelatedInitiativeDeliverable")
          //   ) {
          //     if (localStorage.getItem("Dynamo_Initiatives") != null) {
          //       var visionarr = JSON.parse(
          //         localStorage.getItem("Dynamo_Initiatives") || "[]"
          //       );
          //       visionarr = visionarr.filter(function (item) {
          //         return item.name == "vision";
          //       });
          //       var strategicallyarr = JSON.parse(
          //         localStorage.getItem("Dynamo_Initiatives") || "[]"
          //       );
          //       strategicallyarr = strategicallyarr.filter(function (item) {
          //         return item.name == "strategically";
          //       });
          //       console.log("visionarr", visionarr);
          //       console.log("strategic", strategicallyarr);
          //     }
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"InitiativeCode\" /><Values>";
          //     visionarr.forEach(function (item) {
          //       customQuery += '<Value Type="Text">' + item.code + "</Value>";
          //     });
          //     customQuery +=
          //       "</Values></In></And></Where></Query><RowLimit>100</RowLimit></View>";
          //   } else if (
          //     "benefitmatrix" &&
          //     element.InternalName == "RelatedKPI"
          //   ) {
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">vision</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          //   }
          // }
        }

        //to handle lookup field bilangual like Portfolio
        if (element.BIlanguage == true) {
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            dispfieldkey = element.Dispfieldkey;
          } else {
            dispfieldkey = element.DispfieldkeyEn;
          }
        }

        var listFields = [element.valfieldkey, dispfieldkey];

        if (element.sourcefieldlvl1) {
          // to handle sector and subsector (get the element from list)
          parentFieldKey = element.fieldsinformlvl1;
          // listFields = [element.valfieldkey, dispfieldkey, element.filterField];
          listFields.push(element.sourcefieldlvl1);

          if (element.sourcefieldlvl2) {
            listFields.push(element.sourcefieldlvl2);
          }
        } else {
          parentFieldKey = "";
        }
        /////////////////////////////////////////////////////////// to get the seblings value

        if (element.hasOwnProperty("valsiblingkey")) {
          listFields.push(element.valsiblingkey);
        }
        /////////////////////////////////////////////////////////// to get the seblings array of name and values and assign it on siblings fields
        if (element.hasOwnProperty("targetsiblingarr")) {
          element.targetsiblingarr.forEach((el) => {
            listFields.push(el);
          });
        }

        ///////////////////////////////////////////////////////////
        var grandFieldId = "";
        if (element.grandFieldId) {
          grandFieldId = `data-grandFieldId=${element.grandFieldId}`;
        } else {
          grandFieldId = "";
        }
        var notInvokeListinerData = "",
          seconedValueListiner = "",
          parentCustomFilterValue = "";
        if (element.notInvokeListiner) {
          notInvokeListinerData = `data-notInvokeListiner=${element.notInvokeListiner}`;
          seconedValueListiner = `data-seconedvaluelistiner=""`;

          parentCustomFilterValue = `data-parentcustomfiltervalue=""`;
        }

        // validation of siblings to add a listiner class
        var addSeblingClass = "";
        if (
          (element.targetsiblingkey &&
            element.targetsiblingkey != "undefined") ||
          (element.targetsiblingarr && element.targetsiblingarr != "undefined")
        ) {
          addSeblingClass = "getsiblingdata";
        }
        var additionalFilterDataAttrs = "";
        if (
          element.additionalFilterField &&
          element.additionalFilterFromField
        ) {
          additionalFilterDataAttrs =
            ' data-additionalfilterfield="' +
            element.additionalFilterField +
            '" data-additionalfiltertype="' +
            (element.additionalFilterFieldType || "Lookup") +
            '" data-additionalfilterfrom="' +
            element.additionalFilterFromField +
            '"';
          if (
            element.additionalFilterRequireWhenTypes &&
            element.additionalFilterRequireWhenTypes.length
          ) {
            additionalFilterDataAttrs +=
              ' data-additionalfilterrequiretypes="' +
              (Array.isArray(element.additionalFilterRequireWhenTypes)
                ? element.additionalFilterRequireWhenTypes.join(",")
                : String(element.additionalFilterRequireWhenTypes)) +
              '"';
          }
          if (element.additionalFilterTypesFormField) {
            additionalFilterDataAttrs +=
              ' data-additionalfiltertypesfield="' +
              element.additionalFilterTypesFormField +
              '"';
          }
          if (element.additionalFilterLookupId) {
            additionalFilterDataAttrs += ' data-additionalfilterlookupid="true"';
          }
        }
        /////////////////////////////////////////////////
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<select " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          " " +
          inputLisKey +
          element.validation +
          " " +
          grandFieldId +
          " " +
          notInvokeListinerData +
          " " +
          parentCustomFilterValue +
          " " +
          seconedValueListiner +
          " " +
          dynamic +
          " " +
          seconeddynamic +
          " " +
          additionalFilterDataAttrs +
          ' data-listname="' +
          element.source +
          '" data-valfieldkey="' +
          element.valfieldkey +
          '" data-Dispfieldkey="' +
          dispfieldkey +
          '"data-filterfield="' +
          element.filterField +
          '"data-queryfieldvalue="' + //
          element.queryFieldValue +
          '"data-queryfield="' + //
          element.queryField +
          '"data-queryfieldtype="' + //
          element.queryFieldType +
          '" data-filterfieldtype="' +
          element.filterFieldType +
          '" data-siblingtarget="' +
          element.targetsiblingkey +
          '" class="form-control ' +
          addSeblingClass +
          '" type="dropdown" id="' + // getsiblingdata to get the data based on selection value
          element.InternalName +
          '" value="" placeholder="' +
          displayName +
          '" ' +
          element.state +
          '><option value="" ' +
          selected +
          " disabled>" +
          displayName +
          "</option>";

        var itemsID = [];
        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.source,
          customQuery,
          listFields,
          function (records, record, listItem, isDone) {
            if (listItem) itemsID.push(listItem.get_id());
            if (isDone) {
              // to handle sibling array values
              var dataArraySiblingValues = [];
              records.forEach(function (el, index) {
                var arraysiblingvalues = [];

                if (
                  element.targetsiblingarr &&
                  element.targetsiblingarr != "undefined"
                ) {
                  element.targetsiblingarr.forEach((item) => {
                    arraysiblingvalues.push({ name: item, value: el[item] });
                  });

                  dataArraySiblingValues =
                    'data-arraysiblingvalues="' +
                    JSON.stringify(arraysiblingvalues).replaceAll(`"`, `'`) +
                    '"';
                }
                //

                if (el[dispfieldkey] && el[dispfieldkey].length > 100) {
                  var optionText = el[dispfieldkey].substr(0, 100) + "...";
                } else {
                  var optionText = el[dispfieldkey];
                }
                htmlBody +=
                  '<option data-siblingvalue="' +
                  el[element.valsiblingkey] +
                  '" ' +
                  dataArraySiblingValues +
                  ' option-id="' +
                  itemsID[index] +
                  '" value="' +
                  el[element.valfieldkey] + //data-parentrelatedkeylvl1 > to get the target element,data-parentrelatedvaluelvl1 > to save the value of parent like sector
                  '" data-parentrelatedvaluelvl1=' +
                  el[element.sourcefieldlvl1] +
                  " data-parentrelatedkeylvl1=" +
                  element.fieldsinformlvl1 + // changed from dynamic to fieldsinformlvl1
                  " data-parentrelatedvaluelvl2=" +
                  el[element.sourcefieldlvl2] +
                  " data-parentrelatedkeylvl2=" +
                  element.fieldsinformlvl2 +
                  " >" +
                  optionText +
                  "</option>";
              });
              htmlBody +=
                "</select>" +
                '<div class="inputInfo ' +
                isexist +
                '">' +
                descPhrase +
                "</div>" +
                "</div>";
              //console.log(`htmlBody from lookup success`, htmlBody);
              OnSuccess(flag, htmlBody);
            }
          }
        );
        break;

      case "lookupWithQuery":
        var customQuery;
        //change FieldRef to Name and Acending True to can sort alphapetics arabic and english
        customQuery =
          "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"" +
          element.queryField +
          '" /><Value Type="' +
          element.queryFieldType +
          '">' +
          element.queryFieldValue +
          "</Value></Eq></And></Where><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '    data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<select " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          "  " +
          element.validation +
          " " +
          dynamic +
          ' data-listname="' +
          element.source +
          '" data-valfieldkey="' +
          element.valfieldkey +
          '" data-Dispfieldkey="' +
          element.Dispfieldkey +
          '"  data-filterfield="' +
          element.filterField +
          '"data-queryfieldvalue="' +
          element.queryFieldValue +
          '"data-queryfield="' +
          element.queryField +
          '"data-queryfieldtype="' +
          element.queryFieldType +
          '" data-filterfieldtype="' +
          element.filterFieldType +
          '" class="form-control" type="dropdown" id="' +
          element.InternalName +
          '" value="" placeholder="' +
          displayName +
          '" ' +
          element.state +
          '><option value="" ' +
          selected +
          " disabled>" +
          displayName +
          "</option>";

        var itemsID = [];
        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.source,
          customQuery,
          [element.valfieldkey, element.Dispfieldkey],
          function (records, record, listItem, isDone) {
            if (listItem) itemsID.push(listItem.get_id());
            if (isDone) {
              records.forEach(function (el, index) {
                htmlBody +=
                  '<option option-id="' +
                  itemsID[index] +
                  '" value="' +
                  el[element.valfieldkey] +
                  '">' +
                  el[element.Dispfieldkey] +
                  "</option>";
              });
              htmlBody += "</select></div>";
              OnSuccess(flag, htmlBody);
            }
          }
        );
        break;

      case "lookupWithDynamicQuery":
        // This type allows queryFieldValue to be taken dynamically from another field
        // queryFieldValueFromField: the InternalName of the field to get the value from
        var customQuery;
        var queryFieldValueToUse = "";
        
        // Get the value from the source field if queryFieldValueFromField is specified
        if (element.queryFieldValueFromField) {
          var sourceFieldElement = $("select#" + element.queryFieldValueFromField + ", input#" + element.queryFieldValueFromField);
          if (sourceFieldElement.length > 0) {
            queryFieldValueToUse = sourceFieldElement.val() || "";
          }
        } else {
          queryFieldValueToUse = element.queryFieldValue || "";
        }
        
        // Build query only if we have a value (or if queryFieldValueFromField is not set, use static value)
        if (queryFieldValueToUse || !element.queryFieldValueFromField) {
          customQuery =
            "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"" +
            element.queryField +
            '" /><Value Type="' +
            element.queryFieldType +
            '">' +
            queryFieldValueToUse +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";
        } else {
          // If no value from source field, return empty query
          customQuery =
            "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";
        }

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '    data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<select " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          "  " +
          element.validation +
          " " +
          (element.queryFieldValueFromField ? 'dynamic="' + element.queryFieldValueFromField + '" ' : '') +
          ' data-listname="' +
          element.source +
          '" data-valfieldkey="' +
          element.valfieldkey +
          '" data-Dispfieldkey="' +
          element.Dispfieldkey +
          '"  data-filterfield="' +
          (element.filterField || "") +
          '" data-queryfieldvalue="' +
          queryFieldValueToUse +
          '" data-queryfield="' +
          element.queryField +
          '" data-queryfieldtype="' +
          element.queryFieldType +
          '" data-queryfieldvaluefromfield="' +
          (element.queryFieldValueFromField || "") +
          '" data-filterfieldtype="' +
          (element.filterFieldType || "") +
          '" class="form-control lookupWithDynamicQuery" type="dropdown" id="' +
          element.InternalName +
          '" value="" placeholder="' +
          displayName +
          '" ' +
          element.state +
          '><option value="" ' +
          selected +
          " disabled>" +
          displayName +
          "</option>";

        var itemsID = [];
        if (queryFieldValueToUse || !element.queryFieldValueFromField) {
          sphttp.get(
            _spPageContextInfo.siteServerRelativeUrl,
            element.source,
            customQuery,
            [element.valfieldkey, element.Dispfieldkey],
            function (records, record, listItem, isDone) {
              if (listItem) itemsID.push(listItem.get_id());
              if (isDone) {
                records.forEach(function (el, index) {
                  htmlBody +=
                    '<option option-id="' +
                    itemsID[index] +
                    '" value="' +
                    el[element.valfieldkey] +
                    '">' +
                    el[element.Dispfieldkey] +
                    "</option>";
                });
                htmlBody += "</select></div>";
                OnSuccess(flag, htmlBody);
              }
            }
          );
        } else {
          htmlBody += "</select></div>";
          OnSuccess(flag, htmlBody);
        }
        break;

      case "lookupdropdown":
        if (element.BIlanguage == true) {
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            dispfieldkey = element.Dispfieldkey;
          } else {
            dispfieldkey = element.DispfieldkeyEn || element.Dispfieldkey;
          }
        } else {
          dispfieldkey = element.Dispfieldkey;
        }
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          (element.className || "") +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          '  style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          (element.validation || "") +
          ">" +
          displayName +
          "</label>" +
          '<input type="text" class="form-control SPIField" ' +
          (element.state || "disabled") +
          ' readonly data-field-type="lookupdropdown" data-listname="' +
          element.source +
          '" data-valfieldkey="' +
          (element.valfieldkey || "Title") +
          '" data-dispfieldkey="' +
          dispfieldkey +
          '" data-parentlookupfield="' +
          (element.parentLookupField ||
            (element.InternalName &&
            element.InternalName.indexOf("dummyfield") !== -1
              ? element.InternalName.replace("dummyfield", "")
              : "KPICode")) +
          '" id="' +
          element.InternalName +
          '" ' +
          ToggleName +
          ' value="" />' +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "lookupfromlookup":
        if (element.BIlanguage == true) {
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            dispfieldkey = element.Dispfieldkey;
          } else {
            dispfieldkey = element.DispfieldkeyEn || element.Dispfieldkey;
          }
        } else {
          dispfieldkey = element.Dispfieldkey;
        }
        var secondDisp = element.secondDispfieldkey || "Name";
        var secondVal = element.secondvalfieldkey || "Title";
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          (element.className || "") +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          '  style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          (element.validation || "") +
          ">" +
          displayName +
          "</label>" +
          '<input type="text" class="form-control SPIField" ' +
          (element.state || "disabled") +
          ' readonly data-field-type="lookupfromlookup" data-listname="' +
          element.source +
          '" data-valfieldkey="' +
          (element.valfieldkey || "Title") +
          '" data-dispfieldkey="' +
          dispfieldkey +
          '" data-parentlookupfield="' +
          (element.parentLookupField ||
            (element.InternalName &&
            element.InternalName.indexOf("dummyfield") !== -1
              ? element.InternalName.replace("dummyfield", "")
              : "KPICode")) +
          '" data-secondsource="' +
          (element.secondsource || "") +
          '" data-seconddispfieldkey="' +
          secondDisp +
          '" data-secondvalfieldkey="' +
          secondVal +
          '" id="' +
          element.InternalName +
          '" ' +
          ToggleName +
          ' value="" />' +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "lookupmultiline":
        var dispKeyM = element.Dispfieldkey;
        if (element.BIlanguage && (localStorage.getItem("lng") == "en") && element.DispfieldkeyEn) dispKeyM = element.DispfieldkeyEn;
        htmlBody =
          '<div class="col-md-6 CFIELD multiline dont-submit dont-request ' + (element.className || "") + ' " ' + thistip + " " + hidestagesIDs + " " +
          showstagesIDs + "  " + disablestagesIDs + "  " + enablestagesIDs + "   " + isWfhidestagesIDs + " " + requireOnWfTaskstagesIDs + " " +
          isWfshowstagesIDs + "  " + isWfdisablestagesIDs + "  " + isWfenablestagesIDs +
          ' data-groups="' + groups + '" ' + notAllowForGroups + ' style="display:' + element.display + '">' +
          '<label for="' + element.InternalName + '" ' + (element.validation || "") + ">" + displayName + "</label>" +
          '<p type="lookupmultiline" data-listname="' + element.source + '" data-valfieldkey="' + (element.valfieldkey || "Title") +
          '" data-dispfieldkey="' + dispKeyM + '" data-parentlookupfield="' + (element.parentLookupField || (element.InternalName && element.InternalName.indexOf("dummyfield") !== -1 ? element.InternalName.replace("dummyfield", "") : "KPICode")) +
          '" class="viewmode-value" id="' + element.InternalName + '" ' + ToggleName + "></p>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "lookupdatetime":
        var dispKeyD = element.Dispfieldkey;
        if (element.BIlanguage && (localStorage.getItem("lng") == "en") && element.DispfieldkeyEn) dispKeyD = element.DispfieldkeyEn;
        htmlBody =
          '<div class="col-md-6 CFIELD dont-submit dont-request ' + (element.className || "") + ' " ' + thistip + " " + hidestagesIDs + " " +
          showstagesIDs + "  " + disablestagesIDs + "  " + enablestagesIDs + "   " + isWfhidestagesIDs + " " + requireOnWfTaskstagesIDs + " " +
          isWfshowstagesIDs + "  " + isWfdisablestagesIDs + "  " + isWfenablestagesIDs +
          ' data-groups="' + groups + '" ' + notAllowForGroups + ' style="display:' + element.display + '">' +
          '<label for="' + element.InternalName + '" ' + (element.validation || "") + ">" + displayName + "</label>" +
          '<p type="lookupdatetime" data-listname="' + element.source + '" data-valfieldkey="' + (element.valfieldkey || "Title") +
          '" data-dispfieldkey="' + dispKeyD + '" data-parentlookupfield="' + (element.parentLookupField || (element.InternalName && element.InternalName.indexOf("dummyfield") !== -1 ? element.InternalName.replace("dummyfield", "") : "KPICode")) +
          '" class="viewmode-value" id="' + element.InternalName + '" ' + ToggleName + "></p>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "relatedProjectlookupWithQuery": //to specific data related to 2 columns added by mahmoud and aisha
        var customQuery;
        if (element.queryField2 && element.notEqual) {
          // handle the deleverynote not eq 100 in DN new Json
          customQuery =
            '<View><Query><Where><And><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' +
            PCODE +
            '</Value></Eq><And><Neq><FieldRef Name="' +
            element.queryField2 +
            '" /><Value Type="' +
            element.queryFieldType2 +
            '">' +
            element.queryFieldValue2 +
            '</Value></Neq><Eq><FieldRef Name="' +
            element.queryField +
            '" /><Value Type="' +
            element.queryFieldType +
            '">' +
            element.queryFieldValue +
            "</Value></Eq></And></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
        } else if (element.queryField2) {
          customQuery =
            '<View><Query><Where><And><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' +
            PCODE +
            '</Value></Eq><And><Eq><FieldRef Name="' +
            element.queryField2 +
            '" /><Value Type="' +
            element.queryFieldType2 +
            '">' +
            element.queryFieldValue2 +
            '</Value></Eq><Eq><FieldRef Name="' +
            element.queryField +
            '" /><Value Type="' +
            element.queryFieldType +
            '">' +
            element.queryFieldValue +
            "</Value></Eq></And></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
        } else {
          customQuery =
            '<View><Query><Where><And><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' +
            PCODE +
            '</Value></Eq><Eq><FieldRef Name="' +
            element.queryField +
            '" /><Value Type="' +
            element.queryFieldType +
            '">' +
            element.queryFieldValue +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
        }

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '    data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<select " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          " " +
          element.validation +
          " " +
          dynamic +
          ' data-listname="' +
          element.source +
          '" data-valfieldkey="' +
          element.valfieldkey +
          '" data-Dispfieldkey="' +
          element.Dispfieldkey +
          '" data-filterfield="' +
          element.filterField +
          '" data-filterfieldtype="' +
          element.filterFieldType +
          ' " class="form-control" type="dropdown" id="' +
          element.InternalName +
          '" value="" placeholder="' +
          displayName +
          '" ' +
          element.state +
          '><option value="" ' +
          selected +
          " disabled>" +
          displayName +
          "</option>";

        var itemsID = [];
        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.source,
          customQuery,
          [element.valfieldkey, element.Dispfieldkey],
          function (records, record, listItem, isDone) {
            if (listItem) itemsID.push(listItem.get_id());
            if (isDone) {
              records.forEach(function (el, index) {
                htmlBody +=
                  '<option option-id="' +
                  itemsID[index] +
                  '" value="' +
                  el[element.valfieldkey] +
                  '">' +
                  el[element.Dispfieldkey] +
                  "</option>";
              });
              htmlBody += "</select></div>";
              //console.log(`htmlBody from lookup success`, htmlBody);
              OnSuccess(flag, htmlBody);
            }
          }
        );
        break;

      case "multiline":
        htmlBody =
          '<div class="col-md-6 CFIELD multiline ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<textarea " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="multiline" maxlength=' +
          element.maxchar +
          ' rows="3" value="" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          "></textarea>" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "breakline":
        htmlBody = '<div class="col-md-12"></div>';
        OnSuccess(flag, htmlBody);
        break;

      case "anchor":
        if (CreateChangeRequest_Access.includes(jsonListKey)) {
          htmlBody =
            '<div class="col-md-3 CFIELD ' +
            element.className +
            " " +
            hideField +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            editableBy +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '       data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            "<a " +
            ToggleName +
            " " +
            toggleDisabledName +
            " " +
            RequiredName +
            ' href="' +
            element.href +
            '" ' +
            dynamic +
            ' class="formLink" id="' +
            element.InternalName +
            '" ' +
            element.state +
            " " +
            element.validation +
            " target='_blank'>" +
            displayName +
            '<i class="icon-plus"></i>' +
            "</a>" +
            "</div>";
        } else {
          htmlBody = "";
        }
        // htmlBody = '<div class="col-md-12"></div>';
        OnSuccess(flag, htmlBody);
        break;

      case "file":
        var attachmentId =
          attachCount == 0 ? "getFile" : "getFile" + attachCount;

        // to add the purpose of attach
        let docPurpose = element.docPurpose
          ? `data-docpurpose=${element.docPurpose}`
          : "";

        htmlBody =
          '<div class="col-md-12 CFIELD ' +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label  class="attlabel" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" + //class="custom-file-upload"
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          " " +
          docPurpose +
          ' type="file" accept="' +
          acceptedExtensions +
          '" hidden multiple="multiple" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          attachmentId +
          '" ' +
          element.state +
          " " +
          element.validation +
          " >" +
          '<label data-trans-choosefile id="chooseFile" for="' +
          attachmentId +
          '" class="Resources"></label>' +
          '<span id="file-chosen"><span data-trans-nofile id="nofile" class="Resources"></span></span>' +
          '<div class="AttErrorMsg attErrorMsg"><span data-trans-file class="Resources"></span><span class="notacceptedext"></span><span data-trans-notallowed class="Resources"></span></div>' +
          '<div class="attErrorMsg"><span data-trans-acceptedfiles class="Resources"></span><span class="acceptedfile"></span></div>' +
          '<div class="attErrorMsg"><span data-trans-fileSize class="Resources"></span></div>' +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        if (element.withAddBtn == "true") {
          htmlBody +=
            '<div class="add-New-Detail-wrapper"><a class="add-New-Attach" href="javascript:"><i class="fas fa-plus"></i></a></div>';
        }

        attachCount = attachCount + 1;

        OnSuccess(flag, htmlBody);
        break;
    }
    if (listkey === "projects" && (isNew || isEdit)) {
      $("#RelatedInitiative").on("change", function () {
          var initCode = $(this).val(); // get selected initiative code
  
          if (initCode) {
              $.ajax({
                  url: `${APIURL}/job/checkunfundedinitiative/${initCode}`,
                  type: "GET",
                  headers: {
                      Accept: "application/json;odata=verbose",
                  },
                  success: function (data) {
                      // Check if API returned successfully
                      if (data && data.isSuccess) {
                          if (data.result === true) {
                              $("#FundingStatus").val("unfunded").prop("disabled", true);
                          } else {
                              $("#FundingStatus").val("").prop("disabled", false);
                          }
                      } else {
                          console.warn("API returned unsuccessful:", data);
                          $("#FundingStatus").val("").prop("disabled", false);
                      }
                  },
                  error: function (err) {
                      console.error("Error checking unfunded initiative:", err);
                      $("#FundingStatus").val("").prop("disabled", false);
                  },
              });
          } else {
              $("#FundingStatus").val("").prop("disabled", false);
          }
      });
  }
    if ((listkey === "risks" || listkey === "initiativerisks") && (isEdit || isNew)) {
      function calculateRiskRating() {
        var impact = $("#Impact").val();
        var probability = $("#Probability").val();
        if (!impact || !probability) return;
        $.ajax({
          url: `${APIURL}/job/calculateriskrating/${encodeURIComponent(impact)}/${encodeURIComponent(probability)}`,
          type: "GET",
          headers: { Accept: "application/json;odata=verbose" },
          success: function (data) {
            if (data && data.isSuccess && data.result) {
              $("#RiskRating").val(data.result.riskRating != null ? data.result.riskRating : "");
              $("#RiskRatingStatus").val(data.result.riskRatingStatus || "");
            } else {
              $("#RiskRating").val("");
              $("#RiskRatingStatus").val("");
            }
          },
          error: function () {
            $("#RiskRating").val("");
            $("#RiskRatingStatus").val("");
          },
        });
      }
      $("#Impact, #Probability").on("change", calculateRiskRating);
    }
    if (
      (listkey == "deliverables" || listkey == "milestones") &&
      (isEdit || isNew || isView)
    ) {
      var strategicProjectCode =
        typeof USERPCODE !== "undefined" && USERPCODE
          ? USERPCODE
          : typeof PCODE !== "undefined" && PCODE
          ? PCODE
          : "";
      if (strategicProjectCode) {
        $.ajax({
          url: "/_api/web/lists/getbytitle('Projects')/items",
          type: "GET",
          data: {
            $select: "Title,IsStrategicProject",
            $filter: "Title eq '" + strategicProjectCode + "'",
          },
          headers: {
            Accept: "application/json;odata=verbose",
          },
          success: function (data) {
            if (data.d.results.length > 0) {
              var project = data.d.results[0];
              var projectType = (
                project.IsStrategicProject || ""
              ).toLowerCase();
              var isStrategy = projectType === "strategy";
              var isOperationally = projectType === "operationally";
              var relatedInitiativeFieldId =
                listkey == "deliverables"
                  ? "RelatedInitiativeDeliverable"
                  : "RelatedInitiativeMilestone";

              var applyRelatedInitiativeFieldVisibility = function (retries) {
                var $fields = $("[id='" + relatedInitiativeFieldId + "']");
                if (!$fields.length) {
                  if (retries > 0) {
                    setTimeout(function () {
                      applyRelatedInitiativeFieldVisibility(retries - 1);
                    }, 300);
                  }
                  return;
                }
                $fields.each(function () {
                  var $field = $(this);
                  var $cfield = $field.closest(".CFIELD");
                  if (isOperationally) {
                    $cfield.hide().addClass("hide-field");
                    $field.attr("required", false).removeAttr("required");
                    $cfield
                      .find("label")
                      .attr("required", false)
                      .removeAttr("required");
                    return;
                  }
                  if (listkey == "deliverables" && (isEdit || isNew)) {
                    if (isStrategy) {
                      $field.attr("required", true);
                      $cfield.find("label").attr("required", true);
                    } else {
                      $field.attr("required", false);
                      $cfield.find("label").attr("required", false);
                    }
                  }
                });
              };
              applyRelatedInitiativeFieldVisibility(20);
            }
          },
          error: function (error) {
            console.log("Error fetching project data: ", error);
          },
        });
      }
    }
    if (
      (listkey == "deliverables" || listkey == "milestones") &&
      (isEdit || isNew)
    ) {
      if (typeof USERPCODE !== "undefined" && USERPCODE) {
        $.ajax({
          url: "/_api/web/lists/getbytitle('Projects')/items",
          type: "GET",
          data: {
            $select: "Title,IsZeroBudgetProject",
            $filter: "Title eq '" + USERPCODE + "'",
          },
          headers: {
            Accept: "application/json;odata=verbose",
          },
          success: function (data) {
            if (data.d.results.length > 0) {
              var project = data.d.results[0];
              if (
                project.IsZeroBudgetProject &&
                project.IsZeroBudgetProject.toLowerCase() === "yes"
              ) {
                hideBudgetFields();
              }
            }
          },
          error: function (error) {
            console.log("Error fetching project data: ", error);
          },
        });
      }
    }
    if (
      (listkey == "initiativedeliverables" || listkey == "initiativemilestones") &&
      (isEdit || isNew)
    ) {
      if (typeof UserICode !== "undefined" && UserICode) {
        $.ajax({
          url: "/_api/web/lists/getbytitle('Initiatives')/items",
          type: "GET",
          data: {
            $select: "Title,IsZeroBudgetInitiative",
            $filter: "Title eq '" + UserICode + "'",
          },
          headers: {
            Accept: "application/json;odata=verbose",
          },
          success: function (data) {
            if (data.d.results.length > 0) {
              var initiative = data.d.results[0];
              if (
                initiative.IsZeroBudgetInitiative &&
                initiative.IsZeroBudgetInitiative.toLowerCase() === "yes"
              ) {
                hideBudgetFields();
              }
            }
          },
          error: function (error) {
            console.log("Error fetching initiative data: ", error);
          },
        });
      }
    }
    function hideBudgetFields() {
      var fields = ["#Weight", "#Amount", "#Quantity", "#AmountPrice","#InvoiceNumber" , "#InvoiceDate"];
      $.each(fields, function (i, f) {
        $(f).hide(); // hide the input
        $(f).closest(".CFIELD").addClass("hide-field").css("display", "none");  // add hide-field to container
      });
    }
    
    // if (!isCrMode && crListKey) {
    //   //on new custom cr
    //   handleCustomeCr.init();
    //   $(
    //     "div#particles-foreground, div#particles-background, .vertical-centered-box"
    //   ).animate(
    //     {
    //       opacity: 0,
    //     },
    //     {
    //       duration: 333,
    //       complete: function () {
    //         $(
    //           "div#particles-foreground, div#particles-background, .vertical-centered-box"
    //         ).remove();

    //         // $('div#particles-foreground, div#particles-background, .vertical-centered-box').hide();
    //       },
    //     }
    //   );
    // } else {
    //   $(
    //     "div#particles-foreground, div#particles-background, .vertical-centered-box"
    //   ).animate(
    //     {
    //       opacity: 0,
    //     },
    //     {
    //       duration: 333,
    //       complete: function () {
    //         $(
    //           "div#particles-foreground, div#particles-background, .vertical-centered-box"
    //         ).remove();

    //         // $('div#particles-foreground, div#particles-background, .vertical-centered-box').hide();
    //       },
    //     }
    //   );
    // }
    //return htmlBody;
   
  
  },
  g: {
    htmlText: "",
    htmlElement: "",
    uniqueMasterDetailRadioNames: function ($scope) {
      var $rows;
      if ($scope && $scope.length) {
        $rows = $scope.hasClass("Details-Item")
          ? $scope
          : $scope.find(".Details-Item");
        if (!$rows.length) {
          $rows = $scope.closest(".Details-Item");
        }
      } else {
        $rows = $("[data-target_list] .Details-Item");
      }
      $rows.each(function (rowIndex) {
        var $row = $(this);
        var listName =
          $row.closest("[data-target_list]").attr("data-target_list") ||
          "master";
        var rowKey =
          $row.attr("data-id") ||
          $row.data("id") ||
          $row.attr("data-index") ||
          String(rowIndex);
        $row.find("input[type=radio]").each(function () {
          var fieldId = $(this).attr("id") || "radio";
          $(this).attr("name", listName + "_" + fieldId + "_" + rowKey);
        });
      });
    },
    // Fill master-details RelatedInitiativeDeliverable from RelatedInitiative (needed on New — no PCODE yet)
    fillMasterRelatedInitiativeDeliverable: function (initiativeCode) {
      var $fields = $(
        '[data-target_list="Deliverables"] select[id="RelatedInitiativeDeliverable"]'
      );
      if (!$fields.length) return;
      var placeholder =
        $fields.first().attr("placeholder") ||
        $fields.first().find("option:first").text() ||
        "";
      if (!initiativeCode) {
        $fields.each(function () {
          var currentVal =
            $(this).val() ||
            $(this).attr("data-saved-value") ||
            $(this).attr("data-lookup-value") ||
            "";
          $(this).html(
            '<option value="" selected disabled>' + placeholder + "</option>"
          );
          if (currentVal) {
            $(this).attr("data-saved-value", currentVal);
            $(this).attr("data-lookup-value", currentVal);
          }
        });
        return;
      }
      var customQuery =
        "<View><Query><Where><Eq><FieldRef Name='InitiativeCode' /><Value Type='Text'>" +
        initiativeCode +
        "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
      sphttp.get(
        _spPageContextInfo.siteServerRelativeUrl,
        "InitiativeDeliverables",
        customQuery,
        ["Title", "Name"],
        function (records, record, listItem, isDone) {
          if (!isDone) return;
          var html =
          '<option value="">' + placeholder + "</option>";
          (records || []).forEach(function (el) {
            html +=
              '<option value="' + el.Title + '">' + el.Name + "</option>";
          });
          $fields.each(function () {
            var $select = $(this);
            var currentVal =
              $select.val() ||
              $select.attr("data-saved-value") ||
              $select.attr("data-lookup-value") ||
              "";
            $select.html(html);
            if (currentVal) {
              $select.val(currentVal);
              $select.attr("data-saved-value", currentVal);
              $select.attr("data-lookup-value", currentVal);
              $select.attr("value", currentVal);
            }
          });
        }
      );
    },
    pcodeval: function () {
      // not allow spaces and special characters
      $("input.NoSpChar").on("input", function () {
        var c = this.selectionStart,
          r = /[^a-z0-9]/gi,
          v = $(this).val();
        if (r.test(v)) {
          $(this).val(v.replace(r, ""));
          c--;
        }
        this.setSelectionRange(c, c);
      });
    },
    newDetail: function () {
      //to check the length of new master
      var masterLength = 0;

      //pluss
      $("[data-target_list] .fieldset-container").append(
        '<div class="add-New-Detail-wrapper"><a class="add-New-Detail" href="javascript:"><i class="fas fa-plus"></i></a><a class="remove-New-Detail" href="javascript:"><i class="fas fa-minus"></i></a></div>'
      );

      $(".add-New-Detail").on("click", function () {
        //check if there is a required field not filled (to stop add master section if there is a required field not filled)
        var stopAdd = false;
        var nameValueOfMasterItem = true;
        $(this)
          .parent()
          .parent()
          .children(".Details-Item")
          .each(function () {
            var requiredArr = $(this).find(
              "input[required],div[type=picker],textarea[required],select[required]"
            );

            requiredArr.each(function () {
              var checkType = $(this).attr("type");

              var val = "";
              if (checkType == "picker") {
                if (isNew && listkey != "changerequest") {
                  // var checkLabelRequired = $(this).parent().find('label').attr("required")
                  // if (checkLabelRequired) {
                  // var noPickerVal = $(this).find("span.sp-peoplepicker-userSpan").length == 0
                  // if (!noPickerVal) {
                  val = "picker";
                  // }
                  // }
                } else if (isEdit || listkey == "changerequest") {
                  val = "picker";
                  // debugger
                  // var checkLabelRequired = $(this).parent().find('label').attr("required")
                  // if (checkLabelRequired || checkLabelRequired == undefined) {
                  //   var noPickerVal = $(this).find("span.sp-peoplepicker-userSpan").length == 0 && (($(this).attr('data-email') == enternameemail) || !$(this).attr('data-email'))
                  //   if (!noPickerVal) {
                  //     val = "picker"
                  //   }
                  // }
                }
              } else {
                val = $(this).val();
              }
              if (!val) {
                stopAdd = true;
              }
            });
            // handle required multi select
            var multiSelectRequired = $(this).find(
              ".dropdown-menu.multiselect_scroll.required"
            ).length;
            if (multiSelectRequired > 0) {
              if (
                $(this).find(
                  ".dropdown-menu.multiselect_scroll.required :checkbox:checked"
                ).length == 0
              ) {
                stopAdd = true;
              }
            }
            // check if there is Name in master section Benefits

            if (
              $(this).closest("[data-target_list]").data("target_list") ==
              "Benefits"
            ) {
              if (
                $(this)
                  .closest("[data-target_list]")
                  .find(".Details-Item")
                  .last()
                  .hasClass("firstMasterEmpty")
              ) {
                console.log("first section");
              } else {
                nameValueOfMasterItem = $(this)
                  .closest("[data-target_list]")
                  .find(".Details-Item")
                  .last()
                  .find("input#Name")
                  .val()
                  ? true
                  : false;
              }
              if (!nameValueOfMasterItem) {
                stopAdd = true;
              }
            }
          });

        if (stopAdd) {
          var stoperMsg = "";
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            stoperMsg =
              "يجب تعبئة الاسم و التأكد من الحقول الازامية قبل الاضافة";
          } else {
            stoperMsg =
              "You Should fill the name and check the required fields before add";
          }
          var masterErr = $(this).parent().find(".master_section_err").length;
          if (masterErr == 0) {
            $(this)
              .parent()
              .append(
                '<span class="master_section_err">' + stoperMsg + "</span>"
              );
          }
        } else {
          // continue function normally
          var masterErr = $(this).parent().find(".master_section_err").length;
          if (masterErr > 0) {
            $(this).parent().find(".master_section_err").remove();
          }

          // to handle the index on master details
          var $masterSection = $(this).closest("[data-target_list]");
          var getMasterIndex = window.getNextMasterDetailIndex
            ? window.getNextMasterDetailIndex($masterSection)
            : 1;

          // add class to hide first master details if there is no data like benefits
          var firstMasterClass = $masterSection
            .find(".Details-Item.NewItem")
            .last()
            .hasClass("firstMasterEmpty");

            if (
              firstMasterClass &&
              $masterSection.find(".Details-Item.EditItem").length === 0 &&
              $masterSection.find(".Details-Item.NewItem:not(.firstMasterEmpty)")
                .length === 0
            ) {
              getMasterIndex = 1;
          }

          if ((listkey == "projects" || listkey == "initiatives") && isNew) {
            var lastDetailsItemBeforeAdd = $(this)
              .closest("[data-target_list]")
              .find(".Details-Item")
              .last();
            lastDetailsItemBeforeAdd.addClass("disable_section");
          } else if (
            listkey == "changerequest" &&
            (RListKey == "projects" || RListKey == "initiatives")
          ) {
            var lastDetailsItemBeforeAdd = $(this)
              .closest("[data-target_list]")
              .find(".Details-Item.NewItem")
              .last();
            if (lastDetailsItemBeforeAdd.length == 0) {
              var onLoadMaster = $(this)
                .closest("[data-target_list]")
                .find(".Details-Item.EditItem");
              if (onLoadMaster.length) {
                onLoadMaster.each(function () {
                  $(this).addClass("disable_section");
                });
              }
            } else {
              lastDetailsItemBeforeAdd.addClass("disable_section");
            }
          } else if (
            (listkey == "projects" || listkey == "initiatives") &&
            isEdit
          ) {
            var lastDetailsItemBeforeAdd = $(this)
              .closest("[data-target_list]")
              .find(".Details-Item.NewItem")
              .last();
            if (lastDetailsItemBeforeAdd.length == 0) {
              var onLoadMaster = $(this)
                .closest("[data-target_list]")
                .find(".Details-Item.EditItem");
              if (onLoadMaster.length) {
                onLoadMaster.each(function () {
                  $(this).addClass("disable_section");
                });
              }
            } else {
              lastDetailsItemBeforeAdd.addClass("disable_section");
            }
          }

          var totalWeight = 0;

          $(this)
            .parent()
            .parent()
            .children(".Details-Item")
            .each(function () {
              var value = $(this).find(".weightfloatpercentage").val();
              value = value ? value : 0;
              totalWeight += Number(value);
            });

          //$('.add-New-Detail').closest("[data-target_list]").find(".Details-Item:first-child")

          var toappend = $(this)
            .closest("[data-target_list]")
            .find(".Details-Item:first-child")
            .html()
            .toString(); //.replaceAll('value', 'value=""');

          //

          $(
            '<div class="Details-Item NewItem" data-index="' +
              getMasterIndex +
              '">' +
              toappend +
              "</div>"
          ).insertBefore($(this).parent());
          if (ListInfo.g.uniqueMasterDetailRadioNames) {
            ListInfo.g.uniqueMasterDetailRadioNames(
              $(this)
                .closest("[data-target_list]")
                .find(".Details-Item.NewItem")
                .last()
            );
          }

          // to handle attachement in master details for proj and initiative like deliv and milst

          if ((listkey == "initiatives" || listkey == "projects") && isNew) {
            //to remove the attach from first section
            $("input[type=file]").trigger("change");
            $(this)
              .closest("[data-target_list]")
              .find(".Details-Item .CFIELD >input[type=file]")
              .last()
              .parent()
              .find(".attachfilename")
              .html("");
            //
            var lastListDetails = $(this)
              .closest("[data-target_list]")
              .data("target_list");

            // to add many attach in master details
            $(this)
              .closest("[data-target_list]")
              .find(".Details-Item .CFIELD >input[type=file]")
              .last()
              .attr("id", `getFile${lastListDetails}-${getMasterIndex}`);

            $(this)
              .closest("[data-target_list]")
              .find(".Details-Item .CFIELD >input[type=file]")
              .last()
              .parent()
              .find("#chooseFile")
              .attr("for", `getFile${lastListDetails}-${getMasterIndex}`);
          }
          // var fileId = "getFile" + attachCount;

          // to hide the err msg when click  on plus

          $(this)
            .closest("[data-target_list]")
            .find(".Details-Item .errMsgField")
            .last()
            .hide();

          // insert new max for weight deliv
          var lastDetailsItem = $(this)
            .closest("[data-target_list]")
            .find(".Details-Item")
            .last();
          lastDetailsItem
            .find(".remainpercstyle.remainPercentageVal")
            .html(`${100 - totalWeight}]`); // add new title weight
          lastDetailsItem
            .find(".weightfloatpercentage")
            .attr("max", 100 - totalWeight); // add new max weight
          //

          masterLength = $(this)
            .closest("[data-target_list]")
            .find(".Details-Item.NewItem").length;

          // to remove the disabled on multi select when click plus in master filed of master details section like deliv in benefit in edit initiative
          $(this)
            .closest("[data-target_list]")
            .find(".Details-Item.NewItem")
            .last()
            .find("ul[data-fieldtargetlist]")
            .find("input:checkbox")
            .each(function () {
              $(this).attr("disabled", false);
            });

          if (isNew && listkey == "changerequest") {
            if (masterLength > 0) {
              $(this)
                .closest("[data-target_list]")
                .find(".remove-New-Detail")
                .show();
            }
          } else if (isNew) {
            // in new > 1 because on render the form there is a new Item so it will be  before click on +
            if (masterLength > 1) {
              $(this)
                .closest("[data-target_list]")
                .find(".remove-New-Detail")
                .show();
            }
          } else if (isEdit) {
            // in edit > 0 because on render the form there is no new Item till will click on +
            if (masterLength > 0) {
              $(this)
                .closest("[data-target_list]")
                .find(".remove-New-Detail")
                .show();
            }
          }

          var myPPicker = [];
          $(this)
            .closest(".fieldset-container")
            .find(".Details-Item.NewItem")
            .last()
            .find(".PPField")
            .each(function () {
              $(
                '<div class="PPField SPIField form-control" type="picker" id="' +
                  $(this).attr("id") +
                  "+++" +
                  Math.floor(Math.random() * 1000000) +
                  '" value="" placeholder="' +
                  $(this).attr("placeholder") +
                  '" INppicker="' +
                  $(this).attr("id") +
                  "+++" +
                  Math.floor(Math.random() * 1000000) +
                  '"></div>'
              ).insertBefore($(this));
              $(this).remove();
            });
          // $(this).closest('.fieldset-container').append('<div class="Details-Item NewItem">'+toappend+'</div>');
          $(this)
            .closest(".fieldset-container")
            .find(".Details-Item.NewItem")
            .last()
            .find("div[type=picker]")
            .each(function () {
              var mp = new MyPeoplePicker();
              mp.init($(this).attr("id"), {
                PrincipalAccountType: "User",
                AllowMultipleValues: false,
              });
              $(this)
                .find(".sp-peoplepicker-initialHelpText")
                .text("ادخل الإسم أو البريد الإلكتروني ...");
            });

          if (listkey == "changerequest" && (isNew || isEdit)) {
            // add in master arry when click on plus
            Add_New_CRMaster.init(getMasterIndex);
          }
        }
      });

      // remove new section
      $(".remove-New-Detail").on("click", function () {
        if (listkey == "changerequest" && (isNew || isEdit)) {
          // remove from master array when click on minus
          var lastIndex = $(this)
            .closest("[data-target_list]")
            .find(".Details-Item.NewItem")
            .last()
            .data("index");
          Remove_New_CRMaster.init(lastIndex);
        }

        masterLength = $(this)
          .closest("[data-target_list]")
          .find(".Details-Item.NewItem").length;
        // firstMasterEmpty
        // var firstMasterClass = ''
        // firstMasterClass = $(this).closest("[data-target_list]").find(".Details-Item.NewItem").first().hasClass('firstMasterEmpty')
        // debugger

        if (isNew && listkey == "changerequest") {
          if (masterLength > 0) {
            masterLength = masterLength - 1;
            $(this)
              .closest("[data-target_list]")
              .find(".Details-Item.NewItem")
              [masterLength].remove();
          }
        } else if (isNew) {
          // in new > 1 because on render the form there is a new Item so it will be  before click on +
          if (masterLength > 1) {
            masterLength = masterLength - 1;
            $(this)
              .closest("[data-target_list]")
              .find(".Details-Item.NewItem")
              [masterLength].remove();
          }
        } else if (isEdit) {
          // in edit > 0 because on render the form there is no new Item till will click on +
          if (masterLength > 0) {
            masterLength = masterLength - 1;
            $(this)
              .closest("[data-target_list]")
              .find(".Details-Item.NewItem")
              [masterLength].remove();
          }
        }

        if (isNew && listkey == "changerequest") {
          // add firstMasterEmpty to remove the - in first master details if there is no data like benefits
          if (
            masterLength == 0 ||
            $(this)
              .closest("[data-target_list]")
              .find(".Details-Item.NewItem")
              .last()
              .hasClass("firstMasterEmpty")
          ) {
            // to return the form as rendered
            $(this)
              .closest("[data-target_list]")
              .find(".remove-New-Detail")
              .hide();
          }
        } else if (isNew) {
          if (masterLength == 1) {
            // to return the form as rendered
            $(this)
              .closest("[data-target_list]")
              .find(".remove-New-Detail")
              .hide();
          }
        } else if (isEdit) {
          if (masterLength == 0) {
            // to return the form as rendered
            $(this)
              .closest("[data-target_list]")
              .find(".remove-New-Detail")
              .hide();
          }
        }

        //to remeove disabled class on the last section
        if ((listkey == "projects" || listkey == "initiatives") && isNew) {
          var lastDetailsItemAfterRemove = $(this)
            .closest("[data-target_list]")
            .find(".Details-Item")
            .last();
          lastDetailsItemAfterRemove.removeClass("disable_section");
        } else if (
          listkey == "changerequest" &&
          (RListKey == "projects" || RListKey == "initiatives")
        ) {
          var lastDetailsItemBeforeAdd = $(this)
            .closest("[data-target_list]")
            .find(".Details-Item.NewItem")
            .last();
          if (lastDetailsItemBeforeAdd.length == 0) {
            var onLoadMaster = $(this)
              .closest("[data-target_list]")
              .find(".Details-Item.EditItem");
            if (onLoadMaster.length) {
              onLoadMaster.each(function () {
                $(this).removeClass("disable_section");
              });
            }
          } else {
            lastDetailsItemBeforeAdd.removeClass("disable_section");
          }
        } else if (
          (listkey == "projects" || listkey == "initiatives") &&
          isEdit
        ) {
          var lastDetailsItemBeforeAdd = $(this)
            .closest("[data-target_list]")
            .find(".Details-Item.NewItem")
            .last();
          if (lastDetailsItemBeforeAdd.length == 0) {
            var onLoadMaster = $(this)
              .closest("[data-target_list]")
              .find(".Details-Item.EditItem");
            if (onLoadMaster.length) {
              onLoadMaster.each(function () {
                $(this).removeClass("disable_section");
              });
            }
          } else {
            lastDetailsItemBeforeAdd.removeClass("disable_section");
          }
        }
        //
      });

      //

      // $('.add-New-Detail').click(function()
      // {
      //     var toappend =  $(this).closest('[data-target_list]').find('.Details-Item').html().toString().replace('value', 'value=""');
      //     $('<div class="Details-Item NewItem">'+toappend+'</div>').insertBefore( $(this).parent() );
      //     // $(this).closest('.fieldset-container').append('<div class="Details-Item NewItem">'+toappend+'</div>');
      // });
      if (listkey == "projectcharter" && PCODE && isEdit) {
        // to remove the pluse btn in project chart on initiative section
        $(
          "[data-target_list='Initiatives'] .fieldset-container .add-New-Detail-wrapper"
        ).css("display", "none");
      }
    },
    attachmentsExtensions: function () {
      $(".AttErrorMsg").hide();

      if (typeof acceptedExtensions == "string") {
        acceptedExtensions = acceptedExtensions.split(",");
      }
      window.acceptedExtensionsstr = acceptedExtensions.toString();

      // Maximum file size in bytes (5MB = 5 * 1024 * 1024 bytes)
      const maxFileSize = 5 * 1024 * 1024;

      $("input[type=file]").each(function (e) {
        $(this)
          .parent()
          .find(".acceptedfile")
          .append("" + acceptedExtensionsstr + ",");
      });

      // $("input[type=file]").on("change", function (e) {
      $("body").on("change", "input[type=file]", function (e) {
        const fileChosen = $(this).parent().find("#file-chosen");

        $(this).parent().find(".AttErrorMsg").hide();
        validattachments = [];
        window.files = document.querySelector("#" + $(this).attr("id")).files;
        let hasInvalidFiles = false;
        let oversizedFiles = [];

        for (var i = 0; i < files.length; i++) {
          const file = files[i];
          const fileExtension = "" + file.name.split(".").pop();
          
          // Check file size first (5MB = 5 * 1024 * 1024 bytes)
          if (file.size > 5 * 1024 * 1024) {
            oversizedFiles.push(file.name);
            hasInvalidFiles = true;
            continue;
          }

          // Check file extension
          if (acceptedExtensions.indexOf(fileExtension.toLowerCase()) > -1) {
            validattachments.push(file);
            if (
              (listkey == "projectcharter" && PCODE) ||
              (listkey == "initiativecards" && ICODE)
            ) {
              // to handle integration base64
              getBase64(file);
            }
          } else {
            $(this)
              .parent()
              .find(".notacceptedext")
              .append("" + fileExtension + ",");
            $(this).parent().find(".AttErrorMsg").show();
            $(this).parent().find(".attErrorMsg").addClass("redColor");
            hasInvalidFiles = true;
          }
        }

        // Show alert for oversized files
        if (oversizedFiles.length > 0) {
          const fileNames = oversizedFiles.join(', ');
          const currentLang = localStorage.getItem("lng") || 'ar';
          let alertMessage = '';
          
          if (currentLang === 'ar') {
            alertMessage = `تم تجاوز حجم الملف! الملفات التالية أكبر من 5 ميجابايت ولا يمكن رفعها:\n${fileNames}`;
          } else {
            alertMessage = `File size exceeded! The following files are larger than 5MB and cannot be uploaded:\n${fileNames}`;
          }
          
          alert(alertMessage);
          
          // Clear the input value to remove all files
          $(this).val('');
          validattachments = [];
          
          // Hide the integration save button if applicable
          if (
            (listkey == "projectcharter" && PCODE) ||
            (listkey == "initiativecards" && ICODE)
          ) {
            $(".integration-save").css({
              "pointer-events": "none",
              opacity: "0.6",
            });
          }
          
          // Show the "no file" message
          $(this).parent().find("#nofile").show();
          fileChosen.html("");
          return;
        }

        // If there are invalid files (extension issues), clear input
        if (hasInvalidFiles && validattachments.length === 0) {
          $(this).val('');
          $(this).parent().find("#nofile").show();
          fileChosen.html("");
          return;
        }

        if (validattachments.length > 0) {
          if (
            (listkey == "projectcharter" && PCODE) ||
            (listkey == "initiativecards" && ICODE)
          ) {
            // to handle integration btn
            $(".integration-save").css({
              "pointer-events": "unset",
              opacity: "1",
            });
          }
          $(this).parent().find("#nofile").hide();
          fileChosen.html("");
        }
        
        for (var i = 0; i < validattachments.length; i++) {
          fileChosen.append(
            "<span class='attachfilename'><i class='fas fa-file'></i><span>" +
              validattachments[i].name +
              "</span><button type='button' class='removeAttchment'><i class='fas fa-times'></i></button></span>"
          );
        }

        //to remove attached file
        $(".removeAttchment")
          .unbind()
          .on("click", function () {
            var getInputId = $(this)
              .parent()
              .parent()
              .parent()
              .find("input")
              .attr("id"); // to get the specific id of attach when remove attach

            if (
              (listkey == "projectcharter" && PCODE) ||
              (listkey == "initiativecards" && ICODE)
            ) {
              // to handle integration btn
              $(".integration-save").css({
                "pointer-events": "none",
                opacity: "0.6",
              });
            }

            var fileindex = $(this).index(); // -2  git index 2 cause it's on index two of html elem

            validattachments.splice(fileindex, 1);
            $(this).parent().remove();
            window.AllFileCount = AllFileCount - 1;

            document.querySelector("#" + getInputId).value = ""; // to remove the value(files) of specific attachement.
          });
      });

      $(".add-New-Attach").click(function () {
        var pluseAttachTitle = "";
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          pluseAttachTitle = "المرفقات";
        } else {
          pluseAttachTitle = "Attachments";
        }

        //check if have docpurpose to save it in doc library
        var checkFilePurpose = "";
        var filePurposeData = "";
        if (
          $(this).parent().parent().find("input[data-docpurpose]").length > 0
        ) {
          filePurposeData = $(this)
            .parent()
            .parent()
            .find("input[data-docpurpose]")
            .data("docpurpose");
          checkFilePurpose = `data-docpurpose=${filePurposeData}`;
        }
        //

        // var fileId = "getFile" + pluseAttachCount;
        var fileId = "getFile" + attachCount;

        $(
          '<div class="col-md-12 CFIELD" data-groups="" >' + //style="display: flex;align-items: center;"
            '<label class="attlabel" for="getFile"  undefined="">' +
            pluseAttachTitle +
            "</label>" + //class="custom-file-upload"
            "<input " +
            checkFilePurpose +
            ' type="file" accept="' +
            acceptedExtensions +
            '" hidden multiple="multiple" placeholder="' +
            pluseAttachTitle +
            '" class="form-control SPIField" id="' +
            fileId +
            '" >' +
            '<label data-trans-choosefile id="chooseFile" for="' +
            fileId +
            '" class="Resources"></label>' +
            '<span id="file-chosen"><span data-trans-nofile id="nofile" class="Resources"></span></span>' +
            '<div class="AttErrorMsg attErrorMsg" style="display:none"><span data-trans-file class="Resources"></span><span class="notacceptedext"></span><span data-trans-notallowed class="Resources"></span></div>' +
            '<div class="attErrorMsg"><span data-trans-acceptedfiles class="Resources"></span><span class="acceptedfile"></span></div>' +
            '<div class="attErrorMsg"><span data-trans-fileSize class="Resources">Maximum file size: 5MB</span></div>' +
            '<div class="col-md-6 CFIELD" data-groups="" style="visibility:hidden">' +
            '<label for="forattach">Attachments</label>' +
            "</div>" +
            "</div>"
        ).insertBefore($(this).parent());

        $("#" + fileId)
          .parent()
          .find(".acceptedfile")
          .append("" + acceptedExtensionsstr + ",");

        // pluseAttachCount = pluseAttachCount + 1;
        attachCount = attachCount + 1;
        changeResources();
      });
    },
    budgetitem: function () {
      $("#From, #To").on("change", function () {
        var yearFrom = $("#From").val() ? $("#From").val().split("-")[0] : "",
          dateFromFull = $("#From").val(),
          yearTo = $("#To").val() ? $("#To").val().split("-")[0] : "";
        var yearDiff = yearTo ? parseInt(yearTo) - parseInt(yearFrom) + 1 : "";
        yearFrom = parseInt(yearFrom) + 4;
        if (yearFrom) {
          $("#To")
            .attr("max", String(yearFrom) + "-12-31")
            .attr("min", dateFromFull)
            .prop("disabled", false);
          if (yearDiff) {
            $("[id^=Cost]").parent().hide();
            $("[id^=Cost]").val("");
            $("#Amount").val("");
            var yeartodisp;
            for (var i = 1; i <= yearDiff; i++) {
              yeartodisp = yearFrom - 5 + i;
              $("#Cost" + i)
                .parent()
                .show();
              if (
                localStorage.getItem("lng") == null ||
                localStorage.getItem("lng") == "ar"
              ) {
                var label =
                  $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text()
                    .indexOf("لعام") > -1
                    ? $("#Cost" + i)
                        .parent()
                        .find("label")
                        .text()
                        .split("لعام")[0] +
                      " لعام " +
                      yeartodisp
                    : $("#Cost" + i)
                        .parent()
                        .find("label")
                        .text() +
                      " لعام " +
                      yeartodisp;
              } else {
                var label =
                  $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text()
                    .indexOf("For Year") > -1
                    ? $("#Cost" + i)
                        .parent()
                        .find("label")
                        .text()
                        .split("For Year")[0] +
                      " For Year " +
                      yeartodisp
                    : $("#Cost" + i)
                        .parent()
                        .find("label")
                        .text() +
                      " For Year " +
                      yeartodisp;
              }
              $("#Cost" + i)
                .parent()
                .find("label")
                .text(label);
            }
          }
        } else {
          $("#To")
            .val("")
            .attr("max", "")
            .attr("min", "")
            .prop("disabled", true);
          $("[id^=Cost]").parent().hide();
          $("[id^=Cost]").val("");
          $("#Amount").val("");
        }
      });
    },
    // InvoicesTotal: function () {
    //   // $('#Amount, #TVA').on("change", function () {
    //   //   var amount = $('#Amount').val() ? parseInt(($('#Amount').val()).replaceAll(',', '')) : 0;
    //   //   var TVA = $('#TVA').val() ? parseInt(($('#TVA').val()).replaceAll(',', '')) : 0;
    //   //   var Sum = amount + ((TVA * amount) / 100);
    //   //   $('#TotalAmount').val(Sum);
    //   // });
    //   $("#TotalAmount").on("change", function () {
    //     var totalAmount = $("#TotalAmount").val()
    //       ? parseInt($("#TotalAmount").val().replaceAll(",", ""))
    //       : 0;
    //     var amount = Number((totalAmount / 1.15).toFixed("2"));
    //     var tax = Number((totalAmount - amount).toFixed("2"));

    //     $("#Amount").val(amount);
    //     $("#TVA").val(tax);

    //     // var TVA = $('#TVA').val() ? parseInt(($('#TVA').val()).replaceAll(',', '')) : 0;
    //     // var Sum = amount + ((TVA * amount) / 100);
    //     // $('#TotalAmount').val(Sum);
    //   });
    // },
    DeliverablesDelivered: function () {
    
      var Delivered = $("#Delivered:checked").val();
      if (Delivered == "yes") {
        $("#DeliveredDate").attr("required", "required");
        $("#DeliveredDate").parent().attr("required", "required");
        $("#DeliveredDate").prev("label").attr("required", "required");
      }
      $(".radioLabelField").change(function () {
        var Delivered = $("#Delivered:checked").val();
        if (Delivered == "yes") {
          $("#DeliveredDate").attr("disabled", false);
          $("#DeliveredDate").attr("required", "required");
          $("#DeliveredDate").parent().attr("required", "required");
          $("#DeliveredDate").prev("label").attr("required", "required");
        } else {
          $("#DeliveredDate").val("");
          $("#DeliveredDate").attr("disabled", true);
          $("#DeliveredDate").removeAttr("required");
          $("#DeliveredDate").parent().removeAttr("required");
          $("#DeliveredDate").prev("label").removeAttr("required");
        }
      });
    },
    requiredSpillarsName: function () {
      var PillarsExist = $("#PillarsExist:checked").val();

      if (PillarsExist == "yes") {
        $('[data-target_list="SPillars"] #Name').attr("required", "required");
        $('[data-target_list="SPillars"] #Name')
          .parent()
          .attr("required", "required");
        $('[data-target_list="SPillars"] #Name')
          .prev("label")
          .attr("required", "required");
      } else {
        $('[data-target_list="SPillars"] #Name').prop("required", false);
      }
      $("input#PillarsExist").on("change", function () {
        var PillarsExist = $("#PillarsExist:checked").val();
        if (PillarsExist == "yes") {
          $('[data-target_list="SPillars"] #Name').attr("required", "required");
          $('[data-target_list="SPillars"] #Name')
            .parent()
            .attr("required", "required");
          $('[data-target_list="SPillars"] #Name')
            .prev("label")
            .attr("required", "required");
        } else {
          $('[data-target_list="SPillars"] #Name').prop("required", false);
        }
      });
    },

    clearSelectFieldValue: function ($field) {
      if (!$field || !$field.length) {
        return;
      }
      var fieldId = $field.attr("id");
      if ($field.is("select")) {
        $field.find("option").prop("selected", false);
        $field.find('option[value=""]').prop("selected", true);
      }
      $field.val("");
      $field.removeAttr("value");
      $field.removeAttr("data-lookup-value");
      if (window.editLookupValues && fieldId) {
        delete window.editLookupValues[fieldId];
      }
    },

    selectHasOptionValue: function ($field, value) {
      if (!$field || !$field.length || value == null || value === "") {
        return false;
      }
      var normalizedValue = String(value).toLowerCase();
      var found = false;
      $field.find("option").each(function () {
        var optionVal = $(this).attr("value");
        if (
          optionVal != null &&
          optionVal !== "" &&
          String(optionVal).toLowerCase() === normalizedValue
        ) {
          found = true;
          return false;
        }
      });
      return found;
    },

    setSelectFieldValue: function ($field, value, options) {
      if (!$field || !$field.length || value == null || value === "") {
        return "";
      }
      options = options || {};
      // Default true: edit load / disabled security fields may need a temporary option.
      // Cascaded lookup refresh must pass { createIfMissing: false }.
      var createIfMissing = options.createIfMissing !== false;
      var normalizedValue = String(value);
      $field.attr("value", normalizedValue);
      if ($field.is("select")) {
        $field.find('option[value=""]').prop("disabled", true);
        $field.find("option").not('[value=""]').prop("disabled", false);
      }
      var $matchedOption = $field.find(
        'option[value="' + normalizedValue.replace(/"/g, '\\"') + '"]'
      );
      if (!$matchedOption.length) {
        $field.find("option").each(function () {
          var optionVal = $(this).attr("value");
          if (
            optionVal != null &&
            String(optionVal).toLowerCase() === normalizedValue.toLowerCase()
          ) {
            $matchedOption = $(this);
            normalizedValue = String(optionVal);
            return false;
          }
        });
      }
      $field.find("option").prop("selected", false);
      if ($matchedOption.length) {
        $matchedOption.prop("selected", true);
      } else if ($field.is("select") && createIfMissing) {
        $field.append(
          $("<option>", {
            value: normalizedValue,
            text: normalizedValue,
            selected: true,
          })
        );
      } else {
        ListInfo.g.clearSelectFieldValue($field);
        return "";
      }
      $field.val(normalizedValue);
      $field.attr("data-lookup-value", normalizedValue);
      return normalizedValue;
    },

    syncLookupSelectValues: function ($scope) {
      var $fields = $scope
        ? $scope.filter("select[type=dropdown]")
        : $("select[type=dropdown]");
      $fields.each(function () {
        var $field = $(this);
        var fieldId = $field.attr("id");
        var stored =
          $field.attr("data-lookup-value") ||
          $field.attr("value") ||
          (window.editLookupValues && window.editLookupValues[fieldId]) ||
          "";
        if (!stored) {
          var currentVal = $field.val();
          if (currentVal) {
            $field.attr("value", currentVal);
            $field.attr("data-lookup-value", currentVal);
          }
          return;
        }
        if ($field.is("select")) {
          $field.find('option[value=""]').prop("disabled", true);
          $field.find("option").not('[value=""]').prop("disabled", false);
        }
        if (!$field.val()) {
          var optionExists = ListInfo.g.selectHasOptionValue($field, stored);
          if (optionExists) {
            ListInfo.g.setSelectFieldValue($field, stored, {
              createIfMissing: false,
            });
          } else if ($field.prop("disabled")) {
            // Keep disabled security lookups selectable for .val()/submit.
            ListInfo.g.setSelectFieldValue($field, stored, {
              createIfMissing: true,
            });
          }
          // Enabled + missing option: do nothing — cascade handles restore/clear.
        } else if (!$field.attr("data-lookup-value")) {
          $field.attr("data-lookup-value", $field.val());
          $field.attr("value", $field.val());
        }
      });
    },

    getEffectiveFieldValue: function ($field) {
      if (!$field || !$field.length) {
        return "";
      }
      if (isView) {
        return (
          $field.data("viewtogglevalue") ||
          $field.text().trim() ||
          ""
        );
      }
      var val = $field.val();
      if (val != null && val !== "") {
        return val;
      }
      var attrVal = $field.attr("value");
      if (attrVal != null && attrVal !== "") {
        return attrVal;
      }
      var lookupVal = $field.attr("data-lookup-value");
      if (lookupVal != null && lookupVal !== "") {
        return lookupVal;
      }
      var fieldId = $field.attr("id");
      if (
        fieldId === "KPIType" &&
        typeof kpiTypeValue !== "undefined" &&
        kpiTypeValue
      ) {
        return kpiTypeValue;
      }
      if (
        fieldId === "RelatedStrategyObjective" &&
        typeof relatedMainGoal !== "undefined" &&
        relatedMainGoal
      ) {
        return relatedMainGoal;
      }
      var selectedVal = $field.find("option:selected").val();
      if (selectedVal != null && selectedVal !== "") {
        return selectedVal;
      }
      return "";
    },

    toggleFields: function ($this) {
      var myValue = ListInfo.g.getEffectiveFieldValue($this);
      if (!isView && myValue && $this.is("select") && !$this.val()) {
        ListInfo.g.setSelectFieldValue($this, myValue);
      }

      // $("#IsStrategicProject").on('change', function (){
      //   if(listkey == 'projects'){
      //     if($(this).val() == 'no'){
      //         $('#InitiativeType').val('')
      //         $('#InitiativeType option:selected').removeAttr('selected');
      //         $('#RelatedInitiative').val('')
      //         $('#RelatedInitiative option:selected').removeAttr('selected');
      //         $('#RelatedInitiativeDeliverable').val('')
      //         $('#RelatedInitiativeDeliverable option:selected').removeAttr('selected');


      //       }
      //     }
      //   });
      var mytype = $this,
        toggleValues =
          $this.data("togglevalues").indexOf(":::") > -1
            ? $this.data("togglevalues").split(":::")
            : [$this.data("togglevalues")],
        toggleValues = toggleValues.filter(function (t) {
          return t.indexOf(myValue + "[") > -1;
        }),
        toggleFields =
          toggleValues.length > 0
            ? toggleValues[0].match(/\[(.*?)\]/)[1].split(",")
            : "",
        isShowVal = toggleValues.length > 0,
        allToggleFields =
          $this.data("togglevalues").indexOf(":::") > -1
            ? $this.data("togglevalues").split(":::")
            : [$this.data("togglevalues")],
        myToggleFields = "";


      allToggleFields.forEach((item, i, arr) => {
        myToggleFields +=
          i == arr.length - 1
            ? item.match(/\[(.*?)\]/)[1]
            : item.match(/\[(.*?)\]/)[1] + ",";
      });
      allToggleFields = myToggleFields.split(",");

      if (isShowVal) {
        allToggleFields.forEach((item, i, arr) => {
          var $el = $('[data-togglename="' + item + '"]');
          var $parent = $el.parent();
          var $cfield = $el.closest(".CFIELD");

          $parent.addClass("hide-field").hide();
          $cfield.addClass("hide-field").hide();
      
          // .parent().prop('disabled', true);
          // .addClass("hide-field");
      
          // $('[data-togglename="' + item + '"]')
          //   .parent().hide();
      
          // $('[data-togglename="' + item + '"]').val("");
          $('[data-togglename="' + item + '"]')
            .parent()
            .find(">*")
            .attr("required", false);
      
          // remove required for section hide
          $('[data-togglename="' + item + '"] .Details-Item .CFIELD').each(
            function () {
              // var fieldId =$(this).find()
              var isRequired = false,
                fieldId = "";
      
              isRequired = $(this).find(">*").attr("required") ? true : false;
      
              if (isRequired) {
                fieldId = $(this).find("input,textarea,select").attr("id");
                console.log(fieldId, "fieldId");
                requiredFieldsSections.push(fieldId);
              }
      
              // requiredFieldsSections.push()
      
              $(this).find(">*").attr("required", false);
            }
          );
      
          $('[data-togglename="' + item + '"]').each(function () {
            var isSection = $(this).hasClass("fieldset-container");
      
            if (isSection) {
              $(this).closest(".section-container").addClass("removeborder");
              $(this).find(".CFIELD").addClass("hide-field");
            }
          });
        });
        toggleFields.forEach(function (item, i, arr) {
          if (!item) {
            return;
          }
          var isHidden = $('[data-togglename="' + item + '"]').is(":hidden");
          var myFieldParent = $('[data-togglename="' + item + '"]').parent();
          myFieldParentofParent = $('[data-togglename="' + item + '"]');         
          if (isHidden) {
            myFieldParent.show().removeClass("hide-field");
            myFieldParentofParent.show().removeClass("hide-field");
            myFieldParent.closest(".CFIELD").removeClass("hide-field");
            myFieldParent.removeClass("hide-field");
            myFieldParent.parent().addClass("py-5").addClass("border-bottom");
            myFieldParentofParent.show().removeClass("hide-field");
            myFieldParent.closest(".CFIELD").removeClass("hide-field");

            var $toggleLookupField = $('[data-togglename="' + item + '"]');
            if ($toggleLookupField.is("select")) {
              var storedLookupVal =
                $toggleLookupField.attr("data-lookup-value") ||
                $toggleLookupField.attr("value");
              if (storedLookupVal) {
                ListInfo.g.setSelectFieldValue(
                  $toggleLookupField,
                  storedLookupVal
                );
              }
            }
      
            if (!isView) {
              myFieldParent.find(">*").attr("required", true);
      
              $('[data-togglename="' + item + '"] .Details-Item .CFIELD').each(
                function () {
                  requiredFieldsSections.forEach((el) => {
                    var $this = $(this);
                    var fieldId = $(this).find("input,textarea,select").attr("id");
                    if (el == fieldId) {
                      $this.find(">*").attr("required", true);
                    }
                  });
                  // $(this).find(">*")
                  //   .attr("required", true);
                  $(this).removeClass("hide-field");
                  $(this).closest(".CFIELD").removeClass("hide-field");
                }
              );
      
              $('[data-togglename="' + item + '"]').each(function () {
                var isSection = $(this).hasClass("fieldset-container");
                // to remove the border and hide field from section when toggle
                if (isSection) {
                  $(this).closest(".section-container").removeClass("removeborder");
                  $(this).find(".CFIELD").removeClass("hide-field");
                  $(this).closest(".CFIELD").removeClass("hide-field");
                }
              });
            } else if (isView) {
              // to remove the class removeborder in view
              $('[data-togglename="' + item + '"]').each(function () {
                var isSection = $(this).hasClass("fieldset-container");
                if (isSection) {
                  $(this).closest(".section-container").removeClass("removeborder");
                  $(this).find(".CFIELD").removeClass("hide-field");
                  $(this).closest(".CFIELD").removeClass("hide-field");
                }
              });
            }
            //make toggle fields not required
            if (listkey == "mainkpi") {
              if (
                item == "RelatedMainKpis" ||
                item == "RelatedMainObjective" ||
                item == "Portfolio" ||
                item == "Actual"
              ) {
                myFieldParent.find(">*").attr("required", false);
              }
            }
            if (listkey == "initiatives") {
              if (
                item == "RelatedStrategyObjective" ||
                item == "RelatedStrategyReadonly" ||
                item == "RelatedReadOnlyObjectiveLevel" ||
                item == "RelatedReadonlyObjective" ||
                item == "ExternalEntityRepresentative"
              ) {
                myFieldParent.find(">*").attr("required", false);
              }
            }
            if (listkey == "projects") {
              if (item == "RelatedInitiativeDeliverable") {
                myFieldParent.find(">*").attr("required", false);
              }
            }
            if (listkey == "achievements") {
              if (item == "RelatedKPI") {
                myFieldParent.find(">*").attr("required", false);
              }
            }
            // if (listkey == "sos") {
            //   if (item == "RelatedPortfolio" || item == "RelatedObjective") {
            //     myFieldParent.find(">*").attr("required", false);
            //   }
            // }
            //
          }
        });
      } else {
        allToggleFields.forEach((item, i, arr) => {
          $('[data-togglename="' + item + '"]')
            .parent()
            .parent()
            .removeClass("py-5")
            .removeClass("border-bottom");
            var $el = $('[data-togglename="' + item + '"]');
            var $parent = $el.parent();
            var $cfield = $el.closest(".CFIELD");
            $parent.addClass("hide-field").hide();
            $cfield.addClass("hide-field").hide();            
      
          $('[data-togglename="' + item + '"]').each(function () {
            $(this).val("");
            $(this).removeAttr("value");
            $(this).removeAttr("data-lookup-value");
          });
          $('[data-togglename="' + item + '"]')
            .parent()
            .find("*")
            .attr("required", false);
        });
      }
    },
    toggleRequiredFields: function ($this) {
      var myValue = $this.val();

      var toggleRequiredValues =
          $this.data("requiredvalues").indexOf(":::") > -1
            ? $this.data("requiredvalues").split(":::")
            : [$this.data("requiredvalues")],
        toggleRequiredValues = toggleRequiredValues.filter(function (t) {
          return t.indexOf(myValue + "[") > -1;
        }),
        toggleRequiredFields =
          toggleRequiredValues.length > 0
            ? toggleRequiredValues[0].match(/\[(.*?)\]/)[1].split(",")
            : "",
        isShowVal = toggleRequiredValues.length > 0,
        allToggleRequiredFields =
          $this.data("requiredvalues").indexOf(":::") > -1
            ? $this.data("requiredvalues").split(":::")
            : [$this.data("requiredvalues")],
        myToggleRequiredFields = "";
      allToggleRequiredFields.forEach((item, i, arr) => {
        myToggleRequiredFields +=
          i == arr.length - 1
            ? item.match(/\[(.*?)\]/)[1]
            : item.match(/\[(.*?)\]/)[1] + ",";
      });
      allToggleRequiredFields = myToggleRequiredFields.split(",");

      if (isShowVal) {
        allToggleRequiredFields.forEach((item, i, arr) => {
          $('[data-requiredname="' + item + '"]')
            .parent()
            .find(">*")
            .attr("required", false);
        });

        toggleRequiredFields.forEach(function (item, i, arr) {
          myFieldParent = $('[data-requiredname="' + item + '"]').parent();
          myFieldParent.find(">*").attr("required", true);
        });
      } else {
        allToggleRequiredFields.forEach((item, i, arr) => {
          $('[data-requiredname="' + item + '"]')
            .parent()
            .find(">*")
            .attr("required", false);
        });
      }
    },
    toggleDisabledFields: function ($this) {
      var myValue = $this.val();

      var toggleDisabledValues =
          $this.data("toggledisabledvalues").indexOf(":::") > -1
            ? $this.data("toggledisabledvalues").split(":::")
            : [$this.data("toggledisabledvalues")],
        toggleDisabledValues = toggleDisabledValues.filter(function (t) {
          return t.indexOf(myValue + "[") > -1;
        }),
        toggleDisabledFields =
          toggleDisabledValues.length > 0
            ? toggleDisabledValues[0].match(/\[(.*?)\]/)[1].split(",")
            : "",
        isShowVal = toggleDisabledValues.length > 0,
        allToggleDisabledFields =
          $this.data("toggledisabledvalues").indexOf(":::") > -1
            ? $this.data("toggledisabledvalues").split(":::")
            : [$this.data("toggledisabledvalues")],
        myToggleDisabledFields = "";
      allToggleDisabledFields.forEach((item, i, arr) => {
        myToggleDisabledFields +=
          i == arr.length - 1
            ? item.match(/\[(.*?)\]/)[1]
            : item.match(/\[(.*?)\]/)[1] + ",";
      });
      allToggleDisabledFields = myToggleDisabledFields.split(",");

      if (isShowVal) {
        allToggleDisabledFields.forEach((item, i, arr) => {
          $('[data-toggledisabledname="' + item + '"]')
            .parent()
            .find(">*")
            .attr("disabled", false);
        });

        toggleDisabledFields.forEach(function (item, i, arr) {
          myFieldParent = $(
            '[data-toggledisabledname="' + item + '"]'
          ).parent();
          myFieldParent.find(">*").attr("disabled", true);
        });
      } else {
        allToggleDisabledFields.forEach((item, i, arr) => {
          $('[data-toggledisabledname="' + item + '"]')
            .parent()
            .find(">*")
            .attr("disabled", false);
        });
      }
    },
    // showFieldsIfInitiativeVision: function () {
    //   var typeValue = $("#Types option:selected").val();

    //   if (typeValue == "vision") {
    //     $("#RelatedBudgetItem").parent().css("display", "block");
    //   } else {
    //     $("#RelatedBudgetItem").parent().css("display", "none");
    //   }
    //   if (isNew) {
    //     // if (isEPMO) {
    //     //   $("#Types").val("strategically");
    //     //   $("#Types").prop("disabled", true);
    //     // }
    //     $("#Types").on("change", function () {
    //       var typeValueafterchange = $("#Types option:selected").val();
    //       if (typeValueafterchange == "vision") {
    //         $("#RelatedBudgetItem").parent().css("display", "block");
    //       } else {
    //         $("#RelatedBudgetItem").parent().css("display", "none");
    //       }
    //     });
    //   }
    //   if (isEdit) {
    //     // if (isEPMO) {
    //     //   // $('#Types').val('strategically');
    //     //   $("#Types").prop("disabled", true);
    //     // }
    //     $("#Types").on("change", function () {
    //       var typeValueafterchange = $("#Types option:selected").val();
    //       if (typeValueafterchange == "vision") {
    //         $("#RelatedBudgetItem").parent().css("display", "block");
    //       } else {
    //         $("#RelatedBudgetItem").parent().css("display", "none");
    //       }
    //     });
    //   }
    //   // commented to can show the fields when use strategy type of initiative
    //   // if (typeValue == "vision") {
    //   //   $("#RelatedBudgetItem , #ProgramTotalCost")
    //   //     .parent()
    //   //     .css("display", "block");
    //   // } else {
    //   //   $("#RelatedBudgetItem , #ProgramTotalCost").parent().css("display", "none");
    //   // }
    //   // if (isNew || isEdit) {

    //   //   $("#Types").on("change", function () {
    //   //     var typeValueafterchange = $("#Types option:selected").val();
    //   //     if (typeValueafterchange == "vision") {
    //   //       $("#RelatedBudgetItem , #ProgramTotalCost")
    //   //         .parent()
    //   //         .css("display", "block");
    //   //     } else {
    //   //       $("#RelatedBudgetItem , #ProgramTotalCost")
    //   //         .parent()
    //   //         .css("display", "none");
    //   //     }
    //   //   });
    //   // }
    // },
    dateMinAndMaxValidation: () => {
      // max and min date for the master details
      $("input[type=date]:not([minimumdate=undefined])").on(
        "change",
        function () {
          var start = $(this)
            .closest(".fieldset-container")
            .find("input#" + $(this).attr("minimumdate"));
          if ($(this).val()) start.attr("max", $(this).val());
        }
      );
      $("input[type=date]:not([maximumdate=undefined])").on(
        "change",
        function () {
          var end = $(this)
            .closest(".fieldset-container")
            .find("input#" + $(this).attr("maximumdate"));
          if ($(this).val()) end.attr("min", $(this).val());
        }
      );
    },
  },
  roleQuery: async function (fieldsConditionConfig) {
    let whereBody = ``,
      queryBody = ``,
      whereBodyFinal = ``;
    //dynamic query building
    await Promise.all(
      fieldsConditionConfig.map(async (el, i, a) => {
        //Two choices
        if (fieldsConditionConfig.length == 1) {
          if (el.type == "LoggedInUser") {
            whereBody += `<And><Eq><FieldRef Name="${el.field}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And>`;
          } else {
            whereBody += `<And><In><FieldRef Name="${el.field}"/><Values>`;
            for (var j = 0; j < el.values.length; j++) {
              whereBody += `<Value Type="${el.type}">${el.values[j]}</Value>`;
            }
            whereBody += `</Values></In><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And>`;
          }
        }
        //More than two choices
        else if (fieldsConditionConfig.length > 1) {
          //two Eqs in last And
          if (i == fieldsConditionConfig.length - 1) {
            if (el.type == "LoggedInUser") {
              whereBody += `<And><Eq><FieldRef Name="${el.field}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>`;
            } else {
              whereBody += `<And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>`;
              whereBody += `<In><FieldRef Name="${el.field}"/><Values>`;
              for (var j = 0; j < el.values.length; j++) {
                whereBody += `<Value Type="${el.type}">${el.values[j]}</Value>`;
              }
              whereBody += `</Values></In>`;
            }

            //appending And closure
            var count = (whereBody.match(/<And>/g) || []).length;
            var ANDC = `</And>`.repeat(count);
            whereBody += ANDC;
          }
          //normal And
          else {
            if (el.type == "LoggedInUser") {
              whereBody += `<And><Eq><FieldRef Name="${el.field}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>`;
            } else {
              whereBody += `<And><In><FieldRef Name="${el.field}"/><Values>`;
              for (var j = 0; j < el.values.length; j++) {
                whereBody += `<Value Type="${el.type}">${el.values[j]}</Value>`;
              }
              whereBody += `</Values></In>`;
            }
          }
        }
        //Finish Line, make last changes and build query
        if (i == fieldsConditionConfig.length - 1) {
          whereBody = whereBody.replaceAll(
            `Type="date"`,
            `IncludeTimeValue="TRUE" Type="DateTime"`
          );
          whereBodyFinal = `<Where>${whereBody}
          </Where>`;
          queryBody = `<View>
            <Query>
            ${whereBodyFinal}
            <OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy>
            </Query>
          </View>`;
        }
      })
    );
    return queryBody;
  },

};

setTimeout(() => {
  const container = document.querySelector('.container-body');

  if (
    container &&
    !document.querySelector('.discrepancy-summary-card') &&
    isNew === true &&
    listkey === 'closureform'
  ) {
    let htmlBuilder =
      '<div class="card mb-4 border-primary discrepancy-summary-card">' +
        '<div class="card-header bg-discrepancy text-white font-weight-bold text-center Resources">' +
          '<p class="Resources m-0" data-trans-discrepancysummary> </p>' +
        '</div>' +
        '<div class="card-body">' +
          '<div class="row">' +
            '<div class="col-lg-3 col-md-6 mb-3 text-center">' +
              '<p class="Resources mb-1 font-weight-bold text-center" data-trans-FinancialDiscrepancyValue></p>' +
              '<div class="text-center">' + (projectDiscrepancyCost || No_Data) + '</div>' +
            '</div>' +
            '<div class="col-lg-3 col-md-6 mb-3">' +
              '<p class="Resources mb-1 font-weight-bold text-center" data-trans-FinancialDiscrepancyPercentage></p>' +
              '<div class="text-center">' + (projectDiscrepancyCostPercentage || No_Data) + '</div>' +
            '</div>' +
            '<div class="col-lg-3 col-md-6 mb-3">' +
              '<p class="Resources mb-1 font-weight-bold text-center" data-trans-DiscrepancyinDays></p>' +
              '<div class="text-center">' + (projectDiscrepancyInDays || No_Data) + '</div>' +
            '</div>' +
            '<div class="col-lg-3 col-md-6 mb-3">' +
              '<p class="Resources mb-1 font-weight-bold text-center" data-trans-TimeDiscrepancyPercentage></p>' +
              '<div class="text-center">' + (projectDiscrepancyPercentage || No_Data) + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    container.insertAdjacentHTML('afterbegin', htmlBuilder);
    changeResources()
  }
}, 2000); // Adjust delay (ms) as needed, e.g., 500ms, 1500ms, etc.

setTimeout(() => {
  const container = document.querySelector('.container-body');

  if (
    container &&
    !document.querySelector('.discrepancy-summary-card') &&
    isNew === true &&
    listkey === 'closureinitiative'
  ) {
    let htmlBuilder =
      '<div class="card mb-4 border-primary discrepancy-summary-card">' +
        '<div class="card-header bg-discrepancy text-white font-weight-bold text-center Resources">' +
          '<p class="Resources m-0" data-trans-discrepancysummary> </p>' +
        '</div>' +
        '<div class="card-body">' +
          '<div class="row">' +
            '<div class="col-lg-3 col-md-6 mb-3 text-center">' +
              '<p class="Resources mb-1 font-weight-bold text-center" data-trans-FinancialDiscrepancyValue></p>' +
              '<div class="text-center">' + (initiativeDiscrepancyCost || No_Data) + '</div>' +
            '</div>' +
            '<div class="col-lg-3 col-md-6 mb-3">' +
              '<p class="Resources mb-1 font-weight-bold text-center" data-trans-FinancialDiscrepancyPercentage></p>' +
              '<div class="text-center">' + (initiativeDiscrepancyCostPercentage || No_Data) + '</div>' +
            '</div>' +
            '<div class="col-lg-3 col-md-6 mb-3">' +
              '<p class="Resources mb-1 font-weight-bold text-center" data-trans-DiscrepancyinDays></p>' +
              '<div class="text-center">' + (initiativeDiscrepancyInDays || No_Data) + '</div>' +
            '</div>' +
            '<div class="col-lg-3 col-md-6 mb-3">' +
              '<p class="Resources mb-1 font-weight-bold text-center" data-trans-TimeDiscrepancyPercentage></p>' +
              '<div class="text-center">' + (initiativeDiscrepancyPercentage || No_Data) + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    container.insertAdjacentHTML('afterbegin', htmlBuilder);
    changeResources()
  }
}, 2000); 



// for view
window.View_ListInfo = {
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".container-body").length) {
      //username
      $(".navbar .user-name").text(
        UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join("")
      );
      $(".user-name-full").text(UserN.Title);
      clearInterval(checkStatusHtml);
      //get form's json
      $.getScript(
        "" +
          _spPageContextInfo.webAbsoluteUrl +
          "/Style%20Library/spm/JSON/" +
          listkey +
          "/" +
          JSON_File_Name
      ).done(function (script, textStatus) {
        isPrint = Information_Form[0].isPrint
          ? Information_Form[0].isPrint
          : false;
        SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
          View_ListInfo.InfoLoop();
        });
      });
    }
  },
  InfoLoop: function () {
    var htmlBuilder = isWF
      ? '<div class="d-flex justify-content-end mx-o mb-2"> <button data-trans-backbutton class="btn btn-action btn-cancel cancel Resources" type="button"></button> </div> <div class="section1 approvalHeader col-12"><div class="d-flex justify-content-between w-100"><div class=""><span class="bold Resources" data-trans-' +
        USERlistkey +
        "></span>" +
        " " +
        '<span class="mx-3 wf-project-name"></span></div><div class=""><span class="bold Resources" data-trans-taskname></span><span class="mx-3 wf-task-name"></span></div></div></div><h2 class="approvalHeader Resources"></h2>'
      : "";

    var Label, Description;
    var printHtml = "";

    var toggleSectionName;

    asyncFor.seqProcess(
      Information_Form,
      function (item, index, resolve) {
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          Label = item.label;
        } else {
          Label = item.labelEn;
        }
        // console.log('Start processing ' + Label + ' subFields...');
        //Handle security
        var groups = [],
          notAllowForGroups = [],
          targetList = "",
          sectionType = "",
          rendersection = true;
        if (item.hasOwnProperty("security")) {
          if (item.security.groups.length > 0) {
            for (var z = 0; z < item.security.groups.length; z++) {
              groups.push(item.security.groups[z]); //.replace(/\s/g, '')
              if (Groups.indexOf(item.security.groups[z]) == -1) {
                rendersection = false;
              } else {
                rendersection = true;
                break; // to save all groups in data-groups to can open and close the fields
              }
            }
            groups = groups.join(" ");
          }

          if (item.security.notAllowTo && item.security.notAllowTo.length > 0) {
            for (var i = 0; i < item.security.notAllowTo.length; i++) {
              notAllowForGroups.push(item.security.notAllowTo[i]);
            }

            // notAllowForGroups = notAllowForGroups.join(" ");

            notAllowForGroups =
              'data-notallowforgroups="' +
              JSON.stringify(notAllowForGroups).replaceAll(`"`, `'`) +
              '"';
          }
        }
        if (item.hasOwnProperty("sectiontype")) {
          //both attr should be available
          targetList = 'data-target_list="' + item.targetlist + '"';
          sectionType = 'data-section_type="' + item.sectiontype + '"';
        }
        //print
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          Label = item.label;
          Description = item.description;
          printDate = "التاريخ : ";
        } else {
          Label = item.labelEn;
          Description = item.descriptionEn;
          printDate = "Date : ";
        }

        // to handle the workflowSetValues
        var workflowSetValues = [],
          dataWorkflowSetValues = "";

        workflowSetValues = item.workflowSetValues;

        if (workflowSetValues && workflowSetValues.length) {
          dataWorkflowSetValues =
            'data-workflowSetValue="' +
            JSON.stringify(workflowSetValues).replaceAll(`"`, `'`) +
            '"';
        } else {
          dataWorkflowSetValues = "";
        }
        //

        toggleSectionName = item.toggleName;

        var printFooter = "";
        var printBody = "";

        if (item.sectiontype == "master") {
          item.subFields.forEach((el) => {
            if (
              localStorage.getItem("lng") == null ||
              localStorage.getItem("lng") == "ar"
            ) {
              printFooter += `
                        <div class="CFIELD" data-groups="" style="display:block;min-width:100%;padding:10px 0px">
                        <label class="col-md-3" style="font-weight:bold" for="${el.InternalName}">
                       ${el.DisplayName}
                        </label>
                        <p type="${el.type}" class="col-md-9 viewmode-value print-field" id="${el.InternalName}" style="border-bottom:1px solid #ccc"></p></div>
                        `;
            } else {
              printFooter += `
                        <div class="CFIELD" data-groups="" style="display:block;min-width:100%;padding:10px 0px">
                        <label class="col-md-3" style="font-weight:bold" for="${el.InternalName}">
                       ${el.DisplayNameEn}
                        </label>
                        <p type="${el.type}" class="col-md-9 viewmode-value print-field" id="${el.InternalName}" style="border-bottom:1px solid #ccc"></p></div>
                        `;
            }
          });
        } else {
          item.subFields.forEach((el) => {
            if (
              localStorage.getItem("lng") == null ||
              localStorage.getItem("lng") == "ar"
            ) {
              printBody += `<div style="display:block;padding:20px 0px" class="CFIELD">
                        <label class="col-md-2 printTitle" for=${
                          el.InternalName
                        }>${el.DisplayName}</label>
                        <p class="col-md-9 viewmode-value print-field" style="border-bottom:1px solid #ccc;white-space:pre-line"  type=${
                          el.type == "datetime" ? "date" : el.type
                        } id="${el.InternalName}"></p>
                    </div>
                    `;
            } else {
              printBody += `<div style="display:block;padding:20px 0px" class="CFIELD">
                        <label class="col-md-2 printTitle" for=${el.InternalName}>${el.DisplayNameEn}</label>
                        <p class="col-md-9 viewmode-value print-field" style="border-bottom:1px solid #ccc;white-space:pre-line"  type=${el.type} id="${el.InternalName}"></p>
                    </div>
                    `;
            }
          });
        }

        if (item.sectiontype == "master") {
          printHtml += `<div class="py-5 border-bottom section-container ViewPrint_Form printFooterContainer page-avoid" ${targetList} ' ' ${sectionType} ' data-groups="${groups}" ${notAllowForGroups} style="display:none">
                              <p class="printDescription">${
                                Description
                                  ? Label + " | " + Description
                                  : Label
                              }</p>
                              <div class="col-md-11 p-4 fieldset-container">
                              ${printFooter}
                              </div>
                          </div>
                          `;
        } else {
          printHtml += `<div class="py-5 border-bottom section-container ViewPrint_Form printBodyContainer page-avoid" ${targetList} ' ' ${sectionType} ' data-groups="${groups}" ${notAllowForGroups} style="display:none">
                              <p class="printDescription">${
                                Description
                                  ? Label + " | " + Description
                                  : Label
                              }</p>
                              <div>
                              ${printBody}
                              </div>
                          </div>`;
        }

        htmlBuilder +=
          '<div class="py-5 border-bottom section-container View_Form ' +
          listkey +
          ' " ' +
          targetList +
          " " +
          sectionType +
          ' data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ">" +
          '<div class="form-row">' +
          '<div class="col-lg-3 col-md-4 mb-4">' +
          "<h3 class='sideTitle'>" +
          Label +
          "</h3>" +
          '<span class="font-14">' +
          Description +
          "</span>" +
          "</div>" +
          "<div data-togglename=" +
          toggleSectionName +
          " " +
          dataWorkflowSetValues +
          ' class="col-lg-9 col-md-8 white-box p-4 fieldset-container">';
        asyncFor.seqProcess(
          item.subFields,
          function (subitemField, indexField, resolveField) {
            View_ListInfo.RenderForm(
              subitemField,
              null,
              function (flag, htmlResult) {
                resolveField(subitemField, indexField, {
                  htmlResult: htmlResult,
                });
              }
            );
          },
          function (subitemField, indexField, dataField, isDoneField) {
            htmlBuilder += dataField.htmlResult;
            if (isDoneField) {
              resolve(item, index, dataField, true);
            }
          }
        );

        // }, 400);
      },
      function (item, index, data, isDone) {
        // console.log("before html builder before html builder before html builder before html builder")

        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          Label = item.label;
          if (btnDeleteLabel == undefined) {
            btnDeleteLabel = Resources["ar"].deletebutton;
          }
        } else {
          Label = item.labelEn;
          if (btnDeleteLabel == undefined) {
            btnDeleteLabel = Resources["en"].deletebutton;
          }
        }
        // console.log('Finishing label ' + Label + ' - IsDone: ' + isDone);
        htmlBuilder += "</div></div></div>";
        if (isDone) {
          actionTaskHeader = "";
          if (isWF) {
            actionTaskHeader =
              '<h2 class="approvalHeader Resources mb-5" data-trans-taskDecision>	القرار</h2>';
          }
          htmlBuilder +=
            '<div class="py-5 btnactionrow">' +
            actionTaskHeader +
            '<div class="leftBtns">' +
            // '<button data-trans-toissue class="btn btn-action btn-to-issue Resources" type="button"></button>' +
            '<button class="btn btn-action btn-delete" style="margin:unset" type="button">' +
            btnDeleteLabel +
            "</button>" +
            "</div>" +
            '<div class="form-row rightBtns justify-content-end form-btns-wrapper">' +
            '<button data-trans-CancelButton class="btn btn-action btn-cancel Resources" type="button"></button>' +
            '<button  data-trans-EditButton class="btn btn-action btn-save Resources" type="button"></button>' +
            "</div>" +
            "</div>";
          //$('.project-Title-Name').text(PageTitle);
          $(".container-body").html(htmlBuilder);
          if (isPrint) $(".container-body").append(printHtml);
          $(".hide-section").hide();

          //handle master details
          $(".breakLine").before('<div class="col-md-12"></div>');
          if ($("[data-section_type]").length > 0) {
            $("[data-section_type]").each(function () {
              $(this)
                .find(".fieldset-container > .CFIELD")
                .wrapAll('<div class="Details-Item"></div>');
              MasterDetailsArrayRequest.push($(this).attr("data-target_list"));
            });
            MasterDetailsArrayRequest = Array.from(
              new Set(MasterDetailsArrayRequest)
            ); //remove duplicates
            MasterDetailsArrayNew = MasterDetailsArrayRequest;
            MasterDetailsArrayEdit = MasterDetailsArrayRequest;
            // console.log(MasterDetailsArrayRequest);
          }

          $("h2.DahsFormTitle").append(
            '<button data-trans-EditButton type="button" id="editup" class="CSformSubmit Resources" style="float:right"></button>'
          );
          // $('.title-item').text('تفاصيل');
          SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
            View_Data_Request.init();
            if (SP_ListName == "Projects" && IID) {
              GetProject_Info.init();
            } else {
              GetCurrentStage_Info.init();
            }
          });
          // added for CR module
          if (isCrMode) {
            CrModeFunctionality.preinit();
          } else {
            $(
              "div#particles-foreground, div#particles-background, .vertical-centered-box"
            ).animate(
              {
                opacity: 0,
              },
              {
                duration: 333,
                complete: function () {
                  $(
                    "div#particles-foreground, div#particles-background, .vertical-centered-box"
                  ).remove();

                  // $('div#particles-foreground, div#particles-background, .vertical-centered-box').hide();
                },
              }
            );
          }
          // ended

          //handle new style of wf
          if (isWF) {
            $(".FormContainer").addClass("wf-mode");
            $("#navbarsParent").addClass("wfMode");
            $(".page-nav").attr("style", "display: none !important");
            // $(".sidebar").attr("style", "display: none !important");
            $(".main-panel").attr("style", "width: 100% !important");
            //getTaskHistory.init();
            Get_TaskHistory.init();
          } else {
            // Get_AllTaskHistoryRelatedToForm.init();
          }
          //

          $(
            "div#particles-foreground, div#particles-background, .vertical-centered-box"
          ).animate(
            {
              opacity: 0,
            },
            {
              duration: 333,
              complete: function () {
                $(
                  "div#particles-foreground, div#particles-background, .vertical-centered-box"
                ).remove();

                // $('div#particles-foreground, div#particles-background, .vertical-centered-box').hide();
              },
            }
          );
          if (listkey == "risks" || listkey == "initiativerisks") {
            //move to issue
            $(".btn-to-issue").show();
            Risk_To_Issue_Submit.g.toissueClick();
          }
          if (isView && listkey == "ideas") {
            window.Idea_Info.init();
          }
          if (
            (isView && USERisWF) ||
            (USERisWF && currentStage && currentStage == "S42")
          ) {
            $(".btnactionrow").hide();
          }

          // PDF export: normal View pages only (exclude WF + Change Request)
          if (
            isView &&
            !isWF &&
            !USERisWF &&
            typeof listkey !== "undefined" &&
            listkey !== "changerequest"
          ) {
            $(".FormContainer .exportPdfBtnContainer").remove();
            $(".FormContainer").prepend(
              '<div class="exportPdfBtnContainer">' +
                '<button type="button" class="btn exportPdfBtn Resources" data-trans-excelpdf onclick="Export_PDF.export()"></button>' +
                "</div>"
            );
          }
          if (isPrint) {
            var printPtn =
              '<div class="printBtnContainer">' +
              '<a data-trans-printscreen class="btn-add Resources" type="button" onclick="Print_Data.print()"></a>' +
              "</div>";
            $(".btnactionrow").after(printPtn);
          }
          changeResources();
        }
      }
    );
  },
  RenderForm: function (element, flag, OnSuccess) {
    //
    var htmlBody = "";
    var groups = [],
      notAllowForGroups = [], //notAllowForGroups  to make the field disable if  not allow for current group and on current form
      thistip = "",
      hidestagesIDs = "",
      showstagesIDs = "",
      disablestagesIDs = "",
      enablestagesIDs = "",
      requireOnWfTaskstagesIDs = "",
      isWfhidestagesIDs = "",
      isWfshowstagesIDs = "",
      isWfdisablestagesIDs = "",
      isWfenablestagesIDs = "",
      renderfield = true,
      dontSubmit = element.hasOwnProperty("dontSubmit") ? "dont-submit" : "", // to avoid err on view
      dontSubmitRequired = element.hasOwnProperty("dontSubmitRequired")
        ? "dont-submit even-required"
        : "",
      dontRequest = element.hasOwnProperty("dontRequest") ? "dont-request" : "", // to avoid err on view
      toggleValues = "",
      ToggleName = element.hasOwnProperty("ToggleName")
        ? "data-togglename=" + element.ToggleName
        : "",
      toggleDisabledName = element.hasOwnProperty("ToggleDisabledName")
        ? "data-toggledisabledname=" + element.ToggleDisabledName
        : "";

    if (element.hasOwnProperty("security")) {
      if (element.security.groups.length > 0) {
        for (var z = 0; z < element.security.groups.length; z++) {
          groups.push(element.security.groups[z]); //.replace(/\s/g, '')
          if (Groups.indexOf(element.security.groups[z]) == -1) {
            renderfield = false;
          } else {
            renderfield = true;
            break; // to save all groups in data-groups to can open and close the fields
          }
        }
        groups = groups.join(" ");
      }

      if (
        element.security.notAllowTo &&
        element.security.notAllowTo.length > 0
      ) {
        for (var i = 0; i < element.security.notAllowTo.length; i++) {
          notAllowForGroups.push(element.security.notAllowTo[i]);
        }

        notAllowForGroups =
          'data-notallowforgroups="' +
          JSON.stringify(notAllowForGroups).replaceAll(`"`, `'`) +
          '"';
        // notAllowForGroups = notAllowForGroups.join(",");
      }
    }

    if (element.hasOwnProperty("requireOnWfTaskStage") && USERisWF) {
      isWfhidestagesIDs =
        'data-isWfrequirestageID="' + element.requireOnWfTaskStage;
    }

    if (element.hasOwnProperty("hideOnWfTaskStage") && USERisWF) {
      isWfhidestagesIDs = 'data-isWfhidestageID="' + element.hideOnWfTaskStage;
    }
    if (element.hasOwnProperty("showOnWfTaskStage") && USERisWF) {
      isWfshowstagesIDs = 'data-isWfshowstageID="' + element.showOnWfTaskStage;
    }
    if (element.hasOwnProperty("disableOnWfTaskStage") && USERisWF) {
      isWfdisablestagesIDs =
        'data-isWfdisablestageID="' + element.disableOnWfTaskStage;
    }
    if (element.hasOwnProperty("enableOnWfTaskStage") && USERisWF) {
      isWfenablestagesIDs =
        'data-isWfenablestageID="' + element.enableOnWfTaskStage;
    }

    if (element.hasOwnProperty("hideonstage") && !USERisWF) {
      hidestagesIDs = 'data-hidestageID="' + element.hideonstage;
    }
    if (element.hasOwnProperty("showonstage") && !USERisWF) {
      showstagesIDs = 'data-showstageID="' + element.showonstage;
    }
    if (element.hasOwnProperty("disableonstage") && !USERisWF) {
      disablestagesIDs = 'data-disablestageID="' + element.disableonstage;
    }
    if (element.hasOwnProperty("enableonstage") && !USERisWF) {
      enablestagesIDs = 'data-enablestageID="' + element.enableonstage;
    }
    if (element.hasOwnProperty("toggleValues")) {
      element.toggleValues.forEach(function (item, i, arr) {
        var seperator = i == arr.length - 1 ? '"' : ":::";
        toggleValues +=
          i == 0
            ? 'data-toggleValues="' +
              item.value +
              "[" +
              item.fields.join(",") +
              "]" +
              seperator
            : item.value + "[" + item.fields.join(",") + "]" + seperator;
      });
    }
    if (element.tooltip == undefined) {
      thistip = "";
    } else {
      thistip = 'data-tip="' + element.tooltip + '"';
    }
    var infoIconHtml = getFieldInfoIconHtml(element);

    var descPhrase;
    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {
      displayName = element.DisplayName;
      descPhrase = element.descPhraseAr;
    } else {
      displayName = element.DisplayNameEn;
      descPhrase = element.descPhraseEn;
    }

    if (localStorage.getItem("lng") == "en" && element.DispfieldkeyEn) {
      dispfieldkey = element.DispfieldkeyEn;
    } else dispfieldkey = element.Dispfieldkey;

    if (renderfield) {
      switch (element.type) {
        case "string":
          var translateFrom = "";

          if (element.translate == "resources") {
            translateFrom = `data-translateFromResources=${true}`;
          }

          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.addClass +
            '" ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            infoIconHtml +
            "</label>" +
            '<p type="text" ' +
            translateFrom +
            ' class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            " ></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "stringunique":
          var translateFrom = "";

          if (element.translate == "resources") {
            translateFrom = `data-translateFromResources=${true}`;
          }

          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.addClass +
            '" ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="text" ' +
            translateFrom +
            ' class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            " ></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "yearInput":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            editableBy +
            " " +
            showstagesIDs +
            " " +
            disablestagesIDs +
            " " +
            enablestagesIDs +
            " " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            " " +
            isWfdisablestagesIDs +
            " " +
            isWfenablestagesIDs +
            ' data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            "<input " +
            ToggleName +
            " " +
            toggleDisabledName +
            ' type="number" data-manipulates="year" min="" max="2099" step="1" maxdata="' +
            element.max +
            '" mindata="' +
            element.min +
            '" placeholder="' +
            displayName +
            '" ' +
            dynamic +
            ' class="form-control SPIField" id="' +
            element.InternalName +
            '" ' +
            element.state +
            " " +
            element.validation +
            ">" +
            '<div class="inputInfo ' +
            isexist +
            '">' +
            descPhrase +
            "</div>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;
        case "number":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="number" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "multiselectstring":
          htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          // " " +
          // `${element.showlink ? "<span><a class='elementLink' href='javascript:' target='_blank'><i class='fas fa-external-link-alt'></i></a></span>" : ""}` +
          "</label>" +
          '<p type="multiselect" class="viewmode-value" data-valfieldkey="' +
          element.valfieldkey +
          '" data-dispfieldkey="' +
          element.Dispfieldkey +
          '" data-listname="' +
          element.source +
          '" id="' +
          element.InternalName +
          '" ' +
          ToggleName +
          'data-parentrelatedkeylvl1="' +
          element.fieldsinformlvl1 +
          '" data-parentrelatedvaluelvl1="" data-parentrelatedfilterkeylvl1="' +
          element.sourcefieldlvl1 +
          '" data-parentrelatedkeylvl2="' +
          element.fieldsinformlvl2 +
          '" data-parentrelatedvaluelvl2="" data-parentrelatedfilterkeylvl2="' +
          element.sourcefieldlvl2 +
          '" data-linkedto="' +
          element.linkedto +
          '"></p>' +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;
        
        
        case "multiselecttranslatedstring":
          htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit +
          " " +
          dontRequest +
          " " +
          dontSubmitRequired +
          " " +
          " " +
          element.className +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" ' +
          notAllowForGroups +
          ' style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          // " " +
          // `${element.showlink ? "<span><a class='elementLink' href='javascript:' target='_blank'><i class='fas fa-external-link-alt'></i></a></span>" : ""}` +
          "</label>" +
          '<p type="multiselecttranslatedstring" class="viewmode-value"  id="' +
          element.InternalName +
          '" ' +
          ToggleName +
          'data-parentrelatedkeylvl1="' +
          element.fieldsinformlvl1 +
          '" data-parentrelatedvaluelvl1="" data-parentrelatedfilterkeylvl1="' +
          element.sourcefieldlvl1 +
          '" data-parentrelatedkeylvl2="' +
          element.fieldsinformlvl2 +
          '" data-parentrelatedvaluelvl2="" data-parentrelatedfilterkeylvl2="' +
          element.sourcefieldlvl2 +
          '" data-linkedto="' +
          element.linkedto +
          '"></p>' +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;
        
        
        case "multiselectForFiles":
          htmlBody =
            '<div class="col-md-6 CFIELD" ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '    data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="multiselectForFiles" data-listname="' +
            element.source +
            '" data-valfieldkey="' +
            element.valfieldkey +
            '" data-Dispfieldkey="' +
            dispfieldkey +
            '" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;
        case "formula":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.addClass +
            '" ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="text" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName;
          '" style="direction: ltr !important;"></p>' + "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "code":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="text" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "floattax":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="number" class="viewmode-value tax" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            " " +
            toggleDisabledName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "float":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="number" class="viewmode-value number" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "phonenumber": // ksa phone number validation
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="number" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            " " +
            toggleDisabledName +
            "></p>" +
            "</div>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "floatwithoutformatting":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="number" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "weightfloatpercentage":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="number" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "floatpercentage":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="number" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "percentbyrelatedparent":

      

          var code = activeCode;

          if (code) {
            var customQuery =
              '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
              code +
              "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>";

            sphttp.get(
              _spPageContextInfo.siteServerRelativeUrl,
              element.listname,
              customQuery,
              [element.parentinternalname],
              function (records, record, listItem, isDone) {
                if (isDone) {
                  var parentValue = "";
                  records.forEach(function (el, index) {
                    parentValue = el[element.parentinternalname];
                  });

                  htmlBody =
                    '<div class="col-md-6 CFIELD ' +
                    dontSubmit +
                    " " +
                    dontRequest +
                    " " +
                    dontSubmitRequired +
                    " " +
                    " " +
                    element.className +
                    ' " ' +
                    thistip +
                    " " +
                    hidestagesIDs +
                    " " +
                    showstagesIDs +
                    "  " +
                    disablestagesIDs +
                    "  " +
                    enablestagesIDs +
                    "   " +
                    isWfhidestagesIDs +
                    " " +
                    requireOnWfTaskstagesIDs +
                    " " +
                    isWfshowstagesIDs +
                    "  " +
                    isWfdisablestagesIDs +
                    "  " +
                    isWfenablestagesIDs +
                    '        data-groups="' +
                    groups +
                    '" ' +
                    notAllowForGroups +
                    ' style="display:' +
                    element.display +
                    '">' +
                    '<label for="' +
                    element.InternalName +
                    '" ' +
                    element.validation +
                    ">" +
                    displayName +
                    "</label>" +
                    '<p type="number" class="viewmode-value"   data-parentval="' +
                    parentValue +
                    '"  id="' +
                    element.InternalName +
                    '" ' +
                    ToggleName +
                    " " +
                    toggleDisabledName +
                    "></p>" +
                    "</div>";

             

                  OnSuccess(flag, htmlBody);
                }
              }
            );
          }
          break;

        case "decimalpercentage":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="number" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;
        case "percentage":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="percentage" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "datetime":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="date" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;
        case "datetimetoparent":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="date" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            " " +
            toggleDisabledName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "datewithtime":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="date" class="viewmode-value withTime" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            '</div><div class="col-md-6 CFIELDTime">' +
            '<label data-trans-datetime class="Resources"></label>' +
            '<p type="time" class="viewmode-value" id="time" ></p>' +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "picker":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="picker" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "multipicker":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="multipicker" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "dropdown":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '  data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="dropdown" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "dropdownValues":
          var getValueFromLookupAttrs = "";
          if (element.getValueFromLookup) {
            getValueFromLookupAttrs = ' data-getvaluefromlookup="true" data-getvaluefromlookup-field="' + element.getValueFromLookup.lookupField + '" data-getvaluefromlookup-list="' + element.getValueFromLookup.lookupList + '" data-getvaluefromlookup-fieldtoget="' + element.getValueFromLookup.lookupFieldToGet + '"';
          }
          
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            "<p " +
            toggleValues +
            getValueFromLookupAttrs +
            ' type="dropdown"  data-viewtogglevalue="" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            " ></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "radio":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="radio" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "yesnoradio":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="radio" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "checkbox":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="checkbox" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;
        case "lookuptoparentchild":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            '  style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="lookuptoparentchild" data-listname="' +
            element.source +
            '" data-valfieldkey="' +
            element.valfieldkey +
            '" data-dispfieldkey="' +
            element.Dispfieldkey +
            '" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            " " +
            toggleDisabledName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "lookup":
          ///////////////////////////////////////////////
          if (element.BIlanguage == true) {
            if (
              localStorage.getItem("lng") == null ||
              localStorage.getItem("lng") == "ar"
            ) {
              dispfieldkey = element.Dispfieldkey;
            } else {
              dispfieldkey = element.DispfieldkeyEn;
            }
          }

          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            '  style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            " " +
            `${
              element.showlink
                ? "<span><a class='elementLink' href='javascript:' target='_blank'><i class='fas fa-external-link-alt'></i></a></span>"
                : ""
            }` +
            "</label>" +
            '<p type="lookup" data-listname="' +
            element.source +
            '" data-valfieldkey="' +
            element.valfieldkey +
            '" data-Dispfieldkey="' +
            dispfieldkey + //data-parentrelatedkeylvl1 > to get the target element,data-parentrelatedvaluelvl1 > to save the value of parent like sector,data-parentrelatedfilterkeylvl1 >> to show the value on this column in list
            '" data-parentrelatedkeylvl1=' +
            element.fieldsinformlvl1 + // to handle the dont submit field in view lvl1
            ' data-parentrelatedvaluelvl1="" data-parentrelatedfilterkeylvl1=' +
            element.sourcefieldlvl1 +
            " data-parentrelatedkeylvl2=" +
            element.fieldsinformlvl2 + // change from dynamic to fieldsinformlvl1
            ' data-parentrelatedvaluelvl2="" data-parentrelatedfilterkeylvl2=' +
            element.sourcefieldlvl2 +
            ' class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            ' data-linkedto="' +
            element.linkedto +
            '"></p>' +
            "</div>";
          OnSuccess(flag, htmlBody);
          ///////////////////////////////////////////////
          break;

        case "lookupdropdown":
          if (element.BIlanguage == true) {
            if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
              dispfieldkey = element.Dispfieldkey;
            } else {
              dispfieldkey = element.DispfieldkeyEn || element.Dispfieldkey;
            }
          } else {
            dispfieldkey = element.Dispfieldkey;
          }
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            (element.className || "") + ' " ' + thistip + " " + hidestagesIDs + " " +
            showstagesIDs + "  " + disablestagesIDs + "  " + enablestagesIDs + "   " +
            isWfhidestagesIDs + " " + requireOnWfTaskstagesIDs + " " + isWfshowstagesIDs + "  " +
            isWfdisablestagesIDs + "  " + isWfenablestagesIDs +
            '        data-groups="' + groups + '" ' + notAllowForGroups +
            '  style="display:' + element.display + '">' +
            '<label for="' + element.InternalName + '" ' + (element.validation || "") + ">" + displayName + "</label>" +
            '<p type="lookupdropdown" data-listname="' + element.source +
            '" data-valfieldkey="' + (element.valfieldkey || "Title") +
            '" data-dispfieldkey="' + dispfieldkey +
            '" data-parentlookupfield="' + (element.parentLookupField || (element.InternalName && element.InternalName.indexOf("dummyfield") !== -1 ? element.InternalName.replace("dummyfield", "") : "KPICode")) +
            '" class="viewmode-value" id="' + element.InternalName + '" ' + ToggleName + "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "lookupfromlookup":
          if (element.BIlanguage == true) {
            if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
              dispfieldkey = element.Dispfieldkey;
            } else {
              dispfieldkey = element.DispfieldkeyEn || element.Dispfieldkey;
            }
          } else {
            dispfieldkey = element.Dispfieldkey;
          }
          var secondDisp = element.secondDispfieldkey || "Name";
          var secondVal = element.secondvalfieldkey || "Title";
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            (element.className || "") + ' " ' + thistip + " " + hidestagesIDs + " " +
            showstagesIDs + "  " + disablestagesIDs + "  " + enablestagesIDs + "   " +
            isWfhidestagesIDs + " " + requireOnWfTaskstagesIDs + " " + isWfshowstagesIDs + "  " +
            isWfdisablestagesIDs + "  " + isWfenablestagesIDs +
            '        data-groups="' + groups + '" ' + notAllowForGroups +
            '  style="display:' + element.display + '">' +
            '<label for="' + element.InternalName + '" ' + (element.validation || "") + ">" + displayName + "</label>" +
            '<p type="lookupfromlookup" data-listname="' + element.source +
            '" data-valfieldkey="' + (element.valfieldkey || "Title") +
            '" data-dispfieldkey="' + dispfieldkey +
            '" data-parentlookupfield="' + (element.parentLookupField || (element.InternalName && element.InternalName.indexOf("dummyfield") !== -1 ? element.InternalName.replace("dummyfield", "") : "KPICode")) +
            '" data-secondsource="' + (element.secondsource || "") +
            '" data-seconddispfieldkey="' + secondDisp +
            '" data-secondvalfieldkey="' + secondVal +
            '" class="viewmode-value" id="' + element.InternalName + '" ' + ToggleName + "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "lookupmultiline":
          if (element.BIlanguage == true) {
            if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
              dispfieldkey = element.Dispfieldkey;
            } else {
              dispfieldkey = element.DispfieldkeyEn || element.Dispfieldkey;
            }
          } else {
            dispfieldkey = element.Dispfieldkey;
          }
          htmlBody =
            '<div class="col-md-6 CFIELD multiline" ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " + thistip +
            ' data-groups="' + groups + '" ' + notAllowForGroups +
            ' style="display:' + element.display + '">' +
            '<label for="' + element.InternalName + '" ' + (element.validation || "") + ">" + displayName + "</label>" +
            '<p type="lookupmultiline" data-listname="' + element.source +
            '" data-valfieldkey="' + (element.valfieldkey || "Title") +
            '" data-dispfieldkey="' + dispfieldkey +
            '" data-parentlookupfield="' + (element.parentLookupField || (element.InternalName && element.InternalName.indexOf("dummyfield") !== -1 ? element.InternalName.replace("dummyfield", "") : "KPICode")) +
            '" class="viewmode-value" id="' + element.InternalName + '" ' + ToggleName + "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "lookupdatetime":
          if (element.BIlanguage == true) {
            if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
              dispfieldkey = element.Dispfieldkey;
            } else {
              dispfieldkey = element.DispfieldkeyEn || element.Dispfieldkey;
            }
          } else {
            dispfieldkey = element.Dispfieldkey;
          }
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " + element.className +
            ' " ' + thistip + " " + hidestagesIDs + " " +
            showstagesIDs + "  " + disablestagesIDs + "  " + enablestagesIDs + "   " +
            isWfhidestagesIDs + " " + requireOnWfTaskstagesIDs + " " + isWfshowstagesIDs + "  " +
            isWfdisablestagesIDs + "  " + isWfenablestagesIDs +
            '        data-groups="' + groups + '" ' + notAllowForGroups +
            ' style="display:' + element.display + '">' +
            '<label for="' + element.InternalName + '" ' + (element.validation || "") + ">" + displayName + "</label>" +
            '<p type="lookupdatetime" data-listname="' + element.source +
            '" data-valfieldkey="' + (element.valfieldkey || "Title") +
            '" data-dispfieldkey="' + dispfieldkey +
            '" data-parentlookupfield="' + (element.parentLookupField || (element.InternalName && element.InternalName.indexOf("dummyfield") !== -1 ? element.InternalName.replace("dummyfield", "") : "KPICode")) +
            '" class="viewmode-value" id="' + element.InternalName + '" ' + ToggleName + "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;
        
        case "LookupPicker":
            if (element.BIlanguage == true) {
                if (
                    localStorage.getItem("lng") == null ||
                    localStorage.getItem("lng") == "ar"
                ) {
                    dispfieldkey = element.Dispfieldkey;
                } else {
                    dispfieldkey = element.DispfieldkeyEn;
                }
            }

            htmlBody =
                '<div class="col-md-6 CFIELD ' +
                dontSubmit +
                " " +
                dontRequest +
                " " +
                dontSubmitRequired +
                " " +
                element.className +
                ' " ' +
                thistip +
                " " +
                hidestagesIDs +
                " " +
                showstagesIDs +
                "  " +
                disablestagesIDs +
                "  " +
                enablestagesIDs +
                "   " +
                isWfhidestagesIDs +
                " " +
                requireOnWfTaskstagesIDs +
                " " +
                isWfshowstagesIDs +
                "  " +
                isWfdisablestagesIDs +
                "  " +
                isWfenablestagesIDs +
                '        data-groups="' +
                groups +
                '" ' +
                notAllowForGroups +
                '  style="display:' +
                element.display +
                '">' +
                '<label for="' +
                element.InternalName +
                '" ' +
                element.validation +
                ">" +
                displayName +
                " " +
                `${
                    element.showlink
                        ? "<span><a class='elementLink' href='javascript:' target='_blank'><i class='fas fa-external-link-alt'></i></a></span>"
                        : ""
                }` +
                "</label>" +
                '<p type="LookupPicker" data-listname="' +
                element.source +
                '" data-valfieldkey="' +
                element.valfieldkey +
                '" data-Dispfieldkey="' +
                dispfieldkey +
                '" data-parentrelatedkeylvl1=' +
                element.fieldsinformlvl1 +
                ' data-parentrelatedvaluelvl1="" data-parentrelatedfilterkeylvl1=' +
                element.sourcefieldlvl1 +
                " data-parentrelatedkeylvl2=" +
                element.fieldsinformlvl2 +
                ' data-parentrelatedvaluelvl2="" data-parentrelatedfilterkeylvl2=' +
                element.sourcefieldlvl2 +
                " data-parentrelatedkey=" +
                element.dynamic +
                ' data-parentrelatedvalue="" data-parentrelatedfilterkey=' +
                element.filterField +
                ' class="viewmode-value" id="' +
                element.InternalName +
                '" ' +
                ToggleName +
                ' data-linkedto="' +
                element.linkedto +
                '" ></p>' +
                "</div>";
            OnSuccess(flag, htmlBody);
            break;
        
        case "lookupWithQuery":
          htmlBody =
            '<div class="col-md-6 CFIELD" ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '    data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            " " +
            `${
              element.showlink
                ? "<span><a class='elementLink' href='javascript:' target='_blank'><i class='fas fa-external-link-alt'></i></a></span>"
                : ""
            }` +
            "</label>" +
            '<p type="lookup" data-listname="' +
            element.source +
            '" data-valfieldkey="' +
            element.valfieldkey +
            '" data-Dispfieldkey="' +
            element.Dispfieldkey +
            '" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            ' data-linkedto="' +
            element.linkedto +
            '"></p>' +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "lookupWithDynamicQuery":
          htmlBody =
            '<div class="col-md-6 CFIELD" ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '    data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            " " +
            `${
              element.showlink
                ? "<span><a class='elementLink' href='javascript:' target='_blank'><i class='fas fa-external-link-alt'></i></a></span>"
                : ""
            }` +
            "</label>" +
            '<p type="lookup" data-listname="' +
            element.source +
            '" data-valfieldkey="' +
            element.valfieldkey +
            '" data-Dispfieldkey="' +
            element.Dispfieldkey +
            '" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            ' data-linkedto="' +
            element.linkedto +
            '"></p>' +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "lookupmultiselectwithoutrepeat":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="multiselect" class="viewmode-value" data-valfieldkey="' +
            element.valfieldkey +
            '" data-dispfieldkey="' +
            element.Dispfieldkey +
            '" data-listname="' +
            element.source +
            '" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "lookupmultiselect":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            // " " +
            // `${element.showlink ? "<span><a class='elementLink' href='javascript:' target='_blank'><i class='fas fa-external-link-alt'></i></a></span>" : ""}` +
            "</label>" +
            '<p type="multiselect" class="viewmode-value" data-valfieldkey="' +
            element.valfieldkey +
            '" data-dispfieldkey="' +
            element.Dispfieldkey +
            '" data-listname="' +
            element.source +
            '" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            ' data-parentrelatedkeylvl1="' +
            element.fieldsinformlvl1 +
            '" data-parentrelatedvaluelvl1="" data-parentrelatedfilterkeylvl1="' +
            element.sourcefieldlvl1 +
            '" data-parentrelatedkeylvl2="' +
            element.fieldsinformlvl2 +
            '" data-parentrelatedvaluelvl2="" data-parentrelatedfilterkeylvl2="' +
            element.sourcefieldlvl2 +
            '" data-linkedto="' +
            element.linkedto +
            '"></p>' +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "lookupchildtoparentmultiselect":
          var fieldTargetList = "";
          var fieldmasterkey = "";
          if (
            element.fieldtargetlist &&
            element.fieldtargetlist != "undefined"
          ) {
            fieldTargetList = `data-fieldTargetList=${element.fieldtargetlist}`;
            fieldmasterkey = `data-fieldmasterkey=${element.fieldmasterkey}`;
          }

          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            // " " +
            // `${element.showlink ? "<span><a class='elementLink' href='javascript:' target='_blank'><i class='fas fa-external-link-alt'></i></a></span>" : ""}` +
            "</label>" +
            '<p type="multiselect" class="viewmode-value" data-valfieldkey="' +
            element.valfieldkey +
            '" data-dispfieldkey="' +
            element.Dispfieldkey +
            '" data-listname="' +
            element.source +
            '" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            'data-parentrelatedkeylvl1="' +
            element.fieldsinformlvl1 +
            '" data-parentrelatedvaluelvl1="" data-parentrelatedfilterkeylvl1="' +
            element.sourcefieldlvl1 +
            '" data-parentrelatedkeylvl2="' +
            element.fieldsinformlvl2 +
            '" data-parentrelatedvaluelvl2="" data-parentrelatedfilterkeylvl2="' +
            element.sourcefieldlvl2 +
            '" data-linkedto="' +
            element.linkedto +
            '" ' +
            fieldTargetList +
            " " +
            fieldmasterkey +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;
        case "multiselect":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="multiselect" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "multiline":
          htmlBody =
            '<div class="col-md-6 CFIELD multiline" ' +
            dontSubmit +
            " " +
            dontRequest +
            " " +
            dontSubmitRequired +
            " " +
            " " +
            thistip +
            ' data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="text" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "breakline":
          htmlBody = '<div class="col-md-12"></div>';
          OnSuccess(flag, htmlBody);
          break;
        case "anchor":
          htmlBody =
            '<div class="col-md-3 CFIELD ' +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            editableBy +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '       data-groups="' +
            groups +
            '" ' +
            notAllowForGroups +
            ' style="display:' +
            element.display +
            '">' +
            "<a " +
            ToggleName +
            ' href="' +
            element.href +
            '" ' +
            dynamic +
            ' class="formLink" id="' +
            element.InternalName +
            '" ' +
            element.state +
            " " +
            element.validation +
            " target='_blank'>" +
            displayName +
            '<i class="icon-plus"></i>' +
            "</a>" +
            "</div>";
          // htmlBody = '<div class="col-md-12"></div>';
          OnSuccess(flag, htmlBody);
          break;

        case "file":
          htmlBody = "";
          OnSuccess(flag, htmlBody);
          break;
      }
      //return htmlBody;
    } else {
      OnSuccess(flag, htmlBody);
    }
   
  },
  g: {
    htmlText: "",
    htmlElement: "",
  },
};
//dynamic fields that change data
var Dynamic_Data_Request = {
  onSuccess: function (sender, args) {
    $("[dynamic=" + Dynamic_Data_Request.g.dyfieldname + "]").each(function () {
      switch ($(this).attr("type")) {
        case "date":
          var d =
            oListItem.get_item("" + $(this).attr("id") + "") == null
              ? "empty"
              : oListItem.get_item("" + $(this).attr("id") + "");
          if (d != "empty") {
            var local = d.getTime();
            var offset = d.getTimezoneOffset() * (60 * 1000);
            var utc = new Date(local + offset);
            var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
            var datetouse = riyadh
              .toLocaleString("en-US")
              .split(",")[0]
              .split("/");
            datetouse[0] =
              datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
            datetouse[1] =
              datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
            var datetouse2 =
              datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];
          }
          $(this).val(datetouse2);
          break;

        case "datetime-local":
          var d =
            oListItem.get_item("" + $(this).attr("id") + "") == null
              ? "empty"
              : oListItem.get_item("" + $(this).attr("id") + "");
          if (d != "empty") {
            var local = d.getTime();
            var offset = d.getTimezoneOffset() * (60 * 1000);
            var utc = new Date(local + offset);
            var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
            var datetouse = riyadh
              .toLocaleString("en-US")
              .split(",")[0]
              .split("/");
            datetouse[0] =
              datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
            datetouse[1] =
              datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
            var datetouse2 =
              datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];
          }
          $(this).val(datetouse2);
          break;
        case "picker":
          var pemail =
            oListItem.get_item("" + $(this).attr("id") + "") == null
              ? "ادخل الإسم أو البريد الإلكتروني ..."
              : oListItem
                  .get_item("" + $(this).attr("id") + "")
                  .get_lookupValue();
          $(this).attr("data-email", pemail);
          var idinternal = $(this).attr("id");
          var mp = new MyPeoplePicker();
          mp.init($(this).attr("id"), {
            AllowMultipleValues: false,
          });
          break;
        case "multipicker":
          var pemail =
            oListItem.get_item("" + $(this).attr("id") + "") == null
              ? "ادخل الإسم أو البريد الإلكتروني ..."
              : oListItem
                  .get_item("" + $(this).attr("id") + "")
                  .get_lookupValue();
          $(this).attr("data-email", pemail);
          var idinternal = $(this).attr("id");
          var mp = new MyPeoplePicker();
          mp.init($(this).attr("id"), {
            AllowMultipleValues: true,
          });
          break;

        case "dropdown":
          $(this).val(oListItem.get_item("" + $(this).attr("id") + ""));

          break;

        case "radio":
          $('input[id="' + $(this).attr("id") + '"]')
            .filter('[value="' + oListItem.get_item($(this).attr("id")) + '"]')
            .attr("checked", true);
          break;

        case "checkbox":
          if (oListItem.get_item($(this).attr("id")))
            $(this).prop("checked", true);
          break;

        case "multiselect":
          if (oListItem.get_item($(this).attr("myfield"))) {
            var myselections = oListItem
              .get_item($(this).attr("myfield"))
              .split(":::");
            for (var i = 0; i < myselections.length; i++) {
              $(this)
                .find("input:checkbox[value='" + myselections[i] + "']")
                .prop("checked", true);
            }
          }
          break;

        case "number":
        case "float":
          if ($(this).hasClass("percentagefield")) {
            var num = oListItem.get_item($(this).attr("id")) * 100;
            if (num % 1 != 0)
              $(this).val(parseFloat(Math.round(num * 100) / 100).toFixed(2));
            else $(this).val(num);
          } else {
            $(this).val(oListItem.get_item("" + $(this).attr("id") + ""));
            var valFromList =
              oListItem.get_item("" + $(this).attr("id") + "") || "";

            // disable enable master details section on projects depends on Amount
            if (valFromList) {
              if (listkey == "projects") {
                $(
                  "[data-target_list=Deliverables] .fieldset-container"
                ).removeClass("disable_section");
                $(
                  "[data-target_list=Milestones] .fieldset-container"
                ).removeClass("disable_section");
              }
            } else {
              if (listkey == "projects") {
                $(
                  "[data-target_list=Deliverables] .fieldset-container"
                ).addClass("disable_section");
                $("[data-target_list=Milestones] .fieldset-container").addClass(
                  "disable_section"
                );
              }
            }
          }
          break;

        default:
          $(this).val(oListItem.get_item("" + $(this).attr("id") + ""));
          break;
      }
    });
    if (
      listkey == "projects" &&
      Dynamic_Data_Request.g.dyfieldname == "BudgetItem"
    ) {
      var From = Dynamic_Data_Request.g.convertdate(oListItem.get_item("From")),
        To = Dynamic_Data_Request.g.convertdate(oListItem.get_item("To"));
      // console.log(From, To);
      var yearFrom = From ? From.split("-")[0] : "",
        dateFromFull = From,
        yearTo = To ? To.split("-")[0] : "";
      var yearDiff = yearTo ? parseInt(yearTo) - parseInt(yearFrom) + 1 : "";
      yearFrom = parseInt(yearFrom) + 2;
      if (yearDiff) {
        $("[id^=Cost]").parent().hide();
        var yeartodisp;
        for (var i = 1; i <= yearDiff; i++) {
          yeartodisp = yearFrom - 3 + i;
          $("#Cost" + i)
            .parent()
            .show();
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            var label =
              $("#Cost" + i)
                .parent()
                .find("label")
                .text()
                .indexOf("لعام") > -1
                ? $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text()
                    .split("لعام")[0] +
                  " لعام " +
                  yeartodisp
                : $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text() +
                  " لعام " +
                  yeartodisp;
          } else {
            var label =
              $("#Cost" + i)
                .parent()
                .find("label")
                .text()
                .indexOf("For Year") > -1
                ? $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text()
                    .split("For Year")[0] +
                  " For Year " +
                  yeartodisp
                : $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text() +
                  " For Year " +
                  yeartodisp;
          }
          $("#Cost" + i)
            .parent()
            .find("label")
            .text(label);
        }
      }
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // The main Initialization function
  init: function (dylistname, dyitemid, dyfieldname) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(dylistname);
    Dynamic_Data_Request.g.oListItem = oList.getItemById(dyitemid); //declared inside object scope only
    Dynamic_Data_Request.g.dyfieldname = dyfieldname;
    oListItem = Dynamic_Data_Request.g.oListItem;
    clientContext.load(Dynamic_Data_Request.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Dynamic_Data_Request.onSuccess),
      Function.createDelegate(this, Dynamic_Data_Request.onError)
    );
  },
  // Global variables
  g: {
    convertdate: function (d) {
      if (d) {
        var local = d.getTime();
        var offset = d.getTimezoneOffset() * (60 * 1000);
        var utc = new Date(local + offset);
        var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
        var datetouse = riyadh.toLocaleString("en-US").split(",")[0].split("/");
        datetouse[0] =
          datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
        datetouse[1] =
          datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
        var datetouse2 = datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];
        d = datetouse2;
      }
      return d;
    },
  },
};
var generalOriginalValue = [];

window.dynamicAffectSelect = {
  // The main Initialization function
  init: function (affectedSelectsInfo) {
    console.log(affectedSelectsInfo, "affectedSelectsInfo");
    if (affectedSelectsInfo.length) {
      var queryFieldValue = affectedSelectsInfo[0].queryFieldValue
        ? affectedSelectsInfo[0].queryFieldValue
        : "";
      var queryFieldName = affectedSelectsInfo[0].queryFieldName
        ? affectedSelectsInfo[0].queryFieldName
        : "";
      queryFieldName =
        queryFieldName && queryFieldName.indexOf("--") >= 0
        ? queryFieldName.split("--")[0]
        : queryFieldName;
      var queryFieldType = affectedSelectsInfo[0].queryFieldType
        ? affectedSelectsInfo[0].queryFieldType
        : "";

      dynamicAffectSelect.g.affectedSelectsInfo = affectedSelectsInfo;
      var clientContext = new SP.ClientContext.get_current();
      var oList = clientContext
        .get_web()
        .get_lists()
        .getByTitle(affectedSelectsInfo[0].listName);
      var camlQuery = new SP.CamlQuery();

      var camlEscape = function (v) {
        if (v === null || v === undefined) {
          return "";
        }
        return String(v)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/"/g, "&quot;");
      };

      var Query = "";
      var valueToFilter = affectedSelectsInfo[0].customFilterValue
        ? affectedSelectsInfo[0].customFilterValue
        : affectedSelectsInfo[0].parentFieldValue;

      if (
        affectedSelectsInfo[0].parentCustomFilterValueFromSibling &&
        affectedSelectsInfo[0].parentCustomFilterValueFromSibling != undefined
      ) {
        queryFieldValue =
          affectedSelectsInfo[0].parentCustomFilterValueFromSibling;
      }

      if (
        listkey == "initiatives" &&
        valueToFilter &&
        valueToFilter == "strategically"
      ) {
        // specially for trategically value
        valueToFilter = "ministry"; // becuse there is a value we use it in GoalStrategy list
      }

      var af = affectedSelectsInfo[0];
      var parseAdditionalFilterRequireTypes = function (v) {
        if (v === null || v === undefined || v === "") {
          return [];
        }
        if (Object.prototype.toString.call(v) === "[object Array]") {
          return v
            .map(function (x) {
              return String(x).trim();
            })
            .filter(Boolean);
        }
        return String(v)
          .split(",")
          .map(function (s) {
            return s.trim();
          })
          .filter(Boolean);
      };
      var additionalEqXml = "";
      if (af.additionalFilterField && af.additionalFilterFromField) {
        var requireTypes = parseAdditionalFilterRequireTypes(
          af.additionalFilterRequireWhenTypes
        );
        var typesFieldId = af.additionalFilterTypesFormField;
        var allowAdditionalByType = true;
        if (requireTypes.length && typesFieldId) {
          var formTypeVal = $("#" + typesFieldId).val();
          var typeMatches =
            formTypeVal &&
            requireTypes.indexOf(String(formTypeVal).trim()) >= 0;
          var $addSrcCheck = $("#" + af.additionalFilterFromField);
          var additionalSrcHasValue =
            $addSrcCheck.length &&
            String($addSrcCheck.val() || "").trim() !== "";
          // Apply extra CAML when Types matches the configured list, OR when the
          // source field (e.g. SubSector) has a value — otherwise vision/strategic
          // flows never filter SOs by deputyship and changing SubSector looks "stuck".
          allowAdditionalByType = typeMatches || additionalSrcHasValue;
        } else if (requireTypes.length && !typesFieldId) {
          allowAdditionalByType = false;
        }
        if (allowAdditionalByType) {
          var $addSrc = $("#" + af.additionalFilterFromField);
          var useLookupId =
            af.additionalFilterLookupId === true ||
            af.additionalFilterLookupId === "true";
          if (useLookupId) {
            var optId = $addSrc
              .find("option:selected")
              .attr("option-id");
            if (optId) {
              additionalEqXml =
                "<Eq><FieldRef Name=\"" +
                af.additionalFilterField +
                '" LookupId="TRUE"/><Value Type="Integer">' +
                camlEscape(optId) +
                "</Value></Eq>";
            }
          } else {
            var addValRaw = $addSrc.val();
            if (addValRaw) {
              var addValEsc = camlEscape(addValRaw);
              var addType = af.additionalFilterFieldType || "Text";
              additionalEqXml =
                "<Eq><FieldRef Name=\"" +
                af.additionalFilterField +
                '"/><Value Type="' +
                addType +
                '">' +
                addValEsc +
                "</Value></Eq>";
            }
          }
        }
      }

      var hasLevelFilter =
        queryFieldValue &&
        queryFieldValue != "undefined" &&
        queryFieldName &&
        queryFieldName != "undefined" &&
        queryFieldType &&
        queryFieldType != "undefined";

      var valueToFilterEsc = camlEscape(valueToFilter);
      var queryFieldValueEsc = camlEscape(queryFieldValue);

      // SharePoint CAML: each <And> must have exactly two children — never three <Eq> in one <And>
      var buildCamlAnd = function (parts) {
        var list = parts.filter(function (p) {
          return p && String(p).length > 0;
        });
        if (!list.length) {
          return "";
        }
        var acc = list[0];
        for (var i = 1; i < list.length; i++) {
          acc = "<And>" + acc + list[i] + "</And>";
        }
        return acc;
      };

      var neqDeletion =
        '<Neq><FieldRef Name="DeletionStatus" /><Value Type="Text">Deleted</Value></Neq>';

      if (
        affectedSelectsInfo[0].isCustomFilterValue === "true" &&
        !affectedSelectsInfo[0].customFilterValue
      ) {
        Query = `<View><Query>
        <Where>
          <Neq><FieldRef Name="DeletionStatus" /><Value Type="Text">Deleted</Value></Neq>
          </Where>
        <OrderBy><FieldRef Name="Name" Ascending="True"/></OrderBy></Query></View>`;
      } else if (hasLevelFilter) {
        var eqStrategy =
          "<Eq><FieldRef Name=\"" +
          affectedSelectsInfo[0].filterField +
          '"/><Value Type="' +
          affectedSelectsInfo[0].filterFieldType +
          '">' +
          valueToFilterEsc +
          "</Value></Eq>";
        var eqLevel =
          "<Eq><FieldRef Name=\"" +
          queryFieldName +
          '" /><Value Type="' +
          queryFieldType +
          '">' +
          queryFieldValueEsc +
          "</Value></Eq>";
        var innerParts = [eqStrategy];
        if (additionalEqXml) {
          innerParts.push(additionalEqXml);
        }
        innerParts.push(eqLevel);
        var whereInner = buildCamlAnd([neqDeletion].concat(innerParts));
        Query =
          "<View><Query><Where>" +
          whereInner +
          '</Where><OrderBy><FieldRef Name="Name" Ascending="True"/></OrderBy></Query></View>';
      } else {
        var eqOnlyStrategy =
          "<Eq><FieldRef Name=\"" +
          affectedSelectsInfo[0].filterField +
          '"/><Value Type="' +
          affectedSelectsInfo[0].filterFieldType +
          '">' +
          valueToFilterEsc +
          "</Value></Eq>";
        if (additionalEqXml) {
          var whereInner2 = buildCamlAnd([
            neqDeletion,
            eqOnlyStrategy,
            additionalEqXml,
          ]);
          Query =
            "<View><Query><Where>" +
            whereInner2 +
            '</Where><OrderBy><FieldRef Name="Name" Ascending="True"/></OrderBy></Query></View>';
        } else {
          Query =
            "<View><Query><Where>" +
            buildCamlAnd([neqDeletion, eqOnlyStrategy]) +
            '</Where><OrderBy><FieldRef Name="Name" Ascending="True"/></OrderBy></Query></View>';
        }

        //change FieldRef to Name and Acending True to can sort alphapetics arabic and english
        //FieldRef Name="Created" Ascending="True"(if we want to sort to alphapetics you need to Name='Name' and  Ascending='True')
      }

      console.log('current query',Query);
      camlQuery.set_viewXml(Query);

      dynamicAffectSelect.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
      clientContext.load(dynamicAffectSelect.g.collListItem);
      dynamicAffectSelect.g.asyncCascadeSeq =
        (dynamicAffectSelect.g.asyncCascadeSeq || 0) + 1;
      var cascadeStartedSeq = dynamicAffectSelect.g.asyncCascadeSeq;
      clientContext.executeQueryAsync(
        function (sender, args) {
          if (cascadeStartedSeq !== dynamicAffectSelect.g.asyncCascadeSeq) {
            return;
          }
          dynamicAffectSelect.onSuccess(sender, args);
        },
        function (sender, args) {
          if (cascadeStartedSeq !== dynamicAffectSelect.g.asyncCascadeSeq) {
            return;
          }
          dynamicAffectSelect.onError(sender, args);
        }
      );
      // }
    }
  },
  onSuccess: function (sender, args) {
    var collListItem = dynamicAffectSelect.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    let affectedSelectsInfo = dynamicAffectSelect.g.affectedSelectsInfo[0];

    var targetFieldType = "";
    if (affectedSelectsInfo && affectedSelectsInfo != "undefined") {
      targetFieldType = $(`#${affectedSelectsInfo.affectedFieldName}`).attr(
        "type"
      );
    }

    let selectedVal = "";
    let optionsBody = "";

    var getSiblingsValues = [];

    if (affectedSelectsInfo && affectedSelectsInfo != "undefined") {
      $(`#${affectedSelectsInfo.affectedFieldName} > option`).each(function () {
        //
        var dataSeblingValue = $(this).data("siblingvalue");
        var optionValue = $(this).attr("value");
        var optionId = $(this).attr("option-id");
        var textOption = $(this).text();
        //
        var arraysiblingsVal = $(this).attr("data-arraysiblingvalues");

        if (arraysiblingsVal && arraysiblingsVal != "undefined") {
          getSiblingsValues.push({
            id: optionId,
            arraySiblings: arraysiblingsVal,
          });
        }

        if (
          optionId &&
          dataSeblingValue &&
          dataSeblingValue != "undefined" &&
          optionValue
        ) {
          generalOriginalValue.push({
            id: optionId,
            siblingvalue: dataSeblingValue,
            value: optionValue,
            textOption: textOption,
            affectedFieldName: affectedSelectsInfo.affectedFieldName,
          });
        }
      });
    }

    if (targetFieldType == "multiselect") {
      selectedVal = $(
        `ul#${affectedSelectsInfo.affectedFieldName} ul.dropdown-menu`
      )
        .find("input:checked")
        .map(function () {
          //getting selected choices
          return $(this).val();
        })
        .get();

      $(`ul#${affectedSelectsInfo.affectedFieldName} ul.dropdown-menu`).html(
        ""
      );
    } else {
      // selectedVal = $(`select#${affectedSelectsInfo.affectedFieldName}`).attr("value"); // get selected val to use it in edit

      // to filter the value in cr
      var $affectedSelect = $(`select#${affectedSelectsInfo.affectedFieldName}`);
      if (listkey == "changerequest") {
        selectedVal = $affectedSelect.val(); // get selected val to use it in edit
      } else if (
        typeof ListInfo !== "undefined" &&
        ListInfo.g &&
        ListInfo.g.getEffectiveFieldValue
      ) {
        selectedVal = ListInfo.g.getEffectiveFieldValue($affectedSelect);
      } else {
        selectedVal =
          $affectedSelect.attr("value") ||
          $affectedSelect.val() ||
          $affectedSelect.attr("data-lookup-value") ||
          "";
      }

      $affectedSelect.html("");

      optionsBody =
        '<option class="Resources" value="" selected="" disabled=""></option>'; // to not choose the first value in dropdown
    }
    var optionsArray = [];
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      let dispfieldkey = oListItem.get_item(
        `${affectedSelectsInfo.dispFieldKey}`
      );
      let valfieldkey = oListItem.get_item(
        `${affectedSelectsInfo.valFieldKey}`
      );
      if (dispfieldkey && dispfieldkey.length > 100) {
        var optionText = dispfieldkey.substr(0, 100) + "...";
      } else {
        var optionText = dispfieldkey;
      }

      if (targetFieldType == "multiselect") {
        optionsArray.push({id:affectedSelectsInfo.affectedFieldName,value:valfieldkey,text:dispfieldkey});
      } else {
        if (getSiblingsValues.length) {
          getSiblingsValues.forEach((el) => {
            if (el.id == oListItem.get_id()) {
              optionsArray.push({sibling:el.arraySiblings, id:oListItem.get_id(),value:valfieldkey,text:optionText});
            }
          });
        } else {
          //affectedSelectsInfo.fromCr add to get the data when chosse edit in edit section cr
          if (
            listkey == "changerequest" &&
            isRoleDataLevelAccess &&
            !affectedSelectsInfo.fromCr
          ) {
          } else {
              optionsArray.push({id:oListItem.get_id(),value:valfieldkey,text:optionText});
          }
        }
      }
    }
    console.log(optionsArray,'optionsArrayoptionsArray');
    // to handle the change request when dynamic change in roles
    //affectedSelectsInfo.fromCr add to not assign new option body when data request when edit

    if (
      listkey == "changerequest" &&
      isRoleDataLevelAccess &&
      !affectedSelectsInfo.fromCr
    ) {
      generalOriginalValue.forEach((el) => {
        if (
          el.siblingvalue == affectedSelectsInfo.customFilterValue &&
          el.affectedFieldName == affectedSelectsInfo.affectedFieldName
        ) {
          optionsBody +=
            '<option option-id="' +
            el.id +
            '" value="' +
            el.value +
            '">' +
            el.textOption +
            "</option>";
        }
      });
    }
    optionsArray.sort(function(a, b) {
      var textA = a.text.toUpperCase();
      var textB = b.text.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    if((targetFieldType == "multiselect")){
        optionsArray.forEach(function(option) {
          optionsBody += `<label class="grp-select">${option.value}</label>
          <li>
          <div class="checkbox">
          <label>
            <input value="${option.value}" id="${option.id}" type="checkbox">
            ${option.text}
          </label>
          </div>
          </li>
          `;
      });
    }
    else
    if(getSiblingsValues.length){
      optionsArray.forEach(function(option) {
        optionsBody +=
        "<option data-arraysiblingvalues=" +
        option.sibling +
        ' option-id="' +
        option.id +
        '" value="' +
        option.value +
        '">' +
        option.text +
        "</option>";
    });
    }
  else {
    optionsArray.forEach(function(option) {
      optionsBody +=
          '<option option-id="' +
          option.id +
          '" value="' +
          option.value +
          '">' +
          option.text +
          '</option>';
  });
  }
    if (targetFieldType == "multiselect") {
      $(`ul#${affectedSelectsInfo.affectedFieldName} ul.dropdown-menu`).html(
        optionsBody
      );
      $(`ul#${affectedSelectsInfo.affectedFieldName} ul.dropdown-menu li`).each(
        function () {
          var liInputValue = $(this).find("input").val();

          if (selectedVal.includes(liInputValue)) {
            $(this).find("input").attr("checked", true);
          }
        }
      );
    } else {
      var $affectedSelectRestore = $(
        `select#${affectedSelectsInfo.affectedFieldName}`
      );
      $affectedSelectRestore.html(optionsBody);

      var valueExistsInOptions =
        !!selectedVal &&
        optionsArray.some(function (option) {
          return (
            option &&
            option.value != null &&
            String(option.value).toLowerCase() ===
              String(selectedVal).toLowerCase()
          );
        });

      if (
        valueExistsInOptions &&
        typeof ListInfo !== "undefined" &&
        ListInfo.g &&
        ListInfo.g.setSelectFieldValue
      ) {
        // Restore only when SO is still valid for the new filter (real Name option).
        ListInfo.g.setSelectFieldValue($affectedSelectRestore, selectedVal, {
          createIfMissing: false,
        });
      } else if (
        !selectedVal &&
        typeof ListInfo !== "undefined" &&
        ListInfo.g &&
        ListInfo.g.clearSelectFieldValue
      ) {
        ListInfo.g.clearSelectFieldValue($affectedSelectRestore);
      } else {
        // Value not in refreshed options (or still loading): show empty, never invent Title text.
        // Keep data-lookup-value / editLookupValues when selectedVal was captured so edit-load
        // races can restore later; user-driven level change already cleared those attrs.
        $affectedSelectRestore.find("option").prop("selected", false);
        $affectedSelectRestore.find('option[value=""]').prop("selected", true);
        $affectedSelectRestore.val("");
        $affectedSelectRestore.removeAttr("value");
        if (!selectedVal) {
          $affectedSelectRestore.removeAttr("data-lookup-value");
        }
      }
    }

    if (
      listkey == "mainkpi" &&
      Get_Related_Sos_Sector.g &&
      Get_Related_Sos_Sector.g.fromObjective &&
      affectedSelectsInfo
    ) {
      var objectiveFieldName = affectedSelectsInfo.affectedFieldName;
      if (objectiveFieldName === "SubSector") {
        Get_Related_Sos_Sector.applyObjectiveField(
          "SubSector",
          Get_Related_Sos_Sector.g.pendingSubSector
        );
      } else if (objectiveFieldName === "ExternalEntities") {
        Get_Related_Sos_Sector.applyObjectiveField(
          "ExternalEntities",
          Get_Related_Sos_Sector.g.pendingExternalEntities
        );
      }
    }

    // to can filter if there is more one item in array like cr
    dynamicAffectSelect.g.affectedSelectsInfo.shift();

    if (
      listkey == "mainkpi" &&
      Get_Related_Sos_Sector.g &&
      Get_Related_Sos_Sector.g.fromObjective &&
      !dynamicAffectSelect.g.affectedSelectsInfo.length
    ) {
      Get_Related_Sos_Sector.g.fromObjective = false;
      Get_Related_Sos_Sector.g.pendingSubSector = null;
      Get_Related_Sos_Sector.g.pendingExternalEntities = null;
    }

    if (dynamicAffectSelect.g.affectedSelectsInfo.length) {
      // setTimeout(() => {
        dynamicAffectSelect.init(dynamicAffectSelect.g.affectedSelectsInfo);
      // }, 500);
    }
    // dynamicAffectSelect.g.affectedSelectsInfo.length &&
    //   dynamicAffectSelect.init(dynamicAffectSelect.g.affectedSelectsInfo);
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },

  // Global variables
  g: {
    asyncCascadeSeq: 0,
  },
};
//phases-stages
Phases_Data_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Phases_Data_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Phases_Data_Request.g.PhasesArray.push({
        phase: oListItem.get_item("Title"),
      });
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Phases");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><OrderBy><FieldRef Name='ListSort' Ascending='True' /></OrderBy></Query></View>"
    );
    Phases_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Phases_Data_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Phases_Data_Request.onSuccess),
      Function.createDelegate(this, Phases_Data_Request.onError)
    );
  },
  // Global variables
  g: {
    PhasesArray: [],
  },
};
window.Stages_Data_Request = {
  onSuccess: function (sender, args) {
    Stages_Data_Request.g.StagesArray.length = 0;
    var collListItem = Stages_Data_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Stages_Data_Request.g.StagesArray.push({
        phase: oListItem.get_item("RelatedPhase"),
        stage: oListItem.get_item("Title"),
      });
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // The main Initialization function
  init: function (isStrategicProject) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Stages");
    var camlQuery = new SP.CamlQuery();

    if(isStrategicProject != undefined)
    {
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><And><Eq><FieldRef Name='Enabled' /><Value Type='Integer'>1</Value></Eq><Eq><FieldRef Name='IsStrategicProject' /><Value Type='Choice'>"+isStrategicProject+"</Value></Eq></And></And></Where><OrderBy><FieldRef Name='ListSort' Ascending='True' /></OrderBy></Query></View>"
    );
    }
    else
    {camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='Enabled'/><Value Type='Integer'>1</Value></Eq></And></Where><OrderBy><FieldRef Name='ListSort' Ascending='True' /></OrderBy></Query></View>"
    );
    }

    Stages_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Stages_Data_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Stages_Data_Request.onSuccess),
      Function.createDelegate(this, Stages_Data_Request.onError)
    );
  },
  // Global variables
  g: {
    StagesArray: [],
  },
};
//end phases-stages
// window.Initiative_Stages_Data_Request = {
//   onSuccess: function (sender, args) {
//     var collListItem = Initiative_Stages_Data_Request.g.collListItem;
//     var listItemEnum = collListItem.getEnumerator();
//     while (listItemEnum.moveNext()) {
//       var oListItem = listItemEnum.get_current();
//       //   var strategyType = oListItem.get_item('Types') ? oListItem.get_item('Types') : ''
//       //   pillersExist = oListItem.get_item('PillarsExist') ? oListItem.get_item('PillarsExist') : ''
//       //   strategyId = oListItem.get_id()

//       //   $('#RelatedStrategyType').val(strategyType)
//       //   if (listkey == 'sos') {
//       //     $('#RelatedStrategyPillars').val(pillersExist)
//       //   }
//       // }
//       // if (pillersExist === "Yes" || pillersExist == "yes") {
//       //   $('#PillarName').parent().css('display', 'block')
//       //   Get_Pillers_Info.init(strategyId)
//       // } else {
//       //   if (listkey == 'sos') {
//       //     $('#PillarName').parent().css('display', 'none')
//       //   }
//       Initiative_Stages_Data_Request.g.StagesArray.push({
//         phase: oListItem.get_item("RelatedPhase"),
//         stage: oListItem.get_item("Title"),
//       });
//     }
//   },
//   onError: function (sender, args) {
//     console.log(
//       "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
//     );
//   },
//   init: function () {
//     var clientContext = new SP.ClientContext.get_current();
//     var oList = clientContext.get_web().get_lists().getByTitle("IStages");
//     var camlQuery = new SP.CamlQuery();
//     camlQuery.set_viewXml(
//       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='Enabled'/><Value Type='Integer'>1</Value></Eq></And></Where><OrderBy><FieldRef Name='ListSort' Ascending='True' /></OrderBy></Query></View>"
//     );
//     Initiative_Stages_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
//     clientContext.load(Initiative_Stages_Data_Request.g.collListItem);
//     clientContext.executeQueryAsync(
//       Function.createDelegate(this, Initiative_Stages_Data_Request.onSuccess),
//       Function.createDelegate(this, Initiative_Stages_Data_Request.onError)
//     );
//   },
//   // Global variables
//   g: {
//     StagesArray: [],
//   },
// };

//stages initiative request

//end initiative stages request

//get sectors for PCODE
//change var to window
window.Sectors_Info = {
  onSuccess: function (sender, args) {
    Sectors_Info.g.SectorArray = [];
    var collListItem = Sectors_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Sectors_Info.g.SectorArray.push(oListItem.get_item("Title"));
    }
    if (listkey == "initiatives") {
      GetSector_Info.init("Initiatives");
    } else if (listkey == "sos") {
      GetSector_Info.init("SOs");
    } else {
      Projects_Info.init();
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("Internal Entities");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query></Query></View>");
    Sectors_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Sectors_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Sectors_Info.onSuccess),
      Function.createDelegate(this, Sectors_Info.onError)
    );
  },
  // Global variables
  g: {
    SectorArray: [],
  },
};

var GetSector_Info = {
  onSuccess: function (sender, args) {
    var collListItem = GetSector_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      GetSector_Info.g.PSectorArray.push(oListItem.get_item("Sector"));
    }
    window.Sector_Occurrence = []; //for easy debuging
    var countOccurrences = (arr, val) =>
      arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    for (var i = 0; i < Sectors_Info.g.SectorArray.length; i++) {
      var sectorcount = countOccurrences(
        Projects_Info.g.PSectorArray,
        Sectors_Info.g.SectorArray[i]
      );
      Sector_Occurrence.push({
        sector: Sectors_Info.g.SectorArray[i],
        count: sectorcount,
      });
    }

    var year = String(new Date().getFullYear()),
      sectorcode,
      occurence;
    year = year.slice(year.length - 2); //get last 2 characters
    $("select#Sector").change(function () {
      sectorcode = $(this).val();
      if (isNew) {
        occurence =
          countOccurrences(Projects_Info.g.PSectorArray, sectorcode) + 1;
        occurence = occurence < 10 ? "0" + occurence : occurence;
        // PCODE = sectorcode + "-" + year; //+'-'+(occurence) // add +'-'+IID on submission [line 163 in Form_Submit.js]
      }
      Department_Sector_Info.init(sectorcode); //in form_request.js
      // BudgetItem_Sector_Info.init(sectorcode); //in form_request.js removed for initiatives
    });
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function (list) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(list);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query></Query></View>");
    GetSector_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(GetSector_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, GetSector_Info.onSuccess),
      Function.createDelegate(this, GetSector_Info.onError)
    );
  },
  g: {
    PSectorArray: [],
  },
};

var Projects_Info = {
  onSuccess: function (sender, args) {
    var collListItem = Projects_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Projects_Info.g.PSectorArray.push(oListItem.get_item("Sector"));
    }
    window.Sector_Occurrence = []; //for easy debuging
    var countOccurrences = (arr, val) =>
      arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    for (var i = 0; i < Sectors_Info.g.SectorArray.length; i++) {
      var sectorcount = countOccurrences(
        Projects_Info.g.PSectorArray,
        Sectors_Info.g.SectorArray[i]
      );
      Sector_Occurrence.push({
        sector: Sectors_Info.g.SectorArray[i],
        count: sectorcount,
      });
    }
    var year = String(new Date().getFullYear()),
      sectorcode,
      occurence;
    year = year.slice(year.length - 2); //get last 2 characters
    $("select#Sector").change(function () {
      sectorcode = $(this).val();
      if (isNew) {
        occurence =
          countOccurrences(Projects_Info.g.PSectorArray, sectorcode) + 1;
        occurence = occurence < 10 ? "0" + occurence : occurence;
        // PCODE = sectorcode + "-" + year; //+'-'+(occurence) // move it to set code submit to can save the code correctly if the sector be auto generated
        // $('#Title').val(PCODE);
        // console.log(PCODE);
      }
      Department_Sector_Info.init(sectorcode); //in form_request.js
      // BudgetItem_Sector_Info.init(sectorcode); //in form_request.js
    });
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle(ListArray[0].projects);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query></Query></View>");
    Projects_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Projects_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Projects_Info.onSuccess),
      Function.createDelegate(this, Projects_Info.onError)
    );
  },
  // Global variables
  g: {
    PSectorArray: [],
  },
};
//end PCODE

// var GetProject_Info = {
//   onSuccess: function (sender, args) {
//     // if (listkey == "deliverables") {
//     //   deliverabePercent.init();
//     // }
//     var collListItem = GetProject_Info.g.collListItem;
//     var listItemEnum = collListItem.getEnumerator();
//     var PID, stage, ismultistage;
//     while (listItemEnum.moveNext()) {
//       var oListItem = listItemEnum.get_current();
//       PID = oListItem.get_id();
//       stage = oListItem.get_item("Stage");
//       if (stage) {
//         ismultistage = stage.indexOf(";") > -1;
//       }
//       if (ismultistage) {
//         stage = stage.split(";");
//       }
//     }
//     if (listkey == "projects" && IID) {
//       if (ismultistage) {
//         $.each(stage, function (index, value) {
//           if (!USERisWF) {
//             $(".CFIELD[data-hidestageID=" + value + "]").remove();
//             $(".CFIELD[data-showstageID=" + value + "]").show();
//             $(
//               ".CFIELD[data-disablestageID=" +
//               value +
//               "] input,.CFIELD[data-enablestageID=" +
//               value +
//               "] .PPField ,.CFIELD[data-disablestageID=" +
//               value +
//               "] select,.CFIELD[data-disablestageID=" +
//               value +
//               "] textarea"
//             ).attr("disabled", true);
//             $(
//               ".CFIELD[data-enablestageID=" +
//               value +
//               "] input,.CFIELD[data-enablestageID=" +
//               value +
//               "] .PPField ,.CFIELD[data-enablestageID=" +
//               value +
//               "] select,.CFIELD[data-enablestageID=" +
//               value +
//               "] textarea"
//             ).attr("disabled", false);
//           } else {
//             $(".CFIELD[data-isWfhidestageID=" + value + "]").remove();
//             $(".CFIELD[data-isWfshowstageID=" + value + "]").show();
//             $(
//               ".CFIELD[data-isWfdisablestageID=" +
//               value +
//               "] input,.CFIELD[data-isWfenablestageID=" +
//               value +
//               "] .PPField ,.CFIELD[data-isWfdisablestageID=" +
//               value +
//               "] select,.CFIELD[data-isWfdisablestageID=" +
//               value +
//               "] textarea"
//             ).attr("disabled", true);
//             $(
//               ".CFIELD[data-isWfenablestageID=" +
//               value +
//               "] input,.CFIELD[data-isWfenablestageID=" +
//               value +
//               "] .PPField ,.CFIELD[data-isWfenablestageID=" +
//               value +
//               "] select,.CFIELD[data-isWfenablestageID=" +
//               value +
//               "] textarea"
//             ).attr("disabled", false);
//             $("[data-isWfrequirestageID=" + value + "] label").attr({
//               required: true,
//             });
//             $(
//               "[data-isWfrequirestageID=" +
//               value +
//               "] input,[data-isWfrequirestageID=" +
//               value +
//               "] select,[data-isWfrequirestageID=" +
//               value +
//               "] textarea,[data-isWfrequirestageID=" +
//               value +
//               "] .PPField"
//             ).prop("required", true);
//           }
//         });
//       } else {
//         if (!USERisWF) {
//           $(".CFIELD[data-hidestageID=" + stage + "]").remove();
//           $(".CFIELD[data-showstageID=" + stage + "]").show();
//           $(
//             ".CFIELD[data-disablestageID=" +
//             stage +
//             "] input,.CFIELD[data-enablestageID=" +
//             stage +
//             "] .PPField ,.CFIELD[data-disablestageID=" +
//             stage +
//             "] select,.CFIELD[data-disablestageID=" +
//             stage +
//             "]"
//           ).attr("disabled", true);
//           $(
//             ".CFIELD[data-enablestageID=" +
//             stage +
//             "] input,.CFIELD[data-enablestageID=" +
//             stage +
//             "] .PPField ,.CFIELD[data-enablestageID=" +
//             stage +
//             "] select,.CFIELD[data-enablestageID=" +
//             stage +
//             "]"
//           ).attr("disabled", false);
//         } else {
//           $(".CFIELD[data-isWfhidestageID=" + stage + "]").remove();
//           $(".CFIELD[data-isWfshowstageID=" + stage + "]").show();
//           $(
//             ".CFIELD[data-isWfdisablestageID=" +
//             stage +
//             "] input,.CFIELD[data-isWfenablestageID=" +
//             stage +
//             "] .PPField ,.CFIELD[data-isWfdisablestageID=" +
//             stage +
//             "] select,.CFIELD[data-isWfdisablestageID=" +
//             stage +
//             "] textarea"
//           ).attr("disabled", true);
//           $(
//             ".CFIELD[data-isWfenablestageID=" +
//             stage +
//             "] input,.CFIELD[data-isWfenablestageID=" +
//             stage +
//             "] .PPField ,.CFIELD[data-isWfenablestageID=" +
//             stage +
//             "] select,.CFIELD[data-isWfenablestageID=" +
//             stage +
//             "] textarea"
//           ).attr("disabled", false);
//           $("[data-isWfrequirestageID=" + stage + "] label").attr({
//             required: true,
//           });
//           $(
//             "[data-isWfrequirestageID=" +
//             stage +
//             "] input,[data-isWfrequirestageID=" +
//             stage +
//             "] select,[data-isWfrequirestageID=" +
//             stage +
//             "] textarea,[data-isWfrequirestageID=" +
//             stage +
//             "] .PPField"
//           ).prop("required", true);
//         }
//       }
//     }
//     if (PCODE) {
//       $(".headtwo").append(
//         '<a class="" href="' +
//         _spPageContextInfo.webAbsoluteUrl +
//         '"><span class="litem">Home</span></a>' +
//         '<a class="" href="' +
//         _spPageContextInfo.webAbsoluteUrl +
//         "/SitePages/View.aspx?ListKey=projects&IID=" +
//         PID +
//         '"><span data-trans-projectdetails class="litem Resources"></span></a>' //+
//         //'<a class="" href="'+_spPageContextInfo.webAbsoluteUrl+'"><span class="litem">Project Phase</span></a>'+
//         //'<a class="" href="'+_spPageContextInfo.webAbsoluteUrl+'"><span class="litem">Project Report</span></a>'
//       );
//     }
//     // GetProject_Info.g.notificationappen();
//     // Risks_Info_Request.init();
//     // Issues_Info_Request.init();
//   },
//   onError: function (sender, args) {
//     console.log(
//       "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
//     );
//   },
//   // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
//   preinit: function () {
//     if ($(".ms-Icon--Settings").length) {
//       clearInterval(checkNotificationHTML);
//       SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
//         GetProject_Info.init();
//       });
//     }
//   },
//   // The main Initialization function
//   init: function () {
//     // console.log('asdf');
//     var clientContext = new SP.ClientContext.get_current();
//     var oList = clientContext
//       .get_web()
//       .get_lists()
//       .getByTitle(ListArray[0].projects);
//     var camlQuery = new SP.CamlQuery();
//     var PQUERY;
//     if (PCODE) {
//       PQUERY =
//         "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='Title'/><Value Type='Text'>" +
//         PCODE +
//         "</Value></Eq></And></Where></Query><RowLimit>1</RowLimit></View>";
//     } else if (listkey == "projects" && IID) {
//       PQUERY =
//         "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='ID'/><Value Type='Integer'>" +
//         IID +
//         "</Value></Eq></And></Where></Query><RowLimit>1</RowLimit></View>";
//     } else {
//       PQUERY =
//         "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query></View>";
//     }

//     camlQuery.set_viewXml(PQUERY);
//     GetProject_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
//     clientContext.load(GetProject_Info.g.collListItem);
//     clientContext.executeQueryAsync(
//       Function.createDelegate(this, GetProject_Info.onSuccess),
//       Function.createDelegate(this, GetProject_Info.onError)
//     );
//   },
//   // Global variables
//   g: {
//     notificationappen: function () {
//       if (PCODE) {
//         $("#O365_SearchBoxContainer_container").append(
//           '<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="0"></i><a href="' +
//           _spPageContextInfo.webAbsoluteUrl +
//           "/SitePages/Listing.aspx?ListKey=tasks&PCODE=" +
//           PCODE +
//           '">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="0"></i><a href="/sites/SPM/SitePages/Listing.aspx?ListKey=risks&PCODE=' +
//           PCODE +
//           '">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="0"></i><a href="' +
//           _spPageContextInfo.webAbsoluteUrl +
//           "/SitePages/Listing.aspx?ListKey=issues&PCODE=" +
//           PCODE +
//           '"">Issues</a></span></div><div class="UProfile"></div></div>'
//         );
//       } else {
//         $("#O365_SearchBoxContainer_container").append(
//           '<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="0"></i><a href="' +
//           _spPageContextInfo.webAbsoluteUrl +
//           '/SitePages/Listing.aspx?ListKey=tasks">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="0"></i><a href="' +
//           _spPageContextInfo.webAbsoluteUrl +
//           '/SitePages/Listing.aspx?ListKey=risks">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="0"></i><a href="' +
//           _spPageContextInfo.webAbsoluteUrl +
//           '/SitePages/Listing.aspx?ListKey=issues">Issues</a></span></div><div class="UProfile"></div></div>'
//         );
//       }
//     },
//   },
// };

var GetProject_Info = {
  onSuccess: function (sender, args) {
    var collListItem = GetProject_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var PID, stage, ismultistage;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      PID = oListItem.get_id();
      stage = oListItem.get_item("Stage");
      if (stage) {
        ismultistage = stage.indexOf(";") > -1;
      }
      if (ismultistage) {
        stage = stage.split(";");
      }
    }
    // if (listkey == "projects" && IID) {
    if (ismultistage) {
      $.each(stage, function (index, value) {
        if (!USERisWF) {
          $(
            '.section-container [data-hidestageID*="allstages"], .section-container [data-hidestageID*=' +
              value +
              "]"
          ).each(function () {
            let tabId = $(this).parent().attr("id");
            $(`.form-tabs .nav-link[href="#${tabId}"]`).remove();
          });

          $('[data-hidestageID*="allstages"]').remove();

          $(".CFIELD[data-hidestageID=" + value + "]").remove();
          $(".CFIELD[data-showstageID=" + value + "]").show();

          $("[data-disablestageID]").each(function () {
            var stageofElement = $(this).attr("data-disablestageID");
            if (stageofElement.includes(value)) {
              $(this).children("input").attr("disabled", true);
              $(this).children("select").attr("disabled", true);
              $(this).children(".PPField").attr("disabled", true);
              $(this).children("textarea").attr("disabled", true);
            } else {
              $(this).children("input").attr("disabled", false);
              $(this).children("select").attr("disabled", false);
              $(this).children(".PPField").attr("disabled", false);
              $(this).children("textarea").attr("disabled", false);
            }
          });

          $("[data-enablestageID]").each(function () {
            var stageofElement = $(this).attr("data-enablestageID");
            if (stageofElement.includes(value)) {
              $(this).children("input").attr("disabled", false);
              $(this).children("select").attr("disabled", false);
              $(this).children(".PPField").attr("disabled", false);
              $(this).children("textarea").attr("disabled", false);
            } else {
              $(this).children("input").attr("disabled", true);
              $(this).children("select").attr("disabled", true);
              $(this).children(".PPField").attr("disabled", true);
              $(this).children("textarea").attr("disabled", true);
            }
          });
        } else {
          $(
            '.section-container [data-isWfhidestageID*="allstages"], .section-container [data-isWfhidestageID*="' +
              value +
              '"]'
          ).each(function () {
            let tabId = $(this).parent().attr("id");
            $(`.form-tabs .nav-link[href="#${tabId}"]`).remove();
          });

          $('.CFIELD[data-isWfhidestageID="' + value + '"]').remove();
          $('.CFIELD[data-isWfshowstageID="' + value + '"]').show();

          $("[data-isWfdisablestageID]").each(function () {
            var stageofElement = $(this).attr("data-isWfdisablestageID");
            if (stageofElement.includes(value)) {
              $(this).children("input").attr("disabled", true);
              $(this).children("select").attr("disabled", true);
              $(this).children(".PPField").attr("disabled", true);
              $(this).children("textarea").attr("disabled", true);
            } else {
              $(this).children("input").attr("disabled", false);
              $(this).children("select").attr("disabled", false);
              $(this).children(".PPField").attr("disabled", false);
              $(this).children("textarea").attr("disabled", false);
            }
          });

          $("[data-isWfenablestageID]").each(function () {
            var stageofElement = $(this).attr("data-isWfenablestageID");
            if (stageofElement.includes(value)) {
              $(this).children("input").attr("disabled", false);
              $(this).children("select").attr("disabled", false);
              $(this).children(".PPField").attr("disabled", false);
              $(this).children("textarea").attr("disabled", false);
            } else {
              $(this).children("input").attr("disabled", true);
              $(this).children("select").attr("disabled", true);
              $(this).children(".PPField").attr("disabled", true);
              $(this).children("textarea").attr("disabled", true);
            }
          });

          $('.helpful-info-ctx [data-showstageID*="' + stage + '"]').show();
          $('.helpful-info-ctx [data-showstageID*="allstages"]').show();

          $("[data-isWfrequirestageID]").each(function () {
            var stageofElement = $(this).attr("data-isWfenablestageID");
            if (stageofElement.includes(stage)) {
              $(this).children("label").attr("required", true);
              $(this).children("input").attr("required", true);
              $(this).children("select").attr("required", true);
              $(this).children(".PPField").attr("required", true);
              $(this).children("textarea").attr("required", true);
            }
          });
        }
      });
    } else {
      if (!USERisWF) {
        $(
          `.section-container[data-hidestageID*="allstages"], .section-container[data-hidestageID*="${stage}"]`
        ).each(function () {
          let tabId = $(this).parent().attr("id");
          $(`.form-tabs .nav-link[href="#${tabId}"]`).remove();
        });

        $('[data-hidestageID*="allstages"]').remove();
        $('[data-hidestageID*="' + stage + '"]').remove();
        $('[data-showstageID*="' + stage + '"]').show();
        $('[data-showstageID*="allstages"]').show();

        $("[data-disablestageID]").each(function () {
          var stageofElement = $(this).attr("data-disablestageID");
          if (stageofElement.includes(stage)) {
            $(this).children("input").attr("disabled", true);
            $(this).children("select").attr("disabled", true);
            $(this).children(".PPField").attr("disabled", true);
            $(this).children("textarea").attr("disabled", true);
          } else {
            $(this).children("input").attr("disabled", false);
            $(this).children("select").attr("disabled", false);
            $(this).children(".PPField").attr("disabled", false);
            $(this).children("textarea").attr("disabled", false);
          }
        });

        $("[data-enablestageID]").each(function () {
          var stageofElement = $(this).attr("data-enablestageID");
          if (stageofElement.includes(stage)) {
            $(this).children("input").attr("disabled", false);
            $(this).children("select").attr("disabled", false);
            $(this).children(".PPField").attr("disabled", false);
            $(this).children("textarea").attr("disabled", false);
          } else {
            $(this).children("input").attr("disabled", true);
            $(this).children("select").attr("disabled", true);
            $(this).children(".PPField").attr("disabled", true);
            $(this).children("textarea").attr("disabled", true);
          }
        });
      } else {
        $(
          `.section-container[data-isWfhidestageID*="allstages"], .section-container[data-isWfhidestageID*="${stage}"]`
        ).each(function () {
          let tabId = $(this).parent().attr("id");
          $(`.form-tabs .nav-link[href="#${tabId}"]`).remove();
        });

        $('[data-isWfhidestageID*="' + stage + '"]').remove();
        $('[data-isWfshowstageID*="' + stage + '"]').show();

        $("[data-isWfdisablestageID]").each(function () {
          var stageofElement = $(this).attr("data-isWfdisablestageID");
          if (stageofElement.includes(stage)) {
            $(this).children("input").attr("disabled", true);
            $(this).children("select").attr("disabled", true);
            $(this).children(".PPField").attr("disabled", true);
            $(this).children("textarea").attr("disabled", true);
          } else {
            $(this).children("input").attr("disabled", false);
            $(this).children("select").attr("disabled", false);
            $(this).children(".PPField").attr("disabled", false);
            $(this).children("textarea").attr("disabled", false);
          }
        });

        $("[data-isWfenablestageID]").each(function () {
          var stageofElement = $(this).attr("data-isWfenablestageID");
          if (stageofElement.includes(stage)) {
            $(this).children("input").attr("disabled", false);
            $(this).children("select").attr("disabled", false);
            $(this).children(".PPField").attr("disabled", false);
            $(this).children("textarea").attr("disabled", false);
          } else {
            $(this).children("input").attr("disabled", true);
            $(this).children("select").attr("disabled", true);
            $(this).children(".PPField").attr("disabled", true);
            $(this).children("textarea").attr("disabled", true);
          }
        });

        $('.helpful-info-ctx [data-showstageID*="' + stage + '"]').show();
        $('.helpful-info-ctx [data-showstageID*="allstages"]').show();

        $("[data-isWfrequirestageID]").each(function () {
          var stageofElement = $(this).attr("data-isWfenablestageID");
          if (stageofElement.includes(stage)) {
            $(this).children("label").attr("required", true);
            $(this).children("input").attr("required", true);
            $(this).children("select").attr("required", true);
            $(this).children(".PPField").attr("required", true);
            $(this).children("textarea").attr("required", true);
          }
        });
      }
    }
    // }
    if (PCODE) {
      $(".headtwo").append(
        '<a class="" href="' +
          _spPageContextInfo.webAbsoluteUrl +
          '"><span class="litem">Home</span></a>' +
          '<a class="" href="' +
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/View.aspx?ListKey=projects&IID=" +
          PID +
          '"><span data-trans-projectdetails class="litem Resources"></span></a>' //+
      );
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".ms-Icon--Settings").length) {
      clearInterval(checkNotificationHTML);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        GetProject_Info.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    // console.log('asdf');
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle(ListArray[0].projects);
    var camlQuery = new SP.CamlQuery();
    var PQUERY;
    if (PCODE) {
      PQUERY =
        "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='Title'/><Value Type='Text'>" +
        PCODE +
        "</Value></Eq></And></Where></Query><RowLimit>1</RowLimit></View>";
    } else if (listkey == "projects" && IID) {
      PQUERY =
        "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='ID'/><Value Type='Integer'>" +
        IID +
        "</Value></Eq></And></Where></Query><RowLimit>1</RowLimit></View>";
    } else {
      PQUERY =
        "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query></View>";
    }

    camlQuery.set_viewXml(PQUERY);
    GetProject_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(GetProject_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, GetProject_Info.onSuccess),
      Function.createDelegate(this, GetProject_Info.onError)
    );
  },
  // Global variables
  g: {
    notificationappen: function () {
      if (PCODE) {
        $("#O365_SearchBoxContainer_container").append(
          '<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="0"></i><a href="' +
            _spPageContextInfo.webAbsoluteUrl +
            "/SitePages/Listing.aspx?ListKey=tasks&PCODE=" +
            PCODE +
            '">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="0"></i><a href="/sites/SPM/SitePages/Listing.aspx?ListKey=risks&PCODE=' +
            PCODE +
            '">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="0"></i><a href="' +
            _spPageContextInfo.webAbsoluteUrl +
            "/SitePages/Listing.aspx?ListKey=issues&PCODE=" +
            PCODE +
            '"">Issues</a></span></div><div class="UProfile"></div></div>'
        );
      } else {
        $("#O365_SearchBoxContainer_container").append(
          '<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="0"></i><a href="' +
            _spPageContextInfo.webAbsoluteUrl +
            '/SitePages/Listing.aspx?ListKey=tasks">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="0"></i><a href="' +
            _spPageContextInfo.webAbsoluteUrl +
            '/SitePages/Listing.aspx?ListKey=risks">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="0"></i><a href="' +
            _spPageContextInfo.webAbsoluteUrl +
            '/SitePages/Listing.aspx?ListKey=issues">Issues</a></span></div><div class="UProfile"></div></div>'
        );
      }
    },
  },
};

var deliverabePercent = {
  onSuccess: function (sender, args) {
    var collListItem = deliverabePercent.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      console.warn("weight value!!!!!!!!!", oListItem.get_item("Weight"));
      RevenuesAmount += oListItem.get_item("Weight") || 0;
    }
    console.warn(RevenuesAmount);
    deliverabePercent.g.revenueBudget();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".Container").length) {
      clearInterval(checkStatusHtml);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        deliverabePercent.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Deliverables");
    var camlQuery = new SP.CamlQuery();
    var ReQUERY;
    ReQUERY =
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
      PCODE +
      "</Value></Eq></And></Where></Query></View>";

    camlQuery.set_viewXml(ReQUERY);
    deliverabePercent.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(deliverabePercent.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, deliverabePercent.onSuccess),
      Function.createDelegate(this, deliverabePercent.onError)
    );
  },
  // Global variables
  g: {
    revenueBudget: function () {
      if ($("input#Weight").length) {
        //clearInterval(checkWeightValueHTML);
        RemainingBudget = 100 - RevenuesAmount;
        RemainingBudget = Number(RemainingBudget.toFixed(1));

        var newVal;
        var inpVal;
        if ($("input#Weight").val().includes(".")) {
          inpVal = parseFloat($("input#Weight").val()) || 0;
        } else {
          inpVal = parseInt($("input#Weight").val()) || 0;
        } // if($('input#WeightValue').val() < RemainingBudget){
        newVal =
          RemainingBudget + inpVal >= 100 ? inpVal : RemainingBudget + inpVal;
        newVal = Number(newVal.toFixed("2"));
        RemainingBudget == 100
          ? $("input#Weight").attr("max", RemainingBudget)
          : $("input#Weight").attr("max", newVal);
        // }
        // else{
        //     newVal = parseInt($('input#WeightValue').val())
        //     $('input#WeightValue').attr('max', $('input#WeightValue').val());
        // }
        $("input#Weight")
          .parent()
          .find(" > label")
          .append(
            '<span data-trans-remainperc class="Resources remainpercstyle"></span><span class="remainpercstyle ">' +
              RemainingBudget +
              "]</span>"
          );
        changeResources();
      }
    },
  },
};
// var deliverabeInitiativePercent = {
//   onSuccess: function (sender, args) {
//     var collListItem = deliverabeInitiativePercent.g.collListItem;
//     var listItemEnum = collListItem.getEnumerator();
//     while (listItemEnum.moveNext()) {
//       var oListItem = listItemEnum.get_current();

//       console.warn("weight value!!!!!!!!!", oListItem.get_item("Weight"));
//       RevenuesAmountInit += oListItem.get_item("Weight") || 0;
//     }
//     console.warn(RevenuesAmountInit);
//     deliverabeInitiativePercent.g.revenueBudget();
//   },
//   onError: function (sender, args) {
//     console.log(
//       "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
//     );
//   },
//   // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
//   preinit: function () {
//     if ($(".Container").length) {
//       clearInterval(checkStatusHtml);
//       SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
//         deliverabeInitiativePercent.init();
//       });
//     }
//   },
//   // The main Initialization function
//   init: function () {
//     var clientContext = new SP.ClientContext.get_current();
//     var oList = clientContext
//       .get_web()
//       .get_lists()
//       .getByTitle("InitiativeDeliverables");
//     var camlQuery = new SP.CamlQuery();
//     var ReQUERY;
//     ReQUERY =
//       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
//       ICODE +
//       "</Value></Eq></And></Where></Query></View>";

//     camlQuery.set_viewXml(ReQUERY);
//     deliverabeInitiativePercent.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
//     clientContext.load(deliverabeInitiativePercent.g.collListItem);
//     clientContext.executeQueryAsync(
//       Function.createDelegate(this, deliverabeInitiativePercent.onSuccess),
//       Function.createDelegate(this, deliverabeInitiativePercent.onError)
//     );
//   },
//   // Global variables
//   g: {
//     revenueBudget: function () {
//       if ($("input#Weight").length) {
//         //clearInterval(checkWeightValueHTML);
//         RemainingBudget = 100 - RevenuesAmountInit;
//         RemainingBudget = Number(RemainingBudget.toFixed(1));

//         var newVal;
//         var inpVal;
//         if ($("input#Weight").val().includes(".")) {
//           inpVal = parseFloat($("input#Weight").val()) || 0;
//         } else {
//           inpVal = parseInt($("input#Weight").val()) || 0;
//         }				// if($('input#WeightValue').val() < RemainingBudget){
//         newVal =
//           RemainingBudget + inpVal >= 100 ? inpVal : RemainingBudget + inpVal;
//         newVal = Number(newVal.toFixed("2"));
//         RemainingBudget == 100
//           ? $("input#Weight").attr("max", RemainingBudget)
//           : $("input#Weight").attr("max", newVal);
//         // }
//         // else{
//         //     newVal = parseInt($('input#WeightValue').val())
//         //     $('input#WeightValue').attr('max', $('input#WeightValue').val());
//         // }
//         $("input#Weight")
//           .parent()
//           .find(" > label")
//           .append(
//             '<span data-trans-remainperc class="Resources remainpercstyle"></span><span class="remainpercstyle">' +
//             RemainingBudget +
//             "]</span>"
//           );
//         changeResources();
//       }
//     },
//   },
// };

// var initMilestPercent = {
//   onSuccess: function (sender, args) {
//     var collListItem = initMilestPercent.g.collListItem;
//     var listItemEnum = collListItem.getEnumerator();
//     while (listItemEnum.moveNext()) {
//       var oListItem = listItemEnum.get_current();
//       revenuesAmountInitMiles += oListItem.get_item("Weight") || 0;
//     }
//     console.log(
//       revenuesAmountInitMiles,
//       "revenuesAmountInitMiles revenuesAmountInitMiles"
//     );
//     initMilestPercent.g.revenueBudget();
//   },
//   onError: function (sender, args) {
//     console.log(
//       "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
//     );
//   },
//   init: function () {
//     var clientContext = new SP.ClientContext.get_current();
//     var oList = clientContext
//       .get_web()
//       .get_lists()
//       .getByTitle("InitiativeMilestones");
//     var camlQuery = new SP.CamlQuery();
//     var ReQUERY;
//     ReQUERY =
//       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
//       ICODE +
//       "</Value></Eq></And></Where></Query></View>";

//     camlQuery.set_viewXml(ReQUERY);
//     initMilestPercent.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
//     clientContext.load(initMilestPercent.g.collListItem);
//     clientContext.executeQueryAsync(
//       Function.createDelegate(this, initMilestPercent.onSuccess),
//       Function.createDelegate(this, initMilestPercent.onError)
//     );
//   },
//   g: {
//     revenueBudget: function () {
//       if ($("input#Weight").length) {
//         //clearInterval(checkWeightValueHTML);
//         RemainingBudget = 100 - revenuesAmountInitMiles;
//         RemainingBudget = Number(RemainingBudget.toFixed(1));
//         var newVal;
//         var inpVal;
//         if ($("input#Weight").val().includes(".")) {
//           inpVal = parseFloat($("input#Weight").val()) || 0;
//         } else {
//           inpVal = parseInt($("input#Weight").val()) || 0;
//         }

//         newVal =
//           RemainingBudget + inpVal >= 100 ? inpVal : RemainingBudget + inpVal;
//         newVal = Number(newVal.toFixed("2"));
//         newVal = Number(newVal.toFixed("2"));
//         RemainingBudget == 100
//           ? $("input#Weight").attr("max", RemainingBudget)
//           : $("input#Weight").attr("max", newVal);

//         $("input#Weight")
//           .parent()
//           .find(" > label")
//           .append(
//             '<span data-trans-remainperc class="Resources remainpercstyle"></span><span class="remainpercstyle">' +
//             RemainingBudget +
//             "]</span>"
//           );
//         changeResources();
//       }
//     },
//   },
// };

var benefitmetricsPercent = {
  onSuccess: function (sender, args) {
    var collListItem = benefitmetricsPercent.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      console.warn("weight value!!!!!!!!!", oListItem.get_item("Weight"));
      RevenuesAmount += oListItem.get_item("Weight") || 0;
    }
    console.warn(RevenuesAmount);
    benefitmetricsPercent.g.revenueBudget();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".Container").length) {
      clearInterval(checkStatusHtml);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        benefitmetricsPercent.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("BenefitMetrics");
    var camlQuery = new SP.CamlQuery();
    var ReQUERY;
    ReQUERY =
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
      ICODE +
      "</Value></Eq></And></Where></Query></View>";

    camlQuery.set_viewXml(ReQUERY);
    benefitmetricsPercent.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(benefitmetricsPercent.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, benefitmetricsPercent.onSuccess),
      Function.createDelegate(this, benefitmetricsPercent.onError)
    );
  },
  // Global variables
  g: {
    revenueBudget: function () {
      if ($("input#Weight").length) {
        //clearInterval(checkWeightValueHTML);
        RemainingBudget = 100 - RevenuesAmount;
        RemainingBudget = Number(RemainingBudget.toFixed(1));

        var newVal;
        var inpVal;
        if ($("input#Weight").val().includes(".")) {
          inpVal = parseFloat($("input#Weight").val()) || 0;
        } else {
          inpVal = parseInt($("input#Weight").val()) || 0;
        } // if($('input#WeightValue').val() < RemainingBudget){
        newVal =
          RemainingBudget + inpVal >= 100 ? inpVal : RemainingBudget + inpVal;
        newVal = Number(newVal.toFixed("2"));
        RemainingBudget == 100
          ? $("input#Weight").attr("max", RemainingBudget)
          : $("input#Weight").attr("max", newVal);
        // }
        // else{
        //     newVal = parseInt($('input#WeightValue').val())
        //     $('input#WeightValue').attr('max', $('input#WeightValue').val());
        // }
        $("input#Weight")
          .parent()
          .find(" > label")
          .append(
            '<span data-trans-remainperc class="Resources remainpercstyle"></span><span class="remainpercstyle">' +
              RemainingBudget +
              "]</span>"
          );
        changeResources();
      }
    },
  },
};
// var GetStage_Info = {
//     onSuccess: function(sender, args) {
//         var collListItem = GetStage_Info.g.collListItem;
//         var listItemEnum = collListItem.getEnumerator();
//         var SID, stage;
//         while (listItemEnum.moveNext()) {
//             var oListItem = listItemEnum.get_current();
//             SID = oListItem.get_id();
//         }
//         // console.log(SID);
//         $(".CFIELD[data-hidestageID=" + SID + "]").remove();
//         $(".CFIELD[data-showstageID=" + SID + "]").show();
//     },
//     onError: function(sender, args) {
//         console.log(
//             "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
//         );
//     },
//     // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
//     preinit: function() {
//         if ($(".ms-Icon--Settings").length) {
//             clearInterval(checkNotificationHTML);
//             SP.SOD.executeFunc("sp.js", "SP.ClientContext", function() {
//                 GetStage_Info.init();
//             });
//         }
//     },
//     // The main Initialization function
//     init: function(stage) {
//         var clientContext = new SP.ClientContext.get_current();
//         var oList = clientContext.get_web().get_lists().getByTitle("Stages");
//         var camlQuery = new SP.CamlQuery();
//         camlQuery.set_viewXml(
//             "<View><Query><Where><Eq><FieldRef Name='Title'/><Value Type='Text'>" +
//             stage +
//             "</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>"
//         );
//         GetStage_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
//         clientContext.load(GetStage_Info.g.collListItem);
//         clientContext.executeQueryAsync(
//             Function.createDelegate(this, GetStage_Info.onSuccess),
//             Function.createDelegate(this, GetStage_Info.onError)
//         );
//     },
//     // Global variables
//     g: {},
// };
//Risks
var Risks_Info_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Risks_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var Risks = "";
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      ///date
      var year =
        oListItem.get_item("DateIdentified") == null
          ? ""
          : oListItem.get_item("DateIdentified").getFullYear();
      NRisks++;
    }
    $(".Risks i").attr("data-count", NRisks);
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".Container").length) {
      clearInterval(checkStatusHtml);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        Risks_Info_Request.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Risks");
    var camlQuery = new SP.CamlQuery();
    var RQUERY;
    if (PCODE) {
      RQUERY =
        "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='Project'/><Value Type='Text'>" +
        PCODE +
        "</Value></Eq><And></Where></Query></View>";
    } else {
      RQUERY =
        "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query></View>";
    }
    camlQuery.set_viewXml(RQUERY);
    Risks_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Risks_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Risks_Info_Request.onSuccess),
      Function.createDelegate(this, Risks_Info_Request.onError)
    );
  },
  // Global variables
  g: {
    PCODE: window.location.href.split("PCODE=")[1],
  },
};
//Issues
var Issues_Info_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Issues_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var Issues = "";
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      NIssues++;
    }
    $(".Issues i").attr("data-count", NIssues);
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".Container").length) {
      clearInterval(checkStatusHtml);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        Issues_Info_Request.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Issues");
    var camlQuery = new SP.CamlQuery();
    var IQUERY;
    if (PCODE) {
      IQUERY =
        "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='Project'/><Value Type='Text'>" +
        PCODE +
        "</Value></Eq></And></Where></Query></View>";
    } else {
      IQUERY =
        "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query></View>";
    }
    camlQuery.set_viewXml(IQUERY);
    Issues_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Issues_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Issues_Info_Request.onSuccess),
      Function.createDelegate(this, Issues_Info_Request.onError)
    );
  },
  // Global variables
  g: {
    PCODE: window.location.href.split("PCODE=")[1],
  },
};

//
var IdeaCode,
  IdeaName,
  IdeaDescription,
  IdeaPortfolio,
  IdeaExpectedBudget,
  IdeaPlannedStartDate,
  FormatIdeaPlannedStartDate,
  IdeaExpectedLaunchDate,
  FormatIdeaExpectedLaunchDate,
  IdeaExecutiveSummary,
  IdeaAssumptions,
  IdeaRiskTitle,
  IdeaExpectedBenefits,
  IdeaPriority,
  IdeaStatus,
  CreatedBy,
  submitForApproval;
window.Idea_Info = {
  onSuccess: function (sender, args) {
    Idea_Info.g.array = [];
    var collListItem = Idea_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      //
      IdeaCode = oListItem.get_item("Title");
      IdeaName = oListItem.get_item("Name");
      IdeaDescription = oListItem.get_item("Description");
      IdeaPortfolio = oListItem.get_item("Portfolio");
      IdeaExpectedBudget = oListItem.get_item("EstimatedCosts");
      IdeaExpectedLaunchDate = oListItem.get_item("ExpectedLaunchDate");
      if (IdeaExpectedLaunchDate) {
        FormatIdeaExpectedLaunchDate =
          IdeaExpectedLaunchDate.format("yyyy-MM-dd");
      }
      IdeaExecutiveSummary = oListItem.get_item("ExecutiveSummary");
      IdeaAssumptions = oListItem.get_item("MajorAssumptions");
      IdeaRiskTitle = oListItem.get_item("MajorRisks");
      IdeaExpectedBenefits = oListItem.get_item("EstimatedBusinessBenefits");
      IdeaPriority = oListItem.get_item("Urgency");
      IdeaStatus = oListItem.get_item("Status");
      submitForApproval = oListItem.get_item("SubmitForApproval");
      CreatedBy = oListItem.get_item("Author").get_lookupValue();
      // console.log('CreatedBy', CreatedBy);
    }

    if (isNew) {
      $("#Name").val(IdeaName);
      $("#ExpectedLaunchDate").val(FormatIdeaExpectedLaunchDate);
      $("#Description").val(IdeaDescription);
      $("#Priority").val(IdeaPriority);
      $("#EstimatedCost").val(IdeaExpectedBudget);
      $("#ProjectExecutiveSummary").val(IdeaExecutiveSummary);
      $("#Assumptions").val(IdeaAssumptions);
      $('.projects[data-target_list="Risks"] #Title').val(IdeaRiskTitle);
      $("#ExpectedBenefits").val(IdeaExpectedBenefits);
      $("#portfolio").val(IdeaPortfolio);
      $(".form-btns-wrapper button").attr("disabled", true);
      $(".form-btns-wrapper button").addClass("noLoader");
    }

    if (USERisIdeas && isView) {
      if (submitForApproval == false || submitForApproval == null) {
        $(".rightBtns").prepend(
          '<button data-trans-submittedForApproval class="btn btn-action Resources" id="sendforApproval" type="button" onclick="sendDataForApproval.init();"></button>'
        );
      }

      if (
        (submitForApproval == true && IdeaStatus != "ideaRejected") ||
        (IdeaStatus && IdeaStatus == "cancelled") ||
        CreatedBy !== UserN.Title
      ) {
        $(".btn-delete").remove();
        $(".btn-save").remove();
        $("#sendforApproval").remove();
      }
      if (IdeaStatus == "completed" || CreatedBy !== UserN.Title) {
        $(".btn-save").remove();
      }

      if (CreatedBy !== UserN.Title) {
        $(".container-body").prepend(
          '<div class="errormsg alert"><span class="infoIcon"><i class="fas fa-info-circle"></i></span><span>' +
            editablebyowneronly +
            "</span></div>"
        );
      }

      if (IdeaStatus != "inprogress" && IdeaStatus != "ideaRejected") {
        $(".container-body").prepend(
          '<div class="errormsg alert"><span class="infoIcon"><i class="fas fa-info-circle"></i></span><span>' +
            notEditableItem +
            "</span></div>"
        );
      }
    }

    if (
      USERisIdeas &&
      isEdit &&
      (CreatedBy !== UserN.Title ||
        (IdeaStatus != "inprogress" && IdeaStatus != "ideaRejected"))
    ) {
      $(".form-control.SPIField").attr("disabled", true);
      $(".btn-save").remove();

      if (CreatedBy !== UserN.Title) {
        $(".container-body").prepend(
          '<div class="errormsg alert"><span class="infoIcon"><i class="fas fa-info-circle"></i></span><span>' +
            editablebyowneronly +
            "</span></div>"
        );
      }

      if (IdeaStatus != "inprogress" && IdeaStatus != "ideaRejected") {
        $(".container-body").prepend(
          '<div class="errormsg alert"><span class="infoIcon"><i class="fas fa-info-circle"></i></span><span>' +
            notEditableItem +
            "</span></div>"
        );
      }
    }
    changeResources();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // The main Initialization function
  init: function () {
    //
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Ideas");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='ID'/><Value Type='Text'>" +
        IID +
        "</Value></Eq></And></Where></Query></View>"
    );
    Idea_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Idea_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Idea_Info.onSuccess),
      Function.createDelegate(this, Idea_Info.onError)
    );
  },
  // Global variables
  g: {
    array: [],
  },
};
//** Edit field from other list
window.sendDataForApproval = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();

    var oList = clientContext.get_web().get_lists().getByTitle("Ideas");
    sendDataForApproval.g.oListItem = oList.getItemById(IID); //declared inside object scope only
    sendDataForApproval.g.oListItem.set_item("SubmitForApproval", true);
    sendDataForApproval.g.oListItem.update();
    clientContext.load(sendDataForApproval.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        console.log("successful");
        window.location =
          _spPageContextInfo.siteAbsoluteUrl +
          "/SitePages/Listing.aspx?ListKey=ideas";
      }),
      Function.createDelegate(this, function (sender, args) {
        console.log(
          "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
        );
      })
    );
  },
  g: {},
};
var printDate;
var printTime = new Date();
var printHead = "";
var signitureHtml = "";
window.Print_Data = {
  print: function () {
    if ($(".printHeader").length == 0) {
      printHead = `<div class='remove printHeader' style="display:none;justify-content:space-between"><div><img css="w-100" src="${logo}" style="height: 80px;width: 170px;"/></div><div style="font-size:25px;font-weight:bold;margin-top:1.4em">${PageTitle}</div><div style="font-size:15px;margin-top:2.6em;font-weight:bold"><span>${printDate}</span>${printTime.toLocaleDateString(
        "en-US"
      )}</div>
                    </div>
                    `;
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        signitureHtml = `<div class='remove printHeader' style="display:none;justify-content:start"><div style="position:absolute;margin-top:2%;padding:2% 1%;font-size:20px;font-weight:bold;"> التوقيع : </div></div>
                    `;
      } else {
        signitureHtml = `<div class='remove printHeader' style="display:none;justify-content:start"><div style="position:absolute;margin-top:2%;padding:2% 1%;font-size:20px;font-weight:bold;"> signiture : </div></div>
                        `;
      }
      $("#printableArea").prepend(printHead);
      $("#printableArea").append(signitureHtml);
    }

    $("#s4-bodyContainer").printThis({
      copyTagClasses: true,
      importCSS: true,
      importStyle: true,
      removeInline: false,
      printContainer: true,
    });

    // console.log(window.print(),"Saaaaaaaa")

    // window.print();
    // $(".remove").remove();
  },
};

window.Export_PDF = {
  // html2pdf bundles jsPDF and may not expose window.jsPDF — get a live instance instead.
  createEmptyPdf: function () {
    var tryDirect = function () {
      var Ctor =
        (typeof window.jsPDF === "function" && window.jsPDF) ||
        (window.jspdf &&
          typeof window.jspdf.jsPDF === "function" &&
          window.jspdf.jsPDF) ||
        null;
      if (!Ctor) {
        return null;
      }
      var pdf = null;
      try {
        pdf = new Ctor({
          unit: "pt",
          format: "a4",
          orientation: "portrait",
        });
      } catch (e1) {
        try {
          pdf = new Ctor("portrait", "pt", "a4");
        } catch (e2) {
          pdf = null;
        }
      }
      if (pdf && pdf.internal && pdf.internal.pageSize) {
        return pdf;
      }
      return null;
    };

    var direct = tryDirect();
    if (direct) {
      return Promise.resolve(direct);
    }
    if (typeof window.html2pdf !== "function") {
      return Promise.reject(new Error("html2pdf is not available"));
    }

    var probe = document.createElement("div");
    probe.style.cssText =
      "position:fixed;left:0;top:0;width:2px;height:2px;opacity:0;pointer-events:none;";
    document.body.appendChild(probe);
    return html2pdf()
      .set({
        margin: 0,
        html2canvas: { scale: 1, logging: false },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      })
      .from(probe)
      .toPdf()
      .get("pdf")
      .then(function (pdf) {
        if (probe.parentNode) {
          probe.parentNode.removeChild(probe);
        }
        return pdf;
      })
      .catch(function (err) {
        if (probe.parentNode) {
          probe.parentNode.removeChild(probe);
        }
        throw err;
      });
  },

  getPdfPageSize: function (pdf) {
    var ps = pdf.internal.pageSize;
    var w = typeof ps.getWidth === "function" ? ps.getWidth() : ps.width;
    var h = typeof ps.getHeight === "function" ? ps.getHeight() : ps.height;
    return { width: w, height: h };
  },

  // Collect avoid ranges (CSS px, relative to capture root) from the html2canvas clone.
  collectAvoidRangesFromClone: function (clonedDoc) {
    var ranges = [];
    var root =
      clonedDoc.querySelector(".export-pdf-root") ||
      clonedDoc.querySelector("[lang]") ||
      clonedDoc.body;
    if (!root) {
      return ranges;
    }
    var rootRect = root.getBoundingClientRect();
    var nodes = root.querySelectorAll(
      ".pdf-row, .pdf-section-keep, .pdf-section-bar, .html2pdf.headname"
    );
    for (var i = 0; i < nodes.length; i++) {
      var r = nodes[i].getBoundingClientRect();
      var top = r.top - rootRect.top;
      var bottom = r.bottom - rootRect.top;
      if (bottom > top && bottom > 0) {
        ranges.push({ top: top, bottom: bottom });
      }
    }
    ranges.sort(function (a, b) {
      return a.top - b.top;
    });
    return ranges;
  },

  // Convert CSS-px ranges to canvas-px using html2canvas scale.
  toCanvasAvoidRanges: function (cssRanges, scaleY, canvasH) {
    var out = [];
    var s = scaleY || 1;
    for (var i = 0; i < (cssRanges || []).length; i++) {
      var top = Math.round(cssRanges[i].top * s);
      var bottom = Math.round(cssRanges[i].bottom * s);
      top = Math.max(0, Math.min(top, canvasH));
      bottom = Math.max(0, Math.min(bottom, canvasH));
      if (bottom > top) {
        out.push({ top: top, bottom: bottom });
      }
    }
    return out;
  },

  // If the natural page end would split a row/section, end before it (leave empty space).
  // Otherwise end after the last fully visible row.
  findSafePageCut: function (srcY, limitY, ranges, canvasH) {
    var limit = Math.min(limitY, canvasH);
    if (limit >= canvasH) {
      return canvasH;
    }
    var fudge = 2;

    // Would limit split a block that starts AFTER current page content?
    // Snap to the earliest such block top (move whole block to next page).
    var snapTop = null;
    for (var i = 0; i < ranges.length; i++) {
      var t = ranges[i].top;
      var b = ranges[i].bottom;
      if (limit > t + fudge && limit < b - fudge && t > srcY + fudge) {
        if (snapTop === null || t < snapTop) {
          snapTop = t;
        }
      }
    }
    if (snapTop !== null) {
      return snapTop;
    }

    // End after the last block that fully fits in this page window
    var cut = srcY;
    for (var j = 0; j < ranges.length; j++) {
      var bottom = ranges[j].bottom;
      if (bottom > srcY + fudge && bottom <= limit + fudge && bottom > cut) {
        cut = bottom;
      }
    }
    if (cut > srcY) {
      return Math.min(cut, canvasH);
    }

    // Oversized single block (taller than one page) — must slice
    return limit;
  },

  // Build PDF from html2canvas output: page 1 flush top, later pages keep top margin.
  // Cuts only on safe boundaries so rows/section bars are not split across pages.
  canvasToPdfWithFirstPageFlush: function (canvas, opts) {
    opts = opts || {};
    var topFirst = opts.topMarginFirst != null ? opts.topMarginFirst : 0;
    var topRest = opts.topMarginRest != null ? opts.topMarginRest : 18;
    var bottom = opts.bottomMargin != null ? opts.bottomMargin : 28;
    var quality = opts.imageQuality != null ? opts.imageQuality : 1;
    var scaleY = opts.html2canvasScale || 1;
    var ranges = Export_PDF.toCanvasAvoidRanges(
      opts.avoidRangesCss || [],
      scaleY,
      canvas.height
    );

    return Export_PDF.createEmptyPdf().then(function (pdf) {
      var size = Export_PDF.getPdfPageSize(pdf);
      var pageW = size.width;
      var pageH = size.height;
      var pxPerPt = canvas.width / pageW;
      var srcY = 0;
      var pageNum = 0;
      while (srcY < canvas.height) {
        pageNum += 1;
        var topM = pageNum === 1 ? topFirst : topRest;
        var availPt = pageH - topM - bottom;
        var availPx = Math.max(1, Math.floor(availPt * pxPerPt));
        var limitY = srcY + availPx;
        var cutY = Export_PDF.findSafePageCut(
          srcY,
          limitY,
          ranges,
          canvas.height
        );
        var slicePx = cutY - srcY;
        if (slicePx < 1) {
          // Safety: never stall (should only happen for zero-height quirks)
          cutY = Math.min(srcY + availPx, canvas.height);
          slicePx = cutY - srcY;
        }
        if (slicePx < 1) {
          break;
        }
        var pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = slicePx;
        var ctx = pageCanvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(
          canvas,
          0,
          srcY,
          canvas.width,
          slicePx,
          0,
          0,
          canvas.width,
          slicePx
        );
        var imgData = pageCanvas.toDataURL("image/jpeg", quality);
        if (pageNum > 1) {
          pdf.addPage();
        } else {
          pdf.setPage(1);
        }
        pdf.addImage(imgData, "JPEG", 0, topM, pageW, slicePx / pxPerPt);
        srcY = cutY;
      }
      return pdf;
    });
  },

  // Match visible form text (keeps word spacing as shown on page)
  readVisibleText: function ($el) {
    if (!$el || !$el.length) {
      return "";
    }
    var el = $el[0];
    var raw = el.innerText != null ? el.innerText : $el.text();
    return String(raw == null ? "" : raw)
      .replace(/\u00A0/g, " ")
      .replace(/[ \t\f\v]+/g, " ")
      .replace(/\s*\n\s*/g, "\n")
      .trim();
  },

  // html2canvas often collapses Arabic font spaces to ~0 width.
  // Keep bidi-safe punctuation, then insert fixed-width spacers between words.
  formatPdfText: function (text) {
    var s = String(text == null ? "" : text);
    s = s.replace(
      /([\u0600-\u06FF])\s*-\s*([\u0600-\u06FF])/g,
      "$1 \u200F-\u200F $2"
    );
    s = s.replace(
      /([\u0600-\u06FF])\s*\/\s*([\u0600-\u06FF])/g,
      "$1 \u200F/\u200F $2"
    );
    s = s.replace(/\(\s*([\u0600-\u06FF])/g, "\u200F(\u200F$1");
    s = s.replace(/([\u0600-\u06FF])\s*\)/g, "$1\u200F)\u200F");

    var gap =
      '<span class="pdf-sp" style="display:inline-block;width:0.28em;min-width:0.28em;max-width:0.28em;"></span>';
    var escaped = Export_PDF.escapeHtml(s);
    return escaped
      .split(/\r?\n/)
      .map(function (line) {
        return line
          .split(/[ \u00A0\u200B]+/)
          .filter(function (w) {
            return w.length > 0;
          })
          .join(gap);
      })
      .join("<br>");
  },

  getPDFStyleLibraryBase: function () {
    var base =
      (typeof _spPageContextInfo !== "undefined" &&
        (_spPageContextInfo.siteAbsoluteUrl ||
          _spPageContextInfo.webAbsoluteUrl)) ||
      window.location.origin;
    return String(base).replace(/\/$/, "") + "/Style%20Library/spm/images/";
  },

  // Company logo URL — prefer live sidebar logo, then Style Library fallbacks
  getPDFLogoUrl: function (isAr) {
    var $img = $(".main-logo img").first();
    if ($img.length) {
      var src = $img.attr("src") || $img.prop("src") || "";
      if (src) {
        return src;
      }
    }
    var file = isAr ? "main-logo.svg" : "main-logo-en.svg";
    return Export_PDF.getPDFStyleLibraryBase() + file;
  },

  // Full PDF header banner (curves + logo). Upload pdf-header-banner.png to Style Library/spm/images
  getPDFHeaderBannerUrl: function () {
    return Export_PDF.getPDFStyleLibraryBase() + "pdf-header-banner.png";
  },

  // PDF download name = page item code (PCODE / ICODE / sosCode / Title...)
  getPDFFileName: function () {
    var code = "";
    try {
      if (typeof PCODE !== "undefined" && PCODE) {
        code = PCODE;
      } else if (typeof ICODE !== "undefined" && ICODE) {
        code = ICODE;
      } else if (typeof STCODE !== "undefined" && STCODE) {
        code = STCODE;
      } else if (typeof sosCode !== "undefined" && sosCode) {
        code = sosCode;
      } else if (typeof window.crItemCode !== "undefined" && window.crItemCode) {
        code = window.crItemCode;
      }
    } catch (e) {}

    if (!code) {
      var $codeEl = $(
        ".container-body #Title.viewmode-value, .container-body #Title.print-field, .container-body #Code.viewmode-value, .container-body #ProjectCode.viewmode-value, .container-body #InitiativeCode.viewmode-value"
      ).first();
      code = Export_PDF.readVisibleText($codeEl);
    }

    if (!code && typeof PageTitle !== "undefined" && PageTitle) {
      code = PageTitle;
    }

    try {
      code = decodeURIComponent(String(code || ""));
    } catch (e2) {
      code = String(code || "");
    }

    code = code
      .replace(/[\\/:*?"<>|]+/g, "-")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .trim();

    return (code || "Full-Data") + ".pdf";
  },

  // Candidate URLs — file may live under spm/images or Style Library/Images
  getPDFHeaderBannerCandidates: function () {
    var base =
      (typeof _spPageContextInfo !== "undefined" &&
        (_spPageContextInfo.siteAbsoluteUrl ||
          _spPageContextInfo.webAbsoluteUrl)) ||
      window.location.origin;
    base = String(base).replace(/\/$/, "");
    var cacheBust = "?v=" + Date.now();
    return [
      base + "/Style%20Library/spm/images/pdf-header-banner.png" + cacheBust,
      base + "/Style%20Library/Images/pdf-header-banner.png" + cacheBust,
      base + "/Style Library/spm/images/pdf-header-banner.png" + cacheBust,
      base + "/Style Library/Images/pdf-header-banner.png" + cacheBust,
    ];
  },

  // SharePoint images often fail html2canvas CORS — preload as data URL first
  loadImageAsDataUrl: function (url) {
    return fetch(url, { credentials: "include", cache: "no-cache" })
      .then(function (res) {
        if (!res.ok) {
          throw new Error("HTTP " + res.status);
        }
        return res.blob();
      })
      .then(function (blob) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onload = function () {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      });
  },

  resolveHeaderBannerDataUrl: function () {
    var urls = Export_PDF.getPDFHeaderBannerCandidates();
    var tryNext = function (i) {
      if (i >= urls.length) {
        return Promise.resolve("");
      }
      return Export_PDF.loadImageAsDataUrl(urls[i]).catch(function () {
        return tryNext(i + 1);
      });
    };
    return tryNext(0);
  },

  // Item / task names from WF teal bar (or Name field on non-WF views)
  getPDFContextMeta: function () {
    var itemName = Export_PDF.readVisibleText($(".wf-project-name").first());
    var taskName = Export_PDF.readVisibleText($(".wf-task-name").first());

    if (!itemName) {
      var $name = $(
        ".container-body .section-container:not([data-target_list]) #Name.viewmode-value, .container-body .ViewPrint_Form #Name.print-field"
      ).first();
      itemName = Export_PDF.readVisibleText($name);
    }

    if (
      !itemName &&
      typeof listkey !== "undefined" &&
      listkey === "changerequest"
    ) {
      var $crTitle = $(
        ".container-body .section-container:not([data-target_list]) #Title.viewmode-value"
      ).first();
      itemName = Export_PDF.readVisibleText($crTitle);
    }

    return { itemName: itemName, taskName: taskName };
  },

  // Previous operations (task history) — horizontal table for PDF (columns + one row per task).
  gatherTaskHistoryForPDF: function () {
    var $ctx = $(".task-history-ctx").first();
    if (!$ctx.length) {
      return null;
    }

    var lang = localStorage.getItem("lng") === "en" ? "en" : "ar";
    var R = function (key, fallback) {
      try {
        if (
          typeof Resources !== "undefined" &&
          Resources[lang] &&
          Resources[lang][key]
        ) {
          return Resources[lang][key];
        }
      } catch (e) {}
      return fallback;
    };

    var headname = Export_PDF.readVisibleText(
      $ctx.find("[data-trans-taskHistory], .approvalHeader h2").first()
    );
    headname =
      headname ||
      R("taskhistory", lang === "ar" ? "العمليات السابقة" : "Task History");

    var columns = [
      R("taskname", lang === "ar" ? "إسم المهمة" : "Task Name"),
      R("assignedto", lang === "ar" ? "المكلف" : "Assigned To"),
      R("createddate", lang === "ar" ? "تاريخ الإنشاء" : "Created"),
      R("modifieddate", lang === "ar" ? "تاريخ الإجراء" : "Action date"),
      R("taskcomment", lang === "ar" ? "ملاحظات" : "Comments"),
      R("takenaction", lang === "ar" ? "الإجراء المتخذ" : "Action Taken"),
      R("author", lang === "ar" ? "المنشئ" : "Author"),
      R("editor", lang === "ar" ? "المحرر" : "Editor"),
    ];

    var rows = [];
    $ctx.find(".history-row-ctx").each(function () {
      var $row = $(this);
      var stage = "";
      var valuesByKey = {
        assignedto: "-",
        createddate: "-",
        modifieddate: "-",
        taskcomment: "-",
        takenaction: "-",
        author: "-",
        editor: "-",
      };

      $row.children().each(function () {
        var $col = $(this);
        // Skip "Task History" / سجل المهام link column
        if (
          $col.find("a").length &&
          !$col.find(".historyLabel, .historyValue").length
        ) {
          return;
        }

        var $labelEl = $col.find(".historyLabel").first();
        var value = Export_PDF.readVisibleText(
          $col.find(".historyValue").first()
        );
        if ($labelEl.length) {
          var key = (
            $labelEl.attr("data-trans") ||
            ""
          ).toLowerCase();
          if (!key) {
            // data-trans-assignedTo → assignedto
            var attrs = $labelEl[0] && $labelEl[0].attributes;
            if (attrs) {
              for (var a = 0; a < attrs.length; a++) {
                var an = attrs[a].name || "";
                if (an.indexOf("data-trans-") === 0) {
                  key = an.substring("data-trans-".length).toLowerCase();
                  break;
                }
              }
            }
          }
          if (key && Object.prototype.hasOwnProperty.call(valuesByKey, key)) {
            valuesByKey[key] = value || "-";
          }
          return;
        }

        var $plain = $col
          .find("p")
          .not(".historyLabel, .historyValue")
          .first();
        if ($plain.length) {
          var t = Export_PDF.readVisibleText($plain);
          if (t) {
            stage = t;
          }
        }
      });

      if (
        !stage &&
        valuesByKey.assignedto === "-" &&
        valuesByKey.createddate === "-" &&
        valuesByKey.takenaction === "-"
      ) {
        return;
      }

      rows.push([
        stage || "-",
        valuesByKey.assignedto,
        valuesByKey.createddate,
        valuesByKey.modifieddate,
        valuesByKey.taskcomment,
        valuesByKey.takenaction,
        valuesByKey.author,
        valuesByKey.editor,
      ]);
    });

    if (!rows.length) {
      return null;
    }
    return {
      headname: headname,
      type: "table",
      columns: columns,
      rows: rows,
    };
  },

  gatherPDFData: function () {
    var finalArr = [];
    var $sections = $(".container-body .ViewPrint_Form");
    if ($sections.length === 0) {
      $sections = $(".container-body .section-container.View_Form").not(
        ".hide-section"
      );
    }

    $sections.each(function () {
      var $section = $(this);
      if ($section.hasClass("hide-section")) {
        return;
      }
      if (
        $section.hasClass("View_Form") &&
        ($section.css("display") === "none" || !$section.is(":visible"))
      ) {
        return;
      }

      var headname = Export_PDF.readVisibleText(
        $section.find(".printDescription").first()
      );
      if (!headname) {
        headname = Export_PDF.readVisibleText(
          $section.find("h3.sideTitle").first()
        );
      }
      if (!headname) {
        return;
      }

      var data = [];
      $section.find(".CFIELD").each(function () {
        var $field = $(this);
        if (
          $field.hasClass("hide-field") ||
          $field.hasClass("d-none") ||
          $field.hasClass("dont-submit")
        ) {
          return;
        }
        if ($field.is(":hidden") && !$section.hasClass("ViewPrint_Form")) {
          return;
        }

        var label = Export_PDF.readVisibleText($field.find("label").first());
        if (!label) {
          return;
        }

        var $valueEl = $field.find(".print-field, .viewmode-value").first();
        var value = Export_PDF.readVisibleText($valueEl);
        data.push({ label: label, value: value || "-" });
      });

      if (data.length) {
        finalArr.push({ headname: headname, data: data });
      }
    });

    // Append previous operations (task history) at the end when present on View
    var historySection = Export_PDF.gatherTaskHistoryForPDF();
    if (historySection) {
      finalArr.push(historySection);
    }

    return finalArr;
  },

  handleExportPDF: function (finalArr, headerBannerDataUrl) {
    var lang =
      localStorage.getItem("lng") === "en" ? "en" : "ar";
    var isAr = lang === "ar";
    var isChangeRequest =
      typeof listkey !== "undefined" && listkey === "changerequest";
    var contextMeta = isChangeRequest
      ? Export_PDF.getPDFContextMeta()
      : { itemName: "", taskName: "" };
    var concatPDFHead =
      typeof PageTitle !== "undefined" && PageTitle
        ? PageTitle
        : isAr
        ? "تفاصيل"
        : "Details";
    // CR only: append item/CR name + task name (other lists already show name in the table)
    if (isChangeRequest && contextMeta.itemName) {
      concatPDFHead = concatPDFHead + " - " + contextMeta.itemName;
    }
    var taskNameLabel = isAr ? "إسم المهمة" : "Task Name";
    try {
      if (
        typeof Resources !== "undefined" &&
        Resources[lang] &&
        Resources[lang].taskname
      ) {
        taskNameLabel = Resources[lang].taskname;
      }
    } catch (e) {}
    var scale = finalArr.length < 25 ? 2 : 1;
    var pdfFileName = Export_PDF.getPDFFileName();
    var pdfFontSizePageTitle = 30;
    var pdfFontSizeSectionTitle = 24;
    var pdfFontSizeData = 15;
    // Mockup brand colors
    var brandTeal = "#1a9a9a";
    var brandNavy = "#14415a";
    var brandLabelBg = "#f2f2f2";
    var brandBorder = "#000000";
    var headerBannerUrl =
      headerBannerDataUrl || Export_PDF.getPDFHeaderBannerUrl();
    // Same project font stack as Change Request PDF
    var pdfFont = "'HRSD-FONT', 'LTBukra', 'Effra', 'Segoe UI', Tahoma, sans-serif";

    var hiddenContainer = document.createElement("div");
    // Keep in viewport — left:-9999px breaks Arabic glyph shaping in html2canvas
    hiddenContainer.style.cssText =
      "position:fixed;left:0;top:0;width:794px;z-index:-1;opacity:0.01;pointer-events:none;background:#fff;";

    var tempElement = document.createElement("div");
    tempElement.setAttribute("dir", isAr ? "rtl" : "ltr");
    tempElement.setAttribute("lang", lang);
    tempElement.className =
      (isAr ? "ar" : "en") + " export-pdf-root";
    tempElement.style.cssText =
      "width:794px;box-sizing:border-box;background:#ffffff;font-family:" +
      pdfFont +
      ";direction:" +
      (isAr ? "rtl" : "ltr") +
      ";";
    hiddenContainer.appendChild(tempElement);

    var contentHTML = "";
    var textAlign = isAr ? "right" : "left";
    var borderSide = isAr ? "border-left" : "border-right";

    // Full-width branded header image (logo + curves). Page title stays dynamic below.
    var brandHeaderHtml = "";
    if (headerBannerUrl) {
      brandHeaderHtml +=
        '<div style="width:100%;box-sizing:border-box;background:#ffffff;line-height:0;">' +
        '<img src="' +
        Export_PDF.escapeHtml(headerBannerUrl) +
        '" alt="header" style="width:100%;max-width:794px;height:auto;display:block;"/>' +
        "</div>";
    }
    brandHeaderHtml +=
      '<div style="padding:12px 40px 18px 40px;text-align:center;color:' +
      brandNavy +
      ";font-weight:700;font-size:" +
      pdfFontSizePageTitle +
      "px;direction:" +
      (isAr ? "rtl" : "ltr") +
      ';line-height:1.35;"><bdi>' +
      Export_PDF.formatPdfText(concatPDFHead) +
      "</bdi></div>";

    contentHTML +=
      '<div class="page" style="width:794px;box-sizing:border-box;background:#fff;font-family:' +
      pdfFont +
      ';">' +
      brandHeaderHtml +
      '<div style="padding:0 40px 12px 40px;box-sizing:border-box;">';

    // CR only: optional task name under page title
    if (isChangeRequest && contextMeta.taskName) {
      contentHTML +=
        '<div style="margin:0 0 12px 0;padding:6px 10px;border:1px solid ' +
        brandBorder +
        ";font-size:" +
        pdfFontSizeData +
        "px;font-weight:600;color:" +
        brandNavy +
        ";text-align:" +
        textAlign +
        ";direction:" +
        (isAr ? "rtl" : "ltr") +
        ';white-space:pre-wrap;"><bdi>' +
        Export_PDF.formatPdfText(taskNameLabel + " " + contextMeta.taskName) +
        "</bdi></div>";
    }

    finalArr.forEach(function (section, index) {
      var sectionBarHtml =
        '<div class="html2pdf headname pdf-section-bar" style="width:100%;box-sizing:border-box;background:' +
        brandTeal +
        ";color:#ffffff;font-weight:700;font-size:" +
        pdfFontSizeSectionTitle +
        "px;padding:10px 12px;text-align:center;border-bottom:1px solid " +
        brandBorder +
        ";direction:" +
        (isAr ? "rtl" : "ltr") +
        ';white-space:pre-wrap;page-break-inside:avoid;break-inside:avoid;"><bdi>' +
        Export_PDF.formatPdfText(section.headname) +
        "</bdi></div>";

      var rowHtmlList = [];

      // Task history: horizontal table (column headers + one row per operation)
      if (section.type === "table" && section.columns && section.rows) {
        var colCount = section.columns.length;
        var colW = (100 / colCount).toFixed(4) + "%";
        var tableFontSize = Math.max(10, pdfFontSizeData - 4);
        var cellBase =
          "min-width:0;box-sizing:border-box;padding:6px 4px;font-size:" +
          tableFontSize +
          "px;line-height:1.35;text-align:center;font-family:" +
          pdfFont +
          ";overflow-wrap:anywhere;word-break:break-word;overflow:hidden;white-space:normal;";

        var headerCells = "";
        for (var hc = 0; hc < colCount; hc++) {
          headerCells +=
            '<div style="width:' +
            colW +
            ";" +
            cellBase +
            "font-weight:700;background:" +
            brandLabelBg +
            ";color:" +
            brandNavy +
            ";" +
            (hc < colCount - 1
              ? (isAr ? "border-left" : "border-right") +
                ":1px solid " +
                brandBorder +
                ";"
              : "") +
            '"><bdi>' +
            Export_PDF.formatPdfText(section.columns[hc] || "") +
            "</bdi></div>";
        }
        rowHtmlList.push(
          '<div class="pdf-row pdf-table-header" style="display:flex;width:100%;box-sizing:border-box;page-break-inside:avoid;break-inside:avoid;border-bottom:1px solid ' +
            brandBorder +
            ';">' +
            headerCells +
            "</div>"
        );

        for (var tr = 0; tr < section.rows.length; tr++) {
          var cells = section.rows[tr] || [];
          var bodyCells = "";
          for (var tc = 0; tc < colCount; tc++) {
            bodyCells +=
              '<div style="width:' +
              colW +
              ";" +
              cellBase +
              "background:#ffffff;color:#222;" +
              (tc < colCount - 1
                ? (isAr ? "border-left" : "border-right") +
                  ":1px solid " +
                  brandBorder +
                  ";"
                : "") +
              '"><bdi>' +
              Export_PDF.formatPdfText(cells[tc] || "-") +
              "</bdi></div>";
          }
          var rowBorder =
            tr === section.rows.length - 1
              ? ""
              : "border-bottom:1px solid " + brandBorder + ";";
          rowHtmlList.push(
            '<div class="pdf-row pdf-table-data" style="display:flex;width:100%;box-sizing:border-box;page-break-inside:avoid;break-inside:avoid;' +
              rowBorder +
              '">' +
              bodyCells +
              "</div>"
          );
        }
      } else {
        (section.data || []).forEach(function (item, rowIndex) {
          var label = Export_PDF.formatPdfText(item.label || "");
          var value = Export_PDF.formatPdfText(item.value || "");
          var rowBorder =
            rowIndex === section.data.length - 1
              ? ""
              : "border-bottom:1px solid " + brandBorder + ";";

          rowHtmlList.push(
            '<div class="pdf-row" style="display:flex;width:100%;box-sizing:border-box;page-break-inside:avoid;break-inside:avoid;' +
              rowBorder +
              '">' +
              '<div style="width:35%;min-width:0;max-width:35%;box-sizing:border-box;padding:8px 10px;font-weight:700;font-size:' +
              pdfFontSizeData +
              "px;line-height:1.45;text-align:" +
              textAlign +
              ";background:" +
              brandLabelBg +
              ";" +
              borderSide +
              ":1px solid " +
              brandBorder +
              ";color:" +
              brandNavy +
              ";font-family:" +
              pdfFont +
              ';overflow-wrap:anywhere;word-break:break-word;overflow:hidden;white-space:normal;"><bdi>' +
              label +
              "</bdi></div>" +
              '<div style="width:65%;min-width:0;max-width:65%;box-sizing:border-box;padding:8px 10px;font-size:' +
              pdfFontSizeData +
              "px;line-height:1.45;text-align:" +
              textAlign +
              ";background:#ffffff;color:#222;font-family:" +
              pdfFont +
              ';overflow-wrap:anywhere;word-break:break-word;overflow:hidden;white-space:normal;"><bdi>' +
              value +
              "</bdi></div>" +
              "</div>"
          );
        });
      }

      // Keep header + first rows in their own bordered box (avoids empty border remnant on previous page)
      var keepCount = Math.min(2, rowHtmlList.length);
      var hasRest = rowHtmlList.length > keepCount;
      var keepHtml = sectionBarHtml;
      for (var k = 0; k < keepCount; k++) {
        keepHtml += rowHtmlList[k];
      }
      var keepBorderStyle = hasRest
        ? "border-top:1px solid " +
          brandBorder +
          ";border-left:1px solid " +
          brandBorder +
          ";border-right:1px solid " +
          brandBorder +
          ";"
        : "border:1px solid " + brandBorder + ";";

      contentHTML +=
        '<div class="pdf-section" style="margin:0 0 ' +
        (index < finalArr.length - 1 ? "18" : "0") +
        'px 0;">' +
        '<div class="pdf-section-keep" style="width:100%;box-sizing:border-box;page-break-inside:avoid;break-inside:avoid;' +
        keepBorderStyle +
        '">' +
        keepHtml +
        "</div>";

      if (hasRest) {
        contentHTML +=
          '<div class="pdf-grid-rest" style="width:100%;box-sizing:border-box;border-left:1px solid ' +
          brandBorder +
          ";border-right:1px solid " +
          brandBorder +
          ";border-bottom:1px solid " +
          brandBorder +
          ';">';
        for (var r = keepCount; r < rowHtmlList.length; r++) {
          contentHTML += rowHtmlList[r];
        }
        contentHTML += "</div>";
      }

      contentHTML += "</div>";
    });

    contentHTML += "</div></div>";

    tempElement.innerHTML = contentHTML;
    document.body.appendChild(hiddenContainer);

    // Filled in onclone from the real html2canvas DOM (matches canvas pixels).
    var avoidRangesCss = [];
    var captureCssHeight = 0;

    html2pdf()
      .from(tempElement)
      .set({
        // Top 18 for pagebreak sizing (pages 2+); page 1 flush via canvasToPdfWithFirstPageFlush
        margin: [18, 0, 28, 0],
        filename: pdfFileName,
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: scale,
          letterRendering: false,
          useCORS: true,
          allowTaint: false,
          scrollY: 0,
          windowWidth: 794,
          backgroundColor: "#ffffff",
          onclone: function (clonedDoc) {
            var root = clonedDoc.body.querySelector(".export-pdf-root");
            if (root) {
              root.style.fontFamily = pdfFont;
              root.setAttribute("dir", isAr ? "rtl" : "ltr");
              root.style.wordSpacing = "normal";
            }
            var nodes = clonedDoc.querySelectorAll("bdi, div");
            for (var n = 0; n < nodes.length; n++) {
              nodes[n].style.fontFamily = pdfFont;
              nodes[n].style.wordSpacing = "normal";
            }
            // Force wrap inside label/value cells (flex children need min-width:0)
            var cells = clonedDoc.querySelectorAll(".pdf-row > div");
            for (var c = 0; c < cells.length; c++) {
              cells[c].style.minWidth = "0";
              cells[c].style.overflowWrap = "anywhere";
              cells[c].style.wordBreak = "break-word";
              cells[c].style.overflow = "hidden";
              cells[c].style.whiteSpace = "normal";
            }
            var gaps = clonedDoc.querySelectorAll(".pdf-sp");
            for (var g = 0; g < gaps.length; g++) {
              gaps[g].style.display = "inline-block";
              gaps[g].style.width = "0.28em";
              gaps[g].style.minWidth = "0.28em";
              gaps[g].style.maxWidth = "0.28em";
            }
            var imgs = clonedDoc.querySelectorAll("img");
            for (var i = 0; i < imgs.length; i++) {
              imgs[i].setAttribute("crossorigin", "anonymous");
            }
            // Measure after style tweaks so ranges match the painted clone
            avoidRangesCss = Export_PDF.collectAvoidRangesFromClone(clonedDoc);
            if (root) {
              captureCssHeight = Math.max(
                root.scrollHeight,
                root.offsetHeight,
                1
              );
            }
          },
        },
        jsPDF: {
          unit: "pt",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: {
          // Custom canvas slicer handles row/section avoid; disable html2pdf pagebreaks
          mode: [],
          avoid: [],
        },
      })
      .toCanvas()
      .get("canvas")
      .then(function (canvas) {
        var scaleY =
          captureCssHeight > 0 ? canvas.height / captureCssHeight : scale;
        return Export_PDF.canvasToPdfWithFirstPageFlush(canvas, {
          topMarginFirst: 0,
          topMarginRest: 18,
          bottomMargin: 28,
          imageQuality: 1,
          html2canvasScale: scaleY,
          avoidRangesCss: avoidRangesCss,
        }).then(function (pdf) {
          var totalPages = pdf.internal.getNumberOfPages();
          var pageW = pdf.internal.pageSize.getWidth();
          var pageH = pdf.internal.pageSize.getHeight();
          var footerH = 18;
          var footerFontSize = 9;
          for (var i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            // Slim light-gray footer; page number centered
            pdf.setFillColor(230, 230, 230);
            pdf.rect(0, pageH - footerH, pageW, footerH, "F");
            pdf.setTextColor(90, 90, 90);
            pdf.setFontSize(footerFontSize);
            var textY = pageH - footerH / 2 + footerFontSize * 0.35;
            pdf.text(String(i), pageW / 2, textY, { align: "center" });
          }
          pdf.save(pdfFileName);
        });
      })
      .then(function () {
        if (hiddenContainer.parentNode) {
          document.body.removeChild(hiddenContainer);
        }
      })
      .catch(function (error) {
        console.error("Error generating PDF:", error);
        if (hiddenContainer.parentNode) {
          document.body.removeChild(hiddenContainer);
        }
      });
  },

  escapeHtml: function (text) {
    return String(text == null ? "" : text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },

  ensureLibrary: function () {
    return new Promise(function (resolve, reject) {
      if (typeof window.html2pdf === "function") {
        resolve();
        return;
      }

      var existing = document.getElementById("spm-html2pdf-script");
      if (existing) {
        existing.parentNode.removeChild(existing);
      }

      var baseUrl =
        (typeof _spPageContextInfo !== "undefined" &&
          _spPageContextInfo.siteAbsoluteUrl) ||
        (typeof _spPageContextInfo !== "undefined" &&
          _spPageContextInfo.webAbsoluteUrl) ||
        window.location.origin;

      // SharePoint's AMD loader rejects html2pdf's anonymous define().
      // Temporarily disable AMD so the UMD build attaches to window.html2pdf.
      var originalDefine = window.define;
      var restoreDefine = function () {
        if (typeof originalDefine !== "undefined") {
          window.define = originalDefine;
        } else {
          try {
            delete window.define;
          } catch (e) {
            window.define = originalDefine;
          }
        }
      };

      if (typeof window.define === "function") {
        window.define = undefined;
      }

      var script = document.createElement("script");
      script.id = "spm-html2pdf-script";
      script.type = "text/javascript";
      script.src =
        baseUrl.replace(/\/$/, "") + "/Style%20Library/spm/js/html2pdf.js";
      script.onload = function () {
        restoreDefine();
        if (typeof window.html2pdf === "function") {
          resolve();
        } else {
          reject(new Error("html2pdf not available after load"));
        }
      };
      script.onerror = function () {
        restoreDefine();
        reject(new Error("Failed to load html2pdf.js"));
      };
      document.head.appendChild(script);
    });
  },

  export: function () {
    var lang =
      localStorage.getItem("lng") === "en" ? "en" : "ar";

    Export_PDF.ensureLibrary()
      .then(function () {
        return Export_PDF.resolveHeaderBannerDataUrl();
      })
      .then(function (bannerDataUrl) {
        var finalArr = Export_PDF.gatherPDFData();
        if (!finalArr.length) {
          alert(
            lang === "ar"
              ? "لا توجد بيانات للتصدير."
              : "No data available to export."
          );
          return;
        }
        if (!bannerDataUrl) {
          console.warn(
            "PDF header banner not found. Expected pdf-header-banner.png under Style Library/spm/images or Style Library/Images (checked in/published)."
          );
        }
        Export_PDF.handleExportPDF(finalArr, bannerDataUrl);
      })
      .catch(function (error) {
        console.error("PDF export library error:", error);
        alert(
          lang === "ar"
            ? "تعذر تحميل مكتبة تصدير PDF. تأكد من رفع html2pdf.js في Style Library/spm/js."
            : "PDF export library is not loaded. Ensure html2pdf.js is in Style Library/spm/js."
        );
      });
  },
};

// working on integration btn
var base64 = "";

var Integration_Handler = {
  Save_Integration: function () {
    $(".integration-save").attr("disabled", true);
    // $("#preloader,#formloader").css("display", "block");

    var docName = "",
      docType = "",
      docExt = "",
      metaDataArr = [];
    var currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
    var RqUID = "";
    validattachments.forEach((doc) => {
      // getBase64(doc)
      // await toBase64(doc)
      docName = doc.name.split(".")[0];
      // docType = doc.type
      docExt = doc.name.split(".").pop();
    });

    if (listkey == "projectcharter" && PCODE) {
      docType = "pmo_docs";
      RqUID = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    } else if (listkey == "initiativecards" && ICODE) {
      docType = "initiatives_docs";
      RqUID = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    }

    // if (listkey == 'projectcharter' && PCODE) {
    //handle project data
    $(
      ".section-container:not([data-target_list]) .CFIELD> input[type=text], .section-container:not([data-target_list]) .CFIELD> input[type=number], .section-container:not([data-target_list]) .CFIELD> input[type=float], .section-container:not([data-target_list]) .CFIELD>  input[type=date],.section-container:not([data-target_list]) .CFIELD> .datetimeinputs input[type=date],.section-container:not([data-target_list]) .CFIELD> .datetimeinputs input[type=datetime-local],.section-container:not([data-target_list]) .CFIELD> input[type=radio], .section-container:not([data-target_list]) .CFIELD> input[type=checkbox], .section-container:not([data-target_list]) .CFIELD> div[type=picker], .section-container:not([data-target_list]) .CFIELD> div[type=multipicker], .section-container:not([data-target_list]) .CFIELD> select[type=dropdown], .section-container:not([data-target_list]) .CFIELD>  textarea, .section-container:not([data-target_list]) .CFIELD > .multiselect-container"
    ).each(function () {
      if ($(this).attr("type") == "date") {
        if (listkey == "projectcharter" && PCODE) {
          if (
            $(this).attr("id") == "BaselineStartDate" ||
            $(this).attr("id") == "ActualStartDate"
          ) {
            if ($(this).val()) {
              var dateval = $(this).val().replace("-", "/");
              var datesId = $(this).attr("id");
              var ydate = !dateval
                ? ""
                : [dateval.slice(5, 10), dateval.slice(0, 4)]
                    .join("/")
                    .replace("-", "/");

              if (dateval) {
                var obj = {};
                if ($(this).attr("id") == "BaselineStartDate") {
                  obj = {
                    key: "start_date",
                    PropVal: ydate,
                  };
                } else if ($(this).attr("id") == "ActualStartDate") {
                  obj = {
                    key: "actual_date",
                    PropVal: ydate,
                  };
                }
                metaDataArr.push(obj);
              }
            }
          }
        } else if (listkey == "initiativecards" && ICODE) {
          if (
            $(this).attr("id") == "StartDate" ||
            $(this).attr("id") == "FinishDate"
          ) {
            if ($(this).val()) {
              var dateval = $(this).val().replace("-", "/");
              var datesId = $(this).attr("id");
              var ydate = !dateval
                ? ""
                : [dateval.slice(5, 10), dateval.slice(0, 4)]
                    .join("/")
                    .replace("-", "/");

              if (dateval) {
                var obj = {};
                if ($(this).attr("id") == "StartDate") {
                  obj = {
                    key: "start_date",
                    PropVal: ydate,
                  };
                } else if ($(this).attr("id") == "FinishDate") {
                  obj = {
                    key: "end_date",
                    PropVal: ydate,
                  };
                }
                // obj[datesId] = ydate
                metaDataArr.push(obj);
              }
            }
          }
        }
      } else if ($(this).attr("type") == "dropdown") {
        var id = $(this).attr("id");
        if (listkey == "projectcharter" && PCODE) {
          if (
            id == "Sector" ||
            id == "SubSector" ||
            id == "RelatedInitiative"
          ) {
            var val = $(this).val();
            if (val) {
              var obj = {};
              if (id == "Sector") {
                obj = {
                  key: "sector",
                  PropVal: val,
                };
              } else if (id == "SubSector") {
                obj = {
                  key: "agency",
                  PropVal: val,
                };
              } else if (id == "RelatedInitiative") {
                obj = {
                  key: "initiative",
                  PropVal: val,
                };
              }

              metaDataArr.push(obj);
            }
          }
        } else if (listkey == "initiativecards" && ICODE) {
          if (id == "SubSector") {
            var val = $(this).val();
            if (val) {
              var obj = {};
              if (id == "SubSector") {
                obj = {
                  key: "agency",
                  PropVal: val,
                };
              }
            }
          }
        }
      } else if ($(this).attr("type") == "picker") {
        if (listkey == "initiativecards" && ICODE) {
          var id = $(this).attr("id");
          if (id == "InitiativeOwner") {
            var val = $(this).attr("data-email");
            if (val) {
              var obj = {};
              if (id == "InitiativeOwner") {
                obj = {
                  key: "initiative_owner",
                  PropVal: val,
                };
              }
              metaDataArr.push(obj);
            }
          }
        }
      } else if ($(this).attr("type") == "multipicker") {
      } else if ($(this).attr("type") == "radio") {
        var id = $(this).attr("id");
        if (listkey == "projectcharter" && PCODE) {
          if (id == "NTP") {
            var checkedvalue = $(
              'input[id="' + $(this).attr("id") + '"]:checked'
            ).val();
            if (checkedvalue == "yes") {
              var obj = {};
              obj = {
                key: "ntp",
                PropVal: "yes",
              };
              const isFound = metaDataArr.some((element) => {
                if (element["key"] === "ntp") {
                  return true;
                }
              });
              if (!isFound) {
                metaDataArr.push(obj);
              }
            } else if (checkedvalue == "no" || checkedvalue == "undefined") {
              var obj = {};
              obj = {
                key: "ntp",
                PropVal: "no",
              };
              const isFound = metaDataArr.some((element) => {
                if (element["key"] === "ntp") {
                  return true;
                }
              });
              if (!isFound) {
                metaDataArr.push(obj);
              }
            }
          }
        }
      } else {
        var id = $(this).attr("id");
        if (listkey == "projectcharter" && PCODE) {
          if (
            id == "Name" ||
            id == "Description" ||
            id == "ScopeOfWork" ||
            id == "ActualCostWorkCompleted"
          ) {
            var val = $(this).val();
            if (val) {
              var obj = {};
              if (id == "Name") {
                obj = {
                  key: "project_name",
                  PropVal: val,
                };
              } else if (id == "ScopeOfWork") {
                obj = {
                  key: "project_scope",
                  PropVal: val,
                };
              } else if (id == "Description") {
                obj = {
                  key: "description",
                  PropVal: val,
                };
              } else if (id == "ActualCostWorkCompleted") {
                obj = {
                  key: "actual_cost",
                  PropVal: val,
                };
              }
              metaDataArr.push(obj);
            }
          }
        } else if (listkey == "initiativecards" && ICODE) {
          if (
            id == "Name" ||
            id == "Description" ||
            id == "ProgramTotalCost" ||
            id == "Expenditures" ||
            id == "ActualCost"
          ) {
            var val = $(this).val();
            if (val) {
              var obj = {};
              if (id == "Name") {
                obj = {
                  key: "initiative_name",
                  PropVal: val,
                };
              } else if (id == "Description") {
                obj = {
                  key: "description",
                  PropVal: val,
                };
              } else if (id == "ProgramTotalCost") {
                obj = {
                  key: "total_cost",
                  PropVal: val,
                };
              } else if (id == "Expenditures") {
                obj = {
                  key: "total_expenses",
                  PropVal: val,
                };
              } else if (id == "ActualCost") {
                obj = {
                  key: "approved_cost",
                  PropVal: val,
                };
              }
              metaDataArr.push(obj);
            }
          }
        }
      }
    });
    // } else if (listkey == 'initiativecards' && ICODE) {

    // }
    var reqData = {
      DocMngRq: {
        MsgRqHdr: {
          RqUID: RqUID, // should be unique
          SCId: "ESPRTL", // will change to Hemma after walid updated
          SubSCId: "", // as mohammad request data > TADHALUMAT
          SvcId: "DocMng", // for post request DocMng for get DocsInq
          FuncId: "11700000", // fixed
          ClientDt: currentDate, // should be current date
          RqMode: 0,
          UserId: "string", // as mohammad request data > string
          EchoData: "any value you want to echo it back in the response", // as mohammad request data > any value you want to echo it back in the response
        },
        Body: {
          DocInfo: {
            // "DocType": "lid_requests",
            DocType: docType,
            DocPath: {
              // "DirctryPath": "https://baseurl/documentPath",
              // "DocName": "test_777",
              DocName: docName,
              // "DocExtension": "pdf"
              DocExtension: docExt,
            },
            // "Format": "pdf",
            Format: docExt,
            Content: base64,
            MetadataList: {
              Metadata: metaDataArr,
            },
          },
          DestDirctryPath: "/Testing",
        },
      },
    };

    // window.Archive_Data_Submit.init(RqUID,"E000127")

    $.ajax({
      url: "http://172.28.3.16:7901/v1/documents/manage",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `{ "MsgRqHdr": { "ClientDt": ${currentDate}, "EchoData": "", "FuncId": "11700000", "PartyId": { "PartyIdNum": "", "PartyIdType": "" }, "ProxyUserId": "", "RqMode": 0, "RqUID": ${RqUID}, "SCId": "ESPRTL", "SubSCId": "", "SvcId": "DocMng", "UserId": "", "Version": "" } }`,
      },
      data: reqData,
      success: function (data) {
        // $(".integration-save").addClass("success");
        var responseId = data.DocMngRs.MsgRsHdr.ResponseStatus.StatusCode;
        window.Archive_Data_Submit.init(RqUID, responseId, IID); // in form submit
      },
      error: function (data) {
        console.log("call failed", data);
      },
    });
  },
};

function getFieldInfoIconHtml(element) {
  if (!element) {
    return "";
  }
  var lng =
    localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar"
      ? "ar"
      : "en";
  var tipText = "";
  if (
    element.tooltipKey &&
    typeof Resources !== "undefined" &&
    Resources[lng] &&
    Resources[lng][element.tooltipKey]
  ) {
    tipText = Resources[lng][element.tooltipKey];
  } else if (lng == "ar") {
    tipText = element.tooltipAr || element.tooltip || "";
  } else {
    tipText = element.tooltipEn || element.tooltip || "";
  }
  if (!tipText) {
    return "";
  }
  return (
    '<span class="field-api-info" tabindex="0">' +
    '<i class="fas fa-info-circle"></i>' +
    '<span class="field-api-info-box">' +
    tipText +
    "</span></span>"
  );
}

function parseKPIComponentApiLink(raw) {
  var rawValue = (raw || "").trim();
  if (!rawValue) {
    return null;
  }
  var userName = "";
  var password = "";
  var userMatch = rawValue.match(/[?&](?:userName|username)[=:]([^&]*)/i);
  var passMatch = rawValue.match(/[?&]password[=:]([^&]*)/i);
  if (userMatch) {
    try {
      userName = decodeURIComponent(userMatch[1] || "");
    } catch (e) {
      userName = userMatch[1] || "";
    }
  }
  if (passMatch) {
    try {
      password = decodeURIComponent(passMatch[1] || "");
    } catch (e2) {
      password = passMatch[1] || "";
    }
  }
  var url = rawValue
    .replace(/[?&](?:userName|username|password)[=:][^&]*/gi, "")
    .replace(/[?&]$/, "")
    .replace(/\?&+/, "?")
    .replace(/\?$/, "");
  return {
    url: url,
    userName: userName,
    password: password,
  };
}

function extractIntegrationTunnelValue(data) {
  if (data == null) {
    return "";
  }
  if (typeof data === "string" || typeof data === "number") {
    return String(data).trim();
  }
  var result = data.result != null ? data.result : data.Result;
  if (result == null) {
    return "";
  }
  if (typeof result === "string" || typeof result === "number") {
    return String(result).trim();
  }
  if (typeof result === "object") {
    var keys = [
      "value",
      "Value",
      "data",
      "Data",
      "componentValue",
      "ComponentValue",
    ];
    for (var i = 0; i < keys.length; i++) {
      if (result[keys[i]] != null && String(result[keys[i]]).trim() !== "") {
        return String(result[keys[i]]).trim();
      }
    }
  }
  return "";
}

function getKPIComponentApiResultMessage(value) {
  if (value) {
    return value;
  }
  var lng =
    localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar"
      ? "ar"
      : "en";
  if (typeof Resources !== "undefined" && Resources[lng] && Resources[lng].noApiResults) {
    return Resources[lng].noApiResults;
  }
  return lng == "ar" ? "لا توجد نتائج" : "No results";
}

function setKPIComponentApiResult($input, text, isEmpty) {
  var $field = $input.closest(".CFIELD");
  var $result = $field.children(".api-link-result");
  if (!$result.length) {
    $result = $('<span class="api-link-result"></span>');
    $field.append($result);
  }
  $result.text(text || "");
  $result.toggleClass("is-empty", !!isEmpty);
}

function getKPIFetchButtonLabel() {
  var lng =
    localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar"
      ? "ar"
      : "en";
  if (
    typeof Resources !== "undefined" &&
    Resources[lng] &&
    Resources[lng].fetchComponentValue
  ) {
    return Resources[lng].fetchComponentValue;
  }
  return lng == "ar" ? "سحب البيانات" : "Pull data";
}

function getKPIComponentLinkMap() {
  return {
    URLA: "A",
    URLB: "B",
    URLC: "CC",
    URLD: "D",
    URLE: "E",
    URLF: "F",
    URLG: "G",
  };
}

function callKPIComponentIntegrationTunnel(parsed, $feedbackInput, componentId, $button, writeToComponent) {
  if (!parsed || !parsed.url) {
    setKPIComponentApiResult($feedbackInput, "", false);
    return;
  }
  var apiBase =
    (typeof APIURL !== "undefined" && APIURL) || window.APIURL || "";
  if (!apiBase) {
    setKPIComponentApiResult(
      $feedbackInput,
      getKPIComponentApiResultMessage(""),
      true
    );
    return;
  }
  var languageHeader =
    localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar"
      ? "ar"
      : "en";
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Language: languageHeader,
  };
  if (window.XApiSubscriptionKey) {
    headers["X-Api-Subscription-Key"] = window.XApiSubscriptionKey;
  }
  if ($button) {
    $button.prop("disabled", true);
  }
  $.ajax({
    url: apiBase.replace(/\/$/, "") + "/general/integration_tunnel",
    method: "POST",
    contentType: "application/json; charset=utf-8",
    headers: headers,
    data: JSON.stringify({
      url: parsed.url,
      userName: parsed.userName,
      password: parsed.password,
    }),
    success: function (data) {
      var value = extractIntegrationTunnelValue(data);
      var isEmpty = !value;
      var isComponentFeedback =
        $feedbackInput && $feedbackInput.attr("id") === componentId;
      setKPIComponentApiResult(
        $feedbackInput,
        isComponentFeedback && !isEmpty
          ? ""
          : getKPIComponentApiResultMessage(value),
        isEmpty
      );
      if (writeToComponent && componentId && $("#" + componentId).length) {
        $("#" + componentId).val(isEmpty ? "" : value);
      }
    },
    error: function () {
      setKPIComponentApiResult(
        $feedbackInput,
        getKPIComponentApiResultMessage(""),
        true
      );
      if (writeToComponent && componentId && $("#" + componentId).length) {
        $("#" + componentId).val("");
      }
    },
    complete: function () {
      if ($button) {
        $button.prop("disabled", false);
      }
    },
  });
}

function getKPIComponentStoredApiLink(linkId) {
  var raw = "";
  if (window.kpiEquationApiLinks && window.kpiEquationApiLinks[linkId] != null) {
    raw = window.kpiEquationApiLinks[linkId];
  } else if ($("#" + linkId).length) {
    raw = $("#" + linkId).val();
  }
  if (raw == null) {
    return "";
  }
  raw = String(raw)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .trim();
  return raw;
}

function hasKPIComponentApiLink(linkId) {
  var parsed = parseKPIComponentApiLink(getKPIComponentStoredApiLink(linkId));
  return !!(parsed && parsed.url);
}

function refreshKPIComponentApiButtons() {
  if (typeof bindMainKpiComponentApiButtons === "function") {
    bindMainKpiComponentApiButtons();
  }
}
window.refreshKPIComponentApiButtons = refreshKPIComponentApiButtons;

function bindMainKpiComponentApiButtons() {
  if (typeof isEdit === "undefined" || !isEdit || listkey != "mainkpi") {
    return;
  }
  var linkMap = getKPIComponentLinkMap();
  Object.keys(linkMap).forEach(function (linkId) {
    var componentId = linkMap[linkId];
    var $comp = $("#" + componentId);
    if (!$comp.length) {
      return;
    }
    var $field = $comp.closest(".CFIELD");
    var $existing = $field.children(
      '.kpi-fetch-api-btn[data-link-field="' + linkId + '"]'
    );
    if (!hasKPIComponentApiLink(linkId)) {
      $existing.remove();
      $field.removeClass("has-kpi-pull-btn");
      return;
    }
    $field.addClass("has-kpi-pull-btn");
    if (!$existing.length) {
      var $btn = $(
        '<button type="button" class="kpi-fetch-api-btn" data-link-field="' +
          linkId +
          '"></button>'
      );
      $btn.text(getKPIFetchButtonLabel());
      $comp.after($btn);
    }
  });
  $(".kpi-fetch-api-btn")
    .off("click.kpiComponentApi")
    .on("click.kpiComponentApi", function (e) {
      e.preventDefault();
      var $btn = $(this);
      var linkId = $btn.attr("data-link-field");
      var componentId = linkMap[linkId];
      var $comp = $("#" + componentId);
      var parsed = parseKPIComponentApiLink(getKPIComponentStoredApiLink(linkId));
      callKPIComponentIntegrationTunnel(parsed, $comp, componentId, $btn, true);
    });
}
window.bindMainKpiComponentApiButtons = bindMainKpiComponentApiButtons;

function bindKPIComponentLinkApi() {
  if (typeof listkey === "undefined" || listkey != "kpiequations") {
    return;
  }
  var linkMap = getKPIComponentLinkMap();
  var selector = Object.keys(linkMap)
    .map(function (id) {
      return "#" + id;
    })
    .join(",");
  $(selector)
    .off("blur.kpiComponentApi")
    .on("blur.kpiComponentApi", function () {
      var $input = $(this);
      var parsed = parseKPIComponentApiLink($input.val());
      if (!parsed || !parsed.url) {
        setKPIComponentApiResult($input, "", false);
        return;
      }
      callKPIComponentIntegrationTunnel(parsed, $input, null, null, false);
    });
}

function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    base64 = reader.result;
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

//////////////////
// end  working on integration btn

///////////////////////////////////////////////
//decimal number percentage
function ForNumbers(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;

  if (
    //0~9
    (charCode >= 48 && charCode <= 57) ||
    //number pad 0~9
    (charCode >= 96 && charCode <= 105) ||
    //backspace
    charCode == 8 ||
    //tab
    charCode == 9 ||
    //enter
    charCode == 13 ||
    //left, right, delete..
    (charCode >= 35 && charCode <= 46)
  ) {
    //make sure the new value below 20
    if (parseInt(this.value + String.fromCharCode(charCode), 10) <= 30)
      return true;
  }

  evt.preventDefault();
  evt.stopPropagation();

  return false;
}

//////////
var GetCurrentStage_Info = {
  onSuccess: function (sender, args) {
    var collListItem = GetCurrentStage_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var PID, stage, ismultistage;

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      PID = oListItem.get_id();
      // if (
      // 	(!SP_relatedWfList && SP_ListName == "Projects") ||
      // 	SP_relatedWfList == "Projects"
      // ) {
      // 	stage = oListItem.get_item("Stage");
      // } else {
      stage = oListItem.get_item("WFStage");
      //	}

      if (stage) {
        ismultistage = stage.indexOf(";") > -1;
      }
      if (ismultistage) {
        stage = stage.split(";");
      }
    }

    if (!USERisWF) {
      $("[data-hidestageID*=" + stage + "]").remove();
      $("[data-showstageID*=" + stage + "]").show();
      $('[data-showstageID*="allstages"]').show();

      $("[data-disablestageID]").each(function () {
        var stageofElement = $(this).attr("data-disablestageID");
        if (stageofElement.includes(stage)) {
          $(this).children("input").attr("disabled", true);
          $(this).children("select").attr("disabled", true);
          $(this).children(".PPField").attr("disabled", true);
          $(this).children("textarea").attr("disabled", true);
        } else {
          $(this).children("input").attr("disabled", false);
          $(this).children("select").attr("disabled", false);
          $(this).children(".PPField").attr("disabled", false);
          $(this).children("textarea").attr("disabled", false);
        }
      });

      $("[data-enablestageID]").each(function () {
        var stageofElement = $(this).attr("data-enablestageID");
        if (stageofElement.includes(stage)) {
          $(this).children("input").attr("disabled", false);
          $(this).children("select").attr("disabled", false);
          $(this).children(".PPField").attr("disabled", false);
          $(this).children("textarea").attr("disabled", false);
        } else {
          $(this).children("input").attr("disabled", true);
          $(this).children("select").attr("disabled", true);
          $(this).children(".PPField").attr("disabled", true);
          $(this).children("textarea").attr("disabled", true);
        }
      });
    } else {
      $('[data-showstageID*="allstages"]').show();
      $('.CFIELD[data-isWfhidestageID="' + stage + '"]').remove();
      $('.CFIELD[data-isWfshowstageID="' + stage + '"]').show();
      $("[data-isWfdisablestageID]").each(function () {
        var stageofElement = $(this).attr("data-isWfdisablestageID");
        if (stageofElement.includes(stage)) {
          $(this).children("input").attr("disabled", true);
          $(this).children("select").attr("disabled", true);
          $(this).children(".PPField").attr("disabled", true);
          $(this).children("textarea").attr("disabled", true);
        } else {
          $(this).children("input").attr("disabled", false);
          $(this).children("select").attr("disabled", false);
          $(this).children(".PPField").attr("disabled", false);
          $(this).children("textarea").attr("disabled", false);
        }
      });
      $("[data-isWfenablestageID]").each(function () {
        var stageofElement = $(this).attr("data-isWfenablestageID");
        if (stageofElement.includes(stage)) {
          $(this).children("input").attr("disabled", false);
          $(this).children("select").attr("disabled", false);
          $(this).children(".PPField").attr("disabled", false);
          $(this).children("textarea").attr("disabled", false);
        } else {
          $(this).children("input").attr("disabled", true);
          $(this).children("select").attr("disabled", true);
          $(this).children(".PPField").attr("disabled", true);
          $(this).children("textarea").attr("disabled", true);
        }
      });

      $("[data-isWfrequirestageID]").each(function () {
        var stageofElement = $(this).attr("data-isWfenablestageID");
        if (stageofElement.includes(stage)) {
          $(this).children("label").attr("required", true);
          $(this).children("input").attr("required", true);
          $(this).children("select").attr("required", true);
          $(this).children(".PPField").attr("required", true);
          $(this).children("textarea").attr("required", true);
        }
      });
    }
    $(`.form-tabs .nav-link:first-child`).trigger("click");
    if (PCODE) {
      $(".headtwo").append(
        '<a class="" href="' +
          _spPageContextInfo.webAbsoluteUrl +
          '"><span class="litem">Home</span></a>' +
          '<a class="" href="' +
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/View.aspx?ListKey=projects&IID=" +
          PID +
          '"><span data-trans-projectdetails class="litem Resources"></span></a>' //+
      );
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".ms-Icon--Settings").length) {
      clearInterval(checkNotificationHTML);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        GetCurrentStage_Info.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(SP_ListName);
    var camlQuery = new SP.CamlQuery();
    var PQUERY;
    PQUERY =
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='ID'/><Value Type='Integer'>" +
      IID +
      "</Value></Eq></And></Where></Query><RowLimit>1</RowLimit></View>";
    camlQuery.set_viewXml(PQUERY);
    GetCurrentStage_Info.g.collListItem = oList.getItems(camlQuery);
    clientContext.load(GetCurrentStage_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, GetCurrentStage_Info.onSuccess),
      Function.createDelegate(this, GetCurrentStage_Info.onError)
    );
  },
  // Global variables
  g: {},
};

var get_hierarchies = {
  init: async function (lookupList) {
    accessCallisDone = false;
    let isListConditional1;
    let isListConditional2;
    let isListConditional3;
    let isListConditional4;

    if (!tempRoleHierarchies.length) {
      tempRoleHierarchies = Array.from(myRoleConfig[0].dataFilter.hierarchies);
    }
    if (tempRoleHierarchies.length) {
      isListConditional1 = tempRoleHierarchies[0].listName == lookupList;
      isListConditional2 =
        tempRoleHierarchies[0].subRelation.listName == lookupList;
      isListConditional3 =
        tempRoleHierarchies[0].subRelation.subRelation.listName == lookupList;
      isListConditional4 = tempRoleHierarchies[0].subRelation.subRelation
        .subRelation
        ? tempRoleHierarchies[0].subRelation.subRelation.subRelation.listName ==
          lookupList
        : false;
    }
    let allGood =
      isListConditional1 ||
      isListConditional2 ||
      isListConditional3 ||
      isListConditional4;
    if (allGood) {
      tempRoleHierarchies.shift();
      initiateDataLevelAccess(lookupList);
    } else if (tempRoleHierarchies.length) {
      tempRoleHierarchies.shift();
      if (tempRoleHierarchies.length) {
        get_hierarchies.init(lookupList);
      } else {
        accessCallisDone = true;
      }
    } else {
      accessCallisDone = true;
    }
    await waitUntil(() => accessCallisDone === true);
  },
};

async function waitUntil(condition, time = 500) {
  while (!condition()) {
    await new Promise((resolve) => setTimeout(resolve, time));
  }
}
///////////////////////////////////
//working on parent type

window.get_parent_data = {
  init: function (listName, code, parentFieldName, fieldName, getGrandParent, onDone) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(listName);
    var camlQuery = new SP.CamlQuery();

    valueBasedOnParent = [];

    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef  Name=\"" +
        parentFieldName +
        '" /><Value Type="Text">' +
        code +
        "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );

    get_parent_data.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    get_parent_data.g.fieldName = fieldName;
    get_parent_data.g.getGrandParent = getGrandParent;
    get_parent_data.g.onDone = onDone;

    clientContext.load(get_parent_data.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, get_parent_data.onSuccess),
      Function.createDelegate(this, get_parent_data.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = get_parent_data.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();

    var dynamicFieldName = get_parent_data.g.fieldName;
    var getGrandParent = get_parent_data.g.getGrandParent;
    var dynamicVal = "";
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();

      dynamicVal = oListItem.get_item(dynamicFieldName) || "";

      if (getGrandParent && getGrandParent.length) {
        get_grandparent_data.init(
          getGrandParent[0].grandParentList,
          dynamicVal,
          getGrandParent[0].grandParentFieldName,
          getGrandParent[0].grandParentTargetFieldName
        );
      } else {
        valueBasedOnParent.push(dynamicVal);
      }
    }
    if (typeof get_parent_data.g.onDone === "function") {
      var parentDone = get_parent_data.g.onDone;
      get_parent_data.g.onDone = null;
      parentDone();
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
    if (typeof get_parent_data.g.onDone === "function") {
      var parentDone = get_parent_data.g.onDone;
      get_parent_data.g.onDone = null;
      parentDone();
    }
  },
  // Global variables
  g: {},
};

//////////////////////////////////

var get_grandparent_data = {
  init: function (
    listName,
    code,
    grandParentFieldName,
    grandParentTargetFieldName
  ) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(listName);
    var camlQuery = new SP.CamlQuery();

    valueBasedOnParent = [];

    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef  Name=\"" +
        grandParentFieldName +
        '" /><Value Type="Text">' +
        code +
        "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );

    get_grandparent_data.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    get_grandparent_data.g.grandParentTargetFieldName =
      grandParentTargetFieldName;

    clientContext.load(get_grandparent_data.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, get_grandparent_data.onSuccess),
      Function.createDelegate(this, get_grandparent_data.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = get_grandparent_data.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();

    var grandParentTargetFieldName =
      get_grandparent_data.g.grandParentTargetFieldName;
    var dynamicGrandParentVal = "";
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();

      dynamicGrandParentVal =
        oListItem.get_item(grandParentTargetFieldName) || "";

      valueBasedOnParent.push(dynamicGrandParentVal);
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {},
};


let date_Controlling_Call = {
	// The main Initialization function
	init: function (controlingListName, controlingCode, maxDateField, dateControlingInput, $this,minDateField, minDateControlList,minDateControlingCode ) {
		var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext.get_web().get_lists().getByTitle(controlingListName);
		var secondMinList = clientContext.get_web().get_lists().getByTitle(minDateControlList);
		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml(
			`<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">${controlingCode}</Value></Eq></Where><OrderBy><FieldRef Name="Created" Ascending="True" /></OrderBy></Query></View>`
		);
    // var camlQueryForMinDate = new SP.CamlQuery();
		// camlQuery.set_viewXml(
		// 	`<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">${minDateControlingCode}</Value></Eq></Where><OrderBy><FieldRef Name="Created" Ascending="True" /></OrderBy></Query></View>`
		// );
    debugger
    date_Controlling_Call.g.maxDateField = maxDateField;
    date_Controlling_Call.g.minDateField = minDateField;
    date_Controlling_Call.g.$this = $this;
		date_Controlling_Call.g.collListItem = oList.getItems(camlQuery);
    // if(minDateField){

    //   date_Controlling_Call.g.collListItem = secondMinList.getItems(camlQueryForMinDate);
    // }
		clientContext.load(date_Controlling_Call.g.collListItem);
		clientContext.executeQueryAsync(
			Function.createDelegate(this, date_Controlling_Call.onSuccess),
			Function.createDelegate(this, date_Controlling_Call.onError)
		);
	},
	onSuccess: function (sender, args) {
		var collListItem = date_Controlling_Call.g.collListItem;

		var listItemEnum = collListItem.getEnumerator();


		while (listItemEnum.moveNext()) {
			tableRows = "";
			var oListItem = listItemEnum.get_current();
			let maxvalue = oListItem.get_item(date_Controlling_Call.g.maxDateField);
			// let minDateValue = oListItem.get_item(date_Controlling_Call.g.minDateField);
      // maxvalue = `${year}-${month}-${day}`;
       maxDate = convertToWantedDateFormat.convert(maxvalue);
      //  minDateValue = convertToWantedDateFormat.convert(minDateValue);
      // date_Controlling_Call.g.$this.attr("min",minDateValue);
      date_Controlling_Call.g.$this.attr("max",maxDate);
		}
	},
	onError: function (sender, args) {
		console.log(
			"Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
		);
	},
  g:{
  }
};

let convertToWantedDateFormat = {

  convert(dateToBeConverted){
    let year = dateToBeConverted.getFullYear();
    let month = dateToBeConverted.getMonth() + 1; // Months are zero-indexed, so we add 1
    month = month < 10? `0${month}`:month;
    let day = dateToBeConverted.getDate();
    day = day <10 ? `0${day}`:day;
    convertedDate = `${year}-${month}-${day}`;

    return convertedDate;
  }}

  var GetLastProgressFromHistory = {
    // The main Initialization function
    preinit: function () {
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        GetLastProgressFromHistory.init();
      });
    },
    init: function () {
      var clientContext = new SP.ClientContext.get_current();
      var oList = clientContext
        .get_web()
        .get_lists()
        .getByTitle("EngineeringProjects");
      var camlQuery = new SP.CamlQuery();
      //var PQuery = "<View><Query><Where><Eq><FieldRef Name = 'Title' /><Value Type='Text'>'"+EngineeringProjectCode+"'</Value></Eq></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>"
      var PQuery = "<View><Query><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>";
   
      camlQuery.set_viewXml(PQuery);
      GetLastProgressFromHistory.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
      clientContext.load(GetLastProgressFromHistory.g.collListItem);
      clientContext.executeQueryAsync(
        Function.createDelegate(this, GetLastProgressFromHistory.onSuccess),
        Function.createDelegate(this, GetLastProgressFromHistory.onError)
      );
    },
    onSuccess: function (sender, args) {
      var collListItem = GetLastProgressFromHistory.g.collListItem;
      var listItemEnum = collListItem.getEnumerator();
   
      while(listItemEnum.moveNext()) {
        var oListItem = listItemEnum.get_current();
        LastProjectHistory.push(oListItem);
      }

    },
    onError: function (sender, args) {
      console.log(
        "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
      );
    },
    // Global variables
    g: {},
  }

  var GetManHoursHistory = {
    // The main Initialization function
    preinit: function () {
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        GetManHoursHistory.init();
      });
    },
    init: function () {
      var clientContext = new SP.ClientContext.get_current();
      var oList = clientContext
        .get_web()
        .get_lists()
        .getByTitle("EngineeringProjectsHistory");
      var camlQuery = new SP.CamlQuery();
      //var PQuery = "<View><Query><Where><Eq><FieldRef Name = 'Title' /><Value Type='Text'>'"+EngineeringProjectCode+"'</Value></Eq></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>"
      var PQuery = "<View><Query><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>";
   
      camlQuery.set_viewXml(PQuery);
      GetManHoursHistory.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
      clientContext.load(GetManHoursHistory.g.collListItem);
      clientContext.executeQueryAsync(
        Function.createDelegate(this, GetManHoursHistory.onSuccess),
        Function.createDelegate(this, GetManHoursHistory.onError)
      );
    },
    onSuccess: function (sender, args) {
      var collListItem = GetManHoursHistory.g.collListItem;
      var listItemEnum = collListItem.getEnumerator();
   
      while(listItemEnum.moveNext()) {
        var oListItem = listItemEnum.get_current();
        ManHoursHistory.push(oListItem);
      }

    },
    onError: function (sender, args) {
      console.log(
        "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
      );
    },
    // Global variables
    g: {},
  }

  var GetHolidaysOFF = {
    // The main Initialization function
    preinit: function () {
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        GetHolidaysOFF.init();
      });
    },
    init: function () {
      var clientContext = new SP.ClientContext.get_current();
      var oList = clientContext
        .get_web()
        .get_lists()
        .getByTitle("LocalHolidays");
      var camlQuery = new SP.CamlQuery();
      
      var PQuery = '<View><Query><Where><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>deleted</Value></Neq></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>'
   
      camlQuery.set_viewXml(PQuery);
      GetHolidaysOFF.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
      clientContext.load(GetHolidaysOFF.g.collListItem);
      clientContext.executeQueryAsync(
        Function.createDelegate(this, GetHolidaysOFF.onSuccess),
        Function.createDelegate(this, GetHolidaysOFF.onError)
      );
    },
    onSuccess: function (sender, args) {
      var collListItem = GetHolidaysOFF.g.collListItem;
      var listItemEnum = collListItem.getEnumerator();
   
      while(listItemEnum.moveNext()) {
        
        var oListItem = listItemEnum.get_current();
        var date = new Date(oListItem.get_item("HolidayDate"));
        var date2 = new Date(oListItem.get_item("HolidayEndDate"));
        var duration = oListItem.get_item("HolidayDuration");
       
            var firstdate = new Date(oListItem.get_item("HolidayDate"));
            let day = firstdate.getDate();
            let month = firstdate.getMonth();
            let year = firstdate.getFullYear();
            firstdate = new Date(year,month,day);

            HolidaysOff.push(firstdate);

          while(duration >= 1)
          {

            if(date <= date2)
            {
              let day = date.getDate();
              let month = date.getMonth();
              let year = date.getFullYear();
              date = new Date(year,month,day);

              HolidaysOff.push(date);
            }

            var date = date.setDate(date.getDate() +  1);

            date = new Date(date);

            duration = duration - 1;
          }

      }
    },
    onError: function (sender, args) {
      console.log(
        "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
      );
    },
    // Global variables
    g: {},
   /* onSuccess: function (sender, args) {
        var collListItem = GetHolidaysOFF.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
      /*  listItemEnum.forEach(_item=>{
          HolidaysOff.append(_item)
        });
        while (listItemEnum.moveNext()) {
         HolidaysOff.append(listItemEnum.get_current());
        }
    },
    onError: function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function () {
        
    },
    // The main Initialization function
    init: function () {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle("Holidays");
        var camlQuery = new SP.CamlQuery();
         GetHolidaysOFF.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(GetHolidaysOFF.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, GetHolidaysOFF.onSuccess),
            Function.createDelegate(this, GetHolidaysOFF.onError)
        );
    },
    // Global variables
    g: {
      
    }*/
  };

window.Get_ActualAnnualTotal = {
  onSuccess: function (sender, args) {
    debugger
    var collListItem = Get_ActualAnnualTotal.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      var totalAllActual =
        oListItem.get_item("Actual") == null ? 0 : oListItem.get_item("Actual");
      if (isEdit) {
        $("#Actual").val(totalAllActual);
      }
      if (isView) {
        $("#Actual").html(totalAllActual);
      }
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function (year) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("KPIResults");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><And><Eq><FieldRef Name='KPI'/><Value Type='Text'>" +
        KPICode +
        "</Value></Eq><Eq><FieldRef Name='Year'/><Value Type='Text'>" +
        year +
        "</Value></Eq></And></And></Where></Query></View>"
    );

    Get_ActualAnnualTotal.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_ActualAnnualTotal.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_ActualAnnualTotal.onSuccess),
      Function.createDelegate(this, Get_ActualAnnualTotal.onError)
    );
  },
  g: {},
};

window.Get_BenefitActualAnnualTotal = {
  onSuccess: function (sender, args) {
    var collListItem = Get_BenefitActualAnnualTotal.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      var totalAllActual =
        oListItem.get_item("Actual") == null ? 0 : oListItem.get_item("Actual");
      if (isEdit) {
        $("#Actual").val(totalAllActual);
      }
      if (isView) {
        $("#Actual").html(totalAllActual);
      }
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function (year) {
    var benefitTitle =
      (typeof benefitCode !== "undefined" && benefitCode) ||
      $("#Title").val() ||
      "";
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("KPIResults");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><And><Eq><FieldRef Name='BenefitCode'/><Value Type='Text'>" +
        benefitTitle +
        "</Value></Eq><Eq><FieldRef Name='Year'/><Value Type='Text'>" +
        year +
        "</Value></Eq></And></And></Where></Query></View>"
    );

    Get_BenefitActualAnnualTotal.g.collListItem = oList.getItems(camlQuery);
    clientContext.load(Get_BenefitActualAnnualTotal.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_BenefitActualAnnualTotal.onSuccess),
      Function.createDelegate(this, Get_BenefitActualAnnualTotal.onError)
    );
  },
  g: {},
};
$(document).ready(function () {
  setTimeout(function () {
    (function () {
      if (!(isEdit || isNew)) return;

      var managerUniquenessConfig = null;
      if (listkey === "projects") {
        managerUniquenessConfig = {
          uniqueField: "ProjectManager",
          relatedFields: [
            "ProjectOwner",
            "ProjectSponsor",
            "MawaredProjectManager",
          ],
        };
      } else if (listkey === "initiatives") {
        managerUniquenessConfig = {
          uniqueField: "InitiativePM",
          relatedFields: ["InitiativeOwner"],
        };
      } else {
        return;
      }

      var uniqueField = managerUniquenessConfig.uniqueField;
      var relatedFields = managerUniquenessConfig.relatedFields;
      var watchedFields = [uniqueField].concat(relatedFields);
      var uniqueFieldLabel =
        listkey === "initiatives" ? "مدير المبادرة" : "مدير المشروع";
      var PLACEHOLDER_EMAIL = "أدخل اسم أو بريد الكتروني...";

      function parseHiddenUsers(fieldId) {
        var hidVal = $("#" + fieldId + "_TopSpan_HiddenInput").val();
        if (!hidVal) return [];
        try {
          var parsed = JSON.parse(hidVal.replace(/&quot;/g, '"'));
          if (!Array.isArray(parsed)) return [];
          return parsed
            .map(function (u) {
              var entityEmail =
                u.EntityData && u.EntityData.Email ? u.EntityData.Email : "";
              var key = (u.Key || entityEmail || u.DisplayText || "")
                .toString()
                .trim()
                .toLowerCase();
              var displayName = (u.DisplayText || u.Key || "").toString().trim();
              return key ? { key: key, displayName: displayName } : null;
            })
            .filter(Boolean);
        } catch (e) {
          return [];
        }
      }

      function getFieldUsers(fieldId) {
        var fromHidden = parseHiddenUsers(fieldId);
        if (fromHidden.length) return fromHidden;

        if (!isNew) return [];

        var resolvedEl = $(
          "#" + fieldId + "_TopSpan_ResolvedList .ms-entity-resolved"
        ).first();
        if (resolvedEl.length) {
          var displayName = $.trim(resolvedEl.text());
          if (displayName) {
            return [{ key: displayName.toLowerCase(), displayName: displayName }];
          }
        }
        var dataEmail = $("#" + fieldId).attr("data-email");
        if (
          dataEmail &&
          dataEmail.trim() !== "" &&
          dataEmail.trim() !== PLACEHOLDER_EMAIL
        ) {
          var email = $.trim(dataEmail);
          return [{ key: email.toLowerCase(), displayName: email }];
        }
        return [];
      }

      function clearField(fieldId) {
        var delBtn = $(
          "#" + fieldId + "_TopSpan_ResolvedList .sp-peoplepicker-delImage"
        ).first();
        if (delBtn.length) {
          delBtn.click();
        } else {
          $("#" + fieldId + "_TopSpan_HiddenInput").val("");
          $("#" + fieldId + "_TopSpan_EditorInput").val("");
          $("#" + fieldId).attr("data-email", "");
        }
      }

      function checkManagerUniqueness() {
        var managerUsers = getFieldUsers(uniqueField);
        if (!managerUsers.length) return false;

        var managerKeys = {};
        managerUsers.forEach(function (u) {
          managerKeys[u.key] = u.displayName;
        });

        var conflictName = null;
        relatedFields.some(function (fieldId) {
          return getFieldUsers(fieldId).some(function (user) {
            if (managerKeys[user.key]) {
              conflictName = managerKeys[user.key];
              return true;
            }
            return false;
          });
        });

        if (!conflictName) return false;

        clearField(uniqueField);
        alert(
          "تم تفريغ حقل " +
            uniqueFieldLabel +
            " لأن المستخدم '" +
            conflictName +
            "' موجود في أحد الحقول الأخرى."
        );
        return true;
      }

      function scheduleCheck() {
        setTimeout(checkManagerUniqueness, 200);
      }

      function attachHandlers(fieldId, picker) {
        if (picker._managerUniquenessAttached) return;

        var previousOnResolved = picker.OnUserResolvedClientScript;
        picker.OnUserResolvedClientScript = function () {
          if (typeof previousOnResolved === "function") {
            previousOnResolved.apply(this, arguments);
          }
          scheduleCheck();
        };

        $(document).on(
          "click.managerUniqueness",
          "#" + fieldId + "_TopSpan_ResolvedList .sp-peoplepicker-delImage",
          scheduleCheck
        );

        if (isEdit) {
          $("#" + fieldId + "_TopSpan_EditorInput").on(
            "input.managerUniqueness blur.managerUniqueness",
            scheduleCheck
          );
          $("#" + fieldId + "_TopSpan_HiddenInput").on(
            "input.managerUniqueness change.managerUniqueness",
            scheduleCheck
          );
        }

        picker._managerUniquenessAttached = true;
      }

      function waitForPickers(onReady) {
        var retryCount = 0;
        var maxRetries = isEdit ? 100 : 50;
        var timer = setInterval(function () {
          var allReady = watchedFields.every(function (fieldId) {
            return !!SPClientPeoplePicker.SPClientPeoplePickerDict[
              fieldId + "_TopSpan"
            ];
          });
          retryCount++;
          if (allReady || retryCount > maxRetries) {
            clearInterval(timer);
            if (allReady) onReady();
          }
        }, 300);
      }

      waitForPickers(function () {
        watchedFields.forEach(function (fieldId) {
          var picker =
            SPClientPeoplePicker.SPClientPeoplePickerDict[fieldId + "_TopSpan"];
          if (picker) attachHandlers(fieldId, picker);
        });
        checkManagerUniqueness();
      });
    })();
  }, 3000);
});

// Function to get Role for a group name from userCalls.g.SPGroups
window.getRoleForGroupName = function(groupName) {
  if (typeof userCalls === 'undefined' || !userCalls.g || !userCalls.g.SPGroups) {
    return null;
  }
  
  for (var i = 0; i < userCalls.g.SPGroups.length; i++) {
    var spGroup = userCalls.g.SPGroups[i];
    if (spGroup.groupsName && Array.isArray(spGroup.groupsName)) {
      for (var j = 0; j < spGroup.groupsName.length; j++) {
        if (spGroup.groupsName[j] === groupName && spGroup.Role) {
          return spGroup.Role;
        }
      }
    }
  }
  return null;
};

// Function to translate groups options by adding data-trans and class attributes
window.translateGroupsOptions = function(selectElement) {
  if (!selectElement || !selectElement.length) {
    return;
  }
  
  selectElement.find('option:not(:first)').each(function() {
    var $option = $(this);
    var groupName = $option.val();
    if (groupName) {
      var role = window.getRoleForGroupName(groupName);
      if (role) {
        $option.attr('data-trans-' + role, '');
        $option.addClass('Resources');
      }
    }
  });
  
  // Call changeResources to apply translations
  if (typeof changeResources === 'function') {
    changeResources();
  }
};

// Function to load user groups from SharePoint
window.loadUserGroupsFromSharePoint = function(loginName, groupsSelectId, selectedValue) {
  var groupsSelect = $('#' + groupsSelectId);
  if (!groupsSelect.length) {
    return;
  }
  
  // Clear existing options except the first one
  groupsSelect.find('option:not(:first)').remove();
  groupsSelect.prop('disabled', true);
  
  // First, use ensureUser to get the User ID, then get groups by ID
  // This works better than getbyloginname for complex login formats
  var ensureUserUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/ensureuser";
  
  // Get RequestDigest - try from DOM first, then from context
  var requestDigest = $("#__REQUESTDIGEST").val() || 
                      (typeof _spPageContextInfo !== "undefined" && _spPageContextInfo.formDigestValue) || 
                      "";
  
  $.ajax({
    url: ensureUserUrl,
    method: "POST",
    headers: {
      "Accept": "application/json;odata=verbose",
      "Content-Type": "application/json;odata=verbose",
      "X-RequestDigest": requestDigest
    },
    data: JSON.stringify({
      'logonName': loginName
    }),
    success: function(userData) {
      if (userData.d && userData.d.Id) {
        var userId = userData.d.Id;
        // Now get groups using User ID
        var groupsUrl = _spPageContextInfo.webAbsoluteUrl + 
          "/_api/web/GetUserById(" + userId + ")/Groups";
        
        $.ajax({
          url: groupsUrl,
          method: "GET",
          headers: {
            "Accept": "application/json;odata=verbose"
          },
          success: function(data) {
            groupsSelect.find('option:not(:first)').remove(); // Clear again to be safe
            if (data.d && data.d.results && data.d.results.length > 0) {
              // Add groups as options
              data.d.results.forEach(function(group) {
                var groupTitle = group.Title || group.LoginName || "";
                if (groupTitle) {
                  var role = window.getRoleForGroupName ? window.getRoleForGroupName(groupTitle) : null;
                  var $option = $('<option></option>')
                    .attr('value', groupTitle)
                    .text(groupTitle);
                  
                  if (role) {
                    $option.attr('data-trans-' + role, '');
                    $option.addClass('Resources');
                  }
                  
                  groupsSelect.append($option);
                }
              });
              
              // Translate groups options
              if (typeof window.translateGroupsOptions === 'function') {
                window.translateGroupsOptions(groupsSelect);
              }
              
              // Set the selected value if provided (for edit mode)
              if (selectedValue) {
                // Use setTimeout to ensure DOM is updated
                setTimeout(function() {
                  groupsSelect.val(selectedValue);
                  // Also set the value attribute for consistency
                  groupsSelect.attr("value", selectedValue);
                }, 100);
              } else if (window.listkey == "delegations" && groupsSelectId == "GroupName") {
                // Auto-select group based on currentUserRole for delegations (only for allowed roles)
                var allowedRoles = ["InitiativeManager", "InitiativeOwner", "ProjectManager", "ProjectOwner", "KPIOwner", "ObjectiveOwner", "PerformanceLeader"];
                var currentRole = window.currentUserRole || "";
                
                // Only auto-select and disable if currentRole is in allowedRoles
                if (allowedRoles.indexOf(currentRole) > -1 && typeof userCalls !== 'undefined' && userCalls.g && userCalls.g.SPGroups && Array.isArray(userCalls.g.SPGroups)) {
                  // Find the group name that matches currentUserRole
                  var matchingGroupName = null;
                  for (var spIdx = 0; spIdx < userCalls.g.SPGroups.length; spIdx++) {
                    var spGroup = userCalls.g.SPGroups[spIdx];
                    if (spGroup.Role === currentRole && spGroup.groupsName && Array.isArray(spGroup.groupsName)) {
                      // Check if any of the group names exist in the select options
                      for (var gnIdx = 0; gnIdx < spGroup.groupsName.length; gnIdx++) {
                        var groupName = spGroup.groupsName[gnIdx];
                        if (groupsSelect.find('option[value="' + groupName + '"]').length > 0) {
                          matchingGroupName = groupName;
                          break;
                        }
                      }
                      if (matchingGroupName) break;
                    }
                  }
                  
                  // Auto-select the matching group
                  if (matchingGroupName) {
                    setTimeout(function() {
                      groupsSelect.val(matchingGroupName);
                      groupsSelect.attr("value", matchingGroupName);
                    }, 100);
                  }
                  
                  // Disable the select in new and edit modes for delegations (only for allowed roles)
                  setTimeout(function() {
                    if (window.isNew || window.isEdit) {
                      groupsSelect.prop('disabled', true);
                    }
                  }, 200);
                }
              }
            } else {
              groupsSelect.append('<option value="" disabled>No groups found</option>');
            }
            
            // Only enable if not delegations with allowed role or if not in new/edit mode
            var allowedRoles = ["InitiativeManager", "InitiativeOwner", "ProjectManager", "ProjectOwner", "KPIOwner", "ObjectiveOwner", "PerformanceLeader"];
            var currentRole = window.currentUserRole || "";
            var shouldDisable = window.listkey == "delegations" && groupsSelectId == "GroupName" && (window.isNew || window.isEdit) && allowedRoles.indexOf(currentRole) > -1;
            
            if (!shouldDisable) {
              groupsSelect.prop('disabled', false);
            }
          },
          error: function(xhr, status, error) {
            console.error("Error loading user groups from SharePoint:", xhr.responseText);
            groupsSelect.prop('disabled', false);
            if (groupsSelect.siblings('.inputInfo').length) {
              groupsSelect.siblings('.inputInfo').text(
                localStorage.getItem("lng") == "ar" || !localStorage.getItem("lng")
                  ? "حدث خطأ في تحميل المجموعات"
                  : "Error loading groups"
              );
            }
          }
        });
      } else {
        groupsSelect.prop('disabled', false);
        if (groupsSelect.siblings('.inputInfo').length) {
          groupsSelect.siblings('.inputInfo').text(
            localStorage.getItem("lng") == "ar" || !localStorage.getItem("lng")
              ? "حدث خطأ في تحميل المجموعات"
              : "Error loading groups"
          );
        }
      }
    },
    error: function(xhr, status, error) {
      console.error("Error ensuring user in SharePoint:", xhr.responseText);
      groupsSelect.prop('disabled', false);
      if (groupsSelect.siblings('.inputInfo').length) {
        groupsSelect.siblings('.inputInfo').text(
          localStorage.getItem("lng") == "ar" || !localStorage.getItem("lng")
            ? "حدث خطأ في تحميل المجموعات"
            : "Error loading groups"
        );
      }
    }
  });
}
