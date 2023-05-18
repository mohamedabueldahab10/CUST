var Information_Form = [
  {
    label: 'بيانات المعلم',
    labelEn: 'Milestone Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    // formDefaultValues: [
    //   //VRO
    //   { fieldName: 'WFModuleCode', value: 'VROProjMilestone',roles: ['Administrator','VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },
    //   { fieldName: 'WFStage', value: 'VROProjMilestone01',roles: ['Administrator','VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },
    //   { fieldName: 'DraftStatus', value: 'draft' ,roles: ['Administrator','VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },

    //   //EPMOCOC
    //   { fieldName: 'WFModuleCode', value: 'EPMOProjMilestone',roles: ['Administrator','EPMO','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },
    //   { fieldName: 'WFStage', value: 'EPMOProjMilestone01',roles:  ['Administrator','EPMO','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },
    //   { fieldName: 'DraftStatus', value: 'draft',roles:  ['Administrator','EPMO','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },

    //   //LMS
    //   { fieldName: 'WFModuleCode', value: 'LMSProjMilestone',roles: ['Administrator','LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },
    //   { fieldName: 'WFStage', value: 'LMSProjMilestone01',roles: ['Administrator','LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },
    //   { fieldName: 'DraftStatus', value: 'draft',roles: ['Administrator','LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },

    // ],
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayName":"رمز المعلم",
      //"DisplayNameEn": "Milestone Title",
      //     "type":"string",
      //     "validation": "required"
      // },
      {
        InternalName: 'Name',
        DisplayName: 'اسم المعلم',
        DisplayNameEn: 'Name',
        type: 'string',
        maxchar: '255',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        withletters: true,
        Errmsgkey: 'withletterpattern',
        validation: 'required',
      },
      // {
      //   InternalName: 'Weight',
      //   DisplayNameEn: 'Weight',
      //   DisplayName: 'الوزن المكافئ للإنجاز %',
      //   type: 'floatpercentage',
      //   // type: 'weightfloatpercentage',
      //   listname: 'Milestones',
      //   targetcode: 'ProjectCode',
      //   targetelement: 'Weight',
      //   seconedtarget: 'Amount',
      //   validation: 'required',
      //   // "state": "disabled",
      //   // dynamic: "Initiative"
      // },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن(%)',
        DisplayNameEn: 'Weight (%)',
        type: 'weightfloatpercentage',
        listname: 'Milestones',
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
      {
        InternalName: 'PlannedDate',
        DisplayName: 'تاريخ الاكتمال المخطط',
        DisplayNameEn: 'Planned Finish Date',
        // type: 'datetime',
        type: 'datetimetoparent',
        validation: 'required',
        listname: 'Projects', // list name
        startinternalname: 'BaselineStartDate', // internalname of parent start
        endinternalname: 'BaselineFinishDate',
        Errmsgkey: 'btwndatepattern',
      },
      {
        InternalName: 'ActualDate',
        DisplayName: 'تاريخ الاكتمال الفعلي',
        DisplayNameEn: 'Actual Date',
        // type: 'datetime',
        type: 'datetimetoparent',
        max: 'today',
        listname: 'Projects', // list name
        startinternalname: 'BaselineStartDate', // internalname of parent start
        endinternalname: 'BaselineFinishDate',
        Errmsgkey: 'btwndatepattern',
      },
      // {
      //   InternalName: 'CommittedDate',
      //   DisplayName: 'تاريخ الالتزام',
      //   DisplayNameEn: 'Committed Date',
      //   type: 'datetime',
      // },
      {
        InternalName: 'Deliverables',
        DisplayName: 'المخرجات',
        DisplayNameEn: 'Deliverables Completed',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      //   {
      //     InternalName: 'Status',
      //     DisplayName: 'الحالة',
      //     DisplayNameEn: 'Status',
      //     type: 'dropdownValues',
      //     options: {
      //       choices: [
      //         {
      //           display: 'workisunderway',
      //           value: 'workisunderway',
      //         },
      //         {
      //           display: 'complete',
      //           value: 'complete',
      //         },
      //       ],
      //     },
      //   },
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
      //   InternalName: 'Status',
      //   DisplayName: 'الحالة',
      //   DisplayNameEn: 'Status',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       { display: 'onschedule', value: 'onschedule' },
      //       { display: 'completed', value: 'completed' },
      //       { display: 'late', value: 'late' },
      //     ],
      //   },
      // },
      // {
      //   InternalName: 'RelatedInitiativeMilestone',
      //   DisplayName: 'معلم المبادرة المرتبط',
      //   DisplayNameEn: 'Related Initiative Milestone',
      //   type: 'lookup',
      //   source: 'InitiativeMilestones',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      // },
      {
        InternalName: 'RelatedInitiativeMilestone',
        DisplayName: 'معلم المبادرة المرتبط',
        DisplayNameEn: 'Related Initiative Milestone',
        type: 'lookuptoparentchild',
        parentlist: 'Projects', //parent list name
        parentinternalname: 'RelatedInitiative', // internal name in parent list
        source: 'InitiativeMilestones', // target list
        // source: 'Milestones',
        sourceinternalname: 'InitiativeCode', // column in target list
        Dispfieldkey: 'Name', //display in dropdown
        valfieldkey: 'Title', // value in dropdown
      },
      //   {
      //     InternalName: 'SupportDocumentsDescription',
      //     DisplayNameEn: 'Support Documents Description',
      //     DisplayName: 'وصف الوثائق الداعمة',
      //     type: 'multiline',
      //     maxchar: '500',
      //   },
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
        docPurpose: 'Spporting_Documents',
        withAddBtn: 'true',
      },
      {
        InternalName: 'SupportDocumentsDescription',
        DisplayNameEn: 'Support Documents Description',
        DisplayName: 'وصف الوثائق الداعمة',
        type: 'multiline',
        maxchar: '5000',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
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
  //       DisplayName: 'المرفقات',
  //       DisplayNameEn: 'Attachments',
  //       type: 'file',
  //       withAddBtn: 'true',
  //     },
  //   ],
  // },
]
