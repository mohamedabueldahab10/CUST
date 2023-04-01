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
			headers: { Accept: "application/json; odata=verbose" },
			success: function (data) {
				//console.log(data.d);
				UserN = data.d;
				WFuserCalls.get_CurrentUserGroupColl(data.d.Id);
				//console.log(UserN);
			},
			error: function (data) {
				// console.log('call failed');
			},
		});
	},
	get_CurrentUserGroupColl: function (UserID) {
		$.ajax({
			url:
				_spPageContextInfo.webAbsoluteUrl +
				"/_api/web/GetUserById(" +
				UserID +
				")/Groups",
			method: "GET",
			headers: { Accept: "application/json; odata=verbose" },
			success: function (data) {
				/* get all group's title of current user. */
				var results = data.d.results;
				for (var i = 0; i < results.length; i++) {
					WFuserCalls.g.Groups.push(results[i].Title);
				}
			},
		});
	},
	get_AllResources: function () {
		$.ajax({
			url:
				_spPageContextInfo.webAbsoluteUrl +
				"/_api/ProjectServer/EnterpriseResources",
			method: "GET",
			headers: { Accept: "application/json; odata=verbose" },
			success: function (data) {
				allResourcesArr = data.d.results;
				SP.SOD.registerSod(
					"PS.ProjectContext",
					SP.Utilities.Utility.getLayoutsPageUrl("ps.js")
				);
				SP.SOD.loadMultiple(["PS.ProjectContext"], WfGetProjects);
			},
		});
	},
	g: {
		Groups: [],
	},
};
var wfHistoryLink;
var thiredActionName = "";
window.projectstagename;
var workflowname,
	stageid,
	relatedItemTitle,
	stagenamE,
	stageName,
	taskcomments,
	nxtstageid,
	relateditemid,
	currentstage,
	noteQuery,
	No_Data,
	stageState,
	prvstageid,
	cancelstageid,
	prvstageidarr,
	nxtstageidarr,
	globalStateSubmitField,
	taskID = window.location.href.includes("TID=")
		? window.location.href.split("TID=")[1].split("&")[0]
		: "",
	taskid,
	taskActionType,
	taskCondition,
	tasktype,
	peojectC,
	projectNameTitle,
	curstageName,
	curphaseName,
	nextphaseName,
	assignedto,
	WF_isuploaddone = 0,
	WFisNew =
		window.location.href.toLowerCase().indexOf("new.aspx") > -1 &&
		window.location.href.indexOf("WF") > -1,
	WFisEdit =
		window.location.href.toLowerCase().indexOf("edit.aspx") > -1 &&
		window.location.href.indexOf("WF") > -1,
	WFisForm =
		window.location.href.toLowerCase().indexOf("new.aspx") > -1 ||
		window.location.href.toLowerCase().indexOf("view.aspx") > -1 ||
		window.location.href.toLowerCase().indexOf("edit.aspx") > -1,
	isideapage = window.location.href.indexOf("ideas") > -1,
	isTasksPage =
		window.location.href.indexOf("SMOTasks") > -1 &&
		window.location.href.indexOf("WFs") > -1,
	//
	isProjectCharter =
		window.location.href.indexOf("projectcharter") > -1 &&
		window.location.href.indexOf("WFs") > -1,

	//
	isRelatedProjectPage = window.location.href.indexOf("PCODE") > -1,
	// isDeliverablesPage = window.location.href.indexOf("deliverables") > -1,
	// isChangeRequestPage = window.location.href.indexOf("changerequest") > -1,
	isStrategyWf = window.location.href.indexOf("strategies") > -1,
	isSOsWf = window.location.href.indexOf("strategicobjectives") > -1,
	isKPIResultWf = window.location.href.indexOf("Targets") > -1,
	isVisionInitiative = window.location.href.indexOf("initiatives&VisionInitiative") > -1,
	isStrategicallyInitiative = window.location.href.indexOf("initiatives&StrategicallyInitiative") > -1,
	isLMSInitiative = window.location.href.indexOf("initiatives&LMSInitiative") > -1,
	isStrategicPartnerships = window.location.href.indexOf("strategicpartnerships&STP") > -1,
	isSPAchievements = window.location.href.indexOf("strategicpartnershipsachievements") > -1,
	// ghufran
	isVROCRInitiative = window.location.href.indexOf("initiatives&VROCRInitiative") > -1,
	isEPMOCRInitiative = window.location.href.indexOf("initiatives&EPMOCRInitiative") > -1,
	isLMSCRInitiative = window.location.href.indexOf("initiatives&LMSCRInitiative") > -1,
	isVROBenefitActual = window.location.href.indexOf("benefitmetrics&VROBenefitActual") > -1,
	isEPMOBenefitActual = window.location.href.indexOf("benefitmetrics&EPMOBenefitActual") > -1,
	isLMSBenefitActual = window.location.href.indexOf("benefitmetrics&LMSBenefitActual") > -1,
	isVROInitiativeMilestone = window.location.href.indexOf("initiativemilestones&VROInitiativeMilestone") > -1,
	isEPMOInitiativeMilestone = window.location.href.indexOf("initiativemilestones&EPMOInitiativeMilestone") > -1,
	isLMSInitiativeMilestone = window.location.href.indexOf("initiativemilestones&LMSInitiativeMilestone") > -1,
	isVROInitiativeDeliverable = window.location.href.indexOf("initiativedeliverables&VROInitiativeDeliverable") > -1,
	isEPMOInitiativeDeliverable = window.location.href.indexOf("initiativedeliverables&EPMOInitiativeDeliverable") > -1,
	isLMSInitiativeDeliverable = window.location.href.indexOf("initiativedeliverables&LMSInitiativeDeliverable") > -1,
	isVROProjMilestone = window.location.href.indexOf("milestones&VROProjMilestone") > -1,
	isEPMOProjMilestone = window.location.href.indexOf("milestones&EPMOProjMilestone") > -1,
	isLMSProjMilestone = window.location.href.indexOf("milestones&LMSProjMilestone") > -1,
	isVROCOC = window.location.href.indexOf("coc&VROCOC") > -1,
	isEPMOCOC = window.location.href.indexOf("coc&EPMOCOC") > -1,
	isLMSCOC = window.location.href.indexOf("coc&LMSCOC") > -1,
	isVROCRObjective = window.location.href.indexOf("changerequest&VROCRObjective") > -1,
	isMSCRObjective = window.location.href.indexOf("changerequest&MSCRObjective") > -1,
	isLMSCRObjective = window.location.href.indexOf("changerequest&LMSCRObjective") > -1,
	isVROCRKPI = window.location.href.indexOf("changerequest&VROCRKPI") > -1,
	isMSCRKPI = window.location.href.indexOf("changerequest&MSCRKPI") > -1,
	isLMSCRKPI = window.location.href.indexOf("changerequest&LMSCRKPI") > -1,
	isVROActualKPI = window.location.href.indexOf("mainkpi&VROActualKPI") > -1,
	isMSActualKPI = window.location.href.indexOf("mainkpi&MSActualKPI") > -1,
	isLMSActualKPI = window.location.href.indexOf("mainkpi&LMSActualKPI") > -1,
	
	isVROProjDeliverable = window.location.href.indexOf("deliverables&VROProjDeliverable") > -1,
	isEPMOProjDeliverable = window.location.href.indexOf("deliverables&EPMOProjDeliverable") > -1,
	isLMSProjDeliverable = window.location.href.indexOf("deliverables&LMSProjDeliverable") > -1,
	isVROCreateObjective = window.location.href.indexOf("sos&VROCreateObjective") > -1,
	isMSCreateObjective = window.location.href.indexOf("sos&MSCreateObjective") > -1,
	isLMSCreateObjective = window.location.href.indexOf("sos&LMSCreateObjective") > -1
    // ghufran
    isVROCRProject = window.location.href.indexOf("changerequest&VROCRProject") > -1,
	isEPMOCRProject = window.location.href.indexOf("changerequest&EPMOCRProject") > -1,
	isLMSCRProject = window.location.href.indexOf("changerequest&LMSCRProject") > -1,
	isVROCreateProject = window.location.href.indexOf("projects&VROCRProject") > -1,
	// isEPMOCRProject = window.location.href.indexOf("changerequest&EPMOCRProject") > -1,
	// isLMSCRProject = window.location.href.indexOf("changerequest&LMSCRProject") > -1,
	// 
	isProjectCancellationRequestWF =
	window.location.href.indexOf("projectcancellationrequest") > -1,
	isDeliverabletWF = window.location.href.indexOf("deliveriesreport") > -1,
	isInitiativeBenefitWF =
	window.location.href.indexOf("initiativebenefits") > -1,
	isProjectDeligationsWf =
	window.location.href.indexOf("projectdeligations") > -1,
	isExceptionRequestWf = window.location.href.indexOf("exceptionrequest") > -1,
	isGatesWf = window.location.href.indexOf("gates") > -1,
	isExecutiveTasksWf = window.location.href.indexOf("executivetasks") > -1,
	isRiskPage = window.location.href.indexOf("risks") > -1,
	isIssuePage = window.location.href.indexOf("issues") > -1,
	isMomPage = window.location.href.indexOf("mom") > -1,
	// isMainKPIPage = window.location.href.indexOf("mainkpi") > -1,
	isProjectPage = window.location.href.indexOf("projects") > -1;

var fieldtoedit,
	bulkeditlist,
	bulkeditquery,
	taskquery,
	IID2,
	RID,
	isExecuteCR = false,
	isschedule = window.location.href.indexOf("schedule.aspx") > -1;

window.lastIdeaQuery;
window.isView = window.location.href.toLowerCase().indexOf("view.aspx") > -1;
var thirdActionInfo = "";
var curstage_org = [],
	curstage_org_prv = [],
	curstage_prv = [],
	curstage = [],
	curstage_nxt = [],
	curphase_nxt = [];
var stagecode, nextStageName, prevStageName, curStageArr, actionbuttonTitle;
var forTasksHTMLStatus, forFormSubmitHTMLStatus, formakesureishtmlStatus;
var dialogBoxHtml = "";
//determine which workflow to get related task
// console.log(isTasksPage, 'isTasksPage')
// console.log(isTasksEscalatePage, 'isTasksEscalatePage')
// console.log(RID, 'RID RID')
//
var projectManagerPicker = "",
	ProjectOwnerPicker = "",
	ProjectSponsorPicker = "";
// Get the projects collection.//get PGUID // Declare global variables.
var projContext;
var projects;
var projectGuid;
var PNAME;

var RelatedProjectCODE = "";

var accessCurrentTask = false
var DeliverablesDone;
if (
	window.location.href.toLowerCase().indexOf("projectcode") > -1 &&
	window.location.href.toLowerCase().indexOf("wfs") > -1
) {
	RelatedProjectCODE = window.location.href
		.split("projectcode=")[1]
		.split("&")[0];
}
//
if (
	localStorage.getItem("lng") == null ||
	localStorage.getItem("lng") == "ar"
) {
	No_Data = "لا يوجد";
} else {
	No_Data = "No Data";
}

debugger
// if (isChangeRequestPage) {
// 	workflowname = "CR";
// 	fieldtoedit = "SubmitForApproval";
// 	bulkeditlist = "ChangeRequest";
// 	IID2 = window.location.href.split("IID=")[1].split("&")[0];
// 	bulkeditquery =
// 		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
// 		IID2 +
// 		"</Value> </Eq></Where></Query></View>";
// 	taskquery =
// 		'<View><Query><Where><And><Eq><FieldRef Name="ID" /><Value Type="Text">' +
// 		taskID +
// 		'</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' +
// 		IID2 +
// 		'</Value></Eq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
// }
// else if (isDeliverablesPage) {
// 	workflowname = "DV";
// 	bulkeditlist = "Deliverables";
// 	IID2 = window.location.href.split("IID=")[1].split("&")[0];
// 	bulkeditquery =
// 		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
// 		IID2 +
// 		"</Value> </Eq></Where></Query></View>";
// 	taskquery =
// 		'<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' +
// 		workflowname +
// 		'</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' +
// 		IID2 +
// 		'</Value></Eq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
// } 
if (isStrategyWf) {
	workflowname = "Strategies";
	bulkeditlist = "Strategies";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
} else if (isRiskPage) {
	workflowname = "Risk";
	bulkeditlist = "Risks";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' +
		workflowname +
		'</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' +
		IID2 +
		'</Value></Eq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
} else if (isIssuePage) {
	workflowname = "Issues";
	bulkeditlist = "Issues";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' +
		workflowname +
		'</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' +
		IID2 +
		'</Value></Eq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
} else if (isMomPage) {
	workflowname = "MoM";
	bulkeditlist = "MOM";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">' +
		workflowname +
		'</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">' +
		IID2 +
		'</Value></Eq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></And></Where></Query></View>';
}
// else if (isMainKPIPage) {
// 	workflowname = "MainKPI";
// 	bulkeditlist = "MainKPI";
// 	IID2 = window.location.href.split("IID=")[1].split("&")[0];
// 	bulkeditquery =
// 		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
// 		IID2 +
// 		"</Value> </Eq></Where></Query></View>";
// 	taskquery =
// 		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
// 		taskID +
// 		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
// 		workflowname +
// 		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
// } 
else if (isSOsWf) {
	workflowname = "StrategicObjectives";
	bulkeditlist = "StrategicObjectives";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
} else if (isKPIResultWf) {
	workflowname = "MainKPI";
	bulkeditlist = "MainKPI";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isVisionInitiative) {

	workflowname = "VisionInitiative";
	bulkeditlist = "Initiatives";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";

}
else if (isStrategicPartnerships) {
	workflowname = "StrategicPartnerships";
	bulkeditlist = "Strategic Partnerships";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
} else if (isStrategicallyInitiative) {
	workflowname = "StrategicallyInitiative";
	bulkeditlist = "Initiatives";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isLMSInitiative) {

	workflowname = "LMSInitiative";
	bulkeditlist = "Initiatives";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isVROCRInitiative) {

	workflowname = "VROCRInitiative";
	bulkeditlist = "Initiatives";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isEPMOCRInitiative) {

	workflowname = "EPMOCRInitiative";
	bulkeditlist = "Initiatives";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isLMSCRInitiative) {

	workflowname = "LMSCRInitiative";
	bulkeditlist = "Initiatives";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isVROCRProject) {

	workflowname = "VROCRProject";
	// bulkeditlist = "Projects";
	bulkeditlist = "Change Request";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isVROCreateProject) {

	workflowname = "VROCreateProject";
	bulkeditlist = "Projects";
	// bulkeditlist = "Change Request";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isEPMOCRProject) {

	workflowname = "EPMOCRProject";
	// bulkeditlist = "Projects";
	bulkeditlist = "Change Request";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isLMSCRProject) {

	workflowname = "LMSCRProject";
	// bulkeditlist = "Projects";
	bulkeditlist = "Change Request";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isVROBenefitActual) {

	workflowname = "VROBenefitActual";
	bulkeditlist = "BenefitMetrics";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isEPMOBenefitActual) {

	workflowname = "EPMOBenefitActual";
	bulkeditlist = "BenefitMetrics";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isLMSBenefitActual) {

	workflowname = "LMSBenefitActual";
	bulkeditlist = "BenefitMetrics";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isVROInitiativeMilestone) {

	workflowname = "VROInitiativeMilestone";
	bulkeditlist = "InitiativeMilestones";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isEPMOInitiativeMilestone) {

	workflowname = "EPMOInitiativeMilestone";
	bulkeditlist = "InitiativeMilestones";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isLMSInitiativeMilestone) {

	workflowname = "LMSInitiativeMilestone";
	bulkeditlist = "InitiativeMilestones";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isVROInitiativeDeliverable) {

	workflowname = "VROInitiativeDeliverable";
	bulkeditlist = "InitiativeDeliverables";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isEPMOInitiativeDeliverable) {

	workflowname = "EPMOInitiativeDeliverable";
	bulkeditlist = "InitiativeDeliverables";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isLMSInitiativeDeliverable) {

	workflowname = "LMSInitiativeDeliverable";
	bulkeditlist = "InitiativeDeliverables";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isVROProjMilestone) {

	workflowname = "VROProjMilestone";
	bulkeditlist = "Milestones";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isEPMOProjMilestone) {

	workflowname = "EPMOProjMilestone";
	bulkeditlist = "Milestones";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isLMSProjMilestone) {

	workflowname = "LMSProjMilestone";
	bulkeditlist = "Milestones";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isVROCOC) {

	workflowname = "VROCOC";
	bulkeditlist = "Certifications";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isEPMOCOC) {

	workflowname = "EPMOCOC";
	bulkeditlist = "Certifications";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isLMSCOC) {

	workflowname = "LMSCOC";
	bulkeditlist = "Certifications";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isVROProjDeliverable) {

	workflowname = "VROProjDeliverable";
	bulkeditlist = "Deliverables";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isEPMOProjDeliverable) {

	workflowname = "EPMOProjDeliverable";
	bulkeditlist = "Deliverables";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isLMSProjDeliverable) {

	workflowname = "LMSProjDeliverable";
	bulkeditlist = "Deliverables";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isVROCRObjective) {

	workflowname = "VROCRObjective";
	bulkeditlist = "Change Request";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isMSCRObjective) {

	workflowname = "MSCRObjective";
	bulkeditlist = "Change Request";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isLMSCRObjective) {

	workflowname = "LMSCRObjective";
	bulkeditlist = "Change Request";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isVROCreateObjective) {

	workflowname = "VROCreateObjective";
	bulkeditlist = "SOs";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isMSCreateObjective) {

	workflowname = "MSCreateObjective";
	bulkeditlist = "SOs";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isLMSCreateObjective) {

	workflowname = "LMSCreateObjective";
	bulkeditlist = "SOs";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isVROCRKPI) {

	workflowname = "VROCRKPI";
	bulkeditlist = "Change Request";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isMSCRKPI) {

	workflowname = "MSCRKPI";
	bulkeditlist = "Change Request";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isLMSCRKPI) {

	workflowname = "LMSCRKPI";
	bulkeditlist = "Change Request";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isVROActualKPI) {

	workflowname = "VROActualKPI";
	bulkeditlist = "MainKPI";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isMSActualKPI) {

	workflowname = "MSActualKPI";
	bulkeditlist = "MainKPI";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isLMSActualKPI) {

	workflowname = "LMSActualKPI";
	bulkeditlist = "MainKPI";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}
