var currentYear = new Date().getFullYear();
var emptyData = require('../../../HelperRessources/img/empty-data.png');
// var emptyData = ''
var Operational_Array = [],
  Instrument_Array = [],
  PQueryFilteration = "",
  filteredValue = "year", // to get the data of year for first render
  indexType = '',
  kpiYear = currentYear.toString(),
  isBothLists = false,
  category = "",
  countRec = 0;
var SectorFilterArr = [], DepartmentFilterArr = [], PortfolioFilterArr = [], RelatedGoalFilterArr = [], GoalFilterNameArr = [];
//get operational KPIS from MainKPIs list
var Where_Body = "",
  Query_Body = "";


var RolePQuery = '', Role_Where_Body = "", Role_Query_Body = "";


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
        // Build_My_Filter.init();
        Get_All_Dynamic_Filter.init()
        // MainKPIs_Info_Request.init();
      });
      $(".btnTargetSubmit").click(function () {
        Target_Details_Submit.init();
      });
    }
  },
  // The main Initialization function
  init: function (Where_Body) {
    $(".btn-save").attr("disabled", false);

    var clientContext = new SP.ClientContext.get_current();
    // var oList = clientContext.get_web().get_lists().getByTitle("MainKpi"); //list name
    var oList = clientContext.get_web().get_lists().getByTitle("KPIResults"); //list name
    var camlQuery = new SP.CamlQuery(); //set query to return data
    console.log('mmmmmmmm')

    debugger
    if (Where_Body) {


      camlQuery.set_viewXml(
        `<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq>` +
        Where_Body +
        `</And></Where><OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query></View>`
      );

      var x = `<View><Query><Where>` +
        Where_Body +
        `</Where><OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query></View>`

    } else {
      debugger
      if (isRoleDataLevelAccess) {

        camlQuery.set_viewXml(RolePQuery)
        // isRoleDataLevelAccess = false; 
      }
      else if (filteredValue == "year" || filteredValue === "quarter" || filteredValue == "midterm" || filteredValue == 'monthly') {
        if (isGeneralManager || isDU || isMinisterAssistant || isViceMinister || isSectorHead || isSubSectorHead) {
          camlQuery.set_viewXml('<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And><Eq><FieldRef Name=\'PeriodType\' /> <Value Type="Choice">' + filteredValue + "</Value></Eq><And><Eq><FieldRef Name=\'Year\' /> <Value Type=\'Text\'>" + kpiYear + "</Value ></Eq><Eq><FieldRef Name=\'" + SecondLevel_FirstLevel_Field + "\' /> <Value Type=\'Text\'>" + UserAccessSectorCode + "</Value ></Eq></And></And></And></Where ><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query ></View >")
        }

        // if (indexType == 'main' || indexType == 'sub') {
        //   camlQuery.set_viewXml(
        //     '<View><Query><Where><And><Eq><FieldRef Name=\'Types\' /><Value Type="Choice">' + indexType + '</Value></Eq><And><Eq><FieldRef Name=\'PeriodType\' /> <Value Type="Choice">' + filteredValue + "</Value></Eq><Eq><FieldRef Name=\'Year\' /> <Value Type=\'Text\'>" + kpiYear + "</Value ></Eq></And></And></Where ><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query ></View >");
        // } else {
        // <Neq><FieldRef Name=\'DeletionStatus\' /><Value Type="Text">Deleted</Value></Neq>
        else {
          camlQuery.set_viewXml(
            '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And><Eq><FieldRef Name=\'PeriodType\' /> <Value Type="Choice">' + filteredValue + "</Value></Eq><Eq><FieldRef Name=\'Year\' /> <Value Type=\'Text\'>" + kpiYear + "</Value ></Eq></And></And></Where ><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query ></View >");
        }
      } else {
        camlQuery.set_viewXml(
          "<View><Query>\
          			<OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>"
        );
      }
    }
    MainKPIs_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(MainKPIs_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, MainKPIs_Info_Request.onSuccess),
      Function.createDelegate(this, MainKPIs_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {

    var collListItem = MainKPIs_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator(),
      HEAD_HTML = [];
    BODY_HTML = [];

    if (filteredValue == 'year') {
      HEAD_HTML.push(
        '<thead class="targetThead">' +
        "<div>" +
        "<tr>" +
        '<th scope="col" data-trans-kpi class="Resources">المؤشر </th>' +
        '<th scope="col"></th>' +
        '<th scope="col" data-trans-total class="Resources">الإجمالي</th>' +
        '<th scope="col" data-trans-yearly Class="Resources">سنوي</th>' +
        "</tr>" +
        "</div>" +
        "<thead>"
      );
    } else if (filteredValue == 'quarter') {
      HEAD_HTML.push(
        '<thead class="targetThead">' +
        "<div>" +
        "<tr>" +
        '<th scope="col" data-trans-kpi class="Resources">المؤشر </th>' +
        '<th scope="col"></th>' +
        '<th scope="col" data-trans-total class="Resources">الإجمالي</th>' +
        '<th scope="col" data-trans-quart1 Class="Resources">الربع 1</th>' +
        '<th scope="col" data-trans-quart2 Class="Resources">الربع 2</th>' +
        '<th scope="col" data-trans-quart3 Class="Resources">الربع 3</th>' +
        '<th scope="col" data-trans-quart4 Class="Resources">الربع 4</th>' +
        "</tr>" +
        "</div>" +
        "<thead>"
      );
    } else if (filteredValue == 'midterm') {
      HEAD_HTML.push(
        '<thead class="targetThead">' +
        "<div>" +
        "<tr>" +
        '<th scope="col" data-trans-kpi class="Resources">المؤشر </th>' +
        '<th scope="col"></th>' +
        '<th scope="col" data-trans-total class="Resources">الإجمالي</th>' +
        '<th scope="col" data-trans-midterm1 Class="Resources">النصف 1</th>' +
        '<th scope="col" data-trans-midterm2 Class="Resources">النصف 2</th>' +
        "</tr>" +
        "</div>" +
        "<thead>"
      );
    } else if (filteredValue == 'monthly') {
      HEAD_HTML.push(
        '<thead class="targetThead">' +
        "<div>" +
        "<tr>" +
        '<th scope="col" data-trans-kpi class="Resources">المؤشر </th>' +
        '<th scope="col"></th>' +
        '<th scope="col" data-trans-total class="Resources">الإجمالي</th>' +
        '<th scope="col" data-trans-month1 Class="Resources">يناير</th>' +
        '<th scope="col" data-trans-month2 Class="Resources">فبراير</th>' +
        '<th scope="col" data-trans-month3 Class="Resources">الربع الأول</th>' +
        '<th scope="col" data-trans-month4 Class="Resources">ابريل</th>' +
        '<th scope="col" data-trans-month5 Class="Resources">مايو</th>' +
        '<th scope="col" data-trans-month6 Class="Resources">الربع الثاني</th>' +
        '<th scope="col" data-trans-month7 Class="Resources">يوليو</th>' +
        '<th scope="col" data-trans-month8 Class="Resources">اغسطس</th>' +
        '<th scope="col" data-trans-month9 Class="Resources">الربع الثالث</th>' +
        '<th scope="col" data-trans-month10 Class="Resources">اكتوبر</th>' +
        '<th scope="col" data-trans-month11 Class="Resources">نوفمبر</th>' +
        '<th scope="col" data-trans-month12 Class="Resources">الربع الرابع</th>' +
        "</tr>" +
        "</div>" +
        "<thead>"
      );
    }
    debugger

    while (listItemEnum.moveNext()) {
      console.log("INSIDE WHILE")
      //loop through items, handle/get data/fields
      var oListItem = listItemEnum.get_current();
      var performanceleader = oListItem.get_item("PerformanceLeader")
        ? oListItem.get_item("PerformanceLeader").get_lookupValue()
        : UserN.Title;

      var performanceleader1 = oListItem.get_item("PerformanceLeader")
        ? oListItem.get_item("PerformanceLeader").get_lookupValue()
        : ''

      var performanceleader2 = oListItem.get_item("PerformanceLeader2")
        ? oListItem.get_item("PerformanceLeader2").get_lookupValue()
        : ''
      // : UserN.Title;

      var SubectorCode = oListItem.get_item("SubSector") ? oListItem.get_item("SubSector") : '';
      var SectorCode = oListItem.get_item("Sector") ? oListItem.get_item("Sector") : '';
      //
      debugger
      if (
        (!isAdmin && !isMinister && !isBITeam && !isSectorHead && !isViceMinister && !isVROP && !isSPMAdmin &&!isSPMTeam && !isLMSP && !isPerformanceLeader && !isMinisterAssistant && !isDU && !isGeneralManager && !isSubSectorHead && (performanceleader == UserN.Title))
        || isAdmin
        || isSPMAdmin
        || isSPMTeam
        || isVROP
        || isLMSP
        || (isPerformanceLeader && (performanceleader1 == UserN.Title || performanceleader2 == UserN.Title))
        || isMinister
        || isBITeam
        || ((isGeneralManager || isSubSectorHead) && (SubectorCode == UserAccessSectorCode))
        || ((isDU || isMinisterAssistant || isViceMinister || isSectorHead) && (SectorCode == UserAccessSectorCode))) {
        countRec = countRec + 1;
        //sample getting field data  : oListItem.get_item('InternalName')
        var name = oListItem.get_item("Name") || UserNo_Data;
        console.log(name, "name name name")

        var category = oListItem.get_item("Category") || UserNo_Data;
        var relatedInstrument =
          oListItem.get_item("RelatedInstrument") || UserNo_Data;
        var target = (oListItem.get_item("Target") ? Number(oListItem.get_item("Target").toFixed(2)) : 0);
        var targetQ1 = (oListItem.get_item("TargetQ1") ? Number(oListItem.get_item("TargetQ1").toFixed(2)) : 0);
        var targetQ2 = (oListItem.get_item("TargetQ2") ? Number(oListItem.get_item("TargetQ2").toFixed(2)) : 0);
        var targetQ3 = (oListItem.get_item("TargetQ3") ? Number(oListItem.get_item("TargetQ3").toFixed(2)) : 0);
        var targetQ4 = (oListItem.get_item("TargetQ4") ? Number(oListItem.get_item("TargetQ4").toFixed(2)) : 0);
        //////
        var targetY = (oListItem.get_item("TargetY") ? Number(oListItem.get_item("TargetY").toFixed(2)) : 0);
        var targetMid1 = (oListItem.get_item("TargetMid1") ? Number(oListItem.get_item("TargetMid1").toFixed(2)) : 0);
        var targetMid2 = (oListItem.get_item("TargetMid2") ? Number(oListItem.get_item("TargetMid2").toFixed(2)) : 0);
        var targetM1 = (oListItem.get_item("TargetM1") ? Number(oListItem.get_item("TargetM1").toFixed(2)) : 0);
        var targetM2 = (oListItem.get_item("TargetM2") ? Number(oListItem.get_item("TargetM2").toFixed(2)) : 0);
        var targetM3 = (oListItem.get_item("TargetM3") ? Number(oListItem.get_item("TargetM3").toFixed(2)) : 0);
        var targetM4 = (oListItem.get_item("TargetM4") ? Number(oListItem.get_item("TargetM4").toFixed(2)) : 0);
        var targetM5 = (oListItem.get_item("TargetM5") ? Number(oListItem.get_item("TargetM5").toFixed(2)) : 0);
        var targetM6 = (oListItem.get_item("TargetM6") ? Number(oListItem.get_item("TargetM6").toFixed(2)) : 0);
        var targetM7 = (oListItem.get_item("TargetM7") ? Number(oListItem.get_item("TargetM7").toFixed(2)) : 0);
        var targetM8 = (oListItem.get_item("TargetM8") ? Number(oListItem.get_item("TargetM8").toFixed(2)) : 0);
        var targetM9 = (oListItem.get_item("TargetM9") ? Number(oListItem.get_item("TargetM9").toFixed(2)) : 0);
        var targetM10 = (oListItem.get_item("TargetM10") ? Number(oListItem.get_item("TargetM10").toFixed(2)) : 0);
        var targetM11 = (oListItem.get_item("TargetM11") ? Number(oListItem.get_item("TargetM11").toFixed(2)) : 0);
        var targetM12 = (oListItem.get_item("TargetM12") ? Number(oListItem.get_item("TargetM12").toFixed(2)) : 0);
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var actual = (oListItem.get_item("Actual") ? Number(oListItem.get_item("Actual").toFixed(2)) : 0);
        var actualQ1 = (oListItem.get_item("ActualQ1") ? Number(oListItem.get_item("ActualQ1").toFixed(2)) : 0);
        var actualQ2 = (oListItem.get_item("ActualQ2") ? Number(oListItem.get_item("ActualQ2").toFixed(2)) : 0);
        var actualQ3 = (oListItem.get_item("ActualQ3") ? Number(oListItem.get_item("ActualQ3").toFixed(2)) : 0);
        var actualQ4 = (oListItem.get_item("ActualQ4") ? Number(oListItem.get_item("ActualQ4").toFixed(2)) : 0);
        //////
        var actualY = (oListItem.get_item("ActualY") ? Number(oListItem.get_item("ActualY").toFixed(2)) : 0);
        var actualMid1 = (oListItem.get_item("ActualMid1") ? Number(oListItem.get_item("ActualMid1").toFixed(2)) : 0);
        var actualMid2 = (oListItem.get_item("ActualMid2") ? Number(oListItem.get_item("ActualMid2").toFixed(2)) : 0);
        var actualM1 = (oListItem.get_item("ActualM1") ? Number(oListItem.get_item("ActualM1").toFixed(2)) : 0);
        var actualM2 = (oListItem.get_item("ActualM2") ? Number(oListItem.get_item("ActualM2").toFixed(2)) : 0);
        var actualM3 = (oListItem.get_item("ActualM3") ? Number(oListItem.get_item("ActualM3").toFixed(2)) : 0);
        var actualM4 = (oListItem.get_item("ActualM4") ? Number(oListItem.get_item("ActualM4").toFixed(2)) : 0);
        var actualM5 = (oListItem.get_item("ActualM5") ? Number(oListItem.get_item("ActualM5").toFixed(2)) : 0);
        var actualM6 = (oListItem.get_item("ActualM6") ? Number(oListItem.get_item("ActualM6").toFixed(2)) : 0);
        var actualM7 = (oListItem.get_item("ActualM7") ? Number(oListItem.get_item("ActualM7").toFixed(2)) : 0);
        var actualM8 = (oListItem.get_item("ActualM8") ? Number(oListItem.get_item("ActualM8").toFixed(2)) : 0);
        var actualM9 = (oListItem.get_item("ActualM9") ? Number(oListItem.get_item("ActualM9").toFixed(2)) : 0);
        var actualM10 = (oListItem.get_item("ActualM10") ? Number(oListItem.get_item("ActualM10").toFixed(2)) : 0);
        var actualM11 = (oListItem.get_item("ActualM11") ? Number(oListItem.get_item("ActualM11").toFixed(2)) : 0);
        var actualM12 = (oListItem.get_item("ActualM12") ? Number(oListItem.get_item("ActualM12").toFixed(2)) : 0);
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var performanceleader = oListItem.get_item("PerformanceLeader")
          ? oListItem.get_item("PerformanceLeader").get_lookupValue()
          : UserN.Title;
        var dataAvailability =
          oListItem.get_item("DataAvailability") || UserNo_Data;
        var dataSource = oListItem.get_item("DataSource") || UserNo_Data;
        var periodType = oListItem.get_item("PeriodType") || UserNo_Data;
        var resultType = oListItem.get_item("ResultType") || null;
        var calculationMethod =
          oListItem.get_item("CalculationMethod") || UserNo_Data;

        var total = 0
        var totalActual = 0
        if (filteredValue == 'year') {
          total = targetY || 0
          totalActual = actualY || 0
        } else if (filteredValue == 'quarter') {
          total = targetQ1 + targetQ2 + targetQ3 + targetQ4 || 0;
          totalActual = actualQ1 + actualQ2 + actualQ3 + actualQ4 || 0;
        } else if (filteredValue == 'midterm') {
          total = targetMid1 + targetMid2 || 0
          totalActual = actualMid1 + actualMid2 || 0
        } else if (filteredValue == 'monthly') {
          total = targetM1 + targetM2 + targetM3 + targetM4 + targetM5 + targetM6 + targetM7 + targetM8 + targetM9 + targetM10 + targetM11 + targetM12 || 0;
          totalActual = actualM1 + actualM2 + actualM3 + actualM4 + actualM5 + actualM6 + actualM7 + actualM8 + actualM9 + actualM10 + actualM11 + actualM12 || 0;
        }

        total = Number(total.toFixed(2))
        totalActual = Number(totalActual.toFixed(2))


        Operational_Array.push({
          id: oListItem.get_id(),
          title: oListItem.get_item("Title"),
          name: name,
          category: category,
          relatedInstrument: relatedInstrument,
          target: target,
          targetQ1: targetQ1,
          targetQ2: targetQ2,
          targetQ3: targetQ3,
          targetQ4: targetQ4,
          performanceleader: performanceleader,
          dataAvailability: dataAvailability,
          dataSource: dataSource,
          periodType: periodType,
          resultType: resultType,
          total: total,
          calculationMethod: calculationMethod,
        });

        if (filteredValue == 'year') {
          BODY_HTML.push(
            '<tbody class="targetTbody">' +
            '<tr data-target_list="KPIResults" data-id="' + oListItem.get_id() + '" data-category="' + category + '" is-updated="false" id="MyTr">' +
            ' <th rowspan="2">' + name + "</th>" +
            '<th scope="row" class="Resources" data-trans-target></th>' +
            ' <td id="totalTarget" class="myInput" data-internal="Total" data-id="' + oListItem.get_id() + '">' + total +
            "</td>" +
            ' <td><input class="QarterInputStyle inputStyle1 myInput" data-internal="TargetY" type="number" name="" value="' +
            targetY +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            "</tr>" +
            // actual
            '<tr data-target_list="KPIResults" data-id="' +
            oListItem.get_id() + '" data-category="' + category + '" is-updated="false" id="MyTr">' +
            '<th scope="row" class="Resources" data-trans-actual></th>' +
            ' <td id="totalActual" class="myInput" data-internal="Actual" data-id="' + oListItem.get_id() + '">' +
            totalActual +
            "</td>" +
            ' <td><input class="QarterInputStyle inputStyle1 actualStyle myInput" data-internal="ActualY" type="number" name="" value="' +
            actualY +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            "</tr>" +
            "</tbody>"
          );
        } else if (filteredValue == 'quarter') {
          BODY_HTML.push(
            '<tbody class="targetTbody">' +
            '<tr data-target_list="KPIResults" data-id="' +
            oListItem.get_id() +
            '" data-category="' +
            category +
            '" is-updated="false" id="MyTr">' +
            ' <th rowspan="2">' +
            name +
            "</th>" +
            '<th scope="row" class="Resources" data-trans-target></th>' +
            ' <td id="totalTarget" class="myInput" data-internal="Total" data-id="' +
            oListItem.get_id() +
            '">' +
            total +
            "</td>" +
            ' <td><input class="QarterInputStyle inputStyle1 myInput" data-internal="TargetQ1" type="number" name="" value="' +
            targetQ1 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle2 myInput" data-internal="TargetQ2" type="number" name="" value="' +
            targetQ2 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle3 myInput" data-internal="TargetQ3" type="number" name="" value="' +
            targetQ3 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle4 myInput" data-internal="TargetQ4" type="number" name="" value="' +
            targetQ4 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            "</tr>" +
            // actual
            '<tr data-target_list="KPIResults" data-id="' +
            oListItem.get_id() +
            '" data-category="' +
            category +
            '" is-updated="false" id="MyTr">' +
            '<th scope="row" class="Resources" data-trans-actual></th>' +
            ' <td id="totalActual" class="myInput" data-internal="Actual" data-id="' +
            oListItem.get_id() +
            '">' +
            totalActual +
            "</td>" +
            ' <td><input class="QarterInputStyle inputStyle1 actualStyle myInput" data-internal="ActualQ1" type="number" name="" value="' +
            actualQ1 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle2 actualStyle myInput" data-internal="ActualQ2" type="number" name="" value="' +
            actualQ2 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle3 actualStyle myInput" data-internal="ActualQ3" type="number" name="" value="' +
            actualQ3 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle4 actualStyle myInput" data-internal="ActualQ4" type="number" name="" value="' +
            actualQ4 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            "</tr>" +
            "</tbody>"
          );
        } else if (filteredValue == 'midterm') {
          BODY_HTML.push(
            '<tbody class="targetTbody">' +
            '<tr data-target_list="KPIResults" data-id="' + oListItem.get_id() + '" data-category="' + category + '" is-updated="false" id="MyTr">' +
            ' <th rowspan="2">' + name + "</th>" +
            '<th scope="row" class="Resources" data-trans-target></th>' +
            ' <td id="totalTarget" class="myInput" data-internal="Total" data-id="' + oListItem.get_id() + '">' + total +
            "</td>" +
            ' <td><input class="QarterInputStyle inputStyle1 myInput" data-internal="TargetMid1" type="number" name="" value="' +
            targetMid1 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle2 myInput" data-internal="TargetMid2" type="number" name="" value="' +
            targetMid2 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            "</tr>" +
            // actual
            '<tr data-target_list="KPIResults" data-id="' +
            oListItem.get_id() + '" data-category="' + category + '" is-updated="false" id="MyTr">' +
            '<th scope="row" class="Resources" data-trans-actual></th>' +
            ' <td id="totalActual" class="myInput" data-internal="Actual" data-id="' + oListItem.get_id() + '">' +
            totalActual +
            "</td>" +
            ' <td><input class="QarterInputStyle inputStyle1 actualStyle myInput" data-internal="ActualMid1" type="number" name="" value="' +
            actualMid1 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle2 actualStyle myInput" data-internal="ActualMid2" type="number" name="" value="' +
            actualMid2 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            "</tr>" +
            "</tbody>"
          );
        } else if (filteredValue == 'monthly') {
          BODY_HTML.push(
            '<tbody class="targetTbody">' +
            '<tr data-target_list="KPIResults" data-id="' +
            oListItem.get_id() +
            '" data-category="' +
            category +
            '" is-updated="false" id="MyTr">' +
            ' <th rowspan="2">' +
            name +
            "</th>" +
            '<th scope="row" class="Resources" data-trans-target></th>' +
            ' <td id="totalTarget" class="myInput" data-internal="Total" data-id="' +
            oListItem.get_id() +
            '">' +
            total +
            "</td>" +
            ' <td><input class="QarterInputStyle inputStyle1 myInput" data-internal="TargetM1" type="number" name="" value="' +
            targetM1 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle2 myInput" data-internal="TargetM2" type="number" name="" value="' +
            targetM2 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle3 myInput" data-internal="TargetM3" type="number" name="" value="' +
            targetM3 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle4 myInput" data-internal="TargetM4" type="number" name="" value="' +
            targetM4 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            //target 4 replay should change
            ' <td><input class="QarterInputStyle inputStyle5 myInput" data-internal="TargetM5" type="number" name="" value="' +
            targetM5 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle6 myInput" data-internal="TargetM6" type="number" name="" value="' +
            targetM6 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle7 myInput" data-internal="TargetM7" type="number" name="" value="' +
            targetM7 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle8 myInput" data-internal="TargetM8" type="number" name="" value="' +
            targetM8 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle9 myInput" data-internal="TargetM9" type="number" name="" value="' +
            targetM9 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle10 myInput" data-internal="TargetM10" type="number" name="" value="' +
            targetM10 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle11 myInput" data-internal="TargetM11" type="number" name="" value="' +
            targetM11 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle12 myInput" data-internal="TargetM12" type="number" name="" value="' +
            targetM12 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            //
            "</tr>" +
            // actual
            '<tr data-target_list="KPIResults" data-id="' +
            oListItem.get_id() +
            '" data-category="' +
            category +
            '" is-updated="false" id="MyTr">' +
            '<th scope="row" class="Resources" data-trans-actual></th>' +
            ' <td id="totalActual" class="myInput" data-internal="Actual" data-id="' +
            oListItem.get_id() +
            '">' +
            totalActual +
            "</td>" +
            ' <td><input class="QarterInputStyle inputStyle1 actualStyle myInput" data-internal="ActualM1" type="number" name="" value="' +
            actualM1 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle2 actualStyle myInput" data-internal="ActualM2" type="number" name="" value="' +
            actualM2 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle3 actualStyle myInput" data-internal="ActualM3" type="number" name="" value="' +
            actualM3 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle4 actualStyle myInput" data-internal="ActualM4" type="number" name="" value="' +
            actualM4 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            //actual 4 replay should change
            ' <td><input class="QarterInputStyle inputStyle5 actualStyle myInput" data-internal="ActualM5" type="number" name="" value="' +
            actualM5 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle6 actualStyle myInput" data-internal="ActualM6" type="number" name="" value="' +
            actualM6 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle7 actualStyle myInput" data-internal="ActualM7" type="number" name="" value="' +
            actualM7 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle8 actualStyle myInput" data-internal="ActualM8" type="number" name="" value="' +
            actualM8 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle9 actualStyle myInput" data-internal="ActualM9" type="number" name="" value="' +
            actualM9 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle10 actualStyle myInput" data-internal="ActualM10" type="number" name="" value="' +
            actualM10 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle11 actualStyle myInput" data-internal="ActualM11" type="number" name="" value="' +
            actualM11 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            ' <td><input class="QarterInputStyle inputStyle12 actualStyle myInput" data-internal="ActualM12" type="number" name="" value="' +
            actualM12 +
            '" data-result-type="' +
            resultType +
            '" oninput="checkTypes.init(this)" data-id="' +
            oListItem.get_id() +
            '"></td>' +
            //
            "</tr>" +
            "</tbody>"
          );
        }
      }
    }



    //after looping list items
    // if (!BODY_HTML.length) BODY_HTML.push(UserNo_Data);

    //$('div#StatusFilterationHTMLid').html(htmlFilter);
    $(".custom-table").html(HEAD_HTML.join("") + BODY_HTML.join(""));

    if (BODY_HTML.length == 0) {
      // $('.custom-table').css({'background': '#f8f9fa'});
      $(".custom-table").html(`<div style="text-align:center"><img css="w-100" src="${emptyData}" style="height:40vh;width:40vh;"/><p data-trans-nofilterdata class="Resources" style="text-align:center;font-size:13px;padding-bottom:13px"></p></div>`)
    }
    $('input[data-internal*="Actual"]').prop('disabled', true);

    if (!isAdmin && !isSPMAdmin && !isVROP && !isLMSP) { // to can the spmAdmin change on  targets
      $('td input[data-internal*="Target"]').prop('disabled', true);
    }
    if (!isAdmin && !isPerformanceLeader && isLMSP) { // to can the spmAdmin change on  targets
      $('input[data-internal*="Actual"]').prop('disabled', true);
    }
    if (isPerformanceLeader) {
      $('input[data-internal*="Actual"]').prop('disabled', true);
      $('td input[data-internal*="Target"]').prop('disabled', true);
    }

    if (isMinister || isBITeam || isPerformanceLeader || isSPMTeam || isEPMO) {
      $("body").append(
        "<style>" +
        ".btn-save{display:none}" +
        "</style>"
      );
    }

    changeResources();
    $(".operatPPicker").each(function (i) {
      console.log(i, 'i');
      var mp = new MyPeoplePicker();
      mp.init($(this).attr("id"), {
        PrincipalAccountType: "User",
        AllowMultipleValues: false,
      });
      if (i == $(".operatPPicker").length - 1) {
        setInterval(function () {
          $("input.sp-peoplepicker-editorInput[type=text]").each(function () {
            $(this).attr(
              "placeholder",
              $(this).parent().parent().parent().data("value")
            );

          });
        }, 3000);

      }
    });


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
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {},
};

window.checkTargetStatusHtml = setInterval(function () {
  debugger
  if (isRoleDataLevelAccess) {
    RoleDataLevelBuildQuery.init()
  } else {
    MainKPIs_Info_Request.preinit();
  }
}, 777); //initiate the call


var RoleDataLevelBuildQuery = {
  init: function () {
    var FilterChoicesRole = Array.from(dataLevelAccessChoicesForFilters)

    FilterChoicesRole.push({ internalName: 'Year', Type: 'Text', Values: [currentYear] }, { internalName: 'PeriodType', Type: 'Choice', Values: [filteredValue] })
    console.log(FilterChoicesRole, "FilterChoicesRole FilterChoicesRoleFilterChoicesRole")
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////
    for (var i = 0; i < FilterChoicesRole.length; i++) {
      //only one choice
      if (FilterChoicesRole.length == 1) {
        // \'Year\' 
        Where_Body += '<In><FieldRef Name="' + FilterChoicesRole[i].internalName + '" /><Values>';
        for (var j = 0; j < FilterChoicesRole[i].Values.length; j++) {
          Where_Body += '<Value Type="' + FilterChoicesRole[i].Type + '">' + FilterChoicesRole[i].Values[j] + '</Value>';
        }
        Where_Body += '</Values></In>';
      }
      //Two choices
      else if (FilterChoicesRole.length == 2) {
        if (i == 0) {
          Where_Body += '<And><In><FieldRef Name="' + FilterChoicesRole[i].internalName + '" /><Values>';
          for (var j = 0; j < FilterChoicesRole[i].Values.length; j++) {
            Where_Body += '<Value Type="' + FilterChoicesRole[i].Type + '">' + FilterChoicesRole[i].Values[j] + '</Value>';
          }
          Where_Body += '</Values></In>';
        } else {
          Where_Body += '<In><FieldRef Name="' + FilterChoicesRole[i].internalName + '" /><Values>';
          for (var j = 0; j < FilterChoicesRole[i].Values.length; j++) {
            Where_Body += '<Value Type="' + FilterChoicesRole[i].Type + '">' + FilterChoicesRole[i].Values[j] + '</Value>';
          }
          Where_Body += '</Values></In></And>';
        }
      }
      //More than two choices
      else if (FilterChoicesRole.length > 2) {
        //two Eqs in last And
        if (i == FilterChoicesRole.length - 1) {
          Where_Body += '<In><FieldRef Name="' + FilterChoicesRole[i].internalName + '" /><Values>';
          for (var j = 0; j < FilterChoicesRole[i].Values.length; j++) {
            Where_Body += '<Value Type="' + FilterChoicesRole[i].Type + '">' + FilterChoicesRole[i].Values[j] + '</Value>';
          }
          Where_Body += '</Values></In>';

          //appending And closure
          var count = (Where_Body.match(/<And>/g) || []).length;
          var ANDC = "</And>".repeat(count);
          Where_Body += ANDC;
        }
        //normal And
        else {
          Where_Body += '<And><In><FieldRef Name="' + FilterChoicesRole[i].internalName + '" /><Values>';
          for (var j = 0; j < FilterChoicesRole[i].Values.length; j++) {
            Where_Body += '<Value Type="' + FilterChoicesRole[i].Type + '">' + FilterChoicesRole[i].Values[j] + '</Value>';
          }
          Where_Body += '</Values></In>';
        }
      }
      //Finish Line, make last changes and build query
      if (i == FilterChoicesRole.length - 1) {

        // console.log(PQueryFilteration);
        Where_Body = Where_Body.replaceAll('Type="date"', 'IncludeTimeValue="TRUE" Type="DateTime"'); //IncludeTimeValue="false"
        //alert(Where_Body.includes('Type="date"')+'00'+Where_Body);
        //Where_Body.replace('Type="date"', '');
        // console.log(PQueryFilteration.length > 0);

        if (!(PQueryFilteration.length > 0)) {

          Where_Body_Final = '<Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq>' + Where_Body + PQueryFilteration + '</And></Where>';
        } else {


          Where_Body_Final = '<Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And>' + Where_Body + PQueryFilteration + '</And></Where>';




        }

        Query_Body = '<View>' +
          '<Query>' +
          Where_Body_Final +
          '<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy>' +
          '</Query>' +
          '</View>';
        RolePQuery = Query_Body;

        MainKPIs_Info_Request.preinit();


        console.log(Query_Body, "Query_Body Query_Body Query_Body  jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
      }
    }
  }
}
var Get_All_Dynamic_Filter = {
  onSuccess: function (sender, args) {
    var collListItem = Get_All_Dynamic_Filter.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      var sector = oListItem.get_item("Sector") ? oListItem.get_item("Sector") : ''
      var department = oListItem.get_item("SubSector") ? oListItem.get_item("SubSector") : ''
      var portfolio = oListItem.get_item("Portfolio") ? oListItem.get_item("Portfolio") : ''
      var relatedGoal = oListItem.get_item("RelatedGoal") ? oListItem.get_item("RelatedGoal") : ''
      if (sector && !SectorFilterArr.includes(sector)) {
        SectorFilterArr.push(sector)
      }

      if (department && !DepartmentFilterArr.includes(department)) {
        DepartmentFilterArr.push(department)
      }

      if (portfolio && !PortfolioFilterArr.includes(portfolio)) {
        PortfolioFilterArr.push(portfolio)
      }

      if (relatedGoal && !RelatedGoalFilterArr.includes(relatedGoal)) {
        RelatedGoalFilterArr.push(relatedGoal)
      }

    }
    //
    if (RelatedGoalFilterArr.length > 0) {
      Get_Sos_Name.init();
    } else {
      Build_My_Filter.init();
    }
    // MainKPIs_Info_Request.init();

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("KPIResults");
    var camlQuery = new SP.CamlQuery();

    var query = "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>"
    if (isGeneralManager || isDU || isMinisterAssistant || isViceMinister || isSectorHead || isSubSectorHead) {
      // UserAccessSectorCode = 'DP-001';

      SectorHeadQuery =
        "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"" +
        SecondLevel_FirstLevel_Field +
        '" /><Values>';

      SectorHeadQuery =
        "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"" +
        SecondLevel_FirstLevel_Field +
        '" /><Values>';

      SectorHeadQuery +=
        '<Value Type="' +
        SecondLevel_FirstLevel_FieldType +
        '">' +
        UserAccessSectorCode +
        "</Value>";

      SectorHeadQuery += "</Values></In></And></Where></Query></View>";

      query = SectorHeadQuery
    }
    camlQuery.set_viewXml(query);
    Get_All_Dynamic_Filter.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_All_Dynamic_Filter.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_All_Dynamic_Filter.onSuccess),
      Function.createDelegate(this, Get_All_Dynamic_Filter.onError)
    );
  },
  g: {}
}

