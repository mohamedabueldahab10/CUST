var isuploaddone = 0,
  fileCount = 0,
  Fileelements,
  arrayBuffer,
  numberfolderstocreate = 0,
  numberoffolders = ListArray.filter((v) => v.subfolder === true).length,
  folderdirectory,
  Documents_Library;
window.IdeaId;
// var STCODE = '';
// if (window.location.href.includes("STCODE")) {
//   STCODE = window.location.href.split('STCODE=')[1].split('&')[0];
// }
var projectManagerPickedToProjectCenter = "";

var kpiName = "",
  kpicurrentYear = "",
  kpiTotalActual = 0,
  kpiType = "",
  kpiSector = "",
  kpiSubSector = "",
  kpiMainGoalRelated = "",
  kpiSubGoalRelated = "",
  kpiPortfolio = "",
  kpiPerformanceAnalysis = "",
  kpiYearPicked = "",
  kpiMidPicked = "",
  kpiQuarterPicked = "",
  kpiMonthPicked = "",
  kpiPeriodTypeUpdate = "",
  kpiRecurrenceChanged = "";
  window.nesteddeliverabledisCreated = false;

var mainKpiIsUpload = false;

var masterIdWhenCreate = 0;

var allEnterpriseResources = [],
  projectBuildTeamArr = [],
  projectManagerPickerToEpm;

var fieldTargetListInMaster = []; // save the field value in other list as a master section

// get all id of master when create
allNewMasterIdRelatedCodeArr = [];
//

if (
  localStorage.getItem("lng") == null ||
  localStorage.getItem("lng") == "ar"
) {
  var No_Data = "لا يوجد";
} else {
  var No_Data = "No Data";
}
if (
  localStorage.getItem("lng") == null ||
  localStorage.getItem("lng") == "ar"
) {
  var enternameemail = Resources.ar["enternameemail"];
} else {
  var enternameemail = Resources.en["enternameemail"];
}
var DVfirstStage = "DVStage01";
var CRfirstStage = "CRStage01";
window.newprojectsubmitted = false;
window.isProjectNewPage = window.location.href.indexOf("Project") > -1;
var allResourcesArr = [],
  buildTeamResourcesArr = [];

var newFormUserCalls = {
  get_AllResources: function () {
    $.ajax({
      url:
        _spPageContextInfo.webAbsoluteUrl +
        "/_api/ProjectServer/EnterpriseResources",
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (data) {
        allResourcesArr = data.d.results;
        SP.SOD.registerSod(
          "PS.ProjectContext",
          SP.Utilities.Utility.getLayoutsPageUrl("ps.js")
        );
        SP.SOD.loadMultiple(["PS.ProjectContext"], GetProjects);
      },
    });
  },
  g: {
    Groups: [],
  },
};

//added to handle the Koi Results list
var kpiResultsArr = [];

// to handle BenefitMetric Results list
var benefitMetricsArr = [];

window.New_Data_Submit = {

  preinit: function () {
    $(".errormsg").remove();
    $(".container-body").addClass("was-validated");
    var isCheckMember = false;

    if (
      listkey == "portfolio" &&
      $("#Manager").find("span.sp-peoplepicker-userSpan").attr("sid")
    ) {
      pickerValidationDone = true;
      isCheckMember = true;
      var portfoliomanager =
        $("#Manager").find("span.sp-peoplepicker-userSpan").attr("sid") ==
        undefined
          ? ""
          : SP.FieldUserValue.fromUser(
              $("#Manager").find("span.sp-peoplepicker-userSpan").attr("sid")
            );
      var portfoliomanagername = encodeURIComponent(
        portfoliomanager.get_lookupValue()
      );
      userCalls.isMember(
        "System Portfolio Manager",
        portfoliomanagername,
        "Manager"
      );
    }
    /*if (
      (listkey == "mainkpi" ||
        (listkey == "changerequest" && RListKey == "mainkpi")) &&
      $("#Owner").find("span.sp-peoplepicker-userSpan").attr("sid")
    ) {
      isCheckMember = true;
      var kpiowner =
        $("#Owner").find("span.sp-peoplepicker-userSpan").attr("sid") ==
        undefined
          ? ""
          : SP.FieldUserValue.fromUser(
              $("#Owner").find("span.sp-peoplepicker-userSpan").attr("sid")
            );
      var kpiownername = encodeURIComponent(kpiowner.get_lookupValue());
      membersGroupCheckArray.push({
        groupName: "KPI Owners",
        userLoginName: kpiownername,
        fieldID: "Owner",
      });
    }*/
    if (
      (listkey == "mainkpi" ||
        (listkey == "changerequest" && RListKey == "mainkpi")) &&
      $("#PerformanceLeader").find("span.sp-peoplepicker-userSpan").attr("sid")
    ) {
      pickerValidationDone = true;
      isCheckMember = true;
      var perforrmanceleader =
        $("#PerformanceLeader")
          .find("span.sp-peoplepicker-userSpan")
          .attr("sid") == undefined
          ? ""
          : SP.FieldUserValue.fromUser(
              $("#PerformanceLeader")
                .find("span.sp-peoplepicker-userSpan")
                .attr("sid")
            );
      var perforrmanceleadername = encodeURIComponent(
        perforrmanceleader.get_lookupValue()
      );
      membersGroupCheckArray.push({
        groupName: "Performance Leaders",
        userLoginName: perforrmanceleadername,
        fieldID: "PerformanceLeader",
      });
    }
    if (
      (listkey == "mainkpi" ||
        (listkey == "changerequest" && RListKey == "mainkpi")) &&
      $("#PerformanceLeader2").find("span.sp-peoplepicker-userSpan").attr("sid")
    ) {
      pickerValidationDone = true;
      isCheckMember = true;
      var perforrmanceleader =
        $("#PerformanceLeader2")
          .find("span.sp-peoplepicker-userSpan")
          .attr("sid") == undefined
          ? ""
          : SP.FieldUserValue.fromUser(
              $("#PerformanceLeader2")
                .find("span.sp-peoplepicker-userSpan")
                .attr("sid")
            );
      var perforrmanceleadername = encodeURIComponent(
        perforrmanceleader.get_lookupValue()
      );
      membersGroupCheckArray.push({
        groupName: "Performance Leaders",
        userLoginName: perforrmanceleadername,
        fieldID: "PerformanceLeader2",
      });
    }
    // membersGroupCheckArray.length > 0 ? userCalls.isMember(membersGroupCheckArray[0].groupName, membersGroupCheckArray[0].userLoginName, membersGroupCheckArray[0].fieldID) : '';
    var pickervalid = true; //check required people picker
    var multiSelectValid = true;
    $("[type=picker][required]").each(function () {
      var isPickerFromParent = $(this).hasClass("picker-from-parent");
      var hasResolvedUser = $(this).find("span.sp-peoplepicker-userSpan").length > 0;
      var hasAutoResolvedValue =
        isPickerFromParent &&
        !!$(this).attr("user-email") &&
        $(this).attr("user-email") != enternameemail;

      if (
        listkey == "changerequest" &&
        !hasResolvedUser &&
        !hasAutoResolvedValue
      ) {
        if (
          $(this).attr("data-email") == enternameemail ||
          !$(this).attr("data-email")
        ) {
          pickervalid = false;
          $(this).addClass("picker-error");
          $(this).removeClass("picker-valid");
        }
      } else if (!hasResolvedUser && !hasAutoResolvedValue) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
        // return false;
      } else {
        $(this).removeClass("picker-error");
        $(this).addClass("picker-valid");
      }
    });

    $("[type=picker]").each(function () {
      var isPickerFromParent = $(this).hasClass("picker-from-parent");
      var hasAutoResolvedValue =
        isPickerFromParent &&
        !!$(this).attr("user-email") &&
        $(this).attr("user-email") != enternameemail;
      if (
        !hasAutoResolvedValue &&
        $(this).find("span.sp-peoplepicker-userSpan").attr("aria-invalid") ==
        "true"
      ) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
      }

      if (
        !hasAutoResolvedValue &&
        $(this).find("span.ms-formvalidation.sp-peoplepicker-errorMsg").length
      ) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
      }
    });

    //////////
    $("[type=multipicker][required]").each(function () {
      if (
        $(this).find("span.sp-peoplepicker-userSpan").length == 0 &&
        $(this).attr("data-email") == enternameemail
      ) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
        // return false;
      } else if (
        $(this).find("span.sp-peoplepicker-userSpan").length == 0 &&
        !$(this).attr("data-email")
      ) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
      } else {
        $(this).removeClass("picker-error");
        $(this).addClass("picker-valid");
      }
    });

    $("[type=multipicker]").each(function () {
      if (
        $(this).find("span.sp-peoplepicker-userSpan").attr("aria-invalid") ==
        "true"
      ) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
      }
    });

    if ($(".was-validated .form-control:invalid").length == 0 && pickervalid) {
      membersGroupCheckArray.length > 0
        ? userCalls.isMember(
            membersGroupCheckArray[0].groupName,
            membersGroupCheckArray[0].userLoginName,
            membersGroupCheckArray[0].fieldID
          )
        : "";
    }

    // to show the err msg in fields
    if (
      $(".was-validated .CFIELD:not(.even-required) .form-control").length > 0
    ) {
      $(".was-validated .form-control:invalid").each(function () {
        $(this).siblings(".errMsgField").show();
      });
    }
    //validation of multiselect
    var multiSelectId = false;
    $(".dropdown-menu.multiselect_scroll.required").each(function () {
      if ($(this).length) {
        if (
          $(".dropdown-menu.multiselect_scroll.required :checkbox:checked")
            .length == 0
        ) {
          multiSelectValid = false;
          $(".dropdown-menu.multiselect_scroll.required")
            .parent()
            .parent()
            .siblings(".errMsgField")
            .show();

          multiSelectId = $(".dropdown-menu.multiselect_scroll.required")
            .parent()
            .parent()
            .attr("id");
        } else {
          multiSelectId = false;
          multiSelectValid = true;
        }
      }
    });

    // validation of uniqueString
    var uniqueStringValid = true;
    var internalNameValidate = "";
    if ($(`[data-stringuniquevalues]`).length) {
      $(`[data-stringuniquevalues]`).each(function (index) {
        var parsingData = eval($(this).data("stringuniquevalues"));

        internalNameValidate = $(this).find("input[type=text]").attr("id");

        var currentValue = $(`#${internalNameValidate}`).val();
        currentValue = currentValue.trim();

        console.log(currentValue, "currentValue currentValue");

        console.log(parsingData, "parsingData parsingData");

        if (parsingData.includes(currentValue)) {
          uniqueStringValid = false;
        } else {
          // $(`#${internalNameValidate}`)
          //   .closest(".container-body")
          //   .removeClass("was-validated");
          $(`#${internalNameValidate}`)[0].setCustomValidity("");
        }
      });
    }
   
    changeResources();
    if (listkey == "initiatives") {
      var istherRisk = $(`[data-target_list="Risks"] .Details-Item.NewItem`).length > 1;
      if (istherRisk) {
        pickervalid = false;
      }
    }
    if (
      $(".was-validated .form-control:invalid").length == 0 &&
      pickervalid &&
      !isCheckMember &&
      multiSelectValid &&
      uniqueStringValid
    ) {
      New_Data_Submit.init();
      New_Data_Submit.g.checkNewMasterDetails2()
      // $("[data-target_list] .Details-Item.NewItem").each(function () {
      //   $(this)
      //     .find(
      //       ".CFIELD>input," +
      //         ".CFIELD>div[type=picker]," +
      //         ".CFIELD>select[type=dropdown]," +
      //         ".CFIELD>textarea," +
      //         ".CFIELD>.multiselect-container"
      //     )
      //     .attr("required", "required")
      //     .prop("disabled", false);
      //   var isPickerValue = false; //check required people picker
      //   $(this)
      //     .find("[type=picker]")
      //     .each(function () {
      //       if ($(this).find("span.sp-peoplepicker-userSpan").length > 0) {
      //         isPickerValue = true;
      //         // return false;
      //       } else {
      //       }
      //     });
      //   console.warn($(this).find(".form-control:valid").length);
      //   if ($(this).find(".form-control:valid").length > 0 || isPickerValue) {
      //     $(this).addClass("master-to-submit");
      //   }
      //   $(this)
      //     .find(
      //       ".CFIELD>input," +
      //         ".CFIELD>div[type=picker]," +
      //         ".CFIELD>select[type=dropdown]," +
      //         ".CFIELD>textarea," +
      //         ".CFIELD>.multiselect-container"
      //     )
      //     .prop("disabled", true);
      // });
    } else {
      $(".CSformbuttons").prepend(
        '<p class="errormsg">Please check info above</p>'
      );
      // console.log('check form for errors');
      // check if required field empty or invalid scroll
      var $container = $("#s4-workspace"),
        $scrollTo = $(".was-validated .form-control:invalid");
      if ($scrollTo.length == 0) {
        if (listkey == "sos") {
          // because we use mult field picker
          if (!uniqueStringValid) {
            $(`#${internalNameValidate}`)
              .closest(".container-body")
              .addClass("was-validated");
            $(`#${internalNameValidate}`)[0].setCustomValidity(
              "Invalid field."
            );

            $(`#${internalNameValidate}`)
              .get(0)
              .scrollIntoView({ behavior: "smooth", block: "center" });
          } else {
            $scrollTo = $("[type=multipicker][required]");
          }
        } else {
          $scrollTo = $("[type=picker][required]");
        }
      }

      if (multiSelectId) {
        $(`#${multiSelectId}`)
          .get(0)
          .scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (!uniqueStringValid) {
        $(`#${internalNameValidate}`)
          .closest(".container-body")
          .addClass("was-validated");
        $(`#${internalNameValidate}`)[0].setCustomValidity("Invalid field.");

        $(`#${internalNameValidate}`)
          .get(0)
          .scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        $container.animate({
          scrollTop:
            $scrollTo.offset().top -
            $container.offset().top +
            $container.scrollTop() -
            120,
        });
      }
    }
  },
  init: function () {
    $(".btn-save").attr("disabled", true);
    $("#preloader,#formloader").css("display", "block");
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(SP_ListName);
    var itemCreateInfo = new SP.ListItemCreationInformation();
    New_Data_Submit.g.oListItem = oList.addItem(itemCreateInfo);
    if (isRListKey) CrSetChangeBody.init(New_Data_Submit.g.oListItem); // for cr module
    //.dont-submit,.hide-field need to test more about it
    $(
      `.section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> input[type=text],
       .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> input[type=number],
       .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> input[type=email],
        .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> input[type=float],
         .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> input[type=date],
        .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> input[type=date],
        .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> .datetimeinputs input[type=datetime-local],
         .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> input[type=radio],
          .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> input[type=checkbox],
           .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> div[type=picker],
           .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> div[type=multipicker],
            .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> select[type=dropdown],
             .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> select[type=groupsOfPicker],
             .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> textarea,
              .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field) > .multiselect-container`
    ).each(function () {
      // NOTE: support dummyfield suffix so same internal name can be reused
      let fieldId = $(this).attr("id");
      if (fieldId && typeof fieldId === "string" && fieldId.includes("dummyfield")) {
        fieldId = fieldId.split("dummyfield")[0];
      }

      if ($(this).attr("type") == "picker") {
        var id = $(this).attr("INppicker");
        if (id && typeof id === "string" && id.includes("dummyfield")) {
          id = id.split("dummyfield")[0];
        }
        var sidAttr = $(this).find("span.sp-peoplepicker-userSpan").attr("sid");
        var userEmailAttr = $(this).attr("user-email");
        var ppp = "";
        var isPickerFromParent = $(this).hasClass("picker-from-parent");

        // pickerFromParent should save by resolved email to avoid invalid sid collisions
        if (isPickerFromParent && userEmailAttr) {
          ppp = SP.FieldUserValue.fromUser(userEmailAttr);
        } else if (sidAttr) {
          ppp = SP.FieldUserValue.fromUser(sidAttr);
        } else if (userEmailAttr) {
          ppp = SP.FieldUserValue.fromUser(userEmailAttr);
        }

        if (ppp) {
          New_Data_Submit.g.oListItem.set_item(id, ppp);
        } else if (
          ($(this).attr("id") == "ProjectOwner" && listkey == "projects") ||
          ($(this).attr("id") == "MitigationOwner" && listkey == "risks")
        ) {
          var ppp = SP.FieldUserValue.fromUser(UserN.LoginName.split("|")[1]);
          New_Data_Submit.g.oListItem.set_item(fieldId, ppp);
        }
      } else if ($(this).attr("type") == "multipicker") {
        if ($(this).find("span.sp-peoplepicker-userSpan").length) {
          var id = $(this).attr("INppicker");
          if (id && typeof id === "string" && id.includes("dummyfield")) {
            id = id.split("dummyfield")[0];
          }
          var users = [];
          $("span.sp-peoplepicker-userSpan").each(function () {
            var ppp =
              $(this).attr("sid") == undefined
                ? ""
                : SP.FieldUserValue.fromUser(
                    $(this).attr("sid").split("|").slice(-1)[0]
                  );

            users.push(ppp);
          });
          New_Data_Submit.g.oListItem.set_item(id, users);
        }
      } else if ($(this).attr("type") == "date") {
        if ($(this).hasClass("withTime")) {
          var dateval = $(this).val();
          var timeval = $(this).closest(".CFIELD").find("#Time").val();
          var datetime = new Date(dateval);
          // format the output
          var month = datetime.getMonth() + 1;
          var day = datetime.getDate();
          var year = datetime.getFullYear();
          var timezoneOffset = datetime.getTimezoneOffset() / 60;
          var hour = datetime.getHours() + timezoneOffset;
          if (hour < 10) {
            hour = "0" + hour;
          }
          var min = datetime.getMinutes();
          if (min < 10) {
            min = "0" + min;
          }
          var sec = datetime.getSeconds();
          if (sec < 10) {
            sec = "0" + sec;
          }

          var ydate =
            month + "/" + day + "/" + year + " " + hour + ":" + min + ":" + sec;

          if (dateval && timeval)
            New_Data_Submit.g.oListItem.set_item(fieldId, ydate);
        } else {
          var dateval = $(this).val().replace("-", "/");
          var ydate = !dateval
            ? ""
            : [dateval.slice(5, 10), dateval.slice(0, 4)]
                .join("/")
                .replace("-", "/");
          if (dateval)
            New_Data_Submit.g.oListItem.set_item(fieldId, ydate);
        }
      } else if ($(this).attr("type") == "datetime-local") {
        if ($(this).hasClass("withTime")) {
          var dateval = $(this).val();
          var datetime = new Date(dateval);

          // format the output
          var month = datetime.getMonth() + 1;
          var day = datetime.getDate();
          var year = datetime.getFullYear();
          var timezoneOffset = datetime.getTimezoneOffset() / 60;
          var hour = datetime.getHours() + timezoneOffset;
          if (hour < 10) {
            hour = "0" + hour;
          }
          var min = datetime.getMinutes();
          if (min < 10) {
            min = "0" + min;
          }
          var sec = datetime.getSeconds();
          if (sec < 10) {
            sec = "0" + sec;
          }

          var ydate =
            month + "/" + day + "/" + year + " " + hour + ":" + min + ":" + sec;

          if (dateval)
            New_Data_Submit.g.oListItem.set_item(fieldId, ydate);
        }
      } else if ($(this).attr("type") == "radio") {
        var checkedvalue = $(
          'input[id="' + $(this).attr("id") + '"]:checked'
        ).val();
        if (checkedvalue == "yes") {
          New_Data_Submit.g.oListItem.set_item(fieldId, "yes");
        } else if (checkedvalue == "no") {
          New_Data_Submit.g.oListItem.set_item(fieldId, "no");
        } else
          New_Data_Submit.g.oListItem.set_item(
            fieldId,
            checkedvalue
          );

        if (SP_ListName == "Deliverables" && checkedvalue == "yes") {
          New_Data_Submit.g.oListItem.set_item("Stage", DVfirstStage);
        }
      } else if ($(this).attr("type") == "checkbox") {
        var checkedvalue = $(
          'input[id="' + $(this).attr("id") + '"]:checked'
        ).length;
        if (checkedvalue)
          New_Data_Submit.g.oListItem.set_item(fieldId, true);
        else New_Data_Submit.g.oListItem.set_item(fieldId, false);
      } else if ($(this).attr("type") == "dropdown") {
        New_Data_Submit.g.oListItem.set_item(fieldId, $(this).val());
        var SubmitForApprovalValue;
        if ($(this).attr("id") == "SubmitForApproval") {
          SubmitForApprovalValue = $(this).val();
        }
        if (
          SP_ListName == "Change Request" &&
          SubmitForApprovalValue == "yes"
        ) {
          New_Data_Submit.g.oListItem.set_item("Stage", CRfirstStage);
        }

        let otherFieldsJSON = eval(
          $(this).find("option:checked").data("otherfields")
        );

        if (
          otherFieldsJSON &&
          otherFieldsJSON != "undefined" &&
          otherFieldsJSON.length
        ) {
          otherFieldsJSON.forEach((el) => {
            New_Data_Submit.g.oListItem.set_item(el.fieldName, el.value);
          });
        }
      } else if ($(this).attr("type") == "groupsOfPicker") {
        New_Data_Submit.g.oListItem.set_item(fieldId, $(this).val());
      } else if ($(this).hasClass("percentagefield")) {
        New_Data_Submit.g.oListItem.set_item(
          fieldId,
          $(this).val() / 100
        );
      } else if ($(this).attr("type") == "multiselect") {
        var myselections = [];
        $(this)
          .find("input:checkbox:checked")
          .each(function () {
            myselections.push($(this).val());
          });

        myselections = myselections.join(":::");
        // Support dummyfield suffix on myfield attribute
        let multiselectFieldId = $(this).attr("myfield");
        if (multiselectFieldId && typeof multiselectFieldId === "string" && multiselectFieldId.includes("dummyfield")) {
          multiselectFieldId = multiselectFieldId.split("dummyfield")[0];
        }
        New_Data_Submit.g.oListItem.set_item(
          multiselectFieldId,
          myselections
        );
        // console.log("inside multiselect")
        //
        //   var myselections = [];
        //   $(this)
        //     .find("input#Revenue:checked")
        //     .each(function () {
        //       myselections.push($(this).val());
        //     });
        //   myselections = myselections.join(":::");
        //   New_Data_Submit.g.oListItem.set_item(
        //     $(this).attr("myfield"),
        //     myselections
        //   );
      } else
        New_Data_Submit.g.oListItem.set_item(fieldId, $(this).val());
    });

    //to handle the for default value submittion
    $(`[data-formdefaultvalue]`).each(function (index) {
      var dataAttr = $(this).attr("data-formdefaultvalue");
      if (!dataAttr) return;
      
      // Replace single quotes with double quotes for proper JSON parsing
      var jsonString = dataAttr.replace(/'/g, '"');
      var parsingData;
      try {
        parsingData = JSON.parse(jsonString);
      } catch (e) {
        // Fallback to eval if JSON.parse fails
        parsingData = eval($(this).data("formdefaultvalue"));
      }

      if (!parsingData || !Array.isArray(parsingData)) return;

      parsingData.forEach((el) => {
        if (!el || !el.fieldName) return;
        
        // Check if user has access - check roles array against currentUserRole or Groups
        var hasAccess = false;
        if (el.roles && Array.isArray(el.roles)) {
          if (el.roles.includes("allRoles")) {
            hasAccess = true;
          } else if (currentUserRole && el.roles.includes(currentUserRole)) {
            hasAccess = true;
          } else {
            // Check if any of user's groups match the roles
            var userGroups = window.Groups || (typeof Groups !== 'undefined' ? Groups : []);
            if (userGroups && Array.isArray(userGroups) && userGroups.length > 0) {
              hasAccess = el.roles.some(role => userGroups.includes(role));
            }
          }
        }
        
        if (hasAccess) {
          // Handle LoggedInUser value - convert to actual user
          if (el.value && el.value.toString().toLowerCase() === "loggedinuser") {
            New_Data_Submit.g.oListItem.set_item(
              el.fieldName,
              SP.FieldUserValue.fromUser(UserN.LoginName)
            );
          } else {
            New_Data_Submit.g.oListItem.set_item(el.fieldName, el.value);
          }
        }
      });
    });
    //

    // to handle set data based on parent values and current list condition
    $(`[data-basedonparentsetvalues]`).each(function (index) {
      var parsingData = eval($(this).data("basedonparentsetvalues"));
      var basedOnFieldName = "",
        basedOnFieldValue = "",
        basedOnFieldCurrentValue = "",
        basedOnFieldType = "",
        basedOnCondition = false;
      parsingData.forEach((el) => {
        basedOnFieldName = el.basedOnFieldName;
        basedOnFieldValue = el.basedOnFieldValue;
        basedOnCondition = el.basedOnCondition ? el.basedOnCondition : false;
        basedOnFieldType = $(`#${basedOnFieldName}`).attr("type");
        if (basedOnFieldType == "radio") {
          basedOnFieldCurrentValue = $(`#${basedOnFieldName}:checked`).val();
        } else {
          basedOnFieldCurrentValue = $(`#${basedOnFieldName}`).val();
        }

        var checkWfStage = $("#WFStage").val();
        if (!checkWfStage) {
          if (basedOnCondition) {
            if (basedOnFieldValue == basedOnFieldCurrentValue) {
              el.valueToSet.forEach((item) => {
                if (valueBasedOnParent.includes(item.condition)) {
                  item.values.forEach((field) => {
                    if (
                      field.fieldValueInList.toLowerCase() == "loggedinuser"
                    ) {
                      console.log("1");

                      // New_Data_Submit.g.oListItem.set_item(
                      //   field.fieldNameInList,
                      //   SP.FieldUserValue.fromUser(
                      //     UserN.LoginName.split("|")[1]
                      //   )
                      // );
                      var currentDeliveredVal = "";
                      if ($("#Delivered").length) {
                        if ($("#Delivered").attr("type") == "radio") {
                          currentDeliveredVal = $("#Delivered:checked").val();
                        } else {
                          currentDeliveredVal = $("#Delivered").val();
                        }
                      }
                      if (currentDeliveredVal == "yes") {
                        New_Data_Submit.g.oListItem.set_item(
                          field.fieldNameInList,
                          SP.FieldUserValue.fromUser(UserN.LoginName)
                        );
                      }
                    } else {
                      New_Data_Submit.g.oListItem.set_item(
                        field.fieldNameInList,
                        field.fieldValueInList
                      );
                    }
                  });
                }
              });
            } else if (basedOnFieldValue == "notempty") {
              if (basedOnFieldCurrentValue) {
                el.valueToSet.forEach((item) => {
                  if (valueBasedOnParent.includes(item.condition)) {
                    item.values.forEach((field) => {
                      if (
                        field.fieldValueInList.toLowerCase() == "loggedinuser"
                      ) {
                        var currentDeliveredVal = "";
                        if ($("#Delivered").length) {
                          if ($("#Delivered").attr("type") == "radio") {
                            currentDeliveredVal = $("#Delivered:checked").val();
                          } else {
                            currentDeliveredVal = $("#Delivered").val();
                          }
                        }
                        if (currentDeliveredVal == "yes") {
                          New_Data_Submit.g.oListItem.set_item(
                            field.fieldNameInList,
                            SP.FieldUserValue.fromUser(UserN.LoginName)
                          );
                        }
                      } else {
                        New_Data_Submit.g.oListItem.set_item(
                          field.fieldNameInList,
                          field.fieldValueInList
                        );
                      }
                    });
                  }
                });
              }
            }
          } else {
            el.valueToSet.forEach((item) => {
              if (valueBasedOnParent.includes(item.condition)) {
                item.values.forEach((field) => {
                  if (field.fieldValueInList.toLowerCase() == "loggedinuser") {
                    var currentDeliveredVal = "";
                    if ($("#Delivered").length) {
                      if ($("#Delivered").attr("type") == "radio") {
                        currentDeliveredVal = $("#Delivered:checked").val();
                      } else {
                        currentDeliveredVal = $("#Delivered").val();
                      }
                    }
                    if (currentDeliveredVal == "yes") {
                      New_Data_Submit.g.oListItem.set_item(
                        field.fieldNameInList,
                        SP.FieldUserValue.fromUser(UserN.LoginName)
                      );
                    }
                  } else {
                    New_Data_Submit.g.oListItem.set_item(
                      field.fieldNameInList,
                      field.fieldValueInList
                    );
                  }
                });
              }
            });
          }
        }
      });
    });
    $(`[data-notbasedonparentsetvalues]`).each(function (index) {
      var parsingData = eval($(this).data("notbasedonparentsetvalues"));
      var basedOnFieldName = "",
        basedOnFieldValue = "",
        basedOnFieldCurrentValue = "",
        basedOnFieldType = "";

      parsingData.forEach((el) => {
        basedOnFieldName = el.basedOnFieldName;
        basedOnFieldValue = el.basedOnFieldValue;
        basedOnFieldType = $(`#${basedOnFieldName}`).attr("type");

        if (basedOnFieldType == "radio") {
          basedOnFieldCurrentValue = $(`#${basedOnFieldName}:checked`).val();
        } else {
          basedOnFieldCurrentValue = $(`#${basedOnFieldName}`).val();
        }

        if (basedOnFieldValue == basedOnFieldCurrentValue) {
          el.valueToSet.forEach((item) => {
            item.values.forEach((field) => {
              if (field.fieldValueInList.toLowerCase() == "loggedinuser") {
                var currentDeliveredVal = "";
                if ($("#Delivered").length) {
                  if ($("#Delivered").attr("type") == "radio") {
                    currentDeliveredVal = $("#Delivered:checked").val();
                  } else {
                    currentDeliveredVal = $("#Delivered").val();
                  }
                }

                if (currentDeliveredVal == "yes") {
                  New_Data_Submit.g.oListItem.set_item(
                    field.fieldNameInList,
                    SP.FieldUserValue.fromUser(UserN.LoginName)
                  );
                }
              } else {
                New_Data_Submit.g.oListItem.set_item(
                  field.fieldNameInList,
                  field.fieldValueInList
                );
              }
            });
          });
        } else if (basedOnFieldValue == "notempty") {
          if (basedOnFieldCurrentValue) {
            el.valueToSet.forEach((item) => {
              item.values.forEach((field) => {
                if (field.fieldValueInList.toLowerCase() == "loggedinuser") {
                  var currentDeliveredVal = "";
                  if ($("#Delivered").length) {
                    if ($("#Delivered").attr("type") == "radio") {
                      currentDeliveredVal = $("#Delivered:checked").val();
                    } else {
                      currentDeliveredVal = $("#Delivered").val();
                    }
                  }

                  if (currentDeliveredVal == "yes") {
                    New_Data_Submit.g.oListItem.set_item(
                      field.fieldNameInList,
                      SP.FieldUserValue.fromUser(UserN.LoginName)
                    );
                  }
                } else {
                  New_Data_Submit.g.oListItem.set_item(
                    field.fieldNameInList,
                    field.fieldValueInList
                  );
                }
              });
            });
          }
        }
      });
    });

    //

    if (PCODE && listkey != "projects") {
      New_Data_Submit.g.oListItem.set_item("ProjectCode", PCODE);
      if (listkey == "issues") {
        New_Data_Submit.g.oListItem.set_item("ResolutionStatus", "new");
      }

      //save value based on parent type

      if (listkey == "deliverables" || listkey == "milestones" || listkey == "exchangeschema") {
        New_Data_Submit.g.oListItem.set_item("MasterKey", "projects");
        New_Data_Submit.g.oListItem.set_item("MasterID", relatedProjectId);
      }
    } else if (ICODE && listkey != "initiatives") {
      New_Data_Submit.g.oListItem.set_item("InitiativeCode", ICODE);
      if (
        listkey == "initiativedeliverables" ||
        listkey == "initiativemilestones" ||
        listkey == "benefits" ||
        listkey == "initiativeobjectives" ||
        listkey == "initiativestakeholders" ||
        listkey == "initiativetasks" ||
        listkey == "initiativelessonslearned"
      ) {
        New_Data_Submit.g.oListItem.set_item("MasterKey", "initiatives");
        New_Data_Submit.g.oListItem.set_item("MasterID", relatedInitiativeId);
      }
    } else if (UserSTCode && listkey != "strategicpartnerships") {
      New_Data_Submit.g.oListItem.set_item(
        "StrategicPartnershipCode",
        UserSTCode
      );
    }
    if (listkey == "projects") {
      // New_Data_Submit.g.oListItem.set_item(
      //   "Phase",
      //   // Phases_Data_Request.g.PhasesArray[1].phase // this save P5 (الطرح والتعاقد) as a first phase
      //   Phases_Data_Request.g.PhasesArray[0].phase
      // );
      // New_Data_Submit.g.oListItem.set_item(
      //   "Stage",
      //   Stages_Data_Request.g.StagesArray[0].stage
      // );
      New_Data_Submit.g.oListItem.set_item(
        "ProgressStatusDeliverable",
        "stat6"
      );
      New_Data_Submit.g.oListItem.set_item("ProgressStatusMilestone", "stat6");
      New_Data_Submit.g.oListItem.set_item("ProgressStatusSchedule", "stat6");
      New_Data_Submit.g.oListItem.set_item("Status", "inprogress");

      //لحساب مدة الاساس
      var BaselineStartDate = $("#BaselineStartDate").val();
      var BaselineFinishDate = $("#BaselineFinishDate").val();

      if (BaselineStartDate && BaselineFinishDate) {
        const date1 = new Date(BaselineStartDate);
        const date2 = new Date(BaselineFinishDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        New_Data_Submit.g.oListItem.set_item("BaselineDuration", diffDays);
      }
      //

      //لحساب حالة الصرف as List Structure Formula: Percentage [ Actual / Planned ] *100

      var ActualBudget = $("#ActualBudget").val().replaceAll(",", "");
      if (ActualBudget) {
        ActualBudget = parseFloat(ActualBudget);
      }
      var ExpectedBudget = $("#ExpectedBudget").val().replaceAll(",", "");
      if (ExpectedBudget) {
        ExpectedBudget = parseFloat(ExpectedBudget);
      }

      var Disbstatus = 0;

      if (
        ActualBudget != 0 &&
        ActualBudget != null &&
        ActualBudget != "" &&
        ExpectedBudget != 0 &&
        ExpectedBudget != null &&
        ExpectedBudget != ""
      ) {
        Disbstatus = ((ActualBudget / ExpectedBudget) * 100).toFixed(2);
      }
      New_Data_Submit.g.oListItem.set_item("DisbursementStatus", Disbstatus);

      if (isWF) {
        IdeaId = window.location.href.split("IdeaId=")[1].split("&")[0];
        New_Data_Submit.g.oListItem.set_item("RelatedIdeaCode", IdeaId);
      }
    }
    if (listkey == "initiatives") {
      //  to handle the initiative status when create a new one
      New_Data_Submit.g.oListItem.set_item("InitiativeProgressStatus", "stat6");
    }
    if (listkey == "mainkpiissues" || listkey == "mainkpianalysis") {
      var kpiCodeFromUrl = window.location.href.indexOf("KpiCode=") > -1 ? window.location.href.split("KpiCode=")[1].split("&")[0] : "";
      if (kpiCodeFromUrl) New_Data_Submit.g.oListItem.set_item("KPICode", kpiCodeFromUrl);
    }
    if (listkey == "sosanalysis") {
      var sosCodeFromUrl = window.location.href.indexOf("sosCode=") > -1 ? decodeURIComponent(window.location.href.split("sosCode=")[1].split("&")[0]) : "";
      if (sosCodeFromUrl) New_Data_Submit.g.oListItem.set_item("SOCode", sosCodeFromUrl);
    }

    /*if(listkey="engineeringprojects")
    {
      var prt1 = listkey.substring(0, 2).toUpperCase(),
      prt2 = String(new Date().getFullYear()).slice(4 - 2),
      prt3 = IID.toString().padStart(4, "0");
  
      var Code = prt1 + "-" + prt2 + "-" + prt3;
  
      New_Data_Submit.g.oListItem.set_item("Title", Code);
    }*/
  
    New_Data_Submit.g.oListItem.update();
    clientContext.load(New_Data_Submit.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        IID = New_Data_Submit.g.oListItem.get_id();
        if (listkey == "projects") {
          projectManagerPickedToProjectCenter =
            New_Data_Submit.g.oListItem.get_item("ProjectManager");
        }
        if(listkey == "risks") {
          if ($("#IsInitiatiaveEffect").is(":checked") == true) {
     
            duplicateRisk.init()
           }
        }
        if( listkey == "engineeringprojects"){
          var ProjectId = IID;
          var Title = New_Data_Submit.g.oListItem("#Title");
          var ProjectName = $("#ProjectName").val();
          var ProjectManager = $("#ProjectManager").val();
          var Status = $("#Status").val();
          var PlannedStartDate = $("#PlannedStartDate").val();
          var Deadline = $("#Deadline").val();
          var EstimatedCost = $("#EstimatedCost").val();
          var CRCost = $("#CRCost").val();
          var ActualCost = $("#ActualCost").val();
          var PlanPercentge = $("#PlanPercentge").val();
          var ActualProgress = $("#ActualProgress").val();
          var Variance = $("#Variance").val();
          var ProgressPercentage = $("#ProgressPercentage").val();
          var FinishTime = $("#FinishTime").val();
          var EarnedValue = $("#EarnedValue").val();
          var PaidValue = $("#PaidValue").val();
          var ProgressCost = $("#ProgressCost").val();
          var InDirectMP = $("#InDirectMP").val();
          var DirectMP = $("#DirectMP").val();
          var ManHours = $("#ManHours").val();
          var TotalWorkHours = $("#TotalWorkHours").val();
          var Contractor = $("#Contractor").val();
          var Consultant = $("#Consultant").val();
          var UpdateDayNotification = $("#UpdateDayNotification").val();
          var ProjectType = $("#ProjectType").val();
          var NCR = $("#NCR").val();
          var Accidents = $("#Accidents").val();
          var Injuries = $("#Injuries").val();
          var Deaths = $("#Deaths").val();
          var Notes = $("#Notes").val();

          engineeringprojectshistories.init(
            ProjectId,
            Title,
            ProjectName,
            ProjectManager,
            Status,
            PlannedStartDate,
            Deadline,
            EstimatedCost,
            CRCost,
            ActualCost,
            PlanPercentge,
            ActualProgress,
            Variance,
            ProgressPercentage,
            FinishTime,
            EarnedValue,
            PaidValue,
            ProgressCost,
            InDirectMP,
            DirectMP,
            ManHours,
            TotalWorkHours,
            Contractor,
            Consultant,
            UpdateDayNotification,
            ProjectType,
            NCR,
            Accidents,
            Injuries,
            Deaths,
            Notes
          );
        }

        if (listkey == "mainkpi") {
          var dateFrom = $("#FromDate").val();
          var dateFromTime = new Date(dateFrom); // when use normal date time
          // var yearFrom = dateFromTime.getFullYear();
          yearFrom = Number(dateFrom);
          // var yearFrom = Number(dateFrom)
          var dateTo = $("#ToDate").val();
          var dateToTime = new Date(dateTo); // when use normal date time
          // var yearTo = dateToTime.getFullYear();
          var yearTo = Number(dateTo);
          var numberOfResults = yearTo - yearFrom;

          if (numberOfResults > 0) {
            for (var i = 0; i <= numberOfResults; i++) {
              var Name = $("#Name").val();
              var PeriodType = $("#PeriodType").val();
              var Types = $("#Types").val();
              var KpiYear = yearFrom + i;
              var MainGoalRelated = $("#RelatedStrategyObjective").val()
                ? $("#RelatedStrategyObjective").val()
                : "";
              var subGoalRelated = $("#SubRelatedObjective").val()
                ? $("#SubRelatedObjective").val()
                : "";
              var Sector = $("#Sector").val();
              var SubSector = $("#SubSector").val();
              var Portfolio = $("#Portfolio").val();
              kpiResults.init(
                Name,
                PeriodType,
                Types,
                KpiYear,
                Sector,
                SubSector,
                Portfolio,
                MainGoalRelated,
                subGoalRelated
              );
            }
          } else {
            var Name = $("#Name").val();
            var PeriodType = $("#PeriodType").val();
            var Types = $("#Types").val();
            var KpiYear = yearFrom;
            var MainGoalRelated = $("#RelatedStrategyObjective").val()
              ? $("#RelatedStrategyObjective").val()
              : "";
            var subGoalRelated = $("#SubRelatedObjective").val()
              ? $("#SubRelatedObjective").val()
              : "";
            var Sector = $("#Sector").val();
            var SubSector = $("#SubSector").val();
            var Portfolio = $("#Portfolio").val();
            kpiResults.init(
              Name,
              PeriodType,
              Types,
              KpiYear,
              Sector,
              SubSector,
              Portfolio,
              MainGoalRelated,
              subGoalRelated
            );
          }
          newKPIEquation.init();
        } else if (listkey == "benefits") {
          var dateFrom = $("#FromDate").val();
          var dateFromTime = new Date(dateFrom); // when use normal date time
          // var yearFrom = dateFromTime.getFullYear();
          yearFrom = Number(dateFrom);
          // var yearFrom = Number(dateFrom)
          var dateTo = $("#ToDate").val();
          var dateToTime = new Date(dateTo); // when use normal date time
          // var yearTo = dateToTime.getFullYear();
          var yearTo = Number(dateTo);
          var numberOfResults = yearTo - yearFrom;

          if (numberOfResults > 0) {
            for (var i = 0; i <= numberOfResults; i++) {
              var Name = $("#Name").val();
              var PeriodType = $("#PeriodType").val();
              var Types = $("#Types").val();
              var KpiYear = yearFrom + i;
              var MainGoalRelated = $("#RelatedStrategyObjective").val()
                ? $("#RelatedStrategyObjective").val()
                : "";
              var subGoalRelated = $("#SubRelatedObjective").val()
                ? $("#SubRelatedObjective").val()
                : "";
              var Sector = $("#Sector").val() ? $("#Sector").val() : "";
              var SubSector = $("#SubSector").val() ? $("#SubSector").val() : "";
              var Portfolio = $("#Portfolio").val() ? $("#Portfolio").val() : "";
              kpiResults.init(
                Name,
                PeriodType,
                Types,
                KpiYear,
                Sector,
                SubSector,
                Portfolio,
                MainGoalRelated,
                subGoalRelated
              );
            }
          } else {
            var Name = $("#Name").val();
            var PeriodType = $("#PeriodType").val();
            var Types = $("#Types").val();
            var KpiYear = yearFrom + i;
            var MainGoalRelated = $("#RelatedStrategyObjective").val()
              ? $("#RelatedStrategyObjective").val()
              : "";
            var subGoalRelated = $("#SubRelatedObjective").val()
              ? $("#SubRelatedObjective").val()
              : "";
            var Sector = $("#Sector").val() ? $("#Sector").val() : "";
            var SubSector = $("#SubSector").val() ? $("#SubSector").val() : "";
            var Portfolio = $("#Portfolio").val() ? $("#Portfolio").val() : "";
            kpiResults.init(
              Name,
              PeriodType,
              Types,
              KpiYear,
              Sector,
              SubSector,
              Portfolio,
              MainGoalRelated,
              subGoalRelated
            );
          }
          newKPIEquation.init();
        } else if (listkey == "benefitmetrics") {
          var dateFrom = $("#FromDate").val();
          benefitYearFrom = Number(dateFrom);
          var yearFrom = Number(dateFrom);
          var dateTo = $("#ToDate").val();
          var yearTo = Number(dateTo);
          var numberOfResults = yearTo - yearFrom;

          if (numberOfResults > 0) {
            for (var i = 0; i <= numberOfResults; i++) {
              var benefitYear = yearFrom + i;
              benefitResults.init(benefitYear);
            }
          } else {
            var benefitYear = yearFrom;
            benefitResults.init(benefitYear);
          }

          newBenefitEquation.init();
        } else {
          Set_Code_Submit.init();
        }

        if (USERisWF && listkey == "projects") {
          Edit_Item_Field.init("Ideas", "Status", "completed", "Title", IdeaId);
        }
      }),
      Function.createDelegate(this, function (sender, args) {
        var errormessage =
          "Request failed. " +
          args.get_message() +
          "\n" +
          args.get_stackTrace();

        var msg = args.get_message();
        var stack = args.get_stackTrace();
        var url = window.location.href;

        // show pop up err msg
        Error_PopUp.init();
        //
        writeToEventViewer.preinit(
          msg,
          "JS Api Error",
          "High",
          url,
          "580",
          "14",
          stack
        );

        if (errormessage.indexOf("duplicate values") > -1) {
          $(".CSformbuttons button").attr("disabled", false);
          $(".CSformbuttons").prepend(
            '<p class="errormsg">Please choose another value for Project Code since it is already used</p>'
          );
          $(".loading-wait").hide();
        }
        console.log(errormessage);
      })
    );
  },
  g: {
    clickbait: function () {
      $("button.btn-save").on("click", function () {
        New_Data_Submit.preinit();
      });
    },
    Cancel: function () {
      $("button.btn-cancel").on("click", function () {
        // window.history.back();
        var cancelUrl =
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/Listing.aspx?ListKey=" +
          listkey +
          (typeof PCODE_STRING !== "undefined" ? PCODE_STRING : ""); //_spPageContextInfo.webServerRelativeUrl+

        // Preserve codes on New forms when returning back to Listing
        if (listkey == "mainkpiissues" || listkey == "mainkpianalysis") {
          var kpiCode =
            window.location.href.indexOf("KpiCode=") > -1
              ? window.location.href.split("KpiCode=")[1].split("&")[0]
              : "";
          if (kpiCode) cancelUrl += "&KpiCode=" + encodeURIComponent(kpiCode);
        } else if (listkey == "sosanalysis") {
          var sosCodeCancel =
            window.location.href.indexOf("sosCode=") > -1
              ? window.location.href.split("sosCode=")[1].split("&")[0]
              : "";
          if (sosCodeCancel)
            cancelUrl += "&sosCode=" + encodeURIComponent(sosCodeCancel);
        }

        window.location = cancelUrl;
      });
    },
    checkNewMasterDetails: function () {
      if ($(".Details-Item.NewItem").length > 0) {
        //calling new master submit
        New_Master_Details_Submit.init();
      } else {
        // console.log('successful');
        $(".errormsg").hide();
        $(".successmsg").show();
        $(".btn-save").addClass("success");
        if ( localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar") {
          alert("تم حفظ البيانات بنجاح");
          console.log('alert success')
      } else {
          alert("Data saved successfully");
      }
        if (USERisWF && workflowname == "Project") {
          BulkEdit(true);
        } else if (USERisWF && workflowname != "Project") {
          Continue_Submit_Field.init();
        }
      }
    },
    checkNewMasterDetails2: ()=>{
      $("[data-target_list] .Details-Item.NewItem").each(function () {
        $(this)
          .find(
            ".CFIELD>input," +
              ".CFIELD>div[type=picker]," +
              ".CFIELD>select[type=dropdown]," +
              ".CFIELD>textarea," +
              ".CFIELD>.multiselect-container"
          )
          .attr("required", "required")
          .prop("disabled", false);
        var isPickerValue = false; //check required people picker
        $(this)
          .find("[type=picker]")
          .each(function () {
            if ($(this).find("span.sp-peoplepicker-userSpan").length > 0) {
              isPickerValue = true;
              // return false;
            } else {
            }
          });
        console.warn($(this).find(".form-control:valid").length);
        if ($(this).find(".form-control:valid").length > 0 || isPickerValue) {
          $(this).addClass("master-to-submit");
        }
        $(this)
          .find(
            ".CFIELD>input," +
              ".CFIELD>div[type=picker]," +
              ".CFIELD>select[type=dropdown]," +
              ".CFIELD>textarea," +
              ".CFIELD>.multiselect-container"
          )
          .prop("disabled", true);
      });
    }
  },
};

