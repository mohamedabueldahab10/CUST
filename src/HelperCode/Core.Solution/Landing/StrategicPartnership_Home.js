var strategicName = "",
  strategicCode,
  strategicSector,
  strategicSubSector,
  strategicStartDate,
  strategicPartnershipDuration,
  strategicPartnershipStatus,
  strategicRelatedInitiative;




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
    debugger
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

    var card1 = [];

    while (StrategicPS_Home_Info_Request.g.listItemEnum.moveNext()) {
      var oListItem = StrategicPS_Home_Info_Request.g.listItemEnum.get_current();

      strategicName = oListItem.get_item("Name") || No_Data;
      strategicCode = oListItem.get_item("Title") || No_Data;
      strategicSector = oListItem.get_item("Sector") || No_Data;
      strategicSubSector = oListItem.get_item("SubSector") || No_Data;
      strategicStartDate = StrategicPS_Home_Info_Request.g.dateConvert2(oListItem.get_item("StartDate")) || No_Data;
      strategicPartnershipDuration = oListItem.get_item("Duration") || No_Data;
      strategicPartnershipStatus = oListItem.get_item("Status") || 'nodata';
      strategicRelatedInitiative = oListItem.get_item("RelatedInitiative") || No_Data;


      if(strategicSubSector && strategicSubSector != No_Data){
        Get_PartnerShip_Representative.init();
      }


      var strategicsectorarr = [];

      if (localStorage.getItem("Dynamo_Internal Entities") != null) {
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
          strategicSector = strategicsectorarr[0].name;
        } else strategicSector = strategicsectorarr[0].nameEn;
      }
      var strategicSubsectorarr = [];

      if (localStorage.getItem("Dynamo_Internal Entities") != null) {
        strategicSubsectorarr = JSON.parse(
          localStorage.getItem("Dynamo_Internal Entities")
        );
        strategicSubsectorarr = strategicSubsectorarr.filter(function (a) {
          return a.code === strategicSubSector;
        });
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          strategicSubSector = strategicSubsectorarr[0].name;
        } else strategicSubSector = strategicSubsectorarr[0].nameEn;
      }

      if (strategicPartnershipDuration) {
        strategicPartnershipDuration += isArabic ? " شهرا " : "  Months ";
      }

      if (strategicRelatedInitiative && strategicRelatedInitiative != No_Data) {
        Get_RelatedInitiative.init();
      }

  
      
      card1.push(
        '<div class="mb-0 py-3 px-4 d-flex justify-content-between align-items-center border-bottom" href="#">' +
        '<div class="d-inline-flex flex-row align-items-center">' +
        '<span class="icon-user lg d-inline-flex align-items-center text-center handlecircle circlecolor' +
        " projectProgressStatusDeliverable" +
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
        '<div class="d-inline-flex flex-column mx-2">' +
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
        "baselineFinishDate" +
        "</span></span>" +
        "</span>" +
        "</div>" +
        '<div class="mb-0 py-3 px-4 d-flex justify-content-between align-items-center border-bottom" href="#">' +
        '<div class="d-inline-flex flex-column mx-2 ' +
        "phase" +
        '">' +
        '<span data-trans-pattr5 class="Resources des-13 initiativeProjHomeInfoTitleStyle"></span>' +
        '<h4 class="acc-title d-inline-flex black">' +
        "phasename" +
        "</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span data-trans-pattr60 class="Resources des-13 initiativeProjHomeInfoTitleStyle"></span>' +
        '<h4 class="acc-title d-inline-flex black initiativeProjHomeInfoValueStyle">' +
        "stageNamestr" +
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
        " ProjectActualImplementationDeliverable.toFixed(2)" +
        "%</h4>" + //
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span class="des-13"><span data-trans-pattr62 class="Resources complition-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        '<h4 class="black initiativeProjHomeInfoValueStyle">' +
        " projectPlannedImplementationDeliverable.toFixed(2)" +
        "%</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2 ' +
        " projectProgressStatusDeliverable" +
        ' ">' +
        '<span class="des-13"><span data-trans-pattr8 class="Resources v-important-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        "<h4 data-trans-" +
        " projectProgressStatusDeliverable" +
        ' class="black Resources myCompletionStatusDelivrables statuscolor' +
        " projectProgressStatusDeliverable" +
        '"></h4>' + //
        "</div>" +
        "</div>"
      );

    }




    $(".project-details-ctx .card.h-100").html(card1.join("")); // attaching card 1


    $("#PjPriority").append("<span data-trans-" + strategicPartnershipStatus + ' class="Resources initiativeProjHomeInfoValueStyle"></span>');


    $(".project-delivery-info .d-flex:nth-child(1) > span:nth-child(2)").text(strategicPartnershipDuration);


    $(".navbar.page-nav.px-5 li.nav-item a:not(:visible)").parent().hide();

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

    camlQuery.set_viewXml(
      "<View><Query><Where><Eq><FieldRef Name=\"Title\" /><Value Type=\"Text\">" + strategicSubSector + "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );

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
      var oListItem = listItemEnum.get_current();
      partnershipRepresentative = oListItem.get_item("PartnershipRepresentative")? oListItem.get_item("PartnershipRepresentative").get_lookupValue() : No_Data;
    }

    $(".project-info-ctx .media-body:nth-of-type(1) .icon-user > .user-name" ).text(
      partnershipRepresentative.split(" ")
        .map((word) => word[0])
        .join(".")
    );
    $(".project-info-ctx .media-body:nth-of-type(1) p.fnt-14.reg.mx-3").text(
      partnershipRepresentative
    );

  
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  g: {},
}