var NAVPID_Root,
    NAVPCODE_Root,
    PrGUID_Root,
    isArabicNav,
    NavItemsArray = [];
var NavItems = [];


if (
	localStorage.getItem("lng") == null ||
	localStorage.getItem("lng") == "ar"
) {
	isArabicNav = true;
} else {
	isArabicNav = false;
}

var customNavHtml_Root = setInterval(function () {
    
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

var Custom_Nav_Request_Root = {
    onSuccess: function (sender, args) {
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
            } else { var title = oListItem.get_item('TitleEn') || 'No Data'; }
            //
            var Link = oListItem.get_item('URL').$1_1 || '/'; // replace $1_1 to .get_url() if the err happen on side nav (also in proj nav the same)
            var Icon = oListItem.get_item('Icon') || 'fas fa-home';
            var type = oListItem.get_item('NavType');
            var header = oListItem.get_item('Header') ? oListItem.get_item('Header').get_lookupId() : null;
            var AllowTo = oListItem.get_item('AllowOnlyTo');
            var isactive = (window.location.href.toLowerCase().split('/').pop() == Link.toLowerCase().split('/').pop()) ? 'active' : '';
            NavItemsArray.push({ title: title, link: Link, icon: Icon, type: type, header: header, active: isactive, AllowTo: AllowTo, id: oListItem.get_id() });
        }

        // render the correct navigation for Active role 
        var currentUserRole
        if (localStorage.getItem("userRole") == null)
            currentUserRole = GroupItem[0].Role;
        else currentUserRole = localStorage.getItem("userRole");



        var ActiveRole = GroupItem.filter(group => {
            return group.Role == currentUserRole
        })



        NavItemsArray.forEach(function (item, i) {
            if (item.AllowTo[0] == "AllGroups") {
                NavItems.push(item);
            } else if (item.AllowTo.length > 1) {

                if (ActiveRole[0].groupsName.some(group => item.AllowTo.includes(group))) {
                    NavItems.push(item);
                }
            } else {

                if (GroupItem[0].groupsName.some(group => item.AllowTo[0].includes(group))) {
                    NavItems.push(item);
                }
            }
        });
        var headNavItems = NavItems.filter((v) => (v.type === "Header"));
        var chevronIcon = isArabicNav ? "fas fa-chevron-left nav-chevron" : "fas fa-chevron-right nav-chevron";

        headNavItems.forEach(function (a, i, z) {
            if (a.type == "Header") {
                var headID = a.id;
                var newNavItems = NavItems.filter((v) => (v.header === headID)); //get related children
                if (newNavItems.length) {
                    var hasActiveChild = newNavItems.some(function (s) {
                        return s.active === "active";
                    });
                    var openClass = hasActiveChild ? " open" : "";
                    LinkItem +=
                        '<li class="nav-group' + openClass + '">' +
                        '<div class="nav-item header">' +
                        '<button type="button" class="nav-link nav-parent' +
                        (a.active ? " " + a.active : "") +
                        '" aria-expanded="' + (hasActiveChild ? "true" : "false") + '">' +
                        '<div class="d-flex align-items-center w-100">' +
                        '<div class="nav-icon">' +
                        '<i class="' + a.icon + '"></i>' +
                        '</div>' +
                        '<span class="nav-link-text px-2">' + a.title + '</span>' +
                        '<i class="' + chevronIcon + '"></i>' +
                        '</div>' +
                        '</button>' +
                        '</div>' +
                        '<ul class="nav-children list-unstyled mb-0">';

                    newNavItems.forEach(function (s, o, x) {
                        LinkItem +=
                            '<li class="nav-item sub-head">' +
                            '<a class="nav-link ' + s.active + '" href="' + s.link + '">' +
                            '<div class="d-flex align-items-center">' +
                            '<div class="nav-icon">' +
                            '<i class="' + s.icon + '"></i>' +
                            '</div>' +
                            '<span class="nav-link-text px-2">' + s.title + '</span>' +
                            '</div>' +
                            '</a>' +
                            '</li>';
                    });

                    LinkItem += '</ul></li>';
                } else {
                    LinkItem +=
                        '<li class="nav-item nav-leaf">' +
                        '<a class="nav-link ' + a.active + '" href="' + a.link + '">' +
                        '<div class="d-flex align-items-center">' +
                        '<div class="nav-icon">' +
                        '<i class="' + a.icon + '"></i>' +
                        '</div>' +
                        '<span class="nav-link-text px-2">' + a.title + '</span>' +
                        '<i class="' + chevronIcon + '"></i>' +
                        '</div>' +
                        '</a>' +
                        '</li>';
                }
            }
            if (i == headNavItems.length - 1) {
                $(".sidebar-sticky ul.nav.flex-column").html(LinkItem);
                Custom_Nav_Request_Root.g.bindAccordion();
            }
        });
        //do stuff after iterating through items is done
    },
    onError: function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    preinit: function () {
        if ($('.sidebar-sticky').length) { //making sure html is rendered
            clearInterval(customNavHtml_Root);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                Custom_Nav_Request_Root.init();
                getImportantLinks.init();

            });
        }
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded

    // The main Initialization function
    init: function () {
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
        menu: function () {
            $('#menuToggle, .burgerc').on("click", function () {
                $('.customnav-SPCLASS, .CustomMenu ').toggleClass('shownav');
            });
        },
        bindAccordion: function () {
            var $nav = $(".sidebar-sticky ul.nav.flex-column");
            $nav.off("click.spmNavAccordion", ".nav-parent");
            $nav.on("click.spmNavAccordion", ".nav-parent", function (e) {
                e.preventDefault();
                var $group = $(this).closest(".nav-group");
                var willOpen = !$group.hasClass("open");
                $group.toggleClass("open", willOpen);
                $(this).attr("aria-expanded", willOpen ? "true" : "false");
            });
        },
        append: function () {
            // if (window.location.href.toLowerCase().indexOf("/sitepages/kpis.aspx") == -1) {
            //     $('.o365cs-nav-header16 .o365cs-nav-o365Branding').html('<div class="Logo"><img class="img-Logo" src="/pwa/style library/spm/images/icon.png"></div>');
            // }          
            //$('.Container').prepend('<div id="sideNavBox" role="navigation" class="customnav-SPCLASS ms-dialogHidden ms-forceWrap ms-noList"><ul id="menu" class="root ms-core-listMenu-root static CustomMenu"></ul></div>');
            //$('.o365cs-nav-centerAlign').append('<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="0"></i><a href="#">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="0"></i><a href="#">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="0"></i><a href="#">Issues</a></span></div><div class="UProfile"></div></div>');
        }
    }
};