else if (isSPAchievements) {
	workflowname = "SPAchievements";
	bulkeditlist = "SPAchievements";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
} else if (isProjectCancellationRequestWF) {
	workflowname = "ProjectCancellationRequest";
	bulkeditlist = "ProjectCancellationRequest";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
} else if (isProjectDeligationsWf) {
	workflowname = "ProjectDeligations";
	bulkeditlist = "ProjectDeligations";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
} else if (isDeliverabletWF) {
	workflowname = "Deliverables";
	bulkeditlist = "DeliverablesApprovalTemplates";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
} else if (isInitiativeBenefitWF) {
	workflowname = "Benefits";
	bulkeditlist = "Benefits";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
} else if (isExceptionRequestWf) {
	workflowname = "ExceptionRequest";
	bulkeditlist = "ExceptionRequest";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
} else if (isGatesWf) {
	workflowname = "Gates";
	bulkeditlist = "Gates";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
} else if (isExecutiveTasksWf) {
	workflowname = "ExecutiveTasks";
	bulkeditlist = "ExecutiveTasks";
	IID2 = window.location.href.split("IID=")[1].split("&")[0];
	bulkeditquery =
		'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">' +
		IID2 +
		"</Value> </Eq></Where></Query></View>";
	taskquery =
		'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
		taskID +
		'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
		workflowname +
		"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
}

//*****1 */
if (
	window.location.href.indexOf("PCODE") > -1 &&
	window.location.href.toLowerCase().indexOf("&wfs") > -1
) {
	// console.log('123');
	peojectC = window.location.href.split("PCODE=")[1].split("&")[0];
	workflowname = "Project";
	fieldtoedit = "ProjectManager";
	bulkeditlist = "Projects";
	bulkeditquery =
		"<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>" +
		peojectC +
		"</Value></Eq></Where></Query></View>";
	if (window.location.href.indexOf("TID") > -1) {
		taskID = window.location.href.split("TID=")[1].split("&")[0];
		taskquery =
			'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
			taskID +
			'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">' +
			workflowname +
			"</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>";
	} else {
		taskquery =
			'<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ID" /> <Value Type="Integer">' +
			taskID +
			'</Value> </Eq><Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq></And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>';
	}
}
var Delegatepopup = {
	init: function (TID) {
		$("body").append(
			'<div class="popupComment"><div class="wrapcomments">' +
			'<label><span data-trans-Commissioner class="Resources"></span></label>' +
			'<div class="PPField SPIField form-control" type="picker" id="AssignedTo" value="" INppicker=""></div>' +
			'<label><span data-trans-notes class="Resources"></span></label><textarea required class="SPIField form-control" id="DelegationReason" rows="4" cols="50"></textarea><div class="btn-cont"><button class=" btn btn-action sendButton" onclick="Delegate_Data_Submit.init(\'' +
			TID +
			'\')"><span data-trans-send class="Resources"></span></button><button onclick="$(\'.popupComment\').remove();" class=" btn btn-action"><span data-trans-cancelbutton class="Resources"></span></button><span style="display:none" class="successmsg"><span data-trans-submitsuccessMsg class="Resources"></span></span></div></div></div>'
		); //commentsub
		changeResources();
		$("body").append(
			"<style>.sp-peoplepicker-initialHelpText {opacity:0}</style>"
		);
		$("div[type=picker]").each(function () {
			var mp = new MyPeoplePicker();
			mp.init($(this).attr("id"), {
				PrincipalAccountType: "User",
				AllowMultipleValues: false,
			});
		});
		window.setTimeout(function () {
			$(".sp-peoplepicker-initialHelpText").text(enternameemail);
			$("body").append(
				"<style>.sp-peoplepicker-initialHelpText {opacity:1!important}</style>"
			);
		}, 777);
		$("body").append(
			"<style>div.PPField * {direction: rtl;text-align:right}</style>"
		);
	},
};
var delegatedtaskcode,
	delegatedtaskname,
	delegatedtasktitle,
	taskstatus,
	taskOwner,
	Workflowname,
	WorkflowInstanceId,
	TaskType,
	SatgeName,
	StageID,
	SatgeIdApprove,
	SatgeIdReject,
	TaskRelatedUrl,
	RelatedItemId,
	TaskComment,
	RelatedItemTitle,
	delegateComment,
	ppp,
	ProjectCode,
	TaskDelegatedFrom,
	assignedToGroup,
	userName,
	delegateTaskListKey,
	taskId;

var Delegate_Data_Submit = {
	onSuccess: function (sender, args) {
		var collListItem = Delegate_Data_Submit.g.collListItem;
		var listItemEnum = collListItem.getEnumerator();
		// var ListKey
		while (listItemEnum.moveNext()) {
			var currentItem = listItemEnum.get_current();
			currentId = currentItem.get_item("ID");
			// console.log(currentId);

			delegatedtaskname = currentItem.get_item("Title");
			Workflowname = currentItem.get_item("WorkflowName");
			WorkflowInstanceId = currentItem.get_item("WFInstanceID");
			TaskType = currentItem.get_item("TaskType");
			SatgeName = currentItem.get_item("StageName");
			StageID = currentItem.get_item("StageID");
			SatgeIdApprove = currentItem.get_item("StageIDApprove");
			SatgeIdReject = currentItem.get_item("StageIDReject");
			TaskRelatedUrl = currentItem.get_item("RelatedURL");
			RelatedItemId = currentItem.get_item("RelatedItemID");
			TaskComment = currentItem.get_item("Body");
			RelatedItemTitle = currentItem.get_item("RelatedItemTitle");
			ProjectCode = currentItem.get_item("ProjectCode");
			TaskDelegatedFrom = currentItem.get_item("AssignedTo");
			delegateTaskListKey = currentItem.get_item("ListKey");

			// if (Workflowname == "Project" || Workflowname == "Idea") {
			if (localStorage.getItem("Dynamo_Tasks Configuration") != null) {
				stages = JSON.parse(
					localStorage.getItem("Dynamo_Tasks Configuration") || "[]"
				);
				stages = stages.filter(function (item) {
					return item.code == StageID;
				});
				assignedToGroup = stages[0].group;
			}
			// }
			if ($("#AssignedTo").find("span.sp-peoplepicker-userSpan").length) {
				var id = $("#AssignedTo").attr("id");
				ppp =
					$("#AssignedTo").find("span.sp-peoplepicker-userSpan").attr("sid") ==
						undefined
						? ""
						: SP.FieldUserValue.fromUser(
							$("#AssignedTo")
								.find("span.sp-peoplepicker-userSpan")
								.attr("sid")
						); //.split('|').slice(-1)[0]
				taskOwner = ppp;
				userName = encodeURIComponent(ppp.get_lookupValue());
			}
			delegateComment = $("#DelegationReason").val();

			$(".errormsg").remove();
			$(".wrapcomments").addClass("was-validated");
			if (
				$(".was-validated .form-control:invalid").length == 0 &&
				$("span.sp-peoplepicker-userSpan").length > 0
			) {
				userCalls.isMember(assignedToGroup, userName);
			} else {
				if ($("span.sp-peoplepicker-userSpan").length == 0) {
					$("#AssignedTo").addClass("is-invalid");
				}
			}
		}
	},
	onError: function (sender, args) {
		console.log(
			"Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
		);
	},
	// The main Initialization function
	init: function (TID) {
		var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext.get_web().get_lists().getByTitle("Tasks");
		var camlQuery = new SP.CamlQuery();
		taskId = parseInt(TID);
		camlQuery.set_viewXml(
			'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Text">' +
			taskId +
			"</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>"
		);
		Delegate_Data_Submit.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
		clientContext.load(Delegate_Data_Submit.g.collListItem);
		clientContext.executeQueryAsync(
			Function.createDelegate(this, Delegate_Data_Submit.onSuccess),
			Function.createDelegate(this, Delegate_Data_Submit.onError)
		);
	},
	// Global variables
	g: {},
};

var addDelegatedTask = {
	init: function () {
		var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext.get_web().get_lists().getByTitle("Tasks");
		var itemCreateInfo = new SP.ListItemCreationInformation();
		addDelegatedTask.g.oListItem = oList.addItem(itemCreateInfo);

		addDelegatedTask.g.oListItem.set_item("Title", delegatedtaskname);
		addDelegatedTask.g.oListItem.set_item("WorkflowName", Workflowname);
		addDelegatedTask.g.oListItem.set_item("WFInstanceID", WorkflowInstanceId);
		addDelegatedTask.g.oListItem.set_item("TaskType", TaskType);
		addDelegatedTask.g.oListItem.set_item("StageName", SatgeName);
		addDelegatedTask.g.oListItem.set_item("StageIDApprove", SatgeIdApprove);
		addDelegatedTask.g.oListItem.set_item("StageID", StageID);
		addDelegatedTask.g.oListItem.set_item("StageIDReject", SatgeIdReject);
		addDelegatedTask.g.oListItem.set_item("RelatedURL", TaskRelatedUrl);
		addDelegatedTask.g.oListItem.set_item("RelatedItemID", RelatedItemId);
		addDelegatedTask.g.oListItem.set_item("Body", TaskComment);
		addDelegatedTask.g.oListItem.set_item("RelatedItemTitle", RelatedItemTitle);
		addDelegatedTask.g.oListItem.set_item("AssignedTo", ppp);
		addDelegatedTask.g.oListItem.set_item("ProjectCode", ProjectCode);
		addDelegatedTask.g.oListItem.set_item("DelegationReason", delegateComment);
		addDelegatedTask.g.oListItem.set_item("ListKey", delegateTaskListKey);
		addDelegatedTask.g.oListItem.set_item("Status", "Open");
		addDelegatedTask.g.oListItem.set_item(
			"TaskDelegatedFrom",
			TaskDelegatedFrom
		);
		$("button.btn.btn-action.sendButton").attr("disabled", true);
		$(".wrapcomments").append(
			'<div class="successDelegationMsg"><span data-trans-delegationmsg class="Resources"></span><i class="fas fa-check" aria-hidden="true"></i></div>'
		);
		changeResources();
		addDelegatedTask.g.oListItem.update();
		clientContext.load(addDelegatedTask.g.oListItem);
		clientContext.executeQueryAsync(
			Function.createDelegate(this, function () {
				DeleteDelegate_Data_Submit.init(taskId);
			}),
			Function.createDelegate(this, function (sender, args) {
				var errormessage =
					"Request failed. " +
					args.get_message() +
					"\n" +
					args.get_stackTrace();
				console.log(errormessage);
			})
		);
	},
	g: {},
};

