if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
	var No_Data = 'لا يوجد'
} else {
	var No_Data = 'Not Found'
}
var position,itemsEnumerable,nextPagingInfo;
Project_Code = window.location.href.split('PCODE=')[1];
Query ='<View><Query><Where><Eq><FieldRef Name="Project" /><Value Type="Text">'+Project_Code+'</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query><RowLimit>1</RowLimit></View>';
// Query = '<View><Query><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>';
window.checkStatusHtml = setInterval(function() {
    Listing_Request.preinit();
},1000);

//before this is for root scenario
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
$(document).ready(function(){
$("#myInput").on("keyup", function() {
	var value = $(this).val().toLowerCase();
	$("div#linkInfo .items").filter(function() {
	$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});
});
});
window.sphttp = {
get: function (listUrl, listDisplayName, camelQuery, internalFieldNames, onEach, onError) {
	var clientContext = new SP.ClientContext(listUrl);
    var oList = clientContext.get_web().get_lists().getByTitle(listDisplayName);
    if (nextPagingInfo) { 
        position = new SP.ListItemCollectionPosition(); 
        position.set_pagingInfo(nextPagingInfo); 
    } 
    else { 
        position = null; 
    } 
    var camlQuery = new SP.CamlQuery();
    //Set the next or back list items collection position 
    //First time the position will be null 
    camlQuery.set_listItemCollectionPosition(position); 

	camlQuery.set_viewXml(camelQuery);
    itemsEnumerable = oList.getItems(camlQuery);
    
    clientContext.load(itemsEnumerable);
    
	clientContext.executeQueryAsync(
		Function.createDelegate(this,
			function (sender, args) {
				var listItemEnum = itemsEnumerable.getEnumerator();
				var records = [];
				window.RecordsWithID = [];
				var type = [];
				while (listItemEnum.moveNext()) {
					var oListItem = listItemEnum.get_current();
					var record = {};
					var ForID = {};	

						if (internalFieldNames && internalFieldNames.length > 0) {
							for (var i = 0; i < internalFieldNames.length; i++) {
								if( internalFieldNames[i] = Listing_Info[i].InternalName){
									if(Listing_Info[i].type == "date"){
										record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]).toISOString().slice(0, 10);
									}else{
										record[internalFieldNames[i]] = (oListItem.get_item(internalFieldNames[i]) == null) ? No_Data : oListItem.get_item(internalFieldNames[i]);
										
									}										
								}
							}
						}
					
					RecordsWithID.push({
						record: record,
						ID: oListItem.get_id()
					});
					records.push(record);											
					onEach(records, record, oListItem, false); //false if having item
                }
                //getting next position info
                if(itemsEnumerable.get_listItemCollectionPosition()){
                    nextPagingInfo = itemsEnumerable.get_listItemCollectionPosition().get_pagingInfo(); 
                } else { 
                    nextPagingInfo = null; 
                } 
				onEach(records, null, null, true); //true if no more items					
			}),
		Function.createDelegate(this, function (sender, args) {
			console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
		})
	)
}
}

var IN = Listing_Info.map(a => a.InternalName);
var DN = Listing_Info.map(a => a.DisplayName);
var FT = Listing_Info.map(a => a.type);

