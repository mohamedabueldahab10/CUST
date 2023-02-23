require("Resources");
require('ListNameConfig');
require('UserAccess');
require('../../HelperCode/Utilities.Core/Side_Navigation.js');
require('../../HelperRessources/css/Styles.css');
require('../../HelperRessources/css/style-dashboards.css');
require('../../HelperCode/Core.Solution/Listing/InstrumentsKPI.js');
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ProgramsWebPart.module.scss';
import * as strings from 'ProgramsWebPartStrings';

export interface IProgramsWebPartProps {
  description: string;
}
const bell: any = require('../../HelperRessources/img/icon-bell.svg');
const isArabic = (localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar");
const logo = isArabic ? require('../../HelperRessources/img/main-logo.png') : require('../../HelperRessources/img/main-logo-en.png');
export default class ProgramsWebPart extends BaseClientSideWebPart<IProgramsWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `

    <div class="wrapper d-flex project-home-page" id="navbarsParent">
    <nav class="sidebar d-inline-block">
        <div class="sidebar-sticky">
            <div class="main-logo">
                <a href="/">
                    <img css="w-100" src="${logo}">
                </a>
            </div>
            <ul class="nav flex-column sidelinkscontainer">
                <!--
                <li class="nav-item">
                    <a class="nav-link active" href="../chat.html">
                        <div class="d-flex align-items-center">
                            <div class="nav-icon">
                                <img src="/style library/spm/images/nav-home.png">
                            </div>

                            <span class="nav-link-text px-2">Home</span>
                        </div>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " href="../chat.html">
                        <div class="d-flex align-items-center">
                            <div class="nav-icon">
                                <img src="/style library/spm/images/nav-sections.png">
                            </div>
                            <span class="nav-link-text px-2">Stratigic Sections</span>
                        </div>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " href="../chat.html">
                        <div class="d-flex align-items-center">
                            <div class="nav-icon">
                                <img src="/style library/spm/images/nav-initiatives.png">
                            </div>
                            <span class="nav-link-text px-2">Initiatives</span>
                        </div>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link " href="../chat.html">
                        <div class="d-flex align-items-center">
                            <div class="nav-icon">
                                <img src="/style library/spm/images/nav-projects.png">
                            </div>
                            <span class="nav-link-text px-2">Projects</span>
                        </div>
                    </a>
                </li>
                -->
            </ul>
            <div class="accordion important-links-ctx" id="accordionImportantLinks">
            <div class="card bg-transparent border-0">
                <div class="card-header" id="headingImportantLinks">
                    <h5 class="mb-0 w-100">
                        <button class="important-links-btn btn btn-link text-white w-100 text-center Resources"
                            type="button" data-toggle="collapse" data-target="#collapseImportantLinks"
                            aria-expanded="false" aria-controls="collapseImportantLinks" data-trans-importantLinks>
                            ImportantLinks
                        </button>
                    </h5>
                </div>

                <div id="collapseImportantLinks" class="collapse" aria-labelledby="headingImportantLinks"
                    data-parent="#accordionImportantLinks">
                    <div class="card-body">
                        <ul class="ul-important-links px-3">
                            <!-- important links -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        </div>
    </nav>

    <div class="main-panel">
        <nav class="navbar px-0">
            <div class="container-fluid">
                <div class="navbar-wrapper">

                    <div class="navbar-toggle">
                    <button class="navbar-toggler js-menu-click d-xl-none" type="button" onClick="handleMainMenu.open()">
                            <span _ngcontent-c3="" class="navbar-toggler-bar bar1"></span>
                            <span _ngcontent-c3="" class="navbar-toggler-bar bar2"></span>
                            <span _ngcontent-c3="" class="navbar-toggler-bar bar3"></span>
                        </button>
                    </div>
                    <h2 class="page-title">
                        <span resourcekey="PTitle12"></span>
                        <span class="link-arrow"></span>
                        <span class="project-Title-Name"></span>
                    </h2>

                </div>
                <div class="nav-settings justify-content-end">

                    <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group" id="langs">
                    <a class="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center" href="#" id="en">English</a>
                    <a class="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center" href="#" id="ar">عربي</a>
                </div>
                    <div class="btn-group mx-3">
                    <button class="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center" type="button" data-toggle="collapse"
                        data-target="#notificationCollapse" aria-haspopup="true" aria-expanded="false">
                        <span class="icon-bell d-inline-flex align-items-center text-center mx-3">
                            <img src="${bell}" class="mx-3">
                            <span class="bell-value">0</span>
                        </span>
                        <span resourcekey="Notifications"></span>
                    </button>
                    <div class="dropdown-menu border-0 dropdown-menu-center notificationCollapse" id="notificationCollapse">
                        <div class="accordion" id="accordionRequiredSupportNotifications">
                            <div class="card">
                                <div class="card-header bg-white" id="headingOne1">
                                    <h3 class="acc-header mb-0 py-3 px-2" data-toggle="collapse" data-target="#collapseOneNotifications"
                                        aria-expanded="false" aria-controls="collapseOneNotifications" resourcekey="RSupport1">

                                    </h3>
                                </div>

                                <div id="collapseOneNotifications" class="collapse" aria-labelledby="headingOne1"
                                    data-parent="#accordionRequiredSupportNotifications">
                                    <div class="card-body">
                                        <ul class="list-group">


                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header bg-white" id="headingTwo1">
                                    <h3 class="acc-header mb-0 py-3 px-2" data-toggle="collapse" data-target="#collapseTwoNotifications"
                                        aria-expanded="false" aria-controls="collapseTwoNotifications" resourcekey="RSupport2">

                                    </h3>
                                </div>
                                <div id="collapseTwoNotifications" class="collapse" aria-labelledby="headingTwo1"
                                    data-parent="#accordionRequiredSupportNotifications">
                                    <div class="card-body">
                                        <ul class="list-group">

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header bg-white" id="headingThree1">
                                    <h3 class="acc-header mb-0 py-3 px-2" data-toggle="collapse"
                                        data-target="#collapseThreeNotifications" aria-expanded="false"
                                        aria-controls="collapseThreeNotifications" resourcekey="RSupport3">

                                    </h3>
                                </div>
                                <div id="collapseThreeNotifications" class="collapse" aria-labelledby="headingThree1"
                                    data-parent="#accordionRequiredSupportNotifications">
                                    <div class="card-body">
                                        <ul class="list-group">

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header bg-white" id="headingFour">
                                    <h3 class="acc-header mb-0 py-3 px-2" data-toggle="collapse"
                                        data-target="#collapseFourNotifications" aria-expanded="false"
                                        aria-controls="collapseFourNotifications" resourcekey="RSupport5">

                                    </h3>
                                </div>
                                <div id="collapseFourNotifications" class="collapse" aria-labelledby="headingFour"
                                    data-parent="#accordionRequiredSupportNotifications">
                                    <div class="card-body">
                                        <ul class="list-group">

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                        <div class="btn-group">
                            <button class="btn btn-lg dropdown-toggle w-5 fnt-14" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="icon-user d-inline-flex align-items-center text-center mx-3">
                                    <span class="user-name w-100">AM</span>
                                </span>
                                </span><span class="user-name-full"></span>
                            </button>
                            <div class="dropdown-menu border-0 dropdown-menu-right">
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <a>
                                            <h3 class="title-13">Credits</h3>
                                            <div class="des-12 text-nowrap">A new accreditation has been added</div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div class="container-ctx">
                <div class="container-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="control-ctx program-statistics-ctx">
                              <div id="MainKPIsList" class="column" style="box-shadow: 0 2px 1px #e6e7e9!important;">
                                <div class="top-container align-items-center justify-content-between" data-id="">
                                    <div class="dropdown mx-4" id="top-dropDown">
                                        <a href="#" class="dropdown-toggle fnt-14 w-1 black operational-filter" data-toggle="dropdown" role="button" id="dropdownToggle" data-id=""></a>
                                        <div class="dropdown-menu instrumentMenu" id="KPIsNames" data-id=""></div>
                                    </div>
                                </div>
                                <div class="Progress-Action">
                                  <button class="btn btn-action updateprogress" type="button" resourcekey="Calculate" id="calculateData"></button>
                               </div>
                                <div class="row dropdown mx-4">
                                  <div>
                                    <div class="d-inline-flex flex-column mx-3 justify-content-end">
                                      <div class="d-inline-flex black fnt-14">
                                        <i class="kpi-icon fas fa-chart-line"></i>
                                        <span class="px-1 " resourcekey="CumulativeInvestigator"> </span>
                                      </div>
                                        <div class="d-inline-flex black fnt-14">
                                        <span class="px-1 bold " >9,982 </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div class="d-inline-flex flex-column mx-3 justify-content-end">
                                      <div class="d-inline-flex black fnt-14" id="InitiativeRelatedInfo" data-id="">
                                        <span class="px-1 bold "> </span>
                                        <span class="px-1 bold "> </span>
                                      </div>
                                    </div>
                                  </div>
                                 </div>
                               </div>

                                <div class="content-list-head d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center py-4 mb-3">
                                    <div class="btn-toolbar mb-2 mb-md-0 mx-2">
                                        <div class="dropdown mx-4">
                                            <a data-trans-quarter href="#" class="Resources dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button"></a>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" href="components-bootstrap.html">Bootstrap Components</a>
                                                <a class="dropdown-item" href="components-pipeline.html">Pipeline Components</a>
                                            </div>
                                        </div>
                                        <div class="dropdown">
                                            <a data-trans-year href="#" class="Resources dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button"></a>
                                            <div class="dropdown-menu">
                                                <a class="dropdown-item" href="components-bootstrap.html">Bootstrap Components</a>
                                                <a class="dropdown-item" href="components-pipeline.html">Pipeline Components</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="ctx-block row mx-n2">
                                    <div class="col-12 col-md-6 col-lg-3 px-2 mb-3">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <div class="d-flex flex-row align-items-top py-3">

                                                    <div class="progress-circle danger progress-sm" data-value="90" style="width:48px;height:48px;">
                                                        <span class="progress-circle-left">
                                                            <span class="progress-circle-bar border-primary" style="transform: rotate(144deg);"></span>
                                                        </span>
                                                        <span class="progress-circle-right">
                                                            <span class="progress-circle-bar border-primary" style="transform: rotate(180deg);"></span>
                                                        </span>

                                                    </div>


                                                    <div class="d-inline-flex flex-grow-1 mx-3">
                                                        <h4 class="d-inline-flex flex-grow-1 pt-2 light-gray">توافق</h4>

                                                    </div>
                                                </div>



                                            </div>
                                            <div class="card-body border-top">
                                                <div class="d-flex flex-row align-items-center py-3 justify-content-between">
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <div class="d-inline-flex black fnt-14">Project Owner</div>
                                                        <div class="project-budget-value h4">35.999 SAR</div>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-3 justify-content-end">
                                                        <div class="d-inline-flex black fnt-14">Targeted 2020</div>
                                                        <div class="d-inline-flex project-budget-value h4 justify-content-end">22.000</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div class="col-12 col-md-6 col-lg-3 px-2 mb-3">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <div class="d-flex flex-row align-items-top py-3">

                                                    <div class="progress-circle warning progress-sm" data-value="90" style="width:48px;height:48px;">
                                                        <span class="progress-circle-left">
                                                            <span class="progress-circle-bar border-primary" style="transform: rotate(144deg);"></span>
                                                        </span>
                                                        <span class="progress-circle-right">
                                                            <span class="progress-circle-bar border-primary" style="transform: rotate(180deg);"></span>
                                                        </span>

                                                    </div>


                                                    <div class="d-inline-flex flex-grow-1 mx-3">
                                                        <h4 class="d-inline-flex flex-grow-1 pt-2 light-gray">دعم اجور ايام غسيل الكلى</h4>

                                                    </div>
                                                </div>



                                            </div>
                                            <div class="card-body border-top">
                                                <div class="d-flex flex-row align-items-center py-3 justify-content-between">
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <div class="d-inline-flex black fnt-14">Project Owner</div>
                                                        <div class="project-budget-value h4">35.999 SAR</div>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-3 justify-content-end">
                                                        <div class="d-inline-flex black fnt-14">Targeted 2020</div>
                                                        <div class="d-inline-flex project-budget-value h4 justify-content-end">22.000</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div class="col-12 col-md-6 col-lg-3 px-2 mb-3">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <div class="d-flex flex-row align-items-top py-3">

                                                    <div class="progress-circle warning progress-sm" data-value="90" style="width:48px;height:48px;">
                                                        <span class="progress-circle-left">
                                                            <span class="progress-circle-bar border-primary" style="transform: rotate(144deg);"></span>
                                                        </span>
                                                        <span class="progress-circle-right">
                                                            <span class="progress-circle-bar border-primary" style="transform: rotate(180deg);"></span>
                                                        </span>

                                                    </div>


                                                    <div class="d-inline-flex flex-grow-1 mx-3">
                                                        <h4 class="d-inline-flex flex-grow-1 pt-2 light-gray">برنامج ضيافة الأطفال (القرة)</h4>

                                                    </div>
                                                </div>



                                            </div>
                                            <div class="card-body border-top">
                                                <div class="d-flex flex-row align-items-center py-3 justify-content-between">
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <div class="d-inline-flex black fnt-14">Project Owner</div>
                                                        <div class="project-budget-value h4">35.999 SAR</div>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-3 justify-content-end">
                                                        <div class="d-inline-flex black fnt-14">Targeted 2020</div>
                                                        <div class="d-inline-flex project-budget-value h4 justify-content-end">22.000</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div class="col-12 col-md-6 col-lg-3 px-2 mb-3">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <div class="d-flex flex-row align-items-top py-3">

                                                    <div class="progress-circle success progress-sm" data-value="90" style="width:48px;height:48px;">
                                                        <span class="progress-circle-left">
                                                            <span class="progress-circle-bar border-primary" style="transform: rotate(144deg);"></span>
                                                        </span>
                                                        <span class="progress-circle-right">
                                                            <span class="progress-circle-bar border-primary" style="transform: rotate(180deg);"></span>
                                                        </span>

                                                    </div>


                                                    <div class="d-inline-flex flex-grow-1 mx-3">
                                                        <h4 class="d-inline-flex flex-grow-1 pt-2 light-gray">برنامج نقل المرأة العاملة </h4>

                                                    </div>
                                                </div>



                                            </div>
                                            <div class="card-body border-top">
                                                <div class="d-flex flex-row align-items-center py-3 justify-content-between">
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <div class="d-inline-flex black fnt-14">Project Owner</div>
                                                        <div class="project-budget-value h4">35.999 SAR</div>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-3 justify-content-end">
                                                        <div class="d-inline-flex black fnt-14">Targeted 2020</div>
                                                        <div class="d-inline-flex project-budget-value h4 justify-content-end">22.000</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                            </div>



                        </div>

                    </div>
                    <div class="separator"></div>
                    <div class="row">
                        <div class="col-12 col-lg-8">

                            <div class="control-ctx data-completion-percentage-ctx">


                                <div class="content-list-head d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 mb-3">
                                    <div class="d-flex align-items-center">
                                        <img src="/style library/spm/images/icon-projects.png">
                                        <h2 data-trans-datacomplete class="Resources mb-0 mx-3 py-1"></h2>
                                        <span class="badge badge-pill bg-gold px-3 white">4</span>
                                    </div>

                                </div>
                                <div class="accordion" id="accordionProject">
                                    <div class="card">
                                        <div class="card-header bg-white">
                                            <div class="mb-0 pt-3 px-2 d-flex justify-content-between">
                                                <h4 class="acc-title d-inline-flex">Various professional financial advice</h4>

                                                <div class="d-inline-flex">
                                                    <div class="d-inline-flex flex-column mx-5">
                                                        <h4 class="black">Female 2/13</h4>
                                                        <div class="progress w-100 rounded-soft bg-200 bg-gray" style="height: 7px;">
                                                            <div class="progress-bar bg-super-danger rounded rounded-soft" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100" style="width: 20%;"></div>
                                                        </div>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-2">
                                                        <h4 class="black">Male 13/11</h4>
                                                        <div class="progress w-100 rounded-soft bg-200 bg-gray" style="height: 7px;">
                                                            <div class="progress-bar bg-success rounded rounded-soft" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100" style="width: 80%;"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="mb-0 py-3 px-2 d-flex justify-content-between flex-column flex-sm-row">
                                                <div class="d-inline-flex flex-column mb-2">
                                                    <h4 class="black">Mohammad Abdo</h4>
                                                    <span class="des-12">Data Entry Name</span>
                                                </div>
                                                <div class="d-flex d-sm-inline-flex justify-content-center pt-2">
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <span class="des-13">
                                                            <span class="qrt-label fnt-14 reg">1st Qrt.</span>
                                                            <span class="qrt-val fnt-14 bold mx-2">34%</span>
                                                        </span>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <span class="des-13">
                                                            <span class="qrt-label fnt-14 reg">2nd Qrt.</span>
                                                            <span class="qrt-val fnt-14 bold mx-2">34%</span>
                                                        </span>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <span class="des-13">
                                                            <span class="qrt-label fnt-14 reg">3rd Qrt.</span>
                                                            <span class="qrt-val fnt-14 bold mx-2">34%</span>
                                                        </span>
                                                    </div>
                                                    <div class="d-inline-flex flex-column">
                                                        <span class="des-13">
                                                            <span class="qrt-label fnt-14 reg">4th Qrt.</span>
                                                            <span class="qrt-val fnt-14 bold mx-2">34%</span>
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div class="card">
                                        <div class="card-header bg-white">
                                            <div class="mb-0 pt-3 px-2 d-flex justify-content-between">
                                                <h4 class="acc-title d-inline-flex">Various professional financial advice</h4>

                                                <div class="d-inline-flex">
                                                    <div class="d-inline-flex flex-column mx-5">
                                                        <h4 class="black">Female 2/13</h4>
                                                        <div class="progress w-100 rounded-soft bg-200 bg-gray" style="height: 7px;">
                                                            <div class="progress-bar bg-super-danger rounded rounded-soft" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100" style="width: 20%;"></div>
                                                        </div>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-2">
                                                        <h4 class="black">Male 13/11</h4>
                                                        <div class="progress w-100 rounded-soft bg-200 bg-gray" style="height: 7px;">
                                                            <div class="progress-bar bg-success rounded rounded-soft" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100" style="width: 80%;"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="mb-0 py-3 px-2 d-flex justify-content-between flex-column flex-sm-row">
                                                <div class="d-inline-flex flex-column mb-2">
                                                    <h4 class="black">Mohammad Abdo</h4>
                                                    <span class="des-12">Data Entry Name</span>
                                                </div>
                                                <div class="d-flex d-sm-inline-flex justify-content-center pt-2">
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <span class="des-13">
                                                            <span class="qrt-label fnt-14 reg">1st Qrt.</span>
                                                            <span class="qrt-val fnt-14 bold mx-2">34%</span>
                                                        </span>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <span class="des-13">
                                                            <span class="qrt-label fnt-14 reg">2nd Qrt.</span>
                                                            <span class="qrt-val fnt-14 bold mx-2">34%</span>
                                                        </span>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <span class="des-13">
                                                            <span class="qrt-label fnt-14 reg">3rd Qrt.</span>
                                                            <span class="qrt-val fnt-14 bold mx-2">34%</span>
                                                        </span>
                                                    </div>
                                                    <div class="d-inline-flex flex-column">
                                                        <span class="des-13">
                                                            <span class="qrt-label fnt-14 reg">4th Qrt.</span>
                                                            <span class="qrt-val fnt-14 bold mx-2">34%</span>
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header bg-white">
                                            <div class="mb-0 pt-3 px-2 d-flex justify-content-between">
                                                <h4 class="acc-title d-inline-flex">Various professional financial advice</h4>

                                                <div class="d-inline-flex">
                                                    <div class="d-inline-flex flex-column mx-5">
                                                        <h4 class="black">Female 2/13</h4>
                                                        <div class="progress w-100 rounded-soft bg-200 bg-gray" style="height: 7px;">
                                                            <div class="progress-bar bg-super-danger rounded rounded-soft" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100" style="width: 20%;"></div>
                                                        </div>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-2">
                                                        <h4 class="black">Male 13/11</h4>
                                                        <div class="progress w-100 rounded-soft bg-200 bg-gray" style="height: 7px;">
                                                            <div class="progress-bar bg-success rounded rounded-soft" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100" style="width: 80%;"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="mb-0 py-3 px-2 d-flex justify-content-between flex-column flex-sm-row">
                                                <div class="d-inline-flex flex-column mb-2">
                                                    <h4 class="black">Mohammad Abdo</h4>
                                                    <span class="des-12">Data Entry Name</span>
                                                </div>
                                                <div class="d-flex d-sm-inline-flex justify-content-center pt-2">
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <span class="des-13">
                                                            <span class="qrt-label fnt-14 reg">1st Qrt.</span>
                                                            <span class="qrt-val fnt-14 bold mx-2">34%</span>
                                                        </span>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <span class="des-13">
                                                            <span class="qrt-label fnt-14 reg">2nd Qrt.</span>
                                                            <span class="qrt-val fnt-14 bold mx-2">34%</span>
                                                        </span>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <span class="des-13">
                                                            <span class="qrt-label fnt-14 reg">3rd Qrt.</span>
                                                            <span class="qrt-val fnt-14 bold mx-2">34%</span>
                                                        </span>
                                                    </div>
                                                    <div class="d-inline-flex flex-column">
                                                        <span class="des-13">
                                                            <span class="qrt-label fnt-14 reg">4th Qrt.</span>
                                                            <span class="qrt-val fnt-14 bold mx-2">34%</span>
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <a data-trans-viewmore class="Resources view-more d-block text-center py-2 bg-btn-gray"></a>
                                </div>

                            </div>

                            <!--                            xxxxxxx0-->

                        </div>
                        <div class="col-12 col-lg-4">
                            <div class="control-ctx required-tasks-ctx">
                                <div class="content-list-head d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 mb-3">

                                    <div class="d-flex align-items-center">
                                        <img src="/style library/spm/images/icon-tasks.png">
                                        <h2 data-trans-requiredbusiness class="Resources mb-0 mx-3 py-1"></h2>
                                        <span class="badge badge-pill bg-gold px-3 white">4</span>

                                    </div>

                                </div>
                                <div class="accordion" id="InstrumentAccordionRequiredSupport">
                                    <div class="card">
                                        <div class="card-header bg-white" id="headingOne" style="display:inline">
                                            <h3 class="acc-header mb-0 py-3 px-2" data-toggle="collapse"
                                                data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne"
                                                resourcekey="RSupport1">

                                            </h3>
                                        </div>

                                        <div id="collapseOne" class="collapse" aria-labelledby="headingOne"
                                            data-parent="#OperatIndAccordionRequiredSupport">
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
