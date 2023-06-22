
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

var currentYear = new Date().getFullYear();
var barColor = "", PDegree = 0, showMoreText = "", showLessText = "";

var startegyIdClicked = '', sosIdClicked = '';
var SoQuery = '';

var SubSoQuery = '';

// SoQuery = "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query></View>"

SoQuery = "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Choice\">main</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"

SubSoQuery = "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Neq><FieldRef Name=\"Types\" /><Value Type=\"Choice\">main</Value></Neq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"

var goalKpiQuery = '';
var goalKpiQueryG = '';
// working on query handler
var allRelatedStrategObjArr = [], allRelatedStrategyArr = [];

goalKpiQuery = "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Title' Ascending='True' /></OrderBy></Query></View>"

if (
  localStorage.getItem("lng") == null ||
  localStorage.getItem("lng") == "ar"
) {
  showMoreText = "عرض المزيد"
  showLessText = "عرض أقل"
} else {
  showMoreText = "View More"
  showLessText = "View Less"
}



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
    <Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>`;

    if (isRoleDataLevelAccess) {
      if (dataLevelAccessQuery) {
        myQuery = dataLevelAccessQuery;
      }
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



      var oListItem = listItemEnum.get_current();

      var name = oListItem.get_item("Name") || UserNo_Data,
        code = oListItem.get_item("Title") || UserNo_Data,
        kpiType = oListItem.get_item("KPIType") || UserNo_Data,
        kpiOwner = oListItem.get_item("Owner") ? oListItem.get_item("Owner").get_lookupValue() : UserNo_Data,
        performanceLeader = oListItem.get_item("PerformanceLeader") ? oListItem.get_item("PerformanceLeader").get_lookupValue() : UserNo_Data,
        performanceLeader2 = oListItem.get_item("PerformanceLeader2") ? oListItem.get_item("PerformanceLeader2").get_lookupValue() : UserNo_Data,
        kpiPerformance = oListItem.get_item("Performance") || 0,
        kpiPolarity = oListItem.get_item("Polarity"),
        totalPlanned = oListItem.get_item("TotalPlanned") || 0,
        totalActual = oListItem.get_item("TotalActual") || 0,
        kpiStatus = oListItem.get_item("Status") || UserNo_Data,
        periodType = oListItem.get_item("PeriodType") || UserNo_Data,
        fromDate = oListItem.get_item("FromDate") || UserNo_Data,
        toDate = oListItem.get_item("ToDate") || UserNo_Data,
        RelatedStrategyObjective = oListItem.get_item("RelatedStrategyObjective") || UserNo_Data;



      if (isRoleDataLevelAccess && dataLevelAccessQuery) {
        var relatedStrategyObj = oListItem.get_item("RelatedStrategyObjective")
        if (relatedStrategyObj && !allRelatedStrategObjArr.includes(relatedStrategyObj)) {
          allRelatedStrategObjArr.push(relatedStrategyObj)
        }
      }





      KPIsHTML.push(
        '<div class="card" data-id="' + RelatedStrategyObjective + '" style="display:none">' +
        '<div class="card-body">' +
        '<span class="overflow_text badge badge-pill bg-primary px-3 py-2 white fnt-10 sbold"></span>' +
        '<a href="/SitePages/View.aspx?ListKey=mainkpi&IID=' + oListItem.get_id() + '"><h4 class="overflow_text card-title my-4">' + name +
        '<div class="tooltiptextkpi">' + name + '</div>' +
        "</h4>" +

        "</a>" +
        //////////////////
        '<div class="col-md-12" style="display:flex;font-size:12px;font-weight:bold;padding:5px 7px">' +
        '<div class="col-6" style="padding:0">' +
        '<span class="Resources">' + code + '</span>' +
        '</div>' +
        '<div class="col-6">' +
        '<span data-trans-' + kpiType + '  class="Resources"></span>' +
        '</div>' +
        '</div>' +
        //////////////////
        '<div class="col-md-12" style="display:flex;font-size:12px;font-weight:bold;padding:5px 7px">' +
        '<div class="col-6" style="padding:0">' +
        '<span data-trans-kpiownername class="Resources"></span>' +
        '</div>' +
        '<div class="col-6">' +
        '<span  class="Resources">' + kpiOwner + '</span>' +
        '</div>' +
        '</div>' +
        //////////////////
        '<div class="col-md-12" style="display:flex;font-size:12px;font-weight:bold;padding:5px 7px">' +
        '<div class="col-6" style="padding:0">' +
        '<span data-trans-performanceleader class="Resources"></span>' +
        '</div>' +
        '<div class="col-6">' +
        '<span  class="Resources">' + performanceLeader + '</span>' +
        '</div>' +
        '</div>' +
        //////////////////
        '<div class="col-md-12" style="display:flex;font-size:12px;font-weight:bold;padding:5px 7px">' +
        '<div class="col-6" style="padding:0">' +
        '<span data-trans-performanceleadersec class="Resources"></span>' +
        '</div>' +
        '<div class="col-6">' +
        '<span  class="Resources">' + performanceLeader2 + '</span>' +
        '</div>' +
        '</div>' +
        /////////////////
        '<div class="col-md-12" style="display:flex;font-size:12px;font-weight:bold;padding:5px 7px">' +
        '<div class="col-6" style="padding:0">' +
        '<span data-trans-repeatmeas class="Resources"></span>' +
        '</div>' +
        '<div class="col-6">' +
        '<span data-trans-' + periodType + ' class="Resources"></span>' +
        '</div>' +
        '</div>' +
        //////////////////
        '<div class="col-md-12" style="display:flex;font-size:12px;font-weight:bold;padding:5px 7px">' +
        '<div class="col-6" style="padding:0">' +
        '<span data-trans-fromdate class="Resources"></span>' + fromDate +
        '</div>' +
        '<div class="col-6">' +
        '<span data-trans-todate class="Resources"></span>' + toDate +
        '</div>' +

        // '<div class="col-6">'+
        //   "hi"+
        // '</div>'+
        // '<div class="col-6">'+
        //   "hiaaaa"+
        // '</div>'+
        '</div>' +
        "</div>" +
        //////////////////////////
        '<div class="collapse" id="collapseExample" style="">' +
        '<div class="card-body light-gray">' +
        '<div class="border-top py-3">' +
        '<div class="row mb-3">' +
        '<div class="col-12">' +
        '<span data-trans-currentyear class="Resources"></span>' +
        currentYear +
        "</div>" +
        "</div>" +
        '<div class="row">' +
        '<div class="col-6">' +
        '<div class="col col-xl-auto no-padding">' +
        '<div class="progress-semi">' +
        '<div class="barOverflow">' +
        '<div data-internal-targetdegree="' + code + '" class="bar ' + barColor + '" style="transform: rotate(0deg);"></div>' +
        "</div>" +
        '<span data-internal-targetpercentage="' + code + '" style="text-align:center">' +
        0 +
        "%</span>" +
        '</div>' +
        '</div>' +
        "</div>" +
        '<div class="col-6">' +
        /////////////////////////// targets
        '<div>' +
        '<i class="kpi-icon fas fa-chart-line"></i>' +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span data-trans-targeted class="Resources complition-val fnt-12 reg" resourcekey="Targeted"> </span>' +
        '<span data-internal-target="' + code + '" class="black fnt-12 bold">' +
        0 +
        "</span>" +
        '</div>' +
        '</div>' +
        //////////////////////////Actual
        '<div>' +
        '<i class="kpi-icon fas fa-chart-line"></i>' +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span data-trans-cumulativeinvestigator class="Resources complition-val fnt-12" resourcekey="CumulativeInvestigator"></span>' +
        '<span data-internal-actual="' + code + '" class="black fnt-12 bold">' + 0 +
        "</span>" +
        '</div>' +
        '</div>' +
        "</div>" +
        //////////////////// navigate to target page
        '<div class="col-12" style="display:flex;justify-content:space-between">' +
        '<span style="font-size:12px">' +
        '<span data-trans-pattr21 class="Resources"></span>' +
        '<span data-trans-' + kpiStatus + ' data-kpistatus-code="' + code + '" class="kpistatus Resources ' + kpiStatus + '">' + No_Data + '</span>' +
        '</span>' +
        '<a href="' + _spPageContextInfo.siteAbsoluteUrl + '/sitepages/Targets.aspx?KpiCode=' + code + '"><span  data-trans-kpiresulttext class="Resources" style="color:#007bff;font-size:12px">' +
        "</span></a>" +
        '</div>' +
        //////////////////// end navigate to target page
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<a data-trans-viewmore data-code=' + code + ' data-performance=' + kpiPerformance + ' data-polarity=' + kpiPolarity + ' data-totalplanned=' + totalPlanned + ' data-totalactual=' + totalActual + ' data-status=' + kpiStatus + '  class="Resources view-more fnt-12 bold d-block text-center bg-btn-gray py-2" onclick="kpiCardCollapse.g.target(this)" resourcekey="ViewMore"></a>' +
        "</div>"
      );

      // /sitepages/Targets.aspx ? KpiCode =
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
      $(".page-title").html(ar_UserRole);
    } else $(".page-title").html(en_UserRole);

    changeResources();
    stratigicObjectivesRequest.init();
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

    if (isRoleDataLevelAccess && dataLevelAccessQuery) {

      if (allRelatedStrategObjArr.length) {
        SoQuery = '<View><Query><Where><And><In><FieldRef Name="Title" /><Values>';
        allRelatedStrategObjArr.forEach(function (item) {
          SoQuery += '<Value Type="Text">' + item + '</Value>';
        });
        SoQuery += '</Values></In><And><Eq><FieldRef Name=\"Types\" /><Value Type=\"Choice\">main</Value></Eq><Neq><FieldRef Name=\'DeletionStatus\'/><Value Type=\'Text\'>Deleted</Value></Neq></And></And></Where></Query></View>';
      }
    }
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
        sectorcode = oListItem.get_item("Sector") || UserNo_Data, // Sector
        departmentcode = "";


      if (isRoleDataLevelAccess && dataLevelAccessQuery && allRelatedStrategObjArr.length) {
        var relatedStrategy = oListItem.get_item("RelatedStrategy")
        if (relatedStrategy && !allRelatedStrategyArr.includes(relatedStrategy)) {
          allRelatedStrategyArr.push(relatedStrategy)
        }
      }

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
        // if (departmentcode && departmentcode != UserNo_Data) {

        //   if (localStorage.getItem('Dynamo_Internal Entities') != null) {
        //     depArrBiLang = JSON.parse(localStorage.getItem('Dynamo_Internal Entities'));
        //     depArrBiLang = depArrBiLang.filter(function (a) {
        //       return a.code === departmentcode
        //     });
        //     var bilangDepartmentCode = '';
        //     if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
        //       bilangDepartmentCode = depArrBiLang.length ? depArrBiLang[0].name : No_Data;
        //     } else bilangDepartmentCode = depArrBiLang.length ? depArrBiLang[0].nameEn : No_Data;
        //   }

        //   if (!departmentArr.includes(departmentcode)) {
        //     DepartmentNames.push({
        //       title: bilangDepartmentCode,
        //       name: departmentcode,
        //       code: code
        //     })
        //     departmentArr.push(departmentcode)
        //   }
        // }
        // departmentfilterarray = uniqueArray(DepartmentNames)

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

    if (isRoleDataLevelAccess && dataLevelAccessQuery) {
      if (allRelatedStrategObjArr.length == 0) {
        sObjectiveHtml = [UserNo_Data]
      }
    }

    $(".control-ctx.quick-links-ctx .kpi-wrapper").html(
      sObjectiveHtml.join("")
    );


    // call sub Sos
    subStrategicObjectivesRequest.init()
    //

    var strategyCounter = 1

    $(".quick-links-ctx .link-item").on('click', function () {

      var dataid = $(this).attr("data-id");
      var relatedGoalId = $(this).attr("related-goal-id");
      
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
          $(".subSos[data-id]").parent().hide();
          //
          // $('.card[data-id="' + dataid + '"]').fadeIn();
          // $('.subSos[data-id="' + dataid + '"]').parent().fadeIn();


          $('.SubsoCard[related-goal-id="'+relatedGoalId+'"]').each(function (i) {
            var soID = $(this).data('id');
            
            $('.card[data-id="' + soID + '"]').fadeIn();
            $('.subSos[data-id="' + soID + '"]').parent().fadeIn();
  
          });

  
        }
      } else {
        $(".subSos[data-id]").parent().hide();

        $('.SubsoCard[related-goal-id="'+relatedGoalId+'"]').each(function (i) {
          var soID = $(this).data('id');
          debugger
          $('.card[data-id="' + soID + '"]').fadeIn();
          $('.subSos[data-id="' + soID + '"]').parent().fadeIn();

        });

        $(".quick-links-ctx .link-item").removeClass("active");
        $(this).addClass("active");
        $(".card[data-id]").hide();
        $('.card[data-id="' + dataid + '"]').fadeIn();

        //
        // $(".subSos[data-id]").parent().hide();
        // $('.subSos[data-id="' + dataid + '"]').parent().fadeIn();
        //

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

      // var departmentfilterhtml = '<label class="dropdown-item main-action-filter"><button data-trans-CanselSelections class="clear-filter Resources" type="button"></button></label>'


      // for (var i = 0; i < departmentfilterarray.length; i++) {
      //   departmentfilterhtml += '<label class="dropdown-item"><span data-trans-' + departmentfilterarray[i].name + ' class="Resources" >' + departmentfilterarray[i].title + '</span><input data-type="Text" data-internal="SectorName" type="checkbox" name="SectorName" value="' + departmentfilterarray[i].name + '"></label>';
      // }



      if (isRoleDataLevelAccess && dataLevelAccessQuery && allRelatedStrategObjArr.length == 0) { // remove label from filter if there is no data
        sectorfilterarray = []
        namefilterarray = []
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
      // $('.content-list-head .page-filter .dropdown-menu.Filter-4').html(departmentfilterhtml);
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

      $("#clearAllFilter")
        .off()
        .on("click", function (e) {
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

            stratigicObjectivesRequest.init()

          }





        })

      //  if (
      //   $(".page-filter .dropdown-menu").find("input:checkbox:checked")
      //     .length == 0
      // ) {
      //   // $('.clearAllFilter').addClass('noOptionSelected');
      //   $("#clearAllFilter").prop("disabled", true);
      // }

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



var subStratigicObjectivesArray = [];
var subSosCodeArray = []


var subStrategicObjectivesRequest = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("SOs");
    var camlQuery = new SP.CamlQuery();

    if (isRoleDataLevelAccess && dataLevelAccessQuery) {

      if (allRelatedStrategObjArr.length) {
        SubSoQuery = '<View><Query><Where><And><In><FieldRef Name="Title" /><Values>';
        allRelatedStrategObjArr.forEach(function (item) {
          SubSoQuery += '<Value Type="Text">' + item + '</Value>';
        });
        SubSoQuery += '</Values></In><And><Neq><FieldRef Name=\"Types\" /><Value Type=\"Choice\">main</Value></Neq><Neq><FieldRef Name=\'DeletionStatus\'/><Value Type=\'Text\'>Deleted</Value></Neq></And></And></Where></Query></View>';
      }
    }

    debugger
    camlQuery.set_viewXml(SubSoQuery);
    subStrategicObjectivesRequest.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only

    clientContext.load(subStrategicObjectivesRequest.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, subStrategicObjectivesRequest.onSuccess),
      Function.createDelegate(this, subStrategicObjectivesRequest.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = subStrategicObjectivesRequest.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();

    var subObjectiveHtml = [];
    var subDepartmentArr = [];
    var subObjSectorArr = [];
    var subObjDepArrBiLang = [];


    // console.log(allRelatedStrategyArr,"allRelatedStrategyArr")

    console.log(KPINames, "KPINames KPINames")
    console.log(SectorsNames, "SectorsNames SectorsNames")
    console.log(sectorfilterarray, "sectorfilterarray")
    debugger

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current(),
        name = oListItem.get_item("Name") || UserNo_Data,
        code = oListItem.get_item("Title") || UserNo_Data,
        mainSos = oListItem.get_item("RelatedObjective") || UserNo_Data,
        relatedGoal = oListItem.get_item("RelatedStrategy") || UserNo_Data,
        sectorcode = oListItem.get_item("Sector") || UserNo_Data, // Sector
        sosTypes = oListItem.get_item("Types"),
        departmentcode = "";

      //       if (sosTypes == 'sublevel3') {
      //         sphttp.get(
      //           _spPageContextInfo.siteServerRelativeUrl,
      //           'SOs',
      //           SubSoQuery,
      //           ['ID','Title','Name','RelatedObjective','Types'],
      //           function (records, record, listItem, isDone) {
      //             if (isDone) {
      // console.log(records,"recordsrecordsrecordsrecordsrecords")
      //             }
      //           }
      //         )
      //       }


      if (isRoleDataLevelAccess && dataLevelAccessQuery && allRelatedStrategObjArr.length) {
        var relatedStrategy = oListItem.get_item("RelatedStrategy")
        if (relatedStrategy && !allRelatedStrategyArr.includes(relatedStrategy)) {
          allRelatedStrategyArr.push(relatedStrategy)
        }
      }

      if (!strategyArray.includes(relatedGoal)) {
        strategyArray.push(relatedGoal)
      }

      // if (originalstate) // in original state before any filter [before culminating data]
      // {
      //   KPINames.push({
      //     name: name,
      //     code: code
      //   });
      //   uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
      //   namefilterarray = uniqueArray(KPINames);
      //   if (sectorcode && sectorcode != UserNo_Data) {

      //     if (localStorage.getItem('Dynamo_Internal Entities') != null) {
      //       sectorarr = JSON.parse(localStorage.getItem('Dynamo_Internal Entities'));
      //       sectorarr = sectorarr.filter(function (a) {
      //         return a.code === sectorcode
      //       });
      //       var bilangSectorCode = '';
      //       if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
      //         bilangSectorCode = sectorarr.length ? sectorarr[0].name : No_Data;
      //       } else bilangSectorCode = sectorarr.length ? sectorarr[0].nameEn : No_Data;
      //     }
      //     if (!sectorArr.includes(sectorcode)) {

      //       SectorsNames.push({
      //         title: bilangSectorCode,
      //         name: sectorcode,
      //         code: code
      //       })
      //       sectorArr.push(sectorcode)
      //     }
      //   }
      //   sectorfilterarray = uniqueArray(SectorsNames)



      // }


      subStratigicObjectivesArray.push({
        name: name,
        code: code,
      });
      subSosCodeArray.push({ code })

      subObjectiveHtml.push(
        '<div class="kpi-item col px-2 my-5">' +
        '<div style="cursor:pointer" class="SubsoCard link-item p-4 h-100 subSos" data-currentid="' + code + '" data-id="' +
        mainSos +
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


    subStratigicObjectivesArray.forEach(function (a, i, z) {
      $('.card[data-id="' + a.code + '"]')
        .find("span.badge.badge-pill")
        .text(a.name);
    });
    if (subObjectiveHtml.length == 0) {
      subObjectiveHtml.push(UserNo_Data);
    }

    if (isRoleDataLevelAccess && dataLevelAccessQuery) {
      if (allRelatedStrategObjArr.length == 0) {
        subObjectiveHtml = [UserNo_Data]
      }
    }


    $(".control-ctx.quick-links-ctx .subkpi-wrapper").html(
      subObjectiveHtml.join("")
    );


    var strategyCounter = 1

    $(".quick-links-ctx .link-item.subSos").on('click', function () {

      var dataid = $(this).attr("data-currentid");
      debugger
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
          // $(".subSos[data-id]").parent().hide();
          //
          $('.card[data-id="' + dataid + '"]').fadeIn();
          // $('.subSos[data-id="' + dataid + '"]').parent().fadeIn();
          //
        }
      } else {
        $(".quick-links-ctx .link-item").removeClass("active");
        $(this).addClass("active");
        $(".card[data-id]").hide();
        $('.card[data-id="' + dataid + '"]').fadeIn();

        // //
        // $(".subSos[data-id]").parent().hide();
        // $('.subSos[data-id="' + dataid + '"]').parent().fadeIn();
        // //

        sosIdClicked = dataid
      }
    });



  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  g: {}
}


///////////////////////
var GoalsArray = [];
var GoalsCodeArray = []
var GoalsKPIs_Info_Request = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("GoalStrategy");
    var camlQuery = new SP.CamlQuery();

    //////

    if (allRelatedStrategyArr.length) {
      goalKpiQuery = '<View><Query><Where><And><In><FieldRef Name="Title" /><Values>';
      allRelatedStrategyArr.forEach(function (item) {
        goalKpiQuery += '<Value Type="Text">' + item + '</Value>';
      });
      goalKpiQuery += '</Values></In><Neq><FieldRef Name=\'DeletionStatus\'/><Value Type=\'Text\'>Deleted</Value></Neq></And></Where></Query></View>';
    }




    /////
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

    if (isRoleDataLevelAccess && dataLevelAccessQuery) {
      if (allRelatedStrategyArr.length == 0) {
        goalsHtml = [UserNo_Data]
      }
    }

    $(".control-ctx.quick-links-ctx .strategy-wrapper").html(
      goalsHtml.join("")
    );

    if (originalstate) {
      var strategicfilterhtml = '<label class="dropdown-item main-action-filter"><button data-trans-CanselSelections class="clear-filter Resources" type="button"></button></label>';

      if (isRoleDataLevelAccess && dataLevelAccessQuery && allRelatedStrategObjArr.length == 0) {
        strategicfilterarray = []
      }
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
      debugger
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

          $(".subSos[data-id]").parent().hide();

          $('.soCard[related-goal-id="' + dataid + '"]').each(function (i) {
            var soID = $(this).data('id');
            $('.card[data-id="' + soID + '"]').fadeIn();
          });

          // show only related sub sos
          $('.SubsoCard[related-goal-id="' + dataid + '"]').each(function (i) {
            var soID = $(this).data('id');
            $('.subSos[data-id="' + soID + '"]').parent().fadeIn();
          });

        }
      } else {
        $(".quick-links-ctx .link-items-goal").removeClass("active");
        $(this).addClass("active");
        $(".soCard[related-goal-id]").parent().hide();
        $('.soCard[related-goal-id="' + dataid + '"]').parent().fadeIn();

        //
        $(".SubsoCard[related-goal-id]").parent().hide();
        $('.SubsoCard[related-goal-id="' + dataid + '"]').parent().fadeIn();

        //
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
    if (firstRender) {
      $('.card').show();
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  g: {}
}



// /////////////////////////

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


////
window.kpiCardCollapse = {
  g: {
    target: function (elem) {
      if ($(elem).parent().find(".collapse").hasClass("show")) {
        $(elem).parent().find(".collapse").removeClass("show");

        $(elem).text(showMoreText);
      } else {
        var kpiCode = $(elem).data('code')
        var kpiPeformance = $(elem).data('performance')
        var kpiPolarity = $(elem).data('polarity')
        var totalPlanned = $(elem).data('totalplanned')
        var totalActual = $(elem).data('totalactual')
        var kpiStatus = $(elem).data('status')

        update_kpi_status.init(kpiCode, kpiPeformance, kpiPolarity, totalPlanned, totalActual, kpiStatus)

        $(elem).parent().find(".collapse").addClass("show");
        $(elem).text(showLessText);
      }
    }
  }
}


var update_kpi_status = {
  init: function (kpiCode, kpiPerformance, kpiPolarity, totalPlanned, totalActual, kpiStatus) {

    var kpiPercentage = 0;


    $('span[data-internal-target*="' + kpiCode + '"]').text(totalPlanned)
    $('span[data-internal-actual*="' + kpiCode + '"]').text(totalActual)

    if (kpiPolarity == "+" && totalPlanned == 0) { //>> gray set percentage ==0 in chart
      kpiPercentage = 0
    } else if (kpiPolarity == "-" && totalActual == 0) {
      kpiPercentage = 0
    } else {
      kpiPercentage = kpiPerformance
    }
    var kpiDegree = Math.round(kpiPercentage * 1.8 + 45); //formula
    kpiDegree = kpiDegree > 222 ? 222 : kpiDegree;

    console.log(kpiStatus, "kpiStatus kpiStatus")




    $('div[data-internal-targetdegree*="' + kpiCode + '"]').css("transform", `rotate(${kpiDegree}deg)`);
    $('div[data-internal-targetdegree*="' + kpiCode + '"]').addClass(kpiStatus);
    $('span[data-internal-targetpercentage*="' + kpiCode + '"]').text(kpiPercentage + "%")

    // changeResources()
  }
}

