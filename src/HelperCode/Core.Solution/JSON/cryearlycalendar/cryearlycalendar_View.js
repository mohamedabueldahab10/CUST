var Information_Form = [
  {
    label: 'بيانات التقويم السنوي',
    labelEn: 'Yearly Calendar Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Title',
        DisplayName: 'رمز التقويم السنوي',
        DisplayNameEn: 'Yearly Calendar Code',
        type: 'string',
      },
      {
        InternalName: 'ApprovalPath',
        DisplayName: 'مسار سير العمل',
        DisplayNameEn: 'Approval Path',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'crstrategic', value: 'strategic' },
            { display: 'crexecution', value: 'execution' },
            { display: 'croperationally', value: 'operation' },
          ],
        },
        toggleValues: [
          { value: 'strategic', fields: ['Quarter'] },
          { value: 'execution', fields: ['Month'] },
          { value: 'operation', fields: [] },
        ],
      },
      {
        InternalName: 'Year',
        DisplayName: 'السنة',
        DisplayNameEn: 'Year',
        type: 'number',
      },
      {
        InternalName: 'Quarter',
        DisplayName: 'الربع',
        DisplayNameEn: 'Quarter',
        type: 'number',
        display: 'none',
        ToggleName: 'Quarter',
      },
      {
        InternalName: 'Month',
        DisplayName: 'الشهر',
        DisplayNameEn: 'Month',
        type: 'number',
        display: 'none',
        ToggleName: 'Month',
      },
      {
        InternalName: 'StartDate',
        DisplayName: 'تاريخ تفعيل الخدمة',
        DisplayNameEn: 'Start Date',
        type: 'datetime',
      },
      {
        InternalName: 'FinishDate',
        DisplayName: 'تاريخ إغلاق الخدمة',
        DisplayNameEn: 'Finish Date',
        type: 'datetime',
      },
      {
        InternalName: 'IsActive',
        DisplayName: 'تفعيل/إغلاق',
        DisplayNameEn: 'Active',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
          ],
        },
      },
    ],
  },
  {
    label: 'وثائق داعمة',
    labelEn: 'Supporting Documents',
    description: 'الملفات المرفقة',
    descriptionEn: 'Attachments',
    subFields: [
      {
        InternalName: 'getfile',
        DisplayName: 'المرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
      },
    ],
  },
];
