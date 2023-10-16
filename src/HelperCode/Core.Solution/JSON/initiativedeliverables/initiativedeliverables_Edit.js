var Information_Form = [
  {
    label: 'مخرج المبادرة',
    labelEn: 'Initiative Deliverable',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    formValuesBasedOnParent: [
      {
        parentList: 'Initiatives', parentFieldName: 'Title', fieldName: 'Types', basedOnCondition: true,basedOnFieldName: "Delivered", basedOnFieldValue: "yes",
        valueToSet: [
          {
            condition: "vision", values: [
              { fieldNameInList: "WFModuleCode", fieldValueInList: "VROInitiativeDeliverable" },
              { fieldNameInList: "WFStage", fieldValueInList: "VROInitiativeDeliverable01" },]
          },
          {
            condition: "lms",
            values: [{ fieldNameInList: "WFModuleCode", fieldValueInList: "LMSInitiativeDeliverable" },
            { fieldNameInList: "WFStage", fieldValueInList: "LMSInitiativeDeliverable01" }]
          },
          {
            condition: "strategically",
            values: [{ fieldNameInList: "WFModuleCode", fieldValueInList: "EPMOInitiativeDeliverable" },
            { fieldNameInList: "WFStage", fieldValueInList: "EPMOInitiativeDeliverable01" }]
          },
        ]
      }
    ],
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
        // withletters:true,
        Errmsgkey:"withletterpattern",
        validation: 'required',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",  
        security: {
          groups: [
            'System Admin Group','EPMO','LMSU-Execution','VRO_E'
          ]
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
        InternalName: 'PlannedCompletedDate',
        DisplayName: 'تاريخ الاكتمال المخطط',
        DisplayNameEn: 'Planned Completed Date',
        // "type": "datetime",
        type: 'datetimetoparent',
        Errmsgkey:'btwndatepattern',
        listname: 'Initiatives',
        startinternalname: 'StartDate',
        endinternalname: 'FinishDate',
        // "min": "PlannedStartDate",
        validation: 'required',
        security: {
          groups: [
            'System Admin Group','EPMO','LMSU-Execution','VRO_E'
          ]
      },
      },
      {
        InternalName: 'DeliverableSuccessKPI',
        DisplayNameEn: 'Deliverable Success KPI',
        DisplayName: 'مقياس نجاح المخرج',
        type: 'string',
        maxchar: 255,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",  
        security: {
          groups: [
            'System Admin Group','EPMO','LMSU-Execution','VRO_E'
          ]
      },
      },
      {
        InternalName: 'Classification',
        DisplayName: 'تصنيف المخرج',
        DisplayNameEn: 'Classification',
        validation: 'required',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'operationally',
              value: 'operationally',
            },
            {
              display: 'transformationally',
              value: 'transformationally',
            },
          ],
        },
      
      },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف المخرج',
        maxchar: 5000,
        type: 'multiline',
        // validation: 'required',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        InternalName: 'Target',
        DisplayNameEn: 'Target',
        DisplayName: 'المستهدف (إن وجد)',
        type: 'float',
        numberOfDigits:"15",
        security: {
          groups: [
            'System Admin Group','EPMO','LMSU-Execution','VRO_E'
          ]
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
        descPhraseAr: "من ميزانية المبادرة",
        descPhraseEn: " From Initiative Budget", 
        // "state":"disabled",
        validation: 'required',
        security: {
          groups: [
            'System Admin Group','EPMO','LMSU-Execution','VRO_E'
          ]
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
        descPhraseAr: "من ميزانية المبادرة",
        descPhraseEn: " From Initiative Budget", 
        validation: 'required',
        security: {
          groups: [
            'System Admin Group','EPMO','LMSU-Execution','VRO_E'
          ]
      },
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
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
          ],
        },
      },
      {
        InternalName: "WFStage",
        DisplayName: " المرحلة",
        DisplayNameEn: "Stage",
        type: 'lookup',
        source: "Tasks Configuration",
        Dispfieldkey: "TaskNameAr",
        DispfieldkeyEn: 'TaskNameEn',
        valfieldkey: "Title",
        "state": "disabled",
        display:'none'
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
        descPhraseAr: "ملفات مطلوبة عند الاغلاق",
        descPhraseEn: "File required after closing",
      //   security: {
      //     groups: [
      //       'EPMO', 'System Admin Group'
      //     ]
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
        docPurpose:"Attachments",
        withAddBtn: 'true',
        descPhraseAr: "ملفات متعلقة بالعنصر",
        descPhraseEn: "File related to the item",
      //   security: {
      //     groups: [
      //       'EPMO', 'System Admin Group'
      //     ]
      // },
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
