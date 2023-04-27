//var logo = require('../../../HelperRessources/img/print-logo.png');
var logo = "";
//= isArabic ? require('../../../HelperRessources/img/main-logo.svg') : require('../../../HelperRessources/img/main-logo-en.svg');
(window.isNew = window.location.href.toLowerCase().indexOf("new.aspx") > -1),
  (window.isEdit =
    window.location.href.toLowerCase().indexOf("edit.aspx") > -1),
  (window.isView =
    window.location.href.toLowerCase().indexOf("view.aspx") > -1),
  window.JSON_File_Name,
  (window.MasterDetailsArrayRequest = []),
  (window.MasterDetailsArrayNew = []),
  (window.MasterDetailsArrayEdit = []),
  (window.RelativeServerURL =
    _spPageContextInfo.siteServerRelativeUrl == "/"
      ? ""
      : _spPageContextInfo.siteServerRelativeUrl);
window.isPrint = false;
window.valueBasedOnParent = [] //valueBasedOnParent for wf delivrable as an ex
var attachCount = 0;
var printDate;
var pluseAttachCount = 0;
var RevenuesAmount = 0;
var RevenuesAmountInit = 0;
var revenuesAmountInitMiles = 0;
var parentBudgetValue = 0;
if (
  localStorage.getItem("lng") == null ||
  localStorage.getItem("lng") == "ar"
) {
  var enternameemail = Resources.ar["enternameemail"];
  window.notEditableItem = Resources.ar["notEditableItem"];
  window.editablebyowneronly = Resources.ar["editablebyowneronly"];
} else {
  var enternameemail = Resources.en["enternameemail"];
  window.notEditableItem = Resources.en["notEditableItem"];
  window.editablebyowneronly = Resources.en["editablebyowneronly"];
}

if (
  localStorage.getItem("lng") == null ||
  localStorage.getItem("lng") == "ar"
) {
  var No_Data = "لا يوجد";
} else {
  var No_Data = "No Data";
}

// Url Parameters
(window.IID = ""),
  window.SP_ListName,
  window.listkey,
  window.isPrjRelated,
  (window.KeysFolders = []),
  window.PageTitle,
  (window.PCODE = ""),
  (window.ICODE = ""),
  (window.STCODE = ""),
  (window.PCODE_STRING = "");
window.btnDeleteLabel = "";
var siteRootName = window.location.href.split("/")[4];
window.validattachments = [];
if (window.location.href.indexOf("IID=") > -1) {
  IID = window.location.href.split("IID=")[1].split("&")[0];
}
if (window.location.href.indexOf("ListKey") > -1) {
  listkey = window.location.href.split("ListKey=")[1].split("&")[0];
  isPrjRelated = USERProjRelated.indexOf(listkey) > -1 ? true : false;
  for (var i = 0; i < ListArray.length; i++) {
    var obj = ListArray[i];
    if (obj.subfolder) KeysFolders.push(Object.keys(obj)[0]);
    for (var key in obj) {
      if (key == window.location.href.split("ListKey=")[1].split("&")[0]) {
        SP_ListName = obj[key];
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          PageTitle = obj["FormTitle"];
          btnDeleteLabel = obj["DeleteLabel"];
        } else {
          PageTitle = obj["TitleEn"];
          btnDeleteLabel = obj["DeleteLabelEn"];
        }
      }
    }
  }
}

