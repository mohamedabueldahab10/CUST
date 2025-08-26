var Information_Form = [
  {
    label: 'بيانات المهام',
    labelEn: 'Update Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
          "InternalName": "Title",
          "DisplayName":"رمز المهمة",
          "type":"string",
          "validation": "required"
      },
      {
        InternalName: 'TaskName',
        DisplayName: 'اسم المهمة',
        DisplayNameEn: 'TaskName',
        type: 'string',
        maxchar: 255,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        "validation": "required"
      },
      {
        InternalName: 'InitiativeManager',
        DisplayName: 'مدير المبادرة',
        DisplayNameEn: 'InitiativeManager',
        type: 'string',
      },
      {
        InternalName: 'InitiativePMRole',
        DisplayName: 'دور مدير المبادرة',
        DisplayNameEn: 'InitiativePMRole',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'responsible',
              value: 'responsible',
            },
            {
              display: 'accountable',
              value: 'accountable',
            },
            {
              display: 'consulted',
              value: 'consulted',
            },
            {
              display: 'informed',
              value: 'informed',
            },
          ],
        },
      },
      {
        InternalName: 'InitiativeOwner',
        DisplayName: 'مالك المبادرة',
        DisplayNameEn: 'InitiativeOwner',
        type: 'string',
      },
      {
        InternalName: 'InitiativeOwnerRole',
        DisplayName: 'دور مالك المبادرة',
        DisplayNameEn: 'InitiativeOwnerRole',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'responsible',
              value: 'responsible',
            },
            {
              display: 'accountable',
              value: 'accountable',
            },
            {
              display: 'consulted',
              value: 'consulted',
            },
            {
              display: 'informed',
              value: 'informed',
            },
          ],
        },
      },
      {
        InternalName: 'ObjectiveOwner',
        DisplayName: 'مالك الهدف',
        DisplayNameEn: 'ObjectiveOwner',
        type: 'string',
      },
      {
        InternalName: 'ObjectiveOwnerRole',
        DisplayName: 'دور مالك الهدف',
        DisplayNameEn: 'ObjectiveOwnerRole',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'responsible',
              value: 'responsible',
            },
            {
              display: 'accountable',
              value: 'accountable',
            },
            {
              display: 'consulted',
              value: 'consulted',
            },
            {
              display: 'informed',
              value: 'informed',
            },
          ],
        },
      },
      {
        InternalName: 'SectorManager',
        DisplayName: 'مكتب المشاريع القطاعي',
        DisplayNameEn: 'SectorManager',
        type: 'string',
      },
      {
        InternalName: 'SectorManagerRole',
        DisplayName: 'دور مكتب المشاريع القطاعي',
        DisplayNameEn: 'SectorManagerRole',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'responsible',
              value: 'responsible',
            },
            {
              display: 'accountable',
              value: 'accountable',
            },
            {
              display: 'consulted',
              value: 'consulted',
            },
            {
              display: 'informed',
              value: 'informed',
            },
          ],
        },
      },
    ],
  },
 
]
