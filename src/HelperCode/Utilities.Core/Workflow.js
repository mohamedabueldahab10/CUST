//steps for project wrfl:
// 1- get related task, 2- get cuur stage of project, 3- get all project stages from ProjectStages List, 4- get all stages from configuration Stages list ( to get any related config fields like related url ), 5- handleids: get curr nxt and prv stage with full info, 6- based on tasktype show user buttons and action,7- after user action: change status of stages based on user action, 8- assign new stage and phase to the project item, 9- close task;
// ***************************************************************************************
//Workflow Handle
/********************************************************************************** */
//

//get user groups
var WFuserCalls = {
  get_CurrentUser: function () {
    //getUserWebPermissionREST();
    $.ajax({
      url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
      method: "GET",
      headers: { "Accept": "application/json; odata=verbose" },
      success: function (data) {
        //console.log(data.d);
        UserN = data.d;
        WFuserCalls.get_CurrentUserGroupColl(data.d.Id);
        //console.log(UserN);
      },
      error: function (data) {
        // console.log('call failed');
      }
    });
  },
  get_CurrentUserGroupColl: function (UserID) {
    $.ajax({
      url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetUserById(" + UserID + ")/Groups",
      method: "GET",
      headers: { "Accept": "application/json; odata=verbose" },
      success: function (data) {
        /* get all group's title of current user. */
        var results = data.d.results;
        for (var i = 0; i < results.length; i++) {
          WFuserCalls.g.Groups.push(results[i].Title);
        }
      }
    });
  },
  get_AllResources: function () {
    $.ajax({
      url: _spPageContextInfo.webAbsoluteUrl + "/_api/ProjectServer/EnterpriseResources",
      method: "GET",
      headers: { "Accept": "application/json; odata=verbose" },
      success: function (data) {
        allResourcesArr = data.d.results
        SP.SOD.registerSod('PS.ProjectContext', SP.Utilities.Utility.getLayoutsPageUrl('ps.js'));
        SP.SOD.loadMultiple(['PS.ProjectContext'], WfGetProjects);
      }
    });
  },
  g: {
    Groups: []
  }
}
var historyLink;
window.projectstagename;
window.initiativestagename;
var workflowname, stageid, stagenamE, stageName, taskcomments, nxtstageid, relateditemid, currentstage, noteQuery, No_Data, stageState, prvstageid, cancelstageid, prvstageidarr, nxtstageidarr, taskid, tasktype, peojectC, initiativeC, curstageName, curphaseName, nextphaseName, assignedto, WF_isuploaddone = 0,
  WFisNew = (window.location.href.toLowerCase().indexOf('new.aspx') > -1 && window.location.href.indexOf('WF') > -1),
  WFisEdit = (window.location.href.toLowerCase().indexOf('edit.aspx') > -1 && window.location.href.indexOf('WF') > -1),
  WFisForm = window.location.href.toLowerCase().indexOf('new.aspx') > -1 || window.location.href.toLowerCase().indexOf('view.aspx') > -1 || window.location.href.toLowerCase().indexOf('edit.aspx') > -1,
  isideapage = window.location.href.indexOf('ideas') > -1,
  isTasksPage = (window.location.href.indexOf('SMOTasks') > -1 && window.location.href.indexOf('WFs') > -1),
  //
  isProjectCharter = (window.location.href.indexOf('projectcharter') > -1 && window.location.href.indexOf('WFs') > -1),
  isInitiativeSample = (window.location.href.indexOf('initiativesample') > -1 && window.location.href.indexOf('WFs') > -1),
  //
  isRelatedProjectPage = window.location.href.indexOf('PCODE') > -1,
  isDeliverablesPage = window.location.href.indexOf('deliverables') > -1,
  isChangeRequestPage = window.location.href.indexOf('changerequest') > -1,
  isRiskPage = window.location.href.indexOf('risks') > -1,
  isIssuePage = window.location.href.indexOf('issues') > -1,
  isMomPage = window.location.href.indexOf('mom') > -1,
  isMainKPIPage = window.location.href.indexOf('mainkpi') > -1,

  isProjectPage = window.location.href.indexOf('projects') > -1,

  fieldtoedit, bulkeditlist, bulkeditquery, taskquery, IID2, RID, isschedule = window.location.href.indexOf('schedule.aspx') > -1;
window.lastIdeaQuery;
window.isView = window.location.href.toLowerCase().indexOf('view.aspx') > -1;
var curstage_org = [],
  curstage_org_prv = [],
  curstage_prv = [],
  curstage = [],
  curstage_nxt = [],
  curphase_nxt = [];

// to handle the initiative stage
var initcurstage_org = [],
  initcurstage_org_prv = [],
  initcurstage_prv = [],
  initcurstage = [],
  initcurstage_nxt = [];
//
var stagecode, nextStageName, prevStageName, curStageArr, actionbuttonTitle;
var forTasksHTMLStatus, forFormSubmitHTMLStatus, formakesureishtmlStatus;
var dialogBoxHtml = '';
//determine which workflow to get related task
// console.log(isTasksPage, 'isTasksPage')
// console.log(isTasksEscalatePage, 'isTasksEscalatePage')
// console.log(RID, 'RID RID')
//added by oday
var projectManagerPicker = '',
  ProjectOwnerPicker = '',
  ProjectSponsorPicker = '';
// Get the projects collection.//get PGUID // Declare global variables.
var projContext;
var projects;
var projectGuid;
var PNAME;
//
if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
  No_Data = 'لا يوجد';
} else {
  No_Data = 'No Data';
}




if (isChangeRequestPage) {
  workflowname = "CR"
  fieldtoedit = "SubmitForApproval"
  bulkeditlist = 'Change Request'
  IID2 = window.location.href.split('IID=')[1].split('&')[0];
  bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + IID2 + '</Value> </Eq></Where></Query></View>'
  taskquery = '<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' + workflowname + '</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' + IID2 + '</Value></Eq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
}
else if (isDeliverablesPage) {
  workflowname = "DV"
  bulkeditlist = 'Deliverables'
  IID2 = window.location.href.split('IID=')[1].split('&')[0];
  bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + IID2 + '</Value> </Eq></Where></Query></View>'
  taskquery = '<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' + workflowname + '</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' + IID2 + '</Value></Eq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
}
else if (isRiskPage) {
  workflowname = "Risk"
  bulkeditlist = 'Risks'
  IID2 = window.location.href.split('IID=')[1].split('&')[0];
  bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + IID2 + '</Value> </Eq></Where></Query></View>'
  taskquery = '<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' + workflowname + '</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' + IID2 + '</Value></Eq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
}
else if (isIssuePage) {
  workflowname = "Issue"
  bulkeditlist = 'Issues'
  IID2 = window.location.href.split('IID=')[1].split('&')[0];
  bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + IID2 + '</Value> </Eq></Where></Query></View>'
  taskquery = '<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' + workflowname + '</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' + IID2 + '</Value></Eq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
} else if (isMomPage) {
  workflowname = "MoM"
  bulkeditlist = 'MOM'
  IID2 = window.location.href.split('IID=')[1].split('&')[0];
  bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + IID2 + '</Value> </Eq></Where></Query></View>'
  taskquery = '<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' + workflowname + '</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' + IID2 + '</Value></Eq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
}
else if (isMainKPIPage) {
  bulkeditlist = 'MainKPI'
  IID2 = window.location.href.split('IID=')[1].split('&')[0];
  bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + IID2 + '</Value> </Eq></Where></Query></View>'
  taskquery = '<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' + workflowname + '</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' + IID2 + '</Value></Eq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
} else if (isInitiativeSample) {
  initiativeC = window.location.href.split('ICODE=')[1].split('&')[0];
  workflowname = "InitiativeSample"
  bulkeditlist = "Initiatives"
  IID2 = window.location.href.split('IID=')[1].split('&')[0];
  bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' + IID2 + '</Value> </Eq></Where></Query></View>'
  taskquery = '<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' + workflowname + '</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' + IID2 + '</Value></Eq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
}



