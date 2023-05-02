var Information_Form = [
  {
    label: 'ادارة المؤشر',
    labelEn: 'KPIs Management',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    workflowSetValues: [
      //vro
      { fieldName: 'DraftStatus', value: '', stages:["VROCreateKPI02"] },
      { fieldName: 'WFModuleCode', value: '',stages:["VROCreateKPI02"] } ,
      { fieldName: 'WFStage', value: '',stages:["VROCreateKPI02"] } ,
      //EPMO
      { fieldName: 'DraftStatus', value: '', stages:["EPMOCreateKPI03"] },
      { fieldName: 'WFModuleCode', value: '',stages:["EPMOCreateKPI03"] } ,
      { fieldName: 'WFStage', value: '',stages:["EPMOCreateKPI03"] } ,
      //LMS
      { fieldName: 'DraftStatus', value: '', stages:["LMSCreateKPI02"] },
      { fieldName: 'WFModuleCode', value: '',stages:["LMSCreateKPI02"] } ,
      { fieldName: 'WFStage', value: '',stages:["LMSCreateKPI02"] } ,
    ],
    subFields: [
      {
        InternalName: 'Title',
        DisplayNameEn: 'KPI code',
        DisplayName: 'رمز المؤشر',
        type: 'string',
      },
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
        // validation: 'required',
      },
      {
        InternalName: 'KPIType',
        DisplayNameEn: 'KPI Type',
        // validation: 'required',
        DisplayName: 'نوع المؤشر',
        toggleValues: [
          { value: 'sublevel2', fields: ['RelatedStrategyObjective', 'RelatedMainKpis','Sector','SubSector'] }, //we can put more than 1  field
          { value: 'sublevel3', fields: ['RelatedStrategyObjective', 'RelatedMainKpis','Sector','SubSector'] }, //we can put more than 1  field
          // { value: 'sub', fields: ['SubRelatedObjective', 'RelatedMainKpis'] }, //we can put more than 1  field
          // { value: 'main', fields: ['RelatedMainObjective'] }, //we can put more than 1  field
          // { value: 'strategically', fields: ['StrategyRelatedObjective'] },
        ],
        type: 'dropdownValues',
        options: {
          choices: [
            // { display: "strategically", value: "strategically" },
            { display: 'main', value: 'main' },
            { display: 'sublevel2', value: 'sublevel2' },
            { display: 'sublevel3', value: 'sublevel3' },
            // { display: 'Level2', value: 'Level2' },
            // { display: 'Level3', value: 'Level3' },
            // { display: "sub", value: "sub" },
            // { display: "vision", value: "vision" },
            // { display: "jobmarket", value: "jobmarket" },
          ],
        },
      },
      {
        InternalName: 'RelatedStrategyObjective',
        DisplayNameEn: 'Related Objective',
        DisplayName: 'الهدف المرتبط ',
        ToggleName: "RelatedMainObjective",
        type: 'lookup',
        // queryField: 'Types',
        // queryFieldType: 'dropdownValues', //ex: "Choice"
        // queryFieldValue: 'main',
        source: 'SOs',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        isRelatedToParent: true, 
        fieldsinformlvl1: "Sector", // fields in form list
        sourcefieldlvl1: "Sector", // field in look up list
        fieldsinformlvl2: "SubSector", // fields in form list
        sourcefieldlvl2: "SubSector", // field in look up list
        // display: "none",
        // validation: 'required',
				showlink: true,
				linkedto: "sos",
      },
      // {
      //   InternalName: 'Sector',
      //   DisplayName: 'القطاع',
      //   DisplayNameEn: 'Sector',
      //   ToggleName: 'Sector',
      //   type: 'lookupWithQuery',
      //   queryField: 'EntityType',
      //   queryFieldType: 'dropdownValues', //ex: "Choice"
      //   // dontSubmit: true,
      //   queryFieldValue: 'Sector',
      //   // dynamic: 'parent',
      //   source: 'Internal Entities',
      //   // "state": "disabled",
      //   Dispfieldkey: 'Name',
      //   DispfieldkeyEn: 'NameEn',
      //   valfieldkey: 'Title',
      //   // validation: 'required',
      //   // display: 'none',
      // },
      // {
      //   InternalName: 'SubSector',
      //   DisplayName: 'الوكالات',
      //   DisplayNameEn: 'DeputyShip',
      //   ToggleName: 'SubSector',
      //   type: 'lookup',
      //   //from other list:
      //   source: 'Internal Entities',
      //   // "isSector": "True",
      //   // "EntityType": "Department",
      //   Dispfieldkey: 'Name',
      //   DispfieldkeyEn: 'NameEn',
      //   valfieldkey: 'Title',
      //   // validation: 'required',
      //   isRelatedToParent: true, // to show parent value depends on child like sector and subsector
      //   // dynamic: 'Sector', //InternalName Of Parent field
      //   filterField: 'ParentEntity', //InternalName Of Parent field
      //   filterFieldType: 'Text', //Type In Sharepoint List for Parent field
      //   // display: 'none',
      //   // dontSubmit: true,
      // },
      {
        InternalName: 'Sector',
        DisplayName: 'القطاع',
        DisplayNameEn: 'Sector',
        type: 'lookupWithQuery',
        queryField: 'EntityType',
        queryFieldType: 'dropdownValues', //ex: "Choice"
        // dontSubmit: true,
        queryFieldValue: 'Sector',
        dynamic: 'parent',
        source: 'Internal Entities',
        // "state": "disabled",
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        // validation: 'required',
      },
      {
        InternalName: 'SubSector',
        DisplayName: 'الوكالة',
        DisplayNameEn: 'DeputyShip',
        type: 'lookup',
        //from other list:
        source: 'Internal Entities',
        // "isSector": "True",
        // "EntityType": "Department",
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        // validation: 'required',
        isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        dynamic: 'Sector', //InternalName Of Parent field
        filterField: 'ParentEntity', //InternalName Of Parent field
        filterFieldType: 'Text', //Type In Sharepoint List for Parent field
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
        // validation: 'required',
      },
      {
        InternalName: 'FromDate',
        DisplayName: 'من سنة',
        DisplayNameEn: 'From Year',
        type: 'string',
        // validation: "required",
      },
      {
        InternalName: 'ToDate',
        DisplayName: 'الى سنة',
        DisplayNameEn: 'To Year',
        type: 'string',
        // validation: "required",
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
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف المؤشر',
        maxchar: '500',
        type: 'multiline',
      },
      {
        InternalName: 'PeriodType',
        DisplayNameEn: 'Period Type',
        DisplayName: 'تكرار القياس',
        type: 'dropdownValues',
        // "validation": "required",
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
        InternalName: 'Issues',
        DisplayNameEn: 'Issues',
        DisplayName: 'التحديات',
        // maxchar: '500',
        type: 'multiline',
      },
      {
        InternalName: 'Risks',
        DisplayNameEn: 'Risks',
        DisplayName: 'المخاطر',
        // maxchar: '500',
        type: 'multiline',
      },
      {
        InternalName: 'ExternalFactors',
        DisplayNameEn: 'External Factors',
        DisplayName: 'العوامل الخارجية',
        // maxchar: '500',
        type: 'multiline',
      },
      {
        InternalName: 'Assumptions',
        DisplayNameEn: 'Assumptions',
        DisplayName: 'الافتراضات',
        // maxchar: '500',
        type: 'multiline',
      },
      {
        InternalName: 'RelatedMainKpis',
        ToggleName: 'RelatedMainKpis',
        DisplayNameEn: 'Related Main Kpis',
        DisplayName: 'المؤشر المرتبط',
        type: 'lookupWithQuery',
        queryField: 'Types',
        queryFieldType: 'dropdownValues', //ex: "Choice"
        queryFieldValue: 'main',
        source: 'MainKPI',
        // "state": "disabled",
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // display: "none",
      },
      {
        InternalName: 'Owner',
        DisplayNameEn: 'Owner',
        DisplayName: 'مالك المؤشر',
        type: 'picker',
        state: 'disabled',
        // validation: 'required',
      },
      {
        InternalName: 'PerformanceLeader',
        DisplayNameEn: 'Performance Leader',
        DisplayName: 'رائد الأداء',
        type: 'picker',
        state: 'disabled',
        // validation: 'required',
      },
      {
        InternalName: 'PerformanceLeader2',
        DisplayNameEn: 'Second Performance Leader',
        DisplayName: 'رائد الأداء الثاني',
        type: 'picker',
        state: 'disabled',
        // validation: 'required',
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
        InternalName: 'RecurrenceChanged',
        DisplayNameEn: 'Recurrence Changed',
        DisplayName: 'تغيير دورية القياس',
        type: 'yesnoradio',
        // validation: 'required',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no', selected: 'selected' },
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
        InternalName: 'ProgressStatus',
        DisplayName: 'حالة الإنجاز',
        DisplayNameEn: 'Progress Status',
        type: 'string',
      },
      {
        InternalName: 'NotMeasurableNow',
        DisplayNameEn: 'Not Measurable Now',
        DisplayName: 'لايقاس حاليا',
        type: 'yesnoradio',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
          ],
        },
      },
      {
        InternalName: 'Performance',
        DisplayNameEn: 'Performance',
        DisplayName: 'الأداء',
        type: 'number',
      },
      {
        InternalName: 'TotalActual',
        DisplayNameEn: 'Total Actual',
        DisplayName: 'إجمالي الفعلي',
        type: 'number',
      },
      {
        InternalName: 'TotalPlanned',
        DisplayNameEn: 'Total Planned',
        DisplayName: 'إجمالي المخطط',
        type: 'number',
      },
      // {
      //     InternalName: "Types",
      //     DisplayNameEn: "Types",
      //     validation: "required",
      //     DisplayName: "نوع المؤشر",
      //     toggleValues: [
      //         { value: "sub", fields: ["SubRelatedObjective", "RelatedMainKpis"] }, //we can put more than 1  field
      //         { value: "main", fields: ["RelatedMainObjective"] }, //we can put more than 1  field
      //         { value: "strategically", fields: ["StrategyRelatedObjective"] },
      //     ],
      //     type: "dropdownValues",
      //     options: {
      //         choices: [
      //             // { display: "strategically", value: "strategically" },
      //             { display: "main", value: "main" },
      //             { display: "sub", value: "sub" },
      //             // { display: "vision", value: "vision" },
      //             // { display: "jobmarket", value: "jobmarket" },
      //         ],
      //     },
      // },
      // {
      //   //
      //   InternalName: 'RelatedStrategy',
      //   DisplayNameEn: 'Related Vision Strategy',
      //   DisplayName: 'الاستراتيجية المرتبطة',
      //   // "ToggleName": "RelatedStrategy",
      //   type: 'lookup',

      //   source: 'GoalStrategy',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   // "validation": "required"
      //   // "display":"none"
      // },
      // {
      //   //
      //   InternalName: 'RelatedStrategyType',
      //   DisplayNameEn: 'Strategy Type',
      //   DisplayName: 'نوع  الاستراتيجية',
      //   type: 'dropdownValues',
      //   state: 'disabled',
      //   options: {
      //     choices: [
      //       { display: 'sub', value: 'sub' },
      //       { display: 'vision', value: 'vision' },
      //       { display: 'ministry', value: 'ministry' },
      //       { display: 'sectorial', value: 'sectorial' },
      //     ],
      //   },
      // },
      // {
      //   // InternalName: "SubRelatedObjective",
      //   // DisplayNameEn: " Related Sub Objective",
      //   // DisplayName: "الهدف الفرعي المرتبط",
      //   // ToggleName: "SubRelatedObjective",
      //   // type: "string",
      //   // // queryField: "Types",
      //   // // queryFieldType: "dropdownValues", //ex: "Choice"
      //   // // queryFieldValue: "sub",
      //   // // //from other list:
      //   // // source: "SOs",
      //   // // Dispfieldkey: "Name",
      //   // // valfieldkey: "Title",
      //   // // display: "none",
      //   InternalName: 'SubRelatedObjective',
      //   DisplayNameEn: 'Related Sub Objective',
      //   DisplayName: 'الهدف الفرعي المرتبط ',
      //   // ToggleName: "RelatedMainObjective",
      //   type: 'lookupWithQuery',
      //   queryField: 'Types',
      //   queryFieldType: 'dropdownValues', //ex: "Choice"
      //   queryFieldValue: 'sub',
      //   source: 'SOs',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      // },
      // {
      //   InternalName: 'RelatedObjective',
      //   DisplayNameEn: 'Strategy Related Objective',
      //   DisplayName: 'الهدف الاستراتيجي المرتبط',
      //   ToggleName: 'StrategyRelatedObjective',
      //   type: 'string',
      //   // queryField: "Types",
      //   // queryFieldType: "dropdownValues", //ex: "Choice"
      //   // queryFieldValue: "strategically",
      //   // //from other list:
      //   // source: "SOs",
      //   // Dispfieldkey: "Name",
      //   // valfieldkey: "Title",
      //   // display: "none",
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
      //   InternalName: 'Sector',
      //   DisplayName: 'القطاع المرتبط',
      //   DisplayNameEn: 'Sector',
      //   type: 'lookup',
      //   // "validation": "required",
      //   //from other list:
      //   source: 'Internal Entities',
      //   isSector: 'True',
      //   EntityType: 'Sector',
      //   Dispfieldkey: 'Name',
      //   DispfieldkeyEn: 'NameEn',
      //   valfieldkey: 'Title',
      //   dontSubmit: true,
      //   // "state": "disabled",
      //   // security: {
      //   //     groups: [
      //   //         'EPMO', 'Administrators for Project Web App'
      //   //     ]
      //   // },
      // },
      // {
      //   InternalName: 'SubSector',
      //   DisplayName: 'الادارة المرتبطة',
      //   DisplayNameEn: 'Departments',
      //   type: 'lookup',
      //   //from other list:
      //   source: 'Internal Entities',
      //   isSector: 'True',
      //   EntityType: 'Department',
      //   Dispfieldkey: 'Name',
      //   DispfieldkeyEn: 'NameEn',
      //   valfieldkey: 'Title',
      //   dynamic: "Sector", //InternalName Of Parent field
      //   // "state": "disabled",
      // },
      // {
      //   InternalName: 'Portfolio',
      //   DisplayName: 'المحفظة المرتبطة',
      //   DisplayNameEn: 'Portfolio',
      //   type: 'lookup',
      //   ToggleName: 'Portfolio',
      //   // "validation": "required",
      //   //from other list:
      //   source: 'Portfolio',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   BIlanguage: true, //added to handle portfolio bilangual
      //   DispfieldkeyEn: 'NameEn', //added to handle portfolio bilangual
      //   state: 'disabled',
      //   // "className":"autofill"
      // },
      // {
      //     InternalName: "RelatedObjective",
      //     DisplayNameEn: "Strategy Related Objective",
      //     DisplayName: "القطاع المرتبط",
      //     type: "string",
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
      //     "InternalName": "OwnerName",
      //     "DisplayNameEn": "Owner Name",
      //     "DisplayName": "اسم مالك المؤشر",
      //     "type": "string"
      //   },
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
        type: 'string', //in view should be string
        //   "maxchar": "500",
      },
    ],
  },
  {
    label: 'تفاصيل القياس',
    labelEn: 'Baseline',
    description: '',
    descriptionEn: '',
    subFields: [
      {
        InternalName: 'Polarity',
        DisplayNameEn: 'Polarity',
        DisplayName: 'قطبية المؤشر',
        type: 'yesnoradio',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
          ],
        },
        // validation: 'required',
      },
      // {
      //   InternalName: 'Polarity',
      //   DisplayNameEn: 'Polarity',
      //   DisplayName: 'قطبية المؤشر',
      //   type: 'string',
      // },
      // {
      //   InternalName: 'PeriodType',
      //   DisplayNameEn: 'Period Type',
      //   DisplayName: 'تكرار القياس',
      //   type: 'dropdownValues',
      //   validation: 'required',
      //   options: {
      //     choices: [
      //       { display: 'monthly', value: 'monthly' },
      //       { display: 'quarter', value: 'quarter' },
      //       { display: 'midterm', value: 'midterm' },
      //       { display: 'year', value: 'year' },
      //     ],
      //   },
      // },
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
            'SPM Admin',
            'SPM Team',
            'VRO_P',
            'Administrators for Project Web App',
            'Project Managers for Project Web App',
          ],
        },
      },
      {
        InternalName: 'Cumulative',
        DisplayNameEn: 'Cumulative',
        DisplayName: 'تراكمية المؤشر',
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
        type: 'floatpercentage',
      },
      {
        InternalName: 'Baseline',
        DisplayNameEn: 'Baseline',
        DisplayName: 'خط الأساس',
        type: 'number',
      },
      {
        InternalName: 'MesurePeriod',
        DisplayName: 'فترة قياس خط الأساس',
        DisplayNameEn: 'Mesure Period',
        min: 'FromDate',
        type: 'datetime',
        // validation: "required",
      },
      // {
      //   InternalName: 'MesureStatus',
      //   DisplayNameEn: 'MesureStatus',
      //   DisplayName: 'حالة القياس',
      //   type: 'dropdownValues',
      //   //   "state": "disabled",
      //   //   dynamic: "Initiative",
      //   options: {
      //     choices: [
      //       {
      //         display: 'mersurable',
      //         value: 'mersurable',
      //       },
      //       {
      //         display: 'unmersurable',
      //         value: 'unmersurable',
      //       },
      //       // {
      //       //     display: 'novalue',
      //       //     value: 'novalue'
      //       // },
      //       {
      //         display: 'completed',
      //         value: 'completed',
      //       },
      //       {
      //         display: 'unspecific',
      //         value: 'unspecific',
      //       },
      //     ],
      //   },
      // },
    ],
  },
  {
    label: 'مكونات المعادلة',
    labelEn: 'Equation Component',
    description: '',
    descriptionEn: '',
    subFields: [
      {
        InternalName: 'KPIEquation',
        DisplayNameEn: 'KPI Equation',
        DisplayName: 'معادلة المؤشر',
        type: 'string',
        state: 'disabled',
        //editableBy: "PerformanceLeader",
      },
      // {
      //   InternalName: 'Quarter',
      //   DisplayNameEn: 'Quarter',
      //   DisplayName: 'الربع',
      //   ToggleName: 'Quarter',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       { display: 'quarter1', value: 'ActualQ1' },
      //       { display: 'quarter2', value: 'ActualQ2' },
      //       { display: 'quarter3', value: 'ActualQ3' },
      //       { display: 'quarter4', value: 'ActualQ4' },
      //     ],
      //   },
      // },
      // {
      //   InternalName: 'Midterms',
      //   DisplayNameEn: 'Midterms',
      //   DisplayName: 'النصف السنوي',
      //   ToggleName: 'Midterms',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       { display: 'midterm1', value: 'ActualMid1' },
      //       { display: 'midterm2', value: 'ActualMid2' },
      //     ],
      //     // "display":"none"
      //   },
      // },
      // {
      //   InternalName: 'Years',
      //   DisplayNameEn: 'Years',
      //   DisplayName: 'السنوي',
      //   ToggleName: 'Years',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       { display: 'yearly', value: 'ActualY' },
      //       // { display: "midterm2", value: "ActualMid2" },
      //     ],
      //     // "display":"none"
      //   },
      // },
      {
        InternalName: 'Year',
        DisplayNameEn: 'Year',
        DisplayName: 'السنة',
        type: 'dropdown',
        //   "state": "disabled",
        //   dynamic: "Initiative",
        options: {
          choices: [
            '2020',
            '2021',
            '2022',
            '2023',
            '2024',
            '2025',
            '2026',
            '2027',
            '2028',
            '2029',
            '2030',
          ],
        },
      },
      {
        InternalName: 'Months',
        DisplayNameEn: 'Month',
        DisplayName: 'الشهر',
        ToggleName: 'Months',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'month1', value: 'ActualM1' },
            { display: 'month2', value: 'ActualM2' },
            { display: 'month3', value: 'ActualM3' },
            { display: 'month4', value: 'ActualM4' },
            { display: 'month5', value: 'ActualM5' },
            { display: 'month6', value: 'ActualM6' },
            { display: 'month7', value: 'ActualM7' },
            { display: 'month8', value: 'ActualM8' },
            { display: 'month9', value: 'ActualM9' },
            { display: 'month10', value: 'ActualM10' },
            { display: 'month11', value: 'ActualM11' },
            { display: 'month12', value: 'ActualM12' },
          ],
        },
        //    "display":"none"
      },
      //   {
      //     "InternalName": "MesureStatus",
      //     "DisplayNameEn": "MesureStatus",
      //     "DisplayName": "حالة القياس",
      //       "type": "dropdownValues",
      //     //   "state": "disabled",
      //     //   dynamic: "Initiative",
      //     options: {
      //       choices: [
      //         {
      //             display: 'mersurable',
      //             value: 'mersurable'
      //         },
      //         {
      //             display: 'unmersurable',
      //             value: 'unmersurable'
      //         },
      //         // {
      //         //     display: 'novalue',
      //         //     value: 'novalue'
      //         // },
      //         {
      //             display: 'completed',
      //             value: 'completed'
      //         },
      //         {
      //             display: 'unspecific',
      //             value: 'unspecific'
      //         },
      //       ]
      //     }
      //   },
      {
        InternalName: 'A',
        DisplayName: 'المكون الأول (A)',
        DisplayNameEn: 'A',
        type: 'float',
        //editableBy: "PerformanceLeader",
      },
      {
        InternalName: 'B',
        DisplayName: 'المكون الثاني (B)',
        DisplayNameEn: 'B',
        type: 'float',
        //editableBy: "PerformanceLeader",
      },
      {
        InternalName: 'CC',
        DisplayName: 'المكون الثالث (C)',
        DisplayNameEn: 'C',
        type: 'float',
        //editableBy: "PerformanceLeader",
      },
      {
        InternalName: 'D',
        DisplayName: 'المكون الرابع (D)',
        DisplayNameEn: 'D',
        type: 'float',
        //editableBy: "PerformanceLeader",
      },
      {
        InternalName: 'E',
        DisplayName: 'المكون الخامس (E)',
        DisplayNameEn: 'E',
        type: 'float',
        //editableBy: "PerformanceLeader",
      },
      {
        InternalName: 'F',
        DisplayName: 'المكون السادس (F)',
        DisplayNameEn: 'F',
        type: 'float',
        //editableBy: "PerformanceLeader",
      },
      {
        InternalName: 'G',
        DisplayName: 'المكون السابع (G)',
        DisplayNameEn: 'G',
        type: 'float',
        //editableBy: "PerformanceLeader",
      },
      // {
      //   InternalName: 'Equation',
      //   DisplayNameEn: 'Actual value',
      //   DisplayName: 'القيمة الفعلية',
      //   type: 'float',
      //   state: 'disabled',
      //   //editableBy: "PerformanceLeader",
      // },
      // {
      //   InternalName: 'PerformanceAnalysis',
      //   DisplayNameEn: 'Performance Analysis',
      //   DisplayName: 'تحليل الأداء',
      //   maxchar: '500',
      //   type: 'multiline',
      // },
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
  //         "type": "file"
  //     }]
  // }
]
