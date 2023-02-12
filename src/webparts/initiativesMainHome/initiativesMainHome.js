window.RisksCountsForRSupport =0;
window.issueCountsForRSupport = 0;
var ActualBudget = 0,
  SpendFromBudget = 0,
  EstimatedCost = 0,
  AssignedBudget = 0,
  initiativeBudget=0,
  EstimatedBudget = 0,
  phaseNameArray = [],
  phasesArrayCodes = [],
  subsectorNameArray = [],
  phaseOccurence = [],
  phaseOccurenceReverse = [],
  phaseLabels = [],
  prioritLabels = [],
  priorityOccurence = [],
  progressOccurence = [],
  progressOccurenceSchedule = [],
  numberofInitiatives = 0,
  initiativesNames = [],
  Riskarray = [],
  budgetItemarray = [],
  Issuearray = [],
  Deliverablesarray = [],
  ExpDeliverablesarray = [],
  FutDeliverablesarray = [],
  projectprogress,
  ProgressNamearray = [],
  NTasks = 0,
  RSupport = 0,
  PriorityCardhtml = "",
  RisksCount = 0,
  IssuesCount = 0,
  Riskshtml = "",
  toatlamountAllofProjectminusspercent,
  Taskarray = [],
  TasksCount = 0,
  TitleHTML = "",
  projectPortfolioCode = "",
  projectSector = "",
  portfoliosData = [],
  percentageofRisks = 0,
  percentageofIssues = 0,
  percentageofTasks = 0,
  lastChar1,
  ExistVar,
  ExistVar2,
  ExistVar1;
var totalforhidstrat = 0;
var totalforhidvis = 0;
var totalforhidvisLMS = 0;
var myFont = isArabic ? "LTBukra" : "Effra";
window.SectorsData = [];
var ScheduleProgressStatusarray = [];

var PriorityName = [],
  ProgressName = [],
  PriorityNum = [],
  PriorityStatus = [],
  prev;
var Priorities = [];
var Progressarray = [];
var phaseOccurenceCount;
var strategyarray = [];
var RiskImpact = [];
var Hight = 0;
var Medium = 0;
var Low = 0;
var phasesrevrse = [],
  phasesoccurencesreverse = [];
var BudgetLabels = [];
var budgetData = [];
var axeposition;
var BudgetLabelsAr = [
  // Resources.ar["remaining"],
  Resources.ar["budget"],
  Resources.ar["inpattr43"],
];
var BudgetLabelsEn = [
  Resources.en["budget"],
  Resources.en["inpattr43"],
  // Resources.en["remaining"],
];

var statusOccuresData = ["stat3", "stat1", "stat6", "stat2", "stat7"];

if (
  localStorage.getItem("lng") == null ||
  localStorage.getItem("lng") == "ar"
) {
  BudgetLabels = BudgetLabelsAr;
  axeposition = "right";
} else {
  BudgetLabels = BudgetLabelsEn;
  axeposition = "left";
}
if (
  localStorage.getItem("lng") == null ||
  localStorage.getItem("lng") == "ar"
) {
  var No_Data = "لا يوجد";
} else {
  var No_Data = "Not Found";
}
window.UInitiatives = [];
var iconstagesm = require("../../HelperRessources/img/icon-stage-sm.png");
var iconstatustimesm = require("../../HelperRessources/img/icon-status-time-sm.png");
var calendar = require("../../HelperRessources/img/calendar.svg");
var iconimportantsm = require("../../HelperRessources/img/icon-important-sm.png");
var iconstrategysm = require("../../HelperRessources/img/analysis.png");
var risk = require("../../HelperRessources/img/risk.svg");
var progress = require("../../HelperRessources/img/progress.svg");
var mizania = require("../../HelperRessources/img/mizania.svg");

// var iconstagesm;// = require("../../HelperRessources/img/icon-stage-sm.png");
// var iconstatustimesm;// = require("../../HelperRessources/img/icon-status-time-sm.png");
// var calendar;// = require("../../HelperRessources/img/calendar.svg");
// var iconimportantsm;// = require("../../HelperRessources/img/icon-important-sm.png");
// var iconstrategysm;// = require("../../HelperRessources/img/analysis.png");
// var risk;// = require("../../HelperRessources/img/risk.svg");
// var progress;//= require("../../HelperRessources/img/progress.svg");
// var mizania;// = require("../../HelperRessources/img/mizania.svg");
//filter vars
var PQuery =
    "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>",
  originalstate = true,
  FilterChoices = [],
  subsectorfilterarray = [],
  phasefilterarray = [],
  priorityfilterarray = [],
  progressfilterarray = [],
  progressstatusarray = [],
  progressstatusarrayALL = [],
  Query_Body = "",
  Where_Body = "",
  ViewFields = "",
  isAscending;
(originalstate = true),
  (FilterChoices = []),
  (phasefilterarray = []),
  (Query_Body = ""),
  (Where_Body = ""),
  (ViewFields = ""),
  isAscending;
var portfoliosName = [];
var reversePortfoliosArray = [];

var Noverylate = 0,
  Nolate = 0,
  Noonplan = 0,
  Noahead = 0,
  TheCost = 0;

