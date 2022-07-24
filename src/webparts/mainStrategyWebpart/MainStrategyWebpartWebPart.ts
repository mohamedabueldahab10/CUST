require("Resources");
require('ListNameConfig');
require('UserAccess');
require('../../HelperCode/Utilities.Core/Side_Navigation.js');
require('../../HelperCode/Core.Solution/Listing/MainStrategy.js');
require('../../HelperRessources/css/Styles.css');
require('../../HelperRessources/css/style-dashboards.css');
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MainStrategyWebpartWebPart.module.scss';
import * as strings from 'MainStrategyWebpartWebPartStrings';

export interface IMainStrategyWebpartWebPartProps {
  description: string;
}
const isArabic = (localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar");
const logo = isArabic ? require('../../HelperRessources/img/main-logo.png') : require('../../HelperRessources/img/main-logo-en.png');

const vision: any = require('../../HelperRessources/img/strategy/visionicon.svg');
const goals: any = require('../../HelperRessources/img/strategy/missionicon.svg');
const message: any = require('../../HelperRessources/img/strategy/messageicon.svg');
const values: any = require('../../HelperRessources/img/strategy/valuesicon.svg');

const focus: any = require('../../HelperRessources/img/strategy/focus.svg');
const result: any = require('../../HelperRessources/img/strategy/result.svg');
const special: any = require('../../HelperRessources/img/strategy/special.svg');
const transparency: any = require('../../HelperRessources/img/strategy/transparency.svg');
const team: any = require('../../HelperRessources/img/strategy/team.svg');
const execution: any = require('../../HelperRessources/img/strategy/execution.svg');
const bell: any = require('../../HelperRessources/img/icon-bell.svg');
export default class MainStrategyWebpartWebPart extends BaseClientSideWebPart<IMainStrategyWebpartWebPartProps> {

  public render(): void {
    // let elem1 = document.getElementById("particles-background");
    // elem1.parentNode.removeChild(elem1);
    // let elem2 = document.getElementById("particles-foreground");
    // elem2.parentNode.removeChild(elem2);
    // let elem3 = document.getElementsByClassName("vertical-centered-box") as HTMLCollectionOf<HTMLElement>;
    // elem3[0].style.display = "none";
    document.getElementById('s4-workspace').style.opacity='1';
    this.domElement.innerHTML = `

    <div class="wrapper d-flex project-home-page" id="navbarsParent">
    <nav class="sidebar d-inline-block">
        <div class="sidebar-sticky">
            <div class="main-logo">
                <a href="/">
                    <img css="w-100" src="${logo}">
                </a>
            </div>
            <ul class="nav flex-column">
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

            <div class="navbar page-nav px-5">
                <ul class="navbar-nav bd-navbar-nav flex-row">
                    <!--<li class="nav-item active"><a href="#">Home</a></li>
                    <li class="nav-item"><a href="#">About</a></li>
                    <li class="nav-item"><a href="#">Contact</a></li>-->
                </ul>
            </div>

            <div class="container-body">
                <div class="row">
                    <div class="col-12">
                      <div class="control-ctx strategy-cards-ctx mb-5">
                           <div id="MainKPIsList" class="column" style="box-shadow: 0 2px 1px #e6e7e9!important;">
                                <div class="top-container align-items-center justify-content-between" data-id="">
                                    <div class="dropdown mx-4" id="top-dropDown">
                                        <a href="#" class="dropdown-toggle fnt-14 w-1 black operational-filter" data-toggle="dropdown" role="button" id="dropdownToggle" data-id=""></a>
                                        <div class="dropdown-menu" id="KPIsNames" data-id=""></div>
                                    </div>
                                </div>
                            </div>
                        <div class="ctx-block row mx-n2">
                          <div class="col-12 col-sm-4 px-2 mb-3">
                            <div class="card h-100">
                              <div class="card-body">
                                <div class="d-flex align-items-start">
                                  <img class="mx-3" src="${vision}">
                                  <h2 data-trans-vision class="Resources mb-0 mx-3 py-1"></h2>
                                </div>
                                <div class="card-body">
                                  <ul class="nav flex-column">
                                    <li data-trans-visiondata class="Resources visionData"></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-sm-4 px-2 mb-3">
                            <div class="card h-100">
                              <div class="card-body">
                                <div class="d-flex align-items-start">
                                  <img class="mx-3" src="${goals}">
                                  <h2 data-trans-goals class="Resources mb-0 mx-3 py-1"></h2>
                                </div>
                                <div class="card-body">
                                  <ul class="nav flex-column">
                                    <li data-trans-goalsdata class="Resources goalsData">​</li>
                                    <!--
                                    <li>المواءمة بين الباحثين عن عمل وفرص العمل المناسبة​</li>
                                    <li>رفع مهارات وتنافسية الموارد البشرية  الوطنية​</li>
                                    -->
                                    <li></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 col-sm-4 px-2 mb-3">
                            <div class="card h-100">
                              <div class="card-body">
                                <div class="d-flex align-items-start">
                                  <img class="mx-3" src="${message}">
                                  <h2 data-trans-message class="Resources mb-0 mx-3 py-1"></h2>
                                </div>
                                <div class="card-body">
                                  <ul class="nav flex-column">
                                    <li data-trans-messagedata class="Resources messageData"></li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  <div class="col-12">
                    <div class="control-ctx value-ctx">
                      <div class="ctx-block row mx-n2">
                        <div class="col-12 px-2 mb-3">
                         <table class="Values-Table" width="100%">
                          <thead>
                            <th colspan="3">
                              <div class="d-flex align-items-start">
                                <img class="mx-3" src="${values}">
                                <h2 data-trans-values class="Resources mb-0 mx-3 py-1"></h2>
                              </div>
                            </th>
                          </thead>
                          <tbody class="tableData">
                            <tr>
                              <td>
                                <div class="d-flex align-items-start">
                                  <img class="mx-3 strategyIcon executionImg" src="${execution}">
                                  <h2 data-trans-executionspeed class="Resources mb-0 mx-3 py-1"></h2>
                                </div>
                                <ul class="nav flex-column">
                                  <li data-trans-speedprogressdata class ="Resources SpeedProgressData"></li>
                                </ul>
                              </td>
                              <td>
                                <div class="d-flex align-items-start">
                                  <img class="mx-3 strategyIcon" src="${team}">
                                  <h2 data-trans-teamspirit class="Resources mb-0 mx-3 py-1"></h2>
                                </div>
                                <ul class="nav flex-column">
                                  <li data-trans-teamspiritdata class = "Resources TeamData"></li>
                                </ul>
                              </td>
                              <td>
                                <div class="d-flex align-items-start">
                                  <img class="mx-3 strategyIcon" src="${focus}">
                                  <h2 class="mb-0 mx-3 py-1">التركيز على العميل</h2>
                                </div>
                                <ul class="nav flex-column">
                                  <li class ="CustomerFocusData">شرح بسطرين فقط عن روح الفريق</li>
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div class="d-flex align-items-start">
                                  <img class="mx-3 strategyIcon" src="${transparency}">
                                  <h2 data-trans-transpaeency class="Resources mb-0 mx-3 py-1"></h2>
                                </div>
                                <ul class="nav flex-column">
                                  <li data-trans-transparencydata class ="Resources TransparencyData"></li>
                                </ul>
                              </td>
                              <td>
                                <div class="d-flex align-items-start">
                                  <img class="mx-3 strategyIcon" src="${special}">
                                  <h2 data-trans-exellence class="Resources mb-0 mx-3 py-1"></h2>
                                </div>
                                <ul class="nav flex-column">
                                  <li data-trans-exellencedata class="Resources SpecialistData"></li>
                                </ul>
                              </td>
                              <td>
                                <div class="d-flex align-items-start">
                                  <img class="mx-3 strategyIcon" src="${result}">
                                  <h2 data-trans-focusresult class="Resources mb-0 mx-3 py-1"></h2>
                                </div>
                                <ul class="nav flex-column">
                                  <li data-trans-focusresultdata class ="Resources ResultsFocusData"></li>
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                         </table>
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
