var Information_Form = [
  {
    label: 'الاهداف الاستراتيجية',
    labelEn: 'Strategy objective Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'اسم الهدف',
        type: 'string',
        validation: 'required',
        maxchar: '255',
        withletters:true,
        Errmsgkey:"withletterpattern",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
      },
      {
        InternalName: 'ObjectiveCode',
        DisplayNameEn: 'Objective Code',
        DisplayName: 'رمز الهدف اليدوي',
        type: 'stringunique',
        listname:"SOs",
        // maxchar: '255',
        withletters: true,
        Errmsgkey: "uniquefield",
        descPhraseAr: "يجب ان يكون رمز الهدف فريد وغير مكرر",
        descPhraseEn: "The code should be unique",
      },
      {
        InternalName: 'ObjectiveOwner',
        DisplayName: 'مالك الهدف',
        DisplayNameEn: 'Objective Owner',
        type: 'picker',
        // validation: 'required',
      },
      {
        InternalName: 'ExternalObjectiveOwner',
        DisplayName: 'مالك الهدف الخارجي',
        DisplayNameEn: 'External Objective Owner',
        type: 'string',
        // validation: 'required',
      },
      // {  // status type string cause it's auto calculated and just want to handle it
      //   "InternalName": "Status",
      //   "DisplayName": " الحالة",
      //   "DisplayNameEn": "Status",
      //   dontSubmit: true,
      //   "type": "string",
      //   "state": "disabled"
      // },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف الهدف',
        type: 'multiline',
        maxchar: '5000',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        InternalName: "Class",
        DisplayName: "نوع الاستراتيجية",
        DisplayNameEn: "Strategy Type",
        type: "dropdownValues",
        validation: 'required',
        options: {
          choices: [
            {
              display: 'vision',
              value: 'vision',
              roles: ['Administrator', 'EPMO', 'VROE',],//the purpose is we dont need the creation cycle if EPMO or Admin create a initiaitve
              // otherFields: [
              //   { fieldName: 'WFModuleCode', value: 'VisionInitiative' },
              //   { fieldName: 'WFStage', value: 'VInStage01' },
              //   { fieldName: 'DraftStatus', value: '' },
              // ],
            },
            {
              display: 'ministry',
              value: 'ministry',
              roles: ['Administrator', 'EPMO','SPMAdmin'],//the purpose is we dont need the creation cycle if EPMO or Admin create a initiaitve
              // otherFields: [
              //   { fieldName: 'WFModuleCode', value: 'StrategicallyInitiative' },
              //   { fieldName: 'WFStage', value: 'SInStage01' },
              //   { fieldName: 'DraftStatus', value: '' },
              // ],
            },
            {
              display: 'lms',
              value: 'lms',
              roles: ['Administrator', 'EPMO', 'LMSUExecution'],
              // otherFields: [
              //   { fieldName: 'WFModuleCode', value: 'LMSInitiative' },
              //   { fieldName: 'WFStage', value: 'LInStage01' },
              //   { fieldName: 'DraftStatus', value: '' },
              // ],
            },
            //---end EPMO and Admin Section ----
            {
              display: 'vision',
              value: 'vision',
              roles: ['LMSE', 'LMSP', 'LMSUPerformance', 'LMSUControl', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'InitiativeManager', 'InitiativeOwner', 'SPMOHead', 'SPMO', 'DU', 'SPMTeam', 'StrategyTeam', 'CRCommittee'],
              // otherFields: [
              //   { fieldName: "WFModuleCode", value: "VROCreateObjective" },
              //   { fieldName: "WFStage", value: "VROCreateObjective01" },
              //  // { fieldName: "Class", value: "vision" },
              //   { fieldName: "Status", value: "stat31" },
              //   { fieldName: "DraftStatus", value: "draft" },
              // ],
            },
            {
              display: 'ministry',
              value: 'ministry',
              roles: ['LMSE', 'LMSP', 'LMSUPerformance', 'LMSUControl', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'InitiativeManager', 'InitiativeOwner', 'SPMOHead', 'SPMO', 'DU', 'SPMTeam', 'StrategyTeam', 'CRCommittee'],
              // otherFields: [
              //   { fieldName: "WFModuleCode", value: "MSCreateObjective" },
              //   { fieldName: "WFStage", value: "MSCreateObjective01" },
              //   // { fieldName: "Class", value: "ministry" },
              //   { fieldName: "Status", value: "stat31" },
              //   { fieldName: "DraftStatus", value: "draft" },
              // ],
            },
            {
              display: 'lms',
              value: 'lms',
              roles: ['LMSE', 'LMSP', 'LMSUPerformance', 'LMSUControl', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'InitiativeManager', 'InitiativeOwner', 'SPMOHead', 'SPMO', 'DU', 'SPMTeam', 'StrategyTeam', 'CRCommittee'],
              // otherFields: [
              //   { fieldName: "WFModuleCode", value: "LMSCreateObjective" },
              //   { fieldName: "WFStage", value: "LMSCreateObjective01" },
              //   { fieldName: "Status", value: "stat31" },
              //   { fieldName: "DraftStatus", value: "draft" },
              // ],
            },
          ],
        },

      },
      {
        InternalName: 'Types',
        DisplayNameEn: 'Objective Type',
        DisplayName: 'نوع الهدف',
        toggleValues: [
      
          { value: 'sublevel2', fields: ['RelatedObjective'] },
          { value: 'sublevel3', fields: ['RelatedObjective'] },
          { value: 'main', fields: [''] },
        ],
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'main', value: 'main' },
            {
              display: 'sublevel2',
              value: 'sublevel2',
              customFilterValue: 'main',
            },
            {
              display: 'sublevel3',
              value: 'sublevel3',
              customFilterValue: 'sublevel2',
            },
          ],
        },
        validation: 'required',
        // dynamic: 'parent', //main field that affect on other chiled field
        requiredValues: [
          { value: 'sublevel2', fields: ['RelatedObjective', 'SubSector'] }, //we can put more than 1  field
          {
            value: 'sublevel3',
            fields: ['RelatedObjective', 'Department', 'SubSector'],
          },
        ],
        grandFieldId: "RelatedStrategy", // we add this field to handle the two field filtration(parent Id in current form) 
        childFieldId: "RelatedObjective",// we add this field to handle the two field filtration (child Id in current form)
        childFieldIdSource: "Types",// we add this field to handle the two field filtration (child internal name in destination list)
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
      //         // otherFields: [
      //         //   { fieldName: "WFModuleCode", value: "VROCreateObjective" },
      //         //   { fieldName: "WFStage", value: "VROCreateObjective01" },
      //         //  // { fieldName: "Class", value: "vision" },
      //         //   { fieldName: "Status", value: "stat31" },
      //         //   { fieldName: "DraftStatus", value: "draft" },
      //         // ],
      //       },
      //       {
      //         display: 'strategically',
      //         value: 'strategically',
      //         roles: ['LMSE', 'LMSP', 'LMSUPerformance', 'LMSUControl', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'InitiativeManager', 'InitiativeOwner', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'],
      //         // otherFields: [
      //         //   { fieldName: "WFModuleCode", value: "MSCreateObjective" },
      //         //   { fieldName: "WFStage", value: "MSCreateObjective01" },
      //         //   // { fieldName: "Class", value: "ministry" },
      //         //   { fieldName: "Status", value: "stat31" },
      //         //   { fieldName: "DraftStatus", value: "draft" },
      //         // ],
      //       },
      //       {
      //         display: 'lms',
      //         value: 'lms',
      //         roles: ['LMSE', 'LMSP', 'LMSUPerformance', 'LMSUControl', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'InitiativeManager', 'InitiativeOwner', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'],
      //         // otherFields: [
      //         //   { fieldName: "WFModuleCode", value: "LMSCreateObjective" },
      //         //   { fieldName: "WFStage", value: "LMSCreateObjective01" },
      //         //   { fieldName: "Status", value: "stat31" },
      //         //   { fieldName: "DraftStatus", value: "draft" },
      //         // ],
      //       },
      //     ],
      //   },

      // },
      {
        InternalName: 'RelatedStrategy',
        DisplayNameEn: 'Related Vision Strategy',
        DisplayName: 'الاستراتيجية المرتبطة',
        // "ToggleName": "RelatedStrategy",
        type: 'lookup',
        validation: 'required',
        source: 'GoalStrategy',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // to get the seblings value
        valsiblingkey: 'PillarsExist', // internal name on sorce list
        targetsiblingkey: 'RelatedStrategyPillars', // internal name on current list
        // dynamically affected by other dropdown
        dynamic: 'parent', //"parentInternalName" or "parent" // if parent it will affect other fields
        //in case not parent add below attrs
        isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        fieldsinformlvl1: 'RelatedStrategyPillars', // fields in look up list
        sourcefieldlvl1: 'PillarsExist',
        //role access
        notInvokeListiner: true, // to not invoke the lookup when change on parent > the filteration depends on other field also

        accessFilter: [
          {
            role: 'VROE',
            conditions: [
              {
                field: 'Types',
                type: 'Choice',
                values: ['vision'],
              },
            ],
          },
          {
            role: 'SPMAdmin',
            conditions: [
              {
                field: 'Types',
                type: 'Choice',
                values: ['ministry'],
              },
            ],
          },
          {
            role: 'VROP',
            conditions: [
              {
                field: 'Types',
                type: 'Choice',
                values: ['vision'],
              },
            ],
          },
          {
            role: 'LMSE',
            conditions: [
              {
                field: 'Types',
                type: 'Choice',
                values: ['lms'],
              },
            ],
          },
          {
            role: 'LMSUExecution',
            conditions: [
              {
                field: 'Types',
                type: 'Choice',
                values: ['lms'],
              },
            ],
          },
        ],
      },
      {
        InternalName: 'RelatedObjective',
        DisplayNameEn: 'Related Objective',
        DisplayName: 'الهدف المرتبط',
        ToggleName: 'RelatedObjective',
        RequiredName: 'RelatedObjective',
        type: 'lookupWithQuery',
        queryField: 'Types',
        queryFieldType: 'dropdownValues', //ex: "Choice"
        queryFieldValue: 'main',
        //from other list:
        source: 'SOs',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        display: 'none',
        //
        dynamic: 'RelatedStrategy',
        filterField: 'RelatedStrategy',
        filterFieldType: 'Text',
      },
      {
        InternalName: 'RelatedPortfolio',
        DisplayNameEn: 'Related Portfolio',
        ToggleName: 'RelatedPortfolio',
        DisplayName: 'المحفظة المرتبطة ',
        type: 'lookup',
        //from other list:
        source: 'Portfolio',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // display: 'none',
      },
      {
        InternalName: 'Sector',
        DisplayName: 'القطاع',
        DisplayNameEn: 'Sector',
        type: 'lookupWithQuery',
        queryField: 'EntityType',
        queryFieldType: 'dropdownValues', 
        queryFieldValue: 'Sector',
        dynamic: 'parent',
        source: 'Internal Entities',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        validation: 'required',
      },
      {
        InternalName: 'SubSector',
        DisplayName: 'الوكالة',
        DisplayNameEn: 'DeputyShip',
        type: 'lookup',
        //from other list:
        source: 'Internal Entities',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        dynamic: 'parent', //InternalName Of Parent field
        seconeddynamic: "Sector",
        filterField: 'ParentEntity', //InternalName Of Parent field
        filterFieldType: 'Text', //Type In Sharepoint List for Parent field
        RequiredName: 'SubSector',
        queryField:"EntityType",
        queryFieldType:"Choice",
        queryFieldValue:"Department",

      },
      {
        InternalName: 'Department',
        DisplayName: 'الإدارة',
        DisplayNameEn: 'Department',
        type: 'lookup',
        //from other list:
        source: 'Internal Entities',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        dynamic: 'SubSector', //InternalName Of Parent field
        filterField: 'ParentEntity', //InternalName Of Parent field
        filterFieldType: 'Text', //Type In Sharepoint List for Parent field
        RequiredName: 'Department',
      },
      {
        InternalName: 'ExternalEntities',
        DisplayName: 'الجهات الشقيقة',
        DisplayNameEn: 'External Entities',
        type: 'lookup',
        //from other list:
        source: 'Internal Entities',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        dynamic: 'Sector', //InternalName Of Parent field
        filterField: 'ParentEntity', //InternalName Of Parent field
        filterFieldType: 'Text', //Type In Sharepoint List for Parent field
        RequiredName: 'ExternalEntities',
        queryField:"EntityType",
        queryFieldType:"Choice",
        queryFieldValue:"ExternalEntities",
      },
      // {
      //   InternalName: 'ExternalEntities',
      //   DisplayName: 'الجهات الشقيقة',
      //   DisplayNameEn: 'External Entities',
      //   type: 'lookup',
      //   //from other list:
      //   source: 'Internal Entities',
      //   Dispfieldkey: 'Name',
      //   DispfieldkeyEn: 'NameEn',
      //   valfieldkey: 'Title',
      //   isRelatedToParent: true, // to show parent value depends on child like sector and subsector
      //   dynamic: 'parent', //InternalName Of Parent field
      //   seconeddynamic: "Sector",
      //   filterField: 'ParentEntity', //InternalName Of Parent field
      //   filterFieldType: 'Text', //Type In Sharepoint List for Parent field
      //   RequiredName: 'ExternalEntities',

      // },
      // {
      //     "InternalName": "RelatedPillar",
      //     "DisplayNameEn": "Related Pillar",
      //     "ToggleName": "RelatedPillar",
      //     "DisplayName":"المحور المرتبط",
      //     "type": "lookup",
      //     //from other list:
      //     "source": "SPillars",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title",
      //     "display":"none"

      // },
      // {
      // 	"InternalName": "RelatedStrategyType",
      // 	"DisplayNameEn": "Strategy Type",
      // 	"DisplayName": "نوع  الاستراتيجية",
      // 	"type": "dropdownValues",
      // 	"state": "disabled",
      // 	options: {
      // 		choices: [
      // 			{ display: 'sub', value: 'sub' },
      // 			{ display: 'vision', value: 'vision' },
      // 			{ display: 'ministry', value: 'ministry' },
      // 			{ display: 'sectorial', value: 'sectorial' },
      // 		]
      // 	}
      // },
      {
        InternalName: 'RelatedStrategyPillars',
        DisplayNameEn: 'Is Pillar / program  Exist?',
        DisplayName: 'هل يوجد محور / برنامج ؟',
        type: 'dropdownValues',
        state: 'disabled',

        // state: 'disabled',
        // dontSubmit: true,
        dontSubmit: true,

        // type: 'yesnoradio',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
          ],
        },
        toggleValues: [{ value: 'yes', fields: ['PillarName'] }],
      },
      //   {
      //     InternalName: 'RelatedJobStrategy',
      //     DisplayNameEn: 'Related Job Market Strategy',
      //     DisplayName: 'استراتيجية سوق العمل المرتبطة',
      //     ToggleName: 'RelatedJobStrategy',
      //     type: 'lookupWithQuery',
      //     queryField: 'Types',
      //     queryFieldType: 'dropdownValues', //ex: "Choice"
      //     queryFieldValue: 'jobmarket',
      //     //from other list:

      //     source: 'GoalStrategy',
      //     Dispfieldkey: 'Name',
      //     valfieldkey: 'Title',
      //     display: 'none',
      //   },
      // {
      //     "InternalName": "ObjectiveRealized",
      //     "DisplayNameEn": "Objective Realized",
      //     "DisplayName":"هل تم تحقيق الهدف؟",
      //     "type": "dropdownValues",
      //     options: {
      //         choices: [
      //             { display: 'yes', value: 'yes' },
      //             { display: 'no', value: 'no' },
      //         ]
      //     }
      // },
      // {
      //     "InternalName": "ResultType",
      //     "DisplayNameEn": "Result Type",
      //     "DisplayName": "وحدة القياس",
      //     "type": "dropdownValues",
      //     options: {
      //         choices: [
      //             { display: 'number', value: 'number' },
      //             { display: 'percentage', value: 'percentage' },
      //         ]
      //     }
      //   },
      //   {
      //     "InternalName": "Cancelled",
      //     "DisplayName": "الغاء",
      //     "DisplayNameEn": "Cancelled",
      //     "type": "yesnoradio",
      //     options: {
      //         choices: [{
      //             display: 'yes',
      //             value: 'yes'
      //         }, {
      //             display: 'no',
      //             value: 'no'
      //         }]
      //     }

      // },
    ],
  },
  {
    label: 'الركيزة الاستراتيجية / برنامج الرؤية',
    labelEn: 'Strategic Pillar/Vision Program',
    description: '',
    descriptionEn: '',
    subFields: [
      {
        InternalName: 'PillarName',
        DisplayNameEn: 'Strategic Pillar/Vision Program Name',
        DisplayName: 'اسم المحور الإستراتيجى / برنامج الرؤية',
        type: 'lookup',
        //from other list:
        source: 'SPillars',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // ToggleName: 'PillarName',
        valsiblingkey: 'Description', // internal name on sorce list
        targetsiblingkey: 'StrategicDescription', // internal name on current list
        // display: 'none',
        // isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        // fieldsinformlvl1: "StrategicDescription", // fields in form list
        // sourcefieldlvl1: "Description", // field in look up list
      },
      {
        InternalName: 'StrategicDescription',
        DisplayNameEn: 'Strategic Description',
        DisplayName: 'وصف  المحور الإستراتيجى / برنامج الرؤية',
        type: 'multiline',
        maxchar: '5000',
        state: 'disabled',
        dontSubmit: true,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",

        // dontSubmit: true,
        // grandFieldId: "StrategicDescription", // we add this field to handle the two field filtration(parent Id in current form)
        // childFieldId: "StrategicDescription",// we add this field to handle the two field filtration (child Id in current form)
        // childFieldIdSource: "StrategicDescription",// we add this field to handle the two field filtration (child internal name in destination list)
        //
        // notInvokeListiner: true,// to not invoke the lookup when change on parent > the filteration depends on other field also
        //
      },
    ],
  },
]
