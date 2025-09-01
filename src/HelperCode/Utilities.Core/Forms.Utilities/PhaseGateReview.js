var peojectC = window.location.href.split('PCODE=')[1].split('&')[0];
var ProjectStages_Review_Data_Request = {
    onSuccess: function(sender, args) {
        var collListItem = ProjectStages_Review_Data_Request.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var index = 0,
            passed = false;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            if (index == 0 && !passed) {
                ProjectStages_Review_Data_Request.g.StagesArray.push({
                    phase: oListItem.get_item('Title'),
                    stages: [{
                        name: oListItem.get_item('Stage'),
                        decision: oListItem.get_item('Decision'),
                        id: oListItem.get_id()
                    }],
                });
                passed = true;
            } else {
                if (ProjectStages_Review_Data_Request.g.StagesArray[index].phase != oListItem.get_item('Title')) {
                    // console.log('new phase');
                    ProjectStages_Review_Data_Request.g.StagesArray.push({
                        phase: oListItem.get_item('Title'),
                        stages: [{
                            name: oListItem.get_item('Stage'),
                            decision: oListItem.get_item('Decision'),
                            id: oListItem.get_id()
                        }],
                    });
                    index++;
                } else {
                    // console.log('same phase');
                    ProjectStages_Review_Data_Request.g.StagesArray[index].stages.push({
                        name: oListItem.get_item('Stage'),
                        decision: oListItem.get_item('Decision'),
                        id: oListItem.get_id(),
                    });
                }
            }
        }
        var html = '';
        for (var i = 0; i < ProjectStages_Review_Data_Request.g.StagesArray.length; i++) {
            html += '<div class="formcontents"><div class="Form Description"><h2>' + ProjectStages_Review_Data_Request.g.StagesArray[i].phase + '</h2><p>تفاصيل المرحلة</p></div><div class="SPCForm "><fieldset>';
            var obj = ProjectStages_Review_Data_Request.g.StagesArray[i].stages;
            for (var j = 0; j < obj.length; j++) {
                // console.log(obj[j].name);
                html += '<div class="IFIELD" data-decision="' + obj[j].decision + '"><label >' + obj[j].name + '</label><p data-decision="' + obj[j].decision + '" class="viewmode-value" type="text"  ></p></div>';
            }
            html += '</fieldset></div></div>';
        }
        html += '<div class="CSformbuttons"><button type="button" class="CSformCancel">العودة</button><p style="display:none" class="successmsg">تم الإرسال بنجاح</p></div>'
        $('.FormShape').html(html);
        $('.formcontents').hide();
        $('.formcontents').each(function() {
            var allstages = $(this).find('.IFIELD').length;
            var checkedstages = $(this).find('.IFIELD[data-decision=true]').length;
            if (checkedstages / allstages == 1) {
                // console.log('==1');
                $(this).hide();
                $(this).next().show();
            } else if (checkedstages > 0) {
                // console.log('>0');
                $(this).show();
            }
        });
        if ($('.formcontents:visible').length == 0) {
            $('.formcontents:nth-child(1)').show();
        }
        ProjectStages_Review_Data_Request.g.Cancel()
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    preinit: function() {
        if ($('.SPCForm').length) {
            clearInterval(checkFormStatusHtml);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                ProjectStages_Review_Data_Request.init();
            });


        }
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle('ProjectStages');
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name=\'ProjectCode\'/><Value Type="Text">' + peojectC + '</Value></Eq></Where><OrderBy><FieldRef Name=\'ListSort\' Ascending=\'True\' /></OrderBy></Query></View>');
        ProjectStages_Review_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(ProjectStages_Review_Data_Request.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, ProjectStages_Review_Data_Request.onSuccess),
            Function.createDelegate(this, ProjectStages_Review_Data_Request.onError)
        );
    },
    // Global variables
    g: {
        StagesArray: [],
        Cancel: function() {
            $('button.CSformCancel').on("click", function() {
                window.location = _spPageContextInfo.webServerRelativeUrl + '/sitepages/projectdetails.aspx?PCODE=' + peojectC;
            })
        }
    }
};
var checkFormStatusHtml = setInterval(function() {
    ProjectStages_Review_Data_Request.preinit();
}, 1000);