var ActualBudget = 0,
  AssignedBudget,
  phaseArray = [],
  numberofProjects = 0,
  UProjects = [],
  Riskarray = [],
  Issuearray = [],
  Deliverablesarray = [],
  Progressarray = [],
  NTasks = 0,
  RSupport = 0,
  ScheduleProjectPercentageComplete,
  projectRelatedInitiative,
  projectTypes,
  numberofyesExp,
  //project vars
  projectname,
  abrprojectname,
  phasename,
  stagename,
  projectcode,
  projectimportance,
  Pstartdate,
  Pfinishdate,
  standardisedPstartdate,
  PlannedStartDate,
  PlannedFinishDate,
  standardisedPfinishdate,
  ProgressLastModifiedDate,
  projectlength,
  projectsector,
  projectSubsector,
  projectstatus,
  ProjectSponsor,
  ProjectOwner,
  ProjectManager,
  PMORepresentative,
  Deliverablesarray = [],
  deliveredDeliverablesArrayPercent = [],
  expiredDeliverablesArrayPercent = [],
  ExpDeliverablesarray = [],
  FutDeliverablesarray = [],
  ScheduleSource,
  ProjectSPID,
  isDelDone = "disabled",
  MilestoneArr = [];

var projectProgressStatusDeliverable,
  projectProgressStatusMilestone,
  projectProgressStatusSchedule,
  ProjectActualImplementationDeliverable,
  projectPlannedImplementationDeliverable,
  projectActualImplementationMilestone,
  projectPlannedImplementationMilestone,
  projectActualImplementationSchedule,
  projectPlannedImplementationSchedule;

var years,
  months,
  days,
  duration = "",
  onLoad = true;

var getBaseLineStart,
  getBaseLineFinish,
  getBaseLineDuration,
  baselineStartDate,
  baselineFinishDate;

var checkEpmProjectHtml = "";

window.fullphasename;
var lstMonthCLicked = "";
var TLlstMonthCLicked = "",
  milestonelstMonthClicked = "";

//to handle Project Progress Status
var actualImplementationRate = 0,
  plannedImplementationRate = 0;
//
var lstMonthCLicked = "";
var TLlstMonthCLicked = "";

if (
  localStorage.getItem("lng") == null ||
  localStorage.getItem("lng") == "ar"
) {
  var No_Data = "لا يوجد";
  var SAR_Currency = "ر.س";
} else {
  var No_Data = "No Data";
  var SAR_Currency = "SAR";
}
var siteRootName = window.location.href.split("/")[4];
var POD, numberofyes, toatlamount, dforthisproj;
var stageArr = [];
var Project_Home_Info_Request = {
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".d-flex").length) {
      clearInterval(checkHomeStatusHtml);
      //username
      $(".navbar .user-name").text(
        UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join("")
      );
      $(".user-name-full").text(UserN.Title);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        Project_Home_Info_Request.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    if (window.location.href.indexOf("PCODE=") == -1) {
      // to redirect the project home without pcode to home
      window.location = "/";
    }
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle(ListArray[0].projects);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
      Project_Home_Info_Request.g.PCODE +
      "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>"
    );

    Project_Home_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Project_Home_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Project_Home_Info_Request.onSuccess),
      Function.createDelegate(this, Project_Home_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Project_Home_Info_Request.g.collListItem;
    Project_Home_Info_Request.g.listItemEnum = collListItem.getEnumerator();
    var allhtml = "",
      card1 = [],
      card3 = [],
      card4 = [],
      card5 = [],
      card6 = [];
    while (Project_Home_Info_Request.g.listItemEnum.moveNext()) {
      var oListItem = Project_Home_Info_Request.g.listItemEnum.get_current();
      ProjectSPID = oListItem.get_id();
      $(".project-info-ctx .card-header > a").attr(
        "href",
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/view.aspx?ListKey=projects&IID=" +
        oListItem.get_id() +
        "&PCODE=" +
        Project_Home_Info_Request.g.PCODE
      );

      //getting 1st stats data
      ActualBudget += oListItem.get_item("ActualBudget") || 0; //masroufa
      AssignedBudget = oListItem.get_item("ActualBudget") || 0; //total budget

      // if (oListItem.get_item('ActualBudget') != null) {
      //   $('.assigned').hide();
      //   AssignedBudget = oListItem.get_item('ActualBudget') || 0;
      // } else {
      //   AssignedBudget = oListItem.get_item('AssignedBudget') || 0;
      //   $('.actual').hide();
      // }

      numberofProjects++;

      projectRelatedInitiative = oListItem.get_item("RelatedInitiative")
        ? oListItem.get_item("RelatedInitiative")
        : No_Data;

      //project card1
      projectname = oListItem.get_item("Name") || No_Data;

      projectsector = oListItem.get_item("Sector") || No_Data;
      projectSubsector = oListItem.get_item("SubSector") || No_Data;
      projectTypes = oListItem.get_item("ProjectType") || No_Data;

      var projectsectorarr = [];

      if (localStorage.getItem("Dynamo_Internal Entities") != null) {
        projectsectorarr = JSON.parse(
          localStorage.getItem("Dynamo_Internal Entities")
        );
        projectsectorarr = projectsectorarr.filter(function (a) {
          return a.code === projectsector;
        });
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          projectsector = projectsectorarr[0].name;
        } else projectsector = projectsectorarr[0].nameEn;
      }
      var projectSubsectorarr = [];

      if (localStorage.getItem("Dynamo_Internal Entities") != null) {
        projectSubsectorarr = JSON.parse(
          localStorage.getItem("Dynamo_Internal Entities")
        );
        projectSubsectorarr = projectSubsectorarr.filter(function (a) {
          return a.code === projectSubsector;
        });
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          projectSubsector = projectSubsectorarr[0].name;
        } else projectSubsector = projectSubsectorarr[0].nameEn;
      }
      stagename = oListItem.get_item("Stage") || No_Data;

      var stagenamearr = stagename.replaceAll("__", "").split(";");
      var stagenamearrwithoutunderscoreten = stagename
        .replace(/__S10;| __S22;| __S31;/g, "")
        .split(";");

      var stageName = [],
        stageNamestr = "";
      phasename = oListItem.get_item("Phase") || No_Data;
      phase = oListItem.get_item("Phase") || No_Data;

      if (localStorage.getItem("Dynamo_Stages") != null) {
        stagearr = JSON.parse(localStorage.getItem("Dynamo_Stages") || "[]");
        stagearr = stagearr.filter((item) => stagenamearr.includes(item.code));
        stagearrwithoutunderscore = JSON.parse(
          localStorage.getItem("Dynamo_Stages") || "[]"
        );
        stagearrwithoutunderscore = stagearrwithoutunderscore.filter((item) =>
          stagenamearrwithoutunderscoreten.includes(item.code)
        );

        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          stagearrwithoutunderscore.forEach((item) =>
            stageName.push(item.name)
          );
        } else
          stagearrwithoutunderscore.forEach((item) =>
            stageName.push(item.nameEn)
          );
      }

      if (stageName.toString().split() == "") {
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          stageNamestr = "المشروع منتهي";
        } else {
          stageNamestr = "Project Completed";
        }
      } else {
        stageNamestr = stageName.toString();
      }

      if (localStorage.getItem("Dynamo_Phases") != null) {
        phasearr = JSON.parse(localStorage.getItem("Dynamo_Phases") || "[]");
        phasearr = phasearr.filter(function (a) {
          return a.code == phasename;
        });

        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          phasename = phasearr.length ? phasearr[0].name : "";
        } else phasename = phasearr.length ? phasearr[0].nameEn : "";
      }

      if (projectRelatedInitiative && projectRelatedInitiative != No_Data) {
        Get_RelatedInitiative.init();
      }

      // abrprojectname = projectname.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join('.');
      abrprojectname = projectname
        .split(" ")
        .map((word) => word[0])
        .join(".");
      projectcode = oListItem.get_item("Title") || No_Data;

      if (
        oListItem.get_item("ActualStartDate") != null &&
        oListItem.get_item("ActualFinishDate") != null
      ) {
        Pstartdate = Project_Home_Info_Request.g.dateConvert2(
          oListItem.get_item("ActualStartDate")
        );
        Pfinishdate = Project_Home_Info_Request.g.dateConvert2(
          oListItem.get_item("ActualFinishDate")
        );
      } else {
        Pstartdate = Project_Home_Info_Request.g.dateConvert2(
          oListItem.get_item("PlannedStartDate")
        );
        Pfinishdate = Project_Home_Info_Request.g.dateConvert2(
          oListItem.get_item("PlannedFinishDate")
        );
      }

      //status of project

      ProjectActualImplementationDeliverable =
        oListItem.get_item("ActualImplementationDeliverable") || 0;
      projectPlannedImplementationDeliverable =
        oListItem.get_item("PlannedImplementationDeliverable") || 0;
      projectProgressStatusDeliverable =
        oListItem.get_item("ProgressStatusDeliverable") || No_Data;
      projectActualImplementationMilestone =
        oListItem.get_item("ActualImplementationMilestone") || 0;
      projectPlannedImplementationMilestone =
        oListItem.get_item("PlannedImplementationMilestone") || 0;
      projectProgressStatusMilestone =
        oListItem.get_item("ProgressStatusMilestone") || No_Data;
      projectActualImplementationSchedule =
        oListItem.get_item("ActualImplementationSchedule") || 0;
      projectPlannedImplementationSchedule =
        oListItem.get_item("PlannedImplementationSchedule") || 0;
      projectProgressStatusSchedule =
        oListItem.get_item("ProgressStatusSchedule") || No_Data;
      //

      // to deploy status of projects depends on form field baseline
      getBaseLineStart = oListItem.get_item("BaselineStartDate")
        ? oListItem.get_item("BaselineStartDate")
        : "";
      getBaseLineFinish = oListItem.get_item("BaselineFinishDate")
        ? oListItem.get_item("BaselineFinishDate")
        : "";
      //

      baselineStartDate = Project_Home_Info_Request.g.dateConvert(
        oListItem.get_item("BaselineStartDate")
      );
      baselineFinishDate = Project_Home_Info_Request.g.dateConvert(
        oListItem.get_item("BaselineFinishDate")
      );

      var formatteStartDate =
        Project_Home_Info_Request.g.dateConvert2(getBaseLineStart);
      var formatteEndDate =
        Project_Home_Info_Request.g.dateConvert2(getBaseLineFinish);

      formatteStartDate = new Date(formatteStartDate);
      formatteEndDate = new Date(formatteEndDate);

      var projectlengthBaseLine =
        formatteEndDate.getMonth() -
        formatteStartDate.getMonth() +
        12 * (formatteEndDate.getFullYear() - formatteStartDate.getFullYear());

      var projDuration = "",
        numOfMonths = 0;

      if (Math.trunc(projectlengthBaseLine) > 0) {
        numOfMonths = Math.trunc(projectlengthBaseLine);

        projDuration += " ";
        if (numOfMonths > 1)
          projDuration += isArabic
            ? numOfMonths + " " + "شهرا"
            : numOfMonths + " Months ";
        else {
          projDuration += isArabic
            ? numOfMonths + " " + "شهرا"
            : numOfMonths + " Month ";
        }
        projDuration += " ";

        $(
          ".project-delivery-info .d-flex:nth-child(1) > span:nth-child(2)"
        ).text(projDuration);
      } else if (Math.trunc(projectlengthBaseLine) == 0) {
        var Difference_In_Time =
          getBaseLineFinish.getTime() - getBaseLineStart.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        projDuration += " ";

        if (Difference_In_Days > 1)
          projDuration += isArabic
            ? Difference_In_Days + " " + "يوما"
            : Difference_In_Days + " Days ";
        else {
          projDuration += isArabic
            ? Difference_In_Days + " " + "يوما"
            : Difference_In_Days + " Day ";
        }

        $(
          ".project-delivery-info .d-flex:nth-child(1) > span:nth-child(2)"
        ).text(projDuration);
      }

      fullphasename = oListItem.get_item("Phase") || No_Data;

      card1.push(
        '<div class="mb-0 py-3 px-4 d-flex justify-content-between align-items-center border-bottom" href="#">' +
        '<div class="d-inline-flex flex-row align-items-center">' +
        '<span class="icon-user lg d-inline-flex align-items-center text-center handlecircle circlecolor' +
        projectProgressStatusDeliverable +
        '">' +
        "</span>" +
        '<div class="d-inline-flex flex-column mx-3">' +
        '<h3 class="acc-title d-inline-flex black">' +
        projectname +
        "</h3>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<h3 data-trans-pattr4 class="Resources black initiativeProjHomeInfoTitleStyle"></h3>' +
        '<span class="des-13"><span class="complition-val initiativeProjHomeInfoValueStyle">' +
        projectcode +
        "</span></span>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<h3 data-trans-sector class="Resources black initiativeProjHomeInfoTitleStyle"></h3>' +
        '<span class="des-13"><span class="state-val initiativeProjHomeInfoValueStyle">' +
        projectsector +
        "</span></span>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<h3 data-trans-subsector class="Resources black initiativeProjHomeInfoTitleStyle"></h3>' +
        '<span class="des-13"><span class="state-val initiativeProjHomeInfoValueStyle">' +
        projectSubsector +
        "</span></span>" +
        "</div>" +
        '<span class="des-13 project-date">' +
        '<span class="start-date"><span data-trans-basestart class="Resources initiativeProjHomeInfoTitleStyle"></span><span class="px-2 initiativeProjHomeInfoValueStyle">' +
        baselineStartDate +
        "</span></span>" +
        '<span class="end-date"><span data-trans-basefinish class="Resources initiativeProjHomeInfoTitleStyle"></span><span class="px-2 initiativeProjHomeInfoValueStyle">' +
        baselineFinishDate +
        "</span></span>" +
        "</span>" +
        "</div>" +
        '<div class="mb-0 py-3 px-4 d-flex justify-content-between align-items-center border-bottom" href="#">' +
        '<div class="d-inline-flex flex-column mx-2 ' +
        phase +
        '">' +
        '<span data-trans-pattr5 class="Resources des-13 initiativeProjHomeInfoTitleStyle"></span>' +
        '<h4 class="acc-title d-inline-flex black">' +
        phasename +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span data-trans-pattr60 class="Resources des-13 initiativeProjHomeInfoTitleStyle"></span>' +
        '<h4 class="acc-title d-inline-flex black initiativeProjHomeInfoValueStyle">' +
        stageNamestr +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<h3 data-trans-relatedinitiative class="Resources black initiativeProjHomeInfoTitleStyle"></h3>' +
        '<span class="des-13 overflow-ellipsis-black" ><span class="initiativeProjHomeInfoValueStyle" id="relatedinit" style="cursor:pointer">' +
        projectRelatedInitiative +
        '</span><span class="tooltiptextblack" id="relatedinitchild">' +
        projectRelatedInitiative +
        "</span></span>" +
        "</div>" +
        "</div>" +
        //
        '<div class="mb-0 py-3 px-4 d-flex flex-wrap justify-content-between align-items-center scnd-row" href="#">' +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span class="des-13"><span data-trans-pattr56 class="Resources complition-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        '<h4 class="black actual-complete-val initiativeProjHomeInfoValueStyle">' +
        projectActualImplementationSchedule.toFixed(2) +
        "%</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span class="des-13"><span data-trans-pattr6 class="Resources state-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        '<h4 class="black initiativeProjHomeInfoValueStyle"> ' +
        projectPlannedImplementationSchedule.toFixed(2) +
        "%</h4>" + //
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2 ' +
        projectProgressStatusSchedule +
        '">' +
        '<span class="des-13"><span data-trans-pattr8 class="Resources v-important-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        "<h4 data-trans-" +
        projectProgressStatusSchedule +
        ' class="black Resources myCompletionStatusSchedual statuscolor' +
        projectProgressStatusSchedule +
        '"></h4>' + //
        "</div>" +
        "</div>" +
        '<div class="mb-0 py-3 px-4 d-flex flex-wrap justify-content-between align-items-center third-row" href="#">' +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span class="des-13"><span data-trans-pattr66 class="Resources state-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        '<h4 class="black initiativeProjHomeInfoValueStyle">' +
        projectActualImplementationMilestone.toFixed(2) +
        "%</h4>" + //
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span class="des-13"><span data-trans-pattr61 class="Resources complition-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        '<h4 class="black initiativeProjHomeInfoValueStyle">' +
        projectPlannedImplementationMilestone.toFixed(2) +
        "%</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2 ' +
        projectProgressStatusMilestone +
        '">' +
        '<span class="des-13"><span data-trans-pattr8 class="Resources v-important-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        "<h4 data-trans-" +
        projectProgressStatusMilestone +
        ' class="black Resources myCompletionStatusMilestone statuscolor' +
        projectProgressStatusMilestone +
        '"></h4>' + //
        "</div>" +
        "</div>" +
        '<div class="mb-0 py-3 px-4 d-flex flex-wrap justify-content-between align-items-center fourth-row" href="#">' +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span class="des-13"><span data-trans-pattr76 class="Resources state-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        '<h4 class="black initiativeProjHomeInfoValueStyle">' +
        ProjectActualImplementationDeliverable.toFixed(2) +
        "%</h4>" + //
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span class="des-13"><span data-trans-pattr62 class="Resources complition-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        '<h4 class="black initiativeProjHomeInfoValueStyle">' +
        projectPlannedImplementationDeliverable.toFixed(2) +
        "%</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2 ' +
        projectProgressStatusDeliverable +
        ' ">' +
        '<span class="des-13"><span data-trans-pattr8 class="Resources v-important-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        "<h4 data-trans-" +
        projectProgressStatusDeliverable +
        ' class="black Resources myCompletionStatusDelivrables statuscolor' +
        projectProgressStatusDeliverable +
        '"></h4>' + //
        "</div>" +
        "</div>"
      );
      ProgressLastModifiedDate = Project_Home_Info_Request.g.dateConvert(
        oListItem.get_item("ProgressLastModifiedDate")
      );
      $(".ProgressDate").text(ProgressLastModifiedDate);

      projectimportance = oListItem.get_item("Priority") || "nodata";
      projectstatus = oListItem.get_item("Status") || "nodata";
      ProjectSponsor = oListItem.get_item("ProjectSponsor")
        ? oListItem.get_item("ProjectSponsor").get_lookupValue()
        : No_Data;
      ProjectOwner = oListItem.get_item("ProjectOwner")
        ? oListItem.get_item("ProjectOwner").get_lookupValue()
        : No_Data;
      ProjectManager = oListItem.get_item("ProjectManager")
        ? oListItem.get_item("ProjectManager").get_lookupValue()
        : No_Data;
      PMORepresentative = oListItem.get_item("PMORepresentative")
        ? oListItem.get_item("PMORepresentative").get_lookupValue()
        : No_Data;
    }

    // hide side nav and project nav in wf
    if (isWF) {
      $(".page-nav").attr("style", "display: none !important");
      $(".sidebar").attr("style", "display: none !important");
      $(".main-panel").attr("style", "width: 100% !important");
    }

    $(".project-details-ctx .card.h-100").html(card1.join("")); // attaching card 1

    $("#PjPriority").append(
      "<span data-trans-" +
      projectimportance +
      ' class="Resources initiativeProjHomeInfoValueStyle"></span>'
    );

    $(
      ".project-info-ctx .media-body:nth-of-type(1) .icon-user > .user-name"
    ).text(
      ProjectSponsor.split(" ")
        .map((word) => word[0])
        .join(".")
    );
    $(".project-info-ctx .media-body:nth-of-type(1) p.fnt-14.reg.mx-3").text(
      ProjectSponsor
    );
    if (ProjectOwner) {
      $(
        ".project-info-ctx .media-body:nth-of-type(2) .icon-user > .user-name"
      ).text(
        ProjectOwner.split(" ")
          .map((word) => word[0])
          .join(".")
      );
    }
    $(".project-info-ctx .media-body:nth-of-type(2) p.fnt-14.reg.mx-3").text(
      ProjectOwner
    );

    if (ProjectManager) {
      $(
        ".project-info-ctx .media-body:nth-of-type(3) .icon-user > .user-name"
      ).text(
        ProjectManager.split(" ")
          .map((word) => word[0])
          .join(".")
      );
    }
    $(".project-info-ctx .media-body:nth-of-type(3) p.fnt-14.reg.mx-3").text(
      ProjectManager
    );

    if (PMORepresentative) {
      $(
        ".project-info-ctx .media-body:nth-of-type(4) .icon-user > .user-name"
      ).text(
        PMORepresentative.split(" ")
          .map((word) => word[0])
          .join(".")
      );
    }
    $(".project-info-ctx .media-body:nth-of-type(4) p.fnt-14.reg.mx-3").text(
      PMORepresentative
    );

    // card 6
    var budgetInfoTitle = "";
    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {
      budgetInfoTitle = Resources.ar["budgetinfotitle"];
    } else {
      budgetInfoTitle = Resources.en["budgetinfotitle"];
    }

    $(".project-budget-ctx .card-body > div:nth-child(1) .my-info-i").attr(
      "title",
      budgetInfoTitle
    );
    $(".project-budget-ctx .card-body > div:nth-child(1) .my-info-i").attr(
      "data-original-title",
      budgetInfoTitle
    );

    if (AssignedBudget) {
      $(
        ".project-budget-ctx .card-body > div:nth-child(1) > div > div:nth-child(2)"
      ).text(
        AssignedBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " " +
        SAR_Currency
      );
    }
    //Schedule src dropdown
    if (scheduleSrcFeatureIsOn) {
      var schedualInfo = "";
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        schedualInfo = Resources.ar["summerytasklvlone"];
      } else {
        schedualInfo = Resources.en["summerytasklvlone"];
      }

      $(".sched-head").append(
        '<div class="schedule-src-wrapper">' +
        '<span class="schedule-info"><i data-toggle="tooltip" data-html="true" title="' +
        schedualInfo +
        '" class="my-info-i fas fa-info-circle"></i></span>' +
        '<select class="schedule-src">' +
        '<option data-trans-schedepm class="Resources" value="schedual">schedual</option>' +
        '<option data-trans-schedsystem class="Resources" value="deliverables">deliverables</option>' +
        '<option data-trans-milestones class="Resources" value="milestones">milestones</option>' +
        "</select>" +
        "</div>"
      );
      // $('.schedule-src').val(User_ScheduleSource);
      $(".schedule-src").on("change", function () {
        // ProjectSchedule_Src_Submit.init($(this).val());

        if ($(this).val() == "schedual") {
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            schedualInfo = Resources.ar["summerytasklvlone"];
          } else {
            schedualInfo = Resources.en["summerytasklvlone"];
          }

          $(".fromDeliverables").hide();
          $(".fromTimeLine").show();
          $(".fromMilestones").hide();
        } else if ($(this).val() == "deliverables") {
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            schedualInfo = Resources.ar["delevrableinfoschedual"];
          } else {
            schedualInfo = Resources.en["delevrableinfoschedual"];
          }

          $(".fromDeliverables").show();
          $(".fromTimeLine").hide();
          $(".fromMilestones").hide();

          $(".fromDeliverables select#inputYear").val("");
        } else if ($(this).val() == "milestones") {
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            schedualInfo = Resources.ar["milestoneinfoschedual"];
          } else {
            schedualInfo = Resources.en["milestoneinfoschedual"];
          }

          $(".fromDeliverables").hide();
          $(".fromTimeLine").hide();
          $(".fromMilestones").show();

          $(".fromMilestones select#inputYear").val("");
        }

        $(".schedule-info > .my-info-i").attr(
          "data-original-title",
          schedualInfo
        );

        $(".tlContainer").html(`<p style="text-align:center">${No_Data}</p>`); // container of data

        // $(".tlContainer").html(`<h3 style="text-align:center">${No_Data}</h3>`); // container of data
      });
    }
    $(".navbar.page-nav.px-5 li.nav-item a:not(:visible)").parent().hide();
    if (fullphasename == "P3") {
      // $('.navbar.page-nav.px-5').append('<div class="closebtn"><button style="float: left;color:White;text-align:center;background: #853232;" class="btn pop-green close-project" style="float: left;font-size: 17px;" type="button" onclick="ProjectClosure_Submit.g.closureappend()"><span data-trans-closeproject class="Resources"></span></button></div>');
    }

    //calling other data
    Issues_Info_Request.init();
    Risks_Info_Request.init();
    Deliverables_Info_Request.init();
    StagesConfiguration_Info_Request.init();
    Contracts_Info_Request.init();
    LessonsLearned_Info_Request.init();
    Deliveries_Info_Request.init();
    Milestones_Info_Request.init();
    Tasks_Info_Request.init();
    // Invoices_Info_Request.init();
    Coc_Info_Request.init();
    // DeliveredYesInvoices_Info_Request.init();
    checkEpmProjectHtml = setInterval(function () {
      // call the function on set interval to can get the data from project center and not get the err
      EPM_Project_Data_Request.preinit();
    }, 2000);
    changeResources();
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
        },
      }
    );
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {
    PCODE:
      window.location.href.indexOf("PCODE=") > -1
        ? window.location.href.split("PCODE=")[1].split("&")[0]
        : "", // avoid the errorif there is no PCODE on url
    dateConvert: function (date) {
      if (date) {
        var local = date.getTime();
        var offset = date.getTimezoneOffset() * (60 * 1000);
        var utc = new Date(local + offset);
        var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
        var datetouse = riyadh.toLocaleString("en-US").split(",")[0].split("/");
        datetouse[0] =
          datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
        datetouse[1] =
          datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          var datetouse2 =
            datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];
        } else {
          var datetouse2 =
            datetouse[1] + "-" + datetouse[0] + "-" + datetouse[2];
        }
        return datetouse2;
      } else {
        return No_Data;
      }
    },
    dateConvert2: function (
      date //date format supported by standards
    ) {
      if (date) {
        var local = date.getTime();
        var offset = date.getTimezoneOffset() * (60 * 1000);
        var utc = new Date(local + offset);
        var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
        var datetouse = riyadh.toLocaleString("en-US").split(",")[0].split("/");
        datetouse[0] =
          datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
        datetouse[1] =
          datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
        var datetouse2 = datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1]; //yyyy-mm-dd
        return datetouse2;
      } else {
        return No_Data;
      }
    },
    kFormatter: function (num) {
      return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
        : Math.sign(num) * Math.abs(num);
    },
  },
};
var checkHomeStatusHtml = setInterval(function () {
  Project_Home_Info_Request.preinit();
}, 1000);

