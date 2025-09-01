window.sphttp = {
    get: function (listUrl, listDisplayName, camelQuery, internalFieldNames, onEach, onError) {

        var clientContext = new SP.ClientContext(listUrl);
        var oList = clientContext.get_web().get_lists().getByTitle(listDisplayName);
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(camelQuery);
        var itemsEnumerable = oList.getItems(camlQuery);
        clientContext.load(itemsEnumerable);
        clientContext.executeQueryAsync(
            Function.createDelegate(this,
                function (sender, args) {
                    var listItemEnum = itemsEnumerable.getEnumerator();
                    var records = [];
                    while (listItemEnum.moveNext()) {
                        var oListItem = listItemEnum.get_current();
                        var record = {};
                        if (internalFieldNames && internalFieldNames.length > 0) {
                            for (var i = 0; i < internalFieldNames.length; i++) {
        
                                record[internalFieldNames[i]] = oListItem.get_item(internalFieldNames[i]);
                            }
                            if(listkey == 'projects' && isView && listDisplayName=='Budget Items')
                            {
                                window.budgetFrom = oListItem.get_item('From') ? sphttp.g.convertdate( oListItem.get_item('From') ) : '', 
                                window.budgetTo = oListItem.get_item('To') ? sphttp.g.convertdate( oListItem.get_item('To') ) : '';
                                View_Data_Request.g.budgetitem();
                            }
                        }
                        records.push(record);
                        onEach(records, record, oListItem, false); //false if having item
                        
                    }
                    onEach(records, null, null, true); //true if no more items                  
                }),
            Function.createDelegate(this, function (sender, args) {
                console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            })
        )
    },
    g:{
        convertdate: function(d)
        {
            if(d)
            {
                var local = d.getTime();
                var offset = d.getTimezoneOffset() * (60 * 1000);
                var utc = new Date(local + offset);
                var riyadh = new Date(utc.getTime() + (3 * 60 * 60 * 1000));
                var datetouse = riyadh.toLocaleString("en-US").split(',')[0].split('/');
                datetouse[0] =  (datetouse[0].length == 1) ? '0'+datetouse[0] : datetouse[0];
                datetouse[1] =  (datetouse[1].length == 1) ? '0'+datetouse[1] : datetouse[1];
                var datetouse2 = datetouse[2]+'-'+datetouse[0]+'-'+datetouse[1];
                d = datetouse2;
            }
            return d;
        }
    }
}
