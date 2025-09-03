var Information_Form = [
  {
    label: 'بيانات المخرج',
    labelEn: 'Delivrable Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    workflowSetValues: [
      //Project Deliverables
      //VRO
      { fieldName: 'Status', value: 'completed', stages:["VROProjDeliverable02"] },
      //EPMO
      { fieldName: 'Status', value: 'completed', stages:["EPMOProjDeliverable02"] },
      //LMS
      { fieldName: 'Status', value: 'completed', stages:["LMSProjDeliverable02"] },
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
        InternalName: 'Weight',
        DisplayName: 'الوزن',
        DisplayNameEn: 'Weight',
        type: 'floatpercentage',
      },
        {
          "InternalName": "Amount",
          "DisplayName": "القيمة",
          "DisplayNameEn": "Amount",
          // dontSubmit: true,
          "type": "percentbyrelatedparent",
          "listname":"Projects",
          "parentinternalname":"ActualBudget",
          "targetelement":"Weight",
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
        InternalName: 'ExpenseQuantity',
        DisplayNameEn: 'Expense Quantity',
        DisplayName: 'الكمية المنصرفه',
        type: "number",
        listname:"COC",
        parentinternalname :"Quantity",
        // type: 'float',
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
      // {
      //   InternalName: 'Status',
      //   DisplayName: 'الحالة',
      //   DisplayNameEn: 'Status',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       {
      //         display: 'workinprogress',
      //         value: 'workinprogress',
      //       },
      //       {
      //         display: 'completed',
      //         value: 'completed',
      //       },
      //     ],
      //   },
      // },
      // {
      //     "InternalName": "Quantity",
      //     "DisplayName":"الكمية",
      //     "type":"float"
      // },
      // {
      //     "InternalName": "PlannedStartDate",
      //     "DisplayName": "تاريخ البدء المخطط",
      //     "DisplayNameEn": "Planned Start Date",
      //     "type": "datetime",
      //     "max": "PlannedFinishDate"
      // },
      // {
      //   InternalName: 'ActualDate',
      //   DisplayName: 'تاريخ الاكتمال الفعلي',
      //   DisplayNameEn: 'Actual Date',
      //   type: 'datetime',
      //   max: 'today',
      // },
      {
        InternalName: 'PlannedFinishDate',
        DisplayName: 'تاريخ الانتهاء المخطط',
        DisplayNameEn: 'Planned Finish Date',
        type: 'datetime',
        // type: 'datetimetoparent',
        // listname: 'Projects',
        // startinternalname: 'BaselineStartDate',
        // endinternalname: 'BaselineFinishDate',
        // "min": "PlannedStartDate"
      },
      // {
      //     "InternalName": "SupplyDate",
      //     "DisplayName": "تاريخ التوريد",
      //     "DisplayNameEn": "Supply Date",
      //     "type": "datetime"
      // },
      // {
      //     "InternalName": "CommittedDate",
      //     "DisplayName": "تاريخ الالتزام",
      //     "DisplayNameEn": "Committed Date",
      //     "type": "datetime"
      // },
      // {
      //     "InternalName": "StartDate",
      //     "DisplayName": "تاريخ البدءالفعلي",
      //     "DisplayNameEn": "Start Date",
      //     "type": "datetime",
      //     "max":"today"
      // },
      // {
      //     "InternalName": "FinishDate",
      //     "DisplayName": "تاريخ الانتهاء الفعلي",
      //     "DisplayNameEn": "Finish Date",
      //     "type": "datetime",
      //     "min": "StartDate",
      //     "max":"today"
      // },
      {
        InternalName: 'Delivered',
        DisplayName: 'مكتمل',
        DisplayNameEn: 'Completed',
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
      {
        InternalName: 'DeliveredDate',
        DisplayName: 'تاريخ التسليم',
        DisplayNameEn: 'Delivered Date',
        type: 'datetime',
      },
      {
        InternalName: 'AcceptanceCriteria',
        DisplayName: 'معايير قبول المخرج',
        DisplayNameEn: 'Acceptance Criteria',
        type: 'multiline',
      },
      {
        InternalName: 'Comments',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
      },
      {
        InternalName: 'RelatedInitiativeDeliverable',
        DisplayNameEn: 'Related Initiative Deliverable',
        DisplayName:'مخرج المبادرة المرتبط',
        type: 'lookup',
        source: 'InitiativeDeliverables',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'ShowInProgramReport',
        DisplayName: 'اظهار في التقرير',
        DisplayNameEn: 'Show In Program Report',
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
  // {
  //   label: 'وثائق داعمة',
  //   labelEn: 'Supporting Documents',
  //   description: 'التفاصيل',
  //   descriptionEn: 'Details',
  //   subFields: [
  //     {
  //       InternalName: 'getfile',
  //       DisplayName: 'مرفقات',
  //       DisplayNameEn: 'Attachments',
  //       type: 'file',
  //       withAddBtn: 'true',
  //       // "validation": "required",
  //     },
  //   ],
  // }
]