var Get_RelatedInitiative = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Initiatives");
    var camlQuery = new SP.CamlQuery();

    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Title\" /><Value Type=\"Text\">" +
      projectRelatedInitiative +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Get_RelatedInitiative.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_RelatedInitiative.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_RelatedInitiative.onSuccess),
      Function.createDelegate(this, Get_RelatedInitiative.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Get_RelatedInitiative.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var initName = "";
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      initName = oListItem.get_item("Name") || No_Data;
    }
    $("#relatedinit").html(initName);
    $("#relatedinitchild").html(initName);
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  g: {},
};

window.ProjectClosure_Submit = {
  preinit: function () {
    $(".wrapcomments").addClass("was-validated");
    if ($(".was-validated .form-control:invalid").length == 0) {
      ProjectClosure_Submit.init();
    }
  },
  init: function (value) {
    $(".close-project").removeClass("loader-action-success");
    $(".close-project").removeClass("loader-action-error");
    $(".close-project").addClass("loader-action");
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle(ListArray[0].projects);
    ProjectClosure_Submit.g.oListItem = oList.getItemById(ProjectSPID); //declared inside object scope only
    ProjectClosure_Submit.g.oListItem.set_item(
      "ClosureStatus",
      $(".clsprjstat").val()
    );
    ProjectClosure_Submit.g.oListItem.set_item(
      "Status",
      $(".clsprjstat").val()
    );
    $(".wrapcomments .form-control").each(function () {
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
          ProjectClosure_Submit.g.oListItem.set_item(id, ppp);
        } else if (
          ($(this).attr("id") == "ProjectOwner" && listkey == "projects") ||
          ($(this).attr("id") == "MitigationOwner" && listkey == "risks")
        ) {
          var ppp = SP.FieldUserValue.fromUser(UserN.LoginName.split("|")[1]);
          ProjectClosure_Submit.g.oListItem.set_item($(this).attr("id"), ppp);
        }
      } else if ($(this).attr("type") == "date") {
        var dateval = $(this).val().replace("-", "/");
        var ydate = !dateval
          ? ""
          : [dateval.slice(5, 10), dateval.slice(0, 4)]
            .join("/")
            .replace("-", "/");
        if (dateval)
          ProjectClosure_Submit.g.oListItem.set_item($(this).attr("id"), ydate);
      } else if ($(this).attr("type") == "radio") {
        var checkedvalue = $(
          'input[id="' + $(this).attr("id") + '"]:checked'
        ).val();
        if (checkedvalue == "yes") {
          ProjectClosure_Submit.g.oListItem.set_item($(this).attr("id"), "yes");
        } else if (checkedvalue == "no") {
          ProjectClosure_Submit.g.oListItem.set_item($(this).attr("id"), "no");
        } else
          ProjectClosure_Submit.g.oListItem.set_item(
            $(this).attr("id"),
            checkedvalue
          );
      } else if ($(this).attr("type") == "checkbox") {
        var checkedvalue = $(
          'input[id="' + $(this).attr("id") + '"]:checked'
        ).length;
        if (checkedvalue)
          ProjectClosure_Submit.g.oListItem.set_item($(this).attr("id"), true);
        else
          ProjectClosure_Submit.g.oListItem.set_item($(this).attr("id"), false);
      } else if ($(this).attr("type") == "dropdown") {
        ProjectClosure_Submit.g.oListItem.set_item(
          $(this).attr("id"),
          $(this).val()
        );
      } else if ($(this).hasClass("percentagefield")) {
        ProjectClosure_Submit.g.oListItem.set_item(
          $(this).attr("id"),
          $(this).val() / 100
        );
      } else if ($(this).attr("type") == "multiselect") {
        var myselections = [];
        $(this)
          .find("input#Revenue:checked")
          .each(function () {
            myselections.push($(this).val());
          });
        myselections = myselections.join(":::");
        ProjectClosure_Submit.g.oListItem.set_item(
          $(this).attr("myfield"),
          myselections
        );
      } else
        ProjectClosure_Submit.g.oListItem.set_item(
          $(this).attr("id"),
          $(this).val()
        );
    });
    ProjectClosure_Submit.g.oListItem.update();
    clientContext.load(ProjectClosure_Submit.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        $(".close-project").removeClass("loader-action");
        $(".close-project").addClass("loader-action-success");
        $(".popupComment").remove();
      }),
      Function.createDelegate(this, function (sender, args) {
        $("close-project").removeClass("loader-action");
        $("close-project").addClass("loader-action-error");
        console.log(
          "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
        );
      })
    );
  },
  g: {
    closureappend: function () {
      $("body").append(
        '<div class="popupComment"><div class="wrapcomments"><label data-trans-closurestatus class="Resources" ></label><select type="dropdown" id="ClosureStatus" style="direction: rtl;" class="clsprjstat form-control" onchange="ProjectClosure_Submit.g.closure_onChange(this.value);"><option data-trans-failed class="Resources" value="Failed"></option><option data-trans-cancelled class="Resources" value="Cancelled"></option><option data-trans-postponed class="Resources" value="Postponed"></option><option data-trans-succeeded class="Resources"  value="Succeeded" ' +
        isDelDone +
        '></option></select><div class="btn-wrap"><button class="commentsub btn pop-green" onclick="if( ($(\'.clsprjstat\').val() )  ){ProjectClosure_Submit.preinit()}else{$(\'.wrapcomments\').append(\'<p data-trans-pleasefill></p>\')}"><span data-trans-submit class="Resources"></span></button><button onclick="$(\'.popupComment\').remove();" class="commentsub btn pop-green rejection"><span data-trans-cancelbutton class="Resources"></span></button><span style="display:none" class="successmsg"><span data-trans-submitsuccessMsg class="Resources"></span></span></div></div></div>'
      );
      changeResources();
    },
    closure_onChange: function (value) {
      var istakeAction = value == "Postponed" ? true : false;
      if (istakeAction) {
        $(".clsprjstat").after(
          '<div class="start-finish-dates">\
                    <label data-trans-pattr1 class="Resources"></label>\
                    <input type="date" placeholder="تاريخ البدء" class="form-control SPIField" id="PlannedStartDate" max="9999-12-31" min="1900-01-01" required>\
                    <label data-trans-pattr2 class="Resources"></label>\
                    <input type="date" placeholder="تاريخ الإنتهاء" class="form-control SPIField" id="PlannedFinishDate" max="9999-12-31" min="1900-01-01" required>\
                </div>'
        );
      } else {
        $(".start-finish-dates").remove();
      }
      changeResources();
    },
  },
};
var ProjectSchedule_Src_Submit = {
  init: function (value) {
    $(".schedule-src-wrapper").removeClass("loader-action-success");
    $(".schedule-src-wrapper").removeClass("loader-action-error");
    $(".schedule-src-wrapper").addClass("loader-action");
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle(ListArray[0].projects);
    ProjectSchedule_Src_Submit.g.oListItem = oList.getItemById(ProjectSPID); //declared inside object scope only
    ProjectSchedule_Src_Submit.g.oListItem.set_item("ScheduleSource", value);
    ProjectSchedule_Src_Submit.g.oListItem.update();
    clientContext.load(ProjectSchedule_Src_Submit.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        $(".schedule-src-wrapper").removeClass("loader-action");
        $(".schedule-src-wrapper").addClass("loader-action-success");
        window.location = window.location.href;
      }),
      Function.createDelegate(this, function (sender, args) {
        $("schedule-src-wrapper").removeClass("loader-action");
        $("schedule-src-wrapper").addClass("loader-action-error");
        console.log(
          "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
        );
      })
    );
  },
  g: {},
};
//issues
var Issues_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Issues");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
      Project_Home_Info_Request.g.PCODE +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Issues_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Issues_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Issues_Info_Request.onSuccess),
      Function.createDelegate(this, Issues_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Issues_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemhtml = [
      '<li class="list-group-item  px-0 phome-btn"><a data-trans-create class="btn-add Resources" href="' +
      _spPageContextInfo.webAbsoluteUrl +
      "/sitepages/new.aspx?ListKey=issues&PCODE=" +
      Project_Home_Info_Request.g.PCODE +
      '"><i class="icon-plus"></i></a></li>',
    ],
      itemID,
      itemname,
      itemstatus,
      itemdate,
      itemuser,
      itemProjectCode,
      IssuesStatus = {
        New: "لم يبدء",
        InProgress: "جاري العمل",
        Closed: "مغلق",
        Cancelled: "ملغى",
      };
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();
      itemProjectCode = oListItem.get_item("ProjectCode") || No_Data;
      itemname = oListItem.get_item("Name") || No_Data;
      itemtitle = oListItem.get_item("Title") || No_Data;
      itemstatus = oListItem.get_item("ResolutionStatus") || No_Data;
      itemstatus = IssuesStatus[itemstatus.replace(/ /g, "")] || No_Data;
      itemdate = Project_Home_Info_Request.g.dateConvert(
        oListItem.get_item("IssueClosureDate")
      );
      itemdateraised = Project_Home_Info_Request.g.dateConvert(
        oListItem.get_item("DateRaised")
      );
      itemuser = oListItem.get_item("Owner")
        ? oListItem.get_item("Owner").get_lookupValue()
        : No_Data;
      itemhtml.push(
        '<li class="list-group-item link-arrow px-0">' +
        '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/View.aspx?ListKey=issues&IID=" +
        itemID +
        "&PCODE=" +
        itemProjectCode +
        '">' +
        '<div class="d-inline-flex flex-column">' +
        '<h3 class="acc-title d-inline-flex black">' +
        itemname +
        "</h3>" +
        '<span class="des-13"><span data-trans-pattr49 class="codespan Resources"></span>' +
        itemtitle +
        "</span>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        // '<h4 class="text-warning">' + itemdateraised + '</h4>' +
        '<span data-trans-dateraised class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        itemdateraised +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        // '<h4 class="black">' + itemdate + '</h4>' +
        '<span data-trans-dateclosure class="Resources des-13"></span>' +
        '<h4 class="black">' +
        itemdate +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
        "</div>" +
        "</a>" +
        "</li>"
      );

      //
    }
    if (itemhtml.length == 1) {
      itemhtml.push("<h3>" + No_Data + "</h3>");
    }
    $("div#pills-first > ul.list-group").html(itemhtml.join(""));
    changeResources();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {},
};
//Risks
var Risks_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Risks");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
      Project_Home_Info_Request.g.PCODE +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Risks_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Risks_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Risks_Info_Request.onSuccess),
      Function.createDelegate(this, Risks_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Risks_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemhtml = [
      '<li class="list-group-item  px-0 phome-btn"><a data-trans-create class="btn-add Resources" href="' +
      _spPageContextInfo.webAbsoluteUrl +
      "/sitepages/new.aspx?ListKey=risks&PCODE=" +
      Project_Home_Info_Request.g.PCODE +
      '"><i class="icon-plus"></i></a></li>',
    ],
      itemID,
      itemname,
      itemstatus,
      itemdate,
      itemuser,
      itemProjectCode;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();
      itemname = oListItem.get_item("Name") || No_Data;
      itemtitle = oListItem.get_item("Title") || No_Data;
      itemProjectCode = oListItem.get_item("ProjectCode") || No_Data;
      itemstatus = oListItem.get_item("Status") || No_Data;
      itemdate = Project_Home_Info_Request.g.dateConvert(
        oListItem.get_item("MitigationActualCompletionDate")
      );
      itemDateIdentified = Project_Home_Info_Request.g.dateConvert(
        oListItem.get_item("DateIdentified")
      );

      itemuser = oListItem.get_item("RiskOwner")
        ? oListItem.get_item("RiskOwner").get_lookupValue()
        : No_Data;
      itemhtml.push(
        '<li class="list-group-item link-arrow px-0">' +
        '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/View.aspx?ListKey=risks&IID=" +
        itemID +
        "&PCODE=" +
        itemProjectCode +
        '">' +
        '<div class="d-inline-flex flex-column">' +
        '<h3 class="acc-title d-inline-flex black">' +
        itemname +
        "</h3>" +
        '<span class="des-13"><span data-trans-pattr49 class="codespan Resources"></span>' +
        itemtitle +
        "</span>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        // '<h4 class="black">' + itemDateIdentified + '</h4>' +
        '<span data-trans-riskdateident class="Resources des-13"></span>' +
        '<h4 class="black">' +
        itemDateIdentified +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        // '<h4 class="text-warning">' + itemdate + '</h4>' +
        '<span data-trans-riskdateclos class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        itemdate +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
        "</div>" +
        "</a>" +
        "</li>"
      );

      //
    }
    if (itemhtml.length == 1) {
      itemhtml.push("<h3>" + No_Data + "</h3>");
    }
    $("div#pills-second > ul.list-group").html(itemhtml.join(""));
    changeResources();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },

  // Global variables
  g: {
    PCODE: window.location.href.split("/")[4],
  },
};
//Deliveries
var Deliveries_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Deliveries");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
      Project_Home_Info_Request.g.PCODE +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Deliveries_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Deliveries_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Deliveries_Info_Request.onSuccess),
      Function.createDelegate(this, Deliveries_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Deliveries_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemhtml = [
      '<li class="list-group-item  px-0 phome-btn"><a data-trans-create class="btn-add Resources" href="' +
      _spPageContextInfo.webAbsoluteUrl +
      "/sitepages/new.aspx?ListKey=deliveries&PCODE=" +
      Project_Home_Info_Request.g.PCODE +
      '"><i class="icon-plus"></i></a></li>',
    ],
      itemID,
      item1,
      item2,
      item3,
      item4,
      itemProjectCode,
      ExpectedExchange = 0,
      Amount = 0,
      Deliverable;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();
      itemProjectCode = oListItem.get_item("ProjectCode") || No_Data;
      item1 = oListItem.get_item("Name") || No_Data;
      item2 = oListItem.get_item("Title") || No_Data;
      item3 = Project_Home_Info_Request.g.dateConvert(
        oListItem.get_item("DeliveryDate")
      );
      item4 = oListItem.get_item("PercentageOfDelivery") || No_Data;
      Amount = oListItem.get_item("Amount");
      Deliverable = oListItem.get_item("Deliverable");
      itemhtml.push(
        '<li class="list-group-item link-arrow px-0">' +
        '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/View.aspx?ListKey=deliveries&IID=" +
        itemID +
        "&PCODE=" +
        itemProjectCode +
        '">' +
        '<div class="d-inline-flex flex-column">' +
        '<h3 class="acc-title d-inline-flex black">' +
        item1 +
        "</h3>" +
        '<span class="des-13"><span data-trans-pattr49 class="codespan Resources"></span>' +
        item2 +
        "</span>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        // '<h4 class="black">' + item4 + '</h4>' +
        '<span data-trans-amount class="Resources des-13"></span>' +
        '<h4 class="black">' +
        item4 +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        // '<h4 class="text-warning">' + item3 + '</h4>' +
        '<span  data-trans-pattr31 class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        item3 +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
        "</div>" +
        "</a>" +
        "</li>"
      );

      for (i = 0; i < ExpDeliverablesarray.length; i++) {
        if (ExpDeliverablesarray[i].Code == Deliverable) {
          ExpectedExchange += Amount;
        }
      }
    }

    if (itemhtml.length == 1) {
      itemhtml.push("<h3>" + No_Data + "</h3>");
    }
    $("div#pills-third > ul.list-group").html(itemhtml.join(""));
    changeResources();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {},
};
//Contracts
var Contracts_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Contracts");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
      Project_Home_Info_Request.g.PCODE +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Contracts_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Contracts_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Contracts_Info_Request.onSuccess),
      Function.createDelegate(this, Contracts_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Contracts_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemhtml = [
      '<li class="list-group-item  px-0 phome-btn"><a data-trans-create class="btn-add Resources" href="' +
      _spPageContextInfo.webAbsoluteUrl +
      "/sitepages/new.aspx?ListKey=contracts&PCODE=" +
      Project_Home_Info_Request.g.PCODE +
      '"><i class="icon-plus"></i></a></li>',
    ],
      itemID,
      item1,
      item2,
      item3,
      item4,
      itemProjectCode;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();
      itemProjectCode = oListItem.get_item("ProjectCode") || No_Data;
      item1 = oListItem.get_item("Name") || No_Data;
      item2 = oListItem.get_item("Title") || No_Data;
      item3 = Project_Home_Info_Request.g.dateConvert(
        oListItem.get_item("StartDate")
      );
      item3date2 = Project_Home_Info_Request.g.dateConvert(
        oListItem.get_item("EndDate")
      );
      item4 = oListItem.get_item("TypeOfContract") || No_Data;
      itemhtml.push(
        '<li class="list-group-item link-arrow px-0">' +
        '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/View.aspx?ListKey=contracts&IID=" +
        itemID +
        "&PCODE=" +
        itemProjectCode +
        '">' +
        '<div class="d-inline-flex flex-column">' +
        '<h3 class="acc-title d-inline-flex black">' +
        item1 +
        "</h3>" +
        '<span class="des-13"><span data-trans-pattr49 class="codespan Resources"></span>' +
        item2 +
        "</span>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span data-trans-pattr50 class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        item3 +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span data-trans-dateend class="Resources des-13"></span>' +
        '<h4 class="black">' +
        item3date2 +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
        "</div>" +
        "</a>" +
        "</li>"
      );

      //
    }
    if (itemhtml.length == 1) {
      itemhtml.push("<h3>" + No_Data + "</h3>");
    }
    $("div#pills-fifth > ul.list-group").html(itemhtml.join(""));
    changeResources();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {},
};
//Lessons Learned
var LessonsLearned_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("Lessons Learned");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
      Project_Home_Info_Request.g.PCODE +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    LessonsLearned_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(LessonsLearned_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, LessonsLearned_Info_Request.onSuccess),
      Function.createDelegate(this, LessonsLearned_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = LessonsLearned_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemhtml = [
      '<li class="list-group-item  px-0 phome-btn"><a data-trans-create class="btn-add Resources" href="' +
      _spPageContextInfo.webAbsoluteUrl +
      "/sitepages/new.aspx?ListKey=lessonslearned&PCODE=" +
      Project_Home_Info_Request.g.PCODE +
      '"><i class="icon-plus"></i></a></li>',
    ],
      itemID,
      item1,
      item2,
      item3,
      item4,
      itemProjectCode;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();
      itemProjectCode = oListItem.get_item("ProjectCode") || No_Data;
      item1 = oListItem.get_item("Title") || No_Data;
      item2 = oListItem.get_item("ReferenceNumber") || No_Data;
      item3 = Project_Home_Info_Request.g.dateConvert(
        oListItem.get_item("Date")
      );
      item4 = oListItem.get_item("Source") || "nodata";
      // item4 = lessonLearnedSource[item4.replace(/ /g, "")] || No_Data;
      itemhtml.push(
        '<li class="list-group-item link-arrow px-0">' +
        '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/View.aspx?ListKey=lessonslearned&IID=" +
        itemID +
        '">' +
        '<div class="d-inline-flex flex-column">' +
        '<h3 class="acc-title d-inline-flex black">' +
        item2 +
        "</h3>" +
        '<span class="des-13"><span data-trans-pattr49 class="codespan Resources"></span>' +
        item1 +
        "</span>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        // '<h4 class="text-warning">' + item3 + '</h4>' +
        '<span data-trans-pattr53 class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        item3 +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        // '<h4 data-trans-' + item4 + ' class="black Resources"></h4>' +
        '<span data-trans-pattr54 class="Resources des-13"></span>' +
        "<h4 data-trans-" +
        item4 +
        ' class="black Resources"></h4>' +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
        "</div>" +
        "</a>" +
        "</li>"
      );

      //
    }
    if (itemhtml.length == 1) {
      itemhtml.push("<h3>" + No_Data + "</h3>");
    }
    $("div#pills-sixth > ul.list-group").html(itemhtml.join(""));
    changeResources();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {},
};
//Deliverables
var Deliverables_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Deliverables");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
      Project_Home_Info_Request.g.PCODE +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='DeliveredDate' Ascending='False' /></OrderBy></Query></View>"
    );

    Deliverables_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Deliverables_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Deliverables_Info_Request.onSuccess),
      Function.createDelegate(this, Deliverables_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Deliverables_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    NODelivrables = 0;
    NDelivrables = 0;
    NDelevered = 0;
    POD = 0;

    if (projectActualBudget) {
      var itemhtml = [
        '<li class="list-group-item  px-0 phome-btn"><a data-trans-create class="btn-add Resources" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/new.aspx?ListKey=deliverables&PCODE=" +
        Project_Home_Info_Request.g.PCODE +
        '"><i class="icon-plus"></i></a></li>',
      ];
    }else{
      var itemhtml = []
    }

    var itemID,
      itemname,
      itemstatus,
      itemdate,
      itemdatevalidation,
      delevrableDateExpired,
      itemdelivered;

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      itemID = oListItem.get_id();
      itemProjectCode = oListItem.get_item("ProjectCode") || No_Data;
      itemname = oListItem.get_item("Name") || No_Data;
      itemtitle = oListItem.get_item("Title") || No_Data;
      itemstatus = oListItem.get_item("Status") || No_Data;
      itemdelivered = oListItem.get_item("Delivered") || "nodata";
      itemweight = oListItem.get_item("Weight")
        ? oListItem.get_item("Weight") + "%"
        : No_Data;

      itemdate = Project_Home_Info_Request.g.dateConvert(
        oListItem.get_item("DeliveredDate")
      );
      // CommittedDate = oListItem.get_item("ActualDate");

      itemhtml.push(
        '<li class="list-group-item link-arrow px-0">' +
        '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/View.aspx?ListKey=deliverables&IID=" +
        itemID +
        "&PCODE=" +
        itemProjectCode +
        '">' +
        '<div class="d-inline-flex flex-column">' +
        '<h3 class="acc-title d-inline-flex black">' +
        itemname +
        "</h3>" +
        '<span class="des-13"><span data-trans-pattr49 class="codespan Resources"></span>' +
        itemtitle +
        "</span>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<h4 class="black Resources">' +
        itemdate +
        "</h4>" +
        '<span data-trans-actualdate class="Resources des-13"></span>' +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<h4 class="text-warning">' +
        itemweight +
        "</h4>" +
        '<span data-trans-weight class="Resources des-13"></span>' +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        "<h4 data-trans-" +
        itemdelivered +
        ' class="black Resources"></h4>' +
        '<span data-trans-deliveredyesno class="Resources des-13"></span>' +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
        "</div>" +
        "</a>" +
        "</li>"
      );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      delevrableDateExpired = Project_Home_Info_Request.g.dateConvert2(
        oListItem.get_item("DeliveredDate") // change Delivered Date to Actual Date
      );
      delevrableDateExpired = Math.round(
        (new Date() - new Date(delevrableDateExpired)) / (1000 * 60 * 60 * 24)
      ); //difference in days

      // to get sum of weight of all Expired delevrables that are expired
      if (delevrableDateExpired > 0) {
        // expired deliverables
        expiredDeliverablesArrayPercent.push({
          expiredDelivrableWeight: oListItem.get_item("Weight"),
        });
      }
      // if (delevrableDateExpired >= 0 && itemdelivered == 'yes') // expired deliverables
      if (itemdelivered == "yes") {
        // expired deliverables
        deliveredDeliverablesArrayPercent.push({
          deliveredDelivrableWeight: oListItem.get_item("Weight"),
        });
      }

      if (delevrableDateExpired > 0) {
        // expired deliverables
        ExpDeliverablesarray.push({
          delivered: oListItem.get_item("Delivered"),
          ammount: oListItem.get_item("Weight"),
          date: itemdate,
          Code: oListItem.get_item("Title"),
        });
      } // future deliverables
      else {
        FutDeliverablesarray.push({
          delivered: oListItem.get_item("Delivered"),
          ammount: oListItem.get_item("Weight"),
        });
      }

      Deliverablesarray.push({
        name: itemname,
        delivered: oListItem.get_item("Delivered"),
        ammount: oListItem.get_item("Weight"),
        date: itemdate,
        Code: oListItem.get_item("Title"),
      });
      NDelivrables++;
    }

    if (itemhtml.length == 1 || itemhtml.length == 0) {
      itemhtml.push("<h3>" + No_Data + "</h3>");
    }
    $("div#pills-fourth > ul.list-group").html(itemhtml.join(""));

    // calc NTF

    actualImplementationRate = deliveredDeliverablesArrayPercent.reduce(
      (accum, item) => accum + item.deliveredDelivrableWeight,
      0
    );
    var numberofyesAll = ExpDeliverablesarray.filter(
      (v) => v.delivered === "yes"
    );
    var All_numberofyesAll = Deliverablesarray.filter(
      (v) => v.delivered === "Yes"
    );

    // total Amount Of Weight All Expired Delevrable >> to be approved by bachar
    plannedImplementationRate = expiredDeliverablesArrayPercent.reduce(
      (accum, item) => accum + item.expiredDelivrableWeight,
      0
    );

    $("button.updateprogress").on("click", function () {
      if (!isWF) {
        Update_ProjectStatus_Service.init(); // to update project status from services
      }
    });
    $("button.updateprogress").prop("disabled", false);
    //sarf mutawaka3
    numberofyesExp = ExpDeliverablesarray.filter((v) => v.delivered === "yes");

    var SFpercent =
      Math.round(
        numberofyesExp.reduce(
          (accum, item) => accum + (item.weight * 100) / AssignedBudget,
          0
        )
      ) || 0;

    if (SFpercent <= 50) {
      var degreeSF = (SFpercent * 360) / 50;
      $(
        ".project-budget-ctx .card-body > div:nth-child(2) > div:nth-child(1) > span.progress-circle-right > span"
      ).attr("style", "transform:rotate(" + degreeSF + "deg);");
    } else {
      $(
        ".project-budget-ctx .card-body > div:nth-child(2) > div:nth-child(1) > span.progress-circle-right > span"
      ).attr("style", "transform:rotate(360deg);");
      var degreeSF = ((SFpercent - 50) * 360) / 50;
      $(
        ".project-budget-ctx .card-body > div:nth-child(2) > div:nth-child(1) > span.progress-circle-left > span"
      ).attr("style", "transform:rotate(" + degreeSF + "deg);");
    }
    //taklifa
    var taklifa =
      Math.round(
        numberofyesAll.reduce((accum, item) => accum + item.ammount, 0)
      ) || 0;
    var mizaniyamutabakia = AssignedBudget - taklifa;
    var nisbatmutabakia = Math.round(
      (mizaniyamutabakia * 100) / AssignedBudget
    );
    if (nisbatmutabakia <= 50) {
      var degreemutabakia = (nisbatmutabakia * 360) / 50;
      $(
        ".project-budget-ctx .card-body > div:nth-child(3) > div:nth-child(1) > span.progress-circle-right > span"
      ).attr("style", "transform:rotate(" + degreemutabakia + "deg);");
    } else {
      $(
        ".project-budget-ctx .card-body > div:nth-child(3) > div:nth-child(1) > span.progress-circle-right > span"
      ).attr("style", "transform:rotate(360deg);");
      var degreemutabakia = ((nisbatmutabakia - 360) * 360) / 50;
      $(
        ".project-budget-ctx .card-body > div:nth-child(4) > div:nth-child(1) > span.progress-circle-left > span"
      ).attr("style", "transform:rotate(" + degreemutabakia + "deg);");
    }

    var NoD, NoDY, NoDarray, statustxt, statusclass;
    for (var i = 0; i < UProjects.length; i++) {
      dforthisproj = Deliverablesarray.filter((v) => v.pcode === UProjects[i]);
      toatlamount = dforthisproj.reduce(
        (accum, item) => accum + item.ammount,
        0
      );
      numberofyes = dforthisproj.filter((v) => v.delivered === "yes");
      POD =
        Math.round(
          numberofyes.reduce(
            (accum, item) => accum + (item.ammount * 100) / toatlamount,
            0
          )
        ) || 0;

      Progressarray.push({
        pcode: UProjects[i],
        progress: POD,
      });

      $('.inner-data3 .inner-val[data-prname="' + UProjects[i] + '"]').text(
        POD + "%"
      );
    }
    //Time Line
    var sdlyear = "",
      iscuryear = true;
    var yearExcist = false;
    var delivrablesYears = [];
    $(".fromDeliverables select#inputYear").html("");

    $(".fromDeliverables select#inputYear").append(
      `<option data-trans-year class="Resources" value=""></option>`
    );

    Deliverablesarray.forEach(function (dl, i) {
      //appending years
      var dataYear = isArabic ? dl.date.split("-")[0] : dl.date.split("-")[2];

      delivrablesYears.push(dataYear);
      if (sdlyear != dataYear) {
        if (dataYear == new Date().getFullYear()) {
          iscuryear = true;
        } else {
          iscuryear = false;
        }

        $(".fromDeliverables select#inputYear").append(
          new Option(dataYear, dataYear, iscuryear, iscuryear)
        );
        yearExcist = true;
      }
      sdlyear = dataYear;
    });

    // Deliverables_Info_Request.g.dltimeline(new Date().getFullYear());

    $(".fromDeliverables select#inputYear").on("change", function () {
      $(`#month-${lstMonthCLicked}`).css("background", "#F0F3F8");
      $(".tlContainer").html(""); // to reset the data when change on year
      Deliverables_Info_Request.g.dltimeline($(this).val());
    });

    if (!yearExcist) {
      // to append no data in drop down when there is no data
      $(".fromDeliverables select#inputYear").append(
        new Option(No_Data, No_Data, iscuryear, iscuryear)
      );
    }
    // StagesConfiguration_Info_Request.init();
    changeResources();
    if (All_numberofyesAll.length == Deliverablesarray.length) isDelDone = "";
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {
    dltimeline: function (year) {
      $(".fromDeliverables .milestone-item").hide();
      $(".fromDeliverables .milestone-item[data-year=" + year + "]").show();
      $(".fromDeliverables .time-box").remove();
      var dlyear = "",
        dlmonth = "",
        curdl = $("body"),
        dlhtml = "",
        datetoshow = "";

      // click new timeline
      var monthsArr = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ]; // handle the click on all months

      var istimelineData = false; // check if there is a data in time line or no

      $(".tlContainer").html(""); // container of data
      // $(`.fromDeliverables .month-list .monthBadge`).html("")

      monthsArr.forEach((el) => {
        $(`.fromDeliverables .month-list-ctx #month-${el}`).click(function () {
          istimelineData = false;
          $(`.fromDeliverables .month-list-ctx #month-${lstMonthCLicked}`).css(
            "background",
            "#F0F3F8"
          ); // return the previous background color to the origin color
          var dateTitle = "",
            nameTitle = "";
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            dateTitle = "التاريخ";
            nameTitle = "الاسم";
          } else {
            dateTitle = "Date";
            nameTitle = "Name";
          }
          dlhtml = '<table style="width:100%">';
          dlhtml +=
            '<tr class="timeLineTableHeader"><th style="border:1px solid #ddd">' +
            dateTitle +
            '</th><th style="border:1px solid #ddd">' +
            nameTitle +
            "</th></tr>";
          $(".tlContainer").html("");
          $(`.fromDeliverables .month-list-ctx #month-${el}`).css(
            "background",
            "#D0D0D0"
          ); // change background color when click on month
          lstMonthCLicked = el;
          Deliverablesarray.forEach(function (dl, i) {
            // datetoshow = dl.date.split('/'), datetoshow = datetoshow[0] + '/' + datetoshow[1];
            var dataYear = isArabic
              ? dl.date.split("-")[0]
              : dl.date.split("-")[2];
            var dataDay = isArabic
              ? dl.date.split("-")[2]
              : dl.date.split("-")[0];
            (datetoshow = dl.date.split("-")),
              isArabic
                ? (datetoshow = datetoshow[1] + "-" + dataDay)
                : dataDay + "-" + datetoshow[1];
            dlyear = dataYear;

            if (dlyear == year) {
              if (dl.date.split("-")[1] == 10) {
                // to handle the data on october month
                if (el == dl.date.split("-")[1]) {
                  istimelineData = true;
                  dlhtml +=
                    '<tr><td class="p-date" style="border:1px solid #ddd">' +
                    datetoshow +
                    "</td>" +
                    '<td class="p-title" style="border:1px solid #ddd">' +
                    dl.name +
                    "</td></tr>";
                }
              } else {
                if (el == dl.date.split("-")[1].replace("0", "")) {
                  istimelineData = true;
                  dlhtml +=
                    '<tr><td class="p-date" style="border:1px solid #ddd">' +
                    datetoshow +
                    "</td>" +
                    '<td class="p-title" style="border:1px solid #ddd">' +
                    dl.name +
                    "</td></tr>";
                }
              }
            }
            if (i == Deliverablesarray.length - 1) {
              dlhtml += "</table>";
              $(".tlContainer").append(dlhtml);
              if (!istimelineData) {
                $(".timeLineTableHeader").css("display", "none"); // hide the table if there is no data
                $(".fromDeliverables .tlContainer").html(
                  `<p style="text-align:center">${No_Data}</p>`
                );
              }
              $(".fromDeliverables .time-box").hover(
                function () {
                  $(".fromDeliverables .delivery-timeline").css(
                    "overflow",
                    "initial"
                  );
                },
                function () {
                  $(".fromDeliverables .delivery-timeline").css(
                    "overflow",
                    "hidden"
                  );
                }
              );
            }
          });
        });
      });

      $(`.fromDeliverables .month-list-ctx #month-1`).click();
      $(`.fromDeliverables .month-list .monthBadge`).remove(); // to remove star on the month on change to reset

      ///

      Deliverablesarray.forEach(function (dl, i) {
        var delivYear = isArabic
          ? dl.date.split("-")[0]
          : dl.date.split("-")[2];

        if (delivYear == year) {
          var targetMonth = "";
          if (dl.date.split("-")[1] == 10) {
            targetMonth = dl.date.split("-")[1];
          } else {
            targetMonth = dl.date.split("-")[1].replace("0", "");
          }

          if (
            $(
              `.fromDeliverables .month-list #month-${targetMonth} > .monthBadge`
            ).length == 0
          ) {
            // to add star on the month that have value
            $(`.fromDeliverables .month-list #month-${targetMonth}`).prepend(
              `<span class="monthBadge">*</span>`
            );
          }
        }
      });
    },
  },
};

