//event logging 
var correlationId = randomUID(),
	errorArray = [];

var writeToEventViewer = {
	preinit: function (
		msg,
		category,
		level,
		fileURL,
		lineNo,
		columnNo,
		errorStack
	) {

		let lat, long;
		navigator.geolocation.getCurrentPosition(function (position) {
			lat = position.coords.latitude;
			long = position.coords.longitude;
			errorArray.indexOf(msg) == -1 //NOTE don't log same error in case of repeating setinterval errors.
				? SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
					writeToEventViewer.init(
						msg,
						category,
						level,
						fileURL,
						lineNo,
						columnNo,
						errorStack,
						lat,
						long
					);
				})
				: "";
			errorArray.push(msg);
		});
	},
	init: function (
		msg,
		category,
		level,
		fileURL,
		lineNo,
		columnNo,
		errorStack,
		lat,
		long
	) {
		var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext.get_web().get_lists().getByTitle("Event Logging");
		var itemCreateInfo = new SP.ListItemCreationInformation();
		writeToEventViewer.g.oListItem = oList.addItem(itemCreateInfo);

		writeToEventViewer.g.oListItem.set_item(
			"Date",
			new Date().toLocaleString().split(",")[0]
		);
		writeToEventViewer.g.oListItem.set_item(
			"Time",
			new Date().toLocaleString().split(",")[1]
		);
		writeToEventViewer.g.oListItem.set_item("Title", msg); // Message
		writeToEventViewer.g.oListItem.set_item("Category", category);
		writeToEventViewer.g.oListItem.set_item("Level", level);
		writeToEventViewer.g.oListItem.set_item("PageURL", window.location.href);
		writeToEventViewer.g.oListItem.set_item("Correlation", correlationId);
		writeToEventViewer.g.oListItem.set_item("UID", randomUID());
		writeToEventViewer.g.oListItem.set_item("UserAgent", navigator.userAgent);
		writeToEventViewer.g.oListItem.set_item(
			"Language",
			localStorage.getItem("lng") == null || localStorage.getItem("lng") == "ar"
				? "ar"
				: "en"
		);
		writeToEventViewer.g.oListItem.set_item("StackTrace", msg);
		writeToEventViewer.g.oListItem.set_item(
			"ActiveUser",
			`${_spPageContextInfo.userDisplayName}, ${_spPageContextInfo.userEmail}, ${_spPageContextInfo.userLoginName}, ${_spPageContextInfo.userId}`
		);
		writeToEventViewer.g.oListItem.set_item(
			"Location",
			`https://www.google.com/maps/search/?api=1&query=${lat}%2C${long}`
		);
		fileURL ? writeToEventViewer.g.oListItem.set_item("FileURL", fileURL) : "";
		lineNo ? writeToEventViewer.g.oListItem.set_item("LineNo", lineNo) : "";
		columnNo
			? writeToEventViewer.g.oListItem.set_item("ColumnNo", columnNo)
			: "";
		errorStack
			? writeToEventViewer.g.oListItem.set_item(
				"InnerExceptionStackTrace",
				errorStack
			)
			: "";

		writeToEventViewer.g.oListItem.update();
		clientContext.load(writeToEventViewer.g.oListItem);
		clientContext.executeQueryAsync(
			Function.createDelegate(this, function () {
				// asdasd;
			}),
			Function.createDelegate(this, function (sender, args) {
				var errormessage =
					"Request failed. " +
					args.get_message() +
					"\n" +
					args.get_stackTrace();
				console.log(errormessage);
			})
		);
	},
	g: {},
};

