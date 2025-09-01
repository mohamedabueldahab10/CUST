var Listing_Request = {
	preinit: function () {
        if ($('.Header-Sharakat').length) {
            clearInterval(checkStatusHtml);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
				Listing_Request.init();
				Listing_Project_Info_Request.init();
            });
        }
	},
	init: function(){
		sphttp.get( new SP.ClientContext.get_current().$u_0, ListName, '<View><Query><Where><Eq><FieldRef Name="Project_Code" /><Value Type="Text">'+Project_Code+'</Value></Eq></Where><OrderBy><FieldRef Name=\'Modified\' Ascending=\'False\' /></OrderBy></Query></View>', IN, function (records, record, listItem, isDone) {
			if (isDone) {
				var DisplayNameArray = Listing_Info.map(a => a.DisplayName);
				var ItemType = Listing_Info.map(a => a.fieldType);
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
								html +='<div data-type="'+Field_In_Use[0].fieldType+'" class="ItemField ' + key +'"><label class=' + key +'> ' +  Field_In_Use[0].DisplayName + ':</label>' + '<span class="ItemValue ' + key +'" >' + obj[key] + '</span></div>';
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
							$('.filterSelect').append('<button type="button" class="filter" onclick="clearfilter()">مسح التصفية</button>');
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
					sortByOpt +='</select>';
					document.getElementById('sortByDiv').innerHTML = sortByOpt;
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
										if(Listing_Info[i].fieldType == "date"){					
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
										if(Listing_Info[i].fieldType == "date"){					
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
						var html = '';			
						for ( var i=0; i < records.length; i++) {
							//console.log('records',records);
							var obj = records[i];
							//console.log('obj',obj);							
							html += "<div class='items TaskDetails'>";							
							for (var key in obj) {
								//Getting Display Name
								var Field_In_Use = Listing_Info.filter(function (el) {
									return el.InternalName === key;
								  });	
								///
								html +='<div data-type="'+Field_In_Use[0].fieldType+'" class="ItemField ' + key +'"><label class=' + key +'> ' +  Field_In_Use[0].DisplayName + ':</label>' + '<span class="ItemValue ' + key +'" >' + obj[key] + '</span></div>';
							}							
							html += "</div>";							
							
							}
							document.getElementById("linkInfo").innerHTML += html;
							var i = 0;
							$('.items.TaskDetails').each(function(){
								var sText = $(this).find('.ItemField:first-child > span').text();
								// console.log(sText);
								$(this).find('.ItemField:first-child > span').html('<a href="/sites/PWA/SitePages/Form/View/AssumptionsFormView.aspx?IID='+RecordsWithID[i].ID+'&PCODE='+Project_Code+'">'+sText+'</a>');
								// console.log(i);
								i++;
							});
						
						//console.log('records',records);
					}
					var i = 0;
                    $('.items.TaskDetails').each(function(){
                        var sText = $(this).find('.ItemField:first-child > span').text();
                        // console.log(sText);
                        $(this).find('.ItemField:first-child > span').html('<a href="/sites/PWA/SitePages/Form/View/AssumptionsFormView.aspx?IID='+RecordsWithID[i].ID+'&PCODE='+Project_Code+'">'+sText+'</a>');
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
				});
			}
		});
	}
}