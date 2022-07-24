console.log("Update Project Center  Edit Access")
var allProjectArr = [], allResourcesArr = [];

var projects;
var projContext;
var projectGuid;
var projectManagerPicker = '',
  ProjectOwnerPicker = '',
  ProjectSponsorPicker = '',
  ProjectDirectorUnit = '',
  ProjectObjectiveOwner = '',
  ProjectQualityOfficer = '',
  ProjectResponsible = '';

var buildTeamResourcesArr = []
var enternameemail = "Enter Project Manager Name"

var pageTitle = ''

var checkStatusHtml = setInterval(function () {
  BuildHtmlElements.preinit();
}, 777);


var BuildHtmlElements = {
  preinit: function () {
    if ($(".container-body").length) {
      //username
      if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
        pageTitle = 'التعديل على الجدول الزمني'
      } else {
        pageTitle = 'Change on Project Schedual'
      }

      document.title = pageTitle

      $(".page-title").html(
        '<a href="/">' + pageTitle + ""
      );

      clearInterval(checkStatusHtml);


      Get_All_Projects.init()
      // BuildHtmlElements.InfoLoop();

    }
  },
  // InfoLoop: function () {

  //   var htmlBuilder = `
  //   <div class="col-md-6 CFIELD ">
  //     <label for='ProjectName'>المشروع</label>
  //     <select type="dropdown" class="form-control SPIField" id="ProjectName" placeholder="المشروع">
  //     </select>
  //   </div>
  //   `

  //   $(".container-body").html(htmlBuilder);

  // }
}


var Get_All_Projects = {
  onSuccess: function (sender, args) {
    var collListItem = Get_All_Projects.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      allProjectArr.push({ name: oListItem.get_item("Name"), value: oListItem.get_item("Title") })

    }

    Get_All_Projects.Build()
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Projects');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query><OrderBy><FieldRef Name=\'Title\' Ascending=\'False\' /></OrderBy></Query></View>");
    Get_All_Projects.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Get_All_Projects.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Get_All_Projects.onSuccess),
      Function.createDelegate(this, Get_All_Projects.onError)
    );
  },

  Build: function () {
    var htmlBody = `
     <div class="col-md-6 CFIELD ">
     <input type="text" class="serchBox" placeholder="الرجاء البحث باسم المشروع"/>
      <label for='ProjectName'>المشروع</label>
      <select type="dropdown" class="form-control SPIField dropdownselect" id="ProjectName" placeholder="المشروع">
    `

    allProjectArr.forEach(el => {

      htmlBody += '<option class="dropdown-item"  value="' + el.value + '">' + el.name + '</option>'

    })
    // var htmlBody = ''

    // var FilterationcontractsHTML = '<select>'

    // allProjectArr.forEach(el => {
    //   FilterationcontractsHTML += '<option class="dropdown-item"  value="' + el.value + '">' + el.name + '</option>'
    // })

    // FilterationcontractsHTML += '</select>'

    // htmlBody += '<div class="dropdown mx-3">' +
    //   '<a href="#" data-trans-Filter class="dropdown-toggle fnt-14 w-1 black Resources" data-toggle="dropdown" role="button"  ' + 0 + '" resource-done="true" aria-expanded="false">' + 'اسم المشروع' + '</a>' +
    //   '<div class="dropdown-menu Filter-' + 0 + '" style="max-height:540px;overflow-y:auto">' +
    //   '<label class="main-action-filter">' +
    //   '<input class="filterSearch" type="text" placeholder="بحث">' +
    //   '</label>' + FilterationcontractsHTML + '</div></div>'



    htmlBody += '</select></div>'
    // htmlBody+= `<input type='text' value='Seleted option' id='but_read'></div>`

    htmlBody += '<div class="col-md-6 CFIELD">' +
      '<label for="ProjectOwner">مالك المشروع</label>' +
      // '<div class="PPField SPIField form-control" type="text" id="ProjectManager" value="" placeholder="اسم مدير المشروع"></div>' +
      '<input type="text" placeholder="اسم مالك المشروع" class="form-control SPIField" id="ProjectOwner" disabled=true/>' +
      '</div>';

    htmlBody += '<div class="col-md-6 CFIELD">' +
      '<label for="ProjectManager">مدير المشروع</label>' +
      // '<div class="PPField SPIField form-control" type="text" id="ProjectManager" value="" placeholder="اسم مدير المشروع"></div>' +
      '<input type="text" placeholder="اسم مدير المشروع" class="form-control SPIField" id="ProjectManager" disabled=true/>' +
      '</div>';

    htmlBody += '<div class="col-md-6 CFIELD">' +
      '<label for="ProjectSponsor">راعي المشروع</label>' +
      // '<div class="PPField SPIField form-control" type="text" id="ProjectManager" value="" placeholder="اسم مدير المشروع"></div>' +
      '<input type="text" placeholder="راعي المشروع" class="form-control SPIField" id="ProjectSponsor" disabled=true/>' +
      '</div>';

    htmlBody += '<div class="col-md-6 CFIELD">' +
      '<label for="DirectorUnit">مدير وحدة الانجاز</label>' +
      // '<div class="PPField SPIField form-control" type="text" id="ProjectManager" value="" placeholder="اسم مدير المشروع"></div>' +
      '<input type="text" placeholder="مدير وحدة الانجاز" class="form-control SPIField" id="DirectorUnit" disabled=true/>' +
      '</div>';


    htmlBody += '<div class="col-md-6 CFIELD">' +
      '<label for="ObjectiveOwner">مالك الهدف</label>' +
      // '<div class="PPField SPIField form-control" type="text" id="ProjectManager" value="" placeholder="اسم مدير المشروع"></div>' +
      '<input type="text" placeholder="مالك الهدف" class="form-control SPIField" id="ObjectiveOwner" disabled=true/>' +
      '</div>';


    htmlBody += '<div class="col-md-6 CFIELD">' +
      '<label for="QualityOfficer">ضابط الجودة</label>' +
      // '<div class="PPField SPIField form-control" type="text" id="ProjectManager" value="" placeholder="اسم مدير المشروع"></div>' +
      '<input type="text" placeholder="ضابط الجودة" class="form-control SPIField" id="QualityOfficer" disabled=true/>' +
      '</div>';

    htmlBody += '<div class="col-md-6 CFIELD">' +
      '<label for="ProjectResponsible">مسؤول عن المشروع</label>' +
      // '<div class="PPField SPIField form-control" type="text" id="ProjectManager" value="" placeholder="اسم مدير المشروع"></div>' +
      '<input type="text" placeholder="مسؤول عن المشروع" class="form-control SPIField" id="ProjectResponsible" disabled=true/>' +
      '</div>';





    htmlBody +=
      '<div class="py-5 btnactionrow savecancelBtns">' +
      '<div class="form-row justify-content-end form-btns-wrapper">' +
      '<button data-trans-SaveButton class="btn btn-action btn-edit-project-center Resources" type="button"></button>' +
      "</div>" +
      "</div>";

    $(".container-body").html(htmlBody);

    changeResources();

    // $("div[type=picker]").each(function () {
    //   var mp = new MyPeoplePicker();
    //   mp.init($(this).attr("id"), {
    //     PrincipalAccountType: "User",
    //     AllowMultipleValues: false,
    //   });
    // });

    $("#ProjectName").on("change", function () {
      console.log("YEEEEEEEEEEEEEES")
      var ProjectCode = $('#ProjectName').val()
      getProjectInfo(ProjectCode)
    })

    $("body").on('keyup', '.serchBox', function (e) {
      var value = $(this).val().toLowerCase();

      $(".dropdown-item").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    })






  },
  g: {}
}


