var Information_Form = [
  // {
  //     label: 'بيانات المبادرة',
  //     labelEn: 'Basic Information',
  //     description: "معلومات أساسية ",
  //     descriptionEn: "Details",
  //     sectiontype: "master",
  //     targetlist: "Initiatives",
  //     subFields: [
  //         {
  //             "InternalName": "Title",
  //             "DisplayName": "رمز المبادرة ",
  //             "DisplayNameEn": "Code ",
  //             "type": "string",
  //             // "state":"disabled"

  //         },
  //         {
  //             "InternalName": "Name",
  //             "DisplayNameEn": "Name",
  //             "DisplayName": "اسم المبادرة",
  //             "type": "string",
  //             "maxchar": "250"

  //         },
  //         {
  //             "InternalName": "InitiativeOwner",
  //             "DisplayNameEn": "Initiative Owner",
  //             "DisplayName": " اسم مالك المبادرة ",
  //             "type": "picker"
  //         },
  //         {
  //             "InternalName": "InitiativePM",
  //             "DisplayNameEn": "Initiative PM",
  //             "DisplayName": " اسم مدير المبادرة ",
  //             "type": "picker"
  //         },

  //         {
  //             "InternalName": "InitiativeBudget",
  //             "DisplayName": "ميزانية المبادرة ",
  //             "DisplayNameEn": "InitiativeBudget",
  //             "type": "float",
  //         },
  //         {
  //             "InternalName": "RelatedStrategyObjective",
  //             "DisplayNameEn": "Objective Name",
  //             "DisplayName": "الهدف الاستراتيجي",
  //             "type": "lookup",
  //             "source": "SOs",
  //             "Dispfieldkey": "Name",
  //             "valfieldkey": "Title"
  //         },

  //     ]
  // },
  {
    label: 'مسوغات الإغلاق ',
    labelEn: ' Closure Justifications',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    // sectiontype: "master",
    // targetlist: "Closure Form",
    subFields: [
      {
        InternalName: 'ClosureReasons',
        DisplayName: 'أسباب إغلاق المبادرة ',
        DisplayNameEn: 'Reasons Behind Closure ',
				validation: "required",
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'initiativecancelled', //no
              value: 'initiativecancelled',
            },
            {
              display: 'initiativecompleted',
              value: 'initiativecompleted',
            },
            {
              display: 'ownerchange',
              value: 'ownerchange',
            },
            {
              display: 'others',
              value: 'others',
            },
          ],
        },
      },
      {
        InternalName: 'ClosureReasonsDesc',
        DisplayNameEn: 'Closure Reasons Desc',
        DisplayName: 'أسباب إلغاء المبادرة (في حالة الإلغاء)',
        type: 'multiline',
        maxchar: 5000,    
				validation: "required",    
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",

      },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Initiative Completion Check list',
        DisplayName: 'قائمة تحقق اكتمال المبادرة  ',
        type: 'multiline',
        maxchar: 5000,        
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
				validation: "required",
      },
    ],
  },
  {
    label: 'قائمة التحقق للمبادرة ',
    labelEn: '  Initiative Check List',
    description: 'حالة اكتمال المشاريع ',
    descriptionEn: 'Projects Completion Status',
    subFields: [
      {
        DisplayName: ' اكتمال كافة المنافع',
        DisplayNameEn: 'Completion of all benefits',
        InternalName: 'InitiativeDecision1',
        // "type": "dropdownValues",
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
            // {
            //     display: 'noneed',
            //     value: 'noneed'
            // }
          ],
        },
      },
      {
        InternalName: 'InitiativeComment1',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        DisplayName: ' اكتمال كافة المشاريع',
        DisplayNameEn: 'Completion of all Projects',
        InternalName: 'InitiativeDecision2',
        // "type": "dropdownValues",
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
            // {
            //     display: 'noneed',
            //     value: 'noneed'
            // }
          ],
        },
      },
      {
        InternalName: 'InitiativeComment2',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        DisplayName: ' اكتمال كافة المخرجات',
        DisplayNameEn: 'Completion of all Deliverables',
        InternalName: 'InitiativeDecision3',
        // "type": "dropdownValues",
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
            // {
            //     display: 'noneed',
            //     value: 'noneed'
            // }
          ],
        },
      },
      {
        InternalName: 'InitiativeComment3',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        DisplayName: ' اكتمال كافة المعالم',
        DisplayNameEn: 'Completion of all Milestones',
        InternalName: 'InitiativeDecision4',
        // "type": "dropdownValues",
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
            // {
            //     display: 'noneed',
            //     value: 'noneed'
            // }
          ],
        },
      },
      {
        InternalName: 'InitiativeComment4',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        DisplayName: 'اعتماد كافة وثائق إغلاق المبادرة',
        DisplayNameEn: 'Approval of all initiative closing documents',
        InternalName: 'InitiativeDecision5',
        // "type": "dropdownValues",
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
            // {
            //     display: 'noneed',
            //     value: 'noneed'
            // }
          ],
        },
      },
      {
        InternalName: 'InitiativeComment5',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        DisplayName: 'أرشفة كافة الوثائق الداعمة لمنافع المبادرة المتحققة',
        DisplayNameEn:
          'Archive all documents supporting the benefits of the realized initiative',
        InternalName: 'InitiativeDecision6',
        // "type": "dropdownValues",
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
            // {
            //     display: 'noneed',
            //     value: 'noneed'
            // }
          ],
        },
      },
      {
        InternalName: 'InitiativeComment6',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        DisplayName: 'أرشفة كافة الوثائق الداعمة لمخرجات المبادرة المتحققة',
        DisplayNameEn:
          'Archive all documents supporting the achieved deliverables of the initiative',
        InternalName: 'InitiativeDecision7',
        // "type": "dropdownValues",
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
            // {
            //     display: 'noneed',
            //     value: 'noneed'
            // }
          ],
        },
      },
      {
        InternalName: 'InitiativeComment7',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        DisplayName: 'أرشفة كافة الوثائق الداعمة لمعالم المبادرة المتحققة',
        DisplayNameEn:
          'Archive all documents supporting the milestones of the achieved initiative',
        InternalName: 'InitiativeDecision8',
        // "type": "dropdownValues",
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
            // {
            //     display: 'noneed',
            //     value: 'noneed'
            // }
          ],
        },
      },
      {
        InternalName: 'InitiativeComment8',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        InternalName: 'Analyze',
        DisplayName: 'تحليل تحقيق أهداف منافع المبادرة',
        DisplayNameEn: 'Objectives and Benefits Realization Analysis',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
    ],
  },
  // {
  //   label: 'قائمة المنافع ',
  //   labelEn: 'Benefits List',
  //   description: 'حالة تحقق المنافع ',
  //   descriptionEn: 'Benefits Realization Status',
  //   sectiontype: 'master',
  //   targetlist: 'Benefits',
  //   subFields: [
  //     {
  //       InternalName: 'Name',
  //       DisplayName: 'المنفعة',
  //       DisplayNameEn: 'Name',
  //       type: 'string',
  //     },
  //     {
  //       InternalName: 'KPIs',
  //       DisplayName: 'مؤشرات الأداء',
  //       DisplayNameEn: 'KPIs',
  //       type: 'string',
  //     },
  //     {
  //       InternalName: 'Target',
  //       DisplayName: 'القيمة المستهدفة',
  //       DisplayNameEn: 'Target',
  //       type: 'float',
  //     },
  //     {
  //       InternalName: 'Actual',
  //       DisplayName: 'القيمة الفعلية',
  //       DisplayNameEn: 'Actual',
  //       type: 'float',
  //     },
  //     {
  //       InternalName: 'Comments',
  //       DisplayName: 'الملاحظات',
  //       DisplayNameEn: 'Comments',
  //       type: 'string',
  //     },
  //   ],
  // },
  // {
  //   label: 'الدروس المستفادة',
  //   labelEn: 'Lessons Learned',
  //   description: '  ',
  //   descriptionEn: '  ',
  //   sectiontype: 'master',
  //   targetlist: 'Lessons Learned',
  //   subFields: [
  //     {
  //       InternalName: 'Name',
  //       DisplayName: 'الدرس المستفاد',
  //       DisplayNameEn: 'Name',
  //       type: 'string',
  //     },

  //     {
  //       InternalName: 'Classification',
  //       DisplayName: 'التصنيف',
  //       DisplayNameEn: 'Classification',
  //       type: 'dropdownValues',
  //       options: {
  //         choices: [
  //           {
  //             display: 'domainmanagement', //no
  //             value: 'domainmanagement',
  //           },
  //           {
  //             display: 'schedepm',
  //             value: 'schedepm',
  //           },
  //           {
  //             display: 'budget',
  //             value: 'budget',
  //           },
  //           {
  //             display: 'concerned', //no
  //             value: 'concerned',
  //           },
  //           {
  //             display: 'communication', //no
  //             value: 'communication',
  //           },
  //           {
  //             display: 'purchaseplan', //no
  //             value: 'purchaseplan',
  //           },
  //           {
  //             display: 'change', //no
  //             value: 'change',
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       InternalName: 'Types',
  //       DisplayName: 'النوع',
  //       DisplayNameEn: 'Types',
  //       type: 'dropdownValues',
  //       options: {
  //         choices: [
  //           {
  //             display: 'strongpoint', //no
  //             value: 'strongpoint',
  //           },
  //           {
  //             display: 'improvementopportunity',
  //             value: 'improvementopportunity',
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       InternalName: 'Comments',
  //       DisplayName: 'ملاحظات إضافية',
  //       DisplayNameEn: 'Comments',
  //       type: 'string',
  //     },
  //   ],
  // },
  // {
  //   label: 'قائمة المشاريع ',
  //   labelEn: 'Projects List',
  //   description: '  ',
  //   descriptionEn: '  ',
  //   sectiontype: 'master',
  //   targetlist: 'Projects',
  //   subFields: [
  //     {
  //       InternalName: 'Name',
  //       DisplayName: 'المشروع',
  //       DisplayNameEn: 'Name',
  //       type: 'string',
  //     },
  //     {
  //       InternalName: 'Completed',
  //       DisplayName: 'حالة الاكتمال',
  //       DisplayNameEn: 'Completed',
  //       type: 'dropdownValues',
  //       options: {
  //         choices: [
  //           {
  //             display: 'yes',
  //             value: 'yes',
  //           },
  //           {
  //             display: 'no',
  //             value: 'no',
  //           },
  //           {
  //             display: 'noneed',
  //             value: 'noneed',
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       InternalName: 'Comments',
  //       DisplayName: 'الملاحظات',
  //       DisplayNameEn: 'Comments',
  //       type: 'string',
  //     },
  //   ],
  // },
  {
    label: 'الوثائق الداعمة',
    labelEn: 'Supporting Documents',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'getfile',
        DisplayName: 'المرفقات',
         DisplayNameEn: 'Attachments',
        type: 'file',
        withAddBtn: 'true',
      },
    ],
  },
]
