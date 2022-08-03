var ActualBudget = 0,
    AssignedBudget = 0,
    EstimatedBudget = 0,
    phaseNameArray = [],
    subsectorNameArray = [],
    phasesArrayCodes = [],
    phaseOccurence = [],
    phaseOccurenceReverse = [],
    phaseLabels = [],
    prioritLabels = [],
    priorityOccurence = [],
    progressOccurence = [],
    progressOccurenceSchedule = [],

    numberofProjects = 0,
    UProjectsNames = [],
    Riskarray = [],
    Issuearray = [],
    Deliverablesarray = [],
    ExpDeliverablesarray = [],
    FutDeliverablesarray = [],
    projectprogress,
    ProgressNamearray = [],
    NTasks = 0,
    RSupport = 0,
    PriorityCardhtml = '',
    RisksCount = 0,
    IssuesCount = 0,
    Riskshtml = '',
    toatlamountAllofProjectminusspercent, Taskarray = [],
    TasksCount = 0,
    TitleHTML = '',
    projectPortfolioCode = '',
    projectSector = '',
    portfoliosData = [],
    percentageofRisks = 0,
    percentageofIssues = 0,
    percentageofTasks = 0,
    lastChar1, ExistVar, ExistVar2, ExistVar1;
var myFont = isArabic ? 'LTBukra' : 'Effra';
window.SectorsData = [];
var ScheduleProgressStatusarray = [];

var PriorityName = [],
    ProgressName = [],
    PriorityNum = [],
    PriorityStatus = [],
    prev;
var Priorities = [];
var Progressarray = [];
var phaseOccurenceCount;
var strategyarray = [];
var RiskImpact = [];
var Hight = 0;
var Medium = 0;
var Low = 0;
var totalforhidext = 0;
var totalforhidint = 0;
var phasesrevrse = [],
    phasesoccurencesreverse = [];
var BudgetLabels = [];
var budgetData = [];
var axeposition;
var BudgetLabelsAr = [Resources.ar["remaining"], Resources.ar["assignedbudget"], Resources.ar["cost"]];
var BudgetLabelsEn = [Resources.en["assignedbudget"], Resources.en["cost"], Resources.en["remaining"]];

var statusOccuresData = ['stat3', 'stat1', 'stat5', 'stat2', 'stat4']

if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
    BudgetLabels = BudgetLabelsAr;
    axeposition = "right";
} else {
    BudgetLabels = BudgetLabelsEn;
    axeposition = "left";
}
if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
    var No_Data = 'لا يوجد'
} else {
    var No_Data = 'Not Found'
}


window.UProjects = [];
var iconstagesm = require('../../../HelperRessources/img/icon-stage-sm.png');
var iconstatustimesm = require('../../../HelperRessources/img/icon-status-time-sm.png');
var calendar = require('../../../HelperRessources/img/calendar.svg');
var iconimportantsm = require('../../../HelperRessources/img/icon-important-sm.png');
var iconstrategysm = require('../../../HelperRessources/img/analysis.png');
var risk = require('../../../HelperRessources/img/risk.svg');
var progress = require('../../../HelperRessources/img/progress.svg');
var mizania = require('../../../HelperRessources/img/mizania.svg');
// var iconstagesm = '';
// var iconstatustimesm = '';
// var calendar = '';
// var iconimportantsm = '';
// var iconstrategysm = '';
// var risk = '';
// var progress = '';
// var mizania = '';

// new repo 

//filter vars
var PQuery = '<View><Query><Where><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>',
    originalstate = true,
    FilterChoices = [],
    phasefilterarray = [],
    priorityfilterarray = [],
    progressfilterarray = [],
    progressstatusarray = [],
    progressstatusarrayALL = [],
    Query_Body = '',
    Where_Body = '',
    ViewFields = '',
    isAscending;
originalstate = true,
    FilterChoices = [],
    subsectorfilterarray = [],
    Query_Body = '',
    Where_Body = '',
    ViewFields = '',
    isAscending;
var portfoliosName = [];
var reversePortfoliosArray = [];


var Noverylate = 0,
    Nolate = 0,
    Noonplan = 0,
    Noahead = 0,
    TheCost = 0;

