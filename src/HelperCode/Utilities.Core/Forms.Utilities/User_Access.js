window.currentUserRole;
window.GroupsIds = [];
window.UserN;
window.checkHomeInitiativeStatus = "";
window.strategicPartnerShipStatus = "";
window.myRoleConfig = [];
window.isRoleDataLevelAccess = false;
window.currentMainList = "";
window.projectActualBudget = 0;
window.projectAssignedBudget = 0;
window.initiativeActualBudget = 0;
window.CurrentUserTasksCount = 0;
window.APIURL = "";
window.relatedProjectId = "";
window.relatedInitiativeId = "";
//window.finishRenderAccessRole = false


window.USERisProjectHome =
  window.location.href.toLowerCase().indexOf("/projecthome.aspx") > -1;
window.USERisInitiativeHome =
  window.location.href.toLowerCase().indexOf("/initiativehome.aspx") > -1;
window.USERisStrategicPartnershipHome =
  window.location.href.toLowerCase().indexOf("/strategicpartnershiphome.aspx") > -1;
window.USERisTargets = window.location.href.toLowerCase().indexOf("/targets.aspx") > -1;

var BreakException = {};
var workingstatus = "";
var UserRole,
  UserAccessSectorCode,
  UserNTasks = 0,
  ar_UserRole,
  isArabic =
    localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar",
  Groups = [],
  GroupItem = [],
  User_mouse_in_nav = false,
  AccessQuery =
    "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>",
  InitiativeAccessQuery =
    "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>",
  SubSectorInitiativeAccessQuery =
    "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>",
  ChartHide,
  scheduleSrcFeatureIsOn = true,
  isAdmin = false,
  isMinister = false,
  isPMO = false,
  isITSteering = false,
  isPSponsor = false,
  isPOwner = false,
  isPManager = false,
  isInManager = false,
  isInOwner = false,
  isBusinessOwner = false,
  isSectionHead = false,
  isSectorHead = false,
  isPortfolioManager = false,
  isSPMTeam = false,
  isVROP = false,
  isVROHead = false,
  isVROPHead = false,
  isVPlanningUnitHead = false,
  isVPlanningUnit = false,
  isSPMAdmin = false,
  isStrategyTeam = false,
  isAllKpis = false, // to get all kpis
  isVROE = false,
  isVROEHead = false,
  isLMSE = false,
  isLMSUControl = false,
  isLMSUExecution = false,
  isLMSUPerformance = false,
  isCRCommittee = false,
  isCRCommitteeVision = false,
  isLMSP = false,
  isSPMO = false,
  isSPMOHead = false,
  isDU = false,
  isSubSectorHead = false,
  isGeneralManager = false,
  isMinisterAssistant = false,
  isViceMinister = false,
  isEPMO = false,
  isStrategySpecialist = false,
  isPerformanceLeader = false,
  isStrategicPartnershipsTeam = false,
  isPartnershipRepresentative = false,
  isRelationshipManager = false,
  isStrategicAchievementTeam = false,
  isBudgetManager = false,
  isObjectiveOwner = false,
  isKPIOWNER = false,
  isBITeam = false,
  pickerValidationDone = false, // to check picker user groups on form submit
  membersGroupCheckArray = [], // to check picker user groups on form submit
  Page_UrlName =
    window.location.pathname.toLowerCase().indexOf("sitepages") > -1
      ? window.location.pathname.toLowerCase().split("/sitepages/")[1]
      : "", //get page name.aspx
  currPageArray = [],
  SP_Page_Name = [
    "mainstrategy.aspx",
    "stratigicinformation.aspx",
    "InitiativesMain.aspx",
    "Targets.aspx",
    "BenefitMetrics.aspx",
    "StrategicIndicators.aspx",
    "MainIndicators.aspx",
    "Programs.aspx",
    "Initiatives.aspx",
    "ManagingOperationalIndicators.aspx",
    "OperationalIndicators.aspx",
    "home.aspx",
  ], //aray for accessing pages which have access policy on them
  SP_Page_Name = SP_Page_Name.map((name) => name.toLowerCase()),
  isSP_Page = SP_Page_Name.indexOf(Page_UrlName) > -1, // are we in a restricted page?
  USER_HomePage = "home.aspx",
  UserPage_Name = window.location.pathname
    .substring(window.location.pathname.lastIndexOf("/") + 1)
    .toLocaleLowerCase(),
  AllListKeys = [],
  AllPageNames = [],
  isMainIndicator = window.location.href.indexOf("MainIndicators.aspx") > -1,
  isAdminPanel = window.location.href.indexOf("AdminPanel.aspx") > -1,
  isKnowledgeBase = window.location.href.indexOf("KnowledgeBase.aspx"),
  isAllTasks = window.location.href.indexOf("AllTasks.aspx"),
  istherePCODE = window.location.href.toLowerCase().indexOf("pcode=") > -1,
  isthereICODE = window.location.href.indexOf("ICODE=") > -1,
  isthereSTCODE = window.location.href.indexOf("STCODE=") > -1,
  UserSTCode = isthereSTCODE ? window.location.href.split("STCODE=")[1].split("&")[0] : "",
  UserICode = isthereICODE
    ? window.location.href.split("ICODE=")[1].split("&")[0]
    : "",
  isWF = window.location.href.toLowerCase().indexOf("&wfs") > -1,
  USERisWF = window.location.href.toLowerCase().indexOf("&wfs") > -1,
  isTarget = window.location.href.toLowerCase().indexOf("targets.aspx") > -1,
  isBenefitsMetrics = window.location.href.toLowerCase().indexOf("benefitmetrics.aspx") > -1,
  isTaskDetails =
    window.location.href.toLowerCase().indexOf("taskdetails") > -1,
  USERlistkey =
    window.location.href.toLowerCase().indexOf("listkey=") > -1
      ? window.location.href.split("ListKey=")[1].split("&")[0]
      : "",
  // USERisProjectHome =
  //   window.location.href.toLowerCase().indexOf("/projecthome.aspx") > -1,
  // USERisInitiativeHome =
  //   window.location.href.toLowerCase().indexOf("/initiativehome.aspx") > -1,
  // USERisStrategicPartnershipHome =
  //   window.location.href.toLowerCase().indexOf("/strategicpartnershiphome.aspx") > -1,
  USERProjRelated = [],
  // isWF = window.location.href.toLowerCase().indexOf('&wfs') > -1,
  USERForBreadCrumbs = "",
  USERPageTitle,
  USERPName,
  USERIName,
  InitiativeTitle,
  StrategicPartnershipTitle,
  InitiativeStartDate,
  InitiativeFinishDate,
  USERPID,
  USERisHome = window.location.href.toLowerCase().indexOf("/home.aspx") > -1,
  isInitiativesHomePage =
    window.location.href.toLowerCase().indexOf("initiativesmain.aspx") > -1,
  USERisNew = window.location.href.toLowerCase().indexOf("new.aspx") > -1,
  isNew = window.location.href.toLowerCase().indexOf("new.aspx") > -1,
  USERisEdit = window.location.href.toLowerCase().indexOf("edit.aspx") > -1,
  isEdit = window.location.href.toLowerCase().indexOf("edit.aspx") > -1,
  USERisView = window.location.href.toLowerCase().indexOf("view.aspx") > -1,
  isfileListing =
    window.location.href.toLowerCase().indexOf("fileslisting") > -1,
  USERisForm = USERisNew || USERisEdit || USERisView ? true : false,
  USERisListing =
    window.location.href.toLowerCase().indexOf("listing.aspx") > -1,
  USERisProjects = USERlistkey == "projects" ? true : false,
  USERisIdeas = USERlistkey == "ideas" ? true : false,
  forfilterQuery = "",
  forFilterQueryInitiative = "",
  USERPCODE_STRING = istherePCODE
    ? "&PCODE=" + window.location.href.split("PCODE=")[1].split("&")[0]
    : "",
  USERPCODE = istherePCODE
    ? window.location.href.split("PCODE=")[1].split("&")[0]
    : "",
  FullPermissionQuery =
    "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>",
  ProjectManagerQuery =
    "<View><Query><Where><And><Eq><FieldRef Name=\"ProjectManager\" LookupId=\"TRUE\" /><Value Type=\"Lookup\"><UserID /></Value></Eq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>",
  InitiativeManagerQuery =
    "<View><Query><Where><And><Eq><FieldRef Name=\"InitiativePM\" LookupId=\"TRUE\" /><Value Type=\"Lookup\"><UserID /></Value></Eq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>",
  // StrategyProjectQuery = '<View><Query><Where><Eq><FieldRef Name="IsStrategicProject" /><Value Type="Choice">yes</Value></Eq></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>',
  StrategyProjectQuery =
    "<View><Query><Where><And><Neq><FieldRef Name='IsStrategicProject' /><Value Type='Boolean'>False</Value></Neq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>",
  ProjectOwnerQuery =
    "<View><Query><Where><And><Eq><FieldRef Name=\"ProjectOwner\" LookupId=\"TRUE\" /><Value Type=\"Lookup\"><UserID /></Value></Eq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>",
  ProjectSponsorQuery =
    "<View><Query><Where><And><Eq><FieldRef Name=\"ProjectSponsor\" LookupId=\"TRUE\" /><Value Type=\"Lookup\"><UserID /></Value></Eq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>",
  PMORepresentativeQuery =
    "<View><Query><Where><And><Eq><FieldRef Name=\"PMORepresentative\" LookupId=\"TRUE\" /><Value Type=\"Lookup\"><UserID /></Value></Eq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>",
  TasksQuery = // add DeletionStatus to avoid the deleted tasks
    '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>',
  IssueQuery =
    '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>',
  RiskQuery =
    '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And><Or><Eq><FieldRef Name="MitigationOwner" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="MitigationOwner" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>',
  //Second Level Querying
  SectorHeadQuery = "", //to be generated dybamicallly [projectsponsor]
  SecondLevel_List,
  SecondLevel_FieldtoQuery,
  SecondLevel_FieldtoQueryType,
  SecondLevel_FieldtoFetch,
  SecondLevel_CAMLQuery,
  SecondLevel_FirstLevel_Field,
  SecondLevel_FirstLevel_FieldType,
  User_isClosureStatus,
  User_NotActiveStatus,
  ProjectIsDraft,
  User_ScheduleSource,
  User_ProjUID,
  User_ProjUID,
  //CRUD ACCESS
  Create_Access = [],
  CreateChangeRequest_Access = [],
  Read_Access = [],
  Edit_Access = [],
  Delete_Access = [];

var RequestorTeam = "Requestor Team";
var NIssues = 0,
  NTasks = 0,
  NRisks = 0,
  NNotifications = 0;
window.isRequestorTeam = false;
window.isRequestorTeamUser = false;
window.UserHaveLicense = true;

// handle child when delete project
window.userProjects = [];
//
window.USERINID; // to get the initiative id

// window.activeCode = istherePCODE ? USERPCODE : isthereICODE ? UserICode : "";
window.activeCode = ""
//
window.tempRoleHierarchies = [];
window.accessCallisDone = false;
// added for CR module
//! Change Request

(window.crListKey = USERlistkey == "changerequest" ? true : false),
  (window.isCrMode = window.location.href.indexOf("RID=") > -1),
  (window.RID = isCrMode ? window.location.href.split("RID=")[1].split("&")[0] : ""),
  (window.isRListKey = window.location.href.indexOf("RKey=") > -1),
  (window.RListKey = isCrMode ? window.location.href.split("RKey=")[1].split("&")[0] : ""),
  (window.CrRelatedList = ""),
  (window.changeRequestBody = []),
  (window.changeRequestBodyMaster = []),
  (window.changeRequestBodyMasterEdit = []),
  (window.changeRequestRCode = []),
  (window.IsZeroBudgetProject = "");
// ended



var projectStartToValidation = "", initiativeStartToValidation = "";




if (istherePCODE) {
  activeCode = USERPCODE
} else if (isthereICODE) {
  activeCode = UserICode
} else if (isthereSTCODE) {
  activeCode = UserSTCode
}


if (window.location.href.indexOf("ListKey") > -1) {
  for (var i = 0; i < ListArray.length; i++) {
    var obj = ListArray[i];
    AllListKeys.push(Object.keys(obj)[0]); //returning all modules
    for (var key in obj) {
      //returning project related modules
      if (key == USERlistkey) {
        //get list name
        currentMainList = obj[key];
        //get titles
        if (USERisForm) USERPageTitle = obj["FormTitle"];
        else if (USERisListing) USERPageTitle = obj["ListingTitle"];
      }
      if (key == "projectrelated") {
        if (obj[key])
          //if true
          USERProjRelated.push(Object.keys(obj)[0]);
      }
      // added for CR module
      //cr
      if (key == RListKey) {
        CrRelatedList = obj[key];
      }
      // ended
    }
  }
} else {
  for (var i = 0; i < ListArray.length; i++) {
    var obj = ListArray[i];
    AllListKeys.push(Object.keys(obj)[0]); //returning all modules
  }
  //get pages array
  for (var i = 0; i < PageArray.length; i++) {
    var obj = PageArray[i];
    AllPageNames.push(Object.keys(obj)[0]); //returning all modules
  }
  currPageArray = PageArray.filter(function (v) {
    return v.pagename.toLocaleLowerCase() == UserPage_Name;
  });
  if (currPageArray.length) {
    currentMainList = currPageArray[0].listName;
    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {
      USERPageTitle = currPageArray[0].Title;
    } else {
      USERPageTitle = currPageArray[0].TitleEn;
    }
  }
}

if (
  localStorage.getItem("lng") == null ||
  localStorage.getItem("lng") == "ar"
) {
  var UserNo_Data = "لا يوجد",
    No_Data = "لا يوجد";
  var taskdetails = Resources["ar"].taskdetails;
} else {
  var UserNo_Data = "No Data",
    No_Data = "No Data";
  var taskdetails = Resources["en"].taskdetails;
}

