window.kpiCodeResult = '';
////////////
var allFileIndex = 0
var relatedObjInit = '';
/////////////
var filesUrls = [];
var NIssues = 0,
  NRisks = 0,
  getfolderurl,
  DocumentLibraryName,
  AssignedBudget,
  RevenuesAmount = 0,
  RemainingBudget = 0,
  KPICode = "",
  kpiEquationID,
  kpiEquation,
  sosType;

var KPIYear = "",
  KPIMonth = '',
  KPIQuarter = '',
  KPIMid = '',
  KPIYearHandler = '';
// KpiYears = [];

var kpiFromYear = '',
  kpiToYear = '',
  PeriodType = "";

var kpiName = ''

var projRelatedInit = '', initiativeDelevrableArr = [], initiativeMilestoneVal = '';

var relatedMainGoal = '', relatedSubGoal = '', indexTypekpi = '', relatedStrategyKpi = '';

var globalInitiativeCode = '';

// handle previous kpi info
var targetYear = new Date().getFullYear(), targetActualValue = '', targetPerformanceAnalysis = '', targetPerioudType = '', targetPerioudTypeValue = '';
//

window.kpiEquationsComponents = [];

// window.portfolioCreatedBy;
var relatedPiller = ''
if (
  localStorage.getItem("lng") == null ||
  localStorage.getItem("lng") == "ar"
) {
  var No_Data = "لا يوجد";
} else {
  var No_Data = "No Data";
}
if (
  localStorage.getItem("lng") == null ||
  localStorage.getItem("lng") == "ar"
) {
  var enternameemail = Resources.ar["enternameemail"];
} else {
  var enternameemail = Resources.en["enternameemail"];
}
//Start of calls
var departmenetValue;
var budgetitemValue;

window.relatedToProject = [
  { listName: "Issues", RelatedItem: "ProjectCode" },
  { listName: "Risks", RelatedItem: "ProjectCode" },
  { listName: "Deliverables", RelatedItem: "ProjectCode" },
  { listName: "Milestones", RelatedItem: "ProjectCode" },
  { listName: "Stakeholders", RelatedItem: "ProjectCode" },
  { listName: "Contracts", RelatedItem: "ProjectCode" },
  { listName: "Tasks", RelatedItem: "ProjectCode" },
  { listName: "Change Request", RelatedItem: "ProjectCode" },
  { listName: "Closure Form", RelatedItem: "ProjectCode" },
  { listName: "Communication Plans", RelatedItem: "ProjectCode" },
  { listName: "Deliveries", RelatedItem: "ProjectCode" },
  { listName: "Invoices", RelatedItem: "ProjectCode" },
  { listName: "Lessons Learned", RelatedItem: "ProjectCode" },
  { listName: "Closure Form", RelatedItem: "ProjectCode" },
  { listName: "MOM", RelatedItem: "ProjectCode" },
  { listName: "Project Stages", RelatedItem: "ProjectCode" },

  //documents + mom to delete action item related to it
];

window.relatedToIdea = [{ listName: "Tasks", RelatedItem: "ProjectCode" }];



