var Information_Form = [
  {
    label: 'الاهداف الاستراتيجية',
    labelEn: 'Strategy objective Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    workflowSetValues: [
      { fieldName: 'DraftStatus', value: '', stages:["MSCreateObjective03","VROCreateObjective02","LMSCreateObjective02"] },
      { fieldName: 'WFModuleCode', value: '',stages:["MSCreateObjective03","VROCreateObjective02","LMSCreateObjective02"]} ,
      { fieldName: 'WFStage', value: 'approved',stages:["MSCreateObjective03","VROCreateObjective02","LMSCreateObjective02"]},
      { fieldName: 'Status', value: '',stages:["MSCreateObjective03","VROCreateObjective02","LMSCreateObjective02"]} 
    ],
    subFields: [
      {
        InternalName: 'Title',
        DisplayName: 'رمز الهدف',
        DisplayNameEn: 'Objective Code',
        type: 'string',
        // maxchar: '250',
        // state: 'disabled',
      },
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'اسم الهدف',
        type: 'string',
        // maxchar: '250',
        // validation: 'required',
      },
      {
        InternalName: 'ObjectiveOwner',
        DisplayName: 'مالك الهدف',
        DisplayNameEn: 'Objective Owner',
        type: 'picker',
        // validation: 'required',
      },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف الهدف',
        type: 'multiline',
        // maxchar: '500',
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
              display: 'strategically',
              value: 'strategically',
              roles: ['Administrator', 'EPMO'],//the purpose is we dont need the creation cycle if EPMO or Admin create a initiaitve
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
              roles: ['LMSE', 'LMSP', 'LMSUPerformance', 'LMSUControl', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'InitiativeManager', 'InitiativeOwner', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'],
              // otherFields: [
              //   { fieldName: "WFModuleCode", value: "VROCreateObjective" },
              //   { fieldName: "WFStage", value: "VROCreateObjective01" },
              //  // { fieldName: "Class", value: "vision" },
              //   { fieldName: "Status", value: "stat31" },
              //   { fieldName: "DraftStatus", value: "draft" },
              // ],
            },
            {
              display: 'strategically',
              value: 'strategically',
              roles: ['LMSE', 'LMSP', 'LMSUPerformance', 'LMSUControl', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'InitiativeManager', 'InitiativeOwner', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'],
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
              roles: ['LMSE', 'LMSP', 'LMSUPerformance', 'LMSUControl', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'InitiativeManager', 'InitiativeOwner', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'],
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
      // {
      //     "InternalName": "SOSsecdOwner",
      //     "DisplayName": "صاحب الهدف",
      //     "DisplayNameEn": "Objective Holder",
      //     "type": "string"
      // },
      {
        InternalName: 'Types',
        DisplayNameEn: 'Objective Type',
        DisplayName: 'نوع الهدف',
        toggleValues: [
          // { value: 'sub', fields: ['RelatedObjective', 'RelatedPortfolio'] },
          // { value: 'level2', fields: ['RelatedObjective', 'RelatedPortfolio'] },
          // { value: 'level3', fields: ['RelatedObjective', 'RelatedPortfolio'] },
          { value: 'sublevel2', fields: ['RelatedObjective'] },
          { value: 'sublevel3', fields: ['RelatedObjective'] },
          // { value: 'main', fields: ['RelatedPillar'] },
          { value: 'main', fields: [''] },
          // { value: 'jobmarket', fields: ['RelatedJobStrategy'] },
          // {value:'strategically', fields:['StrategyRelatedObjective']}
        ],
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'main', value: 'main' },
            {
              display: 'sublevel2',
              value: 'sublevel2',
              // customFilterValue: 'main',
            },
            {
              display: 'sublevel3',
              value: 'sublevel3',
              // customFilterValue: 'sublevel2',
            },
            // { display: 'level2', value: 'level2' },
            // { display: 'level3', value: 'level3' },
            // { display: 'sub', value: 'sub' },
            // { display: 'vision', value: 'vision' },
            // { display: 'ministry', value: 'ministry' },
            // { display: 'jobmarket', value: 'jobmarket' },
            // { display: 'strategically', value: 'strategically' },
            // { display: 'transformationally', value: 'transformationally' },
          ],
        },
        // validation: 'required',
        // dynamic: 'parent', //main field that affect on other chiled field
        requiredValues: [
          { value: 'sublevel2', fields: ['RelatedObjective', 'SubSector'] }, //we can put more than 1  field
          { value: 'sublevel3', fields: ['RelatedObjective', 'Department', 'SubSector'] },
        ],
      },
      {
        InternalName: 'RelatedStrategy',
        DisplayNameEn: 'Related Vision Strategy',
        DisplayName: 'الاستراتيجية المرتبطة',
        ToggleName: 'RelatedStrategy',
        type: 'lookup',
        // queryField: 'Types',
        // queryFieldType: 'dropdownValues', //ex: "Choice"
        // queryFieldValue: 'vision',
        //from other list:

        source: 'GoalStrategy',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // "display":"none"
        isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        fieldsinformlvl1: "RelatedStrategyPillars", // fields in form list
        sourcefieldlvl1: "PillarsExist", // field in look up list
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
        // "display":"none"
      },
      {
        InternalName: 'Sector',
        DisplayName: 'القطاع',
        DisplayNameEn: 'Sector',
        type: 'lookup',
        // validation: 'required',
        //from other list:
        source: 'Internal Entities',
        isSector: 'True',
        EntityType: 'Sector',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'SubSector',
        DisplayName: 'الوكالة',
        DisplayNameEn: 'DeputyShip',
        type: 'lookup',
        //from other list:
        source: 'Internal Entities',
        isSector: 'True',
        EntityType: 'Department',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        RequiredName: 'SubSector',
      },
      {
        InternalName: 'Department',
        DisplayName: 'الإدارة',
        DisplayNameEn: 'Department',
        type: 'lookup',
        //from other list:
        source: 'Internal Entities',
        isSector: 'True',
        EntityType: 'SubDepartment',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        RequiredName: 'Department',
      },
      {
        InternalName: 'ProgressPercentage',
        DisplayName: 'نسبة الإنجاز',
        DisplayNameEn: 'Progress Percentage',
        type: 'floatpercentage',
      },
      { // status type string cause it's auto calculated and just want to handle it
        "InternalName": "Status",
        "DisplayName": " الحالة",
        "DisplayNameEn": "Status",
        "type": "string"
      },
      // {
      //     "InternalName": "RelatedPillar",
      //     "DisplayNameEn": "Related Pillar",
      //     "ToggleName": "RelatedPillar",
      //     "DisplayName":"المحور المرتبط",
      //     "type": "lookup",
      //     //from other list:
      //     "source": "SPillars",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title"

      // },
      // { //
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
        // state: 'disabled',
        // dontSubmit: true,
        // type: 'yesnoradio',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
          ],
        },
        // toggleValues: [
        //   { value: 'yes', fields: ['PillarName'] },
        // ]
      },
      {
				InternalName: "WFStage",
				DisplayName: " المرحلة",
				DisplayNameEn: "Stage",
				type: 'lookup',
				// validation: 'required',
				source: "Tasks Configuration",
				Dispfieldkey: "TaskNameAr",
				DispfieldkeyEn: 'TaskNameEn',
				valfieldkey: "Title",
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
    //     // "display":"none"
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
        isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        fieldsinformlvl1: "StrategicDescription", // fields in form list
        sourcefieldlvl1: "Description", // field in look up list
        // "display": "none"
      },
      {
        InternalName: 'StrategicDescription',
        DisplayNameEn: 'Strategic Description',
        DisplayName: 'وصف  المحور الإستراتيجى / برنامج الرؤية',
        type: 'multiline',
        // dontSubmit: true,
        // grandFieldId: "StrategicDescription", // we add this field to handle the two field filtration(parent Id in current form) 
        // childFieldId: "StrategicDescription",// we add this field to handle the two field filtration (child Id in current form)
        // childFieldIdSource: "StrategicDescription",// we add this field to handle the two field filtration (child internal name in destination list)
        // notInvokeListiner: true,// to not invoke the lookup when change on parent > the filteration depends on other field also
      },
    ],
  },
]
