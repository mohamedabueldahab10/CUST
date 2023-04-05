var Information_Form = [
  {
    label: 'المعلومات الأساسية ',
    labelEn: 'Basic Info',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    formValuesBasedOnParent: [
      {
        parentList: 'Projects', parentFieldName: 'Title', fieldName: 'InitiativeType',basedOnCondition: false,
        valueToSet: [
          {
            condition: "vision", values: [
              { fieldNameInList: "WFModuleCode", fieldValueInList: "VROCOC" },
              { fieldNameInList: "WFStage", fieldValueInList: "VROCOC01" },]
          },
          {
            condition: "lms",
            values: [{ fieldNameInList: "WFModuleCode", fieldValueInList: "LMSCOC" },
            { fieldNameInList: "WFStage", fieldValueInList: "LMSCOC01" }]
          },
          {
            condition: "strategically",
            values: [{ fieldNameInList: "WFModuleCode", fieldValueInList: "EPMOCOC" },
            { fieldNameInList: "WFStage", fieldValueInList: "EPMOCOC01" }]
          },

        ]
      }
    ],
    // formDefaultValues: [
    //   //VRO
    //   { fieldName: 'WFModuleCode', value: 'VROCOC',roles: ['VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },
    //   { fieldName: 'WFStage', value: 'VROCOC01',roles: ['VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },
      
    //   //EPMOCOC
      
    //   { fieldName: 'WFModuleCode', value: 'EPMOCOC',roles: ['EPMO','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },
    //   { fieldName: 'WFStage', value: 'EPMOCOC01',roles: ['EPMO','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },


    //   //LMS
    //   { fieldName: 'WFModuleCode', value: 'LMSCOC',roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },
    //   { fieldName: 'WFStage', value: 'LMSCOC01',roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },

    // ],
    subFields: [
      {
        InternalName: 'Deliverables',
        DisplayNameEn: 'Deliverables',
        DisplayName: 'المخرجات',
        type: 'lookupmultiselectwithoutrepeat', // new type to return the not used value in multi select
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        listname:'Certifications', // current list
        targetelement: 'Deliverables', // internal name of element in current list
        projectCodeInList: true, 
        source: 'Deliverables',// target list
        grpfieldkey: 'Title',
        validation: 'required',
        getValuesfor:'Weight', // add this internal name to get ther values
        targetTotalElement:"TotalAmount", // targetTotalElement to set the values inside it
        validation: 'required',
        Errmsgkey:"multiselecterr"
      },
      // {
      //   InternalName: 'Deliverables',
      //   DisplayNameEn: 'Deliverables',
      //   DisplayName: 'المخرجات',
      //   // type: 'lookup',
      //   type: 'lookupmultiselect',
      //   validation: 'required',
      //   source: 'Deliverables',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   grpfieldkey: 'Title',
      //   projectCodeInList: true
      // },
      {
        InternalName: 'TotalAmount',
        DisplayNameEn: 'Total Amount',
        DisplayName: 'المبلغ الإجمالى',
        // type: 'float',
        type: 'floattax', // to discount the tax in ksa 15%
        targetelementtax: 'TAX', // tax amount field
        targetelementamount: 'Amount', // amount after tax field
        numberOfDigits:"12",
        state: 'disabled',
      },
      {
        InternalName: 'TAX',
        DisplayNameEn: 'TAX',
        DisplayName: 'نسبة الضريبة',
        type: 'floatpercentage',
        validation: 'required',
        state: 'disabled',
      },
      {
        InternalName: 'Amount',
        DisplayNameEn: 'Amount',
        DisplayName: 'المبلغ الإجمالى للمخرجات',
        type: 'float',
        state: 'disabled',
      },
      {
        InternalName: 'DisbursementStatus',
        DisplayNameEn: 'Disbursement Status',
        DisplayName: 'حالة الصرف',
        validation: 'required',
        type: 'dropdownValues',
        options: {
          choices: [
            // { display: 'missionwasapproved', value: 'missionwasapproved' },
            // {
            //   display: 'waitingfortheapprovalofresources',
            //   value: 'waitingfortheapprovalofresources',
            // },
            { display: 'cocuploaded', value: 'cocuploaded' },
            {
              display: 'exchanginginprogress',
              value: 'exchanginginprogress',
            },
            { display: 'exchangehasbeendone', value: 'exchangehasbeendone' },
          ],
        },
      },
      {
        InternalName: 'ExpectedPaymentDate',
        DisplayNameEn: 'ExpectedPayment Date',
        DisplayName: 'التاريخ المخطط للصرف',
        type: 'datetime',
      }
      
    ],
  },
  {
    label: 'الوثائق الداعمة',
    labelEn: 'Supporting Documents',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Comments',
        DisplayName: 'ملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,        

      },
      {
        InternalName: 'getfile',
        DisplayName: 'مرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        withAddBtn: 'true',
      },
    ],
  },
]
