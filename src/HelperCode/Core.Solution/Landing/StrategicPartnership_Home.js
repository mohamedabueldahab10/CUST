var strategicName = "",
  strategicCode,
  strategicSector,
  strategicSubSector,
  strategicStartDate,
  strategicFinishDate,
  strategicPartnershipDuration,
  strategicPartnershipStatus,
  strategicRelatedInitiative,
  strategicDeliverablesArr = [],
  strategicMilestonesArr = [],
  lstMonthCLicked = "",
  milestonelstMonthClicked = "",
  listStrategicPartnershipProgress = "",
  actualDeliverable = 0,
  plannedDeliverable = 0,
  STStage = "";




if (
  localStorage.getItem("lng") == null ||
  localStorage.getItem("lng") == "ar"
) {
  var No_Data = "لا يوجد";
  var SAR_Currency = "ر.س";
} else {
  var No_Data = "No Data";
  var SAR_Currency = "SAR";
}



var StrategicPS_Home_Info_Request = {
  preinit: function () {
    if ($(".d-flex").length) {
      clearInterval(checkHomeStatusHtml);
      //username
      $(".navbar .user-name").text(
        UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join("")
      );
      $(".user-name-full").text(UserN.Title);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        StrategicPS_Home_Info_Request.init();
      });
    }
  },
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle('Strategic Partnerships');

    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
      StrategicPS_Home_Info_Request.g.STCODE +
      "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>"
    );

    StrategicPS_Home_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(StrategicPS_Home_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, StrategicPS_Home_Info_Request.onSuccess),
      Function.createDelegate(this, StrategicPS_Home_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = StrategicPS_Home_Info_Request.g.collListItem;
    StrategicPS_Home_Info_Request.g.listItemEnum = collListItem.getEnumerator();
    debugger
    var card1 = [];

    while (StrategicPS_Home_Info_Request.g.listItemEnum.moveNext()) {
      var oListItem = StrategicPS_Home_Info_Request.g.listItemEnum.get_current();

      $(".project-info-ctx .card-header > a").attr(
        "href",
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/view.aspx?ListKey=strategicpartnerships&IID=" +
        oListItem.get_id() +
        "&STCODE=" +
        StrategicPS_Home_Info_Request.g.STCODE
      );

      debugger
      strategicName = oListItem.get_item("Name") || No_Data;
      strategicCode = oListItem.get_item("Title") || No_Data;
      strategicSector = oListItem.get_item("Sector") || No_Data;
      strategicSubSector = oListItem.get_item("SubSector") || No_Data;
      strategicStartDate = StrategicPS_Home_Info_Request.g.dateConvert2(oListItem.get_item("StartDate")) || No_Data;
      strategicFinishDate = StrategicPS_Home_Info_Request.g.dateConvert2(oListItem.get_item("FinishDate")) || No_Data;
      strategicPartnershipDuration = oListItem.get_item("Duration") || No_Data;
      strategicPartnershipStatus = oListItem.get_item("Status") || 'nodata';
      strategicRelatedInitiative = oListItem.get_item("RelatedInitiative") || No_Data;
      listStrategicPartnershipProgress = oListItem.get_item("ProgressStatus") || No_Data;
      actualDeliverable = oListItem.get_item("Actual") || 0;
      plannedDeliverable = oListItem.get_item("Planned") || 0;

      STStage = oListItem.get_item('WFStage') || No_Data;


      if (strategicSubSector && strategicSubSector != No_Data) {
        Get_PartnerShip_Representative.init();
      }


      // for strategic stage bilangual
      var strategicStagearr = [];
      if (localStorage.getItem('Dynamo_GenericWFStagesConfig') != null) {
        strategicStagearr = JSON.parse(localStorage.getItem('Dynamo_GenericWFStagesConfig'));
        strategicStagearr = strategicStagearr.filter(function (a) {
          return a.code === STStage
        });
        if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
          STStage = strategicStagearr.length ? strategicStagearr[0].name : '';
        } else STStage = strategicStagearr.length ? strategicStagearr[0].nameEn : '';
      }



      //////

      var strategicsectorarr = [];

      if (localStorage.getItem("Dynamo_Internal Entities") != null && strategicSector != No_Data) {
        strategicsectorarr = JSON.parse(
          localStorage.getItem("Dynamo_Internal Entities")
        );
        strategicsectorarr = strategicsectorarr.filter(function (a) {
          return a.code === strategicSector;
        });
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          strategicSector = strategicsectorarr.length ? strategicsectorarr[0].name : No_Data;
        } else strategicSector = strategicsectorarr.length ? strategicsectorarr[0].nameEn : No_Data;
      }
      var strategicSubsectorarr = [];

      if (localStorage.getItem("Dynamo_Internal Entities") != null && strategicSubSector != No_Data) {

        var value = strategicSubSector == null ? '' : strategicSubSector.split(":::")
        var multiLookUpValuesArr = []
        var items = ""

        strategicSubsectorarr = JSON.parse(
          localStorage.getItem("Dynamo_Internal Entities")
        );
        value.forEach(el => {
          strategicSubsectorarr.filter(function (a) {
            if (a.code == el) {
              multiLookUpValuesArr.push(a)
            }
          });
        })
        if (multiLookUpValuesArr.length) {
          multiLookUpValuesArr.forEach(el => {
            if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
              items += '<span class="multiselectspan">' + el.name + '</span>'
            } else {
              items += '<span>' + el.nameEn + '</span>'
            }
          })
          strategicSubSector = items
        } else {
          strategicSubSector = No_Data
        }

        // debugger
        // strategicSubsectorarr = strategicSubsectorarr.filter(function (a) {
        //   return a.code === strategicSubSector;
        // });
        // if (
        //   localStorage.getItem("lng") == null ||
        //   localStorage.getItem("lng") == "ar"
        // ) {
        //   strategicSubSector = strategicSubsectorarr.length ? strategicSubsectorarr[0].name : No_Data;
        // } else strategicSubSector = strategicSubsectorarr.length ? strategicSubsectorarr[0].nameEn : No_Data;
      }

      if (strategicPartnershipDuration) {
        strategicPartnershipDuration += isArabic ? " شهرا " : "  Months ";
      }

      if (strategicRelatedInitiative && strategicRelatedInitiative != No_Data) {
        Get_RelatedInitiative.init();
      }


      // show the Strategic Partnership name in bredcrum in Strategic Partnership home and apply the tooltip
      $(".page-title").html(
        '<a href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/StrategicPartnershipHome.aspx?STCODE=" +
        strategicCode +
        '">' +
        strategicName +
        '<span class="tooltiptext">' +
        strategicName +
        "</span>" + // to handle the tooltip
        "</a>"
      );
      card1.push(
        '<div class="mb-0 py-3 px-4 d-flex justify-content-between align-items-center border-bottom" href="#">' +
        '<div class="d-inline-flex flex-row align-items-center">' +
        '<span class="icon-user lg d-inline-flex align-items-center text-center handlecircle circlecolor' +
        listStrategicPartnershipProgress +
        '">' +
        "</span>" +
        '<div class="d-inline-flex flex-column mx-3">' +
        '<h3 class="acc-title d-inline-flex black">' +
        strategicName +
        "</h3>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<h3 data-trans-strategicpartnercode class="Resources black initiativeProjHomeInfoTitleStyle"></h3>' +
        '<span class="des-13"><span class="complition-val initiativeProjHomeInfoValueStyle">' +
        strategicCode +
        "</span></span>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<h3 data-trans-sector class="Resources black initiativeProjHomeInfoTitleStyle"></h3>' +
        '<span class="des-13"><span class="state-val initiativeProjHomeInfoValueStyle">' +
        strategicSector +
        "</span></span>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2 overflow_span">' +
        '<h3 data-trans-subsector class="Resources black initiativeProjHomeInfoTitleStyle"></h3>' +
        '<span class="des-13"><span class="state-val initiativeProjHomeInfoValueStyle">' +
        strategicSubSector +
        "</span></span>" +
        "</div>" +
        '<span class="des-13 project-date">' +
        '<span class="start-date"><span data-trans-strategicpartnerstart class="Resources initiativeProjHomeInfoTitleStyle"></span><span class="px-2 initiativeProjHomeInfoValueStyle">' +
        strategicStartDate +
        "</span></span>" +
        '<span class="end-date"><span data-trans-strategicpartnerend class="Resources initiativeProjHomeInfoTitleStyle"></span><span class="px-2 initiativeProjHomeInfoValueStyle">' +
        strategicFinishDate +
        "</span></span>" +
        "</span>" +
        "</div>" +
        '<div class="mb-0 py-3 px-4 d-flex justify-content-between align-items-center border-bottom" href="#">' +
        // '<div class="d-inline-flex flex-column mx-2 ' +
        // "phase" +
        // '">' +
        // '<span data-trans-pattr5 class="Resources des-13 initiativeProjHomeInfoTitleStyle"></span>' +
        // '<h4 class="acc-title d-inline-flex black">' +
        // "phasename" +
        // "</h4>" +
        // "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span data-trans-pattr60 class="Resources des-13 initiativeProjHomeInfoTitleStyle"></span>' +
        '<h4 class="acc-title d-inline-flex black initiativeProjHomeInfoValueStyle">' +
        STStage +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<h3 data-trans-relatedinitiative class="Resources black initiativeProjHomeInfoTitleStyle"></h3>' +
        '<span class="des-13 overflow-ellipsis-black" ><span class="initiativeProjHomeInfoValueStyle" id="relatedinit" style="cursor:pointer">' +
        strategicRelatedInitiative +
        '</span><span class="tooltiptextblack" id="relatedinitchild">' +
        strategicRelatedInitiative +
        "</span></span>" +
        "</div>" +
        "</div>" +
        //

        '<div class="mb-0 py-3 px-4 d-flex flex-wrap justify-content-between align-items-center fourth-row" href="#">' +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span class="des-13"><span data-trans-pattr76 class="Resources state-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        '<h4 class="black initiativeProjHomeInfoValueStyle">' +
        actualDeliverable.toFixed(2) +
        "%</h4>" + //
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span class="des-13"><span data-trans-pattr62 class="Resources complition-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        '<h4 class="black initiativeProjHomeInfoValueStyle">' +
        plannedDeliverable.toFixed(2) +
        "%</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2 ' +
        listStrategicPartnershipProgress +
        ' ">' +
        '<span class="des-13"><span data-trans-pattr8 class="Resources v-important-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        "<h4 data-trans-" +
        listStrategicPartnershipProgress +
        ' class="black Resources myCompletionStatusDelivrables statuscolor' +
        listStrategicPartnershipProgress +
        '"></h4>' + //
        "</div>" +
        "</div>"
      );

    }


    // hide side nav and project nav in wf
    if (isWF) {
      $(".page-nav").attr("style", "display: none !important");
      $(".sidebar").attr("style", "display: none !important");
      $(".main-panel").attr("style", "width: 100% !important");
    }


    $(".project-details-ctx .card.h-100").html(card1.join("")); // attaching card 1


    $("#PjPriority").append("<span data-trans-" + strategicPartnershipStatus + ' class="Resources initiativeProjHomeInfoValueStyle"></span>');


    $(".project-delivery-info .d-flex:nth-child(1) > span:nth-child(2)").text(strategicPartnershipDuration);


    $(".navbar.page-nav.px-5 li.nav-item a:not(:visible)").parent().hide();


    // handle schedual section
    var schedualInfo = ""
    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {

      schedualInfo = Resources.ar["delevrableinfoschedual"]
    } else {
      schedualInfo = Resources.en["delevrableinfoschedual"]

    }

    $(".sched-head").append(
      '<div class="schedule-src-wrapper">' +
      '<span class="schedule-info"><i data-toggle="tooltip" data-html="true" title="' + schedualInfo + '" class="my-info-i fas fa-info-circle"></i></span>' +
      '<select class="schedule-src">' +
      '<option data-trans-schedsystem class="Resources" value="deliverables">deliverables</option>' +
      '<option data-trans-milestones class="Resources" value="milestones">milestones</option>' +
      "</select>" +
      "</div>"
    );

    $(".fromDeliverables .tlContainer").html(`<p style="text-align:center">${No_Data}</p>`); // container of data

    $(".schedule-src").on("change", function () {

      if ($(this).val() == "deliverables") {


        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          schedualInfo = Resources.ar["delevrableinfoschedual"]
        } else {
          schedualInfo = Resources.en["delevrableinfoschedual"]
        }

        $('.fromDeliverables').show()
        // $('.fromTimeLine').hide()
        $('.fromMilestones').hide()

        $(".fromDeliverables select#inputYear").val("");


      } else if ($(this).val() == "milestones") {

        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {

          schedualInfo = Resources.ar["milestoneinfoschedual"]
        } else {
          schedualInfo = Resources.en["milestoneinfoschedual"]

        }

        $('.fromDeliverables').hide()
        // $('.fromTimeLine').hide()
        $('.fromMilestones').show()

        $(".fromMilestones select#inputYear").val("");
      }
      $(".schedule-info > .my-info-i").attr("title", schedualInfo)
      $(".schedule-info > .my-info-i").attr("data-original-title", schedualInfo)
      $(".tlContainer").html(`<p style="text-align:center">${No_Data}</p>`); // container of data


    })

    $('[data-toggle="tooltip"]').tooltip();

    //
    // calling internal list functions
    Partnership_Issues_Info_Request.init();
    Partnership_Risks_Info_Request.init();
    Partnership_Deliverables_Info_Request.init();
    Partnership_Milestones_Info_Request.init();
    //


    changeResources();

    $(
      "div#particles-foreground, div#particles-background, .vertical-centered-box"
    ).animate(
      {
        opacity: 0,
      },
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
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  g: {
    STCODE: window.location.href.indexOf("STCODE=") > -1 ? window.location.href.split("STCODE=")[1].split("&")[0] : "",
    dateConvert: function (date) {
      if (date) {
        var local = date.getTime();
        var offset = date.getTimezoneOffset() * (60 * 1000);
        var utc = new Date(local + offset);
        var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
        var datetouse = riyadh.toLocaleString("en-US").split(",")[0].split("/");
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
        return datetouse2;
      } else {
        return No_Data;
      }
    },
    dateConvert2: function (
      date //date format supported by standards
    ) {
      if (date) {
        var local = date.getTime();
        var offset = date.getTimezoneOffset() * (60 * 1000);
        var utc = new Date(local + offset);
        var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
        var datetouse = riyadh.toLocaleString("en-US").split(",")[0].split("/");
        datetouse[0] =
          datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
        datetouse[1] =
          datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
        var datetouse2 = datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1]; //yyyy-mm-dd
        return datetouse2;
      } else {
        return No_Data;
      }
    },
    kFormatter: function (num) {
      return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
        : Math.sign(num) * Math.abs(num);
    },
  }
}


