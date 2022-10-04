// var mostahdaf = require("../../../HelperRessources/img/mostahdaf.svg");
var mostahdaf = ''
var MainKPIs_Array = [];
var Main_Array = [];
var MainOperational_Array = [];
var strategyArray = [];

var originalstate = true,
  namefilterarray = [],//    priorityfilterarray
  KPINames = [],
  StrategicName = [],
  mainKpiSector = [],
  strategicfilterarray = [],
  sectorfilterarray = [],
  departmentfilterarray = [],
  SectorsNames = [],
  DepartmentNames = [],
  FilterChoices = [],
  Query_Body = '',
  Where_Body = '',
  ViewFields = '',
  firstRender = true;

var startegyIdClicked = '', sosIdClicked = '';
var SoQuery = '';

SoQuery = "<View><Query><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query></View>"


var goalKpiQuery = '';
var goalKpiQueryG = '';
if (isVROP) {
  goalKpiQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="Types" /><Value Type="Choice">vision</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>'
}


else if (!isGeneralManager) {
  goalKpiQuery = "<View><Query><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query></View>"
}
//


var MainKPIs_Info_Request = {
  preinit: function () {
    if ($(".d-flex").length) {
      clearInterval(checkTargetStatusHtml);
      //username
      $(".user-name").text(
        UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join(".")
      );
      $(".user-name-full").text(UserN.Title);
      $(".btn-toolbar.mb-2.mb-md-0.mx-2.page-filter").append(forfilterQuery);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        MainKPIs_Info_Request.init();
      });
    }
  },
  // The main Initialization function
  init: function () {

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("MainKPI");
    var camlQuery = new SP.CamlQuery();
    let myQuery = `<View><Query>\
    <OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>`;
    if (isRoleDataLevelAccess) {
      myQuery = dataLevelAccessQuery;
    }
    camlQuery.set_viewXml(
      myQuery
    );
    MainKPIs_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only

    clientContext.load(MainKPIs_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, MainKPIs_Info_Request.onSuccess),
      Function.createDelegate(this, MainKPIs_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = MainKPIs_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var KPIsHTML = [];
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current(),
        Owner = oListItem.get_item("Owner")
          ? oListItem.get_item("Owner").get_lookupValue()
          : UserNo_Data,
        perfromanceLeader = oListItem.get_item("PerformanceLeader")
          ? oListItem.get_item("PerformanceLeader").get_lookupValue()
          : UserNo_Data;
      performanceLeader2 = oListItem.get_item("PerformanceLeader2")
        ? oListItem.get_item("PerformanceLeader2").get_lookupValue()
        : UserNo_Data;
      //to get the kpi owner for related user if is not admin
      if ((!isAdmin && !isMinister && !isBITeam && !isSPMAdmin && !isSPMTeam && !isVROP && (UserN.Title == Owner || UserN.Title == perfromanceLeader || UserN.Title == performanceLeader2)) || isAdmin || isMinister || isBITeam || isSPMAdmin || isSPMTeam || isVROP) {

        var name = oListItem.get_item("Name") || UserNo_Data,
          code = oListItem.get_item("Title") || UserNo_Data,
          category = oListItem.get_item("Category") || UserNo_Data,
          type = oListItem.get_item("Types") || UserNo_Data,
          relMKPI = oListItem.get_item("RelatedMainKpis") || UserNo_Data,
          PeriodType = oListItem.get_item("PeriodType") || UserNo_Data,
          ResultType = oListItem.get_item("ResultType") || UserNo_Data,
          Calculation = oListItem.get_item("Calculation") || UserNo_Data,

          relIKPI = oListItem.get_item("RelatedInitiativesKPIs") || UserNo_Data,
          RelatedStrategyObjective =
            oListItem.get_item("RelatedStrategyObjective") || UserNo_Data,
          Sector = oListItem.get_item("Sector") || UserNo_Data,
          ActualQ1 = oListItem.get_item("ActualQ1") || 0,
          ActualQ2 = oListItem.get_item("ActualQ2") || 0,
          ActualQ3 = oListItem.get_item("ActualQ3") || 0,
          ActualQ4 = oListItem.get_item("ActualQ4") || 0,
          Actual = oListItem.get_item("Actual") || 0,
          Benchmarking = oListItem.get_item("Benchmarking") || UserNo_Data,
          Target = oListItem.get_item("Target") || 0,
          TargetQ1 = oListItem.get_item("TargetQ1") || 0,
          TargetQ2 = oListItem.get_item("TargetQ2") || 0,
          TargetQ3 = oListItem.get_item("TargetQ3") || 0,
          TargetQ4 = oListItem.get_item("TargetQ4") || 0,
          Polarity = oListItem.get_item("Polarity") || UserNo_Data,
          Baseline = oListItem.get_item("Baseline") || UserNo_Data,
          MesurePriority = oListItem.get_item("MesurePriority") || UserNo_Data,
          Dimensions = oListItem.get_item("Dimensions") || UserNo_Data,
          ProjectCode = oListItem.get_item("ProjectCode") || UserNo_Data,
          Cumulative = ActualQ1 + ActualQ2 + ActualQ3 + ActualQ4,
          CumulativeUI = (ActualQ1 + ActualQ2 + ActualQ3 + ActualQ4)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          TotalTarget = TargetQ1 + TargetQ2 + TargetQ3 + TargetQ4,
          TotalTargetUI = (TargetQ1 + TargetQ2 + TargetQ3 + TargetQ4)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          PPercentage = TotalTarget
            ? Math.round((Cumulative * 100) / TotalTarget)
            : 0,
          PDegree = Math.round(PPercentage * 1.8 + 45); //formula
        PDegree = PDegree > 222 ? 222 : PDegree;
        console.log(Cumulative, Target, PDegree, PPercentage);

        MainKPIs_Array.push({
          name: oListItem.get_item("Name"),
          code: oListItem.get_item("Title"),
          cat: category,
          type: type,
          relMKPI: relMKPI,
          PeriodType: PeriodType,
          ResultType: ResultType,
          Calculation: Calculation,
          Owner: Owner,
          relIKPI: relIKPI,
          RelatedStrategyObjective: RelatedStrategyObjective,
          Sector: Sector,
          ActualQ1: ActualQ1,
          ActualQ2: ActualQ2,
          ActualQ3: ActualQ3,
          ActualQ4: ActualQ4,
          Actual: Actual,
          TargetQ1: TargetQ1,
          TargetQ2: TargetQ2,
          TargetQ3: TargetQ3,
          TargetQ4: TargetQ4,
          Target: Target,
          Benchmarking: Benchmarking,
          Polarity: Polarity,
          Baseline: Baseline,
          MesurePriority: MesurePriority,
          Dimensions: Dimensions,
          ProjectCode: ProjectCode,
          Cumulative: 0,
          CumulativeUI: 0,
          TotalTargetUI: 0,
          PPercentage: 0,
          PDegree: 0,
          totalActualQ1: 0,
          totalActualQ2: 0,
          totalActualQ3: 0,
          totalActualQ4: 0,
          totalTargetQ1: 0,
          totalTargetQ2: 0,
          totalTargetQ3: 0,
          totalTargetQ4: 0,
        });

        var barColor =
          PPercentage > 75
            ? "success"
            : PPercentage > 45 && PPercentage < 75
              ? "warning"
              : PPercentage > 0 && PPercentage < 45
                ? "danger"
                : "";

        if (PeriodType === "سنوي") {
          KPIsHTML.push(
            '<div class="card" data-id="' +
            RelatedStrategyObjective +
            '" style="display:none">' +
            '<div class="card-body">' +
            '<span class="badge badge-pill bg-primary px-3 py-2 white fnt-10 sbold" data-sector="' +
            Sector +
            '"></span>' +
            // '<a href="/SitePages/OperationalIndicators.aspx?code=' +
            // code +
            // "&name=" +
            // name +
            // "&type=" +
            // category +
            '<a href="/SitePages/View.aspx?ListKey=mainkpi&IID=' +
            oListItem.get_id() +
            '"><h2 class="card-title my-4 light-gray">' +
            name +
            "</h2></a>" +
            '<div class="col light-gray">' +
            '<div class="row">' +
            '<div class="col col-xl-auto no-padding">' +
            '<div class="progress-semi">' +
            '<div class="barOverflow">' +
            "<!--45 + (p x 1.8)-->" +
            '<div class="bar ' +
            barColor +
            '" style="transform: rotate(' +
            PDegree +
            'deg);"></div>' +
            "</div>" +
            '<span style="text-align:center">' +
            PPercentage +
            "%</span>" +
            "</div>" +
            '<div class="d-inline-flex flex-column mx-2">' +
            '<span data-trans-indexgenperform class="Resources fnt-12" style="text-align:center" resourcekey="IndexGeneralPerformance"></span>' +
            "</div>" +
            "</div>" +
            '<div class="col">' +
            '<div class="d-flex flex-column">' +
            "<div>" +
            '<!--<img src="./img/icon-sar.png" style="width:14px;" data-themekey="#">-->' +
            '<img src="' +
            mostahdaf +
            '" class="" data-themekey="#">' +
            '<div class="d-inline-flex flex-column mx-2">' +
            '<span data-trans-targeted class="Resources complition-val fnt-12 reg" resourcekey="Targeted"> </span>' +
            '<span class="black fnt-12 bold">' +
            TotalTargetUI +
            "</span>" +
            "</div>" +
            "</div>" +
            "<div>" +
            '<!--<img src="./img/icon-analytics.png"  style="width:14px;" data-themekey="#">-->' +
            '<i class="kpi-icon fas fa-chart-line"></i>' +
            '<div class="d-inline-flex flex-column mx-2">' +
            '<span data-trans-cumulativeinvestigator class="Resources complition-val fnt-12 bold" resourcekey="CumulativeInvestigator"></span>' +
            '<span class="black fnt-12 bold">' +
            CumulativeUI +
            "</span>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="collapse" id="collapseExample" style="">' +
            '<div class="card-body light-gray">' +
            '<div class="border-top py-3">' +
            '<div class="row mb-3">' +
            '<div class="col-6">' +
            '<span class="fnt-12 reg">' +
            '<i class="kpi-icon fas fa-check-circle"></i>' +
            '<span data-trans-baseline class="Resources px-1 bold " resourcekey="Baseline"> </span>' +
            "</span>" +
            "</div>" +
            '<div class="col-6">' +
            '<div class="d-flex justify-content-between">' +
            '<div class="d-inline-flex">' +
            "<span>" +
            '<span class="fnt-12 bold px-2">' +
            Baseline +
            "</span>" +
            "</span>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="row mb-3">' +
            '<div class="col-5">' +
            '<span class="fnt-12 reg">' +
            '<i class="kpi-icon fas fa-check-circle"></i>' +
            '<span data-trans-investigator class="Resources px-1" resourcekey="Investigator"></span>' +
            "</span>" +
            "</div>" +
            '<div class="col-7">' +
            '<div class="d-flex justify-content-between">' +
            '<div class="d-inline-flex">' +
            "<span>" +
            '<span class="qrt-val fnt-12 bold px-2">' +
            Actual +
            "</span>" +
            "</span>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            '<a data-trans-viewmore class="Resources view-more fnt-12 bold d-block text-center bg-btn-gray py-2" onclick="handleCardCollapse.toggle(this)" resourcekey="ViewMore"></a>' +
            "</div>"
          );
        } else {
          KPIsHTML.push(
            '<div class="card" data-id="' +
            RelatedStrategyObjective +
            '" style="display:none">' +
            '<div class="card-body">' +
            '<span class="badge badge-pill bg-primary px-3 py-2 white fnt-10 sbold" data-sector="' +
            Sector +
            '"></span>' +
            // '<a href="https://hrdf.netways1.com/SitePages/OperationalIndicators.aspx?code=' +
            // code +
            // "&name=" +
            // name +
            // "&type=" +
            // category +
            '<a href="/SitePages/View.aspx?ListKey=mainkpi&IID=' +
            oListItem.get_id() +
            '"><h2 class="card-title my-4 light-gray">' +
            name +
            "</h2></a>" +
            //Main_Array[k].name

            // '<a href="https://hrdf.netways1.com/SitePages/OperationalIndicators.aspx?code='+code+'&name='+name+'&type='+category+'"><h2 class="card-title my-4 light-gray">'+Main_Array[k].name+'</h2></a>'+

            '<div class="col light-gray">' +
            '<div class="row">' +
            '<div class="col col-xl-auto no-padding">' +
            '<div class="progress-semi">' +
            '<div class="barOverflow">' +
            "<!--45 + (p x 1.8)-->" +
            '<div class="bar ' +
            barColor +
            '" style="transform: rotate(' +
            PDegree +
            'deg);"></div>' +
            "</div>" +
            '<span style="text-align:center">' +
            PPercentage +
            "%</span>" +
            "</div>" +
            '<div class="d-inline-flex flex-column mx-2">' +
            '<span data-trans-indexgenperform class="fnt-12" style="text-align:center" resourcekey="Resources IndexGeneralPerformance"></span>' +
            "</div>" +
            "</div>" +
            '<div class="col">' +
            '<div class="d-flex flex-column">' +
            "<div>" +
            '<!--<img src="./img/icon-sar.png" style="width:14px;" data-themekey="#">-->' +
            '<img src="' +
            mostahdaf +
            '" class="" data-themekey="#">' +
            '<div class="d-inline-flex flex-column mx-2">' +
            '<span data-trans-targeted class="Resources complition-val fnt-12 reg" resourcekey="Targeted"> </span>' +
            '<span class="black fnt-12 bold">' +
            TotalTargetUI +
            "</span>" +
            "</div>" +
            "</div>" +
            "<div>" +
            '<!--<img src="./img/icon-analytics.png"  style="width:14px;" data-themekey="#">-->' +
            '<i class="kpi-icon fas fa-chart-line"></i>' +
            '<div class="d-inline-flex flex-column mx-2">' +
            '<span data-trans-cumulativeinvestigator class="Resources complition-val fnt-12 bold" resourcekey="CumulativeInvestigator"></span>' +
            '<span class="black fnt-12 bold">' +
            CumulativeUI +
            "</span>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="collapse" id="collapseExample" style="">' +
            '<div class="card-body light-gray">' +
            '<div class="border-top py-3">' +
            '<div class="row mb-3">' +
            '<div class="col-6">' +
            '<span class="fnt-12 reg">' +
            '<i class="kpi-icon fas fa-check-circle"></i>' +
            '<span data-trans-baseline class="Resources px-1 bold " resourcekey="Baseline"> </span>' +
            "</span>" +
            "</div>" +
            '<div class="col-6">' +
            '<div class="d-flex justify-content-between">' +
            '<div class="d-inline-flex">' +
            "<span>" +
            '<span class="fnt-12 bold px-2">' +
            Baseline +
            "</span>" +
            "</span>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="row mb-3">' +
            '<div class="col-5">' +
            '<span class="fnt-12 reg">' +
            '<i class="kpi-icon fas fa-check-circle"></i>' +
            '<span data-trans-quartinvest class="Resources px-1" resourcekey="QuarterlyInvestigator"></span>' +
            "</span>" +
            "</div>" +
            '<div class="col-7">' +
            '<div class="d-flex justify-content-between">' +
            '<div class="d-inline-flex">' +
            "<span>" +
            '<span class="qrt-label fnt-12 reg">Q1</span>' +
            '<span class="qrt-val fnt-12 bold px-2">' +
            MainKPIs_Array[0].totalActualQ1 +
            "</span>" + //MainKPIs_Array[0] to remove the error from console
            "</span>" +
            "</div>" +
            '<div class="d-inline-flex">' +
            "<span>" +
            '<span class="qrt-label fnt-12 reg">Q2</span>' +
            '<span class="qrt-val fnt-12 bold px-2">' +
            MainKPIs_Array[0].totalActualQ2 +
            "</span>" +
            "</span>" +
            "</div>" +
            "</div>" +
            '<div class="d-flex justify-content-between">' +
            '<div class="d-inline-flex">' +
            '<span class="des-13">' +
            '<span class="qrt-label fnt-12 reg">Q3</span>' +
            '<span class="qrt-val fnt-12 bold px-2">' +
            MainKPIs_Array[0].totalActualQ3 +
            "</span>" +
            "</span>" +
            "</div>" +
            '<div class="d-inline-flex">' +
            "<span>" +
            '<span class="qrt-label fnt-12 reg">Q4</span>' +
            '<span class="qrt-val fnt-12 bold">' +
            MainKPIs_Array[0].totalActualQ4 +
            "</span>" +
            "</span>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            '<a data-trans-viewmore class="Reesources view-more fnt-12 bold d-block text-center bg-btn-gray py-2" onclick="handleCardCollapse.toggle(this)" resourcekey="ViewMore"></a>' +
            "</div>"
          );
        }
      }

      // if (originalstate) { // in original state before any filter [before culminating data]
      //   if (Sector != UserNo_Data) {
      //     mainKpiSector.push({
      //       name: Sector,
      //       code: code
      //     });
      //   }
      //   uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
      //   sectorfilterarray = uniqueArray(mainKpiSector);
      // }
    }

    if (!KPIsHTML.length) {
      KPIsHTML.push(UserNo_Data);
    }
    $(".control-ctx.initiative-cards-ctx.mb-5 .card-columns.pb-5").html(
      KPIsHTML.join("")
    );

    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {
      $(".page-title").html(USERPageTitle);
    } else $(".page-title").html(USERPageTitle);


    changeResources();
    stratigicObjectivesRequest.init();
    // InternalEntities_Info_Request.init();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {},
};
window.checkTargetStatusHtml = setInterval(function () {
  // GoalsKPIs_Info_Request.preinit()
  MainKPIs_Info_Request.preinit();
}, 1000);