window.initiativeRequest = {
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".d-flex").length) {
      clearInterval(checkInitiativeHomeHtml);
      if (checkHomeInitiativeStatus) {
        clearInterval(checkHomeInitiativeStatus);
      }
      //username
      $(".user-name").text(
        UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join("")
      );
      $(".user-name-full").text(UserN.Title);
      $(".btn-toolbar.mb-2.mb-md-0.mx-2.page-filter").append(forfilterQuery);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        initiativeRequest.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    if (originalstate) {
      if (isRoleDataLevelAccess) {
        PQuery = dataLevelAccessQuery;
      } else {
        //*****call charts filteration */
        // if (isInManager || isInOwner) {
        //   PQuery = InitiativeAccessQuery;
        // } else 
        if (
          // isDU ||
          // isMinisterAssistant ||
          //isViceMinister ||
          isSectorHead ||
          isSubSectorHead ||
          isGeneralManager
        ) {
          PQuery = SubSectorInitiativeAccessQuery;
        } else {
          PQuery =
            "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
        }
      }
      //**** Start*/check user rule and buld query to get projects;
      $(ChartHide).hide();
      $(".required-support-ctx").show(); // to show the alejra2 elmatloob section after moved to up
      //**** End*/check user rule and buld query to get projects;
    }

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Initiatives");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(PQuery);
    initiativeRequest.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only

    clientContext.load(initiativeRequest.g.collListItem);

    clientContext.executeQueryAsync(
      Function.createDelegate(this, initiativeRequest.onSuccess),
      Function.createDelegate(this, initiativeRequest.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = initiativeRequest.g.collListItem;
    initiativeRequest.g.listItemEnum = collListItem.getEnumerator();
    var projectshtml = "",
      projectname,
      phasename,
      initiativeCode,
      priority,
      prioritytohandlefilter,
      intiativeType,
      strategy;
    var initiativesVisionHTML = "",
      initiativesStratigalHTML = "",
      initiativesLMSHTML = "",
      initiativesVisionCount = 0,
      initiativesStratigalCount = 0;
    initiativesLMSCount = 0;
    var phaseCodeArray = [];
    var phaseNameArray2 = [];
    var Priorityarray = [];
    var ProgressStatusarray = [];
    var subsectorCodeArray = [];

    while (initiativeRequest.g.listItemEnum.moveNext()) {
      var oListItem = initiativeRequest.g.listItemEnum.get_current();
      var ScheduleProjectPercentageComplete;

      var relatedFilterSubSector =
        oListItem.get_item("SubSector") &&
        oListItem.get_item("SubSector") == UserAccessSectorCode;
      var relatedFilterbSector =
        oListItem.get_item("Sector") &&
        oListItem.get_item("Sector") == UserAccessSectorCode;

      // if (
      //   (isVROE && oListItem.get_item("Types") == "vision") ||
      //   (isLMSE && oListItem.get_item("Types") == "lms") ||
      //   (isDU && relatedFilterSubSector) ||
      //   (isMinisterAssistant && relatedFilterbSector) ||
      //   (isViceMinister && relatedFilterbSector) ||
      //   (isSectorHead && relatedFilterbSector) ||
      //   (isSubSectorHead && relatedFilterSubSector) ||
      //   (isGeneralManager && relatedFilterSubSector) ||
      //   isEPMO ||
      //   isAdmin ||
      //   isMinister ||
      //   isBITeam ||
      //   (isInManager &&
      //     oListItem.get_item("InitiativePM") &&
      //     oListItem.get_item("InitiativePM").get_lookupId() == UserN.Id) ||
      //   (isInOwner &&
      //     oListItem.get_item("InitiativeOwner") &&
      //     oListItem.get_item("InitiativeOwner").get_lookupId() == UserN.Id)
      // ) {
        
        //getting 1st stats data
        EstimatedCost += oListItem.get_item("EstimatedCost") || 0; //masroufa
        SpendFromBudget = oListItem.get_item("EstimatedCost") || 0;
        // ActualBudget += oListItem.get_item("InitiativeBudget") || 0; //masroufa
        AssignedBudget += oListItem.get_item('ActualCost') || 0; // total budget
        initiativeBudget +=  oListItem.get_item('InitiativeBudget') || 0;
        numberofInitiatives++;
        //projects listing
        projectname = oListItem.get_item("Name") || No_Data;
        initiativeCode = oListItem.get_item("Title") || No_Data; //.replace(/[^a-z0-9]/gi, '')

        phases = oListItem.get_item("Phase")
          ? oListItem.get_item("Phase")
          : No_Data;
        subsector = oListItem.get_item("SubSector")
          ? oListItem.get_item("SubSector")
          : No_Data;

        // priority = oListItem.get_item('Priority') || "nodata";
        var phasename, phasecode;

        if (localStorage.getItem("Dynamo_Phases") != null) {
          phasesArray = JSON.parse(
            localStorage.getItem("Dynamo_Phases") || "[]"
          );
          phasesArray = phasesArray.filter(function (a) {
            return a.code == phases;
          });

          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            phasename = phasesArray.length ? phasesArray[0].name : "";
          } else phasename = phasesArray.length ? phasesArray[0].nameEn : "";

          phasecode = phasesArray.length ? phasesArray[0].code : "";
        }
        var subsectorname, substorcode;
        if (localStorage.getItem("Dynamo_Internal Entities") != null) {
          subsectorArray = JSON.parse(
            localStorage.getItem("Dynamo_Internal Entities") || "[]"
          );
          subsectorArray = subsectorArray.filter(function (a) {
            return a.code == subsector;
          });
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            subsectorname = subsectorArray.length ? subsectorArray[0].name : "";
          } else
            subsectorname = subsectorArray.length
              ? subsectorArray[0].nameEn
              : "";
          substorcode = subsectorArray.length ? subsectorArray[0].code : "";
        }

        ProgressStatus =
          oListItem.get_item("InitiativeProgressStatus") || "nodata";
        // ScheduleProjectPercentageComplete = oListItem.get_item('ScheduleProjectPercentageComplet0') || 0;
        // ScheduleProgressStatusarray.push(ScheduleProjectPercentageComplete)
        projectPortfolioCode = oListItem.get_item("Portfolio") || No_Data;
        projectSector = oListItem.get_item("Sector") || No_Data;
        intiativeType = oListItem.get_item("Types") || "nodata";
        // strategy = oListItem.get_item('IsStrategicProject') || "no";

        if (originalstate) {
          // in original state before any filter [before culminating data]
          phasefilterarray.push({ code: phasecode, name: phasename });
          phasefilterarray.sort((a, b) => (a.code > b.code ? 1 : -1));
          subsectorfilterarray.push({ code: substorcode, name: subsectorname });
          subsectorfilterarray.sort((a, b) => (a.code > b.code ? 1 : -1));
          uniqueArray = (a) =>
            [...new Set(a.map((o) => JSON.stringify(o)))].map((s) =>
              JSON.parse(s)
            );
          phasefilterarray = uniqueArray(phasefilterarray);
          subsectorfilterarray = uniqueArray(subsectorfilterarray);
          // Priorities.push(priority);
          // priorityfilterarray = uniqueArray(Priorities);
          Progressarray.push(ProgressStatus);
          progressfilterarray = uniqueArray(Progressarray);
        }
        // phasename = phasename ? phasename : No_Data
        projectshtml =
          '<div id class="card ProjectCards ' +
          intiativeType +
          ' " >' +
          '<div class="card-header bg-white" id="headingProject' +
          initiativeCode +
          '">' +
          '<div class="acc-header mb-0 py-3 px-2 d-flex justify-content-between collapsed" data-toggle="collapse" data-target="#collapseProject' +
          initiativeCode +
          '" aria-expanded="false" aria-controls="collapseProject' +
          initiativeCode +
          '">' +
          '<h4 class="acc-title d-inline-flex"><a href="' +
          _spPageContextInfo.webAbsoluteUrl +
          "/sitepages/InitiativeHome.aspx?ICODE=" +
          oListItem.get_item("Title") +
          '">' +
          projectname +
          "<a/></h4>" +
          '<div class="d-inline-flex flex-column mx-2 ' +
          phases +
          '">' +
          // '<h4 class="text-warning">' +
          // phasename +
          // "</h4>" +
          '<span class="des-13 d-flex"><img src="' +
          iconstagesm +
          '" class="h-100" data-themekey="#"><span data-trans-filter1 class="state-val mx-2 Resources"></span></span>' +
          '<h4 class="text-warning">' +
          phasename +
          "</h4>" +
          "</div>" +
          '<div class="d-inline-flex flex-column mx-2 ' +
          ProgressStatus +
          ' ">' + //deliv-status
          // "<h4 data-trans-" + ProgressStatus + '  data-prname="' + initiativeCode + '" class="Resources"></h4>' +
          '<span class="des-13 d-flex"><img src="' +
          iconstatustimesm +
          '" class="h-100" data-themekey="#"><span data-trans-completionstatus class="complition-val mx-2 Resources"></span></span>' +
          "<h4 data-trans-" +
          ProgressStatus +
          '  data-prname="' +
          initiativeCode +
          '" class="Resources"></h4>' +
          "</div>" +
          // '<div class="d-inline-flex flex-column mx-2">' +
          // "<h4 data-trans-" +
          // priority +
          // ' class="black Resources" ></h4>' +
          // '<span class="des-13 d-flex"><img src="' +
          // iconimportantsm +
          // '" class="h-100" data-themekey="#"><span data-trans-Importance class="v-important-val mx-2 Resources"></span></span>' +
          // "</div>" +
          // '<div class="d-inline-flex flex-column mx-2">' +
          // "<h4 data-trans-" +
          // strategy +
          // ' class="black Resources"> ' +strategy +'</h4>' +
          // '<span class="des-13 d-flex"><img src="' +
          // iconstrategysm +
          // '" class="h-100" data-themekey="#"><span data-trans-strategy class="v-important-val mx-2 Resources"></span></span>' +
          // "</div>" +
          '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div id="collapseProject' +
          initiativeCode +
          '" class="collapse" aria-labelledby="headingProject' +
          initiativeCode +
          '" data-parent="#accordionProject" style="">' +
          '<div class="card-body">' +
          '<div class="d-flex justify-content-between pb-2">' +
          '<div class="d-inline-flex flex-row mx-2">' +
          '<a href="' +
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/Listing.aspx?ListKey=initiativeissues&ICODE=" +
          initiativeCode +
          '">' +
          '<span class="project-inner inner-data1">' +
          '<img src="' +
          calendar +
          '" class="" data-themekey="#">' +
          '<span data-trans-Issues class="mx-2 inner-title des-12 reg Resources"></span>' +
          '<span data-prname="' +
          initiativeCode +
          '" class="inner-val fnt-14 bold">12</span>' +
          "</span>" +
          "</a>" +
          "</div>" +
          '<div class="d-inline-flex flex-row mx-2">' +
          '<a href="' +
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/Listing.aspx?ListKey=initiativerisks&ICODE=" +
          initiativeCode +
          '">' +
          '<span class="project-inner inner-data2">' +
          '<img src="' +
          risk +
          '" class="" data-themekey="#">' +
          '<span data-trans-Risks class="mx-2 inner-title des-12 reg Resources"></span>' +
          '<span data-prname="' +
          initiativeCode +
          '" class="inner-val fnt-14 bold">12</span>' +
          "</span>" +
          "</a>" +
          "</div>" +
          '<div style="display:none !important" class="d-inline-flex flex-row mx-2">' +
          '<span class="project-inner inner-data3">' +
          '<img src="' +
          progress +
          '" class="" data-themekey="#">' +
          '<span data-trans-CompletionPercentage class="mx-2 inner-title des-12 reg Resources"></span>' +
          '<span data-prname="' +
          initiativeCode +
          '" class="inner-val fnt-14 bold">12</span>' +
          "</span>" +
          "</div>" +
          '<div class="d-inline-flex flex-row mx-2">' +
          '<span class="project-inner inner-data4">' +
          '<img src="' +
          mizania +
          '" class="" data-themekey="#">' +
          '<span data-trans-inpattr43 class="mx-2 inner-title des-12 reg Resources"></span>' +
          '<span data-prname="' +
          initiativeCode +
          '" class="inner-val fnt-14 bold">' +
          initiativeRequest.g.kFormatter(SpendFromBudget) +
          "</span>" +
          "</span>" +
          "</div>" +
          '<div class="d-inline-flex flex-row mx-2" style="display:none !important">' +
          '<span class="project-inner inner-data5">' +
          '<img src="' +
          mizania +
          '" class="" data-themekey="#">' +
          '<span data-trans-Portfolio class="mx-2 inner-title des-12 reg Resources"></span>' +
          '<span title="' +
          projectPortfolioCode +
          '" data-prname="' +
          oListItem.get_item("Title") +
          '" class="inner-val fnt-14 bold portfolioName"></span>' +
          "</span>" +
          "</div>" +
          '<div class="d-inline-flex flex-row mx-2" style="display:none !important">' +
          '<span class="project-inner inner-data6">' +
          '<img src="' +
          mizania +
          '" class="" data-themekey="#">' +
          '<span data-trans-Section class="mx-2 inner-title des-12 reg Resources"></span>' +
          '<span title="' +
          projectSector +
          '" data-prname="' +
          oListItem.get_item("Title") +
          '" class="inner-val fnt-14 bold SectorName"></span>' +
          "</span>" +
          "</div>" +
          '<div class="d-inline-flex flex-row mx-2" style="width:20px">' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>";

        if (intiativeType === "vision") {
          initiativesVisionHTML += projectshtml;

          initiativesVisionCount = initiativesVisionCount + 1;
        } else if (intiativeType === "strategically") {
          initiativesStratigalHTML += projectshtml;
          initiativesStratigalCount = initiativesStratigalCount + 1;
        } else if (intiativeType === "lms") {
          initiativesLMSHTML += projectshtml;
          initiativesLMSCount = initiativesLMSCount + 1;
        }

        phaseCodeArray.push(phases);
        subsectorCodeArray.push(subsector);
        phaseNameArray2.push(phases);
        // Priorityarray.push(priority);
        ProgressStatusarray.push(ProgressStatus);

        initiativesNames.push(projectname);
        UInitiatives.push(initiativeCode);
        if (
          strategy == true ||
          strategy == "true" ||
          strategy == "yes" ||
          strategy == "Yes"
        ) {
          strategyarray.push("yes");
        } else {
          strategyarray.push("no");
        }
      // }
    }
    const arrToInstanceCountObj = (arr) =>
      arr.reduce((obj, e) => {
        obj[e] = (obj[e] || 0) + 1;
        return obj;
      }, {});

    //projectTypecount
    $("#internalProjectCount").html(initiativesStratigalCount);
    $("#externalProjectCount").html(initiativesVisionCount);
    $("#LMSProjectCount").html(initiativesLMSCount);
    totalforhidstrat = initiativesStratigalCount;
    totalforhidvis = initiativesVisionCount;
    totalforhidvisLMS = initiativesLMSCount;
    //Project Progress
    //Sort Priority
    ProgressStatusarray.sort();

    progressOccurenceObject = arrToInstanceCountObj(ProgressStatusarray);

    // progressfilterarray.forEach(function (element) {
    //   if (progressOccurenceObject[element]) {
    //     progressOccurence.push(progressOccurenceObject[element]);
    //   } else progressOccurence.push(0);
    // });

    statusOccuresData.forEach(function (element) {
      if (progressOccurenceObject[element]) {
        progressOccurence.push(progressOccurenceObject[element]);
      } else progressOccurence.push(0);
    });

    //Get Priority Name from Resources using priority code
    statusOccuresData.forEach(function (element) {
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        ProgressName.push(Resources.ar[element]);
      } else ProgressName.push(Resources.en[element]);
    });
    // progressfilterarray.forEach(function (element) {
    //   if (
    //     localStorage.getItem("lng") == null ||
    //     localStorage.getItem("lng") == "ar"
    //   ) {
    //     ProgressName.push(Resources.ar[element]);
    //   } else ProgressName.push(Resources.en[element]);
    // });

    //Sort Priority
    Priorityarray.sort();
    priorityOccurenceObject = arrToInstanceCountObj(Priorityarray);
    priorityfilterarray.forEach(function (element) {
      if (priorityOccurenceObject[element]) {
        priorityOccurence.push(priorityOccurenceObject[element]);
      } else priorityOccurence.push(0);
    });

    //Get Priority Name from Resources using priority code
    priorityfilterarray.forEach(function (element) {
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        PriorityName.push(Resources.ar[element]);
      } else PriorityName.push(Resources.en[element]);
    });

    //Phase
    phaseCodeArray.sort();
    subsectorCodeArray.sort();
    // console.log('phaseCodeArray', phaseCodeArray);
    var phaseOccurenceNumb = arrToInstanceCountObj(phaseCodeArray);
    phasefilterarray.forEach(function (element) {
      if (phaseOccurenceNumb[element.code]) {
        phaseOccurence.push(phaseOccurenceNumb[element.code]);
      } else phaseOccurence.push(0);
    });

    phasefilterarray.forEach((element) => phaseNameArray.push(element.name));
    subsectorfilterarray.forEach((element) =>
      subsectorNameArray.push(element.name)
    );
    // console.log('phaseOccurence', phaseOccurence);
    handlePhaseChartBarChart();

    $(".projects-ctx .PNumber").text(numberofInitiatives);
    $("div#accordionProject.internalAccordion").html(initiativesStratigalHTML);
    $("div#accordionProject.externalAccordion").html(initiativesVisionHTML);
    $("div#accordionProject.LMSAccordion").html(initiativesLMSHTML);

    progressstatusarrayALL = progressstatusarray;

    if (originalstate) {
      // handling filters  [after culminating data]
      var phasefilterhtml =
        '<label class="dropdown-item main-action-filter"><button data-trans-CanselSelections class="clear-filter Resources" type="button"></button></label>';
      for (var i = 0; i < phasefilterarray.length; i++) {
        phasefilterhtml +=
          '<label class="dropdown-item"><span>' +
          phasefilterarray[i].name +
          '</span><input data-type="Text" data-internal="Phase" type="checkbox" name="Phase" value="' +
          phasefilterarray[i].code +
          '"></label>';
      }
      $(".content-list-head .page-filter .dropdown-menu.Filter-1").html(
        phasefilterhtml
      );

      var subsectorfilterhtml =
        '<label class="dropdown-item main-action-filter"><button data-trans-CanselSelections class="clear-filter Resources" type="button"></button></label>';
      for (var i = 0; i < subsectorfilterarray.length; i++) {
        subsectorfilterhtml +=
          '<label class="dropdown-item"><span>' +
          subsectorfilterarray[i].name +
          '</span><input data-type="Text" data-internal="SubSector" type="checkbox" name="SubSector" value="' +
          subsectorfilterarray[i].code +
          '"></label>';
      }
      $(".content-list-head .page-filter .dropdown-menu.Filter-5").html(
        subsectorfilterhtml
      );

      var priorityfilterhtml =
        '<label class="dropdown-item main-action-filter"><button data-trans-CanselSelections class="clear-filter Resources" type="button"></button></label>';
      for (var i = 0; i < priorityfilterarray.length; i++) {
        priorityfilterhtml +=
          '<label class="dropdown-item"><span data-trans-' +
          priorityfilterarray[i] +
          ' class="Resources" ></span><input data-type="Text" data-internal="Priority" type="checkbox" name="Priority" value="' +
          priorityfilterarray[i] +
          '"></label>';
      }
      $(".content-list-head .page-filter .dropdown-menu.Filter-2").html(
        priorityfilterhtml
      );

      //filter progress status array
      var progressfilterhtml =
        '<label class="dropdown-item main-action-filter"><button data-trans-CanselSelections class="clear-filter Resources" type="button"></button></label>';
      for (var i = 0; i < progressfilterarray.length; i++) {
        progressfilterhtml +=
          '<label class="dropdown-item"><span data-trans-' +
          progressfilterarray[i] +
          ' class="Resources" ></span><input data-type="Text" data-internal="InitiativeProgressStatus" type="checkbox" name="InitiativeProgressStatus" value="' +
          progressfilterarray[i] +
          '"></label>';
      }
      $(".content-list-head .page-filter .dropdown-menu.Filter-3").html(
        progressfilterhtml
      );

      if (strategyarray.length) {
        strategyarray = strategyarray.reduce(function (acc, curr) {
          if (typeof acc[curr] == "undefined") {
            acc[curr] = 1;
          } else {
            acc[curr] += 1;
          }
          return acc;
        }, {});
      }
      var filterstrategy = Object.keys(strategyarray),
        strategyfilterhtml =
          '<label class="dropdown-item main-action-filter"><button data-trans-CanselSelections class="clear-filter Resources" type="button"></button></label>';
      // console.log('filterstrategy', filterstrategy);
      // for (var i = 0; i < filterstrategy.length; i++) {
      // 	if (filterstrategy[i] != No_Data) {
      // 		strategyfilterhtml +=
      // 			'<label class="dropdown-item"><span data-trans-' +
      // 			filterstrategy[i] +
      // 			' class="Resources"></span><input data-type="Integer" data-columntype="Boolean" data-internal="IsStrategicProject" type="checkbox" name="IsStrategicProject" value="' +
      // 			filterstrategy[i] +
      // 			'"></label>';
      // 	}
      // 	// if (filterstrategy[i] != No_Data) {
      // 	//     strategyfilterhtml += '<label class="dropdown-item"><span data-trans-' + filterstrategy[i] + ' class="Resources"></span><input data-type="text" data-internal="IsStrategicProject" type="checkbox" name="IsStrategicProject" value="' + filterstrategy[i] + '"></label>';
      // 	// }
      // }
      // $(".content-list-head .page-filter .dropdown-menu.Filter-4").html(
      // 	strategyfilterhtml
      // );

      //End of filters

      $("button.clear-filter").on("click", function (e) {
        e.stopPropagation();
        if (
          $(this).closest(".dropdown-menu").find("input:checkbox:checked")
            .length
        ) {
          $(this)
            .closest(".dropdown-menu")
            .find("input:checkbox")
            .prop({
              checked: false,
              disabled: true,
            })
            .trigger("change");
        }
      });
      initiativeRequest.g.filtertrigger(); // filter trigger
    }
    initiativeRequest.g.statisticsbars(); //assigning data to stats
    initiativeRequest.g.handlescrollview(); //intialize viewelement in scroll
    //
    //calling other data
    Risks_Info_Request.init();
    budgetItemRequest.init();
    Deliverables_Info_Request.init();
    // initiativeRequest.g.showprojectonclick(); //view more action
    changeResources();
    $("body").animate(
      {
        opacity: 1,
      },
      {
        duration: 333,
        complete: function () {
          $(
            ".page-filter .dropdown-menu label.dropdown-item input:checkbox"
          ).prop({
            disabled: false,
          });
        },
      }
    );
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
    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {
      $(".page-title").html(ar_UserRole);
    } else $(".page-title").html(en_UserRole);
    if (originalstate) {
      initiativeRequest.g.ChartsFilteration();
    }
    PortfoliosInfoRequest.preinit();
    SectorsInfoRequest.preinit();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {
    filtertrigger: function () {
      $(".page-filter .dropdown-menu label input:checkbox").change(function (
        e
      ) {
        console.log("YYY");

        FilterChoices = [];
        portfoliosdata = [];
        portfoliosoptions = [];

        $(".page-filter .dropdown-menu").each(function () {
          //looping through filters
          var internalName = $(this).find("input:checkbox").data("internal");
          var fieldType = $(this).find("input:checkbox").data("type");
          var BooleanfieldType = $(this)
            .find("input:checkbox")
            .data("columntype");
          // console.log('BooleanfieldType', BooleanfieldType);
          var selectedchoices = $(this)
            .find("input:checked")
            .map(function () {
              //getting selected choices
              return $(this).val();
            })
            .get();
          if (selectedchoices.length) {
            //checking if there are choices
            if (BooleanfieldType == "Boolean") {
              for (i = 0; i < selectedchoices.length; i++) {
                if (
                  selectedchoices[i] == "true" ||
                  selectedchoices[i] == "Yes" ||
                  selectedchoices[i] == "yes"
                ) {
                  selectedchoices[i] = 1;
                } else selectedchoices[i] = 0;
              }
            }
            FilterChoices.push({
              internalName: internalName,
              Type: fieldType,
              Values: selectedchoices,
            });
          }
        });
        initiativeRequest.g.camlfilterbuilder();
      });
      $(".page-filter .dropdown-menu label.dropdown-item").on(
        "click",
        function (e) {
          e.stopPropagation();
        }
      );
    },
    camlfilterbuilder: function () {
      originalstate = false; //not in original state anymore
      (Query_Body = ""), (Where_Body = ""), (ViewFields = "");
      // emptying all data arrays and floats exept for arrays related to filter
      (UInitiatives = []),
        (Riskarray = []),
        (Issuearray = []),
        (Deliverablesarray = []),
        (Progressarray = []),
        (ActualBudget = 0),
        (AssignedBudget = 0),
        (EstimatedBudget = 0),
        (numberofInitiatives = 0),
        (NTasks = 0),
        (RSupport = 0),
        (RisksCount = 0),
        (IssuesCount = 0),
        (TasksCount = 0),
        (percentageofRisks = 0),
        (percentageofIssues = 0),
        (percentageofTasks = 0),
        (PriorityCardhtml = ""),
        (progressstatusarray = []),
        (progressstatusarrayALL = []),
        (strategyarray = []),
        (phaseOccurence = []),
        (phaseOccurenceReverse = []),
        (phaseNameArray = []),
        (Low = 0),
        (Medium = 0),
        (Hight = 0),
        (priorityOccurence = []),
        (progressOccurence = []),
        (PriorityName = []),
        (ProgressName = []),
        (subsectorNameArray = []),
        (portfoliosName = []),
        (window.portfoliosProjectCount = []),
        (SectorsName = []),
        (SectorsEnName = []),
        (SectorsProjectCount = []),
        (budgetData = []),
        (ScheduleProgressStatusarray = []);
      $("body").animate(
        {
          opacity: 0.5,
        },
        {
          duration: 333,
          complete: function () {},
        }
      );
      if (FilterChoices.length == 0) {
        // if (isInManager || isInOwner) {
        //   PQuery = InitiativeAccessQuery
        // } else {
        PQuery =
          "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query></View>";
        // }
        initiativeRequest.init();
      } //if there are choices build caml query
      else {
        $("#clearAllFilter").prop("disabled", false);
        $(
          ".page-filter .dropdown-menu label.dropdown-item input:checkbox"
        ).prop({
          disabled: true,
        });
        for (var k = 0; k < FilterChoices.length; k++) {
          ViewFields +=
            '<FieldRef Name="' + FilterChoices[k].InternalName + '"/>';
        }

        Where_Body =
          "<And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>";
        //dynamic query building
        for (var i = 0; i < FilterChoices.length; i++) {
          //only one choice
          if (FilterChoices.length == 1) {
            Where_Body +=
              '<In><FieldRef Name="' +
              FilterChoices[i].internalName +
              '" /><Values>';
            for (var j = 0; j < FilterChoices[i].Values.length; j++) {
              Where_Body +=
                '<Value Type="' +
                FilterChoices[i].Type +
                '">' +
                FilterChoices[i].Values[j] +
                "</Value>";
            }
            Where_Body += "</Values></In>";
          }
          //Two choices
          else if (FilterChoices.length == 2) {
            if (i == 0) {
              Where_Body +=
                '<And><In><FieldRef Name="' +
                FilterChoices[i].internalName +
                '" /><Values>';
              for (var j = 0; j < FilterChoices[i].Values.length; j++) {
                Where_Body +=
                  '<Value Type="' +
                  FilterChoices[i].Type +
                  '">' +
                  FilterChoices[i].Values[j] +
                  "</Value>";
              }
              Where_Body += "</Values></In>";
            } else {
              Where_Body +=
                '<In><FieldRef Name="' +
                FilterChoices[i].internalName +
                '" /><Values>';
              for (var j = 0; j < FilterChoices[i].Values.length; j++) {
                Where_Body +=
                  '<Value Type="' +
                  FilterChoices[i].Type +
                  '">' +
                  FilterChoices[i].Values[j] +
                  "</Value>";
              }
              Where_Body += "</Values></In></And>";
            }
          }
          //More than two choices
          else if (FilterChoices.length > 2) {
            //two Eqs in last And
            if (i == FilterChoices.length - 1) {
              Where_Body +=
                '<In><FieldRef Name="' +
                FilterChoices[i].internalName +
                '" /><Values>';
              for (var j = 0; j < FilterChoices[i].Values.length; j++) {
                Where_Body +=
                  '<Value Type="' +
                  FilterChoices[i].Type +
                  '">' +
                  FilterChoices[i].Values[j] +
                  "</Value>";
              }
              Where_Body += "</Values></In>";

              //appending And closure
              var count = (Where_Body.match(/<And>/g) || []).length;
              var ANDC = "</And>".repeat(count);
              Where_Body += ANDC;
            }
            //normal And
            else {
              Where_Body +=
                '<And><In><FieldRef Name="' +
                FilterChoices[i].internalName +
                '" /><Values>';
              for (var j = 0; j < FilterChoices[i].Values.length; j++) {
                Where_Body +=
                  '<Value Type="' +
                  FilterChoices[i].Type +
                  '">' +
                  FilterChoices[i].Values[j] +
                  "</Value>";
              }
              Where_Body += "</Values></In>";
            }
          }
          // Where_Body += '</And>';
          //Finish Line, make last changes and build query
          if (i == FilterChoices.length - 1) {
            Where_Body.replace(
              'Type="DateTime"',
              'IncludeTimeValue="False" Type="DateTime"'
            );

            Query_Body =
              "<View>" +
              // '<ViewFields>' + //use it for paging jsom calls
              //     ViewFields
              // '</ViewFields>' +
              "<Query>" +
              "<Where>" +
              Where_Body +
              "</And></Where>" +
              // '<OrderBy>' +
              // '<FieldRef Name="' + sortColumn + '" Ascending="'+isAscending+'" />' +
              // '</OrderBy>' +
              "</Query>" +
              // '<RowLimit>' + pageSize + '</RowLimit>'+
              "</View>";
          }
        }

        PQuery = Query_Body;
        initiativeRequest.init();
        // }
      }

      if (
        $(".page-filter .dropdown-menu").find("input:checkbox:checked")
          .length == 0
      ) {
        $("#clearAllFilter").prop("disabled", true);
      }
      $("#clearAllFilter")
        .off()
        .on("click", function (e) {
          // add .off() to make sure that the onclick invoke one time and the camlfilterbuilder() will render once
          e.stopPropagation();
          if (
            $(".page-filter .dropdown-menu").find("input:checkbox:checked")
              .length
          ) {
            $(".page-filter .dropdown-menu:not(#forQueryAccess)")
              .find("input:checkbox")
              .prop({
                checked: false,
                disabled: true,
              });
          }
          FilterChoices = [];
          initiativeRequest.g.camlfilterbuilder();

          if (
            $(".page-filter .dropdown-menu").find("input:checkbox:checked")
              .length == 0
          ) {
            // $('.clearAllFilter').addClass('noOptionSelected');
            $("#clearAllFilter").prop("disabled", true);
          }
        });
    },
    statisticsbars: function () {},
    handlescrollview: function () {
      $.fn.isInViewport = function () {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
      };
    },
    showprojectonclick: function () {
      $(".accordion#accordionProject.internalAccordion a.view-more").on(
        "click",
        function () {
          var internalselector = $(
            ".accordion#accordionProject.internalAccordion > .card"
          ).not(":visible");
          internalselector.prevObject.length = 5;
          var internalvisiblelength = $(
            ".accordion#accordionProject.internalAccordion > .card:visible"
          ).length;
          var internaltt = internalvisiblelength + 6;
          var internaltoshow = $(
            ".accordion#accordionProject.internalAccordion > .card:hidden:nth-child(-n+" +
              internaltt +
              ")"
          );
          setTimeout(function () {
            internaltoshow.each(function () {
              $(this)
                .css("display", "block")
                .animate(
                  {
                    opacity: 1,
                    height: 75.5,
                  },
                  {
                    duration: 333,
                    complete: function () {
                      $(this).attr(
                        "style",
                        "display: block; opacity: 1; height: auto;"
                      );
                    },
                  }
                );
            });
            //rechecking visibility
            internalvisiblelength = $(
              ".accordion#accordionProject.internalAccordion > .card:visible"
            ).length;
            internaltt = internalvisiblelength + 6;
            internaltoshow = $(
              ".accordion#accordionProject.internalAccordion > .card:hidden:nth-child(-n+" +
                internaltt +
                ")"
            );
            if (internaltoshow.length == 0) {
              $(
                ".accordion#accordionProject.internalAccordion a.view-more"
              ).animate(
                {
                  opacity: 0,
                  height: 0,
                },
                {
                  duration: 333,
                  complete: function () {
                    $(
                      ".accordion#accordionProject.internalAccordion a.view-more"
                    ).attr("style", "display: none!important;");
                  },
                }
              );
              $(
                ".accordion#accordionProject.internalAccordion a.view-less"
              ).animate(
                {
                  opacity: 1,
                  height: 34,
                },
                {
                  duration: 333,
                  complete: function () {
                    $(
                      ".accordion#accordionProject.internalAccordion a.view-less"
                    ).attr("style", "display: block;");
                  },
                }
              );
            }
          }, 133);
        }
      );
      $(".accordion#accordionProject.internalAccordion a.view-less").on(
        "click",
        function () {
          var tohide = $(
            ".accordion#accordionProject.internalAccordion > .card:nth-child(n+4)"
          );
          setTimeout(function () {
            tohide.each(function () {
              $(this).animate(
                {
                  opacity: 0,
                  height: 0,
                },
                {
                  duration: 333,
                  complete: function () {
                    $(this).attr("style", "display: none;");
                  },
                }
              );
            });
          }, 133);
          $(
            ".accordion#accordionProject.internalAccordion a.view-less"
          ).animate(
            {
              opacity: 0,
              height: 0,
            },
            {
              duration: 333,
              complete: function () {
                $(
                  ".accordion#accordionProject.internalAccordion a.view-more"
                ).animate(
                  {
                    opacity: 1,
                    height: 34,
                  },
                  {
                    duration: 333,
                    complete: function () {
                      $(
                        ".accordion#accordionProject.internalAccordion a.view-more"
                      ).attr("style", "display: block;");
                    },
                  }
                );
              },
            }
          );
        }
      );
      $(".accordion#accordionProject.externalAccordion a.view-more").on(
        "click",
        function () {
          var externalselector = $(
            ".accordion#accordionProject.externalAccordion > .card"
          ).not(":visible");
          externalselector.prevObject.length = 5;
          var externalvisiblelength = $(
            ".accordion#accordionProject.externalAccordion > .card:visible"
          ).length;
          var externaltt = externalvisiblelength + 6;
          var externaltoshow = $(
            ".accordion#accordionProject.externalAccordion > .card:hidden:nth-child(-n+" +
              externaltt +
              ")"
          );
          setTimeout(function () {
            externaltoshow.each(function () {
              $(this)
                .css("display", "block")
                .animate(
                  {
                    opacity: 1,
                    height: 75.5,
                  },
                  {
                    duration: 333,
                    complete: function () {
                      $(this).attr(
                        "style",
                        "display: block; opacity: 1; height: auto;"
                      );
                    },
                  }
                );
            });
            //rechecking visibility
            externalvisiblelength = $(
              ".accordion#accordionProject.externalAccordion > .card:visible"
            ).length;
            externaltt = externalvisiblelength + 6;
            externaltoshow = $(
              ".accordion#accordionProject.externalAccordion > .card:hidden:nth-child(-n+" +
                externaltt +
                ")"
            );
            if (externaltoshow.length == 0) {
              $(
                ".accordion#accordionProject.externalAccordion a.view-more"
              ).animate(
                {
                  opacity: 0,
                  height: 0,
                },
                {
                  duration: 333,
                  complete: function () {
                    $(
                      ".accordion#accordionProject.externalAccordion a.view-more"
                    ).attr("style", "display: none!important;");
                  },
                }
              );
              $(
                ".accordion#accordionProject.externalAccordion a.view-less"
              ).animate(
                {
                  opacity: 1,
                  height: 34,
                },
                {
                  duration: 333,
                  complete: function () {
                    $(
                      ".accordion#accordionProject.externalAccordion a.view-less"
                    ).attr("style", "display: block;");
                  },
                }
              );
            }
          }, 133);
        }
      );
      $(".accordion#accordionProject.externalAccordion a.view-less").on(
        "click",
        function () {
          var tohide = $(
            ".accordion#accordionProject.externalAccordion > .card:nth-child(n+4)"
          );
          setTimeout(function () {
            tohide.each(function () {
              $(this).animate(
                {
                  opacity: 0,
                  height: 0,
                },
                {
                  duration: 333,
                  complete: function () {
                    $(this).attr("style", "display: none;");
                  },
                }
              );
            });
          }, 133);
          $(
            ".accordion#accordionProject.externalAccordion a.view-less"
          ).animate(
            {
              opacity: 0,
              height: 0,
            },
            {
              duration: 333,
              complete: function () {
                $(
                  ".accordion#accordionProject.externalAccordion a.view-more"
                ).animate(
                  {
                    opacity: 1,
                    height: 34,
                  },
                  {
                    duration: 333,
                    complete: function () {
                      $(
                        ".accordion#accordionProject.externalAccordion a.view-more"
                      ).attr("style", "display: block;");
                    },
                  }
                );
              },
            }
          );
        }
      );
      //
      $(".accordion#accordionProject.LMSAccordion a.view-more").on(
        "click",
        function () {
          var externalselector = $(
            ".accordion#accordionProject.LMSAccordion > .card"
          ).not(":visible");
          externalselector.prevObject.length = 5;
          var externalvisiblelength = $(
            ".accordion#accordionProject.LMSAccordion > .card:visible"
          ).length;
          var externaltt = externalvisiblelength + 6;
          var externaltoshow = $(
            ".accordion#accordionProject.LMSAccordion > .card:hidden:nth-child(-n+" +
              externaltt +
              ")"
          );
          setTimeout(function () {
            externaltoshow.each(function () {
              $(this)
                .css("display", "block")
                .animate(
                  {
                    opacity: 1,
                    height: 75.5,
                  },
                  {
                    duration: 333,
                    complete: function () {
                      $(this).attr(
                        "style",
                        "display: block; opacity: 1; height: auto;"
                      );
                    },
                  }
                );
            });
            //rechecking visibility
            externalvisiblelength = $(
              ".accordion#accordionProject.LMSAccordion > .card:visible"
            ).length;
            externaltt = externalvisiblelength + 6;
            externaltoshow = $(
              ".accordion#accordionProject.LMSAccordion > .card:hidden:nth-child(-n+" +
                externaltt +
                ")"
            );
            if (externaltoshow.length == 0) {
              $(".accordion#accordionProject.LMSAccordion a.view-more").animate(
                {
                  opacity: 0,
                  height: 0,
                },
                {
                  duration: 333,
                  complete: function () {
                    $(
                      ".accordion#accordionProject.LMSAccordion a.view-more"
                    ).attr("style", "display: none!important;");
                  },
                }
              );
              $(".accordion#accordionProject.LMSAccordion a.view-less").animate(
                {
                  opacity: 1,
                  height: 34,
                },
                {
                  duration: 333,
                  complete: function () {
                    $(
                      ".accordion#accordionProject.LMSAccordion a.view-less"
                    ).attr("style", "display: block;");
                  },
                }
              );
            }
          }, 133);
        }
      );
      $(".accordion#accordionProject.LMSAccordion a.view-less").on(
        "click",
        function () {
          var tohide = $(
            ".accordion#accordionProject.LMSAccordion > .card:nth-child(n+4)"
          );
          setTimeout(function () {
            tohide.each(function () {
              $(this).animate(
                {
                  opacity: 0,
                  height: 0,
                },
                {
                  duration: 333,
                  complete: function () {
                    $(this).attr("style", "display: none;");
                  },
                }
              );
            });
          }, 133);
          $(".accordion#accordionProject.LMSAccordion a.view-less").animate(
            {
              opacity: 0,
              height: 0,
            },
            {
              duration: 333,
              complete: function () {
                $(
                  ".accordion#accordionProject.LMSAccordion a.view-more"
                ).animate(
                  {
                    opacity: 1,
                    height: 34,
                  },
                  {
                    duration: 333,
                    complete: function () {
                      $(
                        ".accordion#accordionProject.LMSAccordion a.view-more"
                      ).attr("style", "display: block;");
                    },
                  }
                );
              },
            }
          );
        }
      );
    },
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
        var datetouse2 = datetouse[1] + "/" + datetouse[0] + "/" + datetouse[2]; //dd/mm/yyy
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

    ChartsFilteration: function () {
      $(".CardDivall a").on("click", function (event) {
        ClickedChart = $(this).closest('div[id*="carditem"]').attr("id");
        //clicked div //will hide
        lastChar1 = ClickedChart.substr(ClickedChart.length - 1); //container we clicked on
        //clicked card //will show
        var ClickedID = event.target.id;

        var lastChar = ClickedID.substr(ClickedID.length - 1); //link we clicked on

        if ($("div#carditem" + lastChar).is(":hidden")) {
          $("div#carditem" + lastChar1).before($("div#carditem" + lastChar));
        }
        $("div#carditem" + lastChar).show();
        if ($('.cardIemClass:not([style*="display: none"])').length > 2) {
          // to toggle the charts in two charts only
          $("div#carditem" + lastChar1).hide();
        }

        $("div[id*=carditem]").each(function () {
          var chartid = $(this).attr("id");
          chartid = chartid.substr(chartid.length - 1);
          if ($(this).is(":hidden")) {
            $("a#CardDiv" + chartid).show();
          } else {
            $("a#CardDiv" + chartid).hide();
          }
        });
      });

      //visible ,num $link

      //hide unvisible dropdown lists
      $("div[id*=carditem]").each(function () {
        var chartid = $(this).attr("id");
        chartid = chartid.substr(chartid.length - 1);
        if ($(this).is(":hidden")) {
          $("a#CardDiv" + chartid).show();
        } else {
          $("a#CardDiv" + chartid).hide();
        }
      });
    },
  },
};
window.checkInitiativeHomeHtml = setInterval(function () {
  initiativeRequest.preinit();
}, 1000);
//Risks
var Risks_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Risks");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='InitiativeCode' Ascending='False' /></OrderBy></Query></View>"
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
    var NRisks = 0,
      riskshtml = "",
      riskname,
      riskID,
      riskTitle;
    // ExistVar2=UInitiatives.includes(oListItem.get_item('ProjectCode'));
    var riskcountForrsprt = 0;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      ExistVar2 = UInitiatives.includes(oListItem.get_item("InitiativeCode"));

      if (UInitiatives.includes(oListItem.get_item("InitiativeCode"))) {
        var RiskProIndex = UInitiatives.indexOf(
          oListItem.get_item("InitiativeCode")
        );
        var RiskProName = initiativesNames[RiskProIndex];
        //console.log(RiskProName);
        Riskarray.push(oListItem.get_item("InitiativeCode"));
        riskTitle = oListItem.get_item("Title") || No_Data;
        riskname = oListItem.get_item("Name") || No_Data;
        riskID = oListItem.get_item("ID") || No_Data;
        var risk_impact =
          oListItem.get_item("Impact") == null
            ? ""
            : oListItem.get_item("Impact");
        // console.log('risk_impact', risk_impact);
        // console.log('risk_impact', risk_impact == 'Medium');
        //risk impact donught data
        if (risk_impact.toLowerCase() == "low") {
          Low = Low + 1;
        } else if (risk_impact.toLowerCase() == "medium") {
          Medium = Medium + 1;
        } else if (risk_impact.toLowerCase() == "hight") {
          Hight = Hight + 1;
        }

        riskshtml +=
          '<li class="list-group-item">' +
          '<a href="' +
          _spPageContextInfo.webAbsoluteUrl +
          "/sitepages/View.aspx?ListKey=risks&IID=" +
          riskID +
          '"><h3 class="des-14 w-0">' +
          riskTitle +
          ", " +
          riskname +
          '</h3><h3 class="des-14 w-0">' +
          RiskProName +
          "</h3></a>" +
          '<div class="des-12 text-nowrap">' +
          "</div>" +
          "</li>";
        RSupport++;
        riskcountForrsprt++;
      }
    }

    handleCircleRiskChart();
    if (!riskshtml) {
      riskshtml = "<p>" + No_Data + "</p>";
    }
    //*****start */Risk,task and issues card
    RisksCount = Riskarray.length;

    //*****end */Risk,task and issues card
    $("div#accordionRequiredSupport > .card:nth-child(3) ul.list-group").html(
      riskshtml
    );
    RisksCountsForRSupport = riskcountForrsprt;
    for (var i = 0; i < UInitiatives.length; i++) {
      var nor = Riskarray.filter((v) => v === UInitiatives[i]).length;
      $('.inner-data2 .inner-val[data-prname="' + UInitiatives[i] + '"]').text(
        nor
      );
    }
    // $('.Rsupprot').text(RSupport);
    changeResources();

    Issues_Info_Request.init();
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
//issues
var Issues_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Issues");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='InitiativeCode' Ascending='False' /></OrderBy></Query></View>"
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
    var NRisks = 0,
      issueshtml = "",
      issuename,
      issueID,
      issueTitle,
      ExistVar1;
    var issuecountForrsprt=0;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      ExistVar1 = UInitiatives.includes(oListItem.get_item("InitiativeCode"));
      if (UInitiatives.includes(oListItem.get_item("InitiativeCode"))) {
        var IssueProIndex = UInitiatives.indexOf(
          oListItem.get_item("InitiativeCode")
        );
        var IssueProName = initiativesNames[IssueProIndex];
        Issuearray.push(oListItem.get_item("InitiativeCode"));

        issuename = oListItem.get_item("Name") || No_Data;
        issueTitle = oListItem.get_item("Title") || No_Data;
        issueID = oListItem.get_item("ID") || No_Data;
        issueshtml +=
          '<li class="list-group-item">' +
          '<a href="' +
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/View.aspx?ListKey=issues&IID=" +
          issueID +
          '"><h3 class="des-14 w-0">' +
          issueTitle +
          ", " +
          issuename +
          '</h3><h3 class="des-14 w-0">' +
          IssueProName +
          "</h3></a>" +
          '<div class="des-12 text-nowrap">' +
          "</div>" +
          "</li>";
        RSupport++;
        issuecountForrsprt++;
      }

      //
    }
    if (!issueshtml) {
      taskshtml = "<p>" + No_Data + "</p>";
    }

    //*****Start */risks,isues and tasks card
    IssuesCount = Issuearray.length;
    percentageofIssues =
      (IssuesCount * 100) / (RisksCount + TasksCount + IssuesCount);
    //$('.ctx-block.row.mx-n2 > div:nth-child(4)  .card-body .media:nth-child(2) .d-flex span:nth-child(2)').text(IssuesCount+'123');
    $(
      ".ctx-block.row.mx-n2 .carditem4  .card-body .media:nth-child(2) .d-flex span:nth-child(2)"
    ).text(IssuesCount);
    // $('.ctx-block.row.mx-n2 > div:nth-child(4) .card-body .media:nth-child(2) .progress-bar').css('width', percentageofIssues + '%');
    $(
      ".ctx-block.row.mx-n2  .carditem4 .card-body .media:nth-child(2) .progress-bar"
    ).css("width", percentageofIssues + "%");

    $("div#accordionRequiredSupport > .card:nth-child(2) ul.list-group").html(
      issueshtml
    );
    issueCountsForRSupport = CurrentUserTasksCount + RisksCountsForRSupport + issuecountForrsprt;
    $("span.Rsupprot").text(issueCountsForRSupport);
    for (var i = 0; i < UInitiatives.length; i++) {
      var nor = Issuearray.filter((v) => v === UInitiatives[i]).length;
      $('.inner-data1 .inner-val[data-prname="' + UInitiatives[i] + '"]').text(
        nor
      );
    }
    // $('.Rsupprot').text(RSupport);
    changeResources();
    percentageofRisks =
      (RisksCount * 100) / (RisksCount + TasksCount + IssuesCount);
    $(
      ".ctx-block.row.mx-n2 > div:nth-child(4)  .card-body .media:nth-child(3) .d-flex span:nth-child(2)"
    ).text(RisksCount);
    $(
      ".ctx-block.row.mx-n2 > div:nth-child(4) .card-body .media:nth-child(3) .progress-bar"
    ).css("width", percentageofRisks + "%");
    percentageofTasks =
      (TasksCount * 100) / (RisksCount + TasksCount + IssuesCount);
    $(
      ".ctx-block.row.mx-n2 > div:nth-child(4)  .card-body .media:nth-child(1) .d-flex span:nth-child(2)"
    ).text(TasksCount);
    $(
      ".ctx-block.row.mx-n2 > div:nth-child(4) .card-body .media:nth-child(1) .progress-bar"
    ).css("width", percentageofTasks + "%");

    //*****end */risks,isues and tasks card
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
//Risks
var budgetItemRequest = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Budget Items");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='InitiativeCode' Ascending='False' /></OrderBy></Query></View>"
    );
    budgetItemRequest.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(budgetItemRequest.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, budgetItemRequest.onSuccess),
      Function.createDelegate(this, budgetItemRequest.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = budgetItemRequest.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var NRisks = 0,
      riskshtml = "",
      riskname,
      riskID,
      riskTitle;
    // ExistVar2=UInitiatives.includes(oListItem.get_item('ProjectCode'));
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      if (UInitiatives.includes(oListItem.get_item("InitiativeCode"))) {
        var RiskProIndex = UInitiatives.indexOf(
          oListItem.get_item("InitiativeCode")
        );
        var RiskProName = initiativesNames[RiskProIndex];
        AssignedBudget += oListItem.get_item("Amount")
          ? oListItem.get_item("Amount")
          : 0;
        budgetItemarray.push(oListItem.get_item("InitiativeCode"));
        riskTitle = oListItem.get_item("Title") || No_Data;
        riskname = oListItem.get_item("Name") || No_Data;
        riskID = oListItem.get_item("ID") || No_Data;
        RSupport++;
      }
    }
    handleBudgetBarChart();
    //*****start */Risk,task and issues card
    RisksCount = budgetItemarray.length;

    // for (var i = 0; i < UInitiatives.length; i++) {
    // 	var nor = Riskarray.filter((v) => v === UInitiatives[i]).length;
    // 	$('.inner-data2 .inner-val[data-prname="' + UInitiatives[i] + '"]').text(
    // 		nor
    // 	);
    // }
    // $('.Rsupprot').text(RSupport);
    changeResources();
    Issues_Info_Request.init();
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
//Deliverakbles
var Noverylate = 0,
  Nolate = 0,
  Noonplan = 0,
  Noahead = 0;
