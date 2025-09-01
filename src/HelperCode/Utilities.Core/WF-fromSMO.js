// ***************************************************************************************
//Workflow Handle
/********************************************************************************** */
var workflowname, stageid, stagename, projectstagename, nxtstageid, prvstageid, taskid, tasktype, peojectC, curstageName, curphaseName,
    isideapage = window.location.href.indexOf('idea') > -1,
    isTasksPage = (window.location.href.indexOf('SMOTasks') > -1 && window.location.href.indexOf('WFs') > -1),
    isProjectPage = window.location.href.indexOf('PCODE') > -1,
    isDeliverablesPage = window.location.href.indexOf('Deliverables') > -1,
    isChangeRequestPage = window.location.href.indexOf('ChangeRequest') > -1,
    isIssuesEscalatePage = window.location.href.indexOf('Issues') > -1,
    isRisksEscalatePage = window.location.href.indexOf('Risks') > -1,
    isTasksEscalatePage = (window.location.href.indexOf('SMOTasks') > -1 && window.location.href.indexOf('WFEs') > -1),
    fieldtoedit, bulkeditlist, bulkeditquery, taskquery, IID2, RID, isschedule = window.location.href.indexOf('schedule.aspx') > -1;
var curstage_org = [],
    curstage_org_prv = [],
    curstage_prv = [],
    curstage = [],
    curstage_nxt = [];
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
    taskquery = '<View><Query><Where><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><And><Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' + workflowname + '</Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where></Query><RowLimit>1</RowLimit></View>';
    peojectC = null;
}
if (isTasksPage) {
    workflowname = "مهمة";
    fieldtoedit = "Owner"; // if i have multi field to edit i will assign the value in array and iterate over it in update
    bulkeditlist = 'SMOTasks'; // IID is the item ID for the Page and i will know the page from Gamal to target the element
    IID2 = window.location.href.split('IID=')[1].split('&')[0];
    bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + IID2 + '</Value> </Eq></Where></Query></View>'
    taskquery = '<View><Query><Where><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><And><Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' + workflowname + '</Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where></Query><RowLimit>1</RowLimit></View>';
    peojectC = null;
}
if (isRisksEscalatePage) {
    workflowname = "تصعيد خطر"
    fieldtoedit = "Status"
    bulkeditlist = "Escalations"
    IID2 = window.location.href.split('IID=')[1].split('&')[0];
    RID = window.location.href.split('RID=')[1].split('&')[0];
    bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + RID + '</Value> </Eq></Where></Query></View>'
    taskquery = '<View><Query><Where><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><And><Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' + workflowname + '</Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where></Query><RowLimit>1</RowLimit></View>';
    peojectC = null;
}
if (isIssuesEscalatePage) {
    workflowname = "تصعيد تحدي"
    fieldtoedit = "Status"
    bulkeditlist = 'Escalations'
    IID2 = window.location.href.split('IID=')[1].split('&')[0];
    RID = window.location.href.split('RID=')[1].split('&')[0];
    bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + RID + '</Value> </Eq></Where></Query></View>'
    taskquery = '<View><Query><Where><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><And><Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' + workflowname + '</Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where></Query><RowLimit>1</RowLimit></View>';
    peojectC = null;
}
if (isChangeRequestPage) {
    workflowname = "طلب تغيير"
    fieldtoedit = "SubmitForApproval"
    bulkeditlist = 'ChangeRequest'
    IID2 = window.location.href.split('IID=')[1].split('&')[0];
    bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + IID2 + '</Value> </Eq></Where></Query></View>'
    taskquery = '<View><Query><Where><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><And><Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' + workflowname + '</Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where></Query><RowLimit>1</RowLimit></View>';
    peojectC = null;
}
if (isDeliverablesPage) {
    workflowname = "مخرج مشروع"
    fieldtoedit = "Delivered"
    bulkeditlist = 'Deliverables'
    IID2 = window.location.href.split('IID=')[1].split('&')[0];
    bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + IID2 + '</Value> </Eq></Where></Query></View>'
    taskquery = '<View><Query><Where><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><And><Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' + workflowname + '</Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where></Query><RowLimit>1</RowLimit></View>';
    peojectC = null;
}

