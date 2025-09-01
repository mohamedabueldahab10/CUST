if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
    var No_Data = 'لا يوجد'
} else {
    var No_Data = 'Not Found'
}
var pageTitle = document.title;
var JSON_File_Name;
var JSON_File;
window.Groups = [];
var ProjectManager, PortfolioOwner, PortfolioManager, PortfolioOwner;

var istasks = false;
var curstage_org_prv = [],
    curstage_prv = [],
    curstage = [],
    curstage_nxt = [];

if (window.location.href.split('PCODE=')[1]) {
    var Project_Code = window.location.href.split('PCODE=')[1].split('&')[0];
}

window.SiteUrl = (_spPageContextInfo.webAbsoluteUrl.indexOf("https") > -1) ? _spPageContextInfo.webAbsoluteUrl : _spPageContextInfo.webAbsoluteUrl.replace('http', 'https')
var ProjectListName = "ProgramProjects",
    PortfolioListName = "Portfolios";
$(document).ready(function() {
    JSON_File_Name = window.location.href.split('ListKey=')[1].split('&')[0];
    JSON_File = JSON_File_Name + "_Listing.js";
    istasks = JSON_File_Name.toLowerCase().indexOf('task') > -1 && JSON_File_Name.toLowerCase().indexOf('smotasks') == -1;
    getCurrentUser();
});

function getCurrentUser() {
    //getUserWebPermissionREST();  
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function(data) {
            //console.log(data.d);
            UserN = data.d;
            getCurrentUserGroupColl(data.d.Id);
        },
        error: function(data) {
            failure(data);
        }
    });
}

function getCurrentUserGroupColl(UserID) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetUserById(" + UserID + ")/Groups",
        method: "GET",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function(data) {
            /* get all group's title of current user. */
            var results = data.d.results;
            for (var i = 0; i < results.length; i++) {
                Groups.push(results[i].Title);
            }

            if (Project_Code && pageTitle != "ProjectDetails") {
                window.checkStatusHtml = setInterval(function() {
                    ProjInfoRequest.preinit();
                }, 1000);
            } else getUserSiteGroups();
        }
    });
}


// to get group item from siteGroups 
var GroupItem = [];
var GroupItemRole;