var stratigicObjectivesArray = [];
var SosCodeArray = []

var stratigicObjectivesRequest = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("SOs");
    var camlQuery = new SP.CamlQuery();
    // camlQuery.set_viewXml(
    if (isGeneralManager || isDU || isMinisterAssistant || isViceMinister || isSectorHead || isSubSectorHead) {

      SoQuery = SectorHeadQuery

      $('body').append('<style>.mainindecatorfilter {height: 150px!important</style>');

    }
    //   "<View><Query>\
    //     <OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query></View>"
    // );
    camlQuery.set_viewXml(SoQuery);
    stratigicObjectivesRequest.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only

    clientContext.load(stratigicObjectivesRequest.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, stratigicObjectivesRequest.onSuccess),
      Function.createDelegate(this, stratigicObjectivesRequest.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = stratigicObjectivesRequest.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var sObjectiveHtml = [];
    var departmentArr = [];
    var sectorArr = [];
    var depArrBiLang = [];

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current(),
        name = oListItem.get_item("Name") || UserNo_Data,
        code = oListItem.get_item("Title") || UserNo_Data,
        relatedGoal = oListItem.get_item("RelatedStrategy") || UserNo_Data,
        sectorcode = oListItem.get_item("Sector") || UserNo_Data,
        departmentcode = oListItem.get_item("SubSector") || UserNo_Data;
      if (!strategyArray.includes(relatedGoal)) {
        strategyArray.push(relatedGoal)
      }
      if (originalstate) // in original state before any filter [before culminating data]
      {
        KPINames.push({
          name: name,
          code: code
        });
        uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
        namefilterarray = uniqueArray(KPINames);
        if (sectorcode && sectorcode != UserNo_Data) {

          if (localStorage.getItem('Dynamo_Internal Entities') != null) {
            sectorarr = JSON.parse(localStorage.getItem('Dynamo_Internal Entities'));
            sectorarr = sectorarr.filter(function (a) {
              return a.code === sectorcode
            });
            var bilangSectorCode = '';
            if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
              bilangSectorCode = sectorarr.length ? sectorarr[0].name : No_Data;
            } else bilangSectorCode = sectorarr.length ? sectorarr[0].nameEn : No_Data;
          }
          if (!sectorArr.includes(sectorcode)) {

            SectorsNames.push({
              title: bilangSectorCode,
              name: sectorcode,
              code: code
            })
            sectorArr.push(sectorcode)
          }
        }
        sectorfilterarray = uniqueArray(SectorsNames)

        //department Field
        if (departmentcode && departmentcode != UserNo_Data) {

          if (localStorage.getItem('Dynamo_Internal Entities') != null) {
            depArrBiLang = JSON.parse(localStorage.getItem('Dynamo_Internal Entities'));
            depArrBiLang = depArrBiLang.filter(function (a) {
              return a.code === departmentcode
            });
            var bilangDepartmentCode = '';
            if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
              bilangDepartmentCode = depArrBiLang.length ? depArrBiLang[0].name : No_Data;
            } else bilangDepartmentCode = depArrBiLang.length ? depArrBiLang[0].nameEn : No_Data;
          }

          if (!departmentArr.includes(departmentcode)) {
            DepartmentNames.push({
              title: bilangDepartmentCode,
              name: departmentcode,
              code: code
            })
            departmentArr.push(departmentcode)
          }
        }
        departmentfilterarray = uniqueArray(DepartmentNames)

        //


      }
      stratigicObjectivesArray.push({
        name: name,
        code: code,
      });
      SosCodeArray.push({ code })
      sObjectiveHtml.push(
        '<div class="kpi-item col px-2 my-5">' +
        '<div style="cursor:pointer" class="soCard link-item p-4 h-100" data-id="' +
        code +
        // relatedGoal +
        '" related-goal-id ="' + relatedGoal + '" sector-id="' + sectorcode + '" department-id="' + departmentcode + '" data-row >' +
        '<div class="text-center fnt-13 bold river-bed mb-1">' +
        code +
        "</div>" +
        '<h4 class="text-center fnt-13 river-bed">' +
        name +
        "</h4>" +
        "</div>" +
        "</div>"
      );
    }
    stratigicObjectivesArray.forEach(function (a, i, z) {
      $('.card[data-id="' + a.code + '"]')
        .find("span.badge.badge-pill")
        .text(a.name);
    });
    if (sObjectiveHtml.length == 0) {
      sObjectiveHtml.push(UserNo_Data);
    }
    $(".control-ctx.quick-links-ctx .kpi-wrapper").html(
      sObjectiveHtml.join("")
    );

    var strategyCounter = 1

    $(".quick-links-ctx .link-item").on('click', function () {

      var dataid = $(this).attr("data-id");

      if (dataid == sosIdClicked) {
        strategyCounter++
        if (strategyCounter % 2 == 0) {
          $(".quick-links-ctx .link-item").removeClass("active");
          sosIdClicked = ''
          startegyIdClicked = ''
          stratigicObjectivesRequest.init()
        } else {
          $(".quick-links-ctx .link-item").removeClass("active");
          $(this).addClass("active");
          $(".card[data-id]").hide();
          $('.card[data-id="' + dataid + '"]').fadeIn();
        }
      } else {
        $(".quick-links-ctx .link-item").removeClass("active");
        $(this).addClass("active");
        $(".card[data-id]").hide();
        $('.card[data-id="' + dataid + '"]').fadeIn();
        sosIdClicked = dataid
      }
    });



    // $(".col.px-2.my-5:first-child() .link-item").click();
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

    // work for filter
    if (originalstate) {
      var namefilterhtml = '<label class="dropdown-item main-action-filter"><button data-trans-CanselSelections class="clear-filter Resources" type="button"></button></label>';

      var sectorfilterhtml = '<label class="dropdown-item main-action-filter"><button data-trans-CanselSelections class="clear-filter Resources" type="button"></button></label>'

      var departmentfilterhtml = '<label class="dropdown-item main-action-filter"><button data-trans-CanselSelections class="clear-filter Resources" type="button"></button></label>'


      for (var i = 0; i < departmentfilterarray.length; i++) {
        departmentfilterhtml += '<label class="dropdown-item"><span data-trans-' + departmentfilterarray[i].name + ' class="Resources" >' + departmentfilterarray[i].title + '</span><input data-type="Text" data-internal="SectorName" type="checkbox" name="SectorName" value="' + departmentfilterarray[i].name + '"></label>';
      }


      for (var i = 0; i < sectorfilterarray.length; i++) {
        sectorfilterhtml += '<label class="dropdown-item"><span data-trans-' + sectorfilterarray[i].name + ' class="Resources" >' + sectorfilterarray[i].title + '</span><input data-type="Text" data-internal="SectorName" type="checkbox" name="SectorName" value="' + sectorfilterarray[i].name + '"></label>';
      }
      /////////////////////////////////////////////////////////////////////////////////////////////
      for (var i = 0; i < namefilterarray.length; i++) {
        namefilterhtml += '<label class="dropdown-item"><span data-trans-' + namefilterarray[i].name + ' class="Resources" >' + namefilterarray[i].name + '</span><input data-type="Text" data-internal="SoName" type="checkbox" name="SoName" value="' + namefilterarray[i].code + '"></label>';
      }

      $('.content-list-head .page-filter .dropdown-menu.Filter-2').html(namefilterhtml);
      $('.content-list-head .page-filter .dropdown-menu.Filter-3').html(sectorfilterhtml);
      $('.content-list-head .page-filter .dropdown-menu.Filter-4').html(departmentfilterhtml);
      // end filter
      $('button.clear-filter').on("click", function (e) {
        e.stopPropagation();
        if ($(this).closest('.dropdown-menu.Filter-2').find('input:checkbox:checked').length) {
          $(this).closest('.dropdown-menu.Filter-2').find('input:checkbox').prop({
            "checked": false,
            "disabled": true
          })
          FilterFunction(null, null, null)
        }

        if ($(this).closest('.dropdown-menu.Filter-3').find('input:checkbox:checked').length) {
          $(this).closest('.dropdown-menu.Filter-3').find('input:checkbox').prop({
            "checked": false,
            "disabled": true
          })
          FilterFunction(null, null, null)
        }

        if ($(this).closest('.dropdown-menu.Filter-4').find('input:checkbox:checked').length) {
          $(this).closest('.dropdown-menu.Filter-4').find('input:checkbox').prop({
            "checked": false,
            "disabled": true
          })
          FilterFunction(null, null, null)
        }
      });



    }
    changeResources();

    //remove style
    $('body').animate({
      opacity: 1
    }, {
      duration: 333,
      complete: function () {
        $('.page-filter .dropdown-menu label.dropdown-item input:checkbox').prop({
          "disabled": false
        });
      }
    });
    $('div#particles-foreground, div#particles-background, .vertical-centered-box').animate({
      opacity: 0
    }, {
      duration: 333,
      complete: function () {
        $('div#particles-foreground, div#particles-background, .vertical-centered-box').remove();

      }
    });
    //
    GoalsKPIs_Info_Request.init()
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {
    filtertrigger: function () {
    },
    camlfilterbuilder: function () {
    }
  },
};

