var deletedItemsEmptyDataImage = require("../../../HelperRessources/img/empty-data.png");

var deletedItemsPageSize = 10;
var deletedItemsPaginationByKey = {};

// Listing columns loaded from Style Library JSON (inlisting=true fields only)
var deletedItemsListingColumnsByTab = {
  objectives: [],
  mainkpis: [],
  initiatives: [],
  projects: [],
};

// Related child tables shown under Initiatives or Projects tab
var deletedItemsInitiativeRelatedColumns = {
  initiativemilestones: [],
  initiativedeliverables: [],
  initiativerisks: [],
  initiativeissues: [],
  benefits: [],
};

var deletedItemsInitiativeRelatedConfigByKey = {
  initiativemilestones: {
    listTitle: "InitiativeMilestones",
    listingJsonPath: "initiativemilestones/initiativemilestones_Listing.js",
    viewJsonPath: "initiativemilestones/initiativemilestones_View.js",
    tabLabelTrans: "inptitle10",
    tabIcon: "fa-flag-checkered",
    emptyArabic: "لا توجد معالم محذوفة لهذه المبادرة.",
    emptyEnglish: "No deleted milestones for this initiative.",
  },
  initiativedeliverables: {
    listTitle: "InitiativeDeliverables",
    listingJsonPath: "initiativedeliverables/initiativedeliverables_Listing.js",
    viewJsonPath: "initiativedeliverables/initiativedeliverables_View.js",
    tabLabelTrans: "delinioutput",
    tabIcon: "fa-box-open",
    emptyArabic: "لا توجد مخرجات محذوفة لهذه المبادرة.",
    emptyEnglish: "No deleted deliverables for this initiative.",
  },
  initiativerisks: {
    listTitle: "Risks",
    listingJsonPath: "initiativerisks/initiativerisks_Listing.js",
    viewJsonPath: "initiativerisks/initiativerisks_View.js",
    tabLabelTrans: "ptitle7",
    tabIcon: "fa-exclamation-triangle",
    emptyArabic: "لا توجد مخاطر محذوفة لهذه المبادرة.",
    emptyEnglish: "No deleted risks for this initiative.",
  },
  initiativeissues: {
    listTitle: "Issues",
    listingJsonPath: "initiativeissues/initiativeissues_Listing.js",
    viewJsonPath: "initiativeissues/initiativeissues_View.js",
    tabLabelTrans: "inptitle12",
    tabIcon: "fa-calendar-times",
    emptyArabic: "لا توجد تحديات محذوفة لهذه المبادرة.",
    emptyEnglish: "No deleted issues for this initiative.",
  },
  benefits: {
    listTitle: "Benefits",
    listingJsonPath: "benefits/benefits_Listing.js",
    viewJsonPath: "benefits/benefits_View.js",
    tabLabelTrans: "inptitle11",
    tabIcon: "fa-hand-holding-heart",
    emptyArabic: "لا توجد منافع محذوفة لهذه المبادرة.",
    emptyEnglish: "No deleted benefits for this initiative.",
  },
  milestones: {
    listTitle: "Milestones",
    listingJsonPath: "milestones/milestones_Listing.js",
    viewJsonPath: "milestones/milestones_View.js",
    tabLabelTrans: "milestones",
    tabIcon: "fa-flag-checkered",
    emptyArabic: "لا توجد معالم محذوفة لهذا المشروع.",
    emptyEnglish: "No deleted milestones for this project.",
    parentTab: "projects",
    codeFieldName: "ProjectCode",
  },
  deliverables: {
    listTitle: "Deliverables",
    listingJsonPath: "deliverables/deliverables_Listing.js",
    viewJsonPath: "deliverables/deliverables_View.js",
    tabLabelTrans: "deliverables",
    tabIcon: "fa-box-open",
    emptyArabic: "لا توجد مخرجات محذوفة لهذا المشروع.",
    emptyEnglish: "No deleted deliverables for this project.",
    parentTab: "projects",
    codeFieldName: "ProjectCode",
  },
  risks: {
    listTitle: "Risks",
    listingJsonPath: "risks/risks_Listing.js",
    viewJsonPath: "risks/risks_View.js",
    tabLabelTrans: "risks",
    tabIcon: "fa-exclamation-triangle",
    emptyArabic: "لا توجد مخاطر محذوفة لهذا المشروع.",
    emptyEnglish: "No deleted risks for this project.",
    parentTab: "projects",
    codeFieldName: "ProjectCode",
  },
  issues: {
    listTitle: "Issues",
    listingJsonPath: "issues/issues_Listing.js",
    viewJsonPath: "issues/issues_View.js",
    tabLabelTrans: "issues",
    tabIcon: "fa-calendar-times",
    emptyArabic: "لا توجد تحديات محذوفة لهذا المشروع.",
    emptyEnglish: "No deleted issues for this project.",
    parentTab: "projects",
    codeFieldName: "ProjectCode",
  },
};

var deletedItemsSelectedInitiativeCode = "";
var deletedItemsSelectedInitiativeRelatedKey = "initiativemilestones";
var deletedItemsSelectedParentTab = "initiatives";
// RelatedInitiative Title codes cached for Projects tab filter
var deletedItemsCachedRelatedInitiativeTitles = [];

// Lookup display cache to avoid repeated SharePoint calls
var deletedItemsLookupDisplayCache = {};
var deletedItemsViewFormCacheByUrl = {};
var deletedItemsDetailsPopupRequestId = 0;

function deletedItemsLogError(message, detail) {
  if (detail !== undefined) {
    console.error("[DeletedItemsListing] " + message, detail);
    return;
  }
  console.error("[DeletedItemsListing] " + message);
}

var deletedItemsViewSkipFieldTypes = {
  break: true,
  hidden: true,
  button: true,
  mastertable: true,
  mastertableview: true,
  file: true,
  attachment: true,
  attachments: true,
  multiselectforfiles: true,
};

function deletedItemsGetInitiativeRelatedConfig(relatedKey) {
  var baseUrl =
    _spPageContextInfo.webAbsoluteUrl + "/Style%20Library/spm/JSON/";
  var configEntry =
    deletedItemsInitiativeRelatedConfigByKey[relatedKey] ||
    deletedItemsInitiativeRelatedConfigByKey.initiativemilestones;
  return {
    relatedKey: relatedKey || "initiativemilestones",
    listTitle: configEntry.listTitle,
    jsonUrl: baseUrl + configEntry.listingJsonPath,
    viewJsonUrl:
      baseUrl + (configEntry.viewJsonPath || configEntry.listingJsonPath),
    tabLabelTrans: configEntry.tabLabelTrans,
    tabIcon: configEntry.tabIcon,
    emptyArabic: configEntry.emptyArabic,
    emptyEnglish: configEntry.emptyEnglish,
    parentTab: configEntry.parentTab || "initiatives",
    codeFieldName: configEntry.codeFieldName || "InitiativeCode",
  };
}

function deletedItemsGetDefaultRelatedKeyForParentTab(parentTabType) {
  if (parentTabType === "projects") {
    return "milestones";
  }
  return "initiativemilestones";
}

function deletedItemsRefreshRelatedTabsForParent(parentTabType) {
  $(".deleted-items-related-nav-link").each(function () {
    var tabParent = $(this).data("parent-tab") || "initiatives";
    var wrapperItem = $(this).closest(".nav-item");
    if (tabParent === parentTabType) {
      wrapperItem.removeClass("d-none");
    } else {
      wrapperItem.addClass("d-none");
      $(this).removeClass("active").attr("aria-selected", "false");
    }
  });
}

function deletedItemsEscapeHtmlAttribute(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function deletedItemsLoadListingColumnsFromJson(jsonUrl) {
  return new Promise(function (resolvePromise) {
    $.getScript(jsonUrl)
      .done(function () {
        var normalizedFields = [];
        if (typeof Listing_Info !== "undefined" && Array.isArray(Listing_Info)) {
          for (var index = 0; index < Listing_Info.length; index++) {
            var oneField = Listing_Info[index];
            if (oneField && oneField.inlisting === true && oneField.InternalName) {
              normalizedFields.push(deletedItemsNormalizeListingField(oneField));
            }
          }
        }
        resolvePromise(normalizedFields);
      })
      .fail(function () {
        resolvePromise([]);
      });
  });
}

function deletedItemsLoadInitiativeRelatedColumns(relatedKey) {
  var relatedConfig = deletedItemsGetInitiativeRelatedConfig(relatedKey);
  return deletedItemsLoadListingColumnsFromJson(relatedConfig.jsonUrl).then(
    function (normalizedFields) {
      deletedItemsInitiativeRelatedColumns[relatedKey] = normalizedFields;
      return normalizedFields;
    },
  );
}

// Child related lists filter by parent code only, not parent table filters
function deletedItemsBuildFilterForInitiativeRelated(codeFieldName, parentCodeValue) {
  var filterPieces = ["DeletionStatus eq 'Deleted'"];
  if (parentCodeValue) {
    filterPieces.push(
      codeFieldName +
        " eq '" +
        deletedItemsEscapeQuotesForFilter(parentCodeValue) +
        "'",
    );
  }
  return filterPieces.join(" and ");
}

function deletedItemsSyncInitiativeRelatedPanelAfterParentReload(
  sharePointRows,
  initiativeCode,
) {
  if (!initiativeCode) {
    return;
  }
  var initiativeStillInParentTable = false;
  if (sharePointRows && sharePointRows.length) {
    for (var rowIndex = 0; rowIndex < sharePointRows.length; rowIndex++) {
      if (sharePointRows[rowIndex].Title === initiativeCode) {
        initiativeStillInParentTable = true;
        break;
      }
    }
  }
  if (!initiativeStillInParentTable) {
    deletedItemsHideInitiativeRelatedPanel();
    return;
  }
  deletedItemsSelectedInitiativeCode = initiativeCode;
  deletedItemsRefreshRelatedTabsForParent(deletedItemsSelectedParentTab);
  deletedItemsUpdateInitiativeRelatedHeader(initiativeCode);
  $("#deletedItemsInitiativeRelatedSection")
    .removeClass("d-none")
    .addClass("is-visible");
  $("#deletedItemsTableHost .deleted-items-initiative-row").removeClass(
    "deleted-items-row-selected",
  );
  $("#deletedItemsTableHost .deleted-items-initiative-row").each(function () {
    if ($(this).data("initiative-code") === initiativeCode) {
      $(this).addClass("deleted-items-row-selected");
    }
  });
}

function deletedItemsUpdateInitiativeRelatedHeader(initiativeCode) {
  var currentLang = localStorage.getItem("lng");
  var labelArabic = "عناصر محذوفة مرتبطة";
  var labelEnglish = "Related deleted items";
  var contextLabel =
    currentLang == null || currentLang == "ar" ? labelArabic : labelEnglish;
  $("#deletedItemsInitiativeRelatedLabel").text(contextLabel);
  $("#deletedItemsInitiativeRelatedCode").text(initiativeCode || "");
}

function deletedItemsBuildSelectForRelatedList(columnsForTable) {
  var selectedConfig = deletedItemsGetInitiativeRelatedConfig(
    deletedItemsSelectedInitiativeRelatedKey,
  );
  var codeFieldName = selectedConfig.codeFieldName || "InitiativeCode";
  var selectAndExpand = deletedItemsBuildSelectAndExpandForObjectives(columnsForTable);
  var selectParts = selectAndExpand.select
    ? selectAndExpand.select.split(",")
    : [];
  if (selectParts.indexOf(codeFieldName) === -1) {
    selectParts.push(codeFieldName);
  }
  return {
    select: selectParts.join(","),
    expand: selectAndExpand.expand,
  };
}

function deletedItemsHideInitiativeRelatedPanel() {
  deletedItemsSelectedInitiativeCode = "";
  $("#deletedItemsInitiativeRelatedSection")
    .addClass("d-none")
    .removeClass("is-visible");
  $("#deletedItemsTableHost .deleted-items-initiative-row").removeClass(
    "deleted-items-row-selected",
  );
}

function deletedItemsShowInitiativeRelatedPanel(initiativeCode) {
  if (!initiativeCode) {
    deletedItemsHideInitiativeRelatedPanel();
    return;
  }
  deletedItemsSelectedInitiativeCode = initiativeCode;
  deletedItemsRefreshRelatedTabsForParent(deletedItemsSelectedParentTab);
  deletedItemsUpdateInitiativeRelatedHeader(initiativeCode);
  $("#deletedItemsInitiativeRelatedSection")
    .removeClass("d-none")
    .addClass("is-visible");
  $(".deleted-items-related-nav-link").removeClass("active");
  $(
    '.deleted-items-related-nav-link[data-related-key="' +
      deletedItemsSelectedInitiativeRelatedKey +
      '"]',
  )
    .addClass("active")
    .attr("aria-selected", "true");
  $(".deleted-items-related-nav-link")
    .not('[data-related-key="' + deletedItemsSelectedInitiativeRelatedKey + '"]')
    .attr("aria-selected", "false");
  deletedItemsLoadInitiativeRelatedTable(deletedItemsSelectedInitiativeRelatedKey);
}

function deletedItemsLoadInitiativeRelatedTable(relatedKey) {
  if (!deletedItemsSelectedInitiativeCode) {
    return;
  }
  var relatedConfig = deletedItemsGetInitiativeRelatedConfig(relatedKey);
  var relatedHost = $("#deletedItemsInitiativeRelatedHost");
  var currentLang = localStorage.getItem("lng");
  var loadingArabic = "جاري التحميل…";
  var loadingEnglish = "Loading…";
  var loadingText =
    currentLang == null || currentLang == "ar" ? loadingArabic : loadingEnglish;
  relatedHost.html(
    '<p class="text-muted deleted-items-table-hint mb-0">' + loadingText + "</p>",
  );

  function fetchAndRender(columnsForTable) {
    var selectAndExpand = deletedItemsBuildSelectForRelatedList(columnsForTable);
    var odataFilter = deletedItemsBuildFilterForInitiativeRelated(
      relatedConfig.codeFieldName,
      deletedItemsSelectedInitiativeCode,
    );
    var requestUrl =
      _spPageContextInfo.webAbsoluteUrl +
      "/_api/web/lists/getbytitle('" +
      relatedConfig.listTitle.replace(/'/g, "''") +
      "')/items?$select=" +
      encodeURIComponent(selectAndExpand.select) +
      "&$filter=" +
      encodeURIComponent(odataFilter) +
      "&$orderby=Title&$top=5000";
    if (selectAndExpand.expand) {
      requestUrl += "&$expand=" + encodeURIComponent(selectAndExpand.expand);
    }

    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (responseData) {
        var sharePointRows =
          (responseData && responseData.d && responseData.d.results) || [];
        var emptyMessage =
          currentLang == null || currentLang == "ar"
            ? relatedConfig.emptyArabic
            : relatedConfig.emptyEnglish;
        deletedItemsResolveLookupColumnsOnRows(
          sharePointRows,
          columnsForTable,
        ).then(function (rowsAfterLookups) {
          deletedItemsRegisterPaginatedTable(
            "deleted-items-related-" + relatedKey,
            relatedHost,
            rowsAfterLookups,
            columnsForTable,
            emptyMessage,
            { detailsContextKey: relatedKey },
            true,
          );
        });
      },
      error: function () {
        var errorArabic = "تعذر تحميل البيانات.";
        var errorEnglish = "Failed to load data.";
        var errorText =
          currentLang == null || currentLang == "ar" ? errorArabic : errorEnglish;
        relatedHost.html(
          '<p class="text-danger deleted-items-table-hint mb-0">' +
            errorText +
            "</p>",
        );
      },
    });
  }

  if (
    !deletedItemsInitiativeRelatedColumns[relatedKey] ||
    !deletedItemsInitiativeRelatedColumns[relatedKey].length
  ) {
    deletedItemsLoadInitiativeRelatedColumns(relatedKey).then(function (cols) {
      fetchAndRender(cols);
    });
    return;
  }
  fetchAndRender(deletedItemsInitiativeRelatedColumns[relatedKey]);
}

function deletedItemsNormalizeListingField(listingField) {
  return {
    sharePointColumnInternalName: listingField.InternalName,
    headerTextArabic: listingField.DisplayName,
    headerTextEnglish: listingField.DisplayNameEn,
    type: listingField.type || "text",
    needTrans: listingField.needTrans === true,
    localStorageVariable: listingField.localStorageVariable || "",
    source: listingField.source || "",
    Dispfieldkey: listingField.Dispfieldkey || "",
    DispfieldkeyEn: listingField.DispfieldkeyEn || "",
    valfieldkey: listingField.valfieldkey || "",
    dropdownChoices:
      listingField.options && listingField.options.choices
        ? listingField.options.choices
        : [],
  };
}

function deletedItemsGetTabConfig(tabType) {
  if (tabType === "mainkpis") {
    return {
      tabType: "mainkpis",
      listTitle: "MainKPI",
      jsonUrl:
        _spPageContextInfo.webAbsoluteUrl +
        "/Style%20Library/spm/JSON/mainkpi/mainkpi_Listing.js",
      viewJsonUrl:
        _spPageContextInfo.webAbsoluteUrl +
        "/Style%20Library/spm/JSON/mainkpi/mainkpi_View.js",
      emptyArabic: "لا توجد مؤشرات محذوفة ضمن الفلاتر الحالية.",
      emptyEnglish: "No deleted main KPIs match the current filters.",
    };
  }
  if (tabType === "initiatives") {
    return {
      tabType: "initiatives",
      listTitle: "Initiatives",
      jsonUrl:
        _spPageContextInfo.webAbsoluteUrl +
        "/Style%20Library/spm/JSON/initiatives/initiatives_Listing.js",
      viewJsonUrl:
        _spPageContextInfo.webAbsoluteUrl +
        "/Style%20Library/spm/JSON/initiatives/initiatives_View.js",
      emptyArabic: "لا توجد مبادرات محذوفة ضمن الفلاتر الحالية.",
      emptyEnglish: "No deleted initiatives match the current filters.",
    };
  }
  if (tabType === "projects") {
    return {
      tabType: "projects",
      listTitle: "Projects",
      jsonUrl:
        _spPageContextInfo.webAbsoluteUrl +
        "/Style%20Library/spm/JSON/projects/projects_Listing.js",
      viewJsonUrl:
        _spPageContextInfo.webAbsoluteUrl +
        "/Style%20Library/spm/JSON/projects/projects_View.js",
      emptyArabic: "لا توجد مشاريع محذوفة ضمن الفلاتر الحالية.",
      emptyEnglish: "No deleted projects match the current filters.",
    };
  }
  return {
    tabType: "objectives",
    listTitle: "SOs",
    jsonUrl:
      _spPageContextInfo.webAbsoluteUrl +
      "/Style%20Library/spm/JSON/sos/sos_Listing.js",
    viewJsonUrl:
      _spPageContextInfo.webAbsoluteUrl +
      "/Style%20Library/spm/JSON/sos/sos_View.js",
    emptyArabic: "لا توجد أهداف محذوفة ضمن الفلاتر الحالية.",
    emptyEnglish: "No deleted objectives match the current filters.",
  };
}

function deletedItemsLoadColumnsFromStyleLibraryByTab(tabType) {
  var tabConfig = deletedItemsGetTabConfig(tabType);
  return deletedItemsLoadListingColumnsFromJson(tabConfig.jsonUrl).then(
    function (normalizedFields) {
      deletedItemsListingColumnsByTab[tabConfig.tabType] = normalizedFields;
      return normalizedFields;
    },
  );
}

function deletedItemsGetEmptyLabelText() {
  if (typeof No_Data !== "undefined") {
    return No_Data;
  }
  if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
    return "لا يوجد";
  }
  return "No Data";
}

