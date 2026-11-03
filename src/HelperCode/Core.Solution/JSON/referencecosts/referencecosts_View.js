var Information_Form = [
  {
    label: "بيانات البند",
    labelEn: "Item Data",
    description: "التفاصيل",
    descriptionEn: "Details",
    workflowSetValues: [
      { fieldName: 'Status', value: 'PendingProcurementManagerReview', stages: ['ReferenceCosts01'] },
      { fieldName: 'Status', value: 'Approved', stages: ['ReferenceCosts02'] },
      { fieldName: 'WFModuleCode', value: '', stages: ['ReferenceCosts02'] },
      { fieldName: 'WFStage', value: '', stages: ['ReferenceCosts02'] },
    ],
    subFields: [
      {
        InternalName: "Title",
        DisplayName: "رمز البند",
        DisplayNameEn: "Item Code",
        type: "string"
      },
      {
        InternalName: "ItemClassification",
        DisplayName: "تصنيف البند",
        DisplayNameEn: "Item Classification",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "choice1", value: "choice1" },
            { display: "choice2", value: "choice2" },
            { display: "choice3", value: "choice3" }
          ]
        }
      },
      {
        InternalName: "ProjectName",
        DisplayName: "اسم المشروع",
        DisplayNameEn: "Project Name",
        type: "string"
      },
      {
        InternalName: "BrochureType",
        DisplayName: "نوع الكراسة",
        DisplayNameEn: "Brochure Type",
        type: 'lookup',
        source: "PRType",
        Dispfieldkey: "ArName",
        valfieldkey: "Title",
      },
      {
        InternalName: "NeedRequestNumber",
        DisplayName: "رقم طلب الاحتياج",
        DisplayNameEn: "Need Request Number",
        type: "string"
      },
      {
        InternalName: "CompanyName",
        DisplayName: "اسم الشركة",
        DisplayNameEn: "Company Name",
        type: "string"
      },
      {
        InternalName: "ItemDescription",
        DisplayName: "وصف البند",
        DisplayNameEn: "Item Description",
        type: "string"
      },
      {
        InternalName: "MeasurementUnit",
        DisplayName: "وحدة القياس",
        DisplayNameEn: "Measurement Unit",
        type: 'lookup',
        source: "RCMeasurementUnit",
        Dispfieldkey: "ARName",
        DispfieldkeyEn: 'ENName',
        valfieldkey: "Title",
      },
      {
        InternalName: "Quantity",
        DisplayName: "الكمية",
        DisplayNameEn: "Quantity",
        type: "string"
      },
      {
        InternalName: "ItemPrice",
        DisplayName: "سعر البند",
        DisplayNameEn: "Item Price",
        type: "string"
      }, {
        InternalName: 'Status',
        DisplayName: 'الحالة',
        DisplayNameEn: 'Status',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'PendingProcurementTeamReview', value: 'PendingProcurementTeamReview' },
            { display: 'PendingProcurementManagerReview', value: 'PendingProcurementManagerReview' },
            { display: 'Approved', value: 'Approved' },
          ],
        },
      },
      {
        InternalName: 'WFStage',
        DisplayName: 'المرحلة',
        DisplayNameEn: 'Stage',
        type: 'lookup',
        source: 'Tasks Configuration',
        Dispfieldkey: 'TaskNameAr',
        DispfieldkeyEn: 'TaskNameEn',
        valfieldkey: 'Title',
      },
      {
        InternalName: "LowestOfferPrice",
        DisplayName: "أقل عرض سعر",
        DisplayNameEn: "Lowest Offer Price",
        type: "string"
      },
      {
        InternalName: "MarketAveragePrice",
        DisplayName: "متوسط سعر السوق",
        DisplayNameEn: "Market Average Price",
        type: "string"
      },
      {
        InternalName: "WinnerCompanyPrice",
        DisplayName: "سعر البند للشركة الفائزة",
        DisplayNameEn: "Winner Company Price",
        type: "string"
      },
      {
        InternalName: "HighestOfferPrice",
        DisplayName: "أعلى عرض سعر",
        DisplayNameEn: "Highest Offer Price",
        type: "string"
      },
      {
        InternalName: "AverageOffersPrice",
        DisplayName: "متوسط عروض الأسعار",
        DisplayNameEn: "Average Offers Price",
        type: "string"
      }
    ]
  }
];