var Set_Code_Submit = {
  init: function () {
    // console.log(PCODE);
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(SP_ListName);
    Set_Code_Submit.g.oListItem = oList.getItemById(IID); //declared inside object scope only
    var Code;
    if (listkey != "projects") {
      var prt1 = listkey.substring(0, 2).toUpperCase(),
        prt2 = String(new Date().getFullYear()).slice(4 - 2),
        prt3 = IID.toString().padStart(4, "0");
      Code = prt1 + "-" + prt2 + "-" + prt3;
      Set_Code_Submit.g.oListItem.set_item("Title", Code);
      if (listkey == "initiatives") {
        // added to handle inity attach
        ICODE = Code;
      } else if (listkey == "strategicpartnerships") {
        STCODE = Code;
      } else if (listkey == "strategiccalendar") {
        var prt1 = 'STC',
        prt2 = String(new Date().getFullYear()).slice(4 - 2),
        prt3 = IID.toString().padStart(4, "0");
        Code = prt1 + "-" + prt2 + "-" + prt3;
        Set_Code_Submit.g.oListItem.set_item("Title", Code);
      } else if (listkey == "mainkpiissues") {
        var prt1 = 'MKI',
        prt2 = String(new Date().getFullYear()).slice(4 - 2),
        prt3 = IID.toString().padStart(4, "0");
        Code = prt1 + "-" + prt2 + "-" + prt3;
        Set_Code_Submit.g.oListItem.set_item("Title", Code);
        var kpiCodeFromUrl = window.location.href.indexOf("KpiCode=") > -1 ? window.location.href.split("KpiCode=")[1].split("&")[0] : "";
        if (kpiCodeFromUrl) Set_Code_Submit.g.oListItem.set_item("KPICode", kpiCodeFromUrl);
      } else if (listkey == "mainkpianalysis") {
        var prt1 = 'MKA',
        prt2 = String(new Date().getFullYear()).slice(4 - 2),
        prt3 = IID.toString().padStart(4, "0");
        Code = prt1 + "-" + prt2 + "-" + prt3;
        Set_Code_Submit.g.oListItem.set_item("Title", Code);
        var kpiCodeFromUrl = window.location.href.indexOf("KpiCode=") > -1 ? window.location.href.split("KpiCode=")[1].split("&")[0] : "";
        if (kpiCodeFromUrl) Set_Code_Submit.g.oListItem.set_item("KPICode", kpiCodeFromUrl);
      } else if (listkey == "sosanalysis") {
        var prt1 = 'SOA',
        prt2 = String(new Date().getFullYear()).slice(4 - 2),
        prt3 = IID.toString().padStart(4, "0");
        Code = prt1 + "-" + prt2 + "-" + prt3;
        Set_Code_Submit.g.oListItem.set_item("Title", Code);
        var sosCodeFromUrl = window.location.href.indexOf("sosCode=") > -1 ? decodeURIComponent(window.location.href.split("sosCode=")[1].split("&")[0]) : "";
        if (sosCodeFromUrl) Set_Code_Submit.g.oListItem.set_item("SOCode", sosCodeFromUrl);
      } else if (listkey == "measurementcyclesupport") {
        var prt1 = 'MC',
        prt2 = String(new Date().getFullYear()).slice(4 - 2),
        prt3 = IID.toString().padStart(4, "0");
        Code = prt1 + "-" + prt2 + "-" + prt3;
        Set_Code_Submit.g.oListItem.set_item("Title", Code);
      }
      if (isPrjRelated) {
        Set_Code_Submit.g.oListItem.set_item("ProjectCode", PCODE);
      }
    } else if (listkey == "projects") {
      // var sectorValue = $("#Sector").val()

      // if (sectorValue) { // to save the code depends on sector you chose (this is specific whe the sector be autogenerat)
      //   // var year = String(new Date().getFullYear()),
      //   //   year = year.slice(year.length - 2); //get last 2 characters
      //   PCODE = sectorValue + "-" + year;
      // }

      // Code = PCODE + "-" + IID.toString().padStart(4, "0");
      // PCODE = Code;
      // Set_Code_Submit.g.oListItem.set_item("Title", Code);

      //set code depends on ERP

      var isStrategicProject =
        $("#IsStrategicProject").val() == "strategy" ? true : false;

      var year = String(new Date().getFullYear()),
        year = year.slice(year.length - 2); //get last 2 characters

      var projectrelatedinitiativesos = [];
      var relatedInitiative = $("#RelatedInitiative").val();
      var SectorERPID = "XX",
        SubSectorERPID = "XX",
        RelatedSos = "XX";

      var relatedObjectiveArr = $("#RelatedInitiative")
        .find(":selected")
        .data("arraysiblingvalues")
        ? $("#RelatedInitiative").find(":selected").data("arraysiblingvalues")
        : [];

      SectorERPID = $("#Sector").find(":selected").data("siblingvalue")
        ? $("#Sector").find(":selected").data("siblingvalue")
        : "XX";
      SectorERPID = SectorERPID != 'undefined' ? SectorERPID : "XX";
      
      SubSectorERPID = $("#SubSector").find(":selected").data("siblingvalue")
        ? $("#SubSector").find(":selected").data("siblingvalue")
        : "XX";

      relatedObjectiveArr = eval(relatedObjectiveArr);

      if (relatedObjectiveArr.length) {
        projectrelatedinitiativesos = relatedObjectiveArr.filter(function (a) {
          return a.name === "RelatedObjective";
        });
      }

      var projItemID = IID.toString().padStart(4, "0");

      if (projectrelatedinitiativesos.length) {
        if (projectrelatedinitiativesos[0].value) {
          RelatedSos =
            projectrelatedinitiativesos[0].value.split(":::").length > 1
              ? "XX"
              : projectrelatedinitiativesos[0].value;
        }
      }

      if (isStrategicProject) {
        Code = `ST${year}-${SectorERPID}${SubSectorERPID}-${RelatedSos}${relatedInitiative}${projItemID}`;
      } else {
        Code = `OP${year}-${SectorERPID}${SubSectorERPID}-${projItemID}`;
      }

      Set_Code_Submit.g.oListItem.set_item("Title", Code);
      PCODE = Code;
      //
    }
    Set_Code_Submit.g.oListItem.update();
    clientContext.load(Set_Code_Submit.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        // determinig folder directory
        var host = _spPageContextInfo.webAbsoluteUrl;
        if (PCODE || listkey == "projects") {
          Documents_Library = ListArray[2].documents;
          folderdirectory = PCODE + "/" + listkey;
          // folderdirectory = host+'/'+ListArray[2].documents+'/'+PCODE+'/'+listkey;
        } else if (ICODE || listkey == "initiatives") {
          Documents_Library = "Initiative Documents";
          folderdirectory = ICODE + "/" + listkey;
        } else if (STCODE || listkey == "strategicpartnerships") {
          Documents_Library = "StrategicPartnerships Documents";
          folderdirectory = STCODE + "/" + listkey;
        } else if (listkey == "mainkpi") {
          Documents_Library = listkey + " Documents";
          folderdirectory = "/";
          // folderdirectory = host+'/'+listkey+' Documents/';
        } else {
          //
          Documents_Library = "SPM General Services";
          folderdirectory = listkey;
        } //
        if (
          listkey != "projects" &&
          listkey != "initiatives" &&
          listkey != "strategicpartnerships"
        ) {
          //Get File Input Control and read the file name
          $("input[type=file]").each(function (e) {
            fileCount += document.querySelector("#" + $(this).attr("id")).files
              .length;
          });
          if (fileCount) {
            // readFiles();
            _uploadFile();
          } else {
            if ($(".Details-Item.NewItem").length > 0 && !crListKey) {
              //calling new master submit
              New_Data_Submit.g.checkNewMasterDetails();
            } else {
              // Handle delegations - call API after saving to List (NEW - no files)
              if (listkey == "delegations") {
                var prt1 = listkey.substring(0, 2).toUpperCase(),
                  prt2 = String(new Date().getFullYear()).slice(-2),
                  prt3 = IID.toString().padStart(4, "0");
                var delegationCode = prt1 + "-" + prt2 + "-" + prt3;
                console.log("Calling delegation API after saving to List (NEW - no files)");
                console.log("Delegation Code:", delegationCode);
                $.ajax({
                  url: `${APIURL}/delegation/delegateuser/${delegationCode}`,
                  method: "GET",
                  contentType: "application/json; charset=utf-8",
                  success: function (response) {
                    console.log("Delegation API called successfully:", response);
                    $(".errormsg").hide();
                    $(".successmsg").show();
                    $(".btn-save").addClass("success");
                    if (localStorage.getItem("lng") == null ||
                        localStorage.getItem("lng") == "ar") {
                      alert("تم حفظ البيانات بنجاح");
                    } else {
                      alert("Data saved successfully");
                    }
                    window.location =
                      _spPageContextInfo.webAbsoluteUrl +
                      "/SitePages/Listing.aspx?ListKey=" +
                      listkey +
                      PCODE_STRING;
                  },
                  error: function (xhr, status, error) {
                    console.error("Error calling delegation API:", error);
                    $(".errormsg").hide();
                    $(".successmsg").show();
                    $(".btn-save").addClass("success");
                    if (localStorage.getItem("lng") == null ||
                        localStorage.getItem("lng") == "ar") {
                      alert("تم حفظ البيانات بنجاح");
                    } else {
                      alert("Data saved successfully");
                    }
                    window.location =
                      _spPageContextInfo.webAbsoluteUrl +
                      "/SitePages/Listing.aspx?ListKey=" +
                      listkey +
                      PCODE_STRING;
                  }
                });
              } else if (listkey == "strategiccalendar") {
                var strategicCalendarTitle = Code;
                $.ajax({
                  url: `${APIURL}/general/updatedatareceptionenddate/${encodeURIComponent(strategicCalendarTitle)}`,
                  method: "GET",
                  contentType: "application/json; charset=utf-8",
                  success: function (response) {
                    $(".errormsg").hide();
                    $(".successmsg").show();
                    $(".btn-save").addClass("success");
                    if (response && response.Result === false) {
                      if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
                        alert("حدث خطأ أثناء تحديث تاريخ الانتهاء من استقبال البيانات وبعدها تم الحفظ بنجاح");
                      } else {
                        alert("An error occurred while updating the data reception end date. Data was saved successfully.");
                      }
                    }
                    if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
                      alert("تم حفظ البيانات بنجاح");
                    } else {
                      alert("Data saved successfully");
                    }
                    window.location = _spPageContextInfo.webAbsoluteUrl +
                      "/SitePages/Listing.aspx?ListKey=" + listkey + PCODE_STRING;
                  },
                  error: function () {
                    $(".errormsg").hide();
                    $(".successmsg").show();
                    $(".btn-save").addClass("success");
                    if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
                      alert("حدث خطأ أثناء تحديث تاريخ الانتهاء من استقبال البيانات وبعدها تم الحفظ بنجاح");
                    } else {
                      alert("An error occurred while updating the data reception end date. Data was saved successfully.");
                    }
                    if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
                      alert("تم حفظ البيانات بنجاح");
                    } else {
                      alert("Data saved successfully");
                    }
                    window.location = _spPageContextInfo.webAbsoluteUrl +
                      "/SitePages/Listing.aspx?ListKey=" + listkey + PCODE_STRING;
                  }
                });
              } else {
                // For delegations, don't show alert here - it will be shown after API call
                // The API call will handle the alert and redirect
                if (listkey != "delegations") {
                  $(".errormsg").hide();
                  $(".successmsg").show();
                  $(".btn-save").addClass("success");
                  if ( localStorage.getItem("lng") == null ||
                  localStorage.getItem("lng") == "ar") {
                    alert("تم حفظ البيانات بنجاح");
                    console.log('alert success')
                } else {
                  alert("Data saved successfully");
                }
                  var redirectUrl = _spPageContextInfo.webAbsoluteUrl +
                    "/SitePages/Listing.aspx?ListKey=" +
                    listkey +
                    PCODE_STRING;
                  if (listkey == "mainkpiissues" || listkey == "mainkpianalysis") {
                    var kpiCode = window.location.href.indexOf("KpiCode=") > -1 ? window.location.href.split("KpiCode=")[1].split("&")[0] : "";
                    if (kpiCode) redirectUrl += "&KpiCode=" + kpiCode;
                  }
                  window.location = redirectUrl;
                }
                // For delegations, do nothing here - API callback will handle alert and redirect
              }
            }
          }
        } else if (listkey == "initiatives") {
          if ($(".Details-Item.NewItem").length > 0) {
            //calling new master submit
            New_Data_Submit.g.checkNewMasterDetails();
          } else {
            createFolder(
              "Initiative Documents",
              ICODE + "/",
              function (folder) {
                // console.log(String.format("Folder has been created", folder.get_name()));
              },
              function (sender, args) {
                // console.log(args.get_message());
              }
            );
          }
        } else if (listkey == "strategicpartnerships") {
          if ($(".Details-Item.NewItem").length > 0) {
            //calling new master submit
            New_Data_Submit.g.checkNewMasterDetails();
          } else {
            createFolder(
              "StrategicPartnerships Documents",
              STCODE + "/",
              function (folder) {
                // console.log(String.format("Folder has been created", folder.get_name()));
              },
              function (sender, args) {
                // console.log(args.get_message());
              }
            );
          }
        } else {
          if ($(".Details-Item.NewItem").length > 0) {
            //calling new master submit
            New_Data_Submit.g.checkNewMasterDetails();
          } else {
            createFolder(
              ListArray[2].documents,
              PCODE + "/",
              function (folder) {
                // console.log(String.format("Folder has been created", folder.get_name()));
              },
              function (sender, args) {
                // console.log(args.get_message());
              }
            );
          }
          // window.NewItemID = New_Data_Submit.g.oListItem.get_id();
          // IID = New_Data_Submit.g.oListItem.get_id();
          // PCODE = New_Data_Submit.g.oListItem.get_item('Title');
        }
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

