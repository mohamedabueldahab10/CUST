var Information_Form = [
  {
    label: 'بيانات اللجان',
    labelEn: 'Committee Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Title',
        DisplayName: 'رمز اللجنة',
        DisplayNameEn: 'Committee Code',
        type: 'string',
      },
      {
        InternalName: 'Name',
        DisplayName: 'إسم اللجنة',
        DisplayNameEn: 'Committee Name (Arabic)',
        type: 'string',
        Errmsgkey: 'arnamepattern',
      },
      {
        InternalName: 'NameEn',
        DisplayName: 'إسم اللجنة باللغة الانجليزية',
        DisplayNameEn: 'Committee Name (English)',
        type: 'string',
        Errmsgkey: 'ennamepattern',
      },
      {
        InternalName: 'Description',
        DisplayName: 'الوصف',
        DisplayNameEn: 'Description',
        type: 'multiline',
        maxchar: 5000,
      },
    ],
  },
]