window.Edit_Data_Request = {
  onSuccess: function (sender, args) {
    var pillersRadio = ''
    if (listkey == 'kpiequations') {
      //  (!isAdmin || !isSPMTeam )? window.location = _spPageContextInfo.webAbsoluteUrl : '';

      if (isAdmin || isMinister || isBITeam || isSPMTeam || isPerformanceLeader || isSPMAdmin || isVROP || isLMSP) {
      } else {
        window.location = _spPageContextInfo.webAbsoluteUrl
      }
    }

    if (listkey == "initiatives") {

      var typeValue = $("#Types option:selected").val();
      if (typeValue == "vision") {
        $("#RelatedBudgetItem , #ProgramTotalCost ,#RelatedKPI")
          .parent()
          .css("display", "block");
      } else {
        $("#RelatedBudgetItem , #ProgramTotalCost, #RelatedKPI").parent().css("display", "none");
      }

      if (isNew || isEdit) {

        $("#Types").on("change", function () {
          var typeValueafterchange = $("#Types option:selected").val();
          if (typeValueafterchange == "vision") {
            $("#RelatedBudgetItem , #ProgramTotalCost , #RelatedKPI")
              .parent()
              .css("display", "block");
          } else {
            $("#RelatedBudgetItem , #ProgramTotalCost, #RelatedKPI")
              .parent()
              .css("display", "none");
          }
        });
      }
    }
    // if(oListItem.get_item('DeletionStatus') && oListItem.get_item('DeletionStatus').toLowerCase()  == 'deleted'){
    //     window.location = _spPageContextInfo.webAbsoluteUrl;
    // }
    $("h2.DahsFormTitle").text(PageTitle);

    //window.pemail;
    // $('h2.DahsFormTitle').append(' - " '+oListItem.get_item('Project_Name')+' "');

    $(
      ".section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.dont-request)> input:not([type=file]), .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.dont-request)> input[type=checkbox],.section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.dont-request)> div[type=multipicker], .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.dont-request)> div[type=picker], .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.dont-request)> select[type=dropdown], .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.dont-request)>  textarea,.section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.dont-request)> .datetimeinputs input[type=date], .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.dont-request)> .datetimeinputs input[type=datetime-local], .section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.dont-request) > .multiselect-container"
    ).each(function () {

      switch ($(this).attr("type")) {
        case "date":
          var d =
            oListItem.get_item("" + $(this).attr("id") + "") == null
              ? "empty"
              : oListItem.get_item("" + $(this).attr("id") + "");
          if (d != "empty") {
            var local = d.getTime();
            var offset = d.getTimezoneOffset() * (60 * 1000);
            var utc = new Date(local + offset);
            var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
            var datetouse = riyadh
              .toLocaleString("en-US")
              .split(",")[0]
              .split("/");
            datetouse[0] =
              datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
            datetouse[1] =
              datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
            var datetouse2 =
              datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];
            if ($(this).hasClass("withTime")) {
              var hour = d.getHours();
              var minutes = d.getMinutes();
              var timehour = hour + ":" + minutes + ":00";
              $("#Time").val("" + timehour);
            }
          }
          $(this).val(datetouse2);
          break;

        case "datetime-local":
          var d =
            oListItem.get_item("" + $(this).attr("id") + "") == null
              ? "empty"
              : oListItem.get_item("" + $(this).attr("id") + "");
          if (d != "empty") {
            var riyadh = new Date(d.getTime());
            var year = riyadh.getFullYear();
            var month = riyadh.getMonth() + 1;
            var day = riyadh.getDate();
            var hour = riyadh.getHours();
            var minutes = riyadh.getMinutes();
            month = ((month.toString().length == 1) ? ('0' + month) : month);
            day = ((day.toString().length == 1) ? ('0' + day) : day);
            hour = ((hour.toString().length == 1) ? ('0' + hour) : hour);
            minutes = ((minutes.toString().length == 1) ? ('0' + minutes) : minutes);
            var datetouse2 = year + '-' + month + '-' + day + 'T' + hour + ':' + minutes;
          }
          $(this).val(datetouse2);
          break;

        case "picker":
          var pemail =
            oListItem.get_item("" + $(this).attr("id") + "") == null
              ? enternameemail
              : oListItem
                .get_item("" + $(this).attr("id") + "")
                .get_lookupValue();
          $(this).attr("data-email", pemail);

          if (pemail != enternameemail)
            $(this).attr(
              "user-email",
              oListItem.get_item($(this).attr("id")).get_email()
            );

          var idinternal = $(this).attr("id");
          var mp = new MyPeoplePicker();
          mp.init($(this).attr("id"), { AllowMultipleValues: false });
          break;
        case "multipicker":

          var pemail =
            oListItem.get_item("" + $(this).attr("id") + "") == null
              ? enternameemail
              : oListItem
                .get_item("" + $(this).attr("id") + "");

          var userItems = [];
          pemail.forEach(function (element) {
            userItems.push(element.get_lookupValue());
          })

          $(this).attr("data-email", userItems.join(", "));

          var mp = new MyPeoplePicker();
          mp.init($(this).attr("id"), { AllowMultipleValues: true });
          break;
        case "dropdown":

          $(this).val(oListItem.get_item($(this).attr("id")));

          $(this).attr('value', oListItem.get_item($(this).attr("id"))) // save the value in select to use it edit select[dynamic=parent]

          if ($(this).attr("id") == "SubSector") {
            departmenetValue = oListItem.get_item("" + $(this).attr("id") + "");
          }
          if ($(this).attr("id") == "BudgetItem") {
            budgetitemValue = oListItem.get_item("" + $(this).attr("id") + "");
          }

          break;

        case "radio":
          var radioval = oListItem.get_item($(this).attr("id"));
          // to handle the master details section show and hide
          if (listkey == 'goalstrategy') {
            pillersRadio = radioval
          }
          if (radioval == "Yes" || radioval == "yes") {
            $('input[id="' + $(this).attr("id") + '"]')
              .filter('[value="yes"]')
              .attr("checked", true);
          } else if (
            radioval == "No" ||
            radioval == "no" ||
            radioval == "undefined" ||
            radioval == null
          ) {
            $('input[id="' + $(this).attr("id") + '"]')
              .filter('[value="no"]')
              .attr("checked", true);
          } else
            $('input[id="' + $(this).attr("id") + '"]')
              .filter(
                '[value="' + oListItem.get_item($(this).attr("id")) + '"]'
              )
              .attr("checked", true);
          break;

        case "checkbox":
          if (oListItem.get_item($(this).attr("id")))
            $(this).prop("checked", true);
          break;

        case "multiselect":

          if (oListItem.get_item($(this).attr('myfield'))) {
            var myselections = oListItem.get_item($(this).attr('myfield')).split(':::');

            initiativeDelevrableArr = myselections // to use it in edit page to get the data checked
            for (var i = 0; i < myselections.length; i++) {
              $(this).find("input:checkbox[value='" + myselections[i] + "']").prop("checked", true);
            }
          }
          break;

        case "number":
          if ($(this).hasClass("percentagefield")) {
            var num = oListItem.get_item($(this).attr("id")) * 100;
            if (num % 1 != 0)
              $(this).val(parseFloat(Math.round(num * 100) / 100).toFixed(2));
            else $(this).val(num);
          } else {
            $(this).val(oListItem.get_item("" + $(this).attr("id") + ""));
          }
          break;

        default:
          $(this).val(oListItem.get_item("" + $(this).attr("id") + ""));
          break;
      }
    });

    //checking field ownership
    $('[data-editableby]').each(function () {
      let keyOwner = $(this).data('editableby');
      let itemOwner = oListItem.get_item(keyOwner) ? oListItem.get_item(keyOwner).get_lookupValue() : null;
      let isItDisabled = (itemOwner != UserN.Title) && !isAdmin && !isMinister && !isBITeam && !isSPMTeam ? true : false;
      $(this).find('>*').prop('disabled', isItDisabled);
    });
    $("input[type=date]:not([minimumdate=undefined])").each(function () {
      window.start = $("#" + $(this).attr("minimumdate"));
      window.end = $(this);
      if (start.val()) end.attr("min", start.val());
      if (end.val()) start.attr("max", end.val());
    });
    $("input:disabled, select:disabled,textarea:disabled").each(function () {
      if ($(this).val != "") {
        $(this).addClass("disabledWithValue");
      }
    });

    $("input.number").each(function (event) {
      // skip for arrow keys
      if (event.which >= 37 && event.which <= 40) return;
      // format number
      $(this).val(function (index, value) {
        return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      });
    });
    //handle top menu navigation
    if (SP_ListName == ListArray[0].projects) {
      PCODE = oListItem.get_item("Title");
      $(".headtwo").append(
        '<a class="" href="' +
        _spPageContextInfo.webServerRelativeUrl +
        "/SitePages/ProjectHome.aspx?PCODE=" +
        PCODE +
        '"><span class="litem">Project Home</span></a>'
      );
      $("select#BudgetItem").change();
    }
    if (listkey == "risks" && oListItem.get_item("Status") == "movedtoissue") {
      window.location =
        _spPageContextInfo.siteServerRelativeUrl +
        "/SitePages/Listing.aspx?ListKey=" +
        listkey;
    }
    if (listkey == "projectcharter" && PCODE) {

      $("[data-target_list] .fieldset-container").append(
        '<div class="add-New-Detail-wrapper"><a class="add-New-Detail" href="javascript:"></a></div>'
      );
      // $("i.fas.fa-plus").css("display", "none");mahmoud
      var relatedInitval = $("#RelatedInitiative").val();

      if (relatedInitval) {
        // $("i.fas.fa-plus").css("display", "none");
        RelatedInitiative_Data_Request.init(relatedInitval);
      }


    }
    if (listkey == "portfolio" || listkey == "budgetitems") {
      CreatedBy = oListItem.get_item("Author").get_lookupValue();
      if (isEdit && CreatedBy !== UserN.Title) {
        $(".btn-delete").remove();
        $(".btn-save").remove();
        $(".container-body").prepend(
          '<div class="errormsg alert"><span class="infoIcon"><i class="fas fa-info-circle"></i></span><span>' +
          editablebyowneronly +
          "</span></div>"
        );
        $(".form-control.SPIField").attr("disabled", true);
      }
    }
    if (listkey == "budgetitems") {
      Edit_Data_Request.g.budgetitem();
    }
    if (listkey == "initiatives") {
      Edit_Data_Request.g.showFieldsIfInitiativeVision();

      var type = $('#Types').val()
      Initiative_Sos.init("SOs", type); //get related sos depends on type
      if (type == "vision") {
        Initiative_Strategy_Sos.init("SOs")
      }

      relatedObjInit = oListItem.get_item("RelatedObjective") ? oListItem.get_item("RelatedObjective") : ''

      var sector = oListItem.get_item("Sector") ? oListItem.get_item("Sector") : '';
      if (sector) {
        Department_Sector_Info.init(sector);// to get the departments related to sector
      }

    }
    if (listkey == 'sos') {
      var relatedStrategy = $('#RelatedStrategy').val()
      relatedPiller = oListItem.get_item("PillarName")

      Goal_Strategy_Info.init(relatedStrategy)

      var sector = oListItem.get_item("Sector") ? oListItem.get_item("Sector") : '';
      if (sector) {
        Department_Sector_Info.init(sector);// to get the departments related to sector
      }
    }
    if (listkey == 'deliverables' && PCODE) {
      var Delivered = $('#Delivered:checked').val();

      if (Delivered == 'yes') {
        $('#DeliveredDate').attr('required', 'required');
        $('#DeliveredDate').parent().attr('required', 'required');
        $('#DeliveredDate').prev('label').attr('required', 'required');
      } else {
        $('#DeliveredDate').attr('disabled', true);
      }
    }

    if (listkey == 'goalstrategy') {
      var PillarsExist = $('#PillarsExist:checked').val();
      // console.log(Delivered, "ddddddddddddd")

      if (PillarsExist == 'yes') {
        $('[data-target_list="SPillars"] #Name').attr('required', 'required');
        $('[data-target_list="SPillars"] #Name').parent().attr('required', 'required');
        $('[data-target_list="SPillars"] #Name').prev('label').attr('required', 'required');
      } else {
        $('[data-target_list="SPillars"] #Name').prop('required', false);
      }
    }


    if (listkey == "mainkpi") {
      if (isVROP) {
        // $('#Types').val('vision'); // comminted to get the value as saved on list (for Vrop value saved Main)
        $('#Types').prop('disabled', true);
      }
      KPICode = oListItem.get_item("Title");
      kpiCodeResult = oListItem.get_item("Title")
      KPIYear = oListItem.get_item("Year")
      KPIMonth = oListItem.get_item("Months") ? oListItem.get_item("Months") : '';
      KPIQuarter = oListItem.get_item("Quarter") ? oListItem.get_item("Quarter") : '';
      KPIMid = oListItem.get_item("Midterms") ? oListItem.get_item("Midterms") : '';
      KPIYearHandler = oListItem.get_item("Years") ? oListItem.get_item("Years") : '';
      kpiFromYear = oListItem.get_item("FromDate") ? oListItem.get_item("FromDate") : '';
      kpiToYear = oListItem.get_item("ToDate") ? oListItem.get_item("ToDate") : ''
      PeriodType = oListItem.get_item("PeriodType") ? oListItem.get_item("PeriodType") : ''

      relatedMainGoal = oListItem.get_item("RelatedStrategyObjective") ? oListItem.get_item("RelatedStrategyObjective") : '';
      relatedSubGoal = oListItem.get_item("SubRelatedObjective") ? oListItem.get_item("SubRelatedObjective") : '';
      relatedStrategyKpi = oListItem.get_item("RelatedStrategy") ? oListItem.get_item("RelatedStrategy") : '';
      indexTypekpi = oListItem.get_item("Types") ? oListItem.get_item("Types") : '';

      if (relatedStrategyKpi && indexTypekpi) {
        Kpi_Related_Goal.init(relatedStrategyKpi, indexTypekpi)
        setTimeout(function () {
          Check_Item_Deleted.init('GoalStrategy', relatedStrategyKpi, 'Title') // check if GoalStrategy deleted hide the related val
        }, 2000)
      }


      $("#Year").html(
        '<option data-trans-yeartype class="Resources" value="" selected="" disabled=""></option>'
      );

      for (var i = kpiFromYear; i <= kpiToYear; i++) {
        $("#Year").append(
          '<option value="' + i + '">' +
          i +
          "</option>"
        );
      }

      $('#Year').val(oListItem.get_item("Year") ? oListItem.get_item("Year") : '')

      equationKPI.init();


      if (isSPMAdmin) {
        $('#Year').prop('disabled', true);
      }


      // to handle the relates strategy
      // var relatedStrategyCode = $('#RelatedStrategy').val()
      // var indexType = $('#Types').val();
      // Goal_Strategy_Info.init(relatedStrategyCode)
      // Kpi_Related_Goal.init(relatedStrategyCode, indexType)
      //
    }
    if (listkey == "goalstrategy") {
      if (isVROP) {
        $('#Types').val('vision');
        $('#Types').prop('disabled', true);
      }
    }
    if (listkey == "projects" && PCODE) {

      projRelatedInit = oListItem.get_item("RelatedInitiative");

      globalInitiativeCode = projRelatedInit

      Check_Item_Deleted.init('Initiatives', projRelatedInit, 'Title') // check if initiative deleted hide the related delev

      var sector = oListItem.get_item("Sector") ? oListItem.get_item("Sector") : '';
      if (sector) {
        Department_Sector_Info.init(sector);// 
      }
    }

    if (listkey == 'milestones' && PCODE) {
      initiativeMilestoneVal = oListItem.get_item('RelatedInitiativeMilestone') ? oListItem.get_item('RelatedInitiativeMilestone') : ''
      Get_ProjectData_ByCode.init()
    }
    if (listkey == "deliverables" || listkey == 'milestones' || listkey == 'initiativedeliverables' || listkey == 'initiativemilestones') {
      if ($("[data-targetelem]").length > 0) {

        var parentValue = $('#Amount').data('parentval')
        var weight = oListItem.get_item("Weight");
        weight = Number(weight)
        var Amount = (weight * parentValue) / 100
        Amount = Amount.toFixed(2)
        $('#Amount').val(Amount)
      }
    }
    //}

    if (isVROE) {
      if (listkey == "initiatives") {
        $('#Types').val('vision');
        $('#Types').prop('disabled', true);
      }
    }
    if (isNew && isEPMO) {
      if (listkey == "initiatives") {
        $('#Types').val('strategically');
        $('#Types').prop('disabled', true);
      }
    }
    if (isEdit && isEPMO) {
      if (listkey == "initiatives") {
        // $('#Types').val('strategically');
        $('#Types').prop('disabled', true);
      }
    }
    if (Groups.includes("Strategy Specialist") || isVROP) {
      if (listkey == "sos") {
        $('#Types').val('main');
        $('#Types').prop('disabled', true);
      }
    }
    if (isSPMAdmin) {
      if (listkey == "sos") {
        $('#Types').val('sub');
        $('#Types').prop('disabled', true);
        $("#RelatedObjective").parent().css("display", "block");
      }
    }

    ///////////////////////////
    // to handle the title change and the master details section show and hide
    if (isEdit && listkey == 'goalstrategy') {
      if ($('#Types').val() == 'vision') {
        if ($("[data-section_type]").length > 0) {
          $("[data-section_type]").each(function () {
            if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
              $(this).find("label[for=Name]").html('البرنامج الاستراتيجي')
              $(this).find("#Name").attr("placeholder", "البرنامج الاستراتيجي")
              $(this).find(".sideTitle").html("البرامج الاستراتيجية")
              $(document).find("label[for=PillarsExist]").html('هل يوجد برامج؟')
            } else {
              $(this).find("label[for=Name]").html('Strategy Program')
              $(this).find("#Name").attr("placeholder", "Strategy Program")
              $(this).find(".sideTitle").html("Strategy Programs")
              $(document).find("label[for=PillarsExist]").html('Is Programs Exist?')
            }
          })
        }
      } else {
        if ($("[data-section_type]").length > 0) {
          $("[data-section_type]").each(function () {
            if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
              $(this).find("label[for=Name]").html('المحور الاستراتيجي')
              $(this).find("#Name").attr("placeholder", "المحور الاستراتيجي")
              $(this).find(".sideTitle").html("المحاور الاستراتيجية")
              $(document).find("label[for=PillarsExist]").html('هل يوجد محاور؟')
            } else {
              $(this).find("label[for=Name]").html('Name')
              $(this).find("#Name").attr("placeholder", "Name")
              $(this).find(".sideTitle").html("Strategy pillars")
              $(document).find("label[for=PillarsExist]").html('Is Pillars Exist?')
            }
          })
        }
      }
      if ($('#Types').val() == 'vision' || $('#Types').val() == 'ministry') {

        if (pillersRadio == 'yes') {
          $("[data-section_type]").show()
        } else {
          $("[data-section_type]").hide()
        }
      } else {
        $("[data-section_type]").hide()
      }


      // })
    }
    ////////////////////////

    //hide show fields based on selection & onload

    $("[data-togglevalues]").each(function () {
      ListInfo.g.toggleFields($(this));
    });

    // trigger the dynamic parent field to get the data in edit
    $("select[dynamic=parent]").trigger("change")


    // to get the value of weight in delivrable correct in edit
    $("[data-weightvalue]").each(function () {
			var elementId = $(this).attr('id')
			var inputVal = oListItem.get_item(elementId) ? oListItem.get_item(elementId) : 0
			var remainingBudget = $(this).attr('max')
			remainingBudget = Number(remainingBudget)
			var newVal = remainingBudget + inputVal >= 100 ? inputVal : remainingBudget + inputVal;
			newVal = Number(newVal.toFixed("2"));

			remainingBudget == 100 ? $(this).attr("max", remainingBudget) : $(this).attr("max", newVal);
		})



    //getting related files
    // var host = _spPageContextInfo.webAbsoluteUrl;
    var host = (_spPageContextInfo.webServerRelativeUrl = "/"
      ? ""
      : _spPageContextInfo.webServerRelativeUrl);

    if (PCODE || ICODE) {
      getfolderurl =
        host + "/" + ListArray[2].documents + "/" + PCODE + "/" + listkey;
      DocumentLibraryName = PCODE ? ListArray[2].documents : "Initiative Documents";
    } else {
      getfolderurl = host + "/" + listkey + " Documents/";
      DocumentLibraryName = listkey + " Documents";
    }
    // if (listkey == 'projects') {
    //     BudgetItem_Sector_Info.init($('#Sector').val());
    //     Department_Sector_Info.init($('#Sector').val());
    // }
    // ViewAllFiles.init();
    ViewAllFiles_Main_Strategy.init();

    if (MasterDetailsArrayRequest.length > 0) {
      Master_Details_Request.init(MasterDetailsArrayRequest[0]);
      MasterDetailsArrayRequest.shift(); //remove 0 index
    }
    $(".form-control:disabled").each(function () {
      if ($(this).val() != "") {
        $(this).parent().addClass("autofill");
      }
    });
    $(".PPField[disabled]").each(function () {
      if ($(this).text() != enternameemail) {
        $(this).addClass("autofill");
      }
    });
    if ($('.PPField.SPIField.form-control').attr('disabled') == "disabled") {
      $('input.sp-peoplepicker-editorInput').prop('disabled', true);
    }
    $(".loader-box").fadeOut();

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(SP_ListName);
    Edit_Data_Request.g.oListItem = oList.getItemById(IID); //declared inside object scope only
    oListItem = Edit_Data_Request.g.oListItem;
    clientContext.load(Edit_Data_Request.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Edit_Data_Request.onSuccess),
      Function.createDelegate(this, Edit_Data_Request.onError)
    );
  },
  // Global variables
  g: {
    append: function () {
      const logo = require("../../../HelperRessources/img/main-logo.png");
      $(".o365cs-nav-header16 .o365cs-nav-o365Branding").html(
        '<div class="Logo"><a href=""><img class="img-Logo" src="' +
        logo +
        '"></a></div>'
      );
      $(".o365cs-nav-centerAlign").append(
        '<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="10"></i><a href="#">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="10"></i><a href="#">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="30"></i><a href="#">Issues</a></span></div><div class="UProfile"></div></div>'
      );
    },
    budgetitem: function () {
      $("#From, #To").on("change", function () {
        var yearFrom = $("#From").val() ? $("#From").val().split("-")[0] : "",
          dateFromFull = $("#From").val(),
          yearTo = $("#To").val() ? $("#To").val().split("-")[0] : "";
        var yearDiff = yearTo ? parseInt(yearTo) - parseInt(yearFrom) + 1 : "";
        yearFrom = parseInt(yearFrom) + 4;

        if (yearFrom) {
          $("#To")
            .attr("max", String(yearFrom) + "-12-31")
            .attr("min", dateFromFull)
            .prop("disabled", false);
          if (yearDiff) {
            $("[id^=Cost]").parent().hide();
            $("[id^=Cost]").val("");
            $("#Amount").val("");
            var yeartodisp;
            for (var i = 1; i <= yearDiff; i++) {
              yeartodisp = yearFrom - 5 + i;
              $("#Cost" + i)
                .parent()
                .show();
              if (
                localStorage.getItem("lng") == null ||
                localStorage.getItem("lng") == "ar"
              ) {
                var label =
                  $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text()
                    .indexOf("لعام") > -1
                    ? $("#Cost" + i)
                      .parent()
                      .find("label")
                      .text()
                      .split("لعام")[0] +
                    " لعام " +
                    yeartodisp
                    : $("#Cost" + i)
                      .parent()
                      .find("label")
                      .text() +
                    " لعام " +
                    yeartodisp;
              } else {
                var label =
                  $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text()
                    .indexOf("For Year") > -1
                    ? $("#Cost" + i)
                      .parent()
                      .find("label")
                      .text()
                      .split("For Year")[0] +
                    " For Year " +
                    yeartodisp
                    : $("#Cost" + i)
                      .parent()
                      .find("label")
                      .text() +
                    " For Year " +
                    yeartodisp;
              }
              $("#Cost" + i)
                .parent()
                .find("label")
                .text(label);
            }
          }
        } else {
          $("#To")
            .val("")
            .attr("max", "")
            .attr("min", "")
            .prop("disabled", true);
          $("[id^=Cost]").parent().hide();
          $("[id^=Cost]").val("");
          $("#Amount").val("");
        }
      });
      var yearFrom = $("#From").val() ? $("#From").val().split("-")[0] : "",
        dateFromFull = $("#From").val(),
        yearTo = $("#To").val() ? $("#To").val().split("-")[0] : "";
      var yearDiff = yearTo ? parseInt(yearTo) - parseInt(yearFrom) + 1 : "";
      yearFrom = parseInt(yearFrom) + 2;
      if (yearFrom) {
        $("#To")
          .attr("max", String(yearFrom) + "-12-31")
          .attr("min", dateFromFull)
          .prop("disabled", false);
        if (yearDiff) {
          $("[id^=Cost]").parent().hide();
          var yeartodisp;
          for (var i = 1; i <= yearDiff; i++) {
            yeartodisp = yearFrom - 3 + i;
            $("#Cost" + i)
              .parent()
              .show();
            if (
              localStorage.getItem("lng") == null ||
              localStorage.getItem("lng") == "ar"
            ) {
              var label =
                $("#Cost" + i)
                  .parent()
                  .find("label")
                  .text()
                  .indexOf("لعام") > -1
                  ? $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text()
                    .split("لعام")[0] +
                  " لعام " +
                  yeartodisp
                  : $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text() +
                  " لعام " +
                  yeartodisp;
            } else {
              var label =
                $("#Cost" + i)
                  .parent()
                  .find("label")
                  .text()
                  .indexOf("For Year") > -1
                  ? $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text()
                    .split("For Year")[0] +
                  " For Year " +
                  yeartodisp
                  : $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text() +
                  " For Year " +
                  yeartodisp;
            }
            $("#Cost" + i)
              .parent()
              .find("label")
              .text(label);
          }
        }
      } else {
        $("#To").val("").attr("max", "").attr("min", "").prop("disabled", true);
        $("[id^=Cost]").parent().hide();
      }
    },
    showFieldsIfInitiativeVision: function () {
      var typeValue = $("#Types option:selected").val();
      if (typeValue == "vision") {
        $("#RelatedBudgetItem , #ProgramTotalCost,#RelatedKPI")
          .parent()
          .css("display", "block");
      } else {
        $("#RelatedBudgetItem , #ProgramTotalCost,#RelatedKPI").parent().css("display", "none");
      }
      if (isNew || isEdit) {

        $("#Types").on("change", function () {
          var typeValueafterchange = $("#Types option:selected").val();
          if (typeValueafterchange == "vision") {
            $("#RelatedBudgetItem , #ProgramTotalCost , #RelatedKPI")
              .parent()
              .css("display", "block");
          } else {
            $("#RelatedBudgetItem , #ProgramTotalCost , #RelatedKPI")
              .parent()
              .css("display", "none");
          }
        });
      }
    }
  },
};
//RelatedIdeaProject
window.RelatedIdeaProject = {
  onSuccess: function (sender, args) {
    var collListItem = RelatedIdeaProject.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var ProjectId, ProjectCode;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      ProjectId = oListItem.get_id();
      ProjectCode = oListItem.get_item("Title");
    }
    if (ProjectCode) {
      projectLink =
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/ProjectHome.aspx?PCODE=" +
        ProjectCode;
      $(".ideas").prepend(
        '<div class="relatedcode"><span data-trans-relatedproject class="Resources"></span> : <a href="' +
        projectLink +
        '" target="_blank">' +
        ProjectCode +
        "</a></div>"
      );
    }
    changeResources();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".ideas").length) {
      RelatedIdeaProject.init();
    }
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Projects");
    var camlQuery = new SP.CamlQuery();
    var IdeaId = $("#Title").text();
    var IQUERY =
      "<View><Query><Where><Eq><FieldRef Name='RelatedIdeaCode'/><Value Type='Text'>" +
      IdeaId +
      "</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>";
    camlQuery.set_viewXml(IQUERY);
    RelatedIdeaProject.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(RelatedIdeaProject.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, RelatedIdeaProject.onSuccess),
      Function.createDelegate(this, RelatedIdeaProject.onError)
    );
  },
  // Global variables
  g: {},
};
window.View_Data_Request = {
  onSuccess: function (sender, args) {
    var strategyType = ''
    var pillersRadio = ''

    $(
      ".section-container:not([data-target_list]) .CFIELD:not(.dont-submit):not(.dont-request) > .viewmode-value"
    ).each(function () {

      if ($(this).attr("type") == "date") {
        var d =
          oListItem.get_item("" + $(this).attr("id") + "") == null
            ? "empty"
            : oListItem.get_item("" + $(this).attr("id") + "");
        if (d != "empty") {
          var local = d.getTime();
          var offset = d.getTimezoneOffset() * (60 * 1000);
          var utc = new Date(local + offset);
          var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
          var datetouse = riyadh
            .toLocaleString("en-US")
            .split(",")[0]
            .split("/");
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

          if ($(this).hasClass("withTime")) {
            var hour = d.getHours();
            var minutes = d.getMinutes();
            var meridian;
            if (hour > 12) {
              meridian = "PM";
              hour -= 12;
              hour = ((hour.toString().length == 1) ? ('0' + hour) : hour);
              minutes = ((minutes.toString().length == 1) ? ('0' + minutes) : minutes);
            } else if (hour < 12) {
              meridian = "AM";
              if (hour == 0) {
                hour = 12;
                hour = ((hour.toString().length == 1) ? ('0' + hour) : hour);
                minutes = ((minutes.toString().length == 1) ? ('0' + minutes) : minutes);
              }
            } else {
              meridian = "PM";
            }
            var timehour = hour + ":" + minutes + "  " + meridian;
            $("#time").text(timehour);
          }

          $(this).text(datetouse2);
        } else {
          $(this).text(No_Data);
        }
      } else if ($(this).attr("type") == "picker") {
        var pp =
          oListItem.get_item("" + $(this).attr("id") + "") == null
            ? No_Data
            : oListItem
              .get_item("" + $(this).attr("id") + "")
              .get_lookupValue();
        $(this).text(pp);
        if (pp != UserNo_Data)
          $(this).attr(
            "user-email",
            oListItem.get_item($(this).attr("id")).get_email()
          );
      }
      else if ($(this).attr("type") == "multipicker") {

        var pp =
          oListItem.get_item("" + $(this).attr("id") + "") == null
            ? No_Data
            : oListItem
              .get_item("" + $(this).attr("id") + "");

        usersItems = "";

        if (pp != No_Data) {
          pp.forEach(function (element) {
            usersItems += '<div>' + element.get_lookupValue() + '</div>';
          })
        }
        $(this).html(usersItems);
      }
      else if ($(this).attr("type") == "dropdown") {
        var value =
          oListItem.get_item("" + $(this).attr("id") + "") == null
            ? No_Data
            : oListItem.get_item("" + $(this).attr("id") + "");
        // $(this).text(value);
        if (listkey == 'goalstrategy') {
          // to handle the title change
          if ($(this).attr("id") == 'Types') {
            strategyType = value
          }
        }
        if (listkey == 'sos') {
          // to handle the title change
          if ($(this).attr("id") == 'Types') {
            sosType = value;
            // console.log(sosType, 'sosTypeeeeeeeeee')
          }
        }


        if (value == No_Data) {
          $(this).text(No_Data);
        } else if (value == true) {
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            $(this).text(Resources.ar["yes"]);
          } else $(this).text(Resources.en["yes"]);
        } else if (value == false) {
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            $(this).text(Resources.ar["no"]);
          } else $(this).text(Resources.en["no"]);
        } else {
          if (listkey == 'mainkpi' && $(this).attr("id") == 'Year') { // view the year value in main kpi view
            $(this).text(value)
          } else if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            $(this).text(Resources.ar[value.toLowerCase()]);
          } else $(this).text(Resources.en[value.toLowerCase()]);
        }
      } else if ($(this).attr("type") == "radio") {
        var radioval =
          oListItem.get_item("" + $(this).attr("id") + "") == null
            ? "no"
            : oListItem.get_item("" + $(this).attr("id") + "");
        // to handle the master details section show and hide
        if (listkey == 'goalstrategy') {
          pillersRadio = radioval
        }

        if (radioval == "Yes" || radioval == "yes" || radioval == true) {
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            $(this).text(Resources.ar["yes"]);
          } else $(this).text(Resources.en["yes"]);
        } else if (radioval == "No" || radioval == "no" || radioval == false) {
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            $(this).text(Resources.ar["no"]);
          } else $(this).text(Resources.en["no"]);
        } else $(this).text(radioval);
      } else if ($(this).attr("type") == "checkbox") {
        var value =
          oListItem.get_item("" + $(this).attr("id") + "") == null
            ? No_Data
            : oListItem.get_item("" + $(this).attr("id") + "");
        if (value)
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            $(this).text(Resources.ar["yes"]);
          } else $(this).text(Resources.en["yes"]);
        else {
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            $(this).text(Resources.ar["no"]);
          } else $(this).text(Resources.en["no"]);
        }
      } else if ($(this).attr("type") == "percentage") {
        var num =
          oListItem.get_item("" + $(this).attr("id") + "") == null
            ? No_Data
            : oListItem.get_item($(this).attr("id")) * 100;
        if (num % 1 != 0)
          $(this).text(parseFloat(Math.round(num * 100) / 100).toFixed(2));
        else $(this).text(num);
      } else if (
        $(this).attr("type") == "number" ||
        $(this).attr("type") == "float"
      ) {
        var value =
          oListItem.get_item("" + $(this).attr("id") + "") == null
            ? No_Data
            : oListItem.get_item("" + $(this).attr("id") + "");

        $(this).text(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      } else if ($(this).attr("type") == "multiselect") {
        var valfieldkey = $(this).data("valfieldkey"),
          Dispfieldkey = $(this).data("dispfieldkey"),
          listname = $(this).data("listname"),
          $this = $(this);

        var value =
          oListItem.get_item("" + $(this).attr("id") + "") == null
            ? No_Data
            : oListItem
              .get_item("" + $(this).attr("id") + "")
              .split(":::")

        var customquerymulti =
          '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><In><FieldRef Name="' + valfieldkey + '" /><Values>';
        for (var i = 0; i <= value.length; i++) {
          customquerymulti += '<Value Type="Text">' + value[i] + '</Value>';
        }
        customquerymulti += "</Values></In></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>100</RowLimit></View>";



        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          listname,
          customquerymulti,
          [valfieldkey, Dispfieldkey],
          function (records, record, listItem, isDone) {
            if (isDone) {
              var items = ''
              console.log("ASddsadasdsadas")
              records.forEach(function (el, index) {
                console.log(records, "RECOOOOOORED in render")
                items += el[Dispfieldkey] + '<br>'

              });
              $this.html(items);
            }
          }
        );
        //   var value =
        //     oListItem.get_item("" + $(this).attr("id") + "") == null
        //       ? No_Data
        //       : oListItem
        //         .get_item("" + $(this).attr("id") + "")
        //         .split(":::")
        //         .join("; <br>");

        //   $(this).html(value);

      } else if ($(this).attr("type") == "lookup") {
        var valfieldkey = $(this).data("valfieldkey"),
          Dispfieldkey = $(this).data("dispfieldkey"),
          listname = $(this).data("listname"),
          $this = $(this);

        if (oListItem.get_item($(this).attr("id")) == null) {
          // if (listkey == 'goalstrategy' && $(this).attr("id").toLowerCase() == 'ministry') {
          //   $(`#${ $(this).attr("id")}`).closest("div")
          //     .css("display", "none");
          // } else {
          $(this).html(No_Data);
          // }
        } else {
          customquery =
            '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="' +
            $(this).data("valfieldkey") +
            '" /><Value Type="Text">' +
            oListItem.get_item($(this).attr("id")) +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>";

          sphttp.get(
            _spPageContextInfo.siteServerRelativeUrl,
            listname,
            customquery,
            [valfieldkey, Dispfieldkey],
            function (records, record, listItem, isDone) {
              if (isDone) {
                records.forEach(function (el, index) {
                  $this.html(el[Dispfieldkey]);
                });
              }
            }
          );
        }
      } else {
        var value =
          oListItem.get_item("" + $(this).attr("id") + "") == null
            ? No_Data
            : oListItem.get_item("" + $(this).attr("id") + "");
        $(this).text(value);
      }
    });



    // if (listkey=='deliverables') { // tocheck where stage
    //   currentStageForItem = oListItem.get_item("Stage") ? oListItem.get_item("Stage") : ''
    // }

    if (listkey == 'projects') {

      var myselections = oListItem.get_item("RelatedInitiativeDeliverable") ? oListItem.get_item("RelatedInitiativeDeliverable").split(":::") : [] // to get the name of delivrable over the code
      var initiativeCode = oListItem.get_item("RelatedInitiative")
      initiativeDelevrableArr = myselections // to use it in view page to get the deliv Name

      if (initiativeCode) {
        globalInitiativeCode = initiativeCode // to use it after check if initiative deleted or not
        Check_Item_Deleted.init('Initiatives', initiativeCode, 'Title')

        // ProjectInitiativeDelevrable.init('InitiativeDeliverables', initiativeCode) // ocomment moved after check if initiative deleted or not
      }
    }


    if (isView && listkey == "ideas") {
      RelatedIdeaProject.preinit();
    }
    if (USERisWF) {
      $(".container-body .d-flex.btnactionrow").hide();
    }
    //handle top menu navigation
    if (SP_ListName == ListArray[0].projects) {
      PCODE = oListItem.get_item("Title");
      $(".headtwo").append(
        '<a class="" href="' +
        _spPageContextInfo.webServerRelativeUrl +
        "/SitePages/ProjectHome.aspx?PCODE=" +
        PCODE +
        '"><span class="litem">Project Home</span></a>'
      );
    }
    // window.checkNotificationHTML = setInterval(function() {
    //     GetProject_Info.preinit();
    // },1000);
    //custom
    ///
    if (listkey == 'deliverables' || listkey == 'milestones' || listkey == 'initiativedeliverables' || listkey == 'initiativemilestones') {
      
        var parentValue = $('#Amount').data('parentval')
        var weight = oListItem.get_item("Weight");
        weight = Number(weight)
        var Amount = (weight * parentValue) / 100
        Amount = Amount.toFixed(2)
        $('#Amount').text(Amount)
   
    }

    ////
    if (listkey == "budgetitems") {
      View_Data_Request.g.budgetitem();
    }
    if (listkey == "initiatives") {
      View_Data_Request.g.showFieldsIfInitiativeVision();
    }

    if (listkey == "risks" && oListItem.get_item("Status") == "movedtoissue") {
      $(".form-row.justify-content-end button").hide();
      $(".btn-to-issue").hide();
      $(".form-row.justify-content-end button").addClass("disablebtns");
    }
    if (!PCODE || isMinister || isBITeam) { // add isMinister to hide the btn for this role
      $(".btn-to-issue").hide();
    }
    if (listkey == "portfolio" || listkey == "budgetitems") {
      CreatedBy = oListItem.get_item("Author").get_lookupValue();
      if (isView && CreatedBy !== UserN.Title) {
        $(".btn-delete").remove();
        $(".btn-save").remove();
        $(".container-body").prepend(
          '<div class="errormsg alert"><span class="infoIcon"><i class="fas fa-info-circle"></i></span><span>' +
          editablebyowneronly +
          "</span></div>"
        );
      }
    }
    if (listkey == "mainkpi") {
      if (isVROP) {
        $('#Types').val('vision');
        $('#Types').prop('disabled', true);
      }
      KPICode = oListItem.get_item("Title");
      KPIYear = oListItem.get_item("Year");
      KPIMonth = oListItem.get_item("Months") ? oListItem.get_item("Months") : '';
      KPIQuarter = oListItem.get_item("Quarter") ? oListItem.get_item("Quarter") : '';
      KPIMid = oListItem.get_item("Midterms") ? oListItem.get_item("Midterms") : '';
      KPIYearHandler = oListItem.get_item("Years") ? oListItem.get_item("Years") : '';

      kpiFromYear = oListItem.get_item("FromDate") ? oListItem.get_item("FromDate") : '';
      kpiToYear = oListItem.get_item("ToDate") ? oListItem.get_item("ToDate") : ''
      PeriodType = oListItem.get_item("PeriodType") ? oListItem.get_item("PeriodType") : ''


      relatedStrategyKpi = oListItem.get_item("RelatedStrategy") ? oListItem.get_item("RelatedStrategy") : '';
      indexTypekpi = oListItem.get_item("Types") ? oListItem.get_item("Types") : '';
      if (relatedStrategyKpi && indexTypekpi) {
        Check_Item_Deleted.init('GoalStrategy', relatedStrategyKpi, 'Title') // check if GoalStrategy deleted hide the related item
      }
      equationKPI.init();
      $('#Year,#Months,#Quarter,#Midterms,#Years').removeAttr('required');

      if (PeriodType == 'monthly') {
        $('#Quarter,#Midterms,#Years').parent().hide();
      } else if (PeriodType == 'quarter') {
        $('#Months,#Midterms,#Years').parent().hide();
      } else if (PeriodType == 'midterm') {
        $('#Months,#Quarter,#Years').parent().hide();
      } else if (PeriodType == 'year') {
        $('#Months,#Quarter,#Midterms').parent().hide();
      }

    }
    if (listkey == "goalstrategy") {
      if (isVROP) {
        $('#Types').val('vision');
        $('#Types').prop('disabled', true);
      }
      var types = oListItem.get_item("Types") ? oListItem.get_item("Types") : ''

      // if(types == 'sub' || types == 'sectorial'){ // to hide the PillersExist
      //   $('#PillarsExist').parent().hide()
      // }
    }
    if (listkey == 'invoices' && PCODE) {
      DeliverableRelatedToInvoice = oListItem.get_item('Deliverable');
      if (DeliverableRelatedToInvoice) {
        var myselections = DeliverableRelatedToInvoice ? DeliverableRelatedToInvoice.split(":::") : [] // add myselection to handle mult delivrable in invoices
        // MultiSelect_View.init('Deliverables', myselections)
      }
    }
    if (listkey == 'milestones' && PCODE) { // add it on view to update the milestone when delete
      initiativeMilestoneVal = oListItem.get_item('RelatedInitiativeMilestone') ? oListItem.get_item('RelatedInitiativeMilestone') : ''
      Get_ProjectData_ByCode.init()
    }

    if (isVROE) {
      if (listkey == "initiatives") {
        $('#Types').val('vision');
        $('#Types').prop('disabled', true);
      }
    }
    if (isNew && isEPMO) {
      if (listkey == "initiatives") {
        $('#Types').val('strategically');
        $('#Types').prop('disabled', true);
      }
    }
    if (isEdit && isEPMO) {
      if (listkey == "initiatives") {
        // $('#Types').val('strategically');
        $('#Types').prop('disabled', true);
      }
    }

    var host = _spPageContextInfo.webAbsoluteUrl;
    if (PCODE || ICODE) {
      getfolderurl =
        host + "/" + ListArray[2].documents + "/" + PCODE + "/" + listkey;
      DocumentLibraryName = PCODE ? ListArray[2].documents : "Initiative Documents";
    } else {
      getfolderurl = host + "/" + listkey + " Documents/";
      DocumentLibraryName = listkey + " Documents";
    }
    if (isView && (listkey == "projects" || listkey == "ideas")) {
      UpcomingTasks_Info_Request.preinit();
    }

    ////////////////////////////////////////////////

    if (isView && listkey == 'goalstrategy') {
      // to handle the title change and the master details section show and hide
      if (strategyType == 'vision') {
        if ($("[data-section_type]").length > 0) {
          $("[data-section_type]").each(function () {
            if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
              $(this).find("label[for=Name]").html('البرنامج الاستراتيجي')
              // $(this).find("#Name").attr("placeholder", "البرنامج الاستراتيجي")
              $(this).find(".sideTitle").html("البرامج الاستراتيجية")
              $(document).find("label[for=PillarsExist]").html('هل يوجد برامج؟')
            } else {
              $(this).find("label[for=Name]").html('Strategy Program')
              // $(this).find("#Name").attr("placeholder", "Strategy Program")
              $(this).find(".sideTitle").html("Strategy Programs")
              $(document).find("label[for=PillarsExist]").html('Is Programs Exist?')
            }
          })
        }
      } else {
        if ($("[data-section_type]").length > 0) {
          $("[data-section_type]").each(function () {
            if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
              $(this).find("label[for=Name]").html('المحور الاستراتيجي')
              // $(this).find("#Name").attr("placeholder", "المحور الاستراتيجي")
              $(this).find(".sideTitle").html("المحاور الاستراتيجية")
              $(document).find("label[for=PillarsExist]").html('هل يوجد محاور؟')
            } else {
              $(this).find("label[for=Name]").html('Name')
              // $(this).find("#Name").attr("placeholder", "Name")
              $(this).find(".sideTitle").html("Strategy pillars")
              $(document).find("label[for=PillarsExist]").html('Is Pillars Exist?')

            }
          })
        }
      }
      if (strategyType == 'vision' || strategyType == 'ministry') {
        if (pillersRadio == 'yes') {
          $("[data-section_type]").show()
        } else {
          $("[data-section_type]").hide()
        }
      } else {
        $("[data-section_type]").hide()
      }
      // })
    }
    if (isView && listkey == 'sos') {
      if (sosType == 'main') {
        $('#RelatedPortfolio , #RelatedObjective , #RelatedJobStrategy').parent().hide();
        console.log('sostype', sosType);
      }
      else
        if (sosType == 'sub') {
          $('#RelatedPillar , #RelatedJobStrategy').parent().hide();
          console.log('sostype', sosType);

        }
        else
          if (sosType == 'vision') {
            $('#RelatedPillar , #RelatedPortfolio , #RelatedObjective , #RelatedJobStrategy').parent().hide();
            console.log('sostype', sosType);
          } else
            if (sosType == 'jobmarket') {
              $('#RelatedPillar , #RelatedPortfolio , #RelatedObjective').parent().hide();
              console.log('sostype', sosType);

            } else
              if (sosType == 'strategically') {
                $('#RelatedPillar , #RelatedPortfolio , #RelatedObjective , #RelatedJobStrategy').parent().hide();
                console.log('sostype', sosType);
              }
    }
    if (isView && listkey == 'goalstrategy') {
      if ((strategyType == 'sub') || (strategyType == 'sectorial')) {
        $('#PillarsExist').parent().hide();
        console.log('strategyType', strategyType);
      }
    }
    ////////////////////////////////////////////////
    // if(isView && listkey == 'goalstrategy'){
    // 	if($('#Ministry').html() == No_Data){
    // 		console.log("NOOOOOOOOOOOO DATA")
    // 	}
    // }

    // ViewAllFiles.init();
    // retrieveListItems()
    ViewAllFiles_Main_Strategy.init();
    // getAttachements.get_All();

    View_Data_Request.g.clickbait();
    View_Data_Request.g.Cancel();
    if (MasterDetailsArrayRequest.length > 0) {
      Master_Details_Request.init(MasterDetailsArrayRequest[0]);
      MasterDetailsArrayRequest.shift(); //remove 0 index
    }

    $(".loader-box").fadeOut();
    //alert(PCODE_STRING);
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },

  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(SP_ListName);
    View_Data_Request.g.oListItem = oList.getItemById(IID); //declared inside object scope only
    oListItem = View_Data_Request.g.oListItem;
    clientContext.load(View_Data_Request.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, View_Data_Request.onSuccess),
      Function.createDelegate(this, View_Data_Request.onError)
    );
  },
  // Global variables
  g: {
    append: function () {
      const logo = require("../../../HelperRessources/img/main-logo.png");

      $(".o365cs-nav-header16 .o365cs-nav-o365Branding").html(
        '<div class="Logo"><a href=""><img class="img-Logo" src="' +
        logo +
        '"></a></div>'
      );
      $(".o365cs-nav-centerAlign").append(
        '<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="10"></i><a href="#">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="10"></i><a href="#">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="30"></i><a href="#">Issues</a></span></div><div class="UProfile"></div></div>'
      );
    },
    clickbait: function () {
      $("button.btn-save").on("click", function () {
        window.location =
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/Edit.aspx?ListKey=" +
          listkey +
          "&IID=" +
          IID +
          PCODE_STRING;
      });
      $("button.btn-delete").on("click", function () {
        Delete_Item_Submit.g.Delete_Message();
      });
    },
    Cancel: function () {
      $("button.btn-cancel").on("click", function (e) {
        // if(window.location.href.includes('TID=') || Project_Code == "undefined"){
        //     e.preventDefault();
        //     window.history.back();
        // }
        // else
        window.location =
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/Listing.aspx?ListKey=" +
          listkey +
          PCODE_STRING;
      });
    },
    budgetitem: function () {
      if (listkey == "projects" && isView) {
        var yearFrom = budgetFrom ? budgetFrom.split("-")[0] : "",
          dateFromFull = budgetFrom,
          yearTo = budgetTo ? budgetTo.split("-")[0] : "";
        var yearDiff = yearTo ? parseInt(yearTo) - parseInt(yearFrom) + 1 : "";
        yearFrom = parseInt(yearFrom) + 2;
        if (yearFrom) {
          if (yearDiff) {
            $("[id^=Cost]").parent().hide();
            var yeartodisp;
            for (var i = 1; i <= yearDiff; i++) {
              yeartodisp = yearFrom - 3 + i;
              $("#Cost" + i)
                .parent()
                .show();
              if (
                localStorage.getItem("lng") == null ||
                localStorage.getItem("lng") == "ar"
              ) {
                var label =
                  $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text()
                    .indexOf("لعام") > -1
                    ? $("#Cost" + i)
                      .parent()
                      .find("label")
                      .text()
                      .split("لعام")[0] +
                    " لعام " +
                    yeartodisp
                    : $("#Cost" + i)
                      .parent()
                      .find("label")
                      .text() +
                    " لعام " +
                    yeartodisp;
              } else {
                var label =
                  $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text()
                    .indexOf("For Year") > -1
                    ? $("#Cost" + i)
                      .parent()
                      .find("label")
                      .text()
                      .split("For Year")[0] +
                    " For Year " +
                    yeartodisp
                    : $("#Cost" + i)
                      .parent()
                      .find("label")
                      .text() +
                    " For Year " +
                    yeartodisp;
              }
              $("#Cost" + i)
                .parent()
                .find("label")
                .text(label);
            }
          }
        } else {
          $("[id^=Cost]").parent().hide();
        }
      } else {
        var yearFrom = $("#From").text() ? $("#From").text().split("-")[0] : "",
          dateFromFull = $("#From").text(),
          yearTo = $("#To").text() ? $("#To").text().split("-")[0] : "";
        var yearDiff = yearTo ? parseInt(yearTo) - parseInt(yearFrom) + 1 : "";
        yearFrom = parseInt(yearFrom) + 2;
        if (yearDiff) {
          $("[id^=Cost]").parent().hide();
          var yeartodisp;
          for (var i = 1; i <= yearDiff; i++) {
            yeartodisp = yearFrom - 3 + i;
            $("#Cost" + i)
              .parent()
              .show();
            if (
              localStorage.getItem("lng") == null ||
              localStorage.getItem("lng") == "ar"
            ) {
              var label =
                $("#Cost" + i)
                  .parent()
                  .find("label")
                  .text()
                  .indexOf("لعام") > -1
                  ? $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text()
                    .split("لعام")[0] +
                  " لعام " +
                  yeartodisp
                  : $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text() +
                  " لعام " +
                  yeartodisp;
            } else {
              var label =
                $("#Cost" + i)
                  .parent()
                  .find("label")
                  .text()
                  .indexOf("For Year") > -1
                  ? $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text()
                    .split("For Year")[0] +
                  " For Year " +
                  yeartodisp
                  : $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text() +
                  " For Year " +
                  yeartodisp;
            }
            $("#Cost" + i)
              .parent()
              .find("label")
              .text(label);
          }
        }
      }
    },
    showFieldsIfInitiativeVision: function () {
      var typeValue = $("#Types").text();
      if (typeValue == "vision") {
        $("#RelatedBudgetItem , #ProgramTotalCost , #RelatedKPI")
          .parent()
          .css("display", "block");
      } else {
        $("#RelatedBudgetItem , #ProgramTotalCost , #RelatedKPI").parent().css("display", "none");
      }
    }
  },
};
// data related Access
let checkDataAccess = (oListItem) => {
  //for now handling text values
  // if (!el.value.includes(oListItem.get_item(el.field))) {
  //   window.location = "/";
  // }
}
//risk to issue*******
window.showpopup = true;
window.Risk_To_Issue_Submit = {
  preinit: function () {
    var locale, movetitle;
    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {
      locale = {
        OK: Resources.ar["yes"],
        CONFIRM: Resources.ar["yes"],
        CANCEL: Resources.ar["cancelbutton"],
      };
      movetitle = Resources.ar["movetoissue"];
    } else {
      locale = {
        OK: Resources.en["yes"],
        CONFIRM: Resources.en["yes"],
        CANCEL: Resources.en["cancelbutton"],
      };
      movetitle = Resources.en["movetoissue"];
    }

    bootbox.addLocale("custom", locale);

    bootbox.confirm({
      message: movetitle,
      locale: "custom",
      callback: function (result) {
        if (result == true) {
          Risk_Update_Data.init();
          showpopup = false;
        } else {
          console.log("cancled");
          showpopup = false;
        }
      },
    });
  },
  init: function () {
    $(".form-btns-wrapper button, .CFIELD > *").attr("disabled", true);
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Issues");
    var itemCreateInfo = new SP.ListItemCreationInformation();
    Risk_To_Issue_Submit.g.oListItem = oList.addItem(itemCreateInfo);
    if (isView) {
      Risk_To_Issue_Submit.g.oListItem.set_item("Title", $("#Title").text());
      Risk_To_Issue_Submit.g.oListItem.set_item("Name", $("#Name").text());
      Risk_To_Issue_Submit.g.oListItem.set_item(
        "RelatedRiskCode",
        $("#Title").text()
      );
      Risk_To_Issue_Submit.g.oListItem.set_item("ProjectCode", PCODE);
      Risk_To_Issue_Submit.g.oListItem.set_item(
        "Description",
        $("#Description").text()
      );
      Risk_To_Issue_Submit.g.oListItem.set_item(
        "Comments",
        $("#Comments").text()
      );
      if ($("#RiskOwner").text() != UserNo_Data)
        Risk_To_Issue_Submit.g.oListItem.set_item(
          "Owner",
          SP.FieldUserValue.fromUser($("#RiskOwner").attr("user-email"))
        );
    }

    if (isEdit) {
      Risk_To_Issue_Submit.g.oListItem.set_item("Title", $("#Title").val());
      Risk_To_Issue_Submit.g.oListItem.set_item("Name", $("#Name").val());
      Risk_To_Issue_Submit.g.oListItem.set_item(
        "RelatedRiskCode",
        $("#Title").val()
      );
      Risk_To_Issue_Submit.g.oListItem.set_item("ProjectCode", PCODE);
      Risk_To_Issue_Submit.g.oListItem.set_item(
        "Description",
        $("#Description").val()
      );
      Risk_To_Issue_Submit.g.oListItem.set_item(
        "Comments",
        $("#Comments").val()
      );
      if ($("#RiskOwner").text() != enternameemail)
        Risk_To_Issue_Submit.g.oListItem.set_item(
          "Owner",
          SP.FieldUserValue.fromUser($("#RiskOwner").attr("user-email"))
        );
    }

    Risk_To_Issue_Submit.g.oListItem.update();
    clientContext.load(Risk_To_Issue_Submit.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        console.log(PCODE);
        Risk_To_Issue_Code.g.IIID = Risk_To_Issue_Submit.g.oListItem.get_id();
        Risk_To_Issue_Code.init();
      }),
      Function.createDelegate(this, function (sender, args) {
        $(".form-btns-wrapper button, .CFIELD > *").attr("disabled", false);
        var errormessage =
          "Request failed. " +
          args.get_message() +
          "\n" +
          args.get_stackTrace();
        if (errormessage.indexOf("duplicate values") > -1) {
          $(".CSformbuttons").prepend(
            '<p class="errormsg">Please choose another value for Project Code since it is already used</p>'
          );
          $(".loading-wait").hide();
        }
        console.log(errormessage);
      })
    );
  },
  g: {
    toissueClick: function () {
      $(".btn-to-issue").on("click", function () {
        Risk_To_Issue_Submit.preinit();
      });
    },
  },
};