window.userAddedToGroup = true;
//Get User Groups
window.userCalls = {
  get_CurrentUser: function () {
    console.time();

    //getUserWebPermissionREST();
    $.ajax({
      url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
      method: "GET",
      headers: {
        Accept: "application/json; odata=verbose",
      },
      success: function (data) {

        console.timeEnd();
        UserN = data.d;
        userCalls.get_CurrentUserGroupColl(data.d.Id);
      },
      error: function (data) { },
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
      headers: {
        Accept: "application/json; odata=verbose",
      },
      success: function (data) {
        /* get all group's title of current user. */
        var results = data.d.results;
        for (var i = 0; i < results.length; i++) {
          Groups.push(results[i].Title);
          GroupsIds.push(results[i].Id); //add to use in auditing feature
        }
        if (Groups.indexOf("System Admin Group") == -1) {
          $("#ms-designer-ribbon").remove();
        }
        userCalls.get_userAccess();

        Get_Configure_Api.preinit();

      },
    });
  },
  isMember: function (groupName, userLoginName, fieldID) {

    $.ajax({
      url:
        _spPageContextInfo.webAbsoluteUrl +
        "/_api/web/sitegroups/getByName('" +
        groupName +
        "')/Users?$filter=LoginName eq  '" +
        userLoginName +
        "' ",
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (data) {
        $(".userExist").remove();
        if (data.d.results[0] != undefined) {
          userAddedToGroup = true;
          $("#" + fieldID + "").removeClass("picker-error");
          $("#" + fieldID + "").addClass("picker-valid");
          //

          membersGroupCheckArray.shift();
          pickerValidationDone =
            membersGroupCheckArray.length == 0 ? true : false;
          !pickerValidationDone
            ? userCalls.isMember(
              membersGroupCheckArray[0].groupName,
              membersGroupCheckArray[0].userLoginName,
              membersGroupCheckArray[0].fieldID
            )
            : (membersGroupCheckArray = []);
          //
          if (isNew && pickerValidationDone) New_Data_Submit.init();
          else if (isEdit && pickerValidationDone) Edit_Data_Submit.init();
          if (USERlistkey == "tasks") {
            addDelegatedTask.init();
          }
        } else {
          membersGroupCheckArray = [];
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            ErrorMsg =
              '<div class="userExist ms-formvalidation sp-peoplepicker-errorMsg">يرجى التأكد من أن المستخدم مضاف مسبقا إلى المجموعة المناسبة .</div>';
          } else {
            ErrorMsg =
              '<div class="userExist ms-formvalidation sp-peoplepicker-errorMsg">Please make sure that the user has been added to the corresponding group.</div>';
          }

          $("#" + fieldID + "")
            .parent()
            .append(ErrorMsg);
          $("#" + fieldID + "").addClass("picker-error");
          $("#" + fieldID + "").removeClass("picker-valid");

          if (USERlistkey == "tasks") {
            $("#AssignedTo").append(ErrorMsg);
            $("#AssignedTo").addClass("UserError");
          }
          userAddedToGroup = false;
        }
      },
      error: function () {
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          ErrorMsg =
            '<div class="userExist ms-formvalidation sp-peoplepicker-errorMsg">يجب اضافة مستخدم من مجموعة فريق مكتب ادارة المشاريع (PMO Team)</div>';
        } else {
          ErrorMsg =
            '<div class="userExist ms-formvalidation sp-peoplepicker-errorMsg">User Must be in "PMO Team" group</div>';
        }
        if (USERlistkey == "portfolio") {
          $("#Manager").parent().append(ErrorMsg);
        }
        if (USERlistkey == "tasks") {
          $("#AssignedTo").append(ErrorMsg);
        }
      },
    });
  },
  get_userAccess: function () {
    for (var i = 0; i < userCalls.g.SPGroups.length; i++) {
      var mygroups = userCalls.g.SPGroups[i].groupsName;
      for (var j = 0; j < mygroups.length; j++) {
        if (Groups.indexOf(mygroups[j]) > -1) {
          GroupItem.push(userCalls.g.SPGroups[i]);
        }
      }

      if (i == userCalls.g.SPGroups.length - 1 && Groups.length > 0) {
        userCalls.get_AccessAction();

      }
    }
    //*****

    if (GroupItem.length > 0) {
      UserRole = GroupItem[0].Role;
      if (GroupItem.length > 1) {
        // to handle the multi role
        var myRolesHtml = "",
          isActiveRole;
        GroupItem.forEach(function (T, index, array) {
          if (localStorage.getItem("userRole") == null) {
            isActiveRole = T.Role == array[0].Role ? "activeRole" : "";
          } else {
            isActiveRole =
              T.Role == localStorage.getItem("userRole") ? "activeRole" : "";
          }

          index == 0
            ? (myRolesHtml += `<ul class="list-group">
            <li class="list-group-item d-flex justify-content-center align-items-center" style="text-align: center;">
              <h2 data-trans-roles class="m-1 Resources"></h2>
              <i class="fas fa-user-tag" style="font-size: 24px;"></i>
            </li>`)
            : "";
          // localStorage.setItem('userGroup', '${T.groupsName}');
          myRolesHtml += `<li class="list-group-item">
            <a href="javascript:" class="d-flex justify-content-between align-items-center" onclick="localStorage.setItem('userRole', '${T.Role}');localStorage.setItem('userGroup', '${T.groupsName}');window.location=('/');" title="${T.Role}">
              <h3 data-trans-${T.Role} class="title-13 Resources m-0">${T.Role}</h3>
              <div class="circle-radio d-flex justify-content-center align-items-center">
                <div class="dot-radio ${isActiveRole}" data-role="${T.Role}"></div>
              </div>
            </a>
          </li>`;
          if (index == array.length - 1) {
            myRolesHtml +=
              '<li class="list-group-item"><a href="javascript:logOutHandler();" title="Sign Out"><h3 data-trans-signout class="title-13 Resources"></h3></a></li>';
            myRolesHtml += `</ul>`;

            var checkRoleStatusHtml = setInterval(function () {
              if ($(".container-body").length) {
                clearInterval(checkRoleStatusHtml);
                $(".dropdown-menu.border-0.dropdown-menu-right").html(
                  myRolesHtml
                );
              }
            }, 777);
          }
        });
      } else {
        // when we have a one role for user
        var myRolesHtml = "";

        myRolesHtml +=
          '<li class="list-group-item"><a href="javascript:logOutHandler();" title="Sign Out"><h3 data-trans-signout class="title-13 Resources"></h3></a></li>';

        var checkRoleStatusHtml = setInterval(function () {
          if ($(".container-body").length) {
            clearInterval(checkRoleStatusHtml);
            $(".dropdown-menu.border-0.dropdown-menu-right").html(myRolesHtml);
          }
        }, 777);
      }
    } else {
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        $("body").html(
          '<div class="popupComment access-denied"><div class="wrapcomments"><div class="denied-icon"><i class="fas fa-user-shield"></i></div><label>عذرا، ليس لديك صلاحية لرؤية البيانات</label>' +
          '<div style="margin-bottom:15px">الرجاء التواصل مع مسؤول النظام للمزيد من المعلومات</div>' +
          "</div></div></div>"
        );
      } else {
        $("body").html(
          '<div class="popupComment access-denied"><div class="wrapcomments"><div class="denied-icon"><i class="fas fa-user-shield"></i></div><label>Sorry, you don\'t have permission to view the data</label>' +
          '<div style="margin-bottom:15px">Please contact the system administrator for more information</div>' +
          "</div></div></div>"
        );
      }
    }
    isRequestorTeam = Groups.indexOf(RequestorTeam) > -1 ? true : false;
    if (USERisNew && USERisProjects) {
      userCalls.get_AllResources();
    }
  },
  get_AccessAction: function () {

    switch (UserPage_Name) {
      case "listing.aspx":
        if (isArabic) {
          document.title = "قائمة";
        } else {
          document.title = "Listing";
        }
        break;
      case "new.aspx":
        if (isArabic) {
          document.title = "جديد";
        } else {
          document.title = "New";
        }
        break;
      case "view.aspx":
        if (isArabic) {
          document.title = "مشاهدة";
        } else {
          document.title = "View";
        }
        break;
      case "edit.aspx":
        if (isArabic) {
          document.title = "تعديل";
        } else {
          document.title = "Edit";
        }
        break;
      case "home.aspx":
        if (isArabic) {
          document.title = "المشاريع";
        } else {
          document.title = "Projects";
        }
        break;
      case "initiativesmain.aspx":
        if (isArabic) {
          document.title = "المبادرات";
        } else {
          document.title = "Initiatives";
        }
        break;
      case "projecthome.aspx":
        if (isArabic) {
          document.title = "تفاصيل المشروع";
        } else {
          document.title = "Project Home";
        }
        break;
      case "initiativehome.aspx":
        if (isArabic) {
          document.title = "تفاصيل المبادرة";
        } else {
          document.title = "Initiative Home";
        }
        break;
      case "strategicpartnershiphome.aspx":
        if (isArabic) {
          document.title = "تفاصيل الشراكة الاستراتيجية";
        } else {
          document.title = "Strategic Partnership Home";
        }
        break;
      case "taskhistory.aspx":
        if (isArabic) {
          document.title = "تاريخ المهمة";
        } else {
          document.title = "Task History";
        }
        break;
      case "adminpanel.aspx":
        if (isArabic) {
          document.title = "لوحة الادارة";
        } else {
          document.title = "Admin Panel";
        }
        break;
      default:
        document.title = USERPageTitle;
    }
    (Create_Access = Create_Access.map((name) => name.toLowerCase())), //making sure everything is lower case
      (CreateChangeRequest_Access = CreateChangeRequest_Access.map((name) => name.toLowerCase())), //making sure everything is lower case
      (Read_Access = Read_Access.map((name) => name.toLowerCase())),
      (Edit_Access = Edit_Access.map((name) => name.toLowerCase())),
      (Delete_Access = Delete_Access.map((name) => name.toLowerCase()));

    //check if user has chosen a certain role or if it is by default
    // var currentUserRole; // define as a window to use it in auditing feature
    if (localStorage.getItem("userRole") == null)
      currentUserRole = GroupItem[0].Role;
    else currentUserRole = localStorage.getItem("userRole");
    myRoleConfig = GroupItem.filter((el) => {
      return el.Role == currentUserRole;
    });
    initiateDataLevelAccess();
    //Add permission for default chart view on home Page + User Title Role

    switch (
    currentUserRole //we need first role for user
    ) {
      case "Administrator":
        $("body").append(
          "<style>" +
          "div#s4-ribbonrow, div#O365_MainLink_Settings_container{display:block!important}html #s4-workspace {min-height:auto !important;}.Progress-Action {display:block!important;}" +
          "</style>"
        );
        isAdmin = true;
        //***** */
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مسؤول النظام";
        en_UserRole = "Administrator";
        //CRUD
        Create_Access = AllListKeys;
        Create_Access = Create_Access.concat(SP_Page_Name);
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = AllListKeys;
        Edit_Access = Edit_Access.concat(SP_Page_Name);
        Delete_Access = AllListKeys;
        Delete_Access = Delete_Access.concat(SP_Page_Name);
        CreateChangeRequest_Access = [
          "initiatives",
          "projects",
          "sos",
          "mainkpi"
        ]
        break;
      case "Minister":
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isMinister = true;
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "معالي الوزير";
        en_UserRole = "Minister";

        Create_Access = [];
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [];
        Delete_Access = [];
        break;

      case "SectorHead":
        isSectorHead = true;
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = " مدير  ";
        en_UserRole = "Sector Head of ";

        //CRUD
        Create_Access = [];
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [];
        break;

      case "ProjectManager":
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isPManager = true;
        $("div#s4-ribbonrow, div#O365_MainLink_Settings_container").remove();
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مدير المشروع";
        en_UserRole = "Project Manager";

        //CRUD
        Create_Access = [
          /////////
          // "projects",
          // "deliverables",
          // "milestones",
          "issues",
          "risks",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          "documents",
          "changerequest"
        ];
        CreateChangeRequest_Access = [
          /////////
          "projects",
        ];
        Read_Access = [
          "projects",
          "deliverables",
          "milestones",
          "issues",
          "risks",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          "documents",
          "changerequest",
          "documents",
          "tasks",
          "TaskHistory.aspx",
          "home.aspx",
          "projecthome.aspx",
        ];
        Edit_Access = [
          // "projects",
          // "deliverables",
          // "milestones",
          "issues",
          "risks",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          "documents",
          "projecthome.aspx",
          //////////////////////////
        ];
        Delete_Access = [
          // "projects",
          // "deliverables",
          // "milestones",
          "issues",
          "risks",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
        ];
        break;

      case "ProjectOwner":
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isPOwner = true;
        $("div#s4-ribbonrow, div#O365_MainLink_Settings_container").remove();
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مالك المشروع";
        en_UserRole = "Project Owner";
        Create_Access = ["projecthome.aspx"];
        Read_Access = [
          "projects",
          "deliverables",
          "milestones",
          "issues",
          "risks",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          "documents",
          "TaskHistory.aspx",
          "home.aspx",
          "tasks",
          "projecthome.aspx",
        ];
        Edit_Access = ["projecthome.aspx"];
        Delete_Access = [];

        break;
      case "InitiativeManager":
        // if (USERisHome)
        // 	window.location =
        // 		_spPageContextInfo.webAbsoluteUrl +
        // 		"/sitepages/initiativesmain.aspx";
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isInManager = true;
        $("div#s4-ribbonrow, div#O365_MainLink_Settings_container").remove();
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مدير المبادرة";
        en_UserRole = "Initiative Manager";
        //CRUD
        Create_Access = [
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmatrix",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          // "milestones",
          "issues",
          "risks",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          "changerequest",
        ];
        CreateChangeRequest_Access = ["initiatives", "projects"]
        Read_Access = [
          "initiatives",
          "initiativedeliverables",
          "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          "benefits",
          "benefitmatrix",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "projects",
          "deliverables",
          "milestones",
          "issues",
          "risks",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          "changerequest",
          "projecthome.aspx",
          "InitiativeHome.aspx",
          "TaskHistory.aspx",
          "tasks",
          "documents",
          "initiativesmain.aspx",
          "home.aspx",
          "projecthome.aspx",
        ];
        Edit_Access = [
          // "initiatives",
          "initiativedeliverables",
          "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmatrix",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          // "milestones",
          "issues",
          "risks",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          //"changerequest",
        ];
        Delete_Access = [
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmatrix",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          // "milestones",
        ];
        break;

      case "InitiativeOwner":
        // if (USERisHome)
        // 	window.location =
        // 		_spPageContextInfo.webAbsoluteUrl +
        // 		"/sitepages/initiativesmain.aspx";
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );

        isInOwner = true;
        $("div#s4-ribbonrow, div#O365_MainLink_Settings_container").remove();
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مالك المبادرة";
        en_UserRole = "Initiative Owner";
        //CRUD
        Create_Access = [
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmatrix",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          // "milestones",
          "issues",
          "risks",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          "changerequest",
        ];
        CreateChangeRequest_Access = ["initiatives", "projects"]
        Read_Access = [
          "initiatives",
          "initiativedeliverables",
          "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          "benefits",
          "benefitmatrix",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "projects",
          "deliverables",
          "milestones",
          "issues",
          "risks",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          "changerequest",
          "projecthome.aspx",
          "InitiativeHome.aspx",
          "TaskHistory.aspx",
          "tasks",
          "documents",
          "initiativesmain.aspx",
          "home.aspx",
          "projecthome.aspx",
        ];

        Edit_Access = [
          // "initiatives",
          "initiativedeliverables",
          "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmatrix",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          // "milestones",
          "issues",
          "risks",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          //"changerequest",
        ];
        Delete_Access = [
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmatrix",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          // "milestones",

        ];

        // Delete_Access = AllListKeys;
        // Delete_Access = Delete_Access.concat(SP_Page_Name);
        break;

      case "SPMTeam":
        if (USERisHome)
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/sitepages/MainIndicators.aspx";

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isSPMTeam = true;
        isAllKpis = true;
        //***** */
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "إدارة الأداء الإستراتيجي";
        en_UserRole = "Strategy Performance Management";
        //CRUD
        Create_Access = ["benefitmetrics", "BenefitMetrics.aspx",
          "changerequest",
          // "benefits",
        ];
        Read_Access = [
          "goalstrategy",
          "sos",
          "mainkpi",
          "Targets.aspx",
          "benefitmatrix",
          "initiatives",
          "benefits",
          "benefitmatrix",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "MainIndicators.aspx",
          "initiativesmain.aspx",
          "changerequest"
        ];

        Edit_Access = ["benefitmetrics", "BenefitMetrics.aspx",
          // "changerequest",
          // "benefits"
        ];
        Delete_Access = [];
        break;
      case "SPMAdmin":
        if (USERisHome)
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/sitepages/MainIndicators.aspx";

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isSPMAdmin = true;
        isAllKpis = true;
        //***** */
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مسؤول الأداء الإستراتيجي";
        en_UserRole = "Strategy Performance Administrator";
        //CRUD
        Create_Access = [
          // "sos",
          "benefitmatrix",
          // "mainkpi",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "deliverablemetrics",
          "changerequest",
          "Targets.aspx",
          "kpiequations",
        ];
        CreateChangeRequest_Access = [
          "sos",
          "mainkpi",
        ]
        Read_Access = [
          "goalstrategy",
          "mainkpi",
          "sos",
          "initiatives",
          "InitiativeHome.aspx",
          "InitiativesMain.aspx",
          "benefits",
          "Targets.aspx",
          "home.aspx",
          "kpiequations",
          "MainIndicators.aspx",
          "deliverablemetrics",
          "benefitmatrix",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "changerequest",
        ];

        Edit_Access = [
          // "mainkpi",
          // "sos",
          "deliverablemetrics",
          "benefitmatrix",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "benefits",
          "Targets.aspx",
          "kpiequations",
          "benefitsequations",
          //"changerequest",

        ];
        Delete_Access = [
          // "mainkpi",
          // "sos",
          "benefitmatrix",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "benefits",
          // "mainkpi", "sos",  "benefits", "Targets.aspx", "kpiequations", "deliverablemetrics", "benefitmatrix", "benefitmetrics",
          "BenefitMetrics.aspx", //check
        ];
        break;
      case "VROP":

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isVROP = true;
        //***** */
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مكتب التخطيط الإستراتيجي";
        en_UserRole = "Strategic Planning Office";
        //CRUD
        Create_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          "changerequest"
        ];
        CreateChangeRequest_Access = [
          "sos",
          "mainkpi",
        ]
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          //"changerequest"
        ];
        Delete_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi"
        ];
        break;

      case "VROHead":
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isVROHead = true;
        //***** */
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "قائد مكتب تحقيق الرؤية";
        en_UserRole = "Leader of the Vision Realization Office";

        Create_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          "changerequest"
        ];
        CreateChangeRequest_Access = [
          "sos",
          "mainkpi",
        ]
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          //"changerequest"
        ];
        Delete_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi"
        ];
        break;

      case "VROPHead":
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isVROPHead = true;
        //***** */
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مدير ادارة تخطيط اهداف الرؤية";
        en_UserRole = "Director of the Vision Objectives Department";

        Create_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          "changerequest"
        ];
        CreateChangeRequest_Access = [
          "sos",
          "mainkpi",
          "projects"
        ]
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          //"changerequest"
        ];
        Delete_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi"
        ];
        break;

      case "VPlanningUnitHead":
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isVPlanningUnitHead = true;
        //***** */
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مدير وحدة تخطيط الرؤية";
        en_UserRole = "Vision Planning Unit Head";

        Create_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          "changerequest"
        ];
        CreateChangeRequest_Access = [
          "sos",
          "mainkpi",
        ]
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          //"changerequest"
        ];
        Delete_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi"
        ];
        break;

      case "VPlanningUnit":
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isVPlanningUnit = true;
        //***** */
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "وحدة تخطيط الرؤية";
        en_UserRole = "Vision Planning Unit";

        Create_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          "changerequest"
        ];
        CreateChangeRequest_Access = [
          "sos",
          "mainkpi",
          "projects"
        ]
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          //"changerequest"
        ];
        Delete_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi"
        ];
        break;

      case "VROE":

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isVROE = true;
        //***** */
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مكتب ضمان التنفيذ";
        en_UserRole = "Execution Guarantee Office";
        //CRUD
        Create_Access = [
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          "changerequest",
          "documents",

        ];
        CreateChangeRequest_Access = [
          "initiatives", "projects"
        ]
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [
          "benefitmatrix",
          // "initiatives",
          "initiativedeliverables",
          "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          //"changerequest",
          "documents",
        ];
        Delete_Access = [
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts"
        ];
        break;

      case "VROEHead":

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isVROEHead = true;
        //***** */
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مدير ادارة ضمان التنفيذ";
        en_UserRole = "Execution Guarantee Office Head";
        //CRUD
        Create_Access = [
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          "changerequest",
          "documents",

        ];
        CreateChangeRequest_Access = [
          "initiatives",
          "projects",
        ]
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "benefitsequations",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          //"changerequest",
          "documents",
        ];
        Delete_Access = [
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts"
        ];
        break;

      case "LMSE":
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        //***** */
        isLMSE = true;

        ChartHide = ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";

        ar_UserRole = "مكتب ضمان التنفيذ لسوق العمل";
        en_UserRole = "Execution Guarantee Office";
        //CRUD
        Create_Access = [
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          "changerequest",
          "documents",
        ];
        CreateChangeRequest_Access = [
          "initiatives", "projects"
        ]
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "benefitsequations",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          //"changerequest",
          "documents",
        ];
        Delete_Access = [
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          "changerequest",
        ];
        break;

      case "LMSUControl":

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );

        isLMSUControl = true;

        ChartHide = ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";

        ar_UserRole = "وحدة استراتيجية سوق العمل ( إدارة الحوكمة والجودة)";
        en_UserRole = "LMSU Control";

        Create_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          "changerequest",
          "contracts"
        ]
        CreateChangeRequest_Access = [
          "initiatives",
          "projects",
          "sos",
          "mainkpi"
        ]
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);

        Edit_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "benefitsequations",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          // "changerequest",
          "contracts"
        ]
        Delete_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          "changerequest",
        ]
        break;

      case "LMSUExecution":

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );

        isLMSUExecution = true;

        ChartHide = ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";

        ar_UserRole = "وحدة استراتيجية سوق العمل (إدارة التنفيذ)";
        en_UserRole = "LMSU Execution";

        Create_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          "changerequest",
          "contracts"
        ]
        CreateChangeRequest_Access = [
          "initiatives",
          "projects",
          "sos",
          "mainkpi"
        ]
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);

        Edit_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "benefitsequations",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          //"changerequest",
          "contracts"
        ]
        Delete_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          "changerequest",
        ]
        break;

      case "LMSUPerformance":

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );

        isLMSUPerformance = true;

        ChartHide = ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";

        ar_UserRole = " وحدة استراتيجية سوق العمل (إدارة الآداء)";
        en_UserRole = "LMSU Performance";

        Create_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          "changerequest",
          "contracts"
        ]
        CreateChangeRequest_Access = [
          "initiatives",
          "projects",
          "sos",
          "mainkpi"
        ]
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);

        Edit_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "benefitsequations",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          //"changerequest",
          "contracts"
        ]
        Delete_Access = [
          "goalstrategy",
          // "sos",
          // "mainkpi",
          "benefitmatrix",
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativeissues",
          "initiativerisks",
          "initiativemom",
          "closureinitiative",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          // "projects",
          // "deliverables",
          "mom",
          "risks",
          "issues",
          // "milestones",
          "lessonslearned",
          "closureform",
          "coc",
          "stakeholders",
          "communicationplans",
          "changerequest",
        ]

        break;

      case "CRCommittee":

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );

        isCRCommittee = true;

        ChartHide = ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";

        ar_UserRole = "لجنة طلبات التغيير";
        en_UserRole = "Change Request Committee";

        Create_Access = [];

        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);

        Edit_Access = []

        Delete_Access = []

        break;

      case "CRCommitteeVision":

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );

        isCRCommitteeVision = true;

        ChartHide = ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";

        ar_UserRole = "لجنة طلبات التغيير (الرؤية)";
        en_UserRole = "Change Request Committee (Vision)";

        Create_Access = [];

        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);

        Edit_Access = []

        Delete_Access = []

        break;

      case "LMSP":

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );

        isLMSP = true;

        ChartHide = ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";

        ar_UserRole = "مكتب التخطيط الإستراتيجي لسوق العمل";
        en_UserRole = "Strategic Planning Office";
        //CRUD
        Create_Access = [
          // "mainkpi",
          // "sos",
          "goalstrategy",
          "Targets.aspx",
          "changerequest"
        ];
        CreateChangeRequest_Access = [
          "sos",
          "mainkpi",
        ]
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [
          // "mainkpi",
          // "sos",
          "Targets.aspx",
          "kpiequations",
          "goalstrategy",
        ];
        Delete_Access = [
          // "mainkpi",
          // "sos",
          "goalstrategy",
        ];
        break;

      case "EPMO":
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isEPMO = true;
        //***** */
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مكتب المشاريع المؤسسي";
        en_UserRole = "EPMO";
        //CRUD
        Create_Access = [
          "benefitmatrix",
          "initiatives",
          "initiativedeliverables",
          "initiativemilestones",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "closureinitiative",
          "projects",
          "deliverables",
          "milestones",
          "issues",
          "risks",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          "changerequest",
        ];
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [
          "benefitmatrix",
          "initiatives",
          "initiativedeliverables",
          "initiativemilestones",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "closureinitiative",
          "projects",
          "deliverables",
          "milestones",
          "issues",
          "risks",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          //"changerequest",
        ];
        Delete_Access = [
          "benefitmatrix",
          "initiatives",
          "initiativedeliverables",
          "initiativemilestones",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "closureinitiative",
          "projects",
          "deliverables",
          "milestones",
          "issues",
          "risks",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts"
        ];
        // Delete_Access = AllListKeys;
        // Delete_Access = Delete_Access.concat(SP_Page_Name); // to can delete everything
        break;
      case "SPMO":
        isSPMO = true;
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6)";
        ar_UserRole = "مكتب إدارة المشاريع القطاعي";
        en_UserRole = "Sectoral Project Management Office";

        //CRUD
        Create_Access = [
          // for initiative
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativerisks",
          "initiativeissues",
          "initiativemom",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "benefitmatrix",
          "closureinitiative",
          // for projects
          // "projects",
          // "deliverables",
          "risks",
          "issues",
          // "milestones",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          "changerequest",
          "achievements"
        ];
        CreateChangeRequest_Access = [
          "initiatives", "projects"
        ]
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [
          // for initiative
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativerisks",
          "initiativeissues",
          "initiativemom",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "benefitmatrix",
          "closureinitiative",
          // for projects
          // "projects",
          // "deliverables",
          "risks",
          "issues",
          // "milestones",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          //"changerequest",
          "achievements"

        ];
        Delete_Access = [
          // for initiative
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativerisks",
          "initiativeissues",
          "initiativemom",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "benefitmatrix",
          "closureinitiative",
          // for projects
          // "projects",
          // "deliverables",
          "risks",
          "issues",
          // "milestones",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          // "changerequest",
        ];

        break;

      case "SPMOHead":

        isSPMOHead = true;

        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6)";

        ar_UserRole = " مدير مكتب إدارة المشاريع القطاعي";
        en_UserRole = "Sectoral Project Management Office Head";

        Create_Access = [
          // for initiative
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativerisks",
          "initiativeissues",
          "initiativemom",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "benefitmatrix",
          "closureinitiative",
          // for projects
          // "projects",
          // "deliverables",
          "risks",
          "issues",
          // "milestones",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          "changerequest",
        ];
        CreateChangeRequest_Access = ["initiatives", "projects"]
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);

        Edit_Access = [
          // for initiative
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativerisks",
          "initiativeissues",
          "initiativemom",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "benefitmatrix",
          "closureinitiative",
          // for projects
          // "projects",
          // "deliverables",
          "risks",
          "issues",
          // "milestones",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          //"changerequest",
        ];
        Delete_Access = [
          // for initiative
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativerisks",
          "initiativeissues",
          "initiativemom",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "benefitmatrix",
          "closureinitiative",
          // for projects
          // "projects",
          // "deliverables",
          "risks",
          "issues",
          // "milestones",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          // "changerequest",
        ];

        break;
      case "MinisterAssistant":
        isMinisterAssistant = true;

        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "معالى مساعد الوزير";
        en_UserRole = "Minister Assistant";

        //CRUD
        Create_Access = [];
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [];
        break;

      case "ViceMinister":
        isViceMinister = true;
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(4),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "معالى نائب الوزير";
        en_UserRole = "Vice Minister";

        //CRUD
        Create_Access = [];
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [];
        break;

      case "DU":
        isDU = true;

        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";

        ar_UserRole = "مدير وحدة الانجاز";
        en_UserRole = "Development Unit";
        //CRUD
        Create_Access = [
          // for initiative
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativerisks",
          "initiativeissues",
          "initiativemom",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "benefitmatrix",
          "closureinitiative",
          // for projects
          // "projects",
          // "deliverables",
          "risks",
          "issues",
          // "milestones",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          "changerequest",
          "achievements"

        ];
        CreateChangeRequest_Access = [
          "initiatives",
          "projects",
        ]
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);

        Edit_Access = [
          // for initiative
          // "initiatives",
          "initiativedeliverables",
          "initiativemilestones",
          "initiativerisks",
          "initiativeissues",
          "initiativemom",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "benefitmatrix",
          "closureinitiative",
          // for projects
          // "projects",
          "deliverables",
          "risks",
          "issues",
          "milestones",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          //"changerequest",
          "achievements"

        ];
        Delete_Access = [
          // for initiative
          // "initiatives",
          // "initiativedeliverables",
          // "initiativemilestones",
          "initiativerisks",
          "initiativeissues",
          "initiativemom",
          // "benefits",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "benefitmatrix",
          "closureinitiative",
          // for projects
          // "projects",
          // "deliverables",
          "risks",
          "issues",
          // "milestones",
          "mom",
          "closureform",
          "lessonslearned",
          "coc",
          "stakeholders",
          "communicationplans",
          "contracts",
          // "changerequest",
        ];

        break;
      case "SubSectorHead":
        isSubSectorHead = true;
        // (SecondLevel_List = "Internal Entities"),
        //   (SecondLevel_FieldtoQuery = "Manager"),
        //   (SecondLevel_FieldtoQueryType = "Choice");
        // (SecondLevel_FieldtoFetch = "Title"),
        //   (SecondLevel_CAMLQuery =
        //     "<View><Query><Where>" +
        //     "<And>" +
        //     "<Eq>" +
        //     '<FieldRef Name="' +
        //     SecondLevel_FieldtoQuery +
        //     '" LookupId="TRUE" />' +
        //     '<Value Type="' +
        //     SecondLevel_FieldtoQueryType +
        //     '"><UserID /></Value>' +
        //     "</Eq>" +
        //     "<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
        //     "</And>" +
        //     "</Where></Query></View>"),
        //   (SecondLevel_FirstLevel_Field = "SubSector"),
        //   (SecondLevel_FirstLevel_FieldType = "Text");
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "وكيل ";
        en_UserRole = "SubSector Head of ";

        //CRUD
        Create_Access = [];
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [];
        break;
      case "GeneralManager":
        isGeneralManager = true;
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = " مدير إدارة ";
        en_UserRole = "General Manager of ";

        //CRUD
        Create_Access = [];
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [];
        break;

      case "BITeam":
        isBITeam = true;
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        //***** *
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "فريق ذكاء الأعمال";
        en_UserRole = "BI Team";
        //CRUD
        Create_Access = [];
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [];
        Delete_Access = [];
        break;

      case "StrategyTeam":

        // if (USERisHome)
        //   window.location =
        //     _spPageContextInfo.webAbsoluteUrl +
        //     "/sitepages/MainIndicators.aspx";

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isStrategyTeam = true;
        isAllKpis = true;
        //***** */
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "الفريق الاستراتيجي";
        en_UserRole = "Strategy Team";
        //CRUD
        Create_Access = [
          "goalstrategy",
          "spillars",
          // "sos",
          // "mainkpi",
          "changerequest"
        ];
        CreateChangeRequest_Access = [
          "sos",
          "mainkpi",
        ]
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);

        Edit_Access = [
          // "goalstrategy",
          // "spillars",
          // "sos",
          // "mainkpi",
          //"changerequest"
        ];
        Delete_Access = [];
        break;
      case "KPIOwner":
        if (USERisHome)
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/sitepages/MainIndicators.aspx";
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isKPIOWNER = true;
        isAllKpis = true;
        //***** *
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مالك المؤشرات";
        en_UserRole = "KPIs Owner";
        //CRUD
        Create_Access = [
          "changerequest"
        ];
        Read_Access = [
          "mainkpi",
          "sos",
          "goalstrategy",
          "changerequest",
          "Targets.aspx",
          "kpiequations",
          "MainIndicators.aspx",
          "tasks"
        ];
        Edit_Access = [
          // "mainkpi"
        ];
        Delete_Access = [];
        break;

      case "ObjectiveOwner":

        if (USERisHome)
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/sitepages/MainIndicators.aspx";

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );

        isObjectiveOwner = true;

        ChartHide = ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";

        ar_UserRole = "مالك الهدف";
        en_UserRole = "Objective Owner";

        Create_Access = [
          "mainkpi",
          "changerequest"
        ];
        Read_Access = [
          "mainkpi",
          "sos",
          "goalstrategy",
          "Targets.aspx",
          "kpiequations",
          "MainIndicators.aspx",
          "tasks",
          "changerequest"
        ];
        Edit_Access = [
          "mainkpi",
          //"changerequest"
        ];
        Delete_Access = [];

        break;
      case "PerformanceLeader":
        if (USERisHome)
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/sitepages/MainIndicators.aspx";
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isPerformanceLeader = true;
        isAllKpis = true;
        //***** */
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "رائد الأداء";
        en_UserRole = "Performance Leader";
        //CRUD
        Create_Access = ["Targets.aspx",
          "BenefitMetrics.aspx",
          "changerequest"];
        Read_Access = [
          "mainkpi",
          "sos",
          "goalstrategy",
          "Targets.aspx",
          "kpiequations",
          "MainIndicators.aspx",
          "benefitmatrix",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "benefits",
          "initiatives",
          "InitiativeHome.aspx",
          "initiativesmain.aspx",
          "changerequest"
        ];
        Edit_Access = [
          "Targets.aspx",
          // "mainkpi",
          // "sos",
          "benefitmetrics",
          "BenefitMetrics.aspx",
          "kpiequations",
          "MainIndicators.aspx",
          //"changerequest"
        ];
        Delete_Access = [];
        break;

      case "StrategicPartnershipsTeam":
        if (USERisHome)
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/sitepages/Listing.aspx?ListKey=strategicpartnerships";
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isStrategicPartnershipsTeam = true;

        //***** */
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "فريق الشراكة الاستراتيجية";
        en_UserRole = "Startegic Partnerships Team";

        Create_Access = [
          "strategicpartnerships",
          "StrategicPartnershipHome.aspx",
          "strategicpartnershipsdeliverables",
          "strategicpartnershipsmilestones",
          "strategicpartnershipsissues",
          "strategicpartnershipsrisks",
          "strategicpartnershipsimpactmeasurement",
          "strategicpartnershipslessonslearned",
          "strategicpartnershipsmom",
          "strategicpartnershipsachievements",
          "strategicpartnershipsvendors"
        ];

        Read_Access = [
          "strategicpartnerships",
          "StrategicPartnershipHome.aspx",
          "strategicpartnershipsdeliverables",
          "strategicpartnershipsmilestones",
          "strategicpartnershipsissues",
          "strategicpartnershipsrisks",
          "strategicpartnershipsimpactmeasurement",
          "strategicpartnershipslessonslearned",
          "strategicpartnershipsmom",
          "documents",
          "strategicpartnershipsachievements",
          "tasks",
          "strategicpartnershipsvendors"
        ];
        Edit_Access = [
          "strategicpartnerships",
          "StrategicPartnershipHome.aspx",
          "strategicpartnershipsdeliverables",
          "strategicpartnershipsmilestones",
          "strategicpartnershipsissues",
          "strategicpartnershipsrisks",
          "strategicpartnershipsimpactmeasurement",
          "strategicpartnershipslessonslearned",
          "strategicpartnershipsmom",
          "strategicpartnershipsachievements",
          "tasks",
          "strategicpartnershipsvendors"
        ];
        Delete_Access = [
          "strategicpartnerships",
          "StrategicPartnershipHome.aspx",
          "strategicpartnershipsdeliverables",
          "strategicpartnershipsmilestones",
          "strategicpartnershipsissues",
          "strategicpartnershipsrisks",
          "strategicpartnershipsimpactmeasurement",
          "strategicpartnershipslessonslearned",
          "strategicpartnershipsmom",
          "strategicpartnershipsachievements",
          "strategicpartnershipsvendors"
        ];
        break;

      case "PartnershipRepresentative":
        if (USERisHome)
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/sitepages/Listing.aspx?ListKey=strategicpartnerships";
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );

        isPartnershipRepresentative = true

        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "ممثل الشراكة الاستراتيجية";
        en_UserRole = "Partnership Representative";

        //CRUD
        Create_Access = [
          "strategicpartnerships",
          "StrategicPartnershipHome.aspx",
          "strategicpartnershipsdeliverables",
          "strategicpartnershipsmilestones",
          "strategicpartnershipsissues",
          "strategicpartnershipsrisks",
          "strategicpartnershipslessonslearned",
          "strategicpartnershipsmom",

        ];
        Read_Access = [
          "strategicpartnerships",
          "StrategicPartnershipHome.aspx",
          "strategicpartnershipsdeliverables",
          "strategicpartnershipsmilestones",
          "strategicpartnershipsissues",
          "strategicpartnershipsrisks",
          "strategicpartnershipsimpactmeasurement",
          "strategicpartnershipslessonslearned",
          "strategicpartnershipsmom",
          "documents",
          "strategicpartnershipsachievements",
          "tasks",
          "strategicpartnershipsvendors"
        ];
        Edit_Access = [];
        Delete_Access = []
        break;

      case "RelationshipManager":
        if (USERisHome)
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/sitepages/Listing.aspx?ListKey=strategicpartnerships";

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );

        isRelationshipManager = true

        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";

        ar_UserRole = "مدير علاقات الشراكة الاستراتيجية";
        en_UserRole = "Relationship Manager";

        Create_Access = []
        Read_Access = [
          "strategicpartnerships",
          "StrategicPartnershipHome.aspx",
          "strategicpartnershipsdeliverables",
          "strategicpartnershipsmilestones",
          "strategicpartnershipsissues",
          "strategicpartnershipsrisks",
          "strategicpartnershipsimpactmeasurement",
          "strategicpartnershipslessonslearned",
          "strategicpartnershipsmom",
          "documents",
          "strategicpartnershipsachievements",
          "tasks"
        ];
        Edit_Access = [];
        Delete_Access = [];

        break;

      case "StrategicAchievementTeam":
        if (USERisHome)
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/sitepages/Listing.aspx?ListKey=achievements";

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );

        isStrategicAchievementTeam = true

        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";

        ar_UserRole = "فريق المنجزات الاستراتيجية";
        en_UserRole = "Startegic Achievement Team";

        Create_Access = ["documents",
          "achievements"]
        Read_Access = [
          // "strategicpartnerships",
          // "StrategicPartnershipHome.aspx",
          "documents",
          "achievements",
          // "strategicpartnershipsachievements",
          "tasks"
        ];
        Edit_Access = [
          // "strategicpartnerships",
          // "StrategicPartnershipHome.aspx",
          "documents",
          "achievements",
          // "strategicpartnershipsachievements",
          "tasks"];
        Delete_Access = [
          // "strategicpartnerships",
          // "StrategicPartnershipHome.aspx",
          "documents",
          "achievements",
          // "strategicpartnershipsachievements",
          "tasks"
        ];
        break;

      case "BudgetManager":

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );

        isBudgetManager = true;

        ChartHide = ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";

        ar_UserRole = "مدير الميزانية";
        en_UserRole = "Budget Manager";

        Create_Access = [];

        Read_Access = [
          "initiatives",
          "initiativedeliverables",
          "initiativemilestones",
          "projects",
          "deliverables",
          "milestones",
          "coc",
          "documents",
          "tasks",
          "InitiativeHome.aspx",
          "initiativesmain.aspx",
          "projecthome.aspx",
          "home.aspx"

        ];

        Edit_Access = []

        Delete_Access = []

        break;

      case "PortfolioManager":

        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );

        isPortfolioManager = true;

        ChartHide = ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";


        ar_UserRole = "مدير المحفظة";
        en_UserRole = "Portfolio Manager";

        Create_Access = [];

        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);

        Edit_Access = []

        Delete_Access = []
        break;

      default:
        ChartHide =
          ".ctx-block.row.mx-n2 > div:nth-child(4),.ctx-block.row.mx-n2 > div:nth-child(5),.ctx-block.row.mx-n2 > div:nth-child(6),.ctx-block.row.mx-n2 > div:nth-child(7)";
        //CRUD
        Create_Access = [];
        Read_Access = [];
        Edit_Access = [];
    }

    //New CRUD Access Solution [will not affect below behavior]
    (Create_Access = Create_Access.map((name) => name.toLowerCase())), //making sure everything is lower case
      (CreateChangeRequest_Access = CreateChangeRequest_Access.map((name) => name.toLowerCase())),
      (Read_Access = Read_Access.map((name) => name.toLowerCase())),
      (Edit_Access = Edit_Access.map((name) => name.toLowerCase())),
      (Delete_Access = Delete_Access.map((name) => name.toLowerCase()));

    switch (
    true //Create Access
    ) {
      case (USERisNew || USERisListing || USERisProjectHome || USERisInitiativeHome || USERisStrategicPartnershipHome) &&
        Create_Access.indexOf(USERlistkey) == -1 &&
        Create_Access.indexOf(Page_UrlName) == -1 &&
        !USERisWF:
        if (USERisNew) {
          if (CreateChangeRequest_Access.indexOf(USERlistkey) == -1 &&
            CreateChangeRequest_Access.indexOf(Page_UrlName) == -1) {
            // on edit/new forms
            userCalls.g.Security_Msg();
            console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          }
        } else if (isSP_Page) {
          // on restricted  page
          userCalls.g.Security_Msg();
          console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }

        //create btn
        //disable

        $("body").append(
          "<style>" +
          ".btn-add{opacity: .6;pointer-events: none;display:none}" +
          "</style>"
        );

        // reenable if has access
        Create_Access.forEach(function (o, i, a) {
          $("body").append(
            "<style>" +
            '.btn-add[href*="ListKey=' +
            o +
            '"]{opacity: 1!important;pointer-events: auto!important;display:block}' +
            "</style>"
          );
        });
        break;
    }

    switch (
    true //Read Access
    ) {
      case Read_Access.indexOf(USERlistkey) == -1 &&
        Read_Access.indexOf(Page_UrlName) == -1 &&
        !USERisWF:
        if (USERisView) {
          //on view
          window.location = _spPageContextInfo.webAbsoluteUrl;
        } else if (USERisListing) {
          //on listing
          userCalls.g.Security_Msg();
          console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        } else if (isSP_Page) {
          // on restricted  page
          userCalls.g.Security_Msg();
          console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
        break;
    }
    switch (
    true //Edit Access
    ) {
      case (USERisEdit || USERisView) &&
        Edit_Access.indexOf(USERlistkey.toLowerCase()) == -1 &&
        !USERisWF:
        if (USERisEdit) {
          //on edit
          window.location = _spPageContextInfo.webAbsoluteUrl;
        } else if (USERisView) {
          //on view pages
          $("body").append(
            "<style>" +
            ".btn-save{opacity: .6;pointer-events: none;display:none}" +
            "</style>"
          );
        } else if (isSP_Page) {
          // on restricted  page
          // window.location = _spPageContextInfo.webAbsoluteUrl + '/sitepages/' + USER_HomePage;
          userCalls.g.Security_Msg();
          console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
        break;

      case (USERisEdit || USERisView) &&
        Edit_Access.indexOf(USERlistkey.toLowerCase()) == -1 &&
        Edit_Access.indexOf(Page_UrlName) == -1 &&
        USERisWF:
        if (USERisEdit) {
          //on edit
          $("body").append(
            "<style>" +
            ".btn-save{opacity: .6;pointer-events: none;display:none}" +
            "</style>"
          );
        }
        break;
    }
    switch (
    true //Delete Access
    ) {
      case Delete_Access.indexOf(USERlistkey.toLowerCase()) == -1:
        //Delete btn
        $("body").append(
          "<style>" +
          ".btn-delete{opacity: .6;pointer-events: none;display:none;}" +
          "</style>"
        );
        break;
    }
    // switch (
    //   true //Create Access
    //   ) {
    //     case ((USERisTargets) &&
    //       (Create_Access.indexOf('Targets.aspx') == -1 && Create_Access.indexOf('targets.aspx') == -1 )
    //       &&
    //       (Edit_Access.indexOf('Targets.aspx') == -1 && Edit_Access.indexOf('targets.aspx') == -1)
    //       ) :
    //       //SEND btn
    //       //disable

    //       $("body").append(
    //         "<style>" +
    //         ".btn-addTarget{opacity: .6;pointer-events: none;display:none}" +
    //         "</style>"
    //       );
    //       break;
    //   }
    //end CRUD


    if (isthereICODE) { // to get the info of initiatives
      Get_Initiative_Info_Request.preinit()
    }

    if (isthereSTCODE) { // to render the info of strategic partnership
      Get_StrategicPartnerShip_Info_Request.preinit()
    }

    // if (
    // 	// (!isInitiativesHomePage && !isInManager && !isInOwner) ||
    // 	isDU ||
    // 	isMinisterAssistant ||
    // 	isViceMinister ||
    // 	isSectorHead ||
    // 	isSubSectorHead ||
    // 	isGeneralManager
    // ) {
    if (
      !isSectionHead
      //!isSectorHead &&
      // !isSPMO &&
      // !isDU &&
      // !isGeneralManager
      // &&
      // !isSubSectorHead
      // !isMinisterAssistant &&
      // !isViceMinister
    ) {
      // IF Data directly getting from project list
      //
      Access_Project_Info_Request.preinit();
    } else if (
      (istherePCODE ||
        USERisHome ||
        USERisListing ||
        isInitiativesHomePage ||
        isTarget
        // || isMainIndicator
      ) &&
      (isSectionHead
        //isSectorHead ||
        // isSPMO ||
        // isSubSectorHead ||
        // isGeneralManager
        // isDU ||
        // isMinisterAssistant ||
        //isViceMinister
      )
    ) {
      //if data getting from other list related to project

      Access_Sector_Info_Request.preinit();
    }
    // else if (isthereICODE && isDU) {
    //   Access_Sector_Info_Request.preinit();
    // }
    else {
      window.checkBreadCrumbsStatusHtml = setInterval(function () {
        Access_Project_Info_Request.g.handleBreadcrumbs();
      }, 333);
    }
    // }

    if (USERisForm) {
      window.UsercheckFieldsHtml = setInterval(function () {
        userCalls.g.checkFieldsHtml();
      }, 333);
      if (
        USERisWF &&
        (USERlistkey == "changerequest" || USERlistkey == "deliverables")
      ) {
        $(".btn-delete").remove();
        $(".btn-save").remove();
      }
    }


    // handle the initiative manager and owner Groups
    // if (isInitiativesHomePage) {
    // if (isInManager || isInOwner) {
    // 	Access_Initiative_Info_Request.preinit();
    // }
    // }
    //
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
        SP.SOD.loadMultiple(["PS.ProjectContext"], GetProjects);
      },
      error: function (data) {
        if (data.status == "401") {
          console.log("User have no License");
          window.UserHaveLicense = false;
        }
      },
    });
  },
  g: {
    SPGroups: [
      {
        Role: "Administrator",
        groupsName: ["System Admin Group"],
      },
      {
        Role: "Minister",
        groupsName: ["Minister"],
      },
      {
        Role: "SectorHead",
        groupsName: ["Sector Head"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "Manager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Initiatives",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "Manager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "Manager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "GoalStrategy",
                  parentRelationField: "RelatedStrategy",
                  RelationField: "Title",
                  RelationFieldType: "Text",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "Manager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                },
              },
            },
          ]
        }
      },
      {
        Role: "ProjectManager",
        groupsName: ["Project Managers for Project Web App"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "Projects",
              accessConditions: [
                {
                  field: "ProjectManager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "",
                //RelatedInitiative
                // parentRelationField: "RelatedInitiative",
                // RelationField: "Title",
                // RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                  // parentRelationField: "Title",
                  // RelationField: "InitiativeCode",
                  // RelationFieldType: "Text",
                },
              },
            },
          ],
        },
      },
      {
        Role: "ProjectOwner",
        groupsName: ["Project Owners for Project Web App"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "Projects",
              accessConditions: [
                {
                  field: "ProjectOwner",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "",
                // parentRelationField: "RelatedInitiative",
                // RelationField: "Title",
                // RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
          ],
        },
      },

      {
        Role: "InitiativeManager",
        groupsName: ["Initiative Manager"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "Initiatives",
              accessConditions: [
                {
                  field: "InitiativePM",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                //RelatedInitiative
                parentRelationField: "Title",
                RelationField: "RelatedInitiative",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",

                },
              },
            },
          ],
        },
      },
      {
        Role: "InitiativeOwner",
        groupsName: ["Initiative Owner"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "Initiatives",
              accessConditions: [
                {
                  field: "InitiativeOwner",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                //RelatedInitiative
                parentRelationField: "Title",
                RelationField: "RelatedInitiative",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                  // parentRelationField: "Title",
                  // RelationField: "InitiativeCode",
                  // RelationFieldType: "Text",
                },
              },
            },
          ],
        },
      },
      //   {
      // 	Role: "SPMTeam",
      // 	groupsName: ["SPM Team"],
      // },
      // {
      // 	Role: "SPMTeam",
      // 	groupsName: ["SPM Team"],
      // 	dataFilter: {
      // 		hierarchies: [
      // 			{
      // 				level: 1,
      // 				listName: "GoalStrategy",
      // 				accessConditions: [
      // 					{
      // 						field: "Types",
      // 						type: "Choice",
      // 						values: ["ministry"],
      // 						targetPages: [
      // 							"home.aspx",
      // 							"new.aspx",
      // 							"edit.aspx?ListKey=projects",
      // 						],
      // 					},
      // 				],
      // 				subRelation: {
      // 					level: 2,
      // 					listName: "SOs",
      // 					parentRelationField: "Title",
      // 					RelationField: "RelatedStrategy",
      // 					RelationFieldType: "Text",
      // 					subRelation: {
      // 						level: 3,
      // 						listName: "",
      // 						// parentRelationField: "Title",
      // 						// RelationField: "InitiativeCode",
      // 						// RelationFieldType: "Text",
      // 					},
      // 				},
      // 			},
      // 			{
      // 				level: 1,
      // 				listName: "GoalStrategy",
      // 				accessConditions: [
      // 					{
      // 						field: "Types",
      // 						type: "Choice",
      // 						values: ["ministry"],
      // 						targetPages: [
      // 							"home.aspx",
      // 							"new.aspx",
      // 							"edit.aspx?ListKey=projects",
      // 						],
      // 					},
      // 				],
      // 				subRelation: {
      // 					level: 2,
      // 					listName: "MainKPI",
      // 					parentRelationField: "Title",
      // 					RelationField: "RelatedStrategy",
      // 					RelationFieldType: "Text",
      // 					subRelation: {
      // 						level: 3,
      // 						listName: "KPIResults",
      // 						parentRelationField: "Title",
      // 						RelationField: "KPI",
      // 						RelationFieldType: "Text",
      // 						// listName: "",
      // 						// // parentRelationField: "Title",
      // 						// // RelationField: "InitiativeCode",
      // 						// // RelationFieldType: "Text",
      // 					},
      // 				},
      // 			},
      // 		],
      // 	},
      // },
      {
        Role: "SPMTeam",
        groupsName: ["SPM Team"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["ministry"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                },
              },
            },
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["ministry"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "Initiatives",
                  parentRelationField: "Title",
                  RelationField: "RelatedObjective",
                  isMultiSelectField: true, // add this attr if the field in list name is a multiselectlookup to get the values contain
                  RelationFieldType: "Text"
                },
              },
            }


            // {
            // 	level: 1,
            // 	listName: "GoalStrategy",
            // 	accessConditions: [
            // 		{
            // 			field: "Types",
            // 			type: "Choice",
            // 			values: ["ministry"],
            // 			targetPages: [
            // 				"home.aspx",
            // 				"new.aspx",
            // 				"edit.aspx?ListKey=projects",
            // 			],
            // 		},
            // 	],
            // 	subRelation: {
            // 		level: 2,
            // 		listName: "MainKPI",
            // 		parentRelationField: "Title",
            // 		RelationField: "RelatedStrategy",
            // 		RelationFieldType: "Text",
            // 		subRelation: {
            // 			level: 3,
            // 			listName: "KPIResults",
            // 			parentRelationField: "Title",
            // 			RelationField: "KPI",
            // 			RelationFieldType: "Text",
            // 			// listName: "",
            // 			// // parentRelationField: "Title",
            // 			// // RelationField: "InitiativeCode",
            // 			// // RelationFieldType: "Text",
            // 		},
            // 	},
            // },
          ],
        },
      },
      {
        Role: "SPMAdmin",
        groupsName: ["SPM Admin"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["ministry"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",

                  }
                },
              },
            },
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["ministry"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "Initiatives",
                  parentRelationField: "Title",
                  RelationField: "RelatedObjective",
                  isMultiSelectField: true, // add this attr if the field in list name is a multiselectlookup to get the values contain
                  RelationFieldType: "Text"
                },
              },
            }
          ],
        },
      },
      {
        Role: "VROE",
        groupsName: ["VRO_E"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["vision"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                }
              },
            },
            {
              level: 1,
              listName: "Initiatives",
              accessConditions: [
                {
                  field: "Types",
                  type: "Text",
                  values: ["vision"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "RelatedInitiative",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
          ],
        },
      },
      {
        Role: "VROP",
        groupsName: ["VRO_P"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["vision"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",

                  }
                }
              },
            },
            {
              level: 1,
              listName: "Initiatives",
              accessConditions: [
                {
                  field: "Types",
                  type: "Text",
                  values: ["vision"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "RelatedInitiative",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
          ],
        },
      },
      {
        Role: "LMSE",
        groupsName: ["LMS_E"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["lms"],
                  targetPages: [
                    // "home.aspx",
                    // "new.aspx",
                    // "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                }
              },
            },
            {
              level: 1,
              listName: "Initiatives",
              accessConditions: [
                {
                  field: "Types",
                  type: "Text",
                  values: ["lms"],
                  targetPages: [
                    // "home.aspx",
                    // "new.aspx",
                    // "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "RelatedInitiative",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
          ],
        },
      },
      {
        Role: "LMSP",
        groupsName: ["LMS_P"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["lms"],
                  targetPages: [
                    // "home.aspx",
                    // "new.aspx",
                    // "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                }
              },
            },
            {
              level: 1,
              listName: "Initiatives",
              accessConditions: [
                {
                  field: "Types",
                  type: "Text",
                  values: ["lms"],
                  targetPages: [
                    // "home.aspx",
                    // "new.aspx",
                    // "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "RelatedInitiative",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
          ],
        },
      },
      // {
      //   Role: "LMSP",
      //   groupsName: ["LMS_P"],
      //   dataFilter: {
      //     hierarchies: [
      //       {
      //         level: 1,
      //         listName: "GoalStrategy",
      //         accessConditions: [
      //           {
      //             field: "Types",
      //             type: "Choice",
      //             values: ["lms"],
      //             targetPages: [
      //               "home.aspx",
      //               "new.aspx",
      //               "edit.aspx?ListKey=projects",
      //             ],
      //           },
      //         ],
      //         subRelation: {
      //           level: 2,
      //           listName: "SOs",
      //           parentRelationField: "Title",
      //           RelationField: "RelatedStrategy",
      //           RelationFieldType: "Text",
      //           subRelation: {
      //             level: 3,
      //             listName: "",
      //             // parentRelationField: "Title",
      //             // RelationField: "InitiativeCode",
      //             // RelationFieldType: "Text",
      //           },
      //         },
      //       },
      //       {
      //         level: 1,
      //         listName: "GoalStrategy",
      //         accessConditions: [
      //           {
      //             field: "Types",
      //             type: "Choice",
      //             values: ["lms"],
      //             targetPages: [
      //               "home.aspx",
      //               "new.aspx",
      //               "edit.aspx?ListKey=projects",
      //             ],
      //           },
      //         ],
      //         subRelation: {
      //           level: 2,
      //           listName: "MainKPI",
      //           parentRelationField: "Title",
      //           RelationField: "RelatedStrategy",
      //           RelationFieldType: "Text",
      //           subRelation: {
      //             level: 3,
      //             listName: "KPIResults",
      //             parentRelationField: "Title",
      //             RelationField: "KPI",
      //             RelationFieldType: "Text",
      //           },
      //         },
      //       },
      //     ],
      //   },
      // },
      {
        Role: "StrategyTeam",
        groupsName: ["Strategy Specialist"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["ministry"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                },
              },
            },
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["ministry"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "Initiatives",
                  parentRelationField: "Title",
                  RelationField: "RelatedObjective",
                  isMultiSelectField: true, // add this attr if the field in list name is a multiselectlookup to get the values contain
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "Projects",
                    parentRelationField: "Title",
                    RelationField: "RelatedInitiative",
                    RelationFieldType: "Text",
                  }
                },
              },
            }
          ],
        },
      },
      {
        Role: "SPMO",
        groupsName: ["SPMO"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "SPMO",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Initiatives",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "SPMO",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "SPMO",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "GoalStrategy",
                  parentRelationField: "RelatedStrategy",
                  RelationField: "Title",
                  RelationFieldType: "Text",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "SPMO",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                },
              },
            },

          ]
        }
      },
      {
        Role: "DU",
        groupsName: ["Development Unit"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "SPMO",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Department"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Initiatives",
                parentRelationField: "Title",
                RelationField: "SubSector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "SPMO",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Department"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "SubSector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "SPMO",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Department"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "SubSector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "GoalStrategy",
                  parentRelationField: "RelatedStrategy",
                  RelationField: "Title",
                  RelationFieldType: "Text",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "SPMO",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Department"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "SubSector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                },
              },
            },

          ]
        }
      },
      // {
      // 	Role: "SPMO",
      // 	groupsName: ["SPMO"],
      // },
      // {
      //   Role: "DU",
      //   groupsName: ["Development Unit"],
      // },
      // {
      //   Role: "MinisterAssistant",
      //   groupsName: ["Minister Assistant"],
      // },

      {
        Role: "MinisterAssistant",
        groupsName: ["Minister Assistant"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "MinisterAssistant",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Initiatives",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "MinisterAssistant",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "MinisterAssistant",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "GoalStrategy",
                  parentRelationField: "RelatedStrategy",
                  RelationField: "Title",
                  RelationFieldType: "Text",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "MinisterAssistant",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                },
              },
            },
          ]
        }
      },
      {
        Role: "ViceMinister",
        groupsName: ["Vice Minister"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "ViceMinister",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Initiatives",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "ViceMinister",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "ViceMinister",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "GoalStrategy",
                  parentRelationField: "RelatedStrategy",
                  RelationField: "Title",
                  RelationFieldType: "Text",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "ViceMinister",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                },
              },
            },
          ]
        }
      },
      {
        Role: "BITeam",
        groupsName: ["BI Team"],
      },
      {
        Role: "EPMO",
        groupsName: ["EPMO"],
      },
      {
        Role: "KPIOwner",
        groupsName: ["KPI Owners"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "MainKPI",
              accessConditions: [
                {
                  field: "Owner",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "RelatedStrategyObjective",
                RelationField: "Title",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "GoalStrategy",
                  parentRelationField: "RelatedStrategy",
                  RelationField: "Title",
                  RelationFieldType: "Text",
                },
              },
            },
            {
              level: 1,
              listName: "MainKPI",
              accessConditions: [
                {
                  field: "Owner",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "KPIResults",
                parentRelationField: "Title",
                RelationField: "KPI",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: ""
                }
              }
            }
          ],
        },
      },
      // {
      // 	Role: "KPIOwner",
      // 	groupsName: ["KPI Owners"],
      // },
      // {
      //   Role: "SubSectorHead",
      //   groupsName: ["SubSector Head"],
      // },
      {
        Role: "SubSectorHead",
        groupsName: ["SubSector Head"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "Manager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Department"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Initiatives",
                parentRelationField: "Title",
                RelationField: "SubSector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "Manager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Department"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "SubSector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "Manager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Department"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "SubSector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "GoalStrategy",
                  parentRelationField: "RelatedStrategy",
                  RelationField: "Title",
                  RelationFieldType: "Text",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "Manager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Department"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "SubSector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                },
              },
            },
          ]
        }
      },
      {
        Role: "GeneralManager",
        groupsName: ["General Manager"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "Manager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Department"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Initiatives",
                parentRelationField: "Title",
                RelationField: "SubSector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "Manager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Department"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "SubSector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "Manager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Department"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "SubSector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "GoalStrategy",
                  parentRelationField: "RelatedStrategy",
                  RelationField: "Title",
                  RelationFieldType: "Text",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "Manager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Department"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "SubSector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                },
              },
            },
          ]
        }
      },
      // {
      //   Role: "GeneralManager",
      //   groupsName: ["General Manager"],
      // },
      // {
      //   Role: "PerformanceLeader",
      //   groupsName: ["Performance Leaders"],
      // },
      {
        Role: "PerformanceLeader",
        groupsName: ["Performance Leaders"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "MainKPI",
              accessConditions: [
                // add condition type or for two obj in accessConditions to can get the data and related data 
                //if the user is LoogedInUser in field one or LoggedInUser in field 2  
                {
                  field: "PerformanceLeader",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                  conditionType: "Or"
                },
                {
                  field: "PerformanceLeader2",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                  conditionType: "Or"
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "RelatedStrategyObjective",
                RelationField: "Title",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "GoalStrategy",
                  parentRelationField: "RelatedStrategy",
                  RelationField: "Title",
                  RelationFieldType: "Text",
                },
              },
            },
            {
              level: 1,
              listName: "MainKPI",
              accessConditions: [
                // add condition type or for two obj in accessConditions to can get the data and related data 
                //if the user is LoogedInUser in field one or LoggedInUser in field 2  
                {
                  field: "PerformanceLeader",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "PerformanceLeader2",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                  conditionType: "Or"
                },
              ],
              subRelation: {
                level: 2,
                listName: "KPIResults",
                parentRelationField: "Title",
                RelationField: "KPI",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: ""
                }
              }
            },
            {
              level: 1,
              listName: "MainKPI",
              accessConditions: [
                // add condition type or for two obj in accessConditions to can get the data and related data 
                //if the user is LoogedInUser in field one or LoggedInUser in field 2  
                {
                  field: "PerformanceLeader",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "PerformanceLeader2",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                  conditionType: "Or"
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "RelatedStrategyObjective",
                RelationField: "Title",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "Initiatives",
                  parentRelationField: "Title",
                  RelationField: "RelatedObjective",
                  isMultiSelectField: true, // add this attr if the field in list name is a multiselectlookup to get the values contain
                  RelationFieldType: "Text"
                },
              }
            }
          ],
        },
      },
      {
        Role: "StrategicPartnershipsTeam",
        groupsName: ["Strategic Partnerships Team"],

      },
      {
        Role: "PartnershipRepresentative",
        groupsName: ["Partnership Representative"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "PartnershipRepresentative",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Department"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Strategic Partnerships",
                parentRelationField: "Title",
                RelationField: "SubSector",
                RelationFieldType: "Text",
                isMultiSelectField: true, // add this attr if the field in list name is a multiselectlookup to get the values contain
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            }
          ]
        }
      },
      {
        Role: "RelationshipManager",
        groupsName: ["Relationship Manager"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "Strategic Partnerships",
              accessConditions: [
                {
                  field: "PartnershipManager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
          ]
        }
      },
      {
        Role: "StrategicAchievementTeam",
        groupsName: ["Strategic Achievement Team"],
      },
      {
        Role: "VROHead",
        groupsName: ["VRO Head"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["vision"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",

                  }
                }
              },
            },
            {
              level: 1,
              listName: "Initiatives",
              accessConditions: [
                {
                  field: "Types",
                  type: "Text",
                  values: ["vision"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "RelatedInitiative",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
          ],
        },
      },
      {
        Role: "VROPHead",
        groupsName: ["VRO-P Head"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["vision"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",

                  }
                }
              },
            },
            {
              level: 1,
              listName: "Initiatives",
              accessConditions: [
                {
                  field: "Types",
                  type: "Text",
                  values: ["vision"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "RelatedInitiative",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
          ],
        },
      },
      {
        Role: "VPlanningUnitHead",
        groupsName: ["V Planning Unit Head"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["vision"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",

                  }
                }
              },
            },
            {
              level: 1,
              listName: "Initiatives",
              accessConditions: [
                {
                  field: "Types",
                  type: "Text",
                  values: ["vision"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "RelatedInitiative",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
          ],
        },
      },
      {
        Role: "VPlanningUnit",
        groupsName: ["V Planning Unit"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["vision"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",

                  }
                }
              },
            },
            {
              level: 1,
              listName: "Initiatives",
              accessConditions: [
                {
                  field: "Types",
                  type: "Text",
                  values: ["vision"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "RelatedInitiative",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
          ],
        },
      },
      {
        Role: "VROEHead",
        groupsName: ["VRO-E Head"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["vision"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                }
              },
            },
            {
              level: 1,
              listName: "Initiatives",
              accessConditions: [
                {
                  field: "Types",
                  type: "Text",
                  values: ["vision"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "RelatedInitiative",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
          ],
        },
      },
      {
        Role: "LMSUControl",
        groupsName: ["LMSU-Control"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["lms"],
                  targetPages: [

                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                }
              },
            },
            {
              level: 1,
              listName: "Initiatives",
              accessConditions: [
                {
                  field: "Types",
                  type: "Text",
                  values: ["lms"],
                  targetPages: [
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "RelatedInitiative",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
          ],
        },
      },
      {
        Role: "LMSUExecution",
        groupsName: ["LMSU-Execution"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["lms"],
                  targetPages: [

                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                }
              },
            },
            {
              level: 1,
              listName: "Initiatives",
              accessConditions: [
                {
                  field: "Types",
                  type: "Text",
                  values: ["lms"],
                  targetPages: [
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "RelatedInitiative",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
          ],
        },
      },
      {
        Role: "LMSUPerformance",
        groupsName: ["LMSU-Performance"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["lms"],
                  targetPages: [

                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                }
              },
            },
            {
              level: 1,
              listName: "Initiatives",
              accessConditions: [
                {
                  field: "Types",
                  type: "Text",
                  values: ["lms"],
                  targetPages: [
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "RelatedInitiative",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
          ],
        },
      },
      {
        Role: "CRCommittee",
        groupsName: ["CR Committee"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["ministry"],
                  targetPages: [
                    // "home.aspx",
                    // "new.aspx",
                    // "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                },
              },
            },
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["ministry"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "Initiatives",
                  parentRelationField: "Title",
                  RelationField: "RelatedObjective",
                  isMultiSelectField: true, // add this attr if the field in list name is a multiselectlookup to get the values contain
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "Projects",
                    parentRelationField: "Title",
                    RelationField: "RelatedInitiative",
                    RelationFieldType: "Text",
                  }
                },
              },
            }
          ],
        },
      },
      {
        Role: "CRCommitteeVision",
        groupsName: ["CR Committee-Vision"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "GoalStrategy",
              accessConditions: [
                {
                  field: "Types",
                  type: "Choice",
                  values: ["vision"],
                  targetPages: [
                    // "home.aspx",
                    // "new.aspx",
                    // "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedStrategy",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",

                  }
                }
              },
            },
            {
              level: 1,
              listName: "Initiatives",
              accessConditions: [
                {
                  field: "Types",
                  type: "Text",
                  values: ["vision"],
                  targetPages: [
                    "home.aspx",
                    "new.aspx",
                    "edit.aspx?ListKey=projects",
                  ],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "RelatedInitiative",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
          ],
        },
      },
      {
        Role: "BudgetManager",
        groupsName: ["Budget Manager"],
      },
      {
        Role: "ObjectiveOwner",
        groupsName: ["Objective Owner"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "SOs",
              accessConditions: [
                {
                  field: "ObjectiveOwner",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "GoalStrategy",
                parentRelationField: "RelatedStrategy",
                RelationField: "Title",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "SOs",
              accessConditions: [
                {
                  field: "ObjectiveOwner",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "MainKPI",
                parentRelationField: "Title",
                RelationField: "RelatedStrategyObjective",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "KPIResults",
                  parentRelationField: "Title",
                  RelationField: "KPI",
                  RelationFieldType: "Text",
                }
              }
            }
          ],
        },
      },
      {
        Role: "SPMOHead",
        groupsName: ["SPMO Head"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "HeadUser",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Initiatives",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "HeadUser",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "HeadUser",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "GoalStrategy",
                  parentRelationField: "RelatedStrategy",
                  RelationField: "Title",
                  RelationFieldType: "Text",
                },
              },
            },
            {
              level: 1,
              listName: "Internal Entities",
              accessConditions: [
                {
                  field: "HeadUser",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
                {
                  field: "EntityType",
                  type: "Choice",
                  values: ["Sector"],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "Sector",
                RelationFieldType: "Choice",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                },
              },
            },

          ]
        }
      },
      {
        Role: "PortfolioManager",
        groupsName: ["System Portfolio Manager"],
        dataFilter: {
          hierarchies: [
            {
              level: 1,
              listName: "Portfolio",
              accessConditions: [
                {
                  field: "Manager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "Projects",
                parentRelationField: "Title",
                RelationField: "Portfolio",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "Initiatives",
                  parentRelationField: "RelatedInitiative",
                  RelationField: "Title",
                  RelationFieldType: "Text",
                },
              },
            },
            {
              level: 1,
              listName: "Portfolio",
              accessConditions: [
                {
                  field: "Manager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedPortfolio",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "GoalStrategy",
                  parentRelationField: "RelatedStrategy",
                  RelationField: "Title",
                  RelationFieldType: "Text",
                },
              },
            },
            {
              level: 1,
              listName: "Portfolio",
              accessConditions: [
                {
                  field: "Manager",
                  type: "LoggedInUser",
                  values: [""],
                  targetPages: [],
                },
              ],
              subRelation: {
                level: 2,
                listName: "SOs",
                parentRelationField: "Title",
                RelationField: "RelatedPortfolio",
                RelationFieldType: "Text",
                subRelation: {
                  level: 3,
                  listName: "MainKPI",
                  parentRelationField: "Title",
                  RelationField: "RelatedStrategyObjective",
                  RelationFieldType: "Text",
                  subRelation: {
                    level: 4,
                    listName: "KPIResults",
                    parentRelationField: "Title",
                    RelationField: "KPI",
                    RelationFieldType: "Text",
                  }
                }
              },
            },
          ],
        },
      },
      {
        Role: "Other",
        groupsName: [
          "Legal User",
          "Procurement User",
          "Strategy User",
          "GD",
          "Finance User",
        ],
      },
    ],

    Security_Msg: function () {
      $("body").animate(
        { opacity: 0 },
        {
          duration: 333,
          complete: function () {
            if (
              localStorage.getItem("lng") == null ||
              localStorage.getItem("lng") == "ar"
            ) {
              $("body").html(
                '<div class="popupComment access-denied"><div class="wrapcomments"><div class="denied-icon"><i class="fas fa-user-shield"></i></div><label>عذرا، ليس لديك صلاحية لرؤية البيانات</label>' +
                '<div style="margin-bottom:15px">الرجاء التواصل مع مسؤول النظام للمزيد من المعلومات</div>' +
                '<button class="btn btn-action" type="button" style="margin:0px" onclick="window.location=_spPageContextInfo.webAbsoluteUrl+\'/sitepages/\'+USER_HomePage;">الصفحة الرئيسية</button></div></div></div>'
              );
            } else {
              $("body").html(
                '<div class="popupComment access-denied"><div class="wrapcomments"><div class="denied-icon"><i class="fas fa-user-shield"></i></div><label>Sorry, you don\'t have permission to view the data</label>' +
                '<div style="margin-bottom:15px">Please contact the system administrator for more information</div>' +
                '<button class="btn btn-action" type="button" style="margin:0px" onclick="window.location=_spPageContextInfo.webAbsoluteUrl+\'/sitepages/\'+USER_HomePage;">Home Page</button></div></div></div>'
              );
            }
            $("body").animate({ opacity: 1 });
          },
        }
      );
      changeResources();
    },
    checkFieldsHtml: function () {
      if ($(".section-container .CFIELD").length) {
        clearInterval(UsercheckFieldsHtml);
        var currentUserGroup = "",
          currentUserGroupArr = [];

        if (localStorage.getItem("userGroup") == null) {
          // to get the current group for user and based on it enable and disable the field
          currentUserGroup = GroupItem[0].groupsName;
          currentUserGroupArr = currentUserGroup;
        } else {
          currentUserGroup = localStorage.getItem("userGroup")
            ? localStorage.getItem("userGroup")
            : "";
          currentUserGroup = currentUserGroup.split(","); // to handle if we have more than one item in groupsName

          for (var i = 0; i < currentUserGroup.length; i++) {
            currentUserGroupArr.push(currentUserGroup[i]);
          }
        }

        function findCommonElements(arr1, arr2) {
          return arr1.some((item) => arr2.includes(item));
        }

        $(".section-container .CFIELD").each(function () {
          $(this).val($(this).attr("data-groups"));
          var dataGroups = $(this).attr("data-groups");
          var dataGroupsArray = dataGroups ? dataGroups.split(",") : []; // to avoid the error in console
          //change Groups with currentUserGroupArr to render the fields based on  role group not all groups

          if (
            findCommonElements(currentUserGroupArr, dataGroupsArray) == false &&
            $(this).attr("data-groups") != ""
          ) {
            if (!isAdmin) {
              // allow to admin to create and edit all fields in system
              $(this).find("*").attr("disabled", true);
            }
          }
          // if ((GroupItem[0].groupsName != $(this).attr('data-groups')) && ($(this).attr("data-groups") != "")) {
          //     $(this).find('*').attr('disabled', true);
          // };
        });
      }
    },
  },
};
$(document).ready(function () {
  //Get_Configure_Api.preinit()
  userCalls.get_CurrentUser();
});

