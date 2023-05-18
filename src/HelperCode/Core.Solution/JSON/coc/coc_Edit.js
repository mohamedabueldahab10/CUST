var Information_Form = [
  {
    label: 'المعلومات الأساسية ',
    labelEn: 'Basic Info',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Deliverables',
        DisplayNameEn: 'Deliverables',
        DisplayName: 'المخرجات',
        type: 'lookupmultiselectwithoutrepeat',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        listname: 'Certifications',
        targetelement: 'Deliverables',
        projectCodeInList: true,
        source: 'Deliverables',
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
        InternalName: 'Amount',
        DisplayNameEn: 'Amount',
        DisplayName: 'المبلغ الإجمالى للمخرجات',
        type: 'float',
        state: 'disabled',
      },
      {
        InternalName: 'TAX',
        DisplayNameEn: 'TAX',
        DisplayName: 'نسبة الضريبة',
        type: 'floatpercentage',
        validation: 'required',
        state: 'disabled',
      },{
        InternalName: 'TotalAmount',
        DisplayNameEn: 'Total Amount',
        DisplayName: 'المبلغ الإجمالى',
        // type: 'float',        
        type: 'floattax', // to discount the tax in ksa 15%
        targetelementtax: 'TAX', // tax amount field
        targetelementamount: 'Amount', // amount after tax field
        numberOfDigits:"15",

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
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Projects',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
      },
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
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",     

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
