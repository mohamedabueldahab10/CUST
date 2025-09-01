
// var url = window.location.href;
// var MainCode = getURLParameter(url, 'code');

var MainStrategy_Array = [];
var ListMainStrategyHTML = [];
var listkey = window.location.href.toLowerCase().indexOf("listkey=") > -1 ? window.location.href.split('ListKey=')[1].split('&')[0] : '';
var strategyVisionItem, strategyGoalsItem, strategyMissionItem, strategyID, SpeedProgressItem, TeamItem, CustomerFocusItem, TransparencyItem, SpecialistItem, ResultsFocusItem;

var MainStrategy_Info_Request = {
  preinit: function () {

    if ($('.d-flex').length) {
      clearInterval(checkTargetStatusHtml);
      //username
      $('.user-name').text(UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join('.'));
      $('.user-name-full').text(UserN.Title);
      $('.btn-toolbar.mb-2.mb-md-0.mx-2.page-filter').append(forfilterQuery);
      SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        MainStrategy_Info_Request.init();
      });

      // $('.btnOpIndSubmit').click(function (){
      //   Operational_Indicator_Submit.init();
      // });
    }
  },
  // The main Initialization function
  init: function () {

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('GoalStrategy');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query>\
          <OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>');

    MainStrategy_Info_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only

    clientContext.load(MainStrategy_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, MainStrategy_Info_Request.onSuccess),
      Function.createDelegate(this, MainStrategy_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = MainStrategy_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var TopHTML = [];
    var StrategyHTML = [];
    var SubmitHTML = [];

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current(),
        id = oListItem.get_id(),
        strategyName = oListItem.get_item('Name') || UserNo_Data,
        staregyCode = oListItem.get_item('Title') || UserNo_Data,
        strategyVision = oListItem.get_item('Vision') || UserNo_Data,
        strategyMission = oListItem.get_item('Mission') || UserNo_Data,
        strategyGoals = oListItem.get_item('Goals') || UserNo_Data
        if (strategyName == 'استراتيجية الموارد البشرية')
        {
        if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
         strategyName='استراتيجية الموارد البشرية'
        }
        else {
          strategyName='HR strategy'
        }
      }
        console.log(strategyName,'ghuuuuuuufffff')

      //   category = oListItem.get_item("Category") || UserNo_Data,
      //   type = oListItem.get_item("Types") || UserNo_Data,
      //   relMKPI = oListItem.get_item("RelatedMainKpis") || UserNo_Data,
      //   PeriodType = oListItem.get_item("PeriodType") || UserNo_Data,
      //   ResultType = oListItem.get_item("ResultType") || UserNo_Data,
      //   Calculation = oListItem.get_item("Calculation") || UserNo_Data,
      //   Owner = oListItem.get_item('Owner') ? oListItem.get_item('Owner').get_lookupValue() :  UserNo_Data ,
      //   relIKPI = oListItem.get_item("RelatedInitiativesKPIs") || UserNo_Data,
      //   RelatedStrategyObjective = oListItem.get_item("RelatedStrategyObjective") || UserNo_Data,
      //   Sector = oListItem.get_item("Sector") || UserNo_Data,
      //   ActualQ1 = oListItem.get_item("ActualQ1") || 0,
      //   ActualQ2 = oListItem.get_item("ActualQ2") || 0,
      //   ActualQ3 = oListItem.get_item("ActualQ3") || 0,
      //   ActualQ4 = oListItem.get_item("ActualQ4") || 0,
      //   Actual = oListItem.get_item("Actual") || 0,
      //   Total = oListItem.get_item("Total") || 0,
      //   Benchmarking = oListItem.get_item("Benchmarking") || UserNo_Data,
      //   Target = oListItem.get_item("Target") || 0,
      //   TargetQ1 = oListItem.get_item("TargetQ1") || 0,
      //   TargetQ2 = oListItem.get_item("TargetQ2") || 0,
      //   TargetQ3 = oListItem.get_item("TargetQ3") || 0,
      //   TargetQ4 = oListItem.get_item("TargetQ4") || 0,
      //   Polarity = oListItem.get_item("Polarity") || UserNo_Data,
      //   Baseline = oListItem.get_item("Baseline") || UserNo_Data,
      //   MesurePriority = oListItem.get_item("MesurePriority") || UserNo_Data,
      //   Dimensions = oListItem.get_item("Dimensions") || UserNo_Data,
      //   ProjectCode = oListItem.get_item("ProjectCode") || UserNo_Data,
      //   Formula = oListItem.get_item("Formula") || UserNo_Data,
      //   CalculationMethod = oListItem.get_item("CalculationMethod") || UserNo_Data,
      //   Cumulative = ActualQ1 + ActualQ2 + ActualQ3 + ActualQ4,
      //   CumulativeUI = (ActualQ1 + ActualQ2 + ActualQ3 + ActualQ4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      //   TotalTarget = TargetQ1 + TargetQ2 + TargetQ3 + TargetQ4,
      //   TotalTargetUI = (TargetQ1 + TargetQ2 + TargetQ3 + TargetQ4).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      //   PPercentage = TotalTarget ? Math.round((Cumulative * 100) / TotalTarget): TotalTarget,
      //   PRDegree = PPercentage ? ((PPercentage > 100) ? 180 : (PPercentage <= 50 ?  Math.round(PPercentage * 180 / 50) : 180)) : 0  //formula
      //   PLDegree = PPercentage ? ((PPercentage > 100) ? 180 : (PPercentage >  50 ?  Math.round(((PPercentage-50) * 180) / 50):0)) : 0 ; //formula
      //   barColor = PPercentage  > 75 ? 'success' : (PPercentage > 45 && PPercentage < 75 ) ? 'warning' : (PPercentage > 0 && PPercentage < 45 ) ? 'danger' : '';

      // console.log(Cumulative, Target, PLDegree, PPercentage);

      MainStrategy_Array.push({
        id: oListItem.get_id(),
        strategyName: strategyName,
        staregyCode: staregyCode,
        strategyVision: strategyVision,
        strategyMission: strategyMission,
        strategyGoals: strategyGoals
        //   PeriodType: PeriodType,
        //   ResultType: ResultType,
        //   Calculation: Calculation,
        //   Owner: Owner,
        //   relIKPI: relIKPI,
        //   RelatedStrategyObjective: RelatedStrategyObjective,
        //   Sector: Sector,
        //   ActualQ1: ActualQ1,
        //   ActualQ2: ActualQ2,
        //   ActualQ3: ActualQ3,
        //   ActualQ4: ActualQ4,
        //   Actual: Actual,
        //   Total: Total,
        //   TargetQ1: TargetQ1,
        //   TargetQ2: TargetQ2,
        //   TargetQ3: TargetQ3,
        //   TargetQ4: TargetQ4,
        //   Target: Target,
        //   Benchmarking: Benchmarking,
        //   Polarity: Polarity,
        //   Baseline: Baseline,
        //   MesurePriority: MesurePriority,
        //   Dimensions: Dimensions,
        //   ProjectCode: ProjectCode,
        //   Formula: Formula,
        //   CalculationMethod: CalculationMethod,
        //   Cumulative : Cumulative,
        //   CumulativeUI : CumulativeUI,
        //   TotalTarget : TotalTarget,
        //   TotalTargetUI : TotalTargetUI,
        //   PPercentage : PPercentage,
        //   PLDegree : PLDegree,
        //   PRDegree : PRDegree,
        //   barColor : barColor
      });


      // StrategyHTML.push('<div class="col-12 col-md-6 col-lg-3 px-2 mb-3">' +
      //   '<div class="card" data-id="'+code+'" id="CardSection">' +
      //   '<div class="card-body">' +
      //   '<div class="d-flex flex-row align-items-top py-3">' +
      //   '<div class="row">' +
      //   '<div class="col col-xl-auto ">' +
      //   '<div class="progress-circle '+barColor+' progress-sm" data-value="90" style="width:48px;height:48px;">' +
      //   '<span class="progress-circle-left">' +
      //   '<span class="progress-circle-bar border-primary" style="transform: rotate(' + PLDegree + 'deg);"></span>' +
      //   '</span>' +
      //   '<span class="progress-circle-right">' +
      //   '<span class="progress-circle-bar border-primary" style="transform: rotate(' + PRDegree + 'deg);"></span>' +
      //   '</span>' +
      //   '</div>' +
      //   '<span style="text-align:top">'+PPercentage+'%</span>' +
      //   '</div>' +
      //   '<div class="flex-grow-1 mx-3">' +
      //   ' <h4 class="flex-grow-1 pt-2 light-gray" resourcekey="Strategic">' + type + '</h4>' +
      //   ' <h4 class="flex-grow-1 pt-2 light-gray bold">' + name + '</h4>' +
      //   '</div>' +
      //   ' </div>' +
      //   '</div>' +
      //   '<div class="card-body border-top">' +
      //   '<div class="d-flex flex-row align-items-center py-3 justify-content-between">' +
      //   '<div>' +
      //   '<div class="d-inline-flex black fnt-14" resourcekey="ProjectOwner"></div>' +
      //   '<div class="project-budget-value h4">' + Owner + '</div>' +
      //   '</div>' +
      //   '<div class="d-inline-flex flex-column mx-3 justify-content-end">' +
      //   '<div class="d-inline-flex black fnt-14" resourcekey="Targeted"></div>' +
      //   '<div class="d-inline-flex project-budget-value h4 justify-content-end">' + TotalTargetUI + '</div>' +
      //   ' </div>' +
      //   ' </div>' +
      //   ' </div>' +
      //   ' </div>' +
      //   ' </div>' +
      //   ' </div>'
      // );


    }
    $('#dropdownToggle').text(MainStrategy_Array[0].strategyName);
    getRelatedData(MainStrategy_Array[0].staregyCode, MainStrategy_Array[0].strategyName, '');



    for (i = 0; i < MainStrategy_Array.length; i++) {
      ListMainStrategyHTML.push('<span class="dropdown-item"  data-name ="' + MainStrategy_Array[i].strategyName + '" data-id="' + MainStrategy_Array[i].staregyCode + '" calculation-method="">' + MainStrategy_Array[i].strategyName + '</span>');
      if (i == MainStrategy_Array.length - 1) {
        if (!ListMainStrategyHTML.length) {
          ListMainStrategyHTML.push(UserNo_Data);
        }
        $('#KPIsNames').html(ListMainStrategyHTML.join(''));
      }
    }
    if (!StrategyHTML.length) {
      StrategyHTML.push(UserNo_Data);
    }

    //   $('.ctx-block').html( StrategyHTML.join('') );

    changeResources();


    var dataId = '';
    $('.dropdown-item').click(function () {
      dataId = $(this).attr("data-id");
      var dataName = $(this).attr("data-name");
      var calculationMethod = $(this).attr("calculation-method");

      $('#dropdownToggle').text(dataName);
      getRelatedData(dataId, dataName, calculationMethod);
    });

  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Global variables
  g: {

  }
};

