var Information_Form = [
  {
    label: 'المعلومات الأساسية ',
    labelEn: 'Basic Info',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'AchievementName',
        DisplayNameEn: 'Achievement Name',
        DisplayName: 'اسم المنجز',
        type: 'string',
        validation: 'required',
        maxchar: '255',
        withletters:true,
        Errmsgkey:"withletterpattern",
      },

      {
        InternalName: 'AchievementType',
        DisplayNameEn: 'Achievement Type',
        DisplayName: 'نوع المنجز',
        validation: 'required',
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
        validation: 'required',
      },
      {
        InternalName: 'Sector',
        DisplayName: 'القطاع',
        DisplayNameEn: 'Sector',
        type: 'lookupWithQuery',
        queryField: 'EntityType',
        queryFieldType: 'dropdownValues', //ex: "Choice"
        queryFieldValue: 'Sector',
        // dynamic: 'parent',
        // type: 'lookup',
        validation: 'required',
        //from other list:
        source: 'Internal Entities',
        // isSector: 'True',
        // EntityType: 'Sector',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
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
        validation: 'required',
      },
      {
        InternalName: 'LinkType',
        DisplayNameEn: 'Link Type',
        DisplayName: 'نوع ارتباط المنجز',
        validation: 'required',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'objective', value: 'objective' },
            { display: 'initiative', value: 'initiative' },
          ],
        },
        toggleValues: [
          { value: 'objective', fields: ['AchievementCategory','RelatedAchievementStrategy','RelatedObjective', 'RelatedKPI'] },
          { value: 'initiative', fields: ['AchievementCategoryInitiative','RelatedInitiative', 'RelatedMilestone'] },
        ],


      },
      {
        InternalName: 'AchievementCategory',
        DisplayNameEn: 'Achievement Category',
        DisplayName: 'تصنيف المنجز',
        validation: 'required',
        type: 'dropdownValues',
        dynamic: 'parent',
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
        ToggleName:'AchievementCategory',
        display:'none'

      },
      {
        InternalName: 'AchievementCategoryInitiative',
        DisplayNameEn: 'Achievement Category',
        DisplayName: 'تصنيف المنجز',
        validation: 'required',
        type: 'dropdownValues',
        dynamic: 'parent',
        options: {
          choices: [
            {display: 'strategically',
            value: 'strategically',
            customFilterValue: "strategically", },
            { display: 'vision', value: 'vision',
            customFilterValue:  "vision", },
            { display: 'lms', value: 'lms',
            customFilterValue:  "lms", },
          ],
        },
        ToggleName:'AchievementCategoryInitiative',
        display:'none'

      },
      {
        InternalName: 'RelatedAchievementStrategy',
        DisplayNameEn: 'Related Strategy',
        DisplayName: 'الاستراتيجية المرتبطة',
        type: 'lookup',
        ToggleName:'RelatedAchievementStrategy',
        validation: 'required',
        source: "GoalStrategy",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        dynamic: 'parent', //InternalName Of Parent field
        seconeddynamic: "AchievementCategory",
        filterField: "Types",//InternalName Of Parent field
                filterFieldType: "Text",//Type In Sharepoint List for Parent field
        display: "none",
      },
      {
        InternalName: 'RelatedObjective',
        DisplayNameEn: 'Related Objective',
        DisplayName: 'الهدف المرتبط',
        type: 'lookup',
        source: 'SOs',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        ToggleName: "RelatedObjective",
        isRelatedToParent: true,
        dynamic: 'parent', //InternalName Of Parent field
        seconeddynamic: "RelatedAchievementStrategy",
        filterField: 'RelatedStrategy',
        filterFieldType: 'Text',
        display:"none"
        
      },
      {
        InternalName: 'RelatedKPI',
        DisplayNameEn: 'Related KPI',
        DisplayName: 'المؤشر المرتبط',
        type: 'lookup',
        source: 'MainKPI',
        display: "none",
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        ToggleName: "RelatedKPI",
        isRelatedToParent: true,
        dynamic: 'RelatedObjective',
        filterField: 'RelatedStrategyObjective',
        filterFieldType: 'Text',
      },
      {
        InternalName: 'RelatedInitiative',
        DisplayNameEn: 'Related Initiative',
        DisplayName: 'المبادرة المرتبطة',
        type: 'lookup',
        source: 'Initiatives',
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        dynamic: 'parent', //InternalName Of Parent field
        seconeddynamic: "AchievementCategoryInitiative",
        filterField: "Types",//InternalName Of Parent field
        filterFieldType: "Text",//Type In Sharepoint List for Parent field
        display: "none",
        ToggleName: "RelatedInitiative",
      },
      {
        InternalName: 'RelatedMilestone',
        DisplayNameEn: 'Related Milestone',
        DisplayName: 'معلم المبادرة المرتبط',
        type: 'lookup',
        source: 'InitiativeMilestones',
        display: "none",
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        validation: 'required',
        ToggleName: "RelatedMilestone",
        //
        isRelatedToParent: true,
        dynamic: 'RelatedInitiative',
        filterField: 'InitiativeCode',
        filterFieldType: 'Text',
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
        validation: 'required',
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
        validation: 'required',
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
        validation: 'required',
        maxchar: '255',
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
        validation: 'required',
      },
      {
        DisplayName: 'ارسال للموافقة',
        DisplayNameEn: 'Submit For Approval',
        InternalName: 'SubmitForApproval',
        validation: 'required',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'yes',
              value: 'yes',
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'Achievements' },
                { fieldName: 'WFStage', value: 'A01' },
                // { fieldName: 'DraftStatus', value: '' },
              ],
            },

            {
              display: 'no',
              value: 'no',
            },
          ],
        },
      },
    ],
  },
]
