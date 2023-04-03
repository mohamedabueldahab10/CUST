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
var projectManagerPickedToProjectCenter = '';

var kpiName = '', kpiType = '', kpiSector = '', kpiSubSector = '', kpiMainGoalRelated = '', kpiSubGoalRelated = '', kpiPortfolio = '', kpiPerformanceAnalysis = '', kpiYearPicked = '', kpiMidPicked = '', kpiQuarterPicked = '', kpiMonthPicked = '', kpiPeriodTypeUpdate = '', kpiRecurrenceChanged = '';

var allEnterpriseResources = [], projectBuildTeamArr = [], projectManagerPickerToEpm;

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
var kpiResultsArr = []


// to handle BenefitMetric Results list
var benefitMetricsArr = []

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
      userCalls.isMember("PMO Team", portfoliomanagername, 'Manager');
    }
    if (
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
      var kpiownername = encodeURIComponent(
        kpiowner.get_lookupValue()
      );
      membersGroupCheckArray.push({
        groupName: "KPI Owners",
        userLoginName: kpiownername,
        fieldID: 'Owner'
      })
    }
    if (
      listkey == "mainkpi" &&
      $("#PerformanceLeader").find("span.sp-peoplepicker-userSpan").attr("sid")
    ) {
      pickerValidationDone = true;
      isCheckMember = true;
      var perforrmanceleader =
        $("#PerformanceLeader").find("span.sp-peoplepicker-userSpan").attr("sid") ==
          undefined
          ? ""
          : SP.FieldUserValue.fromUser(
            $("#PerformanceLeader").find("span.sp-peoplepicker-userSpan").attr("sid")
          );
      var perforrmanceleadername = encodeURIComponent(
        perforrmanceleader.get_lookupValue()
      );
      membersGroupCheckArray.push({
        groupName: "Performance Leaders",
        userLoginName: perforrmanceleadername,
        fieldID: 'PerformanceLeader'
      })
    }
    if (
      listkey == "mainkpi" &&
      $("#PerformanceLeader2").find("span.sp-peoplepicker-userSpan").attr("sid")
    ) {
      pickerValidationDone = true;
      isCheckMember = true;
      var perforrmanceleader =
        $("#PerformanceLeader2").find("span.sp-peoplepicker-userSpan").attr("sid") ==
          undefined
          ? ""
          : SP.FieldUserValue.fromUser(
            $("#PerformanceLeader2").find("span.sp-peoplepicker-userSpan").attr("sid")
          );
      var perforrmanceleadername = encodeURIComponent(
        perforrmanceleader.get_lookupValue()
      );
      membersGroupCheckArray.push({
        groupName: "Performance Leaders",
        userLoginName: perforrmanceleadername,
        fieldID: 'PerformanceLeader2'
      })
    }
    // membersGroupCheckArray.length > 0 ? userCalls.isMember(membersGroupCheckArray[0].groupName, membersGroupCheckArray[0].userLoginName, membersGroupCheckArray[0].fieldID) : '';
    var pickervalid = true; //check required people picker
    var multiSelectValid = true
    $("[type=picker][required]").each(function () {
      if ($(this).find("span.sp-peoplepicker-userSpan").length == 0) {
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
      if ($(this).find("span.sp-peoplepicker-userSpan").attr('aria-invalid') == 'true') {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
      }

      if ($(this).find('span.ms-formvalidation.sp-peoplepicker-errorMsg').length) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
      }
    })


    //////////
    $("[type=multipicker][required]").each(function () {
      if ($(this).find("span.sp-peoplepicker-userSpan").length == 0 && ($(this).attr('data-email') == enternameemail)) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
        // return false;
      } else if ($(this).find("span.sp-peoplepicker-userSpan").length == 0 && !$(this).attr('data-email')) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
      } else {
        $(this).removeClass("picker-error");
        $(this).addClass("picker-valid");
      }
    });

    $("[type=multipicker]").each(function () {
      if ($(this).find("span.sp-peoplepicker-userSpan").attr('aria-invalid') == 'true') {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
      }
    })

    if ($(".was-validated .form-control:invalid").length == 0 && pickervalid) {
      membersGroupCheckArray.length > 0 ? userCalls.isMember(membersGroupCheckArray[0].groupName, membersGroupCheckArray[0].userLoginName, membersGroupCheckArray[0].fieldID) : '';
    }


    // to show the err msg in fields
    if ($(".was-validated .CFIELD:not(.even-required) .form-control").length > 0) {

      $(".was-validated .form-control:invalid").each(function () {
        $(this).siblings('.errMsgField').show();
      })
    }
    //validation of multiselect
    $('.dropdown-menu.multiselect_scroll.required').each(function () {
      if ($(this).length) {
        if ($('.dropdown-menu.multiselect_scroll.required :checkbox:checked').length == 0) {
          multiSelectValid = false
          $('.dropdown-menu.multiselect_scroll.required').parent().parent().siblings('.errMsgField').show()
        } else {
          multiSelectValid = true
        }
      }
    })



    changeResources();


    if (
      $(".was-validated .form-control:invalid").length == 0 &&
      pickervalid &&
      !isCheckMember &&
      multiSelectValid
    ) {
      New_Data_Submit.init();
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
        if (listkey == 'sos') { // because we use mult field picker
          $scrollTo = $("[type=multipicker][required]");
        } else {
          $scrollTo = $("[type=picker][required]");
        }
      }
      $container.animate({
        scrollTop:
          $scrollTo.offset().top -
          $container.offset().top +
          $container.scrollTop() -
          120,
      });
    }
  },
  init: function () {
    $(".btn-save").attr("disabled", true);
    $("#preloader,#formloader").css("display", "block");
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(SP_ListName);
    var itemCreateInfo = new SP.ListItemCreationInformation();
    New_Data_Submit.g.oListItem = oList.addItem(itemCreateInfo);
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
             .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)> textarea,
              .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field) > .multiselect-container`
    ).each(function () {
      if ($(this).attr("type") == "picker") {
        if ($(this).find("span.sp-peoplepicker-userSpan").length) {
          var id = $(this).attr("INppicker");
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
          New_Data_Submit.g.oListItem.set_item(id, ppp);
        } else if (
          ($(this).attr("id") == "ProjectOwner" && listkey == "projects") ||
          ($(this).attr("id") == "MitigationOwner" && listkey == "risks")
        ) {
          var ppp = SP.FieldUserValue.fromUser(UserN.LoginName.split("|")[1]);
          New_Data_Submit.g.oListItem.set_item($(this).attr("id"), ppp);
        }
      } else if ($(this).attr("type") == "multipicker") {
        if ($(this).find("span.sp-peoplepicker-userSpan").length) {
          var id = $(this).attr("INppicker");
          var users = [];
          $("span.sp-peoplepicker-userSpan").each(function () {
            var ppp =
              $(this).attr("sid") ==
                undefined
                ? ""
                : SP.FieldUserValue.fromUser(
                  $(this).attr("sid").split("|").slice(-1)[0]
                );

            console.log('aaaa', ppp);
            users.push(ppp)
          })
          New_Data_Submit.g.oListItem.set_item(id, users);
        }
      }
      else if ($(this).attr("type") == "date") {
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
            New_Data_Submit.g.oListItem.set_item($(this).attr("id"), ydate);
        } else {
          var dateval = $(this).val().replace("-", "/");
          var ydate = !dateval
            ? ""
            : [dateval.slice(5, 10), dateval.slice(0, 4)]
              .join("/")
              .replace("-", "/");
          if (dateval)
            New_Data_Submit.g.oListItem.set_item($(this).attr("id"), ydate);
        }
      } else if ($(this).attr("type") == "datetime-local") {
        if ($(this).hasClass("withTime")) {
          var dateval = $(this).val();
          var datetime = new Date(dateval);
          console.log("datetime", datetime);
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
            New_Data_Submit.g.oListItem.set_item($(this).attr("id"), ydate);
        }
      } else if ($(this).attr("type") == "radio") {
        var checkedvalue = $(
          'input[id="' + $(this).attr("id") + '"]:checked'
        ).val();
        if (checkedvalue == "yes") {
          New_Data_Submit.g.oListItem.set_item($(this).attr("id"), "yes");
        } else if (checkedvalue == "no") {
          New_Data_Submit.g.oListItem.set_item($(this).attr("id"), "no");
        } else
          New_Data_Submit.g.oListItem.set_item(
            $(this).attr("id"),
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
          New_Data_Submit.g.oListItem.set_item($(this).attr("id"), true);
        else New_Data_Submit.g.oListItem.set_item($(this).attr("id"), false);
      } else if ($(this).attr("type") == "dropdown") {
        New_Data_Submit.g.oListItem.set_item($(this).attr("id"), $(this).val());
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

        let otherFieldsJSON = eval($(this).find("option:checked").data("otherfields"));

        if (otherFieldsJSON && otherFieldsJSON != 'undefined' && otherFieldsJSON.length) {
          otherFieldsJSON.forEach(el => {
            New_Data_Submit.g.oListItem.set_item(el.fieldName, el.value);
          })
        }


      } else if ($(this).hasClass("percentagefield")) {
        New_Data_Submit.g.oListItem.set_item(
          $(this).attr("id"),
          $(this).val() / 100
        );
      } else if ($(this).attr("type") == "multiselect") {
        var myselections = [];
        $(this).find("input:checkbox:checked").each(function () {
          myselections.push($(this).val());

        });


        myselections = myselections.join(':::');
        New_Data_Submit.g.oListItem.set_item($(this).attr('myfield'), myselections);
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
        New_Data_Submit.g.oListItem.set_item($(this).attr("id"), $(this).val());
    });


    //to handle the for default value submittion
    $(`[data-formdefaultvalue]`).each(function (index) {

      var parsingData = eval($(this).data('formdefaultvalue'))
      console.log(parsingData, "parsingData")
      // var listColumnName = parsingData[index].fieldName;
      // var listColumnValue = parsingData[index].value;
      // var allowToRole = parsingData[index].roles;
      parsingData.forEach(el => {
        if (el.roles.includes("allRoles")) {
          New_Data_Submit.g.oListItem.set_item(el.fieldName, el.value);
        } else if (el.roles.includes(currentUserRole)) {
          New_Data_Submit.g.oListItem.set_item(el.fieldName, el.value);
        }
      })
    })
    //

    // to handle set data based on parent values and current list condition
    $(`[data-basedonparentsetvalues]`).each(function (index) {
      debugger
      var parsingData = eval($(this).data('basedonparentsetvalues'))
      var basedOnFieldName = "", basedOnFieldValue = "", basedOnFieldCurrentValue = "", basedOnFieldType = "", basedOnCondition = false;
      parsingData.forEach(el => {
        debugger
        basedOnFieldName = el.basedOnFieldName
        basedOnFieldValue = el.basedOnFieldValue
        basedOnCondition = el.basedOnCondition ? el.basedOnCondition : false
        basedOnFieldType = $(`#${basedOnFieldName}`).attr('type')
        if (basedOnFieldType == 'radio') {
          basedOnFieldCurrentValue = $(`#${basedOnFieldName}:checked`).val()
        } else {
          basedOnFieldCurrentValue = $(`#${basedOnFieldName}`).val()
        }

        if (basedOnCondition) {
          if (basedOnFieldValue == basedOnFieldCurrentValue) {
            el.valueToSet.forEach(item => {
              if (valueBasedOnParent.includes(item.condition)) {
                item.values.forEach(field => {
                  New_Data_Submit.g.oListItem.set_item(field.fieldNameInList, field.fieldValueInList);
                })
              }
            })
          }
        }else{
          el.valueToSet.forEach(item => {
            if (valueBasedOnParent.includes(item.condition)) {
              item.values.forEach(field => {
                New_Data_Submit.g.oListItem.set_item(field.fieldNameInList, field.fieldValueInList);
              })
            }
          })
        }
      })

    })
    //


    if (PCODE && listkey != "projects") {

      New_Data_Submit.g.oListItem.set_item("ProjectCode", PCODE);
      if (listkey == "issues") {
        New_Data_Submit.g.oListItem.set_item("ResolutionStatus", "new");
      }

      //save value based on parent type

      //


      // New_Data_Submit.g.oListItem.set_item("MasterKey", PCODE);
      // New_Data_Submit.g.oListItem.set_item("MasterID", PCODE);
    }
    else if (ICODE && listkey != "initiatives") {
      New_Data_Submit.g.oListItem.set_item("InitiativeCode", ICODE);
    }
    else if (UserSTCode && listkey != "strategicpartnerships") {
      New_Data_Submit.g.oListItem.set_item("StrategicPartnershipCode", UserSTCode);
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
      New_Data_Submit.g.oListItem.set_item("ProgressStatusDeliverable", "stat6");
      New_Data_Submit.g.oListItem.set_item("ProgressStatusMilestone", "stat6");
      New_Data_Submit.g.oListItem.set_item("ProgressStatusSchedule", "stat6");
      New_Data_Submit.g.oListItem.set_item("Status", "inprogress");

      //لحساب مدة الاساس
      var BaselineStartDate = $('#BaselineStartDate').val()
      var BaselineFinishDate = $('#BaselineFinishDate').val()

      if (BaselineStartDate && BaselineFinishDate) {
        const date1 = new Date(BaselineStartDate);
        const date2 = new Date(BaselineFinishDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        New_Data_Submit.g.oListItem.set_item("BaselineDuration", diffDays);
      }
      //
      if (isWF) {
        IdeaId = window.location.href.split("IdeaId=")[1].split("&")[0];
        New_Data_Submit.g.oListItem.set_item("RelatedIdeaCode", IdeaId);
      }
    }
    if (listkey == 'initiatives') { //  to handle the initiative status when create a new one
      New_Data_Submit.g.oListItem.set_item("InitiativeProgressStatus", "stat6");
    }






    New_Data_Submit.g.oListItem.update();
    clientContext.load(New_Data_Submit.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        IID = New_Data_Submit.g.oListItem.get_id();
        if (listkey == 'projects') {
          projectManagerPickedToProjectCenter = New_Data_Submit.g.oListItem.get_item("ProjectManager")
        }

        if (listkey == "mainkpi") {
          var dateFrom = $('#FromDate').val()
          var dateFromTime = new Date(dateFrom); // when use normal date time
          // var yearFrom = dateFromTime.getFullYear();
          yearFrom = Number(dateFrom)
          // var yearFrom = Number(dateFrom)
          var dateTo = $('#ToDate').val()
          var dateToTime = new Date(dateTo); // when use normal date time
          // var yearTo = dateToTime.getFullYear();
          var yearTo = Number(dateTo)
          var numberOfResults = yearTo - yearFrom

          if (numberOfResults > 0) {
            for (var i = 0; i <= numberOfResults; i++) {
              var Name = $('#Name').val()
              var PeriodType = $('#PeriodType').val()
              var Types = $('#Types').val()
              var KpiYear = yearFrom + i
              var MainGoalRelated = $('#RelatedStrategyObjective').val() ? $('#RelatedStrategyObjective').val() : ''
              var subGoalRelated = $('#SubRelatedObjective').val() ? $('#SubRelatedObjective').val() : ''
              var Sector = $('#Sector').val();
              var SubSector = $('#SubSector').val();
              var Portfolio = $('#Portfolio').val()
              kpiResults.init(Name, PeriodType, Types, KpiYear, Sector, SubSector, Portfolio, MainGoalRelated, subGoalRelated)
            }
          } else {
            var Name = $('#Name').val()
            var PeriodType = $('#PeriodType').val()
            var Types = $('#Types').val()
            var KpiYear = yearFrom
            var MainGoalRelated = $('#RelatedStrategyObjective').val() ? $('#RelatedStrategyObjective').val() : '';
            var subGoalRelated = $('#SubRelatedObjective').val() ? $('#SubRelatedObjective').val() : '';
            var Sector = $('#Sector').val();
            var SubSector = $('#SubSector').val();
            var Portfolio = $('#Portfolio').val()
            kpiResults.init(Name, PeriodType, Types, KpiYear, Sector, SubSector, Portfolio, MainGoalRelated, subGoalRelated)
          }
          newKPIEquation.init();
        } else if (listkey == "benefitmetrics") {

          var dateFrom = $("#FromDate").val();
          benefitYearFrom = Number(dateFrom);
          var yearFrom = Number(dateFrom)
          var dateTo = $("#ToDate").val();
          var yearTo = Number(dateTo);
          var numberOfResults = yearTo - yearFrom;

          if (numberOfResults > 0) {
            for (var i = 0; i <= numberOfResults; i++) {
              var benefitYear = yearFrom + i;
              benefitResults.init(benefitYear)
            }
          } else {
            var benefitYear = yearFrom;
            benefitResults.init(benefitYear)
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

        writeToEventViewer.preinit(
          msg,
          "JS Api Error",
          "High",
          url,
          '580',
          '14',
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
        window.location =
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/Listing.aspx?ListKey=" +
          listkey +
          PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
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
        if (USERisWF && workflowname == "Project") {
          BulkEdit(true);
        } else if (USERisWF && workflowname != "Project") {
          Continue_Submit_Field.init();
        }
      }
    },
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
      if (listkey == 'initiatives') { // added to handle inity attach
        ICODE = Code
      } else if (listkey == 'strategicpartnerships') {
        STCODE = Code
      }

      if (isPrjRelated) {
        Set_Code_Submit.g.oListItem.set_item("ProjectCode", PCODE);
      }
    } else if (listkey == "projects") {

      var sectorValue = $("#Sector").val()

      if (sectorValue) { // to save the code depends on sector you chose (this is specific whe the sector be autogenerat)
        var year = String(new Date().getFullYear()),
          year = year.slice(year.length - 2); //get last 2 characters
        PCODE = sectorValue + "-" + year;
      }


      Code = PCODE + "-" + IID.toString().padStart(4, "0");
      PCODE = Code;
      Set_Code_Submit.g.oListItem.set_item("Title", Code);
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
        }
        else if (listkey == 'mainkpi') {
          Documents_Library = listkey + " Documents";
          folderdirectory = "/";
          // folderdirectory = host+'/'+listkey+' Documents/';
        }
        else {
          //
          Documents_Library = "SPM General Services"
          folderdirectory = listkey
        } //
        if (listkey != "projects" && listkey != 'initiatives' && listkey != 'strategicpartnerships') {
          //Get File Input Control and read the file name
          $("input[type=file]").each(function (e) {
            fileCount += document.querySelector("#" + $(this).attr("id")).files
              .length;
          });
          if (fileCount) {
            // readFiles();
            _uploadFile();
          } else {
            if ($(".Details-Item.NewItem").length > 0) {
              //calling new master submit
              New_Data_Submit.g.checkNewMasterDetails();
            } else {
              $(".errormsg").hide();
              $(".successmsg").show();
              $(".btn-save").addClass("success");
              // if (listkey == 'initiatives') {
              //   window.location = _spPageContextInfo.webAbsoluteUrl + "/SitePages/initiativeHome.aspx?ICODE=" + Code
              //   // /SitePages/initiativeHome.aspx?ICODE=IN-22-0090
              // }
              // else if (listkey == 'strategicpartnerships') {
              //   window.location = _spPageContextInfo.webAbsoluteUrl + "/SitePages/StrategicPartnershipHome.aspx?STCODE=" + Code
              //   // /SitePages/initiativeHome.aspx?ICODE=IN-22-0090
              // }
              // else if (listkey == "projects") {
              //   window.location =
              //     _spPageContextInfo.webAbsoluteUrl +
              //     "/SitePages/View.aspx?ListKey=" +
              //     listkey +
              //     "&IID=" +
              //     IID +
              //     PCODE_STRING;
              // }
              // else {
              window.location = _spPageContextInfo.webAbsoluteUrl + "/SitePages/Listing.aspx?ListKey=" + listkey + PCODE_STRING;
              //}
            }
          }
        } else if (listkey == 'initiatives') {
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
  preinit: function () {


    $(".errormsg").remove();
    $(".container-body").addClass("was-validated");

    var isCheckMember = false;

    if ( // in portfolio the user should be in PMO Team group 
      listkey == "portfolio" &&
      $("#Manager").find("span.sp-peoplepicker-userSpan").attr("sid")
    ) {
      debugger
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
      userCalls.isMember("PMO Team", portfoliomanagername, 'Manager');
    }



    if (
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
      var kpiownername = encodeURIComponent(
        kpiowner.get_lookupValue()
      );
      membersGroupCheckArray.push({
        groupName: "KPI Owners",
        userLoginName: kpiownername,
        fieldID: 'Owner'
      })
    }
    if (
      listkey == "mainkpi" &&
      $("#PerformanceLeader").find("span.sp-peoplepicker-userSpan").attr("sid")
    ) {
      pickerValidationDone = true;
      isCheckMember = true;
      var perforrmanceleader =
        $("#PerformanceLeader").find("span.sp-peoplepicker-userSpan").attr("sid") ==
          undefined
          ? ""
          : SP.FieldUserValue.fromUser(
            $("#PerformanceLeader").find("span.sp-peoplepicker-userSpan").attr("sid")
          );
      var perforrmanceleadername = encodeURIComponent(
        perforrmanceleader.get_lookupValue()
      );
      membersGroupCheckArray.push({
        groupName: "Performance Leaders",
        userLoginName: perforrmanceleadername,
        fieldID: 'PerformanceLeader'
      })
    }
    if (
      listkey == "mainkpi" &&
      $("#PerformanceLeader2").find("span.sp-peoplepicker-userSpan").attr("sid")
    ) {
      pickerValidationDone = true;
      isCheckMember = true;
      var perforrmanceleader =
        $("#PerformanceLeader2").find("span.sp-peoplepicker-userSpan").attr("sid") ==
          undefined
          ? ""
          : SP.FieldUserValue.fromUser(
            $("#PerformanceLeader2").find("span.sp-peoplepicker-userSpan").attr("sid")
          );
      var perforrmanceleadername = encodeURIComponent(
        perforrmanceleader.get_lookupValue()
      );
      membersGroupCheckArray.push({
        groupName: "Performance Leaders",
        userLoginName: perforrmanceleadername,
        fieldID: 'PerformanceLeader2'
      })
    }

    membersGroupCheckArray.length > 0 ? userCalls.isMember(membersGroupCheckArray[0].groupName, membersGroupCheckArray[0].userLoginName, membersGroupCheckArray[0].fieldID) : '';
    var pickervalid = true; //check required people picker
    var multiSelectValid = true;

    $("[type=picker][required]").each(function () {

      if ($(this).find("span.sp-peoplepicker-userSpan").length == 0 && ($(this).attr('data-email') == enternameemail)) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
        $(this).siblings('.errMsgField').show();

        // return false;
      } else {
        $(this).removeClass("picker-error");
        $(this).addClass("picker-valid");
      }
    });

    $("[type=picker]").each(function () {

      if ($(this).find("span.sp-peoplepicker-userSpan").attr('aria-invalid') == 'true') {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
      }

      if ($(this).find('span.ms-formvalidation.sp-peoplepicker-errorMsg').length) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
      }

    })

    ////////////////////////for multi picker
    $("[type=multipicker][required]").each(function () {
      if ($(this).find("span.sp-peoplepicker-userSpan").length == 0 && ($(this).attr('data-email') == enternameemail)) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
        // return false;
      } else if ($(this).find("span.sp-peoplepicker-userSpan").length == 0 && !$(this).attr('data-email')) {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
      } else {
        $(this).removeClass("picker-error");
        $(this).addClass("picker-valid");
      }
    });


    $("[type=multipicker]").each(function () {

      if ($(this).find("span.sp-peoplepicker-userSpan").attr('aria-invalid') == 'true') {
        pickervalid = false;
        $(this).addClass("picker-error");
        $(this).removeClass("picker-valid");
      }
    })
    //

    // to show the err msg in fields
    if ($(".was-validated .CFIELD:not(.even-required) .form-control:invalid").length > 0) {

      $(".was-validated .CFIELD:not(.even-required) .form-control:invalid").each(function () {
        $(this).siblings('.errMsgField').show();
      })
    }


    //validation of multiselect
    $('.dropdown-menu.multiselect_scroll.required').each(function () {

      if ($(this).length) {
        if ($('.dropdown-menu.multiselect_scroll.required :checkbox:checked').length == 0) {
          multiSelectValid = false
          $('.dropdown-menu.multiselect_scroll.required').parent().parent().siblings('.errMsgField').show()
        } else {
          multiSelectValid = true
        }
      }
    })

    changeResources();


    if (listkey == "risks") {
      if ($("#MoveItToIssueList").is(":checked") == true) {
        Risk_To_Issue_Submit.preinit();
      }
    }
    if ($(".was-validated .form-control:invalid").length == 0 && pickervalid && !isCheckMember && multiSelectValid) {

      if (listkey == "risks") {
        if (
          showpopup == false ||
          $("#MoveItToIssueList").is(":checked") == false
        ) {
          Edit_Data_Submit.init();
        }
      } else {
        Edit_Data_Submit.init();
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

        if (listkey == 'sos') {
          $scrollTo = $("[type=multipicker][required]");
        } else {
          $scrollTo = $("[type=picker][required]");
        }
      }

      $container.animate({
        scrollTop:
          $scrollTo.offset().top -
          $container.offset().top +
          $container.scrollTop() -
          120,
      });
      if (USERisWF) {
        $(".popupComment").remove();
      }
    }
  },
  init: function () {
    if (listkey == 'projects') {
      console.log(User_ProjUID, "User_ProjUID")
      checkinProjectEditSubmit.checkin(User_ProjUID);

    }
    // $('div.CSformbuttons').prepend('<div class="loading-wait">  Please Wait... <div class="cust-loader"></div></div>');+
    //.dont-submit,.hide-field
    $(".btn-save").attr("disabled", true);
    $("#preloader,#formloader").css("display", "block");
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(SP_ListName);
    Edit_Data_Submit.g.oListItem = oList.getItemById(IID); //declared inside object scope only
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
          .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field)>  textarea,
           .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.hide-field) > .multiselect-container`
    ).each(function () {
      console.log($(this).attr("id"), "while id")

      if ($(this).attr("type") == "picker") {
        if ($(this).find("span.sp-peoplepicker-userSpan").length) {
          var id = $(this).attr("INppicker");
          var ppp =
            $(this).find("span.sp-peoplepicker-userSpan").attr("sid") ==
              undefined
              ? ""
              : SP.FieldUserValue.fromUser(
                $(this).find("span.sp-peoplepicker-userSpan").attr("sid")
              ); //.split('|').slice(-1)[0]
          Edit_Data_Submit.g.oListItem.set_item(id, ppp);
        }
      } else if ($(this).attr("type") == "multipicker") {
        if ($(this).find("span.sp-peoplepicker-userSpan").length) {
          var id = $(this).attr("INppicker");
          var users = [];
          $("span.sp-peoplepicker-userSpan").each(function () {
            var ppp =
              $(this).attr("sid") ==
                undefined
                ? ""
                : SP.FieldUserValue.fromUser(
                  $(this).attr("sid").split("|").slice(-1)[0]
                );

            console.log('aaaa', ppp);
            users.push(ppp)
          })
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
              Edit_Data_Submit.g.oListItem.set_item($(this).attr("id"), ydate);
          } else {
            Edit_Data_Submit.g.oListItem.set_item($(this).attr("id"), null);
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
              Edit_Data_Submit.g.oListItem.set_item($(this).attr("id"), ydate);
          } else {
            Edit_Data_Submit.g.oListItem.set_item($(this).attr("id"), null);
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
            month + "/" + day + "/" + year + " " + hour + ":" + min + ":" + sec;

          if (dateval)
            Edit_Data_Submit.g.oListItem.set_item($(this).attr("id"), ydate);
        }
      } else if ($(this).attr("type") == "radio") {
        // var checkedvalue = $('input[id="' + $(this).attr('id') + '"]:checked').val();
        // Edit_Data_Submit.g.oListItem.set_item($(this).attr('id'), checkedvalue);
        var checkedvalue = $(
          'input[id="' + $(this).attr("id") + '"]:checked'
        ).val();
        if (checkedvalue == "yes") {
          Edit_Data_Submit.g.oListItem.set_item($(this).attr("id"), "yes");
        } else if (checkedvalue == "no" || checkedvalue == "undefined") {
          Edit_Data_Submit.g.oListItem.set_item($(this).attr("id"), "no");
        } else
          Edit_Data_Submit.g.oListItem.set_item(
            $(this).attr("id"),
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
          Edit_Data_Submit.g.oListItem.set_item($(this).attr("id"), true);
        else Edit_Data_Submit.g.oListItem.set_item($(this).attr("id"), false);
      } else if ($(this).attr("type") == "dropdown") {

        $(this).find(':disabled').removeAttr('disabled'); // avoid remove the data when the dropdown field is disabled

        Edit_Data_Submit.g.oListItem.set_item(
          $(this).attr("id"),
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


        let otherFieldsJSON = eval($(this).find("option:checked").data("otherfields"));

        if (otherFieldsJSON && otherFieldsJSON != 'undefined' && otherFieldsJSON.length) {
          otherFieldsJSON.forEach(el => {
            Edit_Data_Submit.g.oListItem.set_item(el.fieldName, el.value);
          })
        }


      } else if ($(this).hasClass("percentagefield")) {
        Edit_Data_Submit.g.oListItem.set_item(
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
        myselections = myselections.join(":::");
        Edit_Data_Submit.g.oListItem.set_item(
          $(this).attr("myfield"),
          myselections
        );
      } else {
        Edit_Data_Submit.g.oListItem.set_item(
          $(this).attr("id"),
          $(this).val()
        );
      }
    });

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

      var parsingData = eval($(this).data('formdefaultvalue'))
      console.log(parsingData, "parsingData ediiiiiit")
      parsingData.forEach(el => {
        if (el.roles.includes("allRoles")) {
          Edit_Data_Submit.g.oListItem.set_item(el.fieldName, el.value);
        } else if (el.roles.includes(currentUserRole)) {
          Edit_Data_Submit.g.oListItem.set_item(el.fieldName, el.value);
        }
      })
    })
    //
    // to handle set data based on parent values and current list condition
    $(`[data-basedonparentsetvalues]`).each(function (index) {
      debugger
      var parsingData = eval($(this).data('basedonparentsetvalues'))
      var basedOnFieldName = "", basedOnFieldValue = "", basedOnFieldCurrentValue = "", basedOnFieldType = "", basedOnCondition = false;
      parsingData.forEach(el => {
        debugger
        basedOnFieldName = el.basedOnFieldName
        basedOnFieldValue = el.basedOnFieldValue
        basedOnCondition = el.basedOnCondition ? el.basedOnCondition : false
        basedOnFieldType = $(`#${basedOnFieldName}`).attr('type')
        if (basedOnFieldType == 'radio') {
          basedOnFieldCurrentValue = $(`#${basedOnFieldName}:checked`).val()
        } else {
          basedOnFieldCurrentValue = $(`#${basedOnFieldName}`).val()
        }
        
        if (basedOnCondition) {
          if (basedOnFieldValue == basedOnFieldCurrentValue) {
            el.valueToSet.forEach(item => {
              if (valueBasedOnParent.includes(item.condition)) {
                item.values.forEach(field => {
                  Edit_Data_Submit.g.oListItem.set_item(field.fieldNameInList, field.fieldValueInList);
                })
              }
            })
          }
        }else{
          el.valueToSet.forEach(item => {
            if (valueBasedOnParent.includes(item.condition)) {
              item.values.forEach(field => {
                Edit_Data_Submit.g.oListItem.set_item(field.fieldNameInList, field.fieldValueInList);
              })
            }
          })
        }
      })

    })
    // $(`[data-basedonparentsetvalues]`).each(function (index) {
    //   debugger
    //   var parsingData = eval($(this).data('basedonparentsetvalues'))
    //   var basedOnFieldName = "", basedOnFieldValue = "", basedOnFieldCurrentValue = "", basedOnFieldType = "";
    //   parsingData.forEach(el => {
    //     basedOnFieldName = el.basedOnFieldName
    //     basedOnFieldValue = el.basedOnFieldValue

    //     basedOnFieldType = $(`#${basedOnFieldName}`).attr('type')
    //     if (basedOnFieldType == 'radio') {
    //       basedOnFieldCurrentValue = $(`#${basedOnFieldName}:checked`).val()
    //     } else {
    //       basedOnFieldCurrentValue = $(`#${basedOnFieldName}`).val()
    //     }
    //     if (basedOnFieldValue == basedOnFieldCurrentValue) {
    //       el.valueToSet.forEach(item => {
    //         if (valueBasedOnParent.includes(item.condition)) {
    //           item.values.forEach(field => {
    //             Edit_Data_Submit.g.oListItem.set_item(field.fieldNameInList, field.fieldValueInList);
    //           })
    //         }
    //       })
    //     }
    //   })

    // })



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
    }
    else if (listkey == "initiatives") {
      var plannedperc = Edit_Data_Submit.g.oListItem.get_item('PlannedPercentageCompleted');
      var actualperc = Edit_Data_Submit.g.oListItem.get_item('ActualPercentageCompleted');
      var diffbtwplannedactual = plannedperc - actualperc;
      Edit_Data_Submit.g.oListItem.set_item("DelayPercentage", diffbtwplannedactual);
    }
    else if (listkey == "projects") {
      //Ghufran Calculated duration
      var initstartdate = new Date(Edit_Data_Submit.g.oListItem.get_item('BaselineStartDate'));
      var initfinishdate = new Date(Edit_Data_Submit.g.oListItem.get_item('BaselineFinishDate'));
      var months, diff;
      if ((initfinishdate != null) && (initstartdate != null)) {
        diff = (initfinishdate.getTime() - initstartdate.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7 * 4);
        months = Math.abs(Math.round(diff));
      } else {
        months = 0;
      }

      Edit_Data_Submit.g.oListItem.set_item("BaselineDuration", months);
    }
    else if (listkey == 'mainkpi') { // get the data to update the kpi result list
      kpiName = $('#Name').val()
      kpiType = $('#Types').val()
      kpiSector = $('#Sector').val()
      kpiSubSector = $('#SubSector').val()
      kpiMainGoalRelated = $('#RelatedStrategyObjective').val() ? $('#RelatedStrategyObjective').val() : ''
      kpiSubGoalRelated = $('#SubRelatedObjective').val() ? $('#SubRelatedObjective').val() : ''
      kpiPortfolio = $('#Portfolio').val() ? $('#Portfolio').val() : ''
      kpiPerformanceAnalysis = $('#PerformanceAnalysis').val() ? $('#PerformanceAnalysis').val() : ''
      kpiPeriodTypeUpdate = $('#PeriodType').val() ? $('#PeriodType').val() : ''
      kpiYearPicked = $('#Year').val() ? $('#Year').val() : ''
      kpiMidPicked = $('#Midterms').val() ? $('#Midterms').val() : ''
      kpiQuarterPicked = $('#Quarter').val() ? $('#Quarter').val() : ''
      kpiMonthPicked = $('#Months').val() ? $('#Months').val() : ''
      kpiRecurrenceChanged = $('#RecurrenceChanged').val() ? $('#RecurrenceChanged').val() : '';

      if (kpiType == 'main') { // remove portfolio and alhadaf elfer3e when change to main cause main don't have portfolio
        Edit_Data_Submit.g.oListItem.set_item('Portfolio', '');
        Edit_Data_Submit.g.oListItem.set_item('SubRelatedObjective', '');
      } else if (kpiType == 'sub') { // remove alhadaf elra2ese elmortabet when change to sub
        Edit_Data_Submit.g.oListItem.set_item('RelatedStrategyObjective', '');
      }

    }

    Edit_Data_Submit.g.oListItem.update();
    clientContext.load(Edit_Data_Submit.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {

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
        } else if (listkey == 'mainkpi') {
          Documents_Library = listkey + " Documents";
          folderdirectory = ""; //_spPageContextInfo.webServerRelativeUrl+
        }
        else {
          // Documents_Library = listkey + " Documents";
          // folderdirectory = "";
          Documents_Library = "SPM General Services"
          folderdirectory = listkey
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

        if (fileCount) _uploadFile();
        // readFiles();
        else {

          if ($(".Details-Item.NewItem").length > 0) {
            console.log("in master detaiiiiiiiiiiiiiils")
            //calling new master submit
            New_Data_Submit.g.checkNewMasterDetails();
          } else if ($(".Details-Item.EditItem").length > 0) {
            Edit_Data_Submit.g.checkEditMasterDetails();
          } else {
            if (USERisWF && workflowname == "Project") {
              BulkEdit(true);
            } else if (USERisWF && workflowname != "Project") {
              Continue_Submit_Field.init();
            } else {
              $(".btn-save").addClass("success");
              if (listkey == 'kpiequations') {
                window.location =
                  _spPageContextInfo.webAbsoluteUrl +
                  "/SitePages/View.aspx?ListKey=mainkpi" +
                  "&IID=" +
                  $('#KPI option[value="' + $('#KPI').val() + '"]').attr('option-id') +
                  PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
              } else if (listkey == "benefitsequations") {
                window.location =
                  _spPageContextInfo.webAbsoluteUrl +
                  "/SitePages/View.aspx?ListKey=benefitmetrics" +
                  "&IID=" +
                  $('#RelatedBenefit option[value="' + $('#RelatedBenefit').val() + '"]').attr('option-id') +
                  PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
              } else if (listkey == 'mainkpi') {
                Edit_KPI_Results.init(kpiName, kpiType, kpiSector, kpiSubSector, kpiPortfolio, kpiMainGoalRelated, kpiSubGoalRelated, kpiPerformanceAnalysis, kpiRecurrenceChanged)
              } else if (listkey == 'projects' && PCODE) {

                getProjectInfoToUpdateEPM()
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
        // }
      }),
      Function.createDelegate(this, function (sender, args) {
        console.log(
          "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
        );

        // to save the error in event logging list while submit
        var msg = args.get_message();
        var stack = args.get_stackTrace();
        var url = window.location.href;

        writeToEventViewer.preinit(
          msg,
          "JS Api Error",
          "High",
          url,
          '580',
          '14',
          stack
        );

      })
    );
  },
  g: {
    clickbait: function () {
      $("button.btn-save").on("click", function () {
        Edit_Data_Submit.preinit();
      });
    },
    Cancel: function () {
      $("button.btn-cancel").on("click", function () {
        window.location =
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/View.aspx?ListKey=" +
          listkey +
          "&IID=" +
          IID +
          PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
        // console.log(PCODE_STRING);
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
  },
};

//BenefitResults

var benefitResults = {
  init: function (benefitYear) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("BenefitsResults");
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
  g: {}
}



//kpiResults

var kpiResults = {
  init: function (Name, PeriodType, Types, KpiYear, Sector, SubSector, Portfolio, MainGoalRelated, subGoalRelated) {

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("KPIResults");
    var itemCreateInfo = new SP.ListItemCreationInformation();
    kpiResults.g.oListItem = oList.addItem(itemCreateInfo);

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
    kpiResults.g.oListItem.set_item("DraftStatus", 'draft');
    if (Types == 'main') {
      kpiResults.g.oListItem.set_item("RelatedGoal", MainGoalRelated)
    } else if (Types == 'sub') {
      kpiResults.g.oListItem.set_item("RelatedGoal", subGoalRelated)
    }
    ////////  update performance leader1 and performance leader2
    if ($('#PerformanceLeader').find("span.sp-peoplepicker-userSpan").length) {
      var id = $('#PerformanceLeader').attr("INppicker");
      var ppp =
        $('#PerformanceLeader').find("span.sp-peoplepicker-userSpan").attr("sid") ==
          undefined
          ? ""
          : SP.FieldUserValue.fromUser(
            $('#PerformanceLeader')
              .find("span.sp-peoplepicker-userSpan")
              .attr("sid")
              .split("|")
              .slice(-1)[0]
          );

      kpiResults.g.oListItem.set_item(id, ppp);

      console.log(ppp, "ppppppppppppppppppppppppppppp")
      console.log(id, "iiiiiiiiiiiiiiiiiiiiiid")
    }
    if ($('#PerformanceLeader2').find("span.sp-peoplepicker-userSpan").length) {
      var id = $('#PerformanceLeader2').attr("INppicker");
      var ppp =
        $('#PerformanceLeader2').find("span.sp-peoplepicker-userSpan").attr("sid") ==
          undefined
          ? ""
          : SP.FieldUserValue.fromUser(
            $('#PerformanceLeader2')
              .find("span.sp-peoplepicker-userSpan")
              .attr("sid")
              .split("|")
              .slice(-1)[0]
          );

      kpiResults.g.oListItem.set_item(id, ppp);
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
  g: {}
}

// Edit Kpi Results list when edit on main kpi to make the target page updated
var Edit_KPI_Results = {
  init: function (Name, Types, Sector, SubSector, kpiPortfolio, kpiMainGoalRelated, kpiSubGoalRelated, kpiPerformanceAnalysis, kpiRecurrenceChanged) {

    var context = SP.ClientContext.get_current();
    var dfd = $.Deferred();
    var programList = context.get_web().get_lists().getByTitle('KPIResults');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='KPI'/><Value Type='Text'>" + kpiCodeResult + "</Value></Eq></And></Where></Query></View>")

    //Get items by Query
    var progColl = programList.getItems(camlQuery);
    //Load item collection
    context.load(progColl);

    context.executeQueryAsync(
      function () {
        var currentItemArray = [];
        if (progColl.get_count() > 0) {
          var progEnum = progColl.getEnumerator();
          while (progEnum.moveNext()) {
            var currentItem = progEnum.get_current();
            var currentId = currentItem.get_item("ID");
            var yearItem = currentItem.get_item("Year");

            //Get Item by current ID
            var items = programList.getItemById(currentId);
            items.set_item('Name', Name);
            items.set_item('Types', Types);
            items.set_item('Sector', Sector)
            items.set_item('SubSector', SubSector)
            items.set_item('RecurrenceChanged', kpiRecurrenceChanged)

            ///////// update performance leader1 and performance leader2
            if ($('#PerformanceLeader').find("span.sp-peoplepicker-userSpan").length) {
              var id = $('#PerformanceLeader').attr("INppicker");
              var ppp =
                $('#PerformanceLeader').find("span.sp-peoplepicker-userSpan").attr("sid") ==
                  undefined
                  ? ""
                  : SP.FieldUserValue.fromUser(
                    $('#PerformanceLeader')
                      .find("span.sp-peoplepicker-userSpan")
                      .attr("sid")
                      .split("|")
                      .slice(-1)[0]
                  );
              items.set_item(id, ppp);

            }
            if ($('#PerformanceLeader2').find("span.sp-peoplepicker-userSpan").length) {
              var id = $('#PerformanceLeader2').attr("INppicker");
              var ppp =
                $('#PerformanceLeader2').find("span.sp-peoplepicker-userSpan").attr("sid") ==
                  undefined
                  ? ""
                  : SP.FieldUserValue.fromUser(
                    $('#PerformanceLeader2')
                      .find("span.sp-peoplepicker-userSpan")
                      .attr("sid")
                      .split("|")
                      .slice(-1)[0]
                  );
              items.set_item(id, ppp);

            }
            /////////

            if (yearItem == kpiYearPicked) { // to update performance analysis
              if (kpiPeriodTypeUpdate == 'monthly') {
                items.set_item(`PerformanceAnalysis${kpiMonthPicked}`, kpiPerformanceAnalysis)
              } else if (kpiPeriodTypeUpdate == 'quarter') {
                items.set_item(`PerformanceAnalysis${kpiQuarterPicked}`, kpiPerformanceAnalysis)
              } else if (kpiPeriodTypeUpdate == 'midterm') {
                items.set_item(`PerformanceAnalysis${kpiMidPicked}`, kpiPerformanceAnalysis)
              } else if (kpiPeriodTypeUpdate == 'year') {
                items.set_item('PerformanceAnalysisActualY', kpiPerformanceAnalysis)
              }

            }
            if (Types == 'main') {
              items.set_item("RelatedGoal", kpiMainGoalRelated)
              items.set_item('Portfolio', '')
            } else if (Types == 'sub') {
              items.set_item("RelatedGoal", kpiSubGoalRelated)
              items.set_item('Portfolio', kpiPortfolio)
            }
            //Update the item
            items.update();
            currentItemArray.push(items);
            context.load(currentItemArray[currentItemArray.length - 1]);
          }
          context.executeQueryAsync(
            function () {

              window.location =
                _spPageContextInfo.webAbsoluteUrl +
                "/SitePages/View.aspx?ListKey=" +
                listkey +
                "&IID=" +
                IID +
                PCODE_STRING;

              dfd.resolve();
            },
            function (sender, args) {
              //Item updated fail
              console.log(
                "Request Failed to get kpi results Item Items :" + args.get_message()
              );
            }
          );
        }
      }
    )
  }
}


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

        writeToEventViewer.preinit(
          msg,
          "JS Api Error",
          "High",
          url,
          '580',
          '14',
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
    var oList = clientContext.get_web().get_lists().getByTitle("BenefitsEquations");
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

        writeToEventViewer.preinit(
          msg,
          "JS Api Error",
          "High",
          url,
          '580',
          '14',
          stack
        );
      })
    );
  },
  g: {},
}
//master Data
var New_Master_Details_Submit = {
  init: function () {

    var clientContext = new SP.ClientContext.get_current();
    // $('[data-target_list]').each(function(){
    var pillerCount = 0
    $("[data-target_list=Initiatives] .Details-Item.NewItem.master-to-submit" && listkey == 'projectcharter').each(
      console.log('mmmmmmmm')
    )
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
            ".CFIELD:not(.dont-submit)>input," +
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
                    $(this).attr("sid") ==
                      undefined
                      ? ""
                      : SP.FieldUserValue.fromUser(
                        $(this).attr("sid").split("|").slice(-1)[0]
                      );

                  console.log('aaaa', ppp);
                  users.push(ppp)
                })
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
              $(this).find("input:checkbox:checked").each(function () {
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
          prt4 = $(this).data('index').toString().padStart(4, "0");
        ;

        Code = prt1 + "-" + prt2 + "-" + prt3 + "-" + prt4;



        New_Master_Details_Submit.g.oListItem.set_item("Title", Code);

        if (PCODE) {
          New_Master_Details_Submit.g.oListItem.set_item("ProjectCode", PCODE);
        } else if (ICODE) {
          New_Master_Details_Submit.g.oListItem.set_item("InitiativeCode", ICODE);
        }


        if (listkey == 'goalstrategy') {
          var itemId = IID + pillerCount // to save a newTitle for mult master details item
          var prt1 = CurrList.substring(0, 2).toUpperCase(),
            prt2 = String(new Date().getFullYear()).slice(4 - 2),
            prt3 = itemId.toString().padStart(4, "0");
          var pillerCode = prt1 + "-" + prt2 + "-" + prt3;
          New_Master_Details_Submit.g.oListItem.set_item("Title", pillerCode);
          pillerCount += 1
          var type = $('#Types').val()
          if (type == 'vision') {
            New_Master_Details_Submit.g.oListItem.set_item("Types", "program");
          } else if (type == 'ministry' || type == 'sectorial' || type == 'lms' || type == 'sub') {
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
          } else if (listkey == 'initiatives') {
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
            if (listkey == "projects") {

              getProjectInfoToUpdateEPM()

              // window.location =
              //   _spPageContextInfo.webAbsoluteUrl +
              //   "/SitePages/View.aspx?ListKey=" +
              //   listkey +
              //   "&IID=" +
              //   IID +
              //   PCODE_STRING;
            }
            else {
              if (listkey == "initiativecards" && ICODE) {
                window.location =
                  _spPageContextInfo.webAbsoluteUrl +
                  "/SitePages/View.aspx?ListKey=" +
                  listkey +
                  "&IID=" +
                  IID +
                  PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
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

var Edit_Master_Details_Submit = {
  init: function (DetailsList, IDs) {
    var clientContext = new SP.ClientContext.get_current();
    var CurrList, oList, itemID;
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
                $(this).attr("sid") ==
                  undefined
                  ? ""
                  : SP.FieldUserValue.fromUser(
                    $(this).attr("sid").split("|").slice(-1)[0]
                  );

              console.log('aaaa', ppp);
              users.push(ppp)
            })
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
        } else
          Edit_Master_Details_Submit.g.oListItem.set_item(
            $(this).attr("id"),
            $(this).val()
          );
      });

      if (listkey == 'goalstrategy') {
        var type = $('#Types').val()
        if (type == 'vision') {
          Edit_Master_Details_Submit.g.oListItem.set_item("Types", "program");
        } else if (type == 'ministry' || type == 'sectorial' || type == 'lms' || type == 'sub') {
          Edit_Master_Details_Submit.g.oListItem.set_item("Types", "piller");
        }
      }

      Edit_Master_Details_Submit.g.oListItem.update();
      clientContext.load(Edit_Master_Details_Submit.g.oListItem);
    });

    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        // determinig folder directory
        if (USERisWF && workflowname == "Project") {
          BulkEdit(true);
        } else if (USERisWF && workflowname != "Project") {
          Continue_Submit_Field.init();
        } else {

          $(".errormsg").hide();
          $(".successmsg").show();
          $(".btn-save").addClass("success");

          if (listkey == 'mainkpi') { // to update the kpi result list
            Edit_KPI_Results.init(kpiName, kpiType, kpiSector, kpiSubSector, kpiPortfolio, kpiMainGoalRelated, kpiSubGoalRelated, kpiPerformanceAnalysis, kpiRecurrenceChanged)
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
      $(".errormsg").hide();
      $(".successmsg").show();
      $(".btn-save").addClass("success");
      window.location =
        _spPageContextInfo.webAbsoluteUrl +
        "/SitePages/View.aspx?ListKey=" +
        listkey +
        "&IID=" +
        IID +
        PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
    } else if (listkey == "projects") {
      // if on new project page
      New_ProjectStages_Submit.init();
    } // if on new page other than project
    else {
      if ($(".Details-Item.NewItem").length > 0) {
        //calling new master submit
        New_Data_Submit.g.checkNewMasterDetails();
      } else {
        $(".errormsg").hide();
        $(".successmsg").show();
        $(".btn-save").addClass("success");
        if (listkey == "projects") {
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/SitePages/View.aspx?ListKey=" +
            listkey +
            "&IID=" +
            IID +
            PCODE_STRING;
        }
        else {
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

window.filesPurpose = []

function _uploadFile() {
  //

  $("input[type=file]").each(function (e) {

    var docPurpose = $(this).data("docpurpose") ? $(this).data("docpurpose") : ""
    // var filesArr = document.querySelectorAll("#" + $(this).attr("id"))

    // filesArr.forEach(el => {
    // console.log(el, " inside filesArr EEEEEEEEEEEEE")
    //
    // var myfiles = el.files
    var myfiles = document.querySelector("#" + $(this).attr("id")).files;
    console.log(validattachments, "validattachments")
    console.log(myfiles, "myfileeeeeeeeeeees")
    for (var i = 0; i < myfiles.length; i++) {
      const file = myfiles[i];
      const fileExtension = "" + file.name.split(".").pop();
      // get attribut
      if (acceptedExtensions.indexOf(fileExtension.toLowerCase()) > -1) {
        attachments.push(file);

        filesPurpose.push({ name: file.name, purpose: docPurpose })
      }
    }
    // })
  });
  console.log(attachments, 'attachments')

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
        console.log(file.name, "file name")
        console.log(filesPurpose, "filesPurpose")
        console.log(index, "index")

        debugger

        var purpose = filesPurpose[index].purpose

        if (PCODE || ICODE) {
          var code = PCODE ? PCODE : ICODE;

          Doc_Title = listkey + "-" + code;
        } else if (STCODE) {
          var code = STCODE
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
              file.name.replaceAll('�', '') +
              '" </span><span class="upload-percent"></span></p>\
            </div>'
            );
        }
        isFirst_Upload = false;
        var fieldsObj = {}
        if (isEdit && listkey == 'mainkpi') {
          var kpiPeriodType = $('#PeriodType').val()
          if (kpiPeriodType == 'monthly') {
            fieldsObj = {
              Title: Doc_Title,
              ItemID: IID,
              RelatedMonth: $('#Months').val(),
              RelatedYear: $('#Year').val(),
              docPurpose: purpose
            }
          } else if (kpiPeriodType == 'quarter') {
            fieldsObj = {
              Title: Doc_Title,
              ItemID: IID,
              RelatedQuarter: $('#Quarter').val(),
              RelatedYear: $('#Year').val(),
              docPurpose: purpose
            }
          } else if (kpiPeriodType == 'midterm') {
            fieldsObj = {
              Title: Doc_Title,
              ItemID: IID,
              RelatedMid: $('#Midterms').val(),
              RelatedYear: $('#Year').val(),
              docPurpose: purpose
            }
          } else if (kpiPeriodType == 'year') {
            fieldsObj = {
              Title: Doc_Title,
              ItemID: IID,
              RelatedActualY: $('#Years').val(),
              RelatedYear: $('#Year').val(),
              docPurpose: purpose

            }
          }
        } else {
          fieldsObj = {
            Title: Doc_Title,
            ItemID: IID,
            docPurpose: purpose
          }
        }

        return $SP()
          .list(Documents_Library)
          .createFile({
            content: file.content,
            filename: folderdirectory + "/" + new Date().toLocaleString().replaceAll("/", "-") + '_-_SystemUploadTime_-_' + file.name.replaceAll('�', ''),
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
                  // if on edit page
                  $(".errormsg").hide();
                  $(".successmsg").show();
                  $(".btn-save").addClass("success");
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
                    if (listkey == "projects") {
                      getProjectInfoToUpdateEPM()
                      // window.location =
                      //   _spPageContextInfo.webAbsoluteUrl +
                      //   "/SitePages/View.aspx?ListKey=" +
                      //   listkey +
                      //   "&IID=" +
                      //   IID +
                      //   PCODE_STRING;
                    }
                    else {
                      if (listkey == 'mainkpi') { // to update the kpi result list
                        Edit_KPI_Results.init(kpiName, kpiType, kpiSector, kpiSubSector, kpiPortfolio, kpiMainGoalRelated, kpiSubGoalRelated, kpiPerformanceAnalysis.kpiRecurrenceChanged)
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
                } else if (listkey == "projects") {
                  // if on new project page
                  New_ProjectStages_Submit.init();
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
      })
    );
  });
}
//end file upload
//file delete
window.deleteFile = {
  init: function (fileurl) {
    console.log("HERE TO DELETE FILE")
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
            if (fileCount)
              // readFiles();
              _uploadFile();
            else {
              $(".errormsg").hide();
              $(".successmsg").show();
              if (listkey == 'initiatives') {
                setTimeout(function () { // add setTimeOut to make sure that the folders created successfully on Initiative Document

                  window.location = _spPageContextInfo.webAbsoluteUrl + "/SitePages/initiativeHome.aspx?ICODE=" + ICODE
                }, 3000);

                // New_InitiativeStages_Submit.init()
              } else if (listkey == 'strategicpartnerships') {
                setTimeout(function () { // add setTimeOut to make sure that the folders created successfully on Initiative Document
                  window.location = _spPageContextInfo.webAbsoluteUrl + "/SitePages/StrategicPartnershipHome.aspx?STCODE=" + STCODE
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
  console.log("before")

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
  console.log("GetProjects in")
  projContext = PS.ProjectContext.get_current();
  // Get the projects collection.
  projects = projContext.get_projects();
  // Register the request for information that you want to run on the server.
  // This call includes an optional "Include" parameter to request only the Name, Description,
  // StartDate, and Id properties of the projects in the collection.
  projContext.load(projects, "Include(Name, Id)"); //, Description, StartDate, Id, Owner
  // Run the request on the server.
  projContext.executeQueryAsync(IterateThroughProjects, QueryFailed);
}
// Iterate through the projects collection.
function IterateThroughProjects(response) {
  // Get the enumerator and iterate through the collection.

  console.log("IterateThroughProjects in")

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
var projectowner, projectsponsor, projectDirectorUnit, projectObjectiveOwner, projectQualityOfficer, projectResponsible;

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
            newprojectsubmitted = true;
            console.log("inside GUID")

            projectowner = Edit_PInfo_Submit.g.oListItem
              .get_item("ProjectOwner")
              .get_lookupValue();

            projectsponsor = Edit_PInfo_Submit.g.oListItem
              .get_item("ProjectSponsor")
              .get_lookupValue();

            projectDirectorUnit = Edit_PInfo_Submit.g.oListItem.get_item("DirectorUnit") ? Edit_PInfo_Submit.g.oListItem.get_item("DirectorUnit").get_lookupValue() : '';
            projectObjectiveOwner = Edit_PInfo_Submit.g.oListItem.get_item("ObjectiveOwner") ? Edit_PInfo_Submit.g.oListItem.get_item("ObjectiveOwner").get_lookupValue() : '';
            projectQualityOfficer = Edit_PInfo_Submit.g.oListItem.get_item("QualityOfficer") ? Edit_PInfo_Submit.g.oListItem.get_item("QualityOfficer").get_lookupValue() : '';
            projectResponsible = Edit_PInfo_Submit.g.oListItem.get_item("ProjectResponsible") ? Edit_PInfo_Submit.g.oListItem.get_item("ProjectResponsible").get_lookupValue() : '';

            buildTeamResourcesArr.push(projectowner);
            buildTeamResourcesArr.push(projectsponsor);
            buildTeamResourcesArr.push(projectDirectorUnit)
            buildTeamResourcesArr.push(projectObjectiveOwner)
            buildTeamResourcesArr.push(projectQualityOfficer)
            buildTeamResourcesArr.push(projectResponsible)
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
    console.log("inside internal entity")

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
  console.log(PGUID, "User_ProjUID in new proj")

  // projContext.waitForQueueAsync(publishJob, 100, QueueJobSent); // comment and write a new function to change the owner on project center when create a project
  projContext.waitForQueueAsync(publishJob, 100, GetProjectsCreate);


}
///////////////////////////  work to change the owner on project center when create a project
function GetProjectsCreate() {
  projContext = PS.ProjectContext.get_current();
  projects = projContext.get_projects();
  projContext.load(projects, 'Include(Name, Id)'); //, Description, StartDate, Id, Owner
  projContext.executeQueryAsync(ChangeProjectOwnerEpmCreateProj, QueryFailed);
}


function ChangeProjectOwnerEpmCreateProj() { // change the owner on project center when create a project
  var project = projects.getById(PGUID);
  var draftProject = project.checkOut();
  var web = projContext.get_web()

  console.log(projectManagerPickedToProjectCenter, "projectManagerPickedToProjectCenter")
  console.log(projectManagerId, "projectManagerId")
  var projectManagerId = projectManagerPickedToProjectCenter.get_lookupId()
  var userPicked = web.getUserById(projectManagerId) //147


  draftProject.set_owner(userPicked)
  var publishJob = draftProject.publish(true);
  projContext.waitForQueueAsync(publishJob, 100, QueueJobSentOwnerEpmCreateProj);

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
  preinit: function () {
  },
  init: function (RqUID, resId, itemId) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("IntegrationArchive");
    var itemCreateInfo = new SP.ListItemCreationInformation();
    Archive_Data_Submit.g.oListItem = oList.addItem(itemCreateInfo);

    $(".section-container:not([data-target_list]) .CFIELD> input[type=text], .section-container:not([data-target_list]) .CFIELD> input[type=number], .section-container:not([data-target_list]) .CFIELD> input[type=float], .section-container:not([data-target_list]) .CFIELD>  input[type=date],.section-container:not([data-target_list]) .CFIELD> .datetimeinputs input[type=date],.section-container:not([data-target_list]) .CFIELD> .datetimeinputs input[type=datetime-local],.section-container:not([data-target_list]) .CFIELD> input[type=radio], .section-container:not([data-target_list]) .CFIELD> input[type=checkbox], .section-container:not([data-target_list]) .CFIELD> div[type=picker], .section-container:not([data-target_list]) .CFIELD> select[type=dropdown], .section-container:not([data-target_list]) .CFIELD>  textarea, .section-container:not([data-target_list]) .CFIELD > .multiselect-container"
    ).each(function () {
      if ($(this).attr("type") == "date") {
        if (listkey == 'projectcharter' && PCODE) {
          if ($(this).attr("id") == "BaselineStartDate" || $(this).attr("id") == "ActualStartDate") {
            if ($(this).val()) {
              var dateval = $(this).val().replace("-", "/");
              var datesId = $(this).attr("id")
              var ydate = !dateval
                ? ""
                : [dateval.slice(5, 10), dateval.slice(0, 4)]
                  .join("/")
                  .replace("-", "/");

              if (dateval) {
                Archive_Data_Submit.g.oListItem.set_item($(this).attr("id"), ydate);
              }
            }
          }
        } else if (listkey == 'initiativecards' && ICODE) {
          if ($(this).attr("id") == "StartDate" || $(this).attr("id") == "FinishDate") {
            if ($(this).val()) {
              var dateval = $(this).val().replace("-", "/");
              var datesId = $(this).attr("id")
              var ydate = !dateval
                ? ""
                : [dateval.slice(5, 10), dateval.slice(0, 4)]
                  .join("/")
                  .replace("-", "/");

              if (dateval) {
                Archive_Data_Submit.g.oListItem.set_item($(this).attr("id"), ydate);
              }
            }
          }
        }
      } else if ($(this).attr("type") == "dropdown") {
        var id = $(this).attr("id")
        if (listkey == 'projectcharter' && PCODE) {
          if (id == 'Sector' || id == 'SubSector' || id == 'RelatedInitiative') {
            var val = $(this).val()
            if (val) {
              Archive_Data_Submit.g.oListItem.set_item($(this).attr("id"), $(this).val());
            }
          }
        } else if (listkey == 'initiativecards' && ICODE) {
          if (id == 'SubSector') {
            var val = $(this).val()
            if (val) {
              Archive_Data_Submit.g.oListItem.set_item($(this).attr("id"), $(this).val());
            }
          }
        }
      } else if ($(this).attr("type") == "picker") {

      } else if ($(this).attr("type") == "multipicker") {

      }
      else if ($(this).attr("type") == "radio") {
        var id = $(this).attr("id")
        if (listkey == 'projectcharter' && PCODE) {
          if (id == 'NTP') {
            var checkedvalue = $(
              'input[id="' + $(this).attr("id") + '"]:checked'
            ).val();
            if (checkedvalue == "yes") {
              Archive_Data_Submit.g.oListItem.set_item($(this).attr("id"), "yes");
            } else if (checkedvalue == "no") {
              Archive_Data_Submit.g.oListItem.set_item($(this).attr("id"), "no");
            } else {
              Archive_Data_Submit.g.oListItem.set_item(
                $(this).attr("id"),
                checkedvalue
              );
            }
          }
        }
      } else {
        var id = $(this).attr("id")
        if (listkey == 'projectcharter' && PCODE) {
          if (id == 'Title' || id == 'Name' || id == 'Description' || id == 'ScopeOfWork' || id == 'ActualCostWorkCompleted') {
            Archive_Data_Submit.g.oListItem.set_item($(this).attr("id"), $(this).val());
          }
        } else if (listkey == 'initiativecards' && ICODE) {
          if (id == 'Title' || id == 'Name' || id == 'Description' || id == 'ProgramTotalCost' || id == 'Expenditures' || id == 'ActualCost') {
            Archive_Data_Submit.g.oListItem.set_item($(this).attr("id"), $(this).val());
          }
        }

      }
    })

    if ((listkey == 'projectcharter' && PCODE) || (listkey == 'initiativecards' && ICODE)) {
      Archive_Data_Submit.g.oListItem.set_item("RqUID", RqUID);
      Archive_Data_Submit.g.oListItem.set_item("ResponseId", resId);
      Archive_Data_Submit.g.oListItem.set_item("RelatedItemId", itemId)
    }
    Archive_Data_Submit.g.oListItem.update();
    clientContext.load(Archive_Data_Submit.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        console.log("SAVEEEEEEEEEEEED SUCCESSFULLY")
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
  g: {}
}

//



function getProjectInfoToUpdateEPM() {
  var context = SP.ClientContext.get_current();
  var dfd = $.Deferred();
  //Get list from host web
  var programList = context.get_web().get_lists().getByTitle('Projects');
  var camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name=\'Title\'/><Value Type=\'Text\'>" + PCODE + "</Value></Eq></Where></Query></View>");
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
        var projectOwnerPicker = currentItem.get_item("ProjectOwner") ? currentItem.get_item("ProjectOwner") : ''
        projectManagerPickerToEpm = currentItem.get_item("ProjectManager") ? currentItem.get_item("ProjectManager") : ''
        var projectSponsorPicker = currentItem.get_item("ProjectSponsor") ? currentItem.get_item("ProjectSponsor") : ''
        // var projectDirectorUnit = currentItem.get_item("DirectorUnit") ? currentItem.get_item("DirectorUnit") : ''
        // var projectObjectiveOwner = currentItem.get_item("ObjectiveOwner") ? currentItem.get_item("ObjectiveOwner") : ''
        // var projectResponsible = currentItem.get_item("ProjectResponsible") ? currentItem.get_item("ProjectResponsible") : ''
        // var projectQualityOfficer = currentItem.get_item("QualityOfficer") ? currentItem.get_item("QualityOfficer") : ''

      }
      if (projectOwnerPicker && !projectBuildTeamArr.includes(projectOwnerPicker.get_lookupValue())) {
        projectBuildTeamArr.push(projectOwnerPicker.get_lookupValue())
      }
      if (projectSponsorPicker && !projectBuildTeamArr.includes(projectSponsorPicker.get_lookupValue())) {
        projectBuildTeamArr.push(projectSponsorPicker.get_lookupValue())
      }
      if (projectDirectorUnit && !projectBuildTeamArr.includes(projectDirectorUnit.get_lookupValue())) {
        projectBuildTeamArr.push(projectDirectorUnit.get_lookupValue())
      }

      if (projectObjectiveOwner && !projectBuildTeamArr.includes(projectObjectiveOwner.get_lookupValue())) {
        projectBuildTeamArr.push(projectObjectiveOwner.get_lookupValue())
      }

      if (projectResponsible && !projectBuildTeamArr.includes(projectResponsible.get_lookupValue())) {
        projectBuildTeamArr.push(projectResponsible.get_lookupValue())
      }

      if (projectQualityOfficer && !projectBuildTeamArr.includes(projectQualityOfficer.get_lookupValue())) {
        projectBuildTeamArr.push(projectQualityOfficer.get_lookupValue())
      }


      context.executeQueryAsync(function () {

        Update_Project_Center.getAllResources()

      }, function (sender, args) {
        //Item updated fail
        console.log("Request Failed to get projectlist Items :" + args.get_message());
      })
    }
  })
}



var Update_Project_Center = {
  getAllResources: function () {
    $.ajax({
      url: _spPageContextInfo.webAbsoluteUrl + "/_api/ProjectServer/EnterpriseResources",
      method: "GET",
      headers: { "Accept": "application/json; odata=verbose" },
      success: function (data) {
        allEnterpriseResources = data.d.results
        console.log(allEnterpriseResources, "allEnterpriseResources allEnterpriseResources allEnterpriseResources")
        SP.SOD.registerSod('PS.ProjectContext', SP.Utilities.Utility.getLayoutsPageUrl('ps.js'));
        SP.SOD.loadMultiple(['PS.ProjectContext'], EPMProjectToUpdate);
      }
    });
  }
}

var editProjectContext = '', epmProjects, deleteProjectContext = '';

function EPMProjectToUpdate() {

  editProjectContext = PS.ProjectContext.get_current();
  epmProjects = editProjectContext.get_projects();
  editProjectContext.load(epmProjects, 'Include(Name, Id)');
  // editProjectContext.executeQueryAsync(EPMProjectEdit, QueryFailedCenter);
  editProjectContext.executeQueryAsync(delete_resources.preinit, QueryFailedCenter);


}

var ResourcesEnterprise = ''
var resourcesArrDelete = []
var globresArr = []
var delete_resources = {
  preinit: function () {
    SP.SOD.registerSod('PS.ProjectContext', SP.Utilities.Utility.getLayoutsPageUrl('ps.js'));
    SP.SOD.loadMultiple(['PS.ProjectContext'], delete_resources.init);
  },
  init: function () {

    deleteProjectContext = PS.ProjectContext.get_current();
    var oProjects = deleteProjectContext.get_projects();
    delete_resources.g.oProjectsItem = oProjects.getById(User_ProjUID); //declared inside object scope only


    ResourcesEnterprise = delete_resources.g.oProjectsItem.checkOut();

    delete_resources.g.testDuration = ResourcesEnterprise.get_projectResources()

    deleteProjectContext.load(delete_resources.g.testDuration);

    // deleteProjectContext.load(delete_resources.g.oProjectsItem);
    deleteProjectContext.executeQueryAsync(
      Function.createDelegate(this, delete_resources.onSuccess),
      Function.createDelegate(this, delete_resources.onError)
    );
  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  onSuccess: function (sender, args) {


    console.log(delete_resources.g.testDuration, "oProjectsItem")
    resourcesArrDelete = delete_resources.g.testDuration.get_data()



    Promise.all(
      resourcesArrDelete.map(function (item) {
        globresArr.push(item)
        console.log(item.get_name(), "item")
      })
    ).then(function (files) {

      delete_resourcesForupdate.init()
    }).catch(function (err) {

    })

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
  g: {}
}

var delete_resourcesForupdate = {

  init: function () {

    console.log(globresArr, "globresArr globresArr globresArr")
    deleteProjectContext.executeQueryAsync(
      Function.createDelegate(this, delete_resourcesForupdate.onSuccess),
      Function.createDelegate(this, delete_resourcesForupdate.onError)
    );

  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  onSuccess: async function (sender, args) {


    for (var i = 0; i < globresArr.length; i++) {
      globresArr[i].deleteObject()
    }


    var checkinJob = ResourcesEnterprise.update();


    deleteProjectContext.waitForQueueAsync(checkinJob, 100, EPMProjectEdit);
  }
}


function QueryFailedCenter(sender, args) {
  console.log('Request failed: ' + args.get_message());
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
        console.log(new_resource, "new_resource new_resource")
        console.log(project_resources_list, "project_resources_list project_resources_list")

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
  var web = editProjectContext.get_web()
  var projectManagerId = projectManagerPickerToEpm.get_lookupId()
  var userPicked = web.getUserById(projectManagerId) //76

  console.log(projectManagerPickerToEpm, "projectManagerPickerToEpm")
  console.log(projectManagerId, "projectManagerId")

  draftProject.set_owner(userPicked)
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

var checkinProjectEditSubmit = { // create this function to check in the project on project center before edit on project
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
        console.log("Project checked in successfully")
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