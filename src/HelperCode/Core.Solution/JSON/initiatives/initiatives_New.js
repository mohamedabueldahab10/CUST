var Information_Form = [
  {
    label: 'المبادرة',
    labelEn: 'Initiative Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    // formDefaultValues: [
    //   //VRO
    //   { fieldName: 'WFModuleCode', value: 'VROCRInitiative', roles: ['VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'VROE'], },
    //   { fieldName: 'WFStage', value: 'VROCRInitiative01', roles: ['VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'VROE'], },

    //   //EPMOCRInitiative
    //   { fieldName: 'WFModuleCode', value: 'EPMOCRInitiative', roles: ['EPMO', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'], },
    //   { fieldName: 'WFStage', value: 'EPMOCRInitiative01', roles: ['EPMO', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'], },

    //   //LMS
    //   { fieldName: 'WFModuleCode', value: 'LMSCRInitiative', roles: ['LMSE', 'LMSP', 'LMSUExecution', 'LMSUPerformance', 'LMSUControl'], },
    //   { fieldName: 'WFStage', value: 'LMSCRInitiative01', roles: ['LMSE', 'LMSP', 'LMSUExecution', 'LMSUPerformance', 'LMSUControl'], },

    // ],
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
        maxchar: '255',
        // withletters: true,
        Errmsgkey: 'withletterpattern',
        validation: 'required',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",  
      },
      {
        InternalName: 'OfficialCode',
        DisplayNameEn: 'Official Code',
        DisplayName: 'رمز المبادرة الرسمي',
        type: 'string',
        maxchar: 255,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",  
      },
      {
        InternalName: 'Types',
        DisplayNameEn: 'Types',
        DisplayName: 'النوع',
        validation: 'required',
        dynamic: 'parent', // parent to get the child depends on this field value
        type: 'dropdownValues',
        options: {
          choices: [
        
              //---start EPMO and Admin Section ----
            {
              display: 'vision',
              value: 'vision',
              roles: ['Administrator', 'EPMO','VROE',],//the purpose is we dont need the creation cycle if EPMO or Admin create a initiaitve
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'VisionInitiative' },
                { fieldName: 'WFStage', value: 'VInStage00.1' },
                { fieldName: 'Phase', value: 'P5' },
                { fieldName: 'DraftStatus', value: '' },
                // { fieldName: 'InitiativeProgressStatus', value: 'stat5' },
              ],
            },
            {
              display: 'strategically',
              value: 'strategically',
              roles: ['Administrator', 'EPMO',],//the purpose is we dont need the creation cycle if EPMO or Admin create a initiaitve
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'StrategicallyInitiative' },
                { fieldName: 'WFStage', value: 'SInStage00.1' },
                { fieldName: 'Phase', value: 'P5' },
                { fieldName: 'DraftStatus', value: '' },
                // { fieldName: 'InitiativeProgressStatus', value: 'stat5' },
                
              ],
            },
            {
              display: 'lms',
              value: 'lms',
              roles: ['Administrator', 'EPMO','LMSUExecution',],
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'LMSInitiative' },
                { fieldName: 'WFStage', value: 'LInStage00.1' },
                { fieldName: 'Phase', value: 'P5' },
                { fieldName: 'DraftStatus', value: '' },
                // { fieldName: 'InitiativeProgressStatus', value: 'stat5' },
              ],
            },

          //---end EPMO and Admin Section ----
          {
            display: 'vision',
            value: 'vision',
            // roles: ['VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE','InitiativeManager','InitiativeOwner'],
            roles: ['LMSE','LMSP','LMSUPerformance','LMSUControl','VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','InitiativeManager','InitiativeOwner','SPMOHead','SPMO','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'],
            otherFields: [
              { fieldName: 'WFModuleCode', value: 'VROCreateInitiative' },
              { fieldName: 'WFStage', value: 'VROCreateInitiative01' },
              { fieldName: 'Phase', value: 'P0' },
              { fieldName: 'DraftStatus', value: 'draft' },
            ],
          },
            {
              display: 'strategically',
              value: 'strategically',
              // roles: ['SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee','InitiativeManager','InitiativeOwner'],
              roles: ['LMSE','LMSP','LMSUPerformance','LMSUControl','VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','InitiativeManager','InitiativeOwner','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'],
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'EPMOCreateInitiative' },
                { fieldName: 'WFStage', value: 'EPMOCreateInitiative01' },
                  { fieldName: 'Phase', value: 'P0' },
                { fieldName: 'DraftStatus', value: 'draft' },
              ],
            },
            {
              display: 'lms',
              value: 'lms',
              // roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl','InitiativeManager','InitiativeOwner',], groups
              roles: ['LMSE','LMSP','LMSUPerformance','LMSUControl','VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','InitiativeManager','InitiativeOwner','SPMOHead','SPMO','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'],
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'LMSCreateInitiative' },
                  { fieldName: 'Phase', value: 'P0' },
                { fieldName: 'WFStage', value: 'LMSCreateInitiative01' },
                { fieldName: 'DraftStatus', value: 'draft' },
              ],
            },
            // { display: 'others', value: 'others' },

          ],
        },
        requiredValues: [
          { value: 'vision', fields: ['Portfolio'] },
          { value: 'lms', fields: ['SubSector'] },
          { value: 'strategically', fields: ['SubSector'] },
      ],
          toggleValues: [
          { value: 'vision', fields: ['RelatedStrategyReadonly','RelatedReadOnlyObjectiveLevel','RelatedReadonlyObjective','RelatedProgram'] },
          { value: 'lms', fields: ['RelatedStrategyReadonly','RelatedReadOnlyObjectiveLevel','RelatedReadonlyObjective'] },
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
          "display": "none"
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
        RequiredName: 'Portfolio',
      },
      {
        InternalName: 'RelatedStrategy',
        DisplayNameEn: 'Related Strategy',
        DisplayName: 'الاستراتيجية المرتبطة',
        type: 'lookup',
        // dontSubmit: true,
        source: 'GoalStrategy',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',        
        "validation": "required",
        // dynamic: 'parent',
        // dynamic: 'Types',
        // dynamic:'parent',
        seconeddynamic: 'Types',
        dynamic: 'parent', //main field that affect on other chiled field
        filterField: 'Types',
        filterFieldType: 'Text',
        notInvokeListiner: true, // to not invoke the lookup when change on parent > the filteration depends on other field also
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
        ],
      },
    
      {
        InternalName: 'RelatedObjectiveLevel',
        DisplayNameEn: 'Related Objective Level',
        DisplayName: 'مستوى الهدف المرتبط',        
        "validation": "required",
        // dontSubmit: true,
        grandFieldId: 'RelatedStrategy', // we add this field to handle the two field filtration(parent Id in current form)
        childFieldId: 'RelatedObjective', // we add this field to handle the two field filtration (child Id in current form)
        childFieldIdSource: 'Types', // we add this field to handle the two field filtration (child internal name in destination list)
        //
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'main', value: 'main' },
            { display: 'sublevel2', value: 'sublevel2' },
            { display: 'sublevel3', value: 'sublevel3' },
            // {
            //   display: 'objl1',
            //   value: 'objl1',
            // },
            // {
            //   display: 'objl2',
            //   value: 'objl2',
            // },
            // {
            //   display: 'objl3',
            //   value: 'objl3',
            // },
          ],
        },
        // validation: 'required',
      },
      // {
      //   InternalName: 'RelatedObjective',
      //   DisplayNameEn: 'Related Objective',
      //   DisplayName: 'الهدف المرتبط',
      //   type: 'lookup',
      //   source: 'SOs',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   isRelatedToParent: true, // to show parent value depends on child like sector and subsector
      //   dynamic: 'RelatedStrategy',
      //   // fieldsinlookup: "RelatedStrategy",
      //   filterField: 'RelatedStrategy',
      //   filterFieldType: 'Text',
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
      {
        InternalName: 'RelatedObjective',
        DisplayNameEn: 'Related Objective',
        DisplayName: 'الهدف المرتبط',
        type: 'lookup',
        source: 'SOs',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        grpfieldkey: 'Title',
        "validation": "required",
        descPhraseAr: "تظهر الاهداف بناء على نوع  مستوى الهدف المرتبط بالاستراتيجية المختارة",
        descPhraseEn: "The Objectives appear based on selected Level that related to selected Strategy", 
        //
        dynamic: 'RelatedStrategy',
        filterField: 'RelatedStrategy',
        filterFieldType: 'Text',
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
        ],
        "display": "none"
      },
      // {
      //   InternalName: 'RelatedProgram',
      //   DisplayNameEn: 'Related Program',
      //   DisplayName: 'اسم البرنامج التابع له',
      //   // type: 'string',
      //   // dontSubmit: true,
      //   // "source": "Instruments",
      //   // "Dispfieldkey": "Title",
      //   // "valfieldkey": "Title"
      //   type: 'lookup',
      //   grpfieldkey: 'Title',
      //   source: 'SPillars',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      // },
      {
        InternalName: 'InitiativeOwner',
        DisplayNameEn: 'Initiative Owner',
        DisplayName: 'مالك المبادرة ',
        type: 'picker',
        validation: 'required',
        descPhraseAr: "يجب ان يكون المستخدم لديه الصلاحية المناسبة",
        descPhraseEn: " User Should have right access", 
      },
      {
        InternalName: 'InitiativeActualOwner',
        DisplayNameEn: 'Initiative Actual Owner',
        DisplayName: 'المالك الفعلي للمبادرة',
        type: 'string',
        maxchar: 255,
        validation: 'required',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",  
      },
      {
        InternalName: 'InitiativePM',
        DisplayNameEn: 'Initiative manager',
        DisplayName: 'مدير المبادرة ',
        type: 'picker',
        validation: 'required',
        descPhraseAr: "يجب ان يكون المستخدم لديه الصلاحية المناسبة",
        descPhraseEn: " User Should have right access", 
      },
      {
        InternalName: 'Sector',
        DisplayName: 'القطاع',
        DisplayNameEn: 'Sector',
        type: 'lookupWithQuery',
        queryField: 'EntityType',
        queryFieldType: 'dropdownValues', //ex: "Choice"
        queryFieldValue: 'Sector',
        dynamic: 'parent',
        // type: 'lookup',
        validation: 'required',
        //from other list:
        source: 'Internal Entities',
        // isSector: 'True',
        // EntityType: 'Sector',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'SubSector',
        DisplayName: 'الوكالة',
        DisplayNameEn: 'Deputyship',
        type: 'lookup',
        //from other list:
        source: 'Internal Entities',
        // isSector: 'True',
        // EntityType: 'Department',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        // "state": "disabled"
        RequiredName: 'SubSector',
         validation: 'required',
        isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        dynamic: 'Sector', //InternalName Of Parent field
        filterField: 'ParentEntity', //InternalName Of Parent field
        filterFieldType: 'Text', //Type In Sharepoint List for Parent field
        queryField:"EntityType",
        queryFieldType:"Choice",
        queryFieldValue:"Department",
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
        isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        dynamic: 'Sector', //InternalName Of Parent field
        filterField: 'ParentEntity', //InternalName Of Parent field
        filterFieldType: 'Text', //Type In Sharepoint List for Parent field
        RequiredName: 'ExternalEntities',
        queryField:"EntityType",
        queryFieldType:"Choice",
        queryFieldValue:"ExternalEntities",
      },
      {
        InternalName: 'StartDate',
        DisplayName: 'تاريخ بداية المبادرة ',
        DisplayNameEn: 'Start Date',
        type: 'datetime',
        max: 'FinishDate',
        Errmsgkey:'fromdatepattern',
        //
        maxOnChild:true,
        childsId:["PlannedCompletedDate","ActualCompletedDate","PlannedDate","ActualCompletedDate","ExpenseStartDate"],
        targetOn:"min"
        // validation: 'required',
      },
      {
        InternalName: 'FinishDate',
        DisplayName: 'تاريخ نهاية المبادرة ',
        DisplayNameEn: 'Finish Date',
        type: 'datetime',
        min: 'StartDate',
        Errmsgkey:'todatepattern',
        //
        maxOnChild:true,
        childsId:["PlannedCompletedDate","ActualCompletedDate","PlannedDate","ActualCompletedDate","ExpenseStartDate"],
        targetOn:"max"

        
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
      //   // validation: 'required'
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
      //   // validation: 'required'
      // },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف المبادرة',
        type: 'multiline',
        maxchar: '5000',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        "validation": "required"
      },
      {
        InternalName: 'Classification',
        DisplayName: 'تصنيف المبادرة',
        DisplayNameEn: 'Classification',
        "validation": "required",        
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
            },
            // { value: 'notstarted', display: 'notstarted' },
            // { value: 'closureinitiative', display: 'closureinitiative' }
            // {
            //   value: 'transformativeproject',
            //   display: 'transformativeproject',
            // },
            // { value: 'operationalproject', display: 'operationalproject' },
          ],
        },
      },
      {
        InternalName: "IsZeroBudgetInitiative",
        DisplayName: "هل هي مبادرة صفرية؟",
        DisplayNameEn: "Is Zero Budget Intiative ?",
        // type: "yesnoradio",
        type: 'dropdownValues',
        validation: "required",
        options: {
          choices: [
            { display: "yes", value: "yes" },
            { display: "no", value: "no" },
          ],
        },
         toggleValues: [
          { value: 'yes', fields: [] },
          { value: 'no', fields: ['FundingSection', 'TenderSection', 'BudgetSection','Weight','Amount' ] },
        ],
          requiredValues: [
          { value: 'yes', fields: [] },
          { value: 'no', fields: ['ProgramTotalCost']},
        ],
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
      // {
      //   InternalName: 'ERPCode',
      //   DisplayNameEn: 'ERP Code',
      //   DisplayName: 'ترميز موارد',
      //   type: 'string',
      //   maxchar: '255',
      //   // "validation": "required"
      // },
      
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
        type: 'number',
        numberOfDigits: "15"
      },

      {
        InternalName: 'ProgramTotalCost',
        DisplayName: 'التكاليف الكلية حسب سقف البرنامج ',
        DisplayNameEn: 'Program Total Cost',
        type: 'float',
        RequiredName: "ProgramTotalCost",
        // listname: 'Initiatives',
        // parentinternalname: 'InitiativeCode',
        // targetelement: 'ActualCost',
        numberOfDigits:"15",
        resetElement: ["ActualCost"], // reset value of this element when there is no val in current element
        sum1Element: "ProgramTotalCost", // get the value for this elem
        sum2Element: "ActualCost",// get the value for this elem
        totalElement: "InitiativeBudget",// set sum value in this elem
        className: "disable_enable_section", // disable and enable section master  details specific for project and initiative cr
      },

      {
        InternalName: 'ActualCost',
        DisplayName: 'التكاليف الكلية المعتمدة ',
        DisplayNameEn: 'Actual Cost',
        type: 'float',
        numberOfDigits:"15",
        "state": "disabled",
        // targetelement: 'ActualCost',
        // seconedtarget: 'ProgramTotalCost',
        max: 'ProgramTotalCost', // max value will be smaller than or equal ProgramTotalCost
        descPhraseAr: "القيمة يجب ان تكون اقل او يساوي التكاليف الكلية حسب سقف البرنامج",
        descPhraseEn: "should be less than or equal the initiative budget",
        sum1Element: "ProgramTotalCost", // get the value for this elem
        sum2Element: "ActualCost",// get the value for this elem
        totalElement: "InitiativeBudget"// set sum value in this elem
      },
     /*  {
        InternalName: 'NoActualCost',
        DisplayName: 'التكاليف الكلية غير المعتمدة ',
        DisplayNameEn: 'No Actual Cost',
        type: 'float',
        numberOfDigits:"15",
         security: {
      groups: ["VRO_E", "LMS_E", "EPMO", "System Admin Group"],
       },
       },*/
      {
        InternalName: "FundingStatus",
        DisplayName: "حالة التمويل",
        DisplayNameEn: "Funding Status",        
        RequiredName: "ProgramTotalCost",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "funded", value: "funded" },
            { display: "unfunded", value: "unfunded" },
          /*  { display: "partiallyfunded", value: "partiallyfunded" },
            { display: "zero", value: "zero" },*/
          ],
        },
      },
      {
        InternalName: 'InitiativeBudget',
        DisplayName: 'ميزانية المبادرة ',
        DisplayNameEn: 'InitiativeBudget',
        // className: "disable_enable_section", // disable and enable section master  details specific for project and initiative cr
        // "state": "disabled",
        type: 'float',
        numberOfDigits: "15",
        state: "disabled",
        descPhraseAr:"مجموع التكاليف الكلية حسب سقف البرنامج و التكاليف الكلية المعتمدة",
        descPhraseEn:"total of ProgramTotalCost and ActualCost",
        resetElement:["CurrentBuget","Expenditures","CurrentExpenditures"]
      },
      {
        InternalName: 'CurrentBuget',
        DisplayName: 'السيولة المخصصة للعام المالي الحالي ',
        DisplayNameEn: 'Current Budget',
        
        "state": "disabled",
        type: 'float',
        numberOfDigits: "15",
        max:"InitiativeBudget",
        descPhraseAr: "يجب ان تكون اقل من او يساوي ميزانية المبادرة",
        descPhraseEn: "should be less than or equal the initiative budget",
      },
       {
        InternalName: 'ExpenseStartDate',
        DisplayName: 'تاريخ بداية الصرف',
        DisplayNameEn: 'Expense Start Date',
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Initiatives',
        startinternalname: 'StartDate',
        endinternalname: 'FinishDate',
        // min: 'StartDate',
        // max: 'FinishDate',
        Errmsgkey: 'btwndatepattern',
        // startinternalname: 'StartDate',
        // endinternalname: 'FinishDate',
      },
      {
        InternalName: 'Expenditures',
        DisplayName: 'المنصرف الأجمالي ',
        DisplayNameEn: 'Expenditures',
        type: 'number',
        numberOfDigits: "15",
        
        "state": "disabled",
        max:"InitiativeBudget",
        descPhraseAr: "يجب ان تكون اقل من او يساوي ميزانية المبادرة",
        descPhraseEn: "should be less than or equal the initiative budget",
      },
      {
        InternalName: 'CurrentExpenditures',
        DisplayName: 'المنصرف من العالم المالي الحالي ',
        DisplayNameEn: 'Current Expenditures',
        type: 'number',
        
        "state": "disabled",
        numberOfDigits: "15",
        max:"InitiativeBudget",
        descPhraseAr: "يجب ان تكون اقل من او يساوي ميزانية المبادرة",
        descPhraseEn: "should be less than or equal the initiative budget",
      },
      {
        InternalName: 'DependencyCost',
        DisplayName: 'حجم الارتباط (منصة اعتماد) ',
        DisplayNameEn: 'Dependency Cost',
        type: 'floatpercentage',
        ToggleName: 'FundingSection',
      },
     /* {
        InternalName: 'ComplianceRate',
        DisplayName: 'نسبة الإمتثال',
        DisplayNameEn: 'Compliance Rate',
        type: 'floatpercentage',
        ToggleName: 'FundingSection',
      },*/
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
    label: 'بيانات المخرج الرئيسي',
    labelEn: 'Delivrable Data',
    description: 'التفاصيل (يمكن ادخال القيم عند ادخال ميزانية المبادرة)',
    descriptionEn: 'Details (you can enter the values when enter the Initiative Budget)',
    sectiontype: 'master',
   // className: "disable_section", // to make the section disabled on form render
    targetlist: 'InitiativeDeliverables',
    ToggleName: "Delivrables",
    subFields: [
      
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'اسم المخرج',
        type: 'string',
        maxchar: '255',
        withletters:true,
        Errmsgkey:"withletterpattern",
        validation: 'required',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",  
      },
      // {
      //   InternalName: 'PlannedFinishDate',
      //   DisplayName: 'تاريخ الانتهاء المخطط',
      //   DisplayNameEn: 'Planned Finish Date',
      //   // "type": "datetime",
      //   type: 'datetimetoparent',
      //   listname: 'Initiatives',
      //   startinternalname: 'StartDate',
      //   endinternalname: 'FinishDate',
      //   // "min": "PlannedStartDate",
      //   validation: 'required',
      // },
      {
        InternalName: 'PlannedCompletedDate',
        DisplayName: 'تاريخ الاكتمال المخطط',
        DisplayNameEn: 'Planned Completed Date',
        type: 'datetimetoparent',
        listname: 'Initiatives',
        startinternalname: 'StartDate',
        endinternalname: 'FinishDate',
        // validation: 'required',
        Errmsgkey:'btwndatepattern',
      },
      {
        InternalName: 'DeliverableSuccessKPI',
        DisplayNameEn: 'Deliverable Success KPI',
        DisplayName: 'مقياس نجاح المخرج',
        type: 'multiline',
        maxchar: 5000,   
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",     
      },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف المخرج',
        maxchar: 5000,
        type: 'multiline',
        validation: 'required',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        InternalName: 'Classification',
        DisplayName: 'تصنيف المخرج',
        DisplayNameEn: 'Classification',
        validation: 'required',
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
      //   // numberOfDigits:"15"
      // },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن(%)',
        DisplayNameEn: 'Weight (%)',
        type: 'weightfloatpercentage',
        ToggleName: 'Weight',
        listname: 'InitiativeDeliverables',
        targetcode: 'InitiativeCode',
        targetelement: 'Weight',
        seconedtarget: 'Amount',
        // "state":"disabled",
        // validation: 'required',
        descPhraseAr: "من ميزانية المبادرة",
        descPhraseEn: " From Initiative Budget", 
      },
     {
        InternalName: 'Amount',
        DisplayName: 'القيمة',
        DisplayNameEn: 'Amount',
        dontSubmit: true,
        type: 'percentbyrelatedparent',
        ToggleName: 'Amount',
        listname: 'Initiatives',
        parentinternalname: 'InitiativeBudget',
        targetelement: 'Weight',
        // validation: 'required',
        descPhraseAr: "من ميزانية المبادرة",
        descPhraseEn: " From Initiative Budget", 
      },
      // {
      //   InternalName: 'ActualCompletedDate',
      //   DisplayNameEn: 'Actual Completed Date',
      //   DisplayName: 'تاريخ الاكتمال الفعلي',
      //   type: 'datetime',
      //   // type: 'datetimetoparent',
      //   // listname: 'Initiatives',
      //   // startinternalname: 'StartDate',
      //   // endinternalname: 'FinishDate',
      //   // max: 'today',
      //   // Errmsgkey: 'cancelationdatepattern',
      // },
      {
        InternalName: 'getfile',
        DisplayName: 'المرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        // withAddBtn: 'true',
      },
    
    ]
  },
  {
    label: 'بيانات المعلم الرئيسي',
    labelEn: 'Milestone Data',
    description: 'التفاصيل (يمكن ادخال القيم عند ادخال ميزانية المبادرة)',
    descriptionEn: 'Details (you can enter the values when enter the Initiative Budget)',
    sectiontype: 'master',
  //  className: "disable_section", // to make the section disabled on form render
    targetlist: 'InitiativeMilestones',
    ToggleName: 'Milestones',
    subFields: [
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'اسم المعلم',
        type: 'string',
        maxchar: '255',
        withletters:true,
        Errmsgkey:"withletterpattern",
        validation: 'required',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",  
      },
      {
        InternalName: 'PlannedCompletedDate',
        DisplayNameEn: 'Planned Completed Date',
        DisplayName: 'تاريخ الاكتمال المخطط',
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Initiatives',
        startinternalname: 'StartDate',
        endinternalname: 'FinishDate',
        validation: 'required',
        Errmsgkey:'btwndatepattern',
      },
      // {
      //   InternalName: 'PlannedDate',
      //   DisplayName: 'تاريخ الاكتمال المخطط',
      //   DisplayNameEn: 'Planned Finish Date',
      //   type: 'datetime',
      //   validation: 'required',
      // },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن المكافئ للإنجاز %',
        DisplayNameEn: 'Weight (%)',
        type: 'weightfloatpercentage',
        ToggleName: 'Weight',
        listname: 'InitiativeMilestones',
        targetcode: 'InitiativeCode',
        targetelement: 'Weight',
        seconedtarget: 'Amount',
        // "state":"disabled",
        validation: 'required',
        descPhraseAr: "من ميزانية المبادرة",
        descPhraseEn: " From Initiative Budget", 
      },
      {
        InternalName: 'Amount',
        DisplayName: 'القيمة',
        DisplayNameEn: 'Amount',
        dontSubmit: true,
        type: 'percentbyrelatedparent',
        ToggleName: 'Amount',
        listname: 'Initiatives',
        parentinternalname: 'InitiativeBudget',
        targetelement: 'Weight',
        validation: 'required',
        descPhraseAr: "من ميزانية المبادرة",
        descPhraseEn: " From Initiative Budget", 
      },
      // {
      //   InternalName: 'ActualCompletedDate',
      //   DisplayNameEn: 'Actual Completed Date',
      //   DisplayName: 'تاريخ الاكتمال الفعلي',
      //   type: 'datetime',
      //   // type: 'datetimetoparent',
      //   // listname: 'Initiatives',
      //   // startinternalname: 'StartDate',
      //   // endinternalname: 'FinishDate',
      //   // max: 'today',
      //   // Errmsgkey: 'cancelationdatepattern',
      // },
      // {
      //   InternalName: 'RelatedInitiativeDeliverable',
      //   DisplayNameEn: 'Related Initiative Deliverable',
      //   DisplayName: 'مخرج المبادرة المرتبط',
      //   // type: 'lookup',
      //   source: 'InitiativeDeliverables',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   type: 'lookupWithQuery',
      //   queryField: 'Title',
      //   queryFieldType: 'Text', //ex: "Choice"
      //   queryFieldValue: ' ',//the purpose of this syntax is to get the field empty only
      // },
      {
        InternalName: 'SupportDocumentsDescription',
        DisplayNameEn: 'Support Documents Description',
        DisplayName: 'وصف الوثائق الداعمة',
        type: 'multiline',
        maxchar: '5000',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",  
      },
      {
        InternalName: 'getfile',
        DisplayName: 'المرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        // withAddBtn: 'true',
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
        // withletters:true,
        Errmsgkey:"withletterpattern",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",  
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
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",  
      },
      {
        InternalName: "Weight",
        DisplayNameEn: "Weight",
        DisplayName: "وزن",
        type: "floatpercentagemaxfromparent",
        validation: "required",
        descPhraseAr: "%يجب ان يكون مجموع أوزان المنافع 100",
        descPhraseAn: "The total weight of benefits must be 100%",
        siblingslistname: "Benefits",
        siblingstargetcode: "InitiativeCode",
      },
      {
        InternalName: 'RelatedSubKpis',
        DisplayNameEn: 'Related Sub Kpis',
        DisplayName: 'المؤشرات الفرعية المرتبطة',
        type: 'lookupmultiselect',
        // validation: 'required',
        source: 'MainKPI',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        grpfieldkey: 'Title',
        initiativeCodeInList: true,//value in look up drop down should be related to current project
        Errmsgkey: 'multiselecterr',
        // queryField: 'Types', // if i need to make the field with filter should add this like lookupwithquery type
        // queryFieldType: 'dropdownValues', //ex: "Choice"// if i need to make the field with filter should add this
        // queryFieldValue: 'sublevel2,sublevel3', // if i need to make the field with filter should add this
      },
      {
        InternalName: 'DeliverableID',
        DisplayNameEn: 'Name',
        DisplayName: 'المخرج',
  
        type: 'lookupchildtoparentmultiselect',
        childlist: 'Projects', //child list name
        childinternalparentname: 'RelatedInitiative', // child internal name related to parent
        childinternalparenttype:'Text',
        childinternalname:"Title", // child internal name need to use to parent
        source: 'Deliverables', // target list
        sourceinternalname: 'ProjectCode', // column in target list
        Dispfieldkey: 'Name', //display in dropdown
        valfieldkey: 'Title', // value in dropdown
        grpfieldkey: 'Title',
        // valsiblingkey:'AcceptanceCriteria', // internal name on sorce list
        // targetsiblingkey:'AcceptanceCriteria' // internal name on current list
      },
    ]
  },
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
