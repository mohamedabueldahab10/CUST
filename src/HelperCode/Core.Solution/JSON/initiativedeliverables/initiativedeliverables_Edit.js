var Information_Form = [
  {
    label: 'مخرج المبادرة',
    labelEn: 'Initiative Deliverable',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayNameEn": "Title",
      //     "DisplayName":"رمز المنفعة",
      //     "type":"string",
      //     "maxchar": "250"
      // },
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'اسم المخرج',
        type: 'string',
        maxchar: '255',
        withletters:true,
        Errmsgkey:"withletterpattern",
        validation: 'required',
        security: {
          groups: ['VRO_E', 'LMS_E', 'EPMO', 'System Admin Group'],
        },
      },
      //   {
      //     InternalName: 'PlannedCompletedDate',
      //     DisplayNameEn: 'Planned Completed Date',
      //     DisplayName: 'تاريخ الاكتمال المخطط',
      //     type: 'datetime',
      //     validation: 'required',
      //     security: {
      //       groups: ['VRO_E', 'LMS_E', 'EPMO', 'System Admin Group'],
      //     },
      //   },
      {
        InternalName: 'PlannedFinishDate',
        DisplayName: 'تاريخ الانتهاء المخطط',
        DisplayNameEn: 'Planned Finish Date',
        // "type": "datetime",
        type: 'datetimetoparent',
        listname: 'Initiatives',
        startinternalname: 'StartDate',
        endinternalname: 'FinishDate',
        // "min": "PlannedStartDate",
        validation: 'required',
        security: {
          groups: ['VRO_E', 'LMS_E', 'EPMO', 'System Admin Group'],
        },
      },
      {
        InternalName: 'DeliverableSuccessKPI',
        DisplayNameEn: 'Deliverable Success KPI',
        DisplayName: 'مقياس نجاح المخرج  (إن وجد)',
        type: 'string',
        maxchar: 255,
        security: {
          groups: ['VRO_E', 'LMS_E', 'EPMO', 'System Admin Group'],
        },
      },
      {
        InternalName: 'Target',
        DisplayNameEn: 'Target',
        DisplayName: 'المستهدف (إن وجد)',
        type: 'float',
        numberOfDigits:"15",
        security: {
          groups: ['VRO_E', 'LMS_E', 'EPMO', 'System Admin Group'],
        },
      },
      // {
      //     "InternalName": "CommittedDate",
      //     "DisplayName": "تاريخ الالتزام",
      //     "DisplayNameEn": "Committed Date",
      //     "type": "datetime",
      //     security: {
      //         groups: ['VRO_E','LMS_E',
      //             'EPMO', 'System Admin Group'
      //         ]
      //     },
      // },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن(%)',
        DisplayNameEn: 'Weight (%)',
        type: 'weightfloatpercentage',
        listname: 'InitiativeDeliverables',
        targetcode: 'InitiativeCode',
        targetelement: 'Weight',
        seconedtarget: 'Amount',
        // "state":"disabled",
        validation: 'required',
        security: {
          groups: ['VRO_E', 'LMS_E', 'EPMO', 'System Admin Group'],
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
      // {
      //   InternalName: 'Weight',
      //   DisplayNameEn: 'Weight',
      //   DisplayName: 'القيمة',
      //   type: 'floatpercentage',
      //   validation: 'required',
      //   security: {
      //     groups: ['VRO_E', 'LMS_E', 'EPMO', 'System Admin Group'],
      //   },
      // },
      {
        InternalName: 'Delivered',
        DisplayName: 'تم التسليم',
        DisplayNameEn: 'Delivered',
        type: 'yesnoradio',
        targetfieldrequired:"ActualCompletedDate",
        options: {
          choices: [
            { display: 'yes', value: 'true' },
            { display: 'no', value: 'false' },
          ],
        },
        security: {
          groups: ['VRO_E', 'LMS_E', 'EPMO', 'System Admin Group'],
        },
      },
      {
        InternalName: 'ActualCompletedDate',
        DisplayNameEn: 'Actual Completed Date',
        DisplayName: 'تاريخ الاكتمال الفعلي',
        type: 'datetime',
        max: 'today',
      },
      //   {
      //     InternalName: 'Completed',
      //     DisplayNameEn: 'Completed',
      //     DisplayName: 'حالة الاكتمال',
      //     type: 'yesnoradio',
      //     options: {
      //       choices: [
      //         {
      //           display: 'yes',
      //           value: 'yes',
      //         },
      //         {
      //           display: 'no',
      //           value: 'no',
      //         },
      //       ],
      //     },
      //     security: {
      //       groups: ['VRO_E', 'LMS_E', 'EPMO', 'System Admin Group'],
      //     },
      //   },
  
      // {
      //     "InternalName": "RelatedBenefits",
      //     "DisplayNameEn": "Related Benefits",
      //     "DisplayName":"المنفعة المرتبطة",
      //     "type": "lookup",
      //     "source": "Benefits",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title",
      //     security: {
      //         groups: ['VRO_E','LMS_E',
      //             'EPMO', 'System Admin Group'
      //         ]
      //     },
      // }
    ],
  },
  {
    label: 'الوثائق داعمة',
    labelEn: 'Supporting Documents',
    description: '',
    descriptionEn: '',
    subFields: [
      {
        InternalName: 'getfile',
        DisplayName: 'الوثائق داعمة',
        DisplayNameEn: 'Supporting Documents',
        type: 'file',
        docPurpose:"Spporting_Documents",
        withAddBtn: 'true',
      },
    ],
  },
  {
    label: 'المرفقات',
    labelEn: 'Attachments',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'getfile',
        DisplayName: 'المرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        docPurpose:"Attachments",
        withAddBtn: 'true',
      },
    ],
  },
  // {
  //   label: 'الوثائق الداعمة',
  //   labelEn: 'Supporting Documents',
  //   description: '',
  //   descriptionEn: '',
  //   subFields: [
  //     {
  //       InternalName: 'getfile',
  //       DisplayName: 'المستندات',
  //       DisplayNameEn: 'Supporting Data',
  //       type: 'file',
  //       withAddBtn: 'true',
  //     },
  //   ],
  // },
]
