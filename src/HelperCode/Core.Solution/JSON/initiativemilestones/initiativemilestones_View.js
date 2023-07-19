var Information_Form = [
  {
    label: 'المعلم المبادرة',
    labelEn: 'Initiative Milestone',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    workflowSetValues: [
      // Ii Milestones
      //VRO
      { fieldName: 'Completed', value: 'yes', stages:["VROInitiativeMilestone02"] },
      //EPMO
      { fieldName: 'Completed', value: 'yes', stages:["EPMOInitiativeMilestone03"] },
      //LMS
      { fieldName: 'Completed', value: 'yes', stages:["LMSInitiativeMilestone02"] },
  

    ],
    subFields: [
      {
        InternalName: 'Title',
        DisplayNameEn: 'Title',
        DisplayName: 'رمز المعلم',
        type: 'string',
        // "maxchar": "250"
      },
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'اسم المعلم',
        type: 'string',
        maxchar: '250',
      },
      {
          "InternalName": "PlannedCompletedDate",
          "DisplayNameEn": "Planned Completed Date",
          "DisplayName": "تاريخ الاكتمال المخطط",
          "type": "datetime"
      },
      // {
      //   InternalName: 'PlannedDate',
      //   DisplayName: 'تاريخ الاكتمال المخطط',
      //   DisplayNameEn: 'Planned Finish Date',
      //   type: 'datetime',
      //   // validation: 'required',
      // },
      {
        InternalName: 'Weight',
        DisplayNameEn: 'Weight',
        DisplayName: 'الوزن المكافئ للإنجاز %',
        type: 'floatpercentage',
      },
      {
        InternalName: 'Amount',
        DisplayName: 'القيمة',
        DisplayNameEn: 'Amount',
        // dontSubmit: true,
        type: 'percentbyrelatedparent',
        listname: 'Initiatives',
        parentinternalname: 'InitiativeBudget',
        targetelement: 'Weight',
      },

      {
        "InternalName": "Completed",
        "DisplayNameEn": "Completed",
        "DisplayName":"اكتمال الموافقة",
          "type": "yesnoradio",
          options: {
              choices: [{
                  display: 'yes',
                  value: 'yes'
              },
              {
                  display: 'no',
                  value: 'no'
              }
              ]
          }
      },
      {
        InternalName: 'Delivered',
        DisplayName: 'تم التسليم',
        DisplayNameEn: 'Delivered',
        type: 'yesnoradio',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
          ],
        },
      },
      {
        InternalName: 'ActualCompletedDate',
        DisplayNameEn: 'Actual Completed Date',
        DisplayName: 'تاريخ الاكتمال الفعلي',
        type: 'datetime',
        max: 'today',
      },
      {
        InternalName: 'RelatedInitiativeDeliverable',
        DisplayNameEn: 'Related Initiative Deliverable',
        DisplayName: 'مخرج المبادرة المرتبط',
        type: 'lookup',
        source: 'InitiativeDeliverables',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'SupportDocumentsDescription',
        DisplayNameEn: 'Support Documents Description',
        DisplayName: 'وصف الوثائق الداعمة',
        type: 'multiline',
        maxchar: '500',
      },
      // {
      //   InternalName: "WFStage",
      //   DisplayName: "المرحلة",
      //   DisplayNameEn: "Stage",
      //   type: 'lookup',
      //   // validation: 'required',
      //   source: "Tasks Configuration",
      //   Dispfieldkey: "TaskNameAr",
      //   DispfieldkeyEn: 'TaskNameEn',
      //   valfieldkey: "Title",
      //   },
    ],
  },
  // {
  //     label: 'الوثائق الداعمة',
  //     labelEn: 'Supporting Documents',
  //     description: "",
  //     descriptionEn: "",
  //     subFields:[
  //         {
  //             "InternalName": "getfile",
  //             "DisplayName":"المستندات",
  //             "DisplayNameEn": "Documents",
  //             "type":"file"
  //         }
  //     ]
  // }
]
