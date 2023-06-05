


require("Resources");
require('ListNameConfig');
require('UserAccess');

require('../../HelperCode/Core.Solution/auditing.Activity/site.Activity.js');
require('../../HelperCode/Utilities.Core/Side_Navigation.js');
require('../../HelperCode/Core.Solution/Landing/HomePage_Redirect.js');
require('../../HelperRessources/css/Styles.css');
require('../../HelperRessources/css/style-dashboards.css');
require('../../HelperRessources/css/fontello.css');
// require('../../helperCode/spmSolution/Landing/HomePage_Redirect.js');


import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HomePageRedirectWebPart.module.scss';
import * as strings from 'HomePageRedirectWebPartStrings';

export interface IHomePageRedirectWebPartProps {
  description: string;
}

export default class HomePageRedirectWebPart extends BaseClientSideWebPart<IHomePageRedirectWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.homePageRedirect }">
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