window.Edit_Data_Submit = {
  
  preinit: function (state) {
    window.wfHotFixState = state;

    $(".errormsg").remove();
    $(".container-body").addClass("was-validated");

    var isCheckMember = false;

    if (
      // in portfolio the user should be in System Portfolio Manager group
      listkey == "portfolio" &&
      $("#Manager").find("span.sp-peoplepicker-userSpan").attr("sid")
    ) {
      pickerValidationDone = true;
      isCheckMember = true;
      var portfoliomanager =
        $("#Manager").find("span.sp-peoplepicker-userSpan").attr("sid") ==
        undefined
          ? ""
          : SP.FieldUserValue.fromUser(
              $("#Manager").find("span.sp-peoplepicker-userSpan").attr("sid")
            );
      var portfoliomanagername = encodeURIComponent(
        portfoliomanager.get_lookupValue()
      );
      userCalls.isMember(
        "System Portfolio Manager",
        portfoliomanagername,
        "Manager"
      );
    }

    /*if (
      listkey == "mainkpi" &&
      $("#Owner").find("span.sp-peoplepicker-userSpan").attr("sid")
    ) {
      isCheckMember = true;
      var kpiowner =
        $("#Owner").find("span.sp-peoplepicker-userSpan").attr("sid") ==
        undefined
          ? ""
          : SP.FieldUserValue.fromUser(
              $("#Owner").find("span.sp-peoplepicker-userSpan").attr("sid")
            );
      var kpiownername = encodeURIComponent(kpiowner.get_lookupValue());
      membersGroupCheckArray.push({
        groupName: "KPI Owners",
        userLoginName: kpiownername,
        fieldID: "Owner",
      });
    }*/
    if (
      listkey == "mainkpi" &&
      $("#PerformanceLeader").find("span.sp-peoplepicker-userSpan").attr("sid")
    ) {
      pickerValidationDone = true;
      isCheckMember = true;
      var perforrmanceleader =
        $("#PerformanceLeader")
          .find("span.sp-peoplepicker-userSpan")
          .attr("sid") == undefined
          ? ""
          : SP.FieldUserValue.fromUser(
              $("#PerformanceLeader")
                .find("span.sp-peoplepicker-userSpan")
                .attr("sid")
            );
      var perforrmanceleadername = encodeURIComponent(
        perforrmanceleader.get_lookupValue()
      );
      membersGroupCheckArray.push({
        groupName: "Performance Leaders",
        userLoginName: perforrmanceleadername,
        fieldID: "PerformanceLeader",
      });
    }
    if (
      listkey == "mainkpi" &&
      $("#PerformanceLeader2").find("span.sp-peoplepicker-userSpan").attr("sid")
    ) {
      pickerValidationDone = true;
      isCheckMember = true;
      var perforrmanceleader =
        $("#PerformanceLeader2")
          .find("span.sp-peoplepicker-userSpan")
          .attr("sid") == undefined
          ? ""
          : SP.FieldUserValue.fromUser(
              $("#PerformanceLeader2")
                .find("span.sp-peoplepicker-userSpan")
                .attr("sid")
            );
      var perforrmanceleadername = encodeURIComponent(
        perforrmanceleader.get_lookupValue()
      );
      membersGroupCheckArray.push({
        groupName: "Performance Leaders",
        userLoginName: perforrmanceleadername,
        fieldID: "PerformanceLeader2",
      });
    }

    membersGroupCheckArray.length > 0
      ? userCalls.isMember(
          membersGroupCheckArray[0].groupName,
          membersGroupCheckArray[0].userLoginName,
          membersGroupCheckArray[0].fieldID
        )
      : "";
    var pickervalid = true; //check required people picker
    var multiSelectValid = true;

    $("[type=picker][required]").each(function () {
      var isPickerFromParent = $(this).hasClass("picker-from-parent");
      var hasResolvedUser = $(this).find("span.sp-peoplepicker-userSpan").length > 0;
      var hasAutoResolvedValue =
        isPickerFromParent &&
        !!$(this).attr("user-email") &&
        $(this).attr("user-email") != enternameemail;

      if (
        !hasResolvedUser &&
        !hasAutoResolvedValue &&
        $(this).attr("data-email") == enternameemail
      ) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
        $(this).siblings(".errMsgField").show();

        // return false;
      } else {
        $(this).removeClass("picker-error");
        $(this).addClass("picker-valid");
      }
    });

    $("[type=picker]").each(function () {
      var isPickerFromParent = $(this).hasClass("picker-from-parent");
      var hasAutoResolvedValue =
        isPickerFromParent &&
        !!$(this).attr("user-email") &&
        $(this).attr("user-email") != enternameemail;
      if (
        !hasAutoResolvedValue &&
        $(this).find("span.sp-peoplepicker-userSpan").attr("aria-invalid") ==
        "true"
      ) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
      }

      if (
        !hasAutoResolvedValue &&
        $(this).find("span.ms-formvalidation.sp-peoplepicker-errorMsg").length
      ) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
      }
    });

    ////////////////////////for multi picker
    $("[type=multipicker][required]").each(function () {
      if (
        $(this).find("span.sp-peoplepicker-userSpan").length == 0 &&
        $(this).attr("data-email") == enternameemail
      ) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
        // return false;
      } else if (
        $(this).find("span.sp-peoplepicker-userSpan").length == 0 &&
        !$(this).attr("data-email")
      ) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
      } else {
        $(this).removeClass("picker-error");
        $(this).addClass("picker-valid");
      }
    });

    $("[type=multipicker]").each(function () {
      if (
        $(this).find("span.sp-peoplepicker-userSpan").attr("aria-invalid") ==
        "true"
      ) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
      }
    });
    //

    // to show the err msg in fields
    if (
      $(".was-validated .CFIELD:not(.even-required) .form-control:invalid")
        .length > 0
    ) {
      $(
        ".was-validated .CFIELD:not(.even-required) .form-control:invalid"
      ).each(function () {
        $(this).siblings(".errMsgField").show();
      });
    }

    //validation of multiselect
    var multiSelectId = false;

    $(".dropdown-menu.multiselect_scroll.required").each(function () {
      if ($(this).length) {
        if (
          $(".dropdown-menu.multiselect_scroll.required :checkbox:checked")
            .length == 0
        ) {
          multiSelectValid = false;
          $(".dropdown-menu.multiselect_scroll.required")
            .parent()
            .parent()
            .siblings(".errMsgField")
            .show();

          multiSelectId = $(".dropdown-menu.multiselect_scroll.required")
            .parent()
            .parent()
            .attr("id");
        } else {
          multiSelectId = false;
          multiSelectValid = true;
        }
      }
    });

    // validation of uniqueString
    var uniqueStringValid = true;
    var internalNameValidate = "";
    if ($(`[data-stringuniquevalues]`).length) {
      $(`[data-stringuniquevalues]`).each(function (index) {
        var parsingData = eval($(this).data("stringuniquevalues"));

        internalNameValidate = $(this).find("input[type=text]").attr("id");

        var currentValue = $(`#${internalNameValidate}`).val();
        currentValue = currentValue.trim();

        console.log(currentValue, "currentValue currentValue");

        console.log(parsingData, "parsingData parsingData");

        if (
          parsingData.includes(currentValue) &&
          !editUniqueValueArr.includes(currentValue)
        ) {
          uniqueStringValid = false;
        } else {
          // $(`#${internalNameValidate}`)
          //   .closest(".container-body")
          //   .removeClass("was-validated");
          $(`#${internalNameValidate}`)[0].setCustomValidity("");
        }
      });
    }

    // var amountValid = true;
    // var amountScrollId = false;

    // if (listkey == "Deliverables" && isEdit) {
    //     var $amount = $("#Amount");
    //     var amountVal = parseFloat($amount.val());
    //     var parentVal = parseFloat($amount.attr("data-parentval"));
    //     var $weight = $("#" + $amount.attr("data-targetelem"));
    //     var weightVal = parseFloat($weight.val());

    //     if (!isNaN(amountVal) && !isNaN(parentVal) && !isNaN(weightVal)) {
    //         var percent = (parentVal / weightVal) * 100;
    //         if (percent <= amountVal) {
    //             $amount[0].setCustomValidity("");
    //             amountValid = true;
    //         } else {
    //             $amount[0].setCustomValidity("Invalid Amount");
    //             $amount.siblings(".errMsgField").show();
    //             amountValid = false;
    //             amountScrollId = $amount.attr("id");
    //         }
    //     }
    // }

    var fileValid = true;
    var fileScrollId = false;
    if ($("#getFile[required]").length) {
      var $file = $("#getFile[required]");
      if (!$file.val()) {
        fileValid = false;

        alert(".الوثائق الداعمة حقل إلزامي! يرجى ملأه بما يجب");
        fileScrollId = $file.attr("id");
      }
    }

    changeResources();

    if (listkey == "risks") {
     
      if ($("#MoveItToIssueList").is(":checked") == true) {
        Risk_To_Issue_Submit.preinit();
      }
    }
    if (
      $(".was-validated .form-control:invalid").length == 0 &&
      pickervalid &&
      !isCheckMember &&
      multiSelectValid &&
      uniqueStringValid &&
      // amountValid &&
      fileValid
    ) {

      if (listkey == "risks") {
        if (
          showpopup == false ||
          $("#MoveItToIssueList").is(":checked") == false
        ) {
          Edit_Data_Submit.init();
        }
      } else {
        if (isWF && workflowname == "Project") {
          console.log("program_BulkEdit(wfHotFixState);");
          updateProjectStageGet.init(wfHotFixState);
          // program_BulkEdit(wfHotFixState);
        } else Edit_Data_Submit.init();

        // Edit_Data_Submit.init();
      }
      $("[data-target_list] .Details-Item.NewItem").each(function () {
        $(this)
          .find(
            ".CFIELD>input," +
              ".CFIELD>div[type=picker]," +
              ".CFIELD>select[type=dropdown]," +
              ".CFIELD>textarea," +
              ".CFIELD>.multiselect-container"
          )
          .attr("required", "required")
          .prop("disabled", false);
        var isPickerValue = false; //check required people picker
        $(this)
          .find("[type=picker]")
          .each(function () {
            if ($(this).find("span.sp-peoplepicker-userSpan").length > 0) {
              isPickerValue = true;
              // return false;
            } else {
            }
          });
        console.warn($(this).find(".form-control:valid").length);
        if ($(this).find(".form-control:valid").length > 0 || isPickerValue) {
          $(this).addClass("master-to-submit");
        }
        $(this)
          .find(
            ".CFIELD>input," +
              ".CFIELD>div[type=picker]," +
              ".CFIELD>select[type=dropdown]," +
              ".CFIELD>textarea," +
              ".CFIELD>.multiselect-container"
          )
          .prop("disabled", true);
      });
    } else {
      $(".CSformbuttons").prepend(
        '<p class="errormsg">Please check info above</p>'
      );
      // console.log('check form for errors');

      var $container = $("#s4-workspace"),
        $scrollTo = $(".was-validated .form-control:invalid");
      if ($scrollTo.length == 0) {
        if (listkey == "sos") {
          if (!uniqueStringValid) {
            $(`#${internalNameValidate}`)
              .closest(".container-body")
              .addClass("was-validated");
            $(`#${internalNameValidate}`)[0].setCustomValidity(
              "Invalid field."
            );

            $(`#${internalNameValidate}`)
              .get(0)
              .scrollIntoView({ behavior: "smooth", block: "center" });
          } else {
            $scrollTo = $("[type=multipicker][required]");
          }
        } else {
          $scrollTo = $("[type=picker][required]");
        }
      }

      if (multiSelectId) {
        $(`#${multiSelectId}`)
          .get(0)
          .scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (!uniqueStringValid) {
        $(`#${internalNameValidate}`)
          .closest(".container-body")
          .addClass("was-validated");
        $(`#${internalNameValidate}`)[0].setCustomValidity("Invalid field.");

        $(`#${internalNameValidate}`)
          .get(0)
          .scrollIntoView({ behavior: "smooth", block: "center" });
      } 
      // else if (amountScrollId) {
      //   $(`#${amountScrollId}`)
      //     .get(0)
      //     .scrollIntoView({ behavior: "smooth", block: "center" });
      // } 
      else if (fileScrollId) {
        $(`#${fileScrollId}`)
          .get(0)
          .scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        $container.animate({
          scrollTop:
            $scrollTo.offset().top -
            $container.offset().top +
            $container.scrollTop() -
            120,
        });
      }
      if (USERisWF) {
        $(".popupComment").remove();
      }
    }
  },
  init: function () {
    if (listkey == "projects") {
      checkinProjectEditSubmit.checkin(User_ProjUID);
    }
    // $('div.CSformbuttons').prepend('<div class="loading-wait">  Please Wait... <div class="cust-loader"></div></div>');+
    //.dont-submit,.hide-field
    $(".btn-save").attr("disabled", true);
    $("#preloader,#formloader").css("display", "block");
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(SP_ListName);
    Edit_Data_Submit.g.oListItem = oList.getItemById(IID); //declared inside object scope only

    // if (isRListKey){
    if (listkey == "changerequest") {
      CrSetChangeBody.init(Edit_Data_Submit.g.oListItem); // for cr set body
    }

    $(`.section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> input[type=text],
     .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> input[type=number],
     .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> input[type=email],
     .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> input[type=float],
      .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)>  input[type=date],
      .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> .datetimeinputs input[type=date],
      .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> .datetimeinputs input[type=datetime-local],
      .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> input[type=radio],
       .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> input[type=checkbox],
        .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> div[type=multipicker],
        .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> div[type=picker],
         .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field):not(.hide-field)> select[type=dropdown],
         .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> select[type=groupsOfPicker],
          .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)>  textarea,
           .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field) > .multiselect-container`).each(
      function () {
        // NOTE: support dummyfield suffix so same internal name can be reused
        let fieldId = $(this).attr("id");
        if (fieldId && typeof fieldId === "string" && fieldId.includes("dummyfield")) {
          fieldId = fieldId.split("dummyfield")[0];
        }
        var fieldIdForUse = fieldId;
        if (listkey == "mainkpi" && isEdit &&!isWF &&( (isPerformanceLeader && ($('#WFStage').val() !== "approved")) || isSPMAdmin)) {
          var skipFieldsForPerfLeader = ["A","B","CC","D","E","F","G","Quarter","Months","Midterms","Year","Equation"];
          if (skipFieldsForPerfLeader.indexOf(fieldIdForUse) !== -1) return;
        }
        if ($(this).attr("type") == "picker") {
          var id = $(this).attr("INppicker");
          if (id && typeof id === "string" && id.includes("dummyfield")) {
            id = id.split("dummyfield")[0];
          }
          var sidAttr = $(this).find("span.sp-peoplepicker-userSpan").attr("sid");
          var userEmailAttr = $(this).attr("user-email");
          var ppp = "";
          var isPickerFromParent = $(this).hasClass("picker-from-parent");

          if (isPickerFromParent && userEmailAttr) {
            ppp = SP.FieldUserValue.fromUser(userEmailAttr);
          } else if (sidAttr) {
            ppp = SP.FieldUserValue.fromUser(sidAttr);
          } else if (userEmailAttr) {
            ppp = SP.FieldUserValue.fromUser(userEmailAttr);
          }

          if (ppp) {
            Edit_Data_Submit.g.oListItem.set_item(id, ppp);
          }
        } else if ($(this).attr("type") == "multipicker") {
          if ($(this).find("span.sp-peoplepicker-userSpan").length) {
            var id = $(this).attr("INppicker");
            if (id && typeof id === "string" && id.includes("dummyfield")) {
              id = id.split("dummyfield")[0];
            }
            var users = [];
            $("span.sp-peoplepicker-userSpan").each(function () {
              var ppp =
                $(this).attr("sid") == undefined
                  ? ""
                  : SP.FieldUserValue.fromUser(
                      $(this).attr("sid").split("|").slice(-1)[0]
                    );

              users.push(ppp);
            });
            Edit_Data_Submit.g.oListItem.set_item(id, users);
          }
        } else if ($(this).attr("type") == "date") {
          if ($(this).hasClass("withTime")) {
            if ($(this).val()) {
              var dateval = $(this).val();
              var timeval = $(this).closest(".CFIELD").find("#Time").val();
              var datetime = new Date(dateval + " " + timeval);

              // format the output
              var month = datetime.getMonth() + 1;
              var day = datetime.getDate();
              var year = datetime.getFullYear();
              var timezoneOffset = datetime.getTimezoneOffset() / 60;
              var hour = datetime.getHours() + timezoneOffset;
              if (hour < 10) {
                hour = "0" + hour;
              }
              var min = datetime.getMinutes();
              if (min < 10) {
                min = "0" + min;
              }
              var sec = datetime.getSeconds();
              if (sec < 10) {
                sec = "0" + sec;
              }

              var ydate =
                month +
                "/" +
                day +
                "/" +
                year +
                " " +
                hour +
                ":" +
                min +
                ":" +
                sec;

              if (dateval && timeval)
                Edit_Data_Submit.g.oListItem.set_item(
                  fieldId,
                  ydate
                );
            } else {
              Edit_Data_Submit.g.oListItem.set_item(fieldId, null);
            }
          } else {
            if ($(this).val()) {
              var dateval = $(this).val().replace("-", "/");
              var ydate = !dateval
                ? ""
                : [dateval.slice(5, 10), dateval.slice(0, 4)]
                    .join("/")
                    .replace("-", "/");
              if (dateval)
                Edit_Data_Submit.g.oListItem.set_item(
                  fieldId,
                  ydate
                );
            } else {
              Edit_Data_Submit.g.oListItem.set_item(fieldId, null);
            }
          }
        } else if ($(this).attr("type") == "datetime-local") {
          if ($(this).hasClass("withTime")) {
            var dateval = $(this).val();
            var datetime = new Date(dateval);
            // format the output
            var month = datetime.getMonth() + 1;
            var day = datetime.getDate();
            var year = datetime.getFullYear();
            var timezoneOffset = datetime.getTimezoneOffset() / 60;
            var hour = datetime.getHours() + timezoneOffset;
            if (hour < 10) {
              hour = "0" + hour;
            }
            var min = datetime.getMinutes();
            if (min < 10) {
              min = "0" + min;
            }
            var sec = datetime.getSeconds();
            if (sec < 10) {
              sec = "0" + sec;
            }

            var ydate =
              month +
              "/" +
              day +
              "/" +
              year +
              " " +
              hour +
              ":" +
              min +
              ":" +
              sec;

            if (dateval)
              Edit_Data_Submit.g.oListItem.set_item(fieldId, ydate);
          }
        } else if ($(this).attr("type") == "radio") {
          // var checkedvalue = $('input[id="' + $(this).attr('id') + '"]:checked').val();
          // Edit_Data_Submit.g.oListItem.set_item($(this).attr('id'), checkedvalue);
          var checkedvalue = $(
            'input[id="' + $(this).attr("id") + '"]:checked'
          ).val();
          if (checkedvalue == "yes") {
            Edit_Data_Submit.g.oListItem.set_item(fieldId, "yes");
          } else if (checkedvalue == "no" || checkedvalue == "undefined") {
            Edit_Data_Submit.g.oListItem.set_item(fieldId, "no");
          } else
            Edit_Data_Submit.g.oListItem.set_item(
              fieldId,
              checkedvalue
            );

          if (SP_ListName == "Deliverables" && checkedvalue == "yes") {
            if (
              !oListItem.get_item("" + "Stage" + "") ||
              oListItem.get_item("" + "Stage" + "") == "rejected"
            ) {
              Edit_Data_Submit.g.oListItem.set_item("Stage", DVfirstStage);
            }
          } else if (SP_ListName == "ChangeRequest" && checkedvalue == "yes") {
            if (
              !oListItem.get_item("" + "Stage" + "") ||
              oListItem.get_item("" + "Stage" + "") == "rejected"
            ) {
              Edit_Data_Submit.g.oListItem.set_item("Stage", CRfirstStage);
            }
          }
        } else if ($(this).attr("type") == "checkbox") {
          var checkedvalue = $(
            'input[id="' + $(this).attr("id") + '"]:checked'
          ).length;
          if (checkedvalue)
            Edit_Data_Submit.g.oListItem.set_item(fieldId, true);
          else Edit_Data_Submit.g.oListItem.set_item(fieldId, false);
        } else if ($(this).attr("type") == "dropdown") {
          
          $(this).find(":disabled").removeAttr("disabled"); // avoid remove the data when the dropdown field is disabled

          Edit_Data_Submit.g.oListItem.set_item(
            fieldId,
            $(this).val()
          );
          var SubmitForApprovalValue;
          if ($(this).attr("id") == "SubmitForApproval") {
            SubmitForApprovalValue = $(this).val();
          }
          if (
            SP_ListName == "Change Request" &&
            SubmitForApprovalValue == "yes"
          ) {
            Edit_Data_Submit.g.oListItem.set_item("Stage", CRfirstStage);
          }

          let otherFieldsJSON = eval(
            $(this).find("option:checked").data("otherfields")
          );

          if (
            otherFieldsJSON &&
            otherFieldsJSON != "undefined" &&
            otherFieldsJSON.length
          ) {
            otherFieldsJSON.forEach((el) => {
              Edit_Data_Submit.g.oListItem.set_item(el.fieldName, el.value);
            });
          }
        } else if ($(this).attr("type") == "groupsOfPicker") {
          $(this).find(":disabled").removeAttr("disabled"); // avoid remove the data when the field is disabled
          Edit_Data_Submit.g.oListItem.set_item(
            fieldId,
            $(this).val()
          );
        } else if ($(this).hasClass("percentagefield")) {
          Edit_Data_Submit.g.oListItem.set_item(
            fieldId,
            $(this).val() / 100
          );
        } else if ($(this).attr("type") == "multiselect") {
          
          var myselections = [];
          $(this)
            .find("input:checkbox:checked")
            .each(function () {
              myselections.push($(this).val());
            });
          myselections = myselections.join(":::");
          // Support dummyfield suffix on myfield attribute
          let multiselectFieldId = $(this).attr("myfield");
          if (multiselectFieldId && typeof multiselectFieldId === "string" && multiselectFieldId.includes("dummyfield")) {
            multiselectFieldId = multiselectFieldId.split("dummyfield")[0];
          }
          Edit_Data_Submit.g.oListItem.set_item(
            multiselectFieldId,
            myselections
          );
        } else {
          Edit_Data_Submit.g.oListItem.set_item(
            fieldId,
            $(this).val()
          );
        }
      }
    );

    // save the new stage in wfStage if it's not a project wf
    if (USERisWF && workflowname != "Project") {
      if (globalStateSubmitField) {
        Edit_Data_Submit.g.oListItem.set_item("WFStage", nxtstageid);
      } else {
        Edit_Data_Submit.g.oListItem.set_item("WFStage", prvstageid);
      }
    }

    //to handle the for default value submittion
    $(`[data-formdefaultvalue]`).each(function (index) {
      var dataAttr = $(this).attr("data-formdefaultvalue");
      if (!dataAttr) return;
      
      // Replace single quotes with double quotes for proper JSON parsing
      var jsonString = dataAttr.replace(/'/g, '"');
      var parsingData;
      try {
        parsingData = JSON.parse(jsonString);
      } catch (e) {
        // Fallback to eval if JSON.parse fails
        parsingData = eval($(this).data("formdefaultvalue"));
      }

      if (!parsingData || !Array.isArray(parsingData)) return;

      parsingData.forEach((el) => {
        if (!el || !el.fieldName) return;
        
        // Check if user has access - check roles array against currentUserRole or Groups
        var hasAccess = false;
        if (el.roles && Array.isArray(el.roles)) {
          if (el.roles.includes("allRoles")) {
            hasAccess = true;
          } else if (currentUserRole && el.roles.includes(currentUserRole)) {
            hasAccess = true;
          } else {
            // Check if any of user's groups match the roles
            var userGroups = window.Groups || (typeof Groups !== 'undefined' ? Groups : []);
            if (userGroups && Array.isArray(userGroups) && userGroups.length > 0) {
              hasAccess = el.roles.some(role => userGroups.includes(role));
            }
          }
        }
        
        if (hasAccess) {
          // Handle LoggedInUser value - convert to actual user
          if (el.value && el.value.toString().toLowerCase() === "loggedinuser") {
            Edit_Data_Submit.g.oListItem.set_item(
              el.fieldName,
              SP.FieldUserValue.fromUser(UserN.LoginName)
            );
          } else {
            Edit_Data_Submit.g.oListItem.set_item(el.fieldName, el.value);
          }
        }
      });
    });
    //
    // to handle set data based on parent values and current list condition
    $(`[data-basedonparentsetvalues]`).each(function (index) {
      var parsingData = eval($(this).data("basedonparentsetvalues"));
      var basedOnFieldName = "",
        basedOnFieldValue = "",
        basedOnFieldCurrentValue = "",
        basedOnFieldType = "",
        basedOnCondition = false;
      parsingData.forEach((el) => {
        basedOnFieldName = el.basedOnFieldName;
        basedOnFieldValue = el.basedOnFieldValue;
        basedOnCondition = el.basedOnCondition ? el.basedOnCondition : false;
        basedOnFieldType = $(`#${basedOnFieldName}`).attr("type");
        if (basedOnFieldType == "radio") {
          basedOnFieldCurrentValue = $(`#${basedOnFieldName}:checked`).val();
        } else {
          basedOnFieldCurrentValue = $(`#${basedOnFieldName}`).val();
        }

        var checkWfStage = $("#WFStage").val();
        if (!checkWfStage) {
          if (basedOnCondition) {
            if (basedOnFieldValue == basedOnFieldCurrentValue) {
              el.valueToSet.forEach((item) => {
                console.log(item.condition, "item.condition");

                if (valueBasedOnParent.includes(item.condition)) {
                  item.values.forEach((field) => {
                    if (
                      field.fieldValueInList.toLowerCase() == "loggedinuser"
                    ) {
                      var currentDeliveredVal = "";
                      if ($("#Delivered").length) {
                        if ($("#Delivered").attr("type") == "radio") {
                          currentDeliveredVal = $("#Delivered:checked").val();
                        } else {
                          currentDeliveredVal = $("#Delivered").val();
                        }
                      }
                      if (
                        deliveredValFromList != currentDeliveredVal &&
                        currentDeliveredVal == "yes"
                      ) {
                        Edit_Data_Submit.g.oListItem.set_item(
                          field.fieldNameInList,
                          SP.FieldUserValue.fromUser(UserN.LoginName)
                        );
                      }
                    } else {
                      Edit_Data_Submit.g.oListItem.set_item(
                        field.fieldNameInList,
                        field.fieldValueInList
                      );
                    }
                  });
                }
              });
            } else if (basedOnFieldValue == "notempty") {
              if (basedOnFieldCurrentValue) {
                el.valueToSet.forEach((item) => {
                  if (valueBasedOnParent.includes(item.condition)) {
                    item.values.forEach((field) => {
                      if (
                        field.fieldValueInList.toLowerCase() == "loggedinuser"
                      ) {
                        // Edit_Data_Submit.g.oListItem.set_item(
                        //   field.fieldNameInList,
                        //   SP.FieldUserValue.fromUser(
                        //     UserN.LoginName.split("|")[1]
                        //   )
                        // );
                        var currentDeliveredVal = "";
                        if ($("#Delivered").length) {
                          if ($("#Delivered").attr("type") == "radio") {
                            currentDeliveredVal = $("#Delivered:checked").val();
                          } else {
                            currentDeliveredVal = $("#Delivered").val();
                          }
                        }
                        if (
                          deliveredValFromList != currentDeliveredVal &&
                          currentDeliveredVal == "yes"
                        ) {
                          Edit_Data_Submit.g.oListItem.set_item(
                            field.fieldNameInList,
                            SP.FieldUserValue.fromUser(UserN.LoginName)
                          );
                        }
                      } else {
                        Edit_Data_Submit.g.oListItem.set_item(
                          field.fieldNameInList,
                          field.fieldValueInList
                        );
                      }
                    });
                  }
                });
              }
            }
          } else {
            el.valueToSet.forEach((item) => {
              if (valueBasedOnParent.includes(item.condition)) {
                item.values.forEach((field) => {
                  if (field.fieldValueInList.toLowerCase() == "loggedinuser") {
                    var currentDeliveredVal = "";
                    if ($("#Delivered").length) {
                      if ($("#Delivered").attr("type") == "radio") {
                        currentDeliveredVal = $("#Delivered:checked").val();
                      } else {
                        currentDeliveredVal = $("#Delivered").val();
                      }
                    }
                    if (
                      deliveredValFromList != currentDeliveredVal &&
                      currentDeliveredVal == "yes"
                    ) {
                      Edit_Data_Submit.g.oListItem.set_item(
                        field.fieldNameInList,
                        SP.FieldUserValue.fromUser(UserN.LoginName)
                      );
                    }
                    // Edit_Data_Submit.g.oListItem.set_item(
                    //   field.fieldNameInList,
                    //   SP.FieldUserValue.fromUser(
                    //     UserN.LoginName.split("|")[1]
                    //     )
                    // );
                  } else {
                    Edit_Data_Submit.g.oListItem.set_item(
                      field.fieldNameInList,
                      field.fieldValueInList
                    );
                  }
                });
              }
            });
          }
        } else {
          // handle else to can update the loggedinuser
          if (basedOnCondition) {
            if (basedOnFieldValue == basedOnFieldCurrentValue) {
              el.valueToSet.forEach((item) => {
                if (valueBasedOnParent.includes(item.condition)) {
                  console.log(item.values, "item.values item.values");
                  item.values.forEach((field) => {
                    console.log(field.fieldValueInList, "field field");

                    if (
                      field.fieldValueInList.toLowerCase() == "loggedinuser"
                    ) {
                      // Edit_Data_Submit.g.oListItem.set_item(
                      //   field.fieldNameInList,
                      //   SP.FieldUserValue.fromUser(
                      //     UserN.LoginName.split("|")[1]
                      //   )
                      // );
                      var currentDeliveredVal = "";
                      if ($("#Delivered").length) {
                        if ($("#Delivered").attr("type") == "radio") {
                          currentDeliveredVal = $("#Delivered:checked").val();
                        } else {
                          currentDeliveredVal = $("#Delivered").val();
                        }
                      }
                      if (
                        deliveredValFromList != currentDeliveredVal &&
                        currentDeliveredVal == "yes"
                      ) {
                        Edit_Data_Submit.g.oListItem.set_item(
                          field.fieldNameInList,
                          SP.FieldUserValue.fromUser(UserN.LoginName)
                        );
                      }
                    }
                  });
                }
              });
            } else if (basedOnFieldValue == "notempty") {
              if (basedOnFieldCurrentValue) {
                el.valueToSet.forEach((item) => {
                  if (valueBasedOnParent.includes(item.condition)) {
                    item.values.forEach((field) => {
                      if (
                        field.fieldValueInList.toLowerCase() == "loggedinuser"
                      ) {
                        // Edit_Data_Submit.g.oListItem.set_item(
                        //   field.fieldNameInList,
                        //   SP.FieldUserValue.fromUser(
                        //     UserN.LoginName.split("|")[1]
                        //   )
                        // );
                        var currentDeliveredVal = "";
                        if ($("#Delivered").length) {
                          if ($("#Delivered").attr("type") == "radio") {
                            currentDeliveredVal = $("#Delivered:checked").val();
                          } else {
                            currentDeliveredVal = $("#Delivered").val();
                          }
                        }
                        if (
                          deliveredValFromList != currentDeliveredVal &&
                          currentDeliveredVal == "yes"
                        ) {
                          Edit_Data_Submit.g.oListItem.set_item(
                            field.fieldNameInList,
                            SP.FieldUserValue.fromUser(UserN.LoginName)
                          );
                        }
                      }
                    });
                  }
                });
              }
            }
          } else {
            el.valueToSet.forEach((item) => {
              if (valueBasedOnParent.includes(item.condition)) {
                item.values.forEach((field) => {
                  if (field.fieldValueInList.toLowerCase() == "loggedinuser") {
                    var currentDeliveredVal = "";
                    if ($("#Delivered").length) {
                      if ($("#Delivered").attr("type") == "radio") {
                        currentDeliveredVal = $("#Delivered:checked").val();
                      } else {
                        currentDeliveredVal = $("#Delivered").val();
                      }
                    }
                    if (
                      deliveredValFromList != currentDeliveredVal &&
                      currentDeliveredVal == "yes"
                    ) {
                      Edit_Data_Submit.g.oListItem.set_item(
                        field.fieldNameInList,
                        SP.FieldUserValue.fromUser(UserN.LoginName)
                      );
                    }
                    // Edit_Data_Submit.g.oListItem.set_item(
                    //   field.fieldNameInList,
                    //   SP.FieldUserValue.fromUser(
                    //     UserN.LoginName.split("|")[1]
                    //     )
                    // );
                  }
                });
              }
            });
          }
        }
      });
    });
    $(`[data-notbasedonparentsetvalues]`).each(function (index) {
      var parsingData = eval($(this).data("notbasedonparentsetvalues"));
      var basedOnFieldName = "",
        basedOnFieldValue = "",
        basedOnFieldCurrentValue = "",
        basedOnFieldType = "";

      parsingData.forEach((el) => {
        basedOnFieldName = el.basedOnFieldName;
        basedOnFieldValue = el.basedOnFieldValue;
        basedOnFieldType = $(`#${basedOnFieldName}`).attr("type");

        if (basedOnFieldType == "radio") {
          basedOnFieldCurrentValue = $(`#${basedOnFieldName}:checked`).val();
        } else {
          basedOnFieldCurrentValue = $(`#${basedOnFieldName}`).val();
        }
        if (basedOnFieldValue == basedOnFieldCurrentValue) {
          el.valueToSet.forEach((item) => {
            item.values.forEach((field) => {
              if (field.fieldValueInList.toLowerCase() == "loggedinuser") {
                var currentDeliveredVal = "";
                if ($("#Delivered").length) {
                  if ($("#Delivered").attr("type") == "radio") {
                    currentDeliveredVal = $("#Delivered:checked").val();
                  } else {
                    currentDeliveredVal = $("#Delivered").val();
                  }
                }

                if (
                  deliveredValFromList != currentDeliveredVal &&
                  currentDeliveredVal == "yes"
                ) {
                  Edit_Data_Submit.g.oListItem.set_item(
                    field.fieldNameInList,
                    SP.FieldUserValue.fromUser(UserN.LoginName)
                  );
                }
              } else {
                Edit_Data_Submit.g.oListItem.set_item(
                  field.fieldNameInList,
                  field.fieldValueInList
                );
              }
            });
          });
        } else if (basedOnFieldValue == "notempty") {
          if (basedOnFieldCurrentValue) {
            el.valueToSet.forEach((item) => {
              item.values.forEach((field) => {
                if (field.fieldValueInList.toLowerCase() == "loggedinuser") {
                  var currentDeliveredVal = "";
                  if ($("#Delivered").length) {
                    if ($("#Delivered").attr("type") == "radio") {
                      currentDeliveredVal = $("#Delivered:checked").val();
                    } else {
                      currentDeliveredVal = $("#Delivered").val();
                    }
                  }

                  if (
                    deliveredValFromList != currentDeliveredVal &&
                    currentDeliveredVal == "yes"
                  ) {
                    Edit_Data_Submit.g.oListItem.set_item(
                      field.fieldNameInList,
                      SP.FieldUserValue.fromUser(UserN.LoginName)
                    );
                  }
                } else {
                  Edit_Data_Submit.g.oListItem.set_item(
                    field.fieldNameInList,
                    field.fieldValueInList
                  );
                }
              });
            });
          }
        }
      });
    });

    //

    if (listkey == "issues") {
      if ($("#ResolutionStatus").val() == "Closed") {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + month + "-" + day;
        today = !today
          ? ""
          : [today.slice(5, 10), today.slice(0, 4)].join("/").replace("-", "/");
        if (today) {
          Edit_Data_Submit.g.oListItem.set_item("IssueClosureDate", today);
        }
      }
    } else if (listkey == "risks") {
      if ($("#Status").val() == "Closed") {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + month + "-" + day;
        today = !today
          ? ""
          : [today.slice(5, 10), today.slice(0, 4)].join("/").replace("-", "/");
        if (today) {
          Edit_Data_Submit.g.oListItem.set_item("RiskClosureDate", today);
        }
      }
    } else if (listkey == "initiatives") {
      var plannedperc = Edit_Data_Submit.g.oListItem.get_item(
        "PlannedPercentageCompleted"
      );
      var actualperc = Edit_Data_Submit.g.oListItem.get_item(
        "ActualPercentageCompleted"
      );
      var diffbtwplannedactual = plannedperc - actualperc;
      Edit_Data_Submit.g.oListItem.set_item(
        "DelayPercentage",
        diffbtwplannedactual
      );
    } else if (listkey == "projects") {
      //Ghufran Calculated duration
      var initstartdate = new Date(
        Edit_Data_Submit.g.oListItem.get_item("BaselineStartDate")
      );
      var initfinishdate = new Date(
        Edit_Data_Submit.g.oListItem.get_item("BaselineFinishDate")
      );
      var months, diff;
      if (initfinishdate != null && initstartdate != null) {
        diff = (initfinishdate.getTime() - initstartdate.getTime()) / 1000;
        diff /= 60 * 60 * 24 * 7 * 4;
        months = Math.abs(Math.round(diff));
      } else {
        months = 0;
      }

      Edit_Data_Submit.g.oListItem.set_item("BaselineDuration", months);
      //لحساب حالة الصرف as List Structure Formula: Percentage [ Actual / Planned ] *100

      var ActualBudget = $("#ActualBudget").val().replaceAll(",", "");
      if (ActualBudget) {
        ActualBudget = parseFloat(ActualBudget);
      }
      var ExpectedBudget = $("#ExpectedBudget").val().replaceAll(",", "");
      if (ExpectedBudget) {
        ExpectedBudget = parseFloat(ExpectedBudget);
      }

      var Disbstatus = 0;
      if (
        ActualBudget != 0 &&
        ActualBudget != null &&
        ActualBudget != "" &&
        ExpectedBudget != 0 &&
        ExpectedBudget != null &&
        ExpectedBudget != ""
      ) {
        Disbstatus = ((ActualBudget / ExpectedBudget) * 100).toFixed(2);
      }
      Edit_Data_Submit.g.oListItem.set_item("DisbursementStatus", Disbstatus);

      var isZeroBudget = $("#IsZeroBudgetProject").val();
      if (isZeroBudget == "yes") {
        Edit_Data_Submit.g.oListItem.set_item("ActualBudget", "");
        Edit_Data_Submit.g.oListItem.set_item("Amount", "");
      }


    } else if (listkey == "mainkpi") {
      // get the data to update the kpi result list
      kpiName = $("#Name").val();
      kpicurrentYear = $("#Year").val();
      kpiType = $("#Types").val();
      kpiSector = $("#Sector").val();
      kpiTotalActual = $("#Actual").val();
      kpiSubSector = $("#SubSector").val();
      kpiMainGoalRelated = $("#RelatedStrategyObjective").val()
        ? $("#RelatedStrategyObjective").val()
        : "";
      kpiSubGoalRelated = $("#SubRelatedObjective").val()
        ? $("#SubRelatedObjective").val()
        : "";
      kpiPortfolio = $("#Portfolio").val() ? $("#Portfolio").val() : "";
      kpiPerformanceAnalysis = $("#PerformanceAnalysis").val()
        ? $("#PerformanceAnalysis").val()
        : "";
      kpiPeriodTypeUpdate = $("#PeriodType").val()
        ? $("#PeriodType").val()
        : "";
      kpiYearPicked = $("#Year").val() ? $("#Year").val() : "";
      kpiMidPicked = $("#Midterms").val() ? $("#Midterms").val() : "";
      kpiQuarterPicked = $("#Quarter").val() ? $("#Quarter").val() : "";
      kpiMonthPicked = $("#Months").val() ? $("#Months").val() : "";
      kpiRecurrenceChanged = $("#RecurrenceChanged").val()
        ? $("#RecurrenceChanged").val()
        : "";

      if (kpiType == "main") {
        // remove portfolio and alhadaf elfer3e when change to main cause main don't have portfolio
        Edit_Data_Submit.g.oListItem.set_item("Portfolio", "");
        Edit_Data_Submit.g.oListItem.set_item("SubRelatedObjective", "");
      } else if (kpiType == "sub") {
        // remove alhadaf elra2ese elmortabet when change to sub
        Edit_Data_Submit.g.oListItem.set_item("RelatedStrategyObjective", "");
      }
    }
    async function handleKPIResults() {
        if (listkey == "mainkpi" && isEdit && isPerformanceLeader && !isWF && ($('#WFStage').val() !== "approved")) {
            await saveKPIResultsHistory("draft");
        } else if (listkey == "mainkpi" && isEdit && isSPMAdmin && !isWF) {
            if ($('#WFStage').val() == "approved") {
                await approveKPIResultsHistory($('#Title').val());
            } else {
                await saveKPIResultsHistory("approved");
            }
        }
    }
    
    async function approveKPIResultsHistory(KPITitle) {
        try {
            const url = `${APIURL}/general/approvekpiresultshistory/${KPITitle}`;
            const res = await $.ajax({
                url,
                method: "GET",
                contentType: "application/json; charset=utf-8"
            });
            console.log("KPIResultsHistory approved:", res);
        } catch (err) {
            console.error("Error in approve KPIResultsHistory:", err);
        }
    }
    
    async function saveKPIResultsHistory(status) {
        try {
            const periodType = $("#PeriodType").val();
            let year = parseInt($("#Year").val() || 0);
            let month = null;
    
            if (periodType === "monthly") {
                const mVal = $("#Months").val();
                if (mVal && mVal.indexOf("ActualM") === 0)
                    month = parseInt(mVal.replace("ActualM", ""));
            } else if (periodType === "midterm") {
                const midVal = $("#Midterms").val();
                month = midVal === "ActualMid1" ? 6 : midVal === "ActualMid2" ? 12 : 0;
            } else if (periodType === "quarter") {
                const qVal = $("#Quarter").val();
                if (qVal === "ActualQ1") month = 3;
                else if (qVal === "ActualQ2") month = 6;
                else if (qVal === "ActualQ3") month = 9;
                else if (qVal === "ActualQ4") month = 12;
            } else if (periodType === "year") {
                month = 12;
            }
    
            var performanceAnalysis = $("#PerformanceAnalysis").val() || "";
            var actualKpiDateRaw = $("#ActualkpiDate").val() || "";
            var actualkpiDate = actualKpiDateRaw
                ? new Date(actualKpiDateRaw).toISOString().split("T")[0]
                : "";

            const payload = {
                mainKPICode: $("#Title").val(),
                year,
                month,
                a: parseFloat($("#A").val() || 0),
                b: parseFloat($("#B").val() || 0),
                c: parseFloat($("#CC").val() || 0),
                d: parseFloat($("#D").val() || 0),
                e: parseFloat($("#E").val() || 0),
                f: parseFloat($("#F").val() || 0),
                g: parseFloat($("#G").val() || 0),
                finalValue: parseFloat($("#Equation").val() || 0),
                performanceAnalysis: performanceAnalysis,
                actualkpiDate: actualkpiDate,
                createdByUserId: 0,
            };
    
            const userData = await $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/currentuser",
                method: "GET",
                headers: { Accept: "application/json;odata=verbose" },
            });
            payload.createdByUserId = userData.d.Id;
    
            const url = `${APIURL}/general/createorupdatekpiresultshistory/${status}`;
            const res = await $.ajax({
                url,
                method: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(payload),
            });
    
            console.log("KPIResultsHistory saved:", res);
        } catch (err) {
            console.error("Error in KPIResultsHistory flow:", err);
        }
    }

    handleKPIResults();
    Edit_Data_Submit.g.oListItem.update();
    if (listkey == "benefits") {
      // get the data to update the kpi result list
      kpiName = $("#Name").val() ? $("#Name").val() : "";
      kpicurrentYear = $("#Year").val() ? $("#Year").val() : "";
      kpiType = $("#Types").val() ?  $("#Types").val() : "";
      kpiSector = $("#Sector").val() ? $("#Sector").val() : "";
      kpiTotalActual = $("#Actual").val() ? $("#Actual").val()  : "";
      kpiSubSector = $("#SubSector").val() ? $("#SubSector").val()  : "";
      kpiMainGoalRelated = $("#RelatedStrategyObjective").val()
        ? $("#RelatedStrategyObjective").val()
        : "";
      kpiSubGoalRelated = $("#SubRelatedObjective").val()
        ? $("#SubRelatedObjective").val()
        : "";
      kpiPortfolio = $("#Portfolio").val() ? $("#Portfolio").val() : "";
      kpiPerformanceAnalysis = $("#PerformanceAnalysis").val()
        ? $("#PerformanceAnalysis").val()
        : "";
      kpiPeriodTypeUpdate = $("#PeriodType").val()
        ? $("#PeriodType").val()
        : "";
      kpiYearPicked = $("#Year").val() ? $("#Year").val() : "";
      kpiMidPicked = $("#Midterms").val() ? $("#Midterms").val() : "";
      kpiQuarterPicked = $("#Quarter").val() ? $("#Quarter").val() : "";
      kpiMonthPicked = $("#Months").val() ? $("#Months").val() : "";
      kpiRecurrenceChanged = kpiPeriodTypeUpdate ;
      Edit_KPI_Results.init(
        kpiName,
        kpiType,
        kpiSector,
        kpiSubSector,
        kpiPortfolio,
        kpiMainGoalRelated,
        kpiSubGoalRelated,
        kpiPerformanceAnalysis,
        kpiRecurrenceChanged,
        kpicurrentYear,
        kpiTotalActual
      );
     
    }
    clientContext.load(Edit_Data_Submit.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        // mainkpi Edit: call createkpiresults AFTER list save and BEFORE showing any success alert
        // We call afterSuccess() only AFTER this API finishes, so alert always comes after createkpiresults.
        if (listkey == "mainkpi") {
          window.__createKpiResultsCalled = false;
          var kpiCode = $("#Title").val();
          var proceedAfterCreateKpiResults = function () {
            Edit_Data_Submit.g.afterSuccess();
          };

          if (typeof APIURL !== "undefined" && APIURL) {
            window.__createKpiResultsCalled = true;
            var createUrl =
              APIURL + "/general/createkpiresults/" + encodeURIComponent(kpiCode);
            console.log("[mainkpi edit] calling createkpiresults:", createUrl);
            debugger;
            $.ajax({
              url: createUrl,
              method: "GET",
              success: function (res) {
                console.log("[mainkpi edit] createkpiresults success", res);
                proceedAfterCreateKpiResults();
              },
              error: function (xhr, status, err) {
                console.warn(
                  "[mainkpi edit] createkpiresults error",
                  status,
                  err,
                  xhr
                );
                proceedAfterCreateKpiResults();
              }
            });
          } else {
            console.warn(
              "[mainkpi edit] APIURL missing; skipping createkpiresults"
            );
            proceedAfterCreateKpiResults();
          }
          return;
        }

        if( listkey == "projects"){
        if(User_ProjUID == null || User_ProjUID == "لا يوجد" || User_ProjUID == "No Data")
      {
        SP.SOD.registerSod(
          "PS.ProjectContext",
          SP.Utilities.Utility.getLayoutsPageUrl("ps.js")
        );
        SP.SOD.loadMultiple(["PS.ProjectContext"], CreateProject);
      }

      
        projectManagerPickedToProjectCenter =
        Edit_Data_Submit.g.oListItem.get_item("ProjectManager");
        window.PGUID = Edit_Data_Submit.g.oListItem.get_item("ProjectGUID");
        window.PNAME = Edit_Data_Submit.g.oListItem.get_item("Title");

      SP.SOD.registerSod(
        "PS.ProjectContext",
        SP.Utilities.Utility.getLayoutsPageUrl("ps.js")
      );
      SP.SOD.loadMultiple(["PS.ProjectContext"], GetProjectsCreate);
      }

        Edit_Data_Submit.g.afterSuccess();

        if( listkey == "engineeringprojects"){
        var ProjectId = $("#ProjectId").val();
        var Title = $("#Title").val();
        var ProjectName = $("#ProjectName").val();
        var ProjectManager = $("#ProjectManager").val();
        var Status = $("#Status").val();
        var PlannedStartDate = $("#PlannedStartDate").val();
        var Deadline = $("#Deadline").val();
        var EstimatedCost = $("#EstimatedCost").val();
        var CRCost = $("#CRCost").val();
        var ActualCost = $("#ActualCost").val();
        var PlanPercentge = $("#PlanPercentge").val();
        var ActualProgress = $("#ActualProgress").val();
        var Variance = $("#Variance").val();
        var ProgressPercentage = $("#ProgressPercentage").val();
        var FinishTime = $("#FinishTime").val();
        var EarnedValue = $("#EarnedValue").val();
        var PaidValue = $("#PaidValue").val();
        var ProgressCost = $("#ProgressCost").val();
        var InDirectMP = $("#InDirectMP").val();
        var DirectMP = $("#DirectMP").val();
        var ManHours = $("#ManHours").val();
        var TotalWorkHours = $("#TotalWorkHours").val();
        var Contractor = $("#Contractor").val();
        var Consultant = $("#Consultant").val();
        var UpdateDayNotification = $("#UpdateDayNotification").val();
        var ProjectType = $("#ProjectType").val();
        var NCR = $("#NCR").val();
        var Accidents = $("#Accidents").val();
        var Injuries = $("#Injuries").val();
        var Deaths = $("#Deaths").val();
        var Notes = $("#Notes").val();

        engineeringprojectshistories.init(
          ProjectId,
          Title,
          ProjectName,
          ProjectManager,
          Status,
          PlannedStartDate,
          Deadline,
          EstimatedCost,
          CRCost,
          ActualCost,
          PlanPercentge,
          ActualProgress,
          Variance,
          ProgressPercentage,
          FinishTime,
          EarnedValue,
          PaidValue,
          ProgressCost,
          InDirectMP,
          DirectMP,
          ManHours,
          TotalWorkHours,
          Contractor,
          Consultant,
          UpdateDayNotification,
          ProjectType,
          NCR,
          Accidents,
          Injuries,
          Deaths,
          Notes
        );
    }

      }),
      Function.createDelegate(this, function (sender, args) {
        console.log(
          "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
        );

        // to save the error in event logging list while submit
        var msg = args.get_message();
        var stack = args.get_stackTrace();
        var url = window.location.href;

        // show pop up err msg
        Error_PopUp.init();
        //

        writeToEventViewer.preinit(
          msg,
          "JS Api Error",
          "High",
          url,
          "580",
          "14",
          stack
        );
      })
    );
  },
  g: {
    clickbait: function () {
      $("button.btn-save").off("click").on("click", function () {
        
        function checkAllNestedDeliverablesHasFiles(items) {
          return new Promise((resolve, reject) => {
            const requests = [];
            const enumerator = items.getEnumerator();
  
            while (enumerator.moveNext()) {
              const item = enumerator.get_current();
              const nestedId = item.get_id();
              const url = `${APIURL}/general/checknesteddeliverablehasfiles/${PCODE}/${nestedId}`;
              requests.push(
                fetch(url, { method: "GET" })
                  .then((res) => (res.ok ? res.json() : { result: false }))
                  .then((data) => data.result === true)
                  .catch(() => false)
              );
            }
  
            Promise.all(requests).then((results) => {
              const allHaveFiles = results.every((hasFiles) => hasFiles === true);
              resolve(allHaveFiles);
            });
          });
        }
  
        if (listkey == "deliverables" && isEdit == true) {
          if (
            ($("#Exchangetype").val() === "partial" || $("#Exchangetype").val() === "general") &&
            ($("#PurchaseRequestNumber").val() !== "" &&
              $("#PurchaseRequestNumber").val() !== null &&
              $("#PurchaseRequestNumber").val() !== undefined &&
              $("#PurchaseRequestNumber").val() !== No_Data) &&
            ($("#PurchaseOrderNumber").val() !== "" &&
              $("#PurchaseOrderNumber").val() !== null &&
              $("#PurchaseOrderNumber").val() !== undefined &&
              $("#PurchaseOrderNumber").val() !== No_Data)
          ) {
            const clientContext = new SP.ClientContext.get_current();
            const nestedList = clientContext.get_web().get_lists().getByTitle("NestedDeliverables");
            const camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml(
              `
              <View>
                <Query>
                  <Where>
                    <And>
                      <Eq>
                        <FieldRef Name='MasterID' />
                        <Value Type='Text'>${IID}</Value>
                      </Eq>
                      <Neq>
                        <FieldRef Name='DeletionStatus' />
                        <Value Type='Text'>Deleted</Value>
                      </Neq>
                    </And>
                  </Where>
                </Query>
              </View>
              `
            );
            const items = nestedList.getItems(camlQuery);
            clientContext.load(items);
    
            clientContext.executeQueryAsync(
              () => {
                const enumerator = items.getEnumerator();
                const hasNested = enumerator.moveNext();
    
                var fileValid = true;
                var fileScrollId = false;
                if ($("#getFile").length) {
                  var $file = $("#getFile");
                  if (!$file.val()) {
                    fileValid = false;
                    alert(".الوثائق الداعمة حقل إلزامي! يرجى ملأه بما يجب");
                    fileScrollId = $file.attr("id");
                  }
                }
    
                if (!fileValid) {
                  return;
                }
    
                if (!hasNested) {
                  // NO nested: submit the main deliverable first, then create nested AFTER save (handled in afterSuccess)
                  window.pendingCreateNestedAfterSave = true;
                  // Ensure the flag used by afterSuccess is reset appropriately
                  nesteddeliverabledisCreated = false;
                  Edit_Data_Submit.preinit();
                  return;
                }
    
                // There ARE nested items: check if any pending (WFStage != 'approved')
                var pendingExists = false;
                var enum2 = items.getEnumerator();
                while (enum2.moveNext()) {
                  var it = enum2.get_current();
                  var wf = it.get_item("WFStage");
                  if (!wf || wf.toString().toLowerCase() !== "approved") {
                    pendingExists = true;
                    break;
                  }
                }
    
                if (pendingExists) {
                  // There's a pending nested deliverable in approvals: do not create a new nested; just complete the update of the deliverable
                  window.pendingCreateNestedAfterSave = false;
                  Edit_Data_Submit.preinit();
                  return;
                }
    
                // No pending nested: ensure all nested have attachments via API before any submission
                checkAllNestedDeliverablesHasFiles(items).then((allGood) => {
                  if (!allGood) {
                    alert("لا يمكن الحفظ لوجود مخرج جزئي بدون مرفقات");
                    return;
                  } else {
                    //check quantity
                    if ($("#Quantity").val() == "0") {
                      alert("تم صرف جميع الكميه ويجب تعديل نوع الصرف الى تسليم");
                      return;
                    }
                    // All nested have attachments =>  submit the deliverable and then create a new nested (post-save)
                    window.pendingCreateNestedAfterSave = true;
                    Edit_Data_Submit.preinit();
                    return;
                  }
                });
              },
              (sender, args) => {
                console.error("Error checking NestedDeliverables:", args.get_message());
                // fallback: proceed with normal save (no nested creation)
                window.pendingCreateNestedAfterSave = false;
                Edit_Data_Submit.preinit();
              }
            );
          } else if (
            ($("#Exchangetype").val() === "partial" || $("#Exchangetype").val() === "general") &&
            (SP_ListName == "Deliverables" && isEdit == true) &&
            ($("#PurchaseRequestNumber").val() == "" ||
              $("#PurchaseRequestNumber").val() == null ||
              $("#PurchaseRequestNumber").val() == undefined ||
              $("#PurchaseRequestNumber").val() == No_Data) ||
            ($("#PurchaseOrderNumber").val() == "" ||
              $("#PurchaseOrderNumber").val() == null ||
              $("#PurchaseOrderNumber").val() == undefined ||
              $("#PurchaseOrderNumber").val() == No_Data)
          ) {
            // below comment cause hold deploy to production this time
         //   alert("لا يمكن صرف المخرج لعدم وجود رقم طلب الاحتياج ورقم أمر التعميد"); 
            Edit_Data_Submit.preinit();
          } else {
            Edit_Data_Submit.preinit();
          }
        } else {
          Edit_Data_Submit.preinit();
        }
      });
    },
    Cancel: function () {
      $("button.btn-cancel").on("click", function () {
        var cancelUrl =
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/View.aspx?ListKey=" +
          listkey +
          "&IID=" +
          IID +
          (typeof PCODE_STRING !== "undefined" ? PCODE_STRING : "");
        if (listkey == "mainkpiissues" || listkey == "mainkpianalysis") {
          var kpiCode = window.location.href.indexOf("KpiCode=") > -1 ? window.location.href.split("KpiCode=")[1].split("&")[0] : "";
          if (kpiCode) cancelUrl += "&KpiCode=" + encodeURIComponent(kpiCode);
        } else if (listkey == "sosanalysis") {
          var sosCodeCancel = window.location.href.indexOf("sosCode=") > -1 ? window.location.href.split("sosCode=")[1].split("&")[0] : "";
          if (sosCodeCancel) cancelUrl += "&sosCode=" + encodeURIComponent(sosCodeCancel);
        }
        window.location = cancelUrl;
      });
    },
    checkEditMasterDetails: function () {
      if ($(".Details-Item.NewItem").length > 0) {
        //calling new master submit
        $("[data-target_list]").each(function () {
          if ($(this).find(".Details-Item.NewItem").length > 0) {
            //if there are new items call function
            New_Master_Details_Submit.init($(this).attr("data-target_list"));
          }
        });
      } else if ($(".Details-Item.EditItem").length > 0) {
        //calling Edit master submit
        $("[data-target_list]").each(function () {
          if ($(this).find(".Details-Item.EditItem").length > 0) {
            //if there are edit items call function
            var masterIDs = [];
            $(this)
              .find(".Details-Item.EditItem")
              .each(function () {
                masterIDs.push($(this).attr("data-ID"));
              });
            // masterQuery += '</Values></In>';
            Edit_Master_Details_Submit.init(
              $(this).attr("data-target_list"),
              masterIDs
            );
          }
        });
      }
    },
    afterSuccess: function () {
      // determinig folder directory
      if (PCODE || listkey == "projects") {
        Documents_Library = ListArray[2].documents;
        folderdirectory = PCODE + "/" + listkey; //_spPageContextInfo.webServerRelativeUrl+
        // folderdirectory = '/'+ListArray[2].documents+'/'+PCODE+'/'+listkey;//_spPageContextInfo.webServerRelativeUrl+
      } else if (ICODE || listkey == "initiatives") {
        Documents_Library = "Initiative Documents";
        folderdirectory = ICODE + "/" + listkey;
      } else if (STCODE || listkey == "strategicpartnerships") {
        Documents_Library = "StrategicPartnerships Documents";
        folderdirectory = STCODE + "/" + listkey;
      } else if (listkey == "mainkpi") {
        Documents_Library = listkey + " Documents";
        folderdirectory = ""; //_spPageContextInfo.webServerRelativeUrl+
      } else {
        // Documents_Library = listkey + " Documents";
        // folderdirectory = "";
        Documents_Library = "SPM General Services";
        folderdirectory = listkey;
      }
      // else {
      //   Documents_Library = listkey + " Documents";
      //   folderdirectory = ""; //_spPageContextInfo.webServerRelativeUrl+
      //   // folderdirectory = '/'+listkey+' Documents/';//_spPageContextInfo.webServerRelativeUrl+
      // }

      if (!PCODE && listkey == "projects") {
        PCODE = Edit_Data_Submit.g.oListItem.get_item("Title");
      }
      //Get File Input Control and read the file name
      $("input[type=file]").each(function (e) {
        fileCount += document.querySelector("#" + $(this).attr("id")).files
          .length;
      });

      if (fileCount) {
        _uploadFile();
      }
      
      // readFiles();
      //else {
        if ($(".Details-Item.NewItem").length > 0 && !crListKey) {
          //calling new master submit
          New_Data_Submit.g.checkNewMasterDetails();
        } else if ($(".Details-Item.EditItem").length > 0 && !crListKey) {
          Edit_Data_Submit.g.checkEditMasterDetails();
        } else {
          if (USERisWF && workflowname == "Project") {
            BulkEdit(true);
          } else if (USERisWF && workflowname != "Project") {
            Continue_Submit_Field.init();
          } else {
            // For delegations and strategiccalendar, don't show alert here - will be shown after API call
            // For mainkpi, we also delay the alert to its own branch
            if (listkey != "delegations" && listkey != "strategiccalendar" && listkey != "mainkpi") {
              $(".btn-save").addClass("success");
              if ( localStorage.getItem("lng") == null ||
              localStorage.getItem("lng") == "ar") {
                alert("تم حفظ البيانات بنجاح");
                console.log('alert success')
            } else {
                alert("Data saved successfully");
            }
            }
            if (listkey == "kpiequations") {
              window.location =
                _spPageContextInfo.webAbsoluteUrl +
                "/SitePages/View.aspx?ListKey=mainkpi" +
                "&IID=" +
                $('#KPI option[value="' + $("#KPI").val() + '"]').attr(
                  "option-id"
                ) +
                PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
            } else if (listkey == "benefitsequations") {
              window.location =
                _spPageContextInfo.webAbsoluteUrl +
                "/SitePages/View.aspx?ListKey=benefitmetrics" +
                "&IID=" +
                $(
                  '#RelatedBenefit option[value="' +
                    $("#RelatedBenefit").val() +
                    '"]'
                ).attr("option-id") +
                PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
            } else if (listkey == "mainkpi") {
              var kpiCode = $("#Title").val();
              var redirectUrl = _spPageContextInfo.webAbsoluteUrl + "/SitePages/Listing.aspx?ListKey=" + listkey + (typeof PCODE_STRING !== "undefined" ? PCODE_STRING : "");
              var showSuccessAndRedirect = function () {
                $(".btn-save").addClass("success");
                if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
                  alert("تم حفظ البيانات بنجاح");
                } else {
                  alert("Data saved successfully");
                }
                window.location = redirectUrl;
              };
              if (typeof APIURL !== "undefined" && APIURL) {
                // createkpiresults should already have been called in executeQueryAsync success for edit.
                // Fallback: if we reached here from another path, call it once.
                if (!window.__createKpiResultsCalled) {
                  $.ajax({
                    url: APIURL + "/general/createkpiresults/" + encodeURIComponent(kpiCode),
                    method: "GET",
                    success: showSuccessAndRedirect,
                    error: showSuccessAndRedirect
                  });
                } else {
                  showSuccessAndRedirect();
                }
              } else {
                Edit_KPI_Results.init(
                  kpiName,
                  kpiType,
                  kpiSector,
                  kpiSubSector,
                  kpiPortfolio,
                  kpiMainGoalRelated,
                  kpiSubGoalRelated,
                  kpiPerformanceAnalysis,
                  kpiRecurrenceChanged,
                  kpicurrentYear,
                  kpiTotalActual
                );
                showSuccessAndRedirect();
              }
            }  else if (listkey == "benefits") {
              Edit_KPI_Results.init(
                kpiName,
                kpiType,
                kpiSector,
                kpiSubSector,
                kpiPortfolio,
                kpiMainGoalRelated,
                kpiSubGoalRelated,
                kpiPerformanceAnalysis,
                kpiRecurrenceChanged,
                kpicurrentYear,
                kpiTotalActual
              );
             
            } else if (listkey == "projects" && PCODE) {
              getProjectInfoToUpdateEPM();
            } else {
              // Handle delegations - call API after saving to List (EDIT - no files, no master details)
              if (listkey == "delegations") {
                var delegationTitle = $("#Title").val();
                console.log("Calling delegation API after saving to List (EDIT - no files, no master details)");
                console.log("Delegation Title:", delegationTitle);
                if (delegationTitle) {
                  $.ajax({
                    url: `${APIURL}/delegation/delegateuser/${delegationTitle}`,
                    method: "GET",
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                      console.log("Delegation API called successfully:", response);
                      $(".errormsg").hide();
                      $(".successmsg").show();
                      $(".btn-save").addClass("success");
                      if (localStorage.getItem("lng") == null ||
                          localStorage.getItem("lng") == "ar") {
                        alert("تم حفظ البيانات بنجاح");
                      } else {
                        alert("Data saved successfully");
                      }
                      window.location =
                        _spPageContextInfo.webAbsoluteUrl +
                        "/SitePages/Listing.aspx?ListKey=" +
                        listkey +
                        PCODE_STRING;
                    },
                    error: function (xhr, status, error) {
                      console.error("Error calling delegation API:", error);
                      $(".errormsg").hide();
                      $(".successmsg").show();
                      $(".btn-save").addClass("success");
                      if (localStorage.getItem("lng") == null ||
                          localStorage.getItem("lng") == "ar") {
                        alert("تم حفظ البيانات بنجاح");
                      } else {
                        alert("Data saved successfully");
                      }
                      window.location =
                        _spPageContextInfo.webAbsoluteUrl +
                        "/SitePages/Listing.aspx?ListKey=" +
                        listkey +
                        PCODE_STRING;
                    }
                  });
                } else {
                  // If no title, proceed with normal redirect
                  if (fileCount == 0) {
                    window.location =
                      _spPageContextInfo.webAbsoluteUrl +
                      "/SitePages/View.aspx?ListKey=" +
                      listkey +
                      "&IID=" +
                      IID +
                      PCODE_STRING;
                  }
                }
              } else if (listkey == "strategiccalendar") {
                var strategicCalendarTitle = $("#Title").val();
                if (strategicCalendarTitle) {
                  $.ajax({
                    url: `${APIURL}/general/updatedatareceptionenddate/${encodeURIComponent(strategicCalendarTitle)}`,
                    method: "GET",
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                      $(".errormsg").hide();
                      $(".successmsg").show();
                      $(".btn-save").addClass("success");
                      if (response && response.Result === false) {
                        if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
                          alert("حدث خطأ أثناء تحديث تاريخ الانتهاء من استقبال البيانات وبعدها تم الحفظ بنجاح");
                        } else {
                          alert("An error occurred while updating the data reception end date. Data was saved successfully.");
                        }
                      }
                      if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
                        alert("تم حفظ البيانات بنجاح");
                      } else {
                        alert("Data saved successfully");
                      }
                      window.location = _spPageContextInfo.webAbsoluteUrl +
                        "/SitePages/Listing.aspx?ListKey=" + listkey + PCODE_STRING;
                    },
                    error: function () {
                      $(".errormsg").hide();
                      $(".successmsg").show();
                      $(".btn-save").addClass("success");
                      if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
                        alert("حدث خطأ أثناء تحديث تاريخ الانتهاء من استقبال البيانات وبعدها تم الحفظ بنجاح");
                      } else {
                        alert("An error occurred while updating the data reception end date. Data was saved successfully.");
                      }
                      if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
                        alert("تم حفظ البيانات بنجاح");
                      } else {
                        alert("Data saved successfully");
                      }
                      window.location = _spPageContextInfo.webAbsoluteUrl +
                        "/SitePages/Listing.aspx?ListKey=" + listkey + PCODE_STRING;
                    }
                  });
                } else {
                  if (fileCount == 0) {
                    $(".errormsg").hide();
                    $(".successmsg").show();
                    $(".btn-save").addClass("success");
                    if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
                      alert("تم حفظ البيانات بنجاح");
                    } else {
                      alert("Data saved successfully");
                    }
                    window.location = _spPageContextInfo.webAbsoluteUrl +
                      "/SitePages/Listing.aspx?ListKey=" + listkey + PCODE_STRING;
                  }
                }
              } else {
                if (fileCount == 0) {
                var redirectUrl = _spPageContextInfo.webAbsoluteUrl +
                  "/SitePages/View.aspx?ListKey=" +
                  listkey +
                  "&IID=" +
                  IID +
                  PCODE_STRING;
                if (listkey == "mainkpiissues" || listkey == "mainkpianalysis") {
                  var kpiCode = window.location.href.indexOf("KpiCode=") > -1 ? window.location.href.split("KpiCode=")[1].split("&")[0] : "";
                  if (kpiCode) redirectUrl += "&KpiCode=" + kpiCode;
                }
                window.location = redirectUrl;
                } //_spPageContextInfo.webServerRelativeUrl+
              }
            }
          }
        }
     // }
      // }
    },
  },
};


