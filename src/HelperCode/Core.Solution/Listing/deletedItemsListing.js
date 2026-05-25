var deletedItemsEmptyDataImage = require("../../../HelperRessources/img/empty-data.png");

// Loaded dynamically from Style Library JSON: example: /Style Library/spm/JSON/sos/sos_Listing.js
// We keep only fields where inlisting=true
var deletedItemsListingColumnsByTab = {
  objectives: [],
  mainkpis: [],
  initiatives: [],
};

// Deleted child lists for a selected initiative (Initiatives tab only)
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
    jsonPath: "initiativemilestones/initiativemilestones_Listing.js",
    tabLabelTrans: "inptitle10",
    tabIcon: "fa-flag-checkered",
    emptyArabic: "لا توجد معالم محذوفة لهذه المبادرة.",
    emptyEnglish: "No deleted milestones for this initiative.",
  },
  initiativedeliverables: {
    listTitle: "InitiativeDeliverables",
    jsonPath: "initiativedeliverables/initiativedeliverables_Listing.js",
    tabLabelTrans: "delinioutput",
    tabIcon: "fa-box-open",
    emptyArabic: "لا توجد مخرجات محذوفة لهذه المبادرة.",
    emptyEnglish: "No deleted deliverables for this initiative.",
  },
  initiativerisks: {
    listTitle: "Risks",
    jsonPath: "initiativerisks/initiativerisks_Listing.js",
    tabLabelTrans: "ptitle7",
    tabIcon: "fa-exclamation-triangle",
    emptyArabic: "لا توجد مخاطر محذوفة لهذه المبادرة.",
    emptyEnglish: "No deleted risks for this initiative.",
  },
  initiativeissues: {
    listTitle: "Issues",
    jsonPath: "initiativeissues/initiativeissues_Listing.js",
    tabLabelTrans: "inptitle12",
    tabIcon: "fa-calendar-times",
    emptyArabic: "لا توجد تحديات محذوفة لهذه المبادرة.",
    emptyEnglish: "No deleted issues for this initiative.",
  },
  benefits: {
    listTitle: "Benefits",
    jsonPath: "benefits/benefits_Listing.js",
    tabLabelTrans: "inptitle11",
    tabIcon: "fa-hand-holding-heart",
    emptyArabic: "لا توجد منافع محذوفة لهذه المبادرة.",
    emptyEnglish: "No deleted benefits for this initiative.",
  },
};

var deletedItemsSelectedInitiativeCode = "";
var deletedItemsSelectedInitiativeRelatedKey = "initiativemilestones";

// Caches lookup labels so we do not call SharePoint many times for the same code
var deletedItemsLookupDisplayCache = {};

function deletedItemsGetInitiativeRelatedConfig(relatedKey) {
  var baseUrl =
    _spPageContextInfo.webAbsoluteUrl + "/Style%20Library/spm/JSON/";
  var configEntry =
    deletedItemsInitiativeRelatedConfigByKey[relatedKey] ||
    deletedItemsInitiativeRelatedConfigByKey.initiativemilestones;
  return {
    relatedKey: relatedKey || "initiativemilestones",
    listTitle: configEntry.listTitle,
    jsonUrl: baseUrl + configEntry.jsonPath,
    tabLabelTrans: configEntry.tabLabelTrans,
    tabIcon: configEntry.tabIcon,
    emptyArabic: configEntry.emptyArabic,
    emptyEnglish: configEntry.emptyEnglish,
  };
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

// Child lists (milestones / deliverables): only Deleted + InitiativeCode.
// Parent filters (Sector, SubSector, Types, RelatedStrategy) apply to Initiatives only.
function deletedItemsBuildFilterForInitiativeRelated(initiativeCode) {
  var filterPieces = ["DeletionStatus eq 'Deleted'"];
  if (initiativeCode) {
    filterPieces.push(
      "InitiativeCode eq '" +
        deletedItemsEscapeQuotesForFilter(initiativeCode) +
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
  var selectAndExpand = deletedItemsBuildSelectAndExpandForObjectives(columnsForTable);
  var selectParts = selectAndExpand.select
    ? selectAndExpand.select.split(",")
    : [];
  if (selectParts.indexOf("InitiativeCode") === -1) {
    selectParts.push("InitiativeCode");
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
          relatedHost.html(
            deletedItemsBuildTableHtml(
              rowsAfterLookups,
              columnsForTable,
              emptyMessage,
            ),
          );
          if (typeof changeResources === "function") {
            changeResources();
          }
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
      emptyArabic: "لا توجد مبادرات محذوفة ضمن الفلاتر الحالية.",
      emptyEnglish: "No deleted initiatives match the current filters.",
    };
  }
  return {
    tabType: "objectives",
    listTitle: "SOs",
    jsonUrl:
      _spPageContextInfo.webAbsoluteUrl +
      "/Style%20Library/spm/JSON/sos/sos_Listing.js",
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

// Makes text safe inside a SharePoint filter (single quotes '' become two quotes"")
function deletedItemsEscapeQuotesForFilter(value) {
  return String(value == null ? "" : value).replace(/'/g, "''");
}

// Reads a person field: shows the name part, not the id part (SharePoint uses ;# or :::)
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

// Loads one label from a lookup list (match valfieldkey, read Dispfieldkey)
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
          deletedItemsLookupDisplayCache[cacheKey] = storedAsString;
          resolvePromise(storedAsString);
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
        deletedItemsLookupDisplayCache[cacheKey] = storedAsString;
        resolvePromise(storedAsString);
      },
    });
  });
}