if (window.location.href.indexOf("PCODE=") > -1) {
  PCODE = window.location.href.split("PCODE=")[1].split("&")[0];
  PCODE_STRING = "&PCODE=" + PCODE;
} else if (window.location.href.indexOf("ICODE=") > -1) {
  ICODE = window.location.href.split("ICODE=")[1].split("&")[0];
  PCODE_STRING = "&ICODE=" + ICODE;
}
else if (window.location.href.indexOf("STCODE=") > -1) {
  STCODE = window.location.href.split("STCODE=")[1].split("&")[0];
  PCODE_STRING = "&STCODE=" + STCODE;
}
//determinig json file name
if (isNew) {
  JSON_File_Name =
    window.location.href.split("ListKey=")[1].split("&")[0] + "_New.js";
} else if (isEdit) {
  JSON_File_Name =
    window.location.href.split("ListKey=")[1].split("&")[0] + "_Edit.js";
} else if (isView) {
  JSON_File_Name =
    window.location.href.split("ListKey=")[1].split("&")[0] + "_View.js";
}
//calling relevant function
var checkStatusHtml = setInterval(function () {
  if (isView) View_ListInfo.preinit();
  else if (!isView) {
    ListInfo.preinit();
  }
}, 1000);
//for edit and new forms
window.ListInfo = {
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".container-body").length) {
      //username
      $(".navbar .user-name").text(
        UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join("")
      );
      $(".user-name-full").text(UserN.Title);
      clearInterval(checkStatusHtml);
      //get form's json
      $.getScript(
        "" +
        _spPageContextInfo.webAbsoluteUrl +
        "/Style%20Library/spm/JSON/" +
        listkey +
        "/" +
        JSON_File_Name
      ).done(function (script, textStatus) {
        SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
          ListInfo.InfoLoop();
        });
      });
    }
  },
  InfoLoop: function () {

    var htmlBuilder = isWF
      ? '<div class="section1 approvalHeader col-12"><div class="d-flex justify-content-between w-100"><div class=""><span class="bold Resources" data-trans-' +
      USERlistkey +
      '></span>' + ' ' + '<span class="mx-3 wf-project-name"></span></div><div class=""><span class="bold Resources" data-trans-taskname></span><span class="mx-3 wf-task-name"></span></div></div></div><h2 class="approvalHeader Resources" data-trans-taskformtitle>النموذج المعتمد</h2>'
      : "";

    // var htmlBuilder = "";
    var Label, Description;
    var printHtml = "";
    var toggleSectionName;

    // to handle the default form value
    var formDefaultValues = [], dataFormDefaultValue = "";

    var workflowSetValues = [], dataWorkflowSetValues = "";

    var basedOnParentSetValues = [], dataBasedOnParentSetValues = "";

    var basedOnParentSetValuesListiner = ""

    asyncFor.seqProcess(
      Information_Form,
      function (item, index, resolve) {
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          Label = item.label;
          Description = item.description;
        } else {
          Label = item.labelEn;
          Description = item.descriptionEn;
        }

        // to handle the default form value
        formDefaultValues = item.formDefaultValues

        if (formDefaultValues && formDefaultValues.length) {
          dataFormDefaultValue = 'data-formDefaultValue="' +
            JSON.stringify(formDefaultValues).replaceAll(
              `"`,
              `'`
            ) +
            '"'
        } else {
          dataFormDefaultValue = ""
        }

        // to handle the workflowSetValues
        workflowSetValues = item.workflowSetValues

        if (workflowSetValues && workflowSetValues.length) {
          dataWorkflowSetValues = 'data-workflowSetValue="' +
            JSON.stringify(workflowSetValues).replaceAll(
              `"`,
              `'`
            ) +
            '"'
        } else {
          dataWorkflowSetValues = ""
        }
        //

        //to handle set value based on parent
        basedOnParentSetValues = item.formValuesBasedOnParent
        if (basedOnParentSetValues && basedOnParentSetValues.length) {
          dataBasedOnParentSetValues = 'data-basedOnParentSetValues="' +
            JSON.stringify(basedOnParentSetValues).replaceAll(
              `"`,
              `'`
            ) +
            '"'

          var code = ""
          if (PCODE) {
            code = PCODE
          } else if (ICODE) {
            code = ICODE
          }
          if (PCODE || ICODE) {
            basedOnParentSetValues.forEach(el => {
              get_parent_data.init(el.parentList, code, el.parentFieldName, el.fieldName, el.getGrandParent) // to get value from parent list to use it when submit
            })
          }
          else {
            basedOnParentSetValuesListiner = basedOnParentSetValues

            var listinerField = basedOnParentSetValuesListiner[0].listinerField

            $("body").on("change", `#${listinerField}`, function (event) { // change it to body to can invoke the listiner in master details
              get_parent_data.init(basedOnParentSetValuesListiner[0].parentList, event.target.value, basedOnParentSetValuesListiner[0].parentFieldName, basedOnParentSetValuesListiner[0].fieldName, basedOnParentSetValuesListiner[0].getGrandParent) // to get value from parent list to use it when submit
            })

          }

        } else {
          dataBasedOnParentSetValues = ""
        }
        //




        toggleSectionName = item.togglename

        //Handle security
        var groups = [],
          targetList = "",
          sectionType = "",
          rendersection = true;
        if (item.hasOwnProperty("security")) {
          if (item.security.groups.length > 0) {
            console.log("SECURITY1");

            for (var z = 0; z < item.security.groups.length; z++) {
              groups.push(item.security.groups[z]);

              if (Groups.indexOf(item.security.groups[z]) == -1) {
                rendersection = false;
              } else {
                rendersection = true;
                // break; // to save all groups in data-groups to can open and close the fields
              }
            }
            groups = groups.join(" ");
          }
        }

        if (item.hasOwnProperty("sectiontype")) {
          //both attr should be available
          targetList = 'data-target_list="' + item.targetlist + '"';
          sectionType = 'data-section_type="' + item.sectiontype + '"';
        }

        htmlBuilder +=
          '<div style="display:' +
          item.display +
          '" class="py-5 border-bottom section-container ' +
          listkey +
          ' " ' +
          targetList +
          " " +
          sectionType +
          ' data-groups="' +
          groups +
          '">' +
          '<div class="form-row">' +
          '<div class="col-lg-3 col-md-4 mb-4">' +
          "<h3 class='sideTitle'>" +
          Label +
          "</h3>" +
          '<span class="font-14">' +
          Description +
          "</span>" +
          "</div>" +
          '<div data-togglename=' + toggleSectionName + ' ' + dataFormDefaultValue + ' ' + dataWorkflowSetValues + ' ' + dataBasedOnParentSetValues + ' class="col-lg-9 col-md-8 white-box p-4 fieldset-container ' + item.className + '">';

        asyncFor.seqProcess(
          item.subFields,
          function (subitemField, indexField, resolveField) {
            ListInfo.RenderForm(
              subitemField,
              null,
              function (flag, htmlResult) {
                resolveField(subitemField, indexField, {
                  htmlResult: htmlResult,
                });
              }
            );
          },
          function (subitemField, indexField, dataField, isDoneField) {
            htmlBuilder += dataField.htmlResult;
            if (isDoneField) {
              resolve(item, index, dataField, true);
            }
          }
        );
      },
      function (item, index, data, isDone) {
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          Label = item.label;
        } else {
          Label = item.labelEn;
        }
        // console.log('Finishing label ' + Label + ' - IsDone: ' + isDone);
        htmlBuilder += "</div></div></div>";



        if (isDone) {
          actionTaskHeader = "";
          if (isWF) {
            actionTaskHeader =
              '<h2 class="approvalHeader Resources mb-5" data-trans-taskDecision>	القرار</h2>';
          }
          htmlBuilder +=
            '<div class="py-5 btnactionrow savecancelBtns">' +
            actionTaskHeader +
            '<div class="form-row justify-content-end form-btns-wrapper">' +
            '<button data-trans-CancelButton class="btn btn-action btn-cancel cancel Resources" type="button"></button>' +
            '<button data-trans-SaveButton class="btn btn-action btn-save Resources" type="button"></button>' +
            "</div>" +
            "</div>";

          $(".container-body").html(htmlBuilder);

          // working on integration btn
          if (
            (isEdit && PCODE && listkey == "projectcharter") ||
            (isEdit && ICODE && listkey == "initiativecards")
          ) {
            if (
              localStorage.getItem("lng") == null ||
              localStorage.getItem("lng") == "ar"
            ) {
              $(".form-btns-wrapper").append(
                '<button  class="data-trans-integrationbutton btn btn-action integration-save Resources" type="button">الربط مع نظام الأرشفة</button>'
              );
            } else {
              $(".form-btns-wrapper").append(
                '<button  class="data-trans-integrationbutton btn btn-action integration-save Resources" type="button">Integration With Achive</button>'
              );
            }
            $(".integration-save").css({
              "pointer-events": "none",
              opacity: "0.6",
              "min-width": "25rem",
            });
          }
          // end working on integration btn

          //$('.project-Title-Name').text(PageTitle);
          $(".breakLine").before('<div class="col-md-12"></div>');
          SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
            if (
              (workflowname == "Project" || SP_ListName == "Projects") &&
              IID
            ) {
              GetProject_Info.init();
            } else {
              GetCurrentStage_Info.init();
            }
          });
          changeResources();
          //handle master details
          // var masterDetailsIndex = 1
          if ($("[data-section_type]").length > 0) {
            $("[data-section_type]").each(function () {
              Masterindex = '1'
              MasterDetailsArrayRequest.push($(this).attr("data-target_list"));
              // if(isNew)
              // {
              $(this)
                .find(".fieldset-container > .CFIELD")
                .wrapAll('<div class="Details-Item NewItem" data-index="' + Masterindex + '"></div>');
              // }
              // else if(isEdit)
              // {
              //     $(this).find('.fieldset-container > .CFIELD').wrapAll('<div class="Details-Item EditItem"></div>');
              // }
            });
            //pluss
            MasterDetailsArrayRequest = Array.from(
              new Set(MasterDetailsArrayRequest)
            ); //remove duplicates
            MasterDetailsArrayNew = MasterDetailsArrayRequest;
            MasterDetailsArrayEdit = MasterDetailsArrayRequest;
            if (isNew) {
              ListInfo.g.newDetail();
            }
          }
          //handle people picker inputs
          $("div[type=picker]").each(function () {
            var mp = new MyPeoplePicker();
            mp.init(
              $(this).attr("id"),
              {
                PrincipalAccountType: "User",
                AllowMultipleValues: false,
              },
              function () {
                console.log("pick is done");
              }
            );
          });
          $("div[type=multipicker]").each(function () {
            var mp = new MyPeoplePicker();
            mp.init(
              $(this).attr("id"),
              {
                PrincipalAccountType: "User",
                AllowMultipleValues: true,
              },
              function () {
                console.log("multipick is done");
              }
            );
          });
          // handling dynamic fields that change data on the form
          $("select[dynamic=mainfield]").on("change", function () {
            var dyfieldname = $(this).attr("id");
            var dyid = $(this)
              .find("option[value=" + $(this).val() + "]")
              .attr("option-id");
            if (dyid) {
              Dynamic_Data_Request.init(
                $(this).data("listname"),
                dyid,
                dyfieldname
              );
            }
          });
          // this affectes on lookup selects
          $("select[dynamic=parent]").on("change", function () {
            console.log("inside dynamic parenttttt")
            debugger
            let parentFieldName = $(this).attr("id");
            let parentFieldValue = $(this).val();
            let customFilterValue = $(this)
              .find("option[value=" + parentFieldValue + "]")
              .data("customfiltervalue");


            let isCustomFilterValue = $(this).attr("iscustomfiltervalue");

            let affectedSelectsInfo = [];

            let parentCustomFilterValueFromSibling = $(this).attr("data-parentcustomfiltervalue")
            let notInvokeListiner = $(this).data("notinvokelistiner")

            $("[dynamic=" + parentFieldName + "]").each(function () {
              console.log(parentFieldName, "parentFieldName")

              let affectedFieldName = $(this).attr("id");
              let listName = $(this).data("listname");
              let filterField = $(this).data("filterfield");
              let filterFieldType = $(this).data("filterfieldtype");
              let valFieldKey = $(this).data("valfieldkey");
              let dispFieldKey = $(this).data("dispfieldkey");
              // let specificVal = $(this).data("queryfieldvalue");
              let queryFieldValue = $(this).data("queryfieldvalue");
              let queryFieldName = $(this).data("queryfield");
              let queryFieldType = $(this).data("queryfieldtype");




              // console.log($(this).data("queryFieldValue"), "sssssssa")
              affectedSelectsInfo.push({
                affectedFieldName: affectedFieldName,
                listName: listName,
                isCustomFilterValue: isCustomFilterValue,
                filterField: filterField,
                filterFieldType: filterField,
                parentFieldValue: parentFieldValue,
                customFilterValue: customFilterValue,
                filterFieldType: filterFieldType,
                valFieldKey: valFieldKey,
                dispFieldKey: dispFieldKey,
                queryFieldValue: queryFieldValue,
                queryFieldName: queryFieldName,
                queryFieldType: queryFieldType,
                parentCustomFilterValueFromSibling: parentCustomFilterValueFromSibling
                // dataSiblingvalue:dataSiblingvalue
              });
            });

            // added to handel the field to be dynamicparemnt and other (the filed can be parent and child on the same time)
            $("[seconeddynamic*=" + parentFieldName + "]").each(function () {
              let affectedFieldName = $(this).attr("id");
              let listName = $(this).data("listname");
              let filterField = $(this).data("filterfield");
              let filterFieldType = $(this).data("filterfieldtype");
              let valFieldKey = $(this).data("valfieldkey");
              let dispFieldKey = $(this).data("dispfieldkey");
              // let specificVal = $(this).data("queryfieldvalue");
              let queryFieldValue = $(this).data("queryfieldvalue");
              let queryFieldName = $(this).data("queryfield");
              let queryFieldType = $(this).data("queryfieldtype");

              // let dataSiblingvalue = $(this).data("siblingvalue")

              // console.log($(this).data("queryFieldValue"), "sssssssa")
              affectedSelectsInfo.push({
                affectedFieldName: affectedFieldName,
                listName: listName,
                isCustomFilterValue: isCustomFilterValue,
                filterField: filterField,
                filterFieldType: filterField,
                parentFieldValue: parentFieldValue,
                customFilterValue: customFilterValue,
                filterFieldType: filterFieldType,
                valFieldKey: valFieldKey,
                dispFieldKey: dispFieldKey,
                queryFieldValue: queryFieldValue,
                queryFieldName: queryFieldName,
                queryFieldType: queryFieldType,
                parentCustomFilterValueFromSibling: parentCustomFilterValueFromSibling
                // dataSiblingvalue:dataSiblingvalue
              });
            });
            //
            //

            if (notInvokeListiner) { // will not invoke the function if this attr true (we use it on hrsd initiative to filter on sos when chose startegy and level)
              console.log("Inside not invoke listiner")

            } else {

              // if(affectedSelectsInfo && affectedSelectsInfo !="undefined"){
              dynamicAffectSelect.init(affectedSelectsInfo);
              // }
            }
          });
          //max min dates
          $("input[type=date]:not([minimumdate=undefined])").change(
            function () {
              var start = $("#" + $(this).attr("minimumdate"));
              if ($(this).val()) start.attr("max", $(this).val());
            }
          );
          $("input[type=date]:not([maximumdate=undefined])").change(
            function () {
              var end = $("#" + $(this).attr("maximumdate"));
              if ($(this).val()) end.attr("min", $(this).val());
            }
          );
          $(
            'input[type=number][data-manipulates="year"]:not([mindata=undefined])'
          ).change(function () {
            var minData = $("#" + $(this).attr("mindata"));
            if ($(this).val()) minData.attr("max", $(this).val());
          });
          $(
            'input[type=number][data-manipulates="year"]:not([maxdata=undefined])'
          ).change(function () {
            var maxData = $("#" + $(this).attr("maxdata"));
            if ($(this).val()) maxData.attr("min", $(this).val());
          });
          $(".showhide-trigger").on("click", function () {
            if ($(this).hasClass("active")) {
              $(this).parent().find(":not(.showhide-trigger)").fadeIn();
              $(this).removeClass("active");
              $(this).parent().find("label").css("display", "inline-block");
            } else {
              $(this).parent().find(":not(.showhide-trigger)").fadeOut();
              $(this).addClass("active");
            }
          });
          //new validation listiner

          //////////////////////////////// get siblings value like AcceptanceCriteria in benefits when change on delivrable

          $('body').on('change', '.getsiblingdata', function (event) { // get sibling value based on oter value




            var siblingData = $(this).find(':selected').data('siblingvalue')
            var siblingTarget = $(this).data('siblingtarget')

            if (siblingTarget && siblingTarget != 'undefined') {
              $(this).parent().parent().find(`#${siblingTarget}`).val(siblingData)
            }

            // handle array values

            var arraySibling = $(this).find(':selected').data('arraysiblingvalues')

            if (arraySibling && arraySibling.length) {
              arraySibling = eval(arraySibling)

              arraySibling.forEach(el => {
                $(this).parent().parent().find(`#${el.name}`).val(el.value)
              })

            }



          })
          ////////////////////////////// calculate the tax 15% as ksa
          $("input.tax").keyup(function (event) {
            var taxElement = $(this).data("targetelementtax");
            var amountElement = $(this).data("targetelementamount");
            var fieldValue = event.target.value;
            var amount = Number((fieldValue / 1.15).toFixed("2"));
            var tax = Number((fieldValue - amount).toFixed("2"));

            $(`#${amountElement}`).val(amount);
            $(`#${taxElement}`).val(tax);
          });
          ////////////////////////////// calculate the end date based on start date and duration

          $("input.autoEndDate").keyup(function (event) {
            // 
            if (event.which >= 37 && event.which <= 40) return;

            $(this).val(function (index, value) {
              return value
                .replace(/\D/g, "")
            });

            var duration = event.target.value

            var sourceElement = $(this).data('sourceelementdate');
            var sourceElementValue = $(`#${sourceElement}`).val();
            var targetElement = $(this).data('targetelementdate');

            if (sourceElementValue && duration) {
              duration = Number(duration)
              let start = new Date(sourceElementValue);
              let end = new Date(start);

              end.setMonth(end.getMonth() + duration)


              start = Dynamic_Data_Request.g.convertdate(start);
              end = Dynamic_Data_Request.g.convertdate(end);
              console.log(start, "start")
              console.log(end, "end")
              $(`#${targetElement}`).val(end)

              // const date2 = new Date(BaselineFinishDate);
              // const diffTime = Math.abs(date2 - date1);
              // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              // New_Data_Submit.g.oListItem.set_item("BaselineDuration", diffDays);
            }

          })


          ///////////////////////////////
          $("body").on("keyup", "input.percentbyparent", function (event) { // change it to body to can invoke the listiner in master details

            // $("input.percentbyparent").keyup(function (event) {
            // calculate the target elemnt like in delivrable

            var isMasterDetails = $(this).parent().parent().hasClass("Details-Item")
            var parentValue = 0,
              targetElement = "",
              fieldValue = 0,
              weight = 0;
            if (isMasterDetails) { // for new validation in master details
              if (listkey == "projects") {
                var actualBudget = $('#ActualBudget').val()
                var assignedBudget = $('#Amount').val()
                parentValue = (actualBudget && actualBudget != 0) ? actualBudget : assignedBudget
              } else if (listkey == "initiatives") {
                var initiativeBudget = $('#InitiativeBudget').val()

                parentValue = initiativeBudget

              }
              if (parentValue) {
                parentValue = parentValue.replaceAll(",", "")
                parentValue = Number(parentValue)
                targetElement = $(this).data("targetelem");
                fieldValue = event.target.value;
                weight = (fieldValue / parentValue) * 100;
                weight = weight.toFixed(2);
                $(this).parent().parent().find(`#${targetElement}`).val(weight)
              }
            } else {
              targetElement = $(this).data("targetelem");
              parentValue = $(this).data("parentval");
              fieldValue = event.target.value;
              weight = (fieldValue / parentValue) * 100;
              weight = weight.toFixed(2);
              $(`#${targetElement}`).val(weight);
            }
          });

          ///////////////////////////////
          $("body").on("keyup", "input.weightfloatpercentage", function (event) { // change it to body to can invoke the listiner in master details

            // $("input.weightfloatpercentage").keyup(function (event) {
            //   
            var isMasterDetails = $(this).parent().parent().hasClass("Details-Item")
            var parentValue = 0,
              targetElement = "",
              fieldValue = 0,
              amount = 0;

            if (isMasterDetails) { // for new validation in master details

              if (listkey == "projects") {
                var actualBudget = $('#ActualBudget').val()
                var assignedBudget = $('#Amount').val() // change AssignedBudget to Amount
                parentValue = (actualBudget && actualBudget != 0) ? actualBudget : assignedBudget
              } else if (listkey == "initiatives") {
                var initiativeBudget = $('#InitiativeBudget').val()

                parentValue = initiativeBudget
              }
              if (parentValue && parentValue != 0) {
                parentValue = parentValue.replaceAll(",", "")
                parentValue = Number(parentValue)
                targetElement = $(this).data("targetelem");
                fieldValue = event.target.value;
                amount = (parentValue * fieldValue) / 100;
                amount = amount.toFixed(2);
                $(this).parent().parent().find(`#${targetElement}`).val(amount)
              }
            } else {
              parentValue = parentBudgetValue;
              targetElement = $(this).data("targetelem");
              fieldValue = event.target.value;
              amount = (parentValue * fieldValue) / 100;
              amount = amount.toFixed(2);
              $(`#${targetElement}`).val(amount);
            }
          });


          // listiner on ppicker
          //   $("div[type=picker] input[id$='TopSpan_HiddenInput']").on("change", function () { 
          //     console.log("fffffffffffffffff")
          //     alert('People Picker Value Changed');
          // })
          // $("body").on('change',"div[type=picker] input[id$='TopSpan_HiddenInput']",function(){
          //   console.log("BHHHHHHHHHHHHHHHHHHHHHHHHH")
          // })
          // $('input[id$="TopSpan_HiddenInput"]').on('change', function () {
          //   alert('People Picker Value Changed');
          // });
          //
          //////////////////////////////// disable_enable_section like master details if there is a value or not
          $("body").on("keyup", ".disable_enable_section", function (event) {

            var value = event.target.value
            if (value) {
              if (listkey == 'projects') {
                $("[data-target_list=Deliverables] .fieldset-container").removeClass("disable_section")
                $("[data-target_list=Milestones] .fieldset-container").removeClass("disable_section")
              } else if (listkey == 'initiatives') {
                $("[data-target_list=InitiativeDeliverables] .fieldset-container").removeClass("disable_section")
                $("[data-target_list=InitiativeMilestones] .fieldset-container").removeClass("disable_section")
              }

            } else {
              if (listkey == 'projects') {
                $("[data-target_list=Deliverables] .fieldset-container").addClass("disable_section")
                $("[data-target_list=Milestones] .fieldset-container").addClass("disable_section")
              } else if (listkey == 'initiatives') {
                $("[data-target_list=InitiativeDeliverables] .fieldset-container").addClass("disable_section")
                $("[data-target_list=InitiativeMilestones] .fieldset-container").addClass("disable_section")
              }
            }
          })

          //////////////////////////////// make attachement required when change on radio yes
          var previuosTargetVal = "";
          $("input.yesnolistener").on("change", function (event) {


            var value = event.target.value;

            var targetElementRequired = $(this).data("targetfieldrequired");

            // if we need to apply that when click on is delivered yes the status will be completed
            var targetElement = $(this).data('targetfield')
            var targetElementValue = $(this).data('targetfieldvalue')


            if (value == 'yes' && (targetElement && targetElement != 'undefined') && (targetElementValue && targetElementValue != 'undefined')) {
              previuosTargetVal = $(`#${targetElement}`).val()
              $(`#${targetElement}`).val(targetElementValue)
              $(`#${targetElement}`).attr("disabled", true)
            } else if (value == 'no' && (targetElement && targetElement != 'undefined') && (targetElementValue && targetElementValue != 'undefined')) {
              console.log(previuosTargetVal, "previuosTargetVal in else")
              $(`#${targetElement}`).val(previuosTargetVal)
              $(`#${targetElement}`).attr("disabled", false)

            }

            // to handle required on attachement
            if (
              (value == "yes" || value == "true") &&
              targetElementRequired &&
              targetElementRequired != "undefined"
            ) {

              targetElementRequired = targetElementRequired.split(",")


              targetElementRequired.forEach(el => {
                $(`#${el}`).attr("required", true);

                var checkAttach = $(`#${el}`).parent().find(">*").closest(".attlabel")

                if (checkAttach.length > 0) {
                  $(`#${el}`)
                    .parent()
                    .find(">*")
                    .closest(".attlabel")
                    .attr("required", true);
                } else {
                  $(`#${el}`)
                    .parent()
                    .find(">*")
                    .attr("required", true);
                }
              })

              // $(`#${targetElementRequired}`).attr("required", true);

              // var checkAttach =$(`#${targetElementRequired}`).parent().find(">*").closest(".attlabel")

              // if(checkAttach.length > 0){
              // $(`#${targetElementRequired}`)
              //   .parent()
              //   .find(">*")
              //   .closest(".attlabel")
              //   .attr("required", true);
              // }else{
              //   $(`#${targetElementRequired}`)
              //   .parent()
              //   .find(">*")
              //   .attr("required", true);
              // }
            } else if (
              (value == "no" || value == "false") &&
              targetElementRequired &&
              targetElementRequired != "undefined"
            ) {
              targetElementRequired = targetElementRequired.split(",")

              targetElementRequired.forEach(el => {

                $(`#${el}`).attr("required", false);


                var checkAttach = $(`#${el}`).parent().find(">*").closest(".attlabel")

                if (checkAttach.length > 0) {
                  $(`#${el}`)
                    .parent()
                    .find(">*")
                    .closest(".attlabel")
                    .attr("required", false);
                } else {
                  $(`#${el}`)
                    .parent()
                    .find(">*")
                    .attr("required", false);
                }
              })

              // $(`#${targetElementRequired}`).attr("required", false);


              // var checkAttach =$(`#${targetElementRequired}`).parent().find(">*").closest(".attlabel")

              // if(checkAttach.length > 0){
              //   $(`#${targetElementRequired}`)
              //   .parent()
              //   .find(">*")
              //   .closest(".attlabel")
              //   .attr("required", false);
              // }else{
              //   $(`#${targetElementRequired}`)
              //   .parent()
              //   .find(">*")
              //   .attr("required", false);
              // }


            }
            //
          });


          // add new style for wf

          if (isWF) {
            $(".FormContainer").addClass("wf-mode");
            $("#navbarsParent").addClass("wfMode");
            $(".page-nav").attr("style", "display: none !important");
            $(".sidebar").attr("style", "display: none !important");
            $(".main-panel").attr("style", "width: 100% !important");
            // getTaskHistory.init();
            Get_TaskHistory.init()
          }
          //
          //////add section to cr
          if (!isCrMode && crListKey) {
            //on new custom cr
            handleCustomeCr.init();
            $(
              "div#particles-foreground, div#particles-background, .vertical-centered-box"
            ).animate(
              {
                opacity: 0,
              },
              {
                duration: 333,
                complete: function () {
                  $(
                    "div#particles-foreground, div#particles-background, .vertical-centered-box"
                  ).remove();

                  // $('div#particles-foreground, div#particles-background, .vertical-centered-box').hide();
                },
              }
            );
          } else {
            $(
              "div#particles-foreground, div#particles-background, .vertical-centered-box"
            ).animate(
              {
                opacity: 0,
              },
              {
                duration: 333,
                complete: function () {
                  $(
                    "div#particles-foreground, div#particles-background, .vertical-centered-box"
                  ).remove();

                  // $('div#particles-foreground, div#particles-background, .vertical-centered-box').hide();
                },
              }
            );
          }
          // get getTotalSelectedValues 
          var totalValuesWeight = 0
          $("input.getTotalSelectedValues").change(function () {



            var fieldValue = $(this).data("getothervalue")
            var targettotalelement = $(this).data("targettotalelement")

            var budget = 0;
            var amount = 0


            if (isEdit) {
              totalValuesWeight = $(`#${targettotalelement}`).val()
              totalValuesWeight = Number(totalValuesWeight)
            }

            if (projectActualBudget > 0) {
              budget = projectActualBudget
            } else {
              budget = projectAssignedBudget
            }

            if (fieldValue && fieldValue != 'undefined') {
              fieldValue = Number(fieldValue)
            } else {
              fieldValue = 0
            }

            amount = (budget * fieldValue) / 100;

            if ($(this).is(':checked')) {

              totalValuesWeight = totalValuesWeight + amount
            } else {
              totalValuesWeight = totalValuesWeight - amount
            }
            $(`#${targettotalelement}`).val(totalValuesWeight)
            $("input.tax").trigger('keyup') // invoke tax  feature after fill the total amount
          })
          //
          //////// apply grandFieldInvoke
          $(".grandFieldInvoke").on("change", function (event) {




            var grandId = $(this).data("grandfieldid")
            var childId = $(this).data("childfieldid")
            var childFieldIdSource = $(this).data("childfieldidsource")

            var elementValue = event.target.value

            if (grandId && elementValue && childId && childFieldIdSource) {
              var customFilterValue = $(this).find("option[value=" + elementValue + "]").data("customfiltervalue"); // will add the value on parent to can handle the query in dynamic func

              $(`#${grandId}`).data("notinvokelistiner", false)
              $(`#${grandId}`).attr("data-seconedvaluelistiner", elementValue)
              $(`#${grandId}`).attr("data-parentcustomfiltervalue", customFilterValue)
              $(`#${childId}`).data("queryfield", childFieldIdSource)
              $(`#${childId}`).data("queryfieldvalue", elementValue)
              $(`#${childId}`).data("queryfieldtype", "Text")

              // window.setTimeout(function(){
              $(`select[dynamic=parent][id=${grandId}]`).trigger('change') // to trigger only one field (correct field)
              // },1500)
            }

          })



          ///
          $("input.number").keyup(function (event) {
            // skip for arrow keys
            if (event.which >= 37 && event.which <= 40) return;


            var totalElement = $(this).data("totalelement")
            var sum1 = $(this).data("sum1element")
            var sum2 = $(this).data("sum2element")

            var max = $(this).data("maxfield")
            var resetElement = $(this).data('resetelement')
            var elementVal = event.target.value
            // set max value
            if (max && max != 'undefined') {

              var maxValue = $(`#${max}`).val() ? $(`#${max}`).val() : 0
              maxValue = maxValue.replaceAll(",", "")
              elementVal = elementVal.replaceAll(",", "")
              elementVal = Number(elementVal)
              maxValue = Number(maxValue)
              if (elementVal <= maxValue) {
                // $(this).focusout(function() {
                $(this).val(function (index, value) {
                  return value
                    .replace(/\D/g, "")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                });
                // });
              } else {
                $(this).val(null)
              }

            } else if (resetElement && resetElement != 'undefined' && !elementVal) {
              $(`#${resetElement}`).val(null)
            } else {
              // format number
              // $(this).focusout(function() {
              $(this).val(function (index, value) {
                return value
                  .replace(/\D/g, "")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              });
              // });
            }

            /// 

            if (totalElement && totalElement != 'undefined' && sum1 && sum1 != 'undefined' && sum2 && sum2 != 'undefined') {
              var value1 = $(`#${sum1}`).val()
              value1 = value1.replaceAll(",", "")
              value1 = Number(value1)
              var value2 = $(`#${sum2}`).val()
              value2 = value2.replaceAll(",", "")
              value2 = Number(value2)
              var total = value1 + value2
              $(`#${totalElement}`).val(total)
            }
          });



          $("body").on("change", ".decimalnumber", function (event) {
            // add this to handle the num with dots in weight in initiative milestone
            // var input = $(this);

            var val = event.target.value;

            var splitVal = val.split(".");

            if (splitVal.length == 2 && splitVal[1].length > 1) {
              return (event.target.value =
                splitVal[0] + "." + splitVal[1].substr(0, 1));
            }

            if (val >= 0 && val <= 100) {
              event.target.value = val;
            } else {
              event.target.value = "";
            }
          });
          //////////////////////////////////////////////////////////////

          // disabled enable fields based on selection & onload

          $("[data-toggledisabledvalues]").on("change", function () {
            ListInfo.g.toggleDisabledFields($(this));

          })

          // hide show required based on selection & onload
          $("[data-requiredvalues]").on("change", function () {
            ListInfo.g.toggleRequiredFields($(this));
          });

          //hide show fields based on selection & onload
          $("[data-togglevalues]").on("change", function () {
            ListInfo.g.toggleFields($(this));
          });
          //remove require on disbaled fields
          setTimeout(function () {
            $(".CFIELD .disabled").removeAttr("required");
            $(".CFIELD :disabled").removeAttr("required");
            $('.CFIELD [disabled="disabled"]').removeAttr("required");
          }, 2000);
          //
          if (isEdit) {
            Idea_Info.init();
            // $('.title-item').text('تعديل');
            SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
              Edit_Data_Request.init();
            });
            Edit_Data_Submit.g.clickbait();
            Edit_Data_Submit.g.Cancel();

            // if (listkey == "invoices") {
            //   ListInfo.g.InvoicesTotal();
            // }
            if (listkey == "deliverables") {
              ListInfo.g.DeliverablesDelivered();
            }
            if (listkey == "goalstrategy") {
              ListInfo.g.requiredSpillarsName();
            }
            if (listkey == "projectcharter") {
              $("button.btn-save").on("click", function () {
                window.location =
                  _spPageContextInfo.siteAbsoluteUrl +
                  "/SitePages/ProjectHome.aspx?PCODE=" +
                  PCODE;
              });
              // working on integration btn
              $("button.integration-save").on("click", function () {
                Integration_Handler.Save_Integration();
              });
              // end working on integration btn
            }

            if (listkey == "initiativecards") {
              // working on integration btn
              $("button.integration-save").on("click", function () {
                Integration_Handler.Save_Integration();
              });
              // end working on integration btn
            }

            if (listkey == "projects") {
              Sectors_Info.init();
              $("#RelatedInitiative").on("change", function () {
                var initiativeCode = $(this).val();
                ProjectInitiativeDelevrable.init(
                  "InitiativeDeliverables",
                  initiativeCode
                );
              });
            }
            // if (USERisWF) {
            //   $(".form-btns-wrapper").hide();
            // }
            if (listkey == "initiatives") {
              Sectors_Info.init(); // to get the department related to sector on edit
              // ListInfo.g.showFieldsIfInitiativeVision();
              // $("#Types").on("change", function () {
              //   var type = $(this).val();
              //   Initiative_Sos.init("SOs", type); //get related sos depends on type
              //   if (type == "vision") {
              //     Initiative_Strategy_Sos.init("SOs");
              //   }
              // });
            }
            //change in Edit
            if (listkey == "sos") {
              Sectors_Info.init(); // to get the department related to sector on edit
              $("#RelatedStrategy").on("change", function () {
                var relatedStrategy = $(this).val();
                Goal_Strategy_Info.init(relatedStrategy);
              });
            }

            if (listkey == "mainkpi") {
              // $("#RelatedStrategyObjective").prop("disabled", true);

              // var relatedStrategyCode = $('#RelatedStrategy').val()
              // var indexType = $('#Types').val();

              // Goal_Strategy_Info.init(relatedStrategyCode)
              // Kpi_Related_Goal.init(relatedStrategyCode, indexType)

              // $("select#Types").change(function () {
              //   var relatedStrategyCode = $("#RelatedStrategy").val();
              //   var indexType = $(this).val();
              //   Goal_Strategy_Info.init(relatedStrategyCode);
              //   Kpi_Related_Goal.init(relatedStrategyCode, indexType);
              // });

              // $("select#RelatedStrategy").change(function () {
              //   var relatedStrategyCode = $(this).val();
              //   var indexType = $("#Types").val();
              //   Goal_Strategy_Info.init(relatedStrategyCode);
              //   Kpi_Related_Goal.init(relatedStrategyCode, indexType);
              // });

              // $("select#SubRelatedObjective").change(function () {
              //   var sosStrategy = $(this).val();
              //   Get_Related_Sos_Sector.init(sosStrategy);
              // });

              // get the sector of related strategy obj from sos limk we cant us dynamic cause there is no name for sector just code

              $("select#RelatedStrategyObjective").change(function () {
                var sosStrategy = $(this).val();
                Get_Related_Sos_Sector.init(sosStrategy);
              });
            }

            //
          } else {
            //custom
            if (listkey == "budgetitems") {
              ListInfo.g.budgetitem();
            }

            // if (listkey == "invoices") {
            //   ListInfo.g.InvoicesTotal();
            // }

            if (listkey == "initiatives") {
              // Initiative_Stages_Data_Request.init();
              Sectors_Info.init(); // sector
              // ListInfo.g.showFieldsIfInitiativeVision();
              // $("#Types").on("change", function () {
              //   var type = $(this).val();
              //   Initiative_Sos.init("SOs", type); //get related sos depends on type

              //   if (type == "vision") {
              //     Initiative_Strategy_Sos.init("SOs");
              //   }
              // });
            }
            if (listkey == "deliverables") {
              console.log("IN NEEEEEEEEEEEEEEW");
              ListInfo.g.DeliverablesDelivered();
            }
            if (listkey == "goalstrategy") {
              ListInfo.g.requiredSpillarsName();
            }
            // if (USERisWF || UserHaveLicense == false) {
            //   $(".form-btns-wrapper").hide();
            //   $(".btnactionrow").hide();
            // }
            if (UserHaveLicense == false) {
              $(".container-body").prepend(
                '<div class="noLicense"><span data-trans-nolicense class="Resources"></span></div>'
              );
              changeResources();
            }
            // $('.title-item').text('إضافة');
            //disable types dropdowns ghufran
            // if (isVROP) {
            //   if (listkey == "mainkpi") {
            //     // $('#Types').val('main');
            //     // $('#Types').prop('disabled', true);
            //     // ListInfo.g.toggleFields($("#Types")); // call the toggle fied when field is disabled
            //   } else if (listkey == "goalstrategy") {
            //     $("#Types").val("vision");
            //     $("#Types").prop("disabled", true);
            //     ListInfo.g.toggleFields($("#Types")); // call the toggle fied when field is disabled and should the type be vision on vrop
            //   }
            // }
            // if (isVROE) {
            //   if (listkey == "initiatives") {
            //     $("#Types").val("vision");
            //     $("#Types").prop("disabled", true);
            //   }
            // }
            // if (isNew && isEPMO) {
            //   if (listkey == "initiatives") {
            //     $("#Types").val("strategically");
            //     $("#Types").prop("disabled", true);
            //   }
            // }
            // if (isEdit && isEPMO) {
            //   if (listkey == "initiatives") {
            //     // $('#Types').val('strategically');
            //     $("#Types").prop("disabled", true);
            //   }
            // }
            // if (isStrategyTeam || isVROP) {
            //   if (listkey == "sos") {
            //     // $("#Types").val("main");
            //     // $("#Types").prop("disabled", true);
            //   }
            // }
            // if (listkey == "goalstrategy") {
            //   if (isVROP) {
            //     $("#Types").val("vision");
            //     $("#Types").prop("disabled", true);
            //   }
            // }

            // if (isSPMAdmin) {
            //   if (listkey == "sos") {
            //     $("#Types").val("sub");
            //     $("#Types").prop("disabled", true);
            //     $("#RelatedObjective").parent().css("display", "block");
            //   }
            // }
            if (listkey == "benefits" && ICODE && (isNew || isEdit || isView)) {
              //hide Initiative field if we are in the Initiative
              $("#InitiativeCode").parent().css("display", "none");
            }

            if (listkey == "projects") {
              SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
                Phases_Data_Request.init();
                Stages_Data_Request.init();
                Sectors_Info.init();
                if (isNew & USERisWF) {
                  window.Idea_Info.init();
                }
                if (isNew & USERisWF) {
                  $(
                    ".CFIELD.autofill input,.CFIELD.autofill textarea ,.CFIELD.autofill select"
                  ).prop("disabled", true);
                } else if (isNew & !USERisWF) {
                  $(
                    ".CFIELD.autofill input,.CFIELD.autofill textarea,.CFIELD.autofill select"
                  ).prop("disabled", false);
                }
              });
              //work on related initiative delevrable
              $("#RelatedInitiative").on("change", function () {
                var initiativeCode = $(this).val();
                ProjectInitiativeDelevrable.init(
                  "InitiativeDeliverables",
                  initiativeCode
                );
                // ProjectInitiativeMilestone.init('InitiativeMilestones', initiativeCode) //to get related initiativeMilestone
              });
              //end of related initiative delevrable
            }
            // get the strategy type related to strategy choice
            if (listkey == "sos") {
              Sectors_Info.init();
              $("#RelatedStrategy").on("change", function () {
                var relatedStrategy = $(this).val();
                Goal_Strategy_Info.init(relatedStrategy);
              });
            }
            if (listkey == "mainkpi") {
              // $("select#RelatedStrategy").change(function () {
              //   var relatedStrategyCode = $(this).val();
              //   var indexType = $("#Types").val();
              //   Goal_Strategy_Info.init(relatedStrategyCode);
              //   Kpi_Related_Goal.init(relatedStrategyCode, indexType);
              // });

              // get the sector from goal strategy i choosed

              // $("select#SubRelatedObjective").change(function () {
              //   var sosStrategy = $(this).val();
              //   Get_Related_Sos_Sector.init(sosStrategy);
              // });

              $("select#RelatedStrategyObjective").change(function () {
                var sosStrategy = $(this).val();
                Get_Related_Sos_Sector.init(sosStrategy);
              });
            }
            //
            //to get the milestones related to initiative that assigned to project
            if (listkey == "milestones" && PCODE) {
              Get_ProjectData_ByCode.init();
              // ProjectInitiativeMilestone.init('InitiativeMilestones', initiativeCode) //to get related initiativeMilestone
            }
            //

            New_Data_Submit.g.clickbait();
            New_Data_Submit.g.Cancel();
            $(".loader-box").fadeOut();
            //Risk Grade Matrix
            if (listkey == "risks") {
              $("input#RiskGrade").css(
                "background",
                "linear-gradient(to right, #c1c1c1 , #f6f7f9)"
              );
              $("select#Impact, select#Probability").on("change", function () {
                //Custom Priority formula
                var imp_trivial = $("select#Impact").val() == "Trivial";
                var prob_rare = $("select#Probability").val() == "Rare";
                //
                var imp_minor = $("select#Impact").val() == "Minor";
                var prob_unlikely = $("select#Probability").val() == "Unlikely";
                //
                var imp_moderate = $("select#Impact").val() == "Moderate";
                var prob_moderate = $("select#Probability").val() == "Moderate";
                //
                var imp_major = $("select#Impact").val() == "Major";
                var prob_likely = $("select#Probability").val() == "Likely";
                //
                var imp_extreme = $("select#Impact").val() == "Extreme";
                var prob_verylikely =
                  $("select#Probability").val() == "Very Likely";
                //
                // Low
                if (
                  (imp_trivial && prob_rare) ||
                  (imp_minor && prob_unlikely) ||
                  (imp_minor && prob_rare) ||
                  (imp_moderate && prob_rare) ||
                  (imp_trivial && prob_unlikely) ||
                  (imp_trivial && prob_moderate)
                ) {
                  // console.log("Low");
                  $("input#RiskGrade").val("Low");
                  $("input#RiskGrade").css(
                    "background",
                    "linear-gradient(to right, #37723b, #8cbd90)"
                  );
                }
                //Medium
                else if (
                  (imp_major && prob_rare) ||
                  (imp_extreme && prob_rare) ||
                  (imp_moderate && prob_unlikely) ||
                  (imp_major && prob_unlikely) ||
                  (imp_extreme && prob_unlikely) ||
                  (imp_minor && prob_moderate) ||
                  (imp_moderate && prob_moderate) ||
                  (imp_major && prob_moderate) ||
                  (imp_trivial && prob_likely) ||
                  (imp_minor && prob_likely) ||
                  (imp_moderate && prob_likely) ||
                  (imp_trivial && prob_verylikely) ||
                  (imp_minor && prob_verylikely)
                ) {
                  // console.log("Average");
                  $("input#RiskGrade").val("Medium");
                  $("input#RiskGrade").css(
                    "background",
                    "linear-gradient(to right, #dbdb28, #ffffb0)"
                  );
                }
                //High
                else if (
                  (imp_extreme && prob_moderate) ||
                  (imp_major && prob_likely) ||
                  (imp_extreme && prob_likely) ||
                  (imp_moderate && prob_verylikely) ||
                  (imp_major && prob_verylikely) ||
                  (imp_extreme && prob_verylikely)
                ) {
                  // console.log("High");
                  $("input#RiskGrade").val("High");
                  $("input#RiskGrade").css(
                    "background",
                    "linear-gradient(to right, #cc0000, #de9b9b)"
                  );
                } else {
                  $("input#RiskGrade").val("");
                  $("input#RiskGrade").css(
                    "background",
                    "linear-gradient(to right, #c1c1c1 , #f6f7f9)"
                  );
                }
              });
            }
          }
          ListInfo.g.pcodeval(); //no special and spaces allowed
          $(
            "div#particles-foreground, div#particles-background, .vertical-centered-box"
          ).animate(
            {
              opacity: 0,
            },
            {
              duration: 333,
              complete: function () {
                $(
                  "div#particles-foreground, div#particles-background, .vertical-centered-box"
                ).remove();

                // $('div#particles-foreground, div#particles-background, .vertical-centered-box').hide();
              },
            }
          );

          // goalstrategy change the title
          // to handle the title change and the master details section show and hide
          // if (listkey == "initiativedeliverables") {
          //   deliverabeInitiativePercent.init();
          // }
          if (listkey == "initiativemilestones") {
            //initMilestPercent.init();
            // set min max date on planned date for milestones
            if (InitiativeStartDate) {
              let initFinishDate = new Date(InitiativeFinishDate)
                .toISOString()
                .split("T")[0];
              $("input#PlannedCompletedDate").attr("max", initFinishDate);
            }
            if (InitiativeFinishDate) {
              let initStartDate = new Date(InitiativeStartDate)
                .toISOString()
                .split("T")[0];


              $("input#PlannedCompletedDate").attr("min", initStartDate);
            }
          }
          if (listkey == "benefitmetrics") {
            benefitmetricsPercent.init();
          }
          if (listkey == "goalstrategy") {
            $("#Types").on("change", function () {
              if ($(this).val() == "vision") {
                if ($("[data-section_type]").length > 0) {
                  $("[data-section_type]").each(function () {
                    if (
                      localStorage.getItem("lng") == null ||
                      localStorage.getItem("lng") == "ar"
                    ) {
                      $(this)
                        .find("label[for=Name]")
                        .html("البرنامج الاستراتيجي");
                      $(this)
                        .find("#Name")
                        .attr("placeholder", "البرنامج الاستراتيجي");
                      $(this).find(".sideTitle").html("البرامج الاستراتيجية");
                      $(document)
                        .find("label[for=PillarsExist]")
                        .html("هل يوجد برامج؟");
                    } else {
                      $(this).find("label[for=Name]").html("Strategy Program");
                      $(this)
                        .find("#Name")
                        .attr("placeholder", "Strategy Program");
                      $(this).find(".sideTitle").html("Strategy Programs");
                      $(document)
                        .find("label[for=PillarsExist]")
                        .html("Is Programs Exist?");
                    }
                  });
                  // $("[data-section_type]").show()
                }
              } else if ($(this).val() == "ministry" || $(this).val() == "sectorial" || $(this).val() == "lms" || $(this).val() == "sub") {
                if ($("[data-section_type]").length > 0) {
                  $("[data-section_type]").each(function () {
                    if (
                      localStorage.getItem("lng") == null ||
                      localStorage.getItem("lng") == "ar"
                    ) {
                      $(this)
                        .find("label[for=Name]")
                        .html("المحور الاستراتيجي");
                      $(this)
                        .find("#Name")
                        .attr("placeholder", "المحور الاستراتيجي");
                      $(this).find(".sideTitle").html("المحاور الاستراتيجية");
                      $(document)
                        .find("label[for=PillarsExist]")
                        .html("هل يوجد محاور؟");
                    } else {
                      $(this).find("label[for=Name]").html("Name");
                      $(this).find("#Name").attr("placeholder", "Name");
                      $(this).find(".sideTitle").html("Strategy pillars");
                      $(document)
                        .find("label[for=PillarsExist]")
                        .html("Is Pillars Exist?");
                    }
                  });
                  // $("[data-section_type]").show();
                }
              } else {
                $("[data-section_type]").hide();
              }
            });
            if (!isVROP) {
              // to make the pillers radio appear on load when the user is VROP because the default type should be vision
              $("[data-section_type]").hide();
              $("#PillarsExist").parent().hide();
            } else {
              if ($("[data-section_type]").length > 0) {
                $("[data-section_type]").each(function () {
                  if (
                    localStorage.getItem("lng") == null ||
                    localStorage.getItem("lng") == "ar"
                  ) {
                    $(this)
                      .find("label[for=Name]")
                      .html("البرنامج الاستراتيجي");
                    $(this)
                      .find("#Name")
                      .attr("placeholder", "البرنامج الاستراتيجي");
                    // $(this).find("#Name").attr("required", "required")
                    $(this).find(".sideTitle").html("البرامج الاستراتيجية");
                    $(document)
                      .find("label[for=PillarsExist]")
                      .html("هل يوجد برامج؟");
                  } else {
                    $(this).find("label[for=Name]").html("Strategy Program");
                    $(this)
                      .find("#Name")
                      .attr("placeholder", "Strategy Program");
                    $(this).find(".sideTitle").html("Strategy Programs");
                    $(document)
                      .find("label[for=PillarsExist]")
                      .html("Is Programs Exist?");
                  }
                });
              }
              $("[data-section_type]").hide();
            }

            $("body").on("change", "#PillarsExist", function (e) {
              var pillerExistVal = $(this).val();
              if (pillerExistVal == "yes") {
                $("[data-section_type]").show();
              } else {
                $("[data-section_type]").hide();
              }
            });
          }

          // arabic and english field on portfolio listkey
          if (listkey == "portfolio") {
            var arabicVal = "",
              englishVal = "";
            $("#Name").keyup(function (e) {
              //once u press out form keyboard
              var isArabic =
                /^([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd]|[\u0621-\u064A\s0-9]|[ ])*$/g;
              if (isArabic.test(e.target.value)) {
                $(this).val(e.target.value);
                arabicVal = e.target.value;
              } else {
                $(this).val(arabicVal);
              }
            });
            $("#NameEn").keyup(function (e) {
              //to stop writing Arabic language in English Field
              var isEnglish = /^([A-Za-z0-9]|[ ])*$/;
              if (e.target.value.match(isEnglish)) {
                $(this).val(e.target.value);
                englishVal = e.target.value;
              } else {
                $(this).val(englishVal);
              }
            });
          }
          // end arabic and english fields

          //calcul amount from Sum of all costs
          if (listkey == "budgetitems") {
            $('[id^="Cost"]').keyup(function () {
              var sum = 0;
              $('[id^="Cost"]').each(function () {
                var item_val = parseFloat($(this).val());
                if (isNaN(item_val)) {
                  item_val = 0;
                }
                sum += item_val;
                $("#Amount").val(sum);
              });
            });
          }
          ListInfo.g.attachmentsExtensions();
        }
      }
    );
  },
  RenderForm: async function (element, flag, OnSuccess) {
    if (listkey == "goalstrategy") {
      ListInfo.g.requiredSpillarsName();
    }



    // if(element.useAccessPolicy){
    //   await FunctionAsync(element.useAccessPolicyList)
    // //  initiateDataLevelAccess(element.useAccessPolicyList)
    // }
    // console.log('render', element.InternalName);
    var htmlBody = "";
    var groups = [],
      hidestagesIDs = "",
      isWfhidestagesIDs = "",
      isWfshowstagesIDs = "",
      showstagesIDs = "",
      disablestagesIDs = "",
      enablestagesIDs = "",
      requireOnWfTaskstagesIDs = "",
      isWfdisablestagesIDs = "",
      isWfenablestagesIDs = "",
      selected = "",
      dynamic = "",
      seconeddynamic = "",
      toggleValues = "",
      toggleFields = "",
      ToggleName = element.hasOwnProperty("ToggleName")
        ? "data-togglename=" + element.ToggleName
        : "",
      editableBy = element.hasOwnProperty("editableBy")
        ? 'data-editableby="' + element.editableBy + '"'
        : "",
      dontSubmit = element.hasOwnProperty("dontSubmit") ? "dont-submit" : "",
      hideField = element.display == "none" ? "hide-field" : "",
      dontSubmitRequired = element.hasOwnProperty("dontSubmitRequired") ? "dont-submit even-required" : "",
      dontRequest = element.hasOwnProperty("dontRequest") ? "dont-request" : "", // to avoid err on view
      inputLisKey = element.hasOwnProperty("listKey")
        ? `data-listkey="${element.listKey}" `
        : ` `,
      requiredValues = "",
      RequiredName = element.hasOwnProperty("RequiredName")
        ? "data-requiredname=" + element.RequiredName
        : "",

      toggleDisabledValues = "",
      toggleDisabledName = element.hasOwnProperty("ToggleDisabledName")
        ? "data-toggledisabledname=" + element.ToggleDisabledName
        : "";



    renderfield = true;
    window.acceptedExtensions;
    if (element.hasOwnProperty("security")) {
      if (element.security.groups.length > 0) {
        for (var z = 0; z < element.security.groups.length; z++) {
          groups.push(element.security.groups[z]); //.replace(/\s/g, '')

          if (Groups.indexOf(element.security.groups[z]) == -1) {
            renderfield = false;
          } else {
            renderfield = true;
            // break; // to save all groups in data-groups to can open and close the fields
          }
        }
        groups = groups.join(",");
      }
    }

    if (element.hasOwnProperty("requireOnWfTaskStage") && USERisWF) {
      requireOnWfTaskstagesIDs =
        'data-isWfrequirestageID="' + element.requireOnWfTaskStage + '"';
    }

    if (element.hasOwnProperty("hideOnWfTaskStage") && USERisWF) {
      isWfhidestagesIDs =
        'data-isWfhidestageID="' + element.hideOnWfTaskStage + '"';
    }
    if (element.hasOwnProperty("showOnWfTaskStage") && USERisWF) {
      isWfshowstagesIDs =
        'data-isWfshowstageID="' + element.showOnWfTaskStage + '"';
    }
    if (element.hasOwnProperty("disableOnWfTaskStage") && USERisWF) {
      isWfdisablestagesIDs =
        'data-isWfdisablestageID="' + element.disableOnWfTaskStage + '"';
    }
    if (element.hasOwnProperty("enableOnWfTaskStage") && USERisWF) {
      isWfenablestagesIDs =
        'data-isWfenablestageID="' + element.enableOnWfTaskStage + '"';
    }
    if (element.hasOwnProperty("hideonstage") && !USERisWF) {
      hidestagesIDs = 'data-hidestageID="' + element.hideonstage + '"';
    }
    if (element.hasOwnProperty("showonstage") && !USERisWF) {
      showstagesIDs = 'data-showstageID="' + element.showonstage + '"';
    }
    if (element.hasOwnProperty("disableonstage") && !USERisWF) {
      disablestagesIDs = 'data-disablestageID="' + element.disableonstage + '"';
    }
    if (element.hasOwnProperty("enableonstage") && !USERisWF) {
      enablestagesIDs = 'data-enablestageID="' + element.enableonstage + '"';
    }
    if (element.hasOwnProperty("dynamic")) {
      dynamic = "dynamic=" + element.dynamic;
    }

    if (element.hasOwnProperty("seconeddynamic")) {
      seconeddynamic = "seconeddynamic=" + element.seconeddynamic;
    }

    if (element.hasOwnProperty("toggleValues")) {
      element.toggleValues.forEach(function (item, i, arr) {
        var seperator = i == arr.length - 1 ? '"' : ":::";
        toggleValues +=
          i == 0
            ? 'data-toggleValues="' +
            item.value +
            "[" +
            item.fields.join(",") +
            "]" +
            seperator
            : item.value + "[" + item.fields.join(",") + "]" + seperator;
      });
    }
    /////////////////////////
    if (element.hasOwnProperty("requiredValues")) {
      element.requiredValues.forEach(function (item, i, arr) {
        var seperator = i == arr.length - 1 ? '"' : ":::";
        requiredValues +=
          i == 0
            ? 'data-requiredValues="' +
            item.value +
            "[" +
            item.fields.join(",") +
            "]" +
            seperator
            : item.value + "[" + item.fields.join(",") + "]" + seperator;
      });
    }
    /////////////////////////// to handle toggle disabled value
    if (element.hasOwnProperty("toggleDisabledValues")) {
      element.toggleDisabledValues.forEach(function (item, i, arr) {
        var seperator = i == arr.length - 1 ? '"' : ":::";
        toggleDisabledValues +=
          i == 0
            ? 'data-toggleDisabledValues="' +
            item.value +
            "[" +
            item.fields.join(",") +
            "]" +
            seperator
            : item.value + "[" + item.fields.join(",") + "]" + seperator;
      });
    }


    // console.log(showstagesIDs);
    var thistip;
    if (element.tooltip == undefined) {
      thistip = "";
    } else {
      thistip = 'data-tip="' + element.tooltip + '"';
    }

    var min;
    if (element.min == "today") {
      min = new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
    } else {
      min = "1900-01-01";
    }
    var max;
    if (element.max == "today") {
      max = new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
    } else {
      max = "9999-12-31";
    }
    selected = "selected";
    var displayName;
    var dispfieldkey;
    var descPhrase, isexist;

    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {
      displayName = element.DisplayName;
      descPhrase = element.descPhraseAr;
    } else {
      displayName = element.DisplayNameEn;
      descPhrase = element.descPhraseEn;
    }
    if (descPhrase == undefined) {
      isexist = false;
    } else isexist = true;

    if (localStorage.getItem("lng") == "en" && element.DispfieldkeyEn) {
      console.log("Dispfieldkey", element.Dispfieldkey);
      dispfieldkey = element.DispfieldkeyEn;
    } else dispfieldkey = element.Dispfieldkey;

    //If fileExtensions is added to JSON we should read it from it else we should read it from vaildattchments in List_Name_Config

    if (element.fileExtensions == undefined) {
      acceptedExtensions = FilesExtensions;
    } else {
      acceptedExtensions = element.fileExtensions;
    }


    if (element.Errmsgkey == undefined) {
      Errmsgkey = 'fieldIsRequired';
    }
    else {
      Errmsgkey = element.Errmsgkey;
    }



    switch (element.type) {
      case "string":

        var letterPattern = ""
        if (element.withletters) {
          letterPattern = `pattern="^\\d*[a-zA-Z\\u0600-\\u06FF][a-zA-Z0-9\\u0600-\\u06FF_ -]*$"`
        }
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '       data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="text" ' + letterPattern + ' maxlength="' +
          element.maxchar +
          '" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          "<span data-trans-" +
          Errmsgkey +
          ' class="errMsgField Resources"></span>' +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;
      case "yearInput":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          " " +
          disablestagesIDs +
          " " +
          enablestagesIDs +
          " " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          " " +
          isWfdisablestagesIDs +
          " " +
          isWfenablestagesIDs +
          ' data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="number" data-manipulates="year" min="1900" max="2099" step="1" maxdata="' +
          element.max +
          '" mindata="' +
          element.min +
          '" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "number":
        var numberOfDigits = ""
        if (element.numberOfDigits) {
          numberOfDigits = `maxlength=${element.numberOfDigits}`
        }

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="number" ' + numberOfDigits + ' step="any" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "formula":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '       data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="text" maxlength="' +
          element.maxchar +
          '" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ' style="direction: ltr !important;">' +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "email":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +

          ' type="email" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "code":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="text" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField NoSpChar" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "floattax":
        var numberOfDigits = ""
        if (element.numberOfDigits) {
          numberOfDigits = `maxlength=${element.numberOfDigits}`
        }
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="float"  ' + numberOfDigits + '  placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField tax" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          'data-targetelementtax="' +
          element.targetelementtax +
          '"' +
          'data-targetelementamount="' +
          element.targetelementamount +
          '"' +
          " " +
          element.validation +
          ">" +
          "<span data-trans-" +
          Errmsgkey +
          ' class="errMsgField Resources"></span>' +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "floatDuration":

        var numberOfDigits = ""
        if (element.numberOfDigits) {
          numberOfDigits = `maxlength=${element.numberOfDigits}`
        }

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="float" ' + numberOfDigits + ' placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField autoEndDate" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          'data-targetelementdate="' +
          element.targetelementdate +
          '"' +
          'data-sourceelementdate="' +
          element.sourceelementdate +
          '"' +
          " " +
          element.validation +
          ">" +
          "<span data-trans-" +
          Errmsgkey +
          ' class="errMsgField Resources"></span>' +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "float":

        var numberOfDigits = ""
        if (element.numberOfDigits) {
          numberOfDigits = `maxlength=${element.numberOfDigits}`
        }

        // to handle that the value should be smaller than other value
        var max = "", resetElement = "";

        var totalElement = "", sum1Element = "", sum2Element = "";

        if (element.max) {
          max = `data-maxField=${element.max}`
        }


        if (element.resetElement) {
          resetElement = `data-resetElement=${element.resetElement}`
        }

        if (element.totalElement && element.sum1Element && element.sum2Element) {
          totalElement = `data-totalElement=${element.totalElement}`
          sum1Element = `data-sum1Element=${element.sum1Element}`
          sum2Element = `data-sum2Element=${element.sum2Element}`
        }

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          totalElement +
          " " +
          sum1Element +
          " " +
          sum2Element +
          " " +
          max +
          " " +
          resetElement +
          " " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="float" ' + numberOfDigits + ' placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField number" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "phonenumber": // ksa phone number validation
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="text" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ' pattern="(05|5|009665|9665)(5|0|3|6|4|9|1|8|7)([0-9]{7})"/>' +
          "<span data-trans-" +
          Errmsgkey +
          ' class="errMsgField Resources"></span>' +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "floatwithoutformatting":

        var numberOfDigits = ""
        if (element.numberOfDigits) {
          numberOfDigits = `maxlength=${element.numberOfDigits}`
        }

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="float" ' + numberOfDigits + ' placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "weightfloatpercentage":
        var code = activeCode;

        var customQuery =
          "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='" +
          element.targetcode +
          '\' /><Value Type="Text">' +
          code +
          "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

        // also there is some code in edit data request
        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.listname,
          customQuery,
          [element.targetelement],
          function (records, record, listItem, isDone) {
            if (isDone) {
              console.log(records, "records in perc");
              var totalWeight = 0;
              records.forEach(function (el, index) {
                console.log(el, "el this is el");
                totalWeight += el[element.targetelement]
                  ? el[element.targetelement]
                  : 0;
              });

              var RemainingBudget = 100 - totalWeight;
              RemainingBudget = Number(RemainingBudget.toFixed(1));

              var newVal;
              var inpVal = 0;
              newVal =
                RemainingBudget + inpVal >= 100
                  ? RemainingBudget
                  : RemainingBudget + inpVal;
              newVal = Number(newVal.toFixed("2"));

              console.log(newVal, "newVal newVal");
              // console.log()

              htmlBody =
                '<div class="col-md-6 CFIELD ' +
                dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
                " " +
                element.className +
                " " +
                hideField +
                ' " ' +
                thistip +
                " " +
                hidestagesIDs +
                " " +
                editableBy +
                " " +
                showstagesIDs +
                "  " +
                disablestagesIDs +
                "  " +
                enablestagesIDs +
                "   " +
                isWfhidestagesIDs +
                " " +
                requireOnWfTaskstagesIDs +
                " " +
                isWfshowstagesIDs +
                "  " +
                isWfdisablestagesIDs +
                "  " +
                isWfenablestagesIDs +
                '        data-groups="' +
                groups +
                '" style="display:' +
                element.display +
                '">' +
                '<label for="' +
                element.InternalName +
                '" ' +
                element.validation +
                ">" +
                displayName +
                '<span data-trans-remainperc class="Resources remainpercstyle"></span><span class="remainpercstyle remainPercentageVal">' +
                newVal +
                "]</span>" +
                "</label>" +
                "<input " +
                ToggleName +
                " " +
                toggleDisabledName +
                " " +
                RequiredName +
                ' type="number" max=' +
                newVal +
                ' title="Please enter value between 0 and 100" step="any" placeholder="' +
                displayName +
                '" ' +
                dynamic +
                ' class="form-control SPIField weightfloatpercentage" data-weightvalue="" id="' +
                element.InternalName +
                '" ' +
                element.state +
                " " +
                'data-targetelem="' +
                element.seconedtarget +
                '"' +
                " " +
                element.validation +
                ' oninput="this.value = (this.value && Math.abs(this.value) >= 1) && (this.value && Math.abs(this.value) <= 100) ? Math.abs(this.value) : null">' +
                "<span data-trans-" +
                Errmsgkey +
                ' class="errMsgField Resources"></span>' +
                '<div class="inputInfo ' +
                isexist +
                '">' +
                descPhrase +
                "</div>" +
                "</div>";
              OnSuccess(flag, htmlBody);
            }
          }
        );
        break;

      case "floatpercentage":

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="number" title="Please enter value between 0 and 100" step="any" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ' oninput="this.value = (this.value && Math.abs(this.value) >= 0) && (this.value && Math.abs(this.value) <= 100) ? Math.abs(this.value) : null">' +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "percentbyrelatedparent":
        var code = activeCode;

        var customQuery =
          '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
          code +
          "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>";

        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.listname,
          customQuery,
          [element.parentinternalname],
          function (records, record, listItem, isDone) {
            if (isDone) {

              var parentValue = "";
              records.forEach(function (el, index) {
                parentValue = el[element.parentinternalname];
              });

              parentBudgetValue = parentValue;

              htmlBody =
                '<div class="col-md-6 CFIELD ' +
                dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
                " " +
                element.className +
                " " +
                hideField +
                ' " ' +
                thistip +
                " " +
                hidestagesIDs +
                " " +
                editableBy +
                " " +
                showstagesIDs +
                "  " +
                disablestagesIDs +
                "  " +
                enablestagesIDs +
                "   " +
                isWfhidestagesIDs +
                " " +
                requireOnWfTaskstagesIDs +
                " " +
                isWfshowstagesIDs +
                "  " +
                isWfdisablestagesIDs +
                "  " +
                isWfenablestagesIDs +
                '        data-groups="' +
                groups +
                '" style="display:' +
                element.display +
                '">' +
                '<label for="' +
                element.InternalName +
                '" ' +
                element.validation +
                ">" +
                displayName +
                "</label>" +
                "<input " +
                ToggleName +
                " " +
                toggleDisabledName +
                " " +
                RequiredName +
                ' type="number" title="" step="any" placeholder="' +
                displayName +
                '" ' +
                dynamic +
                ' class="form-control SPIField percentbyparent" id="' +
                element.InternalName +
                '" ' +
                'data-parentval="' +
                parentValue +
                '"' +
                'data-targetelem="' +
                element.targetelement +
                '"' +
                element.state +
                " " +
                element.validation +
                ">" +
                "<span data-trans-" +
                Errmsgkey +
                ' class="errMsgField Resources"></span>' +
                '<div class="inputInfo ' +
                isexist +
                '">' +
                descPhrase +
                "</div>" +
                "</div>";
              OnSuccess(flag, htmlBody);
            }
          }
        );
        break;
      case "decimalpercentage":

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="number" title="Please enter value between 0 and 100" step="any" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField decimalnumber" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ' pattern="^d*(.d{0,2})?$">' +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "percentage":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="number" min="0" max="100" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "datetime":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="date" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ' minimumdate="' +
          element.min +
          '" maximumdate="' +
          element.max +
          '"  max="' +
          max +
          '" min=' +
          min +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;


      case "datetimetoparent": // handle date from parent
        var code = activeCode;
        //activecode
        var customQuery =
          '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
          code +
          "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>";

        var startDate = "",
          finishDate = "";
        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.listname,
          customQuery,
          [element.startinternalname, element.endinternalname],
          function (records, record, listItem, isDone) {
            // if (listItem) itemsID.push(listItem.get_id());
            if (isDone) {
              records.forEach(function (el, index) {
                startDate = el[element.startinternalname];
                finishDate = el[element.endinternalname];
              });

              minDate = Dynamic_Data_Request.g.convertdate(startDate);
              maxDate = Dynamic_Data_Request.g.convertdate(finishDate);

              htmlBody =
                '<div class="col-md-6 CFIELD ' +
                dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
                " " +
                element.className +
                " " +
                hideField +
                ' " ' +
                thistip +
                " " +
                hidestagesIDs +
                " " +
                editableBy +
                " " +
                showstagesIDs +
                "  " +
                disablestagesIDs +
                "  " +
                enablestagesIDs +
                "   " +
                isWfhidestagesIDs +
                " " +
                requireOnWfTaskstagesIDs +
                " " +
                isWfshowstagesIDs +
                "  " +
                isWfdisablestagesIDs +
                "  " +
                isWfenablestagesIDs +
                '        data-groups="' +
                groups +
                '" style="display:' +
                element.display +
                '">' +
                '<label for="' +
                element.InternalName +
                '" ' +
                element.validation +
                ">" +
                displayName +
                "</label>" +
                "<input " +
                ToggleName +
                " " +
                toggleDisabledName +
                " " +
                RequiredName +
                ' type="date" onkeydown="return false" placeholder="' +
                displayName +
                '" ' +
                dynamic +
                ' class="form-control SPIField" id="' +
                element.InternalName +
                '" ' +
                element.state +
                " " +
                element.validation +
                ' minimumdate="' +
                element.min +
                '" maximumdate="' +
                element.max +
                '"  max="' +
                maxDate +
                '" min=' +
                minDate +
                ">" +
                "<span data-trans-" +
                Errmsgkey +
                ' class="errMsgField Resources"></span>' +
                '<div class="inputInfo ' +
                isexist +
                '">' +
                descPhrase +
                "</div>" +
                "</div>";
              OnSuccess(flag, htmlBody);

              //console.log(`htmlBody from lookup success`, htmlBody);
              // OnSuccess(flag, htmlBody);
            }
          }
        );
        break;


      case "datewithtime":
        htmlBody =
          '<div class="col-md-6 CFIELD dateTime' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<div " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' class="datetimeinputs"><input type="datetime-local" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField withTime" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ' minimumdate="' +
          element.min +
          '" maximumdate="' +
          element.max +
          '"  max="' +
          max +
          '" min=' +
          min +
          ">" +
          "</div>" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      // case 'datewithtime':
      //     htmlBody =
      //         '<div class="col-md-6 CFIELD dateTime' + element.className + ' " ' + thistip + ' ' + hidestagesIDs + ' '+editableBy+' ' + showstagesIDs + '  ' + disablestagesIDs + '  ' + enablestagesIDs + '   ' + isWfhidestagesIDs + ' '+requireOnWfTaskstagesIDs+' ' + isWfshowstagesIDs + '  ' + isWfdisablestagesIDs + '  ' + isWfenablestagesIDs + '        data-groups="' + groups + '" style="display:' + element.display + '">' +
      //         '<label for="' + element.InternalName + '" ' + element.validation + '>' + displayName + '</label>' +
      //         '<div class="datetimeinputs"><input type="date" placeholder="' + displayName + '" ' + dynamic + ' class="form-control SPIField withTime" id="' + element.InternalName + '" ' + element.state + ' ' + element.validation + ' minimumdate="' + element.min + '" maximumdate="' + element.max + '"  max="9999-12-31" min="1900-01-01">' +
      //         '<input type="time"  class="form-control SPIField" id="Time"></div>' +
      //         '</div>';
      //     OnSuccess(flag, htmlBody);
      //     break;

      case "picker":

        var targetsiblingarr = ""
        var addSeblingClass = ""

        if (element.targetsiblingarr && element.targetsiblingarr != 'undefined') {
          targetsiblingarr = element.targetsiblingarr
          addSeblingClass = "getpickersiblingdata";
          targetsiblingarr = 'data-targetsiblingarr="' +
            JSON.stringify(element.targetsiblingarr).replaceAll(`"`, `'`) + '"';

        }

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired +
          " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<div " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' class="PPField SPIField form-control ' + addSeblingClass + '" type="picker" id="' +
          element.InternalName +
          '" value="" placeholder="' +
          displayName +
          '" INppicker="' +
          element.InternalName +
          '" ' +
          element.state +
          ' ' + targetsiblingarr + ' style="display:' +
          element.display +
          '" ' +
          element.validation +
          "></div>" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "multipicker":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<div " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' class="PPField SPIField form-control" type="multipicker" id="' +
          element.InternalName +
          '" value="" placeholder="' +
          displayName +
          '" INppicker="' +
          element.InternalName +
          '" ' +
          element.state +
          ' style="display:' +
          element.display +
          '" ' +
          element.validation +
          "></div>" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "dropdown":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<select " +
          toggleDisabledValues +
          " " +
          toggleValues +
          " " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          " " +
          requiredValues +
          ' type="dropdown" value="" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          '><option value="" ' +
          selected +
          " disabled>" +
          displayName +
          "</option>";
        for (var i = 0; i < element.options.choices.length; i++) {
          //
          htmlBody +=
            '<option value="' +
            element.options.choices[i] +
            '">' +
            element.options.choices[i] +
            "</option>";
        }
        htmlBody +=
          "</select>" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "dropdownValues":


        // added for CR module
        let customFilter = element.options.choices[0].hasOwnProperty(
          "customFilterValue"
        )
          ? 'iscustomfiltervalue="true"'
          : "";
        let customCr = element.hasOwnProperty("customCr")
          ? element.customCr
          : false;

        //////////////////
        //to not invoke dynamic in edit cause الاستراتيجية المرتبطة don't submit so the value will disappear 
        var stopinvokeparent = ""


        if (element.stopinvokeparent) {
          stopinvokeparent = `data-stopinvokeparent=${element.stopinvokeparent}`
        } else {
          stopinvokeparent = ""
        }
        //////////////////

        var grandFieldId = ""
        if (element.grandFieldId) {
          grandFieldId = `data-grandFieldId=${element.grandFieldId}`
        } else {
          grandFieldId = ""
        }

        var childFieldId = ""
        if (element.childFieldId) {
          childFieldId = `data-childFieldId=${element.childFieldId}`
        } else {
          childFieldId = ""
        }

        var grandFieldInvokeclass = ""

        if (grandFieldId && childFieldId) {
          grandFieldInvokeclass = "grandFieldInvoke"
        }


        var childFieldIdSource = ""

        if (element.childFieldIdSource) {
          childFieldIdSource = `data-childFieldIdSource=${element.childFieldIdSource}`
        } else {
          childFieldIdSource = ""
        }

        if (crListKey && isCrMode && customCr) {
          htmlBody = "";
          //ended
        } else {
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            " " +
            hideField +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            editableBy +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            "<select " +
            toggleDisabledValues +
            " " +
            toggleValues +
            " " +
            ToggleName +
            " " +
            toggleDisabledName +
            " " +
            RequiredName +
            " " +
            requiredValues +
            " " +
            grandFieldId +
            " " +
            childFieldId +
            " " +
            childFieldIdSource +
            " " +
            stopinvokeparent +

            ' type="dropdown" value="" placeholder="' +
            displayName +
            '" ' +
            dynamic +
            " " +
            seconeddynamic +
            ' data-listname="' +
            element.source +
            '" data-valfieldkey="' +
            element.valfieldkey +
            '" data-Dispfieldkey="' +
            dispfieldkey +
            '"data-filterfield="' +
            element.filterField +
            '"data-queryfieldvalue="' + //
            element.queryFieldValue +
            '"data-queryfield="' + //
            element.queryField +
            '"data-queryfieldtype="' + //
            element.queryFieldType +
            '" data-filterfieldtype="' +
            element.filterFieldType +
            '" class="form-control SPIField ' + grandFieldInvokeclass + '" id="' +
            element.InternalName +
            '" ' +
            element.state +
            " " +
            element.validation +
            '><option value="" ' +
            selected +
            " disabled>" +
            displayName +
            "</option>";
          for (var i = 0; i < element.options.choices.length; i++) {


            let customValue = element.options.choices[i].customFilterValue
              ? 'data-customfiltervalue="' +
              element.options.choices[i].customFilterValue +
              '"'
              : "";

            let fieldsValue = element.options.choices[i].fields
              ? 'data-fieldsvalue="' +
              JSON.stringify(element.options.choices[i].fields).replaceAll(
                `"`,
                `'`
              ) +
              '"'
              : "";


            let isRenderOption = true;
            let optionHasRole =
              element.options.choices[i].hasOwnProperty("roles");
            if (
              optionHasRole &&
              !element.options.choices[i].roles.includes(myRoleConfig[0].Role)
            ) {
              isRenderOption = false;
            }
            // working on other value

            let otherFieldsValue = element.options.choices[i].otherFields
              ? 'data-otherfields="' +
              JSON.stringify(element.options.choices[i].otherFields).replaceAll(
                `"`,
                `'`
              ) +
              '"'
              : "";
            //


            if (isRenderOption) {
              htmlBody +=
                "<option data-trans-" +
                element.options.choices[i].display +
                ' class="Resources" value="' +
                element.options.choices[i].value +
                '" ' +
                customValue +
                " " +
                fieldsValue +
                " " +
                otherFieldsValue +
                " " +
                element.options.choices[i].selected +
                "></option>";
            }
          }
          htmlBody +=
            "</select>" +
            '<div class="inputInfo ' +
            isexist +
            '">' +
            descPhrase +
            "</div>" +
            "</div>";
        }
        // if(){
        //   grandFieldInvoke
        // }
        OnSuccess(flag, htmlBody);
        break;

      case "radio":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          "<label " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>";
        for (var i = 0; i < element.options.choices.length; i++) {
          htmlBody +=
            "<input " +
            element.validation +
            " " +
            dynamic +
            ' class="form-control" type="radio" name="' +
            displayName +
            '" id="' +
            element.InternalName +
            '" value="' +
            element.options.choices[i] +
            '" placeholder="' +
            displayName +
            '" ' +
            element.state +
            ">" +
            element.options.choices[i];
        }
        htmlBody +=
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div></div>";
        OnSuccess(flag, htmlBody);
        break;

      case "yesnoradio":
        htmlBody =
          '<div class="col-md-6 CFIELD radioLabelField" ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          "<label " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>";
        for (var i = 0; i < element.options.choices.length; i++) {
          htmlBody +=
            "<input  " +
            element.validation +
            " " +
            dynamic +
            '  class="form-control yesnolistener" type="radio" name="' +
            displayName +
            '" id="' +
            element.InternalName +
            '" value="' +
            element.options.choices[i].value +
            '" placeholder="' +
            displayName +
            '" ' +
            element.state +
            " data-targetfieldrequired=" +
            element.targetfieldrequired +
            " data-targetfield=" +
            element.targetfield +
            " data-targetfieldvalue=" +
            element.targetfieldvalue +
            "><label data-trans-" +
            element.options.choices[i].display +
            ' for="' +
            element.options.choices[i].value +
            '" ' +
            element.validation +
            ' class="Resources radiolabel"></label>';
        }
        htmlBody +=
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div></div>";
        OnSuccess(flag, htmlBody);
        break;

      case "checkbox":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="checkbox" value="' +
          true +
          '" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          ">" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "multiselect":
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          '<ul myfield="' +
          element.InternalName +
          '" id="' +
          element.InternalName +
          '" type="multiselect" class="multiselect-container form-control" type="multiselect">' +
          '<li class="dropdown">' +
          '<a href="#" data-toggle="dropdown" class="dropdown-toggle">' +
          displayName +
          '<b class="caret"></b></a>' +
          '<ul type="" class="dropdown-menu multiselect_scroll">';
        for (var i = 0; i < element.options.choices.length; i++) {
          htmlBody +=
            "<li>" +
            '<div class="checkbox">' +
            "<label>" +
            '<input value="' +
            element.options.choices[i] +
            '" id="' +
            element.InternalName +
            '" type="checkbox">' +
            element.options.choices[i] +
            "</label>" +
            "</div>" +
            "</li>";
        }
        htmlBody +=
          "</ul>" +
          "</li>" +
          "</ul>" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>";
        "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "lookupmultiselect":
        var customQuery;
        if (
          PCODE &&
          element.source != "Vendors" &&
          element.source != "InitiativeDeliverables"
        ) {
          // to avoid the error on edit page for multi select
          customQuery =
            "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
            PCODE +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        } else {
          customQuery =
            "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        }
        //ghufran User dropdown security
        // if (isEPMO
        //   // || isSPMAdmin
        //   //|| isSPMTeam

        //   ) {
        //   if (
        //     (listkey == "benefitmetrics" &&
        //       element.InternalName == "RelatedBenefit") ||
        //     (listkey == "benefitmatrix" &&
        //       element.InternalName == "RelatedBenefit") ||
        //     (listkey == "deliverablemetrics" &&
        //       element.InternalName == "RelatedInitiativeDeliverable")
        //   ) {
        //     if (localStorage.getItem("Dynamo_Initiatives") != null) {
        //       var visionarr = JSON.parse(
        //         localStorage.getItem("Dynamo_Initiatives") || "[]"
        //       );
        //       visionarr = visionarr.filter(function (item) {
        //         return item.name == "vision";
        //       });
        //       var strategicallyarr = JSON.parse(
        //         localStorage.getItem("Dynamo_Initiatives") || "[]"
        //       );
        //       strategicallyarr = strategicallyarr.filter(function (item) {
        //         return item.name == "strategically";
        //       });
        //       console.log("visionarr", visionarr);
        //       console.log("strategic", strategicallyarr);
        //     }
        //     customQuery =
        //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"InitiativeCode\" /><Values>";
        //     strategicallyarr.forEach(function (item) {
        //       customQuery += '<Value Type="Text">' + item.code + "</Value>";
        //     });
        //     customQuery +=
        //       "</Values></In></And></Where></Query><RowLimit>100</RowLimit></View>";
        //   } else if (
        //     (listkey == "Benefits" &&
        //       element.InternalName == "InitiativeCode") ||
        //     (listkey == "BenefitMatrix" &&
        //       element.InternalName == "RelatedInitiative")
        //   ) {
        //     customQuery =
        //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">strategically</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        //   } else if ("benefitmatrix" && element.InternalName == "RelatedKPI") {
        //     customQuery =
        //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus'/><Value Type='Text'>Deleted</Value></Neq><Or><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">strategically</Value></Eq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">sub</Value></Eq></Or></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        //   }
        // }
        // if (isVROE || isVROP) {
        //   if (
        //     (listkey == "Benefits" &&
        //       element.InternalName == "InitiativeCode") ||
        //     (listkey == "BenefitMatrix" &&
        //       element.InternalName == "RelatedInitiative")
        //   ) {
        //     customQuery =
        //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">vision</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        //   } else if (
        //     (listkey == "benefitmetrics" &&
        //       element.InternalName == "RelatedBenefit") ||
        //     (listkey == "benefitmatrix" &&
        //       element.InternalName == "RelatedBenefit") ||
        //     (listkey == "deliverablemetrics" &&
        //       element.InternalName == "RelatedInitiativeDeliverable")
        //   ) {
        //     if (localStorage.getItem("Dynamo_Initiatives") != null) {
        //       var visionarr = JSON.parse(
        //         localStorage.getItem("Dynamo_Initiatives") || "[]"
        //       );
        //       visionarr = visionarr.filter(function (item) {
        //         return item.name == "vision";
        //       });
        //       var strategicallyarr = JSON.parse(
        //         localStorage.getItem("Dynamo_Initiatives") || "[]"
        //       );
        //       strategicallyarr = strategicallyarr.filter(function (item) {
        //         return item.name == "strategically";
        //       });
        //       console.log("visionarr", visionarr);
        //       console.log("strategic", strategicallyarr);
        //     }
        //     customQuery =
        //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"InitiativeCode\" /><Values>";
        //     visionarr.forEach(function (item) {
        //       customQuery += '<Value Type="Text">' + item.code + "</Value>";
        //     });
        //     customQuery +=
        //       "</Values></In></And></Where></Query><RowLimit>100</RowLimit></View>";
        //   } else if ("benefitmatrix" && element.InternalName == "RelatedKPI") {
        //     customQuery =
        //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">vision</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        //   }
        // }
        if (listkey == "BenefitMatrix") {
          if (isSPMAdmin
            //  || isSPMTeam
          ) {
            if (element.source == "MainKPI") {
              customQuery =
                "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus'/><Value Type='Text'>Deleted</Value></Neq><Or><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">strategically</Value></Eq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">sub</Value></Eq></Or></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
            } else if (
              element.source == "InitiativeDeliverables" ||
              element.source == "Benefits" ||
              element.source == "BenefitMetrics"
            ) {
              if (localStorage.getItem("Dynamo_Initiatives") != null) {
                var visionarr = JSON.parse(
                  localStorage.getItem("Dynamo_Initiatives") || "[]"
                );
                visionarr = visionarr.filter(function (item) {
                  return item.name == "vision";
                });
                var strategicallyarr = JSON.parse(
                  localStorage.getItem("Dynamo_Initiatives") || "[]"
                );
                strategicallyarr = strategicallyarr.filter(function (item) {
                  return item.name == "strategically";
                });
                console.log("visionarr", visionarr);
                console.log("strategic", strategicallyarr);
              }
              customQuery =
                "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"InitiativeCode\" /><Values>";
              strategicallyarr.forEach(function (item) {
                customQuery += '<Value Type="Text">' + item.code + "</Value>";
              });
              customQuery +=
                "</Values></In></And></Where></Query><RowLimit>100</RowLimit></View>";
            } else if (element.source == "Initiatives") {
              customQuery =
                "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">strategically</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
            }
          }
          // else if (isVROP) {
          //   if (element.source == "MainKPI") {
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">vision</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          //   } else if (element.source == "Initiatives") {
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">vision</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          //   } else if (
          //     element.source == "InitiativeDeliverables" ||
          //     element.source == "Benefits" ||
          //     element.source == "BenefitMetrics"
          //   ) {
          //     if (localStorage.getItem("Dynamo_Initiatives") != null) {
          //       var visionarr = JSON.parse(
          //         localStorage.getItem("Dynamo_Initiatives") || "[]"
          //       );
          //       visionarr = visionarr.filter(function (item) {
          //         return item.name == "vision";
          //       });
          //       var strategicallyarr = JSON.parse(
          //         localStorage.getItem("Dynamo_Initiatives") || "[]"
          //       );
          //       strategicallyarr = strategicallyarr.filter(function (item) {
          //         return item.name == "strategically";
          //       });
          //       console.log("visionarr", visionarr);
          //       console.log("strategic", strategicallyarr);
          //     }
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"InitiativeCode\" /><Values>";
          //     visionarr.forEach(function (item) {
          //       customQuery += '<Value Type="Text">' + item.code + "</Value>";
          //     });
          //     customQuery +=
          //       "</Values></In></And></Where></Query><RowLimit>100</RowLimit></View>";
          //   }
          // }
        }

        // to handle dont submit in edit

        var listFields = [element.valfieldkey, dispfieldkey, element.grpfieldkey];


        if (element.sourcefieldlvl1) {
          // to handle sector and subsector (get the element from list)
          parentFieldKey = element.fieldsinformlvl1;
          // listFields = [element.valfieldkey, dispfieldkey, element.filterField];
          listFields.push(element.sourcefieldlvl1)

          if (element.sourcefieldlvl2) {
            listFields.push(element.sourcefieldlvl2)
          }

        } else {
          parentFieldKey = "";
        }
        //////////////////////////////////
        var grandFieldId = ""
        if (element.grandFieldId) {
          grandFieldId = `data-grandFieldId=${element.grandFieldId}`
        } else {
          grandFieldId = ""
        }
        var notInvokeListinerData = "", seconedValueListiner = "", parentCustomFilterValue = "";
        if (element.notInvokeListiner) {
          notInvokeListinerData = `data-notInvokeListiner=${element.notInvokeListiner}`;
          seconedValueListiner = `data-seconedvaluelistiner=""`;

          parentCustomFilterValue = `data-parentcustomfiltervalue=""`;
        }
        ////////////////////////////////////


        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          '<div style="display:inline-' +
          element.toggledisplay +
          '" class="showhide-trigger" title="Show/Hide ' +
          displayName +
          '"></div>' +
          '<ul ' +
          ToggleName +
          " " +
          grandFieldId +
          " " +
          notInvokeListinerData +
          " " +
          parentCustomFilterValue +
          " " +
          seconedValueListiner +
          " " +
          dynamic +
          " " +
          seconeddynamic +
          " " +
          'data-listname="' +
          element.source +
          '" data-valfieldkey="' +
          element.valfieldkey +
          '" data-Dispfieldkey="' +
          dispfieldkey +
          '"data-filterfield="' +
          element.filterField +
          '"data-queryfieldvalue="' + //
          element.queryFieldValue +
          '"data-queryfield="' + //
          element.queryField +
          '"data-queryfieldtype="' + //
          element.queryFieldType +
          '" data-filterfieldtype="' +
          element.filterFieldType +
          '" myfield="' +
          element.InternalName +
          '" id="' +
          element.InternalName +
          '" type="multiselect" class="multiselect-container form-control" type="multiselect">' +
          '<li class="dropdown ul-bullet-remove">' +
          '<a href="#" data-toggle="dropdown" class="dropdown-toggle">' +
          displayName +
          '<b class="caret"></b></a>' +
          '<ul class="dropdown-menu multiselect_scroll ' + element.validation + '">';

        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.source,
          customQuery,
          listFields,
          function (records, record, listItem, isDone) {
            if (isDone) {
              var grpfield = element.grpfieldkey;
              window.result = records.reduce(function (r, a) {
                r[a[grpfield]] = r[a[grpfield]] || [];
                r[a[grpfield]].push(a);
                return r;
              }, Object.create(null));

              Object.entries(result).forEach((el) => {
                htmlBody += '<label class="grp-select">' + el[0] + "</label>";
                el[1].forEach((dl) => {
                  htmlBody +=
                    "<li data-parentrelatedvaluelvl1=" +
                    dl[element.sourcefieldlvl1] +
                    " data-parentrelatedkeylvl1= " +
                    element.fieldsinformlvl1
                    + " data-parentrelatedvaluelvl2=" +
                    dl[element.sourcefieldlvl2]
                    + " data-parentrelatedkeylvl2=" +
                    element.fieldsinformlvl2
                    + " class='limulti'>" + // we add class limulti to can check if this element multi select or not in dontsubmit feature to get the data
                    '<div class="checkbox">' +
                    "<label>" +
                    '<input value="' +
                    dl[element.valfieldkey] +
                    '" id="' +
                    element.InternalName +
                    '" type="checkbox">' +
                    dl[dispfieldkey] +
                    "</label>" +
                    "</div>" +
                    "</li>";
                });
              });
              htmlBody +=
                "</ul>" +
                "</li>" +
                "</ul>" +
                "<span data-trans-" +
                Errmsgkey +
                ' class="errMsgField Resources"></span>' +
                '<div class="inputInfo ' +
                isexist +
                '">' +
                descPhrase +
                "</div>" +
                "</div>";
              //console.log(`htmlBody from lookup success`, htmlBody);

              OnSuccess(flag, htmlBody);
            }
          }
        );
        break;


      case "lookupchildtoparent":
        var code = activeCode
        var customQuery =
          '<View><Query><Where><And><Eq><FieldRef Name=' + element.childinternalparentname + ' /><Value Type=' + element.childinternalparenttype + '>' +
          code +
          "</Value></Eq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

        var itemsID = [];

        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.childlist,
          customQuery,
          [element.childinternalname],
          function (records, record, listItem, isDone) {

            var allRelatedChild = [] // to get all related child
            if (isDone) {
              records.forEach(function (el, index) {
                allRelatedChild.push(el[element.childinternalname]);

              });

              if (allRelatedChild.length == 0) { // to render an empty drop down when there is no item or related child value
                allRelatedChild.push("")
              }

              var internalQuery =
                '<View><Query><Where><And><In><FieldRef Name="' + element.sourceinternalname +
                '" /><Values>'

              allRelatedChild.forEach(function (item) {
                internalQuery += '<Value Type="Text">' + item + "</Value>";
              });

              internalQuery += "</Values></In><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"

              var filedsArr = [element.valfieldkey, element.Dispfieldkey]
              if (element.hasOwnProperty('valsiblingkey')) {
                filedsArr = [element.valfieldkey, element.Dispfieldkey, element.valsiblingkey]
              }
              sphttp.get(
                _spPageContextInfo.siteServerRelativeUrl,
                element.source,
                internalQuery,
                filedsArr,
                function (records, record, listItem, isDone) {
                  if (listItem) itemsID.push(listItem.get_id());
                  if (isDone) {


                    htmlBody =
                      '<div class="col-md-6 CFIELD ' +
                      dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
                      " " +
                      element.className +
                      " " +
                      hideField +
                      ' " ' +
                      thistip +
                      " " +
                      hidestagesIDs +
                      " " +
                      editableBy +
                      " " +
                      showstagesIDs +
                      "  " +
                      disablestagesIDs +
                      "  " +
                      enablestagesIDs +
                      "   " +
                      isWfhidestagesIDs +
                      " " +
                      requireOnWfTaskstagesIDs +
                      " " +
                      isWfshowstagesIDs +
                      "  " +
                      isWfdisablestagesIDs +
                      "  " +
                      isWfenablestagesIDs +
                      '        data-groups="' +
                      groups +
                      '" style="display:' +
                      element.display +
                      '">' +
                      '<label for="' +
                      element.InternalName +
                      '" ' +
                      element.validation +
                      ">" +
                      displayName +
                      "</label>" +
                      "<select " +
                      ToggleName +
                      " " +
                      toggleDisabledName +
                      " " +
                      RequiredName +
                      " " +
                      inputLisKey +
                      element.validation +
                      " " +
                      dynamic +
                      ' data-listname="' +
                      element.source +
                      '" data-valfieldkey="' +
                      element.valfieldkey +
                      '" data-Dispfieldkey="' +
                      dispfieldkey +
                      '" data-filterfield="' +
                      element.filterField +
                      '" data-queryfieldvalue="' +
                      element.queryFieldValue +
                      '"data-queryfield="' +
                      element.queryField +
                      '"data-queryfieldtype="' +
                      element.queryFieldType +
                      '" data-filterfieldtype="' +
                      element.filterFieldType +
                      '" data-siblingtarget="' + element.targetsiblingkey + '" class="form-control getsiblingdata" type="dropdown" id="' +
                      element.InternalName +
                      '" value="" placeholder="' +
                      displayName +
                      '" ' +
                      element.state +
                      '><option value="" ' +
                      selected +
                      " disabled>" +
                      displayName +
                      "</option>";

                    records.forEach(function (el, index) {
                      htmlBody +=
                        '<option data-siblingvalue="' + el[element.valsiblingkey] + '" option-id="' +
                        itemsID[index] +
                        '" value="' +
                        el[element.valfieldkey] +
                        '">' +
                        el[element.Dispfieldkey] +
                        "</option>";
                    });

                    htmlBody +=
                      "</select>" +
                      "<span data-trans-" +
                      Errmsgkey +
                      ' class="errMsgField Resources"></span>' +
                      '<div class="inputInfo ' +
                      isexist +
                      '">' +
                      descPhrase +
                      "</div>" +
                      "</div>";

                    OnSuccess(flag, htmlBody);

                  }
                })

            }
          })
        break;

      case "lookupchildtoparentmultiselect":
        var code = activeCode
        var customQuery =
          '<View><Query><Where><And><Eq><FieldRef Name=' + element.childinternalparentname + ' /><Value Type=' + element.childinternalparenttype + '>' +
          code +
          "</Value></Eq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

        var itemsID = [];

        var fieldTargetList = "";
        var fieldmasterkey = ""
        if (element.fieldtargetlist && element.fieldtargetlist != "undefined") {

          fieldTargetList = `data-fieldTargetList=${element.fieldtargetlist}`
          fieldmasterkey = `data-fieldmasterkey=${element.fieldmasterkey}`
        }


        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.childlist,
          customQuery,
          [element.childinternalname],
          function (records, record, listItem, isDone) {

            var allRelatedChild = [] // to get all related child
            if (isDone) {

              htmlBody =
                '<div class="col-md-6 CFIELD ' +
                dontSubmit + " " + dontRequest + " " + dontSubmitRequired +
                " " +
                element.className +
                " " +
                hideField +
                ' " ' +
                thistip +
                " " +
                hidestagesIDs +
                " " +
                editableBy +
                " " +
                showstagesIDs +
                "  " +
                disablestagesIDs +
                "  " +
                enablestagesIDs +
                "   " +
                isWfhidestagesIDs +
                " " +
                requireOnWfTaskstagesIDs +
                " " +
                isWfshowstagesIDs +
                "  " +
                isWfdisablestagesIDs +
                "  " +
                isWfenablestagesIDs +
                '        data-groups="' +
                groups +
                '" style="display:' +
                element.display +
                '">' +
                '<label for="' +
                element.InternalName +
                '" ' +
                element.validation +
                ">" +
                displayName +
                "</label>" +
                '<div style="display:inline-' +
                element.toggledisplay +
                '" class="showhide-trigger" title="Show/Hide ' +
                displayName +
                '"></div>' +
                '<ul ' +
                grandFieldId +
                " " +
                notInvokeListinerData +
                " " +
                parentCustomFilterValue +
                " " +
                seconedValueListiner +
                " " +
                dynamic +
                " " +
                seconeddynamic +
                " " +
                fieldTargetList +
                " " +
                fieldmasterkey +
                " " +
                'data-listname="' +
                element.source +
                '" data-valfieldkey="' +
                element.valfieldkey +
                '" data-Dispfieldkey="' +
                dispfieldkey +
                '"data-filterfield="' +
                element.filterField +
                '"data-queryfieldvalue="' + //
                element.queryFieldValue +
                '"data-queryfield="' + //
                element.queryField +
                '"data-queryfieldtype="' + //
                element.queryFieldType +
                '" data-filterfieldtype="' +
                element.filterFieldType +
                '" myfield="' +
                element.InternalName +
                '" id="' +
                element.InternalName +
                '" type="multiselect" class="multiselect-container form-control" type="multiselect">' +
                '<li class="dropdown ul-bullet-remove">' +
                '<a href="#" data-toggle="dropdown" class="dropdown-toggle">' +
                displayName +
                '<b class="caret"></b></a>' +
                '<ul class="dropdown-menu multiselect_scroll ' + element.validation + '">';

              records.forEach(function (el, index) {
                allRelatedChild.push(el[element.childinternalname]);

              });

              if (allRelatedChild.length == 0) { // to render an empty drop down when there is no item or related child value
                allRelatedChild.push("")
              }

              var internalQuery =
                '<View><Query><Where><And><In><FieldRef Name="' + element.sourceinternalname +
                '" /><Values>'

              allRelatedChild.forEach(function (item) {
                internalQuery += '<Value Type="Text">' + item + "</Value>";
              });

              internalQuery += "</Values></In><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"

              var filedsArr = [element.valfieldkey, element.Dispfieldkey]
              if (element.hasOwnProperty('valsiblingkey')) {
                filedsArr = [element.valfieldkey, element.Dispfieldkey, element.valsiblingkey]
              }
              sphttp.get(
                _spPageContextInfo.siteServerRelativeUrl,
                element.source,
                internalQuery,
                filedsArr,
                function (records, record, listItem, isDone) {
                  if (listItem) itemsID.push(listItem.get_id());
                  if (isDone) {

                    var grpfield = element.grpfieldkey;
                    window.result = records.reduce(function (r, a) {
                      r[a[grpfield]] = r[a[grpfield]] || [];
                      r[a[grpfield]].push(a);
                      return r;
                    }, Object.create(null));

                    Object.entries(result).forEach((el) => {

                      el[1].forEach((dl) => {
                        htmlBody +=
                          "<li data-parentrelatedvaluelvl1=" +
                          dl[element.sourcefieldlvl1] +
                          " data-parentrelatedkeylvl1= " +
                          element.fieldsinformlvl1
                          + " data-parentrelatedvaluelvl2=" +
                          dl[element.sourcefieldlvl2]
                          + " data-parentrelatedkeylvl2=" +
                          element.fieldsinformlvl2
                          + " class='limulti'>" + // we add class limulti to can check if this element multi select or not in dontsubmit feature to get the data
                          '<div class="checkbox">' +
                          "<label>" +
                          '<input value="' +
                          dl[element.valfieldkey] +
                          '" id="' +
                          element.InternalName +
                          '" type="checkbox">' +
                          dl[dispfieldkey] +
                          "</label>" +
                          "</div>" +
                          "</li>";
                      });
                    });

                    htmlBody +=
                      "</ul>" +
                      "</li>" +
                      "</ul>" +
                      "<span data-trans-" +
                      Errmsgkey +
                      ' class="errMsgField Resources"></span>' +
                      '<div class="inputInfo ' +
                      isexist +
                      '">' +
                      descPhrase +
                      "</div>" +
                      "</div>";
                    OnSuccess(flag, htmlBody);
                  }
                })
            }
          })
        break;

      case "lookuptoparentchild":
        var code = activeCode;

        var customQuery =
          '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
          code +
          "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>";

        var itemsID = [];

        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.parentlist,
          customQuery,
          [element.parentinternalname],
          function (records, record, listItem, isDone) {
            var parentCode = "";
            if (isDone) {
              records.forEach(function (el, index) {
                parentCode = el[element.parentinternalname];
              });

              var internalQuery =
                '<View><Query><Where><Eq><FieldRef Name="' +
                element.sourceinternalname +
                '" /><Value Type="Text">' +
                parentCode +
                "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

              sphttp.get(
                _spPageContextInfo.siteServerRelativeUrl,
                element.source,
                internalQuery,
                [element.valfieldkey, element.Dispfieldkey],
                function (records, record, listItem, isDone) {
                  if (listItem) itemsID.push(listItem.get_id());

                  if (isDone) {
                    htmlBody =
                      '<div class="col-md-6 CFIELD ' +
                      dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
                      " " +
                      element.className +
                      " " +
                      hideField +
                      ' " ' +
                      thistip +
                      " " +
                      hidestagesIDs +
                      " " +
                      editableBy +
                      " " +
                      showstagesIDs +
                      "  " +
                      disablestagesIDs +
                      "  " +
                      enablestagesIDs +
                      "   " +
                      isWfhidestagesIDs +
                      " " +
                      requireOnWfTaskstagesIDs +
                      " " +
                      isWfshowstagesIDs +
                      "  " +
                      isWfdisablestagesIDs +
                      "  " +
                      isWfenablestagesIDs +
                      '        data-groups="' +
                      groups +
                      '" style="display:' +
                      element.display +
                      '">' +
                      '<label for="' +
                      element.InternalName +
                      '" ' +
                      element.validation +
                      ">" +
                      displayName +
                      "</label>" +
                      "<select " +
                      ToggleName +
                      " " +
                      toggleDisabledName +
                      " " +
                      RequiredName +
                      " " +
                      inputLisKey +
                      element.validation +
                      " " +
                      dynamic +
                      ' data-listname="' +
                      element.source +
                      '" data-valfieldkey="' +
                      element.valfieldkey +
                      '" data-Dispfieldkey="' +
                      dispfieldkey +
                      '" data-filterfield="' +
                      element.filterField +
                      '" data-queryfieldvalue="' +
                      element.queryFieldValue +
                      '"data-queryfield="' +
                      element.queryField +
                      '"data-queryfieldtype="' +
                      element.queryFieldType +
                      '" data-filterfieldtype="' +
                      element.filterFieldType +
                      '" class="form-control" type="dropdown" id="' +
                      element.InternalName +
                      '" value="" placeholder="' +
                      displayName +
                      '" ' +
                      element.state +
                      '><option value="" ' +
                      selected +
                      " disabled>" +
                      displayName +
                      "</option>";

                    records.forEach(function (el, index) {
                      htmlBody +=
                        '<option option-id="' +
                        itemsID[index] +
                        '" value="' +
                        el[element.valfieldkey] +
                        '">' +
                        el[element.Dispfieldkey] +
                        "</option>";
                    });

                    htmlBody +=
                      "</select>" +
                      "<span data-trans-" +
                      Errmsgkey +
                      ' class="errMsgField Resources"></span>' +
                      '<div class="inputInfo ' +
                      isexist +
                      '">' +
                      descPhrase +
                      "</div>" +
                      "</div>";

                    OnSuccess(flag, htmlBody);
                  }
                }
              );
            }
          }
        );
        break;

      case "lookupmultiselectwithoutrepeat":

        var customQuery;
        var sourcelistQuery;
        var RelatedItemUsed = [];
        var listItemArr = [element.valfieldkey, element.Dispfieldkey];
        var getValuesfor = element.getValuesfor ? element.getValuesfor : ""
        var listenerClass = "";
        var targetTotalElement = element.targetTotalElement

        customQuery =
          "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

        sourcelistQuery =
          "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

        if (ICODE && element.initiativeCodeInList) {
          sourcelistQuery =
            "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
            ICODE +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        } else if (PCODE && element.projectCodeInList) {
          sourcelistQuery =
            "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
            PCODE +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        }

        if (element.queryField && element.queryField != "undefined" &&
          element.queryFieldType && element.queryFieldType != "undefined" &&
          element.queryFieldValue && element.queryFieldValue != "undefined") {

          sourcelistQuery = '<View><Query><Where><Eq><FieldRef Name="' +
            element.queryField +
            '" /><Value Type="' +
            element.queryFieldType +
            '">' +
            element.queryFieldValue +
            "</Value></Eq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
        }

        // to handle get thired value like weight in coc list in delivrables field 
        if (getValuesfor) {
          listItemArr.push(getValuesfor)
          listenerClass = "getTotalSelectedValues"
        }
        //


        var itemIDlist = [],
          itemsID = [];
        var listItemId = "";

        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.listname,
          customQuery,
          [element.valfieldkey, element.targetelement],
          function (records, record, listItem, isDone) {

            if (listItem) itemIDlist.push(listItem.get_id());

            if (isDone) {
              records.forEach(function (el, index) {
                if (el[element.targetelement]) {
                  if (!RelatedItemUsed.includes(el[element.targetelement])) {
                    if (itemIDlist[index] != IID) {
                      // console.log(el[element.targetelement],"el[element.targetelement]")
                      if (el[element.targetelement].indexOf(":::") > -1) {
                        var splitMultiVal = el[element.targetelement].split(":::");
                        splitMultiVal.forEach(item => {
                          if (!RelatedItemUsed.includes(item)) {
                            RelatedItemUsed.push(item);
                          }
                        })
                      } else {
                        RelatedItemUsed.push(el[element.targetelement]);
                      }
                    }
                  }
                }
              });

              htmlBody =
                '<div class="col-md-6 CFIELD ' +
                dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
                " " +
                element.className +
                " " +
                hideField +
                ' " ' +
                thistip +
                " " +
                hidestagesIDs +
                " " +
                editableBy +
                " " +
                showstagesIDs +
                "  " +
                disablestagesIDs +
                "  " +
                enablestagesIDs +
                "   " +
                isWfhidestagesIDs +
                " " +
                requireOnWfTaskstagesIDs +
                " " +
                isWfshowstagesIDs +
                "  " +
                isWfdisablestagesIDs +
                "  " +
                isWfenablestagesIDs +
                '        data-groups="' +
                groups +
                '" style="display:' +
                element.display +
                '">' +
                '<label for="' +
                element.InternalName +
                '" ' +
                element.validation +
                ">" +
                displayName +
                "</label>" +
                '<div style="display:inline-' +
                element.toggledisplay +
                '" class="showhide-trigger" title="Show/Hide ' +
                displayName +
                '"></div>' +
                '<ul myfield="' +
                element.InternalName +
                '" id="' +
                element.InternalName +
                '" type="multiselect" class="multiselect-container form-control" type="multiselect">' +
                '<li class="dropdown ul-bullet-remove">' +
                '<a href="#" data-toggle="dropdown" class="dropdown-toggle">' +
                displayName +
                '<b class="caret"></b></a>' +
                '<ul class="dropdown-menu multiselect_scroll ' + element.validation + '" >';

              sphttp.get(
                _spPageContextInfo.siteServerRelativeUrl,
                element.source,
                sourcelistQuery,
                listItemArr,
                function (records, record, listItem, isDone) {
                  if (isDone) {

                    var grpfield = element.grpfieldkey;

                    window.resultMulti = records.reduce(function (r, a) {
                      r[a[grpfield]] = r[a[grpfield]] || [];
                      if (!RelatedItemUsed.includes(a[element.valfieldkey])) {
                        r[a[grpfield]].push(a);
                      }
                      return r;

                    }, Object.create(null));


                    Object.entries(resultMulti).forEach((el) => {
                      htmlBody += '<label class="grp-select">' + el[0] + "</label>";
                      el[1].forEach((dl) => {

                        htmlBody +=
                          "<li>" +
                          '<div class="checkbox">' +
                          "<label>" +
                          '<input class="' + listenerClass + '" value="' +
                          dl[element.valfieldkey] +
                          '" id="' +
                          element.InternalName +
                          '" type="checkbox" data-targettotalelement=' + element.targetTotalElement + ' data-getothervalue=' + dl[element.getValuesfor] + '>' +
                          dl[dispfieldkey] +
                          "</label>" +
                          "</div>" +
                          "</li>";
                      });
                    });

                    htmlBody +=
                      "</ul>" +
                      "</li>" +
                      "</ul>" +
                      "<span data-trans-" +
                      Errmsgkey +
                      ' class="errMsgField Resources"></span>' +
                      '<div class="inputInfo ' +
                      isexist +
                      '">' +
                      descPhrase +
                      "</div>" +
                      "</div>";

                    OnSuccess(flag, htmlBody);

                  }
                })

            }
          })

        break;

      case "lookupwithoutrepeat":
        var customQuery;
        var sourcelistQuery;
        var RelatedItemUsed = [];

        customQuery =
          "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";

        sourcelistQuery =
          "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";


        if (element.queryField && element.queryField != "undefined" &&
          element.queryFieldType && element.queryFieldType != "undefined" &&
          element.queryFieldValue && element.queryFieldValue != "undefined") {

          sourcelistQuery = '<View><Query><Where><Eq><FieldRef Name="' +
            element.queryField +
            '" /><Value Type="' +
            element.queryFieldType +
            '">' +
            element.queryFieldValue +
            "</Value></Eq></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
        }

        if (ICODE && element.initiativeCodeInList) {
          sourcelistQuery =
            "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
            ICODE +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
        }



        var itemIDlist = [],
          itemsID = [];
        var listItemId = "";

        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.listname,
          customQuery,
          [element.valfieldkey, element.targetelement, element.Dispfieldkey],
          function (records, record, listItem, isDone) {
            if (listItem) itemIDlist.push(listItem.get_id());
            if (isDone) {
              records.forEach(function (el, index) {
                if (el[element.targetelement]) {
                  if (!RelatedItemUsed.includes(el[element.targetelement])) {
                    if (itemIDlist[index] != IID) {
                      RelatedItemUsed.push(el[element.targetelement]);
                    }
                  }
                }
              });

              htmlBody =
                '<div class="col-md-6 CFIELD ' +
                dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
                " " +
                element.className +
                " " +
                hideField +
                ' " ' +
                thistip +
                " " +
                hidestagesIDs +
                " " +
                editableBy +
                " " +
                showstagesIDs +
                "  " +
                disablestagesIDs +
                "  " +
                enablestagesIDs +
                "   " +
                isWfhidestagesIDs +
                " " +
                requireOnWfTaskstagesIDs +
                " " +
                isWfshowstagesIDs +
                "  " +
                isWfdisablestagesIDs +
                "  " +
                isWfenablestagesIDs +
                '        data-groups="' +
                groups +
                '" style="display:' +
                element.display +
                '">' +
                '<label for="' +
                element.InternalName +
                '" ' +
                element.validation +
                ">" +
                displayName +
                "</label>" +
                "<select " +
                ToggleName +
                " " +
                toggleDisabledName +
                " " +
                RequiredName +
                " " +
                inputLisKey +
                element.validation +
                " " +
                dynamic +
                ' data-listname="' +
                element.source +
                '" data-valfieldkey="' +
                element.valfieldkey +
                '" data-Dispfieldkey="' +
                dispfieldkey +
                '" data-filterfield="' +
                element.filterField +
                '" data-queryfieldvalue="' +
                element.queryFieldValue +
                '"data-queryfield="' +
                element.queryField +
                '"data-queryfieldtype="' +
                element.queryFieldType +
                '" data-filterfieldtype="' +
                element.filterFieldType +
                '" class="form-control" type="dropdown" id="' +
                element.InternalName +
                '" value="" placeholder="' +
                displayName +
                '" ' +
                element.state +
                '><option value="" ' +
                selected +
                " disabled>" +
                displayName +
                "</option>";

              sphttp.get(
                _spPageContextInfo.siteServerRelativeUrl,
                element.source,
                sourcelistQuery,
                [element.valfieldkey, element.Dispfieldkey],
                function (records, record, listItem, isDone) {
                  if (isDone) {
                    records.forEach(function (el, index) {
                      if (!RelatedItemUsed.includes(el[element.valfieldkey])) {
                        htmlBody +=
                          '<option option-id="' +
                          itemsID[index] +
                          '" value="' +
                          el[element.valfieldkey] +
                          '">' +
                          el[dispfieldkey] +
                          "</option>";
                      }
                    });

                    htmlBody +=
                      "</select>" +
                      "<span data-trans-" +
                      Errmsgkey +
                      ' class="errMsgField Resources"></span>' +
                      '<div class="inputInfo ' +
                      isexist +
                      '">' +
                      descPhrase +
                      "</div>" +
                      "</div>";
                    //console.log(`htmlBody from lookup success`, htmlBody);
                    OnSuccess(flag, htmlBody);
                  }
                }
              );
            }
          }
        );

        break;

      case "lookup":
        var customQuery;
        let roleAccess = []


        if (element.hasOwnProperty("useAccessPolicy") && element.useAccessPolicy) {

          if (myRoleConfig[0].hasOwnProperty("dataFilter")) {
            isRoleDataLevelAccess = true;
            // console.log("inside form render")

            // var x = ["Projects"]

            //  initiateDataLevelAccess("Projects")
            //  var queryTest = ""
            //  queryTest = await get_hierarchies.init()
            await get_hierarchies.init(element.source)

            // console.log(queryTest, "query queryquery")
            // console.log(query, "After hirercies")

            // customQuery = query
            // if (queryTest) {
            myRoleConfig[0].dataFilter.hierarchies.forEach((el, i, a) => {

              let accessConditions = el.accessConditions;
              let isListConditional1 = el.listName == element.source;
              let isListConditional2 = el.subRelation.listName == element.source;
              let isListConditional3 =
                el.subRelation.subRelation.listName == element.source;
              let isListConditional4 = (el.subRelation.subRelation.subRelation ? el.subRelation.subRelation.subRelation.listName == element.source : false);
              if (isListConditional1) {
                customQuery = data_Level1_Access.g.dataLevelQuery
              } else if (isListConditional2) {
                customQuery = data_Level2_Access.g.dataLevelQuery
              } else if (isListConditional3) {
                customQuery = data_Level3_Access.g.dataLevelQuery
              } else if (isListConditional4) {
                customQuery = data_Level3_Access.g.dataLevelQuery

              }
            })


            console.log(customQuery, "customQuery in lookup")
            // }
          }
        }
        // filter data based on role access
        else if (element.hasOwnProperty("accessFilter")) {
          roleAccess = element.accessFilter.filter((el) => {
            return el.role == myRoleConfig[0].Role;
          });
          if (roleAccess.length > 0) {
            customQuery = await ListInfo.roleQuery(roleAccess[0].conditions);
          }
          console.log(roleAccess, "roleAccessss roleAccessss")
        }
        if (roleAccess.length == 0 && !element.hasOwnProperty("useAccessPolicy")) { // can't put else cause when the roleAccess will be empty arrray will nor render a query so all data(deleted and not deleted will appear)
          if (element.isSector == "True") {
            customQuery =
              "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"EntityType\" /><Value Type=\"Choice\">" +
              element.EntityType +
              "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          } else if (PCODE && element.projectCodeInList) {
            customQuery =
              "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
              PCODE +
              "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
            if (element.hasOwnProperty("projectScopeSecondConditionField")) {
              customQuery =
                `<View><Query><Where><And>
								<Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><And>
								<Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">${PCODE}</Value></Eq>
								<Eq><FieldRef Name=\"${element.projectScopeSecondConditionFieldType}\" /><Value Type=\"${element.projectScopeSecondConditionFieldType}\">${element.projectScopeSecondConditionFieldValue}</Value></Eq></And></And>
								</Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>`;
            }
          } else if (ICODE && element.initiativeCodeInList) {
            customQuery =
              "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
              ICODE +
              "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          } else {
            //change FieldRef to Name and Acending True to can sort alphapetics arabic and english
            customQuery =
              "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";
          }

          // should remove all comments when check the security role

          // if (
          //   (listkey == "sos" && element.InternalName == "RelatedStrategy") ||
          //   (listkey == "mainkpi" && element.InternalName == "RelatedStrategy")
          // ) {
          //   // to get the related strategy type based on user Role
          //   if (isVROP) {
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">vision</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          //   } else {

          //   }
          // }

          //if ICODE and listkey = 'initiativedeli'
          // if (ICODE && element.source == "Benefits") {
          //   //change FieldRef to Name and Acending True to can sort alphapetics arabic and english
          //   customQuery =
          //     "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
          //     ICODE +
          //     "</Value></Eq></And></Where><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";
          // }
          // if (
          //   ICODE &&
          //   element.source == "InitiativeDeliverables" &&
          //   listkey == "initiativemilestones"
          // ) {
          //   //change FieldRef to Name and Acending True to can sort alphapetics arabic and english
          //   customQuery =
          //     "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
          //     ICODE +
          //     "</Value></Eq></And></Where><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";
          // }
          //ghufran User dropdown security
          // if (isEPMO || isSPMAdmin || isSPMTeam) {
          //   if (
          //     (listkey == "benefitmetrics" &&
          //       element.InternalName == "RelatedBenefit") ||
          //     (listkey == "benefitmatrix" &&
          //       element.InternalName == "RelatedBenefit") ||
          //     (listkey == "deliverablemetrics" &&
          //       element.InternalName == "RelatedInitiativeDeliverable")
          //   ) {
          //     if (localStorage.getItem("Dynamo_Initiatives") != null) {
          //       var visionarr = JSON.parse(
          //         localStorage.getItem("Dynamo_Initiatives") || "[]"
          //       );
          //       visionarr = visionarr.filter(function (item) {
          //         return item.name == "vision";
          //       });
          //       var strategicallyarr = JSON.parse(
          //         localStorage.getItem("Dynamo_Initiatives") || "[]"
          //       );
          //       strategicallyarr = strategicallyarr.filter(function (item) {
          //         return item.name == "strategically";
          //       });
          //       console.log("visionarr", visionarr);
          //       console.log("strategic", strategicallyarr);
          //     }
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"InitiativeCode\" /><Values>";
          //     strategicallyarr.forEach(function (item) {
          //       customQuery += '<Value Type="Text">' + item.code + "</Value>";
          //     });
          //     customQuery +=
          //       "</Values></In></And></Where></Query><RowLimit>100</RowLimit></View>";
          //   } else if (
          //     (listkey == "Benefits" &&
          //       element.InternalName == "InitiativeCode") ||
          //     (listkey == "BenefitMatrix" &&
          //       element.InternalName == "RelatedInitiative")
          //   ) {
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">strategically</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          //   } else if (
          //     "benefitmatrix" &&
          //     element.InternalName == "RelatedKPI"
          //   ) {
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus'/><Value Type='Text'>Deleted</Value></Neq><Or><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">strategically</Value></Eq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">sub</Value></Eq></Or></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          //   }
          // }
          // if (isVROE || isVROP) {
          //   if (
          //     (listkey == "Benefits" &&
          //       element.InternalName == "InitiativeCode") ||
          //     (listkey == "BenefitMatrix" &&
          //       element.InternalName == "RelatedInitiative")
          //   ) {
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">vision</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          //   } else if (
          //     (listkey == "benefitmetrics" &&
          //       element.InternalName == "RelatedBenefit") ||
          //     (listkey == "benefitmatrix" &&
          //       element.InternalName == "RelatedBenefit") ||
          //     (listkey == "deliverablemetrics" &&
          //       element.InternalName == "RelatedInitiativeDeliverable")
          //   ) {
          //     if (localStorage.getItem("Dynamo_Initiatives") != null) {
          //       var visionarr = JSON.parse(
          //         localStorage.getItem("Dynamo_Initiatives") || "[]"
          //       );
          //       visionarr = visionarr.filter(function (item) {
          //         return item.name == "vision";
          //       });
          //       var strategicallyarr = JSON.parse(
          //         localStorage.getItem("Dynamo_Initiatives") || "[]"
          //       );
          //       strategicallyarr = strategicallyarr.filter(function (item) {
          //         return item.name == "strategically";
          //       });
          //       console.log("visionarr", visionarr);
          //       console.log("strategic", strategicallyarr);
          //     }
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><In><FieldRef Name=\"InitiativeCode\" /><Values>";
          //     visionarr.forEach(function (item) {
          //       customQuery += '<Value Type="Text">' + item.code + "</Value>";
          //     });
          //     customQuery +=
          //       "</Values></In></And></Where></Query><RowLimit>100</RowLimit></View>";
          //   } else if (
          //     "benefitmatrix" &&
          //     element.InternalName == "RelatedKPI"
          //   ) {
          //     customQuery =
          //       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"Types\" /><Value Type=\"Text\">vision</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>";
          //   }
          // }
        }

        //to handle lookup field bilangual like Portfolio
        if (element.BIlanguage == true) {
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            dispfieldkey = element.Dispfieldkey;
          } else {
            dispfieldkey = element.DispfieldkeyEn;
          }
        }


        var listFields = [element.valfieldkey, dispfieldkey];


        if (element.sourcefieldlvl1) {
          // to handle sector and subsector (get the element from list)
          parentFieldKey = element.fieldsinformlvl1;
          // listFields = [element.valfieldkey, dispfieldkey, element.filterField];
          listFields.push(element.sourcefieldlvl1)

          if (element.sourcefieldlvl2) {
            listFields.push(element.sourcefieldlvl2)
          }

        } else {
          parentFieldKey = "";
        }
        /////////////////////////////////////////////////////////// to get the seblings value

        if (element.hasOwnProperty('valsiblingkey')) {
          listFields.push(element.valsiblingkey)
        }
        /////////////////////////////////////////////////////////// to get the seblings array of name and values and assign it on siblings fields
        if (element.hasOwnProperty('targetsiblingarr')) {
          element.targetsiblingarr.forEach(el => {
            listFields.push(el)
          })
        }

        ///////////////////////////////////////////////////////////
        var grandFieldId = ""
        if (element.grandFieldId) {
          grandFieldId = `data-grandFieldId=${element.grandFieldId}`
        } else {
          grandFieldId = ""
        }
        var notInvokeListinerData = "", seconedValueListiner = "", parentCustomFilterValue = "";
        if (element.notInvokeListiner) {
          notInvokeListinerData = `data-notInvokeListiner=${element.notInvokeListiner}`
          seconedValueListiner = `data-seconedvaluelistiner=""`

          parentCustomFilterValue = `data-parentcustomfiltervalue=""`
        }

        // validation of siblings to add a listiner class 
        var addSeblingClass = ""
        if ((element.targetsiblingkey && element.targetsiblingkey != 'undefined') || (element.targetsiblingarr && element.targetsiblingarr != 'undefined')) {
          addSeblingClass = "getsiblingdata"
        }
        /////////////////////////////////////////////////
        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<select " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          " " +
          inputLisKey +
          element.validation +
          " " +
          grandFieldId +
          " " +
          notInvokeListinerData +
          " " +
          parentCustomFilterValue +
          " " +
          seconedValueListiner +
          " " +
          dynamic +
          " " +
          seconeddynamic +
          ' data-listname="' +
          element.source +
          '" data-valfieldkey="' +
          element.valfieldkey +
          '" data-Dispfieldkey="' +
          dispfieldkey +
          '"data-filterfield="' +
          element.filterField +
          '"data-queryfieldvalue="' + //
          element.queryFieldValue +
          '"data-queryfield="' + //
          element.queryField +
          '"data-queryfieldtype="' + //
          element.queryFieldType +
          '" data-filterfieldtype="' +
          element.filterFieldType +
          '" data-siblingtarget="' + element.targetsiblingkey + '" class="form-control ' + addSeblingClass + '" type="dropdown" id="' + // getsiblingdata to get the data based on selection value
          element.InternalName +
          '" value="" placeholder="' +
          displayName +
          '" ' +
          element.state +
          '><option value="" ' +
          selected +
          " disabled>" +
          displayName +
          "</option>";


        var itemsID = [];
        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.source,
          customQuery,
          listFields,
          function (records, record, listItem, isDone) {
            if (listItem) itemsID.push(listItem.get_id());
            if (isDone) {
              // to handle sibling array values 
              var dataArraySiblingValues = []
              records.forEach(function (el, index) {
                var arraysiblingvalues = []

                if (element.targetsiblingarr && element.targetsiblingarr != "undefined") {
                  element.targetsiblingarr.forEach(item => {
                    arraysiblingvalues.push({ name: item, value: el[item] })
                  })

                  dataArraySiblingValues = 'data-arraysiblingvalues="' +
                    JSON.stringify(arraysiblingvalues).replaceAll(
                      `"`,
                      `'`
                    ) +
                    '"'
                }
                //

                if (el[dispfieldkey] && el[dispfieldkey].length > 100) {
                  var optionText = el[dispfieldkey].substr(0, 100) + "...";
                } else {
                  var optionText = el[dispfieldkey];
                }
                htmlBody +=
                  '<option data-siblingvalue="' + el[element.valsiblingkey] + '" ' + dataArraySiblingValues + ' option-id="' +
                  itemsID[index] +
                  '" value="' +
                  el[element.valfieldkey] + //data-parentrelatedkeylvl1 > to get the target element,data-parentrelatedvaluelvl1 > to save the value of parent like sector
                  '" data-parentrelatedvaluelvl1=' +
                  el[element.sourcefieldlvl1] +
                  " data-parentrelatedkeylvl1=" +
                  element.fieldsinformlvl1 + // changed from dynamic to fieldsinformlvl1
                  " data-parentrelatedvaluelvl2=" +
                  el[element.sourcefieldlvl2] +
                  " data-parentrelatedkeylvl2=" +
                  element.fieldsinformlvl2 +
                  " >" +
                  optionText +
                  "</option>";
              });
              htmlBody +=
                "</select>" +
                '<div class="inputInfo ' +
                isexist +
                '">' +
                descPhrase +
                "</div>" +
                "</div>";
              //console.log(`htmlBody from lookup success`, htmlBody);
              OnSuccess(flag, htmlBody);
            }
          }
        );
        break;

      case "lookupWithQuery":
        var customQuery;
        //change FieldRef to Name and Acending True to can sort alphapetics arabic and english
        customQuery =
          "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"" +
          element.queryField +
          '" /><Value Type="' +
          element.queryFieldType +
          '">' +
          element.queryFieldValue +
          "</Value></Eq></And></Where><OrderBy><FieldRef Name='Name' Ascending='True' /></OrderBy></Query></View>";

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '    data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<select " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          "  " +
          element.validation +
          " " +
          dynamic +
          ' data-listname="' +
          element.source +
          '" data-valfieldkey="' +
          element.valfieldkey +
          '" data-Dispfieldkey="' +
          element.Dispfieldkey +
          '"  data-filterfield="' +
          element.filterField +
          '"data-queryfieldvalue="' +
          element.queryFieldValue +
          '"data-queryfield="' +
          element.queryField +
          '"data-queryfieldtype="' +
          element.queryFieldType +

          '" data-filterfieldtype="' +
          element.filterFieldType +
          '" class="form-control" type="dropdown" id="' +
          element.InternalName +
          '" value="" placeholder="' +
          displayName +
          '" ' +
          element.state +
          '><option value="" ' +
          selected +
          " disabled>" +
          displayName +
          "</option>";

        var itemsID = [];
        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.source,
          customQuery,
          [element.valfieldkey, element.Dispfieldkey],
          function (records, record, listItem, isDone) {
            if (listItem) itemsID.push(listItem.get_id());
            if (isDone) {
              records.forEach(function (el, index) {
                htmlBody +=
                  '<option option-id="' +
                  itemsID[index] +
                  '" value="' +
                  el[element.valfieldkey] +
                  '">' +
                  el[element.Dispfieldkey] +
                  "</option>";
              });
              htmlBody += "</select></div>";
              OnSuccess(flag, htmlBody);
            }
          }
        );
        break;

      case "relatedProjectlookupWithQuery": //to specific data related to 2 columns added by mahmoud and aisha
        var customQuery;
        if (element.queryField2 && element.notEqual) {
          // handle the deleverynote not eq 100 in DN new Json
          customQuery =
            '<View><Query><Where><And><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' +
            PCODE +
            '</Value></Eq><And><Neq><FieldRef Name="' +
            element.queryField2 +
            '" /><Value Type="' +
            element.queryFieldType2 +
            '">' +
            element.queryFieldValue2 +
            '</Value></Neq><Eq><FieldRef Name="' +
            element.queryField +
            '" /><Value Type="' +
            element.queryFieldType +
            '">' +
            element.queryFieldValue +
            "</Value></Eq></And></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
        } else if (element.queryField2) {
          customQuery =
            '<View><Query><Where><And><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' +
            PCODE +
            '</Value></Eq><And><Eq><FieldRef Name="' +
            element.queryField2 +
            '" /><Value Type="' +
            element.queryFieldType2 +
            '">' +
            element.queryFieldValue2 +
            '</Value></Eq><Eq><FieldRef Name="' +
            element.queryField +
            '" /><Value Type="' +
            element.queryFieldType +
            '">' +
            element.queryFieldValue +
            "</Value></Eq></And></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
        } else {
          customQuery =
            '<View><Query><Where><And><Eq><FieldRef Name="ProjectCode" /><Value Type="Text">' +
            PCODE +
            '</Value></Eq><Eq><FieldRef Name="' +
            element.queryField +
            '" /><Value Type="' +
            element.queryFieldType +
            '">' +
            element.queryFieldValue +
            "</Value></Eq></And></Where><OrderBy><FieldRef Name='Created' Ascending='False' /></OrderBy></Query></View>";
        }

        htmlBody =
          '<div class="col-md-6 CFIELD ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '    data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<select " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          " " +
          element.validation +
          " " +
          dynamic +
          ' data-listname="' +
          element.source +
          '" data-valfieldkey="' +
          element.valfieldkey +
          '" data-Dispfieldkey="' +
          element.Dispfieldkey +
          '" data-filterfield="' +
          element.filterField +
          '" data-filterfieldtype="' +
          element.filterFieldType +
          ' " class="form-control" type="dropdown" id="' +
          element.InternalName +
          '" value="" placeholder="' +
          displayName +
          '" ' +
          element.state +
          '><option value="" ' +
          selected +
          " disabled>" +
          displayName +
          "</option>";

        var itemsID = [];
        sphttp.get(
          _spPageContextInfo.siteServerRelativeUrl,
          element.source,
          customQuery,
          [element.valfieldkey, element.Dispfieldkey],
          function (records, record, listItem, isDone) {
            if (listItem) itemsID.push(listItem.get_id());
            if (isDone) {
              records.forEach(function (el, index) {
                htmlBody +=
                  '<option option-id="' +
                  itemsID[index] +
                  '" value="' +
                  el[element.valfieldkey] +
                  '">' +
                  el[element.Dispfieldkey] +
                  "</option>";
              });
              htmlBody += "</select></div>";
              //console.log(`htmlBody from lookup success`, htmlBody);
              OnSuccess(flag, htmlBody);
            }
          }
        );
        break;

      case "multiline":
        htmlBody =
          '<div class="col-md-6 CFIELD multiline ' +
          dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
          " " +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label for="' +
          element.InternalName +
          '" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" +
          "<textarea " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' type="multiline" maxlength=' + element.maxchar + ' rows="3" value="" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          "></textarea>" +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        OnSuccess(flag, htmlBody);
        break;

      case "breakline":
        htmlBody = '<div class="col-md-12"></div>';
        OnSuccess(flag, htmlBody);
        break;

      case "anchor":

        htmlBody =
          '<div class="col-md-3 CFIELD ' +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '       data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          "<a " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          ' href="' + element.href + '" ' +
          dynamic +
          ' class="formLink" id="' +
          element.InternalName +
          '" ' +
          element.state +
          " " +
          element.validation +
          " target='_blank'>" +
          displayName +
          '<i class="icon-plus"></i>' +
          "</a>" +
          "</div>";
        // htmlBody = '<div class="col-md-12"></div>';
        OnSuccess(flag, htmlBody);
        break;

      case "file":
        var attachmentId =
          attachCount == 0 ? "getFile" : "getFile" + attachCount;

        // to add the purpose of attach
        let docPurpose = element.docPurpose ? `data-docpurpose=${element.docPurpose}` : ""

        htmlBody =
          '<div class="col-md-12 CFIELD ' +
          element.className +
          " " +
          hideField +
          ' " ' +
          thistip +
          " " +
          hidestagesIDs +
          " " +
          editableBy +
          " " +
          showstagesIDs +
          "  " +
          disablestagesIDs +
          "  " +
          enablestagesIDs +
          "   " +
          isWfhidestagesIDs +
          " " +
          requireOnWfTaskstagesIDs +
          " " +
          isWfshowstagesIDs +
          "  " +
          isWfdisablestagesIDs +
          "  " +
          isWfenablestagesIDs +
          '        data-groups="' +
          groups +
          '" style="display:' +
          element.display +
          '">' +
          '<label  class="attlabel" ' +
          element.validation +
          ">" +
          displayName +
          "</label>" + //class="custom-file-upload"
          "<input " +
          ToggleName +
          " " +
          toggleDisabledName +
          " " +
          RequiredName +
          " " +
          docPurpose +
          ' type="file" accept="' +
          acceptedExtensions +
          '" hidden multiple="multiple" placeholder="' +
          displayName +
          '" ' +
          dynamic +
          ' class="form-control SPIField" id="' +
          attachmentId +
          '" ' +
          element.state +
          " " +
          element.validation +
          " >" +
          '<label data-trans-choosefile id="chooseFile" for="' +
          attachmentId +
          '" class="Resources"></label>' +
          '<span id="file-chosen"><span data-trans-nofile id="nofile" class="Resources"></span></span>' +
          '<div class="AttErrorMsg attErrorMsg"><span data-trans-file class="Resources"></span><span class="notacceptedext"></span><span data-trans-notallowed class="Resources"></span></div>' +
          '<div class="attErrorMsg"><span data-trans-acceptedfiles class="Resources"></span><span class="acceptedfile"></span></div>' +
          '<div class="attErrorMsg"><span data-trans-fileSize class="Resources"></span></div>' +
          '<div class="inputInfo ' +
          isexist +
          '">' +
          descPhrase +
          "</div>" +
          "</div>";
        if (element.withAddBtn == "true") {
          htmlBody +=
            '<div class="add-New-Detail-wrapper"><a class="add-New-Attach" href="javascript:"><i class="fas fa-plus"></i></a></div>';
        }

        attachCount = attachCount + 1;

        OnSuccess(flag, htmlBody);
        break;
    }
    // if (!isCrMode && crListKey) {
    //   //on new custom cr
    //   handleCustomeCr.init();
    //   $(
    //     "div#particles-foreground, div#particles-background, .vertical-centered-box"
    //   ).animate(
    //     {
    //       opacity: 0,
    //     },
    //     {
    //       duration: 333,
    //       complete: function () {
    //         $(
    //           "div#particles-foreground, div#particles-background, .vertical-centered-box"
    //         ).remove();

    //         // $('div#particles-foreground, div#particles-background, .vertical-centered-box').hide();
    //       },
    //     }
    //   );
    // } else {
    //   $(
    //     "div#particles-foreground, div#particles-background, .vertical-centered-box"
    //   ).animate(
    //     {
    //       opacity: 0,
    //     },
    //     {
    //       duration: 333,
    //       complete: function () {
    //         $(
    //           "div#particles-foreground, div#particles-background, .vertical-centered-box"
    //         ).remove();

    //         // $('div#particles-foreground, div#particles-background, .vertical-centered-box').hide();
    //       },
    //     }
    //   );
    // }
    //return htmlBody;
  },
  g: {
    htmlText: "",
    htmlElement: "",
    pcodeval: function () {
      // not allow spaces and special characters
      $("input.NoSpChar").on("input", function () {
        var c = this.selectionStart,
          r = /[^a-z0-9]/gi,
          v = $(this).val();
        if (r.test(v)) {
          $(this).val(v.replace(r, ""));
          c--;
        }
        this.setSelectionRange(c, c);
      });
    },
    newDetail: function () {


      //to check the length of new master
      var masterLength = 0


      //pluss
      $("[data-target_list] .fieldset-container").append(
        '<div class="add-New-Detail-wrapper"><a class="add-New-Detail" href="javascript:"><i class="fas fa-plus"></i></a><a class="remove-New-Detail" href="javascript:"><i class="fas fa-minus"></i></a></div>'
      );


      $(".add-New-Detail").on("click", function () {

        // to handle the index on master details
        var getMasterIndex = $(this).closest("[data-target_list]").find(".Details-Item.NewItem").last().attr('data-index')
        if (isNew && listkey != "changerequest") {
          getMasterIndex = getMasterIndex ? Number(getMasterIndex) : ""
          getMasterIndex = getMasterIndex + 1
        } else if (isEdit || listkey == "changerequest") {
          var checkEditMasterCount = $(this).closest("[data-target_list]").find(".Details-Item.EditItem")
          var checkNewMasterCount = $(this).closest("[data-target_list]").find(".Details-Item.NewItem")
          checkEditMasterCount = checkEditMasterCount ? checkEditMasterCount.length : 0
          checkEditMasterCount = Number(checkEditMasterCount)
          checkNewMasterCount = checkNewMasterCount ? checkNewMasterCount.length : 0
          checkNewMasterCount = Number(checkNewMasterCount)
          getMasterIndex = checkEditMasterCount + checkNewMasterCount + 1
        }



        if ((listkey == 'projects' || listkey == 'initiatives') && isNew) {
          var lastDetailsItemBeforeAdd = $(this).closest("[data-target_list]").find(".Details-Item").last()
          lastDetailsItemBeforeAdd.addClass('disable_section')
        } else if (listkey == "changerequest" && (RListKey == 'projects' || RListKey == 'initiatives')) {
          var lastDetailsItemBeforeAdd = $(this).closest("[data-target_list]").find(".Details-Item.NewItem").last()
          if (lastDetailsItemBeforeAdd.length == 0) {
            var onLoadMaster = $(this).closest("[data-target_list]").find(".Details-Item.EditItem")
            if (onLoadMaster.length) {
              onLoadMaster.each(function () {
                $(this).addClass("disable_section")
              })
            }
          } else {
            lastDetailsItemBeforeAdd.addClass('disable_section')
          }
        }
        else if ((listkey == 'projects' || listkey == 'initiatives') && isEdit) {

          var lastDetailsItemBeforeAdd = $(this).closest("[data-target_list]").find(".Details-Item.NewItem").last()
          if (lastDetailsItemBeforeAdd.length == 0) {
            var onLoadMaster = $(this).closest("[data-target_list]").find(".Details-Item.EditItem")
            if (onLoadMaster.length) {
              onLoadMaster.each(function () {
                $(this).addClass("disable_section")
              })
            }
          } else {
            lastDetailsItemBeforeAdd.addClass('disable_section')
          }

        }



        var totalWeight = 0


        $(this).parent().parent().children('.Details-Item').each(function () {
          console.log($(this).find('.weightfloatpercentage').val())
          var value = $(this).find('.weightfloatpercentage').val()
          value = value ? value : 0
          totalWeight += Number(value)
        })

        //$('.add-New-Detail').closest("[data-target_list]").find(".Details-Item:first-child")

        var toappend = $(this)
          .closest("[data-target_list]")
          .find(".Details-Item:first-child")
          .html()
          .toString(); //.replaceAll('value', 'value=""');


        $('<div class="Details-Item NewItem" data-index="' + getMasterIndex + '">' + toappend + "</div>").insertBefore($(this).parent());

        // insert new max for weight deliv
        var lastDetailsItem = $(this).closest("[data-target_list]").find(".Details-Item").last()
        lastDetailsItem.find('.remainpercstyle.remainPercentageVal').html(`${100 - totalWeight}]`) // add new title weight
        lastDetailsItem.find('.weightfloatpercentage').attr("max", 100 - totalWeight) // add new max weight
        //
        debugger
        masterLength = $(this).closest("[data-target_list]").find(".Details-Item.NewItem").length

        // to remove the disabled on multi select when click plus in master filed of master details section like deliv in benefit in edit initiative
        $(this).closest("[data-target_list]").find(".Details-Item.NewItem").last().find('ul[data-fieldtargetlist]').find("input:checkbox").each(function () {
          $(this).attr("disabled", false)
        })


        if (isNew && listkey == "changerequest") {
          if (masterLength > 0) {
            $(this).closest("[data-target_list]").find(".remove-New-Detail").show()
          }
        } else if (isNew) {
          // in new > 1 because on render the form there is a new Item so it will be  before click on +
          if (masterLength > 1) {
            $(this).closest("[data-target_list]").find(".remove-New-Detail").show()
          }
        } else if (isEdit) {
          // in edit > 0 because on render the form there is no new Item till will click on +
          if (masterLength > 0) {
            $(this).closest("[data-target_list]").find(".remove-New-Detail").show()
          }
        }


        var myPPicker = [];
        $(this)
          .closest(".fieldset-container")
          .find(".Details-Item.NewItem")
          .last()
          .find(".PPField")
          .each(function () {
            $(
              '<div class="PPField SPIField form-control" type="picker" id="' +
              $(this).attr("id") +
              "+++" +
              Math.floor(Math.random() * 1000000) +
              '" value="" placeholder="' +
              $(this).attr("placeholder") +
              '" INppicker="' +
              $(this).attr("id") +
              "+++" +
              Math.floor(Math.random() * 1000000) +
              '"></div>'
            ).insertBefore($(this));
            $(this).remove();
          });
        // $(this).closest('.fieldset-container').append('<div class="Details-Item NewItem">'+toappend+'</div>');
        $(this)
          .closest(".fieldset-container")
          .find(".Details-Item.NewItem")
          .last()
          .find("div[type=picker]")
          .each(function () {
            var mp = new MyPeoplePicker();
            mp.init($(this).attr("id"), {
              PrincipalAccountType: "User",
              AllowMultipleValues: false,
            });
            $(this)
              .find(".sp-peoplepicker-initialHelpText")
              .text("ادخل الإسم أو البريد الإلكتروني ...");
          });


        if (listkey == "changerequest" && (isNew || isEdit)) {
          // add in master arry when click on plus
          Add_New_CRMaster.init(getMasterIndex)
        }


      });

      // remove new section
      $(".remove-New-Detail").on("click", function () {



        if (listkey == "changerequest" && (isNew || isEdit)) {
          // remove from master array when click on minus
          var lastIndex = $(this).closest("[data-target_list]").find(".Details-Item.NewItem").last().data('index')
          Remove_New_CRMaster.init(lastIndex)
        }


        masterLength = $(this).closest("[data-target_list]").find(".Details-Item.NewItem").length


        if (isNew && listkey == "changerequest") {
          if (masterLength > 0) {
            masterLength = masterLength - 1
            $(this).closest("[data-target_list]").find(".Details-Item.NewItem")[masterLength].remove()
          }
        } else if (isNew) {
          // in new > 1 because on render the form there is a new Item so it will be  before click on +
          if (masterLength > 1) {
            masterLength = masterLength - 1
            $(this).closest("[data-target_list]").find(".Details-Item.NewItem")[masterLength].remove()
          }
        } else if (isEdit) {
          // in edit > 0 because on render the form there is no new Item till will click on +
          if (masterLength > 0) {
            masterLength = masterLength - 1
            $(this).closest("[data-target_list]").find(".Details-Item.NewItem")[masterLength].remove()
          }
        }

        if (isNew && listkey == "changerequest") {
          if (masterLength == 0) {
            // to return the form as rendered
            $(this).closest("[data-target_list]").find(".remove-New-Detail").hide()
          }
        } else if (isNew) {
          if (masterLength == 1) {
            // to return the form as rendered
            $(this).closest("[data-target_list]").find(".remove-New-Detail").hide()
          }
        } else if (isEdit) {
          if (masterLength == 0) {
            // to return the form as rendered
            $(this).closest("[data-target_list]").find(".remove-New-Detail").hide()
          }
        }


        //to remeove disabled class on the last section
        if ((listkey == 'projects' || listkey == 'initiatives') && isNew) {

          var lastDetailsItemAfterRemove = $(this).closest("[data-target_list]").find(".Details-Item").last()
          lastDetailsItemAfterRemove.removeClass('disable_section')
        } else if (listkey == "changerequest" && (RListKey == 'projects' || RListKey == 'initiatives')) {
          var lastDetailsItemBeforeAdd = $(this).closest("[data-target_list]").find(".Details-Item.NewItem").last()
          if (lastDetailsItemBeforeAdd.length == 0) {
            var onLoadMaster = $(this).closest("[data-target_list]").find(".Details-Item.EditItem")
            if (onLoadMaster.length) {
              onLoadMaster.each(function () {
                $(this).removeClass("disable_section")
              })
            }
          } else {
            lastDetailsItemBeforeAdd.removeClass('disable_section')
          }
        } else if ((listkey == 'projects' || listkey == 'initiatives') && isEdit) {

          var lastDetailsItemBeforeAdd = $(this).closest("[data-target_list]").find(".Details-Item.NewItem").last()
          if (lastDetailsItemBeforeAdd.length == 0) {
            var onLoadMaster = $(this).closest("[data-target_list]").find(".Details-Item.EditItem")
            if (onLoadMaster.length) {
              onLoadMaster.each(function () {
                $(this).removeClass("disable_section")
              })
            }
          } else {
            lastDetailsItemBeforeAdd.removeClass('disable_section')
          }

        }
        //






      })



      //









      // $('.add-New-Detail').click(function()
      // {
      //     var toappend =  $(this).closest('[data-target_list]').find('.Details-Item').html().toString().replace('value', 'value=""');
      //     $('<div class="Details-Item NewItem">'+toappend+'</div>').insertBefore( $(this).parent() );
      //     // $(this).closest('.fieldset-container').append('<div class="Details-Item NewItem">'+toappend+'</div>');
      // });
      if (listkey == "projectcharter" && PCODE && isEdit) {
        // to remove the pluse btn in project chart on initiative section
        $(
          "[data-target_list='Initiatives'] .fieldset-container .add-New-Detail-wrapper"
        ).css("display", "none");
      }
    },
    attachmentsExtensions: function () {
      $(".AttErrorMsg").hide();

      if (typeof acceptedExtensions == "string") {
        acceptedExtensions = acceptedExtensions.split(",");
      }
      window.acceptedExtensionsstr = acceptedExtensions.toString();

      $("input[type=file]").each(function (e) {
        $(this)
          .parent()
          .find(".acceptedfile")
          .append("" + acceptedExtensionsstr + ",");
      });

      // $("input[type=file]").on("change", function (e) {
      $("body").on("change", "input[type=file]", function (e) {
        const fileChosen = $(this).parent().find("#file-chosen");

        $(this).parent().find(".AttErrorMsg").hide();
        validattachments = [];
        window.files = document.querySelector("#" + $(this).attr("id")).files;
        for (var i = 0; i < files.length; i++) {
          const file = files[i];
          const fileExtension = "" + file.name.split(".").pop();
          // get attribut
          console.log(
            acceptedExtensions,
            "acceptedExtensions acceptedExtensions"
          );

          if (acceptedExtensions.indexOf(fileExtension.toLowerCase()) > -1) {
            validattachments.push(file);
            if (
              (listkey == "projectcharter" && PCODE) ||
              (listkey == "initiativecards" && ICODE)
            ) {
              // to handle integration base64
              getBase64(file);
              // getBase64(file).then(
              //   data => {
              //     console.log(data)
              //     base64 = data
              //   }
              // );
            }
          } else {
            $(this)
              .parent()
              .find(".notacceptedext")
              .append("" + fileExtension + ",");
            $(this).parent().find(".AttErrorMsg").show();
            $(this).parent().find(".attErrorMsg").addClass("redColor");
          }
        }
        if (validattachments.length > 0) {
          if (
            (listkey == "projectcharter" && PCODE) ||
            (listkey == "initiativecards" && ICODE)
          ) {
            // to handle integration btn
            $(".integration-save").css({
              "pointer-events": "unset",
              opacity: "1",
            });
          }
          $(this).parent().find("#nofile").hide();
          fileChosen.html("");
        }
        for (var i = 0; i < validattachments.length; i++) {
          fileChosen.append(
            "<span class='attachfilename'><i class='fas fa-file'></i><span>" +
            validattachments[i].name +
            "</span><button type='button' class='removeAttchment'><i class='fas fa-times'></i></button></span>"
          );
        }

        //to remove attached file
        $(".removeAttchment")
          .unbind()
          .on("click", function () {
            var getInputId = $(this)
              .parent()
              .parent()
              .parent()
              .find("input")
              .attr("id"); // to get the specific id of attach when remove attach

            if (
              (listkey == "projectcharter" && PCODE) ||
              (listkey == "initiativecards" && ICODE)
            ) {
              // to handle integration btn
              $(".integration-save").css({
                "pointer-events": "none",
                opacity: "0.6",
              });
            }

            var fileindex = $(this).index(); // -2  git index 2 cause it's on index two of html elem

            validattachments.splice(fileindex, 1);
            $(this).parent().remove();
            window.AllFileCount = AllFileCount - 1;

            document.querySelector("#" + getInputId).value = ""; // to remove the value(files) of specific attachement.
          });
      });

      $(".add-New-Attach").click(function () {
        var pluseAttachTitle = "";
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          pluseAttachTitle = "المرفقات";
        } else {
          pluseAttachTitle = "Attachments";
        }

        //check if have docpurpose to save it in doc library
        var checkFilePurpose = ""
        var filePurposeData = ""
        if ($(this).parent().parent().find("input[data-docpurpose]").length > 0) {
          filePurposeData = $(this).parent().parent().find("input[data-docpurpose]").data("docpurpose")
          checkFilePurpose = `data-docpurpose=${filePurposeData}`
        }
        //

        // var fileId = "getFile" + pluseAttachCount;
        var fileId = "getFile" + attachCount;

        $(
          '<div class="col-md-12 CFIELD" data-groups="" >' + //style="display: flex;align-items: center;"
          '<label class="attlabel" for="getFile"  undefined="">' +
          pluseAttachTitle +
          "</label>" + //class="custom-file-upload"
          '<input ' + checkFilePurpose + ' type="file" accept="' +
          acceptedExtensions +
          '" hidden multiple="multiple" placeholder="' +
          pluseAttachTitle +
          '" class="form-control SPIField" id="' +
          fileId +
          '" >' +
          '<label data-trans-choosefile id="chooseFile" for="' +
          fileId +
          '" class="Resources"></label>' +
          '<span id="file-chosen"><span data-trans-nofile id="nofile" class="Resources"></span></span>' +
          '<div class="AttErrorMsg attErrorMsg" style="display:none"><span data-trans-file class="Resources"></span><span class="notacceptedext"></span><span data-trans-notallowed class="Resources"></span></div>' +
          '<div class="attErrorMsg"><span data-trans-acceptedfiles class="Resources"></span><span class="acceptedfile"></span></div>' +
          '<div class="attErrorMsg"><span data-trans-fileSize class="Resources"></span></div>' +
          '<div class="col-md-6 CFIELD" data-groups="" style="visibility:hidden">' +
          '<label for="forattach">Attachments</label>' +
          "</div>" +
          "</div>"
        ).insertBefore($(this).parent());

        $("#" + fileId)
          .parent()
          .find(".acceptedfile")
          .append("" + acceptedExtensionsstr + ",");

        // pluseAttachCount = pluseAttachCount + 1;
        attachCount = attachCount + 1
        changeResources();
      });

      // '<div class="col-md-12 CFIELD ' + element.className + ' " ' + thistip + ' ' + hidestagesIDs + ' ' + editableBy + ' ' + showstagesIDs + '  ' + disablestagesIDs + '  ' + enablestagesIDs + '   ' + isWfhidestagesIDs + ' ' + requireOnWfTaskstagesIDs + ' ' + isWfshowstagesIDs + '  ' + isWfdisablestagesIDs + '  ' + isWfenablestagesIDs + '        data-groups="' + groups + '" style="display:' + element.display + '">' +
      //   '<label  class="attlabel" ' + element.validation + '>' + displayName + '</label>' + //class="custom-file-upload"
      //   '<input ' + ToggleName + ' type="file" accept="' + acceptedExtensions + '" hidden multiple="multiple" placeholder="' + displayName + '" ' + dynamic + ' class="form-control SPIField" id="' + attachmentId + '" ' + element.state + ' ' + element.validation + '>' +
      //   '<label data-trans-choosefile id="chooseFile" for="' + attachmentId + '" class="Resources"></label>' +
      //   '<span id="file-chosen"><span data-trans-nofile id="nofile" class="Resources"></span></span>' +
      //   '<div class="AttErrorMsg attErrorMsg"><span data-trans-file class="Resources"></span><span class="notacceptedext"></span><span data-trans-notallowed class="Resources"></span></div>' +
      //   '<div class="attErrorMsg"><span data-trans-acceptedfiles class="Resources"></span><span class="acceptedfile"></span></div>' +
      //   '<div class="attErrorMsg"><span data-trans-fileSize class="Resources"></span></div>' +
      //   '<div class="inputInfo ' + isexist + '">' + descPhrase + '</div>' +
      //   '</div>';
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // $('.add-New-Attach').click(function () {
      //   $(
      //     '<div class="col-md-12 CFIELD ' + element.className + ' " ' + thistip + ' ' + hidestagesIDs + ' ' + showstagesIDs + '  ' + disablestagesIDs + '  ' + enablestagesIDs + '   ' + isWfhidestagesIDs + ' ' + requireOnWfTaskstagesIDs + ' ' + isWfshowstagesIDs + '  ' + isWfdisablestagesIDs + '  ' + isWfenablestagesIDs + '        data-groups="' + groups + '" style="display:' + element.display + '">' +
      //     '<label  class="attlabel" ' + element.validation + '>' + displayName + '</label>' + //class="custom-file-upload"
      //     '<input type="file" accept="' + acceptedExtensions + '" hidden multiple="multiple" placeholder="' + displayName + '" ' + dynamic + ' class="form-control SPIField" id="' + attachmentId + '" ' + element.state + ' ' + element.validation + '>' +
      //     '<label data-trans-choosefile id="chooseFile" for="' + attachmentId + '" class="Resources"></label>' +
      //     '<span id="file-chosen"><span data-trans-nofile id="nofile" class="Resources"></span></span>' +
      //     '<div class="AttErrorMsg attErrorMsg"><span data-trans-file class="Resources"></span><span class="notacceptedext"></span><span data-trans-notallowed class="Resources"></span></div>' +
      //     '<div class="attErrorMsg"><span data-trans-acceptedfiles class="Resources"></span><span class="acceptedfile"></span></div>' +
      //     '<div class="attErrorMsg"><span data-trans-fileSize class="Resources"></span></div>' +
      //     '<div class="inputInfo ' + isexist + '">' + descPhrase + '</div>' +
      //     '</div>'
      //   ).insertBefore($(this).parent());
      //   // if( stagename != "بناء طلب تقديم العروض" )
      //   //   $('.rfpoptions').remove();
      // });
    },
    budgetitem: function () {
      $("#From, #To").on("change", function () {
        var yearFrom = $("#From").val() ? $("#From").val().split("-")[0] : "",
          dateFromFull = $("#From").val(),
          yearTo = $("#To").val() ? $("#To").val().split("-")[0] : "";
        var yearDiff = yearTo ? parseInt(yearTo) - parseInt(yearFrom) + 1 : "";
        yearFrom = parseInt(yearFrom) + 4;
        if (yearFrom) {
          $("#To")
            .attr("max", String(yearFrom) + "-12-31")
            .attr("min", dateFromFull)
            .prop("disabled", false);
          if (yearDiff) {
            $("[id^=Cost]").parent().hide();
            $("[id^=Cost]").val("");
            $("#Amount").val("");
            var yeartodisp;
            for (var i = 1; i <= yearDiff; i++) {
              yeartodisp = yearFrom - 5 + i;
              $("#Cost" + i)
                .parent()
                .show();
              if (
                localStorage.getItem("lng") == null ||
                localStorage.getItem("lng") == "ar"
              ) {
                var label =
                  $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text()
                    .indexOf("لعام") > -1
                    ? $("#Cost" + i)
                      .parent()
                      .find("label")
                      .text()
                      .split("لعام")[0] +
                    " لعام " +
                    yeartodisp
                    : $("#Cost" + i)
                      .parent()
                      .find("label")
                      .text() +
                    " لعام " +
                    yeartodisp;
              } else {
                var label =
                  $("#Cost" + i)
                    .parent()
                    .find("label")
                    .text()
                    .indexOf("For Year") > -1
                    ? $("#Cost" + i)
                      .parent()
                      .find("label")
                      .text()
                      .split("For Year")[0] +
                    " For Year " +
                    yeartodisp
                    : $("#Cost" + i)
                      .parent()
                      .find("label")
                      .text() +
                    " For Year " +
                    yeartodisp;
              }
              $("#Cost" + i)
                .parent()
                .find("label")
                .text(label);
            }
          }
        } else {
          $("#To")
            .val("")
            .attr("max", "")
            .attr("min", "")
            .prop("disabled", true);
          $("[id^=Cost]").parent().hide();
          $("[id^=Cost]").val("");
          $("#Amount").val("");
        }
      });
    },
    // InvoicesTotal: function () {
    //   // $('#Amount, #TVA').on("change", function () {
    //   //   var amount = $('#Amount').val() ? parseInt(($('#Amount').val()).replaceAll(',', '')) : 0;
    //   //   var TVA = $('#TVA').val() ? parseInt(($('#TVA').val()).replaceAll(',', '')) : 0;
    //   //   var Sum = amount + ((TVA * amount) / 100);
    //   //   $('#TotalAmount').val(Sum);
    //   // });
    //   $("#TotalAmount").on("change", function () {
    //     var totalAmount = $("#TotalAmount").val()
    //       ? parseInt($("#TotalAmount").val().replaceAll(",", ""))
    //       : 0;
    //     var amount = Number((totalAmount / 1.15).toFixed("2"));
    //     var tax = Number((totalAmount - amount).toFixed("2"));

    //     $("#Amount").val(amount);
    //     $("#TVA").val(tax);

    //     // var TVA = $('#TVA').val() ? parseInt(($('#TVA').val()).replaceAll(',', '')) : 0;
    //     // var Sum = amount + ((TVA * amount) / 100);
    //     // $('#TotalAmount').val(Sum);
    //   });
    // },
    DeliverablesDelivered: function () {
      var Delivered = $("#Delivered:checked").val();
      if (Delivered == "yes") {
        $("#DeliveredDate").attr("required", "required");
        $("#DeliveredDate").parent().attr("required", "required");
        $("#DeliveredDate").prev("label").attr("required", "required");
      }
      $(".radioLabelField").change(function () {
        var Delivered = $("#Delivered:checked").val();
        if (Delivered == "yes") {
          $("#DeliveredDate").attr("disabled", false);
          $("#DeliveredDate").attr("required", "required");
          $("#DeliveredDate").parent().attr("required", "required");
          $("#DeliveredDate").prev("label").attr("required", "required");
        } else {
          $("#DeliveredDate").val("");
          $("#DeliveredDate").attr("disabled", true);
          $("#DeliveredDate").removeAttr("required");
          $("#DeliveredDate").parent().removeAttr("required");
          $("#DeliveredDate").prev("label").removeAttr("required");
        }
      });
    },
    requiredSpillarsName: function () {
      var PillarsExist = $("#PillarsExist:checked").val();
      // console.log(Delivered, "ddddddddddddd")

      if (PillarsExist == "yes") {
        $('[data-target_list="SPillars"] #Name').attr("required", "required");
        $('[data-target_list="SPillars"] #Name')
          .parent()
          .attr("required", "required");
        $('[data-target_list="SPillars"] #Name')
          .prev("label")
          .attr("required", "required");
      } else {
        $('[data-target_list="SPillars"] #Name').prop("required", false);
      }
      $("input#PillarsExist").on("change", function () {
        var PillarsExist = $("#PillarsExist:checked").val();
        if (PillarsExist == "yes") {
          $('[data-target_list="SPillars"] #Name').attr("required", "required");
          $('[data-target_list="SPillars"] #Name')
            .parent()
            .attr("required", "required");
          $('[data-target_list="SPillars"] #Name')
            .prev("label")
            .attr("required", "required");
        } else {
          $('[data-target_list="SPillars"] #Name').prop("required", false);
        }
      });
    },

    toggleFields: function ($this) {
      if (isView) {
        console.log('enter in view');
        var myValue = $this.data("viewtogglevalue");
      } else {
        var myValue = $this.val();
      }

      var mytype = $this,
        toggleValues =
          $this.data("togglevalues").indexOf(":::") > -1
            ? $this.data("togglevalues").split(":::")
            : [$this.data("togglevalues")],
        toggleValues = toggleValues.filter(function (t) {
          return t.indexOf(myValue + "[") > -1;
        }),
        toggleFields =
          toggleValues.length > 0
            ? toggleValues[0].match(/\[(.*?)\]/)[1].split(",")
            : "",
        isShowVal = toggleValues.length > 0,
        allToggleFields =
          $this.data("togglevalues").indexOf(":::") > -1
            ? $this.data("togglevalues").split(":::")
            : [$this.data("togglevalues")],
        myToggleFields = "";

      allToggleFields.forEach((item, i, arr) => {
        myToggleFields +=
          i == arr.length - 1
            ? item.match(/\[(.*?)\]/)[1]
            : item.match(/\[(.*?)\]/)[1] + ",";
      });
      allToggleFields = myToggleFields.split(",");

      if (isShowVal) {
        allToggleFields.forEach((item, i, arr) => {

          $('[data-togglename="' + item + '"]')
            .parent().addClass("hide-field")


          $('[data-togglename="' + item + '"]')
            .parent()
            .hide();
          // $('[data-togglename="' + item + '"]').val("");
          $('[data-togglename="' + item + '"]')
            .parent()
            .find(">*")
            .attr("required", false);
        });
        toggleFields.forEach(function (item, i, arr) {
          var isHidden = $('[data-togglename="' + item + '"]')
            .parent()
            .is(":hidden"),
            myFieldParent = $('[data-togglename="' + item + '"]').parent();
          myFieldParentofParent = $('[data-togglename="' + item + '"]');
          if (isHidden) {

            myFieldParent.show();
            myFieldParent.removeClass("hide-field")
            myFieldParentofParent.show();
            myFieldParent.find(">*").attr("required", true);

            //make toggle fields not required
            if (listkey == "mainkpi") {
              if (
                item == "RelatedMainKpis" ||
                item == "RelatedMainObjective" ||
                item == "Portfolio"
              ) {
                myFieldParent.find(">*").attr("required", false);
              }
            }
            if (listkey == "initiatives") {
              if (item == "RelatedStrategyObjective") {
                myFieldParent.find(">*").attr("required", false);
              }
            }
            if (listkey == "projects") {
              if (item == "RelatedInitiativeDeliverable") {
                myFieldParent.find(">*").attr("required", false);
              }
            }
            if (listkey == "achievements") {
              if (item == "RelatedKPI") {
                myFieldParent.find(">*").attr("required", false);
              }
            }
            // if (listkey == "sos") {
            //   if (item == "RelatedPortfolio" || item == "RelatedObjective") {
            //     myFieldParent.find(">*").attr("required", false);
            //   }
            // }
            //
          }
        });
      } else {

        allToggleFields.forEach((item, i, arr) => {



          $('[data-togglename="' + item + '"]')
            .parent()
            .addClass("hide-field");

          $('[data-togglename="' + item + '"]')
            .parent()
            .hide();



          $('[data-togglename="' + item + '"]').val("");
          $('[data-togglename="' + item + '"]')
            .parent()
            .find(">*")
            .attr("required", false);
        });

      }

    },
    toggleRequiredFields: function ($this) {
      var myValue = $this.val();

      var toggleRequiredValues =
        $this.data("requiredvalues").indexOf(":::") > -1
          ? $this.data("requiredvalues").split(":::")
          : [$this.data("requiredvalues")],
        toggleRequiredValues = toggleRequiredValues.filter(function (t) {
          return t.indexOf(myValue + "[") > -1;
        }),
        toggleRequiredFields =
          toggleRequiredValues.length > 0
            ? toggleRequiredValues[0].match(/\[(.*?)\]/)[1].split(",")
            : "",
        isShowVal = toggleRequiredValues.length > 0,
        allToggleRequiredFields =
          $this.data("requiredvalues").indexOf(":::") > -1
            ? $this.data("requiredvalues").split(":::")
            : [$this.data("requiredvalues")],
        myToggleRequiredFields = "";
      allToggleRequiredFields.forEach((item, i, arr) => {
        myToggleRequiredFields +=
          i == arr.length - 1
            ? item.match(/\[(.*?)\]/)[1]
            : item.match(/\[(.*?)\]/)[1] + ",";
      });
      allToggleRequiredFields = myToggleRequiredFields.split(",");

      if (isShowVal) {
        allToggleRequiredFields.forEach((item, i, arr) => {
          $('[data-requiredname="' + item + '"]')
            .parent()
            .find(">*")
            .attr("required", false);
        });

        toggleRequiredFields.forEach(function (item, i, arr) {
          myFieldParent = $('[data-requiredname="' + item + '"]').parent();
          myFieldParent.find(">*").attr("required", true);
        });
      } else {
        allToggleRequiredFields.forEach((item, i, arr) => {
          $('[data-requiredname="' + item + '"]')
            .parent()
            .find(">*")
            .attr("required", false);
        });
      }

      console.log(
        allToggleRequiredFields,
        "allToggleRequiredFields allToggleRequiredFields"
      );
    },
    toggleDisabledFields: function ($this) {
      var myValue = $this.val();

      var toggleDisabledValues =
        $this.data("toggledisabledvalues").indexOf(":::") > -1
          ? $this.data("toggledisabledvalues").split(":::")
          : [$this.data("toggledisabledvalues")],
        toggleDisabledValues = toggleDisabledValues.filter(function (t) {
          return t.indexOf(myValue + "[") > -1;
        }),
        toggleDisabledFields =
          toggleDisabledValues.length > 0
            ? toggleDisabledValues[0].match(/\[(.*?)\]/)[1].split(",")
            : "",
        isShowVal = toggleDisabledValues.length > 0,
        allToggleDisabledFields =
          $this.data("toggledisabledvalues").indexOf(":::") > -1
            ? $this.data("toggledisabledvalues").split(":::")
            : [$this.data("toggledisabledvalues")],
        myToggleDisabledFields = "";
      allToggleDisabledFields.forEach((item, i, arr) => {
        myToggleDisabledFields +=
          i == arr.length - 1
            ? item.match(/\[(.*?)\]/)[1]
            : item.match(/\[(.*?)\]/)[1] + ",";
      });
      allToggleDisabledFields = myToggleDisabledFields.split(",");


      if (isShowVal) {
        allToggleDisabledFields.forEach((item, i, arr) => {
          $('[data-toggledisabledname="' + item + '"]')
            .parent()
            .find(">*")
            .attr("disabled", false);
        });

        toggleDisabledFields.forEach(function (item, i, arr) {
          myFieldParent = $('[data-toggledisabledname="' + item + '"]').parent();
          myFieldParent.find(">*").attr("disabled", true);
        });
      } else {
        allToggleDisabledFields.forEach((item, i, arr) => {
          $('[data-toggledisabledname="' + item + '"]')
            .parent()
            .find(">*")
            .attr("disabled", false);
        });
      }

    },
    // showFieldsIfInitiativeVision: function () {
    //   var typeValue = $("#Types option:selected").val();

    //   if (typeValue == "vision") {
    //     $("#RelatedBudgetItem").parent().css("display", "block");
    //   } else {
    //     $("#RelatedBudgetItem").parent().css("display", "none");
    //   }
    //   if (isNew) {
    //     // if (isEPMO) {
    //     //   $("#Types").val("strategically");
    //     //   $("#Types").prop("disabled", true);
    //     // }
    //     $("#Types").on("change", function () {
    //       var typeValueafterchange = $("#Types option:selected").val();
    //       if (typeValueafterchange == "vision") {
    //         $("#RelatedBudgetItem").parent().css("display", "block");
    //       } else {
    //         $("#RelatedBudgetItem").parent().css("display", "none");
    //       }
    //     });
    //   }
    //   if (isEdit) {
    //     // if (isEPMO) {
    //     //   // $('#Types').val('strategically');
    //     //   $("#Types").prop("disabled", true);
    //     // }
    //     $("#Types").on("change", function () {
    //       var typeValueafterchange = $("#Types option:selected").val();
    //       if (typeValueafterchange == "vision") {
    //         $("#RelatedBudgetItem").parent().css("display", "block");
    //       } else {
    //         $("#RelatedBudgetItem").parent().css("display", "none");
    //       }
    //     });
    //   }
    //   // commented to can show the fields when use strategy type of initiative
    //   // if (typeValue == "vision") {
    //   //   $("#RelatedBudgetItem , #ProgramTotalCost")
    //   //     .parent()
    //   //     .css("display", "block");
    //   // } else {
    //   //   $("#RelatedBudgetItem , #ProgramTotalCost").parent().css("display", "none");
    //   // }
    //   // if (isNew || isEdit) {

    //   //   $("#Types").on("change", function () {
    //   //     var typeValueafterchange = $("#Types option:selected").val();
    //   //     if (typeValueafterchange == "vision") {
    //   //       $("#RelatedBudgetItem , #ProgramTotalCost")
    //   //         .parent()
    //   //         .css("display", "block");
    //   //     } else {
    //   //       $("#RelatedBudgetItem , #ProgramTotalCost")
    //   //         .parent()
    //   //         .css("display", "none");
    //   //     }
    //   //   });
    //   // }
    // },
  },
  roleQuery: async function (fieldsConditionConfig) {
    let whereBody = ``,
      queryBody = ``,
      whereBodyFinal = ``;
    //dynamic query building
    await Promise.all(
      fieldsConditionConfig.map(async (el, i, a) => {
        //Two choices
        if (fieldsConditionConfig.length == 1) {
          if (el.type == "LoggedInUser") {
            whereBody += `<And><Eq><FieldRef Name="${el.field}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And>`;
          } else {
            whereBody += `<And><In><FieldRef Name="${el.field}"/><Values>`;
            for (var j = 0; j < el.values.length; j++) {
              whereBody += `<Value Type="${el.type}">${el.values[j]}</Value>`;
            }
            whereBody += `</Values></In><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></And>`;
          }
        }
        //More than two choices
        else if (fieldsConditionConfig.length > 1) {
          //two Eqs in last And
          if (i == fieldsConditionConfig.length - 1) {
            if (el.type == "LoggedInUser") {
              whereBody += `<And><Eq><FieldRef Name="${el.field}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>`;
            } else {
              whereBody += `<And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq>`;
              whereBody += `<In><FieldRef Name="${el.field}"/><Values>`;
              for (var j = 0; j < el.values.length; j++) {
                whereBody += `<Value Type="${el.type}">${el.values[j]}</Value>`;
              }
              whereBody += `</Values></In>`;
            }

            //appending And closure
            var count = (whereBody.match(/<And>/g) || []).length;
            var ANDC = `</And>`.repeat(count);
            whereBody += ANDC;
          }
          //normal And
          else {
            if (el.type == "LoggedInUser") {
              whereBody += `<And><Eq><FieldRef Name="${el.field}" LookupId="TRUE" /><Value Type="Integer"><UserID /></Value></Eq>`;
            } else {
              whereBody += `<And><In><FieldRef Name="${el.field}"/><Values>`;
              for (var j = 0; j < el.values.length; j++) {
                whereBody += `<Value Type="${el.type}">${el.values[j]}</Value>`;
              }
              whereBody += `</Values></In>`;
            }
          }
        }
        //Finish Line, make last changes and build query
        if (i == fieldsConditionConfig.length - 1) {
          whereBody = whereBody.replaceAll(
            `Type="date"`,
            `IncludeTimeValue="TRUE" Type="DateTime"`
          );
          whereBodyFinal = `<Where>${whereBody}
          </Where>`;
          queryBody = `<View>
            <Query>
            ${whereBodyFinal}
            <OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy>
            </Query>
          </View>`;
          console.log(`query for dropdown menu`, queryBody);
        }
      })
    );
    return queryBody;
  },
};
// for view
window.View_ListInfo = {
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".container-body").length) {
      //username
      $(".navbar .user-name").text(
        UserN.Title.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu).join("")
      );
      $(".user-name-full").text(UserN.Title);
      clearInterval(checkStatusHtml);
      //get form's json
      $.getScript(
        "" +
        _spPageContextInfo.webAbsoluteUrl +
        "/Style%20Library/spm/JSON/" +
        listkey +
        "/" +
        JSON_File_Name
      ).done(function (script, textStatus) {
        isPrint = Information_Form[0].isPrint
          ? Information_Form[0].isPrint
          : false;
        SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
          View_ListInfo.InfoLoop();
        });
      });
    }
  },
  InfoLoop: function () {

    var htmlBuilder = isWF
      ? '<div class="section1 approvalHeader col-12"><div class="d-flex justify-content-between w-100"><div class=""><span class="bold Resources" data-trans-' +
      USERlistkey +
      '></span>' + ' ' + '<span class="mx-3 wf-project-name"></span></div><div class=""><span class="bold Resources" data-trans-taskname></span><span class="mx-3 wf-task-name"></span></div></div></div><h2 class="approvalHeader Resources" data-trans-taskformtitle>النموذج المعتمد</h2>'
      : "";

    var Label, Description;
    var printHtml = "";

    var toggleSectionName;

    asyncFor.seqProcess(
      Information_Form,
      function (item, index, resolve) {
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          Label = item.label;
        } else {
          Label = item.labelEn;
        }
        // console.log('Start processing ' + Label + ' subFields...');
        //Handle security
        var groups = [],
          targetList = "",
          sectionType = "",
          rendersection = true;
        if (item.hasOwnProperty("security")) {
          if (item.security.groups.length > 0) {
            for (var z = 0; z < item.security.groups.length; z++) {
              groups.push(item.security.groups[z]); //.replace(/\s/g, '')
              if (Groups.indexOf(item.security.groups[z]) == -1) {
                rendersection = false;
              } else {
                rendersection = true;
                break; // to save all groups in data-groups to can open and close the fields
              }
            }
            groups = groups.join(" ");
          }
        }
        if (item.hasOwnProperty("sectiontype")) {
          //both attr should be available
          targetList = 'data-target_list="' + item.targetlist + '"';
          sectionType = 'data-section_type="' + item.sectiontype + '"';
        }
        //print
        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          Label = item.label;
          Description = item.description;
          printDate = "التاريخ : ";
        } else {
          Label = item.labelEn;
          Description = item.descriptionEn;
          printDate = "Date : ";
        }

        // to handle the workflowSetValues
        var workflowSetValues = [], dataWorkflowSetValues = "";

        workflowSetValues = item.workflowSetValues

        if (workflowSetValues && workflowSetValues.length) {
          dataWorkflowSetValues = 'data-workflowSetValue="' +
            JSON.stringify(workflowSetValues).replaceAll(
              `"`,
              `'`
            ) +
            '"'
        } else {
          dataWorkflowSetValues = ""
        }
        //


        toggleSectionName = item.togglename

        var printFooter = "";
        var printBody = "";

        if (item.sectiontype == "master") {
          item.subFields.forEach((el) => {
            if (
              localStorage.getItem("lng") == null ||
              localStorage.getItem("lng") == "ar"
            ) {
              printFooter += `
                        <div class="CFIELD" data-groups="" style="display:block;min-width:100%;padding:10px 0px">
                        <label class="col-md-3" style="font-weight:bold" for="${el.InternalName}">
                       ${el.DisplayName}
                        </label>
                        <p type="${el.type}" class="col-md-9 viewmode-value print-field" id="${el.InternalName}" style="border-bottom:1px solid #ccc"></p></div>
                        `;
            } else {
              printFooter += `
                        <div class="CFIELD" data-groups="" style="display:block;min-width:100%;padding:10px 0px">
                        <label class="col-md-3" style="font-weight:bold" for="${el.InternalName}">
                       ${el.DisplayNameEn}
                        </label>
                        <p type="${el.type}" class="col-md-9 viewmode-value print-field" id="${el.InternalName}" style="border-bottom:1px solid #ccc"></p></div>
                        `;
            }
          });
        } else {
          item.subFields.forEach((el) => {
            if (
              localStorage.getItem("lng") == null ||
              localStorage.getItem("lng") == "ar"
            ) {
              printBody += `<div style="display:block;padding:20px 0px" class="CFIELD">
                        <label class="col-md-2 printTitle" for=${el.InternalName
                }>${el.DisplayName}</label>
                        <p class="col-md-9 viewmode-value print-field" style="border-bottom:1px solid #ccc;white-space:pre-line"  type=${el.type == "datetime" ? "date" : el.type
                } id="${el.InternalName}"></p>
                    </div>
                    `;
            } else {
              printBody += `<div style="display:block;padding:20px 0px" class="CFIELD">
                        <label class="col-md-2 printTitle" for=${el.InternalName}>${el.DisplayNameEn}</label>
                        <p class="col-md-9 viewmode-value print-field" style="border-bottom:1px solid #ccc;white-space:pre-line"  type=${el.type} id="${el.InternalName}"></p>
                    </div>
                    `;
            }
          });
        }

        if (item.sectiontype == "master") {
          console.log(Label, "Label Label");
          printHtml += `<div class="py-5 border-bottom section-container ViewPrint_Form printFooterContainer page-avoid" ${targetList} ' ' ${sectionType} ' data-groups="${groups}" style="display:none">
                              <p class="printDescription">${Description
              ? Label + " | " + Description
              : Label
            }</p>
                              <div class="col-md-11 p-4 fieldset-container">
                              ${printFooter}
                              </div>
                          </div>
                          `;
        } else {
          printHtml += `<div class="py-5 border-bottom section-container ViewPrint_Form printBodyContainer page-avoid" ${targetList} ' ' ${sectionType} ' data-groups="${groups}" style="display:none">
                              <p class="printDescription">${Description
              ? Label + " | " + Description
              : Label
            }</p>
                              <div>
                              ${printBody}
                              </div>
                          </div>`;
        }

        htmlBuilder +=
          '<div class="py-5 border-bottom section-container View_Form ' +
          listkey +
          ' " ' +
          targetList +
          " " +
          sectionType +
          ' data-groups="' +
          groups +
          '">' +
          '<div class="form-row">' +
          '<div class="col-lg-3 col-md-4 mb-4">' +
          "<h3 class='sideTitle'>" +
          Label +
          "</h3>" +
          '<span class="font-14">' +
          Description +
          "</span>" +
          "</div>" +
          '<div data-togglename=' + toggleSectionName + ' ' + dataWorkflowSetValues + ' class="col-lg-9 col-md-8 white-box p-4 fieldset-container">';
        asyncFor.seqProcess(
          item.subFields,
          function (subitemField, indexField, resolveField) {
            View_ListInfo.RenderForm(
              subitemField,
              null,
              function (flag, htmlResult) {
                resolveField(subitemField, indexField, {
                  htmlResult: htmlResult,
                });
              }
            );
          },
          function (subitemField, indexField, dataField, isDoneField) {
            htmlBuilder += dataField.htmlResult;
            if (isDoneField) {
              resolve(item, index, dataField, true);
            }
          }
        );

        // }, 400);
      },
      function (item, index, data, isDone) {
        // console.log("before html builder before html builder before html builder before html builder")

        if (
          localStorage.getItem("lng") == null ||
          localStorage.getItem("lng") == "ar"
        ) {
          Label = item.label;
          if (btnDeleteLabel == undefined) {
            btnDeleteLabel = Resources["ar"].deletebutton;
          }
        } else {
          Label = item.labelEn;
          if (btnDeleteLabel == undefined) {
            btnDeleteLabel = Resources["en"].deletebutton;
          }
        }
        // console.log('Finishing label ' + Label + ' - IsDone: ' + isDone);
        htmlBuilder += "</div></div></div>";
        if (isDone) {
          actionTaskHeader = "";
          if (isWF) {
            actionTaskHeader =
              '<h2 class="approvalHeader Resources mb-5" data-trans-taskDecision>	القرار</h2>';
          }
          htmlBuilder +=
            '<div class="py-5 btnactionrow">' +
            actionTaskHeader +
            '<div class="leftBtns">' +
            '<button data-trans-toissue class="btn btn-action btn-to-issue Resources" type="button"></button>' +
            '<button class="btn btn-action btn-delete" type="button">' +
            btnDeleteLabel +
            "</button>" +
            "</div>" +
            '<div class="form-row rightBtns justify-content-end form-btns-wrapper">' +
            '<button data-trans-CancelButton class="btn btn-action btn-cancel Resources" type="button"></button>' +
            '<button  data-trans-EditButton class="btn btn-action btn-save Resources" type="button"></button>' +
            "</div>" +
            "</div>";
          //$('.project-Title-Name').text(PageTitle);
          $(".container-body").html(htmlBuilder);
          if (isPrint) $(".container-body").append(printHtml);
          $(".hide-section").hide();

          //handle master details
          $(".breakLine").before('<div class="col-md-12"></div>');
          if ($("[data-section_type]").length > 0) {
            $("[data-section_type]").each(function () {
              $(this)
                .find(".fieldset-container > .CFIELD")
                .wrapAll('<div class="Details-Item"></div>');
              MasterDetailsArrayRequest.push($(this).attr("data-target_list"));
            });
            MasterDetailsArrayRequest = Array.from(
              new Set(MasterDetailsArrayRequest)
            ); //remove duplicates
            MasterDetailsArrayNew = MasterDetailsArrayRequest;
            MasterDetailsArrayEdit = MasterDetailsArrayRequest;
            // console.log(MasterDetailsArrayRequest);
          }

          $("h2.DahsFormTitle").append(
            '<button data-trans-EditButton type="button" id="editup" class="CSformSubmit Resources" style="float:right"></button>'
          );
          // $('.title-item').text('تفاصيل');
          SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
            View_Data_Request.init();
            if (SP_ListName == "Projects" && IID) {
              GetProject_Info.init();
            } else {
              GetCurrentStage_Info.init();
            }
          });
          // added for CR module
          if (isCrMode) {
            CrModeFunctionality.preinit();
          } else {
            $(
              "div#particles-foreground, div#particles-background, .vertical-centered-box"
            ).animate(
              {
                opacity: 0,
              },
              {
                duration: 333,
                complete: function () {
                  $(
                    "div#particles-foreground, div#particles-background, .vertical-centered-box"
                  ).remove();

                  // $('div#particles-foreground, div#particles-background, .vertical-centered-box').hide();
                },
              }
            );
          }
          // ended

          //handle new style of wf
          if (isWF) {
            $(".FormContainer").addClass("wf-mode");
            $("#navbarsParent").addClass("wfMode");
            $(".page-nav").attr("style", "display: none !important");
            $(".sidebar").attr("style", "display: none !important");
            $(".main-panel").attr("style", "width: 100% !important");
            //getTaskHistory.init();
            Get_TaskHistory.init()
          }
          //

          $(
            "div#particles-foreground, div#particles-background, .vertical-centered-box"
          ).animate(
            {
              opacity: 0,
            },
            {
              duration: 333,
              complete: function () {
                $(
                  "div#particles-foreground, div#particles-background, .vertical-centered-box"
                ).remove();

                // $('div#particles-foreground, div#particles-background, .vertical-centered-box').hide();
              },
            }
          );
          if (listkey == "risks") {
            //move to issue
            $(".btn-to-issue").show();
            Risk_To_Issue_Submit.g.toissueClick();
          }
          if (isView && listkey == "ideas") {
            window.Idea_Info.init();
          }
          if (
            (isView && USERisWF) ||
            (USERisWF && currentStage && currentStage == "S42")
          ) {
            $(".btnactionrow").hide();
          }

          // print
          var printPtn = "";
          if (isPrint) {
            printPtn +=
              '<div class = "printBtnContainer">' +
              '<a data-trans-printscreen class="btn-add  Resources" type="button" onclick="Print_Data.print()"></a>' +
              "</div>";
            $(".btnactionrow").after(printPtn);
          }
          changeResources();
        }
      }
    );
  },
  RenderForm: function (element, flag, OnSuccess) {
    //
    var htmlBody = "";
    var groups = [],
      thistip = "",
      hidestagesIDs = "",
      showstagesIDs = "",
      disablestagesIDs = "",
      enablestagesIDs = "",
      requireOnWfTaskstagesIDs = "",
      isWfhidestagesIDs = "",
      isWfshowstagesIDs = "",
      isWfdisablestagesIDs = "",
      isWfenablestagesIDs = "",
      renderfield = true,
      dontSubmit = element.hasOwnProperty("dontSubmit") ? "dont-submit" : "", // to avoid err on view
      dontSubmitRequired = element.hasOwnProperty("dontSubmitRequired") ? "dont-submit even-required" : "",
      dontRequest = element.hasOwnProperty("dontRequest") ? "dont-request" : "", // to avoid err on view
      toggleValues = "",
      ToggleName = element.hasOwnProperty("ToggleName") ? "data-togglename=" + element.ToggleName : "",
      toggleDisabledName = element.hasOwnProperty("ToggleDisabledName") ? "data-toggledisabledname=" + element.ToggleDisabledName : "";


    if (element.hasOwnProperty("security")) {
      if (element.security.groups.length > 0) {
        for (var z = 0; z < element.security.groups.length; z++) {
          groups.push(element.security.groups[z]); //.replace(/\s/g, '')
          if (Groups.indexOf(element.security.groups[z]) == -1) {
            renderfield = false;
          } else {
            renderfield = true;
            break; // to save all groups in data-groups to can open and close the fields
          }
        }
        groups = groups.join(" ");
      }
    }

    if (element.hasOwnProperty("requireOnWfTaskStage") && USERisWF) {
      isWfhidestagesIDs =
        'data-isWfrequirestageID="' + element.requireOnWfTaskStage;
    }

    if (element.hasOwnProperty("hideOnWfTaskStage") && USERisWF) {
      isWfhidestagesIDs = 'data-isWfhidestageID="' + element.hideOnWfTaskStage;
    }
    if (element.hasOwnProperty("showOnWfTaskStage") && USERisWF) {
      isWfshowstagesIDs = 'data-isWfshowstageID="' + element.showOnWfTaskStage;
    }
    if (element.hasOwnProperty("disableOnWfTaskStage") && USERisWF) {
      isWfdisablestagesIDs =
        'data-isWfdisablestageID="' + element.disableOnWfTaskStage;
    }
    if (element.hasOwnProperty("enableOnWfTaskStage") && USERisWF) {
      isWfenablestagesIDs =
        'data-isWfenablestageID="' + element.enableOnWfTaskStage;
    }

    if (element.hasOwnProperty("hideonstage") && !USERisWF) {
      hidestagesIDs = 'data-hidestageID="' + element.hideonstage;
    }
    if (element.hasOwnProperty("showonstage") && !USERisWF) {
      showstagesIDs = 'data-showstageID="' + element.showonstage;
    }
    if (element.hasOwnProperty("disableonstage") && !USERisWF) {
      disablestagesIDs = 'data-disablestageID="' + element.disableonstage;
    }
    if (element.hasOwnProperty("enableonstage") && !USERisWF) {
      enablestagesIDs = 'data-enablestageID="' + element.enableonstage;
    }
    if (element.hasOwnProperty("toggleValues")) {
      element.toggleValues.forEach(function (item, i, arr) {
        var seperator = i == arr.length - 1 ? '"' : ":::";
        toggleValues +=
          i == 0
            ? 'data-toggleValues="' +
            item.value +
            "[" +
            item.fields.join(",") +
            "]" +
            seperator
            : item.value + "[" + item.fields.join(",") + "]" + seperator;
      });
    }
    if (element.tooltip == undefined) {
      thistip = "";
    } else {
      thistip = 'data-tip="' + element.tooltip + '"';
    }

    var descPhrase;
    if (
      localStorage.getItem("lng") == null ||
      localStorage.getItem("lng") == "ar"
    ) {
      displayName = element.DisplayName;
      descPhrase = element.descPhraseAr;
    } else {
      displayName = element.DisplayNameEn;
      descPhrase = element.descPhraseEn;
    }

    if (localStorage.getItem("lng") == "en" && element.DispfieldkeyEn) {
      dispfieldkey = element.DispfieldkeyEn;
    } else dispfieldkey = element.Dispfieldkey;

    if (renderfield) {
      switch (element.type) {
        case "string":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.addClass +
            '" ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="text" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;
        case "yearInput":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            editableBy +
            " " +
            showstagesIDs +
            " " +
            disablestagesIDs +
            " " +
            enablestagesIDs +
            " " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            " " +
            isWfdisablestagesIDs +
            " " +
            isWfenablestagesIDs +
            ' data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            "<input " +
            ToggleName +
            " " +
            toggleDisabledName +
            ' type="number" data-manipulates="year" min="1900" max="2099" step="1" maxdata="' +
            element.max +
            '" mindata="' +
            element.min +
            '" placeholder="' +
            displayName +
            '" ' +
            dynamic +
            ' class="form-control SPIField" id="' +
            element.InternalName +
            '" ' +
            element.state +
            " " +
            element.validation +
            ">" +
            '<div class="inputInfo ' +
            isexist +
            '">' +
            descPhrase +
            "</div>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;
        case "number":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="number" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "multiselectstring":
          htmlBody =
            '<div class="col-md-6 CFIELD" ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '    data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="multiselect" data-listname="' +
            element.source +
            '" data-valfieldkey="' +
            element.valfieldkey +
            '" data-Dispfieldkey="' +
            dispfieldkey +
            '" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;
        case "formula":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.addClass +
            '" ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="text" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName
          '" style="direction: ltr !important;"></p>' +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "code":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="text" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "floattax":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="number" class="viewmode-value tax" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            " " +
            toggleDisabledName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "float":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="number" class="viewmode-value number" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "phonenumber": // ksa phone number validation
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="number" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            " " +
            toggleDisabledName +
            "></p>" +
            "</div>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "floatwithoutformatting":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="number" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "floatpercentage":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="number" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "percentbyrelatedparent":

          var code = activeCode;

          if (code) {
            var customQuery =
              '<View><Query><Where><Eq><FieldRef Name="Title" /><Value Type="Text">' +
              code +
              "</Value></Eq></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query><RowLimit>1</RowLimit></View>";

            sphttp.get(
              _spPageContextInfo.siteServerRelativeUrl,
              element.listname,
              customQuery,
              [element.parentinternalname],
              function (records, record, listItem, isDone) {
                if (isDone) {

                  var parentValue = "";
                  records.forEach(function (el, index) {
                    parentValue = el[element.parentinternalname];
                  });

                  console.log(parentValue, "PARENT VALUE");
                  htmlBody =
                    '<div class="col-md-6 CFIELD ' +
                    dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
                    " " +
                    element.className +
                    ' " ' +
                    thistip +
                    " " +
                    hidestagesIDs +
                    " " +
                    showstagesIDs +
                    "  " +
                    disablestagesIDs +
                    "  " +
                    enablestagesIDs +
                    "   " +
                    isWfhidestagesIDs +
                    " " +
                    requireOnWfTaskstagesIDs +
                    " " +
                    isWfshowstagesIDs +
                    "  " +
                    isWfdisablestagesIDs +
                    "  " +
                    isWfenablestagesIDs +
                    '        data-groups="' +
                    groups +
                    '" style="display:' +
                    element.display +
                    '">' +
                    '<label for="' +
                    element.InternalName +
                    '" ' +
                    element.validation +
                    ">" +
                    displayName +
                    "</label>" +
                    '<p type="number" class="viewmode-value"   data-parentval="' +
                    parentValue +
                    '"  id="' +
                    element.InternalName +
                    '" ' +
                    ToggleName +
                    " " +
                    toggleDisabledName +
                    "></p>" +
                    "</div>";
                  OnSuccess(flag, htmlBody);
                }
              }
            );
          }
          break;

        case "decimalpercentage":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="number" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;
        case "percentage":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="percentage" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "datetime":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="date" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;
        case "datetimetoparent":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="date" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            " " +
            toggleDisabledName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "datewithtime":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="date" class="viewmode-value withTime" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            '</div><div class="col-md-6 CFIELDTime">' +
            '<label data-trans-datetime class="Resources"></label>' +
            '<p type="time" class="viewmode-value" id="time" ></p>' +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "picker":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="picker" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "multipicker":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="multipicker" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "dropdown":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '  data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="dropdown" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "dropdownValues":


          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            "<p " +
            toggleValues +
            ' type="dropdown"  data-viewtogglevalue="" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            " ></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "radio":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="radio" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "yesnoradio":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="radio" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "checkbox":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="checkbox" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;
        case "lookuptoparentchild":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '"  style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="lookuptoparentchild" data-listname="' +
            element.source +
            '" data-valfieldkey="' +
            element.valfieldkey +
            '" data-dispfieldkey="' +
            element.Dispfieldkey +
            '" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            " " +
            toggleDisabledName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "lookup":
          ///////////////////////////////////////////////
          if (element.BIlanguage == true) {
            if (
              localStorage.getItem("lng") == null ||
              localStorage.getItem("lng") == "ar"
            ) {
              dispfieldkey = element.Dispfieldkey;
            } else {
              dispfieldkey = element.DispfieldkeyEn;
            }
          }

          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '"  style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            " " +
            `${element.showlink ? "<span><a class='elementLink' href='javascript:' target='_blank'><i class='fas fa-external-link-alt'></i></a></span>" : ""}` +
            "</label>" +
            '<p type="lookup" data-listname="' +
            element.source +
            '" data-valfieldkey="' +
            element.valfieldkey +
            '" data-Dispfieldkey="' +
            dispfieldkey + //data-parentrelatedkeylvl1 > to get the target element,data-parentrelatedvaluelvl1 > to save the value of parent like sector,data-parentrelatedfilterkeylvl1 >> to show the value on this column in list
            '" data-parentrelatedkeylvl1=' +
            element.fieldsinformlvl1 + // to handle the dont submit field in view lvl1
            ' data-parentrelatedvaluelvl1="" data-parentrelatedfilterkeylvl1=' +
            element.sourcefieldlvl1 +
            ' data-parentrelatedkeylvl2=' +
            element.fieldsinformlvl2 + // change from dynamic to fieldsinformlvl1
            ' data-parentrelatedvaluelvl2="" data-parentrelatedfilterkeylvl2=' +
            element.sourcefieldlvl2 +
            ' class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            ' data-linkedto="' + element.linkedto + '"></p>' +
            "</div>";
          OnSuccess(flag, htmlBody);
          ///////////////////////////////////////////////
          break;
        case "lookupWithQuery":
          htmlBody =
            '<div class="col-md-6 CFIELD" ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '    data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            " " +
            `${element.showlink ? "<span><a class='elementLink' href='javascript:' target='_blank'><i class='fas fa-external-link-alt'></i></a></span>" : ""}` +
            "</label>" +
            '<p type="lookup" data-listname="' +
            element.source +
            '" data-valfieldkey="' +
            element.valfieldkey +
            '" data-Dispfieldkey="' +
            element.Dispfieldkey +
            '" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            ' data-linkedto="' + element.linkedto + '"></p>' +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "lookupmultiselectwithoutrepeat":

          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="multiselect" class="viewmode-value" data-valfieldkey="' + element.valfieldkey + '" data-dispfieldkey="' + element.Dispfieldkey + '" data-listname="' + element.source + '" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;


        case "lookupmultiselect":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            // " " +
            // `${element.showlink ? "<span><a class='elementLink' href='javascript:' target='_blank'><i class='fas fa-external-link-alt'></i></a></span>" : ""}` +
            "</label>" +
            '<p type="multiselect" class="viewmode-value" data-valfieldkey="' + element.valfieldkey + '" data-dispfieldkey="' + element.Dispfieldkey + '" data-listname="' + element.source + '" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            'data-parentrelatedkeylvl1="' + element.fieldsinformlvl1 + '" data-parentrelatedvaluelvl1="" data-parentrelatedfilterkeylvl1="' +
            element.sourcefieldlvl1
            + '" data-parentrelatedkeylvl2="' + element.fieldsinformlvl2 + '" data-parentrelatedvaluelvl2="" data-parentrelatedfilterkeylvl2="' + element.sourcefieldlvl2 + '" data-linkedto="' + element.linkedto + '"></p>' +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "lookupchildtoparentmultiselect":

          var fieldTargetList = "";
          var fieldmasterkey = ""
          if (element.fieldtargetlist && element.fieldtargetlist != "undefined") {

            fieldTargetList = `data-fieldTargetList=${element.fieldtargetlist}`
            fieldmasterkey = `data-fieldmasterkey=${element.fieldmasterkey}`
          }

          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            // " " +
            // `${element.showlink ? "<span><a class='elementLink' href='javascript:' target='_blank'><i class='fas fa-external-link-alt'></i></a></span>" : ""}` +
            "</label>" +
            '<p type="multiselect" class="viewmode-value" data-valfieldkey="' + element.valfieldkey + '" data-dispfieldkey="' + element.Dispfieldkey + '" data-listname="' + element.source + '" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            'data-parentrelatedkeylvl1="' + element.fieldsinformlvl1 + '" data-parentrelatedvaluelvl1="" data-parentrelatedfilterkeylvl1="' +
            element.sourcefieldlvl1
            + '" data-parentrelatedkeylvl2="' + element.fieldsinformlvl2 + '" data-parentrelatedvaluelvl2="" data-parentrelatedfilterkeylvl2="' + element.sourcefieldlvl2 + '" data-linkedto="' + element.linkedto + '" ' + fieldTargetList + " " + fieldmasterkey + '></p>' +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;
        case "multiselect":
          htmlBody =
            '<div class="col-md-6 CFIELD ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '        data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="multiselect" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "multiline":
          htmlBody =
            '<div class="col-md-6 CFIELD multiline" ' +
            dontSubmit + " " + dontRequest + " " + dontSubmitRequired + " " +
            " " +
            thistip +
            ' data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            '<label for="' +
            element.InternalName +
            '" ' +
            element.validation +
            ">" +
            displayName +
            "</label>" +
            '<p type="text" class="viewmode-value" id="' +
            element.InternalName +
            '" ' +
            ToggleName +
            "></p>" +
            "</div>";
          OnSuccess(flag, htmlBody);
          break;

        case "breakline":
          htmlBody = '<div class="col-md-12"></div>';
          OnSuccess(flag, htmlBody);
          break;
        case "anchor":

          htmlBody =
            '<div class="col-md-3 CFIELD ' +
            element.className +
            ' " ' +
            thistip +
            " " +
            hidestagesIDs +
            " " +
            editableBy +
            " " +
            showstagesIDs +
            "  " +
            disablestagesIDs +
            "  " +
            enablestagesIDs +
            "   " +
            isWfhidestagesIDs +
            " " +
            requireOnWfTaskstagesIDs +
            " " +
            isWfshowstagesIDs +
            "  " +
            isWfdisablestagesIDs +
            "  " +
            isWfenablestagesIDs +
            '       data-groups="' +
            groups +
            '" style="display:' +
            element.display +
            '">' +
            "<a " +
            ToggleName +
            ' href="' + element.href + '" ' +
            dynamic +
            ' class="formLink" id="' +
            element.InternalName +
            '" ' +
            element.state +
            " " +
            element.validation +
            " target='_blank'>" +
            displayName +
            '<i class="icon-plus"></i>' +
            "</a>" +
            "</div>";
          // htmlBody = '<div class="col-md-12"></div>';
          OnSuccess(flag, htmlBody);
          break;

        case "file":
          htmlBody = "";
          OnSuccess(flag, htmlBody);
          break;
      }
      //return htmlBody;
    } else {
      OnSuccess(flag, htmlBody);
    }
  },
  g: {
    htmlText: "",
    htmlElement: "",
  },
};
//dynamic fields that change data
var Dynamic_Data_Request = {
  onSuccess: function (sender, args) {
    $("[dynamic=" + Dynamic_Data_Request.g.dyfieldname + "]").each(function () {

      switch ($(this).attr("type")) {
        case "date":
          var d =
            oListItem.get_item("" + $(this).attr("id") + "") == null
              ? "empty"
              : oListItem.get_item("" + $(this).attr("id") + "");
          if (d != "empty") {
            var local = d.getTime();
            var offset = d.getTimezoneOffset() * (60 * 1000);
            var utc = new Date(local + offset);
            var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
            var datetouse = riyadh
              .toLocaleString("en-US")
              .split(",")[0]
              .split("/");
            datetouse[0] =
              datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
            datetouse[1] =
              datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
            var datetouse2 =
              datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];
          }
          $(this).val(datetouse2);
          break;

        case "datetime-local":
          var d =
            oListItem.get_item("" + $(this).attr("id") + "") == null
              ? "empty"
              : oListItem.get_item("" + $(this).attr("id") + "");
          if (d != "empty") {
            var local = d.getTime();
            var offset = d.getTimezoneOffset() * (60 * 1000);
            var utc = new Date(local + offset);
            var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
            var datetouse = riyadh
              .toLocaleString("en-US")
              .split(",")[0]
              .split("/");
            datetouse[0] =
              datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
            datetouse[1] =
              datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
            var datetouse2 =
              datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];
          }
          $(this).val(datetouse2);
          break;
        case "picker":
          var pemail =
            oListItem.get_item("" + $(this).attr("id") + "") == null
              ? "ادخل الإسم أو البريد الإلكتروني ..."
              : oListItem
                .get_item("" + $(this).attr("id") + "")
                .get_lookupValue();
          $(this).attr("data-email", pemail);
          var idinternal = $(this).attr("id");
          var mp = new MyPeoplePicker();
          mp.init($(this).attr("id"), {
            AllowMultipleValues: false,
          });
          break;
        case "multipicker":
          var pemail =
            oListItem.get_item("" + $(this).attr("id") + "") == null
              ? "ادخل الإسم أو البريد الإلكتروني ..."
              : oListItem
                .get_item("" + $(this).attr("id") + "")
                .get_lookupValue();
          $(this).attr("data-email", pemail);
          var idinternal = $(this).attr("id");
          var mp = new MyPeoplePicker();
          mp.init($(this).attr("id"), {
            AllowMultipleValues: true,
          });
          break;

        case "dropdown":
          $(this).val(oListItem.get_item("" + $(this).attr("id") + ""));
          break;

        case "radio":
          $('input[id="' + $(this).attr("id") + '"]')
            .filter('[value="' + oListItem.get_item($(this).attr("id")) + '"]')
            .attr("checked", true);
          break;

        case "checkbox":
          if (oListItem.get_item($(this).attr("id")))
            $(this).prop("checked", true);
          break;

        case "multiselect":
          if (oListItem.get_item($(this).attr("myfield"))) {
            var myselections = oListItem
              .get_item($(this).attr("myfield"))
              .split(":::");
            for (var i = 0; i < myselections.length; i++) {
              $(this)
                .find("input:checkbox[value='" + myselections[i] + "']")
                .prop("checked", true);
            }
          }
          break;

        case "number":
        case "float":
          if ($(this).hasClass("percentagefield")) {
            var num = oListItem.get_item($(this).attr("id")) * 100;
            if (num % 1 != 0)
              $(this).val(parseFloat(Math.round(num * 100) / 100).toFixed(2));
            else $(this).val(num);
          } else {
            $(this).val(oListItem.get_item("" + $(this).attr("id") + ""));
            var valFromList = oListItem.get_item("" + $(this).attr("id") + "") || ""

            // disable enable master details section on projects depends on Amount
            if (valFromList) {
              if (listkey == 'projects') {
                $("[data-target_list=Deliverables] .fieldset-container").removeClass("disable_section")
                $("[data-target_list=Milestones] .fieldset-container").removeClass("disable_section")
              }
            } else {
              if (listkey == 'projects') {
                $("[data-target_list=Deliverables] .fieldset-container").addClass("disable_section")
                $("[data-target_list=Milestones] .fieldset-container").addClass("disable_section")
              }
            }
          }
          break;

        default:
          $(this).val(oListItem.get_item("" + $(this).attr("id") + ""));
          break;
      }
    });
    if (
      listkey == "projects" &&
      Dynamic_Data_Request.g.dyfieldname == "BudgetItem"
    ) {
      var From = Dynamic_Data_Request.g.convertdate(oListItem.get_item("From")),
        To = Dynamic_Data_Request.g.convertdate(oListItem.get_item("To"));
      // console.log(From, To);
      var yearFrom = From ? From.split("-")[0] : "",
        dateFromFull = From,
        yearTo = To ? To.split("-")[0] : "";
      var yearDiff = yearTo ? parseInt(yearTo) - parseInt(yearFrom) + 1 : "";
      yearFrom = parseInt(yearFrom) + 2;
      if (yearDiff) {
        $("[id^=Cost]").parent().hide();
        var yeartodisp;
        for (var i = 1; i <= yearDiff; i++) {
          yeartodisp = yearFrom - 3 + i;
          $("#Cost" + i)
            .parent()
            .show();
          if (
            localStorage.getItem("lng") == null ||
            localStorage.getItem("lng") == "ar"
          ) {
            var label =
              $("#Cost" + i)
                .parent()
                .find("label")
                .text()
                .indexOf("لعام") > -1
                ? $("#Cost" + i)
                  .parent()
                  .find("label")
                  .text()
                  .split("لعام")[0] +
                " لعام " +
                yeartodisp
                : $("#Cost" + i)
                  .parent()
                  .find("label")
                  .text() +
                " لعام " +
                yeartodisp;
          } else {
            var label =
              $("#Cost" + i)
                .parent()
                .find("label")
                .text()
                .indexOf("For Year") > -1
                ? $("#Cost" + i)
                  .parent()
                  .find("label")
                  .text()
                  .split("For Year")[0] +
                " For Year " +
                yeartodisp
                : $("#Cost" + i)
                  .parent()
                  .find("label")
                  .text() +
                " For Year " +
                yeartodisp;
          }
          $("#Cost" + i)
            .parent()
            .find("label")
            .text(label);
        }
      }
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // The main Initialization function
  init: function (dylistname, dyitemid, dyfieldname) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(dylistname);
    Dynamic_Data_Request.g.oListItem = oList.getItemById(dyitemid); //declared inside object scope only
    Dynamic_Data_Request.g.dyfieldname = dyfieldname;
    oListItem = Dynamic_Data_Request.g.oListItem;
    clientContext.load(Dynamic_Data_Request.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Dynamic_Data_Request.onSuccess),
      Function.createDelegate(this, Dynamic_Data_Request.onError)
    );
  },
  // Global variables
  g: {
    convertdate: function (d) {
      if (d) {
        var local = d.getTime();
        var offset = d.getTimezoneOffset() * (60 * 1000);
        var utc = new Date(local + offset);
        var riyadh = new Date(utc.getTime() + 3 * 60 * 60 * 1000);
        var datetouse = riyadh.toLocaleString("en-US").split(",")[0].split("/");
        datetouse[0] =
          datetouse[0].length == 1 ? "0" + datetouse[0] : datetouse[0];
        datetouse[1] =
          datetouse[1].length == 1 ? "0" + datetouse[1] : datetouse[1];
        var datetouse2 = datetouse[2] + "-" + datetouse[0] + "-" + datetouse[1];
        d = datetouse2;
      }
      return d;
    },
  },
};
dynamicAffectSelect = {
  // The main Initialization function
  // The main Initialization function
  init: function (affectedSelectsInfo) {


    // if (affectedSelectsInfo.length) {

    var queryFieldValue = affectedSelectsInfo[0].queryFieldValue
      ? affectedSelectsInfo[0].queryFieldValue
      : "";
    var queryFieldName = affectedSelectsInfo[0].queryFieldName
      ? affectedSelectsInfo[0].queryFieldName
      : "";
    var queryFieldType = affectedSelectsInfo[0].queryFieldType
      ? affectedSelectsInfo[0].queryFieldType
      : "";


    console.log(affectedSelectsInfo, "affectedSelectsInfo")

    // var dataSeblingValue = affectedSelectsInfo[0].dataSiblingvalue
    // ? affectedSelectsInfo[0].dataSiblingvalue
    // : "";

    // console.log(dataSeblingValue,"dataSeblingValue dataSeblingValue")

    // queryFieldValue="sublevel3"
    // queryFieldName="Types"
    // queryFieldType="Text"

    dynamicAffectSelect.g.affectedSelectsInfo = affectedSelectsInfo;
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle(affectedSelectsInfo[0].listName);
    var camlQuery = new SP.CamlQuery();

    var Query = "";
    var valueToFilter = affectedSelectsInfo[0].customFilterValue
      ? affectedSelectsInfo[0].customFilterValue
      : affectedSelectsInfo[0].parentFieldValue;

    if (affectedSelectsInfo[0].parentCustomFilterValueFromSibling && affectedSelectsInfo[0].parentCustomFilterValueFromSibling != undefined) {
      queryFieldValue = affectedSelectsInfo[0].parentCustomFilterValueFromSibling
    }


    if (listkey == 'initiatives' && valueToFilter && valueToFilter == 'strategically') { // specially for trategically value
      valueToFilter = 'ministry' // becuse there is a value we use it in GoalStrategy list
    }

    if (
      affectedSelectsInfo[0].isCustomFilterValue === "true" &&
      !affectedSelectsInfo[0].customFilterValue
    ) {
      Query = `<View><Query>
        <Where>
          <Neq><FieldRef Name="DeletionStatus" /><Value Type="Text">Deleted</Value></Neq>
          </Where>
        <OrderBy><FieldRef Name="Created" Ascending="True"/></OrderBy></Query></View>`;
    } else if (
      queryFieldValue &&
      queryFieldValue != "undefined" &&
      queryFieldName &&
      queryFieldName != "undefined" &&
      queryFieldType &&
      queryFieldType != "undefined"
    ) {
      Query = `<View><Query>
        <Where><And>
        <Neq><FieldRef Name="DeletionStatus" /><Value Type="Text">Deleted</Value></Neq>
        <And>
        <Eq><FieldRef Name="${affectedSelectsInfo[0].filterField}"/><Value Type="${affectedSelectsInfo[0].filterFieldType}">${valueToFilter}</Value></Eq>
        <Eq><FieldRef Name="${queryFieldName}" /><Value Type="${queryFieldType}">${queryFieldValue}</Value></Eq></Eq>
        </And></And></Where>
        <OrderBy><FieldRef Name="Created" Ascending="True"/></OrderBy></Query></View>`;
    } else {
      Query = `<View><Query>
        <Where><And>
          <Neq><FieldRef Name="DeletionStatus" /><Value Type="Text">Deleted</Value></Neq>
          <Eq><FieldRef Name="${affectedSelectsInfo[0].filterField}"/><Value Type="${affectedSelectsInfo[0].filterFieldType}">${valueToFilter}</Value></Eq>
        </And></Where>
        <OrderBy><FieldRef Name="Created" Ascending="True"/></OrderBy></Query></View>`;
    }



    camlQuery.set_viewXml(Query);

    dynamicAffectSelect.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(dynamicAffectSelect.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, dynamicAffectSelect.onSuccess),
      Function.createDelegate(this, dynamicAffectSelect.onError)
    );
    // }
  },
  onSuccess: function (sender, args) {
    var collListItem = dynamicAffectSelect.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    let affectedSelectsInfo = dynamicAffectSelect.g.affectedSelectsInfo[0];


    var targetFieldType = ''
    if (affectedSelectsInfo && affectedSelectsInfo != "undefined") {
      targetFieldType = $(`#${affectedSelectsInfo.affectedFieldName}`).attr("type");
    }



    let selectedVal = ""
    let optionsBody = ""


    var getSiblingsValues = []

    if (affectedSelectsInfo && affectedSelectsInfo != "undefined") {

      $(`#${affectedSelectsInfo.affectedFieldName} > option`).each(function () {
        var optionId = $(this).attr("option-id")
        var arraysiblingsVal = $(this).attr("data-arraysiblingvalues")
        if (arraysiblingsVal && arraysiblingsVal != 'undefined') {
          getSiblingsValues.push({ "id": optionId, 'arraySiblings': arraysiblingsVal })
        }
      })
    }

    if (targetFieldType == 'multiselect') {

      selectedVal = $(`ul#${affectedSelectsInfo.affectedFieldName} ul.dropdown-menu`)
        .find("input:checked")
        .map(function () {
          //getting selected choices
          return $(this).val();
        })
        .get();

      $(`ul#${affectedSelectsInfo.affectedFieldName} ul.dropdown-menu`).html("");




    } else {
      // selectedVal = $(`select#${affectedSelectsInfo.affectedFieldName}`).attr("value"); // get selected val to use it in edit

      // to filter the value in cr
      if (listkey == "changerequest") {
        selectedVal = $(`select#${affectedSelectsInfo.affectedFieldName}`).val(); // get selected val to use it in edit
      } else {
        selectedVal = $(`select#${affectedSelectsInfo.affectedFieldName}`).attr("value"); // get selected val to use it in edit
      }

      $(`select#${affectedSelectsInfo.affectedFieldName}`).html("");

      optionsBody = '<option class="Resources" value="" selected="" disabled=""></option>'; // to not choose the first value in dropdown
    }






    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();


      let dispfieldkey = oListItem.get_item(
        `${affectedSelectsInfo.dispFieldKey}`
      );
      let valfieldkey = oListItem.get_item(
        `${affectedSelectsInfo.valFieldKey}`
      );
      if (dispfieldkey && dispfieldkey.length > 100) {
        var optionText = dispfieldkey.substr(0, 100) + "...";
      } else {
        var optionText = dispfieldkey;
      }



      if (targetFieldType == "multiselect") {
        optionsBody +=
          `<label class="grp-select">${valfieldkey}</label>
        <li>
        <div class="checkbox">
        <label>
          <input value="${valfieldkey}" id="${affectedSelectsInfo.affectedFieldName}" type="checkbox">
          ${dispfieldkey}
        </label>
        </div>
        </li>
        `
      } else {
        if (getSiblingsValues.length) {
          getSiblingsValues.forEach(el => {
            if (el.id == oListItem.get_id()) {
              optionsBody +=
                '<option data-arraysiblingvalues=' + el.arraySiblings + ' option-id="' +
                oListItem.get_id() +
                '" value="' +
                valfieldkey +
                '">' +
                optionText +
                "</option>";
            }
          })
        } else {
          optionsBody +=
            '<option option-id="' +
            oListItem.get_id() +
            '" value="' +
            valfieldkey +
            '">' +
            optionText +
            "</option>";
        }
      }
    }


    if (targetFieldType == "multiselect") {


      $(`ul#${affectedSelectsInfo.affectedFieldName} ul.dropdown-menu`).html(optionsBody)
      $(`ul#${affectedSelectsInfo.affectedFieldName} ul.dropdown-menu li`).each(function () {

        var liInputValue = $(this).find("input").val()

        if (selectedVal.includes(liInputValue)) {
          $(this).find("input").attr("checked", true);
        }


      })

    } else {
      $(`select#${affectedSelectsInfo.affectedFieldName}`).html(optionsBody);

      $(`select#${affectedSelectsInfo.affectedFieldName}`).val(selectedVal);

    }



    dynamicAffectSelect.g.affectedSelectsInfo =
      dynamicAffectSelect.g.affectedSelectsInfo.shift();
    dynamicAffectSelect.g.affectedSelectsInfo.length &&
      dynamicAffectSelect.init(dynamicAffectSelect.g.affectedSelectsInfo);
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },

  // Global variables
  g: {
    PhasesArray: [],
  },
};
//phases-stages
Phases_Data_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Phases_Data_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Phases_Data_Request.g.PhasesArray.push({
        phase: oListItem.get_item("Title"),
      });
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Phases");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><OrderBy><FieldRef Name='ListSort' Ascending='True' /></OrderBy></Query></View>"
    );
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
  },
};
window.Stages_Data_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Stages_Data_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Stages_Data_Request.g.StagesArray.push({
        phase: oListItem.get_item("RelatedPhase"),
        stage: oListItem.get_item("Title"),
      });
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Stages");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='Enabled'/><Value Type='Integer'>1</Value></Eq></And></Where><OrderBy><FieldRef Name='ListSort' Ascending='True' /></OrderBy></Query></View>"
    );
    Stages_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Stages_Data_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Stages_Data_Request.onSuccess),
      Function.createDelegate(this, Stages_Data_Request.onError)
    );
  },
  // Global variables
  g: {
    StagesArray: [],
  },
};
//end phases-stages
// window.Initiative_Stages_Data_Request = {
//   onSuccess: function (sender, args) {
//     var collListItem = Initiative_Stages_Data_Request.g.collListItem;
//     var listItemEnum = collListItem.getEnumerator();
//     while (listItemEnum.moveNext()) {
//       var oListItem = listItemEnum.get_current();
//       //   var strategyType = oListItem.get_item('Types') ? oListItem.get_item('Types') : ''
//       //   pillersExist = oListItem.get_item('PillarsExist') ? oListItem.get_item('PillarsExist') : ''
//       //   strategyId = oListItem.get_id()