window.Risk_Update_Data = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Risks");

    Risk_Update_Data.g.oListItem = oList.getItemById(IID); //declared inside object scope only
    Risk_Update_Data.g.oListItem.set_item("MoveItToIssueList", true);
    Risk_Update_Data.g.oListItem.set_item("Status", "movedtoissue");
    Risk_Update_Data.g.oListItem.update();
    clientContext.load(Risk_Update_Data.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        Risk_To_Issue_Submit.init();
        console.log("successful");
      }),
      Function.createDelegate(this, function (sender, args) {
        console.log(
          "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
        );
      })
    );
  },
  g: {},
};

var Risk_To_Issue_Code = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Issues");
    Risk_To_Issue_Code.g.oListItem = oList.getItemById(
      Risk_To_Issue_Code.g.IIID
    ); //declared inside object scope only
    var Code,
      Lkey = "issues";

    var prt1 = Lkey.substring(0, 2).toUpperCase(),
      prt2 = String(new Date().getFullYear()).slice(4 - 2),
      prt3 = Risk_To_Issue_Code.g.IIID.toString().padStart(4, "0");
    Code = prt1 + "-" + prt2 + "-" + prt3;
    Risk_To_Issue_Code.g.oListItem.set_item("Title", Code);

    Risk_To_Issue_Code.g.oListItem.update();
    clientContext.load(Risk_To_Issue_Code.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        window.location =
          _spPageContextInfo.webAbsoluteUrl +
          "/sitepages/view.aspx?ListKey=issues&IID=" +
          Risk_To_Issue_Code.g.IIID +
          PCODE_STRING;
      }),
      Function.createDelegate(this, function (sender, args) {
        $(".btn-save, .CFIELD > *").attr("disabled", false);
        console.log(
          "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
        );
      })
    );
  },
  g: {},
};