var Build_My_Filter = {
  init: function () {
    var filter_HTML = [];
    filter_HTML.push(
      '<div class="dropdown mx-3">' +
      '<a data-trans-pointertype href="#" class="Resources dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button"  aria-expanded="false"></a>' +
      '<div class="dropdown-menu Filter-1">' +
      ' <label class="dropdown-item main-action-filter">' +
      '<button data-trans-canselselections class="Resources clear-filter" type="button"></button>' +
      "</label>" +
      '<label class="dropdown-item"><span class="Resources" data-trans-ptitle12></span> <input data-type="text" data-internal="Types" type="checkbox" name="Types" value="main" id="mainCheck"></label>' +
      '<label class="dropdown-item"><span class="Resources" data-trans-subkpi></span><input data-type="text" data-internal="Types" type="checkbox" name="Types" value="sub" id="subCheck"></label>' +
      "</div>" +
      "</div>" +

      //////////////////////////////////////////////////sector filter
      '<div class="dropdown mx-3">' +
      '<a data-trans-filterkpissector href="#" class="Resources dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button"  aria-expanded="false"></a>' +
      '<div class="dropdown-menu Filter-3" style="max-height:350px;overflow-y:auto;overflow-x:hidden">' +
      "</div>" +
      "</div>" +
      ////////////////////////////////////////////////// department filter
      '<div class="dropdown mx-3">' +
      '<a data-trans-filterkpisdepartment href="#" class="Resources dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button"  aria-expanded="false"></a>' +
      '<div class="dropdown-menu Filter-4" style="max-height:350px;overflow-y:auto;overflow-x:hidden">' +
      "</div>" +
      "</div>" +
      ///////////////////////////////////////////////// portfolio filter
      '<div class="dropdown mx-3">' +
      '<a data-trans-portfolio href="#" class="Resources dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button"  aria-expanded="false"></a>' +
      '<div class="dropdown-menu Filter-5">' +
      "</div>" +
      "</div>" +
      //////////////////////////////////////////////// Goal Filter
      '<div class="dropdown mx-3">' +
      '<a data-trans-filterkpisname href="#" class="Resources dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button"  aria-expanded="false"></a>' +
      '<div class="dropdown-menu Filter-6" style="max-height:350px;overflow-y:auto;overflow-x:hidden">' +
      "</div>" +
      "</div>" +
      ////////////////////////////////////////////////

      '<div class="dropdown mx-3" id="periodType">' +
      '<a data-trans-repeatmeas href="#" class="Resources dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button"  aria-expanded="false"></a>' +
      '<div class="dropdown-menu Filter-2">' +
      ' <label class="dropdown-item main-action-filter">' +
      '<button data-trans-canselselections class="Resources clear-filter" type="button"></button>' +
      "</label>" +
      '<div class="control">' +
      '<label class="dropdown-item radio" ><span class="Resources" data-trans-year>سنوي</span><input data-type="text" type="checkbox"   data-internal="PeriodType" name="PeriodType" value="year" id="yearlyCheck"></label>' +
      '<label class="dropdown-item radio" ><span class="Resources" data-trans-quarter>ربع سنوي</span><input data-type="text" type="checkbox"   data-internal="PeriodType"  name="PeriodType" value="quarter" id="quarterlyCheck"></label>' +
      '<label class="dropdown-item radio" ><span class="Resources" data-trans-midterm>نصف سنوي</span><input data-type="text" type="checkbox"   data-internal="PeriodType"  name="PeriodType" value="midterm" id="midtermCheck"></label>' +
      '<label class="dropdown-item radio" ><span class="Resources" data-trans-monthly>شهري</span><input data-type="text" type="checkbox"   data-internal="PeriodType"  name="PeriodType" value="monthly" id="monthlyCheck"></label>' +
      "</div>" +
      "</div>" +
      "</div>"
    );

    $(".filterTarget").html(filter_HTML.join(""));


    // build sector filter

    var sectorhtml = ' <label class="dropdown-item main-action-filter">' + '<button data-trans-canselselections class="Resources clear-filter" type="button"></button></label>'
    for (var i = 0; i < SectorFilterArr.length; i++) {
      var name = SectorFilterArr[i]
      if (localStorage.getItem('Dynamo_Internal Entities') != null) {
        sectorNameArr = JSON.parse(localStorage.getItem('Dynamo_Internal Entities'));
        sectorNameArr = sectorNameArr.filter(function (a) {
          return a.code === name
        });
        if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
          name = sectorNameArr[0].name;
        } else name = sectorNameArr[0].nameEn;
      }

      sectorhtml += '<label class="dropdown-item"><span>' + name + '</span><input data-type="Text" data-internal="Sector" type="checkbox" name="Sector" value="' + SectorFilterArr[i] + '"></label>'
    }

    $('.dropdown-menu.Filter-3').html(sectorhtml);

    // build department filter

    var departmenthtml = ' <label class="dropdown-item main-action-filter">' + '<button data-trans-canselselections class="Resources clear-filter" type="button"></button></label>'

    for (var i = 0; i < DepartmentFilterArr.length; i++) {
      //
      var departmentName = DepartmentFilterArr[i]
      if (localStorage.getItem('Dynamo_Internal Entities') != null) {
        departmentNameArr = JSON.parse(localStorage.getItem('Dynamo_Internal Entities'));
        departmentNameArr = departmentNameArr.filter(function (a) {
          return a.code === departmentName
        });
        if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
          console.log(departmentNameArr, "departmentNameArr")
          if (departmentNameArr.length) {
            departmentName = departmentNameArr[0].name;
          }
        } else {
          if (departmentNameArr.length) {
            departmentName = departmentNameArr[0].nameEn;
          }
        }
        // console.log(departmentName,"departmentName departmentName")
      }

      departmenthtml += '<label class="dropdown-item"><span>' + departmentName + '</span><input data-type="Text" data-internal="SubSector" type="checkbox" name="SubSector" value="' + DepartmentFilterArr[i] + '"></label>'
    }

    $('.dropdown-menu.Filter-4').html(departmenthtml);

    //build portfolio filter

    var portfoliohtml = ' <label class="dropdown-item main-action-filter">' + '<button data-trans-canselselections class="Resources clear-filter" type="button"></button></label>'

    for (var i = 0; i < PortfolioFilterArr.length; i++) {
      var portfolioName = PortfolioFilterArr[i]
      if (localStorage.getItem('Dynamo_Portfolio') != null) {
        portfolioArr = JSON.parse(localStorage.getItem('Dynamo_Portfolio'));
        portfolioArr = portfolioArr.filter(function (a) {
          return a.code === portfolioName
        });
        if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
          portfolioName = portfolioArr.length ? portfolioArr[0].name : '';
        } else portfolioName = portfolioArr.length ? portfolioArr[0].nameEn : '';
      }
      portfoliohtml += '<label class="dropdown-item"><span>' + portfolioName + '</span><input data-type="Text" data-internal="Portfolio" type="checkbox" name="Portfolio" value="' + PortfolioFilterArr[i] + '"></label>'
    }
    $('.dropdown-menu.Filter-5').html(portfoliohtml);


    //build Goals filter

    var goalshtml = ' <label class="dropdown-item main-action-filter">' + '<button data-trans-canselselections class="Resources clear-filter" type="button"></button></label>'

    // RelatedGoalFilterArr
    for (var i = 0; i < RelatedGoalFilterArr.length; i++) {
      // GoalFilterNameArr
      var sosName = ''
      GoalFilterNameArr.filter(function (a) {

        if (a.code == RelatedGoalFilterArr[i]) {
          sosName = a.name
        }
        // return a.code == RelatedGoalFilterArr[i]
      });
      goalshtml += '<label class="dropdown-item"><span>' + sosName + '</span><input data-type="Text" data-internal="RelatedGoal" type="checkbox" name="RelatedGoal" value="' + RelatedGoalFilterArr[i] + '"></label>'
    }

    $('.dropdown-menu.Filter-6').html(goalshtml);

    //to handle filter years slider
    var filteryear_HTML = [];

    if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
      filteryear_HTML.push(
        '<div class="yearContainer">' +
        '<button type="button" name="next" class="previousYear" style="min-width:2em;padding:0px 7px;background:#148282;border-radius:50%"><i class="fas fa-arrow-right" style="padding-top:6px;color:#fff"></i></button>' +
        '<label style="margin:0px 10px"><span class="yeartitle">' + kpiYear + '</span></label>' +
        '<button type="button" name="prev" class="nextYear" style="min-width:2em;padding:0px 7px;background:#148282;border-radius:50%"><i class="fas fa-arrow-left" style="padding-top:6px;color:#fff"></i></button>' +
        '</div>'
      )
    } else {
      filteryear_HTML.push(
        '<div class="yearContainer">' +
        '<button type="button" name="prev" class="previousYear" style="min-width:2em;padding:0px 7px;background:#148282;border-radius:50%"><i class="fas fa-arrow-left" style="padding-top:6px;color:#fff"></i></button>' +
        '<label style="margin:0px 10px"><span class="yeartitle">' + kpiYear + '</span></label>' +
        '<button type="button" name="next" class="nextYear" style="min-width:2em;padding:0px 7px;background:#148282;border-radius:50%"><i class="fas fa-arrow-right" style="padding-top:6px;color:#fff"></i></button>' +
        '</div>'
      )
    }

    $(".yearSlider").html(filteryear_HTML.join(""))

    $("#yearlyCheck").prop({ checked: true }); // to checked the filter on first render سنوي





    $("#mainCheck").click(function () {
      $("#subCheck").prop({ checked: false })
      indexType = this.checked ? $(this).attr("value") : ""
    })

    $("#subCheck").click(function () {
      $("#mainCheck").prop({ checked: false })
      indexType = this.checked ? $(this).attr("value") : ""
    })

    $("#yearlyCheck").click(function () {
      $("#quarterlyCheck").prop({ checked: false });
      $("#midtermCheck").prop({ checked: false });
      $("#monthlyCheck").prop({ checked: false });
      filteredValue = this.checked ? $(this).attr("value") : "";
    });
    $("#quarterlyCheck").click(function () {
      $("#yearlyCheck").prop({ checked: false });
      $("#midtermCheck").prop({ checked: false });
      $("#monthlyCheck").prop({ checked: false });
      filteredValue = this.checked ? $(this).attr("value") : "";
    });

    $("#midtermCheck").click(function () {
      $("#yearlyCheck").prop({ checked: false });
      $("#quarterlyCheck").prop({ checked: false });
      $("#monthlyCheck").prop({ checked: false });
      filteredValue = this.checked ? $(this).attr("value") : "";
    })

    $("#monthlyCheck").click(function () {
      $("#yearlyCheck").prop({ checked: false });
      $("#quarterlyCheck").prop({ checked: false });
      $("#midtermCheck").prop({ checked: false })
      filteredValue = this.checked ? $(this).attr("value") : "";
    })

    $(".filterTarget .dropdown-menu label input:checkbox").change(function (e) {
      FilterChoices = [];
      if (isRoleDataLevelAccess) {

        FilterChoices = Array.from(dataLevelAccessChoicesForFilters)
        console.log(FilterChoices, "FilterChoices FilterChoices FilterChoices")
      }
      $(".filterTarget .dropdown-menu").each(function () {
        //looping through filters
        var selectedchoices = $(this)
          .find("input:checked")
          .map(function () {
            //getting selected choices
            return $(this).val();
          })
          .get();
        if (selectedchoices.length) {
          var internalName = $(this).find("input:checkbox").data("internal");
          var fieldType = $(this).find("input:checkbox").data("type");
          FilterChoices.push({
            internalName: internalName,
            Type: fieldType,
            Values: selectedchoices,
          });
          My_HTML = [];
          $(".targetThead").html(My_HTML.join(""));
          $(".targetTbody").html(My_HTML.join(""));
        }
      });

      if (FilterChoices.length) {
        Where_Body = ""
        Query_Body = ""
        //dynamic query building
        for (var i = 0; i < FilterChoices.length; i++) {
          //only one choice
          if (FilterChoices.length == 1) {
            Where_Body +=
              '<And>' +
              '<Eq><FieldRef Name=\'Year\' /> <Value Type=\'Text\'>' + kpiYear + '</Value ></Eq>' +
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
          //Two choices
          else if (FilterChoices.length == 2) {

            if (i == 0) {
              Where_Body +=
                '<And>' +
                '<Eq><FieldRef Name=\'Year\' /> <Value Type=\'Text\'>' + kpiYear + '</Value ></Eq>' +
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
              Where_Body += "</Values></In></And></And>";
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
            } else if (i == 0) { // add i = 0 to handle add the year to the query sucessfully
              Where_Body +=
                '<And>' +
                '<Eq><FieldRef Name=\'Year\' /> <Value Type=\'Text\'>' + kpiYear + '</Value ></Eq>' +
                '<And>' +
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

              "<Query>" +
              "<Where>" +
              Where_Body +
              "</And></Where>" +

              "</Query>" +
              "</View>";

            MainKPIs_Info_Request.init(Where_Body);
          }
        }
        // for (i = 0; i < FilterChoices.length; i++) {
        //

        // 	if (FilterChoices[i].Values.includes("main")) {
        // 		MainKPIs_Info_Request.init(filteredValue, false, "main");
        // 	}
        // 	if (FilterChoices[i].Values.includes("sub")) {
        // 		MainKPIs_Info_Request.init(filteredValue, false, "sub");
        // 	}
        // 	// if (FilterChoices[i].Values.includes('main') && !FilterChoices[i].Values.includes('operational') && FilterChoices.length ===1) {
        // 	//   MainKPIs_Info_Request.init(filteredValue,false , 'رئيسي');
        // 	// }
        // 	// if (!FilterChoices[i].Values.includes('main') && FilterChoices[i].Values.includes('operational') && FilterChoices.length ===1) {
        // 	//   MainKPIs_Info_Request.init(filteredValue,false , 'تشغيلي');
        // 	// }
        // 	// if (FilterChoices[i].Values.includes('instrument') && FilterChoices.length ===1) {
        // 	//   InstrumentKPIs_Info_Request.init(filteredValue,false);
        // 	// }
        // 	// if (FilterChoices[i].Values.includes('initiativeKpi') && FilterChoices.length ===1) {
        // 	//   InitiativeKPIs_Info_Request.init(filteredValue,false);
        // 	// }
        // 	// if (FilterChoices[i].Values.includes('main') && FilterChoices[i].Values.includes('operational')  && FilterChoices.length > 1) {
        // 	//   MainKPIs_Info_Request.init(filteredValue,false);
        // 	// }
        // 	// if (FilterChoices[i].Values.includes('main') && !FilterChoices[i].Values.includes('operational') && FilterChoices.length > 1) {
        // 	//   MainKPIs_Info_Request.init(filteredValue,false , 'رئيسي');
        // 	// }
        // 	// if (!FilterChoices[i].Values.includes('main') && FilterChoices[i].Values.includes('operational') && FilterChoices.length > 1) {
        // 	//   MainKPIs_Info_Request.init(filteredValue,false , 'تشغيلي');
        // 	// }
        // 	// if(FilterChoices[i].Values.includes('instrument') && FilterChoices.length > 1){
        // 	//   InstrumentKPIs_Info_Request.init(filteredValue ,false);
        // 	// }
        // 	// if (FilterChoices[i].Values.includes('initiativeKpi') && FilterChoices.length > 1) {
        // 	//   InitiativeKPIs_Info_Request.init(filteredValue,false);
        // 	// }
        // 	if (
        // 		FilterChoices[i].Values.includes("year") &&
        // 		FilterChoices.length === 1
        // 	) {
        // 		MainKPIs_Info_Request.init(filteredValue, false);
        // 		InitiativeKPIs_Info_Request.init(filteredValue, true);
        // 		InstrumentKPIs_Info_Request.init(filteredValue, true);
        // 	}
        // 	if (
        // 		FilterChoices[i].Values.includes("quarter") &&
        // 		FilterChoices.length === 1
        // 	) {
        // 		MainKPIs_Info_Request.init(filteredValue, false);
        // 		InitiativeKPIs_Info_Request.init(filteredValue, true);
        // 		InstrumentKPIs_Info_Request.init(filteredValue, true);
        // 	}
        // }
      } else {
        MainKPIs_Info_Request.init();
        // InitiativeKPIs_Info_Request.init(filteredValue, true);
        // InstrumentKPIs_Info_Request.init(filteredValue, true);
      }
    });

    //handle button trigger year slider
    $(".yearSlider .yearContainer .nextYear").click(function (e) {
      var currentkpiYear = kpiYear

      kpiYear = Number(kpiYear) + 1
      $('.yeartitle').html(kpiYear)
      if (isRoleDataLevelAccess) {
        Where_Body = Where_Body.replace(currentkpiYear, kpiYear)

        // Where_Body = Where_Body.replace('<Value Type="Text">' + currentkpiYear + '</Value>', '<Value Type="Text">' + kpiYear + '</Value>')
      } else {
        Where_Body = Where_Body.replace(currentkpiYear, kpiYear)

        // Where_Body = Where_Body.replace("<FieldRef Name='Year' /> <Value Type='Text'>" + currentkpiYear + "</Value >", "<FieldRef Name='Year' /> <Value Type='Text'>" + kpiYear + "</Value >")
      }
      MainKPIs_Info_Request.init(Where_Body);
    })

    $(".yearSlider .yearContainer .previousYear").click(function (e) {
      debugger
      var currentkpiYear = kpiYear
      kpiYear = Number(kpiYear) - 1
      $('.yeartitle').html(kpiYear)
      console.log(Where_Body, "Where_Body dddddddddddddddddddddddddd")
      debugger
      if (isRoleDataLevelAccess) {
        // Where_Body = Where_Body.replace('<Value Type="Text">' + currentkpiYear + '</Value>', '<Value Type="Text">' + kpiYear + '</Value>')
        Where_Body = Where_Body.replace(currentkpiYear, kpiYear)

      } else {
        // Where_Body = Where_Body.replace("<FieldRef Name='Year' /> <Value Type='Text'>" + currentkpiYear + "</Value >", "<FieldRef Name='Year' /> <Value Type='Text'>" + kpiYear + "</Value >")
        Where_Body = Where_Body.replace(currentkpiYear, kpiYear)

      }
      console.log(Where_Body, "Where_Body dddddddddddddddddddddddddd")

      MainKPIs_Info_Request.init(Where_Body)
    })

    //

    $("button.clear-filter").click(function (e) {
      e.stopPropagation();
      if (
        // $(this).closest(".dropdown-menu").find("input:checkbox:checked").length
        $(".dropdown-menu").find("input:checkbox:checked").length
      ) { // to remove all check boxes
        // $(this)
        //   .closest(".dropdown-menu")
        //   .find("input:checkbox")
        //   .prop({ checked: false });
        $(".dropdown-menu")
          .find("input:checkbox")
          .prop({ checked: false });
      }

      My_HTML = [];
      $(".targetThead").html(My_HTML.join(""));
      $(".targetTbody").html(My_HTML.join(""));

      filteredValue = "year", // to get the data of year for first render
        indexType = '',

        $("#quarterlyCheck").prop({ checked: false });
      $("#midtermCheck").prop({ checked: false });
      $("#monthlyCheck").prop({ checked: false });
      $("#yearlyCheck").prop({ checked: true }); // to checked the filter on first render سنوي
      // $("#dateCheck2").prop({ checked: true }) //  to checked the filter on first render 2022

      MainKPIs_Info_Request.init();
      //   InstrumentKPIs_Info_Request.init(null, true);
    });
    $(".filterTarget .dropdown-menu label.dropdown-item").click(function (e) {
      e.stopPropagation();
    });
    MainKPIs_Info_Request.init(); // to invoke on firs load after build the html filter
  },
};
// not used
// <Eq>
// <FieldRef Name="CalculationMethod" /> <Value Type="Choice">يدوي</Value>
//   </Eq>