var Error_PopUp = {
	init: function () {

		var errorImage = _spPageContextInfo.webAbsoluteUrl + '/Style%20Library/spm/images/error-msg.png';

		var errMsgHead = "", errMsgBody = "", reload = "";
		if (
			localStorage.getItem("lng") == null ||
			localStorage.getItem("lng") == "ar"
		) {
			errMsgHead = "حدث خطأ ما"
			errMsgBody = "يرجى اعادة تحميل الصفحة والمحاولة مرة اخرى"
			reload = "اعادة التحميل"
		} else {
			errMsgHead = "Something went wrong"
			errMsgBody = "refresh the page and try agan"
			reload = "Refresh"
		}


		$('.page-nav').after('<div class="popupComment access-denied"><div class="wrapcomments" id="ErrorPopUp"><div class="denied-icon" style="background:url(' + errorImage + ') no-repeat;background-position:center;background-size: cover;height:70px;width:70px;margin-bottom:10px"></div><label>' + errMsgHead + '</label><div style="margin-bottom:15px">' + errMsgBody + '</div><button class="btn btn-action" type="button" style="margin:0px" onclick="window.location.reload()">' + reload + '</button></div></div></div>')

		$("#formloader").css("display", "none");

		$("#ErrorPopUp").get(0).scrollIntoView({ behavior: 'smooth' });

	}
}

window.onerror = function (msg, url, lineNo, columnNo, error) {
	var string = msg.toLowerCase();
	var substring = "script error";
	if (string.indexOf(substring) > -1) {
		console.log("Script Error: See Browser Console for Detail");
	} else {
		writeToEventViewer.preinit(
			msg,
			"JS Error",
			"Medium",
			url,
			lineNo,
			columnNo,
			error.stack
		);
	}
	return false;
};
function randomUID() {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
		(
			c ^
			(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
		).toString(16)
	);
}
// end event logging
//system Access classic pages
var System_Groups = [],
	System_UserN,
	isNot_Allowed_Access = (window.location.href.toLocaleLowerCase().indexOf("Projects.aspx") != -1 && window.location.href.toLocaleLowerCase().indexOf("/sitepages") == -1 && window.location.href.toLocaleLowerCase().indexOf("/schedule.aspx") == -1) || window.location.href.toLocaleLowerCase().indexOf("/sitepages/forms/") > -1,
	securityuser, isAdminUser = false;