//master Data
var Master_Details_Request = {
  // The main Initialization function
  init: function (DetailsList) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(DetailsList);
    Master_Details_Request.g.DetailsList = DetailsList;
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      '<View><Query><Where><And><Eq><FieldRef Name="MasterID" /><Value Type="Text">' +
      IID +
      '</Value></Eq><Eq><FieldRef Name="MasterKey" /><Value Type="Text">' +
      listkey +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Created' Ascending='True' /></OrderBy></Query></View>"
    );
    Master_Details_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Master_Details_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Master_Details_Request.onSuccess),
      Function.createDelegate(this, Master_Details_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Master_Details_Request.g.collListItem;
    console.log(collListItem);
    var listItemEnum = collListItem.getEnumerator();
    var CurrList = Master_Details_Request.g.DetailsList,
      FieldsToRender = $(
        '[data-target_list="' +
        CurrList +
        '"] .fieldset-container .Details-Item'
      ).html(),
      HTMLtoAppend,
      MyValues = [];

    if (collListItem.getEnumerator().$2J_0 > 0) {
      //check if any items are returned we can use .getEnumerator().moveNext() //true
      $('[data-target_list="' + CurrList + '"] .fieldset-container').html(""); //remove html
    }
    while (listItemEnum.moveNext()) {
      console.log("in while");
      var oListItem = listItemEnum.get_current();
      HTMLtoAppend = "";
      HTMLtoAppend +=
        '<div class="Details-Item EditItem" data-ID="' +
        oListItem.get_id() +
        '" data-masterkey="' +
        oListItem.get_item("MasterKey") +
        '">';
      HTMLtoAppend += FieldsToRender;
      HTMLtoAppend += "</div>";
      console.log(oListItem.get_item("Title"));
      console.log(HTMLtoAppend);

      if (HTMLtoAppend)
        $('[data-target_list="' + CurrList + '"] .fieldset-container').append(
          HTMLtoAppend
        );
      //show data
      if (isView) {
        console.log("asdasdasdasd");
        $(
          '[data-target_list="' +
          CurrList +
          '"] [data-ID="' +
          oListItem.get_id() +
          '"] > .CFIELD > .viewmode-value'
        ).each(function () {
          if ($(this).attr("type") == "date") {
            var d =
              oListItem.get_item("" + $(this).attr("id") + "") == null
                ? "empty"
                : oListItem.get_item("" + $(this).attr("id") + "");
            if (d != "empty") {
              var local = d.getTime();
              var offset = d.getTimezoneOffset() * (60 * 1000);
              var utc = new Date(local + offset);
              var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
              var datetouse = riyadh
                .toLocaleString("en-US")
                .split(",")[0]
                .split("/");
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

              if ($(this).hasClass("withTime")) {
                var hour = d.getHours();
                var minutes = d.getMinutes();
                var meridian;
                if (hour > 12) {
                  meridian = "PM";
                  hour -= 12;
                } else if (hour < 12) {
                  meridian = "AM";
                  if (hour == 0) {
                    hour = 12;
                  }
                } else {
                  meridian = "PM";
                }
                var timehour = hour + ":" + minutes + ":" + meridian;
                $("#Time").text(timehour);
              }
            }
            $(this).text(datetouse2);
          } else if ($(this).attr("type") == "picker") {
            var pp =
              oListItem.get_item("" + $(this).attr("id") + "") == null
                ? No_Data
                : oListItem
                  .get_item("" + $(this).attr("id") + "")
                  .get_lookupValue();
            $(this).text(pp);
          } else if ($(this).attr("type") == "dropdown") {
            var value =
              oListItem.get_item("" + $(this).attr("id") + "") == null
                ? No_Data
                : oListItem.get_item("" + $(this).attr("id") + "");
            if (
              localStorage.getItem("lng") == null ||
              localStorage.getItem("lng") == "ar"
            ) {
              $(this).text(Resources.ar[value]);
            } else $(this).text(Resources.en[value]);
          } else if ($(this).attr("type") == "radio") {
            var value =
              oListItem.get_item("" + $(this).attr("id") + "") == null
                ? "no"
                : oListItem.get_item("" + $(this).attr("id") + "");
            $(this).text(value);
          } else if ($(this).attr("type") == "checkbox") {
            var value =
              oListItem.get_item("" + $(this).attr("id") + "") == null
                ? No_Data
                : oListItem.get_item("" + $(this).attr("id") + "");
            if (value)
              if (
                localStorage.getItem("lng") == null ||
                localStorage.getItem("lng") == "ar"
              ) {
                $(this).text(Resources.ar["yes"]);
              } else $(this).text(Resources.en["yes"]);
            else if (
              localStorage.getItem("lng") == null ||
              localStorage.getItem("lng") == "ar"
            ) {
              $(this).text(Resources.ar["no"]);
            } else $(this).text(Resources.en["no"]);
          } else if ($(this).attr("type") == "percentage") {
            var num =
              oListItem.get_item("" + $(this).attr("id") + "") == null
                ? No_Data
                : oListItem.get_item($(this).attr("id")) * 100;
            if (num % 1 != 0)
              $(this).text(parseFloat(Math.round(num * 100) / 100).toFixed(2));
            else $(this).text(num);
          } else if (
            $(this).attr("type") == "number" ||
            $(this).attr("type") == "float"
          ) {
            var value =
              oListItem.get_item("" + $(this).attr("id") + "") == null
                ? No_Data
                : oListItem.get_item("" + $(this).attr("id") + "");

            $(this).text(
              value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            );
          } else if ($(this).attr("type") == "multiselect") {
            var value =
              oListItem.get_item("" + $(this).attr("id") + "") == null
                ? No_Data
                : oListItem
                  .get_item("" + $(this).attr("id") + "")
                  .split(":::")
                  .join("; <br>");

            $(this).html(value);
          } else if ($(this).attr("type") == "lookup") {
            var valfieldkey = $(this).data("valfieldkey"),
              Dispfieldkey = $(this).data("dispfieldkey"),
              listname = $(this).data("listname"),
              $this = $(this),
              customquery =
                '<View><Query><Where><Eq><FieldRef Name="' +
                $(this).data("valfieldkey") +
                '" /><Value Type="Text">' +
                oListItem.get_item($(this).attr("id")) +
                "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>";
            sphttp.get(
              _spPageContextInfo.siteServerRelativeUrl,
              listname,
              customquery,
              [valfieldkey, Dispfieldkey],
              function (records, record, listItem, isDone) {
                if (isDone) {
                  records.forEach(function (el, index) {
                    $this.html(el[Dispfieldkey]);
                  });
                }
              }
            );
          } else {
            var value =
              oListItem.get_item("" + $(this).attr("id") + "") == null
                ? No_Data
                : oListItem.get_item("" + $(this).attr("id") + "");
            $(this).text(value);
          }
        });
      } else if (isEdit) {
        $(
          '[data-target_list="' +
          CurrList +
          '"] [data-ID="' +
          oListItem.get_id() +
          '"] > .CFIELD> input,' +
          '[data-target_list="' +
          CurrList +
          '"] [data-ID="' +
          oListItem.get_id() +
          '"] > .CFIELD> div[type=picker],' +
          '[data-target_list="' +
          CurrList +
          '"] [data-ID="' +
          oListItem.get_id() +
          '"] > .CFIELD> select[type=dropdown],' +
          '[data-target_list="' +
          CurrList +
          '"] [data-ID="' +
          oListItem.get_id() +
          '"] > .CFIELD>  textarea,' +
          '[data-target_list="' +
          CurrList +
          '"] [data-ID="' +
          oListItem.get_id() +
          '"] > .CFIELD > .multiselect-container'
        ).each(function () {
          switch ($(this).attr("type")) {
            case "date":
              var d =
                oListItem.get_item("" + $(this).attr("id") + "") == null
                  ? "empty"
                  : oListItem.get_item("" + $(this).attr("id") + "");
              if ($(this).hasClass("withTime")) {
                console.log("asd", d);
              } else {
                if (d != "empty") {
                  var local = d.getTime();
                  var offset = d.getTimezoneOffset() * (60 * 1000);
                  var utc = new Date(local + offset);
                  var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
                  var datetouse = riyadh
                    .toLocaleString("en-US")
                    .split(",")[0]
                    .split("/");
                  datetouse[0] =
                    datetouse[0].length == 1
                      ? "0" + datetouse[0]
                      : datetouse[0];
                  datetouse[1] =
                    datetouse[1].length == 1
                      ? "0" + datetouse[1]
                      : datetouse[1];
                  var datetouse2 =
                    datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];

                  if ($(this).hasClass("withTime")) {
                    var hour = d.getHours();
                    var minutes = d.getMinutes();
                    var meridian;
                    if (hour > 12) {
                      meridian = "PM";
                      hour -= 12;
                    } else if (hour < 12) {
                      meridian = "AM";
                      if (hour == 0) {
                        hour = 12;
                      }
                    } else {
                      meridian = "PM";
                    }
                    var timehour = hour + ":" + minutes + ":" + meridian;
                    $("#Time").text(timehour);
                  }
                }
              }

              $(this).val(datetouse2);
              break;
            case "datetime-local":
              var d =
                oListItem.get_item("" + $(this).attr("id") + "") == null
                  ? "empty"
                  : oListItem.get_item("" + $(this).attr("id") + "");

              if (d != "empty") {
                var local = d.getTime();
                var offset = d.getTimezoneOffset() * (60 * 1000);
                var utc = new Date(local + offset);
                var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
                var datetouse = riyadh
                  .toLocaleString("en-US")
                  .split(",")[0]
                  .split("/");
                datetouse[0] =
                  datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
                datetouse[1] =
                  datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
                var datetouse2 =
                  datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];
              }

              $(this).val(datetouse2);
              break;

            case "picker":
              var pemail =
                oListItem.get_item("" + $(this).attr("id") + "") == null
                  ? enternameemail
                  : oListItem
                    .get_item("" + $(this).attr("id") + "")
                    .get_lookupValue();
              $(this).attr("data-email", pemail);

              if (pemail != enternameemail)
                $(this).attr(
                  "user-email",
                  oListItem.get_item($(this).attr("id")).get_email()
                );

              var idinternal = $(this).attr("id");
              var mp = new MyPeoplePicker();
              mp.init($(this).attr("id"), { AllowMultipleValues: false });
              break;
            case "dropdown":
              $(this).val(oListItem.get_item("" + $(this).attr("id") + ""));
              break;

            case "radio":
              $('input[id="' + $(this).attr("id") + '"]')
                .filter(
                  '[value="' + oListItem.get_item($(this).attr("id")) + '"]'
                )
                .attr("checked", true);
              break;

            case "checkbox":
              if (oListItem.get_item($(this).attr("id")))
                $(this).prop("checked", true);
              break;

            case "multiselect":
              if (oListItem.get_item($(this).attr("myfield"))) {
                var myselections = oListItem
                  .get_item($(this).attr("myfield"))
                  .split(":::");
                for (var i = 0; i < myselections.length; i++) {
                  $(this)
                    .find("input:checkbox[value='" + myselections[i] + "']")
                    .prop("checked", true);
                }
              }
              break;

            case "number":
              if ($(this).hasClass("percentagefield")) {
                var num = oListItem.get_item($(this).attr("id")) * 100;
                if (num % 1 != 0)
                  $(this).val(
                    parseFloat(Math.round(num * 100) / 100).toFixed(2)
                  );
                else $(this).val(num);
              } else {
                $(this).val(oListItem.get_item("" + $(this).attr("id") + ""));
              }
              break;

            default:
              $(this).val(oListItem.get_item("" + $(this).attr("id") + ""));
              break;
          }
        });
      }
    }


    // window.setTimeout(function(){
    //     $('[type="picker"]').each(function(){
    //         var val = $(this).attr('data-email') ? $(this).attr('data-email') : 'ادخل الإسم أو البريد الإلكتروني ...';
    //         $(this).find('.sp-peoplepicker-initialHelpText').text(val);
    //     });
    // }, 777);
    if (MasterDetailsArrayRequest.length > 0) {
      Master_Details_Request.init(MasterDetailsArrayRequest[0]);
      MasterDetailsArrayRequest.shift(); //remove 0 index
    } else if (isEdit) {
      //handle people picker inputs
      $("div[type=picker]").each(function () {
        var mp = new MyPeoplePicker();
        mp.init($(this).attr("id"), {
          PrincipalAccountType: "User",
          AllowMultipleValues: false,
        });
      });
      ListInfo.g.newDetail();
    } else {
      //handle people picker inputs
      $("div[type=picker]").each(function () {
        var mp = new MyPeoplePicker();
        mp.init($(this).attr("id"), {
          PrincipalAccountType: "User",
          AllowMultipleValues: false,
        });
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
//department based on sector
window.Department_Sector_Info = {
  onSuccess: function (sender, args) {
    Department_Sector_Info.g.array = [];
    var collListItem = Department_Sector_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var Name;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        Name = oListItem.get_item("Name");
      } else Name = oListItem.get_item("NameEn");
      Department_Sector_Info.g.array.push({
        name: Name,
        code: oListItem.get_item("Title"),
        id: oListItem.get_id(),
      });
    }
    $("#SubSector").prop("disabled", false);
    $("#SubSector").html(
      '<option data-trans-department class="Resources" value="" selected="" disabled=""></option>'
    );
    Department_Sector_Info.g.array.forEach(function (item, i, arr) {
      $("#SubSector").append(
        '<option option-id="' +
        Department_Sector_Info.g.array[i].id +
        '" value="' +
        Department_Sector_Info.g.array[i].code +
        '">' +
        Department_Sector_Info.g.array[i].name +
        "</option>"
      );
    });
    if (isEdit) {
      $("#SubSector").val(departmenetValue);
    }
    $("#SubSector").change(function () {
      $("#Section").prop("disabled", false);
    });
    changeResources();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // The main Initialization function
  init: function (SectorCode) {
    console.log(SectorCode);
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("Internal Entities");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><Eq><FieldRef Name='ParentEntity'/><Value Type='Text'>" +
      SectorCode +
      "</Value></Eq></Where></Query></View>"
    );
    Department_Sector_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Department_Sector_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Department_Sector_Info.onSuccess),
      Function.createDelegate(this, Department_Sector_Info.onError)
    );
  },
  // Global variables
  g: {
    array: [],
  },
};
//end department based on sector

// KPI get telated Goal
var typeOfIndex = ''
window.Kpi_Related_Goal = {
  onSuccess: function (sender, args) {
    Kpi_Related_Goal.g.array = [];
    var collListItem = Kpi_Related_Goal.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Kpi_Related_Goal.g.array.push({
        name: oListItem.get_item("Name"),
        code: oListItem.get_item("Title"),
        id: oListItem.get_id(),
      });
    }

    // $("#RelatedStrategyObjective").prop("disabled", false);
    debugger
    if (typeOfIndex == 'main') {
      objectiveId = "RelatedStrategyObjective"
      if (isPerformanceLeader) {
        $("#RelatedStrategy").prop("disabled", true)
        $("#Types").prop("disabled", true)
        $("#RelatedStrategyObjective").prop("disabled", true);
      } else {
        $("#RelatedStrategyObjective").prop("disabled", false);
      }
    } else if (typeOfIndex == 'sub') {
      objectiveId = "SubRelatedObjective"
      if (isPerformanceLeader) {
        $("#RelatedStrategy").prop("disabled", true)
        $("#Types").prop("disabled", true)
        $("#SubRelatedObjective").prop("disabled", true);
      } else {
        $("#SubRelatedObjective").prop("disabled", false);
      }

    }
    $(`#${objectiveId}`).html(
      '<option data-trans-relatedstrategy class="Resources" value="" selected="" disabled=""></option>'
    );

    Kpi_Related_Goal.g.array.forEach(function (item, i, arr) {
      $(`#${objectiveId}`).append(
        '<option option-id="' +
        Kpi_Related_Goal.g.array[i].id +
        '" value="' +
        Kpi_Related_Goal.g.array[i].code +
        '">' +
        Kpi_Related_Goal.g.array[i].name +
        "</option>"
      );
    });

    console.log(Kpi_Related_Goal.g.array, "Kpi_Related_Goal.g.array")
    console.log(objectiveId, "objectiveId")
    console.log(relatedSubGoal, "relatedSubGoal relatedSubGoal")

    if (isEdit) {
      if (indexTypekpi == 'main') {
        $('#RelatedStrategyObjective').val(relatedMainGoal)
      } else if (indexTypekpi == 'sub') {
        $('#SubRelatedObjective').val(relatedSubGoal)
      }


    }
    changeResources();

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function (SosCode, indexType) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("SOs");
    var camlQuery = new SP.CamlQuery();
    typeOfIndex = indexType

    console.log(indexType, "INDEX TYPE")
    console.log(SosCode, "SOS CODE")

    // var query = '<View><Query><Where><And><Eq><FieldRef Name="RelatedStrategy" /><Value Type="Text">' + SosCode + '</Value></Eq><Eq><FieldRef Name="Types" /><Value Type="Choice">' + indexType + '</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>'

    //add FieldRef Name and Acending tru to sorth the data alphabetical
    var query = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And><Eq><FieldRef Name="RelatedStrategy" /><Value Type="Text">' + SosCode + '</Value></Eq><Eq><FieldRef Name="Types" /><Value Type="Choice">' + indexType + '</Value></Eq></And></And></Where><OrderBy><FieldRef Name=\'Name\' Ascending=\'True\' /></OrderBy></Query></View>'



    camlQuery.set_viewXml(query);
    Kpi_Related_Goal.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Kpi_Related_Goal.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Kpi_Related_Goal.onSuccess),
      Function.createDelegate(this, Kpi_Related_Goal.onError)
    );
  },
  g: {
    array: []
  },
}
// end of get related goal


window.Get_Related_Sos_Sector = {
  onSuccess: function (sender, args) {
    Get_Related_Sos_Sector.g.array = [];
    var collListItem = Get_Related_Sos_Sector.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      var type = $('#Types').val()
      var sector = oListItem.get_item("Sector") ? oListItem.get_item("Sector") : '';
      var subSector = oListItem.get_item("SubSector") ? oListItem.get_item("SubSector") : ''
      var portfolio = oListItem.get_item("RelatedPortfolio") ? oListItem.get_item("RelatedPortfolio") : ""
      if (type == 'main') {
        $('#Sector').val(sector)
        $('#SubSector').val(subSector)
      } else if (type == 'sub') {
        $('#Sector').val(sector)
        $('#SubSector').val(subSector)
        $('#Portfolio').val(portfolio)

      }
    }
    changeResources();

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function (SosCode) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("SOs");
    var camlQuery = new SP.CamlQuery();

    var query = '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' + SosCode + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>'

    camlQuery.set_viewXml(query);
    Get_Related_Sos_Sector.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_Related_Sos_Sector.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_Related_Sos_Sector.onSuccess),
      Function.createDelegate(this, Get_Related_Sos_Sector.onError)
    );
  },
  g: {
    array: []
  },
}

// Get Goal Strategy

window.Goal_Strategy_Info = {
  onSuccess: function (sender, args) {
    var collListItem = Goal_Strategy_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var pillersExist = ''
    var strategyId = ''
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      var strategyType = oListItem.get_item('Types') ? oListItem.get_item('Types') : ''
      pillersExist = oListItem.get_item('PillarsExist') ? oListItem.get_item('PillarsExist') : ''
      strategyId = oListItem.get_id()
      $('#RelatedStrategyType').val(strategyType)
      if (listkey == 'sos') {
        $('#RelatedStrategyPillars').val(pillersExist)
      }
    }

    if (pillersExist === "Yes" || pillersExist == "yes") {
      $('#PillarName').parent().css('display', 'block')
      Get_Pillers_Info.init(strategyId)
    } else {
      if (listkey == 'sos') {
        $('#PillarName').parent().css('display', 'none')
      }
    }

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function (StrategyTitle) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("GoalStrategy");
    var camlQuery = new SP.CamlQuery();
    // camlQuery.set_viewXml("<View><Query></Query></View>");
    camlQuery.set_viewXml('<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="Title" /><Value Type="Text">' + StrategyTitle + '</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query><RowLimit>1</RowLimit></View>');

    Goal_Strategy_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Goal_Strategy_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Goal_Strategy_Info.onSuccess),
      Function.createDelegate(this, Goal_Strategy_Info.onError)
    );
  },
  g: {
  },
}