function handlePartialDisbursementSave() {
  return new Promise((resolve, reject) => {
    const clientContext = new SP.ClientContext.get_current();
    const nestedList = clientContext.get_web().get_lists().getByTitle("NestedDeliverables");

    // === Step 1: check if there are pending disbursements ===
    const camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(`
      <View>
        <Query>
          <Where>
            <And>
              <Eq>
                <FieldRef Name='MasterID' />
                <Value Type='Text'>${IID}</Value>
              </Eq>
              <And>
                <Neq>
                  <FieldRef Name='WFStage' />
                  <Value Type='Text'>approved</Value>
                </Neq>
                <Neq>
                  <FieldRef Name='DeletionStatus' />
                  <Value Type='Text'>Deleted</Value>
                </Neq>
              </And>
            </And>
          </Where>
        </Query>
      </View>
    `);

    const existingItems = nestedList.getItems(camlQuery);
    clientContext.load(existingItems);

    clientContext.executeQueryAsync(
      () => {
        const enumerator = existingItems.getEnumerator();
        if (enumerator.moveNext()) {
          // يوجد مخرج آخر قيد الموافقات
          alert("يوجد مخرج آخر منصرف قيد الموافقات");
          resolve(false); // نوقف الحفظ
          return;
        }

        // === Step 2: لا يوجد تعارض، نكمل إضافة الجديد ===
        const newItem = nestedList.addItem(new SP.ListItemCreationInformation());

        if (projectInitiativeType == 'vision') {
          newItem.set_item("WFModuleCode", "VROProjNDeliverable");
          newItem.set_item("WFStage", "VROProjNDeliverable01");
        } else if (projectInitiativeType == 'lms') {
          newItem.set_item("WFModuleCode", "LMSProjNDeliverable");
          newItem.set_item("WFStage", "LMSProjNDeliverable01");
        } else if (projectInitiativeType == 'strategically') {
          newItem.set_item("WFModuleCode", "EPMOProjNDeliverable");
          newItem.set_item("WFStage", "EPMOProjNDeliverable01");
        }

        // set field values
        newItem.set_item("ProjectCode", PCODE);
        newItem.set_item("MasterID", IID);
        newItem.set_item("MasterKey", "Deliverables");
        newItem.set_item("AmountPrice", $("#AmountPrice").val());
       
        if($("#Disbursedquantity").val() == undefined || $("#Disbursedquantity").val() == null || $("#Disbursedquantity").val() == '')
        {
          newItem.set_item("Quantity", $("#Quantity").val());
        }
        else
        {
          newItem.set_item("Quantity", $("#Disbursedquantity").val());
        }
        newItem.set_item("Name", $("#Name").val());
        newItem.set_item("Description", $("#Description").val());
        newItem.set_item("PurchaseRequestNumber", $("#PurchaseRequestNumber").val());
        newItem.set_item("PurchaseOrderNumber", $("#PurchaseOrderNumber").val());
        newItem.set_item("PurchaseOrderLineNumber", $("#ProjectLineNumber").val());
        newItem.set_item("InvoiceNumber", $("#InvoiceNumber").val());
        newItem.set_item("InvoiceDate", $("#InvoiceDate").val());

        // build title code
        const prt1 = "ND",
          prt2 = String(new Date().getFullYear()).slice(2),
          prt3 = IID,
          ptr4 = String(new Date().getMonth() + 1);
        const Code = `${prt1}-${prt2}-${prt3}-${ptr4}`;

        newItem.set_item("Title", Code);
        newItem.update();

        clientContext.executeQueryAsync(
          () => {
            console.log("New partial disbursement record added");
            resolve(true);
          },
          (sender, args) => {
            console.error("Error adding disbursement:", args.get_message());
            resolve(false);
          }
        );
      },
      (sender, args) => {
        console.error("Error checking nested deliverables:", args.get_message());
        resolve(false);
      }
    );
  });
}