if (window.location.href.indexOf("ListKey") > -1) {
  for (var i = 0; i < ListArray.length; i++) {
    var obj = ListArray[i];
    // if(obj.projectrelated)
    // {
    for (var key in obj) {
      if (key == USERlistkey) {
        //get titles
        if (USERisForm) {
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            USERPageTitle = obj["FormTitle"];
          } else {
            USERPageTitle = obj["TitleEn"];
          }
        } else if (USERisListing) {
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            USERPageTitle = obj["ListingTitle"];
          } else {
            USERPageTitle = obj["TitleEn"];
          }
        }
      }

      if (key == "projectrelated") {
        if (obj[key])
          //if true
          USERProjRelated.push(Object.keys(obj)[0]);
      }
    }
    // }
  }
}

//getting related Projects if there is pcode or other security roles
var Access_Project_Info_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Access_Project_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      if (USERPCODE == oListItem.get_item("Title")) {
        //for breadcrumbs
        USERPName = oListItem.get_item("Name")
          ? oListItem.get_item("Name")
          : UserNo_Data;
        USERPID = oListItem.get_id();
        User_isClosureStatus = oListItem.get_item("ClosureStatus") == "Failed" || oListItem.get_item("ClosureStatus") == "Cancelled" ? true : false;
        //////////

        User_NotActiveStatus = (oListItem.get_item("WorkingStatus") != 'active' && oListItem.get_item("WorkingStatus")) ? true : false;

        ProjectIsDraft = oListItem.get_item("DraftStatus") == 'draft' ? true : false;

        User_ProjUID = oListItem.get_item("ProjectGUID") || UserNo_Data;
        //for milestones source
        User_ScheduleSource = oListItem.get_item("ScheduleSource") || No_Data;

        projectStartToValidation = oListItem.get_item("BaselineStartDate") || '';

        IsZeroBudgetProject = oListItem.get_item("IsZeroBudgetProject") == "yes" ? true : false;

        projectActualBudget = oListItem.get_item('ActualBudget') || 0;
        projectAssignedBudget = oListItem.get_item('Amount') || 0;
        relatedProjectId = oListItem.get_id();

        // if (User_ScheduleSource == 'عبر النظام') {
        //     $('body').append('<style>.navbar.page-nav.px-5 li.nav-item[data-href*="schedule.aspx"]{display:none}</style>');
        // } else if (User_ScheduleSource == 'عبر الجدول الزمني') {
        //     $('body').append('<style>.navbar.page-nav.px-5 li.nav-item[data-href*="milestones"]{display:none}</style>');
        // }
      }
      Access_Project_Info_Request.g.User_Projects.push(
        oListItem.get_item("Title")
      );
      userProjects.push(oListItem.get_item("Title"));
    }


    //should uncomment when need to applt the validation on milstones every month for proj and every 3 months for initiative

    if (istherePCODE && projectStartToValidation) {
      if (USERlistkey == 'milestones' && isNew) {
        console.log("YOU Can creat a milestone")
      } else {
        if (!isWF && !IsZeroBudgetProject) {
          Get_Milestones.init()
        }
      }

    }



    if (isthereICODE) {
      GetInitiativeTitle_Request.preinit();
    }
    if (isthereSTCODE) {
      GetStrategicPartnershipTitle_Request.preinit();
    } else {
      window.checkBreadCrumbsStatusHtml = setInterval(function () {
        Access_Project_Info_Request.g.handleBreadcrumbs();
      }, 333);
    }

    if (
      istherePCODE &&
      Access_Project_Info_Request.g.User_Projects.indexOf(
        Access_Project_Info_Request.g.PCODE
      ) == -1 &&
      !isWF &&
      !isAdmin &&
      !isMinister &&
      !isITSteering &&
      !isBITeam &&
      !isBudgetManager
    ) {
      //in pages related to project if user is not related to the current project

      userCalls.g.Security_Msg();
    }

    if (!isAdmin && !isMinister && !isITSteering && !isEPMO && !isBITeam && !isBudgetManager) {
      //Access caml query for home page and listing pages
      //

      var fieldtoquery,
        isShowAll = false;
      if (USERProjRelated.indexOf(USERlistkey) > -1) {
        //for data related to project (risks, issues...)
        fieldtoquery = "ProjectCode";
      } else if (USERisProjects || USERisHome) {
        //for projects
        fieldtoquery = "Title"; //pcode
      } // if on listing pages other then projects and its child data (risks, issues...)
      else {
        isShowAll = true;
        fieldtoquery = "Title";
      }


      if (Access_Project_Info_Request.g.User_Projects.length > 0) {
        var PermissionQuery =
          "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"" +
          fieldtoquery +
          '" /><Values>';
      }

      forfilterQuery =
        '<div style="display:none!important;height:0px!important" class="dropdown "><a href="#" class="dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button">ForQueryAccess</a><div class="dropdown-menu" id="forQueryAccess">';

      //if we are not on project level we use user's projects to get the relevant data..

      // console.log(' show all', SectorHeadQuery)
      if (!isShowAll && !istherePCODE) {
        // check user projects
        for (
          var u = 0;
          u < Access_Project_Info_Request.g.User_Projects.length;
          u++ //build query based on user projects
        ) {
          PermissionQuery +=
            '<Value Type="Text">' +
            Access_Project_Info_Request.g.User_Projects[u] +
            "</Value>";

          forfilterQuery +=
            '<label class="dropdown-item">' +
            Access_Project_Info_Request.g.User_Projects[u] +
            '<input data-type="Text" data-internal="' +
            fieldtoquery +
            '" type="checkbox" name="' +
            fieldtoquery +
            '" value="' +
            Access_Project_Info_Request.g.User_Projects[u] +
            '" checked></label>';
          if (u == Access_Project_Info_Request.g.User_Projects.length - 1) {
            PermissionQuery +=
              "</Values></In></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
            forfilterQuery += "</div></div>";
            AccessQuery = PermissionQuery;


            if (USERisHome) {
              //call homepage
              window.checkHomeStatusHtml = setInterval(function () {
                Project_Info_Request.preinit();
              }, 1000);
            } else if (USERisListing && !isfileListing) {
              //call listing page
              window.checkListingStatusHtml = setInterval(function () {
                ListingData.preinit();
              }, 1000);
            }
          }
        }

        if (Access_Project_Info_Request.g.User_Projects.length == 0) {
          if (
            isSectionHead

            //isSectorHead ||
            // isSPMO ||
            // isSubSectorHead ||
            // isGeneralManager
            // isDU ||
            // isMinisterAssistant ||
            // isViceMinister
          ) {
            //

            AccessQuery = SectorHeadQuery;
          } else if (
            isAdmin ||
            isMinister ||
            isITSteering ||
            isEPMO ||
            isBITeam ||
            isBudgetManager
          ) {
            // to can see everything
            AccessQuery =
              "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></View>";
          } else if (isStrategySpecialist) {
            AccessQuery = StrategyProjectQuery;
          } else {
            AccessQuery =
              "<View><Query><Where>" +
              "<And>" +
              "<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
              "<Or>" +
              '<Eq><FieldRef Name="ProjectManager" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>' +
              "<Or>" +
              '<Eq><FieldRef Name="ProjectOwner" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq>' +
              '<Eq><FieldRef Name="PMORepresentative" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq>' +
              "</Or>" +
              "</Or>" +
              "</And>" +
              "</Where></Query></View>";
          }
          if (USERisHome) {
            //call homepage
            window.checkHomeStatusHtml = setInterval(function () {
              Project_Info_Request.preinit();
            }, 1000);
          } else if (USERisListing && !isfileListing) {
            //call listing page
            window.checkListingStatusHtml = setInterval(function () {
              ListingData.preinit();
            }, 1000);
          }
        }
      }
      //if there is pcode (on project level) get current project's data [for now this is specifically for listing pages]
      else if (istherePCODE) {
        if (USERlistkey == "milestones") {
          // to arrange the milestone depends on PlannedDate
          AccessQuery =
            '<View><Query><Where><And><In><FieldRef Name="ProjectCode" /><Values><Value Type="Text">' +
            USERPCODE +
            "</Value></Values></In><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='PlannedDate' Ascending='False' /></OrderBy></Query></View>";
        } else {
          AccessQuery =
            '<View><Query><Where><And><In><FieldRef Name="ProjectCode" /><Values><Value Type="Text">' +
            USERPCODE +
            "</Value></Values></In><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
        }
        if (USERisListing && !isfileListing) {
          window.checkListingStatusHtml = setInterval(function () {
            ListingData.preinit();
          }, 1000);
        }
      }
      //
      else if (isShowAll) {

        //
        ///////Ghufran Listing Query
        //if on listing pages other then projects and its child data (risks, issues...)
        // if (isVROP && USERisListing && USERlistkey == "goalstrategy") {
        //   // vrop can't see goal strategy now as userguide
        //   AccessQuery =
        //     "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Choice\">vision</Value></Eq></And></Where></Query></View>";
        // }
        // else if (USERisListing
        // 	&& USERlistkey == "mainkpi"
        // 	) {
        // 	if (
        // 		!isAdmin &&
        // 		!isMinister &&
        // 		!isBITeam &&
        // 		// !isSPMTeam &&
        // 		!isVROP &&
        // 		!isSPMAdmin &&
        // 		!isDU &&
        // 		!isSubSectorHead &&
        // 		!isGeneralManager &&
        // 		!isMinisterAssistant &&
        // 		!isViceMinister &&
        // 		!isSectorHead &&
        // 		!isSPMO
        // 	) {
        // 		AccessQuery =
        // 			'<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Or><Or><Eq><FieldRef Name="PerformanceLeader" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq><Eq><FieldRef Name="PerformanceLeader2" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq></Or><Eq><FieldRef Name="Owner" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq></Or></And></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>';
        // 	}
        // 	// else if (isSPMAdmin || isSPMTeam){
        // 	//   AccessQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><In><FieldRef Name="Types"/><Values><Value Type="Text">sub</Value><Value Type="Text">main</Value></Values></In></And></Where></Query></View>';

        // 	// }
        // 	else if (isVROP) {
        // 		AccessQuery =
        // 			"<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"RelatedStrategyType\" /><Value Type='Text'>vision</Value></Eq></And></Where></Query></View>";
        // 	} else if (
        // 		isDU ||
        // 		isMinisterAssistant ||
        // 		isSectorHead ||
        // 		isViceMinister ||
        // 		isSubSectorHead ||
        // 		isGeneralManager ||
        // 		isSPMO
        // 	) {
        // 		//
        // 		AccessQuery = SectorHeadQuery;
        // 	}
        // }
        // if (USERisListing && USERlistkey == "initiatives") {
        //
        // if (isVROE) {
        //   AccessQuery =
        //     "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type='Text'>vision</Value></Eq></And></Where></Query></View>";
        // }
        //else
        // if (isEPMO) {
        //   AccessQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="Types" /><Value Type=\'Text\'>strategically</Value></Eq></And></Where></Query></View>';
        // }
        // else if (
        //   // isDU ||
        //   // isSPMO ||
        //   // isMinisterAssistant ||
        //   //isSectorHead ||
        //   // isViceMinister ||
        //   // isSubSectorHead ||
        //   isGeneralManager
        // ) {
        //   AccessQuery = SectorHeadQuery;
        // }
        //}
        //  else if (
        //   (
        //     //isDU ||
        //     // isMinisterAssistant ||
        //     // isViceMinister ||
        //     //isSectorHead ||
        //     // isSubSectorHead ||
        //     isGeneralManager) &&
        //   isInitiativesHomePage
        // ) {
        //   SubSectorInitiativeAccessQuery = SectorHeadQuery;
        //   //
        // }
        //  else if (
        // 	(isSPMAdmin && USERisListing && USERlistkey == "sos")
        // 	// ||
        // 	// (isSPMTeam && USERisListing && USERlistkey == "sos")
        // ) {
        // 	AccessQuery =
        // 		"<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Choice\">sub</Value></Eq></And></Where></Query></View>";
        // }
        // else if (
        //   // isMinisterAssistant ||
        //   //isSectorHead ||
        //   // isViceMinister ||
        //   // isSubSectorHead ||
        //   (isGeneralManager && USERlistkey == "sos")
        // ) {
        //   AccessQuery = SectorHeadQuery;
        // }
        // else {
        AccessQuery =
          "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
        // }

        if (USERisListing && !isfileListing) {
          window.checkListingStatusHtml = setInterval(function () {
            ListingData.preinit();
          }, 1000);
        }
      } //for other still not clear requirement
      else {
        $(
          "div#particles-foreground, div#particles-background, .vertical-centered-box"
        ).remove();
      }
    } //for admins and pmos
    else {
      //if there is pcode (on project level) get current project's data [for now this is specifically for listing pages]
      if (istherePCODE) {
        if (USERlistkey == "milestones") {
          // to arrange the data in milestone depends on  planned date
          AccessQuery =
            '<View><Query><Where><And><In><FieldRef Name="ProjectCode" /><Values><Value Type="Text">' +
            USERPCODE +
            "</Value></Values></In><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='PlannedDate' Ascending='False' /></OrderBy></Query></View>";
        } else {
          AccessQuery =
            '<View><Query><Where><And><In><FieldRef Name="ProjectCode" /><Values><Value Type="Text">' +
            USERPCODE +
            "</Value></Values></In><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
        }
      }
      if (USERisHome) {
        window.checkHomeStatusHtml = setInterval(function () {
          Project_Info_Request.preinit();
        }, 1000);
      } else if (USERisListing && !isfileListing) {
        window.checkListingStatusHtml = setInterval(function () {
          ListingData.preinit();
        }, 1000);
      }
    }

    //if project is closed or failed
    if (
      User_isClosureStatus && (USERlistkey == "projects" || USERProjRelated.indexOf(USERlistkey) > -1)
    ) {
      if (USERlistkey == "issues" && (USERisListing || USERisNew)) {
      } else {
        $("body").append(
          "<style>" +
          ".btn-add,.btn-save{opacity: .6;pointer-events: none;display:none}" +
          ".form-control{color: #b1b1b1 !important;" +
          "border-color: #e1e1e1 !important;" +
          "background-color: #fdfdfd !important;" +
          "background-color: #fdfdfd !important;" +
          "opacity: .6;pointer-events: none;}" +
          "</style>"
        );
      }
    }

    // if project is Cancelled or Holded

    if (
      User_NotActiveStatus && (USERlistkey == "projects" || USERProjRelated.indexOf(USERlistkey) > -1 || istherePCODE) || (ProjectIsDraft && (istherePCODE || USERlistkey == "projects") && !isWF)
    ) {
      $("body").append(
        "<style>" +
        `.btn-add, .btn-add[href*="ListKey"], .btn-save{opacity: .6!important;pointer-events: none!important;display:none!important}` +
        "</style>"
      );
      if ((USERisNew || USERisEdit)) {
        $("body").append(
          "<style>" +
          ".add-New-Detail-wrapper," +
          ".form-control{color: #b1b1b1 !important;" +
          "border-color: #e1e1e1 !important;" +
          "background-color: #fdfdfd !important;" +
          "background-color: #fdfdfd !important;" +
          "opacity: .6;pointer-events: none;}" +
          "</style>"
        );
      }

    }
    if (User_NotActiveStatus && USERisProjectHome) {
      $("body").append(
        "<style>" +
        ".btn-add,.btn-save{opacity: .6;pointer-events: none;display:none!important}" +
        "</style>"
      );
    }

  },

  onError: function (sender, args) {
    //
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
      Access_Project_Info_Request.init();
    });
  },
  // The main Initialization function
  init: function () {
    //mahmoud
    // var listName = '';
    // if (isDU && USERisListing) {
    //
    //   if (USERlistkey == 'mainkpi') {
    //     listName = 'MainKPI';
    //   }
    //   else if (USERlistkey == 'initiatives') {
    //     listName = 'Initiatives';
    //   }
    //   else {
    //     listName = ListArray[0].projects;
    //   }
    // }
    // else {
    //   listName = ListArray[0].projects;
    // }
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle(ListArray[0].projects);
    var camlQuery = new SP.CamlQuery();

    if (
      isSectionHead

      //isSectorHead ||
      // isSPMO ||
      //isGeneralManager
      // ||
      // isSubSectorHead
      // isDU ||
      // isMinisterAssistant ||
      // isViceMinister
    ) {
      camlQuery.set_viewXml(SectorHeadQuery);
    } else if (isAdmin || isMinister || isBITeam || isITSteering || isEPMO || isBudgetManager) {
      // to can see everything
      camlQuery.set_viewXml(
        "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></View>"
      );
    } else if (isStrategySpecialist) {
      camlQuery.set_viewXml(StrategyProjectQuery);
    }
    //  else if (isPManager || isInManager) {
    // 	camlQuery.set_viewXml(
    // 		"<View><Query><Where>" +
    // 		"<And>" +
    // 		"<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
    // 		'<Eq><FieldRef Name="ProjectManager" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>' +
    // 		"</And>" +
    // 		"</Where></Query></View>"
    // 	);
    // } else if (isPOwner || isInOwner) {
    // 	camlQuery.set_viewXml(
    // 		"<View><Query><Where>" +
    // 		"<And>" +
    // 		"<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
    // 		'<Eq><FieldRef Name="ProjectOwner" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>' +
    // 		"</And>" +
    // 		"</Where></Query></View>"
    // 	);
    // }
    else if (isPSponsor) {
      camlQuery.set_viewXml(
        "<View><Query><Where>" +
        "<And>" +
        "<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
        '<Eq><FieldRef Name="ProjectSponsor" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>' +
        "</And>" +
        "</Where></Query></View>"
      );
    } else if (isRequestorTeam && !USERisIdeas && !USERisHome) {
      userCalls.g.Security_Msg();
    } else {
      camlQuery.set_viewXml(
        "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></View>"
      );
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
    PCODE: istherePCODE
      ? window.location.href.split("PCODE=")[1].split("&")[0]
      : "",
    User_Projects: [],
    //
    handleBreadcrumbs: function () {
      if ($(".page-title").length) {
        clearInterval(checkBreadCrumbsStatusHtml);
        //username
        // $(".navbar .user-name").text(UserN.Title.match(/\b\w/g).join(""));
        $(".navbar .user-name").text(
          UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join("")
        );
        $(".user-name-full").text(UserN.Title);
        //breadcrumbs

        if (isTaskDetails) {
          $(".page-breadcrumb .title-item").html(
            '<span data-trans-taskdetails class="Resources"></span>'
          );
          changeResources();
        } else if (istherePCODE) {
          if (window.location.href.indexOf("projects") > -1) {
            $(".page-title").html(
              '<a href="' +
              _spPageContextInfo.webAbsoluteUrl +
              "/sitepages/ProjectHome.aspx?PCODE=" +
              USERPCODE +
              '">' +
              USERPName +
              '<span class="tooltiptext">' +
              USERPName +
              "</span>" + // to handle the tooltip
              "</a>"
            );
            $(".title-item:first-child").html(
              '<a href="' +
              _spPageContextInfo.webAbsoluteUrl +
              "/sitepages/Listing.aspx?ListKey=" +
              USERlistkey +
              '">' +
              USERPageTitle +
              ""
            );
          } else {
            $(".page-title").html(
              '<a href="' +
              _spPageContextInfo.webAbsoluteUrl +
              "/sitepages/ProjectHome.aspx?PCODE=" +
              USERPCODE +
              '">' +
              USERPName +
              '<span class="tooltiptext">' +
              USERPName +
              "</span>" + // to handle the tooltip
              "</a>"
            );
            $(".title-item:first-child").html(
              '<a href="' +
              _spPageContextInfo.webAbsoluteUrl +
              "/sitepages/Listing.aspx?ListKey=" +
              USERlistkey +
              "&PCODE=" +
              USERPCODE +
              '">' +
              USERPageTitle +
              ""
            );
          }
        } else if (isthereICODE) {
          if (window.location.href.indexOf("initiatives") > -1) {
            $(".page-title").html(
              '<a href="' +
              _spPageContextInfo.webAbsoluteUrl +
              "/sitepages/InitiativeHome.aspx?ICODE=" +
              UserICode +
              '">' +
              InitiativeTitle +
              "</a>"
            );
            $(".title-item:first-child").html(
              '<a href="' +
              _spPageContextInfo.webAbsoluteUrl +
              "/sitepages/Listing.aspx?ListKey=" +
              USERlistkey +
              '">' +
              USERPageTitle +
              ""
            );
          } else if (USERlistkey == "documents") {
            if (
              localStorage.getItem("lng") == null ||
              localStorage.getItem("lng") == "ar"
            ) {
              USERPageTitle = "مستندات المبادرة";
            } else {
              USERPageTitle = "Initiative Documents";
            }

            $(".page-title").html(
              '<a href="' +
              _spPageContextInfo.webAbsoluteUrl +
              "/sitepages/InitiativeHome.aspx?ICODE=" +
              UserICode +
              '">' +
              //
              InitiativeTitle +
              "</a>"
            );
            $(".title-item:first-child").html(
              '<a href="' +
              _spPageContextInfo.webAbsoluteUrl +
              "/sitepages/Listing.aspx?ListKey=" +
              USERlistkey +
              "&ICODE=" +
              UserICode +
              '">' +
              USERPageTitle +
              ""
            );
          } else {
            //
            $(".page-title").html(
              '<a href="' +
              _spPageContextInfo.webAbsoluteUrl +
              "/sitepages/InitiativeHome.aspx?ICODE=" +
              UserICode +
              '">' +
              //
              InitiativeTitle +
              "</a>"
            );
            $(".title-item:first-child").html(
              '<a href="' +
              _spPageContextInfo.webAbsoluteUrl +
              "/sitepages/Listing.aspx?ListKey=" +
              USERlistkey +
              "&ICODE=" +
              UserICode +
              '">' +
              USERPageTitle +
              ""
            );
          }

        }
        else if (isthereSTCODE) {
          if (window.location.href.indexOf("strategicpartnerships") > -1) {
            $(".page-title").html(
              '<a href="' +
              _spPageContextInfo.webAbsoluteUrl +
              "/sitepages/StrategicPartnershipHome.aspx?STCODE=" +
              UserSTCode +
              '">' +
              StrategicPartnershipTitle +
              "</a>"
            );
            if (USERlistkey == "strategicpartnerships") {
              $(".title-item:first-child").html(
                '<a href="' +
                _spPageContextInfo.webAbsoluteUrl +
                "/sitepages/Listing.aspx?ListKey=" +
                USERlistkey +
                '">' +
                USERPageTitle +
                ""
              );
            } else {
              $(".title-item:first-child").html(
                '<a href="' +
                _spPageContextInfo.webAbsoluteUrl +
                "/sitepages/Listing.aspx?ListKey=" +
                USERlistkey +
                "&STCODE=" +
                UserSTCode +
                '">' +
                USERPageTitle +
                ""
              );
            }

          }
          else {
            //
            $(".page-title").html(
              '<a href="' +
              _spPageContextInfo.webAbsoluteUrl +
              "/sitepages/StrategicPartnershipHome.aspx?STCODE=" +
              UserSTCode +
              '">' +
              //
              StrategicPartnershipTitle +
              "</a>"
            );
            $(".title-item:first-child").html(
              '<a href="' +
              _spPageContextInfo.webAbsoluteUrl +
              "/sitepages/Listing.aspx?ListKey=" +
              USERlistkey +
              "&STCODE=" +
              UserSTCode +
              '">' +
              USERPageTitle +
              ""
            );
          }
        }
        else {
          console.log("in breadcrump")
          debugger
          if (
            !isInitiativesHomePage &&
            !isTarget &&
            !isMainIndicator &&
            !isAdminPanel &&
            !isBenefitsMetrics &&
            !isKnowledgeBase &&
            !isAllTasks
          ) {
            $(".page-title").html(
              '<a href="' +
              _spPageContextInfo.webAbsoluteUrl +
              "/sitepages/Listing.aspx?ListKey=" +
              USERlistkey +
              '">' +
              USERPageTitle +
              ""
            );
            $(".firsttitle").hide();
          } else if (isTarget || isBenefitsMetrics || isMainIndicator || isAdminPanel || isKnowledgeBase || isAllTasks) {
            $(".page-title").html(
              `<span style="color:#fff">${USERPageTitle}</span>`
            );
            $(".firsttitle").hide();
          }
        }
      }
    },
  },
};

