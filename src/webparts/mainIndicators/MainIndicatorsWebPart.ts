require("Resources");
require('ListNameConfig');
// require('UserAccess');

require(["UserAccess"],async function(){
  require('../../HelperCode/Core.Solution/Listing/MainKPIs.js');
});


require('../../HelperCode/Core.Solution/auditing.Activity/site.Activity.js');

require('../../HelperCode/Utilities.Core/Side_Navigation.js');
require('../../HelperRessources/css/Styles.css');
require('../../HelperRessources/css/style-dashboards.css');
require("./mainKpi.css");
// require('../../HelperCode/Core.Solution/Listing/MainKPIs.js');


import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MainIndicatorsWebPart.module.scss';
import * as strings from 'MainIndicatorsWebPartStrings';

export interface IMainIndicatorsWebPartProps {
  description: string;
}
const isArabic = (localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar");
const logo = isArabic ? require('../../HelperRessources/img/main-logo.png') : require('../../HelperRessources/img/main-logo-en.png');
const bell: any = require('../../HelperRessources/img/icon-bell.svg');
const chart: any = require('../../HelperRessources/img/icon-chart.png');
const target: any = require('../../HelperRessources/img/target.png');
const kpi: any = require('../../HelperRessources/img/kpi.png');
const sar: any = require('../../HelperRessources/img/icon-sar.png');
const stage: any = require('../../HelperRessources/img/icon-stage.png');
const status: any = require('../../HelperRessources/img/icon-status-time.png');
const task: any = require('../../HelperRessources/img/icon-task-list.png');
const important: any = require('../../HelperRessources/img/icon-important-sm.png');
const projects: any = require('../../HelperRessources/img/icon-projects.png');
const tasks: any = require('../../HelperRessources/img/icon-tasks.png');
const clearfilter: any = require('../../HelperRessources/img/funnel_remove.png');
const strategic: any = require('../../HelperRessources/img/strategic-icon.png');

export default class MainIndicatorsWebPart extends BaseClientSideWebPart<IMainIndicatorsWebPartProps> {

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
        <h2 class="page-title" id="UserRole"></h2>
      </div>
      <div class="nav-settings justify-content-end">
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group" id="langs">
            <a class="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center" href="#" id="en">English</a>
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
              <button class="btn btn-lg dropdown-toggle w-5 fnt-14" type="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false"><span
                  class="icon-user d-inline-flex align-items-center text-center mx-3"><span
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
                </ul>
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
                        <div class="col-12">
                          <div class="control-ctx quick-links-ctx">
                            <div class="content-list-head d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 mb-3">
                              <div class="d-flex align-items-center">
                                  <img src="${strategic}"> 
                                  <h2 data-trans-strategymainkpi class="mb-0 mx-3 py-1 Resources"></h2>
                              </div>
                              <div class="filtersSection">
                                <div class="clearAllFilter"><button class="Resources" id="clearAllFilter" type="button"><img src="${clearfilter}" class="clearicon" style="width: 20px;"></button>
                                </div>
                                <div class="btn-toolbar mb-2 mb-md-0 mx-2 page-filter">
                                <div class="dropdown" id="isStratigy">
                                    <a data-trans-filterkpisstrategy href="#"
                                        class="dropdown-toggle fnt-14 w-1 black Resources" data-toggle="dropdown"
                                        role="button">
                                    </a>
                                    <div class="dropdown-menu Filter-1 mainindecatorfilter">
                                        <!-- filter labels go here -->
                                    </div>
                                </div>
                                  <div class="dropdown" id="isGoal">
                                      <a data-trans-filterkpisname href="#"
                                          class="dropdown-toggle fnt-14 w-1 black Resources" data-toggle="dropdown"
                                          role="button">
                                      </a>
                                      <div class="dropdown-menu Filter-2 mainindecatorfilter">
                                          <!-- filter labels go here -->
                                      </div>
                                  </div>
                                  <div class="dropdown" id="isSector">
                                      <a data-trans-filterkpissector href="#"
                                          class="dropdown-toggle fnt-14 w-1 black Resources" data-toggle="dropdown"
                                          role="button">
                                      </a>
                                      <div class="dropdown-menu Filter-3 mainindecatorfilter">
                                          <!-- filter labels go here -->
                                      </div>
                                  </div>
                                  <div class="dropdown" id="isDepartment">
                                      <a data-trans-filterkpisdepartment href="#"
                                          class="dropdown-toggle fnt-14 w-1 black Resources" data-toggle="dropdown"
                                          role="button">
                                      </a>
                                      <div class="dropdown-menu Filter-4 mainindecatorfilter">
                                          <!-- filter labels go here -->
                                      </div>
                                  </div>
                                </div>                             
                            </div>
                            </div>
                            <div class="row mx-n2 mb-5 strategy-wrapper">

                            </div>
                          </div>
                            <div class="control-ctx quick-links-ctx">

                            <div class="content-list-head d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 mb-3">
                              <div class="d-flex align-items-center">
                                  <img src="${target}"> 
                                  <h2 data-trans-goals class="mb-0 mx-3 py-1 Resources"></h2>
                              </div>
              
                            </div>


                            <div class="row mx-n2 mb-5 kpi-wrapper">
                            <div class="col px-2 my-5">
                                <div class="link-item p-4  h-100">
                                    <div class="text-center fnt-13 bold river-bed mb-1">1.0</div>
                                    <h4 class="text-center fnt-13 river-bed">الأداء الإستراتيجي</h4>
                                </div>
                            </div>
                            <div class="col px-2 my-5">
                                <div class="link-item p-4 h-100">
                                    <div class="text-center fnt-13 bold river-bed mb-1">2.0</div>
                                    <h4 class="text-center fnt-13 river-bed">التميز التشغيلي</h4>
                                </div>
                            </div>
                            <div class="col px-2 my-5">
                                <div class="link-item p-4 h-100">
                                    <div class="text-center fnt-13 bold river-bed mb-1">3.0</div>
                                    <h4 class="text-center fnt-13 river-bed">الإستدامة المالية</h4>
                                </div>
                            </div>
                            <div class="col px-2 my-5">
                                <div class="link-item p-4 h-100">
                                    <div class="text-center fnt-13 bold river-bed mb-1">4.0</div>
                                    <h4 class="text-center fnt-13 river-bed">المستفيدين</h4>
                                </div>
                            </div>
                            <div class="col px-2 my-5">
                                <div class="link-item p-4 h-100">
                                    <div class="text-center fnt-13 bold river-bed mb-1">5.0</div>
                                    <h4 class="text-center fnt-13 river-bed">تحقق الأثر</h4>
                                </div>
                            </div>
                        </div>
                      </div>
                      <hr />
                      <div class="control-ctx quick-links-ctx">

                      <div class="content-list-head d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 mb-3">
                        <div class="d-flex align-items-center">
                            <img src="${target}"> 
                            <h2 data-trans-subgoals class="mb-0 mx-3 py-1 Resources"></h2>
                        </div>
        
                      </div>


                      <div class="row mx-n2 mb-5 subkpi-wrapper">
                      <div class="col px-2 my-5">
                          <div class="link-item p-4  h-100">
                              <div class="text-center fnt-13 bold river-bed mb-1">1.0</div>
                              <h4 class="text-center fnt-13 river-bed">الأداء الإستراتيجي</h4>
                          </div>
                      </div>
                  </div>
                </div>
                <hr />
                <div class="control-ctx quick-links-ctx">

                <div class="content-list-head d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 mb-3">
                  <div class="d-flex align-items-center">
                      <img src="${target}"> 
                      <h2 data-trans-subgoalslvlthree class="mb-0 mx-3 py-1 Resources"></h2>
                  </div>
  
                </div>


                <div class="row mx-n2 mb-5 subkpilvlthree-wrapper">
                <div class="col px-2 my-5">
                    <div class="link-item p-4  h-100">
                        <div class="text-center fnt-13 bold river-bed mb-1">1.0</div>
                        <h4 class="text-center fnt-13 river-bed">الأداء الإستراتيجي</h4>
                    </div>
                </div>
            </div>
          </div>
                      <hr />
                      <div class="content-list-head d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 mb-3">
                          <div class="d-flex align-items-center">
                            <img src="${kpi}"> 
                            <h2 data-trans-kpimanagement class="mb-0 mx-3 py-1 Resources"></h2>
                          </div>
                      </div>
                            <div class="control-ctx initiative-cards-ctx  mb-5">
                                <div class="card-columns pb-5">
                                     <div class="card">
                                        <div class="card-body">
                                            <span class="badge badge-pill bg-primary px-3 py-2 white fnt-10 sbold">Business sector</span>

                                            <h2 class="card-title my-4 light-gray">2.2 Support for comprehensive job search</h2>
                                            <div class="col light-gray">
                                                <div class="row">
                                                    <div class="col col-xl-auto">

                                                        <div class="progress-semi">
                                                            <div class="barOverflow">
                                                                45  (p x 1.5)
                                                                <div class="bar success" style="transform: rotate(106.2deg);"></div>
                                                            </div>
                                                            <span>34%</span>
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="d-flex flex-column">

                                                            <div>
                                                                <img src="./img/icon-analytics.png" style="width:14px;">
                                                                <div class="d-inline-flex flex-column mx-2">


                                                                    <span class="complition-val fnt-12 reg">Cumulative</span>

                                                                    <span class="black fnt-12 bold">249,564</span>

                                                                </div>

                                                            </div>
                                                            <div>
                                                                <img src="./img/icon-sar.png" style="width:14px;">
                                                                <div class="d-inline-flex flex-column mx-2">

                                                                    <span class="complition-val fnt-12 reg">Complition</span>

                                                                    <span class="black fnt-12 bold">Too late</span>

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="collapse" id="collapseExample" style="">
                                            <div class="card-body light-gray">
                                                <div class="border-top py-3">

                                                    <div class="row mb-3">
                                                        <div class="col-5">
                                                            <span class="fnt-12 reg">
                                                                <img src="./img/icon-checkmark-filled.png" style="width:14px;">
                                                                <span class="px-1">Budget</span>
                                                            </span>
                                                        </div>
                                                        <div class="col-7">
                                                            <div class="d-flex justify-content-between">
                                                                <div class="d-inline-flex">
                                                                    <span>
                                                                        <span class="qrt-label fnt-12 reg">Approved</span>
                                                                        <span class="fnt-12 bold px-2">200K</span>
                                                                    </span>
                                                                </div>

                                                            </div>
                                                            <div class="d-flex justify-content-between">
                                                                <div class="d-inline-flex">
                                                                    <span>
                                                                        <span class="qrt-label fnt-12 reg">Remaining</span>
                                                                        <span class="fnt-12 bold px-2">100K</span>
                                                                    </span>
                                                                </div>
                                                                <div class="d-inline-flex">
                                                                    <span>
                                                                        <span class="qrt-label fnt-12 reg">Spent</span>
                                                                        <span class="fnt-12 bold px-2">100K</span>
                                                                    </span>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>

                                                    <div class="row mb-3">
                                                        <div class="col-5">
                                                            <span class="fnt-12 reg">
                                                                <img src="./img/icon-checkmark-filled.png" style="width:14px;">
                                                                <span class="px-1">Quarter</span>
                                                            </span>
                                                        </div>
                                                        <div class="col-7">
                                                            <div class="d-flex justify-content-between">
                                                                <div class="d-inline-flex">
                                                                    <span>
                                                                        <span class="qrt-label fnt-12 reg">Q1</span>
                                                                        <span class="qrt-val fnt-12 bold px-2">87,434</span>
                                                                    </span>
                                                                </div>
                                                                <div class="d-inline-flex">
                                                                    <span>
                                                                        <span class="qrt-label fnt-12 reg">Q2</span>
                                                                        <span class="qrt-val fnt-12 bold px-2">87,434</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex justify-content-between">
                                                                <div class="d-inline-flex">
                                                                    <span class="des-13">
                                                                        <span class="qrt-label fnt-12 reg">Q3</span>
                                                                        <span class="qrt-val fnt-12 bold px-2">87,434</span>
                                                                    </span>
                                                                </div>
                                                                <div class="d-inline-flex">
                                                                    <span>
                                                                        <span class="qrt-label fnt-12 reg">Q4</span>
                                                                        <span class="qrt-val fnt-12 bold">-</span>
                                                                    </span>
                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>

                                                    <div class="row mb-0">
                                                        <div class="col-5">
                                                            <span class="fnt-12 reg">
                                                                <img src="./img/icon-checkmark-filled.png" style="width:14px;">
                                                                <span class="px-1">Investigator by gender</span>
                                                            </span>
                                                        </div>
                                                        <div class="col-7">
                                                            <div class="d-flex justify-content-between">
                                                                <div class="d-inline-flex">
                                                                    <span>
                                                                        <span class="qrt-label fnt-12 reg">Male</span>
                                                                        <span class="fnt-12 bold">12</span>
                                                                    </span>
                                                                </div>
                                                                <div class="d-inline-flex">
                                                                    <span>
                                                                        <span class="qrt-label fnt-12 reg">Female</span>
                                                                        <span class="fnt-12 bold">3</span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <a class="view-more d-block text-center bg-btn-gray py-2" onclick="handleCardCollapse.toggle(this)">View More</a>
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