//BenefitResults

var benefitResults = {
  init: function (benefitYear) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("BenefitsResults");
    var itemCreateInfo = new SP.ListItemCreationInformation();
    benefitResults.g.oListItem = oList.addItem(itemCreateInfo);

    var prt1 = listkey.substring(0, 2).toUpperCase(),
      prt2 = String(new Date().getFullYear()).slice(4 - 2),
      prt3 = IID.toString().padStart(4, "0");

    var Code = prt1 + "-" + prt2 + "-" + prt3;
    benefitResults.g.oListItem.set_item("RelatedBenefitMetrics", Code);

    var prt4 = benefitYear.toString().slice(-2);

    var eqkey = "benefitresults";

    (prt1 = eqkey.substring(0, 2).toUpperCase()),
      (Code = prt1 + "-" + prt2 + "-" + prt3 + "-" + prt4);
    benefitResults.g.oListItem.set_item("Title", Code);

    benefitResults.g.oListItem.set_item("Year", benefitYear);

    benefitResults.g.oListItem.update();
    clientContext.load(benefitResults.g.oListItem);

    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        console.log("Results Benefits added");
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

//kpiResults

var kpiResults = {
  init: function (
    Name,
    PeriodType,
    Types,
    KpiYear,
    Sector,
    SubSector,
    Portfolio,
    MainGoalRelated,
    subGoalRelated
  ) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("KPIResults");
    var itemCreateInfo = new SP.ListItemCreationInformation();
    kpiResults.g.oListItem = oList.addItem(itemCreateInfo);
    if(listkey == "benefits"){
      var prt1 = listkey.substring(0, 2).toUpperCase(),
      prt2 = String(new Date().getFullYear()).slice(4 - 2),
      prt3 = IID.toString().padStart(4, "0");
      var Code = prt1 + "-" + prt2 + "-" + prt3;
      kpiResults.g.oListItem.set_item("BenefitCode", Code);
      var eqkey = "kpiresults";
      (prt1 = eqkey.substring(0, 2).toUpperCase()),
        (Code = prt1 + "-" + prt2 + "-" + prt3);
      kpiResults.g.oListItem.set_item("Title", Code);
  
      kpiResults.g.oListItem.set_item("Name", Name);
      kpiResults.g.oListItem.set_item("PeriodType", PeriodType);
      // kpiResults.g.oListItem.set_item("Types", Types);
      kpiResults.g.oListItem.set_item("Year", KpiYear);
      // kpiResults.g.oListItem.set_item("Sector", Sector);
      // kpiResults.g.oListItem.set_item("SubSector", SubSector);
      // kpiResults.g.oListItem.set_item("Portfolio", Portfolio);
    } else {
    var prt1 = listkey.substring(0, 2).toUpperCase(),
      prt2 = String(new Date().getFullYear()).slice(4 - 2),
      prt3 = IID.toString().padStart(4, "0");
      var Code = prt1 + "-" + prt2 + "-" + prt3;
      kpiResults.g.oListItem.set_item("KPI", Code);
    

    var eqkey = "kpiresults";
    (prt1 = eqkey.substring(0, 2).toUpperCase()),
      (Code = prt1 + "-" + prt2 + "-" + prt3);
    kpiResults.g.oListItem.set_item("Title", Code);

    kpiResults.g.oListItem.set_item("Name", Name);
    kpiResults.g.oListItem.set_item("PeriodType", PeriodType);
    kpiResults.g.oListItem.set_item("Types", Types);
    kpiResults.g.oListItem.set_item("Year", KpiYear);
    kpiResults.g.oListItem.set_item("Sector", Sector);
    kpiResults.g.oListItem.set_item("SubSector", SubSector);
    kpiResults.g.oListItem.set_item("Portfolio", Portfolio);
    if (!isAdmin && !isEPMO && !isVROE && !isLMSUExecution && !isSPMAdmin)
      kpiResults.g.oListItem.set_item("DraftStatus", "draft");
    if (Types == "main") {
      kpiResults.g.oListItem.set_item("RelatedGoal", MainGoalRelated);
    } else if (Types == "sub") {
      kpiResults.g.oListItem.set_item("RelatedGoal", subGoalRelated);
    }
    ////////  update performance leader1 and performance leader2
    if ($("#PerformanceLeader").find("span.sp-peoplepicker-userSpan").length) {
      var id = $("#PerformanceLeader").attr("INppicker");
      var ppp =
        $("#PerformanceLeader")
          .find("span.sp-peoplepicker-userSpan")
          .attr("sid") == undefined
          ? ""
          : SP.FieldUserValue.fromUser(
              $("#PerformanceLeader")
                .find("span.sp-peoplepicker-userSpan")
                .attr("sid")
                .split("|")
                .slice(-1)[0]
            );

      kpiResults.g.oListItem.set_item(id, ppp);
    }
    if ($("#PerformanceLeader2").find("span.sp-peoplepicker-userSpan").length) {
      var id = $("#PerformanceLeader2").attr("INppicker");
      var ppp =
        $("#PerformanceLeader2")
          .find("span.sp-peoplepicker-userSpan")
          .attr("sid") == undefined
          ? ""
          : SP.FieldUserValue.fromUser(
              $("#PerformanceLeader2")
                .find("span.sp-peoplepicker-userSpan")
                .attr("sid")
                .split("|")
                .slice(-1)[0]
            );

      kpiResults.g.oListItem.set_item(id, ppp);
    }
  }
    /////////////////////////////////////////////////////////

    kpiResults.g.oListItem.update();
    clientContext.load(kpiResults.g.oListItem);

    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        console.log("Results KPI added");
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

//engineeringprojectshistories
engineeringprojectshistories = {
  init:function(
    ProjectId,
    Title,
    ProjectName,
    ProjectManager,
    Status,
    PlannedStartDate,
    Deadline,
    EstimatedCost,
    CRCost,
    ActualCost,
    PlanPercentge,
    ActualProgress,
    Variance,
    ProgressPercentage,
    FinishTime,
    EarnedValue,
    PaidValue,
    ProgressCost,
    InDirectMP,
    DirectMP,
    ManHours,
    TotalWorkHours,
    Contractor,
    Consultant,
    UpdateDayNotification,
    ProjectType,
    NCR,
    Accidents,
    Injuries,
    Deaths,
    Notes){

      var clientContext = new SP.ClientContext.get_current();
      var oList = clientContext.get_web().get_lists().getByTitle("EngineeringProjectsHistory");
      var itemCreateInfo = new SP.ListItemCreationInformation();
      engineeringprojectshistories.g.oListItem = oList.addItem(itemCreateInfo);
      engineeringprojectshistories.g.oListItem.set_item("Title", Title);
      engineeringprojectshistories.g.oListItem.set_item("ProjectId", ProjectId);
      engineeringprojectshistories.g.oListItem.set_item("ProjectName", ProjectName);
      engineeringprojectshistories.g.oListItem.set_item("ProjectManager", ProjectManager);
      engineeringprojectshistories.g.oListItem.set_item("Status", Status);
      engineeringprojectshistories.g.oListItem.set_item("PlannedStartDate", PlannedStartDate);
      engineeringprojectshistories.g.oListItem.set_item("Deadline", Deadline);
      engineeringprojectshistories.g.oListItem.set_item("EstimatedCost", EstimatedCost);
      engineeringprojectshistories.g.oListItem.set_item("CRCost", CRCost);
      engineeringprojectshistories.g.oListItem.set_item("ActualCost", ActualCost);
      engineeringprojectshistories.g.oListItem.set_item("PlanPercentge", PlanPercentge);
      engineeringprojectshistories.g.oListItem.set_item("ActualProgress", ActualProgress);
      engineeringprojectshistories.g.oListItem.set_item("Variance", Variance);
      engineeringprojectshistories.g.oListItem.set_item("ProgressPercentage", ProgressPercentage);
      engineeringprojectshistories.g.oListItem.set_item("FinishTime", FinishTime);
      engineeringprojectshistories.g.oListItem.set_item("EarnedValue", EarnedValue);
      engineeringprojectshistories.g.oListItem.set_item("PaidValue", PaidValue);
      engineeringprojectshistories.g.oListItem.set_item("ProgressCost", ProgressCost);
      engineeringprojectshistories.g.oListItem.set_item("InDirectMP", InDirectMP);
      engineeringprojectshistories.g.oListItem.set_item("DirectMP", DirectMP);
      engineeringprojectshistories.g.oListItem.set_item("ManHours", ManHours);
      engineeringprojectshistories.g.oListItem.set_item("TotalWorkHours", TotalWorkHours);
      engineeringprojectshistories.g.oListItem.set_item("Contractor", Contractor);
      engineeringprojectshistories.g.oListItem.set_item("Consultant", Consultant);
      engineeringprojectshistories.g.oListItem.set_item("UpdateDayNotification", UpdateDayNotification);
      engineeringprojectshistories.g.oListItem.set_item("ProjectType", ProjectType);
      engineeringprojectshistories.g.oListItem.set_item("NCR", NCR);
      engineeringprojectshistories.g.oListItem.set_item("Accidents", Accidents);
      engineeringprojectshistories.g.oListItem.set_item("Injuries", Injuries);
      engineeringprojectshistories.g.oListItem.set_item("Deaths", Deaths);
      engineeringprojectshistories.g.oListItem.set_item("Notes", Notes);

      engineeringprojectshistories.g.oListItem.update();
      clientContext.load(engineeringprojectshistories.g.oListItem);
  
      clientContext.executeQueryAsync(
        Function.createDelegate(this, function () {
          console.log("Engineering Projects historY Added");
        }),
        Function.createDelegate(this, function (sender, args) {
          console.log(
            "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
          );
        })
      );
    },
    g: {},
  }

// Edit Kpi Results list when edit on main kpi to make the target page updated
var Edit_KPI_Results = {
  init: function (
    Name,
    Types,
    Sector,
    SubSector,
    kpiPortfolio,
    kpiMainGoalRelated,
    kpiSubGoalRelated,
    kpiPerformanceAnalysis,
    kpiRecurrenceChanged,
    kpicurrentYear,
    kpiTotalActuals
  ) {
    var context = SP.ClientContext.get_current();
    var dfd = $.Deferred();
    var programList = context.get_web().get_lists().getByTitle("KPIResults");
    var camlQuery = new SP.CamlQuery();
    if(listkey == "benefits"){
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='BenefitCode'/><Value Type='Text'>" +
        benefitCodeResult +
        "</Value></Eq></And></Where></Query></View>"
    );
    } else {
     camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='KPI'/><Value Type='Text'>" +
        kpiCodeResult +
        "</Value></Eq></And></Where></Query></View>"
    ); 
    }

    //Get items by Query
    var progColl = programList.getItems(camlQuery);
    //Load item collection
    context.load(progColl);

    context.executeQueryAsync(function () {
      var currentItemArray = [];
      if (progColl.get_count() > 0) {
        var progEnum = progColl.getEnumerator();
        while (progEnum.moveNext()) {
          var currentItem = progEnum.get_current();
          var currentId = currentItem.get_item("ID");
          var yearItem = currentItem.get_item("Year");

          //Get Item by current ID
          var items = programList.getItemById(currentId);
          if (listkey == "benefits") {
          items.set_item("Name", Name);
          items.set_item("Types", Types);
          items.set_item("Year", yearItem);
          items.set_item("PeriodType", kpiPeriodTypeUpdate)
          }
          else {
          items.set_item("Name", Name);
          items.set_item("Types", Types);
          items.set_item("Sector", Sector);
          items.set_item("SubSector", SubSector);
          items.set_item("RecurrenceChanged", kpiRecurrenceChanged);
          if (yearItem == kpicurrentYear) {
            items.set_item("Actual", kpiTotalActuals);
          }

          ///////// update performance leader1 and performance leader2
          if (
            $("#PerformanceLeader").find("span.sp-peoplepicker-userSpan").length
          ) {
            var id = $("#PerformanceLeader").attr("INppicker");
            var ppp =
              $("#PerformanceLeader")
                .find("span.sp-peoplepicker-userSpan")
                .attr("sid") == undefined
                ? ""
                : SP.FieldUserValue.fromUser(
                    $("#PerformanceLeader")
                      .find("span.sp-peoplepicker-userSpan")
                      .attr("sid")
                      .split("|")
                      .slice(-1)[0]
                  );
            items.set_item(id, ppp);
          }
          if (
            $("#PerformanceLeader2").find("span.sp-peoplepicker-userSpan")
              .length
          ) {
            var id = $("#PerformanceLeader2").attr("INppicker");
            var ppp =
              $("#PerformanceLeader2")
                .find("span.sp-peoplepicker-userSpan")
                .attr("sid") == undefined
                ? ""
                : SP.FieldUserValue.fromUser(
                    $("#PerformanceLeader2")
                      .find("span.sp-peoplepicker-userSpan")
                      .attr("sid")
                      .split("|")
                      .slice(-1)[0]
                  );
            items.set_item(id, ppp);
          }
          /////////

          if (yearItem == kpiYearPicked) {
            // to update performance analysis
            if (kpiPeriodTypeUpdate == "monthly") {
              items.set_item(
                `PerformanceAnalysis${kpiMonthPicked}`,
                kpiPerformanceAnalysis
              );
            } else if (kpiPeriodTypeUpdate == "quarter") {
              items.set_item(
                `PerformanceAnalysis${kpiQuarterPicked}`,
                kpiPerformanceAnalysis
              );
            } else if (kpiPeriodTypeUpdate == "midterm") {
              items.set_item(
                `PerformanceAnalysis${kpiMidPicked}`,
                kpiPerformanceAnalysis
              );
            } else if (kpiPeriodTypeUpdate == "year") {
              items.set_item(
                "PerformanceAnalysisActualY",
                kpiPerformanceAnalysis
              );
            }
          }
          if (Types == "main") {
            items.set_item("RelatedGoal", kpiMainGoalRelated);
            items.set_item("Portfolio", "");
          } else if (Types == "sub") {
            items.set_item("RelatedGoal", kpiSubGoalRelated);
            items.set_item("Portfolio", kpiPortfolio);
          }
        }
          //Update the item
          items.update();
          currentItemArray.push(items);
          context.load(currentItemArray[currentItemArray.length - 1]);
        }
        context.executeQueryAsync(
          function () {
           if (!mainKpiIsUpload) {
             window.location =
                _spPageContextInfo.webAbsoluteUrl +
                "/SitePages/View.aspx?ListKey=" +
                listkey +
                "&IID=" +
                IID +
                PCODE_STRING;
            }

            dfd.resolve();
          },
          function (sender, args) {
            //Item updated fail
            console.log(
              "Request Failed to get kpi results Item Items :" +
                args.get_message()
            );
          }
        );
      }
    });
  },
};
//New KPI Equation
var newKPIEquation = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("KPIEquations");
    var itemCreateInfo = new SP.ListItemCreationInformation();
    newKPIEquation.g.oListItem = oList.addItem(itemCreateInfo);

    var prt1 = listkey.substring(0, 2).toUpperCase(),
      prt2 = String(new Date().getFullYear()).slice(4 - 2),
      prt3 = IID.toString().padStart(4, "0");
    var Code = prt1 + "-" + prt2 + "-" + prt3;
    newKPIEquation.g.oListItem.set_item("KPI", Code);

    var eqkey = "kpiequations";
    (prt1 = eqkey.substring(0, 2).toUpperCase()),
      (Code = prt1 + "-" + prt2 + "-" + prt3);
    newKPIEquation.g.oListItem.set_item("Title", Code);

    newKPIEquation.g.oListItem.update();
    clientContext.load(newKPIEquation.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        console.log("equation added");
        Set_Code_Submit.init();
      }),
      Function.createDelegate(this, function (sender, args) {
        console.log(
          "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
        );
        // to save the error in event logging list while submit
        var msg = args.get_message();
        var stack = args.get_stackTrace();
        var url = window.location.href;
        // show pop up err msg
        // Error_PopUp.init()
        //
        writeToEventViewer.preinit(
          msg,
          "JS Api Error",
          "High",
          url,
          "580",
          "14",
          stack
        );
      })
    );
  },
  g: {},
};

