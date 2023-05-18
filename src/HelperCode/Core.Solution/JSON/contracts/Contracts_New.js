var Information_Form = [
  {
    label: 'بيانات العقد',
    labelEn: 'Contract Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayName":"رمز العقد ",
      // "DisplayNameEn": "Contract Title",
      //     "type":"string" ,
      //     "validation": "required"

      // },
      {
        InternalName: 'Name',
        DisplayName: 'اسم العقد',
        DisplayNameEn: 'Contract Name',
        type: 'string',
        validation: 'required',
        maxchar: 255,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255", 
      },
      // {
      //     "InternalName": "Vendor",
      //     "DisplayName": "المتعهد",
      //     "DisplayNameEn": "Vendor",
      //     "type": "lookup",
      //     //from other list:
      //     "source": "Vendors",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title"
      // },
      // {
      //     "InternalName": "TypeOfContract",
      //     "DisplayName": "نوع العقد",
      //     "DisplayNameEn": "Type Of Contract",
      //     "type": "dropdownValues",
      //     options: {
      //         choices: [
      //             { display: 'main', value: 'main' },
      //             { display: 'sub', value: 'sub' }
      //         ]
      //     }
      // },
      // {
      //   InternalName: 'StartDate',
      //   DisplayName: 'تاريخ بدء العقد',
      //   DisplayNameEn: 'Start Date',
      //   type: 'datetime',
      //   max: 'EndDate',
      // },
      // {
      //   InternalName: 'EndDate',
      //   DisplayName: 'تاريخ إنتهاء العقد',
      //   DisplayNameEn: 'End Date',
      //   type: 'datetime',
      //   min: 'StartDate',
      // },
      {
        InternalName: 'StartDate',
        DisplayName: 'تاريخ بدء العقد',
        DisplayNameEn: 'Start Date',
        // "type": "datetime",
        type: 'datetimetoparent',
        listname: 'Projects', // list name
        startinternalname: 'BaselineStartDate', // internalname of parent start
        endinternalname: 'BaselineFinishDate',
        max: 'EndDate',
      },
      {
        InternalName: 'EndDate',
        DisplayName: 'تاريخ إنتهاء العقد',
        DisplayNameEn: 'End Date',
        // "type": "datetime",
        type: 'datetimetoparent',
        listname: 'Projects',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
        min: 'StartDate',
      },
      {
        InternalName: 'ContractualValue',
        DisplayName: 'قيمة العقد الإجمالية',
        DisplayNameEn: 'Contractual Value',
        type: 'float',
        numberOfDigits:"15",
      },
      {
        InternalName: 'Beneficiary',
        DisplayName: 'الجهة المستفيدة من العمل',
        DisplayNameEn: 'Beneficiary',
        type: 'string',
        maxchar: 255,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255", 
      },
      {
        InternalName: 'Description',
        DisplayName: 'وصف العقد',
        DisplayNameEn: 'Description',
        type: 'multiline',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000", 
        maxchar: 5000,
      },
      {
        InternalName: 'Purpose',
        DisplayName: 'الغرض من العقد',
        DisplayNameEn: 'Purpose',
        type: 'multiline',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000", 
        maxchar: 5000,
      },
      {
        InternalName: 'FirstParty',
        DisplayName: 'الطرف الأول',
        DisplayNameEn: 'First Party',
        type: 'string',
        maxchar: 255,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255", 
      },
      {
        InternalName: 'Second',
        DisplayName: 'الطرف الثاني',
        DisplayNameEn: 'Second Party',
        type: 'string',
        maxchar: 255,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255", 
      },
      // {
      //     "InternalName": "First",
      //     "DisplayName": "الأول",
      //     "DisplayNameEn": "First",
      //     "type": "string"
      // }

      // {
      //     "InternalName": "Second",
      //     "DisplayName":"الثاني",
      //     "type":"string"
      // },
      // {
      //     "InternalName": "Preamble",
      //     "DisplayName":"التمهيد",
      //     "type":"multiline"
      // },

      // {
      //     "InternalName": "Scope",
      //     "DisplayName":"المجال",
      //     "type":"multiline"
      // }
    ],
  },
  {
    label: 'وثائق داعمة',
    labelEn: 'Supporting Documents',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'getfile',
        DisplayName: 'مرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        withAddBtn: 'true',
        // validation: 'required',
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
  //         "DisplayNameEn": "Supporting Data",
  //         "type": "file",
  //         "validation": "required",
  //         "withAddBtn":"true"
  //     }]
  // }
]
