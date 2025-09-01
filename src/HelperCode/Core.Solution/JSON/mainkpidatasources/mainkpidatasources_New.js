var Information_Form = [
  {
    label: '',
    labelEn: ' Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
 
        {
          InternalName: 'DataSource',
          DisplayNameEn: 'Data Source',
          DisplayName: 'مصدر البيانات',
          type: 'string',
          maxchar: '255',
          descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
          descPhraseEn: "max length of letters equal 255",
        },
        {
          InternalName: 'DataSourceResponsible',
          DisplayNameEn: 'Data Source Responsible',
          DisplayName: 'مسؤول مصدر البيانات',
          type: 'string',
          maxchar: '255',
          descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
          descPhraseEn: "max length of letters equal 255",
        },
        {
          InternalName: 'Email',
          DisplayNameEn: 'Email',
          DisplayName: 'البريد الالكتروني لمسؤول مصدر البيانات',
          type: 'email', //in view should be string
          //   "maxchar": "500",
        },
      ],

  },

  // {
  //     label: 'الوثائق الداعمة',
  //     labelEn: 'Supporting Documents',
  //     description: "",
  //     descriptionEn: "",
  //     subFields: [{
  //         "InternalName": "getfile",
  //         "DisplayName": "المرفقات",
  //         "DisplayNameEn": "Attachments",
  //         "type": "file",
  //         "withAddBtn":"true"
  //     }]
  // }
]