var Deliverables_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("InitiativeDeliverables");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    ); //<Where><Geq><FieldRef Name=\'Committed_x0020_Date\' /><Value IncludeTimeValue=\'TRUE\'  Type=\'DateTime\'><Today /></Value></Geq></Where>
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
    var itemdatevalidation, itemdate;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      if (UInitiatives.includes(oListItem.get_item("InitiativeCode"))) {
        Deliverablesarray.push({
          pcode: oListItem.get_item("InitiativeCode"),
          // delivered: oListItem.get_item("Delivered"),
          delivered: oListItem.get_item("Completed"),
          ammount: oListItem.get_item("Weight"),
          Code: oListItem.get_item("Title"),
        });

        NDelivrables++;
        //
        itemdate =
          initiativeRequest.g.dateConvert(
            oListItem.get_item("PlannedCompletedDate")
          ) || No_Data;
        itemdatevalidation = initiativeRequest.g.dateConvert2(
          oListItem.get_item("PlannedCompletedDate")
        );
        itemdatevalidation = Math.round(
          (new Date() - new Date(itemdatevalidation)) / (1000 * 60 * 60 * 24)
        ); //difference in days
        if (itemdatevalidation >= 0) {
          // expired deliverables
          ExpDeliverablesarray.push({
            pcode: oListItem.get_item("InitiativeCode"),
            // delivered: oListItem.get_item("Delivered"),
            delivered: oListItem.get_item("Completed"),

            ammount: oListItem.get_item("Weight"),
            date: itemdate,
          });
        } // future deliverables
        else {
          FutDeliverablesarray.push({
            pcode: oListItem.get_item("InitiativeCode"),
            // delivered: oListItem.get_item("Delivered"),
            delivered: oListItem.get_item("Completed"),

            ammount: oListItem.get_item("Weight"),
            date: itemdate,
          });
        }
      }
    }
    var NoD,
      NoDY,
      NoDarray,
      statustxt,
      statusnum,
      statusclass,
      ProgressNamearray = [];
    for (var i = 0; i < UInitiatives.length; i++) {
      //future deliverables
      var dforthisprojFut = FutDeliverablesarray.filter(
        (v) => v.pcode === UInitiatives[i]
      );
      var numberofyesFut = dforthisprojFut.filter(
        (v) => v.delivered === "yes" || v.delivered === "Yes"
      );
      //expired deliverables
      var dforthisprojExp = ExpDeliverablesarray.filter(
        (v) => v.pcode === UInitiatives[i]
      );
      var numberofyesExp = dforthisprojExp.filter(
        (v) => v.delivered === "yes" || v.delivered === "Yes"
      );
      //all deliverables
      var dforthisproj = Deliverablesarray.filter(
        (v) => v.pcode === UInitiatives[i]
      );
      var toatlamount = dforthisproj.reduce(
        (accum, item) => accum + item.ammount,
        0
      );
      var numberofyes = dforthisproj.filter(
        (v) => v.delivered === "yes" || v.delivered === "Yes"
      );
      var POD =
        Math.round(
          numberofyes.reduce(
            (accum, item) => accum + (item.ammount * 100) / toatlamount,
            0
          )
        ) || 0;
      // NoD = Deliverablesarray.filter((v) => (v.pcode === UInitiatives[i])).length;
      // NoDarray = Deliverablesarray.filter((v) => (v.pcode === UInitiatives[i]));
      // NoDY = NoDarray.filter((v) => (v.delivered === 'Yes')).length;
      // POD = Math.round(NoDY / NoD * 100) || 0;
      Progressarray.push({
        pcode: UInitiatives[i],
        progress: POD,
      });
      if (dforthisprojExp.length > 0) {
        if (numberofyesExp.length == dforthisprojExp.length) {
          //all expired are done
          if (numberofyesFut.length > 0) {
            statusclass = "text-success";
            statustxt = "متقدم";
            statusnum = 4;
            ProgressNamearray.push({
              name: statustxt,
            });
          } else {
            statusclass = "text-warning";
            statustxt = "حسب الخطة";
            ProgressNamearray.push({
              name: statustxt,
            });
            statusnum = 3;
          }
        } else if (numberofyesExp.length == dforthisprojExp.length - 1) {
          statusclass = "text-danger";
          statustxt = "متأخر";
          statusnum = 2;
          ProgressNamearray.push({
            name: statustxt,
          });
        } else if (numberofyesExp.length < dforthisprojExp.length - 1) {
          statusclass = "text-super-danger";
          statustxt = "متأخر جدا";
          statusnum = 1;

          ProgressNamearray.push({
            name: statustxt,
          });
        }
      } else {
        if (numberofyesFut.length == 0) {
          //on plan because no deliverable is expired
          statusclass = "text-warning";
          statustxt = "حسب الخطة";
          statusnum = 3;
          ProgressNamearray.push({
            name: statustxt,
          });
        } else if (numberofyesFut.length > 0) {
          //one or more fute deliverables are done
          statusclass = "text-success";
          statustxt = "متقدم";
          statusnum = 4;
          ProgressNamearray.push({
            name: statustxt,
          });
        }
      }
      //
      //fill divs by id for order it
      var x = document.getElementsByClassName("ProjectCards")[i];
      if (x) x.id = statusnum;

      $('.deliv-status h4[data-prname="' + UInitiatives[i] + '"]')
        .addClass(statusclass)
        .text(statustxt);
      $('.inner-data3 .inner-val[data-prname="' + UInitiatives[i] + '"]').text(
        POD + "%"
      );
    }
    //progress stats

    Noverylate = progressstatusarrayALL.filter(
      (v) => v == "متأخر جدا" || v.toLowerCase() == "too late"
    ).length;
    var Noverylatepercent =
      (Noverylate * 100) / numberofInitiatives
        ? (Noverylate * 100) / numberofInitiatives
        : 0;

    Nolate = progressstatusarrayALL.filter(
      (v) => v == "متأخر" || v.toLowerCase() == "late"
    ).length;
    var Nolatepercent =
      (Nolate * 100) / numberofInitiatives
        ? (Nolate * 100) / numberofInitiatives
        : 0;

    Noonplan = progressstatusarrayALL.filter(
      (v) => v == "حسب الخطة" || v.toLowerCase() == "according to plan"
    ).length;
    var Noonplanpercent =
      (Noonplan * 100) / numberofInitiatives
        ? (Noonplan * 100) / numberofInitiatives
        : 0;

    Noahead = progressstatusarrayALL.filter(
      (v) => v == "متقدم" || v.toLowerCase() == "ahead of plan"
    ).length;
    var Noaheadpercent =
      (Noahead * 100) / numberofInitiatives
        ? (Noahead * 100) / numberofInitiatives
        : 0;

    $(
      ".ctx-block.row.mx-n2 > div:nth-child(2)  .card-body .media:nth-child(1) .d-flex span:nth-child(2)"
    ).text(initiativeRequest.g.kFormatter(Noverylate));
    $(
      ".ctx-block.row.mx-n2 > div:nth-child(2) .card-body .media:nth-child(1) .progress-bar"
    ).css("width", Noverylatepercent + "%");
    //
    $(
      ".ctx-block.row.mx-n2 > div:nth-child(2)  .card-body .media:nth-child(2) .d-flex span:nth-child(2)"
    ).text(initiativeRequest.g.kFormatter(Nolate));
    $(
      ".ctx-block.row.mx-n2 > div:nth-child(2) .card-body .media:nth-child(2) .progress-bar"
    ).css("width", Nolatepercent + "%");
    //
    $(
      ".ctx-block.row.mx-n2 > div:nth-child(2)  .card-body .media:nth-child(3) .d-flex span:nth-child(2)"
    ).text(initiativeRequest.g.kFormatter(Noonplan));
    $(
      ".ctx-block.row.mx-n2 > div:nth-child(2) .card-body .media:nth-child(3) .progress-bar"
    ).css("width", Noonplanpercent + "%");
    //
    $(
      ".ctx-block.row.mx-n2 > div:nth-child(2)  .card-body .media:nth-child(4) .d-flex span:nth-child(2)"
    ).text(initiativeRequest.g.kFormatter(Noahead));
    $(
      ".ctx-block.row.mx-n2 > div:nth-child(2) .card-body .media:nth-child(4) .progress-bar"
    ).css("width", Noaheadpercent + "%");
    $(
      ".ctx-block.row.mx-n2 > div:nth-child(2) .card-body .media:nth-child(3) .progress-bar"
    ).css("width", Noonplanpercent + "%");

    handleStatusBarChart();
    //
    //1st bars section budgets
    var toatlamountAllofProjects = Deliverablesarray.reduce(
      (accum, item) => accum + item.ammount,
      0
    );

    //$('.ctx-block.row.mx-n2 .carditem1  .card-body .media:nth-child(1) .d-flex span:nth-child(2)').text(initiativeRequest.g.kFormatter(AssignedBudget));
    $(
      ".ctx-block.row.mx-n2 .carditem1 .card-body .media:nth-child(1) .progress-bar"
    ).css("width", "100%");
    //
    //var toatlamountAllofProjectspercent = (toatlamountAllofProjects * 100) / AssignedBudget ? (toatlamountAllofProjects * 100) / AssignedBudget : 0;
    // $('.ctx-block.row.mx-n2 > div:nth-child(1) .card-body .media:nth-child(2) .d-flex span:nth-child(2)').text(initiativeRequest.g.kFormatter(toatlamountAllofProjects));
    // $('.ctx-block.row.mx-n2 > div:nth-child(1) .card-body .media:nth-child(2) .progress-bar').css('width', toatlamountAllofProjectspercent + '%');
    //*** */
    toatlamountAllofProjectminusspercent =
      ((AssignedBudget - toatlamountAllofProjects) * 100) / AssignedBudget
        ? ((AssignedBudget - toatlamountAllofProjects) * 100) / AssignedBudget
        : 0;
    //$('.ctx-block.row.mx-n2 > div:nth-child(1) .card-body .media:nth-child(3) .d-flex span:nth-child(2)').text(initiativeRequest.g.kFormatter(AssignedBudget - toatlamountAllofProjects));
    // $('.ctx-block.row.mx-n2 > div:nth-child(1) .card-body .media:nth-child(3) .progress-bar').css('width', toatlamountAllofProjectminusspercent + '%');
    changeResources();

    ProjectsOrder.init();
    initiativeRequest.g.showprojectonclick();
    // Invoices_Info_Request.init();
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

