var NAVPID_Root,
    NAVPCODE_Root,
    PrGUID_Root;
var customNavHtml_Root = setInterval(function() {
    Custom_Nav_Request_Root.preinit();

    // if( window.location.href.indexOf('PCODE=') == -1 )
    // {
    //     Custom_Nav_Request_Root.preinit();
    // }
    // else
    // {
    //     clearInterval(customNavHtml_Root);
    // }
}, 2000);


//

//project manager
var Nav_Prj_Info_Root = {
    preinit: function() {
        if ($('.Header-Sharakat').length) { //making sure html is rendered
            clearInterval(customNavHtml_Root);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                Nav_Prj_Info_Root.init();
            });
        }
    },
    onSuccess: function(sender, args) {
        // console.log('GUID - success');
        // console.log(oListItem.get_item('Project_x0020_UID'));
        PrGUID_Root = oListItem.get_item('Project_x0020_UID');

        Custom_Nav_Request_Root.init();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },

    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext('/pwa');
        var oList = clientContext.get_web().get_lists().getByTitle('Project Information');
        Nav_Prj_Info_Root.g.oListItem = oList.getItemById(NAVPID_Root);
        oListItem = Nav_Prj_Info_Root.g.oListItem;
        clientContext.load(Nav_Prj_Info_Root.g.oListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Nav_Prj_Info_Root.onSuccess),
            Function.createDelegate(this, Nav_Prj_Info_Root.onError)
        );
    },
    // Global variables
    g: {}
};
//
var Custom_Nav_Request_Root = {
    onSuccess: function(sender, args) {
        Custom_Nav_Request_Root.g.append();
        Custom_Nav_Request_Root.g.menu();
        var collListItem = Custom_Nav_Request_Root.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var LinkItem = '';
        while (listItemEnum.moveNext()) { //loop through list items
            var oListItem = listItemEnum.get_current();
            //to get value of column for an item use internal name of field
            if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                var title = oListItem.get_item('TitleAr') || 'لا يوجد';
            } else { var title = oListItem.get_item('TitleEn') || 'Not Found'; }
            //
            var Link = oListItem.get_item('URL').$1_1 || '/';
            var Icon = oListItem.get_item('Icon') || 'fas fa-home';
            var isactive = (window.location.href.toLowerCase().split('/').pop() == Link.toLowerCase().split('/').pop()) ? 'active' : '';
            LinkItem +=
                '<li class="nav-item">' +
                '<a class="nav-link ' + isactive + '" href="' + Link + '">' +
                '<div class="d-flex align-items-center">' +
                '<div class="nav-icon">' +
                '<i class="' + Icon + '"></i>' +
                '</div>' +
                '<span class="nav-link-text px-2">' + title + '</span>' +
                '</div>' +
                '</a>' +
                '</li>';
        }
        $(".sidebar-sticky ul.nav.flex-column").html(LinkItem);

        //do stuff after iterating through items is done
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    preinit: function() {
        if ($('.sidebar-sticky').length) { //making sure html is rendered
            clearInterval(customNavHtml_Root);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                Custom_Nav_Request_Root.init();
            });
        }
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded

    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current(); //site url
        var oList = clientContext.get_web().get_lists().getByTitle('Side Navigation'); //list name
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Show\'/><Value Type=\'Integer\'>1</Value></Eq></Where><OrderBy><FieldRef Name=\'Order0\' Ascending=\'True\' /></OrderBy></Query></View>'); //caml query
        Custom_Nav_Request_Root.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Custom_Nav_Request_Root.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Custom_Nav_Request_Root.onSuccess),
            Function.createDelegate(this, Custom_Nav_Request_Root.onError)
        );
    },
    // Global variables
    g: {
        menu: function() {
            $('#menuToggle, .burgerc').click(function() {
                $('.customnav-SPCLASS, .CustomMenu ').toggleClass('shownav');
            });
        },
        append: function() {
            // if (window.location.href.toLowerCase().indexOf("/sitepages/kpis.aspx") == -1) {
            //     $('.o365cs-nav-header16 .o365cs-nav-o365Branding').html('<div class="Logo"><img class="img-Logo" src="/pwa/sites/MoEHE/style library/spm/images/icon.png"></div>');
            // }          
            //$('.Container').prepend('<div id="sideNavBox" role="navigation" class="customnav-SPCLASS ms-dialogHidden ms-forceWrap ms-noList"><ul id="menu" class="root ms-core-listMenu-root static CustomMenu"></ul></div>');
            //$('.o365cs-nav-centerAlign').append('<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="0"></i><a href="#">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="0"></i><a href="#">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="0"></i><a href="#">Issues</a></span></div><div class="UProfile"></div></div>');
        }
    }
};