const isArabic =
  localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar";
const logo: any = isArabic
  ? require("../../HelperRessources/img/main-logo.png")
  : require("../../HelperRessources/img/main-logo-en.png");
const bell: any = require("../../HelperRessources/img/icon-bell.svg");

const pageBody: string = `<div class="navbar page-nav px-5 py-0">
  <ul class="navbar-nav bd-navbar-nav flex-row">
    <!--<li class="nav-item active"><a href="#">Home</a></li>
                    <li class="nav-item"><a href="#">About</a></li>
                    <li class="nav-item"><a href="#">Contact</a></li>-->
  </ul>
  <!--added by oday to add extra items on toggle menu-->
  <nav role="navigation" class="extra-nav-items">
    <div class="menuToggleBurgMenu">
      <input type="checkbox" id="navcheckboxId" />
      <span></span>
      <span></span>
      <span></span>
      <ul class="menuBurg"></ul>
    </div>
  </nav>
</div>

<div class="strategyHome-new wrapper container-fluid container-body">
  <div class="row mb-5">
    <div class="col-md-3">
      <div class="card">
        <div class="card-body">
          <div class="icon-content d-flex align-items-center mb-3">
            <i class="fa fa-eye card-icon"></i>
            <p
              class="Resources fon card-title mx-3"
              data-trans-strategyhomevision
            ></p>
          </div>
          <p class="card-text visionDesc"></p>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card">
        <div class="card-body">
          <div class="icon-content d-flex align-items-center mb-3">
            <i class="far fa-paper-plane card-icon"></i>
            <h5 class="Resources card-title mx-3" data-trans-message></h5>
          </div>
          <p class="card-text messageDesc"></p>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card">
        <div class="card-body">
          <div class="icon-content d-flex align-items-center mb-3">
            <i class="fas fa-shield-alt card-icon"></i>
            <h5 class="Resources card-title mx-3" data-trans-values></h5>
          </div>
          <p class="card-text valuesDesc"></p>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card">
        <div class="card-body">
          <div class="icon-content d-flex align-items-center mb-3">
            <i class="fas fa-bullseye card-icon"></i>
            <h5 class="Resources card-title mx-3" data-trans-objectives></h5>
          </div>
          <p class="card-text objectivesDesc"></p>
        </div>
      </div>
    </div>
  </div>

  <div class="row second-section m-1">
    <ul
      class="nav nav-tabs"
      id="myTab"
      role="tablist"
    >

      <li class="nav-item " role="presentation">
        <button
          class="nav-link active-tab d-flex justify-content-between align-items-center active"
          id="strpillar-tab"
          data-toggle="tab"
          data-target="#strpillar"
          type="button"
          role="tab"
          aria-controls="strpillar"
          aria-selected="true"
        >
          <span data-trans-strpillar class="Resources tab-head"> </span>
          <span></span>
        </button>
      </li>
      <li class="nav-item " role="presentation">
        <button
          class="nav-link active-tab d-flex justify-content-between align-items-center"
          id="objectives-tab"
          data-toggle="tab"
          data-target="#objectives"
          type="button"
          role="tab"
          aria-controls="objectives"
          aria-selected="false"
        >
          <span data-trans-objectives class="Resources tab-head"> </span>
          <span></span>
        </button>
      </li>
      <li class="nav-item " role="presentation">
        <button
          class="nav-link active-tab d-flex justify-content-between align-items-center"
          id="kpis-tab"
          data-toggle="tab"
          data-target="#kpis"
          type="button"
          role="tab"
          aria-controls="kpis"
          aria-selected="false"
        >
          <span data-trans-kpis class="Resources tab-head"> </span>
          <span></span>
        </button>
      </li>

      <li class="nav-item " role="presentation">
        <button
          class="nav-link active-tab d-flex justify-content-between align-items-center"
          id="initiatives-tab"
          data-toggle="tab"
          data-target="#initiatives"
          type="button"
          role="tab"
          aria-controls="initiatives"
          aria-selected="false"
        >
          <span data-trans-initiatives class="Resources tab-head"> </span>
          <span></span>
        </button>
      </li>
      <li class="nav-item " role="presentation">
        <button
          class="nav-link active-tab d-flex justify-content-between align-items-center"
          id="projects-tab"
          data-toggle="tab"
          data-target="#projects"
          type="button"
          role="tab"
          aria-controls="projects"
          aria-selected="false"
        >
          <span data-trans-title3 class="Resources tab-head"> </span>
          <span></span>
        </button>
      </li>
    </ul>
    <div class="tab-content p-0 col-12" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="strpillar"
        role="tabpanel"
        aria-labelledby="strpillar-tab"
      ></div>
      <div
        class="tab-pane fade"
        id="objectives"
        role="tabpanel"
        aria-labelledby="objectives-tab"
      ></div>
      <div
        class="tab-pane fade"
        id="kpis"
        role="tabpanel"
        aria-labelledby="kpis-tab"
      ></div>
      <div
        class="tab-pane fade"
        id="initiatives"
        role="tabpanel"
        aria-labelledby="initiatives-tab"
      ></div>
      <div
        class="tab-pane fade"
        id="projects"
        role="tabpanel"
        aria-labelledby="projects-tab"
      ></div>
    </div>
  </div>

  <!-- Modal Dialog HTML -->

  <div
    class="modal fade"
    id="cardModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="cardModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="cardModalLabel"></h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p id="cardModalBody"></p>
        </div>
        <div class="modal-footer">
          <button
            id="navigate"
            type="button"
            data-trans-showdetails
            class="Resources btn btn-action"
          ></button>
          <button
            type="button"
            data-dismiss="modal"
            data-trans-close
            class="Resources btn btn-cancel"
          ></button>
        </div>
      </div>
    </div>
  </div>
</div>
`;

