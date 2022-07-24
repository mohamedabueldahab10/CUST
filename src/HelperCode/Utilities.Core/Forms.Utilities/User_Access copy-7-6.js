var UserN, UserRole, UserNTasks = 0,
    ar_UserRole, Groups = [],
    GroupItem = [],
    AccessQuery = '<View><Query><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>',
    ChartHide,
    isAdmin = false,
    isPMO = false,
    isITSteering = false,
    isPSponsor = false,
    isPManager = false,
    isBusinessOwner = false,
    isSectionHead = false,
    isSectorHead = false,
    isPortfolioManager = false,
    isStrategySpecialist = false,

    Page_UrlName = window.location.pathname.toLowerCase().indexOf('sitepages') > -1 ? window.location.pathname.toLowerCase().split('/sitepages/')[1] : '', //get page name.aspx
    SP_Page_Name = [], //aray for accessing pages which have access policy on them
    SP_Page_Name = SP_Page_Name.map(name => name.toLowerCase()),
    isSP_Page = SP_Page_Name.indexOf(Page_UrlName) > -1, // are we in a restricted page?
    USER_HomePage = 'home.aspx',

    istherePCODE = window.location.href.toLowerCase().indexOf("pcode=") > -1,
    isWF = window.location.href.toLowerCase().indexOf('&wfs') > -1,
    USERisWF = window.location.href.toLowerCase().indexOf('&wfs') > -1,
    USERlistkey = window.location.href.toLowerCase().indexOf("listkey=") > -1 ? window.location.href.split('ListKey=')[1].split('&')[0] : '',
    USERisProjectHome = window.location.href.toLowerCase().indexOf("/projecthome.aspx") > -1,
    USERProjRelated = [],
    AllListKeys = [],
    // isWF = window.location.href.toLowerCase().indexOf('&wfs') > -1,
    USERForBreadCrumbs = '',
    USERPageTitle, USERPName, USERPID,
    USERisHome = window.location.href.toLowerCase().indexOf("/home.aspx") > -1 || window.location.href.toLowerCase().indexOf("/initiativesmain.aspx") > -1,
    USERisNew = window.location.href.toLowerCase().indexOf("new.aspx") > -1,
    USERisEdit = window.location.href.toLowerCase().indexOf("edit.aspx") > -1,
    USERisView = window.location.href.toLowerCase().indexOf("view.aspx") > -1,
    isfileListing = window.location.href.toLowerCase().indexOf("fileslisting") > -1,
    USERisForm = USERisNew || USERisEdit || USERisView ? true : false,
    USERisListing = window.location.href.toLowerCase().indexOf("listing.aspx") > -1,
    USERisProjects = USERlistkey == 'projects' ? true : false,
    USERisIdeas = USERlistkey == 'ideas' ? true : false,
    forfilterQuery = '',
    USERPCODE_STRING = istherePCODE ? '&PCODE=' + window.location.href.split('PCODE=')[1].split('&')[0] : '',
    USERPCODE = istherePCODE ? window.location.href.split('PCODE=')[1].split('&')[0] : '',
    FullPermissionQuery = '<View><Query><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>',
    ProjectManagerQuery = '<View><Query><Where><Eq><FieldRef Name="ProjectManager" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>',
    StrategyProjectQuery = '<View><Query><Where><Eq><FieldRef Name="IsStrategicProject" /><Value Type="Integer">1</Value></Eq></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>',
    ProjectOwnerQuery = '<View><Query><Where><Eq><FieldRef Name="ProjectOwner" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>',
    ProjectSponsorQuery = '<View><Query><Where><Eq><FieldRef Name="ProjectSponsor" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>',
    PMORepresentativeQuery = '<View><Query><Where><Eq><FieldRef Name="PMORepresentative" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>',
    TasksQuery = '<View><Query><Where><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>',
    RiskQuery = '<View><Query><Where><And><Or><Eq><FieldRef Name="MitigationOwner" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="MitigationOwner" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>',
    //Second Level Querying
    SectorHeadQuery = '', //to be generated dybamicallly [projectsponsor]
    SecondLevel_List,
    SecondLevel_FieldtoQuery,
    SecondLevel_FieldtoQueryType,
    SecondLevel_FieldtoFetch,
    SecondLevel_CAMLQuery,
    SecondLevel_FirstLevel_Field,
    SecondLevel_FirstLevel_FieldType

//CRUD ACCESS
Create_Access = [],
    Read_Access = [],
    Edit_Access = [],
    Delete_Access = [];

var NIssues = 0,
    NTasks = 0,
    NRisks = 0,
    NNotifications = 0;

if (window.location.href.indexOf('ListKey') > -1) {
    for (var i = 0; i < ListArray.length; i++) {
        var obj = ListArray[i];
        AllListKeys.push(Object.keys(obj)[0]); //returning all modules
        for (var key in obj) { //returning project related modules
            if (key == USERlistkey) //get titles
            {
                if (USERisForm)
                    USERPageTitle = obj['FormTitle'];
                else if (USERisListing)
                    USERPageTitle = obj['ListingTitle'];
            }
            if (key == 'projectrelated') {
                if (obj[key]) //if true
                    USERProjRelated.push(Object.keys(obj)[0]);
            }
        }
    }
} else {
    for (var i = 0; i < ListArray.length; i++) {
        var obj = ListArray[i];
        AllListKeys.push(Object.keys(obj)[0]); //returning all modules
    }
}

if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
    var UserNo_Data = 'لا يوجد',
        No_Data = 'لا يوجد';
} else {
    var UserNo_Data = 'Not Found',
        No_Data = 'Not Found';
}

