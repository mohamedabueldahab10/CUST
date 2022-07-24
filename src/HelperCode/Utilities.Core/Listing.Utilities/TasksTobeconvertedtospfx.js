if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
	var No_Data = 'لا يوجد'
} else {
	var No_Data = 'Not Found'
}
var CentralSite = "",PCODE='',SP_ListName,JSON_File_Name,PageTitle, Query,listkey,PCODE_STRING='',istasks = false,RelatedURL;
var curstage_org_prv =[],curstage_prv=[],curstage=[],curstage_nxt=[];

istasks = true;
// PCODE = window.location.href.split('PCODE=')[1].replace(/%20/g, " ");
// PCODE_STRING = '&PCODE='+PCODE;
Query = '<View><Query><Where><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or></Where></Query></View>';
//<View><Query><Where><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Lookup"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or></Where></Query></View>

  //
  function myFunction() {
      var searchInput, filter, filterColumn, span, multiselectText, i, txtValue;
      searchInput = document.getElementById("searchInput");
      filter = searchInput.value.toUpperCase();
      var itemsArray = document.getElementsByClassName('items');
      for (i = 0; i < itemsArray.length; i++) {
          if ($(".items").find("span." + filter).length > 0){ 
            itemsArray[i].style.display = "";
          } else {
              itemsArray[i].style.display = "none";
          }
      }
  }
    
  window.sphttp = {
    get: function (listUrl, listDisplayName, camelQuery, internalFieldNames, onEach, onError) {
        var clientContext = new SP.ClientContext(listUrl);
        var oList = clientContext.get_web().get_lists().getByTitle(listDisplayName);
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(camelQuery);
        var itemsEnumerable = oList.getItems(camlQuery);
        clientContext.load(itemsEnumerable);
        clientContext.executeQueryAsync(
            Function.createDelegate(this,
                function (sender, args) {
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

						// console.log( oListItem.get_item('Title') );
						if(oListItem.get_item('Status') == 'Open')
						{
							if (internalFieldNames && internalFieldNames.length > 0) {
								for (var i = 0; i < internalFieldNames.length; i++) {
									if( internalFieldNames[i] = Listing_Info[i].InternalName){
										if(Listing_Info[i].type == "date"){
											var d = ( oListItem.get_item(internalFieldNames[i]) == null) ? 'empty' : oListItem.get_item(internalFieldNames[i]);
												var datetouse2;
												if(d != "empty"){
													var local = d.getTime();
													var offset = d.getTimezoneOffset() * (60 * 1000);
													var utc = new Date(local + offset);
													var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
													var datetouse = riyadh.toLocaleString("en-US").split(',')[0].split('/');
													datetouse2 = datetouse[1]+'/'+datetouse[0]+'/'+datetouse[2];
													//console.log(riyadh.toLocaleString("en-US").split(',')[0]);
													//console.log(oListItem.get_item(internalFieldNames[i]));
												}
												record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : datetouse2;
										}else
											record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]);
									}
								}
								
								RecordsWithID.push({
									record: record,
									ID: oListItem.get_id(),
									tasktype: oListItem.get_item('TaskType1'),
									nxtstage: oListItem.get_item('StageIDApprove'),
									prvstage: oListItem.get_item('StageIDReject'),
									stageid: oListItem.get_item('StageID'),
									pcode: oListItem.get_item('ProjectCode'),
									ritemid: oListItem.get_item('RelatedItemID')
								});
								
								
								records.push(record);											
								onEach(records, record, oListItem, false); //false if having item
							}
						

						}
						
					
                        
                    }
                    onEach(records, null, null, true); //true if no more items					
                }),
            Function.createDelegate(this, function (sender, args) {
                console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            })
        )
    }
}
//
var Listing_Request = {
	preinit: function () {
        if ($('.Header-Sharakat').length) {
			clearInterval(checkStatusHtml);
			$('h2.DahsFormTitle').text(PageTitle);
			Listing_Request.g.inputsearch();
			//get Listing's json
            // console.log('9999999999999999999999999');
            window.IN = Listing_Info.map(a => a.InternalName);
            window.DN = Listing_Info.map(a => a.DisplayName);
            window.FT = Listing_Info.map(a => a.fieldType);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                Listing_Request.init();
                // ProjectStages_Data_Request.init();
                Stages_Data_Request.init();
            });
        }
	},
	init: function(){
		sphttp.get('/PWA/', 'Tasks', Query, IN, function (records, record, listItem, isDone) {
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
					for ( var i=0; i < records.length; i++) {
							//console.log('records',records);
							var obj = records[i];
												
							html += "<div class='items TaskDetails'>";							
							for (var key in obj) {
								//Getting Display Name
								var Field_In_Use = Listing_Info.filter(function (el) {
									return el.InternalName === key;
								  });	
								///
								html +='<div data-taskid="'+RecordsWithID[i].ID+'" data-pcode="'+RecordsWithID[i].pcode+'" data-stageid="'+RecordsWithID[i].stageid+'" data-task="'+RecordsWithID[i].tasktype+'" data-nxtstage="'+RecordsWithID[i].nxtstage+'" data-prvstage="'+RecordsWithID[i].prvstage+'" data-ritemid="'+RecordsWithID[i].ritemid+'" data-type="'+Field_In_Use[0].type+'"  class="ItemField ' + key +'"><label class=' + key +'> ' +  Field_In_Use[0].DisplayName + ':</label>' + '<span class="ItemValue ' + key +'" >' + obj[key] + '</span></div>';
							}							
							html += "</div>";														
                    }
                    document.getElementById("linkInfo").innerHTML += html;
					//console.log('DisplayNameArray',DisplayNameArray);

					for ( var i=0; i < Listing_Info.length; i++) {
						
						var selectFilter = document.createElement("SELECT");
						selectFilter.setAttribute("id", Listing_Info[i].InternalName);
						selectFilter.setAttribute("multiple", "multiple");
						var nameArray = records.map(function(d) { return d["",Listing_Info[i].InternalName]; });
						window.selectedOptionsArray = [];					
						for( item in nameArray) {			
							if (nameArray[item] != null){
								selectFilter.add( new Option( nameArray[item] , nameArray[item] ) );  
							}			
						}
									
						filterDiv.appendChild(selectFilter);
						sortByOpt +='<option value=' + Listing_Info[i].InternalName +'>' +  Listing_Info[i].DisplayName + '</option>';  
						// On change									
						//remove duplicates	
						var map = {};	
						$('select#' + Listing_Info[i].InternalName+' option').each(function () {
							if (map[this.value]) {
								$(this).remove()
							}
							map[this.value] = true;
						});	
						//		
						if( $('button.filter').length == 0 )
							$('.filterSelect').append('<button type="button" class="filter" onclick="clearfilter()">إختر المعلومة</button>');
						$('select#' + Listing_Info[i].InternalName).multiselect({
							nonSelectedText:'' +Listing_Info[i].DisplayName,
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
									selectedOptionsArray[sindex].opselected = selectedOptionsArray[sindex].opselected +':::'+opselected
								}else{
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
								if ( selectedOptionsArray[sindex].opselected.indexOf(':::') >= 0 ) {
									
									selectedOptionsArray[sindex].opselected = selectedOptionsArray[sindex].opselected.replace(':::'+opselected,'');
									selectedOptionsArray[sindex].opselected = selectedOptionsArray[sindex].opselected.replace(opselected+':::','');

								}else{
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
							  for ( var j=0; j < selectedOptionsArray.length; j++) {
								  
								
								$('select#'+selectedOptionsArray[j].IDofSelectedOption).parent().find('button.multiselect').addClass('MainFilter fas fa-filter'); 
								  var value = selectedOptionsArray[j].opselected;
								  var valueID = selectedOptionsArray[j].IDofSelectedOption;
								  values.push({
									  value: value,
									  valueID: valueID
								  });							
							  }
							//   console.log('values',values);
							  $('.items').hide();
					
							$('.items').each(function () {
								var combination = false;
								///////////Hiding based on text
								for (var k = 0; k < values.length; k++){
									
									if(values[k].value.indexOf(':::') >= 0){
										var allvalues = values[k].value.split(':::');
										for(var j = 0; j < allvalues.length; j++){
											if($(this).find('.ItemField.'+values[k].valueID+'').text().toLowerCase().indexOf(allvalues[j]) > -1){
												combination = true;
												break;
											}else{
												combination = false;
												
											}
											if( j == allvalues.length - 1 && combination == false )
												return;
										}
											
									}else{
										
										if($(this).find('.ItemField.'+values[k].valueID+'').text().toLowerCase().indexOf(values[k].value) > -1){
											combination = true;
										}else{
											combination = false;
											return;
										}
										
									}
									
								}
								if(combination)
									$(this).css("display", "flex");
							});
							  //console.log('selectedOptionsArray',selectedOptionsArray);
							  
								
								$('.items.TaskDetails:visible span.ItemValue').each(function(){
									var fieldname = $(this).attr('class').split('ItemValue ')[1];
									var fieldvalue = $(this).text();
									
									if(IDofSelectedOption != fieldname){
										$('input[type=checkbox][name="'+fieldname+'"]:not([value="'+fieldvalue+'"])').closest('li').hide();
										// console.log(IDofSelectedOption,fieldname)
									}
								});
								$('.items.TaskDetails:visible span.ItemValue').each(function(){
									var fieldname = $(this).attr('class').split('ItemValue ')[1];
									var fieldvalue = $(this).text();
									if(IDofSelectedOption != fieldname)
										$('input[type=checkbox][name="'+fieldname+'"][value="'+fieldvalue+'"]').closest('li').show();
								});
								if (selectedOptionsArray.length == 0){
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
					function sortArray(){
						document.getElementById("linkInfo").innerHTML = "";
						var sortByDropdown = document.getElementById("sortBy");
						var selectedsortBy = sortByDropdown.options[sortByDropdown.selectedIndex].value;
						var AscenDesenDropdown = document.getElementById("AscenDesen");
						var selectedAscenDesen = AscenDesenDropdown.options[AscenDesenDropdown.selectedIndex].value;
						if (!selectedAscenDesen) {selectedAscenDesen = "ascending";}
						if (selectedAscenDesen == "ascending"){
							for ( var i=0; i < records.length; i++) {
								var obj = records[i];						
								//for (var key in obj) {
								for ( var v=0; v < obj.length; v++) {
									if( key = Listing_Info[i].InternalName){
										if(Listing_Info[i].type == "date"){					
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
							var propComparator = (propName) =>(a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;
							records.sort(propComparator('' + selectedsortBy));
						}
						else{
							for ( var i=0; i < records.length; i++) {
								var obj = records[i];						
								//for (var key in obj) {
								for ( var v=0; v < obj.length; v++) {
									if( key = Listing_Info[i].InternalName){
										if(Listing_Info[i].type == "date"){					
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
							var propComparator = (propName) =>(a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? 1 : -1;
							records.sort(propComparator('' + selectedsortBy));
						}					
						for ( var i=0; i < records.length; i++) {
							//console.log('records',records);
							var obj = records[i];
							//console.log('obj',obj);							
							var html = "<div class='items TaskDetails'>";							
							for (var key in obj) {
								//Getting Display Name
								var Field_In_Use = Listing_Info.filter(function (el) {
									return el.InternalName === key;
								  });	
								///
								html +='<div data-type="'+Field_In_Use[0].fieldType+'" class="ItemField ' + key +'"><label class=' + key +'> ' +  Field_In_Use[0].DisplayName + ':</label>' + '<span class="ItemValue ' + key +'" >' + obj[key] + '</span></div>';
							}							
							html += "</div>";							
							document.getElementById("linkInfo").innerHTML += html;
                        }
							if(!istasks)
							{
								var i = 0;
								$('.items.TaskDetails').each(function(){
									var sText = $(this).find('.ItemField:first-child > span').text();
									// console.log(sText);
									$(this).find('.ItemField:first-child > span').html('<a href="/sites/SPM/SitePages/View.aspx?ListKey='+listkey+'&IID='+RecordsWithID[i].ID+PCODE_STRING+'">'+sText+'</a>');
									// console.log(i);
									i++;
								});
							}
							else
							{
								var i = 0;
								$('.items.TaskDetails').each(function(){
									var sText = $(this).find('.ItemField:first-child > span').text();
									// console.log(sText);
									$(this).find('.ItemField:first-child > span').html('<a href="javascript:;" onclick="Listing_Request.g.handleids('+
                                        '$(this).closest(\'[data-pcode]\').attr(\'data-pcode\'),'+
                                        '$(this).closest(\'[data-taskid]\').attr(\'data-taskid\'),'+
                                        '$(this).closest(\'[data-tasktype]\').attr(\'data-tasktype\'),'+
                                        '$(this).closest(\'[data-stageid]\').attr(\'data-stageid\'),'+
                                        '$(this).closest(\'[data-ritemid]\').attr(\'data-ritemid\'),'+
                                    ')">'+sText+'</a>');
									// console.log(i);
									i++;
								});
							}
                            
						
						//console.log('records',records);
					}
                    var i = 0;
                    $('.items.TaskDetails').each(function(){
                        var sText = $(this).find('.ItemField:first-child > span').text();
                        // console.log(sText);
                        $(this).find('.ItemField:first-child > span').html('<a href="javascript:;"                      onclick="Listing_Request.g.handleids('+
                        '$(this).closest(\'[data-pcode]\').attr(\'data-pcode\'),'+
                        // '$(this).closest(\'[data-rurl]\').attr(\'data-rurl\'),'+
                        '$(this).closest(\'[data-taskid]\').attr(\'data-taskid\'),'+
                        '$(this).closest(\'[data-tasktype]\').attr(\'data-tasktype\'),'+
                        '$(this).closest(\'[data-stageid]\').attr(\'data-stageid\'),'+
                        '$(this).closest(\'[data-ritemid]\').attr(\'data-ritemid\'),'+
                    ')">'+sText+'</a>');
                        // console.log(i);
                        i++;
                    });
					
					$("#sortBy").change(sortArray);
					$("#AscenDesen").change(sortArray);
					$(".multiselect-native-select .btn-group").css("margin-bottom","0px");
					$( ".multiselect.dropdown-menu" ).click(function() {
						var marginHeight = $(".btn-group.show .multiselect-container.dropdown-menu.show").height();
						$(this).parent().css("margin-bottom","" + marginHeight + "px");
					});	
					// Listing_Project_Info_Request.g.clickbait();
					// changeResources();
					$('.loader-box').fadeOut();					
				});
			}
		});
	},
	g:
	{
        handleids: function(pcode,  taskid, tasktype, stageid, ritemid)//rurl,
		{
			// console.log(stageid);
			curstage_org = Stages_Data_Request.g.StagesArray.filter(function(obj) {
				return obj.stageid == stageid;
			});
            var rurl = curstage_org[0].relatedURL;
			// curstage =  ProjectStages_Data_Request.g.StagesArray.filter(function(obj) {
			//  return obj.stage == curstage_org[0].stage;
			// });
            Listing_Request.g.handlelinks(pcode, rurl, taskid, tasktype, stageid, ritemid);//rurl,
		},
        handlelinks: function(pcode, rurl, taskid, tasktype, stageid, ritemid)
        {
            if( rurl.toLowerCase().indexOf('pcode') > -1 )
            {
                rurl = rurl.toLowerCase().replace('?pcode=', '');
                if( rurl.toLowerCase().indexOf('view.aspx') > -1 ) //view page with pcode
                {
					window.open(_spPageContextInfo.webServerRelativeUrl+rurl+'?IID='+ritemid+'&PCODE='+pcode, '_blank');//+'&TID='+taskid

                }
                else if( rurl.toLowerCase().indexOf('edit') > -1 ) //edit page is mainly without pcode [just in case!]
                {
					window.open(_spPageContextInfo.webServerRelativeUrl+rurl+'?IID='+ritemid+'&PCODE='+pcode, '_blank');//+'&TID='+taskid

                }
                else //Listing page with pcode
                {
					window.open(_spPageContextInfo.webServerRelativeUrl+rurl+'?PCODE='+pcode, '_blank');//+'&TID='+taskid

                }
            }
            else if( rurl.toLowerCase().indexOf('edit') > -1 ) //edit page without pcode
            {
				window.open(_spPageContextInfo.webServerRelativeUrl+rurl+'?IID='+ritemid, '_blank');//+'&TID='+taskid
			}
			else if( rurl.toLowerCase().indexOf('projuid=') > -1 )
			{
				window.open(_spPageContextInfo.webServerRelativeUrl+rurl+ritemid+'&PCODE='+pcode, '_blank');//+'&TID='+taskid
			}
        },
		inputsearch: function()
		{
			$("#myInput").on("keyup", function() {
				var value = $(this).val().toLowerCase();
				$("div#linkInfo .items").filter(function() {
				  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});
			  });
		},
		Cancel: function(){
			$('.pop-overlay').remove();
		}
	}
}
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
        camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name=\'ListSort\' Ascending=\'True\' /></OrderBy></Query></View>');//<Where><Eq><FieldRef Name=\'ProjectCode\'/><Value Type="Text">'+peojectC+'</Value></Eq></Where>
        ProjectStages_Data_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only
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
    init: function (peojectC, type,taskid,nxtstageid, prvstageid, stageid) {
        var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext.get_web().get_lists().getByTitle('Stages');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Enabled\'/><Value Type=\'Integer\'>1</Value></Eq></Where><OrderBy><FieldRef Name=\'ListSort\' Ascending=\'True\' /></OrderBy></Query></View>');
        Stages_Data_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only
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
var checkStatusHtml = setInterval(function() {
    Listing_Request.preinit();
},1000);
var checkfilter = setInterval(function() {
	checkboxestoradio.preinit();
},500);
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
		$('span.multiselect-native-select').each(function(){
			$(this).find('input[type=checkbox]').attr('name',  $(this).find('>select').attr('id'));
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

function clearfilter(){
	selectedOptionsArray = [];
	$('input#myInput').val('').keyup();
	$('span.multiselect-native-select select').multiselect('deselectAll', false);

	$(":checkbox").attr("checked", false);
	// $('select').multiselect('updateButtonText');
	$('span.multiselect-native-select input:checkbox').removeAttr('checked');
	$('span.multiselect-native-select select').multiselect('refresh');
	$('span.multiselect-native-select select').parent().find('button.multiselect.MainFilter').removeClass('MainFilter fas fa-filter'); 
	//$('select').change();
	$('.items.TaskDetails:visible span.ItemValue').each(function(){
		var fieldname = $(this).attr('class').split('ItemValue ')[1];
		var fieldvalue = $(this).text();
		$('input[type=checkbox][name="'+fieldname+'"]:not([value="'+fieldvalue+'"])').closest('li').hide();
	});
	$('.items.TaskDetails:visible span.ItemValue').each(function(){
		var fieldname = $(this).attr('class').split('ItemValue ')[1];
		var fieldvalue = $(this).text();
		$('input[type=checkbox][name="'+fieldname+'"][value="'+fieldvalue+'"]').closest('li').show();
	});
		
}


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