window.RelatedInitiative_Data_Request = {
  onSuccess: function (sender, args) {
    var collListItem = RelatedInitiative_Data_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var pillersExist = ''
    var strategyId = ''
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      console.log(oListItem.get_item("Name"));
      $("[data-target_list=Initiatives] .Details-Item.NewItem").each(function () {
        $(this)
          .find(
            ".CFIELD>input," +

            ".CFIELD>div[type=picker]," +

            ".CFIELD>select[type=dropdown]," +

            ".CFIELD>textarea," +

            ".CFIELD>.multiselect-container"

          )

          .each(function () {

            if ($(this).attr("type") == "picker") {
              var id = $(this).attr("id")
              // if (id) {
              // $(`#${id}`).val(oListItem.get_item(id).get_lookupValue());
              // //   oListItem
              // // .get_item("" + $(this).attr("id") + "")
              // // .get_lookupValue();
              var pemail =
                oListItem.get_item("" + $(this).attr("id") + "") == null
                  ? enternameemail
                  : oListItem
                    .get_item("" + $(this).attr("id") + "")
                    .get_lookupValue();
              $(this).attr("data-email", pemail);

              if (pemail != enternameemail)
                $(this).attr(
                  "user-email",
                  oListItem.get_item($(this).attr("id")).get_email()
                );

              var idinternal = $(this).attr("id");
              var mp = new MyPeoplePicker();
              mp.init($(this).attr("id"), { AllowMultipleValues: false });

              // }

            } else if ($(this).attr("type") == "date") {
              var d =
                oListItem.get_item("" + $(this).attr("id") + "") == null
                  ? "empty"
                  : oListItem.get_item("" + $(this).attr("id") + "");
              if (d != "empty") {
                var local = d.getTime();
                var offset = d.getTimezoneOffset() * (60 * 1000);
                var utc = new Date(local + offset);
                var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
                var datetouse = riyadh
                  .toLocaleString("en-US")
                  .split(",")[0]
                  .split("/");
                datetouse[0] =
                  datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
                datetouse[1] =
                  datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
                var datetouse2 =
                  datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];
                if ($(this).hasClass("withTime")) {
                  var hour = d.getHours();
                  var minutes = d.getMinutes();
                  var timehour = hour + ":" + minutes + ":00";
                  $("#Time").val("" + timehour);
                }
              }
              $(this).val(datetouse2);


              //hnm
            } else if ($(this).attr("type") == "dropdown") {
              var id = $(this).attr("id")
              if (id) {
                $(`#${id}`).val(oListItem.get_item(id))
              }

            } else {
              var id = $(this).attr("id")
              if (id) {
                $(`#${id}`).val(oListItem.get_item(id))
              }

            }

          })

      }

      )
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function (relatedInitCode) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Initiatives");
    var camlQuery = new SP.CamlQuery();
    // camlQuery.set_viewXml("<View><Query></Query></View>");
    camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' + relatedInitCode + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query><RowLimit>1</RowLimit></View>');

    RelatedInitiative_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(RelatedInitiative_Data_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, RelatedInitiative_Data_Request.onSuccess),
      Function.createDelegate(this, RelatedInitiative_Data_Request.onError)
    );
  },
  g: {
  },
}
// get pillers
window.Get_Pillers_Info = {
  onSuccess: function (sender, args) {
    Get_Pillers_Info.g.array = [];
    var collListItem = Get_Pillers_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Get_Pillers_Info.g.array.push({
        name: oListItem.get_item("Name"),
        code: oListItem.get_item("Title"),
        id: oListItem.get_id(),
      });
    }

    $("#PillarName").html(
      '<option data-trans-pillersname class="Resources" value="" selected="" disabled=""></option>'
    );

    Get_Pillers_Info.g.array.forEach(function (item, i, arr) {
      $("#PillarName").append(
        '<option option-id="' +
        Get_Pillers_Info.g.array[i].id +
        '" value="' +
        Get_Pillers_Info.g.array[i].code +
        '">' +
        Get_Pillers_Info.g.array[i].name +
        "</option>"
      );
    });
    changeResources();
    if (isEdit) {
      if (listkey == 'sos' && relatedPiller) {
        $('#PillarName').val(relatedPiller)
      }
    }

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function (strategyId) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("SPillars");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="MasterID" /><Value Type="Text">' + strategyId + '</Value></Eq></Where></Query></View>');

    Get_Pillers_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_Pillers_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_Pillers_Info.onSuccess),
      Function.createDelegate(this, Get_Pillers_Info.onError)
    );
  },
  g: {
    array: []
  }
}
//


//get sos for initiative
//get related sos on initiative
window.Initiative_Sos = {
  onSuccess: function (sender, args) {
    Initiative_Sos.g.array = [];
    var collListItem = Initiative_Sos.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Initiative_Sos.g.array.push({
        name: oListItem.get_item("Name"),
        code: oListItem.get_item("Title"),
        id: oListItem.get_id(),
      });
    }

    $("#RelatedObjective").prop("disabled", false);

    $("#RelatedObjective").html(
      '<option data-trans-relatedobjective class="Resources" value="" selected="" disabled=""></option>'
    );

    Initiative_Sos.g.array.forEach(function (item, i, arr) {
      $("#RelatedObjective").append(
        '<option option-id="' +
        Initiative_Sos.g.array[i].id +
        '" value="' +
        Initiative_Sos.g.array[i].code +
        '">' +
        Initiative_Sos.g.array[i].name +
        "</option>"
      );
    });

    if (isEdit) {
      $("#RelatedObjective").val(relatedObjInit)
    }

    changeResources();

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function (listName, type) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(listName);
    var camlQuery = new SP.CamlQuery();

    var query = ''
    if (type == 'vision') {
      query = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="Types" /><Value Type="Choice">main</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>'
    } else if (type == 'strategically') {
      query = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="Types" /><Value Type="Choice">sub</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>'
    }
    //////////////////////////////////
    // if (type == 'vision') {
    //   query = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And><Eq><FieldRef Name="Types" /><Value Type="Choice">main</Value></Eq><Eq><FieldRef Name="RelatedStrategyType" /><Value Type="Text">vision</Value></Eq></And></And></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>'
    // } else if (type == 'strategically') {
    //   query = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And><Eq><FieldRef Name="Types" /><Value Type="Choice">sub</Value></Eq><Eq><FieldRef Name="RelatedStrategyType" /><Value Type="Text">ministry</Value></Eq></And></And></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>'
    // }

    camlQuery.set_viewXml(query);
    Initiative_Sos.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Initiative_Sos.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Initiative_Sos.onSuccess),
      Function.createDelegate(this, Initiative_Sos.onError)
    );
  },
  g: {
    array: [],
  },
}
//

// get related strategy sos on initiative

window.Initiative_Strategy_Sos = {
  onSuccess: function (sender, args) {
    Initiative_Strategy_Sos.g.array = [];
    var collListItem = Initiative_Strategy_Sos.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Initiative_Strategy_Sos.g.array.push({
        name: oListItem.get_item("Name"),
        code: oListItem.get_item("Title"),
        id: oListItem.get_id(),
      });
    }

    $("#RelatedStrategyObjective").prop("disabled", false);

    $("#RelatedStrategyObjective").html(
      '<option data-trans-relatedstrategyobjictave class="Resources" value="" selected="" disabled=""></option>'
    );

    Initiative_Strategy_Sos.g.array.forEach(function (item, i, arr) {
      $("#RelatedStrategyObjective").append(
        '<option option-id="' +
        Initiative_Strategy_Sos.g.array[i].id +
        '" value="' +
        Initiative_Strategy_Sos.g.array[i].code +
        '">' +
        Initiative_Strategy_Sos.g.array[i].name +
        "</option>"
      );
    });
    changeResources();

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function (listName) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(listName);
    var camlQuery = new SP.CamlQuery();

    var query = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And><Eq><FieldRef Name="Types" /><Value Type="Choice">sub</Value></Eq><Eq><FieldRef Name="RelatedStrategyType" /><Value Type="Text">ministry</Value></Eq></And></And></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>'
    //
    camlQuery.set_viewXml(query);
    Initiative_Strategy_Sos.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Initiative_Strategy_Sos.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Initiative_Strategy_Sos.onSuccess),
      Function.createDelegate(this, Initiative_Strategy_Sos.onError)
    );
  },
  g: {
    array: [],
  },
}

// comment it cause we handle it from json view type multiselectstring
// window.MultiSelect_View = { // use it for invoices cause we need to save the delivrable code to use it in chart elmezaneyah in project home
//   onSuccess: function (sender, args) {
//     MultiSelect_View.g.array = [];
//     var collListItem = MultiSelect_View.g.collListItem;
//     var listItemEnum = collListItem.getEnumerator();
//     while (listItemEnum.moveNext()) {
//       var oListItem = listItemEnum.get_current();
//       MultiSelect_View.g.array.push({
//         name: oListItem.get_item("Name"),
//         code: oListItem.get_item("Title"),
//         id: oListItem.get_id(),
//       });
//     }

//     if (isView) { // to get the name of delivrable over the code
//       var relatedDelevrableName = ''
//       MultiSelect_View.g.array.forEach(el => {
//         relatedDelevrableName += el.name + '<br>'
//       })

//       if (listkey == 'invoices') {
//         $("#Deliverable").html(relatedDelevrableName)
//       }
//     }
//   },
//   onError: function (sender, args) {
//     console.log(
//       "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
//     );
//   },
//   init: function (listName, array) {
//     var clientContext = new SP.ClientContext.get_current();
//     var oList = clientContext.get_web().get_lists().getByTitle(listName);
//     var camlQuery = new SP.CamlQuery();
//     var query = ''
//     query = '<View><Query><Where><And><In><FieldRef Name="Title" /><Values>';
//     array.forEach(function (item) {
//       query += '<Value Type="Text">' + item + '</Value>';
//     });
//     query += '</Values></In><Neq><FieldRef Name=\'DeletionStatus\'/><Value Type=\'Text\'>Deleted</Value></Neq></And></Where></Query></View>';

//     // var query = '<View><Query><Where><Eq><FieldRef Name="InitiativeCode" /><Value Type="Text">' + code + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>'

//     camlQuery.set_viewXml(query);
//     MultiSelect_View.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
//     clientContext.load(MultiSelect_View.g.collListItem);
//     clientContext.executeQueryAsync(
//       Function.createDelegate(this, MultiSelect_View.onSuccess),
//       Function.createDelegate(this, MultiSelect_View.onError)
//     );
//   },
//   g: {
//     array: [],
//   }
// }

//get ProjectInitiativeDelevrable
window.ProjectInitiativeDelevrable = {
  onSuccess: function (sender, args) {
    var isDisabled = ''
    ProjectInitiativeDelevrable.g.array = [];
    var collListItem = ProjectInitiativeDelevrable.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      ProjectInitiativeDelevrable.g.array.push({
        name: oListItem.get_item("Name"),
        code: oListItem.get_item("Title"),
        id: oListItem.get_id(),
      });
    }

    // $("#RelatedInitiativeDeliverable").prop("disabled", false);

    if (isDU || isPManager || isInManager) { // to disabled the checkbox for this role
      isDisabled = 'disabled'
    }
    if (!isView) {
      var multiSelectHtml =
        '<li class="dropdown ul-bullet-remove">' +
        '<a href="#" data-toggle="dropdown" class="dropdown-toggle"><span data-trans-relatedinitiativedelevrable class="Resources"></span><b class="caret"></b></a>' +
        '<ul type="" class="dropdown-menu">'

      ProjectInitiativeDelevrable.g.array.forEach(function (item, i, arr) {
        multiSelectHtml +=
          '<label class="grp-select">' + item.code + '</label>' +
          '<li>' +
          '<div class="checkbox">' +
          '<label>' +
          '<input value="' + item.code + '" id="RelatedInitiativeDeliverable" type="checkbox" ' + isDisabled + ' ">' + item.name +
          '</label>' +
          '</div>' +
          '</li>'
      });

      multiSelectHtml += '</li></ul>'

      $("#RelatedInitiativeDeliverable").html(multiSelectHtml)
    }

    if (isView) { // to get the name of delivrable over the code

      // var relatedDelevrableName = ''
      // ProjectInitiativeDelevrable.g.array.forEach(el => {
      //   if (initiativeDelevrableArr.indexOf(el.code) > -1) {
      //     relatedDelevrableName += el.name + '<br>'
      //   }
      // })
      // $('#RelatedInitiativeDeliverable').html(relatedDelevrableName)

    } else if (isEdit) // checked the value from list on multi select
      for (var i = 0; i < initiativeDelevrableArr.length; i++) {
        $('#RelatedInitiativeDeliverable').find("input:checkbox[value='" + initiativeDelevrableArr[i] + "']").prop("checked", true);
      }

    changeResources();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function (listName, code) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(listName);
    var camlQuery = new SP.CamlQuery();

    var query = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="InitiativeCode" /><Value Type="Text">' + code + '</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Name\' Ascending=\'True\' /></OrderBy></Query></View>'

    camlQuery.set_viewXml(query);
    ProjectInitiativeDelevrable.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(ProjectInitiativeDelevrable.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, ProjectInitiativeDelevrable.onSuccess),
      Function.createDelegate(this, ProjectInitiativeDelevrable.onError)
    );
  },
  g: {
    array: [],
  },
}

//get ProjectInitiativeMilestone
window.ProjectInitiativeMilestone = {
  onSuccess: function (sender, args) {

    ProjectInitiativeMilestone.g.array = [];
    var collListItem = ProjectInitiativeMilestone.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      ProjectInitiativeMilestone.g.array.push({
        name: oListItem.get_item("Name"),
        code: oListItem.get_item("Title"),
        id: oListItem.get_id(),
      });
    }

    // $("#RelatedInitiativeMilestone").prop("disabled", false);

    if (!isView) {
      $("#RelatedInitiativeMilestone").html(
        '<option data-trans-relatedinitiativemilestone class="Resources" value="" selected="" disabled=""></option>'
      );


      ProjectInitiativeMilestone.g.array.forEach(function (item, i, arr) {
        $("#RelatedInitiativeMilestone").append(
          '<option option-id="' +
          ProjectInitiativeMilestone.g.array[i].id +
          '" value="' +
          ProjectInitiativeMilestone.g.array[i].code +
          '">' +
          ProjectInitiativeMilestone.g.array[i].name +
          "</option>"
        );
      });
    }
    if (isEdit) {
      $("#RelatedInitiativeMilestone").val(initiativeMilestoneVal)
    }

    if (isView) {
      Check_Item_Deleted.init('InitiativeMilestones', initiativeMilestoneVal, 'Title')
    }

    changeResources();

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function (listName, code) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(listName);
    var camlQuery = new SP.CamlQuery();
    var query = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="InitiativeCode" /><Value Type="Text">' + code + '</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>'

    camlQuery.set_viewXml(query);
    ProjectInitiativeMilestone.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(ProjectInitiativeMilestone.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, ProjectInitiativeMilestone.onSuccess),
      Function.createDelegate(this, ProjectInitiativeMilestone.onError)
    );
  },
  g: {
    array: [],
  },
}
//budget item based on sector
window.BudgetItem_Sector_Info = {
  onSuccess: function (sender, args) {
    BudgetItem_Sector_Info.g.array = [];
    var collListItem = BudgetItem_Sector_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      BudgetItem_Sector_Info.g.array.push({
        name: oListItem.get_item("Name"),
        code: oListItem.get_item("Title"),
        id: oListItem.get_id(),
      });
    }
    $("select#BudgetItem").html(
      '<option data-trans-budgetitem class="Resources" value="" selected="" disabled=""></option>'
    );
    console.log(
      "BudgetItems_Sector_Info.g.array",
      BudgetItem_Sector_Info.g.array
    );

    $("#BudgetItem").prop("disabled", false);

    BudgetItem_Sector_Info.g.array.forEach(function (item, i, arr) {
      $("select#BudgetItem").append(
        '<option option-id="' +
        BudgetItem_Sector_Info.g.array[i].id +
        '" value="' +
        BudgetItem_Sector_Info.g.array[i].code +
        '">' +
        BudgetItem_Sector_Info.g.array[i].name +
        "</option>"
      );
    });
    if (isEdit) {
      $("#BudgetItem").val(budgetitemValue);
    }
    changeResources();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // The main Initialization function
  init: function (SectorCode) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Budget Items");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><Eq><FieldRef Name='RelatedToSector'/><Value Type='Text'>" +
      SectorCode +
      "</Value></Eq></Where></Query></View>"
    );
    BudgetItem_Sector_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(BudgetItem_Sector_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, BudgetItem_Sector_Info.onSuccess),
      Function.createDelegate(this, BudgetItem_Sector_Info.onError)
    );
  },
  // Global variables
  g: {
    array: [],
  },
};
//end budget item based on sector

//related items delete only the item remove it to recycle bin not used function
window.Delete_RelatedData = {
  init: function (ListName, itemId) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(ListName);
    Delete_RelatedData.g.oListItem = oList.getItemById(itemId); //declared inside object scope only
    Delete_RelatedData.g.oListItem.deleteObject();
    //clientContext.load(Delete_RelatedData.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        console.log("successful");
      }),
      Function.createDelegate(this, function (sender, args) {
        console.log(
          "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
        );
      })
    );
  },
  g: {},
};

var RelatedInfoclientContext;
window.Related_Info_Request = {
  // The main Initialization function
  init: function (list, field, value) {
    window.relatedlistname = list;
    RelatedInfoclientContext = new SP.ClientContext.get_current();
    website = RelatedInfoclientContext.get_web();
    Related_Info_Request.g.oList = RelatedInfoclientContext.get_web()
      .get_lists()
      .getByTitle(list);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      '<View><Query><Where><Eq><FieldRef Name="' +
      field +
      '" /> <Value Type="Text">' +
      value +
      "</Value></Eq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>"
    );
    Related_Info_Request.g.collListItem =
      Related_Info_Request.g.oList.getItems(camlQuery); //declared inside object scope only
    RelatedInfoclientContext.load(website);
    RelatedInfoclientContext.load(
      Related_Info_Request.g.collListItem,
      "Include(Id)"
    );
    RelatedInfoclientContext.executeQueryAsync(
      Function.createDelegate(this, Related_Info_Request.onSuccess),
      Function.createDelegate(this, Related_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Related_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      var ID = oListItem.get_id();
      var oListItemDel = Related_Info_Request.g.oList.getItemById(ID);
      oListItemDel.deleteObject();
      RelatedInfoclientContext.executeQueryAsync(
        Function.createDelegate(this, Related_Info_Request.g.onDeleteSucceeded),
        Function.createDelegate(this, Related_Info_Request.g.onDeleteFailed)
      );
    }
    if (relatedToProject.length > 0 && listkey == "projects") {
      Related_Info_Request.init(
        relatedToProject[0].listName,
        relatedToProject[0].RelatedItem,
        PCODE
      );
      relatedToProject.shift();
    } else if (relatedToIdea.length > 0 && listkey == "ideas") {
      window.IdeaCode = $("#Title").text();
      Related_Info_Request.init(
        relatedToIdea[0].listName,
        relatedToIdea[0].RelatedItem,
        IdeaCode
      );
      relatedToIdea.shift();
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {
    onQueryFailed: function (sender, args) {
      console.log("Failed");
    },
    onDeleteFailed: function (sender, args) {
      console.log("Failed to delete related item");
    },
    onDeleteSucceeded: function (sender, args) {
      console.log("success delete related item");
      if (
        (listkey == "projects" && relatedToProject.length == 0) ||
        (listkey == "ideas" && relatedToIdea.length == 0)
      ) {
        Delete_Data_Submit.init();
      }
    },
  },
};

//main delete not used function
window.Delete_Data_Submit = {
  init: function () {
    $("button.btn-delete").removeClass("loader-action-success");
    $("button.btn-delete").removeClass("loader-action-error");
    $("button.btn-delete").addClass("loader-action");

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(SP_ListName);
    Delete_Data_Submit.g.oListItem = oList.getItemById(IID); //declared inside object scope only
    Delete_Data_Submit.g.oListItem.deleteObject();
    //clientContext.load(Delete_Data_Submit.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        console.log("successful");
        $("button.btn-delete").removeClass("loader-action");
        $("button.btn-delete").addClass("loader-action-success");

        if (listkey == "initiatives" || USERisProjects) {
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/SitePages/Listing.aspx?ListKey=" +
            listkey;
        } else {
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/SitePages/Listing.aspx?ListKey=" +
            listkey +
            PCODE_STRING;
        }

      }),
      Function.createDelegate(this, function (sender, args) {
        $("button.btn-delete").removeClass("loader-action");
        $("button.btn-delete").addClass("loader-action-error");
        console.log(
          "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
        );
      })
    );
  },
  g: {
    Delete_Message: function () {
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        if (window.confirm("هل أنت متأكد أنك تريد حذف البيانات؟")) {
          // They clicked Yes

          if (relatedToProject.length > 0 && listkey == "projects") {
            Related_Info_Request.init(
              relatedToProject[0].listName,
              relatedToProject[0].RelatedItem,
              PCODE
            );
            relatedToProject.shift();
          } else if (relatedToIdea.length > 0 && listkey == "ideas") {
            window.IdeaCode = $("#Title").text();
            Related_Info_Request.init(
              relatedToIdea[0].listName,
              relatedToIdea[0].RelatedItem,
              IdeaCode
            );
            relatedToIdea.shift();
          } else {
            Delete_Data_Submit.init();
          }
        } else {
          // They clicked no
        }
      } else {
        if (window.confirm("Are you sure you want to delete the data ?")) {
          // They clicked Yes
          if (relatedToProject.length > 0 && listkey == "projects") {
            Related_Info_Request.init(
              relatedToProject[0].listName,
              relatedToProject[0].RelatedItem,
              PCODE
            );
            relatedToProject.shift();
          } else if (relatedToIdea.length > 0 && listkey == "ideas") {
            window.IdeaCode = $("#Title").text();
            Related_Info_Request.init(
              relatedToIdea[0].listName,
              relatedToIdea[0].RelatedItem,
              IdeaCode
            );
            relatedToIdea.shift();
          } else {
            Delete_Data_Submit.init();
          }
        } else {
          // They clicked no
        }
      }

      // }else{
      //     alert('ليس لديك صلاحية')
      // }
    },
  },
};

