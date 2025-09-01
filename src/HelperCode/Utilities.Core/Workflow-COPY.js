//steps for project wrfl:
// 1- get related task, 2- get cuur stage of project, 3- get all project stages from ProjectStages List, 4- get all stages from configuration Stages list ( to get any related config fields like related url ), 5- handleids: get curr nxt and prv stage with full info, 6- based on tasktype show user buttons and action,7- after user action: change status of stages based on user action, 8- assign new stage and phase to the project item, 9- close task;
// ***************************************************************************************
//Workflow Handle
/********************************************************************************** */

//get user groups
var WFuserCalls = {
    get_CurrentUser: function() {
        //getUserWebPermissionREST();
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function(data) {
                //console.log(data.d);
                UserN = data.d;
                WFuserCalls.get_CurrentUserGroupColl(data.d.Id);
                //console.log(UserN);
            },
            error: function(data) {
                // console.log('call failed');
            }
        });
    },
    get_CurrentUserGroupColl: function(UserID) {
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetUserById(" + UserID + ")/Groups",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function(data) {
                /* get all group's title of current user. */
                var results = data.d.results;
                for (var i = 0; i < results.length; i++) {
                    WFuserCalls.g.Groups.push(results[i].Title);
                }
            }
        });
    },
    g: {
        Groups: []
    }
}
var workflowname, stageid, stagename, stageName, projectstagename, taskcomments, nxtstageid, nxtstageidarr, prvstageid, prvstageidarr, taskid, tasktype, peojectC, curstageName, curphaseName, assignedto, WF_isuploaddone = 0,
    WFisNew = window.location.href.toLowerCase().indexOf('new.aspx') > -1,
    WFisForm = window.location.href.toLowerCase().indexOf('new.aspx') > -1 || window.location.href.toLowerCase().indexOf('view.aspx') > -1 || window.location.href.toLowerCase().indexOf('edit.aspx') > -1,
    isideapage = window.location.href.indexOf('ideas') > -1,
    isTasksPage = (window.location.href.indexOf('SMOTasks') > -1 && window.location.href.indexOf('WFs') > -1),
    isProjectPage = window.location.href.indexOf('PCODE') > -1,
    isDeliverablesPage = window.location.href.indexOf('deliverables') > -1,
    isChangeRequestPage = window.location.href.indexOf('changerequest') > -1,
    isIssuesEscalatePage = window.location.href.indexOf('Issues') > -1,
    isRisksEscalatePage = window.location.href.indexOf('Risks') > -1,
    isTasksEscalatePage = (window.location.href.indexOf('SMOTasks') > -1 && window.location.href.indexOf('WFEs') > -1),
    fieldtoedit, bulkeditlist, bulkeditquery, taskquery, IID2, RID, isschedule = window.location.href.indexOf('schedule.aspx') > -1;
var curstage_org = [],
    curstage_org_prv = [],
    curstage_prv = [],
    curstage = [],
    curstage_nxt = [];
var stagecode, nextStageName, prevStageName, curStageArr;
var forTasksHTMLStatus, forFormSubmitHTMLStatus, formakesureishtmlStatus;
//determine which workflow to get related task
// console.log(isTasksPage, 'isTasksPage')
// console.log(isTasksEscalatePage, 'isTasksEscalatePage')
// console.log(RID, 'RID RID')
if (isTasksEscalatePage) {
    workflowname = "تصعيد مهمة"
    fieldtoedit = "Status"
    bulkeditlist = 'Escalations'
    IID2 = window.location.href.split('IID=')[1].split('&')[0];
    RID = window.location.href.split('RID=')[1].split('&')[0]
    bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + RID + '</Value> </Eq></Where></Query></View>'
    taskquery = '<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' + workflowname + '</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' + RID + '</Value></Eq><And><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>'
        // taskquery = '<View><Query><Where><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><And><Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' + workflowname + '</Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where></Query><RowLimit>1</RowLimit></View>';
        // peojectC = null;
}
if (isTasksPage) {
    workflowname = "مهمة";
    fieldtoedit = "Owner"; // if i have multi field to edit i will assign the value in array and iterate over it in update
    bulkeditlist = 'SMO Tasks'; // IID is the item ID for the Page and i will know the page from Gamal to target the element
    IID2 = window.location.href.split('IID=')[1].split('&')[0];
    bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + IID2 + '</Value> </Eq></Where></Query></View>'
    taskquery = '<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' + workflowname + '</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' + IID2 + '</Value></Eq><And><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>'
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    peojectC = null;
}
if (isRisksEscalatePage) {
    workflowname = "تصعيد خطر"
    fieldtoedit = "Status"
    bulkeditlist = "Escalations"
    IID2 = window.location.href.split('IID=')[1].split('&')[0];
    RID = window.location.href.split('RID=')[1].split('&')[0];
    bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + RID + '</Value> </Eq></Where></Query></View>'
    taskquery = '<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' + workflowname + '</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' + RID + '</Value></Eq><And><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
}
if (isIssuesEscalatePage) {
    workflowname = "تصعيد تحدي"
    fieldtoedit = "Status"
    bulkeditlist = 'Escalations'
    IID2 = window.location.href.split('IID=')[1].split('&')[0];
    RID = window.location.href.split('RID=')[1].split('&')[0];
    bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + RID + '</Value> </Eq></Where></Query></View>'
    taskquery = '<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' + workflowname + '</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' + RID + '</Value></Eq><And><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
}
if (isChangeRequestPage) {
    workflowname = "CR"
    fieldtoedit = "SubmitForApproval"
    bulkeditlist = 'Change Request'
    IID2 = window.location.href.split('IID=')[1].split('&')[0];
    bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + IID2 + '</Value> </Eq></Where></Query></View>'
    taskquery = '<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' + workflowname + '</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' + IID2 + '</Value></Eq><And><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
}
if (isDeliverablesPage && !WFisNew) {
    workflowname = "DV"
    fieldtoedit = "Delivered"
    bulkeditlist = 'Deliverables'
    IID2 = window.location.href.split('IID=')[1].split('&')[0];
    bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + IID2 + '</Value> </Eq></Where></Query></View>'
    taskquery = '<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' + workflowname + '</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' + IID2 + '</Value></Eq><And><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
}