//Get User Groups
var userCalls = {
    get_CurrentUser: function() {
        //getUserWebPermissionREST();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function(data) {
                //console.log(data.d);
                UserN = data.d;
                userCalls.get_CurrentUserGroupColl(data.d.Id);
                //console.log(UserN);
            },
            error: function(data) {
                console.log('call failed');
            }
        });
    },
    get_CurrentUserGroupColl: function(UserID) {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetUserById(" + UserID + ")/Groups",
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function(data) {
                /* get all group's title of current user. */
                var results = data.d.results;
                for (var i = 0; i < results.length; i++) {
                    Groups.push(results[i].Title);
                }
                if (Groups.indexOf('Administrators for Project Web App') == -1)
                    $('body').append('<style>div#ms-designer-ribbon{display:none!important}</style>')
                userCalls.get_userAccess();
                //console.log(UserN);
            }
        });
    },
    get_userAccess: function() {
        for (var i = 0; i < userCalls.g.SPGroups.length; i++) {
            var mygroups = userCalls.g.SPGroups[i].groupsName;
            for (var j = 0; j < mygroups.length; j++) {
                if (Groups.indexOf(mygroups[j]) > -1) {
                    GroupItem.push(userCalls.g.SPGroups[i]);
                }
            }
            if (i == userCalls.g.SPGroups.length - 1) {
                userCalls.get_AccessAction();
            }
        }
        //*****
        UserRole = GroupItem[0].Role;
        // console.log(UserRole);

    },
    get_AccessAction: function() {
        //Add permission for default chart view on home Page + User Title Role
        switch (GroupItem[0].Role) //we need first role for user
        {
            case "Administrator":
                $('body').append('<style>' +
                    'div#s4-ribbonrow, div#O365_MainLink_Settings_container{display:block!important}html #s4-workspace {height: calc(100vh - 105px)!important;}.Progress-Action {display:block!important;}' +
                    '</style>');
                isAdmin = true;
                //***** */
                ChartHide = '.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(1),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)';
                ar_UserRole = "مدير المشروع";
                en_UserRole = "Administrator";
                //CRUD
                Create_Access = ['projects', 'portfolio'];
                Read_Access = ['projects', 'deliverables', 'deliveries', 'risks', 'issues', 'milestones', 'invoices', 'contracts', 'changerequest', 'mom', 'communicationplans', 'lessonslearned', 'stakeholders', 'tasks', 'portfolio', 'ideas'];
                Edit_Access = ['projects', 'portfolio', 'ideas'];
                break;

            case "FullPermission":
            case "IT Steering Committee":
                isITSteering = true;
                $('div#s4-ribbonrow, div#O365_MainLink_Settings_container').remove();
                ChartHide = '.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(2),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(4),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)';
                ar_UserRole = "اللجنة التوجيهية لتكنولوجيا المعلومات";
                en_UserRole = "IT Steering Committee";
                //CRUD
                Create_Access = [];
                Read_Access = ['projects', 'deliverables', 'deliveries', 'risks', 'issues', 'milestones', 'invoices', 'contracts', 'changerequest', 'mom', 'communicationplans', 'lessonslearned', 'stakeholders', 'tasks', 'portfolio', 'ideas'];
                Edit_Access = [];
                break;

            case "Strategy Specialist":
                $('#isStrategic').remove();
                isStrategySpecialist = true;
                $('div#s4-ribbonrow, div#O365_MainLink_Settings_container').remove();
                ChartHide = '.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(1),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(4),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6)';
                ar_UserRole = "أخصائي إستراتيجية";
                en_UserRole = "Strategy Specialist";
                //CRUD
                Create_Access = [];
                Read_Access = ['projects', 'deliverables', 'deliveries', 'risks', 'issues', 'milestones', 'invoices', 'contracts', 'changerequest', 'mom', 'communicationplans', 'lessonslearned', 'stakeholders', 'tasks', 'portfolio', 'ideas'];
                Edit_Access = [];
                break;

            case "SectorHeads":
                isSectorHead = true;
                SecondLevel_List = 'Internal Entities',
                    SecondLevel_FieldtoQuery = 'Owner',
                    SecondLevel_FieldtoQueryType = 'Integer'
                SecondLevel_FieldtoFetch = 'Title',
                    SecondLevel_CAMLQuery = '<View><Query><Where>' +
                    '<Eq>' +
                    '<FieldRef Name="' + SecondLevel_FieldtoQuery + '" LookupId="TRUE" />' +
                    '<Value Type="' + SecondLevel_FieldtoQueryType + '"><UserID /></Value>' +
                    '</Eq>' +
                    '</Where></Query></View>',
                    SecondLevel_FirstLevel_Field = 'Sector',
                    SecondLevel_FirstLevel_FieldType = 'Text';
                ChartHide = '.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(1),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(4),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6)';
                ar_UserRole = "رئيس فرع";
                en_UserRole = "Sector Head";

                //CRUD
                Create_Access = [];
                Read_Access = ['projects', 'deliverables', 'deliveries', 'risks', 'issues', 'milestones', 'invoices', 'contracts', 'changerequest', 'mom', 'communicationplans', 'lessonslearned', 'stakeholders', 'tasks', 'portfolio', 'ideas'];
                Edit_Access = [];
                break;

            case "SectionHeads":
                isSectionHead = true;
                SecondLevel_List = 'Internal Entities',
                    SecondLevel_FieldtoQuery = 'Owner',
                    SecondLevel_FieldtoQueryType = 'Integer'
                SecondLevel_FieldtoFetch = 'Title',
                    SecondLevel_CAMLQuery = '<View><Query><Where>' +
                    '<Eq>' +
                    '<FieldRef Name="' + SecondLevel_FieldtoQuery + '" LookupId="TRUE" />' +
                    '<Value Type="' + SecondLevel_FieldtoQueryType + '"><UserID /></Value>' +
                    '</Eq>' +
                    '</Where></Query></View>',
                    SecondLevel_FirstLevel_Field = 'Section',
                    SecondLevel_FirstLevel_FieldType = 'Text';
                ChartHide = '.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(1),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(4),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6)';
                ar_UserRole = "رئيس قسم";
                en_UserRole = "Section Head";

                //CRUD
                Create_Access = [];
                Read_Access = ['projects', 'deliverables', 'deliveries', 'risks', 'issues', 'milestones', 'invoices', 'contracts', 'changerequest', 'mom', 'communicationplans', 'lessonslearned', 'stakeholders', 'tasks', 'portfolio', 'ideas'];
                Edit_Access = [];
                break;

            case "PortfolioManager": //PMO Team is the Portfolio Managers
                isPortfolioManager = true;
                $('div#s4-ribbonrow, div#O365_MainLink_Settings_container').remove();
                ChartHide = '.statistics-ctx  .ctx-block.row.mx-n2 > div:nth-child(1),.statistics-ctx  .ctx-block.row.mx-n2 > div:nth-child(4),.statistics-ctx  .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx  .ctx-block.row.mx-n2 > div:nth-child(6)';
                ar_UserRole = "مكتب تحكم إدارة المشاريع";
                en_UserRole = "Portfolio Manager";
                SecondLevel_List = 'Portfolio',
                    SecondLevel_FieldtoQuery = 'Manager',
                    SecondLevel_FieldtoQueryType = 'Integer'
                SecondLevel_FieldtoFetch = 'Title',
                    SecondLevel_CAMLQuery = '<View><Query><Where>' +
                    '<Eq>' +
                    '<FieldRef Name="' + SecondLevel_FieldtoQuery + '" LookupId="TRUE" />' +
                    '<Value Type="' + SecondLevel_FieldtoQueryType + '"><UserID /></Value>' +
                    '</Eq>' +
                    '</Where></Query></View>',
                    SecondLevel_FirstLevel_Field = 'portfolio',
                    SecondLevel_FirstLevel_FieldType = 'Text';

                Create_Access = [];
                Read_Access = ['projects', 'deliverables', 'deliveries', 'risks', 'issues', 'milestones', 'invoices', 'contracts', 'changerequest', 'mom', 'communicationplans', 'lessonslearned', 'stakeholders', 'tasks', 'portfolio', 'ideas'];
                Edit_Access = ['projects'];
                break;

            case "ProjectManager":
                $('body').append('<style>' +
                    '.Progress-Action {display:block!important;}' +
                    '</style>');
                isPManager = true;
                $('div#s4-ribbonrow, div#O365_MainLink_Settings_container').remove();
                ChartHide = '.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(1),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)';
                ar_UserRole = "مدير المشروع";
                en_UserRole = "Project Manager";
                //CRUD
                Create_Access = ['deliverables', 'deliveries', 'risks', 'issues', 'milestones', 'invoices', 'contracts', 'changerequest', 'mom', 'communicationplans', 'lessonslearned', 'stakeholders'];
                Read_Access = ['projects', 'deliverables', 'deliveries', 'risks', 'issues', 'milestones', 'invoices', 'contracts', 'changerequest', 'mom', 'communicationplans', 'lessonslearned', 'stakeholders', 'tasks', 'portfolio', 'ideas'];
                Edit_Access = ['projects', 'deliverables', 'deliveries', 'risks', 'issues', 'milestones', 'invoices', 'contracts', 'changerequest', 'mom', 'communicationplans', 'lessonslearned', 'stakeholders'];
                break;

            case "BusinessOwner":
                //
                isBusinessOwner = true;
                $('div#s4-ribbonrow, div#O365_MainLink_Settings_container').remove();
                ChartHide = '.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(4),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)';
                ar_UserRole = "صاحب العمل";
                en_UserRole = "Business Owner";

                //CRUD
                Create_Access = ['ideas'];
                Read_Access = ['projects', 'deliverables', 'deliveries', 'risks', 'issues', 'milestones', 'invoices', 'contracts', 'changerequest', 'mom', 'communicationplans', 'lessonslearned', 'stakeholders', 'tasks', 'portfolio', 'ideas'];
                Edit_Access = ['ideas'];

                break;

            default:
                ChartHide = '.ctx-block.row.mx-n2 > div:nth-child(4),.ctx-block.row.mx-n2 > div:nth-child(5),.ctx-block.row.mx-n2 > div:nth-child(6),.ctx-block.row.mx-n2 > div:nth-child(7)';
        }

        //New CRUD Access Solution [will not affect below behavior]
        Create_Access = Create_Access.map(name => name.toLowerCase()), //making sure everything is lower case
            Read_Access = Read_Access.map(name => name.toLowerCase()),
            Edit_Access = Edit_Access.map(name => name.toLowerCase()),
            Delete_Access = Delete_Access.map(name => name.toLowerCase());
        switch (true) //Create Access
        {
            case (USERisNew || USERisListing || USERisProjectHome) && (Create_Access.indexOf(USERlistkey.toLowerCase()) == -1 && Create_Access.indexOf(Page_UrlName) == -1 && !USERisWF):
                if (USERisNew) // on edit/new forms
                {
                    window.location = _spPageContextInfo.webAbsoluteUrl;
                } else if (isSP_Page) // on restricted  page
                {
                    window.location = _spPageContextInfo.webAbsoluteUrl + '/sitepages/' + USER_HomePage;
                }
                //create btn
                $('body').append('<style>' +
                    '.btn-add{opacity: .6;pointer-events: none;}' +
                    '</style>');
                break;
        }
        switch (true) //Read Access
        {
            case Read_Access.indexOf(USERlistkey) == -1 && Read_Access.indexOf(Page_UrlName) == -1 && !USERisWF:
                if (USERisView) //on view
                {
                    window.location = _spPageContextInfo.webAbsoluteUrl;
                } else if (USERisListing) //on listing
                {
                    $('body').append('<style>' +
                        '.Listing-wrapper a{opacity: .6;pointer-events: none;}' +
                        '</style>');
                } else if (isSP_Page) // on restricted  page
                {
                    window.location = _spPageContextInfo.webAbsoluteUrl + '/sitepages/' + USER_HomePage;
                }
                break;
        }
        switch (true) //Edit Access
        {
            case USERisEdit && (Edit_Access.indexOf(USERlistkey.toLowerCase()) == -1 && Edit_Access.indexOf(Page_UrlName) == -1 && !USERisWF):
                if (USERisEdit) //on edit
                {
                    window.location = _spPageContextInfo.webAbsoluteUrl;
                } else if (USERisView) //on view pages
                {
                    $('body').append('<style>' +
                        '.btn-save{opacity: .6;pointer-events: none;}' +
                        '</style>');
                } else if (isSP_Page) // on restricted  page
                {
                    window.location = _spPageContextInfo.webAbsoluteUrl + '/sitepages/' + USER_HomePage;
                }
                break;
        }
        switch (true) //Delete Access
        {
            case Delete_Access.indexOf(USERlistkey.toLowerCase()) == -1:
                //Delete btn
                $('body').append('<style>' +
                    '.btn-delete{opacity: .6;pointer-events: none;}' +
                    '</style>');
                break;
        }
        //end CRUD

        if (!isSectionHead && !isPortfolioManager && !isSectorHead) // IF Data directly getting from project list
        {
            Access_Project_Info_Request.preinit();
        } else if ((istherePCODE || USERisHome || USERisListing) && (isSectionHead || isPortfolioManager || isSectorHead)) //if data getting from other list related to project
        {
            Access_Sector_Info_Request.preinit();
        }
    },
    g: {
        SPGroups: [{
                Role: "Administrator",
                groupsName: ["Administrators for Project Web App"]
            },
            {
                Role: "FullPermission",
                groupsName: ["IT Steering Committee"]
            },
            {
                Role: "Strategy Specialist",
                groupsName: ["Strategy Specialist"]
            },
            {
                Role: "SectionHeads",
                groupsName: ["Section Head"]
            },
            {
                Role: "SectorHeads",
                groupsName: ["Sector Head"]
            },
            {
                Role: "PortfolioManager",
                groupsName: ["PMO Team"]
            },
            {
                Role: "ProjectManager",
                groupsName: ["Project Managers for Project Web App"]
            },
            {
                Role: "BusinessOwner",
                groupsName: ["Business Owner"]
            },
            {
                Role: "Other",
                groupsName: ["Legal User", "Procurement User", "Strategy User", "GD", "Finance User"]
            },
        ]
    }
}
$(document).ready(function() {
    userCalls.get_CurrentUser();
});