//main delete
window.Delete_Item_Submit = {
  init: function () {
    $("button.btn-delete").removeClass("loader-action-success");
    $("button.btn-delete").removeClass("loader-action-error");
    $("button.btn-delete").addClass("loader-action");
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(SP_ListName);
    Delete_Item_Submit.g.oListItem = oList.getItemById(IID); //declared inside object scope only
    Delete_Item_Submit.g.oListItem.set_item("DeletionStatus", "Deleted");
    Delete_Item_Submit.g.oListItem.update();
    //clientContext.load(Delete_Item_Submit.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        console.log("successful");
        $("button.btn-delete").removeClass("loader-action");
        $("button.btn-delete").addClass("loader-action-success");

        if (filesUrls.length) {
          for (let i = 0; i < filesUrls.length; i++) {
            deleteAllFileFromDoc.init(filesUrls[i].url)
          }
        } else {
          if (
            listkey == "projects" ||
            listkey == "initiatives" ||
            listkey == "ideas" ||
            listkey == "portfolio" ||
            listkey == "budgetitems"
          ) {
            window.location =
              _spPageContextInfo.webAbsoluteUrl +
              "/SitePages/Listing.aspx?ListKey=" +
              listkey;
          } else {
            if (listkey == 'mainkpi') {
              Delete_Kpi_Results.init() // to delete the kpi from kpi results
            } else {
              window.location =
                _spPageContextInfo.webAbsoluteUrl +
                "/SitePages/Listing.aspx?ListKey=" +
                listkey +
                PCODE_STRING;
            }
          }
        }

        // if (
        //   listkey == "projects" ||
        //   listkey == "ideas" ||
        //   listkey == "portfolio" ||
        //   listkey == "budgetitems"
        // ) {
        //   window.location =
        //     _spPageContextInfo.webAbsoluteUrl +
        //     "/SitePages/Listing.aspx?ListKey=" +
        //     listkey;
        // } else {
        //   if (listkey == 'mainkpi') {
        //     Delete_Kpi_Results.init() // to delete the kpi from kpi results
        //   } else {
        //     window.location =
        //       _spPageContextInfo.webAbsoluteUrl +
        //       "/SitePages/Listing.aspx?ListKey=" +
        //       listkey +
        //       PCODE_STRING;
        //   }
        // }
      }),
      Function.createDelegate(this, function (sender, args) {
        $("button.btn-delete").removeClass("loader-action");
        $("button.btn-delete").addClass("loader-action-error");
        console.log(
          "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
        );
      })
    );
  },
  g: {
    Delete_Message: function () {
      var locale, deletetitle;
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        locale = {
          OK: Resources.ar["yes"],
          CONFIRM: Resources.ar["yes"],
          CANCEL: Resources.ar["cancelbutton"],
        };
        deletetitle = Resources.ar["deleteconfirmation"];
      } else {
        locale = {
          OK: Resources.en["yes"],
          CONFIRM: Resources.en["yes"],
          CANCEL: Resources.en["cancelbutton"],
        };
        deletetitle = Resources.en["deleteconfirmation"];
      }

      bootbox.addLocale("custom", locale);
      bootbox.confirm({
        message: deletetitle,
        locale: "custom",
        callback: function (result) {
          if (result == true) {
            Delete_Item_Submit.init();
          } else {
            console.log("cancled");
          }
        },
      });
    },
  },
};


var Delete_Kpi_Results = {
  init: function () {
    console.log("IN DELETE")

    var context = SP.ClientContext.get_current();
    var dfd = $.Deferred();
    var programList = context.get_web().get_lists().getByTitle('KPIResults');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='KPI'/><Value Type='Text'>" + KPICode + "</Value></Eq></And></Where></Query></View>")
    //Get items by Query
    var progColl = programList.getItems(camlQuery);
    //Load item collection
    context.load(progColl);
    context.executeQueryAsync(
      function () {
        var currentItemArray = [];
        if (progColl.get_count() > 0) {
          var progEnum = progColl.getEnumerator();
          while (progEnum.moveNext()) {
            var currentItem = progEnum.get_current();
            var currentId = currentItem.get_item("ID");
            //Get Item by current ID
            var items = programList.getItemById(currentId);
            items.set_item('DeletionStatus', 'Deleted');
            //Update the item
            items.update();
            currentItemArray.push(items);
            context.load(currentItemArray[currentItemArray.length - 1]);
          }
          context.executeQueryAsync(
            function () {
              window.location =
                _spPageContextInfo.webAbsoluteUrl +
                "/SitePages/Listing.aspx?ListKey=" +
                listkey +
                PCODE_STRING;

              dfd.resolve();
            },
            function (sender, args) {
              //Item updated fail
              console.log(
                "Request Failed to get kpi results Item Items :" + args.get_message()
              );
            }
          );
        }
      }
    )
  }
}

//get related documents
//importent to read:
// we stoped using ViewAllFiles because we get the files using folderurl and we will face a problem when the items on document library be over the threshold so we create a new function ViewAllFiles_Main_Strategy to RecursiveAll the files and get the file based on (itemID,Title)
window.ViewAllFiles = {
  init: function () {
    var context = new SP.ClientContext.get_current();
    var web = context.get_web();
    var list = web.get_lists().getByTitle(DocumentLibraryName);
    var query = SP.CamlQuery.createAllItemsQuery();
    query.set_folderServerRelativeUrl(getfolderurl);
    ViewAllFiles.g.allItems = list.getItems(query);
    context.load(
      ViewAllFiles.g.allItems,
      "Include(ID, Title, ContentType, File, ItemID)"
    );
    context.executeQueryAsync(
      Function.createDelegate(this, ViewAllFiles.success),
      Function.createDelegate(this, ViewAllFiles.failed)
    );
  },
  success: function () {
    // var filesUrls = [];
    filesUrls = [];
    var ListEnumerator = ViewAllFiles.g.allItems.getEnumerator();
    while (ListEnumerator.moveNext()) {
      var currentFile = ListEnumerator.get_current();
      var FileID = currentFile.get_item("ItemID");
      var _contentType = currentFile.get_contentType();
      if (_contentType.get_name() != "Folder") {
        var File = currentFile.get_file();
        if (File != null && FileID == IID) {
          var title;
          if (currentFile.get_item("Title").indexOf("-") > -1)
            title = currentFile.get_item("Title").split("-")[1];
          filesUrls.push({
            url: File.get_serverRelativeUrl(),
            id: currentFile.get_item("ID"),
            title: title,
          });
        }
      }
    }
    console.log(filesUrls);
    if (filesUrls.length > 0) {
      var FilesLink =
        '<div class="py-5 border-bottom section-container " id="files_container" data-groups="">' +
        '<div class="form-row"><div class="col-lg-3 col-md-4 mb-4"><h3 data-trans-documents class="Resources"></h3><span class="font-14"></span></div>' +
        '<div class="col-lg-9 col-md-8 white-box p-4 fieldset-container"><div class="col-md-6 multiline"><label data-trans-document class="Resources">مرفقات: </label>';
      for (var i = 0; i < filesUrls.length; i++) {
        var filename = filesUrls[i].url.split("/").slice(-1)[0];
        filename = filename.includes("_-_SystemUploadTime_-_") ? filename.split('_-_SystemUploadTime_-_')[1] : filename;
        if (isEdit) {
          FilesLink +=
            '<div class="file-container"><a class="File-Link" file-id="' +
            filesUrls[i].id +
            '"  file-title="' +
            filesUrls[i].title +
            '"  href="' +
            filesUrls[i].url +
            '" download="' + filename + '" title="Download ' +
            filename +
            '"><i class="fas fa-file-download" ></i>' +
            filename +
            '</a><a class="delete-file" href="javascript:" title="Delete ' +
            filename +
            '" onclick="ViewAllFiles.Delete_Message(\'' +
            filesUrls[i].url +
            "', '" +
            filename +
            '\')"><i class="fas fa-times"></i></div>';

        } else {
          FilesLink +=
            '<div class="file-container"><a class="File-Link" file-id="' +
            filesUrls[i].id +
            '"  file-title="' +
            filesUrls[i].title +
            '"  href="' +
            filesUrls[i].url +
            '" download="' + filename + '" title="Download ' +
            filename +
            '"><i class="fas fa-file-download"></i>' +
            filename +
            "</a></div>";
        }
      }
      FilesLink += "</div></div ></div ></div > ";
      // $('.section-container:not([data-target_list]) .fieldset-container').eq($('.section-container:not([data-target_list]) .fieldset-container').length-1).append(FilesLink);
      $(FilesLink).insertBefore(
        $("button.btn.btn-action.btn-cancel").parent().parent()
      );
    }
    changeResources();
  },
  failed: function (sender, args) {
    console.log("failed. Message:" + args.get_message());
  },
  Delete_Message: function (url, fileTodelete) {
    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {
      if (window.confirm(" هل أنت متأكد أنك تريد حذف" + fileTodelete)) {
        // They clicked Yes

        deleteFile.init(url);
      } else {
        // They clicked no
      }
    } else {
      if (window.confirm("Are you sure you want to delete " + fileTodelete)) {
        // They clicked Yes
        deleteFile.init(url);
      } else {
        // They clicked no
      }
    }
  },
  g: {},
};
//get related documents
// we use the ViewAllFiles_Main_Strategy to handle the threshold error so we create a query to RecursiveAll files based on ItedID and Title on  the Projects Document Library
window.ViewAllFiles_Main_Strategy = {
  init: function () {

    var context = new SP.ClientContext.get_current();
    var web = context.get_web();
    var list = web.get_lists().getByTitle(DocumentLibraryName);
    var query = SP.CamlQuery.createAllItemsQuery();
    var mytitle;
    mytitle = listkey;
    if (PCODE || ICODE) {
      var code = PCODE ? PCODE : ICODE
      query.set_viewXml(
        '<View Scope="RecursiveAll"> \
                      <Query> \
                          <Where> \
                          <And> \
                              <Eq> \
                                  <FieldRef Name="ItemID" /> \
                                  <Value Type="Text">' +
        IID +
        '</Value> \
                              </Eq> \
                              <Eq> \
                              <FieldRef Name="Title" /> \
                              <Value Type="Text">' +
        listkey +
        "-" +
        code +
        "</Value> \
                          </Eq> \
                          </And>\
                          </Where> \
                      </Query> \
                      <RowLimit>5000</RowLimit> \
                  </View>"
      );
    } else {
      query.set_viewXml(
        '<View Scope="RecursiveAll"> \
                      <Query> \
                          <Where> \
                          <And> \
                              <Eq> \
                                  <FieldRef Name="ItemID" /> \
                                  <Value Type="Text">' +
        IID +
        '</Value> \
                              </Eq> \
                              <Eq> \
                              <FieldRef Name="Title" /> \
                              <Value Type="Text">' +
        listkey +
        "</Value> \
                          </Eq> \
                          </And>\
                          </Where> \
                      </Query> \
                      <RowLimit>5000</RowLimit> \
                  </View>"
      );
    }

    ViewAllFiles_Main_Strategy.g.allItems = list.getItems(query);
    if (listkey == 'mainkpi') {
      context.load(
        ViewAllFiles_Main_Strategy.g.allItems,
        "Include(ID, Title, ContentType, File, ItemID, RelatedYear, RelatedMonth, RelatedQuarter, RelatedMid, RelatedActualY)"
      );
    } else {
      context.load(
        ViewAllFiles_Main_Strategy.g.allItems,
        "Include(ID, Title, ContentType, File, ItemID)"
      );
    }

    context.executeQueryAsync(
      Function.createDelegate(this, ViewAllFiles_Main_Strategy.success),
      Function.createDelegate(this, ViewAllFiles_Main_Strategy.failed)
    );
  },
  success: function () {
    // var filesUrls = [];
    filesUrls = [];
    var ListEnumerator = ViewAllFiles_Main_Strategy.g.allItems.getEnumerator();


    while (ListEnumerator.moveNext()) {
      var currentFile = ListEnumerator.get_current();
      var FileID = currentFile.get_item("ItemID");
      var _contentType = currentFile.get_contentType();
      if (_contentType.get_name() != "Folder") {
        var File = currentFile.get_file();
        if (File != null && FileID == IID) {
          var title;
          if (currentFile.get_item("Title").indexOf("-") > -1) {
            title = currentFile.get_item("Title").split("-")[1];
          } else {
            title = currentFile.get_item("Title")
          }

          if (listkey == 'mainkpi') {

            filesUrls.push({
              url: File.get_serverRelativeUrl(),
              id: currentFile.get_item("ID"),
              title: title,
              RelatedYear: currentFile.get_item("RelatedYear") ? currentFile.get_item("RelatedYear") : '',
              RelatedMonth: currentFile.get_item("RelatedMonth") ? currentFile.get_item("RelatedMonth") : '',
              RelatedQuarter: currentFile.get_item("RelatedQuarter") ? currentFile.get_item("RelatedQuarter") : '',
              RelatedMid: currentFile.get_item("RelatedMid") ? currentFile.get_item("RelatedMid") : '',
              RelatedActualY: currentFile.get_item("RelatedActualY") ? currentFile.get_item("RelatedActualY") : '',
            });
          } else {
            filesUrls.push({
              url: File.get_serverRelativeUrl(),
              id: currentFile.get_item("ID"),
              title: title
            });
          }


        }
      }
    }

    if (filesUrls.length > 0) {

      var FilesLink =
        '<div class="py-5 border-bottom section-container " id="file_container" data-groups="">' +
        '<div class="form-row"><div class="col-lg-3 col-md-4 mb-4"><h3 data-trans-documents class="Resources"></h3><span class="font-14"></span></div>' +
        '<div class="col-lg-9 col-md-8 white-box p-4 fieldset-container"><div class="col-md-6 multiline"><label data-trans-document class="Resources">مرفقات: </label>';

      if (listkey == 'mainkpi') {

        var collapseContent = ''

        if (PeriodType == 'monthly') {
          collapseContent = `
            <table style="width:100%">
              <tr style="font-size:12px">
                <th data-trans-pattr9 class="Resources kpi-attach-table-head" id="ActualM1"></th>
                <th data-trans-pattr10 class="Resources kpi-attach-table-head" id="ActualM2"></th>
                <th data-trans-pattr11 class="Resources kpi-attach-table-head" id="ActualM3"></th>
                <th data-trans-pattr12 class="Resources kpi-attach-table-head" id="ActualM4"></th>
                <th data-trans-pattr13 class="Resources kpi-attach-table-head" id="ActualM5"></th>
                <th data-trans-pattr14 class="Resources kpi-attach-table-head" id="ActualM6"></th>
                <th data-trans-pattr15 class="Resources kpi-attach-table-head" id="ActualM7"></th>
                <th data-trans-pattr16 class="Resources kpi-attach-table-head" id="ActualM8"></th>
                <th data-trans-pattr17 class="Resources kpi-attach-table-head" id="ActualM9"></th>
                <th data-trans-pattr18 class="Resources kpi-attach-table-head" id="ActualM10"></th>
                <th data-trans-pattr19 class="Resources kpi-attach-table-head" id="ActualM11"></th>
                <th data-trans-pattr20 class="Resources kpi-attach-table-head" id="ActualM12"></th>
              </tr>
            </table>
          `
        } else if (PeriodType == 'quarter') {
          collapseContent = `
          <table style="width:100%">
            <tr style="font-size:12px">
              <th data-trans-quarter1 class="Resources kpi-attach-table-head" id="ActualQ1"></th>
              <th data-trans-quarter2 class="Resources kpi-attach-table-head" id="ActualQ2"></th>
              <th data-trans-quarter3 class="Resources kpi-attach-table-head" id="ActualQ3"></th>
              <th data-trans-quarter4 class="Resources kpi-attach-table-head" id="ActualQ4"></th>
            </tr>
          </table>
            `
        } else if (PeriodType == 'midterm') {
          collapseContent = `
          <table style="width:100%">
            <tr style="font-size:12px">
              <th data-trans-actualmid1 class="Resources kpi-attach-table-head" id="ActualMid1"></th>
              <th data-trans-actualmid2 class="Resources kpi-attach-table-head" id="ActualMid2"></th>
            </tr>
          </table>
            `
        } else if (PeriodType == 'year') {
          collapseContent = `
          <table style="width:100%">
            <tr style="font-size:12px">
              <th data-trans-actualy class="Resources kpi-attach-table-head" id="ActualY"></th>
            </tr>
          </table>
            `
        }
        collapseContent += `
          <div id="attachRow" class="kpi-attach-container">
          </div>
          `


        FilesLink += `<div class="accordion" id="mainkpiattachtables">`

        FilesLink += `
          <div class="card" id="general-attach">
          <div class="card-header bg-white" id="headingGA">
            <h3 data-trans-generalattachements class="Resources acc-header mb-0 py-3 px-2"
            data-toggle="collapse" data-target="#collapse" id="cardNote1"
            aria-expanded="false" aria-controls="collapse">General Attachements</h3>
          </div>
          <div id="collapse" class="collapse" aria-labelledby="headingGA" data-parent="">
            <div class="card-body">
                <ul class="list-group">
                    <div id="general-attach-content"></div>
                </ul>
            </div>
          </div>
        </div>
          `

        for (var i = kpiFromYear; i <= kpiToYear; i++) {
          FilesLink += `
          <div class="card" id="year${i}">
            <div class="card-header bg-white" id="heading${i}">
              <h3 class="Resources acc-header mb-0 py-3 px-2"
              data-toggle="collapse" data-target="#collapse${i}" id="cardNote1"
              aria-expanded="false" aria-controls="collapse${i}">${i}</h3>
            </div>
            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="">
              <div class="card-body">
                  <ul class="list-group">
                  ${collapseContent}
                  </ul>
              </div>
            </div>
          </div>
          `
        }
        FilesLink += `</div>`
      }
      for (var i = 0; i < filesUrls.length; i++) {
        var filename = filesUrls[i].url.split("/").slice(-1)[0];
        filename = filename.includes("_-_SystemUploadTime_-_") ? filename.split('_-_SystemUploadTime_-_')[1] : filename;
        if (listkey != 'mainkpi') {
          if (isEdit) {
            FilesLink +=
              '<div class="file-container"><a class="File-Link" file-id="' +
              filesUrls[i].id +
              '"  file-title="' +
              filesUrls[i].title +
              '"  href="' +
              filesUrls[i].url +
              '" download="' + filename + '" title="Download ' +
              filename +
              '"><i class="fas fa-file-download" ></i>' +
              filename +
              '</a><a class="delete-file" href="javascript:" title="Delete ' +
              filename +
              '" onclick="ViewAllFiles_Main_Strategy.Delete_Message(\'' +
              filesUrls[i].url +
              "', '" +
              filename +
              '\')"><i class="fas fa-times"></i></div>';
          } else {
            FilesLink +=
              '<div class="file-container"><a class="File-Link" file-id="' +
              filesUrls[i].id +
              '"  file-title="' +
              filesUrls[i].title +
              '"  href="' +
              filesUrls[i].url +
              '" download="' + filename + '" title="Download ' +
              filename +
              '"><i class="fas fa-file-download"></i>' +
              filename +
              "</a></div>";
          }
        }
      }
      FilesLink += "</div></div></div></div>";
      // $('.section-container:not([data-target_list]) .fieldset-container').eq($('.section-container:not([data-target_list]) .fieldset-container').length-1).append(FilesLink);
      $(FilesLink).insertBefore(
        $("button.btn.btn-action.btn-cancel").parent().parent()
      );



      if (listkey == 'mainkpi') {

        var yearsArr = [],
          lstTabCLicked = '',
          lstYearClicked = '',
          typeArr = [],
          relatedType = '';

        var numberOfResults = kpiToYear - kpiFromYear

        for (var i = 0; i <= numberOfResults; i++) {
          yearsArr.push(Number(kpiFromYear) + i)
        }

        if (PeriodType == 'monthly') {
          var monthsArr = ['ActualM1', 'ActualM2', 'ActualM3', 'ActualM4', 'ActualM5', 'ActualM6', 'ActualM7', 'ActualM8', 'ActualM9', 'ActualM10', 'ActualM11', 'ActualM12']
          typeArr = monthsArr
        } else if (PeriodType == 'quarter') {
          var quarterArr = ['ActualQ1', 'ActualQ2', 'ActualQ3', 'ActualQ4']
          typeArr = quarterArr
        } else if (PeriodType == 'midterm') {
          var midArr = ['ActualMid1', 'ActualMid2']
          typeArr = midArr
        } else if (PeriodType == 'year') {
          var yearArr = ['ActualY']
          typeArr = yearArr
        }
        yearsArr.forEach(yearVal => {
          typeArr.forEach(type => {

            $(`#year${yearVal} .card-body #${type}`).click(function () {

              console.log(lstTabCLicked, "lstTabCLicked")
              console.log(yearVal, "yearVal")

              if (lstTabCLicked && lstYearClicked)
                $(`#year${lstYearClicked} .card-body #${lstTabCLicked}`).css('background', '#fff') // change background color when click on month

              $(`#year${yearVal} .card-body #${type}`).css('background', '#D0D0D0') // change background color when click on month

              var attachment = ''
              filesUrls.filter((ele) => {
                if (PeriodType == 'monthly') {
                  relatedType = ele.RelatedMonth
                } else if (PeriodType == 'quarter') {
                  relatedType = ele.RelatedQuarter
                } else if (PeriodType == 'midterm') {
                  relatedType = ele.RelatedMid
                } else if (PeriodType == 'year') {
                  relatedType = ele.RelatedActualY
                }

                if ((ele.RelatedYear == yearVal) && (relatedType == type)) {
                  if (isEdit) {
                    var filename = ele.url.split("/").slice(-1)[0];
                    filename = filename.includes("_-_SystemUploadTime_-_") ? filename.split('_-_SystemUploadTime_-_')[1] : filename;

                    attachment += '<div class="file-container"><a class="File-Link" file-id="' +
                      ele.id +
                      '"  file-title="' +
                      ele.title +
                      '"  href="' +
                      ele.url +
                      '" download="' + filename + '" title="Download ' +
                      filename +
                      '"><i class="fas fa-file-download" ></i>' +
                      filename +
                      '</a><a class="delete-file" href="javascript:" title="Delete ' +
                      filename +
                      '" onclick="ViewAllFiles_Main_Strategy.Delete_Message(\'' +
                      ele.url +
                      "', '" +
                      filename +
                      '\')"><i class="fas fa-times"></i></div>';
                  } else {
                    var filename = ele.url.split("/").slice(-1)[0];
                    filename = filename.includes("_-_SystemUploadTime_-_") ? filename.split('_-_SystemUploadTime_-_')[1] : filename;

                    attachment +=
                      '<div class="file-container"><a class="File-Link" file-id="' +
                      ele.id +
                      '"  file-title="' +
                      ele.title +
                      '"  href="' +
                      ele.url +
                      '" download="' + filename + '" title="Download ' +
                      filename +
                      '"><i class="fas fa-file-download"></i>' +
                      filename +
                      "</a></div>";
                  }
                }
                $(`#year${yearVal} .card-body #attachRow`).html(attachment);

              })
              lstTabCLicked = type
              lstYearClicked = yearVal


            })
          })

        })



        if (filesUrls.length > 0) {
          var generalAttach = ''

          filesUrls.forEach(el => {
            if (!el.RelatedActualY && !el.RelatedMid && !el.RelatedMonth && !el.RelatedQuarter && !el.RelatedYear) {
              var filename = el.url.split("/").slice(-1)[0];
              filename = filename.includes("_-_SystemUploadTime_-_") ? filename.split('_-_SystemUploadTime_-_')[1] : filename;

              if (isEdit) {
                generalAttach +=
                  '<div class="file-container"><a class="File-Link" file-id="' +
                  el.id +
                  '"  file-title="' +
                  el.title +
                  '"  href="' +
                  el.url +
                  '" download="' + filename + '" title="Download ' +
                  filename +
                  '"><i class="fas fa-file-download" ></i>' +
                  filename +
                  '</a><a class="delete-file" href="javascript:" title="Delete ' +
                  filename +
                  '" onclick="ViewAllFiles_Main_Strategy.Delete_Message(\'' +
                  el.url +
                  "', '" +
                  filename +
                  '\')"><i class="fas fa-times"></i></div>';
              } else {
                generalAttach +=
                  '<div class="file-container"><a class="File-Link" file-id="' +
                  el.id +
                  '"  file-title="' +
                  el.title +
                  '"  href="' +
                  el.url +
                  '" download="' + filename + '" title="Download ' +
                  filename +
                  '"><i class="fas fa-file-download"></i>' +
                  filename +
                  "</a></div>";
              }
              console.log("THIS IS AN ELEMENTT")
            }
          })
          $(`#general-attach .card-body #general-attach-content`).html(generalAttach);

        }

        if (isView) {
          View_Current_Kpi.init(); // show the kpi result for current time (extra section of view) before the attachment container
        }
      }

      // $(collapse).insertBefore(
      //   $("button.btn.btn-action.btn-cancel").parent().parent()
      // );
      changeResources();
    }
    if (filesUrls.length == 0 && listkey == 'mainkpi' && isView) {
      View_Current_Kpi.init(); // show the kpi result for current time (extra section of view) to invoke the func if there is no attach
    }
  },
  failed: function (sender, args) {
    console.log("failed. Message:" + args.get_message());
  },
  Delete_Message: function (url, fileTodelete) {
    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {
      if (window.confirm(" هل أنت متأكد أنك تريد حذف" + fileTodelete)) {
        // They clicked Yes
        deleteFile.init(url);
      } else {
        // They clicked no
      }
    } else {
      if (window.confirm("Are you sure you want to delete " + fileTodelete)) {
        // They clicked Yes
        deleteFile.init(url);
      } else {
        // They clicked no
      }
    }
  },
  g: {},
};

