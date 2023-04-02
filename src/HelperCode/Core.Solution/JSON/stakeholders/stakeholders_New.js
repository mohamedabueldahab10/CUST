var Information_Form = [
  {
    label: 'بيانات صاحب المصلحة',
    labelEn: 'Stakeholder Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
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
        toggleValues: [
          { value: 'stackholderinternal', fields: ['Username'] }, 
          { value: 'stackholderexternal', fields: ['Name'] }, 
        ],
        toggleDisabledValues: [
          { value: 'stackholderexternal', fields: ['JobTitle','Email','PhoneNumber'] }, 
          { value: 'stackholderinternal', fields: ['JobTitle','Email'] }, 
        ],
        validation: 'required',

      },
      {
        InternalName: 'Username',
        DisplayNameEn: 'Internal Name',
        DisplayName: 'الاسم الداخلي',
        type: 'picker', //user
        validation: 'required',
        display: 'none',
        ToggleName: 'Username',
        targetsiblingarr:["JobTitle","Email","PhoneNumber"] // to get the values from ppicker attr and update in these fields(special for stakholders)
      },
      {
        InternalName: 'Name',
        DisplayName: 'الاسم الخارجي',
        DisplayNameEn: 'External Name',
        type: 'lookup',
        source: 'External Owners',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        validation: 'required',
        display: 'none',
        ToggleName: 'Name',
        targetsiblingarr:["JobTitle","Email","PhoneNumber"] // to get the value of this fields and set it on it dynamiclly

      },
      {
        InternalName: 'JobTitle',
        DisplayName: 'المسمى الوظيفي',
        DisplayNameEn: 'Job Title',
        type: 'string',
        maxchar: 255,
        validation: 'required',
        ToggleDisabledName:"JobTitle"
      },
      {
        InternalName: 'Email',
        DisplayName: 'البريد الالكتروني',
        DisplayNameEn: 'Email',
        type: 'email',
        validation: 'required',
        ToggleDisabledName:"Email"

      },
      {
        InternalName: 'PhoneNumber',
        DisplayName: 'رقم الهاتف',
        DisplayNameEn: 'Phone Number',
        // type: 'floatwithoutformatting',
        type:'phonenumber',
        Errmsgkey:"phonenumberpattern",
        validation: 'required',
        ToggleDisabledName:"PhoneNumber"

      },
      {
        InternalName: 'Role',
        DisplayName: 'الدور في المشروع',
        DisplayNameEn: 'Role',
        type: 'string',
        maxchar: 255,
      },

      {
        InternalName: 'Department',
        DisplayName: 'الإدارة',
        DisplayNameEn: 'Department',
        type: 'string',
        maxchar: 255,
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
        maxchar: 5000,        

      },
      {
        InternalName: 'Requirements',
        DisplayName: 'المتطلبات',
        DisplayNameEn: 'Requirements',
        type: 'multiline',
        maxchar: 5000,        

      },
      {
        InternalName: 'Expectations',
        DisplayName: 'التوقعات',
        DisplayNameEn: 'Expectations',
        type: 'multiline',
        maxchar: 5000,        

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
        // type: 'multiline',
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
  // {
  //     label: 'الوثائق الداعمة',
  //     labelEn:'Attachments',
  //     description: "",
  //     descriptionEn:"",
  //     subFields:[
  //         {
  //             "InternalName": "getfile",
  //             "DisplayName":"المرفقات",
  //             "DisplayNameEn":"Attachments",
  //             "type":"file",
  //             "withAddBtn":"true"
  //         }
  //     ]
  // }
]
