var Information_Form = [
  {
    label: 'بيانات المعلم',
    labelEn: 'Milestone Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Title',
        DisplayName: 'رمز المعلم',
        DisplayNameEn: 'Milestone Code',
        type: 'string',
      },
      {
        InternalName: 'Name',
        DisplayName: 'اسم المعلم',
        DisplayNameEn: 'Name',
        type: 'string',
      },
      // {
      //   InternalName: 'Weight',
      //   DisplayNameEn: 'Weight',
      //   DisplayName: 'الوزن المكافئ للإنجاز %',
      //   type: 'floatpercentage',
      // },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن',
        DisplayNameEn: 'Weight',
        type: 'floatpercentage',
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
      },
      {
        InternalName: 'PlannedDate',
        DisplayName: 'تاريخ الاكتمال المخطط',
        DisplayNameEn: 'Planned Finish Date',
        type: 'datetime',
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
        DisplayNameEn: 'Deliverables',
        type: 'multiline',
        maxchar: 5000,
      },
      {
        InternalName: 'Description',
        DisplayName: 'الوصف',
        DisplayNameEn: 'Description',
        type: 'multiline',
        maxchar: 5000,
      },
      // {
      //   InternalName: 'Status',
      //   DisplayName: 'الحالة',
      //   DisplayNameEn: 'Status',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       { display: 'onschedule', value: 'onschedule' },
      //       { display: 'completed', value: 'completed' },
      //       { display: 'late', value: 'late' },
      //     ],
      //   },
      // },
      {
        InternalName: 'RelatedInitiativeMilestone',
        DisplayName: 'معلم المبادرة المرتبط',
        DisplayNameEn: 'Related Initiative Milestone',
        type: 'lookup',
        // source: 'InitiativeMilestones',
        source: 'Milestones',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'Delivered',
        DisplayName: 'تم التسليم',
        DisplayNameEn: 'Delivered',
        targetfieldrequired: 'getFile', // to make the attache required on yes
        targetfield: 'Status',
        targetfieldvalue: 'completed',
        type: 'yesnoradio',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
          ],
        },
      },
      {
        InternalName: 'ShowInProgramReport',
        DisplayName: 'اظهار في التقرير',
        DisplayNameEn: 'Show In Report',
        type: 'radio',
      },
      // {
      //     "InternalName": "SupportDocumentsDescription",
      //     "DisplayNameEn": "Support Documents Description",
      //     "DisplayName": "وصف الوثائق الداعمة",
      //     "type": "multiline",
      //     "maxchar": "500",
      // }
    ],
  },
  {
    label: 'الوثائق داعمة',
    labelEn: 'Supporting Documents',
    description: '',
    descriptionEn: '',
    subFields: [
      {
        InternalName: 'SupportDocumentsDescription',
        DisplayNameEn: 'Support Documents Description',
        DisplayName: 'وصف الوثائق الداعمة',
        type: 'multiline',
        maxchar: '500',
      }
    ],
  },
  // {
  //   label: 'وثائق داعمة',
  //   labelEn: 'Supporting Documents',
  //   description: 'التفاصيل',
  //   descriptionEn: 'Details',
  //   subFields: [
  //     {
  //       InternalName: 'Attachment',
  //       DisplayName: 'المرفقات',
  //       DisplayNameEn: 'Attachment',
  //       type: 'file',
  //       withAddBtn: 'true',
  //     },
  //   ],
  // },
  
  // {
  //   label: 'وثائق داعمة',
  //   labelEn: 'Supporting Documents',
  //   description: 'التفاصيل',
  //   descriptionEn: 'Details',
  //   subFields: [
  //     {
  //       InternalName: 'SupportDocumentsDescription',
  //       DisplayNameEn: 'Support Documents Description',
  //       DisplayName: 'وصف الوثائق الداعمة',
  //       type: 'multiline',
  //       maxchar: '500',
  //     },
  //   ]
  // }
]