var DeleteDelegate_Data_Submit = {
	init: function () {
		var context = SP.ClientContext.get_current();
		var dfd = $.Deferred();
		//Get list from host web
		var programList = context.get_web().get_lists().getByTitle("Tasks");
		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml(
			'<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Text">' +
			taskId +
			"</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>"
		);
		//Get items by Query
		var progColl = programList.getItems(camlQuery);
		//Load item collection
		context.load(progColl);
		context.executeQueryAsync(
			function () {
				var currentItemArray = [];
				//Check itemcollection count greater than 0
				if (progColl.get_count() > 0) {
					var progEnum = progColl.getEnumerator();
					while (progEnum.moveNext()) {
						var currentItem = progEnum.get_current();
						var currentId = currentItem.get_item("ID");
						//Get Item by current ID
						var items = programList.getItemById(currentId);
						items.set_item("Status", "Closed");
						items.set_item("WFInstanceID", null);
						items.set_item("TakenAction", "delegate");
						//Update the item
						items.update();
						//Push item on the array
						currentItemArray.push(items);
						//Load the item Array
						context.load(currentItemArray[currentItemArray.length - 1]);
					}
					context.executeQueryAsync(
						function () {
							//Item Updated sucess
							// console.log("Items are updated Successfully");
							dfd.resolve();
							window.location.reload();
						},
						function (sender, args) {
							//Item updated fail
							console.log(
								"Request Failed to get projectlist Items :" + args.get_message()
							);
						}
					);
				} else {
					dfd.resolve();
				}
			},
			function (sender, args) {
				console.log("Request failed in List " + args.get_message());
			}
		);
		return dfd.promise();
	},
};
//*****3 */
var Task_PCODE_Data_Request_WFs = {
	// Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
	preinit: function () {

		// console.log('321');
		if (
			$(".DahsFormTitle").length ||
			$(".PNameTitle").text() ||
			$("#Ribbon\\.Tabs\\.PDP\\.Home-title").length
		) {
			// console.log('in');
			clearInterval(forTasksHTMLStatus);
			$("div.Container").after('<div class="cust-loader"></div>');



			SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
				Task_PCODE_Data_Request_WFs.init();
			});
		}
		//*****channnnges */
		clearInterval(forTasksHTMLStatus);
		$("div.Container").after('<div class="cust-loader"></div>');
		SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {

			Task_PCODE_Data_Request_WFs.init();
			// console.log('Start');
		});
	},
	// The main Initialization function
	init: function () {



		// console.log(taskquery, "THIS IS TASLK QUERy")
		var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext.get_web().get_lists().getByTitle("Tasks"); //list name
		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml(taskquery); //caml query

		Task_PCODE_Data_Request_WFs.g.collListItem = oList.getItems(camlQuery);
		clientContext.load(Task_PCODE_Data_Request_WFs.g.collListItem);
		clientContext.executeQueryAsync(
			Function.createDelegate(this, Task_PCODE_Data_Request_WFs.onSuccess),
			Function.createDelegate(this, Task_PCODE_Data_Request_WFs.onError)
		);
	},
	onSuccess: function (sender, args) {
		var collListItem = Task_PCODE_Data_Request_WFs.g.collListItem;
		var listItemEnum = collListItem.getEnumerator();

		while (listItemEnum.moveNext()) {


			accessCurrentTask = true

			//loop through list items
			var oListItem = listItemEnum.get_current();
			taskid = oListItem.get_id();
			//alert(taskid);
			nxtstageid = oListItem.get_item("StageIDApprove");
			relateditemid = oListItem.get_item("RelatedItemID");
			if (nxtstageid) {
				nxtstageidarr = nxtstageid.replaceAll("__", "").split(";");
			}
			prvstageid = oListItem.get_item("StageIDReject");
			cancelstageid = oListItem.get_item("StageIDCancel");

			if (prvstageid) {
				prvstageidarr = prvstageid.replaceAll("__", "").split(";");
			}
			stageid = oListItem.get_item("StageID");
			relatedItemTitle = oListItem.get_item("RelatedItemTitle") ? oListItem.get_item("RelatedItemTitle") : "";
			tasktype = oListItem.get_item("TaskType"); //user acttion type
			peojectC = oListItem.get_item("ProjectCode");
			projectNameTitle = oListItem.get_item("ProjectName") ? oListItem.get_item("ProjectName") : oListItem.get_item("RelatedItemName");// to get the related task name
			stagename = oListItem.get_item("Title");
			// stagename = oListItem.get_item('StageName');
			workflowname = oListItem.get_item("WorkflowName");

			assignedto = oListItem.get_item("AssignedTo"); //handle multiple people picker
			currentstage = oListItem.get_item("Title"); //added to handle WFNote Query
			// taskActionType = oListItem.get_item('TaskActionType');
			thirdActionInfo = oListItem.get_item("OtherStage")
				? oListItem.get_item("OtherStage")
				: "";
			// condition = oListItem.get_item('Condition');
			var tasktitlearr = [];

			if (localStorage.getItem("Dynamo_Tasks Configuration") != null) {
				tasktitlearr = JSON.parse(
					localStorage.getItem("Dynamo_Tasks Configuration") || "[]"
				);
				tasktitlearr = tasktitlearr.filter(function (item) {
					return item.code == stagename;
				});
				taskActionType = tasktitlearr[0].TaskActionType;
				taskCondition = tasktitlearr[0].TaskCondition
					? eval(tasktitlearr[0].TaskCondition)
					: null;
				if (
					localStorage.getItem("lng") == null ||
					localStorage.getItem("lng") == "ar"
				) {
					stagename = tasktitlearr[0].name;
					actionbuttonTitle = tasktitlearr[0].actionButtonTitleAr;
				} else {
					stagename = tasktitlearr[0].nameEn;
					actionbuttonTitle = tasktitlearr[0].actionButtonTitleEn;
				}
			}
		}
		if (workflowname == "Project") {
			wfHistoryLink =
				"" +
				_spPageContextInfo.webAbsoluteUrl +
				"/SitePages/TaskHistory.aspx?TT=" +
				workflowname +
				"&PCODE=" +
				peojectC +
				"&IID=" +
				relateditemid +
				"";
		} else {
			wfHistoryLink =
				"" +
				_spPageContextInfo.webAbsoluteUrl +
				"/SitePages/TaskHistory.aspx?TT=" +
				workflowname +
				"&IID=" +
				relateditemid +
				"";
		}
		noteQuery = `<View><Query><Where><And><Eq><FieldRef Name="WorkflowName" /><Value Type="Text">${workflowname}</Value></Eq><And><Eq><FieldRef Name="RelatedItemID" /><Value Type="Text">${relateditemid}</Value></Eq><And><Eq><FieldRef Name="Status" /><Value Type="Choice">Closed</Value></Eq><Or><Contains><FieldRef Name='StageIDApprove' /><Value Type='Text'>${currentstage}</Value></Contains><Contains><FieldRef Name="StageIDReject" /><Value Type="Text">${currentstage}</Value></Contains></Or></And></And></And></Where><OrderBy><FieldRef Name="Modified" Ascending="False" /></OrderBy></Query></View>`;
		var hasaccess = false;
		if (assignedto != undefined) {
			for (var a = 0; a < assignedto.length; a++) {
				if (
					assignedto[a].get_lookupId() == _spPageContextInfo.userId ||
					WFuserCalls.g.Groups.indexOf(assignedto[a].get_lookupValue()) > -1
				) {
					hasaccess = true;
				}
				if (a == assignedto.length - 1) {
					if (!hasaccess) {
						window.location = _spPageContextInfo.webServerRelativeUrl;
					}
				}
			}
		}
		//*****4 */
		if (workflowname == "Project") {
			PCODE_Stage_Data_Request_WFs.init();
		} else {
			Task_PCODE_Data_Request_WFs.g.handleids();
		}
		//cr
		if (tasktype == "ExecuteCR") {
			isExecuteCR = true
		}


		if (!accessCurrentTask && !isAdmin && System_Groups.indexOf("System Admin Group") == -1) {
			Security_userCalls.g.Security_Msg();
		}


	},
	onError: function (sender, args) {
		console.log(
			"Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
		);
	},
	// Global variables
	g: {
		Handle_Take_Action: function () {
			if (isschedule) {
				$("body").append(
					"<style>div#s4-titlerow {display: block!important;padding: 6px;}h1#pageTitle span {display: flex;}</style>"
				);
			}
			console.log("in handle tak action")


			//  alert(tasktype);
			switch (tasktype) {
				case "ProjectTask":
					$(".navbar.page-nav.px-5").after(
						'<div class="WF-btn"><div class="SubmitTitleRow mt-3"><div class="wfTitle"><span data-trans-workflow class="Resources">سير العمل</span></div><div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button></div><button data-trans-task onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="btn pop-green Resources" type="button" > "' +
						stagename +
						'"</button><button data-trans-projectlbl onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="btn pop-green rejection Resources" type="button"> "' +
						stagename +
						'"</button></div></div>'
					);
					$(".btnactionrow > h2.approvalHeader").append('<div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button></div>')
					$(".btnactionrow .form-btns-wrapper").append(
						'<div class="WF-btn"><div class="SubmitTitleRow mt-3"><div class="wfTitle"><span data-trans-workflow class="Resources">سير العمل</span></div><button data-trans-task onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="btn pop-green Resources" type="button" > "' +
						stagename +
						'"</button><button data-trans-projectlbl onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="btn pop-green rejection Resources" type="button"> "' +
						stagename +
						'"</button></div></div>'
					);
					$("div.Container").fadeIn();
					$("div.cust-loader").fadeOut();
					break;
				case "TriApproval":
					$(".navbar.page-nav.px-5").after(
						'<div class="WF-btn"><div class="SubmitTitleRow mt-3"><div class="wfTitle"><span data-trans-workflow class="Resources">سير العمل</span></div><div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button></div></div><div class="apprv"><span class="approveStageName">' +
						actionbuttonTitle +
						'</span><button data-trans-accept onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="btn pop-green Resources" type="button" ></button><button data-trans-rejection  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="btn pop-green rejection Resources"  type="button"></button><button data-trans-cancelbutton  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(2,\'Approval\')" class="btn pop-green cancelbutton Resources"  type="button"></button></div></div>'
					);
					$(".btnactionrow .form-btns-wrapper").append(
						'<div class="WF-btn"><div class="SubmitTitleRow mt-3"><div class="wfTitle"><span data-trans-workflow class="Resources">سير العمل</span></div><div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button></div></div><div class="apprv"><span class="approveStageName">' +
						actionbuttonTitle +
						'</span><button data-trans-accept onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="btn pop-green Resources" type="button" ></button><button data-trans-rejection  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="btn pop-green rejection Resources"  type="button"></button><button data-trans-cancelbutton  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(2,\'Approval\')" class="btn pop-green cancelbutton Resources"  type="button"></button></div></div>'
					);
					$("div.Container").fadeIn();
					$("div.cust-loader").fadeOut();
					forFormSubmitHTMLStatus = setInterval(function () {
						Task_PCODE_Data_Request_WFs.g.hidefields();
					}, 100);
					break;
				case "Approval":
					// console.log('aaaaaaaaaaaaaa');
					$(".navbar.page-nav.px-5").after(
						'<div class="WF-btn"><div class="SubmitTitleRow mt-3"><div class="wfTitle"><span data-trans-workflow class="Resources">سير العمل</span></div><div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button></div></div><div class="apprv"><span class="approveStageName">' +
						actionbuttonTitle +
						'</span><button data-trans-accept onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="btn pop-green Resources" type="button" ></button><button data-trans-rejection  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="btn pop-green rejection Resources"  type="button"></button></div></div>'
					);
					//delegation btn
					$(".btnactionrow > h2.approvalHeader").append('<div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button></div>')
					//main action
					$(".btnactionrow .form-btns-wrapper").append(
						'<div class="WF-btn"><div class="apprv"><span class="approveStageName"><p class="Resources task-name" data-trans-taskname></p>' +
						actionbuttonTitle +
						'</span><div class="wf-btn-wrapper-new d-flex"><button data-trans-accept onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="btn pop-green Resources" type="button" ></button><button data-trans-rejection  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="btn pop-green rejection Resources"  type="button"></button></div></div>'
					);
					$("div.Container").fadeIn();
					$("div.cust-loader").fadeOut();
					forFormSubmitHTMLStatus = setInterval(function () {
						Task_PCODE_Data_Request_WFs.g.hidefields();
					}, 100);
					break;
				case "ApprovedWithAssigned":
					if (
						localStorage.getItem("lng") == null ||
						localStorage.getItem("lng") == "ar"
					) {
						if (stageid == "S03") {
							thiredActionName = "تعيين شريك اعمال التخطيط الاستراتيجي";
						} else if (stageid == "S05") {
							thiredActionName = "تعيين شريك اعمال الأداء";
						}
					} else {
						if (stageid == "S03") {
							thiredActionName = "Assign Strategic Planning Business Partner";
						} else if (stageid == "S05") {
							thiredActionName = "Assign Planning Business Partner";
						}
					}
					$(".navbar.page-nav.px-5").after(
						'<div class="WF-btn"><div class="SubmitTitleRow mt-3"><div class="wfTitle"><span data-trans-workflow class="Resources">سير العمل</span></div><div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button></div></div><div class="apprv"><span class="approveStageName">' +
						actionbuttonTitle +
						'</span><button data-trans-accept onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="btn pop-green Resources" type="button" ></button><button data-trans-rejection  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="btn pop-green rejection Resources"  type="button"></button><button  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'ApprovedWithAssigned\')" class="btn pop-green Resources" type="button" ><span class="Resources">' +
						thiredActionName +
						"</span></button></div></div>"
					);
					//delegation btn
					$(".btnactionrow > h2.approvalHeader").append('<div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button></div>')
					$(".btnactionrow .form-btns-wrapper").append(
						'<div class="WF-btn"><div class="apprv"><span class="approveStageName"><p class="Resources task-name" data-trans-taskname></p>' +
						actionbuttonTitle +
						'</span><div class="wf-btn-wrapper-new d-flex"><button data-trans-accept onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Approval\')" class="btn pop-green Resources" type="button" ></button><button data-trans-rejection  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(false, \'Approval\')" class="btn pop-green rejection Resources"  type="button"></button><button  onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'ApprovedWithAssigned\')" class="btn pop-green Resources" type="button" ><span class="Resources">' +
						thiredActionName +
						"</span></button></div></div>"
					);
					$("div.Container").fadeIn();
					$("div.cust-loader").fadeOut();
					forFormSubmitHTMLStatus = setInterval(function () {
						Task_PCODE_Data_Request_WFs.g.hidefields();
					}, 100);
					break;
				case "Submit":
					// $('.DahsFormTitle > button').hide();
					$(".navbar.page-nav.px-5").after(
						'<div class="WF-btn"><div class="SubmitTitleRow mt-3"><div class="wfTitle"><span data-trans-workflow class="Resources">سير العمل</span></div><div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Submit\')"  class="btn pop-green Resources" type="button"><span  class=" beencompletedpadd">' +
						actionbuttonTitle +
						"</span></button></div></div></div>"
					);
					//delegation btn
					$(".btnactionrow > h2.approvalHeader").append('<div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button></div>');
					$(".btnactionrow .form-btns-wrapper").append(
						'<div class="WF-btn"><div class="apprv"><span class="approveStageName"><p class="Resources task-name" data-trans-taskname></p>' +
						actionbuttonTitle +
						'</span><div class="wf-btn-wrapper-new d-flex"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Submit\')"  class="btn pop-green Resources" type="button"><span  class=" beencompletedpadd Resources" data-trans-wfsubmit>' +
						actionbuttonTitle +
						"</span></button></div></div></div>"
					); //style="float: left;font-size: 17px;"
					$("div.Container").fadeIn();
					$("div.cust-loader").fadeOut();
					forFormSubmitHTMLStatus = setInterval(function () {
						Task_PCODE_Data_Request_WFs.g.hidefields();
					}, 100);
					break;
				case "SubmitProject":
					// console.log("SubmitProject")
					$(".navbar.page-nav.px-5").after(
						'<div class="WF-btn"><div class="SubmitTitleRow mt-3"><div class="wfTitle"><span data-trans-workflow class="Resources">سير العمل</span></div><div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button><button onclick="NewProjectTask_Edit_Data.init();"  class="btn pop-green Resources" type="button"><span  class=" beencompletedpadd">' +
						actionbuttonTitle +
						"</span></button</div>div></div>"
					); //
					$(".btnactionrow .form-btns-wrapper").append(
						'<div class="WF-btn"><div class="SubmitTitleRow mt-3"><div class="wfTitle"><span data-trans-workflow class="Resources">سير العمل</span></div><div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button><button onclick="NewProjectTask_Edit_Data.init();"  class="btn pop-green Resources" type="button"><span  class=" beencompletedpadd">' +
						actionbuttonTitle +
						"</span></button</div>div></div>"
					); //
					$("div.Container").fadeIn();
					$("div.cust-loader").fadeOut();
					forFormSubmitHTMLStatus = setInterval(function () {
						Task_PCODE_Data_Request_WFs.g.hidefields();
					}, 100);
					break;
				case "New":
					// $('.DahsFormTitle > button').hide();
					$(".navbar.page-nav.px-5").after(
						'<div class="WF-btn"><div class="SubmitTitleRow mt-3"><div class="wfTitle"><span data-trans-workflow class="Resources">سير العمل</span></div><div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button></div><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'New\')" " class="btn pop-green" type="button"><span  class=" beencompletedpadd">' +
						actionbuttonTitle +
						"</span></button></div></div>"
					); //style="float: left;font-size: 17px;
					$(".btnactionrow .form-btns-wrapper").append(
						'<div class="WF-btn"><div class="SubmitTitleRow mt-3"><div class="wfTitle"><span data-trans-workflow class="Resources">سير العمل</span></div><div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button></div><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'New\')" " class="btn pop-green" type="button"><span  class=" beencompletedpadd">' +
						actionbuttonTitle +
						"</span></button></div></div>"
					); //style="float: left;font-size: 17px;
					$("div.Container").fadeIn();
					$("div.cust-loader").fadeOut();
					forFormSubmitHTMLStatus = setInterval(function () {
						Task_PCODE_Data_Request_WFs.g.hidefields();
					}, 100);
					break;
				case "Resubmit":
					// $('.DahsFormTitle > button').hide();
					$(".navbar.page-nav.px-5").after(
						'<div class="WF-btn"><div class="SubmitTitleRow mt-3"><div class="wfTitle"><span data-trans-workflow class="Resources">سير العمل</span></div><div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button><button data-trans-resend onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Submit\')" class="btn pop-green Resources" type="button"></button></div></div></div>'
					);
					$(".btnactionrow .form-btns-wrapper").append(
						'<div class="WF-btn"><div class="SubmitTitleRow mt-3"><div class="wfTitle"><span data-trans-workflow class="Resources">سير العمل</span></div><div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button><button data-trans-resend onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Submit\')" class="btn pop-green Resources" type="button"></button></div></div></div>'
					);
					$("div.Container").fadeIn();
					$("div.cust-loader").fadeOut();
					forFormSubmitHTMLStatus = setInterval(function () {
						Task_PCODE_Data_Request_WFs.g.hidefields();
					}, 100);
					break;

				case "SubmitField":
					$(".navbar.page-nav.px-5").after(
						'<div class="WF-btn"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'SubmitField\')" class="btn pop-green" type="button"><span  class=" beencompletedpadd">' +
						actionbuttonTitle +
						"</span></button></div>"
					);
					//delegation btn
					$(".btnactionrow > h2.approvalHeader").append('<div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button></div>');
					$(".btnactionrow .form-btns-wrapper").append(
						'<div class="WF-btn"><div class="apprv"><span class="approveStageName"><p class="Resources task-name" data-trans-taskname></p>' +
						actionbuttonTitle +
						'</span><div class="wf-btn-wrapper-new d-flex"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'SubmitField\')" class="btn pop-green" type="button"><span  class="beencompletedpadd Resources" data-trans-wfsubmitfield>' +
						actionbuttonTitle +
						"</span></button></div></div></div>"
					);
					if (currentstage != "S02" && workflowname == "Project") {
						// $(
						// 	".CFIELD input,.CFIELD .PPField ,.CFIELD select,.CFIELD textarea"
						// ).attr("disabled", true);
						// $(
						// 	".CFIELD[data-isWfenablestageID=" +
						// 	currentstage +
						// 	"] input,.CFIELD[data-isWfenablestageID=" +
						// 	currentstage +
						// 	"] .PPField ,.CFIELD[data-isWfenablestageID=" +
						// 	currentstage +
						// 	"] select,.CFIELD[data-isWfenablestageID=" +
						// 	currentstage +
						// 	"] textarea"
						// ).attr("disabled", false);
						// $("[type=file]").attr("disabled", false);
					}
					forFormSubmitHTMLStatus = setInterval(function () {
						Task_PCODE_Data_Request_WFs.g.hidefields();
					}, 100);
					break;

				case "Attach":
					$(".navbar.page-nav.px-5").after(
						'<div class="WF-btn"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Attach\')" class="btn pop-green" type="button"><span  class=" beencompletedpadd">' +
						actionbuttonTitle +
						"</span></button></div>"
					);
					$(".btnactionrow .form-btns-wrapper").append(
						'<div class="WF-btn"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Attach\')" class="btn pop-green" type="button"><span  class=" beencompletedpadd">' +
						actionbuttonTitle +
						"</span></button></div>"
					);
					if (currentstage != "S02" && workflowname == "Project") {
						// $(
						// 	".CFIELD input,.CFIELD .PPField ,.CFIELD select,.CFIELD textarea"
						// ).attr("disabled", true);
						// $(
						// 	".CFIELD[data-isWfenablestageID=" +
						// 	currentstage +
						// 	"] input,.CFIELD[data-isWfenablestageID=" +
						// 	currentstage +
						// 	"] .PPField ,.CFIELD[data-isWfenablestageID=" +
						// 	currentstage +
						// 	"] select,.CFIELD[data-isWfenablestageID=" +
						// 	currentstage +
						// 	"] textarea"
						// ).attr("disabled", false);
						// $("[type=file]").attr("disabled", false);
					}
					forFormSubmitHTMLStatus = setInterval(function () {
						Task_PCODE_Data_Request_WFs.g.hidefields();
					}, 100);
					break;

				case "CheckList":
					$(".navbar.page-nav.px-5").after(
						'<div class="WF-btn"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'CheckList\')" class="btn pop-green Resources" type="button"><span  class=" beencompletedpadd">' +
						actionbuttonTitle +
						"</span></button></div>"
					);
					$(".btnactionrow .form-btns-wrapper").append(
						'<div class="WF-btn"><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'CheckList\')" class="btn pop-green Resources" type="button"><span  class=" beencompletedpadd">' +
						actionbuttonTitle +
						"</span></button></div>"
					);
					forFormSubmitHTMLStatus = setInterval(function () {
						Task_PCODE_Data_Request_WFs.g.hidefields();
					}, 100);
					break;
				case "ExecuteCR":
					// console.log("Submit SubmitSubmitSubmit with JUMANA")
					// $('.DahsFormTitle > button').hide();
					$(".navbar.page-nav.px-5").after(
						'<div class="WF-btn"><div class="SubmitTitleRow mt-3"><div class="wfTitle"><span data-trans-workflow class="Resources">سير العمل</span></div><div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Submit\')"  class="btn pop-green Resources" type="button"><span  class=" beencompletedpadd">' +
						actionbuttonTitle +
						"</span></button></div></div></div>"
					); //style="float: left;font-size: 17px;"
					$(".btnactionrow .form-btns-wrapper").append(
						'<div class="WF-btn"><div class="SubmitTitleRow mt-3"><div class="wfTitle"><span data-trans-workflow class="Resources">سير العمل</span></div><div class="wf-delegate-btn"><button class="btn pop-green delegate-btn "  type="button"  onclick="Delegatepopup.init(\'' +
						taskid +
						'\')"><i class="fas fa-users" aria-hidden="true"></i><span data-trans-delegate class="Resources"></span></button><button onclick="Task_PCODE_Data_Request_WFs.g.addcomments(true, \'Submit\')"  class="btn pop-green Resources" type="button"><span  class=" beencompletedpadd">' +
						actionbuttonTitle +
						"</span></button></div></div></div>"
					); //style="float: left;font-size: 17px;"
					$("div.Container").fadeIn();
					$("div.cust-loader").fadeOut();
					forFormSubmitHTMLStatus = setInterval(function () {
						Task_PCODE_Data_Request_WFs.g.hidefields();
					}, 100);
					break;
			}
			dialogBoxHtml = `
<div id="myModal">
<div class="modal-dialog">
<div class="modal-content">
<button onclick='document.getElementById(&#39;myModal&#39;).style.visibility=&#39;hidden&#39;' aria-hidden="true" id="closex" class="close" data-dismiss="modal" type="button" style="position:absolute">×</button>
<ul class="nav nav-tabs notesTabs" id="notesTabs" role="tablist">
</ul>
<div class="tab-content" id="tasknotes">
</div>
</div>
</div>
</div>`;
			$(".WF-btn").prepend(dialogBoxHtml);


			Workflow_Note_Data_Request_WFs.init();
			changeResources();
		},
		handleids: function () {
			if (workflowname == "Project") {
				curstage_org = Stages_ORG_Data_Request_WFs.g.StagesArray.filter(
					function (obj) {
						return obj.stage == stageid;
					}
				);

				if (nxtstageidarr) {
					curstage_org_nxt = Stages_ORG_Data_Request_WFs.g.StagesArray.filter(
						(item) => nxtstageidarr.includes(item.stage)
					);
				}
				if (prvstageid != null) {
					curstage_org_prv = Stages_ORG_Data_Request_WFs.g.StagesArray.filter(
						(item) => prvstageidarr.includes(item.stage)
					);
					curstage_prv = ProjectStages_Data_Request_WFs.g.StagesArray.filter(
						function (obj) {
							return obj.stage == curstage_org_prv[0].stage;
						}
					);
				}
				curstage = ProjectStages_Data_Request_WFs.g.StagesArray.filter(
					function (obj) {
						return obj.stage == curstage_org[0].stage;
					}
				);
				if (nxtstageidarr) {
					curstage_nxt = ProjectStages_Data_Request_WFs.g.StagesArray.filter(
						function (obj) {
							return obj.stage == curstage_org_nxt[0].stage;
						}
					);
				}
			}
			formakesureishtmlStatus = setInterval(function () {
				Task_PCODE_Data_Request_WFs.g.makesureishtml();
			}, 100);
		},
		hidefields: function () {
			if ($(".IFIELD").length) {
				clearInterval(forFormSubmitHTMLStatus);
				$(".CSformbuttons button").hide();
				$(".IFIELD,.formcontents").hide();
				$("#" + fieldtoedit)
					.closest(".formcontents")
					.show();
				$("#" + fieldtoedit)
					.closest(".IFIELD")
					.show();
				$("body").append(
					"<style>.add-New-Detail{display:none!important}</style>"
				);
				if (tasktype == "Attach") {
					$("#getFile").parent().hide();
					$(".container-body").append(
						'<div class="py-5 border-bottom section-container WF-Attach" data-groups="">' +
						'<div class="form-row">' +
						'<div class="col-md-4 mb-4"><h3>"' +
						stagename +
						'" Attachments</h3><span class="font-14"></span></div>' +
						'<div class="col-md-8 white-box p-4 fieldset-container">' +
						'<div class="col-md-6 CFIELD" data-groups="" >' + //style="display: flex;align-items: center;"
						'<label required for="getFile"  undefined="">Attachments</label>' + //class="custom-file-upload"
						'<input required type="file" multiple="multiple" placeholder="Attachment" class="form-control SPIField" id="getFile" style="display:block">' +
						"</div>" +
						'<div class="col-md-6 CFIELD rfpoptions" data-groups="" >' +
						'<label required for="forattach">Attachment</label>' +
						"</div>" +
						'<div class="add-New-Detail-wrapper"><a class="add-New-Attach" href="javascript:"><i class="fas fa-plus"></i></a></div>' +
						"</div></div></div>"
					);
					$(".add-New-Attach").click(function () {
						$(
							'<div class="col-md-6 CFIELD" data-groups="" >' + //style="display: flex;align-items: center;"
							'<label required for="getFile"  undefined="">Attachments</label>' + //class="custom-file-upload"
							'<input required type="file" multiple="multiple" placeholder="Attachments" class="form-control SPIField" id="getFile" style="display:block">' +
							"</div>" +
							'<div class="col-md-6 CFIELD rfpoptions" data-groups="" style="display:undefined">' +
							'<label required for="forattach">Attachments</label>' +
							"</div>"
						).insertBefore($(this).parent());
					});
				}
				$("div.Container").fadeIn();
				$("div.cust-loader").fadeOut();
			}
		},
		makesureishtml: function () {
			if ($(".fieldset-container").length) {
				//|| $('#filterColumn').length || $('h2.PNameTitle').length || $('span.ms-pagetitle').length
				clearInterval(formakesureishtmlStatus);
				Task_PCODE_Data_Request_WFs.g.Handle_Take_Action();
			} else if (
				$(".navbar.page-nav.px-5").length > 0 &&
				(window.location.href.toLowerCase().indexOf("projectdetails") > -1 ||
					window.location.href.toLowerCase().indexOf("listing.aspx") > -1 ||
					window.location.href.toLowerCase().indexOf("targets.aspx") > -1 ||
					window.location.href.toLowerCase().indexOf("projecthome.aspx") > -1)
			) {
				clearInterval(formakesureishtmlStatus);
				Task_PCODE_Data_Request_WFs.g.Handle_Take_Action();
			}
		},
		addcomments: function (state, version, withNote = false) {
			stageState = state; // added to handle WF Notes
			if (workflowname == "Project") {
				if (version == "Approval" || version == "Submit") {
					if (
						localStorage.getItem("lng") == null ||
						localStorage.getItem("lng") == "ar"
					) {
						$("body").append(
							'<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub btn btn-action btn-save" onclick="if( ($(\'#commenttext\').val() && ' +
							!state +
							") || " +
							state +
							" ){BulkEdit(" +
							state +
							"," +
							withNote +
							')}else{$(\'.wrapcomments\').append(\'<p >يرجى تعبئة الملاحظات</p>\')}">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>'
						);
					} else {
						$("body").append(
							'<div class="popupComment"><div class="wrapcomments"><label>Notes</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub btn btn-action btn-save" onclick="if( ($(\'#commenttext\').val() && ' +
							!state +
							") || " +
							state +
							" ){BulkEdit(" +
							state +
							"," +
							withNote +
							')}else{$(\'.wrapcomments\').append(\'<p>Please Fill Notes</p>\')}">Send</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">Cancel</button><span style="display:none" class="successmsg">Submitted Successfully</span></div></div></div>'
						);
					}
				} else if (version == "SubmitField") {
					if (
						localStorage.getItem("lng") == null ||
						localStorage.getItem("lng") == "ar"
					) {
						$("body").append(
							'<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub btn btn-action btn-save" onclick="if( ($(\'#commenttext\').val() && ' +
							!state +
							") || " +
							state +
							" ){SubmitField_BulkEdit.preinit(" +
							state +
							"," +
							withNote +
							')}else{$(\'.wrapcomments\').append(\'<p >يرجى تعبئة الملاحظات</p>\')}">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>'
						);
					} else {
						$("body").append(
							'<div class="popupComment"><div class="wrapcomments"><label>Notes</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub btn btn-action btn-save" onclick="if( ($(\'#commenttext\').val() && ' +
							!state +
							") || " +
							state +
							" ){SubmitField_BulkEdit.preinit(" +
							state +
							"," +
							withNote +
							')}else{$(\'.wrapcomments\').append(\'<p >Fill Comments</p>\')}">Send</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">Cancel</button><span style="display:none" class="successmsg">Send Successfully</span></div></div></div>'
						);
					}
				} else if (version == "ApprovedWithAssigned") {
					if (
						localStorage.getItem("lng") == null ||
						localStorage.getItem("lng") == "ar"
					) {
						// (($("#AssignedTo").find("span.sp-peoplepicker-userSpan").length))
						// '<div class="PPField SPIField form-control" type="picker" id="AssignedTo" value="" INppicker=""></div>' +
						$("body").append(
							'<div class="popupComment"><div class="wrapcomments"><label>' +
							thiredActionName +
							'</label><div class="PPField SPIField form-control mb-3" type="picker" id="AssignedTo" value="" INppicker=""></div><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub btn btn-action btn-save" onclick="ThirdActionHandler(' +
							state +
							')">تعيين</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم التعيين</span></div></div></div>'
						);
					} else {
						$("body").append(
							'<div class="popupComment"><div class="wrapcomments"><label>' +
							thiredActionName +
							'</label><div class="PPField SPIField form-control mb-3" type="picker" id="AssignedTo" value="" INppicker=""></div><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub btn btn-action btn-save">Assign</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">Cancel</button><span style="display:none" class="successmsg">Assign Successfully</span></div></div></div>'
						);
					}
					$("body").append(
						"<style>.sp-peoplepicker-initialHelpText {opacity:0}</style>"
					);
					$("div[type=picker]").each(function () {
						var mp = new MyPeoplePicker();
						mp.init($(this).attr("id"), {
							PrincipalAccountType: "User",
							AllowMultipleValues: false,
						});
					});
					// $("span.sp-peoplepicker-userSpan").length
					// if ($("#AssignedTo").find("span.sp-peoplepicker-userSpan").length) {
					// 	var id = $("#AssignedTo").attr("id");
					// 	ppp =
					// 		$("#AssignedTo").find("span.sp-peoplepicker-userSpan").attr("sid") ==
					// 			undefined
					// 			? ""
					// 			: SP.FieldUserValue.fromUser(
					// 				$("#AssignedTo")
					// 					.find("span.sp-peoplepicker-userSpan")
					// 					.attr("sid")
					// 			); //.split('|').slice(-1)[0]
					// 	taskOwner = ppp;
					// 	userName = encodeURIComponent(ppp.get_lookupValue());
					// }
					window.setTimeout(function () {
						$(".sp-peoplepicker-initialHelpText").text("");
						$("body").append(
							"<style>.sp-peoplepicker-initialHelpText {opacity:1!important}</style>"
						);
					}, 777);
					$("body").append(
						"<style>div.PPField * {direction: rtl;text-align:right}</style>"
					);
				} else if (version == "Attach") {
					if (
						localStorage.getItem("lng") == null ||
						localStorage.getItem("lng") == "ar"
					) {
						$("body").append(
							'<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub btn btn-action btn-save" onclick="if( ($(\'#commenttext\').val()  && ' +
							!state +
							") || " +
							state +
							" ){WF_UploadFiles.preinit(" +
							state +
							')}else{$(\'.wrapcomments\').append(\'<p >يرجى تعبئة الملاحظات</p>\')}">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>'
						);
					} else {
						$("body").append(
							'<div class="popupComment"><div class="wrapcomments"><label>Notes</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub btn btn-action btn-save" onclick="if( ($(\'#commenttext\').val() && ' +
							!state +
							") || " +
							state +
							" ){WF_UploadFiles.preinit(" +
							state +
							')}else{$(\'.wrapcomments\').append(\'<p>Please Fill Notes</p>\')}">Send</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">Cancel</button><span style="display:none" class="successmsg">Submitted Successfully</span></div></div></div>'
						);
					}
				} else if (version == "CheckList") {
					if (
						localStorage.getItem("lng") == null ||
						localStorage.getItem("lng") == "ar"
					) {
						$("body").append(
							'<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub btn btn-action btn-save" onclick="if( ($(\'#commenttext\').val() &&  && ' +
							!state +
							") || " +
							state +
							" ){Edit_File_Details_Submit.init(" +
							state +
							')}else{$(\'.wrapcomments\').append(\'<p >يرجى تعبئة الملاحظات</p>\')}">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>'
						);
					} else {
						$("body").append(
							'<div class="popupComment"><div class="wrapcomments"><label>Notes</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub btn btn-action btn-save" onclick="if( ($(\'#commenttext\').val() && ' +
							!state +
							") || " +
							state +
							" ){BulkEdit(" +
							state +
							')}else{$(\'.wrapcomments\').append(\'<p>Please Fill Notes</p>\')}">Send</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">Cancel</button><span style="display:none" class="successmsg">Submitted Successfully</span></div></div></div>'
						);
					}
				}
			} else {
				if (
					localStorage.getItem("lng") == null ||
					localStorage.getItem("lng") == "ar"
				) {
					$("body").append(
						'<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub btn btn-action btn-save" onclick="SubmitField_BulkEdit.preinit(' +
						state +
						"," +
						withNote +
						')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>'
					);
				} else {
					$("body").append(
						'<div class="popupComment"><div class="wrapcomments"><label>Notes</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub btn btn-action btn-save" onclick="SubmitField_BulkEdit.preinit(' +
						state +
						"," +
						withNote +
						')">Send</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">Cancel</button><span style="display:none" class="successmsg">Submitted Successfully</span></div></div></div>'
					);
				}
			}
		},
	},
};
//*****5 */
var PCODE_Stage_Data_Request_WFs = {
	onSuccess: function (sender, args) {
		var collListItem = PCODE_Stage_Data_Request_WFs.g.collListItem;
		var listItemEnum = collListItem.getEnumerator();
		while (listItemEnum.moveNext()) {
			//loop through list items
			var oListItem = listItemEnum.get_current();
			projectstagename = oListItem.get_item("Stage");
			taskcomments = oListItem.get_item("Comments");
		}
		//*****6 */
		ProjectStages_Data_Request_WFs.init();
	},
	onError: function (sender, args) {
		console.log(
			"Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
		);
	},
	// The main Initialization function
	init: function () {
		var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext.get_web().get_lists().getByTitle("Projects"); //list name
		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml(
			'<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
			peojectC +
			"</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>"
		); //caml query
		PCODE_Stage_Data_Request_WFs.g.collListItem = oList.getItems(camlQuery);
		clientContext.load(PCODE_Stage_Data_Request_WFs.g.collListItem);
		clientContext.executeQueryAsync(
			Function.createDelegate(this, PCODE_Stage_Data_Request_WFs.onSuccess),
			Function.createDelegate(this, PCODE_Stage_Data_Request_WFs.onError)
		);
	},
	// Global variables
	g: {},
};
// start of calls
//*****2 */
if (window.location.href.toLowerCase().indexOf("&wfs") > -1) {
	// console.log('54321');
	$(document).ready(function () {



		WFuserCalls.get_CurrentUser();
		$("body").append(
			"<style>.cust-loader {position:fixed;margin: 0 auto;top: 50%;right: 50%;width: 77px;height: 77px;}div.Container, .DahsFormTitle > button.CSformSubmit, .DahsFormTitle > button.CSformDelete,.DahsFormTitle > button.CSformEscalate,#btnGroupDrop1, .CSformbuttons{display:none}</style>"
		);
		SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
			forTasksHTMLStatus = setInterval(function () {
				Task_PCODE_Data_Request_WFs.preinit();
			}, 500);
		});
	});
}
if (
	isView &&
	isideapage &&
	window.location.href.toLowerCase().indexOf("&wfs") == -1
) {
	$(document).ready(function () {
		Disable_Idea_Edit_Button.preinit();
	});
}
//phases-stages
//*****7 */
var ProjectStages_Data_Request_WFs = {
	onSuccess: function (sender, args) {
		var collListItem = ProjectStages_Data_Request_WFs.g.collListItem;
		var listItemEnum = collListItem.getEnumerator();
		while (listItemEnum.moveNext()) {
			var oListItem = listItemEnum.get_current();
			ProjectStages_Data_Request_WFs.g.StagesArray.push({
				stage: oListItem.get_item("StageCode"),
				phase: oListItem.get_item("PhaseCode"),
				stageid: oListItem.get_id(),
				pcode: oListItem.get_item("ProjectCode"),
			});
		}
		// console.log('77', ProjectStages_Data_Request_WFs.g.StagesArray[0]);
		//alert(ProjectStages_Data_Request_WFs.g.StagesArray[0].stageid);
		Stages_ORG_Data_Request_WFs.init();
	},
	onError: function (sender, args) {
		console.log(
			"Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
		);
	},
	// The main Initialization function
	init: function () {
		var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext
			.get_web()
			.get_lists()
			.getByTitle("Project Stages");
		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml(
			"<View><Query><Where><Eq><FieldRef Name='ProjectCode'/><Value Type=\"Text\">" +
			peojectC +
			"</Value></Eq></Where><OrderBy><FieldRef Name='ListSort' Ascending='True' /></OrderBy></Query></View>"
		);
		ProjectStages_Data_Request_WFs.g.collListItem = oList.getItems(camlQuery);
		clientContext.load(ProjectStages_Data_Request_WFs.g.collListItem);
		clientContext.executeQueryAsync(
			Function.createDelegate(this, ProjectStages_Data_Request_WFs.onSuccess),
			Function.createDelegate(this, ProjectStages_Data_Request_WFs.onError)
		);
	},
	// Global variables
	g: {
		StagesArray: [],
	},
};
var Stages_ORG_Data_Request_WFs = {
	onSuccess: function (sender, args) {
		var collListItem = Stages_ORG_Data_Request_WFs.g.collListItem;
		var listItemEnum = collListItem.getEnumerator();
		Stages_ORG_Data_Request_WFs.g.StagesArray = [];
		while (listItemEnum.moveNext()) {
			var oListItem = listItemEnum.get_current();
			Stages_ORG_Data_Request_WFs.g.StagesArray.push({
				phase: oListItem.get_item("RelatedPhase"),
				stage: oListItem.get_item("Title"),
				relatedURL: oListItem.get_item("RelatedURL"),
				stageid: oListItem.get_id(),
			});
		}
		// console.log(Stages_ORG_Data_Request_WFs.g.StagesArray + "123");
		// console.log('Stages_ORG_Data_Request_WFs');
		//*****9 */
		Task_PCODE_Data_Request_WFs.g.handleids();
	},
	onError: function (sender, args) {
		console.log(
			"Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
		);
	},
	// The main Initialization function
	init: function (peojectC, type, taskid, nxtstageid, prvstageid, stageid) {
		//console.log('asdasd');
		var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext.get_web().get_lists().getByTitle("Stages");
		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml(
			"<View><Query><Where><Eq><FieldRef Name='Enabled'/><Value Type='Integer'>1</Value></Eq></Where><OrderBy><FieldRef Name='ListSort' Ascending='True' /></OrderBy></Query></View>"
		);
		Stages_ORG_Data_Request_WFs.g.collListItem = oList.getItems(camlQuery);
		clientContext.load(Stages_ORG_Data_Request_WFs.g.collListItem);
		clientContext.executeQueryAsync(
			Function.createDelegate(this, Stages_ORG_Data_Request_WFs.onSuccess),
			Function.createDelegate(this, Stages_ORG_Data_Request_WFs.onError)
		);
	},
	// Global variables
	g: {
		StagesArray: [],
	},
};
//end phases-stages
//for all workflows
window.isWfFirst_Upload = true;