//*****1 */
if ((window.location.href.indexOf('PCODE') > -1) && (window.location.href.toLowerCase().indexOf('&wfs') > -1)) {
  // console.log('123');
  peojectC = window.location.href.split('PCODE=')[1].split('&')[0];
  workflowname = 'Project';
  fieldtoedit = 'ProjectManager';
  bulkeditlist = 'Projects';
  bulkeditquery = "<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>" + peojectC + "</Value></Eq></Where></Query></View>";
  if (window.location.href.indexOf('TID') > -1) {
    taskID = window.location.href.split('TID=')[1].split('&')[0];
    taskquery = '<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' + taskID + '</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' + workflowname + '</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>';
  } else {
    taskquery = '<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' + taskID + '</Value> </Eq><Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq></And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>';
  }
}
//*****3 */
var Task_PCODE_Data_Request_WFs = {
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    // console.log('321');
    if ($('.DahsFormTitle').length || $('.PNameTitle').text() || $('#Ribbon\\.Tabs\\.PDP\\.Home-title').length) {
      // console.log('in');
      clearInterval(forTasksHTMLStatus);
      $('div.Container').after('<div class="cust-loader"></div>');
      SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        Task_PCODE_Data_Request_WFs.init();
      });
    }
    //*****channnnges */
    clearInterval(forTasksHTMLStatus);
    $('div.Container').after('<div class="cust-loader"></div>');
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
      Task_PCODE_Data_Request_WFs.init();
      // console.log('Start');
    });
  },
  // The main Initialization function
  init: function () {
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
  onSuccess: function (sender, args) {
    var collListItem = Task_PCODE_Data_Request_WFs.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) { //loop through list items
      var oListItem = listItemEnum.get_current();
      taskid = oListItem.get_id();
      //alert(taskid);
      nxtstageid = oListItem.get_item('StageIDApprove');
      relateditemid = oListItem.get_item('RelatedItemID');
      if (nxtstageid) {
        nxtstageidarr = nxtstageid.replaceAll('__', '').split(';');
      }
      prvstageid = oListItem.get_item('StageIDReject');
      cancelstageid = oListItem.get_item('StageIDCancel');

      if (prvstageid) {
        prvstageidarr = prvstageid.replaceAll('__', '').split(';');
      }
      stageid = oListItem.get_item('StageID');
      tasktype = oListItem.get_item('TaskType'); //user acttion type
      peojectC = oListItem.get_item('ProjectCode');
      initiativeC = oListItem.get_item('InitiativeCode');
      stagename = oListItem.get_item('Title');
      // stagename = oListItem.get_item('StageName');
      workflowname = oListItem.get_item('WorkflowName');
      assignedto = oListItem.get_item('AssignedTo'); //handle multiple people picker
      currentstage = oListItem.get_item('Title'); //added to handle WFNote Query
      var tasktitlearr = [];
      if (localStorage.getItem('Dynamo_Tasks Configuration') != null) {
        tasktitlearr = JSON.parse(localStorage.getItem("Dynamo_Tasks Configuration") || "[]");
        tasktitlearr = tasktitlearr.filter(function (item) {
          return item.code == stagename
        });
        if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
          stagename = tasktitlearr[0].name;
          actionbuttonTitle = tasktitlearr[0].actionButtonTitleAr;
        } else {
          stagename = tasktitlearr[0].nameEn;
          actionbuttonTitle = tasktitlearr[0].actionButtonTitleEn;
        }
      }
    }

    if (workflowname == "Project") {
      historyLink = '' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/TaskHistory.aspx?TT=' + workflowname + '&PCODE=' + peojectC + '&IID=' + relateditemid + '';
    } else if (workflowname == "Idea") {
      historyLink = '' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/TaskHistory.aspx?TT=' + workflowname + '&IID=' + relateditemid + '';
    } else {
      historyLink = '' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/TaskHistory.aspx?TT=' + workflowname + '&IID=' + relateditemid + '';
    }
    noteQuery = `<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">${workflowname}</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">${relateditemid}</Value></Eq><And><Eq><FieldRef Name="Status" /><Value Type="Choice">Closed</Value></Eq><Or><Contains><FieldRef Name='StageIDApprove' /><Value Type='Text'>${currentstage}</Value></Contains><Contains><FieldRef Name="StageIDReject" /><Value Type="Text">${currentstage}</Value></Contains></Or></And></And></And></Where><OrderBy><FieldRef Name="Modified" Ascending="False" /></OrderBy></Query></View>`
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
    } else if (workflowname == 'InitiativeSample') {
      ICODE_Stage_Data_Request_WFs.init()
    } else {
      Task_PCODE_Data_Request_WFs.g.handleids();
    }
  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Global variables
  g: {
    Handle_Take_Action: function () {
      if (isschedule) {
        $('body').append('<style>div#s4-titlerow {display: block!important;padding: 6px;}h1#pageTitle span {display: flex;}</style>');
      }
      //  alert(tasktype);
      switch (tasktype) {
        case 'ProjectTask':
          // console.log("ProjectTaskProjectTask with JUMANA")
          $('.container-body').after('<div class="WF-btn"><button data-trans-task onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="btn pop-green Resources" type="button" > "' + stagename + '"</button><button data-trans-projectlbl onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="btn pop-green rejection Resources" type="button"> "' + stagename + '"</button></div>');
          $('div.Container').fadeIn();
          $('div.cust-loader').fadeOut();
          break;
        case 'TriApproval':
          $('.container-body').after('<div class="WF-btn"><div class="apprv"><span class="approveStageName">' + actionbuttonTitle + '</span><button data-trans-accept onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="btn pop-green Resources" type="button" ></button><button data-trans-rejection  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="btn pop-green rejection Resources"  type="button"></button><button data-trans-cancelbutton  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(2,\'Approval\')" class="btn pop-green cancelbutton Resources"  type="button"></button></div></div>');
          $('div.Container').fadeIn();
          $('div.cust-loader').fadeOut();
          forFormSubmitHTMLStatus = setInterval(function () {
            Task_PCODE_Data_Request_WFs.g.hidefields();
          }, 100);
          break;
        case 'Approval':
          $('.container-body').after('<div class="WF-btn"><div class="apprv"><span class="approveStageName">' + actionbuttonTitle + '</span><button data-trans-accept onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="btn pop-green Resources" type="button" ></button><button data-trans-rejection  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="btn pop-green rejection Resources"  type="button"></button></div></div>');
          $('div.Container').fadeIn();
          $('div.cust-loader').fadeOut();
          forFormSubmitHTMLStatus = setInterval(function () {
            Task_PCODE_Data_Request_WFs.g.hidefields();
          }, 100);
          break;
        case 'Submit':
          $('.container-body').append('<div class="WF-btn"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Submit\')"  class="btn pop-green Resources" type="button"><span  class=" beencompletedpadd">' + actionbuttonTitle + '</span></button></div>'); //style="float: left;font-size: 17px;"
          $('div.Container').fadeIn();
          $('div.cust-loader').fadeOut();
          forFormSubmitHTMLStatus = setInterval(function () {
            Task_PCODE_Data_Request_WFs.g.hidefields();
          }, 100);
          break;
        case 'SubmitProject':
          // console.log("SubmitProject")
          $('.container-body').after('<div class="WF-btn"><button onclick="NewProjectTask_Edit_Data.init();"  class="btn pop-green Resources" type="button"><span  class=" beencompletedpadd">' + actionbuttonTitle + '</span></button></div>'); //
          $('div.Container').fadeIn();
          $('div.cust-loader').fadeOut();
          forFormSubmitHTMLStatus = setInterval(function () {
            Task_PCODE_Data_Request_WFs.g.hidefields();
          }, 100);
          break;
        case 'New':
          // $('.DahsFormTitle > button').hide();
          $('.container-body').after('<div class="WF-btn"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'New\')" " class="btn pop-green" type="button"><span  class=" beencompletedpadd">' + actionbuttonTitle + '</span></button></div>'); //style="float: left;font-size: 17px;
          $('div.Container').fadeIn();
          $('div.cust-loader').fadeOut();
          forFormSubmitHTMLStatus = setInterval(function () {
            Task_PCODE_Data_Request_WFs.g.hidefields();
          }, 100);
          break;
        case 'Resubmit':
          // $('.DahsFormTitle > button').hide();
          $('.container-body').after('<div class="WF-btn"><button data-trans-resend onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Submit\')" class="btn pop-green Resources" type="button"></button></div>');
          $('div.Container').fadeIn();
          $('div.cust-loader').fadeOut();
          forFormSubmitHTMLStatus = setInterval(function () {
            Task_PCODE_Data_Request_WFs.g.hidefields();
          }, 100);
          break;

        case 'SubmitField':
          $('.container-body').after('<div class="WF-btn"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'SubmitField\')" class="btn pop-green" type="button"><span  class=" beencompletedpadd">' + actionbuttonTitle + '</span></button></div>');
          if ((currentstage != "S02" && workflowname == 'Project')) {
            $('.CFIELD input,.CFIELD .PPField ,.CFIELD select,.CFIELD textarea').attr("disabled", true);
            $('.CFIELD[data-isWfenablestageID=' + currentstage + '] input,.CFIELD[data-isWfenablestageID=' + currentstage + '] .PPField ,.CFIELD[data-isWfenablestageID=' + currentstage + '] select,.CFIELD[data-isWfenablestageID=' + currentstage + '] textarea').attr("disabled", false);
            $('[type=file]').attr("disabled", false);
          }
          forFormSubmitHTMLStatus = setInterval(function () {
            Task_PCODE_Data_Request_WFs.g.hidefields();
          }, 100);
          break;

        case 'Attach':
          $('.container-body').after('<div class="WF-btn"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Attach\')" class="btn pop-green" type="button"><span  class=" beencompletedpadd">' + actionbuttonTitle + '</span></button></div>');
          if ((currentstage != "S02" && workflowname == 'Project')) {
            $('.CFIELD input,.CFIELD .PPField ,.CFIELD select,.CFIELD textarea').attr("disabled", true);
            $('.CFIELD[data-isWfenablestageID=' + currentstage + '] input,.CFIELD[data-isWfenablestageID=' + currentstage + '] .PPField ,.CFIELD[data-isWfenablestageID=' + currentstage + '] select,.CFIELD[data-isWfenablestageID=' + currentstage + '] textarea').attr("disabled", false);
            $('[type=file]').attr("disabled", false);
          }
          forFormSubmitHTMLStatus = setInterval(function () {
            Task_PCODE_Data_Request_WFs.g.hidefields();
          }, 100);
          break;

        case 'CheckList':
          $('.container-body').after('<div class="WF-btn"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'CheckList\')" class="btn pop-green Resources" type="button"><span  class=" beencompletedpadd">' + actionbuttonTitle + '</span></button></div>');
          forFormSubmitHTMLStatus = setInterval(function () {
            Task_PCODE_Data_Request_WFs.g.hidefields();
          }, 100);
          break;
      }
      dialogBoxHtml = `
          <div id="myModal">
          <div class="modal-dialog">
          <div class="modal-content">
          <button onclick='document.getElementById(&#39;myModal&#39;).style.visibility=&#39;hidden&#39;' aria-hidden="true" id="closex" class="close" data-dismiss="modal" type="button" style="position:absolute;z-index:3">×</button>
          <ul class="nav nav-tabs notesTabs" id="notesTabs" role="tablist">
          </ul>
          <div class="tab-content" id="tasknotes">
          </div>
          </div>
          </div>
          </div>`;
          
      $('.navbar.page-nav.px-5').after(dialogBoxHtml)
      Workflow_Note_Data_Request_WFs.init();
      changeResources();
    },
    handleids: function () {

      if (workflowname == 'Project') {
        curstage_org = Stages_ORG_Data_Request_WFs.g.StagesArray.filter(function (obj) {
          return obj.stage == stageid;
        });

        if (nxtstageidarr) {

          curstage_org_nxt = Stages_ORG_Data_Request_WFs.g.StagesArray.filter((item) => nxtstageidarr.includes(item.stage));
        }
        if (prvstageid != null) {
          curstage_org_prv = Stages_ORG_Data_Request_WFs.g.StagesArray.filter((item) => prvstageidarr.includes(item.stage));
          curstage_prv = ProjectStages_Data_Request_WFs.g.StagesArray.filter(function (obj) {
            return obj.stage == curstage_org_prv[0].stage;
          });
        }
        curstage = ProjectStages_Data_Request_WFs.g.StagesArray.filter(function (obj) {
          return obj.stage == curstage_org[0].stage;
        });
        if (nxtstageidarr) {
          curstage_nxt = ProjectStages_Data_Request_WFs.g.StagesArray.filter(function (obj) {
            return obj.stage == curstage_org_nxt[0].stage;
          });
        }
      } else if (workflowname == 'InitiativeSample') {
        initcurstage_org = Initiative_Stages_ORG_Data_Request_WFs.g.StagesArray.filter(function (obj) {
          return obj.stage == stageid;
        })
        if (nxtstageidarr) {
          initiativecurstage_org_nxt = Initiative_Stages_ORG_Data_Request_WFs.g.StagesArray.filter((item) => nxtstageidarr.includes(item.stage));
        }

        if (prvstageid != null) {
          initcurstage_org_prv = Initiative_Stages_ORG_Data_Request_WFs.g.StagesArray.filter((item) => prvstageidarr.includes(item.stage));
          initcurstage_prv = InitiativeStages_Data_Request_WFs.g.StagesArray.filter(function (obj) {
            return obj.stage == initcurstage_org_prv[0].stage;
          });
        }
        initcurstage = InitiativeStages_Data_Request_WFs.g.StagesArray.filter(function (obj) {
          return obj.stage == initcurstage_org[0].stage;
        });

        if (nxtstageidarr) {
          initcurstage_nxt = InitiativeStages_Data_Request_WFs.g.StagesArray.filter(function (obj) {
            return obj.stage == initiativecurstage_org_nxt[0].stage;
          });
        }

      }

      formakesureishtmlStatus = setInterval(function () {
        Task_PCODE_Data_Request_WFs.g.makesureishtml();
      }, 100);
    },
    hidefields: function () {
      if ($('.IFIELD').length) {
        clearInterval(forFormSubmitHTMLStatus);
        $('.CSformbuttons button').hide();
        $('.IFIELD,.formcontents').hide();
        $('#' + fieldtoedit).closest('.formcontents').show();
        $('#' + fieldtoedit).closest('.IFIELD').show();
        $('body').append('<style>.add-New-Detail{display:none!important}</style>');
        if (tasktype == 'Attach') {
          $('#getFile').parent().hide();
          $('.container-body').append(
            '<div class="py-5 border-bottom section-container WF-Attach" data-groups="">' +
            '<div class="form-row">' +
            '<div class="col-md-4 mb-4"><h3>"' + stagename + '" Attachments</h3><span class="font-14"></span></div>' +
            '<div class="col-md-8 white-box p-4 fieldset-container">' +
            '<div class="col-md-6 CFIELD" data-groups="" >' + //style="display: flex;align-items: center;"
            '<label required for="getFile"  undefined="">Attachments</label>' + //class="custom-file-upload"
            '<input required type="file" multiple="multiple" placeholder="Attachment" class="form-control SPIField" id="getFile" style="display:block">' +
            '</div>' +
            '<div class="col-md-6 CFIELD rfpoptions" data-groups="" >' +
            '<label required for="forattach">Attachment</label>' +
            '</div>' +
            '<div class="add-New-Detail-wrapper"><a class="add-New-Attach" href="javascript:"><i class="fas fa-plus"></i></a></div>' +
            '</div></div></div>'
          );
          $('.add-New-Attach').click(function () {
            $(
              '<div class="col-md-6 CFIELD" data-groups="" >' + //style="display: flex;align-items: center;"
              '<label required for="getFile"  undefined="">Attachments</label>' + //class="custom-file-upload"
              '<input required type="file" multiple="multiple" placeholder="Attachments" class="form-control SPIField" id="getFile" style="display:block">' +
              '</div>' +
              '<div class="col-md-6 CFIELD rfpoptions" data-groups="" style="display:undefined">' +
              '<label required for="forattach">Attachments</label>' +
              '</div>'
            ).insertBefore($(this).parent());
          });
        }
        $('div.Container').fadeIn();
        $('div.cust-loader').fadeOut();
      }
    },
    makesureishtml: function () {
      if ($('.fieldset-container').length) { //|| $('#filterColumn').length || $('h2.PNameTitle').length || $('span.ms-pagetitle').length
        clearInterval(formakesureishtmlStatus);
        Task_PCODE_Data_Request_WFs.g.Handle_Take_Action();
      } else if ($('.navbar.page-nav.px-5').length > 0 && (window.location.href.toLowerCase().indexOf('projectdetails') > -1 || window.location.href.toLowerCase().indexOf('listing.aspx') > -1 || window.location.href.toLowerCase().indexOf('projecthome.aspx') > -1)) {
        clearInterval(formakesureishtmlStatus);
        Task_PCODE_Data_Request_WFs.g.Handle_Take_Action();
      }
    },
    addcomments: function (state, version, withNote = false) {

      stageState = state //  handle WF Notes
      if (workflowname == 'Project') {
        if (version == 'Approval' || version == 'Submit') {
          if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
            $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="if( ($(\'#commenttext\').val() && ' + !state + ') || ' + state + ' ){BulkEdit(' + state + ',' + withNote + ')}else{$(\'.wrapcomments\').append(\'<p >يرجى تعبئة الملاحظات</p>\')}">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
          } else {
            $('body').append('<div class="popupComment"><div class="wrapcomments"><label>Notes</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="if( ($(\'#commenttext\').val() && ' + !state + ') || ' + state + ' ){BulkEdit(' + state + ',' + withNote + ')}else{$(\'.wrapcomments\').append(\'<p>Please Fill Notes</p>\')}">Send</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">Cancel</button><span style="display:none" class="successmsg">Submitted Successfully</span></div></div></div>');
          }
        } else if (version == 'SubmitField') {
          if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
            $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="if( ($(\'#commenttext\').val() && ' + !state + ') || ' + state + ' ){SubmitField_BulkEdit.preinit(' + state + ',' + withNote + ')}else{$(\'.wrapcomments\').append(\'<p >يرجى تعبئة الملاحظات</p>\')}">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
          } else {
            $('body').append('<div class="popupComment"><div class="wrapcomments"><label>Notes</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="if( ($(\'#commenttext\').val() && ' + !state + ') || ' + state + ' ){SubmitField_BulkEdit.preinit(' + state + ',' + withNote + ')}else{$(\'.wrapcomments\').append(\'<p >Fill Comments</p>\')}">Send</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">Cancel</button><span style="display:none" class="successmsg">Send Successfully</span></div></div></div>');
          }
        } else if (version == 'Attach') {
          if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
            $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="if( ($(\'#commenttext\').val()  && ' + !state + ') || ' + state + ' ){WF_UploadFiles.preinit(' + state + ')}else{$(\'.wrapcomments\').append(\'<p >يرجى تعبئة الملاحظات</p>\')}">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
          } else {
            $('body').append('<div class="popupComment"><div class="wrapcomments"><label>Notes</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="if( ($(\'#commenttext\').val() && ' + !state + ') || ' + state + ' ){WF_UploadFiles.preinit(' + state + ')}else{$(\'.wrapcomments\').append(\'<p>Please Fill Notes</p>\')}">Send</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">Cancel</button><span style="display:none" class="successmsg">Submitted Successfully</span></div></div></div>');
          }
        } else if (version == 'CheckList') {
          if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
            $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="if( ($(\'#commenttext\').val() &&  && ' + !state + ') || ' + state + ' ){Edit_File_Details_Submit.init(' + state + ')}else{$(\'.wrapcomments\').append(\'<p >يرجى تعبئة الملاحظات</p>\')}">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
          } else {
            $('body').append('<div class="popupComment"><div class="wrapcomments"><label>Notes</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="if( ($(\'#commenttext\').val() && ' + !state + ') || ' + state + ' ){BulkEdit(' + state + ')}else{$(\'.wrapcomments\').append(\'<p>Please Fill Notes</p>\')}">Send</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">Cancel</button><span style="display:none" class="successmsg">Submitted Successfully</span></div></div></div>');
          }
        }
        // } else if (version == 'New') {
        //     if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
        //         $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="if( ($(\'#commenttext\').val() &&  && ' + !state + ') || ' + state + ' ){WF_New_Data_Submit.init(' + state + ')}else{$(\'.wrapcomments\').append(\'<p >يرجى تعبئة الملاحظات</p>\')}">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
        //     } else {
        //         $('body').append('<div class="popupComment"><div class="wrapcomments"><label>Notes</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="if( ($(\'#commenttext\').val() && ' + !state + ') || ' + state + ' ){BulkEdit(' + state + ')}else{$(\'.wrapcomments\').append(\'<p>Please Fill Notes</p>\')}">Send</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">Cancel</button><span style="display:none" class="successmsg">Submitted Successfully</span></div></div></div>');
        //     }
        // }
      } else if (workflowname == 'Idea') {
        if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
          $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit(' + state + ',' + withNote + ')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
        } else {
          $('body').append('<div class="popupComment"><div class="wrapcomments"><label>Notes</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit(' + state + ',' + withNote + ')">Send</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">Cancel</button><span style="display:none" class="successmsg">Submitted Successfully</span></div></div></div>');
        }
      } else {
        if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
          $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit(' + state + ',' + withNote + ')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
        } else {
          $('body').append('<div class="popupComment"><div class="wrapcomments"><label>Notes</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit(' + state + ',' + withNote + ')">Send</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">Cancel</button><span style="display:none" class="successmsg">Submitted Successfully</span></div></div></div>');
        }
      }
    }
  }
};
//*****5 */

