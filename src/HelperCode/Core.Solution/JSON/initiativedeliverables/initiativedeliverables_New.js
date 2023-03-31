var Information_Form = [
  {
    label: 'مخرج المبادرة',
    labelEn: 'Initiative Deliverable',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    formDefaultValues: [
      //VRO
      { fieldName: 'WFModuleCode', value: 'VROInitiativeDeliverable',roles: ['VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },
      { fieldName: 'WFStage', value: 'VROInitiativeDeliverable01',roles: ['VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },
      
      //EPMOInitiativeDeliverable
      { fieldName: 'WFModuleCode', value: 'EPMOInitiativeDeliverable',roles: ['EPMO','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },
      { fieldName: 'WFStage', value: 'EPMOInitiativeDeliverable01',roles: ['EPMO','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },

      //LMS
      { fieldName: 'WFModuleCode', value: 'LMSInitiativeDeliverable',roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },
      { fieldName: 'WFStage', value: 'LMSInitiativeDeliverable01',roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },

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
        withletters:true,
        Errmsgkey:"withletterpattern",
        validation: 'required',
      },
      //   {
      //     InternalName: 'PlannedCompletedDate',
      //     DisplayNameEn: 'Planned Completed Date',
      //     DisplayName: 'تاريخ الاكتمال المخطط',
      //     type: 'datetime',
      //     validation: 'required',
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
      },
      {
        InternalName: 'DeliverableSuccessKPI',
        DisplayNameEn: 'Deliverable Success KPI',
        DisplayName: 'مقياس نجاح المخرج  (إن وجد)',
        type: 'multiline',
        maxchar: 5000,        
      },
      // {
      //     "InternalName": "CommittedDate",
      //     "DisplayName": "تاريخ الالتزام",
      //     "DisplayNameEn": "Committed Date",
      //     "type": "datetime",
      // },
      {
        InternalName: 'Target',
        DisplayNameEn: 'Target',
        DisplayName: 'المستهدف (إن وجد)',
        type: 'float',
        numberOfDigits:"15"
      },
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
      // },
      {
        InternalName: 'ActualCompletedDate',
        DisplayNameEn: 'Actual Completed Date',
        DisplayName: 'تاريخ الاكتمال الفعلي',
        type: 'datetime',
        max: 'today',
      },
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
      //   type: 'yesnoradio',
      //   options: {
      //     choices: [
      //       { display: 'yes', value: 'true' },
      //       { display: 'no', value: 'false' },
      //     ],
      //   },
      // },
      // {
      //     "InternalName": "RelatedBenefits",
      //     "DisplayNameEn": "Related Benefits",
      //     "DisplayName":"المنفعة المرتبطة",
      //     "type": "lookup",
      //     "source": "Benefits",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title",
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
]
