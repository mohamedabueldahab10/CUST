
var url = window.location.href;
var MainCode = getURLParameter(url, 'code');
var KPI_Type = decodeURIComponent(getURLParameter(url, 'type'));
var MainName = decodeURIComponent(getURLParameter(url, 'name'));
var MainData = [];
var MainKPIs_Array = [];
var ListKPIsHTML = [];

var MainKPIs_Info_Request = {
  preinit: function () {

    if ($('.d-flex').length) {
      clearInterval(checkTargetStatusHtml);
      //username
      $('.user-name').text(UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join('.'));
      $('.user-name-full').text(UserN.Title);
      $('.btn-toolbar.mb-2.mb-md-0.mx-2.page-filter').append(forfilterQuery);
      SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        MainKPIs_Info_Request.init();
      });

      $('.btnOpIndSubmit').click(function (){
        Operational_Indicator_Submit.init();
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

    MainKPIs_Info_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only

    clientContext.load(MainKPIs_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, MainKPIs_Info_Request.onSuccess),
      Function.createDelegate(this, MainKPIs_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = MainKPIs_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var TopHTML=[];
    var KPIsHTML = [];
    var SubmitHTML = [];

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current(),
        id = oListItem.get_id(),
        name = oListItem.get_item('Name') || UserNo_Data,
        code = oListItem.get_item('Title') || UserNo_Data,
        category = oListItem.get_item("Category") || UserNo_Data,
        type = oListItem.get_item("Types") || UserNo_Data,
        relMKPI = oListItem.get_item("RelatedMainKpis") || UserNo_Data,
        PeriodType = oListItem.get_item("PeriodType") || UserNo_Data,
        ResultType = oListItem.get_item("ResultType") || UserNo_Data,
        Calculation = oListItem.get_item("Calculation") || UserNo_Data,
        Owner = oListItem.get_item('Owner') ? oListItem.get_item('Owner').get_lookupValue() :  UserNo_Data ,
        relIKPI = oListItem.get_item("RelatedInitiativesKPIs") || UserNo_Data,
        RelatedStrategyObjective = oListItem.get_item("RelatedStrategyObjective") || UserNo_Data,
        Sector = oListItem.get_item("Sector") || UserNo_Data,
        ActualQ1 = oListItem.get_item("ActualQ1") || 0,
        ActualQ2 = oListItem.get_item("ActualQ2") || 0,
        ActualQ3 = oListItem.get_item("ActualQ3") || 0,
        ActualQ4 = oListItem.get_item("ActualQ4") || 0,
        Actual = oListItem.get_item("Actual") || 0,
        Total = oListItem.get_item("Total") || 0,
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
        Formula = oListItem.get_item("Formula"),
        CalculationMethod = oListItem.get_item("CalculationMethod") || UserNo_Data,
        Cumulative = ActualQ1 + ActualQ2 + ActualQ3 + ActualQ4,
        CumulativeUI = (ActualQ1 + ActualQ2 + ActualQ3 + ActualQ4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        TotalTarget = TargetQ1 + TargetQ2 + TargetQ3 + TargetQ4,
        TotalTargetUI = (TargetQ1 + TargetQ2 + TargetQ3 + TargetQ4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        PPercentage = TotalTarget ? Math.round((Cumulative * 100) / TotalTarget): TotalTarget,
        PRDegree = PPercentage ? ((PPercentage > 100) ? 180 : (PPercentage <= 50 ?  Math.round(PPercentage * 180 / 50) : 180)) : 0  //formula
        PLDegree = PPercentage ? ((PPercentage > 100) ? 180 : (PPercentage >  50 ?  Math.round(((PPercentage-50) * 180) / 50):0)) : 0 ; //formula
        barColor = PPercentage  > 75 ? 'success' : (PPercentage > 45 && PPercentage < 75 ) ? 'warning' : (PPercentage > 0 && PPercentage < 45 ) ? 'danger' : '';

      console.log(Cumulative, Target, PLDegree, PPercentage);

      MainKPIs_Array.push({
        id: oListItem.get_id(),
        name: name,
        code: code,
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
        Total: Total,
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
        Formula: Formula,
        CalculationMethod: CalculationMethod,
        Cumulative : Cumulative,
        CumulativeUI : CumulativeUI,
        TotalTarget : TotalTarget,
        TotalTargetUI : TotalTargetUI,
        PPercentage : PPercentage,
        PLDegree : PLDegree,
        PRDegree : PRDegree,
        barColor : barColor
      });

      // ListKPIsHTML.push('<span class="dropdown-item"  data-name ="'+name+'" data-id="'+code+'">' + name + '</span>');
      // '<div class="top-container align-items-center justify-content-between" data-id="'+code+'">'+
      // '<div class="dropdown mx-4" id="top-dropDown">'+
      // '<a href="#" class="dropdown-toggle fnt-14 w-1 black operational-filter" data-toggle="dropdown" role="button" id="dropdownToggle" data-id="'+code+'">'+name+'</a>'+
      // '<div class="dropdown-menu" id="KPIsNames" data-id="'+code+'">'+
      // TopHTML.push(
      //   '<a class="dropdown-item" href="components-bootstrap.html">Bootstrap Components</a>'+
      //   '<a class="dropdown-item" href="components-pipeline.html">Pipeline Components</a>'
      // );

      KPIsHTML.push('<div class="col-12 col-md-6 col-lg-3 px-2 mb-3">' +
        '<div class="card" data-id="'+code+'" id="CardSection">' +
        '<div class="card-body">' +
        '<div class="d-flex flex-row align-items-top py-3">' +
        '<div class="row">' +
        '<div class="col col-xl-auto ">' +
        '<div class="progress-circle '+barColor+' progress-sm" data-value="90" style="width:48px;height:48px;">' +
        '<span class="progress-circle-left">' +
        '<span class="progress-circle-bar border-primary" style="transform: rotate(' + PLDegree + 'deg);"></span>' +
        '</span>' +
        '<span class="progress-circle-right">' +
        '<span class="progress-circle-bar border-primary" style="transform: rotate(' + PRDegree + 'deg);"></span>' +
        '</span>' +
        '</div>' +
        '<span style="text-align:top">'+PPercentage+'%</span>' +
        '</div>' +
        '<div class="flex-grow-1 mx-3">' +
        ' <h4 data-trans-strategic class="Resources flex-grow-1 pt-2 light-gray" resourcekey="Strategic">' + type + '</h4>' +
        ' <h4 class="flex-grow-1 pt-2 light-gray bold">' + name + '</h4>' +
        '</div>' +
        ' </div>' +
        '</div>' +
        '<div class="card-body border-top">' +
        '<div class="d-flex flex-row align-items-center py-3 justify-content-between">' +
        '<div>' +
        '<div data-trans-pattr37 class="Resources d-inline-flex black fnt-14" resourcekey="ProjectOwner"></div>' +
        '<div class="project-budget-value h4">' + Owner + '</div>' +
        '</div>' +
        '<div class="d-inline-flex flex-column mx-3 justify-content-end">' +
        '<div data-trans-targeted class="Resources d-inline-flex black fnt-14" resourcekey="Targeted"></div>' +
        '<div class="d-inline-flex project-budget-value h4 justify-content-end">' + TotalTargetUI + '</div>' +
        ' </div>' +
        ' </div>' +
        ' </div>' +
        ' </div>' +
        ' </div>' +
        ' </div>'
      );

      if(PeriodType === 'سنوي'){
        SubmitHTML.push('<div data-id="'+code+'" id="submitCardSection">'+
          '<div class="card-header bg-white flex-column">'+
          '<div class="mb-0 pt-3 px-2 justify-content-between">'+
          '<div class="d-flex flex-row align-items-center py-3 justify-content-between">'+
          '<div class="d-inline-flex flex-column mx-3">'+
          '<div data-trans-ownername class="Resources d-inline-flex black fnt-14 bold" resourcekey="OwnerName"></div>'+
          ' <div class="project-budget-value">'+name+'</div>'+
          '</div>'+
          '<div class="d-inline-flex flex-column mx-3 justify-content-end">'+
          '<div data-trans-baseline class="Resources d-inline-flex black fnt-14 bold" resourcekey="Baseline"> </div>'+
          '<div class="d-inline-flex project-budget-value  justify-content-end">'+Baseline+'</div>'+
          ' </div>'+
          // '<div class="d-inline-flex flex-column mx-3">'+
          // '<div class="d-inline-flex black fnt-14 bold" resourcekey="Total"></div>'+
          // '<div class="project-budget-value FValue" id="TotalValue">'+Actual+'</div>'+
          // ' </div>'+
          '<div class="d-inline-flex flex-column mx-3">'+
          '<div data-trans-frequencymeas class="Resources d-inline-flex black fnt-14 bold" resourcekey="FrequencyMeasurement"></div>'+
          ' <div class="project-budget-value ">'+ResultType+'</div>'+
          ' </div>'+
          '</div>'+
          '<div class="d-flex flex-column align-items-center py-3 justify-content-between"  id="actualValues">'+
          ' <span class="d-inline-flex black fnt-14 bold"> الرجاء تعبئة المحقق  (%) </span>'+
          ' <div class="project-budget-value FValue">'+
          ' <span class="d-inline-flex black fnt-14 bold"> المحقق </span>'+
          ' <input class="inputStyle1" data-internal="Actual" type="number" name="" value="'+Actual+'" data-period-type="'+PeriodType+'" data-result-type="'+ResultType+'" oninput="checkTypes.init(this)">'+
          '</div>'+
          '</div>'+
          '<div class="d-flex btnOpIndSubmit">'+
          '<button data-trans-send class="Resources btn btn-action btn-save" type="button" resourcekey="Send" data-id="'+id+'"></button>'+
          '</div>'+
          '</div>'+

          '</div>'+
          '</div>');
      }else{
        SubmitHTML.push('<div data-id="'+code+'" id="submitCardSection">'+
          '<div class="card-header bg-white flex-column">'+
          '<div class="mb-0 pt-3 px-2 justify-content-between">'+
          '<div class="d-flex flex-row align-items-center py-3 justify-content-between">'+
          '<div class="d-inline-flex flex-column mx-3">'+
          '<div data-trans-ownername class="Resources d-inline-flex black fnt-14 bold" resourcekey="OwnerName"></div>'+
          ' <div class="project-budget-value">'+name+'</div>'+
          '</div>'+
          '<div class="d-inline-flex flex-column mx-3 justify-content-end">'+
          '<div data-trans-baseline class="Resources d-inline-flex black fnt-14 bold" resourcekey="Baseline"> </div>'+
          '<div class="d-inline-flex project-budget-value  justify-content-end">'+Baseline+'</div>'+
          ' </div>'+
          '<div class="d-inline-flex flex-column mx-3">'+
          '<div data-trans-total class="Resources d-inline-flex black fnt-14 bold" resourcekey="Total"></div>'+
          '<div class="project-budget-value FValue" id="TotalValue">'+(ActualQ1 + ActualQ2 + ActualQ3 + ActualQ4) +'</div>'+
          ' </div>'+
          '<div class="d-inline-flex flex-column mx-3">'+
          '<div data-trans-frequencymeas class="Resources d-inline-flex black fnt-14 bold" resourcekey="FrequencyMeasurement"></div>'+
          ' <div class="project-budget-value ">'+ResultType+'</div>'+
          ' </div>'+
          '</div>'+
          '<div class="d-flex flex-row align-items-center py-3 justify-content-between">'+
          ' <span data-trans-plzfillquarter class="Resources d-inline-flex black fnt-14 bold"></span>'+
          '</div>'+
          '<div class="flex-row align-items-center py-3 justify-content-between" id="actualValues">'+
          ' <div class="d-inline-flex flex-column mx-3">'+
          '<div class="d-inline-flex black fnt-14 bold">Q1</div>'+
          ' <div class="project-budget-value FValue">'+
          ' <input class="inputStyle1" data-internal="ActualQ1" type="number" name="" data-period-type="'+PeriodType+'"  value="'+ActualQ1+'" data-result-type="'+ResultType+'" data-period-type="'+PeriodType+'" oninput="checkTypes.init(this)">'+
          '</div>'+
          ' </div>'+
          ' <div class="d-inline-flex flex-column mx-3">'+
          '<div class="d-inline-flex black fnt-14 bold">Q2</div>'+
          ' <div class="project-budget-value FValue">'+
          ' <input class="inputStyle2" data-internal="ActualQ2" type="number" name="" data-period-type="'+PeriodType+'"  value="'+ActualQ2+'" data-result-type="'+ResultType+'" data-period-type="'+PeriodType+'" oninput="checkTypes.init(this)">'+
          '</div>'+
          ' </div>'+
          ' <div class="d-inline-flex flex-column mx-3">'+
          '<div class="d-inline-flex black fnt-14 bold">Q3</div>'+
          ' <div class="project-budget-value FValue">'+
          ' <input class="inputStyle3" data-internal="ActualQ3" type="number" name="" data-period-type="'+PeriodType+'"  value="'+ActualQ3+'" data-result-type="'+ResultType+'" data-period-type="'+PeriodType+'" oninput="checkTypes.init(this)">'+
          '</div>'+
          ' </div>'+
          ' <div class="d-inline-flex flex-column mx-3">'+
          '<div class="d-inline-flex black fnt-14 bold">Q4</div>'+
          ' <div class="project-budget-value FValue">'+
          ' <input class="inputStyle4" data-internal="ActualQ4" type="number" name="" data-period-type="'+PeriodType+'"  value="'+ActualQ4+'" data-result-type="'+ResultType+'" data-period-type="'+PeriodType+'" oninput="checkTypes.init(this)">'+
          '</div>'+
          ' </div>'+
          ' </div>'+
          '<div class="d-flex btnOpIndSubmit">'+
          '<button data-trans-send class="Resources btn btn-action btn-save" type="button" resourcekey="Send" data-id="'+id+'"></button>'+
          '</div>'+
          '</div>'+

          '</div>'+
          '</div>');
      }
    }

    // if (!TopHTML.length) {
    //   TopHTML.push(UserNo_Data);
    // }
    // $('#MainKPIsList').html(TopHTML.join(''));
    var KPI_Type_Array = [];
    if(KPI_Type != 'null')
    {
      if(KPI_Type == 'رئيسي')
      {
        KPI_Type_Array = MainKPIs_Array.filter(function(v){
          return v.cat.indexOf(KPI_Type) > -1;
        });
      }
      else
      {
        KPI_Type_Array = MainKPIs_Array.filter(function(v){
          return v.type === KPI_Type;
        });
      }
    }
    else
    {
      KPI_Type_Array = MainKPIs_Array.filter(function(v){
        return v.type === 'استراتيجي' || v.cat === 'رئيسي';
      });
    }
    for( i = 0 ; i < KPI_Type_Array.length ; i++){
      ListKPIsHTML.push('<span class="dropdown-item"  data-name ="'+KPI_Type_Array[i].name+'" data-id="'+KPI_Type_Array[i].code+'" calculation-method="'+KPI_Type_Array[i].CalculationMethod+'">' + KPI_Type_Array[i].name + '</span>');
      if(i==KPI_Type_Array.length-1)
      {
        if (!ListKPIsHTML.length) {
          ListKPIsHTML.push(UserNo_Data);
        }
        $('#KPIsNames').html(ListKPIsHTML.join(''));
      }
    }
    if(!KPIsHTML.length)
    {
      KPIsHTML.push(UserNo_Data);
    }

    $('.ctx-block').html( KPIsHTML.join('') );

    if(!SubmitHTML.length)
    {
      SubmitHTML.push(UserNo_Data);
    }

    $('#accordionProject').html( SubmitHTML.join('') );


    changeResources();

    if(MainCode){
      // $('.top-container[data-id]').hide();
      $('.top-container[data-id="'+MainCode+'"]').fadeIn();
      $('.top-container[data-id="'+MainCode+'"]').addClass("d-flex");
      $('#dropdownToggle').text(MainName);

      res = MainKPIs_Array.filter(function(v){
        return v.code === MainCode;
      });

      getRelatedData(MainCode,MainName,res[0].CalculationMethod);
    }
    else{
      // $('.top-container[data-id]').hide();
      $('.top-container[data-id="'+MainKPIs_Array[0].code+'"]').fadeIn();
      $('.top-container[data-id="'+MainKPIs_Array[0].code+'"]').addClass("d-flex");
      $('#dropdownToggle').text(MainKPIs_Array[0].name);

      getRelatedData(KPI_Type_Array[0].code,KPI_Type_Array[0].name , MainKPIs_Array[0].CalculationMethod);

    }

    var dropdownToggleId = '';
    // $('.dropdown-toggle').click(function(){
    //    dropdownToggleId = $(this).attr("data-id");
    // });
    var dataId='';
    $('.dropdown-item').click(function () {
        dataId = $(this).attr("data-id");
      var dataName = $(this).attr("data-name");
      var calculationMethod = $(this).attr("calculation-method");

      $('#dropdownToggle').text(dataName);
      getRelatedData(dataId,dataName , calculationMethod);
    });

    $('#calculateData').click(function() {
      var code = dataId ? dataId : (MainCode ? MainCode : MainKPIs_Array[0].code);
      Calculate_Data_Submit.init(code);
    });

    $('div#particles-foreground, div#particles-background, .vertical-centered-box').animate({ opacity: 0 }, {
      duration: 333, complete: function () {
        $('div#particles-foreground, div#particles-background, .vertical-centered-box').remove();

      }
    });

  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Global variables
  g: {

  }
};

function getRelatedData(code, name , calculationMethod){

  var ListKPIs_Array = MainKPIs_Array.filter(function (v) {
    return calculationMethod === 'يدوي' ? v.code === code : (v.relMKPI === code && v.cat[0] === 'تشغيلي');
  });

  var KPIsHTML = [];
  for(var i =0 ; i < ListKPIs_Array.length ; i++)
  {
    KPIsHTML.push('<div class="col-12 col-md-6 col-lg-3 px-2 mb-3">' +
      '<div class="card" data-id="'+ListKPIs_Array[i].code+'" id="CardSection">' +
      '<div class="card-body">' +
      '<div class="d-flex flex-row align-items-top py-3">' +
      '<div class="row">' +
      '<div class="col col-xl-auto ">' +
      '<div class="progress-circle '+ListKPIs_Array[i].barColor+' progress-sm" data-value="90" style="width:48px;height:48px;">' +
      '<span class="progress-circle-left">' +
      '<span class="progress-circle-bar border-primary" id="leftCircle" style="transform: rotate(' + ListKPIs_Array[i].PLDegree + 'deg);"></span>' +
      '</span>' +
      '<span class="progress-circle-right">' +
      '<span class="progress-circle-bar border-primary" id="rightCircle" style="transform: rotate(' + ListKPIs_Array[i].PRDegree + 'deg);"></span>' +
      '</span>' +
      '</div>' +
      '<span style="text-align:top">'+ListKPIs_Array[i].PPercentage+'%</span>' +
      '</div>' +
      '<div class="flex-grow-1 mx-3">' +
      ' <h4 data-trans-strategic class="Resources flex-grow-1 pt-2 light-gray" resourcekey="Strategic">' + ListKPIs_Array[i].type + '</h4>' +
      ' <h4 class="flex-grow-1 pt-2 light-gray bold">' + ListKPIs_Array[i].name + '</h4>' +
      '</div>' +
      ' </div>' +
      '</div>' +
      '<div class="card-body border-top">' +
      '<div class="d-flex flex-row align-items-center py-3 justify-content-between">' +
      '<div>' +
      '<div data-trans-pattr37 class="Resources d-inline-flex black fnt-14" resourcekey="ProjectOwner"></div>' +
      '<div class="project-budget-value h4">' + ListKPIs_Array[i].Owner + '</div>' +
      '</div>' +
      '<div class="d-inline-flex flex-column mx-3 justify-content-end">' +
      '<div data-trans-targeted class="Resources d-inline-flex black fnt-14" resourcekey="Targeted"></div>' +
      '<div class="d-inline-flex project-budget-value h4 justify-content-end">' + ListKPIs_Array[i].TotalTargetUI + '</div>' +
      ' </div>' +
      ' </div>' +
      ' </div>' +
      ' </div>' +
      ' </div>' +
      ' </div>'
    );
  }

  if(!KPIsHTML.length)
  {
    KPIsHTML.push(UserNo_Data);
  }

  $('.ctx-block').html( KPIsHTML.join('') );

  open_submitSection(ListKPIs_Array.length ? ListKPIs_Array[0].code : null);


  $('.card').click(function () {
    var dataId = $(this).attr("data-id");
    open_submitSection(dataId);

  });

}

function open_submitSection(KPICode){
  var KPIsHTML = [];
  var completeDataSection = MainKPIs_Array.filter(function (v) {
    return v.code === KPICode;
  });
  if(completeDataSection.length){
    if(completeDataSection[0].PeriodType === 'سنوي'){
      KPIsHTML.push('<div>'+
        '<div class="card-header bg-white flex-column">'+
        '<div class="mb-0 pt-3 px-2 justify-content-between">'+
        '<div class="d-flex flex-row align-items-center py-3 justify-content-between">'+
        '<div class="d-inline-flex flex-column mx-3">'+
        '<div data-trans-ownername class="Resources d-inline-flex black fnt-14 bold" resourcekey="OwnerName"></div>'+
        ' <div class="project-budget-value">'+completeDataSection[0].name+'</div>'+
        '</div>'+
        '<div class="d-inline-flex flex-column mx-3 justify-content-end">'+
        '<div data-trans-baseline class="Resources d-inline-flex black fnt-14 bold" resourcekey="Baseline"> </div>'+
        '<div class="d-inline-flex project-budget-value  justify-content-end">'+completeDataSection[0].Baseline+'</div>'+
        ' </div>'+
        // '<div class="d-inline-flex flex-column mx-3">'+
        // '<div class="d-inline-flex black fnt-14 bold" resourcekey="Total"></div>'+
        // '<div class="project-budget-value FValue" id="TotalValue">'+completeDataSection[0].Total+'</div>'+
        // ' </div>'+
        '<div class="d-inline-flex flex-column mx-3">'+
        '<div data-trans-frequencymeas class="Resources d-inline-flex black fnt-14 bold" resourcekey="FrequencyMeasurement"></div>'+
        ' <div class="project-budget-value ">'+completeDataSection[0].ResultType+'</div>'+
        ' </div>'+
        '</div>'+
        '<div class="d-flex flex-column align-items-center py-3 justify-content-between"  id="actualValues">'+
        ' <span class="d-inline-flex black fnt-14 bold"> الرجاء تعبئة المحقق  (%) </span>'+
        ' <div class="project-budget-value FValue">'+
        ' <span class="d-inline-flex black fnt-14 bold"> المحقق </span>'+
        ' <input class="inputStyle1" data-internal="Actual" type="number" name="" value="'+completeDataSection[0].Actual+'" data-result-type="'+completeDataSection[0].ResultType+'" data-period-type="'+completeDataSection[0].PeriodType+'"  oninput="checkTypes.init(this)">'+
        '</div>'+
        '</div>'+
        '<div class="d-flex btnOpIndSubmit">'+
        '<button data-trans-send class="Resources btn btn-action btn-save" type="button" resourcekey="Send" data-id="'+completeDataSection[0].id+'"></button>'+
        '</div>'+
        '</div>'+

        '</div>'+
        '</div>'
      );
    }else{
      KPIsHTML.push('<div>'+
        '<div class="card-header bg-white flex-column">'+
        '<div class="mb-0 pt-3 px-2 justify-content-between">'+
        '<div class="d-flex flex-row align-items-center py-3 justify-content-between">'+
        '<div class="d-inline-flex flex-column mx-3">'+
        '<div data-trans-ownername class="Resources d-inline-flex black fnt-14 bold" resourcekey="OwnerName"></div>'+
        ' <div class="project-budget-value">'+completeDataSection[0].name+'</div>'+
        '</div>'+
        '<div class="d-inline-flex flex-column mx-3 justify-content-end">'+
        '<div data-trans-baseline class="Resources d-inline-flex black fnt-14 bold" resourcekey="Baseline"> </div>'+
        '<div class="d-inline-flex project-budget-value  justify-content-end">'+completeDataSection[0].Baseline+'</div>'+
        ' </div>'+
        '<div class="d-inline-flex flex-column mx-3">'+
        '<div data-trans-total class="Resources d-inline-flex black fnt-14 bold" resourcekey="Total"></div>'+
        '<div class="project-budget-value FValue" id="TotalValue">'+(completeDataSection[0].ActualQ1 + completeDataSection[0].ActualQ2 + completeDataSection[0].ActualQ3 + completeDataSection[0].ActualQ4)+'</div>'+
        ' </div>'+
        '<div class="d-inline-flex flex-column mx-3">'+
        '<div data-trans-frequencymeas class="Resources d-inline-flex black fnt-14 bold" resourcekey="FrequencyMeasurement"></div>'+
        ' <div class="project-budget-value ">'+completeDataSection[0].ResultType+'</div>'+
        ' </div>'+
        '</div>'+
        '<div class="d-flex flex-row align-items-center py-3 justify-content-between">'+
        ' <span data-trans-plzfillquarter class="Resources d-inline-flex black fnt-14 bold"></span>'+
        '</div>'+
        '<div class="flex-row align-items-center py-3 justify-content-between" id="actualValues">'+
        ' <div class="d-inline-flex flex-column mx-3">'+
        '<div class="d-inline-flex black fnt-14 bold">Q1</div>'+
        ' <div class="project-budget-value FValue">'+
        ' <input class="inputStyle1" data-internal="ActualQ1" type="number" name="" value="'+completeDataSection[0].ActualQ1+'" data-result-type="'+completeDataSection[0].ResultType+'" data-period-type="'+completeDataSection[0].PeriodType+'" oninput="checkTypes.init(this)">'+
        '</div>'+
        ' </div>'+
        ' <div class="d-inline-flex flex-column mx-3">'+
        '<div class="d-inline-flex black fnt-14 bold">Q2</div>'+
        ' <div class="project-budget-value FValue">'+
        ' <input class="inputStyle2" data-internal="ActualQ2" type="number" name="" value="'+completeDataSection[0].ActualQ2+'" data-result-type="'+completeDataSection[0].ResultType+'" data-period-type="'+completeDataSection[0].PeriodType+'" oninput="checkTypes.init(this)">'+
        '</div>'+
        ' </div>'+
        ' <div class="d-inline-flex flex-column mx-3">'+
        '<div class="d-inline-flex black fnt-14 bold">Q3</div>'+
        ' <div class="project-budget-value FValue">'+
        ' <input class="inputStyle3" data-internal="ActualQ3" type="number" name="" value="'+completeDataSection[0].ActualQ3+'" data-result-type="'+completeDataSection[0].ResultType+'" data-period-type="'+completeDataSection[0].PeriodType+'" oninput="checkTypes.init(this)">'+
        '</div>'+
        ' </div>'+
        ' <div class="d-inline-flex flex-column mx-3">'+
        '<div class="d-inline-flex black fnt-14 bold">Q4</div>'+
        ' <div class="project-budget-value FValue">'+
        ' <input class="inputStyle4" data-internal="ActualQ4" type="number" name="" value="'+completeDataSection[0].ActualQ4+'" data-result-type="'+completeDataSection[0].ResultType+'" data-period-type="'+completeDataSection[0].PeriodType+'" oninput="checkTypes.init(this)">'+
        '</div>'+
        ' </div>'+
        ' </div>'+
        '<div class="d-flex btnOpIndSubmit">'+
        '<button data-trans-send class="Resources btn btn-action btn-save" type="button" resourcekey="Send" data-id="'+completeDataSection[0].id+'"></button>'+
        '</div>'+
        '</div>'+

        '</div>'+
        '</div>'
      );
    }

  }

  if(!KPIsHTML.length)
  {
    KPIsHTML.push(UserNo_Data);
  }

  $('#accordionProject').html( KPIsHTML.join('') );

  if(completeDataSection.length && completeDataSection[0].ResultType === 'نسبة مئوية'){
    $( ".FValue").append("%");
  }

  $('.btn-save').click(function () {
     var dataId = $(this).attr("data-id");

    Operational_Indicator_Submit.init(dataId);
  });

  changeResources();
}



var Calculate_Data_Submit = {
  init: function(code) {

    var result =  MainKPIs_Array.filter(function(x) {
      return x.code === code
    });

    $('button.updateprogress').removeClass('loader-action-success');
    $('button.updateprogress').removeClass('loader-action-error');
    $('button.updateprogress').addClass('loader-action');

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('MainKPI');
    Calculate_Data_Submit.g.oListItem = oList.getItemById(parseInt(result[0].id));



    const regExp = /\[(.*?)\]/g;
    var formula = result[0].Formula ? result[0].Formula : '';
    var totalActualQ1 = 0 ,totalActualQ2 = 0 ,totalActualQ3 = 0,totalActualQ4 = 0  ,totalActual = 0,actual=0,
      // totalTargetQ1 = 0 ,totalTargetQ2 = 0 ,totalTargetQ3 = 0 ,totalTargetQ4 = 0 ,totalTarget = 0,target = 0,
      res , formulaA , formulaT ;


    if(formula){

      var formulaAQ1=formula,formulaAQ2=formula,formulaAQ3=formula,formulaAQ4=formula
        // ,formulaTQ1=formula,formulaTQ2=formula,formulaTQ3=formula,formulaTQ4=formula
       ;
      var spFormula = formula.split(regExp);

      if(result[0].CalculationMethod === 'مؤشرات تشغيلية'){
        var opRes = MainKPIs_Array.filter(function(v) {
          return v.relMKPI === code && v.cat[0] === 'تشغيلي'
        });
      }else if(result[0].CalculationMethod === 'مؤشرات مبادرات'){
        var opRes = MainKPIs_Array.filter(function(v) {
          return v.relIKPI === code
        });
      }

      var items = spFormula.filter((ele,i)=>{
        if(i%2!==0) {
        opRes.filter(function (v) {
          if(v.code === ele){
            if(v.PeriodType === 'سنوي' ){
              formulaA = formulaA.replace(ele , v.Actual);
              // formulaT = formulaT.replace(ele , v.target);
            }else {
              formulaAQ1 = formulaAQ1.replace(ele , v.ActualQ1);
              formulaAQ2 = formulaAQ2.replace(ele , v.ActualQ2);
              formulaAQ3 = formulaAQ3.replace(ele , v.ActualQ3);
              formulaAQ4 = formulaAQ4.replace(ele , v.ActualQ4);

              // formulaTQ1 = formulaTQ1.replace(ele , v.TargetQ1);
              // formulaTQ2 = formulaTQ2.replace(ele , v.TargetQ2);
              // formulaTQ3 = formulaTQ3.replace(ele , v.TargetQ3);
              // formulaTQ4 = formulaTQ4.replace(ele , v.TargetQ4);
            }
          }
        });
      }
    });

      actual = Math.round(eval(formulaA));
      totalActualQ1 = Math.round(eval(formulaAQ1));
      totalActualQ2 = Math.round(eval(formulaAQ2));
      totalActualQ3 = Math.round(eval(formulaAQ3));
      totalActualQ4 = Math.round(eval(formulaAQ4));

      // target = Math.round(eval(formulaT));
      // totalTargetQ1 = Math.round(eval(formulaTQ1));
      // totalTargetQ2 = Math.round(eval(formulaTQ2));
      // totalTargetQ3 = Math.round(eval(formulaTQ3));
      // totalTargetQ4 = Math.round(eval(formulaTQ4));
    }
    else{
      var MainOperational_Array = MainKPIs_Array.filter(function(v) {
        return v.relMKPI === code && v.cat[0] === 'تشغيلي'
      });

        for(j=0;j<MainOperational_Array.length ;j++){
            totalActual   += MainOperational_Array[j].Actual;
            totalActualQ1 += MainOperational_Array[j].ActualQ1;
            totalActualQ2 += MainOperational_Array[j].ActualQ2;
            totalActualQ3 += MainOperational_Array[j].ActualQ3;
            totalActualQ4 += MainOperational_Array[j].ActualQ4;
            // totalTarget   += MainOperational_Array[j].Target;
            // totalTargetQ1 += MainOperational_Array[j].TargetQ1;
            // totalTargetQ2 += MainOperational_Array[j].TargetQ2;
            // totalTargetQ3 += MainOperational_Array[j].TargetQ3;
            // totalTargetQ4 += MainOperational_Array[j].TargetQ4;

            if(result[0].Calculation === 'المجموع'){
              totalActual = totalActual;
              totalActualQ1 = totalActualQ1;
              totalActualQ2 = totalActualQ2;
              totalActualQ3 = totalActualQ3;
              totalActualQ4 = totalActualQ4;
              // totalTargetQ1 = totalTargetQ1;
              // totalTargetQ2 = totalTargetQ2;
              // totalTargetQ3 = totalTargetQ3;
              // totalTargetQ4 = totalTargetQ4;
            }else if(Main_Array[i].Calculation === 'المعدل'){
              totalActual = totalActual/MainOperational_Array.length;
              totalActualQ1 = totalActualQ1/MainOperational_Array.length;
              totalActualQ2 = totalActualQ2/MainOperational_Array.length;
              totalActualQ3 = totalActualQ3/MainOperational_Array.length;
              totalActualQ4 = totalActualQ4/MainOperational_Array.length;
              // totalTargetQ1 = totalTargetQ1/MainOperational_Array.length;
              // totalTargetQ2 = totalTargetQ2/MainOperational_Array.length;
              // totalTargetQ3 = totalTargetQ3/MainOperational_Array.length;
              // totalTargetQ4 = totalTargetQ4/MainOperational_Array.length;
            }
             actual = result[0].PeriodType==='سنوي' ? totalActual : (totalActualQ1 + totalActualQ2 + totalActualQ3 + totalActualQ4);
             // target =  totalTargetQ1 + totalTargetQ2 + totalTargetQ3 + totalTargetQ4 ;
          }
        }



    Calculate_Data_Submit.g.oListItem.set_item('Actual', actual );
    Calculate_Data_Submit.g.oListItem.set_item('ActualQ1', totalActualQ1);
    Calculate_Data_Submit.g.oListItem.set_item('ActualQ2', totalActualQ2);
    Calculate_Data_Submit.g.oListItem.set_item('ActualQ3', totalActualQ3);
    Calculate_Data_Submit.g.oListItem.set_item('ActualQ4', totalActualQ4);

    // Calculate_Data_Submit.g.oListItem.set_item('Target', target);
    // Calculate_Data_Submit.g.oListItem.set_item('TargetQ1', totalTargetQ1);
    // Calculate_Data_Submit.g.oListItem.set_item('TargetQ2', totalTargetQ2);
    // Calculate_Data_Submit.g.oListItem.set_item('TargetQ3', totalTargetQ3);
    // Calculate_Data_Submit.g.oListItem.set_item('TargetQ4', totalTargetQ4);


    Calculate_Data_Submit.g.oListItem.update();
    clientContext.load(Calculate_Data_Submit.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function() {
        $('button.updateprogress').removeClass('loader-action');
        $('button.updateprogress').addClass('loader-action-success');
        console.log('Progress Status Updated Successfully');
      }),
      Function.createDelegate(this, function(sender, args) {
        $('button.updateprogress').removeClass('loader-action');
        $('button.updateprogress').addClass('loader-action-error');
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
      })
    );
  },
  g: {}
};

window.checkTypes = {
  init:function($this){
    var total_value = 0;
    var resultType = $this.getAttribute('data-result-type') === 'نسبة مئوية';

    if(resultType){
      $this.value = ($this.value && Math.abs($this.value) >= 0) && ($this.value && Math.abs($this.value) <= 100) ? Math.abs($this.value) : null;
    }

    if($this.getAttribute('data-period-type') ==='سنوي'){
      total_value = $this.value ;
    }else{
      for(i=1 ; i<= 4 ; i++){
        var value = $('.inputStyle'+i).val();
        if(value){
          total_value += parseInt(value);
        }
      }
    }
    $( "#TotalValue").text(total_value ? total_value : 0);
    resultType ? $( "#TotalValue").append("%") : "";

  }
}

window.checkTargetStatusHtml = setInterval(function() {
  MainKPIs_Info_Request.preinit();
}, 1000);

function getURLParameter(url, name) {
  return (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1];
}

var Operational_Indicator_Submit =
  {
    init: function (itemID) {
      $('.btn-save').attr('disabled', true);

      var clientContext = new SP.ClientContext.get_current();
      var oList = clientContext.get_web().get_lists().getByTitle('MainKPI');
      Operational_Indicator_Submit.g.oListItem = oList.getItemById(parseInt(itemID));

      var totalVal = $('#TotalValue').text();
      Operational_Indicator_Submit.g.oListItem.set_item('Total', totalVal);
      Operational_Indicator_Submit.g.oListItem.set_item('Actual', totalVal);


      $('#actualValues input').each(function () {
          Operational_Indicator_Submit.g.oListItem.set_item($(this).attr('data-internal'), parseInt($(this).val()));
          console.log( $(this).attr('data-internal'), $(this).val());
        });
      Operational_Indicator_Submit.g.oListItem.update();
        clientContext.load(Operational_Indicator_Submit.g.oListItem);
      clientContext.executeQueryAsync(
        Function.createDelegate(this, function () {
          $('.btn-save').addClass("success");
        }),
        Function.createDelegate(this, function (sender, args) {
          console.log('Request failed. ' + args.get_message() + '' + args.get_stackTrace());
        })
      );
    },
    g:{}
  }
//)};
