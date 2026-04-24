window.checkDeletedItemsListingHtml = setInterval(function () {
  if ($("#DeletedItemsListing .col-12").length) {
    clearInterval(window.checkDeletedItemsListingHtml);

    $(
      "div#particles-foreground, div#particles-background, .vertical-centered-box",
    ).animate(
      { opacity: 0 },
      {
        duration: 333,
        complete: function () {
          $(
            "div#particles-foreground, div#particles-background, .vertical-centered-box",
          ).remove();
        },
      },
    );

    $("#DeletedItemsListing .col-12").html(`
      <div class="deleted-items-listing-container p-3">
        <div class="deleted-items-tabs-wrapper mb-3">
          <button type="button" class="deleted-item-tab-btn active" data-item-type="objectives">
            <i class="fas fa-bullseye"></i>
            <span data-trans-sos class="Resources"></span>
          </button>
          <button type="button" class="deleted-item-tab-btn" data-item-type="mainkpis">
            <i class="fas fa-chart-line"></i>
            <span data-trans-mainkpi class="Resources"></span>
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

        <div class="deleted-items-filters-shell mb-3">
          <div class="row deleted-items-filters-row">
            <div class="col-xl-3 col-md-6 mb-3">
              <div class="filter-field-card">
                <label for="strategyType" class="filter-label">
                  <i class="fas fa-layer-group"></i>
                  <span data-trans-strategytype class="Resources"></span>
                </label>
                <select id="strategyType" class="form-control">
                  <option value="" selected disabled data-trans-chooseData class="Resources"></option>
                </select>
              </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-3">
              <div class="filter-field-card">
                <label for="Sector" class="filter-label">
                  <i class="fas fa-th-large"></i>
                  <span data-trans-sector class="Resources"></span>
                </label>
                <select id="Sector" class="form-control">
                  <option value="" selected disabled data-trans-chooseData class="Resources"></option>
                </select>
              </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-3">
              <div class="filter-field-card">
                <label for="SubSector" class="filter-label">
                  <i class="fas fa-sitemap"></i>
                  <span data-trans-subsector class="Resources"></span>
                </label>
                <select id="SubSector" class="form-control">
                  <option value="" selected disabled data-trans-chooseData class="Resources"></option>
                </select>
              </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-3">
              <div class="filter-field-card">
                <label for="RelatedStrategy" class="filter-label">
                  <i class="fas fa-link"></i>
                  <span data-trans-relatedstrategy class="Resources"></span>
                </label>
                <select id="RelatedStrategy" class="form-control">
                  <option value="" selected disabled data-trans-chooseData class="Resources"></option>
                </select>
              </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-3">
              <div class="filter-field-card">
                <label for="RelatedObjective" class="filter-label">
                  <i class="fas fa-bullseye"></i>
                  <span data-trans-relatedobjective class="Resources"></span>
                </label>
                <select id="RelatedObjective" class="form-control">
                  <option value="" selected disabled data-trans-chooseData class="Resources"></option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="deleted-items-listing-placeholder">
              <h1 id="selectedDeletedItemType" class="m-0">
                <span data-trans-sos class="Resources"></span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    `);

    function loadStrategyTypes() {
      var $strategyType = $("#strategyType");
      $strategyType
        .empty()
        .append(
          '<option value="" selected disabled data-trans-chooseData class="Resources"></option>',
        )
        .append(
          '<option value="vision" data-trans-vision class="Resources"></option>',
        )
        .append(
          '<option value="ministry" data-trans-ministry class="Resources"></option>',
        )
        .append(
          '<option value="lms" data-trans-lms class="Resources"></option>',
        )
        .append(
          '<option value="sod" data-trans-sod class="Resources"></option>',
        );
    }

    function loadSectors() {
      const lang = localStorage.getItem("lng");
      $.ajax({
        url:
          _spPageContextInfo.webAbsoluteUrl +
          "/_api/web/lists/getbytitle('Internal Entities')/items?$filter=EntityType eq 'Sector' and DeletionStatus ne 'Deleted'&$orderby=Created",
        method: "GET",
        headers: { Accept: "application/json; odata=verbose" },
        success: function (data) {
          const $sector = $("#Sector");
          $sector
            .empty()
            .append(
              '<option value="" selected disabled data-trans-chooseData class="Resources"></option>',
            );
          data.d.results.forEach((item) => {
            const text = lang == null || lang == "ar" ? item.Name : item.NameEn;
            $sector.append(`<option value="${item.Title}">${text}</option>`);
          });
        },
      });
    }

    function loadSubSectors(sectorTitle) {
      if (!sectorTitle) return;
      const lang = localStorage.getItem("lng");
      $.ajax({
        url:
          _spPageContextInfo.webAbsoluteUrl +
          "/_api/web/lists/getbytitle('Internal Entities')/items?$filter=EntityType eq 'Department' and ParentEntity eq '" +
          sectorTitle +
          "' and DeletionStatus ne 'Deleted'&$orderby=Created",
        method: "GET",
        headers: { Accept: "application/json; odata=verbose" },
        success: function (data) {
          const $sub = $("#SubSector");
          $sub
            .empty()
            .append(
              '<option value="" selected disabled data-trans-chooseData class="Resources"></option>',
            );
          data.d.results.forEach((item) => {
            const text = lang == null || lang == "ar" ? item.Name : item.NameEn;
            $sub.append(`<option value="${item.Title}">${text}</option>`);
          });
        },
      });
    }

    function updateSelectedTypeTitle(button) {
      const titleHtml = $(button).find("span").first().prop("outerHTML") || "";
      $("#selectedDeletedItemType").html(titleHtml);
      if (typeof changeResources === "function") {
        changeResources();
      }
    }

    $(document).on("click", ".deleted-item-tab-btn", function () {
      $(".deleted-item-tab-btn").removeClass("active");
      $(this).addClass("active");
      updateSelectedTypeTitle(this);
    });

    $(document).on("change", "#Sector", function () {
      const selectedSector = $(this).val();
      loadSubSectors(selectedSector);
    });

    loadStrategyTypes();
    loadSectors();
    updateSelectedTypeTitle($(".deleted-item-tab-btn.active"));

    if (typeof changeResources === "function") {
      changeResources();
    }
  }
}, 2000);
