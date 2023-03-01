var PQuery = '',
  PQueryFilteration = '',
  PCODE_STRING = '',
  originalstate = true,
  PageTitle = '',
  SP_ListName = '',
  ListURL = _spPageContextInfo.webAbsoluteUrl, //pcodes = '',
  Filter1 = '',
  Filter2 = '',
  PCODE = '',
  ICODE = '',
  STCODE = '',
  IIDs = '',
  isLoadMore = true,
  FilterChoices = [],
  filterValue = false,
  isOnload = true,
  isEmptyFilter = true, SPHTTPitemsEnumerable,
  AllRecordsWithID = [];
if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
  var search = "بحث ...";
  var No_Data = 'لا يوجد'
} else {
  var No_Data = 'No Data';
  var search = "Search ...";
}
if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
  var enternameemail = Resources.ar["enternameemail"]
} else {
  var enternameemail = Resources.en["enternameemail"]
}

var projectTypeFilterQuery = '', typeClicked = 'Internal';
window.indexofListing = 0;
var taskClicked = 'relatedTasks', allTasksClicked = false, getNewFilterTask = false, isViewMoreClicked = false;

var emptyData = require('../../../HelperRessources/img/empty-data.png');
var exportExcel = require('../../../HelperRessources/img/exportExcel.png');
// var emptyData = ''
// var exportExcel = ''
//all data filter array
allDataFilterArr = []
//

//get ListKey and PCODE from URL
var isWFs = window.location.href.indexOf('&WFs') > -1 ? '&WFs' : '',
  listkey = window.location.href.split('ListKey=')[1].split('&')[0],
  isTasks = listkey == 'tasks' ? true : false;
if (window.location.href.includes("PCODE")) {
  PCODE = window.location.href.split('PCODE=')[1].split('&')[0];
  PCODE_STRING = '&PCODE=' + PCODE;
}
if (window.location.href.includes("ICODE")) {
  ICODE = window.location.href.split('ICODE=')[1].split('&')[0];
}
if (window.location.href.includes("STCODE")) {
  STCODE = window.location.href.split('STCODE=')[1].split('&')[0];
}

//get SP_ListName and PageTitle from List_Name_Config js
for (var i = 0; i < ListArray.length; i++) {
  var obj = ListArray[i];
  for (var key in obj) {
    if (key == window.location.href.split('ListKey=')[1].split('&')[0]) {
      SP_ListName = obj[key];
      PageTitle = obj['ListingTitle'];
    }
  }
}

//create query depend on PCODE
JSON_File_Name = window.location.href.split('ListKey=')[1].split('&')[0] + '_Listing.js';

if (listkey == 'projects' && PCODE != null && PCODE != '') {
  // PCODE_STRING = '&PCODE='+PCODE;
  PQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><In><FieldRef Name="Title" /><Values><Value Type="Text">' + PCODE + '</Value></Values></In></And></Where></Query></View>';
  PQueryFilteration = '<In><FieldRef Name="Title" /><Values><Value Type="Text">' + PCODE + '</Value></Values></In>';
} else if (PCODE != null && PCODE != '') {
  // PCODE_STRING = '&PCODE='+PCODE;
  PQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><In><FieldRef Name="ProjectCode" /><Values><Value Type="Text">' + PCODE + '</Value></Values></In></And></Where></Query></View>';
  PQueryFilteration = '<Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' + PCODE + '</Value></Eq>';
}
else if (UserICode != null && UserICode != '') {
  // PCODE_STRING = '&PCODE='+PCODE;
  PQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><In><FieldRef Name="InitiativeCode" /><Values><Value Type="Text">' + UserICode + '</Value></Values></In></And></Where></Query></View>';
  PQueryFilteration = '<Eq><FieldRef Name="InitiativeCode" /><Value Type="Text">' + UserICode + '</Value></Eq>';
}
else if (UserSTCode != null && UserSTCode != '') {
  PQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><In><FieldRef Name="StrategicPartnershipCode" /><Values><Value Type="Text">' + UserSTCode + '</Value></Values></In></And></Where></Query></View>';
  PQueryFilteration = '<Eq><FieldRef Name="StrategicPartnershipCode" /><Value Type="Text">' + UserSTCode + '</Value></Eq>';
}
else if (isTasks) {
  PQuery =
    '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>';
  PQueryFilteration =
    '<And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And>';
}