//get ICODE  stage data

var ICODE_Stage_Data_Request_WFs = {
  // The main Initialization function
  onSuccess: function (sender, args) {

    var collListItem = ICODE_Stage_Data_Request_WFs.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();

    while (listItemEnum.moveNext()) { //loop through list items
      var oListItem = listItemEnum.get_current();
      initiativestagename = oListItem.get_item('Stage');
      taskcomments = oListItem.get_item('Comments'); //should add comments column in initiatives
      // taskcomments =""

    }

    InitiativeStages_Data_Request_WFs.init()
  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Initiatives'); //list name
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' + initiativeC + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>'); //caml query
    ICODE_Stage_Data_Request_WFs.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(ICODE_Stage_Data_Request_WFs.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, ICODE_Stage_Data_Request_WFs.onSuccess),
      Function.createDelegate(this, ICODE_Stage_Data_Request_WFs.onError)
    );
  },
  // Global variables
  g: {}
}


var PCODE_Stage_Data_Request_WFs = {
  onSuccess: function (sender, args) {
    var collListItem = PCODE_Stage_Data_Request_WFs.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) { //loop through list items
      var oListItem = listItemEnum.get_current();
      projectstagename = oListItem.get_item('Stage');
      taskcomments = oListItem.get_item('Comments');
    }
    //*****6 */
    ProjectStages_Data_Request_WFs.init();
  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // The main Initialization function
  init: function () {
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
if (window.location.href.toLowerCase().indexOf('&wfs') > -1) {
  // console.log('54321');
  $(document).ready(function () {
    WFuserCalls.get_CurrentUser();
    $('body').append('<style>.cust-loader {position:fixed;margin: 0 auto;top: 50%;right: 50%;width: 77px;height: 77px;}div.Container, .DahsFormTitle > button.CSformSubmit, .DahsFormTitle > button.CSformDelete,.DahsFormTitle > button.CSformEscalate,#btnGroupDrop1, .CSformbuttons{display:none}</style>');
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
      forTasksHTMLStatus = setInterval(function () {
        Task_PCODE_Data_Request_WFs.preinit();
      }, 500);
    });
  });
}
if (isView && isideapage && window.location.href.toLowerCase().indexOf('&wfs') == -1) {
  $(document).ready(function () {
    Disable_Idea_Edit_Button.preinit();
  });
}
//phases-stages
//*****7 */

var InitiativeStages_Data_Request_WFs = {
  onSuccess: function (sender, args) {
    var collListItem = InitiativeStages_Data_Request_WFs.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      InitiativeStages_Data_Request_WFs.g.StagesArray.push({
        stage: oListItem.get_item('StageCode'),
        phase: oListItem.get_item('PhaseCode'),
        stageid: oListItem.get_id(),
        icode: oListItem.get_item('InitiativeCode')
      });
    }

    Initiative_Stages_ORG_Data_Request_WFs.init()
  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // The main Initialization function
  init: function () {

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Initiative Stages');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'InitiativeCode\'/><Value Type="Text">' + initiativeC + '</Value></Eq></Where><OrderBy><FieldRef Name=\'ListSort\' Ascending=\'True\' /></OrderBy></Query></View>');
    InitiativeStages_Data_Request_WFs.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(InitiativeStages_Data_Request_WFs.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, InitiativeStages_Data_Request_WFs.onSuccess),
      Function.createDelegate(this, InitiativeStages_Data_Request_WFs.onError)
    );
  },
  // Global variables
  g: {
    StagesArray: [],
  }
}

