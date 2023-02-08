var Information_Form = [
  {
    label: 'المعلم المبادرة',
    labelEn: 'Initiative Milestone',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayNameEn": "Title",
      //     "DisplayName":"رمز المعلم",
      //     "type":"string",
      //     "maxchar": "250"
      // },
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'اسم المعلم',
        type: 'string',
        maxchar: '250',
        validation: 'required',
        security: {
          groups: ['VRO_E', 'LMS_E', 'System Admin Group', 'EPMO'],
        },
      },
      // {
      //     "InternalName": "PlannedCompletedDate",
      //     "DisplayNameEn": "Planned Completed Date",
      //     "DisplayName": "تاريخ الاكتمال المخطط",
      //     "type": "datetime",
      //     "validation": "required",
      //     security: {
      //         groups: ['VRO_E','LMS_E','System Admin Group',
      //             'EPMO'
      //         ]
      //     },
      // },
      {
        InternalName: 'PlannedDate',
        DisplayName: 'تاريخ الاكتمال المخطط',
        DisplayNameEn: 'Planned Finish Date',
        type: 'datetime',
        validation: 'required',
        security: {
          groups: ['VRO_E', 'LMS_E', 'System Admin Group', 'EPMO'],
        },
      },
      {
        InternalName: 'Amount',
        DisplayName: 'القيمة',
        DisplayNameEn: 'Amount',
        dontSubmit: true,
        type: 'percentbyrelatedparent',
        listname: 'Initiatives',
        parentinternalname: 'InitiativeBudget',
        targetelement: 'Weight',
        validation: 'required',
      },
    //   {
    //     InternalName: 'Weight',
    //     DisplayNameEn: 'Weight',
    //     DisplayName: 'الوزن المكافئ للإنجاز %',
    //     type: 'decimalpercentage',
    //     validation: 'required',
    //     security: {
    //       groups: ['VRO_E', 'LMS_E', 'System Admin Group', 'EPMO'],
    //     },
    //   },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن(%)',
        DisplayName: 'الوزن المكافئ للإنجاز %',
        type: 'weightfloatpercentage',
        listname: 'Milestones',
        targetcode: 'InitiativeCode',
        targetelement: 'Weight',
        seconedtarget: 'Amount',
        validation: 'required',
        security: {
            groups: ['VRO_E', 'LMS_E', 'System Admin Group', 'EPMO'],
          },
      },

      // {
      //     "InternalName": "Completed",
      //     "DisplayNameEn": "Completed",
      //     "DisplayName": "حالة الاكتمال",
      //     "type": "yesnoradio",
      //     options: {
      //         choices: [{
      //             display: 'yes',
      //             value: 'yes'
      //         },
      //         {
      //             display: 'no',
      //             value: 'no'
      //         }
      //         ]
      //     },
      //     security: {
      //         groups: ['VRO_E','LMS_E','System Admin Group',
      //             'EPMO'
      //         ]
      //     },
      // },
      {
        InternalName: 'Delivered',
        DisplayName: 'تم التسليم',
        DisplayNameEn: 'Delivered',
        type: 'yesnoradio',
        options: {
          choices: [
            { display: 'yes', value: 'true' },
            { display: 'no', value: 'false' },
          ],
        },
        security: {
          groups: ['VRO_E', 'LMS_E', 'System Admin Group', 'EPMO'],
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
    ],
  },
  {
    label: 'الوثائق الداعمة',
    labelEn: 'Supporting Documents',
    description: '',
    descriptionEn: '',
    subFields: [
      {
        // "InternalName": "getfile",
        InternalName: 'getfile',
        DisplayName: 'المرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        withAddBtn: 'true',
      },
    ],
  },
]