//function to get data from sharepoint list (JSOM)
window.sphttp = {
  get: function (listUrl, listDisplayName, camelQuery, internalFieldNames, isGetDdl, onEach, onError) {

    debugger
    sphttp.g.isGetDdl = isGetDdl;
    var clientContext = new SP.ClientContext(listUrl);
    var oListsp = clientContext.get_web().get_lists().getByTitle(listDisplayName);
    // var fields=IN.join(', ');
    if (!isGetDdl && (isLoadMore || isEmptyFilter || filterValue || allTasksClicked)) {
      camelQuery = camelQuery.replace('</Query></View>', '</Query><RowLimit>10</RowLimit></View>');
    }

    // if (isLoadMore || isEmptyFilter || filterValue || allTasksClicked) {
    //   camelQuery = camelQuery.replace('</Query></View>', '</Query><RowLimit>30</RowLimit></View>');
    // }

    var fieldsToGet = '<ViewFields>'; // get all data on filter in listing page
    internalFieldNames.forEach(function (o, i, a) {
      fieldsToGet += '<FieldRef Name="' + o + '" />';
      if (i == internalFieldNames.length - 1) {
        fieldsToGet += '<FieldRef Name="DeletionStatus" /></ViewFields>';
      }
    });

    camelQuery = camelQuery.replace('</Query>', '</Query>' + fieldsToGet);


    if (!isLoadMore || isOnload) { // remove isEmptyFilter
      sphttp.g.camlQuery = new SP.CamlQuery();
    }
    sphttp.g.camlQuery.set_viewXml(camelQuery);



    SPHTTPitemsEnumerable = oListsp.getItems(sphttp.g.camlQuery);
    clientContext.load(SPHTTPitemsEnumerable); //, 'Include(Id, '+fields+')'
    clientContext.executeQueryAsync(
      Function.createDelegate(this,
        function (sender, args) {
          var listItems = SPHTTPitemsEnumerable.getEnumerator();
          window.records = [];
          window.RecordsWithID = [];
          window.RecordsWithPCode = [];
          while (listItems.moveNext()) {
            var oListItem = listItems.get_current();

            var record = {};
            if (isTasks) {
              if (oListItem.get_item('Status') == 'Open') {
                if (internalFieldNames && internalFieldNames.length > 0) {
                  for (var i = 0; i < internalFieldNames.length; i++) {
                    if (internalFieldNames[i] = Listing_Info[i].InternalName) {
                      if (Listing_Info[i].type == "date") {
                        // var timezone = String(oListItem.get_item(internalFieldNames[i])) || null;
                        // timezone = timezone ? timezone.split(':')[0].split(' ') : null;
                        // timezone = timezone ? timezone[timezone.length - 1] : null;
                        var d = (oListItem.get_item(internalFieldNames[i]) == null) ? 'empty' : oListItem.get_item(internalFieldNames[i]);
                        var datetouse2;
                        if (d != "empty") {
                          var local = d.getTime();
                          var offset = d.getTimezoneOffset() * (60 * 1000);
                          var utc = new Date(local + offset);
                          var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
                          var datetouse = riyadh.toLocaleString("en-US").split(',')[0].split('/');
                          datetouse[0] = (datetouse[0].length == 1) ? '0' + datetouse[0] : datetouse[0];
                          datetouse[1] = (datetouse[1].length == 1) ? '0' + datetouse[1] : datetouse[1];
                          datetouse2 = datetouse[1] + '/' + datetouse[0] + '/' + datetouse[2];
                          // datetouse2 = datetouse[1] + '/' + datetouse[0] + '/' + datetouse[2] + '<span style=\'display:none\'>:::' + timezone + ':::</span>';
                        }
                        record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : datetouse2;
                      }
                      else if (Listing_Info[i].type == "picker") {
                        var pemail = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]).get_lookupValue();
                        record[internalFieldNames[i]] = pemail;
                      }
                      else if (Listing_Info[i].type == "multipicker") {
                        var pemail = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]);
                        var userItems = [];
                        pemail.forEach(function (element) {
                          userItems.push(element.get_lookupValue());
                        })
                        record[internalFieldNames[i]] = userItems.join(", ");
                      }
                      else if (Listing_Info[i].type == "checkbox") {
                        var value = oListItem.get_item(internalFieldNames[i]) ? 'نعم' : 'لا';
                        record[internalFieldNames[i]] = value;
                      } else if (Listing_Info[i].type == "floatpercentage") {
                        record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]) + ' %';

                      } else if (Listing_Info[i].type == "money") {
                        record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      }
                      else
                        record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]);
                    }
                  }
                  RecordsWithID.push({
                    record: record,
                    ID: oListItem.get_id(),
                    tasktype: oListItem.get_item('TaskType'),
                    nxtstage: oListItem.get_item('StageIDApprove'),
                    prvstage: oListItem.get_item('StageIDReject'),
                    stageid: oListItem.get_item('StageID'),
                    pcode: oListItem.get_item('ProjectCode'),
                    icode: oListItem.get_item('InitiativeCode'),
                    ritemid: oListItem.get_item('RelatedItemID'),
                    sourceitemid: oListItem.get_item('SourceItemID') == null ? No_Data : oListItem.get_item('SourceItemID'),
                    wfname: oListItem.get_item('WorkflowName'),
                    puid: oListItem.get_item('ProjectUID'),
                    assignedto: oListItem.get_item('AssignedTo'),
                    relatedurl: oListItem.get_item('RelatedURL')
                  });
                  records.push(record);

                  onEach(records, record, oListItem, false); //false if having item
                }
              }
            } else {
              if (internalFieldNames && internalFieldNames.length > 0) {
                for (var i = 0; i < internalFieldNames.length; i++) {
                  if (internalFieldNames[i] = Listing_Info[i].InternalName) {
                    if (Listing_Info[i].type == "date") {
                      // var timezone = String(oListItem.get_item(internalFieldNames[i])) || null;
                      // timezone = timezone ? timezone.split(':')[0].split(' ') : null;
                      // timezone = timezone ? timezone[timezone.length - 1] : null;
                      var d = (oListItem.get_item(internalFieldNames[i]) == null) ? 'empty' : oListItem.get_item(internalFieldNames[i]);
                      var datetouse2;
                      if (d != "empty") {
                        var local = d.getTime();
                        var offset = d.getTimezoneOffset() * (60 * 1000);
                        var utc = new Date(local + offset);
                        var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
                        var riyadhtime = riyadh.toString().split(' ')[4];
                        var dateforfilteration = riyadh.toISOString();
                        var dateforfilterationValue = dateforfilteration.substring(dateforfilteration.indexOf('T') + 1);
                        var datetouse = riyadh.toLocaleString("en-US").split(',')[0].split('/');
                        datetouse[0] = (datetouse[0].length == 1) ? '0' + datetouse[0] : datetouse[0];
                        datetouse[1] = (datetouse[1].length == 1) ? '0' + datetouse[1] : datetouse[1];
                        datetouse2 = datetouse[1] + '/' + datetouse[0] + '/' + datetouse[2] + 'T' + riyadh.toString().split(' ')[4];
                        // datetouse2 = datetouse[1] + '/' + datetouse[0] + '/' + datetouse[2] + '<span style=\'display:none\'>:::' + timezone + ':::</span>';
                      }
                      record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : datetouse2;
                    } else if (Listing_Info[i].type == "picker") {
                      var pemail = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]).get_lookupValue();
                      record[internalFieldNames[i]] = pemail;
                    }
                    else if (Listing_Info[i].type == "multipicker") {

                      var pemail = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]);
                      var userItems = [];
                      if (pemail != No_Data) {
                        pemail.forEach(function (element) {
                          userItems.push(element.get_lookupValue());
                        })
                        record[internalFieldNames[i]] = userItems.join(", ");
                      }
                      else {
                        record[internalFieldNames[i]] = No_Data;
                      }
                    }
                    else if (Listing_Info[i].type == "checkbox") {
                      var value = oListItem.get_item(internalFieldNames[i]) ? 'نعم' : 'لا';
                      record[internalFieldNames[i]] = value;
                    } else if (Listing_Info[i].type == "floatpercentage") {
                      record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]) + ' %';

                    } else if (Listing_Info[i].type == "money") {
                      record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                    else if (Listing_Info[i].type == "lookup") {
                      var lookupItemarr = [], Itemdisplayname = "";
                      if ((localStorage.getItem('' + Listing_Info[i].localStorageVariable) != null) && (oListItem.get_item(internalFieldNames[i]) !== null)) {
                        lookupItemarr = JSON.parse(localStorage.getItem('' + Listing_Info[i].localStorageVariable));
                        lookupItemarr = lookupItemarr.filter(function (a) {
                          return a.code === oListItem.get_item(internalFieldNames[i])
                        });
                        if (lookupItemarr[0]) {
                          if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                            record[internalFieldNames[i]] = lookupItemarr[0].name;
                          } else record[internalFieldNames[i]] = lookupItemarr[0].nameEn;
                        }
                        else {
                          record[internalFieldNames[i]] = No_Data;
                        }
                      }
                      else {
                        record[internalFieldNames[i]] = No_Data;
                      }
                    }
                    else {
                      record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]);
                    }
                  }
                }
                RecordsWithID.push({
                  record: record,
                  ID: oListItem.get_id()
                });
                if (listkey == 'projects') {
                  RecordsWithPCode.push({
                    record: record,
                    ID: oListItem.get_item('Title')
                  });
                }
                if (listkey == 'initiatives') {
                  RecordsWithPCode.push({
                    record: record,
                    ID: oListItem.get_item('Title')
                  });
                } else if (listkey == 'deliverables' & !PCODE) {
                  RecordsWithPCode.push({
                    record: record,
                    PrCODE: oListItem.get_item('ProjectCode')
                  });
                }
                records.push(record);
                onEach(records, record, oListItem, false); //false if having item
              }
            }
            isLoadMore
              ? RecordsWithID.map(function (a) {
                // stack results
                AllRecordsWithID.push(a);
              })
              : (AllRecordsWithID = RecordsWithID); //get only filtered results

          }


          if (!sphttp.g.isGetDdl) sphttp.g.position = SPHTTPitemsEnumerable.get_listItemCollectionPosition();
          onEach(records, null, null, true); //true if no more items
        }),
      Function.createDelegate(this, function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
      })
    )
  },
  g: {
    loadMore: function () {
      //Position will be null if all the items in the collection are fetched and there are no more items to be fetched.
      //
      if (isTasks) {
        isViewMoreClicked = true
        getNewFilterTask = true
      }

      if (sphttp.g.position != null) {

        isLoadMore = true;
        //If more items are to be fetched, make a second call to the server and fetch the next group of items.
        sphttp.g.camlQuery.set_listItemCollectionPosition(sphttp.g.position);
        ListingData.init();
        $('a.view-more.text-center.py-2').addClass('loader-action');
      } else if (sphttp.g.position == null) {
        $('a.view-more.text-center.py-2').hide();
        $('a.view-more.text-center.py-2').addClass('disabled');
      }
      //////////////////////////////////////////////////////
      // debugger
      // if (sphttp.g.position != null) {
      //   isLoadMore = true;
      //   //If more items are to be fetched, make a second call to the server and fetch the next group of items.
      //   sphttp.g.camlQuery.set_listItemCollectionPosition(sphttp.g.position);
      //   ListingData.init();
      //   $("a.view-more.text-center.py-2").addClass("loader-action");
      // } else if (sphttp.g.position == null) {
      //   $("a.view-more.text-center.py-2").hide();
      //   $("a.view-more.text-center.py-2").addClass("disabled");
      // }
    }
  }
}
var Stages_Data_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Stages_Data_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Stages_Data_Request.g.StagesArray.push({
        phase: oListItem.get_item('RelatedPhase'),
        stage: oListItem.get_item('Title'),
        relatedURL: oListItem.get_item('RelatedURL'),
        stageid: oListItem.get_id(),
      });
    }


  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // The main Initialization function
  init: function (peojectC, type, taskid, nxtstageid, prvstageid, stageid) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Stages');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Enabled\'/><Value Type=\'Integer\'>1</Value></Eq></Where><OrderBy><FieldRef Name=\'ListSort\' Ascending=\'True\' /></OrderBy></Query></View>');
    Stages_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Stages_Data_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Stages_Data_Request.onSuccess),
      Function.createDelegate(this, Stages_Data_Request.onError)
    );
  },
  // Global variables
  g: {
    StagesArray: []
  }
};
window.ListingData = {
  // The main Initialization function
  preinit: function () {

    if ($('ul.list-group.w-100').length) {
      clearInterval(checkListingStatusHtml);

      $('.user-name').text(UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join(''));
      $('.user-name-full').text(UserN.Title);

      if (isAdmin || isEPMO) {
        if (isTasks && allTasksClicked) {

          PQuery = '<View><Query><Where><And><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq><Neq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Neq></And></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>'

        } else if (isTasks && !allTasksClicked) {

          PQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>';

          PQueryFilteration = '<And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And>';
        }
      }

      //call function by get JSON confugration files from style Library
      $.getScript(_spPageContextInfo.webAbsoluteUrl + "/Style%20Library/spm/JSON/" + listkey + "/" + JSON_File_Name).done(function (script, textStatus) {

        window.IN = Listing_Info.map(a => a.InternalName);

        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
          if (isTasks) {
            Stages_Data_Request.init();
          }
          ListingData.init();

        });
      });

    }
  },
  init: function () {

    if (!isTasks && originalstate) {

      if (isRoleDataLevelAccess && (!UserICode && !USERPCODE && isEmptyFilter)) {
        PQuery = dataLevelAccessQuery ? dataLevelAccessQuery : AccessQuery;
      } else {
        if (UserICode != null && UserICode != '') {
          if (listkey == 'initiativemilestones') { // to arrange the card depends on planned completed Date
            PQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><In><FieldRef Name="InitiativeCode" /><Values><Value Type="Text">' + UserICode + '</Value></Values></In></And></Where><OrderBy><FieldRef Name=\'PlannedCompletedDate\' Ascending=\'False\' /></OrderBy></Query></View>';
            PQueryFilteration = '<In><FieldRef Name="InitiativeCode" /><Values><Value Type="Text">' + UserICode + '</Value></Values></In>';
          } else {
            PQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><In><FieldRef Name="InitiativeCode" /><Values><Value Type="Text">' + UserICode + '</Value></Values></In></And></Where></Query></View>';
            PQueryFilteration = '<In><FieldRef Name="InitiativeCode" /><Values><Value Type="Text">' + UserICode + '</Value></Values></In>';
          }
        }
        else if (UserSTCode != null && UserSTCode != '') {
          PQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><In><FieldRef Name="StrategicPartnershipCode" /><Values><Value Type="Text">' + UserSTCode + '</Value></Values></In></And></Where></Query></View>';
          PQueryFilteration = '<In><FieldRef Name="StrategicPartnershipCode" /><Values><Value Type="Text">' + UserSTCode + '</Value></Values></In>';

        }
        else {
          PQuery = AccessQuery;
        }
      }
    }


    if (userProjects && userProjects.length == 0 && (USERProjRelated.indexOf(USERlistkey) > -1 || USERisProjects)) {
      $('div#particles-foreground, div#particles-background, .vertical-centered-box').remove();
      $('ul.list-group.w-100').html('<p data-trans-noitems class="Resources noItems"></p>');
      $('ul.list-group.w-100').addClass('noItemsDiv');
      $('.filtersSection').addClass('noItemsFilter');
      changeResources();
    } else {


      sphttp.get(
        ListURL,
        SP_ListName,
        PQuery,
        IN,
        false,
        async function (records, record, listItem, isDone) {


          // records.forEach((element, i) => { 
          //   if ((element.ProjectCode && element.ProjectCode != No_Data) && !isthereICODE) { // add element.projectCode !=No_Data to show the initiative in task list
          //     if (!userProjects.includes(element.ProjectCode)) {
          //       records.splice(i, 1);
          //     }
          //   }
          // });

          records.forEach((element, i) => {
            if ((element.ProjectCode && element.ProjectCode != No_Data) && element.WorkflowName == "Project") { // add element.projectCode !=No_Data to show the initiative in task list
              if (!userProjects.includes(element.ProjectCode)) {
                records.splice(i, 1);
              }
            }
          });


          if (isDone) {

            console.log(records, "records afteeeeeeeeer")

            var html = '';

            var InternalProjectsHtml = '';
            var ExternalProjectsHtml = '';

            for (var i = 0; i < records.length; i++) { //looping items
              indexofListing = indexofListing + 1;

              // ghufranChange
              if (listkey == 'projects') {
                if (records[i].ProjectType == 'Internal') {
                  // InternalProjectsHtml += '<li class="list-group-item link-arrow">' +
                  //   '<a id="ID' + i + '" class="mb-0 py-3 px-2 d-flex justify-content-between Listing-Anchor" href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/ProjectHome.aspx?PCODE=" + records[i].Title + isWFs + '">' + '<span class="acc-title d-inline-flex black paddingEnd16px">' + indexofListing + '</span>';
                  InternalProjectsHtml += '<li class="list-group-item link-arrow">' +
                    '<a id="ID' + i + '" class="mb-0 py-3 px-2 d-flex justify-content-between Listing-Anchor" href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/ProjectHome.aspx?PCODE=" + records[i].Title + isWFs + '">' + '';
                } else if (records[i].ProjectType == 'External') {
                  // ExternalProjectsHtml += '<li class="list-group-item link-arrow">' +
                  //   '<a id="ID' + i + '" class="mb-0 py-3 px-2 d-flex justify-content-between" href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/ProjectHome.aspx?PCODE=" + records[i].Title + isWFs + '">' + '<span class="acc-title d-inline-flex black paddingEnd16px">' + indexofListing + '</span>';
                  ExternalProjectsHtml += '<li class="list-group-item link-arrow">' +
                    '<a id="ID' + i + '" class="mb-0 py-3 px-2 d-flex justify-content-between" href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/ProjectHome.aspx?PCODE=" + records[i].Title + isWFs + '">' + '';
                }
              } else if (listkey == 'initiatives') {
                html += '<li class="list-group-item link-arrow">' +
                  '<a  style="cursor: pointer;" id="ID' + i + '" class="mb-0 py-3 px-2 d-flex justify-content-between" href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/initiativeHome.aspx?ICODE=" + records[i].Title + '">' + '<span class="acc-title d-inline-flex black paddingEnd16px">' + indexofListing + '</span>';
              }
              else if (listkey == 'strategicpartnerships') {
                html += '<li class="list-group-item link-arrow">' +
                  '<a  style="cursor: pointer;" id="ID' + i + '" class="mb-0 py-3 px-2 d-flex justify-content-between" href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/StrategicPartnershipHome.aspx?STCODE=" + records[i].Title + '">' + '<span class="acc-title d-inline-flex black paddingEnd16px">' + indexofListing + '</span>';
              }
              else if (isTasks) {
                html += '<li class="list-group-item tasksPage ">' + //link-arrow
                  '<a id="ID' + i + '" class="mb-0 py-3 px-2 d-flex justify-content-between Listing-Anchor" href="javascript:" onclick="ListingData.g.handleids(\'' + RecordsWithID[i].pcode + '\',\'' + RecordsWithID[i].icode + '\',\'' + RecordsWithID[i].ID + '\',\'' + RecordsWithID[i].tasktype + '\',\'' + RecordsWithID[i].stageid + '\',\'' + RecordsWithID[i].ritemid + '\',\'' + RecordsWithID[i].sourceitemid + '\',\'' + RecordsWithID[i].wfname + '\',\'' + RecordsWithID[i].puid + '\',\'' + RecordsWithID[i].relatedurl + '\')">';

                var taskcode = records[i].Title;
                var tasktitlearr, taskname;
                if (localStorage.getItem('Dynamo_Tasks Configuration') != null) {
                  tasktitlearr = JSON.parse(localStorage.getItem("Dynamo_Tasks Configuration") || "[]");
                  tasktitlearr = tasktitlearr.filter(function (item) {
                    return item.code == taskcode
                  });
                  if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                    taskname = tasktitlearr[0] ? tasktitlearr[0].name : '';
                  } else taskname = tasktitlearr[0] ? tasktitlearr[0].nameEn : '';
                }

                html += '<div class="d-inline-flex flex-column" style="width:25%!important">' +
                  '<h4 class="acc-title d-inline-flex black" style="margin:0px!important;margin-bottom:.5rem!important">' + taskname + '</h4><span class="des-13">' + taskcode + '</span></div>';

              } else if (listkey == 'deliverables' & !PCODE) {
                PCODE_STRING = '&PCODE=' + RecordsWithPCode[i].PrCODE;
                html += '<li class="list-group-item link-arrow">' +
                  '<a id="ID' + i + '" class="mb-0 py-3 px-2 d-flex justify-content-between Listing-Anchor" href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/View.aspx?ListKey=" + listkey + PCODE_STRING + "&IID=" + RecordsWithID[i].ID + isWFs + '">' + '<span class="acc-title d-inline-flex black paddingEnd16px">' + indexofListing + '</span>'
              } else if (!PCODE && !ICODE && !STCODE) {
                html += '<li class="list-group-item link-arrow">' +
                  '<a id="ID' + i + '" class="mb-0 py-3 px-2 d-flex justify-content-between Listing-Anchor" href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/View.aspx?ListKey=" + listkey + PCODE_STRING + "&IID=" + RecordsWithID[i].ID + isWFs + '">' + '<span class="acc-title d-inline-flex black paddingEnd16px">' + indexofListing + '</span>'
              } else if (ICODE) {
                html += '<li class="list-group-item link-arrow">' +
                  '<a id="ID' + i + '" class="mb-0 py-3 px-2 d-flex justify-content-between Listing-Anchor" href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/View.aspx?ListKey=" + listkey + "&ICODE=" + ICODE + "&IID=" + RecordsWithID[i].ID + isWFs + '">' + '<span class="acc-title d-inline-flex black paddingEnd16px">' + indexofListing + '</span>'
              }
              else if (STCODE) {

                html += '<li class="list-group-item link-arrow">' +
                  '<a id="ID' + i + '" class="mb-0 py-3 px-2 d-flex justify-content-between Listing-Anchor" href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/View.aspx?ListKey=" + listkey + "&STCODE=" + UserSTCode + "&IID=" + RecordsWithID[i].ID + isWFs + '">' + '<span class="acc-title d-inline-flex black paddingEnd16px">' + indexofListing + '</span>'
              }
              else if (ICODE && listkey == 'initiativemilestones') {
                html += '<li class="list-group-item link-arrow">' +
                  '<a id="ID' + i + '" class="mb-0 py-3 px-2 d-flex justify-content-between Listing-Anchor" href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/View.aspx?ListKey=" + listkey + "&ICODE=" + ICODE + "&IID=" + RecordsWithID[i].ID + isWFs + '">' + '<span class="acc-title d-inline-flex black paddingEnd16px">' + indexofListing + '</span>'
              }

              else if (USERlistkey == 'closureform' && PCODE) {

                html += '<li class="list-group-item link-arrow">' +
                  '<a id="ID' + i + '" class="mb-0 py-3 px-2 d-flex justify-content-between Listing-Anchor" href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/View.aspx?ListKey=" + listkey + "&PCODE=" + PCODE + "&IID=" + RecordsWithID[i].ID + isWFs + '">' + '<span class="acc-title d-inline-flex black paddingEnd16px">' + indexofListing + '</span>'

              } else {
                html += '<li class="list-group-item link-arrow">' +
                  '<a id="ID' + i + '" class="mb-0 py-3 px-2 d-flex justify-content-between Listing-Anchor" href="' + _spPageContextInfo.webAbsoluteUrl + "/SitePages/View.aspx?ListKey=" + listkey + "&PCODE=" + PCODE + "&IID=" + RecordsWithID[i].ID + isWFs + '">' + '<span class="acc-title d-inline-flex black paddingEnd16px">' + indexofListing + '</span>'
              }

              var obj = records[i];
              for (var key in obj) { // looping columns
                var Field_In_Use = Listing_Info.filter(function (el) {
                  return el.InternalName === key;
                });
                if (Field_In_Use[0].type == 'date' && obj[key] != No_Data) {
                  obj[key] = obj[key].slice(0, obj[key].indexOf('T'))
                }
                var isLinkable = Field_In_Use[0].hasOwnProperty("isLinkable"),
                  isLinkable = isLinkable ? Field_In_Use[0].isLinkable : false;
                var isRenderField = Field_In_Use[0].hasOwnProperty("ShowUnderProjectListing") ? false : true;
                if (!isRenderField)
                  isRenderField = (Field_In_Use[0].ShowUnderProjectListing && USERPCODE) || (!Field_In_Use[0].ShowUnderProjectListing && !USERPCODE) ? true : false;
                if (isRenderField) {

                  if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                    displayName = Field_In_Use[0].DisplayName;
                  } else displayName = Field_In_Use[0].DisplayNameEn;
                  //First column
                  if (Field_In_Use[0].InternalName == Listing_Info[0].InternalName) {
                    if (!isTasks) {

                      if (Field_In_Use[0].needTrans == true && obj[key] != No_Data) {

                        html += '<div class="d-inline-flex flex-column" style="width:25%!important">' +
                          '<h4 data-trans-' + obj[key] + ' class="acc-title d-inline-flex black Resources" style="margin:0px!important;margin-bottom:.5rem!important"></h4>';
                        if (records[i].ProjectType == 'Internal') {
                          InternalProjectsHtml += '<div class="d-inline-flex flex-column" style="width:25%!important">' +
                            '<h4 data-trans-' + obj[key] + ' class="acc-title d-inline-flex black Resources" style="margin:0px!important;margin-bottom:.5rem!important"></h4>';
                        } else if (records[i].ProjectType == 'External') {
                          ExternalProjectsHtml += '<div class="d-inline-flex flex-column" style="width:25%!important">' +
                            '<h4 data-trans-' + obj[key] + ' class="acc-title d-inline-flex black Resources" style="margin:0px!important;margin-bottom:.5rem!important"></h4>';
                        }
                      } else {
                        html += '<div class="d-inline-flex flex-column" style="width:25%!important">' +
                          '<h4 class="acc-title d-inline-flex black" style="margin:0px!important;margin-bottom:.5rem!important">' + obj[key] + '</h4>';
                        if (records[i].ProjectType == 'Internal') {
                          InternalProjectsHtml += '<div class="d-inline-flex flex-column" style="width:25%!important">' +
                            '<h4 class="acc-title d-inline-flex black" style="margin:0px!important;margin-bottom:.5rem!important">' + obj[key] + '</h4>';
                        } else if (records[i].ProjectType == 'External') {
                          ExternalProjectsHtml += '<div class="d-inline-flex flex-column" style="width:25%!important">' +
                            '<h4 class="acc-title d-inline-flex black" style="margin:0px!important;margin-bottom:.5rem!important">' + obj[key] + '</h4>';
                        }
                      }

                    }
                  }
                  //Second column
                  else if (Field_In_Use[0].InternalName == Listing_Info[1].InternalName) {
                    if (!isTasks) {


                      if (Field_In_Use[0].needTrans == true && obj[key] != No_Data) {
                        html += '<span data-trans-' + obj[key] + ' class="des-13 Resources"></span>' +
                          '</div>';
                        if (records[i].ProjectType == 'Internal') {
                          InternalProjectsHtml += '<span data-trans-' + obj[key] + ' class="des-13 Resources ' + obj[key] + '"></span>' +
                            '</div>';
                        } else if (records[i].ProjectType == 'External') {
                          ExternalProjectsHtml += '<span data-trans-' + obj[key] + ' class="des-13 Resources ' + obj[key] + '"></span>' +
                            '</div>';
                        }
                      } else {
                        html += '<span class="des-13">' + obj[key] + '</span>' +
                          '</div>';
                        if (records[i].ProjectType == 'Internal') {
                          InternalProjectsHtml += '<span class="des-13">' + obj[key] + '</span>' +
                            '</div>';
                        } else if (records[i].ProjectType == 'External') {
                          ExternalProjectsHtml += '<span class="des-13">' + obj[key] + '</span>' +
                            '</div>';
                        }
                      }
                    }
                  } else if (listkey == 'projects') {
                    if (Field_In_Use[0].InternalName == "RelatedIdeaCode") {

                      var RelatedIdeaCode = obj[key];
                      var index = RelatedIdeaCode.lastIndexOf("-");
                      var RelatedIdeaId = RelatedIdeaCode.substring(index + 1);
                      var isItemLinkable = Field_In_Use[0].hasOwnProperty("isItemLinkable"),
                        isItemLinkable = isItemLinkable ? Field_In_Use[0].isItemLinkable : false;

                      var IdeaRelated_Behavior = isItemLinkable && Field_In_Use[0].InternalName == "RelatedIdeaCode" && listkey == "projects" && obj[key] != UserNo_Data ?
                        'onclick="window.open(\' ' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/View.aspx?ListKey=ideas&IID=' + RelatedIdeaId + '\', \'_blank\')"' : '';
                      if (Field_In_Use[0].inlisting) {
                        if (records[i].ProjectType == 'Internal') {
                          InternalProjectsHtml += '<div class="d-inline-flex flex-column mx-2 wordBreak" style="width:20%!important" ' + IdeaRelated_Behavior + '>' +
                            // '<h4 class="text-warning">' + obj[key] + '</h4>' +
                            '<span class="des-13"><span class="state-val">' + displayName + '</span></span>' +
                            '<h4 class="text-warning">' + obj[key] + '</h4>' +
                            '</div>';
                        } else if (records[i].ProjectType == 'External') {
                          ExternalProjectsHtml += '<div class="d-inline-flex flex-column mx-2 wordBreak" style="width:20%!important" ' + IdeaRelated_Behavior + '>' +
                            // '<h4 class="text-warning">' + obj[key] + '</h4>' +
                            '<span class="des-13"><span class="state-val">' + displayName + '</span></span>' +
                            '<h4 class="text-warning">' + obj[key] + '</h4>' +
                            '</div>';
                        }

                      }
                    } else if (Field_In_Use[0].InternalName == "Priority") {
                      var PriorityName = obj[key];
                      if (Field_In_Use[0].inlisting) {
                        if (Field_In_Use[0].needTrans == true && obj[key] != No_Data) {
                          if (records[i].ProjectType == 'Internal') {
                            InternalProjectsHtml += '<div class="d-inline-flex wordBreak flex-column mx-2 ' + PriorityName + ' " style="width:20%!important">' +
                              // '<h4 data-trans-' + PriorityName + ' class="text-warning Resources" ></h4>' +
                              '<span class="des-13"><span class="state-val">' + displayName + '</span></span>' +
                              '<h4 data-trans-' + PriorityName + ' class="text-warning Resources" ></h4>' +
                              '</div>';
                          } else if (records[i].ProjectType == 'External') {
                            ExternalProjectsHtml += '<div class="d-inline-flex wordBreak flex-column mx-2  ' + PriorityName + '" style="width:20%!important">' +
                              // '<h4 data-trans-' + PriorityName + ' class="text-warning Resources" ></h4>' +
                              '<span class="des-13"><span class="state-val">' + displayName + '</span></span>' +
                              '<h4 data-trans-' + PriorityName + ' class="text-warning Resources" ></h4>' +
                              '</div>';
                          }
                        } else {
                          if (records[i].ProjectType == 'Internal') {
                            InternalProjectsHtml += '<div class="d-inline-flex wordBreak flex-column mx-2  " style="width:20%!important">' +
                              // '<h4 data-trans-' + PriorityName + ' class="text-warning Resources" ></h4>' +
                              '<span class="des-13"><span class="state-val">' + displayName + '</span></span>' +
                              '<h4 data-trans-' + PriorityName + ' class="text-warning Resources" ></h4>' +
                              '</div>';
                          } else if (records[i].ProjectType == 'External') {
                            ExternalProjectsHtml += '<div class="d-inline-flex wordBreak flex-column mx-2  " style="width:20%!important">' +
                              // '<h4 data-trans-' + PriorityName + ' class="text-warning Resources" ></h4>' +
                              '<span class="des-13"><span class="state-val">' + displayName + '</span></span>' +
                              '<h4 data-trans-' + PriorityName + ' class="text-warning Resources" ></h4>' +
                              '</div>';
                          }
                        }
                      }
                    } else if (Field_In_Use[0].inlisting) {
                      if (Field_In_Use[0].needTrans == true && obj[key] != No_Data) {
                        if (records[i].ProjectType == 'Internal') {
                          InternalProjectsHtml +=
                            '<div class="d-inline- wordBreak flex-column mx-2  ' + obj[key] + ' " style="width:20% !important ">' +
                            // '<h4 data-trans-' + obj[key] + ' class="text-warning Resources"></h4>' +
                            '<span class="des-13"><span class="state-val">' + displayName + '</span></span>' +
                            '<h4 data-trans-' + obj[key] + ' class="text-warning Resources"></h4>' +
                            '</div>';
                        } else if (records[i].ProjectType == 'External') {
                          ExternalProjectsHtml += '<div class="d-inline-flex wordBreak flex-column mx-2  ' + obj[key] + '" style="width:20%!important">' +
                            // '<h4 data-trans-' + obj[key] + ' class="text-warning Resources"></h4>' +
                            '<span class="des-13"><span class="state-val">' + displayName + '</span></span>' +
                            '<h4 data-trans-' + obj[key] + ' class="text-warning Resources"></h4>' +
                            '</div>';
                        }
                      } else {
                        if (records[i].ProjectType == 'Internal') {
                          InternalProjectsHtml +=
                            '<div class="d-inline-flex wordBreak flex-column mx-2  " style="width:20%!important">' +
                            // '<h4  class="text-warning">' + obj[key] + '</h4>' +
                            '<span class="des-13"><span class="state-val">' + displayName + '</span></span>' +
                            '<h4  class="text-warning">' + obj[key] + '</h4>' +
                            '</div>';
                        } else if (records[i].ProjectType == 'External') {
                          ExternalProjectsHtml += '<div class="d-inline-flex wordBreak flex-column mx-2  " style="width:20%!important">' +
                            // '<h4 class="text-warning">' + obj[key] + '</h4>' +
                            '<span class="des-13"><span class="state-val">' + displayName + '</span></span>' +
                            '<h4 class="text-warning">' + obj[key] + '</h4>' +
                            '</div>';
                        }
                      }

                    }
                  }
                  //get other columns
                  else {
                    var PrjRelated_Behavior = isLinkable && USERProjRelated.indexOf(listkey) > -1 && Field_In_Use[0].InternalName == "ProjectCode" && !USERPCODE && obj[key] != UserNo_Data ?
                      'onclick="window.open(\' ' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/ProjectHome.aspx?PCODE=' + obj[key] + '\', \'_blank\')"' : '';

                    if (Field_In_Use[0].needTrans == true && obj[key] != No_Data) {
                      var isHTML = USERPCODE && Field_In_Use[0].InternalName == "ProjectCode" ? '' :
                        '<div class="d-inline-flex wordBreak flex-column mx-2  ' + obj[key] + '  " style="width:20%!important" ' + PrjRelated_Behavior + '>' +
                        // '<h4 data-trans-' + obj[key] + ' class="text-warning Resources"></h4>' +
                        '<span class="des-13"><span class="state-val">' + displayName + '</span></span>' +
                        '<h4 data-trans-' + obj[key] + ' class="text-warning Resources"></h4>' +
                        '</div>';
                    } else {

                      let fieldType = Listing_Info.filter(el => {
                        return el.InternalName == key;
                      })

                      if (fieldType.length && fieldType[0].type == 'status') {// this type specially for strategicObjective status
                        var statusTitle = "", value = obj[key] ? obj[key] : No_Data;
                        statusTitle = await StrategicObjectives_Status_Listing.init(value)
                        var isHTML =
                          USERPCODE && Field_In_Use[0].InternalName == "ProjectCode"
                            ? ""
                            : '<div class="d-inline-flex flex-column mx-2  " style="width:20%!important" ' +
                            PrjRelated_Behavior +
                            ">" +
                            '<span class="des-13"><span class="state-val">' +
                            displayName +
                            "</span></span>" +
                            '<h4 class="text-warning ' + statusTitle.classname + '">' +
                            statusTitle.status +
                            "</h4>" +
                            "</div>";
                      } else {
                        var isHTML = USERPCODE && Field_In_Use[0].InternalName == "ProjectCode" ? '' :
                          '<div class="d-inline-flex wordBreak flex-column mx-2  " style="width:20%!important" ' + PrjRelated_Behavior + '>' +
                          // '<h4 class="text-warning">' + obj[key] + '</h4>' +
                          '<span class="des-13"><span class="state-val">' + displayName + '</span></span>' +
                          '<h4 class="text-warning">' + obj[key] + '</h4>' +
                          '</div>';
                      }
                    }

                    if (Field_In_Use[0].inlisting) {
                      html += isHTML;
                    }

                  }
                }
              }
              if (isTasks) {
                html += '</a><div class="task-Action">' +
                  '<button class="btn btn-action delegate-btn" style="display: block;" type="button"  onclick="Delegatepopup.init(\'' + RecordsWithID[i].ID + '\')"><span data-trans-delegate class="Resources"></span></button>' +
                  '<button class="btn btn-action task_action_btn" style="display: block;" type="button" onclick="ListingData.g.handleids(\'' + RecordsWithID[i].pcode + '\',\'' + RecordsWithID[i].icode + '\',\'' + RecordsWithID[i].ID + '\',\'' + RecordsWithID[i].tasktype + '\',\'' + RecordsWithID[i].stageid + '\',\'' + RecordsWithID[i].ritemid + '\',\'' + RecordsWithID[i].sourceitemid + '\',\'' + RecordsWithID[i].wfname + '\',\'' + RecordsWithID[i].puid + '\',\'' + RecordsWithID[i].relatedurl + '\')"><span data-trans-taskaction class="Resources"></span></button>' +
                  '</li>';
              } else {
                html += '</a></li>';
                if (records[i].ProjectType == 'Internal') {
                  InternalProjectsHtml += '</a></li>';
                } else if (records[i].ProjectType == 'External') {
                  ExternalProjectsHtml += '</a></li>';
                }
              }

            }

            var projectsListing = '';

            if (originalstate || (!isLoadMore)) { // fix project list tabs to show
              if (typeClicked == 'Internal') {
                projectsListing = '<ul class="nav nav-tabs" id="projectType" role="tablist"><li class="nav-item"><a data-trans-Internal class="nav-link active Resources" id="Internal" data-toggle="tab" href="#InternalProjects" role="tab" aria-controls="InternalProjects" aria-selected="true"></a></li ><li class="nav-item"><a data-trans-External class="nav-link Resources" id="External" data-toggle="tab" href="#ExternalProjects" role="tab" aria-controls="ExternalProjects" aria-selected="false"></a></li></ul>'
              } else if (typeClicked == 'External') {
                projectsListing = '<ul class="nav nav-tabs" id="projectType" role="tablist"><li class="nav-item"><a data-trans-Internal class="nav-link  Resources" id="Internal" data-toggle="tab" href="#InternalProjects" role="tab" aria-controls="InternalProjects" aria-selected="true"></a></li ><li class="nav-item"><a data-trans-External class="nav-link active Resources" id="External" data-toggle="tab" href="#ExternalProjects" role="tab" aria-controls="ExternalProjects" aria-selected="false"></a></li></ul>'
              }
            }

            if (typeClicked == 'Internal') {
              projectsListing += '<div class="tab-content" id="projectTypeContent"><div class="tab-pane fade show active" id="InternalProjects" role="tabpanel" aria-labelledby="Internal">' + InternalProjectsHtml + '</div><div class="tab-pane fade" id="ExternalProjects" role="tabpanel" aria-labelledby="External">' + ExternalProjectsHtml + '</div></div>'
            } else if (typeClicked == 'External') {
              projectsListing += '<div class="tab-content" id="projectTypeContent"><div class="tab-pane fade" id="InternalProjects" role="tabpanel" aria-labelledby="Internal">' + InternalProjectsHtml + '</div><div class="tab-pane fade show active" id="ExternalProjects" role="tabpanel" aria-labelledby="External">' + ExternalProjectsHtml + '</div></div>'
            }


            //// for tasks
            var tasksListing = ''
            // if (isAdmin || isEPMO) {
            if (originalstate || (!isLoadMore)) { // fix project list tabs to show
              if (taskClicked == 'relatedTasks') {
                $('.task_action_btn').css('display', 'block')
                tasksListing = '<ul class="nav nav-tabs" id="projectType" role="tablist"><li class="nav-item"><a data-trans-mytasks class="nav-link active Resources" id="relatedTasks" data-toggle="tab" href="#relatedTasks" role="tab" aria-controls="relatedTasks" aria-selected="true"></a></li ><li class="nav-item"><a data-trans-othertasks class="nav-link Resources" id="allTasks" data-toggle="tab" href="#allTasks" role="tab" aria-controls="allTasks" aria-selected="false"></a></li></ul>'

              } else if (taskClicked == 'allTasks') {
                tasksListing = '<ul class="nav nav-tabs" id="projectType" role="tablist"><li class="nav-item"><a data-trans-mytasks class="nav-link Resources" id="relatedTasks" data-toggle="tab" href="#relatedTasks" role="tab" aria-controls="relatedTasks" aria-selected="true"></a></li ><li class="nav-item"><a data-trans-othertasks class="nav-link active Resources" id="allTasks" data-toggle="tab" href="#allTasks" role="tab" aria-controls="allTasks" aria-selected="false"></a></li></ul>'
              }
            }



            if (taskClicked == 'relatedTasks') {
              tasksListing += '<div class="tab-content" id="taskTypeContent"><div class="tab-pane fade show active" id="relatedTasks" role="tabpanel" aria-labelledby="relatedTasks">' + html + '</div><div class="tab-pane fade" id="allTasks" role="tabpanel" aria-labelledby="allTasks">' + '' + '</div></div>'
            } else if (taskClicked == 'allTasks') {
              tasksListing += '<div class="tab-content" id="taskTypeContent"><div class="tab-pane fade" id="relatedTasks" role="tabpanel" aria-labelledby="relatedTasks">' + '' + '</div><div class="tab-pane fade show active" id="allTasks" role="tabpanel" aria-labelledby="allTasks">' + html + '</div></div>'
            }

            // }

            /////


            if (records.length == 0 && originalstate && !isTasks) {
              $('ul.list-group.w-100').html('<p data-trans-noitems class="Resources noItems"></p>');
              $('ul.list-group.w-100').addClass('noItemsDiv');
              $('.page-filter').addClass('noItemsFilter');

            }
            else if (records.length == 0 && originalstate && isTasks) {
              if (isAdmin || isEPMO) {
                $('ul.list-group.w-100').html(tasksListing);
              } else {
                $('ul.list-group.w-100').html('<p data-trans-noitems class="Resources noItems"></p>');
                $('ul.list-group.w-100').addClass('noItemsDiv');
                $('.page-filter').addClass('noItemsFilter');

              }
            }
            else {
              if ((!isLoadMore || isOnload) && listkey == 'projects') {
                $('ul.list-group.w-100').html(projectsListing);
              }
              if ((!isLoadMore || isOnload) && isTasks) {
                if (isAdmin || isEPMO) {
                  $('ul.list-group.w-100').html(tasksListing);
                } else {
                  $('ul.list-group.w-100').html(html);
                }
              }

              if ((!isLoadMore || isOnload) && listkey != 'projects' && listkey != 'tasks') {
                $('ul.list-group.w-100').html(html);
              } else if ((isLoadMore && !isOnload) && listkey == 'projects') {
                $('ul.list-group.w-100 #InternalProjects').append(InternalProjectsHtml)
                $('ul.list-group.w-100 #ExternalProjects').append(ExternalProjectsHtml)
                // $('ul.list-group.w-100').append(projectsListing); // comment to avoid the issue that when click on show more the data internal shown in external also
              } else if ((isLoadMore && !isOnload) && listkey == 'tasks' && (isAdmin || isEPMO)) {
                $('ul.list-group.w-100').append(tasksListing);
              } else if ((isLoadMore && !isOnload) && listkey != 'projects') {
                $('ul.list-group.w-100').append(html);
              }
            }

            // for tasks
            if (isTasks && (isAdmin || isEPMO)) {
              // to handle my tasks and other tasks in tasks list
              $('#relatedTasks').on("click", function (e) {
                // if (isAdmin || isPortManager) {
                // $('.task_action_btn').css('display', 'block')

                taskClicked = 'relatedTasks'
                getNewFilterTask = true
                allTasksClicked = false
                isViewMoreClicked = false
                ListingData.preinit()
                // ListingData.Get_DDL.init();

                // } else {
                //   $('#ExternalProjects').html('<p style="text-align:center">' + No_Data + '</p>');
                // }
              });
              // to handle my tasks and other tasks in tasks list
              $('#allTasks').on("click", function (e) {

                taskClicked = 'allTasks'
                getNewFilterTask = true
                allTasksClicked = true
                isViewMoreClicked = false
                ListingData.preinit()

              });
              // if (!allTasksClicked) {
              //   $('#internalProjectCount').html(records.length);
              // }
            }

            //


            // one item can create to close the initiative and project
            if (records.length && (listkey == 'closureinitiative' || listkey == 'closureform')) {
              $("body").append(
                "<style>" +
                ".btn-add{opacity: .6;pointer-events: none;}" +
                "</style>"
              );
            }

            // add illustration when there is no item on list
            if (records.length == 0 && !originalstate) {
              if (listkey == 'projects' || isTasks) {
                $('ul.list-group.w-100 .tab-content').html(`<div style="text-align:center;background:#fff"><img css="w-100" src="${emptyData}" style="height:40vh;width:40vh;"/><p data-trans-nofilterdata class="Resources" style="text-align:center;font-size:13px;padding-bottom:13px"></p></div>`)
              } else {
                $('ul.list-group.w-100').html(`<div style="text-align:center;background:#fff"><img css="w-100" src="${emptyData}" style="height:40vh;width:40vh;"/><p data-trans-nofilterdata class="Resources" style="text-align:center;font-size:13px;padding-bottom:13px"></p></div>`)
              }
            }



            $(".Listing-Anchor").on("click", "div[onclick]", function (e) {
              e.preventDefault();
            });





            //create button and div for filtertation DDLs
            var HtmlStart = (USERProjRelated.indexOf(listkey) > -1 && PCODE) || (USERProjRelated.indexOf(listkey) == -1 && !PCODE && !ICODE && !STCODE && listkey != 'tasks') || (listkey == 'changerequest') ?
              '<a class="btn-add" href="' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/new.aspx?ListKey=' + listkey + PCODE_STRING + '"><span data-trans-create class="Resources"></span><i class="icon-plus"></i></a><button class="btn btn-excel" type="button" onclick="ListingData.g.ExportToExcel()"><img src="' + exportExcel + '" /><span data-trans-excelExport class="Resources"></span></button>' : ICODE ?
                '<a class="btn-add" href="' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/new.aspx?ListKey=' + listkey + "&ICODE=" + ICODE + '"><span data-trans-create class="Resources"></span><i class="icon-plus"></i></a><button class="btn btn-excel" type="button" onclick="ListingData.g.ExportToExcel()"><img src="' + exportExcel + '" /><span data-trans-excelExport class="Resources"></span></button>'
                : STCODE ?
                  '<a class="btn-add" href="' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/new.aspx?ListKey=' + listkey + "&STCODE=" + STCODE + '"><span data-trans-create class="Resources"></span><i class="icon-plus"></i></a><button class="btn btn-excel" type="button" onclick="ListingData.g.ExportToExcel()"><img src="' + exportExcel + '" /><span data-trans-excelExport class="Resources"></span></button>'
                  : '';





            //hide btn and appear msg if there is no Actual budget

            if (PCODE && (listkey == 'deliverables' || listkey == 'milestones') && !projectActualBudget) {
              var HtmlStart = '<div data-trans-addActualBudget class="actualBudget ErrorMsg Resources"></div>';
            }

            if (ICODE && (listkey == 'initiativedeliverables' || listkey == 'initiativemilestones') && !initiativeActualBudget) {
              var HtmlStart = '<div data-trans-addinitiativebudget class="actualBudget ErrorMsg Resources"></div>';

            }

            if (originalstate) {
              $('.content-list-head > .listing-new-at').html(HtmlStart);
            }

            changeResources();

            if (isTasks) {
              if (taskClicked == 'relatedTasks') {
                $('.task_action_btn').css('display', 'block')

              } else if (taskClicked == 'allTasks') {
                $('.task_action_btn').css('display', 'none')

              }
            }



            if (!originalstate) {
              //remove opacity after filteration
              $('body').animate({
                opacity: 1
              }, {
                duration: 333,
                complete: function () {
                  $('.page-filter .dropdown-menu label.dropdown-item input:checkbox').prop({
                    "disabled": false
                  });
                }
              });
            }

            //
            if (isAdmin || isEPMO) {
              if (isTasks && getNewFilterTask) { // to get relate tasks for every tab
                ListingData.Get_DDL.init();
              }
              getNewFilterTask = false
            }
            //
            if (isOnload) {
              //hiding the loader and showing the page after all data is in place
              $('div#particles-foreground, div#particles-background, .vertical-centered-box').animate({
                opacity: 0
              }, {
                duration: 333,
                complete: function () {
                  $('div#particles-foreground, div#particles-background, .vertical-centered-box,script[src="' + _spPageContextInfo.webAbsoluteUrl + '/style library/spm/js/Particleground.js"]').remove();

                }
              });
              $('a.view-more.text-center.py-2').on("click", sphttp.g.loadMore);
            }




            isOnload = false;
            isLoadMore = false;
            if (originalstate || isLoadMore) // isLoadMore
              ListingData.Get_DDL.init();
            $('a.view-more.text-center.py-2').removeClass('loader-action');
            if (sphttp.g.position == null) {
              $('a.view-more.text-center.py-2').hide();
              $('a.view-more.text-center.py-2').addClass('disabled');
            } else {
              $('a.view-more.text-center.py-2').show();
              $('a.view-more.text-center.py-2').removeClass('disabled');
            }
          }
        });
    }
    // ListingData.Get_DDL.init();
  },
  //Filteration functions
  g: {
    filtertrigger: function () {
      $('.page-filter .dropdown-menu label input:checkbox').change(function (e) {
        FilterChoices = [];
        if (isRoleDataLevelAccess) {
          FilterChoices = Array.from(dataLevelAccessChoicesForFilters)
        }
        $('.page-filter .dropdown-menu').each(function () { //looping through filters
          var selectedchoices = $(this).find('input:checked').map(function () { //getting selected choices
            if ($(this).attr('data-type') == 'floatpercentage')
              return $(this).val().replace(' %', '');
            if ($(this).attr('data-type') == 'money')
              return $(this).val().replaceAll(',', '');
            else
              return $(this).val();
          }).get();
          if (selectedchoices.length) //checking if there are choices
          {
            var internalName = $(this).find('input:checkbox').data("internal");
            var fieldType = $(this).find('input:checkbox').data("type");
            //handle date format for caml
            if (fieldType == 'date') {
              for (var t = 0; t < selectedchoices.length; t++) {
                if (selectedchoices[t].indexOf('/') > -1) {
                  // selectedchoices[t] = selectedchoices[t].split('/');
                  // selectedchoices[t] = selectedchoices[t][2] + '-' + selectedchoices[t][1] + '-' + selectedchoices[t][0] + 'T00:00:00.000Z';
                  var myDate = selectedchoices[t].split('T');
                  var myDate2 = myDate[0].split('/');
                  selectedchoices[t] = myDate2[2] + '-' + myDate2[1] + '-' + myDate2[0] + 'T' + myDate[1] + '.000Z';
                  // var timezone = selectedchoices[t].split(':::')[1];
                  // selectedchoices[t] = selectedchoices[t].split('<span')[0].split('/');
                  // selectedchoices[t] = selectedchoices[t][2] + '-' + selectedchoices[t][1] + '-' + selectedchoices[t][0] + 'T00:00:00.000Z';
                  // selectedchoices[t] = selectedchoices[t][2] + '-' + selectedchoices[t][1] + '-' + selectedchoices[t][0] + 'T' + timezone + ':00:00.000Z';
                }
              }
            }
            FilterChoices.push({
              internalName: internalName,
              Type: fieldType,
              Values: selectedchoices
            });
          }
        });
        ListingData.g.camlfilterbuilder();
      });
      $('.page-filter .dropdown-menu label.dropdown-item').on("click", function (e) {
        e.stopPropagation();
      });


    },
    camlfilterbuilder: function () {

      Query_Body = '', Where_Body = '', ViewFields = '';


      $('body').animate({
        opacity: .5
      }, {
        duration: 100,
        complete: function () { }
      });

      if (PCODE != null && PCODE != '') {
        PQueryFilteration = '<In><FieldRef Name="ProjectCode" /><Values><Value Type="Text">' + PCODE + '</Value></Values></In>';
      }
      else if (ICODE != null && ICODE != '') {
        PQueryFilteration = '<In><FieldRef Name="InitiativeCode" /><Values><Value Type="Text">' + UserICode + '</Value></Values></In>';
      }
      else if (STCODE != null && STCODE != '') {
        PQueryFilteration = '<In><FieldRef Name="StrategicPartnershipCode" /><Values><Value Type="Text">' + UserSTCode + '</Value></Values></In>';
      }
      else if (isTasks) {

        if (allTasksClicked) {
          PQueryFilteration = '<And><Neq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Neq><In><FieldRef Name="Status" /><Values><Value Type="Choice">Open</Value></Values></In></And>';
        } else {
          PQueryFilteration = '<And><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And>';

        }
      }
      // else if (isInManager || isInOwner) {
      //   if (listkey == 'projects') {
      //     if (isInManager) {
      //       PQueryFilteration = '<Eq><FieldRef Name="ProjectManager" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq></And>'
      //     } else {
      //       PQueryFilteration = '<Eq><FieldRef Name="ProjectOwner" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq></And>'
      //     }
      //   } else if (listkey == 'initiatives') {
      //     if (isInManager) {
      //       PQueryFilteration = '<Eq><FieldRef Name="InitiativePM" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq></And>';
      //     } else {
      //       PQueryFilteration = '<Eq><FieldRef Name="InitiativeOwner" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq></And>';
      //     }
      //   } else {
      //     PQueryFilteration = ''
      //   }
      // }

      // else if (isDU || isGeneralManager || isMinisterAssistant || isSectorHead || isViceMinister || isSubSectorHead) {
      //   if (listkey == 'mainkpi' || listkey == 'sos' || listkey == 'initiatives' || USERlistkey == 'projects') {

      //     PQueryFilteration = "<In><FieldRef Name=\"" +
      //       SecondLevel_FirstLevel_Field +
      //       '" /><Values>';

      //     PQueryFilteration +=
      //       '<Value Type="' +

      //       SecondLevel_FirstLevel_FieldType +
      //       '">' +
      //       UserAccessSectorCode +
      //       "</Value>";

      //     PQueryFilteration += "</Values></In></And>";

      //   } else {
      //     PQueryFilteration = '';
      //   }
      // }
      else {

        PQueryFilteration = '';
      }

      if (FilterChoices.length == 0) {
        isEmptyFilter = true;
        filterValue = false

        if (isTasks) {
          PQuery = '<View><Query><Where>' + PQueryFilteration + '</Where><OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query></View>';

        }
        if (PCODE != null && PCODE != '') {
          PQuery = '<View><Query><Where><In><FieldRef Name="ProjectCode" /><Values><Value Type="Text">' + PCODE + '</Value></Values></In></Where><OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query></View>';
        } else if (ICODE != null && ICODE != '') {
          PQuery = '<View><Query><Where><In><FieldRef Name="InitiativeCode" /><Values><Value Type="Text">' + UserICode + '</Value></Values></In></Where><OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query></View>';
        }
        else if (STCODE != null && STCODE != '') {
          PQuery = '<View><Query><Where><In><FieldRef Name="StrategicPartnershipCode" /><Values><Value Type="Text">' + UserSTCode + '</Value></Values></In></Where><OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query></View>';
        }
        else {
          if (!isTasks) {
            PQuery = '<View><Query><Where><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq>' + PQueryFilteration + '</Where><OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query></View>';
          }
        }

        // if (isVROP && USERisListing && USERlistkey == 'goalstrategy') {
        //   PQuery = '<View><Query><Where><Eq><FieldRef Name="Types" /><Value Type="Choice">vision</Value></Eq></Where></Query></View>';
        // }
        //  else if (!isDU && !isGeneralManager && !isMinisterAssistant && !isSectorHead && !isViceMinister && !isSubSectorHead && USERisListing
        //   //  && USERlistkey == 'mainkpi'
        //    ) {
        //   if (!isAdmin && !isMinister && !isBITeam
        //     //  && !isSPMTeam

        //      && !isVROP && !isSPMAdmin && !isSPMO) {
        //     PQuery = '<View><Query><Where><Or><Eq><FieldRef Name="PerformanceLeader" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq><Eq><FieldRef Name="Owner" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq></Or></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>';
        //   }
        //   else if (isVROP) {
        //     PQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="RelatedStrategyType" /><Value Type=\'Text\'>vision</Value></Eq></And></Where></Query></View>';
        //   }
        //    else {
        //     PQuery = AccessQuery // added it to return all cards in listing after clear filters
        //   }
        // }
        // else if (!isDU && !isGeneralManager && !isMinisterAssistant && !isSectorHead && !isViceMinister && !isSubSectorHead && USERisListing && USERlistkey == 'initiatives') {
        //   if (isVROE) {
        //     PQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="Types" /><Value Type=\'Text\'>vision</Value></Eq></And></Where></Query></View>';
        //   }
        //   // else if (isEPMO) {
        //   //   PQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="Types" /><Value Type=\'Text\'>strategically</Value></Eq></And></Where></Query></View>';
        //   // }
        //   else {
        //     PQuery = AccessQuery // added it to return all cards in listing after clear filters
        //   }

        // } else if (isSPMAdmin && USERisListing && USERlistkey == 'sos') {
        //   PQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><Eq><FieldRef Name="Types" /><Value Type="Choice">sub</Value></Eq></And></Where></Query></View>';
        // }
        // else if ((isDU || isGeneralManager || isMinisterAssistant || isSectorHead || isViceMinister || isSubSectorHead) && (USERlistkey == 'sos' || USERlistkey == 'mainkpi' || USERlistkey == 'projects' || listkey == 'initiatives')) {
        //   // && USERlistkey == 'sos' || USERlistkey == 'mainkpi'
        //   PQuery = SectorHeadQuery
        // }
        // // else if (isPManager || isPOwner || isInManager || isInOwner) {
        // //   if (!isTasks) { // task has special query that related to user
        // //     PQuery = AccessQuery
        // //   }
        // // }
        // else {
        //   if ((PCODE != null && PCODE != '') || (ICODE != null && ICODE != '')) { // add and in query to handle the correct query if there is PCODE or ICODE
        //     if (listkey == 'initiativemilestones') { // to arrange the card depends on planned completed Date
        //       PQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq>' + PQueryFilteration + '</And></Where><OrderBy><FieldRef Name="PlannedCompletedDate" Ascending="False" /></OrderBy></Query></View>';
        //     } else if (listkey == 'milestones') {
        //       PQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq>' + PQueryFilteration + '</And></Where><OrderBy><FieldRef Name="PlannedDate" Ascending="False" /></OrderBy></Query></View>';
        //     } else {
        //       PQuery = '<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq>' + PQueryFilteration + '</And></Where><OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query></View>';
        //     }
        //   } else {
        //     if (!isTasks) {
        //       PQuery = '<View><Query><Where><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq>' + PQueryFilteration + '</Where><OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query></View>';
        //     }
        //   }
        // }


        ListingData.init();
      } else //if there are choices build caml query
      {
        isEmptyFilter = false;
        filterValue = true;
        $('#clearAllFilter').prop('disabled', false);
        $('.page-filter .dropdown-menu label.dropdown-item input:checkbox').prop({
          "disabled": true
        });
        for (var k = 0; k < FilterChoices.length; k++) {
          ViewFields += '<FieldRef Name="' + FilterChoices[k].InternalName + '"/>'
        }
        //dynamic query building
        for (var i = 0; i < FilterChoices.length; i++) {
          //only one choice
          if (FilterChoices.length == 1) {
            if (FilterChoices[i].Type == "LoggedInUser") {
              Where_Body += `<Eq><FieldRef Name="${FilterChoices[i].internalName}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>`;
            } else {
              Where_Body += '<In><FieldRef Name="' + FilterChoices[i].internalName + '" /><Values>';
              for (var j = 0; j < FilterChoices[i].Values.length; j++) {
                Where_Body += '<Value Type="' + FilterChoices[i].Type + '">' + FilterChoices[i].Values[j] + '</Value>';
              }
              Where_Body += '</Values></In>';
            }
          }
          //Two choices
          else if (FilterChoices.length == 2) {
            if (i == 0) {
              if (FilterChoices[i].Type == "LoggedInUser") {
                Where_Body += `<And><Eq><FieldRef Name="${FilterChoices[i].internalName}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>`;
              } else {
                Where_Body += '<And><In><FieldRef Name="' + FilterChoices[i].internalName + '" /><Values>';
                for (var j = 0; j < FilterChoices[i].Values.length; j++) {
                  Where_Body += '<Value Type="' + FilterChoices[i].Type + '">' + FilterChoices[i].Values[j] + '</Value>';
                }
                Where_Body += '</Values></In>';
              }
            } else {
              if (FilterChoices[i].Type == "LoggedInUser") {
                Where_Body += `<Eq><FieldRef Name="${FilterChoices[i].internalName}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq></And>`;
              } else {
                Where_Body += '<In><FieldRef Name="' + FilterChoices[i].internalName + '" /><Values>';
                for (var j = 0; j < FilterChoices[i].Values.length; j++) {
                  Where_Body += '<Value Type="' + FilterChoices[i].Type + '">' + FilterChoices[i].Values[j] + '</Value>';
                }
                Where_Body += '</Values></In></And>';
              }
            }
          }
          //More than two choices
          else if (FilterChoices.length > 2) {
            //two Eqs in last And
            if (i == FilterChoices.length - 1) {
              if (FilterChoices[i].Type == "LoggedInUser") {
                Where_Body += `<Eq><FieldRef Name="${FilterChoices[i].internalName}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>`;
              } else {
                Where_Body += '<In><FieldRef Name="' + FilterChoices[i].internalName + '" /><Values>';
                for (var j = 0; j < FilterChoices[i].Values.length; j++) {
                  Where_Body += '<Value Type="' + FilterChoices[i].Type + '">' + FilterChoices[i].Values[j] + '</Value>';
                }
                Where_Body += '</Values></In>';
              }
              //appending And closure
              var count = (Where_Body.match(/<And>/g) || []).length;
              var ANDC = "</And>".repeat(count);
              Where_Body += ANDC;
            }
            //normal And
            else {
              if (FilterChoices[i].Type == "LoggedInUser") {
                Where_Body += `<And><Eq><FieldRef Name="${FilterChoices[i].internalName}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>`;
              } else {
                Where_Body += '<And><In><FieldRef Name="' + FilterChoices[i].internalName + '" /><Values>';
                for (var j = 0; j < FilterChoices[i].Values.length; j++) {
                  Where_Body += '<Value Type="' + FilterChoices[i].Type + '">' + FilterChoices[i].Values[j] + '</Value>';
                }
                Where_Body += '</Values></In>';
              }
            }
          }
          //Finish Line, make last changes and build query
          if (i == FilterChoices.length - 1) {

            Where_Body = Where_Body.replaceAll('Type="date"', 'IncludeTimeValue="TRUE" Type="DateTime"'); //IncludeTimeValue="false"
            //alert(Where_Body.includes('Type="date"')+'00'+Where_Body);
            //Where_Body.replace('Type="date"', '');
            debugger
            if (!(PQueryFilteration.length > 0)) {
              // if (isTasks) {
              //   Where_Body_Final = "<Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>"  + Where_Body + PQueryFilteration + 
              //   "</And></Where>";
              // }
              // else {
              //   Where_Body_Final = '<Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq>' + Where_Body + PQueryFilteration + '</And></Where>';
              // }
              Where_Body_Final =
                "<Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" +
                Where_Body +
                PQueryFilteration +
                "</And></Where>";
            } else {
              Where_Body_Final =
                "<Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><And>" +
                Where_Body +
                PQueryFilteration +
                "</And></And></Where>";
              // if (isTasks) {
              //   Where_Body_Final = "<Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>" + Where_Body + PQueryFilteration + 
              //   "</And></Where>";
              // }
              // else {
              //   if ((UserICode != null && UserICode != '') || (PCODE != null && PCODE != '') || (STCODE != null && STCODE != '')) {
              //     Where_Body_Final = '<Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And>' + Where_Body + PQueryFilteration + '</And></And></Where>';
              //   }
              //   else {
              //     Where_Body_Final = '<Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><And>' + Where_Body + PQueryFilteration + '</And></Where>';

              //   }

              // }
            }

            Query_Body = '<View>' +
              '<Query>' +
              Where_Body_Final +
              '<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy>' +
              '</Query>' +
              '</View>';
            PQuery = Query_Body;

            ListingData.init();
          }
        }
      }
    },
    //for tasks functions
    handleids: function (pcode, icode, taskid, tasktype, stageid, ritemid, sourceitemid, wfname, puid, rurl) //rurl,
    {

      if (wfname == 'Project') {
        curstage_org = User_Stages_Data_Request.g.StagesArray.filter(function (obj) {
          return obj.stage == stageid;
        });
        var rurl = curstage_org[0].relatedURL;
      } else {
        targerstage_org = Generic_WF_Stages_Data_Request.g.GWFStagesArray.filter(
          function (obj) {
            return obj.stage == stageid;
          }
        );
        var rurl = targerstage_org[0].relatedURL;
      }
      Tasks_Info_Request_User.g.handlelinks(pcode, icode, rurl, taskid, tasktype, stageid, ritemid, sourceitemid, wfname, puid);
    },
    handlelinks: function (pcode, icode, rurl, taskid, tasktype, stageid, ritemid, sourceitemid, wfname, puid) {
      switch (wfname) {
        case 'Project':
          if ((rurl.toLowerCase().indexOf('pcode') > -1) && (window.location.href.toLowerCase().indexOf('&wfs') > -1)) {
            if (rurl.toLowerCase().indexOf('view.aspx') > -1) //view page with pcode
            {
              rurl = rurl.replace('&PCODE=', '');
              window.open(_spPageContextInfo.webAbsoluteUrl + rurl + '&IID=' + ritemid + '&PCODE=' + pcode + '&TID=' + taskid + '&WFs', '_blank'); //

            } else if (rurl.toLowerCase().indexOf('edit') > -1) //edit page is mainly without pcode [just in case!]
            {
              rurl = rurl.replace('&PCODE=', '');
              window.open(_spPageContextInfo.webAbsoluteUrl + rurl + '&IID=' + ritemid + '&PCODE=' + pcode + '&TID=' + taskid + '&WFs', '_blank'); //
            } else //Listing page with pcode
            {

              window.open(_spPageContextInfo.webAbsoluteUrl + rurl + pcode + '&TID=' + taskid + '&WFs', '_blank');
            }
          } else if ((rurl.toLowerCase().indexOf('edit') > -1) && (window.location.href.toLowerCase().indexOf('&wfs') > -1)) //edit page without pcode
          {
            window.open(_spPageContextInfo.webAbsoluteUrl + rurl + '&PCODE=' + pcode + '&IID=' + ritemid + '&TID=' + taskid + '&WFs', '_blank'); //+'&TID='+taskid
          } else if ((rurl.toLowerCase().indexOf('view') > -1) && (window.location.href.toLowerCase().indexOf('&wfs') > -1)) //view page without pcode
          {
            window.open(_spPageContextInfo.webAbsoluteUrl + rurl + '&PCODE=' + pcode + '&IID=' + ritemid + '&TID=' + taskid + '&WFs', '_blank'); //+'&TID='+taskid
          } else if ((rurl.toLowerCase().indexOf('schedule.aspx') > -1) && (window.location.href.toLowerCase().indexOf('&wfs') > -1)) {
            rurl = rurl.replace('&PCODE=', '');
            window.open(_spPageContextInfo.webAbsoluteUrl + rurl + puid + '&PCODE=' + pcode + '&TID=' + taskid + '&WFs', '_blank'); //+'&TID='+taskid
          } else {
            window.open(_spPageContextInfo.webAbsoluteUrl + rurl + pcode + '&IID=' + ritemid + '&TID=' + taskid + '&WFs', '_blank');
          }
          break;
        default: //other workflows
          var keyNameParams = ''
          if (wfname == 'Idea') {
            keyNameParams = "ideas"
          } else if (wfname == 'DV') {
            keyNameParams = 'deliverables'
          } else if (wfname == 'CR') {
            keyNameParams = 'changerequest'
          } else if (wfname == 'Issue') {
            keyNameParams = 'issues'
          } else if (wfname == 'Risk') {
            keyNameParams = 'risks'
          } else if (wfname == 'MoM') {
            keyNameParams = 'mom'
          } else if (wfname == 'InitiativeSample') {
            keyNameParams = "initiativesample"
          } else if (wfname == 'VisionInitiative' || wfname == 'StrategicallyInitiative' || wfname == 'LMSInitiative') {
            keyNameParams = "initiatives"
          } else if (wfname == 'StrategicPartnerships') {
            keyNameParams = 'strategicpartnerships'
          } else if (wfname == 'SPAchievements') {
            keyNameParams = 'strategicpartnershipsachievements'
          }
          switch (tasktype) {
            case 'SubmitField':
              window.open(
                _spPageContextInfo.webAbsoluteUrl +
                "/sitepages/edit.aspx?ListKey=" +
                keyNameParams +
                "&IID=" +
                ritemid +
                "&TID=" +
                taskid +
                "&WFs",
                "_self"
              );
              break;
            default:
              window.open(
                _spPageContextInfo.webAbsoluteUrl +
                rurl +
                "&TID=" +
                taskid +
                "&IID=" +
                ritemid +
                "&WFs",
                "_self"
              );
              break;
          }
      }
    },
    ExportToExcel: function () {
      var DN = Listing_Info.map((a) => a.DisplayName);
      var FT = Listing_Info.map((a) => a.type);
      var fields = IN;
      var filter = "";
      var mydata = [];
      var newdate;
      var index;
      var translationData = "";
      var armonths = [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ];
      var enmonths = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      AllRecordsWithID.forEach(function (a, i) {
        //getting listing records
        mydata.push(a.record);
      });

      var table =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head> <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets> <x:ExcelWorksheet><x:Name>{worksheet}</x:Name> <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions> </x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook> </xml><![endif]--><meta charset="UTF-8"></head><body><table><thead><tr>'; //assigning charset for ar words
      // var head = Object.keys(mydata[0]);//Using internal names
      var head = DN;
      for (var i = 0; i < head.length; i++) {
        table += "<th>" + head[i].replaceAll(" ", "%20") + "</th>";
      }
      table += "</tr></thead><tbody>";

      for (var i = 0; i < mydata.length; i++) {

        table += "<tr>";
        for (var j = 0; j < IN.length; j++) {


          if (
            mydata[i][IN[j]] && armonths.indexOf(mydata[i][IN[j]].toString().split(" ")[1]) > -1 &&
            FT[j] == "date"
          ) {
            newdate = mydata[i][IN[j]].split(" ");
            index = armonths.indexOf(newdate[1]);
            newdate[1] = enmonths[index];
            mydata[i][IN[j]] = newdate.join(" ");
          }


          switch (FT[j]) {
            case "date":
              var checkDateFormat = mydata[i][IN[j]].indexOf("T") > -1
              if (checkDateFormat) {
                var formattedDate = mydata[i][IN[j]].split("T")[0]
                mydata[i][IN[j]] = formattedDate
              }
              break;

            case "dropdownValues":
              var data = mydata[i][IN[j]]
              if (data) {
                if (
                  localStorage.getItem("lng") == null ||
                  localStorage.getItem("lng") == "ar"
                ) {
                  
                  translationData = Resources.ar[data] ? Resources.ar[data] : No_Data
                } else {
                  translationData = Resources.en[data] ? Resources.en[data] : No_Data
                }
              }
              mydata[i][IN[j]] = translationData
              break;

              default:
                console.log("no change on on value")
                break;
          }


          table +=
            "<td>" +
            mydata[i][IN[j]].toString().replaceAll(" ", "%20") +
            "</td>"; //fixing spaces issue
        }
        table += "</tr>";
      }
      table += "</tbody></table></body></html>";
      var csv = "data:application/vnd.ms-excel;charset=utf-8," + table + "\n";
      var a = document.createElement("a");
      a.setAttribute("href", csv);
      a.setAttribute("download", listkey + "-data.xls");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  },
  //fill filteration DDLs data
  Get_DDL: {
    init: function () {
      if (isRoleDataLevelAccess && (!UserICode && !UserSTCode && !USERPCODE && isEmptyFilter)) {
        cmlQ = dataLevelAccessQuery ? dataLevelAccessQuery : PQuery;
      } else {
        cmlQ = PQuery;
      }

      sphttp.get(ListURL, SP_ListName, cmlQ, IN, true, function (recordsddl, recordddl, listItem, isDone) {
        if (isDone) {
          FilterationItems = []; //data
          AllFilterationItems = [];
          DisplayNameFields = [];
          InternalNameFields = [];
          NeedTrans = [];
          localStorageVar = [];
          TypsFields = [];
          // to add the new data when click show more to the filters dropdown in listing


          if (originalstate) { // add isTasks to not add to filter when change tabs
            allDataFilterArr = recordsddl
          }
          else if (isTasks) {
            if (isAdmin || isEPMO) {

              if (allTasksClicked && !isViewMoreClicked) {
                allDataFilterArr = []
                recordsddl = [...recordsddl, ...allDataFilterArr]
                allDataFilterArr = [...recordsddl, ...allDataFilterArr]
              } else if (allTasksClicked && isViewMoreClicked) {
                recordsddl = [...recordsddl, ...allDataFilterArr]
                allDataFilterArr = [...recordsddl, ...allDataFilterArr]
              } else if (!allTasksClicked && !isViewMoreClicked) {
                allDataFilterArr = []
                recordsddl = [...recordsddl, ...allDataFilterArr]
                allDataFilterArr = [...recordsddl, ...allDataFilterArr]
              } else {
                recordsddl = [...recordsddl, ...allDataFilterArr]
                allDataFilterArr = [...recordsddl, ...allDataFilterArr]
              }
            } else {
              recordsddl = [...recordsddl, ...allDataFilterArr]
              allDataFilterArr = [...recordsddl, ...allDataFilterArr]
            }
          }
          else {
            recordsddl = [...recordsddl, ...allDataFilterArr]
            allDataFilterArr = [...recordsddl, ...allDataFilterArr]
          }
          if (listkey == "initiativemilestones") {
            var AllinitiativeMilestonesCounterContainer = "";
            var countcompleted = 0,
              notcompletedcount = 0,
              countOfnostarted = 0,
              latecount = 0;
            var today = new Date();
            recordsddl.forEach((item) => {
              if (item.Delivered == true) {
                countcompleted += 1;
              } else {
                notcompletedcount += 1;
              }
              var formatedactualdatemilestone = item.ActualCompletedDate.split("T").at(0);
              var day2 = formatedactualdatemilestone.split("/").at(0);
              var month2 = formatedactualdatemilestone.split("/").at(1);
              var year2 = formatedactualdatemilestone.split("/").at(2);
              var finalformatedactualdate = new Date(year2 + "-" + month2 + "-" + day2);

              if (today < finalformatedactualdate && item.Delivered !== true) {
                countOfnostarted += 1;
              }
              var formatedplaneddatemilestone =
                item.PlannedDate.split("T").at(0);
              var day = formatedplaneddatemilestone.split("/").at(0);
              var month = formatedplaneddatemilestone.split("/").at(1);
              var year = formatedplaneddatemilestone.split("/").at(2);
              var finalformatedPlanneddate = new Date(year + "-" + month + "-" + day);

              if (today > finalformatedPlanneddate && item.Delivered !== true) {
                latecount += 1;
              }
            });
            AllinitiativeMilestonesCounterContainer +=
              '<div class="allMilestonesCounter"><div class="intoallMilestonesCounter"><h3 data-trans-allmilestonescount class="Resources"></h3><span>' +
              recordsddl.length +
              '</span></div><div class="intoallMilestonesCounter"><h3 data-trans-completedmilestonescount class="Resources"></h3><span>' +
              countcompleted +
              '</span></div><div class="intoallMilestonesCounter"><h3 data-trans-notcompletedmilestonescount class="Resources"></h3><span>' +
              notcompletedcount +
              '</span></div><div class="intoallMilestonesCounter"><h3 data-trans-notstartedmilestonescount class="Resources"></h3><span>' +
              countOfnostarted +
              '</span></div><div class="intoallMilestonesCounter"><h3 data-trans-latemilestonescount class="Resources"></h3><span>' +
              latecount +
              "</span></div></div>";
            // $(AllinitiativeMilestonesCounterContainer).insertAfter(
            //   $(".content-list-head")
            // );
            $('.additionalInfo').html(AllinitiativeMilestonesCounterContainer);
          }
          //
          for (var y = 0; y < Listing_Info.length; y++) {
            if (Listing_Info[y].infilter == true) { //chack if column is used to filter by check json file infilter column
              if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                DisplayNameFields.push(Listing_Info[y].DisplayName);
              } else DisplayNameFields.push(Listing_Info[y].DisplayNameEn);
              InternalNameFields.push(Listing_Info[y].InternalName);
              NeedTrans.push(Listing_Info[y].needTrans);
              localStorageVar.push(Listing_Info[y].localStorageVariable);
              TypsFields.push(Listing_Info[y].type);
              for (var i = 0; i < recordsddl.length; i++) { //looping items
                var obj = recordsddl[i];
                for (var key in obj) { // looping columns
                  var Field_In_Use = Listing_Info.filter(function (el) {
                    return el.InternalName === key;
                  });
                  if (Field_In_Use[0].InternalName == Listing_Info[y].InternalName) { //catch columns one by one and get all items for it
                    //FilterationItems += obj[key] + ',';
                    if (Listing_Info[y].type == 'date') {
                      FilterationItems.push(obj[key]);

                    }
                    else {
                      FilterationItems.push(obj[key]);
                    }
                  }
                }
              }
              FilterationItems = FilterationItems.filter((v, i, a) => a.indexOf(v) === i);
              AllFilterationItems.push(FilterationItems); //collect all data to all filteration columns seperate it by
              // allDataFilterArr.push(FilterationItems)
              FilterationItems = [];
            }
          }
          ListingData.Get_DDL.Build_HTML(AllFilterationItems, InternalNameFields, DisplayNameFields, TypsFields, NeedTrans, localStorageVar); //call functopn to split data and build html for DDLs
          changeResources();
          ListingData.g.filtertrigger(); //call filteration function

          $('body').animate({
            opacity: 1
          }, {
            duration: 333,
            complete: function () { }
          });
        }
      });
    }, //build html and split data to DDLS
    Build_HTML: function (AllData, FilterNames, DisplayNames, TypsFieldsAll, transFields, localStorageVariables) {

      var FilterationcontractsHTML = '';
      my_split = '';

      htmlFilter = '';
      FilterName = '';

      DisplayNames = DisplayNames.filter((v, i, a) => a.indexOf(v) === i);
      FilterNames = FilterNames.filter((v, i, a) => a.indexOf(v) === i);
      //TypsFieldsAll = TypsFieldsAll.filter((v, i, a) => a.indexOf(v) === i);

      for (var L = 0; L < DisplayNames.length; L++) {
        //buld ddl html
        for (var z = 0; z < AllData[L].length; z++) {
          if (transFields[L] == true) {
            FilterationcontractsHTML +=
              '<label class="dropdown-item"><span data-trans-' + AllData[L][z] + ' class="Resources"></span><input data-type="' + TypsFieldsAll[L] + '" data-internal="' + FilterNames[L] + '" type="checkbox" name="' + FilterNames[L] + '" value="' + AllData[L][z] + '">' +
              '</label>'
          } else {
            if (TypsFieldsAll[L] == "lookup") {
              var lookupItemarray = [];
              if (localStorage.getItem('' + localStorageVariables[L]) != null) {
                lookupItemarray = JSON.parse(localStorage.getItem('' + localStorageVariables[L]));
                lookupItemarray = lookupItemarray.filter(function (a) {
                  if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                    return a.name === AllData[L][z]
                  } else return a.nameEn === AllData[L][z];
                });
              }
              if (lookupItemarray[0]) {
                FilterationcontractsHTML +=
                  '<label class="dropdown-item">' + AllData[L][z] + '<input data-type="' + TypsFieldsAll[L] + '" data-internal="' + FilterNames[L] + '" type="checkbox" name="' + FilterNames[L] + '" value="' + lookupItemarray[0].code + '">' +
                  '</label>'
              }
            }
            else {
              if (TypsFieldsAll[L] == "date" && AllData[L][z] != No_Data) {
                var dateDisplay = AllData[L][z].slice(0, AllData[L][z].indexOf('T'))
                FilterationcontractsHTML +=
                  '<label class="dropdown-item"><span title="' + AllData[L][z] + '" class="textintofilter">' + dateDisplay + '</span><input data-type="' + TypsFieldsAll[L] + '" data-internal="' + FilterNames[L] + '" type="checkbox" name="' + FilterNames[L] + '" value="' + AllData[L][z] + '">' +
                  '</label>'
              }
              else {
                FilterationcontractsHTML +=
                  '<label class="dropdown-item"><span title="' + AllData[L][z] + '" class="textintofilter">' + AllData[L][z] + '</span><input data-type="' + TypsFieldsAll[L] + '" data-internal="' + FilterNames[L] + '" type="checkbox" name="' + FilterNames[L] + '" value="' + AllData[L][z] + '">' +
                  '</label>'
              }

            }
          }
        };

        //gathar all ddls
        htmlFilter += '<div class="dropdown mx-3">' +
          '<a href="#" data-trans-Filter class="dropdown-toggle fnt-14 w-1 black Resources" data-toggle="dropdown" role="button"  ' + L + '" resource-done="true" aria-expanded="false">' + DisplayNames[L] + '</a>' +
          '<div class="dropdown-menu Filter-' + L + '" style="max-height:540px;overflow-y:auto">' +
          '<label class="main-action-filter">' +
          '<input class="filterSearch" type="text" placeholder="' + search + '">' +
          '<button data-trans-canselselections class="clear-filter Resources" type="button"></button>' +
          '</label>' + FilterationcontractsHTML + '</div></div>'


        FilterationcontractsHTML = '';
        changeResources();
      }

      $('div#StatusFilterationHTMLid').html(htmlFilter); // move it from inside the originalstate to here to can add the new items to filter after showmore
      if (originalstate) {
        // $('div#StatusFilterationHTMLid').html(htmlFilter);
        if (!isRoleDataLevelAccess) {
          $('.btn-toolbar.mb-2.mb-md-0.mx-2.page-filter').append(forfilterQuery);
        }
        //End of filters when click in clear button inside ddls
        $("body").on('click', 'button.clear-filter', function (e) {
          e.stopPropagation();

          if ($(this).closest('.dropdown-menu').find('input:checkbox:checked').length) {
            $(this).closest('.dropdown-menu').find('input:checkbox').prop({
              "checked": false,
              "disabled": true
            });
          }
          FilterChoices = [];
          $('.page-filter .dropdown-menu').each(function () { //looping through filters
            var selectedchoices = $(this).find('input:checked').map(function () { //getting selected choices
              return $(this).val();
            }).get();
            if (selectedchoices.length) //checking if there are choices
            {
              var internalName = $(this).find('input:checkbox').data("internal");
              var fieldType = $(this).find('input:checkbox').data("type");
              //handle date format for caml
              if (fieldType == 'date') {
                for (var t = 0; t < selectedchoices.length; t++) {
                  if (selectedchoices[t].indexOf('/') > -1) {
                    // selectedchoices[t] = selectedchoices[t].split('/');
                    // selectedchoices[t] = selectedchoices[t][2] + '-' + selectedchoices[t][1] + '-' + selectedchoices[t][0] + 'T00:00:00.000Z';
                    var myDate = selectedchoices[t].split('T');
                    var myDate2 = myDate[0].split('/');
                    selectedchoices[t] = myDate2[2] + '-' + myDate2[1] + '-' + myDate2[0] + 'T' + myDate[1] + '.000Z';
                    // var timezone = selectedchoices[t].split(':::')[1];
                    // selectedchoices[t] = selectedchoices[t].split('<span')[0].split('/');
                    // selectedchoices[t] = selectedchoices[t][2] + '-' + selectedchoices[t][1] + '-' + selectedchoices[t][0] + 'T00:00:00.000Z';
                    // selectedchoices[t] = selectedchoices[t][2] + '-' + selectedchoices[t][1] + '-' + selectedchoices[t][0] + 'T' + timezone + ':00:00.000Z';
                  }
                }
              }
              FilterChoices.push({
                internalName: internalName,
                Type: fieldType,
                Values: selectedchoices
              });
            }
          });

          if (isRoleDataLevelAccess) {
            FilterChoices = Array.from(dataLevelAccessChoicesForFilters);
          }

          ListingData.g.camlfilterbuilder();
          //remove opacity after filteration
          // $('body').animate({ opacity: 1 }, { duration: 333, complete: function () { } });
        });

        $("body").on('keyup', '.filterSearch', function (e) {
          var value = $(this).val().toLowerCase();
          $(".page-filter .dropdown-item").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        })

        //////////////////////////////////////////////////////// start handle tab projects

        if (listkey == 'projects' && !PCODE && !ICODE && !STCODE) {

          // projectTypeFilterQuery = '<div style="display:none!important;height:0px!important" class="dropdown "><a href="#" class="dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button">ProjectTypeQueryAccess</a><div class="dropdown-menu" id="projectTypeQueryAccess">'
          projectTypeFilterQuery = '<div style="display:none!important;height:0px!important" class="dropdown "><a href="#" class="dropdown-toggle fnt-14 w-1 black" data-toggle="dropdown" role="button">ProjectTypeQueryAccess</a><div class="dropdown-menu" id="projectTypeQueryAccess">'
          var projectTypeArr = [
            { name: 'Internal', field: 'ProjectType', value: 'Internal' },
            { name: 'External', field: 'ProjectType', value: 'External' }
          ]



          for (var u = 0; u < projectTypeArr.length; u++) {
            projectTypeFilterQuery += '<label class="dropdown-item">' +
              projectTypeArr[u].name +
              '<input data-type="Text" data-internal="' +
              projectTypeArr[u].field +
              '" type="checkbox" name="' +
              projectTypeArr[u].field +
              '" value="' +
              projectTypeArr[u].value +
              '"></label>';

            if (u == projectTypeArr.length - 1) {
              projectTypeFilterQuery += "</div></div>";
            }
          }
          if (isRoleDataLevelAccess) {
            $('.btn-toolbar.mb-2.mb-md-0.mx-2.page-filter').append(projectTypeFilterQuery);
          }



          // $("body").on('click', '#External', function (e) {
          //   FilterChoices = []
          //   // e.stopPropagation();
          //   typeClicked = 'External'
          //   $('.page-filter .dropdown-menu').find('[type="checkbox"][value="External"]').prop({
          //     "checked": true,
          //     "disabled": false
          //   });
          //   $('.page-filter .dropdown-menu').find('[type="checkbox"][value="Internal"]').prop({
          //     "checked": false,
          //     "disabled": false
          //   });


          //   //////////////////////
          //   $('.page-filter .dropdown-menu').each(function () { //looping through filters
          //     var selectedchoices = $(this).find('input:checked').map(function () { //getting selected choices
          //       if ($(this).attr('data-type') == 'floatpercentage')
          //         return $(this).val().replace(' %', '');
          //       if ($(this).attr('data-type') == 'money')
          //         return $(this).val().replaceAll(',', '');
          //       else
          //         return $(this).val();
          //     }).get();
          //     if (selectedchoices.length) //checking if there are choices
          //     {
          //       var internalName = $(this).find('input:checkbox').data("internal");
          //       var fieldType = $(this).find('input:checkbox').data("type");
          //       //handle date format for caml
          //       if (fieldType == 'date') {
          //         for (var t = 0; t < selectedchoices.length; t++) {
          //           // console.log(selectedchoices[t], 'selected choices')
          //           if (selectedchoices[t].indexOf('/') > -1) {
          //             // console.log('true here');
          //             // selectedchoices[t] = selectedchoices[t].split('/');
          //             // selectedchoices[t] = selectedchoices[t][2] + '-' + selectedchoices[t][1] + '-' + selectedchoices[t][0] + 'T00:00:00.000Z';
          //             var myDate = selectedchoices[t].split('T');
          //             var myDate2 = myDate[0].split('/');
          //             selectedchoices[t] = myDate2[2] + '-' + myDate2[1] + '-' + myDate2[0] + 'T' + myDate[1] + '.000Z';
          //             // var timezone = selectedchoices[t].split(':::')[1];
          //             // selectedchoices[t] = selectedchoices[t].split('<span')[0].split('/');
          //             // selectedchoices[t] = selectedchoices[t][2] + '-' + selectedchoices[t][1] + '-' + selectedchoices[t][0] + 'T00:00:00.000Z';
          //             // selectedchoices[t] = selectedchoices[t][2] + '-' + selectedchoices[t][1] + '-' + selectedchoices[t][0] + 'T' + timezone + ':00:00.000Z';
          //           }
          //         }
          //       }

          //       FilterChoices.push({
          //         internalName: internalName,
          //         Type: fieldType,
          //         Values: selectedchoices
          //       });

          //       ListingData.g.camlfilterbuilder();
          //     }
          //   });
          //   /////////////////////


          //   // var selectedchoices = $('.page-filter .dropdown-menu').find('[type="checkbox"][value="External"]:checked').map(function () { //getting selected choices
          //   //   if ($(this).attr('data-type') == 'floatpercentage')
          //   //     return $(this).val().replace(' %', '');
          //   //   if ($(this).attr('data-type') == 'money')
          //   //     return $(this).val().replaceAll(',', '');
          //   //   else
          //   //     return $(this).val();
          //   // }).get();

          //   // if (selectedchoices.length) {
          //   //   var internalName = $('.page-filter .dropdown-menu').find('[type="checkbox"][value="External"]').data("internal");
          //   //   var fieldType = $('.page-filter .dropdown-menu').find('[type="checkbox"][value="External"]').data("type");

          //   //   FilterChoices.push({
          //   //     internalName: internalName,
          //   //     Type: fieldType,
          //   //     Values: selectedchoices
          //   //   });

          //   //   ListingData.g.camlfilterbuilder();
          //   // }


          // })


          // $("body").on('click', '#Internal', function (e) {
          //   FilterChoices = []
          //   typeClicked = 'Internal'
          //   // e.stopPropagation();

          //   $('.page-filter .dropdown-menu').find('[type="checkbox"][value="Internal"]').prop({
          //     "checked": true,
          //     "disabled": false
          //   });
          //   $('.page-filter .dropdown-menu').find('[type="checkbox"][value="External"]').prop({
          //     "checked": false,
          //     "disabled": false
          //   });


          //   /////////////////////////
          //   $('.page-filter .dropdown-menu').each(function () { //looping through filters
          //     var selectedchoices = $(this).find('input:checked').map(function () { //getting selected choices
          //       if ($(this).attr('data-type') == 'floatpercentage')
          //         return $(this).val().replace(' %', '');
          //       if ($(this).attr('data-type') == 'money')
          //         return $(this).val().replaceAll(',', '');
          //       else
          //         return $(this).val();
          //     }).get();
          //     if (selectedchoices.length) //checking if there are choices
          //     {
          //       var internalName = $(this).find('input:checkbox').data("internal");
          //       var fieldType = $(this).find('input:checkbox').data("type");
          //       //handle date format for caml
          //       if (fieldType == 'date') {
          //         for (var t = 0; t < selectedchoices.length; t++) {
          //           // console.log(selectedchoices[t], 'selected choices')
          //           if (selectedchoices[t].indexOf('/') > -1) {
          //             // console.log('true here');
          //             // selectedchoices[t] = selectedchoices[t].split('/');
          //             // selectedchoices[t] = selectedchoices[t][2] + '-' + selectedchoices[t][1] + '-' + selectedchoices[t][0] + 'T00:00:00.000Z';
          //             var myDate = selectedchoices[t].split('T');
          //             var myDate2 = myDate[0].split('/');
          //             selectedchoices[t] = myDate2[2] + '-' + myDate2[1] + '-' + myDate2[0] + 'T' + myDate[1] + '.000Z';
          //             // var timezone = selectedchoices[t].split(':::')[1];
          //             // selectedchoices[t] = selectedchoices[t].split('<span')[0].split('/');
          //             // selectedchoices[t] = selectedchoices[t][2] + '-' + selectedchoices[t][1] + '-' + selectedchoices[t][0] + 'T00:00:00.000Z';
          //             // selectedchoices[t] = selectedchoices[t][2] + '-' + selectedchoices[t][1] + '-' + selectedchoices[t][0] + 'T' + timezone + ':00:00.000Z';
          //           }
          //         }
          //       }

          //       FilterChoices.push({
          //         internalName: internalName,
          //         Type: fieldType,
          //         Values: selectedchoices
          //       });

          //       ListingData.g.camlfilterbuilder();
          //     }
          //   });
          //   ////////////////////////

          //   // var selectedchoices = $('.page-filter .dropdown-menu').find('[type="checkbox"][value="Internal"]:checked').map(function () { //getting selected choices
          //   //   if ($(this).attr('data-type') == 'floatpercentage')
          //   //     return $(this).val().replace(' %', '');
          //   //   if ($(this).attr('data-type') == 'money')
          //   //     return $(this).val().replaceAll(',', '');
          //   //   else
          //   //     return $(this).val();
          //   // }).get();

          //   // if (selectedchoices.length) {
          //   //   var internalName = $('.page-filter .dropdown-menu').find('[type="checkbox"][value="Internal"]').data("internal");
          //   //   var fieldType = $('.page-filter .dropdown-menu').find('[type="checkbox"][value="Internal"]').data("type");

          //   //   FilterChoices.push({
          //   //     internalName: internalName,
          //   //     Type: fieldType,
          //   //     Values: selectedchoices
          //   //   });

          //   //   ListingData.g.camlfilterbuilder();
          //   // }


          // })
        }

        ///////////////////////////////////////////////////////

        if ($('.page-filter .dropdown-menu').find('input:checkbox:checked').length == 0) {
          $('#clearAllFilter').prop('disabled', true);
        }
        $('#clearAllFilter').on("click", function (e) {
          e.stopPropagation();
          if ($('.page-filter .dropdown-menu').find('input:checkbox:checked').length) { // add :not(#forQueryAccess) to avoid to uncheck the hide filter ForQueryFilter
            $('.page-filter .dropdown-menu:not(#forQueryAccess)').find('input:checkbox').prop({
              "checked": false,
              "disabled": true
            });
          }
          FilterChoices = [];

          if (isRoleDataLevelAccess) {
            FilterChoices = Array.from(dataLevelAccessChoicesForFilters);
          }

          ListingData.g.camlfilterbuilder();

          if ($('.page-filter .dropdown-menu').find('input:checkbox:checked').length == 0) {
            // $('.clearAllFilter').addClass('noOptionSelected');
            $('#clearAllFilter').prop('disabled', true);
          }
        });

        $('.dropdown-menu label input[type="checkbox"][value="' + No_Data + '"]').parent().remove();
        originalstate = false; //not in original state anymore
      }

    }
  }
}



