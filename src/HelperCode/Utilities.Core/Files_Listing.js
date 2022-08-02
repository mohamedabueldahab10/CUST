var Folders_Files_Array = [],
  PCODE,ICODE, listkey, SP_ListName, PageTitle, KeysFolders = [],
  NRisks = 0,
  NIssues = 0,
  Fileelements, fileCount = 0,
  arrayBuffer, ProjectType, isuploaddone = 0,
  phasesFoldersHtml = '',
  phasesFilesHTML = '';
if (window.location.href.indexOf('PCODE=') > -1) {
  PCODE = window.location.href.split('PCODE=')[1].split('&')[0];
}

if(window.location.href.indexOf('ICODE=') > -1){
  ICODE = window.location.href.split('ICODE=')[1].split('&')[0];
}

console.log('Correct File listing')

if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
  var No_Data = 'لا يوجد ملفات'
  // $('.back').html(`<i class="fas fa-arrow-left"></i>`)
} else {
  // $('.back').html(`<i class="fas fa-arrow-right"></i>`)
  var No_Data = 'No Files'
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
  if(ICODE){
    SP_ListName = 'Initiative Documents'
    if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
      PageTitle = 'مستندات المبادرة'
    }else{
      PageTitle = 'Initiative Documents'
    }
  }

}


console.log("HEEEEEEEEEEEEEEEEEEEEEEEEEEERE")