var ProjectStages_Data_Request_WFs = {
  onSuccess: function (sender, args) {
    var collListItem = ProjectStages_Data_Request_WFs.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      ProjectStages_Data_Request_WFs.g.StagesArray.push({
        stage: oListItem.get_item('StageCode'),
        phase: oListItem.get_item('PhaseCode'),
        stageid: oListItem.get_id(),
        pcode: oListItem.get_item('ProjectCode')
      });
    }
    Stages_ORG_Data_Request_WFs.init();
  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // The main Initialization function
  init: function () {
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

// to get the stages for initiative
var Initiative_Stages_ORG_Data_Request_WFs = {
  onSuccess: function (sender, args) {
    var collListItem = Initiative_Stages_ORG_Data_Request_WFs.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    Initiative_Stages_ORG_Data_Request_WFs.g.StagesArray = []
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Initiative_Stages_ORG_Data_Request_WFs.g.StagesArray.push({
        phase: oListItem.get_item('RelatedPhase'),
        stage: oListItem.get_item('Title'),
        relatedURL: oListItem.get_item('RelatedURL'),
        stageid: oListItem.get_id(),
      });
    }

    Task_PCODE_Data_Request_WFs.g.handleids();
  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  init: function () {

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('IStages');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Enabled\'/><Value Type=\'Integer\'>1</Value></Eq></Where><OrderBy><FieldRef Name=\'ListSort\' Ascending=\'True\' /></OrderBy></Query></View>');
    Initiative_Stages_ORG_Data_Request_WFs.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Initiative_Stages_ORG_Data_Request_WFs.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Initiative_Stages_ORG_Data_Request_WFs.onSuccess),
      Function.createDelegate(this, Initiative_Stages_ORG_Data_Request_WFs.onError)
    );
  },
  // Global variables
  g: {
    StagesArray: []
  }
}
//
var Stages_ORG_Data_Request_WFs = {
  onSuccess: function (sender, args) {
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
    Task_PCODE_Data_Request_WFs.g.handleids();
  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // The main Initialization function
  init: function (peojectC, type, taskid, nxtstageid, prvstageid, stageid) {
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
window.isWfFirst_Upload = true;

// upload file in wf case

var SubmitField_BulkEdit = {
  preinit: function (state, withNote = false) {
    if (stageid == 'S01' && isWfFirst_Upload) {
      var WF_Fileelements, WF_fileCount;

      $("input[type=file]").each(function (e) {
        WF_fileCount += document.querySelector('#' + $(this).attr('id')).files.length;
      });

      if (WF_fileCount) {
        WF_UploadFiles.preinit(true);
      }
    }
    if (stageid == 'S01') {
      if (($('span.sp-peoplepicker-userSpan').length == 0)) {
        $('#ProjectManager').addClass('is-invalid');
      } else {
        $('#ProjectManager').removeClass('is-invalid');
      }
    }

    if (!state || state == 2) {
      withNote = true;
    }
    var noteBoxVal = '';
    noteBoxVal = document.getElementById('commenttext').value;
    noteBoxVal = noteBoxVal.trim();
    if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
      if (withNote && noteBoxVal == '') { // add RequireMsgBox to show the msg one time 
        if ($('#RequireMsgBox').length == 0) {
          return $('.wrapcomments').append('<p id="RequireMsgBox">يرجى تعبئة الملاحظات</p>')
        } else {
          return false
        }
      }
    } else {
      if (withNote && noteBoxVal == '') {
        if ($('#RequireMsgBox').length == 0) {
          return $('.wrapcomments').append('<p id="RequireMsgBox">Please Fill The Note</p>')
        } else {
          return false
        }
      }
    }
    if (workflowname == 'Project' && tasktype == "SubmitField" && $('.was-validated .form-control:invalid').length == 0 && $('.form-control.is-invalid').length == 0) {
      if (stageid == 'S01') {
        SubmitField_BulkEdit.init(state);
      } else {
        Edit_Data_Submit.preinit();
      }

    } else if (workflowname != 'Project' && tasktype == "SubmitField" && $('.was-validated .form-control:invalid').length == 0) {
      SubmitField_BulkEdit.init(state);
    } else if (workflowname != 'Project' && tasktype != "SubmitField" && $('.was-validated .form-control:invalid').length == 0) {
      SubmitField_BulkEdit.init(state);
    } else {
      if (stageid == 'S01') {
        var $container = $('#s4-workspace'),
          $scrollTo = $('.was-validated .form-control:invalid');
        if ($scrollTo.length == 0) {
          $scrollTo = $('[type=picker][required]');
        }
        $container.animate({
          scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 120
        });
        $('.popupComment').remove();
      }
      $('.pop-buttons').append('<p>Please fill above info</p>');
      $('.popupComment').remove();
    }
  },
  init: function (state) {
    $('h2.DahsFormTitle').append('<div class="cust-loader"></div>  ');
    // $('button.pop-green').attr("disabled", true);
    $('.commentsub').attr("disabled", true);
    var context = SP.ClientContext.get_current();
    var dfd = $.Deferred();
    //Get list from host web
    //debugger;
    var programList = context.get_web().get_lists().getByTitle(bulkeditlist);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(bulkeditquery);
    //Get items by Query
    var progColl = programList.getItems(camlQuery);
    var todayDate = new Date()
    var todayDateFormatter = todayDate.getMonth() + 1 + '/' + todayDate.getDate() + '/' + todayDate.getFullYear()
    //Load item collection
    context.load(progColl);
    context.executeQueryAsync(function () {
      var currentItemArray = [];

      //Check itemcollection count greater than 0
      if (progColl.get_count() > 0) {
        var progEnum = progColl.getEnumerator();
        while (progEnum.moveNext()) {
          var currentItem = progEnum.get_current();
          var progTitle = currentItem.get_item("Title");
          var currentId = currentItem.get_item("ID");
          // var getStage = currentItem.get_item("Stage")

          //Get Item by current ID
          //debugger;
          var items = programList.getItemById(currentId);
          //set
          if (workflowname == 'Project') {
            $('.section-container:not([data-target_list]) .CFIELD> input[type=text], .section-container:not([data-target_list]) .CFIELD> input[type=number],  .section-container:not([data-target_list]) .CFIELD> input[type=float],.section-container:not([data-target_list]) .CFIELD>  input[type=date], .section-container:not([data-target_list]) .CFIELD>  input[type=date],.section-container:not([data-target_list]) .CFIELD> .datetimeinputs input[type=datetime-local], .section-container:not([data-target_list]) .CFIELD> input[type=radio], .section-container:not([data-target_list]) .CFIELD> input[type=checkbox], .section-container:not([data-target_list]) .CFIELD> div[type=picker], .section-container:not([data-target_list]) .CFIELD> select[type=dropdown], .section-container:not([data-target_list]) .CFIELD>  textarea, .section-container:not([data-target_list]) .CFIELD > .multiselect-container').each(function () {
              if ($(this).attr('type') == 'picker') {
                if ($(this).find('span.sp-peoplepicker-userSpan').length) {
                  var id = $(this).attr('INppicker');
                  var ppp = ($('span.sp-peoplepicker-userSpan').attr('sid') == undefined) ? '' : SP.FieldUserValue.fromUser($('span.sp-peoplepicker-userSpan').attr('sid'));
                  items.set_item(id, ppp);
                }
              } else if ($(this).attr('type') == 'date') {
                if ($(this).hasClass('withTime')) {
                  var dateval = $(this).val();
                  var timeval = $(this).closest(".CFIELD").find("#Time").val();
                  var datetime = new Date(dateval);
                  // format the output
                  var month = datetime.getMonth() + 1;
                  var day = datetime.getDate();
                  var year = datetime.getFullYear();
                  var timezoneOffset = datetime.getTimezoneOffset() / 60;
                  var hour = datetime.getHours() + timezoneOffset;
                  if (hour < 10) { hour = "0" + hour; }
                  var min = datetime.getMinutes();
                  if (min < 10) { min = "0" + min; }
                  var sec = datetime.getSeconds();
                  if (sec < 10) { sec = "0" + sec; }

                  var ydate = month + '/' + day + '/' + year + ' ' + hour + ':' + min + ':' + sec;

                  if (dateval && timeval)
                    items.set_item($(this).attr('id'), ydate);
                } else {
                  var dateval = $(this).val().replace('-', '/');
                  var ydate = (!dateval) ? '' : [dateval.slice(5, 10), dateval.slice(0, 4)].join('/').replace('-', '/');
                  if (dateval)
                    items.set_item($(this).attr('id'), ydate);
                }
              } else if ($(this).attr('type') == 'datetime-local') {
                if ($(this).hasClass('withTime')) {
                  var dateval = $(this).val();
                  var datetime = new Date(dateval);

                  // format the output
                  var month = datetime.getMonth() + 1;
                  var day = datetime.getDate();
                  var year = datetime.getFullYear();
                  var timezoneOffset = datetime.getTimezoneOffset() / 60;
                  var hour = datetime.getHours() + timezoneOffset;
                  if (hour < 10) { hour = "0" + hour; }
                  var min = datetime.getMinutes();
                  if (min < 10) { min = "0" + min; }
                  var sec = datetime.getSeconds();
                  if (sec < 10) { sec = "0" + sec; }

                  var ydate = month + '/' + day + '/' + year + ' ' + hour + ':' + min + ':' + sec;

                  if (dateval)
                    items.set_item($(this).attr('id'), ydate);
                }
              } else if ($(this).attr('type') == 'radio') {
                var checkedvalue = $('input[id="' + $(this).attr('id') + '"]:checked').val();
                if (checkedvalue == 'yes') {
                  items.set_item($(this).attr('id'), 'yes');
                } else if (checkedvalue == 'no') {
                  items.set_item($(this).attr('id'), 'no');
                } else
                  items.set_item($(this).attr('id'), checkedvalue);

                if (SP_ListName == 'Deliverables' && checkedvalue == 'yes') {
                  items.set_item("Stage", DVfirstStage);
                }

              } else if ($(this).attr('type') == 'checkbox') {

                var checkedvalue = $('input[id="' + $(this).attr('id') + '"]:checked').length;
                if (checkedvalue)
                  items.set_item($(this).attr('id'), true);
                else
                  items.set_item($(this).attr('id'), false);

              } else if ($(this).attr('type') == 'dropdown') {

                items.set_item($(this).attr('id'), $(this).val());
                var SubmitForApprovalValue;
                if ($(this).attr('id') == "SubmitForApproval") {
                  SubmitForApprovalValue = $(this).val();
                }
                if (SP_ListName == 'Change Request' && SubmitForApprovalValue == 'yes') {
                  items.set_item("Stage", CRfirstStage)
                }
              } else if ($(this).hasClass("percentagefield")) {

                items.set_item($(this).attr('id'), $(this).val() / 100);

              } else if ($(this).attr('type') == 'multiselect') {
                var myselections = [];
                $(this).find("input#Revenue:checked").each(function () {
                  myselections.push($(this).val());
                });
                myselections = myselections.join(':::');
                items.set_item($(this).attr('myfield'), myselections);
              } else
                items.set_item($(this).attr('id'), $(this).val());
            });

          } else if (workflowname == 'Idea') {
            if (state == true || tasktype == 'SubmitProject') {
              $('.section-container:not([data-target_list]) .CFIELD> input[type=text], .section-container:not([data-target_list]) .CFIELD> input[type=number],  .section-container:not([data-target_list]) .CFIELD> input[type=float],.section-container:not([data-target_list]) .CFIELD>  input[type=date], .section-container:not([data-target_list]) .CFIELD>  input[type=date],.section-container:not([data-target_list]) .CFIELD> .datetimeinputs input[type=datetime-local], .section-container:not([data-target_list]) .CFIELD> input[type=radio], .section-container:not([data-target_list]) .CFIELD> input[type=checkbox], .section-container:not([data-target_list]) .CFIELD> div[type=picker], .section-container:not([data-target_list]) .CFIELD> select[type=dropdown], .section-container:not([data-target_list]) .CFIELD>  textarea, .section-container:not([data-target_list]) .CFIELD > .multiselect-container').each(function () {
                if ($(this).attr('type') == 'picker') {
                  if ($(this).find('span.sp-peoplepicker-userSpan').length) {
                    var id = $(this).attr('INppicker');
                    var ppp = ($(this).find('span.sp-peoplepicker-userSpan').attr('sid') == undefined) ? '' : SP.FieldUserValue.fromUser($(this).find('span.sp-peoplepicker-userSpan').attr('sid').split('|').slice(-1)[0]);
                    items.set_item(id, ppp);
                  } else if (($(this).attr('id') == 'ProjectOwner' && listkey == 'projects') || ($(this).attr('id') == 'MitigationOwner' && listkey == 'risks')) {
                    var ppp = SP.FieldUserValue.fromUser(UserN.LoginName.split('|')[1]);
                    items.set_item($(this).attr('id'), ppp);
                  }
                } else if ($(this).attr('type') == 'date') {
                  if ($(this).hasClass('withTime')) {
                    var dateval = $(this).val();
                    var timeval = $(this).closest(".CFIELD").find("#Time").val();
                    var datetime = new Date(dateval);
                    // format the output
                    var month = datetime.getMonth() + 1;
                    var day = datetime.getDate();
                    var year = datetime.getFullYear();
                    var timezoneOffset = datetime.getTimezoneOffset() / 60;
                    var hour = datetime.getHours() + timezoneOffset;
                    if (hour < 10) { hour = "0" + hour; }
                    var min = datetime.getMinutes();
                    if (min < 10) { min = "0" + min; }
                    var sec = datetime.getSeconds();
                    if (sec < 10) { sec = "0" + sec; }

                    var ydate = month + '/' + day + '/' + year + ' ' + hour + ':' + min + ':' + sec;

                    if (dateval && timeval)
                      items.set_item($(this).attr('id'), ydate);
                  } else {
                    var dateval = $(this).val().replace('-', '/');
                    var ydate = (!dateval) ? '' : [dateval.slice(5, 10), dateval.slice(0, 4)].join('/').replace('-', '/');
                    if (dateval)
                      items.set_item($(this).attr('id'), ydate);
                  }
                } else if ($(this).attr('type') == 'datetime-local') {
                  if ($(this).hasClass('withTime')) {
                    var dateval = $(this).val();
                    var datetime = new Date(dateval);

                    // format the output
                    var month = datetime.getMonth() + 1;
                    var day = datetime.getDate();
                    var year = datetime.getFullYear();
                    var timezoneOffset = datetime.getTimezoneOffset() / 60;
                    var hour = datetime.getHours() + timezoneOffset;
                    if (hour < 10) { hour = "0" + hour; }
                    var min = datetime.getMinutes();
                    if (min < 10) { min = "0" + min; }
                    var sec = datetime.getSeconds();
                    if (sec < 10) { sec = "0" + sec; }

                    var ydate = month + '/' + day + '/' + year + ' ' + hour + ':' + min + ':' + sec;

                    if (dateval)
                      items.set_item($(this).attr('id'), ydate);
                  }
                } else if ($(this).attr('type') == 'radio') {
                  var checkedvalue = $('input[id="' + $(this).attr('id') + '"]:checked').val();
                  if (checkedvalue == 'yes') {
                    items.set_item($(this).attr('id'), 'yes');
                  } else if (checkedvalue == 'no') {
                    items.set_item($(this).attr('id'), 'no');
                  } else
                    items.set_item($(this).attr('id'), checkedvalue);

                  if (SP_ListName == 'Deliverables' && checkedvalue == 'yes') {
                    items.set_item("Stage", DVfirstStage);
                  }

                } else if ($(this).attr('type') == 'checkbox') {

                  var checkedvalue = $('input[id="' + $(this).attr('id') + '"]:checked').length;
                  if (checkedvalue)
                    items.set_item($(this).attr('id'), true);
                  else
                    items.set_item($(this).attr('id'), false);

                } else if ($(this).attr('type') == 'dropdown') {

                  items.set_item($(this).attr('id'), $(this).val());
                  var SubmitForApprovalValue;
                  if ($(this).attr('id') == "SubmitForApproval") {
                    SubmitForApprovalValue = $(this).val();
                  }
                  if (SP_ListName == 'Change Request' && SubmitForApprovalValue == 'yes') {
                    items.set_item("Stage", CRfirstStage)
                  }
                } else if ($(this).hasClass("percentagefield")) {

                  items.set_item($(this).attr('id'), $(this).val() / 100);

                } else if ($(this).attr('type') == 'multiselect') {
                  var myselections = [];
                  $(this).find("input#Revenue:checked").each(function () {
                    myselections.push($(this).val());
                  });
                  myselections = myselections.join(':::');
                  items.set_item($(this).attr('myfield'), myselections);
                } else
                  items.set_item($(this).attr('id'), $(this).val());
              });
              items.set_item('Stage', nxtstageid);
              items.set_item("Status", 'inprogress');
            } else if (state == 2) {
              items.set_item('Stage', cancelstageid);
              items.set_item("Status", 'cancelled');
            } else {
              items.set_item('Stage', prvstageid);
              items.set_item("Status", 'ideaRejected');
            }
          } else if (workflowname == 'CR') {
            if (state)
              items.set_item('Stage', nxtstageid);
            else {
              // items.set_item('Stage', prvstageid);
              items.set_item('Stage', prvstageid);
              items.set_item('SubmitForApproval', 'no')
            }
          } else if (workflowname == 'DV') {
            if (state)
              items.set_item('Stage', nxtstageid);
            else {
              items.set_item('Stage', prvstageid);
              items.set_item('Delivered', 'no')
            }
          } else {
            if (state)
              items.set_item('Stage', nxtstageid);
            else
              items.set_item('Stage', prvstageid);
          }
          //Update the item
          items.update();
          //Push item on the array
          currentItemArray.push(items);
          //Load the item Array
          context.load(currentItemArray[currentItemArray.length - 1]);
        }
        context.executeQueryAsync(function () {
          //Item Updated sucess
          // console.log("Items are updated Successfully");
          dfd.resolve();
          //debugger;
          if (workflowname == 'Project')
            BulkEdit(state);
          else if (workflowname == 'Idea') {
            Task_Edit_Data.init();
          } else if (workflowname == "InitiativeSample") {
            InitiativeBulkEdit(state)
          } else {
            Task_Edit_Data.init();
          }
        }, function (sender, args) {
          //Item updated fail
          console.log("Request Failed to get  Items :" + args.get_message());
        });
      } else {
        dfd.resolve();
      }
    },
      function (sender, args) {
        $('.loader').hide();
        console.log("Request failed in  List " + args.get_message());
      });
    return dfd.promise();
  }
}

//checklist
var Edit_File_Details_Submit = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var CurrList, oList, itemID;
    $('[file-title="طلب عرض شراء"]').each(function () {
      oList = clientContext.get_web().get_lists().getByTitle(ListArray[2].documents);
      itemID = $(this).attr('file-id');
      Edit_File_Details_Submit.g.oListItem = oList.getItemById(itemID);
      $('[type="checkbox"][id^=Check]').each(function () {
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
      Function.createDelegate(this, function () {
        BulkEdit(true);
      }),
      Function.createDelegate(this, function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
      })
    );
  },
  g: {}
}
//new items
// var WF_New_Data_Submit = {
//     preinit: function() {
//         $('.errormsg').remove();
//         $('.container-body').addClass('was-validated');
//         var pickervalid = true; //check required people picker
//         $('[type=picker][required]').each(function() {
//             if ($(this).find('span.sp-peoplepicker-userSpan').length == 0) {
//                 pickervalid = false;
//                 $(this).addClass('picker-error');
//                 $(this).removeClass('picker-valid');
//                 // return false;
//             } else {
//                 $(this).removeClass('picker-error');
//                 $(this).addClass('picker-valid');
//             }
//         });
//         if ($('.was-validated .form-control:invalid').length == 0 && pickervalid) {
//             WF_New_Data_Submit.init();
//         } else {
//             $('.CSformbuttons').prepend('<p class="errormsg">Please check info above</p>')
//                 // console.log('check form for errors');
//             var $container = $('#s4-workspace'),
//                 $scrollTo = $('.was-validated .form-control:invalid');
//             if ($scrollTo.length == 0) {
//                 $scrollTo = $('[type=picker][required]');
//             }
//             $container.animate({
//                 scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 120
//             });
//         }
//     },
//     init: function() {
//         // $('.loading-wait').show();
//         // $('.errormsg').hide();
//         // if( !$('.loading-wait').length )
//         // $('div.CSformbuttons').prepend('<div class="loading-wait">  Please Wait... <div class="cust-loader"></div></div>');
//         $('.btn-save').attr("disabled", true);
//         var clientContext = new SP.ClientContext.get_current();
//         var oList = clientContext.get_web().get_lists().getByTitle(SP_ListName);
//         var itemCreateInfo = new SP.ListItemCreationInformation();
//         WF_New_Data_Submit.g.oListItem = oList.addItem(itemCreateInfo);
//         $('.section-container:not([data-target_list]) .CFIELD> input[type=text], .section-container:not([data-target_list]) .CFIELD> input[type=number], .section-container:not([data-target_list]) .CFIELD>  input[type=date], .section-container:not([data-target_list]) .CFIELD> input[type=radio], .section-container:not([data-target_list]) .CFIELD> input[type=checkbox], .section-container:not([data-target_list]) .CFIELD> div[type=picker], .section-container:not([data-target_list]) .CFIELD> select[type=dropdown], .section-container:not([data-target_list]) .CFIELD>  textarea, .section-container:not([data-target_list]) .CFIELD > .multiselect-container').each(function() {
//             if ($(this).attr('type') == 'picker') {
//                 if ($(this).find('span.sp-peoplepicker-userSpan').length) {
//                     var id = $(this).attr('INppicker');
//                     var ppp = ($(this).find('span.sp-peoplepicker-userSpan').attr('sid') == undefined) ? '' : SP.FieldUserValue.fromUser($(this).find('span.sp-peoplepicker-userSpan').attr('sid').split('|').slice(-1)[0]);
//                     WF_New_Data_Submit.g.oListItem.set_item(id, ppp);
//                 } else if (($(this).attr('id') == 'ProjectOwner' && listkey == 'projects') || ($(this).attr('id') == 'MitigationOwner' && listkey == 'risks')) {
//                     var ppp = SP.FieldUserValue.fromUser(UserN.LoginName.split('|')[1]);
//                     WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), ppp);
//                 }
//             } else if ($(this).attr('type') == 'date') {
//                 var dateval = $(this).val().replace('-', '/');
//                 var ydate = (!dateval) ? '' : [dateval.slice(5, 10), dateval.slice(0, 4)].join('/').replace('-', '/');
//                 if (dateval)
//                     WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), ydate);
//             } else if ($(this).attr('type') == 'radio') {
//                 var checkedvalue = $('input[id="' + $(this).attr('id') + '"]:checked').val();
//                 if (checkedvalue == 'yes') {
//                     WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), 'yes');
//                 } else if (checkedvalue == 'no') {
//                     WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), 'no');
//                 } else
//                     WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), checkedvalue);
//             } else if ($(this).attr('type') == 'checkbox') {
//                 //debugger;
//                 var checkedvalue = $('input[id="' + $(this).attr('id') + '"]:checked').length;
//                 if (checkedvalue)
//                     WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), true);
//                 else
//                     WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), false);
//             } else if ($(this).attr('type') == 'dropdown') {
//                 WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), $(this).val());
//             } else if ($(this).hasClass("percentagefield")) {
//                 WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), $(this).val() / 100);
//             } else if ($(this).attr('type') == 'multiselect') {
//                 var myselections = [];
//                 $(this).find("input#Revenue:checked").each(function() {
//                     myselections.push($(this).val());
//                 });
//                 myselections = myselections.join(':::');
//                 WF_New_Data_Submit.g.oListItem.set_item($(this).attr('myfield'), myselections);
//             } else
//                 WF_New_Data_Submit.g.oListItem.set_item($(this).attr('id'), $(this).val());
//         });
//         // console.log('PCODE', PCODE);
//         if (PCODE && listkey != 'projects') {
//             WF_New_Data_Submit.g.oListItem.set_item("ProjectCode", PCODE);
//             if (listkey == 'issues') {
//                 WF_New_Data_Submit.g.oListItem.set_item("ResolutionStatus", 'New');
//             }
//             // WF_New_Data_Submit.g.oListItem.set_item("MasterKey", PCODE);
//             // WF_New_Data_Submit.g.oListItem.set_item("MasterID", PCODE);
//         }
//         if (listkey == 'projects') {
//             // PCODE = $('input#Title').val();
//             // WF_New_Data_Submit.g.oListItem.set_item("Title", PCODE);
//             //debugger;
//             WF_New_Data_Submit.g.oListItem.set_item("Phase", Phases_Data_Request.g.PhasesArray[0].phase);
//             WF_New_Data_Submit.g.oListItem.set_item("Stage", Stages_Data_Request.g.StagesArray[0].stage);
//         }
//         WF_New_Data_Submit.g.oListItem.update();
//         clientContext.load(WF_New_Data_Submit.g.oListItem);
//         clientContext.executeQueryAsync(
//             Function.createDelegate(this, function() {
//                 window.WF_IID = WF_New_Data_Submit.g.oListItem.get_id();
//                 WF_Set_Code_Submit.init();
//             }),
//             Function.createDelegate(this, function(sender, args) {
//                 var errormessage = 'Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()
//                 if (errormessage.indexOf('duplicate values') > -1) {
//                     $('.CSformbuttons button').attr("disabled", false);
//                     $('.CSformbuttons').prepend('<p class="errormsg">Please choose another value for Project Code since it is already used</p>');
//                     $('.loading-wait').hide();
//                 }
//                 console.log(errormessage);
//             })
//         );
//     },
//     g: {
//         clickbait: function() {
//             $('button.btn-save').on("click", function() {
//                 WF_New_Data_Submit.preinit();
//             })
//         },
//         Cancel: function() {
//             $('button.btn-cancel').on("click", function() {
//                 // window.history.back();
//                 window.location = '/SitePages/Listing.aspx?ListKey=' + listkey + PCODE_STRING; //_spPageContextInfo.webServerRelativeUrl+
//             })
//         },
//         checkNewMasterDetails: function() {
//             if ($('.Details-Item.NewItem').length > 0 || $('.Details-Item.EditItem').length > 0) //calling new master submit
//             {
//                 New_Master_Details_Submit.init();
//             } else {
//                 // console.log('successful');
//                 $('.errormsg').hide();
//                 $('.successmsg').show();
//                 $('.btn-save').addClass("success");

//                 window.location = _spPageContextInfo.webServerRelativeUrl + '/SitePages/Listing.aspx?ListKey=' + listkey + PCODE_STRING;
//             }
//         }
//     }
// };
var WF_Set_Code_Submit = {
  init: function () {
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
    //debugger;
    WF_Set_Code_Submit.g.oListItem.update();
    clientContext.load(WF_Set_Code_Submit.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
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
      Function.createDelegate(this, function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
      })
    );
  },
  g: {}
};
//

//for initiative workflow 
//phase-stage update

window.InitiativeBulkEdit = function (state, withNote = false) {
  var noteBoxVal = '';
  noteBoxVal = document.getElementById('commenttext').value;
  noteBoxVal = noteBoxVal.trim();
  if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
    if (withNote && noteBoxVal == '') {
      return $('.wrapcomments').append('<p>يرجى تعبئة الملاحظات</p>')
    }
  } else {
    if (withNote && noteBoxVal == '') {
      return $('.wrapcomments').append('<p>Please Fill The Note</p>')
    }
  }
  $('h2.DahsFormTitle,h2.PNameTitle').append('<div class="cust-loader"></div>  ');
  $('.commentsub').attr("disabled", true);
  var context = SP.ClientContext.get_current();
  var dfd = $.Deferred();
  //Get list from host web

  var initiativeList = context.get_web().get_lists().getByTitle('Initiative Stages');
  var camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml('<View><Query><Where><And><Eq><FieldRef Name="InitiativeCode" /><Value Type="Text">' + initiativeC + '</Value></Eq><Eq><FieldRef Name="StageCode" /><Value Type="Text">' + stageid + '</Value></Eq></And></Where></Query><RowLimit>1</RowLimit></View>');
  //Get items by Query
  var initColl = initiativeList.getItems(camlQuery);
  //Load item collection
  context.load(initColl);
  context.executeQueryAsync(function () {
    var currentItemArray = [];
    //Check itemcollection count greater than 0
    if (initColl.get_count() > 0) {
      var initEnum = initColl.getEnumerator();
      while (initEnum.moveNext()) {
        var currentItem = initEnum.get_current();
        var initTitle = currentItem.get_item("Title");
        var currentId = currentItem.get_item("ID");
        //Get Item by current ID
        var items = initiativeList.getItemById(currentId);
        items.set_item("Comments", $('textarea#commenttext').val());
        //Get Phase from Project Stages to Update it in Project list
        if (initcurstage_nxt[0] && state) {
          nextphaseName = initcurstage_nxt[0].phase;
          if (nextphaseName == currentItem.get_item("PhaseCode")) {
            curphaseName = currentItem.get_item("PhaseCode");
          }
          else {
            curphaseName = nextphaseName;
          }
        } else {
          curphaseName = currentItem.get_item("PhaseCode");
        }

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

      context.executeQueryAsync(function () {
        //Item Updated sucess
        console.log("Initiative Stages are updated Successfully");
        debugger
        //before update program bulk edit
        // Task_Edit_Data.init();
        dfd.resolve();

        initiative_program_BulkEdit(state)
        // program_BulkEdit(state)
      }, function (sender, args) {
        //Item updated fail
        console.log("Request Failed to get initiativelist Items :" + args.get_message());
      });

    } else {
      dfd.resolve();
    }
  },
    function (sender, args) {
      $('.loader').hide();
      console.log("Request failed in List " + args.get_message());
    })
  return dfd.promise();
}

function initiative_program_BulkEdit(state) {

  var context = SP.ClientContext.get_current();
  var dfd = $.Deferred();
  //Get list from host web
  var initiativeList = context.get_web().get_lists().getByTitle('Initiatives');
  var camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name=\'Title\'/><Value Type=\'Text\'>" + initiativeC + "</Value></Eq></Where></Query></View>");
  //Get items by Query
  var initColl = initiativeList.getItems(camlQuery);
  //Load item collection
  context.load(initColl);
  context.executeQueryAsync(function () {
    var currentItemArray = [];
    if (initColl.get_count() > 0) {
      var initEnum = initColl.getEnumerator();
      while (initEnum.moveNext()) {
        var currentItem = initEnum.get_current();
        var initTitle = currentItem.get_item("Title");
        var currentId = currentItem.get_item("ID");
        var initstage = currentItem.get_item("Stage");
        var ismultistage = initstage.indexOf(';') > -1;

        var items = initiativeList.getItemById(currentId);
        items.set_item("Phase", curphaseName);
        if (!ismultistage) // 1 active stage
        {
          if (state) {
            items.set_item("Stage", nxtstageid);
            if (initstage == 'S42') {
              items.set_item("Status", 'completed1');
            }
          } else if (!state) {
            items.set_item("Stage", prvstageid);
          }

        } else {
          initstage = initstage.split(';');
          initstage.forEach(function (x, i, a) { // (value, index, array)
            if (state) {
              if (x == stageid) // == stage from active task
              {
                a[i] = nxtstageid;
              }
            } else if (!state) {
              if (x == stageid) // == stage from active task
              {
                a[i] = prvstageid;
              }
            }
          });
          var sameVals = initstage.every((val, i, arr) => val === arr[0]); //check if same stage values
          if (sameVals) {
            items.set_item("Stage", initstage[0].replaceAll('__', '')); // remove __ if same values
          } else {
            items.set_item("Stage", initstage.join(';')); // set multiple stages value
          }
        }

        items.set_item("Comments", $('textarea#commenttext').val());
        //Update the item
        items.update();
        //Push item on the array
        currentItemArray.push(items);
        //Load the item Array
        context.load(currentItemArray[currentItemArray.length - 1]);

        if (!state) {
          UpdateInitiativeStages(prvstageid)
        }
      }
      context.executeQueryAsync(function () {
        dfd.resolve();
        if (state) {
          Task_Edit_Data.init();
        }
      })

    }
  })
}

//for project workflow
//phases-stages update
window.BulkEdit = function (state, withNote = false) {
  var noteBoxVal = '';
  noteBoxVal = document.getElementById('commenttext').value;
  noteBoxVal = noteBoxVal.trim();
  if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
    if (withNote && noteBoxVal == '') {
      return $('.wrapcomments').append('<p>يرجى تعبئة الملاحظات</p>')
    }
  } else {
    if (withNote && noteBoxVal == '') {
      return $('.wrapcomments').append('<p>Please Fill The Note</p>')
    }
  }
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
  context.executeQueryAsync(function () {
    var currentItemArray = [];
    //Check itemcollection count greater than 0
    if (progColl.get_count() > 0) {
      var progEnum = progColl.getEnumerator();
      while (progEnum.moveNext()) {
        var currentItem = progEnum.get_current();
        var progTitle = currentItem.get_item("Title");
        var currentId = currentItem.get_item("ID");
        //Get Item by current ID
        var items = programList.getItemById(currentId);
        items.set_item("Comments", $('textarea#commenttext').val());
        //Get Phase from Project Stages to Update it in Project list
        if (curstage_nxt[0] && state) {

          nextphaseName = curstage_nxt[0].phase;
          if (nextphaseName == currentItem.get_item("PhaseCode")) {
            curphaseName = currentItem.get_item("PhaseCode");
          }
          else {
            curphaseName = nextphaseName;
          }
        } else {
          curphaseName = currentItem.get_item("PhaseCode");
        }
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
      context.executeQueryAsync(function () {
        //Item Updated sucess
        console.log("Project Stages are updated Successfully");
        dfd.resolve();
        program_BulkEdit(state)
      }, function (sender, args) {
        //Item updated fail
        console.log("Request Failed to get projectlist Items :" + args.get_message());
      });
    } else {
      dfd.resolve();
    }
  },
    function (sender, args) {
      $('.loader').hide();
      console.log("Request failed in List " + args.get_message());
    });
  return dfd.promise();
}
//end phases-stages update
function program_BulkEdit(state) {

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
  context.executeQueryAsync(function () {
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
        ProjectOwnerPicker = currentItem.get_item("ProjectOwner") ? currentItem.get_item("ProjectOwner") : ''
        ProjectSponsorPicker = currentItem.get_item("ProjectSponsor") ? currentItem.get_item("ProjectSponsor") : ''
        projectManagerPicker = currentItem.get_item("ProjectManager") ? currentItem.get_item("ProjectManager") : '' //added by oday
        projectGuid = currentItem.get_item("ProjectGUID") ? currentItem.get_item("ProjectGUID") : ''

        //Get Item by current ID
        var items = programList.getItemById(currentId);
        //set
        items.set_item("Phase", curphaseName);
        if (!ismultistage) // 1 active stage
        {
          if (state) {
            items.set_item("Stage", nxtstageid);
            if (prjstage == 'S42') {
              items.set_item("Status", 'completed1');
            }
          } else if (!state) {
            items.set_item("Stage", prvstageid);
          }

        } else // multiple active stages
        {
          prjstage = prjstage.split(';');
          prjstage.forEach(function (x, i, a) { // (value, index, array)
            if (state) {
              if (x == stageid) // == stage from active task
              {
                a[i] = nxtstageid;
              }
            } else if (!state) {
              if (x == stageid) // == stage from active task
              {
                a[i] = prvstageid;
              }
            }
          });
          var sameVals = prjstage.every((val, i, arr) => val === arr[0]); //check if same stage values
          if (sameVals) {
            items.set_item("Stage", prjstage[0].replaceAll('__', '')); // remove __ if same values
          } else {
            items.set_item("Stage", prjstage.join(';')); // set multiple stages value
          }
        }
        items.set_item("Comments", $('textarea#commenttext').val());
        //Update the item
        items.update();
        //Push item on the array
        currentItemArray.push(items);
        //Load the item Array
        context.load(currentItemArray[currentItemArray.length - 1]);
        if (!state) {
          UpdateProjectStages(prvstageid);
        }
      }
      context.executeQueryAsync(function () {
        //Item Updated sucess
        ProjectOwnerPicker = ProjectOwnerPicker ? ProjectOwnerPicker.get_lookupValue() : ''
        ProjectSponsorPicker = ProjectSponsorPicker ? ProjectSponsorPicker.get_lookupValue() : '';

        // if (ProjectOwnerPicker) {
        // 	buildTeamResourcesArr.push(ProjectOwnerPicker)
        // }
        // if (ProjectSponsorPicker) {
        // 	buildTeamResourcesArr.push(ProjectSponsorPicker)
        // }
        // console.log("Items are updated Successfully");
        dfd.resolve();
        if (state) {
          if (stageid == 'S01') { // added by oday to handle the projectManager in server
            // $('.popupComment').remove()
            // $('#preloader,#formloader').css('display', 'block');
            WFuserCalls.get_AllResources();
            PNAME = peojectC
          } else {
            Task_Edit_Data.init();
          }
        }
      }, function (sender, args) {
        //Item updated fail
        console.log("Request Failed to get projectlist Items :" + args.get_message());
      });
    } else {
      dfd.resolve();
    }
  },
    function (sender, args) {
      $('.loader').hide();
      console.log("Request failed in projectlist List " + args.get_message());
    });
  return dfd.promise();
}

