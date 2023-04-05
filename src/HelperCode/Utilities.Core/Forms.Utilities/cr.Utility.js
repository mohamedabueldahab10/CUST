let crlabel, crlabelEn, crdescription, crdescriptionEn, crsubField;
let isCRChangeTrigered = false;
window.crMasterDetailsArrayRequest = [];
var crMasterDetailsArrayNew = [];
var crMasterDetailsArrayEdit = [];
var crRelatedItemCode = "";
var isGeneral;
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
window.CrModeFunctionality = {
	preinit: function () {
		let prefix = "";
		if (USERisNew || USERisEdit) {
			prefix = "_Edit.js";
		} else if (USERisView) {
			prefix = "_Edit.js";
		}
		let CR_JSON_File_Name = RListKey + prefix;

		//get form's json
		$.getScript(
			_spPageContextInfo.webAbsoluteUrl +
			"/Style%20Library/spm/JSON/" +
			RListKey +
			"/" +
			CR_JSON_File_Name
		).done(function (script, textStatus) {

			crlabel = Information_Form[0].label;
			crlabelEn = Information_Form[0].labelEn;
			crdescription = Information_Form[0].description;
			crdescriptionEn = Information_Form[0].descriptionEn;
			CrModeFunctionality.init(Information_Form);
		});
	},
	init: function (newJSON) {
		var htmlBuilder =
			'<div class="py-5 cr-related-item-start d-flex justify-content-center align-items-end"><i class="fas fa-arrow-down"></i><span class="cr-related-item-title Resources mx-3" data-trans-crrelateditem></span><i class="fas fa-arrow-down"></i></div>';
		var renderFunction = USERisNew || USERisEdit ? "ListInfo" : "View_ListInfo";
		var Label, Description;
		var printHtml = "";


		newJSON.forEach(function (o, i, a) {
			if (o.labelEn == "Attachments") {
				a.splice(i, 1);
			}
		});
		asyncFor.seqProcess(
			newJSON,
			function (item, index, resolve) {
				if (
					localStorage.getItem("lng") == null ||
					localStorage.getItem("lng") == "ar"
				) {
					Label = item.label;
					Description = item.description || "";
				} else {
					Label = item.labelEn;
					Description = item.descriptionEn || "";
				}
				// console.log('Start processing ' + Label + ' subFields...');
				//Handle security
				var groups = [],
					targetList = "",
					sectionType = "",
					rendersection = true,
					masterLayout = "";

				if (item.hasOwnProperty("security")) {
					if (item.security.groups.length > 0) {
						// element.security.groups.forEach(function(item.security.groups[z]){
						for (var z = 0; z < item.security.groups.length; z++) {
							groups.push(item.security.groups[z]); //.replace(/\s/g, '')
							if (Groups.indexOf(item.security.groups[z]) == -1) {
								rendersection = false;
							} else {
								rendersection = true;
								break;
							}
						}
						groups = groups.join(" ");
					}
				}

				if (item.hasOwnProperty("sectiontype")) {
					//both attr should be available
					targetList = 'data-target_list="' + item.targetlist + '"';
					sectionType = 'data-section_type="' + item.sectiontype + '"';
					masterLayout = 'data-layout="' + item.layout + '"';
				}

				htmlBuilder +=
					'<div class="py-5 border-bottom section-container cr-related-item-section ' +
					listkey +
					' " ' +
					targetList +
					" " +
					sectionType +
					' data-groups="' +
					groups +
					'"' +
					masterLayout +
					">" +
					'<div class="form-row">' +
					'<div class="col-lg-3 col-md-4 mb-4">' +
					"<h3>" +
					Label +
					"</h3>" +
					'<span class="font-14">' +
					Description +
					"</span>" +
					"</div>" +
					'<div class="col-lg-9 col-md-8 white-box p-4 fieldset-container">';

				asyncFor.seqProcess(
					item.subFields,
					function (subitemField, indexField, resolveField) {
						// if(subitemField.type != "picker" && subitemField.InternalName){
						window[`${renderFunction}`].RenderForm(
							subitemField,
							null,
							function (flag, htmlResult) {
								resolveField(subitemField, indexField, {
									htmlResult: htmlResult,
								});
							}
						);
						//}
					},
					function (subitemField, indexField, dataField, isDoneField) {

						htmlBuilder += dataField.htmlResult;
						if (isDoneField) {
							resolve(item, index, dataField, true);
						}
					}
				);
			},
			function (item, index, data, isDone) {

				if (
					localStorage.getItem("lng") == null ||
					localStorage.getItem("lng") == "ar"
				) {
					Label = item.label;
				} else {
					Label = item.labelEn;
				}
				// console.log('Finishing label ' + Label + ' - IsDone: ' + isDone);
				htmlBuilder += "</div></div></div>";
				if (isDone) {
					actionTaskHeader = "";

					$('div[class*="cr-related-item-"]').remove();
					$(".btnactionrow").before(htmlBuilder);

					// $(".container-body").append(htmlBuilder);
					//$('.project-Title-Name').text(PageTitle);
					// $(".breakLine").before('<div class="col-md-12"></div>');

					ListInfo.g.pcodeval(); //no special and spaces allowed
					// ListInfo.g.attachmentsExtensions();

					changeResources();
					if (isNew || isEdit) ListInfo.g.newDetail();
					// handle master details
					if ($(".cr-related-item-section[data-section_type]").length > 0) {
						$(".cr-related-item-section[data-section_type]").each(function () {
							crMasterDetailsArrayRequest.push(
								$(this).attr("data-target_list")
							);
							let isTableView = $(this).attr("data-layout") == "table";
							// if(isNew)
							// {
							if (!isTableView) {
								$(this)
									.find(".fieldset-container > .CFIELD")
									.wrapAll('<div class="Details-Item NewItem"></div>');
							} else if (isTableView) {
								$(this)
									.find(".fieldset-container > .CFIELD")
									.wrapAll('<div class="Details-Item"></div>');
							}

							// }
							// else if(isEdit)
							// {
							//     $(this).find('.fieldset-container > .CFIELD').wrapAll('<div class="Details-Item EditItem"></div>');
							// }
						});
						//pluss
						crMasterDetailsArrayRequest = Array.from(
							new Set(crMasterDetailsArrayRequest)
						); //remove duplicates
						crMasterDetailsArrayNew = crMasterDetailsArrayRequest;
						crMasterDetailsArrayEdit = crMasterDetailsArrayRequest;


						if (crMasterDetailsArrayRequest.length) {
							CR_Master_Details_Request.init(crMasterDetailsArrayRequest[0])
						}else{
							$(".cr-related-item-section .CFIELD").addClass("dont-submit"); // remove it to not apply dont-submit on all fields
						}
					}
					//handle people picker inputs
					$(".cr-related-item-section div[type=picker]").each(function () {
						var mp = new MyPeoplePicker();
						mp.init($(this).attr("id"), {
							PrincipalAccountType: "User",
							AllowMultipleValues: false,
						});
					});
					// handling dynamic fields that change data on the form
					$(".cr-related-item-section select[dynamic=mainfield]").on(
						"change",
						function () {
							var dyfieldname = $(this).attr("id");
							var dyid = $(this)
								.find("option[value=" + $(this).val() + "]")
								.attr("option-id");
							Dynamic_Data_Request.init(
								$(this).data("listname"),
								dyid,
								dyfieldname
							);
						}
					);
					// this affectes on lookup selects
					$(".cr-related-item-section select[dynamic=parent]").on(
						"change",
						function () {
							let parentFieldName = $(this).attr("id");
							let parentFieldValue = $(this).val();
							let customFilterValue = $(this)
								.find("option[value=" + parentFieldValue + "]")
								.data("customfiltervalue");
							let isCustomFilterValue = $(this).attr("iscustomfiltervalue");

							let affectedSelectsInfo = [];
							$("[dynamic=" + parentFieldName + "]").each(function () {
								let affectedFieldName = $(this).attr("id");
								let listName = $(this).data("listname");
								let filterField = $(this).data("filterfield");
								let filterFieldType = $(this).data("filterfieldtype");
								let valFieldKey = $(this).data("valfieldkey");
								let dispFieldKey = $(this).data("dispfieldkey");
								// let specificVal = $(this).data("queryfieldvalue");
								let queryFieldValue = $(this).data("queryfieldvalue");
								let queryFieldName = $(this).data("queryfield");
								let queryFieldType = $(this).data("queryfieldtype");
								// console.log($(this).data("queryFieldValue"), "sssssssa")
								affectedSelectsInfo.push({
									affectedFieldName: affectedFieldName,
									listName: listName,
									isCustomFilterValue: isCustomFilterValue,
									filterField: filterField,
									filterFieldType: filterField,
									parentFieldValue: parentFieldValue,
									customFilterValue: customFilterValue,
									filterFieldType: filterFieldType,
									valFieldKey: valFieldKey,
									dispFieldKey: dispFieldKey,
									queryFieldValue: queryFieldValue,
									queryFieldName: queryFieldName,
									queryFieldType: queryFieldType,
								});
							});
							dynamicAffectSelect.init(affectedSelectsInfo);
						}
					);
					//max min dates
					$(
						".cr-related-item-section input[type=date]:not([minimumdate=undefined])"
					).change(function () {
						var start = $("#" + $(this).attr("minimumdate"));
						if ($(this).val()) start.attr("max", $(this).val());
					});
					$(
						".cr-related-item-section input[type=date]:not([maximumdate=undefined])"
					).change(function () {
						var end = $("#" + $(this).attr("maximumdate"));
						if ($(this).val()) end.attr("min", $(this).val());
					});
					//max min years
					$(
						'.cr-related-item-section input[type=number][data-manipulates="year"]:not([mindata=undefined])'
					).change(function () {
						var minData = $("#" + $(this).attr("mindata"));
						if ($(this).val()) minData.attr("max", $(this).val());
					});
					$(
						'.cr-related-item-section input[type=number][data-manipulates="year"]:not([maxdata=undefined])'
					).change(function () {
						var maxData = $("#" + $(this).attr("maxdata"));
						if ($(this).val()) maxData.attr("min", $(this).val());
					});
					$(".cr-related-item-section .showhide-trigger").on(
						"click",
						function () {
							if ($(this).hasClass("active")) {
								$(this).parent().find(":not(.showhide-trigger)").fadeIn();
								$(this).removeClass("active");
								$(this).parent().find("label").css("display", "inline-block");
							} else {
								$(this).parent().find(":not(.showhide-trigger)").fadeOut();
								$(this).addClass("active");
							}
						}
					);
					$(".cr-related-item-section input.number").keyup(function (event) {
						// skip for arrow keys
						if (event.which >= 37 && event.which <= 40) return;
						// format number
						$(this).val(function (index, value) {
							return value
								.replace(/\D/g, "")
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						});
					});
					//hide show fields based on selection & onload
					$(".cr-related-item-section [data-togglevalues]").on(
						"change",
						function () {
							ListInfo.g.toggleFields($(this));
						}
					);
					// $(".cr-related-item-section .CFIELD").addClass("dont-submit"); // remove it to not apply dont-submit on all fields
					// afterRenderEditAndNewForms.init();
					if (USERisNew && isRListKey) CrItemDataRequest.init();
					else if (USERisEdit) CrItemDataRenderFromJSON_Edit.init();
					else if (USERisView) CrItemDataRenderFromJSON_View.init();
					//! isnew and custom cr
					else {
					}
					//! custom CR functionality
					if (!isCRChangeTrigered) {
						handleCustomeCr.init();
						isCRChangeTrigered = true;
					}
					$(".CFIELD>label").removeClass("loader-action");
					//initiate master detail
					// if (crMasterDetailsArrayRequest.length > 0) {
					// 	crMasterDetailsArrayRequest.init(crMasterDetailsArrayRequest[0], true);
					// 	crMasterDetailsArrayRequest.shift(); //remove 0 index
					// }
				}
			}
		);
	},
};
//! custom CR functionality
window.handleCustomeCr = {
	init: function () {
		$('[data-togglename*="UpdateType"]').on("change", function () {

			var currentValue = $(this).val()
			if (currentValue != 'delete') {

				isGeneral =
					$(this).find(">option:selected").attr("data-trans-generalchange") == ""
						? true
						: false;
				let toggleName = $(this).data("togglename");
				let toggleParent = $(`[data-togglevalues*="${toggleName}"]`);
				let relevantDropdown = $(`select[data-listname="${toggleParent.val().split("_")[1]}"]`);
				RListKey = relevantDropdown.data("listkey");
				isRListKey = RListKey ? true : false;
				CrRelatedList = relevantDropdown.data("listname");
				RID = relevantDropdown.find(">option:selected").attr("option-id");
				$(this).parent().find(">label").addClass("loader-action");
				if (!isGeneral) {
					let fieldsJSON = eval(
						$(this).find("option:checked").data("fieldsvalue")
					);
					let sectionJSON = [
						{
							label: fieldsJSON[0].label,
							labelEn: fieldsJSON[0].labelEn,
							description: fieldsJSON[0].description,
							descriptionEn: fieldsJSON[0].descriptionEn,
							subFields: fieldsJSON,
						},
					];
					CrModeFunctionality.init(sectionJSON);
				} else {
					CrModeFunctionality.preinit();
				}
			}
		});
		$(`[id*="CRRelated"]`).on("change", function () {
			let myListKey = $(this).data("listkey");
			if ($(this).val()) {
				$(`[data-togglename*="${myListKey}"]`).prop("disabled", false);
			} else {
				$(`[data-togglename*="${myListKey}"]`).val("");
				$(`[data-togglename*="${myListKey}"]`).prop("disabled", true);
			}
			if ($(`[data-togglename*="${myListKey}"]`).val()) {
				$(this).parent().find(">label").addClass("loader-action");
				RListKey = $(this).data("listkey");
				(isRListKey = RListKey ? true : false),
					(CrRelatedList = $(this).data("listname"));
				RID = $(this).find(">option:selected").attr("option-id");
				CrItemDataRequest.init();
			}
		});
	},
};
//! on New
window.CrItemDataRequest = {
	onSuccess: function (sender, args) {
		crRelatedItemCode = oListItem.get_item("Title");
		var jsonValues;

		if (!isGeneral) {
			jsonValues = eval(
				$('[data-togglename*="UpdateType"]:visible')
					.find("option:checked")
					.data("fieldsvalue")
			);
		}

		var fieldType = "";

		$(
			".cr-related-item-section:not([data-target_list]) .CFIELD> input:not([type=file]), .cr-related-item-section:not([data-target_list]) .CFIELD> input[type=checkbox], .cr-related-item-section:not([data-target_list]) .CFIELD> div[type=picker], .cr-related-item-section:not([data-target_list]) .CFIELD> select[type=dropdown], .cr-related-item-section:not([data-target_list]) .CFIELD>  textarea,.cr-related-item-section:not([data-target_list]) .CFIELD> .datetimeinputs input[type=date], .cr-related-item-section:not([data-target_list]) .CFIELD> .datetimeinputs input[type=datetime-local], .cr-related-item-section:not([data-target_list]) .CFIELD > .multiselect-container, .cr-related-item-section:not([data-target_list]) .CFIELD > div.richTextEdits , .cr-related-item-section:not([data-target_list]) .CFIELD> div[type=multipicker]"
		).each(function () {



			fieldType = $(this).attr("type");
			let newJsonValues = jsonValues ? jsonValues : Information_Form;
			var currentJsonValues = newJsonValues.map(function (el) {
				return el.InternalName == $(this).attr("id");
			});
			changeRequestBody.push({
				label: crlabel,
				labelEn: crlabelEn,
				description: crdescription,
				descriptionEn: crdescriptionEn,
				//
				listName: CrRelatedList,
				listKey: RListKey,
				//
				itemId: RID,
				InternalName: $(this).attr("id"),
				type: fieldType,
				originalValue: oListItem.get_item($(this).attr("id")),
				value: "",
				DisplayName: currentJsonValues[0].DisplayName,
				DisplayNameEn: currentJsonValues[0].DisplayName,
			});
			switch ($(this).attr("type")) {
				case "date":
					var d =
						oListItem.get_item("" + $(this).attr("id") + "") == null
							? "empty"
							: oListItem.get_item("" + $(this).attr("id") + "");
					if (d != "empty") {
						var local = d.getTime();
						var offset = d.getTimezoneOffset() * (60 * 1000);
						var utc = new Date(local + offset);
						var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
						var datetouse = riyadh
							.toLocaleString("en-US")
							.split(",")[0]
							.split("/");
						datetouse[0] =
							datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
						datetouse[1] =
							datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
						var datetouse2 =
							datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];
						if ($(this).hasClass("withTime")) {
							var hour = d.getHours();
							var minutes = d.getMinutes();
							var timehour = hour + ":" + minutes + ":00";
							$("#Time").val("" + timehour);
						}
					}

					$(this).val(datetouse2);
					break;

				case "datetime-local":
					var d =
						oListItem.get_item("" + $(this).attr("id") + "") == null
							? "empty"
							: oListItem.get_item("" + $(this).attr("id") + "");
					if (d != "empty") {
						var local = d.getTime();
						var offset = d.getTimezoneOffset() * (60 * 1000);
						var utc = new Date(local + offset);
						var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
						var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
						var datetouse = riyadh
							.toLocaleString("en-US")
							.split(",")[0]
							.split("/");
						var hourtouse = riyadh
							.toLocaleString("en-US")
							.split(",")[1]
							.split(":");
						hourtouse[0] =
							$.trim(hourtouse[0]).length == 1
								? "0" + $.trim(hourtouse[0])
								: $.trim(hourtouse[0]);
						hourtouse[1] =
							$.trim(hourtouse[1]).length == 1
								? "0" + $.trim(hourtouse[1])
								: $.trim(hourtouse[1]);
						datetouse[0] =
							datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
						datetouse[1] =
							datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
						var datetouse2 =
							datetouse[2] +
							"-" +
							datetouse[0] +
							"-" +
							datetouse[1] +
							"T" +
							hourtouse[0] +
							":" +
							hourtouse[1];
					}
					$(this).val(datetouse2);
					break;

				case "picker":
					//

					var pemail =
						oListItem.get_item("" + $(this).attr("id") + "") == null
							? enternameemail
							: oListItem
								.get_item("" + $(this).attr("id") + "")
								.get_lookupValue();
					console.log('there is a picker hereeeee', pemail);
					$(this).attr("data-email", pemail);

					if (pemail != enternameemail)
						$(this).attr(
							"user-email",
							oListItem.get_item($(this).attr("id")).get_email()
						);

					var idinternal = $(this).attr("id");
					var mp = new MyPeoplePicker();
					mp.init($(this).attr("id"), { AllowMultipleValues: false });
					break;


				case "multipicker":

					var pemail =
						oListItem.get_item("" + $(this).attr("id") + "") == null
							? enternameemail
							: oListItem
								.get_item("" + $(this).attr("id") + "");

					var userItems = [];

					pemail.forEach(function (element) {
						userItems.push(element.get_lookupValue());
					})

					// $(this).attr(
					// 	"user-email",
					// 	oListItem.get_item($(this).attr("id")).get_email()
					// );

					$(this).attr("data-email", userItems.join(", "));

					var mp = new MyPeoplePicker();
					mp.init($(this).attr("id"), { AllowMultipleValues: true });
					break;

				case "dropdown":
					$(this).val(oListItem.get_item($(this).attr("id")));
					if ($(this).attr("id") == "SubSector") {
						departmenetValue = oListItem.get_item("" + $(this).attr("id") + "");
					}
					if ($(this).attr("id") == "BudgetItem") {
						budgetitemValue = oListItem.get_item("" + $(this).attr("id") + "");
					}

					break;

				case "radio":
					var radioval = oListItem.get_item($(this).attr("id"));
					if (radioval == "Yes" || radioval == "yes") {
						$('input[id="' + $(this).attr("id") + '"]')
							.filter('[value="yes"]')
							.attr("checked", true);
					} else if (
						radioval == "No" ||
						radioval == "no" ||
						radioval == "undefined" ||
						radioval == null
					) {
						$('input[id="' + $(this).attr("id") + '"]')
							.filter('[value="no"]')
							.attr("checked", true);
					} else
						$('input[id="' + $(this).attr("id") + '"]')
							.filter(
								'[value="' + oListItem.get_item($(this).attr("id")) + '"]'
							)
							.attr("checked", true);
					break;

				case "checkbox":
					if (oListItem.get_item($(this).attr("id")))
						$(this).prop("checked", true);
					break;

				case "multiselect":
					if (oListItem.get_item($(this).attr("myfield"))) {
						var myselections = oListItem
							.get_item($(this).attr("myfield"))
							.split(":::");
						for (var i = 0; i < myselections.length; i++) {
							$(this)
								.find("input:checkbox[value='" + myselections[i] + "']")
								.prop("checked", true);
						}
					}
					break;

				case "number":
					if ($(this).hasClass("percentagefield")) {
						var num = oListItem.get_item($(this).attr("id")) * 100;
						if (num % 1 != 0)
							$(this).val(parseFloat(Math.round(num * 100) / 100).toFixed(2));
						else $(this).val(num);
					} else {
						$(this).val(oListItem.get_item("" + $(this).attr("id") + ""));
					}
					break;
				case "richtext":
					var HTMLContent = oListItem.get_item($(this).attr("id"));
					HTMLContent
						? $(this).html(HTMLContent.replaceAll('href="/TOREMOVE', "href="))
						: "";
					break;
				default:
					$(this).val(oListItem.get_item("" + $(this).attr("id") + ""));
					break;
			}
		});
		//checking field ownership
		$(
			".cr-related-item-section:not([data-section_type]) [data-editableby]"
		).each(function () {
			let keyOwner = $(this).data("editableby");
			let itemOwner = oListItem.get_item(keyOwner)
				? oListItem.get_item(keyOwner).get_lookupValue()
				: null;
			let isItDisabled =
				itemOwner != UserN.Title && !isAdmin && !isSPMTeam ? true : false;
			$(this).find(">*").prop("disabled", isItDisabled);
		});
		$(
			".cr-related-item-section input[type=date]:not([minimumdate=undefined])"
		).each(function () {
			window.start = $("#" + $(this).attr("minimumdate"));
			window.end = $(this);
			console.log(start);
			if (start.val()) end.attr("min", start.val());
			if (end.val()) start.attr("max", end.val());
		});
		$(
			".cr-related-item-section input:disabled, select:disabled,textarea:disabled"
		).each(function () {
			if ($(this).val != "") {
				$(this).addClass("disabledWithValue");
			}
		});

		$(".cr-related-item-section input.number").each(function (event) {
			// skip for arrow keys
			if (event.which >= 37 && event.which <= 40) return;
			// format number
			$(this).val(function (index, value) {
				return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			});
		});

		//hide show fields based on selection & onload
		$(".cr-related-item-section [data-togglevalues]").each(function () {
			ListInfo.g.toggleFields($(this));
		});
		//getting related files
		// var host = _spPageContextInfo.webAbsoluteUrl;
		var host = (_spPageContextInfo.webServerRelativeUrl = "/"
			? ""
			: _spPageContextInfo.webServerRelativeUrl);

		if (PCODE || ICODE) {
			// getfolderurl = PCODE
			// 	? host + "/" + ListArray[2].documents + "/" + PCODE + "/" + listkey
			// 	: host + "/Initiative Documents/" + ICODE + "/" + listkey;

			getfolderurl =
				host + "/" + ListArray[2].documents + "/" + PCODE + "/" + listkey;

			DocumentLibraryName = PCODE
				? ListArray[2].documents
				: "Initiative Documents";

			DocumentLibraryName = PCODE
				? ListArray[2].documents
				: "Initiative Documents";
		} else {
			getfolderurl = host + "/" + listkey + " Documents/";
			DocumentLibraryName = listkey + " Documents";
		}

		$(".cr-related-item-section .form-control:disabled").each(function () {
			if ($(this).val() != "") {
				$(this).parent().addClass("autofill");
			}
		});
		$(".cr-related-item-section .PPField[disabled]").each(function () {
			if ($(this).text() != enternameemail) {
				$(this).addClass("autofill");
			}
		});
		$(".CFIELD>label").removeClass("loader-action");
	},
	onError: function (sender, args) {
		console.log(
			"Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
		);
	},
	// The main Initialization function
	init: function () {
		var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext.get_web().get_lists().getByTitle(CrRelatedList);
		CrItemDataRequest.g.oListItem = oList.getItemById(RID);
		oListItem = CrItemDataRequest.g.oListItem;
		clientContext.load(CrItemDataRequest.g.oListItem);
		clientContext.executeQueryAsync(
			Function.createDelegate(this, CrItemDataRequest.onSuccess),
			Function.createDelegate(this, CrItemDataRequest.onError)
		);
	},
	// Global variables
	g: {
		append: function () {
			$(".o365cs-nav-header16 .o365cs-nav-o365Branding").html(
				'<div class="Logo"><a href=""><img class="img-Logo" src="' +
				mainLogo +
				'"></a></div>'
			);
			$(".o365cs-nav-centerAlign").append(
				'<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="10"></i><a href="#">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="10"></i><a href="#">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="30"></i><a href="#">Issues</a></span></div><div class="UProfile"></div></div>'
			);
		},
		budgetitem: function () {
			$("#From, #To").on("change", function () {
				var yearFrom = $("#From").val() ? $("#From").val().split("-")[0] : "",
					dateFromFull = $("#From").val(),
					yearTo = $("#To").val() ? $("#To").val().split("-")[0] : "";
				var yearDiff = yearTo ? parseInt(yearTo) - parseInt(yearFrom) + 1 : "";
				yearFrom = parseInt(yearFrom) + 4;

				if (yearFrom) {
					$("#To")
						.attr("max", String(yearFrom) + "-12-31")
						.attr("min", dateFromFull)
						.prop("disabled", false);
					if (yearDiff) {
						$("[id^=Cost]").parent().hide();
						$("[id^=Cost]").val("");
						$("#Amount").val("");
						var yeartodisp;
						for (var i = 1; i <= yearDiff; i++) {
							yeartodisp = yearFrom - 5 + i;
							$("#Cost" + i)
								.parent()
								.show();
							if (
								localStorage.getItem("lng") == null ||
								localStorage.getItem("lng") == "ar"
							) {
								var label =
									$("#Cost" + i)
										.parent()
										.find("label")
										.text()
										.indexOf("لعام") > -1
										? $("#Cost" + i)
											.parent()
											.find("label")
											.text()
											.split("لعام")[0] +
										" لعام " +
										yeartodisp
										: $("#Cost" + i)
											.parent()
											.find("label")
											.text() +
										" لعام " +
										yeartodisp;
							} else {
								var label =
									$("#Cost" + i)
										.parent()
										.find("label")
										.text()
										.indexOf("For Year") > -1
										? $("#Cost" + i)
											.parent()
											.find("label")
											.text()
											.split("For Year")[0] +
										" For Year " +
										yeartodisp
										: $("#Cost" + i)
											.parent()
											.find("label")
											.text() +
										" For Year " +
										yeartodisp;
							}
							$("#Cost" + i)
								.parent()
								.find("label")
								.text(label);
						}
					}
				} else {
					$("#To")
						.val("")
						.attr("max", "")
						.attr("min", "")
						.prop("disabled", true);
					$("[id^=Cost]").parent().hide();
					$("[id^=Cost]").val("");
					$("#Amount").val("");
				}
			});
			var yearFrom = $("#From").val() ? $("#From").val().split("-")[0] : "",
				dateFromFull = $("#From").val(),
				yearTo = $("#To").val() ? $("#To").val().split("-")[0] : "";
			var yearDiff = yearTo ? parseInt(yearTo) - parseInt(yearFrom) + 1 : "";
			yearFrom = parseInt(yearFrom) + 2;
			if (yearFrom) {
				$("#To")
					.attr("max", String(yearFrom) + "-12-31")
					.attr("min", dateFromFull)
					.prop("disabled", false);
				if (yearDiff) {
					$("[id^=Cost]").parent().hide();
					var yeartodisp;
					for (var i = 1; i <= yearDiff; i++) {
						yeartodisp = yearFrom - 3 + i;
						$("#Cost" + i)
							.parent()
							.show();
						if (
							localStorage.getItem("lng") == null ||
							localStorage.getItem("lng") == "ar"
						) {
							var label =
								$("#Cost" + i)
									.parent()
									.find("label")
									.text()
									.indexOf("لعام") > -1
									? $("#Cost" + i)
										.parent()
										.find("label")
										.text()
										.split("لعام")[0] +
									" لعام " +
									yeartodisp
									: $("#Cost" + i)
										.parent()
										.find("label")
										.text() +
									" لعام " +
									yeartodisp;
						} else {
							var label =
								$("#Cost" + i)
									.parent()
									.find("label")
									.text()
									.indexOf("For Year") > -1
									? $("#Cost" + i)
										.parent()
										.find("label")
										.text()
										.split("For Year")[0] +
									" For Year " +
									yeartodisp
									: $("#Cost" + i)
										.parent()
										.find("label")
										.text() +
									" For Year " +
									yeartodisp;
						}
						$("#Cost" + i)
							.parent()
							.find("label")
							.text(label);
					}
				}
			} else {
				$("#To").val("").attr("max", "").attr("min", "").prop("disabled", true);
				$("[id^=Cost]").parent().hide();
			}
		},
		showFieldsIfInitiativeVision: function () {
			var typeValue = $("#Types option:selected").val();
			if (typeValue == "vision") {
				$("#RelatedBudgetItem , #ProgramTotalCost,#RelatedKPI")
					.parent()
					.css("display", "block");
			} else {
				$("#RelatedBudgetItem , #ProgramTotalCost,#RelatedKPI")
					.parent()
					.css("display", "none");
			}
			if (isNew || isEdit) {
				$("#Types").on("change", function () {
					var typeValueafterchange = $("#Types option:selected").val();
					if (typeValueafterchange == "vision") {
						$("#RelatedBudgetItem , #ProgramTotalCost , #RelatedKPI")
							.parent()
							.css("display", "block");
					} else {
						$("#RelatedBudgetItem , #ProgramTotalCost , #RelatedKPI")
							.parent()
							.css("display", "none");
					}
				});
			}
		},
	},
};
//! on Edit
window.CrItemDataRenderFromJSON_Edit = {
	init: function () {
		var fieldType = "";
		var $this;
		var originalValue = "";
		var newValue = "";
		var value = "";
		changeRequestBody.forEach(function (o, i, a) {
			$this = $(".cr-related-item-section #" + o.InternalName);
			fieldType = $this.attr("type");
			value = o.value ? o.value : o.originalValue;
			isOriginalValue = value == originalValue ? true : false;
			switch (o.type) {
				case "datetime":
					var d = value == "null" ? "empty" : new Date(value);
					if (d != "empty") {
						var local = d.getTime();
						var offset = d.getTimezoneOffset() * (60 * 1000);
						var utc = new Date(local + offset);
						var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
						var datetouse = riyadh
							.toLocaleString("en-US")
							.split(",")[0]
							.split("/");
						datetouse[0] =
							datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
						datetouse[1] =
							datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
						var datetouse2 =
							datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];
						if ($this.hasClass("withTime")) {
							var hour = d.getHours();
							var minutes = d.getMinutes();
							var timehour = hour + ":" + minutes + ":00";
							$("#Time").val("" + timehour);
						}
					}

					$this.val(datetouse2);
					break;

				case "datetime-local":
					var d = value == "null" ? "empty" : new Date(value);
					if (d != "empty") {
						var local = d.getTime();
						var offset = d.getTimezoneOffset() * (60 * 1000);
						var utc = new Date(local + offset);
						var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
						var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
						var datetouse = riyadh
							.toLocaleString("en-US")
							.split(",")[0]
							.split("/");
						var hourtouse = riyadh
							.toLocaleString("en-US")
							.split(",")[1]
							.split(":");
						hourtouse[0] =
							$.trim(hourtouse[0]).length == 1
								? "0" + $.trim(hourtouse[0])
								: $.trim(hourtouse[0]);
						hourtouse[1] =
							$.trim(hourtouse[1]).length == 1
								? "0" + $.trim(hourtouse[1])
								: $.trim(hourtouse[1]);
						datetouse[0] =
							datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
						datetouse[1] =
							datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
						var datetouse2 =
							datetouse[2] +
							"-" +
							datetouse[0] +
							"-" +
							datetouse[1] +
							"T" +
							hourtouse[0] +
							":" +
							hourtouse[1];
					}
					$this.val(datetouse2);
					break;

				case "picker":
					//
					var pemail;
					if (isOriginalValue) {
						pemail = value == "null" ? enternameemail : value.get_lookupValue();
					} else {
						pemail = !value ? enternameemail : value.$5c_1;
					}

					$this.attr("data-email", pemail);

					var idinternal = $this.attr("id");
					var mp = new MyPeoplePicker();
					mp.init($this.attr("id"), { AllowMultipleValues: false });
					break;

				case "dropdown":
					$this.val(value);
					if ($this.attr("id") == "SubSector") {
						departmenetValue = value;
					}
					if ($this.attr("id") == "BudgetItem") {
						budgetitemValue = value;
					}

					break;

				case "radio":
					var radioval = value;
					if (radioval == "Yes" || radioval == "yes") {
						$('input[id="' + $this.attr("id") + '"]')
							.filter('[value="yes"]')
							.attr("checked", true);
					} else if (
						radioval == "No" ||
						radioval == "no" ||
						radioval == "undefined" ||
						radioval == "null"
					) {
						$('input[id="' + $this.attr("id") + '"]')
							.filter('[value="no"]')
							.attr("checked", true);
					} else
						$('input[id="' + $this.attr("id") + '"]')
							.filter('[value="' + value + '"]')
							.attr("checked", true);
					break;

				case "checkbox":
					if (value) $this.prop("checked", true);
					break;

				case "multiselect":
					if (value) {
						var myselections = value.split(":::");
						for (var i = 0; i < myselections.length; i++) {
							$this
								.find("input:checkbox[value='" + myselections[i] + "']")
								.prop("checked", true);
						}
					}
					break;

				case "number":
					if ($this.hasClass("percentagefield")) {
						var num = eval(value) * 100;
						if (num % 1 != 0)
							$this.val(parseFloat(Math.round(num * 100) / 100).toFixed(2));
						else $this.val(num);
					} else {
						$this.val(value);
					}
					break;
				case "richtext":
					var HTMLContent = value;
					HTMLContent
						? $this.html(HTMLContent.replaceAll('href="/TOREMOVE', "href="))
						: "";
					break;
				default:
					$this.val(value);
					break;
			}
		});

		$(
			".cr-related-item-section input[type=date]:not([minimumdate=undefined])"
		).each(function () {
			window.start = $("#" + $(this).attr("minimumdate"));
			window.end = $(this);
			console.log(start);
			if (start.val()) end.attr("min", start.val());
			if (end.val()) start.attr("max", end.val());
		});
		$(
			".cr-related-item-section input:disabled, select:disabled,textarea:disabled"
		).each(function () {
			if ($(this).val != "") {
				$(this).addClass("disabledWithValue");
			}
		});

		$(".cr-related-item-section input.number").each(function (event) {
			// skip for arrow keys
			if (event.which >= 37 && event.which <= 40) return;
			// format number
			$(this).val(function (index, value) {
				return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			});
		});

		//hide show fields based on selection & onload
		$(".cr-related-item-section [data-togglevalues]").each(function () {
			ListInfo.g.toggleFields($(this));
		});
		//getting related files
		// var host = _spPageContextInfo.webAbsoluteUrl;
		var host = (_spPageContextInfo.webServerRelativeUrl = "/"
			? ""
			: _spPageContextInfo.webServerRelativeUrl);

		if (PCODE || ICODE) {
			// getfolderurl = PCODE
			// 	? host + "/" + ListArray[2].documents + "/" + PCODE + "/" + listkey
			// 	: host + "/Initiative Documents/" + ICODE + "/" + listkey;

			getfolderurl =
				host + "/" + ListArray[2].documents + "/" + PCODE + "/" + listkey;

			DocumentLibraryName = PCODE
				? ListArray[2].documents
				: "Initiative Documents";

			DocumentLibraryName = PCODE
				? ListArray[2].documents
				: "Initiative Documents";
		} else {
			getfolderurl = host + "/" + listkey + " Documents/";
			DocumentLibraryName = listkey + " Documents";
		}

		$(".cr-related-item-section .form-control:disabled").each(function () {
			if ($(this).val() != "") {
				$(this).parent().addClass("autofill");
			}
		});
		$(".cr-related-item-section .PPField[disabled]").each(function () {
			if ($(this).text() != enternameemail) {
				$(this).addClass("autofill");
			}
		});
		$(
			"div#particles-foreground, div#particles-background, .vertical-centered-box"
		).animate(
			{
				opacity: 0,
			},
			{
				duration: 333,
				complete: function () {
					$(
						"div#particles-foreground, div#particles-background, .vertical-centered-box"
					).remove();

					// $('div#particles-foreground, div#particles-background, .vertical-centered-box').hide();
				},
			}
		);
	},
	// Global variables
	g: {
		append: function () {
			$(".o365cs-nav-header16 .o365cs-nav-o365Branding").html(
				'<div class="Logo"><a href=""><img class="img-Logo" src="' +
				mainLogo +
				'"></a></div>'
			);
			$(".o365cs-nav-centerAlign").append(
				'<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="10"></i><a href="#">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="10"></i><a href="#">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="30"></i><a href="#">Issues</a></span></div><div class="UProfile"></div></div>'
			);
		},
		budgetitem: function () {
			$("#From, #To").on("change", function () {
				var yearFrom = $("#From").val() ? $("#From").val().split("-")[0] : "",
					dateFromFull = $("#From").val(),
					yearTo = $("#To").val() ? $("#To").val().split("-")[0] : "";
				var yearDiff = yearTo ? parseInt(yearTo) - parseInt(yearFrom) + 1 : "";
				yearFrom = parseInt(yearFrom) + 4;

				if (yearFrom) {
					$("#To")
						.attr("max", String(yearFrom) + "-12-31")
						.attr("min", dateFromFull)
						.prop("disabled", false);
					if (yearDiff) {
						$("[id^=Cost]").parent().hide();
						$("[id^=Cost]").val("");
						$("#Amount").val("");
						var yeartodisp;
						for (var i = 1; i <= yearDiff; i++) {
							yeartodisp = yearFrom - 5 + i;
							$("#Cost" + i)
								.parent()
								.show();
							if (
								localStorage.getItem("lng") == "null" ||
								localStorage.getItem("lng") == "ar"
							) {
								var label =
									$("#Cost" + i)
										.parent()
										.find("label")
										.text()
										.indexOf("لعام") > -1
										? $("#Cost" + i)
											.parent()
											.find("label")
											.text()
											.split("لعام")[0] +
										" لعام " +
										yeartodisp
										: $("#Cost" + i)
											.parent()
											.find("label")
											.text() +
										" لعام " +
										yeartodisp;
							} else {
								var label =
									$("#Cost" + i)
										.parent()
										.find("label")
										.text()
										.indexOf("For Year") > -1
										? $("#Cost" + i)
											.parent()
											.find("label")
											.text()
											.split("For Year")[0] +
										" For Year " +
										yeartodisp
										: $("#Cost" + i)
											.parent()
											.find("label")
											.text() +
										" For Year " +
										yeartodisp;
							}
							$("#Cost" + i)
								.parent()
								.find("label")
								.text(label);
						}
					}
				} else {
					$("#To")
						.val("")
						.attr("max", "")
						.attr("min", "")
						.prop("disabled", true);
					$("[id^=Cost]").parent().hide();
					$("[id^=Cost]").val("");
					$("#Amount").val("");
				}
			});
			var yearFrom = $("#From").val() ? $("#From").val().split("-")[0] : "",
				dateFromFull = $("#From").val(),
				yearTo = $("#To").val() ? $("#To").val().split("-")[0] : "";
			var yearDiff = yearTo ? parseInt(yearTo) - parseInt(yearFrom) + 1 : "";
			yearFrom = parseInt(yearFrom) + 2;
			if (yearFrom) {
				$("#To")
					.attr("max", String(yearFrom) + "-12-31")
					.attr("min", dateFromFull)
					.prop("disabled", false);
				if (yearDiff) {
					$("[id^=Cost]").parent().hide();
					var yeartodisp;
					for (var i = 1; i <= yearDiff; i++) {
						yeartodisp = yearFrom - 3 + i;
						$("#Cost" + i)
							.parent()
							.show();
						if (
							localStorage.getItem("lng") == "null" ||
							localStorage.getItem("lng") == "ar"
						) {
							var label =
								$("#Cost" + i)
									.parent()
									.find("label")
									.text()
									.indexOf("لعام") > -1
									? $("#Cost" + i)
										.parent()
										.find("label")
										.text()
										.split("لعام")[0] +
									" لعام " +
									yeartodisp
									: $("#Cost" + i)
										.parent()
										.find("label")
										.text() +
									" لعام " +
									yeartodisp;
						} else {
							var label =
								$("#Cost" + i)
									.parent()
									.find("label")
									.text()
									.indexOf("For Year") > -1
									? $("#Cost" + i)
										.parent()
										.find("label")
										.text()
										.split("For Year")[0] +
									" For Year " +
									yeartodisp
									: $("#Cost" + i)
										.parent()
										.find("label")
										.text() +
									" For Year " +
									yeartodisp;
						}
						$("#Cost" + i)
							.parent()
							.find("label")
							.text(label);
					}
				}
			} else {
				$("#To").val("").attr("max", "").attr("min", "").prop("disabled", true);
				$("[id^=Cost]").parent().hide();
			}
		},
		showFieldsIfInitiativeVision: function () {
			var typeValue = $("#Types option:selected").val();
			if (typeValue == "vision") {
				$("#RelatedBudgetItem , #ProgramTotalCost,#RelatedKPI")
					.parent()
					.css("display", "block");
			} else {
				$("#RelatedBudgetItem , #ProgramTotalCost,#RelatedKPI")
					.parent()
					.css("display", "none");
			}
			if (isNew || isEdit) {
				$("#Types").on("change", function () {
					var typeValueafterchange = $("#Types option:selected").val();
					if (typeValueafterchange == "vision") {
						$("#RelatedBudgetItem , #ProgramTotalCost , #RelatedKPI")
							.parent()
							.css("display", "block");
					} else {
						$("#RelatedBudgetItem , #ProgramTotalCost , #RelatedKPI")
							.parent()
							.css("display", "none");
					}
				});
			}
		},
	},
};
//! on View
window.CrItemDataRenderFromJSON_View = {
	init: function () {

		var fieldType = "";
		var $this;
		var originalValue = "";
		var newValue = "";
		var value = "";

		changeRequestBody.forEach(function (o, i, a) {

			if (o.InternalName) {

				$this = $(".cr-related-item-section #" + o.InternalName);
				fieldType = $this.attr("type");
				value = o.value ? o.value : o.originalValue;
				isOriginalValue = value == originalValue ? true : false;
				if (o.isChanged) {
					$this.parent().addClass("crHighlight");
					$this.parent().attr("data-toggle", "tooltip");
					$this.parent().attr("data-placement", isArabic ? "right" : "left");
					$this.parent().attr("title", o.originalValue);
				}
				switch (o.type) {
					case "datetime":
						var d = value == "null" ? "empty" : new Date(value);
						if (d != "empty") {
							var local = d.getTime();
							var offset = d.getTimezoneOffset() * (60 * 1000);
							var utc = new Date(local + offset);
							var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
							var datetouse = riyadh
								.toLocaleString("en-US")
								.split(",")[0]
								.split("/");
							datetouse[0] =
								datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
							datetouse[1] =
								datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
							var datetouse2 =
								datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];
							if ($this.hasClass("withTime")) {
								var hour = d.getHours();
								var minutes = d.getMinutes();
								var timehour = hour + ":" + minutes + ":00";
								$("#Time").val("" + timehour);
							}
						}

						$this.text(datetouse2);
						break;

					case "datetime-local":
						var d = value == "null" ? "empty" : new Date(value);
						if (d != "empty") {
							var local = d.getTime();
							var offset = d.getTimezoneOffset() * (60 * 1000);
							var utc = new Date(local + offset);
							var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
							var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
							var datetouse = riyadh
								.toLocaleString("en-US")
								.split(",")[0]
								.split("/");
							var hourtouse = riyadh
								.toLocaleString("en-US")
								.split(",")[1]
								.split(":");
							hourtouse[0] =
								$.trim(hourtouse[0]).length == 1
									? "0" + $.trim(hourtouse[0])
									: $.trim(hourtouse[0]);
							hourtouse[1] =
								$.trim(hourtouse[1]).length == 1
									? "0" + $.trim(hourtouse[1])
									: $.trim(hourtouse[1]);
							datetouse[0] =
								datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
							datetouse[1] =
								datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
							var datetouse2 =
								datetouse[2] +
								"-" +
								datetouse[0] +
								"-" +
								datetouse[1] +
								"T" +
								hourtouse[0] +
								":" +
								hourtouse[1];
						}
						$this.text(datetouse2);
						break;

					case "picker":
						//
						var pemail;
						if (isOriginalValue) {
							pemail = value == "null" ? enternameemail : value.get_lookupValue();
						} else {
							pemail = !value ? enternameemail : value.$5c_1;
						}

						$this.attr("data-email", pemail);

						var idinternal = $this.attr("id");
						var mp = new MyPeoplePicker();
						mp.init($this.attr("id"), { AllowMultipleValues: false });
						break;

					case "dropdown":
						$this.text(value);
						if ($this.attr("id") == "SubSector") {
							departmenetValue = value;
						}
						if ($this.attr("id") == "BudgetItem") {
							budgetitemValue = value;
						}

						break;

					case "radio":
						var radioval = value;
						if (radioval == "Yes" || radioval == "yes") {
							$('input[id="' + $this.attr("id") + '"]')
								.filter('[value="yes"]')
								.attr("checked", true);
						} else if (
							radioval == "No" ||
							radioval == "no" ||
							radioval == "undefined" ||
							radioval == "null"
						) {
							$('input[id="' + $this.attr("id") + '"]')
								.filter('[value="no"]')
								.attr("checked", true);
						} else
							$('input[id="' + $this.attr("id") + '"]')
								.filter('[value="' + value + '"]')
								.attr("checked", true);
						break;

					case "checkbox":
						if (value) $this.prop("checked", true);
						break;

					case "multiselect":
						if (value) {
							var myselections = value.split(":::");
							for (var i = 0; i < myselections.length; i++) {
								$this
									.find("input:checkbox[value='" + myselections[i] + "']")
									.prop("checked", true);
							}
						}
						break;

					case "number":
						if ($this.hasClass("percentagefield")) {
							var num = eval(value) * 100;
							if (num % 1 != 0)
								$this.text(parseFloat(Math.round(num * 100) / 100).toFixed(2));
							else $this.text(num);
						} else {
							$this.text(value);
						}
						break;
					case "richtext":
						var HTMLContent = value;
						HTMLContent
							? $this.html(HTMLContent.replaceAll('href="/TOREMOVE', "href="))
							: "";
						break;
					default:
						$this.text(value);
						break;
				}
			}
		});
		$('[data-toggle="tooltip"]').tooltip();
		$(
			"div#particles-foreground, div#particles-background, .vertical-centered-box"
		).animate(
			{
				opacity: 0,
			},
			{
				duration: 333,
				complete: function () {
					$(
						"div#particles-foreground, div#particles-background, .vertical-centered-box"
					).remove();

					// $('div#particles-foreground, div#particles-background, .vertical-centered-box').hide();
				},
			}
		);
	},
	// Global variables
	g: {},
};
//! can be used on new and edit
window.CrSetChangeBody = {
	init: function (Data_Submit) {
		var jsonValues;

		if (USERisNew) {

			Data_Submit.set_item("RelatedItemCode", crRelatedItemCode);
			if (!isGeneral) {
				jsonValues = eval(
					$('[data-togglename*="UpdateType"]:visible')
						.find("option:checked")
						.data("fieldsvalue")
				);
			}
		}
		changeRequestBody.forEach(function (o, i, a) {


			var $this = $(".cr-related-item-section #" + o.InternalName);
			let newJsonValues = jsonValues ? jsonValues : Information_Form;

			// change on it to be validation on multi json values not only for one value
			newJsonValues.forEach(element => {

				if (element.hasOwnProperty("subFields")) { // if there is subfields
					element.subFields.forEach(item => {
						if (item.InternalName == o.InternalName) {
							o.DisplayName = item.DisplayName || ""
							o.DisplayNameEn = item.DisplayNameEn || ""
							o.label = item.label || ""
							o.labelEn = item.labelEn || ""
							o.type = item.type || ""
							o.InternalName = item.InternalName || "";

							if (o.type == "picker") {
								if ($this.find("span.sp-peoplepicker-userSpan").length) {
									var id = $this.attr("INppicker");
									var ppp =
										$this.find("span.sp-peoplepicker-userSpan").attr("sid") == undefined
											? ""
											: SP.FieldUserValue.fromUser(
												$this
													.find("span.sp-peoplepicker-userSpan")
													.attr("sid")
													.split("|")
													.slice(-1)[0]
											);

									o.value = ppp;
									// o.value = "";

								}
							} else if (o.type == "datetime") {
								if ($this.hasClass("withTime")) {
									var dateval = $this.val();
									var timeval = $this.closest(".CFIELD").find("#Time").val();
									var datetime = new Date(dateval);
									// format the output
									var month = datetime.getMonth() + 1;
									var day = datetime.getDate();
									var year = datetime.getFullYear();
									var timezoneOffset = datetime.getTimezoneOffset() / 60;
									var hour = datetime.getHours() + timezoneOffset;
									if (hour < 10) {
										hour = "0" + hour;
									}
									var min = datetime.getMinutes();
									if (min < 10) {
										min = "0" + min;
									}
									var sec = datetime.getSeconds();
									if (sec < 10) {
										sec = "0" + sec;
									}

									var ydate =
										month + "/" + day + "/" + year + " " + hour + ":" + min + ":" + sec;

									if (dateval && timeval)
										New_Data_Submit.g.oListItem.set_item($this.attr("id"), ydate);
								} else {
									var dateval = $this.val().replace("-", "/");
									var ydate = !dateval
										? ""
										: [dateval.slice(5, 10), dateval.slice(0, 4)]
											.join("/")
											.replace("-", "/");
									if (dateval) o.value = ydate;
								}
							} else if (o.type == "datetime-local") {
								if ($this.hasClass("withTime")) {
									var dateval = $this.val();
									var datetime = new Date(dateval);
									console.log("datetime", datetime);
									// format the output
									var month = datetime.getMonth() + 1;
									var day = datetime.getDate();
									var year = datetime.getFullYear();
									var timezoneOffset = datetime.getTimezoneOffset() / 60;
									var hour = datetime.getHours() + timezoneOffset;
									if (hour < 10) {
										hour = "0" + hour;
									}
									var min = datetime.getMinutes();
									if (min < 10) {
										min = "0" + min;
									}
									var sec = datetime.getSeconds();
									if (sec < 10) {
										sec = "0" + sec;
									}

									var ydate =
										month + "/" + day + "/" + year + " " + hour + ":" + min + ":" + sec;

									if (dateval) o.value = ydate;
								}
							} else if (o.type == "radio") {
								var checkedvalue = $(
									'input[id="' + $this.attr("id") + '"]:checked'
								).val();
								if (checkedvalue == "yes") {
									o.value = "yes";
								} else if (checkedvalue == "no") {
									o.value = "no";
								} else o.value = checkedvalue;

								if (SP_ListName == "Deliverables" && checkedvalue == "yes") {
									o.value = DVfirstStage;
								}
							} else if (o.type == "checkbox") {
								var checkedvalue = $(
									'input[id="' + $this.attr("id") + '"]:checked'
								).length;
								if (checkedvalue) o.value = true;
								else o.value = false;
							} else if (o.type == "dropdown") {
								o.value = $this.val();
							} else if ($this.hasClass("percentagefield")) {
								o.value = $this.val() / 100;
							} else if (o.type == "multiselect") {
								var myselections = [];
								$this.find("input#Revenue:checked").each(function () {
									myselections.push($this.val());
								});
								myselections = myselections.join(":::");
								o.value = myselections;
							} else if (o.type == "richtext") {
								var HTMLContent = $this.html();
								HTMLContent ? (o.value = HTMLContent) : "";
							} else o.value = $this.val();


							o.isChanged = o.value != o.originalValue;
						}
					})
				} else {
					element.forEach(item => {
						if (item.InternalName == o.InternalName) {
							o.DisplayName = item.DisplayName || ""
							o.DisplayNameEn = item.DisplayNameEn || ""
							o.label = item.label || ""
							o.labelEn = item.labelEn || ""
							o.type = item.type || ""
							o.InternalName = item.InternalName || "";

							if (o.type == "picker") {
								if ($this.find("span.sp-peoplepicker-userSpan").length) {
									var id = $this.attr("INppicker");
									var ppp =
										$this.find("span.sp-peoplepicker-userSpan").attr("sid") == undefined
											? ""
											: SP.FieldUserValue.fromUser(
												$this
													.find("span.sp-peoplepicker-userSpan")
													.attr("sid")
													.split("|")
													.slice(-1)[0]
											);

									o.value = ppp;
									// o.value = "";

								}
							} else if (o.type == "datetime") {
								if ($this.hasClass("withTime")) {
									var dateval = $this.val();
									var timeval = $this.closest(".CFIELD").find("#Time").val();
									var datetime = new Date(dateval);
									// format the output
									var month = datetime.getMonth() + 1;
									var day = datetime.getDate();
									var year = datetime.getFullYear();
									var timezoneOffset = datetime.getTimezoneOffset() / 60;
									var hour = datetime.getHours() + timezoneOffset;
									if (hour < 10) {
										hour = "0" + hour;
									}
									var min = datetime.getMinutes();
									if (min < 10) {
										min = "0" + min;
									}
									var sec = datetime.getSeconds();
									if (sec < 10) {
										sec = "0" + sec;
									}

									var ydate =
										month + "/" + day + "/" + year + " " + hour + ":" + min + ":" + sec;

									if (dateval && timeval)
										New_Data_Submit.g.oListItem.set_item($this.attr("id"), ydate);
								} else {
									var dateval = $this.val().replace("-", "/");
									var ydate = !dateval
										? ""
										: [dateval.slice(5, 10), dateval.slice(0, 4)]
											.join("/")
											.replace("-", "/");
									if (dateval) o.value = ydate;
								}
							} else if (o.type == "datetime-local") {
								if ($this.hasClass("withTime")) {
									var dateval = $this.val();
									var datetime = new Date(dateval);
									console.log("datetime", datetime);
									// format the output
									var month = datetime.getMonth() + 1;
									var day = datetime.getDate();
									var year = datetime.getFullYear();
									var timezoneOffset = datetime.getTimezoneOffset() / 60;
									var hour = datetime.getHours() + timezoneOffset;
									if (hour < 10) {
										hour = "0" + hour;
									}
									var min = datetime.getMinutes();
									if (min < 10) {
										min = "0" + min;
									}
									var sec = datetime.getSeconds();
									if (sec < 10) {
										sec = "0" + sec;
									}

									var ydate =
										month + "/" + day + "/" + year + " " + hour + ":" + min + ":" + sec;

									if (dateval) o.value = ydate;
								}
							} else if (o.type == "radio") {
								var checkedvalue = $(
									'input[id="' + $this.attr("id") + '"]:checked'
								).val();
								if (checkedvalue == "yes") {
									o.value = "yes";
								} else if (checkedvalue == "no") {
									o.value = "no";
								} else o.value = checkedvalue;

								if (SP_ListName == "Deliverables" && checkedvalue == "yes") {
									o.value = DVfirstStage;
								}
							} else if (o.type == "checkbox") {
								var checkedvalue = $(
									'input[id="' + $this.attr("id") + '"]:checked'
								).length;
								if (checkedvalue) o.value = true;
								else o.value = false;
							} else if (o.type == "dropdown") {
								o.value = $this.val();
							} else if ($this.hasClass("percentagefield")) {
								o.value = $this.val() / 100;
							} else if (o.type == "multiselect") {
								var myselections = [];
								$this.find("input#Revenue:checked").each(function () {
									myselections.push($this.val());
								});
								myselections = myselections.join(":::");
								o.value = myselections;
							} else if (o.type == "richtext") {
								var HTMLContent = $this.html();
								HTMLContent ? (o.value = HTMLContent) : "";
							} else o.value = $this.val();


							o.isChanged = o.value != o.originalValue;
						}
					})
				}
			})
			if (i == a.length - 1) {
				Data_Submit.set_item("ChangeBody", JSON.stringify(changeRequestBody));
			}
		});
	},
};
// cr execution
window.executeCR = {
	init: function (crBody) {
		if (crBody.length) {
			debugger
			var clientContext = new SP.ClientContext.get_current();
			var oList = clientContext
				.get_web()
				.get_lists()
				.getByTitle(crBody[0].listName);
			executeCR.g.oListItem = oList.getItemById(crBody[0].itemId);
			var value = "";
			var isOriginalValue = false;
			crBody.forEach((o, i, a) => {
				value = o.value ? o.value : o.originalValue;
				if (o.type == "picker") {
					executeCR.g.oListItem.set_item(
						o.InternalName,
						SP.FieldUserValue.fromUser(value.$5c_1)
					);
				} else if (o.type == "multipicker") {
					executeCR.g.oListItem.set_item(o.InternalName, value);
				} else if (o.type == "datetime") {
					executeCR.g.oListItem.set_item(o.InternalName, new Date(value));
				} else if (o.type == "datetime-local") {
					executeCR.g.oListItem.set_item(o.InternalName, new Date(value));
				} else if (o.type == "radio") {
					executeCR.g.oListItem.set_item(o.InternalName, value);
				} else if (o.type == "checkbox") {
					executeCR.g.oListItem.set_item(o.InternalName, eval(value));
				} else if (o.type == "dropdown") {
					executeCR.g.oListItem.set_item(o.InternalName, value);
				}
				// else if ($(this).hasClass("percentagefield")) {
				// 	executeCR.g.oListItem.set_item(
				// 		$(this).attr("id"),
				// 		$(this).val() / 100
				// 	);
				// }
				else if (o.type == "multiselect") {
					executeCR.g.oListItem.set_item(o.InternalName, value);
				}
				// else if (o.type == "richtext") {
				// 	var HTMLContent = $(this).html();
				// 	HTMLContent
				// 		? executeCR.g.oListItem.set_item($(this).attr("id"), HTMLContent)
				// 		: "";
				// }
				else executeCR.g.oListItem.set_item(o.InternalName, value);

				// if (globalStateSubmitField) items.set_item("WFStage", nxtstageid);
				// else items.set_item("WFStage", prvstageid);
			});
			executeCR.g.oListItem.update();
			clientContext.load(executeCR.g.oListItem);
			clientContext.executeQueryAsync(
				Function.createDelegate(this, function () {
					// alert("cr execution done");
					Task_Edit_Data.init();
				}),
				Function.createDelegate(this, function (sender, args) {
					console.log(
						"Request failed. " +
						args.get_message() +
						"\n" +
						args.get_stackTrace()
					);
				})
			);
		}
	},
	g: {},
};


