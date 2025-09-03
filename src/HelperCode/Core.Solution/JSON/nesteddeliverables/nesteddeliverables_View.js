var Information_Form = [
  {
    label: 'بيانات المخرج',
    labelEn: 'Delivrable Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    workflowSetValues: [
      //Project Deliverables
      //VRO
      { fieldName: 'Status', value: 'completed', stages:["VROProjNDeliverable02"] },
      //EPMO
      { fieldName: 'Status', value: 'completed', stages:["EPMOProjNDeliverable02"] },
      //LMS
      { fieldName: 'Status', value: 'completed', stages:["LMSProjNDeliverable02"] },
      //Strategicpartner ships Deliverables

    ],
    subFields: [
      {
        InternalName: 'Title',
        DisplayName: 'رمز المخرج',
        DisplayNameEn: 'Code',
        type: 'string',
      },
      {
        InternalName: 'Name',
        DisplayName: 'اسم المخرج',
        DisplayNameEn: 'Name',
        type: 'string',
      },
      {
        InternalName: 'Description',
        DisplayName: 'الوصف',
        DisplayNameEn: 'Description',
        type: 'multiline',
      },
  
      {
        InternalName: 'Quantity',
        DisplayNameEn: 'Quantity',
        DisplayName: 'الكمية',
        type: "number",
        // type: 'float',
      },
        {
        InternalName: 'AmountPrice',
        DisplayNameEn: 'AmountPrice',
        DisplayName: 'سعر الوحدة',
        type: "number",  
      },
       {
        InternalName: 'PurchaseRequestNumber',
        DisplayNameEn: 'PurchaseRequestNumber',
        DisplayName: 'رقم طلب الاحتياج',
        type: "number",  
      },
       {
        InternalName: 'PurchaseOrderNumber',
        DisplayNameEn: 'PurchaseOrderNumber',
        DisplayName: 'رقم امر التعميد',
        type: "number",  
      },
            {
        InternalName: 'PurchaseOrderLineNumber',
        DisplayNameEn: 'PurchaseOrderLineNumber',
        DisplayName: 'رقم السطر فى موارد',
        type: "string",  
      },
      {
				InternalName: "WFStage",
				DisplayName: " المرحلة",
				DisplayNameEn: "Stage",
				type: 'lookup',
				// validation: 'required',
				source: "Tasks Configuration",
				Dispfieldkey: "TaskNameAr",
				DispfieldkeyEn: 'TaskNameEn',
				valfieldkey: "Title",
				},
        {
          InternalName: 'InvoiceNumber',
          DisplayName: 'رقم الفاتورة',
          DisplayNameEn: 'Invoice Number',
          type: 'string',
      },
      {
        InternalName: 'InvoiceDate',
        DisplayName: 'تاريخ الفاتورة',
        DisplayNameEn: 'Invoice Date',
        type: 'datetime',
      },
    ],
  },
 
]
