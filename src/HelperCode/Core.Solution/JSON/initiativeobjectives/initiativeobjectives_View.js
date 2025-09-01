var Information_Form = [
  {
    label: 'الأهداف',
    labelEn: 'Update Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
          "InternalName": "Title",
          "DisplayName":"رمز الهدف",
          "type":"string",
      },
      {
        InternalName: 'ObjectiveName',
        DisplayName: 'وصف الهدف',
        DisplayNameEn: 'ObjectiveName',
        type: 'string',
        maxchar: 255,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
      },
      {
        InternalName: 'Description',
        DisplayName: 'وصف الهدف',
        DisplayNameEn: 'Description',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000"
      },
     
    ],
  },
 
]