function getUserSiteGroups() {
    var FullPermissionQuery = '<View><Query><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>'
    var PortfolioManagerQuery = '<View><Query><Where><Eq><FieldRef Name="Manager" /><Value Type="Text">' + UserN.Title + '</Value></Eq></Where></Query></View>';
    var PortfolioOwnerQuery = '<View><Query><Where><Eq><FieldRef Name="Owner" /><Value Type="Text">' + UserN.Title + '</Value></Eq></Where></Query></View>';
    var ProjectManagerQuery = '<View><Query><Where><Eq><FieldRef Name="ProjectManager" /><Value Type="Text">' + UserN.Title + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>';
    var ProjectOwnerQuery = '<View><Query><Where><Eq><FieldRef Name="ProjectOwner" /><Value Type="Text">' + UserN.Title + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>';
    var TaskOwnerQuery = '<View><Query><Where><Eq><FieldRef Name="Owner" /><Value Type="Text">' + UserN.Title + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>';
    var TaskTrackingQuery = '<View><Query><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>';

    var SiteGroups = [{
            Role: "FullPermissionWithCreate",
            Query: FullPermissionQuery,
            groupsName: ["PMO Team"]
        },
        {
            Role: "FullPermission",
            Query: FullPermissionQuery,
            groupsName: ["SMO Head", "PMO Head", "Steering Committee", "SMO Vice President", "Strategic Management Committee Secretariat"]
        },
        {
            Role: "ProjectManager",
            Query: ProjectManagerQuery,
            groupsName: ["Project Managers for Project Web App"]
        },
        {
            Role: "ProjectOwner",
            Query: ProjectOwnerQuery,
            groupsName: ["Project Owner for Project Web App"]
        },
        {
            Role: "PortfolioManager",
            Query: PortfolioManagerQuery,
            groupsName: ["Portfolio Managers for Project Web App"]
        },
        {
            Role: "PortfolioOwner",
            Query: PortfolioOwnerQuery,
            groupsName: ["Portfolio Owner for Project Web App"]
        },
        {
            Role: "TaskOwner",
            Query: TaskOwnerQuery,
            groupsName: ["Task Owner"]
        },
        {
            Role: "Tasks Tracking",
            Query: TaskTrackingQuery,
            groupsName: ["Tasks Tracking Department Head"]
        },
    ];
    GroupItem = SiteGroups.filter((res) => {
        for (var i = 0; i < res.groupsName.length; i++) {
            for (var j = 0; j < Groups.length; j++) {
                if (res.groupsName[i] === Groups[j]) {
                    return res;
                }
            }
        }
    });
    // console.log('GroupItem', GroupItem);
    if (Project_Code) {
        if (pageTitle == "ProjectDetails") {
            if ((GroupItem[0].Role == "FullPermissionWithCreate") || (GroupItem[0].Role == "FullPermission") || (UserN.Title == ProjectManager) || (UserN.Title == ProjectOwner) || (UserN.Title == PortfolioManager) || (UserN.Title == PortfolioOwner)) {
                Query = '<View><Query><Where><Eq><FieldRef Name=\'Title\'/><Value Type=\'Text\'>' + Project_Code + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>';
                window.checkStatusHtml = setInterval(function() {
                    Listing_Request.preinit();
                }, 1000);
            }
        } else {
            if ((GroupItem[0].Role == "FullPermissionWithCreate") || (GroupItem[0].Role == "FullPermission") || (UserN.Title == ProjectManager) || (UserN.Title == ProjectOwner) || (UserN.Title == PortfolioManager) || (UserN.Title == PortfolioOwner)) {
                Query = '<View><Query><Where><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' + Project_Code + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>';
                $.getScript(_spPageContextInfo.webAbsoluteUrl + "/Style%20Library/spm/JSON/" + JSON_File).done(function(script, textStatus) {
                    window.checkStatusHtml = setInterval(function() {
                        Listing_Request.preinit();
                    }, 1000);
                });
            } else {
                window.location.replace("");
            }
        }

    } else {
        Query = GroupItem[0].Query;
        switch (GroupItem[0].Role) {
            case "FullPermission":
            case "FullPermissionWithCreate":
                $.getScript(_spPageContextInfo.webAbsoluteUrl + "/Style%20Library/spm/JSON/" + JSON_File).done(function(script, textStatus) {
                    window.checkStatusHtml = setInterval(function() {
                        Listing_Request.preinit();
                    }, 1000);
                });
                break;
            case "ProjectManager":
            case "ProjectOwner":
                if (JSON_File_Name == "Project") {
                    $.getScript(_spPageContextInfo.webAbsoluteUrl + "/Style%20Library/spm/JSON/" + JSON_File).done(function(script, textStatus) {
                        window.checkStatusHtml = setInterval(function() {
                            Listing_Request.preinit();
                        }, 1000);
                    });
                } else {
                    if (JSON_File_Name == "Portfolio") {
                        field = "Portfolio";
                        ProjectField = "Title";
                        $.getScript(_spPageContextInfo.webAbsoluteUrl + "/Style%20Library/spm/JSON/" + JSON_File).done(function(script, textStatus) {
                            window.checkStatusHtml = setInterval(function() {
                                Project_Request.preinit();
                            }, 1000);
                        });
                    } else if (JSON_File_Name == "SMOTasks" || JSON_File_Name == "Ideas") {
                        field = "Portfolio";
                        ProjectField = "Portfolio";
                        $.getScript(_spPageContextInfo.webAbsoluteUrl + "/Style%20Library/spm/JSON/" + JSON_File).done(function(script, textStatus) {
                            window.checkStatusHtml = setInterval(function() {
                                Project_Request.preinit();
                            }, 1000);
                        });
                    } else {
                        field = "Title";
                        ProjectField = "Project";
                        $.getScript(_spPageContextInfo.webAbsoluteUrl + "/Style%20Library/spm/JSON/" + JSON_File).done(function(script, textStatus) {
                            window.checkStatusHtml = setInterval(function() {
                                Project_Request.preinit();
                            }, 1000);
                        });
                    }
                }
                break;
            case "PortfolioManager":
            case "PortfolioOwner":
                if (JSON_File_Name == "Portfolio") {
                    $.getScript(_spPageContextInfo.webAbsoluteUrl + "/Style%20Library/spm/JSON/" + JSON_File).done(function(script, textStatus) {
                        window.checkStatusHtml = setInterval(function() {
                            Listing_Request.preinit();
                        }, 1000);
                    });
                } else if ((JSON_File_Name == "Issues") || (JSON_File_Name == "Risks") || (JSON_File_Name == "Tasks")) {
                    $.getScript(_spPageContextInfo.webAbsoluteUrl + "/Style%20Library/spm/JSON/" + JSON_File).done(function(script, textStatus) {
                        window.checkStatusHtml = setInterval(function() {
                            field = "Title";
                            ProjectField = "Project";
                            PortfolioProject_Request.preinit();
                        }, 1000);
                    });
                } else {
                    $.getScript(_spPageContextInfo.webAbsoluteUrl + "/Style%20Library/spm/JSON/" + JSON_File).done(function(script, textStatus) {
                        window.checkStatusHtml = setInterval(function() {
                            Portfolio_Request.preinit();
                        }, 1000);
                    });
                }
                break;
            case "TaskOwner":
            case "Tasks Tracking":
                if (JSON_File_Name == "SMOTasks") {
                    $.getScript(_spPageContextInfo.webAbsoluteUrl + "/Style%20Library/spm/JSON/" + JSON_File).done(function(script, textStatus) {
                        window.checkStatusHtml = setInterval(function() {
                            Listing_Request.preinit();
                        }, 1000);
                    });
                } else {
                    window.location.replace("/SitePages/SMOTasks.aspx");
                }
                break;
        }
    }

    GroupItemRole = GroupItem[0].Role;

}


//Portfolio + Project Request
var PortfolioProject_Request = {
    onSuccess: function(sender, args) {

        var collListItem = PortfolioProject_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var PortfolioArray = [];
        var proj = '';
        window.portcode;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            PortfolioArray.push(
                oListItem.get_item('Title'),
            );
        }

        ProjectCamlQuery = '<View><Query><Where><In><FieldRef Name="Portfolio" /><Values>';
        PortfolioArray.forEach(function(Portfolio) {
            ProjectCamlQuery += '<Value Type="Text">' + Portfolio + '</Value>';
        });

        ProjectCamlQuery += '</Values></In></Where></Query></View>';
        Project_Request.preinit();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ($('.Header-Sharakat').length) {
            clearInterval(checkStatusHtml);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                PortfolioProject_Request.init();
            });
        }
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext('/');
        var oList = clientContext.get_web().get_lists().getByTitle(PortfolioListName);
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(Query);
        PortfolioProject_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(PortfolioProject_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, PortfolioProject_Request.onSuccess),
            Function.createDelegate(this, PortfolioProject_Request.onError)
        );
    },
    // Global variables
    g: {}
};

