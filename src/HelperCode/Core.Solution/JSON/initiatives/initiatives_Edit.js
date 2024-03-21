var Information_Form = [
  {
    label: 'المبادرة',
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
        maxchar: '255',
        // withletters: true,
        Errmsgkey: 'withletterpattern',
        validation: 'required',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",  
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'Types',
        DisplayNameEn: 'Types',
        DisplayName: 'النوع',
        validation: 'required',
        stopinvokeparent: 'yes', // to not invoke dynamic in edit cause الاستراتيجية المرتبطة don't submit so the value will disaber

        dynamic: 'parent', // parent to get the child depends on this field value
        toggleValues: [
          { value: 'vision', fields: ['RelatedProgram'] }, //we can put more than 1  field
        ],
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'vision',
              value: 'vision',
              roles: [
                'LMSE','EPMO','LMSP','LMSUPerformance','LMSUControl','VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE','InitiativeManager','InitiativeOwner','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee','Administrator'
              ],
            },
            {
              display: 'strategically',
              value: 'strategically',
              roles: [
                'LMSE','EPMO','LMSP',,'LMSUPerformance','LMSUControl','VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','InitiativeManager','InitiativeOwner','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee','Administrator'
              ],
            },
            {
              display: 'lms',
              value: 'lms',
              roles: [
                'LMSE','EPMO','LMSP','LMSUExecution','LMSUPerformance','LMSUControl','VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','InitiativeManager','InitiativeOwner','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee','Administrator'
              ],
            },
            // { display: 'others', value: 'others' },
          ],
        },
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        requiredValues: [
          { value: 'vision', fields: ['Portfolio'] },
          { value: 'lms', fields: ['SubSector'] },
          { value: 'strategically', fields: ['SubSector'] },
      ],
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
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
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
      //   DisplayName: 'حالة المبادرة',
      //   DisplayNameEn: 'Initiative Stage',
      //   type: 'dropdownValues',
      //   // validation: 'required',
      //   options: {
      //     choices: [
      //       // { value: 'notstarted', display: 'notstarted' },
      //       // { value: 'inactive', display: 'inactive' },
      //       // {
      //       //   value: 'implementationnotstarted',
      //       //   display: 'implementationnotstarted',
      //       // },
      //       { value: 'executioninitiative', display: 'executioninitiative', 
      //       // otherFields: [
      //       //   // { fieldName: 'InitiativeProgressStatus', value: '' },
      //       //   // { fieldName: 'InitiativeProgressStatus', value: 'stat3' },
      //       //   // { fieldName: 'DraftStatus', value: '' },
      //       // ]
      //     },
      //       { value: 'complete', display: 'complete' },
      //       { value: 'canceled', display: 'canceled', 
      //       // otherFields: [
      //       //   { fieldName: 'InitiativeProgressStatus', value: '' },
      //       //   { fieldName: 'InitiativeProgressStatus', value: 'stat7' },
      //       //   // { fieldName: 'DraftStatus', value: '' },
      //       // ], 
      //     },
      //       { value: 'onhold', display: 'onhold',
      //       // otherFields: [
      //       //   { fieldName: 'InitiativeProgressStatus', value: '' },
      //       //   { fieldName: 'InitiativeProgressStatus', value: 'stat6' },              
      //       //   // { fieldName: 'DraftStatus', value: '' },
      //       // ], 
      //     },
      //       // { value: 'closureinitiative', display: 'closureinitiative' }
      //     ],
      //   },   security: {
      //     groups: [ ],
      //     // groups: [], // should be empty array if will use notAllowTo
      //     notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
      //       {group:"Development Unit",form:["origin"]},
      //       // {group:"EPMO",form:["origin" ]}

      //     ]
      //   },
      // },
      {
        InternalName: 'ComplianceRate',
        DisplayName: 'نسبة الإمتثال',
        DisplayNameEn: 'Compliance Rate',
        type: 'floatpercentage',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'RelatedStrategy',
        DisplayNameEn: 'Related Strategy',
        DisplayName: 'الاستراتيجية المرتبطة',        
        "validation": "required",
        // dontSubmit: true,
        type: 'lookup',
        source: 'GoalStrategy',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        seconeddynamic: 'Types', // child for this field(add it to make the field as a parent and child at the same time)
        filterField: 'Types',
        filterFieldType: 'Text',
        dynamic: 'parent', // parent for this field
        //
        notInvokeListiner: true, // to not invoke the lookup when change on parent > the filteration depends on other field also
        //
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
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
        "validation": "required",
        // dontSubmit: true,        
        descPhraseAr: "تظهر الاهداف بناء على نوع  مستوى الهدف المرتبط بالاستراتيجية المختارة",
        descPhraseEn: "The Objectives appear based on selected Level that related to selected Strategy", 
        grandFieldId: 'RelatedStrategy', // we add this field to handle the two field filtration(parent Id in current form)
        childFieldId: 'RelatedObjective', // we add this field to handle the two field filtration (child Id in current form)
        childFieldIdSource: 'Types', // we add this field to handle the two field filtration (child internal name in destination list)
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
        },   security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // validation: 'required',
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
        "validation": "required",
        dynamic: 'RelatedStrategy',
        filterField: 'RelatedStrategy',
        filterFieldType: 'Text',
        isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        fieldsinformlvl1: 'RelatedStrategy', // fields in look up list
        sourcefieldlvl1: 'RelatedStrategy',
        fieldsinformlvl2: 'RelatedObjectiveLevel', // fields in look up list
        sourcefieldlvl2: 'Types',
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
          security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
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
        descPhraseAr: "يجب ان يكون المستخدم لديه الصلاحية المناسبة",
        descPhraseEn: " User Should have right access", 
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
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
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'InitiativePM',
        DisplayNameEn: 'Initiative manager',
        DisplayName: 'مدير المبادرة ',
        type: 'picker',
        validation: 'required',
        descPhraseAr: "يجب ان يكون المستخدم لديه الصلاحية المناسبة",
        descPhraseEn: " User Should have right access", 
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: "Sector",
        DisplayName: "القطاع",
        DisplayNameEn: "Sector",
        type: "lookup",
        validation: "required",
        //from other list:
        source: "Internal Entities",
        isSector: "True",
        EntityType: "Sector",
        Dispfieldkey: "Name",
        DispfieldkeyEn: "NameEn",
        valfieldkey: "Title",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // ToggleDisabledName:"Sector"
        // security: {
        //   groups: ["VRO_E", "LMS_E", ],
        // },
      },
      {
        InternalName: "SubSector",
        DisplayName: "الوكالة",
        DisplayNameEn: "DeputyShip",
        type: "lookup",
        // validation: 'required',
        RequiredName: 'SubSector',
        //from other list:
        source: "Internal Entities",
        isSector: "True",
        EntityType: "Department",
        Dispfieldkey: "Name",
        DispfieldkeyEn: "NameEn",
        valfieldkey: "Title",
        // disableOnWfTaskStage : "S05,S09",
        // hideOnWfTaskStage  : "S05;S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // ToggleDisabledName:"SubSector"
        // security: {
        //   groups: ["VRO_E", "LMS_E", ],
        // },
      },
      {
        InternalName: 'ExternalEntities',
        DisplayName: 'الجهات الشقيقة',
        DisplayNameEn: 'External Entities',
        type: 'lookup',
        //from other list:
        source: 'Internal Entities',
        isSector: "True",
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // isRelatedToParent: true, // to show parent value depends on child like sector and subsector
        // filterField: 'ParentEntity', //InternalName Of Parent field
        // filterFieldType: 'Text', //Type In Sharepoint List for Parent field
        // RequiredName: 'ExternalEntities',

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
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        maxOnChild: true,
        childsId: [
          'PlannedCompletedDate',
          // 'ActualCompletedDate',
          'PlannedDate',
          // 'ActualCompletedDate',
          'ExpenseStartDate',
        ],
        targetOn: 'min',
      },
      {
        InternalName: 'FinishDate',
        DisplayName: 'تاريخ نهاية المبادرة ',
        DisplayNameEn: 'Finish Date',
        type: 'datetime',
        min: 'StartDate',
        validation: 'required',
        //
        maxOnChild: true,
        childsId: [
          'PlannedCompletedDate',
          // 'ActualCompletedDate',
          'PlannedDate',
          // 'ActualCompletedDate',
          'ExpenseStartDate',
        ],
        targetOn: 'max',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
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
        "validation": "required",
        DisplayName: 'وصف المبادرة',
        type: 'multiline',
        maxchar: '5000',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        // "validation": "required"
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'Classification',
        DisplayName: 'تصنيف المبادرة',
        "validation": "required",
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
          ],
        },
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
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
        enableOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        requireOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        Errmsgkey:'btwndatepattern',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'DependencyCost',
        DisplayName: 'حجم الارتباط (منصة اعتماد) ',
        DisplayNameEn: 'Dependency Cost',
        // type: 'float',
        type: 'floatpercentage',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      // {
      //     "InternalName": "InitiativeStatus",
      //     "DisplayName": "حالة توثيق المبادرة",
      //     "DisplayNameEn": "Initiative Documentation Status",
      //     "type": "string",
      // },

      // {
      //   InternalName: 'PlannedPercentageCompleted',
      //   DisplayName: 'نسبة اكتمال المبادرة المخططة ',
      //   DisplayNameEn: 'Planned Percentage Completed',
      //   type: 'floatpercentage',
      //   // "state": "disabled"
      // },
      // {
      //   InternalName: 'ActualPercentageCompleted',
      //   DisplayName: 'نسبة الإكتمال الفعلية ',
      //   DisplayNameEn: 'Actual Percentage Completed',
      //   type: 'floatpercentage',
      //   // "state": "disabled"
      // },
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
    enableOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
    requireOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
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
      //   enableOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
      //   requireOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
      // },
      {
        InternalName: 'RelatedBudgetItem',
        DisplayName: 'البند المالي المرتبط',
        DisplayNameEn: 'Related Budget Item',
        type: "string",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // //from other list:
        // source: 'Budget Items',
        // Dispfieldkey: 'Name',
        // valfieldkey: 'Title',
        // grpfieldkey: 'Title',
        // enableOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        // requireOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        // Errmsgkey: 'multiselecterr',
      },
      {
        InternalName: 'EstimatedCost',
        DisplayName: 'التكلفة التقديرية ',
        DisplayNameEn: 'Estimated Cost',
        type: 'number',
        numberOfDigits: '15',
        enableOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        requireOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'ProgramTotalCost',
        DisplayName: 'التكاليف الكلية حسب سقف البرنامج ',
        DisplayNameEn: 'Program Total Cost',
        type: 'float',
        numberOfDigits: '15',
        targetelement: 'ActualCost',
        enableOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        requireOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        sum1Element: 'ProgramTotalCost',
        sum2Element: 'ActualCost',
        totalElement: 'InitiativeBudget',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        resetElement: ['ActualCost'], // reset value of this element when there is no val in current element
      },
      {
        InternalName: 'ActualCost',
        DisplayName: 'التكاليف الكلية المعتمدة ',
        DisplayNameEn: 'Actual Cost',
        type: 'float',
        numberOfDigits: '15',
        targetelement: 'ActualCost',
        seconedtarget: 'ProgramTotalCost',
        enableOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        requireOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        max: 'ProgramTotalCost', // max value will be smaller than or equal ProgramTotalCost
        descPhraseAr:
          'القيمة يجب ان تكون اقل او يساوي التكاليف الكلية حسب سقف البرنامج',
        descPhraseEn: 'should be less than or equal the initiative budget',
        sum1Element: 'ProgramTotalCost',
        sum2Element: 'ActualCost',
        totalElement: 'InitiativeBudget',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'InitiativeBudget',
        DisplayName: 'ميزانية المبادرة ',
        DisplayNameEn: 'InitiativeBudget',
        // "state": "disabled",
        type: 'number',
        numberOfDigits: '15',
        security: {
          groups: ['EPMO', 'System Admin Group'],
        },
        enableOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        requireOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        state: 'disabled',
        descPhraseAr:
          'مجموع التكاليف الكلية حسب سقف البرنامج و التكاليف الكلية المعتمدة',
        descPhraseEn: 'total of ProgramTotalCost and ActualCost',
        resetElement: ['CurrentBuget', 'Expenditures', 'CurrentExpenditures'],
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'CurrentBuget',
        DisplayName: 'السيولة المخصصة للعام المالي الحالي ',
        DisplayNameEn: 'Current Budget',
        type: 'number',
        numberOfDigits: '15',
        enableOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        requireOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        max: 'InitiativeBudget',
        descPhraseAr: 'يجب ان تكون اقل من او يساوي ميزانية المبادرة',
        descPhraseEn: 'should be less than or equal the initiative budget',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'Expenditures',
        DisplayName: 'المنصرف الأجمالي ',
        DisplayNameEn: 'Expenditures',
        type: 'number',
        numberOfDigits: '15',
        enableOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        requireOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        max: 'InitiativeBudget',
        descPhraseAr: 'يجب ان تكون اقل من او يساوي ميزانية المبادرة',
        descPhraseEn: 'should be less than or equal the initiative budget',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'CurrentExpenditures',
        DisplayName: 'المنصرف من العالم المالي الحالي ',
        DisplayNameEn: 'Current Expenditures',
        type: 'number',
        numberOfDigits: '15',
        enableOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        requireOnWfTaskStage: 'VInStage01,SInStage01,LInStage01',
        max: 'InitiativeBudget',
        descPhraseAr: 'يجب ان تكون اقل من او يساوي ميزانية المبادرة',
        descPhraseEn: 'should be less than or equal the initiative budget',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
    ],
  },
  {
    label: 'بيانات المخرج الرئيسي',
    labelEn: 'Delivrable Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    sectiontype: 'master',
    // className: "disable_section", // to make the section disabled on form render
    targetlist: 'InitiativeDeliverables',
    subFields: [
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'اسم المخرج',
        type: 'string',
        maxchar: '255',
        // withletters: true,
        Errmsgkey: 'withletterpattern',
        validation: 'required',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",  
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
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
        // "type": "datetime",
        type: 'datetimetoparent',
        listname: 'Initiatives',
        startinternalname: 'StartDate',
        endinternalname: 'FinishDate',
        Errmsgkey:'btwndatepattern',
        // "min": "PlannedStartDate",
        // validation: 'required',
        // security: {
        //   groups: ['EPMO', 'System Admin Group'],
        // },
        security: {
          groups: [],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'DeliverableSuccessKPI',
        DisplayNameEn: 'Deliverable Success KPI',
        DisplayName: 'مقياس نجاح المخرج',
        type: 'string',
        maxchar: 255,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",  
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
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
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'Classification',
        DisplayName: 'تصنيف المخرج',
        DisplayNameEn: 'Classification',
        type: 'dropdownValues',
        validation: 'required',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
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
      //   // numberOfDigits: '15',
      //   security: {
      //     groups: [ ],
      //     // groups: [], // should be empty array if will use notAllowTo
      //     notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
      //       {group:"Development Unit",form:["origin"]},
      //       // {group:"EPMO",form:["origin" ]}

      //     ]
      //   },
      // },
      // {
      //     "InternalName": "CommittedDate",
      //     "DisplayName": "تاريخ الالتزام",
      //     "DisplayNameEn": "Committed Date",
      //     "type": "datetime",
      //     security: {
      //         groups: ['VRO_E','LMS_E',
      //             'EPMO', 'System Admin Group'
      //         ]
      //     },
      // },
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
        // validation: 'required',
        descPhraseAr: "من ميزانية المبادرة",
        descPhraseEn: " From Initiative Budget", 
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'Amount',
        DisplayName: 'القيمة',
        DisplayNameEn: 'Amount',
        dontSubmit: true,
        	"state":"disabled",
        type: 'percentbyrelatedparent',
        listname: 'Initiatives',
        parentinternalname: 'InitiativeBudget',
        targetelement: 'Weight',
        // validation: 'required',
        descPhraseAr: "من ميزانية المبادرة",
        descPhraseEn: " From Initiative Budget",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        }, 
      },
      // {
      //   InternalName: 'Weight',
      //   DisplayNameEn: 'Weight',
      //   DisplayName: 'القيمة',
      //   type: 'floatpercentage',
      //   validation: 'required',
      //   security: {
      //     groups: ['VRO_E', 'LMS_E', 'EPMO', 'System Admin Group'],
      //   },
      // },
      // {
      //   InternalName: 'Delivered',
      //   DisplayName: 'تم التسليم',
      //   DisplayNameEn: 'Delivered',
      //   type: 'dropdownValues',
      //   targetfieldrequired: 'ActualCompletedDate',
      //   options: {
      //     choices: [
      //       { display: 'yes', value: 'yes' },
      //       { display: 'no', value: 'no' },
      //     ],
      //   },  security: {
      //     groups: [ ],
      //     // groups: [], // should be empty array if will use notAllowTo
      //     notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
      //       {group:"Development Unit",form:["origin"]},
      //       // {group:"EPMO",form:["origin" ]}

      //     ]
      //   },
      // },
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
      //   // Errmsgkey:'btwndatepattern',
      //   security: {
      //     groups: [ ],
      //     // groups: [], // should be empty array if will use notAllowTo
      //     notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
      //       {group:"Development Unit",form:["origin"]},
      //       // {group:"EPMO",form:["origin" ]}

      //     ]
      //   },
      // },
      //   {
      //     InternalName: 'Completed',
      //     DisplayNameEn: 'Completed',
      //     DisplayName: 'حالة الاكتمال',
      //     type: 'yesnoradio',
      //     options: {
      //       choices: [
      //         {
      //           display: 'yes',
      //           value: 'yes',
      //         },
      //         {
      //           display: 'no',
      //           value: 'no',
      //         },
      //       ],
      //     },
      //     security: {
      //       groups: ['VRO_E', 'LMS_E', 'EPMO', 'System Admin Group'],
      //     },
      //   },

      // {
      //     "InternalName": "RelatedBenefits",
      //     "DisplayNameEn": "Related Benefits",
      //     "DisplayName":"المنفعة المرتبطة",
      //     "type": "lookup",
      //     "source": "Benefits",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title",
      //     security: {
      //         groups: ['VRO_E','LMS_E',
      //             'EPMO', 'System Admin Group'
      //         ]
      //     },
      // }
    ],
  },
  {
    label: 'بيانات المعلم الرئيسي',
    labelEn: 'Milestone Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    sectiontype: 'master',
    // className: "disable_section", // to make the section disabled on form render
    targetlist: 'InitiativeMilestones',
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayNameEn": "Title",
      //     "DisplayName":"رمز المعلم",
      //     "type":"string",
      //     "maxchar": "250"
      // },
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'اسم المعلم',
        type: 'string',
        maxchar: '255',
        // withletters: true,
        Errmsgkey: 'withletterpattern',
        validation: 'required',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",  
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'PlannedCompletedDate',
        DisplayNameEn: 'Planned Completed Date',
        DisplayName: 'تاريخ الاكتمال المخطط',
        // "type": "datetime",
        type: 'datetimetoparent',
        listname: 'Initiatives',
        startinternalname: 'StartDate',
        endinternalname: 'FinishDate',
        validation: 'required',
        security: {
          groups: ['VRO_E', 'LMS_E', 'System Admin Group', 'EPMO'],
        },
        Errmsgkey:'btwndatepattern',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
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
        validation: 'required',
        descPhraseAr: "من ميزانية المبادرة",
        descPhraseEn: " From Initiative Budget", 
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'Amount',
        DisplayName: 'القيمة',
        DisplayNameEn: 'Amount',
        dontSubmit: true,
        	"state":"disabled",
        type: 'percentbyrelatedparent',
        listname: 'Initiatives',
        parentinternalname: 'InitiativeBudget',
        targetelement: 'Weight',
        validation: 'required',
        descPhraseAr: "من ميزانية المبادرة",
        descPhraseEn: " From Initiative Budget", 
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      //   {
      //     InternalName: 'Weight',
      //     DisplayNameEn: 'Weight',
      //     DisplayName: 'الوزن المكافئ للإنجاز %',
      //     type: 'decimalpercentage',
      //     validation: 'required',
      //     security: {
      //       groups: ['VRO_E', 'LMS_E', 'System Admin Group', 'EPMO'],
      //     },
      //   },
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
      //     },
      //     security: {
      //         groups: ['VRO_E','LMS_E','System Admin Group',
      //             'EPMO'
      //         ]
      //     },
      // },
      // {
      //   InternalName: 'Delivered',
      //   DisplayName: 'تم التسليم',
      //   DisplayNameEn: 'Delivered',
      //   type: 'dropdownValues',
      //   targetfieldrequired: 'ActualCompletedDate',
      //   options: {
      //     choices: [
      //       { display: 'yes', value: 'yes' },
      //       { display: 'no', value: 'no' },
      //     ],
      //   },  security: {
      //     groups: [ ],
      //     // groups: [], // should be empty array if will use notAllowTo
      //     notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
      //       {group:"Development Unit",form:["origin"]},
      //       // {group:"EPMO",form:["origin" ]}

      //     ]
      //   },
      // },
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
      //   // Errmsgkey:'btwndatepattern',
      //   security: {
      //     groups: [ ],
      //     // groups: [], // should be empty array if will use notAllowTo
      //     notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
      //       {group:"Development Unit",form:["origin"]},
      //       // {group:"EPMO",form:["origin" ]}

      //     ]
      //   },
      // },
      // {
      //   InternalName: 'RelatedInitiativeDeliverable',
      //   DisplayNameEn: 'Related Initiative Deliverable',
      //   DisplayName: 'مخرج المبادرة المرتبط',
      //   type: 'lookup',
      //   source: 'InitiativeDeliverables',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   initiativeCodeInList: true, //value in look up drop down should be related to current project
      //   security: {
      //     groups: [ ],
      //     // groups: [], // should be empty array if will use notAllowTo
      //     notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
      //       {group:"Development Unit",form:["origin"]},
      //       // {group:"EPMO",form:["origin" ]}

      //     ]
      //   },
      // },
      {
        InternalName: 'SupportDocumentsDescription',
        DisplayNameEn: 'Support Documents Description',
        DisplayName: 'وصف الوثائق الداعمة',
        type: 'multiline',
        maxchar: '5000',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
    ],
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
        //validation: 'required',
        maxchar: '255',
        // withletters: true,
        Errmsgkey: 'withletterpattern',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },  
      },

      {
        InternalName: 'Owner',
        DisplayNameEn: 'Benefit Owner',
        DisplayName: ' مالك المنفعة ',
        type: 'picker',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        //validation: 'required',
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
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'Weight',
        DisplayNameEn: 'Weight',
        DisplayName: 'وزن',
        type: 'floatpercentage',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // "state": "disabled",
        // dynamic: "Initiative"
      },
      {
        InternalName: 'RelatedSubKpis',
        DisplayNameEn: 'Related Sub Kpis',
        DisplayName: 'المؤشرات الفرعية المرتبطة',
        type: 'lookupmultiselect',
        // validation: 'required', removed
        source: 'MainKPI',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        grpfieldkey: 'Title',
        initiativeCodeInList: true, //value in look up drop down should be related to current project
        Errmsgkey: 'multiselecterr',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'DeliverableID',
        DisplayNameEn: 'Name',
        DisplayName: 'المخرج',

        type: 'lookupchildtoparentmultiselect',
        childlist: 'Projects', //child list name
        childinternalparentname: 'RelatedInitiative', // child internal name related to parent
        childinternalparenttype: 'Text',
        childinternalname: 'Title', // child internal name need to use to parent
        source: 'Deliverables', // target list
        sourceinternalname: 'ProjectCode', // column in target list
        Dispfieldkey: 'Name', //display in dropdown
        valfieldkey: 'Title', // value in dropdown
        grpfieldkey: 'Title',
        //////////////
        fieldtargetlist: 'BenefitDeliverables', // save this field in this list(field master in master section),
        fieldmasterkey: 'benefits', // save this field in this list(field master in master section) to know the master key,
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Development Unit",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
    ],
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
