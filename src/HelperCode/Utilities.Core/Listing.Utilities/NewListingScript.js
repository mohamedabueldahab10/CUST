var context, 
web, 
spItems, 
position, 
nextPagingInfo, 
previousPagingInfo, 
pageIndex = 1, // default page index value 
pageSize = 10, // default page size value 
list, 
camlQuery, 
sortColumn = 'Created', // this is sort column, you can add more than one column, but you should add it also to CAML Query & managePagerControl function 
Query_Body, 
//fixed condition
Where_Body = '<And><In><FieldRef Name="Project" /><Values><Value Type="Text">'+PCODE+'</Value></Values></In>',
ViewFields,
isAscending = 'False',
fstepfilter = [],
FilterChoice = [
    {
        internalName: "Title",
        Type: "Text",
        Values: ['SMO-Portfolio-002','SMO-Portfolio-003']
    },
    {
        internalName: "test1",
        Type: "Text",
        Values: ['test2', 'test1']
    },
    {
        internalName: "testdate",
        Type: "DateTime",
        Values: ['2020-10-15']
    },
    {
        internalName: "testchoice",
        Type: "Choice",
        Values: ['Choice 3', 'Choice 1']
    },
];//yyyy-mm-dd

var Listing_Request = {
	onSuccess: function(sender, args) {
        var listEnumerator = spItems.getEnumerator(); 
        var items = [];
        var item; 

        while (listEnumerator.moveNext()) { 
            item = listEnumerator.get_current(); 
            if(item.get_item('Title') == null)
                var title = '';
            else
                var title = item.get_item('Title');

            items.push('<a href="'+item.get_item('FileRef')+'" title="'+title+'" data-gallery="" data-unique-id="tmp_'+item.get_id()+'">'+
                        '<img src="'+item.get_item('FileRef')+'" class="red"/>'+
                        '<img src="/Style Library/GCAM/img/icons/Galleryp.svg" class="bgp"/>'+
                        '</a>'); 
        } 
        var content =  items; 
        $('#links').append(content); 
        $(".loader").hide();
        Listing_Request.g.managePagerControl();
        Listing_Request.g.enableFilterAction();
	},
	onError: function (sender, args) {
            console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ($('#blueimp-gallery').length) {
            clearInterval(checkPhotoHtml);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function (){
                Listing_Request.StartPhoto();
            });
        }
    },
    StartPhoto: function(){
        context = new SP.ClientContext('/'); 
        list = context.get_web().get_lists().getByTitle(ListName); 
        camlQuery = new SP.CamlQuery(); 
        $("#btnNext").click(function () { 
            pageIndex = pageIndex + 1; 
            if (nextPagingInfo) { 
                position = new SP.ListItemCollectionPosition(); 
                position.set_pagingInfo(nextPagingInfo); 
            } 
            else { 
                position = null; 
            } 
            $(".loader").show();
            Listing_Request.init(); 
        }); 
        $("#btnBack").click(function () { 
            pageIndex = pageIndex - 1; 
            position = new SP.ListItemCollectionPosition(); 
            position.set_pagingInfo(previousPagingInfo); 
            Listing_Request.init(); 
        }); 
        Listing_Request.init(); 
    },
