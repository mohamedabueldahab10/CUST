require('../../HelperRessources/css/security.css');
// import * as $ from 'jquery';
// require('../../HelperRessources/js/sharepointplus.js');
import { override } from '@microsoft/decorators';
// import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
// import { Dialog } from '@microsoft/sp-dialog';

// import * as strings from 'SystemSecurityApplicationCustomizerStrings';
import {sp} from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
const LOG_SOURCE: string = 'SystemSecurityApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISystemSecurityApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SystemSecurityApplicationCustomizer
  extends BaseApplicationCustomizer<ISystemSecurityApplicationCustomizerProperties> {
  private getUserGroups(): void
  {
    const adminGroup = 'Administrators for Project Web App';
    var isAdmin = false;
    sp.web.currentUser.groups().then((res)=>
    {
      console.log(res);
      var newRes = res.filter((e)=>{
        return e.Title == adminGroup
      });

      if(newRes.length==0)
      {
        if (window.location.href.toLocaleLowerCase().indexOf("/sitepages") == -1 || window.location.href.toLocaleLowerCase().indexOf("/sitepages/forms/") > -1) {
          this.Security_Msg();
        }
      }
      // console.log(res);
    })
  };
  private Security_Msg(): void {
    const RelativeUrl = this.context.pageContext.web.absoluteUrl;
    const securityuser = `${RelativeUrl}/Style%20Library/spm/images/security-user.PNG`;
    if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
      document.body.innerHTML = `<div class="popupComment access-denied"><div class="wrapcomments"><div class="denied-icon" style="background:url('${securityuser}') no-repeat;background-position:center"></div><label> عذرا، ليس لديك صلاحية لرؤية البيانات </label><div style="margin-bottom:15px">يرجى التكرم برفع طلب صلاحية عبر منصة خدماتي لمنحكم صلاحية الوصول إلى هذه الشاشة. وفي حال توفر الصلاحية مسبقًا، يرجى رفع بلاغ دعم فني عبر منصة خدماتي لمعالجة المشكلة</div><button class="btn btn-action" type="button" style="margin:0px" onclick="window.location=\'${RelativeUrl}\';">الصفحة الرئيسية</button></div></div></div>`
    }
    else {
      document.body.innerHTML = `<div class="popupComment access-denied"><div class="wrapcomments"><div class="denied-icon" style="background:url('${securityuser}') no-repeat;background-position:center"></div><label>Sorry, you don't have permission to view the data</label><div style="margin-bottom:15px">Please contact the system administrator for more information</div><button class="btn btn-action" type="button" style="margin:0px" onclick="window.location=\'${RelativeUrl}\';">Home Page</button></div></div></div>`
    }
  }
  @override
  public onInit(): Promise<void> {
    this.getUserGroups();
    // Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    // const RelativeUrl = this.context.pageContext.web.absoluteUrl;
    // console.log(RelativeUrl);
    // const securityuser = `${RelativeUrl}/Style%20Library/spm/images/security-user.PNG`;

    // var Groups = [], UserN, isAdminUser = false;
    // var userCalls = {
    //   Security_get_CurrentUser: () => {
    //     //getUserWebPermissionREST();
    //     $.ajax({
    //       url: `${RelativeUrl}/_api/web/CurrentUser`,
    //       method: "GET",
    //       headers: {
    //         "Accept": "application/json; odata=verbose"
    //       },
    //       success: (data) => {
    //         console.log('security', data);
    //         UserN = data.d;
    //         userCalls.Security_get_CurrentUserGroupColl(data.d.Id);
    //         isAdminUser = UserN.IsSiteAdmin;
    //       },
    //       error: (data) => {
    //         console.log('call failed');
    //       }
    //     });
    //   },
    //   Security_get_CurrentUserGroupColl: (UserID) => {
    //     $.ajax({
    //       url: `${RelativeUrl}/_api/web/GetUserById(` + UserID + `)/Groups`,
    //       method: "GET",
    //       headers: {
    //         "Accept": "application/json; odata=verbose"
    //       },
    //       success: (data) => {
    //         console.log('security', data);
    //         /* get all group's title of current user. */
    //         var results = data.d.results;
    //         for (var i = 0; i < results.length; i++) {
    //           Groups.push(results[i].Title);
    //         }

    //         if (!isAdminUser && Groups.indexOf('Administrators for Project Web App') == -1) {
    //           if (window.location.href.toLocaleLowerCase().indexOf("/sitepages") == -1 || window.location.href.toLocaleLowerCase().indexOf("/sitepages/forms/") > -1) {
    //             userCalls.g.Security_Msg();
    //           }
    //         }
    //         //console.log(UserN);
    //       },
    //       error: (data) => {
    //         console.log('security error', data);
    //       }
    //     });
    //   },
    //   g: {
    //     Security_Msg: () => {
    //       $('body').animate({ opacity: 0 }, {
    //         duration: 333,
    //         complete: () => {
    //           if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
    //             $('body').html(`<div class="popupComment access-denied"><div class="wrapcomments"><div class="denied-icon" style="background:url('${securityuser}') no-repeat;background-position:center"></div><label> عذرا، ليس لديك صلاحية لرؤية البيانات </label><div style="margin-bottom:15px">الرجاء التواصل مع مسؤول النظام للمزيد من المعلومات</div><button class="btn btn-action" type="button" style="margin:0px" onclick="window.location=\'${RelativeUrl}\';">الصفحة الرئيسية</button></div></div></div>`);
    //           }
    //           else {
    //             $('body').html(`<div class="popupComment access-denied"><div class="wrapcomments"><div class="denied-icon" style="background:url('${securityuser}') no-repeat;background-position:center"></div><label>Sorry, you don't have permission to view the data</label><div style="margin-bottom:15px">Please contact the system administrator for more information</div><button class="btn btn-action" type="button" style="margin:0px" onclick="window.location=\'${RelativeUrl}\';">Home Page</button></div></div></div>`);
    //           }
    //           $('body').animate({ opacity: 1 });
    //         }
    //       });
    //     }
    //   }
    // };
    // userCalls.Security_get_CurrentUser();
    // let message: string = this.properties.testMessage;
    // if (!message) {
    //   message = '(No properties were provided.)';
    // }

    // Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);

    return Promise.resolve();
  }
}
