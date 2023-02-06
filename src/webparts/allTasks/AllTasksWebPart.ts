import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AllTasksWebPartStrings';
import AllTasks from './components/AllTasks';
import { IAllTasksProps } from './components/IAllTasksProps';
import { sp } from "@pnp/sp/presets/all";
import { Web } from "@pnp/sp/webs";
export interface IAllTasksWebPartProps {
  Roles: string;
  description: string;
}

export default class AllTasksWebPart extends BaseClientSideWebPart<IAllTasksWebPartProps> {

	protected onInit(): Promise<void> {
		return super.onInit().then((_) => {
			// other init code may be present
			sp.setup({
				spfxContext: this.context,
			});
		});
	}
  
  public render(): void {
    const element: React.ReactElement<IAllTasksProps > = React.createElement(
      AllTasks,
      {
        webURL: this.context.pageContext.web.absoluteUrl,
				context: this.context,
        roles: this.properties.Roles || "ZX",
        description: this.properties.description,
        Web: Web(this.context.pageContext.web.absoluteUrl),
				sp: sp,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