//
var Listing_Request = {
	preinit: function () {
        if ($('.Header-Sharakat').length) {
			clearInterval(checkStatusHtml);
			//root scenario
			$('#customLeftNavigation').hide();
			$('.HOMEPAGEPJ').click(function(e){
				e.preventDefault();
				window.history.back();
			});
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
				Listing_Request.init();
            });
        }
	},
	init: function(){
		$('#sort').append('<button type="button" class="CSformSubmit">إضافة</button>');
		Listing_Request.g.clickbait();
		Listing_Request.g.Cancel();
		sphttp.get('/sites/pwa/'+CentralSite, ListName, Query, IN, function (records, record, listItem, isDone) {
			if (isDone) {
				var DisplayNameArray = Listing_Info.map(a => a.DisplayName);
				var ItemType = Listing_Info.map(a => a.type);
				//console.log('ItemType',ItemType);
				var filterDiv = document.getElementById('filterColumn');
				var sortBy = document.getElementById('sortBy');	
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
								html +='<div data-type="'+Field_In_Use[0].type+'" class="ItemField ' + key +'"><label class=' + key +'> ' +  Field_In_Use[0].DisplayName + ':</label>' + '<span class="ItemValue ' + key +'" >' + obj[key] + '</span></div>';
							}							
							html += "</div>";							
								
					}
					document.getElementById("linkInfo").innerHTML += html;
					//console.log('DisplayNameArray',DisplayNameArray);
					sortByOpt += '<select id="sortBy"><option value="select a field">حدد المعلومة</option>';
					for ( var i=0; i < Listing_Info.length; i++) {
						
						var selectFilter = document.createElement("SELECT");
						selectFilter.setAttribute("id", Listing_Info[i].InternalName);
						selectFilter.setAttribute("multiple", "multiple");
						var nameArray = records.map(function(d) { return d["",Listing_Info[i].InternalName]; });
						var selectedOptionsArray = [];					
						for( item in nameArray) {			
							if (nameArray[item] != null){
								selectFilter.add( new Option( nameArray[item] , nameArray[item] ) );  
							}			
						}
									
						filterDiv.appendChild(selectFilter);
						sortByOpt +='<option value=' + Listing_Info[i].InternalName +'>' +  Listing_Info[i].DisplayName + '</option>';  
						// On change									
						$('#' + Listing_Info[i].InternalName).multiselect({
						  nonSelectedText:'' +Listing_Info[i].DisplayName,					  
						  onChange: function(option, checked, select) {						  	 
							var opselected = $(option).val();					  
							if (checked) {
								$(option).not(this).prop('checked', false); 						
								selectedOptionsArray.push(opselected);					
							}
							else {
								var oindex = selectedOptionsArray.indexOf(opselected);
								selectedOptionsArray.splice(oindex, 1);;
							}
							var values = [];
							for ( var j=0; j < selectedOptionsArray.length; j++) {
								var value = selectedOptionsArray[j].toLowerCase();
								values.push(value);							
							}
							// console.log('values',values);
							$('.items').hide();
							for (var k = 0; k < values.length; k++){
								$('.items').each(function () {
									///////////Hiding based on text
									if($(this).text().toLowerCase().indexOf(values[k]) > -1)
										$(this).css("display", "flex");
								});
							}					
							//console.log('selectedOptionsArray',selectedOptionsArray);
							if (selectedOptionsArray.length == 0){
								$(".items").css("display", "flex");
							}
						  }
						});			
					}
					sortByOpt +='</select>';
					document.getElementById('sortByDiv').innerHTML = sortByOpt;
					//console.log('sortByDiv',sortByDiv);			
					var listForRemove = [];
					var listOfUniqe = [];
					$('.multiselect-container.dropdown-menu li').each(function () {
					  var text = $(this).text().trim();
					  if (listOfUniqe.indexOf(text) === -1)
						listOfUniqe.push(text);
					  else
						listForRemove.push($(this));
					});
					$(listForRemove).each(function () { $(this).remove(); });				
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
								html +='<div data-type="'+Field_In_Use[0].type+'" class="ItemField ' + key +'"><label class=' + key +'> ' +  Field_In_Use[0].DisplayName + ':</label>' + '<span class="ItemValue ' + key +'" >' + obj[key] + '</span></div>';
							}							
							html += "</div>";							
                            document.getElementById("linkInfo").innerHTML += html;
                            var i = 0;
							$('.items.TaskDetails').each(function(){
                                var sText = $(this).find('.ItemField:first-child > span').text();
								// console.log(sText);
								if(Scenario){
									$(this).find('.ItemField:first-child > span').html('<a href="/sites/PWA/SitePages/'+ListName+'View.aspx?IID='+RecordsWithID[i].ID+'">'+sText+'</a>');
									// console.log(i);
									
								}else{
									$(this).find('.ItemField:first-child > span').html('<a href="/sites/PWA/SitePages/'+ListName+'View.aspx?IID='+RecordsWithID[i].ID+'">'+sText+'</a>');
								}
								i++;
							});
						}
						//console.log('records',records);
                    }
                    var i = 0;
                    $('.items.TaskDetails').each(function(){
                        var sText = $(this).find('.ItemField:first-child > span').text();
                        // console.log(sText);
                        if(Scenario){
							$(this).find('.ItemField:first-child > span').html('<a href="/sites/PWA/SitePages/'+ListName+'View.aspx?IID='+RecordsWithID[i].ID+'">'+sText+'</a>');
							// console.log(i);
							
						}else{
							$(this).find('.ItemField:first-child > span').html('<a href="/sites/PWA/SitePages/'+ListName+'View.aspx?IID='+RecordsWithID[i].ID+'">'+sText+'</a>');
						}
						i++;
                    });
					$("#sortBy").change(sortArray);
					$("#AscenDesen").change(sortArray);
					$(".multiselect-native-select .btn-group").css("margin-bottom","0px");
					$( ".multiselect.dropdown-menu" ).click(function() {
						var marginHeight = $(".btn-group.show .multiselect-container.dropdown-menu.show").height();
						$(this).parent().css("margin-bottom","" + marginHeight + "px");
					});						
				});
			}
		});
	},
	g: {
		clickbait: function(){
            $('button.CSformSubmit').click(function(){
                window.location = '/sites/PWA/SitePages/'+ListName+'New.aspx?PCODE='+Project_Code;
            })
		},
		Cancel: function(){
            $('.headtwo > a:first-child').click(function(e){
				window.location = '/sites/PWA/SitePages/ProjectDetails.aspx?PCODE='+Project_Code;
				e.preventDefault();
			});
		}
	}
}


//
