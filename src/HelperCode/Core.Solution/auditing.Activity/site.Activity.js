let monthFileName = new Date().toString().split(" ")[1],
	pagesFileNamePrefix = "Pages/Audit_Pages_",
	clickFileNamePrefix = "Click_Components/Audit_Click_Components_",
	viewFileNamePrefix = "View_Components/Audit_View_Components_",
	excelFilePath = "",
	excelFileExtension = ".csv",
	filePrefix = "";

let activityConfig =
	JSON.parse(localStorage.getItem("Dynamo_User Activity Configuration")) ||
	[],
	trackCountClicks = {},
	trackCountViews = {},
	activeModuleType,
	reportHeaders =
		"Site Id,Module Type,Item Type,User Id,User Full Name,User Email,Document Location,Occurred (GMT),Event,Event Source,Role Name, SP Group(s) Ids, SP Group(s),Platform,Device,Browser,Language \n";
let userBrowser = "";
let handleModuleActivity = (el) => {

	var context = SP.ClientContext.get_current();
	var dfd = $.Deferred();
	//Get list from host web
	var programList = context
		.get_web()
		.get_lists()
		.getByTitle("Activity Modules");
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml(
		`<View><Query><Where><Eq><FieldRef Name="ModuleCode"/><Value Type="Text">${el.code}</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>`
	);
	//Get items by Query
	var activityColl = programList.getItems(camlQuery);
	//Load item collection
	context.load(activityColl);
	context.executeQueryAsync(
		function () {
			var currentItemArray = [];

			//Check itemcollection count greater than 0
			if (activityColl.get_count() > 0) {

				activeModuleType = el.ModuleType;
				readExcelReport(); //!update excel report
				var activityEnum = activityColl.getEnumerator();
				while (activityEnum.moveNext()) {

					var currentItem = activityEnum.get_current();
					var currentId = currentItem.get_item("ID");
					var hits = currentItem.get_item("Hits") || 0;
					var numberOfClicks = currentItem.get_item("NumberOfClicks") || 0;
					var numberOfViews = currentItem.get_item("NumberOfViews") || 0;

					// var visitedBy = currentItem.get_item("VisitedBy") || [];
					// visitedBy.push(SP.FieldUserValue.fromUser(UserN.LoginName));
					// click count
					let temp = JSON.parse(sessionStorage.getItem("clickCounts"));
					let temp1 = temp ? temp[`${el.code}`] : 0;
					// view count
					let temp2 = JSON.parse(sessionStorage.getItem("viewCounts"));
					let temp3 = temp2 ? temp2[`${el.code}`] : 0;
					temp3 = numberOfViews + temp3;
					//Get Item by current ID
					var activityObject = programList.getItemById(currentId);
					//set
					// activityObject.set_item("VisitedBy", visitedBy);
					if (el.ModuleType == "Page")
						activityObject.set_item("Hits", hits + 1);

					if (el.ModuleType != "Component")
						activityObject.set_item("NumberOfClicks", numberOfClicks + temp1);
					//type component
					else activityObject.set_item("NumberOfViews", temp3);
					//

					if (temp) temp[`${el.code}`] = 0; //reset number of clicks
					sessionStorage.setItem("clickCounts", JSON.stringify(temp));
					//Update the item
					activityObject.update();
					//Push item on the array
					currentItemArray.push(activityObject);
					//Load the item Array
					context.load(currentItemArray[currentItemArray.length - 1]);
				}
				context.executeQueryAsync(
					function () {
						//Item Updated sucess
						dfd.resolve();
					},
					function (sender, args) {
						//Item updated fail
						console.log("Request Failed to get Items :" + args.get_message());
					}
				);
			} else {
				dfd.resolve();
			}
		},
		function (sender, args) {
			console.log("Request failed in List " + args.get_message());
		}
	);
	return dfd.promise();
};