//get stages and project types from stage configuration list
//StagesConfiguration
var StagesConfiguration_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("Stages Configuration");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><OrderBy><FieldRef Name='StageCode' Ascending='True' /></OrderBy></Query></View>"
    );
    StagesConfiguration_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(StagesConfiguration_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, StagesConfiguration_Info_Request.onSuccess),
      Function.createDelegate(this, StagesConfiguration_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = StagesConfiguration_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var InternalstagesArr = [];
    var ExternalstageArr = [];

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      stages = oListItem.get_item("StageCode");
      projectType = oListItem.get_item("ProjectType");

      // console.log('projectTypes', projectTypes);

      if (projectType == projectTypes || projectType == null) {
        stageArr.push(stages);
      }
    }
    // console.log('stageArr', stageArr);
    Stages_Data_Request.init();
  },
  onError: function (sender, args) {
    // console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Global variables
  g: {
    PCODE: window.location.href.split("/")[4],
  },
};
//end stage configuration
//phases-stages cards check boxes
var Stages_Data_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Stages_Data_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var stage,
      phase,
      phaseprev,
      phasehtml = "",
      stagehtml = "",
      ischecked,
      encodedphaename;
    var count = 0;

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      phase = oListItem.get_item("PhaseCode");
      encodedphaename = encodeURI(phase.replace(/\s/g, "")).replace(
        /[^a-zA-Z ]/g,
        ""
      );
      stage = oListItem.get_item("StageCode");
      var stagename, phasename;
      var stagearr = [],
        phasearr = [];

      if (localStorage.getItem("Dynamo_Stages") != null) {
        stagearr = JSON.parse(localStorage.getItem("Dynamo_Stages") || "[]");
        stagearr = stagearr.filter(function (item) {
          return item.code == stage;
        });
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          stagename = stagearr[0].name;
        } else stagename = stagearr[0].nameEn;
      }

      if (localStorage.getItem("Dynamo_Phases") != null) {
        phasearr = JSON.parse(localStorage.getItem("Dynamo_Phases") || "[]");
        phasearr = phasearr.filter(function (a) {
          return a.code == phase;
        });

        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          phasename = phasearr[0] ? phasearr[0].name : "";
        } else phasename = phasearr[0] ? phasearr[0].nameEn : "";
      }

      count++;
      ischecked = oListItem.get_item("Decision") ? "checked=checked" : "";
      if (phaseprev != phase) {
        phasehtml +=
          '<a class="new-Phase nav-link fnt-13 bold show ' +
          phase +
          '" id="v-pills-' +
          phase +
          '-tab" data-toggle="pill" href="#' +
          phase +
          '" role="tab" aria-controls="v-pills-' +
          phase +
          '" aria-selected="false">' +
          '<span class="percent-complete">100%</span><span class="px-2" style="unicode-bidi: isolate;">' +
          phasename +
          "</span>" +
          "</a>";
        stagehtml +=
          '</div></div><div class="new-Phase-Values tab-pane fade show" id="' +
          phase +
          '" role="tabpanel" aria-labelledby="v-pills-' +
          phase +
          '-tab">' +
          '<div class="form-check custom-check d-flex align-items-center">' +
          '<input class="form-check-input" type="checkbox" value="" id="defaultCheck' +
          phase +
          '" disabled="" ' +
          ischecked +
          ">" +
          '<label class="form-check-label" for="defaultCheck' +
          phase +
          '">' +
          stagename +
          "</label>" +
          "</div>";
      } else {
        stagehtml +=
          '<div class="form-check custom-check d-flex align-items-center">' +
          '<input class="form-check-input" type="checkbox" value="" id="defaultCheck' +
          phase +
          '" ' +
          ischecked +
          ' disabled="" ' +
          ischecked +
          ">" +
          '<label class="form-check-label" for="defaultCheck' +
          phase +
          '">' +
          stagename +
          "</label>" +
          "</div>";
      }
      phaseprev = oListItem.get_item("PhaseCode");

      Stages_Data_Request.g.StagesArray.push({
        phase: oListItem.get_item("PhaseCode"),
        stage: oListItem.get_item("StageCode"),
      });
    }
    stagehtml += "</div>";
    var nodata = '<h3 class="nodata">' + No_Data + "</h3>";
    if (count > 0) {
      $(".project-stages-ctx div#v-pills-tab").html(phasehtml);
      $(".project-stages-ctx div#v-pills-tabContent").html(stagehtml);
    } else {
      $(".project-status-info").html(nodata);
    }
    changeResources();
    var isactive = false;
    $(".project-stages-ctx div#v-pills-tabContent > .tab-pane").each(
      function () {
        //
        var Progress = $(this).find("[checked=checked]").length;
        var Total = $(this).find(".form-check-input").length;
        Progress = Math.round((Progress * 100) / Total);
        // console.log(Progress);
        //console.log(Progress+'test'+Total);
        if ($(this).attr("id").indexOf("Execution") > -1) {
          //execution is based on deliverables
          $(
            'div.Phase[href="#' + $(this).attr("id") + '"] span.percentage'
          ).append(POD + "%");
          $(
            ".project-stages-ctx div#v-pills-tab > ." +
            $(this).attr("id") +
            " .percent-complete"
          ).text(Progress + "%");
        } else {
          $(
            ".project-stages-ctx div#v-pills-tab > ." +
            $(this).attr("id") +
            " .percent-complete"
          ).text(Progress + "%");
        }
        if (Progress != 100 && !isactive) {
          isactive = true;
          $(
            ".project-stages-ctx div#v-pills-tab > ." + $(this).attr("id")
          ).addClass("active");
          $(this).addClass("active");
          // $(this).find('.Stage-content').addClass('active');
        }
      }
    );
    if (!isactive) {
      $(".new-Phase:last-child").addClass("active");
      $(".new-Phase-Values:last-child").addClass("show active");
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
      .getByTitle("Project Stages");
    var camlQuery = new SP.CamlQuery();

    Query =
      "<View><Query><Where><And><Eq><FieldRef Name='ProjectCode'/><Value Type='Text'>" +
      Project_Home_Info_Request.g.PCODE +
      '</Value></Eq><In><FieldRef Name="StageCode" /><Values>';
    stageArr.forEach(function (item) {
      Query += '<Value Type="Text">' + item + "</Value>";
    });
    Query +=
      "</Values></In></And></Where><OrderBy><FieldRef Name='StageCode' Ascending='True' /></OrderBy></Query><RowLimit>100</RowLimit></View>";

    camlQuery.set_viewXml(Query);
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
//end phases-stages cards check boxes
//milestones
var Milestones_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Milestones");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
      Project_Home_Info_Request.g.PCODE +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='CommittedDate' Ascending='False' /></OrderBy></Query></View>"
    );
    Milestones_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Milestones_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Milestones_Info_Request.onSuccess),
      Function.createDelegate(this, Milestones_Info_Request.onError)
    );
  },
  onSuccess: async function (sender, args) {
    var collListItem = Milestones_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemhtml = [],
      itemID,
      itemname,
      itemtitle,
      itemPlannedClosureDate,
      itemstatus,
      itemdate,
      itemdate2,
      itemuser,
      allMilestonesArr = [],
      isactive;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();
      itemname = oListItem.get_item("Name") || No_Data;
      itemtitle = oListItem.get_item("Title") || "";
      itemPlannedClosureDate =
        Project_Home_Info_Request.g.dateConvert2(
          oListItem.get_item("PlannedDate")
        ) || "";
      itemPlannedClosureDateByLanguage =
        Project_Home_Info_Request.g.dateConvert(
          oListItem.get_item("PlannedDate")
        ) || "";
      itemdate = Project_Home_Info_Request.g.dateConvert(
        oListItem.get_item("CommittedDate")
      );
      itemdate2 = new Date(
        Project_Home_Info_Request.g.dateConvert2(
          oListItem.get_item("CommittedDate")
        )
      );
      itemdate2 = Math.floor(
        (itemdate2 - new Date(itemdate2.getFullYear(), 0, 0)) /
        (1000 * 60 * 60 * 24)
      ); //number of day
      itemdate2 = (itemdate2 * 100) / 365;
      var dataYear = isArabic ? itemdate.split("-")[0] : itemdate.split("-")[2];

      // to scedual section in project home
      MilestoneArr.push({
        name: itemname,
        delivered: oListItem.get_item("Delivered"),
        // ammount: oListItem.get_item("Weight"),
        date: itemPlannedClosureDateByLanguage,
        Code: itemtitle,
      });

      // Milestones_Info_Request.g.dltimeline(new Date().getFullYear());
      $(".fromMilestones select#inputYear").on("change", function () {
        $(`#month-${milestonelstMonthClicked}`).css("background", "#F0F3F8");
        $(".tlContainer").html(""); // to reset the data when change on year
        Milestones_Info_Request.g.dltimeline($(this).val());
      });

      // to validation in milestone 1 month

      if (itemPlannedClosureDate) {
        allMilestonesArr.push({
          id: itemID,
          name: itemname,
          title: itemtitle,
          date: itemPlannedClosureDate,
        });
      }

      isactive =
        dataYear == new Date().getFullYear() ? "" : 'style="display:none"';
      itemhtml.push(
        '<div class="milestone-item mb-3" ' +
        isactive +
        ' data-year="' +
        dataYear +
        '">' +
        '<div class="row mx-0">' +
        '<div class="milestone-label col-auto fnt-13 w-3 mb-1" style="width:130px"><span class="milestone-label">' +
        itemname +
        "</span></div>" +
        '<div class="milestone-duration col-6 col-xl-auto fnt-13 black order-xl-last mb-1">' +
        '<span class="m-start-date">' +
        itemdate +
        "</span>" +
        '<!--<i class="fa m-arrow"></i>' +
        '<span class="m-end-date">15/7/2020</span>-->' +
        "</div>" +
        '<div class="col-12 col-xl-5 state-bar align-items-center order-last order-xl-1 mb-1">' +
        '<div class="position-relative d-flex flex-row-reverse mt-1">' +
        '<div class="state-progress-line bg-primary">' +
        "</div>" +
        '<div class="state-progress-bar bg-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
        itemdate +
        '" style="width:50%;right:' +
        itemdate2 +
        '%!important;">' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>"
      );

      // work on validation every month should have a milestone

      //
    }

    if (itemhtml.length == 0) {
      itemhtml.push("<h3>" + No_Data + "</h3>");
    }
    // $('.project-milestone').html(itemhtml.join(''));

    //work on milestone schedual section
    var sdlyear = "",
      iscuryear = true;
    var yearExcist = false;

    $(".fromMilestones select#inputYear").html("");

    $(".fromMilestones select#inputYear").append(
      `<option data-trans-year class="Resources" value=""></option>`
    );

    MilestoneArr.forEach(function (dl, i) {
      //appending years
      // var dataYear = dl.date.split("-")[0];
      var dataYear = isArabic ? dl.date.split("-")[0] : dl.date.split("-")[2];

      if (sdlyear != dataYear) {
        if (dataYear == new Date().getFullYear()) iscuryear = true;
        else iscuryear = false;
        $(".fromMilestones select#inputYear").append(
          new Option(dataYear, dataYear, iscuryear, iscuryear)
        );
        yearExcist = true;
      }
      sdlyear = dataYear;
    });

    if (!yearExcist) {
      // to append no data in drop down when there is no data
      $(".fromMilestones select#inputYear").append(
        new Option(No_Data, No_Data, iscuryear, iscuryear)
      );
    }

    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    changeResources();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {
    dltimeline: function (year) {
      $(".fromMilestones .milestone-item").hide();
      $(".fromMilestones .milestone-item[data-year=" + year + "]").show();
      $(".fromMilestones .time-box").remove();
      var dlyear = "",
        dlmonth = "",
        curdl = $("body"),
        dlhtml = "",
        datetoshow = "";

      // click new timeline
      var monthsArr = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ]; // handle the click on all months
      var istimelineData = false; // check if there is a data in time line or no

      $(".tlContainer").html(""); // container of data

      monthsArr.forEach((el) => {
        $(`.fromMilestones .month-list-ctx #month-${el}`).click(function () {
          istimelineData = false;
          $(
            `.fromMilestones .month-list-ctx #month-${milestonelstMonthClicked}`
          ).css("background", "#F0F3F8"); // return the previous background color to the origin color
          var dateTitle = "",
            nameTitle = "";
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            dateTitle = "التاريخ";
            nameTitle = "الاسم";
          } else {
            dateTitle = "Date";
            nameTitle = "Name";
          }
          dlhtml = '<table style="width:100%">';
          dlhtml +=
            '<tr class="timeLineTableHeader"><th style="border:1px solid #ddd">' +
            dateTitle +
            '</th><th style="border:1px solid #ddd">' +
            nameTitle +
            "</th></tr>";
          $(".tlContainer").html("");
          $(`.fromMilestones .month-list-ctx #month-${el}`).css(
            "background",
            "#D0D0D0"
          ); // change background color when click on month
          milestonelstMonthClicked = el;
          MilestoneArr.forEach(function (dl, i) {
            var dataYear = isArabic
              ? dl.date.split("-")[0]
              : dl.date.split("-")[2];
            var dataDay = isArabic
              ? dl.date.split("-")[2]
              : dl.date.split("-")[0];
            (datetoshow = dl.date.split("-")),
              isArabic
                ? (datetoshow = datetoshow[1] + "-" + dataDay)
                : dataDay + "-" + datetoshow[1];
            dlyear = dataYear;

            if (dlyear == year) {
              if (dl.date.split("-")[1] == 10) {
                // to handle the data on october month
                if (el == dl.date.split("-")[1]) {
                  istimelineData = true;
                  dlhtml +=
                    '<tr><td class="p-date" style="border:1px solid #ddd">' +
                    datetoshow +
                    "</td>" +
                    '<td class="p-title" style="border:1px solid #ddd">' +
                    dl.name +
                    "</td></tr>";
                }
              } else {
                if (el == dl.date.split("-")[1].replace("0", "")) {
                  istimelineData = true;
                  dlhtml +=
                    '<tr><td class="p-date" style="border:1px solid #ddd">' +
                    datetoshow +
                    "</td>" +
                    '<td class="p-title" style="border:1px solid #ddd">' +
                    dl.name +
                    "</td></tr>";
                }
              }
            }
            if (i == MilestoneArr.length - 1) {
              dlhtml += "</table>";
              $(".tlContainer").append(dlhtml);
              if (!istimelineData) {
                $(".timeLineTableHeader").css("display", "none"); // hide the table if there is no data
                $(".fromMilestones .tlContainer").html(
                  `<p style="text-align:center">${No_Data}</p>`
                );
              }
              $(".fromMilestones .time-box").hover(
                function () {
                  $(".fromMilestones .delivery-timeline").css(
                    "overflow",
                    "initial"
                  );
                },
                function () {
                  $(".fromMilestones .delivery-timeline").css(
                    "overflow",
                    "hidden"
                  );
                }
              );
            }
          });
        });
      });
      //

      $(`.fromMilestones .month-list-ctx #month-1`).click();
      $(`.fromMilestones .month-list .monthBadge`).remove(); // to remove star on the month on change to reset

      MilestoneArr.forEach(function (dl, i) {
        var milestoneYear = isArabic
          ? dl.date.split("-")[0]
          : dl.date.split("-")[2];

        if (milestoneYear == year) {
          var targetMonth = "";
          if (dl.date.split("-")[1] == 10) {
            targetMonth = dl.date.split("-")[1];
          } else {
            targetMonth = dl.date.split("-")[1].replace("0", "");
          }

          if (
            $(`.fromMilestones .month-list #month-${targetMonth} > .monthBadge`)
              .length == 0
          ) {
            // to add star on the month that have value
            $(`.fromMilestones .month-list #month-${targetMonth}`).prepend(
              `<span class="monthBadge">*</span>`
            );
          }
        }
      });
    },
  },
};
//tasks
var Tasks_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Tasks");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Tasks_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Tasks_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Tasks_Info_Request.onSuccess),
      Function.createDelegate(this, Tasks_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Tasks_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var NRisks = 0,
      taskshtml = "",
      taskname,
      tasktitle,
      tasknotificationhtml = "";
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      tasktitle = oListItem.get_item("Title") || No_Data;
      // taskname = oListItem.get_item('Name') || No_Data;
      taskshtml +=
        '<li class="list-group-item">' +
        '<h3 class="des-14 w-0">' +
        tasktitle +
        "</h3>" +
        '<div class="des-12 text-nowrap">' +
        '<a class="link-btn">موافقة</a>' +
        '<a class="link-btn mx-3">رفض</a>' +
        "</div>" +
        "</li>";
      NTasks++;
      RSupport++;
      //
    }
    $("div#accordionRequiredSupport > .card:nth-child(1) ul.list-group").html(
      taskshtml
    );
    $(".Rsupprot").text(RSupport);
    changeResources();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },

  // Global variables
  g: {
    PCODE: window.location.href.split("/")[4],
  },
};

