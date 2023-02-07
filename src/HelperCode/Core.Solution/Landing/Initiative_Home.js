var ActualBudget = 0,
  AssignedBudget,
  EstimatedBudget = 0,
  phaseArray = [],
  numberofProjects = 0,
  UProjects = [],
  Riskarray = [],
  Issuearray = [],
  // Deliverablesarray = [],
  Progressarray = [],
  NTasks = 0,
  RSupport = 0,
  ScheduleProjectPercentageComplete,
  projectTypes,
  //project vars
  initiativename,
  abrinitiativename,
  initiativetype,
  initiativestatus,
  initiativeportfolio,
  initiativeclassification,
  Initiativedocstatus,
  Initiativerelatedkpi,
  phasename,
  stagename,
  projectcode,
  projectimportance,
  Pstartdate,
  Pfinishdate,
  standardisedPstartdate,
  standardisedPfinishdate,
  ProgressLastModifiedDate,
  projectlength,
  RelatedObjective,
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
  projectSector,
  projectSubsector,
  initiativeprogress,
  ScheduleSource,
  ProjectSPID,
  isDelDone = "disabled";
var fullphasename;
var actualPercentageFromList = "",
  plannedPercentageFromList = "";

var lstMonthCLicked = "";

var completedRatio = 0,
  totalMilesDelivrable = 0,
  plannedRatio = 0,
  plannedDate = "",
  remain = 0,
  milestoneCount = 0,
  listInitiativeProgress = "";

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
var initiativeHomeInfo_Request = {
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
        initiativeHomeInfo_Request.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    if (window.location.href.indexOf("ICODE=") == -1) {
      // to redirect the initiative home without Icode to initiativehome
      window.location =
        _spPageContextInfo.siteAbsoluteUrl + "/SitePages/InitiativesMain.aspx";
    }

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle(ListArray[4].initiatives);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
      initiativeHomeInfo_Request.g.ICODE +
      "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>"
    );

    initiativeHomeInfo_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(initiativeHomeInfo_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, initiativeHomeInfo_Request.onSuccess),
      Function.createDelegate(this, initiativeHomeInfo_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = initiativeHomeInfo_Request.g.collListItem;
    initiativeHomeInfo_Request.g.listItemEnum = collListItem.getEnumerator();
    var card1 = [];
    while (initiativeHomeInfo_Request.g.listItemEnum.moveNext()) {
      var oListItem = initiativeHomeInfo_Request.g.listItemEnum.get_current();
      ProjectSPID = oListItem.get_id();
      $(".project-info-ctx .card-header > a").attr(
        "href",
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/view.aspx?ListKey=initiatives&IID=" +
        oListItem.get_id() +
        "&ICODE=" +
        initiativeHomeInfo_Request.g.ICODE
      );
      //getting 1st stats data
      ActualBudget += oListItem.get_item("InitiativeBudget") || 0; // al mizaniya l haliya
      // AssignedBudget = oListItem.get_item('AssignedBudget') || 0; //total budget
      // EstimatedBudget += oListItem.get_item('EstimatedCost') || 0; //mutabakia / mutawak3a
      //project card1
      (initiativename = oListItem.get_item("Name") || No_Data),
        (RelatedObjective = oListItem.get_item("RelatedObjective") || No_Data);

      initiativetype = oListItem.get_item("Types") || No_Data;
      // initiativestatus = oListItem.get_item('Status') || No_Data;
      initiativestatus =
        oListItem.get_item("InitiativeProgressStatus") || No_Data;
      initiativeportfolio = oListItem.get_item("Portfolio")
        ? oListItem.get_item("Portfolio")
        : No_Data;
      initiativeclassification =
        oListItem.get_item("Classification") || No_Data;
      Initiativedocstatus = oListItem.get_item("InitiativeStatus") || No_Data;
      Initiativerelatedkpi = oListItem.get_item("RelatedKPI")
        ? oListItem.get_item("RelatedKPI")
        : No_Data;

      actualPercentageFromList = oListItem.get_item("ActualPercentageCompleted")
        ? oListItem.get_item("ActualPercentageCompleted")
        : 0;
      plannedPercentageFromList = oListItem.get_item(
        "PlannedPercentageCompleted"
      )
        ? oListItem.get_item("PlannedPercentageCompleted")
        : 0;

      initiativecost = oListItem.get_item("ActualCost") || 0;
      ProgramTotalCost = oListItem.get_item("ProgramTotalCost") || 0;
      CurrentBudget = oListItem.get_item("CurrentBuget") || 0;
      instage = oListItem.get_item("Stage") || No_Data;
      projectTypes = oListItem.get_item("Types") || No_Data;
      stagename = oListItem.get_item("Stage") || No_Data;
      projectSector = oListItem.get_item("Sector") || No_Data;
      projectSubsector = oListItem.get_item("SubSector") || No_Data;
      //Ghufran Calculated duration
      initstartdate = oListItem.get_item("StartDate");
      initfinishdate = oListItem.get_item("FinishDate");
      if (initfinishdate != null && initstartdate != null) {

        var formatteStartDate = initiativeHomeInfo_Request.g.dateConvert2(initstartdate)
        var formatteEndDate = initiativeHomeInfo_Request.g.dateConvert2(initfinishdate)

        formatteStartDate = new Date(formatteStartDate)
        formatteEndDate = new Date(formatteEndDate)

        var diff = formatteEndDate.getMonth() -
          formatteStartDate.getMonth() +
          12 * (formatteEndDate.getFullYear() - formatteStartDate.getFullYear())

        // var diff = (initfinishdate.getTime() - initstartdate.getTime()) / 1000;
        // diff /= 60 * 60 * 24 * 7 * 4;
        // var months = Math.abs(Math.round(diff));

        var months = Math.trunc(diff);

        if (months > 0) {
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            $(
              ".card-body.project-delivery-info.border-bottom.pb-4 .mx-3.pt-3 .d-flex.justify-content-between.pb-3.mb-0.lh-125.border-gray span.fnt-14.bold"
            ).text(months + " " + "شهرا");
          } else {
            var monthFormat = "Months";
            if (months == 1) {
              monthFormat = "Month";
            }
            $(
              ".card-body.project-delivery-info.border-bottom.pb-4 .mx-3.pt-3 .d-flex.justify-content-between.pb-3.mb-0.lh-125.border-gray span.fnt-14.bold"
            ).text(months + " " + monthFormat);
          }
        } else if (months == 0) {
          var Difference_In_Time =
            initfinishdate.getTime() - initstartdate.getTime();
          var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            $(
              ".card-body.project-delivery-info.border-bottom.pb-4 .mx-3.pt-3 .d-flex.justify-content-between.pb-3.mb-0.lh-125.border-gray span.fnt-14.bold"
            ).text(Difference_In_Days + " " + "يوما");
          } else {
            $(
              ".card-body.project-delivery-info.border-bottom.pb-4 .mx-3.pt-3 .d-flex.justify-content-between.pb-3.mb-0.lh-125.border-gray span.fnt-14.bold"
            ).text(Difference_In_Days + " " + "Days");
          }
        }
      } else {
        $(
          ".card-body.project-delivery-info.border-bottom.pb-4 .mx-3.pt-3 .d-flex.justify-content-between.pb-3.mb-0.lh-125.border-gray span.fnt-14.bold"
        ).text(No_Data);
      }
      var stagenamearr = stagename.replaceAll("__", "").split(";");
      var stagenamearrwithoutunderscoreten = stagename
        .replace(/__S10;| __S22;| __S31;/g, "")
        .split(";");
      // console.log('stagenamearrwithoutunderscoreten', stagenamearrwithoutunderscoreten);
      var stageName = [],
        stageNamestr = "";
      if (localStorage.getItem("Dynamo_Stages") != null) {
        stagearr = JSON.parse(localStorage.getItem("Dynamo_Stages") || "[]");
        stagearr = stagearr.filter((item) => stagenamearr.includes(item.code));
        stagearrwithoutunderscore = JSON.parse(
          localStorage.getItem("Dynamo_Stages") || "[]"
        );
        stagearrwithoutunderscore = stagearrwithoutunderscore.filter((item) =>
          stagenamearrwithoutunderscoreten.includes(item.code)
        );
        // console.log('stagearrwithoutunderscore', stagearrwithoutunderscore);

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
      //////////////////////////////////
      // for Sector bilangual
      var initiativeSectorarr = [];
      if (localStorage.getItem("Dynamo_Internal Entities") != null) {
        initiativeSectorarr = JSON.parse(
          localStorage.getItem("Dynamo_Internal Entities")
        );
        initiativeSectorarr = initiativeSectorarr.filter(function (a) {
          return a.code === projectSector;
        });
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          projectSector = initiativeSectorarr.length
            ? initiativeSectorarr[0].name
            : No_Data;
        } else
          projectSector = initiativeSectorarr.length
            ? initiativeSectorarr[0].nameEn
            : No_Data;
      }

      var initiativeSubSectorarr = [];
      if (localStorage.getItem("Dynamo_Internal Entities") != null) {
        initiativeSubSectorarr = JSON.parse(
          localStorage.getItem("Dynamo_Internal Entities")
        );
        initiativeSubSectorarr = initiativeSubSectorarr.filter(function (a) {
          return a.code === projectSubsector;
        });
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          projectSubsector = initiativeSubSectorarr.length
            ? initiativeSubSectorarr[0].name
            : No_Data;
        } else
          projectSubsector = initiativeSubSectorarr.length
            ? initiativeSubSectorarr[0].nameEn
            : No_Data;
      }

      // for initiative stage bilangual
      var initiativeStagearr = [];
      if (localStorage.getItem("Dynamo_IStages") != null) {
        initiativeStagearr = JSON.parse(localStorage.getItem("Dynamo_IStages"));
        initiativeStagearr = initiativeStagearr.filter(function (a) {
          return a.code === instage;
        });
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          instage = initiativeStagearr.length ? initiativeStagearr[0].name : "";
        } else
          instage = initiativeStagearr.length
            ? initiativeStagearr[0].nameEn
            : "";
      }

      // for Portfolio bylangual
      var portfolioarr = [];
      if (localStorage.getItem("Dynamo_Portfolio") != null) {
        portfolioarr = JSON.parse(localStorage.getItem("Dynamo_Portfolio"));
        portfolioarr = portfolioarr.filter(function (a) {
          return a.code === initiativeportfolio;
        });
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          initiativeportfolio = portfolioarr.length
            ? portfolioarr[0].name
            : No_Data;
        } else
          initiativeportfolio = portfolioarr.length
            ? portfolioarr[0].nameEn
            : No_Data;
      }
      ///////////////////
      // abrinitiativename = initiativename.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join('.');
      abrinitiativename = initiativename
        .split(" ")
        .map((word) => word[0])
        .join(".");

      (projectcode = oListItem.get_item("Title") || No_Data),
        (Pstartdate = initiativeHomeInfo_Request.g.dateConvert(
          oListItem.get_item("StartDate")
        )),
        (Pfinishdate = initiativeHomeInfo_Request.g.dateConvert(
          oListItem.get_item("FinishDate")
        )),
        // phasename.shift(),
        // phasename = phasename.join(' ') || No_Data,

        // projectprogress = oListItem.get_item('Title') || No_Data,
        (initiativeprogress =
          oListItem.get_item("InitiativeProgressStatus") || No_Data),
        (listInitiativeProgress =
          oListItem.get_item("InitiativeProgressStatus") || No_Data),
        card1.push(
          '<div class="mb-0 py-3 px-4 d-flex justify-content-between align-items-center border-bottom" href="#">' +
          '<div class="d-inline-flex flex-row align-items-center">' +
          '<span class="icon-user lg d-inline-flex align-items-center text-center handlecircle circlecolor' +
          initiativeprogress +
          '">' + // add circlecolor' + initiativeprogress + ' to change the color of circle as status color
          // '<span class="user-name lg w-100">' + abrinitiativename + '</span>' +
          "</span>" +
          '<div class="d-inline-flex flex-column mx-3">' +
          '<h3 class="acc-title d-inline-flex black initiativeProjHomeInfoTitleStyle">' +
          initiativename +
          "</h3>" +
          '<h3 data-trans-inpattr4 class="Resources black inlineMargin0"></h3>' +
          '<span class="des-13"><span class="complition-val initiativeProjHomeInfoValueStyle">' +
          projectcode +
          "</span></span>" +
          "</div>" +
          "</div>" +
          '<div class="d-inline-flex flex-column mx-2">' +
          '<h3 data-trans-relatedstratobj class="Resources black initiativeProjHomeInfoTitleStyle"></h3>' +
          '<span class="des-13"><span class="state-val initiativeProjHomeInfoValueStyle" id="relatedSos">' +
          RelatedObjective +
          "</span></span>" +
          "</div>" +
          '<div class="d-inline-flex flex-column mx-2">' +
          '<span class="des-13 project-date">' +
          '<span class="start-date"><span data-trans-pattr1 class="Resources initiativeProjHomeInfoTitleStyle"></span><span class="px-2 initiativeProjHomeInfoValueStyle">' +
          Pstartdate +
          "</span></span>" +
          '<span class="end-date"><span data-trans-pattr2 class="Resources initiativeProjHomeInfoTitleStyle"></span><span class="px-2 initiativeProjHomeInfoValueStyle">' +
          Pfinishdate +
          "</span></span>" +
          "</span>" +
          "</div>" +
          "</div>" +
          '<div class="mb-0 py-3 px-4 d-flex justify-content-between align-items-center border-bottom" href="#">' +
          '<div class="d-inline-flex flex-column mx-2">' +
          '<span data-trans-inportfolio class="Resources des-13 initiativeProjHomeInfoTitleStyle"></span>' + //resourcekey="pattr5"
          '<h4 class="acc-title d-inline-flex black initiativeProjHomeInfoValueStyle">' +
          initiativeportfolio +
          "</h4>" +
          "</div>" +
          '<div class="d-inline-flex flex-column mx-2">' +
          '<span data-trans-instage class="Resources des-13 initiativeProjHomeInfoTitleStyle"></span>' +
          // '<h4 data-trans-' + initiativetype + ' class="Resources acc-title d-inline-flex black"></h4>' +
          '<h4  class="Resources acc-title d-inline-flex black initiativeProjHomeInfoValueStyle"> ' +
          instage +
          "</h4>" +
          "</div>" +
          // '<div class="d-inline-flex flex-column mx-2">' +
          // '<span class="des-13"><span data-trans-inclassif class="Resources complition-val"></span> ' +
          // '<h4 class="black actual-complete-val">' + initiativeclassification + '</h4></span>' +
          // '</div>' +
          '<div class="d-inline-flex flex-column mx-2 ' +
          initiativeprogress +
          '">' +
          '<span class="des-13"><span data-trans-pattr8 class="Resources v-important-val initiativeProjHomeInfoTitleStyle"></span></span>' +
          "<h4 data-trans-" +
          initiativeprogress +
          ' class="black Resources myCompletionStatus statuscolor' +
          initiativeprogress +
          '"></h4>' + //
          "</div>" +
          "</div>" +
          '<div class="mb-0 py-3 px-4 d-flex flex-wrap justify-content-between align-items-center scnd-row" href="#">' +
          //   '<div class="d-inline-flex flex-column mx-2">' +
          //   '<span class="des-13"><span data-trans-pattr6 class="Resources state-val"></span></span>' +
          //   '<h4 class="black">' + plannedPercentageFromList + '%' + '</h4>' +
          //   '</div>' +

          //   '<div class="d-inline-flex flex-column mx-2">' +
          //   '<span class="des-13"><span data-trans-pattr7 class="Resources state-val"></span></span>' +
          //   '<h4 class="black">' + actualPercentageFromList + '%' + '</h4>' + //
          //   '</div>' +
          '<div class="d-inline-flex flex-column mx-2">' +
          '<span class="des-13"><span data-trans-sector class="Resources state-val initiativeProjHomeInfoTitleStyle"></span></span>' +
          '<h4 class="black initiativeProjHomeInfoValueStyle">' +
          projectSector +
          "</h4>" + //
          "</div>" +
          '<div class="d-inline-flex flex-column mx-2">' +
          '<span class="des-13"><span data-trans-subsector class="Resources state-val initiativeProjHomeInfoTitleStyle"></span></span>' +
          '<h4 class="black initiativeProjHomeInfoValueStyle">' +
          projectSubsector +
          "</h4>" + //
          "</div>" +
          "</div>"
        ),
        //project card 5
        (projectimportance = oListItem.get_item("RelatedProgram") || "nodata");

      projectstatus = oListItem.get_item("Types") || "nodata";
      ProjectSponsor = oListItem.get_item("InitiativeOwner")
        ? oListItem.get_item("InitiativeOwner").get_lookupValue()
        : No_Data;
      ProjectOwner = oListItem.get_item("ObjectiveOwner")
        ? oListItem.get_item("ObjectiveOwner")
        : No_Data;
      ProjectManager = oListItem.get_item("InitiativePM")
        ? oListItem.get_item("InitiativePM").get_lookupValue()
        : No_Data;
      // PMORepresentative = oListItem.get_item('PMORepresentative') ? oListItem.get_item('PMORepresentative').get_lookupValue() : No_Data;

      (standardisedPstartdate = initiativeHomeInfo_Request.g.dateConvert2(
        oListItem.get_item("StartDate")
      )),
        (standardisedPfinishdate = initiativeHomeInfo_Request.g.dateConvert2(
          oListItem.get_item("FinishDate")
        )),
        (projectlength = Math.round(
          (new Date(standardisedPfinishdate) -
            new Date(standardisedPstartdate)) /
          (1000 * 60 * 60 * 24 * 30)
        ));
    }
    if (RelatedObjective && RelatedObjective != No_Data) {
      Get_RelatedObjective.init();
    }
    // $('.project-Title-Name').text(initiativename);
    $(".project-details-ctx .card.h-100").html(card1.join("")); // attaching card 1
    //attaching card 5
    // $('.project-info-ctx .project-status-info .row > div:nth-child(1) > span.badge').text(projectstatus);

    // $('.project-info-ctx .project-status-info .row > div:nth-child(1) > span.badge').html('<span data-trans-' + projectstatus + ' class="Resources">' + projectstatus + '</span>');

    // $('.project-info-ctx .project-status-info .row > div:nth-child(2) > span.badge').text(projectimportance);
    // $('#PjPriority').append('<span data-trans-' + projectimportance + ' class="Resources">' + projectimportance + '</span>');

    // $('.project-info-ctx .media-body:nth-of-type(1) .icon-user > .user-name').text(ProjectSponsor.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join(''));
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
        ProjectManager.split(" ")
          .map((word) => word[0])
          .join(".")
      );
    }
    if (isMinisterAssistant) {
      $("a.btn-add.Resources").attr("style", "display: none!important;");
    }
    $(".project-info-ctx .media-body:nth-of-type(2) p.fnt-14.reg.mx-3").text(
      ProjectManager
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
    $(".project-cost-value.h4").text(initiativecost + " " + SAR_Currency);
    $(".project-budget-value.h4").text(ActualBudget + " " + SAR_Currency);
    // $('.card-body.project-status-info.border-bottom.pb-4 span.badge.bg-primary.white.p-3.font-13.bold').text(instage);
    $(
      ".card-body.project-status-info.border-bottom.pb-4 span.badge.bg-primary.white.py-3.font-13.bold"
    ).html("<p data-trans-" + initiativetype + ' class="Resources initiativeProjHomeInfoValueStyle"></p>');
    
    $(
      ".card-body.project-status-info.border-bottom.pb-4 span.badge.bg-success.white.font-13.bold"
    ).html(
      "<span data-trans-" + initiativestatus + ' class="Resources initiativeProjHomeInfoValueStyle"></span>'
    );

    // show the initiative name in bredcrum in initiative home and apply the tooltip
    $(".page-title").html(
      '<a href="' +
      _spPageContextInfo.webAbsoluteUrl +
      "/sitepages/InitiativeHome.aspx?ICODE=" +
      projectcode +
      '">' +
      initiativename +
      '<span class="tooltiptext">' +
      initiativename +
      "</span>" + // to handle the tooltip
      "</a>"
    );

    // card 6
    if (AssignedBudget) {
      $(
        ".project-budget-ctx .card-body > div:nth-child(1) > div > div:nth-child(2)"
      ).text(
        AssignedBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " SAR"
      );
    }
    if (scheduleSrcFeatureIsOn) {
      $(".fromDeliverables").toggle();
    }

    $(".navbar.page-nav.px-5 li.nav-item a:not(:visible)").parent().hide();
    if (fullphasename == "P3") {
      // $('.navbar.page-nav.px-5').append('<div class="closebtn"><button style="float: left;color:White;text-align:center;background: #853232;" class="btn pop-green close-project" style="float: left;font-size: 17px;" type="button" onclick="ProjectClosure_Submit.g.closureappend()"><span data-trans-closeproject class="Resources"></span></button></div>');
    }

    IStagesConfiguration_Info_Request.init();

    //calling other data
    Projects_Info_Request.init();
    Risks_Info_Request.init();
    Issues_Info_Request.init();
    Deliverables_Info_Request.init();
    Benefits_Info_Request.init();
    Milestones_Info_Request.init();
    // Tasks_Info_Request.init();
    // Invoices_Info_Request.init();
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
    ICODE:
      window.location.href.indexOf("ICODE=") > -1
        ? window.location.href.split("ICODE=")[1].split("&")[0]
        : "", // to avoid the error without Icode
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
  initiativeHomeInfo_Request.preinit();
}, 1000);