//getting Related Initiatives
// var Access_Initiative_Info_Request = {
// 	onSuccess: function (sender, args) {
// 		var collListItem = Access_Initiative_Info_Request.g.collListItem;
// 		var listItemEnum = collListItem.getEnumerator();
// 		while (listItemEnum.moveNext()) {
// 			var oListItem = listItemEnum.get_current();

// 			if (UserICode == oListItem.get_item("Title")) {
// 				USERIName = oListItem.get_item("Name")
// 					? oListItem.get_item("Name")
// 					: UserNo_Data;

// 				USERINID = oListItem.get_id();
// 			}

// 			Access_Initiative_Info_Request.g.User_Initiatives.push(
// 				oListItem.get_item("Title")
// 			);
// 			userProjects.push(oListItem.get_item("Title")); // add to show the data in listing like risk
// 		}
// 		//////////// initiative breadCrumbs
// 		window.checkBreadCrumbsStatusHtml = setInterval(function () {
// 			Access_Initiative_Info_Request.g.handleBreadcrumbs();
// 		}, 333);
// 		///////////

// 		var fieldtoquery,
// 			fieldtoquery = "Title";

// 		if (Access_Initiative_Info_Request.g.User_Initiatives.length > 0) {
// 			var PermissionQuery =
// 				"<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"" +
// 				fieldtoquery +
// 				'" /><Values>';
// 		}

