var url = window.location.href ,MainInitiative = getURLParameter(url, 'code'),MainInitiativeName = decodeURIComponent(getURLParameter(url, 'name'));
var ListKPIsHTML = [],Initiatives_Array = [];
var instrumentCode = "" , calculationMethod = "";
var Initiatives_Info_Request = {
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
    var TopHTML=[];

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      title = oListItem.get_item('Title') || No_Data;
      name = oListItem.get_item('Name') || No_Data;
      strategicPillar = oListItem.get_item('StrategicPillar') || No_Data;
      sector = oListItem.get_item('Sector') || No_Data;
      description = oListItem.get_item('Description') || No_Data;

      Initiatives_Array.push({
        name: name,
        code: code,
        sector: sector,
        description: description,
        strategicPillar: strategicPillar,
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
        id = oListItem.get_id(),
        code = oListItem.get_item('Title') || UserNo_Data,
        category = oListItem.get_item("Category") || UserNo_Data,
        PeriodType = oListItem.get_item("PeriodType") || UserNo_Data,
        ResultType = oListItem.get_item("ResultType") || UserNo_Data,
        Calculation = oListItem.get_item("Calculation") || UserNo_Data,
        Owner = oListItem.get_item('Owner') ? oListItem.get_item('Owner').get_lookupValue() :  UserNo_Data,
        RelatedStrategyObjective = oListItem.get_item("RelatedStrategyObjective") || UserNo_Data,
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
        KPIActivationStatus = oListItem.get_item("KPIActivationStatus") || UserNo_Data,
        RelatedMainKPI = oListItem.get_item("RelatedMainKPI") || UserNo_Data,
        relIKPI = oListItem.get_item('RelatedInstrumentKPI') || UserNo_Data,
        Initiative = oListItem.get_item("Initiative") || UserNo_Data,
        Formula = oListItem.get_item("Formula"),
        CalculationMethod = oListItem.get_item("CalculationMethod") || UserNo_Data;
      Cumulative = ActualQ1 + ActualQ2 + ActualQ3 + ActualQ4,
        CumulativeUI = (ActualQ1 + ActualQ2 + ActualQ3 + ActualQ4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        TotalTarget = TargetQ1 + TargetQ2 + TargetQ3 + TargetQ4,
        TotalTargetUI = (TargetQ1 + TargetQ2 + TargetQ3 + TargetQ4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        PPercentage = TotalTarget ? Math.round((Cumulative * 100) / TotalTarget) : TotalTarget,
        PRDegree = PPercentage ? ((PPercentage > 100) ? 180 : (PPercentage <= 50 ? Math.round(PPercentage * 180 / 50) : 180)) : 0  //formula
      PLDegree = PPercentage ? ((PPercentage > 100) ? 180 : (PPercentage > 50 ? Math.round(((PPercentage - 50) * 180) / 50) : 0)) : 0; //formula
      barColor = PPercentage > 75 ? 'success' : (PPercentage > 45 && PPercentage < 75) ? 'warning' : (PPercentage > 0 && PPercentage < 45) ? 'danger' : '';


      InitiativeKPIs_Array.push({
        id: id,
        name: oListItem.get_item('Name'),
        code: code,
        category: category,
        PeriodType: PeriodType,
        ResultType: ResultType,
        Calculation: Calculation,
        Owner: Owner,
        RelatedStrategyObjective: RelatedStrategyObjective,
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
        RelatedMainKPI: RelatedMainKPI,
        relIKPI: relIKPI,
        Initiative: Initiative,
        Formula: Formula,
        CalculationMethod: CalculationMethod,
        Cumulative : Cumulative,
        CumulativeUI : CumulativeUI,
        TotalTarget : TotalTarget,
        TotalTargetUI : TotalTargetUI,
        PPercentage : PPercentage,
        PRDegree : PRDegree,
        PLDegree : PLDegree,
        barColor : barColor
      });

    }


    var filteredData = [];

    filteredData = InitiativeKPIs_Array.filter(function(res){
      return res.Initiative === MainInitiative;
    });


    KPIsHTML.push('<div class="col-12 col-md-6 col-lg-3 px-2 mb-3">' +
      '<div class="card" data-id="'+code+'" id="CardSection">' +
      '<div class="card-body">' +
      '<div class="d-flex flex-row align-items-top py-3">' +
      '<div class="row">' +
      '<div class="col col-xl-auto ">' +
      '<div class="progress-circle '+filteredData[0].barColor+' progress-sm" data-value="90" style="width:48px;height:48px;">' +
      '<span class="progress-circle-left">' +
      '<span class="progress-circle-bar border-primary" style="transform: rotate(' + filteredData[0].PLDegree + 'deg);"></span>' +
      '</span>' +
      '<span class="progress-circle-right">' +
      '<span class="progress-circle-bar border-primary" style="transform: rotate(' + filteredData[0].PRDegree + 'deg);"></span>' +
      '</span>' +
      '</div>' +
      '<span style="text-align:center">'+filteredData[0].PPercentage+'%</span>' +
      '</div>' +
      '<div class="flex-grow-1 mx-3">' +
      ' <h4 class="flex-grow-1 pt-2 light-gray">' + filteredData[0].name + '</h4>' +
      '</div>' +
      ' </div>' +
      '</div>' +
      '<div class="card-body border-top">' +
      '<div class="d-flex flex-row align-items-center py-3 justify-content-between">' +
      '<div>' +
      '<div data-trans-instrumentowner class="Resources d-inline-flex black fnt-14" resourcekey="InstrumentOwner"></div>' +
      '<div class="project-budget-value h4">' + filteredData[0].Owner + '</div>' +
      '</div>' +
      '<div class="d-inline-flex flex-column mx-3 justify-content-end">' +
      '<div data-trans-targeted class="Resources d-inline-flex black fnt-14" resourcekey="Targeted"></div>' +
      '<div class="d-inline-flex project-budget-value h4 justify-content-end">' + filteredData[0].TotalTargetUI + '</div>' +
      ' </div>' +
      ' </div>' +
      ' </div>' +
      ' </div>' +
      ' </div>' +
      ' </div>'
    );

    if(filteredData[0].CalculationMethod === 'يدوي'){

      if(!KPIsHTML.length)
      {
        KPIsHTML.push(UserNo_Data);
      }

      $('.ctx-block').html( KPIsHTML.join('') );
      Instruments_Info_Request.init(filteredData[0].CalculationMethod , filteredData[0].code);
      open_submitSection(filteredData.length ? filteredData[0].code : null , filteredData[0].CalculationMethod);

    }else{
      Instruments_Info_Request.init();
    }

  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Global variables
  g: {

  }
};



var TopHTML=[];
var Instruments_Array = [];
var Instruments_Info_Request = {
  preinit: function () {

    if ($('.d-flex').length) {
      clearInterval(checkTargetStatusHtml);
      //username
      $('.user-name').text(UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join(''));
      $('.user-name-full').text(UserN.Title);
      $('.btn-toolbar.mb-2.mb-md-0.mx-2.page-filter').append(forfilterQuery);
      SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        Initiatives_Info_Request.init();
      });

      // $('.btnOpIndSubmit').click(function (){
      //   Operational_Indicator_Submit.init();
      // });
    }
  },
  // The main Initialization function
  init: function(calMethod) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Instruments');
    var camlQuery = new SP.CamlQuery();
    calculationMethod = calMethod;

    camlQuery.set_viewXml('<View><Query>\
        <OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>');

    Instruments_Info_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only
    clientContext.load(Instruments_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Instruments_Info_Request.onSuccess),
      Function.createDelegate(this, Instruments_Info_Request.onError)
    );

  },
  onSuccess: function(sender, args) {
    var collListItem = Instruments_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      code = oListItem.get_item('Title') || No_Data;
      name = oListItem.get_item('Name') || No_Data;
      initiative = oListItem.get_item('Initiative') || No_Data;
      type = oListItem.get_item('Type') || No_Data;
      description = oListItem.get_item('Description') || No_Data;
      concernedSector = oListItem.get_item('ConcernedSector') || No_Data;

      Initiatives_Array.map(function (res) {
        if (res.code === initiative) {
          Instruments_Array.push({
            name: name,
            code: code,
            initiative: initiative,
            initiativeName: res.name,
            initiativeStrategicPillar: res.strategicPillar,
            type: type,
            concernedSector: concernedSector
          });
        }
      });
    }

    if(calculationMethod !== 'يدوي'){
      for( i=0; i< Instruments_Array.length ; i++) {

        ListKPIsHTML.push('<span class="dropdown-item"  data-name ="'+Instruments_Array[i].name+'" data-id="'+Instruments_Array[i].code+'">' + Instruments_Array[i].code+' '+Instruments_Array[i].name+ '</span>');

        if(i==Instruments_Array.length-1)
        {
          if (!ListKPIsHTML.length) {
            ListKPIsHTML.push(UserNo_Data);
          }
          $('#KPIsNames').html(ListKPIsHTML.join(''));
        }
      }

      var filteredData = [];
      if(MainInitiative){
        filteredData = Instruments_Array.filter(function(res){
          return res.initiative === MainInitiative;
        });
      }else{
        filteredData = Instruments_Array
      }

      if(filteredData.length){

        //$('.top-container[data-id]').hide();
        $('.top-container[data-id="'+filteredData[0].code+'"]').fadeIn();
        $('.top-container[data-id="'+filteredData[0].code+'"]').addClass("d-flex");
        $('#dropdownToggle').text((filteredData[0].code).concat("  ",filteredData[0].name));
        InstrumentKPIs_Info_Request.init(filteredData[0].code);
      }else{
        //$('.top-container').hide();
        $('#MainKPIsList').html('<div style="padding-bottom: 20px;">'+UserNo_Data+'</div>');
        InstrumentKPIs_Info_Request.init();
      }

      var dropdownToggleId = '';
      // $('.dropdown-toggle').click(function(){
      //   dropdownToggleId = $(this).attr("data-id");
      // });
      var dataId='';
      $('.dropdown-item').click(function () {
        dataId = $(this).attr("data-id");
        var dataName = $(this).attr("data-name");

        $('#dropdownToggle').text(dataId.concat(" ",dataName));

        $('.KPIsHTML[data-id]').hide();
        $('.KPIsHTML[data-id="'+dataId+'"]').fadeIn();

        InstrumentKPIs_Info_Request.init(dataId);
      });

      $('#calculateData').click(function() {
        var initiative = dataId ? dataId : (MainInitiative ? MainInitiative : InstrumentKPIs_Array[0].code);
        Calculate_Data_Submit.init(initiative , instrumentCode ? instrumentCode :  InstrumentKPIs_Array[0].code);
      });
    }else{

    }

  },
  onError: function(sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Global variables
  g: {

  }
};

