var Information_Form = [
  {
    label: 'ادارة المؤشر',
    labelEn: 'KPIs Management',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      // {
      //   "InternalName": "Title",
      //   "DisplayNameEn": "KPI code",
      //   "DisplayName": "رمز المؤشر",
      //   "type": "string",
      //   "maxchar": "250",
      //   "validation": "required"
      // },
      // {
      //   "InternalName": "KPICode",
      //   "DisplayNameEn": "KPI code",
      //   "DisplayName": "رمز المؤشر",
      //   "type": "string",
      //   "maxchar": "250",
      //   "validation": "required"

      // },
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'المؤشر ',
        type: 'string',
        maxchar: '250',
        validation: 'required',
      },
      {
        InternalName: 'KPIType',
        DisplayNameEn: 'KPI Type',
        validation: 'required',
        DisplayName: 'نوع المؤشر',
        dynamic: "parent", //main field that affect on other chiled field
        toggleValues: [
          // {
          //   value: 'sub',
          //   fields: ['SubRelatedObjective', 'RelatedMainKpis', 'Portfolio'],
          // }, //we can put more than 1  field
          {
            value: 'sublevel2',
            fields: ['SubRelatedObjective', 'RelatedMainKpis', 'Portfolio'],
          },
          {
            value: 'sublevel3',
            fields: ['SubRelatedObjective', 'RelatedMainKpis', 'Portfolio'],
          },
          { value: 'main', fields: ['RelatedMainObjective'] }, //we can put more than 1  field
          { value: 'strategically', fields: ['StrategyRelatedObjective'] },
        ],
        type: 'dropdownValues',
        options: {
          choices: [
            // { display: "strategically", value: "strategically" },
            { display: 'main', value: 'main', customFilterValue: "main" },
            { display: 'sublevel2', value: 'sublevel2', customFilterValue: "sublevel2"},
            { display: 'sublevel3', value: 'sublevel3', customFilterValue: "sublevel3" },
            // { display: 'level2', value: 'level2' },
            // { display: 'level3', value: 'level3' },
            // { display: "sub", value: "sub" },
            // { display: "vision", value: "vision" },
            // { display: "jobmarket", value: "jobmarket" },
          ],
        },
      },
      {
        InternalName: 'RelatedStrategyObjective',
        DisplayNameEn: 'Related Strategy Objective',
        DisplayName: 'الهدف المرتبط',
        type: 'lookup',
        source: 'SOs',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        validation: 'required',
		// state: 'disabled'
      },
      {
        InternalName: 'Classification',
        DisplayNameEn: 'Classification',
        DisplayName: 'تصنيف المؤشر',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'kpiassigned', value: 'kpiassigned' },
            { display: 'kpisuscomp', value: 'kpisuscomp' },
            { display: 'kpivision', value: 'kpivision' },
            { display: 'kpistrategic', value: 'kpistrategic' },
          ],
        },
        validation: 'required',
        security: {
          groups: [
            'LMS_P',
            'SPM Admin',
            'SPM Team',
            'VRO_P',
            'System Admin Group',
          ],
        },
      },
      {
        InternalName: 'FromDate',
        DisplayName: 'من سنة',
        DisplayNameEn: 'From Date',
        max: 'ToDate',
        // type: "datetime",
        type: 'yearInput',
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
        //   ],
        // },
        validation: 'required',
      },
      {
        InternalName: 'ToDate',
        DisplayName: 'الى سنة',
        DisplayNameEn: 'To Year',
        type: 'yearInput',
        // type: "datetime",
        min: 'FromDate',
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
        //   ],
        // },
        validation: 'required',
      },
      {
        InternalName: 'CategoryKPI',
        DisplayNameEn: 'Category',
        DisplayName: 'فئة المؤشر',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'result', value: 'result' },
            { display: 'reason', value: 'reason' },
          ],
        },
      },
      {
        InternalName: 'PeriodType',
        DisplayNameEn: 'Period Type',
        DisplayName: 'تكرار القياس',
        type: 'dropdownValues',
        validation: 'required',
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
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف المؤشر',
        maxchar: '500',
        type: 'multiline',
        validation: 'required',
      },
      {
        InternalName: 'Issues',
        DisplayNameEn: 'Issues',
        DisplayName: 'التحديات',
        maxchar: '500',
        type: 'multiline',
      },
      {
        InternalName: 'Risks',
        DisplayNameEn: 'Risks',
        DisplayName: 'المخاطر',
        maxchar: '500',
        type: 'multiline',
      },
      {
        InternalName: 'ExternalFactors',
        DisplayNameEn: 'External Factors',
        DisplayName: 'العوامل الخارجية',
        maxchar: '500',
        type: 'multiline',
      },
      {
        InternalName: 'Assumptions',
        DisplayNameEn: 'Assumptions',
        DisplayName: 'الافتراضات',
        maxchar: '500',
        type: 'multiline',
      },
      {
        InternalName: 'RelatedMainKpis',
        ToggleName: 'RelatedMainKpis',
        DisplayNameEn: 'Related Main Kpis',
        DisplayName: 'المؤشر المرتبط',
        type: 'lookup',
        //add queryField,type,value to can filter in spcific val on dynamic func (dynamicAffectSelect)
        queryField: 'Types',
        queryFieldType: 'Choice', //ex: "Choice"
        queryFieldValue: 'main',
        source: 'MainKPI',
        // "state": "disabled",
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        display: 'none',
        // dynamic: 'RelatedStrategy',
        // filterField: 'RelatedStrategy',
        // filterFieldType: 'Text',
        
				dynamic: "KPIType", //InternalName Of Parent field
				filterField: "KPIType",//InternalName Of Parent field
				filterFieldType: "Choice",//Type In Sharepoint List for Parent field
        //role access
        accessFilter: [
          {
            role: 'VROE',
            conditions: [
              {
                field: 'RelatedStrategyType',
                type: 'Choice',
                values: ['vision'],
              },
              {
                field: 'Types',
                type: 'Choice',
                values: ['main'],
              },
            ],
          },
          {
            role: 'LMSP',
            conditions: [
              {
                field: 'RelatedStrategyType',
                type: 'Choice',
                values: ['lms'],
              },
              {
                field: 'Types',
                type: 'Choice',
                values: ['main'],
              },
            ],
          },
        ],
      },
      {
        InternalName: 'Owner',
        DisplayNameEn: 'Owner',
        DisplayName: 'مالك المؤشر',
        type: 'picker', //user
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
        InternalName: 'PerformanceLeader2',
        DisplayNameEn: 'Second Performance Leader',
        DisplayName: 'رائد الأداء الثاني',
        type: 'picker',
        validation: 'required',
      },
      {
        InternalName: 'CalculationType',
        DisplayNameEn: 'Calculation Type',
        DisplayName: 'نوع الحساب',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'leadingindicator', value: 'leadingindicator' },
            { display: 'laggingindicator', value: 'laggingindicator' },
          ],
        },
        // security: {
        // 	groups: [
        // 		"LMS_P",
        // 		"SPM Admin",
        // 		"SPM Team",
        // 		"VRO_P",
        // 		"System Admin Group"
        // 	],
        // },
      },
      {
        InternalName: 'Sector',
        DisplayName: 'القطاع المرتبط',
        DisplayNameEn: 'Sector',
        type: 'lookup',
        // "validation": "required",
        //from other list:
        source: 'Internal Entities',
        isSector: 'True',
        EntityType: 'Sector',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        dontSubmit: true,
        dynamic: 'parent',
        // state: 'disabled',
        // security: {
        //     groups: ["LMS_P",
        //         'EPMO', 'System Admin Group'
        //     ]
        // },
      },
      {
        InternalName: 'SubSector',
        DisplayName: 'الادارة المرتبطة',
        DisplayNameEn: 'DeputyShip',
        type: 'lookup',
        //from other list:
        source: 'Internal Entities',
        isSector: 'True',
        EntityType: 'Department',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        dontSubmit: true,
        "isRelatedToParent":true, // to show parent value depends on child like sector and subsector
        filterField: "Sector",//InternalName Of Parent field
        filterFieldType: "Text",//Type In Sharepoint List for Parent field
        // state: 'disabled',
      },
      // {
      // 	InternalName: "RecurrenceChanged",
      // 	DisplayNameEn: "Recurrence Changed",
      // 	DisplayName: "تغيير دورية القياس",
      // 	type: "yesnoradio",
      // 	options: {
      // 		choices: [
      // 			{ display: "yes", value: "yes" },
      // 			{ display: "no", value: "no" },
      // 		],
      // 	},
      // 	// security: {
      // 	// 	groups: [
      // 	// 		"LMS_P",
      // 	// 		"SPM Admin",
      // 	// 		"SPM Team",
      // 	// 		"VRO_P",
      // 	// 		"System Admin Group"
      // 	// 	],
      // 	// },
      // },
      // {
      //   "InternalName": "KPIEquation",
      //   "DisplayNameEn": "KPI Equation",
      //   "DisplayName": "معادلة المؤشر",
      //   "type": "string",
      //   "maxchar": "500",
      // },

      //mahmoud

      // {
      // 	//
      // 	InternalName: "RelatedStrategy",
      // 	DisplayNameEn: "Related Vision Strategy",
      // 	DisplayName: "الاستراتيجية المرتبطة",
      // 	// "ToggleName": "RelatedStrategy",
      // 	type: "lookup",

      // 	source: "GoalStrategy",
      // 	Dispfieldkey: "Name",
      // 	valfieldkey: "Title",
      // 	validation: "required",
      // 	dynamic: "parent", //"parentInternalName" or "parent" // if parent it will affect other fields
      // 	security: {
      // 		groups: [
      // 			"LMS_P",
      // 			"SPM Admin",
      // 			"SPM Team",
      // 			"VRO_P",
      // 			"Administrators for Project Web App",
      // 			"Project Managers for Project Web App",
      // 		],
      // 	},
      // 	//role access
      // 	accessFilter: [
      // 		{
      // 			role: "SPMTeam",
      // 			conditions: [
      // 				{
      // 					field: "Types",
      // 					type: "Choice",
      // 					values: ["ministry"],
      // 				},
      // 			],
      // 		},
      // 		{
      // 			role: "SPMAdmin",
      // 			conditions: [
      // 				{
      // 					field: "Types",
      // 					type: "Choice",
      // 					values: ["ministry"],
      // 				},
      // 			],
      // 		},
      // 		{
      // 			role: "VROE",
      // 			conditions: [
      // 				{
      // 					field: "Types",
      // 					type: "Choice",
      // 					values: ["vision"],
      // 				},
      // 			],
      // 		},
      // 		{
      // 			role: "VROP",
      // 			conditions: [
      // 				{
      // 					field: "Types",
      // 					type: "Choice",
      // 					values: ["vision"],
      // 				},
      // 			],
      // 		},
      // 		{
      // 			role: "LMSE",
      // 			conditions: [
      // 				{
      // 					field: "Types",
      // 					type: "Choice",
      // 					values: ["lms"],
      // 				},
      // 			],
      // 		},
      // 		{
      // 			role: "LMSP",
      // 			conditions: [
      // 				{
      // 					field: "Types",
      // 					type: "Choice",
      // 					values: ["lms"],
      // 				},
      // 			],
      // 		},
      // 	],
      // 	// "display":"none"
      // },
      // {
      // 	//
      // 	InternalName: "RelatedStrategyType",
      // 	DisplayNameEn: "Strategy Type",
      // 	DisplayName: "نوع  الاستراتيجية",
      // 	type: "dropdownValues",
      // 	state: "disabled",
      // 	options: {
      // 		choices: [
      // 			{ display: "sub", value: "sub" },
      // 			{ display: "vision", value: "vision" },
      // 			{ display: "ministry", value: "ministry" },
      // 			{ display: "sectorial", value: "sectorial" },
      // 			{ display: "lms", value: "lms" },
      // 		],
      // 	},
      // },
      // {
      // 	InternalName: "SubRelatedObjective", // = هدف الوكالة hadaf al wikala
      // 	DisplayNameEn: " Related Sub Objective",
      // 	DisplayName: "الهدف الفرعي المرتبط",
      // 	ToggleName: "SubRelatedObjective",
      // 	type: "lookupWithQuery",
      // 	queryField: "Types",
      // 	queryFieldType: "dropdownValues", //ex: "Choice"
      // 	queryFieldValue: "sub",
      // 	//from other list:
      // 	source: "SOs",
      // 	Dispfieldkey: "Name",
      // 	valfieldkey: "Title",
      // 	display: "none",
      // 	state: "disabled",
      // },
      // {
      // 	InternalName: "RelatedObjective", //هدف الوكالة = hadaf al wikala
      // 	DisplayNameEn: "Strategy Related Objective",
      // 	DisplayName: "الهدف الاستراتيجي المرتبط",
      // 	ToggleName: "StrategyRelatedObjective",
      // 	type: "lookupWithQuery",
      // 	queryField: "Types",
      // 	queryFieldType: "dropdownValues", //ex: "Choice"
      // 	queryFieldValue: "strategically",
      // 	//from other list:
      // 	source: "SOs",
      // 	Dispfieldkey: "Name",
      // 	valfieldkey: "Title",
      // 	display: "none",
      // },

      // {
      //   "InternalName": "MinistryGoal",
      //   "DisplayNameEn": "Ministry Goal",
      //   "DisplayName": "هدف الوزارة",
      //   // "ToggleName":"SubRelatedObjective",
      //   "type": "lookupWithQuery",
      //   "queryField": "Types",
      //   "queryFieldType": "dropdownValues", //ex: "Choice"
      //   "queryFieldValue": "ministry",
      //   //from other list:
      //   "source": "SOs",
      //   "Dispfieldkey": "Name",
      //   "valfieldkey": "Title",
      //   // "display":"none"

      // },
      // {
      // 	InternalName: "RelatedStrategyObjective",
      // 	DisplayNameEn: "Related Main Objective",
      // 	DisplayName: "الهدف الرئيسي المرتبط ", //hada al wizara  هدف الوزارة =
      // 	ToggleName: "RelatedMainObjective",
      // 	type: "lookupWithQuery",
      // 	queryField: "Types",
      // 	queryFieldType: "dropdownValues", //ex: "Choice"
      // 	queryFieldValue: "main",
      // 	source: "SOs",
      // 	Dispfieldkey: "Name",
      // 	valfieldkey: "Title",
      // 	display: "none",
      // 	state: "disabled",
      // },
      // {
      // 	InternalName: "Portfolio",
      // 	DisplayName: "المحفظة المرتبطة",
      // 	DisplayNameEn: "Portfolio",
      // 	type: "lookup",
      // 	ToggleName: "Portfolio",
      // 	// "validation": "required",
      // 	//from other list:
      // 	source: "Portfolio",
      // 	Dispfieldkey: "Name",
      // 	valfieldkey: "Title",
      // 	BIlanguage: true, //added to handle portfolio bilangual
      // 	DispfieldkeyEn: "NameEn", //added to handle portfolio bilangual
      // 	state: "disabled",
      // 	// "className":"autofill"
      // },

      // {
      //   "InternalName": "ModifiedDate",
      //   "DisplayName": "تاريخ التعديل",
      //   "DisplayNameEn": "Modified Date",
      //   "type": "datetime"
      // },
      // {
      //   "InternalName": "CreatedDate",
      //   "DisplayName": "تاريخ الإنشاء",
      //   "DisplayNameEn": "Created Date",
      //   "type": "datetime"
      // },
      // {
      //   "InternalName": "CreatedBy",
      //   "DisplayName": "إنشاء بواسطة",
      //   "DisplayNameEn": "Created By",
      //   "type": "picker"
      // },
      // {
      //   "InternalName": "ModifiedBy",
      //   "DisplayName": "تم التعديل بواسطة",
      //   "DisplayNameEn": "Modified By",
      //   "type": "picker"
      // },

      // {
      //   "InternalName": "Dimensions",
      //   "DisplayNameEn": "Dimensions",
      //   "DisplayName": "بعد الاطار",
      //   "type": "lookup",
      //   "source": "Dimensions",
      //   "Dispfieldkey": "Dimension",
      //   "valfieldkey": "Title"
      // },
      // {
      //   "InternalName": "Benchmarking",
      //   "DisplayNameEn": "Benchmarking",
      //   "DisplayName": "المقارنة المعيارية",
      //   "type": "string",
      //   "maxchar": "500",
      // },

      // {
      //   "InternalName": "Calculation",
      //   "DisplayNameEn": "Calculation",
      //   "DisplayName": "آلية حساب المؤشر",
      //   "type": "dropdownValues",
      //   options: {
      //     choices: [
      //       { display: 'last', value: 'last' },
      //       { display: 'sum', value: 'sum' },
      //       { display: 'average', value: 'average' },
      //     ]
      //   }
      // },

      // {
      //   "InternalName": "CalculationMethod",
      //   "DisplayNameEn": "Calculation Method",
      //   "DisplayName": "طريقة الحساب",
      //   "type": "dropdown",
      //   options: {
      //     choices: ['يدوي',
      //       ' مؤشرات مبادرات',
      //       'مؤشرات تشغيلية'

      //     ]
      //   }
      // },
      // {
      //   "InternalName": "Status",
      //   "DisplayNameEn": "Status",
      //   "DisplayName": "الحالة",
      //   "type": "dropdownValues",
      //   options: {
      //     choices: [
      //       { display: 'new', value: 'new' },
      //       { display: 'actual', value: 'actual' },
      //       { display: 'target', value: 'target' },
      //       { display: 'actualcompleted', value: 'actualcompleted' },
      //       { display: 'targetcompleted', value: 'targetcompleted' },
      //     ]
      //   }
      // },

      // {
      //   "InternalName": "Target",
      //   "DisplayNameEn": "Target",
      //   "DisplayName": "المستهدف",
      //   "type": "floatpercentage"
      // },
      // {
      //   "InternalName": "Actual",
      //   "DisplayNameEn": "Actual",
      //   "DisplayName": "المحقق",
      //   "type": "float"
      // },
      // {
      //   "InternalName": "Total",
      //   "DisplayNameEn": "Total",
      //   "DisplayName": "الاجمالي",
      //   "type": "float"
      // },

      // {
      //   "InternalName": "MesurePriority",
      //   "DisplayNameEn": "Mesure Priority",
      //   "DisplayName": "أولوية قياس المؤشر",
      //   "type": "dropdownValues",
      //   options: {
      //     choices: [
      //       { display: 'low', value: 'low' },
      //       { display: 'high', value: 'high' },
      //     ]
      //   }
      // },
      // {
      //   "InternalName": "KPIActivationStatus",
      //   "DisplayNameEn": "KPI Activation Status",
      //   "DisplayName": "حالة تفعيل المؤشر",
      //   "type": "dropdown",
      //   options: {
      //     choices: [
      //       'مفعّل', 'يتمّ تفعيله', 'يتمّ تفعيله في الربع الأوّل', 'يتمّ تفعيله في الربع الثاني', 'يتمّ تفعيله في الربع الثالث'
      //     ]
      //   }
      // },

      // // {
      // //   "InternalName": "RelatedStrategyObjective",
      // //   "DisplayNameEn": "Related Strategy Objective",
      // //   "DisplayName": "الأهداف الاستراتيجية المرتبطة",
      // //   "type": "lookup",
      // //   "source": "SOs",
      // //   "Dispfieldkey": "Name",
      // //   "valfieldkey": "Title"
      // // },
      // {
      //   "InternalName": "RelatedInitiativesKPIs",
      //   "DisplayNameEn": "Related Initiatives KPIs",
      //   "DisplayName": "مؤشر المبادرة المرتبطة",
      //   "type": "lookup",
      //   "source": "InitiativeKPI",
      //   "Dispfieldkey": "Name",
      //   "valfieldkey": "Title"
      // },
      // // {
      // //   "InternalName": "Formula",
      // //   "DisplayName": "المعادلة",
      // //   "type": "string"
      // // },
      // {
      //   "InternalName": "Sector",
      //   "DisplayNameEn": "Sector",
      //   "DisplayName": "القطاع",
      //   "type": "lookup",
      //   "source": "Internal Entities",
      //   "Dispfieldkey": "Name",
      //   "valfieldkey": "Title"
      // },
      // {
      //   "InternalName": "RelatedBenefits",
      //   "DisplayNameEn": "Related Benefits",
      //   "DisplayName": "المنافع المرتبطة",
      //   "type": "lookup",
      //   "source": "Benefits",
      //   "Dispfieldkey": "Title",
      //   "valfieldkey": "Title"
      // },

      // {
      //   "InternalName": "Dimensions",
      //   "DisplayName": "الأبعاد الرئيسية",
      //   "type": "lookup",
      //   "source": "Dimensions",
      //   "Dispfieldkey": "Dimension",
      //   "valfieldkey": "Title"
      // },
      // {
      //     "InternalName": "OwnerName",
      //     "DisplayNameEn": "Owner Name",
      //     "DisplayName": "اسم مالك المؤشر",
      //     "type": "string"
      // },
    ],
  },
  {
    label: 'مصدر البيانات',
    labelEn: 'Data Source',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'DataSource',
        DisplayNameEn: 'Data Source',
        DisplayName: 'مصدر البيانات',
        type: 'string',
        maxchar: '500',
      },
      {
        InternalName: 'DataSourceResponsible',
        DisplayNameEn: 'Data Source Responsible',
        DisplayName: 'مسؤول مصدر البيانات',
        type: 'string',
        maxchar: '500',
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
  {
    label: 'تفاصيل القياس',
    labelEn: 'Baseline',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Polarity',
        DisplayNameEn: 'Polarity',
        DisplayName: 'قطبية المؤشر',
        type: 'dropdown',
        options: {
          choices: ['+', '-'],
        },
        validation: 'required',
      },
      {
        InternalName: 'ResultType',
        DisplayNameEn: 'Result Type',
        DisplayName: 'وحدة القياس',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'numeric', value: 'numeric' },
            { display: 'number', value: 'number' },
            { display: 'beneficiary', value: 'beneficiary' },
            { display: 'million', value: 'million' },
            { display: 'month', value: 'month' },
            { display: 'volunteerhour', value: 'volunteerhour' },
            { display: 'partnership', value: 'partnership' },
            { display: 'side', value: 'side' },
            {
              display: 'organizationalstructure',
              value: 'organizationalstructure',
            },
            { display: 'volunteer', value: 'volunteer' },
            { display: 'percentage', value: 'percentage' },
            { display: 'saudiriyal', value: 'saudiriyal' },
          ],
        },
        security: {
          groups: [
            'LMS_P',
            'SPM Admin',
            'SPM Team',
            'VRO_P',
            'System Admin Group',
          ],
        },
      },
      {
        InternalName: 'Cumulative',
        DisplayNameEn: 'Cumulative',
        DisplayName: 'تراكمية المؤشر',
        // type: "dropdownValues",
        type: 'yesnoradio',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
          ],
        },
      },
      {
        InternalName: 'Weight',
        DisplayNameEn: 'Weight',
        DisplayName: 'وزن المؤشر',
        // type: "floatpercentage",
        type: 'float',
      },
      {
        InternalName: 'Baseline',
        DisplayNameEn: 'Baseline',
        DisplayName: 'خط الأساس',
        // type: "number",
        type: 'float',
      },
      {
        InternalName: 'MesurePeriod',
        DisplayName: 'فترة قياس خط الأساس',
        DisplayNameEn: 'Mesure Period',
        min: 'FromDate',
        type: 'datetime',
        // validation: "required",
      },
    ],
  },
  {
    label: 'مكون المعادلة',
    labelEn: 'Equation Component',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'A',
        DisplayNameEn: 'A',
        DisplayName: 'المكون الأول',
        type: 'number',
        // type: "float",
      },
      {
        InternalName: 'B',
        DisplayNameEn: 'B',
        DisplayName: 'المكون الثاني',
        type: 'number',
        // type: "float",
      },
      {
        InternalName: 'CC',
        DisplayNameEn: 'CC',
        DisplayName: 'المكون الثالث',
        type: 'number',
        // type: "float",
      },
      {
        InternalName: 'D',
        DisplayNameEn: 'D',
        DisplayName: 'المكون الرابع',
        type: 'number',
        // type: "float",
      },
      {
        InternalName: 'E',
        DisplayNameEn: 'E',
        DisplayName: 'المكون الخامس',
        type: 'number',
        // type: "float",
      },
      {
        InternalName: 'F',
        DisplayNameEn: 'F',
        DisplayName: 'المكون السادس',
        type: 'number',
        // type: "float",
      },
      {
        InternalName: 'G',
        DisplayNameEn: 'G',
        DisplayName: 'المكون السابع',
        type: 'number',
        // type: "float",
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
        // "validation": "required",
      },
    ],
  },
]