var checkHomeStatusHtml = setInterval(function () {
  StrategicPS_Home_Info_Request.preinit();
}, 1000);


var Get_RelatedInitiative = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Initiatives");
    var camlQuery = new SP.CamlQuery();

    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Title\" /><Value Type=\"Text\">" +
      strategicRelatedInitiative +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Get_RelatedInitiative.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_RelatedInitiative.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_RelatedInitiative.onSuccess),
      Function.createDelegate(this, Get_RelatedInitiative.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Get_RelatedInitiative.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var initName = "";
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      initName = oListItem.get_item("Name") || No_Data;
    }
    $("#relatedinit").html(initName);
    $("#relatedinitchild").html(initName);
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  g: {},
};

var Get_PartnerShip_Representative = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Internal Entities");
    var camlQuery = new SP.CamlQuery();


    var subsectors = strategicSubSector.split(":::")


    console.log(strategicSubSector.split(":::"), "strategicSubSector strategicSubSector")
    debugger


    // if (allRelatedStrategObjArr.length) {
    //   SoQuery = '<View><Query><Where><And><In><FieldRef Name="Title" /><Values>';
    //   allRelatedStrategObjArr.forEach(function (item) {
    //     SoQuery += '<Value Type="Text">' + item + '</Value>';
    //   });
    //   SoQuery += '</Values></In><Neq><FieldRef Name=\'DeletionStatus\'/><Value Type=\'Text\'>Deleted</Value></Neq></And></Where></Query></View>';
    // }
    var partnershipQuery = '<View><Query><Where><And><In><FieldRef Name="Title" /><Values>'
    subsectors.forEach(function (item) {
      partnershipQuery += '<Value Type="Text">' + item + '</Value>';
    });
    partnershipQuery += '</Values></In><Neq><FieldRef Name=\'DeletionStatus\'/><Value Type=\'Text\'>Deleted</Value></Neq></And></Where></Query></View>';


    camlQuery.set_viewXml(
      partnershipQuery
    );

    // camlQuery.set_viewXml(
    //   "<View><Query><Where><Eq><FieldRef Name=\"Title\" /><Value Type=\"Text\">" + strategicSubSector + "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    // );

    Get_PartnerShip_Representative.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_PartnerShip_Representative.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_PartnerShip_Representative.onSuccess),
      Function.createDelegate(this, Get_PartnerShip_Representative.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Get_PartnerShip_Representative.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var partnershipRepresentative = "";
    while (listItemEnum.moveNext()) {
      debugger
      var oListItem = listItemEnum.get_current();
      partnershipRepresentative = oListItem.get_item("PartnershipRepresentative") ? oListItem.get_item("PartnershipRepresentative").get_lookupValue() : No_Data;


      var represintitveName = `<div class="emp-name d-flex flex-row align-items-center">
      <span class="icon-user d-inline-flex bg-warning align-items-center text-center">
        <span class="user-name w-100">${partnershipRepresentative.split(" ").map((word) => word[0]).join(".")}</span>
      </span>
      <p class="fnt-14 reg mx-3">${partnershipRepresentative}</p>
    </div>`

      $('.media-body').append(represintitveName)

    }

    // $(".project-info-ctx .media-body:nth-of-type(1) .icon-user > .user-name").text(
    //   partnershipRepresentative.split(" ")
    //     .map((word) => word[0])
    //     .join(".")
    // );
    // $(".project-info-ctx .media-body:nth-of-type(1) p.fnt-14.reg.mx-3").text(
    //   partnershipRepresentative
    // );


  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  g: {},
}