function getProjectInfo(ProjectCode) {
  var context = SP.ClientContext.get_current();
  var dfd = $.Deferred();
  //Get list from host web
  var programList = context.get_web().get_lists().getByTitle('Projects');
  var camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name=\'Title\'/><Value Type=\'Text\'>" + ProjectCode + "</Value></Eq></Where></Query></View>");
  //Get items by Query
  var progColl = programList.getItems(camlQuery);
  //Load item collection
  context.load(progColl);
  context.executeQueryAsync(function () {
    var currentItemArray = [];
    if (progColl.get_count() > 0) {
      var progEnum = progColl.getEnumerator();
      while (progEnum.moveNext()) {
        var currentItem = progEnum.get_current();
        ProjectOwnerPicker = currentItem.get_item("ProjectOwner") ? currentItem.get_item("ProjectOwner") : ''
        projectManagerPicker = currentItem.get_item("ProjectManager") ? currentItem.get_item("ProjectManager") : ''
        ProjectSponsorPicker = currentItem.get_item("ProjectSponsor") ? currentItem.get_item("ProjectSponsor") : ''
        ProjectDirectorUnit = currentItem.get_item("DirectorUnit") ? currentItem.get_item("DirectorUnit") : ''
        ProjectObjectiveOwner = currentItem.get_item("ObjectiveOwner") ? currentItem.get_item("ObjectiveOwner") : ''
        ProjectResponsible = currentItem.get_item("ProjectResponsible") ? currentItem.get_item("ProjectResponsible") : ''
        ProjectQualityOfficer = currentItem.get_item("QualityOfficer") ? currentItem.get_item("QualityOfficer") : ''

        // ProjectQualityOfficer = currentItem.get_item("QualityOfficer") ? currentItem.get_item("QualityOfficer") : ''

        // ProjectResponsible = currentItem.get_item("ProjectResponsible") ? currentItem.get_item("ProjectResponsible") : ''
        // console.log(ProjectDirectorUnit, "ProjectDirectorUnit")
        // console.log(ProjectResponsible, "ProjectResponsible")
        // debugger
        projectGuid = currentItem.get_item("ProjectGUID") ? currentItem.get_item("ProjectGUID") : ''
      }
      if (ProjectOwnerPicker) {
        buildTeamResourcesArr.push(ProjectOwnerPicker.get_lookupValue())
      }
      if (ProjectSponsorPicker) {
        buildTeamResourcesArr.push(ProjectSponsorPicker.get_lookupValue())
      }
      if (ProjectDirectorUnit) {
        buildTeamResourcesArr.push(ProjectDirectorUnit.get_lookupValue())
      }

      if (ProjectObjectiveOwner) {
        buildTeamResourcesArr.push(ProjectObjectiveOwner.get_lookupValue())
      }

      if (ProjectResponsible) {
        buildTeamResourcesArr.push(ProjectResponsible.get_lookupValue())
      }

      if (ProjectQualityOfficer) {
        buildTeamResourcesArr.push(ProjectQualityOfficer.get_lookupValue())
      }

      // if(ProjectQualityOfficer){
      //   buildTeamResourcesArr.push(ProjectQualityOfficer.get_lookupValue())
      // }

      ProjectOwnerPicker ? $('#ProjectOwner').val(ProjectOwnerPicker.get_lookupValue()) : ''
      projectManagerPicker ? $('#ProjectManager').val(projectManagerPicker.get_lookupValue()) : ''
      ProjectSponsorPicker ? $('#ProjectSponsor').val(ProjectSponsorPicker.get_lookupValue()) : ''
      ProjectDirectorUnit ? $('#DirectorUnit').val(ProjectDirectorUnit.get_lookupValue()) : ''
      ProjectObjectiveOwner ? $('#ObjectiveOwner').val(ProjectObjectiveOwner.get_lookupValue()) : ''
      ProjectQualityOfficer ? $('#QualityOfficer').val(ProjectQualityOfficer.get_lookupValue()) : ''
      ProjectResponsible ? $('#ProjectResponsible').val(ProjectResponsible.get_lookupValue()) : ''

      context.executeQueryAsync(function () {

        $("button.btn-edit-project-center").on("click", function () {
          $('.btn-edit-project-center').attr("disabled", true);

          updateProjectCenter.get_AllResourcesToBuildTeam()
        })
      }, function (sender, args) {
        //Item updated fail
        console.log("Request Failed to get projectlist Items :" + args.get_message());
      })
    }
  })
}

