var href = window.location.href.toLowerCase();
window.isNew = href.indexOf("isnew=true") > -1;
window.isView = href.indexOf("isview=true") > -1;
window.isEdit = href.indexOf("isedit=true") > -1;
window.crItemCode = "";
if (href.indexOf("critemcode=") > -1) {
  crItemCode = href.split("critemcode=")[1].split("&")[0];
}

var LoggedInUser = null;
var LoggedInUserTitle = null;
var LoggedInUserId = null;

function getLoggedInUser() {
  return new Promise(function (resolve, reject) {
    if (LoggedInUser && LoggedInUserId) {
      resolve({ user: LoggedInUser, userId: LoggedInUserId });
      return;
    }
    $.ajax({
      url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/CurrentUser",
      method: "GET",
      headers: { Accept: "application/json; odata=verbose" },
      success: function (data) {
        LoggedInUser = data.d.Title || data.d.LoginName || data.d.Email;
        LoggedInUserTitle = data.d.Title;
        LoggedInUserId = data.d.Id; 
        resolve({ user: LoggedInUser, userId: LoggedInUserId });
      },
      error: function (err) {
        console.error("Error getting logged in user:", err);
        reject(err);
      },
    });
  });
}

function getAllowedParentItemTypes() {
  var currentRole = window.currentUserRole || "";

  if (currentRole === "Administrator" || currentRole === "DU") {
    return ["SOs", "MainKpi", "Initiatives", "Projects"];
  } else if (currentRole === "ObjectiveOwner") {
    return ["SOs"];
  } else if (currentRole === "PerformanceLeader") {
    return ["MainKpi"];
  } else if (currentRole === "InitiativeManager") {
    return ["Initiatives"];
  } else if (currentRole === "ProjectManager") {
    return ["Projects"];
  }

  return [];
}

function filterParentItemTypeOptions() {
  var allowedTypes = getAllowedParentItemTypes();
  var $parentSelect = $("#ParentItemType");

  if (!$parentSelect.length) {
    setTimeout(filterParentItemTypeOptions, 500);
    return;
  }

  if (allowedTypes.length === 0) {
    $parentSelect.find("option").not(":first").prop("disabled", true).hide();
    return;
  }

  $parentSelect.find("option").each(function () {
    var $option = $(this);
    var value = $option.val();

    if (!value) {
      $option.prop("disabled", false).show();
      return;
    }

    if (allowedTypes.indexOf(value) > -1) {
      $option.prop("disabled", false).show();
    } else {
      $option.prop("disabled", true).hide();
    }
  });
}