//not used
var ProjectStages_Data_Request = {
  onSuccess: function (sender, args) {
    var collListItem = ProjectStages_Data_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      ProjectStages_Data_Request.g.StagesArray.push({
        stage: oListItem.get_item('Stage'),
        stageid: oListItem.get_id(),
      });
    }
    Stages_Data_Request.init();
  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('ProjectStages');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><Where><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name=\'ListSort\' Ascending=\'True\' /></OrderBy></Query></View>'); //<Where><Eq><FieldRef Name=\'ProjectCode\'/><Value Type="Text">'+peojectC+'</Value></Eq></Where>
    ProjectStages_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(ProjectStages_Data_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, ProjectStages_Data_Request.onSuccess),
      Function.createDelegate(this, ProjectStages_Data_Request.onError)
    );
  },
  // Global variables
  g: {
    StagesArray: [],

  }
};



window.Delegatepopup = {
  init: function (TID) {
    $('body').append('<div class="popupComment"><div class="wrapcomments">' +
      '<label><span data-trans-Commissioner class="Resources"></span></label>' +
      '<div class="PPField SPIField form-control" type="picker" id="AssignedTo" value="" INppicker=""></div>' +
      '<label><span data-trans-notes class="Resources"></span></label><textarea required class="SPIField form-control" id="DelegationReason" rows="4" cols="50"></textarea><div class="btn-cont"><button class=" btn btn-action" onclick="Delegate_Data_Submit.init(\'' + TID + '\')"><span data-trans-send class="Resources"></span></button><button onclick="$(\'.popupComment\').remove();" class=" btn btn-action"><span data-trans-cancelbutton class="Resources"></span></button><span style="display:none" class="successmsg"><span data-trans-submitsuccessMsg class="Resources"></span></span></div></div></div>'); //commentsub
    changeResources();
    $('body').append('<style>.sp-peoplepicker-initialHelpText {opacity:0}</style>');
    $('div[type=picker]').each(function () {
      var mp = new MyPeoplePicker();
      mp.init($(this).attr('id'), {
        PrincipalAccountType: 'User',
        AllowMultipleValues: false
      });
    });
    window.setTimeout(function () {
      $('.sp-peoplepicker-initialHelpText').text(enternameemail);
      $('body').append('<style>.sp-peoplepicker-initialHelpText {opacity:1!important}</style>');
    }, 777);
    $('body').append('<style>div.PPField * {direction: rtl;text-align:right}</style>');
  }
}