// Escape single quotes for OData filter strings
function deletedItemsEscapeQuotesForFilter(value) {
  return String(value == null ? "" : value).replace(/'/g, "''");
}

// Build OData or-filter for multiple Title values
function deletedItemsBuildODataTitleOrFilter(titleCodes) {
  if (!titleCodes || !titleCodes.length) {
    return "";
  }
  var titleFilterParts = [];
  for (var titleIndex = 0; titleIndex < titleCodes.length; titleIndex++) {
    titleFilterParts.push(
      "Title eq '" +
        deletedItemsEscapeQuotesForFilter(titleCodes[titleIndex]) +
        "'",
    );
  }
  return "(" + titleFilterParts.join(" or ") + ")";
}

function deletedItemsParseRelatedInitiativeTitle(rawValue) {
  if (rawValue == null || rawValue === "") {
    return "";
  }
  if (typeof rawValue === "object") {
    if (rawValue.Title != null && rawValue.Title !== "") {
      return String(rawValue.Title);
    }
    if (rawValue.LookupValue != null && rawValue.LookupValue !== "") {
      return String(rawValue.LookupValue);
    }
  }
  return String(rawValue);
}

// Collect RelatedInitiative titles from deleted Projects
function deletedItemsFetchRelatedInitiativeTitlesFromDeletedProjects() {
  return new Promise(function (resolvePromise) {
    var projectFilter = "DeletionStatus eq 'Deleted'";
    var projectsRequestUrl =
      _spPageContextInfo.webAbsoluteUrl +
      "/_api/web/lists/getbytitle('Projects')/items?$select=" +
      encodeURIComponent("RelatedInitiative") +
      "&$filter=" +
      encodeURIComponent(projectFilter) +
      "&$top=5000";

    $.ajax({
      url: projectsRequestUrl,
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (projectsResponse) {
        var projectRows =
          (projectsResponse &&
            projectsResponse.d &&
            projectsResponse.d.results) ||
          [];
        var uniqueInitiativeTitles = {};
        for (
          var projectIndex = 0;
          projectIndex < projectRows.length;
          projectIndex++
        ) {
          var relatedInitiativeTitle = deletedItemsParseRelatedInitiativeTitle(
            projectRows[projectIndex].RelatedInitiative,
          );
          if (relatedInitiativeTitle) {
            uniqueInitiativeTitles[relatedInitiativeTitle] = true;
          }
        }
        var initiativeTitleList = [];
        for (var initiativeTitle in uniqueInitiativeTitles) {
          if (
            Object.prototype.hasOwnProperty.call(
              uniqueInitiativeTitles,
              initiativeTitle,
            )
          ) {
            initiativeTitleList.push(initiativeTitle);
          }
        }
        initiativeTitleList.sort();
        deletedItemsCachedRelatedInitiativeTitles = initiativeTitleList;
        resolvePromise(initiativeTitleList);
      },
      error: function () {
        deletedItemsCachedRelatedInitiativeTitles = [];
        resolvePromise([]);
      },
    });
  });
}

function deletedItemsMapInitiativeRowsToOptions(initiativeRows) {
  var initiativeOptions = [];
  for (
    var initiativeIndex = 0;
    initiativeIndex < initiativeRows.length;
    initiativeIndex++
  ) {
    var initiativeRow = initiativeRows[initiativeIndex];
    if (!initiativeRow || !initiativeRow.Title) {
      continue;
    }
    initiativeOptions.push({
      title: initiativeRow.Title,
      name:
        initiativeRow.Name != null && initiativeRow.Name !== ""
          ? initiativeRow.Name
          : initiativeRow.Title,
    });
  }
  initiativeOptions.sort(function (optionA, optionB) {
    return String(optionA.name).localeCompare(String(optionB.name));
  });
  return initiativeOptions;
}

// Load Initiatives matching collected titles and optional strategy type
function deletedItemsFetchInitiativesForRelatedFilter(
  initiativeTitleCodes,
  selectedStrategyTypeValue,
) {
  if (!initiativeTitleCodes || !initiativeTitleCodes.length) {
    return Promise.resolve([]);
  }

  var initiativesFilter =
    deletedItemsBuildODataTitleOrFilter(initiativeTitleCodes);
  if (selectedStrategyTypeValue) {
    initiativesFilter +=
      " and Types eq '" +
      deletedItemsEscapeQuotesForFilter(selectedStrategyTypeValue) +
      "'";
  }

  var initiativesRequestUrl =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('Initiatives')/items?$select=" +
    encodeURIComponent("Title,Name") +
    "&$filter=" +
    encodeURIComponent(initiativesFilter) +
    "&$orderby=" +
    encodeURIComponent("Title") +
    "&$top=5000";

  return new Promise(function (resolvePromise) {
    $.ajax({
      url: initiativesRequestUrl,
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (initiativesResponse) {
        var initiativeRows =
          (initiativesResponse &&
            initiativesResponse.d &&
            initiativesResponse.d.results) ||
          [];
        resolvePromise(deletedItemsMapInitiativeRowsToOptions(initiativeRows));
      },
      error: function () {
        deletedItemsFetchInitiativesByTitlesOneByOne(
          initiativeTitleCodes,
          selectedStrategyTypeValue,
        ).then(resolvePromise);
      },
    });
  });
}

// Fallback when SharePoint rejects OData or-filter
function deletedItemsFetchInitiativesByTitlesOneByOne(
  initiativeTitleCodes,
  selectedStrategyTypeValue,
) {
  var pendingRequests = initiativeTitleCodes.length;
  if (!pendingRequests) {
    return Promise.resolve([]);
  }

  return new Promise(function (resolvePromise) {
    var loadedByTitle = {};

    function onOneRequestDone() {
      pendingRequests -= 1;
      if (pendingRequests <= 0) {
        var initiativeOptions = [];
        var sortedTitles = Object.keys(loadedByTitle).sort();
        for (var titleIndex = 0; titleIndex < sortedTitles.length; titleIndex++) {
          var titleCode = sortedTitles[titleIndex];
          initiativeOptions.push({
            title: titleCode,
            name: loadedByTitle[titleCode],
          });
        }
        initiativeOptions.sort(function (optionA, optionB) {
          return String(optionA.name).localeCompare(String(optionB.name));
        });
        resolvePromise(initiativeOptions);
      }
    }

    for (
      var codeIndex = 0;
      codeIndex < initiativeTitleCodes.length;
      codeIndex++
    ) {
      (function (titleCode) {
        var singleFilter =
          "Title eq '" + deletedItemsEscapeQuotesForFilter(titleCode) + "'";
        if (selectedStrategyTypeValue) {
          singleFilter +=
            " and Types eq '" +
            deletedItemsEscapeQuotesForFilter(selectedStrategyTypeValue) +
            "'";
        }
        var singleRequestUrl =
          _spPageContextInfo.webAbsoluteUrl +
          "/_api/web/lists/getbytitle('Initiatives')/items?$select=" +
          encodeURIComponent("Title,Name") +
          "&$filter=" +
          encodeURIComponent(singleFilter) +
          "&$top=1";

        $.ajax({
          url: singleRequestUrl,
          method: "GET",
          headers: { Accept: "application/json; odata=verbose" },
          success: function (singleResponse) {
            var singleRows =
              (singleResponse &&
                singleResponse.d &&
                singleResponse.d.results) ||
              [];
            if (singleRows.length && singleRows[0].Title) {
              var row = singleRows[0];
              loadedByTitle[row.Title] =
                row.Name != null && row.Name !== "" ? row.Name : row.Title;
            }
            onOneRequestDone();
          },
          error: function () {
            onOneRequestDone();
          },
        });
      })(initiativeTitleCodes[codeIndex]);
    }
  });
}

// Person field display: use name segment from SharePoint ;# or ::: format
function deletedItemsParsePersonFieldValue(rawValue) {
  if (rawValue == null || rawValue === "") {
    return deletedItemsGetEmptyLabelText();
  }
  if (typeof rawValue === "object") {
    if (Array.isArray(rawValue)) {
      var arrayNames = [];
      for (var arrayIndex = 0; arrayIndex < rawValue.length; arrayIndex++) {
        var arrayItem = rawValue[arrayIndex];
        if (!arrayItem) {
          continue;
        }
        var arrayName =
          arrayItem.Title ||
          arrayItem.Name ||
          arrayItem.EMail ||
          arrayItem.Email ||
          "";
        if (arrayName) {
          arrayNames.push(arrayName);
        }
      }
      if (arrayNames.length) {
        return arrayNames.join(", ");
      }
      return deletedItemsGetEmptyLabelText();
    }
    if (rawValue.results && Array.isArray(rawValue.results)) {
      var resultNames = [];
      for (var resultIndex = 0; resultIndex < rawValue.results.length; resultIndex++) {
        var resultItem = rawValue.results[resultIndex];
        if (!resultItem) {
          continue;
        }
        var resultName =
          resultItem.Title ||
          resultItem.Name ||
          resultItem.EMail ||
          resultItem.Email ||
          "";
        if (resultName) {
          resultNames.push(resultName);
        }
      }
      if (resultNames.length) {
        return resultNames.join(", ");
      }
      return deletedItemsGetEmptyLabelText();
    }
    if (rawValue.Title || rawValue.Name || rawValue.EMail || rawValue.Email) {
      return (
        rawValue.Title ||
        rawValue.Name ||
        rawValue.EMail ||
        rawValue.Email
      );
    }
    if (rawValue.LookupValue) {
      return rawValue.LookupValue;
    }
    if (rawValue.lookupValue) {
      return rawValue.lookupValue;
    }
    if (rawValue.loginName || rawValue.LoginName || rawValue.Claims) {
      return deletedItemsGetEmptyLabelText();
    }
  }
  var asString = String(rawValue);
  if (asString === "[object Object]") {
    return deletedItemsGetEmptyLabelText();
  }
  if (asString.indexOf(";#") > -1) {
    var pieces = asString.split(";#");
    return pieces[pieces.length - 1] || deletedItemsGetEmptyLabelText();
  }
  if (asString.indexOf(":::") > -1) {
    var commaParts = asString.split(",");
    var displayNames = [];
    for (var index = 0; index < commaParts.length; index++) {
      var oneToken = commaParts[index];
      var tripleParts = oneToken.split(":::");
      if (tripleParts.length >= 2 && tripleParts[1]) {
        displayNames.push(tripleParts[1]);
      }
    }
    if (displayNames.length) {
      return displayNames.join(", ");
    }
    return asString;
  }
  return asString;
}

function deletedItemsFetchLookupListItem(
  sourceListTitle,
  valfieldkey,
  storedValue,
  selectFieldNames,
  expandFieldNames,
) {
  return new Promise(function (resolvePromise) {
    if (deletedItemsIsEmptyValue(storedValue)) {
      resolvePromise(null);
      return;
    }
    var storedAsString = String(storedValue);
    if (storedAsString.indexOf(";#") > -1 || storedAsString.indexOf(":::") > -1) {
      resolvePromise(null);
      return;
    }
    var selectParts = [];
    if (valfieldkey) {
      selectParts.push(valfieldkey);
    }
    for (var fieldIndex = 0; fieldIndex < selectFieldNames.length; fieldIndex++) {
      var oneField = selectFieldNames[fieldIndex];
      if (oneField && selectParts.indexOf(oneField) === -1) {
        selectParts.push(oneField);
      }
    }
    if (!selectParts.length) {
      resolvePromise(null);
      return;
    }
    var safeTitleForUrl = sourceListTitle.replace(/'/g, "''");
    var safeValueInFilter = deletedItemsEscapeQuotesForFilter(storedValue);
    var filterPart = (valfieldkey || "Title") + " eq '" + safeValueInFilter + "'";
    var requestUrl =
      _spPageContextInfo.webAbsoluteUrl +
      "/_api/web/lists/getbytitle('" +
      safeTitleForUrl +
      "')/items?$select=" +
      encodeURIComponent(selectParts.join(",")) +
      "&$filter=" +
      encodeURIComponent(filterPart) +
      "&$top=1";
    if (expandFieldNames && expandFieldNames.length) {
      requestUrl += "&$expand=" + encodeURIComponent(expandFieldNames.join(","));
    }
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (responseData) {
        var resultRows =
          responseData && responseData.d && responseData.d.results;
        resolvePromise(resultRows && resultRows.length ? resultRows[0] : null);
      },
      error: function () {
        resolvePromise(null);
      },
    });
  });
}

// Resolve one lookup label from source list
function deletedItemsFetchLookupDisplayText(
  sourceListTitle,
  valfieldkey,
  Dispfieldkey,
  DispfieldkeyEn,
  storedValue,
) {
  return new Promise(function (resolvePromise) {
    if (storedValue == null || storedValue === "") {
      resolvePromise(deletedItemsGetEmptyLabelText());
      return;
    }
    var storedAsString = String(storedValue);
    if (storedAsString.indexOf(";#") > -1 || storedAsString.indexOf(":::") > -1) {
      resolvePromise(deletedItemsParsePersonFieldValue(storedValue));
      return;
    }
    var cacheKey =
      sourceListTitle + "|" + valfieldkey + "|" + storedAsString;
    if (deletedItemsLookupDisplayCache[cacheKey] !== undefined) {
      resolvePromise(deletedItemsLookupDisplayCache[cacheKey]);
      return;
    }
    var safeTitleForUrl = sourceListTitle.replace(/'/g, "''");
    var safeValueInFilter = deletedItemsEscapeQuotesForFilter(storedValue);
    var displayFieldEnglish = DispfieldkeyEn || Dispfieldkey;
    var selectFields = valfieldkey + "," + Dispfieldkey;
    if (displayFieldEnglish !== Dispfieldkey) {
      selectFields = selectFields + "," + displayFieldEnglish;
    }
    var filterPart = valfieldkey + " eq '" + safeValueInFilter + "'";
    var requestUrl =
      _spPageContextInfo.webAbsoluteUrl +
      "/_api/web/lists/getbytitle('" +
      safeTitleForUrl +
      "')/items?$select=" +
      encodeURIComponent(selectFields) +
      "&$filter=" +
      encodeURIComponent(filterPart) +
      "&$top=1";

    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (responseData) {
        var resultRows =
          responseData && responseData.d && responseData.d.results;
        if (!resultRows || !resultRows.length) {
          deletedItemsLookupDisplayCache[cacheKey] = deletedItemsGetEmptyLabelText();
          resolvePromise(deletedItemsGetEmptyLabelText());
          return;
        }
        var listItem = resultRows[0];
        var currentLang = localStorage.getItem("lng");
        var displayText;
        if (currentLang == null || currentLang == "ar") {
          displayText =
            listItem[Dispfieldkey] != null ? listItem[Dispfieldkey] : storedAsString;
        } else {
          displayText =
            listItem[displayFieldEnglish] != null
              ? listItem[displayFieldEnglish]
              : listItem[Dispfieldkey] != null
                ? listItem[Dispfieldkey]
                : storedAsString;
        }
        deletedItemsLookupDisplayCache[cacheKey] = displayText;
        resolvePromise(displayText);
      },
      error: function () {
        deletedItemsLookupDisplayCache[cacheKey] = deletedItemsGetEmptyLabelText();
        resolvePromise(deletedItemsGetEmptyLabelText());
      },
    });
  });
}

// Resolve lookup columns on table rows with per-value caching
function deletedItemsResolveLookupColumnsOnRows(sharePointRows, columnsForTable) {
  return new Promise(function (resolveOuter) {
    if (!sharePointRows || !sharePointRows.length) {
      resolveOuter(sharePointRows);
      return;
    }

    var lookupColumnList = [];
    for (var colIndex = 0; colIndex < columnsForTable.length; colIndex++) {
      var oneCol = columnsForTable[colIndex];
      if (
        ((oneCol.type || "").toLowerCase() === "lookup" ||
          (oneCol.type || "").toLowerCase() === "lookupwithquery") &&
        oneCol.source &&
        oneCol.valfieldkey &&
        oneCol.Dispfieldkey
      ) {
        lookupColumnList.push(oneCol);
      }
    }

    if (!lookupColumnList.length) {
      resolveOuter(sharePointRows);
      return;
    }

    var uniqueLookupJobs = {};
    for (var rowIndex = 0; rowIndex < sharePointRows.length; rowIndex++) {
      var originalRow = sharePointRows[rowIndex];
      for (var metaIndex = 0; metaIndex < lookupColumnList.length; metaIndex++) {
        var lookupMeta = lookupColumnList[metaIndex];
        var rawStored = originalRow[lookupMeta.sharePointColumnInternalName];
        if (rawStored == null || rawStored === "") {
          continue;
        }
        var rawString = String(rawStored);
        if (rawString.indexOf(";#") > -1 || rawString.indexOf(":::") > -1) {
          continue;
        }
        var jobKey =
          lookupMeta.source +
          "\t" +
          lookupMeta.valfieldkey +
          "\t" +
          rawString;
        if (!uniqueLookupJobs[jobKey]) {
          uniqueLookupJobs[jobKey] = {
            sourceListTitle: lookupMeta.source,
            valfieldkey: lookupMeta.valfieldkey,
            Dispfieldkey: lookupMeta.Dispfieldkey,
            DispfieldkeyEn: lookupMeta.DispfieldkeyEn,
            storedValue: rawStored,
          };
        }
      }
    }

    var jobKeysInOrder = [];
    for (var jobKey in uniqueLookupJobs) {
      if (Object.prototype.hasOwnProperty.call(uniqueLookupJobs, jobKey)) {
        jobKeysInOrder.push(jobKey);
      }
    }

    var displayRows = [];
    for (var copyIndex = 0; copyIndex < sharePointRows.length; copyIndex++) {
      displayRows.push($.extend({}, sharePointRows[copyIndex]));
    }

    if (!jobKeysInOrder.length) {
      for (var rFix = 0; rFix < displayRows.length; rFix++) {
        for (var mFix = 0; mFix < lookupColumnList.length; mFix++) {
          var metaFix = lookupColumnList[mFix];
          var vFix = displayRows[rFix][metaFix.sharePointColumnInternalName];
          if (vFix != null && vFix !== "") {
            displayRows[rFix][metaFix.sharePointColumnInternalName] =
              deletedItemsParsePersonFieldValue(String(vFix));
          }
        }
      }
      resolveOuter(displayRows);
      return;
    }

    var promiseList = [];
    for (var pIndex = 0; pIndex < jobKeysInOrder.length; pIndex++) {
      var job = uniqueLookupJobs[jobKeysInOrder[pIndex]];
      promiseList.push(
        deletedItemsFetchLookupDisplayText(
          job.sourceListTitle,
          job.valfieldkey,
          job.Dispfieldkey,
          job.DispfieldkeyEn,
          job.storedValue,
        ),
      );
    }

    Promise.all(promiseList).then(function (resolvedTexts) {
      var textByJobKey = {};
      for (var tIndex = 0; tIndex < jobKeysInOrder.length; tIndex++) {
        textByJobKey[jobKeysInOrder[tIndex]] = resolvedTexts[tIndex];
      }

      for (var rOut = 0; rOut < displayRows.length; rOut++) {
        for (var mOut = 0; mOut < lookupColumnList.length; mOut++) {
          var metaOut = lookupColumnList[mOut];
          var rawOut = sharePointRows[rOut][metaOut.sharePointColumnInternalName];
          if (rawOut == null || rawOut === "") {
            continue;
          }
          var rawOutString = String(rawOut);
          if (rawOutString.indexOf(";#") > -1 || rawOutString.indexOf(":::") > -1) {
            displayRows[rOut][metaOut.sharePointColumnInternalName] =
              deletedItemsParsePersonFieldValue(rawOutString);
            continue;
          }
          var jobKeyLookup =
            metaOut.source +
            "\t" +
            metaOut.valfieldkey +
            "\t" +
            rawOutString;
          if (textByJobKey[jobKeyLookup] !== undefined) {
            displayRows[rOut][metaOut.sharePointColumnInternalName] =
              textByJobKey[jobKeyLookup];
          }
        }
      }
      resolveOuter(displayRows);
    });
  });
}

function deletedItemsIsEmptyValue(rawValue) {
  if (rawValue == null || rawValue === "") {
    return true;
  }
  var asString = String(rawValue).trim().toLowerCase();
  return asString === "null" || asString === "undefined";
}

function deletedItemsTranslateFromResources(resourceKey) {
  if (typeof Resources === "undefined") {
    return null;
  }
  var currentLang = localStorage.getItem("lng");
  var resourceBucket =
    currentLang == null || currentLang == "ar" ? Resources.ar : Resources.en;
  if (!resourceBucket) {
    return null;
  }
  if (resourceBucket[resourceKey] != null) {
    return resourceBucket[resourceKey];
  }
  if (typeof resourceKey === "string") {
    var lowerKey = resourceKey.toLowerCase();
    if (resourceBucket[lowerKey] != null) {
      return resourceBucket[lowerKey];
    }
  }
  return null;
}

function deletedItemsNormalizeYesNoValue(rawValue) {
  if (rawValue === true || rawValue === 1 || rawValue === "1") {
    return true;
  }
  if (rawValue === false || rawValue === 0 || rawValue === "0") {
    return false;
  }
  var normalized = String(rawValue).trim().toLowerCase();
  if (normalized === "true" || normalized === "yes") {
    return true;
  }
  if (normalized === "false" || normalized === "no") {
    return false;
  }
  return null;
}

function deletedItemsFormatPickerLikeValue(rawValue) {
  if (deletedItemsIsEmptyValue(rawValue)) {
    return deletedItemsGetEmptyLabelText();
  }
  if (typeof rawValue === "object") {
    if (Array.isArray(rawValue.results)) {
      var names = [];
      for (var i = 0; i < rawValue.results.length; i++) {
        var row = rawValue.results[i];
        if (row && (row.Title || row.Name)) {
          names.push(row.Title || row.Name);
        }
      }
      if (names.length) {
        return names.join(", ");
      }
    }
    if (rawValue.Title || rawValue.Name) {
      return rawValue.Title || rawValue.Name;
    }
    var objectKeys = Object.keys(rawValue);
    if (objectKeys.length >= 2 && rawValue[objectKeys[1]] != null) {
      return String(rawValue[objectKeys[1]]);
    }
  }
  var asText = String(rawValue);
  if (asText.indexOf(";#") > -1 || asText.indexOf(":::") > -1) {
    return deletedItemsParsePersonFieldValue(rawValue);
  }
  return asText;
}

function deletedItemsFormatDropdownValues(rawValue, columnDefinition) {
  if (deletedItemsIsEmptyValue(rawValue)) {
    return deletedItemsGetEmptyLabelText();
  }
  var valueKey = String(rawValue).toLowerCase();
  var translated = deletedItemsTranslateFromResources(valueKey);
  if (translated != null) {
    return translated;
  }
  translated = deletedItemsTranslateFromResources(rawValue);
  if (translated != null) {
    return translated;
  }
  var choices = columnDefinition.dropdownChoices || [];
  for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) {
    var oneChoice = choices[choiceIndex];
    if (!oneChoice) {
      continue;
    }
    if (String(oneChoice.value).toLowerCase() === valueKey) {
      if (oneChoice.display) {
        var displayTranslated = deletedItemsTranslateFromResources(
          String(oneChoice.display).toLowerCase(),
        );
        if (displayTranslated != null) {
          return displayTranslated;
        }
        return String(oneChoice.display);
      }
    }
  }
  return String(rawValue);
}

function deletedItemsFormatYesNoRadio(rawValue) {
  var normalized = deletedItemsNormalizeYesNoValue(rawValue);
  if (normalized === null) {
    return deletedItemsGetEmptyLabelText();
  }
  var translated = deletedItemsTranslateFromResources(normalized);
  if (translated != null) {
    return translated;
  }
  return normalized ? "Yes" : "No";
}
function deletedItemsFormatOneTableCell(rawValue, columnDefinition) {
  if (deletedItemsIsEmptyValue(rawValue)) {
    return deletedItemsGetEmptyLabelText();
  }
  var columnKind = (
    columnDefinition.type ||
    columnDefinition.howToShow ||
    ""
  ).toLowerCase();

  if (columnKind === "choicefromresources" || columnKind === "dropdownvalues") {
    return deletedItemsFormatDropdownValues(rawValue, columnDefinition);
  }

  if (columnKind === "yesnoradio") {
    return deletedItemsFormatYesNoRadio(rawValue);
  }

  if (columnKind === "picker" || columnKind === "lookuppicker") {
    return deletedItemsFormatPickerLikeValue(rawValue);
  }

  if (
    columnKind === "date" ||
    columnKind === "datetime" ||
    columnKind === "datetimetoparent"
  ) {
    return deletedItemsFormatDateValue(rawValue);
  }

  if (columnKind === "lookup" || columnKind === "lookupwithquery") {
    var lookupAsText = String(rawValue);
    if (lookupAsText.indexOf(":::") > -1 || lookupAsText.indexOf(";#") > -1) {
      return deletedItemsParsePersonFieldValue(rawValue);
    }
    if (columnDefinition.localStorageVariable) {
      var lookupDisplayName = deletedItemsLookupValueFromLocalStorage(
        rawValue,
        columnDefinition.localStorageVariable,
      );
      if (lookupDisplayName) {
        return lookupDisplayName;
      }
    }
    if (deletedItemsIsEmptyValue(rawValue)) {
      return deletedItemsGetEmptyLabelText();
    }
    return rawValue;
  }

  if (columnKind === "floatpercentage") {
    return String(rawValue) + " %";
  }

  if (columnKind === "float") {
    return String(rawValue);
  }

  return rawValue;
}