//       //   $('#RelatedStrategyType').val(strategyType)
//       //   if (listkey == 'sos') {
//       //     $('#RelatedStrategyPillars').val(pillersExist)
//       //   }
//       // }
//       // if (pillersExist === "Yes" || pillersExist == "yes") {
//       //   $('#PillarName').parent().css('display', 'block')
//       //   Get_Pillers_Info.init(strategyId)
//       // } else {
//       //   if (listkey == 'sos') {
//       //     $('#PillarName').parent().css('display', 'none')
//       //   }
//       Initiative_Stages_Data_Request.g.StagesArray.push({
//         phase: oListItem.get_item("RelatedPhase"),
//         stage: oListItem.get_item("Title"),
//       });
//     }
//   },
//   onError: function (sender, args) {
//     console.log(
//       "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
//     );
//   },
//   init: function () {
//     var clientContext = new SP.ClientContext.get_current();
//     var oList = clientContext.get_web().get_lists().getByTitle("IStages");
//     var camlQuery = new SP.CamlQuery();
//     camlQuery.set_viewXml(
//       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='Enabled'/><Value Type='Integer'>1</Value></Eq></And></Where><OrderBy><FieldRef Name='ListSort' Ascending='True' /></OrderBy></Query></View>"
//     );
//     Initiative_Stages_Data_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
//     clientContext.load(Initiative_Stages_Data_Request.g.collListItem);
//     clientContext.executeQueryAsync(
//       Function.createDelegate(this, Initiative_Stages_Data_Request.onSuccess),
//       Function.createDelegate(this, Initiative_Stages_Data_Request.onError)
//     );
//   },
//   // Global variables
//   g: {
//     StagesArray: [],
//   },
// };