var updateProjectCenter = {
  get_AllResourcesToBuildTeam: function () {
    $.ajax({
      url: _spPageContextInfo.webAbsoluteUrl + "/_api/ProjectServer/EnterpriseResources",
      method: "GET",
      headers: { "Accept": "application/json; odata=verbose" },
      success: function (data) {
        allResourcesArr = data.d.results
        console.log(allResourcesArr, "allResourcesArr allResourcesArr allResourcesArr")
        SP.SOD.registerSod('PS.ProjectContext', SP.Utilities.Utility.getLayoutsPageUrl('ps.js'));
        SP.SOD.loadMultiple(['PS.ProjectContext'], GetProjectsToUpdate);
        // SP.SOD.loadMultiple(['PS.ProjectContext'], ChangeProjectEdit);

      }
    });
  },
}


function ChangeProjectEdit() {
  //
  var draftProject;
  var project = projects.getById(projectGuid);
  draftProject = project.checkOut();

  for (var i = 0; i < buildTeamResourcesArr.length; i++) {
    allResourcesArr.forEach((el) => {
      debugger
      if (buildTeamResourcesArr[i] == el.Name) {

        var new_resource_id = el.Id;
        var new_resource = new PS.ProjectResourceCreationInformation();
        new_resource.set_name(buildTeamResourcesArr[i]);
        new_resource.set_id(new_resource_id);
        var project_resources_list = draftProject.get_projectResources();
        var project_resource = project_resources_list.add(new_resource);
        draftProject.get_projectResources().add(new_resource);
      }

    });

  }
  var publishJob = draftProject.update();
  projContext.waitForQueueAsync(publishJob, 100, ChangeProjectOwnerCenter);
}

// Get the projects collection.
function GetProjectsToUpdate() {
  projContext = PS.ProjectContext.get_current();
  projects = projContext.get_projects();
  projContext.load(projects, 'Include(Name, Id)'); //, Description, StartDate, Id, Owner
  // projContext.executeQueryAsync(ChangeProjectOwnerCenter, QueryFailedCenter);
  projContext.executeQueryAsync(ChangeProjectEdit, QueryFailedCenter);

}

function QueryFailedCenter(sender, args) {
  console.log('Request failed: ' + args.get_message());
}

function ChangeProjectOwnerCenter() {
  var project = projects.getById(projectGuid);
  var draftProject = project.checkOut();
  var web = projContext.get_web()
  var projectManagerId = projectManagerPicker.get_lookupId()
  var userPicked = web.getUserById(projectManagerId) //76

  // console.log(web.getUserById('14'),"14")
  // console.log(web.getUserById('76'),"76")

  draftProject.set_owner(userPicked)
  var publishJob = draftProject.publish(true);
  $('.wfLoader').hide();

  projContext.waitForQueueAsync(publishJob, 100, QueueJobSentOwnerCenter);
}

function QueueJobSentOwnerCenter(response) {
  const myTimeout = setTimeout(function () {
    location.reload();
  }, 3000);

}





$('div#particles-foreground, div#particles-background, .vertical-centered-box').animate({
  opacity: 0
}, {
  duration: 333,
  complete: function () {
    $('div#particles-foreground, div#particles-background, .vertical-centered-box').remove();

  }
});


