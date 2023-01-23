var Information_Form = [
  {
    label: 'بيانات المعلم',
    labelEn: 'Milestone Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Title',
        DisplayName: 'رمز المعلم',
        DisplayNameEn: 'Milestone Code',
        type: 'string',
      },
      {
        InternalName: 'Name',
        DisplayName: 'اسم المعلم',
        DisplayNameEn: 'Name',
        type: 'string',
      },
      {
        InternalName: 'PlannedDate',
        DisplayName: 'تاريخ الاكتمال المخطط',
        DisplayNameEn: 'Planned Date',
        type: 'datetime',
      },
      {
        InternalName: 'ActualDate',
        DisplayName: 'تاريخ الاكتمال الفعلي',
        DisplayNameEn: 'Actual Date',
        type: 'datetime',
        max: 'today',
      },
      {
        InternalName: 'Deliverables',
        DisplayName: 'المخرجات',
        DisplayNameEn: 'Deliverables',
        type: 'multiline',
        maxchar: 5000,
      },
      {
        InternalName: 'Description',
        DisplayName: 'الوصف',
        DisplayNameEn: 'Description',
        type: 'multiline',
        maxchar: 5000,
      },
      {
        InternalName: 'Status',
        DisplayName: 'الحالة',
        DisplayNameEn: 'Status',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'onschedule', value: 'onschedule' },
            { display: 'completed', value: 'completed' },
            // { display: 'late', value: 'late' },
          ],
        },
      },
      {
        InternalName: 'RelatedInitiativeMilestone',
        DisplayName: 'معلم المبادرة المرتبط',
        DisplayNameEn: 'Related Initiative Milestone',
        type: 'lookup',
        source: 'InitiativeMilestones',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'ShowInProgramReport',
        DisplayName: 'اظهار في التقرير',
        DisplayNameEn: 'Show In Report',
        type: 'radio',
      },
      // {
      //     "InternalName": "SupportDocumentsDescription",
      //     "DisplayNameEn": "Support Documents Description",
      //     "DisplayName": "وصف الوثائق الداعمة",
      //     "type": "multiline",
      //     "maxchar": "500",
      // }
    ],
  },
  {
    label: 'وثائق داعمة',
    labelEn: 'Attachments',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Attachment',
        DisplayName: 'المرفقات',
        DisplayNameEn: 'Attachment',
        type: 'file',
        withAddBtn: 'true',
      },
    ],
  },
]
