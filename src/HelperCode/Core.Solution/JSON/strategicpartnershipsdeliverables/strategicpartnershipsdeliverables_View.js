var Information_Form = [{
  label: 'بيانات المخرج',
  labelEn: 'Delivrable Data',
  description: "التفاصيل",
  descriptionEn: "Details",
  subFields: [
    // {
    //     "InternalName": "Title",
    //     "DisplayName":"رمز المخرج",
    // "DisplayNameEn": "Deliverable Title",

    //     "type":"string",
    //     "validation": "required"
    // },
    {
      "InternalName": "Name",
      "DisplayName": "اسم المخرج",
      "DisplayNameEn": "Name",
      "type": "string",
      "validation": "required"
    },
    {
      "InternalName": "Description",
      "DisplayName": "الوصف",
      "DisplayNameEn": "Description",
      "type": "multiline",
      "maxchar": 5000,
    },

    {
      "InternalName": "Weight",
      "DisplayName": "الوزن(%)",
      "DisplayNameEn": "Weight (%)",
      "type": "float",
    },
    // {
    //   "InternalName": "Status",
    //   "DisplayName": "الحالة",
    //   "DisplayNameEn": "Status",
    //   "type": "dropdownValues",
    //   options: {
    //     choices: [
    //       { display: 'workinprogress', value: 'workinprogress' },
    //       { display: 'completed', value: 'completed' }
    //     ]
    //   }
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
    //   validation: 'required',
    // },
   
    {
      "InternalName": "PlannedFinishDate",
      "DisplayName": "تاريخ الانتهاء المخطط",
      "DisplayNameEn": "Planned Finish Date",
      "type": "datetime",
      // type: 'datetimetoparent',
      // listname: 'Projects',
      // startinternalname: 'BaselineStartDate',
      // endinternalname: 'BaselineFinishDate',
      // // "min": "PlannedStartDate",
      // "validation": "required",
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
    //     "type": "datetime",
    //     "validation": "required"
    // },
    // {
    //     "InternalName": "StartDate",
    //     "DisplayName": "تاريخ البدءالفعلي",
    //     "DisplayNameEn": "Actual Start Date",
    //     "type": "datetime",
    //     "max":"today"
    // },
    // {
    //     "InternalName": "FinishDate",
    //     "DisplayName": "تاريخ الانتهاء الفعلي",
    //     "DisplayNameEn": "Actual Finish Date",
    //     "type": "datetime",
    //     "min": "StartDate",
    //     "max":"today"
    // },
   
    {
      "InternalName": "Delivered",
      "DisplayName": "مكتمل",
      "DisplayNameEn": "Completed",
      "targetfieldrequired":"getFile", // to make the attache required on yes
      "targetfield":"Status",
      "targetfieldvalue": "completed",
      "type": "yesnoradio",
      options: {
        choices: [
          { display: 'yes', value: 'yes' },
          { display: 'no', value: 'no' }
        ]
      }

    },
    {
      "InternalName": "DeliveredDate",
      "DisplayName": "تاريخ التسليم",
      "DisplayNameEn": "Delivered Date",
      "type": "datetime",
      "max": "today",
      // "validation": "required",
    },
    {
      "InternalName": "AcceptanceCriteria",
      "DisplayName": "معايير قبول المخرج",
      "DisplayNameEn": "Acceptance Criteria",
      "type": "multiline"
    },
    {
      "InternalName": "Comments",
      "DisplayName": "الملاحظات",
      "DisplayNameEn": "Comments",
      "type": "multiline",
      "maxchar": 5000,
    },
    // {
    //   "InternalName": "RelatedInitiativeDeliverable",
    //   "DisplayNameEn": "Related Initiative Deliverable",
    //   "DisplayName": "مخرج المبادرة المرتبط",
    //   "type": "lookup",
    //   "source": "InitiativeDeliverables",
    //   "Dispfieldkey": "Name",
    //   "valfieldkey": "Title",
    // },
    // { //tried
    //   InternalName: 'RelatedInitiativeDeliverable',
    //   DisplayName: 'مخرج المبادرة المرتبط',
    //   DisplayNameEn: 'Related Initiative Deliverable',
    //   type: 'lookuptoparentchild',
    //   parentlist: 'Projects', //parent list name
    //   parentinternalname: 'RelatedInitiative', // internal name in parent list
    //   source: 'InitiativeDeliverables', // target list
    //   sourceinternalname: 'InitiativeCode', // column in target list
    //   Dispfieldkey: 'Name', //display in dropdown
    //   valfieldkey: 'Title', // value in dropdown
    // },
    {
      "InternalName": "ShowInProgramReport",
      "DisplayName": "اظهار في التقرير",
      "DisplayNameEn": "Show In Program Report",
      "type": "yesnoradio",
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

  ]
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
// },
];