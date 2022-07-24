var ActualBudget = 0,
    AssignedBudget, EstimatedBudget = 0,
    phaseArray = [],
    numberofProjects = 0,
    UProjects = [],
    Riskarray = [],
    Issuearray = [],
    Deliverablesarray = [],
    Progressarray = [],
    NTasks = 0,
    RSupport = 0,
    //project vars
    projectname, abrprojectname, phasename, projectcode, projectimportance, Pstartdate, Pfinishdate, standardisedPstartdate, standardisedPfinishdate, projectlength, projectsector, projectstatus, ProjectSponsor, ProjectOwner, ProjectManager, PMORepresentative, Deliverablesarray = [],
    CurrDeliverablesarrayPercent = [],
    ExpDeliverablesarrayPercent = [],
    ExpDeliverablesarray = [],
    FutDeliverablesarray = [],
    projectprogress,
    TargetSegments,  ExecutionChannels, HumanResourcesRequired, ExecutionRequirements, ExpectedBenefits, Description, BudgetItem, AssignedBudget, ExpectedBudget;
if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
    var No_Data = 'لا يوجد'
} else {
    var No_Data = 'No Data'
}

var siteRootName = window.location.href.split('/')[4];

var Project_Home_Info_Request = {
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ($('.d-flex').length) {
            clearInterval(checkHomeStatusHtml);
            //username
            $('.navbar .user-name').text(UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join(''));
            $('.user-name-full').text(UserN.Title);
            $('body').append('<style>.d-inline-flex.flex-column.mx-2{min-width: 100px;}</style>');
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                Project_Home_Info_Request.init();
            });
        }
    },
    // The main Initialization function
    init: function() {

        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle(ListArray[0].projects);
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' + Project_Home_Info_Request.g.PCODE + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query><RowLimit>1</RowLimit></View>');

        Project_Home_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Project_Home_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Project_Home_Info_Request.onSuccess),
            Function.createDelegate(this, Project_Home_Info_Request.onError)
        );
    },
    onSuccess: function(sender, args) {
        var collListItem = Project_Home_Info_Request.g.collListItem;
        Project_Home_Info_Request.g.listItemEnum = collListItem.getEnumerator();
        var allhtml = '',
            card1 = [],
            card3 = [],
            card4 = [],
            card5 = [],
            card6 = [];
        while (Project_Home_Info_Request.g.listItemEnum.moveNext()) {
            var oListItem = Project_Home_Info_Request.g.listItemEnum.get_current();
            TargetSegments  = oListItem.get_item('TargetSegments') || No_Data,
                ExecutionChannels = oListItem.get_item('ExecutionChannels') || No_Data,
                HumanResourcesRequired = oListItem.get_item('HumanResourcesRequired') || No_Data,
                ExecutionRequirements = oListItem.get_item('ExecutionRequirements') || No_Data,
                ExpectedBenefits = oListItem.get_item('ExpectedBenefits') || No_Data,
                Description = oListItem.get_item('Description') || No_Data,
                BudgetItem = oListItem.get_item('BudgetItem') || No_Data,
                AssignedBudget = oListItem.get_item('AssignedBudget') || 0,
                ExpectedBudget = oListItem.get_item('ExpectedBudget') || 0,
                $('.assigned-value').text(AssignedBudget + ' SAR');
            $('.expected-value').text(ExpectedBudget + ' SAR');
            $('.project-info-ctx .card-header > a').attr('href', '' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/view.aspx?ListKey=projects&IID=' + oListItem.get_id() + '&PCODE=' + Project_Home_Info_Request.g.PCODE)
                //getting 1st stats data
            ActualBudget += oListItem.get_item('ActualBudget') || 0; //masroufa
            AssignedBudget = oListItem.get_item('AssignedBudget') || 0; //total budget
            EstimatedBudget += oListItem.get_item('ExpectedBudget') || 0; //mutabakia
            numberofProjects++;
            //project card1
            projectname = oListItem.get_item('Name') || No_Data,
                // console.log(projectname);
                projectsector = oListItem.get_item('Sector') || No_Data,
                abrprojectname = projectname.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join('.');
            projectcode = oListItem.get_item('Title') || No_Data,
                Pstartdate = Project_Home_Info_Request.g.dateConvert(oListItem.get_item('PlannedStartDate')),
                Pfinishdate = Project_Home_Info_Request.g.dateConvert(oListItem.get_item('PlannedFinishDate')),
                phasename = oListItem.get_item('Phase').split(' ') || No_Data,
                phasename.shift(),
                phasename = phasename.join(' ') || No_Data,
                fullphasename = oListItem.get_item('Phase') || No_Data,
                card1.push('<div class="mb-0 py-3 px-4 d-flex justify-content-between align-items-center border-bottom" href="#">' +
                    '<div class="d-inline-flex flex-row align-items-center">' +
                    '<span class="icon-user lg d-inline-flex align-items-center text-center">' +
                    '<span class="user-name lg w-100">' + abrprojectname + '</span>' +
                    '</span>' +
                    '<div class="d-inline-flex flex-column mx-3">' +
                    '<h3 class="acc-title d-inline-flex black">' + projectname + '</h3>' +
                    '<span class="des-13 project-date">' +
                    '<span class="start-date"><span data-trans-PAttr1 class="Resources"></span><span class="px-2">' + Pstartdate + '</span></span>' +
                    '<span class="end-date"><span data-trans-PAttr2 class="Resources"></span><span class="px-2">' + Pfinishdate + '</span></span>' +
                    '</span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="d-inline-flex flex-column mx-2" style="display:none!important">' +
                    '<h3 data-trans-PAttr3 class="Resources black"></h3>' +
                    '<span class="des-13"><span class="state-val">' + projectsector + '</span></span>' +
                    '</div>' +
                    '<div class="d-inline-flex flex-column mx-2">' +
                    '<h3 class="black" >اجمالي الموارد المالية المطلوبة</h3>' +
                    '<span class="des-13"><span class="complition-val">' + EstimatedBudget + '</span></span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="mb-0 py-3 px-4 d-flex justify-content-between align-items-center border-bottom" href="#" style="flex-wrap:wrap">' +
                    '<div class="d-inline-flex flex-column mx-2" style="width:45%!important;margin-bottom: 27px;">' +
                    '<span class="des-13"><span class="complition-val" >الشرائح المستهدفة</span></span>' +
                    '<h4 class="black">' + TargetSegments  + '</h4>' + //

                    '</div>' +
                    '<div class="d-inline-flex flex-column mx-2" style="width:45%!important;margin-bottom: 27px;">' +
                    '<span class="des-13"><span class="v-important-val" >قنوات التنفيذ</span></span>' +
                    '<h4 class="black">' + ExecutionChannels + '</h4>' + //

                    '</div>' +

                    '<div class="d-inline-flex flex-column mx-2" style="width:45%!important">' +
                    '<span class="des-13"><span class="state-val" >موارد بشرية اضافية مطلوبة</span></span>' +
                    '<h4 class="black">' + HumanResourcesRequired + '</h4>' + //

                    '</div>' +
                    '<div class="d-inline-flex flex-column mx-2" style="width:45%!important">' +
                    '<span class="des-13"><span class="v-important-val">متطلبات التنفيذ</span></span>' +
                    '<h4 class="black">' + ExecutionRequirements + '</h4>' + //

                    '</div>' +
                    '</div>' +
                    '<div class="mb-0 py-3 px-4 d-flex justify-content-between align-items-center " href="#" style="flex-wrap:wrap">' +
                    '<div class="d-inline-flex flex-column mx-2" style="width:100%!important;margin-bottom: 20px;">' +
                    '<span class="des-13"><span class="state-val" >وصف المشروع والتحديات التي يعالجها</span></span>' +
                    '<h4 class="black">' + Description + '</h4>' + //

                    '</div>' +
                    '<div class="d-inline-flex flex-column mx-2" style="width:100%!important;margin-bottom: 20px;">' +
                    '<span class="des-13"><span class="v-important-val">مخرجات المشروع</span></span>' +
                    '<h4 class="black Deliverableslisting"></h4>' + //

                    '</div>' +
                    '<div class="d-inline-flex flex-column mx-2" style="width:100%!important">' +
                    '<span class="des-13"><span class="v-important-val">المنافع المتوقعة</span></span>' +
                    '<h4 class="black">' + ExpectedBenefits + '</h4>' + //

                    '</div>' +
                    '</div>'
                );
            //project card 5
            projectimportance = oListItem.get_item('Priority') || No_Data;
            if (projectimportance.toLowerCase().indexOf('very important') > -1) {
                projectimportance = 'مهم جداً';
            } else if (projectimportance.toLowerCase().indexOf('important') > -1) {
                projectimportance = 'مهم';
            }
            projectstatus = oListItem.get_item('Status') || No_Data;
            if (projectstatus.toLowerCase().indexOf('not') > -1) {
                projectstatus = 'لم يبدأ';
            } else if (projectstatus.toLowerCase().indexOf('completed') > -1) {
                projectstatus = 'مكتمل';
            } else if (projectstatus.toLowerCase().indexOf('progress') > -1) {
                projectstatus = 'قائم';
            } else if (projectstatus.toLowerCase().indexOf('hold') > -1) {
                projectstatus = 'معلق';
            } else if (projectstatus.toLowerCase().indexOf('cancelled') > -1) {
                projectstatus = 'ملغي';
            }
            ProjectSponsor = oListItem.get_item('ProjectSponsor') ? oListItem.get_item('ProjectSponsor').get_lookupValue() : No_Data;
            ProjectOwner = oListItem.get_item('ProjectOwner') ? oListItem.get_item('ProjectOwner').get_lookupValue() : No_Data;
            ProjectManager = oListItem.get_item('ProjectManager') ? oListItem.get_item('ProjectManager').get_lookupValue() : No_Data;
            PMORepresentative = oListItem.get_item('PMORepresentative') ? oListItem.get_item('PMORepresentative').get_lookupValue() : No_Data;

            standardisedPstartdate = Project_Home_Info_Request.g.dateConvert2(oListItem.get_item('PlannedStartDate')),
                standardisedPfinishdate = Project_Home_Info_Request.g.dateConvert2(oListItem.get_item('PlannedFinishDate')),
                projectlength = Math.round((new Date(standardisedPfinishdate) - new Date(standardisedPstartdate)) / (1000 * 60 * 60 * 24 * 30));
        }

        //
        // $('.project-Title-Name').text(projectname);
        $('.project-details-ctx .card.h-100').html(card1.join('')); // attaching card 1
        //attaching card 5
        $('.project-info-ctx .project-status-info .row > div:nth-child(1) > span.badge').text(projectstatus);
        $('.project-info-ctx .project-status-info .row > div:nth-child(2) > span.badge').text(projectimportance);

        $('.project-info-ctx .media-body:nth-of-type(1) .icon-user > .user-name').text(ProjectSponsor.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join(''));
        $('.project-info-ctx .media-body:nth-of-type(1) p.fnt-14.reg.mx-3').text(ProjectSponsor);

        $('.project-info-ctx .media-body:nth-of-type(2) .icon-user > .user-name').text(ProjectOwner.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join(''));
        $('.project-info-ctx .media-body:nth-of-type(2) p.fnt-14.reg.mx-3').text(ProjectOwner);

        $('.project-info-ctx .media-body:nth-of-type(3) .icon-user > .user-name').text(ProjectManager.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join(''));
        $('.project-info-ctx .media-body:nth-of-type(3) p.fnt-14.reg.mx-3').text(ProjectManager);

        $('.project-info-ctx .media-body:nth-of-type(4) .icon-user > .user-name').text(PMORepresentative.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join(''));
        $('.project-info-ctx .media-body:nth-of-type(4) p.fnt-14.reg.mx-3').text(PMORepresentative);
        $('.project-delivery-info .d-flex:nth-child(1) > span:nth-child(2)').text(projectlength + ' شهرا');

        // card 6
        $('.project-budget-ctx .card-body > div:nth-child(1) > div > div:nth-child(2)').text(AssignedBudget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' SAR');


        //calling other data
        Risks_Info_Request.init();
        BudgetItem_Info_Request.init();
        Stakeholders_Info_Request.init();
        DependencyProjects_Info_Request.init();
        Deliverables_Info_Request.init();
        ProjectKPIs_Info_Request.init();
        Milestones_Info_Request.init();
        Tasks_Info_Request.init();
        Invoices_Info_Request.init();
        changeResources();
        $('div#particles-foreground, div#particles-background, .vertical-centered-box').animate({ opacity: 0 }, {
            duration: 333,
            complete: function() {
                $('div#particles-foreground, div#particles-background, .vertical-centered-box').remove();

            }
        });
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {
        PCODE: window.location.href.split('PCODE=')[1].split('&')[0],
        dateConvert: function(date) {
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
        dateConvert2: function(date) //date format supported by standards
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
        kFormatter: function(num) {
            return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
        }
    },
};
var checkHomeStatusHtml = setInterval(function() {
    Project_Home_Info_Request.preinit();
}, 1000);
//BudgetItem
var BudgetItem_Info_Request = {
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Budget Items');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' + BudgetItem + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query><RowLimit>1</RowLimit></View>');
        BudgetItem_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(BudgetItem_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, BudgetItem_Info_Request.onSuccess),
            Function.createDelegate(this, BudgetItem_Info_Request.onError)
        );
    },
    onSuccess: function(sender, args) {
        var collListItem = BudgetItem_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var itemhtml = ['<li class="list-group-item  px-0 phome-btn" style="display:none!important"><a data-trans-create class="btn-add Resources" href="' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/new.aspx?ListKey=lessonslearned&PCODE=' + Project_Home_Info_Request.g.PCODE + '"><i class="icon-plus"></i></a></li>'],
            itemID, item1, item2, item3, item4, itemProjectCode;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            $('.relatedbudgetitem').text(oListItem.get_item('Budget_x0020_name') || No_Data);
            var totalcost = oListItem.get_item('Amount') || 0;
            $('.budgetitemcosts').text(totalcost + ' SAR');
            var From = BudgetItem_Info_Request.g.convertdate(oListItem.get_item('From')),
                To = BudgetItem_Info_Request.g.convertdate(oListItem.get_item('To'));
            var yearFrom = From ? From.split('-')[0] : '',
                dateFromFull = From,
                yearTo = To ? To.split('-')[0] : '';
            var yearDiff = yearTo ? parseInt(yearTo) - parseInt(yearFrom) + 1 : '';
            yearFrom = parseInt(yearFrom) + 2;
            window.Cost1 = oListItem.get_item('Cost1') || 0;
            window.Cost2 = oListItem.get_item('Cost2') || 0;
            window.Cost3 = oListItem.get_item('Cost3') || 0;
            if (yearDiff) {
                $('[id^=Cost]').attr('style', 'display:none!important');
                var yeartodisp;
                for (var i = 1; i <= yearDiff; i++) {
                    yeartodisp = yearFrom - 3 + i;
                    $('#Cost' + i).attr('style', '');

                    if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                        var label = $('#Cost' + i).find('.d-inline-flex.black.fnt-14').text().indexOf('لعام') > -1 ? $('#Cost' + i).find('.d-inline-flex.black.fnt-14').text().split('لعام')[0] + ' لعام ' + yeartodisp : $('#Cost' + i).find('.d-inline-flex.black.fnt-14').text() + ' لعام ' + yeartodisp;

                    } else {
                        var label = $('#Cost' + i).find('.d-inline-flex.black.fnt-14').text().indexOf('For Year') > -1 ? $('#Cost' + i).find('.d-inline-flex.black.fnt-14').text().split('For Year')[0] + ' For Year ' + yeartodisp : $('#Cost' + i).find('.d-inline-flex.black.fnt-14').text() + ' For Year ' + yeartodisp;
                    }
                    $('#Cost' + i).find('.d-inline-flex.black.fnt-14').text(label);
                    //circles
                    // console.log(window['Cost' + i])
                    $('#Cost' + i + ' .project-budget-value').text(window['Cost' + i] + ' SAR');
                    var SFpercent = (window['Cost' + i] / totalcost) * 100;
                    if (SFpercent <= 50) {
                        var degreeSF = (SFpercent * 180) / 50
                        $('#Cost' + i).find('.progress-circle-right > span').attr('style', 'transform:rotate(' + degreeSF + 'deg);');
                    } else {
                        $('#Cost' + i).find('.progress-circle-right > span').attr('style', 'transform:rotate(180deg);');
                        var degreeSF = ((SFpercent - 50) * 180) / 50;
                        $('#Cost' + i).find('.progress-circle-left > span').attr('style', 'transform:rotate(' + degreeSF + 'deg);');
                    }
                }
            }
        }
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {
        convertdate: function(d) {
            if (d) {
                var local = d.getTime();
                var offset = d.getTimezoneOffset() * (60 * 1000);
                var utc = new Date(local + offset);
                var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
                var datetouse = riyadh.toLocaleString("en-US").split(',')[0].split('/');
                datetouse[0] = (datetouse[0].length == 1) ? '0' + datetouse[0] : datetouse[0];
                datetouse[1] = (datetouse[1].length == 1) ? '0' + datetouse[1] : datetouse[1];
                var datetouse2 = datetouse[2] + '-' + datetouse[0] + '-' + datetouse[1];
                d = datetouse2;
            }
            return d;
        }
    }
};
//KPIs
var ProjectKPIs_Info_Request = {
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Project KPIs');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' + Project_Home_Info_Request.g.PCODE + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>');
        ProjectKPIs_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(ProjectKPIs_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, ProjectKPIs_Info_Request.onSuccess),
            Function.createDelegate(this, ProjectKPIs_Info_Request.onError)
        );
    },
    onSuccess: function(sender, args) {
        var collListItem = ProjectKPIs_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var itemhtml = ['<li class="list-group-item  px-0 phome-btn" style="display:none!important"><a data-trans-create class="btn-add Resources" href="' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/new.aspx?ListKey=lessonslearned&PCODE=' + Project_Home_Info_Request.g.PCODE + '"><i class="icon-plus"></i></a></li>'],
            itemID, item1, item2, item3, item4, itemProjectCode;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            itemID = oListItem.get_id();
            // itemProjectCode = oListItem.get_item('ProjectCode') || No_Data;
            item1 = oListItem.get_item('Title') || No_Data;
            item2 = oListItem.get_item('ProjectContribution') || No_Data;
            // item3 = Project_Home_Info_Request.g.dateConvert(oListItem.get_item('Date'));
            // item4 = oListItem.get_item('Source') || No_Data;
            itemhtml.push('<li class="list-group-item link-arrow px-0">' +
                '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/View.aspx?ListKey=projectkpis&IID=' + itemID + '">' +

                '<div class="d-inline-flex flex-column mx-2">' +
                '<span class="des-13" ></span>' +
                '<h4 class="text-warning">' + item1 + '</h4>' +
                '</div>' +
                '<div class="d-inline-flex flex-column mx-2">' +
                '<span class="des-13" >مساهمة المشروع بالمؤشر</span>' +
                '<h4 class="black">' + item2 + '</h4>' +
                '</div>' +
                '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
                '</div>' +
                '</a>' +
                '</li>');

            //
        }
        if (itemhtml.length == 1) {
            itemhtml.push('<h3>' + No_Data + '</h3>')
        }
        $('div#pills-first > ul.list-group').html(itemhtml.join(''));
        changeResources();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {}
};
//Stakeholders
var Stakeholders_Info_Request = {
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Stakeholders');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' + Project_Home_Info_Request.g.PCODE + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>');
        Stakeholders_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Stakeholders_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Stakeholders_Info_Request.onSuccess),
            Function.createDelegate(this, Stakeholders_Info_Request.onError)
        );
    },
    onSuccess: function(sender, args) {
        var collListItem = Stakeholders_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var itemhtml = ['<li class="list-group-item  px-0 phome-btn" style="display:none!important"><a data-trans-create class="btn-add Resources" href="' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/new.aspx?ListKey=lessonslearned&PCODE=' + Project_Home_Info_Request.g.PCODE + '"><i class="icon-plus"></i></a></li>'],
            itemID, item1, item2, item3, item4, itemProjectCode;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            itemID = oListItem.get_id();
            // itemProjectCode = oListItem.get_item('ProjectCode') || No_Data;
            item1 = oListItem.get_item('Title') || No_Data;
            item2 = oListItem.get_item('Name') || No_Data;
            // item3 = Project_Home_Info_Request.g.dateConvert(oListItem.get_item('Date'));
            // item4 = oListItem.get_item('Source') || No_Data;
            itemhtml.push('<li class="list-group-item link-arrow px-0">' +
                '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/View.aspx?ListKey=projectkpis&IID=' + itemID + '">' +

                '<div class="d-inline-flex flex-column mx-2">' +
                '<span class="des-13" >الاسم</span>' +
                '<h4 class="text-warning">' + item2 + '</h4>' +
                '</div>' +
                '<div class="d-inline-flex flex-column mx-2">' +
                '<span class="des-13" >المسمى الوظيفي</span>' +
                '<h4 class="black">' + item1 + '</h4>' +
                '</div>' +
                '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
                '</div>' +
                '</a>' +
                '</li>');

            //
        }
        if (itemhtml.length == 1) {
            itemhtml.push('<h3>' + No_Data + '</h3>')
        }
        $('div#pills-second > ul.list-group').html(itemhtml.join(''));
        changeResources();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {}
};

