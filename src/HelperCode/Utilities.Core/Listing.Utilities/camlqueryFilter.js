var Query_Body, Where_Body, ViewFields, isAscending,
FilterChoices = [
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
];//yyy-mm-dd
for(var k = 0; k < Listing_Info.length; k++)
{
    ViewFields += '<FieldRef Name="'+Listing_Info[k].InternalName+'"/>'
}
//dynamic query building
for(var i = 0; i< FilterChoices.length; i++)
{
    //only one choice
    if(FilterChoices.length == 1)
    {
        Where_Body += '<In><FieldRef Name="'+FilterChoices[i].internalName+'" /><Values>';
        for(var j = 0; j < FilterChoices[i].Values.length; j++)
        {
            Where_Body += '<Value Type="'+FilterChoices[i].Type+'">'+FilterChoices[i].Values[j]+'</Value>';
        }
        Where_Body += '</Values></In>';
    }
    //Two choices    
    else if(FilterChoices.length == 2)
    {
        if(i == 0)
        {
            Where_Body += '<And><In><FieldRef Name="'+FilterChoices[i].internalName+'" /><Values>';
            for(var j = 0; j < FilterChoices[i].Values.length; j++)
            {
                Where_Body += '<Value Type="'+FilterChoices[i].Type+'">'+FilterChoices[i].Values[j]+'</Value>';
            }
            Where_Body += '</Values></In>';
        }
        else
        {
            Where_Body += '<In><FieldRef Name="'+FilterChoices[i].internalName+'" /><Values>';
            for(var j = 0; j < FilterChoices[i].Values.length; j++)
            {
                Where_Body += '<Value Type="'+FilterChoices[i].Type+'">'+FilterChoices[i].Values[j]+'</Value>';
            }
            Where_Body += '</Values></In></And>';
        }
    }
    //More than two choices
    else if(FilterChoices.length > 2)
    {
        //two Eqs in last And
        if(i == FilterChoices.length-1)
        {
            Where_Body += '<In><FieldRef Name="'+FilterChoices[i].internalName+'" /><Values>';
            for(var j = 0; j < FilterChoices[i].Values.length; j++)
            {
                Where_Body += '<Value Type="'+FilterChoices[i].Type+'">'+FilterChoices[i].Values[j]+'</Value>';
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
            Where_Body += '<And><In><FieldRef Name="'+FilterChoices[i].internalName+'" /><Values>';
            for(var j = 0; j < FilterChoices[i].Values.length; j++)
            {
                Where_Body += '<Value Type="'+FilterChoices[i].Type+'">'+FilterChoices[i].Values[j]+'</Value>';
            }
            Where_Body += '</Values></In>';
        }
    }
    //Finish Line, make last changes and build query
    if(i == FilterChoices.length-1){
        Where_Body.replace('Type="DateTime"', 'IncludeTimeValue="False" Type="DateTime"');
        Query_Body = '<View>' + 
                // '<ViewFields>' + //use it for paging jsom calls
                //     ViewFields
                // '</ViewFields>' + 
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
$($checkbox).change(function(){
    filter.Action(
        $(this).attr('id'),
        $(this).attr( $(this).attr('id') ),
        this.checked 
    );
});