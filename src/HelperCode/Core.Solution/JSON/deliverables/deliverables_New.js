var Information_Form = [
  {
    label: 'بيانات المخرج',
    labelEn: 'Delivrable Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
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
      },
      {
        InternalName: 'Description',
        DisplayName: 'الوصف',
        DisplayNameEn: 'Description',
        type: 'multiline',
        maxchar: 5000,
      },
      // {
      //     "InternalName": "Quantity",
      //     "DisplayName":"الكمية",
      //     "type":"float"
      // },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن / القيمة (%)',
        DisplayNameEn: 'Weight (%)',
        type: 'floatpercentage',
        validation: 'required',
      },
      {
        InternalName: 'Status',
        DisplayName: 'الحالة',
        DisplayNameEn: 'Status',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'workinprogress', value: 'workinprogress' },
            { display: 'completed', value: 'completed' },
          ],
        },
      },
      {
        InternalName: 'PlannedFinishDate',
        DisplayName: 'تاريخ الانتهاء المخطط',
        DisplayNameEn: 'Planned Finish Date',
        type: 'datetime',
        // min: 'PlannedStartDate',
        validation: 'required',
      },
      {
        InternalName: 'AcceptanceCriteria',
        DisplayName: 'معايير قبول المخرج',
        DisplayNameEn: 'Acceptance Criteria',
        type: 'string',
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
      //     "InternalName": "Delivered",
      //     "DisplayName": "تم التسليم",
      //     "DisplayNameEn": "Delivered",
      //     "type": "yesnoradio",
      //     options: {
      //         choices: [
      //             { display: 'yes', value: 'yes' },
      //             { display: 'no', value: 'no' }
      //         ]
      //     }

      // },
      // {
      //     "InternalName": "DeliveredDate",
      //     "DisplayName": "تاريخ التسليم",
      //     "DisplayNameEn": "Delivered Date",
      //     "type": "datetime",
      //     "max":"today",
      //     "state":"disabled"
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
      },
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
    label: 'وثائق داعمة',
    labelEn: 'Attachments',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Attachments',
        DisplayName: 'مرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        withAddBtn: 'true',
        validation: 'required',
      },
    ],
  },
]
