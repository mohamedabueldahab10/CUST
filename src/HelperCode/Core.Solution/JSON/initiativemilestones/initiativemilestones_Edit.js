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
              {
								fieldNameInList: "WFInitiatedBy",
								fieldValueInList: "LoggedInUser",
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
              {
								fieldNameInList: "WFInitiatedBy",
								fieldValueInList: "LoggedInUser",
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
              {
								fieldNameInList: "WFInitiatedBy",
								fieldValueInList: "LoggedInUser",
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
        // withletters: true,
        Errmsgkey: 'withletterpattern',
        validation: 'required',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",  
        security: {
          groups: ['System Admin Group','EPMO','LMSU-Execution','VRO_E'],
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
          groups: ['System Admin Group','EPMO','LMSU-Execution','VRO_E'],
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
      //       'System Admin Group','EPMO','LMSU-Execution','VRO_E'
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
          groups: ['System Admin Group','EPMO','LMSU-Execution','VRO_E'],
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
          groups: ['System Admin Group','EPMO','LMSU-Execution','VRO_E'],
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
        // disableonstage:"approved",
        enableOnWfTaskStage: 'EPMOInitiativeMilestone00,VROInitiativeMilestone00,LMSInitiativeMilestone00',
        requireOnWfTaskStage: 'EPMOInitiativeMilestone00,VROInitiativeMilestone00,LMSInitiativeMilestone00',
        targetfieldrequired: 'ActualCompletedDate',
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
        // disableonstage:"approved",
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
        validation: 'required',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        security: {
          groups: [ 'System Admin Group','EPMO','LMSU-Execution','VRO_E'],
        },
        initiativeCodeInList: true,
      },
      
    ],
  },
  {
    label: 'الوثائق داعمة',
    labelEn: 'Supporting Documents',
    description: '',
    // hideOnWfTaskStage :'EPMOInitiativeMilestone00,VROInitiativeMilestone00,LMSInitiativeMilestone00',
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
        // hideOnWfTaskStage :'EPMOInitiativeMilestone00,VROInitiativeMilestone00,LMSInitiativeMilestone00',
        // security: {
        //   groups: [ 'System Admin Group','EPMO','LMSU-Execution','VRO_E'],
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
        validation: 'required',
        // hideOnWfTaskStage :'EPMOInitiativeMilestone00,VROInitiativeMilestone00,LMSInitiativeMilestone00',
        // security: {
        //   groups: [ 'System Admin Group','EPMO','LMSU-Execution','VRO_E'],
        // },
      },
    ],
  },
  {
    label: 'المرفقات',
    labelEn: 'Attachments',
    description: 'التفاصيل',
    // hideOnWfTaskStage :'EPMOInitiativeMilestone00,VROInitiativeMilestone00,LMSInitiativeMilestone00',
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
        // hideOnWfTaskStage :'EPMOInitiativeMilestone00,VROInitiativeMilestone00,LMSInitiativeMilestone00',
        // security: {
        //   groups: [ 'System Admin Group','EPMO','LMSU-Execution','VRO_E'],
        // },
      },
    ],
  },
]
