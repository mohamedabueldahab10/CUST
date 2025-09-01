import { Environment, EnvironmentType } from "@microsoft/sp-core-library";

// import "../../../helperResources/css/fonts.css";
// import "../../../helperResources/css/theme.css";
// import "../../../../node_modules/spm-base/system.Resources/css/Styles.css";
// import "../../../../node_modules/spm-base/system.Resources/css/style-dashboards.css";
// import "../../../../node_modules/spm-base/system.Resources/css/fontello.css";


require("../../../HelperRessources/css/Styles.css");
require('../../../HelperRessources/css/style-dashboards.css');
require('../../../HelperRessources/css/fontello.css');



if (Environment.type == EnvironmentType.ClassicSharePoint) {
	//do some stuff on classic page
	// require("mainResources");
	// require("../../../../node_modules/spm-base/system.Utilities/miscellaneous.Utilities/translate.Resources.js");
	// require("../../../../node_modules/spm-base/system.Utilities/miscellaneous.Utilities/local.Storage.Main.js");
	// require("../../../helperCode/utilities.Config/system.Config/Resources.js");
	// require("../../../../node_modules/spm-base/system.Utilities/nav.Utilities/handle.Navigation.js");

	// require("../../../helperCode/utilities.Config/system.Config/ListNameConfig.js");
	// require("../../../helperCode/utilities.Config/system.Config/access.Config/customAccess.js");
	// require("../../../../node_modules/spm-base/system.Utilities/access.Utilities/permissions.Access.Policies.js");

	// require("../../../../node_modules/spm-base/system.Utilities/nav.Utilities/project.Navigation.js");
	// require("../../../../node_modules/spm-base/system.Utilities/nav.Utilities/side.Navigation.js");
	/////////////////////////////////////////////////////////////////////
	require("Resources");
	require('ListNameConfig');
	require('UserAccess');

	require('../../../HelperCode/Utilities.Core/Side_Navigation.js');
	require('../../../HelperCode/Utilities.Core/Project_Navigation.js');


} else if (Environment.type === EnvironmentType.SharePoint) {
	//do some stuff on modern page
	require("../../../HelperRessources/css/bootstrap.css");
	require("jquery");
	require("bootstrap");
} else if (Environment.type === EnvironmentType.Local) {
	//do some stuff on SharePoint workbench page
}

import * as React from "react";
// import "./masterPage.scss";
import { IMasterPageProps } from "./IMasterPageProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Web } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";

const isArabic =
	localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar";
const logo: any = isArabic
	? require("../../../HelperRessources/img/main-logo.png")
	: require("../../../HelperRessources/img/main-logo-en.png");
const bell: any = require("../../../HelperRessources/img/icon-bell.svg");

// const bell: any = require("../../../../node_modules/spm-base/system.Resources/img/icon-bell.svg");