// upload file in wf case

var SubmitField_BulkEdit = {
	preinit: function (state, withNote = false) {



		globalStateSubmitField = state;
		if (stageid == "S01" && isWfFirst_Upload) {
			var WF_Fileelements, WF_fileCount;

			$("input[type=file]").each(function (e) {
				WF_fileCount += document.querySelector("#" + $(this).attr("id")).files
					.length;
			});

			if (WF_fileCount) {
				WF_UploadFiles.preinit(true);
			}
		}
		if (stageid == "S01") {
			if ($("span.sp-peoplepicker-userSpan").length == 0) {
				$("#ProjectManager").addClass("is-invalid");
			} else {
				$("#ProjectManager").removeClass("is-invalid");
			}
		}

		if (!state || state == 2) {
			withNote = true;
		}
		var noteBoxVal = "";
		noteBoxVal = document.getElementById("commenttext").value;
		noteBoxVal = noteBoxVal.trim();
		if (
			localStorage.getItem("lng") == null ||
			localStorage.getItem("lng") == "ar"
		) {
			if (withNote && noteBoxVal == "") {
				return $(".wrapcomments").append("<p>يرجى تعبئة الملاحظات</p>");
			}
		} else {
			if (withNote && noteBoxVal == "") {
				return $(".wrapcomments").append("<p>Please Fill The Note</p>");
			}
		}
		if (
			workflowname == "Project" &&
			tasktype == "SubmitField"

			//&& $(".form-control.is-invalid").length == 0
		) {
			if (stageid == "S01" && $(".was-validated .form-control:invalid").length == 0) {
				SubmitField_BulkEdit.init(state);
			} else {
				Edit_Data_Submit.preinit();
			}
		} else if (
			workflowname != "Project" &&
			tasktype == "SubmitField"
			// && $(".was-validated .form-control:invalid").length == 0
		) {
			Edit_Data_Submit.preinit(); // edit from main function for all gwf that have submitfield type

			// SubmitField_BulkEdit.init(state);
		} else if (
			// will invoke if the wf not project and not submitfield type
			workflowname != "Project" &&
			tasktype != "SubmitField"
			&& $(".was-validated .form-control:invalid").length == 0
		) {
			// console.log("HEre We Are for esc", state)
			SubmitField_BulkEdit.init(state);
		} else {
			if (stageid == "S01") {
				var $container = $("#s4-workspace"),
					$scrollTo = $(".was-validated .form-control:invalid");
				if ($scrollTo.length == 0) {
					$scrollTo = $("[type=picker][required]");
				}
				$container.animate({
					scrollTop:
						$scrollTo.offset().top -
						$container.offset().top +
						$container.scrollTop() -
						120,
				});
				$(".popupComment").remove();
			}
			$(".pop-buttons").append("<p>Please fill above info</p>");
			$(".popupComment").remove();
		}
	},
	init: function (state) {
		$("h2.DahsFormTitle").append('<div class="cust-loader"></div>  ');
		// $('button.pop-green').attr("disabled", true);
		$(".commentsub").attr("disabled", true);
		var context = SP.ClientContext.get_current();
		var dfd = $.Deferred();
		//Get list from host web

		var programList = context.get_web().get_lists().getByTitle(bulkeditlist);
		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml(bulkeditquery);
		//Get items by Query
		var progColl = programList.getItems(camlQuery);
		var todayDate = new Date();
		var todayDateFormatter =
			todayDate.getMonth() +
			1 +
			"/" +
			todayDate.getDate() +
			"/" +
			todayDate.getFullYear();
		//Load item collection
		context.load(progColl);
		context.executeQueryAsync(
			function () {
				var currentItemArray = [];

				//Check itemcollection count greater than 0
				if (progColl.get_count() > 0) {
					var progEnum = progColl.getEnumerator();
					while (progEnum.moveNext()) {
						var currentItem = progEnum.get_current();
						var progTitle = currentItem.get_item("Title");
						var currentId = currentItem.get_item("ID");

						var items = programList.getItemById(currentId);
						var crBody, crUpdateType;
						if (isExecuteCR) {
							crBody = eval(currentItem.get_item("ChangeBody"));
							crUpdateType = currentItem.get_item("UpdateType");
						}
						//set
						if (workflowname == "Project") {
							$(
								".section-container:not([data-target_list]) .CFIELD> input[type=text], .section-container:not([data-target_list]) .CFIELD> input[type=number],  .section-container:not([data-target_list]) .CFIELD> input[type=float],.section-container:not([data-target_list]) .CFIELD>  input[type=date], .section-container:not([data-target_list]) .CFIELD>  input[type=date],.section-container:not([data-target_list]) .CFIELD> .datetimeinputs input[type=datetime-local], .section-container:not([data-target_list]) .CFIELD> input[type=radio], .section-container:not([data-target_list]) .CFIELD> input[type=checkbox], .section-container:not([data-target_list]) .CFIELD> div[type=picker], .section-container:not([data-target_list]) .CFIELD> select[type=dropdown], .section-container:not([data-target_list]) .CFIELD>  textarea, .section-container:not([data-target_list]) .CFIELD > .multiselect-container"
							).each(function () {
								if ($(this).attr("type") == "picker") {
									if ($(this).find("span.sp-peoplepicker-userSpan").length) {
										var id = $(this).attr("INppicker");
										var ppp =
											$("span.sp-peoplepicker-userSpan").attr("sid") ==
												undefined
												? ""
												: SP.FieldUserValue.fromUser(
													$("span.sp-peoplepicker-userSpan").attr("sid")
												);
										items.set_item(id, ppp);
									}
								} else if ($(this).attr("type") == "date") {
									if ($(this).hasClass("withTime")) {
										var dateval = $(this).val();
										var timeval = $(this)
											.closest(".CFIELD")
											.find("#Time")
											.val();
										var datetime = new Date(dateval);
										// format the output
										var month = datetime.getMonth() + 1;
										var day = datetime.getDate();
										var year = datetime.getFullYear();
										var timezoneOffset = datetime.getTimezoneOffset() / 60;
										var hour = datetime.getHours() + timezoneOffset;
										if (hour < 10) {
											hour = "0" + hour;
										}
										var min = datetime.getMinutes();
										if (min < 10) {
											min = "0" + min;
										}
										var sec = datetime.getSeconds();
										if (sec < 10) {
											sec = "0" + sec;
										}

										var ydate =
											month +
											"/" +
											day +
											"/" +
											year +
											" " +
											hour +
											":" +
											min +
											":" +
											sec;

										if (dateval && timeval)
											items.set_item($(this).attr("id"), ydate);
									} else {
										var dateval = $(this).val().replace("-", "/");
										var ydate = !dateval
											? ""
											: [dateval.slice(5, 10), dateval.slice(0, 4)]
												.join("/")
												.replace("-", "/");
										if (dateval) items.set_item($(this).attr("id"), ydate);
									}
								} else if ($(this).attr("type") == "datetime-local") {
									if ($(this).hasClass("withTime")) {
										var dateval = $(this).val();
										var datetime = new Date(dateval);
										console.log("datetime", datetime);
										// format the output
										var month = datetime.getMonth() + 1;
										var day = datetime.getDate();
										var year = datetime.getFullYear();
										var timezoneOffset = datetime.getTimezoneOffset() / 60;
										var hour = datetime.getHours() + timezoneOffset;
										if (hour < 10) {
											hour = "0" + hour;
										}
										var min = datetime.getMinutes();
										if (min < 10) {
											min = "0" + min;
										}
										var sec = datetime.getSeconds();
										if (sec < 10) {
											sec = "0" + sec;
										}

										var ydate =
											month +
											"/" +
											day +
											"/" +
											year +
											" " +
											hour +
											":" +
											min +
											":" +
											sec;

										if (dateval) items.set_item($(this).attr("id"), ydate);
									}
								} else if ($(this).attr("type") == "radio") {
									var checkedvalue = $(
										'input[id="' + $(this).attr("id") + '"]:checked'
									).val();
									if (checkedvalue == "yes") {
										items.set_item($(this).attr("id"), "yes");
									} else if (checkedvalue == "no") {
										items.set_item($(this).attr("id"), "no");
									} else items.set_item($(this).attr("id"), checkedvalue);

									if (SP_ListName == "Deliverables" && checkedvalue == "yes") {
										items.set_item("Stage", DVfirstStage);
									}
								} else if ($(this).attr("type") == "checkbox") {
									var checkedvalue = $(
										'input[id="' + $(this).attr("id") + '"]:checked'
									).length;
									if (checkedvalue) items.set_item($(this).attr("id"), true);
									else items.set_item($(this).attr("id"), false);
								} else if ($(this).attr("type") == "dropdown") {
									items.set_item($(this).attr("id"), $(this).val());
									var SubmitForApprovalValue;
									if ($(this).attr("id") == "SubmitForApproval") {
										SubmitForApprovalValue = $(this).val();
									}
									if (
										SP_ListName == "ChangeRequest" &&
										SubmitForApprovalValue == "yes"
									) {
										items.set_item("Stage", CRfirstStage);
									}
								} else if ($(this).hasClass("percentagefield")) {
									items.set_item($(this).attr("id"), $(this).val() / 100);
								} else if ($(this).attr("type") == "multiselect") {
									var myselections = [];
									$(this)
										.find("input#Revenue:checked")
										.each(function () {
											myselections.push($(this).val());
										});
									myselections = myselections.join(":::");
									items.set_item($(this).attr("myfield"), myselections);
								} else items.set_item($(this).attr("id"), $(this).val());
							});
						} else if (workflowname == "CR") {
							if (state) items.set_item("Stage", nxtstageid);
							else {
								items.set_item("Stage", prvstageid);
								items.set_item("SubmitForApproval", "no");
							}
						} else if (workflowname == "DV") {
							if (state) items.set_item("Stage", nxtstageid);
							else {
								items.set_item("Stage", prvstageid);
								items.set_item("Delivered", "no");
							}
						} else {
							if (state) items.set_item("WFStage", nxtstageid);
							else items.set_item("WFStage", prvstageid);
						}

						// to handle workflowSetValues from json will use it for cr wf purpose
						$(`[data-workflowSetValue]`).each(function (index) {
							var parsingData = eval($(this).data('workflowsetvalue'))
							parsingData.forEach(el => {
								if (el.stages.includes(stageid)) {
									items.set_item(el.fieldName, el.value);
								}
							})
						})
						//



						//Update the item
						items.update();
						//Push item on the array
						currentItemArray.push(items);
						//Load the item Array
						context.load(currentItemArray[currentItemArray.length - 1]);
					}
					context.executeQueryAsync(
						function () {
							//Item Updated sucess
							// console.log("Items are updated Successfully");
							dfd.resolve();

							if (workflowname == "Project") {

								BulkEdit(state);
							} else if (isProjectCancellationRequestWF && stageid == "CL06" && state) {
								Cancel_Project.init();
							} else if (isProjectDeligationsWf && stageid == "TR03") {
								Edit_Project.init();
							} else if (isDeliverabletWF && stageid == "DV05" && state) {
								addCOC.init()
							} else if (isExecuteCR && crUpdateType.includes("automatic")) {
								executeCR.init(crBody);
							} else if ((isVROCRKPI || isMSCRKPI || isLMSCRKPI) && nxtstageid == "approved") {
								changeOnKpiResultDraft(state)
							} else {
								Task_Edit_Data.init();
							}
						},
						function (sender, args) {
							//Item updated fail
							console.log(
								"Request Failed to get  Items :" + args.get_message()
							);
						}
					);
				} else {
					dfd.resolve();
				}
			},
			function (sender, args) {
				$(".loader").hide();
				console.log("Request failed in  List " + args.get_message());
			}
		);
		return dfd.promise();
	},
};