// New Benefit Equation

var newBenefitEquation = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("BenefitsEquations");
    var itemCreateInfo = new SP.ListItemCreationInformation();
    newBenefitEquation.g.oListItem = oList.addItem(itemCreateInfo);

    var prt1 = listkey.substring(0, 2).toUpperCase(),
      prt2 = String(new Date().getFullYear()).slice(4 - 2),
      prt3 = IID.toString().padStart(4, "0");
    var Code = prt1 + "-" + prt2 + "-" + prt3;
    newBenefitEquation.g.oListItem.set_item("RelatedBenefit", Code);

    var eqkey = "benefitsequations";
    (prt1 = eqkey.substring(0, 2).toUpperCase()),
      (Code = prt1 + "-" + prt2 + "-" + prt3);
    newBenefitEquation.g.oListItem.set_item("Title", Code);

    newBenefitEquation.g.oListItem.update();
    clientContext.load(newBenefitEquation.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        console.log("equation added");
        Set_Code_Submit.init();
      }),
      Function.createDelegate(this, function (sender, args) {
        console.log(
          "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
        );
        // to save the error in event logging list while submit
        var msg = args.get_message();
        var stack = args.get_stackTrace();
        var url = window.location.href;
        // show pop up err msg
        // Error_PopUp.init()
        //
        writeToEventViewer.preinit(
          msg,
          "JS Api Error",
          "High",
          url,
          "580",
          "14",
          stack
        );
      })
    );
  },
  g: {},
};
//master Data
var New_Master_Details_Submit = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    // $('[data-target_list]').each(function(){
    var pillerCount = 0;
    $(
      "[data-target_list=Initiatives] .Details-Item.NewItem.master-to-submit" &&
        listkey == "projectcharter"
    ).each(console.log("mmmmmmmm"));
    $("[data-target_list] .Details-Item.NewItem.master-to-submit").each(
      function () {
        var CurrList = $(this)
          .closest("[data-target_list]")
          .attr("data-target_list");

        var oList = clientContext.get_web().get_lists().getByTitle(CurrList);

        var itemCreateInfo = new SP.ListItemCreationInformation();
        New_Master_Details_Submit.g.oListItem = oList.addItem(itemCreateInfo);

        $(this)
          .find(
            ".CFIELD:not(.dont-submit)>input:not([type=file])," +
              ".CFIELD:not(.dont-submit)>div[type=picker]," +
              ".CFIELD:not(.dont-submit)>div[type=multipicker]," +
              ".CFIELD:not(.dont-submit)>select[type=dropdown]," +
              ".CFIELD:not(.dont-submit)>textarea," +
              ".CFIELD:not(.dont-submit)>.multiselect-container"
          )
          .each(function () {
            if ($(this).attr("type") == "picker") {
              if ($(this).find("span.sp-peoplepicker-userSpan").length > 0) {
                var id =
                  $(this).attr("INppicker").indexOf("+++") == -1
                    ? $(this).attr("INppicker")
                    : $(this).attr("INppicker").split("+++")[0];
                var ppp =
                  $(this).find("span.sp-peoplepicker-userSpan").attr("sid") ==
                  undefined
                    ? ""
                    : SP.FieldUserValue.fromUser(
                        $(this)
                          .find("span.sp-peoplepicker-userSpan")
                          .attr("sid")
                          .split("|")
                          .slice(-1)[0]
                      );
                New_Master_Details_Submit.g.oListItem.set_item(id, ppp);
              }
            } else if ($(this).attr("type") == "multipicker") {
              if ($(this).find("span.sp-peoplepicker-userSpan").length) {
                var id = $(this).attr("INppicker");
                var users = [];
                $("span.sp-peoplepicker-userSpan").each(function () {
                  var ppp =
                    $(this).attr("sid") == undefined
                      ? ""
                      : SP.FieldUserValue.fromUser(
                          $(this).attr("sid").split("|").slice(-1)[0]
                        );

                  users.push(ppp);
                });
                New_Master_Details_Submit.g.oListItem.set_item(id, users);
              }
            } else if ($(this).attr("type") == "date") {
              var dateval = $(this).val().replace("-", "/");
              var ydate = !dateval
                ? ""
                : [dateval.slice(5, 10), dateval.slice(0, 4)]
                    .join("/")
                    .replace("-", "/");
              if (dateval)
                New_Master_Details_Submit.g.oListItem.set_item(
                  $(this).attr("id"),
                  ydate
                );
            } else if ($(this).attr("type") == "radio") {
              var checkedvalue = $(
                'input[id="' + $(this).attr("id") + '"]:checked'
              ).val();
              New_Master_Details_Submit.g.oListItem.set_item(
                $(this).attr("id"),
                checkedvalue
              );
            } else if ($(this).attr("type") == "dropdown") {
              New_Master_Details_Submit.g.oListItem.set_item(
                $(this).attr("id"),
                $(this).val()
              );
            } else if ($(this).hasClass("percentagefield")) {
              New_Master_Details_Submit.g.oListItem.set_item(
                $(this).attr("id"),
                $(this).val() / 100
              );
            } else if ($(this).attr("type") == "multiselect") { 
              var myselections = [];
              $(this)
                .find("input:checkbox:checked")
                .each(function () {
                  myselections.push($(this).val());
                });

              // $(this)
              //   .find("input#Revenue:checked")
              //   .each(function () {
              //     myselections.push($(this).val());
              //   });
              myselections = myselections.join(":::");
              New_Master_Details_Submit.g.oListItem.set_item(
                $(this).attr("myfield"),
                myselections
              );
            } else
              New_Master_Details_Submit.g.oListItem.set_item(
                $(this).attr("id"),
                $(this).val()
              );
          });
        New_Master_Details_Submit.g.oListItem.set_item("MasterID", IID);
        New_Master_Details_Submit.g.oListItem.set_item("MasterKey", listkey);
        // if (listkey == "projects") {
        // New_Master_Details_Submit.g.oListItem.set_item('ProjectCode', $('#Title').val());

        var prt1 = CurrList.substring(0, 2).toUpperCase(),
          prt2 = String(new Date().getFullYear()).slice(4 - 2),
          prt3 = IID.toString().padStart(4, "0"),
          prt4 = $(this).data("index").toString().padStart(4, "0");
        Code = prt1 + "-" + prt2 + "-" + prt3 + "-" + prt4;

        // to save the master details attach in project and init
        isThereAttachement = $(this).find(
          ".CFIELD:not(.dont-submit)>input[type=file]"
        ).length;
        if (isThereAttachement > 0) {
          var checkAttachId = $(this)
            .find(".CFIELD:not(.dont-submit)>input[type=file]")
            .attr("id");
          var isThereFiles = document.querySelector("#" + checkAttachId).files
            .length;

          if (isThereFiles > 0) {
            allNewMasterIdRelatedCodeArr.push({
              code: Code,
              CurrList: CurrList,
            });
          }
        }
        //

        New_Master_Details_Submit.g.oListItem.set_item("Title", Code);

        if (PCODE) {
          New_Master_Details_Submit.g.oListItem.set_item("ProjectCode", PCODE);
        } else if (ICODE) {
          New_Master_Details_Submit.g.oListItem.set_item(
            "InitiativeCode",
            ICODE
          );
        }

        if (listkey == "goalstrategy") {
          var itemId = IID + pillerCount; // to save a newTitle for mult master details item
          var prt1 = CurrList.substring(0, 2).toUpperCase(),
            prt2 = String(new Date().getFullYear()).slice(4 - 2),
            prt3 = itemId.toString().padStart(4, "0");
          var pillerCode = prt1 + "-" + prt2 + "-" + prt3;
          New_Master_Details_Submit.g.oListItem.set_item("Title", pillerCode);
          pillerCount += 1;
          var type = $("#Types").val();
          if (type == "vision") {
            New_Master_Details_Submit.g.oListItem.set_item("Types", "program");
          } else if (
            type == "ministry" ||
            type == "sectorial" ||
            type == "lms" ||
            type == "sub"
          ) {
            New_Master_Details_Submit.g.oListItem.set_item("Types", "pillar");
          }
        }

        New_Master_Details_Submit.g.oListItem.update();
        clientContext.load(New_Master_Details_Submit.g.oListItem);
      }
    );
    // });

    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        // get id of master when create to use it in master field of master section
        var newItemMasterLength = $(
          ".Details-Item.NewItem ul[data-fieldtargetlist]"
        ).length;
        if (newItemMasterLength) {
          if (
            New_Master_Details_Submit.g.oListItem &&
            New_Master_Details_Submit.g.oListItem != "undefined"
          ) {
            masterIdWhenCreate = New_Master_Details_Submit.g.oListItem.get_id();
          }
        }

        // allNewMasterIdStr +=  New_Master_Details_Submit.g.oListItem.get_id();

        // allNewMasterIdArr.push(
        //   New_Master_Details_Submit.g.oListItem.get_id()
        // )

        if ($(".Details-Item.EditItem").length > 0) {
          //calling Edit master submit
          $("[data-target_list]").each(function () {
            if ($(this).find(".Details-Item.EditItem").length > 0) {
              //if there are edit items call function
              var masterIDs = [];
              $(this)
                .find(".Details-Item.EditItem")
                .each(function () {
                  masterIDs.push($(this).attr("data-ID"));
                });
              // masterQuery += '</Values></In>';
              Edit_Master_Details_Submit.init(
                $(this).attr("data-target_list"),
                masterIDs
              );
            }
          });
        } else if (isNew) {
          if (listkey == "projects") {
            createFolder(
              ListArray[2].documents,
              PCODE + "/",
              function (folder) {
                // console.log(String.format("Folder has been created", folder.get_name()));
              },
              function (sender, args) {
                // console.log(args.get_message());
              }
            );
            // window.location = _spPageContextInfo.webAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=' + listkey + PCODE_STRING;
          } else if (listkey == "initiatives") {
            createFolder(
              "Initiative Documents",
              ICODE + "/",
              function (folder) {
                // console.log(String.format("Folder has been created", folder.get_name()));
              },
              function (sender, args) {
                // console.log(args.get_message());
              }
            );
          } else if (listkey == "strategicpartnerships") {
            createFolder(
              "StrategicPartnerships Documents",
              STCODE + "/",
              function (folder) {
                // console.log(String.format("Folder has been created", folder.get_name()));
              },
              function (sender, args) {
                // console.log(args.get_message());
              }
            );
          } else {
            // console.log('successful');
            $(".errormsg").hide();
            $(".successmsg").show();
            $(".btn-save").addClass("success");

            if ( localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar") {
              alert("تم حفظ البيانات بنجاح");
              console.log('alert success')
          } else {
              alert("Data saved successfully");
          }

            window.location =
              _spPageContextInfo.webAbsoluteUrl +
              "/SitePages/Listing.aspx?ListKey=" +
              listkey +
              PCODE_STRING;
          }
        } else {
          // console.log('successful');
          if (USERisWF && workflowname == "Project") {
            BulkEdit(true);
          } else if (USERisWF && workflowname != "Project") {
            Continue_Submit_Field.init();
          } else {
            $(".errormsg").hide();
            $(".successmsg").show();
            $(".btn-save").addClass("success");

            if (listkey == "mainkpi") {
              var kpiCode = $("#Title").val();
              var redirectUrl = _spPageContextInfo.webAbsoluteUrl + "/SitePages/Listing.aspx?ListKey=" + listkey + PCODE_STRING;
              var showSuccessAndRedirect = function () {
                if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
                  alert("تم حفظ البيانات بنجاح");
                } else {
                  alert("Data saved successfully");
                }
                if (!mainKpiIsUpload || isuploaddone) {
                  window.location = redirectUrl;
                }
              };
              $.ajax({
                url: `${APIURL}/general/createkpiresults/${kpiCode}`,
                method: "GET",
                success: function () {
                  console.log("api called successfully");
                  showSuccessAndRedirect();
                },
                error: function () {
                  showSuccessAndRedirect();
                }
              });
            } else {
            if ( localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar") {
              alert("تم حفظ البيانات بنجاح");
              console.log('alert success')
          } else {
              alert("Data saved successfully");
          }

            if (listkey == "projects") {
              getProjectInfoToUpdateEPM();

              // window.location =
              //   _spPageContextInfo.webAbsoluteUrl +
              //   "/SitePages/View.aspx?ListKey=" +
              //   listkey +
              //   "&IID=" +
              //   IID +
              //   PCODE_STRING;
            } else {
              if (listkey == "initiativecards" && ICODE) {
                window.location =
                  _spPageContextInfo.webAbsoluteUrl +
                  "/SitePages/View.aspx?ListKey=" +
                  listkey +
                  "&IID=" +
                  IID +
                  PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
              } else {
                if(listkey == "mainkpi")
                {
                  if(!mainKpiIsUpload)
                  {
                    window.location =
                  _spPageContextInfo.webAbsoluteUrl +
                  "/SitePages/Listing.aspx?ListKey=" +
                  listkey +
                  PCODE_STRING;
                  } else if (isuploaddone ){
  window.location =
                  _spPageContextInfo.webAbsoluteUrl +
                  "/SitePages/Listing.aspx?ListKey=" +
                  listkey +
                  PCODE_STRING;
                  }
                }
                else
                {
                window.location =
                  _spPageContextInfo.webAbsoluteUrl +
                  "/SitePages/Listing.aspx?ListKey=" +
                  listkey +
                  PCODE_STRING;
                }
              }
            }
            }
          }
        }
      }),
      Function.createDelegate(this, function (sender, args) {
        console.log(
          "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
        );
        // show pop up err msg
        // Error_PopUp.init()
        //
      })
    );
  },
  g: {},
};

var countSuccessMaster = 0;

var Edit_Master_Details_Submit = {
  init: function (DetailsList, IDs) {
    var clientContext = new SP.ClientContext.get_current();
    var CurrList, oList, itemID;

    // var masterLength = $("[data-target_list][data-section_type=master]").length

    $("[data-target_list] .Details-Item.EditItem").each(function () {
      CurrList = $(this).closest("[data-target_list]").attr("data-target_list");
      oList = clientContext.get_web().get_lists().getByTitle(CurrList);
      itemID = $(this).attr("data-id");
      Edit_Master_Details_Submit.g.oListItem = oList.getItemById(itemID);
      $(
        '[data-target_list="' +
          CurrList +
          '"] [data-ID="' +
          itemID +
          '"] > .CFIELD:not(.dont-submit):not(.dont-request)> input,' +
          '[data-target_list="' +
          CurrList +
          '"] [data-ID="' +
          itemID +
          '"] > .CFIELD:not(.dont-submit):not(.dont-request)> div[type=picker],' +
          '[data-target_list="' +
          CurrList +
          '"] [data-ID="' +
          itemID +
          '"] > .CFIELD:not(.dont-submit):not(.dont-request)> select[type=dropdown],' +
          '[data-target_list="' +
          CurrList +
          '"] [data-ID="' +
          itemID +
          '"] > .CFIELD:not(.dont-submit):not(.dont-request)>  textarea,' +
          '[data-target_list="' +
          CurrList +
          '"] [data-ID="' +
          itemID +
          '"] > .CFIELD:not(.dont-submit):not(.dont-request) > .multiselect-container'
      ).each(function () {
        if ($(this).attr("type") == "picker") {
          if ($(this).find("span.sp-peoplepicker-userSpan").length) {
            var id =
              $(this).attr("INppicker").indexOf("+++") == -1
                ? $(this).attr("INppicker")
                : $(this).attr("INppicker").split("+++")[0];
            var ppp =
              $(this).find("span.sp-peoplepicker-userSpan").attr("sid") ==
              undefined
                ? ""
                : SP.FieldUserValue.fromUser(
                    $(this).find("span.sp-peoplepicker-userSpan").attr("sid")
                  ); //.split('|').slice(-1)[0]
            Edit_Master_Details_Submit.g.oListItem.set_item(id, ppp);
          }
        } else if ($(this).attr("type") == "multipicker") {
          if ($(this).find("span.sp-peoplepicker-userSpan").length) {
            var id = $(this).attr("INppicker");
            var users = [];
            $("span.sp-peoplepicker-userSpan").each(function () {
              var ppp =
                $(this).attr("sid") == undefined
                  ? ""
                  : SP.FieldUserValue.fromUser(
                      $(this).attr("sid").split("|").slice(-1)[0]
                    );

              users.push(ppp);
            });
            Edit_Master_Details_Submit.g.oListItem.set_item(id, users);
          }
        } else if ($(this).attr("type") == "date") {
          if ($(this).val()) {
            var dateval = $(this).val().replace("-", "/");
            var ydate = !dateval
              ? ""
              : [dateval.slice(5, 10), dateval.slice(0, 4)]
                  .join("/")
                  .replace("-", "/");
            if (dateval)
              Edit_Master_Details_Submit.g.oListItem.set_item(
                $(this).attr("id"),
                ydate
              );
          } else {
            Edit_Master_Details_Submit.g.oListItem.set_item(
              $(this).attr("id"),
              null
            );
          }
        } else if ($(this).attr("type") == "radio") {
          var checkedvalue = $(
            'input[id="' + $(this).attr("id") + '"]:checked'
          ).val();
          Edit_Master_Details_Submit.g.oListItem.set_item(
            $(this).attr("id"),
            checkedvalue
          );
        } else if ($(this).attr("type") == "checkbox") {
          var checkedvalue = $(
            'input[id="' + $(this).attr("id") + '"]:checked'
          ).val();
          Edit_Master_Details_Submit.g.oListItem.set_item(
            $(this).attr("id"),
            true
          );
        } else if ($(this).attr("type") == "dropdown") {
          Edit_Master_Details_Submit.g.oListItem.set_item(
            $(this).attr("id"),
            $(this).val()
          );
        } else if ($(this).hasClass("percentagefield")) {
          Edit_Master_Details_Submit.g.oListItem.set_item(
            $(this).attr("id"),
            $(this).val() / 100
          );
        } else if ($(this).attr("type") == "multiselect") {
          // handle fieldTargetList to save the field in other list not master details list like delivrable in benifit in edit initiative
          var masterFieldTargetList = $(this).data("fieldtargetlist");

          if (masterFieldTargetList && masterFieldTargetList != "undefined") {
            // will loop on value on when update the values
          } else {
            var myselections = [];
            $(this)
              .find("input:checkbox:checked")
              .each(function () {
                myselections.push($(this).val());
              });
            myselections = myselections.join(":::");
            Edit_Master_Details_Submit.g.oListItem.set_item(
              $(this).attr("myfield"),
              myselections
            );
          }
        } else
          Edit_Master_Details_Submit.g.oListItem.set_item(
            $(this).attr("id"),
            $(this).val()
          );
      });

      if (listkey == "goalstrategy") {
        var type = $("#Types").val();
        if (type == "vision") {
          Edit_Master_Details_Submit.g.oListItem.set_item("Types", "program");
        } else if (
          type == "ministry" ||
          type == "sectorial" ||
          type == "lms" ||
          type == "sub"
        ) {
          Edit_Master_Details_Submit.g.oListItem.set_item("Types", "piller");
        }
      }

      Edit_Master_Details_Submit.g.oListItem.update();
      clientContext.load(Edit_Master_Details_Submit.g.oListItem);
    });

    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        countSuccessMaster++;

        // determinig folder directory
        if (USERisWF && workflowname == "Project") {
          BulkEdit(true);
        } else if (USERisWF && workflowname != "Project") {
          Continue_Submit_Field.init();
        } else {
          $(".errormsg").hide();
          $(".successmsg").show();
          $(".btn-save").addClass("success");

          if ( localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar") {
            alert("تم حفظ البيانات بنجاح");
            console.log('alert success')
        } else {
            alert("Data saved successfully");
        }

          if (listkey == "mainkpi") {
            // to update the kpi result list
            Edit_KPI_Results.init(
              kpiName,
              kpiType,
              kpiSector,
              kpiSubSector,
              kpiPortfolio,
              kpiMainGoalRelated,
              kpiSubGoalRelated,
              kpiPerformanceAnalysis,
              kpiRecurrenceChanged,
              kpicurrentYear,
              kpiTotalActual
            );
          } else if (listkey == "benefits") {
            // to update the kpi result list
            Edit_KPI_Results.init(
              kpiName,
              kpiType,
              kpiSector,
              kpiSubSector,
              kpiPortfolio,
              kpiMainGoalRelated,
              kpiSubGoalRelated,
              kpiPerformanceAnalysis,
              kpiRecurrenceChanged,
              kpicurrentYear,
              kpiTotalActual
            );
          } else {
            var fieldTargetListLength = $(
              ".Details-Item.EditItem ul[data-fieldtargetlist]"
            ).length;

            if (fieldTargetListLength > 0) {
              Field_MasterDetails_Data.init();
            } else {
              setTimeout(() => {
                window.location =
                  _spPageContextInfo.webAbsoluteUrl +
                  "/SitePages/View.aspx?ListKey=" +
                  listkey +
                  "&IID=" +
                  IID +
                  PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
              }, 1000);
            }
          }
        }
      }),
      Function.createDelegate(this, function (sender, args) {
        console.log(
          "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
        );
        // show pop up err msg
        // Error_PopUp.init()
        //
      })
    );
  },
  g: {},
};

// to get the data of  master details field in master details section like deliv in benifit in initiative edit for (multi select)
var Field_MasterDetails_Data = {
  init: function () {
    var masterFieldTargetList = "";

    $(".Details-Item.EditItem ul[data-fieldtargetlist]").each(function () {
      masterFieldTargetList = $(this).data("fieldtargetlist");
      var fieldmasterkey = $(this).data("fieldmasterkey");
      var fieldId = $(this).attr("id");

      var parentCode = "";
      if (PCODE) {
        parentCode = PCODE;
      } else if (ICODE) {
        parentCode = ICODE;
      } else if (STCODE) {
        parentCode = STCODE;
      }

      $(this)
        .find("input:checkbox:checked")
        .not(":disabled")
        .each(function (index) {
          var fieldMasterId = $(this)
            .closest(".Details-Item.EditItem")
            .data("id");

          if (countSuccessMaster == 1) {
            if (
              fieldTargetListInMaster.filter(
                (e) =>
                  e.masterId == fieldMasterId && e.fieldValue == $(this).val()
              )
            ) {
              fieldTargetListInMaster.push({
                targetList: masterFieldTargetList,
                fieldId: fieldId,
                fieldValue: $(this).val(),
                masterId: fieldMasterId,
                parentCode: parentCode,
                fieldmasterkey: fieldmasterkey,
              });
            }
          }
        });
    });

    var newItemMasterLength = $(
      ".Details-Item.NewItem ul[data-fieldtargetlist]"
    ).length;

    $(".Details-Item.NewItem ul[data-fieldtargetlist]").each(function () {
      masterFieldTargetList = $(this).data("fieldtargetlist");
      var fieldmasterkey = $(this).data("fieldmasterkey");
      var fieldId = $(this).attr("id");

      var parentCode = "";
      if (PCODE) {
        parentCode = PCODE;
      } else if (ICODE) {
        parentCode = ICODE;
      } else if (STCODE) {
        parentCode = STCODE;
      }

      // to get the correct master id if we add two section of master
      if (newItemMasterLength) {
        newItemMasterLength = newItemMasterLength - 1;
      }

      $(this)
        .find("input:checkbox:checked")
        .not(":disabled")
        .each(function (index) {
          var fieldMasterId = Number(masterIdWhenCreate) - newItemMasterLength;
          if (countSuccessMaster == 1) {
            if (
              fieldTargetListInMaster.filter(
                (e) =>
                  e.masterId == fieldMasterId && e.fieldValue == $(this).val()
              )
            ) {
              fieldTargetListInMaster.push({
                targetList: masterFieldTargetList,
                fieldId: fieldId,
                fieldValue: $(this).val(),
                masterId: fieldMasterId,
                parentCode: parentCode,
                fieldmasterkey: fieldmasterkey,
              });
            }
          }
        });
    });

    if (
      masterFieldTargetList &&
      masterFieldTargetList != "undefined" &&
      countSuccessMaster == 1
    ) {
      // countSuccessMaster put it one to invoke the Field_Master_Details only one time if we have multi sections of master details in form
      Field_Master_Details.init(fieldTargetListInMaster);
    }
  },
};

// submit master details field in master details section like deliv in benifit in initiative edit for (multi select)
var Field_Master_Details = {
  init: function (fieldTargetData) {
    if (fieldTargetData.length) {
      var clientContext = new SP.ClientContext.get_current();
      var CurrList, oList, valueSelection, code;

      CurrList = fieldTargetData[0].targetList;
      valueSelection = fieldTargetData[0].fieldValue;

      var oList = clientContext.get_web().get_lists().getByTitle(CurrList);

      var itemCreateInfo = new SP.ListItemCreationInformation();
      Field_Master_Details.g.oListItem = oList.addItem(itemCreateInfo);

      valueSelection = valueSelection.split("-");
      valueSelection = valueSelection[valueSelection.length - 1];

      var prt1 = fieldTargetData[0].fieldmasterkey
          .substring(0, 2)
          .toUpperCase(),
        prt2 = String(new Date().getFullYear()).slice(4 - 2),
        prt3 = fieldTargetData[0].masterId.toString().padStart(4, "0");

      code = prt1 + "-" + prt2 + "-" + prt3 + "-" + valueSelection;

      Field_Master_Details.g.oListItem.set_item("Title", code);

      // valueSelection.forEach(el => {
      Field_Master_Details.g.oListItem.set_item(
        fieldTargetData[0].fieldId,
        fieldTargetData[0].fieldValue
      );

      Field_Master_Details.g.oListItem.set_item(
        "MasterKey",
        fieldTargetData[0].fieldmasterkey
      );
      Field_Master_Details.g.oListItem.set_item(
        "MasterID",
        fieldTargetData[0].masterId
      );

      if (PCODE) {
        Field_Master_Details.g.oListItem.set_item(
          "ProjectCode",
          fieldTargetData[0].parentCode
        );
      } else if (ICODE) {
        Field_Master_Details.g.oListItem.set_item(
          "InitiativeCode",
          fieldTargetData[0].parentCode
        );
      } else if (STCODE) {
        Field_Master_Details.g.oListItem.set_item(
          "StrategicPartnershipCode",
          fieldTargetData[0].parentCode
        );
      }

      // New_Data_Submit.g.oListItem.set_item("MasterKey", "projects");
      // New_Data_Submit.g.oListItem.set_item("MasterID", relatedProjectId);

      // })

      Field_Master_Details.g.oListItem.update();
      clientContext.load(Field_Master_Details.g.oListItem);

      clientContext.executeQueryAsync(
        Function.createDelegate(this, function () {
          fieldTargetData.shift();
          Field_Master_Details.init(fieldTargetData);
        })
      );
    } else {
      window.location =
        _spPageContextInfo.webAbsoluteUrl +
        "/SitePages/View.aspx?ListKey=" +
        listkey +
        "&IID=" +
        IID +
        PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
    }
  },
  g: {},
};

//upload multiple files to specific folder with column assigning
function readFiles() {
  var filesUploaded = 0;
  for (var i = 0; i < fileCount; i++) {
    let file = Fileelements.files[i];
    var reader = new FileReader();
    reader._NAME = Fileelements.files[i].name;
    reader.onload = function (e) {
      let fileactualName = e.target._NAME;
      UploadFiles(e.target.result, fileactualName);
    };
    reader.onerror = function (e) {
      alert(e.target.error);
    };
    reader.readAsArrayBuffer(file);
  }
}

