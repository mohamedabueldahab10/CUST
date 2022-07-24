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

import styles from './ManagingOperationalIndicatorsWebPart.module.scss';
import * as strings from 'ManagingOperationalIndicatorsWebPartStrings';

export interface IManagingOperationalIndicatorsWebPartProps {
  description: string;
}
const bell: any = require('../../HelperRessources/img/icon-bell.svg');
const isArabic = (localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar");
const logo = isArabic ? require('../../HelperRessources/img/main-logo.png') : require('../../HelperRessources/img/main-logo-en.png');
export default class ManagingOperationalIndicatorsWebPart extends BaseClientSideWebPart<IManagingOperationalIndicatorsWebPartProps> {

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
                    <div class="control-ctx manage-indicator-listing-ctx pb-5 border-bottom">
                        <div class="content-list-head d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4 mb-3">
                            <div class="d-flex align-items-center">
                                <a class="btn-add"><i class="icon-plus"></i> انشاء مؤشر</a>
                            </div>
                            <div class="btn-toolbar mb-2 mb-md-0">
                                <div class="dropdown mx-3">
                                    <a href="#" class="dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button">المؤشر</a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="components-bootstrap.html">Bootstrap Components</a>
                                        <a class="dropdown-item" href="components-pipeline.html">Pipeline Components</a>
                                    </div>
                                </div>
                                <div class="dropdown mx-3">
                                    <a href="#" class="dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button">نوع المؤشر</a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="components-bootstrap.html">Bootstrap Components</a>
                                        <a class="dropdown-item" href="components-pipeline.html">Pipeline Components</a>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div class="ctx-block ">


                            <div class="accordion w-100" id="accordionProject">
                                <div class="card mb-4">
                                    <div class="card-header bg-white" id="headingProject1">
                                        <div class="acc-header mb-0 py-3 px-2 d-flex justify-content-between collapsed" data-toggle="collapse" data-target="#collapseProject1" aria-expanded="false" aria-controls="collapseProject1">
                                            <h3 class="acc-title d-inline-flex">Number of business owners registered in Taqat according to the classification of the size of the establishment and the type of sector</h3>
                                            <div class="d-inline-flex flex-column mx-2">
                                                <h4 class="">The number of those registered in Taqat (the National Labor Portal)
                                                </h4>
                                                <span class="des-13">
                                                    <span class="state-val">مستوى المؤشر

                                                    </span>
                                                </span>
                                            </div>
                                            <div class="d-inline-flex flex-column mx-2">
                                                <h4 class="">Major</h4>
                                                <span class="des-13"><span class="complition-val">نوع المؤشر</span></span>
                                            </div>

                                            <div class="d-inline-flex flex-column mx-2" style="width:20px;">

                                            </div>
                                        </div>
                                    </div>

                                    <div id="collapseProject1" class="collapse" aria-labelledby="headingProject1" data-parent="#accordionProject" style="">
                                        <div class="card-body p-4">
                                            <div class="row mb-5">
                                                <div class="col-12 light-gray">
                                                    <h4 class="fnt-13 reg">Description</h4>
                                                    <p class="bold fnt-14 black">The total number of employers registered in the job portal (TAQAT) in all ranges according to the classification of the size of the establishment (micro - small - medium - large - giant) in addition to the national classification of economic activities ISIC4, which includes 19 sectors without duplicating the commercial registration numbers (unique numbers).</p>

                                                </div>
                                            </div>
                                            <div class="row mb-5">
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">مالك المؤشر</h4>
                                                    <span class="fnt-14 bold black">General Administration</span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Data owner / Provider</h4>
                                                    <span class="fnt-14 bold black">General Administration</span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Indicator Polarity</h4>
                                                    <span class="fnt-14 bold black">General Administration</span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Measruing Unit</h4>
                                                    <span class="fnt-14 bold black">General Administration</span>
                                                </div>
                                            </div>

                                            <div class="row mb-5">
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Baseline 2018</h4>
                                                    <span class="fnt-14 bold black">General Administration</span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Baseline 2019</h4>
                                                    <span class="fnt-14 bold black">General Administration</span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Target 2020</h4>
                                                    <span class="fnt-14 bold black">General Administration</span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Repeat the measurement</h4>
                                                    <span class="fnt-14 bold black">General Administration</span>
                                                </div>
                                            </div>

                                            <div class="row mb-5">
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">The basis of building the target</h4>
                                                    <span class="fnt-14 bold black">2019
                                                    </span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Calculation Method</h4>
                                                    <span class="fnt-14 bold black">Cumulative</span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">System used [automatic - manual]</h4>
                                                    <span class="fnt-14 bold black">Auto</span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Automated system name (if applicable)</h4>
                                                    <span class="fnt-14 bold black">Power</span>
                                                </div>
                                            </div>

                                            <div class="row mb-5">
                                                <div class="col-12 light-gray">
                                                    <h4 class="fnt-13 reg">Index calculation mechanism</h4>
                                                    <p class="bold fnt-14 black">The number of employers registered in the labor portal (Taqat) (micro) + the number of employers registered in the labor portal (Taqat) (small) + the number of employers registered in the labor portal (Taqat) (medium) + the number of employers registered in the labor portal (Taqat) (large) + the number of employers registered in the job portal (Taqat) (giant), taking into account the classification of sectors according to (the National Classification of Economic Activities ISIC4, which includes 19 sectors)</p>

                                                </div>
                                            </div>

                                            <div class="d-flex justify-content-end mb-3">
                                                <a class="btn-add d-inline-block mx-3">Linking Initiatives / Programs</a>
                                                <a class="btn-add d-inline-block" onclick="handlePopupDialogTargetView.init(this)">View Targets</a>
                                            </div>
                                        </div>
                                        <div id="popup-box" class="popup-box p-0" style="display:none">
                                            <h2 class="px-4 py-3 border-bottom">Targets</h2>
                                            <div class="px-4 py-3">
                                                <div class="mt-4">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-row">
                                                                <div class="col-md-6">
                                                                    <label for="formFromDate">From Date</label>
                                                                    <input type="text" class="form-control datepicker hasDatepicker" id="formFromDate1" autofocus="false">
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <label for="formToDate">To Date</label>
                                                                    <input type="text" class="form-control datepicker hasDatepicker" id="formToDate2">
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-6">
                                                            <label for="formContentProviderName">Content Provider Name</label>
                                                            <input type="text" class="form-control" id="formContentProviderName">
                                                        </div>
                                                    </div>
                                                </div>
                                                <table class="table custom-table mt-4">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">From Date</th>
                                                            <th scope="col">To Date</th>
                                                            <th scope="col">Content Provider Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>10/10/2019</td>
                                                            <td>10/10/2020</td>
                                                            <td>121,550</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/2019</td>
                                                            <td>10/10/2020</td>
                                                            <td>121,550</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/2019</td>
                                                            <td>10/10/2020</td>
                                                            <td>121,550</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/2019</td>
                                                            <td>10/10/2020</td>
                                                            <td>121,550</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/2019</td>
                                                            <td>10/10/2020</td>
                                                            <td>121,550</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/2019</td>
                                                            <td>10/10/2020</td>
                                                            <td>121,550</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/2019</td>
                                                            <td>10/10/2020</td>
                                                            <td>121,550</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/2019</td>
                                                            <td>10/10/2020</td>
                                                            <td>121,550</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/2019</td>
                                                            <td>10/10/2020</td>
                                                            <td>121,550</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div class="py-5">
                                                    <div class="d-flex justify-content-end">
                                                        <button class="btn btn-action cancel" type="submit">Cancel</button>
                                                        <button class="btn btn-action" type="submit">Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div class="card mb-4">
                                    <div class="card-header bg-white" id="headingProject2">
                                        <div class="acc-header mb-0 py-3 px-2 d-flex justify-content-between collapsed" data-toggle="collapse" data-target="#collapseProject2" aria-expanded="false" aria-controls="collapseProject2">
                                            <h3 class="acc-title d-inline-flex">Number of business owners registered in Taqat according to the classification of the size of the establishment and the type of sector</h3>
                                            <div class="d-inline-flex flex-column mx-2">
                                                <h4 class="">The number of those registered in Taqat (the National Labor Portal)
                                                </h4>
                                                <span class="des-13">
                                                    <span class="state-val">مستوى المؤشر

                                                    </span>
                                                </span>
                                            </div>
                                            <div class="d-inline-flex flex-column mx-2">
                                                <h4 class="">Major</h4>
                                                <span class="des-13"><span class="complition-val">نوع المؤشر</span></span>
                                            </div>

                                            <div class="d-inline-flex flex-column mx-2" style="width:20px;">

                                            </div>
                                        </div>
                                    </div>

                                    <div id="collapseProject2" class="collapse" aria-labelledby="headingProject2" data-parent="#accordionProject" style="">
                                        <div class="card-body p-4">
                                            <div class="row mb-5">
                                                <div class="col-12 light-gray">
                                                    <h4 class="fnt-13 reg">Description</h4>
                                                    <p class="bold fnt-14 black">The total number of employers registered in the job portal (TAQAT) in all ranges according to the classification of the size of the establishment (micro - small - medium - large - giant) in addition to the national classification of economic activities ISIC4, which includes 19 sectors without duplicating the commercial registration numbers (unique numbers).</p>

                                                </div>
                                            </div>
                                            <div class="row mb-5">
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Indicator Owner</h4>
                                                    <span class="fnt-14 bold black">General Administration</span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Data owner / Provider</h4>
                                                    <span class="fnt-14 bold black">General Administration</span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Indicator Polarity</h4>
                                                    <span class="fnt-14 bold black">General Administration</span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Measruing Unit</h4>
                                                    <span class="fnt-14 bold black">General Administration</span>
                                                </div>
                                            </div>

                                            <div class="row mb-5">
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Baseline 2018</h4>
                                                    <span class="fnt-14 bold black">General Administration</span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Baseline 2019</h4>
                                                    <span class="fnt-14 bold black">General Administration</span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Target 2020</h4>
                                                    <span class="fnt-14 bold black">General Administration</span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Repeat the measurement</h4>
                                                    <span class="fnt-14 bold black">General Administration</span>
                                                </div>
                                            </div>

                                            <div class="row mb-5">
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">The basis of building the target</h4>
                                                    <span class="fnt-14 bold black">2019
                                                    </span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Calculation Method</h4>
                                                    <span class="fnt-14 bold black">Cumulative</span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">System used [automatic - manual]</h4>
                                                    <span class="fnt-14 bold black">Auto</span>
                                                </div>
                                                <div class="col-3">
                                                    <h4 class="fnt-13 reg">Automated system name (if applicable)</h4>
                                                    <span class="fnt-14 bold black">Power</span>
                                                </div>
                                            </div>

                                            <div class="row mb-5">
                                                <div class="col-12 light-gray">
                                                    <h4 class="fnt-13 reg">Index calculation mechanism</h4>
                                                    <p class="bold fnt-14 black">The number of employers registered in the labor portal (Taqat) (micro) + the number of employers registered in the labor portal (Taqat) (small) + the number of employers registered in the labor portal (Taqat) (medium) + the number of employers registered in the labor portal (Taqat) (large) + the number of employers registered in the job portal (Taqat) (giant), taking into account the classification of sectors according to (the National Classification of Economic Activities ISIC4, which includes 19 sectors)</p>

                                                </div>
                                            </div>

                                            <div class="d-flex justify-content-end mb-3">
                                                <a class="btn-add d-inline-block mx-3">Linking Initiatives / Programs</a>
                                                <a class="btn-add d-inline-block" onclick="handlePopupDialogTargetView.init(this)">View Targets</a>

                                            </div>
                                        </div>
                                        <div id="popup-box" class="popup-box p-0" style="display:none">
                                            <h2 class="px-4 py-3 border-bottom">Targets - 2</h2>
                                            <div class="px-4 py-3">
                                                <div class="mt-4">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <div class="form-row">
                                                                <div class="col-md-6">
                                                                    <label for="formFromDate">From Date</label>
                                                                    <input type="text" class="form-control" id="formFromDate3">
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <label for="formToDate">To Date</label>
                                                                    <input type="text" class="form-control" id="formToDate4">
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="col-md-6">
                                                            <label for="formContentProviderName">Content Provider Name</label>
                                                            <input type="text" class="form-control" id="formContentProviderName">
                                                        </div>
                                                    </div>
                                                </div>
                                                <table class="table custom-table mt-4">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">From Date</th>
                                                            <th scope="col">To Date</th>
                                                            <th scope="col">Content Provider Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>10/10/2019</td>
                                                            <td>10/10/2020</td>
                                                            <td>121,550</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/2019</td>
                                                            <td>10/10/2020</td>
                                                            <td>121,550</td>
                                                        </tr>
                                                        <tr>
                                                            <td>10/10/2019</td>
                                                            <td>10/10/2020</td>
                                                            <td>121,550</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                                <div class="py-5">
                                                    <div class="d-flex justify-content-end">
                                                        <button class="btn btn-action cancel" type="submit">Cancel</button>
                                                        <button class="btn btn-action" type="submit">Save</button>
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