var GetProject_Info = {
  onSuccess: function (sender, args) {
    var collListItem = GetProject_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var PID;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      PID = oListItem.get_id();
      AssignedBudget = oListItem.get_item("AssignedBudget") || 0;
    }
    if (listkey == "revenues" && isNew) {
      Revenue_Info_Request.init();
    }
    if (PCODE && listkey != "projects") {
      $(".headtwo").append(
        '<a class="" href="' +
        _spPageContextInfo.webServerRelativeUrl +
        '"><span class="litem">Home</span></a>' +
        '<a class="" href="' +
        _spPageContextInfo.webServerRelativeUrl +
        "/SitePages/View.aspx?ListKey=projects&IID=" +
        PID +
        '"><span data-trans-projectdetails class="litem Resources"></span></a>' //+
        //'<a class="" href="'+_spPageContextInfo.webServerRelativeUrl+'"><span class="litem">Project Phase</span></a>'//+
        // '<a class="" href="'+_spPageContextInfo.webServerRelativeUrl+'"><span class="litem">Project Report</span></a>'
      );
    }
    GetProject_Info.g.notificationappen();
    Risks_Info_Request.init();
    Issues_Info_Request.init();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".ms-Icon--Settings").length) {
      clearInterval(checkNotificationHTML);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        GetProject_Info.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle(ListArray[0].projects);
    var camlQuery = new SP.CamlQuery();
    var PQUERY;
    if (PCODE) {
      PQUERY =
        "<View><Query><Where><Eq><FieldRef Name='Title'/><Value Type='Text'>" +
        PCODE +
        "</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>";
    } else {
      PQUERY = "<View><Query></Query></View>";
    }

    camlQuery.set_viewXml(PQUERY);
    GetProject_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(GetProject_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, GetProject_Info.onSuccess),
      Function.createDelegate(this, GetProject_Info.onError)
    );
  },
  // Global variables
  g: {
    notificationappen: function () {
      if (PCODE) {
        $("#O365_SearchBoxContainer_container").append(
          '<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="0"></i><a href="' +
          _spPageContextInfo.siteServerRelativeUrl +
          "/SitePages/Listing.aspx?ListKey=tasks&PCODE=" +
          PCODE +
          '">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="0"></i><a href="' +
          _spPageContextInfo.siteServerRelativeUrl +
          "/SitePages/Listing.aspx?ListKey=risks&PCODE=" +
          PCODE +
          '">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="0"></i><a href="' +
          _spPageContextInfo.siteServerRelativeUrl +
          "/SitePages/Listing.aspx?ListKey=issues&PCODE=" +
          PCODE +
          '"">Issues</a></span></div><div class="UProfile"></div></div>'
        );
      } else {
        $("#O365_SearchBoxContainer_container").append(
          '<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="0"></i><a href="' +
          _spPageContextInfo.siteServerRelativeUrl +
          '/SitePages/Listing.aspx?ListKey=tasks">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="0"></i><a href="' +
          _spPageContextInfo.siteServerRelativeUrl +
          '/SitePages/Listing.aspx?ListKey=risks">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="0"></i><a href="' +
          _spPageContextInfo.siteServerRelativeUrl +
          '/SitePages/Listing.aspx?ListKey=issues">Issues</a></span></div><div class="UProfile"></div></div>'
        );
      }
    },
  },
};
//Revenues
var Revenue_Info_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Revenue_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      RevenuesAmount += oListItem.get_item("WeightValue") || 0;
    }
    Revenue_Info_Request.g.revenueBudget();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".Container").length) {
      clearInterval(checkStatusHtml);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        Revenue_Info_Request.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Deliverables");
    var camlQuery = new SP.CamlQuery();
    var ReQUERY;
    ReQUERY =
      "<View><Query><Where><Eq><FieldRef Name='Project'/><Value Type='Text'>" +
      PCODE +
      "</Value></Eq></Where></Query></View>";
    camlQuery.set_viewXml(ReQUERY);
    Revenue_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Revenue_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Revenue_Info_Request.onSuccess),
      Function.createDelegate(this, Revenue_Info_Request.onError)
    );
  },
  // Global variables
  g: {
    revenueBudget: function () {
      if ($("input#WeightValue").length) {
        //clearInterval(checkWeightValueHTML);
        RemainingBudget = AssignedBudget - RevenuesAmount;
        $("input#WeightValue").attr("max", RemainingBudget);
        $("input#WeightValue")
          .parent()
          .find(" > label")
          .append(
            '<span style="font-size:12px;color: #b6c7b6;"> - [Remaining Budget is ' +
            RemainingBudget +
            "]</span>"
          );
      }
    },
  },
};
//Risks
var Risks_Info_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Risks_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var Risks = "";
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      ///date
      var year =
        oListItem.get_item("DateIdentified") == null
          ? ""
          : oListItem.get_item("DateIdentified").getFullYear();
      NRisks++;
    }
    $(".Risks i").attr("data-count", NRisks);
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".Container").length) {
      clearInterval(checkStatusHtml);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        Risks_Info_Request.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Risks");
    var camlQuery = new SP.CamlQuery();
    var RQUERY;
    if (PCODE) {
      RQUERY =
        "<View><Query><Where><Eq><FieldRef Name='Project'/><Value Type='Text'>" +
        PCODE +
        "</Value></Eq></Where></Query></View>";
    } else {
      RQUERY = "<View><Query></Query></View>";
    }
    camlQuery.set_viewXml(RQUERY);
    Risks_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Risks_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Risks_Info_Request.onSuccess),
      Function.createDelegate(this, Risks_Info_Request.onError)
    );
  },
  // Global variables
  g: {
    PCODE: window.location.href.split("PCODE=")[1],
  },
};
//Issues
var Issues_Info_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Issues_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var Issues = "";
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      NIssues++;
    }
    $(".Issues i").attr("data-count", NIssues);
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".Container").length) {
      clearInterval(checkStatusHtml);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        Issues_Info_Request.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Issues");
    var camlQuery = new SP.CamlQuery();
    var IQUERY;
    if (PCODE) {
      IQUERY =
        "<View><Query><Where><Eq><FieldRef Name='Project'/><Value Type='Text'>" +
        PCODE +
        "</Value></Eq></Where></Query></View>";
    } else {
      IQUERY = "<View><Query></Query></View>";
    }
    camlQuery.set_viewXml(IQUERY);
    Issues_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Issues_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Issues_Info_Request.onSuccess),
      Function.createDelegate(this, Issues_Info_Request.onError)
    );
  },
  // Global variables
  g: {
    PCODE: window.location.href.split("PCODE=")[1],
  },
};
//KPI equations
var equationKPI = {
  onSuccess: function (sender, args) {

    equationKPI.g.array = [];
    var collListItem = equationKPI.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();

    while (listItemEnum.moveNext()) {

      var oListItem = listItemEnum.get_current();
      kpiEquationID = oListItem.get_id();
      kpiEquation = oListItem.get_item("KPIInput") || "";
      kpiEquation = kpiEquation.replaceAll("C", "CC");
      kpiEquation = kpiEquation.replaceAll(" ", "");
      kpiEquationsComponents.push({
        A: oListItem.get_item("A"),
        B: oListItem.get_item("B"),
        CC: oListItem.get_item("CC"),
        D: oListItem.get_item("D"),
        E: oListItem.get_item("E"),
        F: oListItem.get_item("F"),
        G: oListItem.get_item("G"),
      });
      $('input#KPIEquation').val(oListItem.get_item("Equation") || '');
      $('p#KPIEquation').text(oListItem.get_item("Equation") || '');
    }


    var myCKeys =
      kpiEquationsComponents.length > 0
        ? Object.keys(kpiEquationsComponents[0])
        : []; // get internal names keys


    // remove required field when there is no equation
    if (!kpiEquation && isEdit) {
      $('#Year,#Months,#Quarter,#Midterms,#Years').removeAttr('required');
      $('#Year,#Months,#Quarter,#Midterms,#Years').parent().removeAttr('required');
      $('#Year,#Months,#Quarter,#Midterms,#Years').prev('label').removeAttr('required');
    }

    if (kpiEquation) {
      kpiEquation = kpiEquation.toUpperCase() // kpi eq should be upper case to avoid the  editequation btn not appear in view
      // set display text

      myCKeys.forEach((o) => {
        console.log(kpiEquationsComponents[0][o], 'oooooooooooooooooo')
        kpiEquationsComponents[0][o]
          ? $(`input#${o},p#${o}`)
            .parent()
            .show()
            .find(">label")
            .text(kpiEquationsComponents[0][o])
          : $(`input#${o},p#${o}`).parent().remove();
        // kpiEquation = isView                                   // rewrite the if condition to handle the btn eq in view
        //   ? kpiEquation.replaceAll(o, $(`p#${o}`).text())
        //   : kpiEquation.replaceAll(o, $(`input#${o}`).val());
        if (isView) {
          var val = $(`p#${o}`).text()
          if (val != No_Data) {
            kpiEquation = kpiEquation.replaceAll(o, $(`p#${o}`).text())
          } else {
            kpiEquation = kpiEquation.replaceAll(o, 0)
          }
        } else {
          kpiEquation = kpiEquation.replaceAll(o, $(`input#${o}`).val())
        }
      });


      kpiEquation = kpiEquation.replaceAll(',', '') // remove , from high number


      kpiEquation =
        eval(kpiEquation) % 1 != 0
          ? eval(kpiEquation).toFixed(2)
          : eval(kpiEquation);


      if (kpiEquation === "NaN") {
        $("input#Equation").val(0);
        $("p#Equation").text("0");
      } else {
        $("input#Equation").val(kpiEquation || 0);
        $("p#Equation").text(kpiEquation || 0);
      }
    }
    if (isAdmin || isSPMAdmin || isVROP || isLMSP) { // remove attr disabled for this roles in equation
      $(".savecancelBtns > div, .btnactionrow > .rightBtns").append(
        '<button data-trans-editequation class="btn btn-action Resources btn-edit-equation bg-warning" type="button"></button>'
      );

    }
    if (isAdmin || isPerformanceLeader || isVROP || isLMSP) {
      // $("input#KPIEquation, input#Equation ,input#B, input#A, input#CC , input#D ,input#E,input#F,input#G").removeAttr('disabled');
      $("input#B, input#A, input#CC , input#D ,input#E,input#F,input#G").removeAttr('disabled');

    }

    $(".btn-edit-equation").on("click", () => {
      equationKPI.g.editEquation();
    });

    // should work here to update on kpiResults
    //check the notebook to know the steps
    Update_Kpi_Results.init(kpiEquation)

    //

    changeResources();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function () {

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("KPIEquations");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='KPI'/><Value Type='Text'>" +
      KPICode +
      "</Value></Eq></And></Where></Query></View>"
    );

    equationKPI.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(equationKPI.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, equationKPI.onSuccess),
      Function.createDelegate(this, equationKPI.onError)
    );
  },
  g: {
    editEquation: function () {
      window.location =
        _spPageContextInfo.webAbsoluteUrl +
        "/SitePages/Edit.aspx?ListKey=kpiequations&IID=" +
        kpiEquationID +
        PCODE_STRING;
    },
    array: [],
  },
};
//////////////////////////////////////////////////////

var getAttachements = {
  get_All: function () {
    //getUserWebPermissionREST();
    $.ajax({
      url:
        _spPageContextInfo.webAbsoluteUrl +
        `/_api/Web/GetFolderByServerRelativeUrl(${getfolderurl})?$expand=Folders,Files`,
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (data) {
        console.log(
          data.d,
          "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
        );

        //console.log(UserN);
      },
      error: function (data) {
        console.log("call failed");
      },
    });
  },
  g: {},
};
//Next Approver
var UpcomingTasks_Info_Request = {
  onSuccess: function (sender, args) {
    var collListItem = UpcomingTasks_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var Users = [];
    var actionpending =
      '<div class="actionpending errormsg alert"><i class="fas fa-info-circle"></i><span data-trans-actionpending class="Resources"></span>';
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Users.push(oListItem.get_item("AssignedTo")[0].get_lookupValue());
    }
    uniqueArray = (a) =>
      [...new Set(a.map((o) => JSON.stringify(o)))].map((s) => JSON.parse(s));
    Users = uniqueArray(Users);
    Users.forEach(function (item) {
      actionpending += "<span>" + item + "</span>";
    });
    actionpending += "</div>";

    console.log("actionpending", actionpending);
    if (Users.length > 0) {
      $(".container-body").prepend(actionpending);
    }
    changeResources();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".container-body").length) {
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        UpcomingTasks_Info_Request.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Tasks");
    var camlQuery = new SP.CamlQuery();
    var IQUERY;
    var taskType;

    if (listkey == "ideas") {
      taskType = "Idea";
    } else if (listkey == "projects") {
      taskType = "Project";
    }
    IQUERY =
      "<View><Query><Where><And><Eq><FieldRef Name='RelatedItemID'/><Value Type='Text'>" +
      IID +
      "</Value></Eq><And><Eq><FieldRef Name='WorkflowName'/><Value Type='Text'>" +
      taskType +
      '</Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where></Query></View>';
    camlQuery.set_viewXml(IQUERY);
    UpcomingTasks_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(UpcomingTasks_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, UpcomingTasks_Info_Request.onSuccess),
      Function.createDelegate(this, UpcomingTasks_Info_Request.onError)
    );
  },
  // Global variables
  g: {},
};

// update on kpi results list

window.Update_Kpi_Results = {
  init: function () {
    var context = SP.ClientContext.get_current();
    var dfd = $.Deferred();
    //Get list from host web
    var programList = context.get_web().get_lists().getByTitle('KPIResults');
    var camlQuery = new SP.CamlQuery();
    // camlQuery.set_viewXml(
    //   '<View><Query><Where><Eq><FieldRef Name="KPI" /> <Value Type="Text">' + value + "</Value></Eq></Where></Query></View>"
    // );
    // var query = "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='KPI'/><Value Type='Text'>" + KPICode + "</Value></Eq></And></Where></Query></View>"

    camlQuery.set_viewXml("<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='KPI'/><Value Type='Text'>" + KPICode + "</Value></Eq></And></Where></Query></View>")
    //Get items by Query
    var progColl = programList.getItems(camlQuery);
    //Load item collection
    context.load(progColl);
    context.executeQueryAsync(
      function () {
        var currentItemArray = [];
        if (progColl.get_count() > 0) {
          var progEnum = progColl.getEnumerator();
          while (progEnum.moveNext()) {
            var currentItem = progEnum.get_current();
            var currentId = currentItem.get_item("ID");
            var yearItem = currentItem.get_item("Year");
            //Get Item by current ID
            var items = programList.getItemById(currentId);
            var yearPicked = KPIYear
            var monthHandler = KPIMonth
            var quarterHandler = KPIQuarter
            var midHandler = KPIMid
            var yearHandler = KPIYearHandler

            if (yearItem == yearPicked) {
              if (!kpiEquation) {
                kpiEquation = 0
              }
              if (monthHandler) {
                items.set_item(monthHandler, kpiEquation);
              } else if (quarterHandler) {
                items.set_item(quarterHandler, kpiEquation);
              } else if (midHandler) {
                items.set_item(midHandler, kpiEquation);
              } else if (yearHandler) {
                items.set_item(yearHandler, kpiEquation);
              }
            }



            //Update the item
            items.update();
            currentItemArray.push(items);

            context.load(currentItemArray[currentItemArray.length - 1]);

          }
          context.executeQueryAsync(
            function () {
              //Item Updated sucess
              // Edit_Item_Field.init('Ideas', 'Stage', 'IdeaStage04', 'Title', IdeaId);
              dfd.resolve();
            },
            function (sender, args) {
              //Item updated fail
              console.log(
                "Request Failed to get kpi results Item Items :" + args.get_message()
              );
            }
          );
        }
      }
    )
  }
}

