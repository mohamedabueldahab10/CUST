var Information_Form = [
  {
    label: 'أصحاب المصلحة',
    labelEn: 'Update Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
          "InternalName": "Title",
          "DisplayName":"رمز أصحاب المصلحه",
          "type":"string",
          "validation": "required"
      },
      {
        InternalName: 'StakeholderName',
        DisplayName: 'الأسم',
        DisplayNameEn: 'StakeholderName',
        type: 'string',
        maxchar: 255,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        "validation": "required"
      },
      {
        InternalName: 'StakeholderRole',
        DisplayName: 'دوره في المبادرة',
        DisplayNameEn: 'StakeholderRole',
        type: 'string',
        maxchar: 255,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        "validation": "required"
      },
      {
        InternalName: 'AffectLevel',
        DisplayName: 'مستوى التأثير',
        DisplayNameEn: 'AffectLevel',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'high',
              value: 'high',
            },
            {
              display: 'medium',
              value: 'medium',
            },
            {
              display: 'low',
              value: 'low',
            },
          ],
        },
      },
      {
        InternalName: 'AffectLevelDescription',
        DisplayName: 'وصف طبيعة التأثير',
        DisplayNameEn: 'AffectLevelDescription',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000"
      },
     
    ],
  },
 
]
