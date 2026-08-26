// Keep SharePoint master-page loader visible until first data fetch finishes.
// (Do not remove particles here — showLoader/hideLoader own that lifecycle.)
let combinedQueryValues = [];
let strategyMainBootstrapped = false;
$(document).ready(function () {
  // Hide SharePoint page title (StrategyMain / egyMain) — also fights Workflow.js re-show
  (function hideStrategyMainPageTitle() {
    var styleId = 'strategyMain-hide-page-title-js';
    if (!document.getElementById(styleId)) {
      var style = document.createElement('style');
      style.id = styleId;
      style.textContent =
        '#s4-titlerow,#s4-titlerow #pageTitle,h1#pageTitle,h1#pageTitle span,.ms-core-pageTitle,#DeltaPlaceHolderPageTitleInTitleArea,.ms-webpart-chrome-title,.ms-webpart-titleText{display:none!important;height:0!important;overflow:hidden!important;visibility:hidden!important;margin:0!important;padding:0!important;}';
      document.head.appendChild(style);
    }
    var titleRow = document.getElementById('s4-titlerow');
    if (titleRow) titleRow.style.setProperty('display', 'none', 'important');
    var pageTitle = document.getElementById('pageTitle');
    if (pageTitle) pageTitle.style.setProperty('display', 'none', 'important');
  })();

  var APIURL = '';
  let apiCallMade = false;
  window.Get_Configure_Api = {
    // The main Initialization function
    preinit: function () {
      if (!apiCallMade) {
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
          Get_Configure_Api.init();
        });
        apiCallMade = true; // Set the flag to true after calling the API
      }
    },
    init: function () {
      var clientContext = new SP.ClientContext.get_current();
      var oList = clientContext
        .get_web()
        .get_lists()
        .getByTitle('Configurations');
      var camlQuery = new SP.CamlQuery();
      camlQuery.set_viewXml(
        '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="Title" /><Value Type="Text">' +
          'API_URL' +
          "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
      );
      Get_Configure_Api.g.collListItem = oList.getItems(camlQuery);
      clientContext.load(Get_Configure_Api.g.collListItem);
      clientContext.executeQueryAsync(
        Function.createDelegate(this, Get_Configure_Api.onSuccess),
        Function.createDelegate(this, Get_Configure_Api.onError)
      );
    },
    onSuccess: function (sender, args) {
      // console.log('Get_Configure_Api.onSuccess called...');
      var collListItem = Get_Configure_Api.g.collListItem;
      var listItemEnum = collListItem.getEnumerator();
      while (listItemEnum.moveNext()) {
        var oListItem = listItemEnum.get_current();
        var rawApiUrl = oListItem.get_item('Value');
        APIURL =
          typeof window.normalizeApiUrl === 'function'
            ? window.normalizeApiUrl(rawApiUrl)
            : rawApiUrl;
        window.APIURL = APIURL;
      }
    },
    onError: function (sender, args) {
      console.log(
        'Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()
      );
    },
    // Global variables
    g: {},
  };
  // Prefer APIURL already loaded by HRSD UserAccess bootstrap
  if (window.APIURL) {
    APIURL = window.APIURL;
  }
  Get_Configure_Api.preinit();
  function waitForCurrentUserData() {
    // HRSD uses UserN (global from User_Access). Do NOT wait for accessCallisDone —
    // on Landing pages it often never becomes true.
    if (strategyMainBootstrapped) {
      return;
    }
    var resolvedUser =
      (typeof UserN !== 'undefined' && UserN && UserN.Id && UserN) ||
      (window.UserN && window.UserN.Id && window.UserN) ||
      (window.currentUserData &&
        window.currentUserData.Id &&
        window.currentUserData) ||
      null;
    var apiReady = !!(window.APIURL || APIURL);
    var roleReady = !!(
      localStorage.getItem('userRole') ||
      (typeof currentUserRole !== 'undefined' && currentUserRole) ||
      (typeof GroupItem !== 'undefined' &&
        GroupItem &&
        GroupItem[0] &&
        GroupItem[0].Role)
    );
    var groupReady = !!(
      localStorage.getItem('userGroup') ||
      (typeof myRoleConfig !== 'undefined' &&
        myRoleConfig[0] &&
        myRoleConfig[0].groupsName) ||
      (typeof GroupItem !== 'undefined' &&
        GroupItem &&
        GroupItem[0] &&
        GroupItem[0].groupsName)
    );
    if (resolvedUser && apiReady && roleReady && groupReady) {
      strategyMainBootstrapped = true;
      if (window.APIURL) {
        APIURL = window.APIURL;
      }
      window.UserN = resolvedUser;
      window.currentUserData = resolvedUser;
      if (
        localStorage.getItem('lng') == null ||
        localStorage.getItem('lng') == 'ar'
      ) {
        $('.page-title').html(ar_UserRole);
      } else $('.page-title').html(en_UserRole);
      // HRSD has no Tanmiah lvl1/2/3 query filter arrays — keep empty
      combinedQueryValues = [];

      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      // Base64-encoded key and IV (from your backend)
      const base64Key = 'QVMf57vzSbW+Vuc+YtdTUw==';
      const base64IV = 'QVMf57vzSbW+Vuc+YtdTUw==';

      // Helper: Convert base64 string to Uint8Array
      function base64ToUint8Array(base64) {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
      }

      // Import AES-CBC key from base64
      async function importKeyFromBase64(base64Key) {
        const keyBytes = base64ToUint8Array(base64Key);
        return crypto.subtle.importKey(
          'raw',
          keyBytes,
          { name: 'AES-CBC' },
          false,
          ['encrypt', 'decrypt']
        );
      }

      // Encrypt data using AES-CBC
      async function encryptData(key, plainText, iv) {
        const encodedText = encoder.encode(plainText);
        const encryptedBuffer = await crypto.subtle.encrypt(
          { name: 'AES-CBC', iv },
          key,
          encodedText
        );
        const encryptedBytes = new Uint8Array(encryptedBuffer);
        return btoa(String.fromCharCode(...encryptedBytes)); // base64
      }

      // Decrypt AES-CBC encrypted base64 string
      // async function decryptData(key, base64CipherText, iv) {
      //   const encryptedBytes = base64ToUint8Array(base64CipherText);
      //   const decryptedBuffer = await crypto.subtle.decrypt(
      //     { name: 'AES-CBC', iv },
      //     key,
      //     encryptedBytes
      //   );
      //   return decoder.decode(decryptedBuffer);
      // }

      function ensureLoaderElements() {
        var existing = document.querySelector(
          '#particles-foreground, .vertical-centered-box'
        );
        if (existing) return;
        var box = document.createElement('div');
        box.id = 'particles-foreground';
        box.className = 'vertical-centered-box';
        box.style.cssText =
          'position:fixed;inset:0;z-index:99999;background:rgba(255,255,255,0.85);display:flex;align-items:center;justify-content:center;';
        box.innerHTML =
          '<div class="content"><div class="loader-circle"></div><div class="loader-line-mask"><div class="loader-line"></div></div></div>';
        document.body.appendChild(box);
      }

      function showLoader() {
        ensureLoaderElements();
        const elements = $(
          'div#particles-foreground, div#particles-background, .vertical-centered-box'
        );
        elements.css({ opacity: 1, display: 'block' }).show();
      }

      function hideLoader(onComplete) {
        const elements = $(
          'div#particles-foreground, div#particles-background, .vertical-centered-box'
        );
        if (!elements.length) {
          if (typeof onComplete === 'function') onComplete();
          return;
        }
        elements.animate(
          { opacity: 0 },
          {
            duration: 333,
            complete: function () {
              elements.hide().css({ display: 'none' });
              if (typeof onComplete === 'function') onComplete();
            },
          }
        );
      }
      var language = localStorage.getItem('lng');
      function isArabicLang() {
        return language == null || language === '' || language === 'ar';
      }
      var style = document.createElement('style');
      document.head.appendChild(style);
      // var APIURL = 'https://gccsg-api.netways1.com/api';

      if (
        localStorage.getItem('lng') == null ||
        localStorage.getItem('lng') == 'ar'
      ) {
        var No_Data = 'لا يوجد';
        document.title = 'الاستراتيجيات الرئيسية';
      } else {
        var No_Data = 'No Data';
        document.title = 'Main Strategies';
      }
      // Add these variables to store master data
      let allSectors = [];
      let allDepartments = [];
      let allSubDepartments = [];
      var isArabic = isArabicLang();
      var filterSelectsInitialized = false;

      function getEntityTitle(item) {
        return (item && (item.title || item.Title)) || '';
      }

      function getEntityName(item) {
        if (!item) return '';
        if (isArabic) {
          return item.name || item.Name || item.nameEn || item.NameEn || '';
        }
        return (
          item.nameEn ||
          item.NameEn ||
          item.name ||
          item.Name ||
          ''
        );
      }

      function getEntityParent(item) {
        return (item && (item.parentEntity || item.ParentEntity)) || '';
      }

      function populateSelectOptions(selectId, optionsArray) {
        const selectElement = document.getElementById(selectId);
        if (!selectElement) return;
        const firstOption = selectElement.querySelector('option');
        selectElement.innerHTML = '';
        if (firstOption) {
          firstOption.selected = true;
          selectElement.appendChild(firstOption);
        }

        (optionsArray || []).forEach((option) => {
          const optionElement = document.createElement('option');
          optionElement.value = getEntityTitle(option);
          optionElement.textContent = getEntityName(option) || getEntityTitle(option);
          selectElement.appendChild(optionElement);
        });

        var $el = window.jQuery && $('#' + selectId);
        if ($el && $el.length && $el.data('select2')) {
          $el.trigger('change.select2');
        }
      }

      function setSelectValue(selectId, value) {
        var el = document.getElementById(selectId);
        if (!el) return;
        el.value = value || '';
        var $el = window.jQuery && $('#' + selectId);
        if ($el && $el.length) {
          $el.val(value || null).trigger('change');
        }
      }

      function matchCustom(params, data) {
        if ($.trim(params.term) === '') {
          return data;
        }

        if (typeof data.text === 'undefined') {
          return null;
        }

        if (data.text.toLowerCase().indexOf(params.term.toLowerCase()) > -1) {
          var modifiedData = $.extend({}, data, true);
          return modifiedData;
        }

        return null;
      }

      function ensureSelect2Loaded() {
        return new Promise(function (resolve) {
          if (window.jQuery && jQuery.fn && jQuery.fn.select2) {
            resolve();
            return;
          }
          if (!window.jQuery) {
            console.warn('[StrategyMain] jQuery missing — native selects only');
            resolve();
            return;
          }
          if (document.getElementById('strategyMain-select2-css')) {
            // js still loading
            var tries = 0;
            var timer = setInterval(function () {
              tries += 1;
              if (jQuery.fn && jQuery.fn.select2) {
                clearInterval(timer);
                resolve();
              } else if (tries > 40) {
                clearInterval(timer);
                resolve();
              }
            }, 100);
            return;
          }
          var css = document.createElement('link');
          css.id = 'strategyMain-select2-css';
          css.rel = 'stylesheet';
          css.href =
            'https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/css/select2.min.css';
          document.head.appendChild(css);
          var script = document.createElement('script');
          script.src =
            'https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js';
          script.onload = function () {
            resolve();
          };
          script.onerror = function () {
            console.warn('[StrategyMain] Failed to load select2 CDN');
            resolve();
          };
          document.head.appendChild(script);
        });
      }

      function initFilterSelect2() {
        if (filterSelectsInitialized) return;
        if (!(window.jQuery && jQuery.fn && jQuery.fn.select2)) return;
        filterSelectsInitialized = true;
        ['Sector', 'Department'].forEach(function (id) {
          var $el = $('#' + id);
          if (!$el.length) return;
          if ($el.data('select2')) {
            $el.select2('destroy');
          }
          $el
            .select2({
              matcher: matchCustom,
              dir: isArabic ? 'rtl' : 'ltr',
              width: '140px',
              allowClear: true,
              placeholder: $el.find('option').first().text() || '',
              dropdownAutoWidth: true,
            })
            .on('select2:open', function () {
              setTimeout(function () {
                document
                  .querySelectorAll('.select2-results__option')
                  .forEach(function (optEl) {
                    optEl.style.textAlign = isArabic ? 'right' : 'left';
                    optEl.style.direction = isArabic ? 'rtl' : 'ltr';
                  });
              }, 0);
            });
        });
      }

      function filterDepartmentsBySector(selectedSector) {
        if (!selectedSector) {
          return allDepartments.slice();
        }
        return allDepartments.filter(function (item) {
          return getEntityParent(item) === selectedSector;
        });
      }

      function filterSubDepartmentsByDepartments(departments) {
        var allowed = (departments || []).map(getEntityTitle);
        if (!allowed.length) return [];
        return allSubDepartments.filter(function (item) {
          return allowed.indexOf(getEntityParent(item)) > -1;
        });
      }

      function onSectorFilterChanged(selectedSector) {
        var filteredDepts = filterDepartmentsBySector(selectedSector);
        populateSelectOptions('Department', filteredDepts);
        setSelectValue('Department', '');
      }

      function onDepartmentFilterChanged() {
        // SubDepartment filter is hidden for now (Sector + Department only).
      }

      function bindFilterCascadeEvents() {
        // Avoid duplicate handlers on re-init
        $('#Sector').off('.strategyFilter');
        $('#Department').off('.strategyFilter');

        var useSelect2 = !!(jQuery.fn && jQuery.fn.select2);

        if (useSelect2) {
          $('#Sector').on('select2:select.strategyFilter', function (e) {
            var selectedSector =
              (e.params && e.params.data && e.params.data.id) ||
              $(this).val() ||
              '';
            onSectorFilterChanged(selectedSector);
          });
          $('#Sector').on('select2:clear.strategyFilter', function () {
            onSectorFilterChanged('');
          });
          $('#Department').on('select2:select.strategyFilter', function (e) {
            var selectedDept =
              (e.params && e.params.data && e.params.data.id) ||
              $(this).val() ||
              '';
            onDepartmentFilterChanged(selectedDept);
          });
          $('#Department').on('select2:clear.strategyFilter', function () {
            onDepartmentFilterChanged('');
          });
        } else {
          $('#Sector').on('change.strategyFilter', function () {
            onSectorFilterChanged($(this).val() || '');
          });
          $('#Department').on('change.strategyFilter', function () {
            onDepartmentFilterChanged($(this).val() || '');
          });
        }
      }

      async function loadInternalEntitiesFilters() {
        try {
          await ensureSelect2Loaded();
          var languageHeader = isArabic ? 'ar' : 'en';
          var userId =
            (window.UserN && window.UserN.Id) ||
            (window.currentUserData && window.currentUserData.Id) ||
            (_spPageContextInfo && _spPageContextInfo.userId) ||
            '';
          var response = await fetch(
            `${APIURL}/general/getallinternalentities`,
            {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                Language: languageHeader,
                'User-Id': String(userId),
              },
            }
          );
          if (!response.ok) {
            response = await fetch(
              `${APIURL}/general/getallinternalentities`,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Language: languageHeader,
                  'User-Id': String(userId),
                },
                body: '{}',
              }
            );
          }
          var data = await response.json();
          if (!response.ok || data.isSuccess === false) {
            throw new Error(
              data.errorMessageEn ||
                data.errorMessageAr ||
                'getallinternalentities failed'
            );
          }
          var list = data.result || data || [];
          if (!Array.isArray(list)) list = [];

          allSectors = list.filter(function (x) {
            return String(x.entityType || '').toLowerCase() === 'sector';
          });
          allDepartments = list.filter(function (x) {
            return String(x.entityType || '').toLowerCase() === 'department';
          });

          populateSelectOptions('Sector', allSectors);
          populateSelectOptions('Department', allDepartments);
          initFilterSelect2();
          bindFilterCascadeEvents();
          if (typeof changeResources === 'function') {
            changeResources();
          }
        } catch (error) {
          console.error(
            '[StrategyMain] Failed to load internal entities filters:',
            error
          );
        }
      }

      // Get the filter button
      const filterBtn = document.querySelector('.filter-btn');
      const resetBtn = document.querySelector('.reset-btn');

      // Function to get selected option object
      function getSelectedOption(selectId) {
        const selectElement = document.getElementById(selectId);
        if (!selectElement) return {};
        const selectedOption =
          selectElement.options[selectElement.selectedIndex];

        return selectedOption
          ? {
              value: selectedOption.value,
              text: selectedOption.textContent.trim(),
            }
          : {};
      }

      function buildPageFiltersFromUi(submittedFilter) {
        submittedFilter = submittedFilter || {};
        var sectorCode =
          (submittedFilter.Sector && submittedFilter.Sector.value) ||
          ($('#Sector').val && $('#Sector').val()) ||
          '';
        // pageFilters.subSectorCode maps to Department (وكالة / DP-xxx)
        var subSectorCode =
          (submittedFilter.Department && submittedFilter.Department.value) ||
          ($('#Department').val && $('#Department').val()) ||
          '';
        return {
          sectorCode: sectorCode || '',
          subSectorCode: subSectorCode || '',
        };
      }

      // Handle filter button click
      $(document).on('click', '.filter-btn', function () {
        const submittedFilter = {
          Sector: getSelectedOption('Sector'),
          Department: getSelectedOption('Department'),
        };
        if (typeof resetCardSelectionState === 'function') {
          resetCardSelectionState();
        }
        FetchFirstLoad(submittedFilter);
      });

      $(document).on('click', '.reset-btn', function () {
        populateSelectOptions('Sector', allSectors);
        populateSelectOptions('Department', allDepartments);
        setSelectValue('Sector', '');
        setSelectValue('Department', '');
        if (typeof resetCardSelectionState === 'function') {
          resetCardSelectionState();
        }
        FetchFirstLoad({});
      });

      // Kick off filter lists in parallel with strategy data
      loadInternalEntitiesFilters();

      const CARD_PAGE_SIZE = 6;
      let strategyData = {};
      let pillarsData = {};
      let mainGoalData = {
        Result: [],
        PageSize: CARD_PAGE_SIZE,
        PageIndex: 1,
        CountTotalItem: 0,
        LastItemId: null,
      };
      let goal2Data = {};
      let goal3Data = {};
      let KpiStrategicData = {};
      let KpiOperationalData = {};
      function normalizeCombinedQueryValues(inputValues, requiredListNames) {
        let result = [];
        for (let i = 0; i < requiredListNames.length; i++) {
          let listName = requiredListNames[i];
          let match = null;

          // loop through inputValues to find first non-IsDraft entry for this listName
          for (let j = 0; j < inputValues.length; j++) {
            let current = inputValues[j];
            if (
              current.listName === listName &&
              current.fieldName !== 'IsDraft'
            ) {
              match = current;
              break;
            }
          }

          if (match) {
            result.push(match);
          } else {
            // use default if no valid match found
            result.push({
              listName: listName,
              fieldName: 'Title',
              values: [''],
            });
          }
        }
        if (result.length === 1) {
          return result[0];
        }

        // Reorder: KPIs should be first ONLY when KPIs has real values
        // AND Internal Entities does NOT have real values.
        // In every other scenario, Internal Entities stays first.
        function hasRealValues(item) {
          if (!item || !Array.isArray(item.values)) return false;
          for (let k = 0; k < item.values.length; k++) {
            let v = item.values[k];
            if (v !== null && v !== undefined && String(v).trim() !== '') {
              return true;
            }
          }
          return false;
        }

        let internalEntitiesIndex = -1;
        let kpisIndex = -1;
        for (let i = 0; i < result.length; i++) {
          if (result[i].listName === 'Internal Entities') {
            internalEntitiesIndex = i;
          } else if (result[i].listName === 'MainKPI') {
            kpisIndex = i;
          }
        }

        if (internalEntitiesIndex !== -1 && kpisIndex !== -1) {
          let internalEntitiesItem = result[internalEntitiesIndex];
          let kpisItem = result[kpisIndex];
          let internalHasData = hasRealValues(internalEntitiesItem);
          let kpisHasData = hasRealValues(kpisItem);

          // Remove both from result, then re-insert in the correct order
          let others = [];
          for (let i = 0; i < result.length; i++) {
            if (i !== internalEntitiesIndex && i !== kpisIndex) {
              others.push(result[i]);
            }
          }

          if (kpisHasData && !internalHasData) {
            // KPIs first
            result = [kpisItem, internalEntitiesItem].concat(others);
          } else {
            // Internal Entities first (default for all other scenarios)
            result = [internalEntitiesItem, kpisItem].concat(others);
          }
        }

        return result;
      }

      function getStrategyAccessPlaintext() {
        var roleLevel =
          localStorage.getItem('userRole') ||
          (typeof currentUserRole !== 'undefined' && currentUserRole) ||
          (typeof GroupItem !== 'undefined' &&
            GroupItem &&
            GroupItem[0] &&
            GroupItem[0].Role) ||
          '';
        var userId =
          (window.currentUserData && window.currentUserData.Id) ||
          (window.UserN && window.UserN.Id) ||
          (typeof UserN !== 'undefined' && UserN && UserN.Id) ||
          (_spPageContextInfo && _spPageContextInfo.userId) ||
          '';
        var groupName =
          localStorage.getItem('userGroup') ||
          (typeof myRoleConfig !== 'undefined' &&
            myRoleConfig[0] &&
            myRoleConfig[0].groupsName &&
            (Array.isArray(myRoleConfig[0].groupsName)
              ? myRoleConfig[0].groupsName[0]
              : myRoleConfig[0].groupsName)) ||
          (typeof GroupItem !== 'undefined' &&
            GroupItem &&
            GroupItem[0] &&
            GroupItem[0].groupsName &&
            (Array.isArray(GroupItem[0].groupsName)
              ? GroupItem[0].groupsName[0]
              : GroupItem[0].groupsName)) ||
          '';
        // localStorage may store array as "Group1,Group2"
        if (groupName && String(groupName).indexOf(',') > -1) {
          groupName = String(groupName).split(',')[0].trim();
        }
        return {
          roleLevel: String(roleLevel || '').trim(),
          userId: String(userId || '').trim(),
          groupName: String(groupName || '').trim(),
          plaintext:
            String(roleLevel || '').trim() +
            ':::' +
            String(userId || '').trim() +
            ':::' +
            String(groupName || '').trim(),
        };
      }

      function isStrategyAccessReady() {
        var access = getStrategyAccessPlaintext();
        return !!(access.roleLevel && access.userId && access.groupName);
      }

      function toPagedResult(list, pageIndex) {
        var items = Array.isArray(list) ? list : [];
        var page = pageIndex && pageIndex > 0 ? pageIndex : 1;
        var pageSize = CARD_PAGE_SIZE;
        var start = (page - 1) * pageSize;
        var pageItems = items.slice(start, start + pageSize);
        return {
          Result: pageItems,
          PageSize: pageSize,
          PageIndex: page,
          CountTotalItem: items.length,
          AllItems: items,
          LastItemId:
            pageItems.length > 0
              ? pageItems[pageItems.length - 1].Id ||
                pageItems[pageItems.length - 1].id ||
                null
              : null,
        };
      }

      function goToPagedSection(sectionKey, pageIndex) {
        var page = pageIndex && pageIndex > 0 ? pageIndex : 1;
        if (sectionKey === 'strategies') {
          strategyData = toPagedResult(strategyData.AllItems || [], page);
          createStrategyCards(
            strategyData,
            document.getElementById('strategies-cards-container')
          );
        } else if (sectionKey === 'mainGoals') {
          mainGoalData = toPagedResult(mainGoalData.AllItems || [], page);
          createMainGoals(
            mainGoalData,
            document.getElementById('mainGoal-cards-container')
          );
        } else if (sectionKey === 'goal2') {
          goal2Data = toPagedResult(goal2Data.AllItems || [], page);
          createGoal2Cards(
            goal2Data,
            document.getElementById('Goal2-cards-container')
          );
        } else if (sectionKey === 'goal3') {
          goal3Data = toPagedResult(goal3Data.AllItems || [], page);
          createGoal3Cards(
            goal3Data,
            document.getElementById('Goal3-cards-container')
          );
        } else if (sectionKey === 'kpiStrategic') {
          KpiStrategicData = toPagedResult(KpiStrategicData.AllItems || [], page);
          createStrategicKpisCards(
            KpiStrategicData,
            document.getElementById('kpis-strategic-container')
          );
        } else if (sectionKey === 'kpiOperational') {
          KpiOperationalData = toPagedResult(
            KpiOperationalData.AllItems || [],
            page
          );
          createOperationalKpisCards(
            KpiOperationalData,
            document.getElementById('kpis-operational-container')
          );
        }
        initializeCheckMarkActive();
        changeResources();
        setTimeout(function () {
          addCheckmarkContainers();
          restoreActiveCards();
        }, 0);
      }

      function bindClientPagination(paginationContainer, pagedData, sectionKey) {
        if (!paginationContainer || !pagedData) return;
        var totalPages = Math.ceil(
          (pagedData.CountTotalItem || 0) / (pagedData.PageSize || CARD_PAGE_SIZE)
        );
        if (totalPages < 1) return;
        paginationContainer.querySelectorAll('.page-handle').forEach(function (link) {
          link.addEventListener('click', function (event) {
            event.preventDefault();
            if (link.classList.contains('disabled')) return;
            var action = link.getAttribute('data-action');
            var pageAttr =
              event.target.getAttribute('data-page') ||
              (link.querySelector('[data-page]') &&
                link.querySelector('[data-page]').getAttribute('data-page'));
            var pageIndex = parseInt(pageAttr, 10);
            var current = pagedData.PageIndex || 1;
            if (action === 'next' && current < totalPages) {
              goToPagedSection(sectionKey, current + 1);
            } else if (action === 'prev' && current > 1) {
              goToPagedSection(sectionKey, current - 1);
            } else if (!isNaN(pageIndex) && pageIndex >= 1 && pageIndex <= totalPages) {
              goToPagedSection(sectionKey, pageIndex);
            }
          });
        });
      }

      function buildPaginationPageItemHtml(pageNumber, currentPage) {
        return (
          '<li class="page-handle page-item ' +
          (pageNumber === currentPage ? 'active' : '') +
          '">' +
          '<a class="page-link" href="#" data-page="' +
          pageNumber +
          '">' +
          pageNumber +
          '</a></li>'
        );
      }

      function getPaginationWindow(currentPage, totalPages, maxVisiblePages) {
        var size = maxVisiblePages || 6;
        var current = currentPage && currentPage > 0 ? currentPage : 1;
        if (current > totalPages) current = totalPages;
        var startPage = Math.floor((current - 1) / size) * size + 1;
        var endPage = Math.min(startPage + size - 1, totalPages);
        return {
          startPage: startPage,
          endPage: endPage,
          nextChunkPage: endPage < totalPages ? endPage + 1 : null,
        };
      }

      function buildPaginationNavHtml(pagedData) {
        var totalPages = Math.ceil(
          (pagedData.CountTotalItem || 0) / (pagedData.PageSize || CARD_PAGE_SIZE)
        );
        // Hide pagination when only one page (or none)
        if (!totalPages || totalPages <= 1) {
          return '';
        }
        var currentPage = pagedData.PageIndex || 1;
        var windowPages = getPaginationWindow(currentPage, totalPages, 6);
        var html =
          '<nav><ul class="pagination p-0">' +
          '<li data-action="prev" class="page-handle page-item previous ' +
          (currentPage === 1 ? 'disabled' : '') +
          '">' +
          '<a class="page-link" href="#" aria-label="Previous">' +
          '<i class="fas fa-chevron-left d-flex"></i></a></li>';
        for (var i = windowPages.startPage; i <= windowPages.endPage; i++) {
          html += buildPaginationPageItemHtml(i, currentPage);
        }
        if (windowPages.nextChunkPage) {
          html +=
            '<li data-action="ellipsis" data-page="' +
            windowPages.nextChunkPage +
            '" class="page-handle page-item pagination-ellipsis">' +
            '<a class="page-link" href="#" data-page="' +
            windowPages.nextChunkPage +
            '">.....</a></li>';
          html += buildPaginationPageItemHtml(totalPages, currentPage);
        }
        html +=
          '<li data-action="next" class="page-handle page-item next ' +
          (currentPage === totalPages ? 'disabled' : '') +
          '">' +
          '<a class="page-link" href="#" aria-label="Next">' +
          '<i class="fas fa-chevron-right d-flex"></i></a></li>' +
          '</ul></nav>';
        return html;
      }

      function normalizeStatusKey(raw, section) {
        if (raw == null || raw === '') {
          // HRSD empty = no value (not draft)
          if (section === 'kpis') return 'stat19';
          if (section === 'objectives') return 'stat43';
          return section === 'strategies'
            ? 'kpi-novalue'
            : section === 'pillars'
            ? 'plr-draft'
            : 'stat43';
        }
        var s = String(raw).trim();
        var lower = s.toLowerCase().replace(/\s+/g, '').replace(/_/g, '-');
        // Keep HRSD SharePoint status codes as-is (stat15, stat20, stat22, ...)
        if (/^stat\d+$/.test(lower)) {
          return lower;
        }
        // Already in Tanmiah key form
        if (
          /^(stg|plr|obj|kpi|inv|prj)-/.test(lower) ||
          lower === 'kpi-novalue'
        ) {
          return lower;
        }
        if (
          lower.indexOf('novalue') > -1 ||
          lower === 'n/a' ||
          lower === 'none'
        ) {
          return section === 'objectives'
            ? 'stat43'
            : section === 'kpis'
            ? 'stat19'
            : 'kpi-novalue';
        }
        if (
          lower.indexOf('toolate') > -1 ||
          lower.indexOf('verylate') > -1 ||
          lower.indexOf('متأخرجدا') > -1
        ) {
          if (section === 'strategies') return 'stg-toolate';
          if (section === 'pillars') return 'plr-toolate';
          if (section === 'kpis') return 'stat15';
          return 'stat20';
        }
        if (lower.indexOf('late') > -1 || lower.indexOf('متأخر') > -1) {
          if (section === 'strategies') return 'stg-late';
          if (section === 'pillars') return 'plr-late';
          if (section === 'kpis') return 'stat16';
          return 'stat21';
        }
        if (
          lower.indexOf('ontrack') > -1 ||
          lower.indexOf('onplan') > -1 ||
          lower.indexOf('completed') > -1 ||
          lower.indexOf('علىالمسار') > -1 ||
          lower.indexOf('مكتمل') > -1
        ) {
          if (section === 'strategies') return 'stg-ontrack';
          if (section === 'pillars') return 'plr-ontrack';
          if (section === 'kpis') return 'stat17';
          return 'stat22';
        }
        if (
          lower.indexOf('draft') > -1 ||
          lower.indexOf('pending') > -1 ||
          lower.indexOf('approv') > -1 ||
          lower.indexOf('قيد') > -1
        ) {
          if (section === 'strategies') return 'stg-draft';
          if (section === 'pillars') return 'plr-draft';
          if (section === 'kpis') return 'stat31';
          return 'stat32';
        }
        if (lower.indexOf('partial') > -1) {
          return section === 'kpis' ? 'stat16' : 'stat21';
        }
        if (lower.indexOf('notachiev') > -1 || lower.indexOf('notapp') > -1) {
          return lower.indexOf('notapp') > -1
            ? 'stat18'
            : section === 'kpis'
            ? 'stat15'
            : 'stat20';
        }
        if (lower.indexOf('target') > -1 || lower.indexOf('achiev') > -1) {
          return section === 'kpis' ? 'stat17' : 'stat22';
        }
        return section === 'strategies'
          ? 'kpi-novalue'
          : section === 'kpis'
          ? 'stat19'
          : section === 'pillars'
          ? 'plr-draft'
          : 'stat43';
      }

      function applyCardStatusColor(mainCard, sectionHead, progressStatus) {
        var color = setStatusColorBasedOnStatus(sectionHead, progressStatus);
        mainCard.style.setProperty('--status-color', color || '#a9a9a9');
        mainCard.setAttribute('data-progressstatus', progressStatus || '');
        var normalizedColor = String(color || '')
          .replace(/\s/g, '')
          .toUpperCase();
        if (normalizedColor === '#FFFF00' || normalizedColor === '#FF0') {
          mainCard.classList.add('status-yellow');
        } else {
          mainCard.classList.remove('status-yellow');
        }
        return color;
      }

      function mapStrategyItem(s) {
        return {
          Id: s.id,
          Name: s.name,
          Description: s.description,
          StrategyCode: s.title,
          Title: s.title,
          Type: s.types,
          ApprovalDate: s.approvalDate,
          DeletionStatus: s.deletionStatus,
          ProgressStatus: normalizeStatusKey(
            s.status ||
              s.progressStatus ||
              s.completionStatus ||
              s.draftStatus,
            'strategies'
          ),
          ProgressPercentage: s.progressPercentage || null,
          HasPillars: false,
          Value: null,
          Vision: null,
          Goals: null,
          RelatedStrategy: null,
        };
      }

      function mapSoItem(o) {
        return {
          Id: o.id,
          Name: o.name,
          Title: o.title,
          Description: o.description,
          ProgressStatus: normalizeStatusKey(
            o.status || o.draftStatus || o.progressStatus,
            'objectives'
          ),
          ProgressPercentage: o.progressPercentage,
          RelatedStrategy: o.relatedStrategyName || o.relatedStrategy,
          DeletionStatus: o.deletionStatus,
          ObjectiveOwner: o.objectiveOwnerName,
          SecondOwner: null,
          Type: o.types || o.class,
          DepartmentAr: o.subSectorName,
          DepartmentEn: o.subSectorName,
          SectorAr: o.sectorName,
          SectorArEn: o.sectorName,
        };
      }

      function mapKpiItem(k) {
        // Use API status as-is; empty/missing → nodata (do not use completionStatus).
        var rawStatus =
          k.status != null && String(k.status).trim() !== ''
            ? String(k.status).trim()
            : '';
        var statusKey = rawStatus || 'nodata';
        return {
          Id: k.id,
          Name: k.name,
          Title: k.title,
          Code: k.title,
          Description: k.description,
          Status: statusKey,
          ProgressStatus: statusKey,
          ProgressPercentage: k.performance,
          ProgressPercentageStrategy: k.performance,
          RelatedStrategy: k.relatedStrategyName || k.relatedStrategy,
          DeletionStatus: k.deletionStatus,
          KPIOwner: k.ownerName,
          PerformanceLeader1: k.performanceLeaderName,
          PerformanceLeader2: k.performanceLeader2Name,
          PlanType: k.classification || k.kpiType || '',
          Classification: k.classification || k.kpiType || '',
          PeriodType: k.periodType,
          FromDate: k.fromDate != null && k.fromDate !== '' ? k.fromDate : null,
          ToDate: k.toDate != null && k.toDate !== '' ? k.toDate : null,
          DepartmentAr: k.subSectorName,
          DepartmentEn: k.subSectorName,
          SectorAr: k.sectorName,
          SectorArEn: k.sectorName,
          TotalActualStrategy: k.totalActual,
          TotalPlannedStrategy: k.totalPlanned,
        };
      }

      function applyStrategyPageResult(pageResult, updateOptions) {
        var result = pageResult || {};
        var opts = updateOptions || {
          strategies: true,
          pillars: true,
          mainGoals: true,
          goal2: true,
          goal3: true,
          kpis: true,
        };

        var pillarSection = document.getElementById('pillar-container');
        if (pillarSection) {
          pillarSection.style.display = '';
        }

        if (opts.strategies) {
          strategyData = toPagedResult(
            (result.strategiesList || []).map(mapStrategyItem)
          );
          document.getElementById('strategies-cards-container').innerHTML = '';
          createStrategyCards(
            strategyData,
            document.getElementById('strategies-cards-container')
          );
        }

        // HRSD API has no pillars list today — keep section visible with empty message
        if (opts.pillars !== false) {
          var rawPillars =
            result.pillarsList ||
            result.strategicPillarsList ||
            result.spillarsList ||
            [];
          pillarsData = toPagedResult(
            (Array.isArray(rawPillars) ? rawPillars : []).map(function (p) {
              return {
                Id: p.id || p.Id,
                Name: p.name || p.Name,
                Code: p.title || p.code || p.Code || p.Title,
                Description: p.description || p.Description,
                ProgressStatus:
                  p.status || p.ProgressStatus || 'kpi-novalue',
                ProgressPercentage:
                  p.progressPercentage || p.ProgressPercentage,
                RelatedStrategyName:
                  p.relatedStrategyName || p.RelatedStrategyName,
                DeletionStatus: p.deletionStatus || p.DeletionStatus,
              };
            })
          );
          document.getElementById('pillar-cards-container').innerHTML = '';
          createPillarCards(
            pillarsData,
            document.getElementById('pillar-cards-container')
          );
        }

        if (opts.mainGoals) {
          mainGoalData = toPagedResult(
            (result.mainSOsList || []).map(mapSoItem)
          );
          document.getElementById('mainGoal-cards-container').innerHTML = '';
          createMainGoals(
            mainGoalData,
            document.getElementById('mainGoal-cards-container')
          );
        }

        if (opts.goal2) {
          goal2Data = toPagedResult(
            (result.subLevel2SOsList || []).map(mapSoItem)
          );
          document.getElementById('Goal2-cards-container').innerHTML = '';
          createGoal2Cards(
            goal2Data,
            document.getElementById('Goal2-cards-container')
          );
        }

        if (opts.goal3) {
          goal3Data = toPagedResult(
            (result.subLevel3SOsList || []).map(mapSoItem)
          );
          document.getElementById('Goal3-cards-container').innerHTML = '';
          createGoal3Cards(
            goal3Data,
            document.getElementById('Goal3-cards-container')
          );
        }

        if (opts.kpis) {
          var allKpis = (result.kpIsList || []).map(mapKpiItem);
          var strategic = allKpis.filter(function (k) {
            var classification = String(
              k.Classification || k.PlanType || ''
            ).toLowerCase();
            return classification !== 'kpioperational';
          });
          var operational = allKpis.filter(function (k) {
            var classification = String(
              k.Classification || k.PlanType || ''
            ).toLowerCase();
            return classification === 'kpioperational';
          });
          KpiStrategicData = toPagedResult(strategic);
          KpiOperationalData = toPagedResult(operational);
          document.getElementById('kpis-strategic-container').innerHTML = '';
          document.getElementById('kpis-operational-container').innerHTML = '';
          createStrategicKpisCards(
            KpiStrategicData,
            document.getElementById('kpis-strategic-container')
          );
          createOperationalKpisCards(
            KpiOperationalData,
            document.getElementById('kpis-operational-container')
          );
        }

        initializeCheckMarkActive();
        changeResources();
        switchLanguage(language);
      }

      function getEmptySelectionFilters() {
        return [
          {
            listName: '',
            itemId: 0,
            soLevel: '',
          },
        ];
      }

      function getActiveCardItemId(sectionId) {
        var section = document.getElementById(sectionId);
        if (!section) return null;
        var active = section.querySelector('.mainCard.active');
        if (!active) return null;
        var idAttr =
          active.getAttribute('data-id') ||
          (active.querySelector('[data-currentid]') &&
            active
              .querySelector('[data-currentid]')
              .getAttribute('data-currentid')) ||
          (active.parentElement &&
            active.parentElement.getAttribute('data-id'));
        var itemId = parseInt(idAttr, 10);
        return isNaN(itemId) ? null : itemId;
      }

      function buildSelectionFiltersFromPage() {
        var selectionFiltersList = [];
        // Prefer persisted ids (survive pagination). Fall back to active DOM card.
        var strategyId =
          selectedItemIds.strategy != null
            ? selectedItemIds.strategy
            : getActiveCardItemId('strategies-cards-container');
        var mainSoId =
          selectedItemIds.mainGoal != null
            ? selectedItemIds.mainGoal
            : getActiveCardItemId('mainGoal-cards-container');
        var goal2Id =
          selectedItemIds.goal2 != null
            ? selectedItemIds.goal2
            : getActiveCardItemId('Goal2-cards-container');
        var goal3Id =
          selectedItemIds.goal3 != null
            ? selectedItemIds.goal3
            : getActiveCardItemId('Goal3-cards-container');

        if (strategyId != null) {
          selectionFiltersList.push({
            listName: 'GoalStrategy',
            itemId: strategyId,
            soLevel: '',
          });
        }
        if (mainSoId != null) {
          selectionFiltersList.push({
            listName: 'SOs',
            itemId: mainSoId,
            soLevel: 'main',
          });
        }
        if (goal2Id != null) {
          selectionFiltersList.push({
            listName: 'SOs',
            itemId: goal2Id,
            soLevel: 'sublevel2',
          });
        }
        if (goal3Id != null) {
          selectionFiltersList.push({
            listName: 'SOs',
            itemId: goal3Id,
            soLevel: 'sublevel3',
          });
        }

        if (selectionFiltersList.length === 0) {
          return getEmptySelectionFilters();
        }
        return selectionFiltersList;
      }

      function getUpdateOptionsFromSelection(selectionFiltersList) {
        // Same cascade as original page: only refresh dependent sections
        var hasStrategy = selectionFiltersList.some(function (f) {
          return f.listName === 'GoalStrategy' && f.itemId;
        });
        var hasLevel1 = selectionFiltersList.some(function (f) {
          return f.listName === 'SOs' && f.soLevel === 'main';
        });
        var hasLevel2 = selectionFiltersList.some(function (f) {
          return f.listName === 'SOs' && f.soLevel === 'sublevel2';
        });
        var hasLevel3 = selectionFiltersList.some(function (f) {
          return f.listName === 'SOs' && f.soLevel === 'sublevel3';
        });

        if (!hasStrategy) {
          return {
            strategies: true,
            pillars: true,
            mainGoals: true,
            goal2: true,
            goal3: true,
            kpis: true,
          };
        }
        if (hasLevel3) {
          return {
            strategies: false,
            pillars: false,
            mainGoals: false,
            goal2: false,
            goal3: false,
            kpis: true,
          };
        }
        if (hasLevel2) {
          return {
            strategies: false,
            pillars: false,
            mainGoals: false,
            goal2: false,
            goal3: true,
            kpis: true,
          };
        }
        if (hasLevel1) {
          return {
            strategies: false,
            pillars: false,
            mainGoals: false,
            goal2: true,
            goal3: true,
            kpis: true,
          };
        }
        // strategy only
        return {
          strategies: false,
          pillars: true,
          mainGoals: true,
          goal2: true,
          goal3: true,
          kpis: true,
        };
      }

      async function callGetStrategyPageData(selectionFiltersList, pageFilters) {
        const access = getStrategyAccessPlaintext();
        if (!access.roleLevel || !access.userId || !access.groupName) {
          console.error(
            '[StrategyMain] level plaintext incomplete — server will fail with Parameter s',
            access
          );
          throw new Error(
            'Cannot call getstrategypagedata: role/userId/groupName missing'
          );
        }
        console.log('[StrategyMain] level plaintext =', access.plaintext);
        const key = await importKeyFromBase64(base64Key);
        const iv = base64ToUint8Array(base64IV);
        const encryptedLevel = await encryptData(key, access.plaintext, iv);
        const languageHeader =
          localStorage.getItem('lng') == null ||
          localStorage.getItem('lng') == 'ar'
            ? 'ar'
            : 'en';
        const body = {
          pageFilters: pageFilters || {
            sectorCode: '',
            subSectorCode: '',
          },
          selectionFiltersList:
            selectionFiltersList && selectionFiltersList.length
              ? selectionFiltersList
              : getEmptySelectionFilters(),
          level: encryptedLevel,
        };
        const response = await fetch(
          `${APIURL}/general/getstrategypagedata`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Language: languageHeader,
              'User-Id': String(access.userId),
            },
            body: JSON.stringify(body),
          }
        );
        const data = await response.json();
        if (!response.ok || data.isSuccess === false) {
          throw new Error(
            data.errorMessageEn ||
              data.errorMessageAr ||
              'getstrategypagedata failed'
          );
        }
        return data.result || {};
      }

      async function FetchFirstLoad(submittedFilter = {}) {
        console.log('[StrategyMain] calling getstrategypagedata...', APIURL);
        showLoader();
        try {
          var pageFilters = buildPageFiltersFromUi(submittedFilter);
          var result = await callGetStrategyPageData(
            getEmptySelectionFilters(),
            pageFilters
          );
          applyStrategyPageResult(result, {
            strategies: true,
            pillars: true,
            mainGoals: true,
            goal2: true,
            goal3: true,
            kpis: true,
          });
          hideLoader();
        } catch (error) {
          hideLoader();
          console.error('Failed to fetch strategy page data:', error);
        }
      }
      FetchFirstLoad();
      const levels = [
        {
          id: 'strategies-cards-container',
          nextLevels: [
            'pillar-cards-container',
            'mainGoal-cards-container',
            'Goal2-cards-container',
            'Goal3-cards-container',
            'kpis-strategic-container',
          ],
          filterKey: 'strategyCode',
        },
        {
          id: 'pillar-cards-container',
          nextLevels: [
            'mainGoal-cards-container',
            'Goal2-cards-container',
            'Goal3-cards-container',
            'kpis-strategic-container',
          ],
          filterKey: 'pillarCode',
        },
        {
          id: 'mainGoal-cards-container',
          nextLevels: [
            'Goal2-cards-container',
            'Goal3-cards-container',
            'kpis-strategic-container',
          ],
          filterKey: 'mainGoalCode',
        },
        {
          id: 'Goal2-cards-container',
          nextLevels: ['Goal3-cards-container', 'kpis-strategic-container'],
          filterKey: 'goal2Code',
        },
        {
          id: 'Goal3-cards-container',
          nextLevels: ['kpis-strategic-container'],
          filterKey: 'goal3Code',
        },
      ];

      // Object to store selected filters for each level (codes for UI restore)
      const selectedFilters = {
        strategyCode: '',
        pillarCode: '',
        mainGoalCode: '',
        goal2Code: '',
        goal3Code: '',
      };
      // Persist SharePoint/API item ids so body stays correct across pagination re-renders
      const selectedItemIds = {
        strategy: null,
        mainGoal: null,
        goal2: null,
        goal3: null,
      };

      function resetCardSelectionState() {
        selectedFilters.strategyCode = '';
        selectedFilters.pillarCode = '';
        selectedFilters.mainGoalCode = '';
        selectedFilters.goal2Code = '';
        selectedFilters.goal3Code = '';
        selectedItemIds.strategy = null;
        selectedItemIds.mainGoal = null;
        selectedItemIds.goal2 = null;
        selectedItemIds.goal3 = null;
      }

      function readCardItemId(card) {
        if (!card) return null;
        var idAttr =
          card.getAttribute('data-id') ||
          (card.querySelector('[data-currentid]') &&
            card
              .querySelector('[data-currentid]')
              .getAttribute('data-currentid')) ||
          (card.parentElement && card.parentElement.getAttribute('data-id'));
        var itemId = parseInt(idAttr, 10);
        return isNaN(itemId) ? null : itemId;
      }

      function setSelectedFromCard(filterKey, card) {
        var code = card ? card.getAttribute('data-code') || '' : '';
        var itemId = readCardItemId(card);
        selectedFilters[filterKey] = code;
        if (filterKey === 'strategyCode') selectedItemIds.strategy = itemId;
        else if (filterKey === 'mainGoalCode') selectedItemIds.mainGoal = itemId;
        else if (filterKey === 'goal2Code') selectedItemIds.goal2 = itemId;
        else if (filterKey === 'goal3Code') selectedItemIds.goal3 = itemId;
      }

      function clearSelectedLevel(filterKey) {
        selectedFilters[filterKey] = '';
        if (filterKey === 'strategyCode') selectedItemIds.strategy = null;
        else if (filterKey === 'mainGoalCode') selectedItemIds.mainGoal = null;
        else if (filterKey === 'goal2Code') selectedItemIds.goal2 = null;
        else if (filterKey === 'goal3Code') selectedItemIds.goal3 = null;
      }

      let listenersInitialized = false;

      function initializeCheckMarkActive() {
        // If listeners are already initialized, return
        if (listenersInitialized) return;

        // Set the flag to true to prevent future initializations
        listenersInitialized = true;

        // Now set up the event listeners
        levels.forEach(({ id, nextLevels, filterKey }) => {
          const section = document.getElementById(id);
          if (!section) return;

          // Use event delegation to handle clicks on cards
          section.addEventListener('click', function (event) {
            // Find the mainCard that was clicked
            const card = event.target.closest('.mainCard');
            if (!card) return;

            // If the click happened on the specific element, do nothing
            if (event.target.closest('.show-more')) {
              return;
            }

            const checkmarkContainer = card.querySelector(
              '.checkmark-container'
            );
            if (!checkmarkContainer) return;

            // If the card is already active, remove active and reset the filter
            if (card.classList.contains('active')) {
              // Remove the active class and hide the checkmark
              card.classList.remove('active');
              checkmarkContainer.classList.remove('show');

              // Reset the selected filter for this level
              clearSelectedLevel(filterKey);

              // Reset filters for all subsequent levels
              resetSubsequentFilters(filterKey);

              // If we're at the top level (strategy), reset everything with FirstLoad
              if (filterKey === 'strategyCode') {
                FetchFirstLoad();
                return;
              }

              // Otherwise, re-fetch data based on current filters
              fetchUpdatedData();
              return;
            }

            // If the card is not active, deactivate all other cards in this section
            const allCardsInSection = section.querySelectorAll('.mainCard');
            allCardsInSection.forEach((c) => {
              c.classList.remove('active');
              const container = c.querySelector('.checkmark-container');
              if (container) container.classList.remove('show');
            });

            // Add active and show classes to the clicked card
            card.classList.add('active');
            checkmarkContainer.classList.add('show');

            // Persist code + itemId for body rebuild / restore
            setSelectedFromCard(filterKey, card);

            // Reset filters for all subsequent levels when selecting a new item
            resetSubsequentFilters(filterKey);

            // Fetch updated data for the next levels based on the selected filter
            setTimeout(function () {
              fetchUpdatedData(); // Now it sees the updated selectedFilters
            }, 0);
          });
        });
      }

      function restoreActiveCards() {
        levels.forEach(function (level) {
          var section = document.getElementById(level.id);
          var filterValue = selectedFilters[level.filterKey];

          if (!section || !filterValue) return;

          var cards = section.querySelectorAll('.mainCard');
          for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            if (card.getAttribute('data-code') === filterValue) {
              card.classList.add('active');
              var mark = card.querySelector('.checkmark-container');
              if (mark) {
                mark.classList.add('show');
              }
              break; // only one match per level
            }
          }
        });
      }

      // Helper function to add checkmark containers to cards
      function addCheckmarkContainers() {
        levels.forEach(({ id }) => {
          const section = document.getElementById(id);
          if (!section) return;

          const cards = section.querySelectorAll('.mainCard');
          cards.forEach((card) => {
            // Only add if it doesn't exist
            if (!card.querySelector('.checkmark-container')) {
              const checkmarkContainer = document.createElement('div');
              checkmarkContainer.classList.add('checkmark-container');
              checkmarkContainer.innerHTML = `<i class="fas fa-check checkmark"></i>`;
              card.appendChild(checkmarkContainer);
            }
          });
        });
      }

      // Helper function to reset subsequent filters based on the current level
      function resetSubsequentFilters(currentFilterKey) {
        let foundCurrent = false;

        // Define the order of filters
        const filterOrder = [
          'strategyCode',
          'pillarCode',
          'mainGoalCode',
          'goal2Code',
          'goal3Code',
        ];

        // Reset all filters that come after the current one
        filterOrder.forEach((key) => {
          if (foundCurrent) {
            clearSelectedLevel(key);
          }
          if (key === currentFilterKey) {
            foundCurrent = true;
          }
        });

        // Clear UI for subsequent levels
        levels.forEach((level) => {
          if (level.filterKey === currentFilterKey) {
            level.nextLevels.forEach((nextLevelId) => {
              const nextLevel = document.getElementById(nextLevelId);
              if (nextLevel) {
                nextLevel.innerHTML = '';
              }
            });
          }
        });
      }

      function fetchUpdatedData() {
        async function run() {
          showLoader();
          try {
            var selectionFiltersList = buildSelectionFiltersFromPage();
            console.log(
              '[StrategyMain] selectionFiltersList =',
              selectionFiltersList
            );
            var isEmptySelection =
              selectionFiltersList.length === 1 &&
              !selectionFiltersList[0].listName &&
              !selectionFiltersList[0].itemId;

            if (isEmptySelection) {
              hideLoader();
              FetchFirstLoad();
              return;
            }

            var pageFilters = buildPageFiltersFromUi();
            var result = await callGetStrategyPageData(
              selectionFiltersList,
              pageFilters
            );
            applyStrategyPageResult(
              result,
              getUpdateOptionsFromSelection(selectionFiltersList)
            );
            hideLoader();
          } catch (error) {
            hideLoader();
            console.error('Failed to refresh strategy page data:', error);
          } finally {
            setTimeout(function () {
              addCheckmarkContainers();
              restoreActiveCards();
            }, 500);
          }
        }
        run();
      }

      // FetchFirstLoad();
      // Function to create strategy cards
      function createStrategyCards(strategyData, strategyContainer) {
        if (!strategyContainer) {
          console.error('Error: `strategies-container` not found.');
          return;
        }
        strategyContainer.innerHTML = '';
        // Loop through the strategyArray and create cards
        if (strategyData.Result.length > 0) {
          strategyData.Result.forEach((strategy, index) => {
            // Create the col-3 div
            const card = document.createElement('div');
            card.className = ' col-4 p-3 mb-3';
            // card.className = 'col px-2 pb-3 mb-3';
            // card.style.minWidth = '19%';
            // card.style.maxWidth = '20%';

            // Generate unique class for the card
            const uniqueClass = 'card-strg' + (strategy.Id || 'no-id');

            // Determine if the card is the first one and set it as active
            const isActive = index === 0 ? 'active' : '';

            // Create the inner card structure
            const mainCard = document.createElement('div');
            mainCard.className = `mainCard link-item my-3 p-3 fade-in h-100 d-flex flex-column justify-content-between ${uniqueClass}`;
            mainCard.setAttribute('data-code', strategy.StrategyCode);
            mainCard.setAttribute('data-id', strategy.Id);
            var statusColor = applyCardStatusColor(
              mainCard,
              '#strategies',
              strategy.ProgressStatus
            );

            // mainCard.innerHTML = `
            mainCard.innerHTML = `
          <div class="main-title" title="${strategy.Name}">${
              strategy.Name
            }</div>
          <div class="w-100 d-flex align-items-center justify-content-start">
          ${
            strategy.Description != null && strategy.Description.trim()
              ? `<p class="sub-title" title="${strategy.Description}">${strategy.Description}</p>`
              : `<span class="Resources sub-title" data-trans-nodata></span>`
          }
          </div>
          <p class="text-end show-more d-flex align-items-center flex-row-reverse"
           id="${strategy.Id}"
            data-currentid="${strategy.Id || No_Data}"
            data-title="${strategy.Name || No_Data}"
            data-description="${strategy.Description || No_Data}"
            data-progresspercentage="${strategy.ProgressPercentage || No_Data}"
            data-progressstatus="${strategy.ProgressStatus || 'kpi-novalue'}"
            data-haspillars="${strategy.HasPillars || No_Data}"
            data-type="${strategy.Type || No_Data}"
            data-value="${strategy.Value || No_Data}"
            data-vision="${strategy.Vision || No_Data}"
            data-goals="${strategy.Goals || No_Data}"
            data-approvaldate="${strategy.ApprovalDate || No_Data}"
            data-relatedstrategy="${strategy.RelatedStrategy || No_Data}"
            data-deletionstatus="${strategy.DeletionStatus || No_Data}"
            data-strategycode="${strategy.StrategyCode || No_Data}"
            data-statuscolor="${statusColor || '#a9a9a9'}"
      >
            <span class="arrow d-flex align-items-center"><i class="fas fa-long-arrow-alt-left"></i></span>
            <span class="Resources content" data-trans-viewmore></span>
          </p>
        </div>
    `;

            // Add checkmark container
            const checkmarkContainer = document.createElement('div');
            checkmarkContainer.classList.add('checkmark-container');
            checkmarkContainer.innerHTML = `<i class="fas fa-check checkmark"></i>`;
            mainCard.appendChild(checkmarkContainer);

            // Add the card HTML to the colDiv
            // Append the colDiv to the container
            card.appendChild(mainCard);
            strategyContainer.appendChild(card);
          });
        } else {
          strategyContainer.innerHTML = `<div class="m-auto"><p class="Resources" data-trans-nostrategies>  </p></div>`;
        }
        // checkMarkActive();
        const paginationContainer = document.createElement('div');
        paginationContainer.classList.add(
          'w-100',
          'd-flex',
          'justify-content-between',
          'align-items-center',
          'mt-4'
        );

        let paginationHTML = `
  <div class="col-12 p-0">
    <div class="d-flex justify-content-between align-items-center pagination-status-bar">
      ${buildPaginationNavHtml(strategyData)}
      <div class="status">
        <span> <span class="Resources" data-trans-kpi-novalue> </span>  <span class="dot dot-blue"></span></span>
        <span > <span class="Resources" data-trans-stg-draft> </span> <span class="dot dot-gray"></span></span>
        <span > <span class="Resources" data-trans-stg-ontrack> </span> <span class="dot dot-green"></span></span>
        <span > <span class="Resources" data-trans-stg-late>  </span> <span class="dot dot-yellow"></span></span>
        <span > <span class="Resources" data-trans-stg-toolate> </span> <span class="dot dot-aqua"></span></span>
      </div>
    </div>
  </div>
  `;

        paginationContainer.innerHTML = paginationHTML;
        strategyContainer.appendChild(paginationContainer);
        bindClientPagination(paginationContainer, strategyData, 'strategies');

        strategyContainer.querySelectorAll('.show-more').forEach((element) => {
          element.addEventListener('click', function () {
            const modal = document.getElementById('goalModal');
            const modalBody = modal.querySelector('.modal-body');
            const modalTitle = modal.querySelector('.section-title');
            const data = {
              id: this.getAttribute('data-currentid'),
              title: this.getAttribute('data-title'),
              description: this.getAttribute('data-description'),
              progressPercentage: this.getAttribute('data-progresspercentage'),
              progressStatus: this.getAttribute('data-progressstatus'),
              hasPillars: this.getAttribute('data-haspillars'),
              type: this.getAttribute('data-type'),
              value: this.getAttribute('data-value'),
              vision: this.getAttribute('data-vision'),
              goals: this.getAttribute('data-goals'),
              approvalDate: this.getAttribute('data-approvaldate'),
              relatedStrategy: this.getAttribute('data-relatedstrategy'),
              deletionStatus: this.getAttribute('data-deletionstatus'),
              strategyCode: this.getAttribute('data-strategycode'),
              statusColor: this.getAttribute('data-statuscolor'),
            };

            let formattedDate = No_Data;

            if (data.approvalDate && data.approvalDate.trim() !== '') {
              const dateObj = new Date(data.approvalDate);

              if (!isNaN(dateObj.getTime())) {
                const day = String(dateObj.getDate()).padStart(2, '0');
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const year = dateObj.getFullYear();

                formattedDate = `${day}/${month}/${year}`;
              }
            }
            modalTitle.innerHTML = `
          <span class="Resources" data-trans-strategies> </span>
        `;
            // Populate the modal with the extracted data
            modalBody.innerHTML = `
        <h5 class="section-title align-div-label mb-3 Resources" >
          <span class="Resources label  " data-trans-strategyname></span>
          <span>${data.title} </span>
        </h5>

        <div class="d-flex justify-content-between align-items-baseline mb-3">
          <div class="align-div-label">
            <span class="Resources label  " data-trans-code></span>
            <p>${data.strategyCode}</p>
          </div>
          <div class="align-div-label">
            <span class="Resources label" data-trans-progressstatus></span>
            <span class="status-approved">
              <span class="Resources mx-2" data-trans-${data.progressStatus} style="color: ${data.statusColor}; font-size: 14px"> </span>
              <i class="fas fa-circle" style="color: ${data.statusColor}; font-size: 8px"></i>
            </span>
          </div>
        </div>

        <div class="align-div-label mb-3">
          <span class="Resources label  " data-trans-strategydescription></span>
          <p>${data.description}</p>
        </div>

        <div class="d-flex justify-content-between align-items-center pagination-status-bar">
          <div class="align-div-label">
            <span class="Resources label" data-trans-type></span>
            <p class="Resources" data-trans-${data.type}> </p>
          </div>

          <div class="align-div-label">
            <div class="align-div-label">
              <span class="Resources label" data-trans-relatedstrategy></span>
              <p>${data.relatedStrategy}</p>
            </div>
          </div>

          <div class="align-div-label">
            <div class="align-div-label">
              <span class="Resources label" data-trans-date></span>
              <p>${formattedDate}</p>
            </div>
          </div>
        </div>

    `;

            $(modal).modal('show');
            changeResources();

            const detailButton = modal.querySelector('.btn-red');
            detailButton.style.display = 'block'; // Always show first
            // Remove any existing event listeners
            const newDetailButton = detailButton.cloneNode(true);
            detailButton.parentNode.replaceChild(newDetailButton, detailButton);
            newDetailButton.addEventListener('click', function () {
              const newUrl = `${_spPageContextInfo.webAbsoluteUrl}/SitePages/strategyHome.aspx?code=${data.strategyCode}`;

              window.open(newUrl, '_blank');
            });
          });
        });
      }

      // Function to create pillar cards and pagination
      function createPillarCards(pillarsData, pillarsContainer) {
        if (!pillarsContainer) {
          console.error('Error: `pillar-cards-container` not found.');
          return;
        }
        pillarsContainer.innerHTML = '';
        if (pillarsData.Result.length > 0) {
          pillarsData.Result.forEach((pillar, index) => {
            const card = document.createElement('div');

            // Generate unique class for the card
            const uniqueClass = 'card-pilr' + (pillar.Id || 'no-id');

            // Determine if the card is the first one and set it as active
            const isActive = index === 0 ? 'active' : '';

            card.className = 'col-4 p-3 mb-3';
            card.setAttribute('data-id', pillar.Id);
            card.setAttribute('data-name', pillar.Name);
            const mainCard = document.createElement('div');
            mainCard.className = `mainCard p-3 fade-in h-100 d-flex flex-column justify-content-between ${uniqueClass}`;
            mainCard.setAttribute('data-code', pillar.Code);
            var statusColor = applyCardStatusColor(
              mainCard,
              '#pillars',
              pillar.ProgressStatus
            );

            mainCard.innerHTML = `
        <div class="main-title" title="${pillar.Name}">${pillar.Name}</div>
        <div class="w-100 d-flex align-items-center justify-content-between flex-wrap">
        <div class="w-50">
        ${
          pillar.Description != null && pillar.Description.trim()
            ? `<p class="sub-title" title="${pillar.Description}">${pillar.Description}</p>`
            : `<span class="Resources sub-title" data-trans-nodata></span>`
        }
        </div>
          <p class="text-end show-more d-flex align-items-center flex-row-reverse"
            id="${pillar.Id}"
            data-currentid="${pillar.Id || No_Data}"
            data-title="${pillar.Name || No_Data}"
            data-code="${pillar.Code || No_Data}"
            data-description="${pillar.Description || No_Data}"
            data-progresspercentage="${pillar.ProgressPercentage || No_Data}"
            data-progressstatus="${pillar.ProgressStatus || 'kpi-novalue'}"
            data-relatedstrategy="${pillar.RelatedStrategyName || No_Data}"
            data-deletionstatus="${pillar.DeletionStatus || No_Data}"
             data-statuscolor="${statusColor || '#a9a9a9'}"
            >
            <span class="arrow d-flex align-items-center">
              <i class="fas fa-long-arrow-alt-left"></i>
            </span>
            <span class="Resources content" data-trans-viewmore></span>
          </p>
        </div>
      </div>
    `;

            // Add checkmark container
            const checkmarkContainer = document.createElement('div');
            checkmarkContainer.classList.add('checkmark-container');
            checkmarkContainer.innerHTML = `<i class="fas fa-check checkmark"></i>`;
            mainCard.appendChild(checkmarkContainer);

            card.appendChild(mainCard);
            pillarsContainer.appendChild(card);
          });
        } else {
          pillarsContainer.innerHTML = `<div class="m-auto"><p class="Resources" data-trans-nopillars> </p></div>`;
          changeResources();
          return;
        }
        // checkMarkActive();

        const paginationContainer = document.createElement('div');
        paginationContainer.classList.add(
          'w-100',
          'd-flex',
          'justify-content-between',
          'align-items-center',
          'mt-4'
        );

        let paginationHTML = `
      <div class="col-12 p-0">
        <div class="d-flex justify-content-between align-items-center pagination-status-bar">
          ${buildPaginationNavHtml(pillarsData)}

           <div class="status">
        <span> <span class="Resources" data-trans-kpi-novalue> </span>  <span class="dot dot-blue"></span></span>
        <span > <span class="Resources" data-trans-plr-draft> </span> <span class="dot dot-gray"></span></span>
        <span > <span class="Resources" data-trans-plr-ontrack> </span> <span class="dot dot-green"></span></span>
        <span > <span class="Resources" data-trans-plr-late>  </span> <span class="dot dot-yellow"></span></span>
        <span > <span class="Resources" data-trans-plr-toolate> </span> <span class="dot dot-aqua"></span></span>
      </div>
        </div>
      </div>
      `;

        paginationContainer.innerHTML = paginationHTML;
        pillarsContainer.appendChild(paginationContainer);

        paginationContainer.querySelectorAll('.page-handle').forEach((link) => {
          link.addEventListener('click', (event) => {
            event.preventDefault();
            const action = event.currentTarget.getAttribute('data-action');
            const pageIndex = parseInt(
              event.currentTarget.getAttribute('data-page') ||
                event.target.getAttribute('data-page'),
              10
            );
            const lastItemId =
              pillarsData.Result[pillarsData.Result.length - 1].Id;
            if (action === 'next') {
              fetchPillarPaginated(
                pillarsData.PageIndex + 1,
                lastItemId,
                pillarsContainer,
                selectedFilters.strategyCode
              );
            } else if (action === 'prev') {
              fetchPillarPaginated(
                pillarsData.PageIndex - 1,
                lastItemId,
                pillarsContainer,
                selectedFilters.strategyCode
              );
            } else if (!isNaN(pageIndex)) {
              fetchPillarPaginated(
                pageIndex,
                lastItemId,
                pillarsContainer,
                selectedFilters.strategyCode
              );
            }
          });
        });

        // Add event listener to open the modal when 'show-more' is clicked
        pillarsContainer.querySelectorAll('.show-more').forEach((element) => {
          element.addEventListener('click', function () {
            const modal = document.getElementById('goalModal');
            const modalBody = modal.querySelector('.modal-body');
            const modalTitle = modal.querySelector('.section-title');

            // Extract data attributes from the clicked 'show-more' element
            const data = {
              id: this.getAttribute('data-currentid'),
              title: this.getAttribute('data-title'),
              code: this.getAttribute('data-code'),
              description: this.getAttribute('data-description'),
              progressPercentage: this.getAttribute('data-progresspercentage'),
              progressStatus: this.getAttribute('data-progressstatus'),
              relatedStrategy: this.getAttribute('data-relatedstrategy'),
              deletionStatus: this.getAttribute('data-deletionstatus'),
              statusColor: this.getAttribute('data-statuscolor'),
            };

            // Populate the modal with the extracted data
            modalTitle.innerHTML = `
          <span class="Resources" data-trans-pillars> </span>
        `;
            modalBody.innerHTML = `
            <h5 class="section-title align-div-label mb-3 Resources" >
              <span class="Resources label  " data-trans-pillersname></span>
              <span>${data.title} </span>
            </h5>

            <div class="d-flex justify-content-between align-items-baseline mb-3">
              <div class="align-div-label">
                <span class="Resources label  " data-trans-code></span>
                <p>${data.code}</p>
              </div>

              <div class="align-div-label">
                <span class="Resources label" data-trans-progressstatus></span>
                <span class="status-approved">
                  <span class="Resources mx-2" data-trans-${data.progressStatus}
                  style="color: ${data.statusColor}; font-size: 14px"> </span>
                  <i class="fas fa-circle" style="color: ${data.statusColor}; font-size: 8px"></i>
                </span>
              </div>

            </div>

            <div class="align-div-label mb-3">
              <span class="Resources label  " data-trans-description></span>
              <p>${data.description}</p>
            </div>

            <div class="d-flex justify-content-between align-items-center pagination-status-bar">
              <div class="align-div-label">
                <span class="Resources label  " data-trans-relatedstrategy></span>
                <p>${data.relatedStrategy}</p>
              </div>
            </div>

       `;
            changeResources();
            // Show the modal
            $(modal).modal('show'); // Using jQuery for Bootstrap modal
            const detailButton = modal.querySelector('.btn-red');
            detailButton.style.display = 'block'; // Always show first

            // hide btn
            // if (modalTitle.querySelector('[data-trans-pillars]')) {
            //   detailButton.style.display = 'none';
            // }
            // Remove any existing event listeners
            const newDetailButton = detailButton.cloneNode(true);
            detailButton.parentNode.replaceChild(newDetailButton, detailButton);
            newDetailButton.addEventListener('click', function (event) {
              event.preventDefault();
              const newUrl = `${_spPageContextInfo.webAbsoluteUrl}/SitePages/PillarHome.aspx?PLRCODE=${data.id}`;

              window.open(newUrl, "_blank");
            });
          });
        });
      }

      async function fetchPillarPaginated(
        pageIndex,
        lastItemId,
        container,
        strategyCode
      ) {
        const key = await importKeyFromBase64(base64Key);
        const iv = base64ToUint8Array(base64IV);
        showLoader();
        let pageSize = 6; // Define how many items per page
        let apiUrl = `${APIURL}/pillars/getpillarswithpaganation?lastItemId=${lastItemId}&pageSize=${pageSize}&orderBy=ID&pageIndex=${pageIndex}`;
        if (strategyCode) {
          apiUrl += `&strategyCode=${strategyCode}`;
        }
        let encryptedBody = '';
        let requiredListNames = ['SPillars'];
        if (combinedQueryValues && combinedQueryValues.length > 0) {
          let finalQueryValues = normalizeCombinedQueryValues(
            combinedQueryValues,
            requiredListNames
          );
          let payloadString = JSON.stringify(finalQueryValues);
          encryptedPayload = await encryptData(key, payloadString, iv);
          encryptedBody = JSON.stringify(encryptedPayload);
        }
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json; odata=verbose',
            'Content-Type': 'application/json',
            'SPM-API-Key': '45e19028481c4e5093929d10a754f6af',
            'User-Id': window.currentUserData.Id,
          },
          body: combinedQueryValues.length > 0 ? encryptedBody : null,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data && data.Result.length > 0) {
              hideLoader();
              container.innerHTML = ''; // Clear only this card's content
              createPillarCards(data, container); // Re-render this card's content
              changeResources();
            } else {
              hideLoader();
              console.warn('No more data available for this pillar.');
            }
          })
          .catch((error) => {
            hideLoader();
            console.error(
              'Failed to fetch paginated data for this pillar:',
              error
            );
          });
      }

      // Wait for the collapse to start and apply the fade and scale effects
      $('#pillar').on('show.bs.collapse', function () {
        // Apply fade-in and scale-up effect when expanding
        const card = $('#pillar .collapse.show');
        card.css({
          opacity: '0',
          transform: 'scale(0.9)',
        });

        setTimeout(() => {
          card.css({
            opacity: '1',
            transform: 'scale(1)',
          });
        }, 100);
      });

      // Apply the fade-out and scale-down effect when collapsing
      $('#pillar').on('hide.bs.collapse', function () {
        const card = $('#pillar .collapse');
        card.css({
          opacity: '0',
          transform: 'scale(0.9)',
        });
      });

      function createMainGoals(mainGoalData, mainGoalContainer) {
        if (!mainGoalContainer) {
          console.error(
            'Error: `mainGoal-cards-container` is not found in DOM.'
          );
          return;
        }
        mainGoalContainer.innerHTML = '';
        if (mainGoalData.Result.length > 0) {
          mainGoalData.Result.forEach((mainGoal, index) => {
            const card = document.createElement('div');

            // Generate unique class for the card
            const uniqueClass = 'card-maingoal' + (mainGoal.Id || 'no-id');

            // Determine if the card is the first one and set it as active
            const isActive = index === 0 ? 'active' : '';

            card.className = 'col-4 p-3 mb-3';
            card.setAttribute('data-id', mainGoal.Id);
            card.setAttribute('data-name', mainGoal.Name);

            const mainCard = document.createElement('div');
            mainCard.className = `mainCard p-3 fade-in h-100 d-flex flex-column justify-content-between ${uniqueClass}`;
            mainCard.setAttribute('data-code', mainGoal.Title);
            mainCard.setAttribute('data-id', mainGoal.Id);
            var statusColor = applyCardStatusColor(
              mainCard,
              '#objectives',
              mainGoal.ProgressStatus
            );

            mainCard.innerHTML = `
          <div class="main-title" title="${mainGoal.Name}">${
              mainGoal.Name
            }</div>
          <div class="w-100 d-flex align-items-center justify-content-between flex-wrap">
          <div class="w-50">
          ${
            mainGoal.Description != null && mainGoal.Description.trim()
              ? `<p class="sub-title" title="${mainGoal.Description}">${mainGoal.Description}</p>`
              : `<span class="Resources sub-title" data-trans-nodata></span>`
          }
          </div>
            <p class="text-end show-more d-flex align-items-center flex-row-reverse"

              id="${mainGoal.Id}"
            data-currentid="${mainGoal.Id || No_Data}"
            data-title="${mainGoal.Name || No_Data}"
            data-code="${mainGoal.Title || No_Data}"
            data-description="${mainGoal.Description || No_Data}"
            data-progresspercentage="${mainGoal.ProgressPercentage || No_Data}"
            data-progressstatus="${mainGoal.ProgressStatus || 'kpi-novalue'}"
            data-relatedstrategy="${mainGoal.RelatedStrategy || No_Data}"
            data-deletionstatus="${mainGoal.DeletionStatus || No_Data}"
            data-objectiveowner="${mainGoal.ObjectiveOwner || No_Data}"
            data-secondowner="${mainGoal.SecondOwner || No_Data}"
            data-type="${mainGoal.Type || No_Data}"
            data-department="${
              isArabicLang()
                ? mainGoal.DepartmentAr || No_Data
                : mainGoal.DepartmentEn || No_Data
            }"
            data-sector="${
              isArabicLang()
                ? mainGoal.SectorAr || No_Data
                : mainGoal.SectorArEn || No_Data
            }"
             data-statuscolor="${statusColor || '#a9a9a9'}">
              <span class="arrow d-flex align-items-center"><i class="fas fa-long-arrow-alt-left"></i></span>
              <span class="Resources content" data-trans-viewmore></span>
            </p>
          </div>
        </div>
    `;
            // card.querySelector('.mainCard').addEventListener('click', function () {
            //   // Remove 'active' class from all cards
            //   document
            //     .querySelectorAll('.mainCard')
            //     .forEach((card) => card.classList.remove('active'));

            //   // Add 'active' class to the clicked card
            //   this.classList.add('active');
            // });

            // Add checkmark container
            const checkmarkContainer = document.createElement('div');
            checkmarkContainer.classList.add('checkmark-container');
            checkmarkContainer.innerHTML = `<i class="fas fa-check checkmark"></i>`;
            mainCard.appendChild(checkmarkContainer);

            card.appendChild(mainCard);
            mainGoalContainer.appendChild(card);
          });
        } else {
          mainGoalContainer.innerHTML = `<div class="m-auto"><p class="Resources" data-trans-nogoals>  </p></div>`;
        }
        // checkMarkActive();
        const totalPages = Math.ceil(
          mainGoalData.CountTotalItem / mainGoalData.PageSize
        );
        const paginationContainer = document.createElement('div');
        paginationContainer.classList.add(
          'w-100',
          'd-flex',
          'justify-content-between',
          'align-items-center',
          'mt-4'
        );

        let paginationHTML = `
      <div class="col-12 p-0">
        <div class="d-flex justify-content-between align-items-center pagination-status-bar">
          ${buildPaginationNavHtml(mainGoalData)}
          <div class="status">
            <span> <span class="Resources" data-trans-stat43> </span>  <span class="dot dot-blue"></span></span>
            <span > <span class="Resources" data-trans-stat32> </span> <span class="dot dot-gray"></span></span>
            <span > <span class="Resources" data-trans-stat42> </span> <span class="dot dot-gray"></span></span>
            <span > <span class="Resources" data-trans-stat22> </span> <span class="dot dot-green"></span></span>
            <span > <span class="Resources" data-trans-stat21>  </span> <span class="dot dot-yellow"></span></span>
            <span > <span class="Resources" data-trans-stat20> </span> <span class="dot dot-aqua"></span></span>
          </div>
        </div>
      </div>
      `;

        paginationContainer.innerHTML = paginationHTML;
        mainGoalContainer.appendChild(paginationContainer);
        bindClientPagination(paginationContainer, mainGoalData, 'mainGoals');

        // Add event listener to open the modal when 'show-more' is clicked
        mainGoalContainer.querySelectorAll('.show-more').forEach((element) => {
          element.addEventListener('click', function () {
            const modal = document.getElementById('goalModal');
            const modalBody = modal.querySelector('.modal-body');
            const modalTitle = modal.querySelector('.section-title');

            // Extract data attributes from the clicked 'show-more' element
            const data = {
              id: this.getAttribute('data-currentid'),
              title: this.getAttribute('data-title'),
              code: this.getAttribute('data-code'),
              description: this.getAttribute('data-description'),
              progressPercentage: this.getAttribute('data-progresspercentage'),
              progressStatus: this.getAttribute('data-progressstatus'),
              relatedStrategy: this.getAttribute('data-relatedstrategy'),
              deletionStatus: this.getAttribute('data-deletionstatus'),
              objectiveOwner: this.getAttribute('data-objectiveowner'),
              secondOwner: this.getAttribute('data-secondowner'),
              department: this.getAttribute('data-department'),
              sector: this.getAttribute('data-sector'),
              statusColor: this.getAttribute('data-statuscolor'),
            };
            modalTitle.innerHTML = `
          <span class="Resources" data-trans-maingoals> </span>
        `;

            // Populate the modal with the extracted data
            modalBody.innerHTML = `
            <h5 class="section-title align-div-label mb-3 Resources" >
              <span class="Resources label  " data-trans-maingoal></span>
              <span>${data.title} </span>
            </h5>

            <div class="d-flex justify-content-between align-items-baseline mb-3">
              <div class="align-div-label">
                <span class="Resources label  " data-trans-code></span>
                <p>${data.code}</p>
              </div>
              <div class="align-div-label">
                <span class="Resources label" data-trans-progressstatus></span>
                <span class="status-approved">
                  <span class="Resources mx-2" data-trans-${data.progressStatus} style="color: ${data.statusColor}; font-size: 14px"> </span>
                  <i class="fas fa-circle" style="color: ${data.statusColor}; font-size: 8px"></i>
                </span>
              </div>
            </div>
            <div class="align-div-label mb-3">
              <span class="Resources label  " data-trans-description></span>
              <p>${data.description}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center pagination-status-bar">
              <div class="align-div-label">
                <span class="Resources label  " data-trans-objectiveowner></span>
                <p>${data.objectiveOwner}</p>
              </div>
              <div class="align-div-label">
                <span class="Resources label" data-trans-secondowner></span>
                <p>${data.secondOwner}</p>
              </div>
              <div class="align-div-label">
                <span class="Resources label" data-trans-department></span>
                <p>${data.department}</p>
                </div>
              <div class="align-div-label">
                <span class="Resources label" data-trans-sector></span>
                <p>${data.sector}</p>
              </div>
            </div>

       `;
            changeResources();
            // Show the modal
            $(modal).modal('show'); // Using jQuery for Bootstrap modal
            const detailButton = modal.querySelector('.btn-red');
            detailButton.style.display = 'block'; // Always show first
            // Remove any existing event listeners
            const newDetailButton = detailButton.cloneNode(true);
            detailButton.parentNode.replaceChild(newDetailButton, detailButton);
            newDetailButton.addEventListener('click', function () {
              const newUrl = `${_spPageContextInfo.webAbsoluteUrl}/SitePages/View.aspx?ListKey=sos&IID=${data.id}`;

              window.open(newUrl, '_blank');
            });
          });
        });
      }

      async function fetchMainGoalPaginated(
        pageIndex,
        lastItemId,
        container,
        strategyCode,
        pillarCode
      ) {
        const key = await importKeyFromBase64(base64Key);
        const iv = base64ToUint8Array(base64IV);
        showLoader();
        let pageSize = 6; // Define how many items per page
        let apiUrl = `${APIURL}/objectives/getobjectiveswithpaganation?lastItemId=${lastItemId}&pageSize=${pageSize}&orderBy=ID&pageIndex=${pageIndex}&type=main`;

        if (strategyCode) {
          apiUrl += `&strategyCode=${strategyCode}`;
        }
        if (pillarCode) {
          apiUrl += `&pillarCode=${pillarCode}`;
        }
        let encryptedBody = '';
        let requiredListNames = ['SOs'];
        if (combinedQueryValues && combinedQueryValues.length > 0) {
          let finalQueryValues = normalizeCombinedQueryValues(
            combinedQueryValues,
            requiredListNames
          );
          let payloadString = JSON.stringify(finalQueryValues);
          encryptedPayload = await encryptData(key, payloadString, iv);
          encryptedBody = JSON.stringify(encryptedPayload);
        }
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json; odata=verbose',
            'Content-Type': 'application/json',
            'SPM-API-Key': '45e19028481c4e5093929d10a754f6af',
            'User-Id': window.currentUserData.Id,
          },
          body: combinedQueryValues.length > 0 ? encryptedBody : null,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data && data.Result.length > 0) {
              hideLoader();
              container.innerHTML = '';
              createMainGoals(data, container);
              changeResources();
            } else {
              hideLoader();
              console.warn('No more data available for this Strategy.');
            }
          })
          .catch((error) => {
            hideLoader();
            console.error(
              'Failed to fetch paginated data for this Strategy:',
              error
            );
          });
        addCheckmarkContainers(); // add checkmark DOM if missing
        restoreActiveCards(); // activate the selected card after render
      }
      // Wait for the collapse to start and apply the fade and scale effects
      $('#mainGoal').on('show.bs.collapse', function () {
        // Apply fade-in and scale-up effect when expanding
        const card = $('#mainGoal .collapse.show');
        card.css({
          opacity: '0',
          transform: 'scale(0.9)',
        });

        setTimeout(() => {
          card.css({
            opacity: '1',
            transform: 'scale(1)',
          });
        }, 100);
      });

      // Apply the fade-out and scale-down effect when collapsing
      $('#mainGoal').on('hide.bs.collapse', function () {
        const card = $('#mainGoal .collapse');
        card.css({
          opacity: '0',
          transform: 'scale(0.9)',
        });
      });

      // Function to create main cards and pagination
      function createGoal2Cards(goal2Data, goal2Container) {
        if (!goal2Container) {
          console.error('Error: `Goal2-cards-container` not found.');
          return;
        }
        goal2Container.innerHTML = '';
        // Loop through the GoalArray and create cards
        if (goal2Data.Result.length > 0) {
          goal2Data.Result.forEach((goal, index) => {
            const card = document.createElement('div');

            // Generate unique class for the card
            const uniqueClass = 'card-goal2' + (goal.Id || 'no-id');

            // Determine if the card is the first one and set it as active
            const isActive = index === 0 ? 'active' : '';

            card.className = 'col-4 p-3 mb-3';
            card.setAttribute('data-id', goal.Id);
            card.setAttribute('data-name', goal.Name);

            const mainCard = document.createElement('div');
            mainCard.className = `mainCard p-3 fade-in h-100 d-flex flex-column justify-content-between ${uniqueClass}`;
            mainCard.setAttribute('data-code', goal.Title);
            mainCard.setAttribute('data-id', goal.Id);
            var statusColor = applyCardStatusColor(
              mainCard,
              '#objectives',
              goal.ProgressStatus
            );

            mainCard.innerHTML = `
          <div class="main-title" title="${goal.Name}">${goal.Name}</div>
          <div class="w-100 d-flex align-items-center justify-content-between flex-wrap">
          <div class="w-50">
          ${
            goal.Description != null && goal.Description.trim()
              ? `<p class="sub-title" title="${goal.Description}">${goal.Description}</p>`
              : `<span class="Resources sub-title" data-trans-nodata></span>`
          }
          </div>
            <p class="text-end show-more d-flex align-items-center flex-row-reverse"

              id="${goal.Id}"
            data-currentid="${goal.Id || No_Data}"
            data-title="${goal.Name || No_Data}"
            data-code="${goal.Title || No_Data}"
            data-description="${goal.Description || No_Data}"
            data-progresspercentage="${goal.ProgressPercentage || No_Data}"
            data-progressstatus="${goal.ProgressStatus || 'kpi-novalue'}"
            data-relatedstrategy="${goal.RelatedStrategy || No_Data}"
            data-deletionstatus="${goal.DeletionStatus || No_Data}"
            data-objectiveowner="${goal.ObjectiveOwner || No_Data}"
            data-secondowner="${goal.SecondOwner || No_Data}"
            data-type="${goal.Type || No_Data}"
            data-department="${
              isArabicLang()
                ? goal.DepartmentAr || No_Data
                : goal.DepartmentEn || No_Data
            }"
            data-sector="${
              isArabicLang()
                ? goal.SectorAr || No_Data
                : goal.SectorArEn || No_Data
            }"
             data-statuscolor="${statusColor || '#a9a9a9'}"
            >
              <span class="arrow d-flex align-items-center"><i class="fas fa-long-arrow-alt-left"></i></span>
              <span class="Resources content" data-trans-viewmore></span>
            </p>
          </div>
        </div>
    `;

            // Add checkmark container
            const checkmarkContainer = document.createElement('div');
            checkmarkContainer.classList.add('checkmark-container');
            checkmarkContainer.innerHTML = `<i class="fas fa-check checkmark"></i>`;
            mainCard.appendChild(checkmarkContainer);

            card.appendChild(mainCard);
            goal2Container.appendChild(card);
          });
        } else {
          goal2Container.innerHTML = `<div class="m-auto"><p class="Resources" data-trans-nogoals>  </p></div>`;
        }
        // checkMarkActive();
        const paginationContainer = document.createElement('div');
        paginationContainer.classList.add(
          'w-100',
          'd-flex',
          'justify-content-between',
          'align-items-center',
          'mt-4'
        );

        let paginationHTML = `
      <div class="col-12 p-0">
        <div class="d-flex justify-content-between align-items-center pagination-status-bar">
          ${buildPaginationNavHtml(goal2Data)}

       <div class="status">
            <span> <span class="Resources" data-trans-stat43> </span>  <span class="dot dot-blue"></span></span>
            <span > <span class="Resources" data-trans-stat32> </span> <span class="dot dot-gray"></span></span>
            <span > <span class="Resources" data-trans-stat42> </span> <span class="dot dot-gray"></span></span>
            <span > <span class="Resources" data-trans-stat22> </span> <span class="dot dot-green"></span></span>
            <span > <span class="Resources" data-trans-stat21>  </span> <span class="dot dot-yellow"></span></span>
            <span > <span class="Resources" data-trans-stat20> </span> <span class="dot dot-aqua"></span></span>
          </div>
        </div>
      </div>
      `;

        paginationContainer.innerHTML = paginationHTML;
        goal2Container.appendChild(paginationContainer);
        bindClientPagination(paginationContainer, goal2Data, 'goal2');

        // Add event listener to open the modal when 'show-more' is clicked
        goal2Container.querySelectorAll('.show-more').forEach((element) => {
          element.addEventListener('click', function () {
            const modal = document.getElementById('goalModal');
            const modalBody = modal.querySelector('.modal-body');
            const modalTitle = modal.querySelector('.section-title');

            // Extract data attributes from the clicked 'show-more' element
            const data = {
              id: this.getAttribute('data-currentid'),
              title: this.getAttribute('data-title'),
              code: this.getAttribute('data-code'),
              description: this.getAttribute('data-description'),
              progressPercentage: this.getAttribute('data-progresspercentage'),
              progressStatus: this.getAttribute('data-progressstatus'),
              relatedStrategy: this.getAttribute('data-relatedstrategy'),
              deletionStatus: this.getAttribute('data-deletionstatus'),
              objectiveOwner: this.getAttribute('data-objectiveowner'),
              secondOwner: this.getAttribute('data-secondowner'),
              department: this.getAttribute('data-department'),
              sector: this.getAttribute('data-sector'),
              statusColor: this.getAttribute('data-statuscolor'),
            };
            modalTitle.innerHTML = `
          <span class="Resources" data-trans-secondgoals> </span>
        `;

            // Populate the modal with the extracted data
            modalBody.innerHTML = `
             <h5 class="section-title align-div-label mb-3 Resources" >
              <span class="Resources label  " data-trans-secondgoal></span>
              <span>${data.title} </span>
            </h5>

            <div class="d-flex justify-content-between align-items-baseline mb-3">
              <div class="align-div-label">
                <span class="Resources label  " data-trans-code></span>
                <p>${data.code}</p>
              </div>
              <div class="align-div-label">
                <span class="Resources label" data-trans-progressstatus></span>
                <span class="status-approved">
                  <span class="Resources mx-2" data-trans-${data.progressStatus} style="color: ${data.statusColor}; font-size: 14px"> </span>
                  <i class="fas fa-circle" style="color: ${data.statusColor}; font-size: 8px"></i>
                </span>
              </div>
            </div>
            <div class="align-div-label mb-3">
              <span class="Resources label  " data-trans-description></span>
              <p>${data.description}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center pagination-status-bar">
              <div class="align-div-label">
                <span class="Resources label  " data-trans-objectiveowner></span>
                <p>${data.objectiveOwner}</p>
              </div>
              <div class="align-div-label">
                <span class="Resources label" data-trans-secondowner></span>
                <p>${data.secondOwner}</p>
              </div>
              <div class="align-div-label">
                <span class="Resources label" data-trans-department></span>
                <p>${data.department}</p>
                </div>
              <div class="align-div-label">
                <span class="Resources label" data-trans-sector></span>
                <p>${data.sector}</p>
              </div>
            </div>

         `;
            changeResources();
            // Show the modal
            $(modal).modal('show'); // Using jQuery for Bootstrap modal
            const detailButton = modal.querySelector('.btn-red');
            detailButton.style.display = 'block'; // Always show first
            // Remove any existing event listeners
            const newDetailButton = detailButton.cloneNode(true);
            detailButton.parentNode.replaceChild(newDetailButton, detailButton);
            newDetailButton.addEventListener('click', function () {
              const newUrl = `${_spPageContextInfo.webAbsoluteUrl}/SitePages/View.aspx?ListKey=sos&IID=${data.id}`;

              window.open(newUrl, '_blank');
            });
          });
        });
      }

      async function fetchGoal2Paginated(
        pageIndex,
        lastItemId,
        container,
        strategyCode,
        pillarCode,
        mainGoalCode
      ) {
        const key = await importKeyFromBase64(base64Key);
        const iv = base64ToUint8Array(base64IV);
        showLoader();
        let pageSize = 6; // Define how many items per page
        let apiUrl = `${APIURL}/objectives/getobjectiveswithpaganation?lastItemId=${lastItemId}&pageSize=${pageSize}&orderBy=ID&pageIndex=${pageIndex}&type=sublevel2`;
        if (strategyCode) {
          apiUrl += `&strategyCode=${strategyCode}`;
        }
        if (pillarCode) {
          apiUrl += `&pillarCode=${pillarCode}`;
        }
        if (mainGoalCode) {
          apiUrl += `&objectiveCode=${mainGoalCode}`;
        }
        let encryptedBody = '';
        let requiredListNames = ['SOs'];
        if (combinedQueryValues && combinedQueryValues.length > 0) {
          let finalQueryValues = normalizeCombinedQueryValues(
            combinedQueryValues,
            requiredListNames
          );
          let payloadString = JSON.stringify(finalQueryValues);
          encryptedPayload = await encryptData(key, payloadString, iv);
          encryptedBody = JSON.stringify(encryptedPayload);
        }
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json; odata=verbose',
            'Content-Type': 'application/json',
            'SPM-API-Key': '45e19028481c4e5093929d10a754f6af',
            'User-Id': window.currentUserData.Id,
          },
          body: combinedQueryValues.length > 0 ? encryptedBody : null,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data && data.Result.length > 0) {
              hideLoader();
              container.innerHTML = '';
              createGoal2Cards(data, container);
              changeResources();
            } else {
              hideLoader();
              console.warn('No more data available for this Strategy.');
            }
          })
          .catch((error) => {
            hideLoader();
            console.error(
              'Failed to fetch paginated data for this Strategy:',
              error
            );
          });
        addCheckmarkContainers(); // add checkmark DOM if missing
        restoreActiveCards(); // activate the selected card after render
      }

      // Wait for the collapse to start and apply the fade and scale effects
      $('#Goal1').on('show.bs.collapse', function () {
        // Apply fade-in and scale-up effect when expanding
        const card = $('#Goal1 .collapse.show');
        card.css({
          opacity: '0',
          transform: 'scale(0.9)',
        });

        setTimeout(() => {
          card.css({
            opacity: '1',
            transform: 'scale(1)',
          });
        }, 100);
      });

      // Apply the fade-out and scale-down effect when collapsing
      $('#Goal1').on('hide.bs.collapse', function () {
        const card = $('#Goal1 .collapse');
        card.css({
          opacity: '0',
          transform: 'scale(0.9)',
        });
      });

      // Function to create main cards and pagination
      function createGoal3Cards(goal3Data, goal3Container) {
        if (!goal3Container) {
          console.error('Error: `Goal3-cards-container` not found.');
          return;
        }
        goal3Container.innerHTML = '';
        // Loop through the GoalArray and create cards
        if (goal3Data.Result.length > 0) {
          goal3Data.Result.forEach((goal, index) => {
            const card = document.createElement('div');

            // Generate unique class for the card
            const uniqueClass = 'card-goal3' + (goal.Id || 'no-id');

            // Determine if the card is the first one and set it as active
            const isActive = index === 0 ? 'active' : '';

            card.className = 'col-4 p-3 mb-3';
            card.setAttribute('data-id', goal.Id);
            card.setAttribute('data-name', goal.Name);

            const mainCard = document.createElement('div');
            mainCard.className = `mainCard p-3 fade-in h-100 d-flex flex-column justify-content-between ${uniqueClass}`;
            mainCard.setAttribute('data-code', goal.Title);
            mainCard.setAttribute('data-id', goal.Id);
            var statusColor = applyCardStatusColor(
              mainCard,
              '#objectives',
              goal.ProgressStatus
            );

            mainCard.innerHTML = `
          <div class="main-title" title="${goal.Name}">${goal.Name}</div>
          <div class="w-100 d-flex align-items-center justify-content-between flex-wrap">
          <div class="w-50">
          ${
            goal.Description != null && goal.Description.trim()
              ? `<p class="sub-title" title="${goal.Description}">${goal.Description}</p>`
              : `<span class="Resources sub-title" data-trans-nodata></span>`
          }
          </div>
            <p class="text-end show-more d-flex align-items-center flex-row-reverse"
            id="${goal.Id}"
            data-currentid="${goal.Id || No_Data}"
            data-title="${goal.Name || No_Data}"
            data-code="${goal.Title || No_Data}"
            data-description="${goal.Description || No_Data}"
            data-progresspercentage="${goal.ProgressPercentage || No_Data}"
            data-progressstatus="${goal.ProgressStatus || 'kpi-novalue'}"
            data-relatedstrategy="${goal.RelatedStrategy || No_Data}"
            data-deletionstatus="${goal.DeletionStatus || No_Data}"
            data-objectiveowner="${goal.ObjectiveOwner || No_Data}"
            data-secondowner="${goal.SecondOwner || No_Data}"
            data-type="${goal.Type || No_Data}"
            data-department="${
              isArabicLang()
                ? goal.DepartmentAr || No_Data
                : goal.DepartmentEn || No_Data
            }"
            data-sector="${
              isArabicLang()
                ? goal.SectorAr || No_Data
                : goal.SectorArEn || No_Data
            }"
             data-statuscolor="${statusColor || '#a9a9a9'}"
             >
              <span class="arrow d-flex align-items-center"><i class="fas fa-long-arrow-alt-left"></i></span>
              <span class="Resources content" data-trans-viewmore></span>
            </p>
          </div>
        </div>
    `;
            // Add checkmark container
            const checkmarkContainer = document.createElement('div');
            checkmarkContainer.classList.add('checkmark-container');
            checkmarkContainer.innerHTML = `<i class="fas fa-check checkmark"></i>`;
            mainCard.appendChild(checkmarkContainer);
            card.appendChild(mainCard);
            goal3Container.appendChild(card);
          });
        } else {
          goal3Container.innerHTML = `<div class="m-auto"><p class="Resources" data-trans-nogoals>  </p></div>`;
        }
        // checkMarkActive();
        const paginationContainer = document.createElement('div');
        paginationContainer.classList.add(
          'w-100',
          'd-flex',
          'justify-content-between',
          'align-items-center',
          'mt-4'
        );

        let paginationHTML = `
      <div class="col-12 p-0">
        <div class="d-flex justify-content-between align-items-center pagination-status-bar">
          ${buildPaginationNavHtml(goal3Data)}

         <div class="status">
            <span> <span class="Resources" data-trans-stat43> </span>  <span class="dot dot-blue"></span></span>
            <span > <span class="Resources" data-trans-stat32> </span> <span class="dot dot-gray"></span></span>
            <span > <span class="Resources" data-trans-stat42> </span> <span class="dot dot-gray"></span></span>
            <span > <span class="Resources" data-trans-stat22> </span> <span class="dot dot-green"></span></span>
            <span > <span class="Resources" data-trans-stat21>  </span> <span class="dot dot-yellow"></span></span>
            <span > <span class="Resources" data-trans-stat20> </span> <span class="dot dot-aqua"></span></span>
          </div>
        </div>
      </div>
      `;

        paginationContainer.innerHTML = paginationHTML;
        goal3Container.appendChild(paginationContainer);
        bindClientPagination(paginationContainer, goal3Data, 'goal3');
        // Add event listener to open the modal when 'show-more' is clicked
        goal3Container.querySelectorAll('.show-more').forEach((element) => {
          element.addEventListener('click', function () {
            const modal = document.getElementById('goalModal');
            const modalBody = modal.querySelector('.modal-body');
            const modalTitle = modal.querySelector('.section-title');

            // Extract data attributes from the clicked 'show-more' element
            const data = {
              id: this.getAttribute('data-currentid'),
              title: this.getAttribute('data-title'),
              code: this.getAttribute('data-code'),
              description: this.getAttribute('data-description'),
              progressPercentage: this.getAttribute('data-progresspercentage'),
              progressStatus: this.getAttribute('data-progressstatus'),
              relatedStrategy: this.getAttribute('data-relatedstrategy'),
              deletionStatus: this.getAttribute('data-deletionstatus'),
              objectiveOwner: this.getAttribute('data-objectiveowner'),
              secondOwner: this.getAttribute('data-secondowner'),
              department: this.getAttribute('data-department'),
              sector: this.getAttribute('data-sector'),
              statusColor: this.getAttribute('data-statuscolor'),
            };

            modalTitle.innerHTML = `
          <span class="Resources" data-trans-thirdgoals> </span>
        `;

            // Populate the modal with the extracted data
            modalBody.innerHTML = `
            <h5 class="section-title align-div-label mb-3 Resources" >
              <span class="Resources label  " data-trans-thirdgoal></span>
              <span>${data.title} </span>
            </h5>

            <div class="d-flex justify-content-between align-items-baseline mb-3">
              <div class="align-div-label">
                <span class="Resources label  " data-trans-code></span>
                <p>${data.code}</p>
              </div>
              <div class="align-div-label">
                <span class="Resources label" data-trans-progressstatus></span>
                <span class="status-approved">
                  <span class="Resources mx-2" data-trans-${data.progressStatus} style="color: ${data.statusColor}; font-size: 14px"> </span>
                  <i class="fas fa-circle" style="color: ${data.statusColor}; font-size: 8px"></i>
                </span>
              </div>
            </div>
            <div class="align-div-label mb-3">
              <span class="Resources label  " data-trans-description></span>
              <p>${data.description}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center pagination-status-bar">
              <div class="align-div-label">
                <span class="Resources label  " data-trans-objectiveowner></span>
                <p>${data.objectiveOwner}</p>
              </div>
              <div class="align-div-label">
                <span class="Resources label" data-trans-secondowner></span>
                <p>${data.secondOwner}</p>
              </div>
              <div class="align-div-label">
                <span class="Resources label" data-trans-department></span>
                <p>${data.department}</p>
                </div>
              <div class="align-div-label">
                <span class="Resources label" data-trans-sector></span>
                <p>${data.sector}</p>
              </div>
            </div>

           `;
            changeResources();
            // Show the modal
            $(modal).modal('show'); // Using jQuery for Bootstrap modal
            const detailButton = modal.querySelector('.btn-red');
            detailButton.style.display = 'block'; // Always show first
            // Remove any existing event listeners
            const newDetailButton = detailButton.cloneNode(true);
            detailButton.parentNode.replaceChild(newDetailButton, detailButton);
            newDetailButton.addEventListener('click', function () {
              const newUrl = `${_spPageContextInfo.webAbsoluteUrl}/SitePages/View.aspx?ListKey=sos&IID=${data.id}`;

              window.open(newUrl, '_blank');
            });
          });
        });
      }

      async function fetchGoal3Paginated(
        pageIndex,
        lastItemId,
        container,
        strategyCode,
        pillarCode,
        mainGoalCode,
        goal2Code
      ) {
        const key = await importKeyFromBase64(base64Key);
        const iv = base64ToUint8Array(base64IV);
        showLoader();
        let pageSize = 6;
        let apiUrl = `${APIURL}/objectives/getobjectiveswithpaganation?lastItemId=${lastItemId}&pageSize=${pageSize}&orderBy=ID&pageIndex=${pageIndex}&type=sublevel3`;
        if (strategyCode) {
          apiUrl += `&strategyCode=${strategyCode}`;
        }
        if (pillarCode) {
          apiUrl += `&pillarCode=${pillarCode}`;
        }
        if (
          mainGoalCode &&
          !selectedFilters.goal2Code &&
          selectedFilters.goal2Code != undefined
        ) {
          apiUrl += `&objectiveCode=${mainGoalCode}`;
        } else if (
          selectedFilters.goal2Code &&
          selectedFilters.goal2Code != undefined
        ) {
          apiUrl += `&objectiveCode=${selectedFilters.goal2Code}`;
        }
        let encryptedBody = '';
        let requiredListNames = ['SOs'];
        if (combinedQueryValues && combinedQueryValues.length > 0) {
          let finalQueryValues = normalizeCombinedQueryValues(
            combinedQueryValues,
            requiredListNames
          );
          let payloadString = JSON.stringify(finalQueryValues);
          encryptedPayload = await encryptData(key, payloadString, iv);
          encryptedBody = JSON.stringify(encryptedPayload);
        }
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json; odata=verbose',
            'Content-Type': 'application/json',
            'SPM-API-Key': '45e19028481c4e5093929d10a754f6af',
            'User-Id': window.currentUserData.Id,
          },
          body: combinedQueryValues.length > 0 ? encryptedBody : null,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data && data.Result.length > 0) {
              hideLoader();
              container.innerHTML = '';
              createGoal3Cards(data, container);
              changeResources();
            } else {
              hideLoader();
              console.warn('No more data available for this Strategy.');
            }
          })
          .catch((error) => {
            hideLoader();
            console.error(
              'Failed to fetch paginated data for this Strategy:',
              error
            );
          });
        addCheckmarkContainers(); // add checkmark DOM if missing
        restoreActiveCards(); // activate the selected card after render
      }

      // Wait for the collapse to start and apply the fade and scale effects
      $('#Goal1').on('show.bs.collapse', function () {
        // Apply fade-in and scale-up effect when expanding
        const card = $('#Goal1 .collapse.show');
        card.css({
          opacity: '0',
          transform: 'scale(0.9)',
        });

        setTimeout(() => {
          card.css({
            opacity: '1',
            transform: 'scale(1)',
          });
        }, 100);
      });

      // Apply the fade-out and scale-down effect when collapsing
      $('#Goal1').on('hide.bs.collapse', function () {
        const card = $('#Goal1 .collapse');
        card.css({
          opacity: '0',
          transform: 'scale(0.9)',
        });
      });

      async function createStrategicKpisCards(
        KpiStrategicData,
        kpiStrategicContainer
      ) {
        if (!kpiStrategicContainer) {
          console.error('Error: `KPIs-cards-container` not found.');
          return;
        }
        kpiStrategicContainer.innerHTML = '';

        // Loop through the GoalArray and create cards
        if (KpiStrategicData.Result.length) {
          KpiStrategicData.Result.forEach((kpi) => {
            const card = document.createElement('div');
            card.className = 'col-lg-4 col-6 p-3 mb-3';
            card.setAttribute('data-id', kpi.Id);
            card.setAttribute('data-code', kpi.Code);
            card.setAttribute('data-name', kpi.Name);
            card.innerHTML = `
          <div class="card-body border border-custom">
            <div class="py-3">
              <div class="row mb-3">
                <div class="col-12 d-flex justify-content-between">
                <div class="w-50">
                  <p
                    class="Resources fnt-14 bold kpi-title" title="${kpi.Name}">
                  ${kpi.Name}</p>
                </div>
                  <p class="text-end show-more d-flex align-items-center flex-row-reverse"
                    id="${kpi.Id}"
                    data-currentid="${kpi.Id || No_Data}"
                    data-title="${kpi.Name || No_Data}"
                    data-code="${kpi.Title || No_Data}"
                    data-description="${kpi.Description || No_Data}"
                    data-progresspercentage="${
                      kpi.ProgressPercentage || No_Data
                    }"
                    data-progressstatus="${kpi.ProgressStatus || 'kpi-novalue'}"
                    data-relatedstrategy="${kpi.RelatedStrategy || No_Data}"
                    data-deletionstatus="${kpi.DeletionStatus || No_Data}"
                    data-kpiowner="${kpi.KPIOwner || No_Data}"
                    data-performanceleader1="${
                      kpi.PerformanceLeader1 || No_Data
                    }"
                    data-performanceleader2="${
                      kpi.PerformanceLeader2 || No_Data
                    }"
                    data-type="${kpi.PlanType || No_Data}"
                    data-department="${
                      isArabicLang()
                        ? kpi.DepartmentAr || No_Data
                        : kpi.DepartmentEn || No_Data
                    }"
                    data-sector="${
                      isArabicLang()
                        ? kpi.SectorAr || No_Data
                        : kpi.SectorArEn || No_Data
                    }"
                    data-statuscolor="${
                      setStatusColorBasedOnStatus(
                        '#kpis',
                        kpi.ProgressStatus
                      ) || '#a9a9a9'
                    }"
                  >
                    <span class="arrow d-flex align-items-center">
                      <i class="fas fa-long-arrow-alt-left"></i>
                    </span>
                    <span class="Resources content" data-trans-viewmore></span>
                  </p>
                </div>
              </div>
              <!-- Information Blocks -->
              <div class="row info-block">
                <div class="col-6 text-start">
                  <div class="label"> <span class="Resources" data-trans-kpititle></div>
                  ${
                    kpi.Title != null && kpi.Title.trim()
                      ? `<div class="value">${kpi.Title}</div>`
                      : `<span class="Resources value" data-trans-nodata></span>`
                  }
                </div>
                <div class="col-6 text-start">
                  <div class="label"> <span class="Resources" data-trans-kpiownername> </div>
                  ${
                    kpi.KPIOwner != null && kpi.KPIOwner.trim()
                      ? `<div class="value">${kpi.KPIOwner}</div>`
                      : `<span class="Resources value" data-trans-nodata></span>`
                  }
                </div>
              </div>

              <div class="row info-block">
                <div class="col-6 text-start">
                  <div class="label"> <span class="Resources" data-trans-performanceleader> </span> </div>
                  ${
                    kpi.PerformanceLeader1 != null &&
                    kpi.PerformanceLeader1.trim()
                      ? `<div class="value">${kpi.PerformanceLeader1}</div>`
                      : `<span class="Resources value" data-trans-nodata></span>`
                  }
                </div>
                <div class="col-6 text-start">
                  <div class="label"> <span class="Resources" data-trans-performanceleadersec> </span> </div>
                  ${
                    kpi.PerformanceLeader2 != null &&
                    kpi.PerformanceLeader2.trim()
                      ? `<div class="value">${kpi.PerformanceLeader2}</div>`
                      : `<span class="Resources value" data-trans-nodata></span>`
                  }
                </div>

              </div>

              <div class="row info-block">
                <div class="col-6 text-start">
                  <div class="label"> <span class="Resources" data-trans-repeatmeas> </span> </div>
                  ${
                    kpi.PeriodType != null && kpi.PeriodType.trim()
                      ? `<div class="value">
                      <span class="Resources" data-trans-${kpi.PeriodType}></span>
                      </div>`
                      : `<span class="Resources value" data-trans-nodata></span>`
                  }
                </div>
                <div class="col-6 text-start">
                  <div class="label"> <span class="Resources" data-trans-fromdate> </span> - <span class="Resources" data-trans-todate> </span> </div>
                  ${
                    kpi.FromDate != null || kpi.ToDate != null
                      ? `<div class="value">${
                          kpi.FromDate != null ? kpi.FromDate : No_Data
                        } - ${
                          kpi.ToDate != null ? kpi.ToDate : No_Data
                        }</div>`
                      : `<span class="Resources value" data-trans-nodata></span>`
                  }
                </div>
              </div>
              <div class="divider"></div>
              <div class="row">
                <div class="col-12 d-flex justify-content-between my-5">
                  <span class="complition-val fnt-16 reg"
                    ><span class="Resources" data-trans-currentyear> </span> ${new Date().getFullYear()}</span
                  >
                  <div class="active-status">
                    <span class="Resources fnt-14" data-trans-${
                      kpi.Status || 'nodata'
                    }></span>
                  </div>
                </div>
                <div class="col-12 d-flex justify-content-center">
                  <div
                    class="col col-xl-auto no-padding d-flex justify-content-center"
                  >
                    <div class="kpis-semiProgress">
                      <div class="overFlow-progressBar">
                        <div class="active-bar"></div>
                      </div>
                      <div>
                      <span>${kpi.ProgressPercentageStrategy || 0}</span>%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 mt-4 d-flex justify-content-between total-stats">
                  <div class="stat-item">
                  <span class="label"><span class="Resources" data-trans-cumulativeinvestigator> </span> </span>
                  <span class="value mx-3">${kpi.TotalActualStrategy || 0}</span>
                </div>
                <div class="stat-item">
                  <span class="label"><span class="Resources" data-trans-targeted> </span></span>
                  <span class="value mx-3">${kpi.TotalPlannedStrategy || 0}</span>
                </div>
              </div>
            </div>
          </div>
    `;
            kpiStrategicContainer.appendChild(card);
          });
        } else {
          kpiStrategicContainer.innerHTML = `<div class="m-auto"><p class="Resources" data-trans-nostrategickpis>  </p></div>`;
        }
        // checkMarkActive();
        $('.kpis-semiProgress').each(function () {
          var $bar = $(this).find('.active-bar');
          var $val = $(this).find('span');
          var perc = parseInt($val.text(), 10);

          $({ p: 0 }).animate(
            { p: perc },
            {
              duration: 2000,
              easing: 'swing',
              step: function (p) {
                var rotateValue = p > 100 ? 100 : p;
                $bar.css({
                  transform: 'rotate(' + (45 + rotateValue * 1.8) + 'deg)', // 100%=180┬░ so: ┬░ = % * 1.8
                  // 45 is to add the needed rotation to have the green borders at the bottom
                });
                $val.text(p | 0);
              },
            }
          );
        });
        const paginationContainer = document.createElement('div');
        paginationContainer.classList.add(
          'w-100',
          'd-flex',
          'justify-content-between',
          'align-items-center',
          'mt-4'
        );

        let paginationHTML = `
      <div class="col-12 p-0">
        <div class="d-flex justify-content-between align-items-center pagination-status-bar">
          ${buildPaginationNavHtml(KpiStrategicData)}

         <div class="status">
            <span> <span class="Resources" data-trans-stat19> </span>  <span class="dot dot-blue"></span></span>
            <span > <span class="Resources" data-trans-stat31> </span> <span class="dot dot-gray"></span></span>
            <span > <span class="Resources" data-trans-stat18 ></span> <span class="dot dot-gray"></span></span>
            <span > <span class="Resources" data-trans-stat17> </span> <span class="dot dot-green"></span></span>
            <span ><span class="Resources" data-trans-stat16> </span> <span class="dot dot-yellow"></span></span>
            <span > <span class="Resources" data-trans-stat15> </span> <span class="dot dot-aqua"></span></span>
          </div>
        </div>
      </div>
      `;

        paginationContainer.innerHTML = paginationHTML;
        kpiStrategicContainer.appendChild(paginationContainer);
        bindClientPagination(
          paginationContainer,
          KpiStrategicData,
          'kpiStrategic'
        );
        // Add event listener to open the modal when 'show-more' is clicked
        kpiStrategicContainer
          .querySelectorAll('.show-more')
          .forEach((element) => {
            element.addEventListener('click', function () {
              const modal = document.getElementById('goalModal');
              const modalBody = modal.querySelector('.modal-body');
              const modalTitle = modal.querySelector('.section-title');

              // Extract data attributes from the clicked 'show-more' element
              const data = {
                id: this.getAttribute('data-currentid'),
                title: this.getAttribute('data-title'),
                code: this.getAttribute('data-code'),
                description: this.getAttribute('data-description'),
                progressPercentage: this.getAttribute(
                  'data-progresspercentage'
                ),
                progressStatus: this.getAttribute('data-progressstatus'),
                relatedStrategy: this.getAttribute('data-relatedstrategy'),
                deletionStatus: this.getAttribute('data-deletionstatus'),
                objectiveOwner: this.getAttribute('data-objectiveowner'),
                secondOwner: this.getAttribute('data-secondowner'),
                department: this.getAttribute('data-department'),
                sector: this.getAttribute('data-sector'),
                type: this.getAttribute('data-type'),
                kpiOwner: this.getAttribute('data-KPIOwner'),
                performanceLeader1: this.getAttribute(
                  'data-performanceleader1'
                ),
                performanceLeader2: this.getAttribute(
                  'data-PerformanceLeader2'
                ),
                statusColor: this.getAttribute('data-statuscolor'),
              };

              modalTitle.innerHTML = `
        <span class="Resources" data-trans-kpis> </span>
      `;

              // Populate the modal with the extracted data
              modalBody.innerHTML = `
            <h5 class="section-title align-div-label mb-3 Resources" >
              <span class="Resources label  " data-trans-kpiname></span>
              <span>${data.title} </span>
            </h5>

            <div class="d-flex justify-content-between align-items-baseline mb-3">
              <div class="align-div-label">
                <span class="Resources label  " data-trans-code></span>
                <p>${data.code}</p>
              </div>
              <div class="align-div-label">
                <span class="Resources label" data-trans-progressstatus></span>
                <span class="status-approved">
                  <span class="Resources mx-2" data-trans-${data.progressStatus} style="color: ${data.statusColor}; font-size: 14px"> </span>
                  <i class="fas fa-circle" style="color: ${data.statusColor}; font-size: 8px"></i>
                </span>
              </div>
            </div>

            <div class="align-div-label mb-3">
              <span class="Resources label  " data-trans-description></span>
              <p>${data.description}</p>
            </div>

            <div class="d-flex justify-content-between align-items-center pagination-status-bar">
              <div class="align-div-label">
                <span class="Resources label" data-trans-kpiowner></span>
                <p>${data.kpiOwner}</p>
              </div>

              <div class="align-div-label">
                <span class="Resources label" data-trans-performanceleader></span>
                <p>${data.performanceLeader1}</p>
              </div>

              <div class="align-div-label">
                <span class="Resources label" data-trans-performanceleadersec></span>
                <p>${data.performanceLeader2}</p>
              </div>

              <div class="align-div-label">
                <span class="Resources label" data-trans-type></span>
                <p class="Resources" data-trans-${data.type}> </p>
              </div>
            </div>
          `;
              changeResources();
              // Show the modal
              $(modal).modal('show'); // Using jQuery for Bootstrap modal
              const detailButton = modal.querySelector('.btn-red');
              detailButton.style.display = 'block'; // Always show first
              // Remove any existing event listeners
              const newDetailButton = detailButton.cloneNode(true);
              detailButton.parentNode.replaceChild(
                newDetailButton,
                detailButton
              );
              newDetailButton.addEventListener('click', function () {
                const newUrl = `${_spPageContextInfo.webAbsoluteUrl}/SitePages/View.aspx?ListKey=mainkpi&IID=${data.id}`;

                window.open(newUrl, '_blank');
              });
            });
          });
      }

      async function createOperationalKpisCards(
        KpiOperationalData,
        kpiOperationalContainer
      ) {
        if (!kpiOperationalContainer) {
          console.error('Error: `operational-cards-container` not found.');
          return;
        }
        kpiOperationalContainer.innerHTML = '';

        // Loop through the GoalArray and create cards
        if (KpiOperationalData.Result.length) {
          KpiOperationalData.Result.forEach((kpi) => {
            const card = document.createElement('div');
            card.className = 'col-lg-4 col-6 p-3 mb-3';
            card.setAttribute('data-id', kpi.Id);
            card.setAttribute('data-code', kpi.Code);
            card.setAttribute('data-name', kpi.Name);
            card.innerHTML = `
          <div class="card-body border border-custom">
            <div class="py-3">
              <div class="row mb-3">
                <div class="col-12 d-flex justify-content-between">
                <div class="w-50">
                  <p
                    class="Resources fnt-14 bold kpi-title" title="${kpi.Name}">
                  ${kpi.Name}</p>
                </div>
                  <p class="text-end show-more d-flex align-items-center flex-row-reverse"
                    id="${kpi.Id}"
                    data-currentid="${kpi.Id || No_Data}"
                    data-title="${kpi.Name || No_Data}"
                    data-code="${kpi.Title || No_Data}"
                    data-description="${kpi.Description || No_Data}"
                    data-progresspercentage="${
                      kpi.ProgressPercentage || No_Data
                    }"
                    data-progressstatus="${kpi.ProgressStatus || 'kpi-novalue'}"
                    data-relatedstrategy="${kpi.RelatedStrategy || No_Data}"
                    data-deletionstatus="${kpi.DeletionStatus || No_Data}"
                    data-kpiowner="${kpi.KPIOwner || No_Data}"
                    data-performanceleader1="${
                      kpi.PerformanceLeader1 || No_Data
                    }"
                    data-performanceleader2="${
                      kpi.PerformanceLeader2 || No_Data
                    }"
                    data-type="${kpi.PlanType || No_Data}"
                    data-department="${
                      isArabicLang()
                        ? kpi.DepartmentAr || No_Data
                        : kpi.DepartmentEn || No_Data
                    }"
                    data-sector="${
                      isArabicLang()
                        ? kpi.SectorAr || No_Data
                        : kpi.SectorArEn || No_Data
                    }"
                    data-statuscolor="${
                      setStatusColorBasedOnStatus(
                        '#kpis',
                        kpi.ProgressStatus
                      ) || '#a9a9a9'
                    }"
                  >
                    <span class="arrow d-flex align-items-center">
                      <i class="fas fa-long-arrow-alt-left"></i>
                    </span>
                    <span class="Resources content" data-trans-viewmore></span>
                  </p>
                </div>
              </div>
              <!-- Information Blocks -->
              <div class="row info-block">
                <div class="col-6 text-start">
                  <div class="label"> <span class="Resources" data-trans-kpititle></div>
                  ${
                    kpi.Title != null && kpi.Title.trim()
                      ? `<div class="value">${kpi.Title}</div>`
                      : `<span class="Resources value" data-trans-nodata></span>`
                  }
                </div>
                <div class="col-6 text-start">
                  <div class="label"> <span class="Resources" data-trans-kpiownername> </div>
                  ${
                    kpi.KPIOwner != null && kpi.KPIOwner.trim()
                      ? `<div class="value">${kpi.KPIOwner}</div>`
                      : `<span class="Resources value" data-trans-nodata></span>`
                  }
                </div>
              </div>

              <div class="row info-block">
                <div class="col-6 text-start">
                  <div class="label"> <span class="Resources" data-trans-performanceleader> </span> </div>
                  ${
                    kpi.PerformanceLeader1 != null &&
                    kpi.PerformanceLeader1.trim()
                      ? `<div class="value">${kpi.PerformanceLeader1}</div>`
                      : `<span class="Resources value" data-trans-nodata></span>`
                  }
                </div>
                <div class="col-6 text-start">
                  <div class="label"> <span class="Resources" data-trans-performanceleadersec> </span> </div>
                  ${
                    kpi.PerformanceLeader2 != null &&
                    kpi.PerformanceLeader2.trim()
                      ? `<div class="value">${kpi.PerformanceLeader2}</div>`
                      : `<span class="Resources value" data-trans-nodata></span>`
                  }
                </div>

              </div>

              <div class="row info-block">
                <div class="col-6 text-start">
                  <div class="label"> <span class="Resources" data-trans-repeatmeas> </span> </div>
                  ${
                    kpi.PeriodType != null && kpi.PeriodType.trim()
                      ? `<div class="value">
                      <span class="Resources" data-trans-${kpi.PeriodType}></span>
                      </div>`
                      : `<span class="Resources value" data-trans-nodata></span>`
                  }
                </div>
                <div class="col-6 text-start">
                  <div class="label"> <span class="Resources" data-trans-fromdate> </span> - <span class="Resources" data-trans-todate> </span> </div>
                  ${
                    kpi.FromDate != null || kpi.ToDate != null
                      ? `<div class="value">${
                          kpi.FromDate != null ? kpi.FromDate : No_Data
                        } - ${
                          kpi.ToDate != null ? kpi.ToDate : No_Data
                        }</div>`
                      : `<span class="Resources value" data-trans-nodata></span>`
                  }
                </div>
              </div>
              <div class="divider"></div>
              <div class="row">
                <div class="col-12 d-flex justify-content-between my-5">
                  <span class="complition-val fnt-16 reg"
                    ><span class="Resources" data-trans-currentyear> </span> ${new Date().getFullYear()}</span
                  >
                  <div class="active-status">
                    <span class="Resources fnt-14" data-trans-${
                      kpi.Status || 'nodata'
                    }></span>
                  </div>
                </div>
                <div class="col-12 d-flex justify-content-center">
                  <div
                    class="col col-xl-auto no-padding d-flex justify-content-center"
                  >
                    <div class="kpis-semiProgress">
                      <div class="overFlow-progressBar">
                        <div class="active-bar"></div>
                      </div>
                      <div>
                      <span>${kpi.ProgressPercentageStrategy || 0}</span>%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 mt-4 d-flex justify-content-between total-stats">
                  <div class="stat-item">
                  <span class="label"><span class="Resources" data-trans-cumulativeinvestigator> </span> </span>
                  <span class="value mx-3">${kpi.TotalActualStrategy || 0}</span>
                </div>
                <div class="stat-item">
                  <span class="label"><span class="Resources" data-trans-targeted> </span></span>
                  <span class="value mx-3">${kpi.TotalPlannedStrategy || 0}</span>
                </div>
              </div>
            </div>
          </div>
    `;
            kpiOperationalContainer.appendChild(card);
          });
        } else {
          kpiOperationalContainer.innerHTML = `<div class="m-auto"><p class="Resources" data-trans-nooperationalkpis>  </p></div>`;
        }
        // checkMarkActive();

        $('.kpis-semiProgress').each(function () {
          var $bar = $(this).find('.active-bar');
          var $val = $(this).find('span');
          var perc = parseInt($val.text(), 10);

          $({ p: 0 }).animate(
            { p: perc },
            {
              duration: 2000,
              easing: 'swing',
              step: function (p) {
                var rotateValue = p > 100 ? 100 : p;
                $bar.css({
                  transform: 'rotate(' + (45 + rotateValue * 1.8) + 'deg)', // 100%=180┬░ so: ┬░ = % * 1.8
                  // 45 is to add the needed rotation to have the green borders at the bottom
                });
                $val.text(p | 0);
              },
            }
          );
        });

        const paginationContainer = document.createElement('div');
        paginationContainer.classList.add(
          'w-100',
          'd-flex',
          'justify-content-between',
          'align-items-center',
          'mt-4'
        );

        let paginationHTML = `
      <div class="col-12 p-0">
        <div class="d-flex justify-content-between align-items-center pagination-status-bar">
          ${buildPaginationNavHtml(KpiOperationalData)}

          <div class="status">
            <span> <span class="Resources" data-trans-stat19> </span>  <span class="dot dot-blue"></span></span>
            <span > <span class="Resources" data-trans-stat31> </span> <span class="dot dot-gray"></span></span>
            <span > <span class="Resources" data-trans-stat18 ></span> <span class="dot dot-gray"></span></span>
            <span > <span class="Resources" data-trans-stat17> </span> <span class="dot dot-green"></span></span>
            <span ><span class="Resources" data-trans-stat16> </span> <span class="dot dot-yellow"></span></span>
            <span > <span class="Resources" data-trans-stat15> </span> <span class="dot dot-aqua"></span></span>
          </div>
        </div>
      </div>
      `;

        paginationContainer.innerHTML = paginationHTML;
        kpiOperationalContainer.appendChild(paginationContainer);
        bindClientPagination(
          paginationContainer,
          KpiOperationalData,
          'kpiOperational'
        );

        // Add event listener to open the modal when 'show-more' is clicked
        kpiOperationalContainer
          .querySelectorAll('.show-more')
          .forEach((element) => {
            element.addEventListener('click', function () {
              const modal = document.getElementById('goalModal');
              const modalBody = modal.querySelector('.modal-body');
              const modalTitle = modal.querySelector('.section-title');

              // Extract data attributes from the clicked 'show-more' element
              const data = {
                id: this.getAttribute('data-currentid'),
                title: this.getAttribute('data-title'),
                code: this.getAttribute('data-code'),
                description: this.getAttribute('data-description'),
                progressPercentage: this.getAttribute(
                  'data-progresspercentage'
                ),
                progressStatus: this.getAttribute('data-progressstatus'),
                relatedStrategy: this.getAttribute('data-relatedstrategy'),
                deletionStatus: this.getAttribute('data-deletionstatus'),
                objectiveOwner: this.getAttribute('data-objectiveowner'),
                secondOwner: this.getAttribute('data-secondowner'),
                department: this.getAttribute('data-department'),
                sector: this.getAttribute('data-sector'),
                type: this.getAttribute('data-type'),
                kpiOwner: this.getAttribute('data-KPIOwner'),
                performanceLeader1: this.getAttribute(
                  'data-performanceleader1'
                ),
                performanceLeader2: this.getAttribute(
                  'data-PerformanceLeader2'
                ),
                statusColor: this.getAttribute('data-statuscolor'),
              };

              modalTitle.innerHTML = `
          <span class="Resources" data-trans-kpis> </span>
        `;

              // Populate the modal with the extracted data
              modalBody.innerHTML = `
            <h5 class="section-title align-div-label mb-3 Resources" >
              <span class="Resources label  " data-trans-kpiname></span>
              <span>${data.title} </span>
            </h5>

            <div class="d-flex justify-content-between align-items-baseline mb-3">
              <div class="align-div-label">
                <span class="Resources label  " data-trans-code></span>
                <p>${data.code}</p>
              </div>
              <div class="align-div-label">
                <span class="Resources label" data-trans-progressstatus></span>
                <span class="status-approved">
                  <span class="Resources mx-2" data-trans-${data.progressStatus} style="color: ${data.statusColor}; font-size: 14px"> </span>
                  <i class="fas fa-circle" style="color: ${data.statusColor}; font-size: 8px"></i>
                </span>
              </div>
            </div>

            <div class="align-div-label mb-3">
              <span class="Resources label  " data-trans-description></span>
              <p>${data.description}</p>
            </div>

            <div class="d-flex justify-content-between align-items-center ">

              <div class="align-div-label">
                <span class="Resources label" data-trans-kpiowner></span>
                <p>${data.kpiOwner}</p>
              </div>

              <div class="align-div-label">
                <span class="Resources label" data-trans-performanceleader></span>
                <p>${data.performanceLeader1}</p>
              </div>

              <div class="align-div-label">
                <span class="Resources label" data-trans-performanceleadersec></span>
                <p>${data.performanceLeader2}</p>
              </div>

              <div class="align-div-label">
                <span class="Resources label" data-trans-type></span>
                <p class="Resources" data-trans-${data.type}> </p>
              </div>
            </div>
        `;
              changeResources();
              // Show the modal
              $(modal).modal('show'); // Using jQuery for Bootstrap modal
              const detailButton = modal.querySelector('.btn-red');
              detailButton.style.display = 'block'; // Always show first
              // Remove any existing event listeners
              const newDetailButton = detailButton.cloneNode(true);
              detailButton.parentNode.replaceChild(
                newDetailButton,
                detailButton
              );
              newDetailButton.addEventListener('click', function () {
                const newUrl = `/SitePages/View.aspx?ListKey=mainkpi&IID=${data.id}`;

                window.open(newUrl, '_blank');
              });
            });
          });
      }

      async function fetchKpiPaginated(
        pageIndex,
        lastItemId,
        container,
        kpiType,
        strategyCode,
        pillarCode,
        mainGoalCode,
        goal2Code,
        goal3Code
      ) {
        const key = await importKeyFromBase64(base64Key);
        const iv = base64ToUint8Array(base64IV);
        showLoader();
        let pageSize = 6;
        let apiUrl = `${APIURL}/mainkpi/getmainkpiwithpaganation?lastItemId=${lastItemId}&pageSize=${pageSize}&orderBy=ID&type=${kpiType}&pageIndex=${pageIndex}`;

        if (strategyCode) {
          apiUrl += `&strategyCode=${strategyCode}`;
        }
        if (pillarCode) {
          apiUrl += `&pillarCode=${pillarCode}`;
        }
        if (mainGoalCode) {
          apiUrl += `&objectiveCodes=${mainGoalCode}`;
        }
        if (selectedFilters.goal2Code) {
          apiUrl += `&objectiveCodes=${selectedFilters.goal2Code}`;
        }
        if (selectedFilters.goal3Code) {
          apiUrl += `&objectiveCodes=${selectedFilters.goal3Code}`;
        }
        let encryptedBody = '';
        let requiredListNames = ['MainKPI'];
        if (combinedQueryValues && combinedQueryValues.length > 0) {
          let finalQueryValues = normalizeCombinedQueryValues(
            combinedQueryValues,
            requiredListNames
          );
          let payloadString = JSON.stringify(finalQueryValues);
          encryptedPayload = await encryptData(key, payloadString, iv);
          encryptedBody = JSON.stringify(encryptedPayload);
        }
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json; odata=verbose',
            'Content-Type': 'application/json',
            'SPM-API-Key': '45e19028481c4e5093929d10a754f6af',
            'User-Id': window.currentUserData.Id,
          },
          body: combinedQueryValues.length > 0 ? encryptedBody : null,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data && data.Result.length > 0) {
              hideLoader();
              container.innerHTML = '';
              if (kpiType === 'strategic') {
                createStrategicKpisCards(data, container);
                changeResources();
              } else if (kpiType === 'operational') {
                createOperationalKpisCards(data, container);
                changeResources();
              }
            } else {
              hideLoader();
              console.warn('No more data available for this Strategy.');
            }
          })
          .catch((error) => {
            hideLoader();
            console.error(
              'Failed to fetch paginated data for this Strategy:',
              error
            );
          });
      }

      // Function to switch the places of text and arrow based on language
      function switchLanguage(language) {
        const showMoreElements = document.querySelectorAll('.show-more');

        showMoreElements.forEach((element) => {
          const arrow = element.querySelector('.arrow');
          const content = element.querySelector('.content');

          // Same as Tanmiah: content before arrow for ar/en (and HRSD default ar)
          if (
            arrow &&
            content &&
            (language === 'ar' ||
              language === 'en' ||
              language == null ||
              language === '')
          ) {
            element.insertBefore(content, arrow);
          }
        });
      }

      function setStatusColorBasedOnStatus(headName, progressStatus) {
        let BaseColor = '#a9a9a9';
        var status = String(progressStatus || '')
          .trim()
          .toLowerCase();

        // HRSD SharePoint status codes (shared across Main / Home)
        if (status === 'stat20' || status === 'stat15' || status === 'stat1' || status === 'stat8') {
          return '#C00000'; // not achieved / too late
        }
        if (status === 'stat21' || status === 'stat16' || status === 'stat2' || status === 'stat9') {
          return '#FFFF00'; // partially achieved / late
        }
        if (
          status === 'stat22' ||
          status === 'stat17' ||
          status === 'stat3' ||
          status === 'stat10'
        ) {
          return '#5AB74C'; // achieved / on track
        }
        if (status === 'stat4' || status === 'stat11') {
          return '#0C553C'; // completed
        }
        if (
          status === 'stat42' ||
          status === 'stat32' ||
          status === 'stat31' ||
          status === 'stat18' ||
          status === 'stat30' ||
          status === 'stat29' ||
          status === 'stat5' ||
          status === 'stat6' ||
          status === 'stat7' ||
          status === 'stat12' ||
          status === 'stat13' ||
          status === 'stat14'
        ) {
          return '#696969'; // not started / under approval / N/A / hold / canceled
        }
        if (status === 'stat43' || status === 'stat19' || status === 'stat28') {
          return '#a9a9a9'; // no value / no baseline
        }

        if (headName === '#strategies') {
          if (
            status === 'stg-draft' ||
            status === 'kpi-draft'
          ) {
            BaseColor = '#696969';
          } else if (status === 'stg-ontrack') {
            BaseColor = '#5AB74C';
          } else if (status === 'stg-late') {
            BaseColor = '#FFFF00';
          } else if (status === 'stg-toolate') {
            BaseColor = '#C00000';
          } else if (status === 'kpi-novalue') {
            BaseColor = '#a9a9a9';
          }
        } else if (headName === '#pillars') {
          if (status === 'plr-draft') {
            BaseColor = '#696969';
          } else if (status === 'plr-ontrack') {
            BaseColor = '#5AB74C';
          } else if (status === 'plr-late') {
            BaseColor = '#FFFF00';
          } else if (status === 'plr-toolate') {
            BaseColor = '#C00000';
          }
        } else if (headName === '#objectives') {
          if (status === 'obj-partiallyachieved') {
            BaseColor = '#C00000';
          } else if (status === 'obj-targetachieved') {
            BaseColor = '#FFFF00';
          } else if (status === 'obj-completed') {
            BaseColor = '#5AB74C';
          } else if (status === 'obj-draft') {
            BaseColor = '#696969';
          }
        } else if (headName === '#kpis') {
          if (status === 'kpi-notachieved') {
            BaseColor = '#C00000';
          } else if (status === 'kpi-partiallyachieved') {
            BaseColor = '#FFFF00';
          } else if (status === 'kpi-targetachieved') {
            BaseColor = '#5AB74C';
          } else if (status === 'kpi-notapplicable') {
            BaseColor = '#696969';
          } else if (status === 'kpi-novalue') {
            BaseColor = '#a9a9a9';
          } else if (status === 'kpi-draft') {
            BaseColor = '#696969';
          }
        } else if (headName === '#initiatives') {
          if (status === 'inv-toolate') {
            BaseColor = '#C00000';
          } else if (status === 'inv-late') {
            BaseColor = '#FFFF00';
          } else if (status === 'inv-ontrack') {
            BaseColor = '#5AB74C';
          } else if (status === 'inv-completed') {
            BaseColor = '#0C553C';
          } else if (status === 'inv-notstarted') {
            BaseColor = '#D9D9D9';
          } else if (status === 'inv-onhold') {
            BaseColor = '#80340D';
          } else if (status === 'inv-canceled') {
            BaseColor = '#80340D';
          } else if (status === 'inv-draft') {
            BaseColor = '#a6a6a6';
          }
        } else if (headName === '#projects') {
          if (status === 'prj-toolate') {
            BaseColor = '#FF6161';
          } else if (status === 'prj-late') {
            BaseColor = '#FFF901';
          } else if (status === 'prj-ontrack') {
            BaseColor = '#0BE59F';
          } else if (status === 'prj-completed') {
            BaseColor = '#00DDF4';
          } else if (status === 'prj-closed') {
            BaseColor = '#002358';
          } else if (
            status === 'prj-notstarted' ||
            status === 'prj-onhold' ||
            status === 'prj-canceled' ||
            status === 'prj-draft'
          ) {
            BaseColor = '#696969';
          }
        }

        return BaseColor;
      }

      setTimeout(() => {
        // Select the container where the strategy cards will be added
        // const strategyContainer = document.getElementById('strategies-container');
        // Select the container where the pillar cards will be added
        // const kpisContainer = document.getElementById('pillar-cards-container');
        // Select the container where the main cards will be added
        // const mainCardsContainer = document.getElementById(
        //   'mainGoal-cards-container'
        // );
        // Select the container where the main cards will be added
        // const Goal1CardsContainer = document.getElementById(
        //   'Goal2-cards-container'
        // );
        // const Goal2CardsContainer = document.getElementById(
        //   'Goal3-cards-container'
        // );
        // Call the function to create strategy cards
        // createStrategyCards(startegyArray, strategyContainer);
        // Call the function to create pillar cards
        // createPillarCards(pillarArray, kpisContainer);

        // Call the function to create main cards
        // createMainGoals(mainGoalData, mainCardsContainer);

        // Call the function to create goal cards
        // createGoal2Cards(Goal1Array, Goal1CardsContainer);
        // Call the function to create goal 2 cards
        // createGoal3Cards(Goal2Array, Goal2CardsContainer);

        // checkMarkActive();

        // Select the modal and the body tag
        const modal = document.getElementById('goalModal');
        const body = document.getElementsByTagName('body')[0];

        // Move the modal to the body
        if (modal && body) {
          body.appendChild(modal);
        }

        // Select all elements with the 'show-more' class
        const showMoreElements = document.querySelectorAll('.show-more');

        // Add click event listener to each 'show-more' element
        showMoreElements.forEach((element) => {
          element.addEventListener('click', function () {
            // Trigger the modal to open
            $('#goalModal').modal('show');
          });
        });
        switchLanguage(localStorage.getItem('lng'));
        changeResources();
      }, 100);
    } else {
      setTimeout(waitForCurrentUserData, 777); // Retry after 100 milliseconds
    }
  }
  waitForCurrentUserData();
});
async function fetchUserName(userId) {
  try {
    const response = await fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/getuserbyid(${userId})`, {
      method: "GET",
      headers: {
        "Accept": "application/json;odata=verbose"
      }
    });

    if (!response.ok) {
      console.warn(`Failed to fetch user name for ID ${userId}. HTTP status: ${response.status}`);
      return null; // Return null if the response is not OK
    }

    const data = await response.json();

    // Check if the API returned an error message
    if (data.error && data.error.message && data.error.message.value === "User cannot be found.") {
      console.warn(`User with ID ${userId} cannot be found.`);
      return null; // Return null if the user cannot be found
    }

    return data.d.Title; // Assuming the API returns the user's name in the `Title` field
  } catch (error) {
    console.error(`Error fetching user name for ID ${userId}:`, error);
    return null; // Return null in case of an error
  }
}

async function updateUserProperties(data) {
  try {
    // Define the fields to update
    const fieldsToUpdate = [
      { idField: "PerformanceLeader1Id", nameField: "PerformanceLeader1" },
      { idField: "PerformanceLeader2Id", nameField: "PerformanceLeader2" },
      { idField: "KPIOwnerId", nameField: "KPIOwner" }
    ];

    for (const item of data) {
      for (const field of fieldsToUpdate) {
        if (item[field.idField] > 0) {
          try {
            const userName = await fetchUserName(item[field.idField]);
            if (userName) {
              item[field.nameField] = userName; // Replace the ID with the user name
            }
          } catch (error) {
            console.error(`Error updating field ${field.nameField} for ID ${item[field.idField]}:`, error);
            // Continue to the next field even if an error occurs
          }
        }
      }
    }
    console.log("Updated Data:", data);
  } catch (error) {
    console.error("Error in updateUserProperties:", error);
    // Ensure the script continues even if an error occurs
  }
}
