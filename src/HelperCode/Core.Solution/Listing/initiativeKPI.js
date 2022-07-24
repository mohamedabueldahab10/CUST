var mostahdaf = "";//;require('../../../HelperRessources/img/mostahdaf.svg');

window.checkTargetStatusHtml = setInterval(function() {
  Initiatives_Info_Request.preinit();
}, 1000);

var Initiatives_Array = [];
var Initiatives_Info_Request = {
  preinit: function () {
    if ($('.d-flex').length) {
      clearInterval(checkTargetStatusHtml);
      //username
      $('.user-name').text(UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join('.'));
      $('.user-name-full').text(UserN.Title);
      $('.btn-toolbar.mb-2.mb-md-0.mx-2.page-filter').append(forfilterQuery);
      SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        Initiatives_Info_Request.init();
      });
    }
  },
  // The main Initialization function
  init: function() {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Initiatives');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query>\
        <OrderBy><FieldRef Name=\'Title\' Ascending=\'True\' /></OrderBy></Query></View>');
    Initiatives_Info_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only
    clientContext.load(Initiatives_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Initiatives_Info_Request.onSuccess),
      Function.createDelegate(this, Initiatives_Info_Request.onError)
    );
  },
  onSuccess: function(sender, args) {
    var collListItem = Initiatives_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      title = oListItem.get_item('Title') || No_Data;
      name = oListItem.get_item('Name') || No_Data;
      strategicPillar = oListItem.get_item('StrategicPillar') || No_Data;
      sector = oListItem.get_item('Sector') || No_Data;
      description = oListItem.get_item('Description') || No_Data;

      Initiatives_Array.push({
        name: name,
        title: title,
        sector: sector,
        description: description,
        strategicPillar: strategicPillar,
      });
    }

    InstrumentKPI_Info_Request.init();
  },
  onError: function(sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Global variables
  g: {

  }
};

var InstrumentKPI_Array = [];
var InstrumentKPI_Info_Request = {
  // The main Initialization function
  init: function() {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('InstrumentKPI');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query>\
        <OrderBy><FieldRef Name=\'Title\' Ascending=\'True\' /></OrderBy></Query></View>');
    InstrumentKPI_Info_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only
    clientContext.load(InstrumentKPI_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, InstrumentKPI_Info_Request.onSuccess),
      Function.createDelegate(this, InstrumentKPI_Info_Request.onError)
    );
  },
  onSuccess: function(sender, args) {
    var collListItem = InstrumentKPI_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      title = oListItem.get_item('Title') || No_Data;
      name = oListItem.get_item('Name') || No_Data;
      relatedInitiativeKPI = oListItem.get_item('RelatedInitiativeKPI') || No_Data;
      calculation = oListItem.get_item('Calculation') || No_Data;
      actualQ1 = oListItem.get_item('ActualQ1') || 0;
      actualQ2 = oListItem.get_item('ActualQ2') || 0;
      actualQ3 = oListItem.get_item('ActualQ3') || 0;
      actualQ4 = oListItem.get_item('ActualQ4') || 0;
      targetQ1 = oListItem.get_item('TargetQ1') || 0;
      targetQ2 = oListItem.get_item('TargetQ2') || 0;
      targetQ3 = oListItem.get_item('TargetQ3') || 0;
      targetQ4 = oListItem.get_item('TargetQ4') || 0;
      target = oListItem.get_item('Target') || 0;
      actual = oListItem.get_item('Actual') || 0;

      InstrumentKPI_Array.push({
        code : title,
        name : name,
        calculation : calculation,
        relatedInitiativeKPI : relatedInitiativeKPI,
        Target   : target,
        Actual   : actual,
        ActualQ1 : actualQ1,
        ActualQ2 : actualQ2,
        ActualQ3 : actualQ3,
        ActualQ4 : actualQ4,
        TargetQ1 : targetQ1,
        TargetQ2 : targetQ2,
        TargetQ3 : targetQ3,
        TargetQ4 : targetQ4
      });
    }

    InitiativeKPIs_Info_Request.init();
},
  onError: function(sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Global variables
  g: {

  }
};