if (isideapage && WFisForm) {
    workflowname = 'Idea';
    fieldtoedit = 'IdeaType'; // field to edit in case it is a "submitfield"
    bulkeditlist = 'Ideas'; // list to edit in this case idae list
    IID2 = window.location.href.split('IID=')[1].split('&')[0];
    bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + IID2 + '</Value></Eq></Where></Query></View>';
    taskquery = '<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' + workflowname + '</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' + IID2 + '</Value></Eq><And><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
}
//*****1 */
if (window.location.href.indexOf('PCODE') > -1) {
    // console.log('123');
    peojectC = window.location.href.split('PCODE=')[1].split('&')[0];
    taskID = window.location.href.split('TID=')[1].split('&')[0];
    workflowname = 'Project';
    fieldtoedit = 'ProjectManager';
    bulkeditlist = 'Projects';
    bulkeditquery = "<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>" + peojectC + "</Value></Eq></Where></Query></View>";
    taskquery = '<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' + taskID + '</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' + workflowname + '</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>';
}

//*****3 */
var Task_PCODE_Data_Request_WFs = {
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        // console.log('321');
        if ($('.DahsFormTitle').length || $('.PNameTitle').text() || $('#Ribbon\\.Tabs\\.PDP\\.Home-title').length) {
            // console.log('in');
            clearInterval(forTasksHTMLStatus);
            $('div.Container').after('<div class="cust-loader"></div>');
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                Task_PCODE_Data_Request_WFs.init();
            });
        }
        //*****channnnges */

        clearInterval(forTasksHTMLStatus);
        $('div.Container').after('<div class="cust-loader"></div>');
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
            Task_PCODE_Data_Request_WFs.init();
            // console.log('Start');
        });
    },
    // The main Initialization function
    init: function() {
        // console.log(taskquery, "THIS IS TASLK QUERy")
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Tasks'); //list name
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(taskquery); //caml query
        Task_PCODE_Data_Request_WFs.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Task_PCODE_Data_Request_WFs.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Task_PCODE_Data_Request_WFs.onSuccess),
            Function.createDelegate(this, Task_PCODE_Data_Request_WFs.onError)
        );
    },
    onSuccess: function(sender, args) {
        var collListItem = Task_PCODE_Data_Request_WFs.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) { //loop through list items
            //
            var oListItem = listItemEnum.get_current();
            taskid = oListItem.get_id();
            //alert(taskid);
            nxtstageid = oListItem.get_item('StageIDApprove');
            if (nxtstageid) {
                nxtstageidarr = nxtstageid.replaceAll('__', '').split(';');
            }
            prvstageid = oListItem.get_item('StageIDReject');
            if (prvstageid) {
                prvstageidarr = prvstageid.replaceAll('__', '').split(';');
            }

            stageid = oListItem.get_item('StageID');
            tasktype = oListItem.get_item('TaskType'); //user acttion type
            peojectC = oListItem.get_item('ProjectCode');
            stagename = oListItem.get_item('StageName');

            if (localStorage.getItem('Dynamo_Stages') != null) {
                stagearr = JSON.parse(localStorage.getItem("Dynamo_Stages") || "[]");
                stagearr = stagearr.filter(function(item) {
                    return item.code == stagename
                });
                if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                    stagename = stagearr[0].name;
                } else stagename = stagearr[0].nameEn;
            }

            workflowname = oListItem.get_item('WorkflowName');
            assignedto = oListItem.get_item('AssignedTo'); //handle multiple people picker
        }

        var hasaccess = false;
        for (var a = 0; a < assignedto.length; a++) {
            if (assignedto[a].get_lookupId() == _spPageContextInfo.userId || WFuserCalls.g.Groups.indexOf(assignedto[a].get_lookupValue()) > -1) {
                hasaccess = true;
            }
            if (a == assignedto.length - 1) {
                if (!hasaccess) {
                    window.location = _spPageContextInfo.webServerRelativeUrl;
                }
            }
        }

        //*****4 */

        if (workflowname == 'Project') {
            PCODE_Stage_Data_Request_WFs.init();
        } else if (workflowname == 'Idea')
            Task_PCODE_Data_Request_WFs.g.handleids();
        else if (workflowname == 'مهمة') {
            Task_PCODE_Data_Request_WFs.g.handleids(); //go to handleids
        } else if (workflowname == 'DV') {
            Task_PCODE_Data_Request_WFs.g.handleids();
        } else if (workflowname == 'CR') {
            Task_PCODE_Data_Request_WFs.g.handleids();
        } else if (workflowname == 'تصعيد تحدي') {
            Task_PCODE_Data_Request_WFs.g.handleids();
        } else if (workflowname == 'تصعيد خطر') {
            Task_PCODE_Data_Request_WFs.g.handleids();
        } else if (workflowname == 'تصعيد مهمة') {
            Task_PCODE_Data_Request_WFs.g.handleids();
        } else {
            // console.log('test test')
        }
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {
        Handle_Take_Action: function() {
            if (isschedule) {
                $('body').append('<style>div#s4-titlerow {display: block!important;padding: 6px;}h1#pageTitle span {display: flex;}</style>');
            }
            //
            // console.log("داخل المهمممة")
            // console.log(tasktype, "tasktype tasktype tasktype tasktype tasktype")
            // console.log(taskid, "taskid taskidtaskid taskidtaskidtaskid ")

            //  alert(tasktype);
            switch (tasktype) {
                case 'ProjectTask':
                    // console.log("ProjectTaskProjectTask with JUMANA")
                    $('.navbar.page-nav.px-5').after('<div class="WF-btn"><button  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="btn pop-green rejection" style="float: left;font-size: 17px;" type="button">مشروع "' + stagename + '"</button><button  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="btn pop-green" type="button" >مهمة "' + stagename + '"</button></div>');
                    $('div.Container').fadeIn();
                    $('div.cust-loader').fadeOut();
                    break;
                case 'Approval':
                    if (isIssuesEscalatePage || isRisksEscalatePage || isTasksEscalatePage) {
                        $('.navbar.page-nav.px-5').after('<div class="WF-btn"><button  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="btn pop-green rejection" style="float: left;font-size: 17px;" type="button">دعم "' + stagename + '"</button><button  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="btn pop-green" type="button" >تصعيد "' + stagename + '"</button></div>'); //style="float: left;margin: 0 3px;color:White;padding: 2px;text-align:center;;width:200px;background: #853232;"
                        $('div.Container').fadeIn();
                        $('div.cust-loader').fadeOut();
                    } else {
                        // console.log('aaaaaaaaaaaaaa');
                        $('.navbar.page-nav.px-5').after('<div class="WF-btn"><button  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="btn pop-green rejection" style="float: left;font-size: 17px;" type="button">إرجاع</button><button  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="btn pop-green" type="button" >الموافقة</button></div>');
                        $('div.Container').fadeIn();
                        $('div.cust-loader').fadeOut();
                        forFormSubmitHTMLStatus = setInterval(function() {
                            Task_PCODE_Data_Request_WFs.g.hidefields();
                        }, 100);
                    }
                    break;
                case 'Submit':
                    // console.log("Submit SubmitSubmitSubmit with JUMANA")

                    // $('.DahsFormTitle > button').hide();
                    $('.navbar.page-nav.px-5').after('<div class="WF-btn"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Submit\')"  class="btn pop-green" type="button">تم الانتهاء من "' + stagename + '"</button></div>'); //style="float: left;font-size: 17px;"
                    $('div.Container').fadeIn();
                    $('div.cust-loader').fadeOut();
                    forFormSubmitHTMLStatus = setInterval(function() {
                        Task_PCODE_Data_Request_WFs.g.hidefields();
                    }, 100);
                    break;

                case 'New':
                    // $('.DahsFormTitle > button').hide();
                    $('.navbar.page-nav.px-5').after('<div class="WF-btn"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'New\')" " class="btn pop-green" type="button">تم الانتهاء من "' + stagename + '"</button></div>'); //style="float: left;font-size: 17px;
                    $('div.Container').fadeIn();
                    $('div.cust-loader').fadeOut();
                    forFormSubmitHTMLStatus = setInterval(function() {
                        Task_PCODE_Data_Request_WFs.g.hidefields();
                    }, 100);
                    break;

                case 'Resubmit':
                    // $('.DahsFormTitle > button').hide();
                    $('.navbar.page-nav.px-5').after('<div class="WF-btn"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Submit\')" class="btn pop-green" type="button">إعادة إرسال</button></div>');
                    $('div.Container').fadeIn();
                    $('div.cust-loader').fadeOut();
                    forFormSubmitHTMLStatus = setInterval(function() {
                        Task_PCODE_Data_Request_WFs.g.hidefields();
                    }, 100);
                    break;

                case 'SubmitField':
                    $('.navbar.page-nav.px-5').after('<div class="WF-btn"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'SubmitField\')" class="btn pop-green" type="button">تم الانتهاء من  "' + stagename + '"</button></div>');
                    forFormSubmitHTMLStatus = setInterval(function() {
                        Task_PCODE_Data_Request_WFs.g.hidefields();
                    }, 100);
                    break;
                case 'Attach':
                    $('.navbar.page-nav.px-5').after('<div class="WF-btn"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Attach\')" class="btn pop-green" type="button">تم الانتهاء من  "' + stagename + '"</button></div>');
                    forFormSubmitHTMLStatus = setInterval(function() {
                        Task_PCODE_Data_Request_WFs.g.hidefields();
                    }, 100);
                    break;

                case 'CheckList':
                    $('.navbar.page-nav.px-5').after('<div class="WF-btn"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'CheckList\')" class="btn pop-green" type="button">تم الانتهاء من  "' + stagename + '"</button></div>');
                    forFormSubmitHTMLStatus = setInterval(function() {
                        Task_PCODE_Data_Request_WFs.g.hidefields();
                    }, 100);
                    break;

            }
            $('.fieldset-container').prepend('<div class="col-md-6 CFIELD multiline" data-groups="" style="margin-bottom: 20px;"><label for="Description" undefined="">تعليق المراجع</label><p type="text" class="viewmode-value" id="Description">' + taskcomments + '</p></div>');
        },
        handleids: function() {
            if (workflowname == 'Project') {
                curstage_org = Stages_ORG_Data_Request_WFs.g.StagesArray.filter(function(obj) {
                    return obj.stage == stageid;
                });

                curstage_org_nxt = Stages_ORG_Data_Request_WFs.g.StagesArray.filter((item) => nxtstageidarr.includes(item.stage));


                if (prvstageid != null) {

                    curstage_org_prv = Stages_ORG_Data_Request_WFs.g.StagesArray.filter((item) => prvstageidarr.includes(item.stage));

                    curstage_prv = ProjectStages_Data_Request_WFs.g.StagesArray.filter(function(obj) {
                        return obj.stage == curstage_org_prv[0].stage;
                    });
                }

                curstage = ProjectStages_Data_Request_WFs.g.StagesArray.filter(function(obj) {
                    return obj.stage == curstage_org[0].stage;
                });
                curstage_nxt = ProjectStages_Data_Request_WFs.g.StagesArray.filter(function(obj) {
                    return obj.stage == curstage_org_nxt[0].stage;
                });
            }
            formakesureishtmlStatus = setInterval(function() {
                Task_PCODE_Data_Request_WFs.g.makesureishtml();
            }, 100);
        },
        hidefields: function() {
            if ($('.IFIELD').length) {
                clearInterval(forFormSubmitHTMLStatus);
                $('.CSformbuttons button').hide();
                $('.IFIELD,.formcontents').hide();
                $('#' + fieldtoedit).closest('.formcontents').show();
                $('#' + fieldtoedit).closest('.IFIELD').show();
                $('div.Container').fadeIn();
                $('div.cust-loader').fadeOut();
            }
        },
        makesureishtml: function() {
            if ($('.fieldset-container').length) { //|| $('#filterColumn').length || $('h2.PNameTitle').length || $('span.ms-pagetitle').length
                clearInterval(formakesureishtmlStatus);
                Task_PCODE_Data_Request_WFs.g.Handle_Take_Action();
            } else if ($('.navbar.page-nav.px-5').length > 0 && (window.location.href.toLowerCase().indexOf('projectdetails') > -1 || window.location.href.toLowerCase().indexOf('listing.aspx') > -1 || window.location.href.toLowerCase().indexOf('projecthome.aspx') > -1)) {
                clearInterval(formakesureishtmlStatus);
                Task_PCODE_Data_Request_WFs.g.Handle_Take_Action();
            }
        },
        addcomments: function(state, version) {
            //
            if (workflowname == 'Project') {
                // console.log('state', state);
                // console.log('version', version);
                if (version == 'Approval' || version == 'Submit') {
                    $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="if( ($(\'#commenttext\').val() && ' + !state + ') || ' + state + ' ){BulkEdit(' + state + ')}else{$(\'.wrapcomments\').append(\'<p >يرجى تعبئة الملاحظات</p>\')}">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
                } else if (version == 'SubmitField') {
                    $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="if( ($(\'#commenttext\').val() && ' + !state + ') || ' + state + ' ){SubmitField_BulkEdit.preinit(' + state + ')}else{$(\'.wrapcomments\').append(\'<p >يرجى تعبئة الملاحظات</p>\')}">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
                } else if (version == 'Attach') {
                    $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="if( ($(\'#commenttext\').val()  && ' + !state + ') || ' + state + ' ){WF_UploadFiles.preinit(' + state + ')}else{$(\'.wrapcomments\').append(\'<p >يرجى تعبئة الملاحظات</p>\')}">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
                } else if (version == 'CheckList') {
                    $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="if( ($(\'#commenttext\').val() &&  && ' + !state + ') || ' + state + ' ){Edit_File_Details_Submit.init(' + state + ')}else{$(\'.wrapcomments\').append(\'<p >يرجى تعبئة الملاحظات</p>\')}">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
                } else if (version == 'New') {
                    $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="if( ($(\'#commenttext\').val() &&  && ' + !state + ') || ' + state + ' ){WF_New_Data_Submit.init(' + state + ')}else{$(\'.wrapcomments\').append(\'<p >يرجى تعبئة الملاحظات</p>\')}">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
                }
            } else if (workflowname == 'Idea') {
                $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit(' + state + ')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
            } else if (workflowname == 'مهمة') {
                $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit(' + state + ')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
            } else if (workflowname == 'DV') {
                $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit(' + state + ')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
            } else if (workflowname == 'CR') {
                $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit(' + state + ')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
            } else if (workflowname == 'تصعيد تحدي') {
                $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit(' + state + ')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
            } else if (workflowname == 'تصعيد خطر') {
                $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit(' + state + ')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
            } else if (workflowname == 'تصعيد مهمة') {
                $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit(' + state + ')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
            }
        }
    }
};
//*****5 */
var PCODE_Stage_Data_Request_WFs = {
    onSuccess: function(sender, args) {
        var collListItem = PCODE_Stage_Data_Request_WFs.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) { //loop through list items
            var oListItem = listItemEnum.get_current();
            //
            projectstagename = oListItem.get_item('Stage');
            taskcomments = oListItem.get_item('Comments');
        }
        //*****6 */
        ProjectStages_Data_Request_WFs.init();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Projects'); //list name
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' + peojectC + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>'); //caml query
        PCODE_Stage_Data_Request_WFs.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(PCODE_Stage_Data_Request_WFs.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, PCODE_Stage_Data_Request_WFs.onSuccess),
            Function.createDelegate(this, PCODE_Stage_Data_Request_WFs.onError)
        );
    },
    // Global variables
    g: {}
};
// start of calls
//*****2 */
if (
    (window.location.href.toLowerCase().indexOf('pcode=') > -1 && window.location.href.toLowerCase().indexOf('&wfs') > -1) ||
    (isideapage && window.location.href.toLowerCase().indexOf('&wfs') > -1) ||
    (isTasksPage && window.location.href.toLowerCase().indexOf('&wfs') > -1) ||
    (isDeliverablesPage && window.location.href.toLowerCase().indexOf('&wfs') > -1) ||
    (isChangeRequestPage && window.location.href.toLowerCase().indexOf('&wfs') > -1) ||
    (isIssuesEscalatePage && window.location.href.toLowerCase().indexOf('&wfes') > -1) ||
    (isRisksEscalatePage && window.location.href.toLowerCase().indexOf('&wfes') > -1) ||
    (isTasksEscalatePage && window.location.href.toLowerCase().indexOf('&wfes') > -1)
) {
    // console.log('54321');
    $(document).ready(function() {
        WFuserCalls.get_CurrentUser();
        $('body').append('<style>.cust-loader {position:fixed;margin: 0 auto;top: 50%;right: 50%;width: 77px;height: 77px;}div.Container, .DahsFormTitle > button.CSformSubmit, .DahsFormTitle > button.CSformDelete,.DahsFormTitle > button.CSformEscalate,#btnGroupDrop1, .CSformbuttons{display:none}</style>');
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
            forTasksHTMLStatus = setInterval(function() {
                Task_PCODE_Data_Request_WFs.preinit();
            }, 500);
        });
    });
}
//phases-stages
//*****7 */
var ProjectStages_Data_Request_WFs = {
    onSuccess: function(sender, args) {
        //
        var collListItem = ProjectStages_Data_Request_WFs.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            ProjectStages_Data_Request_WFs.g.StagesArray.push({
                stage: oListItem.get_item('StageCode'),
                stageid: oListItem.get_id(),
                pcode: oListItem.get_item('ProjectCode')
            });
        }
        // console.log('77', ProjectStages_Data_Request_WFs.g.StagesArray[0]);
        //alert(ProjectStages_Data_Request_WFs.g.StagesArray[0].stageid);
        Stages_ORG_Data_Request_WFs.init();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Project Stages');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'ProjectCode\'/><Value Type="Text">' + peojectC + '</Value></Eq></Where><OrderBy><FieldRef Name=\'ListSort\' Ascending=\'True\' /></OrderBy></Query></View>');
        ProjectStages_Data_Request_WFs.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(ProjectStages_Data_Request_WFs.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, ProjectStages_Data_Request_WFs.onSuccess),
            Function.createDelegate(this, ProjectStages_Data_Request_WFs.onError)
        );
    },
    // Global variables
    g: {
        StagesArray: [],
    }
};
var Stages_ORG_Data_Request_WFs = {
    onSuccess: function(sender, args) {
        var collListItem = Stages_ORG_Data_Request_WFs.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        Stages_ORG_Data_Request_WFs.g.StagesArray = []
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            Stages_ORG_Data_Request_WFs.g.StagesArray.push({
                phase: oListItem.get_item('RelatedPhase'),
                stage: oListItem.get_item('Title'),
                relatedURL: oListItem.get_item('RelatedURL'),
                stageid: oListItem.get_id(),
            });
        }
        // console.log(Stages_ORG_Data_Request_WFs.g.StagesArray + "123");
        // console.log('Stages_ORG_Data_Request_WFs');
        //*****9 */
        Task_PCODE_Data_Request_WFs.g.handleids();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // The main Initialization function
    init: function(peojectC, type, taskid, nxtstageid, prvstageid, stageid) {
        //console.log('asdasd');
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Stages');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Enabled\'/><Value Type=\'Integer\'>1</Value></Eq></Where><OrderBy><FieldRef Name=\'ListSort\' Ascending=\'True\' /></OrderBy></Query></View>');
        Stages_ORG_Data_Request_WFs.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Stages_ORG_Data_Request_WFs.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Stages_ORG_Data_Request_WFs.onSuccess),
            Function.createDelegate(this, Stages_ORG_Data_Request_WFs.onError)
        );
    },
    // Global variables
    g: {
        StagesArray: []
    }
};
//end phases-stages
//for all workflows
var SubmitField_BulkEdit = {
        preinit: function(state) {
            // console.log("Inside SubmitField_BulkEdit Escalate");
            // console.log('state', state);
            if (workflowname == 'Project' && ($('span.sp-peoplepicker-userSpan').length > 0 || $('#' + fieldtoedit).val())) {
                SubmitField_BulkEdit.init(state);
            } else if (workflowname != 'Project' && tasktype == "SubmitField" && $('.was-validated .form-control:invalid').length == 0) {
                SubmitField_BulkEdit.init(state);
            } else if (workflowname != 'Project' && tasktype != "SubmitField" && $('.was-validated .form-control:invalid').length == 0) {
                // console.log("HEre We Are for esc", state)
                SubmitField_BulkEdit.init(state);
            } else {
                $('.pop-buttons').append('<p>Please fill above info</p>');
                $('.popupComment').remove();
            }
        },
        init: function(state) {
            $('h2.DahsFormTitle').append('<div class="cust-loader"></div>  ');
            // $('button.pop-green').attr("disabled", true);
            $('.commentsub').attr("disabled", true);
            var context = SP.ClientContext.get_current();
            var dfd = $.Deferred();
            //Get list from host web
            //

            var programList = context.get_web().get_lists().getByTitle(bulkeditlist);
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml(bulkeditquery);
            //Get items by Query
            var progColl = programList.getItems(camlQuery);
            var todayDate = new Date()

            var todayDateFormatter = todayDate.getMonth() + 1 + '/' + todayDate.getDate() + '/' + todayDate.getFullYear()
                //Load item collection
            context.load(progColl);

            context.executeQueryAsync(function() {
                    var currentItemArray = [];
                    // console.log(progColl, "progColl progColl")
                    // console.log(progColl.get_count(), "progColl .get_count()")
                        //Check itemcollection count greater than 0
                    if (progColl.get_count() > 0) {
                        var progEnum = progColl.getEnumerator();
                        while (progEnum.moveNext()) {
                            var currentItem = progEnum.get_current();
                            var progTitle = currentItem.get_item("Title");
                            var currentId = currentItem.get_item("ID");
                            // var getStage = currentItem.get_item("Stage")
                            // console.log(currentId);
                            //Get Item by current ID
                            //
                            var items = programList.getItemById(currentId);
                            //set
                            if (workflowname == 'Project') {
                                var ppp = ($('span.sp-peoplepicker-userSpan').attr('sid') == undefined) ? '' : SP.FieldUserValue.fromUser($('span.sp-peoplepicker-userSpan').attr('sid'));
                                items.set_item(fieldtoedit, ppp);
                            } else if (workflowname == 'Idea') {
                                if (tasktype == 'SubmitField') {
                                    var val = $('#' + fieldtoedit).val();
                                    items.set_item(fieldtoedit, val);
                                }
                                if (state)
                                /////////////////////////////////////////jkjkjkjkjk
                                    items.set_item('Stage', nxtstageid);
                                else
                                    items.set_item('Stage', prvstageid);
                            } else if (workflowname == 'مهمة') {
                                if (tasktype == 'SubmitField') {
                                    var changeTaskOwner = ($('span.sp-peoplepicker-userSpan').attr('sid') == undefined) ? '' : SP.FieldUserValue.fromUser($('span.sp-peoplepicker-userSpan').attr('sid')); //.split('|').slice(-1)[0]
                                    items.set_item(fieldtoedit, changeTaskOwner);
                                }
                                if (stagename == 'تنفيذ المهمة') {
                                    items.set_item('ActualStartDate', todayDateFormatter)
                                }
                                if (stagename == 'اعتماد اغلاق المهمة') {
                                    items.set_item('ActualFinishDate', todayDateFormatter)
                                }
                                if (state)
                                    items.set_item('Stage', nxtstageid);
                                else
                                    items.set_item('Stage', prvstageid);

                            } else if (workflowname == 'DV') {
                                if (state) {
                                    items.set_item('Stage', nxtstageid);
                                } else {
                                    items.set_item('Stage', prvstageid);
                                    items.set_item(fieldtoedit, 'No');
                                }
                            } else if (workflowname == 'CR') {
                                if (state) {
                                    items.set_item('Stage', nxtstageid);
                                } else {
                                    items.set_item('Stage', prvstageid);
                                    items.set_item(fieldtoedit, 'NO');
                                }
                            } else if (workflowname == 'تصعيد تحدي') {
                                if (state) {
                                    items.set_item('Stage', nxtstageid);
                                } else {
                                    items.set_item('Stage', prvstageid);
                                }
                            } else if (workflowname == 'تصعيد خطر') {
                                if (state) {
                                    items.set_item('Stage', nxtstageid);
                                } else {
                                    items.set_item('Stage', prvstageid);
                                }
                            } else if (workflowname == 'تصعيد مهمة') {
                                // console.log("inside else if  line 912", state)
                                if (state) {
                                    items.set_item('Stage', nxtstageid);
                                } else {
                                    items.set_item('Stage', prvstageid);
                                }
                            }
                            //Update the item
                            items.update();
                            //Push item on the array
                            currentItemArray.push(items);
                            //Load the item Array
                            context.load(currentItemArray[currentItemArray.length - 1]);
                        }
                        context.executeQueryAsync(function() {
                            //Item Updated sucess
                            // console.log("Items are updated Successfully");
                            dfd.resolve();
                            //
                            if (workflowname == 'Project')
                                BulkEdit(state);
                            else if (workflowname == 'Idea') {
                                Task_Edit_Data.init();
                            } else if (workflowname == 'مهمة') {
                                Task_Edit_Data.init();
                            } else if (workflowname == 'DV') {
                                Task_Edit_Data.init();
                            } else if (workflowname == 'CR') {
                                Task_Edit_Data.init();
                            } else if (workflowname == 'تصعيد تحدي') {
                                Task_Edit_Data.init();
                            } else if (workflowname == 'تصعيد خطر') {
                                Task_Edit_Data.init();
                            } else if (workflowname == 'تصعيد مهمة') {
                                Task_Edit_Data.init();
                            }
                        }, function(sender, args) {
                            //Item updated fail
                            console.log("Request Failed to get  Items :" + args.get_message());
                        });
                    } else {
                        dfd.resolve();
                    }
                },
                function(sender, args) {
                    $('.loader').hide();
                    console.log("Request failed in  List " + args.get_message());
                });
            return dfd.promise();
        }
    }
    //upload multiple files to specific folder with column assigning