// 		forFilterQueryInitiative =
// 			'<div style="display:none!important;height:0px!important" class="dropdown "><a href="#" class="dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button">ForQueryAccess</a><div class="dropdown-menu">';

// 		if (!istherePCODE) {
// 			// check user projects
// 			for (
// 				var u = 0;
// 				u < Access_Initiative_Info_Request.g.User_Initiatives.length;
// 				u++ //build query based on user projects
// 			) {
// 				PermissionQuery +=
// 					'<Value Type="Text">' +
// 					Access_Initiative_Info_Request.g.User_Initiatives[u] +
// 					"</Value>";

// 				forFilterQueryInitiative +=
// 					'<label class="dropdown-item">' +
// 					Access_Initiative_Info_Request.g.User_Initiatives[u] +
// 					'<input data-type="Text" data-internal="' +
// 					fieldtoquery +
// 					'" type="checkbox" name="' +
// 					fieldtoquery +
// 					'" value="' +
// 					Access_Initiative_Info_Request.g.User_Initiatives[u] +
// 					'" checked></label>';
// 				if (u == Access_Initiative_Info_Request.g.User_Initiatives.length - 1) {
// 					PermissionQuery +=
// 						"</Values></In></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
// 					forFilterQueryInitiative += "</div></div>";

// 					InitiativeAccessQuery = PermissionQuery;

// 					if (isInitiativesHomePage) {
// 						checkHomeInitiativeStatus = setInterval(function () {
// 							initiativeRequest.preinit();
// 						}, 1000);
// 					} else if (USERisListing && !isfileListing) {
// 						// to get the project related to user
// 						if (USERlistkey == "initiatives") {
// 							AccessQuery = PermissionQuery;
// 							//
// 							window.checkListingStatusHtml = setInterval(function () {
// 								ListingData.preinit();
// 							}, 1000);
// 						} else {
// 							Access_Project_Info_Request.preinit();
// 						}
// 					}
// 				}
// 			}

// 			if (Access_Initiative_Info_Request.g.User_Initiatives.length == 0) {
// 				var noDataQuery = "";
// 				var fieldNameRef = "";
// 				// if (isInOwner) {
// 				// 	fieldNameRef = "InitiativeOwner";
// 				// }
// 				//  else if (isInManager) {
// 				// 	fieldNameRef = "InitiativePM";
// 				// }
// 				noDataQuery =
// 					"<View><Query><Where>" +
// 					"<And>" +
// 					"<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
// 					'<Eq><FieldRef Name="' +
// 					fieldNameRef +
// 					'" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>' +
// 					"</And>" +
// 					"</Where></Query></View>";

// 				InitiativeAccessQuery = noDataQuery;
// 				if (isInitiativesHomePage) {
// 					checkHomeInitiativeStatus = setInterval(function () {
// 						initiativeRequest.preinit();
// 					}, 1000);
// 				} else if (USERisListing && !isfileListing) {
// 					// to get the project related to user
// 					if (USERlistkey == "initiatives") {
// 						AccessQuery = noDataQuery;

// 						//
// 						window.checkListingStatusHtml = setInterval(function () {
// 							ListingData.preinit();
// 						}, 1000);
// 					} else {
// 						Access_Project_Info_Request.preinit();
// 					}
// 				}
// 			}
// 		} else {
// 			Access_Project_Info_Request.preinit();
// 		}

// 		// ListingData.preinit();

// 		// Access_Project_Info_Request.preinit()
// 	},
// 	onError: function (sender, args) {
// 		//
// 		console.log(
// 			"Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
// 		);
// 	},
// 	preinit: function () {
// 		SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
// 			Access_Initiative_Info_Request.init();
// 		});
// 	},
// 	init: function () {
// 		var clientContext = new SP.ClientContext.get_current();
// 		var oList = clientContext.get_web().get_lists().getByTitle("Initiatives");
// 		var camlQuery = new SP.CamlQuery();
// 		//

// 		// if (isInManager) {
// 		// 	camlQuery.set_viewXml(
// 		// 		"<View><Query><Where>" +
// 		// 		"<And>" +
// 		// 		"<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
// 		// 		'<Eq><FieldRef Name="InitiativePM" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>' +
// 		// 		"</And>" +
// 		// 		"</Where></Query></View>"
// 		// 	);
// 		// } else if (isInOwner) {
// 		// 	camlQuery.set_viewXml(
// 		// 		"<View><Query><Where>" +
// 		// 		"<And>" +
// 		// 		"<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
// 		// 		'<Eq><FieldRef Name="InitiativeOwner" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>' +
// 		// 		"</And>" +
// 		// 		"</Where></Query></View>"
// 		// 	);
// 		// }

// 		Access_Initiative_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
// 		clientContext.load(Access_Initiative_Info_Request.g.collListItem);
// 		clientContext.executeQueryAsync(
// 			Function.createDelegate(this, Access_Initiative_Info_Request.onSuccess),
// 			Function.createDelegate(this, Access_Initiative_Info_Request.onError)
// 		);
// 	},
// 	g: {
// 		PCODE: istherePCODE
// 			? window.location.href.split("PCODE=")[1].split("&")[0]
// 			: "",
// 		User_Initiatives: [],
// 		handleBreadcrumbs: function () {
// 			if ($(".page-title").length) {
// 				clearInterval(checkBreadCrumbsStatusHtml);
// 				if (isTaskDetails) {
// 					$(".page-breadcrumb .title-item").html(
// 						'<span data-trans-taskdetails class="Resources"></span>'
// 					);
// 					changeResources();
// 				} else if (istherePCODE) {
// 					if (window.location.href.indexOf("projects") > -1) {
// 						$(".page-title").html(
// 							'<a href="' +
// 							_spPageContextInfo.webAbsoluteUrl +
// 							"/sitepages/ProjectHome.aspx?PCODE=" +
// 							USERPCODE +
// 							'">' +
// 							USERPName +
// 							"</a>"
// 						);
// 						$(".title-item:first-child").html(
// 							'<a href="' +
// 							_spPageContextInfo.webAbsoluteUrl +
// 							"/sitepages/Listing.aspx?ListKey=" +
// 							USERlistkey +
// 							'">' +
// 							USERPageTitle +
// 							""
// 						);
// 					} else {
// 						$(".page-title").html(
// 							'<a href="' +
// 							_spPageContextInfo.webAbsoluteUrl +
// 							"/sitepages/ProjectHome.aspx?PCODE=" +
// 							USERPCODE +
// 							'">' +
// 							USERPName +
// 							'<span class="tooltiptext">' +
// 							USERPName +
// 							"</span>" + // to handle the tooltip
// 							"</a>"
// 						);
// 						$(".title-item:first-child").html(
// 							'<a href="' +
// 							_spPageContextInfo.webAbsoluteUrl +
// 							"/sitepages/Listing.aspx?ListKey=" +
// 							USERlistkey +
// 							"&PCODE=" +
// 							USERPCODE +
// 							'">' +
// 							USERPageTitle +
// 							""
// 						);
// 					}
// 				} else if (isthereICODE) {
// 					if (window.location.href.indexOf("initiatives") > -1) {
// 						$(".page-title").html(
// 							'<a href="' +
// 							_spPageContextInfo.webAbsoluteUrl +
// 							"/sitepages/InitiativeHome.aspx?ICODE=" +
// 							UserICode +
// 							'">' +
// 							USERIName +
// 							"</a>"
// 						);
// 						$(".title-item:first-child").html(
// 							'<a href="' +
// 							_spPageContextInfo.webAbsoluteUrl +
// 							"/sitepages/Listing.aspx?ListKey=" +
// 							USERlistkey +
// 							'">' +
// 							USERPageTitle +
// 							""
// 						);
// 					} else if (USERlistkey == "documents") {
// 						if (
// 							localStorage.getItem("lng") == null ||
// 							localStorage.getItem("lng") == "ar"
// 						) {
// 							USERPageTitle = "مستندات المبادرة";
// 						} else {
// 							USERPageTitle = "Initiative Documents";
// 						}

