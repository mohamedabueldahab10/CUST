var Information_Form = [
    {
      label: "التقويم الاستراتيجي",
      labelEn: "Strategic Calendar",
      description: "",
      descriptionEn: "",
      subFields: [
        {
          InternalName: "Title",
          DisplayName: "العنوان",
          DisplayNameEn: "Title",
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
          InternalName: "StartDate",
          DisplayName: "تاريخ البدء",
          DisplayNameEn: "Start Date",
          type: "datetime",
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
          type: "multiselecttranslatedstring",
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
          type: "multiselecttranslatedstring",
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
          type: "multiselecttranslatedstring",
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
  ];
  