//order project list in home
var ProjectsOrder = {
  // The main Initialization function
  init: function () {
    var parent = document.getElementById("accordionProject");
    // get child divs
    var children = parent.getElementsByClassName("ProjectCards");
    var ids = [],
      obj,
      i,
      len;
    // build an array of objects that has both the element
    // and a parsed div number in it so we can sort
    for (i = 0, len = children.length; i < len; i++) {
      obj = {};
      obj.element = children[i];
      obj.idNum = parseInt(children[i].id.replace(/[^\d]/g, ""), 10);
      ids.push(obj);
    }
    // sort the array
    ids.sort(function (a, b) {
      return a.idNum - b.idNum;
    });
    // append in sorted order
    for (i = 0; i < ids.length; i++) {
      parent.appendChild(ids[i].element);
    }

    htmltest =
      '<a data-trans-ViewMore class="view-more d-block text-center py-2 Resources"></a>' +
      '<a data-trans-ViewLess class="view-less d-block text-center py-2 Resources" style="display:none!important"></a>';

    $("div#accordionProject").append(htmltest);
    if (totalforhidstrat < 4) {
      $(
        "div#InternalProjects a.view-more.d-block.text-center.py-2.Resources"
      ).addClass("disabled");
    }
    if (totalforhidvis < 4) {
      $(
        "div#ExternalProjects a.view-more.d-block.text-center.py-2.Resources"
      ).addClass("disabled");
    }
    if (totalforhidvisLMS < 4) {
      $(
        "div#LMSProjects a.view-more.d-block.text-center.py-2.Resources"
      ).addClass("disabled");
    }

    changeResources();
  },
};

