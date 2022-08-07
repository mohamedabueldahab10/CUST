window.UserN;
window.checkHomeInitiativeStatus = '';
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
  InitiativeAccessQuery = "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>",
  SubSectorInitiativeAccessQuery = "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>",
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
  isSPMAdmin = false,
  isStrategyTeam = false,
  isAllKpis = false, // to get all kpis
  isVROE = false,
  isVROE = false,
  isSPMO = false,
  isDU = false,
  isSubSectorHead = false,
  isGeneralManager = false,
  isMinisterAssistant = false,
  isViceMinister = false,
  isEPMO = false,
  isStrategySpecialist = false,
  isPerformanceLeader = false,
  isKPIOWNER = false,
  isBITeam = false,
  pickerValidationDone = false,// to check picker user groups on form submit
  membersGroupCheckArray = [],// to check picker user groups on form submit
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
  istherePCODE = window.location.href.toLowerCase().indexOf("pcode=") > -1,
  isthereICODE = window.location.href.indexOf("ICODE=") > -1,
  UserICode = isthereICODE
    ? window.location.href.split("ICODE=")[1].split("&")[0]
    : "",
  isWF = window.location.href.toLowerCase().indexOf("&wfs") > -1,
  USERisWF = window.location.href.toLowerCase().indexOf("&wfs") > -1,
  isTarget = window.location.href.toLowerCase().indexOf("targets.aspx") > -1,
  isTaskDetails =
    window.location.href.toLowerCase().indexOf("taskdetails") > -1,
  USERlistkey =
    window.location.href.toLowerCase().indexOf("listkey=") > -1
      ? window.location.href.split("ListKey=")[1].split("&")[0]
      : "",
  USERisProjectHome =
    window.location.href.toLowerCase().indexOf("/projecthome.aspx") > -1,
  USERProjRelated = [],
  // isWF = window.location.href.toLowerCase().indexOf('&wfs') > -1,
  USERForBreadCrumbs = "",
  USERPageTitle,
  USERPName,
  USERIName,
  InitiativeTitle,
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
  TasksQuery =
    '<View><Query><Where><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>',
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
  User_ScheduleSource,
  User_ProjUID,
  User_ProjUID,
  //CRUD ACCESS
  Create_Access = [],
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


// $("body").attr('translate','no') // add translate no to body

