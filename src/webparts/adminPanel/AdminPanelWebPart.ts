import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
	BaseClientSideWebPart,
	IPropertyPaneConfiguration,
	IPropertyPaneGroup,
	PropertyPaneTextField,
} from "@microsoft/sp-webpart-base";


require("Resources");
require("ListNameConfig");
require('UserAccess');

require('../../HelperCode/Utilities.Core/Project_Navigation.js');
require('../../HelperCode/Utilities.Core/Side_Navigation.js');
require('../../HelperRessources/js/PPicker.js');
require('../../HelperRessources/css/Styles.css');
require('../../HelperRessources/css/style-dashboards.css');
require('../../HelperRessources/css/fontello.css');


import * as strings from "AdminPanelWebPartStrings";
import AdminPanel from "./components/AdminPanel";
import { IAdminPanelProps } from "./components/IAdminPanelProps";


export interface IAdminPanelWebPartProps {
	Roles: string;
	Role0: string;
	Role1: string;
	Role2: string;
	Role3: string;
	Role4: string;
	Role5: string;
	Role6: string;
	Role7: string;
	Role8: string;
	Role9: string;
	Role10: string;
	Role11: string;
	Role12: string;
	Role13: string;
	Role14: string;
	Role15: string;
	Role16: string;
	Role17: string;
	Role18: string;
	Role19: string;
	Role20: string;
	Role21: string;
	Role22: string;
	Role23: string;
	Role24: string;
	Role25: string;
	Role26: string;
	Role27: string;
	Role28: string;
	Role29: string;
	Role30: string;
	Role31: string;
	Role32: string;
	Role33: string;
	Role34: string;
	Role35: string;
	Role36: string;
	Role37: string;
	Role38: string;
	Role39: string;
	Role40: string;
	Role41: string;
	Role42: string;
	Role43: string;
	Role44: string;
	Role45: string;
	Role46: string;
	Role47: string;
	Role48: string;
	Role49: string;
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


export default class AdminPanelWebPart extends BaseClientSideWebPart<IAdminPanelWebPartProps> {
	public render(): void {
		const element: React.ReactElement<IAdminPanelProps> = React.createElement(
			AdminPanel,
			{
				webURL: this.context.pageContext.web.absoluteUrl,
				context: this.context,
				roles: this.properties.Roles || "ZX",
				Role0: this.properties.Role0,
				Role1: this.properties.Role1,
				Role2: this.properties.Role2,
				Role3: this.properties.Role3,
				Role4: this.properties.Role4,
				Role5: this.properties.Role5,
				Role6: this.properties.Role6,
				Role7: this.properties.Role7,
				Role8: this.properties.Role8,
				Role9: this.properties.Role9,
				Role10: this.properties.Role10,
				Role11: this.properties.Role11,
				Role12: this.properties.Role12,
				Role13: this.properties.Role13,
				Role14: this.properties.Role14,
				Role15: this.properties.Role15,
				Role16: this.properties.Role16,
				Role17: this.properties.Role17,
				Role18: this.properties.Role18,
				Role19: this.properties.Role19,
				Role20: this.properties.Role20,
				Role21: this.properties.Role21,
				Role22: this.properties.Role22,
				Role23: this.properties.Role23,
				Role24: this.properties.Role24,
				Role25: this.properties.Role25,
				Role26: this.properties.Role26,
				Role27: this.properties.Role27,
				Role28: this.properties.Role28,
				Role29: this.properties.Role29,
				Role30: this.properties.Role30,
				Role31: this.properties.Role31,
				Role32: this.properties.Role32,
				Role33: this.properties.Role33,
				Role34: this.properties.Role34,
				Role35: this.properties.Role35,
				Role36: this.properties.Role36,
				Role37: this.properties.Role37,
				Role38: this.properties.Role38,
				Role39: this.properties.Role39,
				Role40: this.properties.Role40,
				Role41: this.properties.Role41,
				Role42: this.properties.Role42,
				Role43: this.properties.Role43,
				Role44: this.properties.Role44,
				Role45: this.properties.Role45,
				Role46: this.properties.Role46,
				Role47: this.properties.Role47,
				Role48: this.properties.Role48,
				Role49: this.properties.Role49,
			}
		);



		//added to apply structure
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
                        <div class="title-item firsttitle" style="display: flex;">
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
                                <button class="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center" type="button"
                                    data-toggle="collapse" data-target="#notificationCollapse" aria-haspopup="true"
                                    aria-expanded="false"><span
                                        class="icon-bell d-inline-flex align-items-center text-center"><img
                                            src="${bell}" class="mx-3"><span class="bell-value">0</span></span><span
                                        data-trans-notifications class="Resources"></span>
                                </button>
                            </div>
                            <div class="btn-group" id="userGroup">
                                <button class="btn btn-lg dropdown-toggle w-5 fnt-14" type="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span
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
                            <div class="dropdown-menu border-0 dropdown-menu-center notificationCollapse"
                                id="notificationCollapse">
                                <div class="accordion" id="accordionRequiredSupportNotifications">
                                    <div class="card">
                                        <div class="card-header bg-white" id="headingOne1">
                                            <h3 data-trans-RSupport1 class="Resources acc-header mb-0 py-3 px-2"
                                                data-toggle="collapse" data-target="#collapseOneNotifications"
                                                id="cardNote1" aria-expanded="false"
                                                aria-controls="collapseOneNotifications"></h3>
                                        </div>
                                        <div id="collapseOneNotifications" class="collapse"
                                            aria-labelledby="headingOne1"
                                            data-parent="#accordionRequiredSupportNotifications">
                                            <div class="card-body">
                                                <ul class="list-group"></ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header bg-white" id="headingTwo1">
                                            <h3 data-trans-RSupport2 class="Resources acc-header mb-0 py-3 px-2"
                                                data-toggle="collapse" data-target="#collapseTwoNotifications"
                                                id="cardNote2" aria-expanded="false"
                                                aria-controls="collapseTwoNotifications"></h3>
                                        </div>
                                        <div id="collapseTwoNotifications" class="collapse"
                                            aria-labelledby="headingTwo1"
                                            data-parent="#accordionRequiredSupportNotifications">
                                            <div class="card-body">
                                                <ul class="list-group"></ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header bg-white" id="headingThree1">
                                            <h3 data-trans-RSupport3 class="Resources acc-header mb-0 py-3 px-2"
                                                data-toggle="collapse" data-target="#collapseThreeNotifications"
                                                id="cardNote3" aria-expanded="false"
                                                aria-controls="collapseThreeNotifications">
                                            </h3>
                                        </div>
                                        <div id="collapseThreeNotifications" class="collapse"
                                            aria-labelledby="headingThree1"
                                            data-parent="#accordionRequiredSupportNotifications">
                                            <div class="card-body">
                                                <ul class="list-group"></ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header bg-white" id="headingFour">
                                            <h3 data-trans-RSupport5 class="Resources acc-header mb-0 py-3 px-2"
                                                data-toggle="collapse" data-target="#collapseFourNotifications"
                                                id="cardNote4" aria-expanded="false"
                                                aria-controls="collapseFourNotifications">
                                            </h3>
                                        </div>
                                        <div id="collapseFourNotifications" class="collapse"
                                            aria-labelledby="headingFour"
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
					<!-- add extra items on toggle menu-->
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
				<div class="container-body" id="admin_container">

				</div>

			</div>
			<div class="close-layer js-close-layer" onClick="handleMainMenu.close()"></div>
		</div>
		</div>
		`
		///


		// ReactDom.render(element, this.domElement);
		ReactDom.render(element,document.getElementById('admin_container'))
	

	}




	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		var conditionalGroupFields1: any = [
			{
				groupName: "Specify Roles",
				groupFields: [
					PropertyPaneTextField("Roles", {
						label: "Type each role on a separate line: ",
						multiline: true,
					}),
				],
			},
		];
		let roles1: string = this.properties.Roles || "";
		var roles = roles1.includes("\n")
			? this.properties.Roles.split("\n")
			: [this.properties.Roles];
		roles.forEach((item, i, a) => {
			conditionalGroupFields1.push({
				groupName: "Specify Groups for " + item + " Role",
				groupFields: [
					PropertyPaneTextField("Role" + i, {
						label: "Type each group on a separate line: ",
						multiline: true,
					}),
				],
			});
		});
		return {
			pages: [
				{
					header: {
						description: "Manage Admin Pannel",
					},
					groups: conditionalGroupFields1,
				},
			],
		};
	}
}
