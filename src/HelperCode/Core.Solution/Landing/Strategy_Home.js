$(
    'div#particles-foreground, div#particles-background, .vertical-centered-box'
  ).animate(
    {
      opacity: 0,
    },
    {
      duration: 333,
      complete: function () {
        $(
          'div#particles-foreground, div#particles-background, .vertical-centered-box'
        ).remove();
      },
    }
  );
  
  if (
    localStorage.getItem('lng') == null ||
    localStorage.getItem('lng') == 'ar'
  ) {
    var No_Data = 'لا يوجد';
  } else {
    var No_Data = 'No Data';
  }
  
  //to call strategy by code
  // var InternalEntities_Info_Request = {
  //   // The main Initialization function
  //   preinit: function () {
  //     clearInterval(strategyHomeHtml);
  //     SP.SOD.registerSod(
  //       "PS.ProjectContext",
  //       SP.Utilities.Utility.getLayoutsPageUrl("ps.js")
  //     );
  //     SP.SOD.loadMultiple(
  //       ["PS.ProjectContext"],
  //       InternalEntities_Info_Request.init
  //     );
  //   },
  //   init: function () {
  //     var urlParams = new URLSearchParams(window.location.search);
  //     var code = urlParams.get("code");
  
  //     var clientContext = SP.ClientContext.get_current();
  //     var oList;
  //     try {
  //       oList = clientContext.get_web().get_lists().getByTitle("Strategies");
  //     } catch (error) {
  //       console.error("List not found:", code);
  //       return;
  //     }
  //     var camlQuery = new SP.CamlQuery();
  //     camlQuery.set_viewXml(
  //       "<View>" +
  //         "<Query>" +
  //         "<Where>" +
  //         "<And>" +
  //         "<Neq>" +
  //         "<FieldRef Name='DeletionStatus' />" +
  //         "<Value Type='Text'>Deleted</Value>" +
  //         "</Neq>" +
  //         "<Eq>" +
  //         "<FieldRef Name='Title' />" +
  //         "<Value Type='Text'>" +
  //         code +
  //         "</Value>" + // Use 'code' from the URL
  //         "</Eq>" +
  //         "</And>" +
  //         "</Where>" +
  //         "<OrderBy>" +
  //         "<FieldRef Name='Modified' Ascending='False' />" +
  //         "</OrderBy>" +
  //         "</Query>" +
  //         "</View>"
  //     );
  
  //     InternalEntities_Info_Request.g.collListItem = oList.getItems(camlQuery); // Declared inside object scope only
  //     clientContext.load(InternalEntities_Info_Request.g.collListItem);
  //     clientContext.executeQueryAsync(
  //       Function.createDelegate(this, InternalEntities_Info_Request.onSuccess),
  //       Function.createDelegate(this, InternalEntities_Info_Request.onError)
  //     );
  //   },
  
  //   onSuccess: function (sender, args) {
  //     var collListItem = InternalEntities_Info_Request.g.collListItem;
  //     var listItemEnum = collListItem.getEnumerator();
  //     while (listItemEnum.moveNext()) {
  //       var oListItem = listItemEnum.get_current();
  //       strategyHomeTitle = oListItem.get_item("Name") || No_Data;
  //       $(".visionDesc").html(
  //         oListItem.get_item("Vision") ? oListItem.get_item("Vision") : No_Data
  //       );
  //       $(".messageDesc").html(
  //         oListItem.get_item("Mission") ? oListItem.get_item("Mission") : No_Data
  //       );
  //       $(".valuesDesc").html(
  //         oListItem.get_item("Value") ? oListItem.get_item("Value") : No_Data
  //       );
  //       $(".objectivesDesc").html(
  //         oListItem.get_item("Goals") ? oListItem.get_item("Goals") : No_Data
  //       );
  //       console.log(oListItem.get_item("Name"));
  //     }
  
  //     // breadcrumb
  //     $(".page-title").html(
  //       '<a href="' +
  //         _spPageContextInfo.webAbsoluteUrl +
  //         "/sitepages/strategyHome.aspx?code=" +
  //         code +
  //         '">' +
  //         "<span >" +
  //         strategyHomeTitle
  //         ? strategyHomeTitle
  //         : No_Data + "</span>" + '<span class="tooltiptext">' + strategyHomeTitle
  //         ? strategyHomeTitle
  //         : No_Data +
  //           "</span>" + // to handle the tooltip
  //           "</a>"
  //     );
  
  //     // Update the DOM elements with data-sector attribute
  //     $("[data-sector]").each(function () {
  //       var dataSector = $(this).attr("data-sector");
  //       var displayed = InternalEntities_Array.filter(function (v) {
  //         return v.code === dataSector;
  //       });
  
  //       // Remove the error from console
  //       if (displayed[0]) {
  //         $(this).text(displayed[0].name);
  //       } else {
  //         $(this).text("┘ä╪º ┘è┘ê╪¼╪»");
  //       }
  //     });
  //   },
  
  //   onError: function (sender, args) {
  //     console.error(
  //       "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
  //     );
  //   },
  //   g: {},
  // };
  
  //to call All Projects by code
  // var InternalEntitiesAllProjects_Info_Request = {
  //   // The main Initialization function
  //   preinit: function () {
  //     clearInterval(AllProjectsHtml);
  //     SP.SOD.registerSod(
  //       "PS.ProjectContext",
  //       SP.Utilities.Utility.getLayoutsPageUrl("ps.js")
  //     );
  //     SP.SOD.loadMultiple(
  //       ["PS.ProjectContext"],
  //       InternalEntitiesAllProjects_Info_Request.init
  //     );
  //   },
  //   init: function () {
  //     var urlParams = new URLSearchParams(window.location.search);
  //     var code = urlParams.get("code");
  
  //     var clientContext = SP.ClientContext.get_current();
  //     var oList;
  //     try {
  //       oList = clientContext.get_web().get_lists().getByTitle("Objectives");
  //     } catch (error) {
  //       console.error("List not found:", listKey);
  //       return;
  //     }
  //     var camlQuery = new SP.CamlQuery();
  //     camlQuery.set_viewXml(
  //       "<View>" +
  //         "<Query>" +
  //         "<Where>" +
  //         "<And>" +
  //         "<Neq>" +
  //         "<FieldRef Name='DeletionStatus' />" +
  //         "<Value Type='Text'>Deleted</Value>" +
  //         "</Neq>" +
  //         "<Eq>" +
  //         "<FieldRef Name='RelatedStrategy' />" + // Use 'RelatedStrategy' instead of 'Code'
  //         "<Value Type='Text'>" +
  //         code +
  //         "</Value>" + // Use 'code' from the URL
  //         "</Eq>" +
  //         "</And>" +
  //         "</Where>" +
  //         "<OrderBy>" +
  //         "<FieldRef Name='Modified' Ascending='False' />" +
  //         "</OrderBy>" +
  //         "</Query>" +
  //         "</View>"
  //     );
  
  //     InternalEntitiesAllProjects_Info_Request.g.collListItem =
  //       oList.getItems(camlQuery); // Declared inside object scope only
  //     clientContext.load(InternalEntitiesAllProjects_Info_Request.g.collListItem);
  //     clientContext.executeQueryAsync(
  //       Function.createDelegate(
  //         this,
  //         InternalEntitiesAllProjects_Info_Request.onSuccess
  //       ),
  //       Function.createDelegate(
  //         this,
  //         InternalEntitiesAllProjects_Info_Request.onError
  //       )
  //     );
  //   },
  
  //   onSuccess: function (sender, args) {
  //     var collListItem = InternalEntitiesAllProjects_Info_Request.g.collListItem;
  //     var listItemEnum = collListItem.getEnumerator();
  //     var projectList = [];
  //     while (listItemEnum.moveNext()) {
  //       var oListItem = listItemEnum.get_current();
  //       var title = oListItem.get_item("Name");
  //       var description = oListItem.get_item("Description");
  //       projectList.push({ title: title, description: description });
  //     }
  //     // Call the function to add the carousel
  //     addCarousel(projectList, "#objectives");
  
  //     // Update the DOM elements with data-sector attribute
  //     $("[data-sector]").each(function () {
  //       var dataSector = $(this).attr("data-sector");
  //       var displayed = InternalEntities_Array.filter(function (v) {
  //         return v.code === dataSector;
  //       });
  //       // Remove the error from console
  //       if (displayed[0]) {
  //         $(this).text(displayed[0].name);
  //       } else {
  //         $(this).text("┘ä╪º ┘è┘ê╪¼╪»");
  //       }
  //     });
  //   },
  
  //   onError: function (sender, args) {
  //     console.error(
  //       "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
  //     );
  //   },
  //   g: {},
  // };
  
  //call Kpis
  // function kpisRequest() {
  //   var kpisList = [
  //     {
  //       title: "┘å╪│╪¿╪⌐ ╪º┘ä┘à┘å╪¼╪▓ ┘à┘å ┘ê╪½┘è┘é╪⌐ ╪º┘ä╪¬╪¡┘ä┘è┘ä",
  //       description:
  //         "╪¬╪¡╪│┘è┘å ┘à╪│╪¬┘à╪▒ ┘ü┘è ╪▒╪╢╪º ╪º┘ä┘à┘ê╪╕┘ü┘è┘å ┘ê╪╡┘ê┘ä╪º┘ï ┘ä┘å╪│╪¿╪⌐ ┘ä╪º ╪¬┘é┘ä ╪╣┘å 85%    ┘à╪╣ ╪¡┘ä┘ê┘ä ╪╣╪º┘à 2030┘à.",
  //     },
  //     {
  //       title: "┘å╪│╪¿╪⌐ ╪º┘ä╪¬┘é╪»┘à ┘ü┘è ╪º┘å╪¼╪º╪▓ ╪º┘ä┘ê╪½┘è┘é╪⌐",
  //       description:
  //         "╪¬╪¡┘é┘è┘é ┘å╪│╪¿╪⌐ ┘ä╪º ╪¬┘é┘ä ╪╣┘å 85% ╪│┘å┘ê┘è╪º┘ï ┘ä╪▒╪╢╪º ┘à╪¬┘ä┘é┘è ╪º┘ä╪«╪»┘à╪⌐ ┘ê╪º┘ä┘à╪¬╪╣╪º┘à┘ä┘è┘å ╪╣┘å ╪º┘ä╪«╪»┘à╪º╪¬ ╪º┘ä┘à┘é╪»┘à╪⌐ ┘à┘å ╪º┘ä┘ç┘è╪ª╪⌐.",
  //     },
  //     {
  //       title: "╪╣╪»╪» ╪º┘ä╪«╪»┘à╪º╪¬ ╪º┘ä┘à╪¡╪│┘å╪⌐",
  //       description:
  //         "╪¬╪¡┘é┘è┘é ┘å╪│╪¿╪⌐ ┘ä╪º ╪¬┘é┘ä ╪╣┘å 85% ╪│┘å┘ê┘è╪º┘ï ┘ä╪▒╪╢╪º ┘à╪¬┘ä┘é┘è ╪º┘ä╪«╪»┘à╪⌐ ┘ê╪º┘ä┘à╪¬╪╣╪º┘à┘ä┘è┘å ╪╣┘å ╪º┘ä╪«╪»┘à╪º╪¬ ╪º┘ä┘à┘é╪»┘à╪⌐ ┘à┘å ╪º┘ä┘ç┘è╪ª╪⌐.",
  //     },
  //     {
  //       title: "╪╣╪»╪» ╪º┘ä╪«╪»┘à╪º╪¬ ╪º┘ä┘à╪ñ╪¬┘à╪¬╪⌐",
  //       description:
  //         "╪¬╪¡┘é┘è┘é ┘å╪│╪¿╪⌐ ┘ä╪º ╪¬┘é┘ä ╪╣┘å 85% ╪│┘å┘ê┘è╪º┘ï ┘ä╪▒╪╢╪º ┘à╪¬┘ä┘é┘è ╪º┘ä╪«╪»┘à╪⌐ ┘ê╪º┘ä┘à╪¬╪╣╪º┘à┘ä┘è┘å ╪╣┘å ╪º┘ä╪«╪»┘à╪º╪¬ ╪º┘ä┘à┘é╪»┘à╪⌐ ┘à┘å ╪º┘ä┘ç┘è╪ª╪⌐.",
  //     },
  //     {
  //       title: "┘å╪│╪¿╪⌐ ╪º┘ä╪¬┘é╪»┘à ┘ü┘è ╪¬┘å┘ü┘è╪░ ╪º┘ä╪«╪╖╪⌐",
  //       description:
  //         "╪º┘ä╪º╪│╪¬┘à╪▒╪º╪▒ ╪¿╪¬┘ê╪╕┘è┘ü ╪¬┘é┘å┘è╪º╪¬ ╪º┘ä╪░┘â╪º╪í ╪º┘ä╪º╪╡╪╖┘å╪º╪╣┘è ┘ê╪▓┘è╪º╪»╪⌐ ┘ü╪º╪╣┘ä┘è╪¬┘ç╪º ┘ü┘è ╪º┘ä╪╣┘à┘ä┘è╪º╪¬ ╪º┘ä╪¼┘à╪▒┘â┘è╪⌐ ╪¿╪¡┘ä┘ê┘ä ╪╣╪º┘à 2030┘à.",
  //     },
  //   ];
  //   addCarousel(kpisList, "#kpis");
  // }
  
  //call initiatives
  // function projectsRequest() {
  //   var projectsList = [
  //     {
  //       title: "╪▒┘ü╪╣ ┘â┘ü╪º╪í╪⌐ ╪¬╪»┘ü┘é ╪º┘ä╪¿╪╢╪º╪ª╪╣ ┘ê╪¬┘é╪»┘è┘à ╪º┘ä╪«╪»┘à╪º╪¬ ╪º┘ä╪¼┘à╪▒┘â┘è╪⌐",
  //       description: "╪▒┘ü╪╣ ┘â┘ü╪º╪í╪⌐ ╪¬╪»┘ü┘é ╪º┘ä╪¿╪╢╪º╪ª╪╣ ┘ê╪¬┘é╪»┘è┘à ╪º┘ä╪«╪»┘à╪º╪¬ ╪º┘ä╪¼┘à╪▒┘â┘è╪⌐",
  //     },
  //   ];
  //   addCarousel(projectsList, "#projects");
  // }
  
  //call initiatives
  // function initiativesRequest() {
  //   var initiativesList = [
  //     {
  //       title: "╪¬╪ú┘à┘è┘å ╪º╪¡╪¬┘è╪º╪¼╪º╪¬ ╪º┘ä┘à┘à┘ä┘â╪⌐ ┘à┘å ╪º┘ä╪¬┘à┘ê┘è┘ä",
  //       description: "╪¬╪ú┘à┘è┘å ╪º╪¡╪¬┘è╪º╪¼╪º╪¬ ╪º┘ä┘à┘à┘ä┘â╪⌐ ┘à┘å ╪º┘ä╪¬┘à┘ê┘è┘ä",
  //     },
  //     {
  //       title: "╪¬┘é╪»┘è┘à ╪«╪»┘à╪º╪¬ ╪¼┘à╪▒┘â┘è╪⌐ ┘à╪¬┘à┘è╪▓╪⌐ ┘ä╪«┘ä┘é ┘à┘å╪º╪« ╪º╪│╪¬╪½┘à╪º╪▒┘è ┘à╪¡┘ü╪▓",
  //       description: "╪¬┘é╪»┘è┘à ╪«╪»┘à╪º╪¬ ╪¼┘à╪▒┘â┘è╪⌐ ┘à╪¬┘à┘è╪▓╪⌐ ┘ä╪«┘ä┘é ┘à┘å╪º╪« ╪º╪│╪¬╪½┘à╪º╪▒┘è ┘à╪¡┘ü╪▓",
  //     },
  //   ];
  //   addCarousel(initiativesList, "#initiatives");
  // }
  
  // strategyHomeHtml = setInterval(function () {
  //   InternalEntities_Info_Request.preinit();
  // }, 2000);
  
  // AllProjectsHtml = setInterval(function () {
  //   InternalEntitiesAllProjects_Info_Request.preinit();
  // }, 2000);
  
  // carousel function
  
  $(document).ready(function () {
    // Fill Dynamo_Phases / Dynamo_Stages / Dynamo_IPhases from SharePoint on this device
    ensureStrategyHomeDynamoLookups();
  
    // Function to repeatedly check for window.currentUserData
    function waitForCurrentUserData() {
      var userReady =
        (window.UserN && window.UserN.Id) ||
        (window.currentUserData && window.currentUserData.Id);
      if (userReady) {
        if (!window.currentUserData && window.UserN) {
          window.currentUserData = window.UserN;
        }
        if (window.APIURL) {
          window.strategyHomeCalls.get_CurrentStrategyHome(window.APIURL);
        } else {
          Get_Configure_Api.preinit();
        }
      } else {
        setTimeout(waitForCurrentUserData, 100); // Retry after 100 milliseconds
      }
    }
  
    // Flag to track if the API has been called
    let apiCallMade = false;
  
    window.Get_Configure_Api = {
      // The main Initialization function
      preinit: function () {
        if (!apiCallMade) {
          SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
            Get_Configure_Api.init();
          });
          apiCallMade = true; // Set the flag to true after calling the API
        }
      },
      init: function () {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext
          .get_web()
          .get_lists()
          .getByTitle('Configurations');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(
          '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="Title" /><Value Type="Text">' +
            'API_URL' +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
        );
        Get_Configure_Api.g.collListItem = oList.getItems(camlQuery);
        clientContext.load(Get_Configure_Api.g.collListItem);
        clientContext.executeQueryAsync(
          Function.createDelegate(this, Get_Configure_Api.onSuccess),
          Function.createDelegate(this, Get_Configure_Api.onError)
        );
      },
      onSuccess: function (sender, args) {
        console.log('Get_Configure_Api.onSuccess called...');
        var collListItem = Get_Configure_Api.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) {
          var oListItem = listItemEnum.get_current();
          var rawApiUrl = oListItem.get_item('Value');
          APIURL =
            typeof window.normalizeApiUrl === 'function'
              ? window.normalizeApiUrl(rawApiUrl)
              : rawApiUrl;
          window.APIURL = APIURL;
          window.strategyHomeCalls.get_CurrentStrategyHome(APIURL);
        }
      },
      onError: function (sender, args) {
        console.log(
          'Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()
        );
      },
      // Global variables
      g: {},
    };
  
    // Define the object to hold our functions
    window.strategyHomeCalls = {
      // Define the function to get strategy details
      get_CurrentStrategyHome: function (apiUrl) {
        // Get the 'code' parameter from the URL
        var urlParams = new URLSearchParams(window.location.search);
        var code = urlParams.get('code');
  
        // Check if code is present
        if (!code) {
          console.log('No code found in URL, skipping API call.');
          $('.visionDesc, .messageDesc, .valuesDesc, .objectivesDesc').html(
            localStorage.getItem('lng') == null ||
              localStorage.getItem('lng') == 'ar'
              ? 'افتح الاستراتيجية من صفحة الاستراتيجيات الرئيسية أولاً'
              : 'Open a strategy from Strategies Main first'
          );
          return;
        }
  
        var language = localStorage.getItem('lng');
        var languageHeader =
          language == null || language === '' || language === 'ar' ? 'ar' : 'en';
        var userId =
          (window.currentUserData && window.currentUserData.Id) ||
          (window.UserN && window.UserN.Id) ||
          '';
        var baseUrl = String(apiUrl || '').replace(/\/+$/, '');
  
        // HRSD: GET /general/fetchallstrategydetails?strategyCode={code}
        fetch(
          baseUrl +
            '/general/fetchallstrategydetails?strategyCode=' +
            encodeURIComponent(code),
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Language: languageHeader,
              'User-Id': String(userId),
            },
          }
        )
          .then(function (response) {
            console.log('API response received:', response);
            if (!response.ok) {
              throw new Error('HTTP error! status: ' + response.status);
            }
            return response.json();
          })
          .then(function (payload) {
            var data = (payload && payload.result) || payload || {};
            var strategies =
              data.strategies_List || data.Strategies_List || [];
            var objectives =
              data.objectives_List || data.Objectives_List || [];
            var kpis =
              data.kpIs_List || data.KPIs_List || data.kpis_List || [];
            var initiatives =
              data.initiatives_List || data.Initiatives_List || [];
            var projects = data.projects_List || data.Projects_List || [];
            var pillars = data.pillars_List || data.Pillars_List || [];
  
            if (strategies.length > 0 && strategies[0] !== null) {
              var strategy = strategies[0];
              var strategyName = strategy.name || strategy.Name || No_Data;
              var vision = strategy.vision || strategy.Vision;
              var mission = strategy.mission || strategy.Mission;
              var value = strategy.value || strategy.Value;
              var goals = strategy.goals || strategy.Goals;
              var description =
                strategy.description || strategy.Description || '';
  
              // Top cards (Vision/Mission/Value/Goals) — fall back to description / No_Data
              $('.visionDesc').html(vision || description || No_Data);
              $('.messageDesc').html(mission || No_Data);
              $('.valuesDesc').html(value || No_Data);
              $('.objectivesDesc').html(goals || No_Data);
  
              document.title = strategyName;
              var $pageTitle = $('.page-title')
                .addClass('overflow-ellipsis')
                .html(
                  '<a href="' +
                    _spPageContextInfo.webAbsoluteUrl +
                    '/sitepages/strategymain.aspx' +
                    '">' +
                    '<span class="Resources" data-trans-mainstrategy></span>' +
                    '<span class="tooltiptext Resources" data-trans-mainstrategy></span>' +
                    '</a>' +
                    ' / ' +
                    '<a href="' +
                    _spPageContextInfo.webAbsoluteUrl +
                    '/sitepages/strategyHome.aspx?code=' +
                    encodeURIComponent(code) +
                    '">' +
                    '<span>' +
                    strategyName +
                    '</span>' +
                    '<span class="tooltiptext">' +
                    strategyName +
                    '</span>' +
                    '</a>'
                );
              // Keep breadcrumb at start of navbar (Tanmiah: inside .navbar-wrapper)
              var $navbarWrapper = $('.navbar-wrapper').first();
              if (
                $navbarWrapper.length &&
                !$pageTitle.closest('.navbar-wrapper').length
              ) {
                $navbarWrapper.append($pageTitle);
              }
            } else {
              $('.visionDesc, .messageDesc, .valuesDesc, .objectivesDesc').html(
                No_Data
              );
            }
  
            var mappedObjectives = objectives.map(mapHomeObjectiveItem);
            // Resolve relatedObjective code → name from same objectives_List
            var objectiveNameByCode = {};
            mappedObjectives.forEach(function (obj) {
              if (obj.Title && obj.Title !== No_Data) {
                objectiveNameByCode[String(obj.Title).trim()] = obj.Name;
              }
            });
            mappedObjectives.forEach(function (obj) {
              var related = obj.RelatedObjective;
              if (
                related &&
                related !== No_Data &&
                objectiveNameByCode[String(related).trim()]
              ) {
                obj.RelatedObjective =
                  objectiveNameByCode[String(related).trim()];
              }
            });
            var mappedKpis = kpis.map(mapHomeKpiItem);
            var mappedInitiatives = initiatives.map(mapHomeInitiativeItem);
            var mappedProjects = projects.map(mapHomeProjectItem);
            var mappedPillars = pillars.map(mapHomePillarItem);
  
            setTimeout(function () {
              updateTabHead('#objectives-tab .tab-head', mappedObjectives);
              updateTabHead('#kpis-tab .tab-head', mappedKpis);
              updateTabHead('#initiatives-tab .tab-head', mappedInitiatives);
              updateTabHead('#projects-tab .tab-head', mappedProjects);
            }, 500);
  
            // Same Tanmiah tab sections / carousels
            addCarousel(mappedPillars, '#strpillar');
            addCarousel(mappedObjectives, '#objectives');
            addCarousel(mappedKpis, '#kpis');
            addCarousel(mappedInitiatives, '#initiatives');
            addCarousel(mappedProjects, '#projects');
  
            if (typeof changeResources === 'function') {
              changeResources();
            }
          })
          .catch(function (error) {
            console.error('Error fetching data:', error);
            $('.visionDesc, .messageDesc, .valuesDesc, .objectivesDesc').html(
              'Error loading data'
            );
          });
      },
    };
  
    function updateTabHead(selector, list) {
      const spanElement = document.querySelector(selector);
      const buttonElement = spanElement.closest('button'); // Get the closest button element containing the span
      const count = list && list.length ? list.length : 0;
  
      // Update the second span (empty span) with the count
      const countSpan = buttonElement.querySelectorAll('span')[1]; // Select the second <span> inside the button
      if (countSpan) {
        countSpan.textContent = `${count}`; // Display the count in the second span
      }
    }
  
    // Start checking for window.currentUserData
    waitForCurrentUserData();
  });
  
  function pickHomeField(obj) {
    var keys = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < keys.length; i++) {
      var v = obj[keys[i]];
      if (v !== undefined && v !== null && v !== '') {
        return v;
      }
    }
    return null;
  }
  
  /** Resolve phase/stage code → display name from Dynamo_* localStorage (Tanmiah pattern, HRSD keys). */
  function resolveDynamoLookupName(storageKeys, code, language) {
    if (code == null || code === '' || code === No_Data) {
      return No_Data;
    }
    var codeStr = String(code).trim();
    var keys = Array.isArray(storageKeys) ? storageKeys : [storageKeys];
    var isAr = !language || language === 'ar';
  
    for (var k = 0; k < keys.length; k++) {
      try {
        var raw = localStorage.getItem(keys[k]);
        var list = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(list) || !list.length) continue;
        var match = list.find(function (item) {
          return (
            item &&
            String(item.code != null ? item.code : item.Code || '')
              .trim()
              .toLowerCase() === codeStr.toLowerCase()
          );
        });
        if (match) {
          var name = isAr
            ? match.name || match.nameAr || match.Name || ''
            : match.nameEn || match.NameEn || match.name || match.Name || '';
          if (name) return name;
        }
      } catch (e) {
        /* try next key */
      }
    }
    return codeStr;
  }
  
  function isDynamoLookupEmpty(storageKey) {
    try {
      var list = JSON.parse(localStorage.getItem(storageKey) || '[]');
      return !Array.isArray(list) || !list.length;
    } catch (e) {
      return true;
    }
  }
  
  /** Load one lookup list from SharePoint into Dynamo_* localStorage (no console needed). */
  function loadStrategyHomeDynamoList(
    listName,
    fName,
    fNameEn,
    fCode,
    storageKey,
    callback
  ) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(listName);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><OrderBy><FieldRef Name='Created' Ascending='True' /></OrderBy></Query></View>"
    );
    var coll = oList.getItems(camlQuery);
    clientContext.load(coll);
    clientContext.executeQueryAsync(
      function () {
        var arr = [];
        var listItemEnum = coll.getEnumerator();
        while (listItemEnum.moveNext()) {
          var oListItem = listItemEnum.get_current();
          arr.push({
            name: oListItem.get_item(fName),
            nameEn: fNameEn ? oListItem.get_item(fNameEn) : '',
            code: oListItem.get_item(fCode),
            timeset: new Date().getTime(),
          });
        }
        localStorage.setItem(storageKey, JSON.stringify(arr));
        if (typeof callback === 'function') callback(arr);
      },
      function (sender, args) {
        console.log(
          'Strategy Home Dynamo load failed for ' + listName + ': ' +
            args.get_message()
        );
        if (typeof callback === 'function') callback([]);
      }
    );
  }
  
  /**
   * Ensure Phases / Stages / IPhases are in localStorage on this device.
   * Console Dynamo_Values.init only filled the current browser — other devices stay empty.
   */
  function ensureStrategyHomeDynamoLookups(done) {
    var queue = [];
    if (isDynamoLookupEmpty('Dynamo_Phases')) {
      localStorage.removeItem('Dynamo_Phases');
      queue.push(function (next) {
        loadStrategyHomeDynamoList(
          'Phases',
          'Name',
          'PhaseNameEn',
          'Title',
          'Dynamo_Phases',
          next
        );
      });
    }
    if (isDynamoLookupEmpty('Dynamo_Stages')) {
      localStorage.removeItem('Dynamo_Stages');
      queue.push(function (next) {
        loadStrategyHomeDynamoList(
          'Stages',
          'StageName',
          'StageNameEn',
          'Title',
          'Dynamo_Stages',
          next
        );
      });
    }
    if (isDynamoLookupEmpty('Dynamo_IPhases')) {
      localStorage.removeItem('Dynamo_IPhases');
      queue.push(function (next) {
        loadStrategyHomeDynamoList(
          'IPhases',
          'Name',
          'PhaseNameEn',
          'Title',
          'Dynamo_IPhases',
          next
        );
      });
    }
  
    function runQueue(i) {
      if (i >= queue.length) {
        if (typeof done === 'function') done();
        return;
      }
      queue[i](function () {
        runQueue(i + 1);
      });
    }
  
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
      runQueue(0);
    });
  }
  
  function getHomeStatusColor(status) {
    var s = String(status || '')
      .trim()
      .toLowerCase();
    // Objectives
    if (s === 'stat20' || s === 'stat15') return '#C00000';
    if (s === 'stat21' || s === 'stat16') return '#FFFF00';
    if (s === 'stat22' || s === 'stat17') return '#5AB74C';
    if (
      s === 'stat42' ||
      s === 'stat32' ||
      s === 'stat31' ||
      s === 'stat18' ||
      s === 'stat30' ||
      s === 'stat29'
    ) {
      return '#696969';
    }
    if (s === 'stat43' || s === 'stat19' || s === 'stat28') return '#a9a9a9';
    // Initiatives (stat1–stat7, stat29)
    if (s === 'stat1') return '#C00000'; // too late
    if (s === 'stat2') return '#FFFF00'; // late
    if (s === 'stat3') return '#5AB74C'; // on track
    if (s === 'stat4') return '#0C553C'; // completed
    if (s === 'stat5' || s === 'stat6' || s === 'stat7') return '#696969';
    // Projects (stat8–stat14, stat28, stat30)
    if (s === 'stat8') return '#C00000'; // too late
    if (s === 'stat9') return '#FFFF00'; // late
    if (s === 'stat10') return '#5AB74C'; // on track
    if (s === 'stat11') return '#0C553C'; // completed
    if (s === 'stat12' || s === 'stat13' || s === 'stat14') return '#696969';
    return null;
  }
  
  function mapHomeObjectiveItem(o) {
    var status = pickHomeField(o, 'status', 'ProgressStatus', 'draftStatus') || '';
    return {
      Id: pickHomeField(o, 'id', 'Id'),
      Name: pickHomeField(o, 'name', 'Name') || No_Data,
      Title: pickHomeField(o, 'title', 'Title') || No_Data,
      Description: pickHomeField(o, 'description', 'Description') || '',
      ProgressStatus: status,
      ProgressPercentage: pickHomeField(
        o,
        'progressPercentage',
        'ProgressPercentage'
      ),
      Type: pickHomeField(o, 'types', 'Type', 'class') || '',
      RelatedObjective: pickHomeField(
        o,
        'relatedObjectiveName',
        'RelatedObjectiveName',
        'relatedObjective',
        'RelatedObjective'
      ),
      RelatedStrategicPillar: pickHomeField(
        o,
        'relatedStrategyName',
        'relatedStrategy',
        'relatedStrategicPillar',
        'RelatedStrategicPillar'
      ),
      SectorAr: pickHomeField(o, 'sectorName', 'SectorAr', 'sector') || '',
      SectorEn: pickHomeField(o, 'sectorName', 'SectorEn', 'sector') || '',
      DepartmentAr:
        pickHomeField(o, 'subSectorName', 'DepartmentAr', 'subSector') || '',
      DepartmentEn:
        pickHomeField(o, 'subSectorName', 'DepartmentEn', 'subSector') || '',
      SubDepartmentAr: pickHomeField(o, 'subSectorName', 'SubDepartmentAr') || '',
      SubDepartmentEn: pickHomeField(o, 'subSectorName', 'SubDepartmentEn') || '',
      DeletionStatus: pickHomeField(o, 'deletionStatus', 'DeletionStatus') || '',
    };
  }
  
  function mapHomeKpiItem(k) {
    var status =
      pickHomeField(
        k,
        'status',
        'ProgressStatus',
        'completionStatus',
        'draftStatus'
      ) || '';
    return {
      Id: pickHomeField(k, 'id', 'Id'),
      Name: pickHomeField(k, 'name', 'Name') || No_Data,
      Title: pickHomeField(k, 'title', 'Title') || No_Data,
      Description: pickHomeField(k, 'description', 'Description') || '',
      ProgressStatus: status,
      ProgressPercentage: pickHomeField(k, 'performance', 'ProgressPercentage'),
      Type: pickHomeField(k, 'kpiType', 'classification', 'Type') || '',
      RelatedStrategyObjective: pickHomeField(
        k,
        'relatedStrategyObjectiveName',
        'relatedStrategyObjective',
        'RelatedStrategyObjective'
      ),
      RelatedStrategicPillar: pickHomeField(
        k,
        'relatedStrategyName',
        'relatedStrategy',
        'relatedStrategicPillar',
        'RelatedStrategicPillar',
        'RelatedStrategy'
      ),
      SectorAr: pickHomeField(k, 'sectorName', 'SectorAr', 'sector') || '',
      SectorEn: pickHomeField(k, 'sectorName', 'SectorEn', 'sector') || '',
      DepartmentAr:
        pickHomeField(k, 'subSectorName', 'DepartmentAr', 'subSector') || '',
      DepartmentEn:
        pickHomeField(k, 'subSectorName', 'DepartmentEn', 'subSector') || '',
      DeletionStatus: pickHomeField(k, 'deletionStatus', 'DeletionStatus') || '',
    };
  }
  
  function mapHomeInitiativeItem(i) {
    var status =
      pickHomeField(
        i,
        'initiativeProgressStatus',
        'MilestonesProgressStatus',
        'status',
        'ProgressStatus'
      ) || '';
    return {
      Id: pickHomeField(i, 'id', 'Id'),
      Name: pickHomeField(i, 'name', 'Name') || No_Data,
      Title: pickHomeField(i, 'title', 'Title') || No_Data,
      Description: pickHomeField(i, 'description', 'Description') || '',
      ProgressStatus: status,
      MilestonesProgressStatus: status,
      PreviousMilestonesProgressStatus: pickHomeField(
        i,
        'previousProgressStatus',
        'PreviousMilestonesProgressStatus'
      ),
      ProgressPercentage: pickHomeField(
        i,
        'linkingProgress',
        'ProgressPercentage'
      ),
      Phase: pickHomeField(i, 'phase', 'Phase') || '',
      PlannedStartDate: pickHomeField(i, 'startDate', 'PlannedStartDate'),
      PlannedFinishDate: pickHomeField(i, 'finishDate', 'PlannedFinishDate'),
      RelatedObjective: pickHomeField(
        i,
        'relatedObjective',
        'RelatedObjective'
      ),
      DeletionStatus: pickHomeField(i, 'deletionStatus', 'DeletionStatus') || '',
      Stage: pickHomeField(i, 'wfStage', 'Stage') || '',
      Type: pickHomeField(i, 'types', 'Type') || '',
      SectorAr: pickHomeField(i, 'sectorName', 'SectorAr', 'sector') || '',
      SectorEn: pickHomeField(i, 'sectorName', 'SectorEn', 'sector') || '',
      DepartmentAr:
        pickHomeField(i, 'subSectorName', 'DepartmentAr', 'subSector') || '',
      DepartmentEn:
        pickHomeField(i, 'subSectorName', 'DepartmentEn', 'subSector') || '',
    };
  }
  
  function mapHomeProjectItem(p) {
    var milestone =
      pickHomeField(
        p,
        'progressStatus_Milestone',
        'milestonesProgressStatus',
        'MilestonesProgressStatus'
      ) || '';
    var deliverable =
      pickHomeField(
        p,
        'progressStatus_Deliverable',
        'deliverablesProgressStatus',
        'DeliverablesProgressStatus'
      ) || '';
    return {
      Id: pickHomeField(p, 'id', 'Id'),
      Name: pickHomeField(p, 'name', 'Name') || No_Data,
      Title: pickHomeField(p, 'title', 'Title') || No_Data,
      Description: pickHomeField(p, 'description', 'Description') || '',
      ProgressStatus: milestone,
      MilestonesProgressStatus: milestone,
      DeliverablesProgressStatus: deliverable,
      ProgressPercentage: pickHomeField(
        p,
        'actualSchedulePercentageComplete',
        'ProgressPercentage'
      ),
      PlannedStartDate: pickHomeField(
        p,
        'plannedStartDate',
        'startDate',
        'PlannedStartDate'
      ),
      PlannedFinishDate: pickHomeField(
        p,
        'plannedFinishDate',
        'finishDate',
        'PlannedFinishDate'
      ),
      RelatedInitiative: pickHomeField(
        p,
        'relatedInitiative',
        'RelatedInitiative'
      ),
      Category: pickHomeField(p, 'category', 'Category'),
      ProjectScope: pickHomeField(
        p,
        'projectScope',
        'scopeOfWork',
        'ProjectScope',
        'ScopeOfWork'
      ),
      BaselineDuration: pickHomeField(p, 'baselineDuration', 'BaselineDuration'),
      ActualSchedulePercentageComplete: pickHomeField(
        p,
        'actualSchedulePercentageComplete',
        'ActualSchedulePercentageComplete'
      ),
      MilestonesActualProgress: pickHomeField(
        p,
        'actualImplementation_Milestone',
        'milestonesActualProgress',
        'MilestonesActualProgress'
      ),
      MilestonesPlannedProgress: pickHomeField(
        p,
        'plannedImplementation_Milestone',
        'milestonesPlannedProgress',
        'MilestonesPlannedProgress'
      ),
      DeliverablesActualProgress: pickHomeField(
        p,
        'actualImplementation_Deliverable',
        'deliverablesActualProgress',
        'DeliverablesActualProgress'
      ),
      DeliverablesPlannedProgress: pickHomeField(
        p,
        'plannedImplementation_Deliverable',
        'deliverablesPlannedProgress',
        'DeliverablesPlannedProgress'
      ),
      Phase: pickHomeField(p, 'phase', 'Phase') || '',
      Stage: pickHomeField(p, 'stage', 'Stage', 'wfStage') || '',
      Status: pickHomeField(p, 'status', 'Status') || '',
      DeletionStatus: pickHomeField(p, 'deletionStatus', 'DeletionStatus') || '',
    };
  }
  
  function mapHomeRelatedStrategyItem(s) {
    return {
      Id: pickHomeField(s, 'id', 'Id'),
      Name: pickHomeField(s, 'name', 'Name') || No_Data,
      Title: pickHomeField(s, 'title', 'Title') || No_Data,
      ProgressStatus:
        pickHomeField(s, 'status', 'ProgressStatus', 'draftStatus') || '',
    };
  }
  
  function mapHomePillarItem(p) {
    return {
      Id: pickHomeField(p, 'id', 'Id'),
      Name: pickHomeField(p, 'name', 'Name') || No_Data,
      Title: pickHomeField(p, 'title', 'code', 'Title') || No_Data,
      ProgressStatus:
        pickHomeField(p, 'status', 'ProgressStatus', 'draftStatus') || '',
    };
  }
  
  function mapHomeStrategicValueItem(v) {
    return {
      Id: pickHomeField(v, 'id', 'Id'),
      Name: pickHomeField(v, 'name', 'Name') || No_Data,
      Title: pickHomeField(v, 'title', 'Title') || No_Data,
      ProgressStatus:
        pickHomeField(v, 'status', 'ProgressStatus', 'draftStatus') || '',
    };
  }
  
  function addCarousel(items, headName) {
    items = Array.isArray(items) ? items : [];
    var carouselInner = '';
    var indicators = '';
    var itemsPerSlide = 6;
    var totalItems = items.length;
  
    // Create a unique carousel ID
    var carouselId = 'carousel-' + headName.replace('#', '');
  
    var style = document.createElement('style');
    document.head.appendChild(style);
  
    for (var i = 0; i < totalItems; i += itemsPerSlide) {
      var activeClass = i === 0 ? 'active' : '';
      carouselInner +=
        '<div class="carousel-item ' + activeClass + '"><div class="row">';
  
      for (var j = i; j < i + itemsPerSlide && j < totalItems; j++) {
        var title = items[j].Title ? items[j].Title : No_Data;
        var description = items[j].Name ? items[j].Name : No_Data;
        var progressStatus = items[j].ProgressStatus
          ? items[j].ProgressStatus
          : No_Data;
        var milestoneProgressStatus = items[j].MilestonesProgressStatus
          ? items[j].MilestonesProgressStatus
          : No_Data;
        var deliverableProgressStatus = items[j].DeliverablesProgressStatus
          ? items[j].DeliverablesProgressStatus
          : No_Data;
  
        // Add a unique identifier for each card header for event handling
        var cardHeaderId = 'cardHeader-' + (items[j].Id ? items[j].Id : 'no-id');
  
        // Determine the background color based on the specific condition
        var milestoneColor = '#a9a9a9';
        var deliverableColor = 'transparent';
        var hrsdColor = getHomeStatusColor(
          headName === '#initiatives' || headName === '#projects'
            ? milestoneProgressStatus
            : progressStatus
        );
        if (hrsdColor) {
          milestoneColor = hrsdColor;
        } else if (headName === '#objectives') {
          if (progressStatus === 'obj-partiallyachieved') {
            milestoneColor = '#C00000';
          } else if (progressStatus === 'obj-targetachieved') {
            milestoneColor = '#FFFF00';
          } else if (progressStatus === 'obj-completed') {
            milestoneColor = '#5AB74C';
          } else if (progressStatus === 'obj-draft') {
            milestoneColor = '#696969';
          }
        } else if (headName === '#kpis') {
          if (progressStatus === 'kpi-notachieved') {
            milestoneColor = '#C00000';
          } else if (progressStatus === 'kpi-partiallyachieved') {
            milestoneColor = '#FFFF00';
          } else if (progressStatus === 'kpi-targetachieved') {
            milestoneColor = '#5AB74C';
          } else if (progressStatus === 'kpi-notapplicable') {
            milestoneColor = '#696969';
          } else if (progressStatus === 'kpi-novalue') {
            milestoneColor = '#a9a9a9';
          } else if (progressStatus === 'kpi-draft') {
            milestoneColor = '#696969';
          }
        } else if (headName === '#initiatives') {
          if (milestoneProgressStatus === 'inv-toolate') {
            milestoneColor = '#C00000';
          } else if (milestoneProgressStatus === 'inv-late') {
            milestoneColor = '#FFFF00';
          } else if (milestoneProgressStatus === 'inv-ontrack') {
            milestoneColor = '#5AB74C';
          } else if (milestoneProgressStatus === 'inv-completed') {
            milestoneColor = '#0C553C';
          } else if (milestoneProgressStatus === 'inv-notstarted') {
            milestoneColor = '#D9D9D9';
          } else if (milestoneProgressStatus === 'inv-onhold') {
            milestoneColor = '#80340D';
          } else if (milestoneProgressStatus === 'inv-canceled') {
            milestoneColor = '#80340D';
          } else if (milestoneProgressStatus === 'inv-draft') {
            milestoneColor = '#a6a6a6';
          }
        } else if (headName === '#projects') {
          // Assign colors for Milestone and Deliverable Progress Status in projects
          if (milestoneProgressStatus === 'prj-toolate') {
            milestoneColor = '#FF6161';
          } else if (milestoneProgressStatus === 'prj-late') {
            milestoneColor = '#FFF901';
          } else if (milestoneProgressStatus === 'prj-ontrack') {
            milestoneColor = '#0BE59F';
          } else if (milestoneProgressStatus === 'prj-completed') {
            milestoneColor = '#00DDF4';
          } else if (milestoneProgressStatus === 'prj-closed') {
            milestoneColor = '#002358';
          } else if (
            milestoneProgressStatus === 'prj-notstarted' ||
            milestoneProgressStatus === 'prj-onhold' ||
            milestoneProgressStatus === 'prj-canceled' ||
            milestoneProgressStatus === 'prj-draft'
          ) {
            milestoneColor = '#696969';
          }
  
          var deliverableHrsd = getHomeStatusColor(deliverableProgressStatus);
          if (deliverableHrsd) {
            deliverableColor = deliverableHrsd;
          } else if (deliverableProgressStatus === 'prj-toolate') {
            deliverableColor = '#FF6161';
          } else if (deliverableProgressStatus === 'prj-late') {
            deliverableColor = '#FFF901';
          } else if (deliverableProgressStatus === 'prj-ontrack') {
            deliverableColor = '#0BE59F';
          } else if (deliverableProgressStatus === 'prj-completed') {
            deliverableColor = '#00DDF4';
          } else if (deliverableProgressStatus === 'prj-closed') {
            deliverableColor = '#002358';
          } else if (
            deliverableProgressStatus === 'prj-notstarted' ||
            deliverableProgressStatus === 'prj-onhold' ||
            deliverableProgressStatus === 'prj-canceled' ||
            deliverableProgressStatus === 'prj-draft'
          ) {
            deliverableColor = '#696969';
          }
        } else if (
          headName === '#strvalue' ||
          headName === '#strpillar' ||
          headName === '#substr'
        ) {
          if (progressStatus === 'kpi-notachieved') {
            milestoneColor = '#C00000';
          } else if (progressStatus === 'kpi-partiallyachieved') {
            milestoneColor = '#FFFF00';
          } else if (progressStatus === 'kpi-targetachieved') {
            milestoneColor = '#5AB74C';
          } else if (progressStatus === 'kpi-notapplicable') {
            milestoneColor = '#696969';
          } else if (progressStatus === 'kpi-novalue') {
            milestoneColor = '#a9a9a9';
          } else if (progressStatus === 'kpi-draft') {
            milestoneColor = '#696969';
          }
        }
        var uniqueClass = 'card-' + (items[j].Id || 'no-id');
  
        // Status ribbon + hover fill via --status-color (same as Strategies)
        style.innerHTML += `
          .strategyHome-new .${uniqueClass} {
            --status-color: ${milestoneColor};
          }
        `;
  
        // tooltip function
        function addAndRetrieveSpanValue(progressStatus) {
          // Create a new span element
          const spanElement = document.createElement('span');
  
          // Construct the dynamic attribute name
          const attributeName = `data-trans-${progressStatus}`;
  
          // Set the dynamic attribute without the '=' in the attribute name
          spanElement.setAttribute(attributeName, '');
          spanElement.setAttribute('class', 'Resources');
  
          // Hide the span element (so it doesn't show on the screen)
          spanElement.style.display = 'none';
  
          // Append the span element to the div with id 'contentRow'
          const contentRow = document.getElementById('contentRow');
          if (contentRow) {
            contentRow.appendChild(spanElement);
          }
  
          changeResources();
  
          // Retrieve the value inside the span element
          const spanValue = spanElement.innerText;
  
          // Optionally, remove the span element from the DOM
          // spanElement.remove();
          console.log(spanValue);
  
          // Return the value
          return spanValue;
        }
  
        function getTooltipTitle() {
          if (headName === '#objectives') {
            const progressStatus = items[j].ProgressStatus; // or any other dynamic value
            const value = addAndRetrieveSpanValue(progressStatus);
            // Select the element(s) with the class 'status-deliverable'
            var elements = document.querySelectorAll('.status-deliverable');
  
            // Loop through each element and set display to 'none'
            elements.forEach(function (element) {
              element.style.display = 'none';
            });
            $(function () {
              $('[data-toggle="tooltip"]').tooltip();
            });
            return value;
          } else if (headName === '#kpis') {
            const progressStatus = items[j].ProgressStatus; // or any other dynamic value
            const value = addAndRetrieveSpanValue(progressStatus);
            // Select the element(s) with the class 'status-deliverable'
            var elements = document.querySelectorAll('.status-deliverable');
  
            // Loop through each element and set display to 'none'
            elements.forEach(function (element) {
              element.style.display = 'none';
            });
            $(function () {
              $('[data-toggle="tooltip"]').tooltip();
            });
            return value;
          } else if (headName === '#initiatives') {
            const progressStatus = items[j].MilestonesProgressStatus; // or any other dynamic value
            const value = addAndRetrieveSpanValue(progressStatus);
            // Select the element(s) with the class 'status-deliverable'
            var elements = document.querySelectorAll('.status-deliverable');
  
            // Loop through each element and set display to 'none'
            elements.forEach(function (element) {
              element.style.display = 'none';
            });
            $(function () {
              $('[data-toggle="tooltip"]').tooltip();
            });
            return value;
          } else if (headName === '#projects') {
            const progressStatus = items[j].MilestonesProgressStatus; // or any other dynamic value
            const value = addAndRetrieveSpanValue(progressStatus);
            $(function () {
              $('[data-toggle="tooltip"]').tooltip();
            });
            return value;
          }
        }
  
        function getTooltipDeliverableTitle() {
          if (headName == '#projects') {
            const progressStatus = items[j].DeliverablesProgressStatus; // or any other dynamic value
            const value = addAndRetrieveSpanValue(progressStatus);
  
            return value;
          }
        }
        // Create a card with title, description, and additional data attributes for the modal
        carouselInner +=
          '<div class="col-4 mt-3">' +
          '<div class="mainCard ' +
          uniqueClass +
          ' link-item p-3 fade-in h-100 d-flex flex-column justify-content-between ">' +
          '<div class="main-title" title="' +
          description +
          '">' + // Add title attribute for description, trimmed
          description.trim() +
          '</div>' +
          '<div class="w-100 d-flex align-items-center justify-content-between flex-wrap">' +
          '<p class="sub-title" title="' +
          title +
          '">' + // Add title attribute for title, trimmed
          title.trim() +
          '</p>' +
          '</div>' +
          '<p class="text-end show-more d-flex align-items-center flex-row-reverse" id="' +
          cardHeaderId +
          '" ' +
          'data-currentid="' +
          (items[j].Id || No_Data) +
          '" ' +
          'data-title="' +
          title +
          '" ' +
          'data-description="' +
          description +
          '" ' +
          'data-headname="' +
          headName +
          '" ' +
          'data-objname="' +
          (items[j].Name || No_Data) +
          '" ' +
          'data-progresspercentage="' +
          (items[j].ProgressPercentage != null &&
          items[j].ProgressPercentage !== ''
            ? items[j].ProgressPercentage + '%'
            : No_Data) +
          '" ' +
          'data-progressstatus="' +
          (items[j].ProgressStatus || No_Data) +
          '" ' +
          'data-type="' +
          (items[j].Type || No_Data) +
          '" ' +
          'data-relatedobjective="' +
          (items[j].RelatedObjective || No_Data) +
          '" ' +
          'data-relatedstrategicpillar="' +
          (items[j].RelatedStrategicPillar || No_Data) +
          '" ' +
          'data-sectorar="' +
          (items[j].SectorAr || No_Data) +
          '" ' +
          'data-sectoren="' +
          (items[j].SectorEn || No_Data) +
          '" ' +
          'data-subdepartmentar="' +
          (items[j].SubDepartmentAr || No_Data) +
          '" ' +
          'data-subdepartmenten="' +
          (items[j].SubDepartmentEn || No_Data) +
          '" ' +
          'data-departmentar="' +
          (items[j].DepartmentAr || No_Data) +
          '" ' +
          'data-departmenten="' +
          (items[j].DepartmentEn || No_Data) +
          '" ' +
          'data-relatedstrategyobjective="' +
          (items[j].RelatedStrategyObjective || No_Data) +
          '" ' +
          'data-milestonesprogressstatus="' +
          (items[j].MilestonesProgressStatus || No_Data) +
          '" ' +
          'data-previousmilestonesprogressstatus="' +
          (items[j].PreviousMilestonesProgressStatus || No_Data) +
          '" ' +
          'data-plannedstartdate="' +
          (items[j].PlannedStartDate || No_Data) +
          '" ' +
          'data-plannedfinishdate="' +
          (items[j].PlannedFinishDate || No_Data) +
          '" ' +
          'data-deletionstatus="' +
          (items[j].DeletionStatus || No_Data) +
          '" ' +
          'data-phase="' +
          (items[j].Phase || No_Data) +
          '" ' +
          'data-status="' +
          (items[j].Status || No_Data) +
          '" ' +
          'data-baselineduration="' +
          (items[j].BaselineDuration || No_Data) +
          '" ' +
          'data-actualschedulepercentagecomplete="' +
          (items[j].ActualSchedulePercentageComplete || No_Data) +
          '" ' +
          'data-relatedinitiative="' +
          (items[j].RelatedInitiative || No_Data) +
          '" ' +
          'data-category="' +
          (items[j].Category || No_Data) +
          '" ' +
          'data-projectscope="' +
          (items[j].ProjectScope || No_Data) +
          '" ' +
          'data-milestonesactualprogress="' +
          (items[j].MilestonesActualProgress != null &&
          items[j].MilestonesActualProgress !== ''
            ? items[j].MilestonesActualProgress + '%'
            : No_Data) +
          '" ' +
          'data-milestonesplannedprogress="' +
          (items[j].MilestonesPlannedProgress != null &&
          items[j].MilestonesPlannedProgress !== ''
            ? items[j].MilestonesPlannedProgress + '%'
            : No_Data) +
          '" ' +
          'data-deliverablesactualprogress="' +
          (items[j].DeliverablesActualProgress != null &&
          items[j].DeliverablesActualProgress !== ''
            ? items[j].DeliverablesActualProgress + '%'
            : No_Data) +
          '" ' +
          'data-deliverablesplannedprogress="' +
          (items[j].DeliverablesPlannedProgress != null &&
          items[j].DeliverablesPlannedProgress !== ''
            ? items[j].DeliverablesPlannedProgress + '%'
            : No_Data) +
          '" ' +
          'data-deliverablesprogressstatus="' +
          (items[j].DeliverablesProgressStatus || No_Data) +
          '" ' +
          'data-stage="' +
          (items[j].Stage || No_Data) +
          '">' +
          '<span class="Resources content" data-trans-viewmore></span>' +
          '<span class="arrow d-flex align-items-center"><i class="fas fa-long-arrow-alt-left"></i></span>' +
          '</p>' +
          '</div>' +
          '</div>';
      }
  
      carouselInner += '</div></div>';
      indicators +=
        '<li data-target="#' +
        carouselId +
        '" data-slide-to="' +
        i / itemsPerSlide +
        '" class="' +
        activeClass +
        '"></li>';
      // indicators +=
      //   '<button type="button" data-target="#' +
      //   carouselId +
      //   '" data-slide-to="' +
      //   i / itemsPerSlide +
      //   '" class="' +
      //   activeClass +
      //   '" >' +
      //   (i / itemsPerSlide + 1) +
      //   '</button>';
    }
  
    function getStatusHtml(headName) {
      let statusHtml = '<div><div class="status">';
  
      if (headName === '#objectives') {
        statusHtml +=
          '<span> <span class="Resources" data-trans-stat43> </span>  <span class="dot dot-blue"></span></span>' +
          '<span > <span class="Resources" data-trans-stat32> </span> <span class="dot dot-gray"></span></span>' +
          '<span > <span class="Resources" data-trans-stat42> </span> <span class="dot dot-gray"></span></span>' +
          '<span > <span class="Resources" data-trans-stat22> </span> <span class="dot dot-green"></span></span>' +
          '<span > <span class="Resources" data-trans-stat21>  </span> <span class="dot dot-yellow"></span></span>' +
          '<span > <span class="Resources" data-trans-stat20> </span> <span class="dot dot-aqua"></span></span>';
      } else if (headName === '#kpis') {
        statusHtml +=
          '<span> <span class="Resources" data-trans-stat19> </span>  <span class="dot dot-blue"></span></span>' +
          '<span > <span class="Resources" data-trans-stat31> </span> <span class="dot dot-gray"></span></span>' +
          '<span > <span class="Resources" data-trans-stat18 ></span> <span class="dot dot-gray"></span></span>' +
          '<span > <span class="Resources" data-trans-stat17> </span> <span class="dot dot-green"></span></span>' +
          '<span ><span class="Resources" data-trans-stat16> </span> <span class="dot dot-yellow"></span></span>' +
          '<span > <span class="Resources" data-trans-stat15> </span> <span class="dot dot-aqua"></span></span>';
      } else if (headName === '#initiatives') {
        // HRSD initiative statuses (Resources.js: stat1–stat7, stat29)
        statusHtml +=
          '<span> <span class="Resources" data-trans-stat29> </span>  <span class="dot dot-blue"></span></span>' +
          '<span > <span class="Resources" data-trans-stat7> </span> <span class="dot dot-gray"></span></span>' +
          '<span > <span class="Resources" data-trans-stat6> </span> <span class="dot dot-gray"></span></span>' +
          '<span > <span class="Resources" data-trans-stat5> </span> <span class="dot dot-gray"></span></span>' +
          '<span > <span class="Resources" data-trans-stat4> </span> <span class="dot dot-purple"></span></span>' +
          '<span > <span class="Resources" data-trans-stat3> </span> <span class="dot dot-green"></span></span>' +
          '<span > <span class="Resources" data-trans-stat2> </span> <span class="dot dot-yellow"></span></span>' +
          '<span > <span class="Resources" data-trans-stat1> </span> <span class="dot dot-aqua"></span></span>';
      } else if (headName === '#projects') {
        // HRSD project statuses (Resources.js: stat8–stat14, stat28, stat30)
        statusHtml +=
          '<span> <span class="Resources" data-trans-stat28> </span>  <span class="dot dot-blue"></span></span>' +
          '<span > <span class="Resources" data-trans-stat30> </span> <span class="dot dot-gray"></span></span>' +
          '<span > <span class="Resources" data-trans-stat14> </span> <span class="dot dot-gray"></span></span>' +
          '<span > <span class="Resources" data-trans-stat13> </span> <span class="dot dot-gray"></span></span>' +
          '<span > <span class="Resources" data-trans-stat12> </span> <span class="dot dot-gray"></span></span>' +
          '<span > <span class="Resources" data-trans-stat11> </span> <span class="dot dot-purple"></span></span>' +
          '<span > <span class="Resources" data-trans-stat10> </span> <span class="dot dot-green"></span></span>' +
          '<span > <span class="Resources" data-trans-stat9> </span> <span class="dot dot-yellow"></span></span>' +
          '<span > <span class="Resources" data-trans-stat8> </span> <span class="dot dot-aqua"></span></span>';
      }
      statusHtml += '</div></div>';
  
      return statusHtml;
    }
  
    var totalSlides = Math.ceil(totalItems / itemsPerSlide);
    var indicatorsHtml =
      totalSlides > 1
        ? '<ol class="carousel-indicators" style="margin: 0;">' +
          indicators +
          '</ol>'
        : '';
  
    var carouselHtml =
      '<div id="' +
      carouselId +
      '" class="carousel slide" data-ride="carousel">' +
      '<div class="carousel-inner">' +
      (carouselInner ||
        '<div class="carousel-item active"><div class="row"><div class="col-12 m-auto text-center py-4"><p class="Resources" data-trans-nodata></p></div></div></div>') +
      '</div>' +
      '<div style="display: flex; justify-content: space-between; width: 100%; margin-top: 30px; position: relative;">' +
      getStatusHtml(headName) +
      indicatorsHtml +
      '</div>' +
      '</div>';
    // var carouselHtml =
    //   '<div id="' +
    //   carouselId +
    //   '" class="carousel slide" data-ride="carousel">' +
    //   '<div class="carousel-inner">' +
    //   carouselInner +
    //   '</div>' +
    //   '<div style="display: flex; justify-content: space-between; width: 100%; margin-top: 30px; position: relative;">' +
    //   getStatusHtml(headName) +
    //   '<div class="carousel-indicators" style="margin: 0;">' +
    //   indicators +
    //   '</div>' +
    //   '</div>' +
    //   '</div>';
  
    $(headName).html(carouselHtml);
    if (headName !== '#projects') {
      // Select the element(s) with the class 'status-deliverable'
      var elements = document.querySelectorAll('.status-deliverable');
  
      // Loop through each element and set display to 'none'
      elements.forEach(function (element) {
        element.style.display = 'none';
      });
    }
    changeResources();
    // Ensure event listener is attached only once
    if (!$(document).data('showMoreListener')) {
      $(document).data('showMoreListener', true);
  
      // Attach click event listener to each card header using event delegation
      $(document).on('click', '.show-more', function () {
        let language = localStorage.getItem('lng');
        var description = $(this).data('description');
        var title = $(this).data('title');
        var headName = $(this).data('headname');
  
        // Helper function to format the date to YYYY-MM-DD using UTC
        function formatDate(dateString) {
          if (
            dateString == null ||
            dateString === '' ||
            dateString === No_Data ||
            dateString === 'undefined' ||
            dateString === 'null'
          ) {
            return No_Data;
          }
          var date = new Date(dateString);
          if (isNaN(date.getTime())) return No_Data;
  
          var year = date.getUTCFullYear();
          var month = String(date.getUTCMonth() + 1).padStart(2, '0');
          var day = String(date.getUTCDate()).padStart(2, '0');
  
          return year + '-' + month + '-' + day;
        }
  
        function toResourceKey(value) {
          if (
            value == null ||
            value === '' ||
            value === No_Data ||
            value === 'undefined' ||
            value === 'null'
          ) {
            return 'nodata';
          }
          return String(value).toLowerCase().replace(/\s+/g, '');
        }
  
        var tableHtml;
        // Customize the horizontal table based on the headName
        if (headName === '#objectives') {
          // Set the sector and department based on the language
          let sector =
            language === 'ar'
              ? $(this).data('sectorar')
              : $(this).data('sectoren');
          let department =
            language === 'ar'
              ? $(this).data('departmentar')
              : $(this).data('departmenten');
  
          let strategymodaltype = $(this).data('type');
          var progressStatusKey = toResourceKey($(this).data('progressstatus'));
          var typeKey = toResourceKey(strategymodaltype);
  
          tableHtml = `
              <table class="table table-bordered">
                <tbody>
                  <tr>
                    <th scope="row" data-trans-objectivename class="Resources"></th>
                    <td>${$(this).data('objname') || No_Data}</td>
                  </tr>
                  <tr>
                    <th scope="row" data-trans-code class="Resources"></th>
                    <td>${title || No_Data}</td>
                  </tr>
                  <tr>
                    <th scope="row" data-trans-strategymodalprogresspercentage class="Resources"></th>
                    <td>${$(this).data('progresspercentage') || No_Data}</td>
                  </tr>
                  <tr>
                    <th scope="row" data-trans-progressstatus class="Resources"></th>
                    <td data-trans-${progressStatusKey} class="Resources"></td>
                  </tr>
                  <tr>
                    <th scope="row" data-trans-type class="Resources"></th>
                    <td data-trans-${typeKey} class="Resources"></td>
                  </tr>
                  <tr>
                    <th scope="row" data-trans-relatedobjective class="Resources"></th>
                    <td>${$(this).data('relatedobjective') || No_Data}</td>
                  </tr>
                  <tr>
                    <th scope="row" data-trans-relatedstrategy class="Resources"></th>
                    <td>${$(this).data('relatedstrategicpillar') || No_Data}</td>
                  </tr>
                  <tr>
                    <th scope="row" data-trans-sector class="Resources"></th>
                    <td>${sector || No_Data}</td>
                  </tr>
                  <tr>
                    <th scope="row" data-trans-department class="Resources"></th>
                    <td>${department || No_Data}</td>
                  </tr>
                </tbody>
              </table>`;
          $('#cardModalLabel').html(
            '<div data-trans-objectivedetails class="Resources"></div>'
          );
        } else if (headName === '#kpis') {
          // Set the sector and department based on the language
          let sector =
            language === 'ar'
              ? $(this).data('sectorar')
              : $(this).data('sectoren');
          let department =
            language === 'ar'
              ? $(this).data('departmentar')
              : $(this).data('departmenten');
          var kpiStatusKey = toResourceKey($(this).data('progressstatus'));
  
          tableHtml = `
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th scope="row" data-trans-strategymodaltitle class="Resources"></th>
                <td>${$(this).data('objname') || No_Data}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-progressstatus class="Resources"></th>
                <td data-trans-${kpiStatusKey} class="Resources"></td>
              </tr>
              <tr>
                <th scope="row" data-trans-relatedobjective class="Resources"></th>
                <td>${$(this).data('relatedstrategyobjective') || No_Data}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-relatedstrategy class="Resources"></th>
                <td>${$(this).data('relatedstrategicpillar') || No_Data}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-sector class="Resources"></th>
                <td>${sector || No_Data}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-department class="Resources"></th>
                <td>${department || No_Data}</td>
              </tr>
            </tbody>
          </table>`;
          $('#cardModalLabel').html(
            '<div data-trans-kpidetails class="Resources"></div>'
          );
        } else if (headName === '#initiatives') {
          // HRSD: Dynamo_IPhases | Tanmiah: Dynamo_GWF_Phases | fallback: Dynamo_Phases
          var currentPhase = resolveDynamoLookupName(
            ['Dynamo_IPhases', 'Dynamo_GWF_Phases', 'Dynamo_Phases'],
            $(this).data('phase'),
            language
          );
  
          var invStatusKey = toResourceKey(
            $(this).data('milestonesprogressstatus')
          );
          var prevInvStatusKey = toResourceKey(
            $(this).data('previousmilestonesprogressstatus')
          );
  
          tableHtml = `
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th scope="row" data-trans-strategymodaltitle class="Resources"></th>
                <td>${$(this).data('objname') || No_Data}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-progressstatus class="Resources"></th>
                <td data-trans-${invStatusKey} class="Resources"></td>
              </tr>
              <tr>
                <th scope="row" data-trans-strategymodalpreviousmilestonesprogressstatus class="Resources"></th>
                <td data-trans-${prevInvStatusKey} class="Resources"></td>
              </tr>
              <tr>
                <th scope="row" data-trans-strategymodalplannedstartdate class="Resources"></th>
                <td>${formatDate($(this).data('plannedstartdate'))}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-relatedobjective class="Resources"></th>
                <td>${$(this).data('relatedobjective') || No_Data}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-strategymodalphase class="Resources"></th>
                <td>${currentPhase}</td>
              </tr>
            </tbody>
          </table>`;
          $('#cardModalLabel').html(
            '<div data-trans-initiativedetails class="Resources"></div>'
          );
        } else if (headName === '#projects') {
          // Same as Tanmiah: Dynamo_Phases + Dynamo_Stages
          var currentPhase = resolveDynamoLookupName(
            ['Dynamo_Phases'],
            $(this).data('phase'),
            language
          );
          var currentStage = resolveDynamoLookupName(
            ['Dynamo_Stages'],
            $(this).data('stage'),
            language
          );
  
          var prjMsStatus = toResourceKey(
            $(this).data('milestonesprogressstatus')
          );
          var prjDelStatus = toResourceKey(
            $(this).data('deliverablesprogressstatus')
          );
          var prjCategory = toResourceKey($(this).data('category'));
  
          tableHtml = `
          <table class="table table-bordered">
            <tbody>
              <tr>
                <th scope="row" data-trans-strategymodaltitle class="Resources"></th>
                <td>${$(this).data('objname') || No_Data}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-progressstatus class="Resources"></th>
                <td data-trans-${$(this).data('status') || 'nodata'} class="Resources"></td>
              </tr>
              <tr>
                <th scope="row" data-trans-strategymodalplannedstartdate class="Resources"></th>
                <td>${formatDate($(this).data('plannedstartdate'))}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-strategymodalplannedfinishdate class="Resources"></th>
                <td>${formatDate($(this).data('plannedfinishdate'))}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-strategymodalbaselineduration class="Resources"></th>
                <td>${$(this).data('baselineduration') || No_Data}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-strategymodalactualschedulepercentagecomplete class="Resources"></th>
                <td>${
                  $(this).data('actualschedulepercentagecomplete') || No_Data
                }</td>
              </tr>
              <tr>
                <th scope="row" data-trans-relatedinitiative class="Resources"></th>
                <td>${$(this).data('relatedinitiative') || No_Data}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-strategymodalcategory class="Resources"></th>
                <td data-trans-${prjCategory} class="Resources"></td>
              </tr>
              <tr>
                <th scope="row" data-trans-strategymodalprojectscope class="Resources"></th>
                <td>${$(this).data('projectscope') || No_Data}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-strategymodalmilestonesactualprogress class="Resources"></th>
                <td>${$(this).data('milestonesactualprogress') || No_Data}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-strategymodalmilestonesplannedprogress class="Resources"></th>
                <td>${$(this).data('milestonesplannedprogress') || No_Data}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-progressstatus class="Resources"></th>
                <td data-trans-${prjMsStatus} class="Resources"></td>
              </tr>
              <tr>
                <th scope="row" data-trans-strategymodaldeliverablesactualprogress class="Resources"></th>
                <td>${$(this).data('deliverablesactualprogress') || No_Data}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-strategymodaldeliverablesplannedprogress class="Resources"></th>
                <td>${$(this).data('deliverablesplannedprogress') || No_Data}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-strategymodaldeliverablesprogressstatus class="Resources"></th>
                <td data-trans-${prjDelStatus} class="Resources"></td>
              </tr>
              <tr>
                <th scope="row" data-trans-strategymodalphase class="Resources"></th>
                <td>${currentPhase}</td>
              </tr>
              <tr>
                <th scope="row" data-trans-strategymodalstage class="Resources"></th>
                <td>${currentStage}</td>
              </tr>
            </tbody>
          </table>`;
          $('#cardModalLabel').html(
            '<div data-trans-projectdetails class="Resources"></div>'
          );
        }
  
        // Set the modal title and body content
        $('#cardModalBody').html(tableHtml); // Use .html() to insert the table HTML
        // Before showing the modal, set the data attributes
        $('#cardModal').data('datatype', headName);
        $('#cardModal').data('currentid', $(this).data('currentid'));
        changeResources();
  
        // Open the modal dialog
        $('#cardModal').modal('show');
      });
      // Handle click on the "navigate" button using event delegation
      $(document).on('click', '#navigate', function () {
        var $modal = $('#cardModal'); // Access the modal
        var type = $modal.data('datatype'); // Store the type in the modal
        var id = $modal.data('currentid'); // Store the current ID in the modal
  
        // Construct the URL based on the type and ID (HRSD ListKey mapping)
        if (type && id) {
          var listKeyMap = {
            objectives: 'sos',
            kpis: 'mainkpi',
            strpillar: 'spillars',
            substr: 'goalstrategy',
            strvalue: 'goalstrategy',
            initiatives: 'initiatives',
            projects: 'projects',
          };
          var rawKey = String(type).replace(/^#/, '');
          var listKey = listKeyMap[rawKey] || rawKey;
          url =
            `${_spPageContextInfo.webAbsoluteUrl}/SitePages/View.aspx?ListKey=` +
            listKey +
            '&IID=' +
            id;
        }
  
        // Open the constructed URL in a new tab
        window.open(url, '_blank');
      });
    }
  }
  