function buildMaster(pageContent: string): string {
  return `
<div class="wrapper d-flex project-home-page" id="navbarsParent">
  <nav class="sidebar d-inline-block">
    <div class="sidebar-sticky">
      <div class="main-logo"><a href="/"><img css="w-100" src="${logo}"></a></div>
      <ul class="nav flex-column sidelinkscontainer"></ul>
      <div class="accordion important-links-ctx" id="accordionImportantLinks">
        <div class="card bg-transparent border-0">
          <div class="card-header" id="headingImportantLinks">
            <h5 class="mb-0 w-100">
              <button class="important-links-btn btn btn-link text-white w-100 text-center Resources" type="button" data-toggle="collapse" data-target="#collapseImportantLinks" aria-expanded="false" aria-controls="collapseImportantLinks" data-trans-importantLinks>ImportantLinks</button>
            </h5>
          </div>
          <div id="collapseImportantLinks" class="collapse" aria-labelledby="headingImportantLinks" data-parent="#accordionImportantLinks">
            <div class="card-body"><ul class="ul-important-links px-3"></ul></div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="main-panel">
    <nav class="navbar px-0"><div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-toggle">
          <button class="navbar-toggler js-menu-click d-xl-none" type="button" onClick="handleMainMenu.open()">
            <span class="navbar-toggler-bar bar1"></span><span class="navbar-toggler-bar bar2"></span><span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <h2 class="page-title overflow-ellipsis" id="UserRole"></h2>
      </div>
      <div class="nav-settings justify-content-end"><div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group" id="langs">
          <a class="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center" href="#" id="en">English</a>
          <a class="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center" href="#" id="ar">عربي</a>
        </div>
        <div style="position:relative;">
          <div class="btn-group mx-3" id="notificationContainer">
            <button class="bbtn btn-lg w-5 fnt-14 d-inline-flex align-items-center" type="button" data-toggle="collapse" data-target="#notificationCollapse" aria-haspopup="true" aria-expanded="false">
              <span class="icon-bell d-inline-flex align-items-center text-center"><img src="${bell}" class="mx-3"><span class="bell-value">0</span></span>
              <span data-trans-notifications class="Resources"></span>
            </button>
          </div>
          <div class="btn-group" id="userGroup">
            <button class="btn btn-lg dropdown-toggle w-5 fnt-14" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="icon-user d-inline-flex align-items-center text-center mx-3"><span class="user-name w-100"></span></span><span class="user-name-full"></span>
            </button>
            <div class="dropdown-menu border-0 dropdown-menu-right"><ul class="list-group"><li class="list-group-item"><a><h3 class="title-13">Credits</h3><div class="des-12 text-nowrap">A new accreditation has been added</div></a></li></ul></div>
          </div>
          <div class="dropdown-menu border-0 dropdown-menu-center notificationCollapse" id="notificationCollapse">
            <div class="accordion" id="accordionRequiredSupportNotifications">
              <div class="card"><div class="card-header bg-white" id="headingOne1"><h3 data-trans-RSupport1 class="Resources acc-header mb-0 py-3 px-2" data-toggle="collapse" data-target="#collapseOneNotifications" id="cardNote1" aria-expanded="false" aria-controls="collapseOneNotifications"></h3></div><div id="collapseOneNotifications" class="collapse" aria-labelledby="headingOne1" data-parent="#accordionRequiredSupportNotifications"><div class="card-body"><ul class="list-group"></ul></div></div></div>
              <div class="card"><div class="card-header bg-white" id="headingTwo1"><h3 data-trans-RSupport2 class="Resources acc-header mb-0 py-3 px-2" data-toggle="collapse" data-target="#collapseTwoNotifications" id="cardNote2" aria-expanded="false" aria-controls="collapseTwoNotifications"></h3></div><div id="collapseTwoNotifications" class="collapse" aria-labelledby="headingTwo1" data-parent="#accordionRequiredSupportNotifications"><div class="card-body"><ul class="list-group"></ul></div></div></div>
              <div class="card"><div class="card-header bg-white" id="headingThree1"><h3 data-trans-RSupport3 class="Resources acc-header mb-0 py-3 px-2" data-toggle="collapse" data-target="#collapseThreeNotifications" id="cardNote3" aria-expanded="false" aria-controls="collapseThreeNotifications"></h3></div><div id="collapseThreeNotifications" class="collapse" aria-labelledby="headingThree1" data-parent="#accordionRequiredSupportNotifications"><div class="card-body"><ul class="list-group"></ul></div></div></div>
              <div class="card"><div class="card-header bg-white" id="headingFour"><h3 data-trans-RSupport5 class="Resources acc-header mb-0 py-3 px-2" data-toggle="collapse" data-target="#collapseFourNotifications" id="cardNote4" aria-expanded="false" aria-controls="collapseFourNotifications"></h3></div><div id="collapseFourNotifications" class="collapse" aria-labelledby="headingFour" data-parent="#accordionRequiredSupportNotifications"><div class="card-body"><ul class="list-group"></ul></div></div></div>
            </div>
          </div>
        </div>
      </div></div>
    </div></nav>
    <div class="container-ctx">${pageContent}</div>
  </div>
  <div class="close-layer js-close-layer" onClick="handleMainMenu.close()"></div>
</div>
`;
}

export default class sample {
  public static wpHTML: string = pageBody;
  public static HTML: string = buildMaster(pageBody);
}