var Partnership_Issues_Info_Request = {

  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Issues");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"StrategicPartnershipCode\" /><Value Type=\"Text\">" +
      StrategicPS_Home_Info_Request.g.STCODE +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Partnership_Issues_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Partnership_Issues_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Partnership_Issues_Info_Request.onSuccess),
      Function.createDelegate(this, Partnership_Issues_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Partnership_Issues_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemhtml = [
      '<li class="list-group-item  px-0 phome-btn"><a data-trans-create class="btn-add Resources" href="' +
      _spPageContextInfo.webAbsoluteUrl +
      "/sitepages/new.aspx?ListKey=strategicpartnershipsissues&STCODE=" +
      StrategicPS_Home_Info_Request.g.STCODE +
      '"><i class="icon-plus"></i></a></li>',
    ],
      itemStrategicCode,
      itemStrategicName,
      itemStrategicTitle,
      itemClosuredate,
      itemdateraised;

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();
      itemStrategicCode = oListItem.get_item("StrategicPartnershipCode") || No_Data;
      itemStrategicName = oListItem.get_item("Name") || No_Data;
      itemStrategicTitle = oListItem.get_item("Title") || No_Data;
      itemClosuredate = StrategicPS_Home_Info_Request.g.dateConvert(oListItem.get_item("IssueClosureDate"));
      itemdateraised = StrategicPS_Home_Info_Request.g.dateConvert(oListItem.get_item("DateRaised"));

      itemhtml.push(
        '<li class="list-group-item link-arrow px-0">' +
        '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/View.aspx?ListKey=strategicpartnershipsissues&IID=" +
        itemID +
        "&STCODE=" +
        itemStrategicCode +
        '">' +
        '<div class="d-inline-flex flex-column">' +
        '<h3 class="acc-title d-inline-flex black">' +
        itemStrategicName +
        "</h3>" +
        '<span class="des-13"><span data-trans-pattr49 class="codespan Resources"></span>' +
        itemStrategicTitle +
        "</span>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span data-trans-dateraised class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        itemdateraised +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span data-trans-dateclosure class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        itemClosuredate +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
        "</div>" +
        "</a>" +
        "</li>"
      );
    }

    if (itemhtml.length == 1) {
      itemhtml.push("<h3>" + No_Data + "</h3>");
    }
    $("div#pills-first > ul.list-group").html(itemhtml.join(""));
    changeResources();

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {},

}