var checkchangerequestshtml = setInterval(function () {
  if ($("#ChangeRequests .col-12").length) {
    clearInterval(checkchangerequestshtml);

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

    $("#ChangeRequests .col-12").html(`
    <div class="changeRequests-container p-3">
      <div class="row mb-3 ItemPseudoFields">
        <div class="col-md-6 mb-3">
          <label data-trans-sector class="Resources">Sector</label>
          <select id="Sector" class="form-control"></select>
        </div>

        <div class="col-md-6 mb-3">
          <label data-trans-subsector class="Resources"></label>
          <select id="SubSector" class="form-control"></select>
        </div>

        <div class="col-md-6 mb-3">
          <label data-trans-relatedstrategy class="Resources"></label>
          <select id="RelatedStrategy" class="form-control"></select>
        </div>

        <div class="col-md-6 mb-3">
          <label data-trans-parentitemtype class="Resources"
            >Parent Item Type</label
          >
          <select id="ParentItemType" class="form-control">
            <option
              data-trans-parentitemtype
              class="Resources"
              value=""
              disabled
              selected
            ></option>
            <option data-trans-objective class="Resources" value="SOs"></option>
            <option data-trans-kpi class="Resources" value="MainKpi"></option>
            <option
              data-trans-initiative
              class="Resources"
              value="Initiatives"
            ></option>
            <option data-trans-project class="Resources" value="Projects"></option>
          </select>
        </div>

        <div class="col-md-6 mb-3">
          <label data-trans-parentselecteditem class="Resources">
            Parent Selected Item</label
          >
          <select id="ParentItemCode" class="form-control">
            <option
              data-trans-parentselecteditem
              class="Resources"
              value=""
              disabled
              selected
            ></option>
          </select>
        </div>

        <div class="col-md-6 mb-3" id="ChildItemTypeDiv" style="display: none">
          <label data-trans-childitemtype class="Resources"></label>
          <select id="ChildItemType" class="form-control">
            <option data-trans-childitemtype value="" disabled selected></option>
          </select>
        </div>
        <div class="col-md-6 mb-3" id="ChildItemCodeDiv" style="display: none">
          <label data-trans-childselecteditem class="Resources"
            >Child Selected Item</label
          >
          <select id="ChildItemCode" class="form-control">
            <option
              data-trans-childselecteditem
              class="Resources"
              value=""
              disabled
              selected
            ></option>
          </select>
        </div>

        <div class="col-md-6 mb-3">
          <label data-trans-changeitem class="Resources"></label>
          <select id="ChangeItem" class="form-control">
            <option
              data-trans-changeitem
              class="Resources"
              value=""
              disabled
              selected
            ></option>
          </select>
        </div>
        <div class="col-md-6 mb-3">
          <label data-trans-approvallevel class="Resources"></label>
          <select id="ApprovalLevel" class="form-control">
            <option
              data-trans-approvallevel
              class="Resources"
              value=""
              disabled
              selected
            ></option>
            <option
              data-trans-approvallevel1
              class="Resources"
              value="level1"
            ></option>
            <option
              data-trans-approvallevel2
              class="Resources"
              value="level2"
            ></option>
          </select>
        </div>

        <div class="col-md-12 mb-3">
          <label data-trans-changedescription class="Resources"></label>
          <textarea id="ChangeDescription" class="form-control" rows="3"></textarea>
        </div>

        <div class="col-md-12 mb-3">
          <label data-trans-justification class="Resources"></label>
          <textarea
            id="ChangeJustification"
            class="form-control"
            rows="3"
          ></textarea>
        </div>

        <div class="col-md-12 mb-3">
          <label data-trans-positiveimpact class="Resources"></label>
          <textarea
            id="ExpectedPositiveImpact"
            class="form-control"
            rows="3"
          ></textarea>
        </div>

        <div class="col-md-6 mb-3">
          <label data-trans-impactlevel class="Resources"></label>
          <select id="ImpactType" class="form-control">
            <option
              data-trans-impactlevel
              class="Resources"
              value=""
              disabled
              selected
            ></option>
            <option data-trans-high class="Resources" value="high"></option>
            <option data-trans-medium class="Resources" value="medium"></option>
            <option data-trans-low class="Resources" value="low"></option>
          </select>
        </div>
      </div>
      <div class="downseperator" style="display: none;">
      <div class="mb-3 d-flex justify-content-center w-100 align-item-center mt-4">
        <i class="fas fa-angle-double-down"></i>
      </div>
      </div>
      <div class="row mb-3 changeItemsRow mt-4" style="display: none;">
        <div class="changeCaption d-flex align-items-center mb-2 w-100 pt-2">
          <h3 class="d-flex align-items-center">
            <span data-trans-crrelateditem class="Resources"></span>
            <i class="fas fa-sync"></i>
          </h3>
        </div>
      </div>
      <div class="row my-4">
        <div class="col-12 d-flex justify-content-end w-100 buttonsRow p-0">
          <button id="CRSubmitButton" class="btn btn-primary mx-3" type="button"><span data-trans-savebutton class="Resources d-flex justify-content-center align-items-center"></span></button>
          <button id="CREditButton" class="btn btn-primary" type="button" style="display: none"><span data-trans-edit class="Resources d-flex justify-content-center align-items-center"></span></button>
        </div>
      </div>
    </div>
    `);

    changeResources();

    getLoggedInUser()
      .then(function () {
        filterParentItemTypeOptions();
        loadSectors();
        loadStrategyOptions();
        initPeoplePicker();

        if ((isView || isEdit) && crItemCode) {
          initViewMode(crItemCode);
        }
      })
      .catch(function (err) {
        console.error("Error initializing security:", err);
        filterParentItemTypeOptions();
        loadSectors();
        loadStrategyOptions();
        initPeoplePicker();

        if ((isView || isEdit) && crItemCode) {
          initViewMode(crItemCode);
        }
      });
  }
}, 500);

let selectedParentTitle = "";
let selectedParentType = "";

$(document).on("change", "#ParentItemType", function () {
  var parent = $(this).val();
  handleParentChange(parent);
});
$(document).on("change", "#ChildItemType", function () {
  const childList = $(this).val();

  const parentTitle = $("#ParentItemCode").val();
  const parentType = $("#ParentItemType").val();

  if (!parentTitle || !parentType) {
    $("#ChildItemCode")
      .empty()
      .append(
        '<option data-trans-childselecteditem class="Resources" value="" disabled selected></option>'
      );
    $("#ChangeItem")
      .empty()
      .append(
        '<option data-trans-changeitem class="Resources" value="" disabled selected></option>'
      );
    return;
  }

  if (parentType === "Initiatives" || parentType === "Projects") {
    loadChildItems(childList, parentTitle, parentType);
  }

  loadChangeItems(childList);
  changeResources();
});
$(document).on("change", "#Sector", function () {
  const sectorTitle = $(this).val();
  loadSubSectors(sectorTitle);
  changeResources();
});

$(document).on("change", "#ParentItemCode", function () {
  selectedParentTitle = $(this).val();
  selectedParentType = $("#ParentItemType").val();
  $("#ChildItemCode")
    .empty()
    .append(
      '<option data-trans-childselecteditem class="Resources" value="" disabled selected></option>'
    );
  changeResources();
});
$(document).on(
  "change",
  "#ChangeItem, #ApprovalLevel, #ParentItemCode, #ChildItemCode",
  function () {
    tryFetchChangeDetails();
    changeResources();
  }
);

$(document).on("change", "#ParentItemType, #ChildItemType", function () {
  $(".changeItemsRow").find(".dynamicField").remove();
  changeResources();
});
function setChangeItemsVisibility(visible) {
  const $row = $(".changeItemsRow");
  const $sep = $(".downseperator");
  if (visible) {
    $row.show();
    $sep.show();
  } else {
    $row.hide();
    $sep.hide();
  }
}