if (window.location.href.indexOf('ListKey') > -1) {
    for (var i = 0; i < ListArray.length; i++) {
        var obj = ListArray[i];
        // if(obj.projectrelated)
        // {
        for (var key in obj) {
            if (key == USERlistkey) //get titles
            {
                if (USERisForm) {
                    if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                        USERPageTitle = obj['FormTitle'];
                    } else { USERPageTitle = obj['TitleEn']; }
                } else if (USERisListing) {
                    if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                        USERPageTitle = obj['ListingTitle'];
                    } else { USERPageTitle = obj['TitleEn']; }
                }

            }

            if (key == 'projectrelated') {
                if (obj[key]) //if true
                    USERProjRelated.push(Object.keys(obj)[0]);
            }
        }
        // }
    }
}


//getting related Projects if there is pcode or other security roles
var Access_Project_Info_Request = {
    onSuccess: function(sender, args) {
        var collListItem = Access_Project_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            //for breadcrumbs
            if (USERPCODE == oListItem.get_item('Title')) {
                USERPName = oListItem.get_item('Name') ? oListItem.get_item('Name') : UserNo_Data;
                USERPID = oListItem.get_id();
            }
            Access_Project_Info_Request.g.User_Projects.push(oListItem.get_item('Title'));
        }

        window.checkBreadCrumbsStatusHtml = setInterval(function() {
            Access_Project_Info_Request.g.handleBreadcrumbs();
        }, 333);


        if (istherePCODE && Access_Project_Info_Request.g.User_Projects.indexOf(Access_Project_Info_Request.g.PCODE) == -1 && !isWF && !isAdmin && !isITSteering) //in pages related to project if user is not related to the current project
        {
            window.location = _spPageContextInfo.webServerRelativeUrl;
        }

        if (!isAdmin && !isITSteering) //Access caml query for home page and listing pages
        {
            var fieldtoquery, isShowAll = false;
            if (USERProjRelated.indexOf(USERlistkey) > -1) //for data related to project (risks, issues...)
            {
                fieldtoquery = 'ProjectCode';
            } else if (USERisProjects || USERisHome) //for projects
            {
                fieldtoquery = 'Title'; //pcode
            } else // if on listing pages other then projects and its child data (risks, issues...)
            {
                isShowAll = true;
                fieldtoquery = 'Title';
            }

            var PermissionQuery = '<View><Query><Where><In><FieldRef Name="' + fieldtoquery + '" /><Values>';

            forfilterQuery = '<div style="display:none!important;height:0px!important" class="dropdown "><a href="#" class="dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button">ForQueryAccess</a><div class="dropdown-menu">';

            //if we are not on project level we use user's projects to get the relevant data...
            if (Access_Project_Info_Request.g.User_Projects.length > 0 && !isShowAll && !istherePCODE) // check user projects
            {
                for (var u = 0; u < Access_Project_Info_Request.g.User_Projects.length; u++) //build query based on user projects
                {
                    PermissionQuery += '<Value Type="Text">' + Access_Project_Info_Request.g.User_Projects[u] + '</Value>';

                    forfilterQuery += '<label class="dropdown-item">' + Access_Project_Info_Request.g.User_Projects[u] + '<input data-type="Text" data-internal="' + fieldtoquery + '" type="checkbox" name="' + fieldtoquery + '" value="' + Access_Project_Info_Request.g.User_Projects[u] + '" checked></label>';
                    if (u == Access_Project_Info_Request.g.User_Projects.length - 1) {
                        PermissionQuery += '</Values></In></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>';
                        forfilterQuery += '</div></div>';
                        AccessQuery = PermissionQuery;
                        // console.log('PermissionQuery', PermissionQuery);
                        if (USERisHome) //call homepage
                        {
                            window.checkHomeStatusHtml = setInterval(function() {
                                Project_Info_Request.preinit();
                            }, 1000);
                        } else if (USERisListing && !isfileListing) //call listing page
                        {
                            window.checkListingStatusHtml = setInterval(function() {
                                ListingData.preinit();
                            }, 1000);
                        }
                    }
                }
                // console.log('PermissionQuery', PermissionQuery);
            }

            //if there is pcode (on project level) get current project's data [for now this is specifically for listing pages]
            else if (istherePCODE) {
                AccessQuery = '<View><Query><Where><In><FieldRef Name="ProjectCode" /><Values><Value Type="Text">' + USERPCODE + '</Value></Values></In></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>';
                if (USERisListing && !isfileListing) {
                    window.checkListingStatusHtml = setInterval(function() {
                        ListingData.preinit();
                    }, 1000);
                }
            }
            //
            else if (isShowAll) //if on listing pages other then projects and its child data (risks, issues...)
            {
                AccessQuery = '<View><Query><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>';
                if (USERisListing && !isfileListing) {
                    window.checkListingStatusHtml = setInterval(function() {
                        ListingData.preinit();
                    }, 1000);
                }
            } else //for other still not clear requirement
            {

            }

        } else //for admins and pmos
        {
            //if there is pcode (on project level) get current project's data [for now this is specifically for listing pages]
            if (istherePCODE) {
                AccessQuery = '<View><Query><Where><In><FieldRef Name="ProjectCode" /><Values><Value Type="Text">' + USERPCODE + '</Value></Values></In></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>';
            }
            if (USERisHome) {
                window.checkHomeStatusHtml = setInterval(function() {
                    Project_Info_Request.preinit();
                }, 1000);
            } else if (USERisListing && !isfileListing) {
                window.checkListingStatusHtml = setInterval(function() {
                    ListingData.preinit();
                }, 1000);
            }
        }


    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
            Access_Project_Info_Request.init();
        });
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle(ListArray[0].projects);
        var camlQuery = new SP.CamlQuery();

        if (isSectionHead || isPortfolioManager || isSectorHead) {
            camlQuery.set_viewXml(SectorHeadQuery);
            // console.log('SectorHeadQuery', SectorHeadQuery);
        } else if (isAdmin || isITSteering) {
            camlQuery.set_viewXml('<View><Query></Query><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></View>');
        } else if (isStrategySpecialist) {
            camlQuery.set_viewXml(StrategyProjectQuery);
        } else {
            camlQuery.set_viewXml(
                '<View><Query><Where>' +
                '<Or>' +
                '<Eq><FieldRef Name="ProjectManager" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>' +
                '<Or>' +
                '<Eq><FieldRef Name="ProjectOwner" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq>' +
                '<Eq><FieldRef Name="PMORepresentative" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq>' +
                '</Or>' +
                '</Or>' +
                '</Where></Query></View>');
        }
        Access_Project_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Access_Project_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Access_Project_Info_Request.onSuccess),
            Function.createDelegate(this, Access_Project_Info_Request.onError)
        );
    },
    // Global variables
    g: {
        PCODE: istherePCODE ? window.location.href.split('PCODE=')[1].split('&')[0] : '',
        User_Projects: [],
        handleBreadcrumbs: function() {
            if ($('.page-title').length) {
                clearInterval(checkBreadCrumbsStatusHtml);
                //username
                $('.navbar .user-name').text(UserN.Title.match(/\b\w/g).join(''));
                $('.user-name-full').text(UserN.Title);
                //breadcrumbs
                if (istherePCODE) {
                    // USERForBreadCrumbs= '<span resourcekey="PTitle1" resource-done="true">'+PName+'</span>'+
                    //                         '<span class="link-arrow"></span>'+
                    //                         '<span class="project-Title-Name"></span>';
                    $('.page-title').html('<a href="' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/ProjectHome.aspx?PCODE=' + USERPCODE + '">' + USERPName + '</a>');
                    $('.title-item:first-child').html('<a href="' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/Listing.aspx?ListKey=' + USERlistkey + '&PCODE=' + USERPCODE + '">' + USERPageTitle + '');
                } else {
                    $('.page-title').html('<a href="' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/Listing.aspx?ListKey=' + USERlistkey + '">' + USERPageTitle + '');
                    if (!USERisIdeas) {
                        $('body').append('<style>.title-item:first-child{display:none!important}</style>');
                    }
                }
            }
        }
    }
};
//getting related Sectors if there user sector head (Project Sponsor)
var Access_Sector_Info_Request = {
    onSuccess: function(sender, args) {
        var collListItem = Access_Sector_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        SectorHeadQuery = '<View><Query><Where><In><FieldRef Name="' + SecondLevel_FirstLevel_Field + '" /><Values>';
        var sectorcode;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            sectorcode = oListItem.get_item(SecondLevel_FieldtoFetch) ? oListItem.get_item(SecondLevel_FieldtoFetch) : UserNo_Data;
            SectorHeadQuery += '<Value Type="' + SecondLevel_FirstLevel_FieldType + '">' + sectorcode + '</Value>';
            Access_Sector_Info_Request.g.User_Sectors.push(sectorcode);
        }
        SectorHeadQuery += '</Values></In></Where></Query></View>';
        AccessQuery = SectorHeadQuery;
        //
        if (!sectorcode)
            $('body').text('Your user does not have enough access to display this data');
        else
            Access_Project_Info_Request.preinit();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
            Access_Sector_Info_Request.init();
        });
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle(SecondLevel_List);
        var camlQuery = new SP.CamlQuery();
        //
        camlQuery.set_viewXml(SecondLevel_CAMLQuery);
        // console.log('SecondLevel_CAMLQuery', SecondLevel_CAMLQuery);
        Access_Sector_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Access_Sector_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Access_Sector_Info_Request.onSuccess),
            Function.createDelegate(this, Access_Sector_Info_Request.onError)
        );
    },
    // Global variables
    g: {
        User_Sectors: [],
    }
};

