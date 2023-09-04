var Information_Form = [
  {
    label: 'المعلومات الأساسية ',
    labelEn: 'Basic Info',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
          InternalName: "Title",
          DisplayNameEn: "Code",
          DisplayName:"رمز المنجز",
          type: 'string',

      },
      {
        InternalName: 'AchievementName',
        DisplayNameEn: 'Achievement Name',
        DisplayName: 'اسم المنجز',
        type: 'string',
        // validation: 'required',
      },

      {
        InternalName: 'AchievementType',
        DisplayNameEn: 'Achievement Type',
        DisplayName: 'نوع المنجز',
        // validation: 'required',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'launchstraightvital', value: 'launchstraightvital' },
            {
              display: 'launchesconferencesworkshopselectronicplatforms',
              value: 'launchesconferencesworkshopselectronicplatforms',
            },
            {
              display: 'establishingimportantmeetingpartnershipsprogramlevel',
              value: 'establishingimportantmeetingpartnershipsprogramlevel',
            },
            { display: 'legalmilestonesgroup', value: 'legalmilestonesgroup' },
            { display: 'lmsstrategy', value: 'lmsstrategy' },
            { display: 'achievementsofkingdom', value: 'achievementsofkingdom' },
            { display: 'achievementsofbudgetforum', value: 'achievementsofbudgetforum' },
            { display: 'organizationalstructure', value: 'organizationalstructure' },
            {
              display: 'achievingkeyperformancetargets',
              value: 'achievingkeyperformancetargets',
            },
          ],
        },
      },
      {
        InternalName: 'AchievementDate',
        DisplayNameEn: 'Achievement Date',
        DisplayName: 'تاريخ المنجز',
        type: 'datetime',
        // validation: 'required',
      },
      {
        "InternalName": "Sector",
        "DisplayName": "القطاع",
        "DisplayNameEn": "Sector",
        "type": "lookupWithQuery",
        "queryField": "EntityType",
        "queryFieldType": "dropdownValues", //ex: "Choice"
        "queryFieldValue": "Sector",
        dynamic: "parent",
        "source": "Internal Entities",
        "Dispfieldkey": "Name",
        "DispfieldkeyEn": "NameEn",
        "valfieldkey": "Title",
        "validation": "required"
      },
      {
        "InternalName": "SubSector",
        "DisplayName": "الوكالات",
        "DisplayNameEn": "DeputyShip",
        type: "lookup",
        //from other list:
        source: "Internal Entities",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        grpfieldkey: 'Title',
        // "isRelatedToParent": true, // to show parent value depends on child like sector and subsector
        dynamic: "Sector", //InternalName Of Parent field
        filterField: "ParentEntity",
        filterFieldType: "Text",//Type In Sharepoint List for Parent field
        // "validation": "required"
      },
    ],
  },
  {
    label: 'تفاصيل المنجز',
    labelEn: 'Achievements Details',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف المنجز',
        type: 'multiline',
        // validation: 'required',
      },
      // {
      //   InternalName: 'LinkType',
      //   DisplayNameEn: 'Link Type',
      //   DisplayName: 'نوع ارتباط المنجز',
      //   // validation: 'required',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       { display: 'objective', value: 'objective' },
      //       { display: 'initiative', value: 'initiative' },
      //     ],
      //   },
      //   // toggleValues: [
      //   //   { value: 'objective', fields: ['AchievementCategory','RelatedAchievementStrategy','RelatedObjective', 'RelatedKPI'] },
      //   //   { value: 'initiative', fields: ['AchievementCategoryInitiative','RelatedInitiative', 'RelatedMilestone'] },
      //   // ],


      // },
      {
        InternalName: 'AchievementCategory',
        DisplayNameEn: 'Achievement Category',
        DisplayName: 'تصنيف المنجز',
        // validation: 'required',
        type: 'dropdownValues',
        dynamic: 'parent',
        toggleValues: [
          { value: 'vision', fields: ['Program'] },
          // {value:'strategically', fields:['StrategyRelatedObjective']}
        ],
        options: {
          choices: [
            {display: 'strategically',
            value: 'strategically',
            customFilterValue: "ministry", },
            { display: 'vision', value: 'vision',
            customFilterValue:  "vision", },
            { display: 'lms', value: 'lms',
            customFilterValue:  "lms", },
          ],
        },
        // ToggleName:'AchievementCategory',
        // display:'none'

      },
      // {
      //   InternalName: 'AchievementCategoryInitiative',
      //   DisplayNameEn: 'Achievement Category',
      //   DisplayName: 'تصنيف المنجز',
      //   // validation: 'required',
      //   type: 'dropdownValues',
      //   dynamic: 'parent',
      //   options: {
      //     choices: [
      //       {display: 'strategically',
      //       value: 'strategically',
      //       customFilterValue: "strategically", },
      //       { display: 'vision', value: 'vision',
      //       customFilterValue:  "vision", },
      //       { display: 'lms', value: 'lms',
      //       customFilterValue:  "lms", },
      //     ],
      //   },
      //   // ToggleName:'AchievementCategoryInitiative',
      //   // display:'none'

      // },
      {
        InternalName: 'RelatedAchievementStrategy',
        DisplayNameEn: 'Related Strategy',
        DisplayName: 'الاستراتيجية المرتبطة',
        type: 'lookup',
        // ToggleName:'RelatedAchievementStrategy',
        // validation: 'required',
        source: "GoalStrategy",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        // display: "none",
      },
      {
        InternalName: "Program",
        DisplayName: "البرنامج",
        DisplayNameEn: "Program",
        ToggleName: 'Program',
        // RequiredName: 'Ministry',
        type: 'lookupWithQuery',
        queryField: 'Types',
        queryFieldType: 'Text', //ex: "Choice"
        queryFieldValue: 'program',
        //from other list:
        source: 'SPillars',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
          // "display": "none"
      },
      {
        InternalName: 'RelatedObjective',
        DisplayNameEn: 'Related Objective',
        DisplayName: 'الهدف المرتبط',
        type: 'lookup',
        source: 'SOs',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // ToggleName: "RelatedObjective",
        // display:"none"
        
      },
      {
        InternalName: 'RelatedKPI',
        DisplayNameEn: 'Related KPI',
        DisplayName: 'المؤشر المرتبط',
        type: 'lookup',
        source: 'MainKPI',
        // display: "none",
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // ToggleName: "RelatedKPI",
      },
      {
        InternalName: 'RelatedInitiative',
        DisplayNameEn: 'Related Initiative',
        DisplayName: 'المبادرة المرتبطة',
        type: 'lookup',
        source: 'Initiatives',
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        // display: "none",
        // ToggleName: "RelatedInitiative",
      },
      {
        InternalName: 'RelatedMilestone',
        DisplayNameEn: 'Related Milestone',
        DisplayName: 'معلم المبادرة المرتبط',
        type: 'lookup',
        source: 'InitiativeMilestones',
        // display: "none",
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // validation: 'required',
        // ToggleName: "RelatedMilestone",
      },
    ],
  },
  {
    label: 'أثر المنجز',
    labelEn: 'Impact Details',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'ImpactType',
        DisplayNameEn: 'Impact Type',
        DisplayName: 'نوع الأثر',
        // validation: 'required',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'direct', value: 'direct' },
            { display: 'indirect', value: 'indirect' },
          ],
        },
      },
      {
        InternalName: 'ImpactCategory',
        DisplayNameEn: 'Impact Category',
        DisplayName: 'تصنيف الأثر',
        // validation: 'required',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'economical', value: 'economical' },
            { display: 'social', value: 'social' },
            { display: 'impactonervices', value: 'impactonervices' },
            { display: 'others', value: 'others' },
          ],
        },
        requiredValues: [{ value: 'others', fields: ['ImpactDescription'] }],
      },
      {
        InternalName: 'ImpactDescription',
        DisplayNameEn: 'Impact Description',
        DisplayName: 'وصف الأثر',
        type: 'multiline',
        // validation: 'required',
        RequiredName: 'ImpactDescription',
      },
      {
        InternalName: 'ImpactDuration',
        DisplayNameEn: 'Impact Duration',
        DisplayName: 'المدة الزمنية للأثر',
        type: 'string',
        // validation: 'required',
      },
    ],
  },
  {
    label: 'الوثائق الداعمة',
    labelEn: 'Attachments',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Comments',
        DisplayName: 'ملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
      },
      {
        InternalName: 'Attachments',
        DisplayName: 'مرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        withAddBtn: 'true',
        // validation: 'required',
      },
      {
        DisplayName: 'ارسال للموافقة',
        DisplayNameEn: 'Submit For Approval',
        InternalName: 'SubmitForApproval',
        // validation: 'required',
        type: 'yesnoradio',
        options: {
          choices: [
            {
              display: 'yes',
              value: 'yes',
            },

            {
              display: 'no',
              value: 'no',
            },
          ],
        },
      },
      {
        InternalName: 'Modified',
        DisplayName: 'تاريخ التعديل',
        DisplayNameEn: 'Modified',
        type: 'datetime',
      },
      {
        InternalName: 'Created',
        DisplayName: 'تاريخ الانشاء',
        DisplayNameEn: 'Created',
        type: 'datetime',
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
    ],
  },
]