function toggleFormEditable(isEditable) {
  const disabled = !isEditable;

  $(
    ".changeRequests-container input, .changeRequests-container select, .changeRequests-container textarea"
  ).prop("disabled", disabled);

  $(".sp-peoplepicker-topLevel").css({
    "pointer-events": disabled ? "none" : "auto",
    opacity: disabled ? "0.6" : "1",
  });

  if ($("#CRSubmitButton").length && $("#CREditButton").length) {
    if (isEditable) {
      $("#CRSubmitButton").css("display", "inline-block");
      $("#CREditButton").hide();
    } else {
      $("#CRSubmitButton").hide();
      $("#CREditButton").show();
    }
  }
}

$(document).on("click", "#CRSubmitButton", function () {
  saveAllChangeRequestFields();
});
$(document).on("click", "#CREditButton", function () {
  let href = window.location.href;
  if (href.toLowerCase().indexOf("isview=true") > -1) {
    href = href.replace(/isview=true/i, "isedit=true");
  } else if (href.toLowerCase().indexOf("isedit=true") === -1) {
    href += (href.indexOf("?") > -1 ? "&" : "?") + "isedit=true";
  }
  window.history.replaceState(null, "", href);
  window.isEdit = true;
  toggleFormEditable(true);
  initializeEditMode();
});
function loadListOptions(
  listName,
  selectId,
  dispFieldKey,
  dispFieldKeyEn,
  valFieldKey,
  filter = "",
  orderBy = ""
) {
  const lang = localStorage.getItem("lng");
  let query =
    _spPageContextInfo.webAbsoluteUrl +
    `/_api/web/lists/getbytitle('${listName}')/items?$top=5000&$filter=DeletionStatus ne 'Deleted'`;
  if (filter) query += ` and ${filter}`;
  if (orderBy) query += `&$orderby=${orderBy}`;

  if (
    window.currentUserRole === "PerformanceLeader" &&
    listName === "MainKpi"
  ) {
    console.log("PerformanceLeader Query:", query);
  }

  $.ajax({
    url: query,
    method: "GET",
    headers: { Accept: "application/json; odata=verbose" },
    success: function (data) {
      const $select = $(selectId);
      $select.empty().append(`<option value="" disabled selected></option>`);
      data.d.results.forEach((item) => {
        const text =
          lang == null || lang == "ar"
            ? item[dispFieldKey]
            : item[dispFieldKeyEn];
        const val = item[valFieldKey] ? item[valFieldKey] : "";
        $select.append(`<option value="${val}">${text}</option>`);
      });
    },
    error: function (err) {
      console.error(`Error loading list ${listName}:`, err);
    },
  });
}

function loadSectors() {
  loadListOptions(
    "Internal Entities",
    "#Sector",
    "Name",
    "NameEn",
    "Title",
    "EntityType eq 'Sector'",
    "Created"
  );
}

function loadSubSectors(sectorTitle) {
  if (!sectorTitle) return;
  loadListOptions(
    "Internal Entities",
    "#SubSector",
    "Name",
    "NameEn",
    "Title",
    `EntityType eq 'Department' and ParentEntity eq '${sectorTitle}'`,
    "Created"
  );
}

function loadStrategyOptions() {
  loadListOptions(
    "GoalStrategy",
    "#RelatedStrategy",
    "Name",
    "Name",
    "Title",
    "",
    "Created"
  );
}

function loadParentItems(listName, selectId) {
  var currentRole = window.currentUserRole || "";
  var filter = "";

  var needsSecurityFilter =
    (currentRole === "ObjectiveOwner" && listName === "SOs") ||
    (currentRole === "PerformanceLeader" && listName === "MainKpi") ||
    (currentRole === "InitiativeManager" && listName === "Initiatives") ||
    (currentRole === "ProjectManager" && listName === "Projects");

  if (needsSecurityFilter && !LoggedInUserId) {
    getLoggedInUser()
      .then(function () {
        loadParentItems(listName, selectId);
      })
      .catch(function (err) {
        console.error("Error loading user for security filter:", err);
        loadListOptions(
          listName,
          selectId,
          "Name",
          "Name",
          "Title",
          "",
          "Created"
        );
      });
    return;
  }

  if (currentRole === "ObjectiveOwner" && listName === "SOs") {
    if (LoggedInUserId) {
      filter = `ObjectiveOwner/Id eq ${LoggedInUserId}`;
    }
  } else if (currentRole === "PerformanceLeader" && listName === "MainKpi") {
    if (LoggedInUserId) {
      filter = `(PerformanceLeader/Id eq ${LoggedInUserId} or PerformanceLeader2/Id eq ${LoggedInUserId})`;
      console.log(
        "PerformanceLeader filter:",
        filter,
        "UserId:",
        LoggedInUserId
      );
    }
  } else if (
    currentRole === "InitiativeManager" &&
    listName === "Initiatives"
  ) {
    if (LoggedInUserId) {
      filter = `InitiativePM/Id eq ${LoggedInUserId}`;
    }
  } else if (currentRole === "ProjectManager" && listName === "Projects") {
    if (LoggedInUserId) {
      filter = `ProjectManager/Id eq ${LoggedInUserId}`;
    }
  }
  loadListOptions(
    listName,
    selectId,
    "Name",
    "Name",
    "Title",
    filter,
    "Created"
  );
}