///////////////////

var deleteAllFileFromDoc = {
  init: function (fileurl) {
    var clientContext;
    var oWebsite;
    window.hreftodelete = fileurl;
    clientContext = new SP.ClientContext.get_current();
    oWebsite = clientContext.get_web();
    clientContext.load(oWebsite);
    clientContext.executeQueryAsync(function () {
      this.fileToDelete = oWebsite.getFileByServerRelativeUrl(fileurl);
      this.fileToDelete.deleteObject();

      $('.File-Link[href="' + fileurl + '"]')
        .parent()
        .fadeOut();

      clientContext.executeQueryAsync(
        Function.createDelegate(this, deleteAllFileFromDoc.success),
        Function.createDelegate(this, deleteAllFileFromDoc.error)
      );
    }, deleteAllFileFromDoc.error);
  },
  success: function () {
    console.log("INSIDE OMN CSSSCADAS")

    if (allFileIndex == filesUrls.length - 1) {
      if (
        listkey == "projects" ||
        listkey == "ideas" ||
        listkey == "portfolio" ||
        listkey == "budgetitems"
      ) {
        window.location =
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/Listing.aspx?ListKey=" +
          listkey;
      } else {
        if (listkey == 'mainkpi') {
          Delete_Kpi_Results.init() // to delete the kpi from kpi results
        } else {
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/SitePages/Listing.aspx?ListKey=" +
            listkey +
            PCODE_STRING;
        }
      }
    }
    allFileIndex++


    // $('.File-Link[href="' + hreftodelete + '"]')
    //   .parent()
    //   .fadeOut();
    // if (
    //   listkey == "projects" ||
    //   listkey == "ideas" ||
    //   listkey == "portfolio" ||
    //   listkey == "budgetitems"
    // ) {
    //   window.location =
    //     _spPageContextInfo.webAbsoluteUrl +
    //     "/SitePages/Listing.aspx?ListKey=" +
    //     listkey;
    // } else {
    //   if (listkey == 'mainkpi') {
    //     Delete_Kpi_Results.init() // to delete the kpi from kpi results
    //   } else {
    //     window.location =
    //       _spPageContextInfo.webAbsoluteUrl +
    //       "/SitePages/Listing.aspx?ListKey=" +
    //       listkey +
    //       PCODE_STRING;
    //   }
    // }
    // console.log('File Deleted Successfully - ');
  },
  error: function (sender, args) {
    // console.log('Request failed with error message');
  },
};

/////////////////
window.Get_ProjectData_ByCode = {
  onSuccess: function (sender, args) {
    var collListItem = Get_ProjectData_ByCode.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var relatedInitCode = ''
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      relatedInitCode = oListItem.get_item("RelatedInitiative") ? oListItem.get_item("RelatedInitiative") : ''
    }
    console.log("INSIDE INIT getPRoj")

    ProjectInitiativeMilestone.init('InitiativeMilestones', relatedInitCode)
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(ListArray[0].projects);
    var camlQuery = new SP.CamlQuery();

    camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' + PCODE + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query><RowLimit>1</RowLimit></View>');
    Get_ProjectData_ByCode.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_ProjectData_ByCode.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_ProjectData_ByCode.onSuccess),
      Function.createDelegate(this, Get_ProjectData_ByCode.onError)
    );
  },
  g: {}
}
///////////////
var View_Current_Kpi = {
  onSuccess: function (sender, args) {
    var collListItem = View_Current_Kpi.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();

    var relatedKpiYear, relatedPerformanceAnalysis, relatedPeriodType, relatedActualValue, relatedPerformanceAnalysis;
    var periodType = '';


    var currentMonth = new Date().getMonth() + 1;

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      relatedKpiYear = oListItem.get_item('Year') == null ? No_Data : oListItem.get_item('Year');
      relatedPeriodType = oListItem.get_item('PeriodType') == null ? No_Data : oListItem.get_item('PeriodType');

      ////////////////////////////
      if (relatedPeriodType == 'year') {

        relatedActualValue = oListItem.get_item('ActualY') || 0
        relatedPerformanceAnalysis = oListItem.get_item('PerformanceAnalysisActualY') || No_Data

        periodType += '<label data-trans-yearkpitype class="Resources"></label>'
        periodType += '<p data-trans-actualy class="viewmode-value Resources" id="Years"></p>'

        targetYear = targetYear - 1
        targetActualValue = 'ActualY'
        targetPerformanceAnalysis = 'PerformanceAnalysisActualY'
        targetPerioudType = '<label data-trans-yearkpitype class="Resources"></label>'
        targetPerioudType += '<p data-trans-actualy class="viewmode-value Resources" id="Years_Previous"></p>'


      } else if (relatedPeriodType == 'midterm') {


        periodType += '<label data-trans-midkpitype class="Resources"></label>'
        targetPerioudType = '<label data-trans-midkpitype class="Resources"></label>'


        if (currentMonth >= 1 && currentMonth <= 6) {

          relatedPerformanceAnalysis = oListItem.get_item('PerformanceAnalysisActualMid1') || No_Data
          relatedActualValue = oListItem.get_item('ActualMid1') || 0
          periodType += '<p data-trans-actualmid1 class="viewmode-value Resources" id="Midterms"></p>'

          targetPerioudType += '<p data-trans-actualmid2 class="viewmode-value Resources" id="Midterms_Previous"></p>'
          targetYear = targetYear - 1
          targetActualValue = 'ActualMid2'
          targetPerformanceAnalysis = 'PerformanceAnalysisActualMid2'

        } else if (currentMonth > 6 && currentMonth <= 12) {

          relatedPerformanceAnalysis = oListItem.get_item('PerformanceAnalysisActualMid2') || No_Data
          relatedActualValue = oListItem.get_item('ActualMid2') || 0
          periodType += '<p data-trans-actualmid2 class="viewmode-value Resources" id="Midterms"></p>'
          targetPerioudType += '<p data-trans-actualmid1 class="viewmode-value Resources" id="Midterms_Previous"></p>'

          targetActualValue = 'ActualMid1'
          targetPerformanceAnalysis = 'PerformanceAnalysisActualMid1'
        }

      } else if (relatedPeriodType == 'quarter') {

        periodType += '<label data-trans-quarterkpitype class="Resources"></label>'
        targetPerioudType = '<label data-trans-quarterkpitype class="Resources"></label>'

        if (currentMonth >= 1 && currentMonth <= 3) {
          relatedPerformanceAnalysis = oListItem.get_item('PerformanceAnalysisActualQ1') || No_Data
          relatedActualValue = oListItem.get_item('ActualQ1') || 0
          periodType += '<p data-trans-actualq1 class="viewmode-value Resources" id="Quarter"></p>'

          targetPerioudType += '<p data-trans-actualq4 class="viewmode-value Resources" id="Quarter_Previous"></p>'
          targetYear = targetYear - 1
          targetActualValue = 'ActualQ4'
          targetPerformanceAnalysis = 'PerformanceAnalysisActualQ4'

        } else if (currentMonth > 3 && currentMonth <= 6) {
          relatedPerformanceAnalysis = oListItem.get_item('PerformanceAnalysisActualQ2') || No_Data
          relatedActualValue = oListItem.get_item('ActualQ2') || 0
          periodType += '<p data-trans-actualq2 class="viewmode-value Resources" id="Quarter"></p>'

          targetPerioudType += '<p data-trans-actualq1 class="viewmode-value Resources" id="Quarter_Previous"></p>'
          targetActualValue = 'ActualQ1'
          targetPerformanceAnalysis = 'PerformanceAnalysisActualQ1'

        } else if (currentMonth > 6 && currentMonth <= 9) {
          relatedPerformanceAnalysis = oListItem.get_item('PerformanceAnalysisActualQ3') || No_Data
          relatedActualValue = oListItem.get_item('ActualQ3') || 0
          periodType += '<p data-trans-actualq3 class="viewmode-value Resources" id="Quarter"></p>'

          targetPerioudType += '<p data-trans-actualq2 class="viewmode-value Resources" id="Quarter_Previous"></p>'
          targetActualValue = 'ActualQ2'
          targetPerformanceAnalysis = 'PerformanceAnalysisActualQ2'

        } else if (currentMonth > 9 && currentMonth <= 12) {

          relatedPerformanceAnalysis = oListItem.get_item('PerformanceAnalysisActualQ4') || No_Data
          relatedActualValue = oListItem.get_item('ActualQ4') || 0
          periodType += '<p data-trans-actualq4 class="viewmode-value Resources" id="Quarter"></p>'

          targetPerioudType += '<p data-trans-actualq3 class="viewmode-value Resources" id="Quarter_Previous"></p>'
          targetActualValue = 'ActualQ3'
          targetPerformanceAnalysis = 'PerformanceAnalysisActualQ3'
        }

      } else if (relatedPeriodType == 'monthly') {

        relatedPerformanceAnalysis = oListItem.get_item(`PerformanceAnalysisActualM${currentMonth}`) || No_Data
        relatedActualValue = oListItem.get_item(`ActualM${currentMonth}`) || 0
        periodType += '<label data-trans-monthlykpitype class="Resources"></label>'
        periodType += `<p data-trans-month${currentMonth} class="viewmode-value Resources" id="Months"></p>`

        targetPerioudType = '<label data-trans-monthlykpitype class="Resources"></label>'

        if (currentMonth == 1) {
          targetPerioudType += `<p data-trans-month12 class="viewmode-value Resources" id="Months_Previous"></p>`
          targetYear = targetYear - 1
          targetActualValue = 'ActualM12'
          targetPerformanceAnalysis = 'PerformanceAnalysisActualM12'
        } else {
          targetPerioudType += `<p data-trans-month${currentMonth - 1} class="viewmode-value Resources" id="Months_Previous"></p>`
          targetActualValue = `ActualM${currentMonth - 1}`
          targetPerformanceAnalysis = `PerformanceAnalysisActualM${currentMonth - 1}`
        }


      }

      ////////////////////////////

    }


    var currentKpiView =
      '<div class="py-5 border-bottom section-container current_kpi" data-groups="">' +
      '<div class="form-row"><div class="col-lg-3 col-md-4 mb-4"><h3 data-trans-currentkpi class="Resources"></h3><span class="font-14"></span></div>' +
      '<div class="col-lg-9 col-md-8 white-box p-4 fieldset-container">' +
      '<div class="col-md-6 multiline">' +
      '<label data-trans-yeartype class="Resources"></label>' +
      '<p class="viewmode-value" id="Year">' + relatedKpiYear + '</p>' +
      '</div>' +
      '<div class="col-md-6 multiline">' +
      periodType +
      '</div>' +
      '<div class="col-md-6 multiline">' +
      '<label data-trans-actualkpivalue class="Resources"></label>' +
      '<p class="viewmode-value" id="Equation">' + relatedActualValue + '</p>' +
      '</div>' +
      '<div class="col-md-12 multiline">' +
      '<label data-trans-performanceanalysis class="Resources"></label>' +
      '<p class="viewmode-value" id="PerformanceAnalysis">' + relatedPerformanceAnalysis + '</p>' +
      '</div>' +
      '</div>'

    if (filesUrls.length > 0) { // add view before attachement
      $(currentKpiView).insertBefore(
        $("#file_container")
      );
    } else { // add view before cancel btn
      $(currentKpiView).insertBefore(
        $("button.btn.btn-action.btn-cancel").parent().parent()
      );
    }

    View_Previous_kpi.init() // should return it when need to show the previous info of kpi

    changeResources()
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
    var currentYear = new Date().getFullYear()
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><And><Eq><FieldRef Name='KPI'/><Value Type='Text'>" + KPICode + "</Value></Eq><Eq><FieldRef Name='Year'/><Value Type='Text'>" + currentYear + "</Value></Eq></And></And></Where></Query></View>"
    );

    View_Current_Kpi.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(View_Current_Kpi.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, View_Current_Kpi.onSuccess),
      Function.createDelegate(this, View_Current_Kpi.onError)
    );

  },
  g: {
  }
}

var View_Previous_kpi = {
  onSuccess: function (sender, args) {
    var collListItem = View_Previous_kpi.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var targetValue = '', targetAnalysis = '';
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      targetValue = oListItem.get_item(targetActualValue) || 0
      targetAnalysis = oListItem.get_item(targetPerformanceAnalysis) || No_Data
    }

    var previousKpiView =
      '<div class="py-5 border-bottom section-container " data-groups="">' +
      '<div class="form-row"><div class="col-lg-3 col-md-4 mb-4"><h3 data-trans-previouskpi class="Resources"></h3><span class="font-14"></span></div>' +
      '<div class="col-lg-9 col-md-8 white-box p-4 fieldset-container">' +
      '<div class="col-md-6 multiline">' +
      '<label data-trans-yeartype class="Resources"></label>' +
      '<p class="viewmode-value" id="Year_Previous">' + targetYear + '</p>' +
      '</div>' +
      '<div class="col-md-6 multiline">' +
      targetPerioudType +
      '</div>' +
      '<div class="col-md-6 multiline">' +
      '<label data-trans-actualkpivalue class="Resources"></label>' +
      '<p class="viewmode-value" id="Equation_Previous">' + targetValue + '</p>' +
      '</div>' +
      '<div class="col-md-12 multiline">' +
      '<label data-trans-performanceanalysis class="Resources"></label>' +
      '<p class="viewmode-value" id="PerformanceAnalysis_Previous">' + targetAnalysis + '</p>' +
      '</div>' +
      '</div>' +
      '</div>'

    $(previousKpiView).insertBefore(
      $(".current_kpi")
    );
    changeResources()

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
    var currentYear = new Date().getFullYear()
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><And><Eq><FieldRef Name='KPI'/><Value Type='Text'>" + KPICode + "</Value></Eq><Eq><FieldRef Name='Year'/><Value Type='Text'>" + targetYear + "</Value></Eq></And></And></Where></Query></View>"
    );
    View_Previous_kpi.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(View_Previous_kpi.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, View_Previous_kpi.onSuccess),
      Function.createDelegate(this, View_Previous_kpi.onError)
    );
  },
  g: {}
}

var Check_Item_Deleted = {
  onSuccess: function (sender, args) {
    var collListItem = Check_Item_Deleted.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var deleted = true

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      deleted = false
    }

    if (deleted) {
      if (isView) {// to remove the child from view
        if (listkey == 'milestones') {
          $('#RelatedInitiativeMilestone').html(No_Data)
        } else if (listkey == 'projects') {
          $('#RelatedInitiative').html(No_Data)
          $('#RelatedInitiativeDeliverable').html(No_Data)
        } else if (listkey == 'mainkpi') { // to remove the child from view
          $('#RelatedStrategyType').html(No_Data)
          if (indexTypekpi == 'main') {
            var sosVal = $('#RelatedStrategyObjective').html()
            if (!sosVal) {
              $('#Sector').html(No_Data)
              $('#SubSector').html(No_Data)
            }
          } else if (indexTypekpi == 'sub') {
            var sosVal = $('#SubRelatedObjective').html()
            if (!sosVal) {
              $('#Sector').html(No_Data)
              $('#SubSector').html(No_Data)
              $('#Portfolio').html(No_Data)
            }
          }
        }

      } else if (isEdit) { // to remove the child from view
        if (listkey == 'projects') {
          $('#RelatedInitiativeDeliverable').html('')
        } else if (listkey == 'mainkpi') {
          $('#RelatedStrategyType').val('')
          if (indexTypekpi == 'main') {
            var sosVal = $('#RelatedStrategyObjective').val()
            if (!sosVal) {
              $('#Sector').val('')
              $('#SubSector').val('')
            }
          } else if (indexTypekpi == 'sub') {
            var sosVal = $('#SubRelatedObjective').val()
            if (!sosVal) {
              $('#Sector').val('')
              $('#SubSector').val('')
              $('#Portfolio').val('')
            }
          }
        }
      }
    } else {
      if (isView) {
        if (listkey == 'projects') {
          // ProjectInitiativeDelevrable.init('InitiativeDeliverables', globalInitiativeCode) // no needed cause in view we use field multiselectstring
        } else if (listkey == 'mainkpi') { // to remove the child from view
          if (indexTypekpi == 'main') {
            var sosVal = $('#RelatedStrategyObjective').html()
            if (!sosVal) {
              $('#Sector').html(No_Data)
              $('#SubSector').html(No_Data)
            }
          } else if (indexTypekpi == 'sub') {
            var sosVal = $('#SubRelatedObjective').html()
            if (!sosVal) {
              $('#Sector').html(No_Data)
              $('#SubSector').html(No_Data)
              $('#Portfolio').html(No_Data)
            }
          }
        }
      } else if (isEdit) {
        if (listkey == 'projects') {
          ProjectInitiativeDelevrable.init('InitiativeDeliverables', globalInitiativeCode)
        } else if (listkey == 'mainkpi') {
          Goal_Strategy_Info.init(relatedStrategyKpi)

          if (indexTypekpi == 'main') {
            console.log(relatedMainGoal, "relatedMainGoalrelatedMainGoalrelatedMainGoal")
            var sosVal = relatedMainGoal
            if (!sosVal) {
              $('#Sector').val(No_Data)
              $('#SubSector').val(No_Data)
            }
          } else if (indexTypekpi == 'sub') {

            // var sosVal = $('#SubRelatedObjective').val()
            var sosVal = relatedSubGoal

            if (!sosVal) {
              $('#Sector').val(No_Data)
              $('#SubSector').val(No_Data)
              $('#Portfolio').val(No_Data)
            }
          }
          // Kpi_Related_Goal.init(relatedStrategyKpi, indexTypekpi)
        }
      }
    }

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function (listName, code, fielRef) {
    // globalListName = listName
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(listName);
    var camlQuery = new SP.CamlQuery();
    var currentYear = new Date().getFullYear()
    camlQuery.set_viewXml(
      '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name=' + fielRef + ' /><Value Type="Text">' + code + '</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>'
    );

    Check_Item_Deleted.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Check_Item_Deleted.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Check_Item_Deleted.onSuccess),
      Function.createDelegate(this, Check_Item_Deleted.onError)
    );

  },
  g: {
  }
}



//function to delete the task from wf
// var Delete_Wf_Task = {
//   init: function () {
//     console.log("INSIDE DELETE")
//     var fieldNameRef = '', fieldValue = '';

//     if (PCODE) {
//       fieldNameRef = 'ProjectCode'
//       fieldValue = PCODE
//     } else if (ICODE) {
//       fieldNameRef = 'InitiativeCode'
//       fieldValue = ICODE
//     }

//     var context = SP.ClientContext.get_current();
//     var dfd = $.Deferred();
//     var programList = context.get_web().get_lists().getByTitle('Tasks');
//     var camlQuery = new SP.CamlQuery();
//     camlQuery.set_viewXml("<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><And><Eq><FieldRef Name=" + fieldNameRef + "/><Value Type='Text'>" + fieldValue + "</Value></Eq><Eq><FieldRef Name='StageID'/><Value Type='Text'>" + currentStageForItem + "</Value></Eq></And></And></Where></Query></View>")

//     //Get items by Query
//     var progColl = programList.getItems(camlQuery);
//     //Load item collection
//     context.load(progColl);

//     context.executeQueryAsync(
//       function () {
//         var currentItemArray = [];
//         if (progColl.get_count() > 0) {
//           var progEnum = progColl.getEnumerator();
//           while (progEnum.moveNext()) {
//             var currentItem = progEnum.get_current();
//             var currentId = currentItem.get_item("ID");

//             //Get Item by current ID
//             var items = programList.getItemById(currentId);
//             items.set_item('DeletionStatus', 'Deleted');

//             //Update the item
//             items.update();
//             currentItemArray.push(items);
//             context.load(currentItemArray[currentItemArray.length - 1]);
//           }
//           context.executeQueryAsync(
//             function () {
//               console.log("after remove task")
//
//               if (
//                 listkey == "projects" ||
//                 listkey == "ideas" ||
//                 listkey == "portfolio" ||
//                 listkey == "budgetitems"
//               ) {
//                 window.location =
//                   _spPageContextInfo.webAbsoluteUrl +
//                   "/SitePages/Listing.aspx?ListKey=" +
//                   listkey;
//               } else {
//                 window.location =
//                   _spPageContextInfo.webAbsoluteUrl +
//                   "/SitePages/Listing.aspx?ListKey=" +
//                   listkey +
//                   PCODE_STRING;
//               }
//               dfd.resolve();
//             },
//             function (sender, args) {
//               //Item updated fail
//               console.log(
//                 "Request Failed to delete Item Items :" + args.get_message()
//               );
//             }
//           );
//         }
//       })

//   }
// }