function getRelatedData(code, name, calculationMethod) {
  var ListStrategy_Array = MainStrategy_Array.filter(function (v) {
    return v.staregyCode === code;
  });
  console.log(ListStrategy_Array, "ListStrategy_Array ListKPIs_Arrayssssssssss")

  for (var i = 0; i < ListStrategy_Array.length; i++) {
    strategyID = ListStrategy_Array[i].id || UserNo_Data
    strategyVisionItem = ListStrategy_Array[i].strategyVision || UserNo_Data
    strategyGoalsItem = ListStrategy_Array[i].strategyGoals || UserNo_Data
    strategyMissionItem = ListStrategy_Array[i].strategyMission || UserNo_Data
    if(i == ListStrategy_Array.length-1)
      MainStrategyM_Details_Request.init();
  }
}


window.checkTargetStatusHtml = setInterval(function () {
  MainStrategy_Info_Request.preinit();
}, 100);


//master Data
var MainStrategyM_Details_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Values');
    MainStrategyM_Details_Request.g.DetailsList = 'Values';
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><Where><And><Eq><FieldRef Name="MasterID" /><Value Type="Text">' + strategyID + '</Value></Eq><Eq><FieldRef Name="MasterKey" /><Value Type="Text">goalstrategy</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'True\' /></OrderBy></Query></View>');
    MainStrategyM_Details_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only
    clientContext.load(MainStrategyM_Details_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, MainStrategyM_Details_Request.onSuccess),
      Function.createDelegate(this, MainStrategyM_Details_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = MainStrategyM_Details_Request.g.collListItem;
    console.log(collListItem);
    var listItemEnum = collListItem.getEnumerator();
    var CurrList = MainStrategyM_Details_Request.g.DetailsList;
    var isItemsReturned = listItemEnum.$2J_0 > 0;//check if any items are returned we can use .getEnumerator().moveNext() //true
    var masterDetailsArr = [], name, descr;
    if (isItemsReturned)
      $('[data-target_list="' + CurrList + '"] .fieldset-container').html('');//remove html
    while (listItemEnum.moveNext()) {
      console.log('in while');
      var oListItem = listItemEnum.get_current();
      name = oListItem.get_item('Name')
      descr = oListItem.get_item('Description')
      masterDetailsArr.push({ name: name, description: descr })

    }
    var HtmlData = ''
    // '<tr>'
    masterDetailsArr.forEach((el, index) => {
      // if (index < 3) {
      if ((index % 3) == 0) {
        HtmlData += '<tr>'
      }

      HtmlData +=
        `<td>
          <div class="d-flex align-items-start">
            <img class="mx-3 strategyIcon strategygoalIcon${index + 1}" src="">
            <h2 class="mb-0 mx-3 py-1">${el.name}</h2>
          </div>
            <ul class="nav flex-column">
                <li>${el.description}</li>
            </ul>
          </td>
         `
      if ((index % 3) == 2) {
        HtmlData += '</tr>'
      }

    })


    $('.visionData').html(`<li class="visionData">${strategyVisionItem}</li>`)
    $('.goalsData').html(`<li class="goalsData">${strategyGoalsItem}</li>`)
    $('.messageData').html(`<li class="messageData">${strategyMissionItem}</li>`)

    $('.tableData').html(HtmlData)


    ViewAllFiles_Main_Strategy.init();
    changeResources();
    $('div#particles-foreground, div#particles-background, .vertical-centered-box').animate({ opacity: 0 }, {
      duration: 333,
      complete: function() {
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

//viewAllFiles
window.ViewAllFiles_Main_Strategy = {
  init: function () {
    var context = new SP.ClientContext.get_current();
    var web = context.get_web();
    var list = web.get_lists().getByTitle('Projects Documents');
    var query = SP.CamlQuery.createAllItemsQuery();
    // query.set_folderServerRelativeUrl(getfolderurl);
    var mytitle;

    mytitle = listkey

    query.set_viewXml(
      '<View Scope="RecursiveAll"> \
            <Query> \
                <Where> \
                    <Eq> \
                        <FieldRef Name="Title" /> \
                        <Value Type="Text">goalstrategy</Value> \
                    </Eq> \
                </Where> \
            </Query> \
            <RowLimit>5000</RowLimit> \
        </View>');
    ViewAllFiles_Main_Strategy.g.allItems = list.getItems(query);
    context.load(ViewAllFiles_Main_Strategy.g.allItems, 'Include(ID, Title, ContentType, File, ItemID,RelatedItemName)');
    context.executeQueryAsync(Function.createDelegate(this, ViewAllFiles_Main_Strategy.success), Function.createDelegate(this, ViewAllFiles_Main_Strategy.failed));
  },
  success: function () {
    var filesUrls = [];
    var ListEnumerator = ViewAllFiles_Main_Strategy.g.allItems.getEnumerator();
    console.log("Inside on Succedsss")

    while (ListEnumerator.moveNext()) {
      var currentFile = ListEnumerator.get_current();
      var FileID = currentFile.get_item('ItemID');
      var _contentType = currentFile.get_contentType();
      if (_contentType.get_name() != "Folder") {
        var File = currentFile.get_file();
        if (File != null && FileID == strategyID) {
          var title;
          var relatedItem  ='';
          if (currentFile.get_item('Title').indexOf('-') > -1)
            title = currentFile.get_item('Title').split('-')[1];

          relatedItem = currentFile.get_item('RelatedItemName')
          filesUrls.push({ url: File.get_serverRelativeUrl(), id: currentFile.get_item('ID'), title: title ,RelatedItemName:relatedItem});
        }
      }
    }
    console.log(filesUrls);

    if (filesUrls.length > 0) {
      filesUrls.forEach((el,i) =>{
        var imgLocation = filesUrls[i].RelatedItemName.split('_')[1]
        $(`.strategygoalIcon${imgLocation}`).attr("src", filesUrls[i].url);
      })
    }

  },
  failed: function (sender, args) {
    console.log("failed. Message:" + args.get_message());
  },
  Delete_Message: function (url, fileTodelete) {
    if (window.confirm('Are you sure you want to delete ' + fileTodelete)) {
      // They clicked Yes
      deleteFile.init(url)
    }
    else {
      // They clicked no
    }
  },
  g: {},
}
