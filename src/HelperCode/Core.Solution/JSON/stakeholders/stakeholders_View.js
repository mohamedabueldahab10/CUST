var Information_Form = [
  {
    label: 'بيانات صاحب المصلحة',
    labelEn: 'Stakeholder Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Title',
        DisplayName: 'رمز صاحب المصلحة',
        DisplayNameEn: 'Code',
        type: 'string',
      },
      {
        InternalName: 'StakeholderType',
        DisplayName: 'النوع',
        DisplayNameEn: 'Type',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'stackholderinternal', value: 'stackholderinternal' },
            { display: 'stackholderexternal', value: 'stackholderexternal' },
          ],
        },

        "toggleValues": [{ value: 'Username', fields: ['stackholderinternal'] }],
      },
      {
        InternalName: 'Username',
        DisplayNameEn: 'Username',
        DisplayName: 'اسم المستخدم',
        type: 'picker', //user
        ToggleName: 'Username',
        display: 'none'
      },
      {
        InternalName: 'Name',
        DisplayName: 'الاسم',
        DisplayNameEn: 'Name',
        type: 'string',
      },
      {
        InternalName: 'JobTitle',
        DisplayName: 'المسمى الوظيفي',
        DisplayNameEn: 'Job Title',
        type: 'string',
      },
      {
        InternalName: 'Email',
        DisplayName: 'البريد الالكتروني',
        DisplayNameEn: 'Email',
        type: 'string',
      },
      {
        InternalName: 'PhoneNumber',
        DisplayName: 'رقم الهاتف',
        DisplayNameEn: 'Phone Number',
        // type: 'floatwithoutformatting',
        type:'phonenumber',
      },
      {
        InternalName: 'Role',
        DisplayName: 'الدور في المشروع',
        DisplayNameEn: 'Role',
        type: 'string',
      },

      {
        InternalName: 'Department',
        DisplayName: 'الإدارة',
        DisplayNameEn: 'Department',
        type: 'string',
      },
      {
        InternalName: 'Interest',
        DisplayName: 'الاهتمامات',
        DisplayNameEn: 'Interest',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'high', value: 'high' },
            { display: 'medium', value: 'medium' },
            { display: 'low', value: 'low' },
          ],
        },
      },
      {
        InternalName: 'Description',
        DisplayName: 'الوصف',
        DisplayNameEn: 'Description',
        type: 'multiline',
      },
      {
        InternalName: 'Requirements',
        DisplayName: 'المتطلبات',
        DisplayNameEn: 'Requirements',
        type: 'multiline',
      },
      {
        InternalName: 'Expectations',
        DisplayName: 'التوقعات',
        DisplayNameEn: 'Expectations',
        type: 'multiline',
      },
      {
        InternalName: 'InfluenceLevel',
        DisplayName: 'مستوى التأثير',
        DisplayNameEn: 'Influence Level',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'pr02important', value: 'pr02important' },
            { display: 'pr03medium', value: 'pr03medium' },
            { display: 'pr04low', value: 'pr04low' },
          ],
        },
      },
      // {
      //     "InternalName": "PowerLevel",
      //     "DisplayName":"مستوى الطاقة",
      //     "DisplayNameEn":"Power Level",
      //     "type":"string"
      // },
      {
        InternalName: 'TypeOfEngagement',
        DisplayName: 'نوع المشاركة',
        DisplayNameEn: 'Type Of Engagement',
        // "type":"multiline"
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'pr02important', value: 'pr02important' },
            { display: 'pr03medium', value: 'pr03medium' },
            { display: 'pr04low', value: 'pr04low' },
          ],
        },
      },
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
]