function loadChildItems(listName, parentTitle, parentType) {
  if (!parentTitle || !parentType) return;
  var currentRole = window.currentUserRole || "";

  let filter =
    parentType === "Initiatives"
      ? `InitiativeCode eq '${parentTitle}'`
      : `ProjectCode eq '${parentTitle}'`;

  if (currentRole === "InitiativeManager" && parentType === "Initiatives") {
  }

  if (currentRole === "ProjectManager" && parentType === "Projects") {
  }

  loadListOptions(listName, "#ChildItemCode", "Name", "Name", "Title", filter);
}

function loadChangeItems(listName, parentType = "", childType = "") {
  const $changeItem = $("#ChangeItem");
  $changeItem
    .empty()
    .append(
      '<option data-trans-changeitem class="Resources" value="" disabled selected></option>'
    );
  $(".changeItemsRow").find(".dynamicField").remove();
  if (!listName) return;

  let filter = "";
  if (childType) filter = `ListName eq '${childType}'`;
  else if (parentType) filter = `ListName eq '${parentType}'`;
  else filter = `ListName eq '${listName}'`;

  const url =
    _spPageContextInfo.webAbsoluteUrl +
    `/_api/web/lists/getbytitle('ChangeItems')/items?$filter=${filter} and DeletionStatus ne 'Deleted'&$orderby=ID`;

  $.ajax({
    url: url,
    method: "GET",
    headers: { Accept: "application/json; odata=verbose" },
    success: function (data) {
      data.d.results.forEach((item) => {
        $changeItem.append(
          `<option value="${item.Title}" data-name="${item.ItemName}" data-column="${item.ColumnInternalName}" data-action="${item.ActionType}" data-updatetype="${item.UpdateType}">${item.ItemName}</option>`
        );
      });
    },
    error: function (err) {
      console.error("Error loading ChangeItems:", err);
    },
  });
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildInputHtml(fieldName, fieldType, value, readOnly) {
  const safeName = escapeHtml(fieldName || "");
  const safeValue = escapeHtml(
    value === null || value === undefined ? "" : String(value)
  );
  const disabledAttr = readOnly ? " disabled" : "";

  if (fieldType === "boolean") {
    const isChecked =
      value === true || String(value).toLowerCase() === "true"
        ? " checked"
        : "";
    return `<input type="checkbox" id="${safeName}"${isChecked}${disabledAttr}>`;
  }

  if (fieldType === "textarea") {
    return `<textarea id="${safeName}" class="form-control" rows="3"${disabledAttr}>${safeValue}</textarea>`;
  }

  const inputType =
    fieldType === "number" || fieldType === "date" ? fieldType : "text";
  return `<input type="${inputType}" id="${safeName}" class="form-control" value="${safeValue}"${disabledAttr}>`;
}

function renderDynamicChangeFields(columns) {
  const lang = localStorage.getItem("lng");
  const container = $(".changeItemsRow");
  container.find(".dynamicField").remove();

  if (!columns || columns.length === 0) {
    setChangeItemsVisibility(false);
    return;
  }

  setChangeItemsVisibility(true);

  columns.forEach((col) => {
    let meta = {};
    try {
      meta =
        typeof col.jsonField === "string"
          ? JSON.parse(col.jsonField)
          : col.jsonField || {};
    } catch (e) {
      console.error("Bad jsonField:", col.jsonField, e);
      return;
    }

    const fieldName =
      meta.InternalName || "field_" + Math.random().toString(36).substr(2, 5);
    const labelText =
      lang == null || lang == "ar"
        ? meta.DisplayName || meta.DisplayNameEn || fieldName
        : meta.DisplayNameEn || meta.DisplayName || fieldName;
    const fieldType = (meta.type || "string").toLowerCase();
    const rawValue =
      col.value === null || col.value === undefined ? "" : col.value;
    const oldValueEscaped = escapeHtml(rawValue);
    const colClass = fieldType === "textarea" ? "col-md-12" : "col-md-6";
    let displayValue = rawValue;

    if (fieldType === "date") {
      let dateValue = "";
      try {
        if (rawValue) {
          const d = new Date(rawValue);
          if (!isNaN(d))
            dateValue = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(
              -2
            )}-${("0" + d.getDate()).slice(-2)}`;
        }
      } catch (e) {}
      displayValue = dateValue;
    }

    const inputHtml = buildInputHtml(fieldName, fieldType, displayValue, false);

    const fieldBlock = `
      <div class="${colClass} mb-3 dynamicField">
        <label>${escapeHtml(
          labelText
        )} (<span data-trans-previousvalue class="Resources"></span> <span class="oldValue">${oldValueEscaped}</span>)</label>
        ${inputHtml}
      </div>
    `;

    container.append(fieldBlock);
  });

  changeResources();
}

function tryFetchChangeDetails() {
  const changeItemCode = $("#ChangeItem").val();
  const approvalLevel = $("#ApprovalLevel").val();
  let itemCode = $("#ParentItemCode").val();
  if ($("#ChildItemCodeDiv").is(":visible") && $("#ChildItemCode").val())
    itemCode = $("#ChildItemCode").val();
  if (!changeItemCode || !approvalLevel || !itemCode) {
    $(".changeItemsRow").find(".dynamicField").remove();
    return;
  }
  setTimeout(function () {
    fetchChangeItemDetails(changeItemCode, approvalLevel, itemCode);
  }, 2000);
}
function fetchChangeItemDetails(changeItemCode, approvalLevel, itemCode) {
  if (!changeItemCode || !approvalLevel || !itemCode) {
    $(".changeItemsRow").find(".dynamicField").remove();
    return;
  }

  const url = `${APIURL}/general/getchangeitemsdetails/${encodeURIComponent(
    changeItemCode
  )}/${encodeURIComponent(approvalLevel)}/${encodeURIComponent(itemCode)}`;

  $.ajax({
    url: url,
    method: "GET",
    headers: { Accept: "application/json" },
    success: function (res) {
      if (
        res &&
        res.isSuccess &&
        res.result &&
        res.result.columnsDetails &&
        res.result.columnsDetails.length
      ) {
        renderDynamicChangeFields(res.result.columnsDetails);
      } else {
        $(".changeItemsRow").find(".dynamicField").remove();
      }
    },
    error: function (xhr) {
      console.error("Error fetching change items:", xhr);
      $(".changeItemsRow").find(".dynamicField").remove();
    },
  });
}
function saveAllChangeRequestFields() {
  var clientContext = new SP.ClientContext.get_current();
  var oList = clientContext
    .get_web()
    .get_lists()
    .getByTitle("NewChangeRequests");
  if (isNew) {
    var oListItem = oList.addItem(new SP.ListItemCreationInformation());

    [
      "ParentItemType",
      "ParentItemCode",
      "ChildItemType",
      "ChildItemCode",
      "ChangeItem",
      "ApprovalLevel",
      "Sector",
      "SubSector",
      "RelatedStrategy",
      "ChangeDescription",
      "ChangeJustification",
      "ExpectedPositiveImpact",
      "ImpactType",
    ].forEach((f) => {
      oListItem.set_item(f, $("#" + f).val() || "");
    });

    $(".peoplePicker").each(function () {
      var picker = $(this).data("MyPeoplePicker");
      oListItem.set_item(this.id, picker ? picker.getAllUserInfo() : []);
    });

    oListItem.update();
    clientContext.load(oListItem);
    var year = new Date().getFullYear().toString().slice(-2);

    clientContext.executeQueryAsync(
      function () {
        var newId = oListItem.get_id();
        var newCRCode = "NCR-" + year + "-" + newId.toString().padStart(4, "0");
        oListItem.set_item("Title", newCRCode);
        oListItem.update();

        clientContext.executeQueryAsync(
          function () {
            handleChangeItemsAPI(newCRCode);
            alert("تم الحفظ بنجاح!");
          },
          function (sender, args) {
            console.error("Error updating Title: " + args.get_message());
          }
        );
      },
      function (sender, args) {
        console.error("Error creating item: " + args.get_message());
      }
    );
  } else {
    if (!crItemCode) {
      alert("لا يمكن التعديل: لم يتم تحديد كود التغيير (crItemCode).");
      return;
    }

    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      `<View><Query><Where><Eq><FieldRef Name='Title'/><Value Type='Text'>${crItemCode}</Value></Eq></Where></Query></View>`
    );

    var items = oList.getItems(camlQuery);
    clientContext.load(items);

    clientContext.executeQueryAsync(
      function () {
        if (items.get_count() === 0) {
          alert(`Item with Title=${crItemCode} not found!`);
          return;
        }

        var oListItem = items.getItemAtIndex(0);

        [
          "ParentItemType",
          "ParentItemCode",
          "ChildItemType",
          "ChildItemCode",
          "ChangeItem",
          "ApprovalLevel",
          "Sector",
          "SubSector",
          "RelatedStrategy",
          "ChangeDescription",
          "ChangeJustification",
          "ExpectedPositiveImpact",
          "ImpactType",
        ].forEach((f) => {
          oListItem.set_item(f, $("#" + f).val() || "");
        });

        $(".peoplePicker").each(function () {
          var picker = $(this).data("MyPeoplePicker");
          oListItem.set_item(this.id, picker ? picker.getAllUserInfo() : []);
        });

        oListItem.update();
        clientContext.load(oListItem);

        clientContext.executeQueryAsync(
          function () {
            handleChangeItemsAPI(crItemCode);
            alert("تم التعديل بنجاح!");
          },
          function (sender, args) {
            console.error("Error updating item: " + args.get_message());
          }
        );
      },
      function (sender, args) {
        console.error("Error retrieving item: " + args.get_message());
      }
    );
  }
}
function handleChangeItemsAPI(crCode) {
  const changeItemCode = $("#ChangeItem").val() || "";
  const apiBody = [];
  $(".changeItemsRow .dynamicField").each(function () {
    const input = $(this).find("input, textarea, select");
    apiBody.push({
      columnInternalName: input.attr("id"),
      dataType: input.prop("type") || "string",
      columnOldValue: $(this).find(".oldValue").text() || "",
      columnNewValue: input.val() || "",
    });
  });

  $.ajax({
    url: `${APIURL}/general/addnewchangerequestdetails/${crCode}/${changeItemCode}`,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(apiBody),
    success: function (res) {
      console.log("API Response:", res);
    },
    error: function (xhr) {
      console.error("API Error:", xhr);
    },
  });
}

function initPeoplePicker() {
  // html of any picker should be like this:
  // <div class="col-md-6 mb-3">
  // <label data-trans-requestor class="Resources">Requestor</label>
  // <input type="text" class="form-control peoplePicker" id="Requestor" />
  // </div>
  $(".peoplePicker").each(function () {
    if (!$(this).data("MyPeoplePicker")) {
      const divId = this.id;
      const $ppDiv = $(`
        <div class="PPField SPIField form-control" type="multipicker" id="${divId}" INppicker="${divId}">
          <div dir="">
            <div class="sp-peoplepicker-topLevel" id="${divId}_TopSpan" title="Enter a name or email..." spclientpeoplepicker="true" style="width:100%;">
              <input id="${divId}_TopSpan_HiddenInput" type="hidden">
              <div id="${divId}_TopSpan_AutoFillDiv" class="sp-peoplepicker-autoFillContainer" aria-live="assertive"></div>
              <span id="${divId}_TopSpan_InitialHelpText" class="sp-peoplepicker-initialHelpText ms-helperText">Enter a name or email...</span>
              <span id="${divId}_TopSpan_ResolvedList" class="sp-peoplepicker-resolveList"></span>
              <span id="${divId}_TopSpan_NotificationSpan" aria-live="polite" style="visibility:hidden;position:absolute;width:0;"></span>
              <input type="text" class="sp-peoplepicker-editorInput" size="1" autocomplete="off" value="" id="${divId}_TopSpan_EditorInput">
            </div>
          </div>
        </div>
      `);
      $(this).replaceWith($ppDiv);
      var picker = new window.MyPeoplePicker();
      picker.init(divId, { valueFormat: "Title" }, function () {});
      $ppDiv.data("MyPeoplePicker", picker);
    }
  });
}
function loadExistingChangeDetails(crCode) {
  if (!crCode) return;

  const url =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('NewChangeRequestDetails')/items?" +
    `$filter=DeletionStatus ne 'Deleted' and NewChangeRequestCode eq '${crCode}'`;

  $.ajax({
    url: url,
    method: "GET",
    headers: { Accept: "application/json; odata=verbose" },
    success: function (data) {
      const results = data.d.results;

      if (!results.length) return;

      const $row = $(".changeItemsRow");
      const $sep = $(".downseperator");

      $row.show();
      $sep.show();

      results.forEach(function (item) {
        const internal = item.ColumnInternalName;
        const oldVal = item.ColumnOldValue ? item.ColumnOldValue : "";
        const newVal = item.ColumnNewValue ? item.ColumnNewValue : "";
        const dataType = item.DataType ? item.DataType.toLowerCase() : "string";

        let html = `
          <div class="col-md-6 dynamicField">
            <label>${internal}</label>
            <input type="text" class="form-control prevValue" value="${oldVal}" readonly>
            <input type="text" class="form-control mt-2 newValue" data-field="${internal}" value="${newVal}">
          </div>
        `;

        $row.append(html);
      });
    },
    error: function (err) {
      console.log("Error loading existing change details", err);
    },
  });
}

function initViewMode(code) {
  var ctx = new SP.ClientContext.get_current();
  var list = ctx.get_web().get_lists().getByTitle("NewChangeRequests");
  var camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(
    "<View><Query><Where>" +
      "<And>" +
      "<Eq><FieldRef Name='Title'/><Value Type='Text'>" +
      code +
      "</Value></Eq>" +
      "<Neq><FieldRef Name='DeletionStatus'/><Value Type='Text'>Deleted</Value></Neq>" +
      "</And>" +
      "</Where></Query></View>"
  );

  var items = list.getItems(camlQuery);
  ctx.load(items);
  ctx.executeQueryAsync(
    function () {
      var enumerator = items.getEnumerator();
      if (enumerator.moveNext()) {
        var mainItem = enumerator.get_current();
        fillViewFields(mainItem, code);
      } else {
        alert("لم يتم العثور على العنصر: " + code);
      }
    },
    function (sender, args) {
      console.error(args.get_message());
    }
  );
}

function fillViewFields(item, code) {
  const sector = item.get_item("Sector");
  const subSector = item.get_item("SubSector");
  const relatedStrategy = item.get_item("RelatedStrategy");
  const parentType = item.get_item("ParentItemType");
  const parentCode = item.get_item("ParentItemCode");
  const childType = item.get_item("ChildItemType");
  const childCode = item.get_item("ChildItemCode");
  const changeItem = item.get_item("ChangeItem");

  loadSectors();
  setTimeout(() => {
    setSelectValue("#Sector", sector);
    loadSubSectors(sector);
    setTimeout(() => setSelectValue("#SubSector", subSector), 500);
  }, 500);

  loadStrategyOptions();
  setTimeout(() => setSelectValue("#RelatedStrategy", relatedStrategy), 500);

  setSelectValue("#ParentItemType", parentType);
  loadParentItems(parentType, "#ParentItemCode");
  setTimeout(() => {
    setSelectValue("#ParentItemCode", parentCode);

    if (parentType == "Initiatives" || parentType == "Projects") {
      $("#ChildItemTypeDiv, #ChildItemCodeDiv").show();
      if (childType) setSelectValue("#ChildItemType", childType);
      if (childType) {
        loadChildItems(childType, parentCode, parentType);
      }
      setTimeout(() => {
        if (childCode) setSelectValue("#ChildItemCode", childCode);
        loadChangeItems(childType, parentType, childType);
        if (!window.isEdit) {
          setTimeout(() => loadChangeItemsForView(changeItem, code), 500);
        }
      }, 500);
    } else {
      loadChangeItems(parentCode, parentType);
      if (!window.isEdit) {
        setTimeout(() => loadChangeItemsForView(changeItem, code), 500);
      }
    }
  }, 500);

  [
    "ApprovalLevel",
    "ChangeDescription",
    "ChangeJustification",
    "ExpectedPositiveImpact",
    "ImpactType",
    "ChangeItem",
  ].forEach((f) => $("#" + f).val(item.get_item(f)));
  setTimeout(() => {
    if (window.isEdit) {
      toggleFormEditable(true);
      initializeEditMode(changeItem);
    } else {
      toggleFormEditable(false);
    }
  }, 1000);
}

function loadChangeItemsForView(changeItemCode, newCRCode) {
  if (!changeItemCode) return;
  const $changeItem = $("#ChangeItem");
  $changeItem
    .empty()
    .append(
      '<option data-trans-changeitem class="Resources" value="" disabled selected></option>'
    );

  $.ajax({
    url:
      _spPageContextInfo.webAbsoluteUrl +
      `/_api/web/lists/getbytitle('ChangeItems')/items?$filter=Title eq '${changeItemCode}'`,
    method: "GET",
    headers: { Accept: "application/json; odata=verbose" },
    success: function (data) {
      data.d.results.forEach((item) => {
        $changeItem.append(
          `<option value="${item.Title}" data-name="${item.ItemName}" data-column="${item.ColumnInternalName}" data-action="${item.ActionType}" data-updatetype="${item.UpdateType}">${item.ItemName}</option>`
        );
      });
      setSelectValue("#ChangeItem", changeItemCode);

      loadNewChangeRequestDetails(newCRCode);
    },
    error: function (err) {
      console.error("Error loading ChangeItem for view:", err);
    },
  });
}

function loadNewChangeRequestDetails(code) {
  if (!code) return;
  const url =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('NewChangeRequestDetails')/items?$filter=NewChangeRequestCode eq '" +
    code +
    "' and DeletionStatus ne 'Deleted'&$orderby=ID";
  $.ajax({
    url: url,
    method: "GET",
    headers: { Accept: "application/json; odata=verbose" },
    success: function (data) {
      if (data.d && data.d.results && data.d.results.length > 0) {
        renderViewDynamicFields(data.d.results);
      } else {
        setChangeItemsVisibility(false);
      }
    },
    error: function (err) {
      console.error("Error loading NewChangeRequestDetails:", err);
    },
  });
}
function setSelectValue(selectId, value) {
  const $sel = $(selectId);
  if (!$sel.find(`option[value='${value}']`).length && value) {
    $sel.append(`<option value="${value}" selected>${value}</option>`);
  }
  $sel.val(value);
}
function renderViewDynamicFields(columns) {
  const container = $(".changeItemsRow");
  container.find(".dynamicField").remove();

  const changeItemCode = $("#ChangeItem").val();
  const approvalLevel = $("#ApprovalLevel").val();
  const itemCode = $("#ParentItemCode").val();

  const lang = localStorage.getItem("lng");

  if (
    (!columns || columns.length === 0) &&
    (!changeItemCode || !approvalLevel || !itemCode)
  ) {
    setChangeItemsVisibility(false);
    return;
  }

  setChangeItemsVisibility(true);

  function appendField(col, labelText) {
    const fieldName =
      col.ColumnInternalName ||
      "field_" + Math.random().toString(36).substr(2, 5);
    const oldValueEscaped = escapeHtml(col.ColumnOldValue || "");
    const newValue = col.ColumnNewValue || "";
    const dataType = (col.DataType || "string").toLowerCase();
    const colClass = dataType === "textarea" ? "col-md-12" : "col-md-6";
    let displayValue = newValue;

    if (dataType === "date") {
      let dateValue = "";
      try {
        if (newValue) {
          const d = new Date(newValue);
          if (!isNaN(d))
            dateValue = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(
              -2
            )}-${("0" + d.getDate()).slice(-2)}`;
        }
      } catch (e) {}
      displayValue = dateValue;
    }
    const readOnly = !window.isEdit;

    const inputHtml = buildInputHtml(
      fieldName,
      dataType,
      displayValue,
      readOnly
    );

    const fieldBlock = `
      <div class="${colClass} mb-3 dynamicField">
          <label>${escapeHtml(
            labelText
          )} (<span data-trans-previousvalue class="Resources"></span> <span class="oldValue">${oldValueEscaped}</span>)</label>
          ${inputHtml}
      </div>
    `;
    container.append(fieldBlock);
  }

  if (changeItemCode && approvalLevel && itemCode) {
    const url = `${APIURL}/general/getchangeitemsdetails/${encodeURIComponent(
      changeItemCode
    )}/${encodeURIComponent(approvalLevel)}/${encodeURIComponent(itemCode)}`;

    $.ajax({
      url: url,
      method: "GET",
      headers: { Accept: "application/json" },
      success: function (res) {
        const apiColumns =
          res && res.result && res.result.columnsDetails
            ? res.result.columnsDetails
            : [];

        const labelMap = {};
        apiColumns.forEach((apiCol) => {
          let jsonField = {};
          try {
            jsonField = JSON.parse(apiCol.jsonField || "{}");
          } catch (e) {}
          if (jsonField.InternalName) {
            labelMap[jsonField.InternalName] =
              lang == null || lang == "ar"
                ? jsonField.DisplayName || jsonField.InternalName
                : jsonField.DisplayNameEn || jsonField.InternalName;
          }
        });

        if (columns && columns.length) {
          columns.forEach((col) => {
            const labelText =
              labelMap[col.ColumnInternalName] ||
              col.Title ||
              col.ColumnInternalName;
            appendField(col, labelText);
          });
        }

        changeResources();
      },
      error: function (xhr) {
        console.error("Error fetching change items:", xhr);
        if (columns && columns.length) {
          columns.forEach((col) =>
            appendField(col, col.Title || col.ColumnInternalName)
          );
          changeResources();
        }
      },
    });
  } else {
    columns.forEach((col) =>
      appendField(col, col.Title || col.ColumnInternalName)
    );
    changeResources();
  }
}
function handleParentChange(parent) {
  const childSelect = $("#ChildItemType");
  const childDiv = $("#ChildItemTypeDiv");
  const childCodeDiv = $("#ChildItemCodeDiv");

  childSelect
    .empty()
    .append(
      '<option value="" disabled selected data-trans-childselecteditem class="Resources"></option>'
    );

  if (parent === "Initiatives") {
    ["InitiativeMilestones", "InitiativeDeliverables", "Benefits"].forEach(
      (c) =>
        childSelect.append(
          `<option value="${c}" class="Resources" data-trans-${c.toLowerCase()}>${c}</option>`
        )
    );
    childDiv.show();
    childCodeDiv.show();
  } else if (parent === "Projects") {
    ["Deliverables", "Milestones"].forEach((c) =>
      childSelect.append(
        `<option value="${c}" class="Resources" data-trans-${c.toLowerCase()}>${c}</option>`
      )
    );
    childDiv.show();
    childCodeDiv.show();
  } else {
    childDiv.hide();
    childCodeDiv.hide();
  }

  loadParentItems(parent, "#ParentItemCode");

  if (isEdit) {
    const selectedParentCode = $("#ParentItemCode").val();
    const selectedChildCode = $("#ChildItemCode").val() || "";
    const currentChangeItem = $("#ChangeItem").val() || "";

    loadChangeItemsForEdit(
      parent,
      selectedParentCode,
      selectedChildCode,
      currentChangeItem
    );
  } else {
    loadChangeItems(parent, parent);
  }

  changeResources();
}
function loadChangeItemsForEdit(
  parentType,
  parentCode,
  childCode,
  changeItemValue
) {
  const currentChangeItem = changeItemValue || $("#ChangeItem").val() || "";
  const $changeItem = $("#ChangeItem");
  $changeItem
    .empty()
    .append(
      '<option value="" disabled selected data-trans-changeitem class="Resources"></option>'
    );
  const childType = $("#ChildItemType").val();
  const listName = childType || parentType;

  let filter = "";
  if (childType) filter = `ListName eq '${childType}'`;
  else filter = `ListName eq '${listName}'`;

  const url =
    _spPageContextInfo.webAbsoluteUrl +
    `/_api/web/lists/getbytitle('ChangeItems')/items?$filter=${filter} and DeletionStatus ne 'Deleted'&$orderby=ID`;

  $.ajax({
    url: url,
    method: "GET",
    headers: { Accept: "application/json; odata=verbose" },
    success: function (data) {
      data.d.results.forEach((item) => {
        $changeItem.append(
          `<option value="${item.Title}" data-name="${item.ItemName}" data-column="${item.ColumnInternalName}" data-action="${item.ActionType}" data-updatetype="${item.UpdateType}">${item.ItemName}</option>`
        );
      });
      if (currentChangeItem) {
        $changeItem.val(currentChangeItem);
      }
    },
    error: function (err) {
      console.error("Error loading ChangeItems for edit:", err);
    },
  });
}
function initializeViewOrEdit() {
  const parentValue = $("#ParentItemType").val();
  if (parentValue) {
    handleParentChange(parentValue);
    const childValue = $("#ChildItemType").data("currentValue");
    if (childValue) $("#ChildItemType").val(childValue);
  }
}
function initializeEditMode(changeItemValue) {
  const parentValue = $("#ParentItemType").val();
  const parentCode = $("#ParentItemCode").val();
  const childType = $("#ChildItemType").val();
  const childCode = $("#ChildItemCode").val();

  if (!parentValue) return;

  handleParentChange(parentValue);

  if (childType) {
    setTimeout(() => {
      if (parentCode) $("#ParentItemCode").val(parentCode);
      $("#ChildItemType").val(childType);
      loadChildItems(childType || "", parentCode, parentValue);
      setTimeout(() => {
        if (childCode) $("#ChildItemCode").val(childCode);

        loadChangeItemsForEdit(
          parentValue,
          parentCode,
          childCode,
          changeItemValue
        );
      }, 300);
    }, 300);
  } else {
    setTimeout(() => {
      if (parentCode) $("#ParentItemCode").val(parentCode);
      loadChangeItemsForEdit(parentValue, parentCode, "", changeItemValue);
    }, 300);
  }
}
