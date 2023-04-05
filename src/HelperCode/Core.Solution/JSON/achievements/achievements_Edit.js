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
        InternalName: 'AchievementCategory',
        DisplayNameEn: 'Achievement Category',
        DisplayName: 'تصنيف المنجز',
        validation: 'required',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'strategic', value: 'strategic' },
            { display: 'vision', value: 'vision' },
            { display: 'jobmarket', value: 'jobmarket' },
          ],
        },
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
        toggleDisabledValues: [
          { value: 'objective', fields: ['RelatedObjective', 'RelatedKPI'] },
          {
            value: 'initiative',
            fields: ['RelatedInitiative', 'RelatedMilestone'],
          },
        ],
      },
      {
        InternalName: 'RelatedObjective',
        DisplayNameEn: 'Related Objective',
        DisplayName: 'الهدف المرتبط',
        type: 'lookup',
        source: 'SOs',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        validation: 'required',
        ToggleDisabledName: 'RelatedObjective',
        // "state": "disabled"
      },
      {
        InternalName: 'RelatedKPI',
        DisplayNameEn: 'Related KPI',
        DisplayName: 'المؤشر المرتبط',
        type: 'lookup',
        source: 'MainKPI',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        ToggleDisabledName: 'RelatedKPI',
      },
      {
        InternalName: 'RelatedInitiative',
        DisplayNameEn: 'Related Initiative',
        DisplayName: 'المبادرة المرتبطة',
        type: 'lookup',
        source: 'Initiatives',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        validation: 'required',
        dontSubmit: true,
        ToggleDisabledName: 'RelatedInitiative',
      },
      {
        InternalName: 'RelatedMilestone',
        DisplayNameEn: 'Related Milestone',
        DisplayName: 'معلم المبادرة المرتبط',
        type: 'lookup',
        source: 'InitiativeMilestones',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        validation: 'required',
        ToggleDisabledName: 'RelatedMilestone',
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