// 						$(".page-title").html(
// 							'<a href="' +
// 							_spPageContextInfo.webAbsoluteUrl +
// 							"/sitepages/InitiativeHome.aspx?ICODE=" +
// 							UserICode +
// 							'">' +
// 							//
// 							InitiativeTitle +
// 							"</a>"
// 						);
// 						$(".title-item:first-child").html(
// 							'<a href="' +
// 							_spPageContextInfo.webAbsoluteUrl +
// 							"/sitepages/Listing.aspx?ListKey=" +
// 							USERlistkey +
// 							"&ICODE=" +
// 							UserICode +
// 							'">' +
// 							USERPageTitle +
// 							""
// 						);
// 					} else {
// 						$(".page-title").html(
// 							'<a href="' +
// 							_spPageContextInfo.webAbsoluteUrl +
// 							"/sitepages/InitiativeHome.aspx?ICODE=" +
// 							UserICode +
// 							'">' +
// 							USERIName +
// 							"</a>"
// 						);
// 						if (USERlistkey == "initiativecards") {
// 							// &IID
// 							if (window.location.href.indexOf("IID") > -1) {
// 								var initCardId = window.location.href
// 									.split("IID=")[1]
// 									.split("&")[0];

// 								$(".title-item:first-child").html(
// 									'<a href="' +
// 									_spPageContextInfo.webAbsoluteUrl +
// 									"/sitepages/view.aspx?ListKey=" +
// 									USERlistkey +
// 									"&IID=" +
// 									initCardId +
// 									"&ICODE=" +
// 									UserICode +
// 									'">' +
// 									USERPageTitle +
// 									""
// 								);
// 							}
// 						} else {
// 							$(".title-item:first-child").html(
// 								'<a href="' +
// 								_spPageContextInfo.webAbsoluteUrl +
// 								"/sitepages/Listing.aspx?ListKey=" +
// 								USERlistkey +
// 								"&ICODE=" +
// 								UserICode +
// 								'">' +
// 								USERPageTitle +
// 								""
// 							);
// 						}
// 					}
// 				} else {
// 					if (!isInitiativesHomePage) {
// 						$(".page-title").html(
// 							'<a href="' +
// 							_spPageContextInfo.webAbsoluteUrl +
// 							"/sitepages/Listing.aspx?ListKey=" +
// 							USERlistkey +
// 							'">' +
// 							USERPageTitle +
// 							""
// 						);
// 						$(".firsttitle").hide();
// 					}
// 				}
// 			}
// 		},
// 	},
// };
//
// to get the data of initiative

// get related Strategic partnership

window.Get_StrategicPartnerShip_Info_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Get_StrategicPartnerShip_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      if (UserSTCode == oListItem.get_item("Title")) {
        strategicPartnerShipStatus = oListItem.get_item("Status")

      }
    }

    // make the fields disabled and remove the add btns when status is notstandard
    if (strategicPartnerShipStatus == 'notstandard' && isthereSTCODE) {
      $("body").append(
        "<style>" +
        ".btn-add,.btn-save{opacity: .6;pointer-events: none;display:none}" +
        ".form-control{color: #b1b1b1 !important;" +
        "border-color: #e1e1e1 !important;" +
        "background-color: #fdfdfd !important;" +
        "background-color: #fdfdfd !important;" +
        "opacity: .6;pointer-events: none;}" +
        "</style>"
      );
    }


  },
  onError: function (sender, args) {
    //
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  preinit: function () {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
      Get_StrategicPartnerShip_Info_Request.init();
    });
  },
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Strategic Partnerships");
    var camlQuery = new SP.CamlQuery();
    //
    var SQuery = "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></View>"
    if (UserSTCode) {
      SQuery = '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' + UserSTCode + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query><RowLimit>1</RowLimit></View>'
    }

    camlQuery.set_viewXml(SQuery);


    Get_StrategicPartnerShip_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_StrategicPartnerShip_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_StrategicPartnerShip_Info_Request.onSuccess),
      Function.createDelegate(this, Get_StrategicPartnerShip_Info_Request.onError)
    );
  },
  g: {},
}


//getting Related Initiatives
window.Get_Initiative_Info_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Get_Initiative_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();

    var initiativeDraftStatus = false

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      if (UserICode == oListItem.get_item("Title")) {
        initiativeStartToValidation = oListItem.get_item("StartDate") ? oListItem.get_item("StartDate") : ""

        initiativeActualBudget = oListItem.get_item("InitiativeBudget")

        initiativeDraftStatus = oListItem.get_item("DraftStatus") == 'draft' ? true : false





      }
      relatedInitiativeId = oListItem.get_id();
    }


    if (initiativeDraftStatus && isthereICODE && !isWF) {
      $("body").append(
        "<style>" +
        ".btn-add,.btn-save{opacity: .6;pointer-events: none;display:none}" +
        ".form-control{color: #b1b1b1 !important;" +
        "border-color: #e1e1e1 !important;" +
        "background-color: #fdfdfd !important;" +
        "background-color: #fdfdfd !important;" +
        "opacity: .6;pointer-events: none;}" +
        "</style>"
      );


      if (initiativeDraftStatus && USERisInitiativeHome) {
        $("body").append(
          "<style>" +
          ".btn-add,.btn-save{opacity: .6;pointer-events: none;display:none!important}" +
          "</style>"
        );
      }

    }

    //should uncomment when need to applt the validation on milstones every month for proj and every 3 months for initiative
    if (isthereICODE && initiativeStartToValidation) {
      if (USERlistkey == 'initiativemilestones' && isNew) {
        console.log("YOU Can creat an initiative milestone")
      } else {
        if (!isWF && !IsZeroBudgetProject) {
          Get_Milestones.init()
        }
      }
    }
  },
  onError: function (sender, args) {
    //
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  preinit: function () {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
      Get_Initiative_Info_Request.init();
    });
  },
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Initiatives");
    var camlQuery = new SP.CamlQuery();
    //
    var IQuery = "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></View>"
    if (UserICode) {
      IQuery = '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' + UserICode + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query><RowLimit>1</RowLimit></View>'
    }

    camlQuery.set_viewXml(IQuery);


    Get_Initiative_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_Initiative_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_Initiative_Info_Request.onSuccess),
      Function.createDelegate(this, Get_Initiative_Info_Request.onError)
    );
  },
  g: {
    PCODE: istherePCODE
      ? window.location.href.split("PCODE=")[1].split("&")[0]
      : "",
    User_Initiatives: []
  },
};




//getting related Sectors if there user sector head
var Access_Sector_Info_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Access_Sector_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    // handle the query
    //
    SectorHeadQuery =
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"" +
      SecondLevel_FirstLevel_Field +
      '" /><Values>';

    // var UserAccessSectorCode;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      UserAccessSectorCode = oListItem.get_item(SecondLevel_FieldtoFetch)
        ? oListItem.get_item(SecondLevel_FieldtoFetch)
        : UserNo_Data;
      SectorHeadQuery +=
        '<Value Type="' +
        SecondLevel_FirstLevel_FieldType +
        '">' +
        UserAccessSectorCode +
        "</Value>";
      Access_Sector_Info_Request.g.User_Sectors.push(UserAccessSectorCode);
    }

    // handle the query
    SectorHeadQuery += "</Values></In></And></Where></Query></View>";
    // if (isGeneralManager
    //   //|| isSubSectorHead
    //   //|| isSectorHead
    // ) {


    //   var subsectorname, substorcode;
    //   if (localStorage.getItem("Dynamo_Internal Entities") != null) {
    //     subsectorArray = JSON.parse(
    //       localStorage.getItem("Dynamo_Internal Entities") || "[]"
    //     );
    //     subsectorArray = subsectorArray.filter(function (a) {
    //       return a.code == UserAccessSectorCode;
    //     });

    //     if (
    //       localStorage.getItem("lng") == null ||
    //       localStorage.getItem("lng") == "ar"
    //     ) {
    //       // subsectorname = subsectorArray.length ? subsectorArray[0].name : '';
    //       ar_UserRole += subsectorArray[0].name;

    //       $(".page-title").html(ar_UserRole);
    //     } else {
    //       //   subsectorname = subsectorArray.length ? subsectorArray[0].nameEn : '';
    //       en_UserRole += subsectorArray[0].nameEn;
    //       $(".page-title").html(en_UserRole);
    //     }
    //     //   substorcode = subsectorArray.length ? subsectorArray[0].code : '';
    //   }
    // }
    // if target
    // if (isTarget){
    //
    //   window.checkTargetStatusHtml = setInterval(function () {
    //     MainKPIs_Info_Request.preinit();
    //   }, 333); //initiate the call
    // }

    //if there is any data
    if (Access_Sector_Info_Request.g.User_Sectors.length == 0) {
      SectorHeadQuery =
        "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query><RowLimit>0</RowLimit></View>";
      // when userSector.length == 0 we cant use <RowLimit>0</RowLimit> because it will return all the data so i show a popup data to handle it

      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        $("body").html(
          '<div class="popupComment access-denied"><div class="wrapcomments"><div class="denied-icon"><i class="fas fa-user-shield"></i></div><label>عذرا، ليس لديك بيانات لرؤيتها</label>' +
          '<div style="margin-bottom:15px">الرجاء التواصل مع مسؤول النظام للمزيد من المعلومات</div>' +
          "</div></div></div>"
        );
      } else {
        $("body").html(
          '<div class="popupComment access-denied"><div class="wrapcomments"><div class="denied-icon"><i class="fas fa-user-shield"></i></div><label>Sorry, you don\'t have any data to view</label>' +
          '<div style="margin-bottom:15px">Please contact the system administrator for more information</div>' +
          "</div></div></div>"
        );
      }
    }
    Access_Project_Info_Request.preinit();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
      Access_Sector_Info_Request.init();
    });
  },
  // The main Initialization function
  init: function () {
    //

    var clientContext = new SP.ClientContext.get_current();

    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle(SecondLevel_List);
    var camlQuery = new SP.CamlQuery();

    camlQuery.set_viewXml(SecondLevel_CAMLQuery);

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
  },
};
var Risks_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Risks");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(RiskQuery);
    Risks_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Risks_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Risks_Info_Request.onSuccess),
      Function.createDelegate(this, Risks_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Risks_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var riskshtml = "",
      riskname,
      riskID,
      riskTitle;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      riskname = oListItem.get_item("Name") || No_Data;
      riskID = oListItem.get_item("ID") || No_Data;
      riskTitle = oListItem.get_item("Title") || No_Data;

      riskshtml +=
        '<li class="list-group-item">' +
        '<a href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/SitePages/View.aspx?ListKey=risks&IID=" +
        riskID +
        '"><h3 class="des-14 w-0">' +
        riskTitle +
        ", " +
        riskname +
        '</h3><div class="des-12 text-nowrap"></div></a>' +
        "</li>";

      NRisks = ++NRisks;
    }

    if (!riskshtml) {
      riskshtml = "<p>" + No_Data + "</p>";
    }
    $("#headingThree1").append(
      '<span class="notificationsCounter">' + NRisks + "</span>"
    );
    //*****end */Risk,task and issues card
    $(
      "div#accordionRequiredSupportNotifications > .card:nth-child(3) ul.list-group"
    ).html(riskshtml);
    Issues_Info_Request.init();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {
    PCODE: window.location.href.split("/")[4],
  },
};
//issues
var Issues_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Issues");
    var camlQuery = new SP.CamlQuery();

    camlQuery.set_viewXml(IssueQuery);
    Issues_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only

    clientContext.load(Issues_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Issues_Info_Request.onSuccess),
      Function.createDelegate(this, Issues_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Issues_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var issueshtml = "",
      issuename,
      issueID,
      ExistVar1;

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      issuename = oListItem.get_item("Name") || No_Data;
      issueID = oListItem.get_item("ID") || No_Data;
      issueTitle = oListItem.get_item("Title") || No_Data;
      issueshtml +=
        '<li class="list-group-item">' +
        '<a href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/SitePages/View.aspx?ListKey=issues&IID=" +
        issueID +
        '"><h3 class="title-13">' +
        issueTitle +
        ", " +
        issuename +
        '</h3><div class="des-12 text-nowrap"></div></a>' +
        "</li>";
      NIssues = ++NIssues;
    }
    if (!issueshtml) {
      issueshtml = "<p>" + No_Data + "</p>";
    }

    $("#headingTwo1").append(
      '<span class="notificationsCounter">' + NIssues + "</span>"
    );

    //*****Start */risks,isues and tasks card
    $(
      "div#accordionRequiredSupportNotifications > .card:nth-child(2) ul.list-group"
    ).html(issueshtml);
    Notifications_Info_Request.init();
    //*****end */risks,isues and tasks card
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {
    PCODE: window.location.href.split("/")[4],
  },
};
//Notifications
var Notifications_Info_Request = {
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Notifications");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(TasksQuery);
    Notifications_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Notifications_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Notifications_Info_Request.onSuccess),
      Function.createDelegate(this, Notifications_Info_Request.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Notifications_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var notificationshtml = "",
      notificationname,
      notificationID;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        notificationname = oListItem.get_item("TitleAr") || No_Data;
      } else notificationname = oListItem.get_item("TitleEn") || No_Data;

      notificationID = oListItem.get_item("ID") || No_Data;
      notificationshtml +=
        '<li class="list-group-item" data-id="' +
        notificationID +
        '">' +
        '<span><h3 class="title-13">' +
        notificationname +
        '</h3><div class="des-12 text-nowrap"><button type="button" id="notificationseen" onclick=Notification_Update_Status.init(' +
        notificationID +
        ')><i class="fas fa-eye"></i></button></div></span>' +
        "</li>";
      NNotifications = ++NNotifications;
    }

    if (!notificationshtml) {
      notificationshtml = "<p>" + No_Data + "</p>";
    }
    $("#headingFour").append(
      '<span class="notificationsCounter">' + NNotifications + "</span>"
    );
    //*****end */Notification,task and issues card
    $(
      "div#accordionRequiredSupportNotifications > .card:nth-child(4) ul.list-group"
    ).html(notificationshtml);
    // $("span.Rsupprot").text(UserNTasks + NRisks + NIssues + NNotifications);


    $("span.bell-value").text(NTasks + NRisks + NIssues + NNotifications);
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },

  // Global variables
  g: {
    PCODE: window.location.href.split("/")[4],
  },
};

//tasks
var Tasks_Info_Request_User = {
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".d-flex").length) {
      clearInterval(checkNotificationStatusHtml);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        // $("#userGroup ul.list-group").html( // multi role move when buld an role and html to avoid the overrigth
        //   '<li class="list-group-item"><a href="/_layouts/15/SignOut.aspx" title="Sign Out"><h3 data-trans-signout class="title-13 Resources"></h3></a></li>'
        // );
        if (USERPCODE) {
          PCODE_Stage_Data_Request.init();
        }
        User_Stages_Data_Request.init();
        Generic_WF_Stages_Data_Request.init();
        Tasks_Info_Request_User.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    //
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Tasks");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(TasksQuery);
    Tasks_Info_Request_User.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Tasks_Info_Request_User.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Tasks_Info_Request_User.onSuccess),
      Function.createDelegate(this, Tasks_Info_Request_User.onError)
    );
  },
  onSuccess: function (sender, args) {
    //
    var collListItem = Tasks_Info_Request_User.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var taskshtml = [],
      HPtaskshtml = [],
      action_btnhtml = "",
      taskname,
      pcode,
      icode,
      tasktype,
      stageid,
      ritemid,
      sourceitemid,
      wfname,
      puid,
      tasktitle,
      tasksID,
      tasknotificationhtml = "",
      delegateMessage,
      isDelegated = false,
      mycount = 0;

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      pcode = oListItem.get_item("ProjectCode");
      icode = oListItem.get_item("InitiativeCode");
      tasktype = oListItem.get_item("TaskType");
      stageid = oListItem.get_item("StageID");
      ritemid = oListItem.get_item("RelatedItemID");
      sourceitemid =
        oListItem.get_item("SourceItemID") == null
          ? No_Data
          : oListItem.get_item("SourceItemID");
      wfname = oListItem.get_item("WorkflowName");
      puid = oListItem.get_item("ProjectUID");
      tasktitle = oListItem.get_item("Title") || No_Data;
      taskname = oListItem.get_item("RelatedItemTitle") || No_Data;
      var tasktitlearr = [];
      tasksID = oListItem.get_item("ID") || No_Data;
      delegateMessage = oListItem.get_item("DelegationReason");
      // (A) STRIP TAGS FUNCTION
      function stripTags(original) {
        return original.replace(/(<([^>]+)>)/gi, "");
      }
      if (delegateMessage) {
        delegateMessage = stripTags(delegateMessage);
      }

      if (localStorage.getItem("Dynamo_Tasks Configuration") != null) {
        //
        tasktitlearr = JSON.parse(
          localStorage.getItem("Dynamo_Tasks Configuration") || "[]"
        );
        tasktitlearr = tasktitlearr.filter(function (item) {
          return item.code == tasktitle;
        });
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          tasktitle = tasktitlearr.length ? tasktitlearr[0].name : "";
        } else tasktitle = tasktitlearr.length ? tasktitlearr[0].nameEn : "";
      }

      window.historyLinkNotification;

      if (wfname == "Project") {
        historyLinkNotification =
          "" +
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/TaskHistory.aspx?TT=" +
          wfname +
          "&PCODE=" +
          pcode +
          "&IID=" +
          ritemid +
          "";
      } else if (wfname == "Idea") {
        historyLinkNotification =
          "" +
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/TaskHistory.aspx?TT=" +
          wfname +
          "&IID=" +
          ritemid +
          "";
      }

      if (tasktype == "Approval") {

        mycount++;
        // if (mycount <= 10) {
        HPtaskshtml.push(
          '<li class="list-group-item">' +
          '<a href="javascript:"onclick="Tasks_Info_Request_User.g.handleids(\'' +
          pcode +
          "','" +
          icode +
          "','" +
          tasksID +
          "','" +
          tasktype +
          "','" +
          stageid +
          "','" +
          ritemid +
          "','" +
          sourceitemid +
          "','" +
          wfname +
          "','" +
          puid +
          "')\">" +
          '<h3 class="des-14 w-0">' +
          tasktitle +
          '</h3><div class="des-12 text-nowrap">' +
          taskname +
          '</div><div class="tasksButtons"><span data-trans-forapproval class="Resources"></span></div></a>' +
          "</li>"
        );
        UserNTasks = ++UserNTasks;
        // }
      } else {
        mycount++;
        // if (mycount <= 10) {
        HPtaskshtml.push(
          '<li class="list-group-item">' +
          '<a href="javascript:"onclick="Tasks_Info_Request_User.g.handleids(\'' +
          pcode +
          "','" +
          icode +
          "','" +
          tasksID +
          "','" +
          tasktype +
          "','" +
          stageid +
          "','" +
          ritemid +
          "','" +
          sourceitemid +
          "','" +
          wfname +
          "','" +
          puid +
          "')\">" +
          '<h3 class="des-14 w-0">' +
          tasktitle +
          '</h3><div class="des-12 text-nowrap">' +
          taskname +
          "</div></a>" +
          "</li>"
        );
        UserNTasks = ++UserNTasks;
        // }
      }
      if (wfname == "Idea") {
        if (delegateMessage) {
          taskshtml.push(
            '<li class="list-group-item taskitem" title="' +
            delegateMessage +
            '">' +
            '<a href="javascript:"onclick="Tasks_Info_Request_User.g.handleids(\'' +
            pcode +
            "','" +
            icode +
            "','" +
            tasksID +
            "','" +
            tasktype +
            "','" +
            stageid +
            "','" +
            ritemid +
            "','" +
            sourceitemid +
            "','" +
            wfname +
            "','" +
            puid +
            "')\">" +
            '<div><i class="fas fa-user-friends"></i></div>' +
            '<div><h3 class="title-13">' +
            tasktitle +
            '</h3><div class="des-12 text-nowrap"><span data-trans-idea class="Resources ideaLabel"></span><span>: ' +
            taskname +
            "</span></div></div></a>" +
            '<div id="viewhistory"><a href="' +
            historyLinkNotification +
            '"><i title="' +
            taskdetails +
            '" class="fas fa-history"></i></a></div>' +
            "</li>"
          );
        } else {
          taskshtml.push(
            '<li class="list-group-item taskitem">' +
            '<a href="javascript:"onclick="Tasks_Info_Request_User.g.handleids(\'' +
            pcode +
            "','" +
            icode +
            "','" +
            tasksID +
            "','" +
            tasktype +
            "','" +
            stageid +
            "','" +
            ritemid +
            "','" +
            sourceitemid +
            "','" +
            wfname +
            "','" +
            puid +
            "')\">" +
            '<div><h3 class="title-13">' +
            tasktitle +
            '</h3><div class="des-12 text-nowrap"><span data-trans-idea class="Resources ideaLabel"></span><span>: ' +
            taskname +
            "</span></div></div></a>" +
            '<div id="viewhistory"><a href="' +
            historyLinkNotification +
            '"><i title="' +
            taskdetails +
            '" class="fas fa-history"></i></a></div>' +
            "</li>"
          );
        }
      } else if (wfname == "Project") {
        if (delegateMessage) {
          taskshtml.push(
            '<li class="list-group-item taskitem" title="' +
            delegateMessage +
            '">' +
            '<a href="javascript:"onclick="Tasks_Info_Request_User.g.handleids(\'' +
            pcode +
            "','" +
            icode +
            "','" +
            tasksID +
            "','" +
            tasktype +
            "','" +
            stageid +
            "','" +
            ritemid +
            "','" +
            sourceitemid +
            "','" +
            wfname +
            "','" +
            puid +
            "')\">" +
            '<div><i class="fas fa-user-friends"></i></div>' +
            '<div><h3 class="title-13">' +
            tasktitle +
            '</h3><div class="des-12 text-nowrap">' +
            taskname +
            "</div></div></a>" +
            '<div id="viewhistory"><a href="' +
            historyLinkNotification +
            '"><i title="' +
            taskdetails +
            '" class="fas fa-history"></i></a></div>' +
            "</li>"
          );
        } else {
          taskshtml.push(
            '<li class="list-group-item taskitem">' +
            '<a href="javascript:"onclick="Tasks_Info_Request_User.g.handleids(\'' +
            pcode +
            "','" +
            icode +
            "','" +
            tasksID +
            "','" +
            tasktype +
            "','" +
            stageid +
            "','" +
            ritemid +
            "','" +
            sourceitemid +
            "','" +
            wfname +
            "','" +
            puid +
            "')\">" +
            '<div><h3 class="title-13">' +
            tasktitle +
            '</h3><div class="des-12 text-nowrap">' +
            taskname +
            "</div></div></a>" +
            '<div id="viewhistory"><a href="' +
            historyLinkNotification +
            '"><i title="' +
            taskdetails +
            '" class="fas fa-history"></i></a></div>' +
            "</li>"
          );
        }
      } else {
        if (delegateMessage) {
          taskshtml.push(
            '<li class="list-group-item taskitem" title="' +
            delegateMessage +
            '">' +
            '<a href="javascript:"onclick="Tasks_Info_Request_User.g.handleids(\'' +
            pcode +
            "','" +
            icode +
            "','" +
            tasksID +
            "','" +
            tasktype +
            "','" +
            stageid +
            "','" +
            ritemid +
            "','" +
            sourceitemid +
            "','" +
            wfname +
            "','" +
            puid +
            "')\">" +
            '<div><i class="fas fa-user-friends"></i></div>' +
            '<div><h3 class="title-13">' +
            tasktitle +
            '</h3><div class="des-12 text-nowrap">' +
            taskname +
            "</div></div></a>" +
            "</li>"
          );
        } else {
          taskshtml.push(
            '<li class="list-group-item taskitem">' +
            '<a href="javascript:"onclick="Tasks_Info_Request_User.g.handleids(\'' +
            pcode +
            "','" +
            icode +
            "','" +
            tasksID +
            "','" +
            tasktype +
            "','" +
            stageid +
            "','" +
            ritemid +
            "','" +
            sourceitemid +
            "','" +
            wfname +
            "','" +
            puid +
            "')\">" +
            '<div><h3 class="title-13">' +
            tasktitle +
            '</h3><div class="des-12 text-nowrap">' +
            taskname +
            "</div></div></a>" +
            "</li>"
          );
        }
      }

      NTasks = ++NTasks;
    }
    if (!taskshtml.length) {
      taskshtml.push("<p>" + No_Data + "</p>");
    }

    $("#headingOne1").append(
      '<span class="notificationsCounter">' + NTasks + "</span>"
    );

    if (!HPtaskshtml.length) {
      HPtaskshtml.push("<p>" + No_Data + "</p>");
    }
    //

    $("div#accordionRequiredSupport > .card:nth-child(1) ul.list-group").html(
      HPtaskshtml.join("")
    ); //HP Cards
    CurrentUserTasksCount = HPtaskshtml.length;
    // $("span.Rsupprot").text(HPtaskshtml.length);

    $(
      "div#accordionRequiredSupportNotifications > .card:nth-child(1) ul.list-group"
    ).html(taskshtml.join(""));
    Risks_Info_Request.init();
    changeResources();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {
    //for tasks functions
    handleids: function (
      pcode,
      icode,
      taskid,
      tasktype,
      stageid,
      ritemid,
      sourceitemid,
      wfname,
      puid,
      rurl //rurl,
    ) {


      if (wfname == "Project") {
        curstage_org = User_Stages_Data_Request.g.StagesArray.filter(function (
          obj
        ) {
          return obj.stage == stageid;
        });
        var rurl = curstage_org[0].relatedURL;

        // curstage =  ProjectStages_Data_Request.g.StagesArray.filter(function(obj) {
        // 	return obj.stage == curstage_org[0].stage;
        // });
      } else {
        targerstage_org = Generic_WF_Stages_Data_Request.g.GWFStagesArray.filter(
          function (obj) {
            return obj.stage == stageid;
          }
        );
        var rurl = targerstage_org[0].relatedURL;

      }
      Tasks_Info_Request_User.g.handlelinks(
        pcode,
        icode,
        rurl,
        taskid,
        tasktype,
        stageid,
        ritemid,
        sourceitemid,
        wfname,
        puid
      );
    },
    handlelinks: function (
      pcode,
      icode,
      rurl,
      taskid,
      tasktype,
      stageid,
      ritemid,
      sourceitemid,
      wfname,
      puid
    ) {

      switch (wfname) {
        case "Project":
          if (
            rurl.toLowerCase().indexOf("pcode") > -1
            &&
            window.location.href.toLowerCase().indexOf("&wfs") > -1
          ) {
            if (rurl.toLowerCase().indexOf("view.aspx") > -1) {
              //view page with pcode
              rurl = rurl.replace("&PCODE=", "");

              window.open(
                _spPageContextInfo.webAbsoluteUrl +
                rurl +
                "&IID=" +
                ritemid +
                "&PCODE=" +
                pcode +
                "&TID=" +
                taskid +
                "&WFs",
                "_self"
              ); //
            } else if (rurl.toLowerCase().indexOf("edit") > -1) {
              //edit page is mainly without pcode [just in case!]
              rurl = rurl.replace("&PCODE=", "");

              window.open(
                _spPageContextInfo.webAbsoluteUrl +
                rurl +
                "&IID=" +
                ritemid +
                "&PCODE=" +
                pcode +
                "&TID=" +
                taskid +
                "&WFs",
                "_self"
              ); //
            } //Listing page with pcode
            else {
              window.open(
                _spPageContextInfo.webAbsoluteUrl +
                rurl +
                pcode +
                "&TID=" +
                taskid +
                "&WFs",
                "_self"
              );
            }
          } else if (
            rurl.toLowerCase().indexOf("edit") > -1 &&
            window.location.href.toLowerCase().indexOf("&wfs") > -1
          ) {
            //edit page without pcode
            window.open(
              _spPageContextInfo.webAbsoluteUrl +
              rurl +
              "&PCODE=" +
              pcode +
              "&IID=" +
              ritemid +
              "&TID=" +
              taskid +
              "&WFs",
              "_self"
            ); //+'&TID='+taskid
          } else if (
            rurl.toLowerCase().indexOf("view") > -1 &&
            window.location.href.toLowerCase().indexOf("&wfs") > -1
          ) {
            //view page without pcode
            window.open(
              _spPageContextInfo.webAbsoluteUrl +
              rurl +
              "&PCODE=" +
              pcode +
              "&IID=" +
              ritemid +
              "&TID=" +
              taskid +
              "&WFs",
              "_self"
            ); //+'&TID='+taskid
          } else if (
            rurl.toLowerCase().indexOf("schedule.aspx") > -1 &&
            window.location.href.toLowerCase().indexOf("&wfs") > -1
          ) {
            rurl = rurl.replace("&PCODE=", "");
            window.open(
              _spPageContextInfo.webAbsoluteUrl +
              rurl +
              puid +
              "&PCODE=" +
              pcode +
              "&TID=" +
              taskid +
              "&WFs",
              "_self"
            ); //+'&TID='+taskid
          } else {
            window.open(
              _spPageContextInfo.webAbsoluteUrl +
              rurl +
              pcode +
              "&IID=" +
              ritemid +
              "&TID=" +
              taskid +
              "&WFs",
              "_self"
            );
          }
          break;
        default:
          //other workflows
          var keyNameParams = "";
          if (wfname == "ProjectCharter") {
            keyNameParams = "projectcharter";
          }
          else if (wfname == "InitiativeSample") {
            keyNameParams = "initiativesample";
          }
          else if (wfname == "DV") {
            keyNameParams = "deliverables";
          } else if (wfname == "CR" || wfname == "VROCRInitiative" || wfname == "EPMOCRInitiative" || wfname == "LMSCRInitiative") {
            keyNameParams = "changerequest";
          } else if (wfname == 'VROCreateInitiative' || wfname == 'EPMOCreateInitiative' || wfname == 'LMSCreateInitiative') {
            keyNameParams = 'initiatives'
          } else if (wfname == "CR" || wfname == "VROCRProject" || wfname == "EPMOCRProject" || wfname == "LMSCRProject") {
            keyNameParams = "changerequest";
          } else if (wfname == "VROCreateProject" || wfname == "EPMOCreateProject" || wfname == "LMSCreateProject") {
            keyNameParams = "projects";
          } else if (wfname == "VROCRObjective" || wfname == "MSCRObjective" || wfname == "LMSCRObjective") {
            keyNameParams = "changerequest";
          } else if (wfname == "VROActualKPI" || wfname == "MSActualKPI" || wfname == "LMSActualKPI") {
            keyNameParams = "mainkpi";
          } else if (wfname == 'VROCreateKPI' || wfname == 'EPMOCreateKPI' || wfname == 'LMSCreateKPI') {
            keyNameParams = 'mainkpi'
          } else if (wfname == "VROCRKPI" || wfname == "MSCRKPI" || wfname == "LMSCRKPI") {
            keyNameParams = "changerequest";
          } else if (wfname == "Issue") {
            keyNameParams = "issues";
          } else if (wfname == "Risk") {
            keyNameParams = "risks";
          } else if (wfname == "MoM") {
            keyNameParams = "mom";
          } else if (wfname == 'VisionInitiative' || wfname == 'StrategicallyInitiative' || wfname == 'LMSInitiative') {
            keyNameParams = "initiatives"
          } else if (wfname == 'StrategicPartnerships') {
            keyNameParams = 'strategicpartnerships'
          } else if (wfname == 'Achievements') {
            keyNameParams = 'achievements'
          } else if (wfname == 'VROBenefitActual' || wfname == 'EPMOBenefitActual' || wfname == 'LMSBenefitActual') {
            keyNameParams = 'benefitmetrics'
          } else if (wfname == 'VROInitiativeMilestone' || wfname == 'EPMOInitiativeMilestone' || wfname == 'LMSInitiativeMilestone') {
            keyNameParams = 'initiativemilestones'
          } else if (wfname == 'VROInitiativeDeliverable' || wfname == 'EPMOInitiativeDeliverable' || wfname == 'LMSInitiativeDeliverable') {
            keyNameParams = 'initiativedeliverables'
          } else if (wfname == 'VROProjMilestone' || wfname == 'EPMOProjMilestone' || wfname == 'LMSProjMilestone') {
            keyNameParams = 'milestones'
          } else if (wfname == 'VROCOC' || wfname == 'EPMOCOC' || wfname == 'LMSCOC') {
            keyNameParams = 'coc'
          } else if (wfname == 'VROProjDeliverable' || wfname == 'EPMOProjDeliverable' || wfname == 'LMSProjDeliverable') {
            keyNameParams = 'deliverables'
          } else if (wfname == "VROCreateObjective" || wfname == "LMSCreateObjective" || wfname == "MSCreateObjective") {
            keyNameParams = "sos";
          }
          switch (tasktype) {
            case "SubmitProject":
              window.open(
                _spPageContextInfo.webAbsoluteUrl +
                "/sitepages/new.aspx?ListKey=projects&IID=" +
                ritemid +
                "&TID=" +
                taskid +
                "&IdeaId=" +
                pcode +
                "&WFs",
                "_self"
              );
              break;
            case "SubmitField":
              window.open(
                _spPageContextInfo.webAbsoluteUrl +
                rurl +
                "&IID=" +
                ritemid +
                "&TID=" +
                taskid +
                "&WFs",
                "_self"
              );
              break;
            default:
              if (
                rurl.toLowerCase().indexOf("icode") > -1
              ) {


                //view page with pcode
                rurl = rurl.replace("&ICODE=", "");

                window.open(
                  _spPageContextInfo.webAbsoluteUrl +
                  rurl +
                  "&TID=" +
                  taskid +
                  "&IID=" +
                  ritemid +
                  "&ICODE=" +
                  pcode +
                  "&WFs",
                  "_self"
                );


              } else if (rurl.toLowerCase().indexOf("pcode") > -1) {
                rurl = rurl.replace("&PCODE=", "");

                window.open(
                  _spPageContextInfo.webAbsoluteUrl +
                  rurl +
                  "&TID=" +
                  taskid +
                  "&IID=" +
                  ritemid +
                  "&PCODE=" +
                  pcode +
                  "&WFs",
                  "_self"
                );
              } else if (rurl.toLowerCase().indexOf("stcode") > -1) {
                rurl = rurl.replace("&STCODE=", "");

                window.open(
                  _spPageContextInfo.webAbsoluteUrl +
                  rurl +
                  "&TID=" +
                  taskid +
                  "&IID=" +
                  ritemid +
                  "&STCODE=" +
                  pcode +
                  "&WFs",
                  "_self"
                );

              } else {
                window.open(
                  _spPageContextInfo.webAbsoluteUrl +
                  rurl +
                  "&TID=" +
                  taskid +
                  "&IID=" +
                  ritemid +
                  "&WFs",
                  "_self"
                );
              }
              break;
          }
      }
    },
  },
};

