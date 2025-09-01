var Information_Form = [
  {
    label: 'بيانات الدرس المستفاد',
    labelEn: 'Lesson Learned Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Name',
        DisplayName: 'الدرس المستفاد',
        DisplayNameEn: 'Name',
        type: 'string',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255", 
        maxchar: 5000,
      },
      {
        InternalName: 'Category',
        DisplayName: 'التصنيف',
        DisplayNameEn: 'Category',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'scopemanagement',
              value: 'scopemanagement',
            },
            {
              display: 'schedule',
              value: 'schedule',
            },
            {
              display: 'stakeholders',
              value: 'stakeholders',
            },
            {
              display: 'communication',
              value: 'communication',
            },
            {
              display: 'procurementplan',
              value: 'procurementplan',
            },
            {
              display: 'change',
              value: 'change',
            },
          ],
        },
      },
      {
        InternalName: 'Types',
        DisplayName: 'النوع',
        DisplayNameEn: 'Types',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'provenstrength',
              value: 'provenstrength',
            },
            {
              display: 'improvementopportunity',
              value: 'improvementopportunity',
            },
          ],
        },
      },
      {
        InternalName: 'Comments',
        DisplayName: 'ملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000", 
        maxchar: 5000,
      },
     

    ],
  },
]
