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
        type: 'lookupmultiselect',
        validation: 'required',
        source: 'Deliverables',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
      // {
      //     "InternalName": "Amount",
      //     "DisplayNameEn": "Amount",
      //     "DisplayName":"المبلغ الإجمالى للمخرجات",
      //     "type": "float"

      // },
      {
        InternalName: 'TAX',
        DisplayNameEn: 'TAX',
        DisplayName: 'نسبة الضريبة',
        type: 'floatpercentage',
        validation: 'required',
      },
      // {
      //     "InternalName": "TotalAmount",
      //     "DisplayNameEn":"Total Amount",
      //     "DisplayName": "المبلغ الإجمالى",
      //     "type": "float"
      // },
      {
        InternalName: 'DisbursementStatus',
        DisplayNameEn: 'Disbursement Status',
        DisplayName: 'حالة الصرف',
        validation: 'required',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'missionwasapproved', value: 'missionwasapproved' },
            {
              display: 'waitingfortheapprovalofresources',
              value: 'waitingfortheapprovalofresources',
            },
            { display: 'exchangehasbeendone', value: 'exchangehasbeendone' },
          ],
        },
      },
    ],
  },
  {
    label: 'الوثائق الداعمة',
    labelEn: 'Attachments',
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
        InternalName: 'Attachments',
        DisplayName: 'مرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        withAddBtn: 'true',
      },
    ],
  },
]