function UploadFiles(arrayBuffer, fileName) {
  //Get Client Context,Web and List object.
  var clientContext = new SP.ClientContext.get_current(); //new SP.ClientContext()
  var oWeb = clientContext.get_web();
  // console.log('folderdirectory', folderdirectory);
  var oList = oWeb.getFolderByServerRelativeUrl(folderdirectory);
  // oWeb.get_lists().getByTitle('Projects Documents');
  //Convert the file contents into base64 data
  var bytes = new Uint8Array(arrayBuffer);
  var i,
    length,
    out = "";
  for (i = 0, length = bytes.length; i < length; i += 1) {
    out += String.fromCharCode(bytes[i]);
  }
  var base64 = btoa(out);
  //Create FileCreationInformation object using the read file data
  var createInfo = new SP.FileCreationInformation();
  createInfo.set_content(base64);
  createInfo.set_url(fileName);
  //Add the file to the library
  var myFolder = oList.get_files().add(createInfo);
  var myListItem = myFolder.get_listItemAllFields();
  myListItem.set_item("ItemID", IID);
  if (PCODE) {
    myListItem.set_item("Title", listkey + "-" + PCODE);
  } else {
    myListItem.set_item("Title", listkey);
  }
  myListItem.update();
  //Load client context and execcute the batch
  clientContext.load(myFolder);
  clientContext.executeQueryAsync(UploadQuerySuccess, UploadQueryFailure);
}

function UploadQuerySuccess() {
  isuploaddone++;
  // console.log('File Uploaded Successfully.');
  if (fileCount == isuploaddone) {
    if (isEdit) {
      // if on edit page
      // Handle delegations - call API after saving to List (EDIT - with file upload)
      if (listkey == "delegations") {
        var delegationTitle = $("#Title").val();
        console.log("Calling delegation API after saving to List (EDIT - with file upload)");
        console.log("Delegation Title:", delegationTitle);
        if (delegationTitle) {
          $.ajax({
            url: `${APIURL}/delegation/delegateuser/${delegationTitle}`,
            method: "GET",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
              console.log("Delegation API called successfully:", response);
              $(".errormsg").hide();
              $(".successmsg").show();
              $(".btn-save").addClass("success");
              if (localStorage.getItem("lng") == null ||
                  localStorage.getItem("lng") == "ar") {
                alert("تم حفظ البيانات بنجاح");
              } else {
                alert("Data saved successfully");
              }
              window.location =
                _spPageContextInfo.webAbsoluteUrl +
                "/SitePages/Listing.aspx?ListKey=" +
                listkey +
                PCODE_STRING;
            },
            error: function (xhr, status, error) {
              console.error("Error calling delegation API:", error);
              $(".errormsg").hide();
              $(".successmsg").show();
              $(".btn-save").addClass("success");
              if (localStorage.getItem("lng") == null ||
                  localStorage.getItem("lng") == "ar") {
                alert("تم حفظ البيانات بنجاح");
              } else {
                alert("Data saved successfully");
              }
              window.location =
                _spPageContextInfo.webAbsoluteUrl +
                "/SitePages/Listing.aspx?ListKey=" +
                listkey +
                PCODE_STRING;
            }
          });
        } else {
          // If no title, proceed with normal redirect
          // For delegations, don't show alert here - it will be shown after API call
          if (listkey != "delegations") {
            $(".errormsg").hide();
            $(".successmsg").show();
            $(".btn-save").addClass("success");
            if ( localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar") {
              alert("تم حفظ البيانات بنجاح");
              console.log('alert success')
          } else {
              alert("Data saved successfully");
          }
          }
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/SitePages/View.aspx?ListKey=" +
            listkey +
            "&IID=" +
            IID +
            PCODE_STRING;
        }
      } else {
        // For delegations, don't show alert here - it will be shown after API call
        if (listkey != "delegations") {
          $(".errormsg").hide();
          $(".successmsg").show();
          $(".btn-save").addClass("success");
          if ( localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar") {
            alert("تم حفظ البيانات بنجاح");
            console.log('alert success')
        } else {
            alert("Data saved successfully");
        }
        }
        window.location =
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/View.aspx?ListKey=" +
          listkey +
          "&IID=" +
          IID +
          PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
      }
    } else if (listkey == "projects") {
      // if on new project page
      New_ProjectStages_Submit.init();
    } // if on new page other than project
    else {
      // Handle delegations - call API after saving to List (NEW - with file upload)
      if (listkey == "delegations") {
        // Reconstruct the generated Title/Code for delegations
        var prt1 = listkey.substring(0, 2).toUpperCase(),
          prt2 = String(new Date().getFullYear()).slice(4 - 2),
          prt3 = IID.toString().padStart(4, "0");
        var delegationCode = prt1 + "-" + prt2 + "-" + prt3;
        
        console.log("Calling delegation API after saving to List (NEW - with file upload)");
        console.log("Delegation Code:", delegationCode);
        
        // Call delegation API with generated Title
        $.ajax({
          url: `${APIURL}/delegation/delegateuser/${delegationCode}`,
          method: "GET",
          contentType: "application/json; charset=utf-8",
          success: function (response) {
            console.log("Delegation API called successfully:", response);
            $(".errormsg").hide();
            $(".successmsg").show();
            $(".btn-save").addClass("success");
            if (localStorage.getItem("lng") == null ||
                localStorage.getItem("lng") == "ar") {
              alert("تم حفظ البيانات بنجاح");
            } else {
              alert("Data saved successfully");
            }
            window.location =
              _spPageContextInfo.webAbsoluteUrl +
              "/SitePages/Listing.aspx?ListKey=" +
              listkey +
              PCODE_STRING;
          },
          error: function (xhr, status, error) {
            console.error("Error calling delegation API:", error);
            $(".errormsg").hide();
            $(".successmsg").show();
            $(".btn-save").addClass("success");
            if (localStorage.getItem("lng") == null ||
                localStorage.getItem("lng") == "ar") {
              alert("تم حفظ البيانات بنجاح");
            } else {
              alert("Data saved successfully");
            }
            window.location =
              _spPageContextInfo.webAbsoluteUrl +
              "/SitePages/Listing.aspx?ListKey=" +
              listkey +
              PCODE_STRING;
          }
        });
        return; // Exit early to prevent other logic from executing
      }
      if ($(".Details-Item.NewItem").length > 0) {
        //calling new master submit
        New_Data_Submit.g.checkNewMasterDetails();
      } else {
        $(".errormsg").hide();
        $(".successmsg").show();
        $(".btn-save").addClass("success");
        if ( localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar") {
          alert("تم حفظ البيانات بنجاح");
          console.log('alert success')
      } else {
          alert("Data saved successfully");
      }
        if (listkey == "projects") {
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/SitePages/View.aspx?ListKey=" +
            listkey +
            "&IID=" +
            IID +
            PCODE_STRING;
        } else {
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/SitePages/Listing.aspx?ListKey=" +
            listkey +
            PCODE_STRING;
        }
      }
    }
  }
}

function UploadQueryFailure(sender, args) {
  console.log("Request failed with error message - " + args.get_message());
  $(".CSformbuttons button").attr("disabled", false);
  $(".loading-wait").hide();
  if (args.get_message().indexOf("already exists") > -1) {
    $(".CSformbuttons").prepend(
      '<p class="errormsg">' +
        args.get_message().split("/").pop().split("It was")[0] +
        "</p>"
    );
  }
}
//new file upload
var isFirst_Upload = true;
window.files;
window.attachments = [];

window.filesPurpose = [];

function _uploadFile() {
  //

  // .section-container:not([data-target_list])

  $("input[type=file]").each(function (e) { 
    var docPurpose = $(this).data("docpurpose")
      ? $(this).data("docpurpose")
      : "";

    var checkParent = $(this).closest("[data-target_list]");

    var dataTargetList = "",
      isMaster = false;

    if (checkParent.length > 0) {
      dataTargetList = $(this)
        .closest("[data-target_list]")
        .data("target_list");
      isMaster = true;
    }

    console.log(dataTargetList, "dataTargetList");

    // var filesArr = document.querySelectorAll("#" + $(this).attr("id"))

    // filesArr.forEach(el => {
    // console.log(el, " inside filesArr EEEEEEEEEEEEE")
    //
    // var myfiles = el.files
    var myfiles = document.querySelector("#" + $(this).attr("id")).files;

    for (var i = 0; i < myfiles.length; i++) {
      const file = myfiles[i];
      const fileExtension = "" + file.name.split(".").pop();
      // get attribut
      if (acceptedExtensions.indexOf(fileExtension.toLowerCase()) > -1) {
        attachments.push(file);

        filesPurpose.push({
          name: file.name,
          purpose: docPurpose,
          dataTargetList: dataTargetList,
          isMaster: isMaster,
        });
      }
    }
    // })
  });

  // retrive file from INPUT
  files = attachments;
  // console.log('files', files);
  if (!files || files.length === 0) {
    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {
      alert("خطأ: اختر ملفًا");
    } else {
      alert("ERROR: Select a file");
    }
    return;
  }
  files = Array.prototype.slice.call(files);
  // read the files
  Promise.all(
    files.map(function (file) {
      return new Promise(function (prom_res, prom_rej) {
        // use fileReader
        var fileReader = new FileReader();
        fileReader.onloadend = function (e) {
          file.content = e.target.result;
          prom_res(file);
        };
        fileReader.onerror = function (e) {
          prom_rej(e.target.error);
        };
        fileReader.readAsArrayBuffer(file);
      });
    })
  ).then(function (files) { 
    // upload files
    return Promise.all(
      files.map(function (file, index) {
        //
        var Doc_Title = "";
        var ActualY = "ActualY";

        var purpose = filesPurpose[index].purpose;

        var checkMaster = filesPurpose[index].isMaster;
        var dataTargetList = filesPurpose[index].dataTargetList;

        if (
          checkMaster &&
          allNewMasterIdRelatedCodeArr.length &&
          isNew &&
          (listkey == "initiatives" || listkey == "projects")
        ) {
          var customquery =
            "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Title\" /><Value Type=\"Text\">" +
            allNewMasterIdRelatedCodeArr[0].code +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>";

          var getMasterList = allNewMasterIdRelatedCodeArr[0].CurrList;

          allNewMasterIdRelatedCodeArr.shift();

          sphttp.get(
            _spPageContextInfo.siteServerRelativeUrl,
            getMasterList,
            customquery,
            ["ID", "Title"],
            function (records, record, listItem, isDone) {
              if (isDone) { 
                records.forEach(function (el, index) {
                  var itemId = el.ID;

                  if (PCODE || ICODE) {
                    var code = PCODE ? PCODE : ICODE;

                    if (checkMaster && dataTargetList) {
                      dataTargetList = dataTargetList.toLowerCase();
                      Doc_Title = dataTargetList + "-" + code;
                      folderdirectory = code + "/" + dataTargetList;
                    } else {
                      Doc_Title = listkey + "-" + code;
                      folderdirectory = code + "/" + listkey;
                    }
                  }
                  if (isFirst_Upload) {
                    $("input#getFile")
                      .eq(0)
                      .closest(".fieldset-container")
                      .append(
                        '<div class="col-md-6 CFIELD upload-status" data-groups="">\
                <div class="upload-progress-parent">\
                    <div class="upload-progress bg-success"" style="width:0px"></div>\
                </div>\
                <p data-trans-fileuploading class="upload-name Resources"><span class="progress-file-name">"' +
                          file.name.replaceAll("�", "") +
                          '" </span><span class="upload-percent"></span></p>\
            </div>'
                      );
                  }

                  isFirst_Upload = false;
                  var fieldsObj = {};

                  fieldsObj = {
                    Title: Doc_Title,
                    ItemID: itemId,
                    docPurpose: purpose,
                  };

                  return $SP()
                    .list(Documents_Library)
                    .createFile({
                      content: file.content,
                      filename:
                        folderdirectory +
                        "/" +
                        new Date().toLocaleString().replaceAll("/", "-") +
                        "_-_sut_-_" +
                        file.name.replaceAll("�", ""),
                      fields: fieldsObj,
                      progress: function (perc) {
                        // console.log("Progress => ", perc + "%");
                        $(".upload-progress").css("width", perc + "%");
                        $(".upload-percent").text(" " + perc + "%");
                      },
                    })
                    .then(
                      function (file) {
                        isuploaddone++;
                        if (fileCount == isuploaddone) {
                          if (listkey == "projects") {
                            // if on new project page
                            New_ProjectStages_Submit.init();
                          } else if (listkey == "initiatives") {
                            $(".errormsg").hide();
                            $(".successmsg").show();
                            $(".btn-save").addClass("success");
                            if ( localStorage.getItem("lng") == null ||
                            localStorage.getItem("lng") == "ar") {
                              alert("تم حفظ البيانات بنجاح");
                              console.log('alert success')
                          } else {
                              alert("Data saved successfully");
                          }
                            window.location =
                              _spPageContextInfo.webAbsoluteUrl +
                              "/SitePages/initiativeHome.aspx?ICODE=" +
                              ICODE;
                          }
                        }
                        console.log("uplad maste attach");
                      },
                      function (error) {
                        $(".form-btns-wrapper").prepend(
                          '<p style="color:red"> Faild saving the Attachements</p>'
                        );
                        console.log("Error Uploading: ", error);
                      }
                    );
                });
              }
            }
          );
        }

        //continue as it is
        if (!checkMaster) {
          if (PCODE || ICODE) {
            var code = PCODE ? PCODE : ICODE;
            if (checkMaster && dataTargetList) {
              dataTargetList = dataTargetList.toLowerCase();
              Doc_Title = dataTargetList + "-" + code;
              folderdirectory = code + "/" + dataTargetList;
            } else {
              Doc_Title = listkey + "-" + code;
              folderdirectory = code + "/" + listkey;
            }
          } else if (STCODE) {
            var code = STCODE;
            Doc_Title = listkey + "-" + code;
          } else {
            Doc_Title = listkey;
          }
          if (isFirst_Upload) {
            $("input#getFile")
              .eq(0)
              .closest(".fieldset-container")
              .append(
                '<div class="col-md-6 CFIELD upload-status" data-groups="">\
                <div class="upload-progress-parent">\
                    <div class="upload-progress bg-success"" style="width:0px"></div>\
                </div>\
                <p data-trans-fileuploading class="upload-name Resources"><span class="progress-file-name">"' +
                  file.name.replaceAll("�", "") +
                  '" </span><span class="upload-percent"></span></p>\
            </div>'
              );
          }

          isFirst_Upload = false;
          var fieldsObj = {};
          if (isEdit && listkey == "mainkpi") {
            var kpiPeriodType = $("#PeriodType").val();
            mainKpiIsUpload = true;
            Edit_KPI_Results.init(
              kpiName,
              kpiType,
              kpiSector,
              kpiSubSector,
              kpiPortfolio,
              kpiMainGoalRelated,
              kpiSubGoalRelated,
              kpiPerformanceAnalysis,
              kpiRecurrenceChanged,
              kpicurrentYear,
              kpiTotalActual
            );
            if (kpiPeriodType == "monthly") {
              fieldsObj = {
                Title: Doc_Title,
                ItemID: IID,
                RelatedMonth: $("#Months").val(),
                RelatedYear: $("#Year").val(),
                docPurpose: purpose,
              };
            } else if (kpiPeriodType == "quarter") {
              fieldsObj = {
                Title: Doc_Title,
                ItemID: IID,
                RelatedQuarter: $("#Quarter").val(),
                RelatedYear: $("#Year").val(),
                docPurpose: purpose,
              };
            } else if (kpiPeriodType == "midterm") {
              fieldsObj = {
                Title: Doc_Title,
                ItemID: IID,
                RelatedMid: $("#Midterms").val(),
                RelatedYear: $("#Year").val(),
                docPurpose: purpose,
              };
            } else if (kpiPeriodType == "year") {
              fieldsObj = {
                Title: Doc_Title,
                ItemID: IID,
                RelatedActualY: ActualY,
                RelatedYear: $("#Year").val(),
                docPurpose: purpose,
              };
            }
          } else if (isEdit && listkey == "benefits") {
            var kpiPeriodType = $("#PeriodType").val();
            mainKpiIsUpload = true;
            Edit_KPI_Results.init(
              kpiName,
              kpiType,
              kpiSector,
              kpiSubSector,
              kpiPortfolio,
              kpiMainGoalRelated,
              kpiSubGoalRelated,
              kpiPerformanceAnalysis,
              kpiRecurrenceChanged,
              kpicurrentYear,
              kpiTotalActual
            );
            if (kpiPeriodType == "monthly") {
              fieldsObj = {
                Title: Doc_Title,
                ItemID: IID,
                RelatedMonth: $("#Months").val(),
                RelatedYear: $("#Year").val(),
                docPurpose: purpose,
              };
            } else if (kpiPeriodType == "quarter") {
              fieldsObj = {
                Title: Doc_Title,
                ItemID: IID,
                RelatedQuarter: $("#Quarter").val(),
                RelatedYear: $("#Year").val(),
                docPurpose: purpose,
              };
            } else if (kpiPeriodType == "midterm") {
              fieldsObj = {
                Title: Doc_Title,
                ItemID: IID,
                RelatedMid: $("#Midterms").val(),
                RelatedYear: $("#Year").val(),
                docPurpose: purpose,
              };
            } else if (kpiPeriodType == "year") {
              fieldsObj = {
                Title: Doc_Title,
                ItemID: IID,
                RelatedActualY: ActualY,
                RelatedYear: $("#Year").val(),
                docPurpose: purpose,
              };
            }
          } else {
            fieldsObj = {
              Title: Doc_Title,
              ItemID: IID,
              docPurpose: purpose,
            };
          }

          return $SP()
            .list(Documents_Library)
            .createFile({
              content: file.content,
              filename:
                folderdirectory +
                "/" +
                new Date().toLocaleString().replaceAll("/", "-") +
                "_-_sut_-_" +
                file.name.replaceAll("�", ""),
              fields: fieldsObj,
              progress: function (perc) {
                // console.log("Progress => ", perc + "%");
                $(".upload-progress").css("width", perc + "%");
                $(".upload-percent").text(" " + perc + "%");
              },
            })
            .then(
              function (file) {
                isuploaddone++;
                if (fileCount == isuploaddone) {

                  if (isEdit) {
                 //   debugger;
                    // if on edit page
                    $(".errormsg").hide();
                    $(".successmsg").show();
                    $(".btn-save").addClass("success");
                    if ( localStorage.getItem("lng") == null ||
                    localStorage.getItem("lng") == "ar") {
                      alert("تم حفظ البيانات بنجاح");
                      console.log('alert success')
                  } else {
                      alert("Data saved successfully");
                  }
                    // window.location = _spPageContextInfo.webAbsoluteUrl + '/SitePages/View.aspx?ListKey=' + listkey + '&IID=' + IID + PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
                    if ($(".Details-Item.NewItem").length > 0) {
                      //calling new master submit
                      New_Data_Submit.g.checkNewMasterDetails();
                    } else if (
                      $(".Details-Item.EditItem").length > 0 ||
                      (USERisWF && listkey == "projects" && USERisEdit)
                    ) {
                      Edit_Data_Submit.g.checkEditMasterDetails();
                    } else {
                      $(".btn-save").addClass("success");
                      if ( localStorage.getItem("lng") == null ||
                      localStorage.getItem("lng") == "ar") {
                        alert("تم حفظ البيانات بنجاح");
                        console.log('alert success')
                    } else {
                        alert("Data saved successfully");
                    }
                      if (listkey == "projects") {
                        getProjectInfoToUpdateEPM();
                        // window.location =
                        //   _spPageContextInfo.webAbsoluteUrl +
                        //   "/SitePages/View.aspx?ListKey=" +
                        //   listkey +
                        //   "&IID=" +
                        //   IID +
                        //   PCODE_STRING;
                      } else {
                        if (listkey == "mainkpi") {
                          // to update the kpi result list
                          mainKpiIsUpload = false
                          Edit_KPI_Results.init(
                            kpiName,
                            kpiType,
                            kpiSector,
                            kpiSubSector,
                            kpiPortfolio,
                            kpiMainGoalRelated,
                            kpiSubGoalRelated,
                            kpiPerformanceAnalysis.kpiRecurrenceChanged,
                            kpicurrentYear,
                            kpiTotalActual
                          );
                        } else if (listkey == "benefits") {
                          // to update the kpi result list
                          mainKpiIsUpload = false
                          Edit_KPI_Results.init(
                            kpiName,
                            kpiType,
                            kpiSector,
                            kpiSubSector,
                            kpiPortfolio,
                            kpiMainGoalRelated,
                            kpiSubGoalRelated,
                            kpiPerformanceAnalysis.kpiRecurrenceChanged,
                            kpicurrentYear,
                            kpiTotalActual
                          );
                        } else {
                          // If we asked to create a nested AFTER save, do it now and redirect to nested listing (or fallback to normal view)
                            if (window.pendingCreateNestedAfterSave) {
                              window.pendingCreateNestedAfterSave = false;
                              handlePartialDisbursementSave().then((created) => {
                                if (created) {
                                  nesteddeliverabledisCreated = true;
                                  window.location =
                                    _spPageContextInfo.webAbsoluteUrl +
                                    "/SitePages/Listing.aspx?ListKey=" +
                                    'nesteddeliverables' + PCODE_STRING;
                                } else {
                                  window.location =
                                    _spPageContextInfo.webAbsoluteUrl +
                                  "/SitePages/View.aspx?ListKey=" +
                                  listkey +
                                  "&IID=" +
                                  IID +
                                  PCODE_STRING;
                              }
                            });

                          } 
                          else if (nesteddeliverabledisCreated) {
                            // Optionally, redirect or show a success message here
                            window.location =
                              _spPageContextInfo.webAbsoluteUrl +
                              "/SitePages/Listing.aspx?ListKey=" +
                              'nesteddeliverables' + PCODE_STRING;
                          } else {
                            window.location =
                              _spPageContextInfo.webAbsoluteUrl +
                              "/SitePages/View.aspx?ListKey=" +
                              listkey +
                              "&IID=" +
                              IID +
                              PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
                          }
                        }
                        
                      }
                    }
                  } else if (listkey == "projects") {
                    // if on new project page
                    New_ProjectStages_Submit.init();
                  } else if (listkey == "initiatives") {
                    $(".errormsg").hide();
                    $(".successmsg").show();
                    $(".btn-save").addClass("success");
                    if ( localStorage.getItem("lng") == null ||
                    localStorage.getItem("lng") == "ar") {
                      alert("تم حفظ البيانات بنجاح");
                      console.log('alert success')
                  } else {
                      alert("Data saved successfully");
                  }
                    window.location =
                      _spPageContextInfo.webAbsoluteUrl +
                      "/SitePages/initiativeHome.aspx?ICODE=" +
                      ICODE;
                  } else if (listkey == "strategicpartnerships") {
                    $(".errormsg").hide();
                    $(".successmsg").show();
                    $(".btn-save").addClass("success");
                    if ( localStorage.getItem("lng") == null ||
                    localStorage.getItem("lng") == "ar") {
                      alert("تم حفظ البيانات بنجاح");
                      console.log('alert success')
                  } else {
                      alert("Data saved successfully");
                  }
                    window.location =
                      _spPageContextInfo.webAbsoluteUrl +
                      "/SitePages/Listing.aspx?ListKey=" +
                      listkey +
                      PCODE_STRING;
                  } // if on new page other than project
                  else {
                    if ($(".Details-Item.NewItem").length > 0) {
                      //calling new master submit
                      New_Data_Submit.g.checkNewMasterDetails();
                    } else {
                      // console.log('successful');
                      $(".errormsg").hide();
                      $(".successmsg").show();
                      $(".btn-save").addClass("success");
                      if ( localStorage.getItem("lng") == null ||
                      localStorage.getItem("lng") == "ar") {
                        alert("تم حفظ البيانات بنجاح");
                        console.log('alert success')
                    } else {
                        alert("Data saved successfully");
                    }
                      window.location =
                        _spPageContextInfo.webAbsoluteUrl +
                        "/SitePages/Listing.aspx?ListKey=" +
                        listkey +
                        PCODE_STRING;
                    }
                  }
                }
              },
              function (error) {
                $(".form-btns-wrapper").prepend(
                  '<p style="color:red"> Faild saving the Attachements</p>'
                );
                console.log("Error Uploading: ", error);
              }
            );
        }
      })
    );
  }).catch(function (error) {  console.error("Error in file processing:", error); });
}
//end file upload
//file delete
window.deleteFile = {
  init: function (fileurl) {
    var clientContext;
    var oWebsite;
    window.hreftodelete = fileurl;
    clientContext = new SP.ClientContext.get_current();
    oWebsite = clientContext.get_web();
    clientContext.load(oWebsite);
    clientContext.executeQueryAsync(function () {
      this.fileToDelete = oWebsite.getFileByServerRelativeUrl(hreftodelete);
      this.fileToDelete.deleteObject();

      clientContext.executeQueryAsync(
        Function.createDelegate(this, deleteFile.success),
        Function.createDelegate(this, deleteFile.error)
      );
    }, deleteFile.error);
  },
  success: function () {
    $('.File-Link[href="' + hreftodelete + '"]')
      .parent()
      .fadeOut();
    // console.log('File Deleted Successfully - ');
  },
  error: function (sender, args) {
    // console.log('Request failed with error message');
  },
};

//create folder on project creation
var createFolder = function (listTitle, folderUrl, success, error) {
  var ctx = SP.ClientContext.get_current();
  var list = ctx.get_web().get_lists().getByTitle(listTitle);
  var createFolderInternal = function (
    parentFolder,
    folderUrl,
    success,
    error
  ) {
    var ctx = parentFolder.get_context();
    var folderNames = folderUrl.split("/");
    var folderName = folderNames[0];
    var curFolder = parentFolder.get_folders().add(folderName);
    ctx.load(curFolder);
    ctx.executeQueryAsync(function () {
      if (folderNames.length > 1) {
        //    var subFolderUrl = folderNames.slice(1,folderNames.length).join('/');
        for (var i = 0; i < KeysFolders.length; i++) {
          createFolderInternal(curFolder, KeysFolders[i], success, error);
          if (i == KeysFolders.length - 1) {
            $("input[type=file]").each(function (e) {
              fileCount += document.querySelector("#" + $(this).attr("id"))
                .files.length;
            });

            if (fileCount) {
              // readFiles();

              _uploadFile();
            } else {
              $(".errormsg").hide();
              $(".successmsg").show();
              if (listkey == "initiatives") {
                setTimeout(function () {
                  // add setTimeOut to make sure that the folders created successfully on Initiative Document

                  window.location =
                    _spPageContextInfo.webAbsoluteUrl +
                    "/SitePages/initiativeHome.aspx?ICODE=" +
                    ICODE;
                }, 3000);

                // New_InitiativeStages_Submit.init()
              } else if (listkey == "strategicpartnerships") {
                setTimeout(function () {
                  // add setTimeOut to make sure that the folders created successfully on Initiative Document
                  window.location =
                    _spPageContextInfo.webAbsoluteUrl +
                    "/SitePages/StrategicPartnershipHome.aspx?STCODE=" +
                    STCODE;
                }, 3000);
              } else {
                New_ProjectStages_Submit.init();
              }
            }
          }
        }
        //    createFolderInternal(curFolder, subFolderUrl,success,error);
      }
      success(curFolder);
    }, error);
  };
  createFolderInternal(list.get_rootFolder(), folderUrl, success, error);
};
//end folder

// create stages for initiatives

// var New_InitiativeStages_Submit = {
//   init: function () {
//     var clientContext = new SP.ClientContext.get_current();
//     var oList = clientContext.get_web().get_lists().getByTitle("Initiative Stages");
//     for (var i = 0; i < Initiative_Stages_Data_Request.g.StagesArray.length; i++) {
//       var itemCreateInfo = new SP.ListItemCreationInformation();
//       New_InitiativeStages_Submit.g.oListItem = oList.addItem(itemCreateInfo);
//       New_InitiativeStages_Submit.g.oListItem.set_item("PhaseCode", Initiative_Stages_Data_Request.g.StagesArray[i].phase);
//       New_InitiativeStages_Submit.g.oListItem.set_item("StageCode", Initiative_Stages_Data_Request.g.StagesArray[i].stage);
//       New_InitiativeStages_Submit.g.oListItem.set_item("InitiativeCode", ICODE);
//       New_InitiativeStages_Submit.g.oListItem.update();
//       clientContext.load(New_InitiativeStages_Submit.g.oListItem);
//     }
//     clientContext.executeQueryAsync(
//       Function.createDelegate(this, function () {
//         window.location = _spPageContextInfo.webAbsoluteUrl + "/SitePages/initiativeHome.aspx?ICODE=" + ICODE
//       }),
//       Function.createDelegate(this, function (sender, args) {
//         console.log(
//           "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
//         );
//       })

//     )

//   },
//   g: {}
// }