//stages initiative request

//end initiative stages request

//get sectors for PCODE
var Sectors_Info = {
  onSuccess: function (sender, args) {
    Sectors_Info.g.SectorArray = [];
    var collListItem = Sectors_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Sectors_Info.g.SectorArray.push(oListItem.get_item("Title"));
    }
    if (listkey == "initiatives") {
      GetSector_Info.init("Initiatives");
    } else if (listkey == "sos") {
      GetSector_Info.init("SOs");
    } else {
      Projects_Info.init();
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("Internal Entities");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query></Query></View>");
    Sectors_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Sectors_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Sectors_Info.onSuccess),
      Function.createDelegate(this, Sectors_Info.onError)
    );
  },
  // Global variables
  g: {
    SectorArray: [],
  },
};

var GetSector_Info = {
  onSuccess: function (sender, args) {

    var collListItem = GetSector_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      GetSector_Info.g.PSectorArray.push(oListItem.get_item("Sector"));
    }
    window.Sector_Occurrence = []; //for easy debuging
    var countOccurrences = (arr, val) =>
      arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    for (var i = 0; i < Sectors_Info.g.SectorArray.length; i++) {
      var sectorcount = countOccurrences(
        Projects_Info.g.PSectorArray,
        Sectors_Info.g.SectorArray[i]
      );
      Sector_Occurrence.push({
        sector: Sectors_Info.g.SectorArray[i],
        count: sectorcount,
      });
    }

    var year = String(new Date().getFullYear()),
      sectorcode,
      occurence;
    year = year.slice(year.length - 2); //get last 2 characters
    $("select#Sector").change(function () {
      sectorcode = $(this).val();
      if (isNew) {
        occurence =
          countOccurrences(Projects_Info.g.PSectorArray, sectorcode) + 1;
        occurence = occurence < 10 ? "0" + occurence : occurence;
        // PCODE = sectorcode + "-" + year; //+'-'+(occurence) // add +'-'+IID on submission [line 163 in Form_Submit.js]
      }
      Department_Sector_Info.init(sectorcode); //in form_request.js
      // BudgetItem_Sector_Info.init(sectorcode); //in form_request.js removed for initiatives
    });
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  init: function (list) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(list);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query></Query></View>");
    GetSector_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(GetSector_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, GetSector_Info.onSuccess),
      Function.createDelegate(this, GetSector_Info.onError)
    );
  },
  g: {
    PSectorArray: [],
  },
};