var Security_userCalls = {
	Security_get_CurrentUser: function () {
		//getUserWebPermissionREST();
		$.ajax({
			url: _spPageContextInfo.webAbsoluteUrl + '/_api/web/CurrentUser',
			method: "GET",
			headers: {
				"Accept": "application/json; odata=verbose"
			},
			success: function (data) {
				// console.log('security', data);
				System_UserN = data.d;
				Security_userCalls.Security_get_CurrentUserGroupColl(data.d.Id);
				isAdminUser = System_UserN.IsSiteAdmin;
				//console.log(UserN);
			},
			error: function (data) {
				// console.log('call failed');
			}
		});
	},
	Security_get_CurrentUserGroupColl: function (UserID) {
		$.ajax({
			url: _spPageContextInfo.webAbsoluteUrl + '/_api/web/GetUserById(' + UserID + ')/Groups',
			method: "GET",
			headers: {
				"Accept": "application/json; odata=verbose"
			},
			success: function (data) {
				// console.log('security', data);
				/* get all group's title of current user. */
				var results = data.d.results;
				for (var i = 0; i < results.length; i++) {
					System_Groups.push(results[i].Title);
				}
				console.log("IN CUSTTTTTTTTTTTTTTTTTTTT")

				if (!isAdminUser && System_Groups.indexOf('Administrators for Project Web App') == -1 && ((window.location.href.toLocaleLowerCase().indexOf("/sitepages") == -1 && window.location.href.toLocaleLowerCase().indexOf("/schedule.aspx") == -1) || window.location.href.toLocaleLowerCase().indexOf("/sitepages/forms/") > -1)) {
					Security_userCalls.g.Security_Msg();
				} else {
					if (window.location.href.toLowerCase().indexOf('/_layouts/') > -1 || window.location.href.toLowerCase().indexOf('allitems.aspx') > -1 || window.location.href.toLowerCase().indexOf('/forms/') > -1 || window.location.href.toLowerCase().indexOf('sitepages') == -1) {
						$('link[href*="style.css"],style[data-original-href*="style.css"],link[href*="loaderStyle.css"],style[data-original-href*="loaderStyle.css"],link[href*="bootstrap.css"],style[data-original-href*="bootstrap.css"],link[href*="font-awesome.css"],style[data-original-href*="font-awesome.css"],link[href*="style-dashboards.css"],style[data-original-href*="style-dashboards.css"]').disabled = true;
						$('link[href*="style.css"],style[data-original-href*="style.css"],link[href*="loaderStyle.css"],style[data-original-href*="loaderStyle.css"],link[href*="bootstrap.css"],style[data-original-href*="bootstrap.css"],link[href*="font-awesome.css"],style[data-original-href*="font-awesome.css"],link[href*="style-dashboards.css"],style[data-original-href*="style-dashboards.css"]').remove();
						$('.ms-core-listMenu-root').css('opacity', '1');
					} else {
						$('div#particles-foreground, div#particles-background, .vertical-centered-box').attr('style', 'display:block');
					}
				}
				//console.log(UserN);
			},
			error: function (data) {
				// console.log('security error', data);
			}
		});
	},
	g: {
		Security_Msg: function () {
			$('html').append('<style>.popupComment, .wrapcomments { display: flex; justify-content: center; align-items: center; flex-direction: column; } .popupComment { position: absolute; width: 100%; height: 100%; top: 0; background: #dcdcdc; z-index: 999999999; } .wrapcomments { width: auto; height: auto; padding: 33px; border-radius: 5px; background: #f4f4f4; direction: ltr; -webkit-box-shadow: 0 0 10px 1px rgb(0 0 0 / 33%); -moz-box-shadow: 0 0 10px 1px rgba(0,0,0,.33); box-shadow: 0 0 10px 1px rgb(0 0 0 / 33%); } .denied-icon { margin-bottom: 10px;width: 80px;height: 77px; } .wrapcomments label { font-size: 21px; } .btn-action { color: #fff; background-color: #148287; padding: .675rem 1rem; font-size: 1.6rem; min-width: 12rem; font-weight: 500; margin-left: 1rem; text-align: center!important; }.btn:hover { color: #212529; text-decoration: none; }.popupComment.access-denied button.btn.btn-action { font-size: 20px; }.popupComment.access-denied, .popupComment.access-denied * { font-family: system-ui; font-weight: 600; margin-bottom: 9px; }</style>');
			$('body').animate({
				opacity: 0
			}, {
				duration: 333,
				complete: function () {
					if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
						$('body').html('<div class="popupComment access-denied"><div class="wrapcomments"><div class="denied-icon" style="background:url(' + securityuser + ') no-repeat;background-position:center;background-size: cover;"></div><label> عذرا، ليس لديك صلاحية لرؤية البيانات </label><div style="margin-bottom:15px">يرجى التكرم برفع طلب صلاحية عبر منصة خدماتي لمنحكم صلاحية الوصول إلى هذه الشاشة. وفي حال توفر الصلاحية مسبقًا، يرجى رفع بلاغ دعم فني عبر منصة خدماتي لمعالجة المشكلة</div><button class="btn btn-action" type="button" style="margin:0px" onclick="window.location=\'' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/Home.aspx\';">الصفحة الرئيسية</button></div></div></div>');
					} else {
						$('body').html('<div class="popupComment access-denied"><div class="wrapcomments"><div class="denied-icon" style="background:url(' + securityuser + ') no-repeat;background-position:center;background-size: cover;"></div><label>Sorry, you don\'t have permission to view the data</label><div style="margin-bottom:15px">Please contact the system administrator for more information</div><button class="btn btn-action" type="button" style="margin:0px" onclick="window.location=\'' + _spPageContextInfo.webAbsoluteUrl + '/SitePages/Home.aspx\';">Home Page</button></div></div></div>');
					}
					$('body').animate({
						opacity: 1
					});
				}
			});
		}
	}
};
$(document).ready(function () {
	securityuser = _spPageContextInfo.webAbsoluteUrl + '/Style%20Library/spm/images/security-user.svg';
	Security_userCalls.Security_get_CurrentUser();
	if (window.location.href.toLowerCase().indexOf('pcode=') == -1) {
		$('body').append('<style>.Container {padding-left: 0px !important;}</style>')
	}

});