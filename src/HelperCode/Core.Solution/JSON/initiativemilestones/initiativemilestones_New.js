var Information_Form = [
  {
    label: 'المعلم المبادرة',
    labelEn: 'Initiative Milestone',
    description: 'التفاصيل',
    descriptionEn: 'Details',
  //   formDefaultValues: [
  //   //VRO
  //   { fieldName: 'WFModuleCode', value: 'VROInitiativeMilestone',roles: ['VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },
  //   { fieldName: 'WFStage', value: 'VROInitiativeMilestone01',roles: ['VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },
    
  //   //EPMOCOC
  //   { fieldName: 'WFModuleCode', value: 'EPMOInitiativeMilestone',roles: ['EPMO','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },
  //   { fieldName: 'WFStage', value: 'EPMOInitiativeMilestone01',roles: ['EPMO','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },

  //   //LMS
  //   { fieldName: 'WFModuleCode', value: 'LMSInitiativeMilestone',roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },
  //   { fieldName: 'WFStage', value: 'LMSInitiativeMilestone01',roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },

  // ],
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
        // withletters:true,
        Errmsgkey:"withletterpattern",
        validation: 'required',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
      },
      {
        InternalName: 'PlannedCompletedDate',
        DisplayNameEn: 'Planned Completed Date',
        DisplayName: 'تاريخ الاكتمال المخطط',
        // type: 'datetime',
        type: 'datetimetoparent',
        Errmsgkey:'btwndatepattern',
        listname: 'Initiatives',
        startinternalname: 'StartDate',
        endinternalname: 'FinishDate',
        validation: 'required',
      },
      // {
      //   InternalName: 'PlannedDate',
      //   DisplayName: 'تاريخ الاكتمال المخطط',
      //   DisplayNameEn: 'Planned Finish Date',
      //   type: 'datetime',
      //   validation: 'required',
      // },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن المكافئ للإنجاز %',
        DisplayNameEn: 'Weight (%)',
        type: 'weightfloatpercentage',
        listname: 'InitiativeMilestones',
        targetcode: 'InitiativeCode',
        targetelement: 'Weight',
        seconedtarget: 'Amount',
        // "state":"disabled",
        validation: 'required',
        descPhraseAr: "من ميزانية المبادرة",
        descPhraseEn: " From Initiative Budget", 
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
      },
      //  {
      //     "InternalName": "Weight",
      //     "DisplayNameEn": "Weight",
      //     "DisplayName":"الوزن المكافئ للإنجاز %",
      //     "type":"floatpercentage",
      //     "validation": "required",
      //   },
      //   {
      //     InternalName: 'Weight',
      //     DisplayNameEn: 'Weight',
      //     DisplayName: 'الوزن المكافئ للإنجاز %',
      //     type: 'decimalpercentage',
      //     validation: 'required',
      //   },
      // {
      //     "InternalName": "Completed",
      //     "DisplayNameEn": "Completed",
      //     "DisplayName":"حالة الاكتمال",
      //     "type": "yesnoradio",
      //     options: {
      //         choices: [{
      //                 display: 'yes',
      //                 value: 'yes'
      //             },
      //             {
      //                 display: 'no',
      //                 value: 'no'
      //             }
      //         ]
      //     }
      // },
      // {
      //   InternalName: 'Delivered',
      //   DisplayName: 'تم التسليم',
      //   DisplayNameEn: 'Delivered',
      //   targetfieldrequired:"ActualCompletedDate",
      //   type: 'yesnoradio',
      //   options: {
      //     choices: [
      //       { display: 'yes', value: 'true' },
      //       { display: 'no', value: 'false' },
      //     ],
      //   },
      // },
      {
        InternalName: 'ActualCompletedDate',
        DisplayNameEn: 'Actual Completed Date',
        DisplayName: 'تاريخ الاكتمال الفعلي',
        type: 'datetime',
        // type: 'datetimetoparent',
        // listname: 'Initiatives',
        // startinternalname: 'StartDate',
        // endinternalname: 'FinishDate',
        // max: 'today',
        // Errmsgkey: 'cancelationdatepattern',
      },
      {
        InternalName: 'RelatedInitiativeDeliverable',
        DisplayNameEn: 'Related Initiative Deliverable',
        DisplayName: 'مخرج المبادرة المرتبط',
        type: 'lookup',
        source: 'InitiativeDeliverables',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        initiativeCodeInList: true,        
        validation: 'required',
      },
      {
        InternalName: 'SupportDocumentsDescription',
        DisplayNameEn: 'Support Documents Description',
        DisplayName: 'وصف الوثائق الداعمة',
        type: 'multiline',
        maxchar: '5000',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        validation: 'required',
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
        docPurpose:"Spporting_Documents",
        withAddBtn: 'true', 
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
        docPurpose:"Attachments",
        withAddBtn: 'true',
        descPhraseAr: "ملفات متعلقة بالعنصر",
        descPhraseEn: "File related to the item",
      },
    ],
  },
]
