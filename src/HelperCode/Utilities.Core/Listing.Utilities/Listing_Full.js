if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
    var No_Data = 'لا يوجد'
} else {
    var No_Data = 'Not Found'
}
var CentralSite = "",
    PCODE = '',
    SP_ListName, JSON_File_Name, PageTitle, Query, listkey, PCODE_STRING = '',
    istasks = false,
    RelatedURL, NIssues = 0,
    NRisks = 0;
listkey = window.location.href.split('ListKey=')[1].split('&')[0];
for (var i = 0; i < ListArray.length; i++) {
    var obj = ListArray[i];
    for (var key in obj) {
        if (key == window.location.href.split('ListKey=')[1].split('&')[0]) {
            SP_ListName = obj[key];
            PageTitle = obj['ListingTitle'];
        }
    }
}
// SP_ListName = ListArray[ window.location.href.split('ListKey=')[1].split('&')[0] ],
JSON_File_Name = window.location.href.split('ListKey=')[1].split('&')[0] + '_Listing.js';
if (listkey == 'tasks' && window.location.href.indexOf('PCODE') > -1) {
    istasks = true;
    PCODE = window.location.href.split('PCODE=')[1].replace(/%20/g, " ");
    PCODE_STRING = '&PCODE=' + PCODE;
    Query = '<Where> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or></Where>';
} else if (listkey == 'tasks') {
    istasks = true;
    Query = '<Where> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or></Where>';
} else if (window.location.href.indexOf('PCODE') > -1) {
    PCODE = window.location.href.split('PCODE=')[1].replace(/%20/g, " ");
    PCODE_STRING = '&PCODE=' + PCODE;
    Query = '<View><Query><Where><Eq><FieldRef Name="Project" /><Value Type="Text">' + PCODE + '</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>';
} else {
    Query = '<View><Query><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>';
}



//
function myFunction() {
    var searchInput, filter, filterColumn, span, multiselectText, i, txtValue;
    searchInput = document.getElementById("searchInput");
    filter = searchInput.value.toUpperCase();
    var itemsArray = document.getElementsByClassName('items');
    for (i = 0; i < itemsArray.length; i++) {
        if ($(".items").find("span." + filter).length > 0) {
            itemsArray[i].style.display = "";
        } else {
            itemsArray[i].style.display = "none";
        }
    }
}