var Projects_Info = {
  onSuccess: function (sender, args) {
    var collListItem = Projects_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      Projects_Info.g.PSectorArray.push(oListItem.get_item("Sector"));
    }
    window.Sector_Occurrence = []; //for easy debuging
    var countOccurrences = (arr, val) =>
      arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    for (var i = 0; i < Sectors_Info.g.SectorArray.length; i++) {
      var sectorcount = countOccurrences(
        Projects_Info.g.PSectorArray,
        Sectors_Info.g.SectorArray[i]
      );
      Sector_Occurrence.push({
        sector: Sectors_Info.g.SectorArray[i],
        count: sectorcount,
      });
    }
    var year = String(new Date().getFullYear()),
      sectorcode,
      occurence;
    year = year.slice(year.length - 2); //get last 2 characters
    $("select#Sector").change(function () {
      sectorcode = $(this).val();
      if (isNew) {
        occurence =
          countOccurrences(Projects_Info.g.PSectorArray, sectorcode) + 1;
        occurence = occurence < 10 ? "0" + occurence : occurence;
        // PCODE = sectorcode + "-" + year; //+'-'+(occurence) // move it to set code submit to can save the code correctly if the sector be auto generated
        // $('#Title').val(PCODE);
        // console.log(PCODE);
      }
      Department_Sector_Info.init(sectorcode); //in form_request.js
      BudgetItem_Sector_Info.init(sectorcode); //in form_request.js
    });
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle(ListArray[0].projects);
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml("<View><Query></Query></View>");
    Projects_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Projects_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Projects_Info.onSuccess),
      Function.createDelegate(this, Projects_Info.onError)
    );
  },
  // Global variables
  g: {
    PSectorArray: [],
  },
};
//end PCODE