//


//Portfolio Request
var Portfolio_Request = {
    onSuccess: function(sender, args) {

        var collListItem = Portfolio_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var PortfolioArray = [];
        var proj = '';
        window.portcode;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            PortfolioArray.push(
                oListItem.get_item('Title'),
            );
        }
        Query = '<View><Query><Where><In><FieldRef Name="Portfolio" /><Values>';
        PortfolioArray.forEach(function(Portfolio) {
            Query += '<Value Type="Text">' + Portfolio + '</Value>';
        });

        Query += '</Values></In></Where></Query></View>';
        Listing_Request.preinit();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ($('.Header-Sharakat').length) {
            clearInterval(checkStatusHtml);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                Portfolio_Request.init();
            });
        }
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext('/');
        var oList = clientContext.get_web().get_lists().getByTitle(PortfolioListName);
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(Query);
        Portfolio_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Portfolio_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Portfolio_Request.onSuccess),
            Function.createDelegate(this, Portfolio_Request.onError)
        );
    },
    // Global variables
    g: {}
};

//


//Project Request
var Project_Request = {
    onSuccess: function(sender, args) {

        var collListItem = Project_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var ProjectArray = [];
        var proj = '';
        window.portcode;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            ProjectArray.push(
                oListItem.get_item(field),
            );
        }


        Query = '<View><Query><Where><In><FieldRef Name="' + ProjectField + '" /><Values>';
        ProjectArray.forEach(function(Project) {
            Query += '<Value Type="Text">' + Project + '</Value>';
        });
        Query += '</Values></In></Where></Query></View>';
        Listing_Request.preinit();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ($('.Header-Sharakat').length) {
            clearInterval(checkStatusHtml);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                Project_Request.init();
            });
        }
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext('/');
        var oList = clientContext.get_web().get_lists().getByTitle(ProjectListName);
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(Query);
        Project_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Project_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Project_Request.onSuccess),
            Function.createDelegate(this, Project_Request.onError)
        );
    },
    // Global variables
    g: {}
};

//




//project details permission 
var ProjInfoRequest = {
    onSuccess: function(sender, args) {
        var collListItem = ProjInfoRequest.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            Portfolio = (oListItem.get_item('Portfolio') == null) ? No_Data : oListItem.get_item('Portfolio');
            ProjectOwner = (oListItem.get_item('ProjectOwner') == null) ? No_Data : oListItem.get_item('ProjectOwner').get_lookupValue();
            ProjectManager = (oListItem.get_item('ProjectManager') == null) ? No_Data : oListItem.get_item('ProjectManager').get_lookupValue();
        }
        // console.log('Portfolio', Portfolio);
        PortfolioInfoRequest.preinit();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ($('#O365_TopMenu').length) {
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                clearInterval(checkStatusHtml);
                ProjInfoRequest.init();
            });
        }
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('ProgramProjects');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Title\'/><Value Type=\'Text\'>' + Project_Code + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>');
        ProjInfoRequest.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(ProjInfoRequest.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, ProjInfoRequest.onSuccess),
            Function.createDelegate(this, ProjInfoRequest.onError)
        );
    },
    // Global variables
    g: {}
};

var PortfolioInfoRequest = {
    onSuccess: function(sender, args) {
        var collListItem = PortfolioInfoRequest.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        window.idp;
        window.PortfolioCode;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            PortfolioOwner = (oListItem.get_item('Owner') == null) ? No_Data : oListItem.get_item('Owner').get_lookupValue();
            PortfolioManager = (oListItem.get_item('Manager') == null) ? No_Data : oListItem.get_item('Manager').get_lookupValue();
        }
        getUserSiteGroups();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ($('#O365_TopMenu').length) {
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                PortfolioInfoRequest.init();
            });
        }
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Portfolios');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Title\'/><Value Type=\'Text\'>' + Portfolio + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>');
        PortfolioInfoRequest.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(PortfolioInfoRequest.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, PortfolioInfoRequest.onSuccess),
            Function.createDelegate(this, PortfolioInfoRequest.onError)
        );
    },
    // Global variables
    g: {}
};


//before this is for root scenario
function myFunction() {
    var searchInput, filter, filterColumn, span, multiselectText, i, txtValue;
    searchInput = document.getElementById("searchInput");
    filter = searchInput.value.toUpperCase();
    var itemsArray = document.getElementsByClassName('items');
    for (i = 0; i < itemsArray.length; i++) {
        if ($(".items").find("span." + filter).length > 0) {
            itemsArray[i].style.display = "";
        } else {
            itemsArray[i].style.display = "none";
        }
    }
}
$(document).ready(function() {
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("div#linkInfo .items").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});