var Partnership_Risks_Info_Request = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Risks");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"StrategicPartnershipCode\" /><Value Type=\"Text\">" +
      StrategicPS_Home_Info_Request.g.STCODE +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Partnership_Risks_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Partnership_Risks_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Partnership_Risks_Info_Request.onSuccess),
      Function.createDelegate(this, Partnership_Risks_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Partnership_Risks_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemhtml = [
      '<li class="list-group-item  px-0 phome-btn"><a data-trans-create class="btn-add Resources" href="' +
      _spPageContextInfo.webAbsoluteUrl +
      "/sitepages/new.aspx?ListKey=strategicpartnershipsrisks&STCODE=" +
      StrategicPS_Home_Info_Request.g.STCODE +
      '"><i class="icon-plus"></i></a></li>',
    ],
      itemStrategicCode,
      itemStrategicName,
      itemStrategicTitle,
      itemMitigationTargetDate,
      itemMitigationActualCompletionDate;

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();
      itemStrategicCode = oListItem.get_item("StrategicPartnershipCode") || No_Data;
      itemStrategicName = oListItem.get_item("Name") || No_Data;
      itemStrategicTitle = oListItem.get_item("Title") || No_Data;
      itemMitigationTargetDate = StrategicPS_Home_Info_Request.g.dateConvert(oListItem.get_item("MitigationTargetDate"));
      itemMitigationActualCompletionDate = StrategicPS_Home_Info_Request.g.dateConvert(oListItem.get_item("MitigationActualCompletionDate"));

      itemhtml.push(
        '<li class="list-group-item link-arrow px-0">' +
        '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/View.aspx?ListKey=strategicpartnershipsrisks&IID=" +
        itemID +
        "&STCODE=" +
        itemStrategicCode +
        '">' +
        '<div class="d-inline-flex flex-column">' +
        '<h3 class="acc-title d-inline-flex black">' +
        itemStrategicName +
        "</h3>" +
        '<span class="des-13"><span data-trans-pattr49 class="codespan Resources"></span>' +
        itemStrategicTitle +
        "</span>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span data-trans-riskdateident class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        itemMitigationTargetDate +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span data-trans-riskdateclos class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        itemMitigationActualCompletionDate +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
        "</div>" +
        "</a>" +
        "</li>"
      );
    }

    if (itemhtml.length == 1) {
      itemhtml.push("<h3>" + No_Data + "</h3>");
    }
    $("div#pills-second > ul.list-group").html(itemhtml.join(""));
    changeResources();

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {},

}


