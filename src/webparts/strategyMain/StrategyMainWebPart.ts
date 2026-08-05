require("Resources");
require("ListNameConfig");
require("UserAccess");
require("../../HelperCode/Core.Solution/auditing.Activity/site.Activity.js");
require("../../HelperCode/Utilities.Core/Side_Navigation.js");
require("../../HelperCode/Core.Solution/Landing/Strategy_Main.js");
require("../../HelperRessources/css/Styles.css");
require("../../HelperRessources/css/style-dashboards.css");
require("../../HelperRessources/css/fontello.css");
import "./StrategyMain.css";

import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-webpart-base";

import styles from "./StrategyMainWebPart.module.scss";
import * as strings from "StrategyMainWebPartStrings";
import myHTMLObject from "./webPartHTML";

export interface IStrategyMainWebPartProps {
  description: string;
}

export default class StrategyMainWebPart extends BaseClientSideWebPart<
  IStrategyMainWebPartProps
> {
  public render(): void {
    const RelativeUrl = this.context.pageContext.web.absoluteUrl;
    const workspace = document.getElementById("s4-workspace");
    if (workspace) {
      workspace.style.opacity = "1";
    }
    this.hideSharePointPageTitle();
    // Do not hide particle loader here — Strategy_Main hides it after data loads
    let webPartHtml = myHTMLObject.HTML.replace(/\$RelativeUrl/g, RelativeUrl);
    this.domElement.innerHTML = webPartHtml;
  }

  private hideSharePointPageTitle(): void {
    const styleId = "strategyMain-hide-page-title";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        #s4-titlerow,
        #s4-titlerow #pageTitle,
        h1#pageTitle,
        h1#pageTitle span,
        .ms-core-pageTitle,
        #DeltaPlaceHolderPageTitleInTitleArea,
        .ms-webpart-chrome-title,
        .ms-webpart-titleText {
          display: none !important;
          height: 0 !important;
          overflow: hidden !important;
          visibility: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
        }
      `;
      document.head.appendChild(style);
    }
    const titleRow = document.getElementById("s4-titlerow");
    if (titleRow) {
      titleRow.style.setProperty("display", "none", "important");
    }
    const pageTitle = document.getElementById("pageTitle");
    if (pageTitle) {
      pageTitle.style.setProperty("display", "none", "important");
    }
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
