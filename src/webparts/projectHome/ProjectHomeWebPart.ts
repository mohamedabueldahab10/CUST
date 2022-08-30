require("Resources");
require('ListNameConfig');
require('UserAccess');

require('../../HelperCode/Core.Solution/auditing.Activity/site.Activity.js');

require('../../HelperCode/Utilities.Core/Project_Navigation.js');
require('../../HelperCode/Utilities.Core/Side_Navigation.js');
require('../../HelperCode/Core.Solution/Landing/Project_Home.js');
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

import styles from './ProjectHomeWebPart.module.scss';
import * as strings from 'ProjectHomeWebPartStrings';

export interface IProjectHomeWebPartProps {
  description: string;
}
const isArabic = (localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar");
const logo = isArabic ? require('../../HelperRessources/img/main-logo.png') : require('../../HelperRessources/img/main-logo-en.png');
const home: any = require('../../HelperRessources/img/nav-home.png');
const sections: any = require('../../HelperRessources/img/nav-sections.png');
const initiatives: any = require('../../HelperRessources/img/nav-initiatives.png');
const projects: any = require('../../HelperRessources/img/nav-projects.png');
const edit: any = require('../../HelperRessources/img/icon-edit.png');
const bell: any = require('../../HelperRessources/img/icon-bell.svg');
const statustime: any = require('../../HelperRessources/img/icon-status-time-sm.png');
const important : any = require('../../HelperRessources/img/icon-important-sm.png');
export default class ProjectHomeWebPart extends BaseClientSideWebPart<IProjectHomeWebPartProps> {

  public render(): void {
    const RelativeUrl = this.context.pageContext.web.absoluteUrl;
    this.domElement.innerHTML = `

<div class="wrapper d-flex project-home-page" id="navbarsParent">
<nav class="sidebar d-inline-block">
    <div class="sidebar-sticky">
        <div class="main-logo">
            <a href="${RelativeUrl}">
                <img css="w-100" src="${logo}">
            </a>
        </div>
        <ul class="nav flex-column">
            <!--
            <li class="nav-item">
                <a class="nav-link active" href="../chat.html">
                    <div class="d-flex align-items-center">
                        <div class="nav-icon">
                            <img src="${home}">
                        </div>

                        <span class="nav-link-text px-2">Home</span>
                    </div>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link " href="../chat.html">
                    <div class="d-flex align-items-center">
                        <div class="nav-icon">
                            <img src="${sections}">
                        </div>
                        <span class="nav-link-text px-2">Stratigic Sections</span>
                    </div>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link " href="../chat.html">
                    <div class="d-flex align-items-center">
                        <div class="nav-icon">
                            <img src="${initiatives}">
                        </div>
                        <span class="nav-link-text px-2">Initiatives</span>
                    </div>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link " href="../chat.html">
                    <div class="d-flex align-items-center">
                        <div class="nav-icon">
                            <img src="${projects}">
                        </div>
                        <span class="nav-link-text px-2">Projects</span>
                    </div>
                </a>
            </li>
            -->
        </ul>

    </div>
</nav>

<div class="main-panel">
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
                <h2 class="page-title overflow-ellipsis"> 
                    <span data-trans-PTitle1 class="Resources"></span>
                    <span class="link-arrow"></span>
                    <span class="project-Title-Name"></span>
                </h2>
                <div class="Progress-Action">
                    <button data-trans-updateprogress class="btn btn-action updateprogress Resources"
                        type="button" disabled></button>
                    <div class="Progress-Date">
                        <span data-trans-progressdate class="Resources"></span>
                        <span class="ProgressDate"></span>
                    </div>
                </div>
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

        <div class="navbar page-nav px-5">
            <ul class="navbar-nav bd-navbar-nav flex-row">
                <!--<li class="nav-item active"><a href="#">Home</a></li>
                <li class="nav-item"><a href="#">About</a></li>
                <li class="nav-item"><a href="#">Contact</a></li>-->
            </ul>
            <!--to add extra items on toggle menu-->
            <nav role="navigation" class="extra-nav-items">
                <div class="menuToggleBurgMenu">
                    <input type="checkbox" id="navcheckboxId" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul class="menuBurg">

                    </ul>
                </div>
            </nav>
        </div>

        <div class="container-body">
            <div class="row">

                <div class="col-12 col-lg-8">
                    <div class="control-ctx project-details-ctx">

                        <div class="ctx-block">
                            <div class="card h-100">
                            </div>
                        </div>
                    </div>

                    <div class="control-ctx project-delivery-plan-ctx mt-4">
                        <div class="card h-100">
                            <div class="sched-head card-header bg-white border-bottom px-4 py-4 justify-content-between">
                                <h2 data-trans-PTitle2 class="black Resources">
                                </h2>

                            </div>
                            <div class="card-body project-delivery-info border-bottom pb-4 px-0 fromTimeLine">

                                <div class="delivery-timeline mx-4 py-3">
                                    <div class="row">
                                        <div class="col-lg-3 col-xl-2 mb-3 mb-lg-2">
                                            <select id="inputYear" class="input-year form-control">
                                            </select>
                                        </div>
                                        <div class="col-lg-12 col-xl-10">
                                            <div class="month-list-ctx">
                                                <div class="month-list d-flex" style="padding-bottom:16px">
                                                    <div style="display: flex;width: 100%;font-size:14px">
                                                        <div class="col px-2 month" id="month-1" style="cursor:pointer;">
                                                            <span data-trans-PAttr9 class="Resources"></span>

                                                        </div>

                                                        <div class="col px-2 month" id="month-2" style="cursor:pointer;">
                                                            <span data-trans-PAttr10 class="Resources"></span>
                                                            <!--<div class="time-box">
                                                                <div class="p-date">1/12</div>
                                                                <div class="p-title">First Delivery</div>
                                                            </div>-->
                                                        </div>
                                                        <div class="col px-2 month" id="month-3" style="cursor:pointer;">
                                                            <span data-trans-PAttr11 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-4" style="cursor:pointer;">
                                                            <span data-trans-PAttr12 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-5" style="cursor:pointer;">
                                                            <span data-trans-PAttr13 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-6" style="cursor:pointer;">
                                                            <span data-trans-PAttr14 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-7" style="cursor:pointer;">
                                                            <span data-trans-PAttr15 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-8" style="cursor:pointer;">
                                                            <span data-trans-PAttr16 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-9" style="cursor:pointer;">
                                                            <span data-trans-PAttr17 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-10" style="cursor:pointer;">
                                                            <span data-trans-PAttr18 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-11" style="cursor:pointer;">
                                                            <span data-trans-PAttr19 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-12" style="cursor:pointer;">
                                                            <span data-trans-PAttr20 class="Resources"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="fromTlContainer scrollBarStyle" style="max-height: 55px;overflow-y: auto;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="project-milestone">

                                </div>

                            </div>
                            <div style="display:none" class="card-body project-delivery-info border-bottom pb-4 px-0 fromDeliverables">

                                <div class="delivery-timeline mx-4 py-3">
                                    <div class="row">
                                        <div class="col-lg-3 col-xl-2 mb-3 mb-lg-2">
                                            <select id="inputYear" class="input-year form-control">
                                            </select>
                                        </div>
                                        <div class="col-lg-12 col-xl-10">
                                            <div class="month-list-ctx">
                                                <div class="month-list d-flex" style="padding-bottom:16px">
                                                    <div style="display: flex;width: 100%;font-size:14px">
                                                        <div class="col px-2 month" id="month-1" style="cursor:pointer;">
                                                            <span data-trans-PAttr9 class="Resources"></span>

                                                        </div>

                                                        <div class="col px-2 month" id="month-2" style="cursor:pointer;">
                                                            <span data-trans-PAttr10 class="Resources"></span>
                                                            <!--<div class="time-box">
                                                                <div class="p-date">1/12</div>
                                                                <div class="p-title">First Delivery</div>
                                                            </div>-->
                                                        </div>
                                                        <div class="col px-2 month" id="month-3" style="cursor:pointer;">
                                                            <span data-trans-PAttr11 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-4" style="cursor:pointer;">
                                                            <span data-trans-PAttr12 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-5" style="cursor:pointer;">
                                                            <span data-trans-PAttr13 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-6" style="cursor:pointer;">
                                                            <span data-trans-PAttr14 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-7" style="cursor:pointer;">
                                                            <span data-trans-PAttr15 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-8" style="cursor:pointer;">
                                                            <span data-trans-PAttr16 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-9" style="cursor:pointer;">
                                                            <span data-trans-PAttr17 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-10" style="cursor:pointer;">
                                                            <span data-trans-PAttr18 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-11" style="cursor:pointer;">
                                                            <span data-trans-PAttr19 class="Resources"></span>
                                                        </div>
                                                        <div class="col px-2 month" id="month-12" style="cursor:pointer;">
                                                            <span data-trans-PAttr20 class="Resources"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tlContainer scrollBarStyle" style="max-height: 55px;overflow-y: auto;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="project-milestone">

                                </div>

                            </div>



                        </div>
                    </div>
                    <div class="control-ctx project-requests-ctx mt-4">
                        <div class="card">
                            <ul class="nav mb-1 custom-nav border-bottom" id="pills-tab" role="tablist">
                                <li class="nav-item active">
                                    <a data-trans-PTitle6 class="nav-link active Resources" id="pills-first-tab"
                                        data-toggle="pill" href="#pills-first" role="tab"
                                        aria-controls="pills-first" aria-selected="true"></a>
                                </li>
                                <li class="nav-item">
                                    <a data-trans-PTitle7 class="nav-link Resources" id="pills-second-tab"
                                        data-toggle="pill" href="#pills-second" role="tab"
                                        aria-controls="pills-second" aria-selected="false"></a>
                                </li>
                                <li class="nav-item">
                                    <a data-trans-PTitle9 class="nav-link Resources" id="pills-fourth-tab"
                                        data-toggle="pill" href="#pills-fourth" role="tab"
                                        aria-controls="pills-fourth" aria-selected="false"></a>
                                </li>
                                <li class="nav-item deliveriesHide">
                                    <a data-trans-PTitle8 class="nav-link Resources" id="pills-third-tab"
                                        data-toggle="pill" href="#pills-third" role="tab"
                                        aria-controls="pills-third" aria-selected="false"></a>
                                </li>

                                <li class="nav-item">
                                    <a data-trans-PTitle10 class="nav-link Resources" id="pills-fifth-tab"
                                        data-toggle="pill" href="#pills-fifth" role="tab"
                                        aria-controls="pills-fifth" aria-selected="false"></a>
                                </li>
                                <li class="nav-item">
                                    <a data-trans-PTitle11 class="nav-link Resources" id="pills-sixth-tab"
                                        data-toggle="pill" href="#pills-sixth" role="tab"
                                        aria-controls="pills-sixth" aria-selected="false"></a>
                                </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                                <div style="max-height:300px;overflow-y:auto" class="tab-pane fade px-4 show active" id="pills-first" role="tabpanel"
                                    aria-labelledby="pills-first-tab">
                                    <ul class="list-group w-100 border-custom">


                                    </ul>
                                </div>
                                <div style="max-height:300px;overflow-y:auto" class="tab-pane fade px-4" id="pills-second" role="tabpanel"
                                    aria-labelledby="pills-second-tab">
                                    <ul class="list-group w-100 border-custom">

                                    </ul>
                                </div>
                                <div style="max-height:300px;overflow-y:auto" class="tab-pane fade px-4 deliveriesHide" id="pills-third" role="tabpanel"
                                    aria-labelledby="pills-third-tab">
                                    <ul class="list-group w-100 border-custom">
                                    </ul>
                                </div>
                                <div style="max-height:300px;overflow-y:auto" class="tab-pane fade px-4" id="pills-fourth" role="tabpanel"
                                    aria-labelledby="pills-fourth-tab">
                                    <ul class="list-group w-100 border-custom">
                                    </ul>
                                </div>
                                <div style="max-height:300px;overflow-y:auto" class="tab-pane fade px-4" id="pills-fifth" role="tabpanel"
                                    aria-labelledby="pills-fifth-tab">
                                    <ul class="list-group w-100 border-custom">
                                    </ul>
                                </div>
                                <div style="max-height:300px;overflow-y:auto" class="tab-pane fade px-4" id="pills-sixth" role="tabpanel"
                                    aria-labelledby="pills-sixth-tab">
                                    <ul class="list-group w-100 border-custom">
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="control-ctx project-stages-ctx mt-4">
                        <div class="card h-100">
                            <div class="card-header bg-white border-bottom px-4 py-4 justify-content-between">
                                <h2 data-trans-PTitle3 class="black Resources">
                                </h2>

                            </div>
                            <div class="card-body project-status-info border-bottom pb-0 px-0 py-0">

                                <div class="row">
                                    <div class="col-auto border-left pt-3 pb-4">
                                        <div class="nav flex-column v-pills-tab" id="v-pills-tab" role="tablist"
                                            aria-orientation="vertical">
                                            <!--<a class="nav-link fnt-13 bold active show" id="v-pills-first-tab" data-toggle="pill" href="#v-pills-first" role="tab" aria-controls="v-pills-first" aria-selected="true"> <span class="width:50px">100%</span>
                                                <span class="px-2">S0 pre-approval</span>
                                            </a>
                                            <a class="nav-link fnt-13 bold gold" id="v-pills-second-tab" data-toggle="pill" href="#v-pills-second" role="tab" aria-controls="v-pills-second" aria-selected="false">
                                                <span class="width:50px">100%</span>
                                                <span class="px-2">S1 Design</span>
                                            </a>
                                            <a class="nav-link fnt-13 bold blue deliveriesHide" id="v-pills-third-tab" data-toggle="pill" href="#v-pills-third" role="tab" aria-controls="v-pills-third" aria-selected="false">
                                                <span class="width:50px">100%</span>
                                                <span class="px-2">Compact S2</span>
                                            </a>
                                            <a class="nav-link fnt-13 bold light-blue" id="v-pills-fourth-tab" data-toggle="pill" href="#v-pills-fourth" role="tab" aria-controls="v-pills-fourth" aria-selected="false">
                                                <span class="width:50px">100%</span>
                                                <span class="px-2">Execution S3</span>
                                            </a>
                                            <a class="nav-link fnt-13 bold green" id="v-pills-fifth-tab" data-toggle="pill" href="#v-pills-fifth" role="tab" aria-controls="v-pills-fifth" aria-selected="false">
                                                <span class="width:50px">100%</span>
                                                <span class="px-2">Close the S4 project</span>
                                            </a>-->
                                        </div>
                                    </div>
                                    <div class="col pt-4 pb-3">
                                        <div class="tab-content" id="v-pills-tabContent">
                                            <!--<div class="tab-pane fade active show" id="v-pills-first" role="tabpanel" aria-labelledby="v-pills-first-tab">
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" checked="checked" disabled>
                                                    <label class="form-check-label" for="defaultCheck1">
                                                        Defining resources
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" checked="checked" disabled>
                                                    <label class="form-check-label" for="defaultCheck2">
                                                        The starting project
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck3" disabled>
                                                    <label class="form-check-label" for="defaultCheck3">
                                                        Project plan development
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck4" disabled>
                                                    <label class="form-check-label" for="defaultCheck4">
                                                        COC development
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck5" disabled>
                                                    <label class="form-check-label" for="defaultCheck5">
                                                        Approved invoices
                                                    </label>
                                                </div>

                                            </div>
                                            <div class="tab-pane fade" id="v-pills-second" role="tabpanel" aria-labelledby="v-pills-second-tab">
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" checked="checked" disabled>
                                                    <label class="form-check-label" for="defaultCheck1">
                                                        Defining resources
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" checked="checked" disabled>
                                                    <label class="form-check-label" for="defaultCheck2">
                                                        The starting project
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck3" disabled>
                                                    <label class="form-check-label" for="defaultCheck3">
                                                        Project plan development
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck4" disabled>
                                                    <label class="form-check-label" for="defaultCheck4">
                                                        COC development
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck5" disabled>
                                                    <label class="form-check-label" for="defaultCheck5">
                                                        Approved invoices
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade deliveriesHide" id="v-pills-third" role="tabpanel" aria-labelledby="v-pills-third-tab">
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" checked="checked" disabled>
                                                    <label class="form-check-label" for="defaultCheck1">
                                                        Defining resources
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" checked="checked" disabled>
                                                    <label class="form-check-label" for="defaultCheck2">
                                                        The starting project
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck3" disabled>
                                                    <label class="form-check-label" for="defaultCheck3">
                                                        Project plan development
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck4" disabled>
                                                    <label class="form-check-label" for="defaultCheck4">
                                                        COC development
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck5" disabled>
                                                    <label class="form-check-label" for="defaultCheck5">
                                                        Approved invoices
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="v-pills-fourth" role="tabpanel" aria-labelledby="v-pills-fourth-tab">
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" checked="checked" disabled>
                                                    <label class="form-check-label" for="defaultCheck1">
                                                        Defining resources
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" checked="checked" disabled>
                                                    <label class="form-check-label" for="defaultCheck2">
                                                        The starting project
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck3" disabled>
                                                    <label class="form-check-label" for="defaultCheck3">
                                                        Project plan development
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck4" disabled>
                                                    <label class="form-check-label" for="defaultCheck4">
                                                        COC development
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck5" disabled>
                                                    <label class="form-check-label" for="defaultCheck5">
                                                        Approved invoices
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="v-pills-fifth" role="tabpanel" aria-labelledby="v-pills-fifth-tab">
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" checked="checked" disabled>
                                                    <label class="form-check-label" for="defaultCheck1">
                                                        Defining resources
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" checked="checked" disabled>
                                                    <label class="form-check-label" for="defaultCheck2">
                                                        The starting project
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck3" disabled>
                                                    <label class="form-check-label" for="defaultCheck3">
                                                        Project plan development
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck4" disabled>
                                                    <label class="form-check-label" for="defaultCheck4">
                                                        COC development
                                                    </label>
                                                </div>
                                                <div class="form-check custom-check d-flex align-items-center">
                                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck5" disabled>
                                                    <label class="form-check-label" for="defaultCheck5">
                                                        Approved invoices
                                                    </label>
                                                </div>
                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>

                </div>
                <div class="col-12 col-lg-4">
                    <div class="control-ctx project-info-ctx projects">
                        <div class="card h-100">
                            <div class="card-header bg-white  border-bottom px-4 py-4 justify-content-between">
                                <h2 data-trans-PTitle4 class="black Resources">
                                </h2>
                                <a><img src="${edit}"></a>
                            </div>
                            <div class="card-body project-status-info border-bottom pb-4">
                                <div class="mx-3">
                                    <div class="row">
                           
                                        <div class="col h-100">
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <img src="${important}" class="">
                                                <h3 data-trans-PAttr34 class="mx-2 m-0 text-nowrap Resources"></h3>
                                            </div>
                                            <span id="PjPriority"
                                                class="badge bg-success white py-3 px-4 font-13 bold">
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body project-stakeholders-info border-bottom pb-4">
                                <div class="mx-3 pt-3">
                                    <h3 data-trans-PAttr35 class="mb-4 Resources"></h3>
                                    <div class="media-body pb-3 mb-0 lh-125 border-gray">
                                        <h4 data-trans-PAttr36 class="dark-gray mb-3 Resources"></h4>
                                        <div class="emp-name d-flex flex-row align-items-center">
                                            <span
                                                class="icon-user d-inline-flex bg-warning align-items-center text-center">
                                                <span class="user-name w-100"></span>
                                            </span>
                                            <p class="fnt-14 reg mx-3"></p>
                                        </div>
                                    </div>
                                    <div class="media-body pb-3 mb-0 lh-125 border-gray">
                                        <h4 data-trans-PAttr37 class="dark-gray mb-3 Resources"></h4>
                                        <div class="emp-name d-flex flex-row align-items-center">
                                            <span
                                                class="icon-user d-inline-flex bg-success align-items-center text-center">
                                                <span class="user-name w-100"></span>
                                            </span>
                                            <p class="fnt-14 reg mx-3"></p>
                                        </div>
                                    </div>

                                    <div class="media-body pb-3 mb-0 lh-125 border-gray">
                                        <h4 data-trans-PAttr38 class="dark-gray mb-3 Resources"></h4>
                                        <div class="emp-name d-flex flex-row align-items-center">
                                            <span
                                                class="icon-user d-inline-flex bg-primary align-items-center text-center">
                                                <span class="user-name w-100"></span>
                                            </span>
                                            <p class="fnt-14 reg mx-3"></p>
                                        </div>
                                    </div>

                                    <div class="media-body pb-3 mb-0 lh-125 border-gray hideNoneededElements">
                                        <h4 data-trans-PAttr39 class="dark-gray mb-3 Resources"></h4>
                                        <div class="emp-name d-flex flex-row align-items-center">
                                            <span
                                                class="icon-user d-inline-flex bg-super-danger align-items-center text-center">
                                                <span class="user-name w-100"></span>
                                            </span>
                                            <p class="fnt-14 reg mx-3"></p>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div class="card-body project-delivery-info border-bottom pb-4">
                                <div class="mx-3 pt-3">

                                    <div class="d-flex justify-content-between pb-3 mb-0 lh-125 border-gray">
                                        <span data-trans-PAttr40 class="Resources"></span>
                                        <span class="fnt-14 bold"></span>

                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="control-ctx project-budget-ctx mt-4">
                        <div class="card h-100">
                            <div class="card-header bg-white border-bottom px-4 py-4 justify-content-between">
                                <h2 data-trans-PTitle5 class="black Resources">
                                </h2>
                            </div>
                            <div class="card-body project-status-info border-bottom pb-4 px-0">
                                <div class="d-flex flex-row align-items-center mx-4 py-3">
                                    <span class="icon-user md d-inline-flex align-items-center text-center">
                                        <span data-trans-PAttr42 class="user-name md w-100 Resources"></span>
                                    </span>
                                    <div class="d-inline-flex flex-column mx-3">
                                        <div data-trans-PAttr43 class="d-inline-flex black fnt-14 Resources"></div>
                                        <div class="project-budget-value h4"></div>
                                    </div>
                                </div>
                                <div class="d-flex flex-row align-items-center mx-4 py-3">

                                    <div class="progress-circle" data-value='90' style="width:54px;height:54px;">
                                        <span class="progress-circle-left">
                                            <span class="progress-circle-bar border-primary"></span>
                                        </span>
                                        <span class="progress-circle-right">
                                            <span class="progress-circle-bar border-primary"></span>
                                        </span>

                                    </div>


                                    <div class="d-inline-flex flex-column mx-3 py-3">
                                        <div data-trans-pattr44 class="d-inline-flex black fnt-14 Resources"></div>
                                        <div class="project-budget-value h4"></div>
                                    </div>
                                </div>
                                <div class="d-flex flex-row align-items-center mx-4 py-3">
                                    <div class="progress-circle" data-value='90' style="width:54px;height:54px;">
                                        <span class="progress-circle-left">
                                            <span class="progress-circle-bar border-primary"></span>
                                        </span>
                                    </div>
                                    <div class="d-inline-flex flex-column mx-3">
                                        <div data-trans-PAttr45 class="d-inline-flex black fnt-14 Resources"></div>
                                        <div class="project-budget-value h4">35.999 SAR</div>
                                    </div>
                                </div>
                                <div class="d-flex flex-row align-items-center mx-4 py-3">
                                    <div class="progress-circle" data-value='90' style="width:54px;height:54px;">
                                        <span class="progress-circle-right">
                                            <span class="progress-circle-bar border-primary"></span>
                                        </span>
                                    </div>
                                    <div class="d-inline-flex flex-column mx-3">
                                        <div data-trans-amountpaid class="d-inline-flex black fnt-14 Resources"></div>
                                        <div class="project-budget-value h4">35.999 SAR</div>
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
