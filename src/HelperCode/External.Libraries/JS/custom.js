$(document).ready(function(){
    if( window.location.href.toLowerCase().indexOf('pcode=') == -1 )
    {
        $('body').append('<style>.Container {padding-left: 0px !important;}</style>')
    }
    if( window.location.href.toLowerCase().indexOf('/_layouts/') > -1 || window.location.href.toLowerCase().indexOf('allitems.aspx') > -1 || window.location.href.toLowerCase().indexOf('sitepages') == -1  ){
        $('link[href*="style.css"],style[data-original-href*="style.css"],link[href*="bootstrap.css"],style[data-original-href*="bootstrap.css"],link[href*="font-awesome.css"],style[data-original-href*="font-awesome.css"],link[href*="style-dashboards.css"],style[data-original-href*="style-dashboards.css"]').disabled=true;
        $('link[href*="style.css"],style[data-original-href*="style.css"],link[href*="bootstrap.css"],style[data-original-href*="bootstrap.css"],link[href*="font-awesome.css"],style[data-original-href*="font-awesome.css"],link[href*="style-dashboards.css"],style[data-original-href*="style-dashboards.css"]').remove();
    }
    else
    {
        $('div#particles-foreground, div#particles-background, .vertical-centered-box').attr('style', 'display:block');
    }
});
var check_SP_UI = setInterval(function() {
    UI_Ready.preinit();
},333);
var UI_Ready =
{
    preinit: function () {
        if ($('#O365_AppName').length) {
            clearInterval(check_SP_UI);
            UI_Ready.init();
        }
    },
    init: function()
    {
        const logo = require('../../../HelperRessources/img/main-logo.png');

        $('div#leftRegion').html('<div class="Logo"><a href="/sites/SPM"><img class="img-Logo" src="'+logo+'"></a></div>');
        $('div#leftRegion').show();
        if( window.location.href.toLowerCase().indexOf("/sitepages/") == -1 )
        {
            $('.loader-box').fadeOut();
        }
    }
}
/********************************************************************************** *//********************************************************************************** */
/********************************************************************************** */
/********************************************************************************** */
/********************************************************************************** */
/********************************************************************************** */
/********************************************************************************** */
/********************************************************************************** */
//workflow handle
/********************************************************************************** */
var stageid, stagename, projectstagename, nxtstageid, prvstageid, taskid, tasktype, peojectC, curstageName ,curphaseName;
var curstage_org_prv =[],curstage_prv=[],curstage=[],curstage_nxt=[];
var forTasksHTMLStatus;
if( window.location.href.indexOf('PCODE') > -1 )
{
    peojectC = window.location.href.split('PCODE=')[1].split('&')[0];
}
var Task_PCODE_Data_Request = {
    onSuccess: function(sender, args) {

        var collListItem = Task_PCODE_Data_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) {//loop through list items
            var oListItem = listItemEnum.get_current();
            taskid = oListItem.get_id();
            // console.log(taskid);
            nxtstageid = oListItem.get_item('StageIDApprove'),
            prvstageid = oListItem.get_item('StageIDReject'),
            stageid = oListItem.get_item('StageID'),
            tasktype = oListItem.get_item('TaskType'),
            peojectC = oListItem.get_item('ProjectCode');
            stagename = oListItem.get_item('Title');
        }
        PCODE_Stage_Data_Request.init();
    },
    onError: function (sender, args) {
            console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ($('.DahsFormTitle').length || $('.PNameTitle').text() || $('#Ribbon\\.Tabs\\.PDP\\.Home-title').length ) {
            clearInterval(forTasksHTMLStatus);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
                Task_PCODE_Data_Request.init();
            });
        }
    },
 // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Tasks');//list name
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><And><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">'+peojectC+'</Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where></Query><RowLimit>1</RowLimit></View>');//caml query
        //<Where><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><And><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">'+peojectC+'</Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where>
        Task_PCODE_Data_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only
        clientContext.load(Task_PCODE_Data_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Task_PCODE_Data_Request.onSuccess),
            Function.createDelegate(this, Task_PCODE_Data_Request.onError)
        );
    },
    // Global variables
    g: {
        Handle_Take_Action: function()
		{//console.log('asdasdasd');
            if( $('.CSformbuttons').length || $('#filterColumn').length || $('h2.PNameTitle').length || $('span.ms-pagetitle').length )
            {
                // console.log('asdasdasd');
                switch(tasktype)
                {
                    case 'Approval':
                        $('h2.DahsFormTitle, h2.PNameTitle, span.ms-pagetitle').append('<div style="float:left;margin:0 10px;height: 38px;font-size: 14px;" class="actionport btn-group" role="group" aria-label="Button group with nested dropdown"> <div class="btn-group" role="group"> <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> الموافقة / الرفض  "'+stagename+'"</button> <div class="dropdown-menu" aria-labelledby="btnGroupDrop1"> <a onclick="BulkEdit(true)" class="approveaction dropdown-item" href="JavaScript:Void(0);">الموافقة</a> <a class="rejectaction dropdown-item" onclick="BulkEdit(false)" href="JavaScript:Void(0);">الرفض</a> </div> </div></div>');
                        break;
                    case 'Submit':
                        // console.log('asdasdasd');
                        $('h2.DahsFormTitle, h2.PNameTitle, span.ms-pagetitle').append('<button onclick="BulkEdit(true)" class="pop-green" type="button">تم الانتهاء من "'+stagename+'"</button>');
                        break;
                    case 'SubmitField':
                        $('.CSformbuttons button').hide();
                        $('h2.DahsFormTitle, h2.PNameTitle, span.ms-pagetitle').append('<button onclick="PM_BulkEdit.preinit(true)" class="pop-green" type="button">تم الانتهاء من  "'+stagename+'"</button>');
                        $('.IFIELD,.formcontents').hide();
                        $('#ProjectManager').closest('.formcontents').show();
                        $('#ProjectManager').closest('.IFIELD').show();
                        // button.pop-green {display: flex;justify-content: center;align-items: center;float: left;font-size: 18px;background-color: #31503b;color: #fff;float:left;}
                        break;
                }
                // $('div.Container').animate({ opacity: "1" });
                // $('.cust-loader').fadeOut();
            }
		},
		handleids: function()
		{
			curstage_org = Stages_ORG_Data_Request.g.StagesArray.filter(function(obj) {
				return obj.stageid == stageid;
			});
			curstage_org_nxt =  Stages_ORG_Data_Request.g.StagesArray.filter(function(obj) {
				return obj.stageid == nxtstageid;
			});
			if(prvstageid != 0)
			{
				curstage_org_prv =  Stages_ORG_Data_Request.g.StagesArray.filter(function(obj) {
					return obj.stageid == prvstageid;
				});
				curstage_prv =  ProjectStages_Data_Request.g.StagesArray.filter(function(obj) {
					return obj.stage == curstage_org_prv[0].stage;
				});
			}
			curstage =  ProjectStages_Data_Request.g.StagesArray.filter(function(obj) {
				return obj.stage == curstage_org[0].stage;
			});
			curstage_nxt =  ProjectStages_Data_Request.g.StagesArray.filter(function(obj) {
				return obj.stage == curstage_org_nxt[0].stage;
            });
            Task_PCODE_Data_Request.g.Handle_Take_Action();
		},
    }
};
var PCODE_Stage_Data_Request = {
    onSuccess: function(sender, args) {

        var collListItem = PCODE_Stage_Data_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) {//loop through list items
            var oListItem = listItemEnum.get_current();
            projectstagename = oListItem.get_item('Stage');
        }
        if( projectstagename = stagename )
        {
            ProjectStages_Data_Request.init();
        }
    },
    onError: function (sender, args) {
            console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
 // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('ProgramProjects');//list name
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">'+peojectC+'</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>');//caml query
        PCODE_Stage_Data_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only
        clientContext.load(PCODE_Stage_Data_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, PCODE_Stage_Data_Request.onSuccess),
            Function.createDelegate(this, PCODE_Stage_Data_Request.onError)
        );
    },
    // Global variables
    g: {}
};
if( window.location.href.toLowerCase().indexOf('pcode=') > -1 )
{
    // taskid = window.location.href.split('TID=')[1].split('&')[0];
    $(document).ready(function(){

        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
            forTasksHTMLStatus = setInterval(function() {
                Task_PCODE_Data_Request.preinit();
            },500);
        });
    })

}
//phases-stages
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

        Stages_ORG_Data_Request.init();

    },
    onError: function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // The main Initialization function
    init: function () {
        var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext.get_web().get_lists().getByTitle('ProjectStages');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'ProjectCode\'/><Value Type="Text">'+peojectC+'</Value></Eq></Where><OrderBy><FieldRef Name=\'ListSort\' Ascending=\'True\' /></OrderBy></Query></View>');
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
var Stages_ORG_Data_Request = {
    onSuccess: function (sender, args) {
        var collListItem = Stages_ORG_Data_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        Stages_ORG_Data_Request.g.StagesArray = []
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            Stages_ORG_Data_Request.g.StagesArray.push({
                phase: oListItem.get_item('RelatedPhase'),
                stage: oListItem.get_item('Title'),
                relatedURL: oListItem.get_item('RelatedURL'),
                stageid: oListItem.get_id(),
            });
        }
		Task_PCODE_Data_Request.g.handleids();
    },
    onError: function (sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // The main Initialization function
    init: function (peojectC, type,taskid,nxtstageid, prvstageid, stageid) {
        // console.log('asdasd');
        var clientContext = new SP.ClientContext.get_current();
		var oList = clientContext.get_web().get_lists().getByTitle('Stages');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'Enabled\'/><Value Type=\'Integer\'>1</Value></Eq></Where><OrderBy><FieldRef Name=\'ListSort\' Ascending=\'True\' /></OrderBy></Query></View>');
        Stages_ORG_Data_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only
        clientContext.load(Stages_ORG_Data_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Stages_ORG_Data_Request.onSuccess),
            Function.createDelegate(this, Stages_ORG_Data_Request.onError)
        );
    },
    // Global variables
    g: {
        StagesArray: []
    }
};
//end phases-stages
var PM_BulkEdit =
{
    preinit: function(state)
    {
        if ($('span.sp-peoplepicker-userSpan').length)
        {
            PM_BulkEdit.init(state);
        }
        else
        {
            $('.pop-buttons').append('<p class="errormsg">Please fill above info</p>');
        }
    },
    init: function(state)
    {
        $('h2.DahsFormTitle').append('<div class="cust-loader"></div>  ');
        $('button.pop-green').attr("disabled", true);
        var context = SP.ClientContext.get_current();
        var dfd = $.Deferred();
        //Get list from host web
        var programList = context.get_web().get_lists().getByTitle('ProgramProjects');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>"+peojectC+"</Value></Eq></Where></Query></View>");
        //Get items by Query
        var progColl = programList.getItems(camlQuery);
        //Load item collection
        context.load(progColl);
        context.executeQueryAsync(function()
                {
                var currentItemArray = [];
                //Check itemcollection count greater than 0
                if (progColl.get_count() > 0)
                {
                    var progEnum = progColl.getEnumerator();
                    while (progEnum.moveNext())
                    {
                        var currentItem = progEnum.get_current();
                        var progTitle = currentItem.get_item("Title");
                        var currentId = currentItem.get_item("ID");
                        // console.log(currentId);
                        //Get Item by current ID
                        var items = programList.getItemById(currentId);
                        //set
                        if ($('span.sp-peoplepicker-userSpan').length) {
                            var ppp = ($('span.sp-peoplepicker-userSpan').attr('sid') == undefined) ? '' : SP.FieldUserValue.fromUser($('span.sp-peoplepicker-userSpan').attr('sid'));//.split('|').slice(-1)[0]
                            items.set_item('ProjectManager', ppp);
                        }
                        //Update the item
                        items.update();
                        //Push item on the array
                        currentItemArray.push(items);
                        //Load the item Array
                        context.load(currentItemArray[currentItemArray.length - 1]);
                    }
                    context.executeQueryAsync(function()
                        {
                        //Item Updated sucess
                        // console.log("Items are updated Successfully");
                        dfd.resolve();
                        BulkEdit(state);

                    }, function(sender, args)
                        {
                        //Item updated fail
                        console.log("Request Failed to get  Items :" + args.get_message());
                    });
                } else
                {
                    dfd.resolve();
                }
            },
            function(sender, args)
                {
                $('.loader').hide();
                console.log("Request failed in  List " + args.get_message());
            });
        return dfd.promise();
    }
}
//phases-stages update
function BulkEdit(state)
{
    $('h2.DahsFormTitle,h2.PNameTitle').append('<div class="cust-loader"></div>  ');
    $('button.pop-green').attr("disabled", true);
	var context = SP.ClientContext.get_current();
	var dfd = $.Deferred();
	//Get list from host web
	var programList = context.get_web().get_lists().getByTitle('ProjectStages');
	var camlQuery = new SP.CamlQuery();
	var qwhere ="<In> <FieldRef Name='ID' /> <Values>";
	if(!state)
	{
		var index = ProjectStages_Data_Request.g.StagesArray.findIndex(x => x.stageid === curstage[0].stageid);
		for (var i = curstage_org_prv[0].stageid-1; i <= index; i++) {
			qwhere+="<Value Type='Integer'>"+ProjectStages_Data_Request.g.StagesArray[i].stageid+"</Value>";
			if(i == index)
			{
				qwhere += "</Values> </In>";
				camlQuery.set_viewXml("<View><Query><Where>"+qwhere+"</Where></Query></View>");
			}

		}
	}
	else
	{
		var index = ProjectStages_Data_Request.g.StagesArray.findIndex(x => x.stageid === curstage[0].stageid);
		for (var i = 0; i <= index+1; i++) {
			qwhere+="<Value Type='Integer'>"+ProjectStages_Data_Request.g.StagesArray[i].stageid+"</Value>";
			if(i == index+1)
			{
				qwhere += "</Values> </In>";
				camlQuery.set_viewXml("<View><Query><Where>"+qwhere+"</Where></Query></View>");
			}

		}

	}
    // console.log(qwhere);
	//Get items by Query
	var progColl = programList.getItems(camlQuery);
	//Load item collection
	context.load(progColl);
	context.executeQueryAsync(function()
			{
			var currentItemArray = [];
			//Check itemcollection count greater than 0
			if (progColl.get_count() > 0)
			{
				var progEnum = progColl.getEnumerator();
				while (progEnum.moveNext())
				{
					var currentItem = progEnum.get_current();
					var progTitle = currentItem.get_item("Title");
					var currentId = currentItem.get_item("ID");
					// console.log(currentId);
					//Get Item by current ID
					var items = programList.getItemById(currentId);
					//set
					// if(currentId == stageid)
					// {
					// 	items.set_item("Decision", false);
					// 	items.set_item("Comments", $('textarea.pop-description').val());
                    // }
                    // console.log(currentId,curstage[0].stageid);
					 if( state )
					{

						if(currentId == curstage_nxt[0].stageid)
						{
							curstageName = currentItem.get_item("Stage");
                            curphaseName = currentItem.get_item("Title");
                            items.set_item("Decision", false);
                        }
                        else
                        {
                            items.set_item("Decision", true);
                        }
					}
					if(!state)
					{
						items.set_item("Decision", false);
						if(currentId == curstage_prv[0].stageid)
						{
							curstageName = currentItem.get_item("Stage");
							curphaseName = currentItem.get_item("Title");
						}
					}
					//Update the item
					items.update();
					//Push item on the array
					currentItemArray.push(items);
					//Load the item Array
					context.load(currentItemArray[currentItemArray.length - 1]);
				}
				context.executeQueryAsync(function()
					{
					//Item Updated sucess
					// console.log("Items are updated Successfully");
					dfd.resolve();
					program_BulkEdit()

				}, function(sender, args)
					{
					//Item updated fail
					console.log("Request Failed to get projectlist Items :" + args.get_message());
				});
			} else
			{
				dfd.resolve();
			}
		},
		function(sender, args)
			{
			$('.loader').hide();
			console.log("Request failed in Portfolio List " + args.get_message());
		});
	return dfd.promise();
}
//end phases-stages update
function program_BulkEdit()
{
	var context = SP.ClientContext.get_current();
	var dfd = $.Deferred();
	//Get list from host web
	var programList = context.get_web().get_lists().getByTitle('ProgramProjects');
	var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name=\'Title\'/><Value Type=\'Text\'>"+peojectC+"</Value></Eq></Where></Query></View>");
	//Get items by Query
	var progColl = programList.getItems(camlQuery);
	//Load item collection
	context.load(progColl);
	context.executeQueryAsync(function()
			{
			var currentItemArray = [];
			//Check itemcollection count greater than 0
			if (progColl.get_count() > 0)
			{
				var progEnum = progColl.getEnumerator();
				while (progEnum.moveNext())
				{
					var currentItem = progEnum.get_current();
					var progTitle = currentItem.get_item("Title");
					var currentId = currentItem.get_item("ID");
					// console.log(currentId);
					//Get Item by current ID
					var items = programList.getItemById(currentId);
					//set

                    items.set_item("Phase", curphaseName);
                    items.set_item("Stage", curstageName);

					//Update the item
					items.update();
					//Push item on the array
					currentItemArray.push(items);
					//Load the item Array
					context.load(currentItemArray[currentItemArray.length - 1]);
				}
				context.executeQueryAsync(function()
					{
					//Item Updated sucess
					// console.log("Items are updated Successfully");
					dfd.resolve();
					Task_Edit_Data.init();

				}, function(sender, args)
					{
					//Item updated fail
					console.log("Request Failed to get projectlist Items :" + args.get_message());
				});
			} else
			{
				dfd.resolve();
			}
		},
		function(sender, args)
			{
			$('.loader').hide();
			console.log("Request failed in Portfolio List " + args.get_message());
		});
	return dfd.promise();
}
var Task_Edit_Data = {

    init: function () {

        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('Tasks');
        Task_Edit_Data.g.oListItem = oList.getItemById(taskid);//declared inside object scope only

        Task_Edit_Data.g.oListItem.set_item('Status', 'Closed');
        Task_Edit_Data.g.oListItem.set_item('WFInstanceID', null);
        Task_Edit_Data.g.oListItem.set_item('Body', $('textarea.pop-description').val());
        Task_Edit_Data.g.oListItem.update();
        clientContext.load(Task_Edit_Data.g.oListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, function () {
                // console.log('successful');
                $('.errormsg').hide();
                // location.reload();
                window.location = _spPageContextInfo.webServerRelativeUrl+'/SitePages/ProjectDetails.aspx?PCODE='+peojectC;
            }),
            Function.createDelegate(this, function (sender, args) {
                console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            })
        );
    },
    g: {
        clickbait: function(){

        },
        Cancel: function(){

        }
    }
};