window.delegatedtaskcode,
  window.delegatedtaskname,
  window.delegatedtasktitle,
  window.taskstatus,
  window.taskOwner,
  window.Workflowname,
  window.WorkflowInstanceId,
  window.TaskType,
  window.SatgeName,
  window.StageID,
  window.SatgeIdApprove,
  window.SatgeIdReject,
  window.TaskRelatedUrl,
  window.RelatedItemId,
  window.TaskComment,
  window.RelatedItemTitle,
  window.delegateComment,
  window.ppp,
  window.ProjectCode,
  window.TaskDelegatedFrom;
window.assignedToGroup,
  window.userName,
  window.taskId;
// var assignedToGroup = ''
window.Delegate_Data_Submit = {
  onSuccess: function (sender, args) {
    var collListItem = Delegate_Data_Submit.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var currentItem = listItemEnum.get_current();
      currentId = currentItem.get_item("ID");
      delegatedtaskname = currentItem.get_item('Title');
      Workflowname = currentItem.get_item('WorkflowName');
      WorkflowInstanceId = currentItem.get_item('WFInstanceID');
      TaskType = currentItem.get_item('TaskType');
      SatgeName = currentItem.get_item('StageName');
      StageID = currentItem.get_item('StageID');
      SatgeIdApprove = currentItem.get_item('StageIDApprove');
      SatgeIdReject = currentItem.get_item('StageIDReject');
      TaskRelatedUrl = currentItem.get_item('RelatedURL');
      RelatedItemId = currentItem.get_item('RelatedItemID');
      TaskComment = currentItem.get_item('Body');
      RelatedItemTitle = currentItem.get_item('RelatedItemTitle');
      ProjectCode = currentItem.get_item('ProjectCode');
      TaskDelegatedFrom = currentItem.get_item('AssignedTo');


      if (Workflowname) {
        if (localStorage.getItem('Dynamo_Tasks Configuration') != null) {
          stages = JSON.parse(localStorage.getItem("Dynamo_Tasks Configuration") || "[]");
          stages = stages.filter(function (item) {
            return item.code == StageID
          });
          assignedToGroup = stages[0].group;
        }
      }
      // }
      if ($('#AssignedTo').find('span.sp-peoplepicker-userSpan').length) {
        var id = $('#AssignedTo').attr('id');
        ppp = ($('#AssignedTo').find('span.sp-peoplepicker-userSpan').attr('sid') == undefined) ? '' : SP.FieldUserValue.fromUser($('#AssignedTo').find('span.sp-peoplepicker-userSpan').attr('sid')); //.split('|').slice(-1)[0]
        taskOwner = ppp;
        userName = encodeURIComponent(ppp.get_lookupValue());
      }
      delegateComment = $('#DelegationReason').val();

      $('.errormsg').remove();
      $('.wrapcomments').addClass('was-validated');
      if ($('.was-validated .form-control:invalid').length == 0 && $('span.sp-peoplepicker-userSpan').length > 0) {
        userCalls.isMember(assignedToGroup, userName);
      } else {
        if (($('span.sp-peoplepicker-userSpan').length == 0)) {
          $('#AssignedTo').addClass('is-invalid');
        }
      }
    }
  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // The main Initialization function
  init: function (TID) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Tasks');
    var camlQuery = new SP.CamlQuery();
    taskId = parseInt(TID);
    camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Text">' + taskId + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>');
    Delegate_Data_Submit.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Delegate_Data_Submit.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Delegate_Data_Submit.onSuccess),
      Function.createDelegate(this, Delegate_Data_Submit.onError)
    );
  },
  // Global variables
  g: {}
};