window.Continue_Submit_Field = {
	// continue submit file that will invoke from edit_data_submit after edit on forms
	init: function () {
		Task_Edit_Data.init();
	},
};
//checklist
//to check functionality and business
var Edit_File_Details_Submit = {
	init: function () {
		var clientContext = new SP.ClientContext.get_current();
		var CurrList, oList, itemID;
		$('[file-title="طلب عرض شراء"]').each(function () {
			oList = clientContext
				.get_web()
				.get_lists()
				.getByTitle(ListArray[2].documents);
			itemID = $(this).attr("file-id");
			Edit_File_Details_Submit.g.oListItem = oList.getItemById(itemID);
			$('[type="checkbox"][id^=Check]').each(function () {
				var checkedvalue = $(
					'input[id="' + $(this).attr("id") + '"]:checked'
				).length;
				if (checkedvalue)
					Edit_File_Details_Submit.g.oListItem.set_item(
						$(this).attr("id"),
						true
					);
				else
					Edit_File_Details_Submit.g.oListItem.set_item(
						$(this).attr("id"),
						false
					);
			});
			Edit_File_Details_Submit.g.oListItem.update();
			clientContext.load(Edit_File_Details_Submit.g.oListItem);
		});
		clientContext.executeQueryAsync(
			Function.createDelegate(this, function () {
				BulkEdit(true);
			}),
			Function.createDelegate(this, function (sender, args) {
				console.log(
					"Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
				);
			})
		);
	},
	g: {},
};