// var GetProject_Info = {
//   onSuccess: function (sender, args) {
//     // if (listkey == "deliverables") {
//     //   deliverabePercent.init();
//     // }
//     var collListItem = GetProject_Info.g.collListItem;
//     var listItemEnum = collListItem.getEnumerator();
//     var PID, stage, ismultistage;
//     while (listItemEnum.moveNext()) {
//       var oListItem = listItemEnum.get_current();
//       PID = oListItem.get_id();
//       stage = oListItem.get_item("Stage");
//       if (stage) {
//         ismultistage = stage.indexOf(";") > -1;
//       }
//       if (ismultistage) {
//         stage = stage.split(";");
//       }
//     }
//     if (listkey == "projects" && IID) {
//       if (ismultistage) {
//         $.each(stage, function (index, value) {
//           if (!USERisWF) {
//             $(".CFIELD[data-hidestageID=" + value + "]").remove();
//             $(".CFIELD[data-showstageID=" + value + "]").show();
//             $(
//               ".CFIELD[data-disablestageID=" +
//               value +
//               "] input,.CFIELD[data-enablestageID=" +
//               value +
//               "] .PPField ,.CFIELD[data-disablestageID=" +
//               value +
//               "] select,.CFIELD[data-disablestageID=" +
//               value +
//               "] textarea"
//             ).attr("disabled", true);
//             $(
//               ".CFIELD[data-enablestageID=" +
//               value +
//               "] input,.CFIELD[data-enablestageID=" +
//               value +
//               "] .PPField ,.CFIELD[data-enablestageID=" +
//               value +
//               "] select,.CFIELD[data-enablestageID=" +
//               value +
//               "] textarea"
//             ).attr("disabled", false);
//           } else {
//             $(".CFIELD[data-isWfhidestageID=" + value + "]").remove();
//             $(".CFIELD[data-isWfshowstageID=" + value + "]").show();
//             $(
//               ".CFIELD[data-isWfdisablestageID=" +
//               value +
//               "] input,.CFIELD[data-isWfenablestageID=" +
//               value +
//               "] .PPField ,.CFIELD[data-isWfdisablestageID=" +
//               value +
//               "] select,.CFIELD[data-isWfdisablestageID=" +
//               value +
//               "] textarea"
//             ).attr("disabled", true);
//             $(
//               ".CFIELD[data-isWfenablestageID=" +
//               value +
//               "] input,.CFIELD[data-isWfenablestageID=" +
//               value +
//               "] .PPField ,.CFIELD[data-isWfenablestageID=" +
//               value +
//               "] select,.CFIELD[data-isWfenablestageID=" +
//               value +
//               "] textarea"
//             ).attr("disabled", false);
//             $("[data-isWfrequirestageID=" + value + "] label").attr({
//               required: true,
//             });
//             $(
//               "[data-isWfrequirestageID=" +
//               value +
//               "] input,[data-isWfrequirestageID=" +
//               value +
//               "] select,[data-isWfrequirestageID=" +
//               value +
//               "] textarea,[data-isWfrequirestageID=" +
//               value +
//               "] .PPField"
//             ).prop("required", true);
//           }
//         });
//       } else {
//         if (!USERisWF) {
//           $(".CFIELD[data-hidestageID=" + stage + "]").remove();
//           $(".CFIELD[data-showstageID=" + stage + "]").show();
//           $(
//             ".CFIELD[data-disablestageID=" +
//             stage +
//             "] input,.CFIELD[data-enablestageID=" +
//             stage +
//             "] .PPField ,.CFIELD[data-disablestageID=" +
//             stage +
//             "] select,.CFIELD[data-disablestageID=" +
//             stage +
//             "]"
//           ).attr("disabled", true);
//           $(
//             ".CFIELD[data-enablestageID=" +
//             stage +
//             "] input,.CFIELD[data-enablestageID=" +
//             stage +
//             "] .PPField ,.CFIELD[data-enablestageID=" +
//             stage +
//             "] select,.CFIELD[data-enablestageID=" +
//             stage +
//             "]"
//           ).attr("disabled", false);
//         } else {
//           $(".CFIELD[data-isWfhidestageID=" + stage + "]").remove();
//           $(".CFIELD[data-isWfshowstageID=" + stage + "]").show();
//           $(
//             ".CFIELD[data-isWfdisablestageID=" +
//             stage +
//             "] input,.CFIELD[data-isWfenablestageID=" +
//             stage +
//             "] .PPField ,.CFIELD[data-isWfdisablestageID=" +
//             stage +
//             "] select,.CFIELD[data-isWfdisablestageID=" +
//             stage +
//             "] textarea"
//           ).attr("disabled", true);
//           $(
//             ".CFIELD[data-isWfenablestageID=" +
//             stage +
//             "] input,.CFIELD[data-isWfenablestageID=" +
//             stage +
//             "] .PPField ,.CFIELD[data-isWfenablestageID=" +
//             stage +
//             "] select,.CFIELD[data-isWfenablestageID=" +
//             stage +
//             "] textarea"
//           ).attr("disabled", false);
//           $("[data-isWfrequirestageID=" + stage + "] label").attr({
//             required: true,
//           });
//           $(
//             "[data-isWfrequirestageID=" +
//             stage +
//             "] input,[data-isWfrequirestageID=" +
//             stage +
//             "] select,[data-isWfrequirestageID=" +
//             stage +
//             "] textarea,[data-isWfrequirestageID=" +
//             stage +
//             "] .PPField"
//           ).prop("required", true);
//         }
//       }
//     }
//     if (PCODE) {
//       $(".headtwo").append(
//         '<a class="" href="' +
//         _spPageContextInfo.webAbsoluteUrl +
//         '"><span class="litem">Home</span></a>' +
//         '<a class="" href="' +
//         _spPageContextInfo.webAbsoluteUrl +
//         "/SitePages/View.aspx?ListKey=projects&IID=" +
//         PID +
//         '"><span data-trans-projectdetails class="litem Resources"></span></a>' //+
//         //'<a class="" href="'+_spPageContextInfo.webAbsoluteUrl+'"><span class="litem">Project Phase</span></a>'+
//         //'<a class="" href="'+_spPageContextInfo.webAbsoluteUrl+'"><span class="litem">Project Report</span></a>'
//       );
//     }
//     // GetProject_Info.g.notificationappen();
//     // Risks_Info_Request.init();
//     // Issues_Info_Request.init();
//   },
//   onError: function (sender, args) {
//     console.log(
//       "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
//     );
//   },
//   // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
//   preinit: function () {
//     if ($(".ms-Icon--Settings").length) {
//       clearInterval(checkNotificationHTML);
//       SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
//         GetProject_Info.init();
//       });
//     }
//   },
//   // The main Initialization function
//   init: function () {
//     // console.log('asdf');
//     var clientContext = new SP.ClientContext.get_current();
//     var oList = clientContext
//       .get_web()
//       .get_lists()
//       .getByTitle(ListArray[0].projects);
//     var camlQuery = new SP.CamlQuery();
//     var PQUERY;
//     if (PCODE) {
//       PQUERY =
//         "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='Title'/><Value Type='Text'>" +
//         PCODE +
//         "</Value></Eq></And></Where></Query><RowLimit>1</RowLimit></View>";
//     } else if (listkey == "projects" && IID) {
//       PQUERY =
//         "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='ID'/><Value Type='Integer'>" +
//         IID +
//         "</Value></Eq></And></Where></Query><RowLimit>1</RowLimit></View>";
//     } else {
//       PQUERY =
//         "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query></View>";
//     }

