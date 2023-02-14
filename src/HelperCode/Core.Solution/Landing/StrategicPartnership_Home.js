var strategicName = "",
  strategicCode;




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
        "projectsector" +
        "</span></span>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<h3 data-trans-subsector class="Resources black initiativeProjHomeInfoTitleStyle"></h3>' +
        '<span class="des-13"><span class="state-val initiativeProjHomeInfoValueStyle">' +
        "projectSubsector" +
        "</span></span>" +
        "</div>" +
        '<span class="des-13 project-date">' +
        '<span class="start-date"><span data-trans-basestart class="Resources initiativeProjHomeInfoTitleStyle"></span><span class="px-2 initiativeProjHomeInfoValueStyle">' +
        "baselineStartDate" +
        "</span></span>" +
        '<span class="end-date"><span data-trans-basefinish class="Resources initiativeProjHomeInfoTitleStyle"></span><span class="px-2 initiativeProjHomeInfoValueStyle">' +
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
        "projectRelatedInitiative" +
        '</span><span class="tooltiptextblack" id="relatedinitchild">' +
        "projectRelatedInitiative" +
        "</span></span>" +
        "</div>" +
        "</div>" +
        //
        '<div class="mb-0 py-3 px-4 d-flex flex-wrap justify-content-between align-items-center scnd-row" href="#">' +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span class="des-13"><span data-trans-pattr56 class="Resources complition-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        '<h4 class="black actual-complete-val initiativeProjHomeInfoValueStyle">' +
        " projectActualImplementationSchedule.toFixed(2)" +
        "%</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span class="des-13"><span data-trans-pattr6 class="Resources state-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        '<h4 class="black initiativeProjHomeInfoValueStyle"> ' +
        "projectPlannedImplementationSchedule.toFixed(2)" +
        "%</h4>" + //
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2 ' +
        "projectProgressStatusSchedule " +
        '">' +
        '<span class="des-13"><span data-trans-pattr8 class="Resources v-important-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        "<h4 data-trans-" +
        "projectProgressStatusSchedule" +
        ' class="black Resources myCompletionStatusSchedual statuscolor' +
        "projectProgressStatusSchedule" +
        '"></h4>' + //
        "</div>" +
        "</div>" +
        '<div class="mb-0 py-3 px-4 d-flex flex-wrap justify-content-between align-items-center third-row" href="#">' +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span class="des-13"><span data-trans-pattr66 class="Resources state-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        '<h4 class="black initiativeProjHomeInfoValueStyle">' +
        "projectActualImplementationMilestone.toFixed(2)" +
        "%</h4>" + //
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2">' +
        '<span class="des-13"><span data-trans-pattr61 class="Resources complition-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        '<h4 class="black initiativeProjHomeInfoValueStyle">' +
        " projectPlannedImplementationMilestone.toFixed(2)" +
        "%</h4>" +
        "</div>" +
        '<div class="d-inline-flex flex-column mx-2 ' +
        "  projectProgressStatusMilestone" +
        '">' +
        '<span class="des-13"><span data-trans-pattr8 class="Resources v-important-val initiativeProjHomeInfoTitleStyle"></span></span>' +
        "<h4 data-trans-" +
        " projectProgressStatusMilestone" +
        ' class="black Resources myCompletionStatusMilestone statuscolor' +
        " projectProgressStatusMilestone" +
        '"></h4>' + //
        "</div>" +
        "</div>" +
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
    STCODE: window.location.href.indexOf("STCODE=") > -1 ? window.location.href.split("STCODE=")[1].split("&")[0] : ""
  }
}












var checkHomeStatusHtml = setInterval(function () {
  StrategicPS_Home_Info_Request.preinit();
}, 1000);