var Get_RelatedObjective = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("SOs");
    var camlQuery = new SP.CamlQuery();

    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Title\" /><Value Type=\"Text\">" +
      RelatedObjective +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Get_RelatedObjective.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_RelatedObjective.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_RelatedObjective.onSuccess),
      Function.createDelegate(this, Get_RelatedObjective.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Get_RelatedObjective.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var sosName = "";
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      sosName = oListItem.get_item("Name") || No_Data;
    }
    $("#relatedSos").html(sosName);
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
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
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
      initiativeHomeInfo_Request.g.ICODE +
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
      "/sitepages/new.aspx?ListKey=initiativerisks&ICODE=" +
      initiativeHomeInfo_Request.g.ICODE +
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
      itemProjectCode = oListItem.get_item("InitiativeCode") || No_Data;
      itemstatus = oListItem.get_item("Status") || No_Data;
      itemdate = initiativeHomeInfo_Request.g.dateConvert(
        oListItem.get_item("MitigationActualCompletionDate")
      );
      itemDateIdentified = initiativeHomeInfo_Request.g.dateConvert(
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
        "&ICODE=" +
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
  g: {},
};

//Issues
var Issues_Info_Request = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Issues");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
      initiativeHomeInfo_Request.g.ICODE +
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
      "/sitepages/new.aspx?ListKey=initiativeissues&ICODE=" +
      initiativeHomeInfo_Request.g.ICODE +
      '"><i class="icon-plus"></i></a></li>',
    ],
      itemID,
      itemname,
      itemstatus,
      itemdate,
      itemuser,
      itemProjectCode,
      DateRaised;

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();
      itemname = oListItem.get_item("Name") || No_Data;
      itemtitle = oListItem.get_item("Title") || No_Data;
      itemProjectCode = oListItem.get_item("InitiativeCode") || No_Data;
      itemstatus = oListItem.get_item("Status") || No_Data;
      itemdate = initiativeHomeInfo_Request.g.dateConvert(
        oListItem.get_item("IssueClosureDate")
      );
      itemuser = oListItem.get_item("Owner")
        ? oListItem.get_item("Owner").get_lookupValue()
        : No_Data;
      DateRaised = initiativeHomeInfo_Request.g.dateConvert(
        oListItem.get_item("DateRaised")
      );

      itemhtml.push(
        '<li class="list-group-item link-arrow px-0">' +
        '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/View.aspx?ListKey=issues&IID=" +
        itemID +
        "&ICODE=" +
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
        // '<h4 class="black">' + DateRaised + '</h4>' +
        '<span data-trans-riskdateident class="Resources des-13"></span>' +
        '<h4 class="black">' +
        DateRaised +
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
    }

    if (itemhtml.length == 1) {
      itemhtml.push("<h3>" + No_Data + "</h3>");
    }
    $("div#pills-seventh > ul.list-group").html(itemhtml.join(""));
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
//Projects
var Projects_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Projects");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"RelatedInitiative\" /><Value Type=\"Text\">" +
      initiativeHomeInfo_Request.g.ICODE +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Projects_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Projects_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Projects_Info_Request.onSuccess),
      Function.createDelegate(this, Projects_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Projects_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemhtml = [""],
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
      itemProjectCode = oListItem.get_item("RelatedInitiative") || No_Data;
      itemname = oListItem.get_item("Name") || No_Data;
      itemtitle = oListItem.get_item("Title") || No_Data;
      itemstatus = oListItem.get_item("Status") || No_Data;
      itemstatus = IssuesStatus[itemstatus.replace(/ /g, "")] || No_Data;
      itemfinishdate = initiativeHomeInfo_Request.g.dateConvert(
        oListItem.get_item("BaselineFinishDate")
      );
      itemstartdate = initiativeHomeInfo_Request.g.dateConvert(
        oListItem.get_item("BaselineStartDate")
      );
      itemuser = oListItem.get_item("ProjectManager")
        ? oListItem.get_item("ProjectManager").get_lookupValue()
        : No_Data;
      itemhtml.push(
        '<li class="list-group-item link-arrow px-0">' +
        '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/View.aspx?ListKey=projects&IID=" +
        itemID +
        "&PCODE=" +
        itemtitle +
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
        '<span data-trans-basestart class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        itemstartdate +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        // '<h4 class="black">' + itemdate + '</h4>' +
        '<span data-trans-basefinish class="Resources des-13"></span>' +
        '<h4 class="black">' +
        itemfinishdate +
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
      itemhtml.push('<h3 style="padding:5px">' + No_Data + "</h3>");
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
//Deliverables
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
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
      initiativeHomeInfo_Request.g.ICODE +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='PlannedCompletedDate' Ascending='False' /></OrderBy></Query></View>"
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
    var itemhtml = [
      '<li class="list-group-item  px-0 phome-btn"><a data-trans-create class="btn-add Resources" href="' +
      _spPageContextInfo.webAbsoluteUrl +
      "/sitepages/new.aspx?ListKey=initiativedeliverables&ICODE=" +
      initiativeHomeInfo_Request.g.ICODE +
      '"><i class="icon-plus"></i></a></li>',
    ],
      itemID,
      itemname,
      itemstatus,
      itemdate,
      itemdatevalidation,
      delevrableDateExpired,
      itemdelivered;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();
      itemProjectCode = oListItem.get_item("InitiativeCode") || No_Data;
      itemname = oListItem.get_item("Name") || No_Data;
      itemtitle = oListItem.get_item("Title") || No_Data;
      // itemstatus = oListItem.get_item('Status') || No_Data;
      itemdelivered = oListItem.get_item("Completed") || "nodata";
      itemweight = oListItem.get_item("Weight")
        ? oListItem.get_item("Weight") + "%"
        : No_Data;
      itemdate = initiativeHomeInfo_Request.g.dateConvert(
        oListItem.get_item("PlannedCompletedDate")
      );
      CommittedDate = oListItem.get_item("PlannedCompletedDate");

      itemhtml.push(
        '<li class="list-group-item link-arrow px-0">' +
        '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/View.aspx?ListKey=initiativedeliverables&IID=" +
        itemID +
        "&ICODE=" +
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
        // '<h4 class="black Resources">' + itemdate + '</h4>' +
        '<span data-trans-pattr50 class="Resources des-13"></span>' +
        '<h4 class="black Resources">' +
        itemdate +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        // '<h4 class="text-warning">' + itemweight + '</h4>' +
        '<span data-trans-weight class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        itemweight +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        // '<h4 data-trans-' + itemdelivered + ' class="black Resources"></h4>' +
        '<span data-trans-deliveredyesno class="Resources des-13"></span>' +
        "<h4 data-trans-" +
        itemdelivered +
        ' class="black Resources"></h4>' +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
        "</div>" +
        "</a>" +
        "</li>"
      );

      NDelivrables++;
    }

    if (itemhtml.length == 1) {
      itemhtml.push("<h3>" + No_Data + "</h3>");
    }
    $("div#pills-fourth > ul.list-group").html(itemhtml.join(""));

    //Time Line
    var sdlyear = "",
      iscuryear = true;
    var yearExcist = false;
    Deliverablesarray.forEach(function (dl, i) {
      //appending years
      var dataYear = isArabic ? dl.date.split("-")[0] : dl.date.split("-")[2];
      if (dataYear && dataYear != No_Data) {
        // to handle no data in drop down when there is no data
        if (sdlyear != dataYear) {
          if (dataYear == new Date().getFullYear()) iscuryear = true;
          else iscuryear = false;
          $(".fromDeliverables select#inputYear").append(
            new Option(dataYear, dataYear, iscuryear, iscuryear)
          );
          yearExcist = true;
        }
      }
      sdlyear = dataYear;
    });

    if (!yearExcist) {
      // to append no data in drop down when there is no data
      $(".fromDeliverables select#inputYear").append(
        new Option(No_Data, No_Data, iscuryear, iscuryear)
      );
    }

    Deliverables_Info_Request.g.dltimeline(new Date().getFullYear());
    $(".fromDeliverables select#inputYear").on("change", function () {
      $(`#month-${lstMonthCLicked}`).css("background", "#F0F3F8");
      $(".tlContainer").html(""); // to reset the data when change on year
      Deliverables_Info_Request.g.dltimeline($(this).val());
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
      $(".fromTimeLine").hide();
      $(".fromTimeLine .milestone-item[data-year=" + year + "]").show();
      $(".fromTimeLine .time-box").remove();
      var dlyear = "",
        dlmonth = "",
        curdl = $("body"),
        dlhtml = "",
        datetoshow = "";
      //click new timeline
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
    },
  },
};

