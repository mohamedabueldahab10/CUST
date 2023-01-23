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
      {
        InternalName: 'StartDate',
        DisplayName: 'تاريخ بدء العقد',
        DisplayNameEn: 'Start Date',
        type: 'datetime',
        max: 'EndDate',
      },
      {
        InternalName: 'EndDate',
        DisplayName: 'تاريخ إنتهاء العقد',
        DisplayNameEn: 'End Date',
        type: 'datetime',
        min: 'StartDate',
      },

      {
        InternalName: 'ContractualValue',
        DisplayName: 'قيمة العقد الإجمالية',
        DisplayNameEn: 'Contractual Value',
        type: 'float',
      },
      {
        InternalName: 'Beneficiary',
        DisplayName: 'الجهة المستفيدة من العمل',
        DisplayNameEn: 'Beneficiary',
        type: 'string',
      },
      {
        InternalName: 'Description',
        DisplayName: 'وصف العقد',
        DisplayNameEn: 'Description',
        type: 'multiline',
        maxchar: 5000,
      },
      {
        InternalName: 'Purpose',
        DisplayName: 'الغرض من العقد',
        DisplayNameEn: 'Purpose',
        type: 'multiline',
        maxchar: 5000,
      },
      {
        InternalName: 'FirstParty',
        DisplayName: 'الطرف الأول',
        DisplayNameEn: 'First Party',
        type: 'string',
      },
      {
        InternalName: 'Second',
        DisplayName: 'الطرف الثاني',
        DisplayNameEn: 'Second Party',
        type: 'string',
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
    labelEn: 'Attachments',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Attachments',
        DisplayName: 'مرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        withAddBtn: 'true',
        // validation: 'required',
      },
    ],
  },
  // {
  //     label: 'المرفقات',
  //     labelEn: 'Attachments',
  //     description: "",
  //     descriptionEn: "",
  //     subFields: [{
  //         "InternalName": "getfile",
  //         "DisplayName": "المرفقات",
  //         "DisplayNameEn": "Attachments",
  //         "type": "file",
  //         "validation": "required",
  //         "withAddBtn":"true"
  //     }]
  // }
]
