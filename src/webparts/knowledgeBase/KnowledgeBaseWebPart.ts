import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
	BaseClientSideWebPart,
	IPropertyPaneConfiguration,
	PropertyPaneTextField,
} from "@microsoft/sp-webpart-base";

import * as strings from "KnowledgeBaseWebPartStrings";
import KnowledgeBase from "./components/KnowledgeBase";
import { IKnowledgeBaseProps } from "./components/IKnowledgeBaseProps";
import { sp } from "@pnp/sp/presets/all";
import { Web } from "@pnp/sp/webs";
export interface IKnowledgeBaseWebPartProps {
	description: string;
}

export default class KnowledgeBaseWebPart extends BaseClientSideWebPart<IKnowledgeBaseWebPartProps> {
	protected onInit(): Promise<void> {
		return super.onInit().then((_) => {
			// other init code may be present
			sp.setup({
				spfxContext: this.context,
			});
		});
	}
	public render(): void {
		const element: React.ReactElement<IKnowledgeBaseProps> =
			React.createElement(KnowledgeBase, {
				webUrl: this.context.pageContext.web.absoluteUrl,
				context: this.context,
				//for pnp
				Web: Web(this.context.pageContext.web.absoluteUrl),
				sp: sp,
			});

		ReactDom.render(element, this.domElement);
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription,
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField("description", {
									label: strings.DescriptionFieldLabel,
								}),
							],
						},
					],
				},
			],
		};
	}
}

















///////////////////////////////////////////////////////////////////////////
// import * as React from 'react';
// import * as ReactDom from 'react-dom';
// import { Version } from '@microsoft/sp-core-library';
// import {
//   BaseClientSideWebPart,
//   IPropertyPaneConfiguration,
//   PropertyPaneTextField
// } from '@microsoft/sp-webpart-base';

// import * as strings from 'KnowledgeBaseWebPartStrings';
// import KnowledgeBase from './components/KnowledgeBase';
// import { IKnowledgeBaseProps } from './components/IKnowledgeBaseProps';

// export interface IKnowledgeBaseWebPartProps {
//   description: string;
// }

// export default class KnowledgeBaseWebPart extends BaseClientSideWebPart<IKnowledgeBaseWebPartProps> {

//   public render(): void {
//     const element: React.ReactElement<IKnowledgeBaseProps > = React.createElement(
//       KnowledgeBase,
//       {
//         description: this.properties.description
//       }
//     );

//     ReactDom.render(element, this.domElement);
//   }

//   protected onDispose(): void {
//     ReactDom.unmountComponentAtNode(this.domElement);
//   }

//   protected get dataVersion(): Version {
//     return Version.parse('1.0');
//   }

//   protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
//     return {
//       pages: [
//         {
//           header: {
//             description: strings.PropertyPaneDescription
//           },
//           groups: [
//             {
//               groupName: strings.BasicGroupName,
//               groupFields: [
//                 PropertyPaneTextField('description', {
//                   label: strings.DescriptionFieldLabel
//                 })
//               ]
//             }
//           ]
//         }
//       ]
//     };
//   }
// }
