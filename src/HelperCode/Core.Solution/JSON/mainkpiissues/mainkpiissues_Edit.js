var Information_Form = [
  {
    label: "بيانات المؤشر المرتبط",
    labelEn: "Related KPI Data",
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [
      {
        InternalName: "KPICode",
        DisplayName: " اسم المؤشر",
        DisplayNameEn: "KPI Name",
        type: "lookup",
        source: "MainKPI",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        state: "disabled",
        dontSubmit: true,
      },
      {
        InternalName: "KPICodedummyfield",
        DisplayName: " نوع المؤشر",
        DisplayNameEn: "KPI Type",
        type: "lookupdropdown",
        source: "MainKPI",
        Dispfieldkey: "KPIType",
        valfieldkey: "Title",
        state: "disabled",
        dontSubmit: true,
      },
      {
        InternalName: "KPICodedummyfield",
        DisplayName: " تصنيف المؤشر",
        DisplayNameEn: "KPI Classification",
        type: "lookupdropdown",
        source: "MainKPI",
        Dispfieldkey: "Classification",
        valfieldkey: "Title",
        state: "disabled",
        dontSubmit: true,
      },
      {
        InternalName: "KPICodedummyfield",
        DisplayName: "الهدف المرتبط",
        DisplayNameEn: "Related Objective",
        type: "lookupfromlookup",
        source: "MainKPI",
        Dispfieldkey: "RelatedStrategyObjective",
        valfieldkey: "Title",
        secondsource: "SOs",
        secondDispfieldkey: "Name",
        secondvalfieldkey: "Title",
        state: "disabled",
        dontSubmit: true,
      },
    ],
  },
  {
    label: 'بيانات تحدي المؤشر',
    labelEn: 'Deliverable Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Category',
        DisplayName: 'تصنيف التحدي',
        DisplayNameEn: 'Category',
        validation: 'required',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'financialresources', value: 'financialresources' },
            { display: 'humanresources', value: 'humanresources' },
            { display: 'planning2', value: 'planning2' },
            { display: 'execution2', value: 'execution2' },
            { display: 'governance', value: 'governance' },
            { display: 'externalapprovals', value: 'externalapprovals' },
            { display: 'measurement', value: 'measurement' }
          ]
        }
      },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف التحدي',
        type: 'multiline',
        maxchar: '5000',
        descPhraseAr: 'الحد الاقصى لعدد الحروف هو 5000 حرف',
        descPhraseEn: 'max length of letters equal 5000',
        validation: 'required'
      },
      {
        InternalName: 'RequiredSupportNotes',
        DisplayNameEn: 'Required Support Notes',
        DisplayName: 'الدعم المطلوب',
        validation: 'required',
        type: 'multiline',
        maxchar: '5000',
        descPhraseAr: 'الحد الاقصى لعدد الحروف هو 5000 حرف',
        descPhraseEn: 'max length of letters equal 5000'
      },
      {
        InternalName: 'CorrectionPlan',
        DisplayNameEn: 'Correction Plan',
        DisplayName: 'الحلول/الخطط التحسينية',
        validation: 'required',
        type: 'multiline',
        maxchar: '5000',
        descPhraseAr: 'الحد الاقصى لعدد الحروف هو 5000 حرف',
        descPhraseEn: 'max length of letters equal 5000'
      },
      {
        InternalName: 'Notes',
        DisplayNameEn: 'Notes',
        DisplayName: 'ملاحظات اضافية',
        validation: 'required',
        type: 'multiline',
        maxchar: '5000',
        descPhraseAr: 'الحد الاقصى لعدد الحروف هو 5000 حرف',
        descPhraseEn: 'max length of letters equal 5000'
      },
      {
        InternalName: 'Recommendation',
        DisplayNameEn: 'Recommendation',
        DisplayName: 'التوصية',
        type: 'multiline',
        maxchar: '5000',
        descPhraseAr: 'الحد الاقصى لعدد الحروف هو 5000 حرف',
        descPhraseEn: 'max length of letters equal 5000',
        security: {
            groups: ["SPM Admin", "System Admin Group"],
        },
      },
      {
        InternalName: "Status",
        DisplayName: "الحالة",
        DisplayNameEn: "Status",
        type: "dropdownValues",
        validation: "required",
        options: {
          choices: [
            { display: "active2", value: "active2" },
            { display: "closed", value: "closed" },
          ],
        },
      },
      
    ]
  }
];