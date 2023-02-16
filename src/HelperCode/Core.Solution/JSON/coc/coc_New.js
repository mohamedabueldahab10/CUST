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
        type: 'lookupmultiselectwithoutrepeat', // new type to return the not used value in multi select
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        listname:'Certifications', // current list
        targetelement: 'Deliverables', // internal name of element in current list
        projectCodeInList: true, 
        source: 'Deliverables',// target list
        grpfieldkey: 'Title',
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
