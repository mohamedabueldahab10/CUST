var mostahdaf = require('../../../HelperRessources/img/mostahdaf.svg');

var StrategicIndicatorsKPIs_Array = [];
var StrategicIndicatorsKPIs_Info_Request = {
  preinit: function () {
    if ($('.d-flex').length) {
      clearInterval(checkTargetStatusHtml);
      //username
      $('.user-name').text(UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join('.'));
      $('.user-name-full').text(UserN.Title);
      $('.btn-toolbar.mb-2.mb-md-0.mx-2.page-filter').append(forfilterQuery);
      SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        StrategicIndicatorsKPIs_Info_Request.init();
      });
    }
  },
  // The main Initialization function
  init: function () {

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('MainKPI');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query>\
        <OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>');
    StrategicIndicatorsKPIs_Info_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only

    clientContext.load(StrategicIndicatorsKPIs_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, StrategicIndicatorsKPIs_Info_Request.onSuccess),
      Function.createDelegate(this, StrategicIndicatorsKPIs_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = StrategicIndicatorsKPIs_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var KPIsHTML = [];
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current(),
        name = oListItem.get_item('Name') || UserNo_Data,
        code = oListItem.get_item('Title') || UserNo_Data,
        category = oListItem.get_item("Category") || UserNo_Data,
        type= oListItem.get_item("Types") || UserNo_Data,
        PeriodType = oListItem.get_item("PeriodType") || UserNo_Data,
        ResultType = oListItem.get_item("ResultType") || UserNo_Data,
        Calculation = oListItem.get_item("Calculation") || UserNo_Data,
        Owner = oListItem.get_item('Owner') ? oListItem.get_item('Owner').get_lookupValue() : UserNo_Data,
        relMKPI= oListItem.get_item("RelatedMainKpis") || UserNo_Data,
        relIKPI = oListItem.get_item("RelatedInitiativesKPIs") || UserNo_Data,
        RelatedStrategyObjective = oListItem.get_item("RelatedStrategyObjective") || UserNo_Data,
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
        ProjectCode = oListItem.get_item("ProjectCode") || UserNo_Data;

      //console.log(Cumulative, Target, PDegree, PPercentage);

      StrategicIndicatorsKPIs_Array.push({
        name: name,
        code: code,
        cat: category,
        type: type,
        PeriodType: PeriodType,
        ResultType: ResultType,
        Calculation: Calculation,
        Owner: Owner,
        relMKPI:relMKPI,
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
        Cumulative : 0,
        CumulativeUI : 0,
        TotalTargetUI : 0,
        PPercentage : 0,
        PDegree : 0,
        totalActualQ1 : 0,
        totalActualQ2 : 0,
        totalActualQ3 : 0,
        totalActualQ4 : 0,
        totalTargetQ1 : 0,
        totalTargetQ2 : 0,
        totalTargetQ3 : 0,
        totalTargetQ4 : 0
      });
    }

      Main_Array = StrategicIndicatorsKPIs_Array.filter(function(mainRes){
        return mainRes.cat[0] === 'رئيسي' && mainRes.type === 'استراتيجي';
      });

      MainOperational_Array = StrategicIndicatorsKPIs_Array.filter(function(mainRes){
        return mainRes.cat[0] === 'تشغيلي';
      });

    for(i=0;i < Main_Array.length ; i++){
      var totalActualQ1 = 0 ,totalActualQ2 = 0 ,totalActualQ3 = 0,totalActualQ4 = 0  ,totalActual = 0,
        totalTargetQ1 = 0 ,totalTargetQ2 = 0 ,totalTargetQ3 = 0 ,totalTargetQ4 = 0 ;
      for(j=0;j<MainOperational_Array.length ;j++){
        if(Main_Array[i].code === MainOperational_Array[j].relMKPI) {
          if(Main_Array[i].PeriodType==='سنوي'){
            totalActual   += MainOperational_Array[j].Actual;
          }else{
            totalActualQ1 += MainOperational_Array[j].ActualQ1;
            totalActualQ2 += MainOperational_Array[j].ActualQ2;
            totalActualQ3 += MainOperational_Array[j].ActualQ3;
            totalActualQ4 += MainOperational_Array[j].ActualQ4;
          }
          totalTargetQ1 += MainOperational_Array[j].TargetQ1;
          totalTargetQ2 += MainOperational_Array[j].TargetQ2;
          totalTargetQ3 += MainOperational_Array[j].TargetQ3;
          totalTargetQ4 += MainOperational_Array[j].TargetQ4;

          if(Main_Array[i].Calculation === 'المجموع'){
            Main_Array[i].totalActualQ1 = totalActualQ1;
            Main_Array[i].totalActualQ2 = totalActualQ2;
            Main_Array[i].totalActualQ3 = totalActualQ3;
            Main_Array[i].totalActualQ4 = totalActualQ4;
            Main_Array[i].totalTargetQ1 = totalTargetQ1;
            Main_Array[i].totalTargetQ2 = totalTargetQ2;
            Main_Array[i].totalTargetQ3 = totalTargetQ3;
            Main_Array[i].totalTargetQ4 = totalTargetQ4;
          }else if(Main_Array[i].Calculation === 'المعدل'){
            Main_Array[i].totalActualQ1 = totalActualQ1/MainOperational_Array.length;
            Main_Array[i].totalActualQ2 = totalActualQ2/MainOperational_Array.length;
            Main_Array[i].totalActualQ3 = totalActualQ3/MainOperational_Array.length;
            Main_Array[i].totalActualQ4 = totalActualQ4/MainOperational_Array.length;
            Main_Array[i].totalTargetQ1 = totalTargetQ1/MainOperational_Array.length;
            Main_Array[i].totalTargetQ2 = totalTargetQ2/MainOperational_Array.length;
            Main_Array[i].totalTargetQ3 = totalTargetQ3/MainOperational_Array.length;
            Main_Array[i].totalTargetQ4 = totalTargetQ4/MainOperational_Array.length;
          }
          Main_Array[i].Actual = Main_Array[i].PeriodType==='سنوي' ? totalActual : (totalActualQ1 + totalActualQ2 + totalActualQ3 + totalActualQ4);
          Main_Array[i].Target =  totalTargetQ1 + totalTargetQ2 + totalTargetQ3 + totalTargetQ4 ;
          Main_Array[i].PPercentage =  Main_Array[i].Target ? Math.round((Main_Array[i].Actual * 100) / Main_Array[i].Target) : 0;
          Main_Array[i].PDegree     =   Math.round(Main_Array[i].PPercentage * 1.8 + 45);
          Main_Array[i].CumulativeUI  = Main_Array[i].PeriodType==='سنوي' ? totalActual : (totalActualQ1 + totalActualQ2 + totalActualQ3 + totalActualQ4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          Main_Array[i].TotalTargetUI = (totalTargetQ1 + totalTargetQ2 + totalTargetQ3 + totalTargetQ4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      }
    }

    for(k=0;k<Main_Array.length;k++){
      var barColor = Main_Array[k].PPercentage > 75 ? 'success' : (Main_Array[k].PPercentage > 45 && Main_Array[k].PPercentage < 75 ) ? 'warning' : (Main_Array[k].PPercentage > 0 && Main_Array[k].PPercentage < 45) ? 'danger' : '';

      if(Main_Array[k].PeriodType==='سنوي') {
        KPIsHTML.push('<div class="card" data-id="'+Main_Array[k].RelatedStrategyObjective+'" style="display:none">'+
          '<div class="card-body">'+
          '<div class="d-flex justify-content-between">' +
           '<div>'+
            '<span class="badge badge-pill bg-primary px-3 py-2 white fnt-10 sbold" data-sector="'+Main_Array[k].Sector+'"></span>'+
           '</div>' +
           '<div>'+
            '<img css="w-100" class="sectorImage" id="sectorImage1" src="/Style Library/spm/images/new2.svg" data-src="/Style Library/spm/images/1.svg" data-themekey="#" data-sector-code="'+Main_Array[k].RelatedStrategyObjective+'">' +
            '<img css="w-100" class="sectorImage" id="sectorImage2" src="/Style Library/spm/images/new1.svg" data-src="/Style Library/spm/images/2.svg" data-themekey="#" data-sector-code="'+Main_Array[k].RelatedStrategyObjective+'">' +
            '<img css="w-100" class="sectorImage" id="sectorImage3" src="/Style Library/spm/images/new3.svg" data-src="/Style Library/spm/images/3.svg" data-themekey="#" data-sector-code="'+Main_Array[k].RelatedStrategyObjective+'">' +
           '</div>'+
          '</div>'+
          '<a href="https://hrdf.netways1.com/SitePages/OperationalIndicators.aspx?code='+Main_Array[k].code+'&name='+Main_Array[k].name+'&type=استراتيجي"><h2 class="card-title my-4 light-gray">'+Main_Array[k].name+'</h2></a>'+
          '<div class="col light-gray">'+
          '<div class="row">'+
          '<div class="col col-xl-auto no-padding">'+
          '<div class="progress-semi">'+
          '<div class="barOverflow">'+
          '<!--45 + (p x 1.8)-->'+
          '<div class="bar '+barColor+'" style="transform: rotate('+Main_Array[k].PDegree+'deg);"></div>'+
          '<span style="text-align:center">'+Main_Array[k].PPercentage+'%</span>'+
          '</div>'+
          '</div>'+
          '<div class="d-inline-flex flex-column mx-2">'+
          '<span data-trans-indexgenperform class="Resources fnt-12" style="text-align:center" resourcekey="IndexGeneralPerformance"></span>'+
          '</div>'+
          '</div>'+
          '<div class="col">'+
          '<div class="d-flex flex-column">'+
          '<div>'+
          '<!--<img src="./img/icon-sar.png" style="width:14px;" data-themekey="#">-->'+
          '<img src="' + mostahdaf + '" class="" data-themekey="#">' +
          '<div class="d-inline-flex flex-column mx-2">'+
          '<span data-trans-targeted class="Resources complition-val fnt-12 reg" resourcekey="Targeted"> </span>'+
          '<span class="black fnt-12 bold">'+Main_Array[k].TotalTargetUI+'</span>'+
          '</div>'+
          '</div>'+
          '<div>'+
          '<!--<img src="./img/icon-analytics.png"  style="width:14px;" data-themekey="#">-->'+
          '<i class="kpi-icon fas fa-chart-line"></i>'+
          '<div class="d-inline-flex flex-column mx-2">'+
          '<span data-trans-cumulativeinvestigator class="Resources complition-val fnt-12 bold" resourcekey="CumulativeInvestigator"></span>'+
          '<span class="black fnt-12 bold">'+Main_Array[k].CumulativeUI+'</span>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '<div class="collapse" id="collapseExample" style="">'+
          '<div class="card-body light-gray">'+
          '<div class="border-top py-3">'+
          '<div class="row mb-3">'+
          '<div class="col-6">'+
          '<span class="fnt-12 reg">'+
          '<i class="kpi-icon fas fa-check-circle"></i>'+
          '<span data-trans-baseline class="Resources px-1 bold " resourcekey="Baseline"> </span>'+
          '</span>'+
          '</div>'+
          '<div class="col-6">'+
          '<div class="d-flex justify-content-between">'+
          '<div class="d-inline-flex">'+
          '<span>'+
          '<span class="fnt-12 bold px-2">'+Main_Array[k].Baseline+'</span>'+
          '</span>'+
          '</div>'+

          '</div>'+
          '</div>'+
          '</div>'+

          '<div class="row mb-3">'+
          '<div class="col-5">'+
          '<span class="fnt-12 reg">'+
          '<i class="kpi-icon fas fa-check-circle"></i>'+
          '<span data-trans-investigator class="Resources px-1" resourcekey="Investigator"></span>'+
          '</span>'+
          '</div>'+
          '<div class="col-7">'+
          '<div class="d-flex justify-content-between">'+
          '<div class="d-inline-flex">'+
          '<span>'+
          '<span class="qrt-val fnt-12 bold px-2">'+Main_Array[k].Actual+'</span>'+
          '</span>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>'+

          '</div>'+
          '</div>'+
          '<a data-trans-viewmore class="Resources view-more fnt-12 bold d-block text-center bg-btn-gray py-2" onclick="handleCardCollapse.toggle(this)" resourcekey="ViewMore"></a>'+
          '</div>');
      }else{
        KPIsHTML.push('<div class="card" data-id="'+Main_Array[k].RelatedStrategyObjective+'" style="display:none">'+
          '<div class="card-body">'+
          '<div class="d-flex justify-content-between">' +
          '<div>'+
          '<span class="badge badge-pill bg-primary px-3 py-2 white fnt-10 sbold" data-sector="'+Main_Array[k].Sector+'"></span>'+
          '</div>' +
          '<div>'+
          '<img css="w-100" class="sectorImage" id="sectorImage1" src="/Style Library/spm/images/new2.svg" data-themekey="#" data-src="/Style Library/spm/images/1.svg" data-sector-code="'+Main_Array[k].RelatedStrategyObjective+'">' +
          '<img css="w-100" class="sectorImage" id="sectorImage2" src="/Style Library/spm/images/new1.svg" data-themekey="#" data-src="/Style Library/spm/images/2.svg" data-sector-code="'+Main_Array[k].RelatedStrategyObjective+'">' +
          '<img css="w-100" class="sectorImage" id="sectorImage3" src="/Style Library/spm/images/new3.svg" data-themekey="#" data-src="/Style Library/spm/images/3.svg" data-sector-code="'+Main_Array[k].RelatedStrategyObjective+'">' +
          '</div>'+
          '</div>'+
          '<a href="https://hrdf.netways1.com/SitePages/OperationalIndicators.aspx?code='+Main_Array[k].code+'&name='+Main_Array[k].name+'&type=استراتيجي"><h2 class="card-title my-4 light-gray">'+Main_Array[k].name+'</h2></a>'+
          '<div class="col light-gray">'+
          '<div class="row">'+
          '<div class="col col-xl-auto no-padding">'+
          '<div class="progress-semi">'+
          '<div class="barOverflow">'+
          '<!--45 + (p x 1.8)-->'+
          '<div class="bar '+barColor+'" style="transform: rotate('+Main_Array[k].PDegree+'deg);"></div>'+
          '<span style="text-align:center">'+Main_Array[k].PPercentage+'%</span>'+
          '</div>'+
          '</div>'+
          '<div class="d-inline-flex flex-column mx-2">'+
          '<span data-trans-indexgenperform class="Resources fnt-12" style="text-align:center" resourcekey="IndexGeneralPerformance"></span>'+
          '</div>'+
          '</div>'+
          '<div class="col">'+
          '<div class="d-flex flex-column">'+
          '<div>'+
          '<!--<img src="./img/icon-sar.png" style="width:14px;" data-themekey="#">-->'+
          '<img src="' + mostahdaf + '" class="" data-themekey="#">' +
          '<div class="d-inline-flex flex-column mx-2">'+
          '<span data-trans-targeted class="Resources complition-val fnt-12 reg" resourcekey="Targeted"> </span>'+
          '<span class="black fnt-12 bold">'+Main_Array[k].TotalTargetUI+'</span>'+
          '</div>'+
          '</div>'+
          '<div>'+
          '<!--<img src="./img/icon-analytics.png"  style="width:14px;" data-themekey="#">-->'+
          '<i class="kpi-icon fas fa-chart-line"></i>'+
          '<div class="d-inline-flex flex-column mx-2">'+
          '<span data-trans-cumulativeinvestigator class="Resources complition-val fnt-12 bold" resourcekey="CumulativeInvestigator"></span>'+
          '<span class="black fnt-12 bold">'+Main_Array[k].CumulativeUI+'</span>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '<div class="collapse" id="collapseExample" style="">'+
          '<div class="card-body light-gray">'+
          '<div class="border-top py-3">'+
          '<div class="row mb-3">'+
          '<div class="col-6">'+
          '<span class="fnt-12 reg">'+
          '<i class="kpi-icon fas fa-check-circle"></i>'+
          '<span data-trans-baseline class="Resources px-1 bold " resourcekey="Baseline"> </span>'+
          '</span>'+
          '</div>'+
          '<div class="col-6">'+
          '<div class="d-flex justify-content-between">'+
          '<div class="d-inline-flex">'+
          '<span>'+
          '<span class="fnt-12 bold px-2">'+Main_Array[k].Baseline+'</span>'+
          '</span>'+
          '</div>'+

          '</div>'+
          '</div>'+
          '</div>'+

          '<div class="row mb-3">'+
          '<div class="col-5">'+
          '<span class="fnt-12 reg">'+
          '<i class="kpi-icon fas fa-check-circle"></i>'+
          '<span data-trans-quartinvest class="Resources px-1" resourcekey="QuarterlyInvestigator"></span>'+
          '</span>'+
          '</div>'+
          '<div class="col-7">'+
          '<div class="d-flex justify-content-between">'+
          '<div class="d-inline-flex">'+
          '<span>'+
          '<span class="qrt-label fnt-12 reg">Q1</span>'+
          '<span class="qrt-val fnt-12 bold px-2">'+Main_Array[k].totalActualQ1+'</span>'+
          '</span>'+
          '</div>'+
          '<div class="d-inline-flex">'+
          '<span>'+
          '<span class="qrt-label fnt-12 reg">Q2</span>'+
          '<span class="qrt-val fnt-12 bold px-2">'+Main_Array[k].totalActualQ2+'</span>'+
          '</span>'+
          '</div>'+
          '</div>'+
          '<div class="d-flex justify-content-between">'+
          '<div class="d-inline-flex">'+
          '<span class="des-13">'+
          '<span class="qrt-label fnt-12 reg">Q3</span>'+
          '<span class="qrt-val fnt-12 bold px-2">'+Main_Array[k].totalActualQ3+'</span>'+
          '</span>'+
          '</div>'+
          '<div class="d-inline-flex">'+
          '<span>'+
          '<span class="qrt-label fnt-12 reg">Q4</span>'+
          '<span class="qrt-val fnt-12 bold">'+Main_Array[k].totalActualQ4+'</span>'+
          '</span>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>'+
          '</div>'+

          '</div>'+
          '</div>'+
          '<a data-trans-viewmore class="Resources view-more fnt-12 bold d-block text-center bg-btn-gray py-2" onclick="handleCardCollapse.toggle(this)" resourcekey="ViewMore"></a>'+
          '</div>');
      }

    }
    if(!KPIsHTML.length)
    {
      KPIsHTML.push(UserNo_Data);
    }
    $('.control-ctx.initiative-cards-ctx.mb-5 .card-columns.pb-5').html( KPIsHTML.join('') );

    changeResources();
   // Dimensions_Info_Request.init();
    SOs_Info_Request.init();
    InternalEntities_Info_Request.init();

  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Global variables
  g: {

  }
};
window.checkTargetStatusHtml = setInterval(function() {
  StrategicIndicatorsKPIs_Info_Request.preinit();
}, 1000);

var SOs_Array = [];
var SOs_Info_Request = {
  // The main Initialization function
  init: function() {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Sos');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query>\
        <OrderBy><FieldRef Name=\'Title\' Ascending=\'True\' /></OrderBy></Query></View>');
    SOs_Info_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only
    clientContext.load(SOs_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, SOs_Info_Request.onSuccess),
      Function.createDelegate(this, SOs_Info_Request.onError)
    );
  },
  onSuccess: function(sender, args) {
    var collListItem = SOs_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var SosHTML = [];

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      title = oListItem.get_item('Title') || No_Data;
      name = oListItem.get_item('Name') || No_Data;
      relatedIcon = oListItem.get_item('RelatedIcon') || No_Data;


      SOs_Array.push({
        name: name,
        title: title,
        relatedIcon:relatedIcon
      });

      SosHTML.push('<div class="col px-2 my-5">'+
        '<div class="link-item p-4  h-100" data-id="'+title+'">'+
        '<span><img css="w-100" src="'+relatedIcon+'" ></span>'+
        '<h4 class="text-center fnt-13 river-bed">'+name+'</h4>'+
        '</div>'+
        '</div>');

      $('[data-related-strategy]').each(function(){
        var dataRelatedStrategy = $(this).attr('data-related-strategy');
        var displayed= SOs_Array.filter(function (v) {
          return v.title === dataRelatedStrategy;
        });
        $(this).text(displayed[0].name);
      });


      $('.card[data-id="'+title+'"]').find('img').each(function(){
         var imgId = $(this).attr('id');
         var dataSrc = $(this).attr('data-src');
        if(relatedIcon === dataSrc){
            $('#'+imgId+'[data-sector-code="'+title+'"]').attr('src',dataSrc);
          }
      });

      SOs_Array.forEach(function(a,i,z)
      {
        $('.card[data-id="'+a.title+'"]').find('span.badge.badge-pill').text(a.name);
      });


      if(SosHTML.length == 0)
      {
        SosHTML.push(UserNo_Data);
      }
      $('.control-ctx.quick-links-ctx .row.mx-n2.mb-1').html( SosHTML.join('') );
      $('.quick-links-ctx .link-item').click(function () {
        var dataid = $(this).attr("data-id");
        var relatedIcon = $(this).find('img').attr("src");
        $('.quick-links-ctx .link-item').removeClass('active');
        $(this).addClass('active');
        $('.card[data-id]').hide();
        $('.card[data-id="'+dataid+'"]').fadeIn();
      });
      $('.col.px-2.my-5:first-child() .link-item').click();
      $('div#particles-foreground, div#particles-background, .vertical-centered-box').animate({ opacity: 0 }, {
        duration: 333, complete: function () {
          $('div#particles-foreground, div#particles-background, .vertical-centered-box').remove();

        }
      });
    }
  },
  onError: function(sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Global variables
  g: {

  }
};


var InternalEntities_Array = [];
var InternalEntities_Info_Request = {
  // The main Initialization function
  init: function() {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Internal Entities');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>');
    InternalEntities_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(InternalEntities_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, InternalEntities_Info_Request.onSuccess),
      Function.createDelegate(this, InternalEntities_Info_Request.onError)
    );
  },
  onSuccess: function(sender, args) {
    var collListItem = InternalEntities_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      code = oListItem.get_item('Title') || No_Data;
      name = oListItem.get_item('Name') || No_Data;

      InternalEntities_Array.push({
        name: name,
        code: code
      });

      $('[data-sector]').each(function(){
        var dataSector = $(this).attr('data-sector');
        var displayed= InternalEntities_Array.filter(function (v) {
          return v.code === dataSector;
        });
        $(this).text(displayed[0].name);
      });

    }
  },
  onError: function(sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Global variables
  g: {

  }
};
