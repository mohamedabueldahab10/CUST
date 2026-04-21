var Information_Form = [
  {
    label: 'المبادرة',
    labelEn: 'Initiative Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    workflowSetValues: [
      //VRO
      { fieldName: 'DraftStatus', value: '', stages: ["VROCreateInitiative04"] },
      { fieldName: 'WFModuleCode', value: 'VisionInitiative', stages: ["VROCreateInitiative04"] },
      { fieldName: 'WFStage', value: 'VInStage00.1', stages: ["VROCreateInitiative04"] },
      { fieldName: 'Phase', value: 'P5', stages: ["VROCreateInitiative04"] },
      //EPMO
      { fieldName: 'DraftStatus', value: '', stages: ["EPMOCreateInitiative03"] },
      { fieldName: 'WFModuleCode', value: 'StrategicallyInitiative', stages: ["EPMOCreateInitiative03"] },
      { fieldName: 'WFStage', value: 'SInStage00.1', stages: ["EPMOCreateInitiative03"] },
      { fieldName: 'Phase', value: 'P5', stages: ["EPMOCreateInitiative03"] },
      //LMS
      { fieldName: 'DraftStatus', value: '', stages: ["LMSCreateInitiative03"] },
      { fieldName: 'WFModuleCode', value: 'LMSInitiative', stages: ["LMSCreateInitiative03"] },
      { fieldName: 'Phase', value: 'P5', stages: ["LMSCreateInitiative03"] },
      { fieldName: 'WFStage', value: 'LInStage00.1', stages: ["LMSCreateInitiative03"] },

     //SOD
      { fieldName: 'DraftStatus', value: '', stages: ["SODCreateInitiative03"] },
      { fieldName: 'WFModuleCode', value: 'SODInitiative', stages: ["SODCreateInitiative03"] },
      { fieldName: 'Phase', value: 'P5', stages: ["SODCreateInitiative03"] },
      { fieldName: 'WFStage', value: 'SODInStage00.1', stages: ["SODCreateInitiative03"] },

      //for Closure Phase
      { fieldName: 'Phase', value: 'P4', stages: ["VInStage14"] },
      { fieldName: 'Phase', value: 'P4', stages: ["SInStage12"] },
      { fieldName: 'Phase', value: 'P4', stages: ["LInStage11"] },
      { fieldName: 'Phase', value: 'P4', stages: ["SODInStage11"] }
    ],
    subFields: [
      {
        InternalName: 'Title',
        DisplayName: 'رمز المبادرة ',
        DisplayNameEn: 'Initiative Code',
        type: 'string',
        state: 'disabled',
      },
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'اسم المبادرة',
        type: 'string',
        // maxchar: '250',
        // validation: 'required',
      },
    
      {
        InternalName: 'OfficialCode',
        DisplayNameEn: 'Official Code',
        DisplayName: 'رمز المبادرة الرسمي',
        type: 'string',
      },
      {
        InternalName: 'Types',
        DisplayNameEn: 'Types',
        DisplayName: 'النوع',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'vision', value: 'vision' },
            { display: 'strategically', value: 'strategically' },
            { display: 'others', value: 'others' },
          ],
        },
        toggleValues: [
          { value: 'vision', fields: ['RelatedStrategyReadonly','RelatedReadOnlyObjectiveLevel','RelatedReadonlyObjective','RelatedProgram','ExternalEntityRepresentative'] },
          { value: 'lms', fields: ['RelatedStrategyReadonly','RelatedReadOnlyObjectiveLevel','RelatedReadonlyObjective'] },
          { value: 'sod', fields: ['RelatedStrategyReadonly','RelatedReadOnlyObjectiveLevel','RelatedReadonlyObjective'] },
          { value: 'strategically', fields: [''] },
        ],
      },
      {
        InternalName: 'StrategySource',
        DisplayNameEn: 'Strategy Source',
        DisplayName: 'مصدر الاستراتيجية',
        type: 'lookup',
        source: 'GoalStrategy',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // dontSubmit: true,
        // showlink:true,
        // linkedto: "goalstrategy"
      },
      {
        InternalName: 'RelatedProgram',
        DisplayNameEn: 'Related Program',
        ToggleName: 'RelatedProgram',
        DisplayName: 'البرنامج المرتبط',
        type: 'lookupWithQuery',
        queryField: 'Types',
        queryFieldType: 'Text', //ex: "Choice"
        queryFieldValue: 'program',
        //from other list:
        source: 'SPillars',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
          // "display": "none"
        // isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        // to get the seblings value
        // valsiblingkey: 'Description', // internal name on sorce list
        // targetsiblingkey: 'StrategicDescription', // internal name on current list
        // display: 'none',
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
      // {
      //   InternalName: 'RelatedKPI',
      //   DisplayNameEn: 'Related KPI',
      //   DisplayName: 'المؤشر الفرعي المرتبط',
      //   type: 'string',
      //   display: 'none',
      // },
      {
        InternalName: 'ComplianceRate',
        DisplayName: 'نسبة الإمتثال',
        DisplayNameEn: 'Compliance Rate',
        type: 'floatpercentage',
      },
      // {
      //   InternalName: 'Status',
      //   DisplayName: 'مرحلة المبادرة',
      //   DisplayNameEn: 'Initiative Phase',
      //   type: 'dropdownValues',
      //   // validation: 'required',
      //   options: {
      //     choices: [
      //       // { value: 'notstarted', display: 'notstarted' },
      //       { value: 'executioninitiative', display: 'executioninitiative' },
      //       // { value: 'complete', display: 'complete' },
      //       { value: 'canceled', display: 'canceled' },
      //       { value: 'onhold', display: 'onhold' },
      //       // { value: 'closureinitiative', display: 'closureinitiative' }
      //     ],
      //   },
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
      //   InternalName: 'InitiativeOwnerEntity',
      //   DisplayNameEn: 'Initiative Owner Entity',
      //   DisplayName: 'الجهة المالكة للمبادرة ',
      //   type: 'picker',
      //   // "state": "disabled",
      // },
      // {
      //     "InternalName": "RelatedStrategyObjective",
      //     "DisplayNameEn": "Objective Name",
      //     "DisplayName": "الارتباط بهدف الوكالة ",
      //     "type": "lookup",
      //     "source": "SOs",
      //     // "state": "disabled",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title"
      // },
      // {
      //   InternalName: 'ProgramVision',
      //   DisplayNameEn: 'Program Vision',
      //   DisplayName: 'برنامج تحقيق الرؤية',
      //   type: 'string',
      // },
      {
        InternalName: 'RelatedStrategy',
        DisplayNameEn: 'Related Strategy',
        DisplayName: 'الاستراتيجية المرتبطة',
        type: 'lookup',
        source: 'GoalStrategy',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // dontSubmit: true,
        // showlink:true,
        linkedto: "goalstrategy"
      },
      //  {
      //   InternalName: 'RelatedStrategyReadonly',
      //   DisplayNameEn: 'Related Strategy Read Only',
      //   DisplayName: 'الاستراتيجية المطلعه',
      //   type: 'lookup',
      //   source: 'GoalStrategy',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   // dontSubmit: true,
      //   // showlink:true,
      //   linkedto: "goalstrategy"
      // },
      {
        InternalName: 'RelatedObjectiveLevel',
        DisplayNameEn: 'Related Objective Level',
        DisplayName: 'مستوى الهدف المرتبط',
        // dontSubmit: true,
        type: 'string',
        translate:'resources',
       
        // validation: 'required',
      },
      // {
      //   InternalName: 'RelatedObjective',
      //   DisplayNameEn: 'Related Objective',
      //   DisplayName: 'الهدف المرتبط',
      //   type: 'lookup',
      //   grpfieldkey: 'Title',
      //   source: 'SOs',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   showlink: true,
      //   linkedto: "sos",
      //   dynamic: 'RelatedStrategy',
      //   //
      //   isRelatedToParent: true, // to show parent value depends on child like sector and subsector
      //   fieldsinformlvl1: "RelatedStrategy", // fields in form list
      //   sourcefieldlvl1: "RelatedStrategy", // field in look up list
      //   fieldsinformlvl2: "RelatedObjectiveLevel", // fields in form  list lvl2
      //   sourcefieldlvl2: "Types", //  field in look up list lvl2
      //   //
      //   filterField: 'RelatedStrategy',
      //   filterFieldType: 'Text',
      //   // "state": "disabled"
      // },
      {
        InternalName: 'RelatedObjective',
        DisplayNameEn: 'Related Objective',
        DisplayName: 'الهدف المرتبط',
        type: 'lookupmultiselect',
        // validation: 'required',
        source: 'SOs',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        grpfieldkey: 'Title',
        // initiativeCodeInList: true, //value in look up drop down should be related to current project
        // showlink: true,
        // linkedto: "sos",
        // isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        // fieldsinformlvl1: "RelatedStrategy", // fields in form list
        // sourcefieldlvl1: "RelatedStrategy", // field in look up list
        // fieldsinformlvl2: "RelatedObjectiveLevel", // fields in form  list lvl2
        // sourcefieldlvl2: "Types", //  field in look up list lvl2
        // queryField: 'Types', // if i need to make the field with filter should add this like lookupwithquery type
        // queryFieldType: 'dropdownValues', //ex: "Choice"// if i need to make the field with filter should add this
        // queryFieldValue: 'sublevel2,sublevel3', // if i need to make the field with filter should add this
      },
        {
        InternalName: 'RelatedStrategyReadonly',
        DisplayNameEn: 'Related Strategy Read Only',
        DisplayName: 'الاستراتيجية المطلعه',
        type: 'lookupWithQuery',
        ToggleName: 'RelatedStrategyReadonly',
        queryField: 'Types',
        queryFieldType: 'dropdownValues', //ex: "Choice"
        queryFieldValue: 'ministry',
        // validation: 'required',
        //from other list:

        source: 'GoalStrategy',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        dynamic: 'parent',
        notInvokeListiner: true, // to not invoke the lookup when change on parent > the filteration depends on other field also
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
            role: 'LMSUExecution',
            conditions: [
              {
                field: 'Types',
                type: 'Choice',
                values: ['lms'],
              },
            ],
          },
          {
            role: 'SODVROExecution',
            conditions: [
              {
                field: 'Types',
                type: 'Choice',
                values: ['sod'],
              },
            ],
          },
        ],
        "display": "none"
      },
       
      {
        InternalName: 'RelatedReadOnlyObjectiveLevel',
        DisplayNameEn: 'Related Objective Level',
        DisplayName: 'مستوى الهدف المتطلع',
        grandFieldId: 'RelatedStrategyReadonly',
        childFieldId: 'RelatedReadonlyObjective',
        childFieldIdSource: 'Types',
        type: 'dropdownValues',
        ToggleName: 'RelatedReadOnlyObjectiveLevel',
        descPhraseAr: 'تظهر الأهداف بناءً على مستوى الهدف المتطلع والاستراتيجية المختارة',
        descPhraseEn: 'Objectives appear based on selected Level and Related Strategy Read Only',
        options: {
          choices: [
            { display: 'main', value: 'main' },
            { display: 'sublevel2', value: 'sublevel2' },
            { display: 'sublevel3', value: 'sublevel3' },
          ],
        },
        "display": "none"
      },
      {
        InternalName: 'RelatedReadonlyObjective',
        DisplayNameEn: 'Related Readonly Objective',
        DisplayName: 'الهدف المتطلع',
        type: 'lookup',
        ToggleName: 'RelatedReadonlyObjective',
        source: 'SOs',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        dynamic: 'RelatedStrategyReadonly',
        filterField: 'RelatedStrategy',
        filterFieldType: 'Text',
        descPhraseAr: 'تظهر الأهداف بناءً على الاستراتيجية المتطلعة ومستوى الهدف المتطلع',
        descPhraseEn: 'Objectives appear based on Related Strategy Read Only and Related Objective Level',
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
          {
            role: 'SODVROE',
            conditions: [
              {
                field: 'Types',
                type: 'Text',
                values: ['sod'],
              },
            ],
          },
          {
            role: 'SODVROPerformance',
            conditions: [
              {
                field: 'Types',
                type: 'Text',
                values: ['sod'],
              },
            ],
          },
        ],
        "display": "none"
      },
      // {
      //   InternalName: 'RelatedProgram',
      //   DisplayNameEn: 'Related Program',
      //   DisplayName: 'اسم البرنامج التابع له',
      //   // type: 'string',
      //   // dontSubmit: true,
      //   type: 'lookup',
      //   grpfieldkey: 'Title',
      //   source: 'SPillars',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   // showlink:true,
      //   linkedto: 'sos'
      //   // "source": "Instruments",
      //   // "Dispfieldkey": "Title",
      //   // "valfieldkey": "Title"
      // },
      {
        InternalName: 'InitiativeOwner',
        DisplayNameEn: 'Initiative Owner',
        DisplayName: 'مالك المبادرة ',
        type: 'picker',
      },
      {
        InternalName: 'InitiativeActualOwner',
        DisplayNameEn: 'Initiative Actual Owner',
        DisplayName: 'المالك الفعلي للمبادرة',
        type: 'string',
      },
      {
        InternalName: 'InitiativePM',
        DisplayNameEn: 'Initiative manager',
        DisplayName: 'مدير المبادرة ',
        type: 'picker',
      },
            {
        InternalName: 'ExternalEntityRepresentative',
        DisplayNameEn: 'External Entity Representative',
        DisplayName: 'ممثل الجهة الخارجية',
        ToggleName: 'ExternalEntityRepresentative',
        type: 'string',
        display: 'none',
      },
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
      // },

      //  {
      //     "InternalName": "Portfolio",
      //     "DisplayName": "المحفظة",
      //     "DisplayNameEn": "Portfolio",
      //     "type": "lookup",
      //     //from other list:
      //     "source": "Portfolio",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title",
      //     "BIlanguage" : true, //handle portfolio bilangual
      //     "DispfieldkeyEn": "NameEn",// handle portfolio bilangual
      // },
      {
        InternalName: 'Sector',
        DisplayNameEn: 'Sector',
        DisplayName: 'القطاع',
        type: 'lookup',
        //from other list:
        source: 'Internal Entities',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'SubSector',
        DisplayNameEn: 'Deputyship',
        DisplayName: 'الوكالة',
        type: 'lookup',
        //from other list:
        source: 'Internal Entities',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        dynamic: 'Sector', //InternalName Of Parent field
        filterField: 'ParentEntity',
        filterFieldType: 'Text',//Type In Sharepoint List for Parent field
      },
      {
        InternalName: 'ExternalEntities',
        DisplayName: 'الجهات الشقيقة',
        DisplayNameEn: 'External Entities',
        type: 'lookup',
        //from other list:
        source: 'Internal Entities',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        // isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        // dynamic: 'parent', //InternalName Of Parent field
        // seconeddynamic: "Sector",
        // filterField: 'ParentEntity', //InternalName Of Parent field
        // filterFieldType: 'Text', //Type In Sharepoint List for Parent field
        RequiredName: 'ExternalEntities',

      },
      // {
      //   InternalName: 'OwnerEmail',
      //   DisplayNameEn: 'Owner Email',
      //   DisplayName: 'البريد الإلكتروني لمالك المبادرة',
      //   type: 'string',
      //   maxchar: '500',
      // },
      // {
      //   InternalName: 'ManagerEmail',
      //   DisplayNameEn: 'Manager Email',
      //   DisplayName: 'البريد الإلكتروني لمدير المبادرة',
      //   type: 'string',
      //   maxchar: '500',
      // },
      // {
      //     "InternalName": "ObjectiveOwner",
      //     "DisplayNameEn": "Objective Owner",
      //     "DisplayName": "مالك الهدف ",
      //     "type": "string"
      // },
      {
        InternalName: 'StartDate',
        DisplayName: 'تاريخ بداية المبادرة ',
        DisplayNameEn: 'Start Date',
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Initiatives',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
        max: 'FinishDate',
      },
      {
        InternalName: 'FinishDate',
        DisplayName: 'تاريخ نهاية المبادرة ',
        DisplayNameEn: 'Finish Date',
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Initiatives',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
        max: 'FinishDate',
      },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف المبادرة',
        type: 'multiline'
      },
      {
        InternalName: 'Classification',
        DisplayName: 'تصنيف المبادرة',
        DisplayNameEn: 'Classification',
        type: 'string',
        translate:'resources'
      },
       {
        InternalName: "IsZeroBudgetInitiative",
        DisplayName: "هل هي مبادرة صفرىة؟",
        DisplayNameEn: "Is Zero Budget Intiative ?",
        // type: "yesnoradio",
        type: 'dropdownValues',
        options: {
          choices: [
            { display: "yes", value: "yes" },
            { display: "no", value: "no" },
          ],
        },
         toggleValues: [
          { value: 'yes', fields: [] },
          { value: 'no', fields: ['FundingSection', 'TenderSection', 'BudgetSection', /*'Delivrables', 'Milestones' , */'LinkingSection' ] },
        ],
      },
      {
        InternalName: 'ExpenseStartDate',
        DisplayName: 'تاريخ بداية الصرف',
        DisplayNameEn: 'Expense Start Date',
        type: 'datetime',
      },
     
      // {
      //   InternalName: 'ERPCode',
      //   DisplayNameEn: 'ERP Code',
      //   DisplayName: 'ترميز موارد',
      //   type: 'string',
      //   maxchar: '250',
      //   // "validation": "required"
      // },
      {
        InternalName: 'InitiativeProgressStatus',
        DisplayName: 'حالة الإنجاز',
        DisplayNameEn: 'Initiative Progress Status',
        type: 'string', //formula
        translate:'resources'
      },
      // {
      //   InternalName: 'InitiativeStatus',
      //   DisplayName: 'حالة توثيق المبادرة',
      //   DisplayNameEn: 'Initiative Documentation Status',
      //   type: 'string',
      // },
      {
        InternalName: 'DependencyCost',
        DisplayName: 'حجم الارتباط (منصة اعتماد) ',
        DisplayNameEn: 'Dependency Cost',
        type: 'floatpercentage',
        toggleName: 'FundingSection',
      },
       {
        InternalName: 'ComplianceRate',
        DisplayName: 'نسبة الإمتثال',
        DisplayNameEn: 'Compliance Rate',
        type: 'floatpercentage',
        toggleName: 'FundingSection',
      },
      {
        InternalName: 'PlannedPercentageCompleted',
        DisplayName: 'نسبة اكتمال المبادرة المخططة ',
        DisplayNameEn: 'Planned Percentage Completed',
        type: 'floatpercentage',
      },
      {
        InternalName: 'ActualPercentageCompleted',
        DisplayName: 'نسبة الإكتمال الفعلية ',
        DisplayNameEn: 'Actual Percentage Completed',
        type: 'floatpercentage',
      },
      // {
      //   InternalName: "WFStage",
      //   DisplayName: " الطور",
      //   DisplayNameEn: "Stage",
      //   type: 'lookup',
      //   // validation: 'required',
      //   source: "Tasks Configuration",
      //   Dispfieldkey: "TaskNameAr",
      //   DispfieldkeyEn: 'TaskNameEn',
      //   valfieldkey: "Title",
      //   },
      {
        InternalName: "Phase",
        DisplayName: "مرحلة المبادرة",
        DisplayNameEn: "Phase",
        type: 'lookup',
        // //from other list:
        source: "Phases",
        Dispfieldkey: "Name",
        DispfieldkeyEn: "PhaseNameEn",
        valfieldkey: "Title",
      },
    
      // {
      //   InternalName: 'DelayPercentage',
      //   DisplayName: 'نسبة التأخير ',
      //   DisplayNameEn: 'Delay Percentage',
      //   type: 'floatpercentage',
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
    toggleName: 'BudgetSection',
    subFields: [
      // {
      //   InternalName: 'RelatedBudgetItem',
      //   // "ToggleName": "RelatedBudgetItem", //ToggleName to select which field
      //   DisplayNameEn: 'Related Budget Item',
      //   DisplayName: 'البند المالي المرتبط',
      //   type: 'lookup',
      //   //from other list:
      //   source: 'Budget Items',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   // "display":"none"
      // },
      {
        "InternalName": "RelatedBudgetItem",
        "DisplayName": "البند المالي المرتبط",
        "DisplayNameEn": "Related Budget Item",
        type: "string",
        // //from other list:
        // source: "Budget Items",
        // Dispfieldkey: "Name",
        // valfieldkey: "Title",
        // grpfieldkey: 'Title',

      },
      {
        InternalName: 'EstimatedCost',
        DisplayName: 'التكلفة التقديرية ',
        DisplayNameEn: 'Estimated Cost',
        type: 'float',
      },
      {
        InternalName: "FundingStatus",
        DisplayName: "حالة التمويل",
        DisplayNameEn: "Funding Status",        
        "RequiredName": "FundingStatus",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "funded", value: "funded" },
            { display: "unfunded", value: "unfunded" },
            { display: "partiallyfunded", value: "partiallyfunded" },
            { display: "zero", value: "zero" },
          ],
        },
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
        DisplayName: 'المنصرف من السنة المالية الحالية',
        DisplayNameEn: 'Current Expenditures',
        type: 'float',
      },
     
    ]
  },
   {
    label: "بند الارتباط",
    labelEn: "Linking Item",
    description: "",
    descriptionEn: "",
    toggleName: 'LinkingSection', 
    subFields: [
        {
        InternalName: 'ExpensesDate',
        DisplayName: 'بيانات الصرف',
        DisplayNameEn: 'Expenses Date ',
        type: 'float',
        },
       /*{
        InternalName: 'ActualBudget',
        DisplayName: 'بيانات التكاليف',
        DisplayNameEn: 'Actual Budget',
        type: 'float',
       },*/
       {
        InternalName: 'ExpenseProgress',
        DisplayName: 'جاري الصرف',
        DisplayNameEn: 'Expense Progress',
        type: 'float',
      },
       {
        InternalName: 'ExpenseLately',
        DisplayName: 'المطالبة المالية المتأخرة',
        DisplayNameEn: 'Expense Lately',
        type: 'float',
      },
        {
        InternalName: 'LinkingProgress',
        DisplayName: 'جاري المرتبط',
        DisplayNameEn: 'Linking Progress',
        type: 'float',
      },
       {
        InternalName: 'NoActualCost',
        DisplayName: 'التكاليف غير المعتمدة',
        DisplayNameEn: 'No Actual Cost',
        type: 'float', 
      },
       {
        InternalName: 'LinkingCost',
        DisplayName: 'الارتباط',
        DisplayNameEn: 'Linking Cost',
        type: 'float',
      },
      {
        InternalName: 'RemainingCost',
        DisplayName: 'المتبقي من التكاليف الكلية',
        DisplayNameEn: 'Remaining Cost',
        type: 'float',
      },
      {
        InternalName: 'ExpensePlan',
        DisplayName: 'مخطط الصرف الشهري للمشروع',
        DisplayNameEn: 'Expense Plan',
        type: 'float',
      },
       /*  {
        InternalName: 'ExpensePlanRequest',
        DisplayName: 'مخطط صرف المطالبات المالية',
        DisplayNameEn: 'Expense Plan Request',
        type: 'float',
      },*/
    ],
    security: {
      groups: ["VRO_E", "LMS_E", "EPMO", "System Admin Group"],
       },
  },
   {
    label: 'المنظور التحليلي',
    labelEn: 'Analysis Section',
    description: '',
    descriptionEn: '',
    subFields: [
      
         {
        InternalName: 'Analysis',
        DisplayName: 'التحليل',
        DisplayNameEn: 'Analysis',
        type: 'multiline'
      },
       {
        InternalName: 'SuggestSolution',
        DisplayName: 'المعالجة المقترحة',
        DisplayNameEn: 'Suggest Solution',
        type: 'multiline'
      }
   ]},
  {
    label: 'بيانات المخرج الرئيسي',
    labelEn: 'Delivrable Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    sectiontype: 'master',
    // className: "disable_section", // to make the section disabled on form render
    targetlist: 'InitiativeDeliverables',
    toggleName: "Delivrables",
    subFields: [

      {
        InternalName: 'Title',
        DisplayNameEn: 'Title',
        DisplayName: 'رمز المخرج',
        type: 'string',
        maxchar: '250',
      },
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'اسم المخرج',
        type: 'string',
        maxchar: '250',
      },
      {
          "InternalName": "PlannedCompletedDate",
          "DisplayNameEn": "Planned Completed Date",
          "DisplayName":"تاريخ الاكتمال المخطط",
          "type":"datetime"
      },
      // {
      //   InternalName: 'PlannedFinishDate',
      //   DisplayNameEn: 'Planned Finish Date',
      //   DisplayName: 'تاريخ الاكتمال المخطط',
      //   type: 'datetime',
      // },
      {
        InternalName: 'DeliverableSuccessKPI',
        DisplayNameEn: 'Deliverable Success KPI',
        DisplayName: 'مقياس نجاح المخرج',
        type: 'multiline',
      },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف المخرج',
        maxchar: 5000,
        type: 'multiline',
        // validation: 'required',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        InternalName: 'Classification',
        DisplayName: 'تصنيف المخرج',
        DisplayNameEn: 'Classification',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'operationally', value: 'operationally',
            },
            {
              display: 'transformationally', value: 'transformationally',
            },
            {
              display: 'plansandstrategies', value: 'plansandstrategies',
            },
            {
              display: 'regulationsandorganizations', value: 'regulationsandorganizations',
            },
            {
              display: 'electronicsystemandplatforms', value: 'electronicsystemandplatforms',
            },
            {
              display: 'partnershipsagreements', value: 'partnershipsagreements',
            },
            {
              display: 'servicesandproducts', value: 'servicesandproducts',
            },
            {
              display: 'studiesandreports', value: 'studiesandreports',
            },
            {
              display: 'constructionandinfrastructure', value: 'constructionandinfrastructure',
            },
            {
              display: 'operationalwork', value: 'operationalwork',
            },
            {
              display: 'newentities', value: 'newentities',
            },
          ],
        },
      
      },
  
      // {
      //   InternalName: 'Target',
      //   DisplayNameEn: 'Target',
      //   DisplayName: 'المستهدف',
      //   type: 'string',
      // },
      {
        InternalName: 'Weight',
        DisplayNameEn: 'Weight (%)',
        DisplayName: 'الوزن(%)',
        type: 'floatpercentage',
      },
      // {
      //   InternalName: 'Amount',
      //   DisplayName: 'القيمة',
      //   DisplayNameEn: 'Amount',
      //   dontSubmit: true,
      //   type: 'percentbyrelatedparent',
      //   listname: 'Initiatives',
      //   parentinternalname: 'InitiativeBudget',
      //   targetelement: 'Weight',
      //   // validation: 'required',
      // },
      {
        InternalName: 'ActualCompletedDate',
        DisplayNameEn: 'Actual Completed Date',
        DisplayName: 'تاريخ الاكتمال الفعلي',
        type: 'datetime',

      },
      // {
      //     "InternalName": "CommittedDate",
      //     "DisplayName": "تاريخ الالتزام",
      //     "DisplayNameEn": "Committed Date",
      //     "type": "datetime",
      // },
      // {
      //     "InternalName": "Completed",
      //     "DisplayNameEn": "Completed",
      //     "DisplayName":"حالة الاكتمال",
      //     "type": "yesnoradio",
      //     options: {
      //         choices: [{
      //                 display: 'yes',
      //                 value: 'yes'
      //             },
      //             {
      //                 display: 'no',
      //                 value: 'no'
      //             }
      //         ]
      //     }
      // },
      {
        InternalName: 'Delivered',
        DisplayName: 'تم التسليم',
        DisplayNameEn: 'Delivered',
        type: 'radio',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
          ],
        },
      },
      {
        InternalName: "WFStage",
        DisplayName: " الخطوة",
        DisplayNameEn: "Stage",
        type: 'lookup',
        // validation: 'required',
        source: "Tasks Configuration",
        Dispfieldkey: "TaskNameAr",
        DispfieldkeyEn: 'TaskNameEn',
        valfieldkey: "Title",
        },
        
      // {
      //     "InternalName": "RelatedBenefits",
      //     "DisplayNameEn": "Related Benefits",
      //     "DisplayName":"المنفعة المرتبطة",
      //     "type": "lookup",
      //     "source": "Benefits",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title",
      // }

    ]
  },
  {
    label: ' بيانات المعلم الرئيسي',
    labelEn: 'Milestone Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    sectiontype: 'master',
    // className: "disable_section", // to make the section disabled on form render
    targetlist: 'InitiativeMilestones',
    toggleName: 'Milestones',
    subFields: [

      {
        InternalName: 'Title',
        DisplayNameEn: 'Title',
        DisplayName: 'رمز المعلم',
        type: 'string',
        // "maxchar": "250"
      },
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'اسم المعلم',
        type: 'string',
        maxchar: '250',
      },
      // {
      //     "InternalName": "PlannedCompletedDate",
      //     "DisplayNameEn": "Planned Completed Date",
      //     "DisplayName": "تاريخ الاكتمال المخطط",
      //     "type": "datetime"
      // },
      // {
      //   InternalName: 'PlannedDate',
      //   DisplayName: 'تاريخ الاكتمال المخطط',
      //   DisplayNameEn: 'Planned Finish Date',
      //   type: 'datetime',
      //   // validation: 'required',
      // },
      {
        InternalName: 'PlannedCompletedDate',
        DisplayNameEn: 'Planned Completed Date',
        DisplayName: 'تاريخ الاكتمال المخطط',
        type: 'datetime',
        // validation: 'required',
      },
      {
        InternalName: 'Weight',
        DisplayNameEn: 'Weight',
        DisplayName: 'الوزن المكافئ للإنجاز %',
        type: 'floatpercentage',
      },
      // {
      //   InternalName: 'Amount',
      //   DisplayName: 'القيمة',
      //   DisplayNameEn: 'Amount',
      //   // dontSubmit: true,
      //   type: 'percentbyrelatedparent',
      //   listname: 'Initiatives',
      //   parentinternalname: 'InitiativeBudget',
      //   targetelement: 'Weight',
      // },

      // {
      //     "InternalName": "Completed",
      //     "DisplayNameEn": "Completed",
      //     "DisplayName": "حالة الاكتمال",
      //     "type": "yesnoradio",
      //     options: {
      //         choices: [{
      //             display: 'yes',
      //             value: 'yes'
      //         },
      //         {
      //             display: 'no',
      //             value: 'no'
      //         }
      //         ]
      //     }
      // },
      {
        InternalName: 'Delivered',
        DisplayName: 'تم التسليم',
        DisplayNameEn: 'Delivered',
        type: 'radio',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
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
        InternalName: 'ActualCompletedDate',
        DisplayNameEn: 'Actual Completed Date',
        DisplayName: 'تاريخ الاكتمال الفعلي',
        type: 'datetime',

      },
      {
        InternalName: 'RelatedInitiativeDeliverable',
        DisplayNameEn: 'Related Initiative Deliverable',
        DisplayName: 'مخرج المبادرة المرتبط',
        type: 'lookup',
        source: 'InitiativeDeliverables',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'SupportDocumentsDescription',
        DisplayNameEn: 'Support Documents Description',
        DisplayName: 'وصف الوثائق الداعمة',
        type: 'multiline',
        maxchar: '500',
      },

    ]
  },
  {
    label: 'بيانات المنفعة',
    labelEn: 'Benefit Data',
    description: '',
    descriptionEn: '',
    sectiontype: 'master',
    // className: "disable_section", // to make the section disabled on form render
    targetlist: 'Benefits',
    subFields: [
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'المنفعة',
        type: 'string',
        // validation: 'required',
        maxchar: '255',
        withletters: true,
        Errmsgkey: "withletterpattern",
      },

      {
        InternalName: 'Owner',
        DisplayNameEn: 'Benefit Owner',
        DisplayName: ' مالك المنفعة ',
        type: 'picker',
        // validation: 'required',
      },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف المنفعة',
        maxchar: 5000,
        type: 'multiline',
        // validation: 'required',
      },
      {
        InternalName: 'Weight',
        DisplayNameEn: 'Weight',
        DisplayName: 'وزن',
        type: 'floatpercentage',
        // "state": "disabled",
        // dynamic: "Initiative"
      },
      {
        InternalName: 'RelatedSubKpis',
        DisplayNameEn: 'Related Sub Kpis',
        DisplayName: 'المؤشرات الفرعية المرتبطة',
        type: 'lookupmultiselect',
        source: 'MainKPI',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        grpfieldkey: 'Title',

      },
      {
        InternalName: 'DeliverableID',
        DisplayNameEn: 'Name',
        DisplayName: 'المخرج',
        type: 'lookupchildtoparentmultiselect',
        source: 'Deliverables', // target list

        Dispfieldkey: 'Name', //display in dropdown
        valfieldkey: 'Title', // value in dropdown
        grpfieldkey: 'Title',
        //
        fieldtargetlist: 'BenefitDeliverables', // save this field in this list,
        fieldmasterkey: 'benefits'
      },
    ]
  },

]