var Risks_Info_Request = {
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Risks');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(RiskQuery);
        Risks_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Risks_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Risks_Info_Request.onSuccess),
            Function.createDelegate(this, Risks_Info_Request.onError)
        );
    },
    onSuccess: function(sender, args) {
        var collListItem = Risks_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var riskshtml = '',
            riskname, riskID;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            riskname = oListItem.get_item('Name') || No_Data;
            riskID = oListItem.get_item('ID') || No_Data;

            riskshtml += '<li class="list-group-item">' +
                '<a href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/View.aspx?ListKey=risks&IID=" + riskID + '"><h3 class="title-13">' + riskname + '</h3></a>' +
                '<div class="des-12 text-nowrap">' +
                '</div>' +
                '</li>';

            NRisks = ++NRisks;
        }
        // console.log('NRisks', NRisks);

        //console.log(UProjects.length);
        if (!riskshtml) {
            riskshtml = '<p>' + No_Data + '</p>';
        }

        //*****end */Risk,task and issues card
        $('div#accordionRequiredSupportNotifications > .card:nth-child(3) ul.list-group').html(riskshtml);
        Issues_Info_Request.init();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {
        PCODE: window.location.href.split('/')[4],
    }
};
//issues
var Issues_Info_Request = {
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Issues');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(TasksQuery);
        Issues_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only

        clientContext.load(Issues_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Issues_Info_Request.onSuccess),
            Function.createDelegate(this, Issues_Info_Request.onError)
        );
    },
    onSuccess: function(sender, args) {
        var collListItem = Issues_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var issueshtml = '',
            issuename, issueID, ExistVar1;

        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            issuename = oListItem.get_item('Name') || No_Data;
            issueID = oListItem.get_item('ID') || No_Data;
            issueshtml += '<li class="list-group-item">' +
                '<a href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/View.aspx?ListKey=issues&IID=" + issueID + '"><h3 class="title-13">' + issuename + '</h3></a>' +
                '<div class="des-12 text-nowrap">' +
                '</div>' +
                '</li>';
            NIssues = ++NIssues;
        }
        // console.log('NIssues', NIssues);
        if (!issueshtml) {
            issueshtml = '<p>' + No_Data + '</p>';
        }

        //*****Start */risks,isues and tasks card
        $('div#accordionRequiredSupportNotifications > .card:nth-child(2) ul.list-group').html(issueshtml);
        Notifications_Info_Request.init();
        //*****end */risks,isues and tasks card
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {
        PCODE: window.location.href.split('/')[4],
    }
};
//Notifications
var Notifications_Info_Request = {
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Notifications');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(TasksQuery);
        Notifications_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Notifications_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Notifications_Info_Request.onSuccess),
            Function.createDelegate(this, Notifications_Info_Request.onError)
        );
    },
    onSuccess: function(sender, args) {
        var collListItem = Notifications_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var notificationshtml = '',
            notificationname, notificationID;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            notificationname = oListItem.get_item('Title') || No_Data;
            notificationID = oListItem.get_item('ID') || No_Data;
            notificationshtml += '<li class="list-group-item">' +
                '<a href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/View.aspx?ListKey=notifications&IID=" + notificationID + '"><h3 class="title-13">' + notificationname + '</h3></a>' +
                '<div class="des-12 text-nowrap">' +
                '</div>' +
                '</li>';
            NNotifications = ++NNotifications;
        }
        // console.log('NNotifications', NNotifications);
        //console.log(UProjects.length);
        if (!notificationshtml) {
            notificationshtml = '<p>' + No_Data + '</p>';
        }
        //*****end */Notification,task and issues card
        $('div#accordionRequiredSupportNotifications > .card:nth-child(4) ul.list-group').html(notificationshtml);
        $('span.bell-value').text(UserNTasks + NRisks + NIssues + NNotifications);
        $('span.bell-value').text(NTasks + NRisks + NIssues + NNotifications);
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },


    // Global variables
    g: {
        PCODE: window.location.href.split('/')[4],
    }
};

