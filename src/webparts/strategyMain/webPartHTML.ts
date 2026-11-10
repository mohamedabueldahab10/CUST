const isArabic =
  localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar";
const logo: any = isArabic
  ? require("../../HelperRessources/img/main-logo.svg")
  : require("../../HelperRessources/img/main-logo-en.svg");
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

<div class="container-fluid container-body strategyMain">
  <div class="row">
    <div class="col-12">
      <div
        class="d-flex flex-nowrap align-items-center justify-content-start filter-container"
      >
        <div class="strategy-filter-option">
          <select class="form-control px-2" id="Sector">
            <option
              class="Resources"
              data-trans-filter6
              value=""
              selected
            ></option>
          </select>
        </div>

        <div class="strategy-filter-option">
          <select class="form-control px-2" id="Department">
            <option
              class="Resources"
              data-trans-filter5
              value=""
              selected
            ></option>
          </select>
        </div>

        <!-- Filter Button -->
        <button class="btn filter-btn" type="button">
          <i class="fas fa-sliders-h mx-2"></i>
          <span class="Resources" data-trans-strategymainfilter></span>
        </button>

        <div class="reset-btn" title="Reset">
          <i class="fas fa-undo mx-2"></i>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12" id="strategies-container">
    <div class="row mx-2 py-2 Section-Main-title Resources">
      <span class="Resources" data-trans-strategies> </span>
    </div>
    <div class="row py-2">
      <span><i class="fas fa-info ml-1"></i></span>
      <span class="Resources mx-2" data-trans-choosestrategy> </span>
    </div>
    <div>
      <div
        class="row justify-content-start"
        id="strategies-cards-container"
      ></div>
    </div>
  </div>
  <div class="row mt-5" id="pillar-container">
    <div class="col-12">
      <div class="accordion" id="pillar">
        <div class="card">
          <div class="card-header" id="pillarhead">
            <a
              href="#"
              class="btn btn-header-link"
              data-toggle="collapse"
              data-target="#pillars"
              aria-expanded="true"
              aria-controls="pillars"
            >
              <span class="Resources" data-trans-pillars></span>
            </a>
          </div>
          <div
            id="pillars"
            aria-labelledby="pillarhead"
            data-parent="#pillar"
            class="collapse show"
          >
            <!-- <div class="card-body"> -->
            <div class="col-12">
              <div class="row" id="pillar-cards-container"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row" id="mainGoal-container">
    <div class="col-12">
      <div class="accordion" id="mainGoal">
        <div class="card">
          <div class="card-header" id="mainGoalhead">
            <a
              href="#"
              class="btn btn-header-link"
              data-toggle="collapse"
              data-target="#mainGoal1"
              aria-expanded="true"
              aria-controls="mainGoal1"
            >
              <span class="Resources" data-trans-maingoals></span>
            </a>
          </div>
          <div
            id="mainGoal1"
            aria-labelledby="mainGoalhead"
            data-parent="#mainGoal"
            class="collapse show"
          >
            <div class="card-body">
              <div class="row" id="mainGoal-cards-container"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row" id="Goal2-container">
    <div class="col-12">
      <div class="accordion" id="Goal2">
        <div class="card">
          <div class="card-header" id="Goal2head">
            <a
              href="#"
              class="btn btn-header-link"
              data-toggle="collapse"
              data-target="#Goals2"
              aria-expanded="true"
              aria-controls="Goals2"
            >
              <span class="Resources" data-trans-secondgoals></span>
            </a>
          </div>
          <div
            id="Goals2"
            aria-labelledby="Goal2head"
            data-parent="#Goal2"
            class="collapse show"
          >
            <div class="card-body">
              <div class="row" id="Goal2-cards-container"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row" id="Goal3-container">
    <div class="col-12">
      <div class="accordion" id="Goal3">
        <div class="card">
          <div class="card-header" id="Goal3head">
            <a
              href="#"
              class="btn btn-header-link"
              data-toggle="collapse"
              data-target="#Goals3"
              aria-expanded="true"
              aria-controls="Goal31"
            >
              <span class="Resources" data-trans-thirdgoals></span>
            </a>
          </div>
          <div
            id="Goals3"
            aria-labelledby="Goal3head"
            data-parent="#Goal3"
            class="collapse show"
          >
            <div class="card-body">
              <div class="row" id="Goal3-cards-container"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row m-1" id="kpis">
    <div class="col-6 my-5">
      <p class="Resources main-section-title" data-trans-kpis></p>
    </div>
    <div class="col-6 my-5 toggle-section d-flex justify-content-end">
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="btn nav-link active w-25 mx-2"
            id="strategyproject-tab"
            data-toggle="tab"
            data-target="#strategyproject"
            type="button"
            role="tab"
            aria-controls="strategyproject"
            aria-selected="true"
          >
            <span class="Resources" data-trans-strategyproject></span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="btn nav-link w-25 mx-2"
            id="operational-tab"
            data-toggle="tab"
            data-target="#operational"
            type="button"
            role="tab"
            aria-controls="operational"
            aria-selected="false"
          >
            <span class="Resources" data-trans-operational></span>
          </button>
        </li>
      </ul>
    </div>
    <div class="tab-content col-12">
      <div
        class="tab-pane row fade show active"
        id="strategyproject"
        role="tabpanel"
        aria-labelledby="strategyproject-tab"
      >
        <div class="row w-100" id="kpis-strategic-container"></div>
      </div>

      <div
        class="tab-pane row fade"
        id="operational"
        role="tabpanel"
        aria-labelledby="operational-tab"
      >
        <div class="row w-100" id="kpis-operational-container"></div>
      </div>
    </div>
  </div>
</div>

<!-- Modal -->
<div
  class="modal fade strategyMain-modal"
  id="goalModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="goalModalTitle"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div class="modal-content border-light-gray">
      <div
        class="modal-header border-0 w-100 pt-0 d-flex justify-content-between align-items-center"
      >
        <div class="modal-header-spacer" style="width: 28px"></div>
        <div class="flex-grow-1 text-center">
          <h5 class="section-title Resources mb-0"></h5>
        </div>
        <div>
          <button
            type="button"
            class="close d-flex justify-content-end fnt-24"
            data-dismiss="modal"
            aria-label="Close"
            aria-hidden="true"
          >
            &times;
          </button>
        </div>
      </div>
      <div class="modal-body"></div>
      <div class="modal-footer d-flex justify-content-center border-0">
        <button
          type="button"
          class="btn btn-red btn-block text-center w-50 fnt-13"
        >
          <span class="Resources" data-trans-showdetails> </span>
        </button>
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
        <h2 class="page-title" id="UserRole"></h2>
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