//phases-stages - create stages for project
var New_ProjectStages_Submit = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("Project Stages");

    for (var i = 0; i < Stages_Data_Request.g.StagesArray.length; i++) {
      var itemCreateInfo = new SP.ListItemCreationInformation();
      New_ProjectStages_Submit.g.oListItem = oList.addItem(itemCreateInfo);
      New_ProjectStages_Submit.g.oListItem.set_item(
        "PhaseCode",
        Stages_Data_Request.g.StagesArray[i].phase
      );
      New_ProjectStages_Submit.g.oListItem.set_item(
        "StageCode",
        Stages_Data_Request.g.StagesArray[i].stage
      );

      New_ProjectStages_Submit.g.oListItem.set_item("ProjectCode", PCODE);
      New_ProjectStages_Submit.g.oListItem.update();
      clientContext.load(New_ProjectStages_Submit.g.oListItem);
    }
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        SP.SOD.registerSod(
          "PS.ProjectContext",
          SP.Utilities.Utility.getLayoutsPageUrl("ps.js")
        );
        SP.SOD.loadMultiple(["PS.ProjectContext"], CreateProject);
      }),
      Function.createDelegate(this, function (sender, args) {
        console.log(
          "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
        );
      })
    );
  },
  g: {
    clickbait: function () {
      $("button.btn-save").on("click", function () {
        New_ProjectStages_Submit.init();
      });
    },
    Cancel: function () {
      $("button.CSformCancel").on("click", function () {
        // window.history.back();
        window.location =
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/Listing.aspx?ListKey=" +
          listkey +
          PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
      });
    },
  },
};
//phases-stages end

//create in epm// Declare a global variable to store the project collection.
var projects;
// Ensure that the PS.js file is loaded before your custom code runs.
//SP.SOD.executeOrDelayUntilScriptLoaded(CreateProject, "PS.js");

// Add a project the projects collection.
function CreateProject() {
  // Initialize the current client context.
  console.log("before");

  var projContext = PS.ProjectContext.get_current();
  // Initialize a ProjectCreationInformation object and specify properties
  // for the new project.
  // The Name property is required and must be unique.
  var creationInfo = new PS.ProjectCreationInformation();
  window.PNAME = PCODE;
  creationInfo.set_name(PNAME);
  // Specify optional properties for the new project.
  // If not specified, the Start property uses the current date and the
  // EnterpriseProjectTypeId property uses the default EPT.
  creationInfo.set_description("Created through the JSOM.");
  //creationInfo.set_owner(userz);
  // var typeLand = $('select#Type_of_Land').val();
  var typeID;
  // if(typeLand == 'وزارة')
  //     typeID = '243c8ffa-01ec-e911-90ff-ccff373e57d4';
  // else
  typeID = "09fa52b4-059b-4527-926e-99f9be96437a";
  creationInfo.set_enterpriseProjectTypeId(typeID); //Ministry 243c8ffa-01ec-e911-90ff-ccff373e57d4
  // Get the projects collection.
  projects = projContext.get_projects();
  // Add the new project to the projects collection.
  projects.add(creationInfo);
  // Add a second project to use in the deleting projects procedure.
  //creationInfo.set_name("Test Project 2");
  //projects.add(creationInfo);
  // Submit the request to update the collection on the server
  var updateJob = projects.update();
  //projContext.waitForQueueAsync(updateJob, 10, GetProjects);

  projContext.waitForQueueAsync(
    updateJob,
    10,
    newFormUserCalls.get_AllResources
  );
}
// Get the projects collection.//get PGUID // Declare global variables.
var projContext;
var projects;
var GUIDS = [];
// Ensure that the PS.js file is loaded before your custom code runs.
//SP.SOD.executeOrDelayUntilScriptLoaded(GetProjects, "PS.js");

// Get the projects collection.
// function GetProjects() {
window.GetProjects = function () {
  // Initialize the current client context.
  console.log("GetProjects in");
  projContext = PS.ProjectContext.get_current();
  // Get the projects collection.
  projects = projContext.get_projects();
  // Register the request for information that you want to run on the server.
  // This call includes an optional "Include" parameter to request only the Name, Description,
  // StartDate, and Id properties of the projects in the collection.
  projContext.load(projects, "Include(Name, Id)"); //, Description, StartDate, Id, Owner
  // Run the request on the server.
  projContext.executeQueryAsync(IterateThroughProjects, QueryFailed);
};
// Iterate through the projects collection.
function IterateThroughProjects(response) {
  // Get the enumerator and iterate through the collection.

  console.log("IterateThroughProjects in");

  var enumerator = projects.getEnumerator();
  while (enumerator.moveNext()) {
    var project = enumerator.get_current();
    //  window.owner = project.get_owner();
    if (project.get_name() == PNAME) {
      window.PGUID = project.get_id()._m_guidString$p$0;
      Edit_PInfo_Submit.init();
    }

    //console.log(project);
    // console.log(project.get_name(), project.get_id(), project.get_owner());
    // if(project.get_name() == "OM0517011"){
    //     window.userz = project.get_owner()
    // }
    // GUIDS.push({
    //     PCODE: project.get_name(),
    //     PGUID: project.get_id().toString()
    // });
    // Create and populate a row with the values for the project's Name, Description,
    // StartDate, and Id properties.
    /*
    var row = tblProjects.insertRow();
    row.insertCell().innerText = project.get_name();
    row.insertCell().innerText = project.get_description();
    row.insertCell().innerText = project.get_startDate();
    row.insertCell().innerText = project.get_id();
    */
  }
  //GetDesc()
}

function QueryFailed(sender, args) {
  console.log("Request failed: " + args.get_message());
}
var projectowner,
  projectsponsor,
  projectDirectorUnit,
  projectObjectiveOwner,
  projectQualityOfficer,
  projectResponsible;

var Edit_PInfo_Submit = {
  preinit: function () {
    $(".container-body").addClass("was-validated");
    if ($(".was-validated .form-control:invalid").length == 0) {
      Edit_PInfo_Submit.init();
    } else {
      $(".CSformbuttons").append(
        '<p class="errormsg">Kindly check above fields</p>'
      );
      // console.log('check form for errors');
    }
  },
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(SP_ListName);
    //this.oListItem = oList.addItem(itemCreateInfo);
    Edit_PInfo_Submit.g.oListItem = oList.getItemById(IID); //declared inside object scope only
    // Edit_PInfo_Submit.g.oListItem.refreshLoad();//handle "Request failed. Version conflict." "owshiddenversion"

    clientContext.load(Edit_PInfo_Submit.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        Edit_PInfo_Submit.g.oListItem.set_item("ProjectGUID", PGUID);
        Edit_PInfo_Submit.g.oListItem.update();
        clientContext.executeQueryAsync(
          Function.createDelegate(this, function () {
            $(".errormsg").hide();
            $(".successmsg").show();
            $(".btn-save").addClass("success");
            if ( localStorage.getItem("lng") == null ||
  localStorage.getItem("lng") == "ar") {
              alert("تم حفظ البيانات بنجاح");
              console.log('alert success')
          } else {
              alert("Data saved successfully");
          }
            newprojectsubmitted = true;
            console.log("inside GUID");

            projectowner = Edit_PInfo_Submit.g.oListItem
              .get_item("ProjectOwner")
              .get_lookupValue();

            projectsponsor = Edit_PInfo_Submit.g.oListItem
              .get_item("ProjectSponsor")
              .get_lookupValue();

            projectDirectorUnit = Edit_PInfo_Submit.g.oListItem.get_item(
              "DirectorUnit"
            )
              ? Edit_PInfo_Submit.g.oListItem
                  .get_item("DirectorUnit")
                  .get_lookupValue()
              : "";
            projectObjectiveOwner = Edit_PInfo_Submit.g.oListItem.get_item(
              "ObjectiveOwner"
            )
              ? Edit_PInfo_Submit.g.oListItem
                  .get_item("ObjectiveOwner")
                  .get_lookupValue()
              : "";
            projectQualityOfficer = Edit_PInfo_Submit.g.oListItem.get_item(
              "QualityOfficer"
            )
              ? Edit_PInfo_Submit.g.oListItem
                  .get_item("QualityOfficer")
                  .get_lookupValue()
              : "";
            projectResponsible = Edit_PInfo_Submit.g.oListItem.get_item(
              "ProjectResponsible"
            )
              ? Edit_PInfo_Submit.g.oListItem
                  .get_item("ProjectResponsible")
                  .get_lookupValue()
              : "";

            buildTeamResourcesArr.push(projectowner);
            buildTeamResourcesArr.push(projectsponsor);
            buildTeamResourcesArr.push(projectDirectorUnit);
            buildTeamResourcesArr.push(projectObjectiveOwner);
            buildTeamResourcesArr.push(projectQualityOfficer);
            buildTeamResourcesArr.push(projectResponsible);
            //to be replaced
            InternalEntities_Request.preinit();

            // window.location = _spPageContextInfo.webAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=' + listkey + PCODE_STRING;

            // if (PGUID) {
            //   getUserId_Data_Request.init(); // prepair func to working on Project Server update Owner
            // }
          })
        );
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

var projectsection,
  projectdepartment,
  projectsector,
  ProjectSectorHead,
  ProjectSectionHead,
  ProjectDepartmentHead;

var Entitytype;
var InternalEntities_Request = {
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
      projectsector = $("#Sector").val();
      projectsection = $("#Section").val();
      projectdepartment = $("#SubSector").val();
      InternalEntities_Request.init();
    });
  },
  // The main Initialization function
  init: function () {
    //
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("Internal Entities");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      '<View><Query><Where><In><FieldRef Name="Title" /><Values><Value Type="Text">' +
        projectsector +
        '</Value><Value Type="Text">' +
        projectsection +
        '</Value><Value Type="Text">' +
        projectdepartment +
        "</Value></Values></In></Where></Query></View>"
    );
    InternalEntities_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(InternalEntities_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, InternalEntities_Request.onSuccess),
      Function.createDelegate(this, InternalEntities_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = InternalEntities_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    console.log("inside internal entity");

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Entitytype = oListItem.get_item("EntityType");
      if (Entitytype == "Sector") {
        ProjectSectorHead = oListItem.get_item("Owner").get_lookupValue();
      } else if (Entitytype == "Section") {
        ProjectSectionHead = oListItem.get_item("Owner").get_lookupValue();
      } else if (Entitytype == "Department") {
        ProjectDepartmentHead = oListItem.get_item("Owner").get_lookupValue();
      }
    }
    //
    buildTeamResourcesArr.push(ProjectSectorHead);
    buildTeamResourcesArr.push(ProjectSectionHead);
    buildTeamResourcesArr.push(ProjectDepartmentHead);
    ChangeProject();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {
    //for tasks functions
  },
};

var draftProject;
// Change the project's Build Team.
function ChangeProject() {
  //
  var project = projects.getById(PGUID);
  draftProject = project.checkOut();
  for (var i = 0; i < buildTeamResourcesArr.length; i++) {
    allResourcesArr.forEach((el) => {
      if (buildTeamResourcesArr[i] == el.Name) {
        var new_resource_id = el.Id;
        var new_resource = new PS.ProjectResourceCreationInformation();
        new_resource.set_name(buildTeamResourcesArr[i]);
        new_resource.set_id(new_resource_id);
        var project_resources_list = draftProject.get_projectResources();
        var project_resource = project_resources_list.add(new_resource);
        draftProject.get_projectResources().add(new_resource);
      }
    });
  }
  var publishJob = draftProject.update();
  console.log(PGUID, "User_ProjUID in new proj");

  // projContext.waitForQueueAsync(publishJob, 100, QueueJobSent); // comment and write a new function to change the owner on project center when create a project
  projContext.waitForQueueAsync(publishJob, 100, GetProjectsCreate);
}
///////////////////////////  work to change the owner on project center when create a project
function GetProjectsCreate() {
  projContext = PS.ProjectContext.get_current();
  projects = projContext.get_projects();
  projContext.load(projects, "Include(Name, Id)"); //, Description, StartDate, Id, Owner
  projContext.executeQueryAsync(ChangeProjectOwnerEpmCreateProj, QueryFailed);
}

function ChangeProjectOwnerEpmCreateProj() {
//  debugger;
  // change the owner on project center when create a project
  var project = projects.getById(PGUID);
  var draftProject = project.checkOut();
  var web = projContext.get_web();

  var projectManagerId = projectManagerPickedToProjectCenter.get_lookupId();
  var userPicked = web.getUserById(projectManagerId); //147

  draftProject.set_owner(userPicked);
  var publishJob = draftProject.publish(true);
  if(isEdit)
  {
    projContext.waitForQueueAsync(
      publishJob,
      100,
      QueueJobSent
    );
  }
  else
  {
  projContext.waitForQueueAsync(
    publishJob,
    100,
    QueueJobSentOwnerEpmCreateProj
  );
  }
}

function QueueJobSentOwnerEpmCreateProj(response) {
  window.location =
    _spPageContextInfo.siteAbsoluteUrl +
    "/SitePages/ProjectHome.aspx?PCODE=" +
    PNAME;
}


//////////////////////////

function QueueJobSent(response) {
  checkinProject.checkin();
}

var checkinProject = {
  checkin: function () {
    $.ajax({
      url:
        _spPageContextInfo.siteAbsoluteUrl +
        "/_api/ProjectServer/Projects('" +
        PGUID +
        "')/draft/publish(true)",
      method: "POST",
      contentType: "application/json;odata=verbose",
      headers: {
        Accept: "application/json; odata=verbose",
        "X-requestDigest": $("#__REQUESTDIGEST").val(),
        "X-HTTP-Method": "POST",
        "if-Match": "*",
      },
      success: function (data) {
        window.location =
          _spPageContextInfo.siteAbsoluteUrl +
          "/SitePages/ProjectHome.aspx?PCODE=" +
          PNAME;
      },
      error: function (data) {
        console.log("call failed", data);
      },
    });
  },
  g: {},
};

//*****edit task list when create new project */
window.NewProjectTask_Edit_Data = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Tasks");
    NewProjectTask_Edit_Data.g.oListItem = oList.getItemById(taskid); //declared inside object scope only
    NewProjectTask_Edit_Data.g.oListItem.set_item("Status", "Closed");
    NewProjectTask_Edit_Data.g.oListItem.set_item("WFInstanceID", null);
    NewProjectTask_Edit_Data.g.oListItem.update();
    clientContext.load(NewProjectTask_Edit_Data.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        New_Data_Submit.preinit();
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

//** Edit field from other list
window.Edit_Item_Field = {
  init: function (ListName, columnName, columnValue, field, value) {
    window.columntoEdit = columnName;
    window.columntoEditValue = columnValue;
    var context = SP.ClientContext.get_current();
    var dfd = $.Deferred();
    //Get list from host web
    var programList = context.get_web().get_lists().getByTitle(ListName);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      '<View><Query><Where><Eq><FieldRef Name="' +
        field +
        '" /> <Value Type="Text">' +
        value +
        "</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>"
    );
    //Get items by Query
    var progColl = programList.getItems(camlQuery);
    //Load item collection
    context.load(progColl);
    context.executeQueryAsync(
      function () {
        var currentItemArray = [];
        //Check itemcollection count greater than 0
        if (progColl.get_count() > 0) {
          var progEnum = progColl.getEnumerator();
          while (progEnum.moveNext()) {
            var currentItem = progEnum.get_current();
            var currentId = currentItem.get_item("ID");

            //Get Item by current ID
            var items = programList.getItemById(currentId);
            items.set_item(columntoEdit, columntoEditValue);
            //Update the item
            items.update();
            //Push item on the array
            currentItemArray.push(items);
            //Load the item Array
            context.load(currentItemArray[currentItemArray.length - 1]);
          }
          context.executeQueryAsync(
            function () {
              //Item Updated sucess
              // Edit_Item_Field.init('Ideas', 'Stage', 'IdeaStage04', 'Title', IdeaId);
              dfd.resolve();
            },
            function (sender, args) {
              //Item updated fail
              console.log(
                "Request Failed to get projectlist Items :" + args.get_message()
              );
            }
          );
        } else {
          dfd.resolve();
        }
      },
      function (sender, args) {
        console.log("Request failed in List " + args.get_message());
      }
    );
    return dfd.promise();
  },
};

// Archived integration submit
window.Archive_Data_Submit = {
  preinit: function () {},
  init: function (RqUID, resId, itemId) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("IntegrationArchive");
    var itemCreateInfo = new SP.ListItemCreationInformation();
    Archive_Data_Submit.g.oListItem = oList.addItem(itemCreateInfo);

    $(
      ".section-container:not([data-target_list]) .CFIELD> input[type=text], .section-container:not([data-target_list]) .CFIELD> input[type=number], .section-container:not([data-target_list]) .CFIELD> input[type=float], .section-container:not([data-target_list]) .CFIELD>  input[type=date],.section-container:not([data-target_list]) .CFIELD> .datetimeinputs input[type=date],.section-container:not([data-target_list]) .CFIELD> .datetimeinputs input[type=datetime-local],.section-container:not([data-target_list]) .CFIELD> input[type=radio], .section-container:not([data-target_list]) .CFIELD> input[type=checkbox], .section-container:not([data-target_list]) .CFIELD> div[type=picker], .section-container:not([data-target_list]) .CFIELD> select[type=dropdown], .section-container:not([data-target_list]) .CFIELD>  textarea, .section-container:not([data-target_list]) .CFIELD > .multiselect-container"
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
                Archive_Data_Submit.g.oListItem.set_item(
                  $(this).attr("id"),
                  ydate
                );
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
                Archive_Data_Submit.g.oListItem.set_item(
                  $(this).attr("id"),
                  ydate
                );
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
              Archive_Data_Submit.g.oListItem.set_item(
                $(this).attr("id"),
                $(this).val()
              );
            }
          }
        } else if (listkey == "initiativecards" && ICODE) {
          if (id == "SubSector") {
            var val = $(this).val();
            if (val) {
              Archive_Data_Submit.g.oListItem.set_item(
                $(this).attr("id"),
                $(this).val()
              );
            }
          }
        }
      } else if ($(this).attr("type") == "picker") {
      } else if ($(this).attr("type") == "multipicker") {
      } else if ($(this).attr("type") == "radio") {
        var id = $(this).attr("id");
        if (listkey == "projectcharter" && PCODE) {
          if (id == "NTP") {
            var checkedvalue = $(
              'input[id="' + $(this).attr("id") + '"]:checked'
            ).val();
            if (checkedvalue == "yes") {
              Archive_Data_Submit.g.oListItem.set_item(
                $(this).attr("id"),
                "yes"
              );
            } else if (checkedvalue == "no") {
              Archive_Data_Submit.g.oListItem.set_item(
                $(this).attr("id"),
                "no"
              );
            } else {
              Archive_Data_Submit.g.oListItem.set_item(
                $(this).attr("id"),
                checkedvalue
              );
            }
          }
        }
      } else {
        var id = $(this).attr("id");
        if (listkey == "projectcharter" && PCODE) {
          if (
            id == "Title" ||
            id == "Name" ||
            id == "Description" ||
            id == "ScopeOfWork" ||
            id == "ActualCostWorkCompleted"
          ) {
            Archive_Data_Submit.g.oListItem.set_item(
              $(this).attr("id"),
              $(this).val()
            );
          }
        } else if (listkey == "initiativecards" && ICODE) {
          if (
            id == "Title" ||
            id == "Name" ||
            id == "Description" ||
            id == "ProgramTotalCost" ||
            id == "Expenditures" ||
            id == "ActualCost"
          ) {
            Archive_Data_Submit.g.oListItem.set_item(
              $(this).attr("id"),
              $(this).val()
            );
          }
        }
      }
    });

    if (
      (listkey == "projectcharter" && PCODE) ||
      (listkey == "initiativecards" && ICODE)
    ) {
      Archive_Data_Submit.g.oListItem.set_item("RqUID", RqUID);
      Archive_Data_Submit.g.oListItem.set_item("ResponseId", resId);
      Archive_Data_Submit.g.oListItem.set_item("RelatedItemId", itemId);
    }
    Archive_Data_Submit.g.oListItem.update();
    clientContext.load(Archive_Data_Submit.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        console.log("SAVEED SUCCESSFULLY");
        $(".integration-save").addClass("success");
      }),
      Function.createDelegate(this, function (sender, args) {
        var errormessage =
          "Request failed. " +
          args.get_message() +
          "\n" +
          args.get_stackTrace();

        console.log(errormessage);
      })
    );
  },
  g: {},
};

//

function getProjectInfoToUpdateEPM() {
  var context = SP.ClientContext.get_current();
  var dfd = $.Deferred();
  //Get list from host web
  var programList = context.get_web().get_lists().getByTitle("Projects");
  var camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(
    "<View><Query><Where><Eq><FieldRef Name='Title'/><Value Type='Text'>" +
      PCODE +
      "</Value></Eq></Where></Query></View>"
  );
  //Get items by Query
  var progColl = programList.getItems(camlQuery);
  //Load item collection
  context.load(progColl);
  context.executeQueryAsync(function () {
    var currentItemArray = [];
    if (progColl.get_count() > 0) {
      var progEnum = progColl.getEnumerator();
      while (progEnum.moveNext()) {
        var currentItem = progEnum.get_current();
        var projectOwnerPicker = currentItem.get_item("ProjectOwner")
          ? currentItem.get_item("ProjectOwner")
          : "";
        projectManagerPickerToEpm = currentItem.get_item("ProjectManager")
          ? currentItem.get_item("ProjectManager")
          : "";
        var projectSponsorPicker = currentItem.get_item("ProjectSponsor")
          ? currentItem.get_item("ProjectSponsor")
          : "";
        // var projectDirectorUnit = currentItem.get_item("DirectorUnit") ? currentItem.get_item("DirectorUnit") : ''
        // var projectObjectiveOwner = currentItem.get_item("ObjectiveOwner") ? currentItem.get_item("ObjectiveOwner") : ''
        // var projectResponsible = currentItem.get_item("ProjectResponsible") ? currentItem.get_item("ProjectResponsible") : ''
        // var projectQualityOfficer = currentItem.get_item("QualityOfficer") ? currentItem.get_item("QualityOfficer") : ''
      }
      
      if (
        projectOwnerPicker &&
        !projectBuildTeamArr.includes(projectOwnerPicker.get_lookupValue())
      ) {
        projectBuildTeamArr.push(projectOwnerPicker.get_lookupValue());
      }

      if (
        projectSponsorPicker &&
        !projectBuildTeamArr.includes(projectSponsorPicker.get_lookupValue())
      ) {
        projectBuildTeamArr.push(projectSponsorPicker.get_lookupValue());
      }
      if (
        projectDirectorUnit &&
        !projectBuildTeamArr.includes(projectDirectorUnit.get_lookupValue())
      ) {
        projectBuildTeamArr.push(projectDirectorUnit.get_lookupValue());
      }

      if (
        projectObjectiveOwner &&
        !projectBuildTeamArr.includes(projectObjectiveOwner.get_lookupValue())
      ) {
        projectBuildTeamArr.push(projectObjectiveOwner.get_lookupValue());
      }

      if (
        projectResponsible &&
        !projectBuildTeamArr.includes(projectResponsible.get_lookupValue())
      ) {
        projectBuildTeamArr.push(projectResponsible.get_lookupValue());
      }

      if (
        projectQualityOfficer &&
        !projectBuildTeamArr.includes(projectQualityOfficer.get_lookupValue())
      ) {
        projectBuildTeamArr.push(projectQualityOfficer.get_lookupValue());
      }

      context.executeQueryAsync(
        function () {
          Update_Project_Center.getAllResources();
        },
        function (sender, args) {
          //Item updated fail
          console.log(
            "Request Failed to get projectlist Items :" + args.get_message()
          );
        }
      );
    }
  });
}

var Update_Project_Center = {
  getAllResources: function () {
    $.ajax({
      url:
        _spPageContextInfo.webAbsoluteUrl +
        "/_api/ProjectServer/EnterpriseResources",
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (data) {
        allEnterpriseResources = data.d.results;

        SP.SOD.registerSod(
          "PS.ProjectContext",
          SP.Utilities.Utility.getLayoutsPageUrl("ps.js")
        );
        SP.SOD.loadMultiple(["PS.ProjectContext"], EPMProjectToUpdate);
      },
    });
  },
};

var editProjectContext = "",
  epmProjects,
  deleteProjectContext = "";

function EPMProjectToUpdate() {
  editProjectContext = PS.ProjectContext.get_current();
  epmProjects = editProjectContext.get_projects();
  editProjectContext.load(epmProjects, "Include(Name, Id)");
  // editProjectContext.executeQueryAsync(EPMProjectEdit, QueryFailedCenter);
  editProjectContext.executeQueryAsync(
    delete_resources.preinit,
    QueryFailedCenter
  );
}

var ResourcesEnterprise = "";
var resourcesArrDelete = [];
var globresArr = [];
var delete_resources = {
  preinit: function () {
    SP.SOD.registerSod(
      "PS.ProjectContext",
      SP.Utilities.Utility.getLayoutsPageUrl("ps.js")
    );
    SP.SOD.loadMultiple(["PS.ProjectContext"], delete_resources.init);
  },
  init: function () {
    deleteProjectContext = PS.ProjectContext.get_current();
    var oProjects = deleteProjectContext.get_projects();
    delete_resources.g.oProjectsItem = oProjects.getById(User_ProjUID); //declared inside object scope only

    ResourcesEnterprise = delete_resources.g.oProjectsItem.checkOut();

    delete_resources.g.testDuration =
      ResourcesEnterprise.get_projectResources();

    deleteProjectContext.load(delete_resources.g.testDuration);

    // deleteProjectContext.load(delete_resources.g.oProjectsItem);
    deleteProjectContext.executeQueryAsync(
      Function.createDelegate(this, delete_resources.onSuccess),
      Function.createDelegate(this, delete_resources.onError)
    );
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  onSuccess: function (sender, args) {
    resourcesArrDelete = delete_resources.g.testDuration.get_data();

    Promise.all(
      resourcesArrDelete.map(function (item) {
        globresArr.push(item);
        console.log(item.get_name(), "item");
      })
    )
      .then(function (files) {
        delete_resourcesForupdate.init();
      })
      .catch(function (err) {});

    // for (var i = 0; i < resourcesArrDelete.length; i++) {
    //   resourcesArrDelete[i].deleteObject()
    // }

    // var checkinJobd = ResourcesEnterprise

    // SP.SOD.registerSod('PS.ProjectContext', SP.Utilities.Utility.getLayoutsPageUrl('ps.js'));
    // SP.SOD.loadMultiple(['PS.ProjectContext'], delete_resourcesForupdate.init);

    // setTimeout(function(){
    //   delete_resourcesForupdate.init()
    // },3000)
    // deleteProjectContext.waitForQueueAsync(1000, delete_resourcesForupdate.init);
  },
  // Global variables
  g: {},
};

var delete_resourcesForupdate = {
  init: function () {
    deleteProjectContext.executeQueryAsync(
      Function.createDelegate(this, delete_resourcesForupdate.onSuccess),
      Function.createDelegate(this, delete_resourcesForupdate.onError)
    );
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  onSuccess: async function (sender, args) {
    for (var i = 0; i < globresArr.length; i++) {
      globresArr[i].deleteObject();
    }

    var checkinJob = ResourcesEnterprise.update();

    deleteProjectContext.waitForQueueAsync(checkinJob, 100, EPMProjectEdit);
  },
};

function QueryFailedCenter(sender, args) {
  console.log("Request failed: " + args.get_message());
}

function EPMProjectEdit() {
  //
  var draftProject;
  var project = epmProjects.getById(User_ProjUID); //User_ProjUID it's the GUID for Project
  draftProject = project.checkOut();

  for (var i = 0; i < projectBuildTeamArr.length; i++) {
    allEnterpriseResources.forEach((el) => {
      if (projectBuildTeamArr[i] == el.Name) {
        var new_resource_id = el.Id;
        var new_resource = new PS.ProjectResourceCreationInformation();
        new_resource.set_name(projectBuildTeamArr[i]);
        new_resource.set_id(new_resource_id);
        var project_resources_list = draftProject.get_projectResources();

        var project_resource = project_resources_list.add(new_resource);
        draftProject.get_projectResources().add(new_resource);
      }
    });
  }
  var publishJob = draftProject.update();
  editProjectContext.waitForQueueAsync(publishJob, 100, ChangeProjectOwnerEpm);
}

function ChangeProjectOwnerEpm() {
  var project = epmProjects.getById(User_ProjUID);
  var draftProject = project.checkOut();
  var web = editProjectContext.get_web();
  var projectManagerId = projectManagerPickerToEpm.get_lookupId();
  var userPicked = web.getUserById(projectManagerId); //76

  draftProject.set_owner(userPicked);
  var publishJob = draftProject.publish(true);
  // $('.wfLoader').hide();

  editProjectContext.waitForQueueAsync(publishJob, 100, QueueJobSentOwnerEpm);
}

function QueueJobSentOwnerEpm(response) {
  window.location =
    _spPageContextInfo.webAbsoluteUrl +
    "/SitePages/View.aspx?ListKey=" +
    listkey +
    "&IID=" +
    IID +
    PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
}



var checkinProjectEditSubmit = {
  // create this function to check in the project on project center before edit on project
  checkin: function (ProjGuid) {
    $.ajax({
      url:
        _spPageContextInfo.siteAbsoluteUrl +
        "/_api/ProjectServer/Projects('" +
        ProjGuid +
        "')/draft/checkIn(true)",
      method: "POST",
      contentType: "application/json;odata=verbose",
      headers: {
        Accept: "application/json; odata=verbose",
        "X-requestDigest": $("#__REQUESTDIGEST").val(),
        "X-HTTP-Method": "POST",
        "if-Match": "*",
      },
      success: function (data) {
        console.log("Project checked in successfully");
        // window.location =
        //   _spPageContextInfo.siteAbsoluteUrl +
        //   "/SitePages/ProjectHome.aspx?PCODE=" +
        //   PNAME;
      },
      error: function (data) {
        console.log("call failed", data);
      },
    });
  },
  g: {},
};

