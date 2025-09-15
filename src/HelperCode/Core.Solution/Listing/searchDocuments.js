var emptyData = require("../../../HelperRessources/img/empty-data.png");
// var emptyData = '';

// wait until the container exists
window.checkdocumenthtml = setInterval(function () {
  if ($("#SearchDocuments .col-12").length) {
    clearInterval(window.checkdocumenthtml);

    // fade out particles and loader
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

    // render the main search container
    $("#SearchDocuments .col-12").html(`
    <div class="search-documents-container p-3">
      <div class="row mb-3">
        <div class="col-md-3">
          <label for="itemType" data-trans-itemtype class="Resources"></label>
          <select id="itemType" class="form-control">
            <option value="" disabled selected data-trans-selecttype class="Resources"></option>
            <option value="Initiatives" data-trans-initiatives class="Resources"></option>
            <option value="InitiativesMilestones" data-trans-initiativesmilestones class="Resources"></option>
            <option value="InitiativesDeliverables" data-trans-initiativesdeliverables class="Resources"></option>
            <option value="Projects" data-trans-projects class="Resources"></option>
            <option value="ProjectsMilestones" data-trans-projectsmilestones class="Resources"></option>
            <option value="ProjectsDeliverables" data-trans-projectsdeliverables class="Resources"></option>
            <option value="MainKPIs" data-trans-mainkpis class="Resources"></option>
            <option value="StrategicPartnerships" data-trans-strategicpartnerships class="Resources"></option>
          </select>
        </div>
        <div class="col-md-3">
          <label for="SearchType" data-trans-searchtype class="Resources"></label>
          <select id="SearchType" class="form-control">
            <option value="" disabled selected data-trans-selectsearchtype class="Resources"></option>
            <option value="ItemName" data-trans-itemnameoption class="Resources"></option>
            <option value="FileName" data-trans-filenameoption class="Resources"></option>
          </select>
        </div>
        <div class="col-md-3">
          <label for="searchText" data-trans-searchtext class="Resources"></label>
          <input type="text" id="searchText" class="form-control" data-trans-placeholder-searchtext />
        </div>
        <div class="col-md-3">
          <label for="Sector" data-trans-sector class="Resources"></label>
          <select id="Sector" class="form-control">
            <option data-trans-selectsector class="Resources" value="" disabled selected></option>
          </select>
        </div>
        <div class="col-md-3">
          <label for="SubSector" data-trans-subsector class="Resources"></label>
          <select id="SubSector" class="form-control">
            <option  data-trans-selectsubsector class="Resources" value="" disabled selected></option>
          </select>
        </div>
        <div class="col-md-6 date-range">
          <div class="d-inline-flex w-100">
            <div class="d-flex w-50 flex-column paddingLikeCol">
              <label data-trans-from class="Resources"></label>
              <input type="date" id="startDate" class="form-control mx-1" />
            </div>
            <div class="d-flex w-50 flex-column paddingLikeCol">
              <label data-trans-to class="Resources"></label>
              <input type="date" id="endDate" class="form-control mx-1" />
            </div>
          </div>
        </div>
        <div class="col-md-6 year-range">
          <div class="d-inline-flex w-100">
            <div class="d-flex w-50 flex-column paddingLikeCol">
              <label data-trans-from class="Resources"></label>
              <input type="text" id="startyear" class="form-control mx-1" />
            </div>
            <div class="d-flex w-50 flex-column paddingLikeCol">
              <label data-trans-to class="Resources"></label>
              <input type="text" id="endyear" class="form-control mx-1" />
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-12 text-end">
          <button class="btn" id="btnSearch"><i class="fas fa-search"></i><span data-trans-btnsearch class="Resources"></span></button>
          <button class="btn" id="btnClear"><i class="fas fa-eraser"></i><span data-trans-btnclear class="Resources"></span></button>
        </div>
      </div>
      <div class="results-section">
        <div class="hrsd-table-responsive">
          <table class="table HrsdTable">
            <thead>
              <tr>
                <th data-field="fileName">
                <span class="d-flex align-items-center">
                <span data-trans-filename class="Resources"></span>
                <span class="sort-icon"></span>
                </span>
                </th>
                <th data-field="downloadUrl"><span class="d-flex align-items-center"><span data-trans-download class="Resources"></span></span></th>
                <th data-field="itemID">
                <span class="d-flex align-items-center">
                <span data-trans-itemid class="Resources"></span> <span class="sort-icon"></span>
                </span></th>
                <th data-field="itemTitle">
                <span class="d-flex align-items-center"><span data-trans-itemtitle class="Resources"></span> <span class="sort-icon"></span></span>
                </th>
                <th data-field="itemName">
                <span class="d-flex align-items-center"><span data-trans-itemname class="Resources"></span> <span class="sort-icon"></span></span></th>
                <th data-field="sectorName"><span class="d-flex align-items-center"><span data-trans-sectorname class="Resources"></span> <span class="sort-icon"></span></span></th>
                <th data-field="subSectorName"><span class="d-flex align-items-center"><span data-trans-subsectorname class="Resources"></span> <span class="sort-icon"></span></span></th>
                <th data-field="strategyName"><span class="d-flex align-items-center"><span data-trans-searchstrategy class="Resources"></span> <span class="sort-icon"></span></span></th>
                <th data-field="dueDate"><span class="d-flex align-items-center"><span data-trans-duedate class="Resources"></span> <span class="sort-icon"></span></span></th>
              </tr>
            </thead>
            <tbody id="resultsBody">
              <tr id="noResultsRow">
               <td colspan="10">
               <span class="no-data-td">
                 <span data-trans-nofilterdata class="Resources"></span>
                 <img src="${emptyData}" />
               </span>
             </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="PaginationSection d-flex justify-content-between align-items-center">
          <span><span class="totalOfItems"></span><span data-trans-records class="Resources"></span></span>
          <div class="pagination-buttons-details"></div>
        </div>
      </div>
    </div>
  `);
    changeResources();
    let currentPage = 1;
    const pageSize = 10;
    let filteredRecords = [];
    let currentSortField = "";
    let currentSortOrder = "asc";

    // FUNCTIONS
    function toggleDateYear() {
      const itemType = $("#itemType").val();
      if (itemType === "MainKPIs") {
        $(".date-range").css("display", "none");
        $("#startDate, #endDate").val("");
        $(".year-range").css("display", "flex");
      } else {
        $(".year-range").css("display", "none");
        $("#startyear, #endyear").val("");
        $(".date-range").css("display", "flex");
      }
    }

    function fetchResults(payload) {
      const url = `${APIURL}/search/documentssearch`;
      return $.ajax({
        url: url,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
      });
    }

    function getItemLink(r, itemType) {
      const baseUrl =
        _spPageContextInfo.webAbsoluteUrl + "/sitepages/view.aspx";
      switch (itemType) {
        case "Projects":
          return `${baseUrl}?ListKey=projects&IID=${r.itemID}&PCODE=${r.itemTitle}`;
        case "Initiatives":
          return `${baseUrl}?ListKey=initiatives&IID=${r.itemID}&ICODE=${r.itemTitle}`;
        case "InitiativesDeliverables":
          return `${baseUrl}?ListKey=initiativedeliverables&ICODE=${r.parentCode}&IID=${r.itemID}`;
        case "InitiativesMilestones":
          return `${baseUrl}?ListKey=initiativemilestones&ICODE=${r.parentCode}&IID=${r.itemID}`;
        case "ProjectsDeliverables":
          return `${baseUrl}?ListKey=deliverables&PCODE=${r.parentCode}&IID=${r.itemID}`;
        case "ProjectsMilestones":
          return `${baseUrl}?ListKey=milestones&PCODE=${r.parentCode}&IID=${r.itemID}`;
        case "StrategicPartnerships":
          return `${baseUrl}?ListKey=strategicpartnerships&IID=${r.itemID}&STCODE=${r.itemTitle}`;
        case "MainKPIs":
          return `${baseUrl}?ListKey=mainkpi&IID=${r.itemID}`;
        default:
          return "";
      }
    }

    function getFileIcon(fileLeafRef) {
      if (!fileLeafRef) return '<i class="fas fa-file"></i>';
      var ext = fileLeafRef.split(".").pop().toLowerCase();
      if (["png", "jpg", "jpeg", "gif", "svg"].indexOf(ext) !== -1)
        return '<i class="fas fa-file-image text-primary"></i>';
      if (["pdf"].indexOf(ext) !== -1)
        return '<i class="fas fa-file-pdf text-danger"></i>';
      if (["doc", "docx"].indexOf(ext) !== -1)
        return '<i class="fas fa-file-word text-primary"></i>';
      if (["xls", "xlsx", "csv"].indexOf(ext) !== -1)
        return '<i class="fas fa-file-excel text-success"></i>';
      if (["ppt", "pptx"].indexOf(ext) !== -1)
        return '<i class="fas fa-file-powerpoint text-warning"></i>';
      if (["mp3", "wav", "wma"].indexOf(ext) !== -1)
        return '<i class="fas fa-file-audio text-info"></i>';
      if (["mp4", "avi", "mov", "wmv"].indexOf(ext) !== -1)
        return '<i class="fas fa-file-video text-info"></i>';
      if (["txt", "log"].indexOf(ext) !== -1)
        return '<i class="fas fa-file-alt text-secondary"></i>';
      return '<i class="fas fa-file"></i>';
    }

    function renderPaginationButtons(totalPages) {
      let html = "";
      html += `<button type="button" class="pagebtn prev-page" ${
        currentPage === 1 ? "disabled" : ""
      } data-dir="prev"><i class="fas fa-chevron-left"></i></button>`;
      for (let i = 1; i <= totalPages; i++) {
        html += `<button type="button" class="pagebtn ${
          currentPage === i ? "active" : ""
        }" data-page="${i}">${i}</button>`;
      }
      html += `<button type="button" class="pagebtn next-page" ${
        currentPage === totalPages ? "disabled" : ""
      } data-dir="next"><i class="fas fa-chevron-right"></i></button>`;
      $(".pagination-buttons-details").html(html);
    }

    function sortRecords() {
      if (!currentSortField) return;
      filteredRecords.sort((a, b) => {
        let valA = a[currentSortField] ? a[currentSortField] : "";
        let valB = b[currentSortField] ? b[currentSortField] : "";
        if (currentSortField === "dueDate") {
          valA = valA ? new Date(valA).getTime() : 0;
          valB = valB ? new Date(valB).getTime() : 0;
        }
        if (!isNaN(valA) && !isNaN(valB)) {
          valA = Number(valA);
          valB = Number(valB);
        }
        if (typeof valA === "string" && typeof valB === "string") {
          const cmp = valA.localeCompare(valB);
          return currentSortOrder === "asc" ? cmp : -cmp;
        } else {
          return currentSortOrder === "asc" ? valA - valB : valB - valA;
        }
      });
    }

    function renderResults() {
      const tbody = $("#resultsBody");
      tbody.empty();
      const totalPages = Math.ceil(filteredRecords.length / pageSize);

      if (filteredRecords.length === 0) {
        tbody.html(
          '<tr><td colspan="10"><span class="no-data-td"><span data-trans-nofilterdata class="Resources"></span><img src="' +
            emptyData +
            '" /></span></td></tr>'
        );
      } else {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        const pageData = filteredRecords.slice(start, end);

        pageData.forEach((r) => {
          const itemLink = getItemLink(r, $("#itemType").val());
          tbody.append(`
            <tr>
              <td>${getFileIcon(r.fileLeafRef)} ${
            r.fileName ? r.fileName : ""
          }</td>
              <td>
                <span class="download-icon">
                  ${
                    r.downloadUrl
                      ? `<a download href="${r.downloadUrl}" target="_blank"><i class="fas fa-download"></i></a>`
                      : ""
                  }
                </span>
              </td>
              <td>${r.itemID ? r.itemID : ""}</td>
              <td>${r.itemTitle ? r.itemTitle : ""}</td>
              <td>${
                r.itemName
                  ? itemLink
                    ? `<a href="${itemLink}" class="SearchedItemLink" target="_blank">${r.itemName} <i class="fas fa-link"></i></a>`
                    : r.itemName
                  : ""
              }</td>
              <td>${r.sectorName ? r.sectorName : ""}</td>
              <td>${r.subSectorName ? r.subSectorName : ""}</td>
              <td>${r.strategyName ? r.strategyName : ""}</td>
              <td>${
                r.dueDate ? new Date(r.dueDate).toLocaleDateString() : ""
              }</td>
            </tr>
          `);
        });
      }

      $(".totalOfItems").text(filteredRecords.length);
      renderPaginationButtons(totalPages);
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
              '<option data-trans-selectsector class="Resources" value="" disabled selected></option>'
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
              '<option value="" disabled selected>Select SubSector</option>'
            );
          data.d.results.forEach((item) => {
            const text = lang == null || lang == "ar" ? item.Name : item.NameEn;
            $sub.append(`<option value="${item.Title}">${text}</option>`);
          });
        },
      });
    }
    function formatDateForAPI(dateStr) {
      if (!dateStr) return "";
      const d = new Date(dateStr);
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const yyyy = d.getFullYear();
      return `${mm}/${dd}/${yyyy}`;
    }
    // EVENT BINDINGS
    $(document).on("change", "#itemType", toggleDateYear);

    $(document).on("click", "#btnSearch", function (e) {
      e.preventDefault();

      let isValid = true;
      let firstInvalid = null;

      if (!$("#itemType").val()) {
        $("#itemType").addClass("is-invalid");
        if (!firstInvalid) firstInvalid = $("#itemType");
        isValid = false;
      } else {
        $("#itemType").removeClass("is-invalid");
      }

      if (!$("#SearchType").val()) {
        $("#SearchType").addClass("is-invalid");
        if (!firstInvalid) firstInvalid = $("#SearchType");
        isValid = false;
      } else {
        $("#SearchType").removeClass("is-invalid");
      }

      if (!$("#searchText").val()) {
        $("#searchText").addClass("is-invalid");
        if (!firstInvalid) firstInvalid = $("#searchText");
        isValid = false;
      } else {
        $("#searchText").removeClass("is-invalid");
      }

      if (!isValid) {
        $("html, body").animate(
          { scrollTop: firstInvalid.offset().top - 100 },
          500
        );
        return;
      }

      const itemType = $("#itemType").val();
      const payload = {
        itemType: itemType,
        searchType: $("#SearchType").val(),
        searchText: $("#searchText").val(),
        sector: $("#Sector").val() || "",
        subSector: $("#SubSector").val() || "",
        from:
          itemType === "MainKPIs"
            ? $("#startyear").val() || ""
            : formatDateForAPI($("#startDate").val()),
        to:
          itemType === "MainKPIs"
            ? $("#endyear").val() || ""
            : formatDateForAPI($("#endDate").val()),
        sortingFieldName: "",
        isDesc: true,
        pageSize: 0,
        pageIndex: 0,
      };

      fetchResults(payload)
        .done(function (data) {
          filteredRecords =
            data.isSuccess && Array.isArray(data.result) ? data.result : [];
          currentPage = 1;
          renderResults();
        })
        .fail(function () {
          filteredRecords = [];
          currentPage = 1;
          renderResults();
        });
    });

    $(document).on("click", ".pagebtn", function () {
      if ($(this).is("[disabled]")) return;
      if ($(this).data("dir") === "prev") currentPage--;
      else if ($(this).data("dir") === "next") currentPage++;
      else currentPage = parseInt($(this).data("page"));
      renderResults();
    });

    $(document).on("click", ".HrsdTable th", function () {
      const field = $(this).data("field");
      if (!field) return;
      if (currentSortField === field)
        currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
      else {
        currentSortField = field;
        currentSortOrder = "asc";
      }
      $(".HrsdTable th .sort-icon").html("");
      const icon =
        currentSortOrder === "asc"
          ? '<i class="fas fa-sort-up"></i>'
          : '<i class="fas fa-sort-down"></i>';
      $(this).find(".sort-icon").html(icon);
      sortRecords();
      currentPage = 1;
      renderResults();
    });

    // INITIAL LOAD
    loadSectors();
    filteredRecords = [];
    renderResults();
    toggleDateYear();
    changeResources();

    // bind sector change AFTER it exists
    $(document).on("change", "#Sector", function () {
      const selectedSector = $(this).val();
      loadSubSectors(selectedSector);
    });
  }
}, 2000);