function deletedItemsBuildSelectAndExpandForObjectives(columnsForTable) {
  var selectParts = [];
  var expandParts = [];
  for (var columnIndex = 0; columnIndex < columnsForTable.length; columnIndex++) {
    var oneColumn = columnsForTable[columnIndex];
    var fieldName = oneColumn.sharePointColumnInternalName;
    var columnKind = (oneColumn.type || "").toLowerCase();
    if (!fieldName) {
      continue;
    }
    if (columnKind === "picker") {
      if (selectParts.indexOf(fieldName + "/Title") === -1) {
        selectParts.push(fieldName + "/Title");
      }
      if (expandParts.indexOf(fieldName) === -1) {
        expandParts.push(fieldName);
      }
    } else if (selectParts.indexOf(fieldName) === -1) {
      selectParts.push(fieldName);
    }
  }
  return {
    select: selectParts.join(","),
    expand: expandParts.join(","),
  };
}

function deletedItemsLookupValueFromLocalStorage(lookupCode, localStorageVariableName) {
  if (!lookupCode || !localStorageVariableName) {
    return "";
  }
  var localStorageValue = localStorage.getItem(localStorageVariableName);
  if (!localStorageValue) {
    return "";
  }
  var localStorageArray = [];
  try {
    localStorageArray = JSON.parse(localStorageValue);
  } catch (ignoreError) {
    return "";
  }
  if (!Array.isArray(localStorageArray)) {
    return "";
  }
  var matchedLookupItem = null;
  for (var index = 0; index < localStorageArray.length; index++) {
    var oneLookupItem = localStorageArray[index];
    if (!oneLookupItem) {
      continue;
    }
    if (
      oneLookupItem.code == lookupCode ||
      oneLookupItem.Code == lookupCode ||
      oneLookupItem.Title == lookupCode ||
      oneLookupItem.title == lookupCode
    ) {
      matchedLookupItem = oneLookupItem;
      break;
    }
  }
  if (!matchedLookupItem) {
    return "";
  }
  if (localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar") {
    return (
      matchedLookupItem.name ||
      matchedLookupItem.Name ||
      matchedLookupItem.title ||
      matchedLookupItem.Title ||
      ""
    );
  }
  return (
    matchedLookupItem.nameEn ||
    matchedLookupItem.NameEn ||
    matchedLookupItem.name ||
    matchedLookupItem.Name ||
    matchedLookupItem.title ||
    matchedLookupItem.Title ||
    ""
  );
}

function deletedItemsIsMainTabContextKey(contextKey) {
  return (
    contextKey === "objectives" ||
    contextKey === "mainkpis" ||
    contextKey === "initiatives" ||
    contextKey === "projects"
  );
}

function deletedItemsGetViewContextConfig(contextKey) {
  if (deletedItemsIsMainTabContextKey(contextKey)) {
    var tabConfig = deletedItemsGetTabConfig(contextKey);
    if (tabConfig && tabConfig.viewJsonUrl) {
      return {
        contextKey: contextKey,
        listTitle: tabConfig.listTitle,
        viewJsonUrl: tabConfig.viewJsonUrl,
        popupTitleArabic: tabConfig.popupTitleArabic || "التفاصيل",
        popupTitleEnglish: tabConfig.popupTitleEnglish || "Details",
      };
    }
  }
  if (deletedItemsInitiativeRelatedConfigByKey[contextKey]) {
    var relatedConfig = deletedItemsGetInitiativeRelatedConfig(contextKey);
    if (relatedConfig && relatedConfig.viewJsonUrl) {
      return {
        contextKey: contextKey,
        listTitle: relatedConfig.listTitle,
        viewJsonUrl: relatedConfig.viewJsonUrl,
        popupTitleArabic: "التفاصيل",
        popupTitleEnglish: "Details",
      };
    }
  }
  return null;
}

function deletedItemsNormalizeViewField(viewField) {
  return {
    sharePointColumnInternalName: viewField.InternalName,
    headerTextArabic: viewField.DisplayName || viewField.InternalName,
    headerTextEnglish:
      viewField.DisplayNameEn || viewField.DisplayName || viewField.InternalName,
    type: viewField.type || "text",
    needTrans: viewField.needTrans === true,
    localStorageVariable: viewField.localStorageVariable || "",
    source: viewField.source || "",
    Dispfieldkey: viewField.Dispfieldkey || "Name",
    DispfieldkeyEn: viewField.DispfieldkeyEn || viewField.Dispfieldkey || "Name",
    valfieldkey: viewField.valfieldkey || "Title",
    useResourcesForTranslation: viewField.needTrans === true,
    dropdownChoices:
      viewField.options && viewField.options.choices
        ? viewField.options.choices
        : [],
  };
}

function deletedItemsParseToDate(rawValue) {
  if (rawValue == null || rawValue === "") {
    return null;
  }
  var rawString = String(rawValue);
  var spDateMatch = rawString.match(/\/Date\((-?\d+)\)\//);
  if (spDateMatch) {
    var spDate = new Date(parseInt(spDateMatch[1], 10));
    if (!isNaN(spDate.getTime())) {
      return spDate;
    }
  }
  var parsedDate = new Date(rawValue);
  if (!isNaN(parsedDate.getTime())) {
    return parsedDate;
  }
  var isoMatch = rawString.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    parsedDate = new Date(
      parseInt(isoMatch[1], 10),
      parseInt(isoMatch[2], 10) - 1,
      parseInt(isoMatch[3], 10),
    );
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }
  var mmddyyyy = rawString.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (mmddyyyy) {
    parsedDate = new Date(
      parseInt(mmddyyyy[3], 10),
      parseInt(mmddyyyy[1], 10) - 1,
      parseInt(mmddyyyy[2], 10),
    );
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }
  return null;
}

function deletedItemsFormatDateValue(rawValue) {
  var parsedDate = deletedItemsParseToDate(rawValue);
  if (!parsedDate) {
    return deletedItemsGetEmptyLabelText();
  }
  var month = ("0" + (parsedDate.getMonth() + 1)).slice(-2);
  var day = ("0" + parsedDate.getDate()).slice(-2);
  var year = parsedDate.getFullYear();
  return month + "/" + day + "/" + year;
}

function deletedItemsIsMasterViewSection(oneSection) {
  return String((oneSection && oneSection.sectiontype) || "").toLowerCase() === "master";
}

function deletedItemsIterateViewFieldsFromSections(viewSections, fieldCallback) {
  for (var sectionIndex = 0; sectionIndex < viewSections.length; sectionIndex++) {
    var oneSection = viewSections[sectionIndex];
    if (deletedItemsIsMasterViewSection(oneSection)) {
      continue;
    }
    var subFields = oneSection && oneSection.subFields;
    if (!subFields || !subFields.length) {
      continue;
    }
    for (var fieldIndex = 0; fieldIndex < subFields.length; fieldIndex++) {
      var viewField = subFields[fieldIndex];
      if (deletedItemsShouldSkipViewField(viewField)) {
        continue;
      }
      fieldCallback(viewField, oneSection);
    }
  }
}

function deletedItemsCollectLookupRelatedRelations(viewSections) {
  var relations = [];
  deletedItemsIterateViewFieldsFromSections(viewSections, function (viewField) {
    if (viewField.sourcefieldlvl1 && viewField.fieldsinformlvl1) {
      relations.push({
        parentInternalName: viewField.InternalName,
        childInternalName: viewField.fieldsinformlvl1,
        source: viewField.source,
        valfieldkey: viewField.valfieldkey || "Title",
        sourcefieldlvl1: viewField.sourcefieldlvl1,
      });
    }
    if (viewField.sourcefieldlvl2 && viewField.fieldsinformlvl2) {
      relations.push({
        parentInternalName: viewField.InternalName,
        childInternalName: viewField.fieldsinformlvl2,
        source: viewField.source,
        valfieldkey: viewField.valfieldkey || "Title",
        sourcefieldlvl2: viewField.sourcefieldlvl2,
      });
    }
  });
  return relations;
}

function deletedItemsApplyLookupRelatedFields(displayRow, originalRow, relations) {
  if (!relations || !relations.length) {
    return Promise.resolve(displayRow);
  }
  var relationPromises = [];
  for (var relationIndex = 0; relationIndex < relations.length; relationIndex++) {
    (function (oneRelation) {
      var storedValue = originalRow[oneRelation.parentInternalName];
      var sourceFieldName =
        oneRelation.sourcefieldlvl1 || oneRelation.sourcefieldlvl2;
      if (deletedItemsIsEmptyValue(storedValue) || !oneRelation.source || !sourceFieldName) {
        displayRow[oneRelation.childInternalName] = null;
        return;
      }
      relationPromises.push(
        deletedItemsFetchLookupListItem(
          oneRelation.source,
          oneRelation.valfieldkey,
          storedValue,
          [sourceFieldName],
          [],
        ).then(function (lookupItem) {
          if (lookupItem && lookupItem[sourceFieldName] != null) {
            displayRow[oneRelation.childInternalName] = lookupItem[sourceFieldName];
          } else {
            displayRow[oneRelation.childInternalName] = null;
          }
        }),
      );
    })(relations[relationIndex]);
  }
  if (!relationPromises.length) {
    return Promise.resolve(displayRow);
  }
  return Promise.all(relationPromises).then(function () {
    return displayRow;
  });
}

function deletedItemsFetchLookupPickerDisplay(
  sourceListTitle,
  valfieldkey,
  storedValue,
  dispfieldkey,
) {
  return deletedItemsFetchLookupListItem(
    sourceListTitle,
    valfieldkey,
    storedValue,
    [dispfieldkey, dispfieldkey + "/Title"],
    [dispfieldkey],
  ).then(function (lookupItem) {
    if (!lookupItem) {
      return deletedItemsGetEmptyLabelText();
    }
    return deletedItemsFormatPickerLikeValue(lookupItem[dispfieldkey]);
  });
}

function deletedItemsResolveLookupPickerFieldsOnRow(displayRow, originalRow, viewSections) {
  var pickerPromises = [];
  deletedItemsIterateViewFieldsFromSections(viewSections, function (viewField) {
    if (String(viewField.type || "").toLowerCase() !== "lookuppicker") {
      return;
    }
    if (!viewField.source || !viewField.Dispfieldkey) {
      return;
    }
    (function (fieldMeta, internalName) {
      pickerPromises.push(
        deletedItemsFetchLookupPickerDisplay(
          fieldMeta.source,
          fieldMeta.valfieldkey || "Title",
          originalRow[internalName],
          fieldMeta.Dispfieldkey,
        ).then(function (displayText) {
          displayRow[internalName] = displayText;
        }),
      );
    })(viewField, viewField.InternalName);
  });
  if (!pickerPromises.length) {
    return Promise.resolve(displayRow);
  }
  return Promise.all(pickerPromises).then(function () {
    return displayRow;
  });
}

function deletedItemsResolveViewDetailsForPopup(originalRow, viewSections, viewFields) {
  var relations = deletedItemsCollectLookupRelatedRelations(viewSections);
  return deletedItemsResolveLookupColumnsOnRows(
    [$.extend({}, originalRow)],
    viewFields,
  )
    .then(function (resolvedRows) {
      return deletedItemsApplyLookupRelatedFields(
        resolvedRows[0],
        originalRow,
        relations,
      );
    })
    .then(function (displayRow) {
      return deletedItemsResolveLookupPickerFieldsOnRow(
        displayRow,
        originalRow,
        viewSections,
      );
    });
}

function deletedItemsShouldSkipViewField(viewField) {
  if (!viewField || !viewField.InternalName) {
    return true;
  }
  if (viewField.dontSubmit === true) {
    return true;
  }
  var fieldType = String(viewField.type || "").toLowerCase();
  return deletedItemsViewSkipFieldTypes[fieldType] === true;
}

function deletedItemsLoadViewFormSectionsFromJson(viewJsonUrl) {
  if (deletedItemsViewFormCacheByUrl[viewJsonUrl]) {
    return Promise.resolve(deletedItemsViewFormCacheByUrl[viewJsonUrl]);
  }
  return new Promise(function (resolvePromise) {
    $.getScript(viewJsonUrl)
      .done(function () {
        var sections = [];
        if (typeof Information_Form !== "undefined" && Array.isArray(Information_Form)) {
          sections = Information_Form;
        }
        deletedItemsViewFormCacheByUrl[viewJsonUrl] = sections;
        resolvePromise(sections);
      })
      .fail(function (_jqXHR, textStatus, errorThrown) {
        deletedItemsLogError("View JSON load failed", {
          url: viewJsonUrl,
          status: textStatus,
          error: errorThrown,
        });
        resolvePromise([]);
      });
  });
}

function deletedItemsCollectViewFieldsFromSections(viewSections) {
  var normalizedFields = [];
  deletedItemsIterateViewFieldsFromSections(viewSections, function (viewField) {
    normalizedFields.push(deletedItemsNormalizeViewField(viewField));
  });
  return normalizedFields;
}

function deletedItemsCloseDetailsPopup() {
  deletedItemsDetailsPopupRequestId += 1;
  $(".deleted-items-details-popup").remove();
}

function deletedItemsShowDetailsPopup(popupTitle, bodyHtml) {
  $(".deleted-items-details-popup").remove();
  var currentLang = localStorage.getItem("lng");
  var isAr = currentLang == null || currentLang == "ar";
  var closeLabel = isAr ? "إغلاق" : "Close";
  var safeTitle = $("<span/>").text(popupTitle || "").html();
  var dirStyle = isAr
    ? ' style="direction:rtl;text-align:right;"'
    : ' style="direction:ltr;text-align:left;"';
  $("body").append(
    '<div class="popupComment deleted-items-details-popup">' +
      '<div class="wrapcomments deleted-items-details-wrap"' + dirStyle + '>' +
      '<div class="deleted-items-details-header">' +
      '<label class="deleted-items-details-title">' +
      safeTitle +
      "</label>" +
      "</div>" +
      '<div class="deleted-items-details-body">' +
      bodyHtml +
      "</div>" +
      '<div class="btn-cont deleted-items-details-footer">' +
      '<button type="button" class="btn btn-action deleted-items-details-close-btn deleted-items-details-close-btn--footer">' +
      closeLabel +
      "</button>" +
      "</div>" +
      "</div></div>",
  );
}

function deletedItemsIsViewFieldFullRow(fieldMeta) {
  var fieldType = String((fieldMeta && fieldMeta.type) || "").toLowerCase();
  return (
    fieldType === "multiline" ||
    fieldType === "textarea" ||
    fieldType === "note" ||
    fieldType === "richtext" ||
    fieldType === "html"
  );
}

function deletedItemsBuildViewDetailsHtml(viewSections, sharePointRow) {
  var currentLang = localStorage.getItem("lng");
  var sectionsHtml = "";
  for (var sectionIndex = 0; sectionIndex < viewSections.length; sectionIndex++) {
    var oneSection = viewSections[sectionIndex];
    if (deletedItemsIsMasterViewSection(oneSection)) {
      continue;
    }
    var subFields = oneSection && oneSection.subFields;
    if (!subFields || !subFields.length) {
      continue;
    }
    var sectionLabel =
      currentLang == null || currentLang == "ar"
        ? oneSection.label || oneSection.labelEn || ""
        : oneSection.labelEn || oneSection.label || "";
    var fieldsHtml = "";
    for (var fieldIndex = 0; fieldIndex < subFields.length; fieldIndex++) {
      var viewField = subFields[fieldIndex];
      if (deletedItemsShouldSkipViewField(viewField)) {
        continue;
      }
      var fieldMeta = deletedItemsNormalizeViewField(viewField);
      var rawValue = sharePointRow[fieldMeta.sharePointColumnInternalName];
      var displayValue = deletedItemsFormatOneTableCell(rawValue, fieldMeta);
      var fieldLabel =
        currentLang == null || currentLang == "ar"
          ? fieldMeta.headerTextArabic
          : fieldMeta.headerTextEnglish || fieldMeta.headerTextArabic;
      var fieldClassName = "deleted-items-view-field";
      if (deletedItemsIsViewFieldFullRow(fieldMeta)) {
        fieldClassName += " deleted-items-view-field--full";
      }
      fieldsHtml +=
        '<div class="' +
        fieldClassName +
        '">' +
        '<span class="deleted-items-view-label">' +
        $("<span/>").text(fieldLabel).html() +
        "</span>" +
        '<span class="deleted-items-view-value">' +
        $("<span/>").text(displayValue).html() +
        "</span>" +
        "</div>";
    }
    if (!fieldsHtml) {
      continue;
    }
    sectionsHtml +=
      '<div class="deleted-items-view-section">' +
      (sectionLabel
        ? '<h4 class="deleted-items-view-section-title">' +
          $("<span/>").text(sectionLabel).html() +
          "</h4>"
        : "") +
      '<div class="deleted-items-view-fields">' +
      fieldsHtml +
      "</div></div>";
  }
  if (!sectionsHtml) {
    sectionsHtml =
      '<p class="deleted-items-details-empty">' +
      (currentLang == null || currentLang == "ar"
        ? "لا توجد حقول للعرض."
        : "No fields to display.") +
      "</p>";
  }
  return sectionsHtml;
}

function deletedItemsGetAttachmentsListKey(contextKey) {
  var listKeyMap = {
    objectives: "sos",
    mainkpis: "mainkpi",
    initiatives: "initiatives",
    projects: "projects",
    initiativemilestones: "initiativemilestones",
    initiativedeliverables: "initiativedeliverables",
    initiativerisks: "initiativerisks",
    initiativeissues: "initiativeissues",
    benefits: "benefits",
    milestones: "milestones",
    deliverables: "deliverables",
    risks: "risks",
    issues: "issues",
  };
  return listKeyMap[contextKey] || contextKey;
}

function deletedItemsPushUniqueString(targetArray, valueToAdd) {
  if (!valueToAdd) {
    return;
  }
  var asText = String(valueToAdd).trim();
  if (!asText) {
    return;
  }
  if (targetArray.indexOf(asText) === -1) {
    targetArray.push(asText);
  }
}

function deletedItemsGetProjectsDocumentLibraryName() {
  return typeof ListArray !== "undefined" &&
    ListArray[2] &&
    ListArray[2].documents
    ? ListArray[2].documents
    : "Projects Documents";
}

function deletedItemsGetAttachmentsQueryConfig(
  contextKey,
  sharePointRow,
  itemTitle,
) {
  var listKey = deletedItemsGetAttachmentsListKey(contextKey);
  var parentCode = "";
  var hasParentCode = false;
  var relatedConfig = deletedItemsInitiativeRelatedConfigByKey[contextKey];

  if (contextKey === "projects") {
    hasParentCode = true;
    parentCode = itemTitle;
  } else if (contextKey === "initiatives") {
    hasParentCode = true;
    parentCode = itemTitle;
  } else if (relatedConfig) {
    var codeFieldName = relatedConfig.codeFieldName || "InitiativeCode";
    parentCode = sharePointRow[codeFieldName] || "";
    if (!parentCode && deletedItemsSelectedInitiativeCode) {
      parentCode = deletedItemsSelectedInitiativeCode;
    }
    if (parentCode) {
      hasParentCode = true;
    }
  }

  var documentLibraryName = "SPM General Services";
  if (hasParentCode) {
    documentLibraryName =
      relatedConfig && relatedConfig.parentTab === "projects"
        ? deletedItemsGetProjectsDocumentLibraryName()
        : contextKey === "projects"
          ? deletedItemsGetProjectsDocumentLibraryName()
          : "Initiative Documents";
  } else if (listKey === "mainkpi") {
    documentLibraryName = "mainkpi Documents";
  }

  var titleFilter =
    hasParentCode && parentCode ? listKey + "-" + parentCode : listKey;

  return {
    listKey: listKey,
    documentLibraryName: documentLibraryName,
    titleFilter: titleFilter,
    isMainKpi: listKey === "mainkpi",
  };
}