window.Project_Info_Request = {
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function () {
        if ($('.d-flex').length) {
            clearInterval(checkHomeStatusHtml);
            //username
            $('.user-name').text(UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join(''));
            $('.user-name-full').text(UserN.Title);
            $('.btn-toolbar.mb-2.mb-md-0.mx-2.page-filter').append(forfilterQuery);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                Project_Info_Request.init();
                Main_Stages_Data_Request.init();
            });
        }
    },
    // The main Initialization function
    init: function () {
        console.log("inside init Project_Info_Request")
        if (originalstate) {
            //*****call charts filteration */
            PQuery = AccessQuery;
            // console.log('Acces Queryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',AccessQuery);
            //**** Start*/check user rule and buld query to get projects;
            $(ChartHide).hide();
            //**** End*/check user rule and buld query to get projects;
        }

        // PQuery = PQuery.replace('</Query>', '</Query>' + '<ViewFields><FieldRef Name="Phase" /><FieldRef Name="Status" /></ViewFields>')

        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle(ListArray[0].projects);
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(PQuery);

        Project_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only

        clientContext.load(Project_Info_Request.g.collListItem);

        clientContext.executeQueryAsync(
            Function.createDelegate(this, Project_Info_Request.onSuccess),
            Function.createDelegate(this, Project_Info_Request.onError)
        );

    },
    onSuccess: function (sender, args) {

        var collListItem = Project_Info_Request.g.collListItem;
        Project_Info_Request.g.listItemEnum = collListItem.getEnumerator();
        var projectshtml = '',
            projectname, phasename, projectcode, priority, prioritytohandlefilter, projectType, strategy;
        var internalProjectHtml = '',
            externalProjectHtml = '',
            internalProjectCount = 0,
            externalProjectCount = 0;
        var phaseCodeArray = [];
        var Priorityarray = [];
        var ProgressStatusarray = [];
        var subsectorCodeArray = [];
        var projectPercentageSchedual = 0;
        while (Project_Info_Request.g.listItemEnum.moveNext()) {
            var oListItem = Project_Info_Request.g.listItemEnum.get_current();
            var ScheduleProjectPercentageComplete;

            if (oListItem.get_item('Status') != "Completed" && oListItem.get_item('Status') != "Cancelled") {
                //getting 1st stats data
                ActualBudget += oListItem.get_item('ActualBudget') || 0; //masroufa
                AssignedBudget += oListItem.get_item('AssignedBudget') || 0; // total budget
                EstimatedBudget += oListItem.get_item('EstimatedCost') || 0; //mutabakia

                projectPercentageSchedual = oListItem.get_item('ScheduleProjectPercentageComplet0') || 0

                numberofProjects++;
                //projects listing
                projectname = oListItem.get_item('Name') || No_Data;
                projectcode = oListItem.get_item('Title') || No_Data; //.replace(/[^a-z0-9]/gi, '')
                phases = oListItem.get_item('Phase') ? oListItem.get_item('Phase') : No_Data;

                priority = oListItem.get_item('Priority') || "nodata";

                subsector = oListItem.get_item('SubSector') ? oListItem.get_item('SubSector') : No_Data;
                // console.log('priority', priority);
                var phasename, phasecode;
                if (localStorage.getItem('Dynamo_Phases') != null) {
                    phasesArray = JSON.parse(localStorage.getItem("Dynamo_Phases") || "[]");
                    phasesArray = phasesArray.filter(function (a) {
                        return a.code == phases
                    });

                    if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                        phasename = phasesArray.length ? phasesArray[0].name : '';
                    } else phasename = phasesArray.length ? phasesArray[0].nameEn : '';
                    phasecode = phasesArray.length ? phasesArray[0].code : '';
                }

                var subsectorname, substorcode;
                if (localStorage.getItem('Dynamo_Internal Entities') != null) {
                    subsectorArray = JSON.parse(localStorage.getItem("Dynamo_Internal Entities") || "[]");
                    subsectorArray = subsectorArray.filter(function (a) {
                        return a.code == subsector
                    });
                    if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                        subsectorname = subsectorArray.length ? subsectorArray[0].name : '';
                    } else subsectorname = subsectorArray.length ? subsectorArray[0].nameEn : '';
                    substorcode = subsectorArray.length ? subsectorArray[0].code : '';
                }


                ProgressStatus = oListItem.get_item('ProjectProgressStatus') || "nodata";
                ScheduleProjectPercentageComplete = oListItem.get_item('ScheduleProjectPercentageComplet0') || 0;
                ScheduleProgressStatusarray.push(ScheduleProjectPercentageComplete)
                projectPortfolioCode = oListItem.get_item('Portfolio') || No_Data;
                projectSector = oListItem.get_item('Sector') || No_Data;

                projectType = oListItem.get_item('ProjectType') || "nodata";
                strategy = oListItem.get_item('IsStrategicProject') || "no";
                // console.log('strategy', strategy);

                if (originalstate) // in original state before any filter [before culminating data]
                {
                    phasefilterarray.push({ "code": phasecode, "name": phasename });
                    phasefilterarray.sort((a, b) => (a.code > b.code ? 1 : -1));
                    subsectorfilterarray.push({ "code": substorcode, "name": subsectorname });
                    subsectorfilterarray.sort((a, b) => (a.code > b.code ? 1 : -1));
                    uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
                    phasefilterarray = uniqueArray(phasefilterarray);
                    subsectorfilterarray = uniqueArray(subsectorfilterarray);
                    Priorities.push(priority);
                    priorityfilterarray = uniqueArray(Priorities);
                    Progressarray.push(ProgressStatus);
                    progressfilterarray = uniqueArray(Progressarray);
                }


                projectshtml = '<div id class="card ProjectCards ' + projectType + ' " >' +
                    '<div class="card-header bg-white" id="headingProject' + projectcode + '">' +
                    '<div class="acc-header mb-0 py-3 px-2 d-flex justify-content-between collapsed" data-toggle="collapse" data-target="#collapseProject' + projectcode + '" aria-expanded="false" aria-controls="collapseProject' + projectcode + '">' +
                    '<h4 class="acc-title d-inline-flex"><a href="' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/ProjectHome.aspx?PCODE=' + oListItem.get_item('Title') + '">' + projectname + '<a/></h4>' +
                    '<div class="d-inline-flex flex-column mx-2 ' + phases + '">' +
                    // '<h4 class="text-warning">' + phasename + '</h4>' +
                    '<span class="des-13 d-flex"><img src="' + iconstagesm + '" class="h-100" data-themekey="#"><span data-trans-filter1 class="state-val mx-2 Resources"></span></span>' +
                    '<h4 class="text-warning">' + phasename + '</h4>' +
                    '</div>' +
                    '<div class="d-inline-flex flex-column mx-2 ' + ProgressStatus + ' ">' + //deliv-status
                    // '<h4 data-trans-' + ProgressStatus + '  data-prname="' + projectcode + '" class="Resources"></h4>' +
                    '<span class="des-13 d-flex " ><img src="' + iconstatustimesm + '" class="h-100" data-themekey="#"><span data-trans-completionstatus class="complition-val mx-2 Resources"></span></span>' +
                    '<h4 data-trans-' + ProgressStatus + '  data-prname="' + projectcode + '" class="Resources"></h4>' +
                    '</div>' +
                    '<div class="d-inline-flex flex-column mx-2">' +
                    // '<h4 data-trans-' + priority + ' class="black Resources" ></h4>' +
                    '<span class="des-13 d-flex"><img src="' + iconimportantsm + '" class="h-100" data-themekey="#"><span data-trans-Importance class="v-important-val mx-2 Resources"></span></span>' +
                    '<h4 data-trans-' + priority + ' class="black Resources" ></h4>' +
                    '</div>' +
                    '<div class="d-inline-flex flex-column mx-2">' +
                    // '<h4 data-trans-' + strategy + ' class="black Resources"></h4>' +
                    '<span class="des-13 d-flex"><img src="' + iconstrategysm + '" class="h-100" data-themekey="#"><span data-trans-strategy class="v-important-val mx-2 Resources"></span></span>' +
                    '<h4 data-trans-' + strategy + ' class="black Resources"></h4>' +
                    '</div>' +
                    '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div id="collapseProject' + projectcode + '" class="collapse" aria-labelledby="headingProject' + projectcode + '" data-parent="#accordionProject" style="">' +
                    '<div class="card-body">' +
                    '<div class="d-flex justify-content-between pb-2">' +
                    '<div class="d-inline-flex flex-row mx-2">' +
                    '<a href="' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=issues&PCODE=' + projectcode + '">' +
                    '<span class="project-inner inner-data1">' +
                    '<img src="' + calendar + '" class="" data-themekey="#">' +
                    '<span data-trans-Issues class="mx-2 inner-title des-12 reg Resources"></span>' +
                    '<span data-prname="' + projectcode + '" class="inner-val fnt-14 bold">12</span>' +
                    '</span>' +
                    '</a>' +
                    '</div>' +
                    '<div class="d-inline-flex flex-row mx-2">' +
                    '<a href="' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/Listing.aspx?ListKey=risks&PCODE=' + projectcode + '">' +
                    '<span class="project-inner inner-data2">' +
                    '<img src="' + risk + '" class="" data-themekey="#">' +
                    '<span data-trans-Risks class="mx-2 inner-title des-12 reg Resources"></span>' +
                    '<span data-prname="' + projectcode + '" class="inner-val fnt-14 bold">12</span>' +
                    '</span>' +
                    '</a>' +
                    '</div>' +
                    '<div class="d-inline-flex flex-row mx-2">' +
                    '<span class="project-inner inner-data3">' +
                    '<img src="' + progress + '" class="" data-themekey="#">' +
                    '<span data-trans-CompletionPercentage class="mx-2 inner-title des-12 reg Resources"></span>' +
                    '<span data-prname="' + projectcode + '" class="inner-val fnt-14 bold"> ' + projectPercentageSchedual + ' %</span>' +
                    '</span>' +
                    '</div>' +
                    '<div class="d-inline-flex flex-row mx-2">' +
                    '<span class="project-inner inner-data4">' +
                    '<img src="' + mizania + '" class="" data-themekey="#">' +
                    '<span data-trans-BudgetExpenditure class="mx-2 inner-title des-12 reg Resources"></span>' +
                    '<span data-prname="' + projectcode + '" class="inner-val fnt-14 bold">' + Project_Info_Request.g.kFormatter(ActualBudget) + '</span>' +
                    '</span>' +
                    '</div>' +
                    '<div class="d-inline-flex flex-row mx-2" style="display:none !important">' +
                    '<span class="project-inner inner-data5">' +
                    '<img src="' + mizania + '" class="" data-themekey="#">' +
                    '<span data-trans-Portfolio class="mx-2 inner-title des-12 reg Resources"></span>' +
                    '<span title="' + projectPortfolioCode + '" data-prname="' + oListItem.get_item('Title') + '" class="inner-val fnt-14 bold portfolioName"></span>' +
                    '</span>' +
                    '</div>' +
                    '<div class="d-inline-flex flex-row mx-2" style="display:none !important">' +
                    '<span class="project-inner inner-data6">' +
                    '<img src="' + mizania + '" class="" data-themekey="#">' +
                    '<span data-trans-Section class="mx-2 inner-title des-12 reg Resources"></span>' +
                    '<span title="' + projectSector + '" data-prname="' + oListItem.get_item('Title') + '" class="inner-val fnt-14 bold SectorName"></span>' +
                    '</span>' +
                    '</div>' +
                    '<div class="d-inline-flex flex-row mx-2" style="width:20px">' +

                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';


                if (projectType === "Internal") {
                    internalProjectHtml += projectshtml;

                    internalProjectCount = internalProjectCount + 1;
                } else if (projectType === "External") {
                    externalProjectHtml += projectshtml;
                    externalProjectCount = externalProjectCount + 1;
                }

                phaseCodeArray.push(phases);
                subsectorCodeArray.push(subsector);
                Priorityarray.push(priority);
                ProgressStatusarray.push(ProgressStatus);
                // console.log('internalProjectHtml', 'internalProjectHtml');

                UProjectsNames.push(projectname);
                UProjects.push(projectcode);
                // console.log('strategy', strategy)
                if (strategy == true || strategy == "true" || strategy == "yes" || strategy == "Yes") {
                    strategyarray.push("yes");
                } else strategyarray.push("no")
                // console.log('strategyarray', strategyarray)
            }
        }

        const arrToInstanceCountObj = arr => arr.reduce((obj, e) => {
            obj[e] = (obj[e] || 0) + 1;
            return obj;
        }, {});

        //projectTypecount
        $('#externalProjectCount').html(externalProjectCount);
        $('#internalProjectCount').html(internalProjectCount);

        totalforhidext = externalProjectCount;
        totalforhidint = internalProjectCount;
        //Project Progress
        //Sort Priority
        ProgressStatusarray.sort();

        console.log(progressfilterarray, "progressfilterarray")
        progressOccurenceObject = arrToInstanceCountObj(ProgressStatusarray);
        // progressfilterarray.forEach(function (element) {
        //     if (progressOccurenceObject[element]) {
        //         progressOccurence.push(progressOccurenceObject[element]);
        //     } else progressOccurence.push(0);
        // });
        //////////////////////////////////////////
        statusOccuresData.forEach(function (element) {
            if (progressOccurenceObject[element]) {
                progressOccurence.push(progressOccurenceObject[element]);
            } else progressOccurence.push(0);
        })
        ///////////////////////
        //Get Priority Name from Resources using priority code
        statusOccuresData.forEach(function (element) {
            if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                ProgressName.push(Resources.ar[element])
            } else ProgressName.push(Resources.en[element])
        });
        // progressfilterarray.forEach(function (element) {
        //     if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
        //         ProgressName.push(Resources.ar[element])
        //     } else ProgressName.push(Resources.en[element])
        // });



        //Sort Priority
        Priorityarray.sort();
        // console.log('Priorityarray', Priorityarray);
        priorityOccurenceObject = arrToInstanceCountObj(Priorityarray);
        priorityfilterarray.forEach(function (element) {
            if (priorityOccurenceObject[element]) {
                priorityOccurence.push(priorityOccurenceObject[element]);
            } else priorityOccurence.push(0);
        });

        //Get Priority Name from Resources using priority code
        priorityfilterarray.forEach(function (element) {
            if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                PriorityName.push(Resources.ar[element])
            } else PriorityName.push(Resources.en[element])
        });


        //Phase
        phaseCodeArray.sort();
        subsectorCodeArray.sort();
        // console.log('phaseCodeArray', phaseCodeArray);
        var phaseOccurenceNumb = arrToInstanceCountObj(phaseCodeArray);

        phasefilterarray.forEach(function (element) {
            if (phaseOccurenceNumb[element.code]) {
                phaseOccurence.push(phaseOccurenceNumb[element.code]);
            } else phaseOccurence.push(0);
        });

        phasefilterarray.forEach(element => phaseNameArray.push(element.name));
        subsectorfilterarray.forEach(element => subsectorNameArray.push(element.name));
        // console.log('phaseOccurence', phaseOccurence);
        handlePhaseChartBarChart();
        handlePriorityChartBarChart();


        $('.projects-ctx .PNumber').text(numberofProjects);
        $('div#accordionProject.internalAccordion').html(internalProjectHtml);
        $('div#accordionProject.externalAccordion').html(externalProjectHtml);


        progressstatusarrayALL = progressstatusarray;
        // console.log('progressstatusarrayALL', progressstatusarrayALL);

        if (originalstate) // handling filters  [after culminating data]
        {
            var phasefilterhtml = '<label class="dropdown-item main-action-filter"><button data-trans-CanselSelections class="clear-filter Resources" type="button"></button></label>';
            for (var i = 0; i < phasefilterarray.length; i++) {
                phasefilterhtml += '<label class="dropdown-item"><span>' + phasefilterarray[i].name + '</span><input data-type="Text" data-internal="Phase" type="checkbox" name="Phase" value="' + phasefilterarray[i].code + '"></label>';
            }
            $('.content-list-head .page-filter .dropdown-menu.Filter-1').html(phasefilterhtml);



            var subsectorfilterhtml = '<label class="dropdown-item main-action-filter"><button data-trans-CanselSelections class="clear-filter Resources" type="button"></button></label>';
            for (var i = 0; i < subsectorfilterarray.length; i++) {
                subsectorfilterhtml += '<label class="dropdown-item"><span>' + subsectorfilterarray[i].name + '</span><input data-type="Text" data-internal="SubSector" type="checkbox" name="SubSector" value="' + subsectorfilterarray[i].code + '"></label>';
            }
            $('.content-list-head .page-filter .dropdown-menu.Filter-5').html(subsectorfilterhtml);


            var priorityfilterhtml = '<label class="dropdown-item main-action-filter"><button data-trans-CanselSelections class="clear-filter Resources" type="button"></button></label>';
            for (var i = 0; i < priorityfilterarray.length; i++) {
                priorityfilterhtml += '<label class="dropdown-item"><span data-trans-' + priorityfilterarray[i] + ' class="Resources" ></span><input data-type="Text" data-internal="Priority" type="checkbox" name="Priority" value="' + priorityfilterarray[i] + '"></label>';
            }
            $('.content-list-head .page-filter .dropdown-menu.Filter-2').html(priorityfilterhtml);

            //filter progress status array
            var progressfilterhtml = '<label class="dropdown-item main-action-filter"><button data-trans-CanselSelections class="clear-filter Resources" type="button"></button></label>';
            for (var i = 0; i < progressfilterarray.length; i++) {
                progressfilterhtml += '<label class="dropdown-item"><span data-trans-' + progressfilterarray[i] + ' class="Resources" ></span><input data-type="Text" data-internal="ProjectProgressStatus" type="checkbox" name="ProjectProgressStatus" value="' + progressfilterarray[i] + '"></label>';
            }
            $('.content-list-head .page-filter .dropdown-menu.Filter-3').html(progressfilterhtml);


            strategyarray = strategyarray.reduce(function (acc, curr) {
                if (typeof acc[curr] == 'undefined') {
                    acc[curr] = 1;
                } else {
                    acc[curr] += 1;
                }
                return acc;
            }, {});
            var filterstrategy = Object.keys(strategyarray),
                strategyfilterhtml = '<label class="dropdown-item main-action-filter"><button data-trans-CanselSelections class="clear-filter Resources" type="button"></button></label>';
            // console.log('filterstrategy', filterstrategy);
            for (var i = 0; i < filterstrategy.length; i++) {
                if (filterstrategy[i] != No_Data) {
                    strategyfilterhtml += '<label class="dropdown-item"><span data-trans-' + filterstrategy[i] + ' class="Resources"></span><input data-type="Integer" data-columntype="Boolean" data-internal="IsStrategicProject" type="checkbox" name="IsStrategicProject" value="' + filterstrategy[i] + '"></label>';
                }
                // if (filterstrategy[i] != No_Data) {
                //     strategyfilterhtml += '<label class="dropdown-item"><span data-trans-' + filterstrategy[i] + ' class="Resources"></span><input data-type="text" data-internal="IsStrategicProject" type="checkbox" name="IsStrategicProject" value="' + filterstrategy[i] + '"></label>';
                // }
            }
            $('.content-list-head .page-filter .dropdown-menu.Filter-4').html(strategyfilterhtml);

            //End of filters

            $('button.clear-filter').on("click", function (e) {
                console.log("INSIDE Clear-filter")
                e.stopPropagation();
                if ($(this).closest('.dropdown-menu').find('input:checkbox:checked').length) {
                    $(this).closest('.dropdown-menu').find('input:checkbox').prop({
                        "checked": false,
                        "disabled": true
                    }).trigger('change');
                }
            });
            Project_Info_Request.g.filtertrigger(); // filter trigger

        }
        Project_Info_Request.g.statisticsbars(); //assigning data to stats

        Project_Info_Request.g.handlescrollview(); //intialize viewelement in scroll
        //
        //calling other data

        Risks_Info_Request.init();


        Deliverables_Info_Request.init();
        // Project_Info_Request.g.showprojectonclick(); //view more action


        changeResources();

        $('body').animate({
            opacity: 1
        }, {
            duration: 333,
            complete: function () {
                $('.page-filter .dropdown-menu label.dropdown-item input:checkbox').prop({
                    "disabled": false
                });
            }
        });
        $('div#particles-foreground, div#particles-background, .vertical-centered-box').animate({
            opacity: 0
        }, {
            duration: 333,
            complete: function () {
                $('div#particles-foreground, div#particles-background, .vertical-centered-box').remove();

            }
        });

        if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
            $('.page-title').html(ar_UserRole);
        } else $('.page-title').html(en_UserRole);



        if (originalstate) {
            Project_Info_Request.g.ChartsFilteration();
        }
        PortfoliosInfoRequest.preinit();
        SectorsInfoRequest.preinit();
    },
    onError: function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {
        filtertrigger: function () {
            $('.page-filter .dropdown-menu label input:checkbox').change(function (e) {
                FilterChoices = [];
                portfoliosdata = [];
                portfoliosoptions = [];
                console.log("inside filter trigger  in main home")

                $('.page-filter .dropdown-menu').each(function () { //looping through filters

                    var internalName = $(this).find('input:checkbox').data("internal");
                    var fieldType = $(this).find('input:checkbox').data("type");
                    var BooleanfieldType = $(this).find('input:checkbox').data("columntype");
                    // console.log('BooleanfieldType', BooleanfieldType);
                    var selectedchoices = $(this).find('input:checked').map(function () { //getting selected choices
                        return $(this).val();
                    }).get();
                    if (selectedchoices.length) //checking if there are choices
                    {
                        if (BooleanfieldType == "Boolean") {

                            for (i = 0; i < selectedchoices.length; i++) {
                                // console.log('selectedchoices[i]', selectedchoices[i]);
                                if (selectedchoices[i] == "true" || selectedchoices[i] == "Yes" || selectedchoices[i] == "yes") {
                                    selectedchoices[i] = 1;
                                } else selectedchoices[i] = 0;
                            }
                        }
                        FilterChoices.push({
                            internalName: internalName,
                            Type: fieldType,
                            Values: selectedchoices
                        });
                        // console.log('FilterChoices', FilterChoices);
                    }

                });
                Project_Info_Request.g.camlfilterbuilder();
            });
            $('.page-filter .dropdown-menu label.dropdown-item').on("click", function (e) {
                e.stopPropagation();
            });
        },
        camlfilterbuilder: function () {
            originalstate = false; //not in original state anymore
            Query_Body = '', Where_Body = '', ViewFields = '';
            // emptying all data arrays and floats exept for arrays related to filter
            UProjects = [], Riskarray = [], Issuearray = [], Deliverablesarray = [], Progressarray = [], ActualBudget = 0, AssignedBudget = 0, EstimatedBudget = 0, numberofProjects = 0, NTasks = 0, RSupport = 0, RisksCount = 0, IssuesCount = 0, TasksCount = 0, percentageofRisks = 0, percentageofIssues = 0, percentageofTasks = 0, PriorityCardhtml = '', progressstatusarray = [], progressstatusarrayALL = [], strategyarray = [], phaseOccurence = [], phaseOccurenceReverse = [], phaseNameArray = [], subsectorNameArray = [], Low = 0, Medium = 0, Hight = 0, priorityOccurence = [], progressOccurence = [], PriorityName = [], ProgressName = [], portfoliosName = [], window.portfoliosProjectCount = [], SectorsName = [], SectorsEnName = [], SectorsProjectCount = [], budgetData = [], ScheduleProgressStatusarray = [];;
            $('body').animate({
                opacity: .5
            }, {
                duration: 333,
                complete: function () { }
            });
            if (FilterChoices.length == 0) {
                //PQuery = '<View><Query><Where><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq></Where></Query></View>';
                PQuery = AccessQuery;
                Project_Info_Request.init();
            } else //if there are choices build caml query
            {
                $('#clearAllFilter').prop('disabled', false);
                $('.page-filter .dropdown-menu label.dropdown-item input:checkbox').prop({
                    "disabled": true
                });
                for (var k = 0; k < FilterChoices.length; k++) {
                    ViewFields += '<FieldRef Name="' + FilterChoices[k].InternalName + '"/>'
                }
                Where_Body = '<And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq>';
                //dynamic query building
                for (var i = 0; i < FilterChoices.length; i++) {
                    //only one choice
                    if (FilterChoices.length == 1) {
                        Where_Body += '<In><FieldRef Name="' + FilterChoices[i].internalName + '" /><Values>';
                        for (var j = 0; j < FilterChoices[i].Values.length; j++) {
                            Where_Body += '<Value Type="' + FilterChoices[i].Type + '">' + FilterChoices[i].Values[j] + '</Value>';
                        }
                        Where_Body += '</Values></In>';
                    }
                    //Two choices
                    else if (FilterChoices.length == 2) {
                        if (i == 0) {
                            Where_Body += '<And><In><FieldRef Name="' + FilterChoices[i].internalName + '" /><Values>';
                            for (var j = 0; j < FilterChoices[i].Values.length; j++) {
                                Where_Body += '<Value Type="' + FilterChoices[i].Type + '">' + FilterChoices[i].Values[j] + '</Value>';
                            }
                            Where_Body += '</Values></In>';
                        } else {
                            Where_Body += '<In><FieldRef Name="' + FilterChoices[i].internalName + '" /><Values>';
                            for (var j = 0; j < FilterChoices[i].Values.length; j++) {
                                Where_Body += '<Value Type="' + FilterChoices[i].Type + '">' + FilterChoices[i].Values[j] + '</Value>';
                            }
                            Where_Body += '</Values></In></And>';
                        }
                    }
                    //More than two choices
                    else if (FilterChoices.length > 2) {
                        //two Eqs in last And
                        if (i == FilterChoices.length - 1) {
                            Where_Body += '<In><FieldRef Name="' + FilterChoices[i].internalName + '" /><Values>';
                            for (var j = 0; j < FilterChoices[i].Values.length; j++) {
                                Where_Body += '<Value Type="' + FilterChoices[i].Type + '">' + FilterChoices[i].Values[j] + '</Value>';
                            }
                            Where_Body += '</Values></In>';

                            //appending And closure
                            var count = (Where_Body.match(/<And>/g) || []).length;
                            var ANDC = "</And>".repeat(count);
                            Where_Body += ANDC;
                        }
                        //normal And
                        else {
                            Where_Body += '<And><In><FieldRef Name="' + FilterChoices[i].internalName + '" /><Values>';
                            for (var j = 0; j < FilterChoices[i].Values.length; j++) {
                                Where_Body += '<Value Type="' + FilterChoices[i].Type + '">' + FilterChoices[i].Values[j] + '</Value>';
                            }
                            Where_Body += '</Values></In>';
                        }
                    }
                    // Where_Body += '</And>';
                    //Finish Line, make last changes and build query
                    if (i == FilterChoices.length - 1) {
                        Where_Body.replace('Type="DateTime"', 'IncludeTimeValue="False" Type="DateTime"');
                        //    console.log(Where_Body);
                        Query_Body = '<View>' +
                            // '<ViewFields>' + //use it for paging jsom calls
                            //     ViewFields
                            // '</ViewFields>' +
                            '<Query>' +

                            '<Where>' + Where_Body + '</And></Where>' +
                            // '<OrderBy>' +
                            // '<FieldRef Name="' + sortColumn + '" Ascending="'+isAscending+'" />' +
                            // '</OrderBy>' +
                            '</Query>' +
                            // '<RowLimit>' + pageSize + '</RowLimit>'+
                            '</View>';
                        PQuery = Query_Body;
                        Project_Info_Request.init();
                    }
                }

            }

            if ($('.page-filter .dropdown-menu').find('input:checkbox:checked').length == 0) {
                $('#clearAllFilter').prop('disabled', true);
            }
            $('#clearAllFilter').off().on("click", function (e) { // add .off() to make sure that the onclick invoke one time and the camlfilterbuilder() will render once
                e.stopPropagation();


                if ($('.page-filter .dropdown-menu').find('input:checkbox:checked').length) {

                    $('.page-filter .dropdown-menu:not(#forQueryAccess)').find('input:checkbox').prop({ // add:not(#forQueryAccess) to get only the related project not all when clear all filter 
                        "checked": false,
                        "disabled": true
                    });
                }
                FilterChoices = [];
                Project_Info_Request.g.camlfilterbuilder();


                if ($('.page-filter .dropdown-menu').find('input:checkbox:checked').length == 0) {
                    // $('.clearAllFilter').addClass('noOptionSelected');
                    $('#clearAllFilter').prop('disabled', true);
                }
            });
        },
        statisticsbars: function () { },
        handlescrollview: function () {
            $.fn.isInViewport = function () {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();

                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();

                return elementBottom > viewportTop && elementTop < viewportBottom;
            };
        },
        showprojectonclick: function () {
            $('.accordion#accordionProject.internalAccordion a.view-more').on("click", function () {
                var internalselector = $('.accordion#accordionProject.internalAccordion > .card').not(':visible');
                internalselector.prevObject.length = 5;
                var internalvisiblelength = $('.accordion#accordionProject.internalAccordion > .card:visible').length;
                var internaltt = internalvisiblelength + 6;
                var internaltoshow = $('.accordion#accordionProject.internalAccordion > .card:hidden:nth-child(-n+' + internaltt + ')');
                setTimeout(function () {
                    internaltoshow.each(function () {
                        $(this).css('display', 'block').animate({
                            opacity: 1,
                            height: 75.5
                        }, {
                            duration: 333,
                            complete: function () {
                                $(this).attr('style', 'display: block; opacity: 1; height: auto;');
                            }
                        });
                    });
                    //rechecking visibility
                    internalvisiblelength = $('.accordion#accordionProject.internalAccordion > .card:visible').length;
                    internaltt = internalvisiblelength + 6;
                    internaltoshow = $('.accordion#accordionProject.internalAccordion > .card:hidden:nth-child(-n+' + internaltt + ')');
                    if (internaltoshow.length == 0) {
                        $('.accordion#accordionProject.internalAccordion a.view-more').animate({
                            opacity: 0,
                            height: 0
                        }, {
                            duration: 333,
                            complete: function () {
                                $('.accordion#accordionProject.internalAccordion a.view-more').attr('style', 'display: none!important;');
                            }
                        });
                        $('.accordion#accordionProject.internalAccordion a.view-less').animate({
                            opacity: 1,
                            height: 34
                        }, {
                            duration: 333,
                            complete: function () {
                                $('.accordion#accordionProject.internalAccordion a.view-less').attr('style', 'display: block;');
                            }
                        });
                    }
                }, 133);
            });
            $('.accordion#accordionProject.internalAccordion a.view-less').on("click", function () {
                var tohide = $('.accordion#accordionProject.internalAccordion > .card:nth-child(n+4)');
                setTimeout(function () {
                    tohide.each(function () {
                        $(this).animate({
                            opacity: 0,
                            height: 0
                        }, {
                            duration: 333,
                            complete: function () {
                                $(this).attr('style', 'display: none;');
                            }
                        });
                    });
                }, 133);
                $('.accordion#accordionProject.internalAccordion a.view-less').animate({
                    opacity: 0,
                    height: 0
                }, {
                    duration: 333,
                    complete: function () {
                        $('.accordion#accordionProject.internalAccordion a.view-more').animate({
                            opacity: 1,
                            height: 34
                        }, {
                            duration: 333,
                            complete: function () {
                                $('.accordion#accordionProject.internalAccordion a.view-more').attr('style', 'display: block;');
                            }
                        });
                    }
                });
            });
            $('.accordion#accordionProject.externalAccordion a.view-more').on("click", function () {
                var externalselector = $('.accordion#accordionProject.externalAccordion > .card').not(':visible');
                externalselector.prevObject.length = 5;
                var externalvisiblelength = $('.accordion#accordionProject.externalAccordion > .card:visible').length;
                var externaltt = externalvisiblelength + 6;
                var externaltoshow = $('.accordion#accordionProject.externalAccordion > .card:hidden:nth-child(-n+' + externaltt + ')');
                setTimeout(function () {
                    externaltoshow.each(function () {
                        $(this).css('display', 'block').animate({
                            opacity: 1,
                            height: 75.5
                        }, {
                            duration: 333,
                            complete: function () {
                                $(this).attr('style', 'display: block; opacity: 1; height: auto;');
                            }
                        });
                    });
                    //rechecking visibility
                    externalvisiblelength = $('.accordion#accordionProject.externalAccordion > .card:visible').length;
                    externaltt = externalvisiblelength + 6;
                    externaltoshow = $('.accordion#accordionProject.externalAccordion > .card:hidden:nth-child(-n+' + externaltt + ')');
                    if (externaltoshow.length == 0) {
                        $('.accordion#accordionProject.externalAccordion a.view-more').animate({
                            opacity: 0,
                            height: 0
                        }, {
                            duration: 333,
                            complete: function () {
                                $('.accordion#accordionProject.externalAccordion a.view-more').attr('style', 'display: none!important;');
                            }
                        });
                        $('.accordion#accordionProject.externalAccordion a.view-less').animate({
                            opacity: 1,
                            height: 34
                        }, {
                            duration: 333,
                            complete: function () {
                                $('.accordion#accordionProject.externalAccordion a.view-less').attr('style', 'display: block;');
                            }
                        });
                    }
                }, 133);
            });
            $('.accordion#accordionProject.externalAccordion a.view-less').on("click", function () {
                var tohide = $('.accordion#accordionProject.externalAccordion > .card:nth-child(n+4)');
                setTimeout(function () {
                    tohide.each(function () {
                        $(this).animate({
                            opacity: 0,
                            height: 0
                        }, {
                            duration: 333,
                            complete: function () {
                                $(this).attr('style', 'display: none;');
                            }
                        });
                    });
                }, 133);
                $('.accordion#accordionProject.externalAccordion a.view-less').animate({
                    opacity: 0,
                    height: 0
                }, {
                    duration: 333,
                    complete: function () {
                        $('.accordion#accordionProject.externalAccordion a.view-more').animate({
                            opacity: 1,
                            height: 34
                        }, {
                            duration: 333,
                            complete: function () {
                                $('.accordion#accordionProject.externalAccordion a.view-more').attr('style', 'display: block;');
                            }
                        });
                    }
                });
            });
        },
        dateConvert: function (date) {
            if (date) {
                var local = date.getTime();
                var offset = date.getTimezoneOffset() * (60 * 1000);
                var utc = new Date(local + offset);
                var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
                var datetouse = riyadh.toLocaleString("en-US").split(',')[0].split('/');
                datetouse[0] = (datetouse[0].length == 1) ? '0' + datetouse[0] : datetouse[0];
                datetouse[1] = (datetouse[1].length == 1) ? '0' + datetouse[1] : datetouse[1];
                var datetouse2 = datetouse[1] + '/' + datetouse[0] + '/' + datetouse[2]; //dd/mm/yyy
                return datetouse2;
            } else {
                return No_Data;
            }
        },
        dateConvert2: function (date) //date format supported by standards
        {
            if (date) {
                var local = date.getTime();
                var offset = date.getTimezoneOffset() * (60 * 1000);
                var utc = new Date(local + offset);
                var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
                var datetouse = riyadh.toLocaleString("en-US").split(',')[0].split('/');
                datetouse[0] = (datetouse[0].length == 1) ? '0' + datetouse[0] : datetouse[0];
                datetouse[1] = (datetouse[1].length == 1) ? '0' + datetouse[1] : datetouse[1];
                var datetouse2 = datetouse[2] + '-' + datetouse[0] + '-' + datetouse[1]; //yyyy-mm-dd
                return datetouse2;
            } else {
                return No_Data;
            }
        },
        kFormatter: function (num) {
            return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
        },

        ChartsFilteration: function () {



            $(".CardDivall a").on("click", function (event) {
                
                ClickedChart = $(this).closest('div[id*="carditem"]').attr('id');
                //  console.log(ClickedChart);
                //clicked div //will hide
                lastChar1 = ClickedChart.substr(ClickedChart.length - 1); //container we clicked on
                //  console.log(lastChar1);
                //clicked card //will show
                var ClickedID = event.target.id

                var lastChar = ClickedID.substr(ClickedID.length - 1); //link we clicked on

                if ($('div#carditem' + lastChar).is(":hidden")) {
                    $('div#carditem' + lastChar1).before($('div#carditem' + lastChar));
                }
                $('div#carditem' + lastChar).show();
                if ($('.cardIemClass:not([style*="display: none"])').length > 2) { // to toggle the charts in two charts only
                    $('div#carditem' + lastChar1).hide();
                }


                $('div[id*=carditem]').each(function () {
                    var chartid = $(this).attr('id');
                    chartid = chartid.substr(chartid.length - 1);
                    // console.log(chartid)
                    if ($(this).is(":hidden")) {
                        $('a#CardDiv' + chartid).show();

                    } else {
                        $('a#CardDiv' + chartid).hide();

                    }
                });
            });

            //visible ,num $link

            //hide unvisible dropdown lists
            $('div[id*=carditem]').each(function () {
         
                var chartid = $(this).attr('id');
                chartid = chartid.substr(chartid.length - 1);
                //console.log(chartid)
                if ($(this).is(":hidden")) {
                    $('a#CardDiv' + chartid).show();

                } else {
                    $('a#CardDiv' + chartid).hide();

                }
            });
            //     $('.col-12.col-sm-4.px-2.mb-3').on("click",function(event) {
            //         ClickedChart = $(this).attr('id');

            //             Project_Info_Request.g.ChartsFilterationLink();
            //    });
        },
        ChartsFilterationLink: function () { //to be removed

            $("#CardDivall a").on("click", function (event) {
                console.log("SCONED")
                ClickedChart = $(this).closest('div[id*="carditem"]').attr('id');
                // console.log(ClickedChart);
                //clicked div //will hide
                lastChar1 = ClickedChart.substr(ClickedChart.length - 1);

                //clicked card //will show
                var ClickedID = event.target.id

                var lastChar = ClickedID.substr(ClickedID.length - 1);

                if ($('div#carditem' + lastChar).is(":hidden")) {
                    $('div#carditem' + lastChar1).before($('div#carditem' + lastChar));
                }
                $('div#carditem' + lastChar).show();
                if ($('.cardIemClass:not([style*="display: none"])').length > 2) { // to toggle the charts in two charts only
                    $('div#carditem' + lastChar1).hide();
                }
            });
        }
    },
};
//Risks
var Risks_Info_Request = {
    // The main Initialization function
    init: function () {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Risks');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name=\'ProjectCode\' Ascending=\'False\' /></OrderBy></Query></View>');
        Risks_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Risks_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Risks_Info_Request.onSuccess),
            Function.createDelegate(this, Risks_Info_Request.onError)
        );
    },
    onSuccess: function (sender, args) {
        console.log("INSIDE RISK")
        var collListItem = Risks_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var NRisks = 0,
            riskshtml = '',
            riskname, riskID, riskTitle;
        // ExistVar2=UProjects.includes(oListItem.get_item('ProjectCode'));
        //console.log(UProjects.includes(oListItem.get_item('ProjectCode')));
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            ExistVar2 = UProjects.includes(oListItem.get_item('ProjectCode'));

            if (UProjects.includes(oListItem.get_item('ProjectCode'))) {
                var RiskProIndex = UProjects.indexOf(oListItem.get_item('ProjectCode'));
                var RiskProName = UProjectsNames[RiskProIndex];
                //console.log(RiskProName);
                Riskarray.push(
                    oListItem.get_item('ProjectCode'),
                );
                riskTitle = oListItem.get_item('Title') || No_Data;
                riskname = oListItem.get_item('Name') || No_Data;
                riskID = oListItem.get_item('ID') || No_Data;
                var risk_impact = (oListItem.get_item('Impact') == null) ? '' : oListItem.get_item('Impact');
                // console.log('risk_impact', risk_impact);
                // console.log('risk_impact', risk_impact == 'Medium');
                //risk impact donught data
                if (risk_impact.toLowerCase() == 'low') {
                    Low = Low + 1;
                } else if (risk_impact.toLowerCase() == 'medium') {
                    Medium = Medium + 1;
                } else if (risk_impact.toLowerCase() == 'hight') {
                    Hight = Hight + 1;
                }

                riskshtml += '<li class="list-group-item">' +
                    '<a href="' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/View.aspx?ListKey=risks&IID=' + riskID + '"><h3 class="des-14 w-0">' + riskTitle + ', ' + riskname + '</h3><h3 class="des-14 w-0">' + RiskProName + '</h3></a>' +
                    '<div class="des-12 text-nowrap">' +
                    '</div>' +
                    '</li>';
                RSupport++;


            }
        }
        console.log("INSIDE RISK after while")

        // console.log('Low', Low);
        // console.log('Medium', Medium);
        // console.log('Hight', Hight);
        handleCircleRiskChart();
        //console.log(UProjects.length);
        if (!riskshtml) {
            riskshtml = '<p>' + No_Data + '</p>';
        }
        //*****start */Risk,task and issues card
        RisksCount = Riskarray.length;

        Issues_Info_Request.init();
        //*****end */Risk,task and issues card
        $('div#accordionRequiredSupport > .card:nth-child(3) ul.list-group').html(riskshtml);
        for (var i = 0; i < UProjects.length; i++) {
            var nor = Riskarray.filter((v) => (v === UProjects[i])).length;
            $('.inner-data2 .inner-val[data-prname="' + UProjects[i] + '"]').text(nor);
        }
        // $('.Rsupprot').text(RSupport);
        changeResources();


    },
    onError: function (sender, args) {
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
    init: function () {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Issues');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name=\'ProjectCode\' Ascending=\'False\' /></OrderBy></Query></View>');
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
        var NRisks = 0,
            issueshtml = '',
            issuename, issueID, issueTitle, ExistVar1;

        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            ExistVar1 = UProjects.includes(oListItem.get_item('ProjectCode'));
            if (UProjects.includes(oListItem.get_item('ProjectCode'))) {
                var IssueProIndex = UProjects.indexOf(oListItem.get_item('ProjectCode'));
                // console.log('IssueProIndex', IssueProIndex);
                var IssueProName = UProjectsNames[IssueProIndex];
                Issuearray.push(
                    oListItem.get_item('ProjectCode'),
                );

                issuename = oListItem.get_item('Name') || No_Data;
                issueTitle = oListItem.get_item('Title') || No_Data;
                issueID = oListItem.get_item('ID') || No_Data;
                issueshtml += '<li class="list-group-item">' +
                    '<a href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/View.aspx?ListKey=issues&IID=" + issueID + '"><h3 class="des-14 w-0">' + issueTitle + ', ' + issuename + '</h3><h3 class="des-14 w-0">' + IssueProName + '</h3></a>' +
                    '<div class="des-12 text-nowrap">' +
                    '</div>' +
                    '</li>';
                RSupport++;
            }

            //
        }
        if (!issueshtml) {
            taskshtml = '<p>' + No_Data + '</p>';
        }

        //*****Start */risks,isues and tasks card
        IssuesCount = Issuearray.length;
        percentageofIssues = (IssuesCount * 100) / (RisksCount + TasksCount + IssuesCount);
        //$('.ctx-block.row.mx-n2 > div:nth-child(4)  .card-body .media:nth-child(2) .d-flex span:nth-child(2)').text(IssuesCount+'123');
        $('.ctx-block.row.mx-n2 .carditem4  .card-body .media:nth-child(2) .d-flex span:nth-child(2)').text(IssuesCount);
        // $('.ctx-block.row.mx-n2 > div:nth-child(4) .card-body .media:nth-child(2) .progress-bar').css('width', percentageofIssues + '%');
        $('.ctx-block.row.mx-n2  .carditem4 .card-body .media:nth-child(2) .progress-bar').css('width', percentageofIssues + '%');



        $('div#accordionRequiredSupport > .card:nth-child(2) ul.list-group').html(issueshtml);
        for (var i = 0; i < UProjects.length; i++) {
            var nor = Issuearray.filter((v) => (v === UProjects[i])).length;
            $('.inner-data1 .inner-val[data-prname="' + UProjects[i] + '"]').text(nor);
        }
        // $('.Rsupprot').text(RSupport);
        changeResources();
        percentageofRisks = (RisksCount * 100) / (RisksCount + TasksCount + IssuesCount);
        $('.ctx-block.row.mx-n2 > div:nth-child(4)  .card-body .media:nth-child(3) .d-flex span:nth-child(2)').text(RisksCount);
        $('.ctx-block.row.mx-n2 > div:nth-child(4) .card-body .media:nth-child(3) .progress-bar').css('width', percentageofRisks + '%');
        percentageofTasks = (TasksCount * 100) / (RisksCount + TasksCount + IssuesCount);
        $('.ctx-block.row.mx-n2 > div:nth-child(4)  .card-body .media:nth-child(1) .d-flex span:nth-child(2)').text(TasksCount);
        $('.ctx-block.row.mx-n2 > div:nth-child(4) .card-body .media:nth-child(1) .progress-bar').css('width', percentageofTasks + '%');

        // console.log(RisksCount + TasksCount + IssuesCount);
        //*****end */risks,isues and tasks card
    },
    onError: function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {
        PCODE: window.location.href.split('/')[4],
    }
};

