require("Resources");
require('ListNameConfig');
require('UserAccess');
require('../../HelperCode/Utilities.Core/Side_Navigation.js');
require('../../HelperRessources/css/Styles.css');
require('../../HelperRessources/css/style-dashboards.css');
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './StratigicInformationWebPart.module.scss';
import * as strings from 'StratigicInformationWebPartStrings';

export interface IStratigicInformationWebPartProps {
  description: string;
}
const bell: any = require('../../HelperRessources/img/icon-bell.svg');
const isArabic = (localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar");
const logo = isArabic ? require('../../HelperRessources/img/main-logo.png') : require('../../HelperRessources/img/main-logo-en.png');
export default class StratigicInformationWebPart extends BaseClientSideWebPart<IStratigicInformationWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `

    <div class="wrapper d-flex" id="navbarsParent">
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
                        <div class="ctx-block row mx-n2">
                         <!---->
                         <div class="accordion" id="accordionStratigicInfo">
                          <div class="card">
                              <div class="card-header bg-white" id="headingOne">
                                  <h3 class="acc-header mb-0 py-3 px-2" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" resourcekey="RSupport1" resource-done="true">اعتمادات</h3>
                              </div>

                              <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionStratigicInfo" style="">
                                  <div class="card-body">
                                      <ul class="list-group"><li class="list-group-item"><a href="javascript:" onclick="User_Tasks_Info_Request.g.handleids('S1-21-0442','867','Approval','1','442','لا يوجد','المشروع','null')"><h3 class="des-14 w-0">تم إعداد /تعديل  دراسة جدوى لمشروع Al Faysalyah Phase 1 والتابع لإدارة S1  يرجى المراجعة والاعتماد, Al Faysalyah Phase 1</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="javascript:" onclick="User_Tasks_Info_Request.g.handleids('S1-21-0440','863','Approval','1','440','لا يوجد','المشروع','null')"><h3 class="des-14 w-0">تم إعداد دراسة جدوى لمشروع Saanbil EPM System والتابع لإدارة S1 يرجى المراجعة والاعتماد, Saanbil EPM System</h3></a><div class="des-12 text-nowrap"></div></li></ul>
                                  </div>
                              </div>
                          </div>
                          <div class="card">
                              <div class="card-header bg-white" id="headingTwo">
                                  <h3 class="acc-header mb-0 py-3 px-2" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" resourcekey="RSupport2" resource-done="true">عوائق</h3>
                              </div>
                              <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionStratigicInfo">
                                  <div class="card-body">
                                      <ul class="list-group"><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=issues&amp;IID=58"><h3 class="des-14 w-0">IS-21-0058, حوكمة أعمال الصندوق</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=issues&amp;IID=8"><h3 class="des-14 w-0">عدم القدرة على إستعاب الأجانب, نقل أعمال سواعد(مشروع داخلي)</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=issues&amp;IID=4"><h3 class="des-14 w-0">عدم قبول المشروع, نقل أعمال سواعد(مشروع داخلي)</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=issues&amp;IID=56"><h3 class="des-14 w-0">IS-21-0056, حوكمة أعمال الصندوق</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=issues&amp;IID=1"><h3 class="des-14 w-0">مشاكل سياسية, أتمتة الاستراتيجية العليا والتشغيلية</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=issues&amp;IID=7"><h3 class="des-14 w-0">عدم القدرة على إستعاب اللاجئين, نقل أعمال سواعد(مشروع داخلي)</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=issues&amp;IID=6"><h3 class="des-14 w-0">تأخير وصول التلقيح, نقل أعمال سواعد(مشروع داخلي)</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=issues&amp;IID=5"><h3 class="des-14 w-0">عدم الإلزام بالدور, نقل أعمال سواعد(مشروع داخلي)</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=issues&amp;IID=3"><h3 class="des-14 w-0">العمل الشاق, أتمتة الاستراتيجية العليا والتشغيلية</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=issues&amp;IID=2"><h3 class="des-14 w-0">الإرهاق الجسدي, أتمتة الاستراتيجية العليا والتشغيلية</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=issues&amp;IID=52"><h3 class="des-14 w-0">IS-21-0052, Test 22</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=issues&amp;IID=9"><h3 class="des-14 w-0">المعوق٨, نقل أعمال سواعد(مشروع داخلي)</h3></a><div class="des-12 text-nowrap"></div></li></ul>
                                  </div>
                              </div>
                          </div>
                          <div class="card">
                              <div class="card-header bg-white" id="headingThree">
                                  <h3 class="acc-header mb-0 py-3 px-2" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" resourcekey="RSupport3" resource-done="true">مخاطر</h3>
                              </div>
                              <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionStratigicInfo">
                                  <div class="card-body">
                                      <ul class="list-group"><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=risks&amp;IID=247"><h3 class="des-14 w-0">RI-21-0247, أتمتة الاستراتيجية العليا والتشغيلية</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=risks&amp;IID=244"><h3 class="des-14 w-0">RI-21-0244, حوكمة أعمال الصندوق</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=risks&amp;IID=127"><h3 class="des-14 w-0">لا يوجد, نقل أعمال سواعد(مشروع داخلي)</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=risks&amp;IID=242"><h3 class="des-14 w-0">RI-21-0242, حوكمة أعمال الصندوق</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=risks&amp;IID=9"><h3 class="des-14 w-0">مشاكل بين الموظفين, الدعم التشغيلي لمكتب ادارة المشاريع</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=risks&amp;IID=5"><h3 class="des-14 w-0">بطالة, دعم التخطيط الاستراتيجي للعام 2020</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=risks&amp;IID=4"><h3 class="des-14 w-0">عرقلة البنى التحتية, أتمتة الاستراتيجية العليا والتشغيلية</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=risks&amp;IID=3"><h3 class="des-14 w-0">فائض مالي, دعم التخطيط الاستراتيجي للعام 2020</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=risks&amp;IID=2"><h3 class="des-14 w-0">حوادث, أتمتة الاستراتيجية العليا والتشغيلية</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=risks&amp;IID=1"><h3 class="des-14 w-0">اعاقة الطرقات, أتمتة الاستراتيجية العليا والتشغيلية</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=risks&amp;IID=234"><h3 class="des-14 w-0">RI-21-0234, Test 22</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=risks&amp;IID=10"><h3 class="des-14 w-0">خطر ١٠, الدعم التشغيلي لمكتب ادارة المشاريع</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=risks&amp;IID=11"><h3 class="des-14 w-0">خطر ١١, أتمتة الاستراتيجية العليا والتشغيلية</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=risks&amp;IID=12"><h3 class="des-14 w-0">خطر ١٢, نقل أعمال سواعد(مشروع داخلي)</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=risks&amp;IID=13"><h3 class="des-14 w-0">خطر ١٣, نقل أعمال سواعد(مشروع داخلي)</h3></a><div class="des-12 text-nowrap"></div></li><li class="list-group-item"><a href="https://hrdf.netways1.com/SitePages/View.aspx?ListKey=risks&amp;IID=14"><h3 class="des-14 w-0">خطر ١٤, نقل أعمال سواعد(مشروع داخلي)</h3></a><div class="des-12 text-nowrap"></div></li></ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                         <!---->
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