function deletedItemsEscapeXmlCamlValue(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/'/g, "&apos;")
    .replace(/"/g, "&quot;");
}

function deletedItemsGetItemIdFromSharePointRow(sharePointRow) {
  if (!sharePointRow) {
    return "";
  }
  return sharePointRow.Id || sharePointRow.ID || sharePointRow.id || "";
}

function deletedItemsParseFileUrlFromRestItem(restItem) {
  if (!restItem) {
    return "";
  }
  if (restItem.File && restItem.File.ServerRelativeUrl) {
    return restItem.File.ServerRelativeUrl;
  }
  if (restItem.EncodedAbsUrl) {
    try {
      var parsedUrl = document.createElement("a");
      parsedUrl.href = restItem.EncodedAbsUrl;
      return parsedUrl.pathname || restItem.EncodedAbsUrl;
    } catch (ignoreError) {
      return restItem.EncodedAbsUrl;
    }
  }
  if (restItem.FileRef) {
    var fileRef = String(restItem.FileRef);
    if (fileRef.indexOf(";#") > -1) {
      return fileRef.split(";#")[1];
    }
    return fileRef;
  }
  if (restItem.FileDirRef && restItem.FileLeafRef) {
    var fileDir = String(restItem.FileDirRef);
    var fileLeaf = String(restItem.FileLeafRef);
    if (fileDir.charAt(fileDir.length - 1) === "/") {
      return fileDir + fileLeaf;
    }
    return fileDir + "/" + fileLeaf;
  }
  return "";
}

function deletedItemsGetRequestDigest() {
  return new Promise(function (resolveDigest) {
    var digestInput = document.getElementById("__REQUESTDIGEST");
    if (digestInput && digestInput.value) {
      resolveDigest(digestInput.value);
      return;
    }
    $.ajax({
      url: _spPageContextInfo.webAbsoluteUrl + "/_api/contextinfo",
      method: "POST",
      headers: {
        Accept: "application/json; odata=verbose",
        "Content-Type": "application/json; odata=verbose",
      },
    })
      .done(function (responseData) {
        var digestValue =
          responseData &&
          responseData.d &&
          responseData.d.GetContextWebInformation &&
          responseData.d.GetContextWebInformation.FormDigestValue
            ? responseData.d.GetContextWebInformation.FormDigestValue
            : "";
        resolveDigest(digestValue);
      })
      .fail(function () {
        resolveDigest("");
      });
  });
}

function deletedItemsNormalizeAttachmentFileUrl(fileRefOrUrl) {
  if (!fileRefOrUrl) {
    return "";
  }
  var normalizedUrl = String(fileRefOrUrl);
  if (normalizedUrl.indexOf(";#") > -1) {
    normalizedUrl = normalizedUrl.split(";#").pop();
  }
  if (normalizedUrl.indexOf("http") === 0) {
    try {
      var parsedAnchor = document.createElement("a");
      parsedAnchor.href = normalizedUrl;
      return parsedAnchor.pathname || normalizedUrl;
    } catch (ignoreError) {
      return normalizedUrl;
    }
  }
  return normalizedUrl;
}

function deletedItemsMapRestItemToAttachmentFile(restItem, isMainKpi) {
  if (!restItem) {
    return null;
  }
  if (restItem.FSObjType === 1 || restItem.FSObjType === "1") {
    return null;
  }
  var fileUrl = deletedItemsNormalizeAttachmentFileUrl(
    restItem.FileRef ||
      deletedItemsParseFileUrlFromRestItem(restItem),
  );
  if (!fileUrl) {
    return null;
  }
  var titleValue = restItem.Title || "";
  var displayTitle =
    titleValue.indexOf("-") > -1 ? titleValue.split("-").slice(1).join("-") : titleValue;
  var mappedFile = {
    url: fileUrl,
    id: restItem.Id || restItem.ID,
    title: displayTitle,
    rawTitle: titleValue,
    fileItemId: restItem.ItemID,
    filePurpose: restItem.docPurpose || "",
  };
  if (isMainKpi) {
    mappedFile.RelatedYear = restItem.RelatedYear || "";
    mappedFile.RelatedMonth = restItem.RelatedMonth || "";
    mappedFile.RelatedQuarter = restItem.RelatedQuarter || "";
    mappedFile.RelatedMid = restItem.RelatedMid || "";
    mappedFile.RelatedActualY = restItem.RelatedActualY || "";
  }
  return mappedFile;
}

function deletedItemsFilterAttachmentFilesByTitle(attachmentFiles, titleFilter) {
  if (!titleFilter || !attachmentFiles || !attachmentFiles.length) {
    return attachmentFiles || [];
  }
  var filteredFiles = [];
  for (var fileIndex = 0; fileIndex < attachmentFiles.length; fileIndex++) {
    var oneFile = attachmentFiles[fileIndex];
    if (String(oneFile.rawTitle || "") === String(titleFilter)) {
      filteredFiles.push(oneFile);
    }
  }
  return filteredFiles;
}

function deletedItemsMapRestResultsToAttachmentFiles(restResults, isMainKpi) {
  var files = [];
  if (!restResults || !restResults.length) {
    return files;
  }
  for (var rowIndex = 0; rowIndex < restResults.length; rowIndex++) {
    var mappedFile = deletedItemsMapRestItemToAttachmentFile(
      restResults[rowIndex],
      isMainKpi,
    );
    if (mappedFile) {
      files.push(mappedFile);
    }
  }
  return files;
}

function deletedItemsLoadAttachmentsWithRestOData(
  documentLibraryName,
  itemId,
  titleFilter,
  isMainKpi,
  includeTitleFilter,
) {
  if (!documentLibraryName || !itemId) {
    return Promise.resolve([]);
  }
  var selectFields =
    "Id,Title,ItemID,FileRef,FileLeafRef,FileDirRef,FSObjType,docPurpose";
  if (isMainKpi) {
    selectFields +=
      ",RelatedYear,RelatedMonth,RelatedQuarter,RelatedMid,RelatedActualY";
  }

  function runODataQuery(useStringItemId) {
    var itemIdFilter;
    if (useStringItemId) {
      itemIdFilter =
        "ItemID eq '" + deletedItemsEscapeQuotesForFilter(String(itemId)) + "'";
    } else {
      var numericItemId = parseInt(itemId, 10);
      if (isNaN(numericItemId)) {
        itemIdFilter =
          "ItemID eq '" + deletedItemsEscapeQuotesForFilter(String(itemId)) + "'";
      } else {
        itemIdFilter = "ItemID eq " + numericItemId;
      }
    }
    var filterParts = ["FSObjType eq 0", itemIdFilter];
    if (includeTitleFilter && titleFilter) {
      filterParts.push(
        "Title eq '" + deletedItemsEscapeQuotesForFilter(titleFilter) + "'",
      );
    }
    var requestUrl =
      _spPageContextInfo.webAbsoluteUrl +
      "/_api/web/lists/getbytitle('" +
      documentLibraryName.replace(/'/g, "''") +
      "')/items?$select=" +
      encodeURIComponent(selectFields) +
      "&$filter=" +
      encodeURIComponent(filterParts.join(" and ")) +
      "&$top=5000";

    return new Promise(function (resolveOData) {
      $.ajax({
        url: requestUrl,
        method: "GET",
        headers: { Accept: "application/json; odata=verbose" },
        success: function (responseData) {
          var results =
            (responseData && responseData.d && responseData.d.results) || [];
          var files = deletedItemsMapRestResultsToAttachmentFiles(results, isMainKpi);
          if (!includeTitleFilter && titleFilter) {
            files = deletedItemsFilterAttachmentFilesByTitle(files, titleFilter);
          }
          resolveOData(files);
        },
        error: function (xhr) {
          deletedItemsLogError("Attachments OData request failed", {
            library: documentLibraryName,
            url: requestUrl,
            status: xhr && xhr.status,
            statusText: xhr && xhr.statusText,
          });
          resolveOData([]);
        },
      });
    });
  }

  return runODataQuery(false).then(function (files) {
    if (files && files.length) {
      return files;
    }
    return runODataQuery(true);
  });
}

function deletedItemsGetAttachmentCamlViewFields(isMainKpi) {
  var viewFields =
    "<FieldRef Name='ID' /><FieldRef Name='Title' /><FieldRef Name='ItemID' />" +
    "<FieldRef Name='FileRef' /><FieldRef Name='FileLeafRef' /><FieldRef Name='FileDirRef' />" +
    "<FieldRef Name='FSObjType' /><FieldRef Name='docPurpose' />";
  if (isMainKpi) {
    viewFields +=
      "<FieldRef Name='RelatedYear' /><FieldRef Name='RelatedMonth' />" +
      "<FieldRef Name='RelatedQuarter' /><FieldRef Name='RelatedMid' />" +
      "<FieldRef Name='RelatedActualY' />";
  }
  return viewFields;
}

function deletedItemsBuildAttachmentCamlViewXml(itemId, titleFilter, isMainKpi) {
  return (
    "<View Scope='RecursiveAll'><Query><Where><And><Eq><FieldRef Name='ItemID' /><Value Type='Text'>" +
    deletedItemsEscapeXmlCamlValue(itemId) +
    "</Value></Eq><Eq><FieldRef Name='Title' /><Value Type='Text'>" +
    deletedItemsEscapeXmlCamlValue(titleFilter) +
    "</Value></Eq></And></Where></Query><ViewFields>" +
    deletedItemsGetAttachmentCamlViewFields(isMainKpi) +
    "</ViewFields><RowLimit>5000</RowLimit></View>"
  );
}

function deletedItemsBuildAttachmentCamlViewXmlItemIdOnly(
  itemId,
  isMainKpi,
  valueType,
) {
  var camlValueType = valueType === "Number" ? "Number" : "Text";
  var camlValue =
    camlValueType === "Number"
      ? String(parseInt(itemId, 10))
      : String(itemId);
  return (
    "<View Scope='RecursiveAll'><Query><Where><Eq><FieldRef Name='ItemID' /><Value Type='" +
    camlValueType +
    "'>" +
    deletedItemsEscapeXmlCamlValue(camlValue) +
    "</Value></Eq></Where></Query><ViewFields>" +
    deletedItemsGetAttachmentCamlViewFields(isMainKpi) +
    "</ViewFields><RowLimit>5000</RowLimit></View>"
  );
}

function deletedItemsBuildAttachmentCamlViewXmlTitleOnly(titleFilter, isMainKpi) {
  return (
    "<View Scope='RecursiveAll'><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>" +
    deletedItemsEscapeXmlCamlValue(titleFilter) +
    "</Value></Eq></Where></Query><ViewFields>" +
    deletedItemsGetAttachmentCamlViewFields(isMainKpi) +
    "</ViewFields><RowLimit>5000</RowLimit></View>"
  );
}

function deletedItemsBuildAttachmentCamlViewXmlFileDirContains(
  searchText,
  isMainKpi,
) {
  return (
    "<View Scope='RecursiveAll'><Query><Where><Contains><FieldRef Name='FileDirRef' /><Value Type='Text'>" +
    deletedItemsEscapeXmlCamlValue(searchText) +
    "</Value></Contains></Where></Query><ViewFields>" +
    deletedItemsGetAttachmentCamlViewFields(isMainKpi) +
    "</ViewFields><RowLimit>5000</RowLimit></View>"
  );
}

function deletedItemsFilterAttachmentFilesForItem(
  attachmentFiles,
  itemId,
  titleFilters,
  itemTitle,
) {
  if (!attachmentFiles || !attachmentFiles.length) {
    return [];
  }
  var titleFilterMap = {};
  if (titleFilters && titleFilters.length) {
    for (var titleIndex = 0; titleIndex < titleFilters.length; titleIndex++) {
      titleFilterMap[String(titleFilters[titleIndex])] = true;
    }
  }
  var acceptedFiles = [];
  for (var fileIndex = 0; fileIndex < attachmentFiles.length; fileIndex++) {
    var oneFile = attachmentFiles[fileIndex];
    var matchesItemId =
      oneFile.fileItemId != null &&
      oneFile.fileItemId !== "" &&
      String(oneFile.fileItemId) === String(itemId);
    var matchesTitle =
      oneFile.rawTitle && titleFilterMap[String(oneFile.rawTitle)] === true;
    var matchesPath =
      itemTitle &&
      oneFile.url &&
      String(oneFile.url).indexOf(String(itemTitle)) > -1;
    if (matchesItemId || matchesTitle || matchesPath) {
      acceptedFiles.push(oneFile);
    }
  }
  return acceptedFiles;
}

function deletedItemsExecuteAttachmentCamlQuery(
  documentLibraryName,
  viewXml,
  isMainKpi,
) {
  return deletedItemsGetRequestDigest().then(function (requestDigest) {
    if (!requestDigest || !documentLibraryName || !viewXml) {
      return [];
    }
    var requestUrl =
      _spPageContextInfo.webAbsoluteUrl +
      "/_api/web/lists/getbytitle('" +
      documentLibraryName.replace(/'/g, "''") +
      "')/getitems";
    return new Promise(function (resolveFiles) {
      $.ajax({
        url: requestUrl,
        method: "POST",
        contentType: "application/json; odata=verbose",
        headers: {
          Accept: "application/json; odata=verbose",
          "X-RequestDigest": requestDigest,
        },
        data: JSON.stringify({
          query: {
            __metadata: { type: "SP.CamlQuery" },
            ViewXml: viewXml,
          },
        }),
        success: function (responseData) {
          var results =
            (responseData && responseData.d && responseData.d.results) || [];
          resolveFiles(
            deletedItemsMapRestResultsToAttachmentFiles(results, isMainKpi),
          );
        },
        error: function (xhr) {
          deletedItemsLogError("Attachments CAML request failed", {
            library: documentLibraryName,
            url: requestUrl,
            status: xhr && xhr.status,
            statusText: xhr && xhr.statusText,
          });
          resolveFiles([]);
        },
      });
    });
  });
}

function deletedItemsLoadAttachmentsWithRestODataTitleOnly(
  documentLibraryName,
  titleFilter,
  isMainKpi,
) {
  if (!documentLibraryName || !titleFilter) {
    return Promise.resolve([]);
  }
  var selectFields =
    "Id,Title,ItemID,FileRef,FileLeafRef,FileDirRef,FSObjType,docPurpose";
  if (isMainKpi) {
    selectFields +=
      ",RelatedYear,RelatedMonth,RelatedQuarter,RelatedMid,RelatedActualY";
  }
  var requestUrl =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('" +
    documentLibraryName.replace(/'/g, "''") +
    "')/items?$select=" +
    encodeURIComponent(selectFields) +
    "&$filter=" +
    encodeURIComponent(
      "FSObjType eq 0 and Title eq '" +
        deletedItemsEscapeQuotesForFilter(titleFilter) +
        "'",
    ) +
    "&$top=5000";
  return new Promise(function (resolveOData) {
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (responseData) {
        var results =
          (responseData && responseData.d && responseData.d.results) || [];
        resolveOData(deletedItemsMapRestResultsToAttachmentFiles(results, isMainKpi));
      },
      error: function (xhr) {
        deletedItemsLogError("Attachments OData title-only request failed", {
          library: documentLibraryName,
          url: requestUrl,
          status: xhr && xhr.status,
          statusText: xhr && xhr.statusText,
        });
        resolveOData([]);
      },
    });
  });
}

function deletedItemsLoadAttachmentsWithRestCaml(
  documentLibraryName,
  itemId,
  titleFilter,
  isMainKpi,
) {
  if (!documentLibraryName || !itemId || !titleFilter) {
    return Promise.resolve([]);
  }
  return deletedItemsExecuteAttachmentCamlQuery(
    documentLibraryName,
    deletedItemsBuildAttachmentCamlViewXml(itemId, titleFilter, isMainKpi),
    isMainKpi,
  );
}

function deletedItemsParseAttachmentFileName(fileUrl) {
  var filename = String(fileUrl || "")
    .split("/")
    .pop();
  if (filename.indexOf("_-_sut_-_") > -1) {
    filename = filename.split("_-_sut_-_")[1];
  }
  return filename;
}

function deletedItemsLoadAttachmentsWithJsom(
  documentLibraryName,
  itemId,
  titleFilter,
  isMainKpi,
) {
  return new Promise(function (resolvePromise) {
    if (
      typeof SP === "undefined" ||
      !SP.ClientContext ||
      !itemId ||
      !documentLibraryName
    ) {
      resolvePromise([]);
      return;
    }
    try {
      var context = SP.ClientContext.get_current();
      var list = context.get_web().get_lists().getByTitle(documentLibraryName);
      var query = new SP.CamlQuery();
      query.set_viewXml(
        '<View Scope="RecursiveAll"><Query><Where><And><Eq><FieldRef Name="ItemID" /><Value Type="Text">' +
          deletedItemsEscapeXmlCamlValue(itemId) +
          '</Value></Eq><Eq><FieldRef Name="Title" /><Value Type="Text">' +
          deletedItemsEscapeXmlCamlValue(titleFilter) +
          "</Value></Eq></And></Where></Query><RowLimit>5000</RowLimit></View>",
      );
      var allItems = list.getItems(query);
      var includeFields = isMainKpi
        ? "Include(ID, Title, ContentType, File, ItemID, RelatedYear, RelatedMonth, RelatedQuarter, RelatedMid, RelatedActualY, docPurpose)"
        : "Include(ID, Title, ContentType, File, ItemID, docPurpose)";
      context.load(allItems, includeFields);
      context.executeQueryAsync(
        function () {
          var files = [];
          var listEnumerator = allItems.getEnumerator();
          while (listEnumerator.moveNext()) {
            var currentFile = listEnumerator.get_current();
            var contentType = currentFile.get_contentType();
            if (!contentType || contentType.get_name() === "Folder") {
              continue;
            }
            var fileObject = currentFile.get_file();
            var currentItemId = currentFile.get_item("ItemID");
            if (
              fileObject &&
              String(currentItemId) === String(itemId)
            ) {
              var titleValue = currentFile.get_item("Title") || "";
              var displayTitle =
                titleValue.indexOf("-") > -1
                  ? titleValue.split("-")[1]
                  : titleValue;
              var mappedFile = {
                url: fileObject.get_serverRelativeUrl(),
                id: currentFile.get_id(),
                title: displayTitle,
                filePurpose: currentFile.get_item("docPurpose") || "",
              };
              if (isMainKpi) {
                mappedFile.RelatedYear = currentFile.get_item("RelatedYear") || "";
                mappedFile.RelatedMonth = currentFile.get_item("RelatedMonth") || "";
                mappedFile.RelatedQuarter =
                  currentFile.get_item("RelatedQuarter") || "";
                mappedFile.RelatedMid = currentFile.get_item("RelatedMid") || "";
                mappedFile.RelatedActualY =
                  currentFile.get_item("RelatedActualY") || "";
              }
              files.push(mappedFile);
            }
          }
          resolvePromise(files);
        },
        function (_sender, args) {
          deletedItemsLogError("Attachments JSOM request failed", {
            library: documentLibraryName,
            message: args && args.get_message ? args.get_message() : "unknown",
          });
          resolvePromise([]);
        },
      );
    } catch (jsomError) {
      deletedItemsLogError("Attachments JSOM exception", {
        library: documentLibraryName,
        error: jsomError,
      });
      resolvePromise([]);
    }
  });
}

function deletedItemsEnsureAttachmentFieldsOnRow(
  contextKey,
  listTitle,
  sharePointRow,
) {
  var itemId = deletedItemsGetItemIdFromSharePointRow(sharePointRow);
  if (!itemId || !listTitle) {
    return Promise.resolve(sharePointRow);
  }
  var extraFields = [];
  if (contextKey === "mainkpis") {
    extraFields.push("PeriodType", "Name");
    if (sharePointRow.FromDate == null || sharePointRow.FromDate === "") {
      extraFields.push("FromDate");
    }
    if (sharePointRow.ToDate == null || sharePointRow.ToDate === "") {
      extraFields.push("ToDate");
    }
  }
  var relatedConfig = deletedItemsInitiativeRelatedConfigByKey[contextKey];
  if (relatedConfig) {
    var codeFieldName = relatedConfig.codeFieldName || "InitiativeCode";
    if (!sharePointRow[codeFieldName]) {
      extraFields.push(codeFieldName);
    }
  }
  if (!extraFields.length) {
    return Promise.resolve(sharePointRow);
  }
  return deletedItemsFetchListItemFieldsWithFallback(
    listTitle,
    itemId,
    extraFields,
  ).then(function (extraRow) {
    var mergedRow = {};
    deletedItemsMergeItemFieldData(mergedRow, sharePointRow);
    deletedItemsMergeItemFieldData(mergedRow, extraRow || {});
    return mergedRow;
  });
}

function deletedItemsGetAttachmentsQueryCandidates(
  contextKey,
  sharePointRow,
  itemTitle,
) {
  var primaryConfig = deletedItemsGetAttachmentsQueryConfig(
    contextKey,
    sharePointRow,
    itemTitle,
  );
  var candidates = [
    {
      documentLibraryName: primaryConfig.documentLibraryName,
      titleFilter: primaryConfig.titleFilter,
      isMainKpi: primaryConfig.isMainKpi,
    },
  ];

  if (primaryConfig.titleFilter && primaryConfig.titleFilter.indexOf("-") > -1) {
    var hasListKeyCandidate = false;
    for (var candidateIndex = 0; candidateIndex < candidates.length; candidateIndex++) {
      if (candidates[candidateIndex].titleFilter === primaryConfig.listKey) {
        hasListKeyCandidate = true;
        break;
      }
    }
    if (!hasListKeyCandidate) {
      candidates.push({
        documentLibraryName: primaryConfig.documentLibraryName,
        titleFilter: primaryConfig.listKey,
        isMainKpi: primaryConfig.isMainKpi,
      });
    }
  }

  if (
    primaryConfig.documentLibraryName !== "SPM General Services" &&
    primaryConfig.listKey !== "mainkpi"
  ) {
    candidates.push({
      documentLibraryName: "SPM General Services",
      titleFilter: primaryConfig.titleFilter,
      isMainKpi: false,
    });
  }

  return candidates;
}

function deletedItemsTryAttachmentLoadStrategies(strategyRunners) {
  var strategyIndex = 0;
  function runNextStrategy() {
    if (strategyIndex >= strategyRunners.length) {
      return Promise.resolve([]);
    }
    var runOneStrategy = strategyRunners[strategyIndex++];
    return runOneStrategy().then(function (files) {
      if (files && files.length) {
        return files;
      }
      return runNextStrategy();
    });
  }
  return runNextStrategy();
}

function deletedItemsTryLoadAttachmentsFromCandidate(
  candidate,
  itemId,
  itemTitle,
) {
  var titleFilters = [candidate.titleFilter];
  if (candidate.titleFilter && candidate.titleFilter.indexOf("-") > -1) {
    var titleSuffix = candidate.titleFilter.split("-").slice(1).join("-");
    if (titleSuffix) {
      titleFilters.push(titleSuffix);
    }
  }
  if (itemTitle) {
    titleFilters.push(itemTitle);
  }

  return deletedItemsTryAttachmentLoadStrategies([
    function () {
      return deletedItemsLoadAttachmentsWithRestOData(
        candidate.documentLibraryName,
        itemId,
        candidate.titleFilter,
        candidate.isMainKpi,
        true,
      );
    },
    function () {
      return deletedItemsLoadAttachmentsWithRestOData(
        candidate.documentLibraryName,
        itemId,
        candidate.titleFilter,
        candidate.isMainKpi,
        false,
      ).then(function (files) {
        return deletedItemsFilterAttachmentFilesForItem(
          files,
          itemId,
          titleFilters,
          itemTitle,
        );
      });
    },
    function () {
      return deletedItemsLoadAttachmentsWithRestODataTitleOnly(
        candidate.documentLibraryName,
        candidate.titleFilter,
        candidate.isMainKpi,
      ).then(function (files) {
        return deletedItemsFilterAttachmentFilesForItem(
          files,
          itemId,
          titleFilters,
          itemTitle,
        );
      });
    },
    function () {
      return deletedItemsLoadAttachmentsWithRestCaml(
        candidate.documentLibraryName,
        itemId,
        candidate.titleFilter,
        candidate.isMainKpi,
      );
    },
    function () {
      return deletedItemsExecuteAttachmentCamlQuery(
        candidate.documentLibraryName,
        deletedItemsBuildAttachmentCamlViewXmlItemIdOnly(
          itemId,
          candidate.isMainKpi,
          "Text",
        ),
        candidate.isMainKpi,
      );
    },
    function () {
      return deletedItemsExecuteAttachmentCamlQuery(
        candidate.documentLibraryName,
        deletedItemsBuildAttachmentCamlViewXmlItemIdOnly(
          itemId,
          candidate.isMainKpi,
          "Number",
        ),
        candidate.isMainKpi,
      );
    },
    function () {
      return deletedItemsExecuteAttachmentCamlQuery(
        candidate.documentLibraryName,
        deletedItemsBuildAttachmentCamlViewXmlTitleOnly(
          candidate.titleFilter,
          candidate.isMainKpi,
        ),
        candidate.isMainKpi,
      ).then(function (files) {
        return deletedItemsFilterAttachmentFilesForItem(
          files,
          itemId,
          titleFilters,
          itemTitle,
        );
      });
    },
    function () {
      if (!itemTitle) {
        return Promise.resolve([]);
      }
      return deletedItemsExecuteAttachmentCamlQuery(
        candidate.documentLibraryName,
        deletedItemsBuildAttachmentCamlViewXmlFileDirContains(
          itemTitle,
          candidate.isMainKpi,
        ),
        candidate.isMainKpi,
      ).then(function (files) {
        return deletedItemsFilterAttachmentFilesForItem(
          files,
          itemId,
          titleFilters,
          itemTitle,
        );
      });
    },
    function () {
      return deletedItemsLoadAttachmentsWithJsom(
        candidate.documentLibraryName,
        itemId,
        candidate.titleFilter,
        candidate.isMainKpi,
      );
    },
  ]);
}

function deletedItemsLoadAttachmentsForDetailsPopup(contextKey, sharePointRow, itemTitle) {
  var itemId = deletedItemsGetItemIdFromSharePointRow(sharePointRow);
  if (!itemId) {
    return Promise.resolve([]);
  }
  var queryCandidates = deletedItemsGetAttachmentsQueryCandidates(
    contextKey,
    sharePointRow,
    itemTitle,
  );
  if (!queryCandidates.length) {
    return Promise.resolve([]);
  }

  var candidateIndex = 0;
  function tryNextCandidate() {
    if (candidateIndex >= queryCandidates.length) {
      return Promise.resolve([]);
    }
    var oneCandidate = queryCandidates[candidateIndex++];
    return deletedItemsTryLoadAttachmentsFromCandidate(
      oneCandidate,
      itemId,
      itemTitle,
    ).then(function (files) {
      if (files && files.length) {
        return files;
      }
      return tryNextCandidate();
    });
  }

  return tryNextCandidate();
}

function deletedItemsResolveAttachmentHref(fileUrl) {
  var normalizedUrl = deletedItemsNormalizeAttachmentFileUrl(fileUrl);
  if (!normalizedUrl) {
    return "";
  }
  if (
    normalizedUrl.indexOf("http") === 0 ||
    normalizedUrl.indexOf("/sites/") === 0
  ) {
    return normalizedUrl;
  }
  var webServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl || "";
  if (!webServerRelativeUrl || webServerRelativeUrl === "/") {
    return normalizedUrl;
  }
  return (
    webServerRelativeUrl.replace(/\/$/, "") +
    (normalizedUrl.indexOf("/") === 0 ? normalizedUrl : "/" + normalizedUrl)
  );
}

function deletedItemsBuildAttachmentFileLinkHtml(oneFile) {
  var filename = deletedItemsParseAttachmentFileName(oneFile.url);
  var safeFilename = $("<span/>").text(filename).html();
  var fileHref = deletedItemsResolveAttachmentHref(oneFile.url);
  var filePurposeHtml = oneFile.filePurpose
    ? '<span class="filePurpose">' +
      $("<span/>").text(oneFile.filePurpose).html() +
      "</span>"
    : '<span class="filePurpose"></span>';
  return (
    '<div class="file-container"><a class="File-Link" file-id="' +
    deletedItemsEscapeHtmlAttribute(oneFile.id) +
    '" file-title="' +
    deletedItemsEscapeHtmlAttribute(oneFile.title) +
    '" href="' +
    deletedItemsEscapeHtmlAttribute(fileHref) +
    '" download="' +
    deletedItemsEscapeHtmlAttribute(filename) +
    '" title="Download ' +
    deletedItemsEscapeHtmlAttribute(filename) +
    '"><i class="fas fa-file-download"></i>' +
    filePurposeHtml +
    safeFilename +
    "</a></div>"
  );
}

function deletedItemsGetMainKpiPeriodTypeArray(periodType) {
  if (periodType === "monthly") {
    return [
      "ActualM1",
      "ActualM2",
      "ActualM3",
      "ActualM4",
      "ActualM5",
      "ActualM6",
      "ActualM7",
      "ActualM8",
      "ActualM9",
      "ActualM10",
      "ActualM11",
      "ActualM12",
    ];
  }
  if (periodType === "quarter") {
    return ["ActualQ1", "ActualQ2", "ActualQ3", "ActualQ4"];
  }
  if (periodType === "midterm") {
    return ["ActualMid1", "ActualMid2"];
  }
  if (periodType === "year") {
    return ["ActualY"];
  }
  return ["ActualQ1", "ActualQ2", "ActualQ3", "ActualQ4"];
}

function deletedItemsBuildMainKpiPeriodTableHtml(periodType) {
  if (periodType === "monthly") {
    return (
      '<table style="width:100%">' +
      '<tr style="font-size:12px">' +
      '<th data-trans-pattr9 class="Resources kpi-attach-table-head" id="ActualM1"></th>' +
      '<th data-trans-pattr10 class="Resources kpi-attach-table-head" id="ActualM2"></th>' +
      '<th data-trans-pattr11 class="Resources kpi-attach-table-head" id="ActualM3"></th>' +
      '<th data-trans-pattr12 class="Resources kpi-attach-table-head" id="ActualM4"></th>' +
      '<th data-trans-pattr13 class="Resources kpi-attach-table-head" id="ActualM5"></th>' +
      '<th data-trans-pattr14 class="Resources kpi-attach-table-head" id="ActualM6"></th>' +
      '<th data-trans-pattr15 class="Resources kpi-attach-table-head" id="ActualM7"></th>' +
      '<th data-trans-pattr16 class="Resources kpi-attach-table-head" id="ActualM8"></th>' +
      '<th data-trans-pattr17 class="Resources kpi-attach-table-head" id="ActualM9"></th>' +
      '<th data-trans-pattr18 class="Resources kpi-attach-table-head" id="ActualM10"></th>' +
      '<th data-trans-pattr19 class="Resources kpi-attach-table-head" id="ActualM11"></th>' +
      '<th data-trans-pattr20 class="Resources kpi-attach-table-head" id="ActualM12"></th>' +
      "</tr></table>"
    );
  }
  if (periodType === "midterm") {
    return (
      '<table style="width:100%">' +
      '<tr style="font-size:12px">' +
      '<th data-trans-actualmid1 class="Resources kpi-attach-table-head" id="ActualMid1"></th>' +
      '<th data-trans-actualmid2 class="Resources kpi-attach-table-head" id="ActualMid2"></th>' +
      "</tr></table>"
    );
  }
  if (periodType === "year") {
    return (
      '<table style="width:100%">' +
      '<tr style="font-size:12px">' +
      '<th data-trans-actualy class="Resources kpi-attach-table-head" id="ActualY"></th>' +
      "</tr></table>"
    );
  }
  return (
    '<table style="width:100%">' +
    '<tr style="font-size:12px">' +
    '<th data-trans-quarter1 class="Resources kpi-attach-table-head" id="ActualQ1"></th>' +
    '<th data-trans-quarter2 class="Resources kpi-attach-table-head" id="ActualQ2"></th>' +
    '<th data-trans-quarter3 class="Resources kpi-attach-table-head" id="ActualQ3"></th>' +
    '<th data-trans-quarter4 class="Resources kpi-attach-table-head" id="ActualQ4"></th>' +
    "</tr></table>"
  );
}

function deletedItemsBuildMainKpiAttachmentsShellHtml(
  sharePointRow,
  attachmentFiles,
) {
  var periodType = sharePointRow.PeriodType || "quarter";
  var kpiFromYear = Number(sharePointRow.FromDate) || new Date().getFullYear();
  var kpiToYear = Number(sharePointRow.ToDate) || kpiFromYear;
  if (kpiToYear < kpiFromYear) {
    kpiToYear = kpiFromYear;
  }
  var collapseContent =
    deletedItemsBuildMainKpiPeriodTableHtml(periodType) +
    '<div id="attachRow" class="kpi-attach-container"></div>';
  var accordionHtml =
    '<div class="accordion" id="mainkpiattachtables">' +
    '<div class="card" id="general-attach">' +
    '<div class="card-header bg-white" id="headingGA">' +
    '<h3 data-trans-generalattachements class="Resources acc-header mb-0 py-3 px-2" data-toggle="collapse" data-target="#collapse" aria-expanded="true" aria-controls="collapse"></h3>' +
    "</div>" +
    '<div id="collapse" class="collapse show" aria-labelledby="headingGA">' +
    '<div class="card-body"><ul class="list-group"><div id="general-attach-content"></div></ul></div>' +
    "</div></div>";

  for (var yearValue = kpiFromYear; yearValue <= kpiToYear; yearValue++) {
    accordionHtml +=
      '<div class="card" id="year' +
      yearValue +
      '">' +
      '<div class="card-header bg-white" id="heading' +
      yearValue +
      '">' +
      '<h3 class="Resources acc-header mb-0 py-3 px-2" data-toggle="collapse" data-target="#collapse' +
      yearValue +
      '" aria-expanded="true" aria-controls="collapse' +
      yearValue +
      '">' +
      yearValue +
      "</h3></div>" +
      '<div id="collapse' +
      yearValue +
      '" class="collapse show" aria-labelledby="heading' +
      yearValue +
      '">' +
      '<div class="card-body"><ul class="list-group">' +
      collapseContent +
      "</ul></div></div></div>";
  }
  accordionHtml += "</div>";

  return {
    shellHtml: accordionHtml,
    periodType: periodType,
    kpiFromYear: kpiFromYear,
    kpiToYear: kpiToYear,
    attachmentFiles: attachmentFiles || [],
  };
}

function deletedItemsGetMainKpiRelatedTypeForFile(oneFile, periodType) {
  if (periodType === "monthly") {
    return oneFile.RelatedMonth;
  }
  if (periodType === "quarter") {
    return oneFile.RelatedQuarter;
  }
  if (periodType === "midterm") {
    return oneFile.RelatedMid;
  }
  if (periodType === "year") {
    return oneFile.RelatedActualY;
  }
  return oneFile.RelatedQuarter;
}

function deletedItemsRenderMainKpiPeriodFiles(
  $popupBody,
  yearValue,
  periodTypeValue,
  periodType,
  attachmentFiles,
) {
  var filesHtml = "";
  for (var fileIndex = 0; fileIndex < attachmentFiles.length; fileIndex++) {
    var oneFile = attachmentFiles[fileIndex];
    var relatedType = deletedItemsGetMainKpiRelatedTypeForFile(
      oneFile,
      periodType,
    );
    if (
      String(oneFile.RelatedYear) === String(yearValue) &&
      relatedType === periodTypeValue
    ) {
      filesHtml += deletedItemsBuildAttachmentFileLinkHtml(oneFile);
    }
  }
  var $yearCard = $popupBody.find("#year" + yearValue);
  $yearCard.find(".kpi-attach-table-head").css("background", "#fff");
  $yearCard.find("#" + periodTypeValue).css("background", "#D0D0D0");
  $yearCard.find("#attachRow").html(filesHtml);
}

function deletedItemsInitMainKpiAttachmentsInPopup($popupBody, mainKpiConfig) {
  if (!$popupBody || !$popupBody.length || !mainKpiConfig) {
    return;
  }
  var attachmentFiles = mainKpiConfig.attachmentFiles || [];
  var periodType = mainKpiConfig.periodType || "quarter";
  var kpiFromYear = mainKpiConfig.kpiFromYear;
  var kpiToYear = mainKpiConfig.kpiToYear;
  var typeArray = deletedItemsGetMainKpiPeriodTypeArray(periodType);
  var generalAttachHtml = "";

  for (var fileIndex = 0; fileIndex < attachmentFiles.length; fileIndex++) {
    var oneFile = attachmentFiles[fileIndex];
    if (
      !oneFile.RelatedActualY &&
      !oneFile.RelatedMid &&
      !oneFile.RelatedMonth &&
      !oneFile.RelatedQuarter &&
      !oneFile.RelatedYear
    ) {
      generalAttachHtml += deletedItemsBuildAttachmentFileLinkHtml(oneFile);
    }
  }
  $popupBody.find("#general-attach-content").html(generalAttachHtml);

  for (var yearValue = kpiFromYear; yearValue <= kpiToYear; yearValue++) {
    (function (capturedYear) {
      for (var typeIndex = 0; typeIndex < typeArray.length; typeIndex++) {
        (function (capturedType) {
          $popupBody
            .find("#year" + capturedYear + " #" + capturedType)
            .on("click", function () {
              deletedItemsRenderMainKpiPeriodFiles(
                $popupBody,
                capturedYear,
                capturedType,
                periodType,
                attachmentFiles,
              );
            });
        })(typeArray[typeIndex]);
      }
    })(yearValue);
  }

  var initialYear = kpiFromYear;
  var initialType = typeArray[0];
  for (var yearScan = kpiFromYear; yearScan <= kpiToYear; yearScan++) {
    for (var typeScanIndex = 0; typeScanIndex < typeArray.length; typeScanIndex++) {
      var hasFilesForPeriod = false;
      for (var scanIndex = 0; scanIndex < attachmentFiles.length; scanIndex++) {
        var scannedFile = attachmentFiles[scanIndex];
        var scannedRelatedType = deletedItemsGetMainKpiRelatedTypeForFile(
          scannedFile,
          periodType,
        );
        if (
          String(scannedFile.RelatedYear) === String(yearScan) &&
          scannedRelatedType === typeArray[typeScanIndex]
        ) {
          hasFilesForPeriod = true;
          break;
        }
      }
      if (hasFilesForPeriod) {
        initialYear = yearScan;
        initialType = typeArray[typeScanIndex];
        yearScan = kpiToYear + 1;
        break;
      }
    }
  }
  deletedItemsRenderMainKpiPeriodFiles(
    $popupBody,
    initialYear,
    initialType,
    periodType,
    attachmentFiles,
  );
}

function deletedItemsBuildAttachmentsSectionHtml(
  contextKey,
  sharePointRow,
  attachmentFiles,
) {
  if (!attachmentFiles || !attachmentFiles.length) {
    return { html: "", mainKpiConfig: null };
  }

  var filesLink =
    '<div class="py-5 border-bottom section-container deleted-items-file-container" id="file_container" data-groups="">' +
    '<div class="form-row"><div class="col-lg-3 col-md-4 mb-4">' +
    '<h3 data-trans-documents class="Resources"></h3><span class="font-14"></span></div>' +
    '<div class="col-lg-9 col-md-8 white-box p-4 fieldset-container">' +
    '<div class="col-md-6 multiline"><label data-trans-document class="Resources"></label>';

  var mainKpiConfig = null;
  if (contextKey === "mainkpis") {
    mainKpiConfig = deletedItemsBuildMainKpiAttachmentsShellHtml(
      sharePointRow,
      attachmentFiles,
    );
    filesLink += mainKpiConfig.shellHtml;
  } else {
    for (var fileIndex = 0; fileIndex < attachmentFiles.length; fileIndex++) {
      filesLink += deletedItemsBuildAttachmentFileLinkHtml(
        attachmentFiles[fileIndex],
      );
    }
  }

  filesLink += "</div></div></div></div>";
  return { html: filesLink, mainKpiConfig: mainKpiConfig };
}

function deletedItemsToKpiTargetNumOrEmpty(value) {
  if (value === null || value === undefined || value === "") {
    return "";
  }
  var numericValue = Number(value);
  if (isNaN(numericValue)) {
    return "";
  }
  return Number(numericValue.toFixed(2));
}

function deletedItemsFormatKpiTargetCellInnerHtml(value) {
  if (value === null || value === undefined || value === "") {
    return (
      '<span class="deleted-items-kpi-no-data Resources" data-trans-nodata></span>'
    );
  }
  if (value === 0) {
    return $("<span/>").text("0").html();
  }
  return $("<span/>").text(String(value)).html();
}

function deletedItemsBuildKpiTargetValueCellHtml(value) {
  var isEmpty = value === null || value === undefined || value === "";
  var cellClass = isEmpty ? ' class="deleted-items-kpi-cell-empty"' : "";
  return (
    "<td" +
    cellClass +
    ">" +
    deletedItemsFormatKpiTargetCellInnerHtml(value) +
    "</td>"
  );
}

function deletedItemsMapKpiResultRowToTargetFields(restRow) {
  return {
    Name: restRow.Name || "",
    Target: deletedItemsToKpiTargetNumOrEmpty(restRow.Target),
    Total: deletedItemsToKpiTargetNumOrEmpty(restRow.Total),
    Actual: deletedItemsToKpiTargetNumOrEmpty(restRow.Actual),
    TargetY: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetY),
    ActualY: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualY),
    TargetQ1: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetQ1),
    TargetQ2: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetQ2),
    TargetQ3: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetQ3),
    TargetQ4: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetQ4),
    ActualQ1: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualQ1),
    ActualQ2: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualQ2),
    ActualQ3: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualQ3),
    ActualQ4: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualQ4),
    TargetMid1: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetMid1),
    TargetMid2: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetMid2),
    ActualMid1: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualMid1),
    ActualMid2: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualMid2),
    TargetM1: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetM1),
    TargetM2: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetM2),
    TargetM3: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetM3),
    TargetM4: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetM4),
    TargetM5: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetM5),
    TargetM6: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetM6),
    TargetM7: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetM7),
    TargetM8: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetM8),
    TargetM9: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetM9),
    TargetM10: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetM10),
    TargetM11: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetM11),
    TargetM12: deletedItemsToKpiTargetNumOrEmpty(restRow.TargetM12),
    ActualM1: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualM1),
    ActualM2: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualM2),
    ActualM3: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualM3),
    ActualM4: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualM4),
    ActualM5: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualM5),
    ActualM6: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualM6),
    ActualM7: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualM7),
    ActualM8: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualM8),
    ActualM9: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualM9),
    ActualM10: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualM10),
    ActualM11: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualM11),
    ActualM12: deletedItemsToKpiTargetNumOrEmpty(restRow.ActualM12),
  };
}