// The main Initialization function
	init: function() {
        //Set the next or back list items collection position 
        //First time the position will be null 
        camlQuery.set_listItemCollectionPosition(position); 

        // Create a CAML view that retrieves all contacts items  with assigne RowLimit value to the query 
        camlQuery.set_viewXml(Query_Body);                          
        spItems = list.getItems(camlQuery); 
        context.load(spItems); 
        context.executeQueryAsync( 
                Function.createDelegate(this, Listing_Request.onSuccess), 
                Function.createDelegate(this, Listing_Request.onError) 
            ); 
	},
	g: {
        "managePagerControl": function()
        {
            if (spItems.get_listItemCollectionPosition()) { 
                nextPagingInfo = spItems.get_listItemCollectionPosition().get_pagingInfo(); 
            } else { 
                nextPagingInfo = null; 
            } 
            
            $("#pageInfo").html((((pageIndex - 1) * pageSize) + 1) + " - " + ((pageIndex * pageSize) - (pageSize - spItems.get_count()))); 
            
            previousPagingInfo = "PagedPrev=TRUE&Paged=TRUE&p_ID=" + spItems.itemAt(0).get_item('ID') + "&p_" + sortColumn + "=" + encodeURIComponent(spItems.itemAt(0).get_item(sortColumn)); 
            
            if (pageIndex <= 1) { 
                $("#btnBack").attr('disabled', 'disabled'); 
            } 
            else { 
                $("#btnBack").removeAttr('disabled'); 
            } 
            
            if (nextPagingInfo) { 
                $("#btnNext").removeAttr('disabled'); 
            } 
            else { 
                $("#btnNext").attr('disabled', 'disabled'); 
            } 
        },
        //filter functions
        enableFilterAction: function()
        {
            $('.filter').change(function(){
                Listing_Request.g.manageSelectedFilter
                ( 
                    $(this).attr('internal-name'), 
                    $(this).attr('data-type'), 
                    $(this).attr('data-value'),
                    this.checked 
                );
            });
        },
        manageSelectedFilter: function($internalname, $Type, $Value, $isChecked){
            //for camlquery solution, getting choices and creating array
            
            if($isChecked)
            {
                fstepfilter.push
                ({
                    internalName: $internalname,
                    Type: $Type,
                    Value: $Value
                });
                Listing_Request.g.prepareforFilterControl(fstepfilter);
            }
            else
            {
                fstepfilter = fstepfilter.filter( function(obj){ return obj.Value !== $Value });
                Listing_Request.g.prepareforFilterControl(fstepfilter);
            }
        },
        prepareforFilterControl: function(fstepfilter)
        {
            // making array ready for camlquery building
            FilterChoice = [];
            fstepfilter.forEach(function(item) {
                var existing = FilterChoice.filter(function(v, i) {
                    return v.internalName == item.internalName;
                });
                if (existing.length) {
                    var existingIndex = FilterChoice.indexOf(existing[0]);
                    FilterChoice[existingIndex].Value = FilterChoice[existingIndex].Value.concat(item.Value);
                } else {
                    if (typeof item.Value == 'string')
                        item.Value = [item.Value];
                    FilterChoice.push(item);
                }
            });
            // console.log(FilterChoice);
        },
        manageViewFields: function()
        {   //getting all nessecary fields
            for(var k = 0; k < Listing_Info.length; k++)
            {
                ViewFields += '<FieldRef Name="'+Listing_Info[k].InternalName+'"/>'
            }
        },
        manageFilterControl: function()
        {
            //dynamic query building
            for(var i = 0; i< FilterChoice.length; i++)
            {
                // //only one choice
                // if(FilterChoice.length == 1)
                // {
                //     Where_Body += '<In><FieldRef Name="'+FilterChoice[i].internalName+'" /><Values>';
                //     for(var j = 0; j < FilterChoice[i].Values.length; j++)
                //     {
                //         Where_Body += '<Value Type="'+FilterChoice[i].Type+'">'+FilterChoice[i].Values[j]+'</Value>';
                //     }
                //     Where_Body += '</Values></In>';
                // }
                //Two choices   including fixed condition 
                if(FilterChoice.length == 1)
                {
                    Where_Body += '<In><FieldRef Name="'+FilterChoice[i].internalName+'" /><Values>';
                    for(var j = 0; j < FilterChoice[i].Values.length; j++)
                    {
                        Where_Body += '<Value Type="'+FilterChoice[i].Type+'">'+FilterChoice[i].Values[j]+'</Value>';
                    }
                    Where_Body += '</Values></In></And>';
                }
                //More than two choices
                else if(FilterChoice.length > 1)
                {
                    //two Eqs in last And
                    if(i == FilterChoice.length-1)
                    {
                        Where_Body += '<In><FieldRef Name="'+FilterChoice[i].internalName+'" /><Values>';
                        for(var j = 0; j < FilterChoice[i].Values.length; j++)
                        {
                            Where_Body += '<Value Type="'+FilterChoice[i].Type+'">'+FilterChoice[i].Values[j]+'</Value>';
                        }
                        Where_Body += '</Values></In>';

                        //appending And closure
                        var count = (Where_Body.match(/<And>/g) || []).length;
                        var ANDC = "</And>".repeat(count);
                        Where_Body += ANDC;
                    }
                    //normal And
                    else
                    {
                        Where_Body += '<And><In><FieldRef Name="'+FilterChoice[i].internalName+'" /><Values>';
                        for(var j = 0; j < FilterChoice[i].Values.length; j++)
                        {
                            Where_Body += '<Value Type="'+FilterChoice[i].Type+'">'+FilterChoice[i].Values[j]+'</Value>';
                        }
                        Where_Body += '</Values></In>';
                    }
                }
                //Finish Line, make last changes and build query
                if(i == FilterChoice.length-1){
                    Where_Body.replace('Type="DateTime"', 'IncludeTimeValue="False" Type="DateTime"');
                    Query_Body = '<View>' + 
                            '<ViewFields>' + 
                                ViewFields
                            '</ViewFields>' + 
                            '<Query>' + 
                                '<Where>'+Where_Body+'</Where>'+
                                '<OrderBy>' + 
                                '<FieldRef Name="' + sortColumn + '" Ascending="'+isAscending+'" />' + 
                                '</OrderBy>' + 
                            '</Query>' + 
                            '<RowLimit>' + pageSize + '</RowLimit>'+
                        '</View>';
                }
            }
        },
    }
};
var checkPhotoHtml = setInterval(function() {
    Listing_Request.preinit();
},1000);