//*****************Edit decision in initiative stages when we reject

function UpdateInitiativeStages(prvstageid) {
  var context = SP.ClientContext.get_current();
  var dfd = $.Deferred();
  //Get list from host web
  var initiativeList = context.get_web().get_lists().getByTitle('Initiative Stages');
  var camlQuery = new SP.CamlQuery();
  var previousStageId = prvstageid.split(';');
  if (previousStageId.length == "1") {
    camlQuery.set_viewXml("<View><Query><Where><And><Eq><FieldRef Name=\'InitiativeCode\'/><Value Type=\'Text\'>" + initiativeC + "</Value></Eq><Eq><FieldRef Name=\'StageCode\'/><Value Type=\'Text\'>" + previousStageId + "</Value></Eq></And></Where></Query></View>");
  } else {
    Query = '<View><Query><Where><And><Eq><FieldRef Name=\'InitiativeCode\'/><Value Type=\'Text\'>' + initiativeC + '</Value></Eq><Neq><FieldRef Name=\'StageCode\'/><Value Type=\'Text\'>InStage01</Value></Neq></And></Where></Query></View>';
    camlQuery.set_viewXml(Query);
  }

  var initColl = initiativeList.getItems(camlQuery);
  //Load item collection
  context.load(initColl);
  context.executeQueryAsync(function () {
    var currentItemArray = [];
    //Check itemcollection count greater than 0
    var count = 0
    if (initColl.get_count() > 0) {
      var initEnum = initColl.getEnumerator();
      while (initEnum.moveNext()) {
        var currentItem = initEnum.get_current();
        var currentId = currentItem.get_item('ID');
        var items = initiativeList.getItemById(currentId);
        items.set_item("Decision", false)
        items.update()
        currentItemArray.push(items)
        context.load(currentItemArray[currentItemArray.length - 1]);

      }
      context.executeQueryAsync(function () {
        //Item Updated sucess
        // console.log("Items are updated Successfully");
        dfd.resolve();
        Task_Edit_Data.init();
      }, function (sender, args) {
        //Item updated fail
        console.log("Request Failed to get initiativelist Items :" + args.get_message());
      });
    } else {
      dfd.resolve();
    }
  }, function (sender, args) {
    $('.loader').hide();
    console.log("Request failed in initiativelist List " + args.get_message());
  })
  return dfd.promise();
}