//Deliverakbles
var Noverylate = 0,
    Nolate = 0,
    Noonplan = 0,
    Noahead = 0;
var Deliverables_Info_Request = {
    // The main Initialization function
    init: function () {
        console.time()

        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Deliverables');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>'); //<Where><Geq><FieldRef Name=\'Committed_x0020_Date\' /><Value IncludeTimeValue=\'TRUE\'  Type=\'DateTime\'><Today /></Value></Geq></Where>
        Deliverables_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Deliverables_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Deliverables_Info_Request.onSuccess),
            Function.createDelegate(this, Deliverables_Info_Request.onError)
        );
    },
    onSuccess: function (sender, args) {
        console.log("INSIDE Delevrable")

        var collListItem = Deliverables_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        NODelivrables = 0;
        NDelivrables = 0;
        NDelevered = 0;
        POD = 0;
        var itemdatevalidation, itemdate;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();

            if (UProjects.includes(oListItem.get_item('ProjectCode'))) {
                Deliverablesarray.push({
                    pcode: oListItem.get_item('ProjectCode'),
                    delivered: oListItem.get_item('Delivered'),
                    ammount: oListItem.get_item('Weight'),
                    Code: oListItem.get_item('Title')
                });
                NDelivrables++;
                //
                itemdate = Project_Info_Request.g.dateConvert(oListItem.get_item('CommittedDate')) || No_Data;
                itemdatevalidation = Project_Info_Request.g.dateConvert2(oListItem.get_item('CommittedDate'));
                itemdatevalidation = Math.round((new Date() - new Date(itemdatevalidation)) / (1000 * 60 * 60 * 24)); //difference in days
                if (itemdatevalidation >= 0) // expired deliverables
                {
                    ExpDeliverablesarray.push({
                        pcode: oListItem.get_item('ProjectCode'),
                        delivered: oListItem.get_item('Delivered'),
                        ammount: oListItem.get_item('Weight'),
                        date: itemdate
                    });
                } else // future deliverables
                {
                    FutDeliverablesarray.push({
                        pcode: oListItem.get_item('ProjectCode'),
                        delivered: oListItem.get_item('Delivered'),
                        ammount: oListItem.get_item('Weight'),
                        date: itemdate
                    });
                }
            }

        }
        console.log("INSIDE Delevrable after while")

        // console.log(Deliverablesarray.length);
        var NoD, NoDY, NoDarray, statustxt, statusnum, statusclass, ProgressNamearray = [];
        for (var i = 0; i < UProjects.length; i++) {
            //future deliverables
            // var dforthisprojFut = FutDeliverablesarray.filter((v) => (v.pcode === UProjects[i]));
            // var numberofyesFut = dforthisprojFut.filter((v) => (v.delivered === 'yes' || v.delivered === 'Yes'));
            //expired deliverables
            // var dforthisprojExp = ExpDeliverablesarray.filter((v) => (v.pcode === UProjects[i]));
            // var numberofyesExp = dforthisprojExp.filter((v) => (v.delivered === 'yes' || v.delivered === 'Yes'));
            //all deliverables
            var dforthisproj = Deliverablesarray.filter((v) => (v.pcode === UProjects[i]));
            var toatlamount = dforthisproj.reduce((accum, item) => accum + item.ammount, 0);
            var numberofyes = dforthisproj.filter((v) => (v.delivered === 'yes' || v.delivered === 'Yes'));
            var POD = Math.round(numberofyes.reduce((accum, item) => accum + (item.ammount * 100) / toatlamount, 0)) || 0;
            // NoD = Deliverablesarray.filter((v) => (v.pcode === UProjects[i])).length;
            // NoDarray = Deliverablesarray.filter((v) => (v.pcode === UProjects[i]));
            // NoDY = NoDarray.filter((v) => (v.delivered === 'Yes')).length;
            // POD = Math.round(NoDY / NoD * 100) || 0;
            Progressarray.push({
                pcode: UProjects[i],
                progress: POD
            });
            // if (dforthisprojExp.length > 0) {
            //     if (numberofyesExp.length == dforthisprojExp.length) //all expired are done
            //     {
            //         if (numberofyesFut.length > 0) {
            //             statusclass = 'text-success';
            //             statustxt = 'متقدم';
            //             statusnum = 4;
            //             ProgressNamearray.push({
            //                 name: statustxt
            //             });
            //         } else {
            //             statusclass = 'text-warning';
            //             statustxt = 'حسب الخطة';
            //             ProgressNamearray.push({
            //                 name: statustxt
            //             });
            //             statusnum = 3;
            //         }
            //     } else if (numberofyesExp.length == dforthisprojExp.length - 1) {
            //         statusclass = 'text-danger';
            //         statustxt = 'متأخر';
            //         statusnum = 2;
            //         ProgressNamearray.push({
            //             name: statustxt
            //         });
            //     } else if (numberofyesExp.length < dforthisprojExp.length - 1) {
            //         statusclass = 'text-super-danger';
            //         statustxt = 'متأخر جدا';
            //         statusnum = 1;

            //         ProgressNamearray.push({
            //             name: statustxt
            //         });
            //     }
            // } else {
            //     if (numberofyesFut.length == 0) //on plan because no deliverable is expired
            //     {
            //         statusclass = 'text-warning';
            //         statustxt = 'حسب الخطة';
            //         statusnum = 3;
            //         ProgressNamearray.push({
            //             name: statustxt
            //         });
            //     } else if (numberofyesFut.length > 0) //one or more fute deliverables are done
            //     {
            //         statusclass = 'text-success';
            //         statustxt = 'متقدم';
            //         statusnum = 4;
            //         ProgressNamearray.push({
            //             name: statustxt
            //         });
            //     }
            // }
            //
            //fill divs by id for order it
            // var x = document.getElementsByClassName("ProjectCards")[i];
            // if (x)
            //     x.id = statusnum;

            $('.deliv-status h4[data-prname="' + UProjects[i] + '"]').addClass(statusclass).text(statustxt);
            // $('.inner-data3 .inner-val[data-prname="' + UProjects[i] + '"]').text(POD + '%'); // commint it because nesbat elenjaz come from project schedual 
        }
        //progress stats

        // Noverylate = progressstatusarrayALL.filter((v) => (v == 'متأخر جدا' || v.toLowerCase() == 'too late')).length;
        // // console.log('Noverylate', Noverylate);
        // var Noverylatepercent = (Noverylate * 100) / numberofProjects ? (Noverylate * 100) / numberofProjects : 0;

        // Nolate = progressstatusarrayALL.filter((v) => (v == 'متأخر' || v.toLowerCase() == 'late')).length;
        // // console.log('Nolate', Nolate);
        // var Nolatepercent = (Nolate * 100) / numberofProjects ? (Nolate * 100) / numberofProjects : 0;

        // Noonplan = progressstatusarrayALL.filter((v) => (v == 'حسب الخطة' || v.toLowerCase() == 'according to plan')).length;
        // // console.log('Noonplan', Noonplan);
        // var Noonplanpercent = (Noonplan * 100) / numberofProjects ? (Noonplan * 100) / numberofProjects : 0;

        // Noahead = progressstatusarrayALL.filter((v) => (v == 'متقدم' || v.toLowerCase() == 'ahead of plan')).length;
        // var Noaheadpercent = (Noahead * 100) / numberofProjects ? (Noahead * 100) / numberofProjects : 0;


        // $('.ctx-block.row.mx-n2 > div:nth-child(2)  .card-body .media:nth-child(1) .d-flex span:nth-child(2)').text(Project_Info_Request.g.kFormatter(Noverylate));
        // $('.ctx-block.row.mx-n2 > div:nth-child(2) .card-body .media:nth-child(1) .progress-bar').css('width', Noverylatepercent + '%');
        // //
        // $('.ctx-block.row.mx-n2 > div:nth-child(2)  .card-body .media:nth-child(2) .d-flex span:nth-child(2)').text(Project_Info_Request.g.kFormatter(Nolate));
        // $('.ctx-block.row.mx-n2 > div:nth-child(2) .card-body .media:nth-child(2) .progress-bar').css('width', Nolatepercent + '%');
        // //
        // $('.ctx-block.row.mx-n2 > div:nth-child(2)  .card-body .media:nth-child(3) .d-flex span:nth-child(2)').text(Project_Info_Request.g.kFormatter(Noonplan));
        // $('.ctx-block.row.mx-n2 > div:nth-child(2) .card-body .media:nth-child(3) .progress-bar').css('width', Noonplanpercent + '%');
        // //
        // $('.ctx-block.row.mx-n2 > div:nth-child(2)  .card-body .media:nth-child(4) .d-flex span:nth-child(2)').text(Project_Info_Request.g.kFormatter(Noahead));
        // $('.ctx-block.row.mx-n2 > div:nth-child(2) .card-body .media:nth-child(4) .progress-bar').css('width', Noaheadpercent + '%');
        // $('.ctx-block.row.mx-n2 > div:nth-child(2) .card-body .media:nth-child(3) .progress-bar').css('width', Noonplanpercent + '%');

        handleStatusBarChart();
        //
        //1st bars section budgets
        var toatlamountAllofProjects = Deliverablesarray.reduce((accum, item) => accum + item.ammount, 0);

        //$('.ctx-block.row.mx-n2 .carditem1  .card-body .media:nth-child(1) .d-flex span:nth-child(2)').text(Project_Info_Request.g.kFormatter(AssignedBudget));
        $('.ctx-block.row.mx-n2 .carditem1 .card-body .media:nth-child(1) .progress-bar').css('width', '100%');
        //
        //var toatlamountAllofProjectspercent = (toatlamountAllofProjects * 100) / AssignedBudget ? (toatlamountAllofProjects * 100) / AssignedBudget : 0;
        // $('.ctx-block.row.mx-n2 > div:nth-child(1) .card-body .media:nth-child(2) .d-flex span:nth-child(2)').text(Project_Info_Request.g.kFormatter(toatlamountAllofProjects));
        // $('.ctx-block.row.mx-n2 > div:nth-child(1) .card-body .media:nth-child(2) .progress-bar').css('width', toatlamountAllofProjectspercent + '%');
        //*** */
        // console.log(AssignedBudget);
        toatlamountAllofProjectminusspercent = ((AssignedBudget - toatlamountAllofProjects) * 100) / AssignedBudget ? ((AssignedBudget - toatlamountAllofProjects) * 100) / AssignedBudget : 0;
        //$('.ctx-block.row.mx-n2 > div:nth-child(1) .card-body .media:nth-child(3) .d-flex span:nth-child(2)').text(Project_Info_Request.g.kFormatter(AssignedBudget - toatlamountAllofProjects));
        // $('.ctx-block.row.mx-n2 > div:nth-child(1) .card-body .media:nth-child(3) .progress-bar').css('width', toatlamountAllofProjectminusspercent + '%');
        changeResources();




        ProjectsOrder.init();
        Project_Info_Request.g.showprojectonclick();
        Invoices_Info_Request.init();

    },
    onError: function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {
        PCODE: window.location.href.split('/')[4],
    }


};