let handleComponentModule = (el) => {
	const box = document.querySelector(el.ModuleIdentifier);
	document.querySelector("#s4-workspace").addEventListener(
		"scroll",
		function () {
			let temp = JSON.parse(sessionStorage.getItem("viewCounts"));
			if (elementInViewport(box)) {
				console.log("Element in view", el);
				if (!temp[`${el.code}`]) {
					let temp2 = JSON.parse(sessionStorage.getItem("viewCounts"));
					temp2[`${el.code}`] = temp2[`${el.code}`] + 1;
					sessionStorage.setItem("viewCounts", JSON.stringify(temp2));
					handleModuleActivity(el);
				}
			}
		},
		{
			passive: true,
		}
	);
};
let countViews = (el) => {
	trackCountViews[el.code] = 0;
	sessionStorage.setItem("viewCounts", JSON.stringify(trackCountViews));
	handleComponentModule(el);
};
let countClicks = (el) => {
	trackCountClicks[el.code] = 0;
	sessionStorage.setItem("clickCounts", JSON.stringify(trackCountClicks));
	if (el.ModuleType == "Page") {
		handleModuleActivity(el);
		// ! to be checked later
		// window.addEventListener("click", () => {
		// 	console.log("clicked");
		// 	let temp = JSON.parse(sessionStorage.getItem("clickCounts"));
		// 	temp[`${el.code}`] = temp[`${el.code}`] + 1;
		// 	sessionStorage.setItem("clickCounts", JSON.stringify(temp));
		// });
		// setInterval(function () {
		// 	let temp = JSON.parse(sessionStorage.getItem("clickCounts"));
		// 	if (temp[`${el.code}`]) {
		// 		handleModuleActivity(el);
		// 	}
		// }, 7000);
	} else {

		let element = document.querySelector(el.ModuleIdentifier);
		if (element) {
			element.addEventListener("click", () => {
				console.log("clicked");
				let temp = JSON.parse(sessionStorage.getItem("clickCounts"));
				temp[`${el.code}`] = temp[`${el.code}`] + 1;
				sessionStorage.setItem("clickCounts", JSON.stringify(temp));
				handleModuleActivity(el);
			});
		}
	}
};
//loop through configuration
let loopAuditingConfig = async () => {
	await Promise.all(
		activityConfig.map(async (el, i, a) => {
			if (el.ModuleType == "Page") {

				if (window.location.href.indexOf(el.ModuleURL) > -1) {
					// countClicks(el);

					handleModuleActivity(el);
				}
			} else if (el.ModuleType == "Button") {
				if (window.location.href.indexOf(el.ModuleURL) > -1) {

					countClicks(el);
				}
			} else if (el.ModuleType == "Component") {
				if (window.location.href.indexOf(el.ModuleURL) > -1) {
					countViews(el);
				}
			}
		})
	);
};

