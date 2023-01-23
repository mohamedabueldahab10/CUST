var Information_Form = [
  {
    label: 'بيانات المخرج',
    labelEn: 'Delivrable Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Title',
        DisplayName: 'رمز المخرج',
        DisplayNameEn: 'Code',
        type: 'string',
      },
      {
        InternalName: 'Name',
        DisplayName: 'اسم المخرج',
        DisplayNameEn: 'Name',
        type: 'string',
      },
      {
        InternalName: 'Description',
        DisplayName: 'الوصف',
        DisplayNameEn: 'Description',
        type: 'multiline',
      },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن / القيمة',
        DisplayNameEn: 'Weight',
        type: 'floatpercentage',
      },
      {
        InternalName: 'Status',
        DisplayName: 'الحالة',
        DisplayNameEn: 'Status',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'workinprogress',
              value: 'workinprogress',
            },
            {
              display: 'completed',
              value: 'completed',
            },
          ],
        },
      },
      // {
      //     "InternalName": "Quantity",
      //     "DisplayName":"الكمية",
      //     "type":"float"
      // },
      // {
      //     "InternalName": "PlannedStartDate",
      //     "DisplayName": "تاريخ البدء المخطط",
      //     "DisplayNameEn": "Planned Start Date",
      //     "type": "datetime",
      //     "max": "PlannedFinishDate"
      // },
      {
        InternalName: 'PlannedFinishDate',
        DisplayName: 'تاريخ الانتهاء المخطط',
        DisplayNameEn: 'Planned Finish Date',
        type: 'datetime',
        // "min": "PlannedStartDate"
      },
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
      //     "type": "datetime"
      // },
      // {
      //     "InternalName": "StartDate",
      //     "DisplayName": "تاريخ البدءالفعلي",
      //     "DisplayNameEn": "Start Date",
      //     "type": "datetime",
      //     "max":"today"
      // },
      // {
      //     "InternalName": "FinishDate",
      //     "DisplayName": "تاريخ الانتهاء الفعلي",
      //     "DisplayNameEn": "Finish Date",
      //     "type": "datetime",
      //     "min": "StartDate",
      //     "max":"today"
      // },
      {
        InternalName: 'Delivered',
        DisplayName: 'تم التسليم',
        DisplayNameEn: 'Delivered',
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
      {
        InternalName: 'DeliveredDate',
        DisplayName: 'تاريخ التسليم',
        DisplayNameEn: 'Delivered Date',
        type: 'datetime',
      },
      {
        InternalName: 'AcceptanceCriteria',
        DisplayName: 'معايير قبول المخرج',
        DisplayNameEn: 'Acceptance Criteria',
        type: 'multiline',
      },
      {
        InternalName: 'Comments',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
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
        "validation": "required",
      },
    ],
  }
]