// Copies rows and fills lookup columns by calling SharePoint (same value is only loaded once).
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
        (oneCol.type || "").toLowerCase() === "lookup" &&
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

function deletedItemsFormatOneTableCell(rawValue, columnDefinition) {
  if (rawValue == null || rawValue === "") {
    return deletedItemsGetEmptyLabelText();
  }
  var columnKind = (
    columnDefinition.type ||
    columnDefinition.howToShow ||
    ""
  ).toLowerCase();
  var currentLang = localStorage.getItem("lng");

  if (columnKind === "choicefromresources" || columnKind === "dropdownvalues") {
    var resourceKey = String(rawValue).toLowerCase();
    if (typeof Resources === "undefined") {
      return rawValue;
    }
    if (
      columnDefinition.useResourcesForTranslation === true ||
      columnDefinition.needTrans === true
    ) {
      if (currentLang == null || currentLang == "ar") {
        if (Resources.ar && Resources.ar[resourceKey]) {
          return Resources.ar[resourceKey];
        }
        return rawValue;
      }
      if (Resources.en && Resources.en[resourceKey]) {
        return Resources.en[resourceKey];
      }
      return rawValue;
    }
    if (currentLang == null || currentLang == "ar") {
      if (Resources.ar && Resources.ar[resourceKey]) {
        return Resources.ar[resourceKey];
      }
      return deletedItemsGetEmptyLabelText();
    }
    if (Resources.en && Resources.en[resourceKey]) {
      return Resources.en[resourceKey];
    }
    return deletedItemsGetEmptyLabelText();
  }
  if (columnKind === "yesnoradio") {
    var yesNoData = rawValue;
    if (typeof Resources === "undefined") {
      return String(yesNoData);
    }
    var yesNoTranslation;
    if (yesNoData) {
      if (currentLang == null || currentLang == "ar") {
        yesNoTranslation =
          Resources.ar[yesNoData] != null ? Resources.ar[yesNoData] : deletedItemsGetEmptyLabelText();
      } else {
        yesNoTranslation =
          Resources.en[yesNoData] != null ? Resources.en[yesNoData] : deletedItemsGetEmptyLabelText();
      }
      return yesNoTranslation;
    }
    if (typeof yesNoData === "boolean") {
      if (currentLang == null || currentLang == "ar") {
        yesNoTranslation =
          Resources.ar[yesNoData] != null ? Resources.ar[yesNoData] : deletedItemsGetEmptyLabelText();
      } else {
        yesNoTranslation =
          Resources.en[yesNoData] != null ? Resources.en[yesNoData] : deletedItemsGetEmptyLabelText();
      }
      return yesNoTranslation;
    }
    return deletedItemsGetEmptyLabelText();
  }

  if (columnKind === "picker") {
    if (typeof rawValue === "object") {
      if (Array.isArray(rawValue.results)) {
        var pickerNames = [];
        for (var pickerIndex = 0; pickerIndex < rawValue.results.length; pickerIndex++) {
          var pickerRow = rawValue.results[pickerIndex];
          if (pickerRow && (pickerRow.Title || pickerRow.Name)) {
            pickerNames.push(pickerRow.Title || pickerRow.Name);
          }
        }
        if (pickerNames.length) {
          return pickerNames.join(", ");
        }
      }
      if (rawValue.Title || rawValue.Name) {
        return rawValue.Title || rawValue.Name;
      }
    }
    return deletedItemsParsePersonFieldValue(rawValue);
  }

  if (columnKind === "date" || columnKind === "datetime") {
    var dateString = String(rawValue);
    if (dateString.indexOf("T") > -1) {
      return dateString.slice(0, dateString.indexOf("T"));
    }
    return dateString;
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
    return rawValue;
  }

  if (columnKind === "floatpercentage") {
    if (rawValue == null || rawValue === "") {
      return deletedItemsGetEmptyLabelText();
    }
    return String(rawValue) + " %";
  }

  if (columnKind === "float") {
    if (rawValue == null || rawValue === "") {
      return deletedItemsGetEmptyLabelText();
    }
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

// Builds the full HTML for the table 
function deletedItemsBuildTableHtml(
  sharePointRows,
  columnsForTable,
  messageWhenTableIsEmpty,
  tableOptions,
) {
  tableOptions = tableOptions || {};
  var currentLang = localStorage.getItem("lng");
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
      columnsForTable.length +
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

// Loads list items from SharePoint and fills a <select> dropdown
function deletedItemsFillSelectFromList(
  sharePointListTitle,
  selectElementSelector,
  optionValueFieldName,
  optionTextFieldName,
  optionTextFieldNameEnglish,
  extraOdataFilter,
  orderByFieldNames,
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
    var filterParts = "DeletionStatus ne 'Deleted'";
    if (extraOdataFilter) {
      filterParts = filterParts + " and " + extraOdataFilter;
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

// OData filter: only deleted rows, plus sector / sub-sector / related strategy when the user picked them
// Parent table OData: deleted rows + optional Sector / SubSector / Types / RelatedStrategy.
// Used for objectives, main KPIs, and initiatives — not for initiative child lists.
function deletedItemsBuildFilterForDeletedObjectives(activeTabType) {
  var filterPieces = ["DeletionStatus eq 'Deleted'"];
  var selectedSectorValue = $("#Sector").val();
  var selectedSubSectorValue = $("#SubSector").val();
  var selectedStrategyTypeValue = $("#strategyType").val();
  var selectedRelatedStrategyValue = $("#RelatedStrategy").val();
  if (
    selectedStrategyTypeValue &&
    (activeTabType === "objectives" || activeTabType === "initiatives")
  ) {
    filterPieces.push(
      "Types eq '" +
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
  if (selectedRelatedStrategyValue) {
    filterPieces.push(
      "RelatedStrategy eq '" +
        deletedItemsEscapeQuotesForFilter(selectedRelatedStrategyValue) +
        "'",
    );
  }
  return filterPieces.join(" and ");
}

// Waits until the page has container then builds the UI
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
            <div class="col-xl-3 col-md-6 mb-3 d-none" id="relatedObjectiveFilterWrap">
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
                        data-related-key="initiativedeliverables"
                        role="tab"
                        aria-selected="false">
                        <span class="deleted-items-related-tab-icon"><i class="fas fa-box-open" aria-hidden="true"></i></span>
                        <span class="deleted-items-related-tab-label Resources" data-trans-delinioutput></span>
                      </button>
                    </li>
                    <!-- TODO: re-enable risks tab
                    <li class="nav-item" role="presentation">
                      <button type="button"
                        class="nav-link deleted-items-related-nav-link"
                        data-related-key="initiativerisks"
                        role="tab"
                        aria-selected="false">
                        <span class="deleted-items-related-tab-icon"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i></span>
                        <span class="deleted-items-related-tab-label Resources" data-trans-ptitle7></span>
                      </button>
                    </li>
                    -->
                    <li class="nav-item" role="presentation">
                      <button type="button"
                        class="nav-link deleted-items-related-nav-link"
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
                        data-related-key="benefits"
                        role="tab"
                        aria-selected="false">
                        <span class="deleted-items-related-tab-icon"><i class="fas fa-hand-holding-heart" aria-hidden="true"></i></span>
                        <span class="deleted-items-related-tab-label Resources" data-trans-inptitle11></span>
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

    // Loads deleted rows for active tab (objectives / mainkpis / initiatives) and draws the table
    function deletedItemsPageLoadDeletedItemsTable() {
      var activeTabType = $(".deleted-item-tab-btn.active").data("item-type");
      if (
        activeTabType !== "objectives" &&
        activeTabType !== "mainkpis" &&
        activeTabType !== "initiatives"
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
      if (activeTabType !== "initiatives") {
        deletedItemsHideInitiativeRelatedPanel();
      }
      var preservedInitiativeCode =
        activeTabType === "initiatives"
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
            tableHostElement.html(
              deletedItemsBuildTableHtml(
                rowsAfterLookups,
                columnsForThisTable,
                emptyTableMessage,
                {
                  initiativeRowsClickable: activeTabType === "initiatives",
                },
              ),
            );
            if (activeTabType === "initiatives" && preservedInitiativeCode) {
              deletedItemsSyncInitiativeRelatedPanelAfterParentReload(
                rowsAfterLookups,
                preservedInitiativeCode,
              );
            }
            if (typeof changeResources === "function") {
              changeResources();
            }
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
          if (activeTabType === "initiatives" && preservedInitiativeCode) {
            deletedItemsSyncInitiativeRelatedPanelAfterParentReload(
              [],
              preservedInitiativeCode,
            );
          }
        },
      });
    }

    // Fills Related strategy using the chosen strategy type.
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

    // Fills the strategy type dropdown (vision, strategically, ministry, lms, sod).
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

    // Fills the sector dropdown from Internal Entities
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

    // Fills subsector dropdown under the chosen sector.
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

    // Hides "Related objective" on the Objectives tab; shows it on other tabs 
    function deletedItemsPageShowOrHideRelatedObjectiveFilter(activeTabType) {
      var relatedObjectiveWrapper = $("#relatedObjectiveFilterWrap");
      if (
        activeTabType === "objectives" ||
        activeTabType === "mainkpis" ||
        activeTabType === "initiatives"
      ) {
        relatedObjectiveWrapper.addClass("d-none");
      } else {
        relatedObjectiveWrapper.removeClass("d-none");
      }
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
        activeTabType === "initiatives"
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
        if (
          event.type === "keydown" &&
          event.which !== 13 &&
          event.which !== 32
        ) {
          return;
        }
        if ($(".deleted-item-tab-btn.active").data("item-type") !== "initiatives") {
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
        deletedItemsShowInitiativeRelatedPanel(initiativeCode);
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

    $(document).on("click", ".deleted-item-tab-btn", function () {
      $(".deleted-item-tab-btn").removeClass("active");
      $(this).addClass("active");
      var clickedTabType = $(this).data("item-type");
      if (clickedTabType !== "initiatives") {
        deletedItemsHideInitiativeRelatedPanel();
      }
      deletedItemsPageShowOrHideFiltersSection(clickedTabType, true);
      deletedItemsPageShowOrHideRelatedObjectiveFilter(clickedTabType);
      deletedItemsPageShowOrHideTableSection(clickedTabType, true);
      if (clickedTabType === "objectives") {
        deletedItemsPageLoadDeletedItemsTable();
      } else if (clickedTabType === "mainkpis") {
        deletedItemsPageLoadDeletedItemsTable();
      } else if (clickedTabType === "initiatives") {
        deletedItemsPageLoadDeletedItemsTable();
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

    deletedItemsPageLoadStrategyTypeDropdown();
    deletedItemsPageLoadSectorDropdown();
    deletedItemsLoadColumnsFromStyleLibraryByTab("objectives");
    deletedItemsLoadColumnsFromStyleLibraryByTab("mainkpis");
    deletedItemsLoadColumnsFromStyleLibraryByTab("initiatives");
    deletedItemsLoadInitiativeRelatedColumns("initiativemilestones");
    deletedItemsLoadInitiativeRelatedColumns("initiativedeliverables");
    // TODO: re-enable risks tab — deletedItemsLoadInitiativeRelatedColumns("initiativerisks");
    deletedItemsLoadInitiativeRelatedColumns("initiativeissues");
    deletedItemsLoadInitiativeRelatedColumns("benefits");
    deletedItemsPageShowOrHideFiltersSection("", false);
    deletedItemsPageShowOrHideRelatedObjectiveFilter("");
    deletedItemsPageShowOrHideTableSection("", false);

    if (typeof changeResources === "function") {
      changeResources();
    }
  }
}, 2000);