var Main_Stages_Data_Request = {
    onSuccess: function (sender, args) {
        console.log("stages on success")
        var collListItem = Main_Stages_Data_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            Main_Stages_Data_Request.g.StagesArray.push({
                phase: oListItem.get_item('RelatedPhase'),
                stage: oListItem.get_item('Title'),
                relatedURL: oListItem.get_item('RelatedURL'),
                stageid: oListItem.get_id(),
            });
        }
        console.log("stages on  success after while")

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
        Main_Stages_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Main_Stages_Data_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Main_Stages_Data_Request.onSuccess),
            Function.createDelegate(this, Main_Stages_Data_Request.onError)
        );
    },
    // Global variables
    g: {
        StagesArray: []
    }
};


var Invoices_Info_Request = {
    // The main Initialization function
    init: function () {

        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Invoices');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>');
        Invoices_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Invoices_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Invoices_Info_Request.onSuccess),
            Function.createDelegate(this, Invoices_Info_Request.onError)
        );
    },
    onSuccess: function (sender, args) {
        var collListItem = Invoices_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        Amount = 0, Deliverable = '';

        // console.log(Deliverablesarray);
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            //itemID = oListItem.get_id();
            Amount = oListItem.get_item('Amount');
            Deliverable = oListItem.get_item('Deliverable');
            Status = oListItem.get_item('Status');
            //console.log(Status);
            //console.log(Amount+','+Deliverable);
            for (i = 0; i < Deliverablesarray.length; i++) {
                var myselections = Deliverable ? Deliverable.split(":::") : [] // add myselection to handle mult delivrable in invoices
                console.log(myselections,"myselections myselections")
                // console.log(Deliverablesarray[i].pcode +','+ Deliverable); // chamge to mySelection to handle The Cose on Multi delivrable 
                if (Deliverablesarray[i].Code == myselections[0] && Status == 'paid') {
                    debugger

                    // console.log(Status);
                    TheCost += Amount;
                    // console.log(Amount+','+Deliverablesarray[i].Code+','+Deliverable);
                }
            }

            //
        }

        console.log(TheCost,"TheCost TheCostTheCost")
     
        // $('.ctx-block.row.mx-n2 .carditem1  .card-body .media:nth-child(2) .d-flex span:nth-child(2)').text(Project_Info_Request.g.kFormatter(TheCost));
        //$('.ctx-block.row.mx-n2 .carditem4  .card-body .media:nth-child(3) .d-flex span:nth-child(2)').text(RisksCount);
        var TheCostPercentage = (TheCost / AssignedBudget) * 100;
        // $('.ctx-block.row.mx-n2 .carditem1 .card-body .media:nth-child(2) .progress-bar').css('width', TheCostPercentage + '%');
        //
        // console.log(toatlamountAllofProjectminusspercent);
        budgetLast = AssignedBudget - TheCost;
        // $('.ctx-block.row.mx-n2 .carditem1 .card-body .media:nth-child(3) .d-flex span:nth-child(2)').text(Project_Info_Request.g.kFormatter(AssignedBudget - TheCost));
        // $('.ctx-block.row.mx-n2 .carditem1 .card-body .media:nth-child(3) .progress-bar').css('width', Math.abs(toatlamountAllofProjectminusspercent) + '%');



        handleBudgetBarChart();
        console.timeEnd()

        //console.log(ExpectedExchange);
        //LastCost=AssignedBudget-TheCost;
        // $('.project-budget-ctx .card-body > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)').html('<span>'+LastCost+' SAR</span> <span>/</span> <span>'+TheCost+' SAR</span>');
        // $('li.nav-item a:not(:visible)').parent().hide()
    },
    onError: function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {}
};