var User_Stages_Data_Request = {
  onSuccess: function (sender, args) {
    var collListItem = User_Stages_Data_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      User_Stages_Data_Request.g.StagesArray.push({
        phase: oListItem.get_item("RelatedPhase"),
        stage: oListItem.get_item("Title"),
        relatedURL: oListItem.get_item("RelatedURL"),
        stageid: oListItem.get_id(),
      });
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // The main Initialization function
  init: function (peojectC, type, taskid, nxtstageid, prvstageid, stageid) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Stages");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><Eq><FieldRef Name='Enabled'/><Value Type='Integer'>1</Value></Eq></Where><OrderBy><FieldRef Name='ListSort' Ascending='True' /></OrderBy></Query></View>"
    );
    User_Stages_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(User_Stages_Data_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, User_Stages_Data_Request.onSuccess),
      Function.createDelegate(this, User_Stages_Data_Request.onError)
    );
  },
  // Global variables
  g: {
    StagesArray: [],
  },
};


////Generic_WF_Stages_Data_Request
window.Generic_WF_Stages_Data_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Generic_WF_Stages_Data_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Generic_WF_Stages_Data_Request.g.GWFStagesArray.push({
        stage: oListItem.get_item("Title"),
        relatedURL: oListItem.get_item("RelatedURL"),
        stageid: oListItem.get_id(),
      });
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("GenericWFStagesConfig");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>"
    );
    Generic_WF_Stages_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Generic_WF_Stages_Data_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Generic_WF_Stages_Data_Request.onSuccess),
      Function.createDelegate(this, Generic_WF_Stages_Data_Request.onError)
    );
  },
  // Global variables
  g: {
    GWFStagesArray: [],
  },
};
///

//check current project stage and disable related project pages if project is closed
window.currentStage;

window.PCODE_Stage_Data_Request = {
  onSuccess: function (sender, args) {
    var collListItem = PCODE_Stage_Data_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      //loop through list items
      var oListItem = listItemEnum.get_current();
      //
      currentStage = oListItem.get_item("Stage");
    }
    if (
      USERPCODE &&
      ((currentStage && currentStage == "S42") || currentStage == null)
    ) {
      $(".form-btns-wrapper").hide();
      $(".btnactionrow").hide();
      $("body").append(
        "<style>" +
        ".btn-add{opacity: .6;pointer-events: none;display:none}" +
        "</style>"
      );
    }
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
      USERPCODE +
      "</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>"
    ); //caml query
    PCODE_Stage_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(PCODE_Stage_Data_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, PCODE_Stage_Data_Request.onSuccess),
      Function.createDelegate(this, PCODE_Stage_Data_Request.onError)
    );
  },
  // Global variables
  g: {},
};

var checkNotificationStatusHtml = setInterval(function () {
  Tasks_Info_Request_User.preinit();
}, 1000);
// end of script

// open and close extra nav menu
if (!USERisHome) {
  $(window).on("click", function (e) {
    var except = document.getElementById("navcheckboxId");

    if (e.target == except) {
      return e.stopPropagation();
    }
    if (document.getElementById("navcheckboxId") && document.getElementById("navcheckboxId").checked) {
      document.getElementById("navcheckboxId").checked = false;
    } else {
    }
  });
}

// to close the notification Collaps
$(window).on("click", function (e) {
  var exceptNot1 = document.getElementById("cardNote1");
  var exceptNot2 = document.getElementById("cardNote2");
  var exceptNot3 = document.getElementById("cardNote3");
  var exceptNot4 = document.getElementById("cardNote4");
  if (
    e.target == exceptNot1 ||
    e.target == exceptNot2 ||
    e.target == exceptNot3 ||
    e.target == exceptNot4
  ) {
    return e.stopPropagation();
  }
  $("#notificationCollapse").collapse("hide");
});

//Update Notification Status
window.Notification_Update_Status = {
  init: function (IID) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Notifications");
    Notification_Update_Status.g.oListItem = oList.getItemById(IID); //declared inside object scope only
    Notification_Update_Status.g.oListItem.set_item("Status", "Seen");
    Notification_Update_Status.g.oListItem.update();
    clientContext.load(Notification_Update_Status.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        $('.accordion .list-group-item[data-id = "' + IID + '"]').hide();
        $("#headingFour .notificationsCounter").text(
          $("#headingFour .notificationsCounter").text() - 1
        );
        $("#notificationContainer .bell-value").text(
          $("#notificationContainer .bell-value").text() - 1
        );
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

//////////////
//hide the navbar

if (istherePCODE || isthereICODE || isthereSTCODE) {
} else {
  $("body").append("<style>.page-nav{display:none}<style/>");
}

// remove the userRole from local storage and redirect to SignOut
function logOutHandler() {
  localStorage.removeItem("userRole");
  localStorage.removeItem("userGroup");

  window.location =
    _spPageContextInfo.siteAbsoluteUrl + "/_layouts/15/SignOut.aspx";
}

//getting Related Initiatives Title
var GetInitiativeTitle_Request = {
  onSuccess: function (sender, args) {
    var collListItem = GetInitiativeTitle_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      InitiativeTitle = oListItem.get_item("Name")
        ? oListItem.get_item("Name")
        : UserNo_Data;
      InitiativeStartDate = oListItem.get_item("StartDate");
      InitiativeFinishDate = oListItem.get_item("FinishDate");

    }

    if (USERlistkey == "initiativemilestones" && (isEdit || isNew)) {
      // set min max date on planned date for milestones
      if (InitiativeStartDate) {
        let initFinishDate = new Date(InitiativeFinishDate)
          .toISOString()
          .split("T")[0];

        $("input#PlannedCompletedDate").attr("max", initFinishDate);
      }
      if (InitiativeFinishDate) {
        let initStartDate = new Date(InitiativeStartDate)
          .toISOString()
          .split("T")[0];

        $("input#PlannedCompletedDate").attr("min", initStartDate);
      }
    }

    window.checkBreadCrumbsStatusHtml = setInterval(function () {
      Access_Project_Info_Request.g.handleBreadcrumbs();
    }, 333);
  },
  onError: function (sender, args) {
    //
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  preinit: function () {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
      GetInitiativeTitle_Request.init();
    });
  },
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Initiatives");
    var camlQuery = new SP.CamlQuery();

    camlQuery.set_viewXml(
      '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
      UserICode +
      "</Value></Eq></Where></Query></View>"
    );
    GetInitiativeTitle_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(GetInitiativeTitle_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, GetInitiativeTitle_Request.onSuccess),
      Function.createDelegate(this, GetInitiativeTitle_Request.onError)
    );
  },
  g: {},
};

//getting Related StrategicPartnerships Title
var GetStrategicPartnershipTitle_Request = {
  onSuccess: function (sender, args) {
    var collListItem = GetStrategicPartnershipTitle_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      StrategicPartnershipTitle = oListItem.get_item("Name")
        ? oListItem.get_item("Name")
        : UserNo_Data;
    }
    window.checkBreadCrumbsStatusHtml = setInterval(function () {
      Access_Project_Info_Request.g.handleBreadcrumbs();
    }, 333);
  },
  onError: function (sender, args) {
    //
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  preinit: function () {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
      GetStrategicPartnershipTitle_Request.init();
    });
  },
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Strategic Partnerships");
    var camlQuery = new SP.CamlQuery();

    camlQuery.set_viewXml(
      '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
      UserSTCode +
      "</Value></Eq></Where></Query></View>"
    );
    GetStrategicPartnershipTitle_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(GetStrategicPartnershipTitle_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, GetStrategicPartnershipTitle_Request.onSuccess),
      Function.createDelegate(this, GetStrategicPartnershipTitle_Request.onError)
    );
  },
  g: {},
};

// data level access
async function initiateDataLevelAccess(lookupList) {

  try {

    if (myRoleConfig[0].hasOwnProperty("dataFilter")) {
      isRoleDataLevelAccess = true;
      myRoleConfig[0].dataFilter.hierarchies.forEach((el, i, a) => {

        let accessConditions = el.accessConditions;
        let isListConditional1;
        let isListConditional2;
        let isListConditional3;
        let isListConditional4;
        if (!lookupList) {
          isListConditional1 = el.listName == currentMainList;
          isListConditional2 = el.subRelation.listName == currentMainList;
          isListConditional3 =
            el.subRelation.subRelation.listName == currentMainList;
          isListConditional4 = (el.subRelation.subRelation.subRelation ? el.subRelation.subRelation.subRelation.listName == currentMainList : false);
        } else {
          isListConditional1 = el.listName == lookupList;
          isListConditional2 = el.subRelation.listName == lookupList;
          isListConditional3 =
            el.subRelation.subRelation.listName == lookupList;
          isListConditional4 = (el.subRelation.subRelation.subRelation ? el.subRelation.subRelation.subRelation.listName == lookupList : false);
        }
        if (isListConditional1) {
          data_Level1_Access.buildCamlQuery(
            el.listName,
            accessConditions,
            1,
            i
          );
          throw BreakException;
        } else if (isListConditional2) {
          data_Level1_Access.buildCamlQuery(
            el.listName,
            accessConditions,
            2,
            i
          );
          throw BreakException;
        } else if (isListConditional3) {
          data_Level1_Access.buildCamlQuery(
            el.listName,
            accessConditions,
            3,
            i
          );
          throw BreakException;
        } else if (isListConditional4) {
          data_Level1_Access.buildCamlQuery(
            el.listName,
            accessConditions,
            4,
            i
          );
          throw BreakException;
        }
      });
    }
  } catch (e) {
    if (e !== BreakException) throw e;
  }
}
let dataLevelAccessQuery = "";
let dataLevelAccessChoicesForFilters = [];

