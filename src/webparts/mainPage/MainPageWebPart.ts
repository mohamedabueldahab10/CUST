require("Resources");
// require('../../HelperCode/Utilities.Core/Resources.js');
require('ListNameConfig');
// require('../../HelperCode/Utilities.Core/List_Name_Config.js')
require('UserAccess');
// require('../../HelperCode/Utilities.Core/Forms.Utilities/User_Access.js')
require('../../HelperCode/Utilities.Core/Side_Navigation.js');
require('../../HelperCode/Core.Solution/Landing/main_home.js');
require('../../HelperRessources/css/Styles.css');
require('../../HelperRessources/css/style-dashboards.css');
require('../../HelperRessources/css/fontello.css');
import { Version } from '@microsoft/sp-core-library';
import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MainPageWebPart.module.scss';
import * as strings from 'MainPageWebPartStrings';

export interface IMainPageWebPartProps {
    description: string;
}

const isArabic = (localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar");
const logo = isArabic ? require('../../HelperRessources/img/main-logo.png') : require('../../HelperRessources/img/main-logo-en.png');
const bell: any = require('../../HelperRessources/img/icon-bell.svg');
const chart: any = require('../../HelperRessources/img/icon-chart.png');
const sar: any = require('../../HelperRessources/img/icon-sar.png');
const stage: any = require('../../HelperRessources/img/icon-stage.png');
const status: any = require('../../HelperRessources/img/icon-status-time.png');
const task: any = require('../../HelperRessources/img/icon-task-list.png');
const important: any = require('../../HelperRessources/img/icon-important-sm.png');
const wallet: any = require("../../HelperRessources/img/icon-wallet.png");
const risk: any = require("../../HelperRessources/img/icon-risk.png")
const projects: any = require('../../HelperRessources/img/icon-projects.png');
const tasks: any = require('../../HelperRessources/img/icon-tasks.png');
// const clearfilter: any = require('../../HelperRessources/img/clear.svg');
const clearfilter: any = require('../../HelperRessources/img/funnel_remove.png');
export default class MainPageWebPart extends BaseClientSideWebPart<IMainPageWebPartProps> {

    public render(): void {
        const RelativeUrl = this.context.pageContext.web.absoluteUrl;
        this.domElement.innerHTML = `<div class="wrapper d-flex" id="navbarsParent">
    <nav class="sidebar d-inline-block">
        <div class="sidebar-sticky">
            <div class="main-logo">
                <a href="${RelativeUrl}">
                    <img css="w-100" src="${logo}">
                </a>
            </div>
            <ul class="nav flex-column">
            </ul>
        </div>
    </nav>
    <div class="main-panel" id="">
        <nav class="navbar px-0">
            <div class="container-fluid">
                <div class="navbar-wrapper">
                    <div class="navbar-toggle">
                        <button class="navbar-toggler js-menu-click d-xl-none" type="button"
                            onClick="handleMainMenu.open()">
                            <span _ngcontent-c3="" class="navbar-toggler-bar bar1"></span>
                            <span _ngcontent-c3="" class="navbar-toggler-bar bar2"></span>
                            <span _ngcontent-c3="" class="navbar-toggler-bar bar3"></span>
                        </button>
                    </div>
                    <h2 class="page-title" id="UserRole"></h2>
                </div>
                <div class="nav-settings justify-content-end">
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group" id="langs">
                            <a class="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center" href="#"
                                id="en">English</a>
                            <a class="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center" href="#" id="ar">عربي</a>
                        </div>


                        <div style="position:relative;">
                            <div class="btn-group mx-3" id="notificationContainer">
                                <button class="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center" type="button" data-toggle="collapse"
                                    data-target="#notificationCollapse" aria-haspopup="true" aria-expanded="false"><span
                                        class="icon-bell d-inline-flex align-items-center text-center"><img src="${bell}" class="mx-3"><span
                                            class="bell-value">0</span></span><span data-trans-notifications class="Resources"></span>
                                </button>
                            </div>
                            <div class="btn-group" id="userGroup">
                                <button class="btn btn-lg dropdown-toggle w-5 fnt-14" type="button" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false"><span class="icon-user d-inline-flex align-items-center text-center mx-3"><span
                                            class="user-name w-100"></span></span><span class="user-name-full"></span>
                                </button>
                                <div class="dropdown-menu border-0 dropdown-menu-right">
                                    <ul class="list-group">
                                        <li class="list-group-item"><a>
                                                <h3 class="title-13">Credits</h3>
                                                <div class="des-12 text-nowrap">A new accreditation has been added</div>
                                            </a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="dropdown-menu border-0 dropdown-menu-center notificationCollapse" id="notificationCollapse">
                                <div class="accordion" id="accordionRequiredSupportNotifications">
                                    <div class="card">
                                        <div class="card-header bg-white" id="headingOne1">
                                            <h3 data-trans-RSupport1 class="Resources acc-header mb-0 py-3 px-2" data-toggle="collapse"
                                                data-target="#collapseOneNotifications" id="cardNote1" aria-expanded="false"
                                                aria-controls="collapseOneNotifications"></h3>
                                        </div>
                                        <div id="collapseOneNotifications" class="collapse" aria-labelledby="headingOne1"
                                            data-parent="#accordionRequiredSupportNotifications">
                                            <div class="card-body">
                                                <ul class="list-group"></ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header bg-white" id="headingTwo1">
                                            <h3 data-trans-RSupport2 class="Resources acc-header mb-0 py-3 px-2" data-toggle="collapse"
                                                data-target="#collapseTwoNotifications" id="cardNote2" aria-expanded="false"
                                                aria-controls="collapseTwoNotifications"></h3>
                                        </div>
                                        <div id="collapseTwoNotifications" class="collapse" aria-labelledby="headingTwo1"
                                            data-parent="#accordionRequiredSupportNotifications">
                                            <div class="card-body">
                                                <ul class="list-group"></ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header bg-white" id="headingThree1">
                                            <h3 data-trans-RSupport3 class="Resources acc-header mb-0 py-3 px-2" data-toggle="collapse"
                                                data-target="#collapseThreeNotifications" id="cardNote3" aria-expanded="false"
                                                aria-controls="collapseThreeNotifications">
                                            </h3>
                                        </div>
                                        <div id="collapseThreeNotifications" class="collapse" aria-labelledby="headingThree1"
                                            data-parent="#accordionRequiredSupportNotifications">
                                            <div class="card-body">
                                                <ul class="list-group"></ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header bg-white" id="headingFour">
                                            <h3 data-trans-RSupport5 class="Resources acc-header mb-0 py-3 px-2" data-toggle="collapse"
                                                data-target="#collapseFourNotifications" id="cardNote4" aria-expanded="false"
                                                aria-controls="collapseFourNotifications">
                                            </h3>
                                        </div>
                                        <div id="collapseFourNotifications" class="collapse" aria-labelledby="headingFour"
                                            data-parent="#accordionRequiredSupportNotifications">
                                            <div class="card-body">
                                                <ul class="list-group"></ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div class="container-ctx">
            <div class="container-body">
                <div class="row">
                    <div class="col-12 col-lg-12">
                        <div class="control-ctx statistics-ctx">
                            <div
                                class="content-list-head d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 mb-3">
                                <div class="d-flex align-items-center">
                                    <img src="${chart}">
                                    <h2 data-trans-title2 class="mb-0 mx-3 py-1 Resources"></h2>
                                </div>
                                <div class="filtersSection">
                                    <div class="clearAllFilter"><button class="Resources" id="clearAllFilter" type="button"><img src="${clearfilter}" class="clearicon" style="width: 20px;"></button></div>
                                    <div class="btn-toolbar mb-2 mb-md-0 mx-2 page-filter">
                                    <div class="dropdown mx-3">
                                        <a data-trans-filter1 href="#"
                                            class="dropdown-toggle fnt-14 w-1 black Resources" data-toggle="dropdown"
                                            role="button"></a>
                                        <div class="dropdown-menu Filter-1">
                                            <!-- filter labels go here -->
                                        </div>
                                    </div>
                                    <div class="dropdown mx-3">
                                        <a data-trans-filter2 href="#"
                                            class="dropdown-toggle fnt-14 w-1 black Resources" data-toggle="dropdown"
                                            role="button"></a>
                                        <div class="dropdown-menu Filter-2">
                                            <!-- filter labels go here -->
                                        </div>
                                    </div>
                                    <div class="dropdown mx-3">
                                        <a data-trans-filter3 href="#"
                                            class="dropdown-toggle fnt-14 w-1 black Resources" data-toggle="dropdown"
                                            role="button"></a>
                                        <div class="dropdown-menu Filter-3">
                                            <!-- filter labels go here -->
                                        </div>
                                    </div>
                                    <div class="dropdown" id="isStrategic">
                                        <a data-trans-filter4 href="#"
                                            class="dropdown-toggle fnt-14 w-1 black Resources" data-toggle="dropdown"
                                            role="button"></a>
                                        <div class="dropdown-menu Filter-4">
                                            <!-- filter labels go here -->
                                        </div>
                                    </div>
                                    <div class="dropdown" id="depfilter">
                                    <a data-trans-filter5 href="#"
                                        class="dropdown-toggle fnt-14 w-1 black Resources" data-toggle="dropdown"
                                        role="button"></a>
                                    <div class="dropdown-menu Filter-5">
                                        <!-- filter labels go here -->
                                    </div>
                                </div>
                                </div>
                                </div>

                            </div>
                            <div class="ctx-block row mx-n2">
                                <div class="col-12 col-lg-4 px-2 mb-3 cardIemClass" id="carditem1">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <div class="dropdown">
                                                <a href="#" class="dropdown-toggle arrow-none card-drop h3 light-gray"
                                                    data-toggle="dropdown" aria-expanded="false">
                                                    <img src="${sar}" class="mx-3"><span data-trans-Budget
                                                        class="Resources"></span>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right CardDivall" id="">
                                                    <!-- item-->
                                                    <a data-trans-CompletionStatus href="javascript:void(0);"
                                                        id="CardDiv2" class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <!--<a data-trans-ScheduleCompletionStatus href="javascript:void(0);"
                                                        id="CardDiv8" class="dropdown-item Resources"></a>-->
                                                    <!-- item-->
                                                    <a data-trans-filter1 href="javascript:void(0);" id="CardDiv3"
                                                        class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <a data-trans-Risks href="javascript:void(0);" id="CardDiv4"
                                                        class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <a data-trans-Importance href="javascript:void(0);" id="CardDiv5"
                                                        class="dropdown-item Resources"></a>
                                                    <a data-trans-Portfolios href="javascript:void(0);" id="CardDiv6"
                                                        class="dropdown-item Resources"></a>
                                                    <a data-trans-Sectors href="javascript:void(0);" id="CardDiv7"
                                                        class="dropdown-item Resources"></a>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <canvas id="budgetChart" width="200" height="196"></canvas>
                                            </div>
                                            <!-- end row-->

                                        </div>
                                        <!-- end card body-->
                                    </div>

                                </div>
                                <div class="col-12 col-lg-4 px-2 mb-3 cardIemClass" id="carditem3">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <div class="dropdown">
                                                <a href="#" class="dropdown-toggle arrow-none card-drop h3 light-gray"
                                                    data-toggle="dropdown" aria-expanded="false">
                                                    <img src="${stage}" class="mx-3"><span data-trans-filter1
                                                        class="Resources"></span>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right CardDivall" id="">
                                                    <!-- item-->
                                                    <a data-trans-Budget href="javascript:void(0);" id="CardDiv1"
                                                        class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <a data-trans-CompletionStatus href="javascript:void(0);"
                                                        id="CardDiv2" class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <!--<a data-trans-ScheduleCompletionStatus href="javascript:void(0);"
                                                        id="CardDiv8" class="dropdown-item Resources"></a>-->
                                                    <!-- item-->
                                                    <a data-trans-Risks href="javascript:void(0);" id="CardDiv4"
                                                        class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <a data-trans-Importance href="javascript:void(0);" id="CardDiv5"
                                                        class="dropdown-item Resources"></a>
                                                    <a data-trans-Portfolios href="javascript:void(0);" id="CardDiv6"
                                                        class="dropdown-item Resources"></a>
                                                    <a data-trans-Sectors href="javascript:void(0);" id="CardDiv7"
                                                        class="dropdown-item Resources"></a>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <canvas id="phaseChart" width="200" height="196"></canvas>
                                            </div>
                                            <!-- end row-->

                                        </div>
                                        <!-- end card body-->
                                    </div>

                                </div>
                                <div class="col-12 col-lg-4 px-2 mb-3 cardIemClass" id="carditem2">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <div class="inner-title d-flex justify-content-between align-items-center">

                                                <div class="dropdown">
                                                    <a href="#"
                                                        class="dropdown-toggle arrow-none card-drop h3 light-gray"
                                                        data-toggle="dropdown" aria-expanded="false">
                                                        <img src="${status}" class="mx-3"><span
                                                            data-trans-CompletionStatus class="Resources"></span>
                                                    </a>
                                                    <div class="dropdown-menu dropdown-menu-right CardDivall" id="">
                                                        <!-- item-->
                                                        <a data-trans-Budget href="javascript:void(0);" id="CardDiv1"
                                                            class="dropdown-item Resources"></a>
                                                        <a data-trans-CompletionStatus href="javascript:void(0);"
                                                            id="CardDiv2" class="dropdown-item Resources"></a>
                                                        <!-- item-->
                                                        <!-- <a data-trans-ScheduleCompletionStatus href="javascript:void(0);"
                                                            id="CardDiv8" class="dropdown-item Resources"></a> -->
                                                        <!-- item-->
                                                        <a data-trans-filter1 href="javascript:void(0);" id="CardDiv3"
                                                            class="dropdown-item Resources"></a>
                                                        <!-- item-->
                                                        <a data-trans-Risks href="javascript:void(0);" id="CardDiv4"
                                                            class="dropdown-item Resources"></a>
                                                        <!-- item-->
                                                        <a data-trans-Importance href="javascript:void(0);"
                                                            id="CardDiv5" class="dropdown-item Resources"></a>
                                                        <a data-trans-Portfolios href="javascript:void(0);"
                                                            id="CardDiv6" class="dropdown-item Resources"></a>
                                                        <a data-trans-Sectors href="javascript:void(0);" id="CardDiv7"
                                                            class="dropdown-item Resources"></a>
                                                    </div>
                                                </div>
                                                <a data-trans-more style="display:none" class="view-all Resources"
                                                    onclick="handlePopupDialog.init()"></a>

                                                <div id="popup-box" class="popup-box px-4 py-4" style="display:none">
                                                    <h2 class="pt-0 pb-2">All Project Progress Status</h2>
                                                    <ul class="list-group mt-4">
                                                        <li class="list-group-item ">
                                                            <a class="d-flex justify-content-between align-items-center m-0 py-3 h4"
                                                                onclick="location.href = 'www.yoursite.com';">
                                                                Various professional financial advice
                                                                <span class="list-info d-flex justify-content-between">
                                                                    <span class="text-super-danger">Too
                                                                        Late</span>
                                                                    <span>
                                                                        <svg width="1em" height="1em"
                                                                            viewBox="0 0 16 16"
                                                                            class="bi bi-chevron-right"
                                                                            fill="currentColor"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path fill-rule="evenodd"
                                                                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                            </a>
                                                        </li>
                                                        <li class="list-group-item ">
                                                            <a class="d-flex justify-content-between align-items-center m-0 py-3 h4"
                                                                onclick="location.href = 'www.yoursite.com';">
                                                                Various professional financial advice
                                                                <span class="list-info d-flex justify-content-between">
                                                                    <span class="text-success">Advanced</span>
                                                                    <span>
                                                                        <svg width="1em" height="1em"
                                                                            viewBox="0 0 16 16"
                                                                            class="bi bi-chevron-right"
                                                                            fill="currentColor"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path fill-rule="evenodd"
                                                                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                            </a>
                                                        </li>
                                                        <li class="list-group-item ">
                                                            <a class="d-flex justify-content-between align-items-center m-0 py-3 h4"
                                                                onclick="location.href = 'www.yoursite.com';">
                                                                Various professional financial advice
                                                                <span class="list-info d-flex justify-content-between">
                                                                    <span class="text-warning">On Plan</span>
                                                                    <span>
                                                                        <svg width="1em" height="1em"
                                                                            viewBox="0 0 16 16"
                                                                            class="bi bi-chevron-right"
                                                                            fill="currentColor"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path fill-rule="evenodd"
                                                                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                            </a>
                                                        </li>
                                                        <li class="list-group-item ">
                                                            <a class="d-flex justify-content-between align-items-center m-0 py-3 h4"
                                                                onclick="location.href = 'www.yoursite.com';">
                                                                Various professional financial advice
                                                                <span class="list-info d-flex justify-content-between">
                                                                    <span class="text-danger">Late</span>
                                                                    <span>
                                                                        <svg width="1em" height="1em"
                                                                            viewBox="0 0 16 16"
                                                                            class="bi bi-chevron-right"
                                                                            fill="currentColor"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path fill-rule="evenodd"
                                                                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <canvas id="statusChart" width="200" height="196"></canvas>
                                            </div>
                                            <!-- end row-->
                                        </div>
                                        <!-- end card body-->

                                    </div>

                                </div>
                                <!-- <div style="display:none" class="col-12 col-lg-4 px-2 mb-3 cardIemClass" id="carditem8">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <div class="inner-title d-flex justify-content-between align-items-center">

                                                <div class="dropdown">
                                                    <a href="#"
                                                        class="dropdown-toggle arrow-none card-drop h3 light-gray"
                                                        data-toggle="dropdown" aria-expanded="false">
                                                        <img src="${status}" class="mx-3"><span
                                                            data-trans-ScheduleCompletionStatus class="Resources"></span>
                                                    </a>
                                                    <div class="dropdown-menu dropdown-menu-right CardDivall" id="">

                                                        <a data-trans-Budget href="javascript:void(0);" id="CardDiv1"
                                                            class="dropdown-item Resources"></a>
                                                        <a data-trans-CompletionStatus href="javascript:void(0);"
                                                            id="CardDiv2" class="dropdown-item Resources"></a>

                                                        <a data-trans-filter1 href="javascript:void(0);" id="CardDiv3"
                                                            class="dropdown-item Resources"></a>

                                                        <a data-trans-Risks href="javascript:void(0);" id="CardDiv4"
                                                            class="dropdown-item Resources"></a>

                                                        <a data-trans-Importance href="javascript:void(0);"
                                                            id="CardDiv5" class="dropdown-item Resources"></a>
                                                        <a data-trans-Portfolios href="javascript:void(0);"
                                                            id="CardDiv6" class="dropdown-item Resources"></a>
                                                        <a data-trans-Sectors href="javascript:void(0);" id="CardDiv7"
                                                            class="dropdown-item Resources"></a>
                                                    </div>
                                                </div>
                                                <a data-trans-more style="display:none" class="view-all Resources"
                                                    onclick="handlePopupDialog.init()"></a>

                                                <div id="popup-box" class="popup-box px-4 py-4" style="display:none">
                                                    <h2 class="pt-0 pb-2">All Project Progress Status</h2>
                                                    <ul class="list-group mt-4">
                                                        <li class="list-group-item ">
                                                            <a class="d-flex justify-content-between align-items-center m-0 py-3 h4"
                                                                onclick="location.href = 'www.yoursite.com';">
                                                                Various professional financial advice
                                                                <span class="list-info d-flex justify-content-between">
                                                                    <span class="text-super-danger">Too
                                                                        Late</span>
                                                                    <span>
                                                                        <svg width="1em" height="1em"
                                                                            viewBox="0 0 16 16"
                                                                            class="bi bi-chevron-right"
                                                                            fill="currentColor"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path fill-rule="evenodd"
                                                                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                            </a>
                                                        </li>
                                                        <li class="list-group-item ">
                                                            <a class="d-flex justify-content-between align-items-center m-0 py-3 h4"
                                                                onclick="location.href = 'www.yoursite.com';">
                                                                Various professional financial advice
                                                                <span class="list-info d-flex justify-content-between">
                                                                    <span class="text-success">Advanced</span>
                                                                    <span>
                                                                        <svg width="1em" height="1em"
                                                                            viewBox="0 0 16 16"
                                                                            class="bi bi-chevron-right"
                                                                            fill="currentColor"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path fill-rule="evenodd"
                                                                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                            </a>
                                                        </li>
                                                        <li class="list-group-item ">
                                                            <a class="d-flex justify-content-between align-items-center m-0 py-3 h4"
                                                                onclick="location.href = 'www.yoursite.com';">
                                                                Various professional financial advice
                                                                <span class="list-info d-flex justify-content-between">
                                                                    <span class="text-warning">On Plan</span>
                                                                    <span>
                                                                        <svg width="1em" height="1em"
                                                                            viewBox="0 0 16 16"
                                                                            class="bi bi-chevron-right"
                                                                            fill="currentColor"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path fill-rule="evenodd"
                                                                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                            </a>
                                                        </li>
                                                        <li class="list-group-item ">
                                                            <a class="d-flex justify-content-between align-items-center m-0 py-3 h4"
                                                                onclick="location.href = 'www.yoursite.com';">
                                                                Various professional financial advice
                                                                <span class="list-info d-flex justify-content-between">
                                                                    <span class="text-danger">Late</span>
                                                                    <span>
                                                                        <svg width="1em" height="1em"
                                                                            viewBox="0 0 16 16"
                                                                            class="bi bi-chevron-right"
                                                                            fill="currentColor"
                                                                            xmlns="http://www.w3.org/2000/svg">
                                                                            <path fill-rule="evenodd"
                                                                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <canvas id="statusScheduleChart" width="200" height="196"></canvas>
                                            </div>
                                        </div>

                                    </div>

                                </div> -->
                                <div class="col-12 col-lg-4 px-2 mb-3 cardIemClass" id="carditem4">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <div class="dropdown">
                                                <a href="#" class="dropdown-toggle arrow-none card-drop h3 light-gray"
                                                    data-toggle="dropdown" aria-expanded="false">
                                                    <img src="${risk}" class="mx-3"><span data-trans-Risks
                                                        class="Resources"></span>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right CardDivall" id="">
                                                    <!-- item-->
                                                    <a data-trans-Budget href="javascript:void(0);" id="CardDiv1"
                                                        class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <a data-trans-CompletionStatus href="javascript:void(0);"
                                                        id="CardDiv2" class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <!--<a data-trans-ScheduleCompletionStatus href="javascript:void(0);"
                                                        id="CardDiv8" class="dropdown-item Resources"></a>-->
                                                    <!-- item-->
                                                    <a data-trans-filter1 href="javascript:void(0);" id="CardDiv3"
                                                        class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <a data-trans-Importance href="javascript:void(0);" id="CardDiv5"
                                                        class="dropdown-item Resources"></a>
                                                    <a data-trans-Portfolios href="javascript:void(0);" id="CardDiv6"
                                                        class="dropdown-item Resources"></a>
                                                    <a data-trans-Sectors href="javascript:void(0);" id="CardDiv7"
                                                        class="dropdown-item Resources"></a>
                                                </div>
                                            </div>

                                            <div class="card-body">
                                                <canvas id="riskChart" style="width: 270px; height: 270px"></canvas>
                                            </div>
                                            <!-- end row-->

                                        </div>
                                        <!-- end card body-->
                                    </div>

                                </div>
                                <div class="col-12 col-lg-4 px-2 mb-3 cardIemClass" id="carditem5">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <div class="dropdown">
                                                <a href="#" class="dropdown-toggle arrow-none card-drop h3 light-gray"
                                                    data-toggle="dropdown" aria-expanded="false">
                                                    <img src="${important}" class="mx-3"><span data-trans-Importance
                                                        class="Resources"></span>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right CardDivall" id="">
                                                    <!-- item-->
                                                    <a data-trans-Budget href="javascript:void(0);" id="CardDiv1"
                                                        class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <a data-trans-CompletionStatus href="javascript:void(0);"
                                                        id="CardDiv2" class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <!--<a data-trans-ScheduleCompletionStatus href="javascript:void(0);"
                                                        id="CardDiv8" class="dropdown-item Resources"></a>-->
                                                    <!-- item-->
                                                    <a data-trans-Risks href="javascript:void(0);" id="CardDiv4"
                                                        class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <a data-trans-filter1 href="javascript:void(0);" id="CardDiv3"
                                                        class="dropdown-item Resources"></a>
                                                    <a data-trans-Portfolios href="javascript:void(0);" id="CardDiv6"
                                                        class="dropdown-item Resources"></a>
                                                    <a data-trans-Sectors href="javascript:void(0);" id="CardDiv7"
                                                        class="dropdown-item Resources"></a>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <canvas id="priorityChart" width="200" height="196"></canvas>
                                            </div>
                                            <!-- end row-->

                                        </div>
                                        <!-- end card body-->
                                    </div>

                                </div>
                                <div class="col-12 col-lg-4 px-2 mb-3 cardIemClass" id="carditem6">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <div class="dropdown">
                                                <a href="#" class="dropdown-toggle arrow-none card-drop h3 light-gray"
                                                    data-toggle="dropdown" aria-expanded="false">
                                                    <img src="${wallet}" class="mx-3"><span data-trans-Portfolios
                                                        class="Resources"></span>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right CardDivall" id="">
                                                    <!-- item-->
                                                    <a data-trans-Budget href="javascript:void(0);" id="CardDiv1"
                                                        class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <a data-trans-CompletionStatus href="javascript:void(0);"
                                                        id="CardDiv2" class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <!--<a data-trans-ScheduleCompletionStatus href="javascript:void(0);"
                                                        id="CardDiv8" class="dropdown-item Resources"></a>-->
                                                    <!-- item-->
                                                    <a data-trans-Risks href="javascript:void(0);" id="CardDiv4"
                                                        class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <a data-trans-Importance href="javascript:void(0);" id="CardDiv5"
                                                        class="dropdown-item Resources"></a>
                                                    <a data-trans-filter1 href="javascript:void(0);" id="CardDiv3"
                                                        class="dropdown-item Resources"></a>
                                                    <a data-trans-Sectors href="javascript:void(0);" id="CardDiv7"
                                                        class="dropdown-item Resources"></a>

                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <canvas id="portfoliosChart"
                                                    style="width: 270px; height: 270px"></canvas>
                                            </div>
                                            <!-- end row-->

                                        </div>
                                        <!-- end card body-->
                                    </div>

                                </div>
                                <div class="col-12 col-lg-4 px-2 mb-3 cardIemClass" id="carditem7">
                                    <div class="card h-100">
                                        <div class="card-body">
                                            <div class="dropdown">
                                                <a href="#" class="dropdown-toggle arrow-none card-drop h3 light-gray"
                                                    data-toggle="dropdown" aria-expanded="false">
                                                    <img src="${stage}" class="mx-3"><span data-trans-Sectors
                                                        class="Resources"></span>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right CardDivall" id="">
                                                    <!-- item-->
                                                    <a data-trans-Budget href="javascript:void(0);" id="CardDiv1"
                                                        class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <a data-trans-CompletionStatus href="javascript:void(0);"
                                                        id="CardDiv2" class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <!--<a data-trans-ScheduleCompletionStatus href="javascript:void(0);"
                                                        id="CardDiv8" class="dropdown-item Resources"></a>-->
                                                    <!-- item-->
                                                    <a data-trans-Risks href="javascript:void(0);" id="CardDiv4"
                                                        class="dropdown-item Resources"></a>
                                                    <!-- item-->
                                                    <a data-trans-filter1 href="javascript:void(0);" id="CardDiv3"
                                                        class="dropdown-item Resources"></a>
                                                    <a data-trans-Importance href="javascript:void(0);" id="CardDiv5"
                                                        class="dropdown-item Resources"></a>
                                                    <a data-trans-Portfolios href="javascript:void(0);" id="CardDiv6"
                                                        class="dropdown-item Resources"></a>

                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <canvas id="departmentsChart"
                                                    style="width: 270px; height: 270px"></canvas>
                                            </div>
                                            <!-- end row-->

                                        </div>
                                        <!-- end card body-->
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-12">
                        <div class="ctx-block row mx-n2">
                            <div class="col-12 col-lg-8 px-2 mb-3 control-ctx projects-ctx ">
                                <div
                                    class="content-list-head d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 mb-3">
                                    <div class="d-flex align-items-center">
                                        <img src="${projects}">
                                        <h2 data-trans-title3 class="mb-0 mx-3 py-1 Resources"></h2>
                                        <span class="badge badge-pill bg-gold px-3 white PNumber">0</span>
                                    </div>
                                    <div class="btn-toolbar mb-2 mb-md-0 mx-2" style="display:none">
                                        <div class="dropdown">
                                            <a data-trans-filter1 href="#"
                                                class="dropdown-toggle fnt-14 w-1 black Resources"
                                                data-toggle="dropdown" role="button"></a>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" href="components-bootstrap.html">Bootstrap
                                                    Components</a>
                                                <a class="dropdown-item" href="components-pipeline.html">Pipeline
                                                    Components</a>
                                            </div>
                                        </div>
                                        <div class="dropdown mx-3">
                                            <a data-trans-filter2 href="#"
                                                class="dropdown-toggle fnt-14 w-1 black Resources"
                                                data-toggle="dropdown" role="button"></a>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" href="components-bootstrap.html">Bootstrap
                                                    Components</a>
                                                <a class="dropdown-item" href="components-pipeline.html">Pipeline
                                                    Components</a>
                                            </div>
                                        </div>
                                        <div class="dropdown">
                                            <a data-trans-filter3 href="#"
                                                class="dropdown-toggle fnt-14 w-1 black Resources"
                                                data-toggle="dropdown" role="button"></a>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" href="components-bootstrap.html">Bootstrap
                                                    Components</a>
                                                <a class="dropdown-item" href="components-pipeline.html">Pipeline
                                                    Components</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ul class="nav nav-tabs" id="projectType" role="tablist">
                                    <li class="nav-item">
                                        <a  class="nav-link active " id="Internal"
                                            data-toggle="tab" href="#InternalProjects" role="tab"
                                            aria-controls="InternalProjects" aria-selected="true">
                                            <span data-trans-Internal class="Resources"></span>
                                            <span id="internalProjectCount"></span>
                                        </a>

                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="External"
                                            data-toggle="tab" href="#ExternalProjects" role="tab"
                                            aria-controls="ExternalProjects" aria-selected="false">
                                            <span data-trans-External class="Resources"></span>
                                            <span id="externalProjectCount"></span>
                                        </a>

                                    </li>
                                </ul>
                                <div class="tab-content" id="projectTypeContent">
                                    <div class="tab-pane fade show active" id="InternalProjects" role="tabpanel"
                                        aria-labelledby="Internal">
                                        <div class="accordion internalAccordion" id="accordionProject">

                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="ExternalProjects" role="tabpanel"
                                        aria-labelledby="External">
                                        <div class="accordion externalAccordion" id="accordionProject">

                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div class="col-12 col-lg-4 px-2 mb-3 control-ctx required-support-ctx">
                                <div
                                    class="content-list-head d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 mb-3">

                                    <div class="d-flex align-items-center">
                                        <img src="${tasks}">
                                        <h2 data-trans-title4 class="mb-0 mx-3 py-1 Resources" class="Resources"></h2>
                                        <span class="badge badge-pill bg-gold px-3 white Rsupprot">0</span>

                                    </div>



                                </div>
                                <div class="accordion" id="accordionRequiredSupport">
                                    <div class="card">
                                        <div class="card-header bg-white" id="headingOne">
                                            <h3 data-trans-rsupport1 class="acc-header mb-0 py-3 px-2 Resources"
                                                data-toggle="collapse" data-target="#collapseOne" aria-expanded="false"
                                                aria-controls="collapseOne">

                                            </h3>
                                        </div>

                                        <div id="collapseOne" class="collapse" aria-labelledby="headingOne"
                                            data-parent="#accordionRequiredSupport">
                                            <div class="card-body">
                                                <ul class="list-group">


                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header bg-white" id="headingTwo">
                                            <h3 data-trans-rsupport2 class="acc-header mb-0 py-3 px-2 Resources"
                                                data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false"
                                                aria-controls="collapseTwo">

                                            </h3>
                                        </div>
                                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                                            data-parent="#accordionRequiredSupport">
                                            <div class="card-body">
                                                <ul class="list-group">

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header bg-white" id="headingThree">
                                            <h3 data-trans-rsupport3 class="acc-header mb-0 py-3 px-2 Resources"
                                                data-toggle="collapse" data-target="#collapseThree"
                                                aria-expanded="false" aria-controls="collapseThree">

                                            </h3>
                                        </div>
                                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree"
                                            data-parent="#accordionRequiredSupport">
                                            <div class="card-body">
                                                <ul class="list-group">

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="close-layer js-close-layer" onClick="handleMainMenu.close()"></div>
    </div>
</div>`;
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
