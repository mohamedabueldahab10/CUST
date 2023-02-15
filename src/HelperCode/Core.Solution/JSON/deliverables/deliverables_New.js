var Information_Form = [
  {
    label: 'بيانات المخرج',
    labelEn: 'Delivrable Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayName":"رمز المخرج",
      //     "type":"string",
      //     "validation": "required"
      // },
      {
        InternalName: 'Name',
        DisplayName: 'اسم المخرج',
        DisplayNameEn: 'Deliverable Name',
        type: 'string',
        validation: 'required',
      },
      {
        InternalName: 'Description',
        DisplayName: 'الوصف',
        DisplayNameEn: 'Description',
        type: 'multiline',
        maxchar: 5000,
      },
      // {
      //     "InternalName": "Quantity",
      //     "DisplayName":"الكمية",
      //     "type":"float"
      // },
      {
        InternalName: 'Amount',
        DisplayName: 'القيمة',
        DisplayNameEn: 'Amount',
        dontSubmit: true,
        type: 'percentbyrelatedparent',
        listname: 'Projects',
        parentinternalname: 'ActualBudget',
        targetelement: 'Weight',
        validation: 'required',
      },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن(%)',
        DisplayNameEn: 'Weight (%)',
        type: 'weightfloatpercentage',
        listname: 'Deliverables',
        targetcode: 'ProjectCode',
        targetelement: 'Weight',
        seconedtarget: 'Amount',
        // "state":"disabled",
        validation: 'required',
      },
      // {
      //   InternalName: 'Status',
      //   DisplayName: 'الحالة',
      //   DisplayNameEn: 'Status',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       { display: 'ontrack', value: 'ontrack' },
      //       { display: 'late', value: 'late' },
      //       { display: 'completed', value: 'completed' },
      //     ],
      //   },
      // },
      // {
      //   InternalName: 'ActualDate',
      //   DisplayName: 'تاريخ الاكتمال الفعلي',
      //   DisplayNameEn: 'Actual Date',
      //   type: 'datetime',
      //   max: 'today',
      //   validation: 'required',
      // },
      // {
      //   InternalName: 'DeliveredDate',
      //   DisplayName: 'تاريخ التسليم',
      //   DisplayNameEn: 'Delivered Date',
      //   type: 'datetime',
      //   max: 'today',
      //   validation: 'required',
      // },
      {
        InternalName: 'PlannedFinishDate',
        DisplayName: 'تاريخ الانتهاء المخطط',
        DisplayNameEn: 'Planned Finish Date',
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Projects',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
        // min: 'PlannedStartDate',
        validation: 'required',
      },
      // {
      //   InternalName: 'Delivered',
      //   DisplayName: 'تم التسليم',
      //   DisplayNameEn: 'Delivered',
      //   type: 'yesnoradio',
      //   targetfield: 'Status',
      //   targetfieldvalue: 'completed',
      //   options: {
      //     choices: [
      //       { display: 'yes', value: 'yes' },
      //       { display: 'no', value: 'no' },
      //     ],
      //   },
      // },
      {
        InternalName: 'AcceptanceCriteria',
        DisplayName: 'معايير قبول المخرج',
        DisplayNameEn: 'Acceptance Criteria',
        // type: 'string',
        type: 'multiline',
      },
      // {
      //     "InternalName": "PlannedStartDate",
      //     "DisplayName": "تاريخ البدء المخطط",
      //     "DisplayNameEn": "Planned Start Date",
      //     "type": "datetime",
      //     "max": "PlannedFinishDate",
      //     "validation": "required"
      // },
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
      //     "type": "datetime",
      //     "validation": "required"
      // },
      // {
      //     "InternalName": "StartDate",
      //     "DisplayName": "تاريخ البدءالفعلي",
      //     "DisplayNameEn": "Actual Start Date",
      //     "type": "datetime",
      //     "max": "today"
      // },
      // {
      //     "InternalName": "FinishDate",
      //     "DisplayName": "تاريخ الانتهاء الفعلي",
      //     "DisplayNameEn": "Actual Finish Date",
      //     "type": "datetime",
      //     "min": "StartDate",
      //     "max": "today"
      // },
      // {
      //     "InternalName": "DeliveredDate",
      //     "DisplayName":"تاريخ التسليم",
      // "DisplayNameEn": "Delivered Date",
      //     "type":"datetime"
      // },

      // {
      //     "InternalName": "Delivered",
      //     "DisplayName":"تم التسليم",
      // "DisplayNameEn": "Delivered",
      //     "type":"radio",
      //             options:{
      //         choices:[
      //             'لا','نعم'
      //           ]
      //     }

      // },
      {
        InternalName: 'Comments',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,
      },
      {
        //tried
        InternalName: 'RelatedInitiativeDeliverable',
        DisplayName: 'مخرج المبادرة المرتبط',
        DisplayNameEn: 'Related Initiative Deliverable',
        type: 'lookuptoparentchild',
        parentlist: 'Projects', //parent list name
        parentinternalname: 'RelatedInitiative', // internal name in parent list
        source: 'InitiativeDeliverables', // target list
        sourceinternalname: 'InitiativeCode', // column in target list
        Dispfieldkey: 'Name', //display in dropdown
        valfieldkey: 'Title', // value in dropdown
      },
      // {
      //   InternalName: 'RelatedInitiativeDeliverable',
      //   DisplayNameEn: 'Related Initiative Deliverable',
      //   DisplayName:'مخرج المبادرة المرتبط',
      //   type: 'lookup',
      //   source: 'InitiativeDeliverables',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      // },

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
    ],
  },
  {
    label: 'وثائق داعمة',
    labelEn: 'Supporting Documents',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'getfile',
        DisplayName: 'مرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        withAddBtn: 'true',
        validation: 'required',
      },
    ],
  },
]
