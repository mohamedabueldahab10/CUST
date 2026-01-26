var Information_Form = [
  {
    label: "بيانات بنود طلبات التغيير",
    labelEn: "Delivrable Data",
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [
      {
        InternalName: "Title",
        DisplayNameEn: "Title",
        DisplayName: "رمز البند",
        type: "string",
        state: "disabled",
      },
      {
        InternalName: "ItemType",
        DisplayNameEn: "Item Type",
        DisplayName: "نوع البند",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "objective", value: "SOs" },
            { display: "kpi", value: "MainKpi" },
            { display: "initiative", value: "Initiatives" },
            { display: "project", value: "Projects" },
            { display: "initiativesmilestones", value: "InitiativeMilestones" },
            {
              display: "initiativesdeliverables",
              value: "InitiativeDeliverables",
            },
            { display: "benefits", value: "Benefits" },
            { display: "deliverables", value: "Deliverables" },
            { display: "milestones", value: "Milestones" },
          ],
        },
        state: "disabled",
        dontsubmit: true,
        getValueFromLookup: {
          lookupField: "RelatedChangeItemCode",
          lookupList: "ChangeItems",
          lookupFieldToGet: "ListName",
        },
        toggleValues: [
          { value: "MainKpi", fields: ["Classification"] }, //we can put more than 1  field
        ],
      },
      {
        InternalName: "Classification",
        DisplayNameEn: "Classification",
        DisplayName: "تصنيف المؤشر",
        type: "dropdownValues",
        ToggleName: "Classification",
        display: "none",
        options: {
          choices: [
            { display: "kpioperational", value: "kpioperational" },
            { display: "kpistrategic", value: "kpistrategic" },
          ],
        },
      },
      {
        InternalName: "RelatedChangeItemCode",
        DisplayNameEn: "Related Change Item",
        DisplayName: "اسم البند",
        type: "lookup",
        source: "ChangeItems",
        Dispfieldkey: "ItemName",
        valfieldkey: "Title",
      },
      {
        InternalName: "SecurityGroupName",
        DisplayNameEn: "Security Group Name",
        DisplayName: " اسم المجموعة بالعربي",
        type: "lookup",
        source: "finalapprovallevels",
        Dispfieldkey: "SecurityGroupNameAr",
        valfieldkey: "Title",
      },
      // {
      //InternalName: 'ColumnInternalName',
      //DisplayNameEn: 'ColumnInternalName',
      //DisplayName: '',
      //type: 'string',
      //},
      //  {
      //  InternalName: 'ListName',
      //  DisplayNameEn: 'ListName',
      //  DisplayName: '',
      //  type: 'string',
      //},
      //    {
      // InternalName: 'DeletionStatus',
      // DisplayNameEn: 'DeletionStatus',
      // DisplayName: 'حالة الحذف',
      // type: 'string',
      //},

      // {
      //InternalName: "Modified",
      //DisplayNameEn: "Modified",
      //DisplayName: "التغيير",
      //type: "datetime",
      //},
      // {
      //InternalName: "Created",
      //DisplayNameEn: "Created",
      //DisplayName: "تاريخ التغيير",
      //type: "datetime",
      //},
      {
        InternalName: "ActivationDate",
        DisplayNameEn: "Activation Date",
        DisplayName: "تاريخ البند",
        type: "datetime",
      },
      {
        InternalName: "ClosureDate",
        DisplayNameEn: "Closure Date",
        DisplayName: "تاريخ اغلاق البند",
        type: "datetime",
      },

      {
        InternalName: "ApprovalLevel",
        DisplayNameEn: "Approval Level",
        DisplayName: "المستوى الاستراتيجي ",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "crlevel1", value: "level1" },
            { display: "crlevel2", value: "level2" },
          ],
        },
      },
      {
        InternalName: "ApprovalPath",
        DisplayNameEn: "Approval Path",
        DisplayName: "مسار سير الموافقات",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "crstrategic", value: "strategic" },
            { display: "crexecution", value: "execution" },
            { display: "croperationally", value: "operation" },
          ],
        },
      },
    ],
  },
];
