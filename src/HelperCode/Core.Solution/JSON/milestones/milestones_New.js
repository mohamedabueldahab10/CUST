var Information_Form = [
  {
    label: 'بيانات المعلم',
    labelEn: 'Milestone Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayName":"رمز المعلم",
      //"DisplayNameEn": "Milestone Title",
      //     "type":"string",
      //     "validation": "required"
      // },
      {
        InternalName: 'Name',
        DisplayName: 'اسم المعلم',
        DisplayNameEn: 'Name',
        type: 'string',
        validation: 'required',
      },
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
        DisplayNameEn: 'Weight',
        DisplayName: 'الوزن المكافئ للإنجاز %',
        // type: 'floatpercentage',
        type: 'weightfloatpercentage',
        listname: 'Milestones',
        targetcode: 'ProjectCode',
        targetelement: 'Weight',
        seconedtarget: 'Amount',
        validation: 'required',
        // "state": "disabled",
        // dynamic: "Initiative"
      },
      {
        InternalName: 'PlannedDate',
        DisplayName: 'تاريخ الاكتمال المخطط',
        DisplayNameEn: 'Planned Finish Date',
        type: 'datetime',
        validation: 'required',
      },
      {
        InternalName: 'ActualDate',
        DisplayName: 'تاريخ الاكتمال الفعلي',
        DisplayNameEn: 'Actual Date',
        type: 'datetime',
        max: 'today',
      },
      // {
      //   InternalName: 'CommittedDate',
      //   DisplayName: 'تاريخ الالتزام',
      //   DisplayNameEn: 'Committed Date',
      //   type: 'datetime',
      // },
      {
        InternalName: 'Deliverables',
        DisplayName: 'المخرجات',
        DisplayNameEn: 'Deliverables Completed',
        type: 'multiline',
        maxchar: 5000,
      },
      //   {
      //     InternalName: 'Status',
      //     DisplayName: 'الحالة',
      //     DisplayNameEn: 'Status',
      //     type: 'dropdownValues',
      //     options: {
      //       choices: [
      //         {
      //           display: 'workisunderway',
      //           value: 'workisunderway',
      //         },
      //         {
      //           display: 'complete',
      //           value: 'complete',
      //         },
      //       ],
      //     },
      //   },
      {
        InternalName: 'Description',
        DisplayName: 'الوصف',
        DisplayNameEn: 'Description',
        type: 'multiline',
        maxchar: 5000,
      },
      {
        InternalName: 'Status',
        DisplayName: 'الحالة',
        DisplayNameEn: 'Status',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'onschedule', value: 'onschedule' },
            { display: 'completed', value: 'completed' },
            { display: 'late', value: 'late' },
          ],
        },
      },
      // {
      //   InternalName: 'RelatedInitiativeMilestone',
      //   DisplayName: 'معلم المبادرة المرتبط',
      //   DisplayNameEn: 'Related Initiative Milestone',
      //   type: 'lookup',
      //   source: 'InitiativeMilestones',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      // },
      {
        InternalName: 'RelatedInitiativeMilestone',
        DisplayName: 'معلم المبادرة المرتبط',
        DisplayNameEn: 'Related Initiative Milestone',
        type: 'lookuptoparentchild',
        parentlist: 'Projects', //parent list name
        parentinternalname: 'RelatedInitiative', // internal name in parent list
        source: 'InitiativeMilestones', // target list
        sourceinternalname: 'InitiativeCode', // column in target list
        Dispfieldkey: 'Name', //display in dropdown
        valfieldkey: 'Title', // value in dropdown
      },
      //   {
      //     InternalName: 'SupportDocumentsDescription',
      //     DisplayNameEn: 'Support Documents Description',
      //     DisplayName: 'وصف الوثائق الداعمة',
      //     type: 'multiline',
      //     maxchar: '500',
      //   },
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