// coc info request

var Coc_Info_Request = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("Certifications");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
      Project_Home_Info_Request.g.PCODE +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Coc_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Coc_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Coc_Info_Request.onSuccess),
      Function.createDelegate(this, Coc_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Coc_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    (TheCost = 0), (Amount = 0), (Deliverables = ""), (InvoicesCoc = 0);

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      Amount = oListItem.get_item("Amount");
      Deliverables = oListItem.get_item("Deliverables");
      Status = oListItem.get_item("DisbursementStatus");

      //This can be done also by Caml query . we can passe all delivrables code there
      for (i = 0; i < Deliverablesarray.length; i++) {
        var myselections = Deliverables ? Deliverables.split(":::") : []; // add myselection to handle mult delivrable in Coc

        if (
          Deliverablesarray[i].Code == myselections[0] &&
          Status == "exchangehasbeendone"
        ) {
          TheCost += Amount;
        }
      }

      //we get all invoices of delivrables that have delivrables yes
      for (i = 0; i < Deliverablesarray.length; i++) {
        if (
          Deliverablesarray[i].Code == Deliverables &&
          Deliverablesarray[i].delivered == "yes" &&
          Status == "exchangehasbeendone"
        ) {
          InvoicesCoc += Amount;
        }
      }

      LastCost = AssignedBudget - TheCost;

      var SF =
        Math.round(
          deliveredDeliverablesArrayPercent.reduce(
            (accum, item) =>
              accum + (item.deliveredDelivrableWeight * AssignedBudget) / 100,
            0
          )
        ) || 0;

      var expectedDisbursement = SF - InvoicesCoc;

      if (expectedDisbursement) {
        expectedDisbursement = Number(expectedDisbursement);
        expectedDisbursement = expectedDisbursement.toFixed(2);
      }

      var plannedDisbursement =
        (AssignedBudget * projectPlannedImplementationDeliverable) / 100;

      var plannedDisbursementPercent = 0;

      if (plannedDisbursement > 0 && AssignedBudget > 0) {
        plannedDisbursementPercent =
          (plannedDisbursement / AssignedBudget) * 100;
        plannedDisbursementPercent = Number(plannedDisbursementPercent);
        plannedDisbursementPercent = plannedDisbursementPercent.toFixed(2);
      }

      var actualDisbursementPercent = 0;

      if (TheCost > 0 && AssignedBudget > 0) {
        actualDisbursementPercent = (TheCost / AssignedBudget) * 100;
        actualDisbursementPercent = Number(actualDisbursementPercent);
        actualDisbursementPercent = actualDisbursementPercent.toFixed(2);
      }

      var disbursementPerformance = 0;

      if (TheCost > 0 && plannedDisbursement > 0) {
        disbursementPerformance = (TheCost / plannedDisbursement) * 100;
        disbursementPerformance = Number(disbursementPerformance);
        disbursementPerformance = disbursementPerformance.toFixed(2);
      }

      // الصرف المستحق
      var expectedDisbursementInfo = "";
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        expectedDisbursementInfo = Resources.ar["expecteddisbursementinfo"];
      } else {
        expectedDisbursementInfo = Resources.en["expecteddisbursementinfo"];
      }

      $(".project-budget-ctx .card-body > div:nth-child(2) .my-info-i").attr(
        "title",
        expectedDisbursementInfo
      );
      $(".project-budget-ctx .card-body > div:nth-child(2) .my-info-i").attr(
        "data-original-title",
        expectedDisbursementInfo
      );
      $(
        ".project-budget-ctx .card-body > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)"
      ).text(
        expectedDisbursement.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " " +
        SAR_Currency
      );

      // الميزانية المتبقية
      var remainingBudgetInfo = "";
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        remainingBudgetInfo = Resources.ar["remainingbudgetinfo"];
      } else {
        remainingBudgetInfo = Resources.en["remainingbudgetinfo"];
      }

      $(".project-budget-ctx .card-body > div:nth-child(3) .my-info-i").attr(
        "title",
        remainingBudgetInfo
      );
      $(".project-budget-ctx .card-body > div:nth-child(3) .my-info-i").attr(
        "data-original-title",
        remainingBudgetInfo
      );
      $(
        ".project-budget-ctx .card-body > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)"
      ).html(
        "<span>" +
        LastCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " " +
        SAR_Currency +
        "</span>"
      );

      // الصرف الفعلي
      var actualExpenditurInfo = "";
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        actualExpenditurInfo = Resources.ar["actualexpenditurinfo"];
      } else {
        actualExpenditurInfo = Resources.en["actualexpenditurinfo"];
      }
      $(".project-budget-ctx .card-body > div:nth-child(4) .my-info-i").attr(
        "title",
        actualExpenditurInfo
      );
      $(".project-budget-ctx .card-body > div:nth-child(4) .my-info-i").attr(
        "data-original-title",
        actualExpenditurInfo
      );
      $(
        ".project-budget-ctx .card-body > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)"
      ).html(
        "<span>" +
        TheCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " " +
        SAR_Currency +
        "</span>"
      );

      // المخطط من الصرف
      var plannedDisbursementInfo = "";
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        plannedDisbursementInfo = Resources.ar["planneddisbursementinfo"];
      } else {
        plannedDisbursementInfo = Resources.en["planneddisbursementinfo"];
      }
      $(".project-budget-ctx .card-body > div:nth-child(5) .my-info-i").attr(
        "title",
        plannedDisbursementInfo
      );
      $(".project-budget-ctx .card-body > div:nth-child(5) .my-info-i").attr(
        "data-original-title",
        plannedDisbursementInfo
      );
      $(
        ".project-budget-ctx .card-body > div:nth-child(5) > div:nth-child(2) > div:nth-child(2)"
      ).html(
        "<span>" +
        plannedDisbursement.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " " +
        SAR_Currency +
        "</span>"
      );

      //نسبة المخطط من الصرف
      var plannedDisbursementPercentInfo = "";
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        plannedDisbursementPercentInfo =
          Resources.ar["planneddisbursementpercentinfo"];
      } else {
        plannedDisbursementPercentInfo =
          Resources.en["planneddisbursementpercentinfo"];
      }
      $(".project-budget-ctx .card-body > div:nth-child(6) .my-info-i").attr(
        "title",
        plannedDisbursementPercentInfo
      );
      $(".project-budget-ctx .card-body > div:nth-child(6) .my-info-i").attr(
        "data-original-title",
        plannedDisbursementPercentInfo
      );
      $(
        ".project-budget-ctx .card-body > div:nth-child(6) > div:nth-child(2) > div:nth-child(2)"
      ).html(
        "<span>" +
        plannedDisbursementPercent
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " %</span>"
      );

      //نسبة الصرف الفعلي
      var actualDisbursementPercentInfo = "";
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        actualDisbursementPercentInfo =
          Resources.ar["actualdisbursementpercentinfo"];
      } else {
        actualDisbursementPercentInfo =
          Resources.en["actualdisbursementpercentinfo"];
      }
      $(".project-budget-ctx .card-body > div:nth-child(7) .my-info-i").attr(
        "title",
        actualDisbursementPercentInfo
      );
      $(".project-budget-ctx .card-body > div:nth-child(7) .my-info-i").attr(
        "data-original-title",
        actualDisbursementPercentInfo
      );
      $(
        ".project-budget-ctx .card-body > div:nth-child(7) > div:nth-child(2) > div:nth-child(2)"
      ).html(
        "<span>" +
        actualDisbursementPercent
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " %</span>"
      );

      //اداء الصرف
      var disbursementPerformanceInfo = "";
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        disbursementPerformanceInfo =
          Resources.ar["disbursementperformanceinfo"];
      } else {
        disbursementPerformanceInfo =
          Resources.en["disbursementperformanceinfo"];
      }
      $(".project-budget-ctx .card-body > div:nth-child(8) .my-info-i").attr(
        "title",
        disbursementPerformanceInfo
      );
      $(".project-budget-ctx .card-body > div:nth-child(8) .my-info-i").attr(
        "data-original-title",
        disbursementPerformanceInfo
      );
      $(
        ".project-budget-ctx .card-body > div:nth-child(8) > div:nth-child(2) > div:nth-child(2)"
      ).html(
        "<span>" +
        disbursementPerformance
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " %</span>"
      );
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

