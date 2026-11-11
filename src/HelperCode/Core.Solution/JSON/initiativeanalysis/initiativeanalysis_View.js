var Information_Form = [
  {
    label: "بيانات المبادرة",
    labelEn: "Related Initiative Data",
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [
      {
        InternalName: "InitiativeCode",
        DisplayName: "اسم المبادرة",
        DisplayNameEn: "Initiative Name",
        type: "lookup",
        source: "Initiatives",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
      },
      {
        InternalName: "InitiativeCodedummyfield",
        DisplayName: "نوع المبادرة",
        DisplayNameEn: "Initiative Type",
        type: "lookupdropdown",
        source: "Initiatives",
        Dispfieldkey: "Types",
        valfieldkey: "Title",
      },
    ],
  },
  {
    label: "بيانات التحليل",
    labelEn: "Analysis Data",
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [
      {
        InternalName: "Title",
        DisplayNameEn: "Title",
        DisplayName: "الرمز",
        type: "string",
      },
      {
        InternalName: "Year",
        DisplayName: "السنة",
        DisplayNameEn: "Year",
        type: "number",
      },
      {
        InternalName: "Quarter",
        DisplayName: "الربع",
        DisplayNameEn: "Quarter",
        type: "number",
      },
      {
        InternalName: "Analysis",
        DisplayNameEn: "Analysis",
        DisplayName: "تحليل الأداء",
        type: "multiline",
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
        DisplayNameEn: "Data Reception End Date",
        type: "datetime",
      },
    ],
  },
];