var WF_UploadFiles = {
        WF_files: [], //files array
        preinit: function(state) {
            //
            $('.WF-Attach').addClass('was-validated');
            if ($('.was-validated .form-control:invalid').length == 0) {
                WF_UploadFiles.getFiles();
            }
            WF_UploadFiles.g.state = state;
        },
        getFiles: function() //fill array
            {
                $('[type=file]').each(function(index) {
                    var fc = $(this).get(0).files.length,
                        $this = $(this).get(0),
                        typename = $(this).parent().next().find('select').val();
                    for (var i = 0; i < fc; i++) {
                        WF_UploadFiles.WF_files.push({ title: typename, name: $this.files[i].name, buffer: $this.files[i] }); //$this.files[i].name
                    }
                    if (index == $('[type=file]').length - 1) {
                        WF_UploadFiles.readFiles();
                    }
                });
            },
        readFiles: function() {
            var filesUploaded = 0;
            for (var i = 0; i < WF_UploadFiles.WF_files.length; i++) {
                let file = WF_UploadFiles.WF_files[i].buffer;
                var titlename = WF_UploadFiles.WF_files[i].title;
                var reader = new FileReader();
                reader._NAME = WF_UploadFiles.WF_files[i].name
                reader.onload = function(e) {
                    let fileactualName = e.target._NAME;
                    WF_UploadFiles.init(e.target.result, fileactualName, titlename);
                }
                reader.onerror = function(e) {
                    alert(e.target.error);
                }
                reader.readAsArrayBuffer(file);
            }
        },
        init: function(arrayBuffer, fileName, titlename) {
            //
            //Get Client Context,Web and List object.
            var clientContext = new SP.ClientContext.get_current();
            var oWeb = clientContext.get_web();
            var oList = oWeb.getFolderByServerRelativeUrl('/' + ListArray[2].documents + '/' + peojectC + '/' + listkey);
            // oWeb.get_lists().getByTitle('Projects Documents');

            //Convert the file contents into base64 data
            var bytes = new Uint8Array(arrayBuffer);
            var i, length, out = '';
            for (i = 0, length = bytes.length; i < length; i += 1) {
                out += String.fromCharCode(bytes[i]);
            }
            var base64 = btoa(out);
            //Create FileCreationInformation object using the read file data
            var createInfo = new SP.FileCreationInformation();
            createInfo.set_content(base64);
            // createInfo.set_url(fileName+' - '+Math.floor(Math.random()*1000));
            createInfo.set_url(fileName);
            //Add the file to the library
            var myFolder = oList.get_files().add(createInfo)
            var myListItem = myFolder.get_listItemAllFields();
            myListItem.set_item("ItemID", IID);
            if (peojectC) {
                myListItem.set_item("Title", listkey + '-' + titlename + '-' + peojectC)
            } else {
                myListItem.set_item("Title", listkey)
            }
            myListItem.update();
            //Load client context and execcute the batch
            clientContext.load(myFolder);
            clientContext.executeQueryAsync(WF_UploadFiles.UploadQuerySuccess, WF_UploadFiles.UploadQueryFailure);
        },
        UploadQuerySuccess: function() {
            WF_isuploaddone++;
            // console.log('File Uploaded Successfully.');
            if (WF_UploadFiles.WF_files.length == WF_isuploaddone) {
                BulkEdit(WF_UploadFiles.g.state);
            }
        },
        UploadQueryFailure: function(sender, args) {
            console.log('Request failed with error message - ' + args.get_message());
        },
        g: {}
    }
    //checklist