//     camlQuery.set_viewXml(PQUERY);
//     GetProject_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
//     clientContext.load(GetProject_Info.g.collListItem);
//     clientContext.executeQueryAsync(
//       Function.createDelegate(this, GetProject_Info.onSuccess),
//       Function.createDelegate(this, GetProject_Info.onError)
//     );
//   },
//   // Global variables
//   g: {
//     notificationappen: function () {
//       if (PCODE) {
//         $("#O365_SearchBoxContainer_container").append(
//           '<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="0"></i><a href="' +
//           _spPageContextInfo.webAbsoluteUrl +
//           "/SitePages/Listing.aspx?ListKey=tasks&PCODE=" +
//           PCODE +
//           '">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="0"></i><a href="/sites/SPM/SitePages/Listing.aspx?ListKey=risks&PCODE=' +
//           PCODE +
//           '">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="0"></i><a href="' +
//           _spPageContextInfo.webAbsoluteUrl +
//           "/SitePages/Listing.aspx?ListKey=issues&PCODE=" +
//           PCODE +
//           '"">Issues</a></span></div><div class="UProfile"></div></div>'
//         );
//       } else {
//         $("#O365_SearchBoxContainer_container").append(
//           '<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="0"></i><a href="' +
//           _spPageContextInfo.webAbsoluteUrl +
//           '/SitePages/Listing.aspx?ListKey=tasks">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="0"></i><a href="' +
//           _spPageContextInfo.webAbsoluteUrl +
//           '/SitePages/Listing.aspx?ListKey=risks">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="0"></i><a href="' +
//           _spPageContextInfo.webAbsoluteUrl +
//           '/SitePages/Listing.aspx?ListKey=issues">Issues</a></span></div><div class="UProfile"></div></div>'
//         );
//       }
//     },
//   },
// };

var GetProject_Info = {
  onSuccess: function (sender, args) {
    var collListItem = GetProject_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var PID, stage, ismultistage;
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      PID = oListItem.get_id();
      stage = oListItem.get_item("Stage");
      if (stage) {
        ismultistage = stage.indexOf(";") > -1;
      }
      if (ismultistage) {
        stage = stage.split(";");
      }
    }
    // if (listkey == "projects" && IID) {
    if (ismultistage) {
      $.each(stage, function (index, value) {
        if (!USERisWF) {
          $(
            '.section-container [data-hidestageID*="allstages"], .section-container [data-hidestageID*=' +
            value +
            "]"
          ).each(function () {
            let tabId = $(this).parent().attr("id");
            $(`.form-tabs .nav-link[href="#${tabId}"]`).remove();
          });

          $('[data-hidestageID*="allstages"]').remove();

          $(".CFIELD[data-hidestageID=" + value + "]").remove();
          $(".CFIELD[data-showstageID=" + value + "]").show();

          $("[data-disablestageID]").each(function () {
            var stageofElement = $(this).attr("data-disablestageID");
            if (stageofElement.includes(value)) {
              $(this).children("input").attr("disabled", true);
              $(this).children("select").attr("disabled", true);
              $(this).children(".PPField").attr("disabled", true);
              $(this).children("textarea").attr("disabled", true);
            } else {
              $(this).children("input").attr("disabled", false);
              $(this).children("select").attr("disabled", false);
              $(this).children(".PPField").attr("disabled", false);
              $(this).children("textarea").attr("disabled", false);
            }
          });

          $("[data-enablestageID]").each(function () {
            var stageofElement = $(this).attr("data-enablestageID");
            if (stageofElement.includes(value)) {
              $(this).children("input").attr("disabled", false);
              $(this).children("select").attr("disabled", false);
              $(this).children(".PPField").attr("disabled", false);
              $(this).children("textarea").attr("disabled", false);
            } else {
              $(this).children("input").attr("disabled", true);
              $(this).children("select").attr("disabled", true);
              $(this).children(".PPField").attr("disabled", true);
              $(this).children("textarea").attr("disabled", true);
            }
          });
        } else {
          $(
            '.section-container [data-isWfhidestageID*="allstages"], .section-container [data-isWfhidestageID*=' + value + "]"
          ).each(function () {
            let tabId = $(this).parent().attr("id");
            $(`.form-tabs .nav-link[href="#${tabId}"]`).remove();
          });

          $(".CFIELD[data-isWfhidestageID=" + value + "]").remove();
          $(".CFIELD[data-isWfshowstageID=" + value + "]").show();

          $("[data-isWfdisablestageID]").each(function () {
            var stageofElement = $(this).attr("data-isWfdisablestageID");
            if (stageofElement.includes(value)) {
              $(this).children("input").attr("disabled", true);
              $(this).children("select").attr("disabled", true);
              $(this).children(".PPField").attr("disabled", true);
              $(this).children("textarea").attr("disabled", true);
            } else {
              $(this).children("input").attr("disabled", false);
              $(this).children("select").attr("disabled", false);
              $(this).children(".PPField").attr("disabled", false);
              $(this).children("textarea").attr("disabled", false);
            }
          });

          $("[data-isWfenablestageID]").each(function () {
            var stageofElement = $(this).attr("data-isWfenablestageID");
            if (stageofElement.includes(value)) {
              $(this).children("input").attr("disabled", false);
              $(this).children("select").attr("disabled", false);
              $(this).children(".PPField").attr("disabled", false);
              $(this).children("textarea").attr("disabled", false);
            } else {
              $(this).children("input").attr("disabled", true);
              $(this).children("select").attr("disabled", true);
              $(this).children(".PPField").attr("disabled", true);
              $(this).children("textarea").attr("disabled", true);
            }
          });

          $('.helpful-info-ctx [data-showstageID*="' + stage + '"]').show();
          $('.helpful-info-ctx [data-showstageID*="allstages"]').show();

          $("[data-isWfrequirestageID]").each(function () {
            var stageofElement = $(this).attr("data-isWfenablestageID");
            if (stageofElement.includes(stage)) {
              $(this).children("label").attr("required", true);
              $(this).children("input").attr("required", true);
              $(this).children("select").attr("required", true);
              $(this).children(".PPField").attr("required", true);
              $(this).children("textarea").attr("required", true);
            }
          })
        }
      });
    } else {
      if (!USERisWF) {

        $(`.section-container[data-hidestageID*="allstages"], .section-container[data-hidestageID*="${stage}"]`
        ).each(function () {
          let tabId = $(this).parent().attr("id");
          $(`.form-tabs .nav-link[href="#${tabId}"]`).remove();
        });

        $('[data-hidestageID*="allstages"]').remove();
        $('[data-hidestageID*="' + stage + '"]').remove();
        $('[data-showstageID*="' + stage + '"]').show();
        $('[data-showstageID*="allstages"]').show();

        $("[data-disablestageID]").each(function () {
          var stageofElement = $(this).attr("data-disablestageID");
          if (stageofElement.includes(stage)) {
            $(this).children("input").attr("disabled", true);
            $(this).children("select").attr("disabled", true);
            $(this).children(".PPField").attr("disabled", true);
            $(this).children("textarea").attr("disabled", true);
          } else {
            $(this).children("input").attr("disabled", false);
            $(this).children("select").attr("disabled", false);
            $(this).children(".PPField").attr("disabled", false);
            $(this).children("textarea").attr("disabled", false);
          }
        });

        $("[data-enablestageID]").each(function () {
          var stageofElement = $(this).attr("data-enablestageID");
          if (stageofElement.includes(stage)) {
            $(this).children("input").attr("disabled", false);
            $(this).children("select").attr("disabled", false);
            $(this).children(".PPField").attr("disabled", false);
            $(this).children("textarea").attr("disabled", false);
          } else {
            $(this).children("input").attr("disabled", true);
            $(this).children("select").attr("disabled", true);
            $(this).children(".PPField").attr("disabled", true);
            $(this).children("textarea").attr("disabled", true);
          }
        });
      } else {
        $(
          `.section-container[data-isWfhidestageID*="allstages"], .section-container[data-isWfhidestageID*="${stage}"]`
        ).each(function () {
          let tabId = $(this).parent().attr("id");
          $(`.form-tabs .nav-link[href="#${tabId}"]`).remove();
        });

        $("[data-isWfhidestageID*=" + stage + "]").remove();
        $("[data-isWfshowstageID*=" + stage + "]").show();

        $("[data-isWfdisablestageID]").each(function () {
          var stageofElement = $(this).attr("data-isWfdisablestageID");
          if (stageofElement.includes(stage)) {
            $(this).children("input").attr("disabled", true);
            $(this).children("select").attr("disabled", true);
            $(this).children(".PPField").attr("disabled", true);
            $(this).children("textarea").attr("disabled", true);
          } else {
            $(this).children("input").attr("disabled", false);
            $(this).children("select").attr("disabled", false);
            $(this).children(".PPField").attr("disabled", false);
            $(this).children("textarea").attr("disabled", false);
          }
        });

        $("[data-isWfenablestageID]").each(function () {
          var stageofElement = $(this).attr("data-isWfenablestageID");
          if (stageofElement.includes(stage)) {
            $(this).children("input").attr("disabled", false);
            $(this).children("select").attr("disabled", false);
            $(this).children(".PPField").attr("disabled", false);
            $(this).children("textarea").attr("disabled", false);
          } else {
            $(this).children("input").attr("disabled", true);
            $(this).children("select").attr("disabled", true);
            $(this).children(".PPField").attr("disabled", true);
            $(this).children("textarea").attr("disabled", true);
          }
        });


        $('.helpful-info-ctx [data-showstageID*="' + stage + '"]').show();
        $('.helpful-info-ctx [data-showstageID*="allstages"]').show();


        $("[data-isWfrequirestageID]").each(function () {
          var stageofElement = $(this).attr("data-isWfenablestageID");
          if (stageofElement.includes(stage)) {
            $(this).children("label").attr("required", true);
            $(this).children("input").attr("required", true);
            $(this).children("select").attr("required", true);
            $(this).children(".PPField").attr("required", true);
            $(this).children("textarea").attr("required", true);
          }
        })
      }
    }
    // }
    if (PCODE) {
      $(".headtwo").append(
        '<a class="" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        '"><span class="litem">Home</span></a>' +
        '<a class="" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/SitePages/View.aspx?ListKey=projects&IID=" +
        PID +
        '"><span data-trans-projectdetails class="litem Resources"></span></a>' //+
      );
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".ms-Icon--Settings").length) {
      clearInterval(checkNotificationHTML);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        GetProject_Info.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    // console.log('asdf');
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle(ListArray[0].projects);
    var camlQuery = new SP.CamlQuery();
    var PQUERY;
    if (PCODE) {
      PQUERY =
        "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='Title'/><Value Type='Text'>" +
        PCODE +
        "</Value></Eq></And></Where></Query><RowLimit>1</RowLimit></View>";
    } else if (listkey == "projects" && IID) {
      PQUERY =
        "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='ID'/><Value Type='Integer'>" +
        IID +
        "</Value></Eq></And></Where></Query><RowLimit>1</RowLimit></View>";
    } else {
      PQUERY =
        "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query></View>";
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
    notificationappen: function () {
      if (PCODE) {
        $("#O365_SearchBoxContainer_container").append(
          '<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="0"></i><a href="' +
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/Listing.aspx?ListKey=tasks&PCODE=" +
          PCODE +
          '">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="0"></i><a href="/sites/SPM/SitePages/Listing.aspx?ListKey=risks&PCODE=' +
          PCODE +
          '">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="0"></i><a href="' +
          _spPageContextInfo.webAbsoluteUrl +
          "/SitePages/Listing.aspx?ListKey=issues&PCODE=" +
          PCODE +
          '"">Issues</a></span></div><div class="UProfile"></div></div>'
        );
      } else {
        $("#O365_SearchBoxContainer_container").append(
          '<div class="User-Not"><div class="SNotifications"><span class="Tasks"><i class="fas fa-tasks" data-count="0"></i><a href="' +
          _spPageContextInfo.webAbsoluteUrl +
          '/SitePages/Listing.aspx?ListKey=tasks">Tasks</a></span><span class="Risks"><i class="fas fa-exclamation-triangle" data-count="0"></i><a href="' +
          _spPageContextInfo.webAbsoluteUrl +
          '/SitePages/Listing.aspx?ListKey=risks">Risks</a></span><span class="Issues"><i class="fas fa-calendar-times" data-count="0"></i><a href="' +
          _spPageContextInfo.webAbsoluteUrl +
          '/SitePages/Listing.aspx?ListKey=issues">Issues</a></span></div><div class="UProfile"></div></div>'
        );
      }
    },
  },
};

var deliverabePercent = {
  onSuccess: function (sender, args) {
    var collListItem = deliverabePercent.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      console.warn("weight value!!!!!!!!!", oListItem.get_item("Weight"));
      RevenuesAmount += oListItem.get_item("Weight") || 0;
    }
    console.warn(RevenuesAmount);
    deliverabePercent.g.revenueBudget();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".Container").length) {
      clearInterval(checkStatusHtml);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        deliverabePercent.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Deliverables");
    var camlQuery = new SP.CamlQuery();
    var ReQUERY;
    ReQUERY =
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"ProjectCode\" /><Value Type=\"Text\">" +
      PCODE +
      "</Value></Eq></And></Where></Query></View>";

    camlQuery.set_viewXml(ReQUERY);
    deliverabePercent.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(deliverabePercent.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, deliverabePercent.onSuccess),
      Function.createDelegate(this, deliverabePercent.onError)
    );
  },
  // Global variables
  g: {
    revenueBudget: function () {
      if ($("input#Weight").length) {
        //clearInterval(checkWeightValueHTML);
        RemainingBudget = 100 - RevenuesAmount;
        RemainingBudget = Number(RemainingBudget.toFixed(1));

        var newVal;
        var inpVal;
        if ($("input#Weight").val().includes(".")) {
          inpVal = parseFloat($("input#Weight").val()) || 0;
        } else {
          inpVal = parseInt($("input#Weight").val()) || 0;
        }				// if($('input#WeightValue').val() < RemainingBudget){
        newVal =
          RemainingBudget + inpVal >= 100 ? inpVal : RemainingBudget + inpVal;
        newVal = Number(newVal.toFixed("2"));
        RemainingBudget == 100
          ? $("input#Weight").attr("max", RemainingBudget)
          : $("input#Weight").attr("max", newVal);
        // }
        // else{
        //     newVal = parseInt($('input#WeightValue').val())
        //     $('input#WeightValue').attr('max', $('input#WeightValue').val());
        // }
        $("input#Weight")
          .parent()
          .find(" > label")
          .append(
            '<span data-trans-remainperc class="Resources remainpercstyle"></span><span class="remainpercstyle ">' +
            RemainingBudget +
            "]</span>"
          );
        changeResources();
      }
    },
  },
};
// var deliverabeInitiativePercent = {
//   onSuccess: function (sender, args) {
//     var collListItem = deliverabeInitiativePercent.g.collListItem;
//     var listItemEnum = collListItem.getEnumerator();
//     while (listItemEnum.moveNext()) {
//       var oListItem = listItemEnum.get_current();

//       console.warn("weight value!!!!!!!!!", oListItem.get_item("Weight"));
//       RevenuesAmountInit += oListItem.get_item("Weight") || 0;
//     }
//     console.warn(RevenuesAmountInit);
//     deliverabeInitiativePercent.g.revenueBudget();
//   },
//   onError: function (sender, args) {
//     console.log(
//       "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
//     );
//   },
//   // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
//   preinit: function () {
//     if ($(".Container").length) {
//       clearInterval(checkStatusHtml);
//       SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
//         deliverabeInitiativePercent.init();
//       });
//     }
//   },
//   // The main Initialization function
//   init: function () {
//     var clientContext = new SP.ClientContext.get_current();
//     var oList = clientContext
//       .get_web()
//       .get_lists()
//       .getByTitle("InitiativeDeliverables");
//     var camlQuery = new SP.CamlQuery();
//     var ReQUERY;
//     ReQUERY =
//       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
//       ICODE +
//       "</Value></Eq></And></Where></Query></View>";

//     camlQuery.set_viewXml(ReQUERY);
//     deliverabeInitiativePercent.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
//     clientContext.load(deliverabeInitiativePercent.g.collListItem);
//     clientContext.executeQueryAsync(
//       Function.createDelegate(this, deliverabeInitiativePercent.onSuccess),
//       Function.createDelegate(this, deliverabeInitiativePercent.onError)
//     );
//   },
//   // Global variables
//   g: {
//     revenueBudget: function () {
//       if ($("input#Weight").length) {
//         //clearInterval(checkWeightValueHTML);
//         RemainingBudget = 100 - RevenuesAmountInit;
//         RemainingBudget = Number(RemainingBudget.toFixed(1));

//         var newVal;
//         var inpVal;
//         if ($("input#Weight").val().includes(".")) {
//           inpVal = parseFloat($("input#Weight").val()) || 0;
//         } else {
//           inpVal = parseInt($("input#Weight").val()) || 0;
//         }				// if($('input#WeightValue').val() < RemainingBudget){
//         newVal =
//           RemainingBudget + inpVal >= 100 ? inpVal : RemainingBudget + inpVal;
//         newVal = Number(newVal.toFixed("2"));
//         RemainingBudget == 100
//           ? $("input#Weight").attr("max", RemainingBudget)
//           : $("input#Weight").attr("max", newVal);
//         // }
//         // else{
//         //     newVal = parseInt($('input#WeightValue').val())
//         //     $('input#WeightValue').attr('max', $('input#WeightValue').val());
//         // }
//         $("input#Weight")
//           .parent()
//           .find(" > label")
//           .append(
//             '<span data-trans-remainperc class="Resources remainpercstyle"></span><span class="remainpercstyle">' +
//             RemainingBudget +
//             "]</span>"
//           );
//         changeResources();
//       }
//     },
//   },
// };