///////////////////////
var GoalsArray = [];
var GoalsCodeArray = []
var GoalsKPIs_Info_Request = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("GoalStrategy");
    var camlQuery = new SP.CamlQuery();
    if (isGeneralManager || isDU || isMinisterAssistant || isViceMinister || isSectorHead || isSubSectorHead) {

      goalKpiQueryG = '<View><Query><Where><And><In><FieldRef Name="Title" /><Values>';
      strategyArray.forEach(function (item) {
        goalKpiQueryG += '<Value Type="Text">' + item + '</Value>';
      });
      goalKpiQueryG += '</Values></In><Neq><FieldRef Name=\'DeletionStatus\'/><Value Type=\'Text\'>Deleted</Value></Neq></And></Where></Query></View>';
      goalKpiQuery = goalKpiQueryG
    }
    camlQuery.set_viewXml(goalKpiQuery);

    GoalsKPIs_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only

    clientContext.load(GoalsKPIs_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, GoalsKPIs_Info_Request.onSuccess),
      Function.createDelegate(this, GoalsKPIs_Info_Request.onError)
    );

    console.log(strategyArray, 'strategyArraystrategyArraystrategyArray')
  },
  onSuccess: function (sender, args) {
    var collListItem = GoalsKPIs_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var goalsHtml = [];
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current(),
        name = oListItem.get_item("Name") || UserNo_Data,
        code = oListItem.get_item("Title") || UserNo_Data;

      if (originalstate) // in original state before any filter [before culminating data]
      {
        StrategicName.push({
          name: name,
          code: code
        });
        uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
        strategicfilterarray = uniqueArray(StrategicName);
      }

      GoalsArray.push({
        name: name,
        code: code,
      });
      GoalsCodeArray.push(code)

      goalsHtml.push(
        '<div class="kpi-item col px-2 my-5">' +
        '<div style="cursor:pointer" class="goalCard link-item link-items-goal p-4  h-100" goal-id="' +
        code +
        '" data-row>' +
        '<div class="text-center fnt-13 bold river-bed mb-1">' +
        code +
        "</div>" +
        '<h4 class="text-center fnt-13 river-bed">' +
        name +
        "</h4>" +
        "</div>" +
        "</div>"
      );
    }
    if (goalsHtml.length == 0) {
      goalsHtml.push(UserNo_Data);
    }
    $(".control-ctx.quick-links-ctx .strategy-wrapper").html(
      goalsHtml.join("")
    );

    if (originalstate) {
      var strategicfilterhtml = '<label class="dropdown-item main-action-filter"><button data-trans-CanselSelections class="clear-filter Resources" type="button"></button></label>';
      // var strategicfilterhtml = '';
      for (var i = 0; i < strategicfilterarray.length; i++) {
        strategicfilterhtml += '<label class="dropdown-item"><span data-trans-' + strategicfilterarray[i].name + ' class="Resources" >' + strategicfilterarray[i].name + '</span><input data-type="Text" data-internal="GoalName" type="checkbox" name="GoalName" value="' + strategicfilterarray[i].code + '"></label>';
      }

      $('.content-list-head .page-filter .dropdown-menu.Filter-1').html(strategicfilterhtml);

      // end filter
      $('button.clear-filter').on("click", function (e) {
        e.stopPropagation();
        if ($(this).closest('.dropdown-menu.Filter-1').find('input:checkbox:checked').length) {
          $(this).closest('.dropdown-menu.Filter-1').find('input:checkbox').prop({
            "checked": false,
            "disabled": true
          })
          GoalStratigyFunction(null)
        }
      });
    }
    //
    changeResources();
    var counter = 1
    $(".quick-links-ctx .link-items-goal").on('click', function () {


      var dataid = $(this).attr("goal-id");

      if (dataid == startegyIdClicked) {
        counter++
        if (counter % 2 == 0) {
          $(".quick-links-ctx .link-items-goal").removeClass("active");
          startegyIdClicked = ''
          sosIdClicked = ''
          stratigicObjectivesRequest.init()
        } else {
          $(".quick-links-ctx .link-items-goal").removeClass("active");
          $(this).addClass("active");
          $(".soCard[related-goal-id]").parent().hide();
          $('.soCard[related-goal-id="' + dataid + '"]').parent().fadeIn();
          $('.card[data-id]').hide();
          $('.soCard[related-goal-id="' + dataid + '"]').each(function (i) {
            var soID = $(this).data('id');
            $('.card[data-id="' + soID + '"]').fadeIn();
          });
        }
      } else {
        $(".quick-links-ctx .link-items-goal").removeClass("active");
        $(this).addClass("active");
        $(".soCard[related-goal-id]").parent().hide();
        $('.soCard[related-goal-id="' + dataid + '"]').parent().fadeIn();
        $('.card[data-id]').hide();
        $('.soCard[related-goal-id="' + dataid + '"]').each(function (i) {
          var soID = $(this).data('id');
          $('.card[data-id="' + soID + '"]').fadeIn();
        });
        startegyIdClicked = dataid
      }


    });
    /////////////////////////////////////////////
    $('.page-filter .dropdown-menu.Filter-1 label input:checkbox').change(function (e) {
      GoalStratigyFunction($(this))
    })

    $('.page-filter .dropdown-menu.Filter-2 label input:checkbox').change(function (e) {

      FilterFunction($(this), 'Filter-2', 'data-id')
    })

    /////////////////////////////////////////// sector
    $('.page-filter .dropdown-menu.Filter-3 label input:checkbox').change(function (e) {

      FilterFunction($(this), 'Filter-3', 'sector-id')

    })

    $('.page-filter .dropdown-menu.Filter-4 label input:checkbox').change(function (e) {

      FilterFunction($(this), 'Filter-4', 'department-id')

    })

    /////////////////////////////////////////
    if ((firstRender && isVROP)) {
      // $(".col.px-2.my-5:first-child() .link-items-goal").click();
    }
    else if (firstRender) {
      $('.card').show();
    }
    // if (firstRender) {
    //   $('.card').show();
    // }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  g: {}
}