/******************Edit decision in project stages when we reject  */
function UpdateProjectStages(prvstageid) {
  var disableDecision = false
  var context = SP.ClientContext.get_current();
  var dfd = $.Deferred();
  //Get list from host web
  var programList = context.get_web().get_lists().getByTitle('Project Stages');
  var camlQuery = new SP.CamlQuery();
  var previousStageId = prvstageid.split(';');
  if (previousStageId.length == "1") {
    camlQuery.set_viewXml("<View><Query><Where><And><Eq><FieldRef Name=\'ProjectCode\'/><Value Type=\'Text\'>" + peojectC + "</Value></Eq><Eq><FieldRef Name=\'StageCode\'/><Value Type=\'Text\'>" + previousStageId + "</Value></Eq></And></Where></Query></View>");
  } else {
    // Query = '<View><Query><Where><And><Eq><FieldRef Name=\'ProjectCode\'/><Value Type=\'Text\'>' + peojectC + '</Value></Eq><In><FieldRef Name=\'StageCode\' /><Values>';
    // previousStageId.forEach(function(stage) {
    //     Query += '<Value Type=\'Text\'>' + stage + '</Value>';
    // });
    // Query += '</Values></In></And></Where></Query></View>';
    // camlQuery.set_viewXml(Query);
    Query = '<View><Query><Where><And><Eq><FieldRef Name=\'ProjectCode\'/><Value Type=\'Text\'>' + peojectC + '</Value></Eq><Neq><FieldRef Name=\'StageCode\'/><Value Type=\'Text\'>S01</Value></Neq></And></Where></Query></View>';
    camlQuery.set_viewXml(Query);
  }

  //Get items by Query
  var progColl = programList.getItems(camlQuery);
  //Load item collection
  context.load(progColl);
  context.executeQueryAsync(function () {
    var currentItemArray = [];
    //Check itemcollection count greater than 0
    var count = 0
    if (progColl.get_count() > 0) {
      var progEnum = progColl.getEnumerator();
      while (progEnum.moveNext()) {
        var currentItem = progEnum.get_current();
        var currentId = currentItem.get_item('ID');
        var items = programList.getItemById(currentId);
        items.set_item("Decision", false)
        items.update()
        currentItemArray.push(items)
        context.load(currentItemArray[currentItemArray.length - 1]);
      }
      context.executeQueryAsync(function () {
        //Item Updated sucess
        // console.log("Items are updated Successfully");
        dfd.resolve();
        Task_Edit_Data.init();
      }, function (sender, args) {
        //Item updated fail
        console.log("Request Failed to get projectlist Items :" + args.get_message());
      });
    } else {
      dfd.resolve();
    }
  },
    function (sender, args) {
      $('.loader').hide();
      console.log("Request failed in projectlist List " + args.get_message());
    });
  return dfd.promise();
}
//*****edit task list that the task not available now */
var Task_Edit_Data = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Tasks');
    Task_Edit_Data.g.oListItem = oList.getItemById(taskid); //declared inside object scope only
    var stageAction = ''; //added by oday to handle WF Notes
    if (tasktype != 'Approval' && tasktype != 'TriApproval') {
      stageAction = 'submit'
    } else if (tasktype == 'Approval' || tasktype == 'TriApproval') {
      if (stageState == true) {
        stageAction = 'approve'
      } else if (stageState == 2) {
        stageAction = 'cancel'
      } else {
        stageAction = 'reject'
      }
    }
    Task_Edit_Data.g.oListItem.set_item('Status', 'Closed');
    Task_Edit_Data.g.oListItem.set_item('WFInstanceID', null);
    Task_Edit_Data.g.oListItem.set_item('Body', $('textarea#commenttext').val());
    Task_Edit_Data.g.oListItem.set_item('TakenAction', stageAction)
    Task_Edit_Data.g.oListItem.update();
    clientContext.load(Task_Edit_Data.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        // console.log('successful');
        $('.errormsg').hide();

        if (isChangeRequestPage) {
          window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=changerequest'
        }
        if (isDeliverablesPage) {
          window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=deliverables'
        }
        if (isRiskPage) {
          window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=risks'
        }
        if (isIssuePage) {
          window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=issues'
        }
        if (isMomPage) {
          window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=mom'
        }
        // if (isInitiativeSample) {
        //   window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=initiatives'
        // }
        if (isTasksPage) {
          window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=SMOTasks'
        }
        if (isideapage) {
          window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=ideas';
        } else if (isRelatedProjectPage) {
          window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/ProjectHome.aspx?PCODE=' + peojectC;
        } else if (isProjectPage) {
          window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/ProjectHome.aspx?PCODE=' + peojectC;
        } else if (isInitiativeSample) {
          window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/initiativeHome.aspx?ICODE=' + initiativeC;
        } else {
          window.location = _spPageContextInfo.siteAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=' + listkey;
        }
      }),
      Function.createDelegate(this, function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
      })
    );
  },
  g: {}
};
///////////////////////// workflow note
var Workflow_Note_Data_Request_WFs = {
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($('.DahsFormTitle').length || $('.PNameTitle').text() || $('#Ribbon\\.Tabs\\.PDP\\.Home-title').length) {

      clearInterval(forTasksHTMLStatus);
      $('div.Container').after('<div class="cust-loader"></div>');
      SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () { });
    }
    //*****channnnges */
    clearInterval(forTasksHTMLStatus);
    $('div.Container').after('<div class="cust-loader"></div>');
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
      Workflow_Note_Data_Request_WFs.init();

    });
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Tasks'); //list name
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(noteQuery); //caml query
    Workflow_Note_Data_Request_WFs.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Workflow_Note_Data_Request_WFs.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Workflow_Note_Data_Request_WFs.onSuccess),
      Function.createDelegate(this, Workflow_Note_Data_Request_WFs.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Workflow_Note_Data_Request_WFs.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var count = 0
    var taskNoteID = ''
    var taskDescription = ''
    var takenAction = ''
    var tasksNoteArr = []
    var modifiedNoteBy;
    var modifiedNoteDate;
    var noteHtml = "";
    var tabhead = "";
    var tabcontent = "";
    while (listItemEnum.moveNext()) { //loop through list items
      var oListItem = listItemEnum.get_current();
      count++
      taskNoteID = oListItem.get_id();
      takenAction = oListItem.get_item('TakenAction');
      taskDescription = oListItem.get_item('Body');
      modifiedNoteBy = oListItem.get_item('AssignedTo') ? oListItem.get_item('AssignedTo')[0].get_lookupValue() : No_Data;
      modifiedNoteDate = oListItem.get_item('Modified') || No_Data;
      tasksNoteArr.push({
        taskid: taskNoteID,
        description: taskDescription,
        action: takenAction,
        modifiedby: modifiedNoteBy,
        modifiedDate: modifiedNoteDate
      })
    }

    var imgSource = '' + _spPageContextInfo.webAbsoluteUrl + '/style%20library/spm/images/icon-flag.png';
    if (tasksNoteArr.length > 0) {
      $('#myModal').css('display', 'flex');
      for (var i = 0; i < tasksNoteArr.length; i++) {
        if (i == 0) {
          tabhead += '<li class="nav-item"><a  class="nav-link notetab active" id="firsttab" data-toggle="tab" href="#note' + i + '" role="tab" aria-controls="note' + i + '" aria-selected="true"><span data-trans-comment class="Resources"></span><span class="tabnb">' + (i + 1) + '</span></a></li>';
        } else {
          tabhead += '<li class="nav-item"><a class="nav-link notetab' + i + '" id="firsttab" data-toggle="tab" href="#note' + i + '" role="tab" aria-controls="note' + i + '" aria-selected="true"><span data-trans-comment class="Resources"></span><span class="tabnb">' + (i + 1) + '</span></a></li>';
        }
        if (tasksNoteArr[i].description) {
          tasksNoteArr[i].description = tasksNoteArr[i].description;
        } else {
          if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
            tasksNoteArr[i].description = 'لا يوجد ملاحظات';
          } else {
            tasksNoteArr[i].description = 'No Comments';
          }
        }
        if (i == 0) {
          tabcontent = '<div class="tab-pane fade show active" id="note' + i + '" role="tabpanel" aria-labelledby="note' + i + '"><div class="modal-body scrollBarStyle"><div style="" id="dialogBodyText"><div class="notes">' + tasksNoteArr[i].description + '</div></div><div id="dialogIcon"><img css="w-100" class="sendMsgImg" src="' + imgSource + '" data-themekey="#"></div></div><div class="modal-footer"><div id="modifiedNoteBy">' + tasksNoteArr[i].modifiedby + '</div><div id="modifiedDate">' + tasksNoteArr[i].modifiedDate.toLocaleDateString("en-US") + '</div><div id="viewhistory"><a href="' + historyLink + '"><span data-trans-viewhistory class="Resources"></span></a></div></div></div>';
        } else {
          tabcontent = '<div class="tab-pane fade" id="note' + i + '" role="tabpanel" aria-labelledby="note' + i + '"><div class="modal-body scrollBarStyle"><div style="" id="dialogBodyText"><div class="notes">' + tasksNoteArr[i].description + '</div></div><div id="dialogIcon"><img css="w-100" class="sendMsgImg" src="' + imgSource + '" data-themekey="#"></div></div><div class="modal-footer"><div id="modifiedNoteBy">' + tasksNoteArr[i].modifiedby + '</div><div id="modifiedDate">' + tasksNoteArr[i].modifiedDate.toLocaleDateString("en-US") + '</div><div id="viewhistory"><a href="' + historyLink + '"><span data-trans-viewhistory class="Resources"></span></a></div></div></div>';
        }
        $('#tasknotes').append(tabcontent);
      }
      if (tasksNoteArr.length == 1) {
        $('#notesTabs').hide();
      } else {
        $('#notesTabs').append(tabhead);
      }
      changeResources();
      if (tasksNoteArr[0].action.toLowerCase() == 'approve') {
        $('.modal-content').css('border-top', '3px solid #5ab74c')
      } else if (tasksNoteArr[0].action.toLowerCase() == 'submit') {
        $('.modal-content').css('border-top', '3px solid #ffc107')
      } else if (tasksNoteArr[0].action.toLowerCase() == 'reject') {
        $('.modal-content').css('border-top', '3px solid #590835')
      }
    } else {
      $('#myModal').css('display', 'none');
      $('.WF-btn').addClass('noNotification');
    }
  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Global variables
  g: {}
};
var Disable_Idea_Edit_Button = {
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    clearInterval(forTasksHTMLStatus);
    $('div.Container').after('<div class="cust-loader"></div>');
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
      Disable_Idea_Edit_Button.init();

    });
  },
  // The main Initialization function
  init: function () {

    var IID = window.location.href.split('IID=')[1].split('&')[0];
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Tasks'); //list name
    var camlQuery = new SP.CamlQuery();
    var ideaquery = `<View><Query><Where><And><Eq><FieldRef Name='RelatedItemID' /><Value Type='Text'>${IID}</Value></Eq><Eq><FieldRef Name='TaskType' /><Value Type='Choice'>SubmitProject</Value></Eq></And></Where></Query></View>`;
    camlQuery.set_viewXml(ideaquery); //caml query
    Disable_Idea_Edit_Button.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Disable_Idea_Edit_Button.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Disable_Idea_Edit_Button.onSuccess),
      Function.createDelegate(this, Disable_Idea_Edit_Button.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Disable_Idea_Edit_Button.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var count = 0;
    var taskNoteID = ''
    while (listItemEnum.moveNext()) { //loop through list items
      var oListItem = listItemEnum.get_current();
      taskStatus = oListItem.get_item('Status');
      count++;

    }
    if (count > 0 && taskStatus == "Closed") {
      $('.btn.btn-action.btn-save').remove();
    }
  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Global variables
  g: {}
};
// added by oday
// Get the projects collection.
function WfGetProjects() {
  projContext = PS.ProjectContext.get_current();
  projects = projContext.get_projects();
  projContext.load(projects, 'Include(Name, Id)'); //, Description, StartDate, Id, Owner
  projContext.executeQueryAsync(ChangeProjectOwner, QueryFailed);
}