// var initMilestPercent = {
//   onSuccess: function (sender, args) {
//     var collListItem = initMilestPercent.g.collListItem;
//     var listItemEnum = collListItem.getEnumerator();
//     while (listItemEnum.moveNext()) {
//       var oListItem = listItemEnum.get_current();
//       revenuesAmountInitMiles += oListItem.get_item("Weight") || 0;
//     }
//     console.log(
//       revenuesAmountInitMiles,
//       "revenuesAmountInitMiles revenuesAmountInitMiles"
//     );
//     initMilestPercent.g.revenueBudget();
//   },
//   onError: function (sender, args) {
//     console.log(
//       "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
//     );
//   },
//   init: function () {
//     var clientContext = new SP.ClientContext.get_current();
//     var oList = clientContext
//       .get_web()
//       .get_lists()
//       .getByTitle("InitiativeMilestones");
//     var camlQuery = new SP.CamlQuery();
//     var ReQUERY;
//     ReQUERY =
//       "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
//       ICODE +
//       "</Value></Eq></And></Where></Query></View>";

//     camlQuery.set_viewXml(ReQUERY);
//     initMilestPercent.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
//     clientContext.load(initMilestPercent.g.collListItem);
//     clientContext.executeQueryAsync(
//       Function.createDelegate(this, initMilestPercent.onSuccess),
//       Function.createDelegate(this, initMilestPercent.onError)
//     );
//   },
//   g: {
//     revenueBudget: function () {
//       if ($("input#Weight").length) {
//         //clearInterval(checkWeightValueHTML);
//         RemainingBudget = 100 - revenuesAmountInitMiles;
//         RemainingBudget = Number(RemainingBudget.toFixed(1));
//         var newVal;
//         var inpVal;
//         if ($("input#Weight").val().includes(".")) {
//           inpVal = parseFloat($("input#Weight").val()) || 0;
//         } else {
//           inpVal = parseInt($("input#Weight").val()) || 0;
//         }

//         newVal =
//           RemainingBudget + inpVal >= 100 ? inpVal : RemainingBudget + inpVal;
//         newVal = Number(newVal.toFixed("2"));
//         newVal = Number(newVal.toFixed("2"));
//         RemainingBudget == 100
//           ? $("input#Weight").attr("max", RemainingBudget)
//           : $("input#Weight").attr("max", newVal);

//         $("input#Weight")
//           .parent()
//           .find(" > label")
//           .append(
//             '<span data-trans-remainperc class="Resources remainpercstyle"></span><span class="remainpercstyle">' +
//             RemainingBudget +
//             "]</span>"
//           );
//         changeResources();
//       }
//     },
//   },
// };

var benefitmetricsPercent = {
  onSuccess: function (sender, args) {
    var collListItem = benefitmetricsPercent.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      console.warn("weight value!!!!!!!!!", oListItem.get_item("Weight"));
      RevenuesAmount += oListItem.get_item("Weight") || 0;
    }
    console.warn(RevenuesAmount);
    benefitmetricsPercent.g.revenueBudget();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".Container").length) {
      clearInterval(checkStatusHtml);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        benefitmetricsPercent.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext
      .get_web()
      .get_lists()
      .getByTitle("BenefitMetrics");
    var camlQuery = new SP.CamlQuery();
    var ReQUERY;
    ReQUERY =
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name=\"InitiativeCode\" /><Value Type=\"Text\">" +
      ICODE +
      "</Value></Eq></And></Where></Query></View>";

    camlQuery.set_viewXml(ReQUERY);
    benefitmetricsPercent.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(benefitmetricsPercent.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, benefitmetricsPercent.onSuccess),
      Function.createDelegate(this, benefitmetricsPercent.onError)
    );
  },
  // Global variables
  g: {
    revenueBudget: function () {
      if ($("input#Weight").length) {
        //clearInterval(checkWeightValueHTML);
        RemainingBudget = 100 - RevenuesAmount;
        RemainingBudget = Number(RemainingBudget.toFixed(1));

        var newVal;
        var inpVal;
        if ($("input#Weight").val().includes(".")) {
          inpVal = parseFloat($("input#Weight").val()) || 0;
        } else {
          inpVal = parseInt($("input#Weight").val()) || 0;
        }				// if($('input#WeightValue').val() < RemainingBudget){
        newVal =
          RemainingBudget + inpVal >= 100 ? inpVal : RemainingBudget + inpVal;
        newVal = Number(newVal.toFixed("2"));
        RemainingBudget == 100
          ? $("input#Weight").attr("max", RemainingBudget)
          : $("input#Weight").attr("max", newVal);
        // }
        // else{
        //     newVal = parseInt($('input#WeightValue').val())
        //     $('input#WeightValue').attr('max', $('input#WeightValue').val());
        // }
        $("input#Weight")
          .parent()
          .find(" > label")
          .append(
            '<span data-trans-remainperc class="Resources remainpercstyle"></span><span class="remainpercstyle">' +
            RemainingBudget +
            "]</span>"
          );
        changeResources();
      }
    },
  },
};
// var GetStage_Info = {
//     onSuccess: function(sender, args) {
//         var collListItem = GetStage_Info.g.collListItem;
//         var listItemEnum = collListItem.getEnumerator();
//         var SID, stage;
//         while (listItemEnum.moveNext()) {
//             var oListItem = listItemEnum.get_current();
//             SID = oListItem.get_id();
//         }
//         // console.log(SID);
//         $(".CFIELD[data-hidestageID=" + SID + "]").remove();
//         $(".CFIELD[data-showstageID=" + SID + "]").show();
//     },
//     onError: function(sender, args) {
//         console.log(
//             "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
//         );
//     },
//     // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
//     preinit: function() {
//         if ($(".ms-Icon--Settings").length) {
//             clearInterval(checkNotificationHTML);
//             SP.SOD.executeFunc("sp.js", "SP.ClientContext", function() {
//                 GetStage_Info.init();
//             });
//         }
//     },
//     // The main Initialization function
//     init: function(stage) {
//         var clientContext = new SP.ClientContext.get_current();
//         var oList = clientContext.get_web().get_lists().getByTitle("Stages");
//         var camlQuery = new SP.CamlQuery();
//         camlQuery.set_viewXml(
//             "<View><Query><Where><Eq><FieldRef Name='Title'/><Value Type='Text'>" +
//             stage +
//             "</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>"
//         );
//         GetStage_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
//         clientContext.load(GetStage_Info.g.collListItem);
//         clientContext.executeQueryAsync(
//             Function.createDelegate(this, GetStage_Info.onSuccess),
//             Function.createDelegate(this, GetStage_Info.onError)
//         );
//     },
//     // Global variables
//     g: {},
// };
//Risks
var Risks_Info_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Risks_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var Risks = "";
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      ///date
      var year =
        oListItem.get_item("DateIdentified") == null
          ? ""
          : oListItem.get_item("DateIdentified").getFullYear();
      NRisks++;
    }
    $(".Risks i").attr("data-count", NRisks);
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".Container").length) {
      clearInterval(checkStatusHtml);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        Risks_Info_Request.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Risks");
    var camlQuery = new SP.CamlQuery();
    var RQUERY;
    if (PCODE) {
      RQUERY =
        "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='Project'/><Value Type='Text'>" +
        PCODE +
        "</Value></Eq><And></Where></Query></View>";
    } else {
      RQUERY =
        "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query></View>";
    }
    camlQuery.set_viewXml(RQUERY);
    Risks_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Risks_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Risks_Info_Request.onSuccess),
      Function.createDelegate(this, Risks_Info_Request.onError)
    );
  },
  // Global variables
  g: {
    PCODE: window.location.href.split("PCODE=")[1],
  },
};
//Issues
var Issues_Info_Request = {
  onSuccess: function (sender, args) {
    var collListItem = Issues_Info_Request.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var Issues = "";
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();

      NIssues++;
    }
    $(".Issues i").attr("data-count", NIssues);
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".Container").length) {
      clearInterval(checkStatusHtml);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        Issues_Info_Request.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Issues");
    var camlQuery = new SP.CamlQuery();
    var IQUERY;
    if (PCODE) {
      IQUERY =
        "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='Project'/><Value Type='Text'>" +
        PCODE +
        "</Value></Eq></And></Where></Query></View>";
    } else {
      IQUERY =
        "<View><Query><Where><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq></Where></Query></View>";
    }
    camlQuery.set_viewXml(IQUERY);
    Issues_Info_Request.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Issues_Info_Request.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Issues_Info_Request.onSuccess),
      Function.createDelegate(this, Issues_Info_Request.onError)
    );
  },
  // Global variables
  g: {
    PCODE: window.location.href.split("PCODE=")[1],
  },
};

//
var IdeaCode,
  IdeaName,
  IdeaDescription,
  IdeaPortfolio,
  IdeaExpectedBudget,
  IdeaPlannedStartDate,
  FormatIdeaPlannedStartDate,
  IdeaExpectedLaunchDate,
  FormatIdeaExpectedLaunchDate,
  IdeaExecutiveSummary,
  IdeaAssumptions,
  IdeaRiskTitle,
  IdeaExpectedBenefits,
  IdeaPriority,
  IdeaStatus,
  CreatedBy,
  submitForApproval;
window.Idea_Info = {
  onSuccess: function (sender, args) {
    Idea_Info.g.array = [];
    var collListItem = Idea_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      //
      IdeaCode = oListItem.get_item("Title");
      IdeaName = oListItem.get_item("Name");
      IdeaDescription = oListItem.get_item("Description");
      IdeaPortfolio = oListItem.get_item("Portfolio");
      IdeaExpectedBudget = oListItem.get_item("EstimatedCosts");
      IdeaExpectedLaunchDate = oListItem.get_item("ExpectedLaunchDate");
      if (IdeaExpectedLaunchDate) {
        FormatIdeaExpectedLaunchDate =
          IdeaExpectedLaunchDate.format("yyyy-MM-dd");
      }
      IdeaExecutiveSummary = oListItem.get_item("ExecutiveSummary");
      IdeaAssumptions = oListItem.get_item("MajorAssumptions");
      IdeaRiskTitle = oListItem.get_item("MajorRisks");
      IdeaExpectedBenefits = oListItem.get_item("EstimatedBusinessBenefits");
      IdeaPriority = oListItem.get_item("Urgency");
      IdeaStatus = oListItem.get_item("Status");
      submitForApproval = oListItem.get_item("SubmitForApproval");
      CreatedBy = oListItem.get_item("Author").get_lookupValue();
      // console.log('CreatedBy', CreatedBy);
    }

    if (isNew) {
      $("#Name").val(IdeaName);
      $("#ExpectedLaunchDate").val(FormatIdeaExpectedLaunchDate);
      $("#Description").val(IdeaDescription);
      $("#Priority").val(IdeaPriority);
      $("#EstimatedCost").val(IdeaExpectedBudget);
      $("#ProjectExecutiveSummary").val(IdeaExecutiveSummary);
      $("#Assumptions").val(IdeaAssumptions);
      $('.projects[data-target_list="Risks"] #Title').val(IdeaRiskTitle);
      $("#ExpectedBenefits").val(IdeaExpectedBenefits);
      $("#portfolio").val(IdeaPortfolio);
      $(".form-btns-wrapper button").attr("disabled", true);
      $(".form-btns-wrapper button").addClass("noLoader");
    }

    if (USERisIdeas && isView) {
      if (submitForApproval == false || submitForApproval == null) {
        $(".rightBtns").prepend(
          '<button data-trans-submittedForApproval class="btn btn-action Resources" id="sendforApproval" type="button" onclick="sendDataForApproval.init();"></button>'
        );
      }

      if (
        (submitForApproval == true && IdeaStatus != "ideaRejected") ||
        (IdeaStatus && IdeaStatus == "cancelled") ||
        CreatedBy !== UserN.Title
      ) {
        $(".btn-delete").remove();
        $(".btn-save").remove();
        $("#sendforApproval").remove();
      }
      if (IdeaStatus == "completed" || CreatedBy !== UserN.Title) {
        $(".btn-save").remove();
      }

      if (CreatedBy !== UserN.Title) {
        $(".container-body").prepend(
          '<div class="errormsg alert"><span class="infoIcon"><i class="fas fa-info-circle"></i></span><span>' +
          editablebyowneronly +
          "</span></div>"
        );
      }

      if (IdeaStatus != "inprogress" && IdeaStatus != "ideaRejected") {
        $(".container-body").prepend(
          '<div class="errormsg alert"><span class="infoIcon"><i class="fas fa-info-circle"></i></span><span>' +
          notEditableItem +
          "</span></div>"
        );
      }
    }

    if (
      USERisIdeas &&
      isEdit &&
      (CreatedBy !== UserN.Title ||
        (IdeaStatus != "inprogress" && IdeaStatus != "ideaRejected"))
    ) {
      $(".form-control.SPIField").attr("disabled", true);
      $(".btn-save").remove();

      if (CreatedBy !== UserN.Title) {
        $(".container-body").prepend(
          '<div class="errormsg alert"><span class="infoIcon"><i class="fas fa-info-circle"></i></span><span>' +
          editablebyowneronly +
          "</span></div>"
        );
      }

      if (IdeaStatus != "inprogress" && IdeaStatus != "ideaRejected") {
        $(".container-body").prepend(
          '<div class="errormsg alert"><span class="infoIcon"><i class="fas fa-info-circle"></i></span><span>' +
          notEditableItem +
          "</span></div>"
        );
      }
    }
    changeResources();
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // The main Initialization function
  init: function () {
    //
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle("Ideas");
    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='ID'/><Value Type='Text'>" +
      IID +
      "</Value></Eq></And></Where></Query></View>"
    );
    Idea_Info.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    clientContext.load(Idea_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, Idea_Info.onSuccess),
      Function.createDelegate(this, Idea_Info.onError)
    );
  },
  // Global variables
  g: {
    array: [],
  },
};
//** Edit field from other list
window.sendDataForApproval = {
  init: function () {
    var clientContext = new SP.ClientContext.get_current();

    var oList = clientContext.get_web().get_lists().getByTitle("Ideas");
    sendDataForApproval.g.oListItem = oList.getItemById(IID); //declared inside object scope only
    sendDataForApproval.g.oListItem.set_item("SubmitForApproval", true);
    sendDataForApproval.g.oListItem.update();
    clientContext.load(sendDataForApproval.g.oListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, function () {
        console.log("successful");
        window.location =
          _spPageContextInfo.siteAbsoluteUrl +
          "/SitePages/Listing.aspx?ListKey=ideas";
      }),
      Function.createDelegate(this, function (sender, args) {
        console.log(
          "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
        );
      })
    );
  },
  g: {},
};
var printDate;
var printTime = new Date();
var printHead = "";
var signitureHtml = "";
window.Print_Data = {
  print: function () {
    if ($(".printHeader").length == 0) {
      printHead = `<div class='remove printHeader' style="display:none;justify-content:space-between"><div><img css="w-100" src="${logo}" style="height: 80px;width: 170px;"/></div><div style="font-size:25px;font-weight:bold;margin-top:1.4em">${PageTitle}</div><div style="font-size:15px;margin-top:2.6em;font-weight:bold"><span>${printDate}</span>${printTime.toLocaleDateString(
        "en-US"
      )}</div>
                    </div>
                    `;
      if (
        localStorage.getItem("lng") == null ||
        localStorage.getItem("lng") == "ar"
      ) {
        signitureHtml = `<div class='remove printHeader' style="display:none;justify-content:start"><div style="position:absolute;margin-top:2%;padding:2% 1%;font-size:20px;font-weight:bold;"> التوقيع : </div></div>
                    `;
      } else {
        signitureHtml = `<div class='remove printHeader' style="display:none;justify-content:start"><div style="position:absolute;margin-top:2%;padding:2% 1%;font-size:20px;font-weight:bold;"> signiture : </div></div>
                        `;
      }
      $("#printableArea").prepend(printHead);
      $("#printableArea").append(signitureHtml);
    }

    $("#s4-bodyContainer").printThis({
      copyTagClasses: true,
      importCSS: true,
      importStyle: true,
      removeInline: false,
      printContainer: true,
    });

    // console.log(window.print(),"Saaaaaaaa")

    // window.print();
    // $(".remove").remove();
  },
};

// working on integration btn
var base64 = "";

var Integration_Handler = {
  Save_Integration: function () {
    $(".integration-save").attr("disabled", true);
    // $("#preloader,#formloader").css("display", "block");

    var docName = "",
      docType = "",
      docExt = "",
      metaDataArr = [];
    var currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
    var RqUID = "";
    validattachments.forEach((doc) => {
      // getBase64(doc)
      // await toBase64(doc)
      docName = doc.name.split(".")[0];
      // docType = doc.type
      docExt = doc.name.split(".").pop();
    });

    if (listkey == "projectcharter" && PCODE) {
      docType = "pmo_docs";
      RqUID = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    } else if (listkey == "initiativecards" && ICODE) {
      docType = "initiatives_docs";
      RqUID = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    }

    // if (listkey == 'projectcharter' && PCODE) {
    //handle project data
    $(
      ".section-container:not([data-target_list]) .CFIELD> input[type=text], .section-container:not([data-target_list]) .CFIELD> input[type=number], .section-container:not([data-target_list]) .CFIELD> input[type=float], .section-container:not([data-target_list]) .CFIELD>  input[type=date],.section-container:not([data-target_list]) .CFIELD> .datetimeinputs input[type=date],.section-container:not([data-target_list]) .CFIELD> .datetimeinputs input[type=datetime-local],.section-container:not([data-target_list]) .CFIELD> input[type=radio], .section-container:not([data-target_list]) .CFIELD> input[type=checkbox], .section-container:not([data-target_list]) .CFIELD> div[type=picker], .section-container:not([data-target_list]) .CFIELD> div[type=multipicker], .section-container:not([data-target_list]) .CFIELD> select[type=dropdown], .section-container:not([data-target_list]) .CFIELD>  textarea, .section-container:not([data-target_list]) .CFIELD > .multiselect-container"
    ).each(function () {
      if ($(this).attr("type") == "date") {
        if (listkey == "projectcharter" && PCODE) {
          if (
            $(this).attr("id") == "BaselineStartDate" ||
            $(this).attr("id") == "ActualStartDate"
          ) {
            if ($(this).val()) {
              var dateval = $(this).val().replace("-", "/");
              var datesId = $(this).attr("id");
              var ydate = !dateval
                ? ""
                : [dateval.slice(5, 10), dateval.slice(0, 4)]
                  .join("/")
                  .replace("-", "/");

              if (dateval) {
                var obj = {};
                if ($(this).attr("id") == "BaselineStartDate") {
                  obj = {
                    key: "start_date",
                    PropVal: ydate,
                  };
                } else if ($(this).attr("id") == "ActualStartDate") {
                  obj = {
                    key: "actual_date",
                    PropVal: ydate,
                  };
                }
                metaDataArr.push(obj);
              }
            }
          }
        } else if (listkey == "initiativecards" && ICODE) {
          if (
            $(this).attr("id") == "StartDate" ||
            $(this).attr("id") == "FinishDate"
          ) {
            if ($(this).val()) {
              var dateval = $(this).val().replace("-", "/");
              var datesId = $(this).attr("id");
              var ydate = !dateval
                ? ""
                : [dateval.slice(5, 10), dateval.slice(0, 4)]
                  .join("/")
                  .replace("-", "/");

              if (dateval) {
                var obj = {};
                if ($(this).attr("id") == "StartDate") {
                  obj = {
                    key: "start_date",
                    PropVal: ydate,
                  };
                } else if ($(this).attr("id") == "FinishDate") {
                  obj = {
                    key: "end_date",
                    PropVal: ydate,
                  };
                }
                // obj[datesId] = ydate
                metaDataArr.push(obj);
              }
            }
          }
        }
      } else if ($(this).attr("type") == "dropdown") {
        var id = $(this).attr("id");
        if (listkey == "projectcharter" && PCODE) {
          if (
            id == "Sector" ||
            id == "SubSector" ||
            id == "RelatedInitiative"
          ) {
            var val = $(this).val();
            if (val) {
              var obj = {};
              if (id == "Sector") {
                obj = {
                  key: "sector",
                  PropVal: val,
                };
              } else if (id == "SubSector") {
                obj = {
                  key: "agency",
                  PropVal: val,
                };
              } else if (id == "RelatedInitiative") {
                obj = {
                  key: "initiative",
                  PropVal: val,
                };
              }

              metaDataArr.push(obj);
            }
          }
        } else if (listkey == "initiativecards" && ICODE) {
          if (id == "SubSector") {
            var val = $(this).val();
            if (val) {
              var obj = {};
              if (id == "SubSector") {
                obj = {
                  key: "agency",
                  PropVal: val,
                };
              }
            }
          }
        }
      } else if ($(this).attr("type") == "picker") {
        if (listkey == "initiativecards" && ICODE) {
          var id = $(this).attr("id");
          if (id == "InitiativeOwner") {
            var val = $(this).attr("data-email");
            if (val) {
              var obj = {};
              if (id == "InitiativeOwner") {
                obj = {
                  key: "initiative_owner",
                  PropVal: val,
                };
              }
              metaDataArr.push(obj);
            }
          }
        }
      } else if ($(this).attr("type") == "multipicker") {
      } else if ($(this).attr("type") == "radio") {
        var id = $(this).attr("id");
        if (listkey == "projectcharter" && PCODE) {
          if (id == "NTP") {
            var checkedvalue = $(
              'input[id="' + $(this).attr("id") + '"]:checked'
            ).val();
            if (checkedvalue == "yes") {
              var obj = {};
              obj = {
                key: "ntp",
                PropVal: "yes",
              };
              const isFound = metaDataArr.some((element) => {
                if (element["key"] === "ntp") {
                  return true;
                }
              });
              if (!isFound) {
                metaDataArr.push(obj);
              }
            } else if (checkedvalue == "no" || checkedvalue == "undefined") {
              var obj = {};
              obj = {
                key: "ntp",
                PropVal: "no",
              };
              const isFound = metaDataArr.some((element) => {
                if (element["key"] === "ntp") {
                  return true;
                }
              });
              if (!isFound) {
                metaDataArr.push(obj);
              }
            }
          }
        }
      } else {
        var id = $(this).attr("id");
        if (listkey == "projectcharter" && PCODE) {
          if (
            id == "Name" ||
            id == "Description" ||
            id == "ScopeOfWork" ||
            id == "ActualCostWorkCompleted"
          ) {
            var val = $(this).val();
            if (val) {
              var obj = {};
              if (id == "Name") {
                obj = {
                  key: "project_name",
                  PropVal: val,
                };
              } else if (id == "ScopeOfWork") {
                obj = {
                  key: "project_scope",
                  PropVal: val,
                };
              } else if (id == "Description") {
                obj = {
                  key: "description",
                  PropVal: val,
                };
              } else if (id == "ActualCostWorkCompleted") {
                obj = {
                  key: "actual_cost",
                  PropVal: val,
                };
              }
              metaDataArr.push(obj);
            }
          }
        } else if (listkey == "initiativecards" && ICODE) {
          if (
            id == "Name" ||
            id == "Description" ||
            id == "ProgramTotalCost" ||
            id == "Expenditures" ||
            id == "ActualCost"
          ) {
            var val = $(this).val();
            if (val) {
              var obj = {};
              if (id == "Name") {
                obj = {
                  key: "initiative_name",
                  PropVal: val,
                };
              } else if (id == "Description") {
                obj = {
                  key: "description",
                  PropVal: val,
                };
              } else if (id == "ProgramTotalCost") {
                obj = {
                  key: "total_cost",
                  PropVal: val,
                };
              } else if (id == "Expenditures") {
                obj = {
                  key: "total_expenses",
                  PropVal: val,
                };
              } else if (id == "ActualCost") {
                obj = {
                  key: "approved_cost",
                  PropVal: val,
                };
              }
              metaDataArr.push(obj);
            }
          }
        }
      }
    });
    // } else if (listkey == 'initiativecards' && ICODE) {

    // }
    var reqData = {
      DocMngRq: {
        MsgRqHdr: {
          RqUID: RqUID, // should be unique
          SCId: "ESPRTL", // will change to Hemma after walid updated
          SubSCId: "", // as mohammad request data > TADHALUMAT
          SvcId: "DocMng", // for post request DocMng for get DocsInq
          FuncId: "11700000", // fixed
          ClientDt: currentDate, // should be current date
          RqMode: 0,
          UserId: "string", // as mohammad request data > string
          EchoData: "any value you want to echo it back in the response", // as mohammad request data > any value you want to echo it back in the response
        },
        Body: {
          DocInfo: {
            // "DocType": "lid_requests",
            DocType: docType,
            DocPath: {
              // "DirctryPath": "https://baseurl/documentPath",
              // "DocName": "test_777",
              DocName: docName,
              // "DocExtension": "pdf"
              DocExtension: docExt,
            },
            // "Format": "pdf",
            Format: docExt,
            Content: base64,
            MetadataList: {
              Metadata: metaDataArr,
            },
          },
          DestDirctryPath: "/Testing",
        },
      },
    };

    // window.Archive_Data_Submit.init(RqUID,"E000127")

    $.ajax({
      url: "http://172.28.3.16:7901/v1/documents/manage",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `{ "MsgRqHdr": { "ClientDt": ${currentDate}, "EchoData": "", "FuncId": "11700000", "PartyId": { "PartyIdNum": "", "PartyIdType": "" }, "ProxyUserId": "", "RqMode": 0, "RqUID": ${RqUID}, "SCId": "ESPRTL", "SubSCId": "", "SvcId": "DocMng", "UserId": "", "Version": "" } }`,
      },
      data: reqData,
      success: function (data) {
        console.log(data, "INSIDE SUCCESS POST REQUEEEEEEEEESt");
        // $(".integration-save").addClass("success");
        var responseId = data.DocMngRs.MsgRsHdr.ResponseStatus.StatusCode;
        window.Archive_Data_Submit.init(RqUID, responseId, IID); // in form submit
      },
      error: function (data) {
        console.log("call failed", data);
      },
    });
  },
};

function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    base64 = reader.result;
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}

//////////////////
// end  working on integration btn

///////////////////////////////////////////////
//decimal number percentage
function ForNumbers(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;

  if (
    //0~9
    (charCode >= 48 && charCode <= 57) ||
    //number pad 0~9
    (charCode >= 96 && charCode <= 105) ||
    //backspace
    charCode == 8 ||
    //tab
    charCode == 9 ||
    //enter
    charCode == 13 ||
    //left, right, delete..
    (charCode >= 35 && charCode <= 46)
  ) {
    //make sure the new value below 20
    if (parseInt(this.value + String.fromCharCode(charCode), 10) <= 30)
      return true;
  }

  evt.preventDefault();
  evt.stopPropagation();

  return false;
}

//////////
var GetCurrentStage_Info = {
  onSuccess: function (sender, args) {
    var collListItem = GetCurrentStage_Info.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();
    var PID, stage, ismultistage;

    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      PID = oListItem.get_id();
      // if (
      // 	(!SP_relatedWfList && SP_ListName == "Projects") ||
      // 	SP_relatedWfList == "Projects"
      // ) {
      // 	stage = oListItem.get_item("Stage");
      // } else {
      stage = oListItem.get_item("WFStage");
      //	}

      if (stage) {
        ismultistage = stage.indexOf(";") > -1;
      }
      if (ismultistage) {
        stage = stage.split(";");
      }
    }

    if (!USERisWF) {
      $("[data-hidestageID*=" + stage + "]").remove();
      $("[data-showstageID*=" + stage + "]").show();
      $('[data-showstageID*="allstages"]').show();

      $("[data-disablestageID]").each(function () {
        var stageofElement = $(this).attr("data-disablestageID");
        if (stageofElement.includes(stage)) {
          $(this).children("input").attr("disabled", true);
          $(this).children("select").attr("disabled", true);
          $(this).children(".PPField").attr("disabled", true);
          $(this).children("textarea").attr("disabled", true);
        } else {
          $(this).children("input").attr("disabled", false);
          $(this).children("select").attr("disabled", false);
          $(this).children(".PPField").attr("disabled", false);
          $(this).children("textarea").attr("disabled", false);
        }
      });

      $("[data-enablestageID]").each(function () {
        var stageofElement = $(this).attr("data-enablestageID");
        if (stageofElement.includes(stage)) {
          $(this).children("input").attr("disabled", false);
          $(this).children("select").attr("disabled", false);
          $(this).children(".PPField").attr("disabled", false);
          $(this).children("textarea").attr("disabled", false);
        } else {
          $(this).children("input").attr("disabled", true);
          $(this).children("select").attr("disabled", true);
          $(this).children(".PPField").attr("disabled", true);
          $(this).children("textarea").attr("disabled", true);
        }
      });
    } else {
      $('[data-showstageID*="allstages"]').show();
      $(".CFIELD[data-isWfhidestageID=" + stage + "]").remove();
      $(".CFIELD[data-isWfshowstageID=" + stage + "]").show();
      $("[data-isWfdisablestageID]").each(function () {
        var stageofElement = $(this).attr("data-isWfdisablestageID");
        if (stageofElement.includes(stage)) {
          $(this).children("input").attr("disabled", true);
          $(this).children("select").attr("disabled", true);
          $(this).children(".PPField").attr("disabled", true);
          $(this).children("textarea").attr("disabled", true);
        } else {
          $(this).children("input").attr("disabled", false);
          $(this).children("select").attr("disabled", false);
          $(this).children(".PPField").attr("disabled", false);
          $(this).children("textarea").attr("disabled", false);
        }
      });
      $("[data-isWfenablestageID]").each(function () {
        var stageofElement = $(this).attr("data-isWfenablestageID");
        if (stageofElement.includes(stage)) {
          $(this).children("input").attr("disabled", false);
          $(this).children("select").attr("disabled", false);
          $(this).children(".PPField").attr("disabled", false);
          $(this).children("textarea").attr("disabled", false);
        } else {
          $(this).children("input").attr("disabled", true);
          $(this).children("select").attr("disabled", true);
          $(this).children(".PPField").attr("disabled", true);
          $(this).children("textarea").attr("disabled", true);
        }
      });

      $("[data-isWfrequirestageID]").each(function () {
        var stageofElement = $(this).attr("data-isWfenablestageID");
        if (stageofElement.includes(stage)) {
          $(this).children("label").attr("required", true);
          $(this).children("input").attr("required", true);
          $(this).children("select").attr("required", true);
          $(this).children(".PPField").attr("required", true);
          $(this).children("textarea").attr("required", true);
        }
      })
    }
    $(`.form-tabs .nav-link:first-child`).trigger("click");
    if (PCODE) {
      $(".headtwo").append(
        '<a class="" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        '"><span class="litem">Home</span></a>' +
        '<a class="" href="' +
        _spPageContextInfo.webAbsoluteUrl +
        "/SitePages/View.aspx?ListKey=projects&IID=" +
        PID +
        '"><span data-trans-projectdetails class="litem Resources"></span></a>' //+
      );
    }
  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Pre-initialization functions ensure scripts, SharePoint dependencies are loaded
  preinit: function () {
    if ($(".ms-Icon--Settings").length) {
      clearInterval(checkNotificationHTML);
      SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
        GetCurrentStage_Info.init();
      });
    }
  },
  // The main Initialization function
  init: function () {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(SP_ListName);
    var camlQuery = new SP.CamlQuery();
    var PQUERY;
    PQUERY =
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef Name='ID'/><Value Type='Integer'>" +
      IID +
      "</Value></Eq></And></Where></Query><RowLimit>1</RowLimit></View>";
    camlQuery.set_viewXml(PQUERY);
    GetCurrentStage_Info.g.collListItem = oList.getItems(camlQuery);
    clientContext.load(GetCurrentStage_Info.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, GetCurrentStage_Info.onSuccess),
      Function.createDelegate(this, GetCurrentStage_Info.onError)
    );
  },
  // Global variables
  g: {},
};

var get_hierarchies = {
  init: async function (lookupList) {
    accessCallisDone = false;
    let isListConditional1
    let isListConditional2
    let isListConditional3
    let isListConditional4

    if (!tempRoleHierarchies.length) {
      tempRoleHierarchies = Array.from(myRoleConfig[0].dataFilter.hierarchies);
    }
    if (tempRoleHierarchies.length) {
      isListConditional1 = tempRoleHierarchies[0].listName == lookupList;
      isListConditional2 = tempRoleHierarchies[0].subRelation.listName == lookupList;
      isListConditional3 =
        tempRoleHierarchies[0].subRelation.subRelation.listName == lookupList;
      isListConditional4 = (tempRoleHierarchies[0].subRelation.subRelation.subRelation ? tempRoleHierarchies[0].subRelation.subRelation.subRelation.listName == lookupList : false);
    }
    let allGood = isListConditional1 || isListConditional2 || isListConditional3 || isListConditional4;
    if (allGood) {
      tempRoleHierarchies.shift();
      initiateDataLevelAccess(lookupList);
    } else if (tempRoleHierarchies.length) {
      tempRoleHierarchies.shift();
      if (tempRoleHierarchies.length) {
        get_hierarchies.init(lookupList);
      } else {
        accessCallisDone = true
      }
    } else {
      accessCallisDone = true
    }
    await waitUntil(() => accessCallisDone === true);
  }


}

async function waitUntil(condition, time = 500) {
  while (!condition()) {
    await new Promise((resolve) => setTimeout(resolve, time));
  }
}
///////////////////////////////////
//working on parent type


var get_parent_data = {
  init: function (listName, code, parentFieldName, fieldName, getGrandParent) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(listName);
    var camlQuery = new SP.CamlQuery();


    valueBasedOnParent = []

    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef  Name=\"" + parentFieldName + "\" /><Value Type=\"Text\">" +
      code +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );

    get_parent_data.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    get_parent_data.g.fieldName = fieldName
    get_parent_data.g.getGrandParent = getGrandParent

    clientContext.load(get_parent_data.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, get_parent_data.onSuccess),
      Function.createDelegate(this, get_parent_data.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = get_parent_data.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();

    var dynamicFieldName = get_parent_data.g.fieldName
    var getGrandParent = get_parent_data.g.getGrandParent
    var dynamicVal = ""
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();

      dynamicVal = oListItem.get_item(dynamicFieldName) || '';

      if (getGrandParent && getGrandParent.length) {
        get_grandparent_data.init(getGrandParent[0].grandParentList, dynamicVal, getGrandParent[0].grandParentFieldName, getGrandParent[0].grandParentTargetFieldName)
      } else {
        valueBasedOnParent.push(dynamicVal)
      }

    }

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {},
};

//////////////////////////////////

var get_grandparent_data = {
  init: function (listName, code, grandParentFieldName, grandParentTargetFieldName) {
    var clientContext = new SP.ClientContext.get_current();
    var oList = clientContext.get_web().get_lists().getByTitle(listName);
    var camlQuery = new SP.CamlQuery();


    valueBasedOnParent = []

    camlQuery.set_viewXml(
      "<View><Query><Where><And><Neq><FieldRef Name='DeletionStatus' /><Value Type='Text'>Deleted</Value></Neq><Eq><FieldRef  Name=\"" + grandParentFieldName + "\" /><Value Type=\"Text\">" +
      code +
      "</Value></Eq></And></Where><OrderBy><FieldRef Name='Modified' Ascending='False' /></OrderBy></Query></View>"
    );

    get_grandparent_data.g.collListItem = oList.getItems(camlQuery); //declared inside object scope only
    get_grandparent_data.g.grandParentTargetFieldName = grandParentTargetFieldName


    clientContext.load(get_grandparent_data.g.collListItem);
    clientContext.executeQueryAsync(
      Function.createDelegate(this, get_grandparent_data.onSuccess),
      Function.createDelegate(this, get_grandparent_data.onError)
    );
  },
  onSuccess: function (sender, args) {
    var collListItem = get_grandparent_data.g.collListItem;
    var listItemEnum = collListItem.getEnumerator();

    var grandParentTargetFieldName = get_grandparent_data.g.grandParentTargetFieldName
    var dynamicGrandParentVal = ""
    while (listItemEnum.moveNext()) {
      var oListItem = listItemEnum.get_current();
      itemID = oListItem.get_id();

      dynamicGrandParentVal = oListItem.get_item(grandParentTargetFieldName) || '';

      valueBasedOnParent.push(dynamicGrandParentVal)
      console.log(valueBasedOnParent, "valueBasedOnParent in grand parent")
    }

  },
  onError: function (sender, args) {
    console.log(
      "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
    );
  },
  // Global variables
  g: {},
}