if (isideapage) {
    workflowname = 'فكرة';
    fieldtoedit = 'IdeaType'; // field to edit in case it is a "submitfield"
    bulkeditlist = 'Ideas'; // list to edit in this case idae list
    IID2 = window.location.href.split('IID=')[1].split('&')[0];
    bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + IID2 + '</Value></Eq></Where></Query></View>';
    taskquery = '<View><Query><Where><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><And><Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' + workflowname + '</Value> </Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where></Query><RowLimit>1</RowLimit></View>';
    peojectC = null;
}
if (window.location.href.indexOf('PCODE') > -1) {
    peojectC = window.location.href.split('PCODE=')[1].split('&')[0];
    workflowname = 'مشروع';
    fieldtoedit = 'ProjectManager';
    bulkeditlist = 'ProgramProjects';
    bulkeditquery = "<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>" + peojectC + "</Value></Eq></Where></Query></View>";
    taskquery = '<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ProjectCode" /> <Value Type="Text">' + peojectC + '</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' + workflowname + '</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>';
}
var Task_PCODE_Data_Request_WFs = {
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ($('.DahsFormTitle').length || $('.PNameTitle').text() || $('#Ribbon\\.Tabs\\.PDP\\.Home-title').length) {
            // console.log('in');
            clearInterval(forTasksHTMLStatus);
            $('div.Container').after('<div class="cust-loader"></div>');
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                Task_PCODE_Data_Request_WFs.init();
            });
        }
        clearInterval(forTasksHTMLStatus);
        $('div.Container').after('<div class="cust-loader"></div>');
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
            Task_PCODE_Data_Request_WFs.init();
        });
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Tasks'); //list name
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(taskquery); //caml query
        //<Where><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><And><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">'+peojectC+'</Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where>
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
            var oListItem = listItemEnum.get_current();
            taskid = oListItem.get_id();
            // console.log(taskid);
            nxtstageid = oListItem.get_item('StageIDApprove');
            prvstageid = oListItem.get_item('StageIDReject');
            stageid = oListItem.get_item('StageID');
            tasktype = oListItem.get_item('TaskType1'); //user acttion type
            peojectC = oListItem.get_item('ProjectCode');
            stagename = oListItem.get_item('Title');
            // workflowname = oListItem.get_item('WorkflowName');
        }

        if (workflowname == 'مشروع')
            PCODE_Stage_Data_Request_WFs.init();
        else if (workflowname == 'فكرة')
            Task_PCODE_Data_Request_WFs.g.handleids();
        else if (workflowname == 'مهمة') {
            Task_PCODE_Data_Request_WFs.g.handleids(); //go to handleids
        } else if (workflowname == 'مخرج مشروع') {
            Task_PCODE_Data_Request_WFs.g.handleids();
        } else if (workflowname == 'طلب تغيير') {
            Task_PCODE_Data_Request_WFs.g.handleids();
        } else if (workflowname == 'تصعيد تحدي') {
            Task_PCODE_Data_Request_WFs.g.handleids();
        } else if (workflowname == 'تصعيد خطر') {
            Task_PCODE_Data_Request_WFs.g.handleids();
        } else if (workflowname == 'تصعيد مهمة') {
            Task_PCODE_Data_Request_WFs.g.handleids();
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
            // console.log('asdasdasd');
            switch (tasktype) {
                case 'ProjectTask':
                    $('h2.DahsFormTitle, h2.PNameTitle, span.ms-pagetitle').append('<button style="float: left;margin: 0 3px;background: #853232;" onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="pop-green" style="float: left;font-size: 17px;" type="button"> مشروع  "' + stagename + '"</button><button style="float: left;margin: 0 3px;" onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="pop-green" type="button" style="float: left;font-size: 17px;">مهمة "' + stagename + '"</button>');
                    $('div.Container').fadeIn();
                    $('div.cust-loader').fadeOut();
                    break;
                case 'Approval':
                    if (isIssuesEscalatePage || isRisksEscalatePage || isTasksEscalatePage) {
                        $('h2.DahsFormTitle, h2.PNameTitle, span.ms-pagetitle').append('<button style="float: left;margin: 0 3px;background: #853232;" onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="pop-green" style="float: left;font-size: 17px;" type="button">دعم "' + stagename + '"</button><button style="float: left;margin: 0 3px;" onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="pop-green" type="button" style="float: left;font-size: 17px;">تصعيد "' + stagename + '"</button>');
                        $('div.Container').fadeIn();
                        $('div.cust-loader').fadeOut();
                    } else {
                        // $('.DahsFormTitle > button, .CSformbuttons').hide();
                        $('h2.DahsFormTitle, h2.PNameTitle, span.ms-pagetitle').append('<button style="float: left;margin: 0 3px;background: #853232;" onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="pop-green" style="float: left;font-size: 17px;" type="button">الرفض "' + stagename + '"</button><button style="float: left;margin: 0 3px;" onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="pop-green" type="button" style="float: left;font-size: 17px;">الموافقة "' + stagename + '"</button>');
                        $('div.Container').fadeIn();
                        $('div.cust-loader').fadeOut();
                        // <div style="float:left;margin:0 10px;height: 38px;font-size: 14px;" class="actionport btn-group" role="group" aria-label="Button group with nested dropdown"> <div class="btn-group" role="group"> <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> الموافقة / الرفض  "'+stagename+'"</button> <div class="dropdown-menu" aria-labelledby="btnGroupDrop1"> <a onclick="BulkEdit(true)" class="approveaction dropdown-item" href="JavaScript:Void(0);">الموافقة</a> <a class="rejectaction dropdown-item" onclick="BulkEdit(false)" href="JavaScript:Void(0);">الرفض</a> </div> </div></div>
                    }
                    break;
                case 'Submit':
                    // console.log('asdasdasd');
                    // $('.DahsFormTitle > button').hide();
                    $('h2.DahsFormTitle, h2.PNameTitle, span.ms-pagetitle').append('<button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Submit\')" style="float: left;font-size: 17px;" class="pop-green" type="button">تم الانتهاء من "' + stagename + '"</button>');
                    $('div.Container').fadeIn();
                    $('div.cust-loader').fadeOut();
                    break;
                case 'SubmitField':
                    $('h2.DahsFormTitle, h2.PNameTitle, span.ms-pagetitle').append('<button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'SubmitField\')" style="float: left;font-size: 17px;" class="pop-green" type="button">تم الانتهاء من  "' + stagename + '"</button>');
                    forFormSubmitHTMLStatus = setInterval(function() {
                        Task_PCODE_Data_Request_WFs.g.hidefields();
                    }, 100);
                    // button.pop-green {display: flex;justify-content: center;align-items: center;float: left;font-size: 18px;background-color: #31503b;color: #fff;float:left;}
                    break;
            }
        },
        handleids: function() {
            // console.log('handleids');
            if (workflowname == 'مشروع') {
                curstage_org = Stages_ORG_Data_Request_WFs.g.StagesArray.filter(function(obj) {
                    return obj.stageid == stageid;
                });
                curstage_org_nxt = Stages_ORG_Data_Request_WFs.g.StagesArray.filter(function(obj) {
                    return obj.stageid == nxtstageid;
                });
                if (prvstageid != 0) {
                    curstage_org_prv = Stages_ORG_Data_Request_WFs.g.StagesArray.filter(function(obj) {
                        return obj.stageid == prvstageid;
                    });
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
            if ($('.CSformbuttons').length || $('#filterColumn').length || $('h2.PNameTitle').length || $('span.ms-pagetitle').length) {
                clearInterval(formakesureishtmlStatus);
                Task_PCODE_Data_Request_WFs.g.Handle_Take_Action();
            }
        },
        addcomments: function(state, version) {
            if (workflowname == 'مشروع') {
                if (version == 'Approval' || version == 'Submit') {
                    $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="BulkEdit(' + state + ')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
                } else if (version == 'SubmitField') {
                    $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit(' + state + ')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
                }
            } else if (workflowname == 'فكرة') {
                $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit(' + state + ')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
            } else if (workflowname == 'مهمة') {
                $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit(' + state + ')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
            } else if (workflowname == 'مخرج مشروع') {
                $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit(' + state + ')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
            } else if (workflowname == 'طلب تغيير') {
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
var PCODE_Stage_Data_Request_WFs = {
    onSuccess: function(sender, args) {

        var collListItem = PCODE_Stage_Data_Request_WFs.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) { //loop through list items
            var oListItem = listItemEnum.get_current();
            projectstagename = oListItem.get_item('Stage');
        }
        if (projectstagename == stagename) {
            ProjectStages_Data_Request_WFs.init();
        }
        // console.log('PCODE_Stage_Data_Request_WFs');

    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('ProgramProjects'); //list name
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
    $(document).ready(function() {
        $('body').append('<style>.cust-loader {position:fixed;margin: 0 auto;top: 50%;right: 50%;width: 77px;height: 77px;}div.Container, .DahsFormTitle > button.CSformSubmit, .DahsFormTitle > button.CSformDelete,.DahsFormTitle > button.CSformEscalate,#btnGroupDrop1, .CSformbuttons{display:none}</style>');
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
            forTasksHTMLStatus = setInterval(function() {
                Task_PCODE_Data_Request_WFs.preinit();
            }, 500);
        });
    });
}
//phases-stages
var ProjectStages_Data_Request_WFs = {
    onSuccess: function(sender, args) {
        var collListItem = ProjectStages_Data_Request_WFs.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            ProjectStages_Data_Request_WFs.g.StagesArray.push({
                stage: oListItem.get_item('Stage'),
                stageid: oListItem.get_id(),
                pcode: oListItem.get_item('ProjectCode')
            });
        }
        // console.log('ProjectStages_Data_Request_WFs');
        Stages_ORG_Data_Request_WFs.init();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('ProjectStages');
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
        // console.log('Stages_ORG_Data_Request_WFs');

        Task_PCODE_Data_Request_WFs.g.handleids();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // The main Initialization function
    init: function(peojectC, type, taskid, nxtstageid, prvstageid, stageid) {
        // console.log('asdasd');
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
var SubmitField_BulkEdit = {
        preinit: function(state) {
            // console.log("Inside SubmitField_BulkEdit Escalate")
            if (workflowname == 'مشروع' && $('span.sp-peoplepicker-userSpan').length) {
                SubmitField_BulkEdit.init(state);
            } else if (workflowname != 'مشروع' && tasktype == "SubmitField" && $('.was-validated .form-control:invalid').length == 0) {
                SubmitField_BulkEdit.init(state);
            } else if ( /*workflowname != 'مشروع' &&*/ tasktype != "SubmitField") {
                // console.log("HEre We Are for esc", state)
                SubmitField_BulkEdit.init(state);
            } else {
                $('.pop-buttons').append('<p class="errormsg">Please fill above info</p>');
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
                            var items = programList.getItemById(currentId);
                            //set
                            if (workflowname == 'مشروع') {
                                //var ppp = ($('span.sp-peoplepicker-userSpan').attr('sid') == undefined) ? '' : SP.FieldUserValue.fromUser($('span.sp-peoplepicker-userSpan').attr('sid'));//.split('|').slice(-1)[0]
                                // items.set_item(fieldtoedit, ppp);
                                if (tasktype == 'SubmitField') {
                                    var val = $('#' + fieldtoedit).val();
                                    items.set_item(fieldtoedit, val);
                                }
                                if (state)
                                    items.set_item('Stage', nxtstageid);
                                else
                                    items.set_item('Stage', prvstageid);

                            } else if (workflowname == 'فكرة') {
                                if (tasktype == 'SubmitField') {
                                    var val = $('#' + fieldtoedit).val();
                                    items.set_item(fieldtoedit, val);
                                }
                                if (state)
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

                            } else if (workflowname == 'مخرج مشروع') {
                                if (state) {
                                    items.set_item('Stage', nxtstageid);
                                } else {
                                    items.set_item('Stage', prvstageid);
                                    items.set_item(fieldtoedit, 'لا');

                                }
                            } else if (workflowname == 'طلب تغيير') {
                                if (state) {
                                    items.set_item('Stage', nxtstageid);
                                } else {
                                    items.set_item('Stage', prvstageid);
                                    items.set_item(fieldtoedit, 'لا');
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
                            if (workflowname == 'مشروع') {
                                BulkEdit(state);
                                //Task_Edit_Data.init();
                            } else if (workflowname == 'فكرة') {
                                Task_Edit_Data.init();
                            } else if (workflowname == 'مهمة') {
                                Task_Edit_Data.init();
                            } else if (workflowname == 'مخرج مشروع') {
                                Task_Edit_Data.init();
                            } else if (workflowname == 'طلب تغيير') {
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
                        // console.log("inside ELSSSSSSSSSSSE INIIIIIIIIIIIIIIIIIIIIIIIIIT")
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
    //phases-stages update
function BulkEdit(state) {
    $('h2.DahsFormTitle,h2.PNameTitle').append('<div class="cust-loader"></div>  ');
    $('.commentsub').attr("disabled", true);
    var context = SP.ClientContext.get_current();
    var dfd = $.Deferred();
    //Get list from host web
    var programList = context.get_web().get_lists().getByTitle('ProjectStages');
    var camlQuery = new SP.CamlQuery();
    var qwhere = "<In> <FieldRef Name='ID' /> <Values>";
    if (!state) {
        var index = ProjectStages_Data_Request_WFs.g.StagesArray.findIndex(x => x.stageid === curstage[0].stageid);
        for (var i = curstage_org_prv[0].stageid - 1; i <= index; i++) {
            qwhere += "<Value Type='Integer'>" + ProjectStages_Data_Request_WFs.g.StagesArray[i].stageid + "</Value>";
            if (i == index) {
                qwhere += "</Values> </In>";
                camlQuery.set_viewXml("<View><Query><Where>" + qwhere + "</Where></Query></View>");
            }

        }
    } else {
        var index = ProjectStages_Data_Request_WFs.g.StagesArray.findIndex(x => x.stageid === curstage[0].stageid);
        for (var i = 0; i <= index + 1; i++) {
            qwhere += "<Value Type='Integer'>" + ProjectStages_Data_Request_WFs.g.StagesArray[i].stageid + "</Value>";
            if (i == index + 1) {
                qwhere += "</Values> </In>";
                camlQuery.set_viewXml("<View><Query><Where>" + qwhere + "</Where></Query></View>");
            }

        }

    }
    // console.log(qwhere);
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
                    //set
                    // if(currentId == stageid)
                    // {
                    // 	items.set_item("Decision", false);
                    // 	items.set_item("Comments", $('textarea.pop-description').val());
                    // }
                    // console.log(currentId, curstage[0].stageid);
                    if (state) {
                        if (currentId == curstage[0].stageid) {
                            items.set_item("Comments", $('textarea#commenttext').val());
                        }
                        if (currentId == curstage_nxt[0].stageid) {
                            curstageName = currentItem.get_item("Stage");
                            curphaseName = currentItem.get_item("Title");
                            items.set_item("Decision", false);
                        } else {
                            items.set_item("Decision", true);
                        }
                    }
                    if (!state) {
                        items.set_item("Decision", false);
                        if (currentId == curstage[0].stageid) {
                            items.set_item("Comments", $('textarea#commenttext').val());
                        }
                        if (currentId == curstage_prv[0].stageid) {
                            curstageName = currentItem.get_item("Stage");
                            curphaseName = currentItem.get_item("Title");
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
                    program_BulkEdit()

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
            console.log("Request failed in Portfolio List " + args.get_message());
        });
    return dfd.promise();
}
//end phases-stages update
function program_BulkEdit() {
    var context = SP.ClientContext.get_current();
    var dfd = $.Deferred();
    //Get list from host web
    var programList = context.get_web().get_lists().getByTitle('ProgramProjects');
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
                    // console.log(currentId);
                    //Get Item by current ID
                    var items = programList.getItemById(currentId);
                    //set

                    items.set_item("Phase", curphaseName);
                    items.set_item("Stage", curstageName);

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
                    window.location = _spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl + '/SitePages/Listing.aspx?ListKey=ChangeRequest'
                }
                if (isDeliverablesPage) {
                    window.location = _spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl + '/SitePages/Listing.aspx?ListKey=Deliverables'
                }
                if (isTasksPage) {
                    window.location = _spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl + '/SitePages/Listing.aspx?ListKey=SMOTasks'
                }
                if (isTasksEscalatePage) {
                    window.location = _spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl + '/SitePages/Listing.aspx?ListKey=SMOTasks';
                } else if (isideapage) {
                    window.location = _spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl + '/SitePages/Listing.aspx?ListKey=Ideas';
                } else if (isProjectPage) {
                    window.location = _spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl + '/SitePages/ProjectDetails.aspx?PCODE=' + peojectC;
                } else if (isIssuesEscalatePage) {
                    window.location = _spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl + '/SitePages/Listing.aspx?ListKey=Issues';
                } else if (isRisksEscalatePage) {
                    window.location = _spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl + '/SitePages/Listing.aspx?ListKey=Risks';
                }
            }),
            Function.createDelegate(this, function(sender, args) {
                console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            })
        );
    },
    g: {}
};