function ChangeProjectOwner() {
  var project = projects.getById(projectGuid);
  var draftProject = project.checkOut();
  var web = projContext.get_web()
  var projectManagerId = projectManagerPicker.get_lookupId()
  var userPicked = web.getUserById(projectManagerId) //147
  draftProject.set_owner(userPicked)
  var publishJob = draftProject.publish(true);
  $('.wfLoader').hide();
  projContext.waitForQueueAsync(publishJob, 100, QueueJobSentOwner);
}

function QueueJobSentOwner(response) {
  // wfcheckinProject.checkin();
  Task_Edit_Data.init();
}
// var wfcheckinProject = {
// 	checkin: function () {
// 		$.ajax({
// 			url: _spPageContextInfo.siteAbsoluteUrl + "/_api/ProjectServer/Projects('" + projectGuid + "')/draft/publish(true)",
// 			method: "POST",
// 			contentType: "application/json;odata=verbose",
// 			headers: {
// 				Accept: "application/json; odata=verbose",
// 				"X-requestDigest": $("#__REQUESTDIGEST").val(),
// 				"X-HTTP-Method": "POST",
// 				"if-Match": "*",
// 			},
// 			success: function (data) {
// 				Task_Edit_Data.init();
// 			},
// 			error: function (data) {
// 				console.log("call failed", data);
// 			},
// 		});
// 	},
// 	g: {
// 	},
// };

