//Workflow Handle
/********************************************************************************** */
var workflowname, stageid, stagename, projectstagename, nxtstageid, prvstageid, taskid, tasktype, peojectC, curstageName ,curphaseName, isideapage = window.location.href.indexOf('idea') > -1, fieldtoedit, bulkeditlist, bulkeditquery, taskquery;
var curstage_org_prv =[],curstage_prv=[],curstage=[],curstage_nxt=[];
var forTasksHTMLStatus;
//determine which workflow to get related task
if(isideapage)
{
    workflowname = 'فكرة';
    fieldtoedit = 'IdeaType'; // field to edit in case it is a "submitfield"
    bulkeditlist = 'Ideas'; // list to edit in this case idae list
    bulkeditquery = '<View><Query><Where><Eq><FieldRef Name="ID" /><Value Type="Integer">'+IID+'</Value></Eq></Where></Query></View>';
    taskquery = '<View><Query><Where><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><And><Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">'+workflowname+'</Value> </Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where></Query><RowLimit>1</RowLimit></View>';
    peojectC = null;
}
if( window.location.href.indexOf('PCODE') > -1 )
{
    workflowname = 'مشروع';
    fieldtoedit = 'ProjectManager';
    bulkeditlist = 'ProgramProjects';
    bulkeditquery = "<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>"+peojectC+"</Value></Eq></Where></Query></View>";
    taskquery = '<View> <Query> <Where> <And> <Or> <Eq> <FieldRef Name="AssignedTo" LookupId="TRUE" /> <Value Type="Integer"> <UserID /> </Value> </Eq> <Membership Type="CurrentUserGroups"> <FieldRef Name="AssignedTo" /> </Membership> </Or> <And> <Eq> <FieldRef Name="ProjectCode" /> <Value Type="Text">'+peojectC+'</Value> </Eq> <And> <Eq> <FieldRef Name="Status" /> <Value Type="Choice">Open</Value> </Eq> <Eq> <FieldRef Name="WorkflowName" /> <Value Type="Text">'+workflowname+'</Value> </Eq> </And> </And> </And> </Where> </Query> <RowLimit>1</RowLimit></View>';
    peojectC = window.location.href.split('PCODE=')[1].split('&')[0];
}
var Task_PCODE_Data_Request = {
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ( $('.DahsFormTitle').length || $('.PNameTitle').text() || $('#Ribbon\\.Tabs\\.PDP\\.Home-title').length ) {
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
        camlQuery.set_viewXml(taskquery);//caml query
        //<Where><And><Or><Eq><FieldRef Name="AssignedTo" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Membership Type="CurrentUserGroups"><FieldRef Name="AssignedTo" /></Membership></Or><And><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">'+peojectC+'</Value></Eq><Eq><FieldRef Name="Status" /><Value Type="Choice">Open</Value></Eq></And></And></Where>
        Task_PCODE_Data_Request.g.collListItem = oList.getItems(camlQuery);//declared inside object scope only
        clientContext.load(Task_PCODE_Data_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Task_PCODE_Data_Request.onSuccess),
            Function.createDelegate(this, Task_PCODE_Data_Request.onError)
        );
    },
    onSuccess: function(sender, args) {
        
        var collListItem = Task_PCODE_Data_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        while (listItemEnum.moveNext()) {//loop through list items
            var oListItem = listItemEnum.get_current();
            taskid = oListItem.get_id();
            // console.log(taskid);
            nxtstageid = oListItem.get_item('StageIDApprove');
            prvstageid = oListItem.get_item('StageIDReject');
            stageid = oListItem.get_item('StageID');
            tasktype = oListItem.get_item('TaskType1');
            peojectC = oListItem.get_item('ProjectCode');
            stagename = oListItem.get_item('Title');
            // workflowname = oListItem.get_item('WorkflowName');
        }   
        if(tasktype == 'SubmitField')
        {
            $('div.Container').fadeOut();
            $('div.Container').after('<div class="cust-loader"></div>');
            $('body').append('<style>.cust-loader {position:fixed;margin: 0 auto;top: 50%;right: 50%;width: 77px;height: 77px;}</style>');
            $('.IFIELD,.formcontents').hide();
        }	
        if(workflowname == 'مشروع')
            PCODE_Stage_Data_Request.init();
        else if(workflowname == 'فكرة')
            Task_PCODE_Data_Request.g.handleids();

    },
    onError: function (sender, args) {
            console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Global variables
    g: {
        Handle_Take_Action: function()
		{
            // console.log('asdasdasd');
            if( $('.CSformbuttons').length || $('#filterColumn').length || $('h2.PNameTitle').length || $('span.ms-pagetitle').length )
            {
                // console.log('asdasdasd');
                switch(tasktype)
                {
                    case 'Approval':
                        $('h2.DahsFormTitle, h2.PNameTitle, span.ms-pagetitle').append('<button style="float: left;margin: 0 3px;background: #853232;" onclick="Task_PCODE_Data_Request.g.addcomments(false, \'Approval\')" class="pop-green" style="float: left;font-size: 17px;" type="button">الرفض "'+stagename+'"</button><button style="float: left;margin: 0 3px;" onclick="Task_PCODE_Data_Request.g.addcomments(true, \'Approval\')" class="pop-green" type="button" style="float: left;font-size: 17px;">الموافقة "'+stagename+'"</button>');
                        
                        // <div style="float:left;margin:0 10px;height: 38px;font-size: 14px;" class="actionport btn-group" role="group" aria-label="Button group with nested dropdown"> <div class="btn-group" role="group"> <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> الموافقة / الرفض  "'+stagename+'"</button> <div class="dropdown-menu" aria-labelledby="btnGroupDrop1"> <a onclick="BulkEdit(true)" class="approveaction dropdown-item" href="JavaScript:Void(0);">الموافقة</a> <a class="rejectaction dropdown-item" onclick="BulkEdit(false)" href="JavaScript:Void(0);">الرفض</a> </div> </div></div>
                        break;
                    case 'Submit':
                        // console.log('asdasdasd');
                        $('h2.DahsFormTitle, h2.PNameTitle, span.ms-pagetitle').append('<button onclick="Task_PCODE_Data_Request.g.addcomments(true, \'Submit\')" style="float: left;font-size: 17px;" class="pop-green" type="button">تم الانتهاء من "'+stagename+'"</button>');
                        break;
                    case 'SubmitField':
                        $('.CSformbuttons button').hide();
                        $('h2.DahsFormTitle, h2.PNameTitle, span.ms-pagetitle').append('<button onclick="Task_PCODE_Data_Request.g.addcomments(true, \'SubmitField\')" style="float: left;font-size: 17px;" class="pop-green" type="button">تم الانتهاء من  "'+stagename+'"</button>');
                        $('#'+fieldtoedit).closest('.formcontents').show();
                        $('#'+fieldtoedit).closest('.IFIELD').show();
                        $('div.Container').fadeIn();
                        $('div.cust-loader').fadeOut();
                        // button.pop-green {display: flex;justify-content: center;align-items: center;float: left;font-size: 18px;background-color: #31503b;color: #fff;float:left;}
                        break;
                }
                // $('div.Container').animate({ opacity: "1" });
                // $('.cust-loader').fadeOut();
            }
		},
		handleids: function()
		{
            if(workflowname == 'مشروع')
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
            }
            Task_PCODE_Data_Request.g.Handle_Take_Action();
        },
        addcomments: function(state, version)
        {
            if(workflowname == 'مشروع')
            {
                if(version == 'Approval' || version == 'Submit')
                {
                    $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="BulkEdit('+state+')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
                }
                else if( version == 'SubmitField' )
                {
                    $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit('+state+')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
                } 
            }
            else if( workflowname == 'فكرة' )
                {
                    $('body').append('<div class="popupComment"><div class="wrapcomments"><label>ملاحظات</label><textarea id="commenttext" rows="4" cols="50"></textarea><div><button class="commentsub" onclick="SubmitField_BulkEdit.preinit('+state+')">إرسال</button><button onclick="$(\'.popupComment\').remove();" class="commentsub">إلغاء</button><span style="display:none" class="successmsg">تم الإرسال</span></div></div></div>');
                }
            
        }
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
// start of calls
if( window.location.href.toLowerCase().indexOf('pcode=') > -1 || isideapage )
{
    $(document).ready(function(){
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
            forTasksHTMLStatus = setInterval(function() {
                Task_PCODE_Data_Request.preinit();
            },500);
        });
    });
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
var SubmitField_BulkEdit =
{
    preinit: function(state)
    {
        if ( workflowname == 'مشروع' && $('span.sp-peoplepicker-userSpan').length ) 
        {
            SubmitField_BulkEdit.init(state);
        }
        else if( workflowname != 'مشروع' && tasktype == "SubmitField" && $('.was-validated .form-control:invalid').length == 0 )
        {
            SubmitField_BulkEdit.init(state);
        }
        else if( workflowname != 'مشروع' && tasktype != "SubmitField" )
        {
            SubmitField_BulkEdit.init(state);
        }
        else
        {
            $('.pop-buttons').append('<p class="errormsg">Please fill above info</p>');
            $('.popupComment').remove();
        }
    },
    init: function(state)   
    {
        $('h2.DahsFormTitle').append('<div class="cust-loader"></div>  ');
        // $('button.pop-green').attr("disabled", true);
        $('.commentsub').attr("disabled", true);
        var context = SP.ClientContext.get_current();  
        var dfd = $.Deferred();  
        //Get list from host web   
        var programList = context.get_web().get_lists().getByTitle(bulkeditlist);  
        var camlQuery = new SP.CamlQuery();  
        camlQuery.set_viewXml(bulkeditquery);
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
                        if(workflowname == 'مشروع')
                        {
                            var ppp = ($('span.sp-peoplepicker-userSpan').attr('sid') == undefined) ? '' : SP.FieldUserValue.fromUser($('span.sp-peoplepicker-userSpan').attr('sid'));//.split('|').slice(-1)[0]
                            items.set_item(fieldtoedit, ppp);
                        }	
                        else if( workflowname == 'فكرة' )
                        {
                            if( tasktype == 'SubmitField' )
                            {
                                var val = $('#'+fieldtoedit).val();
                                items.set_item(fieldtoedit, val);
                            }
                            if(state)
                                items.set_item('Stage', nxtstageid);
                            else
                                items.set_item('Stage', prvstageid);
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
                        if(workflowname == 'مشروع')
                            BulkEdit(state);
                        else
                            Task_Edit_Data.init();
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
    $('.commentsub').attr("disabled", true);
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
                        if(currentId == curstage[0].stageid)
                        {
                            items.set_item("Comments", $('textarea#commenttext').val());
                        }
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
                        if(currentId == curstage[0].stageid)
                        {
                            items.set_item("Comments", $('textarea#commenttext').val());
                        }
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
			console.log("Request failed in projectlist List " + args.get_message());  
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
        Task_Edit_Data.g.oListItem.set_item('Body', $('textarea#commenttext').val());
        //Task_Edit_Data.g.oListItem.set_item('Body', $('textarea.pop-description').val());
        Task_Edit_Data.g.oListItem.update();
        clientContext.load(Task_Edit_Data.g.oListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, function () {
                // console.log('successful');
                $('.errormsg').hide();
                // location.reload();
                if(isideapage)
                    window.location = _spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl+'/SitePages/Listing.aspx?ListKey=ideas';
                else
                    window.location = _spPageContextInfo.siteAbsoluteUrl + _spPageContextInfo.webServerRelativeUrl+'/SitePages/ProjectDetails.aspx?PCODE='+peojectC;
            }),
            Function.createDelegate(this, function (sender, args) {
                console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            })
        );
    },
    g: {}
};
// var Task_Data_Request = {
//     onSuccess: function (sender, args) {
//         console.log(taskid);
//         nxtstageid = oListItem.get_item('StageIDApprove'),
//         prvstageid = oListItem.get_item('StageIDReject'),
//         stageid = oListItem.get_item('StageID'),
//         tasktype = oListItem.get_item('TaskType1'),
//         peojectC = oListItem.get_item('ProjectCode');
//         ProjectStages_Data_Request.init();
//     },
//     onError: function (sender, args) {
//         console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
//     },
//     preinit: function() {
//         if ($('.DahsFormTitle').length) {
//             clearInterval(forTasksHTMLStatus);
//             SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
//                 Task_Data_Request.init();
//             });
//         }
//     },
//     // The main Initialization function
//     init: function () {
//         var clientContext = new SP.ClientContext.get_current();
//         var oList = clientContext.get_web().get_lists().getByTitle('Tasks');
//         Task_Data_Request.g.oListItem = oList.getItemById(taskid);//declared inside object scope only
//         oListItem = Task_Data_Request.g.oListItem;
//         clientContext.load(Task_Data_Request.g.oListItem);
//         // clientContext.load(Task_Data_Request.g.oListItem,'Include(Id,Title,StageIDApprove,StageIDReject,StageID,TaskType1,ProjectCode)');
//         clientContext.executeQueryAsync(
//             Function.createDelegate(this, Task_Data_Request.onSuccess),
//             Function.createDelegate(this, Task_Data_Request.onError)
//         );
//     },
//     // Global variables
//     g: {
        
//     }
// };