// important links
var getImportantLinks = {
	onSuccess: function (sender, args) {
		var collListItem = getImportantLinks.g.collListItem;
		var listItemEnum = collListItem.getEnumerator();
		var navHTML = [];
		while (listItemEnum.moveNext()) {
            
			//loop through list items
			var oListItem = listItemEnum.get_current();
			//to get value of column for an item use internal name of field
			var title = isArabicNav
				? oListItem.get_item("TitleAr") || "لا يوجد"
				: oListItem.get_item("Title") || "No Data";
			var Link = oListItem.get_item("URL").$1_1 || "/";
			var Icon = oListItem.get_item("Icon");
			var AllowTo = oListItem.get_item("AllowOnlyTo");
			var NewTab = oListItem.get_item("NewTab");
			NavItemsArray.push({
				title: title,
				link: Link,
				AllowTo: AllowTo,
				NewTab: NewTab,
			});
			
			var hasAccess = false
			if (AllowTo[0] == "AllGroups") {
				hasAccess = true
			} else {
				myRoleConfig[0].groupsName.some(function (group) {
					if(AllowTo.includes(group)){
						hasAccess = true
					};
				});
			}

			
			// var hasAccess =
			// 	AllowTo[0] == "AllGroups" ||
			// 	myRoleConfig[0].groupsName.some(function (group) {
			// 		console.log(group,"ggggggggggggggggggggg")
			// 		console.log(AllowTo,"AllowTo AllowTo")
			// 		AllowTo.includes(group);
			// 	});
			// 	console.log(hasAccess,"hasAccess")
            
			if (hasAccess) {
				navHTML.push(`
                    <li class="li-important-links pb-3 mb-3">
                        <a href="${Link}" class="a-important-link">
                            <i class="i-iportant-link ${Icon}"></i>
                            <span class="title-iportant-link mx-3">${title}</span>
                        </a>
                    </li>
                `);
			}
		}
		$(".ul-important-links").html(navHTML.join(""));
	},
	onError: function (sender, args) {
		console.log(
			"Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
		);
	},
	preinit: function () {
		if ($(".sidebar-sticky").length) {
			//making sure html is rendered
			clearInterval(customNavHtml_Root);
			SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
				getImportantLinks.init();
			});
		}
	},
	// Pre-initialization functions ensure scripts, SharePoint dependencies are loaded

	// The main Initialization function
	init: function () {
		var clientContext = new SP.ClientContext.get_current(); //site url
		var oList = clientContext
			.get_web()
			.get_lists()
			.getByTitle("Important Links"); //list name
		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml(
			"<View><Query><Where><Eq><FieldRef Name='Show'/><Value Type='Integer'>1</Value></Eq></Where><OrderBy><FieldRef Name='Order0' Ascending='True' /></OrderBy></Query></View>"
		); //caml query
		getImportantLinks.g.collListItem = oList.getItems(camlQuery);
		clientContext.load(getImportantLinks.g.collListItem);
		clientContext.executeQueryAsync(
			Function.createDelegate(this, getImportantLinks.onSuccess),
			Function.createDelegate(this, getImportantLinks.onError)
		);
	},
	// Global variables
	g: {},
};