//Milestones
var Milestones_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("InitiativeMilestones");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
      initiativeHomeInfo_Request.g.ICODE +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Milestones_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Milestones_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Milestones_Info_Request.onSuccess),
      Function.createDelegate(this, Milestones_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Milestones_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemhtml = [
      '<li class="list-group-item  px-0 phome-btn"><a data-trans-create class="btn-add Resources" href="' +
      _spPageContextInfo.webAbsoluteUrl +
      "/sitepages/new.aspx?ListKey=initiativemilestones&ICODE=" +
      initiativeHomeInfo_Request.g.ICODE +
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
      itemProjectCode = oListItem.get_item("InitiativeCode") || No_Data;
      item1 = oListItem.get_item("Name") || No_Data;
      itemname = oListItem.get_item("Name") || No_Data;
      item2 = oListItem.get_item("Title") || No_Data;
      Status = oListItem.get_item("Completed") || "";
      Weight = oListItem.get_item("Weight") || No_Data;
      item3 = initiativeHomeInfo_Request.g.dateConvert(
        oListItem.get_item("PlannedCompletedDate")
      );
      itemdate = initiativeHomeInfo_Request.g.dateConvert(
        oListItem.get_item("PlannedCompletedDate")
      );
      plannedDate = oListItem.get_item("PlannedCompletedDate")
        ? oListItem.get_item("PlannedCompletedDate")
        : "";
      item3date2 = initiativeHomeInfo_Request.g.dateConvert(
        oListItem.get_item("ActualCompletedDate")
      );
      itemdelivered = oListItem.get_item("Completed") || "nodata";
      // item4 = oListItem.get_item('Status') || No_Data;
      itemhtml.push(
        '<li class="list-group-item link-arrow px-0">' +
        '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/View.aspx?ListKey=initiativemilestones&IID=" +
        itemID +
        "&ICODE=" +
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
        // '<h4 class="text-warning">' + item3 + '</h4>' +
        '<span data-trans-pattr50 class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        item3 +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        // '<h4 class="black">' + item3date2 + '</h4>' +
        '<span data-trans-dateend class="Resources des-13"></span>' +
        '<h4 class="black">' +
        item3date2 +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        // '<h4 class="text-warning">' + item3 + '</h4>' +
        '<span data-trans-pattrstatus class="Resources des-13"></span>' +
        '<h4 class="Resources text-warning" data-trans-' +
        Status +
        "></h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        // '<h4 class="text-warning">' + item3 + '</h4>' +
        '<span data-trans-pattrweight class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        Weight +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
        "</div>" +
        "</a>" +
        "</li>"
      );
      delevrableDateExpired = initiativeHomeInfo_Request.g.dateConvert2(
        oListItem.get_item("PlannedCompletedDate")
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
      if (itemdelivered == "yes") {
        // expired deliverables
        deliveredDeliverablesArrayPercent.push({
          deliveredDelivrableWeight: oListItem.get_item("Weight"),
        });
      }
      if (delevrableDateExpired > 0) {
        // expired deliverables
        ExpDeliverablesarray.push({
          delivered: oListItem.get_item("Completed"),
          ammount: oListItem.get_item("Weight"),
          date: itemdate,
          Code: oListItem.get_item("Title"),
        });
      } else {
        FutDeliverablesarray.push({
          delivered: oListItem.get_item("Completed"),
          ammount: oListItem.get_item("Weight"),
        });
      }
      Deliverablesarray.push({
        name: itemname,
        delivered: oListItem.get_item("Completed"),
        ammount: oListItem.get_item("Weight"),
        date: itemdate,
        Code: oListItem.get_item("Title"),
      });

      totalMilesDelivrable++;

      var dateNowToday = new Date();

      if (plannedDate) {
        console.log(plannedDate, "plannedDate plannedDate ");
        plannedDate = plannedDate.getTime();
        dateNowToday = dateNowToday.getTime();
      }

      if (Status == "yes") {
        completedRatio++;
      }
      if (plannedDate <= dateNowToday && Status == "no") {
        plannedRatio++;
      }

      milestoneCount++;
    }

    remain = (plannedRatio - completedRatio) / milestoneCount;

    $('button.updateprogress').on('click', function () {
      //   ProgressStatus_Data_Submit.init();
      if (!isWF) {
        Update_InitiativeStatus_Service.init();
      }
    })
    // $('button.updateprogress').prop('disabled', false);

    if (itemhtml.length == 1) {
      itemhtml.push("<h3>" + No_Data + "</h3>");
    }
    $("div#pills-fifth > ul.list-group").html(itemhtml.join(""));
    if (
      isMinisterAssistant ||
      isSectorHead ||
      isViceMinister ||
      isSubSectorHead ||
      isGeneralManager ||
      isMinister ||
      isBITeam ||
      isInOwner ||
      isSPMO
    ) {
      $("a.btn-add").attr("style", "display: none!important;");
    }

    if (!isWF) {
      Update_InitiativeStatus_Service.init();// update the initiative status when open the page auto
    }
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
//Benefits
var Benefits_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Benefits");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
      initiativeHomeInfo_Request.g.ICODE +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Benefits_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Benefits_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Benefits_Info_Request.onSuccess),
      Function.createDelegate(this, Benefits_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Benefits_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemhtml = [
      '<li class="list-group-item  px-0 phome-btn"><a data-trans-create class="btn-add Resources" href="' +
      _spPageContextInfo.webAbsoluteUrl +
      "/sitepages/new.aspx?ListKey=benefits&ICODE=" +
      initiativeHomeInfo_Request.g.ICODE +
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
      itemProjectCode = oListItem.get_item("InitiativeCode") || No_Data;
      item1 = oListItem.get_item("Title") || No_Data;
      item2 = oListItem.get_item("Name") || No_Data;
      item3 = oListItem.get_item("BenefitScale") || No_Data;
      // item3 = initiativeHomeInfo_Request.g.dateConvert(oListItem.get_item('Date'));
      item4 = oListItem.get_item("DataSource") || "nodata";
      // item4 = lessonLearnedSource[item4.replace(/ /g, "")] || No_Data;
      itemhtml.push(
        '<li class="list-group-item link-arrow px-0">' +
        '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/View.aspx?ListKey=benefits&IID=" +
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
        '<span data-trans-benefscale class="Resources des-13"></span>' +
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

// get the Istage configuration info request
var IStagesConfiguration_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("IStagesConfiguration");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><OrderBy><FieldRef Name='StageCode' Ascending='True' /></OrderBy></Query></View>"
    );
    IStagesConfiguration_Info_Request.g.collListItem =
      oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(IStagesConfiguration_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(
        this,
        IStagesConfiguration_Info_Request.onSuccess
      ),
      Function.createDelegate(this, IStagesConfiguration_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = IStagesConfiguration_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      stages = oListItem.get_item("StageCode");
      projectType = oListItem.get_item("ProjectType");

      if (projectType == projectTypes || projectType == null) {
        stageArr.push(stages);
      }
    }
    Initiative_Stages_Data_Request.init();
  },
  onError: function (sender, args) {
    // console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Global variables
  g: {},
};

var Initiative_Stages_Data_Request = {
  // to get the phases and stages and display them on initiative home
  onSuccess: function (sender, args) {
    var collListItem = Initiative_Stages_Data_Request.g.collListItem;
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
      // encodedphaename = encodeURI(phase.replace(/\s/g, '')).replace(/[^a-zA-Z ]/g, "");
      stage = oListItem.get_item("StageCode");
      var stagename, phasename;
      var stagearr = [],
        phasearr = [];

      if (localStorage.getItem("Dynamo_IStages") != null) {
        // to get the stages name
        stagearr = JSON.parse(localStorage.getItem("Dynamo_IStages") || "[]");
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
        //to get the pases name like project phase
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
      if (phase) {
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
      }

      phaseprev = oListItem.get_item("PhaseCode");

      Initiative_Stages_Data_Request.g.StagesArray.push({
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
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("Initiative Stages");
    var camlQuery = new SP.CamlQuery();

    var Query =
      "<View><Query><Where><And><Eq><FieldRef Name='InitiativeCode'/><Value Type='Text'>" +
      initiativeHomeInfo_Request.g.ICODE +
      '</Value></Eq><In><FieldRef Name="StageCode" /><Values>';

    stageArr.forEach(function (item) {
      Query += '<Value Type="Text">' + item + "</Value>";
    });
    Query +=
      "</Values></In></And></Where><OrderBy><FieldRef Name='StageCode' Ascending='True' /></OrderBy></Query><RowLimit>100</RowLimit></View>";

    camlQuery.set_viewXml(Query);
    Initiative_Stages_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Initiative_Stages_Data_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Initiative_Stages_Data_Request.onSuccess),
      Function.createDelegate(this, Initiative_Stages_Data_Request.onError)
    );
  },
  g: {
    StagesArray: [],
  },
};

var Update_InitiativeStatus_Service = {
  init: function () {

    $.ajax({
      type: 'GET',
      url: `https://hrsd-api.netways1.com/api/job/updateinitiativestatusbymilestones/${initiativeHomeInfo_Request.g.ICODE}`,
      success: function (data) {
        Get_InitiativeStatus_Info.init()
      },
      error: function (data) {
        console.log("call failed in update initiative service", data);
      },
    });
  }
}


var Get_InitiativeStatus_Info = {

  init: function () {
    debugger
    $("button.updateprogress").removeClass("loader-action-success");
    $("button.updateprogress").removeClass("loader-action-error");
    $("button.updateprogress").addClass("loader-action");
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(ListArray[4].initiatives);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' + initiativeHomeInfo_Request.g.ICODE + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query><RowLimit>1</RowLimit></View>'
    );
    Get_InitiativeStatus_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_InitiativeStatus_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_InitiativeStatus_Info.onSuccess),
      Function.createDelegate(this, Get_InitiativeStatus_Info.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Get_InitiativeStatus_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemID, InitiativeProgressStatus = "";

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();
      InitiativeProgressStatus = oListItem.get_item("InitiativeProgressStatus") || No_Data;
    }

    $(".myCompletionStatus").removeAttr(
      "data-trans-stat1 data-trans-stat2 data-trans-stat3 data-trans-stat4 data-trans-stat5 data-trans-stat6 data-trans-stat7"
    );

    $(".myCompletionStatus").removeClass("statuscolor" + listInitiativeProgress);
    $(".handlecircle").removeClass("circlecolor" + listInitiativeProgress);


    $(".myCompletionStatus").attr("data-trans-" + InitiativeProgressStatus, "");
    $(".black.myCompletionStatus").text(InitiativeProgressStatus);

    $(".myCompletionStatus").addClass("statuscolor" + InitiativeProgressStatus);
    $(".handlecircle").addClass("circlecolor" + InitiativeProgressStatus);

    $("button.updateprogress").removeClass("loader-action");
    $("button.updateprogress").addClass("loader-action-success");

    changeResources();


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
}