function deletedItemsCalculateKpiTargetTotals(periodType, fields) {
  var totalTarget = 0;
  var totalActual = 0;
  if (periodType === "year") {
    totalTarget = Number(fields.TargetY) || 0;
    totalActual = Number(fields.ActualY) || 0;
  } else if (periodType === "quarter") {
    totalTarget =
      (Number(fields.TargetQ1) || 0) +
      (Number(fields.TargetQ2) || 0) +
      (Number(fields.TargetQ3) || 0) +
      (Number(fields.TargetQ4) || 0);
    totalActual =
      (Number(fields.ActualQ1) || 0) +
      (Number(fields.ActualQ2) || 0) +
      (Number(fields.ActualQ3) || 0) +
      (Number(fields.ActualQ4) || 0);
  } else if (periodType === "midterm") {
    totalTarget = (Number(fields.TargetMid1) || 0) + (Number(fields.TargetMid2) || 0);
    totalActual = (Number(fields.ActualMid1) || 0) + (Number(fields.ActualMid2) || 0);
  } else if (periodType === "monthly") {
    for (var monthIndex = 1; monthIndex <= 12; monthIndex++) {
      totalTarget += Number(fields["TargetM" + monthIndex]) || 0;
      totalActual += Number(fields["ActualM" + monthIndex]) || 0;
    }
  }
  return {
    totalTarget: Number(totalTarget.toFixed(2)),
    totalActual: Number(totalActual.toFixed(2)),
  };
}

function deletedItemsGetKpiTargetTotalDisplayValue(
  periodType,
  fields,
  valueKind,
) {
  if (periodType === "year") {
    var yearTotals = deletedItemsCalculateKpiTargetTotals(periodType, fields);
    return valueKind === "target"
      ? yearTotals.totalTarget
      : yearTotals.totalActual;
  }
  if (valueKind === "target") {
    return fields.Total !== "" ? fields.Total : "";
  }
  return fields.Actual !== "" ? fields.Actual : "";
}

function deletedItemsBuildKpiTargetTableHeadHtml(periodType) {
  var headerCells =
    '<th scope="col" data-trans-kpi class="Resources"></th>' +
    '<th scope="col"></th>' +
    '<th scope="col" data-trans-totalyearly class="Resources"></th>';
  if (periodType === "year") {
    headerCells +=
      '<th scope="col" data-trans-yearly class="Resources"></th>';
  } else if (periodType === "quarter") {
    headerCells +=
      '<th scope="col" data-trans-quart1 class="Resources"></th>' +
      '<th scope="col" data-trans-quart2 class="Resources"></th>' +
      '<th scope="col" data-trans-quart3 class="Resources"></th>' +
      '<th scope="col" data-trans-quart4 class="Resources"></th>';
  } else if (periodType === "midterm") {
    headerCells +=
      '<th scope="col" data-trans-midterm1 class="Resources"></th>' +
      '<th scope="col" data-trans-midterm2 class="Resources"></th>';
  } else if (periodType === "monthly") {
    for (var monthIndex = 1; monthIndex <= 12; monthIndex++) {
      headerCells +=
        '<th scope="col" data-trans-month' +
        monthIndex +
        ' class="Resources"></th>';
    }
  }
  return '<thead class="targetThead"><tr>' + headerCells + "</tr></thead>";
}

function deletedItemsBuildKpiTargetColgroupHtml(periodType) {
  var periodColumnCount = 1;
  if (periodType === "quarter") {
    periodColumnCount = 4;
  } else if (periodType === "midterm") {
    periodColumnCount = 2;
  } else if (periodType === "monthly") {
    periodColumnCount = 12;
  }
  var colgroupHtml =
    '<colgroup>' +
    '<col class="deleted-items-kpi-col-name" />' +
    '<col class="deleted-items-kpi-col-label" />' +
    '<col class="deleted-items-kpi-col-total" />';
  for (var columnIndex = 0; columnIndex < periodColumnCount; columnIndex++) {
    colgroupHtml += '<col class="deleted-items-kpi-col-period" />';
  }
  return colgroupHtml + "</colgroup>";
}

