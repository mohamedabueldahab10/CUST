var Information_Form = [
    {
      label: "بريد قياس دورة الأداء",
      labelEn: "Measurement Cycle Support",
      description: "",
      descriptionEn: "",
      subFields: [
        // {
        //   InternalName: "Title",
        //   DisplayName: "الرمز",
        //   DisplayNameEn: "Code",
        //   type: "string",
        //   validation: "required",
        // },
        {
          InternalName: "SectorName",
          DisplayName: "القطاع",
          DisplayNameEn: "Sector",
          type: "string",
          validation: "required",
        },
        {
          InternalName: "Specialization",
          DisplayName: "التخصص",
          DisplayNameEn: "Specialization",
          type: "string",
          validation: "required",
        },
        {
          InternalName: "Responsible",
          DisplayName: "المسؤول",
          DisplayNameEn: "Responsible",
          type: "string",
          validation: "required",
        },
        {
          InternalName: "Email",
          DisplayName: "البريد الإلكتروني",
          DisplayNameEn: "Email",
          type: "email",
          validation: "required",
        },
        {
          InternalName: "Extension",
          DisplayName: "التحويلة",
          DisplayNameEn: "Extension",
          type: "number",
        },
      ],
    },
    {
      label: "الوثائق الداعمة",
      labelEn: "Supporting Documents",
      description: "الملفات المرفقة",
      descriptionEn: "Attachments",
      subFields: [
        {
          InternalName: "getfile",
          DisplayName: "المرفقات",
          DisplayNameEn: "Attachments",
          type: "file",
        },
      ],
    },
  ];
  