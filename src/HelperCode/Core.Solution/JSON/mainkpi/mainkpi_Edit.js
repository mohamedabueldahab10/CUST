var Information_Form = [
  {
    label: 'ادارة المؤشر',
    labelEn: 'KPIs Management',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    // formDefaultValues: [
    //   { fieldName: 'WFModuleCode', value: 'VROActualKPI',roles: ['VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },
    //   { fieldName: 'WFStage', value: 'VROActualKPI01',roles: ['VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },
    //   // { fieldName: 'DraftStatus', value: 'draft' ,roles: ['Administrator','VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },

    //   { fieldName: 'WFModuleCode', value: 'MSActualKPI',roles: ['EPMO','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },
    //   { fieldName: 'WFStage', value: 'MSActualKPI01',roles:  ['EPMO','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },
    //   // { fieldName: 'DraftStatus', value: 'draft',roles:  ['Administrator','EPMO','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },

    //   { fieldName: 'WFModuleCode', value: 'LMSActualKPI',roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },
    //   { fieldName: 'WFStage', value: 'LMSActualKPI01',roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },
    //   // { fieldName: 'DraftStatus', value: 'draft',roles: ['Administrator','LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },

    // ],
    formValuesBasedOnParent: [
      // add getGrandParent if the value based on grandParent and basedOnCondition to check if based on condition or not
      {
        parentList: 'SOs', listinerField: "RelatedStrategyObjective", parentFieldName: 'Title', fieldName: 'RelatedStrategy', basedOnCondition: true,basedOnFieldName: "A",basedOnFieldValue: "notempty",
        getGrandParent: [
          { grandParentList: "GoalStrategy", grandParentFieldName: "Title", grandParentTargetFieldName: "Types" }
        ],
        valueToSet: [
          {
            condition: "vision", values: [
              { fieldNameInList: "WFModuleCode", fieldValueInList: "VROActualKPI" },
              { fieldNameInList: "WFStage", fieldValueInList: "VROActualKPI01" },
              // { fieldNameInList: "DraftStatus", fieldValueInList: "draft" },
              // { fieldNameInList: "RecurrenceChanged", fieldValueInList: "no" },
            ]
          },
          {
            condition: "lms",
            values: [{ fieldNameInList: "WFModuleCode", fieldValueInList: "LMSActualKPI" },
            { fieldNameInList: "WFStage", fieldValueInList: "LMSActualKPI01" },
              // { fieldNameInList: "DraftStatus", fieldValueInList: "draft" },
              // { fieldNameInList: "RecurrenceChanged", fieldValueInList: "no" },
            ]
          },
          {
            condition: "ministry",
            values: [{ fieldNameInList: "WFModuleCode", fieldValueInList: "MSActualKPI" },
            { fieldNameInList: "WFStage", fieldValueInList: "MSActualKPI01" },
              // { fieldNameInList: "DraftStatus", fieldValueInList: "draft" },
              // { fieldNameInList: "RecurrenceChanged", fieldValueInList: "no" },
            ]
          },

        ]
      }
    ],
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
        maxchar: '255',
        withletters: true,
        Errmsgkey: "withletterpattern",
        validation: 'required',
        //ToggleDisabledName: 'Name',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
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
              display: 'main', value: 'main',
              // customFilterValue: 'main',

            },
            {
              display: 'sublevel2',
              value: 'sublevel2',
              //customFilterValue: 'main',
            },
            {
              display: 'sublevel3',
              value: 'sublevel3',
              //customFilterValue: 'sublevel2',
            },
          ],

        }, security: {
          groups: [
            'LMS_P',
            'VRO_P',
            //'Performance Leaders',
            'System Admin Group',
          ],
        },
      },
      // {
      //   InternalName: "Class",
      //   DisplayName: "نوع الاستراتيجية",
      //   DisplayNameEn: "Strategy Type",
      //   type: "dropdownValues",
      //   validation: 'required',
      //   options: {
      //     choices: [
      //       {
      //         display: 'vision',
      //         value: 'vision',
      //         roles: ['Administrator', 'EPMO', 'LMSUExecution', 'VROE',],//the purpose is we dont need the creation cycle if EPMO or Admin create a initiaitve
      //         // otherFields: [
      //         //   { fieldName: 'WFModuleCode', value: 'VisionInitiative' },
      //         //   { fieldName: 'WFStage', value: 'VInStage01' },
      //         //   { fieldName: 'DraftStatus', value: '' },
      //         // ],
      //       },
      //       {
      //         display: 'strategically',
      //         value: 'strategically',
      //         roles: ['Administrator', 'EPMO', 'LMSUExecution', 'VROE',],//the purpose is we dont need the creation cycle if EPMO or Admin create a initiaitve
      //         // otherFields: [
      //         //   { fieldName: 'WFModuleCode', value: 'StrategicallyInitiative' },
      //         //   { fieldName: 'WFStage', value: 'SInStage01' },
      //         //   { fieldName: 'DraftStatus', value: '' },
      //         // ],
      //       },
      //       {
      //         display: 'lms',
      //         value: 'lms',
      //         roles: ['Administrator', 'EPMO', 'LMSUExecution', 'VROE',],
      //         // otherFields: [
      //         //   { fieldName: 'WFModuleCode', value: 'LMSInitiative' },
      //         //   { fieldName: 'WFStage', value: 'LInStage01' },
      //         //   { fieldName: 'DraftStatus', value: '' },
      //         // ],
      //       },
      //       //---end EPMO and Admin Section ----
      //       {
      //         display: 'vision',
      //         value: 'vision',
      //         roles: ['LMSE', 'LMSP', 'LMSUPerformance', 'LMSUControl', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'InitiativeManager', 'InitiativeOwner', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'],
      //         otherFields: [
      //           { fieldName: "WFModuleCode", value: "VROCreateKPI" },
      //           { fieldName: "WFStage", value: "VROCreateKPI01" },
      //          // { fieldName: "Class", value: "vision" },
      //           { fieldName: "Status", value: "stat31" },
      //           { fieldName: "DraftStatus", value: "draft" },
      //         ],
      //       },
      //       {
      //         display: 'strategically',
      //         value: 'strategically',
      //         roles: ['LMSE', 'LMSP', 'LMSUPerformance', 'LMSUControl', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'InitiativeManager', 'InitiativeOwner', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'],
      //         otherFields: [
      //           { fieldName: "WFModuleCode", value: "EPMOCreateKPI" },
      //           { fieldName: "WFStage", value: "EPMOCreateKPI01" },
      //           // { fieldName: "Class", value: "ministry" },
      //           { fieldName: "Status", value: "stat31" },
      //           { fieldName: "DraftStatus", value: "draft" },
      //         ],
      //       },
      //       {
      //         display: 'lms',
      //         value: 'lms',
      //         roles: ['LMSE', 'LMSP', 'LMSUPerformance', 'LMSUControl', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'InitiativeManager', 'InitiativeOwner', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'],
      //         otherFields: [
      //           { fieldName: "WFModuleCode", value: "LMSCreateKPI" },
      //           { fieldName: "WFStage", value: "LMSCreateKPI01" },
      //           { fieldName: "Status", value: "stat31" },
      //           { fieldName: "DraftStatus", value: "draft" },
      //         ],
      //       },
      //     ],
      //   },

      // },
      {
        InternalName: 'RelatedStrategyObjective',
        DisplayNameEn: 'Related Strategy Objective',
        DisplayName: 'الهدف المرتبط',
        type: 'lookup',
        source: 'SOs',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        validation: 'required',
        // dynamic: "KPIType", //InternalName Of Parent field
        // filterField: "Types",//InternalName Of Parent field
        // filterFieldType: "Choice",
        // display: 'none',
        // ToggleName:'RelatedStrategyObjective',
        fieldsinformlvl1: "Sector", // fields in look up list
        sourcefieldlvl1: "Sector",
        fieldsinformlvl2: "SubSector", // fields in look up list
        sourcefieldlvl2: "SubSector",
        security: {
          groups: [
            'LMS_P',
            'VRO_P',
            //'Performance Leaders',
            'System Admin Group',
          ],
        },
      },
      {
        "InternalName": "Sector",
        "DisplayName": "القطاع",
        "DisplayNameEn": "Sector",
        "type": "lookupWithQuery",
        "queryField": "EntityType",
        "queryFieldType": "dropdownValues", //ex: "Choice"
        // dontSubmit: true,
        "queryFieldValue": "Sector",
        // dynamic: "parent",
        "source": "Internal Entities",
        // "state": "disabled",
        "Dispfieldkey": "Name",
        "DispfieldkeyEn": "NameEn",
        "valfieldkey": "Title",
        // "validation": "required",
        display: 'none',        
        descPhraseAr: "قطاع الهدف المرتبط",
        descPhraseEn: "Related Objective Sector",
        state: 'disabled',
        ToggleName: "Sector",
        // dontSubmit: true,
      },
      {
        "InternalName": "SubSector",
        "DisplayName": "الوكالة",
        "DisplayNameEn": "DeputyShip",
        "type": "lookup",
        //from other list:
        "source": "Internal Entities",
        // "isSector": "True",
        // "EntityType": "Department",
        "Dispfieldkey": "Name",
        "DispfieldkeyEn": "NameEn",
        "valfieldkey": "Title",
        // "validation": "required",
        "isRelatedToParent": true, // to show parent value depends on child like sector and subsector
        // dynamic: "Sector", //InternalName Of Parent field
        filterField: "ParentEntity",//InternalName Of Parent field
        filterFieldType: "Text",//Type In Sharepoint List for Parent field
        display: 'none',
        state: 'disabled',               
        descPhraseAr: "وكالة الهدف المرتبط",
        descPhraseEn: "Related Objective DeputyShip",
        ToggleName: "SubSector",
        // dontSubmit: true,
      },
      {
        InternalName: 'Classification',
        DisplayNameEn: 'Classification',
        //ToggleDisabledName: 'Classification',
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
        security: {
          groups: [
            'LMS_P',
            'VRO_P',
            //'Performance Leaders',
            'System Admin Group',
          ],
        },
        validation: 'required',
        // security: {
        //   groups: [
        //     'LMS_P',
        //     'SPM Admin',
        //     'SPM Team',
        //     'VRO_P',
        //     'System Admin Group',
        //   ],
        // },
      },
      {
        InternalName: 'CategoryKPI',
        DisplayNameEn: 'Category',
        DisplayName: 'فئة المؤشر',
        //ToggleDisabledName: 'CategoryKPI',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'result', value: 'result' },
            { display: 'reason', value: 'reason' },
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
        InternalName: 'PeriodType',
        DisplayNameEn: 'Period Type',
        DisplayName: 'تكرار القياس',
        type: 'dropdownValues',
        validation: 'required',
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
        security: {
          groups: [
            'LMS_P',
            'SPM Admin',
            'Performance Leaders',
            'SPM Team',
            'VRO_P',
            'System Admin Group',
          ],
        },
      },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف المؤشر',
        //ToggleDisabledName: 'Description',
        maxchar: '5000',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        type: 'multiline',
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
        InternalName: 'Issues',
        DisplayNameEn: 'Issues',
        DisplayName: 'التحديات',
        //ToggleDisabledName: 'Issues',
        maxchar: '5000',
        type: 'multiline',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        security: {
          groups: [
            'LMS_P',
            'VRO_P',
            //'Performance Leaders',
            'System Admin Group',
          ],
        },
      },
      {
        InternalName: 'Risks',
        DisplayNameEn: 'Risks',
        DisplayName: 'المخاطر',
        //ToggleDisabledName: 'Risks',
        maxchar: '5000',
        type: 'multiline',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        security: {
          groups: [
            'LMS_P',
            'VRO_P',
            //'Performance Leaders',
            'System Admin Group',
          ],
        },
      },
      {
        InternalName: 'ExternalFactors',
        DisplayNameEn: 'External Factors',
        DisplayName: 'العوامل الخارجية',
        //ToggleDisabledName: 'ExternalFactors',
        maxchar: '5000',
        type: 'multiline',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        security: {
          groups: [
            'LMS_P',
            'VRO_P',
            //'Performance Leaders',
            'System Admin Group',
          ],
        },
      },
      {
        InternalName: 'Assumptions',
        DisplayNameEn: 'Assumptions',
        DisplayName: 'الافتراضات',
        //ToggleDisabledName: 'Assumptions',
        maxchar: '5000',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        type: 'multiline',
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
      //   {
      //     //
      //     InternalName: 'RelatedStrategy',
      //     DisplayNameEn: 'Related Vision Strategy',
      //     DisplayName: 'الاستراتيجية المرتبطة',
      //     // "ToggleName": "RelatedStrategy",
      //     type: 'lookup',

      //     source: 'GoalStrategy',
      //     Dispfieldkey: 'Name',
      //     valfieldkey: 'Title',
      //     validation: 'required',
      //     // "display":"none"
      //     dynamic: 'parent', //"parentInternalName" or "parent" // if parent it will affect other fields
      //     security: {
      //       groups: [
      //         'LMS_P',
      //         'SPM Admin',
      //         'SPM Team',
      //         'VRO_P',
      //         'Administrators for Project Web App',
      //         'Project Managers for Project Web App',
      //         //'Performance Leaders',
      //       ],
      //     },
      //     //role access
      //     accessFilter: [
      //       {
      //         role: 'SPMTeam',
      //         conditions: [
      //           {
      //             field: 'Types',
      //             type: 'Choice',
      //             values: ['ministry'],
      //           },
      //         ],
      //       },
      //       {
      //         role: 'SPMAdmin',
      //         conditions: [
      //           {
      //             field: 'Types',
      //             type: 'Choice',
      //             values: ['ministry'],
      //           },
      //         ],
      //       },
      //       {
      //         role: 'VROE',
      //         conditions: [
      //           {
      //             field: 'Types',
      //             type: 'Choice',
      //             values: ['vision'],
      //           },
      //         ],
      //       },
      //       {
      //         role: 'VROP',
      //         conditions: [
      //           {
      //             field: 'Types',
      //             type: 'Choice',
      //             values: ['vision'],
      //           },
      //         ],
      //       },
      //       {
      //         role: 'LMSE',
      //         conditions: [
      //           {
      //             field: 'Types',
      //             type: 'Choice',
      //             values: ['lms'],
      //           },
      //         ],
      //       },
      //       {
      //         role: 'LMSP',
      //         conditions: [
      //           {
      //             field: 'Types',
      //             type: 'Choice',
      //             values: ['lms'],
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     //
      //     InternalName: 'RelatedStrategyType',
      //     DisplayNameEn: 'Strategy Type',
      //     DisplayName: 'نوع  الاستراتيجية',
      //     type: 'dropdownValues',
      //     state: 'disabled',
      //     options: {
      //       choices: [
      //         { display: 'sub', value: 'sub' },
      //         { display: 'vision', value: 'vision' },
      //         { display: 'ministry', value: 'ministry' },
      //         { display: 'sectorial', value: 'sectorial' },
      //         { display: 'lms', value: 'lms' },
      //       ],
      //     },
      //   },
      //   {
      //     InternalName: 'SubRelatedObjective',
      //     DisplayNameEn: ' Related Sub Objective',
      //     DisplayName: 'الهدف الفرعي المرتبط',
      //     ToggleName: 'SubRelatedObjective',
      //     type: 'lookupWithQuery',
      //     queryField: 'Types',
      //     queryFieldType: 'dropdownValues', //ex: "Choice"
      //     queryFieldValue: 'sub',
      //     //from other list:
      //     source: 'SOs',
      //     Dispfieldkey: 'Name',
      //     valfieldkey: 'Title',
      //     display: 'none',
      //     // "state": "disabled",
      //     security: {
      //       groups: [
      //         'LMS_P',
      //         'SPM Admin',
      //         'SPM Team',
      //         'VRO_P',
      //         'System Admin Group',
      //       ],
      //     },
      //   },
      {
        InternalName: 'RelatedMainKpis',
        ToggleName: 'RelatedMainKpis',
        DisplayNameEn: 'Related Main Kpis',
        //ToggleDisabledName: 'RelatedMainKpis',
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
        descPhraseAr: "المؤشر الرئيسي المرتبط ",
        descPhraseEn: "Related Main KPIs",
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

      //   {
      //     InternalName: 'RelatedObjective',
      //     DisplayNameEn: 'Strategy Related Objective',
      //     DisplayName: 'الهدف الاستراتيجي المرتبط',
      //     ToggleName: 'StrategyRelatedObjective',
      //     type: 'lookupWithQuery',
      //     queryField: 'Types',
      //     queryFieldType: 'dropdownValues', //ex: "Choice"
      //     queryFieldValue: 'strategically',
      //     //from other list:
      //     source: 'SOs',
      //     Dispfieldkey: 'Name',
      //     valfieldkey: 'Title',
      //     display: 'none',
      //     security: {
      //       groups: [
      //         'LMS_P',
      //         'SPM Admin',
      //         'SPM Team',
      //         'VRO_P',
      //         'System Admin Group',
      //       ],
      //     },
      //   },

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
      //   {
      //     InternalName: 'Portfolio',
      //     DisplayName: 'المحفظة المرتبطة',
      //     DisplayNameEn: 'Portfolio',
      //     type: 'lookup',
      //     ToggleName: 'Portfolio',
      //     // "validation": "required",
      //     //from other list:
      //     source: 'Portfolio',
      //     Dispfieldkey: 'Name',
      //     valfieldkey: 'Title',
      //     BIlanguage: true, //added to handle portfolio bilangual
      //     DispfieldkeyEn: 'NameEn', //added to handle portfolio bilangual
      //     state: 'disabled',
      //     // "className":"autofill"
      //   },

      // {
      //   "InternalName": "KPIEquation",
      //   "DisplayNameEn": "KPI Equation",
      //   "DisplayName": "معادلة المؤشر",
      //   "type": "string",
      //   "maxchar": "500",
      // },

      //mahmoud

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
      //     "type": "string",
      //     security: {
      //         groups: ["LMS_P",
      //             'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'Project Managers for Project Web App'
      //         ]
      //     },
      // },
      {
        InternalName: 'Owner',
        DisplayNameEn: 'Owner',
        DisplayName: 'مالك المؤشر',
        type: 'picker',
        validation: 'required',
        //ToggleDisabledName: 'Owner',
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
        InternalName: 'PerformanceLeader',
        DisplayNameEn: 'Performance Leader',
        DisplayName: 'رائد الأداء',
        type: 'picker',
        validation: 'required',
        descPhraseAr: "يجب ان يكون المستخدم لديه الصلاحية المناسبة",
        descPhraseEn: " User Should have right access", 
        //ToggleDisabledName: 'PerformanceLeader',
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
        InternalName: 'PerformanceLeader2',
        DisplayNameEn: 'Second Performance Leader',
        DisplayName: 'رائد الأداء الثاني',
        type: 'picker',
        validation: 'required',
        descPhraseAr: "يجب ان يكون المستخدم لديه الصلاحية المناسبة",
        descPhraseEn: " User Should have right access", 
        //ToggleDisabledName: 'PerformanceLeader2',
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
        InternalName: 'CalculationType',
        DisplayNameEn: 'Calculation Type',
        DisplayName: 'نوع الحساب',
        type: 'dropdownValues',
        //ToggleDisabledName: 'CalculationType',
        options: {
          choices: [
            { display: 'leadingindicator', value: 'leadingindicator' },
            { display: 'laggingindicator', value: 'laggingindicator' },
          ],
        },  security: {
          groups: [
            'LMS_P',
            'SPM Admin',
            'SPM Team',
            'VRO_P',
            'System Admin Group',
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

      // {
      //   InternalName: 'RecurrenceChanged',
      //   DisplayNameEn: 'Recurrence Changed',
      //   DisplayName: 'تغيير دورية القياس',
      //   type: 'yesnoradio',
      //   validation: 'required',
      //   options: {
      //     choices: [
      //       { display: 'yes', value: 'yes' },
      //       { display: 'no', value: 'no' },
      //     ],
      //   },
      // },

      {
        InternalName: 'RecurrenceChanged',
        DisplayNameEn: 'Recurrence Changed',
        DisplayName: 'تغيير دورية القياس',
        type: 'dropdownValues',
        //ToggleDisabledName: 'RecurrenceChanged',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
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
        validation: 'required',
      },
      {
        InternalName: 'NotMeasurableNow',
        DisplayNameEn: 'Measurable Now',
        DisplayName: 'يقاس حاليا',
        // type: "dropdownValues",
        type: 'yesnoradio',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
          ],
        },  security: {
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
        InternalName: 'Performance',
        DisplayNameEn: 'Performance',
        DisplayName: 'الأداء',
        type: 'number',  security: {
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
        InternalName: 'TotalActual',
        DisplayNameEn: 'Total Actual',
        DisplayName: 'إجمالي الفعلي',
        type: 'number',  security: {
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
        InternalName: 'TotalPlanned',
        DisplayNameEn: 'Total Planned',
        DisplayName: 'إجمالي المخطط',
        type: 'number',  security: {
          groups: [
            'LMS_P',
            'SPM Admin',
            'SPM Team',
            'VRO_P',
            'System Admin Group',
          ],
        },
      },
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
      //   state: 'disabled',
      //   dontSubmit: true,
      //   dynamic: 'parent',
      //   // security: {
      //   //     groups: ["LMS_P",
      //   //         'EPMO', 'System Admin Group'
      //   //     ]
      //   // },
      // },
      // {
      //   InternalName: 'SubSector',
      //   DisplayName: 'الادارة المرتبطة',
      //   DisplayNameEn: 'DeputyShip',
      //   type: 'lookup',
      //   //from other list:
      //   source: 'Internal Entities',
      //   isSector: 'True',
      //   EntityType: 'Department',
      //   Dispfieldkey: 'Name',
      //   DispfieldkeyEn: 'NameEn',
      //   valfieldkey: 'Title',
      //   state: 'disabled',
      //   dontSubmit: true,
      //   "isRelatedToParent":true, // to show parent value depends on child like sector and subsector
      //   filterField: "Sector",//InternalName Of Parent field
      //   filterFieldType: "Text",//Type In Sharepoint List for Parent field
      // },
      // {
      //   InternalName: 'Sector',
      //   DisplayName: 'القطاع',
      //   DisplayNameEn: 'Sector',
      //   type: 'lookup',
      //   validation: 'required',
      //   //ToggleDisabledName: 'Sector',
      //   //from other list:
      //   source: 'Internal Entities',
      //   isSector: 'True',
      //   EntityType: 'Sector',
      //   Dispfieldkey: 'Name',
      //   DispfieldkeyEn: 'NameEn',
      //   valfieldkey: 'Title',
      // },
      // {
      //   InternalName: 'SubSector',
      //   DisplayName: 'الوكالة',
      //   DisplayNameEn: 'DeputyShip',
      //   type: 'lookup',
      //   validation: 'required',
      //   //ToggleDisabledName: 'SubSector',
      //   //from other list:
      //   source: 'Internal Entities',
      //   isSector: 'True',
      //   EntityType: 'Department',
      //   Dispfieldkey: 'Name',
      //   DispfieldkeyEn: 'NameEn',
      //   valfieldkey: 'Title',
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
        //ToggleDisabledName: 'DataSource',
        type: 'string',
        maxchar: '255',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
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
        InternalName: 'DataSourceResponsible',
        DisplayNameEn: 'Data Source Responsible',
        DisplayName: 'مسؤول مصدر البيانات',
        //ToggleDisabledName: 'DataSourceResponsible',
        type: 'string',
        maxchar: '255',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
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
        InternalName: 'Email',
        DisplayNameEn: 'Email',
        //ToggleDisabledName: 'Email',
        DisplayName: 'البريد الالكتروني لمسؤول مصدر البيانات',
        type: 'email', //in view should be string
        //   "maxchar": "500",
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
        //ToggleDisabledName: 'Polarity',
        validation: 'required',
        options: {
          choices: ['+', '-'],
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
        InternalName: 'ResultType',
        DisplayNameEn: 'Result Type',
        DisplayName: 'وحدة القياس',
        type: 'dropdownValues',
        //ToggleDisabledName: 'ResultType',
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
        type: 'yesnoradio',
        //ToggleDisabledName: 'Cumulative',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
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
        InternalName: 'Weight',
        DisplayNameEn: 'Weight',
        DisplayName: 'وزن المؤشر',
        //ToggleDisabledName: 'Weight',
        type: 'floatpercentage',
        // type: 'float',
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
        InternalName: 'Baseline',
        DisplayNameEn: 'Baseline',
        DisplayName: 'خط الأساس',
        // type: 'number',
        type: 'float',
        //ToggleDisabledName: 'Baseline',
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
        InternalName: 'MesurePeriod',
        DisplayName: 'فترة قياس خط الأساس',
        DisplayNameEn: 'Mesure Period',
        //ToggleDisabledName: 'MesurePeriod',
        // min: 'FromDate',
        // Errmsgkey:'todatepattern',
        type: 'datetime',
        security: {
          groups: ['LMS_P', 'VRO_P', 'System Admin Group', 'SPM Admin'],
        },
        // validation: "required",
      },
      //   {
      //     InternalName: 'MesureStatus',
      //     DisplayNameEn: 'MesureStatus',
      //     DisplayName: 'حالة القياس',
      //     type: 'dropdownValues',
      //     //   "state": "disabled",
      //     //   dynamic: "Initiative",
      //     options: {
      //       choices: [
      //         {
      //           display: 'mersurable',
      //           value: 'mersurable',
      //         },
      //         {
      //           display: 'unmersurable',
      //           value: 'unmersurable',
      //         },
      //         // {
      //         //     display: 'novalue',
      //         //     value: 'novalue'
      //         // },
      //         {
      //           display: 'completed',
      //           value: 'completed',
      //         },
      //         {
      //           display: 'unspecific',
      //           value: 'unspecific',
      //         },
      //       ],
      //     },
      //     security: {
      //       groups: ['LMS_P', 'VRO_P', 'System Admin Group', 'SPM Admin'],
      //     },
      //   },
    ],
  },
  {
    label: 'مكونات المعادلة',
    labelEn: 'Equation Component',
    description: 'يمكن ادخال القيم عند ادخال معادلة للمؤشر', 
    descriptionEn: 'you can enter the values when enter the kpi Equation',
    subFields: [
      {
        InternalName: 'KPIEquation',
        DisplayNameEn: 'KPI Equation',
        DisplayName: 'معادلة المؤشر',
        type: 'string',
        maxchar: 255,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        state: 'disabled',
        security: {
          groups: [
            'LMS_P',
            'VRO_P',
            // 'Performance Leaders',
            'System Admin Group',
          ],
        },
        //editableBy: "PerformanceLeader",
      },
      {
        InternalName: 'Year',
        DisplayNameEn: 'Year',
        DisplayName: 'السنة',
        type: 'dropdown',
        //ToggleDisabledName: 'Year',
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
        validation: 'required',
        security: {
          groups: [
            'LMS_P',
            'VRO_P',
            'Performance Leaders',
            'System Admin Group',
          ],
        },
        validation: 'required',
      },
        {
          InternalName: 'Quarter',
          DisplayNameEn: 'Quarter',
          DisplayName: 'الربع',
          ToggleName: 'Quarter',
          type: 'dropdownValues',
          options: {
            choices: [
              { display: 'quarter1', value: 'ActualQ1' },
              { display: 'quarter2', value: 'ActualQ2' },
              { display: 'quarter3', value: 'ActualQ3' },
              { display: 'quarter4', value: 'ActualQ4' },
            ],
            // display: 'none',
          },
          // security: {
          //   groups: [
          //     'LMS_P',
          //     'VRO_P',
          //     'Performance Leaders',
          //     'System Admin Group',
          //   ],
          // },
        },
        {
          InternalName: 'Midterms',
          DisplayNameEn: 'Midterms',
          DisplayName: 'النصف السنوي',
          ToggleName: 'Midterms',
          type: 'dropdownValues',
          options: {
            choices: [
              { display: 'midterm1', value: 'ActualMid1' },
              { display: 'midterm2', value: 'ActualMid2' },
            ],
            display: 'none',
          },
          security: {
            groups: [
              'LMS_P',
              'SPM Team',
              'VRO_P',
              'Performance Leaders',
              'System Admin Group',
            ],
          },
        },
      //   {
      //     InternalName: 'Years',
      //     DisplayNameEn: 'Years',
      //     DisplayName: 'السنوي',
      //     ToggleName: 'Years',
      //     type: 'dropdownValues',
      //     options: {
      //       choices: [
      //         { display: 'yearly', value: 'ActualY' },
      //         // { display: "midterm2", value: "ActualMid2" },
      //       ],
      //       display: 'none',
      //     },
      //     security: {
      //       groups: [
      //         'LMS_P',
      //         'VRO_P',
      //         //'Performance Leaders',
      //         'System Admin Group',
      //       ],
      //     },
      //   },
      
      {
        InternalName: 'Months',
        DisplayNameEn: 'Month',
        DisplayName: 'الشهر',
        ToggleName: 'Months',
        //ToggleDisabledName: 'Months',
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
        security: {
          groups: [
            'LMS_P',
            'SPM Team',
            'VRO_P',
            'Performance Leaders',
            'System Admin Group',
          ],
        },
        // display: 'none',
      },
      // {
      //     "InternalName": "MesureStatus",
      //     "DisplayNameEn": "MesureStatus",
      //     "DisplayName": "حالة القياس",
      //     "type": "dropdownValues",
      //     //   "state": "disabled",
      //     //   dynamic: "Initiative",
      //     options: {
      //         choices: [
      //             {
      //                 display: 'mersurable',
      //                 value: 'mersurable'
      //             },
      //             {
      //                 display: 'unmersurable',
      //                 value: 'unmersurable'
      //             },
      //             // {
      //             //     display: 'novalue',
      //             //     value: 'novalue'
      //             // },
      //             {
      //                 display: 'completed',
      //                 value: 'completed'
      //             },
      //             {
      //                 display: 'unspecific',
      //                 value: 'unspecific'
      //             },
      //         ]
      //     },
      //     security: {
      //         groups: ["LMS_P",
      //             'VRO_P', //'Performance Leaders', 'Administrators for Project Web App'
      //         ]
      //     },
      // },
      {
        InternalName: 'A',
        DisplayName: 'المكون الأول (A)',
        DisplayNameEn: 'A',
        type: 'number',
        //ToggleDisabledName: 'A',
        numberOfDigits: "12", // max length of digits in field
        // type: 'number',
        //editableBy: "PerformanceLeader",
        security: {
          groups: [
            'LMS_P',
            'VRO_P',
            'Performance Leaders',
            'System Admin Group',
          ],
        },
      },
      {
        InternalName: 'B',
        DisplayName: 'المكون الثاني (B)',
        DisplayNameEn: 'B',
        //ToggleDisabledName: 'B',
        type: 'number',
        numberOfDigits: "12", // max length of digits in field
        //editableBy: "PerformanceLeader",
        security: {
          groups: [
            'LMS_P',
            'VRO_P',
            'Performance Leaders',
            'System Admin Group',
          ],
        },
      },
      {
        InternalName: 'CC',
        DisplayName: 'المكون الثالث (C)',
        DisplayNameEn: 'C',
        //ToggleDisabledName: 'CC',
        // type: 'number',
        type: 'number',
        numberOfDigits: "12", // max length of digits in field
        //editableBy: "PerformanceLeader",
        security: {
          groups: [
            'LMS_P',
            'VRO_P',
            'Performance Leaders',
            'System Admin Group',
          ],
        },
      },
      {
        InternalName: 'D',
        DisplayName: 'المكون الرابع (D)',
        DisplayNameEn: 'D',
        //ToggleDisabledName: 'D',
        // type: 'number',
        type: 'number',
        numberOfDigits: "12", // max length of digits in field
        //editableBy: "PerformanceLeader",
        security: {
          groups: [
            'LMS_P',
            'VRO_P',
            'Performance Leaders',
            'System Admin Group',
          ],
        },
      },
      {
        InternalName: 'E',
        DisplayName: 'المكون الخامس (E)',
        DisplayNameEn: 'E',
        //ToggleDisabledName: 'E',
        // type: 'number',
        type: 'number',
        numberOfDigits: "12", // max length of digits in field
        //editableBy: "PerformanceLeader",
        security: {
          groups: [
            'LMS_P',
            'VRO_P',
            //'Performance Leaders',
            'System Admin Group',
          ],
        },
      },
      {
        InternalName: 'F',
        DisplayName: 'المكون السادس (F)',
        DisplayNameEn: 'F',
        //ToggleDisabledName: 'F',
        // type: 'number',
        type: 'number',
        numberOfDigits: "12", // max length of digits in field
        //editableBy: "PerformanceLeader",
        security: {
          groups: [
            'LMS_P',
            'VRO_P',
            //'Performance Leaders',
            'System Admin Group',
          ],
        },
      },
      {
        InternalName: 'G',
        DisplayName: 'المكون السابع (G)',
        DisplayNameEn: 'G',
        //ToggleDisabledName: 'G',
        // type: 'number',
        type: 'number',
        numberOfDigits: "12", // max length of digits in field
        //editableBy: "PerformanceLeader",
        security: {
          groups: [
            'LMS_P',
            'VRO_P',
            //'Performance Leaders',
            'System Admin Group',
          ],
        },
      },
      {
        InternalName: 'Equation',
        DisplayNameEn: 'Actual value',
        DisplayName: 'القيمة الفعلية',
        // type: 'number',
        type: 'float',
        state: 'disabled',
        //editableBy: "PerformanceLeader",
        // security: {
        //   groups: [
        //     'LMS_P',
        //     'VRO_P',
        //     //'Performance Leaders',
        //     'System Admin Group',
        //   ],
        // },
      },
        {
          InternalName: 'PerformanceAnalysis',
          DisplayNameEn: 'Performance Analysis',
          DisplayName: 'تحليل الأداء',
          maxchar: '5000',
          type: 'multiline',
          security: {
            groups: [
              'LMS_P',
              'VRO_P',
              'Performance Leaders',
              'System Admin Group',
            ],
          },
        },
        {
          InternalName: "WFStage",
          DisplayName: " المرحلة",
          DisplayNameEn: "Stage",
          type: 'lookup',
          source: "Tasks Configuration",
          Dispfieldkey: "TaskNameAr",
          DispfieldkeyEn: 'TaskNameEn',
          valfieldkey: "Title",
          "state": "disabled",
          display:'none'
          },
    ],
  },
  {
    label: 'الوثائق الداعمة',
    labelEn: 'Supporting Documents',
    description: '',
    descriptionEn: '',
    subFields: [
      {
        InternalName: 'getfile',
        DisplayName: 'المرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        //ToggleDisabledName: 'getfile',
        security: {
          groups: [
            'LMS_P',
            'SPM Admin',
            'SPM Team',
            'VRO_P',
            'Performance Leaders',
            'System Admin Group',
          ],
        },
        withAddBtn: 'true',
      },
    ],
  },
]