function QueryFailed(sender, args) {
  console.log('Request failed: ' + args.get_message());
}
window.AllFileCount = 0;
//upload multiple files to specific folder with column assigning
var WF_UploadFiles = {
  WF_files: [], //files array
  preinit: function (state) {
    var myfiles;
    $("input[type=file]").each(function (e) {
      myfiles = document.querySelector('#' + $(this).attr('id')).files;
      AllFileCount = AllFileCount + myfiles.length;
    })

    if (($('[type="file"][required]').length == 0) && (AllFileCount == 0) && (stageid != 'S01')) {
      BulkEdit(state);
    } else if ($('.was-validated .form-control:invalid').length == 0) {
      // WF_UploadFiles.getFiles();
      _uploadFile();
    }
    WF_UploadFiles.g.state = state;
  },
  getFiles: function () //fill array
  {
    $('[type=file]').each(function (index) {
      var fc = $(this).get(0).files.length,
        $this = $(this).get(0);
      // typename = $(this).parent().next().find('select').val();
      for (var i = 0; i < fc; i++) {
        // WF_UploadFiles.WF_files.push({ title: typename, name: $this.files[i].name, buffer: $this.files[i] });//$this.files[i].name

        WF_UploadFiles.WF_files.push({ name: $this.files[i].name, buffer: $this.files[i] }); //$this.files[i].name

      }
      if (index == $('[type=file]').length - 1) {
        WF_UploadFiles.readFiles();
      }
    });
  },
  readFiles: function () {
    var filesUploaded = 0;
    for (var i = 0; i < WF_UploadFiles.WF_files.length; i++) {
      let file = WF_UploadFiles.WF_files[i].buffer;
      // var titlename = WF_UploadFiles.WF_files[i].title;
      var reader = new FileReader();
      reader._NAME = WF_UploadFiles.WF_files[i].name
      reader.onload = function (e) {
        let fileactualName = e.target._NAME;
        // WF_UploadFiles.init(e.target.result, fileactualName, titlename);
        WF_UploadFiles.init(e.target.result, fileactualName);
      }
      reader.onerror = function (e) {
        alert(e.target.error);
      }
      reader.readAsArrayBuffer(file);
    }
  },
  init: function (arrayBuffer, fileName) {

    //Get Client Context,Web and List object.
    var clientContext = new SP.ClientContext.get_current();
    var oWeb = clientContext.get_web();
    var oList = oWeb.getFolderByServerRelativeUrl(_spPageContextInfo.siteServerRelativeUrl + '/' + ListArray[2].documents + '/' + peojectC + '/' + listkey);
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
    myListItem.set_item("ItemID", IID)
    if (PCODE) {
      myListItem.set_item("Title", listkey + '-' + PCODE)
    } else {
      myListItem.set_item("Title", listkey)
    }

    myListItem.update();
    //Load client context and execcute the batch
    clientContext.load(myFolder);
    clientContext.executeQueryAsync(WF_UploadFiles.UploadQuerySuccess, WF_UploadFiles.UploadQueryFailure);
  },
  UploadQuerySuccess: function () {
    WF_isuploaddone++;
    console.log('File Uploaded Successfully.');
    if (WF_UploadFiles.WF_files.length == WF_isuploaddone) {
      BulkEdit(WF_UploadFiles.g.state);
    }
  },
  UploadQueryFailure: function (sender, args) {
    console.log('Request failed with error message - ' + args.get_message());
  },
  g: {}
}
//New upload used
function _uploadFile() {
  var files;
  window.myvalidAttachments = [];

  $("input[type=file]").each(function (e) {
    var myfiles = document.querySelector('#' + $(this).attr('id')).files;
    for (var i = 0; i < myfiles.length; i++) {
      const file = myfiles[i];
      const fileExtension = "" + file.name.split('.').pop();
      // get attribut
      if (acceptedExtensions.indexOf(fileExtension.toLowerCase()) > -1) {
        myvalidAttachments.push(file);
      }
    }
  });
  // retrive file from INPUT
  files = myvalidAttachments;



  if (($('[type="file"][required]').length > 0) && (!files || files.length === 0) && stageid != 'S01') {
    var locale, messageText;
    if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
      locale = {
        OK: Resources.ar["ok"],
        CANCEL: Resources.ar["cancelbutton"],
        CONFIRM: Resources.ar["yes"],
      }
      messageText = "الرجاء إدخال ملف";
    } else {
      locale = {
        OK: Resources.en["ok"],
        CANCEL: Resources.en["cancelbutton"],
        CONFIRM: Resources.en["yes"]
      }
      messageText = "Please add attachement";
    }
    bootbox.addLocale('custom', locale);
    $('.popupComment').remove();
    bootbox.alert({
      message: messageText,
      locale: 'custom'
    });
    return;
  }
  files = Array.prototype.slice.call(files);
  // read the files
  Promise.all(files.map(function (file) {
    return new Promise(function (prom_res, prom_rej) {
      // use fileReader
      var fileReader = new FileReader();
      fileReader.onloadend = function (e) {
        file.content = e.target.result;
        prom_res(file);
      }
      fileReader.onerror = function (e) {
        prom_rej(e.target.error);
      }
      fileReader.readAsArrayBuffer(file);
    })
  })).then(function (files) {
    // upload files
    return Promise.all(files.map(function (file) {
      if (isWfFirst_Upload) {
        $('input#getFile').eq(0).closest('.fieldset-container').append('<div class="col-md-6 CFIELD upload-status" data-groups="">\
				  <div class="upload-progress-parent">\
					  <div class="upload-progress bg-success"" style="width:0px"></div>\
				  </div>\
				  <p data-trans-fileuploading class="upload-name Resources"><span class="progress-file-name">"' + file.name + '" </span><span class="upload-percent"></span></p>\
			  </div>');
      }
      isWfFirst_Upload = false;

      return $SP().list(ListArray[2].documents).createFile({
        content: file.content,
        filename: PCODE + '/' + listkey + '/' + file.name,
        fields: {
          "Title": listkey + '-' + PCODE,
          "ItemID": IID
        },
        progress: function (perc) {

          $('.upload-progress').css('width', perc + '%');
          $('.upload-percent').text(' ' + perc + '%');
        }
      }).then(
        function (file) {
          WF_isuploaddone++;
          console.log('File Uploaded Successfully.');

          if (files.length == WF_isuploaddone) {
            if (stageid == 'S01') {
              SubmitField_BulkEdit.init(state);
            } else {
              BulkEdit(WF_UploadFiles.g.state);
            }

          }
        },
        function (error) {
          $('.form-btns-wrapper').prepend('<p style="color:red"> Faild saving the Attachements</p>')
          console.log("Error Uploading: ", error)
        });
    }))
  })
}