//to check functionality and business
var WF_Set_Code_Submit = {
	init: function () {
		var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext.get_web().get_lists().getByTitle(SP_ListName);
		WF_Set_Code_Submit.g.oListItem = oList.getItemById(WF_IID);
		var Code;
		if (listkey != "projects") {
			var prt1 = listkey.substring(0, 2).toUpperCase(),
				prt2 = String(new Date().getFullYear()).slice(4 - 2),
				prt3 = WF_IID.toString().padStart(4, "0");
			Code = prt1 + "-" + prt2 + "-" + prt3;
			WF_Set_Code_Submit.g.oListItem.set_item("Title", Code);
			// console.log(Code);
		} else if (listkey == "projects") {
			Code = PCODE + "-" + IID.toString().padStart(4, "0"); //
			PCODE = Code;
			WF_Set_Code_Submit.g.oListItem.set_item("Title", Code);
		}
		// console.log(PCODE);

		WF_Set_Code_Submit.g.oListItem.update();
		clientContext.load(WF_Set_Code_Submit.g.oListItem);
		clientContext.executeQueryAsync(
			Function.createDelegate(this, function () {
				// console.log(PCODE);
				var WF_Fileelements, WF_fileCount;
				if ($("#getFile").length) {
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
				console.log(
					"Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
				);
			})
		);
	},
	g: {},
};
//
//for project workflow
window.ThirdActionHandler = function (state) {
	if ($("#AssignedTo").find("span.sp-peoplepicker-userSpan").length) {
		SubmitThiredAction.init(state);
	}
};

window.SubmitThiredAction = {
	init: function (state) {
		$("h2.DahsFormTitle").append('<div class="cust-loader"></div>  ');
		// $('button.pop-green').attr("disabled", true);
		$(".commentsub").attr("disabled", true);
		var context = SP.ClientContext.get_current();
		var dfd = $.Deferred();
		//Get list from host web

		var programList = context.get_web().get_lists().getByTitle(bulkeditlist);
		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml(bulkeditquery);
		//Get items by Query
		var progColl = programList.getItems(camlQuery);
		//Load item collection
		context.load(progColl);
		context.executeQueryAsync(
			function () {
				var currentItemArray = [];
				//Check itemcollection count greater than 0
				if (progColl.get_count() > 0) {
					var progEnum = progColl.getEnumerator();
					while (progEnum.moveNext()) {
						var currentItem = progEnum.get_current();
						var progTitle = currentItem.get_item("Title");
						var currentId = currentItem.get_item("ID");
						//Get Item by current ID
						console.log(progTitle, "progTitle progTitle progTitle");
						var items = programList.getItemById(currentId);
						//set
						ppp =
							$("#AssignedTo")
								.find("span.sp-peoplepicker-userSpan")
								.attr("sid") == undefined
								? ""
								: SP.FieldUserValue.fromUser(
									$("#AssignedTo")
										.find("span.sp-peoplepicker-userSpan")
										.attr("sid")
								);

						if (stageid == "S03") {
							items.set_item("StrategicPlanningBusinessPartner", ppp);
						} else if (stageid == "S05") {
							items.set_item("PlanningBusinessPartner", ppp);
						}
						//Update the item
						items.update();
						//Push item on the array
						currentItemArray.push(items);
						//Load the item Array
						context.load(currentItemArray[currentItemArray.length - 1]);
					}
					context.executeQueryAsync(
						function () {
							//Item Updated sucess
							console.log("Items thired Action are updated Successfully");
							dfd.resolve();

							if (thirdActionInfo) {
								nxtstageid = thirdActionInfo;
							}

							BulkEdit(state);
						},
						function (sender, args) {
							//Item updated fail
							console.log(
								"Request Failed to get  Items :" + args.get_message()
							);
						}
					);
				} else {
					dfd.resolve();
				}
			},
			function (sender, args) {
				$(".loader").hide();
				console.log("Request failed in  List " + args.get_message());
			}
		);

		return dfd.promise();
	},
};

//phases-stages update
window.BulkEdit = function (state, withNote = false) {
	var noteBoxVal = "";
	if (document.getElementById("commenttext")) {
		noteBoxVal = document.getElementById("commenttext").value;
		noteBoxVal = noteBoxVal.trim();
	}
	if (
		localStorage.getItem("lng") == null ||
		localStorage.getItem("lng") == "ar"
	) {
		if (withNote && noteBoxVal == "") {
			return $(".wrapcomments").append("<p>يرجى تعبئة الملاحظات</p>");
		}
	} else {
		if (withNote && noteBoxVal == "") {
			return $(".wrapcomments").append("<p>Please Fill The Note</p>");
		}
	}

	$("h2.DahsFormTitle,h2.PNameTitle").append(
		'<div class="cust-loader"></div>  '
	);
	$(".commentsub").attr("disabled", true);
	var context = SP.ClientContext.get_current();
	var dfd = $.Deferred();
	//Get list from host web

	var programList = context.get_web().get_lists().getByTitle("Project Stages");
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml(
		'<View><Query><Where><And><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' +
		peojectC +
		'</Value></Eq><Eq><FieldRef Name="StageCode" /><Value Type="Text">' +
		stageid +
		"</Value></Eq></And></Where></Query><RowLimit>1</RowLimit></View>"
	);
	//Get items by Query
	var progColl = programList.getItems(camlQuery);
	//Load item collection
	context.load(progColl);
	context.executeQueryAsync(
		function () {
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
					items.set_item("Comments", $("textarea#commenttext").val());
					//Get Phase from Project Stages to Update it in Project list
					if (curstage_nxt[0] && state) {
						console.log("nextPhase", curstage_nxt[0].phase);
						nextphaseName = curstage_nxt[0].phase;
						if (nextphaseName == currentItem.get_item("PhaseCode")) {
							curphaseName = currentItem.get_item("PhaseCode");
						} else {
							curphaseName = nextphaseName;
						}
					} else {
						curphaseName = currentItem.get_item("PhaseCode");
					}
					if (state) {
						//if approved set decision true
						items.set_item("Decision", true);
					}
					if (!state) {
						//reject
						items.set_item("Decision", false);
					}
					//Update the item
					items.update();
					//Push item on the array
					currentItemArray.push(items);
					//Load the item Array
					context.load(currentItemArray[currentItemArray.length - 1]);
				}
				context.executeQueryAsync(
					function () {
						//Item Updated sucess
						console.log("Project Stages are updated Successfully");
						dfd.resolve();

						program_BulkEdit(state);
					},
					function (sender, args) {
						//Item updated fail
						console.log(
							"Request Failed to get projectlist Items :" + args.get_message()
						);
					}
				);
			} else {
				dfd.resolve();
			}
		},
		function (sender, args) {
			$(".loader").hide();
			console.log("Request failed in List " + args.get_message());
		}
	);
	return dfd.promise();
};
//end phases-stages update
function program_BulkEdit(state) {
	console.log("inside programbulkedit");

	// console.log("Prog bulk edit")
	var context = SP.ClientContext.get_current();
	var dfd = $.Deferred();
	//Get list from host web
	var programList = context.get_web().get_lists().getByTitle("Projects");
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml(
		"<View><Query><Where><Eq><FieldRef Name='Title'/><Value Type='Text'>" +
		peojectC +
		"</Value></Eq></Where></Query></View>"
	);
	//Get items by Query
	var progColl = programList.getItems(camlQuery);
	//Load item collection
	context.load(progColl);
	context.executeQueryAsync(
		function () {
			var currentItemArray = [];
			//Check itemcollection count greater than 0
			console.log("BEFORE loop");
			if (progColl.get_count() > 0) {
				var progEnum = progColl.getEnumerator();
				while (progEnum.moveNext()) {

					var currentItem = progEnum.get_current();
					var progTitle = currentItem.get_item("Title");
					var currentId = currentItem.get_item("ID");
					var prjstage = currentItem.get_item("Stage");
					var ismultistage = prjstage.indexOf(";") > -1;
					ProjectOwnerPicker = currentItem.get_item("ProjectOwner")
						? currentItem.get_item("ProjectOwner")
						: "";
					ProjectSponsorPicker = currentItem.get_item("ProjectSponsor")
						? currentItem.get_item("ProjectSponsor")
						: "";

					//Get Item by current ID
					var items = programList.getItemById(currentId);
					//set
					items.set_item("Phase", curphaseName);
					if (!ismultistage) {
						// 1 active stage
						if (state) {
							if (taskActionType == "Conditional") {
								try {
									debugger
									taskCondition.forEach((el) => {
										debugger
										let conditionalValue = currentItem.get_item(el.field);
										let conditionalExpression = el.condition;
										conditionalExpression = conditionalExpression.replaceAll(
											"fieldValue",
											conditionalValue
										);
										//check expression if true
										if (evalExpr(conditionalExpression)) {
											items.set_item("Stage", el.targetStage);
											items.set_item("Phase", el.phaseName);
											throw BreakException;
										}
									});
								} catch (e) {
									if (e !== BreakException) throw e;
								}
							} else {
								items.set_item("Stage", nxtstageid);
							}
							// if (prjstage == "S42") {
							// 	items.set_item("Status", "completed1");
							// }
						} else if (!state) {
							items.set_item("Stage", prvstageid);
						}
					} // multiple active stages
					else {
						prjstage = prjstage.split(";");
						prjstage.forEach(function (x, i, a) {
							// (value, index, array)
							if (state) {
								if (x == stageid) {
									// == stage from active task
									a[i] = nxtstageid;
								}
							} else if (!state) {
								if (x == stageid) {
									// == stage from active task
									a[i] = prvstageid;
								}
							}
						});
						var sameVals = prjstage.every((val, i, arr) => val === arr[0]); //check if same stage values
						if (sameVals) {
							items.set_item("Stage", prjstage[0].replaceAll("__", "")); // remove __ if same values
						} else {
							items.set_item("Stage", prjstage.join(";")); // set multiple stages value
						}
					}

					// to handle workflowSetValues from json for Project will use it for cr workflow purpose
					$(`[data-workflowSetValue]`).each(function (index) {
						var parsingData = eval($(this).data('workflowsetvalue'))
						parsingData.forEach(el => {
							if (el.stages.includes(stageid)) {
								items.set_item(el.fieldName, el.value);
							}
						})
					})

					//


					items.set_item("Comments", $("textarea#commenttext").val());
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
				context.executeQueryAsync(
					function () {
						//Item Updated sucess
						ProjectOwnerPicker = ProjectOwnerPicker
							? ProjectOwnerPicker.get_lookupValue()
							: "";
						ProjectSponsorPicker = ProjectSponsorPicker
							? ProjectSponsorPicker.get_lookupValue()
							: "";

						// if (ProjectOwnerPicker) {
						// 	buildTeamResourcesArr.push(ProjectOwnerPicker)
						// }
						// if (ProjectSponsorPicker) {
						// 	buildTeamResourcesArr.push(ProjectSponsorPicker)
						// }
						// console.log("Items are updated Successfully");
						dfd.resolve();
						if (state) {

							// if (stageid == "S01") {

							// 	WFuserCalls.get_AllResources();
							// 	PNAME = peojectC;
							// } else {
							Task_Edit_Data.init();
							// }
						}
					},
					function (sender, args) {
						//Item updated fail
						console.log(
							"Request Failed to get projectlist Items :" + args.get_message()
						);
					}
				);
			} else {
				dfd.resolve();
			}
		},
		function (sender, args) {
			$(".loader").hide();
			console.log("Request failed in projectlist List " + args.get_message());
		}
	);
	return dfd.promise();
}
/******************Edit decision in project stages when we reject  */
function UpdateProjectStages(prvstageid) {
	var disableDecision = false;
	var context = SP.ClientContext.get_current();
	var dfd = $.Deferred();
	//Get list from host web
	var programList = context.get_web().get_lists().getByTitle("Project Stages");
	var camlQuery = new SP.CamlQuery();
	var previousStageId = prvstageid.split(";");
	if (previousStageId.length == "1") {
		camlQuery.set_viewXml(
			"<View><Query><Where><And><Eq><FieldRef Name='ProjectCode'/><Value Type='Text'>" +
			peojectC +
			"</Value></Eq><Eq><FieldRef Name='StageCode'/><Value Type='Text'>" +
			previousStageId +
			"</Value></Eq></And></Where></Query></View>"
		);
	} else {
		// Query = '<View><Query><Where><And><Eq><FieldRef Name=\'ProjectCode\'/><Value Type=\'Text\'>' + peojectC + '</Value></Eq><In><FieldRef Name=\'StageCode\' /><Values>';
		// previousStageId.forEach(function(stage) {
		//     Query += '<Value Type=\'Text\'>' + stage + '</Value>';
		// });
		// Query += '</Values></In></And></Where></Query></View>';
		// camlQuery.set_viewXml(Query);
		Query =
			"<View><Query><Where><And><Eq><FieldRef Name='ProjectCode'/><Value Type='Text'>" +
			peojectC +
			"</Value></Eq><Neq><FieldRef Name='StageCode'/><Value Type='Text'>S01</Value></Neq></And></Where></Query></View>";
		camlQuery.set_viewXml(Query);
	}
	// console.log('camlQuery', camlQuery);
	//Get items by Query
	var progColl = programList.getItems(camlQuery);
	//Load item collection
	context.load(progColl);
	context.executeQueryAsync(
		function () {
			var currentItemArray = [];
			//Check itemcollection count greater than 0
			var count = 0;
			if (progColl.get_count() > 0) {
				var progEnum = progColl.getEnumerator();
				while (progEnum.moveNext()) {
					var currentItem = progEnum.get_current();
					var currentId = currentItem.get_item("ID");
					var items = programList.getItemById(currentId);
					items.set_item("Decision", false);
					items.update();
					currentItemArray.push(items);
					context.load(currentItemArray[currentItemArray.length - 1]);
				}
				context.executeQueryAsync(
					function () {
						//Item Updated sucess
						// console.log("Items are updated Successfully");
						dfd.resolve();
						Task_Edit_Data.init();
					},
					function (sender, args) {
						//Item updated fail
						console.log(
							"Request Failed to get projectlist Items :" + args.get_message()
						);
					}
				);
			} else {
				dfd.resolve();
			}
		},
		function (sender, args) {
			$(".loader").hide();
			console.log("Request failed in projectlist List " + args.get_message());
		}
	);
	return dfd.promise();
}
//*****edit task list that the task not available now */
var Task_Edit_Data = {
	init: function () {
		var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext.get_web().get_lists().getByTitle("Tasks");
		Task_Edit_Data.g.oListItem = oList.getItemById(taskid);
		var stageAction = ""; //added to handle WF Notes
		if (tasktype != "Approval" && tasktype != "TriApproval") {
			stageAction = "submit";
		} else if (tasktype == "Approval" || tasktype == "TriApproval") {
			if (stageState == true) {
				stageAction = "approve";
			} else if (stageState == 2) {
				stageAction = "cancel";
			} else {
				stageAction = "reject";
			}
		}
		Task_Edit_Data.g.oListItem.set_item("Status", "Closed");
		Task_Edit_Data.g.oListItem.set_item("WFInstanceID", null);
		Task_Edit_Data.g.oListItem.set_item(
			"Body",
			$("textarea#commenttext").val()
		);
		Task_Edit_Data.g.oListItem.set_item("TakenAction", stageAction); // check logic
		Task_Edit_Data.g.oListItem.update();
		clientContext.load(Task_Edit_Data.g.oListItem);
		clientContext.executeQueryAsync(
			Function.createDelegate(this, function () {
				// console.log('successful');
				$(".errormsg").hide();

				// if (isChangeRequestPage) {
				// 	window.location =
				// 		_spPageContextInfo.siteAbsoluteUrl +
				// 		"/SitePages/Listing.aspx?ListKey=changerequest";
				// }
				// if (isDeliverablesPage) {
				// 	window.location =
				// 		_spPageContextInfo.siteAbsoluteUrl +
				// 		"/SitePages/Listing.aspx?ListKey=deliverables";
				// }
				if (isRiskPage) {
					window.location =
						_spPageContextInfo.siteAbsoluteUrl +
						"/SitePages/Listing.aspx?ListKey=risks";
				}
				if (isIssuePage) {
					window.location =
						_spPageContextInfo.siteAbsoluteUrl +
						"/SitePages/Listing.aspx?ListKey=issues";
				}
				if (isMomPage) {
					window.location =
						_spPageContextInfo.siteAbsoluteUrl +
						"/SitePages/Listing.aspx?ListKey=mom";
				}
				// if (isInitiativeSample) {
				// 	window.location =
				// 		_spPageContextInfo.siteAbsoluteUrl +
				// 		"/SitePages/Listing.aspx?ListKey=initiatives";
				// }
				if (isTasksPage) {
					window.location =
						_spPageContextInfo.siteAbsoluteUrl +
						"/SitePages/Listing.aspx?ListKey=SMOTasks";
				}
				if (isideapage) {
					window.location =
						_spPageContextInfo.siteAbsoluteUrl +
						"/SitePages/Listing.aspx?ListKey=ideas";
				} else if (isRelatedProjectPage) {
					window.location =
						_spPageContextInfo.siteAbsoluteUrl +
						"/SitePages/ProjectHome.aspx?PCODE=" +
						peojectC;
				} else if (isProjectPage) {
					window.location =
						_spPageContextInfo.siteAbsoluteUrl +
						"/SitePages/ProjectHome.aspx?PCODE=" +
						peojectC;
				} else if (isKPIResultWf) {
					window.location =
						_spPageContextInfo.siteAbsoluteUrl +
						"/SitePages/Listing.aspx?ListKey=" +
						"mainkpi";
				} else if (RelatedProjectCODE) {
					window.location =
						_spPageContextInfo.siteAbsoluteUrl +
						"/SitePages/Listing.aspx?ListKey=" +
						listkey +
						"&PCODE=" +
						RelatedProjectCODE;
				} else {
					window.location =
						_spPageContextInfo.siteAbsoluteUrl +
						"/SitePages/Listing.aspx?ListKey=" +
						listkey;
				}
			}),
			Function.createDelegate(this, function (sender, args) {
				console.log(
					"Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
				);
			})
		);
	},
	g: {},
};
///////////////////////// workflow note
var Workflow_Note_Data_Request_WFs = {
	// Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
	preinit: function () {
		if (
			$(".DahsFormTitle").length ||
			$(".PNameTitle").text() ||
			$("#Ribbon\\.Tabs\\.PDP\\.Home-title").length
		) {
			// console.log('in');
			clearInterval(forTasksHTMLStatus);
			$("div.Container").after('<div class="cust-loader"></div>');
			SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () { });
		}
		//*****channnnges */
		clearInterval(forTasksHTMLStatus);
		$("div.Container").after('<div class="cust-loader"></div>');
		SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
			Workflow_Note_Data_Request_WFs.init();
			// console.log('Start');
		});
	},
	// The main Initialization function
	init: function () {
		var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext.get_web().get_lists().getByTitle("Tasks"); //list name
		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml(noteQuery); //caml query
		Workflow_Note_Data_Request_WFs.g.collListItem = oList.getItems(camlQuery);
		clientContext.load(Workflow_Note_Data_Request_WFs.g.collListItem);
		clientContext.executeQueryAsync(
			Function.createDelegate(this, Workflow_Note_Data_Request_WFs.onSuccess),
			Function.createDelegate(this, Workflow_Note_Data_Request_WFs.onError)
		);
	},
	onSuccess: function (sender, args) {
		var collListItem = Workflow_Note_Data_Request_WFs.g.collListItem;
		var listItemEnum = collListItem.getEnumerator();
		var count = 0;
		var taskNoteID = "";
		var taskDescription = "";
		var takenAction = "";
		var tasksNoteArr = [];
		var modifiedNoteBy;
		var modifiedNoteDate;
		var noteHtml = "";
		var tabhead = "";
		var tabcontent = "";
		while (listItemEnum.moveNext()) {
			//loop through list items
			var oListItem = listItemEnum.get_current();
			count++;
			taskNoteID = oListItem.get_id();
			takenAction = oListItem.get_item("TakenAction");
			taskDescription = oListItem.get_item("Body");
			modifiedNoteBy = oListItem.get_item("AssignedTo")
				? oListItem.get_item("AssignedTo")[0].get_lookupValue()
				: No_Data;
			modifiedNoteDate = oListItem.get_item("Modified") || No_Data;
			tasksNoteArr.push({
				taskid: taskNoteID,
				description: taskDescription,
				action: takenAction,
				modifiedby: modifiedNoteBy,
				modifiedDate: modifiedNoteDate,
			});
		}
		// console.log('tasksNoteArr', tasksNoteArr);
		var imgSource =
			"" +
			_spPageContextInfo.webAbsoluteUrl +
			"/style%20library/spm/images/icon-flag.png";
		if (tasksNoteArr.length > 0) {
			// $("#myModal").css("display", "flex");
			for (var i = 0; i < tasksNoteArr.length; i++) {
				if (i == 0) {
					tabhead +=
						'<li class="nav-item"><a  class="nav-link notetab active" id="firsttab" data-toggle="tab" href="#note' +
						i +
						'" role="tab" aria-controls="note' +
						i +
						'" aria-selected="true"><span data-trans-comment class="Resources"></span><span class="tabnb">' +
						(i + 1) +
						"</span></a></li>";
				} else {
					tabhead +=
						'<li class="nav-item"><a class="nav-link notetab' +
						i +
						'" id="firsttab" data-toggle="tab" href="#note' +
						i +
						'" role="tab" aria-controls="note' +
						i +
						'" aria-selected="true"><span data-trans-comment class="Resources"></span><span class="tabnb">' +
						(i + 1) +
						"</span></a></li>";
				}
				if (tasksNoteArr[i].description) {
					tasksNoteArr[i].description = tasksNoteArr[i].description;
				} else {
					if (
						localStorage.getItem("lng") == null ||
						localStorage.getItem("lng") == "ar"
					) {
						tasksNoteArr[i].description = "لا يوجد ملاحظات";
					} else {
						tasksNoteArr[i].description = "No Comments";
					}
				}
				if (i == 0) {
					tabcontent =
						'<div class="tab-pane fade show active" id="note' +
						i +
						'" role="tabpanel" aria-labelledby="note' +
						i +
						'"><div class="modal-body scrollBarStyle"><div style="" id="dialogBodyText"><div class="notes">' +
						tasksNoteArr[i].description +
						'</div></div><div id="dialogIcon"><img css="w-100" class="sendMsgImg" src="' +
						imgSource +
						'" data-themekey="#"></div></div><div class="modal-footer"><div id="modifiedNoteBy">' +
						tasksNoteArr[i].modifiedby +
						'</div><div id="modifiedDate">' +
						tasksNoteArr[i].modifiedDate.toLocaleDateString("en-US") +
						'</div><div id="viewhistory"><a href="' +
						wfHistoryLink +
						'"><span data-trans-viewhistory class="Resources"></span></a></div></div></div>';
				} else {
					tabcontent =
						'<div class="tab-pane fade" id="note' +
						i +
						'" role="tabpanel" aria-labelledby="note' +
						i +
						'"><div class="modal-body scrollBarStyle"><div style="" id="dialogBodyText"><div class="notes">' +
						tasksNoteArr[i].description +
						'</div></div><div id="dialogIcon"><img css="w-100" class="sendMsgImg" src="' +
						imgSource +
						'" data-themekey="#"></div></div><div class="modal-footer"><div id="modifiedNoteBy">' +
						tasksNoteArr[i].modifiedby +
						'</div><div id="modifiedDate">' +
						tasksNoteArr[i].modifiedDate.toLocaleDateString("en-US") +
						'</div><div id="viewhistory"><a href="' +
						wfHistoryLink +
						'"><span data-trans-viewhistory class="Resources"></span></a></div></div></div>';
				}
				$("#tasknotes").append(tabcontent);
			}
			if (tasksNoteArr.length == 1) {
				$("#notesTabs").hide();
			} else {
				$("#notesTabs").append(tabhead);
			}
			changeResources();
			if (tasksNoteArr[0].action.toLowerCase() == "approve") {
				$(".modal-content").css("border-top", "3px solid #5ab74c");
			} else if (tasksNoteArr[0].action.toLowerCase() == "submit") {
				$(".modal-content").css("border-top", "3px solid #ffc107");
			} else if (tasksNoteArr[0].action.toLowerCase() == "reject") {
				$(".modal-content").css("border-top", "3px solid #590835");
			}
		} else {
			$("#myModal").css("display", "none");
			$(".WF-btn").addClass("noNotification");
		}
		if (USERisEdit && isWF) {
			$(".btn-action.btn-save").clone().prependTo(".wf-btn-wrapper-new");
			$(".wf-btn-wrapper-new .btn-action.btn-save").addClass("action-save-submit");
			Edit_Data_Submit.g.clickbait();
		}
	},
	onError: function (sender, args) {
		console.log(
			"Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
		);
	},
	// Global variables
	g: {},
};
var Disable_Idea_Edit_Button = {
	// Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
	preinit: function () {
		clearInterval(forTasksHTMLStatus);
		$("div.Container").after('<div class="cust-loader"></div>');
		SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
			Disable_Idea_Edit_Button.init();
			// console.log('Start');
		});
	},
	// The main Initialization function
	init: function () {
		// console.log('1234');
		var IID = window.location.href.split("IID=")[1].split("&")[0];
		var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext.get_web().get_lists().getByTitle("Tasks"); //list name
		var camlQuery = new SP.CamlQuery();
		var ideaquery = `<View><Query><Where><And><Eq><FieldRef Name='RelatedItemID' /><Value Type='Text'>${IID}</Value></Eq><Eq><FieldRef Name='TaskType' /><Value Type='Choice'>SubmitProject</Value></Eq></And></Where></Query></View>`;
		camlQuery.set_viewXml(ideaquery); //caml query
		Disable_Idea_Edit_Button.g.collListItem = oList.getItems(camlQuery);
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
		var taskNoteID = "";
		while (listItemEnum.moveNext()) {
			//loop through list items
			var oListItem = listItemEnum.get_current();
			taskStatus = oListItem.get_item("Status");
			count++;
			// console.log('taskStatus', taskStatus);
		}
		if (count > 0 && taskStatus == "Closed") {
			$(".btn.btn-action.btn-save").remove();
		}
	},
	onError: function (sender, args) {
		console.log(
			"Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
		);
	},
	// Global variables
	g: {},
};
// added by oday
// Get the projects collection.
function WfGetProjects() {
	projContext = PS.ProjectContext.get_current();
	projects = projContext.get_projects();
	projContext.load(projects, "Include(Name, Id)"); //, Description, StartDate, Id, Owner
	projContext.executeQueryAsync(ChangeProjectOwner, QueryFailed);
}

