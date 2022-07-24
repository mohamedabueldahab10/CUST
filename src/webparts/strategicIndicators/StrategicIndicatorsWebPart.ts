require("Resources");
require('ListNameConfig');
require('UserAccess');
require('../../HelperCode/Utilities.Core/Side_Navigation.js');
require('../../HelperCode/Core.Solution/Listing/StrategicIndicators.js');
require('../../HelperRessources/css/Styles.css');
require('../../HelperRessources/css/style-dashboards.css');
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './StrategicIndicatorsWebPart.module.scss';
import * as strings from 'StrategicIndicatorsWebPartStrings';

export interface IStrategicIndicatorsWebPartProps {
  description: string;
}
const bell: any = require('../../HelperRessources/img/icon-bell.svg');
const isArabic = (localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar");
const logo = isArabic ? require('../../HelperRessources/img/main-logo.png') : require('../../HelperRessources/img/main-logo-en.png');
export default class StrategicIndicatorsWebPart extends BaseClientSideWebPart<IStrategicIndicatorsWebPartProps> {

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
                            <div class="control-ctx quick-links-ctx">
                            <div class="row mx-n2 mb-1">
                            <div class="col px-2 my-5">
                                <div class="link-item p-4 h-100 d-flex flex-row align-items-center">
                                    <span><img css="w-100" src="/Style%20Library/spm/images/StrategicIndicators1.svg"></span>
                                  <h4 class="text-center fnt-13 river-bed align-items-center"> تمكين القطاع الخاص من التوظيف لوظائف مستدامة للسعوديين</h4>
                                </div>
                            </div>
                            <div class="col px-2 my-5">
                                <div class="link-item p-4 h-100 d-flex flex-row align-items-center">
                                <span><img css="w-100" src="/Style%20Library/spm/images/StrategicIndicators2.svg"></span>
                                <h4 class="text-center fnt-13 river-bed align-items-center">الموائمه بين الباحثين عن عمل وفرص العمل المناسبة</h4>
                                </div>
                            </div>
                            <div class="col px-2 my-5">
                                <div class="link-item p-4 h-100 d-flex flex-row align-items-center">
                                <span><img css="w-100" src="/Style%20Library/spm/images/StrategicIndicators3.svg"></span>
                                <h4 class="text-center fnt-13 river-bed align-items-center">رفع مهارات وتنافسية الموارد البشرية الوطنية</h4>
                                </div>
                            </div>

                        </div>
                            </div>

                            <div class="control-ctx initiative-cards-ctx mb-5">

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
                                                                <!--45  (p x 1.5)-->
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
                                    <div class="card">
                                        <div class="card-body">
                                            <span class="badge badge-pill bg-primary px-3 py-2 white fnt-10 sbold">Business sector</span>

                                            <h2 class="card-title my-4 light-gray">2.2 Support for comprehensive job search</h2>
                                            <div class="col light-gray">
                                                <div class="row">
                                                    <div class="col col-xl-auto">

                                                        <div class="progress-semi">
                                                            <div class="barOverflow">
                                                                <!--45  (p x 1.5)-->
                                                                <div class="bar warning" style="transform: rotate(106.2deg);"></div>
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
                                    <div class="card">
                                        <div class="card-body">
                                            <span class="badge badge-pill bg-primary px-3 py-2 white fnt-10 sbold">Business sector</span>

                                            <h2 class="card-title my-4 light-gray">2.2 Support for comprehensive job search</h2>
                                            <div class="col light-gray">
                                                <div class="row">
                                                    <div class="col col-xl-auto">

                                                        <div class="progress-semi">
                                                            <div class="barOverflow">
                                                                <!--45  (p x 1.5)-->
                                                                <div class="bar danger" style="transform: rotate(106.2deg);"></div>
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
                                    <div class="card">
                                        <div class="card-body">
                                            <span class="badge badge-pill bg-primary px-3 py-2 white fnt-10 sbold">Business sector</span>

                                            <h2 class="card-title my-4 light-gray">2.2 Support for comprehensive job search</h2>
                                            <div class="col light-gray">
                                                <div class="row">
                                                    <div class="col col-xl-auto">

                                                        <div class="progress-semi">
                                                            <div class="barOverflow">
                                                                <!--45  (p x 1.5)-->
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
                                    <div class="card">
                                        <div class="card-body">
                                            <span class="badge badge-pill bg-primary px-3 py-2 white fnt-10 sbold">Business sector</span>

                                            <h2 class="card-title my-4 light-gray">2.2 Support for comprehensive job search</h2>
                                            <div class="col light-gray">
                                                <div class="row">
                                                    <div class="col col-xl-auto">

                                                        <div class="progress-semi">
                                                            <div class="barOverflow">
                                                                <!--45  (p x 1.5)-->
                                                                <div class="bar warning" style="transform: rotate(106.2deg);"></div>
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
                                    <div class="card">
                                        <div class="card-body">
                                            <span class="badge badge-pill bg-primary px-3 py-2 white fnt-10 sbold">Business sector</span>

                                            <h2 class="card-title my-4 light-gray">2.2 Support for comprehensive job search</h2>
                                            <div class="col light-gray">
                                                <div class="row">
                                                    <div class="col col-xl-auto">

                                                        <div class="progress-semi">
                                                            <div class="barOverflow">
                                                                <!--45  (p x 1.5)-->
                                                                <div class="bar danger" style="transform: rotate(106.2deg);"></div>
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
