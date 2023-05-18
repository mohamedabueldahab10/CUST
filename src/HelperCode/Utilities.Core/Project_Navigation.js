//Get Nav
var NAVPID,
    NAVPCODE,
    PrGUID,
    PR_ListName = ListArray[0].projects,
    NAV_ListName = ListArray[0].projnav,
    projContext,
    projects,
    isProjectCodehere = window.location.href.indexOf('PCODE=') > -1,
    isInitiativeCodehere = window.location.href.indexOf('ICODE=') > -1,
    InitiativeCode = isInitiativeCodehere ? window.location.href.split('ICODE=')[1].split('&')[0] : '',
    isStrategicPartnerShipCodehere = window.location.href.indexOf('STCODE=') > -1,
    StrategicPartnerShipCode = isStrategicPartnerShipCodehere ? window.location.href.split('STCODE=')[1].split('&')[0] : '',
    isListKeyhere = window.location.href.indexOf('ListKey=') > -1,
    isIdeaPage = window.location.href.indexOf('ideas') > -1,
    isTaskPage = window.location.href.indexOf('tasks') > -1,
    isPortfolioPage = window.location.href.indexOf('portfolio') > -1,
    isRoot = false;
var customNavHtml = setInterval(function () {

    if (isProjectCodehere) {
        Nav_Project_Info_Request.preinit();
    } else if (isInitiativeCodehere) {
        Nav_Initiative_Info_Request.preinit()
    } else if (isStrategicPartnerShipCodehere) {
        Nav_StrategicPS_Info_Request.preinit()
    } else if (isListKeyhere) {
        Custom_Nav_Request.preinit();
    } else {
        clearInterval(customNavHtml);
        $('.extra-nav-items')[0].style.display = "none";
    }
}, 1000);

var Nav_Project_Info_Request = {
    onSuccess: function (sender, args) {
        var collListItem = Nav_Project_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            NAVPID = oListItem.get_id();
            NAVPCODE = oListItem.get_item('Title');
            PrGUID = oListItem.get_item('ProjectGUID');
        }
        Custom_Nav_Request.init();
    },
    onError: function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function () {
        if ($('.navbar.page-nav.px-5').length) {
            clearInterval(customNavHtml);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                Nav_Project_Info_Request.init();
            });
        }
    },
    // The main Initialization function
    init: function () {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle(PR_ListName);
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Title\'/><Value Type=\'Text\'>' + Nav_Project_Info_Request.g.PCODE + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>');
        Nav_Project_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Nav_Project_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Nav_Project_Info_Request.onSuccess),
            Function.createDelegate(this, Nav_Project_Info_Request.onError)
        );
    },
    // Global variables
    g: {
        PCODE: isProjectCodehere ? window.location.href.split('PCODE=')[1].split('&')[0] : '',
    }
};

var Nav_Initiative_Info_Request = {
    onSuccess: function (sender, args) {
        var collListItem = Nav_Initiative_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();


        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            NAVPID = oListItem.get_id();
            NAVPCODE = oListItem.get_item('Title');
            // PrGUID = oListItem.get_item('ProjectGUID');
        }
        Custom_Nav_Request.preinit();
    },
    onError: function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function () {
        if ($('.navbar.page-nav.px-5').length) {
            clearInterval(customNavHtml);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                Nav_Initiative_Info_Request.init();
            });
        }
    },
    // The main Initialization function
    init: function () {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle("Initiatives");
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Title\'/><Value Type=\'Text\'>' + Nav_Initiative_Info_Request.g.ICODE + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>');
        Nav_Initiative_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Nav_Initiative_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Nav_Initiative_Info_Request.onSuccess),
            Function.createDelegate(this, Nav_Initiative_Info_Request.onError)
        );
    },
    // Global variables
    g: {
        ICODE: isInitiativeCodehere ? window.location.href.split('ICODE=')[1].split('&')[0] : '',
    }
}