function ChangeProjectOwner() {
	var project = projects.getById(projectGuid);
	var draftProject = project.checkOut();
	var web = projContext.get_web();
	var projectManagerId = projectManagerPicker.get_lookupId();
	var userPicked = web.getUserById(projectManagerId); //147
	draftProject.set_owner(userPicked);
	var publishJob = draftProject.publish(true);
	$(".wfLoader").hide();
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
	console.log("Request failed: " + args.get_message());
}
window.AllFileCount = 0;
//upload multiple files to specific folder with column assigning
var WF_UploadFiles = {
	WF_files: [], //files array
	preinit: function (state) {
		var myfiles;
		$("input[type=file]").each(function (e) {
			myfiles = document.querySelector("#" + $(this).attr("id")).files;
			AllFileCount = AllFileCount + myfiles.length;
		});

		if (
			$('[type="file"][required]').length == 0 &&
			AllFileCount == 0 &&
			stageid != "S01"
		) {
			BulkEdit(state);
		} else if ($(".was-validated .form-control:invalid").length == 0) {
			// WF_UploadFiles.getFiles();
			_uploadFile();
		}
		WF_UploadFiles.g.state = state;
	},
	getFiles: function () //fill array
	{
		$("[type=file]").each(function (index) {
			var fc = $(this).get(0).files.length,
				$this = $(this).get(0);
			// typename = $(this).parent().next().find('select').val();
			for (var i = 0; i < fc; i++) {
				// WF_UploadFiles.WF_files.push({ title: typename, name: $this.files[i].name, buffer: $this.files[i] });//$this.files[i].name

				WF_UploadFiles.WF_files.push({
					name: $this.files[i].name,
					buffer: $this.files[i],
				}); //$this.files[i].name
			}
			if (index == $("[type=file]").length - 1) {
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
			reader._NAME = WF_UploadFiles.WF_files[i].name;
			reader.onload = function (e) {
				let fileactualName = e.target._NAME;
				// WF_UploadFiles.init(e.target.result, fileactualName, titlename);
				WF_UploadFiles.init(e.target.result, fileactualName);
			};
			reader.onerror = function (e) {
				alert(e.target.error);
			};
			reader.readAsArrayBuffer(file);
		}
	},
	init: function (arrayBuffer, fileName) {
		//Get Client Context,Web and List object.
		var clientContext = new SP.ClientContext.get_current();
		var oWeb = clientContext.get_web();
		var oList = oWeb.getFolderByServerRelativeUrl(
			_spPageContextInfo.siteServerRelativeUrl +
			"/" +
			ListArray[2].documents +
			"/" +
			peojectC +
			"/" +
			listkey
		);
		// oWeb.get_lists().getByTitle('Projects Documents');
		//Convert the file contents into base64 data
		var bytes = new Uint8Array(arrayBuffer);
		var i,
			length,
			out = "";
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
		var myFolder = oList.get_files().add(createInfo);
		var myListItem = myFolder.get_listItemAllFields();
		myListItem.set_item("ItemID", IID);
		if (PCODE) {
			myListItem.set_item("Title", listkey + "-" + PCODE);
		} else {
			myListItem.set_item("Title", listkey);
		}

		myListItem.update();
		//Load client context and execcute the batch
		clientContext.load(myFolder);
		clientContext.executeQueryAsync(
			WF_UploadFiles.UploadQuerySuccess,
			WF_UploadFiles.UploadQueryFailure
		);
	},
	UploadQuerySuccess: function () {
		WF_isuploaddone++;
		console.log("File Uploaded Successfully.");
		if (WF_UploadFiles.WF_files.length == WF_isuploaddone) {
			BulkEdit(WF_UploadFiles.g.state);
		}
	},
	UploadQueryFailure: function (sender, args) {
		console.log("Request failed with error message - " + args.get_message());
	},
	g: {},
};
//New upload used
function _uploadFile() {
	var files;
	window.myvalidAttachments = [];

	$("input[type=file]").each(function (e) {
		var myfiles = document.querySelector("#" + $(this).attr("id")).files;
		for (var i = 0; i < myfiles.length; i++) {
			const file = myfiles[i];
			const fileExtension = "" + file.name.split(".").pop();
			// get attribut
			if (acceptedExtensions.indexOf(fileExtension.toLowerCase()) > -1) {
				myvalidAttachments.push(file);
			}
		}
	});
	// retrive file from INPUT
	files = myvalidAttachments;
	// console.log('files', files);

	if (
		$('[type="file"][required]').length > 0 &&
		(!files || files.length === 0) &&
		stageid != "S01"
	) {
		var locale, messageText;
		if (
			localStorage.getItem("lng") == null ||
			localStorage.getItem("lng") == "ar"
		) {
			locale = {
				OK: Resources.ar["ok"],
				CANCEL: Resources.ar["cancelbutton"],
				CONFIRM: Resources.ar["yes"],
			};
			messageText = "الرجاء إدخال ملف";
		} else {
			locale = {
				OK: Resources.en["ok"],
				CANCEL: Resources.en["cancelbutton"],
				CONFIRM: Resources.en["yes"],
			};
			messageText = "Please add attachement";
		}
		bootbox.addLocale("custom", locale);
		$(".popupComment").remove();
		bootbox.alert({
			message: messageText,
			locale: "custom",
		});
		return;
	}
	files = Array.prototype.slice.call(files);
	// read the files
	Promise.all(
		files.map(function (file) {
			return new Promise(function (prom_res, prom_rej) {
				// use fileReader
				var fileReader = new FileReader();
				fileReader.onloadend = function (e) {
					file.content = e.target.result;
					prom_res(file);
				};
				fileReader.onerror = function (e) {
					prom_rej(e.target.error);
				};
				fileReader.readAsArrayBuffer(file);
			});
		})
	).then(function (files) {
		// upload files
		return Promise.all(
			files.map(function (file) {
				if (isWfFirst_Upload) {
					$("input#getFile")
						.eq(0)
						.closest(".fieldset-container")
						.append(
							'<div class="col-md-6 CFIELD upload-status" data-groups="">\
				  <div class="upload-progress-parent">\
					  <div class="upload-progress bg-success"" style="width:0px"></div>\
				  </div>\
				  <p data-trans-fileuploading class="upload-name Resources"><span class="progress-file-name">"' +
							file.name +
							'" </span><span class="upload-percent"></span></p>\
			  </div>'
						);
				}
				isWfFirst_Upload = false;

				return $SP()
					.list(ListArray[2].documents)
					.createFile({
						content: file.content,
						filename: PCODE + "/" + listkey + "/" + file.name,
						fields: {
							Title: listkey + "-" + PCODE,
							ItemID: IID,
							RelatedPhase: curphaseName,
							RelatedStage: stageid,
						},
						progress: function (perc) {
							// console.log("Progress => ", perc + "%");
							$(".upload-progress").css("width", perc + "%");
							$(".upload-percent").text(" " + perc + "%");
						},
					})
					.then(
						function (file) {
							WF_isuploaddone++;
							console.log("File Uploaded Successfully.");

							if (files.length == WF_isuploaddone) {
								if (stageid == "S01") {
									SubmitField_BulkEdit.init(state);
								} else {
									BulkEdit(WF_UploadFiles.g.state);
								}
							}
						},
						function (error) {
							$(".form-btns-wrapper").prepend(
								'<p style="color:red"> Faild saving the Attachements</p>'
							);
							console.log("Error Uploading: ", error);
						}
					);
			})
		);
	});
}
//
function evalExpr(expr) {
	Function("return " + expr + ";");
	return eval("(" + expr + ")");
}

//////////////

var Cancel_Project = {
	init: function () {
		var context = SP.ClientContext.get_current();
		var dfd = $.Deferred();
		//Get list from host web

		var programList = context.get_web().get_lists().getByTitle("Projects");
		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml(
			"<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Title\" /><Value Type=\"Text\">" +
			peojectC +
			"</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
		);

		//Get items by Query
		var progColl = programList.getItems(camlQuery);
		//Load item collection
		context.load(progColl);
		context.executeQueryAsync(
			function () {
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
						//set
						items.set_item("Status", "cancelled");

						items.update();
						currentItemArray.push(items);
						context.load(currentItemArray[currentItemArray.length - 1]);
					}
					context.executeQueryAsync(
						function () {
							//Item Updated sucess
							console.log("Items thired Action are updated Successfully");
							dfd.resolve();
							Task_Edit_Data.init();
						},
						function (sender, args) {
							console.log(
								"Request Failed to get  Items :" + args.get_message()
							);
						}
					);
				} else {
					dfd.resolve();
					Task_Edit_Data.init();
				}
			},
			function (sender, args) {
				$(".loader").hide();
				console.log("Request failed in  List " + args.get_message());
			}
		);

		return dfd.promise();
	},
};