var Edit_File_Details_Submit = {
        init: function() {

            var clientContext = new SP.ClientContext.get_current();
            var CurrList, oList, itemID;
            $('[file-title="طلب عرض شراء"]').each(function() {
                oList = clientContext.get_web().get_lists().getByTitle(ListArray[2].documents);
                itemID = $(this).attr('file-id');
                Edit_File_Details_Submit.g.oListItem = oList.getItemById(itemID);
                $('[type="checkbox"][id^=Check]').each(function() {
                    var checkedvalue = $('input[id="' + $(this).attr('id') + '"]:checked').length;
                    if (checkedvalue)
                        Edit_File_Details_Submit.g.oListItem.set_item($(this).attr('id'), true);
                    else
                        Edit_File_Details_Submit.g.oListItem.set_item($(this).attr('id'), false);
                });
                Edit_File_Details_Submit.g.oListItem.update();
                clientContext.load(Edit_File_Details_Submit.g.oListItem);
            });

            clientContext.executeQueryAsync(
                Function.createDelegate(this, function() {
                    BulkEdit(true);
                }),
                Function.createDelegate(this, function(sender, args) {
                    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
                })
            );
        },
        g: {}
    }
    //new items
var WF_New_Data_Submit = {
    preinit: function() {
        $('.errormsg').remove();
        $('.container-body').addClass('was-validated');
        var pickervalid = true; //check required people picker
        $('[type=picker][required]').each(function() {
            if ($(this).find('span.sp-peoplepicker-userSpan').length == 0) {
                pickervalid = false;
                $(this).addClass('picker-error');
                $(this).removeClass('picker-valid');
                // return false;
            } else {
                $(this).removeClass('picker-error');
                $(this).addClass('picker-valid');
            }
        });
        if ($('.was-validated .form-control:invalid').length == 0 && pickervalid) {
            WF_New_Data_Submit.init();
        } else {
            $('.CSformbuttons').prepend('<p class="errormsg">Please check info above</p>')
            // console.log('check form for errors');
            var $container = $('#s4-workspace'),
                $scrollTo = $('.was-validated .form-control:invalid');
            if ($scrollTo.length == 0) {
                $scrollTo = $('[type=picker][required]');
            }
            $container.animate({
                scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 120
            });
        }
    },
    init: function() {
        // $('.loading-wait').show();
        // $('.errormsg').hide();
        // if( !$('.loading-wait').length )
        // $('div.CSformbuttons').prepend('<div class="loading-wait">  Please Wait... <div class="cust-loader"></div></div>');
        $('.btn-save').attr("disabled", true);
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle(SP_ListName);
        var itemCreateInfo = new SP.ListItemCreationInformation();
        WF_New_Data_Submit.g.oListItem = oList.addItem(itemCreateInfo);
        $('.section-container:not([data-target_list]) .CFIELD> input[type=text], .section-container:not([data-target_list]) .CFIELD> input[type=number], .section-container:not([data-target_list]) .CFIELD>  input[type=date], .section-container:not([data-target_list]) .CFIELD> input[type=radio], .section-container:not([data-target_list]) .CFIELD> input[type=checkbox], .section-container:not([data-target_list]) .CFIELD> div[type=picker], .section-container:not([data-target_list]) .CFIELD> select[type=dropdown], .section-container:not([data-target_list]) .CFIELD>  textarea, .section-container:not([data-target_list]) .CFIELD > .multiselect-container').each(function() {
            if ($(this).attr('type') == 'picker') {
                if ($(this).find('span.sp-peoplepicker-userSpan').length) {
                    var id = $(this).attr('INppicker');
                    var ppp = ($(this).find('span.sp-peoplepicker-userSpan').attr('sid') == undefined) ? '' : SP.FieldUserValue.fromUser($(this).find('span.sp-peoplepicker-userSpan').attr('sid').split('|').slice(-1)[0]);
                    WF_New_Data_Submit.g.oListItem.set_item(id, ppp);
                } else if (($(this).attr('id') == 'ProjectOwner' && listkey == 'projects') || ($(this).attr('id') == 'MitigationOwner' && listkey == 'risks')) {
                    var ppp = SP.FieldUserValue.fromUser(UserN.LoginName.split('|')[1]);
                    WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), ppp);
                }
            } else if ($(this).attr('type') == 'date') {

                var dateval = $(this).val().replace('-', '/');
                var ydate = (!dateval) ? '' : [dateval.slice(5, 10), dateval.slice(0, 4)].join('/').replace('-', '/');
                if (dateval)
                    WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), ydate);

            } else if ($(this).attr('type') == 'radio') {

                var checkedvalue = $('input[id="' + $(this).attr('id') + '"]:checked').val();
                if (checkedvalue == 'yes') {
                    WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), 'Yes');
                } else if (checkedvalue == 'no') {
                    WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), 'No');
                } else
                    WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), checkedvalue);

            } else if ($(this).attr('type') == 'checkbox') {
                //
                var checkedvalue = $('input[id="' + $(this).attr('id') + '"]:checked').length;
                if (checkedvalue)
                    WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), true);
                else
                    WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), false);

            } else if ($(this).attr('type') == 'dropdown') {

                WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), $(this).val());

            } else if ($(this).hasClass("percentagefield")) {

                WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), $(this).val() / 100);

            } else if ($(this).attr('type') == 'multiselect') {
                var myselections = [];
                $(this).find("input#Revenue:checked").each(function() {
                    myselections.push($(this).val());
                });
                myselections = myselections.join(':::');
                WF_New_Data_Submit.g.oListItem.set_item($(this).attr('myfield'), myselections);
            } else
                WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), $(this).val());
        });
        // console.log('PCODE', PCODE);
        if (PCODE && listkey != 'projects') {
            WF_New_Data_Submit.g.oListItem.set_item("ProjectCode", PCODE);
            if (listkey == 'issues') {
                WF_New_Data_Submit.g.oListItem.set_item("ResolutionStatus", 'لم يبدء');
            }
            // WF_New_Data_Submit.g.oListItem.set_item("MasterKey", PCODE);
            // WF_New_Data_Submit.g.oListItem.set_item("MasterID", PCODE);
        }
        if (listkey == 'projects') {
            // PCODE = $('input#Title').val();
            // WF_New_Data_Submit.g.oListItem.set_item("Title", PCODE);
            //
            WF_New_Data_Submit.g.oListItem.set_item("Phase", Phases_Data_Request.g.PhasesArray[0].phase);
            WF_New_Data_Submit.g.oListItem.set_item("Stage", Stages_Data_Request.g.StagesArray[0].stage);
        }
        WF_New_Data_Submit.g.oListItem.update();
        clientContext.load(WF_New_Data_Submit.g.oListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, function() {
                window.WF_IID = WF_New_Data_Submit.g.oListItem.get_id();
                WF_Set_Code_Submit.init();

            }),
            Function.createDelegate(this, function(sender, args) {
                var errormessage = 'Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()
                if (errormessage.indexOf('duplicate values') > -1) {
                    $('.CSformbuttons button').attr("disabled", false);
                    $('.CSformbuttons').prepend('<p class="errormsg">Please choose another value for Project Code since it is already used</p>');
                    $('.loading-wait').hide();
                }
                console.log(errormessage);
            })
        );
    },
    g: {
        clickbait: function() {
            $('button.btn-save').click(function() {
                WF_New_Data_Submit.preinit();
            })
        },
        Cancel: function() {
            $('button.btn-cancel').click(function() {
                // window.history.back();
                window.location = '/SitePages/Listing.aspx?ListKey=' + listkey + PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
            })
        },
        checkNewMasterDetails: function() {
            if ($('.Details-Item.NewItem').length > 0) //calling new master submit
            {
                New_Master_Details_Submit.init();

            } else {
                // console.log('successful');
                $('.errormsg').hide();
                $('.successmsg').show();
                $('.btn-save').addClass("success");

                window.location = _spPageContextInfo.webServerRelativeUrl + '/SitePages/Listing.aspx?ListKey=' + listkey + PCODE_STRING;
            }
        }
    }
};
var WF_Set_Code_Submit = {
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle(SP_ListName);
        WF_Set_Code_Submit.g.oListItem = oList.getItemById(WF_IID); //declared inside object scope only
        var Code;
        if (listkey != 'projects') {
            var prt1 = listkey.substring(0, 2).toUpperCase(),
                prt2 = String(new Date().getFullYear()).slice(4 - 2),
                prt3 = WF_IID.toString().padStart(4, "0");
            Code = prt1 + '-' + prt2 + '-' + prt3;
            WF_Set_Code_Submit.g.oListItem.set_item('Title', Code);
            // console.log(Code);
        } else if (listkey == 'projects') {
            Code = PCODE + '-' + IID.toString().padStart(4, "0");; //
            PCODE = Code;
            WF_Set_Code_Submit.g.oListItem.set_item('Title', Code);
        }
        // console.log(PCODE);
        //
        WF_Set_Code_Submit.g.oListItem.update();
        clientContext.load(WF_Set_Code_Submit.g.oListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, function() {
                // console.log(PCODE);
                var WF_Fileelements, WF_fileCount;
                if ($('#getFile').length) {
                    WF_Fileelements = document.getElementById("getFile");
                    WF_fileCount = WF_Fileelements.files.length;
                }
                if (WF_fileCount) {
                    WF_UploadFiles.preinit(true);
                } else {
                    BulkEdit(true);
                }

            }),
            Function.createDelegate(this, function(sender, args) {
                console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            })
        );
    },
    g: {}
};
//
//for project workflow
//phases-stages update
function BulkEdit(state) {
    $('h2.DahsFormTitle,h2.PNameTitle').append('<div class="cust-loader"></div>  ');
    $('.commentsub').attr("disabled", true);
    var context = SP.ClientContext.get_current();
    var dfd = $.Deferred();
    //Get list from host web
    var programList = context.get_web().get_lists().getByTitle('Project Stages');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><Where><And><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' + peojectC + '</Value></Eq><Eq><FieldRef Name="StageCode" /><Value Type="Text">' + stageid + '</Value></Eq></And></Where></Query><RowLimit>1</RowLimit></View>');
    //Get items by Query
    var progColl = programList.getItems(camlQuery);
    //Load item collection
    context.load(progColl);
    context.executeQueryAsync(function() {
            var currentItemArray = [];
            //Check itemcollection count greater than 0
            if (progColl.get_count() > 0) {
                var progEnum = progColl.getEnumerator();
                while (progEnum.moveNext()) {
                    var currentItem = progEnum.get_current();
                    var progTitle = currentItem.get_item("Title");
                    var currentId = currentItem.get_item("ID");
                    // console.log(currentId);
                    //Get Item by current ID
                    var items = programList.getItemById(currentId);
                    items.set_item("Comments", $('textarea#commenttext').val());

                    //Get Phase from Project Stages to Update it in Project list
                    curphaseName = currentItem.get_item("PhaseCode");

                    if (state) { //if approved set decision true
                        items.set_item("Decision", true);
                    }
                    if (!state) { //reject
                        items.set_item("Decision", false);
                    }
                    //Update the item
                    items.update();
                    //Push item on the array
                    currentItemArray.push(items);
                    //Load the item Array
                    context.load(currentItemArray[currentItemArray.length - 1]);
                }
                context.executeQueryAsync(function() {
                    //Item Updated sucess
                    // console.log("Items are updated Successfully");
                    dfd.resolve();
                    program_BulkEdit(state)

                }, function(sender, args) {
                    //Item updated fail
                    console.log("Request Failed to get projectlist Items :" + args.get_message());
                });
            } else {
                dfd.resolve();
            }
        },
        function(sender, args) {
            $('.loader').hide();
            console.log("Request failed in List " + args.get_message());
        });
    return dfd.promise();
}
//end phases-stages update