export default class MasterPage extends React.Component<IMasterPageProps, {
	importantLinkCollapse: any,
	userGroupCollapse: any,
	cardNote1Toggle: any,
	cardNote2Toggle: any,
	cardNote3Toggle: any,
	cardNote4Toggle: any,
	cardNote5Toggle: any
}> {
	RelativeUrl = this.props.context.pageContext.web.absoluteUrl;
	constructor(props) {
		super(props);
		this.state = {
			importantLinkCollapse: false, userGroupCollapse: false, cardNote1Toggle: false, cardNote2Toggle: false,
			cardNote3Toggle: false, cardNote4Toggle: false, cardNote5Toggle: false
		};
	}
	public componentDidMount(): void { }
	public componentDidUpdate(
		prevProps: Readonly<IMasterPageProps>,
		prevState: Readonly<{
			masterHtml: any; children: any, importantLinkCollapse: any,
			userGroupCollapse: any, cardNote1Toggle: any, cardNote2Toggle: any, cardNote3Toggle: any, cardNote4Toggle: any, cardNote5Toggle: any
		}>,
		prevContext: any
	): void { }


	userToggle = () => {
		console.log("INSIDE SUER TOGGLEEEEEEEEEEE")
		this.setState({
			userGroupCollapse: !this.state.userGroupCollapse
		}, () => {
			console.log(this.state.userGroupCollapse, "COLLLLLLLLLLLLL")
		})
	}

	public render(): React.ReactElement<IMasterPageProps> {
		return (
			<div className="wrapper d-flex project-home-page" id="navbarsParent">
				<nav className="sidebar d-inline-block">
					<div className="sidebar-sticky">
						<div className="main-logo">
							<a href={this.RelativeUrl}>
								<img className="w-100" src={logo} />
							</a>
						</div>
						<ul className="nav flex-column sidelinkscontainer"></ul>
						<div
							className="accordion important-links-ctx"
							id="accordionImportantLinks"
						>
							<div className="card bg-transparent border-0">
								<div className="card-header" id="headingImportantLinks">
									<h5 className="mb-0 w-100">
										<button
											className="important-links-btn btn btn-link text-white w-100 text-center Resources"
											type="button"
											data-toggle="collapse"
											data-target="#collapseImportantLinks"
											aria-expanded={`${this.state.importantLinkCollapse ? "true" : "false"}`}
											aria-controls="collapseImportantLinks"
											data-trans-importantlinks
											onClick={() => {
												this.setState({
													importantLinkCollapse: !this.state.importantLinkCollapse
												}, () => {
													console.log(this.state.importantLinkCollapse, "importantLinkCollapse")
												})
											}}
										>
											ImportantLinks
										</button>
									</h5>
								</div>

								<div
									// id="collapseImportantLinks"
									className={`collapse ${this.state.importantLinkCollapse ? "show" : ""}`}
									aria-labelledby="headingImportantLinks"
									data-parent="#accordionImportantLinks"
								>
									<div className="card-body">
										<ul className="ul-important-links px-3">
											{/* important links  */}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
				<div className="main-panel">
					<nav className="navbar px-0">
						<div className="container-fluid">
							<div className="navbar-wrapper">
								<div
									className="navbar-toggle"
									dangerouslySetInnerHTML={{
										__html: `
										<button class="navbar-toggler js-menu-click d-xl-none" type="button"
										onClick={handleMainMenu.open()}>
										<span _ngcontent-c3="" class="navbar-toggler-bar bar1"></span>
										<span _ngcontent-c3="" class="navbar-toggler-bar bar2"></span>
										<span _ngcontent-c3="" class="navbar-toggler-bar bar3"></span>
										</button>
										`,
									}}
								></div>
								{/* <!--style & translation config attr value to be changed in webparthtml.ts--> */}
								<h2 className="page-title" id="UserRole">
									<span
										data-trans-PTitle1
										className="Resources d-none"
										style={{ pageTitleSpanConfigStyle: "" }}
									></span>
									<span
										className="link-arrow d-none"
										style={{ pageTitleSpanConfigStyle: "" }}
									></span>
									<span
										className="project-Title-Name d-none"
										style={{ pageTitleSpanConfigStyle: "" }}
									></span>
								</h2>
								<div
									className="page-breadcrumb"
									style={{ pageBreadcrumbConfigStyle: "" }}
								>
									<div className="title-item firsttitle"></div>
									<div
										data-trans-configResource
										className="title-item Resources"
										style={{ titleItemBreadcrumbConfigStyle: "" }}
									></div>
								</div>
							</div>
							<div className="nav-settings justify-content-end">
								<div className="btn-toolbar mb-2 mb-md-0">
									<div className="btn-group" id="langs">
										<a
											className="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center"
											href="#"
											id="en"
										>
											English
										</a>
										<a
											className="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center"
											href="#"
											id="ar"
										>
											عربي
										</a>
									</div>
									<div style={{ position: "relative" }}>
										<div className="btn-group mx-3" id="notificationContainer">
											<button
												className="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center"
												type="button"
												data-toggle="collapse"
												data-target="#notificationCollapse"
												aria-haspopup="true"
												aria-expanded="false"
											>
												<span className="icon-bell d-inline-flex align-items-center text-center">
													<img src={bell} className="mx-3" />
													<span className="bell-value">0</span>
												</span>
												<span
													data-trans-notifications
													className="Resources"
												></span>
											</button>
										</div>
										<div className={`btn-group ${this.state.userGroupCollapse ? "show" : ""}`} id="userGroup">
											<button
												className="btn btn-lg dropdown-toggle w-5 fnt-14"
												type="button"
												// data-toggle="dropdown"
												data-toggle="collapse"
												data-target="#userGroupCollapse"
												aria-haspopup="true"
												aria-expanded={`${this.state.userGroupCollapse ? "true" : "false"}`}
												onClick={this.userToggle}
											>
												<span className="icon-user d-inline-flex align-items-center text-center mx-3">
													<span className="user-name w-100"></span>
												</span>
												<span className="user-name-full"></span>
											</button>
											<div
												//id="userGroupCollapse"
												className={`dropdown-menu border-0 dropdown-menu-right collapse userGroupCollapse ${this.state.userGroupCollapse ? "show" : ""}`}>
												<ul className="list-group">
													<li className="list-group-item">
														<a>
															<h3 className="title-13">Credits</h3>
															<div className="des-12 text-nowrap">
																A new accreditation has been added
															</div>
														</a>
													</li>
												</ul>
											</div>
										</div>
										<div
											className="dropdown-menu border-0 dropdown-menu-center notificationCollapse"
											id="notificationCollapse"
										>
											<div
												className="accordion"
												id="accordionRequiredSupportNotifications"
											>
												<div className="card">
													<div
														className="card-header bg-white"
														id="headingOne1"
													>
														<h3
															data-trans-RSupport1
															className="Resources acc-header mb-0 py-3 px-2"
															data-toggle="collapse"
															data-target="#collapseOneNotifications"
															id="cardNote1"
															aria-expanded={`${this.state.cardNote1Toggle ? "true" : "false"}`}
															aria-controls="collapseOneNotifications"
															onClick={() => {
																this.setState({
																	cardNote1Toggle: !this.state.cardNote1Toggle
																})
															}}
														></h3>
													</div>
													<div
														// id="collapseOneNotifications"
														className={`collapse ${this.state.cardNote1Toggle ? "show" : ""}`}
														aria-labelledby="headingOne1"
														data-parent="#accordionRequiredSupportNotifications"
													>
														<div className="card-body">
															<ul className="list-group"></ul>
														</div>
													</div>
												</div>
												<div className="card">
													<div
														className="card-header bg-white"
														id="headingTwo1"
													>
														<h3
															data-trans-RSupport2
															className="Resources acc-header mb-0 py-3 px-2"
															data-toggle="collapse"
															data-target="#collapseTwoNotifications"
															id="cardNote2"
															aria-expanded={`${this.state.cardNote2Toggle ? "true" : "false"}`}
															aria-controls="collapseTwoNotifications"
															onClick={() => {
																this.setState({
																	cardNote2Toggle: !this.state.cardNote2Toggle
																})
															}}
														></h3>
													</div>
													<div
														// id="collapseTwoNotifications"
														className={`collapse ${this.state.cardNote2Toggle ? "show" : ""}`}
														aria-labelledby="headingTwo1"
														data-parent="#accordionRequiredSupportNotifications"
													>
														<div className="card-body">
															<ul className="list-group"></ul>
														</div>
													</div>
												</div>
												<div className="card">
													<div
														className="card-header bg-white"
														id="headingThree1"
													>
														<h3
															data-trans-RSupport3
															className="Resources acc-header mb-0 py-3 px-2"
															data-toggle="collapse"
															data-target="#collapseThreeNotifications"
															id="cardNote3"
															aria-expanded={`${this.state.cardNote3Toggle ? "true" : false}`}
															aria-controls="collapseThreeNotifications"
															onClick={() => {
																this.setState({
																	cardNote3Toggle: !this.state.cardNote3Toggle
																})
															}}
														></h3>
													</div>
													<div
														// id="collapseThreeNotifications"
														className={`collapse ${this.state.cardNote3Toggle ? "show" : ""}`}
														aria-labelledby="headingThree1"
														data-parent="#accordionRequiredSupportNotifications"
													>
														<div className="card-body">
															<ul className="list-group"></ul>
														</div>
													</div>
												</div>
												<div className="card">
													<div
														className="card-header bg-white"
														id="headingFour"
													>
														<h3
															data-trans-RSupport5
															className="Resources acc-header mb-0 py-3 px-2"
															data-toggle="collapse"
															data-target="#collapseFourNotifications"
															id="cardNote4"
															aria-expanded={`${this.state.cardNote4Toggle ? "true" : "false"}`}
															aria-controls="collapseFourNotifications"
															onClick={() => {
																this.setState({
																	cardNote4Toggle: !this.state.cardNote4Toggle
																})
															}}
														></h3>
													</div>
													<div
														// id="collapseFourNotifications"
														className={`collapse ${this.state.cardNote4Toggle ? "show" : ""}`}
														aria-labelledby="headingFour"
														data-parent="#accordionRequiredSupportNotifications"
													>
														<div className="card-body">
															<ul className="list-group"></ul>
														</div>
													</div>
												</div>
												{/* <div className="card">
													<div
														className="card-header bg-white"
														id="headingFive"
													>
														<h3
															data-trans-rsupport6
															className="Resources acc-header mb-0 py-3 px-2"
															data-toggle="collapse"
															data-target="#collapseFiveNotifications"
															id="cardNote5"
															aria-expanded={`${this.state.cardNote5Toggle ? "true" : "false"}`}
															aria-controls="collapseFiveNotifications"
															onClick={() => {
																this.setState({
																	cardNote5Toggle: !this.state.cardNote5Toggle
																})
															}}
														></h3>
													</div>
													<div
														// id="collapseFiveNotifications"
														className={`collapse ${this.state.cardNote5Toggle ? "show" : ""}`}
														aria-labelledby="headingFive"
														data-parent="#accordionRequiredSupportNotifications"
													>
														<div className="card-body">
															<ul className="list-group"></ul>
														</div>
													</div>
												</div> */}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</nav>
					<div className="container-ctx">
						<div
							data-trans-projectLicenseWarning
							className="alert alert-warning d-none Resources projectLicenseWarning"
							role="alert"
						></div>
						<div className="container-body">
							{/* <!-- below goes the webpart html --> */}
							{this.props.children}
							{/* <!--  --> */}
						</div>
						<div
							data-trans-projectLicenseWarning
							className="alert alert-warning d-none Resources projectLicenseWarning"
							role="alert"
						></div>
					</div>
					<div
						dangerouslySetInnerHTML={{
							__html: `
   <div class="close-layer js-close-layer" onClick={handleMainMenu.close()}></div>
  `,
						}}
					></div>
				</div>
			</div>
		);
	}
}
