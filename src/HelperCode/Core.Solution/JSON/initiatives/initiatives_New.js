var Information_Form = [
  {
    label: 'المبادرات',
    labelEn: 'Initiative Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayName":"رمز المبادرة ",
      //     "type":"string" ,
      //     "state":"disabled"

      // },
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'اسم المبادرة',
        type: 'string',
        maxchar: '250',
        validation: 'required',
      },
      {
        InternalName: 'OfficialCode',
        DisplayNameEn: 'Official Code',
        DisplayName: 'رمز المبادرة الرسمي',
        type: 'string',
      },
      // {
      //   InternalName: 'Types',
      //   DisplayNameEn: 'Types',
      //   DisplayName: 'النوع',
      //   validation: 'required',
      //   toggleValues: [
      //     { value: 'vision', fields: ['RelatedStrategyObjective'] }, //we can put more than 1  field
      //   ],
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       {
      //         display: 'vision',
      //         value: 'vision',
      //         roles: ['Administrator', 'VROE', 'VROP'],
      //       },
      //       {
      //         display: 'strategically',
      //         value: 'strategically',
      //         roles: ['Administrator', 'EPMO'],
      //       },
      //       {
      //         display: 'lms',
      //         value: 'lms',
      //         roles: ['Administrator', 'LMSE', 'LMSP'],
      //       },
      //       // { display: 'others', value: 'others' },
      //     ],
      //   },
      // },
      {
        InternalName: 'RelatedStrategy',
        DisplayNameEn: 'Related Strategy',
        DisplayName: 'الاستراتيجية المرتبطة',
        type: 'lookup',
        source: 'GoalStrategy',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // dynamically affected by other dropdown
        dynamic: 'parent', //"parentInternalName" or "parent" // if parent it will affect other fields
        //in case not parent add below attrs
        //role access
        accessFilter: [
          {
            role: 'VROE',
            conditions: [
              {
                field: 'Types',
                type: 'Choice',
                values: ['vision'],
              },
            ],
          },
          {
            role: 'VROP',
            conditions: [
              {
                field: 'Types',
                type: 'Choice',
                values: ['vision'],
              },
            ],
          },
          {
            role: 'LMSE',
            conditions: [
              {
                field: 'Types',
                type: 'Choice',
                values: ['lms'],
              },
            ],
          },
          {
            role: 'LMSP',
            conditions: [
              {
                field: 'Types',
                type: 'Choice',
                values: ['lms'],
              },
            ],
          },
        ],
      },
      {
        InternalName: 'RelatedObjectiveLevel',
        DisplayNameEn: 'Related Objective Level',
        DisplayName: 'مستوى الهدف المرتبط',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'objl1',
              value: 'objl1',
            },
            {
              display: 'objl2',
              value: 'objl2',
            },
            {
              display: 'objl3',
              value: 'objl3',
            },
          ],
        },
        validation: 'required',
      },
      {
        InternalName: 'RelatedObjective',
        DisplayNameEn: 'Related Objective',
        DisplayName: 'الهدف المرتبط',
        type: 'lookup',
        source: 'SOs',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // "state": "disabled"
        // "validation":"required"
        dynamic: 'RelatedStrategy',
        filterField: 'RelatedStrategy',
        filterFieldType: 'Text',
        //
        accessFilter: [
          {
            role: 'VROE',
            conditions: [
              {
                field: 'Types',
                type: 'Text',
                values: ['vision'],
              },
            ],
          },
          {
            role: 'VROP',
            conditions: [
              {
                field: 'Types',
                type: 'Text',
                values: ['vision'],
              },
            ],
          },
          {
            role: 'LMSE',
            conditions: [
              {
                field: 'Types',
                type: 'Text',
                values: ['lms'],
              },
            ],
          },
          {
            role: 'LMSP',
            conditions: [
              {
                field: 'Types',
                type: 'Text',
                values: ['lms'],
              },
            ],
          },
        ],
      },
      {
        InternalName: 'RelatedProgram',
        DisplayNameEn: 'Related Program',
        DisplayName: 'اسم البرنامج التابع له',
        type: 'string',
        // "source": "Instruments",
        // "Dispfieldkey": "Title",
        // "valfieldkey": "Title"
      },
      {
        InternalName: 'InitiativeOwner',
        DisplayNameEn: 'Initiative Owner',
        DisplayName: 'مالك المبادرة ',
        type: 'picker',
        validation: 'required',
      },
      {
        InternalName: 'InitiativeActualOwner',
        DisplayNameEn: 'Initiative Actual Owner',
        DisplayName: 'المالك الفعلي للمبادرة',
        type: 'string',
        validation: 'required',
      },
      {
        InternalName: 'InitiativePM',
        DisplayNameEn: 'Initiative manager',
        DisplayName: 'مدير المبادرة ',
        type: 'picker',
        validation: 'required',
      },
      {
        InternalName: 'Sector',
        DisplayName: 'القطاع',
        DisplayNameEn: 'Sector',
        type: 'lookup',
        validation: 'required',
        //from other list:
        source: 'Internal Entities',
        isSector: 'True',
        EntityType: 'Sector',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'SubSector',
        DisplayName: 'الوكالة/الجهة',
        DisplayNameEn: 'Deputyship',
        type: 'lookup',
        //from other list:
        source: 'Internal Entities',
        isSector: 'True',
        EntityType: 'Department',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        // "state": "disabled"
        validation: 'required',
      },
      {
        InternalName: 'StartDate',
        DisplayName: 'تاريخ بداية المبادرة ',
        DisplayNameEn: 'Start Date',
        type: 'datetime',
        max: 'FinishDate',
        validation: 'required'
      },
      {
        InternalName: 'FinishDate',
        DisplayName: 'تاريخ نهاية المبادرة ',
        DisplayNameEn: 'Finish Date',
        type: 'datetime',
        min: 'StartDate',
        validation: 'required'
      },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف المبادرة',
        type: 'multiline',
        maxchar: '500',
        // "validation": "required"
      },
      {
        InternalName: 'Classification',
        DisplayName: 'تصنيف المبادرة',
        DisplayNameEn: 'Classification',
        type: 'dropdownValues',
        options: {
          choices: [
            // { value: 'notstarted', display: 'notstarted' },
            // { value: 'closureinitiative', display: 'closureinitiative' }
            { value: 'transformativeproject', display: 'transformativeproject' },
            { value: 'operationalproject', display: 'operationalproject' }
          ],
        },
      },
      {
        InternalName: 'ExpenseStartDate',
        DisplayName: 'تاريخ بداية الصرف',
        DisplayNameEn: 'Expense Start Date',
        type: 'datetime',
      },
      // {
      //     "InternalName": "RelatedKPI",
      //     "DisplayNameEn": "Related KPI",
      //     "DisplayName": "المؤشر الفرعي المرتبط",
      //     "type": "lookupWithQuery", // in view should be string
      //     "queryField": "Types",
      //     "queryFieldType": "Choice", //ex: "Choice"
      //     "queryFieldValue": "sub",
      //     //from other list:
      //     "source": "MainKPI",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title",
      //     "display":"none"

      // },
      {
        InternalName: 'ERPCode',
        DisplayNameEn: 'ERP Code',
        DisplayName: 'ترميز موارد',
        type: 'string',
        maxchar: '250',
        // "validation": "required"
      },
      {
        InternalName: 'DependencyCost',
        DisplayName: 'حجم الارتباط (منصة اعتماد) ',
        DisplayNameEn: 'Dependency Cost',
        type: 'floatpercentage',
      },
      // {
      //     "InternalName": "Status",
      //     "DisplayName": "مرحلة المبادرة",
      //     "DisplayNameEn": "Initiative Stage",
      //     "type": "dropdownValues",
      //     "validation": "required",
      //     options: {
      //         choices: [
      //             // { value: 'notstarted', display: 'notstarted' },
      //             { value: 'inactive', display: 'inactive' },
      //             { value: 'implementationnotstarted', display: 'implementationnotstarted' },
      //             { value: 'executioninitiative', display: 'executioninitiative' },
      //             { value: 'complete', display: 'complete' },
      //             { value: 'canceled', display: 'canceled' },
      //             // { value: 'closureinitiative', display: 'closureinitiative' }

      //         ]
      //     },
      // },
      // {
      //     "InternalName": "InitiativeOwnerEntity",
      //     "DisplayNameEn": "Initiative Owner Entity",
      //     "DisplayName": "الجهة المالكة للمبادرة ",
      //     "type": "picker",
      //     // "state": "disabled",
      // },
      // {
      //     "InternalName": "RelatedObjectiveAgency",
      //     "DisplayNameEn": "Objective Name",
      //     "DisplayName": "الارتباط بهدف الوكالة ",
      //     "type": "lookup",
      //     "source": "SOs",
      //     // "state": "disabled",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title"
      // },
      // {
      //     "InternalName": "ProgramVision",
      //     "DisplayNameEn": "Program Vision",
      //     "DisplayName": "برنامج تحقيق الرؤية",
      //     "type": "string",

      // },

      // {
      //     "InternalName": "RelatedStrategyObjective",
      //     "DisplayNameEn": "Related Strategy Objective",
      //     "ToggleName": "RelatedStrategyObjective",
      //     "DisplayName": "الهدف الاستراتيجي المرتبط",
      //     "type": "lookup",
      //     "source": "SOs",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title",
      //     // "state": "disabled",
      //     "display": "none",
      //     accessFilter: [
      //         {
      //             role: "VROE",
      //             conditions: [{
      //                 field: "Types",
      //                 type: "Text",
      //                 values: ["vision"],
      //             }],
      //         },
      //         {
      //             role: "VROP",
      //             conditions: [{
      //                 field: "Types",
      //                 type: "Text",
      //                 values: ["vision"],
      //             }],
      //         },
      //         {
      //             role: "LMSE",
      //                 conditions: [
      //                     {
      //                         field: "Types",
      //                         type: "Text",
      //                         values: ["lms"],
      //                     }
      //                 ]
      //         },
      //         {
      //             role: "LMSP",
      //                 conditions: [
      //                     {
      //                         field: "Types",
      //                         type: "Text",
      //                         values: ["lms"],
      //                     }
      //                 ]
      //         }
      //     ]
      // },

      // {
      //     "InternalName": "Portfolio",
      //     "DisplayName": "المحفظة",
      //     "DisplayNameEn": "Portfolio",
      //     "type": "lookup",
      //     //from other list:
      //     "source": "Portfolio",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title",
      //     "BIlanguage" : true, //added by oday to handle portfolio bilangual
      //     "DispfieldkeyEn": "NameEn",//added by oday to handle portfolio bilangual

      // },
      // {
      //     "InternalName": "Sector",
      //     "DisplayNameEn": "Sector",
      //     "DisplayName":"القطاع",
      //     "type": "lookup",
      //     //from other list:
      //     "source": "Internal Entities",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title"

      // } ,
      // {
      //     "InternalName": "Department",
      //     "DisplayNameEn": "Department",
      //     "DisplayName":"الوكالة/الجهة ",
      //     "type": "lookup",
      //     //from other list:
      //     "source": "Internal Entities",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title"

      // } ,
      // {
      //     "InternalName": "OwnerEmail",
      //     "DisplayNameEn": "Owner Email",
      //     "DisplayName": "البريد الإلكتروني لمالك المبادرة",
      //     "type": "email",
      // },
      // {
      //     "InternalName": "ManagerEmail",
      //     "DisplayNameEn": "Manager Email",
      //     "DisplayName": "البريد الإلكتروني لمدير المبادرة",
      //     "type": "email", //in view should be string  //in view should be string
      //     "maxchar": "500",
      // },
      // {
      //     "InternalName": "ObjectiveOwner",
      //     "DisplayNameEn": "Objective Owner",
      //     "DisplayName": "مالك الهدف ",
      //     "type": "picker",
      //     "validation": "required"
      // },

      // {
      //     "InternalName": "InitiativeStatus",
      //     "DisplayName": "حالة توثيق المبادرة",
      //     "DisplayNameEn": "Initiative Documentation Status",
      //     "type": "string",
      // },
      // {
      //     "InternalName": "PlannedPercentageCompleted",
      //     "DisplayName": "نسبة اكتمال المبادرة المخططة ",
      //     "DisplayNameEn": "Planned Percentage Completed",
      //     "type": "floatpercentage",
      // },
      // {
      //     "InternalName": "ActualPercentageCompleted",
      //     "DisplayName": "نسبة الإكتمال الفعلية ",
      //     "DisplayNameEn": "Actual Percentage Completed",
      //     "type": "floatpercentage",
      // },
      // {
      //     "InternalName": "DelayPercentage",
      //     "DisplayName": "نسبة التأخير ",
      //     "DisplayNameEn": "Delay Percentage",
      //     "type": "floatpercentage",
      // },
      // {
      //     "InternalName": "CurrentBuget",
      //     "DisplayName": "السيولة المخصص للعام المالي الحالي ",
      //     "DisplayNameEn": "Current Buget",
      //     "type": "float",
      // },
      // {
      //     "InternalName": "Expenditures",
      //     "DisplayName": "المنصرف الأجمالي ",
      //     "DisplayNameEn": "Expenditures",
      //     "type": "float",
      // },
      // {
      //     "InternalName": "CurrentExpenditures",
      //     "DisplayName": "المنصرف من العالم المالي الحالي ",
      //     "DisplayNameEn": "Current Expenditures",
      //     "type": "float",
      // },
      // {
      //     "InternalName": "StrategicPillar",
      //     "DisplayNameEn": "Strategic Pillar",
      //     "DisplayName":"ركيزة الاستراتيجية",
      //     "type": "lookup",
      //     //from other list:
      //     "source": "SPillars",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Name",
      //     "validation": "required"

      // },
    ],
  },
  {
    label: 'المعلومات المالية',
    labelEn: 'Financial Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'RelatedBudgetItem',
        // "ToggleName": "RelatedBudgetItem", //ToggleName to select which field
        DisplayNameEn: 'Related Budget Item',
        DisplayName: 'البند المالي المرتبط',
        type: 'lookup',
        //from other list:
        source: 'Budget Items',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // "display":"none"
      },
      {
        InternalName: 'EstimatedCost',
        DisplayName: 'التكلفة التقديرية ',
        DisplayNameEn: 'Estimated Cost',
        type: 'float',
      },
      {
        InternalName: 'InitiativeBudget',
        DisplayName: 'ميزانية المبادرة ',
        DisplayNameEn: 'InitiativeBudget',
        // "state": "disabled",
        type: 'float',
      },
      {
        InternalName: 'ProgramTotalCost',
        DisplayName: 'التكاليف الكلية حسب سقف البرنامج ',
        DisplayNameEn: 'Program Total Cost',
        type: 'float',
      },

      {
        InternalName: 'ActualCost',
        DisplayName: 'التكاليف الكلية المعتمدة ',
        DisplayNameEn: 'Actual Cost',
        type: 'float',
      },
      {
        InternalName: 'CurrentBuget',
        DisplayName: 'السيولة المخصصة للعام المالي الحالي ',
        DisplayNameEn: 'Current Budget',
        type: 'float',
      },
      {
        InternalName: 'Expenditures',
        DisplayName: 'المنصرف الأجمالي ',
        DisplayNameEn: 'Expenditures',
        type: 'float',
      },
      {
        InternalName: 'CurrentExpenditures',
        DisplayName: 'المنصرف من العالم المالي الحالي ',
        DisplayNameEn: 'Current Expenditures',
        type: 'float',
      },
    ],
  },
  {
      label: 'الوثائق الداعمة',
      labelEn: 'Supporting Documents',
      description: "",
      descriptionEn: "",
      subFields: [{
          "InternalName": "getfile",
          "DisplayName": "المرفقات",
          "DisplayNameEn": "Attachments",
          "type": "file",
          "withAddBtn": "true"
      }]
  }
]