//master Data
var CR_Master_Details_Request = {
	// The main Initialization function
	init: function (DetailsList) {


		var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext.get_web().get_lists().getByTitle(DetailsList);
		CR_Master_Details_Request.g.DetailsList = DetailsList;
		var camlQuery = new SP.CamlQuery();
		camlQuery.set_viewXml(
			'<View><Query><Where><And><Eq><FieldRef Name="MasterID" /><Value Type="Text">' +
			RID +
			'</Value></Eq><Eq><FieldRef Name="MasterKey" /><Value Type="Text">' +
			RListKey +
			"</Value></Eq></And></Where><OrderBy><FieldRef Name='Created' Ascending='True' /></OrderBy></Query></View>"
		);
		CR_Master_Details_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
		clientContext.load(CR_Master_Details_Request.g.collListItem);
		clientContext.executeQueryAsync(
			Function.createDelegate(this, CR_Master_Details_Request.onSuccess),
			Function.createDelegate(this, CR_Master_Details_Request.onError)
		);
	},
	onSuccess: function (sender, args) {

		var collListItem = CR_Master_Details_Request.g.collListItem;

		var listItemEnum = collListItem.getEnumerator();
		var CurrList = CR_Master_Details_Request.g.DetailsList,
			FieldsToRender = $(
				'[data-target_list="' +
				CurrList +
				'"] .fieldset-container .Details-Item'
			).html(),
			HTMLtoAppend,
			MyValues = [];

		if (collListItem.getEnumerator().$2J_0 > 0) {
			//check if any items are returned we can use .getEnumerator().moveNext() //true
			$('[data-target_list="' + CurrList + '"] .fieldset-container').html(""); //remove html
		}
		while (listItemEnum.moveNext()) {

			console.log("in while");
			debugger
			var oListItem = listItemEnum.get_current();
			HTMLtoAppend = "";
			HTMLtoAppend +=
				'<div class="Details-Item EditItem" data-ID="' +
				oListItem.get_id() +
				'" data-masterkey="' +
				oListItem.get_item("MasterKey") +
				'">';
			HTMLtoAppend += FieldsToRender;
			HTMLtoAppend += "</div>";


			if (HTMLtoAppend)
				$('[data-target_list="' + CurrList + '"] .fieldset-container').append(
					HTMLtoAppend
				);
			//show data
			//isView
			if (false) {
				$(
					'[data-target_list="' +
					CurrList +
					'"] [data-ID="' +
					oListItem.get_id() +
					'"] > .CFIELD > .viewmode-value'
				).each(function () {

					if ($(this).attr("type") == "date") {
						var d =
							oListItem.get_item("" + $(this).attr("id") + "") == null
								? "empty"
								: oListItem.get_item("" + $(this).attr("id") + "");
						if (d != "empty") {
							var local = d.getTime();
							var offset = d.getTimezoneOffset() * (60 * 1000);
							var utc = new Date(local + offset);
							var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
							var datetouse = riyadh
								.toLocaleString("en-US")
								.split(",")[0]
								.split("/");
							datetouse[0] =
								datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
							datetouse[1] =
								datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
							if (
								localStorage.getItem("lng") == null ||
								localStorage.getItem("lng") == "ar"
							) {
								var datetouse2 =
									datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];
							} else {
								var datetouse2 =
									datetouse[1] + "-" + datetouse[0] + "-" + datetouse[2];
							}

							if ($(this).hasClass("withTime")) {
								var hour = d.getHours();
								var minutes = d.getMinutes();
								var meridian;
								if (hour > 12) {
									meridian = "PM";
									hour -= 12;
								} else if (hour < 12) {
									meridian = "AM";
									if (hour == 0) {
										hour = 12;
									}
								} else {
									meridian = "PM";
								}
								var timehour = hour + ":" + minutes + ":" + meridian;
								$("#Time").text(timehour);
							}
						}
						$(this).text(datetouse2);
					} else if ($(this).attr("type") == "picker") {
						var pp =
							oListItem.get_item("" + $(this).attr("id") + "") == null
								? No_Data
								: oListItem
									.get_item("" + $(this).attr("id") + "")
									.get_lookupValue();
						$(this).text(pp);
					} else if ($(this).attr("type") == "dropdown") {
						var value =
							oListItem.get_item("" + $(this).attr("id") + "") == null
								? No_Data
								: oListItem.get_item("" + $(this).attr("id") + "");
						if (
							localStorage.getItem("lng") == null ||
							localStorage.getItem("lng") == "ar"
						) {
							$(this).text(Resources.ar[value]);
						} else $(this).text(Resources.en[value]);
					} else if ($(this).attr("type") == "radio") {
						var value =
							oListItem.get_item("" + $(this).attr("id") + "") == null
								? "no"
								: oListItem.get_item("" + $(this).attr("id") + "");
						$(this).text(value);
					} else if ($(this).attr("type") == "checkbox") {
						var value =
							oListItem.get_item("" + $(this).attr("id") + "") == null
								? No_Data
								: oListItem.get_item("" + $(this).attr("id") + "");
						if (value)
							if (
								localStorage.getItem("lng") == null ||
								localStorage.getItem("lng") == "ar"
							) {
								$(this).text(Resources.ar["yes"]);
							} else $(this).text(Resources.en["yes"]);
						else if (
							localStorage.getItem("lng") == null ||
							localStorage.getItem("lng") == "ar"
						) {
							$(this).text(Resources.ar["no"]);
						} else $(this).text(Resources.en["no"]);
					} else if ($(this).attr("type") == "percentage") {
						var num =
							oListItem.get_item("" + $(this).attr("id") + "") == null
								? No_Data
								: oListItem.get_item($(this).attr("id")) * 100;
						if (num % 1 != 0)
							$(this).text(parseFloat(Math.round(num * 100) / 100).toFixed(2));
						else $(this).text(num);
					} else if (
						$(this).attr("type") == "number" ||
						$(this).attr("type") == "float"
					) {
						var value =
							oListItem.get_item("" + $(this).attr("id") + "") == null
								? No_Data
								: oListItem.get_item("" + $(this).attr("id") + "");

						$(this).text(
							value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
						);
					} else if ($(this).attr("type") == "multiselect") {
						// var value =
						//   oListItem.get_item("" + $(this).attr("id") + "") == null
						//     ? No_Data
						//     : oListItem
						//       .get_item("" + $(this).attr("id") + "")
						//       .split(":::")
						//       .join("; <br>");

						// $(this).html(value);

						// to get the name of multi select in master details
						var valfieldkey = $(this).data("valfieldkey"),
							Dispfieldkey = $(this).data("dispfieldkey"),
							listname = $(this).data("listname"),
							$this = $(this);

						var listFields = ["ID", valfieldkey, Dispfieldkey];


						var value =
							oListItem.get_item("" + $(this).attr("id") + "") == null
								? No_Data
								: oListItem
									.get_item("" + $(this).attr("id") + "")
									.split(":::")

						var customquerymulti =
							'<View><Query><Where><And><Neq><FieldRef Name=\'DeletionStatus\' /><Value Type=\'Text\'>Deleted</Value></Neq><In><FieldRef Name="' + valfieldkey + '" /><Values>';
						for (var i = 0; i <= value.length; i++) {
							customquerymulti += '<Value Type="Text">' + value[i] + '</Value>';
						}
						customquerymulti += "</Values></In></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>100</RowLimit></View>";



						sphttp.get(
							_spPageContextInfo.siteServerRelativeUrl,
							listname,
							customquerymulti,
							listFields,
							function (records, record, listItem, isDone) {
								if (isDone) {
									var items = ''
									records.forEach(function (el, index) {

										items += el[Dispfieldkey] + '<br>'


									});
									$this.html(items);
								}
							}
						);
					} else if ($(this).attr("type") == "lookup") {
						var valfieldkey = $(this).data("valfieldkey"),
							Dispfieldkey = $(this).data("dispfieldkey"),
							listname = $(this).data("listname"),
							$this = $(this),
							customquery =
								'<View><Query><Where><Eq><FieldRef Name="' +
								$(this).data("valfieldkey") +
								'" /><Value Type="Text">' +
								oListItem.get_item($(this).attr("id")) +
								"</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>";
						sphttp.get(
							_spPageContextInfo.siteServerRelativeUrl,
							listname,
							customquery,
							[valfieldkey, Dispfieldkey],
							function (records, record, listItem, isDone) {
								if (isDone) {
									records.forEach(function (el, index) {
										$this.html(el[Dispfieldkey]);
									});
								}
							}
						);
					} else {
						var value =
							oListItem.get_item("" + $(this).attr("id") + "") == null
								? No_Data
								: oListItem.get_item("" + $(this).attr("id") + "");
						$(this).text(value);
					}
				});
			}
			else if (true) {

				$(
					'[data-target_list="' +
					CurrList +
					'"] [data-ID="' +
					oListItem.get_id() +
					'"] > .CFIELD:not(.dont-submit):not(.dont-request)> input,' +
					'[data-target_list="' +
					CurrList +
					'"] [data-ID="' +
					oListItem.get_id() +
					'"] > .CFIELD:not(.dont-submit):not(.dont-request)> div[type=picker],' +
					'[data-target_list="' +
					CurrList +
					'"] [data-ID="' +
					oListItem.get_id() +
					'"] > .CFIELD:not(.dont-submit):not(.dont-request)> select[type=dropdown],' +
					'[data-target_list="' +
					CurrList +
					'"] [data-ID="' +
					oListItem.get_id() +
					'"] > .CFIELD:not(.dont-submit):not(.dont-request)>  textarea,' +
					///////////////////////
					//////////////////////
					'[data-target_list="' +
					CurrList +
					'"] [data-ID="' +
					oListItem.get_id() +
					'"] > .CFIELD:not(.dont-submit):not(.dont-request) > .multiselect-container'
				).each(function () {
					debugger
					switch ($(this).attr("type")) {
						case "date":
							var d =
								oListItem.get_item("" + $(this).attr("id") + "") == null
									? "empty"
									: oListItem.get_item("" + $(this).attr("id") + "");
							if ($(this).hasClass("withTime")) {
								console.log("asd", d);
							} else {
								if (d != "empty") {
									var local = d.getTime();
									var offset = d.getTimezoneOffset() * (60 * 1000);
									var utc = new Date(local + offset);
									var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
									var datetouse = riyadh
										.toLocaleString("en-US")
										.split(",")[0]
										.split("/");
									datetouse[0] =
										datetouse[0].length == 1
											? "0" + datetouse[0]
											: datetouse[0];
									datetouse[1] =
										datetouse[1].length == 1
											? "0" + datetouse[1]
											: datetouse[1];
									var datetouse2 =
										datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];

									if ($(this).hasClass("withTime")) {
										var hour = d.getHours();
										var minutes = d.getMinutes();
										var meridian;
										if (hour > 12) {
											meridian = "PM";
											hour -= 12;
										} else if (hour < 12) {
											meridian = "AM";
											if (hour == 0) {
												hour = 12;
											}
										} else {
											meridian = "PM";
										}
										var timehour = hour + ":" + minutes + ":" + meridian;
										$("#Time").text(timehour);
									}
								}
							}

							$(this).val(datetouse2);
							break;
						case "datetime-local":
							var d =
								oListItem.get_item("" + $(this).attr("id") + "") == null
									? "empty"
									: oListItem.get_item("" + $(this).attr("id") + "");

							if (d != "empty") {
								var local = d.getTime();
								var offset = d.getTimezoneOffset() * (60 * 1000);
								var utc = new Date(local + offset);
								var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
								var datetouse = riyadh
									.toLocaleString("en-US")
									.split(",")[0]
									.split("/");
								datetouse[0] =
									datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
								datetouse[1] =
									datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
								var datetouse2 =
									datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];
							}

							$(this).val(datetouse2);
							break;

						case "picker":
							var pemail =
								oListItem.get_item("" + $(this).attr("id") + "") == null
									? enternameemail
									: oListItem
										.get_item("" + $(this).attr("id") + "")
										.get_lookupValue();
							$(this).attr("data-email", pemail);

							if (pemail != enternameemail)
								$(this).attr(
									"user-email",
									oListItem.get_item($(this).attr("id")).get_email()
								);

							var idinternal = $(this).attr("id");
							var mp = new MyPeoplePicker();
							mp.init($(this).attr("id"), { AllowMultipleValues: false });
							break;
						case "dropdown":
							$(this).val(oListItem.get_item("" + $(this).attr("id") + ""));
							break;

						case "radio":
							$('input[id="' + $(this).attr("id") + '"]')
								.filter(
									'[value="' + oListItem.get_item($(this).attr("id")) + '"]'
								)
								.attr("checked", true);
							break;

						case "checkbox":
							if (oListItem.get_item($(this).attr("id")))
								$(this).prop("checked", true);
							break;

						case "multiselect":
							if (oListItem.get_item($(this).attr("myfield"))) {
								var myselections = oListItem
									.get_item($(this).attr("myfield"))
									.split(":::");
								for (var i = 0; i < myselections.length; i++) {
									$(this)
										.find("input:checkbox[value='" + myselections[i] + "']")
										.prop("checked", true);
								}
							}
							break;

						case "number":

							if ($(this).hasClass("percentagefield")) {
								var num = oListItem.get_item($(this).attr("id")) * 100;
								if (num % 1 != 0)
									$(this).val(
										parseFloat(Math.round(num * 100) / 100).toFixed(2)
									);
								else $(this).val(num);
							} else {
								$(this).val(oListItem.get_item("" + $(this).attr("id") + ""));
							}

							if ((listkey == 'initiatives' || listkey == 'projects')) { // to handle amount in master details based on weight in project and initiative

								if (MasterDetailsArrayRequest.length == 0) {
									if ($("[data-targetelem]").length > 0) {
										$("[data-targetelem]").each(function () {
											var targetElem = $(this).data('targetelem')

											if (targetElem == 'Weight') {
												var parentValue = $(this).data('parentval')
												var weight = $(this).parent().parent().find(`#${targetElem}`).val()
												var maxAttr = $(this).parent().parent().find(`#${targetElem}`).attr('max')

												console.log(maxAttr, "$(this).parent().parent()")

												weight = Number(weight)
												var newMax = Number(maxAttr) + weight
												$(this).parent().parent().find(`#${targetElem}`).attr('max', newMax)

												var Amount = (weight * parentValue) / 100
												Amount = Amount.toFixed(2)
												$(this).val(Amount)
											}
										})
									}
								}
							}
							break;

						default:
							$(this).val(oListItem.get_item("" + $(this).attr("id") + ""));
							break;
					}
				});
			}
		}


		if (crMasterDetailsArrayRequest.length > 0) {
			CR_Master_Details_Request.init(crMasterDetailsArrayRequest[0]);
			crMasterDetailsArrayRequest.shift(); //remove 0 index
		}else{
			$(".cr-related-item-section .CFIELD").addClass("dont-submit"); // remove it to not apply dont-submit on all fields
		}


	},
	onError: function (sender, args) {
		console.log(
			"Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
		);
	},

	// Global variables
	g: {},
};