// var Invoices_Info_Request = {
//   // The main Initialization function
//   init: function () {
//     var clientContext = new SP.ClientContext.get_current();
//     var oList = clientContext.get_web().get_lists().getByTitle('Invoices');
//     var camlQuery = new SP.CamlQuery();
//     camlQuery.set_viewXml('<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' + Project_Home_Info_Request.g.PCODE + '</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>');
//     Invoices_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
//     clientContext.load(Invoices_Info_Request.g.collListItem);
//     clientContext.executeQueryAsync(
//       Function.createDelegate(this, Invoices_Info_Request.onSuccess),
//       Function.createDelegate(this, Invoices_Info_Request.onError)
//     );
//   },
//   onSuccess: function (sender, args) {
//     var collListItem = Invoices_Info_Request.g.collListItem;
//     var listItemEnum = collListItem.getEnumerator();
//     TheCost = 0, Amount = 0, Deliverable = '', Invoices = 0;
//     while (listItemEnum.moveNext()) {
//       var oListItem = listItemEnum.get_current();
//       Amount = oListItem.get_item('Amount');
//       Deliverable = oListItem.get_item('Deliverable');
//       Status = oListItem.get_item('Status');

//       //This can be done also by Caml query . we can passe all delivrables code there
//       for (i = 0; i < Deliverablesarray.length; i++) {
//         var myselections = Deliverable ? Deliverable.split(":::") : [] // add myselection to handle mult delivrable in invoices