window.sphttp = {
        get: function(listUrl, listDisplayName, camelQuery, internalFieldNames, onEach, onError) {

            var clientContext = new SP.ClientContext(listUrl);
            var oList = clientContext.get_web().get_lists().getByTitle(listDisplayName);
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml(camelQuery);
            var itemsEnumerable = oList.getItems(camlQuery);
            clientContext.load(itemsEnumerable);
            clientContext.executeQueryAsync(
                Function.createDelegate(this,
                    function(sender, args) {
                        var listItemEnum = itemsEnumerable.getEnumerator();
                        window.records = [];
                        window.RecordsWithID = [];
                        var RecordsWithNames = [];
                        var fieldType = [];
                        var userid
                        var usergrp
                        while (listItemEnum.moveNext()) {
                            var oListItem = listItemEnum.get_current();
                            var record = {};
                            if (istasks) {
                                userid = (oListItem.get_item('AssignedTo')) ? oListItem.get_item('AssignedTo').get_lookupId() : '';
                                usergrp = (oListItem.get_item('AssignedTo')) ? oListItem.get_item('AssignedTo').get_lookupValue() : '';
                            }
                            if (istasks) {
                                if (oListItem.get_item('Status') == 'Open') {
                                    if (PCODE && PCODE == oListItem.get_item('ProjectCode')) {
                                        if (internalFieldNames && internalFieldNames.length > 0) {
                                            for (var i = 0; i < internalFieldNames.length; i++) {
                                                if (internalFieldNames[i] = Listing_Info[i].InternalName) {
                                                    if (Listing_Info[i].type == "date") {
                                                        var d = (oListItem.get_item(internalFieldNames[i]) == null) ? 'empty' : oListItem.get_item(internalFieldNames[i]);
                                                        var datetouse2;
                                                        if (d != "empty") {
                                                            var local = d.getTime();
                                                            var offset = d.getTimezoneOffset() * (60 * 1000);
                                                            var utc = new Date(local + offset);
                                                            var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
                                                            var datetouse = riyadh.toLocaleString("en-US").split(',')[0].split('/');
                                                            datetouse2 = datetouse[1] + '/' + datetouse[0] + '/' + datetouse[2];
                                                            //console.log(riyadh.toLocaleString("en-US").split(',')[0]);
                                                            //console.log(oListItem.get_item(internalFieldNames[i]));
                                                        }
                                                        record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : datetouse2;
                                                    } else
                                                        record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]);
                                                }
                                            }
                                            if (!istasks) {
                                                RecordsWithID.push({
                                                    record: record,
                                                    ID: oListItem.get_id()
                                                });
                                            } else {
                                                RecordsWithID.push({
                                                    record: record,
                                                    ID: oListItem.get_id(),
                                                    tasktype: oListItem.get_item('TaskType'),
                                                    nxtstage: oListItem.get_item('StageIDApprove'),
                                                    prvstage: oListItem.get_item('StageIDReject'),
                                                    stageid: oListItem.get_item('StageID')
                                                });
                                            }

                                            records.push(record);
                                            onEach(records, record, oListItem, false); //false if having item
                                        }
                                    } else {
                                        if (internalFieldNames && internalFieldNames.length > 0) {
                                            for (var i = 0; i < internalFieldNames.length; i++) {
                                                if (internalFieldNames[i] = Listing_Info[i].InternalName) {
                                                    if (Listing_Info[i].type == "date") {
                                                        var d = (oListItem.get_item(internalFieldNames[i]) == null) ? 'empty' : oListItem.get_item(internalFieldNames[i]);
                                                        var datetouse2;
                                                        if (d != "empty") {
                                                            var local = d.getTime();
                                                            var offset = d.getTimezoneOffset() * (60 * 1000);
                                                            var utc = new Date(local + offset);
                                                            var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
                                                            var datetouse = riyadh.toLocaleString("en-US").split(',')[0].split('/');
                                                            datetouse2 = datetouse[1] + '/' + datetouse[0] + '/' + datetouse[2];
                                                            //console.log(riyadh.toLocaleString("en-US").split(',')[0]);
                                                            //console.log(oListItem.get_item(internalFieldNames[i]));
                                                        }
                                                        record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : datetouse2;
                                                    } else
                                                        record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]);
                                                }
                                            }
                                            if (!istasks) {
                                                RecordsWithID.push({
                                                    record: record,
                                                    ID: oListItem.get_id()
                                                });
                                            } else {
                                                RecordsWithID.push({
                                                    record: record,
                                                    ID: oListItem.get_id(),
                                                    tasktype: oListItem.get_item('TaskType'),
                                                    nxtstage: oListItem.get_item('StageIDApprove'),
                                                    prvstage: oListItem.get_item('StageIDReject'),
                                                    stageid: oListItem.get_item('StageID')
                                                });
                                            }

                                            records.push(record);
                                            onEach(records, record, oListItem, false); //false if having item
                                        }
                                    }
                                }



                            } else {
                                if (internalFieldNames && internalFieldNames.length > 0) {
                                    for (var i = 0; i < internalFieldNames.length; i++) {
                                        if (internalFieldNames[i] = Listing_Info[i].InternalName) {
                                            if (Listing_Info[i].type == "date") {
                                                var d = (oListItem.get_item(internalFieldNames[i]) == null) ? 'empty' : oListItem.get_item(internalFieldNames[i]);
                                                var datetouse2;
                                                if (d != "empty") {
                                                    var local = d.getTime();
                                                    var offset = d.getTimezoneOffset() * (60 * 1000);
                                                    var utc = new Date(local + offset);
                                                    var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
                                                    var datetouse = riyadh.toLocaleString("en-US").split(',')[0].split('/');
                                                    datetouse2 = datetouse[1] + '/' + datetouse[0] + '/' + datetouse[2];
                                                    //console.log(riyadh.toLocaleString("en-US").split(',')[0]);
                                                    //console.log(oListItem.get_item(internalFieldNames[i]));
                                                }
                                                record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : datetouse2;
                                            } else
                                                record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]);
                                        }
                                    }
                                    if (!istasks) {
                                        RecordsWithID.push({
                                            record: record,
                                            ID: oListItem.get_id()
                                        });
                                    } else {
                                        RecordsWithID.push({
                                            record: record,
                                            ID: oListItem.get_id(),
                                            tasktype: oListItem.get_item('TaskType'),
                                            nxtstage: oListItem.get_item('StageIDApprove'),
                                            prvstage: oListItem.get_item('StageIDReject'),
                                            stageid: oListItem.get_item('StageID')
                                        });
                                    }

                                    records.push(record);
                                    onEach(records, record, oListItem, false); //false if having item
                                }
                            }

                        }
                        onEach(records, null, null, true); //true if no more items					
                    }),
                Function.createDelegate(this, function(sender, args) {
                    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
                })
            )
        }
    }
    //
