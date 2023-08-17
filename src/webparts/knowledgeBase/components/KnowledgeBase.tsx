import * as React from "react";
// import styles from "./KnowledgeBase.module.scss";
import MasterPage from "../../../HelperRessources/MasterPage/forReact/masterPage";
import "../knowledgeBase.css";
import NavItem from "./navItem";
import GuideLineBook from "./guideLineBook";
import Videos from "./videos";
import LessonsLearned from "./lessonsLearned";
import UserReports from "./userReports";
import Search from "./search";
import { IKnowledgeBaseProps } from "./IKnowledgeBaseProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";
import SystemUpdates from "./systemUpdates";
// just to test
// import mediator from "../../../../node_modules/spm-base/system.Utilities/miscellaneous.Utilities/translateMediatorForTs.js";

const isArabic =
  localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar";
export default class KnowledgeBase extends React.Component<
  IKnowledgeBaseProps,
  { loader: boolean; activeTab: number, activeType: {}, typeClickId: any }
> {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      activeTab: 3,
      activeType: {
        "uservisitanalysisreport": 5,
        "guidelinesbook": 3,
        "systemupdates": 7,
        "allprojectmanagementofficeandprojectmanagementofficematerials": 4
      },
      typeClickId: ""
    };
  }
  title1 = isArabic ? "محرك البحث" : "Search";
  title2 = isArabic ? "مكتبة المواد التوجيهية والنماذج" : "Guidelines and templates books ";
  title3 = isArabic ? "المحتويات المرئية لمكتب إدارة المشاريع" : "PMO Visual Contents";
  title4 = isArabic ? "تقرير تحليل زيارة المستخدمين" : "User Visit Analysis Report";
  title5 = isArabic ? "مركز الدروس المستفادة" : "Lessons Learned";
  title6 = isArabic ? "تحديثات النظام" : "System Updates";
  public componentDidMount(): void {
    setTimeout(function () {
      [].forEach.call(
        document.querySelectorAll(".vertical-centered-box"),
        function (el) {
          el.style.display = "none";
        }
      );
    }, 3000)
  }
  setActiveTab = (tabIndex: number) => {
    this.setState({ loader: true, activeTab: tabIndex }, () => {
      // mediator.init(); // return after fix madiator
    });
  };

  clearTypeClickId = () => {
    this.setState({
      typeClickId: ""
    })
  }

  isLoader = (isLoader: boolean) => {
    this.setState({ loader: isLoader });
  };

  typeClickHandler = (el: any) => {

    var obj = this.state.activeType
    var type = el.type.replaceAll(" ", "").toLowerCase()
    for (var key in obj) {
      if (key == type) {
        var index = obj[key]
        this.setActiveTab(index)

      }
    }

    this.setState({
      typeClickId: el.id
    })
    // this.setActiveTab()
  }

  public render(): React.ReactElement<IKnowledgeBaseProps> {
    return (
      <MasterPage context={this.props.context}>
        <div className="row pt-5">
          {this.state.loader && (
            <Spinner className="Spinner" size={3}></Spinner>
          )}
          <div className="col-12 col-md-3 ">
            <div className="knowledgeBaseNav p-4">
              <NavItem
                activeTab={this.state.activeTab}
                tabIndex={1}
                setActiveTab={this.setActiveTab}
                title={this.title1}
                clearTypeClickId={this.clearTypeClickId}
              ></NavItem>
              <NavItem
                activeTab={this.state.activeTab}
                tabIndex={3}
                setActiveTab={this.setActiveTab}
                title={this.title2}
                clearTypeClickId={this.clearTypeClickId}
              ></NavItem>
              <NavItem
                activeTab={this.state.activeTab}
                tabIndex={4}
                setActiveTab={this.setActiveTab}
                title={this.title3}
                clearTypeClickId={this.clearTypeClickId}
              ></NavItem>
              <NavItem
                activeTab={this.state.activeTab}
                tabIndex={5}
                setActiveTab={this.setActiveTab}
                title={this.title4}
                clearTypeClickId={this.clearTypeClickId}
              ></NavItem>
              <NavItem
                activeTab={this.state.activeTab}
                tabIndex={6}
                setActiveTab={this.setActiveTab}
                title={this.title5}
                clearTypeClickId={this.clearTypeClickId}
              ></NavItem>
              <NavItem
                activeTab={this.state.activeTab}
                tabIndex={7}
                setActiveTab={this.setActiveTab}
                title={this.title6}
                clearTypeClickId={this.clearTypeClickId}
              ></NavItem>
            </div>
          </div>
          <div className="col-12 col-md-9 ">
            <div className="knowledgeBaseContent">
              <div className="tabContent">
                {this.state.activeTab == 1 && (
                  <Search
                    sp={this.props.sp}
                    isArabic={isArabic}
                    formatDate={this.formatDate}
                    isLoader={this.isLoader}
                    typeClick={this.typeClickHandler}
                  />
                )}
              </div>
              <div className="tabContent">
                {this.state.activeTab == 3 && (
                  <GuideLineBook
                    sp={this.props.sp}
                    isArabic={isArabic}
                    formatDate={this.formatDate}
                    isLoader={this.isLoader}
                    typeClickId={this.state.typeClickId}
                  />
                )}
              </div>
              <div className="tabContent">
                {this.state.activeTab == 4 && (
                  <Videos
                    sp={this.props.sp}
                    isArabic={isArabic}
                    formatDate={this.formatDate}
                    isLoader={this.isLoader}
                  />
                )}
              </div>
              <div className="tabContent">
                {this.state.activeTab == 5 && (
                  <UserReports
                    sp={this.props.sp}
                    isArabic={isArabic}
                    formatDate={this.formatDate}
                    isLoader={this.isLoader}
                    typeClickId={this.state.typeClickId}
                  />
                )}
              </div>
              <div className="tabContent">
                {this.state.activeTab == 6 && (
                  <LessonsLearned
                    sp={this.props.sp}
                    isArabic={isArabic}
                    formatDate={this.formatDate}
                    isLoader={this.isLoader}
                  />
                )}
              </div>
              <div className="tabContent">
                {this.state.activeTab == 7 && (
                  <SystemUpdates
                    sp={this.props.sp}
                    isArabic={isArabic}
                    formatDate={this.formatDate}
                    isLoader={this.isLoader}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </MasterPage>
    );
  }
  formatDate = (isoDate) => {
    var date = new Date(isoDate);
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1);
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var dt;
    if (day < 10) {
      dt = "0" + dt;
    }
    if (parseInt(month) < 10) {
      month = "0" + month;
    }

    // var finalDate = `${year}/${month}/${day} - ${hour}h:${minutes}mn`;
    var finalDate = `${year}/${month}/${day}`;
    return finalDate;
  };
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import * as React from 'react';
// import styles from './KnowledgeBase.module.scss';
// import { IKnowledgeBaseProps } from './IKnowledgeBaseProps';
// import { escape } from '@microsoft/sp-lodash-subset';

// //

// export default class KnowledgeBase extends React.Component < IKnowledgeBaseProps, {} > {
//   public render(): React.ReactElement<IKnowledgeBaseProps> {
//     return(
//       <div className = { styles.knowledgeBase } >
//         <div className={styles.container}>
//           <div className={styles.row}>
//             <div className={styles.column}>
//               <span className={styles.title}>Welcome to SharePoint!</span>
//               <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
//               <p className={styles.description}>{escape(this.props.description)}</p>
//               <a href='https://aka.ms/spfx' className={styles.button}>
//                 <span className={styles.label}>Learn more</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div >
//     );
//   }
// }
