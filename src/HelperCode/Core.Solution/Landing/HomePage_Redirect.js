
window.checkRedirectiontStatusHtml = setInterval(function () {
    Check_Redirection.preinit()
}, 777);

var Check_Redirection = {
    preinit: function () {
        clearInterval(checkRedirectiontStatusHtml);

        SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
            Check_Redirection.init()
        });

    },
    init: function () {
        window.location =
        _spPageContextInfo.webAbsoluteUrl +
        "/sitepages/" + USER_HomePage;
    }
}  