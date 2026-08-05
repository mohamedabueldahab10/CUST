var Information_Form = [
    {
      label: "معادلات المنفعة",
      labelEn: "Benefit Equation",
      description: "التفاصيل",
      descriptionEn: "Details",
      subFields: [
        {
          InternalName: "BenefitCode",
          DisplayNameEn: "Benefit",
          DisplayName: "المنفعة",
          type: "lookup",
          source: "Benefits",
          Dispfieldkey: "Name",
          valfieldkey: "Title",
          state: "disabled",
        },
  
        {
          InternalName: "Equation",
          DisplayName: "معادلة المنفعة في البطاقة",
          DisplayNameEn: "Equation",
          type: "string",
        },
        {
          InternalName: "KPIInput",
          DisplayName: "المعادلة المدخلة",
          DisplayNameEn: "Benefit Input",
          type: "formula",
        },
      ],
    },
    {
      label: "مكونات المعادلة",
      labelEn: "Equation components",
      description: "",
      descriptionEn: "",
      subFields: [
        {
          InternalName: "A",
          DisplayName: "المكون الأول (A)",
          DisplayNameEn: "A",
          type: "string",
        },
        {
          InternalName: "B",
          DisplayName: "المكون الثاني (B)",
          DisplayNameEn: "B",
          type: "string",
        },
        {
          InternalName: "CC",
          DisplayName: "المكون الثالث (C)",
          DisplayNameEn: "C",
          type: "string",
        },
        {
          InternalName: "D",
          DisplayName: "المكون الرابع (D)",
          DisplayNameEn: "D",
          type: "string",
        },
        {
          InternalName: "E",
          DisplayName: "المكون الخامس (E)",
          DisplayNameEn: "E",
          type: "string",
        },
        {
          InternalName: "F",
          DisplayName: "المكون السادس (F)",
          DisplayNameEn: "F",
          type: "string",
        },
        {
          InternalName: "G",
          DisplayName: "المكون السابع (G)",
          DisplayNameEn: "G",
          type: "string",
        },
      ],
    },
    {
      label: "",
      labelEn: "",
      description: "",
      descriptionEn: "",
      subFields: [
        {
          InternalName: "Author",
          DisplayName: "تم الانشاء بواسطة",
          DisplayNameEn: "Author",
          type: "picker",
          state: "disabled",
        },
  
        {
          InternalName: "Created",
          DisplayName: "تاريخ الانشاء ",
          DisplayNameEn: "Created",
          type: "datetime",
          state: "disabled",
        },
        {
          InternalName: "Editor",
          DisplayName: "تم التعديل بواسطة",
          DisplayNameEn: "Editor",
          type: "picker",
          state: "disabled",
        },
        {
          InternalName: "Modified",
          DisplayName: "تاريخ اخر تعديل",
          DisplayNameEn: "Modified",
          type: "datetime",
          state: "disabled",
        },
      ],
    },
  ];
  