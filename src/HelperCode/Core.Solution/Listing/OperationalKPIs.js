const { MissingRefError } = require("ajv");

    var KPIs_Array = [], Main_KPIs = [], Operational_KPIs = [],UserNo_Data = 'No data';
    var OperationalKPIs_Info_Request = {
        // The main Initialization function
        init: function () {
            var clientContext = new SP.ClientContext.get_current();
            var oList = clientContext.get_web().get_lists().getByTitle('MainKPI');
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml('<View><Query>\
                <Where>\
                    <Contains>\
                        <FieldRef Name="Category" /> <Value Type="Choice">رئيسي</Value> \
                    </Contains>\
                </Where>\
            <OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>');
            OperationalKPIs_Info_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only

            clientContext.load(OperationalKPIs_Info_Request.g.collListItem);
            clientContext.executeQueryAsync(
                Function.createDelegate(this, OperationalKPIs_Info_Request.onSuccess),
                Function.createDelegate(this, OperationalKPIs_Info_Request.onError)
            );
        },
        onSuccess: function (sender, args) {
            var collListItem = OperationalKPIs_Info_Request.g.collListItem;
            var listItemEnum = collListItem.getEnumerator(), KPIs_HTML = '';
            while (listItemEnum.moveNext()) {
                var oListItem = listItemEnum.get_current(),
                category = oListItem.get_item('Category') || UserNo_Data;
                KPIs_HTML+='<div class="col-12 col-md-6 col-lg-3 px-2 mb-3">'+
                    '<div class="card h-100">'+
                        '<div class="card-body">'+
                            '<div class="d-flex flex-row align-items-top py-3">'+

                                '<div class="progress-circle danger progress-sm" data-value="90" style="width:48px;height:48px;">'+
                                    '<span class="progress-circle-left">'+
                                        '<span class="progress-circle-bar border-primary" style="transform: rotate(144deg);"></span>'+
                                    '</span>'+
                                    '<span class="progress-circle-right">'+
                                        '<span class="progress-circle-bar border-primary" style="transform: rotate(180deg);"></span>'+
                                    '</span>'+

                                '</div>'+


                                '<div class="d-inline-flex flex-grow-1 mx-3">'+
                                    '<h4 class="d-inline-flex flex-grow-1 pt-2 light-gray">أساسي</h4>'+

                                '</div>'+
                            '</div>'+



                        '</div>'+
                        '<div class="card-body border-top">'+
                            '<div class="d-flex flex-row align-items-center py-3 justify-content-between">'+
                                '<div class="d-inline-flex flex-column mx-3">'+
                                    '<div class="d-inline-flex black fnt-14">Project Owner</div>'+
                                    '<div class="project-budget-value h4">35.999 SAR</div>'+
                                '</div>'+
                                '<div class="d-inline-flex flex-column mx-3 justify-content-end">'+
                                    '<div class="d-inline-flex black fnt-14">Targeted 2020</div>'+
                                    '<div class="d-inline-flex project-budget-value h4 justify-content-end">22.000</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+


                '</div>';
                KPIs_Array.push({
                    name: oListItem.get_item('Name'),
                    code: oListItem.get_item('Title'),
                    cat: category,
                    relMKPI: oListItem.get_item("RelatedMainKpis"),
                    PeriodType: oListItem.get_item("PeriodType"),
                    ResultType: oListItem.get_item("ResultType"),
                    Calculation: oListItem.get_item("Calculation"),
                    Owner: oListItem.get_item("Owner"),
                    relMKPI: oListItem.get_item("RelatedInitiativesKPIs"),
                    RelatedStrategyObjective: oListItem.get_item("RelatedStrategyObjective"),
                    Sector: oListItem.get_item("Sector"),
                    ActualQ1: oListItem.get_item("ActualQ1"),
                    ActualQ2: oListItem.get_item("ActualQ2"),
                    ActualQ3: oListItem.get_item("ActualQ3"),
                    ActualQ4: oListItem.get_item("ActualQ4"),
                    Actual: oListItem.get_item("Actual"),
                    Benchmarking: oListItem.get_item("Benchmarking"),
                    Target: oListItem.get_item("Target"),
                    Polarity: oListItem.get_item("Polarity"),
                    Baseline: oListItem.get_item("Baseline"),
                    MesurePriority: oListItem.get_item("MesurePriority"),
                    Dimensions: oListItem.get_item("Dimensions"),
                    ProjectCode: oListItem.get_item("ProjectCode")
                });
            }

            // Main_KPIs = KPIs_Array.filter(function(obj) {
            //     return obj.cat.indexOf('Main') > -1;
            // });
            // Operational_KPIs = KPIs_Array.filter(function(obj) {
            //     return obj.cat.indexOf('Operational') > -1;
            // });
            //building html
            // var tabsHTML = [];
            // Main_KPIs.forEach(function(a,i,z)
            // {
            //     tabsHTML.push('<div class="col px-2 my-5">'+
            //         '<div class="link-item p-4  h-100">'+
            //             '<div class="text-center fnt-13 bold river-bed mb-1">'+a.code+'</div>'+
            //            '<h4 class="text-center fnt-13 river-bed">'+a.name+'</h4>'+
            //         '</div>'+
            //     '</div>');
            // });
            // if(tabsHTML.length == 0)
            // {
            //     tabsHTML.push(UserNo_Data);
            // }
            // $('.control-ctx.quick-links-ctx > .row.mx-n2.mb-1').html( tabsHTML.join('') );
            // //
            // var KPIsHTML = [];
            // Operational_KPIs.forEach(function(a,i,z)
            // {
            //     KPIsHTML.push('<div class="card">'+
            //         '<div class="card-body">'+
            //             '<span class="badge badge-pill bg-primary px-3 py-2 white fnt-10 sbold">Business sector</span>'+
            //             '<h2 class="card-title my-4 light-gray">2.2 Support for comprehensive job search</h2>'+
            //             '<div class="col light-gray">'+
            //                 '<div class="row">'+
            //                     '<div class="col col-xl-auto">'+
            //                         '<div class="progress-semi">'+
            //                             '<div class="barOverflow">'+
            //                                 '<!--45  (p x 1.5)-->'+
            //                                 '<div class="bar success" style="transform: rotate(106.2deg);"></div>'+
            //                             '</div>'+
            //                             '<span>34%</span>'+
            //                         '</div>'+
            //                     '</div>'+
            //                     '<div class="col">'+
            //                         '<div class="d-flex flex-column">'+
            //                             '<div>'+
            //                                 '//<img src="./img/icon-analytics.png"  style="width:14px;" data-themekey="#">'+
            //                                 '<i class="fas fa-chart-line"></i>'+
            //                                 '<div class="d-inline-flex flex-column mx-2">'+
            //                                     '<span class="complition-val fnt-12 reg">Cumulative</span>'+
            //                                     '<span class="black fnt-12 bold">249,564</span>'+
            //                                 '</div>'+
            //                             '</div>'+
            //                             '<div>'+
            //                                 '//<img src="./img/icon-sar.png" style="width:14px;" data-themekey="#">'+
            //                                 '<i class="fas fa-dollar-sign"></i>'+
            //                                 '<div class="d-inline-flex flex-column mx-2">'+
            //                                     '<span class="complition-val fnt-12 reg">Complition</span>'+
            //                                     '<span class="black fnt-12 bold">Too late</span>'+
            //                                 '</div>'+
            //                             '</div>'+
            //                         '</div>'+
            //                     '</div>'+
            //                 '</div>'+
            //             '</div>'+
            //         '</div>'+
            //         '<div class="collapse" id="collapseExample" style="">'+
            //             '<div class="card-body light-gray">'+
            //                 '<div class="border-top py-3">'+
            //                     '<div class="row mb-3">'+
            //                         '<div class="col-5">'+
            //                             '<span class="fnt-12 reg">'+
            //                                 '<i class="fas fa-check-circle"></i>'+
            //                                 '<span class="px-1">Budget</span>'+
            //                             '</span>'+
            //                         '</div>'+
            //                         '<div class="col-7">'+
            //                             '<div class="d-flex justify-content-between">'+
            //                                 '<div class="d-inline-flex">'+
            //                                     '<span>'+
            //                                         '<span class="qrt-label fnt-12 reg">Approved</span>'+
            //                                         '<span class="fnt-12 bold px-2">200K</span>'+
            //                                     '</span>'+
            //                                 '</div>'+

            //                             '</div>'+
            //                             '<div class="d-flex justify-content-between">'+
            //                                 '<div class="d-inline-flex">'+
            //                                     '<span>'+
            //                                         '<span class="qrt-label fnt-12 reg">Remaining</span>'+
            //                                         '<span class="fnt-12 bold px-2">100K</span>'+
            //                                     '</span>'+
            //                                 '</div>'+
            //                                 '<div class="d-inline-flex">'+
            //                                     '<span>'+
            //                                         '<span class="qrt-label fnt-12 reg">Spent</span>'+
            //                                         '<span class="fnt-12 bold px-2">100K</span>'+
            //                                     '</span>'+
            //                                 '</div>'+
            //                             '</div>'+


            //                         '</div>'+
            //                     '</div>'+

            //                     '<div class="row mb-3">'+
            //                         '<div class="col-5">'+
            //                             '<span class="fnt-12 reg">'+
            //                                 '<i class="fas fa-check-circle"></i>'+
            //                                 '<span class="px-1">Quarter</span>'+
            //                             '</span>'+
            //                         '</div>'+
            //                         '<div class="col-7">'+
            //                             '<div class="d-flex justify-content-between">'+
            //                                 '<div class="d-inline-flex">'+
            //                                     '<span>'+
            //                                         '<span class="qrt-label fnt-12 reg">Q1</span>'+
            //                                         '<span class="qrt-val fnt-12 bold px-2">87,434</span>'+
            //                                     '</span>'+
            //                                 '</div>'+
            //                                 '<div class="d-inline-flex">'+
            //                                     '<span>'+
            //                                         '<span class="qrt-label fnt-12 reg">Q2</span>'+
            //                                         '<span class="qrt-val fnt-12 bold px-2">87,434</span>'+
            //                                     '</span>'+
            //                                 '</div>'+
            //                             '</div>'+
            //                             '<div class="d-flex justify-content-between">'+
            //                                 '<div class="d-inline-flex">'+
            //                                     '<span class="des-13">'+
            //                                         '<span class="qrt-label fnt-12 reg">Q3</span>'+
            //                                         '<span class="qrt-val fnt-12 bold px-2">87,434</span>'+
            //                                     '</span>'+
            //                                 '</div>'+
            //                                 '<div class="d-inline-flex">'+
            //                                     '<span>'+
            //                                         '<span class="qrt-label fnt-12 reg">Q4</span>'+
            //                                         '<span class="qrt-val fnt-12 bold">-</span>'+
            //                                     '</span>'+
            //                                 '</div>'+
            //                             '</div>'+
            //                         '</div>'+
            //                     '</div>'+
            //                     '<div class="row mb-0">'+
            //                         '<div class="col-5">'+
            //                             '<span class="fnt-12 reg">'+
            //                                 '<i class="fas fa-check-circle"></i>'+
            //                                 '<span class="px-1">Investigator by gender</span>'+
            //                             '</span>'+
            //                         '</div>'+
            //                         '<div class="col-7">'+
            //                             '<div class="d-flex justify-content-between">'+
            //                                 '<div class="d-inline-flex">'+
            //                                     '<span>'+
            //                                         '<span class="qrt-label fnt-12 reg">Male</span>'+
            //                                         '<span class="fnt-12 bold">12</span>'+
            //                                     '</span>'+
            //                                 '</div>'+
            //                                 '<div class="d-inline-flex">'+
            //                                     '<span>'+
            //                                         '<span class="qrt-label fnt-12 reg">Female</span>'+
            //                                         '<span class="fnt-12 bold">3</span>'+
            //                                     '</span>'+
            //                                 '</div>'+
            //                             '</div>'+
            //                         '</div>'+
            //                     '</div>'+
            //                 '</div>'+

            //             '</div>'+
            //         '</div>'+
            //         '<a class="view-more d-block text-center bg-btn-gray py-2" onclick="handleCardCollapse.toggle(this)">View More</a>'+
            //     '</div>');
            // });
            // if(KPIsHTML.length == 0)
            // {
            //     KPIsHTML.push(UserNo_Data);
            // }
            // $('.control-ctx.quick-links-ctx > .row.mx-n2.mb-1').html( KPIsHTML.join('') );
        },
        onError: function (sender, args) {
            console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
        },
        // Global variables
        g: {}
    };
    OperationalKPIs_Info_Request.init();
