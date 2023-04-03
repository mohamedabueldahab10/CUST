var Information_Form = [
  {
    label: 'ادارة المؤشر',
    labelEn: 'KPIs Management',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    formValuesBasedOnParent: [
      // add getGrandParent if the value based on grandParent and basedOnCondition to check if based on condition or not
      {
        parentList: 'SOs', listinerField: "RelatedStrategyObjective", parentFieldName: 'Title', fieldName: 'RelatedStrategy', basedOnCondition: false, 
        getGrandParent: [
          { grandParentList: "GoalStrategy", grandParentFieldName: "Title", grandParentTargetFieldName: "Types" }
        ],
        valueToSet: [
          {
            condition: "vision", values: [
              { fieldNameInList: "WFModuleCode", fieldValueInList: "VROCreateKPI" },
              { fieldNameInList: "WFStage", fieldValueInList: "VROCreateKPI01" },
              { fieldNameInList: "DraftStatus", fieldValueInList: "draft" },
            ]
          },
          {
            condition: "lms",
            values: [{ fieldNameInList: "WFModuleCode", fieldValueInList: "LMSCreateKPI" },
            { fieldNameInList: "WFStage", fieldValueInList: "LMSCreateKPI01" },
            { fieldNameInList: "DraftStatus", fieldValueInList: "draft" },]
          },
          {
            condition: "ministry",
            values: [{ fieldNameInList: "WFModuleCode", fieldValueInList: "EPMOCreateKPI" },
            { fieldNameInList: "WFStage", fieldValueInList: "EPMOCreateKPI01" },
            { fieldNameInList: "DraftStatus", fieldValueInList: "draft" },]
          },

        ]
      }
    ],
    // formDefaultValues: [
    //   //VRO
    //   { fieldName: 'WFModuleCode', value: 'VROCreateKPI',roles: ['VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },
    //   { fieldName: 'WFStage', value: 'VROCreateKPI01',roles: ['VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },
    //   { fieldName: 'DraftStatus', value: 'draft' ,roles: ['VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },

    //   //EPMOCOC
    //   { fieldName: 'WFModuleCode', value: 'EPMOCreateKPI',roles: ['SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },
    //   { fieldName: 'WFStage', value: 'EPMOCreateKPI01',roles:  ['SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },
    //   { fieldName: 'DraftStatus', value: 'draft',roles:  ['SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },

    //   //LMS
    //   { fieldName: 'WFModuleCode', value: 'LMSCreateKPI',roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },
    //   { fieldName: 'WFStage', value: 'LMSCreateKPI01',roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },
    //   { fieldName: 'DraftStatus', value: 'draft',roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },

    // ],
    subFields: [
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'المؤشر ',
        type: 'string',
        maxchar: '255',
        withletters: true,
        Errmsgkey: "withletterpattern",
        validation: 'required',
      },
      {
        InternalName: 'KPIType',
        DisplayNameEn: 'KPI Type',
        validation: 'required',
        DisplayName: 'نوع المؤشر',
        dynamic: 'parent', //main field that affect on other chiled field
        type: 'dropdownValues',
        toggleValues: [
          { value: 'main', fields: ['Sector', 'SubSector'] }, //we can put more than 1  field
          { value: 'sublevel2', fields: ['RelatedMainKpis', 'Sector', 'SubSector'] }, //we can put more than 1  field
          { value: 'sublevel3', fields: ['RelatedMainKpis', 'Sector', 'SubSector'] }, //we can put more than 1  field
        ],
        options: {
          choices: [
            {
              display: 'main',
              value: 'main',
              // customFilterValue: 'main',
            },
            {
              display: 'sublevel2',
              value: 'sublevel2',
              // customFilterValue: 'sublevel2',
            },
            {
              display: 'sublevel3',
              value: 'sublevel3',
              //customFilterValue: 'sublevel3',
            },
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
        dynamic: "KPIType", //InternalName Of Parent field
        filterField: "Types",//InternalName Of Parent field
        filterFieldType: "Choice",
        ///
        ///
        // display: 'none',
        // ToggleName:'RelatedStrategyObjective',
      },
      {
        InternalName: 'Sector',
        DisplayName: 'القطاع',
        DisplayNameEn: 'Sector',
        ToggleName: "Sector",
        type: 'lookupWithQuery',
        queryField: 'EntityType',
        queryFieldType: 'dropdownValues', //ex: "Choice"
        dontSubmit: true,
        queryFieldValue: 'Sector',
        dynamic: 'parent',
        source: 'Internal Entities',
        // "state": "disabled",
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        display: 'none',
        state: 'disabled'
        // validation: 'required',
      },
      {
        InternalName: 'SubSector',
        DisplayName: 'الوكالات',
        DisplayNameEn: 'DeputyShip',
        ToggleName: "SubSector",
        type: 'lookup',
        //from other list:
        source: 'Internal Entities',
        // "isSector": "True",
        // "EntityType": "Department",
        dontSubmit: true,
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        // validation: 'required',
        isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        dynamic: 'Sector', //InternalName Of Parent field
        filterField: 'ParentEntity', //InternalName Of Parent field
        filterFieldType: 'Text', //Type In Sharepoint List for Parent field
        display: 'none',
        state: 'disabled'

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
        maxchar: '5000',
        type: 'multiline',
        validation: 'required',
      },
      {
        InternalName: 'Issues',
        DisplayNameEn: 'Issues',
        DisplayName: 'التحديات',
        maxchar: '5000',
        type: 'multiline',
      },
      {
        InternalName: 'Risks',
        DisplayNameEn: 'Risks',
        DisplayName: 'المخاطر',
        maxchar: '5000',
        type: 'multiline',
      },
      {
        InternalName: 'ExternalFactors',
        DisplayNameEn: 'External Factors',
        DisplayName: 'العوامل الخارجية',
        maxchar: '5000',
        type: 'multiline',
      },
      {
        InternalName: 'Assumptions',
        DisplayNameEn: 'Assumptions',
        DisplayName: 'الافتراضات',
        maxchar: '5000',
        type: 'multiline',
      },
      {
        InternalName: 'RelatedMainKpis',
        ToggleName: 'RelatedMainKpis',
        DisplayNameEn: 'Related Main Kpis',
        DisplayName: 'المؤشر المرتبط',
        // type: 'lookup',
        type: 'lookupWithQuery',
        //add queryField,type,value to can filter in spcific val on dynamic func (dynamicAffectSelect)
        queryField: 'Types',
        queryFieldType: 'dropdownValues', //ex: "Choice"
        // queryFieldType: 'Choice', //ex: "Choice"
        queryFieldValue: 'main',
        source: 'MainKPI',
        // "state": "disabled",
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // display: 'none',
        security: {
          groups: [
            'LMS_P',
            'SPM Admin',
            'SPM Team',
            'VRO_P',
            'System Admin Group',
          ],
        },
        accessFilter: [
          {
            role: 'VROE',
            conditions: [
              // {
              //   field: 'RelatedStrategyType',
              //   type: 'Choice',
              //   values: ['vision'],
              // },
              {
                field: 'KPIType',
                type: 'Choice',
                values: ['main'],
              },
            ],
          },
          {
            role: 'LMSP',
            conditions: [
              // {
              //   field: 'RelatedStrategyType',
              //   type: 'Choice',
              //   values: ['lms'],
              // },
              {
                field: 'KPIType',
                type: 'Choice',
                values: ['main'],
              },
            ],
          },
        ],
        // projectCodeInList: true //value in look up drop down should be related to current project
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
        InternalName: 'NotMeasurableNow',
        DisplayNameEn: 'Not Measurable Now',
        DisplayName: 'لايقاس حاليا',
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
        InternalName: 'Performance',
        DisplayNameEn: 'Performance',
        DisplayName: 'الأداء',
        type: 'number',
      },
      {
        InternalName: 'TotalActual',
        DisplayNameEn: 'TotalActual',
        DisplayName: 'إجمالي الفعلي',
        type: 'number',
      },
      {
        InternalName: 'TotalPlanned',
        DisplayNameEn: 'TotalPlanned',
        DisplayName: 'إجمالي المخطط',
        type: 'number',
      },

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
        maxchar: '255',
      },
      {
        InternalName: 'DataSourceResponsible',
        DisplayNameEn: 'Data Source Responsible',
        DisplayName: 'مسؤول مصدر البيانات',
        type: 'string',
        maxchar: '255',
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
        type: "floatpercentage",
        // type: 'float',
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
  // {
  //   label: 'مكون المعادلة',
  //   labelEn: 'Equation Component',
  //   description: 'التفاصيل',
  //   descriptionEn: 'Details',
  //   subFields: [
  //     {
  //       InternalName: 'A',
  //       DisplayNameEn: 'A',
  //       DisplayName: 'المكون الأول',
  //       type: 'number',
  //       // type: "float",
  //     },
  //     {
  //       InternalName: 'B',
  //       DisplayNameEn: 'B',
  //       DisplayName: 'المكون الثاني',
  //       type: 'number',
  //       // type: "float",
  //     },
  //     {
  //       InternalName: 'CC',
  //       DisplayNameEn: 'CC',
  //       DisplayName: 'المكون الثالث',
  //       type: 'number',
  //       // type: "float",
  //     },
  //     {
  //       InternalName: 'D',
  //       DisplayNameEn: 'D',
  //       DisplayName: 'المكون الرابع',
  //       type: 'number',
  //       // type: "float",
  //     },
  //     {
  //       InternalName: 'E',
  //       DisplayNameEn: 'E',
  //       DisplayName: 'المكون الخامس',
  //       type: 'number',
  //       // type: "float",
  //     },
  //     {
  //       InternalName: 'F',
  //       DisplayNameEn: 'F',
  //       DisplayName: 'المكون السادس',
  //       type: 'number',
  //       // type: "float",
  //     },
  //     {
  //       InternalName: 'G',
  //       DisplayNameEn: 'G',
  //       DisplayName: 'المكون السابع',
  //       type: 'number',
  //       // type: "float",
  //     },
  //     {
  //       InternalName: 'NotMeasurableNow',
  //       DisplayNameEn: 'Not Measurable Now',
  //       DisplayName: 'لايقاس حاليا',
  //       // type: "dropdownValues",
  //       type: 'yesnoradio',
  //       options: {
  //         choices: [
  //           { display: 'yes', value: 'yes' },
  //           { display: 'no', value: 'no' },
  //         ],
  //       },
  //     },
  //   ],
  // },
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
