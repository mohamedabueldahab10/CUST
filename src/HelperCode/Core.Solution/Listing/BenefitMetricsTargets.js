

console.log("INSIDE BENEFIT METRIC TARGETTTTTTTTTTT")

var allBenefitsArr = [], benefitExist = false;
var currentYear = new Date().getFullYear();
var benefitYear = currentYear.toString();

var benefitNameFilterArr = [];

// var emptyData = require('../../../helperResources/img/empty-data.png');

var emptyData =""

var filteredValue = "year", // to get the data of year for first render
  indexType = '';

var Where_Body = "",
  Query_Body = "";

var RolePQuery = '', Role_Where_Body = "", Role_Query_Body = "";

var firstRender = true;


window.checkTargetStatusHtml = setInterval(function () {

  Get_All_BenefitMetrics.preinit()
}, 777);


Get_All_BenefitMetrics = {
  onSuccess: function (sender, args) {
    var collListItem = Get_All_BenefitMetrics.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    allBenefitsArr = []

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      allBenefitsArr.push({
        code: oListItem.get_item("Title"),
        name: oListItem.get_item("Name"),
        periodType: oListItem.get_item("PeriodType"),
      })
    }


    console.log(allBenefitsArr, "allBenefitsArr")

    Get_Benefit_Results.init()

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  preinit: function () {
    debugger
    if ($(".d-flex").length) {
      clearInterval(checkTargetStatusHtml);
      //username
      $(".user-name").text(
        UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join(".")
      );
      $(".user-name-full").text(UserN.Title);
      $(".btn-toolbar.mb-2.mb-md-0.mx-2.page-filter").append(forfilterQuery);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        Get_All_Dynamic_Filter.init()
      });
      $(".btnTargetSubmit").click(function () {
        Target_Details_Submit.init();
      });
    }
  },
  init: function (Where_Body) {
    $(".btn-save").attr("disabled", false);

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("BenefitMetrics"); //list name
    var camlQuery = new SP.CamlQuery(); //set query to return data
    let query = "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
    if (Where_Body) {
      query = `<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq>` +
        Where_Body +
        `</And></Where><OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query></View>`
    }
    else if (isRoleDataLevelAccess) {
      query = dataLevelAccessQuery;

    }
    camlQuery.set_viewXml(query);

    Get_All_BenefitMetrics.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only

    clientContext.load(Get_All_BenefitMetrics.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_All_BenefitMetrics.onSuccess),
      Function.createDelegate(this, Get_All_BenefitMetrics.onError)
    );
  },
  g: {}
}


