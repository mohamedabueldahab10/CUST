require("Resources");
require('ListNameConfig');
require('UserAccess');

require('../../HelperCode/Core.Solution/auditing.Activity/site.Activity.js');
//require('ListingTest');
require('../../HelperCode/Utilities.Core/Project_Navigation.js');
require('../../HelperCode/Utilities.Core/Side_Navigation.js');
require('../../HelperRessources/js/PPicker.js');
require('../../HelperCode/Core.Solution/Listing/Listing.js');
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

import styles from './ListingWebPart.module.scss';
import * as strings from 'ListingWebPartStrings';

export interface IListingWebPartProps {
  description: string;
}
const isArabic = (localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar");
const logo = isArabic ? require('../../HelperRessources/img/main-logo.png') : require('../../HelperRessources/img/main-logo-en.png');
const navHome: any = require('../../HelperRessources/img/nav-home.png');
const navSection: any = require('../../HelperRessources/img/nav-sections.png');
const navInitiatives: any = require('../../HelperRessources/img/nav-initiatives.png');
const navProjects: any = require('../../HelperRessources/img/nav-projects.png');
const bell: any = require('../../HelperRessources/img/icon-bell.svg');
// const clearfilter: any = require('../../HelperRessources/img/clear.svg');
const clearfilter: any = require('../../HelperRessources/img/funnel_remove.png');

export default class ListingWebPart extends BaseClientSideWebPart<IListingWebPartProps> {

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

                    <!--<li class="nav-item">
                                <a class="nav-link active" href="../chat.html">
                                    <div class="d-flex align-items-center">
                                        <div class="nav-icon">
                                            <img src="${navHome}">
                                        </div>

                                        <span class="nav-link-text px-2">Home</span>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " href="../chat.html">
                                    <div class="d-flex align-items-center">
                                        <div class="nav-icon">
                                            <img src="${navSection}">
                                        </div>
                                        <span class="nav-link-text px-2">Stratigic Sections</span>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " href="../chat.html">
                                    <div class="d-flex align-items-center">
                                        <div class="nav-icon">
                                            <img src="${navInitiatives}">
                                        </div>
                                        <span class="nav-link-text px-2">Initiatives</span>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link " href="../chat.html">
                                    <div class="d-flex align-items-center">
                                        <div class="nav-icon">
                                            <img src="${navProjects}">
                                        </div>
                                        <span class="nav-link-text px-2">Projects</span>
                                    </div>
                                </a>
                            </li>-->
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
                        <h2 class="page-title overflow-ellipsis"></h2>
                        <div class="page-breadcrumb">
                            <div class="title-item firsttitle">
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
                    <!--add extra items on toggle menu-->
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
                            <div class="control-ctx project-listing-ctx">
                                <div
                                    class="content-list-head d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 mb-3">
                                    <div class="d-flex align-items-center listing-new-at">
                                    </div>
                                    <div class="filtersSection">
                                        <div class="clearAllFilter"><button class="Resources" id="clearAllFilter" type="button"><img style="max-width:30px" src="${clearfilter}" class="clearicon" style="    width: 20px;"></button></div>
                                        <div id="StatusFilterationHTMLid" class="btn-toolbar mb-2 mb-md-0 mx-2 page-filter d-flex align-items-center">
                                        </div>
                                    </div>
                                </div>
                                <div class="additionalInfo"></div>
                                <div class="ctx-block Listing-wrapper">
                                    <ul class="list-group w-100">

                                    </ul>
                                    <a data-trans-viewmore class="view-more d-block text-center py-2 Resources"></a>
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