// //SectorsInfoRequest
var SectorsInfoRequest = {
  onSuccess: function (sender, args) {
    var collListItem = SectorsInfoRequest.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    window.SectorsProjectCount = [];
    window.Sectors = [];
    window.reverseSectorsArray = [];
    window.SectorsName = [];
    Window.SectorsEnName = [];
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Sectors.push({
        code:
          oListItem.get_item("Title") == null
            ? No_Data
            : oListItem.get_item("Title"),
        Name:
          oListItem.get_item("Name") == null
            ? No_Data
            : oListItem.get_item("Name"),
        NameEn:
          oListItem.get_item("NameEn") == null
            ? No_Data
            : oListItem.get_item("NameEn"),
        // Owner:
        //   oListItem.get_item("Owner") == null
        //     ? No_Data
        //     : oListItem.get_item("Owner").get_lookupValue(),
      });
    }
    for (var i = 0; i < UInitiatives.length; i++) {
      var SectorCodeItem = $(
        '.SectorName[data-prname="' + UInitiatives[i] + '"]'
      )[0];
      var SectorCode =
        $('.SectorName[data-prname="' + UInitiatives[i] + '"]').length > 0
          ? SectorCodeItem.getAttribute("title")
          : "";
      item = Sectors.find((el) => el.code == SectorCode);
      if (item) {
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          projectSectorName = item.Name;
        } else projectSectorName = item.NameEn;

        SectorsData.push({
          code: SectorCode,
          Name: projectSectorName,
        });
      }
    }

    window.reverseSectorsArray = Sectors.reverse();

    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {
      window.reverseSectorsArray.forEach((element) =>
        SectorsName.push(element.Name)
      );
    } else {
      window.reverseSectorsArray.forEach((element) =>
        SectorsName.push(element.NameEn)
      );
    }
    Array.prototype.sum = function (prop) {
      var total = 0;
      for (var i = 0, _len = this.length; i < _len; i++) {
        total += this[i][prop];
      }
      return total;
    };

    for (var i = 0; i < Sectors.length; i++) {
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        SectorsProjectCount.push(
          SectorsData.filter((item) => item.Name === Sectors[i].Name).length
        );
      } else
        SectorsProjectCount.push(
          SectorsData.filter((item) => item.Name === Sectors[i].NameEn).length
        );
    }

    handleCircleDepartmentsChart();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
      SectorsInfoRequest.init();
    });
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("Internal Entities");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><Eq><FieldRef Name=\"EntityType\" /><Value Type=\"Choice\">Sector</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );

    SectorsInfoRequest.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(SectorsInfoRequest.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, SectorsInfoRequest.onSuccess),
      Function.createDelegate(this, SectorsInfoRequest.onError)
    );
  },
  // Global variables
  g: {},
};

