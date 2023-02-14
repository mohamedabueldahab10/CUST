


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
    }

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