//ANCHOR
function elementInViewport(element) {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
		(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}
//! update excel report
function readExcelReport() {
	var clientContext;
	var oWebsite;
	var fileUrl;

	clientContext = new SP.ClientContext.get_current();
	oWebsite = clientContext.get_web();
	clientContext.load(oWebsite);
	// determine file name
	if (activeModuleType == "Page") filePrefix = pagesFileNamePrefix;
	if (activeModuleType == "Button") filePrefix = clickFileNamePrefix;
	if (activeModuleType == "Component") filePrefix = viewFileNamePrefix;
	excelFilePath = `${filePrefix + monthFileName + excelFileExtension}`;
	clientContext.executeQueryAsync(function () {
		fileUrl = `/Auditing%20Reports/${excelFilePath}`;
		$.ajax({
			url: fileUrl,
			type: "GET",
		})
			.done(Function.createDelegate(this, successHandler))
			.fail(Function.createDelegate(this, errorHandler));
	}, errorHandler);

	function successHandler(data) {
		// let temp = csvToArray(data);
		console.log(data.split("\n")[0]);
		setNewAuditingRow(data);
	}

	function errorHandler() {
		console.log("Request failed: " + arguments[2]);
		createExcelReport();
	}
}
function setNewAuditingRow(excelContent) {
	let newExcelContent;
	let siteId = _spPageContextInfo.siteId;
	let itemType = "Custom Page";
	let userId = UserN.Id;
	let userName = UserN.Title;
	let userEmail = UserN.Email;
	let documentLocation = window.location.href;
	let occuredGMT = new Date().toGMTString().replaceAll(",", ";");
	let event = activeModuleType == "Button" ? "Click" : "View";
	let eventSrc = "Custom Page";
	let roleName = currentUserRole;
	let spGroupsIds = GroupsIds.join(";");
	let spGroups = Groups.join(";");
	let platform = "Website";
	let device = navigator.userAgentData.mobile ? "Mobile" : "Desktop";
	let language =
		localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar"
			? "ar"
			: "en";
	newExcelContent = `${excelContent} ${siteId},${activeModuleType},${itemType},${userId},${userName},${userEmail},${documentLocation},${occuredGMT},${event},${eventSrc},${roleName},${spGroupsIds},${spGroups},${platform},${device},${userBrowser},${language} \n`;
	updateExcelReport(newExcelContent);
}
function updateExcelReport(content) {
	var clientContext;
	var oWebsite;
	var oList;
	var fileCreateInfo;
	var fileContent;

	clientContext = new SP.ClientContext.get_current();
	oWebsite = clientContext.get_web();
	oList = oWebsite.getFolderByServerRelativeUrl(
		`/Auditing%20Reports/${filePrefix.split("/")[0]}`
	);
	fileCreateInfo = new SP.FileCreationInformation();
	fileCreateInfo.set_url(
		`${filePrefix.split("/")[1] + monthFileName + excelFileExtension}`
	);
	fileCreateInfo.set_content(new SP.Base64EncodedByteArray());
	fileCreateInfo.set_overwrite(true);
	fileContent = content;

	for (var i = 0; i < fileContent.length; i++) {
		fileCreateInfo.get_content().append(fileContent.charCodeAt(i));
	}

	this.existingFile = oList.get_files().add(fileCreateInfo);

	clientContext.load(this.existingFile);
	clientContext.executeQueryAsync(
		Function.createDelegate(this, successHandler),
		Function.createDelegate(this, errorHandler)
	);

	function successHandler() {
		console.log("success");
	}

	function errorHandler() {
		console.log("Request failed: " + arguments[1].get_message());
	}
}
function createExcelReport() {
	var clientContext;
	var oWebsite;
	var oList;
	var fileCreateInfo;
	var fileContent;

	clientContext = new SP.ClientContext.get_current();
	oWebsite = clientContext.get_web();
	oList = oWebsite.getFolderByServerRelativeUrl(
		`/Auditing%20Reports/${filePrefix.split("/")[0]}`
	);

	fileCreateInfo = new SP.FileCreationInformation();
	fileCreateInfo.set_url(
		`${filePrefix.split("/")[1] + monthFileName + excelFileExtension}`
	);
	fileCreateInfo.set_content(new SP.Base64EncodedByteArray());
	fileContent = reportHeaders;

	for (var i = 0; i < fileContent.length; i++) {
		fileCreateInfo.get_content().append(fileContent.charCodeAt(i));
	}

	this.newFile = oList.get_files().add(fileCreateInfo);

	clientContext.load(this.newFile);
	clientContext.executeQueryAsync(
		Function.createDelegate(this, successHandler),
		Function.createDelegate(this, errorHandler)
	);

	function successHandler() {
		setNewAuditingRow(reportHeaders);
	}

	function errorHandler() {
		console.log("Request failed: " + arguments[1].get_message());
	}
}
//! use below function to make data from csv pretty and easy to handle
function csvToArray(str, delimiter = ",") {
	// slice from start of text to the first \n index
	// use split to create an array from string by delimiter
	const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

	// slice from \n index + 1 to the end of the text
	// use split to create an array of each csv value row
	const rows = str.slice(str.indexOf("\n") + 1).split("\n");

	// Map the rows
	// split values from each row into an array
	// use headers.reduce to create an object
	// object properties derived from headers:values
	// the object passed as an element of the array
	const arr = rows.map(function (row) {
		const values = row.split(delimiter);
		const el = headers.reduce(function (object, header, index) {
			object[header] = values[index];
			return object;
		}, {});
		return el;
	});

	// return the array
	return arr;
}
//!handle code initiation
let fireTimes = 0;
let checkMainHtmlStatus = setInterval(function () {
	fireTimes++;
	if ($(".container-ctx").length) {
		clearInterval(checkMainHtmlStatus);
		loopAuditingConfig();
	} else if (fireTimes == 15) {
		clearInterval(checkMainHtmlStatus);
	}
}, 1000);
// !check browser
var isIE = /*@cc_on!@*/ false || !!document.documentMode;
var isChrome = false || !!document.documentMode // add to avoid the err isChrome is not defined
var isOpera = false || !!document.documentMode // add to avoid the err isOpera is not defined
// Opera 8.0+
debugger
if (
	(!!window.opr && !!opr.addons) ||
	!!window.opera ||
	navigator.userAgent.indexOf(" OPR/") >= 0
)
	userBrowser = "Opera";
// Firefox 1.0+
else if (typeof InstallTrigger !== "undefined") userBrowser = "FireFox";
// Safari 3.0+ "[object HTMLElementConstructor]"
else if (
	/constructor/i.test(window.HTMLElement) ||
	(function (p) {
		return p.toString() === "[object SafariRemoteNotification]";
	})(
		!window["safari"] ||
		(typeof safari !== "undefined" && window["safari"].pushNotification)
	)
)
	userBrowser = "Safari";
// Internet Explorer 6-11
else if (/*@cc_on!@*/ false || !!document.documentMode) userBrowser = "IE";
// Edge 20+
else if (!isIE && !!window.StyleMedia) userBrowser = "Edge";
// Chrome 1 - 79
else if (
	!!window.chrome &&
	(!!window.chrome.webstore || !!window.chrome.runtime)
)
	userBrowser = "Chrome";
// Edge (based on chromium) detection
else if (isChrome && navigator.userAgent.indexOf("Edg") != -1)
	userBrowser = "Edge Chromium";
// Blink engine detection
else if ((isChrome || isOpera) && !!window.CSS) userBrowser = "Blink Engine";
