var Information_Form = [
  {
    label: "بيانات التحليل",
    labelEn: "Delivrable Data",
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [
      // {
      // InternalName: 'KPICode',
      // DisplayName: 'المؤشر المرتبط',
      // DisplayNameEn: 'KPI Code',
      // type: 'string',
      // },
      {
        InternalName: "Analysis",
        DisplayName: "تحليل الأداء",
        DisplayNameEn: "Analysis",
        type: "multiline",
        validation: "required",
        maxchar: 1000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 1000 حرف",
        descPhraseEn: "max length of letters equal 1000",
        // withletters: true,
        Errmsgkey: "withletterpattern",
      },
      {
        InternalName: "Quarter",
        DisplayNameEn: "Quarter",
        DisplayName: "الربع",
        type: "number",
        validation: "required",
      },
      {
        InternalName: "Year",
        DisplayNameEn: "Year",
        DisplayName: "السنة",
        type: "number",
        validation: "required",
      },

      {
        InternalName: "MeasurementLaunchDate",
        DisplayName: "بداية دورة القياس للربع الحالي",
        DisplayNameEn: "Measurement Launch Date",
        type: "datetime",
      },
      {
        InternalName: "MeasurementLaunchEndDate",
        DisplayName: "نهاية دورة القياس للربع الحالي",
        DisplayNameEn: "Measurement Launch End Date",
        type: "datetime",
      },
    ],
  },
];
