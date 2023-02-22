require("Resources");
require('ListNameConfig');
require('UserAccess');
require('../../HelperCode/Utilities.Core/Side_Navigation.js');
require('../../HelperCode/Core.Solution/Listing/OperationalIndicators.js');
require('../../HelperRessources/css/Styles.css');
require('../../HelperRessources/css/style-dashboards.css');
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './OperationalIndicatorsWebPart.module.scss';
import * as strings from 'OperationalIndicatorsWebPartStrings';

export interface IOperationalIndicatorsWebPartProps {
  description: string;
}
const bell: any = require('../../HelperRessources/img/icon-bell.svg');
const isArabic = (localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar");
const logo = isArabic ? require('../../HelperRessources/img/main-logo.png') : require('../../HelperRessources/img/main-logo-en.png');
const mostahdaf = require('../../HelperRessources/img/mostahdaf.svg');
export default class OperationalIndicatorsWebPart extends BaseClientSideWebPart<IOperationalIndicatorsWebPartProps> {

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
                                        <div class="dropdown-menu" id="KPIsNames" data-id=""></div>
                                    </div>
                                </div>
                                <div class="Progress-Action">
                                  <button class="btn btn-action updateprogress" type="button" resourcekey="Calculate" id="calculateData"></button>
                               </div>
                                <div class="dropdown mx-4">
                                    <div class="d-inline-flex flex-column mx-3 justify-content-end">
                                        <div class="d-inline-flex black fnt-14">
                                            <img src="${mostahdaf}" class="" data-themekey="#">
                                            <span resourcekey="IndexGeneralPerformance"></span>
                                        </div>
                                        <div class="d-inline-flex project-budget-value h4 justify-content-end"></div>
                                    </div>
                                </div>
                                        <!-- <div class="dropdown mx-4">
                                            <a href="#" class="dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button"></a>
                                            <div class="dropdown-menu" id="KPIsNames">
                                                <a class="dropdown-item" href="components-bootstrap.html">Bootstrap Components</a>
                                                <a class="dropdown-item" href="components-pipeline.html">Pipeline Components</a>
                                            </div>
                                        </div>
                                        <div class="dropdown mx-4">
                                            <div class="d-inline-flex flex-column mx-3 justify-content-end">
                                                <div class="d-inline-flex black fnt-14">
                                                 <span resourcekey="IndexGeneralPerformance"></span>
                                                </div>
                                                <div class="d-inline-flex project-budget-value h4 justify-content-end"></div>
                                            </div>
                                        </div> -->
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
                                <div class="ctx-block row mx-n2" >


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
                                <div class="accordion operational-accordion" id="accordionProject">
                                    <div class="card">
                                        <div class="card-header bg-white">
                                            <div class="mb-0 pt-3 px-2 d-flex justify-content-between">
                                                 <div class="d-flex flex-row align-items-center py-3 justify-content-between">
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <div class="d-inline-flex black fnt-14">اسم المؤشر</div>
                                                        <div class="project-budget-value h4">نسبة ادارة تنفيذ الاستراتجية التشغيلية</div>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-3 justify-content-end">
                                                        <div class="d-inline-flex black fnt-14">خط الأساس </div>
                                                        <div class="d-inline-flex project-budget-value h4 justify-content-end">85%</div>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <div class="d-inline-flex black fnt-14">الإجمالي</div>
                                                        <div class="project-budget-value h4">88%</div>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <div class="d-inline-flex black fnt-14">وتيرة القياس</div>
                                                        <div class="project-budget-value h4">ربعي</div>
                                                    </div>

                                                </div>

                                                 <div class="d-flex flex-row align-items-center py-3 justify-content-between">
                                                    <span class="d-inline-flex black fnt-14">(%) الرجاء تعبئة الأرباع أدناه  </span>
                                                 </div>
                                                 <div class="d-flex flex-row align-items-center py-3 justify-content-between">
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <div class="d-inline-flex black fnt-14">Q1</div>
                                                        <div class="project-budget-value h4">
                                                         <input data-internal="" type="text" name="" value="">
                                                        </div>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-3 justify-content-end">
                                                        <div class="d-inline-flex black fnt-14">Q2 </div>
                                                        <div class="d-inline-flex project-budget-value h4 justify-content-end">
                                                        <div class="project-budget-value h4">
                                                         <input data-internal="" type="text" name="" value="">
                                                       </div>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <div class="d-inline-flex black fnt-14">Q3</div>
                                                        <div class="project-budget-value h4">
                                                         <input data-internal="" type="text" name="" value="">
                                                       </div>
                                                    </div>
                                                    <div class="d-inline-flex flex-column mx-3">
                                                        <div class="d-inline-flex black fnt-14">Q4 </div>
                                                         <div class="project-budget-value h4">
                                                          <input data-internal="" type="text" name="" value="">
                                                         </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                     </div>
                                    </div>
                                    <a class="view-more d-block text-center py-2 bg-btn-gray">عرض المزيد</a>
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
                                <div class="accordion" id="OperatIndAccordionRequiredSupport">
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