var InitiativeKPIs_Array = [];
var InitiativeKPIs_Info_Request = {
  // The main Initialization function
  init: function () {

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('InitiativeKPI');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query>\
        <OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>');

    InitiativeKPIs_Info_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only

    clientContext.load(InitiativeKPIs_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, InitiativeKPIs_Info_Request.onSuccess),
      Function.createDelegate(this, InitiativeKPIs_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = InitiativeKPIs_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var KPIsHTML = [];

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current(),
        Description = oListItem.get_item("Description") || UserNo_Data,
        code = oListItem.get_item('Title') || UserNo_Data,
        category = oListItem.get_item("Category") || UserNo_Data,
        PeriodType = oListItem.get_item("PeriodType") || UserNo_Data,
        ResultType = oListItem.get_item("ResultType") || UserNo_Data,
        Calculation = oListItem.get_item("Calculation") || UserNo_Data,
        Owner = oListItem.get_item("Owner") || UserNo_Data,
        RelatedStrategyObjective = oListItem.get_item("RelatedStrategyObjective") || UserNo_Data,
        Types = oListItem.get_item("Types") || UserNo_Data,
        ActualQ1 = oListItem.get_item("ActualQ1") || 0,
        ActualQ2 = oListItem.get_item("ActualQ2") || 0,
        ActualQ3 = oListItem.get_item("ActualQ3") || 0,
        ActualQ4 = oListItem.get_item("ActualQ4") || 0,
        TargetQ1 = oListItem.get_item("TargetQ1") || 0,
        TargetQ2 = oListItem.get_item("TargetQ2") || 0,
        TargetQ3 = oListItem.get_item("TargetQ3") || 0,
        TargetQ4 = oListItem.get_item("TargetQ4") || 0,
        Target = oListItem.get_item("Target") || 0,
        Actual = oListItem.get_item("Actual") || 0,
        Benchmarking = oListItem.get_item("Benchmarking") || UserNo_Data,
        MesurePriority = oListItem.get_item("MesurePriority") || UserNo_Data,
        Dimensions = oListItem.get_item("Dimensions") || UserNo_Data,
        KPIActivationStatus = oListItem.get_item("KPIActivationStatus") || UserNo_Data,
        RelatedMainKPI = oListItem.get_item("RelatedMainKPI") || UserNo_Data,
        relIKPI = oListItem.get_item('RelatedInstrumentKPI') || UserNo_Data,
        Initiative = oListItem.get_item("Initiative") || UserNo_Data,
        KPIType = oListItem.get_item("KPIType") || UserNo_Data,
        Baseline = oListItem.get_item("Baseline") || UserNo_Data,
        Formula = oListItem.get_item("Formula") || UserNo_Data,
        SupportType = oListItem.get_item("SupportType") || UserNo_Data,
        KPILevels = oListItem.get_item("KPILevels") || UserNo_Data,
        Priority = oListItem.get_item("Priority") || UserNo_Data,
        DataAvailability = oListItem.get_item("DataAvailability") || UserNo_Data,
        DataSource = oListItem.get_item("DataSource") || UserNo_Data,
        SystemName = oListItem.get_item("SystemName") || UserNo_Data,
        Polarity = oListItem.get_item("Polarity") || UserNo_Data,
        Cumulative = ActualQ1+ActualQ2+ActualQ3+ActualQ4,
        CumulativeUI = (ActualQ1+ActualQ2+ActualQ3+ActualQ4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        TotalTarget = TargetQ1+TargetQ2+TargetQ3+TargetQ4,
        TotalTargetUI = (TargetQ1+TargetQ2+TargetQ3+TargetQ4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        PPercentage = TotalTarget ? Math.round( (Cumulative*100)/ TotalTarget ) : 0,
        PDegree = Math.round( PPercentage*1.8 + 45 );//formula

      console.log(Cumulative, Target, PDegree, PPercentage);

      Initiatives_Array.map(function (v) {
        if (v.title === Initiative) {
          InitiativeKPIs_Array.push({
            name: oListItem.get_item('Name'),
            initiativeName: v.name,
            sector: v.sector,
            strategicPillar: v.strategicPillar,
            initiativeKPIName: Description,
            code: code,
            category: category,
            PeriodType: PeriodType,
            ResultType: ResultType,
            Calculation: Calculation,
            Owner: Owner,
            RelatedStrategyObjective: RelatedStrategyObjective,
            Types: Types,
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
            MesurePriority: MesurePriority,
            Dimensions: Dimensions,
            KPIActivationStatus: KPIActivationStatus,
            RelatedMainKPI: RelatedMainKPI,
            relIKPI : relIKPI,
            Initiative: Initiative,
            KPIType: KPIType,
            Baseline: Baseline,
            Formula: Formula,
            SupportType: SupportType,
            KPILevels: KPILevels,
            Priority: Priority,
            DataAvailability: DataAvailability,
            DataSource: DataSource,
            SystemName: SystemName,
            Polarity: Polarity,
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
      });
  }

    // for(k=0;k< InitiativeKPIs_Array.length ; k++){
    //   var totalActualQ1 = 0 ,totalActualQ2 = 0 ,totalActualQ3 = 0,totalActualQ4 = 0  ,totalActual = 0,
    //     totalTargetQ1 = 0 ,totalTargetQ2 = 0 ,totalTargetQ3 = 0 ,totalTargetQ4 = 0 ;
    //   for(j=0;j<InstrumentKPI_Array.length ;j++){
    //     if(InitiativeKPIs_Array[k].code === InstrumentKPI_Array[j].relatedInitiativeKPI){
    //         totalActual   += InstrumentKPI_Array[j].Actual;
    //         totalActualQ1 += InstrumentKPI_Array[j].ActualQ1;
    //         totalActualQ2 += InstrumentKPI_Array[j].ActualQ2;
    //         totalActualQ3 += InstrumentKPI_Array[j].ActualQ3;
    //         totalActualQ4 += InstrumentKPI_Array[j].ActualQ4;
    //         totalTargetQ1 += InstrumentKPI_Array[j].TargetQ1;
    //         totalTargetQ2 += InstrumentKPI_Array[j].TargetQ2;
    //         totalTargetQ3 += InstrumentKPI_Array[j].TargetQ3;
    //         totalTargetQ4 += InstrumentKPI_Array[j].TargetQ4;
    //
    //       if(InitiativeKPIs_Array[k].Calculation === 'المجموع'){
    //         InitiativeKPIs_Array[k].totalActual = totalActual;
    //         InitiativeKPIs_Array[k].totalActualQ1 = totalActualQ1;
    //         InitiativeKPIs_Array[k].totalActualQ2 = totalActualQ2;
    //         InitiativeKPIs_Array[k].totalActualQ3 = totalActualQ3;
    //         InitiativeKPIs_Array[k].totalActualQ4 = totalActualQ4;
    //         InitiativeKPIs_Array[k].totalTargetQ1 = totalTargetQ1;
    //         InitiativeKPIs_Array[k].totalTargetQ2 = totalTargetQ2;
    //         InitiativeKPIs_Array[k].totalTargetQ3 = totalTargetQ3;
    //         InitiativeKPIs_Array[k].totalTargetQ4 = totalTargetQ4;
    //       }else if(InitiativeKPIs_Array[k].Calculation === 'المعدل'){
    //         InitiativeKPIs_Array[k].totalActual = totalActual/InstrumentKPI_Array.length;
    //         InitiativeKPIs_Array[k].totalActualQ1 = totalActualQ1/InstrumentKPI_Array.length;
    //         InitiativeKPIs_Array[k].totalActualQ2 = totalActualQ2/InstrumentKPI_Array.length;
    //         InitiativeKPIs_Array[k].totalActualQ3 = totalActualQ3/InstrumentKPI_Array.length;
    //         InitiativeKPIs_Array[k].totalActualQ4 = totalActualQ4/InstrumentKPI_Array.length;
    //         InitiativeKPIs_Array[k].totalTargetQ1 = totalTargetQ1/InstrumentKPI_Array.length;
    //         InitiativeKPIs_Array[k].totalTargetQ2 = totalTargetQ2/InstrumentKPI_Array.length;
    //         InitiativeKPIs_Array[k].totalTargetQ3 = totalTargetQ3/InstrumentKPI_Array.length;
    //         InitiativeKPIs_Array[k].totalTargetQ4 = totalTargetQ4/InstrumentKPI_Array.length;
    //       }
    //       InitiativeKPIs_Array[k].Actual = InitiativeKPIs_Array[k].PeriodType==='سنوي' ? totalActual : (totalActualQ1 + totalActualQ2 + totalActualQ3 + totalActualQ4);
    //       InitiativeKPIs_Array[k].Target =  totalTargetQ1 + totalTargetQ2 + totalTargetQ3 + totalTargetQ4 ;
    //       InitiativeKPIs_Array[k].PPercentage =  InitiativeKPIs_Array[k].Target ? Math.round((InitiativeKPIs_Array[k].Actual * 100) / InitiativeKPIs_Array[k].Target) : 0;
    //       InitiativeKPIs_Array[k].PDegree     =   Math.round(InitiativeKPIs_Array[k].PPercentage * 1.8 + 45);
    //       InitiativeKPIs_Array[k].CumulativeUI  = InitiativeKPIs_Array[k].PeriodType==='سنوي' ? totalActual : (totalActualQ1 + totalActualQ2 + totalActualQ3 + totalActualQ4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //       InitiativeKPIs_Array[k].TotalTargetUI = (totalTargetQ1 + totalTargetQ2 + totalTargetQ3 + totalTargetQ4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //     }
    //   }
    // }

  for( i=0; i< InitiativeKPIs_Array.length ; i++) {
    var barColor = InitiativeKPIs_Array[i].PPercentage  > 75 ? 'success' : (InitiativeKPIs_Array[i].PPercentage > 45 && InitiativeKPIs_Array[i].PPercentage < 75 ) ? 'warning' : (InitiativeKPIs_Array[i].PPercentage > 0 && InitiativeKPIs_Array[i].PPercentage < 45) ? 'danger' : '';

    if(InitiativeKPIs_Array[i].PeriodType==='سنوي'){
      KPIsHTML.push('<div class="card" data-id="' + InitiativeKPIs_Array[i].strategicPillar + '" style="display:none">' +
      '<div class="card-body">' +
      '<span class="badge badge-pill bg-primary px-3 py-2 white fnt-10 sbold" data-sector="' + InitiativeKPIs_Array[i].sector + '">' + InitiativeKPIs_Array[i].sector + '</span>' +
      '<a href="https://hrdf.netways1.com/SitePages/Programs.aspx?code=' + InitiativeKPIs_Array[i].Initiative + '"><h2 class="card-title my-4 light-gray">' + InitiativeKPIs_Array[i].initiativeKPIName + '</h2></a>' +
      '<div class="col light-gray">' +
      '<div class="row">' +
      '<div class="col col-xl-auto no-padding">' +
      '<div class="progress-semi">' +
      '<div class="barOverflow">' +
      '<!--45 + (p x 1.8)-->' +
      '<div class="bar '+barColor+'" style="transform: rotate(' + InitiativeKPIs_Array[i].PDegree + 'deg);"></div>' +
      '<span style="text-align:center">' + InitiativeKPIs_Array[i].PPercentage + '%</span>' +
      '</div>' +
      '</div>' +
      '<div class="d-inline-flex flex-column mx-2">' +
      '<span class="fnt-12" style="text-align:center" resourcekey="IndexGeneralPerformance"></span>' +
      '</div>' +
      '</div>' +
      '<div class="col">' +
      '<div class="d-flex flex-column">' +
      '<div>' +
      '<!--<img src="./img/icon-sar.png" style="width:14px;" data-themekey="#">-->' +
      '<img src="' + mostahdaf + '" class="" data-themekey="#">' +
      '<div class="d-inline-flex flex-column mx-2">' +
      '<span class="complition-val fnt-12 reg" resourcekey="Targeted"> </span>' +
      '<span class="black fnt-12 bold">' + InitiativeKPIs_Array[i].TotalTargetUI + '</span>' +
      '</div>' +
      '</div>' +
      '<div>' +
      '<!--<img src="./img/icon-analytics.png"  style="width:14px;" data-themekey="#">-->' +
      '<i class="kpi-icon fas fa-dollar-sign"></i>' +
      '<div class="d-inline-flex flex-column mx-2">' +
      '<span class="complition-val fnt-12 bold" resourcekey="ExchangeRatio"></span>' +
      '<span class="black fnt-12 bold">' + InitiativeKPIs_Array[i].CumulativeUI + '</span>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="collapse" id="collapseExample" style="">' +
      '<div class="card-body light-gray">' +
      '<div class="border-top py-3">' +
      '<div class="row mb-3">' +
      '<div class="col-5">' +
      '<span class="fnt-12 reg">' +
      '<i class="kpi-icon fas fa-check-circle"></i>' +
      '<span class="px-1" resourcekey="cumulativeExchange"></span>' +
      '</span>' +
      '</div>' +
      '<div class="col-7">' +
      '<div class="d-flex justify-content-between">' +
      '<div class="d-inline-flex">' +
      '<span>' +
      '<span class="qrt-label fnt-12 reg" resourcekey="Budget"></span>' +
      '<span class="qrt-val fnt-12 bold px-2">200K</span>' +
      '</span>' +
      '</div>' +
      '</div>' +
      '<div class="d-flex justify-content-between">' +
      '<div class="d-inline-flex">' +
      '<span class="des-13">' +
      '<span class="qrt-label fnt-12 reg" resourcekey="Residual"></span>' +
      '<span class="qrt-val fnt-12 bold px-2">100K</span>' +
      '</span>' +
      '</div>' +
      '<div class="d-inline-flex">' +
      '<span>' +
      '<span class="qrt-label fnt-12 reg" resourcekey="Exchange"></span>' +
      '<span class="qrt-val fnt-12 bold">100K</span>' +
      '</span>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '</div>' +
      '<div class="card-body light-gray">' +
      '<div class="border-top py-3">' +
      '<div class="row mb-3">' +
      '<div class="col-6">' +
      '<span class="fnt-12 reg">' +
      '<i class="kpi-icon fas fa-check-circle"></i>' +
      '<span class="px-1 bold " resourcekey="CumulativeInvestigator"> </span>' +
      '</span>' +
      '</div>' +
      '<div class="col-6">' +
      '<div class="d-flex justify-content-between">' +
      '<div class="d-inline-flex">' +
      '<span>' +
      '<span class="fnt-12 bold px-2">' + InitiativeKPIs_Array[i].Baseline + '</span>' +
      '</span>' +
      '</div>' +

      '</div>' +
      '</div>' +
      '</div>' +

      '<div class="row mb-3">'+
      '<div class="col-5">'+
      '<span class="fnt-12 reg">'+
      '<i class="kpi-icon fas fa-check-circle"></i>'+
      '<span class="px-1" resourcekey="Investigator"></span>'+
      '</span>'+
      '</div>'+
      '<div class="col-7">'+
      '<div class="d-flex justify-content-between">'+
      '<div class="d-inline-flex">'+
      '<span>'+
      '<span class="qrt-val fnt-12 bold px-2">'+InitiativeKPIs_Array[i].Actual+'</span>'+
      '</span>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '<div class="row mb-3">' +
      '<div class="col-5">' +
      '<span class="fnt-12 reg">' +
      '<i class="kpi-icon fas fa-check-circle"></i>' +
      '<span class="px-1" resourcekey="GenderDetective"></span>' +
      '</span>' +
      '</div>' +
      '<div class="col-7">' +
      '<div class="d-flex justify-content-between">' +
      '<div class="d-inline-flex">' +
      '<span>' +
      '<span class="qrt-label fnt-12 reg" resourcekey="Male"></span>' +
      '<span class="qrt-val fnt-12 bold px-2">82,026</span>' +
      '</span>' +
      '</div>' +
      '<div class="d-inline-flex">' +
      '<span>' +
      '<span class="qrt-label fnt-12 reg" resourcekey="Female"></span>' +
      '<span class="qrt-val fnt-12 bold px-2">87,434</span>' +
      '</span>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '</div>' +
      '</div>' +
      '<a class="view-more fnt-12 bold d-block text-center bg-btn-gray py-2" onclick="handleCardCollapse.toggle(this)" resourcekey="ViewMore"></a>' +
      '</div>');

  }else{
      KPIsHTML.push('<div class="card" data-id="' + InitiativeKPIs_Array[i].strategicPillar + '" style="display:none">' +
        '<div class="card-body">' +
        '<span class="badge badge-pill bg-primary px-3 py-2 white fnt-10 sbold" data-sector="' + InitiativeKPIs_Array[i].sector + '">' + InitiativeKPIs_Array[i].sector + '</span>' +
        '<a href="https://hrdf.netways1.com/SitePages/Programs.aspx?code=' + InitiativeKPIs_Array[i].Initiative + '"><h2 class="card-title my-4 light-gray">' + InitiativeKPIs_Array[i].initiativeKPIName + '</h2></a>' +
        '<div class="col light-gray">' +
        '<div class="row">' +
        '<div class="col col-xl-auto no-padding">' +
        '<div class="progress-semi">' +
        '<div class="barOverflow">' +
        '<!--45 + (p x 1.8)-->' +
        '<div class="bar '+barColor+'" style="transform: rotate(' + InitiativeKPIs_Array[i].PDegree + 'deg);"></div>' +
        '<span style="text-align:center">' + InitiativeKPIs_Array[i].PPercentage + '%</span>' +
        '</div>' +
        '</div>' +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span class="fnt-12" style="text-align:center" resourcekey="IndexGeneralPerformance"></span>' +
        '</div>' +
        '</div>' +
        '<div class="col">' +
        '<div class="d-flex flex-column">' +
        '<div>' +
        '<!--<img src="./img/icon-sar.png" style="width:14px;" data-themekey="#">-->' +
        '<img src="' + mostahdaf + '" class="" data-themekey="#">' +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span class="complition-val fnt-12 reg" resourcekey="Targeted"> </span>' +
        '<span class="black fnt-12 bold">' + InitiativeKPIs_Array[i].TotalTargetUI + '</span>' +
        '</div>' +
        '</div>' +
        '<div>' +
        '<!--<img src="./img/icon-analytics.png"  style="width:14px;" data-themekey="#">-->' +
        '<i class="kpi-icon fas fa-dollar-sign"></i>' +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span class="complition-val fnt-12 bold" resourcekey="ExchangeRatio"></span>' +
        '<span class="black fnt-12 bold">' + InitiativeKPIs_Array[i].CumulativeUI + '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="collapse" id="collapseExample" style="">' +
        '<div class="card-body light-gray">' +
        '<div class="border-top py-3">' +
        '<div class="row mb-3">' +
        '<div class="col-5">' +
        '<span class="fnt-12 reg">' +
        '<i class="kpi-icon fas fa-check-circle"></i>' +
        '<span class="px-1" resourcekey="cumulativeExchange"></span>' +
        '</span>' +
        '</div>' +
        '<div class="col-7">' +
        '<div class="d-flex justify-content-between">' +
        '<div class="d-inline-flex">' +
        '<span>' +
        '<span class="qrt-label fnt-12 reg" resourcekey="Budget"></span>' +
        '<span class="qrt-val fnt-12 bold px-2">200K</span>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '<div class="d-flex justify-content-between">' +
        '<div class="d-inline-flex">' +
        '<span class="des-13">' +
        '<span class="qrt-label fnt-12 reg" resourcekey="Residual"></span>' +
        '<span class="qrt-val fnt-12 bold px-2">100K</span>' +
        '</span>' +
        '</div>' +
        '<div class="d-inline-flex">' +
        '<span>' +
        '<span class="qrt-label fnt-12 reg" resourcekey="Exchange"></span>' +
        '<span class="qrt-val fnt-12 bold">100K</span>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '</div>' +
        '<div class="card-body light-gray">' +
        '<div class="border-top py-3">' +
        '<div class="row mb-3">' +
        '<div class="col-6">' +
        '<span class="fnt-12 reg">' +
        '<i class="kpi-icon fas fa-check-circle"></i>' +
        '<span class="px-1 bold " resourcekey="CumulativeInvestigator"> </span>' +
        '</span>' +
        '</div>' +
        '<div class="col-6">' +
        '<div class="d-flex justify-content-between">' +
        '<div class="d-inline-flex">' +
        '<span>' +
        '<span class="fnt-12 bold px-2">' + InitiativeKPIs_Array[i].Baseline + '</span>' +
        '</span>' +
        '</div>' +

        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="row mb-3">' +
        '<div class="col-5">' +
        '<span class="fnt-12 reg">' +
        '<i class="kpi-icon fas fa-check-circle"></i>' +
        '<span class="px-1" resourcekey="QuarterlyInvestigator"></span>' +
        '</span>' +
        '</div>' +
        '<div class="col-7">' +
        '<div class="d-flex justify-content-between">' +
        '<div class="d-inline-flex">' +
        '<span>' +
        '<span class="qrt-label fnt-12 reg">Q1</span>' +
        '<span class="qrt-val fnt-12 bold px-2">' + InitiativeKPIs_Array[i].totalActualQ1 + '</span>' +
        '</span>' +
        '</div>' +
        '<div class="d-inline-flex">' +
        '<span>' +
        '<span class="qrt-label fnt-12 reg">Q2</span>' +
        '<span class="qrt-val fnt-12 bold px-2">' + InitiativeKPIs_Array[i].totalActualQ2 + '</span>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '<div class="d-flex justify-content-between">' +
        '<div class="d-inline-flex">' +
        '<span class="des-13">' +
        '<span class="qrt-label fnt-12 reg">Q3</span>' +
        '<span class="qrt-val fnt-12 bold px-2">' + InitiativeKPIs_Array[i].totalActualQ3 + '</span>' +
        '</span>' +
        '</div>' +
        '<div class="d-inline-flex">' +
        '<span>' +
        '<span class="qrt-label fnt-12 reg">Q4</span>' +
        '<span class="qrt-val fnt-12 bold">' + InitiativeKPIs_Array[i].totalActualQ4 + '</span>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row mb-3">' +
        '<div class="col-5">' +
        '<span class="fnt-12 reg">' +
        '<i class="kpi-icon fas fa-check-circle"></i>' +
        '<span class="px-1" resourcekey="GenderDetective"></span>' +
        '</span>' +
        '</div>' +
        '<div class="col-7">' +
        '<div class="d-flex justify-content-between">' +
        '<div class="d-inline-flex">' +
        '<span>' +
        '<span class="qrt-label fnt-12 reg" resourcekey="Male"></span>' +
        '<span class="qrt-val fnt-12 bold px-2">82,026</span>' +
        '</span>' +
        '</div>' +
        '<div class="d-inline-flex">' +
        '<span>' +
        '<span class="qrt-label fnt-12 reg" resourcekey="Female"></span>' +
        '<span class="qrt-val fnt-12 bold px-2">87,434</span>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '</div>' +
        '</div>' +
        '<a class="view-more fnt-12 bold d-block text-center bg-btn-gray py-2" onclick="handleCardCollapse.toggle(this)" resourcekey="ViewMore"></a>' +
        '</div>');
    }
  }

    if(!KPIsHTML.length)
    {
      KPIsHTML.push(UserNo_Data);
    }
    $('.control-ctx.initiative-cards-ctx.mb-5 .card-columns.pb-5').html( KPIsHTML.join('') );

    changeResources();
    SPillars_Info_Request.init();

  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Global variables
  g: {

  }
};



var SPillars_Array = [];
var SPillars_Info_Request = {
  // The main Initialization function
  init: function() {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('SPillars');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query>\
        <OrderBy><FieldRef Name=\'Title\' Ascending=\'True\' /></OrderBy></Query></View>');
    SPillars_Info_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only
    clientContext.load(SPillars_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, SPillars_Info_Request.onSuccess),
      Function.createDelegate(this, SPillars_Info_Request.onError)
    );
  },
  onSuccess: function(sender, args) {
    var collListItem = SPillars_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var SPillarsHTML = [];

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      title = oListItem.get_item('Title') || No_Data;
      code = oListItem.get_item('Code') || No_Data;
      name = oListItem.get_item('Name') || No_Data;


      SPillars_Array.push({
        name: name,
        code: code,
        title: title,
      });

      SPillarsHTML.push('<div class="col px-2 my-5">'+
        '<div class="link-item p-4  h-100" data-id="'+title+'">'+
        '<div class="text-center fnt-13 bold river-bed mb-1" style="direction:ltr !important;">' + code + '</div>' +
        '<h4 class="text-center fnt-13 river-bed">' + name + '</h4>' +
        '</div>'+
        '</div>');

      $('[data-related-strategy]').each(function(){
        var dataRelatedStrategy = $(this).attr('data-related-strategy');
        var displayed= SPillars_Array.filter(function (v) {
          return v.title === dataRelatedStrategy;
        });
        $(this).text(displayed[0].name);
      });

      // SPillars_Array.forEach(function(a,i,z)
      // {
      //   $('.card[data-id="'+a.title+'"]').find('span.badge.badge-pill').text(a.name);
      // });
      if(SPillarsHTML.length == 0)
      {
        SPillarsHTML.push(UserNo_Data);
      }
      $('.control-ctx.quick-links-ctx .row.mx-n2.mb-1').html( SPillarsHTML.join('') );
      $('.quick-links-ctx .link-item').click(function () {
        var dataid = $(this).attr("data-id");
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
