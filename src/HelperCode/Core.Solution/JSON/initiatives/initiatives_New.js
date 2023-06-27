var Information_Form = [
  {
    label: 'المبادرات',
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
        withletters: true,
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
        toggleValues: [
          { value: 'vision', fields: ['RelatedStrategyObjective'] }, //we can put more than 1  field
        ],
        type: 'dropdownValues',
        options: {
          choices: [
        
              //---start EPMO and Admin Section ----
            {
              display: 'vision',
              value: 'vision',
              roles: ['Administrator','EPMO'],//the purpose is we dont need the creation cycle if EPMO or Admin create a initiaitve
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'VisionInitiative' },
                { fieldName: 'WFStage', value: 'VInStage01' },
                { fieldName: 'DraftStatus', value: '' },
              ],
            },
            {
              display: 'strategically',
              value: 'strategically',
              roles: ['Administrator','EPMO'],//the purpose is we dont need the creation cycle if EPMO or Admin create a initiaitve
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'StrategicallyInitiative' },
                { fieldName: 'WFStage', value: 'SInStage01' },
                { fieldName: 'DraftStatus', value: '' },
              ],
            },
            {
              display: 'lms',
              value: 'lms',
              roles: ['Administrator','EPMO'],
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'LMSInitiative' },
                { fieldName: 'WFStage', value: 'LInStage01' },
                { fieldName: 'DraftStatus', value: '' },
              ],
            },

          //---end EPMO and Admin Section ----
          {
            display: 'vision',
            value: 'vision',
            // roles: ['VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE','InitiativeManager','InitiativeOwner'],
            roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl','VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE','InitiativeManager','InitiativeOwner','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'],
            otherFields: [
              { fieldName: 'WFModuleCode', value: 'VROCreateInitiative' },
              { fieldName: 'WFStage', value: 'VROCreateInitiative01' },
              { fieldName: 'DraftStatus', value: 'draft' },
            ],
          },
            {
              display: 'strategically',
              value: 'strategically',
              // roles: ['SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee','InitiativeManager','InitiativeOwner'],
              roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl','VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE','InitiativeManager','InitiativeOwner','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'],
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'EPMOCreateInitiative' },
                { fieldName: 'WFStage', value: 'EPMOCreateInitiative01' },
                { fieldName: 'DraftStatus', value: 'draft' },
              ],
            },
            {
              display: 'lms',
              value: 'lms',
              // roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl','InitiativeManager','InitiativeOwner',], groups
              roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl','VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE','InitiativeManager','InitiativeOwner','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'],
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'LMSCreateInitiative' },
                { fieldName: 'WFStage', value: 'LMSCreateInitiative01' },
                { fieldName: 'DraftStatus', value: 'draft' },
              ],
            },
            // { display: 'others', value: 'others' },

          ],
        },
        requiredValues: [{ value: 'vision', fields: ['Portfolio'] }],
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
        dontSubmit: true,
        source: 'GoalStrategy',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
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
        type: 'lookupmultiselect',
        source: 'SOs',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        grpfieldkey: 'Title',
        
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
        validation: 'required',
        isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        dynamic: 'Sector', //InternalName Of Parent field
        filterField: 'ParentEntity', //InternalName Of Parent field
        filterFieldType: 'Text', //Type In Sharepoint List for Parent field
      },
      {
        InternalName: 'StartDate',
        DisplayName: 'تاريخ بداية المبادرة ',
        DisplayNameEn: 'Start Date',
        type: 'datetime',
        max: 'FinishDate',
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
        numberOfDigits: "15"
      },

      {
        InternalName: 'ProgramTotalCost',
        DisplayName: 'التكاليف الكلية حسب سقف البرنامج ',
        DisplayNameEn: 'Program Total Cost',
        type: 'float',
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
        // targetelement: 'ActualCost',
        // seconedtarget: 'ProgramTotalCost',
        max: 'ProgramTotalCost', // max value will be smaller than or equal ProgramTotalCost
        descPhraseAr: "القيمة يجب ان تكون اقل او يساوي التكاليف الكلية حسب سقف البرنامج",
        descPhraseEn: "should be less than or equal the initiative budget",
        sum1Element: "ProgramTotalCost", // get the value for this elem
        sum2Element: "ActualCost",// get the value for this elem
        totalElement: "InitiativeBudget"// set sum value in this elem
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
        type: 'float',
        numberOfDigits: "15",
        max:"InitiativeBudget",
        descPhraseAr: "يجب ان تكون اقل من او يساوي ميزانية المبادرة",
        descPhraseEn: "should be less than or equal the initiative budget",
      },
      {
        InternalName: 'Expenditures',
        DisplayName: 'المنصرف الأجمالي ',
        DisplayNameEn: 'Expenditures',
        type: 'float',
        numberOfDigits: "15",
        max:"InitiativeBudget",
        descPhraseAr: "يجب ان تكون اقل من او يساوي ميزانية المبادرة",
        descPhraseEn: "should be less than or equal the initiative budget",
      },
      {
        InternalName: 'CurrentExpenditures',
        DisplayName: 'المنصرف من العالم المالي الحالي ',
        DisplayNameEn: 'Current Expenditures',
        type: 'float',
        numberOfDigits: "15",
        max:"InitiativeBudget",
        descPhraseAr: "يجب ان تكون اقل من او يساوي ميزانية المبادرة",
        descPhraseEn: "should be less than or equal the initiative budget",
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
    label: 'بيانات المخرج',
    labelEn: 'Delivrable Data',
    description: 'التفاصيل (يمكن ادخال القيم عند ادخال ميزانية المبادرة)',
    descriptionEn: 'Details (you can enter the values when enter the Initiative Budget)',
    sectiontype: 'master',
    className: "disable_section", // to make the section disabled on form render
    targetlist: 'InitiativeDeliverables',
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
        validation: 'required',
      },
      {
        InternalName: 'DeliverableSuccessKPI',
        DisplayNameEn: 'Deliverable Success KPI',
        DisplayName: 'مقياس نجاح المخرج  (إن وجد)',
        type: 'multiline',
        maxchar: 5000,   
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",     
      },
      {
        InternalName: 'Target',
        DisplayNameEn: 'Target',
        DisplayName: 'المستهدف (إن وجد)',
        type: 'number',
        numberOfDigits:"15"
      },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن(%)',
        DisplayNameEn: 'Weight (%)',
        type: 'weightfloatpercentage',
        listname: 'InitiativeDeliverables',
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
        listname: 'Initiatives',
        parentinternalname: 'InitiativeBudget',
        targetelement: 'Weight',
        validation: 'required',
        descPhraseAr: "من ميزانية المبادرة",
        descPhraseEn: " From Initiative Budget", 
      },
      {
        InternalName: 'ActualCompletedDate',
        DisplayNameEn: 'Actual Completed Date',
        DisplayName: 'تاريخ الاكتمال الفعلي',
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Initiatives',
        startinternalname: 'StartDate',
        endinternalname: 'FinishDate',
        max: 'today',
        Errmsgkey: 'cancelationdatepattern',
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
    label: 'بيانات المعلم',
    labelEn: 'Milestone Data',
    description: 'التفاصيل (يمكن ادخال القيم عند ادخال ميزانية المبادرة)',
    descriptionEn: 'Details (you can enter the values when enter the Initiative Budget)',
    sectiontype: 'master',
    className: "disable_section", // to make the section disabled on form render
    targetlist: 'InitiativeMilestones',
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
        listname: 'Initiatives',
        parentinternalname: 'InitiativeBudget',
        targetelement: 'Weight',
        validation: 'required',
        descPhraseAr: "من ميزانية المبادرة",
        descPhraseEn: " From Initiative Budget", 
      },
      {
        InternalName: 'ActualCompletedDate',
        DisplayNameEn: 'Actual Completed Date',
        DisplayName: 'تاريخ الاكتمال الفعلي',
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Initiatives',
        startinternalname: 'StartDate',
        endinternalname: 'FinishDate',
        max: 'today',
        Errmsgkey: 'cancelationdatepattern',
      },
      {
        InternalName: 'RelatedInitiativeDeliverable',
        DisplayNameEn: 'Related Initiative Deliverable',
        DisplayName: 'مخرج المبادرة المرتبط',
        // type: 'lookup',
        source: 'InitiativeDeliverables',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        type: 'lookupWithQuery',
        queryField: 'Title',
        queryFieldType: 'Text', //ex: "Choice"
        queryFieldValue: ' ',//the purpose of this syntax is to get the field empty only
      },
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
        withletters:true,
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