//order project list in home
var ProjectsOrder = {
    // The main Initialization function
    init: function () {

        var parent = document.getElementById('accordionProject');
        // get child divs
        var children = parent.getElementsByClassName("ProjectCards");
        var ids = [],
            obj, i, len;
        // build an array of objects that has both the element
        // and a parsed div number in it so we can sort
        for (i = 0, len = children.length; i < len; i++) {
            obj = {};
            obj.element = children[i];
            obj.idNum = parseInt(children[i].id.replace(/[^\d]/g, ""), 10);
            ids.push(obj);
        }
        // sort the array
        ids.sort(function (a, b) {
            return (a.idNum - b.idNum);
        });
        // append in sorted order
        for (i = 0; i < ids.length; i++) {
            parent.appendChild(ids[i].element);
        }

        htmltest = '<a data-trans-ViewMore class="view-more d-block text-center py-2 Resources"></a>' +
            '<a data-trans-ViewLess class="view-less d-block text-center py-2 Resources" style="display:none!important"></a>';

        $('div#accordionProject').append(htmltest);


        if (totalforhidext < 4) {
            $('div#ExternalProjects a.view-more.d-block.text-center.py-2.Resources').addClass("disabled");
        }
        if (totalforhidint < 4) {
            $('div#InternalProjects a.view-more.d-block.text-center.py-2.Resources').addClass("disabled");
        }

        changeResources()
    }

}



