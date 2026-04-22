window.checkDeletedItemsListingHtml = setInterval(function () {
  if ($("#DeletedItemsListing .col-12").length) {
    clearInterval(window.checkDeletedItemsListingHtml);

    $(
      "div#particles-foreground, div#particles-background, .vertical-centered-box"
    ).animate(
      { opacity: 0 },
      {
        duration: 333,
        complete: function () {
          $(
            "div#particles-foreground, div#particles-background, .vertical-centered-box"
          ).remove();
        },
      }
    );

    $("#DeletedItemsListing .col-12").html(`
      <div class="deleted-items-listing-container p-3">
        <div class="deleted-items-tabs-wrapper mb-3">
          <button type="button" class="deleted-item-tab-btn active" data-item-type="goals">
            <i class="fas fa-bullseye"></i>
            <span data-trans-goals class="Resources"></span>
          </button>
          <button type="button" class="deleted-item-tab-btn" data-item-type="indicators">
            <i class="fas fa-chart-line"></i>
            <span data-trans-performanceindicators class="Resources"></span>
          </button>
          <button type="button" class="deleted-item-tab-btn" data-item-type="initiatives">
            <i class="fas fa-lightbulb"></i>
            <span data-trans-initiatives class="Resources"></span>
          </button>
          <button type="button" class="deleted-item-tab-btn" data-item-type="projects">
            <i class="fas fa-project-diagram"></i>
            <span data-trans-projects class="Resources"></span>
          </button>
        </div>

        <div class="row deleted-items-filters-row">
          <div class="col-md-3 mb-3">
            <label for="DeletedStrategyType" data-trans-searchstrategy class="Resources"></label>
            <select id="DeletedStrategyType" class="form-control">
              <option value="" selected disabled data-trans-selecttype class="Resources"></option>
            </select>
          </div>
          <div class="col-md-3 mb-3">
            <label for="DeletedGoalStrategy" data-trans-relatedstrategyobjictave class="Resources"></label>
            <select id="DeletedGoalStrategy" class="form-control">
              <option value="" selected disabled data-trans-selecttype class="Resources"></option>
            </select>
          </div>
          <div class="col-md-3 mb-3">
            <label for="DeletedSector" data-trans-sector class="Resources"></label>
            <select id="DeletedSector" class="form-control">
              <option value="" selected disabled data-trans-selectsector class="Resources"></option>
            </select>
          </div>
          <div class="col-md-3 mb-3">
            <label for="DeletedAgency" data-trans-subsector class="Resources"></label>
            <select id="DeletedAgency" class="form-control">
              <option value="" selected disabled data-trans-selectsubsector class="Resources"></option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="deleted-items-listing-placeholder">
              <h3 class="m-0" data-trans-parentitemtype class="Resources"></h3>
            </div>
          </div>
        </div>
      </div>
    `);

    if (typeof changeResources === "function") {
      changeResources();
    }
  }
}, 2000);