//         if (Deliverablesarray[i].Code == myselections[0] && Status == 'paid') {
//           TheCost += Amount;
//         }
//       }

//       //we get all invoices of delivrables that have delivrables yes
//       for (i = 0; i < Deliverablesarray.length; i++) {
//         if (Deliverablesarray[i].Code == Deliverable && Deliverablesarray[i].delivered == 'yes' && Status == 'paid') {
//           Invoices += Amount;
//         }
//       }
//     }

//     //console.log(ExpectedExchange);
//     LastCost = AssignedBudget - TheCost;

//     var SF = Math.round(deliveredDeliverablesArrayPercent.reduce((accum, item) => accum + ((item.deliveredDelivrableWeight * AssignedBudget) / 100), 0)) || 0;
//     var expectedDisbursement = SF - Invoices;

//     $('.project-budget-ctx .card-body > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)').text(expectedDisbursement.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + SAR_Currency);
//     $('.project-budget-ctx .card-body > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)').html('<span>' + LastCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + SAR_Currency + '</span>');

//     $('.project-budget-ctx .card-body > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)').html('<span>' + TheCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' ' + SAR_Currency + '</span>');

//     $('li.nav-item a:not(:visible)').parent().hide()
//   },
//   onError: function (sender, args) {
//     console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
//   },
//   // Global variables
//   g: {}
// };