//tasks
var Tasks_Info_Request_User = {
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ($('.d-flex').length) {
            clearInterval(checkNotificationStatusHtml);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                $('.nav-settings .btn-group:last-child ul.list-group').html('<li class="list-group-item"><a href="/_layouts/15/SignOut.aspx" title="Sign Out"><h3 class="title-13">تسجيل الخروج</h3></a></li>');
                User_Stages_Data_Request.init();
                Tasks_Info_Request_User.init();
            });
        }
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Tasks');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(TasksQuery);
        Tasks_Info_Request_User.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Tasks_Info_Request_User.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Tasks_Info_Request_User.onSuccess),
            Function.createDelegate(this, Tasks_Info_Request_User.onError)
        );
    },
    onSuccess: function(sender, args) {
        var collListItem = Tasks_Info_Request_User.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var taskshtml = [],
            HPtaskshtml = [],
            action_btnhtml = '',
            taskname, pcode, tasktype, stageid, ritemid, sourceitemid, wfname, puid, tasktitle, tasksID, tasknotificationhtml = '';
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            pcode = oListItem.get_item('ProjectCode');
            tasktype = oListItem.get_item('TaskType');
            stageid = oListItem.get_item('StageID');
            ritemid = oListItem.get_item('RelatedItemID');
            sourceitemid = oListItem.get_item('SourceItemID') == null ? No_Data : oListItem.get_item('SourceItemID');
            wfname = oListItem.get_item('WorkflowName');
            puid = oListItem.get_item('ProjectUID');

            tasktitle = oListItem.get_item('Title') || No_Data;
            taskname = oListItem.get_item('ProjectCode') || No_Data;
            var tasktitlearr = [];
            tasksID = oListItem.get_item('ID') || No_Data;
            if (wfname == 'Project') {
                if (localStorage.getItem('Dynamo_Stages') != null) {
                    tasktitlearr = JSON.parse(localStorage.getItem("Dynamo_Stages") || "[]");
                    tasktitlearr = tasktitlearr.filter(function(item) {
                        return item.code == tasktitle
                    });
                    if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                        tasktitle = tasktitlearr[0].name;
                    } else tasktitle = tasktitlearr[0].nameEn;
                }

            }
            if (tasktype == 'Approval') {
                //
                action_btnhtml = '<div class="tasksButtons"><a href="#" class="denied taskButton">رفض</a><a href="#" class="accept taskButton">موافقة</a></div>'; //rafd muwafaka
                HPtaskshtml.push('<li class="list-group-item">' +
                    '<a href="javascript:"onclick="Tasks_Info_Request_User.g.handleids(\'' + pcode + '\',\'' + tasksID + '\',\'' + tasktype + '\',\'' + stageid + '\',\'' + ritemid + '\',\'' + sourceitemid + '\',\'' + wfname + '\',\'' + puid + '\')">' + '<h3 class="des-14 w-0">' + tasktitle + '</h3></a>' +
                    '<div class="des-12 text-nowrap">' +
                    action_btnhtml +
                    '</div>' +
                    '</li>');

                UserNTasks = ++UserNTasks;
            }
            // else {
            //     action_btnhtml = '<div class="tasksButtons"><a href="#" class="denied taskButton">العمل عليها</a><a href="#" class="accept taskButton">تأجيل</a></div>'; //3amal 3alayha
            // }
            taskshtml.push('<li class="list-group-item">' +
                '<a href="javascript:"onclick="Tasks_Info_Request_User.g.handleids(\'' + pcode + '\',\'' + tasksID + '\',\'' + tasktype + '\',\'' + stageid + '\',\'' + ritemid + '\',\'' + sourceitemid + '\',\'' + wfname + '\',\'' + puid + '\')">' + '<h3 class="title-13">' + tasktitle + '</h3></a>' +
                '<div class="des-12 text-nowrap">' +
                '</div>' +
                '</li>');
            NTasks = ++NTasks;
            // }

            //
        }
        if (!taskshtml.length) {
            taskshtml.push('<p>' + No_Data + '</p>');
            HPtaskshtml.push('<p>' + No_Data + '</p>');
        }
        //
        $('div#accordionRequiredSupport > .card:nth-child(1) ul.list-group').html(HPtaskshtml.join('')); //HP Cards
        $('div#accordionRequiredSupportNotifications > .card:nth-child(1) ul.list-group').html(taskshtml.join('')); //Top Notification
        Risks_Info_Request.init();
        changeResources();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: { //for tasks functions
        handleids: function(pcode, taskid, tasktype, stageid, ritemid, sourceitemid, wfname, puid, rurl) //rurl,
            {
                if (wfname == 'Project') {
                    //
                    // console.log('User_Stages_Data_Request', User_Stages_Data_Request);
                    curstage_org = User_Stages_Data_Request.g.StagesArray.filter(function(obj) {
                        return obj.stage == stageid;
                    });
                    var rurl = curstage_org[0].relatedURL;

                    // console.log('rurl', rurl);
                    // curstage =  ProjectStages_Data_Request.g.StagesArray.filter(function(obj) {
                    // 	return obj.stage == curstage_org[0].stage;
                    // });
                }
                Tasks_Info_Request_User.g.handlelinks(pcode, rurl, taskid, tasktype, stageid, ritemid, sourceitemid, wfname, puid);
            },
        handlelinks: function(pcode, rurl, taskid, tasktype, stageid, ritemid, sourceitemid, wfname, puid) {
            switch (wfname) {
                case 'Project':
                    if ((rurl.toLowerCase().indexOf('pcode') > -1) && (window.location.href.toLowerCase().indexOf('&wfs') > -1)) {
                        if (rurl.toLowerCase().indexOf('view.aspx') > -1) //view page with pcode
                        {
                            rurl = rurl.replace('&PCODE=', '');
                            //console.log('1');
                            window.open(_spPageContextInfo.webAbsoluteUrl + rurl + '&IID=' + ritemid + '&PCODE=' + pcode + '&TID=' + taskid + '&WFs', '_blank'); //

                        } else if (rurl.toLowerCase().indexOf('edit') > -1) //edit page is mainly without pcode [just in case!]
                        {
                            rurl = rurl.replace('&PCODE=', '');
                            //console.log(rurl);
                            window.open(_spPageContextInfo.webAbsoluteUrl + rurl + '&IID=' + ritemid + '&PCODE=' + pcode + '&TID=' + taskid + '&WFs', '_blank'); //
                            // console.log('jumana');
                        }
                        //     else if (rurl.toLowerCase().indexOf('projecthome') > -1 || rurl.toLowerCase().indexOf('phasegate.aspx') > -1 || rurl.toLowerCase().indexOf('projecthome.aspx') > -1) //edit page is mainly without pcode [just in case!]
                        //     {
                        //         rurl = rurl.replace('?PCODE=', '');
                        // // console.log('4');
                        //     window.open(_spPageContextInfo.webAbsoluteUrl + rurl + '?PCODE=' + pcode + '&WFs', '_blank');//+'&TID='+taskid
                        //     }
                        else //Listing page with pcode
                        {
                            // rurl = rurl.replace('&PCODE=', '');
                            //console.log('5');
                            window.open(_spPageContextInfo.webAbsoluteUrl + rurl + pcode + '&TID=' + taskid + '&WFs', '_blank'); //+'&TID='+taskid
                        }
                    } else if ((rurl.toLowerCase().indexOf('edit') > -1) && (window.location.href.toLowerCase().indexOf('&wfs') > -1)) //edit page without pcode
                    {
                        window.open(_spPageContextInfo.webAbsoluteUrl + rurl + '&PCODE=' + pcode + '&IID=' + ritemid + '&TID=' + taskid + '&WFs', '_blank'); //+'&TID='+taskid
                    } else if ((rurl.toLowerCase().indexOf('view') > -1) && (window.location.href.toLowerCase().indexOf('&wfs') > -1)) //view page without pcode
                    {
                        window.open(_spPageContextInfo.webAbsoluteUrl + rurl + '&PCODE=' + pcode + '&IID=' + ritemid + '&TID=' + taskid + '&WFs', '_blank'); //+'&TID='+taskid
                    } else if ((rurl.toLowerCase().indexOf('schedule.aspx') > -1) && (window.location.href.toLowerCase().indexOf('&wfs') > -1)) {
                        // console.log('2');
                        rurl = rurl.replace('&PCODE=', '');
                        window.open(_spPageContextInfo.webAbsoluteUrl + rurl + puid + '&PCODE=' + pcode + '&TID=' + taskid + '&WFs', '_blank'); //+'&TID='+taskid
                    }
                    break;
                default: //other workflows
                    var keyNameParams = ''
                    if (wfname == 'Idea') {
                        keyNameParams = "ideas"
                    } else if (wfname == "مهمة") {
                        keyNameParams = 'tasks'
                    } else if (wfname == 'DV') {
                        keyNameParams = 'deliverables'
                    } else if (wfname == 'CR') {
                        keyNameParams = 'changerequest'
                    } else if (wfname == 'تصعيد تحدي') {
                        keyNameParams = 'Issues'
                    } else if (wfname == 'تصعيد خطر') {
                        keyNameParams = 'risks'
                    } else if (wfname == 'تصعيد مهمة') {
                        keyNameParams = 'tasks'
                    }

                    // console.log(keyNameParams);
                    switch (tasktype) {
                        case 'SubmitField':
                            window.open(_spPageContextInfo.webAbsoluteUrl + '/sitepages/edit.aspx?ListKey=' + keyNameParams + '&IID=' + ritemid + '&WFs', '_blank');
                            break;
                        default:
                            if (wfname == 'تصعيد مهمة' || wfname == 'تصعيد خطر' || wfname == 'تصعيد تحدي') {
                                window.open(_spPageContextInfo.webAbsoluteUrl + '/sitepages/view.aspx?ListKey=' + keyNameParams + '&IID=' + sourceitemid + '&RID=' + ritemid + '&WFEs', '_blank');
                            } else {
                                window.open(_spPageContextInfo.webAbsoluteUrl + '/sitepages/view.aspx?ListKey=' + keyNameParams + '&IID=' + ritemid + '&WFs', '_blank');
                            }
                            break;
                    }
            }
        }
    }
};

