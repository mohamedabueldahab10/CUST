var Information_Form = [
  {
    label: 'بيانات المخرج',
    labelEn: 'Delivrable Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    formValuesBasedOnParent: [
      {
        parentList: 'Projects', parentFieldName: 'Title', fieldName: 'InitiativeType',basedOnCondition: true, basedOnFieldName: "Delivered", basedOnFieldValue: "yes",
        valueToSet: [
          {
            condition: "vision", values: [
              { fieldNameInList: "WFModuleCode", fieldValueInList: "VROProjDeliverable" },
              {
								fieldNameInList: "WFInitiatedBy",
								fieldValueInList: "LoggedInUser",
							},
              { fieldNameInList: "WFStage", fieldValueInList: "VROProjDeliverable01" },]
          },
          {
            condition: "lms",
            values: [{ fieldNameInList: "WFModuleCode", fieldValueInList: "LMSProjDeliverable" },
            {
              fieldNameInList: "WFInitiatedBy",
              fieldValueInList: "LoggedInUser",
            },
            { fieldNameInList: "WFStage", fieldValueInList: "LMSProjDeliverable01" }]
          },
          {
            condition: "strategically",
            values: [{ fieldNameInList: "WFModuleCode", fieldValueInList: "EPMOProjDeliverable" },
            {
              fieldNameInList: "WFInitiatedBy",
              fieldValueInList: "LoggedInUser",
            },
            { fieldNameInList: "WFStage", fieldValueInList: "EPMOProjDeliverable01" }]
          },

        ]
      }
    ],
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayName":"رمز المخرج",
      // "DisplayNameEn": "Deliverable Title",

      //     "type":"string",
      //     "validation": "required"
      // },
      {
        InternalName: 'Name',
        DisplayName: 'اسم المخرج',
        DisplayNameEn: 'Name',
        type: 'string',
        validation: 'required',
        maxchar: '255',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        // withletters: true,
        Errmsgkey: "withletterpattern",
        security: {
          groups: [
            'System Admin Group','EPMO','LMSU-Execution','VRO_E'
          ]
      },
      },
      {
        InternalName: 'Description',
        DisplayName: 'الوصف',
        DisplayNameEn: 'Description',
        type: 'multiline',
        maxchar: 5000,        
        validation: 'required',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        security: {
          groups: [
            'System Admin Group','EPMO','LMSU-Execution','VRO_E'
          ]
      },
      },
      // {
      //     "InternalName": "Weight",
      //     "DisplayName": "الوزن / القيمة (%)",
      //     "DisplayNameEn": "Weight/Value (%)",
      //     "type": "floatpercentage",
      //     "validation": "required",

      // },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن(%)',
        DisplayNameEn: 'Weight (%)',
        type: 'weightfloatpercentage',
        listname: 'Deliverables',
        targetcode: 'ProjectCode',
        targetelement: 'Weight',
        seconedtarget: 'Amount',
        descPhraseAr: "من التكلفة",
        descPhraseEn: " From Budget", 
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
        // dontSubmit: true,
        type: 'percentbyrelatedparent',
        listname: 'Projects',
        parentinternalname: 'ActualBudget',
        descPhraseAr: "من التكلفة",
        descPhraseEn: " From Budget", 
        targetelement: 'Weight',
        validation: 'required',
        security: {
          groups: [
            'System Admin Group','EPMO','LMSU-Execution','VRO_E'
          ]
      },
      },
      {
        InternalName: 'Quantity',
        DisplayNameEn: 'Quantity',
        DisplayName: 'الكمية',
        type: "number",    
        validation: 'required',
      },
      // {
      //   "InternalName": "Status",
      //   "DisplayName": "الحالة",
      //   "DisplayNameEn": "Status",
      //   "type": "dropdownValues",
      //   options: {
      //     choices: [
      //       { display: 'workinprogress', value: 'workinprogress' },
      //       { display: 'completed', value: 'completed' }
      //     ]
      //   }
      // },
      // {
      //     "InternalName": "PlannedStartDate",
      //     "DisplayName": "تاريخ البدء المخطط",
      //     "DisplayNameEn": "Planned Start Date",
      //     "type": "datetime",
      //     "max": "PlannedFinishDate"
      // },
      // {
      //   InternalName: 'ActualDate',
      //   DisplayName: 'تاريخ الاكتمال الفعلي',
      //   DisplayNameEn: 'Actual Date',
      //   type: 'datetime',
      //   max: 'today',
      //   validation: 'required',
      // },
      {
        InternalName: 'PlannedFinishDate',
        DisplayName: 'تاريخ الانتهاء المخطط',
        DisplayNameEn: 'Planned Finish Date',
        // "type": "datetime",
        type: 'datetimetoparent',
        Errmsgkey:'btwndatepattern',
        listname: 'Projects',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
        // "min": "PlannedStartDate",
        validation: 'required',
        security: {
          groups: [
            'System Admin Group','EPMO','LMSU-Execution','VRO_E'
          ]
      },
      },
      // {
      //     "InternalName": "SupplyDate",
      //     "DisplayName": "تاريخ التوريد",
      //     "DisplayNameEn": "Supply Date",
      //     "type": "datetime"
      // },
      // {
      //     "InternalName": "CommittedDate",
      //     "DisplayName": "تاريخ الالتزام",
      //     "DisplayNameEn": "Committed Date",
      //     "type": "datetime",
      //     "validation": "required"
      // },
      // {
      //     "InternalName": "StartDate",
      //     "DisplayName": "تاريخ البدءالفعلي",
      //     "DisplayNameEn": "Actual Start Date",
      //     "type": "datetime",
      //     "max":"today"
      // },
      // {
      //     "InternalName": "FinishDate",
      //     "DisplayName": "تاريخ الانتهاء الفعلي",
      //     "DisplayNameEn": "Actual Finish Date",
      //     "type": "datetime",
      //     "min": "StartDate",
      //     "max":"today"
      // },

      // {
      //   InternalName: 'Delivered',
      //   DisplayName: 'تم التسليم',
      //   DisplayNameEn: 'Delivered',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       { display: 'yes', value: 'yes' },
      //       { display: 'no', value: 'no' },
      //     ],
      //   },
      // },

      {
        InternalName: 'Delivered',
        DisplayName: 'مكتمل',
        DisplayNameEn: 'Completed',
        targetfieldrequired: 'getFile', // to make the attache required on yes
        targetfield: 'Status',
        targetfieldvalue: 'completed',
        type: 'yesnoradio',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            {
              display: 'no', value: 'no',
            },
          ],
        },
      },
      {
        InternalName: 'DeliveredDate',
        DisplayName: 'تاريخ التسليم',
        DisplayNameEn: 'Delivered Date',
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Projects', // list name
        startinternalname: 'BaselineStartDate', // internalname of parent start
        endinternalname: 'BaselineFinishDate',
        max: 'today',
        Errmsgkey: 'cancelationdatepattern',
        // "validation": "required",
      },
      {
        InternalName: 'AcceptanceCriteria',
        DisplayName: 'معايير قبول المخرج',
        DisplayNameEn: 'Acceptance Criteria',
        type: 'multiline',
        "validation": "required",
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        security: {
          groups: [
            'System Admin Group','EPMO','LMSU-Execution','VRO_E'
          ]
      },

      },
      {
        InternalName: 'Comments',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        security: {
          groups: [
            'System Admin Group','EPMO','LMSU-Execution','VRO_E'
          ]
      },
      },
      // {
      //   "InternalName": "RelatedInitiativeDeliverable",
      //   "DisplayNameEn": "Related Initiative Deliverable",
      //   "DisplayName": "مخرج المبادرة المرتبط",
      //   "type": "lookup",
      //   "source": "InitiativeDeliverables",
      //   "Dispfieldkey": "Name",
      //   "valfieldkey": "Title",
      // },
      {
        //tried
        InternalName: 'RelatedInitiativeDeliverable',
        DisplayName: 'مخرج المبادرة المرتبط',
        DisplayNameEn: 'Related Initiative Deliverable',
        type: 'lookuptoparentchild',
        parentlist: 'Projects', //parent list name
        parentinternalname: 'RelatedInitiative', // internal name in parent list
        source: 'InitiativeDeliverables', // target list
        sourceinternalname: 'InitiativeCode', // column in target list
        Dispfieldkey: 'Name', //display in dropdown
        valfieldkey: 'Title', // value in dropdown        
        validation: "required",
        security: {
          groups: [
            'System Admin Group','EPMO','LMSU-Execution','VRO_E'
          ]
      },
      },
      {
        InternalName: 'ShowInProgramReport',
        DisplayName: 'اظهار في التقرير',
        DisplayNameEn: 'Show In Program Report',
        type: 'yesnoradio',
        options: {
          choices: [
            {
              display: 'yes',
              value: 'yes',
            },
            {
              display: 'no',
              value: 'no',
            },
          ],
        },
        security: {
          groups: [
            'System Admin Group','EPMO','LMSU-Execution','VRO_E'
          ]
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
        docPurpose: "Spporting_Documents",
        withAddBtn: 'true',     
        validation: 'required',
        descPhraseAr: "ملفات مطلوبة عند الاغلاق",
        descPhraseEn: "File required after closing",
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
        docPurpose: "Attachments",
        withAddBtn: 'true',        
        descPhraseAr: "ملفات متعلقة بالعنصر",
        descPhraseEn: "File related to the item",        
        // validation: 'required',
      //   security: {
      //     groups: [
      //       'System Admin Group','EPMO','LMSU-Execution','VRO_E'
      //     ]
      // },
      },
    ],
  },
  // {
  //   label: 'وثائق داعمة',
  //   labelEn: 'Supporting Documents',
  //   description: 'التفاصيل',
  //   descriptionEn: 'Details',
  //   subFields: [
  //     {
  //       InternalName: 'getfile',
  //       DisplayName: 'مرفقات',
  //       DisplayNameEn: 'Attachments',
  //       type: 'file',
  //       withAddBtn: 'true',
  //       // "validation": "required",
  //     },
  //   ],
  // },
]