var Get_All_Dynamic_Filter = {
  onSuccess: function (sender, args) {

    var collListItem = Get_All_Dynamic_Filter.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      benefitExist = true

      var benefitName = oListItem.get_item("Name") ? oListItem.get_item("Name") : ''

      if (benefitName && !benefitNameFilterArr.includes(benefitName)) {
        benefitNameFilterArr.push(benefitName)
      }
    }

    Build_My_Filter.init();

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function () {
    debugger
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("BenefitMetrics");
    var camlQuery = new SP.CamlQuery();

    var query = ""

    if (isRoleDataLevelAccess) {
      query = dataLevelAccessQuery;
    } else {
      query = "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>"
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
      '<a data-trans-benefitmetricname href="#" class="Resources dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button"  aria-expanded="false"></a>' +
      '<div class="dropdown-menu Filter-3" style="max-height:350px;overflow-y:auto;overflow-x:hidden">' +
      "</div>" +
      "</div>" +

      //////////////////////////////////////////////// period type

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



    //reset period type filter

    if (!benefitExist) {
      $('#periodType .control').html("")
    }



    //build benefitname filter
    var benefitnamehtml = ' <label class="dropdown-item main-action-filter">' + '<button data-trans-canselselections class="Resources clear-filter" type="button"></button></label>'

    for (var i = 0; i < benefitNameFilterArr.length; i++) {
      benefitnamehtml += '<label class="dropdown-item"><span class="Resources">' + benefitNameFilterArr[i] + '</span> <input data-type="text" data-internal="Name" type="checkbox" name="Name" value="' + benefitNameFilterArr[i] + '"></label>'
    }

    $('.dropdown-menu.Filter-3').html(benefitnamehtml);

    //to handle filter years slider
    var filteryear_HTML = [];

    if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
      filteryear_HTML.push(
        '<div class="yearContainer">' +
        '<button type="button" name="next" class="previousYear" style="min-width:2em;padding:0px 7px;background:#148282;border-radius:50%"><i class="fas fa-arrow-right" style="padding-top:6px;color:#fff"></i></button>' +
        '<label style="margin:0px 10px"><span class="yeartitle">' + benefitYear + '</span></label>' +
        '<button type="button" name="prev" class="nextYear" style="min-width:2em;padding:0px 7px;background:#148282;border-radius:50%"><i class="fas fa-arrow-left" style="padding-top:6px;color:#fff"></i></button>' +
        '</div>'
      )
    } else {
      filteryear_HTML.push(
        '<div class="yearContainer">' +
        '<button type="button" name="prev" class="previousYear" style="min-width:2em;padding:0px 7px;background:#148282;border-radius:50%"><i class="fas fa-arrow-left" style="padding-top:6px;color:#fff"></i></button>' +
        '<label style="margin:0px 10px"><span class="yeartitle">' + benefitYear + '</span></label>' +
        '<button type="button" name="next" class="nextYear" style="min-width:2em;padding:0px 7px;background:#148282;border-radius:50%"><i class="fas fa-arrow-right" style="padding-top:6px;color:#fff"></i></button>' +
        '</div>'
      )
    }

    $(".yearSlider").html(filteryear_HTML.join(""))

    $("#yearlyCheck").prop({ checked: true }); // to checked the filter on first render سنوي




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

      }
      console.log(FilterChoices, "FilterChoices")

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
            if (FilterChoices[i].Type == "LoggedInUser") {
              Where_Body += `<Eq><FieldRef Name="${FilterChoices[i].internalName}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>`;
            } else {
              Where_Body +=
                // '<And>' +
                // '<Eq><FieldRef Name=\'Year\' /> <Value Type=\'Text\'>' + benefitYear + '</Value ></Eq>' +
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
          }
          //Two choices
          else if (FilterChoices.length == 2) {

            if (i == 0) {
              if (FilterChoices[i].Type == "LoggedInUser") {
                Where_Body += `<And><Eq><FieldRef Name="${FilterChoices[i].internalName}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>`;
              } else {
                Where_Body +=
                  // '<And>' +
                  // '<Eq><FieldRef Name=\'Year\' /> <Value Type=\'Text\'>' + benefitYear + '</Value ></Eq>' +
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
            } else {
              if (FilterChoices[i].Type == "LoggedInUser") {
                Where_Body += `<Eq><FieldRef Name="${FilterChoices[i].internalName}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq></And>`;
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
          }
          //More than two choices
          else if (FilterChoices.length > 2) {
            //two Eqs in last And
            if (i == FilterChoices.length - 1) {
              if (FilterChoices[i].Type == "LoggedInUser") {
                Where_Body += `<Eq><FieldRef Name="${FilterChoices[i].internalName}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>`;
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
                Where_Body += "</Values></In>";
              }
              //appending And closure
              var count = (Where_Body.match(/<And>/g) || []).length;
              var ANDC = "</And>".repeat(count);
              Where_Body += ANDC;
            }
            //normal And
            else {
              if (FilterChoices[i].Type == "LoggedInUser") {
                Where_Body += `<And><Eq><FieldRef Name="${FilterChoices[i].internalName}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>`;
              } else {
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

            Get_All_BenefitMetrics.init(Where_Body)
          }
        }
      } else {
        Get_Benefit_Results.init();
      }
    });

    //handle button trigger year slider
    $(".yearSlider .yearContainer .nextYear").click(function (e) {
      var currentbenefitYear = benefitYear

      benefitYear = Number(benefitYear) + 1
      $('.yeartitle').html(benefitYear)

      if (isRoleDataLevelAccess) {
        Where_Body = Where_Body.replace(currentbenefitYear, benefitYear)
      } else {
        Where_Body = Where_Body.replace(currentbenefitYear, benefitYear)
      }

      Get_Benefit_Results.init(Where_Body)
    })

    $(".yearSlider .yearContainer .previousYear").click(function (e) {

      var currentbenefitYear = benefitYear
      benefitYear = Number(benefitYear) - 1
      $('.yeartitle').html(benefitYear)


      if (isRoleDataLevelAccess) {
        // Where_Body = Where_Body.replace('<Value Type="Text">' + currentbenefitYear + '</Value>', '<Value Type="Text">' + benefitYear + '</Value>')
        Where_Body = Where_Body.replace(currentbenefitYear, benefitYear)

      } else {
        // Where_Body = Where_Body.replace("<FieldRef Name='Year' /> <Value Type='Text'>" + currentbenefitYear + "</Value >", "<FieldRef Name='Year' /> <Value Type='Text'>" + benefitYear + "</Value >")
        Where_Body = Where_Body.replace(currentbenefitYear, benefitYear)

      }


      Get_Benefit_Results.init(Where_Body)
    })

    //

    $("button.clear-filter").click(function (e) {
      e.stopPropagation();
      if (
        // $(this).closest(".dropdown-menu").find("input:checkbox:checked").length
        $(".dropdown-menu").find("input:checkbox:checked").length
      ) {

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
      Get_All_BenefitMetrics.init()
    });
    $(".filterTarget .dropdown-menu label.dropdown-item").click(function (e) {
      e.stopPropagation();
    });

    Get_All_BenefitMetrics.init(); // to invoke on firs load after build the html filter

  },
};



var Get_Benefit_Results = {
  init: function (Where_Body) {
    $(".btn-save").attr("disabled", false);

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("BenefitsResults"); //list name
    var camlQuery = new SP.CamlQuery(); //set query to return data
    console.log(allBenefitsArr, "all allBenefitsArr array")


    if (filteredValue) {
      camlQuery.set_viewXml(
        "<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name=\'Year\' /> <Value Type=\'Text\'>" + benefitYear + "</Value ></Eq></And></Where ><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query ></View >");
    }
    Get_Benefit_Results.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_Benefit_Results.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_Benefit_Results.onSuccess),
      Function.createDelegate(this, Get_Benefit_Results.onError)
    );

  },
  onSuccess: function (sender, args) {

    console.log("inside Get_Benefit_Results")
    debugger

    var collListItem = Get_Benefit_Results.g.collListItem;
    var listItemEnum = collListItem.getEnumerator()
    HEAD_HTML = [];
    BODY_HTML = [];


    if (filteredValue == 'year') {
      HEAD_HTML.push(
        '<thead class="targetThead">' +
        "<div>" +
        "<tr>" +
        '<th scope="col" data-trans-benefit class="Resources"></th>' +
        '<th scope="col"></th>' +
        '<th scope="col" data-trans-total class="Resources"></th>' +
        '<th scope="col" data-trans-yearly Class="Resources"></th>' +
        "</tr>" +
        "</div>" +
        "<thead>"
      );
    } else if (filteredValue == 'quarter') {
      HEAD_HTML.push(
        '<thead class="targetThead">' +
        "<div>" +
        "<tr>" +
        '<th scope="col" data-trans-benefit class="Resources"> </th>' +
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
        '<th scope="col" data-trans-benefit class="Resources"></th>' +
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
        '<th scope="col" data-trans-benefit class="Resources"></th>' +
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

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      var benefitCode = oListItem.get_item("RelatedBenefitMetrics") || '';

      allBenefitsArr.forEach(el => {

        if ((el.code == benefitCode) && (el.periodType == filteredValue)) {
          var name = el.name || UserNo_Data;
          var category = '';
          ///////////////////////////////
          var target1 = (oListItem.get_item("Target1") ? Number(oListItem.get_item("Target1").toFixed(2)) : 0);
          var resultType = '';
          var actual1 = (oListItem.get_item("Actual1") ? Number(oListItem.get_item("Actual1").toFixed(2)) : 0);
          var forecast1 = (oListItem.get_item("Forecast1") ? Number(oListItem.get_item("Forecast1").toFixed(2)) : 0);
          ////////////////////////////////quarter & mid
          var target2 = (oListItem.get_item("Target2") ? Number(oListItem.get_item("Target2").toFixed(2)) : 0);
          var target3 = (oListItem.get_item("Target3") ? Number(oListItem.get_item("Target3").toFixed(2)) : 0);
          var target4 = (oListItem.get_item("Target4") ? Number(oListItem.get_item("Target4").toFixed(2)) : 0);
          var actual2 = (oListItem.get_item("Actual2") ? Number(oListItem.get_item("Actual2").toFixed(2)) : 0);
          var actual3 = (oListItem.get_item("Actual3") ? Number(oListItem.get_item("Actual3").toFixed(2)) : 0);
          var actual4 = (oListItem.get_item("Actual4") ? Number(oListItem.get_item("Actual4").toFixed(2)) : 0);
          var forecast2 = (oListItem.get_item("Forecast2") ? Number(oListItem.get_item("Forecast2").toFixed(2)) : 0);
          var forecast3 = (oListItem.get_item("Forecast3") ? Number(oListItem.get_item("Forecast3").toFixed(2)) : 0);
          var forecast4 = (oListItem.get_item("Forecast4") ? Number(oListItem.get_item("Forecast4").toFixed(2)) : 0);
          //////////////////////////////monthly

          var target5 = (oListItem.get_item("Target5") ? Number(oListItem.get_item("Target5").toFixed(2)) : 0);
          var target6 = (oListItem.get_item("Target6") ? Number(oListItem.get_item("Target6").toFixed(2)) : 0);
          var target7 = (oListItem.get_item("Target7") ? Number(oListItem.get_item("Target7").toFixed(2)) : 0);
          var target8 = (oListItem.get_item("Target8") ? Number(oListItem.get_item("Target8").toFixed(2)) : 0);
          var target9 = (oListItem.get_item("Target9") ? Number(oListItem.get_item("Target9").toFixed(2)) : 0);
          var target10 = (oListItem.get_item("Target10") ? Number(oListItem.get_item("Target10").toFixed(2)) : 0);
          var target11 = (oListItem.get_item("Target11") ? Number(oListItem.get_item("Target11").toFixed(2)) : 0);
          var target12 = (oListItem.get_item("Target12") ? Number(oListItem.get_item("Target12").toFixed(2)) : 0);
          var actual5 = (oListItem.get_item("Actual5") ? Number(oListItem.get_item("Actual5").toFixed(2)) : 0);
          var actual6 = (oListItem.get_item("Actual6") ? Number(oListItem.get_item("Actual6").toFixed(2)) : 0);
          var actual7 = (oListItem.get_item("Actual7") ? Number(oListItem.get_item("Actual7").toFixed(2)) : 0);
          var actual8 = (oListItem.get_item("Actual8") ? Number(oListItem.get_item("Actual8").toFixed(2)) : 0);
          var actual9 = (oListItem.get_item("Actual9") ? Number(oListItem.get_item("Actual9").toFixed(2)) : 0);
          var actual10 = (oListItem.get_item("Actual10") ? Number(oListItem.get_item("Actual10").toFixed(2)) : 0);
          var actual11 = (oListItem.get_item("Actual11") ? Number(oListItem.get_item("Actual11").toFixed(2)) : 0);
          var actual12 = (oListItem.get_item("Actual12") ? Number(oListItem.get_item("Actual12").toFixed(2)) : 0);
          var forecast5 = (oListItem.get_item("Forecast5") ? Number(oListItem.get_item("Forecast5").toFixed(2)) : 0);
          var forecast6 = (oListItem.get_item("Forecast6") ? Number(oListItem.get_item("Forecast6").toFixed(2)) : 0);
          var forecast7 = (oListItem.get_item("Forecast7") ? Number(oListItem.get_item("Forecast7").toFixed(2)) : 0);
          var forecast8 = (oListItem.get_item("Forecast8") ? Number(oListItem.get_item("Forecast8").toFixed(2)) : 0);
          var forecast9 = (oListItem.get_item("Forecast9") ? Number(oListItem.get_item("Forecast9").toFixed(2)) : 0);
          var forecast10 = (oListItem.get_item("Forecast10") ? Number(oListItem.get_item("Forecast10").toFixed(2)) : 0);
          var forecast11 = (oListItem.get_item("Forecast11") ? Number(oListItem.get_item("Forecast11").toFixed(2)) : 0);
          var forecast12 = (oListItem.get_item("Forecast12") ? Number(oListItem.get_item("Forecast12").toFixed(2)) : 0);
          /////////////////////////////
          var total = 0
          var totalActual = 0
          var totalForcast = 0


          total = target1 + target2 + target3 + target4 + target5 + target6 + target7 + target8 + target9 + target10 + target11 + target12 || 0;
          totalActual = actual1 + actual2 + actual3 + actual4 + actual5 + actual6 + actual7 + actual8 + actual9 + actual10 + actual11 + actual12 || 0;
          totalForcast = forecast1 + forecast2 + forecast3 + forecast4 + forecast5 + forecast6 + forecast7 + forecast8 + forecast9 + forecast10 + forecast11 + forecast12 || 0;

          //////////////////////////

          if (filteredValue == 'year') {
            BODY_HTML.push(
              '<tbody class="targetTbody">' +
              '<tr data-target_list="BenefitsResults" data-id="' + oListItem.get_id() + '" data-category="' + category + '" is-updated="false" id="MyTr">' +
              ' <th rowspan="3">' + name + "</th>" +
              '<th scope="row" class="Resources" data-trans-target></th>' +
              ' <td id="totalTarget" class="myInput"  data-id="' + oListItem.get_id() + '">' + total +
              "</td>" +
              ' <td><input class="QarterInputStyle inputStyle1 myInput" data-internal="Target1" type="number" name="" value="' +
              target1 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              "</tr>" +
              // actual
              '<tr data-target_list="BenefitsResults" data-id="' +
              oListItem.get_id() + '" data-category="' + category + '" is-updated="false" id="MyTr">' +
              '<th scope="row" class="Resources" data-trans-actual></th>' +
              ' <td id="totalActual" class="myInput" data-id="' + oListItem.get_id() + '">' +
              totalActual +
              "</td>" +
              ' <td><input class="QarterInputStyle inputStyle1 actualStyle myInput" data-internal="Actual1" type="number" name="" value="' +
              actual1 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              "</tr>" +
              "</tbody>"
            );
          } else if (filteredValue == 'quarter') {
            BODY_HTML.push(
              '<tbody class="targetTbody">' +
              '<tr data-target_list="BenefitsResults" data-id="' +
              oListItem.get_id() +
              '" data-category="' +
              category +
              '" is-updated="false" id="MyTr">' +
              ' <th rowspan="3">' +
              name +
              "</th>" +
              '<th scope="row" class="Resources" data-trans-target></th>' +
              ' <td id="totalTarget" class="myInput" data-id="' +
              oListItem.get_id() +
              '">' +
              total +
              "</td>" +
              ' <td><input class="QarterInputStyle inputStyle1 myInput" data-internal="Target1" type="number" name="" value="' +
              target1 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle2 myInput" data-internal="Target2" type="number" name="" value="' +
              target2 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle3 myInput" data-internal="Target3" type="number" name="" value="' +
              target3 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle4 myInput" data-internal="Target4" type="number" name="" value="' +
              target4 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              "</tr>" +
              // actual
              '<tr data-target_list="BenefitsResults" data-id="' +
              oListItem.get_id() +
              '" data-category="' +
              category +
              '" is-updated="false" id="MyTr">' +
              '<th scope="row" class="Resources" data-trans-actual></th>' +
              ' <td id="totalActual" class="myInput" data-id="' +
              oListItem.get_id() +
              '">' +
              totalActual +
              "</td>" +
              ' <td><input class="QarterInputStyle inputStyle1 actualStyle myInput" data-internal="Actual1" type="number" name="" value="' +
              actual1 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle2 actualStyle myInput" data-internal="Actual2" type="number" name="" value="' +
              actual2 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle3 actualStyle myInput" data-internal="Actual3" type="number" name="" value="' +
              actual3 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle4 actualStyle myInput" data-internal="Actual4" type="number" name="" value="' +
              actual4 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              "</tr>" +
              "</tbody>"
            );
          } else if (filteredValue == 'midterm') {
            BODY_HTML.push(
              '<tbody class="targetTbody">' +
              '<tr data-target_list="BenefitsResults" data-id="' + oListItem.get_id() + '" data-category="' + category + '" is-updated="false" id="MyTr">' +
              ' <th rowspan="3">' + name + "</th>" +
              '<th scope="row" class="Resources" data-trans-target></th>' +
              ' <td id="totalTarget" class="myInput" data-id="' + oListItem.get_id() + '">' + total +
              "</td>" +
              ' <td><input class="QarterInputStyle inputStyle1 myInput" data-internal="Target1" type="number" name="" value="' +
              target1 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle2 myInput" data-internal="Target2" type="number" name="" value="' +
              target2 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              "</tr>" +
              // actual
              '<tr data-target_list="BenefitsResults" data-id="' +
              oListItem.get_id() + '" data-category="' + category + '" is-updated="false" id="MyTr">' +
              '<th scope="row" class="Resources" data-trans-actual></th>' +
              ' <td id="totalActual" class="myInput" data-id="' + oListItem.get_id() + '">' +
              totalActual +
              "</td>" +
              ' <td><input class="QarterInputStyle inputStyle1 actualStyle myInput" data-internal="Actual1" type="number" name="" value="' +
              actual1 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle2 actualStyle myInput" data-internal="Actual2" type="number" name="" value="' +
              actual2 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              "</tr>" +
              "</tbody>"
            );
          } else if (filteredValue == 'monthly') {
            BODY_HTML.push(
              '<tbody class="targetTbody">' +
              '<tr data-target_list="BenefitsResults" data-id="' +
              oListItem.get_id() +
              '" data-category="' +
              category +
              '" is-updated="false" id="MyTr">' +
              ' <th rowspan="3">' +
              name +
              "</th>" +
              '<th scope="row" class="Resources" data-trans-target></th>' +
              ' <td id="totalTarget" class="myInput"  data-id="' +
              oListItem.get_id() +
              '">' +
              total +
              "</td>" +
              ' <td><input class="QarterInputStyle inputStyle1 myInput" data-internal="Target1" type="number" name="" value="' +
              target1 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle2 myInput" data-internal="Target2" type="number" name="" value="' +
              target2 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle3 myInput" data-internal="Target3" type="number" name="" value="' +
              target3 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle4 myInput" data-internal="Target4" type="number" name="" value="' +
              target4 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              //target 4 replay should change
              ' <td><input class="QarterInputStyle inputStyle5 myInput" data-internal="Target5" type="number" name="" value="' +
              target5 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle6 myInput" data-internal="Target6" type="number" name="" value="' +
              target6 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle7 myInput" data-internal="Target7" type="number" name="" value="' +
              target7 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle8 myInput" data-internal="Target8" type="number" name="" value="' +
              target8 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle9 myInput" data-internal="Target9" type="number" name="" value="' +
              target9 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle10 myInput" data-internal="Target10" type="number" name="" value="' +
              target10 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle11 myInput" data-internal="Target11" type="number" name="" value="' +
              target11 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle12 myInput" data-internal="Target12" type="number" name="" value="' +
              target12 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              //
              "</tr>" +
              // actual
              '<tr data-target_list="BenefitsResults" data-id="' +
              oListItem.get_id() +
              '" data-category="' +
              category +
              '" is-updated="false" id="MyTr">' +
              '<th scope="row" class="Resources" data-trans-actual></th>' +
              ' <td id="totalActual" class="myInput" data-id="' +
              oListItem.get_id() +
              '">' +
              totalActual +
              "</td>" +
              ' <td><input class="QarterInputStyle inputStyle1 actualStyle myInput" data-internal="Actual1" type="number" name="" value="' +
              actual1 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle2 actualStyle myInput" data-internal="Actual2" type="number" name="" value="' +
              actual2 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle3 actualStyle myInput" data-internal="Actual3" type="number" name="" value="' +
              actual3 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle4 actualStyle myInput" data-internal="Actual4" type="number" name="" value="' +
              actual4 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              //actual 4 replay should change
              ' <td><input class="QarterInputStyle inputStyle5 actualStyle myInput" data-internal="Actual5" type="number" name="" value="' +
              actual5 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle6 actualStyle myInput" data-internal="Actual6" type="number" name="" value="' +
              actual6 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle7 actualStyle myInput" data-internal="Actual7" type="number" name="" value="' +
              actual7 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle8 actualStyle myInput" data-internal="Actual8" type="number" name="" value="' +
              actual8 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle9 actualStyle myInput" data-internal="Actual9" type="number" name="" value="' +
              actual9 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle10 actualStyle myInput" data-internal="Actual10" type="number" name="" value="' +
              actual10 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle11 actualStyle myInput" data-internal="Actual11" type="number" name="" value="' +
              actual11 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              ' <td><input class="QarterInputStyle inputStyle12 actualStyle myInput" data-internal="Actual12" type="number" name="" value="' +
              actual12 +
              '" data-result-type="' +
              resultType +
              '" oninput="checkBenefitsTypes.init(this)" data-id="' +
              oListItem.get_id() +
              '"></td>' +
              //
              "</tr>" +
              "</tbody>"
            );
          }



        }
      })

    }
    $(".custom-table").html(HEAD_HTML.join("") + BODY_HTML.join(""));

    if (BODY_HTML.length == 0) {
      // $('.custom-table').css({'background': '#f8f9fa'});
      $(".custom-table").html(`<div style="text-align:center"><img css="w-100" src="${emptyData}" style="height:40vh;width:40vh;"/><p data-trans-nofilterdata class="Resources" style="text-align:center;font-size:13px;padding-bottom:13px"></p></div>`)
    }
    $('input[data-internal*="Actual"]').prop('disabled', true);
    $('input[data-internal*="Forecast"]').prop('disabled', true);


    changeResources();

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
}

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
            if ($(this).attr("data-internal")) {
              Target_Details_Submit.g.oListItem.set_item(
                $(this).attr("data-internal"),
                $(this).text()
              );
            }
          } else {
            Target_Details_Submit.g.oListItem.set_item(
              $(this).attr("data-internal"),
              $(this).val()
            );
            console.log($(this).attr("data-internal"), $(this).val());
          }
        });

      // if (
      //   $(this).attr("data-category") === "تشغيلي" &&
      //   $(this).attr("is-updated") === "true"
      // ) {
      //   Target_Details_Submit.g.oListItem.set_item(
      //     "Status",
      //     "تم ملء المستهدفات"
      //   );
      // }

      //Target_Details_Submit.g.oListItem.refreshLoad();

      Target_Details_Submit.g.oListItem.update();
      clientContext.load(Target_Details_Submit.g.oListItem);
    });

    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        $(".btn-save").attr("disabled", false);
        $(".btn-save").removeClass("loader-action-error");
        $(".btn-save").addClass("loader-action-success");
        Get_Benefit_Results.init()
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


window.checkBenefitsTypes = {
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