var User_Stages_Data_Request = {
    onSuccess: function(sender, args) {
        //
        var collListItem = User_Stages_Data_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            User_Stages_Data_Request.g.StagesArray.push({
                phase: oListItem.get_item('RelatedPhase'),
                stage: oListItem.get_item('Title'),
                relatedURL: oListItem.get_item('RelatedURL'),
                stageid: oListItem.get_id(),
            });
        }
        // console.log('User_Stages_Data_Request.g.StagesArray', User_Stages_Data_Request.g.StagesArray)
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // The main Initialization function
    init: function(peojectC, type, taskid, nxtstageid, prvstageid, stageid) {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Stages');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Enabled\'/><Value Type=\'Integer\'>1</Value></Eq></Where><OrderBy><FieldRef Name=\'ListSort\' Ascending=\'True\' /></OrderBy></Query></View>');
        User_Stages_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(User_Stages_Data_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, User_Stages_Data_Request.onSuccess),
            Function.createDelegate(this, User_Stages_Data_Request.onError)
        );
    },
    // Global variables
    g: {
        StagesArray: []
    }
};

var checkNotificationStatusHtml = setInterval(function() {
    Tasks_Info_Request_User.preinit();
}, 1000);
// end of script




//Hide project nav onclick outside
if (document.getElementById('navcheckboxId')) {
    $(window).click(function(e) {
        var except = document.getElementById('navcheckboxId');
        if (e.target == except) { return e.stopPropagation(); }
        if (document.getElementById('navcheckboxId').checked) {
            document.getElementById('navcheckboxId').checked = false
        } else {
            //  console.log("CHECKKKKKKKKKKKKKED NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
            }
    })
}