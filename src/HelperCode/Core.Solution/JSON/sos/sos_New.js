var Information_Form = [
  {
    label: 'الاهداف الاستراتيجية',
    labelEn: 'Strategy objective Data',
    description: '',
    descriptionEn: '',
    subFields: [
      //     "InternalName": "Title",
      //     "DisplayName":"رمز الهدف",
      //     "type":"string",
      // "maxchar": "250",
      //     "state":"disabled"

      // },
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'اسم الهدف',
        type: 'string',
        maxchar: '250',
        validation: 'required',
      },
      {
        InternalName: 'ObjectiveOwner',
        DisplayName: 'مالك الهدف',
        DisplayNameEn: 'Objective Owner',
        type: 'multipicker',
        validation: 'required',
      },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف الهدف',
        type: 'multiline',
        maxchar: '500',
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
              customFilterValue: 'main',
            },
            {
              display: 'sublevel3',
              value: 'sublevel3',
              customFilterValue: 'sublevel2',
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
        validation: 'required',
        dynamic: 'parent', //main field that affect on other chiled field
        requiredValues: [
          { value: 'sublevel2', fields: ['RelatedObjective','SubSector'] }, //we can put more than 1  field
          { value: 'sublevel3', fields: ['RelatedObjective','Department','SubSector'] }, 
        ],
      },
      // {
      // 	"InternalName": "RelatedPillar",
      // 	"DisplayNameEn": "Related Pillar",
      // 	"ToggleName": "RelatedPillar",
      // 	"DisplayName": "المحور المرتبط",
      // 	"type": "lookup",
      // 	//from other list:
      // 	"source": "SPillars",
      // 	"Dispfieldkey": "Name",
      // 	"valfieldkey": "Title",
      // 	"display": "none"

      // },
      {
        InternalName: 'RelatedStrategy',
        DisplayNameEn: 'Related Vision Strategy',
        DisplayName: 'الاستراتيجية المرتبطة',
        // "ToggleName": "RelatedStrategy",
        type: 'lookup',
        source: 'GoalStrategy',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // to get the seblings value
        valsiblingkey: 'PillarsExist', // internal name on sorce list
        targetsiblingkey: 'RelatedStrategyPillars', // internal name on current list
        // dynamically affected by other dropdown
        dynamic: 'parent', //"parentInternalName" or "parent" // if parent it will affect other fields
        //in case not parent add below attrs

        //role access
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
            role: 'LMSP',
            conditions: [
              {
                field: 'Types',
                type: 'Choice',
                values: ['lms'],
              },
            ],
          },
        ],
        // "display":"none"
        validation: 'required',
      },
      {
        InternalName: 'RelatedObjective',
        DisplayNameEn: 'Related Objective',
        DisplayName: 'الهدف المرتبط',
        type: 'lookup',
        // queryField: 'Types',
        // queryFieldType: 'dropdownValues', //ex: "Choice"
        // queryFieldValue: 'main',
        //from other list:
        source: 'SOs',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        validation: 'required',
        dynamic: "Types", //InternalName Of Parent field
        filterField: "Types",//InternalName Of Parent field
        filterFieldType: "Choice",
        display: 'none',
        ToggleName: 'RelatedObjective',
        RequiredName: 'RelatedObjective',
      },
      {
        InternalName: 'RelatedPortfolio',
        DisplayNameEn: 'Related Portfolio',
        // ToggleName: 'RelatedPortfolio',
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
        type: 'lookup',
        validation: 'required',
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
        DisplayNameEn: 'Deputyship',
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
        EntityType: 'Department',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        RequiredName: 'Department',
      },
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
        DisplayNameEn: 'Is Strategic Pillars/Vision Programs Exist?',
        DisplayName: 'هل يوجد محاور استراتيجية / برامج الرؤية ؟',
        type: "dropdownValues",
        // dontSubmit: true,
        // type: 'yesnoradio', 
        dontSubmit: true,

        state: 'disabled',
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
      // {
      // 	"InternalName": "RelatedStrategyPillars",
      // 	"DisplayName": "هل يوجد محور / برنامج ؟",
      // 	"DisplayNameEn": "Is Pillar / program  Exist?",
      // 	"type": "yesnoradio",
      // 	options: {
      // 		choices: [{
      // 			display: 'yes',
      // 			value: 'yes'
      // 		},
      // 		{
      // 			display: 'no',
      // 			value: 'no'
      // 		}
      // 		]
      // 	},

      // },
      //   {
      //     InternalName: 'PillarName',
      //     DisplayNameEn: 'Strategic Pillar/Vision Program Name',
      //     DisplayName: 'اسم المحور الإستراتيجى / برنامج الرؤية',
      //     type: 'lookup',
      //     //from other list:
      //     source: 'SPillars',
      //     Dispfieldkey: 'Name',
      //     valfieldkey: 'Title',
      //     display: 'none',
      //   },
      //   {
      //     InternalName: 'RelatedPortfolio',
      //     DisplayNameEn: 'Related Portfolio',
      //     ToggleName: 'RelatedPortfolio',
      //     DisplayName: 'المحفظة المرتبطة ',
      //     type: 'lookup',
      //     //from other list:
      //     source: 'Portfolio',
      //     Dispfieldkey: 'Name',
      //     valfieldkey: 'Title',
      //     display: 'none',
      //   },
      //   // {
      // 	InternalName: "RelatedJobStrategy",
      // 	DisplayNameEn: "Related Job Market Strategy",
      // 	DisplayName: "استراتيجية سوق العمل المرتبطة",
      // 	ToggleName: "RelatedJobStrategy",
      // 	type: "lookupWithQuery",
      // 	queryField: "Types",
      // 	queryFieldType: "dropdownValues", //ex: "Choice"
      // 	queryFieldValue: "jobmarket",
      // 	//from other list:

      // 	source: "GoalStrategy",
      // 	Dispfieldkey: "Name",
      // 	valfieldkey: "Title",
      // 	display: "none",
      // },
      //   {
      //     InternalName: 'Sector',
      //     DisplayName: 'القطاع',
      //     DisplayNameEn: 'Sector',
      //     type: 'lookup',
      //     validation: 'required',
      //     //from other list:
      //     source: 'Internal Entities',
      //     isSector: 'True',
      //     EntityType: 'Sector',
      //     Dispfieldkey: 'Name',
      //     DispfieldkeyEn: 'NameEn',
      //     valfieldkey: 'Title',
      //   },
      //   {
      //     InternalName: 'SubSector',
      //     DisplayName: 'الوكالة',
      //     DisplayNameEn: 'Deputyship',
      //     type: 'lookup',
      //     //from other list:
      //     source: 'Internal Entities',
      //     isSector: 'True',
      //     EntityType: 'Department',
      //     Dispfieldkey: 'Name',
      //     DispfieldkeyEn: 'NameEn',
      //     valfieldkey: 'Title',
      //   },
      //   {
      //     InternalName: 'Department',
      //     DisplayName: 'الإدارة',
      //     DisplayNameEn: 'Department',
      //     type: 'lookup',
      //     //from other list:
      //     source: 'Internal Entities',
      //     isSector: 'True',
      //     EntityType: 'Department',
      //     Dispfieldkey: 'Name',
      //     DispfieldkeyEn: 'NameEn',
      //     valfieldkey: 'Title',
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
    display:'none', // it's specific to pillers section only
    description: '',
    descriptionEn: '',
    subFields: [
      // {
      // 	"InternalName": "RelatedStrategyPillars",
      // 	"DisplayName": "هل يوجد محور / برنامج ؟",
      // 	"DisplayNameEn": "Is Pillar / program  Exist?",
      // 	"type": "yesnoradio",
      // 	options: {
      // 		choices: [{
      // 			display: 'yes',
      // 			value: 'yes'
      // 		},
      // 		{
      // 			display: 'no',
      // 			value: 'no'
      // 		}
      // 		]
      // 	},

      // },
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
        // isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        // to get the seblings value
        valsiblingkey: 'Description', // internal name on sorce list
        targetsiblingkey: 'StrategicDescription', // internal name on current list
        // display: 'none',
      },
      {
        InternalName: 'StrategicDescription',
        DisplayNameEn: 'Strategic Description',
        DisplayName: 'وصف  المحور الإستراتيجى / برنامج الرؤية',
        type: 'multiline',
        maxchar: '500',
        // dontSubmit: true,
        dontSubmit: true,
        state: 'disabled',
      },
    ],
  },
  // {
  //   label: '',
  //   labelEn: '',
  //   description: 'التفاصيل',
  //   descriptionEn: 'Details',
  //   subFields: [

  //   ],
  // },
]
