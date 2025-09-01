var TaskListName = "Tasks",
    PCODE, listkey, SP_ListName, PageTitle, KeysFolders = [],
    isProjectCodehere = window.location.href.indexOf('PCODE=') > -1;

if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
    var No_Data = 'لا يوجد'
} else {
    var No_Data = 'No Comment'
}

var customTaskHtml = setInterval(function() { 
    Task_Details_Request.preinit();
}, 1000);

var Task_Details_Request = {
    onSuccess: function(sender, args) {
        var collListItem = Task_Details_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var relatedItemTitle;
        var taskhtml = '<ul class="list-group w-100">';
        var count = 0;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            taskStatus = oListItem.get_item('Status');
            tasktitle = oListItem.get_item('Title');
            relatedItemTitle = oListItem.get_item('RelatedItemTitle');
            taskDescription = oListItem.get_item('Body') ? oListItem.get_item('Body') : No_Data;
            modifiedNoteBy = oListItem.get_item('AssignedTo') ? oListItem.get_item('AssignedTo')[0].get_lookupValue() : No_Data;
            createdDate = oListItem.get_item('Created') || No_Data;
            delegatedFrom = oListItem.get_item('TaskDelegatedFrom') ? oListItem.get_item('TaskDelegatedFrom').get_lookupValue() : null;
            delegatedReason = oListItem.get_item('DelegationReason') || No_Data;
            if (taskStatus == "Open") {
                if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                    modifiedNoteDate = "لا يوجد";
                    takenAction = "لا يوجد";
                } else {
                    modifiedNoteDate = "NA";
                    takenAction = "NA";
                }
            } else {
                modifiedNoteDate = oListItem.get_item('Modified') || No_Data;
                modifiedNoteDate = modifiedNoteDate.toLocaleDateString("en-US");
                takenAction = oListItem.get_item('TakenAction');
                if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                    takenAction = takenAction ? Resources.ar[takenAction.toLowerCase()] : "لا يوجد";
                } else {
                    takenAction = takenAction ? Resources.en[takenAction.toLowerCase()] : "NA";
                }
            }

            if (localStorage.getItem('Dynamo_Tasks Configuration') != null) {
                tasktitlearr = JSON.parse(localStorage.getItem("Dynamo_Tasks Configuration") || "[]");
                tasktitlearr = tasktitlearr.filter(function(item) {
                    return item.code == tasktitle
                });
                if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
                    tasktitle = tasktitlearr[0].name;
                    taskStatus = Resources.ar[taskStatus.toLowerCase()];
                } else {
                    tasktitle = tasktitlearr[0].nameEn;
                    taskStatus = Resources.en[taskStatus.toLowerCase()];
                }
            }

            taskhtml += '<li class="list-group-item">';
            taskhtml += '<div class="d-inline-flex flex-column mx-2"><h4 class="acc-title d-inline-flex black text-warning" style="margin:0px!important">' + tasktitle + '</h4></div><div class="d-inline-flex flex-column mx-2"><h4 class="acc-title d-inline-flex black text-warning" style="margin:0px!important">' + createdDate.toLocaleDateString("en-US") + '</h4><span data-trans-createddate class="Resources des-13"></span></div><div class="d-inline-flex flex-column mx-2"><h4 class="acc-title d-inline-flex black text-warning" style="margin:0px!important">' + modifiedNoteBy + '</h4><span data-trans-modifiedby class="Resources des-13"></span></div><div class="d-inline-flex flex-column mx-2"><h4 class="acc-title d-inline-flex black text-warning" style="margin:0px!important">' + taskDescription + '</h4><span data-trans-taskComment class="Resources des-13"></span></div><div class="d-inline-flex flex-column mx-2"><h4 class="acc-title d-inline-flex black text-warning" style="margin:0px!important">' + takenAction + '</h4><span data-trans-takenaction class="Resources des-13"></span></div><div class="d-inline-flex flex-column mx-2"><h4 class="acc-title d-inline-flex black text-warning" style="margin:0px!important">' + modifiedNoteDate + '</h4><span data-trans-modifieddate class="Resources des-13"></span></div><div class="d-inline-flex flex-column mx-2"><h4 class="acc-title d-inline-flex black text-warning" style="margin:0px!important">' + taskStatus + '</h4><span data-trans-taskstatus class="Resources des-13"></span></div>';

            if (count == 0) {

                // $('#relatedItemTitle').append(relatedItemTitle);
                //document.referrer go to the prev page when click on the title
                $('#relatedItemTitle').append('<a href="' + document.referrer + '" style="color:#fff">' + relatedItemTitle + '</a>');
            }

            count++;

            if (delegatedFrom !== null) {
                taskhtml += '<div class="delegationRow"><div class="delegationicon"><i class="fas fa-user-friends"></i></div><div class="delegation"><div id="delegateMsg"><span data-trans-delegationmsg class="Resources"></span><span>' + delegatedFrom + '</span></div><div id="delegateReason"><span data-trans-delegationreason class="Resources"></span><span>' + delegatedReason + '</span></div></div></div>';
            }
            taskhtml += '</li>';
        }

        taskhtml += "</ul>";

        $('#taskTable').html(taskhtml);

        $('div#particles-foreground, div#particles-background, .vertical-centered-box').animate({
            opacity: 0
        }, {
            duration: 333,
            complete: function() {
                $('div#particles-foreground, div#particles-background, .vertical-centered-box').remove();

            }
        });
        changeResources();

    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ($('.navbar.page-nav.px-5').length) {
            clearInterval(customTaskHtml);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                Task_Details_Request.init();
            });
        }
        if ($('.d-flex').length) {
            //username
            $('.user-name').text(UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join(''));
            $('.user-name-full').text(UserN.Title);
        }
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle(TaskListName);
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><And><Eq><FieldRef Name=\'RelatedItemID\' /><Value Type=\'Text\'>' + Task_Details_Request.g.TaskID + '</Value></Eq><Eq><FieldRef Name=\'WorkflowName\' /><Value Type=\'Text\'>' + Task_Details_Request.g.TaskType + '</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Created\' Ascending=\'False\' /></OrderBy></Query></View>');
        Task_Details_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(Task_Details_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, Task_Details_Request.onSuccess),
            Function.createDelegate(this, Task_Details_Request.onError)
        );
    },
    // Global variables
    g: {
        PCODE: isProjectCodehere ? window.location.href.split('PCODE=')[1].split('&')[0] : '',
        TaskType: window.location.href.split('TT=')[1].split('&')[0],
        TaskID: window.location.href.split('IID=')[1].split('&')[0],
    }
};