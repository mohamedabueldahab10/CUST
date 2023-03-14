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
        InternalName: 'Portfolio',
        DisplayName: 'المحفظة',
        DisplayNameEn: 'Portfolio',
        type: 'lookup',
        //from other list:
        source: 'Portfolio',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'Types',
        DisplayNameEn: 'Types',
        DisplayName: 'النوع',
        validation: 'required',
        dynamic: 'parent', // parent to get the child depends on this field value
        toggleValues: [
          { value: 'vision', fields: ['RelatedStrategyObjective'] }, //we can put more than 1  field
        ],
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'vision',
              value: 'vision',
              roles: [
                'Administrator',
                'VROE',
                'VROP',
                'InitiativeManager',
                'DU',
                'EPMO',
              ],
            },
            {
              display: 'strategically',
              value: 'strategically',
              roles: ['Administrator', 'EPMO', 'InitiativeManager', 'DU'],
            },
            {
              display: 'lms',
              value: 'lms',
              roles: [
                'Administrator',
                'LMSE',
                'LMSP',
                'InitiativeManager',
                'DU',
                'EPMO',
              ],
            },
            // { display: 'others', value: 'others' },
          ],
        },
        security: {
          groups: ['System Admin Group'],
        },
      },
      // {
      //   InternalName: 'RelatedKPI',
      //   DisplayNameEn: 'Related KPI',
      //   DisplayName: 'المؤشر الفرعي المرتبط',
      //   type: 'lookupWithQuery', // in view should be string
      //   queryField: 'Types',
      //   queryFieldType: 'Choice', //ex: "Choice"
      //   queryFieldValue: 'sub',
      //   //from other list:
      //   source: 'MainKPI',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   display: 'none',
      // },
      // {
      //   InternalName: 'ERPCode',
      //   DisplayNameEn: 'ERP Code',
      //   DisplayName: 'ترميز موارد',
      //   type: 'string',
      //   maxchar: '250',
      //   // "validation": "required"
      // },
      // {
      //   InternalName: 'Status',
      //   DisplayName: 'مرحلة المبادرة',
      //   DisplayNameEn: 'Initiative Stage',
      //   type: 'dropdownValues',
      //   validation: 'required',
      //   options: {
      //     choices: [
      //       // { value: 'notstarted', display: 'notstarted' },
      //       { value: 'inactive', display: 'inactive' },
      //       {
      //         value: 'implementationnotstarted',
      //         display: 'implementationnotstarted',
      //       },
      //       { value: 'executioninitiative', display: 'executioninitiative' },
      //       { value: 'complete', display: 'complete' },
      //       { value: 'canceled', display: 'canceled' },
      //       // { value: 'closureinitiative', display: 'closureinitiative' }
      //     ],
      //   },
      // },
      {
        InternalName: 'RelatedStrategy',
        DisplayNameEn: 'Related Strategy',
        DisplayName: 'الاستراتيجية المرتبطة',
        dontSubmit: true,
        type: 'lookup',
        source: 'GoalStrategy',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        seconeddynamic: "Types",// child for this field(add it to make the field as a parent and child at the same time) 
        filterField: 'Types',
        filterFieldType: 'Text',
        dynamic: 'parent', // parent for this field
        //
        notInvokeListiner: true,// to not invoke the lookup when change on parent > the filteration depends on other field also
        //

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
        dontSubmit: true,
        //
        grandFieldId: "RelatedStrategy", // we add this field to handle the two field filtration(parent Id in current form) 
        childFieldId: "RelatedObjective",// we add this field to handle the two field filtration (child Id in current form)
        childFieldIdSource: "Types",// we add this field to handle the two field filtration (child internal name in destination list)
        //
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'main',
              value: 'main',
            },
            {
              display: 'sublevel2',
              value: 'sublevel2',
            },
            {
              display: 'sublevel3',
              value: 'sublevel3',
            },
          ],
        },
        "validation": "required",
      },
      {
        InternalName: 'RelatedObjective',
        DisplayNameEn: 'Related Objective',
        DisplayName: 'الهدف المرتبط',
        type: 'lookupmultiselect',
        source: 'SOs',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        grpfieldkey: 'Title',
        //
        dynamic: 'RelatedStrategy',
        filterField: 'RelatedStrategy',
        filterFieldType: 'Text',
        isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        fieldsinformlvl1: "RelatedStrategy", // fields in look up list
        sourcefieldlvl1: "RelatedStrategy",
        fieldsinformlvl2: "RelatedObjectiveLevel", // fields in look up list
        sourcefieldlvl2: "Types",
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
        // queryField: 'Types', // if i need to make the field with filter should add this like lookupwithquery type
        // queryFieldType: 'dropdownValues', //ex: "Choice"// if i need to make the field with filter should add this
        // queryFieldValue: 'sublevel2,sublevel3', // if i need to make the field with filter should add this
      },
      // {
      //   InternalName: 'RelatedObjective',
      //   DisplayNameEn: 'Related Objective',
      //   DisplayName: 'الهدف المرتبط',
      //   type: 'lookup',
      //   source: 'SOs',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   // "state": "disabled"
      //   // "validation":"required"
      //   dynamic: 'RelatedStrategy',
      //   //
      //   isRelatedToParent: true, // to show parent value depends on child like sector and subsector
      //   fieldsinformlvl1: "RelatedStrategy", // fields in look up list
      //   sourcefieldlvl1: "RelatedStrategy",
      //   fieldsinformlvl2: "RelatedObjectiveLevel", // fields in look up list
      //   sourcefieldlvl2: "Types",
      //   //
      //   filterField: 'RelatedStrategy', // 
      //   filterFieldType: 'Text',
      //   // grpfieldkey: 'Title',
      //   //
      //   accessFilter: [
      //     {
      //       role: 'VROE',
      //       conditions: [
      //         {
      //           field: 'Types',
      //           type: 'Text',
      //           values: ['vision'],
      //         },
      //       ],
      //     },
      //     {
      //       role: 'VROP',
      //       conditions: [
      //         {
      //           field: 'Types',
      //           type: 'Text',
      //           values: ['vision'],
      //         },
      //       ],
      //     },
      //     {
      //       role: 'LMSE',
      //       conditions: [
      //         {
      //           field: 'Types',
      //           type: 'Text',
      //           values: ['lms'],
      //         },
      //       ],
      //     },
      //     {
      //       role: 'LMSP',
      //       conditions: [
      //         {
      //           field: 'Types',
      //           type: 'Text',
      //           values: ['lms'],
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   InternalName: 'RelatedObjective',
      //   DisplayNameEn: 'Related Objective',
      //   DisplayName: 'الهدف المرتبط',
      //   type: 'lookupmultiselect',
      //   validation: 'required',
      //   source: 'SOs',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   grpfieldkey: 'Title',
      //   initiativeCodeInList: true //value in look up drop down should be related to current project

      //   // queryField: 'Types', // if i need to make the field with filter should add this like lookupwithquery type
      //   // queryFieldType: 'dropdownValues', //ex: "Choice"// if i need to make the field with filter should add this
      //   // queryFieldValue: 'sublevel2,sublevel3', // if i need to make the field with filter should add this
      // },
      // {
      //   InternalName: 'RelatedStrategyObjective',
      //   DisplayNameEn: 'Related Strategy Objective',
      //   ToggleName: 'RelatedStrategyObjective',
      //   DisplayName: 'الهدف الاستراتيجي المرتبط',
      //   type: 'lookup',
      //   source: 'SOs',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   // "state": "disabled",
      //   display: 'none',
      //   accessFilter: [
      //     {
      //       role: 'VROE',
      //       conditions: [
      //         {
      //           field: 'Types',
      //           type: 'Text',
      //           values: ['vision'],
      //         },
      //       ],
      //     },
      //     {
      //       role: 'VROP',
      //       conditions: [
      //         {
      //           field: 'Types',
      //           type: 'Text',
      //           values: ['vision'],
      //         },
      //       ],
      //     },
      //     {
      //       role: 'LMSE',
      //       conditions: [
      //         {
      //           field: 'Types',
      //           type: 'Text',
      //           values: ['lms'],
      //         },
      //       ],
      //     },
      //     {
      //       role: 'LMSP',
      //       conditions: [
      //         {
      //           field: 'Types',
      //           type: 'Text',
      //           values: ['lms'],
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   InternalName: 'ProgramVision',
      //   DisplayNameEn: 'Program Vision',
      //   DisplayName: 'برنامج تحقيق الرؤية',
      //   type: 'string',
      // },

      // {
      //   InternalName: 'InitiativeOwnerEntity',
      //   DisplayNameEn: 'Initiative Owner Entity',
      //   DisplayName: 'الجهة المالكة للمبادرة ',
      //   type: 'picker',
      //   // "state": "disabled",
      // },
      // {
      //   InternalName: 'RelatedProgram',
      //   DisplayNameEn: 'Related Program',
      //   DisplayName: 'أسم البرنامج التابع له',
      //   type: 'string',
      //   // "source": "Instruments",
      //   // "Dispfieldkey": "Title",
      //   // "valfieldkey": "Title"
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
        validation: 'required',
        // "state": "disabled"
      },
      // {
      //   InternalName: 'OwnerEmail',
      //   DisplayNameEn: 'Owner Email',
      //   DisplayName: 'البريد الإلكتروني لمالك المبادرة',
      //   type: 'email',
      // },
      // {
      //   InternalName: 'ManagerEmail',
      //   DisplayNameEn: 'Manager Email',
      //   DisplayName: 'البريد الإلكتروني لمدير المبادرة',
      //   type: 'email', //in view should be string  //in view should be string
      //   maxchar: '500',
      // },
      // {
      //     "InternalName": "ObjectiveOwner",
      //     "DisplayNameEn": "Objective Owner",
      //     "DisplayName": "مالك الهدف ",
      //     "type": "picker",
      //     "validation": "required"
      // },
      {
        InternalName: 'StartDate',
        DisplayName: 'تاريخ بداية المبادرة ',
        DisplayNameEn: 'Start Date',
        type: 'datetime',
        max: 'FinishDate',
        validation: 'required',
      },
      {
        InternalName: 'FinishDate',
        DisplayName: 'تاريخ نهاية المبادرة ',
        DisplayNameEn: 'Finish Date',
        type: 'datetime',
        min: 'StartDate',
        validation: 'required',
      },
      // {
      //   InternalName: 'StartDate',
      //   DisplayName: 'تاريخ بداية المبادرة ',
      //   DisplayNameEn: 'Start Date',
      //   // type: 'datetime',
      //   type: 'datetimetoparent',
      //   listname: 'Initiatives',
      //   startinternalname: 'BaselineStartDate',
      //   endinternalname: 'BaselineFinishDate',
      //   max: 'FinishDate',
      //   validation: 'required'
      // },
      // {
      //   InternalName: 'FinishDate',
      //   DisplayName: 'تاريخ نهاية المبادرة ',
      //   DisplayNameEn: 'Finish Date',
      //   // type: 'datetime',
      //   type: 'datetimetoparent',
      //   listname: 'Initiatives',
      //   startinternalname: 'BaselineStartDate',
      //   endinternalname: 'BaselineFinishDate',
      //   min: 'StartDate',
      //   validation: 'required'
      // },
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
            {
              display: 'operationally',
              value: 'operationally',
            },
            {
              display: 'transformationally',
              value: 'transformationally',
            }
          ],
        },
      },
      {
        InternalName: 'ExpenseStartDate',
        DisplayName: 'تاريخ بداية الصرف',
        DisplayNameEn: 'Expense Start Date',
        type: 'datetime',
        enableOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
        requireOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
      },
      {
        InternalName: 'DependencyCost',
        DisplayName: 'حجم الارتباط (منصة اعتماد) ',
        DisplayNameEn: 'Dependency Cost',
        // type: 'float',
        type: 'floatpercentage',
      },
      // {
      //     "InternalName": "InitiativeStatus",
      //     "DisplayName": "حالة توثيق المبادرة",
      //     "DisplayNameEn": "Initiative Documentation Status",
      //     "type": "string",
      // },

      {
        InternalName: 'PlannedPercentageCompleted',
        DisplayName: 'نسبة اكتمال المبادرة المخططة ',
        DisplayNameEn: 'Planned Percentage Completed',
        type: 'floatpercentage',
        // "state": "disabled"
      },
      {
        InternalName: 'ActualPercentageCompleted',
        DisplayName: 'نسبة الإكتمال الفعلية ',
        DisplayNameEn: 'Actual Percentage Completed',
        type: 'floatpercentage',
        // "state": "disabled"
      },
      // {
      //     "InternalName": "DelayPercentage",
      //     "DisplayName": "نسبة التأخير ",
      //     "DisplayNameEn": "Delay Percentage",
      //     "type": "floatpercentage",
      // },

      // {
      //   InternalName: 'Expenditures',
      //   DisplayName: 'المنصرف الأجمالي ',
      //   DisplayNameEn: 'Expenditures',
      //   type: 'float',
      // },
      // {
      //     "InternalName": "CurrentExpenditures",
      //     "DisplayName": "المنصرف من العالم المالي الحالي ",
      //     "DisplayNameEn": "Current Expenditures",
      //     "type": "float",
      // },
      // {
      //   InternalName: 'StrategicPillar',
      //   DisplayNameEn: 'Strategic Pillar',
      //   DisplayName: 'ركيزة الاستراتيجية',
      //   type: 'lookup',
      //   //from other list:
      //   source: 'SPillars',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Name',
      //   // "validation": "required"
      // },
    ],
  },
  {
    label: 'المعلومات المالية',
    labelEn: 'Financial Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    enableOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
    requireOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
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
        enableOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
        requireOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
      },
      {
        InternalName: 'EstimatedCost',
        DisplayName: 'التكلفة التقديرية ',
        DisplayNameEn: 'Estimated Cost',
        type: 'float',
        enableOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
        requireOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
      },
      {
        InternalName: 'InitiativeBudget',
        DisplayName: 'ميزانية المبادرة ',
        DisplayNameEn: 'InitiativeBudget',
        // "state": "disabled",
        type: 'float',
        security: {
          groups: ['EPMO', 'System Admin Group'],
        },
        enableOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
        requireOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
      },
      {
        InternalName: 'ProgramTotalCost',
        DisplayName: 'التكاليف الكلية حسب سقف البرنامج ',
        DisplayNameEn: 'Program Total Cost',
        type: 'float',
        targetelement: 'ActualCost',
        enableOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
        requireOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
      },
      {
        InternalName: 'ActualCost',
        DisplayName: 'التكاليف الكلية المعتمدة ',
        DisplayNameEn: 'Actual Cost',
        type: 'float',
        targetelement: 'ActualCost',
        seconedtarget: 'ProgramTotalCost',
        enableOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
        requireOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
      },
      {
        InternalName: 'CurrentBuget',
        DisplayName: 'السيولة المخصصة للعام المالي الحالي ',
        DisplayNameEn: 'Current Budget',
        type: 'float',
        enableOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
        requireOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
      },
      {
        InternalName: 'Expenditures',
        DisplayName: 'المنصرف الأجمالي ',
        DisplayNameEn: 'Expenditures',
        type: 'float',
        enableOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
        requireOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
      },
      {
        InternalName: 'CurrentExpenditures',
        DisplayName: 'المنصرف من العالم المالي الحالي ',
        DisplayNameEn: 'Current Expenditures',
        type: 'float',
        enableOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
        requireOnWfTaskStage: "VInStage01,SInStage01,LInStage01",
      },
    ],
  },
  // {
  //   label: 'وثائق عمليات BRD',
  //   labelEn: 'BRD Documents',
  //   description: '',
  //   descriptionEn: '',
  //   subFields: [
  //     {
  //       InternalName: 'getfile',
  //       DisplayName: 'مرفقات BRD',
  //       DisplayNameEn: 'BRD Attachments',
  //       type: 'file',
  //       docPurpose:"BRD",
  //       withAddBtn: 'true',
  //     },
  //   ],
  // },
  {
    label: 'الوثائق الداعمة',
    labelEn: 'Supporting Documents',
    description: '',
    descriptionEn: '',
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
