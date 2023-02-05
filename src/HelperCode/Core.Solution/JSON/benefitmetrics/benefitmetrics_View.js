var Information_Form = [
  {
    label: 'بطاقة مقياس المنفعة',
    labelEn: ' Benefit Data',
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [
      {
          "InternalName": "Title",
          "DisplayNameEn": "Title",
          "DisplayName": "رمز مقياس المنفعة",
          "type": "string",
          // "maxchar": "250"
      },
      {
        "InternalName": "Name",
        "DisplayNameEn": "Name",
        "DisplayName": "مقياس المنفعة",
        "type": "string",
        // "maxchar": "250",
        // "validation": "required"
      },
      {// hol dynamic 3ala l lookup 
        "InternalName": "RelatedBenefit",
        "DisplayNameEn": "RelatedBenefit",
        "DisplayName": "المنفعة المرتبطة",
        "type": "lookup",
        "source": "Benefits",
        "Dispfieldkey": "Name",
        "valfieldkey": "Title",
        // dynamic:"mainfield",//controls others data
      },
      // {
      //   // hol dynamic 3ala l lookup
      //   InternalName: 'RelatedBenefit',
      //   DisplayNameEn: 'Related Benefit',
      //   DisplayName: 'المنفعة المرتبطة',
      //   // type: 'lookup',
      //   type: 'lookupwithoutrepeat',
      //   source: 'Benefits',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   // dynamic:"mainfield",//controls others data
      //   listname:'BenefitMetrics',
      //   targetelement: 'RelatedBenefit',
      //   // queryField: 'Types', // if i need to make the field with filter should add this like lookupwithquery type
      //   // queryFieldType: 'dropdownValues', //ex: "Choice"// if i need to make the field with filter should add this
      //   // queryFieldValue: 'sub',// if i need to make the field with filter should add this
      // },
      {
        InternalName: 'PeriodType',
        DisplayNameEn: 'Period Type',
        DisplayName: 'تكرار القياس',
        type: 'dropdownValues',
        toggleValues: [
          { value: 'monthly', fields: ['Months'] }, //we can put more than 1  field
          { value: 'quarter', fields: ['Quarter'] }, //we can put more than 1  field
          { value: 'midterm', fields: ['Midterms'] },
          { value: 'year', fields: ['Years'] },
        ],
        state: 'disabled',
        options: {
          choices: [
            { display: 'monthly', value: 'monthly' },
            { display: 'quarter', value: 'quarter' },
            { display: 'midterm', value: 'midterm' },
            { display: 'year', value: 'year' },
          ],
        },
      
      },
      
      {
        "InternalName": "Owner",
        "DisplayNameEn": "Owner",
        "DisplayName": "مالك مقياس المنفعة",
        "type": "picker",
        // "state": "disabled",
        // dynamic: "Initiative"
      },
      {
        "InternalName": "Weight",
        "DisplayNameEn": "Weight",
        "DisplayName": "وزن ",
        "type":"floatpercentage"
        // "state": "disabled",
        // dynamic: "Initiative"
      },
      // {
      //   "InternalName": "Quarter",
      //   "DisplayNameEn": "Quarter",
      //   "DisplayName": "الربع",
      //   type: "dropdownValues",
      //   options: {
      //     choices: [
      //       { display: "quarter1", value: "quarter1" },
      //       { display: "quarter2", value: "quarter2" },
      //       { display: "quarter3", value: "quarter3" },
      //       { display: "quarter4", value: "quarter4" },
      //     ],
      //   },
      //   // security: {
      //   //     groups: [
      //   //         'SPM Admin', 'SPM Team', 'VRO_P', 'Performance Leaders', 'Administrators for Project Web App', 'OPMO', 'Project Managers for Project Web App'
      //   //     ]
      //   // },
      // },
      // {
      //   "InternalName": "Year",
      //   "DisplayNameEn": "Year",
      //   "DisplayName": "السنة",
      //   "type": "string",
      //   //   "state": "disabled",
      //   //   dynamic: "Initiative",
      //   // options: {
      //   //   choices: [
      //   //     '2020',
      //   //     '2021',
      //   //     '2022',
      //   //     '2023',
      //   //     '2024',
      //   //     '2025',
      //   //     '2026',
      //   //     '2027',
      //   //     '2028',
      //   //     '2029',
      //   //     '2030',
      //   //   ]
      //   // },
      //   // security: {
      //   //     groups: [
      //   //         'SPM Admin', 'SPM Team', 'VRO_P', 'Performance Leaders', 'Administrators for Project Web App', 'OPMO', 'Project Managers for Project Web App'
      //   //     ]
      //   // },
      // },
      // {
      //   InternalName: 'Equation',
      //   DisplayNameEn: 'Equation',
      //   DisplayName: 'المعادلة',
      //   type: 'string'
      // },
      {
        "InternalName": "MesureStatus",
        "DisplayNameEn": "MesureStatus",
        "DisplayName": "حالة القياس",
        "type": "dropdownValues",
        //   "state": "disabled",
        //   dynamic: "Initiative",
        options: {
          choices: [
            {
              display: 'mersurable',
              value: 'mersurable'
            },
            {
              display: 'unmersurable',
              value: 'unmersurable'
            },
            {
              display: 'unspecific',
              value: 'unspecific'
            },
          ]
        },

      },
      {
        "InternalName": "Polarity",
        "DisplayNameEn": "Polarity",
        "DisplayName": "قطبية المقياس",
        "type": "string",
        //   "state": "disabled",
        //   dynamic: "Initiative",
        // options: {
        //   choices: [
        //     '+', '-'
        //   ]
        // }
      },
      {
        "InternalName": "ResultType",
        "DisplayNameEn": "Result Type",
        // "state": "disabled",
        // dynamic: "Initiative",
        "DisplayName": "وحدة القياس",
        "type": "dropdownValues",
        options: {
          choices: [
            { display: 'number', value: 'number' },
            { display: 'percentage', value: 'percentage' },
          ]
        }
      },
      {
        InternalName: 'FromDate',
        DisplayName: 'من سنة',
        DisplayNameEn: 'From Date',
        // type: 'datetimetoparent',
        type: 'string',
        // listname: 'Initiatives',
        // startinternalname: 'StartDate',
        // endinternalname: 'FinishDate',
        // max: 'ToDate',
        // type: 'datetime',
        // validation: 'required',
      },
      {
        InternalName: 'ToDate',
        DisplayName: 'إلى سنة',
        DisplayNameEn: 'To Date',
        // type: 'datetimetoparent',
        type: 'string',
        // listname: 'Initiatives',
        // startinternalname: 'StartDate',
        // endinternalname: 'FinishDate',
        // min: 'FromDate',
        // type: 'datetime',
        // validation: 'required',
      },
      {
        InternalName: 'DataSource',
        DisplayNameEn: 'Data Source',
        DisplayName: 'مصدر البيانات',
        type: 'string',
        maxchar: '500',
        // "state": "disabled",
        // dynamic: "Initiative"
      },
      {
        InternalName: 'PerformanceLeader',
        DisplayNameEn: 'Performance Leader',
        DisplayName: 'رائد الأداء',
        type: 'picker',
      },
      // {
      //   InternalName: 'TargetValue',
      //   DisplayNameEn: 'Target Value',
      //   DisplayName: 'القيمة المستهدفة',
      //   type: 'float',
      // },
      // {
      //     InternalName: 'ActualValue',
      //     DisplayName:'القيمة الفعلية',
      //     DisplayNameEn: 'ActualValue',
      //     type:'float'
         
      // }

    ]
  },
  {
    label: "مكونات المعادلة",
    labelEn: "Equation components",
    description: "",
    descriptionEn: "",
    subFields: [{
            InternalName: "BenefitEquation",
            DisplayNameEn: "Benefit Equation",
            DisplayName: "معادلة مقياس المنفعة",
            type: "string",
            state: "disabled",
            //editableBy: "PerformanceLeader",
        },
        {
            "InternalName": "Quarter",
            "DisplayNameEn": "Quarter",
            "DisplayName": "الربع",
            // ToggleName: "Quarter",
            type: "dropdownValues",
            options: {
                choices: [
                    { display: "quarter1", value: "Actual1" },
                    { display: "quarter2", value: "Actual2" },
                    { display: "quarter3", value: "Actual3" },
                    { display: "quarter4", value: "Actual4" },
                ],
            },
          
        },
        {
            "InternalName": "Midterms",
            "DisplayNameEn": "Midterms",
            "DisplayName": "النصف السنوي",
            //  ToggleName: "Midterms",
            type: "dropdownValues",
            options: {
                choices: [
                    { display: "midterm1", value: "Actual1" },
                    { display: "midterm2", value: "Actual2" },
                ],
                // "display":"none"
            },
         
        },
        {
            "InternalName": "Years",
            "DisplayNameEn": "Years",
            "DisplayName": "السنوي",
            //  ToggleName: "Years",
            type: "dropdownValues",
            options: {
                choices: [
                    { display: "yearly", value: "Actual1" },
                    // { display: "midterm2", value: "Actual2" },
                ],
                // "display":"none"
            },
         
        },
        {
          InternalName: 'Year',
          DisplayNameEn: 'Year',
          DisplayName: 'السنة',
          type: 'string',
          //   "state": "disabled",
          //   dynamic: "Initiative",
          // options: {
          //   choices: [
          //     '2020',
          //     '2021',
          //     '2022',
          //     '2023',
          //     '2024',
          //     '2025',
          //     '2026',
          //     '2027',
          //     '2028',
          //     '2029',
          //     '2030',
          //     '2031',
          //     '2032',
          //     '2033',
          //     '2034',
          //     '2035',
          //   ],
          // },
      
        },
          {
            InternalName: "Months",
            DisplayNameEn: "Month",
            DisplayName: "الشهر",
            ToggleName: "Months",
            type: "dropdownValues",
            options: {
                choices: [
                    { display: "month1",  value: "Actual1" },
                    { display: "month2", value: "Actual2" },
                    { display: "month3", value: "Actual3" },
                    { display: "month4", value: "Actual4" },
                    { display: "month5",  value: "Actual5" },
                    { display: "month6",  value: "Actual6" },
                    { display: "month7",  value: "Actual7" },
                    { display: "month8",  value: "Actual8" },
                    { display: "month9",  value: "Actual9" },
                    { display: "month10", value: "Actual10" },
                    { display: "month11", value: "Actual11" },
                    { display: "month12", value: "Actual12" },
                ],
            },
        //    "display":"none"
        },
       
        {
            InternalName: "A",
            DisplayName: "المكون الأول (A)",
            DisplayNameEn: "A",
            type: "float",
            //editableBy: "PerformanceLeader",
        },
        {
            InternalName: "B",
            DisplayName: "المكون الثاني (B)",
            DisplayNameEn: "B",
            type: "float",
            //editableBy: "PerformanceLeader",
        },
        {
            InternalName: "CC",
            DisplayName: "المكون الثالث (C)",
            DisplayNameEn: "C",
            type: "float",
            //editableBy: "PerformanceLeader",
        },
        {
            InternalName: "D",
            DisplayName: "المكون الرابع (D)",
            DisplayNameEn: "D",
            type: "float",
            //editableBy: "PerformanceLeader",
        },
        {
            InternalName: "E",
            DisplayName: "المكون الخامس (E)",
            DisplayNameEn: "E",
            type: "float",
            //editableBy: "PerformanceLeader",
        },
        {
            InternalName: "F",
            DisplayName: "المكون السادس (F)",
            DisplayNameEn: "F",
            type: "float",
            //editableBy: "PerformanceLeader",
        },
        {
            InternalName: "G",
            DisplayName: "المكون السابع (G)",
            DisplayNameEn: "G",
            type: "float",
            //editableBy: "PerformanceLeader",
        },
        {
            InternalName: "Equation",
            DisplayNameEn: "Actual value",
            DisplayName: "القيمة الفعلية",
            type: "float",
            state: "disabled",
            //editableBy: "PerformanceLeader",
        },
     
    ],
},
];