var Partnership_Deliverables_Info_Request = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Deliverables");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"StrategicPartnershipCode\" /><Value Type=\"Text\">" +
      StrategicPS_Home_Info_Request.g.STCODE +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Partnership_Deliverables_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Partnership_Deliverables_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Partnership_Deliverables_Info_Request.onSuccess),
      Function.createDelegate(this, Partnership_Deliverables_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Partnership_Deliverables_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemhtml = [
      '<li class="list-group-item  px-0 phome-btn"><a data-trans-create class="btn-add Resources" href="' +
      _spPageContextInfo.webAbsoluteUrl +
      "/sitepages/new.aspx?ListKey=strategicpartnershipsdeliverables&STCODE=" +
      StrategicPS_Home_Info_Request.g.STCODE +
      '"><i class="icon-plus"></i></a></li>',
    ],
      itemStrategicCode,
      itemStrategicName,
      itemStrategicTitle,
      itemDeliveredDate,
      itemPlannedFinishDate;

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();
      itemStrategicCode = oListItem.get_item("StrategicPartnershipCode") || No_Data;
      itemStrategicName = oListItem.get_item("Name") || No_Data;
      itemStrategicTitle = oListItem.get_item("Title") || No_Data;
      itemDeliveredDate = StrategicPS_Home_Info_Request.g.dateConvert(oListItem.get_item("PlannedFinishDate"));
      itemPlannedFinishDate = StrategicPS_Home_Info_Request.g.dateConvert(oListItem.get_item("PlannedFinishDate"));

      strategicDeliverablesArr.push({
        name: itemStrategicName,
        date: itemDeliveredDate,
        Code: itemStrategicTitle
      });

      itemhtml.push(
        '<li class="list-group-item link-arrow px-0">' +
        '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/View.aspx?ListKey=strategicpartnershipsdeliverables&IID=" +
        itemID +
        "&STCODE=" +
        itemStrategicCode +
        '">' +
        '<div class="d-inline-flex flex-column">' +
        '<h3 class="acc-title d-inline-flex black">' +
        itemStrategicName +
        "</h3>" +
        '<span class="des-13"><span data-trans-pattr49 class="codespan Resources"></span>' +
        itemStrategicTitle +
        "</span>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span data-trans-pattr31 class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        itemDeliveredDate +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span data-trans-plannedcompleteddate class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        itemPlannedFinishDate +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
        "</div>" +
        "</a>" +
        "</li>"
      );

    }

    if (itemhtml.length == 1 || itemhtml.length == 0) {
      itemhtml.push("<h3>" + No_Data + "</h3>");
    }
    $("div#pills-fourth > ul.list-group").html(itemhtml.join(""));



    //Time Line
    var sdlyear = "",
      iscuryear = true;
    var yearExcist = false;
    var delivrablesYears = []

    $(".fromDeliverables select#inputYear").html("");
    $(".fromDeliverables select#inputYear").append(`<option data-trans-year class="Resources" value=""></option>`);


    strategicDeliverablesArr.forEach(function (dl, i) { //appending years

      var dataYear = isArabic ? dl.date.split('-')[0] : dl.date.split('-')[2];

      if (dataYear && dataYear != No_Data) { // to handle no data in drop down when there is no data
        if (sdlyear != dataYear) {

          if (dataYear == new Date().getFullYear()) {
            iscuryear = false;
          } else {
            iscuryear = false;
          }

          if (!delivrablesYears.includes(dataYear)) {
            $('.fromDeliverables select#inputYear').append(
              new Option(dataYear, dataYear, iscuryear, iscuryear)
            );
          }
          delivrablesYears.push(dataYear)
          yearExcist = true
        }
      }
      sdlyear = dataYear;
    });


    if (!yearExcist) {
      // to append no data in drop down when there is no data
      $(".fromDeliverables select#inputYear").append(
        new Option(No_Data, No_Data, iscuryear, iscuryear)
      );
    }

    $('.fromDeliverables select#inputYear').on('change', function () {
      $(`#month-${lstMonthCLicked}`).css('background', '#F0F3F8')
      $('.tlContainer').html('') // to reset the data when change on year
      Partnership_Deliverables_Info_Request.g.dltimeline($(this).val());

    });
    //

    $('button.updateprogress').on('click', function () {
      //   ProgressStatus_Data_Submit.init();
      if (!isWF) {
        Update_StrategicPartnershipStatus_Service.init();
      }
    })

    $("button.updateprogress").prop("disabled", false);


    if (!isWF) {
      Update_StrategicPartnershipStatus_Service.init();// update the initiative status when open the page auto
    }

    changeResources();

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {
    dltimeline: function (year) {

      $('.fromTimeLine').hide();
      $('.fromTimeLine .milestone-item[data-year=' + year + ']').show();
      $('.fromTimeLine .time-box').remove();
      var dlyear = '',
        dlmonth = '',
        curdl = $('body'),
        dlhtml = '',
        datetoshow = '';
      //click new timeline
      var monthsArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] // handle the click on all months
      var istimelineData = false // check if there is a data in time line or no


      $('.tlContainer').html('') // container of data

      monthsArr.forEach(el => {
        $(`.fromDeliverables .month-list-ctx #month-${el}`).click(function () {
          istimelineData = false
          $(`.fromDeliverables .month-list-ctx #month-${lstMonthCLicked}`).css('background', '#F0F3F8') // return the previous background color to the origin color
          var dateTitle = '', nameTitle = '';
          if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
            dateTitle = 'التاريخ'
            nameTitle = 'الاسم'
          } else {
            dateTitle = 'Date'
            nameTitle = 'Name'
          }
          dlhtml = '<table style="width:100%">'
          dlhtml += '<tr class="timeLineTableHeader"><th style="border:1px solid #ddd">' + dateTitle + '</th><th style="border:1px solid #ddd">' + nameTitle + '</th></tr>'
          $('.tlContainer').html('')
          $(`.fromDeliverables .month-list-ctx #month-${el}`).css('background', '#D0D0D0') // change background color when click on month
          lstMonthCLicked = el
          strategicDeliverablesArr.forEach(function (dl, i) {
            var dataYear = isArabic ? dl.date.split('-')[0] : dl.date.split('-')[2];
            var dataDay = isArabic ? dl.date.split('-')[2] : dl.date.split('-')[0];
            datetoshow = dl.date.split('-'),
              isArabic ? datetoshow = datetoshow[1] + '-' + dataDay : dataDay + '-' + datetoshow[1];
            dlyear = dataYear;

            if (dlyear == year) {
              if (dl.date.split('-')[1] == 10) { // to handle the data on october month
                if ((el == dl.date.split('-')[1])) {
                  istimelineData = true
                  dlhtml += '<tr><td class="p-date" style="border:1px solid #ddd">' + datetoshow + '</td>' +
                    '<td class="p-title" style="border:1px solid #ddd">' + dl.name + '</td></tr>';
                }
              } else {
                if ((el == dl.date.split('-')[1].replace('0', ''))) {
                  istimelineData = true
                  dlhtml += '<tr><td class="p-date" style="border:1px solid #ddd">' + datetoshow + '</td>' +
                    '<td class="p-title" style="border:1px solid #ddd">' + dl.name + '</td></tr>';
                }
              }
            }
            if (i == strategicDeliverablesArr.length - 1) {
              dlhtml += '</table>'
              $('.tlContainer').append(dlhtml)
              if (!istimelineData) {
                $('.timeLineTableHeader').css('display', 'none') // hide the table if there is no data
                $(".fromDeliverables .tlContainer").html(`<p style="text-align:center">${No_Data}</p>`)

              }
              $('.fromDeliverables .time-box').hover(function () {
                $('.fromDeliverables .delivery-timeline').css('overflow', 'initial');
              }, function () {
                $('.fromDeliverables .delivery-timeline').css('overflow', 'hidden');
              });
            }
          });
        });
      })

      $(`.fromDeliverables .month-list-ctx #month-1`).click()
      $(`.fromDeliverables .month-list .monthBadge`).remove()  // to remove star on the month on change to reset


      strategicDeliverablesArr.forEach(function (dl, i) {
        var delivYear = isArabic
          ? dl.date.split("-")[0]
          : dl.date.split("-")[2];
        if (delivYear == year) {
          var targetMonth = ""
          if (dl.date.split("-")[1] == 10) {
            targetMonth = dl.date.split("-")[1]
          } else {
            targetMonth = dl.date.split("-")[1].replace("0", "")
          }

          if ($(`.fromDeliverables .month-list #month-${targetMonth} > .monthBadge`).length == 0) { // to add star on the month that have value
            $(`.fromDeliverables .month-list #month-${targetMonth}`).prepend(`<span class="monthBadge">*</span>`)
          }
        }
      })
    },
  },
}