var IN, DN, FT;
//
var Listing_Request = {
        preinit: function() {
            if ($('.Header-Sharakat').length) {
                clearInterval(checkStatusHtml);
                if (JSON_File_Name = "Tasks") {
                    Listing_Request.g.inputsearch();
                }
                window.IN = Listing_Info.map(a => a.InternalName);
                window.DN = Listing_Info.map(a => a.DisplayName);
                window.FT = Listing_Info.map(a => a.type);
                //root scenario
                $('#customLeftNavigation').hide();
                $('.HOMEPAGEPJ').click(function(e) {
                    e.preventDefault();
                    window.history.back();
                });
                SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                    if (istasks) {
                        Query = '<View><Query><Where><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or></Where></Query></View>';
                        Stages_Data_Request.init();
                        //ProjectStages_Data_Request.init();
                    }
                    Listing_Request.init();
                });
            }
        },
        init: function() {
            var projectManagerFind = GroupItem.find(x => x.Role === 'ProjectManager');

            if ((GroupItemRole == "FullPermissionWithCreate") && ((JSON_File_Name == "Portfolio") || (JSON_File_Name == "Project") || (JSON_File_Name == "SMOTasks"))) {
                $('#sort').append('<button type="button" class="CSformSubmit">إضافة</button>');
            }
            if ((JSON_File_Name == "Ideas")) {
                $('#sort').append('<button type="button" class="CSformSubmit">إضافة</button>');
            } else if (projectManagerFind && (Project_Code)) {
                $('#sort').append('<button type="button" class="CSformSubmit">إضافة</button>');
            }

            Listing_Request.g.clickbait();
            Listing_Request.g.Cancel();
            sphttp.get(new SP.ClientContext.get_current() + CentralSite, ListName, Query, IN, function(records, record, listItem, isDone) {
                if (isDone) {
                    var DisplayNameArray = Listing_Info.map(a => a.DisplayName);
                    var ItemType = Listing_Info.map(a => a.type);
                    //console.log('ItemType',ItemType);
                    var filterDiv = document.getElementById('filterColumn');
                    var sortBy = document.getElementById('sortBy');
                    var sortByOpt = "";
                    // console.log(records);
                    $(document).ready(function() {
                        for (var i = 0; i < records.length; i++) {
                            //console.log('records',records);
                            var obj = records[i];
                            var html = "<div class='items TaskDetails'>";
                            for (var key in obj) {
                                //Getting Display Name
                                var Field_In_Use = Listing_Info.filter(function(el) {
                                    return el.InternalName === key;
                                });
                                ///
                                if (istasks) {
                                    html += '<div data-taskid="' + RecordsWithID[i].ID + '" data-pcode="' + RecordsWithID[i].pcode + '" data-stageid="' + RecordsWithID[i].stageid + '" data-tasktype="' + RecordsWithID[i].tasktype + '" data-nxtstage="' + RecordsWithID[i].nxtstage + '" data-prvstage="' + RecordsWithID[i].prvstage + '" data-ritemid="' + RecordsWithID[i].ritemid + '" data-wfname="' + RecordsWithID[i].wfname + '" data-type="' + Field_In_Use[0].type + '"  class="ItemField ' + key + '"><label class=' + key + '> ' + Field_In_Use[0].DisplayName + ':</label>' + '<span class="ItemValue ' + key + '" >' + obj[key] + '</span></div>';
                                } else {
                                    html += '<div data-type="' + Field_In_Use[0].type + '" data-InListing="' + Field_In_Use[0].inlisting + '" class="ItemField ' + key + '"><label class=' + key + '> ' + Field_In_Use[0].DisplayName + ':</label>' + '<span class="ItemValue ' + key + '" >' + obj[key] + '</span></div>';
                                }
                            }
                            html += "</div>";
                            document.getElementById("linkInfo").innerHTML += html;

                        }
                        if (JSON_File_Name == "SMOTasks") {
                            tasksStatus();
                        }
                        if (JSON_File_Name == "Project") {
                            projectProgressStatus();
                        }
                        //console.log('DisplayNameArray',DisplayNameArray);
                        sortByOpt += '<select id="sortBy"><option value="select a field">إختر المعلومة</option>';
                        for (var i = 0; i < Listing_Info.length; i++) {

                            var selectFilter = document.createElement("SELECT");
                            selectFilter.setAttribute("id", Listing_Info[i].InternalName);
                            selectFilter.setAttribute("multiple", "multiple");
                            var nameArray = records.map(function(d) { return d["", Listing_Info[i].InternalName]; });
                            var selectedOptionsArray = [];
                            for (item in nameArray) {
                                if (nameArray[item] != null) {
                                    selectFilter.add(new Option(nameArray[item], nameArray[item]));
                                }
                            }

                            filterDiv.appendChild(selectFilter);
                            sortByOpt += '<option value=' + Listing_Info[i].InternalName + '>' + Listing_Info[i].DisplayName + '</option>';
                            // On change									
                            $('#' + Listing_Info[i].InternalName).multiselect({
                                nonSelectedText: '' + Listing_Info[i].DisplayName,
                                nSelectedText: "تم تحديد",
                                allSelectedText: "تم تحديد الكل",
                                numberDisplayed: 1,
                                onChange: function(option, checked, select) {
                                    var opselected = $(option).val();
                                    if (checked) {
                                        $(option).not(this).prop('checked', false);
                                        selectedOptionsArray.push(opselected);
                                    } else {
                                        var oindex = selectedOptionsArray.indexOf(opselected);
                                        selectedOptionsArray.splice(oindex, 1);;
                                    }
                                    var values = [];
                                    for (var j = 0; j < selectedOptionsArray.length; j++) {
                                        var value = selectedOptionsArray[j].toLowerCase();
                                        values.push(value);
                                    }
                                    // console.log('values', values);
                                    $('.items').hide();
                                    for (var k = 0; k < values.length; k++) {
                                        $('.items').each(function() {
                                            ///////////Hiding based on text
                                            if ($(this).text().toLowerCase().indexOf(values[k]) > -1)
                                                $(this).css("display", "flex");
                                        });
                                    }
                                    //console.log('selectedOptionsArray',selectedOptionsArray);
                                    if (selectedOptionsArray.length == 0) {
                                        $(".items").css("display", "flex");
                                    }
                                }
                            });
                        }
                        sortByOpt += '</select>';
                        document.getElementById('sortByDiv').innerHTML = sortByOpt;
                        //console.log('sortByDiv',sortByDiv);			
                        var listForRemove = [];
                        var listOfUniqe = [];
                        $('.multiselect-container.dropdown-menu li').each(function() {
                            var text = $(this).text().trim();
                            if (listOfUniqe.indexOf(text) === -1)
                                listOfUniqe.push(text);
                            else
                                listForRemove.push($(this));
                        });
                        $(listForRemove).each(function() { $(this).remove(); });

                        function sortArray() {
                            document.getElementById("linkInfo").innerHTML = "";
                            var sortByDropdown = document.getElementById("sortBy");
                            var selectedsortBy = sortByDropdown.options[sortByDropdown.selectedIndex].value;
                            var AscenDesenDropdown = document.getElementById("AscenDesen");
                            var selectedAscenDesen = AscenDesenDropdown.options[AscenDesenDropdown.selectedIndex].value;
                            if (!selectedAscenDesen) { selectedAscenDesen = "ascending"; }
                            if (selectedAscenDesen == "ascending") {
                                for (var i = 0; i < records.length; i++) {
                                    var obj = records[i];
                                    //for (var key in obj) {
                                    for (var v = 0; v < obj.length; v++) {
                                        if (key = Listing_Info[i].InternalName) {
                                            if (Listing_Info[i].type == "date") {
                                                records.sort((date1, date2) => {
                                                    date1 = date1[Listing_Info[i].InternalName].split('-'), date2 = date2[Listing_Info[i].InternalName].split('-');
                                                    let day1 = parseInt(date1[0]);
                                                    let day2 = parseInt(date2[0]);
                                                    let month1 = parseInt(date1[1]);
                                                    let month2 = parseInt(date2[1]);
                                                    let year1 = parseInt(date1[2]);
                                                    let year2 = parseInt(date2[2]);
                                                    if (year1 !== year2) {
                                                        return year1 - year2;
                                                    } else if (month1 !== month2) {
                                                        return month1 - month2;
                                                    } else {
                                                        return day1 - day2;
                                                    }
                                                })
                                            }

                                        }
                                    }
                                }
                                var propComparator = (propName) => (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;
                                records.sort(propComparator('' + selectedsortBy));
                            } else {
                                for (var i = 0; i < records.length; i++) {
                                    var obj = records[i];
                                    //for (var key in obj) {
                                    for (var v = 0; v < obj.length; v++) {
                                        if (key = Listing_Info[i].InternalName) {
                                            if (Listing_Info[i].type == "date") {
                                                records.sort((date1, date2) => {
                                                    date1 = date1[Listing_Info[i].InternalName].split('-'), date2 = date2[Listing_Info[i].InternalName].split('-');
                                                    let day1 = parseInt(date1[0]);
                                                    let day2 = parseInt(date2[0]);
                                                    let month1 = parseInt(date1[1]);
                                                    let month2 = parseInt(date2[1]);
                                                    let year1 = parseInt(date1[2]);
                                                    let year2 = parseInt(date2[2]);
                                                    if (year1 !== year2) {
                                                        return year1 - year2;
                                                    } else if (month1 !== month2) {
                                                        return month1 - month2;
                                                    } else {
                                                        return day1 - day2;
                                                    }
                                                })
                                            }
                                        }
                                    }
                                }
                                var propComparator = (propName) => (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? 1 : -1;
                                records.sort(propComparator('' + selectedsortBy));
                            }
                            if (istasks) {
                                for (var i = 0; i < records.length; i++) {
                                    //console.log('records',records);
                                    var obj = records[i];
                                    //console.log('obj',obj);							
                                    var html = "<div class='items TaskDetails'>";
                                    for (var key in obj) {
                                        //Getting Display Name
                                        var Field_In_Use = Listing_Info.filter(function(el) {
                                            return el.InternalName === key;
                                        });
                                        ///
                                        html += '<div data-type="' + Field_In_Use[0].fieldType + '" class="ItemField ' + key + '"><label class=' + key + '> ' + Field_In_Use[0].DisplayName + ':</label>' + '<span class="ItemValue ' + key + '" >' + obj[key] + '</span></div>';
                                    }
                                    html += "</div>";
                                    document.getElementById("linkInfo").innerHTML += html;
                                }
                                var i = 0;
                                $('.items.TaskDetails').each(function() {
                                    var sText = $(this).find('.ItemField:first-child > span').text();
                                    // console.log(sText);
                                    $(this).find('.ItemField:first-child > span').html('<a href="javascript:;" onclick="Listing_Request.g.handleids(' +
                                        '$(this).closest(\'[data-pcode]\').attr(\'data-pcode\'),' +
                                        '$(this).closest(\'[data-taskid]\').attr(\'data-taskid\'),' +
                                        '$(this).closest(\'[data-tasktype]\').attr(\'data-tasktype\'),' +
                                        '$(this).closest(\'[data-stageid]\').attr(\'data-stageid\'),' +
                                        '$(this).closest(\'[data-ritemid]\').attr(\'data-ritemid\'),' +
                                        '$(this).closest(\'[data-wfname]\').attr(\'data-wfname\'),' +
                                        ')">' + sText + '</a>');
                                    // console.log(i);
                                    i++;
                                });
                                //console.log('records',records);
                            } else {
                                for (var i = 0; i < records.length; i++) {
                                    //console.log('records',records);
                                    var obj = records[i];
                                    //console.log('obj',obj);							
                                    var html = "<div class='items TaskDetails'>";
                                    for (var key in obj) {
                                        //Getting Display Name
                                        var Field_In_Use = Listing_Info.filter(function(el) {
                                            return el.InternalName === key;
                                        });
                                        ///
                                        html += '<div data-type="' + Field_In_Use[0].type + '" class="ItemField ' + key + '"><label class=' + key + '> ' + Field_In_Use[0].DisplayName + ':</label>' + '<span class="ItemValue ' + key + '" >' + obj[key] + '</span></div>';
                                    }
                                    html += "</div>";
                                    document.getElementById("linkInfo").innerHTML += html;
                                    var i = 0;
                                    $('.items.TaskDetails').each(function() {
                                        var sText = $(this).find('.ItemField:first-child > span').text();
                                        // console.log(sText);
                                        if (Scenario) {
                                            if (RecordsWithID[i].Pcode) {
                                                $(this).find('.ItemField:first-child > span').html('<a href="/SitePages/View.aspx?IID=' + RecordsWithID[i].ID + '&PCODE=' + RecordsWithID[i].Pcode + '&ListKey=' + JSON_File_Name + ' ">' + sText + '</a>');
                                            } else
                                                $(this).find('.ItemField:first-child > span').html('<a href="/SitePages/View.aspx?IID=' + RecordsWithID[i].ID + ' &ListKey=' + JSON_File_Name + '">' + sText + '</a>');

                                            // console.log(i);

                                        } else {
                                            if (RecordsWithID[i].Pcode) {
                                                $(this).find('.ItemField:first-child > span').html('<a href="/SitePages/View.aspx?IID=' + RecordsWithID[i].ID + '&PCODE=' + RecordsWithID[i].Pcode + '&ListKey=' + JSON_File_Name + '">' + sText + '</a>');
                                            } else
                                                $(this).find('.ItemField:first-child > span').html('<a href="/SitePages/View.aspx?IID=' + RecordsWithID[i].ID + '&ListKey=' + JSON_File_Name + '">' + sText + '</a>');
                                        }
                                        i++;
                                    });
                                }
                            }
                            //console.log('records',records);
                        }
                        if (istasks) {
                            var i = 0;
                            $('.items.TaskDetails').each(function() {
                                var sText = $(this).find('.ItemField:first-child > span').text();
                                // console.log(sText);
                                $(this).find('.ItemField:first-child > span').html('<a href="javascript:;"onclick="Listing_Request.g.handleids(' +
                                    '$(this).closest(\'[data-pcode]\').attr(\'data-pcode\'),' +
                                    // '$(this).closest(\'[data-rurl]\').attr(\'data-rurl\'),'+
                                    '$(this).closest(\'[data-taskid]\').attr(\'data-taskid\'),' +
                                    '$(this).closest(\'[data-tasktype]\').attr(\'data-tasktype\'),' +
                                    '$(this).closest(\'[data-stageid]\').attr(\'data-stageid\'),' +
                                    '$(this).closest(\'[data-ritemid]\').attr(\'data-ritemid\'),' +
                                    '$(this).closest(\'[data-wfname]\').attr(\'data-wfname\'),' +
                                    ')">' + sText + '</a>');
                                // console.log(i);
                                i++;
                            });
                        } else {
                            var i = 0;
                            $('.items.TaskDetails').each(function() {
                                var sText = $(this).find('.ItemField:first-child > span').text();
                                // console.log(sText);
                                if (Scenario) {
                                    if (RecordsWithID[i].Pcode) {
                                        $(this).find('.ItemField:first-child > span').html('<a href="/SitePages/View.aspx?IID=' + RecordsWithID[i].ID + '&PCODE=' + RecordsWithID[i].Pcode + '&ListKey=' + JSON_File_Name + '">' + sText + '</a>');
                                    } else
                                        $(this).find('.ItemField:first-child > span').html('<a href="/SitePages/View.aspx?IID=' + RecordsWithID[i].ID + '&PCODE=' + RecordsWithID[i].Pcode + '&ListKey=' + JSON_File_Name + '">' + sText + '</a>');
                                    // console.log(i);

                                } else {
                                    if (RecordsWithID[i].Pcode) {
                                        $(this).find('.ItemField:first-child > span').html('<a href="/SitePages/View.aspx?IID=' + RecordsWithID[i].ID + '&PCODE=' + RecordsWithID[i].Pcode + '&ListKey=' + JSON_File_Name + '">' + sText + '</a>');
                                    } else {
                                        $(this).find('.ItemField:first-child > span').html('<a href="/SitePages/View.aspx?IID=' + RecordsWithID[i].ID + '&ListKey=' + JSON_File_Name + '">' + sText + '</a>');
                                    }
                                }
                                i++;
                            });
                        }
                        $("#sortBy").change(sortArray);
                        $("#AscenDesen").change(sortArray);
                        $(".multiselect-native-select .btn-group").css("margin-bottom", "0px");
                        $(".multiselect.dropdown-menu").click(function() {
                            var marginHeight = $(".btn-group.show .multiselect-container.dropdown-menu.show").height();
                            $(this).parent().css("margin-bottom", "" + marginHeight + "px");
                        });
                    });

                }
            });
        },
        g: {
            handleids: function(pcode, taskid, tasktype, stageid, ritemid, wfname) //rurl,
                {
                    if (wfname == 'مشروع') {
                        // console.log(stageid);
                        curstage_org = Stages_Data_Request.g.StagesArray.filter(function(obj) {
                            return obj.stageid == stageid;
                        });
                        var rurl = curstage_org[0].relatedURL;
                        // curstage =  ProjectStages_Data_Request.g.StagesArray.filter(function(obj) {
                        // 	return obj.stage == curstage_org[0].stage;
                        // });
                    }
                    Listing_Request.g.handlelinks(pcode, rurl, taskid, tasktype, stageid, ritemid, wfname);
                },
            handlelinks: function(pcode, rurl, taskid, tasktype, stageid, ritemid, wfname) {
                // console.log(tasktype, wfname);
                switch (wfname) {
                    case 'فكرة':
                        switch (tasktype) {
                            case 'SubmitField':
                                window.open(_spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl + 'sitepages/edit.aspx?ListKey=ideas' + '&IID=' + ritemid, '_blank');
                                break;
                            default:
                                window.open(_spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl + 'sitepages/view.aspx?ListKey=ideas' + '&IID=' + ritemid, '_blank');
                                break;
                        }
                    default:
                        if (rurl.toLowerCase().indexOf('pcode') > -1) {
                            rurl = rurl.toLowerCase().replace('?pcode=', '');
                            if (rurl.toLowerCase().indexOf('view.aspx') > -1) //view page with pcode
                            {
                                window.open(_spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl + rurl + '&IID=' + ritemid + '&PCODE=' + pcode, '_blank'); //+'&TID='+taskid

                            } else if (rurl.toLowerCase().indexOf('edit') > -1) //edit page is mainly without pcode [just in case!]
                            {
                                window.open(_spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl + rurl + '&IID=' + ritemid + '&PCODE=' + pcode, '_blank'); //+'&TID='+taskid

                            } else //Listing page with pcode
                            {
                                window.open(_spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl + rurl + '&PCODE=' + pcode, '_blank'); //+'&TID='+taskid

                            }
                        } else if (rurl.toLowerCase().indexOf('edit') > -1) //edit page without pcode
                        {
                            window.open(_spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl + rurl + '&IID=' + ritemid, '_blank'); //+'&TID='+taskid
                        } else if (rurl.toLowerCase().indexOf('projuid=') > -1) {
                            window.open(_spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl + rurl + ritemid + '&PCODE=' + pcode, '_blank'); //+'&TID='+taskid
                        }
                }
            },
            clickbait: function() {
                if (Project_Code) {
                    $('button.CSformSubmit').click(function() {
                        window.location = '/SitePages/New.aspx?PCODE=' + Project_Code;
                    })
                } else
                    $('button.CSformSubmit').click(function() {
                        window.location = '/SitePages/New.aspx';
                    })
            },
            inputsearch: function() {
                $("#myInput").on("keyup", function() {
                    var value = $(this).val().toLowerCase();
                    $("div#linkInfo .items").filter(function() {
                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                    });
                });
            },
            Cancel: function() {
                $('.headtwo > a:first-child').click(function(e) {
                    window.location = '/SitePages/ProjectDetails.aspx?PCODE=' + Project_Code;
                    e.preventDefault();
                });
            }
        }
    }
    //
    //getting stages
var ProjectStages_Data_Request = {
    onSuccess: function(sender, args) {
        var collListItem = ProjectStages_Data_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            ProjectStages_Data_Request.g.StagesArray.push({
                stage: oListItem.get_item('Stage'),
                stageid: oListItem.get_id(),
            });
        }
        Stages_Data_Request.init();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('ProjectStages');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name=\'ListSort\' Ascending=\'True\' /></OrderBy></Query></View>'); //<Where><Eq><FieldRef Name=\'ProjectCode\'/><Value Type="Text">'+peojectC+'</Value></Eq></Where>
        ProjectStages_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(ProjectStages_Data_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, ProjectStages_Data_Request.onSuccess),
            Function.createDelegate(this, ProjectStages_Data_Request.onError)
        );
    },
    // Global variables
    g: {
        StagesArray: [],

    }
};
var Stages_Data_Request = {
    onSuccess: function(sender, args) {
        var collListItem = Stages_Data_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            Stages_Data_Request.g.StagesArray.push({
                phase: oListItem.get_item('RelatedPhase'),
                stage: oListItem.get_item('Title'),
                relatedURL: oListItem.get_item('RelatedURLTask'),
                stageid: oListItem.get_id(),
            });
        }
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
        Stages_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Stages_Data_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Stages_Data_Request.onSuccess),
            Function.createDelegate(this, Stages_Data_Request.onError)
        );
    },
    // Global variables
    g: {
        StagesArray: []
    }
};
//end
window.sphttp = {
    get: function(listUrl, listDisplayName, camelQuery, internalFieldNames, onEach, onError) {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle(listDisplayName);
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(camelQuery);
        var itemsEnumerable = oList.getItems(camlQuery);
        clientContext.load(itemsEnumerable);
        clientContext.executeQueryAsync(
            Function.createDelegate(this,
                function(sender, args) {
                    var listItemEnum = itemsEnumerable.getEnumerator();
                    window.records = [];
                    window.RecordsWithID = [];
                    var RecordsWithNames = [];
                    var fieldType = [];
                    var userid;
                    var usergrp;
                    var type = [];
                    while (listItemEnum.moveNext()) {
                        var oListItem = listItemEnum.get_current();
                        var record = {};
                        var ForID = {};
                        if (istasks) {
                            if (oListItem.get_item('Status') == 'Open') {
                                if (internalFieldNames && internalFieldNames.length > 0) {
                                    for (var i = 0; i < internalFieldNames.length; i++) {
                                        if (internalFieldNames[i] = Listing_Info[i].InternalName) {
                                            if (Listing_Info[i].type == "date") {
                                                var d = (oListItem.get_item(internalFieldNames[i]) == null) ? 'empty' : oListItem.get_item(internalFieldNames[i]);
                                                var datetouse2;
                                                if (d != "empty") {
                                                    var local = d.getTime();
                                                    var offset = d.getTimezoneOffset() * (60 * 1000);
                                                    var utc = new Date(local + offset);
                                                    var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
                                                    var datetouse = riyadh.toLocaleString("en-US").split(',')[0].split('/');
                                                    datetouse2 = datetouse[1] + '/' + datetouse[0] + '/' + datetouse[2];
                                                    //console.log(riyadh.toLocaleString("en-US").split(',')[0]);
                                                    //console.log(oListItem.get_item(internalFieldNames[i]));
                                                }
                                                record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : datetouse2;
                                            } else
                                                record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]);
                                        }
                                    }
                                    RecordsWithID.push({
                                        record: record,
                                        ID: oListItem.get_id(),
                                        tasktype: oListItem.get_item('TaskType1'),
                                        nxtstage: oListItem.get_item('StageIDApprove'),
                                        prvstage: oListItem.get_item('StageIDReject'),
                                        stageid: oListItem.get_item('StageID'),
                                        pcode: oListItem.get_item('ProjectCode'),
                                        ritemid: oListItem.get_item('RelatedItemID'),
                                        wfname: oListItem.get_item('WorkflowName')
                                    });
                                    records.push(record);
                                    onEach(records, record, oListItem, false); //false if having item
                                }
                            }
                        } else {
                            if (internalFieldNames && internalFieldNames.length > 0) {
                                for (var i = 0; i < internalFieldNames.length; i++) {
                                    if (internalFieldNames[i] = Listing_Info[i].InternalName) {
                                        if (Listing_Info[i].type == "date") {
                                            record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]).toISOString().slice(0, 10);
                                        } else if (Listing_Info[i].type == "picker") {
                                            record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]).get_lookupValue();
                                        }
                                        // else if (Listing_Info[i].type == "lookup") {
                                        //     sphttp.get('/', lookupListName, lookupQuery,lookupInternalFieldName, function (records, record, listItem, isDone) {
                                        //         if (isDone) {
                                        //             record[internalFieldNames[i]] = (oListItem.get_item(lookupInternalFieldName[i]) == null) ? No_Data : oListItem.get_item(lookupInternalFieldName[i]);
                                        //         }
                                        //     });
                                        // }
                                        else {
                                            record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]);

                                        }
                                    }
                                }
                                if (JSON_File_Name != "Tasks" && JSON_File_Name != "Portfolio" && JSON_File_Name != "Project" && JSON_File_Name != "SMOTasks" && JSON_File_Name != "Ideas") {
                                    RecordsWithID.push({
                                        record: record,
                                        ID: oListItem.get_id(),
                                        Pcode: oListItem.get_item('ProjectCode')
                                    });
                                } else {
                                    RecordsWithID.push({
                                        record: record,
                                        ID: oListItem.get_id(),
                                    });
                                }
                                records.push(record);
                            }
                        }
                        onEach(records, record, oListItem, false); //false if having item
                    }
                    onEach(records, null, null, true); //true if no more items					
                }),
            Function.createDelegate(this, function(sender, args) {
                console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            })
        )
    }
}