//get initiative kpis from list
var InitiativeKPIs_Info_Request = {
  // The main Initialization function
  init: function (filter, isBoth) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("InitiativeKPI"); //list name
    var camlQuery = new SP.CamlQuery(); //set query to return data
    isBothLists = isBoth;
    if (filteredValue === "year" || filteredValue === "quarter") {
      camlQuery.set_viewXml(
        '<View><Query>\
                  <Where>\
                  <And>\
                     <Contains>\
                        <FieldRef Name="PeriodType" /> <Value Type="Choice">' +
        filteredValue +
        "</Value> \
                      </Contains>\
                   </And>\
                  </Where>\
        <OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>"
      );
    } else {
      camlQuery.set_viewXml(
        "<View><Query>\
        <OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>"
      );
    }
    InitiativeKPIs_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only

    clientContext.load(InitiativeKPIs_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, InitiativeKPIs_Info_Request.onSuccess),
      Function.createDelegate(this, InitiativeKPIs_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = InitiativeKPIs_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator(),
      HEAD_HTML = [];
    My_HTML = [];
    if (!isBothLists) {
      if (filteredValue === "year") {
        HEAD_HTML.push(
          "<tr>" +
          '<th scope="col" data-trans-kpi class="Resources">المؤشر </th>' +
          // '<th scope="col">اسم البرنامج</th>'+
          // '<th scope="col"> مستهدف</th>' +
          '<th scope="col" data-trans-dataprovider class="Resources">مزود البيانات</th>' +
          '<th scope="col" data-trans-datasource class="Resources">مصدر البيانات</th>' +
          "</tr>"
        );
      } else {
        HEAD_HTML.push(
          "<tr>" +
          '<th scope="col" data-trans-kpi class="Resources">المؤشر </th>' +
          // '<th scope="col">اسم البرنامج</th>'+
          '<th scope="col" data-trans-total class="Resources">الإجمالي</th>' +
          '<th scope="col" data-trans-quart1 Class="Resources">الربع 1</th>' +
          '<th scope="col" data-trans-quart2 Class="Resources">الربع 2</th>' +
          '<th scope="col" data-trans-quart3 Class="Resources">الربع 3</th>' +
          '<th scope="col" data-trans-quart4 Class="Resources">الربع 4</th>' +
          '<th scope="col" data-trans-dataprovider class="Resources">مزود البيانات</th>' +
          '<th scope="col" data-trans-datasource class="Resources">مصدر البيانات</th>' +
          "</tr>"
        );
      }
    }

    while (listItemEnum.moveNext()) {
      countRec = countRec + 1;
      //loop through items, handle/get data/fields
      var oListItem = listItemEnum.get_current();
      //sample getting field data  : oListItem.get_item('InternalName')
      var name = oListItem.get_item("Name") || UserNo_Data;
      var relatedInstrumentKpi =
        oListItem.get_item("RelatedInstrumentKPI") || UserNo_Data;
      var target = oListItem.get_item("Target") || 0;
      var targetQ1 = oListItem.get_item("TargetQ1") || 0;
      var targetQ2 = oListItem.get_item("TargetQ2") || 0;
      var targetQ3 = oListItem.get_item("TargetQ3") || 0;
      var targetQ4 = oListItem.get_item("TargetQ4") || 0;
      var performanceleader = oListItem.get_item("PerformanceLeader")
        ? oListItem.get_item("PerformanceLeader").get_lookupValue()
        : UserN.Title;
      var dataSource = oListItem.get_item("DataSource") || UserNo_Data;
      var resultType = oListItem.get_item("ResultType") || null;
      var total = targetQ1 + targetQ2 + targetQ3 + targetQ4 || 0;

      Instrument_Array.push({
        id: oListItem.get_id(),
        performanceleader: oListItem.get_item("PerformanceLeader")
          ? oListItem.get_item("PerformanceLeader").get_lookupValue()
          : UserN.Title,
        title: oListItem.get_item("Title"),
      });

      if (filteredValue === "year") {
        My_HTML.push(
          '<tr data-target_list="InstrumentKPI" data-id="' +
          oListItem.get_id() +
          '">' +
          " <td>" +
          name +
          "</td>" +
          // ' <td>' + relatedInstrumentKpi + '</td>' +
          // ' <td><input class="QarterInputStyle inputStyle1 myInput" data-internal="Target" type="number" name="" value="' +
          // target +
          // '" data-result-type="' +
          // resultType +
          // '" oninput="checkTypes.init(this)" data-id="' +
          // oListItem.get_id() +
          // '"></td>' +
          ' <td><div class="PPField SPIField form-control instPPicker" type="picker" id="' +
          countRec +
          '"  data-internal="PerformanceLeader" data-value="' +
          performanceleader +
          '" INppicker="" data-email="' +
          performanceleader +
          '" value=""></div></td>' +
          ' <td><input class="inputStyle" data-internal="DataSource" type="text" name="" value="' +
          dataSource +
          '"></td>' +
          " </tr>"
        );
      } else {
        My_HTML.push(
          '<tr data-target_list="InstrumentKPI" data-id="' +
          oListItem.get_id() +
          '">' +
          " <td>" +
          name +
          "</td>" +
          // ' <td>' + relatedInstrumentKpi + '</td>' +
          ' <td id="totalActual" class="myInput" data-internal="Total" data-id="' +
          oListItem.get_id() +
          '">' +
          total +
          "</td>" +
          ' <td><input class="QarterInputStyle inputStyle1 myInput" data-internal="TargetQ1" type="number" name="" value="' +
          targetQ1 +
          '" data-result-type="' +
          resultType +
          '" oninput="checkTypes.init(this)" data-id="' +
          oListItem.get_id() +
          '"></td>' +
          ' <td><input class="QarterInputStyle inputStyle2 myInput" data-internal="TargetQ2" type="number" name="" value="' +
          targetQ2 +
          '" data-result-type="' +
          resultType +
          '" oninput="checkTypes.init(this)" data-id="' +
          oListItem.get_id() +
          '"></td>' +
          ' <td><input class="QarterInputStyle inputStyle3 myInput" data-internal="TargetQ3" type="number" name="" value="' +
          targetQ3 +
          '" data-result-type="' +
          resultType +
          '" oninput="checkTypes.init(this)" data-id="' +
          oListItem.get_id() +
          '"></td>' +
          ' <td><input class="QarterInputStyle inputStyle4 myInput" data-internal="TargetQ4" type="number" name="" value="' +
          targetQ4 +
          '" data-result-type="' +
          resultType +
          '" oninput="checkTypes.init(this)" data-id="' +
          oListItem.get_id() +
          '"></td>' +
          ' <td><div class="PPField SPIField form-control instPPicker" type="picker" id="' +
          countRec +
          '" data-internal="PerformanceLeader" data-value="' +
          performanceleader +
          '" INppicker="" data-email="' +
          performanceleader +
          '" value=""></div></td>' +
          ' <td><input class="myInput" data-internal="DataSource" type="text" name="" value="' +
          dataSource +
          '" ></td>' +
          " </tr>"
        );
      }
    }

    //after looping list items
    if (!My_HTML.length && !isBothLists) My_HTML.push(UserNo_Data);

    if (!isBothLists) {
      $(".targetThead").html(HEAD_HTML.join(""));
    }
    $(".targetTbody").append(My_HTML.join(""));

    $(".instPPicker").each(function () {
      var mp = new MyPeoplePicker();
      mp.init($(this).attr("id"), {
        PrincipalAccountType: "User",
        AllowMultipleValues: false,
      });
    });

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
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {},
};
//get instrument kpis from list
var InstrumentKPIs_Info_Request = {
  // The main Initialization function
  init: function (filter, isBoth) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("InstrumentKPI"); //list name
    var camlQuery = new SP.CamlQuery(); //set query to return data
    isBothLists = isBoth;
    if (filteredValue === "year" || filteredValue === "quarter" || filteredValue == "midterm" || filteredValue == 'monthly') {
      camlQuery.set_viewXml(
        '<View><Query>\
                  <Where>\
                       <Contains>\
                          <FieldRef Name="PeriodType" /> <Value Type="Choice">' +
        filteredValue +
        "</Value> \
                        </Contains>\
                  </Where>\
        <OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>"
      );
    } else {
      camlQuery.set_viewXml(
        "<View><Query>\
        <OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>"
      );
    }
    InstrumentKPIs_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only

    clientContext.load(InstrumentKPIs_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, InstrumentKPIs_Info_Request.onSuccess),
      Function.createDelegate(this, InstrumentKPIs_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = InstrumentKPIs_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator(),
      HEAD_HTML = [];
    My_HTML = [];
    if (!isBothLists) {
      if (filteredValue === "year") {
        HEAD_HTML.push(
          "<tr>" +
          '<th scope="col" data-trans-kpi class="Resources">المؤشر </th>' +
          // '<th scope="col">اسم البرنامج</th>'+
          // '<th scope="col"> مستهدف</th>' +
          '<th scope="col" data-trans-dataprovider class="Resources">مزود البيانات</th>' +
          '<th scope="col" data-trans-datasource class="Resources">مصدر البيانات</th>' +
          "</tr>"
        );
      } else {
        HEAD_HTML.push(
          "<tr>" +
          '<th scope="col" data-trans-kpi class="Resources">المؤشر </th>' +
          // '<th scope="col">اسم البرنامج</th>'+
          '<th scope="col" data-trans-total class="Resources">الإجمالي</th>' +
          '<th scope="col" data-trans-quart1 Class="Resources">الربع 1</th>' +
          '<th scope="col" data-trans-quart2 Class="Resources">الربع 2</th>' +
          '<th scope="col" data-trans-quart3 Class="Resources">الربع 3</th>' +
          '<th scope="col" data-trans-quart4 Class="Resources">الربع 4</th>' +
          '<th scope="col" data-trans-dataprovider class="Resources">مزود البيانات</th>' +
          '<th scope="col" data-trans-datasource class="Resources">مصدر البيانات</th>' +
          "</tr>"
        );
      }
    }
    while (listItemEnum.moveNext()) {
      countRec = countRec + 1;
      //loop through items, handle/get data/fields
      var oListItem = listItemEnum.get_current();
      //sample getting field data  : oListItem.get_item('InternalName')
      var name = oListItem.get_item("Name") || UserNo_Data;
      var relatedInstrument =
        oListItem.get_item("RelatedInstrument") || UserNo_Data;
      var target = oListItem.get_item("Target") || 0;
      var targetQ1 = oListItem.get_item("TargetQ1") || 0;
      var targetQ2 = oListItem.get_item("TargetQ2") || 0;
      var targetQ3 = oListItem.get_item("TargetQ3") || 0;
      var targetQ4 = oListItem.get_item("TargetQ4") || 0;
      var performanceleader = oListItem.get_item("PerformanceLeader")
        ? oListItem.get_item("PerformanceLeader").get_lookupValue()
        : UserN.Title;
      var dataAvailability =
        oListItem.get_item("DataAvailability") || UserNo_Data;
      var dataSource = oListItem.get_item("DataSource") || UserNo_Data;
      var periodType = oListItem.get_item("PeriodType") || UserNo_Data;
      var resultType = oListItem.get_item("ResultType") || null;
      var total = targetQ1 + targetQ2 + targetQ3 + targetQ4 || 0;

      Instrument_Array.push({
        id: oListItem.get_id(),
        performanceleader: oListItem.get_item("PerformanceLeader")
          ? oListItem.get_item("PerformanceLeader").get_lookupValue()
          : UserN.Title,
        title: oListItem.get_item("Title"),
      });

      if (filteredValue === "year") {
        My_HTML.push(
          '<tr data-target_list="InstrumentKPI" data-id="' +
          oListItem.get_id() +
          '">' +
          " <td>" +
          name +
          "</td>" +
          // ' <td>' + relatedInstrument + '</td>' +
          // ' <td><input class="QarterInputStyle inputStyle1 myInput" data-internal="Target" type="number" name="" value="' +
          // target +
          // '" data-result-type="' +
          // resultType +
          // '" oninput="checkTypes.init(this)" data-id="' +
          // oListItem.get_id() +
          // '"></td>' +
          ' <td><div class="PPField SPIField form-control instPPicker" type="picker" id="' +
          countRec +
          '"  data-internal="PerformanceLeader" data-value="' +
          performanceleader +
          '" INppicker="" data-email="' +
          performanceleader +
          '" value=""></div></td>' +
          ' <td><input class="inputStyle" data-internal="DataSource" type="text" name="" value="' +
          dataSource +
          '"></td>' +
          " </tr>"
        );
      } else {
        My_HTML.push(
          '<tr data-target_list="InstrumentKPI" data-id="' +
          oListItem.get_id() +
          '">' +
          " <td>" +
          name +
          "</td>" +
          // ' <td>' + relatedInstrument + '</td>' +
          ' <td id="totalActual" class="myInput" data-internal="Total" data-id="' +
          oListItem.get_id() +
          '">' +
          total +
          "</td>" +
          ' <td><input class="QarterInputStyle inputStyle1 myInput" data-internal="TargetQ1" type="number" name="" value="' +
          targetQ1 +
          '" data-result-type="' +
          resultType +
          '" oninput="checkTypes.init(this)" data-id="' +
          oListItem.get_id() +
          '"></td>' +
          ' <td><input class="QarterInputStyle inputStyle2 myInput" data-internal="TargetQ2" type="number" name="" value="' +
          targetQ2 +
          '" data-result-type="' +
          resultType +
          '" oninput="checkTypes.init(this)" data-id="' +
          oListItem.get_id() +
          '"></td>' +
          ' <td><input class="QarterInputStyle inputStyle3 myInput" data-internal="TargetQ3" type="number" name="" value="' +
          targetQ3 +
          '" data-result-type="' +
          resultType +
          '" oninput="checkTypes.init(this)" data-id="' +
          oListItem.get_id() +
          '"></td>' +
          ' <td><input class="QarterInputStyle inputStyle4 myInput" data-internal="TargetQ4" type="number" name="" value="' +
          targetQ4 +
          '" data-result-type="' +
          resultType +
          '" oninput="checkTypes.init(this)" data-id="' +
          oListItem.get_id() +
          '"></td>' +
          ' <td><div class="PPField SPIField form-control instPPicker" type="picker" id="' +
          countRec +
          '" data-internal="PerformanceLeader" data-value="' +
          performanceleader +
          '" INppicker="" data-email="' +
          performanceleader +
          '" value=""></div></td>' +
          ' <td><input class="myInput" data-internal="DataSource" type="text" name="" value="' +
          dataSource +
          '" ></td>' +
          " </tr>"
        );
      }
    }

    //after looping list items
    if (!My_HTML.length && !isBothLists) My_HTML.push(UserNo_Data);

    if (!isBothLists) {
      $(".targetThead").html(HEAD_HTML.join(""));
    }
    $(".targetTbody").append(My_HTML.join(""));

    $(".instPPicker").each(function () {
      var mp = new MyPeoplePicker();
      mp.init($(this).attr("id"), {
        PrincipalAccountType: "User",
        AllowMultipleValues: false,
      });
    });

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
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {},
};

window.checkTypes = {
  init: function ($this) {
    var total_value = 0,
      total_value_actual = 0;
    if ($this.getAttribute("data-result-type") === "نسبة مئوية") {
      $this.value =
        $this.value &&
          Math.abs($this.value) >= 0 &&
          $this.value &&
          Math.abs($this.value) <= 100
          ? Math.abs($this.value)
          : null;
    }

    for (i = 1; i <= 12; i++) {
      var value = $(
        ".inputStyle" + i + '[data-id="' + $this.getAttribute("data-id") + '"]'
      ).val();
      var valueActual = $(
        ".inputStyle" +
        i +
        '.actualStyle[data-id="' +
        $this.getAttribute("data-id") +
        '"]'
      ).val();

      if (value) {
        total_value += Number(value);
        $('#totalTarget[data-id="' + $this.getAttribute("data-id") + '"]').text(
          Number(total_value.toFixed(2))
        );
      }
      if (valueActual) {

        total_value_actual += Number(valueActual);
        $('#totalActual[data-id="' + $this.getAttribute("data-id") + '"]').text(
          Number(total_value_actual.toFixed(2))
        );
      }
    }
    dataId = $this.getAttribute("data-id");
    $('#MyTr[data-id="' + dataId + '"]').attr("is-updated", "true");
  },
};
//this is used
//submit target data to lists
var Target_Details_Submit = {
  init: function () {
    $(".btn-save").removeClass("loader-action-success");
    $(".btn-save").removeClass("loader-action-error");
    $(".btn-save").attr("disabled", true);
    var clientContext = new SP.ClientContext.get_current();
    var CurrList, oList, itemID;
    $('tbody.targetTbody tr[is-updated="true"]').each(function () //loop
    {
      CurrList = $(this).attr("data-target_list"); //list name
      oList = clientContext.get_web().get_lists().getByTitle(CurrList); //set list
      itemID = parseInt($(this).attr("data-id"));
      Target_Details_Submit.g.oListItem = oList.getItemById(itemID); //set item id

      //loop fields
      $(this)
        .find(".myInput, .instPPicker, .operatPPicker")
        .each(function () {
          console.log(
            "ListName == ",
            CurrList,
            "Field Name == ",
            $(this).attr("data-internal")
          );
          if ($(this).attr("type") == "picker") {
            if ($(this).find("span.sp-peoplepicker-userSpan").length) {
              var dataInternal = $(this).attr("data-internal");
              var sid = $(this)
                .find("span.sp-peoplepicker-userSpan")
                .attr("sid");
              console.log("sid == " + sid);
              var PPValue =
                sid == undefined ? "" : SP.FieldUserValue.fromUser(sid);
              Target_Details_Submit.g.oListItem.set_item(dataInternal, PPValue);
            }
          } else if ($(this)[0].tagName == "TD") {
            Target_Details_Submit.g.oListItem.set_item(
              $(this).attr("data-internal"),
              $(this).text()
            );
          } else {
            Target_Details_Submit.g.oListItem.set_item(
              $(this).attr("data-internal"),
              $(this).val()
            );
            console.log($(this).attr("data-internal"), $(this).val());
          }
        });

      if (
        $(this).attr("data-category") === "تشغيلي" &&
        $(this).attr("is-updated") === "true"
      ) {
        Target_Details_Submit.g.oListItem.set_item(
          "Status",
          "تم ملء المستهدفات"
        );
      }

      //Target_Details_Submit.g.oListItem.refreshLoad();

      Target_Details_Submit.g.oListItem.update();
      clientContext.load(Target_Details_Submit.g.oListItem);
    });

    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        $(".btn-save").attr("disabled", false);
        $(".btn-save").removeClass("loader-action-error");
        $(".btn-save").addClass("loader-action-success");
        MainKPIs_Info_Request.init();
        InstrumentKPIs_Info_Request.init(null, true);
      }),
      Function.createDelegate(this, function (sender, args) {
        $(".btn-save").attr("disabled", false);
        $(".btn-save").removeClass("loader-action-success");
        $(".btn-save").addClass("loader-action-error");
        console.log(
          "Request failed. " + args.get_message() + "" + args.get_stackTrace()
        );
      })
    );
  },
  g: {},
};
//.....


var Get_Sos_Name = {
  onSuccess: function (sender, args) {
    var collListItem = Get_Sos_Name.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      var code = oListItem.get_item("Title")
      var name = oListItem.get_item("Name")

      GoalFilterNameArr.push({
        "code": code,
        "name": name
      })

    }
    Build_My_Filter.init();

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("SOs");
    var camlQuery = new SP.CamlQuery();

    var query = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><In><FieldRef Name="Title" /><Values>'
    RelatedGoalFilterArr.forEach(function (item) {
      query += '<Value Type="Text">' + item + '</Value>'
    })
    query += '</Values></In></And></Where></Query></View>'

    camlQuery.set_viewXml(query);
    Get_Sos_Name.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_Sos_Name.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_Sos_Name.onSuccess),
      Function.createDelegate(this, Get_Sos_Name.onError)
    );
  },
  g: {}
  // customQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><In><FieldRef Name="InitiativeCode" /><Values>';
  //             visionarr.forEach(function (item) {
  //               customQuery += '<Value Type="Text">' + item.code + '</Value>';
  //             });
  //             customQuery += '</Values></In></And></Where></Query><RowLimit>100</RowLimit></View>';
}