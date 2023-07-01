var Information_Form = [
  {
    label: 'المعلم المبادرة',
    labelEn: 'Initiative Milestone',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    formValuesBasedOnParent: [
      {
        parentList: 'Initiatives',
        parentFieldName: 'Title',
        fieldName: 'Types',
        basedOnCondition: true,
        basedOnFieldName: 'Delivered',
        basedOnFieldValue: 'yes',
        valueToSet: [
          {
            condition: 'vision',
            values: [
              {
                fieldNameInList: 'WFModuleCode',
                fieldValueInList: 'VROInitiativeMilestone',
              },
              {
                fieldNameInList: 'WFStage',
                fieldValueInList: 'VROInitiativeMilestone01',
              },
            ],
          },
          {
            condition: 'lms',
            values: [
              {
                fieldNameInList: 'WFModuleCode',
                fieldValueInList: 'LMSInitiativeMilestone',
              },
              {
                fieldNameInList: 'WFStage',
                fieldValueInList: 'LMSInitiativeMilestone01',
              },
            ],
          },
          {
            condition: 'strategically',
            values: [
              {
                fieldNameInList: 'WFModuleCode',
                fieldValueInList: 'EPMOInitiativeMilestone',
              },
              {
                fieldNameInList: 'WFStage',
                fieldValueInList: 'EPMOInitiativeMilestone01',
              },
            ],
          },
        ],
      },
    ],
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
        maxchar: '255',
        withletters: true,
        Errmsgkey: 'withletterpattern',
        validation: 'required',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",  
        security: {
          groups: ['EPMO', 'System Admin Group'],
        },
      },
      {
        InternalName: 'PlannedCompletedDate',
        DisplayNameEn: 'Planned Completed Date',
        DisplayName: 'تاريخ الاكتمال المخطط',
        // "type": "datetime",
        type: 'datetimetoparent',
        Errmsgkey:'btwndatepattern',
        listname: 'Initiatives',
        startinternalname: 'StartDate',
        endinternalname: 'FinishDate',
        validation: 'required',
        security: {
          groups: ['VRO_E', 'LMS_E', 'System Admin Group', 'EPMO'],
        },
      },
      // {
      //   InternalName: 'PlannedDate',
      //   DisplayName: 'تاريخ الاكتمال المخطط',
      //   DisplayNameEn: 'Planned Finish Date',
      //   type: 'datetime',
      //   validation: 'required',
      //   security: {
      //     groups: [
      //       'EPMO', 'System Admin Group'
      //     ]
      // },
      // },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن(%)',
        DisplayName: 'الوزن المكافئ للإنجاز %',
        type: 'weightfloatpercentage',
        listname: 'InitiativeMilestones',
        targetcode: 'InitiativeCode',
        targetelement: 'Weight',
        seconedtarget: 'Amount',
        validation: 'required',
        descPhraseAr: "من ميزانية المبادرة",
        descPhraseEn: " From Initiative Budget", 
        security: {
          groups: ['EPMO', 'System Admin Group'],
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
        descPhraseAr: "من ميزانية المبادرة",
        descPhraseEn: " From Initiative Budget", 
        security: {
          groups: ['EPMO', 'System Admin Group'],
        },
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
        targetfieldrequired: 'ActualCompletedDate',
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
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Initiatives',
        startinternalname: 'StartDate',
        endinternalname: 'FinishDate',
        max: 'today',
        Errmsgkey: 'cancelationdatepattern',
      },
      {
        InternalName: 'RelatedInitiativeDeliverable',
        DisplayNameEn: 'Related Initiative Deliverable',
        DisplayName: 'مخرج المبادرة المرتبط',
        type: 'lookup',
        source: 'InitiativeDeliverables',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        security: {
          groups: ['EPMO', 'System Admin Group'],
        },
        initiativeCodeInList: true,
      },
      
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
        DisplayName: 'الوثائق الداعمة',
        DisplayNameEn: 'Supporting Documents',
        type: 'file',
        docPurpose: 'Spporting_Documents',
        withAddBtn: 'true',
        descPhraseAr: "ملفات مطلوبة عند الاغلاق",
        descPhraseEn: "File required after closing",
        // security: {
        //   groups: ['EPMO', 'System Admin Group'],
        // },
      },
      {
        InternalName: 'SupportDocumentsDescription',
        DisplayNameEn: 'Support Documents Description',
        DisplayName: 'وصف الوثائق الداعمة',
        type: 'multiline',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        maxchar: '5000',
        // security: {
        //   groups: ['EPMO', 'System Admin Group'],
        // },
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
        docPurpose: 'Attachments',
        withAddBtn: 'true',
        descPhraseAr: "ملفات متعلقة بالعنصر",
        descPhraseEn: "File related to the item",
        // security: {
        //   groups: ['EPMO', 'System Admin Group'],
        // },
      },
    ],
  },
]