//PortfoliosInfoRequest
var PortfoliosInfoRequest = {
  onSuccess: function (sender, args) {
    var collListItem = PortfoliosInfoRequest.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    window.portfolios = [];
    window.portfoliosProjectCount = [];
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      window.portfolios.push({
        code:
          oListItem.get_item("Title") == null
            ? No_Data
            : oListItem.get_item("Title"),
        code:
          oListItem.get_item("Title") == null
            ? No_Data
            : oListItem.get_item("Title"),
        Name:
          oListItem.get_item("Name") == null
            ? No_Data
            : oListItem.get_item("Name"),
        NameEn:
          oListItem.get_item("NameEn") == null
            ? No_Data
            : oListItem.get_item("NameEn"),
        Owner:
          oListItem.get_item("Owner") == null
            ? No_Data
            : oListItem.get_item("Owner").get_lookupValue(),
        Manager:
          oListItem.get_item("Manager") == null
            ? No_Data
            : oListItem.get_item("Manager").get_lookupValue(),
      });
    }

    for (var i = 0; i < UInitiatives.length; i++) {
      var portCodeItem = $(
        '.portfolioName[data-prname="' + UInitiatives[i] + '"]'
      )[0];
      // console.log('poe\rtcode', portCodeItem);
      var portCode =
        $('.portfolioName[data-prname="' + UInitiatives[i] + '"]').length > 0
          ? portCodeItem.getAttribute("title")
          : "";
      // console.log('portCode', portCode);
      item = window.portfolios.find((el) => el.code == portCode);
      if (item) {
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          projectPortfolioName = item.Name;
        } else projectPortfolioName = item.NameEn;

        portfoliosData.push({
          code: portCode,
          Name: projectPortfolioName,
        });
      }
    }

    reversePortfoliosArray = window.portfolios.reverse();
    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {
      reversePortfoliosArray.forEach((element) =>
        portfoliosName.push(element.Name)
      );
    } else {
      reversePortfoliosArray.forEach((element) =>
        portfoliosName.push(element.NameEn)
      );
    }

    Array.prototype.sum = function (prop) {
      var total = 0;
      for (var i = 0, _len = this.length; i < _len; i++) {
        total += this[i][prop];
      }
      return total;
    };

    for (var i = 0; i < window.portfolios.length; i++) {
      // window.portfoliosProjectCount.push(portfoliosData.filter(item => item.Name === window.portfolios[i].Name).length);

      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        window.portfoliosProjectCount.push(
          portfoliosData.filter(
            (item) => item.Name === window.portfolios[i].Name
          ).length
        );
      } else
        window.portfoliosProjectCount.push(
          portfoliosData.filter(
            (item) => item.Name === window.portfolios[i].NameEn
          ).length
        );
    }
    handleCirclePortfoliosChart();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
      PortfoliosInfoRequest.init();
    });
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Portfolio");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    PortfoliosInfoRequest.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(PortfoliosInfoRequest.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, PortfoliosInfoRequest.onSuccess),
      Function.createDelegate(this, PortfoliosInfoRequest.onError)
    );
  },
  // Global variables
  g: {},
};

function handleBudgetBarChart() {
  var remainingCost = AssignedBudget - TheCost;

  if (
    localStorage.getItem("lng") == null ||
    localStorage.getItem("lng") == "ar"
  ) {
    // budgetData = [remainingCost, TheCost, AssignedBudget];
    budgetData = [AssignedBudget, EstimatedCost];
  } else {
    // budgetData = [AssignedBudget, TheCost, remainingCost];
    budgetData = [AssignedBudget, EstimatedCost];
  }
  if ("#budgetChart") {
    $("#budgetChart").remove(); // this is my <canvas> element
    $("#carditem1 .chartjs-size-monitor").remove();
    $("#carditem1 .card-body .card-body").append(
      '<canvas width="200" height="196" id="budgetChart"><canvas>'
    );
  }

  var maximumNumber = Math.max(...budgetData);

  var bar_ctx = document.getElementById("budgetChart").getContext("2d");
  //Bordeau
  var background_1 = bar_ctx.createLinearGradient(0, 0, 0, 270);
  //Green
  var background_2 = bar_ctx.createLinearGradient(0, 0, 0, 270);
  // Move
  var background_3 = bar_ctx.createLinearGradient(0, 0, 0, 270);
  //blue assigned
  background_3.addColorStop(0, "#688393");
  background_3.addColorStop(1, "#15425a");

  //Green Cost
  background_2.addColorStop(0, "#428737");
  background_2.addColorStop(1, "#5AB74C");

  //red remaining
  background_1.addColorStop(0, "#bc3434");
  background_1.addColorStop(1, "#C53737");
  /* data */
  var data = {
    labels: BudgetLabels,
    datasets: [
      {
        label: "K",
        backgroundColor: [background_1, background_2, background_3],
        hoverBackgroundColor: [background_1, background_2, background_3],
        //data: [4000, 1900, 1100]
        data: budgetData,
      },
    ],
  };
  var options = {
    layout: {
      padding: {
        left: 0,
        right: 5,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return initiativeRequest.g.kFormatter(tooltipItem.yLabel);
          // return Number(tooltipItem.yLabel) + "K";
        },
      },
      displayColors: false,
      display: false,
    },
    responsive: true,
    title: {
      display: false,
    },
    isFixedWidth: false,
    scales: {
      xAxes: [
        {
          barPercentage: 0.5,
          gridLines: {
            display: false,
          },
          ticks: {
            fontFamily: myFont,
            fontSize: 9,
            fontStyle: "bold",
          },
        },
      ],
      yAxes: [
        {
          position: axeposition,
          ticks: {
            fontFamily: myFont,
            fontSize: 10,
            fontStyle: "bold",
            beginAtZero: true,
            callback: function (label, index, labels) {
              // return label/1000+'k';
              return initiativeRequest.g.kFormatter(label);
            },
            // max: maximumNumber,
            //stepSize: Math.ceil(Math.max(...costsArray) / 5 )
          },
          gridLines: {
            display: true,
            drawBorder: false,
          },
        },
      ],
    },
  };
  if (_.sum(budgetData) > 0) {
    var myChart = new Chart(document.getElementById("budgetChart"), {
      type: "bar",
      data: data,
      options: options,
    });
  }

  if (_.sum(budgetData) == 0) {
    $("#carditem1 .card-body .card-body .chartNodata").remove();
    $("#budgetChart").remove(); // this is my <canvas> element
    $("#carditem1 .chartjs-size-monitor").remove();
    $("#carditem1 .card-body .card-body").append(
      '<p class="chartNodata">' + No_Data + "</p>"
    );
  } else {
    $("#carditem1 .card-body .card-body .chartNodata").remove();
  }
}