function deletedItemsBuildKpiTargetPeriodCellsHtml(
  periodType,
  fields,
  valueKind,
) {
  var prefix = valueKind === "target" ? "Target" : "Actual";
  var cellsHtml = "";
  if (periodType === "year") {
    cellsHtml += deletedItemsBuildKpiTargetValueCellHtml(fields[prefix + "Y"]);
  } else if (periodType === "quarter") {
    for (var quarterIndex = 1; quarterIndex <= 4; quarterIndex++) {
      cellsHtml += deletedItemsBuildKpiTargetValueCellHtml(
        fields[prefix + "Q" + quarterIndex],
      );
    }
  } else if (periodType === "midterm") {
    cellsHtml +=
      deletedItemsBuildKpiTargetValueCellHtml(fields[prefix + "Mid1"]) +
      deletedItemsBuildKpiTargetValueCellHtml(fields[prefix + "Mid2"]);
  } else if (periodType === "monthly") {
    for (var monthCellIndex = 1; monthCellIndex <= 12; monthCellIndex++) {
      cellsHtml += deletedItemsBuildKpiTargetValueCellHtml(
        fields[prefix + "M" + monthCellIndex],
      );
    }
  }
  return cellsHtml;
}

function deletedItemsBuildKpiTargetTableBodyHtml(
  periodType,
  fields,
  kpiName,
) {
  var safeKpiName = $("<span/>").text(kpiName || "").html();
  var totalTargetValue = deletedItemsGetKpiTargetTotalDisplayValue(
    periodType,
    fields,
    "target",
  );
  var totalActualValue = deletedItemsGetKpiTargetTotalDisplayValue(
    periodType,
    fields,
    "actual",
  );
  return (
    '<tbody class="targetTbody deleted-items-target-tbody">' +
    "<tr>" +
    '<th rowspan="2">' +
    safeKpiName +
    "</th>" +
    '<th scope="row" class="Resources deleted-items-kpi-row-label deleted-items-kpi-row-label-target" data-trans-target></th>' +
    deletedItemsBuildKpiTargetValueCellHtml(totalTargetValue) +
    deletedItemsBuildKpiTargetPeriodCellsHtml(periodType, fields, "target") +
    "</tr>" +
    '<tr class="actual-target">' +
    '<th scope="row" class="Resources deleted-items-kpi-row-label deleted-items-kpi-row-label-actual" data-trans-actual></th>' +
    deletedItemsBuildKpiTargetValueCellHtml(totalActualValue) +
    deletedItemsBuildKpiTargetPeriodCellsHtml(periodType, fields, "actual") +
    "</tr>" +
    "</tbody>"
  );
}

function deletedItemsBuildMainKpiTargetYearBlockHtml(
  periodType,
  fields,
  kpiName,
  displayYear,
) {
  return (
    '<div class="deleted-items-kpi-target-year-block">' +
    '<div class="deleted-items-kpi-target-year-badge">' +
    displayYear +
    "</div>" +
    '<div class="hrsd-table-responsive deleted-items-kpi-target-table-wrap">' +
    '<table class="table HrsdTable deleted-items-kpi-target-table">' +
    deletedItemsBuildKpiTargetColgroupHtml(periodType) +
    deletedItemsBuildKpiTargetTableHeadHtml(periodType) +
    deletedItemsBuildKpiTargetTableBodyHtml(periodType, fields, kpiName) +
    "</table></div></div>"
  );
}

function deletedItemsBuildMainKpiTargetSectionHtmlForAllYears(
  periodType,
  resultRows,
  kpiName,
) {
  if (!resultRows || !resultRows.length) {
    return deletedItemsBuildMainKpiTargetEmptySectionHtml();
  }
  var sectionHtml =
    '<div class="deleted-items-view-section deleted-items-kpi-target-section" id="actual-target">' +
    '<h4 class="deleted-items-view-section-title Resources deleted-items-kpi-target-section-title" data-trans-targetactualtitle></h4>';
  for (var rowIndex = 0; rowIndex < resultRows.length; rowIndex++) {
    var oneResultRow = resultRows[rowIndex];
    var displayPeriodType =
      periodType ||
      deletedItemsNormalizeKpiPeriodType(oneResultRow.PeriodType) ||
      "quarter";
    var displayYear =
      oneResultRow.Year || String(new Date().getFullYear());
    sectionHtml += deletedItemsBuildMainKpiTargetYearBlockHtml(
      displayPeriodType,
      deletedItemsMapKpiResultRowToTargetFields(oneResultRow),
      oneResultRow.Name || kpiName,
      displayYear,
    );
  }
  sectionHtml += "</div>";
  return sectionHtml;
}

function deletedItemsBuildMainKpiTargetEmptySectionHtml() {
  var currentLang = localStorage.getItem("lng");
  var emptyText =
    currentLang == null || currentLang == "ar"
      ? "لا توجد بيانات مستهدفات لهذا المؤشر."
      : "No target data found for this KPI.";
  return (
    '<div class="deleted-items-view-section deleted-items-kpi-target-section" id="actual-target">' +
    '<h4 class="deleted-items-view-section-title Resources deleted-items-kpi-target-section-title" data-trans-targetactualtitle></h4>' +
    '<div class="deleted-items-kpi-target-empty">' +
    '<img src="' +
    deletedItemsEmptyDataImage +
    '" alt="" class="deleted-items-kpi-target-empty-img" />' +
    "<p>" +
    emptyText +
    "</p></div></div>"
  );
}

function deletedItemsNormalizeKpiPeriodType(periodTypeValue) {
  var normalizedValue = String(periodTypeValue || "")
    .toLowerCase()
    .trim();
  if (
    normalizedValue === "year" ||
    normalizedValue === "quarter" ||
    normalizedValue === "midterm" ||
    normalizedValue === "monthly"
  ) {
    return normalizedValue;
  }
  return "";
}

var deletedItemsKpiResultODataSelectFields =
  "Id,Name,Target,Total,Actual,Year,PeriodType,KPI,BenefitCode,DeletionStatus," +
  "TargetY,ActualY,TargetQ1,TargetQ2,TargetQ3,TargetQ4," +
  "ActualQ1,ActualQ2,ActualQ3,ActualQ4," +
  "TargetMid1,TargetMid2,ActualMid1,ActualMid2," +
  "TargetM1,TargetM2,TargetM3,TargetM4,TargetM5,TargetM6," +
  "TargetM7,TargetM8,TargetM9,TargetM10,TargetM11,TargetM12," +
  "ActualM1,ActualM2,ActualM3,ActualM4,ActualM5,ActualM6," +
  "ActualM7,ActualM8,ActualM9,ActualM10,ActualM11,ActualM12";

function deletedItemsIsBlankBenefitCode(benefitCodeValue) {
  return benefitCodeValue == null || benefitCodeValue === "";
}

function deletedItemsFilterMainKpiResultRowsFromList(resultRows, periodType) {
  var normalizedPeriodType = deletedItemsNormalizeKpiPeriodType(periodType);
  if (!resultRows || !resultRows.length) {
    return [];
  }
  var filteredRows = [];
  for (var rowIndex = 0; rowIndex < resultRows.length; rowIndex++) {
    var oneRow = resultRows[rowIndex];
    if (!deletedItemsIsBlankBenefitCode(oneRow.BenefitCode)) {
      continue;
    }
    if (normalizedPeriodType) {
      var rowPeriodType = deletedItemsNormalizeKpiPeriodType(oneRow.PeriodType);
      if (rowPeriodType && rowPeriodType !== normalizedPeriodType) {
        continue;
      }
    }
    filteredRows.push(oneRow);
  }
  filteredRows.sort(function (rowA, rowB) {
    var yearA = parseInt(rowA.Year, 10) || 0;
    var yearB = parseInt(rowB.Year, 10) || 0;
    if (yearB !== yearA) {
      return yearB - yearA;
    }
    var idA = parseInt(rowA.Id || rowA.ID, 10) || 0;
    var idB = parseInt(rowB.Id || rowB.ID, 10) || 0;
    return idB - idA;
  });
  return filteredRows;
}

function deletedItemsGetKpiResultsCamlViewFields() {
  var fieldNames = deletedItemsKpiResultODataSelectFields.split(",");
  var viewFieldsXml = "<ViewFields>";
  for (var fieldIndex = 0; fieldIndex < fieldNames.length; fieldIndex++) {
    var fieldName = fieldNames[fieldIndex].trim();
    if (fieldName) {
      viewFieldsXml += '<FieldRef Name="' + fieldName + '" />';
    }
  }
  viewFieldsXml += "</ViewFields>";
  return viewFieldsXml;
}

function deletedItemsBuildKpiResultsPopupCamlViewXml(
  kpiCode,
  periodType,
  includeDeletionFilter,
) {
  var normalizedPeriodType = deletedItemsNormalizeKpiPeriodType(periodType);
  var benefitCodeFilter = "<IsNull><FieldRef Name='BenefitCode' /></IsNull>";
  var whereBody =
    "<And><Eq><FieldRef Name='KPI' /><Value Type='Text'>" +
    deletedItemsEscapeXmlCamlValue(kpiCode) +
    "</Value></Eq>";
  if (normalizedPeriodType) {
    whereBody +=
      "<And><Eq><FieldRef Name='PeriodType' /><Value Type='Choice'>" +
      deletedItemsEscapeXmlCamlValue(normalizedPeriodType) +
      "</Value></Eq>" +
      benefitCodeFilter +
      "</And>";
  } else {
    whereBody += benefitCodeFilter;
  }
  whereBody += "</And>";
  if (includeDeletionFilter !== false) {
    whereBody =
      "<And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
      whereBody +
      "</And>";
  }
  return (
    "<View>" +
    deletedItemsGetKpiResultsCamlViewFields() +
    "<Query><Where>" +
    whereBody +
    "</Where><OrderBy><FieldRef Name='Year' Ascending='FALSE' /><FieldRef Name='Created' Ascending='FALSE' /></OrderBy></Query><RowLimit>500</RowLimit></View>"
  );
}

function deletedItemsExecuteKpiResultsCamlQuery(viewXml, periodType) {
  return deletedItemsGetRequestDigest().then(function (requestDigest) {
    if (!requestDigest || !viewXml) {
      return [];
    }
    var requestUrl =
      _spPageContextInfo.webAbsoluteUrl +
      "/_api/web/lists/getbytitle('KPIResults')/getitems";
    return new Promise(function (resolveRow) {
      $.ajax({
        url: requestUrl,
        method: "POST",
        contentType: "application/json; odata=verbose",
        headers: {
          Accept: "application/json; odata=verbose",
          "X-RequestDigest": requestDigest,
        },
        data: JSON.stringify({
          query: {
            __metadata: { type: "SP.CamlQuery" },
            ViewXml: viewXml,
          },
        }),
        success: function (responseData) {
          var results =
            (responseData && responseData.d && responseData.d.results) || [];
          resolveRow(
            deletedItemsFilterMainKpiResultRowsFromList(results, periodType),
          );
        },
        error: function (xhr) {
          deletedItemsLogError("KPIResults CAML request failed", {
            url: requestUrl,
            status: xhr && xhr.status,
            statusText: xhr && xhr.statusText,
          });
          resolveRow([]);
        },
      });
    });
  });
}

function deletedItemsFetchKpiResultRowsWithOData(
  kpiCode,
  periodType,
  includeDeletionFilter,
) {
  var filterParts = [
    "KPI eq '" + deletedItemsEscapeQuotesForFilter(kpiCode) + "'",
  ];
  var normalizedPeriodType = deletedItemsNormalizeKpiPeriodType(periodType);
  if (normalizedPeriodType) {
    filterParts.push(
      "PeriodType eq '" +
        deletedItemsEscapeQuotesForFilter(normalizedPeriodType) +
        "'",
    );
  }
  if (includeDeletionFilter !== false) {
    filterParts.push("DeletionStatus ne 'Deleted'");
  }
  var requestUrl =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('KPIResults')/items?$select=" +
    encodeURIComponent(deletedItemsKpiResultODataSelectFields) +
    "&$filter=" +
    encodeURIComponent(filterParts.join(" and ")) +
    "&$orderby=Year desc,Created desc&$top=500";
  return deletedItemsAjaxGetListItemData(requestUrl).then(function (responseData) {
    if (!responseData) {
      return [];
    }
    var results =
      (responseData && responseData.d && responseData.d.results) || [];
    return deletedItemsFilterMainKpiResultRowsFromList(results, periodType);
  });
}

function deletedItemsMapJsomItemToKpiResultRow(oListItem) {
  if (!oListItem) {
    return null;
  }
  return {
    Name: oListItem.get_item("Name"),
    Target: oListItem.get_item("Target"),
    Total: oListItem.get_item("Total"),
    Actual: oListItem.get_item("Actual"),
    Year: oListItem.get_item("Year"),
    PeriodType: oListItem.get_item("PeriodType"),
    KPI: oListItem.get_item("KPI"),
    BenefitCode: oListItem.get_item("BenefitCode"),
    DeletionStatus: oListItem.get_item("DeletionStatus"),
    TargetY: oListItem.get_item("TargetY"),
    ActualY: oListItem.get_item("ActualY"),
    TargetQ1: oListItem.get_item("TargetQ1"),
    TargetQ2: oListItem.get_item("TargetQ2"),
    TargetQ3: oListItem.get_item("TargetQ3"),
    TargetQ4: oListItem.get_item("TargetQ4"),
    ActualQ1: oListItem.get_item("ActualQ1"),
    ActualQ2: oListItem.get_item("ActualQ2"),
    ActualQ3: oListItem.get_item("ActualQ3"),
    ActualQ4: oListItem.get_item("ActualQ4"),
    TargetMid1: oListItem.get_item("TargetMid1"),
    TargetMid2: oListItem.get_item("TargetMid2"),
    ActualMid1: oListItem.get_item("ActualMid1"),
    ActualMid2: oListItem.get_item("ActualMid2"),
    TargetM1: oListItem.get_item("TargetM1"),
    TargetM2: oListItem.get_item("TargetM2"),
    TargetM3: oListItem.get_item("TargetM3"),
    TargetM4: oListItem.get_item("TargetM4"),
    TargetM5: oListItem.get_item("TargetM5"),
    TargetM6: oListItem.get_item("TargetM6"),
    TargetM7: oListItem.get_item("TargetM7"),
    TargetM8: oListItem.get_item("TargetM8"),
    TargetM9: oListItem.get_item("TargetM9"),
    TargetM10: oListItem.get_item("TargetM10"),
    TargetM11: oListItem.get_item("TargetM11"),
    TargetM12: oListItem.get_item("TargetM12"),
    ActualM1: oListItem.get_item("ActualM1"),
    ActualM2: oListItem.get_item("ActualM2"),
    ActualM3: oListItem.get_item("ActualM3"),
    ActualM4: oListItem.get_item("ActualM4"),
    ActualM5: oListItem.get_item("ActualM5"),
    ActualM6: oListItem.get_item("ActualM6"),
    ActualM7: oListItem.get_item("ActualM7"),
    ActualM8: oListItem.get_item("ActualM8"),
    ActualM9: oListItem.get_item("ActualM9"),
    ActualM10: oListItem.get_item("ActualM10"),
    ActualM11: oListItem.get_item("ActualM11"),
    ActualM12: oListItem.get_item("ActualM12"),
  };
}

function deletedItemsFetchKpiResultRowsWithJsom(
  kpiCode,
  periodType,
  includeDeletionFilter,
) {
  return new Promise(function (resolveRows) {
    if (
      typeof SP === "undefined" ||
      !SP.ClientContext ||
      !SP.CamlQuery
    ) {
      resolveRows([]);
      return;
    }
    try {
      var viewXml = deletedItemsBuildKpiResultsPopupCamlViewXml(
        kpiCode,
        periodType,
        includeDeletionFilter,
      );
      var clientContext = SP.ClientContext.get_current();
      var oList = clientContext.get_web().get_lists().getByTitle("KPIResults");
      var camlQuery = new SP.CamlQuery();
      camlQuery.set_viewXml(viewXml);
      var collListItem = oList.getItems(camlQuery);
      clientContext.load(collListItem);
      clientContext.executeQueryAsync(
        function () {
          var mappedRows = [];
          var listItemEnum = collListItem.getEnumerator();
          while (listItemEnum.moveNext()) {
            mappedRows.push(
              deletedItemsMapJsomItemToKpiResultRow(listItemEnum.get_current()),
            );
          }
          resolveRows(
            deletedItemsFilterMainKpiResultRowsFromList(mappedRows, periodType),
          );
        },
        function (_sender, args) {
          deletedItemsLogError("KPIResults JSOM request failed", {
            message: args && args.get_message ? args.get_message() : "unknown",
          });
          resolveRows([]);
        },
      );
    } catch (jsomError) {
      deletedItemsLogError("KPIResults JSOM exception", { error: jsomError });
      resolveRows([]);
    }
  });
}

function deletedItemsFetchAllKpiResultRowsForMainKpiPopup(kpiCode, periodType) {
  return deletedItemsFetchKpiResultRowsWithOData(kpiCode, periodType, false)
    .then(function (resultRows) {
      if (resultRows && resultRows.length) {
        return resultRows;
      }
      return deletedItemsExecuteKpiResultsCamlQuery(
        deletedItemsBuildKpiResultsPopupCamlViewXml(
          kpiCode,
          periodType,
          false,
        ),
        periodType,
      );
    })
    .then(function (resultRows) {
      if (resultRows && resultRows.length) {
        return resultRows;
      }
      return deletedItemsFetchKpiResultRowsWithJsom(
        kpiCode,
        periodType,
        false,
      );
    })
    .then(function (resultRows) {
      return resultRows || [];
    });
}

function deletedItemsLoadMainKpiTargetSectionForPopup(sharePointRow, itemTitle) {
  var kpiCode = itemTitle || sharePointRow.Title || "";
  var periodType = deletedItemsNormalizeKpiPeriodType(sharePointRow.PeriodType);
  var kpiName = sharePointRow.Name || kpiCode;
  if (!kpiCode) {
    return Promise.resolve(deletedItemsBuildMainKpiTargetEmptySectionHtml());
  }
  return deletedItemsFetchAllKpiResultRowsForMainKpiPopup(
    kpiCode,
    periodType,
  ).then(function (resultRows) {
    if (!resultRows || !resultRows.length) {
      return deletedItemsBuildMainKpiTargetEmptySectionHtml();
    }
    return deletedItemsBuildMainKpiTargetSectionHtmlForAllYears(
      periodType,
      resultRows,
      kpiName,
    );
  });
}

function deletedItemsAjaxGetListItemData(requestUrl) {
  return new Promise(function (resolvePromise) {
    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (responseData) {
        resolvePromise(responseData);
      },
      error: function () {
        resolvePromise(null);
      },
    });
  });
}

function deletedItemsChunkFieldNames(fieldNames, chunkSize) {
  var chunks = [];
  for (var startIndex = 0; startIndex < fieldNames.length; startIndex += chunkSize) {
    chunks.push(fieldNames.slice(startIndex, startIndex + chunkSize));
  }
  return chunks;
}

function deletedItemsMergeItemFieldData(targetRow, sourceRow) {
  if (!sourceRow) {
    return targetRow;
  }
  for (var fieldName in sourceRow) {
    if (Object.prototype.hasOwnProperty.call(sourceRow, fieldName)) {
      targetRow[fieldName] = sourceRow[fieldName];
    }
  }
  return targetRow;
}