var Partnership_Milestones_Info_Request = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Milestones");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"StrategicPartnershipCode\" /><Value Type=\"Text\">" +
      StrategicPS_Home_Info_Request.g.STCODE +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Partnership_Milestones_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Partnership_Milestones_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Partnership_Milestones_Info_Request.onSuccess),
      Function.createDelegate(this, Partnership_Milestones_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Partnership_Milestones_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemhtml = [
      '<li class="list-group-item  px-0 phome-btn"><a data-trans-create class="btn-add Resources" href="' +
      _spPageContextInfo.webAbsoluteUrl +
      "/sitepages/new.aspx?ListKey=strategicpartnershipsmilestones&STCODE=" +
      StrategicPS_Home_Info_Request.g.STCODE +
      '"><i class="icon-plus"></i></a></li>',
    ],
      itemStrategicCode,
      itemStrategicName,
      itemStrategicTitle,
      itemActualDate,
      itemPlannedDate;


    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();
      itemStrategicCode = oListItem.get_item("StrategicPartnershipCode") || No_Data;
      itemStrategicName = oListItem.get_item("Name") || No_Data;
      itemStrategicTitle = oListItem.get_item("Title") || No_Data;
      itemActualDate = StrategicPS_Home_Info_Request.g.dateConvert(oListItem.get_item("ActualDate"));
      itemPlannedDate = StrategicPS_Home_Info_Request.g.dateConvert(oListItem.get_item("PlannedDate"));


      strategicMilestonesArr.push({
        name: itemStrategicName,
        date: itemPlannedDate,
        Code: itemStrategicCode,
      })



      itemhtml.push(
        '<li class="list-group-item link-arrow px-0">' +
        '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/View.aspx?ListKey=strategicpartnershipsmilestones&IID=" +
        itemID +
        "&STCODE=" +
        itemStrategicCode +
        '">' +
        '<div class="d-inline-flex flex-column">' +
        '<h3 class="acc-title d-inline-flex black">' +
        itemStrategicName +
        "</h3>" +
        '<span class="des-13"><span data-trans-pattr49 class="codespan Resources"></span>' +
        itemStrategicTitle +
        "</span>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span data-trans-dateend class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        itemActualDate +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span data-trans-pattr50 class="Resources des-13"></span>' +
        '<h4 class="text-warning">' +
        itemPlannedDate +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
        "</div>" +
        "</a>" +
        "</li>"
      );

    }

    if (itemhtml.length == 1 || itemhtml.length == 0) {
      itemhtml.push("<h3>" + No_Data + "</h3>");
    }

    $("div#pills-fifth > ul.list-group").html(itemhtml.join(""));

    // milestone dropdown schedual section
    $(".fromMilestones select#inputYear").on("change", function () {
      $(`#month-${milestonelstMonthClicked}`).css("background", "#F0F3F8");
      $(".tlContainer").html(""); // to reset the data when change on year
      Partnership_Milestones_Info_Request.g.dltimeline($(this).val());
    });

    var sdlyear = "",
      iscuryear = true;
    var yearExcist = false;
    var MilestonesYears = []

    $(".fromMilestones select#inputYear").html("");

    $(".fromMilestones select#inputYear").append(
      `<option data-trans-year class="Resources" value=""></option>`
    );

    strategicMilestonesArr.forEach(function (dl, i) {
      //appending years
      var dataYear = isArabic ? dl.date.split("-")[0] : dl.date.split("-")[2];


      if (sdlyear != dataYear) {
        if (dataYear == new Date().getFullYear()) {
          iscuryear = true;
        }
        else {
          iscuryear = false;
        }
        if (!MilestonesYears.includes(dataYear)) {
          $(".fromMilestones select#inputYear").append(
            new Option(dataYear, dataYear, iscuryear, iscuryear)
          );
        }

        MilestonesYears.push(dataYear)
        yearExcist = true;
      }
      sdlyear = dataYear;
    });

    if (!yearExcist) {
      // to append no data in drop down when there is no data
      $(".fromMilestones select#inputYear").append(
        new Option(No_Data, No_Data, iscuryear, iscuryear)
      );
    }

    changeResources();


  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {

    dltimeline: function (year) {
      $('.fromTimeLine').hide();
      $('.fromTimeLine .milestone-item[data-year=' + year + ']').show();
      $('.fromTimeLine .time-box').remove();
      var dlyear = '',
        dlmonth = '',
        curdl = $('body'),
        dlhtml = '',
        datetoshow = '';
      //click new timeline
      var monthsArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] // handle the click on all months
      var istimelineData = false // check if there is a data in time line or no

      $('.tlContainer').html('') // container of data

      monthsArr.forEach(el => {
        $(`.fromMilestones .month-list-ctx #month-${el}`).click(function () {
          istimelineData = false
          $(`.fromMilestones .month-list-ctx #month-${milestonelstMonthClicked}`).css('background', '#F0F3F8') // return the previous background color to the origin color
          var dateTitle = '', nameTitle = '';
          if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
            dateTitle = 'التاريخ'
            nameTitle = 'الاسم'
          } else {
            dateTitle = 'Date'
            nameTitle = 'Name'
          }
          dlhtml = '<table style="width:100%">'
          dlhtml += '<tr class="timeLineTableHeader"><th style="border:1px solid #ddd">' + dateTitle + '</th><th style="border:1px solid #ddd">' + nameTitle + '</th></tr>'
          $('.tlContainer').html('')
          $(`.fromMilestones .month-list-ctx #month-${el}`).css('background', '#D0D0D0') // change background color when click on month
          milestonelstMonthClicked = el
          strategicMilestonesArr.forEach(function (dl, i) {
            // datetoshow = dl.date.split('/'), datetoshow = datetoshow[0] + '/' + datetoshow[1];
            var dataYear = isArabic ? dl.date.split('-')[0] : dl.date.split('-')[2];
            var dataDay = isArabic ? dl.date.split('-')[2] : dl.date.split('-')[0];
            datetoshow = dl.date.split('-'),
              isArabic ? datetoshow = datetoshow[1] + '-' + dataDay : dataDay + '-' + datetoshow[1];
            dlyear = dataYear;

            if (dlyear == year) {
              if (dl.date.split('-')[1] == 10) { // to handle the data on october month
                if ((el == dl.date.split('-')[1])) {
                  istimelineData = true
                  dlhtml += '<tr><td class="p-date" style="border:1px solid #ddd">' + datetoshow + '</td>' +
                    '<td class="p-title" style="border:1px solid #ddd">' + dl.name + '</td></tr>';
                }
              } else {
                if ((el == dl.date.split('-')[1].replace('0', ''))) {
                  istimelineData = true
                  dlhtml += '<tr><td class="p-date" style="border:1px solid #ddd">' + datetoshow + '</td>' +
                    '<td class="p-title" style="border:1px solid #ddd">' + dl.name + '</td></tr>';
                }
              }
            }
            if (i == strategicMilestonesArr.length - 1) {
              dlhtml += '</table>'
              $('.tlContainer').append(dlhtml)
              if (!istimelineData) {
                $('.timeLineTableHeader').css('display', 'none') // hide the table if there is no data
                $(".fromMilestones .tlContainer").html(`<p style="text-align:center">${No_Data}</p>`)

              }
              $('.fromMilestones .time-box').hover(function () {
                $('.fromMilestones .delivery-timeline').css('overflow', 'initial');
              }, function () {
                $('.fromMilestones .delivery-timeline').css('overflow', 'hidden');
              });
            }
          });
        });
      })

      $(`.fromMilestones .month-list-ctx #month-1`).click()
      $(`.fromMilestones .month-list .monthBadge`).remove()  // to remove star on the month on change to reset


      strategicMilestonesArr.forEach(function (dl, i) {
        var milestoneYear = isArabic
          ? dl.date.split("-")[0]
          : dl.date.split("-")[2];

        if (milestoneYear == year) {
          var targetMonth = ""
          if (dl.date.split("-")[1] == 10) {
            targetMonth = dl.date.split("-")[1]
          } else {
            targetMonth = dl.date.split("-")[1].replace("0", "")
          }

          if ($(`.fromMilestones .month-list #month-${targetMonth} > .monthBadge`).length == 0) { // to add star on the month that have value
            $(`.fromMilestones .month-list #month-${targetMonth}`).prepend(`<span class="monthBadge">*</span>`)
          }
        }
      })

    }

  },
}


