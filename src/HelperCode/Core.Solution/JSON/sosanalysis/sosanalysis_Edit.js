var Information_Form = [
  {
    label: "بيانات الهدف",
    labelEn: "Related Objective Data",
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [
      {
        InternalName: "SOCode",
        DisplayName: "اسم الهدف",
        DisplayNameEn: "Objective Name",
        type: "lookup",
        source: "SOs",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        state: "disabled",
        dontSubmit: true,
      },
      {
        InternalName: "SOCodedummyfield",
        DisplayName: "نوع الهدف",
        DisplayNameEn: "Objective Type",
        type: "lookupdropdown",
        source: "SOs",
        Dispfieldkey: "Types",
        valfieldkey: "Title",
        state: "disabled",
        dontSubmit: true,
      },
      {
        InternalName: "SOCodedummyfield",
        DisplayName: "الاستراتيجية المرتبطة",
        DisplayNameEn: "Related Strategy",
        type: "lookupfromlookup",
        source: "SOs",
        Dispfieldkey: "RelatedStrategy",
        valfieldkey: "Title",
        secondsource: "GoalStrategy",
        secondDispfieldkey: "Name",
        secondvalfieldkey: "Title",
        state: "disabled",
        dontSubmit: true,
      },
    ],
  },
  {
    label: "بيانات التحليل",
    labelEn: "Deliverable Data",
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [
      {
        InternalName: "Analysis",
        DisplayName: "تحليل الأداء",
        DisplayNameEn: "Analysis",
        type: "multiline",
        validation: "required",
        maxchar: 1000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 1000 حرف",
        descPhraseEn: "max length of letters equal 1000",
        Errmsgkey: "withletterpattern",
      },
      {
        InternalName: "Quarter",
        DisplayNameEn: "Quarter",
        DisplayName: "الربع",
        type: "number",
        validation: "required",
        state:"disabled"
      },
      {
        InternalName: "Year",
        DisplayNameEn: "Year",
        DisplayName: "السنة",
        type: "number",
        validation: "required",
        state:"disabled"
      },

      {
        InternalName: "MeasurementLaunchDate",
        DisplayName: "بداية دورة القياس للربع الحالي",
        DisplayNameEn: "Measurement Launch Date",
        type: "datetime",
        state:"disabled"
      },
      {
        InternalName: "MeasurementLaunchEndDate",
        DisplayName: "نهاية دورة القياس للربع الحالي",
        DisplayNameEn: "Measurement Launch End Date",
        type: "datetime",
        state:"disabled"
      },
    ],
  },
];
