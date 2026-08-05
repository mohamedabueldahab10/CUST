require("Resources");
require("ListNameConfig");
require("UserAccess");
require("../../HelperCode/Core.Solution/auditing.Activity/site.Activity.js");
require("../../HelperCode/Utilities.Core/Side_Navigation.js");
require("../../HelperCode/Core.Solution/Landing/Strategy_Home.js");
require("../../HelperRessources/css/Styles.css");
require("../../HelperRessources/css/style-dashboards.css");
require("../../HelperRessources/css/fontello.css");
import "./StrategyHome.css";

import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-webpart-base";

import styles from "./StrategyHomeWebPart.module.scss";
import * as strings from "StrategyHomeWebPartStrings";
import myHTMLObject from "./webPartHTML";

export interface IStrategyHomeWebPartProps {
  description: string;
}

export default class StrategyHomeWebPart extends BaseClientSideWebPart<
  IStrategyHomeWebPartProps
> {
  public render(): void {
    const RelativeUrl = this.context.pageContext.web.absoluteUrl;
    const workspace = document.getElementById("s4-workspace");
    if (workspace) {
      workspace.style.opacity = "1";
    }
    const titleRow = document.getElementById("s4-titlerow");
    if (titleRow) {
      titleRow.style.display = "none";
    }
    let webPartHtml = myHTMLObject.HTML.replace(/\$RelativeUrl/g, RelativeUrl);
    this.domElement.innerHTML = webPartHtml;
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
