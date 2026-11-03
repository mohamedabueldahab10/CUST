var Information_Form = [
  {
    label: "بيانات البند",
    labelEn: "Item Data",
    description: "التفاصيل",
    descriptionEn: "Details",
    workflowSetValues: [
      { fieldName: 'Status', value: 'PendingProcurementManagerReview', stages: ['ReferenceCosts01'] },
      { fieldName: 'Status', value: 'Approved', stages: ['ReferenceCosts02'] },
      { fieldName: 'WFModuleCode', value: 'ReferenceCosts', stages: ['ReferenceCosts02']
        
      },
      { fieldName: 'WFStage', value: '', stages: ['ReferenceCosts02'] },
      
    ],
    subFields: [
      {
        InternalName: "ItemClassification",
        DisplayName: "تصنيف البند",
        DisplayNameEn: "Item Classification",
        type: "dropdownValues",
        validation: "required",
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
        type: "string",
        validation: "required",
        maxchar: 255
      },
      {
        InternalName: "BrochureType",
        DisplayName: "نوع الكراسة",
        DisplayNameEn: "Brochure Type",
        type: 'lookup',
        source: "PRType",
        Dispfieldkey: "ArName",
        valfieldkey: "Title",
        validation: "required"
      },
      {
        InternalName: "NeedRequestNumber",
        DisplayName: "رقم طلب الاحتياج",
        DisplayNameEn: "Need Request Number",
        type: "string",
        validation: "required",
        maxchar: 255
      },
      {
        InternalName: "CompanyName",
        DisplayName: "اسم الشركة",
        DisplayNameEn: "Company Name",
        type: "string",
        validation: "required",
        maxchar: 255
      },
      {
        InternalName: "ItemDescription",
        DisplayName: "وصف البند",
        DisplayNameEn: "Item Description",
        type: "string",
        validation: "required",
        maxchar: 255
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
        validation: "required"
      },
      {
        InternalName: "Quantity",
        DisplayName: "الكمية",
        DisplayNameEn: "Quantity",
        type: "string",
        validation: "required",
        maxchar: 255
      },
      {
        InternalName: "ItemPrice",
        DisplayName: "سعر البند",
        DisplayNameEn: "Item Price",
        type: "string",
        validation: "required",
        maxchar: 255
      },
     
    ]
  }
];
