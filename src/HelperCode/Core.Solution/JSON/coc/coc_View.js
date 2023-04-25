var Information_Form = [
  {
    label: 'المعلومات الأساسية ',
    labelEn: 'Basic Info',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Title',
        DisplayNameEn: 'CoC Code',
        DisplayName: 'رمز شهادة الإنجاز',
        type: 'string',
      },
      {
        InternalName: 'Deliverables',
        DisplayNameEn: 'Deliverables',
        DisplayName: 'المخرجات',
        // type: 'lookup',
        type: 'lookupmultiselectwithoutrepeat',
        // validation: 'required',
        source: 'Deliverables',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        grpfieldkey: 'Title',
      },
      {
        InternalName: 'Amount',
        DisplayNameEn: 'Amount',
        DisplayName: 'المبلغ الإجمالى للمخرجات',
        type: 'float',
      },
      {
        InternalName: 'TAX',
        DisplayNameEn: 'TAX',
        DisplayName: 'نسبة الضريبة',
        type: 'floatpercentage',
        // validation: 'required',
      },
      {
        InternalName: 'TotalAmount',
        DisplayNameEn: 'Total Amount',
        DisplayName: 'المبلغ الإجمالى',
        type: 'float',
      },
      {
        InternalName: 'DisbursementStatus',
        DisplayNameEn: 'Disbursement Status',
        DisplayName: 'حالة الصرف',
        // validation: 'required',
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
