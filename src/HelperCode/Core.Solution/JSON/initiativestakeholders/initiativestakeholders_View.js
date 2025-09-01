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
          "type":"string"
      },
      {
        InternalName: 'StakeholderName',
        DisplayName: 'الأسم',
        DisplayNameEn: 'StakeholderName',
        type: 'string'
      },
      {
        InternalName: 'StakeholderRole',
        DisplayName: 'دوره في المبادرة',
        DisplayNameEn: 'StakeholderRole',
        type: 'string'
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
        type: 'multiline'
      },
     
    ],
  },
 
]