window.addDelegatedTask = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Tasks');
    var itemCreateInfo = new SP.ListItemCreationInformation();
    addDelegatedTask.g.oListItem = oList.addItem(itemCreateInfo);

    addDelegatedTask.g.oListItem.set_item('Title', delegatedtaskname);
    addDelegatedTask.g.oListItem.set_item('WorkflowName', Workflowname);
    addDelegatedTask.g.oListItem.set_item('WFInstanceID', WorkflowInstanceId);
    addDelegatedTask.g.oListItem.set_item('TaskType', TaskType);
    addDelegatedTask.g.oListItem.set_item('StageName', SatgeName);
    addDelegatedTask.g.oListItem.set_item('StageIDApprove', SatgeIdApprove);
    addDelegatedTask.g.oListItem.set_item('StageID', StageID);
    addDelegatedTask.g.oListItem.set_item('StageIDReject', SatgeIdReject);
    addDelegatedTask.g.oListItem.set_item('RelatedURL', TaskRelatedUrl);
    addDelegatedTask.g.oListItem.set_item('RelatedItemID', RelatedItemId);
    addDelegatedTask.g.oListItem.set_item('Body', TaskComment);
    addDelegatedTask.g.oListItem.set_item('RelatedItemTitle', RelatedItemTitle);
    addDelegatedTask.g.oListItem.set_item('AssignedTo', ppp);
    addDelegatedTask.g.oListItem.set_item('ProjectCode', ProjectCode);
    addDelegatedTask.g.oListItem.set_item('DelegationReason', delegateComment);
    addDelegatedTask.g.oListItem.set_item('Status', 'Open');
    addDelegatedTask.g.oListItem.set_item('TaskDelegatedFrom', TaskDelegatedFrom);

    addDelegatedTask.g.oListItem.update();
    clientContext.load(addDelegatedTask.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        DeleteDelegate_Data_Submit.init(taskId);
      }),
      Function.createDelegate(this, function (sender, args) {
        var errormessage = 'Request failed. ' + args.get_message() + '\n' + args.get_stackTrace()
        console.log(errormessage);
      })
    );
  },
  g: {

  }
};