function handleStatusBarChart() {
  if ("#statusChart") {
    $("#statusChart").remove(); // this is my <canvas> element
    $("#carditem2 .chartjs-size-monitor").remove();
    $("#carditem2 .card-body .card-body").append(
      '<canvas width="200" height="196" id="statusChart"><canvas>'
    );
  }
  var bar_ctx1 = document.getElementById("statusChart").getContext("2d");
  var background_1 = bar_ctx1.createLinearGradient(0, 0, 0, 270);
  var background_2 = bar_ctx1.createLinearGradient(0, 0, 0, 270);
  var background_3 = bar_ctx1.createLinearGradient(0, 0, 0, 270);
  var background_4 = bar_ctx1.createLinearGradient(0, 0, 0, 270);
  var background_5 = bar_ctx1.createLinearGradient(0, 0, 0, 270);

  // background_1.addColorStop(0, "#73bfb2");
  // background_1.addColorStop(1, "#ada38d");
  // //grey

  // background_2.addColorStop(0, "#EBC866");
  // background_2.addColorStop(1, "#FCD66D");
  // // yellow late

  // background_3.addColorStop(0, "#428737");
  // background_3.addColorStop(1, "#5AB74C");
  // //green advanced

  // background_4.addColorStop(0, "#bc3434");
  // background_4.addColorStop(1, "#C53737");
  // // red very late

  // background_5.addColorStop(0, "#688393");
  // background_5.addColorStop(1, "#15425a");
  //////////////////////

  background_1.addColorStop(0, "#428737");
  background_1.addColorStop(1, "#5AB74C");
  //green on plan
  background_2.addColorStop(0, "#EBC866");
  background_2.addColorStop(1, "#FCD66D");
  // yellow late

  background_3.addColorStop(0, "#bc3434");
  background_3.addColorStop(1, "#C53737");

  // red very late

  background_4.addColorStop(0, "#a9a9a9");
  background_4.addColorStop(1, "#696969");
  // blue advanced

  background_5.addColorStop(0, "#688393");
  background_5.addColorStop(1, "#15425a");

  // background_4.addColorStop(0, "#688393");
  // background_4.addColorStop(1, "#15425a");
  // // blue advanced

  // background_5.addColorStop(0, "#ddd");
  // background_5.addColorStop(1, "#ccc");
  /////////////////////
  var BackgroundsArray = [
    background_5,
    background_2,
    background_4,
    background_3,
    background_1,
  ];
  if (
    localStorage.getItem("lng") == null ||
    localStorage.getItem("lng") == "ar"
  ) {
    progressOccurence = progressOccurence.reverse();
    ProgressName = ProgressName.reverse();
  } else {
    BackgroundsArray = BackgroundsArray.reverse();
  }
  console.log(progressOccurence, "progressOccurence progressOccurence");
  /* data */
  var data1 = {
    labels: ProgressName,
    datasets: [
      {
        backgroundColor: BackgroundsArray,
        hoverBackgroundColor: BackgroundsArray,
        // data: [33, 33, 21, 25],
        data: progressOccurence,
      },
    ],
  };
  //
  var options1 = {
    layout: {
      padding: {
        left: 0,
        right: 5,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return Number(tooltipItem.yLabel);
        },
      },
      displayColors: false,
      display: false,
    },
    isFixedWidth: false,
    responsive: true,
    title: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          barPercentage: 0.5,
          gridLines: {
            display: false,
          },
          ticks: {
            fontFamily: myFont,
            fontSize: 9,
            fontStyle: "bold",
          },
        },
      ],
      yAxes: [
        {
          position: axeposition,
          ticks: {
            fontFamily: myFont,
            fontSize: 10,
            fontStyle: "bold",
            beginAtZero: true,
            max: Math.max(...progressOccurence),
          },
          gridLines: {
            display: true,
            drawBorder: false,
          },
        },
      ],
    },
  };
  // priorityChart
  if (_.sum(progressOccurence) > 0) {
    var myChart1 = new Chart(document.getElementById("statusChart"), {
      type: "bar",
      data: data1,
      options: options1,
    });
  }

  if (_.sum(progressOccurence) == 0) {
    ProgressNameLabels = [];
    $("#carditem2 .card-body .card-body .chartNodata").remove();
    $("#statusChart").remove(); // this is my <canvas> element
    $("#carditem2 .chartjs-size-monitor").remove();
    $("#carditem2 .card-body .card-body").append(
      '<p class="chartNodata">' + No_Data + "</p>"
    );
  } else {
    $("#carditem2 .card-body .card-body .chartNodata").remove();
    ProgressNameLabels = ProgressName;
  }
}

// function handleScheduleStatusBarChartretr() {
// 	var label1 = 0,
// 		label2 = 0,
// 		label3 = 0,
// 		label4 = 0,
// 		label5 = 0,
// 		allLabels = [];
// 	for (var i = 0; i < ScheduleProgressStatusarray.length; i++) {
// 		label1 = ScheduleProgressStatusarray[i] == 0 ? label1 + 1 : label1;
// 		label2 =
// 			ScheduleProgressStatusarray[i] > 0 && ScheduleProgressStatusarray[i] < 26
// 				? label2 + 1
// 				: label2;
// 		label3 =
// 			ScheduleProgressStatusarray[i] > 25 && ScheduleProgressStatusarray[i] < 51
// 				? label3 + 1
// 				: label3;
// 		label4 =
// 			ScheduleProgressStatusarray[i] > 50 && ScheduleProgressStatusarray[i] < 76
// 				? label4 + 1
// 				: label4;
// 		label5 =
// 			ScheduleProgressStatusarray[i] > 75 &&
// 				ScheduleProgressStatusarray[i] <= 100
// 				? label5 + 1
// 				: label5;
// 		if (i == ScheduleProgressStatusarray.length - 1) {
// 			allLabels = [label1, label2, label3, label4, label5];
// 		}
// 	}
// 	if ("#statusScheduleChart") {
// 		$("#statusScheduleChart").remove(); // this is my <canvas> element
// 		$("#carditem8 .chartjs-size-monitor").remove();
// 		$("#carditem8 .card-body .card-body").append(
// 			'<canvas width="200" height="196" id="statusScheduleChart"><canvas>'
// 		);
// 	}
// 	var schedStatus_ctx = document
// 		.getElementById("statusScheduleChart")
// 		.getContext("2d");

// 	var color6 = schedStatus_ctx.createLinearGradient(0, 0, 0, 270);
// 	color6.addColorStop(0, "#450a0a");
// 	color6.addColorStop(1, "#73204e");

// 	var color7 = schedStatus_ctx.createLinearGradient(0, 0, 0, 270);
// 	color7.addColorStop(0, "#411211");
// 	color7.addColorStop(1, "#6d2a4d");

// 	var color8 = schedStatus_ctx.createLinearGradient(0, 0, 0, 270);
// 	color8.addColorStop(0, "#3d1816");
// 	color8.addColorStop(1, "#67324d");

// 	var color9 = schedStatus_ctx.createLinearGradient(0, 0, 0, 270);
// 	color9.addColorStop(0, "#391c1a");
// 	color9.addColorStop(1, "#61394c");

// 	var color10 = schedStatus_ctx.createLinearGradient(0, 0, 0, 270);
// 	color10.addColorStop(0, "#34211f");
// 	color10.addColorStop(1, "#5a3f4b");
// 	var BackgroundsArray = [color6, color7, color8, color9, color10];
// 	var noProgress = "";
// 	var dataLabels = [];
// 	if (
// 		localStorage.getItem("lng") == null ||
// 		localStorage.getItem("lng") == "ar"
// 	) {
// 		noProgress = "لا انجاز";
// 		dataLabels = [noProgress, "1-25", "26-50", "51-75", "76-100"];
// 		dataLabels.reverse();
// 		allLabels.reverse();
// 	} else {
// 		BackgroundsArray = BackgroundsArray.reverse();
// 		noProgress = "No Progress";
// 		dataLabels = [noProgress, "1-25", "26-50", "51-75", "76-100"];
// 	}
// 	/* data */
// 	var data1 = {
// 		labels: dataLabels,
// 		datasets: [
// 			{
// 				backgroundColor: BackgroundsArray,
// 				hoverBackgroundColor: BackgroundsArray,
// 				//data: [33, 33, 21, 25],
// 				data: allLabels,
// 			},
// 		],
// 	};
// 	//
// 	var options1 = {
// 		layout: {
// 			padding: {
// 				left: 0,
// 				right: 5,
// 				top: 0,
// 				bottom: 0,
// 			},
// 		},
// 		plugins: {
// 			datalabels: {
// 				display: false,
// 			},
// 		},
// 		legend: {
// 			display: false,
// 		},
// 		tooltips: {
// 			callbacks: {
// 				label: function (tooltipItem) {
// 					return Number(tooltipItem.yLabel);
// 				},
// 			},
// 			displayColors: false,
// 			display: false,
// 		},
// 		isFixedWidth: false,
// 		responsive: true,
// 		title: {
// 			display: false,
// 		},
// 		scales: {
// 			xAxes: [
// 				{
// 					barPercentage: 0.5,
// 					gridLines: {
// 						display: false,
// 					},
// 					ticks: {
// 						fontFamily: "cairo",
// 						fontSize: 9,
// 						fontStyle: "bold",
// 					},
// 				},
// 			],
// 			yAxes: [
// 				{
// 					position: axeposition,
// 					ticks: {
// 						fontFamily: "cairo",
// 						fontSize: 10,
// 						fontStyle: "bold",
// 						beginAtZero: true,
// 						max: Math.max(...progressOccurence),
// 					},
// 					gridLines: {
// 						display: true,
// 						drawBorder: false,
// 					},
// 				},
// 			],
// 		},
// 	};

// 	var myChart1 = new Chart(document.getElementById("statusScheduleChart"), {
// 		type: "bar",
// 		data: data1,
// 		options: options1,
// 	});
// }

function handlePhaseChartBarChart() {
  if ("#phaseChart") {
    $("#phaseChart").remove(); // this is my <canvas> element
    $("#carditem3 .chartjs-size-monitor").remove();
    $("#carditem3 .card-body .card-body").append(
      '<canvas width="200" height="196" id="phaseChart"><canvas>'
    );
  }

  var bar_ctx2 = document.getElementById("phaseChart").getContext("2d");
  //Bordeauzdxrtyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy6
  var background_1 = bar_ctx2.createLinearGradient(0, 0, 0, 270);
  //Green
  var background_2 = bar_ctx2.createLinearGradient(0, 0, 0, 270);
  // Move
  var background_3 = bar_ctx2.createLinearGradient(0, 0, 0, 270);
  //Yellow
  var background_4 = bar_ctx2.createLinearGradient(0, 0, 0, 270);
  //Move Game2
  var background_5 = bar_ctx2.createLinearGradient(0, 0, 0, 270);

  //Closure red
  background_1.addColorStop(0, "#bc3434");
  background_1.addColorStop(1, "#C53737");

  //bitakat al mashru3 green
  background_2.addColorStop(0, "#428737");
  background_2.addColorStop(1, "#5AB74C");

  //al tanfiz 2 blue
  background_3.addColorStop(0, "#688393");
  background_3.addColorStop(1, "#15425a");

  // Planning yellow
  background_4.addColorStop(0, "#EBC866");
  background_4.addColorStop(1, "#FCD66D");

  // al tanfiz 1 green-blue
  background_5.addColorStop(0, "#80cea2");
  background_5.addColorStop(1, "#32b474");

  var BackgroundsArray = [
    background_1,
    background_3,
    background_5,
    background_4,
    background_2,
  ];
  if (
    localStorage.getItem("lng") == null ||
    localStorage.getItem("lng") == "ar"
  ) {
	phaseOccurence = phaseOccurence.reverse();
	phaseNameArray = phaseNameArray.reverse();
  } else {
    BackgroundsArray = BackgroundsArray.reverse();
  }
  /* data */
  var phasedata = {
    // labels: ["S4", "S3", "S2", "S1"],
    labels: phaseNameArray,
    datasets: [
      {
        backgroundColor: BackgroundsArray,
        hoverBackgroundColor: BackgroundsArray,
        // data: [33, 33, 21, 25],
        // 4,2,3,1,0
        // data: reversedPhasesOccurence    to do add variable array
        data: phaseOccurence,
      },
    ],
  };

  var phaseoptions = {
    layout: {
      padding: {
        left: 0,
        right: 5,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return Number(tooltipItem.yLabel);
        },
      },
      displayColors: false,
      display: false,
    },
    responsive: true,
    title: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          barPercentage: 0.5,
          gridLines: {
            display: false,
          },
          ticks: {
            fontFamily: myFont,
            fontSize: 9,
            fontStyle: "bold",
          },
        },
      ],
      yAxes: [
        {
          position: axeposition,
          ticks: {
            fontFamily: myFont,
            fontSize: 10,
            fontStyle: "bold",
            beginAtZero: true,
            max: Math.max(...phaseOccurence),
            //stepSize: Math.ceil(Math.max(...phaseOccurence) / 5 )
          },
          gridLines: {
            display: true,
            drawBorder: false,
          },
        },
      ],
    },
  };

  var phaseChart = new Chart(document.getElementById("phaseChart"), {
    type: "bar",
    data: phasedata,
    options: phaseoptions,
  });
}

function handlePriorityChartBarChart() {
  if ("#priorityChart") {
    $("#priorityChart").remove(); // this is my <canvas> element
    $("#carditem5 .chartjs-size-monitor").remove();
    $("#carditem5 .card-body .card-body").append(
      '<canvas width="200" height="196" id="priorityChart"><canvas>'
    );
  }

  var bar_ctx3 = document.getElementById("priorityChart").getContext("2d");
  //Bordeau
  var background_1 = bar_ctx3.createLinearGradient(0, 0, 0, 270);
  //Green
  var background_2 = bar_ctx3.createLinearGradient(0, 0, 0, 270);
  // Move
  var background_3 = bar_ctx3.createLinearGradient(0, 0, 0, 270);
  //Yellow
  var background_4 = bar_ctx3.createLinearGradient(0, 0, 0, 270);
  //Move Game2
  var background_5 = bar_ctx3.createLinearGradient(0, 0, 0, 270);

  background_1.addColorStop(0, "#428737");
  background_1.addColorStop(1, "#5AB74C");
  //green verry important
  background_2.addColorStop(0, "#73bfb2");
  background_2.addColorStop(1, "#ada38d");
  //grey
  background_3.addColorStop(0, "#EBC866");
  background_3.addColorStop(1, "#FCD66D");
  //yellow medium
  background_4.addColorStop(0, "#8ac63f");
  background_4.addColorStop(1, "#008971");
  //light green
  background_5.addColorStop(0, "#688393");
  background_5.addColorStop(1, "#15425a");
  //blue important

  var BackgroundsArray = [
    background_1,
    background_5,
    background_3,
    background_2,
  ];
  if (
    localStorage.getItem("lng") == null ||
    localStorage.getItem("lng") == "ar"
  ) {
    priorityOccurence = priorityOccurence.reverse();
    PriorityName = PriorityName.reverse();
  } else {
    BackgroundsArray = BackgroundsArray.reverse();
  }
  /* data */
  var priorityChartData = {
    labels: PriorityName,
    datasets: [
      {
        backgroundColor: BackgroundsArray,
        hoverBackgroundColor: BackgroundsArray,
        // data: [3, 2, 1, 2],
        data: priorityOccurence,
      },
    ],
  };

  var priorityChartOptions = {
    layout: {
      padding: {
        left: 0,
        right: 5,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return Number(tooltipItem.yLabel);
        },
      },
      displayColors: false,
      display: false,
    },
    responsive: true,
    title: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          barPercentage: 0.5,
          gridLines: {
            display: false,
          },
          ticks: {
            fontFamily: myFont,
            fontSize: 9,
            fontStyle: "bold",
          },
        },
      ],
      yAxes: [
        {
          position: axeposition,
          ticks: {
            fontFamily: myFont,
            fontSize: 10,
            fontStyle: "bold",
            beginAtZero: true,
            max: Math.max(...priorityOccurence),
            //stepSize: Math.ceil(Math.max(...PriorityNum) / 5 )
          },
          gridLines: {
            display: true,
            drawBorder: false,
          },
        },
      ],
    },
  };

  var priorityChart = new Chart(document.getElementById("priorityChart"), {
    type: "bar",
    data: priorityChartData,
    options: priorityChartOptions,
  });
}