/////////////

var Edit_Project = {
	init: function () {
		var context = SP.ClientContext.get_current();
		var dfd = $.Deferred();
		//Get list from host web

		var programList = context.get_web().get_lists().getByTitle("Projects");
		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml(
			"<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Title\" /><Value Type=\"Text\">" +
			peojectC +
			"</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
		);

		//Get items by Query
		var progColl = programList.getItems(camlQuery);
		//Load item collection
		context.load(progColl);
		context.executeQueryAsync(
			function () {
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
						//set
						projectGuid = currentItem.get_item("ProjectGUID")
							? currentItem.get_item("ProjectGUID")
							: "";

						// projectManagerPicker = currentItem.get_item("ProjectManager")
						// ? currentItem.get_item("ProjectManager")
						// : "";

						if (isProjectDeligationsWf && stageid == "TR03" && state) {
							var evpicker = eval("(" + $("#NewPM").attr("sp-value") + ")");
							var newPMId = SP.FieldUserValue.fromUser(evpicker.$1p_1);
							var newPM = SP.FieldUserValue.fromUser(evpicker.$6_2);
							items.set_item("ProjectManager", newPM);
							ChangeProjectOwnerEpmWF(projectGuid, newPMId);
						}

						items.update();
						currentItemArray.push(items);
						context.load(currentItemArray[currentItemArray.length - 1]);
					}
					context.executeQueryAsync(
						function () {
							//Item Updated sucess
							console.log("Items thired Action are updated Successfully");
							dfd.resolve();
							// WFuserCalls.get_AllResources()
							// Task_Edit_Data.init();
							Get_Project_Info.init();
						},
						function (sender, args) {
							console.log(
								"Request Failed to get  Items :" + args.get_message()
							);
						}
					);
				} else {
					dfd.resolve();
					Task_Edit_Data.init();
				}
			},
			function (sender, args) {
				$(".loader").hide();
				console.log("Request failed in  List " + args.get_message());
			}
		);

		return dfd.promise();
	},
};

var Get_Project_Info = {
	init: function () {
		var context = SP.ClientContext.get_current();
		var dfd = $.Deferred();
		//Get list from host web

		var programList = context.get_web().get_lists().getByTitle("Projects");
		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml(
			"<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Title\" /><Value Type=\"Text\">" +
			peojectC +
			"</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
		);

		//Get items by Query
		var progColl = programList.getItems(camlQuery);
		//Load item collection
		context.load(progColl);
		context.executeQueryAsync(
			function () {
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

						projectManagerPicker = currentItem.get_item("ProjectManager")
							? currentItem.get_item("ProjectManager")
							: "";

						items.update();
						currentItemArray.push(items);
						context.load(currentItemArray[currentItemArray.length - 1]);
					}
					context.executeQueryAsync(
						function () {
							//Item Updated sucess
							console.log("Items thired Action are updated Successfully");
							dfd.resolve();
							WFuserCalls.get_AllResources();
							// Task_Edit_Data.init();
						},
						function (sender, args) {
							console.log(
								"Request Failed to get  Items :" + args.get_message()
							);
						}
					);
				} else {
					dfd.resolve();
					Task_Edit_Data.init();
				}
			},
			function (sender, args) {
				$(".loader").hide();
				console.log("Request failed in  List " + args.get_message());
			}
		);

		return dfd.promise();
	},
};
// change project owner from project manager field
function ChangeProjectOwnerEpmWF(projectGuid, newPmId) {
	// change the owner on project center when create a project
	var project = projects.getById(projectGuid);
	var draftProject = project.checkOut();
	var web = projContext.get_web();
	var userPicked = web.getUserById(newPmId); //147

	draftProject.set_owner(userPicked);
	var publishJob = draftProject.publish(true);
	projContext.waitForQueueAsync(
		publishJob,
		100,
		QueueJobSentOwnerEpmCreateProj
	);
}
function QueueJobSentOwnerEpmWF(response) {
	console.log(response);
}



// var changeOnKpiResultDraft ={
// 	init:function(){

// 	}
// }


function changeOnKpiResultDraft(state) {

	var context = SP.ClientContext.get_current();
	var dfd = $.Deferred();
	//Get list from host web
	var kpiresultList = context.get_web().get_lists().getByTitle("KPIResults");
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml(
		"<View><Query><Where><Eq><FieldRef Name='KPI'/><Value Type='Text'>" + relatedItemTitle + "</Value></Eq></Where></Query></View>"
	);
	//Get items by Query
	var kpiresultColl = kpiresultList.getItems(camlQuery);
	//Load item collection
	context.load(kpiresultColl);
	context.executeQueryAsync(
		function () {
			var currentItemArray = [];
			console.log("BEFORE loop");
			if (kpiresultColl.get_count() > 0) {
				var kpiresultEnum = kpiresultColl.getEnumerator();
				while (kpiresultEnum.moveNext()) {
					var currentItem = kpiresultEnum.get_current();
					var currentId = currentItem.get_item("ID");
					//Get Item by current ID
					var items = kpiresultList.getItemById(currentId);

					if (state) {
						items.set_item("DraftStatus", "");
					}
					items.update();

					currentItemArray.push(items);

					context.load(currentItemArray[currentItemArray.length - 1]);

				}
				context.executeQueryAsync(
					function () {

						dfd.resolve();

						Task_Edit_Data.init();

					},
					function (sender, args) {
						//Item updated fail
						console.log(
							"Request Failed to get projectlist Items :" + args.get_message()
						);
					}
				);
			} else {
				dfd.resolve();
			}
		},
		function (sender, args) {
			$(".loader").hide();
			console.log("Request failed in KPIResults List " + args.get_message());
		}
	);
	return dfd.promise();
}