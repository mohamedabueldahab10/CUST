import * as React from 'react';
import styles from './AllTasks.module.scss';
import MasterPage from "../../../HelperRessources/MasterPage/forReact/masterPage";
import { IAllTasksProps } from './IAllTasksProps';
// import mediator from "../../../../node_modules/spm-base/system.Utilities/miscellaneous.Utilities/translateMediatorForTs.js";
import { Dialog, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { ISiteUserProps } from "@pnp/sp/site-users/";
import { escape } from '@microsoft/sp-lodash-subset';
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";

// import { sp } from "@pnp/sp/presets/all";


var isArabic = localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar";

declare global {
  interface Window { handleTaskLinks: any; }
}

// window.MyNamespace = window.MyNamespace || {};
export default class AllTasks extends React.Component<IAllTasksProps, {

  selectedUser: any;
  selectedUserName: any;
  allTasksDataArr: any;
  selectedUserId: any;
  tasktitlearr: any;
  openDialog: any;
  targetElem: any;
  userDelegateLoginName: any;
  userDelegateId: any;
  delegateComment: any;
  openDialogAll: any;
  delegateCommentAll: any;
  showNote: any;
  firstRender: any

}> {
  RelativeUrl = this.props.context.pageContext.web.absoluteUrl;

  constructor(props) {
    super(props);


    this.state = {

      selectedUser: "",
      selectedUserName: "",
      selectedUserId: "",
      allTasksDataArr: [],
      tasktitlearr: [],
      openDialog: false,
      targetElem: '',
      userDelegateLoginName: "",
      userDelegateId: "",
      delegateComment: "",
      openDialogAll: false,
      delegateCommentAll: '',
      showNote: false,
      firstRender: true,


    }

    this._getPeoplePickerItems = this._getPeoplePickerItems.bind(this); //bind the function to general "this" in the constructor to get the state
    this._getPeoplePickerDelegateItems = this._getPeoplePickerDelegateItems.bind(this)
  }


  notes = isArabic ? "ملاحظات" : "Notes"
  delegate = isArabic ? "تفويض" : "Delegate"
  send = isArabic ? "إرسال" : "Send"
  cancel = isArabic ? "إلغاء" : "Cancel"
  allTasksTo = isArabic ? "تفوض جميع المهام ل " : "Delegate All Tasks For"
  commissioner = isArabic ? "المفوض" : "Commissioner"
  relateditem = isArabic ? "العنصر ذو الصلة" : "Related Item"
  duedate = isArabic ? "تاريخ الاستحقاق" : "Due Date"
  groupName = isArabic ? "المجموعة المرتبطة" : "Related Group"
  delegatemsg = isArabic ? "يرجى التأكد بأن المستخدم مضاف مسبقا الى المجموعة المناسبة" : "Please make sure that the user has been added to the corresponding group"
  nodata = isArabic ? "لا يوجد" : "No data"
  relatedUserOrGroup = isArabic ? "اسم المستخدم او المجموعة" : "User or Group Name"
  warningMsg = isArabic ? "يرجى العلم بأنه سيتم تعيين جميع المهام للشخص دون النظر الى صلاحياته" : "Please Note that will Assign all tasks to the user without check his role"
  componentDidMount = () => {
    var tasktitlearr = ""

    if (localStorage.getItem("Dynamo_Tasks Configuration") != null) {
      tasktitlearr = JSON.parse(
        localStorage.getItem("Dynamo_Tasks Configuration") || "[]"
      );
    }



    setTimeout(function () {
      [].forEach.call(
        document.querySelectorAll(".vertical-centered-box"),
        function (el) {
          el.style.display = "none";
        }
      );
    }, 3000)


    // mediator.init(); // like changeResources function

    console.log(tasktitlearr, "tasktitlearr in did mount")

    this.setState({
      tasktitlearr: tasktitlearr,
    })
  }

  getTasks = async () => {
    try {

      console.log(this.props, "proooooooooooops")
      // var allTasksData = await this.props.sp.web.lists
      // .getByTitle("Tasks").items.filter(`AssignedTo eq ${this.state.selectedUserName}`)

      // '<View><Query><Where><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>'
     
      // '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>';

      var allTasksData = await this.props.sp.web.lists
        .getByTitle("Tasks").getItemsByCAMLQuery({
          ViewXml:
          `<View>
          <Query>
            <Where>
            <And>
            <Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq>
            <And>
            <Or>
            <Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer">${this.state.selectedUserId}</Value></Eq>
            <Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership>
            </Or>
            <Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq>
            </And>
            </And>
            </Where>
          </Query>
        </View>`,
          //   `<View>
          //   <Query>
          //     <Where>
          //     <And>
          //     <Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer">${this.state.selectedUserId}</Value></Eq>
          //     <Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq>
          //     </And>
          //     </Where>
          //   </Query>
          // </View>`,
        })


      this.setState({
        firstRender: false,
        allTasksDataArr: allTasksData
      }, () => {
        console.log(this.state.allTasksDataArr, "allTasksDataArr")
      })



    } catch (e) {
      console.log(e);
    }
  }

  public getTaskName = (taskTitle: any) => {

    var taskname = ''

    var tasktitlefilter = this.state.tasktitlearr.filter(function (item) {
      return item.code == taskTitle;
    });

    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {
      taskname = tasktitlefilter[0].name;
    } else taskname = tasktitlefilter[0].nameEn;

    return (
      <div>{taskname}</div>
    )
  }



  getTaskGroupInfo = (taskTitle: any) => {
    var taskgroup = ''

    var taskgroupfilter = this.state.tasktitlearr.filter(function (item) {
      return item.code == taskTitle;
    });

    taskgroup = taskgroupfilter[0].group ? taskgroupfilter[0].group : this.nodata;

    return (
      <div>{taskgroup}</div>
    )
  }



  getTaskHistory = (el) => {
    if (el.WorkflowName == "Project") {
      window.open(`${this.RelativeUrl}/SitePages/TaskHistory.aspx?TT=${el.WorkflowName}&PCODE=${el.ProjectCode}&IID=${el.RelatedItemID}`, "_blank")
    } else {
      window.open(`${this.RelativeUrl}/SitePages/TaskHistory.aspx?TT=${el.WorkflowName}&IID=${el.RelatedItemID}`, "_blank")
    }
  }


  checkIsMember = (groupName, userLoginName) => {
    console.log(groupName, "groupName")
    console.log(userLoginName, "userLoginName")
    var that = this

    $.ajax({
      url:
        this.RelativeUrl +
        "/_api/web/sitegroups/getByName('" +
        groupName +
        "')/Users?$filter=LoginName eq  '" +
        userLoginName +
        "' ",
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (data) {
        $(".userExist").remove();

        if (data.d.results[0] != undefined) {
          that.delegatedTaskHandler()
        } else {
          that.setState({
            showNote: true
          })
        }

        console.log(data, "insuccess")
      },
      error: function () {

        this.setState({
          showNote: true
        })

      },
    });
  }

  getTaskGroup = (elem) => {
    // if (elem.WorkflowName == "Project") {
    if (localStorage.getItem("Dynamo_Tasks Configuration") != null) {
      var stages = JSON.parse(
        localStorage.getItem("Dynamo_Tasks Configuration") || "[]"
      );
      stages = stages.filter(function (item) {
        return item.code == elem.StageID;
      });
      var assignedToGroup = stages[0].group;

      var user = encodeURIComponent(this.state.userDelegateLoginName)
      this.checkIsMember(assignedToGroup, user)
    }
    // }
  }


  delegatedTaskHandler = async () => {


    console.log(this.state.targetElem,"this.state.targetElem")
    debugger

    var ppp = [this.state.userDelegateId]
    var delegatedFrom = this.state.targetElem.AssignedToId[0]

    var state = this.state
    try {
      const list = await this.props.sp.web.lists
        .getByTitle("Tasks")
        .items.add({
          Title: state.targetElem.Title,
          WorkflowName: state.targetElem.WorkflowName,
          WFInstanceID: state.targetElem.WFInstanceID,
          TaskType: state.targetElem.TaskType,
          StageName: state.targetElem.StageName,
          StageID: state.targetElem.StageID,
          StageIDApprove: state.targetElem.StageIDApprove,
          StageIDReject: state.targetElem.StageIDReject,
          RelatedURL: state.targetElem.RelatedURL,
          RelatedItemID: state.targetElem.RelatedItemID,
          Body: state.targetElem.Body,
          RelatedItemTitle: state.targetElem.RelatedItemTitle,
          AssignedToId: { results: ppp },
          ProjectCode: state.targetElem.ProjectCode,
          DelegationReason: state.delegateComment,
          Status: "Open",
          ProjectUID: state.targetElem.ProjectUID ? state.targetElem.ProjectUID : '',
          TaskDelegatedFromId: delegatedFrom,
          ProjectName: state.targetElem.ProjectName ? state.targetElem.ProjectName : '',
          ListKey:state.targetElem.ListKey ? state.targetElem.ListKey : '' 
        });

      this.deleteTaskDelegation()
      // DeleteDelegate_Data_Submit.init(state.targetElem.Id);

    } catch (e) {
      console.log(e);
    }
  }


  deleteTaskDelegation = async () => {

    var allTasksData = await this.props.sp.web.lists.getByTitle("Tasks")
      .items.getById(this.state.targetElem.Id).update({
        Status: 'Closed',
        WFInstanceID: null,
        TakenAction: 'delegate'
      });

    this.setState({
      openDialog: false
    }, () => {
      this.getTasks()
    })
  }

  reAssignedAll = async () => {
    this.state.allTasksDataArr.map(async (el, i) => {
      var ppp = [this.state.userDelegateId]
      var delegatedFrom = el.AssignedToId[0]
      try {
        const list = await this.props.sp.web.lists
          .getByTitle("Tasks")
          .items.add({

            Title: el.Title,
            WorkflowName: el.WorkflowName,
            WFInstanceID: el.WFInstanceID,
            TaskType: el.TaskType,
            StageName: el.StageName,
            StageID: el.StageID,
            StageIDApprove: el.StageIDApprove,
            StageIDReject: el.StageIDReject,
            RelatedURL: el.RelatedURL,
            RelatedItemID: el.RelatedItemId,
            Body: el.Body,
            RelatedItemTitle: el.RelatedItemTitle,
            AssignedToId: { results: ppp },
            ProjectCode: el.ProjectCode,
            DelegationReason: this.state.delegateCommentAll,
            Status: "Open",
            ProjectUID: el.ProjectUID ? el.ProjectUID : '',
            TaskDelegatedFromId: delegatedFrom,
            ProjectName: el.ProjectName ? el.ProjectName : ''

          })

        var allTasksData = await this.props.sp.web.lists.getByTitle("Tasks")
          .items.getById(el.Id).update({
            Status: 'Closed',
            WFInstanceID: null,
            TakenAction: 'delegate'
          });

        this.setState({
          openDialogAll: false
        })
        if (this.state.allTasksDataArr.length == i + 1) {
          this.getTasks()

        }

      } catch (e) {
        console.log(e, "ERRRRRRRRRRRR")
      }
    })


  }

  private _getPeoplePickerItems(items: any[]) {
    console.log("Items:", items);

    items.length
      ? this.setState({
        selectedUser: items[0].loginName,
        selectedUserName: items[0].text,
        selectedUserId: items[0].id
      })
      : this.setState({ selectedUser: "", selectedUserName: "" });
  }

  private _getPeoplePickerDelegateItems(items: any[]) {
    console.log(items, "items yesy")
    items.length
      ? this.setState({
        userDelegateLoginName: items[0].loginName,
        userDelegateId: items[0].id,
        showNote: false
      })
      : this.setState({
        userDelegateLoginName: '',
        userDelegateId: '',
        showNote: false
      })
  }
  public render(): React.ReactElement<IAllTasksProps> {
    return (
      <MasterPage context={this.props.context}>
        <Dialog
          title={""}
          // modalProps={{containerClassName:'ms-dialogMainOverride ' + styles.textDialog}}
          containerClassName={"ms-dialogMainOverride " + styles.textDialog}
          responsiveMode={5}
          isOpen={this.state.openDialogAll}
          dialogContentProps={{
            showCloseButton: true,
          }}
          onDismiss={() => {
            this.setState({ openDialogAll: false });
          }}
        >
          <div>
            <div className={styles.centertext}>
              {this.allTasksTo}
            </div>
            <div>
              <PeoplePicker
                context={this.props.context}
                titleText={''}
                personSelectionLimit={1}
                ensureUser={true}
                groupName={""} // Leave this blank in case you want to filter from all users
                showtooltip={true}
                tooltipMessage={this.relatedUserOrGroup}
                isRequired={false}
                disabled={false}
                selectedItems={this._getPeoplePickerDelegateItems} //onChange in newer versions
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                resolveDelay={1000}
              />
            </div>
            <div className={styles.centertext}>
              {this.notes}
            </div>
            <div>
              <textarea className={styles.fullwidth} onChange={(e) => {
                this.setState({
                  delegateCommentAll: e.target.value
                })
              }}>

              </textarea>
            </div>
            <div className={styles.delegateBtnContainer}>
              <button className={styles.delegateSendBtn} style={{ margin: "0px 5px" }}
                disabled={this.state.userDelegateLoginName ? false : true}
                onClick={() => {

                  this.reAssignedAll()
                  // this.getTaskGroup(this.state.targetElem)
                  console.log("SEND ALL TASK DELEGATED")
                }}>{this.send}</button>
              <button className={styles.delegateCancelBtn} onClick={() => {
                this.setState({
                  openDialogAll: false
                })
              }}>{this.cancel}</button>
            </div>
            <div className={styles.redNote}>
              {this.warningMsg}
            </div>
          </div>
        </Dialog>

        {/* //////////////////// */}
        <Dialog
          title={""}
          // modalProps={{containerClassName:'ms-dialogMainOverride ' + styles.textDialog}}
          containerClassName={"ms-dialogMainOverride " + styles.textDialog}
          responsiveMode={5}
          isOpen={this.state.openDialog}
          dialogContentProps={{
            showCloseButton: true,
          }}
          onDismiss={() => {
            this.setState({ openDialog: false });
          }}
        >
          <div>
            <div className={`${styles.centertext} Resources`} data-trans-commissioner>
              {this.commissioner}
            </div>
            <div>
              <PeoplePicker
                context={this.props.context}
                titleText={``}
                personSelectionLimit={1}
                ensureUser={true}
                groupName={""} // Leave this blank in case you want to filter from all users
                showtooltip={true}
                tooltipMessage={this.relatedUserOrGroup}
                isRequired={false}
                disabled={false}
                selectedItems={this._getPeoplePickerDelegateItems} //onChange in newer versions
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                resolveDelay={1000}
              />
            </div>
            {this.state.showNote &&
              <div className={styles.redNote}>{this.delegatemsg}</div>
            }
            <div className={`${styles.centertext} Resources`} data-trans-notes>
              {this.notes}
            </div>
            <div>
              <textarea className={styles.fullwidth} onChange={(e) => {
                this.setState({
                  delegateComment: e.target.value
                })
              }}>

              </textarea>
            </div>
            <div className={styles.delegateBtnContainer}>
              <button className={styles.delegateSendBtn} style={{ margin: "0px 5px" }} onClick={() => {
                this.getTaskGroup(this.state.targetElem)
              }}><span className='Resources' data-trans-send>{this.send}</span></button>
              <button className={styles.delegateCancelBtn} onClick={() => {
                this.setState({
                  openDialog: false
                })
              }}><span className='Resources' data-trans-cancelbutton>{this.cancel}</span></button>
            </div>
          </div>
        </Dialog>

        <div className={`${styles.allTasks} pt-5`}>
          <div className={styles.searchcontainer} >
            <div className={styles.pickercontainer} >
              <PeoplePicker
                context={this.props.context}
                titleText={this.relatedUserOrGroup}
                personSelectionLimit={1}
                ensureUser={true}
                groupName={""} // Leave this blank in case you want to filter from all users
                showtooltip={true}
                tooltipMessage={this.relatedUserOrGroup}
                isRequired={false}
                disabled={false}
                selectedItems={this._getPeoplePickerItems} //onChange in newer versions
                showHiddenInUI={false}
                principalTypes={[PrincipalType.User]}
                resolveDelay={1000}
              />
            </div>
            <button
              onClick={() => {
                this.getTasks();
              }}
              type="button"
              // disabled={this.state.replyMsg ? false : true}

              title={"عرض كافة المهام"}
              className={`${styles.searchbtn} Resources`}
              data-trans-alltasks
            // className={styles.replySubmit}
            >
              عرض كافة المهام
            </button>

            <button
              onClick={() => {
                this.setState({
                  userDelegateLoginName: '',
                  openDialogAll: true
                })
              }}
              type="button"
              disabled={(this.state.allTasksDataArr.length > 0 && this.state.selectedUser) ? false : true}

              title={""}
              className={`${styles.searchbtn} Resources`}
              data-trans-delegateall
            >
              تفويض جميع المهام
            </button>
          </div>
          {this.state.allTasksDataArr.map((el, i) => {
            console.log(el,"EL IN ALLLLLLLLLLLL TASKS")
            var checkCode  = el.WorkflowName == "Project" ? el.ProjectCode : el.RelatedItemTitle
            return (
              <div className={styles.taskcontainer}  >
                <div style={{ width: "30%",cursor:"pointer" }}  onClick={()=>{
                  window.handleTaskLinks.handleids(checkCode,el.Id,el.TaskType,el.StageID,el.RelatedItemID,el.SourceItemID,el.WorkflowName,el.ProjectUID,el.ProjectCode)
                }}>
                  {this.getTaskName(el.Title)}
                </div>
                <div style={{ width: "30%" }}>
                  <div className={styles.taskvalue}>
                    {el.RelatedItemTitle}
                  </div>
                  <div className={styles.tasktitle}>
                    {this.relateditem}
                  </div>
                </div>

                <div style={{ width: "20%" }}>
                  <div className={styles.taskvalue}>
                    {this.getTaskGroupInfo(el.Title)}
                    {/* {el.DueDate ? el.DueDate : this.nodata} */}
                  </div>
                  <div className={styles.tasktitle}>
                    {this.groupName}
                  </div>
                </div>
                <div style={{ width: "10%", display: "flex" }}>
                  <button
                    onClick={() => {
                      this.setState({
                        targetElem: el,
                        openDialog: true
                      })
                    }}
                    type="button"
                    // disabled={this.state.replyMsg ? false : true}

                    title={this.delegate}
                    className={styles.delegatebtn}
                  // className={styles.replySubmit}
                  >
                    {this.delegate}
                  </button>
                </div>
                <div className={styles.iconcontainer} onClick={() => this.getTaskHistory(el)}><i title="title" className="fas fa-history"></i></div>
              </div>
            )
          })}
          {this.state.allTasksDataArr.length == 0 && this.state.firstRender ?
            <div className={`${styles.nodata} Resources`} data-trans-taskssearch>
              الرجاء البحث عن مهام لمستخدم
            </div>
            : this.state.allTasksDataArr.length == 0 ?
              <div className={`${styles.nodata} Resources`} data-trans-notasks>لا يوجد اي مهام حاليا</div>
              :
              ""
          }
        </div>
      </MasterPage >

      // <div className = { styles.allTasks } >
      //   <div className={styles.container}>
      //     <div className={styles.row}>
      //       <div className={styles.column}>
      //         <span className={styles.title}>Welcome to SharePoint!</span>
      //         <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
      //         <p className={styles.description}>{escape(this.props.description)}</p>
      //         <a href='https://aka.ms/spfx' className={styles.button}>
      //           <span className={styles.label}>Learn more</span>
      //         </a>
      //       </div>
      //     </div>
      //   </div>
      // </div >
    );
  }
}