//DependencyProjects
var DependencyProjects_Info_Request = {
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Dependency Projects');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' + Project_Home_Info_Request.g.PCODE + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>');
        DependencyProjects_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(DependencyProjects_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, DependencyProjects_Info_Request.onSuccess),
            Function.createDelegate(this, DependencyProjects_Info_Request.onError)
        );
    },
    onSuccess: function(sender, args) {
        var collListItem = DependencyProjects_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var itemhtml = ['<li class="list-group-item  px-0 phome-btn" style="display:none!important"><a data-trans-create class="btn-add Resources" href="' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/new.aspx?ListKey=lessonslearned&PCODE=' + Project_Home_Info_Request.g.PCODE + '"><i class="icon-plus"></i></a></li>'],
            itemID, item1, item2, item3, item4, itemProjectCode;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            itemID = oListItem.get_id();
            // itemProjectCode = oListItem.get_item('ProjectCode') || No_Data;
            item1 = oListItem.get_item('ProjectCode') || No_Data;
            // item2 = oListItem.get_item('Name') || No_Data;
            // item3 = Project_Home_Info_Request.g.dateConvert(oListItem.get_item('Date'));
            // item4 = oListItem.get_item('Source') || No_Data;
            itemhtml.push('<li class="list-group-item link-arrow px-0">' +
                '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/View.aspx?ListKey=dependencyprojects&IID=' + itemID + '">' +

                '<div class="d-inline-flex flex-column mx-2">' +
                '<span class="des-13" >رمز المشروع</span>' +
                '<h4 class="text-warning">' + item1 + '</h4>' +
                '</div>' +

                '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
                '</div>' +
                '</a>' +
                '</li>');
        }
        if (itemhtml.length == 1) {
            itemhtml.push('<h3>' + No_Data + '</h3>')
        }
        $('div#pills-third > ul.list-group').html(itemhtml.join(''));
        changeResources();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {}
};
//Risks
var Risks_Info_Request = {
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Risks');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' + Project_Home_Info_Request.g.PCODE + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>');
        Risks_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Risks_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Risks_Info_Request.onSuccess),
            Function.createDelegate(this, Risks_Info_Request.onError)
        );
    },
    onSuccess: function(sender, args) {
        var collListItem = Risks_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var itemhtml = ['<li class="list-group-item  px-0 phome-btn" style="display:none!important"><a data-trans-create class="btn-add Resources" href="' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/new.aspx?ListKey=risks&PCODE=' + Project_Home_Info_Request.g.PCODE + '"><i class="icon-plus"></i></a></li>'],
            itemID, itemname, itemstatus, itemdate, itemuser, itemProjectCode;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            itemID = oListItem.get_id();
            itemname = oListItem.get_item('Title') || No_Data;
            itemProjectCode = oListItem.get_item('ProjectCode') || No_Data;
            itemstatus = oListItem.get_item('Status') || No_Data;
            itemdate = Project_Home_Info_Request.g.dateConvert(oListItem.get_item('RiskClosureDate'));
            itemuser = oListItem.get_item('RiskOwner') ? oListItem.get_item('RiskOwner').get_lookupValue() : No_Data;
            itemhtml.push('<li class="list-group-item link-arrow px-0">' +
                '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/View.aspx?ListKey=risks&IID=' + itemID + '&PCODE=' + itemProjectCode + '">' +
                '<div class="d-inline-flex flex-column">' +
                '<h3 class="acc-title d-inline-flex black">' + itemname + '</h3>' +
                '<span class="des-13"><span data-trans-PAttr24 class="Resources"></span>' + itemstatus + '</span>' +
                '</div>' +
                '<div class="d-inline-flex flex-column mx-2">' +
                '<h4 class="text-warning">' + itemdate + '</h4>' +
                '<span data-trans-PAttr25 class="Resources des-13"></span>' +
                '</div>' +
                '<div class="d-inline-flex flex-column mx-2">' +
                '<h4 class="black">' + itemuser + '</h4>' +
                '<span data-trans-PAttr26 class="Resources des-13"></span>' +
                '</div>' +
                '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
                '</div>' +
                '</a>' +
                '</li>');

            //
        }
        if (itemhtml.length == 1) {
            itemhtml.push('<h3>' + No_Data + '</h3>')
        }
        $('div#pills-fourth > ul.list-group').html(itemhtml.join(''));
        changeResources();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },


    // Global variables
    g: {
        PCODE: window.location.href.split('/')[4],
    }
};
//Deliverables
var Deliverables_Info_Request = {
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Deliverables');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' + Project_Home_Info_Request.g.PCODE + '</Value></Eq></Where><OrderBy><FieldRef Name=\'CommittedDate\' Ascending=\'False\' /></OrderBy></Query></View>'); //<Where><Geq><FieldRef Name=\'Committed_x0020_Date\' /><Value IncludeTimeValue=\'TRUE\'  Type=\'DateTime\'><Today /></Value></Geq></Where>
        Deliverables_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Deliverables_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Deliverables_Info_Request.onSuccess),
            Function.createDelegate(this, Deliverables_Info_Request.onError)
        );
    },
    onSuccess: function(sender, args) {
        var collListItem = Deliverables_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        NODelivrables = 0;
        NDelivrables = 0;
        NDelevered = 0;
        POD = 0;
        var itemhtml = ['<li class="list-group-item  px-0 phome-btn" style="display:none!important"><a data-trans-create class="btn-add Resources" href="' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/new.aspx?ListKey=deliverables&PCODE=' + Project_Home_Info_Request.g.PCODE + '"><i class="icon-plus"></i></a></li>'],
            itemID, itemname, itemstatus, itemdate, itemdatevalidation, itemdateExp, itemdelivered;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            // console.log(oListItem.get_item('ProjectCode'));
            //HTML
            itemID = oListItem.get_id();
            itemProjectCode = oListItem.get_item('ProjectCode') || No_Data;
            itemname = oListItem.get_item('Name') || No_Data;
            itemstatus = oListItem.get_item('Status') || No_Data;
            itemdelivered = oListItem.get_item('Delivered') || No_Data;
            itemdate = Project_Home_Info_Request.g.dateConvert(oListItem.get_item('CommittedDate'));
            CommittedDate = oListItem.get_item('CommittedDate');
            // itemuser = oListItem.get_item('Requester') ? oListItem.get_item('Requester').get_lookupValue() : No_Data;
            itemhtml.push('<li class="list-group-item link-arrow px-0">' +
                '<a class="mb-0 py-3 px-2 d-flex justify-content-between" href="' + _spPageContextInfo.webAbsoluteUrl + '/sitepages/View.aspx?ListKey=deliverables&IID=' + itemID + '">' +
                '<div class="d-inline-flex flex-column">' +
                '<h3 class="acc-title d-inline-flex black">' + itemname + '</h3>' +
                '<span class="des-13"><span data-trans-PAttr30 class="Resources"></span>' + itemstatus + '</span>' +
                '</div>' +
                '<div class="d-inline-flex flex-column mx-2">' +
                '<h4 class="text-warning">' + itemdate + '</h4>' +
                '<span data-trans-PAttr31 class="Resources des-13" ></span>' +
                '</div>' +
                '<div class="d-inline-flex flex-column mx-2">' +
                '<h4 class="black">' + itemdelivered + '</h4>' +
                '<span data-trans-PAttr32 class="Resources des-13" ></span>' +
                '</div>' +
                '<div class="d-inline-flex flex-column mx-2" style="width:20px;">' +
                '</div>' +
                '</a>' +
                '</li>');
            itemdatevalidation = Project_Home_Info_Request.g.dateConvert2(oListItem.get_item('CommittedDate'));
            itemdatevalidation = Math.round((new Date() - new Date(itemdatevalidation)) / (1000 * 60 * 60 * 24)); //difference in days

            itemdateExp = Project_Home_Info_Request.g.dateConvert2(oListItem.get_item('PlannedFinishDate'));
            itemdateExp = Math.round((new Date() - new Date(itemdateExp)) / (1000 * 60 * 60 * 24)); //difference in days
            //  if(CommittedDate<=today){CommitedDeliverablesarray.push({Code:oListItem.get_item('Title')});
            //console.log(CommittedDate+','+today);}
            // console.log(CommitedDeliverablesarray.Code);

            if (itemdateExp >= 0) // expired deliverables
            {
                ExpDeliverablesarrayPercent.push({
                    ammount: oListItem.get_item('Weight'),
                });
            }
            if (itemdateExp >= 0 && itemdelivered == 'Yes') // expired deliverables
            {
                //console.log(itemdateExp);
                CurrDeliverablesarrayPercent.push({
                    ammount: oListItem.get_item('Weight'),
                });
            }

            if (itemdatevalidation >= 0) // expired deliverables
            {
                ExpDeliverablesarray.push({
                    delivered: oListItem.get_item('Delivered'),
                    ammount: oListItem.get_item('Weight'),
                    date: itemdate,
                    Code: oListItem.get_item('Title')
                });
            } else // future deliverables
            {
                FutDeliverablesarray.push({
                    delivered: oListItem.get_item('Delivered'),
                    ammount: oListItem.get_item('Weight'),
                });
            }
            Deliverablesarray.push({
                name: itemname,
                delivered: oListItem.get_item('Delivered'),
                ammount: oListItem.get_item('Weight'),
                date: itemdate,
                Code: oListItem.get_item('Title')
            });
            NDelivrables++;
        }
        var deliverablesnames = [];
        Deliverablesarray.forEach(function(a, i, z) {
            deliverablesnames.push(Deliverablesarray[i].name)
        });
        var qiouwefh = deliverablesnames.length > 0 ? deliverablesnames.join('; ') : No_Data;
        $('.Deliverableslisting').text(qiouwefh);

        if (itemhtml.length == 1) {
            itemhtml.push('<h3>' + No_Data + '</h3>')
        }
        // $('div#pills-fourth > ul.list-group').html(itemhtml.join(''));

        // calc NTF

        var toatlamountAll = CurrDeliverablesarrayPercent.reduce((accum, item) => accum + item.ammount, 0);
        var numberofyesAll = ExpDeliverablesarrayPercent.filter((v) => (v.delivered === 'yes' || v.delivered === 'Yes'));
        //var NTF = Math.round(numberofyesAll.reduce((accum,item) => accum + (item.ammount*100)/toatlamountAll, 0)) || 0;
        // $('.project-details-ctx .card.h-100 > div:nth-child(2) > div:nth-child(3) > h4.black').text(toatlamountAll+'%');
        //calc NTM
        //console.log(toatlamountAll);
        var toatlamountExp = ExpDeliverablesarrayPercent.reduce((accum, item) => accum + item.ammount, 0);
        // console.log(toatlamountExp);
        var numberofyesExp = ExpDeliverablesarray.filter((v) =>(v.delivered === 'yes' || v.delivered === 'Yes'));
        // var NTM = Math.round(ExpDeliverablesarrayPercent.reduce((accum,item) => accum + (item.ammount*100)/toatlamountExp, 0)) || 0;
        // $('.project-details-ctx .card.h-100 > div:nth-child(2) > div:nth-child(2) > h4.black').text(toatlamountExp+'%');
        //7alat injaz
        var numberofyesFut = FutDeliverablesarray.filter((v) => (v.delivered === 'yes' || v.delivered === 'Yes'));

        percentageDiff = toatlamountAll - toatlamountExp; //f3lea-mukhatta
        percentageDiffMinus = toatlamountExp - toatlamountAll; //mukhatta-elf3lea
        // console.log(percentageDiff>=0);


        if (percentageDiff >= 0 && percentageDiff < 5) {

            projectprogress = 'حسب الخطة';
        } else if (percentageDiffMinus > 0 && percentageDiffMinus < 5) {
            projectprogress = 'متقدم';
        } else if (percentageDiffMinus > 5 && percentageDiffMinus < 15) {
            projectprogress = 'متأخر ';
        } else if (percentageDiffMinus >= 15) {
            projectprogress = 'متأخر جدا';
        }

        /*  if( ExpDeliverablesarray.length > 0 )
          {
              if( numberofyesExp.length == ExpDeliverablesarray.length ) //all expired are done
              {
                  if( numberofyesFut.length > 0 )
                  {
                      projectprogress = 'متقدم';
                  }
                  else
                  {
                      projectprogress = 'حسب الخطة';
                  }
              }
              else if(  numberofyesExp.length == ExpDeliverablesarray.length-1 )
              {
                  projectprogress = 'متأخر';
              }
              else if(  numberofyesExp.length < ExpDeliverablesarray.length-1 )
              {
                  projectprogress = 'متأخر جدا';
              }
          }
          else
          {
              if( numberofyesFut.length == 0 ) //on plan because no deliverable is expired
              {
                  projectprogress = 'حسب الخطة';
              }
              else if( numberofyesFut.length > 0 ) //one or more fute deliverables are done
              {
                  projectprogress = 'متقدم';
              }
          }*/
        // $('.project-details-ctx .card.h-100 > div:nth-child(2) > div:nth-child(4) > h4.black').text(projectprogress);
        //sarf mutawaka3
        var numberofnoFut = FutDeliverablesarray.filter((v) => (v.delivered === 'No'));
        //var SF = Math.round(numberofnoFut.reduce((accum,item) => accum + item.ammount, 0)) || 0;
        var SFpercent = Math.round(numberofnoFut.reduce((accum, item) => accum + (item.ammount * 100) / AssignedBudget, 0)) || 0;
        // $('.project-budget-ctx .card-body > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)').text(SF.toString().replace(/\B(?=///(\d{3})+(?!\d))/g, ",")+' SAR');
        if (SFpercent <= 50) {
            var degreeSF = (SFpercent * 180) / 50
            $('.project-budget-ctx .card-body > div:nth-child(2) > div:nth-child(1) > span.progress-circle-right > span').attr('style', 'transform:rotate(' + degreeSF + 'deg);');
        } else {
            $('.project-budget-ctx .card-body > div:nth-child(2) > div:nth-child(1) > span.progress-circle-right > span').attr('style', 'transform:rotate(180deg);');
            var degreeSF = ((SFpercent - 50) * 180) / 50
            $('.project-budget-ctx .card-body > div:nth-child(2) > div:nth-child(1) > span.progress-circle-left > span').attr('style', 'transform:rotate(' + degreeSF + 'deg);');
        }
        //taklifa
        var taklifa = Math.round(numberofyesAll.reduce((accum, item) => accum + item.ammount, 0)) || 0;
        var mizaniyamutabakia = AssignedBudget - taklifa;
        var nisbatmutabakia = Math.round((mizaniyamutabakia * 100) / AssignedBudget)
        if (nisbatmutabakia <= 50) {
            var degreemutabakia = (nisbatmutabakia * 180) / 50
            $('.project-budget-ctx .card-body > div:nth-child(3) > div:nth-child(1) > span.progress-circle-right > span').attr('style', 'transform:rotate(' + degreemutabakia + 'deg);');
        } else {
            $('.project-budget-ctx .card-body > div:nth-child(3) > div:nth-child(1) > span.progress-circle-right > span').attr('style', 'transform:rotate(180deg);');
            var degreemutabakia = ((nisbatmutabakia - 50) * 180) / 50
            $('.project-budget-ctx .card-body > div:nth-child(3) > div:nth-child(1) > span.progress-circle-left > span').attr('style', 'transform:rotate(' + degreemutabakia + 'deg);');
        }
        //altaklfa
        /*$('.project-budget-ctx .card-body > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)').html('<span>'+mizaniyamutabakia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' SAR</span> <span>/</span> <span>'+taklifa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+' SSAR</span>');*/
        //
        var NoD, NoDY, NoDarray, statustxt, statusclass;
        for (var i = 0; i < UProjects.length; i++) {
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
            if (POD <= 25) {
                statusclass = 'text-super-danger';
                statustxt = 'متأخر جدا';
            } else if (POD > 25 && POD <= 50) {
                statusclass = 'text-danger';
                statustxt = 'متأخر'
            } else if (POD > 50 && POD <= 75) {
                statusclass = 'text-warning';
                statustxt = 'حسب الخطة'
            } else if (POD > 75) {
                statusclass = 'text-success';
                statustxt = 'متقدم'
            }
            $('.deliv-status h4[data-prname="' + UProjects[i] + '"]').addClass(statusclass).text(statustxt);
            $('.inner-data3 .inner-val[data-prname="' + UProjects[i] + '"]').text(POD + '%');
        }
        //Time Line
        var sdlyear = '',
            iscuryear = true;
        Deliverablesarray.forEach(function(dl, i) { //appending years
            if (sdlyear != dl.date.split('/')[2]) {
                if (dl.date.split('/')[2] == new Date().getFullYear())
                    iscuryear = true;
                else
                    iscuryear = false;
                $('select#inputYear').append(new Option(dl.date.split('/')[2], dl.date.split('/')[2], iscuryear, iscuryear));
            }
            sdlyear = dl.date.split('/')[2];
        });
        Deliverables_Info_Request.g.dltimeline(new Date().getFullYear());
        $('select#inputYear').change(function() {
            Deliverables_Info_Request.g.dltimeline($(this).val())
        });
        Stages_Data_Request.init();
        changeResources();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {
        dltimeline: function(year) {
            $('.milestone-item').hide();
            $('.milestone-item[data-year=' + year + ']').show();
            $('.time-box').remove();
            var dlyear = '',
                dlmonth = '',
                curdl = $('body'),
                dlhtml = '',
                datetoshow = '';
            Deliverablesarray.forEach(function(dl, i) {
                datetoshow = dl.date.split('/'), datetoshow = datetoshow[0] + '/' + datetoshow[1];
                dlyear = dl.date.split('/')[2];
                if (dlyear == year) {
                    if (dlmonth != dl.date.split('/')[1]) {
                        if (dlhtml)
                            curdl.append(dlhtml);
                        dlhtml = '</div><div class="time-box">' +
                            '<div class="p-date">' + datetoshow + '</div>' +
                            '<div class="p-title">' + dl.name + '</div>';
                    } else {
                        dlhtml += '<div class="p-date">' + datetoshow + '</div>' +
                            '<div class="p-title">' + dl.name + '</div>';
                    }
                    // console.log(dlhtml);
                    dlmonth = dl.date.split('/')[1];

                    curdl = $('div#month-' + dl.date.split('/')[1].replace('0', ''));
                }
                if (i == Deliverablesarray.length - 1) {
                    dlhtml += '</div>';
                    curdl.append(dlhtml);
                }
            });
        }
    }
};
//phases-stages cards check boxes
var Stages_Data_Request = {
    onSuccess: function(sender, args) {
        var collListItem = Stages_Data_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var stage, phase, phaseprev, phasehtml = '',
            stagehtml = '',
            ischecked, encodedphaename;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            phase = oListItem.get_item('Title');
            encodedphaename = encodeURI(phase.replace(/\s/g, '')).replace(/[^a-zA-Z ]/g, "");
            stage = oListItem.get_item('Stage');
            ischecked = (oListItem.get_item('Decision')) ? 'checked=checked' : '';
            if (phaseprev != phase) {
                phasehtml += '<a class="new-Phase nav-link fnt-13 bold show ' + encodedphaename + '" id="v-pills-' + encodedphaename + '-tab" data-toggle="pill" href="#' + encodedphaename + '" role="tab" aria-controls="v-pills-' + encodedphaename + '" aria-selected="false">' +
                    '<span class="percent-complete">100%</span><span class="px-2" style="unicode-bidi: isolate;">' + phase + '</span>' +
                    '</a>';
                stagehtml += '</div></div><div class="new-Phase-Values tab-pane fade show" id="' + encodedphaename + '" role="tabpanel" aria-labelledby="v-pills-' + encodedphaename + '-tab">' +
                    '<div class="form-check custom-check d-flex align-items-center">' +
                    '<input class="form-check-input" type="checkbox" value="" id="defaultCheck' + encodedphaename + '" disabled="" ' + ischecked + '>' +
                    '<label class="form-check-label" for="defaultCheck' + encodedphaename + '">' +
                    stage +
                    '</label>' +
                    '</div>';
            } else {
                stagehtml += '<div class="form-check custom-check d-flex align-items-center">' +
                    '<input class="form-check-input" type="checkbox" value="" id="defaultCheck' + encodedphaename + '" ' + ischecked + ' disabled="" ' + ischecked + '>' +
                    '<label class="form-check-label" for="defaultCheck' + encodedphaename + '">' +
                    stage +
                    '</label>' +
                    '</div>';
            }
            phaseprev = oListItem.get_item('Title');

            Stages_Data_Request.g.StagesArray.push({
                phase: oListItem.get_item('Title'),
                stage: oListItem.get_item('Stage'),
            });
        }
        stagehtml += '</div>';
        $('.project-stages-ctx div#v-pills-tab').html(phasehtml);
        $('.project-stages-ctx div#v-pills-tabContent').html(stagehtml);
        var isactive = false;
        $('.project-stages-ctx div#v-pills-tabContent > .tab-pane').each(function() {
            var Progress = $(this).find('[checked=checked]').length;
            var Total = $(this).find('.form-check-input').length;
            Progress = Math.round((Progress * 100) / Total);
            //console.log(Progress+'test'+Total);
            if ($(this).attr('id').indexOf('Execution') > -1) //execution is based on deliverables
            {
                $('div.Phase[href="#' + $(this).attr('id') + '"] span.percentage').append(POD + '%');
                $('.project-stages-ctx div#v-pills-tab > .' + $(this).attr("id") + ' .percent-complete').text(POD + '%');
            } else {
                $('.project-stages-ctx div#v-pills-tab > .' + $(this).attr("id") + ' .percent-complete').text(Progress + '%');
            }
            if (Progress != 100 && !isactive) {
                isactive = true;
                $('.project-stages-ctx div#v-pills-tab > .' + $(this).attr("id")).addClass('active');
                $(this).addClass('active');
                // $(this).find('.Stage-content').addClass('active');
            }
        });
        if (!isactive) {
            $('.new-Phase:last-child').addClass('active');
            $('.new-Phase-Values:last-child').addClass('show active');
        }
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Project Stages');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'ProjectCode\'/><Value Type=\'Text\'>' + Project_Home_Info_Request.g.PCODE + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'True\' /></OrderBy></Query></View>');
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
//end phases-stages cards check boxes
//milestones
var Milestones_Info_Request = {
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Milestones');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' + Project_Home_Info_Request.g.PCODE + '</Value></Eq></Where><OrderBy><FieldRef Name=\'CommittedDate\' Ascending=\'False\' /></OrderBy></Query></View>');
        Milestones_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Milestones_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Milestones_Info_Request.onSuccess),
            Function.createDelegate(this, Milestones_Info_Request.onError)
        );
    },
    onSuccess: function(sender, args) {
        var collListItem = Milestones_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var itemhtml = [],
            itemID, itemname, itemstatus, itemdate, itemdate2, itemuser, isactive;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            itemID = oListItem.get_id();
            itemname = oListItem.get_item('Name') || No_Data;
            itemdate = Project_Home_Info_Request.g.dateConvert(oListItem.get_item('CommittedDate'));
            itemdate2 = new Date(Project_Home_Info_Request.g.dateConvert2(oListItem.get_item('CommittedDate')));
            itemdate2 = Math.floor((itemdate2 - new Date(itemdate2.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)); //number of day
            itemdate2 = (itemdate2 * 100) / 365;
            isactive = itemdate.split('/')[2] == new Date().getFullYear() ? '' : 'style="display:none"';
            itemhtml.push('<div class="milestone-item mb-3" ' + isactive + ' data-year="' + itemdate.split('/')[2] + '">' +
                '<div class="row mx-0">' +

                '<div class="milestone-label col-auto fnt-13 w-3 mb-1" style="width:130px"><span class="milestone-label">' + itemname + '</span></div>' +

                '<div class="milestone-duration col-6 col-xl-auto fnt-13 black order-xl-last mb-1">' +
                '<span class="m-start-date">' + itemdate + '</span>' +
                '<!--<i class="fa m-arrow"></i>' +
                '<span class="m-end-date">15/7/2020</span>-->' +
                '</div>' +

                '<div class="col-12 col-xl-5 state-bar align-items-center order-last order-xl-1 mb-1">' +
                '<div class="position-relative d-flex flex-row-reverse mt-1">' +
                '<div class="state-progress-line bg-primary">' +
                '</div>' +
                '<div class="state-progress-bar bg-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="' + itemdate + '" style="width:50%;right:' + itemdate2 + '%!important;">' +
                '</div>' +
                '</div>' +
                '</div>' +

                '</div>' +
                '</div>');
        }
        if (itemhtml.length == 0) {
            itemhtml.push('<h3>' + No_Data + '</h3>')
        }
        $('.project-milestone').html(itemhtml.join(''));
        $(function() {
            $('[data-toggle="tooltip"]').tooltip()
        });
        changeResources();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {}
};
//tasks
var Tasks_Info_Request = {
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Tasks');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>');
        Tasks_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Tasks_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Tasks_Info_Request.onSuccess),
            Function.createDelegate(this, Tasks_Info_Request.onError)
        );
    },
    onSuccess: function(sender, args) {
        var collListItem = Tasks_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var NRisks = 0,
            taskshtml = '',
            taskname, tasktitle, tasknotificationhtml = '';
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();

            tasktitle = oListItem.get_item('Title') || No_Data;
            taskname = oListItem.get_item('Name') || No_Data;
            taskshtml += '<li class="list-group-item">' +
                '<h3 class="des-14 w-0">' + tasktitle + '</h3>' +
                '<div class="des-12 text-nowrap">' +
                '<a class="link-btn">موافقة</a>' +
                '<a class="link-btn mx-3">رفض</a>' +
                '</div>' +
                '</li>';
            //for notifications
            tasknotificationhtml += '<li class="list-group-item">' +
                '<a>' +
                '<h3 class="title-13">' + tasktitle + '</h3>' +
                '<div class="des-12 text-nowrap">' + taskname + '</div>' +
                '</a>' +
                '</li>';
            NTasks++;
            RSupport++;
            //
        }
        $('span.bell-value').text(NTasks);
        $('div#accordionRequiredSupport > .card:nth-child(1) ul.list-group').html(taskshtml);
        $('ul.list-group.Tasks-Notifications').html(tasknotificationhtml);
        $('.Rsupprot').text(RSupport);
        changeResources();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },

    // Global variables
    g: {
        PCODE: window.location.href.split('/')[4],
    }
};
var Invoices_Info_Request = {
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Invoices');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' + Project_Home_Info_Request.g.PCODE + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>');
        Invoices_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Invoices_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Invoices_Info_Request.onSuccess),
            Function.createDelegate(this, Invoices_Info_Request.onError)
        );
    },
    onSuccess: function(sender, args) {
        var collListItem = Invoices_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        TheCost = 0, Amount = 0, Deliverable = '';
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            //itemID = oListItem.get_id();
            Amount = oListItem.get_item('Amount');
            Deliverable = oListItem.get_item('Deliverable');

            // console.log(Deliverable);
            //console.log(Amount+','+Deliverable);
            for (i = 0; i < Deliverablesarray.length; i++) {
                if (Deliverablesarray[i].Code == Deliverable) {

                    TheCost += Amount;
                    // console.log(Amount + ',' + Deliverablesarray[i].Code + ',' + Deliverable);
                }
            }

            //
        }
        //console.log(ExpectedExchange);
        LastCost = AssignedBudget - TheCost;
        // $('.project-budget-ctx .card-body > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)').html('<span>'+LastCost+' SAR</span> <span>/</span> <span>'+TheCost+' SAR</span>');
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {}
};