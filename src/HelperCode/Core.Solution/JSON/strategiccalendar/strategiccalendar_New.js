var Information_Form = [
    {
      label: "التقويم الاستراتيجي",
      labelEn: "Strategic Calendar",
      description: "",
      descriptionEn: "",
      subFields: [
        // {
        //   InternalName: "Title",
        //   DisplayName: "العنوان",
        //   DisplayNameEn: "Title",
        //   type: "string",
        //   validation: "required",
        // },
        {
          InternalName: "Year",
          DisplayName: "السنة",
          DisplayNameEn: "Year",
          type: "number",
          validation: "required",
          numberOfDigits: "4",        
          descPhraseAr: "يجب إدخال سنة",
          descPhraseEn: "Enter a year", 
        },
        {
          InternalName: "Quarter",
          DisplayName: "الربع",
          DisplayNameEn: "Quarter",
          type: "number",
          numberOfDigits: "1",        
          descPhraseAr: "يجب إدخال رقم من 1 إلى 4",
          descPhraseEn: "Enter a number from 1 to 4", 
        },
        {
          InternalName: "StartDate",
          DisplayName: "تاريخ البدء",
          DisplayNameEn: "Start Date",
          type: "datetime",
          validation: "required",
        },
        {
          InternalName: "FinishDate",
          DisplayName: "تاريخ الانتهاء",
          DisplayNameEn: "Finish Date",
          type: "datetime",
        },
        {
          InternalName: "ReminderDate",
          DisplayName: "تاريخ التذكير",
          DisplayNameEn: "Reminder Date",
          type: "datetime",
        },
        {
          InternalName: "SendToRoles",
          DisplayName: "الأدوار المرسلة إليها",
          DisplayNameEn: "Send To Roles",
          type: "dropdownValuesMultiselect",
          options: {
            choices: [
              { display: "SubSectorHead", value: "SubSectorHead" },
              { display: "ViceMinister", value: "ViceMinister" },
              { display: "MinisterAssistant", value: "MinisterAssistant" },
            ],
          },
        },
        {
          InternalName: "ReminderTypes",
          DisplayName: "أنواع التذكير",
          DisplayNameEn: "Reminder Types",
          type: "dropdownValuesMultiselect",
          options: {
            choices: [
              { display: "Projects", value: "Projects" },
              { display: "Initiatives", value: "Initiatives" },
              { display: "MainKPIs", value: "MainKPIs"}
            ],
          },
        },
        {
          InternalName: "ReminderItems",
          DisplayName: "عناصر التذكير",
          DisplayNameEn: "Reminder Items",
          type: "dropdownValuesMultiselect",
          options: {
            choices: [
              { display: "Deliverables", value: "Deliverables" },
              { display: "Milestones", value: "Milestones" },
              { display: "Risks", value: "Risks" },
              { display: "Issues", value: "Issues" },
            ],
          },
        },
        {
          InternalName: "IsActive",
          DisplayName: "مفعلة",
          DisplayNameEn: "Active",
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
  