window.DeleteDelegate_Data_Submit = {
  init: function () {
    var context = SP.ClientContext.get_current();
    var dfd = $.Deferred();
    //Get list from host web
    var programList = context.get_web().get_lists().getByTitle('Tasks');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Text">' + taskId + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>');
    //Get items by Query
    var progColl = programList.getItems(camlQuery);
    //Load item collection
    context.load(progColl);
    context.executeQueryAsync(function () {
      var currentItemArray = [];
      //Check itemcollection count greater than 0
      if (progColl.get_count() > 0) {
        var progEnum = progColl.getEnumerator();
        while (progEnum.moveNext()) {
          var currentItem = progEnum.get_current();
          var currentId = currentItem.get_item("ID");
          //Get Item by current ID
          var items = programList.getItemById(currentId);
          items.set_item('Status', 'Closed');
          items.set_item('WFInstanceID', null);
          items.set_item('TakenAction', 'delegate');
          //Update the item
          items.update();
          //Push item on the array
          currentItemArray.push(items);
          //Load the item Array
          context.load(currentItemArray[currentItemArray.length - 1]);
        }
        context.executeQueryAsync(function () {
          //Item Updated sucess
          dfd.resolve();
          window.location.reload();
        }, function (sender, args) {
          //Item updated fail
          console.log("Request Failed to get projectlist Items :" + args.get_message());
        });
      } else {
        dfd.resolve();
      }
    },
      function (sender, args) {
        console.log("Request failed in List " + args.get_message());
      });
    return dfd.promise();
  }
}

/////////////////////////////////////////////////////////////////////////////////////

// to handle strategic objective status and color
var StrategicObjectives_Status_Listing = {
  init: function (value) {

    var status = ''
    var color = ''

    if (value && value != No_Data) {
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        status = Resources.ar[value]
      } else {
        status = Resources.en[value]
      }


      color = `startegicobj${value}`
    } else {
      status = No_Data
    }


    return {
      status: status,
      classname: color
    }
  }
}