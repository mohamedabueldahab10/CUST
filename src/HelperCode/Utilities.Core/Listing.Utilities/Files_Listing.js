var Folders_Files_Array = [],
    PCODE, listkey, SP_ListName, PageTitle, KeysFolders = [],
    NRisks = 0,
    NIssues = 0,
    Fileelements, fileCount = 0,
    arrayBuffer, ProjectType, isuploaddone = 0,
    phasesFoldersHtml = '',
    phasesFilesHTML = '';
if (window.location.href.indexOf('PCODE=') > -1) {
    PCODE = window.location.href.split('PCODE=')[1].split('&')[0];
}
if (window.location.href.indexOf('ListKey') > -1) {
    listkey = window.location.href.split('ListKey=')[1].split('&')[0];
    for (var i = 0; i < ListArray.length; i++) {
        var obj = ListArray[i];
        if (obj.subfolder)
            KeysFolders.push(Object.keys(obj)[0]);
        for (var key in obj) {
            if (key == window.location.href.split('ListKey=')[1].split('&')[0]) {
                SP_ListName = obj[key];
                PageTitle = obj['ListingTitle'];
            }
        }
    }
}
var GetFilesFromFolder = {
    preinit: function() {
        if ($('.stage-folders').length) {
            clearInterval(checkFilesHTML);
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                GetFilesFromFolder.init();
                GetProject_Info.init();
                $('h2.DahsFormTitle').text(PageTitle);
                changeResources();
            });
        }
    },
    init: function() {
        var context = new SP.ClientContext.get_current();
        var web = context.get_web();
        var list = web.get_lists().getByTitle(SP_ListName);
        // Use createAllItemsQuery to get items inside subfolders as well. Otherwise use new SP.CamlQuery() to get items from a single folder only
        var query = SP.CamlQuery.createAllItemsQuery();
        query.set_folderServerRelativeUrl(_spPageContextInfo.webServerRelativeUrl + '/' + SP_ListName + '/' + PCODE);
        GetFilesFromFolder.g.allItems = list.getItems(query);
        context.load(GetFilesFromFolder.g.allItems, 'Include(File, FileSystemObjectType, RelatedItemName, PhaseGateItem, RelatedPhase)');
        context.executeQueryAsync(
            Function.createDelegate(this, GetFilesFromFolder.OnSuccessGetFilesFromFolder),
            Function.createDelegate(this, GetFilesFromFolder.OnFailureGetFilesFromFolder)
        );
    },
    OnSuccessGetFilesFromFolder: function() {
        var listItemEnumerator = GetFilesFromFolder.g.allItems.getEnumerator();
        var index = 0,
            passed = false,
            FolderName;
        while (listItemEnumerator.moveNext()) {

            var currentItem = listItemEnumerator.get_current();
            if (currentItem.get_fileSystemObjectType() == "0") {
                var file = currentItem.get_file();
                if (file != null) {
                    // console.log('File Name: ' + file.get_name() + '\n' + 'File Url: ' + file.get_serverRelativeUrl()); 
                    FolderName = file.get_serverRelativeUrl().split('/')[5].charAt(0).toUpperCase() + file.get_serverRelativeUrl().split('/')[5].slice(1);
                    Folders_Files_Array.push({
                        Folder: FolderName,
                        Files: [{
                            name: file.get_name(),
                            url: file.get_serverRelativeUrl(),
                            itemname: currentItem.get_item('RelatedItemName'),
                            phasegateitem: currentItem.get_item('PhaseGateItem'),
                            relatedphase: currentItem.get_item('RelatedPhase')
                        }],
                    });
                }
            }
            // console.log(Folders_Files_Array);
        }
        //sort alphabatically
        Folders_Files_Array = Folders_Files_Array.sort(function(a, b) {
            var textA = a.Folder.toUpperCase();
            var textB = b.Folder.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        //merge same folder files
        var folder_name = '',
            newarrayforfolder = [],
            pastindex;
        for (var o = 0; o < Folders_Files_Array.length; o++) {
            if (folder_name == Folders_Files_Array[o].Folder) {
                newarrayforfolder[pastindex].Files.push({
                    name: Folders_Files_Array[o].Files[0].name,
                    url: Folders_Files_Array[o].Files[0].url,
                    itemname: Folders_Files_Array[o].Files[0].itemname,
                    phasegateitem: Folders_Files_Array[o].Files[0].phasegateitem,
                    relatedphase: Folders_Files_Array[o].Files[0].relatedphase
                });
            } else {
                newarrayforfolder.push({
                    Folder: Folders_Files_Array[o].Folder,
                    Files: [{
                        name: Folders_Files_Array[o].Files[0].name,
                        url: Folders_Files_Array[o].Files[0].url,
                        itemname: Folders_Files_Array[o].Files[0].itemname,
                        phasegateitem: Folders_Files_Array[o].Files[0].phasegateitem,
                        relatedphase: Folders_Files_Array[o].Files[0].relatedphase
                    }],
                });
                pastindex = newarrayforfolder.length - 1;
            }
            folder_name = Folders_Files_Array[o].Folder;
        }
        //build folders html
        var FFHTML = '',
            FolderHTML = '<div class="folder-wrap level-current scrolling" data-title="' + PCODE + ' Folders">',
            FilesHTML = '';
        for (var i = 0; i < newarrayforfolder.length; i++) {
            FolderHTML += '<div class="tile folder" data-target="#' + newarrayforfolder[i].Folder + '"><i class="fas fa-folder"></i><h3>' + newarrayforfolder[i].Folder + '</h3><p>' + PCODE + '</p></div><!-- .tile.folder -->';
            if (i == newarrayforfolder.length - 1) {
                FolderHTML += '</div><!-- .folder-wrap -->'
            }
            FilesHTML += '<div class="folder-wrap" id="' + newarrayforfolder[i].Folder + '" data-title="' + newarrayforfolder[i].Folder + ' Folder">';
            for (var t = 0; t < newarrayforfolder[i].Files.length; t++) {
                FilesHTML += '<div class="tile form"><a class="library-download" href="' + newarrayforfolder[i].Files[t].url + '" download><i class="fas fa-file-download"></i><h3>' + newarrayforfolder[i].Files[t].name + '</h3><p></p></a></div><!-- .tile.form -->';
                if (t == newarrayforfolder[i].Files.length - 1) {
                    FilesHTML += '</div><!-- .folder-wrap -->';
                }
            }
        }
        FFHTML = FolderHTML + FilesHTML;
        $('.stage-folders').html(FFHTML);
        //handling phases view
        newarrayforfolder.forEach(el => {
            if (el.Folder == 'Phasegate') {
                window.result = el.Files.reduce(function(r, a) {
                    r[a.relatedphase] = r[a.relatedphase] || [];
                    r[a.relatedphase].push(a);
                    return r;
                }, Object.create(null));
                // console.log(result);
                Object.entries(result).forEach(pl => {
                    phasesFilesHTML += '<div class="folder-wrap" id="' + encodeURI(pl[0].replace(/[^a-z0-9]/gi, '')) + '" data-title="' + pl[0] + ' Folder">';
                    pl[1].forEach(fl => {
                        phasesFilesHTML += '<div class="tile form"><a class="library-download" href="' + fl.url + '" download><i class="fas fa-file-download"></i><h3>' + fl.name + '</h3><p>' + fl.phasegateitem + '</p></a></div><!-- .tile.form -->';
                    });
                    phasesFilesHTML += '</div><!-- .folder-wrap -->';
                });
                // console.log(el.Files)
            }
        });
        $('.stage-folders').append(phasesFilesHTML);
        // Folder on click
        // GetFilesFromFolder.g.folderBehavior();
        $('.loader-box').fadeOut();
    },
    OnFailureGetFilesFromFolder: function(sender, args) {
        console.log("Failed. Message:" + args.get_message());
    },
    g: {
        folderBehavior: function() {
            $('.folder,.custom-phased').on("click", function() {
                if ($(this).hasClass('custom-phased')) {
                    $(this).addClass('show');
                    $('.custom-folder').removeClass('show');
                } else {
                    $('.back').animate({
                        opacity: 1
                    })
                }
                var target = $($(this).attr('data-target'));
                // console.log("Drill down");
                $('.level-up').removeClass('level-up');
                $('.level-current').addClass('level-up');
                $('.level-current').removeClass('level-current');
                target.addClass('level-current');
                $('.level-down').removeClass('level-down'); //.next().addClass('level-down')
            });

            // Back on Click
            $('.back').on("click", function() {
                if ($('.level-current').is(':first-child')) {
                    // console.log("Current is top");
                } else {
                    // console.log("Drill back up");
                    // $('.level-down').removeClass('level-down')
                    // $('.level-current').addClass('level-down');
                    $('.level-current').removeClass('level-current');
                    $('.level-up').addClass('level-current');
                    $('.level-up').removeClass('level-up'); //.prev().addClass('level-up')
                }
                if ($('.level-current').attr('id') == 'Phasegate') {
                    $('.back').animate({
                        opacity: 0
                    })
                }
            });
            $('.custom-folder').on("click", function() {
                $('.back').animate({
                    opacity: 0
                });
                $('.custom-folder').addClass('show');
                $('.custom-phased').removeClass('show');
                $('.level-current').removeClass('level-current');
                $('.folder-wrap').remove('level-up').remove('level-down');
                $('.folder-wrap:nth-child(1)').addClass('level-current');
            });
        }
    }
}
var checkFilesHTML = setInterval(function() {
    GetFilesFromFolder.preinit();
}, 1000);
var GetProject_Info = {
    onSuccess: function(sender, args) {

        var collListItem = GetProject_Info.g.collListItem;
        var listItemEnum = collListItem.getEnumerator();
        var PID;
        while (listItemEnum.moveNext()) {
            var oListItem = listItemEnum.get_current();
            PID = oListItem.get_id();
            ProjectType = oListItem.get_item('ProjectType');
            ProjectPhase = oListItem.get_item('Phase');
        }
    },
    onError: function(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    },
    // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
    preinit: function() {
        if ($('.ms-Icon--Settings').length) {
            SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
                GetProject_Info.init();
            });
        }
    },
    // The main Initialization function
    init: function() {
        var clientContext = new SP.ClientContext.get_current();
        var oList = clientContext.get_web().get_lists().getByTitle(ListArray[0].projects);
        var camlQuery = new SP.CamlQuery();
        var PQUERY;
        if (PCODE) {
            PQUERY = '<View><Query><Where><Eq><FieldRef Name=\'Title\'/><Value Type=\'Text\'>' + PCODE + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>';
        } else {
            PQUERY = '<View><Query></Query></View>';
        }

        camlQuery.set_viewXml(PQUERY);
        GetProject_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
        clientContext.load(GetProject_Info.g.collListItem);
        clientContext.executeQueryAsync(
            Function.createDelegate(this, GetProject_Info.onSuccess),
            Function.createDelegate(this, GetProject_Info.onError)
        );
    },
    // Global variables
    g: {}
};