var Update_StrategicPartnershipStatus_Service = {
  init: function () {

    $.ajax({
      type: 'GET',
      url: `${APIURL}/job/updatestrategicpartnershipstatusbydeliverables/${StrategicPS_Home_Info_Request.g.STCODE}`,
      success: function (data) {
        Get_StrategicPartnershipStatus_Info.init()
      },
      error: function (data) {
        console.log("call failed in update strategic partnership service", data);
      },
    });
  }
}

var Get_StrategicPartnershipStatus_Info = {
  init: function () {
    debugger
    $("button.updateprogress").removeClass("loader-action-success");
    $("button.updateprogress").removeClass("loader-action-error");
    $("button.updateprogress").addClass("loader-action");
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Strategic Partnerships');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' + StrategicPS_Home_Info_Request.g.STCODE + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query><RowLimit>1</RowLimit></View>'
    );
    Get_StrategicPartnershipStatus_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_StrategicPartnershipStatus_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_StrategicPartnershipStatus_Info.onSuccess),
      Function.createDelegate(this, Get_StrategicPartnershipStatus_Info.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Get_StrategicPartnershipStatus_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemID, StrategicPartnershipProgressStatus = "", StrategicPartnershipActualDeliverable = "", StrategicPartnershipPlannedDeliverable = "";

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();
      StrategicPartnershipProgressStatus = oListItem.get_item("ProgressStatus") || No_Data;
      StrategicPartnershipActualDeliverable = oListItem.get_item("Actual") || 0;
      StrategicPartnershipPlannedDeliverable = oListItem.get_item("Planned") || 0;

    }


    StrategicPartnershipActualDeliverable = Number(StrategicPartnershipActualDeliverable);
    StrategicPartnershipActualDeliverable = StrategicPartnershipActualDeliverable.toFixed(2);

    StrategicPartnershipPlannedDeliverable = Number(StrategicPartnershipPlannedDeliverable);
    StrategicPartnershipPlannedDeliverable = StrategicPartnershipPlannedDeliverable.toFixed(2);


    $(".project-details-ctx .card.h-100 > .fourth-row > div:nth-child(1) > h4.black").text(StrategicPartnershipActualDeliverable + "%");
    $(".project-details-ctx .card.h-100 > .fourth-row > div:nth-child(2) > h4.black").text(StrategicPartnershipPlannedDeliverable + "%");

    $(".myCompletionStatusDelivrables").removeAttr(
      "data-trans-stat23 data-trans-stat24 data-trans-stat25 data-trans-stat26 data-trans-stat27"
    );

    $(".myCompletionStatusDelivrables").removeClass("statuscolor" + listStrategicPartnershipProgress);
    $(".handlecircle").removeClass("circlecolor" + listStrategicPartnershipProgress);


    $(".myCompletionStatusDelivrables").attr("data-trans-" + StrategicPartnershipProgressStatus, "");
    $(".black.myCompletionStatusDelivrables").text(StrategicPartnershipProgressStatus);

    $(".myCompletionStatusDelivrables").addClass("statuscolor" + StrategicPartnershipProgressStatus);
    $(".handlecircle").addClass("circlecolor" + StrategicPartnershipProgressStatus);


    $("button.updateprogress").removeClass("loader-action");
    $("button.updateprogress").addClass("loader-action-success");

    changeResources();
  },
  onError: function (sender, args) {
    $("button.updateprogress").removeClass("loader-action");
    $("button.updateprogress").addClass("loader-action-error");

    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {},
}