var Information_Form = [
  {
    label: 'بطاقة مقياس المنفعة',
    labelEn: ' Benefit Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayNameEn": "Title",
      //     "DisplayName": "رمز المنفعة",
      //     "type": "string",
      //     "validation": "required",
      //     "maxchar": "250"
      // },
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'مقياس المنفعة',
        type: 'string',
        maxchar: '250',
        validation: 'required',
      },
      {
        InternalName: 'Description',
        DisplayName: 'وصف المقياس',
        DisplayNameEn: 'Description',
        type: 'multiline',
        maxchar: 5000,
      },
      {
        // hol dynamic 3ala l lookup
        InternalName: 'RelatedBenefit',
        DisplayNameEn: 'RelatedBenefit',
        DisplayName: 'المنفعةالمرتبطة',
        type: 'lookup',
        source: 'Benefits',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // dynamic:"mainfield",//controls others data
      },
      {
        InternalName: 'PeriodType',
        DisplayNameEn: 'Period Type',
        DisplayName: 'دورية القياس',
        state: 'disabled',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'year', value: 'year' },
            { display: 'quarter', value: 'quarter' },
            { display: 'halfyear', value: 'halfyear' },
            { display: 'month', value: 'month' },
          ],
        },
        validation: 'required',
      },
      {
        InternalName: 'Owner',
        DisplayNameEn: 'Owner',
        DisplayName: 'مالك مقياس المنفعة',
        type: 'picker',
        // "state": "disabled",
        // dynamic: "Initiative"
      },
      {
        InternalName: 'Weight',
        DisplayNameEn: 'Weight',
        DisplayName: 'وزن ',
        type: 'floatpercentage',
        // "state": "disabled",
        // dynamic: "Initiative"
      },
      {
        InternalName: 'Equation',
        DisplayNameEn: 'Equation',
        DisplayName: 'المعادلة',
        type: 'string',
        maxchar: '250',
        validation: 'required',
      },
      {
        InternalName: 'MesureStatus',
        DisplayNameEn: 'MesureStatus',
        DisplayName: 'حالة القياس',
        type: 'dropdownValues',
        //   "state": "disabled",
        //   dynamic: "Initiative",
        options: {
          choices: [
            {
              display: 'mersurable',
              value: 'mersurable',
            },
            {
              display: 'unmersurable',
              value: 'unmersurable',
            },
            {
              display: 'unspecific',
              value: 'unspecific',
            },
          ],
        },
      },
      {
        InternalName: 'Polarity',
        DisplayNameEn: 'Polarity',
        DisplayName: 'قطبية المؤشر',
        type: 'dropdown',
        //   "state": "disabled",
        //   dynamic: "Initiative",
        options: {
          choices: ['+', '-'],
        },
        validation: 'required',
      },
      {
        InternalName: 'ResultType',
        DisplayNameEn: 'Result Type',
        // "state": "disabled",
        // dynamic: "Initiative",
        DisplayName: 'وحدة القياس',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'number', value: 'number' },
            { display: 'percentage', value: 'percentage' },
          ],
        },
      },
      {
        InternalName: 'FromDate',
        DisplayName: 'من سنة',
        DisplayNameEn: 'From Date',
        max: 'ToDate',
        type: 'datetime',
        validation: 'required',
      },
      {
        InternalName: 'ToDate',
        DisplayName: 'إلى سنة',
        DisplayNameEn: 'To Date',
        min: 'FromDate',
        type: 'datetime',
        validation: 'required',
      },
      {
        InternalName: 'PerformanceLeader',
        DisplayNameEn: 'Performance Leader',
        DisplayName: 'رائد الأداء',
        type: 'picker',
        validation: 'required',
      },
      {
        InternalName: 'TargetValue',
        DisplayNameEn: 'Target Value',
        DisplayName: 'القيمة المستهدفة',
        type: 'float',
        validation: 'required',
      },
      // {
      //   InternalName: 'Quarter',
      //   DisplayNameEn: 'Quarter',
      //   DisplayName: 'الربع',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       { display: 'quarter1', value: 'quarter1' },
      //       { display: 'quarter2', value: 'quarter2' },
      //       { display: 'quarter3', value: 'quarter3' },
      //       { display: 'quarter4', value: 'quarter4' },
      //     ],
      //   },
      //   // security: {
      //   //     groups: [
      //   //         'SPM Admin', 'SPM Team', 'VRO_P', 'Performance Leaders', 'Administrators for Project Web App', 'OPMO', 'Project Managers for Project Web App'
      //   //     ]
      //   // },
      // },
      // {
      //   InternalName: 'Year',
      //   DisplayNameEn: 'Year',
      //   DisplayName: 'السنة',
      //   type: 'yearInput',
      //   //   "state": "disabled",
      //   //   dynamic: "Initiative",
      //   // options: {
      //   //     choices: [
      //   //         '2020',
      //   //         '2021',
      //   //         '2022',
      //   //         '2023',
      //   //         '2024',
      //   //         '2025',
      //   //         '2026',
      //   //         '2027',
      //   //         '2028',
      //   //         '2029',
      //   //         '2030',
      //   //     ]
      //   // },
      //   // security: {
      //   //     groups: [
      //   //         'SPM Admin', 'SPM Team', 'VRO_P', 'Performance Leaders', 'Administrators for Project Web App', 'OPMO', 'Project Managers for Project Web App'
      //   //     ]
      //   // },
      // },
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