// //SectorsInfoRequest
var SectorsInfoRequest = {
    onSuccess: function (sender, args) {
        var collListItem = SectorsInfoRequest.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        window.SectorsProjectCount = [];
        window.Sectors = [];
        window.reverseSectorsArray = [];
        window.SectorsName = [];
        Window.SectorsEnName = [];
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            Sectors.push({
                code: (oListItem.get_item('Title') == null) ? No_Data : oListItem.get_item('Title'),
                Name: (oListItem.get_item('Name') == null) ? No_Data : oListItem.get_item('Name'),
                NameEn: (oListItem.get_item('NameEn') == null) ? No_Data : oListItem.get_item('NameEn'),
                // Owner: (oListItem.get_item('Owner') == null) ? No_Data : oListItem.get_item('Owner').get_lookupValue(),
            });
        }
        for (var i = 0; i < UProjects.length; i++) {
            var SectorCodeItem = $('.SectorName[data-prname="' + UProjects[i] + '"]')[0];
            var SectorCode = $('.SectorName[data-prname="' + UProjects[i] + '"]').length > 0 ? SectorCodeItem.getAttribute('title') : '';
            item = Sectors.find(el => el.code == SectorCode);
            if (item) {
                if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                    projectSectorName = item.Name;
                } else projectSectorName = item.NameEn;

                SectorsData.push({
                    code: SectorCode,
                    Name: projectSectorName
                });
            }
        }

        window.reverseSectorsArray = Sectors.reverse();

        if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
            window.reverseSectorsArray.forEach(element => SectorsName.push(element.Name));
        } else {
            window.reverseSectorsArray.forEach(element => SectorsName.push(element.NameEn));
        }
        Array.prototype.sum = function (prop) {
            var total = 0
            for (var i = 0, _len = this.length; i < _len; i++) {
                total += this[i][prop]
            }
            return total
        }

        for (var i = 0; i < Sectors.length; i++) {
            if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                SectorsProjectCount.push(SectorsData.filter(item => item.Name === Sectors[i].Name).length);
            } else SectorsProjectCount.push(SectorsData.filter(item => item.Name === Sectors[i].NameEn).length);
        }
        handleCircleDepartmentsChart();
    },
    onError: function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function () {
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
            SectorsInfoRequest.init();
        });

    },
    // The main Initialization function
    init: function () {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Internal Entities');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="EntityType" /><Value Type="Choice">Sector</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>');

        SectorsInfoRequest.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(SectorsInfoRequest.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, SectorsInfoRequest.onSuccess),
            Function.createDelegate(this, SectorsInfoRequest.onError)
        );
    },
    // Global variables
    g: {}
};

//PortfoliosInfoRequest
var PortfoliosInfoRequest = {
    onSuccess: function (sender, args) {
        var collListItem = PortfoliosInfoRequest.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        window.portfolios = [];
        window.portfoliosProjectCount = [];
        while (listItemEnum.moveNext()) {

            var oListItem = listItemEnum.get_current();
            window.portfolios.push({
                code: (oListItem.get_item('Title') == null) ? No_Data : oListItem.get_item('Title'),
                code: (oListItem.get_item('Title') == null) ? No_Data : oListItem.get_item('Title'),
                Name: (oListItem.get_item('Name') == null) ? No_Data : oListItem.get_item('Name'),
                NameEn: (oListItem.get_item('NameEn') == null) ? No_Data : oListItem.get_item('NameEn'),
                Owner: (oListItem.get_item('Owner') == null) ? No_Data : oListItem.get_item('Owner').get_lookupValue(),
                Manager: (oListItem.get_item('Manager') == null) ? No_Data : oListItem.get_item('Manager').get_lookupValue()
            });
        }


        for (var i = 0; i < UProjects.length; i++) {
            var portCodeItem = $('.portfolioName[data-prname="' + UProjects[i] + '"]')[0];
            // console.log('poe\rtcode', portCodeItem);
            var portCode = $('.portfolioName[data-prname="' + UProjects[i] + '"]').length > 0 ? portCodeItem.getAttribute('title') : '';
            // console.log('portCode', portCode);
            item = window.portfolios.find(el => el.code == portCode);
            if (item) {
                if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                    projectPortfolioName = item.Name;
                } else projectPortfolioName = item.NameEn;


                portfoliosData.push({
                    code: portCode,
                    Name: projectPortfolioName,
                });
            }
        }

        reversePortfoliosArray = window.portfolios.reverse();
        if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
            reversePortfoliosArray.forEach(element => portfoliosName.push(element.Name));
        } else {
            reversePortfoliosArray.forEach(element => portfoliosName.push(element.NameEn));
        }


        Array.prototype.sum = function (prop) {
            var total = 0
            for (var i = 0, _len = this.length; i < _len; i++) {
                total += this[i][prop]
            }
            return total
        }

        for (var i = 0; i < window.portfolios.length; i++) {
            // window.portfoliosProjectCount.push(portfoliosData.filter(item => item.Name === window.portfolios[i].Name).length);

            if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                window.portfoliosProjectCount.push(portfoliosData.filter(item => item.Name === window.portfolios[i].Name).length);
            } else window.portfoliosProjectCount.push(portfoliosData.filter(item => item.Name === window.portfolios[i].NameEn).length);
        }
        handleCirclePortfoliosChart();
    },
    onError: function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function () {
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
            PortfoliosInfoRequest.init();
        });
    },
    // The main Initialization function
    init: function () {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Portfolio');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>');
        PortfoliosInfoRequest.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(PortfoliosInfoRequest.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, PortfoliosInfoRequest.onSuccess),
            Function.createDelegate(this, PortfoliosInfoRequest.onError)
        );
    },
    // Global variables
    g: {}
};



function handleBudgetBarChart() {

    var remainingCost = ActualBudget - TheCost;
    if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
        budgetData = [remainingCost, TheCost, ActualBudget];
    } else {
        budgetData = [ActualBudget, TheCost, remainingCost];
    }

    if ('#budgetChart') {
        $('#budgetChart').remove(); // this is my <canvas> element
        $('#carditem1 .chartjs-size-monitor').remove();
        $('#carditem1 .card-body .card-body').append('<canvas width="200" height="196" id="budgetChart"><canvas>');
    }

    var bar_ctx = document.getElementById('budgetChart').getContext('2d');
    //Bordeau
    var background_1 = bar_ctx.createLinearGradient(0, 0, 0, 270);
    //Green
    var background_2 = bar_ctx.createLinearGradient(0, 0, 0, 270);
    // Move
    var background_3 = bar_ctx.createLinearGradient(0, 0, 0, 270);
    background_1.addColorStop(0, '#80cea2');
    background_1.addColorStop(1, '#32b474');
    background_2.addColorStop(0, '#70abb0');
    background_2.addColorStop(1, '#5AB74C');
    background_3.addColorStop(0, '#688393');
    background_3.addColorStop(1, '#15425a');

    var BudgetLabelsName;

    if (_.sum(budgetData) == 0) {
        BudgetLabelsName = [];
        $('#budgetChart').remove(); // this is my <canvas> element
        $('#carditem1 .chartjs-size-monitor').remove();
        $('#carditem1 .card-body .card-body').append('<p class="chartNodata">' + No_Data + '</p>');
    }
    else {
        $('#carditem1 .card-body .card-body .chartNodata').remove();
        BudgetLabelsName = BudgetLabels;
    }

    /* data */
    var data = {
        labels: BudgetLabelsName,
        datasets: [{
            label: "K",
            backgroundColor: [background_1, background_2, background_3],
            hoverBackgroundColor: [background_1, background_2, background_3],
            //data: [4000, 1900, 1100]
            data: budgetData
        }]
    };
    var options = {
        layout: {
            padding: {
                left: 0,
                right: 5,
                top: 0,
                bottom: 0
            }
        },
        plugins: {
            datalabels: {
                display: false
            }
        },
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem) {
                    return Project_Info_Request.g.kFormatter(tooltipItem.yLabel)
                    // return Number(tooltipItem.yLabel) + "K";
                }
            },
            displayColors: false,
            display: false
        },
        responsive: true,
        title: {
            display: false
        },
        isFixedWidth: false,
        scales: {
            xAxes: [{
                barPercentage: 0.5,
                gridLines: {
                    display: false
                },
                ticks: {

                    fontFamily: myFont,
                    fontSize: 9,
                    fontStyle: "bold"
                }
            }],
            yAxes: [{
                position: axeposition,
                ticks: {
                    fontFamily: myFont,
                    fontSize: 10,
                    fontStyle: "bold",
                    beginAtZero: true,
                    callback: function(label, index, labels) {
                        return Project_Info_Request.g.kFormatter(label)
                    }
                    // max: Math.max(...budgetData),
                    //stepSize: Math.ceil(Math.max(...costsArray) / 5 )
                },
                gridLines: {
                    display: true,
                    drawBorder: false
                }
            }]
        }
    };
    if (_.sum(budgetData) != 0) {
        var myChart = new Chart(document.getElementById("budgetChart"), {
            type: 'bar',
            data: data,
            options: options
        });
    }
}

