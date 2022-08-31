import * as React from "react";
import styles from "./AdminPanel.module.scss";
import { IAdminPanelProps } from "./IAdminPanelProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp, Web } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/site-groups";

import {
	PrimaryButton,
	DefaultButton,
	IconButton,
} from "office-ui-fabric-react/lib/Button";

import {
	PeoplePicker,
	PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";

import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import { Persona } from "office-ui-fabric-react/lib/Persona";
import { Dialog, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import * as $ from "jquery";
// import "datatables.net";
// import "datatables.net-dt/css/jquery.dataTables.css";
// // import 'datatables.net-bs';
// // import jsZip from 'jszip';
// // import 'datatables.net-buttons-bs';
// import "datatables.net-buttons/js/buttons.colVis.min";
// import "datatables.net-buttons/js/dataTables.buttons.min";
// import "datatables.net-buttons/js/buttons.flash.min";
// import "datatables.net-buttons/js/buttons.html5.min";

export default class AdminPanel extends React.Component<
	IAdminPanelProps,
	{
		Users: any;
		Groups: any;
		roles: any;
		roleUsers: any;
		roleGroups: any;
		Loader: boolean;
		activeModule: number;
		activeRole: string;
		activeRoleIndex: any;
		HTML: any;
		userRoleHTML: any;
		dialogHTML: any;
		openDialog: boolean;
		rowTitle: any;
		web: any;
		selectedUser: any;
		selectedUserName: any;
		addUserMessage: string;
		addRoleMessage: string;
		allEnterpriseResourcesArr: any;
		selectedUserEmail: any;
	}
> {
	constructor(props) {
		super(props);

		this.state = {
			web: Web(this.props.webURL),
			Users: [],
			Groups: [],
			roles:
				this.props.roles.includes("\n")
					? this.props.roles.split("\n")
					: [this.props.roles],
			roleUsers: [],
			roleGroups: [],
			Loader: true,
			activeModule: 1,
			activeRole:
				this.props.roles.includes("\n")
					? this.props.roles.split("\n")[0]
					: this.props.roles,
			activeRoleIndex: 0,
			HTML: [],
			userRoleHTML: [],
			dialogHTML: [],
			openDialog: false,
			rowTitle: "",
			selectedUser: "",
			selectedUserName: "",
			addUserMessage: "",
			addRoleMessage: "",
			allEnterpriseResourcesArr: [],
			selectedUserEmail: ''
		};
		this._getPeoplePickerItems = this._getPeoplePickerItems.bind(this); //bind the function to general "this" in the constructor to get the state
		this.addUserToGroup = this.addUserToGroup.bind(this); //bind the function to general "this" in the constructor to get the state
	}
	public async componentDidMount() {

		await this.fetchData(1);

		$('div#particles-foreground, div#particles-background, .vertical-centered-box').animate({
			opacity: 0
		}, {
			duration: 333,
			complete: function () {
				$('div#particles-foreground, div#particles-background, .vertical-centered-box').remove();

			}
		});

		// this.state.web.siteGroups.add({
		// 	Title: "To be removed",
		// 	OnlyAllowMembersViewMembership: false,
		// });
	}
	// test = () => {}// NOTE: this will allow auto binding of this
	public async fetchData(moduelIndex) {
		try {
			this.setState({ Loader: true });
			let data: any,
				callApi = false;
			// users
			moduelIndex == 1
				? ((data = await this.state.web.siteUsers()),
					(callApi = true),
					this.setState({ Users: data, activeModule: moduelIndex }))
				: "";
			// groups
			moduelIndex == 2
				? ((data = await this.state.web.siteGroups()),
					(callApi = true),
					this.setState({ Groups: data, activeModule: moduelIndex }))
				: "";
			console.log(data);
			// manage roles
			moduelIndex == 3 ? this.setState({ activeModule: moduelIndex }) : "";
			let html = callApi
				? await this.getHTML(Object.keys(data[0]), data, callApi)
				: await this.getHTML([], [], callApi);
			this.setState({ HTML: html, Loader: false });

			// await this.getAllEnterpriseResources() // to get All Enterprise Resources

		} catch (e) {
			console.error(e);
		}
	}
	public async getHTML(ths, data, callApi) {
		var tabledata;
		if (callApi) {
			tabledata = (
				<table id="dataTable" className={styles.dataTable}>
					<thead>
						<tr>
							{ths &&
								ths.map((item, i) => {
									return typeof data[0][item] != "object"
										? [<th>{item}</th>]
										: "";
								})}
						</tr>
					</thead>
					<tbody>
						{data &&
							data.map((item, i) => {
								return [
									<tr
										key={i}
										onClick={() => {
											this.getItemData(item["Id"], item["Title"]);
										}}
									>
										{ths &&
											ths.map((item2, i2) => {
												return [
													typeof item[item2] != "object" ? (
														<td>{item[item2].toString() || "No Data"}</td>
													) : (
														""
													),
												];
											})}
									</tr>,
								];
							})}
					</tbody>
				</table>
			);
		} else {
			tabledata = "";
		}
		return await tabledata;
	}
	public async getItemData(itemId, Title) {
		//when clicked on row

		try {
			this.setState({ Loader: false });
			var itemData: any;
			if (this.state.activeModule == 1) {
				// get user object by id
				itemData = await this.state.web.siteUsers.getById(itemId).groups();
				console.log(itemData, itemId);
			} else if (this.state.activeModule == 2) {
				itemData = await this.state.web.siteGroups.getById(itemId).users();
				console.log(itemData, itemId);
			}
			var myHeaders = itemData.length ? Object.keys(itemData[0]) : [];
			var dialogHTML = (
				<div>
					<h2>
						{itemData.length
							? itemData[0]["odata.type"].split(".")[1]
							: "No Data"}
					</h2>
					<table>
						<thead>
							<tr>
								{myHeaders &&
									myHeaders.map((item, i) => {
										return typeof itemData[0][item] != "object"
											? [<th>{item}</th>]
											: "";
									})}
							</tr>
						</thead>
						<tbody>
							{itemData &&
								itemData.map((item, i) => {
									return [
										<tr key={i}>
											{myHeaders &&
												myHeaders.map((item2, i2) => {
													return [
														typeof itemData[i][item2] != "object" ? (
															<td>
																{itemData[i][item2].toString() || "No Data"}
															</td>
														) : (
															""
														),
													];
												})}
										</tr>,
									];
								})}
						</tbody>
					</table>
				</div>
			);
			this.setState({
				dialogHTML: dialogHTML,
				Loader: false,
				openDialog: true,
				rowTitle: Title,
			});
		} catch (e) {
			console.log(e);
		}
	}
	public addUserToGroup(group: string) {
		try {
			this.setState({ Loader: true, addUserMessage: "" }, async () => {
				var user = this.state.selectedUser;
				if (user) {
					await this.state.web.siteGroups.getByName(group).users.add(user);
					this.setState({
						Loader: false,
						addUserMessage: `"${user}" has been sucessfully Added`,
					});
				} else {
					this.setState({
						Loader: false,
						addUserMessage: `Please enter a valid user`,
					});
				}
			});
		} catch (e) {
			this.setState({
				Loader: false,
				addUserMessage: "Something went wrong",
			});
			alert(e);
		}
	}
	public async getRoleUsers() {
		this.setState({ roleUsers: [] });
		var activeRole,
			roleUsers = [];
		// activeRole =
		// 	this.state.activeRole == "Project Manager" ? this.props.pmRole : ""; //pm
		activeRole = this.props["Role" + this.state.activeRoleIndex];
		//
		var roleGroups =
			activeRole.includes("\n") ? activeRole.split("\n") : [activeRole],
			data;
		activeRole = roleGroups;
		this.setState({ roleGroups: activeRole });
		await Promise.all(
			roleGroups.map(async (o, i, a) => {
				var group = o;
				if (group) {
					try {
						data = await this.state.web.siteGroups.getByName(group).users();
						data.forEach((element) => {
							roleUsers.push(element);
						});
					} catch (e) {
						console.log(e);
					}
				} else {
				}
			})
		);
		roleUsers = this.findOcc(roleUsers, "LoginName");
		roleUsers = roleUsers.filter((o) => {
			return o.occurrence == activeRole.length;
		});
		roleUsers.forEach((x) => {
			data.forEach((y) => {
				x.LoginName == y.LoginName ? this.state.roleUsers.push(y) : "";
			});
		});
		var roleHTML = (
			<div>
				<h3
					className={styles.uesrRoleHead}
					data-number={this.state.roleUsers.length}
				>
					{this.state.activeRole} Role Members
				</h3>
				<div className={styles.personaWrapper}>
					{this.state.roleUsers &&
						this.state.roleUsers.map((item, i) => {
							return [
								<div className="col-md-6" style={{padding:"5px 0px"}}>
									<Persona
										primaryText={item.Title}
										secondaryText={`Email: ${item.Email} - ID: ${item.Id}`}
										tertiaryText={`${item.LoginName} - ${item.IsSiteAdmin ? "Site Admin" : "Not Site Admin"
											}`}
										imageUrl={`/_layouts/15/userphoto.aspx?size=L&username=${item.Email}`}
										size={5}
										className={styles.personaContainer}

									/>
								</div>
							];
						})}
				</div>
			</div>
		);
		this.setState({ userRoleHTML: roleHTML });
	}
	public addUserToRole() {
		try {
			this.setState({ Loader: true, addUserMessage: "" }, async () => {
				var user = this.state.selectedUser,
					userName = this.state.selectedUserName,
					activeRole;

				console.log(user, "user")
				console.log(userName, 'USER NAME')
				// activeRole =
				// 	this.state.activeRole == "Project Manager" ? this.props.pmRole : ""; //pm
				activeRole = this.props["Role" + this.state.activeRoleIndex];
				//
				var roleGroups =
					activeRole.includes("\n") ? activeRole.split("\n") : [activeRole];
				var succMsg = `\n${userName} has been sucessfully added to these groups: "`;
				var errorMsg = "\n\nError adding to these groups: ";
				var errorCount = 0;
				if (user) {
					await Promise.all(
						roleGroups.map(async (o, i, a) => {
							var group = o;
							if (group) {
								try {
									await this.state.web.siteGroups
										.getByName(group)
										.users.add(user);
									succMsg += group + `, `;
									this.setState({
										addRoleMessage: `Working on it...  ${succMsg}  ${errorMsg}`,
									});
								} catch (e) {
									errorCount++;
									errorMsg += group + `[${e.statusText}], `;
									console.log(e);
								}
							} else {
								errorCount++;
								errorMsg += group + `, `;
								this.setState({
									addRoleMessage: `Working on it  ${succMsg}  ${errorMsg}`,
								});
							}
						})
					);
					!errorCount ? (errorMsg = "") : "";
					this.setState({
						Loader: false,
						addRoleMessage: `Success!  ${succMsg}  ${errorMsg}`,
					});
					// debugger
					// this.getDigestValue()
					this.getRoleUsers()
				} else {
					this.setState({
						Loader: false,
						addRoleMessage: `Please enter a valid user`,
					});
				}
			});
		} catch (e) {
			this.setState({
				Loader: false,
				addRoleMessage: `Something went wrong [${e.statusText}]`,
			});
			alert(e);
		}
	}
	private _getPeoplePickerItems(items: any[]) {
		console.log("Items:", items);

		items.length
			? this.setState({
				selectedUser: items[0].loginName,
				selectedUserName: items[0].text,
				selectedUserEmail: items[0].secondaryText
			})
			: this.setState({ selectedUser: "", selectedUserName: "" });
	}


	// public async getAllEnterpriseResources() {
	// 	var that = this
	// 	$.ajax({
	// 		url: "/_api/ProjectServer/EnterpriseResources",
	// 		method: "GET",
	// 		headers: { "Accept": "application/json; odata=verbose" },
	// 		success: function (data) {
	// 			console.log(data.d.results,"data.d.results")
	// 			that.setState({
	// 				allEnterpriseResourcesArr: data.d.results
	// 			})
	// 		}
	// 	});
	// }


	// getDigestValue = () => {

	// 	debugger
	// 	var userSelected = this.state.selectedUserName
	// 	var userEmail = this.state.selectedUserEmail
	// 	var nameExist = false
	// 	this.state.allEnterpriseResourcesArr.forEach(el => {

	// 		if (el.Name == userSelected) {
	// 			return nameExist = true
	// 		}
	// 	})
	// 	if (!nameExist) {
	// 		$.ajax({
	// 			url: `/_api/contextinfo`,
	// 			method: "POST",
	// 			contentType: "application/json;odata=verbose",
	// 			headers: {
	// 				Accept: "application/json; odata=verbose",
	// 				"X-HTTP-Method": "POST",
	// 				"if-Match": "*"
	// 			},
	// 			success: function (data: any) {
	// 				console.log(data.d.GetContextWebInformation.FormDigestValue,"DIGEEEEEEEEEEEEEE")
	// 				debugger
	// 				var digest = data.d.GetContextWebInformation.FormDigestValue

	// 				var requestData = { '__metadata': { 'type': 'PS.EnterpriseResource' }, 'Name': userSelected, 'ResourceType': '0', 'Email': userEmail }
	// 				var stringData = JSON.stringify(requestData)

	// 				$.ajax({
	// 					url: `/_api/ProjectServer/EnterpriseResources`,
	// 					method: "POST",
	// 					contentType: "application/json;odata=verbose",
	// 					data: stringData,
	// 					headers: {
	// 						Accept: "application/json; odata=verbose",
	// 						"X-requestDigest": digest,
	// 						"X-HTTP-Method": "POST",
	// 						"if-Match": "*"
	// 					},
	// 					success: function (data: any) {
	// 						console.log(data, "data added successfully")
	// 					},
	// 					error: function (err) {
	// 						console.log("call failed", err);
	// 					},
	// 				});

	// 			},
	// 			error: function (err) {
	// 				console.log("call failed", err);
	// 			},
	// 		});
	// 	}
	// }


	public render(): React.ReactElement<IAdminPanelProps> {
		return (
			<div className={styles.adminPanel}>
				{this.state.Loader && (
					<Spinner className={styles.Spinner} size={3}></Spinner>
				)}
				<div className={styles.btngroup}>
					<div>
						<PrimaryButton
							className={`${this.state.activeModule != 1 && styles.notActive} ${this.state.Loader && styles.disabled
								}`}
							text="Users"
							// disabled={this.state.Loader}
							onClick={() => {
								this.fetchData(1);
							}}
						/>
					</div>
					<div>
						<PrimaryButton
							className={`${this.state.activeModule != 2 && styles.notActive} ${this.state.Loader && styles.disabled
								}`}
							text="Groups"
							// disabled={this.state.Loader}
							onClick={() => {
								this.fetchData(2);
							}}
						/>
					</div>
					<div>
						<PrimaryButton
							className={`${this.state.activeModule != 3 && styles.notActive} ${this.state.Loader && styles.disabled
								}`}
							text="Manage Roles"
							// disabled={this.state.Loader}
							onClick={() => {
								this.fetchData(3);
								this.getRoleUsers();
							}}
						/>
					</div>
				</div>
				<div className={styles.tableContainer}>
					{this.state.HTML}
					{this.state.activeModule == 3 && (
						<div className={styles.rolesWrapper}>
							<div className={styles.rolesNav}>
								<ul>
									{this.state.roles &&
										this.state.activeModule == 3 &&
										this.state.roles.map((item, i) => {
											return [
												<li>
													<DefaultButton
														text={item}
														disabled={this.state.Loader}
														checked={this.state.activeRole == item}
														onClick={() => {
															this.setState(
																{ activeRole: item, activeRoleIndex: i },
																async () => {
																	this.getRoleUsers();
																}
															);
														}}
													/>
												</li>,
											];
										})}
								</ul>
							</div>
							<div className={styles.rolesAction}>
								<h1>Manage Roles</h1>
								{this.state.roles[0] && (
									<div className={styles.pickerContainer}>
										<div className={styles.ppicker}>
											<PeoplePicker
												context={this.props.context}
												titleText={`Add User To "${this.state.activeRole}" Role`}
												personSelectionLimit={1}
												groupName={""} // Leave this blank in case you want to filter from all users
												showtooltip={true}
												tooltipMessage={`Related Groups: ${this.state.roleGroups.join(
													", "
												)}`}
												isRequired={false}
												disabled={false}
												selectedItems={this._getPeoplePickerItems} //onChange in newer versions
												showHiddenInUI={false}
												principalTypes={[PrincipalType.User]}
												resolveDelay={1000}
											/>
										</div>
										<div className={styles.addUserAction}>
											<PrimaryButton
												text="Add User"
												disabled={this.state.Loader}
												onClick={() => {
													this.addUserToRole();

													// this.addEnterpriseResources()
												}}
											/>
											<div
												style={
													!this.state.Loader
														? { display: "none", margin: "0 7px" }
														: {}
												}
											>
												<Spinner className={styles.Spinner} size={3}></Spinner>
											</div>
										</div>
									</div>
								)}
								<h4 className={styles.roleMessage}>
									{this.state.addRoleMessage}
								</h4>
								{this.state.roles[0] && this.state.userRoleHTML}
								{!this.state.roles[0] && <h2>No roles found</h2>}
							</div>
						</div>
					)}
				</div>
				<Dialog
					title={this.state.rowTitle}
					// modalProps={{containerClassName:'ms-dialogMainOverride ' + styles.textDialog}}
					containerClassName={"ms-dialogMainOverride " + styles.textDialog}
					responsiveMode={5}
					isOpen={this.state.openDialog}
					dialogContentProps={{
						showCloseButton: true,
					}}
					onDismiss={() => {
						this.setState({ openDialog: false, addUserMessage: "" });
					}}
				>
					{this.state.activeModule == 2 && (
						<div className={styles.pickerContainer}>
							<PeoplePicker
								context={this.props.context}
								titleText="Add User To Selected Group"
								personSelectionLimit={1}
								groupName={""} // Leave this blank in case you want to filter from all users
								showtooltip={true}
								isRequired={false}
								disabled={false}
								selectedItems={this._getPeoplePickerItems} //onChange in newer versions
								showHiddenInUI={false}
								principalTypes={[PrincipalType.User]}
								resolveDelay={1000}
							/>
							<div className={styles.addUserAction}>
								<PrimaryButton
									text="Add"
									disabled={this.state.Loader}
									onClick={() => {
										this.addUserToGroup(this.state.rowTitle);
									}}
								/>{" "}
								<h4>{this.state.addUserMessage}</h4>
								<div
									style={
										!this.state.Loader
											? { display: "none", margin: "0 7px" }
											: {}
									}
								>
									<Spinner className={styles.Spinner} size={3}></Spinner>
								</div>
							</div>
						</div>
					)}
					{this.state.dialogHTML}
					<DialogFooter>
						<DefaultButton
							text="Cancel"
							title="Cancel"
							onClick={() => {
								this.setState({ openDialog: false });
							}}
						/>
					</DialogFooter>
				</Dialog>
			</div>
		);
	}
	public findOcc(arr, key) {
		let arr2 = [];

		arr.forEach((x) => {
			// Checking if there is any object in arr2
			// which contains the key value
			if (
				arr2.some((val) => {
					return val[key] == x[key];
				})
			) {
				// If yes! then increase the occurrence by 1
				arr2.forEach((k) => {
					if (k[key] === x[key]) {
						k["occurrence"]++;
					}
				});
			} else {
				// If not! Then create a new object initialize
				// it with the present iteration key's value and
				// set the occurrence to 1
				let a = {};
				a[key] = x[key];
				a["occurrence"] = 1;
				arr2.push(a);
			}
		});

		return arr2;
	}

	public toString(o) {
		Object.keys(o[0]).forEach((k, i) => {
			if (typeof o[i][k] != "object") {
				o.forEach((element) => {
					element[k] = "" + element[k];
					if (k.indexOf(".") > -1) {
						var getRidOfDot = k.replace(".", " ");
						element[getRidOfDot] = element[k];
						delete element[k];
					}
				});
			} else {
				//remove attr
				o.forEach((element) => {
					delete element[k];
				});
			}
		});
		return o;
	}
	public capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}