function deletedItemsFetchListItemByIdSelect(
  listTitle,
  itemId,
  selectParts,
  expandParts,
) {
  if (!itemId || !selectParts || !selectParts.length) {
    return Promise.resolve(null);
  }
  var requestUrl =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('" +
    listTitle.replace(/'/g, "''") +
    "')/items(" +
    itemId +
    ")?$select=" +
    encodeURIComponent(selectParts.join(","));
  if (expandParts && expandParts.length) {
    requestUrl += "&$expand=" + encodeURIComponent(expandParts.join(","));
  }
  return deletedItemsAjaxGetListItemData(requestUrl).then(function (responseData) {
    return responseData && responseData.d ? responseData.d : null;
  });
}

function deletedItemsFetchListItemFieldsWithFallback(
  listTitle,
  itemId,
  fieldNames,
) {
  if (!fieldNames || !fieldNames.length) {
    return Promise.resolve({});
  }
  return deletedItemsFetchListItemByIdSelect(listTitle, itemId, fieldNames, []).then(
    function (batchRow) {
      if (batchRow) {
        return batchRow;
      }
      if (fieldNames.length === 1) {
        return {};
      }
      var singleFieldPromises = [];
      for (var fieldIndex = 0; fieldIndex < fieldNames.length; fieldIndex++) {
        (function (oneFieldName) {
          singleFieldPromises.push(
            deletedItemsFetchListItemByIdSelect(listTitle, itemId, [oneFieldName], []).then(
              function (oneFieldRow) {
                return oneFieldRow || {};
              },
            ),
          );
        })(fieldNames[fieldIndex]);
      }
      return Promise.all(singleFieldPromises).then(function (singleFieldRows) {
        var mergedRow = {};
        for (var rowIndex = 0; rowIndex < singleFieldRows.length; rowIndex++) {
          deletedItemsMergeItemFieldData(mergedRow, singleFieldRows[rowIndex]);
        }
        return mergedRow;
      });
    },
  );
}

function deletedItemsFetchSharePointItemForView(listTitle, itemTitle, viewFields) {
  var filterPart =
    "Title eq '" + deletedItemsEscapeQuotesForFilter(itemTitle) + "'";
  var idLookupUrl =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('" +
    listTitle.replace(/'/g, "''") +
    "')/items?$select=Id,Title&$filter=" +
    encodeURIComponent(filterPart) +
    "&$top=1";

  return deletedItemsAjaxGetListItemData(idLookupUrl).then(function (idResponse) {
    var idRows =
      (idResponse && idResponse.d && idResponse.d.results) || [];
    if (!idRows.length || !idRows[0].Id) {
      return null;
    }

    var itemId = idRows[0].Id;
    var scalarFieldNames = ["Title"];
    var pickerFieldNames = [];

    for (var fieldIndex = 0; fieldIndex < viewFields.length; fieldIndex++) {
      var oneField = viewFields[fieldIndex];
      var fieldName = oneField.sharePointColumnInternalName;
      if (!fieldName) {
        continue;
      }
      var fieldKind = String(oneField.type || "").toLowerCase();
      if (fieldKind === "picker") {
        if (pickerFieldNames.indexOf(fieldName) === -1) {
          pickerFieldNames.push(fieldName);
        }
      } else if (scalarFieldNames.indexOf(fieldName) === -1) {
        scalarFieldNames.push(fieldName);
      }
    }

    var scalarBatches = deletedItemsChunkFieldNames(scalarFieldNames, 20);
    var fetchPromises = [];

    for (var batchIndex = 0; batchIndex < scalarBatches.length; batchIndex++) {
      fetchPromises.push(
        deletedItemsFetchListItemFieldsWithFallback(
          listTitle,
          itemId,
          scalarBatches[batchIndex],
        ),
      );
    }

    for (var pickerIndex = 0; pickerIndex < pickerFieldNames.length; pickerIndex++) {
      var pickerFieldName = pickerFieldNames[pickerIndex];
      fetchPromises.push(
        deletedItemsFetchListItemByIdSelect(
          listTitle,
          itemId,
          [pickerFieldName + "/Title"],
          [pickerFieldName],
        ).then(function (pickerRow) {
          return pickerRow || {};
        }),
      );
    }

    return Promise.all(fetchPromises).then(function (partialRows) {
      var mergedRow = { Id: itemId, Title: itemTitle };
      for (var partIndex = 0; partIndex < partialRows.length; partIndex++) {
        deletedItemsMergeItemFieldData(mergedRow, partialRows[partIndex]);
      }
      return mergedRow;
    });
  });
}

function deletedItemsOpenItemDetailsPopup(contextKey, itemTitle) {
  if (!contextKey || !itemTitle) {
    return;
  }
  var viewContext = deletedItemsGetViewContextConfig(contextKey);
  if (!viewContext) {
    return;
  }
  var currentLang = localStorage.getItem("lng");
  var loadingText =
    currentLang == null || currentLang == "ar"
      ? "جاري تحميل التفاصيل…"
      : "Loading details…";
  var popupTitle =
    currentLang == null || currentLang == "ar"
      ? viewContext.popupTitleArabic
      : viewContext.popupTitleEnglish;
  popupTitle = popupTitle + " — " + itemTitle;
  var requestId = ++deletedItemsDetailsPopupRequestId;
  deletedItemsShowDetailsPopup(
    popupTitle,
    '<p class="deleted-items-details-loading">' + loadingText + "</p>",
  );

  deletedItemsLoadViewFormSectionsFromJson(viewContext.viewJsonUrl)
    .then(function (viewSections) {
      var viewFields = deletedItemsCollectViewFieldsFromSections(viewSections);
      return deletedItemsFetchSharePointItemForView(
        viewContext.listTitle,
        itemTitle,
        viewFields,
      ).then(function (sharePointRow) {
        return {
          viewSections: viewSections,
          viewFields: viewFields,
          sharePointRow: sharePointRow,
        };
      });
    })
    .then(function (payload) {
      if (requestId !== deletedItemsDetailsPopupRequestId) {
        return;
      }
      if (!payload || !payload.sharePointRow) {
        var notFoundText =
          currentLang == null || currentLang == "ar"
            ? "تعذر تحميل التفاصيل."
            : "Failed to load details.";
        $(".deleted-items-details-popup .deleted-items-details-body").html(
          '<p class="deleted-items-details-empty">' + notFoundText + "</p>",
        );
        return;
      }
      return deletedItemsResolveViewDetailsForPopup(
        payload.sharePointRow,
        payload.viewSections,
        payload.viewFields,
      )
        .then(function (resolvedRow) {
          return deletedItemsEnsureAttachmentFieldsOnRow(
            contextKey,
            viewContext.listTitle,
            payload.sharePointRow,
          ).then(function (attachmentRow) {
            return deletedItemsLoadAttachmentsForDetailsPopup(
              contextKey,
              attachmentRow,
              itemTitle,
            ).then(function (attachmentFiles) {
              return {
                resolvedRow: resolvedRow,
                attachmentFiles: attachmentFiles,
                attachmentRow: attachmentRow,
              };
            });
          });
        })
        .then(function (detailsPayload) {
        if (requestId !== deletedItemsDetailsPopupRequestId) {
          return;
        }
        if (!detailsPayload) {
          return;
        }
        var detailsHtml = deletedItemsBuildViewDetailsHtml(
          payload.viewSections,
          detailsPayload.resolvedRow,
        );
        var attachmentsResult = deletedItemsBuildAttachmentsSectionHtml(
          contextKey,
          detailsPayload.attachmentRow,
          detailsPayload.attachmentFiles,
        );
        var renderDetailsPopupBody = function (targetSectionHtml) {
          var $popupBody = $(
            ".deleted-items-details-popup .deleted-items-details-body",
          );
          $popupBody.html(
            detailsHtml + attachmentsResult.html + (targetSectionHtml || ""),
          );
          if (contextKey === "mainkpis" && attachmentsResult.mainKpiConfig) {
            deletedItemsInitMainKpiAttachmentsInPopup(
              $popupBody,
              attachmentsResult.mainKpiConfig,
            );
          }
          if (typeof changeResources === "function") {
            changeResources();
          }
        };
        if (contextKey === "mainkpis") {
          return deletedItemsLoadMainKpiTargetSectionForPopup(
            detailsPayload.attachmentRow,
            itemTitle,
          ).then(renderDetailsPopupBody);
        }
        renderDetailsPopupBody("");
      });
    })
    .catch(function (popupError) {
      deletedItemsLogError("Details popup failed", popupError);
    });
}

window.deletedItemsOpenItemDetailsPopup = deletedItemsOpenItemDetailsPopup;

function deletedItemsGetPaginationTotalPages(totalItems) {
  if (!totalItems) {
    return 1;
  }
  return Math.ceil(totalItems / deletedItemsPageSize);
}

function deletedItemsBuildPaginationButtonsHtml(currentPage, totalPages) {
  var html = "";
  html +=
    '<button type="button" class="pagebtn prev-page"' +
    (currentPage === 1 ? " disabled" : "") +
    ' data-dir="prev"><i class="fas fa-chevron-left"></i></button>';
  html +=
    '<button type="button" class="pagebtn next-page"' +
    (currentPage === totalPages || totalPages === 0 ? " disabled" : "") +
    ' data-dir="next"><i class="fas fa-chevron-right"></i></button>';
  return html;
}

function deletedItemsBuildPaginationSectionHtml(
  paginationKey,
  totalItems,
  currentPage,
) {
  var totalPages = deletedItemsGetPaginationTotalPages(totalItems);
  return (
    '<div class="PaginationSection deleted-items-pagination d-flex justify-content-between align-items-center"' +
    ' data-pagination-key="' +
    deletedItemsEscapeHtmlAttribute(paginationKey) +
    '">' +
    '<span><span class="totalOfItems">' +
    totalItems +
    '</span><span class="Resources" data-trans-records></span></span>' +
    '<div class="pagination-buttons-details">' +
    deletedItemsBuildPaginationButtonsHtml(currentPage, totalPages) +
    "</div></div>"
  );
}

function deletedItemsRenderPaginatedTableForKey(paginationKey) {
  var state = deletedItemsPaginationByKey[paginationKey];
  if (!state || !state.$host || !state.$host.length) {
    return;
  }
  var totalItems = state.allRows ? state.allRows.length : 0;
  var totalPages = deletedItemsGetPaginationTotalPages(totalItems);
  var currentPage = state.currentPage || 1;
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  if (currentPage < 1) {
    currentPage = 1;
  }
  state.currentPage = currentPage;

  var startIndex = (currentPage - 1) * deletedItemsPageSize;
  var pageRows = totalItems
    ? state.allRows.slice(startIndex, startIndex + deletedItemsPageSize)
    : [];

  var tableHtml = deletedItemsBuildTableHtml(
    pageRows,
    state.columns,
    state.emptyMessage,
    state.tableOptions,
  );
  var paginationHtml = deletedItemsBuildPaginationSectionHtml(
    paginationKey,
    totalItems,
    currentPage,
  );

  state.$host.html(
    '<div class="deleted-items-table-with-pagination">' +
      tableHtml +
      paginationHtml +
      "</div>",
  );

  if (typeof state.afterRender === "function") {
    state.afterRender(state.allRows);
  }
  if (typeof changeResources === "function") {
    changeResources();
  }
}

function deletedItemsRegisterPaginatedTable(
  paginationKey,
  $host,
  allRows,
  columnsForTable,
  messageWhenTableIsEmpty,
  tableOptions,
  resetPage,
  afterRender,
) {
  var state = deletedItemsPaginationByKey[paginationKey] || {};
  state.$host = $host;
  state.allRows = allRows || [];
  state.columns = columnsForTable;
  state.emptyMessage = messageWhenTableIsEmpty;
  state.tableOptions = tableOptions || {};
  state.afterRender = afterRender || null;
  if (resetPage) {
    state.currentPage = 1;
  } else if (!state.currentPage) {
    state.currentPage = 1;
  }
  deletedItemsPaginationByKey[paginationKey] = state;
  deletedItemsRenderPaginatedTableForKey(paginationKey);
}

// Build table HTML for a listing or related child table
function deletedItemsBuildTableHtml(
  sharePointRows,
  columnsForTable,
  messageWhenTableIsEmpty,
  tableOptions,
) {
  tableOptions = tableOptions || {};
  var currentLang = localStorage.getItem("lng");
  var detailsContextKey = tableOptions.detailsContextKey || "";
  var showDetailsColumn = !!detailsContextKey;
  var detailsHeaderText =
    currentLang == null || currentLang == "ar" ? "التفاصيل" : "Details";
  var headerHtml = "<thead><tr>";
  for (
    var columnIndex = 0;
    columnIndex < columnsForTable.length;
    columnIndex++
  ) {
    var oneColumn = columnsForTable[columnIndex];
    var headerText =
      currentLang == null || currentLang == "ar"
        ? oneColumn.headerTextArabic || oneColumn.headerTextEnglish
        : oneColumn.headerTextEnglish || oneColumn.headerTextArabic;
    headerHtml =
      headerHtml + "<th>" + $("<div/>").text(headerText).html() + "</th>";
  }
  if (showDetailsColumn) {
    headerHtml +=
      '<th class="deleted-items-detail-col">' +
      $("<span/>").text(detailsHeaderText).html() +
      "</th>";
  }
  headerHtml = headerHtml + "</tr></thead>";

  var bodyHtml = "<tbody>";
  if (!sharePointRows || !sharePointRows.length) {
    var messageToShow = messageWhenTableIsEmpty;
    if (!messageToShow) {
      messageToShow = deletedItemsGetEmptyLabelText();
    }
    var safeMessage = $("<span/>").text(messageToShow).html();
    bodyHtml =
      bodyHtml +
      '<tr><td colspan="' +
      (columnsForTable.length + (showDetailsColumn ? 1 : 0)) +
      '"><span class="no-data-td"><span class="Resources" data-trans-nofilterdata>' +
      safeMessage +
      '</span><img src="' +
      deletedItemsEmptyDataImage +
      '" /></span>' +
      "</td></tr>";
  } else {
    for (var rowIndex = 0; rowIndex < sharePointRows.length; rowIndex++) {
      var oneSharePointRow = sharePointRows[rowIndex];
      var rowOpenTag = "<tr";
      if (tableOptions.initiativeRowsClickable) {
        var initiativeCode = oneSharePointRow.Title;
        if (initiativeCode != null && initiativeCode !== "") {
          rowOpenTag =
            rowOpenTag +
            ' class="deleted-items-initiative-row" role="button" tabindex="0"' +
            ' data-initiative-code="' +
            deletedItemsEscapeHtmlAttribute(initiativeCode) +
            '"';
        }
      }
      bodyHtml = bodyHtml + rowOpenTag + ">";
      for (
        var cellColumnIndex = 0;
        cellColumnIndex < columnsForTable.length;
        cellColumnIndex++
      ) {
        var columnForCell = columnsForTable[cellColumnIndex];
        var fieldName = columnForCell.sharePointColumnInternalName;
        var rawCellValue = oneSharePointRow[fieldName];
        var shownText = deletedItemsFormatOneTableCell(
          rawCellValue,
          columnForCell,
        );
        bodyHtml =
          bodyHtml + "<td>" + $("<span/>").text(shownText).html() + "</td>";
      }
      if (showDetailsColumn) {
        var itemTitleForDetails = oneSharePointRow.Title;
        var detailCellHtml = '<td class="deleted-items-detail-col"></td>';
        if (itemTitleForDetails != null && itemTitleForDetails !== "") {
          detailCellHtml =
            '<td class="deleted-items-detail-col">' +
            '<button type="button" class="deleted-items-view-detail-btn" title="' +
            $("<span/>").text(detailsHeaderText).html() +
            '" data-context-key="' +
            deletedItemsEscapeHtmlAttribute(detailsContextKey) +
            '" data-item-title="' +
            deletedItemsEscapeHtmlAttribute(String(itemTitleForDetails)) +
            '"><i class="fas fa-eye" aria-hidden="true"></i></button>' +
            "</td>";
        }
        bodyHtml = bodyHtml + detailCellHtml;
      }
      bodyHtml = bodyHtml + "</tr>";
    }
  }
  bodyHtml = bodyHtml + "</tbody>";
  return (
    '<div class="hrsd-table-responsive deleted-items-data-table-wrap"><table class="table HrsdTable deleted-items-data-table">' +
    headerHtml +
    bodyHtml +
    "</table></div>"
  );
}

// Populate a select from SharePoint list items
function deletedItemsFillSelectFromList(
  sharePointListTitle,
  selectElementSelector,
  optionValueFieldName,
  optionTextFieldName,
  optionTextFieldNameEnglish,
  extraOdataFilter,
  orderByFieldNames,
  skipDeletionStatusFilter,
) {
  return new Promise(function (resolvePromise) {
    if (!sharePointListTitle || !selectElementSelector) {
      resolvePromise();
      return;
    }
    if (!optionValueFieldName) {
      optionValueFieldName = "Title";
    }
    if (!optionTextFieldName) {
      optionTextFieldName = "Title";
    }

    var currentLang = localStorage.getItem("lng");
    var filterParts = "";
    if (skipDeletionStatusFilter) {
      filterParts = extraOdataFilter || "";
    } else {
      filterParts = "DeletionStatus ne 'Deleted'";
      if (extraOdataFilter) {
        filterParts = filterParts + " and " + extraOdataFilter;
      }
    }

    var requestUrl =
      _spPageContextInfo.webAbsoluteUrl +
      "/_api/web/lists/getbytitle('" +
      sharePointListTitle.replace(/'/g, "''") +
      "')/items?$top=5000&$filter=" +
      encodeURIComponent(filterParts);
    if (orderByFieldNames) {
      requestUrl =
        requestUrl +
        "&$orderby=" +
        encodeURIComponent(orderByFieldNames);
    }

    var selectList =
      optionValueFieldName + "," + optionTextFieldName;
    if (optionTextFieldNameEnglish) {
      selectList =
        selectList + "," + optionTextFieldNameEnglish;
    }
    requestUrl =
      requestUrl + "&$select=" + encodeURIComponent(selectList);

    $.ajax({
      url: requestUrl,
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (responseData) {
        var selectJquery = $(selectElementSelector);
        selectJquery.empty();
        selectJquery.append(
          '<option value="" selected disabled data-trans-chooseData class="Resources"></option>',
        );
        var resultsArray =
          (responseData &&
            responseData.d &&
            responseData.d.results) ||
          [];
        for (var i = 0; i < resultsArray.length; i++) {
          var listItem = resultsArray[i];
          var optionLabel = "";
          if (optionTextFieldNameEnglish) {
            if (currentLang == null || currentLang == "ar") {
              optionLabel = listItem[optionTextFieldName] || "";
            } else {
              optionLabel =
                listItem[optionTextFieldNameEnglish] ||
                listItem[optionTextFieldName] ||
                "";
            }
          } else {
            optionLabel =
              listItem[optionTextFieldName] != null
                ? listItem[optionTextFieldName]
                : "";
          }
          var optionValue =
            listItem[optionValueFieldName] != null
              ? listItem[optionValueFieldName]
              : "";
          selectJquery.append(
            $("<option></option>").attr("value", optionValue).text(optionLabel),
          );
        }
        if (typeof changeResources === "function") {
          changeResources();
        }
        resolvePromise();
      },
      error: function () {
        resolvePromise();
      },
    });
  });
}

// Strategy type field internal name depends on parent list
function deletedItemsGetStrategyTypeFieldName(activeTabType) {
  if (activeTabType === "initiatives") {
    return "Types";
  }
  if (activeTabType === "objectives" || activeTabType === "mainkpis") {
    return "Class";
  }
  if (activeTabType === "projects") {
    return "InitiativeType";
  }
  return "Types";
}

// Parent table filter: deleted rows plus tab-specific filters
function deletedItemsBuildFilterForDeletedObjectives(activeTabType) {
  var filterPieces = ["DeletionStatus eq 'Deleted'"];
  var selectedSectorValue = $("#Sector").val();
  var selectedSubSectorValue = $("#SubSector").val();
  var selectedStrategyTypeValue = $("#strategyType").val();
  var selectedRelatedStrategyValue = $("#RelatedStrategy").val();
  var selectedRelatedInitiativeValue = $("#RelatedInitiative").val();
  if (
    selectedStrategyTypeValue &&
    (activeTabType === "objectives" ||
      activeTabType === "mainkpis" ||
      activeTabType === "initiatives" ||
      activeTabType === "projects")
  ) {
    filterPieces.push(
      deletedItemsGetStrategyTypeFieldName(activeTabType) +
        " eq '" +
        deletedItemsEscapeQuotesForFilter(selectedStrategyTypeValue) +
        "'",
    );
  }
  if (selectedSectorValue) {
    filterPieces.push(
      "Sector eq '" +
        deletedItemsEscapeQuotesForFilter(selectedSectorValue) +
        "'",
    );
  }
  if (selectedSubSectorValue) {
    filterPieces.push(
      "SubSector eq '" +
        deletedItemsEscapeQuotesForFilter(selectedSubSectorValue) +
        "'",
    );
  }
  if (
    selectedRelatedStrategyValue &&
    (activeTabType === "objectives" || activeTabType === "initiatives")
  ) {
    filterPieces.push(
      "RelatedStrategy eq '" +
        deletedItemsEscapeQuotesForFilter(selectedRelatedStrategyValue) +
        "'",
    );
  }
  if (selectedRelatedInitiativeValue && activeTabType === "projects") {
    filterPieces.push(
      "RelatedInitiative eq '" +
        deletedItemsEscapeQuotesForFilter(selectedRelatedInitiativeValue) +
        "'",
    );
  }
  return filterPieces.join(" and ");
}

// Page bootstrap after DOM container is ready
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
          <button type="button" class="deleted-item-tab-btn" data-item-type="objectives">
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

        <div class="deleted-items-filters-shell mb-3 d-none" id="deletedItemsFiltersSection">
          <div class="row deleted-items-filters-row">
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
                <label for="strategyType" class="filter-label">
                  <i class="fas fa-layer-group"></i>
                  <span data-trans-strategytype class="Resources"></span>
                </label>
                <select id="strategyType" class="form-control">
                  <option value="" selected disabled data-trans-chooseData class="Resources"></option>
                </select>
              </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-3" id="relatedStrategyFilterWrap">
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
            <div class="col-xl-3 col-md-6 mb-3 d-none" id="relatedInitiativeFilterWrap">
              <div class="filter-field-card">
                <label for="RelatedInitiative" class="filter-label">
                  <i class="fas fa-lightbulb"></i>
                  <span data-trans-relatedinitiative class="Resources"></span>
                </label>
                <select id="RelatedInitiative" class="form-control">
                  <option value="" selected disabled data-trans-chooseData class="Resources"></option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="row d-none" id="deletedItemsTableSection">
          <div class="col-12">
            <div class="deleted-items-listing-placeholder">
              <div id="deletedItemsTableHost" class="deleted-items-table-host mt-3"></div>
            </div>
            <div id="deletedItemsInitiativeRelatedSection" class="deleted-items-initiative-related-section d-none">
              <div class="deleted-items-related-card">
                <div class="deleted-items-related-header">
                  <div class="deleted-items-related-header-icon" aria-hidden="true">
                    <i class="fas fa-link"></i>
                  </div>
                  <div class="deleted-items-related-header-text">
                    <span id="deletedItemsInitiativeRelatedLabel" class="deleted-items-related-header-title"></span>
                    <span id="deletedItemsInitiativeRelatedCode" class="deleted-items-related-code-badge"></span>
                  </div>
                </div>
                <div class="deleted-items-related-tabs-shell">
                  <ul class="nav deleted-items-related-nav mb-0" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button type="button"
                        class="nav-link deleted-items-related-nav-link active"
                        data-parent-tab="initiatives"
                        data-related-key="initiativemilestones"
                        role="tab"
                        aria-selected="true">
                        <span class="deleted-items-related-tab-icon"><i class="fas fa-flag-checkered" aria-hidden="true"></i></span>
                        <span class="deleted-items-related-tab-label Resources" data-trans-inptitle10></span>
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button type="button"
                        class="nav-link deleted-items-related-nav-link"
                        data-parent-tab="initiatives"
                        data-related-key="initiativedeliverables"
                        role="tab"
                        aria-selected="false">
                        <span class="deleted-items-related-tab-icon"><i class="fas fa-box-open" aria-hidden="true"></i></span>
                        <span class="deleted-items-related-tab-label Resources" data-trans-delinioutput></span>
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button type="button"
                        class="nav-link deleted-items-related-nav-link"
                        data-parent-tab="initiatives"
                        data-related-key="initiativerisks"
                        role="tab"
                        aria-selected="false">
                        <span class="deleted-items-related-tab-icon"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i></span>
                        <span class="deleted-items-related-tab-label Resources" data-trans-ptitle7></span>
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button type="button"
                        class="nav-link deleted-items-related-nav-link"
                        data-parent-tab="initiatives"
                        data-related-key="initiativeissues"
                        role="tab"
                        aria-selected="false">
                        <span class="deleted-items-related-tab-icon"><i class="fas fa-calendar-times" aria-hidden="true"></i></span>
                        <span class="deleted-items-related-tab-label Resources" data-trans-inptitle12></span>
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button type="button"
                        class="nav-link deleted-items-related-nav-link"
                        data-parent-tab="initiatives"
                        data-related-key="benefits"
                        role="tab"
                        aria-selected="false">
                        <span class="deleted-items-related-tab-icon"><i class="fas fa-hand-holding-heart" aria-hidden="true"></i></span>
                        <span class="deleted-items-related-tab-label Resources" data-trans-inptitle11></span>
                      </button>
                    </li>
                    <li class="nav-item d-none" role="presentation">
                      <button type="button"
                        class="nav-link deleted-items-related-nav-link"
                        data-parent-tab="projects"
                        data-related-key="milestones"
                        role="tab"
                        aria-selected="false">
                        <span class="deleted-items-related-tab-icon"><i class="fas fa-flag-checkered" aria-hidden="true"></i></span>
                        <span class="deleted-items-related-tab-label Resources" data-trans-milestones></span>
                      </button>
                    </li>
                    <li class="nav-item d-none" role="presentation">
                      <button type="button"
                        class="nav-link deleted-items-related-nav-link"
                        data-parent-tab="projects"
                        data-related-key="deliverables"
                        role="tab"
                        aria-selected="false">
                        <span class="deleted-items-related-tab-icon"><i class="fas fa-box-open" aria-hidden="true"></i></span>
                        <span class="deleted-items-related-tab-label Resources" data-trans-deliverables></span>
                      </button>
                    </li>
                    <li class="nav-item d-none" role="presentation">
                      <button type="button"
                        class="nav-link deleted-items-related-nav-link"
                        data-parent-tab="projects"
                        data-related-key="risks"
                        role="tab"
                        aria-selected="false">
                        <span class="deleted-items-related-tab-icon"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i></span>
                        <span class="deleted-items-related-tab-label Resources" data-trans-risks></span>
                      </button>
                    </li>
                    <li class="nav-item d-none" role="presentation">
                      <button type="button"
                        class="nav-link deleted-items-related-nav-link"
                        data-parent-tab="projects"
                        data-related-key="issues"
                        role="tab"
                        aria-selected="false">
                        <span class="deleted-items-related-tab-icon"><i class="fas fa-calendar-times" aria-hidden="true"></i></span>
                        <span class="deleted-items-related-tab-label Resources" data-trans-issues></span>
                      </button>
                    </li>
                  </ul>
                </div>
                <div class="deleted-items-related-panel">
                  <div id="deletedItemsInitiativeRelatedHost" class="deleted-items-table-host"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);

    // Reload active tab table
    function deletedItemsPageLoadDeletedItemsTable() {
      var activeTabType = $(".deleted-item-tab-btn.active").data("item-type");
      if (
        activeTabType !== "objectives" &&
        activeTabType !== "mainkpis" &&
        activeTabType !== "initiatives" &&
        activeTabType !== "projects"
      ) {
        return;
      }
      if (
        !deletedItemsListingColumnsByTab[activeTabType] ||
        !deletedItemsListingColumnsByTab[activeTabType].length
      ) {
        deletedItemsLoadColumnsFromStyleLibraryByTab(activeTabType).then(function () {
          deletedItemsPageLoadDeletedItemsTable();
        });
        return;
      }
      var tableHostElement = $("#deletedItemsTableHost");
      var currentLang = localStorage.getItem("lng");
      var tabConfig = deletedItemsGetTabConfig(activeTabType);

      var loadingArabic = "جاري التحميل…";
      var loadingEnglish = "Loading…";
      var loadingText =
        currentLang == null || currentLang == "ar"
          ? loadingArabic
          : loadingEnglish;
      if (activeTabType !== "initiatives" && activeTabType !== "projects") {
        deletedItemsHideInitiativeRelatedPanel();
      }
      var preservedInitiativeCode =
        activeTabType === "initiatives" || activeTabType === "projects"
          ? deletedItemsSelectedInitiativeCode
          : "";
      tableHostElement.html(
        '<p class="text-muted deleted-items-table-hint mb-0">' +
          loadingText +
          "</p>",
      );

      var columnsForThisTable = deletedItemsListingColumnsByTab[activeTabType];
      var selectAndExpand = deletedItemsBuildSelectAndExpandForObjectives(columnsForThisTable);
      var odataFilter = deletedItemsBuildFilterForDeletedObjectives(activeTabType);
      var requestUrlForSos =
        _spPageContextInfo.webAbsoluteUrl +
        "/_api/web/lists/getbytitle('" +
        tabConfig.listTitle +
        "')/items?$select=" +
        encodeURIComponent(selectAndExpand.select) +
        "&$filter=" +
        encodeURIComponent(odataFilter) +
        "&$orderby=Title&$top=5000";
      if (selectAndExpand.expand) {
        requestUrlForSos += "&$expand=" + encodeURIComponent(selectAndExpand.expand);
      }

      $.ajax({
        url: requestUrlForSos,
        method: "GET",
        headers: { Accept: "application/json; odata=verbose" },
        success: function (responseData) {
          var sharePointRows =
            (responseData &&
              responseData.d &&
              responseData.d.results) ||
            [];
          var emptyTableArabic = tabConfig.emptyArabic;
          var emptyTableEnglish = tabConfig.emptyEnglish;
          var emptyTableMessage =
            currentLang == null || currentLang == "ar"
              ? emptyTableArabic
              : emptyTableEnglish;
          deletedItemsResolveLookupColumnsOnRows(
            sharePointRows,
            columnsForThisTable,
          ).then(function (rowsAfterLookups) {
            deletedItemsRegisterPaginatedTable(
              "deleted-items-main",
              tableHostElement,
              rowsAfterLookups,
              columnsForThisTable,
              emptyTableMessage,
              {
                initiativeRowsClickable:
                  activeTabType === "initiatives" || activeTabType === "projects",
                detailsContextKey: activeTabType,
              },
              true,
              function (allRows) {
                if (
                  (activeTabType === "initiatives" ||
                    activeTabType === "projects") &&
                  preservedInitiativeCode
                ) {
                  deletedItemsSyncInitiativeRelatedPanelAfterParentReload(
                    allRows,
                    preservedInitiativeCode,
                  );
                }
              },
            );
          });
        },
        error: function () {
          var errorArabic = "تعذر تحميل البيانات.";
          var errorEnglish = "Failed to load data.";
          var errorText =
            currentLang == null || currentLang == "ar"
              ? errorArabic
              : errorEnglish;
          tableHostElement.html(
            '<p class="text-danger deleted-items-table-hint mb-0">' +
              errorText +
              "</p>",
          );
          if (
            (activeTabType === "initiatives" || activeTabType === "projects") &&
            preservedInitiativeCode
          ) {
            deletedItemsSyncInitiativeRelatedPanelAfterParentReload(
              [],
              preservedInitiativeCode,
            );
          }
        },
      });
    }

    function deletedItemsPageGetChooseOptionHtml() {
      return '<option value="" selected disabled data-trans-chooseData class="Resources"></option>';
    }

    function deletedItemsPageResetFilters() {
      $("#Sector").val("");
      $("#SubSector")
        .empty()
        .append(deletedItemsPageGetChooseOptionHtml());
      $("#strategyType").val("");
      $("#RelatedStrategy")
        .empty()
        .append(deletedItemsPageGetChooseOptionHtml());
      $("#RelatedInitiative")
        .empty()
        .append(deletedItemsPageGetChooseOptionHtml());
      deletedItemsCachedRelatedInitiativeTitles = [];
      if (typeof changeResources === "function") {
        changeResources();
      }
    }

    function deletedItemsPageUpdateFiltersForTab(activeTabType) {
      if (activeTabType === "projects") {
        $("#relatedStrategyFilterWrap").addClass("d-none");
        $("#relatedInitiativeFilterWrap").removeClass("d-none");
      } else {
        $("#relatedStrategyFilterWrap").removeClass("d-none");
        $("#relatedInitiativeFilterWrap").addClass("d-none");
      }
    }

    // Related strategy dropdown filtered by strategy type
    function deletedItemsPageLoadGoalStrategiesIntoDropdown() {
      var selectedStrategyTypeValue = $("#strategyType").val();
      var relatedStrategyDropdown = $("#RelatedStrategy");
      if (!selectedStrategyTypeValue) {
        deletedItemsFillSelectFromList(
          "GoalStrategy",
          "#RelatedStrategy",
          "Title",
          "Name",
          "",
          "",
          "Name",
        ).then(function () {
          deletedItemsPageLoadDeletedItemsTable();
        });
        return;
      }
      var typesFilter =
        "Types eq '" +
        deletedItemsEscapeQuotesForFilter(selectedStrategyTypeValue) +
        "'";
      deletedItemsFillSelectFromList(
        "GoalStrategy",
        "#RelatedStrategy",
        "Title",
        "Name",
        "",
        typesFilter,
        "Name",
      ).then(function () {
        deletedItemsPageLoadDeletedItemsTable();
      });
    }

    // Related initiative dropdown from deleted project titles
    function deletedItemsPageLoadRelatedInitiativesIntoDropdown(
      reloadTable,
      refreshTitlesFromProjects,
    ) {
      if (reloadTable === undefined) {
        reloadTable = true;
      }
      if (refreshTitlesFromProjects === undefined) {
        refreshTitlesFromProjects = false;
      }

      var selectedStrategyTypeValue = $("#strategyType").val();
      var relatedInitiativeDropdown = $("#RelatedInitiative");
      relatedInitiativeDropdown
        .empty()
        .append(deletedItemsPageGetChooseOptionHtml());

      var titlesPromise =
        refreshTitlesFromProjects ||
        !deletedItemsCachedRelatedInitiativeTitles.length
          ? deletedItemsFetchRelatedInitiativeTitlesFromDeletedProjects()
          : Promise.resolve(deletedItemsCachedRelatedInitiativeTitles);

      titlesPromise
        .then(function (initiativeTitleCodes) {
          return deletedItemsFetchInitiativesForRelatedFilter(
            initiativeTitleCodes,
            selectedStrategyTypeValue,
          );
        })
        .then(function (initiativeOptions) {
          for (
            var optionIndex = 0;
            optionIndex < initiativeOptions.length;
            optionIndex++
          ) {
            var initiativeOption = initiativeOptions[optionIndex];
            relatedInitiativeDropdown.append(
              $("<option></option>")
                .attr("value", initiativeOption.title)
                .text(initiativeOption.name),
            );
          }
          if (typeof changeResources === "function") {
            changeResources();
          }
          if (reloadTable) {
            deletedItemsPageLoadDeletedItemsTable();
          }
        });
    }

    // Strategy type dropdown
    function deletedItemsPageLoadStrategyTypeDropdown() {
      var strategyTypeDropdown = $("#strategyType");
      strategyTypeDropdown
        .empty()
        .append(
          '<option value="" selected disabled data-trans-chooseData class="Resources"></option>',
        )
        .append(
          '<option value="vision" data-trans-vision class="Resources"></option>',
        )
        .append(
          '<option value="strategically" data-trans-strategically class="Resources"></option>',
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

    // Sector dropdown from Internal Entities
    function deletedItemsPageLoadSectorDropdown() {
      var currentLang = localStorage.getItem("lng");
      $.ajax({
        url:
          _spPageContextInfo.webAbsoluteUrl +
          "/_api/web/lists/getbytitle('Internal Entities')/items?$filter=EntityType eq 'Sector' and DeletionStatus ne 'Deleted'&$orderby=Created",
        method: "GET",
        headers: { Accept: "application/json; odata=verbose" },
        success: function (responseData) {
          var sectorDropdown = $("#Sector");
          sectorDropdown
            .empty()
            .append(
              '<option value="" selected disabled data-trans-chooseData class="Resources"></option>',
            );
          var sectorRows = responseData.d.results;
          for (var index = 0; index < sectorRows.length; index++) {
            var sectorItem = sectorRows[index];
            var displayText =
              currentLang == null || currentLang == "ar"
                ? sectorItem.Name
                : sectorItem.NameEn;
            sectorDropdown.append(
              $("<option></option>")
                .attr("value", sectorItem.Title)
                .text(displayText),
            );
          }
          if (typeof changeResources === "function") {
            changeResources();
          }
        },
      });
    }

    // Subsector dropdown for selected sector
    function deletedItemsPageLoadSubSectorDropdown(parentSectorTitle) {
      var currentLang = localStorage.getItem("lng");
      var subSectorDropdown = $("#SubSector");
      if (!parentSectorTitle) {
        subSectorDropdown
          .empty()
          .append(
            '<option value="" selected disabled data-trans-chooseData class="Resources"></option>',
          );
        if (typeof changeResources === "function") {
          changeResources();
        }
        return;
      }
      $.ajax({
        url:
          _spPageContextInfo.webAbsoluteUrl +
          "/_api/web/lists/getbytitle('Internal Entities')/items?$filter=EntityType eq 'Department' and ParentEntity eq '" +
          deletedItemsEscapeQuotesForFilter(parentSectorTitle) +
          "' and DeletionStatus ne 'Deleted'&$orderby=Created",
        method: "GET",
        headers: { Accept: "application/json; odata=verbose" },
        success: function (responseData) {
          subSectorDropdown
            .empty()
            .append(
              '<option value="" selected disabled data-trans-chooseData class="Resources"></option>',
            );
          var departmentRows = responseData.d.results;
          for (var index = 0; index < departmentRows.length; index++) {
            var departmentItem = departmentRows[index];
            var displayText =
              currentLang == null || currentLang == "ar"
                ? departmentItem.Name
                : departmentItem.NameEn;
            subSectorDropdown.append(
              $("<option></option>")
                .attr("value", departmentItem.Title)
                .text(displayText),
            );
          }
          if (typeof changeResources === "function") {
            changeResources();
          }
        },
      });
    }

    function deletedItemsPageAnimateSectionVisibility(sectionElement, shouldShow, withAnimation) {
      if (!withAnimation) {
        if (shouldShow) {
          sectionElement.removeClass("d-none").show();
        } else {
          sectionElement.hide().addClass("d-none");
        }
        return;
      }
      sectionElement.stop(true, true);
      if (shouldShow) {
        sectionElement
          .removeClass("d-none")
          .css({ opacity: 0, transform: "translateY(8px)" })
          .show()
          .animate({ opacity: 1 }, 120);
        setTimeout(function () {
          sectionElement.css({
            transform: "translateY(0)",
            transition: "transform 140ms ease-out",
          });
          setTimeout(function () {
            sectionElement.css("transition", "");
          }, 150);
        }, 0);
      } else {
        sectionElement.animate({ opacity: 0 }, 90, function () {
          sectionElement.hide();
          sectionElement.addClass("d-none");
          sectionElement.css({ opacity: "", transform: "", transition: "" });
        });
      }
    }

    function deletedItemsPageShowOrHideFiltersSection(activeTabType, withAnimation) {
      var filtersSection = $("#deletedItemsFiltersSection");
      if (activeTabType) {
        deletedItemsPageAnimateSectionVisibility(filtersSection, true, withAnimation);
      } else {
        deletedItemsPageAnimateSectionVisibility(filtersSection, false, withAnimation);
      }
    }

    function deletedItemsPageShowOrHideTableSection(activeTabType, withAnimation) {
      var tableSection = $("#deletedItemsTableSection");
      if (
        activeTabType === "objectives" ||
        activeTabType === "mainkpis" ||
        activeTabType === "initiatives" ||
        activeTabType === "projects"
      ) {
        deletedItemsPageAnimateSectionVisibility(tableSection, true, withAnimation);
      } else {
        deletedItemsPageAnimateSectionVisibility(tableSection, false, withAnimation);
      }
    }

    $(document).on(
      "click keydown",
      ".deleted-items-initiative-row",
      function (event) {
        if ($(event.target).closest(".deleted-items-view-detail-btn").length) {
          return;
        }
        if (
          event.type === "keydown" &&
          event.which !== 13 &&
          event.which !== 32
        ) {
          return;
        }
        var activeParentTab = $(".deleted-item-tab-btn.active").data("item-type");
        if (activeParentTab !== "initiatives" && activeParentTab !== "projects") {
          return;
        }
        if (event.type === "keydown") {
          event.preventDefault();
        }
        var initiativeCode = $(this).data("initiative-code");
        if (!initiativeCode) {
          return;
        }
        $("#deletedItemsTableHost .deleted-items-initiative-row").removeClass(
          "deleted-items-row-selected",
        );
        $(this).addClass("deleted-items-row-selected");
        deletedItemsSelectedParentTab = activeParentTab;
        var defaultRelatedKeyForParent =
          deletedItemsGetDefaultRelatedKeyForParentTab(activeParentTab);
        var selectedConfig = deletedItemsGetInitiativeRelatedConfig(
          deletedItemsSelectedInitiativeRelatedKey,
        );
        if (selectedConfig.parentTab !== activeParentTab) {
          deletedItemsSelectedInitiativeRelatedKey = defaultRelatedKeyForParent;
        }
        deletedItemsShowInitiativeRelatedPanel(initiativeCode);
      },
    );

    $(document).on(
      "click",
      ".deleted-items-listing-container .pagebtn",
      function () {
        if ($(this).is("[disabled]")) {
          return;
        }
        var paginationKey = $(this)
          .closest(".deleted-items-pagination")
          .data("pagination-key");
        var state = deletedItemsPaginationByKey[paginationKey];
        if (!state) {
          return;
        }
        var totalPages = deletedItemsGetPaginationTotalPages(
          state.allRows ? state.allRows.length : 0,
        );
        if ($(this).data("dir") === "prev") {
          state.currentPage = Math.max(1, (state.currentPage || 1) - 1);
        } else if ($(this).data("dir") === "next") {
          state.currentPage = Math.min(
            totalPages,
            (state.currentPage || 1) + 1,
          );
        } else {
          state.currentPage = parseInt($(this).data("page"), 10) || 1;
        }
        deletedItemsRenderPaginatedTableForKey(paginationKey);
      },
    );

    $(document).on("click", ".deleted-items-related-nav-link", function () {
      var relatedKey = $(this).data("related-key");
      if (!relatedKey || !deletedItemsSelectedInitiativeCode) {
        return;
      }
      deletedItemsSelectedInitiativeRelatedKey = relatedKey;
      $(".deleted-items-related-nav-link").removeClass("active");
      $(this).addClass("active").attr("aria-selected", "true");
      $(".deleted-items-related-nav-link")
        .not(this)
        .attr("aria-selected", "false");
      deletedItemsLoadInitiativeRelatedTable(relatedKey);
      if (typeof changeResources === "function") {
        changeResources();
      }
    });

    $(document).on("click", ".deleted-items-view-detail-btn", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var contextKey = $(this).data("context-key");
      var itemTitle = $(this).data("item-title");
      deletedItemsOpenItemDetailsPopup(contextKey, itemTitle);
    });

    $(document).on("click", ".deleted-items-details-close-btn", function () {
      deletedItemsCloseDetailsPopup();
    });

    $(document).on("click", ".deleted-item-tab-btn", function () {
      $(".deleted-item-tab-btn").removeClass("active");
      $(this).addClass("active");
      var clickedTabType = $(this).data("item-type");
      deletedItemsPageResetFilters();
      deletedItemsPageUpdateFiltersForTab(clickedTabType);
      if (clickedTabType !== "initiatives" && clickedTabType !== "projects") {
        deletedItemsHideInitiativeRelatedPanel();
      }
      if (clickedTabType === "initiatives" || clickedTabType === "projects") {
        deletedItemsSelectedParentTab = clickedTabType;
        deletedItemsSelectedInitiativeRelatedKey =
          deletedItemsGetDefaultRelatedKeyForParentTab(clickedTabType);
      }
      deletedItemsPageShowOrHideFiltersSection(clickedTabType, true);
      deletedItemsPageShowOrHideTableSection(clickedTabType, true);
      if (clickedTabType === "objectives") {
        deletedItemsPageLoadDeletedItemsTable();
      } else if (clickedTabType === "mainkpis") {
        deletedItemsPageLoadDeletedItemsTable();
      } else if (clickedTabType === "initiatives") {
        deletedItemsPageLoadDeletedItemsTable();
      } else if (clickedTabType === "projects") {
        deletedItemsPageLoadDeletedItemsTable();
        deletedItemsPageLoadRelatedInitiativesIntoDropdown(false, true);
      } else {
        var currentLang = localStorage.getItem("lng");
        var laterArabic = "سيتم عرض الجدول لهذا التبويب لاحقًا.";
        var laterEnglish = "Table for this tab will be added later.";
        var laterText =
          currentLang == null || currentLang == "ar"
            ? laterArabic
            : laterEnglish;
        $("#deletedItemsTableHost").html(
          '<p class="text-muted deleted-items-table-hint mb-0">' +
            laterText +
            "</p>",
        );
      }
    });

    $(document).on("change", "#strategyType", function () {
      var activeTabType = $(".deleted-item-tab-btn.active").data("item-type");
      $("#RelatedInitiative")
        .empty()
        .append(deletedItemsPageGetChooseOptionHtml());
      if (activeTabType === "projects") {
        deletedItemsPageLoadRelatedInitiativesIntoDropdown(true, false);
        return;
      }
      deletedItemsPageLoadGoalStrategiesIntoDropdown();
    });

    $(document).on("change", "#Sector", function () {
      var selectedSectorTitle = $(this).val();
      deletedItemsPageLoadSubSectorDropdown(selectedSectorTitle);
      deletedItemsPageLoadDeletedItemsTable();
    });

    $(document).on("change", "#SubSector", function () {
      deletedItemsPageLoadDeletedItemsTable();
    });

    $(document).on("change", "#RelatedStrategy", function () {
      deletedItemsPageLoadDeletedItemsTable();
    });

    $(document).on("change", "#RelatedInitiative", function () {
      deletedItemsPageLoadDeletedItemsTable();
    });

    deletedItemsPageLoadStrategyTypeDropdown();
    deletedItemsPageLoadSectorDropdown();
    deletedItemsLoadColumnsFromStyleLibraryByTab("objectives");
    deletedItemsLoadColumnsFromStyleLibraryByTab("mainkpis");
    deletedItemsLoadColumnsFromStyleLibraryByTab("initiatives");
    deletedItemsLoadColumnsFromStyleLibraryByTab("projects");
    deletedItemsLoadInitiativeRelatedColumns("initiativemilestones");
    deletedItemsLoadInitiativeRelatedColumns("initiativedeliverables");
    deletedItemsLoadInitiativeRelatedColumns("initiativerisks");
    deletedItemsLoadInitiativeRelatedColumns("initiativeissues");
    deletedItemsLoadInitiativeRelatedColumns("benefits");
    deletedItemsLoadInitiativeRelatedColumns("milestones");
    deletedItemsLoadInitiativeRelatedColumns("deliverables");
    deletedItemsLoadInitiativeRelatedColumns("risks");
    deletedItemsLoadInitiativeRelatedColumns("issues");
    deletedItemsPageShowOrHideFiltersSection("", false);
    deletedItemsPageShowOrHideTableSection("", false);

    if (typeof changeResources === "function") {
      changeResources();
    }
  }
}, 2000);