var ImpactLabelsAr = [
  Resources.ar["low"],
  Resources.ar["medium"],
  Resources.ar["hight"],
];
var ImpactLabelsEn = [
  Resources.en["low"],
  Resources.en["medium"],
  Resources.en["hight"],
];
var ImpactLabel = [];

if (
  localStorage.getItem("lng") == null ||
  localStorage.getItem("lng") == "ar"
) {
  ImpactLabel = ImpactLabelsAr;
} else ImpactLabel = ImpactLabelsEn;

function handleCircleRiskChart() {
  debugger;
  $("#riskChart").remove(); // this is my <canvas> element
  $("#carditem4 .chartjs-size-monitor").remove();
  $("#carditem4 .card-body .card-body").append(
    '<canvas width="200" height="196" id="riskChart"><canvas>'
  );

  var circl_ctx = document.getElementById("riskChart").getContext("2d");

  var color1 = circl_ctx.createLinearGradient(0, 0, 0, 270);

  color1.addColorStop(0, "#bc3434");
  color1.addColorStop(1, "#C53737");

  var color2 = circl_ctx.createLinearGradient(0, 0, 0, 270);

  color2.addColorStop(0, "#428737");
  color2.addColorStop(1, "#5AB74C");

  var color3 = circl_ctx.createLinearGradient(0, 0, 0, 270);
  color3.addColorStop(0, "#EBC866");
  color3.addColorStop(1, "#FCD66D");

  if (Low + Medium + Hight == 0) {
    ImpactLabel = [];
    $("#carditem4 .card-body .card-body .chartNodata").remove();
    $("#riskChart").remove(); // this is my <canvas> element
    $("#carditem4 .chartjs-size-monitor").remove();
    $("#carditem4 .card-body .card-body").append(
      '<p class="chartNodata">' + No_Data + "</p>"
    );
  } else {
    $("#carditem4 .card-body .card-body .chartNodata").remove();
  }

  var data3 = {
    labels: ImpactLabel,
    datasets: [
      {
        label: "%",
        backgroundColor: [color2, color3, color1],
        hoverBackgroundColor: [color2, color3, color1],
        label: "%",
        data: [Low, Medium, Hight],
        padding: {
          bottom: 0,
        },
      },
    ],
  };
  var options3 = {
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    cutoutPercentage: 55,
    maintainAspectRatio: false,
    startAngle: 0,
    toolTipContent: "{h}",
    tooltips: {
      displayColors: false,
      callbacks: {
        label: function (tooltipItem, data3) {
          var dataset = data3.datasets[tooltipItem.datasetIndex];
          var total = dataset.data.reduce(function (
            previousValue,
            currentValue,
            currentIndex,
            array
          ) {
            return previousValue + currentValue;
          });
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = Math.floor((currentValue / total) * 100 + 0.5);
          return [percentage + "%", currentValue];
          // return percentage + "%";
        },
      },
    },
    legend: {
      usePointStyle: true,
      position: "bottom",
      align: "right",
      labels: {
        usePointStyle: true,
        fontFamily: myFont,
        fontSize: 13,
        boxWidth: 8,
        boxHeight: 8,
        fontStyle: "bold",
        padding: 37,
      },
    },
    plugins: {
      datalabels: {
        display: false,
        // display: true,
        // color: 'white',
        // align: 'center',
        // // backgroundColor: '#ccc',
        // // borderRadius: 3,
        // // borderColor: 'white',
        // // borderRadius: 25,
        // // borderWidth: 2,
        // padding: 30,
        // font: {
        //   size: 14,
        // }
      },
    },
  };

  if (Low + Medium + Hight > 0) {
    var myChart4 = new Chart(document.getElementById("riskChart"), {
      type: "doughnut",
      data: data3,
      options: options3,
    });
  }
}

function handleCirclePortfoliosChart() {
  if ("portfoliosChart") {
    $("#portfoliosChart").remove(); // this is my <canvas> element
    $("#carditem6 .chartjs-size-monitor").remove();
    $("#carditem6 .card-body .card-body").append(
      '<canvas width="200" height="196" id="portfoliosChart"><canvas>'
    );
  }
  var portfolioscircl_ctx = document
    .getElementById("portfoliosChart")
    .getContext("2d");
  var color1 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color1.addColorStop(0, "#bc3434");
  color1.addColorStop(1, "#C53737");
  //color red
  var color2 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color2.addColorStop(0, "#428737");
  color2.addColorStop(1, "#5AB74C");
  //color green
  var color3 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color3.addColorStop(0, "#688393");
  color3.addColorStop(1, "#15425a");
  //color blue
  var color4 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color4.addColorStop(0, "#EBC866");
  color4.addColorStop(1, "#FCD66D");
  // color yellow
  var color5 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color5.addColorStop(0, "#80cea2");
  color5.addColorStop(1, "#32b474");
  // color green-blue
  var color6 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color6.addColorStop(0, "#73bfb2");
  color6.addColorStop(1, "#ada38d");
  // color grey blue
  var color7 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color7.addColorStop(0, "#688393");
  color7.addColorStop(1, "#b14848");
  // color red - blue
  var color8 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color8.addColorStop(0, "#15425a");
  color8.addColorStop(1, "#BE4C4C");
  // color blue - red
  var color9 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color9.addColorStop(0, "#688393");
  color9.addColorStop(1, "#FCD66D");
  // color blue - yellow
  var color10 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color10.addColorStop(0, "#428737");
  color10.addColorStop(1, "#FCD66D");
  // color green -  yellow

  if (_.sum(window.portfoliosProjectCount) == 0) {
    portfoliosName = [];
  }

  var portfoliosdata = {
    labels: portfoliosName,
    datasets: [
      {
        label: "%",
        backgroundColor: [
          color1,
          color3,
          color2,
          color5,
          color6,
          color4,
          color7,
          color8,
          color9,
          color10,
        ],
        hoverBackgroundColor: [
          color1,
          color3,
          color2,
          color5,
          color6,
          color4,
          color7,
          color8,
          color9,
          color10,
        ],
        label: "%",
        data: window.portfoliosProjectCount,
        padding: {
          bottom: 0,
        },
      },
    ],
  };
  var portfoliosoptions = {
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    cutoutPercentage: 55,
    maintainAspectRatio: false,
    startAngle: 0,
    toolTipContent: "{h}",
    tooltips: {
      displayColors: false,
      callbacks: {
        label: function (tooltipItem, portfoliosdata) {
          var dataset = portfoliosdata.datasets[tooltipItem.datasetIndex];
          var total = dataset.data.reduce(function (
            previousValue,
            currentValue,
            currentIndex,
            array
          ) {
            return previousValue + currentValue;
          });
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = Math.floor((currentValue / total) * 100 + 0.5);
          return [percentage + "%", currentValue];
          // return percentage + "%";
        },
      },
    },
    legend: {
      usePointStyle: true,
      position: "bottom",
      align: "right",
      labels: {
        usePointStyle: true,
        fontFamily: myFont,
        fontSize: 9,
        boxWidth: 8,
        boxHeight: 8,
        fontStyle: "bold",
        padding: 15,
      },
    },
    plugins: {
      datalabels: {
        display: false,
        // display: true,
        // color: 'white',
        // align: 'center',
        // // backgroundColor: '#ccc',
        // // borderRadius: 3,
        // // borderColor: 'white',
        // // borderRadius: 25,
        // // borderWidth: 2,
        // padding: 30,
        // font: {
        //   size: 14,
        // }
      },
    },
  };

  var portfoliosChart = new Chart(document.getElementById("portfoliosChart"), {
    type: "doughnut",
    data: portfoliosdata,
    options: portfoliosoptions,
  });
}

function handleCircleDepartmentsChart() {
  if ("departmentsChart") {
    $("#departmentsChart").remove(); // this is my <canvas> element
    $("#carditem7 .chartjs-size-monitor").remove();
    $("#carditem7 .card-body .card-body").append(
      '<canvas width="200" height="196" id="departmentsChart"><canvas>'
    );
  }

  var departmentscircl_ctx = document
    .getElementById("departmentsChart")
    .getContext("2d");
  var color1 = departmentscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color1.addColorStop(0, "#bc3434");
  color1.addColorStop(1, "#C53737");
  //color red

  var color2 = departmentscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color2.addColorStop(0, "#428737");
  color2.addColorStop(1, "#5AB74C");
  //color green

  var color3 = departmentscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color3.addColorStop(0, "#688393");
  color3.addColorStop(1, "#15425a");
  //color blue

  var color4 = departmentscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color4.addColorStop(0, "#EBC866");
  color4.addColorStop(1, "#FCD66D");
  // color yellow

  var color5 = departmentscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color5.addColorStop(0, "#80cea2");
  color5.addColorStop(1, "#32b474");
  // color green-blue

  var color6 = departmentscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color6.addColorStop(0, "#73bfb2");
  color6.addColorStop(1, "#ada38d");
  // color grey blue
  var color7 = departmentscircl_ctx.createLinearGradient(0, 0, 0, 270);
  color7.addColorStop(0, "#688393");
  color7.addColorStop(1, "#b14848");
  // color red - blue

  // if (_.sum(SectorsProjectCount) == 0) {
  // 	SectorsName = [];
  // }
  if (_.sum(SectorsProjectCount) == 0) {
    SectorsName = [];
    $("#carditem7 .card-body .card-body .chartNodata").remove();
    $("#departmentsChart").remove(); // this is my <canvas> element
    $("#carditem7 .chartjs-size-monitor").remove();
    $("#carditem7 .card-body .card-body").append(
      '<p class="chartNodata">' + No_Data + "</p>"
    );
  } else {
    $("#carditem7 .card-body .card-body .chartNodata").remove();
  }

  var departmentsdata = {
    labels: SectorsName,
    datasets: [
      {
        label: "%",
        backgroundColor: [
          color1,
          color3,
          color2,
          color4,
          color5,
          color6,
          color7,
        ],
        hoverBackgroundColor: [
          color1,
          color3,
          color2,
          color4,
          color5,
          color6,
          color7,
        ],
        label: "%",
        data: SectorsProjectCount,
        padding: {
          bottom: 0,
        },
      },
    ],
  };
  var departmentsoptions = {
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    cutoutPercentage: 55,
    maintainAspectRatio: false,
    startAngle: 0,
    toolTipContent: "{h}",
    tooltips: {
      displayColors: false,
      callbacks: {
        label: function (tooltipItem, departmentsdata) {
          var dataset = departmentsdata.datasets[tooltipItem.datasetIndex];
          var total = dataset.data.reduce(function (
            previousValue,
            currentValue,
            currentIndex,
            array
          ) {
            return previousValue + currentValue;
          });
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = Math.floor((currentValue / total) * 100 + 0.5);
          return [percentage + "%", currentValue];
          // return percentage + "%";
        },
      },
    },
    legend: {
      usePointStyle: true,
      position: "bottom",
      align: "right",
      labels: {
        usePointStyle: true,
        fontFamily: myFont,
        fontSize: 9,
        boxWidth: 8,
        boxHeight: 8,
        fontStyle: "bold",
        padding: 15,
      },
    },
    plugins: {
      datalabels: {
        display: false,
        // display: true,
        // color: 'white',
        // align: 'center',
        // // backgroundColor: '#ccc',
        // // borderRadius: 3,
        // // borderColor: 'white',
        // // borderRadius: 25,
        // // borderWidth: 2,
        // padding: 30,
        // font: {
        //   size: 14,
        // }
      },
    },
  };
  if (_.sum(SectorsProjectCount) > 0) {
    var departmentsChart = new Chart(
      document.getElementById("departmentsChart"),
      {
        type: "doughnut",
        data: departmentsdata,
        options: departmentsoptions,
      }
    );
  }
}
