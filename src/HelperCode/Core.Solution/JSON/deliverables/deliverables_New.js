var Information_Form = [
  {
    label: 'بيانات المخرج',
    labelEn: 'Delivrable Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    // formValuesBasedOnParent: [
    //   {
    //     parentList: 'Projects', parentFieldName: 'Title', fieldName: 'InitiativeType',
    //     valueToSet: [
    //       {
    //         condition: "vision", values: [
    //           { fieldNameInList: "WFModuleCode", fieldValueInList: "VROProjDeliverable" },
    //           { fieldNameInList: "WFStage", fieldValueInList: "VROProjDeliverable01" },]
    //       },
    //       {
    //         condition: "lms",
    //         values: [{ fieldNameInList: "WFModuleCode", fieldValueInList: "LMSProjDeliverable" },
    //         { fieldNameInList: "WFStage", fieldValueInList: "LMSProjDeliverable01" }]
    //       },
    //       {
    //         condition: "strategically",
    //         values: [{ fieldNameInList: "WFModuleCode", fieldValueInList: "EPMOProjDeliverable" },
    //         { fieldNameInList: "WFStage", fieldValueInList: "EPMOProjDeliverable01" }]
    //       },

    //     ]
    //   }
    // ],
    // formDefaultValues: [
    //   //VRO
    //   { fieldName: 'WFModuleCode', value: 'VROProjDeliverable', roles: ['Administrator', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'VROE'], },
    //   { fieldName: 'WFStage', value: 'VROProjDeliverable01', roles: ['Administrator', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'VROE'], },
    //   { fieldName: 'DraftStatus', value: 'draft', roles: ['Administrator', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'VROE'], },

    //   //EPMOCOC
    //   { fieldName: 'WFModuleCode', value: 'EPMOProjDeliverable', roles: ['Administrator', 'EPMO', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'], },
    //   { fieldName: 'WFStage', value: 'EPMOProjDeliverable01', roles: ['Administrator', 'EPMO', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'], },
    //   { fieldName: 'DraftStatus', value: 'draft', roles: ['Administrator', 'EPMO', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'], },

    //   //LMS
    //   { fieldName: 'WFModuleCode', value: 'LMSProjDeliverable', roles: ['Administrator', 'LMSE', 'LMSP', 'LMSUExecution', 'LMSUPerformance', 'LMSUControl'], },
    //   { fieldName: 'WFStage', value: 'LMSProjDeliverable01', roles: ['Administrator', 'LMSE', 'LMSP', 'LMSUExecution', 'LMSUPerformance', 'LMSUControl'], },
    //   { fieldName: 'DraftStatus', value: 'draft', roles: ['Administrator', 'LMSE', 'LMSP', 'LMSUExecution', 'LMSUPerformance', 'LMSUControl'], },

    // ],
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayName":"رمز المخرج",
      //     "type":"string",
      //     "validation": "required"
      // },
      {
        InternalName: 'Name',
        DisplayName: 'اسم المخرج',
        DisplayNameEn: 'Deliverable Name',
        type: 'string',
        validation: 'required',
        maxchar: '255',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        withletters: true,
        Errmsgkey: "withletterpattern",
      },
      {
        InternalName: 'Description',
        DisplayName: 'الوصف',
        DisplayNameEn: 'Description',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      // {
      //     "InternalName": "Quantity",
      //     "DisplayName":"الكمية",
      //     "type":"float"
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
        // "state":"disabled",
        validation: 'required',
      },
      {
        InternalName: 'Amount',
        DisplayName: 'القيمة',
        DisplayNameEn: 'Amount',
        dontSubmit: true,
        type: 'percentbyrelatedparent',
        listname: 'Projects',
        parentinternalname: 'ActualBudget',
        targetelement: 'Weight',
        validation: 'required',
      },
      // {
      //   InternalName: 'Status',
      //   DisplayName: 'الحالة',
      //   DisplayNameEn: 'Status',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       { display: 'ontrack', value: 'ontrack' },
      //       { display: 'late', value: 'late' },
      //       { display: 'completed', value: 'completed' },
      //     ],
      //   },
      // },
      // {
      //   InternalName: 'ActualDate',
      //   DisplayName: 'تاريخ الاكتمال الفعلي',
      //   DisplayNameEn: 'Actual Date',
      //   type: 'datetime',
      //   max: 'today',
      //   validation: 'required',
      // },
      // {
      //   InternalName: 'DeliveredDate',
      //   DisplayName: 'تاريخ التسليم',
      //   DisplayNameEn: 'Delivered Date',
      //   type: 'datetime',
      //   max: 'today',
      //   validation: 'required',
      // },
      {
        InternalName: 'PlannedFinishDate',
        DisplayName: 'تاريخ الانتهاء المخطط',
        DisplayNameEn: 'Planned Finish Date',
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Projects',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
        // min: 'PlannedStartDate',
        validation: 'required',
      },
      // {
      //   InternalName: 'Delivered',
      //   DisplayName: 'تم التسليم',
      //   DisplayNameEn: 'Delivered',
      //   type: 'yesnoradio',
      //   targetfield: 'Status',
      //   targetfieldvalue: 'completed',
      //   options: {
      //     choices: [
      //       { display: 'yes', value: 'yes' },
      //       { display: 'no', value: 'no' },
      //     ],
      //   },
      // },
      {
        InternalName: 'AcceptanceCriteria',
        DisplayName: 'معايير قبول المخرج',
        DisplayNameEn: 'Acceptance Criteria',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      // {
      //     "InternalName": "PlannedStartDate",
      //     "DisplayName": "تاريخ البدء المخطط",
      //     "DisplayNameEn": "Planned Start Date",
      //     "type": "datetime",
      //     "max": "PlannedFinishDate",
      //     "validation": "required"
      // },
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
      //     "max": "today"
      // },
      // {
      //     "InternalName": "FinishDate",
      //     "DisplayName": "تاريخ الانتهاء الفعلي",
      //     "DisplayNameEn": "Actual Finish Date",
      //     "type": "datetime",
      //     "min": "StartDate",
      //     "max": "today"
      // },
      // {
      //     "InternalName": "DeliveredDate",
      //     "DisplayName":"تاريخ التسليم",
      // "DisplayNameEn": "Delivered Date",
      //     "type":"datetime"
      // },

      // {
      //     "InternalName": "Delivered",
      //     "DisplayName":"تم التسليم",
      // "DisplayNameEn": "Delivered",
      //     "type":"radio",
      //             options:{
      //         choices:[
      //             'لا','نعم'
      //           ]
      //     }

      // },
      {
        InternalName: 'Comments',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
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
      },
      // {
      //   InternalName: 'RelatedInitiativeDeliverable',
      //   DisplayNameEn: 'Related Initiative Deliverable',
      //   DisplayName:'مخرج المبادرة المرتبط',
      //   type: 'lookup',
      //   source: 'InitiativeDeliverables',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      // },

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
  //       // validation: 'required',
  //     },
  //   ],
  // },
]