function handleStatusBarChart() {
    if ('#statusChart') {
        $('#statusChart').remove(); // this is my <canvas> element
        $('#carditem2 .chartjs-size-monitor').remove();
        $('#carditem2 .card-body .card-body').append('<canvas width="200" height="196" id="statusChart"><canvas>');
    }
    var bar_ctx1 = document.getElementById('statusChart').getContext('2d');
    //Bordeau
    var background_1 = bar_ctx1.createLinearGradient(0, 0, 0, 270);
    //Green
    var background_2 = bar_ctx1.createLinearGradient(0, 0, 0, 270);
    // Move
    var background_3 = bar_ctx1.createLinearGradient(0, 0, 0, 270);
    //Yellow
    var background_4 = bar_ctx1.createLinearGradient(0, 0, 0, 270);
    var background_5 = bar_ctx1.createLinearGradient(0, 0, 0, 270);


    // background_1.addColorStop(0, 'rgba(245,27,7,255)');
    // background_1.addColorStop(1, 'rgba(245,27,7,255)');
    // background_2.addColorStop(0, 'rgba(0,0,255,255)');
    // background_2.addColorStop(1, 'rgba(0,0,255,255)');
    // background_3.addColorStop(0, '#f00987');
    // background_3.addColorStop(1, '#f00987');
    // background_4.addColorStop(0, '#000');
    // background_4.addColorStop(1, '#000');
    // background_5.addColorStop(0, 'rgba(0,170,0,255)');
    // background_5.addColorStop(1, 'rgba(0,170,0,255)');
    background_1.addColorStop(0, 'rgba(0,170,0,255)');
    background_1.addColorStop(1, 'rgba(0,170,0,255)');
    background_2.addColorStop(0, 'rgba(255,255,0,255)');
    background_2.addColorStop(1, 'rgba(255,255,0,255)');
    background_3.addColorStop(0, 'rgba(245,27,7,255)');
    background_3.addColorStop(1, 'rgba(245,27,7,255)');
    background_4.addColorStop(0, 'rgba(147,139,136,255)');
    background_4.addColorStop(1, 'rgba(147,139,136,255)');
    background_5.addColorStop(0, 'rgba(0,0,255,255)');
    background_5.addColorStop(1, 'rgba(0,0,255,255)');
    var BackgroundsArray = [background_5,background_2, background_4, background_3, background_1];

    if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
        progressOccurence = progressOccurence.reverse();
        ProgressName = ProgressName.reverse();
    } else {
        BackgroundsArray = BackgroundsArray.reverse();
    }


    var ProgressNameLabels;

    if (_.sum(progressOccurence) == 0) {
        ProgressNameLabels = [];
        $('#statusChart').remove(); // this is my <canvas> element
        $('#carditem2 .chartjs-size-monitor').remove();
        $('#carditem2 .card-body .card-body').append('<p class="chartNodata">' + No_Data + '</p>');
    }
    else {
        $('#carditem2 .card-body .card-body .chartNodata').remove();
        ProgressNameLabels = ProgressName;
    }


    /* data */
    var data1 = {
        labels: ProgressName,
        datasets: [{
            backgroundColor: BackgroundsArray,
            hoverBackgroundColor: BackgroundsArray,
            //data: [33, 33, 21, 25],
            data: progressOccurence
            // data: [2,0,3,5,157]

        }]
    };
    //
    var options1 = {
        layout: {
            padding: {
                left: 0,
                right: 5,
                top: 0,
                bottom: 0
            }
        },
        plugins: {
            datalabels: {
                display: false
            }
        },
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem) {
                    return Number(tooltipItem.yLabel);
                }
            },
            displayColors: false,
            display: false
        },
        isFixedWidth: false,
        responsive: true,
        title: {
            display: false
        },
        scales: {
            xAxes: [{
                barPercentage: 0.5,
                gridLines: {
                    display: false

                },
                ticks: {
                    fontFamily: myFont,
                    fontSize: 9,
                    fontStyle: "bold"
                }
            }],
            yAxes: [{
                position: axeposition,
                ticks: {
                    fontFamily: myFont,
                    fontSize: 10,
                    fontStyle: "bold",
                    beginAtZero: true,
                    max: Math.max(...progressOccurence)
                },
                gridLines: {
                    display: true,
                    drawBorder: false
                },
            }]
        }
    };
    if (_.sum(progressOccurence) != 0) {
        var myChart1 = new Chart(document.getElementById("statusChart"), {
            type: 'bar',
            data: data1,
            options: options1
        });
    }
}

function handlePhaseChartBarChart() {
    if ('#phaseChart') {
        $('#phaseChart').remove(); // this is my <canvas> element
        $('#carditem3 .chartjs-size-monitor').remove();
        $('#carditem3 .card-body .card-body').append('<canvas width="200" height="196" id="phaseChart"><canvas>');
    }

    var bar_ctx2 = document.getElementById('phaseChart').getContext('2d');
    //Bordeauzdxrtyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy6
    var background_1 = bar_ctx2.createLinearGradient(0, 0, 0, 270);
    //Green
    var background_2 = bar_ctx2.createLinearGradient(0, 0, 0, 270);
    // Move
    var background_3 = bar_ctx2.createLinearGradient(0, 0, 0, 270);
    //Yellow
    var background_4 = bar_ctx2.createLinearGradient(0, 0, 0, 270);
    //Move Game2
    var background_5 = bar_ctx2.createLinearGradient(0, 0, 0, 270);

    background_1.addColorStop(0, '#80cea2');
    background_1.addColorStop(1, '#32b474');
    background_2.addColorStop(0, '#70abb0');
    background_2.addColorStop(1, '#5AB74C');
    background_3.addColorStop(0, '#688393');
    background_3.addColorStop(1, '#15425a');
    background_4.addColorStop(0, '#EBC866');
    background_4.addColorStop(1, '#FCD66D');
    background_5.addColorStop(0, '#450A0A');
    background_5.addColorStop(1, '#73204E');

    var BackgroundsArray = [background_1, background_3, background_5, background_4, background_2];
    if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
        phaseOccurence = phaseOccurence.reverse();
        phaseNameArray = phaseNameArray.reverse();
        // phaseNameArray.forEach((element, index) => phaseNameArray[index] = element.split(' ')[1]);
    } else {
        BackgroundsArray = BackgroundsArray.reverse();
    }

    var phaseNameArrayLabels;

    if (_.sum(phaseOccurence) == 0) {
        phaseNameArrayLabels = [];
        $('#phaseChart').remove(); // this is my <canvas> element
        $('#carditem3 .chartjs-size-monitor').remove();
        $('#carditem3 .card-body .card-body').append('<p class="chartNodata">' + No_Data + '</p>');
    }
    else {
        $('#carditem3 .card-body .card-body .chartNodata').remove();
        phaseNameArrayLabels = phaseNameArray;
    }

    /* data */
    var phasedata = {
        // labels: ["S4", "S3", "S2", "S1"],
        labels: phaseNameArrayLabels,
        datasets: [{
            backgroundColor: BackgroundsArray,
            hoverBackgroundColor: BackgroundsArray,
            // data: [33, 33, 21, 25],
            // 4,2,3,1,0
            // data: reversedPhasesOccurence    to do add variable array
            data: phaseOccurence
        }]
    };

    var phaseoptions = {
        layout: {
            padding: {
                left: 0,
                right: 5,
                top: 0,
                bottom: 0
            }
        },
        plugins: {
            datalabels: {
                display: false
            }
        },
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem) {
                    return Number(tooltipItem.yLabel);
                }
            },
            displayColors: false,
            display: false
        },
        responsive: true,
        title: {
            display: false
        },
        scales: {
            xAxes: [{
                barPercentage: 0.5,
                gridLines: {
                    display: false

                },
                ticks: {
                    fontFamily: myFont,
                    fontSize: 9,
                    fontStyle: "bold"
                }
            }],
            yAxes: [{
                position: axeposition,
                ticks: {
                    fontFamily: myFont,
                    fontSize: 10,
                    fontStyle: "bold",
                    beginAtZero: true,
                    max: Math.max(...phaseOccurence),
                    //stepSize: Math.ceil(Math.max(...phaseOccurence) / 5 )
                },
                gridLines: {
                    display: true,
                    drawBorder: false
                },
            }]
        }
    };
    if (_.sum(phaseOccurence) != 0) {
        var phaseChart = new Chart(document.getElementById("phaseChart"), {
            type: 'bar',
            data: phasedata,
            options: phaseoptions
        });
    }
}

function handlePriorityChartBarChart() {
    if ('#priorityChart') {
        $('#priorityChart').remove(); // this is my <canvas> element
        $('#carditem5 .chartjs-size-monitor').remove();
        $('#carditem5 .card-body .card-body').append('<canvas width="200" height="196" id="priorityChart"><canvas>');
    }

    var bar_ctx3 = document.getElementById('priorityChart').getContext('2d');
    //Bordeau
    var background_1 = bar_ctx3.createLinearGradient(0, 0, 0, 270);
    //Green
    var background_2 = bar_ctx3.createLinearGradient(0, 0, 0, 270);
    // Move
    var background_3 = bar_ctx3.createLinearGradient(0, 0, 0, 270);
    //Yellow
    var background_4 = bar_ctx3.createLinearGradient(0, 0, 0, 270);
    //Move Game2
    var background_5 = bar_ctx3.createLinearGradient(0, 0, 0, 270);
    background_1.addColorStop(0, '#80cea2');
    background_1.addColorStop(1, '#32b474');
    background_2.addColorStop(0, '#70abb0');
    background_2.addColorStop(1, '#5AB74C');
    background_3.addColorStop(0, '#688393');
    background_3.addColorStop(1, '#15425a');
    background_4.addColorStop(0, '#EBC866');
    background_4.addColorStop(1, '#FCD66D');
    background_5.addColorStop(0, '#450A0A');
    background_5.addColorStop(1, '#73204E');

    var BackgroundsArray = [background_1, background_5, background_3, background_2]
    if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
        priorityOccurence = priorityOccurence.reverse();
        PriorityName = PriorityName.reverse();
    } else {
        BackgroundsArray = BackgroundsArray.reverse();
    }


    var PriorityNameLabels;

    if (_.sum(priorityOccurence) == 0) {
        PriorityNameLabels = [];
        $('#priorityChart').remove(); // this is my <canvas> element
        $('#carditem5 .chartjs-size-monitor').remove();
        $('#carditem5 .card-body .card-body').append('<p class="chartNodata">' + No_Data + '</p>');
    }
    else {
        $('#carditem5 .card-body .card-body .chartNodata').remove();
        PriorityNameLabels = PriorityName;
    }

    /* data */
    var priorityChartData = {
        labels: PriorityNameLabels,
        datasets: [{
            backgroundColor: BackgroundsArray,
            hoverBackgroundColor: BackgroundsArray,
            // data: [3, 2, 1, 2],
            data: priorityOccurence
        }]
    };

    var priorityChartOptions = {
        layout: {
            padding: {
                left: 0,
                right: 5,
                top: 0,
                bottom: 0
            }
        },
        plugins: {
            datalabels: {
                display: false
            }
        },
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem) {
                    return Number(tooltipItem.yLabel);
                }
            },
            displayColors: false,
            display: false
        },
        responsive: true,
        title: {
            display: false
        },
        scales: {
            xAxes: [{
                barPercentage: 0.5,
                gridLines: {
                    display: false

                },
                ticks: {
                    fontFamily: myFont,
                    fontSize: 9,
                    fontStyle: "bold"
                }
            }],
            yAxes: [{
                position: axeposition,
                ticks: {
                    fontFamily: myFont,
                    fontSize: 10,
                    fontStyle: "bold",
                    beginAtZero: true,
                    max: Math.max(...priorityOccurence),
                    //stepSize: Math.ceil(Math.max(...PriorityNum) / 5 )
                },
                gridLines: {
                    display: true,
                    drawBorder: false
                },
            }]
        }
    };
    if (_.sum(priorityOccurence) != 0) {
        var priorityChart = new Chart(document.getElementById("priorityChart"), {
            type: 'bar',
            data: priorityChartData,
            options: priorityChartOptions
        });
    }
}