var Listing_Request = {
    preinit: function() {
        if ($('.Header-Sharakat').length) {
            clearInterval(checkStatusHtml);
            $('h2.DahsFormTitle').text(PageTitle);
            Listing_Project_Info_Request.g.clickbait();
            changeResources();
            Listing_Request.g.inputsearch();
            //get Listing's json
            $.getScript(_spPageContextInfo.webAbsoluteUrl + "/Style%20Library/spm/JSON/" + JSON_File_Name).done(function(script, textStatus) {
                window.IN = Listing_Info.map(a => a.InternalName);
                window.DN = Listing_Info.map(a => a.DisplayName);
                window.FT = Listing_Info.map(a => a.fieldType);
                SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                    Listing_Request.init();
                    window.checkNotificationHTML = setInterval(function() {
                        GetProject_Info.preinit();
                    }, 1000);
                    ProjectStages_Data_Request.init();
                    Stages_Data_Request.init();
                });
            });

        }
    },
    init: function() {
        sphttp.get('/sites/SPM/' + CentralSite, SP_ListName, Query, IN, function(records, record, listItem, isDone) {

            if (isDone) {
                var DisplayNameArray = Listing_Info.map(a => a.DisplayName);
                var ItemType = Listing_Info.map(a => a.fieldType);
                //console.log('ItemType',ItemType);
                var filterDiv = document.getElementById('filterColumn');
                // var sortBy = document.getElementById('sortBy');	
                var sortByOpt = "";
                //console.log(records);
                $(document).ready(function() {
                    var html = '';
                    for (var i = 0; i < records.length; i++) {
                        //console.log('records',records);
                        var obj = records[i];

                        html += "<div class='items TaskDetails'>";
                        for (var key in obj) {
                            //Getting Display Name
                            var Field_In_Use = Listing_Info.filter(function(el) {
                                return el.InternalName === key;
                            });
                            ///
                            html += '<div data-taskid="' + RecordsWithID[i].ID + '" data-stageid="' + RecordsWithID[i].stageid + '" data-task="' + RecordsWithID[i].tasktype + '" data-nxtstage="' + RecordsWithID[i].nxtstage + '" data-prvstage="' + RecordsWithID[i].prvstage + '" data-type="' + Field_In_Use[0].type + '" class="ItemField ' + key + '"><label class=' + key + '> ' + Field_In_Use[0].DisplayName + ':</label>' + '<span class="ItemValue ' + key + '" >' + obj[key] + '</span></div>';
                        }
                        html += "</div>";
                    }
                    document.getElementById("linkInfo").innerHTML += html;
                    //console.log('DisplayNameArray',DisplayNameArray);

                    for (var i = 0; i < Listing_Info.length; i++) {

                        var selectFilter = document.createElement("SELECT");
                        selectFilter.setAttribute("id", Listing_Info[i].InternalName);
                        selectFilter.setAttribute("multiple", "multiple");
                        var nameArray = records.map(function(d) { return d["", Listing_Info[i].InternalName]; });
                        window.selectedOptionsArray = [];
                        for (item in nameArray) {
                            if (nameArray[item] != null) {
                                selectFilter.add(new Option(nameArray[item], nameArray[item]));
                            }
                        }

                        filterDiv.appendChild(selectFilter);
                        sortByOpt += '<option value=' + Listing_Info[i].InternalName + '>' + Listing_Info[i].DisplayName + '</option>';
                        // On change									
                        //remove duplicates	
                        var map = {};
                        $('select#' + Listing_Info[i].InternalName + ' option').each(function() {
                            if (map[this.value]) {
                                $(this).remove()
                            }
                            map[this.value] = true;
                        });
                        //		
                        if ($('button.filter').length == 0)
                            $('.filterSelect').append('<button type="button" class="filter" onclick="clearfilter()">Choose Data</button>');
                        $('select#' + Listing_Info[i].InternalName).multiselect({
                            nonSelectedText: '' + Listing_Info[i].DisplayName,
                            onChange: function(option, checked, select) {
                                var opselected = $(option).val().toLowerCase();
                                //console.log(opselected);
                                var IDofSelectedOption = $(option).closest('.multiselect-native-select').find('>select').attr('id');
                                //
                                //console.log(IDofSelectedOption);			  
                                if (checked) {
                                    $(option).not(this).prop('checked', false);
                                    //check if multi selection
                                    if (selectedOptionsArray.filter(function(e) { return e.IDofSelectedOption === IDofSelectedOption; }).length > 0) {
                                        var sindex = selectedOptionsArray.map(function(e) { return e.IDofSelectedOption; }).indexOf(IDofSelectedOption);
                                        selectedOptionsArray[sindex].opselected = selectedOptionsArray[sindex].opselected + ':::' + opselected

                                    } else {
                                        selectedOptionsArray.push({
                                            opselected: opselected,
                                            IDofSelectedOption: IDofSelectedOption
                                        });
                                    }
                                }
                                //remove unchecked option 
                                else {
                                    //No need to check if it exists...
                                    var sindex = selectedOptionsArray.map(function(e) { return e.IDofSelectedOption; }).indexOf(IDofSelectedOption);
                                    if (selectedOptionsArray[sindex].opselected.indexOf(':::') >= 0) {

                                        selectedOptionsArray[sindex].opselected = selectedOptionsArray[sindex].opselected.replace(':::' + opselected, '');
                                        selectedOptionsArray[sindex].opselected = selectedOptionsArray[sindex].opselected.replace(opselected + ':::', '');

                                    } else {
                                        //   var oindex = selectedOptionsArray.indexOf(opselected.toLowerCase());
                                        var oindex = selectedOptionsArray.map(function(e) { return e.opselected; }).indexOf(opselected);
                                        selectedOptionsArray.splice(oindex, 1);
                                        //   selectedOptionsArray = selectedOptionsArray.filter(function( obj ) {
                                        // 	return obj.opselected !== 'money';
                                        // });
                                    }
                                }
                                var values = [];
                                //main filter
                                $('select').parent().find('button.multiselect.MainFilter').removeClass('MainFilter fas fa-filter');
                                for (var j = 0; j < selectedOptionsArray.length; j++) {


                                    $('select#' + selectedOptionsArray[j].IDofSelectedOption).parent().find('button.multiselect').addClass('MainFilter fas fa-filter');
                                    var value = selectedOptionsArray[j].opselected;
                                    var valueID = selectedOptionsArray[j].IDofSelectedOption;
                                    values.push({
                                        value: value,
                                        valueID: valueID
                                    });
                                }
                                // console.log('values', values);
                                $('.items').hide();

                                $('.items').each(function() {
                                    var combination = false;
                                    ///////////Hiding based on text
                                    for (var k = 0; k < values.length; k++) {

                                        if (values[k].value.indexOf(':::') >= 0) {
                                            var allvalues = values[k].value.split(':::');
                                            for (var j = 0; j < allvalues.length; j++) {
                                                if ($(this).find('.ItemField.' + values[k].valueID + '').text().toLowerCase().indexOf(allvalues[j]) > -1) {
                                                    combination = true;
                                                    break;
                                                } else {
                                                    combination = false;

                                                }
                                                if (j == allvalues.length - 1 && combination == false)
                                                    return;
                                            }

                                        } else {

                                            if ($(this).find('.ItemField.' + values[k].valueID + '').text().toLowerCase().indexOf(values[k].value) > -1) {
                                                combination = true;
                                            } else {
                                                combination = false;
                                                return;
                                            }

                                        }

                                    }
                                    if (combination)
                                        $(this).css("display", "flex");
                                });
                                //console.log('selectedOptionsArray',selectedOptionsArray);


                                $('.items.TaskDetails:visible span.ItemValue').each(function() {
                                    var fieldname = $(this).attr('class').split('ItemValue ')[1];
                                    var fieldvalue = $(this).text();

                                    if (IDofSelectedOption != fieldname) {
                                        $('input[type=checkbox][name="' + fieldname + '"]:not([value="' + fieldvalue + '"])').closest('li').hide();
                                        // console.log(IDofSelectedOption,fieldname)
                                    }

                                });
                                $('.items.TaskDetails:visible span.ItemValue').each(function() {
                                    var fieldname = $(this).attr('class').split('ItemValue ')[1];
                                    var fieldvalue = $(this).text();
                                    if (IDofSelectedOption != fieldname)
                                        $('input[type=checkbox][name="' + fieldname + '"][value="' + fieldvalue + '"]').closest('li').show();
                                });
                                if (selectedOptionsArray.length == 0) {
                                    $(".items").css("display", "flex");
                                    $('input[type=checkbox]').closest('li').show();
                                    $('button.multiselect').removeClass('MainFilter');
                                }
                            }

                        });
                    }
                    $('#sortBy').append(sortByOpt);
                    //console.log('sortByDiv',sortByDiv);			
                    // var listForRemove = [];
                    // var listOfUniqe = [];
                    // $('.multiselect-container.dropdown-menu li').each(function () {
                    //   var text = $(this).text().trim();
                    //   if (listOfUniqe.indexOf(text) === -1)
                    // 	listOfUniqe.push(text);
                    //   else
                    // 	listForRemove.push($(this));
                    // });
                    // $(listForRemove).each(function () { $(this).remove(); });				
                    function sortArray() {
                        document.getElementById("linkInfo").innerHTML = "";
                        var sortByDropdown = document.getElementById("sortBy");
                        var selectedsortBy = sortByDropdown.options[sortByDropdown.selectedIndex].value;
                        var AscenDesenDropdown = document.getElementById("AscenDesen");
                        var selectedAscenDesen = AscenDesenDropdown.options[AscenDesenDropdown.selectedIndex].value;
                        if (!selectedAscenDesen) { selectedAscenDesen = "ascending"; }
                        if (selectedAscenDesen == "ascending") {
                            for (var i = 0; i < records.length; i++) {
                                var obj = records[i];
                                //for (var key in obj) {
                                for (var v = 0; v < obj.length; v++) {
                                    if (key = Listing_Info[i].InternalName) {
                                        if (Listing_Info[i].type == "date") {
                                            records.sort((date1, date2) => {
                                                // console.log(date1[Listing_Info[i].InternalName]);
                                                date1 = date1[Listing_Info[i].InternalName].split('-'), date2 = date2[Listing_Info[i].InternalName].split('-');
                                                let day1 = parseInt(date1[0]);
                                                let day2 = parseInt(date2[0]);
                                                let month1 = parseInt(date1[1]);
                                                let month2 = parseInt(date2[1]);
                                                let year1 = parseInt(date1[2]);
                                                let year2 = parseInt(date2[2]);
                                                if (year1 !== year2) {
                                                    return year1 - year2;
                                                } else if (month1 !== month2) {
                                                    return month1 - month2;
                                                } else {
                                                    return day1 - day2;
                                                }
                                            })
                                        }

                                    }
                                }
                            }
                            var propComparator = (propName) => (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;
                            records.sort(propComparator('' + selectedsortBy));
                        } else {
                            for (var i = 0; i < records.length; i++) {
                                var obj = records[i];
                                //for (var key in obj) {
                                for (var v = 0; v < obj.length; v++) {
                                    if (key = Listing_Info[i].InternalName) {
                                        if (Listing_Info[i].type == "date") {
                                            records.sort((date1, date2) => {
                                                date1 = date1[Listing_Info[i].InternalName].split('-'), date2 = date2[Listing_Info[i].InternalName].split('-');
                                                let day1 = parseInt(date1[0]);
                                                let day2 = parseInt(date2[0]);
                                                let month1 = parseInt(date1[1]);
                                                let month2 = parseInt(date2[1]);
                                                let year1 = parseInt(date1[2]);
                                                let year2 = parseInt(date2[2]);
                                                if (year1 !== year2) {
                                                    return year1 - year2;
                                                } else if (month1 !== month2) {
                                                    return month1 - month2;
                                                } else {
                                                    return day1 - day2;
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                            var propComparator = (propName) => (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? 1 : -1;
                            records.sort(propComparator('' + selectedsortBy));
                        }
                        for (var i = 0; i < records.length; i++) {
                            //console.log('records',records);
                            var obj = records[i];
                            //console.log('obj',obj);							
                            var html = "<div class='items TaskDetails'>";
                            for (var key in obj) {
                                //Getting Display Name
                                var Field_In_Use = Listing_Info.filter(function(el) {
                                    return el.InternalName === key;
                                });
                                ///
                                html += '<div data-type="' + Field_In_Use[0].fieldType + '" class="ItemField ' + key + '"><label class=' + key + '> ' + Field_In_Use[0].DisplayName + ':</label>' + '<span class="ItemValue ' + key + '" >' + obj[key] + '</span></div>';
                            }
                            html += "</div>";
                            document.getElementById("linkInfo").innerHTML += html;
                        }
                        if (!istasks) {
                            var i = 0;
                            $('.items.TaskDetails').each(function() {
                                var sText = $(this).find('.ItemField:first-child > span').text();
                                // console.log(sText);
                                $(this).find('.ItemField:first-child > span').html('<a href="/sites/SPM/SitePages/View.aspx?ListKey=' + listkey + '&IID=' + RecordsWithID[i].ID + PCODE_STRING + '">' + sText + '</a>');
                                // console.log(i);
                                i++;
                            });
                        } else {
                            var i = 0;
                            $('.items.TaskDetails').each(function() {
                                var sText = $(this).find('.ItemField:first-child > span').text();
                                // console.log(sText);
                                $(this).find('.ItemField:first-child > span').html('<a href="javascript:;" onclick="Listing_Request.g.handleids(' +
                                    '$(this).closest(\'[data-task]\').attr(\'data-task\'),' +
                                    '$(this).closest(\'[data-taskid]\').attr(\'data-taskid\'),' +
                                    '$(this).closest(\'[data-nxtstage]\').attr(\'data-nxtstage\'),' +
                                    '$(this).closest(\'[data-prvstage]\').attr(\'data-prvstage\'),' +
                                    '$(this).closest(\'[data-stageid]\').attr(\'data-stageid\')' +
                                    ')">' + sText + '</a>');
                                // console.log(i);
                                i++;
                            });
                        }


                        //console.log('records',records);
                    }
                    if (!istasks) {
                        var i = 0;
                        $('.items.TaskDetails').each(function() {
                            var sText = $(this).find('.ItemField:first-child > span').text();
                            // console.log(sText);
                            $(this).find('.ItemField:first-child > span').html('<a href="' + _spPageContextInfo.webServerRelativeUrl + '/sites/SPM/SitePages/View.aspx?ListKey=' + listkey + '&IID=' + RecordsWithID[i].ID + PCODE_STRING + '">' + sText + '</a>');
                            // console.log(i);
                            i++;
                        });
                    } else {
                        var i = 0;
                        $('.items.TaskDetails').each(function() {
                            var sText = $(this).find('.ItemField:first-child > span').text();
                            // console.log(sText);
                            $(this).find('.ItemField:first-child > span').html('<a href="javascript:;" onclick="Listing_Request.g.handleids(' +
                                '$(this).closest(\'[data-task]\').attr(\'data-task\'),' +
                                '$(this).closest(\'[data-taskid]\').attr(\'data-taskid\'),' +
                                '$(this).closest(\'[data-nxtstage]\').attr(\'data-nxtstage\'),' +
                                '$(this).closest(\'[data-prvstage]\').attr(\'data-prvstage\'),' +
                                '$(this).closest(\'[data-stageid]\').attr(\'data-stageid\')' +
                                ')">' + sText + '</a>');
                            // console.log(i);
                            i++;
                        });
                    }
                    $("#sortBy").change(sortArray);
                    $("#AscenDesen").change(sortArray);
                    $(".multiselect-native-select .btn-group").css("margin-bottom", "0px");
                    $(".multiselect.dropdown-menu").click(function() {
                        var marginHeight = $(".btn-group.show .multiselect-container.dropdown-menu.show").height();
                        $(this).parent().css("margin-bottom", "" + marginHeight + "px");
                    });
                    Listing_Project_Info_Request.g.clickbait();
                    changeResources();
                    $('.loader-box').fadeOut();
                });
            }
        });
    },
    g: {
        inputsearch: function() {
            $("#myInput").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $("div#linkInfo .items").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        },
        popup_configurator: function(type, nxtstage, prvstage, stageid, url, taskid) {
            switch (type) {
                case 'Approval':
                    $('body').append('<div class="pop-overlay">' +
                        '<div class="taskpopup">' +
                        '<div class="pop-url">' +
                        '<a href="' + url + '" >' + url + '</a>' +
                        '</div>' +
                        '<div class="pop-comments">' +
                        '<textarea class="pop-description"></textarea>' +
                        '</div>' +
                        '<div class="pop-buttons">' +
                        '<button onclick="BulkEdit(' + stageid + ',' + nxtstage + ',' + prvstage + ', true,' + taskid + ')" class="pop-green" type="button">Approve</button>' +
                        '<button onclick="BulkEdit(' + stageid + ',' + nxtstage + ',' + prvstage + ', false,' + taskid + ')" class="pop-red" type="button">Reject</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                    // console.log('1');
                    break;
                case 'Submit':
                    $('body').append('<div class="pop-overlay">' +
                        '<div class="taskpopup">' +
                        '<div class="pop-url">' +
                        '<a href="' + url + '" >' + url + '</a>' +
                        '</div>' +
                        '<div class="pop-comments">' +
                        '<textarea class="pop-description"></textarea>' +
                        '</div>' +
                        '<div class="pop-buttons">' +
                        '<button onclick="BulkEdit(' + stageid + ',' + nxtstage + ',' + prvstage + ', true,' + taskid + ')" class="pop-green" type="button">Submit</button>' +
                        '<button onclick="Stage_Data_Submit.g.Cancel()" class="pop-red" type="button">Cancel</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                    // console.log('2');
                    break;
                case 'SubmitField':
                    $('body').append('<div class="pop-overlay">' +
                        '<div class="taskpopup">' +
                        '<div class="pop-field">' +
                        '<div class="PPField SPCField form-control" type="picker" id="pfield" value="" placeholder="Project Manager" INppicker="ProjectManager"></div>' +
                        '</div>' +
                        '<div class="pop-comments">' +
                        '<textarea class="pop-description"></textarea>' +
                        '</div>' +
                        '<div class="pop-buttons">' +
                        '<button onclick="PM_BulkEdit.preinit(' + stageid + ',' + nxtstage + ',' + prvstage + ', true,' + taskid + ')" class="pop-green" type="button">Submit</button>' +
                        '<button onclick="Stage_Data_Submit.g.Cancel()" class="pop-red" type="button">Cancel</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                    $.getScript(_spPageContextInfo.webAbsoluteUrl + "/Style%20Library/spm/JS/PPicker.js").done(function(script, textStatus) {
                        $('div[type=picker]').each(function() {
                            var mp = new MyPeoplePicker();
                            mp.init($(this).attr('id'), { AllowMultipleValues: false });
                        });
                    });
                    // console.log('SubmitField');
                    break;
            }
        },
        handleids: function(type, taskid, nxtstage, prvstage, stageid) {
            // console.log(type, taskid, nxtstage, prvstage, stageid);
            var curstage_org = Stages_Data_Request.g.StagesArray.filter(function(obj) {
                return obj.stageid == stageid;
            });
            // console.log(curstage_org);
            var curstage_org_nxt = Stages_Data_Request.g.StagesArray.filter(function(obj) {
                return obj.stageid == nxtstage;
            });
            var curstage_org_prv = Stages_Data_Request.g.StagesArray.filter(function(obj) {
                return obj.stageid == prvstage;
            });
            var curstage = ProjectStages_Data_Request.g.StagesArray.filter(function(obj) {
                return obj.stage == curstage_org[0].stage;
            });
            var curstage_nxt = ProjectStages_Data_Request.g.StagesArray.filter(function(obj) {
                return obj.stage == curstage_org_nxt[0].stage;
            });
            var curstage_prv = ProjectStages_Data_Request.g.StagesArray.filter(function(obj) {
                return obj.stage == curstage_org_prv[0].stage;
            });
            Listing_Request.g.popup_configurator(
                type,
                curstage_nxt[0].stageid,
                curstage_prv[0].stageid,
                curstage[0].stageid,
                curstage_org[0].relatedURL,
                taskid
            );
        }
    }
}

var checkStatusHtml = setInterval(function() {
    Listing_Request.preinit();
}, 1000);
//phases-stages
var ProjectStages_Data_Request = {
    onSuccess: function(sender, args) {
        var collListItem = ProjectStages_Data_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            ProjectStages_Data_Request.g.StagesArray.push({
                stage: oListItem.get_item('Stage'),
                stageid: oListItem.get_id(),
            });
        }

    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Project Stages');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'ProjectCode\'/><Value Type="Text">' + PCODE + '</Value></Eq></Where><OrderBy><FieldRef Name=\'ListSort\' Ascending=\'True\' /></OrderBy></Query></View>');
        ProjectStages_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(ProjectStages_Data_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, ProjectStages_Data_Request.onSuccess),
            Function.createDelegate(this, ProjectStages_Data_Request.onError)
        );
    },
    // Global variables
    g: {
        StagesArray: []
    }
};
var Stages_Data_Request = {
    onSuccess: function(sender, args) {
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
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // The main Initialization function
    init: function() {
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
//end phases-stages
var PM_BulkEdit = {
    preinit: function(stageid, nxtstage, prvstage, state, taskid) {
        if ($('span.sp-peoplepicker-userSpan').length) {
            PM_BulkEdit.init(stageid, nxtstage, prvstage, state, taskid);
        } else {
            $('.pop-buttons').append('<p class="errormsg">Please fill above info</p>');
        }
    },
    init: function(stageid, nxtstage, prvstage, state, taskid) {
        var context = SP.ClientContext.get_current();
        var dfd = $.Deferred();
        //Get list from host web   
        var programList = context.get_web().get_lists().getByTitle(ListArray[0].projects);
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>" + PCODE + "</Value></Eq></Where></Query></View>");
        //Get items by Query  
        var progColl = programList.getItems(camlQuery);
        //Load item collection  
        context.load(progColl);
        context.executeQueryAsync(function() {
                var currentItemArray = [];
                //Check itemcollection count greater than 0  
                if (progColl.get_count() > 0) {
                    var progEnum = progColl.getEnumerator();
                    while (progEnum.moveNext()) {
                        var currentItem = progEnum.get_current();
                        var progTitle = currentItem.get_item("Title");
                        var currentId = currentItem.get_item("ID");
                        // console.log(currentId);
                        //Get Item by current ID  
                        var items = programList.getItemById(currentId);
                        //set 
                        if ($('span.sp-peoplepicker-userSpan').length) {
                            var ppp = ($('span.sp-peoplepicker-userSpan').attr('sid') == undefined) ? '' : SP.FieldUserValue.fromUser($('span.sp-peoplepicker-userSpan').attr('sid')); //.split('|').slice(-1)[0]
                            items.set_item('ProjectManager', ppp);
                        }
                        //Update the item  
                        items.update();
                        //Push item on the array  
                        currentItemArray.push(items);
                        //Load the item Array  
                        context.load(currentItemArray[currentItemArray.length - 1]);
                    }
                    context.executeQueryAsync(function() {
                        //Item Updated sucess  
                        // console.log("Items are updated Successfully");
                        dfd.resolve();
                        BulkEdit(stageid, nxtstage, prvstage, state, taskid);

                    }, function(sender, args) {
                        //Item updated fail  
                        console.log("Request Failed to get  Items :" + args.get_message());
                    });
                } else {
                    dfd.resolve();
                }
            },
            function(sender, args) {
                $('.loader').hide();
                console.log("Request failed in  List " + args.get_message());
            });
        return dfd.promise();
    }
}

function BulkEdit(stageid, nxtstage, prvstage, state, taskid) {
    var context = SP.ClientContext.get_current();
    var dfd = $.Deferred();
    //Get list from host web   
    var programList = context.get_web().get_lists().getByTitle('Project Stages');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query><Where> <In> <FieldRef Name='ID' /> <Values> <Value Type='Integer'>" + stageid + "</Value> <Value Type='Integer'>" + nxtstage + "</Value> <Value Type='Integer'>" + prvstage + "</Value> </Values> </In></Where></Query></View>");
    //Get items by Query  
    var progColl = programList.getItems(camlQuery);
    //Load item collection  
    context.load(progColl);
    context.executeQueryAsync(function() {
            var currentItemArray = [];
            //Check itemcollection count greater than 0  
            if (progColl.get_count() > 0) {
                var progEnum = progColl.getEnumerator();
                while (progEnum.moveNext()) {
                    var currentItem = progEnum.get_current();
                    var progTitle = currentItem.get_item("Title");
                    var currentId = currentItem.get_item("ID");
                    // console.log(currentId);
                    //Get Item by current ID  
                    var items = programList.getItemById(currentId);
                    //set 
                    if (currentId == stageid) {
                        items.set_item("Decision", false);
                        items.set_item("Comments", $('textarea.pop-description').val());
                    } else if (state && currentId == nxtstage)
                        items.set_item("Decision", true);
                    else if (!state && currentId == prvstage)
                        items.set_item("Decision", true);
                    //Update the item  
                    items.update();
                    //Push item on the array  
                    currentItemArray.push(items);
                    //Load the item Array  
                    context.load(currentItemArray[currentItemArray.length - 1]);
                }
                context.executeQueryAsync(function() {
                    //Item Updated sucess  
                    // console.log("Items are updated Successfully");
                    dfd.resolve();
                    Task_Edit_Data.init(taskid);

                }, function(sender, args) {
                    //Item updated fail  
                    console.log("Request Failed to get projectlist Items :" + args.get_message());
                });
            } else {
                dfd.resolve();
            }
        },
        function(sender, args) {
            $('.loader').hide();
            console.log("Request failed in Portfolio List " + args.get_message());
        });
    return dfd.promise();
}
var Task_Edit_Data = {

    init: function(taskid) {

        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Tasks');
        Task_Edit_Data.g.oListItem = oList.getItemById(taskid); //declared inside object scope only

        Task_Edit_Data.g.oListItem.set_item('Status', 'Closed');
        Task_Edit_Data.g.oListItem.set_item('WFInstanceID', null);
        Task_Edit_Data.g.oListItem.set_item('Body', $('textarea.pop-description').val());
        Task_Edit_Data.g.oListItem.update();
        clientContext.load(Task_Edit_Data.g.oListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, function() {
                // console.log('successful');
                $('.errormsg').hide();
                location.reload();
            }),
            Function.createDelegate(this, function(sender, args) {
                console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            })
        );
    },
    g: {
        clickbait: function() {

        },
        Cancel: function() {

        }
    }
};
//
var Listing_Project_Info_Request = {
    onSuccess: function(sender, args) {
        var collListItem = Listing_Project_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();

        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            $('h2.DahsFormTitle').append(' للمشروع " ' + oListItem.get_item('Project_Name') + ' "');
            $('.HOMEPAGEPJ').attr('href', '/sites/SPM/' + oListItem.get_item('Title') + '/SitePages/ProjectDetails.aspx');
            window.isPMOwner = false;
            window.Code = oListItem.get_item('Title');
            window.PMID = oListItem.get_item('Project_Manager').get_lookupId();
            window.PortfolioCode = oListItem.get_item('Proftolio_Code');
        }
        if (PMID == UserN.Id || Groups.indexOf("Administrators for Project Web App") >= 0)
            isPMOwner = true;
        /* if(!isPMOwner)
			window.location = '/sites/SPM/sitepages/accessdenied.aspx'; */
        // PortInfoRequest.init();
        Listing_Project_Info_Request.g.clickbait();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ($('.Header-Sharakat').length) {
            clearInterval(checkStatusHtml);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                //
                Listing_Project_Info_Request.init();
            });
        }
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext('/sites/SPM');
        var oList = clientContext.get_web().get_lists().getByTitle('Project Information');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Title\'/><Value Type=\'Text\'>' + PCODE + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>');

        Listing_Project_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Listing_Project_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Listing_Project_Info_Request.onSuccess),
            Function.createDelegate(this, Listing_Project_Info_Request.onError)
        );
    },
    // Global variables
    g: {
        clickbait: function() {
            $('button.CSformSubmit').click(function() {
                window.location = '/sites/SPM/SitePages/New.aspx?ListKey=' + listkey + PCODE_STRING;
            })
        },
    }
};
var checkfilter = setInterval(function() {
    checkboxestoradio.preinit();
}, 500);
var checkboxestoradio = {

    preinit: function() {
        if ($('span.multiselect-native-select').length) {
            clearInterval(checkfilter);
            checkboxestoradio.init();
        }
    },
    // The main Initialization function
    init: function() {
        //checkbox to radio
        $('span.multiselect-native-select').each(function() {
            $(this).find('input[type=checkbox]').attr('name', $(this).find('>select').attr('id'));
        });
        // $("span.multiselect-native-select input:checkbox").on('click', function() {
        // 	// in the handler, 'this' refers to the box clicked on
        // 	var $box = $(this);
        // 	if ($box.is(":checked")) {

        // 	var group = "input:checkbox[name='" + $box.attr("name") + "']:checked";
        // 	$(group).click();
        // 	$(group).prop("checked", false);
        // 	$box.prop("checked", true);
        // 	$box.click();
        // 	} else {
        // 	$box.prop("checked", false);
        // 	$box.click();
        // 	}
        // });
    },
};

function clearfilter() {
    selectedOptionsArray = [];
    $('input#myInput').val('').keyup();
    $('span.multiselect-native-select select').multiselect('deselectAll', false);

    $(":checkbox").attr("checked", false);
    // $('select').multiselect('updateButtonText');
    $('span.multiselect-native-select input:checkbox').removeAttr('checked');
    $('span.multiselect-native-select select').multiselect('refresh');
    $('span.multiselect-native-select select').parent().find('button.multiselect.MainFilter').removeClass('MainFilter fas fa-filter');
    //$('select').change();
    $('.items.TaskDetails:visible span.ItemValue').each(function() {
        var fieldname = $(this).attr('class').split('ItemValue ')[1];
        var fieldvalue = $(this).text();
        $('input[type=checkbox][name="' + fieldname + '"]:not([value="' + fieldvalue + '"])').closest('li').hide();
    });
    $('.items.TaskDetails:visible span.ItemValue').each(function() {
        var fieldname = $(this).attr('class').split('ItemValue ')[1];
        var fieldvalue = $(this).text();
        $('input[type=checkbox][name="' + fieldname + '"][value="' + fieldvalue + '"]').closest('li').show();
    });

}
var GetProject_Info = {
    onSuccess: function(sender, args) {
        var collListItem = GetProject_Info.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var PID;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            PID = oListItem.get_id();
        }
        if (PCODE) {
            $(".headtwo").append('<a class="" href="' + _spPageContextInfo.webServerRelativeUrl + '"><span class="litem">Home</span></a>' +
                '<a class="" href="' + _spPageContextInfo.webServerRelativeUrl + '/SitePages/View.aspx?ListKey=projects&IID=' + PID + '"><span data-trans-projectdetails class="litem Resources"></span></a>' +
                '<a class="" href="' + _spPageContextInfo.webServerRelativeUrl + '"><span class="litem">Project Phase</span></a>' +
                '<a class="" href="' + _spPageContextInfo.webServerRelativeUrl + '"><span class="litem">Project Report</span></a>');
        }
        Risks_Info_Request.init();
        Issues_Info_Request.init();
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ($('.ms-Icon--Settings').length) {
            // console.log('in for notification html');
            clearInterval(checkNotificationHTML);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                _spBodyOnLoadFunctionNames.push(GetProject_Info.g.notificationappen());
                GetProject_Info.init();
            });
        }
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle(ListArray[0].projects);
        var camlQuery = new SP.CamlQuery();
        var PQUERY;
        if (PCODE) {
            PQUERY = '<View><Query><Where><Eq><FieldRef Name=\'Title\'/><Value Type=\'Text\'>' + PCODE + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>';
        } else {
            PQUERY = '<View><Query></Query></View>';
        }

        camlQuery.set_viewXml(PQUERY);
        GetProject_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(GetProject_Info.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, GetProject_Info.onSuccess),
            Function.createDelegate(this, GetProject_Info.onError)
        );
    },
    // Global variables
    g: {
        notificationappen: function() {
            if (PCODE) {
                $('#O365_SearchBoxContainer_container').append('<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="0"></i><a href="/sites/SPM/SitePages/Listing.aspx?ListKey=tasks&PCODE=' + PCODE + '">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="0"></i><a href="/sites/SPM/SitePages/Listing.aspx?ListKey=risks&PCODE=' + PCODE + '">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="0"></i><a href="/sites/SPM/SitePages/Listing.aspx?ListKey=issues&PCODE=' + PCODE + '"">Issues</a></span></div><div class="UProfile"></div></div>');
            } else {
                $('#O365_SearchBoxContainer_container').append('<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="0"></i><a href="/sites/SPM/SitePages/Listing.aspx?ListKey=tasks">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="0"></i><a href="/sites/SPM/SitePages/Listing.aspx?ListKey=risks">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="0"></i><a href="/sites/SPM/SitePages/Listing.aspx?ListKey=issues">Issues</a></span></div><div class="UProfile"></div></div>');
            }

        }
    }
};
//Risks
var Risks_Info_Request = {
    onSuccess: function(sender, args) {

        var collListItem = Risks_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var Risks = '';
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            NRisks++;
        }
        $('.Risks i').attr('data-count', NRisks);
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ($('.Container').length) {
            clearInterval(checkStatusHtml);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                Risks_Info_Request.init();
            });
        }
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Risks');
        var camlQuery = new SP.CamlQuery();
        var RQUERY;
        if (PCODE) {
            RQUERY = '<View><Query><Where><Eq><FieldRef Name=\'Project\'/><Value Type=\'Text\'>' + PCODE + '</Value></Eq></Where></Query></View>';
        } else {
            RQUERY = '<View><Query></Query></View>';
        }
        camlQuery.set_viewXml(RQUERY);
        Risks_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Risks_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Risks_Info_Request.onSuccess),
            Function.createDelegate(this, Risks_Info_Request.onError)
        );
    },
    // Global variables
    g: {
        PCODE: window.location.href.split('PCODE=')[1],
    }
};
//Issues
var Issues_Info_Request = {
    onSuccess: function(sender, args) {

        var collListItem = Issues_Info_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var Issues = '';
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();

            NIssues++;
        }
        $('.Issues i').attr('data-count', NIssues);
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ($('.Container').length) {
            clearInterval(checkStatusHtml);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                Issues_Info_Request.init();
            });
        }
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Issues');
        var camlQuery = new SP.CamlQuery();
        var IQUERY;
        if (PCODE) {
            IQUERY = '<View><Query><Where><Eq><FieldRef Name=\'Project\'/><Value Type=\'Text\'>' + PCODE + '</Value></Eq></Where></Query></View>';
        } else {
            IQUERY = '<View><Query></Query></View>';
        }
        camlQuery.set_viewXml(IQUERY);
        Issues_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Issues_Info_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Issues_Info_Request.onSuccess),
            Function.createDelegate(this, Issues_Info_Request.onError)
        );
    },
    // Global variables
    g: {
        PCODE: window.location.href.split('PCODE=')[1],
    }
};

// var Body_Append = '<style>';
// for(var i =0; i < Listing_Info.length; i++)
// {
//     if(Listing_Info[i].inlisting == false)
//     {
//         Body_Append += '.ItemField.'+Listing_Info[i].InternalName+'{display:none!important}';
//     }
//     if(Listing_Info[i].infilter == false)
//     {
//         $('select#'+Listing_Info[i].InternalName).parent().hide();
//     }
//     if(i == Listing_Info.length-1)
//     {
//         Body_Append += '</style>';
//         $('body').append(Body_Append);
//     }
// }