var GetFilesFromFolder = {
  preinit: function () {
    if ($('.stage-folders').length) {
      clearInterval(checkFilesHTML);
      SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        GetFilesFromFolder.init();
        GetProject_Info.init();
        debugger
        $('h2.DahsFormTitle').text(PageTitle);
        changeResources();
      });
    }
  },
  init: function () {
    var context = new SP.ClientContext.get_current();
    var web = context.get_web();
    var list = web.get_lists().getByTitle(SP_ListName);
    console.log(SP_ListName,"SP_ListName SP_ListName")
    debugger
    // Use createAllItemsQuery to get items inside subfolders as well. Otherwise use new SP.CamlQuery() to get items from a single folder only
    var camlQuery = SP.CamlQuery.createAllItemsQuery();

    var handleCode = ''
    if(PCODE){
      handleCode=PCODE
    }else if(ICODE){
      handleCode = ICODE
    }
    camlQuery.set_viewXml('<View Scope="RecursiveAll"> \
        <Query> \
        <Where> \
                    <Contains> \
                        <FieldRef Name="Title" /> \
                        <Value Type="Text">' + handleCode + '</Value> \
                    </Contains> \
                </Where> \
            </Query> \
        <RowLimit>5000</RowLimit> \
    </View>');
    GetFilesFromFolder.g.allItems = list.getItems(camlQuery);
    context.load(GetFilesFromFolder.g.allItems, 'Include(Title, File, FileSystemObjectType, RelatedItemName, PhaseGateItem, RelatedPhase)');
    // query.set_folderServerRelativeUrl(_spPageContextInfo.webServerRelativeUrl + '/' + SP_ListName + '/' + PCODE);
    // GetFilesFromFolder.g.allItems = list.getItems(query);
    // context.load(GetFilesFromFolder.g.allItems, 'Include(File, FileSystemObjectType, RelatedItemName, PhaseGateItem, RelatedPhase)');
    context.executeQueryAsync(
      Function.createDelegate(this, GetFilesFromFolder.OnSuccessGetFilesFromFolder),
      Function.createDelegate(this, GetFilesFromFolder.OnFailureGetFilesFromFolder)
    );
  },
  OnSuccessGetFilesFromFolder: function () {
    // console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
    console.log("INSIDE ON SUCCCCCCCCCCCESSs")
    var listItemEnumerator = GetFilesFromFolder.g.allItems.getEnumerator();
    var index = 0,
      passed = false,
      FolderName;
    while (listItemEnumerator.moveNext()) {

      var currentItem = listItemEnumerator.get_current();
      if (currentItem.get_fileSystemObjectType() == "0") {
        var file = currentItem.get_file();
        if (file != null) { 
          console.log(file.get_serverRelativeUrl().split('/'),"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
          debugger
          // console.log('File Name: ' + file.get_name() + '\n' + 'File Url: ' + file.get_serverRelativeUrl());
          FolderName = file.get_serverRelativeUrl().split('/')[3].charAt(0).toUpperCase() + file.get_serverRelativeUrl().split('/')[3].slice(1);
          // FolderName = file.get_serverRelativeUrl().split('/')[5].charAt(0).toUpperCase() + file.get_serverRelativeUrl().split('/')[5].slice(1);
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
    Folders_Files_Array = Folders_Files_Array.sort(function (a, b) {
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
      FolderHTML = '<div class="folder-wrap level-current scrolling" >',
      FilesHTML = '';
    for (var i = 0; i < newarrayforfolder.length; i++) {
      console.log(newarrayforfolder[i].Folder,"ffffffffffffffffff")
      if(PCODE){
      FolderHTML += '<div class="tile folder" data-target="#' + newarrayforfolder[i].Folder + '"><i class="fas fa-folder"></i><h3 data-trans-' + newarrayforfolder[i].Folder + ' class="Resources"></h3><p>' + PCODE + '</p></div><!-- .tile.folder -->';
      }else if(ICODE){
        FolderHTML += '<div class="tile folder" data-target="#' + newarrayforfolder[i].Folder + '"><i class="fas fa-folder"></i><h3 data-trans-' + newarrayforfolder[i].Folder + ' class="Resources"></h3><p>' + ICODE + '</p></div><!-- .tile.folder -->';
      }

      if (i == newarrayforfolder.length - 1) {
        FolderHTML += '</div><!-- .folder-wrap -->'
      }
      FilesHTML += '<div class="folder-wrap" id="' + newarrayforfolder[i].Folder + '">';
      FilesHTML += "<span data-trans-" + newarrayforfolder[i].Folder + " class='Foldertitle Resources'></span>";
      for (var t = 0; t < newarrayforfolder[i].Files.length; t++) {
        FilesHTML += '<div class="tile form"><a class="library-download" href="' + newarrayforfolder[i].Files[t].url + '" download><i class="fas fa-file-download"></i><h3>' + newarrayforfolder[i].Files[t].name + '</h3><p></p></a></div><!-- .tile.form -->';
        if (t == newarrayforfolder[i].Files.length - 1) {
          FilesHTML += '</div><!-- .folder-wrap -->';
        }
      }
    }
    FFHTML = FolderHTML + FilesHTML;
    if (newarrayforfolder.length == 0) {
      $('.stage-folders').html(No_Data);
    } else {
      $('.stage-folders').html(FFHTML);
    }
    changeResources();
    //handling phases view
    newarrayforfolder.forEach(el => {
      if (el.Folder == 'Phasegate') {
        window.result = el.Files.reduce(function (r, a) {
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
    GetFilesFromFolder.g.folderBehavior(); // enable here to can enter the folder after create the folders
    $('.loader-box').fadeOut();
  },
  OnFailureGetFilesFromFolder: function (sender, args) {
    console.log("Failed. Message:" + args.get_message());
  },
  g: {
    submitPhaseGate: function () {
      $('.Gate-Submit').on("click", function () {
        $('.upload-phasegate').addClass('was-validated');
        $('.errormsg, .successmsg').remove();
        if ($('.was-validated .form-control:invalid').length == 0) {
          //Get File Input Control and read the file name
          if ($('#getFile').length) {
            Fileelements = document.getElementById("getFile");
            fileCount = Fileelements.files.length;
          }
          if (fileCount) {
            $('button.Gate-Submit').attr("disabled", true);
            UploadFiles.readFiles();
          }

        } else {
          // $('.upload-phasegate').append('<p class="errormsg">Please check info</p>')
          // console.log('check form for errors');
        }

      });
    },
    folderBehavior: function () {
      $('.folder,.custom-phased').on("click", function () {
        console.log("CLICKEEEEEEEEED")
        debugger

        if ($(this).hasClass('custom-phased')) {
          $(this).addClass('show');
          $('.custom-folder').removeClass('show');
          $('.upload-phasegate').animate({ opacity: 1, height: 76 }, 200);
        } else {
          $('.back').animate({
            opacity: 1
          })
        }
        var target = $($(this).attr('data-target'));
        // console.log("Drill down");
        if ((localStorage.getItem("lng") == null) || (localStorage.getItem("lng") == "ar")) {
          $('.back').html(`<i class="fas fa-arrow-left"></i>`)
        } else {
          $('.back').html(`<i class="fas fa-arrow-right"></i>`)
        }

        $('.level-up').removeClass('level-up');
        $('.level-current').addClass('level-up');
        $('.level-current').removeClass('level-current');
        target.addClass('level-current');
        $('.level-down').removeClass('level-down'); //.next().addClass('level-down')
      });

      // Back on Click
      $('.back').on("click", function () {
        if ($('.level-current').is(':first-child')) {
          // console.log("Current is top");
        } else {
          // console.log("Drill back up");
          $('.back').animate({
            opacity: 0
          });
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
      $('.custom-folder').on("click", function () {
        $('.back').animate({
          opacity: 0
        });
        $('.custom-folder').addClass('show');
        $('.custom-phased').removeClass('show');
        $('.level-current').removeClass('level-current');
        $('.folder-wrap').remove('level-up').remove('level-down');
        $('.folder-wrap:nth-child(1)').addClass('level-current');
        $('.upload-phasegate').animate({ opacity: 0, height: 0 }, 200);
      });
    }
  }
}
var checkFilesHTML = setInterval(function () {
  GetFilesFromFolder.preinit();
}, 1000);
var GetProject_Info = {
  onSuccess: function (sender, args) {

    var collListItem = GetProject_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var PID;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      PID = oListItem.get_id();
      ProjectType = oListItem.get_item('ProjectType');
      ProjectPhase = oListItem.get_item('Phase');
    }

    $('div#particles-foreground, div#particles-background, .vertical-centered-box').animate({
      opacity: 0
    }, {
      duration: 333,
      complete: function () {
        $('div#particles-foreground, div#particles-background, .vertical-centered-box').remove();

      }
    });
    Phases_Data_Request.init();
  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($('.ms-Icon--Settings').length) {
      clearInterval(checkNotificationHTML);
      SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        GetProject_Info.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
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
  g: {

  }
};
//get phases
var Phases_Data_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Phases_Data_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Phases_Data_Request.g.PhasesArray.push({
        phase: oListItem.get_item('Title'),
        sort: oListItem.get_item('ListSort'),
      });
    }
    $('select#phases option').remove();
    $('select#phases').prepend('<option value="" disabled selected>Select Phase</option>');
    for (var i = 0; i < Phases_Data_Request.g.PhasesArray.length; i++) {
      $('select#phases').append(new Option(Phases_Data_Request.g.PhasesArray[i].phase, Phases_Data_Request.g.PhasesArray[i].phase));
      phasesFoldersHtml += '<div class="tile folder" data-target="#' + encodeURI(Phases_Data_Request.g.PhasesArray[i].phase.replace(/[^a-z0-9]/gi, '')) + '"><i class="fas fa-folder"></i><h3>' + Phases_Data_Request.g.PhasesArray[i].phase + '</h3><p>' + PCODE + '</p></div>';
    }
    Phases_Data_Request.g.phasesSelect();
    GetFilesFromFolder.g.submitPhaseGate();
    $('.folder-wrap#Phasegate').html(phasesFoldersHtml);
    // GetFilesFromFolder.g.folderBehavior();

  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Phases');
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name=\'ListSort\' Ascending=\'True\' /></OrderBy></Query></View>');
    Phases_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Phases_Data_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Phases_Data_Request.onSuccess),
      Function.createDelegate(this, Phases_Data_Request.onError)
    );
  },
  // Global variables
  g: {
    PhasesArray: [],
    phasesSelect: function () {
      $('select#phases').change(function () {
        PhaseGateDocuments_Request.init($(this).val())
      });
    }
  }
};
// get phase gate documents
var PhaseGateDocuments_Request = {
  // The main Initialization function
  init: function (ProjectPhase) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle('Phase Gate Documents');
    var camlQuery = new SP.CamlQuery();
    var PQUERY;
    if (PCODE) {
      PQUERY = '<View><Query><Where><And><Eq><FieldRef Name="ProjectType" /><Value Type="Choice">' + ProjectType + '</Value></Eq><Eq><FieldRef Name="Phase" /><Value Type="Text">' + ProjectPhase + '</Value></Eq></And></Where><OrderBy><FieldRef Name=\'Sort\' Ascending=\'True\' /></OrderBy></Query></View>';
    } else {
      PQUERY = '<View><Query></Query></View>';
    }
    camlQuery.set_viewXml(PQUERY);
    PhaseGateDocuments_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(PhaseGateDocuments_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, PhaseGateDocuments_Request.onSuccess),
      Function.createDelegate(this, PhaseGateDocuments_Request.onError)
    );
  },
  onSuccess: function (sender, args) {

    var collListItem = PhaseGateDocuments_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    PhaseGateDocuments_Request.g.DocArray = [];
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      PhaseGateDocuments_Request.g.DocArray.push({
        doc: oListItem.get_item('Title'),
        sort: oListItem.get_item('Sort'),
      });
    }
    $('select#phasegatedoc option').remove();
    for (var i = 0; i < PhaseGateDocuments_Request.g.DocArray.length; i++) {
      $('select#phasegatedoc').append(new Option(PhaseGateDocuments_Request.g.DocArray[i].doc, PhaseGateDocuments_Request.g.DocArray[i].doc));
    }
  },
  onError: function (sender, args) {
    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($('.ms-Icon--Settings').length) {
      clearInterval(checkNotificationHTML);
      SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        PhaseGateDocuments_Request.init();
      });
    }
  },

  // Global variables
  g: {
    DocArray: []
  }
};
//PhaseGate folder submit
//upload multiple files to specific folder with column assigning
var UploadFiles = {
  readFiles: function () {
    var filesUploaded = 0;
    for (var i = 0; i < fileCount; i++) {
      let file = Fileelements.files[i];
      var reader = new FileReader();
      reader._NAME = Fileelements.files[i].name
      reader.onload = function (e) {
        let fileactualName = e.target._NAME;
        UploadFiles.init(e.target.result, fileactualName);
      }
      reader.onerror = function (e) {
        alert(e.target.error);
      }
      reader.readAsArrayBuffer(file);
    }
  },
  init: function (arrayBuffer, fileName) {
    //Get Client Context,Web and List object.
    var clientContext = new SP.ClientContext();
    var oWeb = clientContext.get_web();
    var oList = oWeb.getFolderByServerRelativeUrl(_spPageContextInfo.webServerRelativeUrl + '/' + ListArray[2].documents + '/' + PCODE + '/PhaseGate');
    // oWeb.get_lists().getByTitle('Projects Documents');

    //Convert the file contents into base64 data
    var bytes = new Uint8Array(arrayBuffer);
    var i, length, out = '';
    for (i = 0, length = bytes.length; i < length; i += 1) {
      out += String.fromCharCode(bytes[i]);
    }
    var base64 = btoa(out);
    //Create FileCreationInformation object using the read file data
    var createInfo = new SP.FileCreationInformation();
    createInfo.set_content(base64);
    createInfo.set_url(fileName);
    //Add the file to the library
    var myFolder = oList.get_files().add(createInfo)
    var myListItem = myFolder.get_listItemAllFields();
    myListItem.set_item("PhaseGateItem", $('select#phasegatedoc').val());
    myListItem.set_item("RelatedPhase", $('select#phases').val());
    myListItem.update();
    //Load client context and execcute the batch
    clientContext.load(myFolder);
    clientContext.executeQueryAsync(UploadFiles.UploadQuerySuccess, UploadFiles.UploadQueryFailure);
  },
  UploadQuerySuccess: function () {
    isuploaddone++;
    // console.log('File Uploaded Successfully.');
    if (fileCount == isuploaddone) {
      $('button.Gate-Submit').attr("disabled", false);
      $('.upload-phasegate').removeClass('was-validated');
      $('.upload-phasegate').append('<p class="successmsg" style="margin: 7px 7px;" resource-done="true">Success</p>');
    }
  },
  UploadQueryFailure: function (sender, args) {
    console.log('Request failed with error message - ' + args.get_message());
    $('button.Gate-Submit').attr("disabled", false);
    $('.loading-wait').hide();
    if (args.get_message().indexOf('already exists') > -1) {
      $('.upload-phasegate').append('<p class="errormsg">' + args.get_message().split('/').pop().split('It was')[0] + '</p>');

    }
  }
}
    //end upload phasegate