function tasksStatus() {
    var Status = $(".ItemValue.Status");
    for (var i = 0; i < Status.length; i++) {
        switch (Status[i].textContent) {
            case "قيد التنفيذ":
                Status[i].parentNode.classList.add("InProgress");
                break;
            case "مكتمل":
                Status[i].parentNode.classList.add("Completed");
                break;
            case "متوقف":
                Status[i].parentNode.classList.add("OnHold");
                break;
            case "ملغى":
                Status[i].parentNode.classList.add("Canceled");
                break;
        }
    }
}

function projectProgressStatus() {
    var Status = $(".ItemValue.ProjectProgressStatus");
    for (var i = 0; i < Status.length; i++) {
        switch (Status[i].textContent) {
            case "حسب الخطة":
                Status[i].parentNode.classList.add("InProgress");
                break;
            case "متقدم على الخطة":
                Status[i].parentNode.classList.add("Completed");
                break;
            case "متأخر":
                Status[i].parentNode.classList.add("OnHold");
                break;
            case "متأخر جدا":
                Status[i].parentNode.classList.add("Canceled");
                break;
        }
    }
}
$(document).ready(function() {
    $('.headtwo > a:first-child').click(function(e) {
        if (Project_Code)
            window.location = '/SitePages/ProjectDetails.aspx?PCODE' + Project_Code;
        else
            window.location = '/SitePages/Dashboard.aspx';
    });
});