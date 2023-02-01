
require("Resources");
require('ListNameConfig');
require('UserAccess');

require('../../HelperCode/Utilities.Core/Project_Navigation.js');
require('../../HelperCode/Utilities.Core/Side_Navigation.js');
require('../../HelperCode/Utilities.Core/Forms.Utilities/Async_For_JS.js');
require('../../HelperCode/Utilities.Core/Forms.Utilities/sphttp.js');
require('../../HelperRessources/js/PPicker.js');
require('../../HelperCode/Utilities.Core/Forms.Utilities/ProjectCenterEdit.js');
require('../../HelperRessources/css/Styles.css');
require('../../HelperRessources/css/style-dashboards.css');
require('../../HelperRessources/css/fontello.css');
require('../../HelperRessources/js/sharepointplus.js');


import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ProjectCenterEditWebPart.module.scss';
import * as strings from 'ProjectCenterEditWebPartStrings';

export interface IProjectCenterEditWebPartProps {
  description: string;
}

const isArabic = (localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar");
const logo = isArabic ? require('../../HelperRessources/img/main-logo.png') : require('../../HelperRessources/img/main-logo-en.png');
const bell: any = require('../../HelperRessources/img/icon-bell.svg');

export default class ProjectCenterEditWebPart extends BaseClientSideWebPart<IProjectCenterEditWebPartProps> {

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
              <h2 class="page-title"></h2>
   

            </div>
            <div class="nav-settings justify-content-end">

              <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group" id="langs">
                  <a class="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center" href="#" id="en">English</a>
                  <a class="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center" href="#" id="ar">عربي</a>
                </div>
                <div style="position:relative;">
                  <div class="btn-group mx-3" id="notificationContainer">
                    <button class="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center" type="button"
                      data-toggle="collapse" data-target="#notificationCollapse" aria-haspopup="true"
                      aria-expanded="false"><span class="icon-bell d-inline-flex align-items-center text-center"><img
                          src="${bell}" class="mx-3"><span class="bell-value">0</span></span><span data-trans-notifications
                        class="Resources"></span>
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
                <!--<li class="nav-item active"><a href="#">Home</a></li>
          <li class="nav-item"><a href="#">About</a></li>
          <li class="nav-item"><a href="#">Contact</a></li>-->
              </ul>
              <!-- to add extra items on toggle menu-->
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
            <div class="FormContainer">
              <div class="container-body">
                
              </div>
              <div id="preloader" style="display:none">
                <div id="formloader" style="display:none">
                </div>
              </div>
            </div>
          </div>
          <div class="close-layer js-close-layer" onClick="handleMainMenu.close()"></div>

      </div>
    </div>  
    
    `;
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