var Nav_StrategicPS_Info_Request = {
    onSuccess: function (sender, args) {
        var collListItem = Nav_StrategicPS_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            NAVPID = oListItem.get_id();
            NAVPCODE = oListItem.get_item('Title');
        }
        Custom_Nav_Request.preinit();
    },
    onError: function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    preinit: function () {
        if ($('.navbar.page-nav.px-5').length) {
            clearInterval(customNavHtml);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                Nav_StrategicPS_Info_Request.init();
            });
        }
    },
    init: function () {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle("Strategic Partnerships");
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Title\'/><Value Type=\'Text\'>' + Nav_StrategicPS_Info_Request.g.STCODE + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>');
        Nav_StrategicPS_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Nav_StrategicPS_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Nav_StrategicPS_Info_Request.onSuccess),
            Function.createDelegate(this, Nav_StrategicPS_Info_Request.onError)
        );
    },
    // Global variables
    g: {
        STCODE: isStrategicPartnerShipCodehere ? window.location.href.split('STCODE=')[1].split('&')[0] : '',
    }
}


var Custom_Nav_Request = {
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function () {
        if ($('.navbar.page-nav.px-5').length) { //making sure html is rendered
            clearInterval(customNavHtml);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                Custom_Nav_Request.init();
            });
        }
    },
    // The main Initialization function
    init: function () {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle(NAV_ListName); //list name
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Show\'/><Value Type=\'Integer\'>1</Value></Eq></Where><OrderBy><FieldRef Name=\'Order0\' Ascending=\'True\' /></OrderBy></Query></View>'); //caml query
        Custom_Nav_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Custom_Nav_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Custom_Nav_Request.onSuccess),
            Function.createDelegate(this, Custom_Nav_Request.onError)
        );
    },
    onSuccess: function (sender, args) {
        var collListItem = Custom_Nav_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var LinkItem = '';
        var extraLinkItem = '';
        var count = 0;
        var module;


        var currentUserRole
        if (localStorage.getItem("userRole") == null)
            currentUserRole = GroupItem[0].Role;
        else currentUserRole = localStorage.getItem("userRole");



        var ActiveRole = GroupItem.filter(group => {
            return group.Role == currentUserRole
        })

        console.log(ActiveRole, "Active ROOOOOOOOOOOLE")




        while (listItemEnum.moveNext()) { //loop through list items
            var oListItem = listItemEnum.get_current();
            module = oListItem.get_item('Module');
            var AllowTo = oListItem.get_item('AllowOnlyTo');


       
            if (isInitiativeCodehere && module.indexOf('Initiative') > -1) {
                //to get value of column for an item use internal name of field
                if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                    var title = oListItem.get_item('TitleAr') || 'لا يوجد';
                } else { var title = oListItem.get_item('TitleEn') || 'No Data'; }
                //
                var Link = oListItem.get_item('URL').$1_1;
                var isOnlyInProjectView = oListItem.get_item('OnlyInProjectView');
                if (isInitiativeCodehere) {

                    Link = (Link.includes('projectname') ? Link.replace('projectname', InitiativeCode) : Link);
                    Link = (Link.includes('VPID') ? Link.replace('VPID', NAVPID).replace('VPCODE', InitiativeCode) : Link);
                    Link = (Link.includes('VPID') ? Link.replace('VPID', NAVPID) : Link);
                    Link = (Link.includes('VPCODE') ? Link.replace('VPCODE', InitiativeCode) : Link);
                    Link = (Link.includes('PCODE') ? Link.replace('PCODE', 'ICODE') : Link);
                    Link = (Link.includes('VProjUid') ? Link.replace('VProjUid', PrGUID) : Link);
                } else if (isListKeyhere) {
                    // Link = (Link.includes('projectname') ? Link.replace('projectname', NAVPCODE) : Link);
                    // Link = (Link.includes('VPID') ? Link.replace('VPID', NAVPID).replace('VPCODE', NAVPCODE) : Link);
                    // Link = (Link.includes('VPID') ? Link.replace('VPID', NAVPID) : Link);
                    Link = (Link.includes('VPCODE') ? Link.replace('&PCODE=VPCODE', '') : Link);
                    Link = (Link.includes('VProjUid') ? '' : Link);
                }
                var tab = (oListItem.get_item('NewTab')) ? '_blank' : '';
                var isactive = (window.location.href.toLowerCase().split('/').pop() == Link.toLowerCase().split('/').pop()) ? 'active' : '';
                if (count < 7) {
                    $('.menuToggleBurgMenu').css('display', 'none');
                    if (AllowTo) {
                        if (AllowTo.includes("AllGroups")) {
                            LinkItem += (isListKeyhere && !isProjectCodehere) && (Link == '' || isOnlyInProjectView) ? '' : '<li class="nav-item ' + isactive + '"><a href="' + Link + '" target="' + tab + '">' + title + '<span class="lineres" style="display:none;"></span></a></li>';
                        } else if (ActiveRole[0].groupsName.some(group => AllowTo.includes(group))) {
                            LinkItem += (isListKeyhere && !isProjectCodehere) && (Link == '' || isOnlyInProjectView) ? '' : '<li class="nav-item ' + isactive + '"><a href="' + Link + '" target="' + tab + '">' + title + '<span class="lineres" style="display:none;"></span></a></li>';
                        }
                    }
                } else {
                    $('.menuToggleBurgMenu').css('display', 'block');
                    if (AllowTo) {
                        if (AllowTo.includes("AllGroups")) {
                            extraLinkItem += (isListKeyhere && !isProjectCodehere) && (Link == '' || isOnlyInProjectView) ? '' : '<li class="nav-item ' + isactive + '"><a href="' + Link + '" target="' + tab + '">' + title + '</a></li>';
                        } else if (ActiveRole[0].groupsName.some(group => AllowTo.includes(group))) {
                            extraLinkItem += (isListKeyhere && !isProjectCodehere) && (Link == '' || isOnlyInProjectView) ? '' : '<li class="nav-item ' + isactive + '"><a href="' + Link + '" target="' + tab + '">' + title + '</a></li>';
                        }
                    }
                }
                count++
            } else if (isStrategicPartnerShipCodehere && module.indexOf('StrategicPartnership') > -1) {
                if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                    var title = oListItem.get_item('TitleAr') || 'لا يوجد';
                } else { var title = oListItem.get_item('TitleEn') || 'No Data'; }
                //
                var Link = oListItem.get_item('URL').$1_1;
                var isOnlyInProjectView = oListItem.get_item('OnlyInProjectView');

                if (isStrategicPartnerShipCodehere) {

                    Link = (Link.includes('projectname') ? Link.replace('projectname', StrategicPartnerShipCode) : Link);
                    Link = (Link.includes('VPID') ? Link.replace('VPID', NAVPID).replace('VPCODE', StrategicPartnerShipCode) : Link);
                    Link = (Link.includes('VPID') ? Link.replace('VPID', NAVPID) : Link);
                    Link = (Link.includes('VPCODE') ? Link.replace('VPCODE', StrategicPartnerShipCode) : Link);
                    Link = (Link.includes('PCODE') ? Link.replace('PCODE', 'STCODE') : Link);
                    Link = (Link.includes('VProjUid') ? Link.replace('VProjUid', PrGUID) : Link);
                } else if (isListKeyhere) {
                    Link = (Link.includes('VPCODE') ? Link.replace('&PCODE=VPCODE', '') : Link);
                    Link = (Link.includes('VProjUid') ? '' : Link);
                }
                var tab = (oListItem.get_item('NewTab')) ? '_blank' : '';
                var isactive = (window.location.href.toLowerCase().split('/').pop() == Link.toLowerCase().split('/').pop()) ? 'active' : '';
                if (count < 7) {
                    $('.menuToggleBurgMenu').css('display', 'none');
                    if (AllowTo) {
                        if (AllowTo.includes("AllGroups")) {
                            LinkItem += (isListKeyhere && !isProjectCodehere && !isInitiativeCodehere) && (Link == '' || isOnlyInProjectView) ? '' : '<li class="nav-item ' + isactive + '"><a href="' + Link + '" target="' + tab + '">' + title + '<span class="lineres" style="display:none;"></span></a></li>';
                        } else if (ActiveRole[0].groupsName.some(group => AllowTo.includes(group))) {
                            LinkItem += (isListKeyhere && !isProjectCodehere && !isInitiativeCodehere) && (Link == '' || isOnlyInProjectView) ? '' : '<li class="nav-item ' + isactive + '"><a href="' + Link + '" target="' + tab + '">' + title + '<span class="lineres" style="display:none;"></span></a></li>';
                        }
                    }
                } else {
                    $('.menuToggleBurgMenu').css('display', 'block');
                    if (AllowTo) {
                        if (AllowTo.includes("AllGroups")) {
                            extraLinkItem += (isListKeyhere && !isProjectCodehere && !isInitiativeCodehere) && (Link == '' || isOnlyInProjectView) ? '' : '<li class="nav-item ' + isactive + '"><a href="' + Link + '" target="' + tab + '">' + title + '</a></li>';
                        } else if (ActiveRole[0].groupsName.some(group => AllowTo.includes(group))) {
                            extraLinkItem += (isListKeyhere && !isProjectCodehere && !isInitiativeCodehere) && (Link == '' || isOnlyInProjectView) ? '' : '<li class="nav-item ' + isactive + '"><a href="' + Link + '" target="' + tab + '">' + title + '</a></li>';
                        }
                    }
                }
                count++
            } else if (isProjectCodehere && module.indexOf('Project') > -1 && !isInitiativeCodehere && !isStrategicPartnerShipCodehere) { //p context
                //to get value of column for an item use internal name of field
                if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                    var title = oListItem.get_item('TitleAr') || 'لا يوجد';
                } else { var title = oListItem.get_item('TitleEn') || 'No Data'; }
                //
                var Link = oListItem.get_item('URL').$1_1;
                var isOnlyInProjectView = oListItem.get_item('OnlyInProjectView');
                if (isProjectCodehere) {
                    Link = (Link.includes('projectname') ? Link.replace('projectname', NAVPCODE) : Link);
                    Link = (Link.includes('VPID') ? Link.replace('VPID', NAVPID).replace('VPCODE', NAVPCODE) : Link);
                    Link = (Link.includes('VPID') ? Link.replace('VPID', NAVPID) : Link);
                    Link = (Link.includes('VPCODE') ? Link.replace('VPCODE', NAVPCODE) : Link);
                    Link = (Link.includes('VProjUid') ? Link.replace('VProjUid', PrGUID) : Link);
                } else if (isListKeyhere) {
                    // Link = (Link.includes('projectname') ? Link.replace('projectname', NAVPCODE) : Link);
                    // Link = (Link.includes('VPID') ? Link.replace('VPID', NAVPID).replace('VPCODE', NAVPCODE) : Link);
                    // Link = (Link.includes('VPID') ? Link.replace('VPID', NAVPID) : Link);
                    Link = (Link.includes('VPCODE') ? Link.replace('&PCODE=VPCODE', '') : Link);
                    Link = (Link.includes('VProjUid') ? '' : Link);
                }
                var tab = (oListItem.get_item('NewTab')) ? '_blank' : '';
                var isactive = (window.location.href.toLowerCase().split('/').pop() == Link.toLowerCase().split('/').pop()) ? 'active' : '';
                if (count < 7) {
                    $('.menuToggleBurgMenu').css('display', 'none');
                    if (AllowTo) {
                        if (AllowTo.includes("AllGroups")) {
                            LinkItem += (isListKeyhere && !isProjectCodehere) && (Link == '' || isOnlyInProjectView) ? '' : '<li class="nav-item ' + isactive + '"><a href="' + Link + '" target="' + tab + '">' + title + '<span class="lineres" style="display:none;"></span></a></li>';
                        } else if (ActiveRole[0].groupsName.some(group => AllowTo.includes(group))) {
                            LinkItem += (isListKeyhere && !isProjectCodehere) && (Link == '' || isOnlyInProjectView) ? '' : '<li class="nav-item ' + isactive + '"><a href="' + Link + '" target="' + tab + '">' + title + '<span class="lineres" style="display:none;"></span></a></li>';
                        }
                    }
                } else {
                    $('.menuToggleBurgMenu').css('display', 'block');
                    if (AllowTo) {
                        if (AllowTo.includes("AllGroups")) {
                            extraLinkItem += (isListKeyhere && !isProjectCodehere) && (Link == '' || isOnlyInProjectView) ? '' : '<li class="nav-item ' + isactive + '"><a href="' + Link + '" target="' + tab + '">' + title + '</a></li>';
                        } else if (ActiveRole[0].groupsName.some(group => AllowTo.includes(group))) {
                            extraLinkItem += (isListKeyhere && !isProjectCodehere) && (Link == '' || isOnlyInProjectView) ? '' : '<li class="nav-item ' + isactive + '"><a href="' + Link + '" target="' + tab + '">' + title + '</a></li>';
                        }
                    }
                }
                count++
            }
        }


        // $('body').append('<style>#menuToggleBurgMenu{background-color:red}</style>')
        $(".navbar.page-nav.px-5 ul.navbar-nav.bd-navbar-nav.flex-row").html(LinkItem);
        $(".navbar.page-nav.px-5 .menuBurg").html(extraLinkItem)
    },
    onError: function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {}
};