var ImpactLabelsAr = [Resources.ar["low"], Resources.ar["medium"], Resources.ar["hight"]];
var ImpactLabelsEn = [Resources.en["low"], Resources.en["medium"], Resources.en["hight"]];
var ImpactLabel = [];

if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
    ImpactLabel = ImpactLabelsAr;
} else ImpactLabel = ImpactLabelsEn;

function handleCircleRiskChart() {
    $('#riskChart').remove(); // this is my <canvas> element
    $('#carditem4 .chartjs-size-monitor').remove();
    $('#carditem4 .card-body .card-body').append('<canvas width="200" height="196" id="riskChart"><canvas>');
    var circl_ctx = document.getElementById('riskChart').getContext('2d');
    var color1 = circl_ctx.createLinearGradient(0, 0, 0, 270);
    color1.addColorStop(0, '#BE4C4C');
    color1.addColorStop(1, '#D63E3E');

    var color2 = circl_ctx.createLinearGradient(0, 0, 0, 270);
    color2.addColorStop(0, '#fab414');
    color2.addColorStop(1, '#F7C94B');

    var color3 = circl_ctx.createLinearGradient(0, 0, 0, 270);
    color3.addColorStop(0, '#58E578');
    color3.addColorStop(1, '#5AB74C');

    if ((Low + Medium + Hight) == 0) {
        ImpactLabel = [];
        $('#riskChart').remove(); // this is my <canvas> element
        $('#carditem4 .chartjs-size-monitor').remove();
        $('#carditem4 .card-body .card-body').append('<p class="chartNodata">' + No_Data + '</p>');
    }
    else {
        $('#carditem4 .card-body .card-body .chartNodata').remove();
        if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
            ImpactLabel = ImpactLabelsAr;
        } else ImpactLabel = ImpactLabelsEn;
    }

    var data3 = {
        labels: ImpactLabel,
        datasets: [{
            label: "%",
            backgroundColor: [color2, color3, color1],
            hoverBackgroundColor: [color2, color3, color1],
            label: "%",
            data: [Low, Medium, Hight],
            padding: {
                bottom: 0
            }
        }]
    };
    var options3 = {
        elements: {
            arc: {
                borderWidth: 0
            }
        },
        cutoutPercentage: 55,
        maintainAspectRatio: false,
        startAngle: 0,
        toolTipContent: "{h}",
        tooltips: {
            displayColors: false,
            callbacks: {
                label: function (tooltipItem, data3) {
                    var dataset = data3.datasets[tooltipItem.datasetIndex];
                    var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                        return previousValue + currentValue;
                    });
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                    return [percentage + '%', currentValue]
                    // return percentage + "%";
                }
            }

        },
        legend: {
            usePointStyle: true,
            position: 'bottom',
            align: 'right',
            labels: {
                usePointStyle: true,
                fontFamily: myFont,
                fontSize: 13,
                boxWidth: 8,
                boxHeight: 8,
                fontStyle: "bold",
                padding: 37

            }

        },
        plugins: {
            datalabels: {
                display: false
                // display: true,
                // color: 'white',
                // align: 'center',
                // // backgroundColor: '#ccc',
                // // borderRadius: 3,
                // // borderColor: 'white',
                // // borderRadius: 25,
                // // borderWidth: 2,
                // padding: 30,
                // font: {
                //   size: 14,
                // }
            }
        },
    };
    if ((Low + Medium + Hight) != 0) {
        var myChart4 = new Chart(document.getElementById("riskChart"), {
            type: 'doughnut',
            data: data3,
            options: options3
        });
    }
}

function handleCirclePortfoliosChart() {
    if ('portfoliosChart') {
        $('#portfoliosChart').remove(); // this is my <canvas> element
        $('#carditem6 .chartjs-size-monitor').remove();
        $('#carditem6 .card-body .card-body').append('<canvas width="200" height="196" id="portfoliosChart"><canvas>');
    }
    var portfolioscircl_ctx = document.getElementById('portfoliosChart').getContext('2d');
    var color1 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color1.addColorStop(0, '#BE4C4C');
    color1.addColorStop(1, '#15425a');

    var color2 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color2.addColorStop(0, '#fab414');
    color2.addColorStop(1, '#F7C94B');

    var color3 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color3.addColorStop(0, '#70abb0');
    color3.addColorStop(1, '#5AB74C');

    var color4 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color4.addColorStop(0, '#EBC866');
    color4.addColorStop(1, '#FCD66D');

    var color5 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color5.addColorStop(0, '#450A0A');
    color5.addColorStop(1, '#73204E');

    var color6 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color6.addColorStop(0, '#80cea2');
    color6.addColorStop(1, '#32b474');

    var color7 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color7.addColorStop(0, '#688393');
    color7.addColorStop(1, '#b14848');

    var color8 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color8.addColorStop(0, '#15425a');
    color8.addColorStop(1, '#BE4C4C');

    var color9 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color9.addColorStop(0, '#32b474');
    color9.addColorStop(1, '#80cea2');

    var color10 = portfolioscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color10.addColorStop(0, '#b14848');
    color10.addColorStop(1, '#688393');



    var portfoliosNameLabels;

    if (_.sum(window.portfoliosProjectCount) == 0) {
        portfoliosNameLabels = [];
        $('#portfoliosChart').remove(); // this is my <canvas> element
        $('#carditem6 .chartjs-size-monitor').remove();
        $('#carditem6 .card-body .card-body').append('<p class="chartNodata">' + No_Data + '</p>');
    }
    else {
        $('#carditem6 .card-body .card-body .chartNodata').remove();
        portfoliosNameLabels = portfoliosName;
    }

    var portfoliosdata = {
        labels: portfoliosNameLabels,
        datasets: [{
            label: "%",
            backgroundColor: [color1, color3, color2, color5, color6, color4, color7, color8, color9, color10],
            hoverBackgroundColor: [color1, color3, color2, color5, color6, color4, color7, color8, color9, color10],
            label: "%",
            data: window.portfoliosProjectCount,
            padding: {
                bottom: 0
            }
        }]
    };
    var portfoliosoptions = {
        elements: {
            arc: {
                borderWidth: 0
            }
        },
        cutoutPercentage: 55,
        maintainAspectRatio: false,
        startAngle: 0,
        toolTipContent: "{h}",
        tooltips: {
            displayColors: false,
            callbacks: {
                label: function (tooltipItem, portfoliosdata) {
                    var dataset = portfoliosdata.datasets[tooltipItem.datasetIndex];
                    var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                        return previousValue + currentValue;
                    });
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                    return [percentage + '%', currentValue]
                    // return percentage + "%";
                }
            }

        },
        legend: {
            usePointStyle: true,
            position: 'bottom',
            align: 'right',
            labels: {
                usePointStyle: true,
                fontFamily: myFont,
                fontSize: 9,
                boxWidth: 8,
                boxHeight: 8,
                fontFamily: myFont,
                padding: 15
            }

        },
        plugins: {
            datalabels: {
                display: false
                // display: true,
                // color: 'white',
                // align: 'center',
                // // backgroundColor: '#ccc',
                // // borderRadius: 3,
                // // borderColor: 'white',
                // // borderRadius: 25,
                // // borderWidth: 2,
                // padding: 30,
                // font: {
                //   size: 14,
                // }

            }
        }
    };
    if (_.sum(portfoliosProjectCount) != 0) {
        var portfoliosChart = new Chart(document.getElementById("portfoliosChart"), {
            type: 'doughnut',
            data: portfoliosdata,
            options: portfoliosoptions
        });
    }
}

function handleCircleDepartmentsChart() {
    if ('departmentsChart') {
        $('#departmentsChart').remove(); // this is my <canvas> element
        $('#carditem7 .chartjs-size-monitor').remove();
        $('#carditem7 .card-body .card-body').append('<canvas width="200" height="196" id="departmentsChart"><canvas>');
    }

    var departmentscircl_ctx = document.getElementById('departmentsChart').getContext('2d');
    var color1 = departmentscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color1.addColorStop(0, '#BE4C4C');
    color1.addColorStop(1, '#D63E3E');

    var color2 = departmentscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color2.addColorStop(0, '#fab414');
    color2.addColorStop(1, '#F7C94B');

    var color3 = departmentscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color3.addColorStop(0, '#70abb0');
    color3.addColorStop(1, '#5AB74C');

    var color4 = departmentscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color4.addColorStop(0, '#F59C42');
    color4.addColorStop(1, '#F17E0B');

    var color5 = departmentscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color5.addColorStop(0, '#450A0A');
    color5.addColorStop(1, '#73204E');

    var color6 = departmentscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color6.addColorStop(0, '#5876E5');
    color6.addColorStop(1, '#7992EE');


    var color7 = departmentscircl_ctx.createLinearGradient(0, 0, 0, 270);
    color7.addColorStop(0, '#688393');
    color7.addColorStop(1, '#688393');

    var SectorNameLabels;
    if (_.sum(SectorsProjectCount) == 0) {
        SectorNameLabels = [];
        $('#departmentsChart').remove(); // this is my <canvas> element
        $('#carditem7 .chartjs-size-monitor').remove();
        $('#carditem7 .card-body .card-body').append('<p class="chartNodata">' + No_Data + '</p>');
    }
    else {
        $('#carditem7 .card-body .card-body .chartNodata').remove();
        SectorNameLabels = SectorsName;
    }

    var departmentsdata = {
        labels: SectorNameLabels,
        datasets: [{
            label: "%",
            backgroundColor: [color1, color3, color2, color4, color5, color6, color7],
            hoverBackgroundColor: [color1, color3, color2, color4, color5, color6, color7],
            label: "%",
            data: SectorsProjectCount,
            padding: {
                bottom: 0
            }
        }]
    };
    var departmentsoptions = {
        elements: {
            arc: {
                borderWidth: 0
            }
        },
        cutoutPercentage: 55,
        maintainAspectRatio: false,
        startAngle: 0,
        toolTipContent: "{h}",
        tooltips: {
            displayColors: false,
            callbacks: {
                label: function (tooltipItem, departmentsdata) {
                    var dataset = departmentsdata.datasets[tooltipItem.datasetIndex];
                    var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                        return previousValue + currentValue;
                    });
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                    return [percentage + '%', currentValue]
                    // return percentage + "%";
                }
            }

        },
        legend: {
            usePointStyle: true,
            position: 'bottom',
            align: 'right',
            labels: {
                usePointStyle: true,
                fontFamily: myFont,
                fontSize: 9,
                boxWidth: 8,
                boxHeight: 8,
                fontStyle: "bold",
                padding: 15

            }

        },
        plugins: {
            datalabels: {
                display: false
                // display: true,
                // color: 'white',
                // align: 'center',
                // // backgroundColor: '#ccc',
                // // borderRadius: 3,
                // // borderColor: 'white',
                // // borderRadius: 25,
                // // borderWidth: 2,
                // padding: 30,
                // font: {
                //   size: 14,
                // }

            }
        }
    };
    if (_.sum(SectorsProjectCount) != 0) {
        var departmentsChart = new Chart(document.getElementById("departmentsChart"), {
            type: 'doughnut',
            data: departmentsdata,
            options: departmentsoptions
        });
    }
}