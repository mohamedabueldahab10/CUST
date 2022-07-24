var index = 1, complex = [], possize, toShow = [], $item = '.items', $target = 'span.ItemValue', $checkbox = '.filter';
var filter = {
    Action: function(Attr, Val, ischecked){
        if( $($checkbox+'[id="'+Attr+'"]:checked').length == 0 ) // check if all checkboxes are unchecked in this category
        {
            $($target+'.'+Attr).attr('data-filtered', 'positive');
            $($item+'.active-'+Attr).removeClass("active-"+Attr);
        }   
        else if (ischecked) 
        {
            $($item+'['+Attr+'="'+Val+'"]').addClass("active-"+Attr);
            $($item+'['+Attr+'="'+Val+'"]').find($target+'.'+Attr).attr('data-filtered', 'positive');
            $($item+'['+Attr+'!="'+Val+'"]:not([class*="active-'+Attr+'"])').find($target+'.'+Attr).attr('data-filtered', 'negative');
        }
        else if (!ischecked) 
        {
            $($item+'['+Attr+'="'+Val+'"]').find($target+'.'+Attr).attr('data-filtered', 'negative');
            $($item+'['+Attr+'="'+Val+'"]').removeClass("active-"+Attr);
        }
        $($item).each(function(){
            if($(this).find("[data-filtered=negative]").length > 0)
                $(this).hide();
            else if($(this).find("[data-filtered=positive]").length > 0)
                $(this).show();  
        });
        // old way******
        // complex = [], toShow = [], index = 1;
        // $($item).each(function(){
        //     possize = $(this).find("[data-filtered=positive]").length;
        //     complex.push({
        //         index: index,
        //         size: possize
        //     });
        //     index++;
        // });
        // var maxSize = complex.reduce((p, c) => p.size > c.size ? p : c);
        // console.log(maxSize);
        // toShow = complex.filter(function(obj) {
        //     return obj.size == maxSize.size;
        // });
        // $($item).hide();
        // for(var i = 0; i < toShow.length; i++)
        // {
        //     if($($item+':nth-child('+toShow[i].index+')').find("[data-filtered=negative]").length > 0)
        //         $($item+':nth-child('+toShow[i].index+')').hide();
        //     else if($($item+':nth-child('+toShow[i].index+')').find("[data-filtered=positive]").length > 0)
        //         $($item+':nth-child('+toShow[i].index+')').show();   
        // }
    },
}
// $($checkbox).change(function(){
//     filter.Action(
//         $(this).attr('id'),
//         $(this).attr( $(this).attr('id') ),
//         this.checked 
//         );
// });
//for new solution
var fstepfilter = [], originalstatefilter;
$('.filter').change(function(){
    // console.log('asd');
    var $internalname = $(this).attr('internal-name'), $Type = $(this).attr('data-type'), $Value = $(this).attr('data-value');
    if(this.checked)
    {
        fstepfilter.push
        ({
            internalName: $internalname,
            Type: $Type,
            Value: $Value
        });
        // console.log(fstepfilter);
    }
    else
    {
        fstepfilter = fstepfilter.filter( function(obj){ return obj.Value !== $Value });
    }
    originalstatefilter = fstepfilter;
    var FilterChoice = [];
// makin array ready for caml query building
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
    // console.log(fstepfilter);
});
//<input class="filter" id="Title" title="Issue 4" type="checkbox"> 
//<div class="items TaskDetails" title="Issue 4" project="PR4">
