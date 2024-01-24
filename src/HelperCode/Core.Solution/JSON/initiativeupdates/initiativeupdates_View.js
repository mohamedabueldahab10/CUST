var Information_Form = [
  {
    label: 'بيانات التحديث',
    labelEn: 'Update Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        "InternalName": "Title",
        "DisplayName": "رمز التحديث",
        "type": "string",
        "validation": "required"
      },

      {
        InternalName: 'Comments',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        InternalName: 'Created',
        DisplayName: 'تاريخ التحديث',
        DisplayNameEn: 'Date Identified',
        type: 'datetime',
        // validation: 'required',
      },

    ],
  },
  {
    label: 'الوثائق الداعمة',
    labelEn: 'Supporting Documents',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'getfile',
        DisplayName: 'المرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        withAddBtn: 'true',
      },
    ],
  },
]