//

// Get the projects collection.
EPMMilstone_Array = [];
EPMSummaryTasks_Array = [];
var GetProject_Tasks = {
  preinit: function () {
    SP.SOD.registerSod(
      "PS.ProjectContext",
      SP.Utilities.Utility.getLayoutsPageUrl("ps.js")
    );
    SP.SOD.loadMultiple(["PS.ProjectContext"], GetProject_Tasks.init);
  },
  init: function () {
    // Initialize the current client context.
    GetProject_Tasks.g.projContext = PS.ProjectContext.get_current();
    // Get the projects collection.
    GetProject_Tasks.g.projects = GetProject_Tasks.g.projContext.get_projects();
    //Get the project reference
    var pProj = GetProject_Tasks.g.projects.getById(User_ProjUID);
    //Get the tasks collection reference associated with the project.
    GetProject_Tasks.g.tasks = pProj.get_tasks();
    // Register the request for information that you want to run on the server.
    // This call includes an optional "Include" parameter to request fields

    //Add baseline start and base line duration tp handle the project status

    GetProject_Tasks.g.projContext.load(
      GetProject_Tasks.g.tasks,
      "Include(Id, Name, Start, Finish, IsMilestone, IsSummary, ScheduledStart, PercentComplete, OutlineLevel, Duration)"
    );

    // GetProject_Tasks.g.projContext.load(GetProject_Tasks.g.tasks);
    // Run the request on the server.
    GetProject_Tasks.g.projContext.executeQueryAsync(
      GetProject_Tasks.onSuccess,
      GetProject_Tasks.onError
    );
  },
  onSuccess: function (sender, args) {
    var listItemEnum = GetProject_Tasks.g.tasks.getEnumerator(),
      epmTask_Html = [],
      bgclass;

    while (listItemEnum.moveNext()) {
      var Task = listItemEnum.get_current();
      var Task_isSummary = Task.get_isSummary();
      var Task_isMilestone = Task.get_isMilestone();
      var Task_isParent = Task.get_outlineLevel() == 1 ? true : false;
      var Task_Duration = Task.get_duration();

      console.log(Task.get_outlineLevel());
      if (Task_isSummary && Task_isParent && Task_Duration != "0d") {
        var Task_ID = Task.get_id().ToSerialized(),
          Task_Name = Task.get_name(),
          Task_Start = Task.get_start(),
          Task_Finish = Task.get_finish(),
          percentcomplete = Task.get_percentComplete(),
          itemdate = Project_Home_Info_Request.g.dateConvert(Task.get_start());
        itemdateF = Project_Home_Info_Request.g.dateConvert(Task.get_finish());

        EPMSummaryTasks_Array.push({
          id: Task_ID,
          name: Task_Name,
          start: Task_Start,
          date: itemdate,
          finish: Task_Finish,
          percentcomplete: percentcomplete,
          // schedulestart: Task_ScheduleStart,
          // completion: Task_completion
        });
        //
        var itemdate2 = new Date(
          Project_Home_Info_Request.g.dateConvert2(Task.get_start())
        ),
          itemdate2 = Math.floor(
            (itemdate2 - new Date(itemdate2.getFullYear(), 0, 0)) /
            (1000 * 60 * 60 * 24)
          ); //number of da,
        (itemdate2 = (itemdate2 * 100) / 365),
          (itemdate3 = new Date(
            Project_Home_Info_Request.g.dateConvert2(Task.get_finish())
          )),
          (itemdate3 = Math.floor(
            (itemdate3 - new Date(itemdate3.getFullYear(), 0, 0)) /
            (1000 * 60 * 60 * 24)
          )); //number of da,
        (itemdate3 = (itemdate3 * 100) / 365),
          (itemdate4 = itemdate3 - itemdate2);
        var isactive =
          itemdate.split("-")[2] == new Date().getFullYear()
            ? ""
            : 'style="display:none"';
        switch (true) {
          case percentcomplete == 0:
            bgclass = "bg-danger";
            break;
          case percentcomplete <= 33:
            bgclass = "bg-warning";
            break;
          case percentcomplete <= 66:
            bgclass = "bg-primary";
            break;
          case percentcomplete <= 100:
            bgclass = "bg-success";
            break;
        }
        var realPercent = itemdate4 != 0 ? itemdate4 : 1;
        var myPlace = isArabic
          ? "right:" + itemdate2 + "%!important;"
          : "left:" + itemdate2 + "%!important;";
        var myArraow = isArabic ? "←" : "→";
        epmTask_Html.push(
          '<div class="milestone-item mb-3" ' +
          isactive +
          ' data-year="' +
          itemdate.split("-")[2] +
          '">' +
          '<div class="row mx-0">' +
          '<div class="milestone-label col-auto fnt-13 w-3 mb-1" style="width:130px"><span class="milestone-label">' +
          Task_Name +
          '</span><i data-toggle="tooltip" data-html="true" title="<p>' +
          Task_Name +
          "</p><p>" +
          itemdate +
          " " +
          myArraow +
          " " +
          itemdateF +
          "</p><p>" +
          percentcomplete +
          ' %</p>" class="my-info-i fas fa-info-circle"></i></div>' +
          '<div class="milestone-duration col-6 col-xl-auto fnt-13 black order-xl-last mb-1">' +
          '<span class="m-start-date">' +
          itemdate +
          "</span>" +
          '<!--<i class="fa m-arrow"></i>' +
          '<span class="m-end-date">15/7/2020</span>-->' +
          "</div>" +
          '<div class="col-12 col-xl-5 state-bar align-items-center order-last order-xl-1 mb-1 line-wrap">' +
          '<div class="position-relative d-flex flex-row-reverse mt-1 my-line">' +
          '<div class="state-progress-line ' +
          bgclass +
          '">' +
          "</div>" +
          '<div class="state-progress-bar ' +
          bgclass +
          '" data-toggle="tooltip" data-mile-complete="' +
          percentcomplete +
          ' %" data-placement="top" title="" data-original-title="' +
          itemdate +
          " " +
          myArraow +
          " " +
          itemdateF +
          '" data-mile-finish="' +
          itemdateF +
          '" style="width:' +
          realPercent +
          "%!important;" +
          myPlace +
          '">' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>"
        );
      } else if (Task_isMilestone) {
        var Task_ID = Task.get_id().ToSerialized(),
          Task_Name = Task.get_name(),
          Task_Start = Task.get_start(),
          Task_Finish = Task.get_finish(),
          percentcomplete = Task.get_percentComplete(),
          itemdate = Project_Home_Info_Request.g.dateConvert(Task.get_start());
        itemdateF = Project_Home_Info_Request.g.dateConvert(Task.get_finish());

        EPMMilstone_Array.push({
          id: Task_ID,
          name: Task_Name,
          start: Task_Start,
          date: itemdate,
          dateF: itemdateF,
          finish: Task_Finish,
          percentcomplete: percentcomplete,
          // schedulestart: Task_ScheduleStart,
          // completion: Task_completion
        });
        //
      }
    }

    if (epmTask_Html.length == 0) {
      epmTask_Html.push("<h3>" + UserNo_Data + "</h3>");
    }
    $(".fromTimeLine .project-milestone").html("");
    $(".fromTimeLine .project-milestone").html(epmTask_Html.join(""));

    //Time Line
    var sdlyear = "",
      delyears = [],
      iscuryear = true,
      sumTaskPerc = 0;
    var yearExcist = false;
    // var temp = sumTaskPerc / ((EPMSummaryTasks_Array.length + 1) * 100) * 100 || 0;
    // $('.actual-complete-val').text(temp + '%');
    $(".fromTimeLine select#inputYear").html("");
    EPMSummaryTasks_Array.forEach(function (dl, i) {
      //appending years
      var dataYear = isArabic ? dl.date.split("-")[0] : dl.date.split("-")[2];
      sumTaskPerc += dl.percentcomplete;
      if (sdlyear != dataYear) {
        if (dataYear == new Date().getFullYear()) iscuryear = true;
        else iscuryear = false;
        $(".fromTimeLine select#inputYear").append(
          new Option(dataYear, dataYear, iscuryear, iscuryear)
        );
        yearExcist = true;
      }
      sdlyear = dataYear;
      delyears.push(sdlyear);
    });

    if (!yearExcist) {
      // to append no data in drop down when there is no data
      $(".fromTimeLine select#inputYear").append(
        new Option(No_Data, No_Data, iscuryear, iscuryear)
      );
    }
    EPMMilstone_Array.forEach(function (dl, i) {
      //appending years
      var dataYear = isArabic ? dl.date.split("-")[0] : dl.date.split("-")[2];
      if (sdlyear != dataYear) {
        if (delyears.indexOf(dataYear) == -1) {
          delyears.push(dataYear);
          $(".fromTimeLine select#inputYear").append(
            new Option(dataYear, dataYear, iscuryear, iscuryear)
          );
          yearExcist = true;
        }
      }
      sdlyear = dl;
      if (!yearExcist) {
        // to append no data in drop down when there is no data
        $(".fromTimeLine select#inputYear").append(
          new Option(No_Data, No_Data, iscuryear, iscuryear)
        );
      }
    });

    if (delyears.indexOf(String(new Date().getFullYear())) > -1) {
      GetProject_Tasks.g.dltimeline(new Date().getFullYear());
    } else if (delyears.length) {
      GetProject_Tasks.g.dltimeline(delyears[0]);
    }
    // GetProject_Tasks.g.dltimeline();
    $(".fromTimeLine select#inputYear").on("change", function () {
      $(`#month-${TLlstMonthCLicked}`).css("background", "#F0F3F8");
      $(".fromTlContainer").html(""); // to reset the data when change on year
      GetProject_Tasks.g.dltimeline($(this).val());
    });

    changeResources();

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
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  g: {
    dltimeline: function (year) {
      $(".fromTimeLine .milestone-item").hide();
      $(".fromTimeLine .milestone-item[data-year=" + year + "]").show();
      $(".fromTimeLine .time-box").remove();
      var dlyear = "",
        dlmonth = "",
        curdl = $("body"),
        dlhtml = "",
        datetoshow = "";
      // work on click new timeline
      var monthsArr = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
      ]; // handle the click on all months
      var istimelineData = false; // check if there is a data in time line or no

      $(".fromTlContainer").html(""); // container of data

      monthsArr.forEach((el) => {
        $(`.fromTimeLine .month-list-ctx #month-${el}`).click(function () {
          istimelineData = false;
          $(`.fromTimeLine .month-list-ctx #month-${TLlstMonthCLicked}`).css(
            "background",
            "#F0F3F8"
          ); // return the previous background color to the origin color
          var dateTitle = "",
            nameTitle = "",
            percentComplete = "";
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            dateTitle = "التاريخ";
            (nameTitle = "الاسم"), (percentComplete = "نسبة الاكتمال");
          } else {
            dateTitle = "Date";
            nameTitle = "Name";
            percentComplete = "Percent Complete";
          }

          dlhtml = '<table style="width:100%">';
          dlhtml +=
            '<tr class="timeLineTableHeader"><th style="border:1px solid #ddd">' +
            dateTitle +
            '</th><th style="border:1px solid #ddd">' +
            nameTitle +
            '</th><th style="border:1px solid #ddd">' +
            percentComplete +
            "</th></tr>";
          $(".fromTlContainer").html("");
          $(`.fromTimeLine .month-list-ctx #month-${el}`).css(
            "background",
            "#D0D0D0"
          ); // change background color when click on month
          TLlstMonthCLicked = el;

          EPMMilstone_Array.forEach(function (dl, i) {
            var dataYear = isArabic
              ? dl.date.split("-")[0]
              : dl.date.split("-")[2];
            var dataDay = isArabic
              ? dl.date.split("-")[2]
              : dl.date.split("-")[0];
            (datetoshow = dl.date.split("-")),
              (datetoshow = dataDay + "-" + datetoshow[1]);
            dlyear = dataYear;

            if (dlyear == year) {
              if (dl.date.split("-")[1] == 10) {
                // to handle the data on october month
                if (el == dl.date.split("-")[1]) {
                  istimelineData = true;
                  dlhtml +=
                    '<tr><td class="p-date" style="border:1px solid #ddd">' +
                    datetoshow +
                    "</td>" +
                    '<td class="p-title" style="border:1px solid #ddd">' +
                    dl.name +
                    '</td><td style="border:1px solid #ddd">' +
                    dl.percentcomplete +
                    "%</td></tr>";
                }
              } else {
                if (el == dl.date.split("-")[1].replace("0", "")) {
                  istimelineData = true;
                  dlhtml +=
                    '<tr><td class="p-date" style="border:1px solid #ddd">' +
                    datetoshow +
                    "</td>" +
                    '<td class="p-title" style="border:1px solid #ddd">' +
                    dl.name +
                    '</td><td style="border:1px solid #ddd">' +
                    dl.percentcomplete +
                    "%</td></tr>";
                }
              }
            }
            if (i == EPMMilstone_Array.length - 1) {
              dlhtml += "</table>";
              $(".fromTlContainer").append(dlhtml);
              if (!istimelineData) {
                $(".timeLineTableHeader").css("display", "none"); // hide the table if there is no data
              }

              $(".fromTimeLine .time-box").hover(
                function () {
                  $(".fromTimeLine .delivery-timeline").css(
                    "overflow",
                    "initial"
                  );
                },
                function () {
                  $(".fromTimeLine .delivery-timeline").css(
                    "overflow",
                    "hidden"
                  );
                }
              );
            }
          });
        });
      });

      $(`.fromTimeLine .month-list-ctx #month-1`).click();

      // EPMMilstone_Array.forEach(function (dl, i) { // epm before change the timeline to table data

      //   var dataYear = isArabic ? dl.date.split('-')[0] : dl.date.split('-')[2];
      //   var dataDay = isArabic ? dl.date.split('-')[2] : dl.date.split('-')[0];
      //   datetoshow = dl.date.split('-'), datetoshow = dataDay + '-' + datetoshow[1];
      //   dlyear = dataYear;

      //   if (dlyear == year) {
      //     if (dlmonth != dl.date.split('-')[1]) {
      //       if (dlhtml)
      //         curdl.append(dlhtml);
      //       dlhtml = '</div><div class="time-box">' +
      //         '<div class="p-date">' + datetoshow + '</div>' +
      //         '<div class="p-date">' + dl.percentcomplete + ' %</div>' +
      //         '<div class="p-title">' + dl.name + '</div>';
      //     } else {
      //       dlhtml +=
      //         '<div class="p-date">' + datetoshow + '</div>' +
      //         '<div class="p-date">' + dl.percentcomplete + ' %</div>' +
      //         '<div class="p-title">' + dl.name + '</div>';
      //     }
      //     // console.log(dlhtml);
      //     dlmonth = dl.date.split('-')[1];
      //     if (dl.date.split('-')[1] != '10')
      //       curdl = $('.fromTimeLine div#month-' + dl.date.split('-')[1].replace('0', ''));
      //     else
      //       curdl = $('.fromTimeLine div#month-' + dl.date.split('-')[1]);
      //   }
      //   if (i == EPMMilstone_Array.length - 1) {
      //     dlhtml += '</div>';
      //     curdl.append(dlhtml);
      //     $('.fromTimeLine .time-box').hover(function () {
      //       $('.fromTimeLine .delivery-timeline').css('overflow', 'initial');
      //     }, function () {
      //       $('.fromTimeLine .delivery-timeline').css('overflow', 'hidden');
      //     });
      //   }
      // });
    },
  },
};
//epm api call
var EPM_Project_Data_Request = {
  preinit: function () {
    clearInterval(checkEpmProjectHtml);
    SP.SOD.registerSod(
      "PS.ProjectContext",
      SP.Utilities.Utility.getLayoutsPageUrl("ps.js")
    );
    SP.SOD.loadMultiple(["PS.ProjectContext"], EPM_Project_Data_Request.init);
  },
  // The main Initialization function
  init: function () {
    var projectContext = PS.ProjectContext.get_current();
    var oProjects = projectContext.get_projects();
    EPM_Project_Data_Request.g.oProjectsItem = oProjects.getById(User_ProjUID); //declared inside object scope only
    oProjectsItem = EPM_Project_Data_Request.g.oProjectsItem;
    projectContext.load(EPM_Project_Data_Request.g.oProjectsItem);
    projectContext.executeQueryAsync(
      Function.createDelegate(this, EPM_Project_Data_Request.onSuccess),
      Function.createDelegate(this, EPM_Project_Data_Request.onError)
    );
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  onSuccess: function (sender, args) {
    duration = "";

    ScheduleProjectPercentageComplete = oProjectsItem.get_percentComplete();

    PlannedStartDate = Project_Home_Info_Request.g.dateConvert(
      oProjectsItem.get_startDate()
    );
    PlannedFinishDate = Project_Home_Info_Request.g.dateConvert(
      oProjectsItem.get_finishDate()
    );

    //to formate the date when use english and arabic languages // the correct one year-month-day
    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {
      PlannedStartDate = new Date(PlannedStartDate);
      PlannedFinishDate = new Date(PlannedFinishDate);
    } else {
      if (PlannedStartDate) {
        PlannedStartDate = PlannedStartDate.split("-");
        PlannedStartDate =
          PlannedStartDate[2] +
          "-" +
          PlannedStartDate[1] +
          "-" +
          PlannedStartDate[0];
        PlannedStartDate = new Date(PlannedStartDate);
      }
      if (PlannedFinishDate) {
        PlannedFinishDate = PlannedFinishDate.split("-");
        PlannedFinishDate =
          PlannedFinishDate[2] +
          "-" +
          PlannedFinishDate[1] +
          "-" +
          PlannedFinishDate[0];
        PlannedFinishDate = new Date(PlannedFinishDate);
      }
    }

    EPM_Project_Summery_Task.preinit();
  },
  // Global variables
  g: {},
};

////////////////////////////////

var EPM_Project_Summery_Task = {
  preinit: function () {
    SP.SOD.registerSod(
      "PS.ProjectContext",
      SP.Utilities.Utility.getLayoutsPageUrl("ps.js")
    );
    SP.SOD.loadMultiple(["PS.ProjectContext"], EPM_Project_Summery_Task.init);
  },
  // The main Initialization function
  init: function () {
    var projectContext = PS.ProjectContext.get_current();
    var oProjects = projectContext.get_projects();
    EPM_Project_Summery_Task.g.oProjectsItem = oProjects.getById(User_ProjUID); //declared inside object scope only

    oProjectsItem = EPM_Project_Summery_Task.g.oProjectsItem;

    EPM_Project_Summery_Task.g.testDuration =
      oProjectsItem.get_projectSummaryTask();

    projectContext.load(EPM_Project_Summery_Task.g.testDuration);

    // projectContext.load(EPM_Project_Summery_Task.g.oProjectsItem);
    projectContext.executeQueryAsync(
      Function.createDelegate(this, EPM_Project_Summery_Task.onSuccess),
      Function.createDelegate(this, EPM_Project_Summery_Task.onError)
    );
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  onSuccess: function (sender, args) {
    // avoid version conflict when project wf is render
    var isWfPage = window.location.href.toLowerCase().indexOf("&wfs") > -1;
    if (!isWfPage) {
      Update_ProjectStatus_Service.init(); // to update project status from services
      GetProject_Tasks.preinit();
    }
  },
  // Global variables
  g: {},
};

var Update_ProjectStatus_Service = {
  init: function () {
    $.ajax({
      type: "GET",
      url: `https://hrsd-api.netways1.com/api/job/updateallprojectstatus/${Project_Home_Info_Request.g.PCODE}`,
      success: function (data) {
        console.log("INSIDE SUCCESS Update_ProjectStatus_Service");
        Get_ProjectStatus_Info.init();
      },
      error: function (data) {
        console.log("call failed in update project service", data);
      },
    });
  },
};

// to working on when  odai omari publish the api
var Get_ProjectStatus_Info = {
  init: function () {
    $("button.updateprogress").removeClass("loader-action-success");
    $("button.updateprogress").removeClass("loader-action-error");
    $("button.updateprogress").addClass("loader-action");
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle(ListArray[0].projects);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
      Project_Home_Info_Request.g.PCODE +
      "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>"
    );
    Get_ProjectStatus_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_ProjectStatus_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_ProjectStatus_Info.onSuccess),
      Function.createDelegate(this, Get_ProjectStatus_Info.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Get_ProjectStatus_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemID,
      ActualImplementationDeliverable,
      PlannedImplementationDeliverable,
      ProgressStatusDeliverable,
      ActualImplementationMilestone,
      PlannedImplementationMilestone,
      ProgressStatusMilestone,
      ActualImplementationSchedule,
      PlannedImplementationSchedule,
      ProgressStatusSchedule;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();
      ActualImplementationDeliverable =
        oListItem.get_item("ActualImplementationDeliverable") || 0;
      PlannedImplementationDeliverable =
        oListItem.get_item("PlannedImplementationDeliverable") || 0;
      ProgressStatusDeliverable =
        oListItem.get_item("ProgressStatusDeliverable") || No_Data;
      ActualImplementationMilestone =
        oListItem.get_item("ActualImplementationMilestone") || 0;
      PlannedImplementationMilestone =
        oListItem.get_item("PlannedImplementationMilestone") || 0;
      ProgressStatusMilestone =
        oListItem.get_item("ProgressStatusMilestone") || No_Data;
      ActualImplementationSchedule =
        oListItem.get_item("ActualImplementationSchedule") || 0;
      PlannedImplementationSchedule =
        oListItem.get_item("PlannedImplementationSchedule") || 0;
      ProgressStatusSchedule =
        oListItem.get_item("ProgressStatusSchedule") || No_Data;
    }

    ActualImplementationDeliverable = Number(ActualImplementationDeliverable);
    ActualImplementationDeliverable =
      ActualImplementationDeliverable.toFixed(2);
    PlannedImplementationDeliverable = Number(PlannedImplementationDeliverable);
    PlannedImplementationDeliverable =
      PlannedImplementationDeliverable.toFixed(2);
    ////
    ActualImplementationMilestone = Number(ActualImplementationMilestone);
    ActualImplementationMilestone = ActualImplementationMilestone.toFixed(2);
    PlannedImplementationMilestone = Number(PlannedImplementationMilestone);
    PlannedImplementationMilestone = PlannedImplementationMilestone.toFixed(2);
    ////
    ActualImplementationSchedule = Number(ActualImplementationSchedule);
    ActualImplementationSchedule = ActualImplementationSchedule.toFixed(2);
    PlannedImplementationSchedule = Number(PlannedImplementationSchedule);
    PlannedImplementationSchedule = PlannedImplementationSchedule.toFixed(2);
    ////

    $(
      ".project-details-ctx .card.h-100 > .scnd-row > div:nth-child(1) > h4.black"
    ).text(ActualImplementationSchedule + "%");
    $(
      ".project-details-ctx .card.h-100 > .scnd-row > div:nth-child(2) > h4.black"
    ).text(PlannedImplementationSchedule + "%");
    $(
      ".project-details-ctx .card.h-100 > .scnd-row > div:nth-child(3) > h4.black"
    ).text(ProgressStatusSchedule);

    $(
      ".project-details-ctx .card.h-100 > .third-row > div:nth-child(1) > h4.black"
    ).text(ActualImplementationMilestone + "%");
    $(
      ".project-details-ctx .card.h-100 > .third-row > div:nth-child(2) > h4.black"
    ).text(PlannedImplementationMilestone + "%");
    $(
      ".project-details-ctx .card.h-100 > .third-row > div:nth-child(3) > h4.black"
    ).text(ProgressStatusMilestone);

    $(
      ".project-details-ctx .card.h-100 > .fourth-row > div:nth-child(1) > h4.black"
    ).text(ActualImplementationDeliverable + "%");
    $(
      ".project-details-ctx .card.h-100 > .fourth-row > div:nth-child(2) > h4.black"
    ).text(PlannedImplementationDeliverable + "%");
    $(
      ".project-details-ctx .card.h-100 > .fourth-row > div:nth-child(3) > h4.black"
    ).text(ProgressStatusDeliverable);

    // $(".project-details-ctx .card.h-100 > .scnd-row > div:nth-child(2) > h4.black").text(ActualImplementationDeliverable + "%");

    $(
      ".myCompletionStatusSchedual,.myCompletionStatusMilestone,.myCompletionStatusDelivrables"
    ).removeAttr(
      "data-trans-stat1 data-trans-stat2 data-trans-stat3 data-trans-stat4 data-trans-stat5 data-trans-stat6 data-trans-stat7 data-trans-stat8"
    );

    if (ProgressStatusSchedule != No_Data) {
      $(".myCompletionStatusSchedual").attr(
        "data-trans-" + ProgressStatusSchedule,
        ""
      ); // لا يمكن ان يكون لا يوجد
    }
    $(".myCompletionStatusMilestone").attr(
      "data-trans-" + ProgressStatusMilestone,
      ""
    );
    $(".myCompletionStatusDelivrables").attr(
      "data-trans-" + ProgressStatusDeliverable,
      ""
    );

    $(".myCompletionStatusSchedual")
      .parent()
      .removeClass("stat1 stat2 stat3 stat4 stat5 stat6 stat7 stat8");
    $(".myCompletionStatusSchedual").parent().addClass(ProgressStatusSchedule);

    $(".myCompletionStatusMilestone")
      .parent()
      .removeClass("stat1 stat2 stat3 stat4 stat5 stat6 stat7 stat8");
    $(".myCompletionStatusMilestone")
      .parent()
      .addClass(ProgressStatusMilestone);

    $(".myCompletionStatusDelivrables")
      .parent()
      .removeClass("stat1 stat2 stat3 stat4 stat5 stat6 stat7 stat8");
    $(".myCompletionStatusDelivrables")
      .parent()
      .addClass(ProgressStatusDeliverable);

    changeResources();

    $("button.updateprogress").removeClass("loader-action");
    $("button.updateprogress").addClass("loader-action-success");
  },
  onError: function (sender, args) {
    $("button.updateprogress").removeClass("loader-action");
    $("button.updateprogress").addClass("loader-action-error");

    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {},
};