var InstrumentKPIs_Array = [];
var InstrumentKPIs_Info_Request = {

  // The main Initialization function
  init: function ( code) {
    instrumentCode = code;

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('InstrumentKPI');
    var camlQuery = new SP.CamlQuery();

    camlQuery.set_viewXml('<View><Query>\
          <Where>\
                  <Contains>\
                      <FieldRef Name="RelatedInstrument" /> <Value Type="Text">'+instrumentCode+'</Value> \
                  </Contains>\
          </Where>\
      <OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>');

    InstrumentKPIs_Info_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only

    clientContext.load(InstrumentKPIs_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, InstrumentKPIs_Info_Request.onSuccess),
      Function.createDelegate(this, InstrumentKPIs_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = InstrumentKPIs_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var KPIsHTML = [];
    var SubmitHTML = [];
    var TopHTML = [];
    InstrumentKPIs_Array = [];

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current(),
        name = oListItem.get_item('Name') || UserNo_Data,
        code = oListItem.get_item('Title') || UserNo_Data,
        RelatedInstrument = oListItem.get_item("RelatedInstrument") || UserNo_Data,
        Owner = oListItem.get_item('Owner') ? oListItem.get_item('Owner').get_lookupValue() :  UserNo_Data,
        RelatedStrategyObjective = oListItem.get_item("RelatedStrategyObjective") || UserNo_Data,
        ConcernedSector = oListItem.get_item("ConcernedSector") || UserNo_Data,
        Baseline = oListItem.get_item("Baseline") || UserNo_Data,
        PeriodType = oListItem.get_item("PeriodType") || UserNo_Data,
        ResultType = oListItem.get_item("ResultType") || UserNo_Data,
        ActualQ1 = oListItem.get_item("ActualQ1") || 0,
        ActualQ2 = oListItem.get_item("ActualQ2") || 0,
        ActualQ3 = oListItem.get_item("ActualQ3") || 0,
        ActualQ4 = oListItem.get_item("ActualQ4") || 0,
        Target= oListItem.get_item("Target") || 0,
        TargetQ1= oListItem.get_item("TargetQ1") || 0,
        TargetQ2= oListItem.get_item("TargetQ2") || 0,
        TargetQ3= oListItem.get_item("TargetQ3") || 0,
        TargetQ4= oListItem.get_item("TargetQ4") || 0,
        Actual = oListItem.get_item("Actual") || 0,
        Total = oListItem.get_item("Total") || 0,
        Polarity = oListItem.get_item("Polarity") || UserNo_Data,
        Initiative = oListItem.get_item("Initiative") || UserNo_Data,
        Dimensions = oListItem.get_item("Dimensions") || UserNo_Data,
        Cumulative = ActualQ1 + ActualQ2 + ActualQ3 + ActualQ4,
        CumulativeUI = (ActualQ1 + ActualQ2 + ActualQ3 + ActualQ4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        TotalTarget = TargetQ1 + TargetQ2 + TargetQ3 + TargetQ4,
        TotalTargetUI = (TargetQ1 + TargetQ2 + TargetQ3 + TargetQ4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        PPercentage = TotalTarget ? Math.round((Cumulative * 100) / TotalTarget): TotalTarget,
        PRDegree = PPercentage ? ((PPercentage > 100) ? 180 : (PPercentage <= 50 ?  Math.round(PPercentage * 180 / 50) : 180)) : 0  //formula
        PLDegree = PPercentage ? ((PPercentage > 100) ? 180 : (PPercentage >  50 ?  Math.round(((PPercentage-50) * 180) / 50):0)) : 0 ; //formula
        barColor = PPercentage  > 75 ? 'success' : (PPercentage > 45 && PPercentage < 75 ) ? 'warning' : (PPercentage > 0 && PPercentage < 45) ? 'danger' : '';

      console.log(Cumulative, Target, PLDegree, PPercentage);

      InstrumentKPIs_Array.push({
        id : oListItem.get_id(),
        name : name,
        code : code,
        RelatedInstrument : RelatedInstrument,
        Owner : Owner,
        RelatedStrategyObjective : RelatedStrategyObjective,
        ConcernedSector : ConcernedSector ,
        Baseline : Baseline,
        PeriodType: PeriodType,
        ResultType: ResultType,
        ActualQ1 : ActualQ1,
        ActualQ2 : ActualQ2,
        ActualQ3 : ActualQ3,
        ActualQ4 : ActualQ4,
        Actual : Actual,
        Total : oListItem.get_item("Total") || 0,
        Target : Target ,
        TargetQ1 : TargetQ1 ,
        TargetQ2 : TargetQ2 ,
        TargetQ3 : TargetQ3 ,
        TargetQ4 : TargetQ4 ,
        Polarity : Polarity ,
        Initiative : Initiative,
        Dimensions : Dimensions,
        Cumulative : Cumulative,
        CumulativeUI : CumulativeUI,
        TotalTarget : TotalTarget,
        TotalTargetUI : TotalTargetUI,
        PPercentage : PPercentage,
        PRDegree : PRDegree,
        PLDegree : PLDegree,
        barColor : barColor
      });

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
        '<span style="text-align:center">'+PPercentage+'%</span>' +
        '</div>' +
        '<div class="flex-grow-1 mx-3">' +
        ' <h4 class="flex-grow-1 pt-2 light-gray">' + name + '</h4>' +
        '</div>' +
        ' </div>' +
        '</div>' +
        '<div class="card-body border-top">' +
        '<div class="d-flex flex-row align-items-center py-3 justify-content-between">' +
        '<div>' +
        '<div data-trans-instrumentowner class="Resources d-inline-flex black fnt-14" resourcekey="InstrumentOwner"></div>' +
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
    }

    Instruments_Array.filter(function(x){
      if(x.code === instrumentCode){
        TopHTML.push('<span class="px-1 bold "> '+x.initiative+'</span><span class="px-1 bold "> '+x.initiativeName+'</span>')
        $('#InitiativeRelatedInfo').html( TopHTML.join('') );
      }
    });

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

    open_submitSection(InstrumentKPIs_Array.length ? InstrumentKPIs_Array[0].code : null);


    $('.ctx-block div.card').click(function () {

      var dataId = $(this).attr("data-id");
      open_submitSection(dataId);
    });
  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Global variables
  g: {

  }
};



var Calculate_Data_Submit = {
  init: function(initiative , instrumentCode) {

    var result =  InitiativeKPIs_Array.filter(function(x) {
      return x.Initiative === initiative
    });

    $('button.updateprogress').removeClass('loader-action-success');
    $('button.updateprogress').removeClass('loader-action-error');
    $('button.updateprogress').addClass('loader-action');

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('InitiativeKPI');
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

      if(result[0].CalculationMethod === 'عبر البرنامج'){
        var instRes = InstrumentKPIs_Array.filter(function(v) {
          return v.code === instrumentCode
        });
      }

      var items = spFormula.filter((ele,i)=>{
        if(i%2!==0) {
        instRes.filter(function (v) {
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
      var instrument_Array = InstrumentKPIs_Array.filter(function(v) {
        return v.RelatedInstrument === instrumentCode;
      });

      for(j=0;j<instrument_Array.length ;j++){
        totalActual   += instrument_Array[j].Actual;
        totalActualQ1 += instrument_Array[j].ActualQ1;
        totalActualQ2 += instrument_Array[j].ActualQ2;
        totalActualQ3 += instrument_Array[j].ActualQ3;
        totalActualQ4 += instrument_Array[j].ActualQ4;
        // totalTarget   += instrument_Array[j].Target;
        // totalTargetQ1 += instrument_Array[j].TargetQ1;
        // totalTargetQ2 += instrument_Array[j].TargetQ2;
        // totalTargetQ3 += instrument_Array[j].TargetQ3;
        // totalTargetQ4 += instrument_Array[j].TargetQ4;

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
          totalActual = totalActual/instrument_Array.length;
          totalActualQ1 = totalActualQ1/instrument_Array.length;
          totalActualQ2 = totalActualQ2/instrument_Array.length;
          totalActualQ3 = totalActualQ3/instrument_Array.length;
          totalActualQ4 = totalActualQ4/instrument_Array.length;
          // totalTargetQ1 = totalTargetQ1/instrument_Array.length;
          // totalTargetQ2 = totalTargetQ2/instrument_Array.length;
          // totalTargetQ3 = totalTargetQ3/instrument_Array.length;
          // totalTargetQ4 = totalTargetQ4/instrument_Array.length;
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

function open_submitSection(KPICode , calcMethod){
  var KPIsHTML = [];

  var completeDataSection = calcMethod === 'يدوي' ? InitiativeKPIs_Array.filter(function (v) {
    return  v.code === KPICode;
  }) : InstrumentKPIs_Array.filter(function (v) {
    return  v.code === KPICode;
  });

  if(completeDataSection.length){
    if(completeDataSection[0].PeriodType === 'سنوي') {
      KPIsHTML.push('<div>' +
        '<div class="card-header bg-white flex-column">' +
        '<div class="mb-0 pt-3 px-2 justify-content-between">' +
        '<div class="d-flex flex-row align-items-center py-3 justify-content-between">' +
        '<div class="d-inline-flex flex-column mx-3">' +
        '<div data-trans-ownername class="Resources d-inline-flex black fnt-14 bold" resourcekey="OwnerName"></div>' +
        ' <div class="project-budget-value">' + completeDataSection[0].name + '</div>' +
        '</div>' +
        '<div class="d-inline-flex flex-column mx-3 justify-content-end">' +
        '<div data-trans-baseline class="Resources d-inline-flex black fnt-14 bold" resourcekey="Baseline"> </div>' +
        '<div class="d-inline-flex project-budget-value  justify-content-end">' + completeDataSection[0].Baseline + '</div>' +
        ' </div>' +
        '<div class="d-inline-flex flex-column mx-3">' +
        '<div data-trans-frequencymeas class="Resources d-inline-flex black fnt-14 bold" resourcekey="FrequencyMeasurement"></div>' +
        ' <div class="project-budget-value ">'+completeDataSection[0].ResultType+'</div>' +
        ' </div>' +
        '</div>' +
        '<div class="d-flex flex-row align-items-center py-3 justify-content-between">' +
        ' <span class="d-inline-flex black fnt-14 bold"> الرجاء تعبئة المحقق أدناه (%) </span>' +
        '</div>' +
        '<div class="flex-row align-items-center py-3 justify-content-between" id="actualValues">' +
        ' <div class="d-inline-flex flex-column mx-3">' +
        '<div class="d-inline-flex black fnt-14 bold">محقق</div>' +
        ' <div class="project-budget-value FValue">' +
        ' <input class="inputStyle1" data-internal="Actual" type="number" name="" value="'+completeDataSection[0].Actual+'" data-period-type="'+completeDataSection[0].PeriodType+'" data-result-type="'+completeDataSection[0].ResultType+'" oninput="checkTypes.init(this)">'+
        '</div>' +
        ' </div>' +
        ' </div>' +
        '</div>' +
        '<div class="d-flex btnOpIndSubmit">' +
        '<button data-trans-send class="Resources btn btn-action btn-save" type="button" resourcekey="Send" data-id="' + completeDataSection[0].id + '"></button>' +
        '</div>' +
        '</div>' +
        '</div>'
      );
    }else{
      KPIsHTML.push('<div>' +
        '<div class="card-header bg-white flex-column">' +
        '<div class="mb-0 pt-3 px-2 justify-content-between">' +
        '<div class="d-flex flex-row align-items-center py-3 justify-content-between">' +
        '<div class="d-inline-flex flex-column mx-3">' +
        '<div data-trans-ownername class="Resources d-inline-flex black fnt-14 bold" resourcekey="OwnerName"></div>' +
        ' <div class="project-budget-value">' + completeDataSection[0].name + '</div>' +
        '</div>' +
        '<div class="d-inline-flex flex-column mx-3 justify-content-end">' +
        '<div data-trans-baseline class="Resources d-inline-flex black fnt-14 bold" resourcekey="Baseline"> </div>' +
        '<div class="d-inline-flex project-budget-value  justify-content-end">' + completeDataSection[0].Baseline + '</div>' +
        ' </div>' +
        '<div class="d-inline-flex flex-column mx-3">' +
        '<div data-trans-total class="Resources d-inline-flex black fnt-14 bold" resourcekey="Total"></div>' +
        ' <div class="project-budget-value FValue" id="TotalValue">'+(completeDataSection[0].ActualQ1 + completeDataSection[0].ActualQ2 + completeDataSection[0].ActualQ3 +completeDataSection[0].ActualQ4) +'</div>'+
        ' </div>' +
        '<div class="d-inline-flex flex-column mx-3">' +
        '<div data-trans-frequencymeas class="Resources d-inline-flex black fnt-14 bold" resourcekey="FrequencyMeasurement"></div>' +
        ' <div class="project-budget-value ">'+completeDataSection[0].ResultType+'</div>' +
        ' </div>' +
        '</div>' +
        '<div class="d-flex flex-row align-items-center py-3 justify-content-between">' +
        ' <span data-trans-plzfillquarter class="Resources d-inline-flex black fnt-14 bold"></span>' +
        '</div>' +
        '<div class="flex-row align-items-center py-3 justify-content-between" id="actualValues">' +
        ' <div class="d-inline-flex flex-column mx-3">' +
        '<div class="d-inline-flex black fnt-14 bold">Q1</div>' +
        ' <div class="project-budget-value FValue">' +
        ' <input class="inputStyle1" data-internal="ActualQ1" type="number" name="" data-period-type="'+completeDataSection[0].PeriodType+'"  value="'+completeDataSection[0].ActualQ1+'" data-result-type="'+completeDataSection[0].ResultType+'" oninput="checkTypes.init(this)">'+
        '</div>' +
        ' </div>' +
        ' <div class="d-inline-flex flex-column mx-3">' +
        '<div class="d-inline-flex black fnt-14 bold">Q2</div>' +
        ' <div class="project-budget-value FValue">' +
        ' <input class="inputStyle2" data-internal="ActualQ2" type="number" name="" data-period-type="'+completeDataSection[0].PeriodType+'"  value="'+completeDataSection[0].ActualQ2+'" data-result-type="'+completeDataSection[0].ResultType+'" oninput="checkTypes.init(this)">'+
        '</div>' +
        ' </div>' +
        ' <div class="d-inline-flex flex-column mx-3">' +
        '<div class="d-inline-flex black fnt-14 bold">Q3</div>' +
        ' <div class="project-budget-value FValue">' +
        ' <input class="inputStyle3" data-internal="ActualQ3" type="number" name="" data-period-type="'+completeDataSection[0].PeriodType+'"  value="'+completeDataSection[0].ActualQ3+'" data-result-type="'+completeDataSection[0].ResultType+'" oninput="checkTypes.init(this)">'+
        '</div>' +
        ' </div>' +
        ' <div class="d-inline-flex flex-column mx-3">' +
        '<div class="d-inline-flex black fnt-14 bold">Q4</div>' +
        ' <div class="project-budget-value FValue">' +
        ' <input class="inputStyle4" data-internal="ActualQ4" type="number" name="" data-period-type="'+completeDataSection[0].PeriodType+'"  value="'+completeDataSection[0].ActualQ4+'" data-result-type="'+completeDataSection[0].ResultType+'" oninput="checkTypes.init(this)">'+
        '</div>' +
        ' </div>' +
        ' </div>' +
        '</div>' +
        '<div class="d-flex btnOpIndSubmit">' +
        '<button data-trans-send class="Resources btn btn-action btn-save" type="button" resourcekey="Send" data-id="' + completeDataSection[0].id + '"></button>' +
        '</div>' +
        '</div>' +
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

    Kpi_Submit.init(dataId , calcMethod);
  });

  changeResources();
}

window.checkTargetStatusHtml = setInterval(function() {
  Instruments_Info_Request.preinit();
}, 1000);

function getURLParameter(url, name) {
  return (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1];
}

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


var Kpi_Submit =
  {
    init: function (itemID , calcMethod) {

      $('.btn-save').attr('disabled', true);

      var clientContext = new SP.ClientContext.get_current();
      var oList = calcMethod === 'يدوي' ? clientContext.get_web().get_lists().getByTitle('InitiativeKPI') : clientContext.get_web().get_lists().getByTitle('InstrumentKPI');

      Kpi_Submit.g.oListItem = oList.getItemById(parseInt(itemID));

      var totalVal = $('#TotalValue').text().replace('%','');
      Kpi_Submit.g.oListItem.set_item('Total', totalVal);

      $('#actualValues input').each(function () {
        Kpi_Submit.g.oListItem.set_item($(this).attr('data-internal'), parseInt($(this).val()));
        console.log( $(this).attr('data-internal'), $(this).val());
      });

      Kpi_Submit.g.oListItem.update();
      clientContext.load(Kpi_Submit.g.oListItem);
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