if (window.location.href.indexOf("ListKey") > -1) {
  for (var i = 0; i < ListArray.length; i++) {
    var obj = ListArray[i];
    AllListKeys.push(Object.keys(obj)[0]); //returning all modules
    for (var key in obj) {
      //returning project related modules
      if (key == USERlistkey) {
        //get titles
        if (USERisForm) USERPageTitle = obj["FormTitle"];
        else if (USERisListing) USERPageTitle = obj["ListingTitle"];
      }
      if (key == "projectrelated") {
        if (obj[key])
          //if true
          USERProjRelated.push(Object.keys(obj)[0]);
      }
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
    //getUserWebPermissionREST();
    $.ajax({
      url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
      method: "GET",
      headers: {
        Accept: "application/json; odata=verbose",
      },
      success: function (data) {

        UserN = data.d;
        userCalls.get_CurrentUserGroupColl(data.d.Id);

      },
      error: function (data) {

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
      headers: {
        Accept: "application/json; odata=verbose",
      },
      success: function (data) {
        /* get all group's title of current user. */
        var results = data.d.results;
        for (var i = 0; i < results.length; i++) {
          Groups.push(results[i].Title);
        }
        if (Groups.indexOf("System Admin Group") == -1) {
          $("#ms-designer-ribbon").remove();
        }
        userCalls.get_userAccess();

      },
    });
  },
  isMember: function (groupName, userLoginName, fieldID) {
    console.log(groupName, "groupName groupName")
    console.log(userLoginName, "userLoginName")
    console.log(fieldID, "fieldID")
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
          pickerValidationDone = membersGroupCheckArray.length == 0 ? true : false;
          !pickerValidationDone ?
            userCalls.isMember(membersGroupCheckArray[0].groupName, membersGroupCheckArray[0].userLoginName, membersGroupCheckArray[0].fieldID)
            :
            membersGroupCheckArray = [];
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

          $("#" + fieldID + "").parent().append(ErrorMsg);
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
            '<div class="userExist ms-formvalidation sp-peoplepicker-errorMsg">ليس لديك الصلاحية الكافية للاطلاع على أعضاء المجموعة</div>';
        } else {
          ErrorMsg =
            '<div class="userExist ms-formvalidation sp-peoplepicker-errorMsg">You are not authorized to view the membership of the SP Group</div>';
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
      if (GroupItem.length > 1) { // to handle the multi role 
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

          myRolesHtml += `<li class="list-group-item">
            <a href="javascript:" class="d-flex justify-content-between align-items-center" onclick="localStorage.setItem('userRole', '${T.Role}');location.reload();" title="${T.Role}">
              <h3 data-trans-${T.Role} class="title-13 Resources m-0">${T.Role}</h3>
              <div class="circle-radio d-flex justify-content-center align-items-center">
                <div class="dot-radio ${isActiveRole}" data-role="${T.Role}"></div>
              </div>
            </a>
          </li>`;
          if (index == array.length - 1) {
            myRolesHtml += '<li class="list-group-item"><a href="javascript:logOutHandler();" title="Sign Out"><h3 data-trans-signout class="title-13 Resources"></h3></a></li>'
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

        })
      } else { // when we have a one role for user
        var myRolesHtml = ""

        myRolesHtml += '<li class="list-group-item"><a href="javascript:logOutHandler();" title="Sign Out"><h3 data-trans-signout class="title-13 Resources"></h3></a></li>'

        var checkRoleStatusHtml = setInterval(function () {
          if ($(".container-body").length) {
            clearInterval(checkRoleStatusHtml);
            $(".dropdown-menu.border-0.dropdown-menu-right").html(
              myRolesHtml
            );
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
        }
        else {
          document.title = "Listing";
        } break;
      case "new.aspx":
        if (isArabic) {
          document.title = "جديد";
        }
        else {
          document.title = "New";
        } break;
      case "view.aspx":
        if (isArabic) {
          document.title = "مشاهدة";
        }
        else {
          document.title = "View";
        } break;
      case "edit.aspx":
        if (isArabic) {
          document.title = "تعديل";
        }
        else {
          document.title = "Edit";
        } break;
      case "home.aspx":
        if (isArabic) {
          document.title = "المشاريع";
        }
        else {
          document.title = "Projects";
        } break;
      case "initiativesmain.aspx":
        if (isArabic) {
          document.title = "المبادرات";
        }
        else {
          document.title = "Initiatives";
        } break;
      case "projecthome.aspx":
        if (isArabic) {
          document.title = "تفاصيل المشروع";
        }
        else {
          document.title = "Project Home";
        } break;
      case "initiativehome.aspx":
        if (isArabic) {
          document.title = "تفاصيل المبادرة";
        }
        else {
          document.title = "Initiative Home";
        } break;
      case "taskhistory.aspx":
        if (isArabic) {
          document.title = "تاريخ المهمة";
        }
        else {
          document.title = "Task History";
        } break;
      default: document.title = USERPageTitle;

    }
    (Create_Access = Create_Access.map((name) => name.toLowerCase())), //making sure everything is lower case
      (Read_Access = Read_Access.map((name) => name.toLowerCase())),
      (Edit_Access = Edit_Access.map((name) => name.toLowerCase())),
      (Delete_Access = Delete_Access.map((name) => name.toLowerCase()));

    //check if user has chosen a certain role or if it is by default
    var currentUserRole;
    if (localStorage.getItem("userRole") == null)
      currentUserRole = GroupItem[0].Role;
    else currentUserRole = localStorage.getItem("userRole");

    //Add permission for default chart view on home Page + User Title Role

    console.log(currentUserRole, "currentUserRole currentUserRole")
    switch (
    currentUserRole //we need first role for user
    ) {
      case "Administrator":
        $("body").append(
          "<style>" +
          "div#s4-ribbonrow, div#O365_MainLink_Settings_container{display:block!important}html #s4-workspace {height: calc(100vh - 105px)!important;min-height:auto !important;}.Progress-Action {display:block!important;}" +
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
        break;
      case "Minister":
        // $("body").append(
        //   "<style>" +
        //   "div#s4-ribbonrow, div#O365_MainLink_Settings_container{display:block!important}html #s4-workspace {height: calc(100vh - 105px)!important;min-height:auto !important;}.Progress-Action {display:block!important;}" +
        //   "</style>"
        // );
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isMinister = true
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
        (SecondLevel_List = "Internal Entities"),
          (SecondLevel_FieldtoQuery = "Manager"),
          (SecondLevel_FieldtoQueryType = "Choice");
        (SecondLevel_FieldtoFetch = "Title"),
          (SecondLevel_CAMLQuery =
            "<View><Query><Where>" +
            "<And>" +
            "<Eq>" +
            '<FieldRef Name="' +
            SecondLevel_FieldtoQuery +
            '" LookupId="TRUE" />' +
            '<Value Type="' +
            SecondLevel_FieldtoQueryType +
            '"><UserID /></Value>' +
            "</Eq>" +
            "<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
            "</And>" +
            "</Where></Query></View>"),
          (SecondLevel_FirstLevel_Field = "Sector"),
          (SecondLevel_FirstLevel_FieldType = "Text");
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(4),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = " مدير  ";
        en_UserRole = "Sector Head of ";

        //CRUD
        Create_Access = [];
        Read_Access = [
          // "budgetitems",
          "Targets.aspx",
          // "goalstrategy",
          // "spillars",
          "sos",
          "MainIndicators.aspx",
          "initiatives",
          "initiativesmain.aspx",
          "InitiativeHome.aspx",
          "projects",
          "projecthome.aspx",
          "mom",
          "mainkpi",
          "lessonslearned",
          "deliverables",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "initiativedeliverables",
          "benefits",
          "benefitmetrics",
          "closureinitiative",
          // "closureinitiative",
          // "initiativeexecution",
          // "benefits",
          // "initiativemilestonesacceptance",
          // "initiativedeliverablesacceptance",
          "initiativemilestones",
          "projectcharter",
          // "kpiequations",
          // "deliveries",
          "risks",
          "issues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          // "MOM",
          "communicationplans",
          "lessonslearned",
          "stakeholders",
          "documents",
          "tasks",
          // "portfolio",
          // "ideas",
          "closureform",
          "TaskHistory.aspx",
          "home.aspx", "deliverablemetrics",
          // "benefitmatrix", "benefitmetrics",
        ];
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
          "deliverables",
          "mom",
          "lessonslearned",
          "initiativeexecution",
          "closureinitiative",
          "projectcharter",
          // "benefits",
          // "initiativemilestonesacceptance",
          // "initiativedeliverablesacceptance",
          // "initiativecards",
          // "kpiequations",
          // "deliveries",
          "risks",
          "issues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          // "MOM",
          "closureform",
          "communicationplans",
          "lessonslearned",
          "stakeholders",
          "documents",
          "projecthome.aspx",
        ];
        Read_Access = [
          // "budgetitems",
          // "Targets.aspx",
          // "goalstrategy",
          // "spillars",
          // "sos",
          // "initiatives",
          "projects",
          "mom",
          // "mainkpi",
          "lessonslearned",
          "deliverables",
          // "closureinitiative",
          // "initiativeexecution",
          // "benefits",
          // "initiativemilestonesacceptance",
          // "initiativedeliverablesacceptance",
          // "initiativecards",
          "projectcharter",
          // "kpiequations",
          // "deliveries",
          "risks",
          "issues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          // "MOM",
          "communicationplans",
          "lessonslearned",
          "stakeholders",
          "documents",
          "tasks",
          // "portfolio",
          // "ideas",
          "closureform",
          "TaskHistory.aspx",
          "home.aspx", "deliverablemetrics", "projecthome.aspx"
          // "benefitmatrix", "benefitmetrics",

        ];
        Edit_Access = [
          "projects",
          "mom",
          // "mainkpi",
          "lessonslearned",
          "deliverables",
          "closureinitiative",
          // "initiativeexecution",
          // "benefits",
          // "initiativemilestonesacceptance",
          // "initiativedeliverablesacceptance",
          // "initiativecards",
          "projectcharter",
          // "kpiequations",
          // "deliveries",
          "risks",
          "issues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          // "MOM",
          "communicationplans",
          "lessonslearned",
          "stakeholders",
          "documents",
          "closureform", "projecthome.aspx"
        ];
        Delete_Access = [];
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
          // "budgetitems",
          // "Targets.aspx",
          // "goalstrategy",
          // "spillars",
          // "sos",
          // "initiatives",
          "projects",
          "mom",
          // "mainkpi",
          "lessonslearned",
          "deliverables",
          // "closureinitiative",
          // "initiativeexecution",
          // "benefits",
          // "initiativemilestonesacceptance",
          // "initiativedeliverablesacceptance",
          // "initiativecards",
          "projectcharter",
          // "kpiequations",
          // "deliveries",
          "risks",
          "issues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          // "MOM",
          "communicationplans",
          "lessonslearned",
          "stakeholders",
          "documents",
          "tasks",
          // "portfolio",
          // "ideas",
          "closureform",
          "TaskHistory.aspx",
          "home.aspx",
          "deliverablemetrics",
          "projecthome.aspx"
          // "benefitmatrix", "benefitmetrics",
        ];
        Edit_Access = ["projecthome.aspx"];
        Delete_Access = [];

        break;
      case "InitiativeManager":
        if (USERisHome)
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/sitepages/initiativesmain.aspx";
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isInManager = true
        $("div#s4-ribbonrow, div#O365_MainLink_Settings_container").remove();
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مدير المبادرة";
        en_UserRole = "Initiative Manager";
        //CRUD
        Create_Access = [
          "initiativemilestones",
          "initiativedeliverables",
          // "projects",
          "initiativemom",
          "lessonslearned",
          "deliverables",
          "closureinitiative",
          "initiativeexecution",
          "benefits",
          "initiativemilestonesacceptance",
          "initiativedeliverablesacceptance",
          "initiativecards",
          "projectcharter",
          "kpiequations",
          "initiativerisks",
          "initiativeissues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          "communicationplans",
          "stakeholders",
          "documents",
          "tasks",
          "closureform",
          "TaskHistory.aspx",
          "deliverablemetrics",
          "benefitmatrix",
          "benefitmetrics"];
        Read_Access = [
          "initiatives",
          "InitiativeHome.aspx",
          "initiativemilestones",
          "initiativedeliverables",
          "projects",
          "projecthome.aspx",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "lessonslearned",
          "deliverables",
          "closureinitiative",
          "initiativeexecution",
          "benefits",
          "initiativemilestonesacceptance",
          "initiativedeliverablesacceptance",
          "initiativecards",
          "projectcharter",
          "kpiequations",

          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          "communicationplans",
          "stakeholders",
          "documents",
          "tasks",
          "closureform",
          "TaskHistory.aspx",
          "deliverablemetrics",
          "benefitmatrix",
          "benefitmetrics",
          "initiativesmain.aspx"];
        Edit_Access = [
          "initiatives",
          "initiativemilestones",
          "initiativedeliverables",
          "projects",
          "mom",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "lessonslearned",
          "deliverables",
          "closureinitiative",
          "initiativeexecution",
          "benefits",
          "initiativemilestonesacceptance",
          "initiativedeliverablesacceptance",
          "initiativecards",
          "projectcharter",
          "kpiequations",
          "risks",
          "issues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          "communicationplans",
          "stakeholders",
          "documents",
          "tasks",
          "closureform",
          "TaskHistory.aspx",
          "deliverablemetrics",
          "benefitmatrix",
          "benefitmetrics"];
        Delete_Access = [
          "initiatives",
          "initiativemilestones",
          "initiativedeliverables",
          "projects",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "lessonslearned",
          "deliverables",
          "closureinitiative",
          "initiativeexecution",
          "benefits",
          "initiativemilestonesacceptance",
          "initiativedeliverablesacceptance",
          "initiativecards",
          "projectcharter",
          "kpiequations",
          "risks",
          "issues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          "communicationplans",
          "stakeholders",
          "documents",
          "tasks",
          "closureform",
          "TaskHistory.aspx",
          "deliverablemetrics",
          "benefitmatrix",
          "benefitmetrics"];
        break;

      case "InitiativeOwner":
        if (USERisHome)
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/sitepages/initiativesmain.aspx";
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );

        isInOwner = true
        $("div#s4-ribbonrow, div#O365_MainLink_Settings_container").remove();
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مالك المبادرة";
        en_UserRole = "Initiative Owner";
        //CRUD
        Create_Access = [];

        Read_Access = [
          "initiatives",
          "InitiativeHome.aspx",
          "initiativemilestones",
          "initiativedeliverables",
          "projects",
          "projecthome.aspx",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "lessonslearned",
          "deliverables",
          "closureinitiative",
          "initiativeexecution",
          "benefits",
          "initiativemilestonesacceptance",
          "initiativedeliverablesacceptance",
          "initiativecards",
          "projectcharter",
          "kpiequations",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          "communicationplans",
          "stakeholders",
          "documents",
          "tasks",
          "closureform",
          "TaskHistory.aspx",
          "deliverablemetrics",
          "benefitmatrix",
          "benefitmetrics",
          "initiativesmain.aspx"
        ];

        Edit_Access = ["initiativecards"];
        Delete_Access = [];

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
        Create_Access = [];

        Read_Access = [
          //   "initiatives", 
          // "deliverablemetrics", 
          "benefitmatrix", "benefitmetrics", "mainkpi", "sos", "Targets.aspx",
          //  "portfolio", "home.aspx",
          "kpiequations", "MainIndicators.aspx",];

        Edit_Access = [];
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
        Create_Access = ["mainkpi", "sos", "benefits", "Targets.aspx", "kpiequations", "deliverablemetrics", "benefitmatrix", "benefitmetrics",];

        Read_Access = ["initiatives", "InitiativeHome.aspx", "mainkpi", "sos", "benefits", "Targets.aspx", "portfolio", "home.aspx", "kpiequations", "MainIndicators.aspx", "deliverablemetrics", "benefitmatrix", "benefitmetrics"];

        Edit_Access = ["mainkpi", "sos", "benefits", "Targets.aspx", "kpiequations", "deliverablemetrics", "benefitmatrix", "benefitmetrics",];
        Delete_Access = ["mainkpi", "sos", "benefits", "Targets.aspx", "kpiequations", "deliverablemetrics", "benefitmatrix", "benefitmetrics",];
        break;
      case "VROP":
        if (USERisHome)
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/sitepages/MainIndicators.aspx";
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
        Create_Access = ["mainkpi",
          //  "deliverablemetrics", "benefitmatrix", "benefitmetrics"
          , 'sos', "Targets.aspx", "kpiequations"
          // , "goalstrategy"
        ];
        Read_Access = ["mainkpi",
          "benefits",
          //  "deliverablemetrics", "benefitmatrix", "benefitmetrics", 
          'sos', "Targets.aspx", "kpiequations", "MainIndicators.aspx"
          // , "goalstrategy"
        ];
        Edit_Access = ["mainkpi",
          //  "deliverablemetrics", "benefitmatrix", "benefitmetrics"
          , 'sos', "Targets.aspx", "kpiequations"
          // , "goalstrategy"
        ];
        Delete_Access = ["mainkpi",
          //  "deliverablemetrics", "benefitmatrix", "benefitmetrics"
          , 'sos', "Targets.aspx", "kpiequations"
          // , "goalstrategy"
        ];
        break;
      // case "StrategyTeam":
      // 	$("body").append(
      // 		"<style>" + ".Progress-Action {display:block!important;}" + "</style>"
      // 	);
      // 	isSPMTeam = true;
      // 	isAllKpis = true;
      // 	//***** */
      // 	ChartHide =
      // 		".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(1),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
      // 	ar_UserRole = "الفريق الاستراتيجي";
      // 	en_UserRole = "Strategy Team";
      // 	//CRUD
      // 	Create_Access = ["goalstrategy", "spillars", "sos"];
      // 	Read_Access = ["goalstrategy", "spillars", "home.aspx", "sos", "MainIndicators.aspx"];
      // 	Edit_Access = ["goalstrategy", "spillars", "sos"];
      // 	Delete_Access = [];
      // 	break;

      case "VROE":
        // for get it back
        if (USERisHome)
          window.location =
            _spPageContextInfo.webAbsoluteUrl +
            "/sitepages/initiativesmain.aspx";
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
          "initiativeHome.aspx",
          "initiatives",
          "initiativecards",
          "initiativeexecution",
          "initiativedeliverablesacceptance",
          "initiativemilestonesacceptance",
          "closureinitiative",
          "benefits",
          // "mom",
          // "risks",
          "deliverablemetrics", "benefitmatrix", "benefitmetrics", "initiativeissues",
          "initiativemom",
          "initiativerisks",
        ];
        Read_Access = [
          "initiativeHome.aspx",
          "initiatives",
          "initiativesmain.aspx",
          "InitiativeHome.aspx",
          // "home.aspx",
          "initiativecards",
          "initiativecards",
          "initiativeexecution",
          "initiativedeliverablesacceptance",
          "initiativemilestonesacceptance",
          "closureinitiative",
          "benefits",
          "mom",
          "risks",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          // "home.aspx",
          "sos", "MainIndicators.aspx", "mainkpi", "lessonslearned",
          "deliverables",
          "closureinitiative",
          "initiativeexecution",
          "benefits",
          "initiativemilestonesacceptance",
          "initiativedeliverablesacceptance",
          "initiativecards",
          "projectcharter",
          "kpiequations",
          "deliveries",
          "risks",
          "issues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          "communicationplans",
          "lessonslearned",
          "stakeholders",
          "documents",
          "closureform", "projects", "projecthome.aspx",
          "deliverablemetrics", "benefitmatrix", "benefitmetrics",
        ];
        Edit_Access = [
          "initiativeHome.aspx",
          "initiatives",
          "initiativecards",
          "initiativecards",
          "initiativeexecution",
          "initiativedeliverablesacceptance",
          "initiativemilestonesacceptance",
          "closureinitiative",
          "benefits",
          // "mom",
          // "risks",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "deliverablemetrics", "benefitmatrix", "benefitmetrics",
        ];
        Delete_Access = [];
        break;
      //VRO For get Back ///Ghufran
      // case "VROE":
      //   if (USERisHome)
      //     window.location =
      //       _spPageContextInfo.webAbsoluteUrl +
      //       "/sitepages/initiativesmain.aspx";
      //   $("body").append(
      //     "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
      //   );
      //   isVROE = true;
      //   //***** */
      //   ChartHide =
      //     ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(1),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
      //   ar_UserRole = "مكتب ضمان التنفيذ";
      //   en_UserRole = "Execution Guarantee Office";
      //   //CRUD
      //   Create_Access = [
      //     "initiativeHome.aspx",
      //     "initiatives",
      //     "initiativecards",
      //     "initiativeexecution",
      //     "initiativedeliverablesacceptance",
      //     "initiativemilestonesacceptance",
      //     "closureinitiative",
      //     "benefits",
      //     "mom",
      //     "risks",
      //   ];
      //   Read_Access = [
      //     "initiativeHome.aspx",
      //     "initiatives",
      //     "initiativesmain.aspx",
      //     "home.aspx",
      //     "initiativecards",
      //     "initiativecards",
      //     "initiativeexecution",
      //     "initiativedeliverablesacceptance",
      //     "initiativemilestonesacceptance",
      //     "closureinitiative",
      //     "benefits",
      //     "mom",
      //     "risks",
      //   ];
      //   Edit_Access = [
      //     "initiativeHome.aspx",
      //     "initiatives",
      //     "initiativecards",
      //     "initiativecards",
      //     "initiativeexecution",
      //     "initiativedeliverablesacceptance",
      //     "initiativemilestonesacceptance",
      //     "closureinitiative",
      //     "benefits",
      //     "mom",
      //     "risks",
      //   ];
      //   Delete_Access = [];
      //   break;

      case "EPMO":
        // if (USERisHome)
        //   window.location =
        //     _spPageContextInfo.webAbsoluteUrl +
        //     "/sitepages/initiativesmain.aspx";
        $("body").append(
          "<style>" + ".Progress-Action {display:block!important;}" + "</style>"
        );
        isEPMO = true;
        //***** */
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(4),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مكتب ادارة المشروع المؤسسي";
        en_UserRole = "Institutional Project Management Office";
        //CRUD
        Create_Access = [
          "initiativeHome.aspx",
          "projects",
          "initiatives",
          "initiativecards",
          "initiativeexecution",
          "initiativedeliverablesacceptance",
          "initiativemilestonesacceptance",
          "closureinitiative",
          "benefits",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          // "mom",
          "risks",
          // "portfolio",
          "initiativedeliverables",
          "initiativemilestones",
          "issues",
          "deliverablemetrics",
          "benefitmatrix",
          "benefitmetrics",
          "milestones",
          "closureform"
        ];
        Read_Access = AllListKeys;
        Read_Access = Read_Access.concat(SP_Page_Name);
        Edit_Access = [
          "initiativeHome.aspx",
          "initiatives",
          "initiativecards",
          "initiativecards",
          "initiativeexecution",
          "initiativedeliverablesacceptance",
          "initiativemilestonesacceptance",
          "closureinitiative",
          "benefits",
          // "mom",
          // "mom",
          "risks",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "milestones",
          // "portfolio",
          "initiativedeliverables",
          "initiativemilestones",
          "issues",
          "deliverablemetrics",
          "benefitmatrix",
          "benefitmetrics",
          "projectcharter",
          "projects",
          "closureform"
        ];
        Delete_Access = [];
        break;
      case "SPMO":
        isSPMO = true;
        (SecondLevel_List = "Internal Entities"),
          (SecondLevel_FieldtoQuery = "SPMO"),
          (SecondLevel_FieldtoQueryType = "Choice");
        (SecondLevel_FieldtoFetch = "Title"),
          (SecondLevel_CAMLQuery =
            "<View><Query><Where>" +
            "<And>" +
            "<Eq>" +
            '<FieldRef Name="' +
            SecondLevel_FieldtoQuery +
            '" LookupId="TRUE" />' +
            '<Value Type="' +
            SecondLevel_FieldtoQueryType +
            '"><UserID /></Value>' +
            "</Eq>" +
            "<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
            "</And>" +
            "</Where></Query></View>"),
          (SecondLevel_FirstLevel_Field = "Sector"),
          (SecondLevel_FirstLevel_FieldType = "Text");
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(4),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(6)";
        ar_UserRole = "مكتب إدارة المشاريع القطاعي";
        en_UserRole = "Sectoral Project Management Office";

        //CRUD
        Create_Access = [];
        Read_Access = [
          "initiatives",
          "initiativesmain.aspx",
          "InitiativeHome.aspx",
          "projects",
          "projecthome.aspx",
          "mom",
          "mainkpi",
          "lessonslearned",
          "deliverables",
          "projectcharter",
          "risks",
          "issues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          // "MOM",
          "communicationplans",
          "lessonslearned",
          "stakeholders",
          "documents",
          "tasks",
          "closureform",
          "TaskHistory.aspx",
          "home.aspx", "deliverablemetrics",
          //for initiative
          "initiativedeliverables",
          "initiativemilestones",
          "initiativerisks",
          "initiativeissues",
          "initiativemom",
          "benefits",
          "benefitmetrics",
          "closureinitiative"
        ];
        Edit_Access = [];
        break;
      case "MinisterAssistant":
        isMinisterAssistant = true;
        (SecondLevel_List = "Internal Entities"),
          (SecondLevel_FieldtoQuery = "MinisterAssistant"),
          (SecondLevel_FieldtoQueryType = "Choice");
        (SecondLevel_FieldtoFetch = "Title"),
          (SecondLevel_CAMLQuery =
            "<View><Query><Where>" +
            "<And>" +
            "<Eq>" +
            '<FieldRef Name="' +
            SecondLevel_FieldtoQuery +
            '" LookupId="TRUE" />' +
            '<Value Type="' +
            SecondLevel_FieldtoQueryType +
            '"><UserID /></Value>' +
            "</Eq>" +
            "<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
            "</And>" +
            "</Where></Query></View>"),
          (SecondLevel_FirstLevel_Field = "Sector"),
          (SecondLevel_FirstLevel_FieldType = "Text");
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(4),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "معالى مساعد الوزير";
        en_UserRole = "Minister Assistant";

        //CRUD
        Create_Access = [];
        Read_Access = [
          // "budgetitems",
          "Targets.aspx",
          // "goalstrategy",
          "initiativemilestones",
          "sos",
          "MainIndicators.aspx",
          "initiatives",
          "initiativesmain.aspx",
          "InitiativeHome.aspx",
          "projects",
          "projecthome.aspx",
          "mom",
          "mainkpi",
          "lessonslearned",
          "deliverables",
          // "closureinitiative",
          // "initiativeexecution",         
          "initiativedeliverables",
          "benefits",
          "benefitmetrics",
          "closureinitiative",
          // "initiativemilestonesacceptance",
          // "initiativedeliverablesacceptance",
          // "initiativecards",
          "projectcharter",
          // "kpiequations",
          "deliveries",
          "risks",
          "issues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          "MOM",
          "communicationplans",
          "lessonslearned",
          "stakeholders",
          "documents",
          "tasks",
          "initiativerisks",
          "initiativeissues",
          "initiativemom",
          // "portfolio",
          // "ideas",
          "closureform",
          "TaskHistory.aspx",
          "home.aspx", "deliverablemetrics",
          // "benefitmatrix", "benefitmetrics",
        ];
        Edit_Access = [];
        break;
      case "ViceMinister":
        isViceMinister = true;
        (SecondLevel_List = "Internal Entities"),
          (SecondLevel_FieldtoQuery = "ViceMinister"),
          (SecondLevel_FieldtoQueryType = "Choice");
        (SecondLevel_FieldtoFetch = "Title"),
          (SecondLevel_CAMLQuery =
            "<View><Query><Where>" +
            "<And>" +
            "<Eq>" +
            '<FieldRef Name="' +
            SecondLevel_FieldtoQuery +
            '" LookupId="TRUE" />' +
            '<Value Type="' +
            SecondLevel_FieldtoQueryType +
            '"><UserID /></Value>' +
            "</Eq>" +
            "<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
            "</And>" +
            "</Where></Query></View>"),
          (SecondLevel_FirstLevel_Field = "Sector"),
          (SecondLevel_FirstLevel_FieldType = "Text");
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(4),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "معالى نائب الوزير";
        en_UserRole = "Vice Minister";

        //CRUD
        Create_Access = [];
        Read_Access = [
          // "budgetitems",
          "Targets.aspx",
          // "goalstrategy",
          // "spillars",
          "initiativedeliverables",
          "initiativerisks",
          "initiativeissues",
          "initiativemom",
          "benefits",
          "benefitmetrics",
          "closureinitiative",
          "sos",
          "MainIndicators.aspx",
          "initiatives",
          "initiativesmain.aspx",
          "InitiativeHome.aspx",
          "projects",
          "projecthome.aspx",
          "mom",
          "mainkpi",
          "lessonslearned",
          "deliverables",
          // "closureinitiative",
          // "initiativeexecution",
          // "benefits",
          // "initiativemilestonesacceptance",
          // "initiativedeliverablesacceptance",
          // "initiativecards",
          "projectcharter",
          // "kpiequations",
          "deliveries",
          "risks",
          "issues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          "MOM",
          "communicationplans",
          "lessonslearned",
          "stakeholders",
          "documents",
          "tasks",
          // "portfolio",
          "initiativemilestones",
          "closureform",
          "TaskHistory.aspx",
          "home.aspx", "deliverablemetrics",
          // "benefitmatrix", "benefitmetrics",
        ];
        Edit_Access = [];
        break;
      case "DU":
        isDU = true;
        // console.log('dddddddddddd')
        debugger
        (SecondLevel_List = "Internal Entities"),
          (SecondLevel_FieldtoQuery = "SPMO"),
          (SecondLevel_FieldtoQueryType = "Choice");
        (SecondLevel_FieldtoFetch = "Title"),
          (SecondLevel_CAMLQuery =
            "<View><Query><Where>" +
            "<And>" +
            "<Eq>" +
            '<FieldRef Name="' +
            SecondLevel_FieldtoQuery +
            '" LookupId="TRUE" />' +
            '<Value Type="' +
            SecondLevel_FieldtoQueryType +
            '"><UserID /></Value>' +
            "</Eq>" +
            "<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
            "</And>" +
            "</Where></Query></View>"),
          (SecondLevel_FirstLevel_Field = "SubSector"),
          (SecondLevel_FirstLevel_FieldType = "Text");
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(4),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "مدير وحدة التنفيذ";
        en_UserRole = "Development Unit";

        //CRUD
        Create_Access = [
          "deliverables",
          "mom",
          "lessonslearned",
          "initiativeexecution",
          "closureinitiative",
          "projectcharter",
          "risks",
          "issues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          "closureform",
          "communicationplans",
          "lessonslearned",
          "stakeholders",
          "documents",
          "projecthome.aspx",
          //initiative
          "initiativemilestones",
          "initiativedeliverables",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "benefits",
          "benefitmetrics"
        ];
        Read_Access = [
          // "budgetitems",
          // "Targets.aspx",
          // "goalstrategy",
          "initiatives",
          "InitiativeHome.aspx",
          "initiativemilestones",
          "initiativedeliverables",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "projects",
          "projecthome.aspx",
          "mom",
          "mainkpi",
          "lessonslearned",
          "deliverables",
          "closureinitiative",
          "initiativeexecution",
          "benefits",
          "initiativemilestonesacceptance",
          "initiativedeliverablesacceptance",
          "initiativecards",
          "projectcharter",
          "kpiequations",
          // "deliveries",
          "risks",
          "issues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          // "MOM",
          "communicationplans",
          "lessonslearned",
          "stakeholders",
          "documents",
          "mainindicators.aspx",
          "initiativesmain.aspx",
          "tasks",
          // "portfolio",
          // "ideas",
          "closureform",
          "TaskHistory.aspx",
          "home.aspx", "deliverablemetrics",
          "benefitmatrix", "benefitmetrics",
        ];
        Edit_Access = [
          "projects",
          "mom",
          "lessonslearned",
          "deliverables",
          "closureinitiative",
          "projectcharter",
          "risks",
          "issues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          "communicationplans",
          "lessonslearned",
          "stakeholders",
          "documents",
          "closureform",
          "projecthome.aspx",
          //initiatives
          "initiativemilestones",
          "initiativedeliverables",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "benefits",
          "benefitmetrics",
          "initiatives"
        ];
        break;
      case "SubSectorHead":
        isSubSectorHead = true;
        (SecondLevel_List = "Internal Entities"),
          (SecondLevel_FieldtoQuery = "Manager"),
          (SecondLevel_FieldtoQueryType = "Choice");
        (SecondLevel_FieldtoFetch = "Title"),
          (SecondLevel_CAMLQuery =
            "<View><Query><Where>" +
            "<And>" +
            "<Eq>" +
            '<FieldRef Name="' +
            SecondLevel_FieldtoQuery +
            '" LookupId="TRUE" />' +
            '<Value Type="' +
            SecondLevel_FieldtoQueryType +
            '"><UserID /></Value>' +
            "</Eq>" +
            "<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
            "</And>" +
            "</Where></Query></View>"),
          (SecondLevel_FirstLevel_Field = "SubSector"),
          (SecondLevel_FirstLevel_FieldType = "Text");
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(4),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = "وكيل ";
        en_UserRole = "SubSector Head of ";

        //CRUD
        Create_Access = [];
        Read_Access = [
          // "budgetitems",
          "Targets.aspx",
          // "goalstrategy",
          "initiativedeliverables",
          "benefits",
          "benefitmetrics",
          "closureinitiative",
          "initiatives",
          "InitiativeHome.aspx",
          "initiativemilestones",
          "initiativedeliverables",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "projects",
          "projecthome.aspx",
          "mom",
          "mainkpi",
          "lessonslearned",
          "deliverables",
          "closureinitiative",
          "initiativeexecution",
          "benefits",
          "initiativemilestonesacceptance",
          "initiativedeliverablesacceptance",
          "initiativecards",
          "projectcharter",
          "kpiequations",
          "deliveries",
          "risks",
          "issues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          "MOM",
          "communicationplans",
          "lessonslearned",
          "stakeholders",
          "documents",
          "mainindicators.aspx",
          "initiativesmain.aspx",
          "tasks",
          // "portfolio",
          // "ideas",
          "sos",
          "closureform",
          "TaskHistory.aspx",
          "home.aspx", "deliverablemetrics",
          "benefitmatrix", "benefitmetrics",
        ];
        Edit_Access = [];
        break;
      case "GeneralManager":
        isGeneralManager = true;
        (SecondLevel_List = "Internal Entities"),
          (SecondLevel_FieldtoQuery = "Manager"),
          (SecondLevel_FieldtoQueryType = "Choice");
        (SecondLevel_FieldtoFetch = "Title"),
          (SecondLevel_CAMLQuery =
            "<View><Query><Where>" +
            "<And>" +
            "<Eq>" +
            '<FieldRef Name="' +
            SecondLevel_FieldtoQuery +
            '" LookupId="TRUE" />' +
            '<Value Type="' +
            SecondLevel_FieldtoQueryType +
            '"><UserID /></Value>' +
            "</Eq>" +
            "<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
            "</And>" +
            "</Where></Query></View>"),
          (SecondLevel_FirstLevel_Field = "SubSector"),
          (SecondLevel_FirstLevel_FieldType = "Text");
        ChartHide =
          ".statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(3),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(4),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(5),.statistics-ctx .ctx-block.row.mx-n2 > div:nth-child(7)";
        ar_UserRole = " مدير إدارة ";
        en_UserRole = "General Manager of ";

        //CRUD
        Create_Access = [];
        Read_Access = [
          // "budgetitems",
          "Targets.aspx",
          // "goalstrategy",
          "initiativedeliverables",
          "benefits",
          "benefitmetrics",
          "closureinitiative",
          "initiatives",
          "InitiativeHome.aspx",
          "initiativemilestones",
          "initiativedeliverables",
          "initiativeissues",
          "initiativemom",
          "initiativerisks",
          "projects",
          "projecthome.aspx",
          "mom",
          "mainkpi",
          "lessonslearned",
          "deliverables",
          "closureinitiative",
          "initiativeexecution",
          "benefits",
          "initiativemilestonesacceptance",
          "initiativedeliverablesacceptance",
          "initiativecards",
          "projectcharter",
          "kpiequations",
          "deliveries",
          "risks",
          "issues",
          "milestones",
          "invoices",
          "contracts",
          "changerequest",
          "MOM",
          "communicationplans",
          "lessonslearned",
          "stakeholders",
          "documents",
          "mainindicators.aspx",
          "initiativesmain.aspx",
          "tasks",
          // "portfolio",
          // "ideas",
          "sos",
          "closureform",
          "TaskHistory.aspx",
          "home.aspx", "deliverablemetrics",
          "benefitmatrix", "benefitmetrics",
        ];
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
        if (USERisHome)

          window.location =

            _spPageContextInfo.webAbsoluteUrl +

            "/sitepages/MainIndicators.aspx";
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
        Create_Access = ["goalstrategy", "spillars", "sos",
          // "portfolio"
        ];
        Read_Access = ["goalstrategy", "spillars", "MainIndicators.aspx", "sos",
          //  "portfolio"
        ];
        Edit_Access = ["goalstrategy", "spillars", "sos",
          //  "portfolio"
        ];
        Delete_Access = ["goalstrategy", "spillars", "sos"];
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
        Create_Access = [];
        Read_Access = ["mainkpi",
          //  "sos", 
          "Targets.aspx",
          //  "portfolio", 
          "kpiequations",
          // "home.aspx",
          "MainIndicators.aspx"];
        Edit_Access = [];
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
        Create_Access = [];
        Read_Access = ["mainkpi",
          //  "sos", 
          "Targets.aspx", "kpiequations", "MainIndicators.aspx"];
        Edit_Access = ["Targets.aspx", "mainkpi", "kpiequations", "MainIndicators.aspx"];
        Delete_Access = [];
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
      (Read_Access = Read_Access.map((name) => name.toLowerCase())),
      (Edit_Access = Edit_Access.map((name) => name.toLowerCase())),
      (Delete_Access = Delete_Access.map((name) => name.toLowerCase()));


    switch (
    true //Create Access
    ) {
      case (USERisNew || USERisListing || USERisProjectHome) && Create_Access.indexOf(USERlistkey) == -1 && Create_Access.indexOf(Page_UrlName) == -1 && !USERisWF:
        if (USERisNew) {
          // on edit/new forms
          userCalls.g.Security_Msg();
          console.warn("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
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
          console.log()
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
    //end CRUD
    debugger
    if ((!isInitiativesHomePage && !isInManager && !isInOwner) || isDU || isMinisterAssistant || isViceMinister || isSectorHead || isSubSectorHead || isGeneralManager) {
      if (!isSectionHead && !isPortfolioManager && !isSectorHead && !isSPMO && !isDU && !isGeneralManager && !isSubSectorHead && !isMinisterAssistant && !isViceMinister) {
        // IF Data directly getting from project list
        //
        Access_Project_Info_Request.preinit();
      } else if (
        (istherePCODE || USERisHome || USERisListing || isInitiativesHomePage || isTarget || isMainIndicator) &&
        (isSectionHead || isPortfolioManager || isSectorHead || isSPMO || isSubSectorHead || isGeneralManager || isDU || isMinisterAssistant || isViceMinister)
      ) {
        //if data getting from other list related to project

        Access_Sector_Info_Request.preinit();
      } else {
        window.checkBreadCrumbsStatusHtml = setInterval(function () {
          Access_Project_Info_Request.g.handleBreadcrumbs();
        }, 333);
      }
    }


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
    if (isInManager || isInOwner) {
      Access_Initiative_Info_Request.preinit();
    }
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
        groupsName: ["Minister"]
      },

      {
        Role: "SectorHead",
        groupsName: ["Sector Head"],
      },
      {
        Role: "ProjectManager",
        groupsName: ["Project Managers for Project Web App"],
      },
      {
        Role: "ProjectOwner",
        groupsName: ["Project Owners for Project Web App"]
      },
      {
        Role: "InitiativeManager",
        groupsName: ["Initiative Manager"]
      },
      {
        Role: "InitiativeOwner",
        groupsName: ["Initiative Owner"]
      },
      {
        Role: "SPMTeam",
        groupsName: ["SPM Team"],
      },
      {
        Role: "SPMAdmin",
        groupsName: ["SPM Admin"],
      },
      {
        Role: "VROE",
        groupsName: ["VRO_E"],
      },
      {
        Role: "VROP",
        groupsName: ["VRO_P"],
      },
      {
        Role: "StrategyTeam",
        groupsName: ["Strategy Specialist"],
      },
      {
        Role: "SPMO",
        groupsName: ["SPMO"],
      },
      {
        Role: "DU",
        groupsName: ["Development Unit"]
      },
      {
        Role: "MinisterAssistant",
        groupsName: ["Minister Assistant"]
      },
      {
        Role: "ViceMinister",
        groupsName: ["Vice Minister"]
      },
      {
        Role: "BITeam",
        groupsName: ["BI Team"]
      },
      {
        Role: "EPMO",
        groupsName: ["EPMO"],
      },
      {
        Role: "KPIOwner",
        groupsName: ["KPI Owners"],
      },
      {
        Role: "SubSectorHead",
        groupsName: ["SubSector Head"],
      },
      {
        Role: "GeneralManager",
        groupsName: ["General Manager"],
      },
      {
        Role: "PerformanceLeader",
        groupsName: ["Performance Leaders"],
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

        function findCommonElements(arr1, arr2) {
          return arr1.some((item) => arr2.includes(item));
        }
        $(".section-container .CFIELD").each(function () {
          $(this).val($(this).attr("data-groups"));
          var dataGroups = $(this).attr("data-groups");
          var dataGroupsArray = dataGroups ? dataGroups.split(",") : []; // to avoid the error in console
          if (
            findCommonElements(Groups, dataGroupsArray) == false &&
            $(this).attr("data-groups") != ""
          ) {
            $(this).find("*").attr("disabled", true);
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
  console.log("INSIDE DOCUMENT READY")
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
    console.log('on success');
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      if (USERPCODE == oListItem.get_item("Title")) {
        //for breadcrumbs
        USERPName = oListItem.get_item("Name")
          ? oListItem.get_item("Name")
          : UserNo_Data;
        USERPID = oListItem.get_id();
        User_isClosureStatus =
          oListItem.get_item("ClosureStatus") == "Failed" ||
            oListItem.get_item("ClosureStatus") == "Cancelled"
            ? true
            : false;
        User_ProjUID = oListItem.get_item("ProjectGUID") || UserNo_Data;
        //for milestones source
        User_ScheduleSource = oListItem.get_item("ScheduleSource") || No_Data;
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

    if (isthereICODE) {
      GetInitiativeTitle_Request.preinit();
    }
    else {
      window.checkBreadCrumbsStatusHtml = setInterval(function () {
        Access_Project_Info_Request.g.handleBreadcrumbs();
      }, 333);
    }


    if (istherePCODE && Access_Project_Info_Request.g.User_Projects.indexOf(Access_Project_Info_Request.g.PCODE) == -1 && !isWF && !isAdmin && !isMinister && !isITSteering) {
      //in pages related to project if user is not related to the current project

      userCalls.g.Security_Msg();
    }
    debugger
    console.log("debuuge on query")
    if (!isAdmin && !isMinister && !isITSteering && !isEPMO) {
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

      console.log(isShowAll)
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
        console.log(Access_Project_Info_Request.g.User_Projects.length, "llllllllllll")
        //debugger
        if (Access_Project_Info_Request.g.User_Projects.length == 0) {
          if (isSectionHead || isPortfolioManager || isSectorHead || isSPMO || isSubSectorHead || isGeneralManager || isDU || isMinisterAssistant || isViceMinister) {
            //

            AccessQuery = SectorHeadQuery;
          } else if (isAdmin || isMinister || isITSteering || isEPMO) { // to can see everything
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
        if (USERlistkey == 'milestones'){ // to arrange the milestone depends on PlannedDate
          AccessQuery =
          '<View><Query><Where><And><In><FieldRef Name="ProjectCode" /><Values><Value Type="Text">' +
          USERPCODE +
          "</Value></Values></In><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='PlannedDate' Ascending='False' /></OrderBy></Query></View>";
        }else{
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
        //debugger
        ///////Ghufran Listing Query
        //if on listing pages other then projects and its child data (risks, issues...)
        if (isVROP && USERisListing && USERlistkey == 'goalstrategy') { // vrop can't see goal strategy now as userguide
          AccessQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="Types" /><Value Type="Choice">vision</Value></Eq></And></Where></Query></View>';
        }
        else if (USERisListing && USERlistkey == 'mainkpi') {
          if (!isAdmin && !isMinister && !isSPMTeam && !isVROP && !isSPMAdmin && !isDU && !isSubSectorHead && !isGeneralManager && !isMinisterAssistant && !isViceMinister && !isSectorHead && !isSPMO) {
            AccessQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Or><Or><Eq><FieldRef Name="PerformanceLeader" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq><Eq><FieldRef Name="PerformanceLeader2" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq></Or><Eq><FieldRef Name="Owner" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq></Or></And></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>';
          }
          // else if (isSPMAdmin || isSPMTeam){
          //   AccessQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><In><FieldRef Name="Types"/><Values><Value Type="Text">sub</Value><Value Type="Text">main</Value></Values></In></And></Where></Query></View>';

          // }
          else if (isVROP) {
            AccessQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="RelatedStrategyType" /><Value Type=\'Text\'>vision</Value></Eq></And></Where></Query></View>';
          }
          else if (isDU || isMinisterAssistant || isSectorHead || isViceMinister || isSubSectorHead || isGeneralManager || isSPMO) {
            //debugger
            AccessQuery = SectorHeadQuery
          }
        } else if (USERisListing && USERlistkey == 'initiatives') {
          //debugger
          if (isVROE) {

            AccessQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="Types" /><Value Type=\'Text\'>vision</Value></Eq></And></Where></Query></View>';

          }
          //else 
          // if (isEPMO) {
          //   AccessQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="Types" /><Value Type=\'Text\'>strategically</Value></Eq></And></Where></Query></View>';
          // }
          else if (isDU || isSPMO || isMinisterAssistant || isSectorHead || isViceMinister || isSubSectorHead || isGeneralManager) {
            AccessQuery = SectorHeadQuery
          }
        } else if ((isDU || isMinisterAssistant || isViceMinister || isSectorHead || isSubSectorHead || isGeneralManager) && isInitiativesHomePage) {

          SubSectorInitiativeAccessQuery = SectorHeadQuery
          //debugger
        } else if ((isSPMAdmin && USERisListing && USERlistkey == 'sos') || (isSPMTeam && USERisListing && USERlistkey == 'sos')) {
          AccessQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="Types" /><Value Type="Choice">sub</Value></Eq></And></Where></Query></View>';
        } else if (isMinisterAssistant || isSectorHead || isViceMinister || isSubSectorHead || isGeneralManager && USERlistkey == 'sos') {
          AccessQuery = SectorHeadQuery
          debugger
        } else {
          AccessQuery =
            "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
        }

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
        if (USERlistkey == 'milestones') { // to arrange the data in milestone depends on  planned date
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
      User_isClosureStatus &&
      (USERlistkey == "projects" || USERProjRelated.indexOf(USERlistkey) > -1)
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
  init: function () { //mahmoud
    // var listName = '';
    // if (isDU && USERisListing) {
    //debugger
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

    if (isSectionHead || isPortfolioManager || isSectorHead || isSPMO || isGeneralManager || isSubSectorHead || isDU || isMinisterAssistant || isViceMinister) {
      camlQuery.set_viewXml(SectorHeadQuery);

    } else if (isAdmin || isMinister || isITSteering || isEPMO) { // to can see everything
      camlQuery.set_viewXml(
        "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></View>"
      );
    } else if (isStrategySpecialist) {
      camlQuery.set_viewXml(StrategyProjectQuery);
    } else if (isPManager || isInManager) {
      camlQuery.set_viewXml(
        "<View><Query><Where>" +
        "<And>" +
        "<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
        '<Eq><FieldRef Name="ProjectManager" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>' +
        "</And>" +
        "</Where></Query></View>"
      );
    } else if (isPOwner || isInOwner) {
      camlQuery.set_viewXml(
        "<View><Query><Where>" +
        "<And>" +
        "<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
        '<Eq><FieldRef Name="ProjectOwner" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>' +
        "</And>" +
        "</Where></Query></View>"
      );
    } else if (isPSponsor) {
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
    }
    console.log(camlQuery, 'cammmmlll');
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
        $(".navbar .user-name").text(UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join(""));
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
              '<span class="tooltiptext">' + USERPName + '</span>' + // to handle the tooltip
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
              '<span class="tooltiptext">' + USERPName + '</span>' + // to handle the tooltip
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
          } else if (USERlistkey == 'documents') {
            if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
              USERPageTitle = 'مستندات المبادرة'
            } else {
              USERPageTitle = 'Initiative Documents'
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
        } else {
          if (!isInitiativesHomePage && !isTarget && !isMainIndicator) {
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
          } else if (isTarget || isMainIndicator) {
            $(".page-title").html(`<span style="color:#fff">${USERPageTitle}</span>`)
            $(".firsttitle").hide();

          }

        }
      }
    },
  },
};

//getting Related Initiatives
var Access_Initiative_Info_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Access_Initiative_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      if (UserICode == oListItem.get_item("Title")) {
        USERIName = oListItem.get_item("Name")
          ? oListItem.get_item("Name")
          : UserNo_Data;

        USERINID = oListItem.get_id();
      }

      Access_Initiative_Info_Request.g.User_Initiatives.push(
        oListItem.get_item("Title")
      );
      userProjects.push(oListItem.get_item("Title")); // add to show the data in listing like risk
    }
    //////////// initiative breadCrumbs
    window.checkBreadCrumbsStatusHtml = setInterval(function () {
      Access_Initiative_Info_Request.g.handleBreadcrumbs();
    }, 333);
    ///////////

    var fieldtoquery,
      fieldtoquery = "Title";


    if (Access_Initiative_Info_Request.g.User_Initiatives.length > 0) {
      var PermissionQuery =
        "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"" +
        fieldtoquery +
        '" /><Values>';
    }

    forFilterQueryInitiative =
      '<div style="display:none!important;height:0px!important" class="dropdown "><a href="#" class="dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button">ForQueryAccess</a><div class="dropdown-menu">';



    if (!istherePCODE) {
      // check user projects
      for (
        var u = 0;
        u < Access_Initiative_Info_Request.g.User_Initiatives.length;
        u++ //build query based on user projects
      ) {
        PermissionQuery +=
          '<Value Type="Text">' +
          Access_Initiative_Info_Request.g.User_Initiatives[u] +
          "</Value>";

        forFilterQueryInitiative +=
          '<label class="dropdown-item">' +
          Access_Initiative_Info_Request.g.User_Initiatives[u] +
          '<input data-type="Text" data-internal="' +
          fieldtoquery +
          '" type="checkbox" name="' +
          fieldtoquery +
          '" value="' +
          Access_Initiative_Info_Request.g.User_Initiatives[u] +
          '" checked></label>';
        if (u == Access_Initiative_Info_Request.g.User_Initiatives.length - 1) {
          PermissionQuery +=
            "</Values></In></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
          forFilterQueryInitiative += "</div></div>";


          InitiativeAccessQuery = PermissionQuery

          if (isInitiativesHomePage) {
            checkHomeInitiativeStatus = setInterval(function () {
              initiativeRequest.preinit();
            }, 1000);
          } else if (USERisListing && !isfileListing) { // to get the project related to user
            if (USERlistkey == 'initiatives') {
              AccessQuery = PermissionQuery
              console.log("ODYES")
              //debugger
              window.checkListingStatusHtml = setInterval(function () {
                ListingData.preinit();
              }, 1000);
            } else {
              Access_Project_Info_Request.preinit()
            }
          }
        }
      }

      if (Access_Initiative_Info_Request.g.User_Initiatives.length == 0) {
        var noDataQuery = ''
        var fieldNameRef = ''
        if (isInOwner) {
          fieldNameRef = 'InitiativeOwner'
        } else if (isInManager) {
          fieldNameRef = 'InitiativePM'
        }
        noDataQuery =
          "<View><Query><Where>" +
          "<And>" +
          "<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
          '<Eq><FieldRef Name="' + fieldNameRef + '" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>' +
          "</And>" +
          "</Where></Query></View>"

        InitiativeAccessQuery = noDataQuery
        if (isInitiativesHomePage) {
          checkHomeInitiativeStatus = setInterval(function () {
            initiativeRequest.preinit();
          }, 1000);
        } else if (USERisListing && !isfileListing) { // to get the project related to user
          if (USERlistkey == 'initiatives') {
            AccessQuery = noDataQuery
            console.log("ODYES")
            //debugger
            window.checkListingStatusHtml = setInterval(function () {
              ListingData.preinit();
            }, 1000);
          } else {
            Access_Project_Info_Request.preinit()
          }
        }
      }

    } else {
      Access_Project_Info_Request.preinit()

    }

    // ListingData.preinit();

    // Access_Project_Info_Request.preinit()
  },
  onError: function (sender, args) {
    //
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  preinit: function () {
    SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
      Access_Initiative_Info_Request.init();
    });
  },
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Initiatives');
    var camlQuery = new SP.CamlQuery();
    //

    if (isInManager) {
      camlQuery.set_viewXml(
        "<View><Query><Where>" +
        "<And>" +
        "<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
        '<Eq><FieldRef Name="InitiativePM" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>' +
        "</And>" +
        "</Where></Query></View>"
      );
    }
    else if (isInOwner) {
      camlQuery.set_viewXml(
        "<View><Query><Where>" +
        "<And>" +
        "<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
        '<Eq><FieldRef Name="InitiativeOwner" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>' +
        "</And>" +
        "</Where></Query></View>"
      );
    }

    Access_Initiative_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Access_Initiative_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Access_Initiative_Info_Request.onSuccess),
      Function.createDelegate(this, Access_Initiative_Info_Request.onError)
    );
  },
  g: {
    PCODE: istherePCODE
      ? window.location.href.split("PCODE=")[1].split("&")[0]
      : "",
    User_Initiatives: [],
    handleBreadcrumbs: function () {
      if ($(".page-title").length) {
        clearInterval(checkBreadCrumbsStatusHtml);
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
              '<span class="tooltiptext">' + USERPName + '</span>' + // to handle the tooltip
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
              USERIName +
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
          } else if (USERlistkey == 'documents') {
            if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
              USERPageTitle = 'مستندات المبادرة'
            } else {
              USERPageTitle = 'Initiative Documents'
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

            $(".page-title").html(
              '<a href="' +
              _spPageContextInfo.webAbsoluteUrl +
              "/sitepages/InitiativeHome.aspx?ICODE=" +
              UserICode +
              '">' +
              USERIName +
              "</a>"
            );
            if (USERlistkey == 'initiativecards') {
              // &IID
              if ((window.location.href.indexOf('IID') > -1)) {
                var initCardId = window.location.href.split('IID=')[1].split('&')[0]

                $(".title-item:first-child").html(
                  '<a href="' +
                  _spPageContextInfo.webAbsoluteUrl +
                  "/sitepages/view.aspx?ListKey=" +
                  USERlistkey +
                  "&IID=" +
                  initCardId +
                  "&ICODE=" +
                  UserICode +
                  '">' +
                  USERPageTitle +
                  ""
                );

              }
            } else {
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
        } else {
          if (!isInitiativesHomePage) {
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
          }
        }
      }
    }

  }
}
//

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
    if (isGeneralManager || isSubSectorHead || isSectorHead) {
      console.log(UserAccessSectorCode)
      debugger
      var subsectorname, substorcode;
      if (localStorage.getItem('Dynamo_Internal Entities') != null) {
        subsectorArray = JSON.parse(localStorage.getItem("Dynamo_Internal Entities") || "[]");
        subsectorArray = subsectorArray.filter(function (a) {

          return a.code == UserAccessSectorCode


        });

        if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
          debugger
          // subsectorname = subsectorArray.length ? subsectorArray[0].name : '';
          ar_UserRole += subsectorArray[0].name

          $(".page-title").html(ar_UserRole);

        } else {
          //   subsectorname = subsectorArray.length ? subsectorArray[0].nameEn : '';
          en_UserRole += subsectorArray[0].nameEn
          $(".page-title").html(en_UserRole)
        };
        //   substorcode = subsectorArray.length ? subsectorArray[0].code : '';
      }
    }
    // if target 
    // if (isTarget){
    //   debugger
    //   window.checkTargetStatusHtml = setInterval(function () {
    //     MainKPIs_Info_Request.preinit();
    //   }, 333); //initiate the call
    // }

    //if there is any data
    if (Access_Sector_Info_Request.g.User_Sectors.length == 0) {

      SectorHeadQuery = "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query><RowLimit>0</RowLimit></View>"
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
    //debugger
    // console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmm')
    var clientContext = new SP.ClientContext.get_current();

    var oList = clientContext.get_web().get_lists().getByTitle(SecondLevel_List);
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
    // console.log('query', IssueQuery);
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
    //console.log(UProjects.length);
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
    $("span.Rsupprot").text(UserNTasks + NRisks + NIssues + NNotifications);

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
          tasktitle = tasktitlearr[0].name;
        } else tasktitle = tasktitlearr[0].nameEn;
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
        if (mycount <= 10) {
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
        }
      } else {
        mycount++;
        if (mycount <= 10) {
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
        }
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
            rurl.toLowerCase().indexOf("pcode") > -1 &&
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
          if (wfname == "InitiativeSample") {
            keyNameParams = "initiativesample";
          }
          if (wfname == "Idea") {
            keyNameParams = "ideas";
          } else if (wfname == "مهمة") {
            keyNameParams = "tasks";
          } else if (wfname == "DV") {
            keyNameParams = "deliverables";
          } else if (wfname == "CR") {
            keyNameParams = "changerequest";
          } else if (wfname == "Issue") {
            keyNameParams = "issues";
          } else if (wfname == "Risk") {
            keyNameParams = "risks";
          } else if (wfname == "تصعيد مهمة") {
            keyNameParams = "tasks";
          } else if (wfname == "MoM") {
            keyNameParams = "mom";
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
                "/sitepages/edit.aspx?ListKey=" +
                keyNameParams +
                "&IID=" +
                ritemid +
                "&WFs",
                "_self"
              );
              break;
            default:
              if (
                wfname == "تصعيد مهمة" ||
                wfname == "تصعيد خطر" ||
                wfname == "تصعيد تحدي"
              ) {
                window.open(
                  _spPageContextInfo.webAbsoluteUrl +
                  "/sitepages/view.aspx?ListKey=" +
                  keyNameParams +
                  "&IID=" +
                  sourceitemid +
                  "&RID=" +
                  ritemid +
                  "&WFEs",
                  "_self"
                );
              } else if (wfname == "InitiativeSample") {
                window.open(
                  _spPageContextInfo.webAbsoluteUrl +
                  "/sitepages/view.aspx?ListKey=" +
                  keyNameParams +
                  "&IID=" +
                  ritemid + "&ICODE=" + icode +
                  "&WFs",
                  "_self"
                );
              } else {
                window.open(
                  _spPageContextInfo.webAbsoluteUrl +
                  "/sitepages/view.aspx?ListKey=" +
                  keyNameParams +
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
    if (document.getElementById("navcheckboxId").checked) {
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


if (istherePCODE || isthereICODE) {
} else {
  $('body').append('<style>.page-nav{display:none}<style/>')
}



// remove the userRole from local storage and redirect to SignOut 
function logOutHandler() {
  localStorage.removeItem("userRole")
  window.location = _spPageContextInfo.siteAbsoluteUrl + '/_layouts/15/SignOut.aspx'

}


//getting Related Initiatives Title
var GetInitiativeTitle_Request = {
  onSuccess: function (sender, args) {
    var collListItem = GetInitiativeTitle_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      debugger;
      var oListItem = listItemEnum.get_current();
      InitiativeTitle = oListItem.get_item("Name") ? oListItem.get_item("Name") : UserNo_Data;
      console.log('titleinti', InitiativeTitle)
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
    var oList = clientContext.get_web().get_lists().getByTitle('Initiatives');
    var camlQuery = new SP.CamlQuery();
    debugger;
    camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' + UserICode + '</Value></Eq></Where></Query></View>');
    GetInitiativeTitle_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(GetInitiativeTitle_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, GetInitiativeTitle_Request.onSuccess),
      Function.createDelegate(this, GetInitiativeTitle_Request.onError)
    );
  },
  g: {
  }
}
//