function program_BulkEdit() {
    var context = SP.ClientContext.get_current();
    var dfd = $.Deferred();
    //Get list from host web
    var programList = context.get_web().get_lists().getByTitle('Projects');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name=\'Title\'/><Value Type=\'Text\'>" + peojectC + "</Value></Eq></Where></Query></View>");
    //Get items by Query
    var progColl = programList.getItems(camlQuery);
    //Load item collection
    context.load(progColl);
    context.executeQueryAsync(function() {
            var currentItemArray = [];
            //Check itemcollection count greater than 0
            if (progColl.get_count() > 0) {
                var progEnum = progColl.getEnumerator();
                while (progEnum.moveNext()) {
                    var currentItem = progEnum.get_current();
                    var progTitle = currentItem.get_item("Title");
                    var currentId = currentItem.get_item("ID");
                    var prjstage = currentItem.get_item("Stage");
                    var ismultistage = prjstage.indexOf(';') > -1;
                    // console.log(currentId);
                    //Get Item by current ID
                    var items = programList.getItemById(currentId);
                    //set
                    items.set_item("Phase", curphaseName);
                    if (!ismultistage) // 1 active stage
                    {
                        items.set_item("Stage", nxtstageid);
                    } else // multiple active stages
                    {
                        prjstage = prjstage.split(';');
                        prjstage.forEach(function(x, i, a) { // (value, index, array)
                            if (x == stageid) // == stage from active task
                            {
                                a[i] = nxtstageid;
                            }
                        });
                        var sameVals = prjstage.every((val, i, arr) => val === arr[0]); //check if same stage values
                        if (sameVals) {
                            items.set_item("Stage", prjstage[0].replaceAll('__', '')); // remove __ if same values
                        } else {
                            items.set_item("Stage", prjstage.join(';')); // set multiple stages value

                        }
                    }
                    //Update the item
                    items.update();
                    //Push item on the array
                    currentItemArray.push(items);
                    //Load the item Array
                    context.load(currentItemArray[currentItemArray.length - 1]);
                }
                context.executeQueryAsync(function() {
                    //Item Updated sucess
                    // console.log("Items are updated Successfully");
                    dfd.resolve();
                    Task_Edit_Data.init();

                }, function(sender, args) {
                    //Item updated fail
                    console.log("Request Failed to get projectlist Items :" + args.get_message());
                });
            } else {
                dfd.resolve();
            }
        },
        function(sender, args) {
            $('.loader').hide();
            console.log("Request failed in projectlist List " + args.get_message());
        });
    return dfd.promise();
}
//*****edit task list that the task not available now */
var Task_Edit_Data = {
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Tasks');
        Task_Edit_Data.g.oListItem = oList.getItemById(taskid); //declared inside object scope only

        Task_Edit_Data.g.oListItem.set_item('Status', 'Closed');
        Task_Edit_Data.g.oListItem.set_item('WFInstanceID', null);
        Task_Edit_Data.g.oListItem.set_item('Body', $('textarea#commenttext').val());
        //Task_Edit_Data.g.oListItem.set_item('Body', $('textarea.pop-description').val());
        Task_Edit_Data.g.oListItem.update();
        clientContext.load(Task_Edit_Data.g.oListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, function() {
                // console.log('successful');
                $('.errormsg').hide();
                // location.reload();
                if (isChangeRequestPage) {
                    window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=ChangeRequest'
                }
                if (isDeliverablesPage) {
                    window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=deliverables'
                }
                if (isTasksPage) {
                    window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=SMOTasks'
                }
                if (isTasksEscalatePage) {
                    window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=SMOTasks';
                } else if (isideapage) {
                    window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=ideas';
                } else if (isProjectPage) {
                    window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/ProjectHome.aspx?PCODE=' + peojectC;
                } else if (isIssuesEscalatePage) {
                    window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=Issues';
                } else if (isRisksEscalatePage) {
                    window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=Risks';
                }
            }),
            Function.createDelegate(this, function(sender, args) {
                console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            })
        );
    },
    g: {}
};