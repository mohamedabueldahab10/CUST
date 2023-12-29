var Information_Form = [
  {
    label: 'مخرج المبادرة',
    labelEn: 'Initiative Deliverable',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    // workflowSetValues: [
    //   // Ii Deliverables
    //   //VRO
    //   { fieldName: 'Completed', value: 'yes', stages:["VROInitiativeDeliverable02"] },
    //   //EPMO
    //   { fieldName: 'Completed', value: 'yes', stages:["EPMOInitiativeDeliverable03"] },
    //   //LMS
    //   { fieldName: 'Completed', value: 'yes', stages:["LMSInitiativeDeliverable03"] },
  

    // ],
    subFields: [
      {
        InternalName: 'Title',
        DisplayNameEn: 'Title',
        DisplayName: 'رمز المخرج',
        type: 'string',
        maxchar: '250',
      },
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'اسم المخرج',
        type: 'string',
        maxchar: '250',
      },
      // {
      //     "InternalName": "PlannedCompletedDate",
      //     "DisplayNameEn": "Planned Completed Date",
      //     "DisplayName":"تاريخ الاكتمال المخطط",
      //     "type":"datetime"
      // },
      {
        InternalName: 'PlannedCompletedDate',
        DisplayNameEn: 'Planned Completed Date',
        DisplayName: 'تاريخ الاكتمال المخطط',
        type: 'datetime',
      },
      {
        InternalName: 'DeliverableSuccessKPI',
        DisplayNameEn: 'Deliverable Success KPI',
        DisplayName: 'مقياس نجاح المخرج',
        type: 'string',
      },
      {
        InternalName: 'Classification',
        DisplayName: 'تصنيف المخرج',
        DisplayNameEn: 'Classification',
        // validation: 'required',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'operationally', value: 'operationally',
            },
            {
              display: 'transformationally', value: 'transformationally',
            },
            {
              display: 'plansandstrategies', value: 'plansandstrategies',
            },
            {
              display: 'regulationsandorganizations', value: 'regulationsandorganizations',
            },
            {
              display: 'electronicsystemandplatforms', value: 'electronicsystemandplatforms',
            },
            {
              display: 'partnershipsagreements', value: 'partnershipsagreements',
            },
            {
              display: 'servicesandproducts', value: 'servicesandproducts',
            },
            {
              display: 'studiesandreports', value: 'studiesandreports',
            },
            {
              display: 'constructionandinfrastructure', value: 'constructionandinfrastructure',
            },
            {
              display: 'operationalwork', value: 'operationalwork',
            },
            {
              display: 'newentities', value: 'newentities',
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
        DisplayName: 'المستهدف',
        type: 'string',
      },
      {
        InternalName: 'Weight',
        DisplayNameEn: 'Weight (%)',
        DisplayName: 'الوزن(%)',
        type: 'floatpercentage',
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
        // validation: 'required',
      },
      {
        InternalName: 'ActualCompletedDate',
        DisplayNameEn: 'Actual Completed Date',
        DisplayName: 'تاريخ الاكتمال الفعلي',
        type: 'datetime',
        max: 'today',
      },
      // {
      //     "InternalName": "CommittedDate",
      //     "DisplayName": "تاريخ الالتزام",
      //     "DisplayNameEn": "Committed Date",
      //     "type": "datetime",
      // },
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
      {
        InternalName: 'Delivered',
        DisplayName: 'تم التسليم',
        DisplayNameEn: 'Delivered',
        type: 'yesnoradio',
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
        // validation: 'required',
        source: "Tasks Configuration",
        Dispfieldkey: "TaskNameAr",
        DispfieldkeyEn: 'TaskNameEn',
        valfieldkey: "Title",
        },
        {
          InternalName: 'SupportDocumentsDescription',
          DisplayNameEn: 'Support Documents Description',
          DisplayName: 'وصف الوثائق الداعمة',
          type: 'multiline',
          descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
          descPhraseEn: "max length of letters equal 5000",
          maxchar: '5000',                
          // validation: 'required',
          // hideOnWfTaskStage :'EPMOInitiativeMilestone00,VROInitiativeMilestone00,LMSInitiativeMilestone00',
          // security: {
          //   groups: [ 'System Admin Group','EPMO','LMSU-Execution','VRO_E'],
          // },
          },
      // {
      //   InternalName: "WFStage",
      //   DisplayName: "المرحلة",
      //   DisplayNameEn: "Stage",
      //   type: 'lookup',
      //   // validation: 'required',
      //   source: "Tasks Configuration",
      //   Dispfieldkey: "TaskNameAr",
      //   DispfieldkeyEn: 'TaskNameEn',
      //   valfieldkey: "Title",
      //   },
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
  // {
  //     label: 'الوثائق الداعمة',
  //     labelEn: 'Supporting Documents',
  //     description: "",
  //     descriptionEn: "",
  //     subFields:[
  //         {
  //             "InternalName": "getfile",
  //             "DisplayName":"المستندات",
  //             "DisplayNameEn": "Documents",
  //             "type":"file"
  //         }
  //     ]
  // }
]