/////////////////////////

var InternalEntities_Array = [];
var InternalEntities_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("Internal Entities");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    InternalEntities_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(InternalEntities_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, InternalEntities_Info_Request.onSuccess),
      Function.createDelegate(this, InternalEntities_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = InternalEntities_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      code = oListItem.get_item("Title") || No_Data;
      name = oListItem.get_item("Name") || No_Data;

      InternalEntities_Array.push({
        name: name,
        code: code,
      });

      $("[data-sector]").each(function () {
        var dataSector = $(this).attr("data-sector");
        var displayed = InternalEntities_Array.filter(function (v) {
          return v.code === dataSector;
        });
        // remove the error from console
        if (displayed[0]) {
          $(this).text(displayed[0].name);
        } else {
          $(this).text("لا يوجد");
        }
        // $(this).text(displayed[0].name);
      });
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


// drpdown filter--> it will remove items and keep other items
// 2- filter with tabs --> hide and show


// filtet function for filter2 and 3 and 4
function FilterFunction($this, filter, data_id) {

  if ($this) {
    var row = $('.soCard[data-row]')


    var selectedchoices = $(`.page-filter .dropdown-menu.${filter}`).find('input:checked').map(function () { //getting selected choices
      return $(this).val();
    }).get();


    var value = $this.val();
    if (selectedchoices.length > 0) {
      $(row).each(function () {
        var myID = $(this).attr(data_id);
        var isThisSelected = false;
        isThisSelected = selectedchoices.indexOf(myID) > -1 ? true : false;
        isThisSelected ? $(this).parent().show() : $(this).parent().hide()
      })
    }
    if (selectedchoices.length == 0) {
      stratigicObjectivesRequest.init()
    }
  } else {
    stratigicObjectivesRequest.init()
  }
}

// filter on stratigies by invoke stratigicObjectivesRequest cause it's render GoalStratigy
// filter function for filter1
function GoalStratigyFunction($this) {

  if ($this) {
    var row = $('.goalCard[data-row]')
    firstRender = false

    var selectedchoices = $(".page-filter .dropdown-menu.Filter-1").find('input:checked').map(function () { //getting selected choices
      return $(this).val();
    }).get();

    var value = $this.val();
    if (selectedchoices.length > 0) {
      $(row).each(function () {
        var myID = $(this).attr('goal-id');

        var isThisSelected = false;
        isThisSelected = selectedchoices.indexOf(myID) > -1 ? true : false;
        isThisSelected ? $(this).parent().show() : $(this).parent().hide()
      })
    }
    if (selectedchoices.length == 0) {
      stratigicObjectivesRequest.init()
    }
  } else {
    stratigicObjectivesRequest.init()

  }
}