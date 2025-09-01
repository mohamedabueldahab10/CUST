var Information_Form = [
  {
    label: 'المعلومات الأساسية ',
    labelEn: 'Basic Info',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Title',
        DisplayNameEn: 'Title',
        DisplayName: 'رمز المعيار',
        type: 'string',
        state:'disabled'
      },
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'المعيار',
        type: 'multiline'
      },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'الوصف',
        type: 'multiline'
      },
      {
        InternalName: 'Phase',
        DisplayNameEn: 'Phase',
        DisplayName: 'المرحله',
        type: 'lookup',
        validation: 'required',
        source: "Phases",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
      },
    ],
  },
]
