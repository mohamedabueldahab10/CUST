import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
	BaseClientSideWebPart,
	IPropertyPaneConfiguration,
	IPropertyPaneGroup,
	PropertyPaneTextField,
} from "@microsoft/sp-webpart-base";

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

		ReactDom.render(element, this.domElement);
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