let data_Level1_Access = {
  buildCamlQuery: function (
    dataListName,
    fieldsConditionConfig,
    level,
    hierarchyIndex
  ) {

    data_Level1_Access.g.hierarchyIndex = hierarchyIndex;
    let whereBody = ``,
      queryBody = ``,
      whereBodyFinal = ``;
    //dynamic query building
    fieldsConditionConfig.forEach((el, i, a) => {
      //handle case of filters on pages
      dataLevelAccessChoicesForFilters.push({
        internalName: el.field,
        Type: el.type,
        Values: el.values,
      });
      //Two choices
      if (fieldsConditionConfig.length == 1) {
        if (el.type == "LoggedInUser") {
          whereBody += `<And><Eq><FieldRef Name="${el.field}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And>`;
        }
        // for other field
        else {
          whereBody += `<And><In><FieldRef Name="${el.field}"/><Values>`;
          for (var j = 0; j < el.values.length; j++) {
            whereBody += `<Value Type="${el.type}">${el.values[j]}</Value>`;
          }
          whereBody += `</Values></In><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And>`;
        }
        // if (i == 0) {
        // 	whereBody += `<And><In><FieldRef Name="${el.field}"/><Values>`;
        // 	for (var j = 0; j < el.values.length; j++) {
        // 		whereBody += `<Value Type="${el.type}">${el.values[j]}</Value>`;
        // 	}
        // 	whereBody += `</Values></In><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And>`;
        // }
      }
      //More than two choices// 1 is vc we have deletion
      else if (fieldsConditionConfig.length > 1) {
        //two Eqs in last And
        if (i == fieldsConditionConfig.length - 1) {
          if (el.type == "LoggedInUser") {
            if (el.conditionType == "Or") {
              // add condition type or for two obj in accessConditions to can get the data and related data 
              //if the user is LoogedInUser in field one or LoggedInUser in field 2  
              whereBody += `<Or><Eq><FieldRef Name="${el.field}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Eq><FieldRef Name="${fieldsConditionConfig[i - 1].field}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>`;

            } else {
              whereBody += `<And><Eq><FieldRef Name="${el.field}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>`;

            }
            // whereBody += `<And><Eq><FieldRef Name="${el.field}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>`;
          } else {
            whereBody += `<And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>`;
            whereBody += `<In><FieldRef Name="${el.field}"/><Values>`;
            for (var j = 0; j < el.values.length; j++) {
              whereBody += `<Value Type="${el.type}">${el.values[j]}</Value>`;
            }
            whereBody += `</Values></In>`;
          }

          if (el.conditionType == "Or") {

            // append Or closure
            var countOr = (whereBody.match(/<Or>/g) || []).length;
            var ORC = `</Or>`.repeat(countOr);
            whereBody += ORC;
            //appending And closure
            var count = (whereBody.match(/<And>/g) || []).length;
            var ANDC = `</And>`.repeat(count);
            whereBody += ANDC;

          } else {
            // // append Or closure
            // var countOr = (whereBody.match(/<Or>/g) || []).length;
            // var ORC = `</Or>`.repeat(countOr);
            // whereBody += ORC;
            var count = (whereBody.match(/<And>/g) || []).length;
            var ANDC = `</And>`.repeat(count);
            whereBody += ANDC;

          }

        }
        //normal And
        else {
          if (el.type == "LoggedInUser") {
            if (el.conditionType == "Or") {
              // add condition type or for two obj in accessConditions to can get the data and related data 
              //if the user is LoogedInUser in field one or LoggedInUser in field 2  
              whereBody += `<And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>`;
              // <Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>
            } else {
              whereBody += `<And><Eq><FieldRef Name="${el.field}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>`;
            }
            // whereBody += `<And><Eq><FieldRef Name="${el.field}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>`;
          } else {
            whereBody += `<And><In><FieldRef Name="${el.field}"/><Values>`;
            for (var j = 0; j < el.values.length; j++) {
              whereBody += `<Value Type="${el.type}">${el.values[j]}</Value>`;
            }
            whereBody += `</Values></In>`;
          }
        }
      }
      //Finish Line, make last changes and build query
      if (i == fieldsConditionConfig.length - 1) {

        whereBody = whereBody.replaceAll(
          `Type="date"`,
          `IncludeTimeValue="TRUE" Type="DateTime"`
        );
        whereBodyFinal = `<Where>${whereBody}
						</Where>`;
        queryBody = `<View>
        			<Query>
        			${whereBodyFinal}
        			<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy>
        			</Query>
        		</View>`;

        //     queryBody = `<View>
        //     <Query>
        //         <Where>
        //             <And>
        //                 <Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>
        //                 <Or>
        //                     <Eq><FieldRef Name="PerformanceLeader2" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>
        //                     <Eq><FieldRef Name="PerformanceLeader" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>
        //                 </Or>
        //             </And>
        //         </Where>
        //         <OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy>
        //     </Query>
        // </View>`
        data_Level1_Access.g.dataLevelQuery = queryBody;
        dataLevelAccessQuery = queryBody;
        data_Level1_Access.g.fieldsConditionConfig = fieldsConditionConfig;
        data_Level1_Access.g.dataLevel = level;
        if (level > 1) {
          SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
            data_Level1_Access.init(dataListName);
          });
        } else {
          tempRoleHierarchies = []
          accessCallisDone = true;
        }
        console.log("Data 1st level access query", queryBody);
      }
    });
  },
  // The main Initialization function
  init: function (dataListName) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(dataListName);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(data_Level1_Access.g.dataLevelQuery);
    data_Level1_Access.g.collListItem = oList.getItems(camlQuery);
    clientContext.load(data_Level1_Access.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, data_Level1_Access.onSuccess),
      Function.createDelegate(this, data_Level1_Access.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = data_Level1_Access.g.collListItem;

    var listItemEnum = collListItem.getEnumerator();

    if (collListItem.getEnumerator().$2J_0 > 0) {
      //check if any items are returned we can use .getEnumerator().moveNext() //true
    }
    let secondLevelConfig =
      myRoleConfig[0].dataFilter.hierarchies[
        data_Level1_Access.g.hierarchyIndex
      ].subRelation;
    let fieldName = secondLevelConfig.parentRelationField;

    while (listItemEnum.moveNext()) {

      var oListItem = listItemEnum.get_current();
      let itemCode = oListItem.get_item(fieldName);
      data_Level1_Access.g.relationFieldData.push(itemCode);
    }
    //check if there is no item in relationFieldData push null to avoid the keep loading err
    if (data_Level1_Access.g.relationFieldData.length == 0) {
      data_Level1_Access.g.relationFieldData.push(null);
    }

    data_Level1_Access.dynamicCamlQueryBuilder(
      secondLevelConfig,
      data_Level1_Access.g.relationFieldData
    );
  },

  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {
    dataLevelQuery: ``,
    fieldsConditionConfig: [],
    relationField: ``,
    relationFieldData: [],
  },
  //currenty handles one field not more
  dynamicCamlQueryBuilder: function (levelConfig, valuesArray) {
    let listName = levelConfig.listName;
    let fieldToQuery = levelConfig.RelationField;
    let fieldType = levelConfig.RelationFieldType;
    let level = levelConfig.level;

    let targetIsMulti = levelConfig.isMultiSelectField


    let whereBody = ``,
      queryBody = ``,
      whereBodyFinal = ``;

    let containBody = ``,
      containBodyFinal = ``,
      containqueryBody = ``;

    //dynamic query building
    whereBody += `<In><FieldRef Name="${fieldToQuery}" /><Values>`;
    //handle case of filters on pages
    dataLevelAccessChoicesForFilters = [];
    dataLevelAccessChoicesForFilters.push({
      internalName: fieldToQuery,
      Type: fieldType,
      Values: valuesArray,

    });
    valuesArray.forEach((el, i, a) => {

      //only one choice
      whereBody += `<Value Type="${fieldType}">${el}</Value>`;
      //Finish Line, make last changes and build query
      if (i == valuesArray.length - 1) {
        whereBody += `</Values></In>`;
        whereBody = whereBody.replaceAll(
          `Type="date"`,
          `IncludeTimeValue="TRUE" Type="DateTime"`
        );


        //section to handle multi look up selected
        containBody += `<Contains><FieldRef Name="${fieldToQuery}" /><Value Type="${fieldType}">${el}</Value></Contains>`
        var counttest = (containBody.match(/<Or>/g) || []).length;
        var ORC = "</Or>".repeat(counttest);
        containBody += ORC;

        containBodyFinal = `<Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>${containBody}</And></Where>`
        containqueryBody = `<View>
                  <Query>
                  ${containBodyFinal}
                  <OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy>
                  </Query>
              </View>`

        // end section to handle multi look up selected

        whereBodyFinal = `<Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>${whereBody}
					</And></Where>`;
        queryBody = `<View>
						<Query>
						${whereBodyFinal}
						<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy>
						</Query>
					</View>`;


        if (targetIsMulti) { // to check if the target is multi
          data_Level2_Access.g.dataLevelQuery = containqueryBody;
          dataLevelAccessQuery = containqueryBody;
        } else {

          data_Level2_Access.g.dataLevelQuery = queryBody;
          dataLevelAccessQuery = queryBody;
        }



        if (data_Level1_Access.g.dataLevel > 2) {
          data_Level2_Access.init(listName);
        } else {
          tempRoleHierarchies = []
          accessCallisDone = true;


        }
        console.log("Data 2nd level access query", queryBody);
        // finishRenderAccessRole = true

      }
    });
  },
};
let data_Level2_Access = {
  // The main Initialization function
  init: function (dataListName) {
    var clientContext = new SP.ClientContext.get_current();

    var oList = clientContext.get_web().get_lists().getByTitle(dataListName);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(data_Level2_Access.g.dataLevelQuery);
    data_Level2_Access.g.collListItem = oList.getItems(camlQuery);
    clientContext.load(data_Level2_Access.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, data_Level2_Access.onSuccess),
      Function.createDelegate(this, data_Level2_Access.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = data_Level2_Access.g.collListItem;

    var listItemEnum = collListItem.getEnumerator();

    if (collListItem.getEnumerator().$2J_0 > 0) {
      //check if any items are returned we can use .getEnumerator().moveNext() //true
    }
    let thirdLevelConfig =
      myRoleConfig[0].dataFilter.hierarchies[
        data_Level1_Access.g.hierarchyIndex
      ].subRelation.subRelation;
    let fieldName = thirdLevelConfig.parentRelationField;
    while (listItemEnum.moveNext()) {


      var oListItem = listItemEnum.get_current();
      let itemCode = oListItem.get_item(fieldName);
      data_Level2_Access.g.relationFieldData.push(itemCode);
    }

    //check if there is no item in relationFieldData push null to avoid the keep loading err
    if (data_Level2_Access.g.relationFieldData.length == 0) {
      data_Level2_Access.g.relationFieldData.push(null);
    }

    data_Level2_Access.dynamicCamlQueryBuilder(
      thirdLevelConfig,
      data_Level2_Access.g.relationFieldData
    );
  },

  //currenty handles one field not more
  dynamicCamlQueryBuilder: function (levelConfig, valuesArray) {

    let listName = levelConfig.listName;
    let fieldToQuery = levelConfig.RelationField;
    let fieldType = levelConfig.RelationFieldType;
    let level = levelConfig.level;

    let targetIsMulti = levelConfig.isMultiSelectField

    let whereBody = ``,
      queryBody = ``,
      whereBodyFinal = ``;

    let containBody = ``,
      containBodyFinal = ``,
      containqueryBody = ``;

    //dynamic query building
    whereBody += `<In><FieldRef Name="${fieldToQuery}" /><Values>`;
    //handle case of filters on pages
    dataLevelAccessChoicesForFilters = [];
    dataLevelAccessChoicesForFilters.push({
      internalName: fieldToQuery,
      Type: fieldType,
      Values: valuesArray,
      targetIsMultiFilter: targetIsMulti,

    });
    valuesArray.forEach((el, i, a) => {
      //only one choice
      whereBody += `<Value Type="${fieldType}">${el}</Value>`;

      //Finish Line, make last changes and build query
      if (i == valuesArray.length - 1) {

        whereBody += `</Values></In>`;
        whereBody = whereBody.replaceAll(
          `Type="date"`,
          `IncludeTimeValue="TRUE" Type="DateTime"`
        );

        //section to handle multi look up selected
        containBody += `<Contains><FieldRef Name="${fieldToQuery}" /><Value Type="${fieldType}">${el}</Value></Contains>`
        var counttest = (containBody.match(/<Or>/g) || []).length;
        var ORC = "</Or>".repeat(counttest);
        containBody += ORC;

        containBodyFinal = `<Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>${containBody}</And></Where>`
        containqueryBody = `<View>
            <Query>
            ${containBodyFinal}
            <OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy>
            </Query>
        </View>`


        // end section to handle multi look up selected

        whereBodyFinal = `<Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>${whereBody}
				</And></Where>`;

        queryBody = `<View>
					<Query>
					${whereBodyFinal}
					<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy>
					</Query>
				</View>`;

        if (targetIsMulti) { // to check if the target is multi
          dataLevelAccessQuery = containqueryBody;
          //add it  to handle 4 th level query
          data_Level3_Access.g.dataLevelQuery = containqueryBody;
        } else {
          dataLevelAccessQuery = queryBody;
          //add it  to handle 4 th level query
          data_Level3_Access.g.dataLevelQuery = queryBody;
        }



        if (data_Level1_Access.g.dataLevel > 3) {
          data_Level3_Access.init(listName);
        } else {
          tempRoleHierarchies = []
          accessCallisDone = true;
        }
        // console.log("Data3nd level access query", queryBody);

      } else {
        containBody += `<Or><Contains><FieldRef Name="${fieldToQuery}" /><Value Type="${fieldType}">${el}</Value></Contains>`
      }
    });
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {
    dataLevelQuery: ``,
    fieldsConditionConfig: [],
    relationField: ``,
    relationFieldData: [],
  },
};


let data_Level3_Access = {
  // The main Initialization function
  init: function (dataListName) {



    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(dataListName);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(data_Level3_Access.g.dataLevelQuery);
    data_Level3_Access.g.collListItem = oList.getItems(camlQuery);
    clientContext.load(data_Level3_Access.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, data_Level3_Access.onSuccess),
      Function.createDelegate(this, data_Level3_Access.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = data_Level3_Access.g.collListItem;

    var listItemEnum = collListItem.getEnumerator();

    if (collListItem.getEnumerator().$2J_0 > 0) {
      //check if any items are returned we can use .getEnumerator().moveNext() //true
    }

    let fourthLevelConfig =
      myRoleConfig[0].dataFilter.hierarchies[
        data_Level1_Access.g.hierarchyIndex
      ].subRelation.subRelation.subRelation;

    let fieldName = fourthLevelConfig.parentRelationField;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      let itemCode = oListItem.get_item(fieldName);
      data_Level3_Access.g.relationFieldData.push(itemCode);
    }

    //check if there is no item in relationFieldData push null to avoid the keep loading err
    if (data_Level3_Access.g.relationFieldData.length == 0) {
      data_Level3_Access.g.relationFieldData.push(null);
    }

    data_Level3_Access.dynamicCamlQueryBuilder(
      fourthLevelConfig,
      data_Level3_Access.g.relationFieldData
    );
  },
  //currenty handles one field not more
  dynamicCamlQueryBuilder: function (levelConfig, valuesArray) {

    let listName = levelConfig.listName;
    let fieldToQuery = levelConfig.RelationField;
    let fieldType = levelConfig.RelationFieldType;
    let level = levelConfig.level;

    let targetIsMulti = levelConfig.isMultiSelectField

    let whereBody = ``,
      queryBody = ``,
      whereBodyFinal = ``;

    let containBody = ``,
      containBodyFinal = ``,
      containqueryBody = ``;

    //dynamic query building
    whereBody += `<In><FieldRef Name="${fieldToQuery}" /><Values>`;
    //handle case of filters on pages
    dataLevelAccessChoicesForFilters = [];
    dataLevelAccessChoicesForFilters.push({
      internalName: fieldToQuery,
      Type: fieldType,
      Values: valuesArray,

    });
    valuesArray.forEach((el, i, a) => {
      //only one choice
      whereBody += `<Value Type="${fieldType}">${el}</Value>`;
      //Finish Line, make last changes and build query
      if (i == valuesArray.length - 1) {
        whereBody += `</Values></In>`;
        whereBody = whereBody.replaceAll(
          `Type="date"`,
          `IncludeTimeValue="TRUE" Type="DateTime"`
        );

        //section to handle multi look up selected
        containBody += `<Contains><FieldRef Name="${fieldToQuery}" /><Value Type="${fieldType}">${el}</Value></Contains>`
        var counttest = (containBody.match(/<Or>/g) || []).length;
        var ORC = "</Or>".repeat(counttest);
        containBody += ORC;

        containBodyFinal = `<Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>${containBody}</And></Where>`
        containqueryBody = `<View>
              <Query>
              ${containBodyFinal}
              <OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy>
              </Query>
          </View>`
        // end section to handle multi look up selected


        whereBodyFinal = `<Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>${whereBody}
					</And></Where>`;
        queryBody = `<View>
						<Query>
						${whereBodyFinal}
						<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy>
						</Query>
					</View>`;

        if (targetIsMulti) { // to check if the target is multi
          data_Level3_Access.g.dataLevelQuery = containqueryBody;
          dataLevelAccessQuery = containqueryBody;
        } else {
          data_Level3_Access.g.dataLevelQuery = queryBody;
          dataLevelAccessQuery = queryBody;
        }

        tempRoleHierarchies = []
        accessCallisDone = true;

        // console.log("Data 4rd level access query", queryBody);

      }
    });
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {
    dataLevelQuery: ``,
    fieldsConditionConfig: [],
    relationField: ``,
    relationFieldData: [],
  },
}

///////////////////////////////////


var Get_Milestones = {
  init: function () {

    var listHandler = ""
    var query = ''

    if (USERPCODE) {
      listHandler = "Milestones"


      query = "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
        USERPCODE +
        "</Value></Eq></And></Where><OrderBy><FieldRef Name='CommittedDate' Ascending='False' /></OrderBy></Query></View>"
    } else if (UserICode) {
      listHandler = "InitiativeMilestones"

      query = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="InitiativeCode" /><Value Type="Text">' + UserICode + '</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>'
    }

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(listHandler);
    var camlQuery = new SP.CamlQuery();


    camlQuery.set_viewXml(query);

    Get_Milestones.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_Milestones.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_Milestones.onSuccess),
      Function.createDelegate(this, Get_Milestones.onError)
    );
  },
  onSuccess: async function (sender, args) {

    var collListItem = Get_Milestones.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var itemhtml = [],
      itemID,
      itemname,
      itemtitle,
      itemPlannedClosureDate,
      itemstatus,
      itemdate,
      itemdate2,
      itemuser,
      allMilestonesArr = [],
      isactive;

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();
      itemname = oListItem.get_item("Name") || '';
      itemtitle = oListItem.get_item("Title") || '';
      if (USERPCODE) {

        itemPlannedClosureDate = Get_Milestones.g.dateConvert2(oListItem.get_item("PlannedDate")) || '' //PlannedClosureDate
      } else if (UserICode) {
        itemPlannedClosureDate = Get_Milestones.g.dateConvert2(oListItem.get_item("PlannedCompletedDate")) || '' //PlannedClosureDate

      }


      if (itemPlannedClosureDate) {
        allMilestonesArr.push({
          id: itemID,
          name: itemname,
          title: itemtitle,
          date: itemPlannedClosureDate
        })
      }


    }

    if (USERPCODE) {

      var noMsg = "", noPopupMsg = ""
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        noMsg = "يجب انشاء معلم جديد على الشهر الحالي"
        noPopupMsg = "لا يوجد معالم على هذه الشهور ,الرجاء انشاء معالم "
      } else {
        noMsg = "you should create a Milestone on Current Month"
        noPopupMsg = "There is no milestones on this Months, please create a milestones"
      }

      if (allMilestonesArr.length > 0) {
        var projectStartDate = Get_Milestones.g.dateConvert2(projectStartToValidation);
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var year = now.getFullYear();
        var today = now.getFullYear() + "-" + month + "-" + day;
        var todayArr = [today]

        var dateRangeArr = await dateRange(projectStartDate, today)

        var datesWithoutMilesArr = dateRangeArr

        var isMatch = false

        allMilestonesArr.forEach(el => {

          isMatch = dateRangeArr.some((e) => e.match(el.date.slice(0, -2)))

          if (isMatch) {
            let index = datesWithoutMilesArr.indexOf(el.date.slice(0, -2));
            datesWithoutMilesArr.splice(index, 1)

          } else {
          }
        })

        if (datesWithoutMilesArr.length > 0) {

          var isMatchCurrentMonth = datesWithoutMilesArr.some((e) => e.match(today.slice(0, -2)))


          if (datesWithoutMilesArr.length == 1 && isMatchCurrentMonth) {



            $('.page-nav').after(`<p style="padding:0 5%;color:#f00">${noMsg}</p>`)

          } else {

            var datesHtml = '<div style="width:100%;padding:20px 0">'
            datesWithoutMilesArr.forEach(el => {
              datesHtml += `<span class="col-2" style="display:inline-block">${el.slice(0, -1)}</span>`
            })
            datesHtml += '</div>'


            $('.page-nav').after('<div class="popupComment" style="justify-content:flex-start;"><div class="wrapcomments" style="width:50%;padding:15px;margin-top:10%">' +
              '<label><span  style="font-size:13px">' + noMsg + '</span></label>' + datesHtml + '<div class="btn-cont"><button class=" btn btn-action sendButton" type="button" onclick="window.location=\'' + _spPageContextInfo.webAbsoluteUrl
              + '/SitePages/new.aspx?ListKey=milestones&PCODE=' + USERPCODE +
              '\'"><span data-trans-milestonebutton class="Resources"></span></button><button onclick="$(\'.popupComment\').remove();" class=" btn btn-action"><span data-trans-cancelbutton class="Resources"></span></button><span style="display:none" class="successmsg"><span data-trans-submitsuccessMsg class="Resources"></span></span></div></div></div>')
          }
        }



      } else {
        $('.page-nav').after('<div class="popupComment" style="justify-content:flex-start;"><div class="wrapcomments" style="width:50%;padding:15px;justify-content:flex-start;margin-top:10%">' +
          '<label><span  style="font-size:13px">' + noMsg + '</span></label><div class="btn-cont"><button class=" btn btn-action sendButton" type="button" onclick="window.location=\'' + _spPageContextInfo.webAbsoluteUrl
          + '/SitePages/new.aspx?ListKey=milestones&PCODE=' + USERPCODE +
          '\'"><span data-trans-milestonebutton class="Resources"></span></button><button onclick="$(\'.popupComment\').remove();" class=" btn btn-action"><span data-trans-cancelbutton class="Resources"></span></button><span style="display:none" class="successmsg"><span data-trans-submitsuccessMsg class="Resources"></span></span></div></div></div>')
      }
    } else if (UserICode) {


      var noMsg = "", noPopupMsg = ""
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        noMsg = "يجب انشاء معلم جديد على الفترة الحالية"
        noPopupMsg = "لا يوجد معالم على هذه الفترة ,الرجاء انشاء معالم "
      } else {
        noMsg = "you should create a Milestone on Current Period"
        noPopupMsg = "There is no milestones on this period, please create a milestones"
      }

      if (allMilestonesArr.length > 0) {

        var initiativeStartDate = Get_Milestones.g.dateConvert2(initiativeStartToValidation) || '';
        // var initiativeFinishDate = standardisedPfinishdate;
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var year = now.getFullYear();
        var today = now.getFullYear() + "-" + month + "-" + day;
        var todayArr = [today]
        var splitThreeMontshArr = []


        var dateRangeArr = await dateRange(initiativeStartDate, today)

        const perChunk = 3 // items per chunk


        const result = await dateRangeArr.reduce((resultArray, item, index) => {
          const chunkIndex = Math.floor(index / perChunk)

          if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
          }

          resultArray[chunkIndex].push(item)

          return resultArray
        }, [])

        splitThreeMontshArr = result


        var datesWithoutMilesArrFiltered = splitThreeMontshArr

        var isMatch = false
        allMilestonesArr.forEach(el => {

          splitThreeMontshArr.forEach(item => {
            isMatch = item.some((e) => e.match(el.date.slice(0, -2)))
            if (isMatch) {
              let index = splitThreeMontshArr.indexOf(item);
              datesWithoutMilesArrFiltered.splice(index, 1)
            } else {
              console.log("Date")
            }
          })

        })



        if (datesWithoutMilesArrFiltered.length > 0) {
          if (datesWithoutMilesArrFiltered.length == 1) {
            var internalArr = datesWithoutMilesArrFiltered[0]
            var isMatchCurrentMonth = internalArr.some((e) => e.match(today.slice(0, -2)))
            if (isMatchCurrentMonth) {


              $('.page-nav').after(`<p data-trans-nomilestoneonperiod style="padding:0 5%;color:#f00" class="Resources">${noMsg}</p>`)
            } else {

              var datesHtml = '<div style="width:100%;padding:20px 0">'
              datesWithoutMilesArrFiltered.forEach(el => {
                var formatArr = []
                el.forEach(item => {
                  formatArr.push(item.slice(0, -1))
                })
                datesHtml += `<span class="col-5" style="display:inline-block">[${formatArr}]</span>`
              })
              datesHtml += '</div>'


              $('.page-nav').after('<div class="popupComment" style="justify-content:flex-start;"><div class="wrapcomments" style="width:50%;padding:15px;margin-top:10%">' +
                '<label><span  style="font-size:13px">' + noPopupMsg + '</span></label>' + datesHtml + '<div class="btn-cont"><button class=" btn btn-action sendButton" type="button" onclick="window.location=\'' + _spPageContextInfo.webAbsoluteUrl
                + '/SitePages/new.aspx?ListKey=initiativemilestones&ICODE=' + UserICode +
                '\'"><span data-trans-milestonebutton class="Resources"></span></button><button onclick="$(\'.popupComment\').remove();" class=" btn btn-action"><span data-trans-cancelbutton class="Resources"></span></button><span style="display:none" class="successmsg"><span data-trans-submitsuccessMsg class="Resources"></span></span></div></div></div>')
            }
          } else {


            var datesHtml = '<div style="width:100%;padding:20px 0">'
            datesWithoutMilesArrFiltered.forEach(el => {
              var formatArr = []
              el.forEach(item => {
                formatArr.push(item.slice(0, -1))
              })
              datesHtml += `<span class="col-5" style="display:inline-block">[${formatArr}]</span>`
            })
            datesHtml += '</div>'

            $('.page-nav').after('<div class="popupComment" style="justify-content:flex-start;"><div class="wrapcomments" style="width:50%;padding:15px;margin-top:10%">' +
              '<label><span  style="font-size:13px">' + noPopupMsg + '</span></label>' + datesHtml + '<div class="btn-cont"><button class=" btn btn-action sendButton" type="button" onclick="window.location=\'' + _spPageContextInfo.webAbsoluteUrl
              + '/SitePages/new.aspx?ListKey=initiativemilestones&ICODE=' + UserICode +
              '\'"><span data-trans-milestonebutton class="Resources"></span></button><button onclick="$(\'.popupComment\').remove();" class=" btn btn-action"><span data-trans-cancelbutton class="Resources"></span></button><span style="display:none" class="successmsg"><span data-trans-submitsuccessMsg class="Resources"></span></span></div></div></div>')
          }
        }

      } else {
        $('.page-nav').after('<div class="popupComment" style="justify-content:flex-start;"><div class="wrapcomments" style="width:50%;padding:15px;margin-top:10%">' +
          '<label><span  style="font-size:13px">' + noPopupMsg + '</span></label><div class="btn-cont"><button class=" btn btn-action sendButton" type="button" onclick="window.location=\'' + _spPageContextInfo.webAbsoluteUrl
          + '/SitePages/new.aspx?ListKey=initiativemilestones&ICODE=' + UserICode +
          '\'"><span data-trans-milestonebutton class="Resources"></span></button><button onclick="$(\'.popupComment\').remove();" class=" btn btn-action"><span data-trans-cancelbutton class="Resources"></span></button><span style="display:none" class="successmsg"><span data-trans-submitsuccessMsg class="Resources"></span></span></div></div></div>')
      }
    }


    changeResources()

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {
    dateConvert2: function (
      date //date format supported by standards
    ) {
      if (date) {
        var local = date.getTime();
        var offset = date.getTimezoneOffset() * (60 * 1000);
        var utc = new Date(local + offset);
        var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
        var datetouse = riyadh.toLocaleString("en-US").split(",")[0].split("/");
        datetouse[0] =
          datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
        datetouse[1] =
          datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
        var datetouse2 = datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1]; //yyyy-mm-dd
        return datetouse2;
      } else {
        return No_Data;
      }
    },
  },

}



async function dateRange(startDate, endDate) {
  var start = startDate.split('-');
  var end = endDate.split('-');
  var startYear = parseInt(start[0]);
  var endYear = parseInt(end[0]);
  var dates = [];

  for (var i = startYear; i <= endYear; i++) {
    var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
    var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
    for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      var month = j + 1;
      var displayMonth = month < 10 ? '0' + month : month;
      dates.push([i, displayMonth, ''].join('-'));
    }
  }
  return dates;
}



var Get_Configure_Api = {
  // The main Initialization function
  preinit: function () {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
      Get_Configure_Api.init();
    });
  },
  init: function () {

    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Configurations");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Title\" /><Value Type=\"Text\">" +
      "API_URL"
      +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );
    Get_Configure_Api.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_Configure_Api.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_Configure_Api.onSuccess),
      Function.createDelegate(this, Get_Configure_Api.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = Get_Configure_Api.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();

    while (listItemEnum.moveNext()) {

      var oListItem = listItemEnum.get_current();
      APIURL = oListItem.get_item("Value")
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {},

}

