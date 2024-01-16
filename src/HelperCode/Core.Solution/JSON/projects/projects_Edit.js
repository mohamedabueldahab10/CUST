var Information_Form = [
  {
    label: "بيانات المشروع",
    labelEn: "Project Data",
    description: "",
    descriptionEn: "",
    disableOnWfTaskStage : "S05;S09",
    // hideOnWfTaskStage  : "S05;S09",
    subFields: [
      {
        InternalName: "Name",
        DisplayName: "اسم المشروع",
        DisplayNameEn: "Project Name",
        type: "string",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        // validation: 'required',
        maxchar: '255',
        // withletters:true,
        // Errmsgkey:"withletterpatternunrequired",
        // state: "disabled",
        // disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: "Portfolio",
        DisplayName: "المحفظة",
        DisplayNameEn: "Portfolio",
        type: "lookup",
        disableOnWfTaskStage : "S05,S09",
        // "validation": "required",
        //from other list:
        source: "Portfolio",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        BIlanguage: true, //added to handle portfolio bilangual
        DispfieldkeyEn: "NameEn", //added to handle portfolio bilangual
        // "state": "disabled",
        // "className":"autofill"
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: "Description",
        DisplayName: "وصف المشروع والتحديات التي يعالجها",
        DisplayNameEn: "Description",
        type: "multiline",
        validation: "required",
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // security: {
        //   groups: [
        //     "VRO_E",
        //     "LMS_E",
        //     "EPMO",
        //     "Development Unit",
        //     "System Admin Group",
        //     "Project Managers for Project Web App",
        //   ],
        // },
        // hideonstage: "1"
      },
      {
        InternalName: "ScopeOfWork",
        DisplayName: "نطاق العمل",
        DisplayNameEn: "Scope Of Work",
        type: "multiline",
        validation: "required",
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        disableOnWfTaskStage : "S05,S09",                
        enableOnWfTaskStage: "S09",
        requireOnWfTaskStage: "S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // security: {
        //   groups: [
        //     "VRO_E",
        //     "LMS_E",
        //     "EPMO",
        //     "Development Unit",
        //     "System Admin Group",
        //     "Project Managers for Project Web App",
        //   ],
        // },
        // hideonstage: "1"
      },
      {
        InternalName: "OutOfScope",
        DisplayName: "خارج نطاق العمل",
        DisplayNameEn: "Out Of Scope",
        type: "multiline",
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        disableOnWfTaskStage : "S05,S09",        
        enableOnWfTaskStage: "S09",
        requireOnWfTaskStage: "S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        //"state": "disabled"
      },
      {
        InternalName: "Assumptions",
        DisplayName: " إفتراضات المشروع",
        DisplayNameEn: "Project Assumptions",
        type: "multiline",
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        //"state": "disabled"
      },
      {
        InternalName: "PMNotes",
        DisplayName: "ملاحظات مدير المشروع",
        DisplayNameEn: "PM Notes",
        type: "multiline",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        maxchar: 5000,
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // hideonstage: "1"
      },

      // {
      //   InternalName: "FlaggedProjects",
      //   DisplayName: "مشروع مشار اليه؟",
      //   DisplayNameEn: "Is Flagged Project?",
      //   validation: "required",
      //   type: "yesnoradio",
      //   disableOnWfTaskStage : "S05,S09",
      //   security: {
      //     groups: [ ],
      //     // groups: [], // should be empty array if will use notAllowTo
      //     notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
      //       {group:"Project Managers for Project Web App",form:["origin"]},
      //       // {group:"EPMO",form:["origin" ]}

      //     ]
      //   },
      //   options: {
      //     choices: [
      //       {
      //         display: "yes",
      //         value: "yes",
      //       },
      //       {
      //         display: "no",
      //         value: "no",
      //       },
      //     ],
      //   },
      //   // security: {
      //   //   groups: [
      //   //     "VRO_E",
      //   //     "LMS_E",
      //   //     "EPMO",
      //   //     "System Admin Group",
      //   //     "Project Managers for Project Web App",
      //   //     "SPMO",
      //   //     "Development Unit",
      //   //   ],
      //   // },
      // },
      // {
      //   InternalName: "NTP",
      //   DisplayName: "NTP",
      //   DisplayNameEn: "NTP",
      //   validation: "required",
      //   type: "yesnoradio",
      //   disableOnWfTaskStage : "S05,S09",
      //   options: {
      //     choices: [
      //       {
      //         display: "yes",
      //         value: "yes",
      //       },
      //       {
      //         display: "no",
      //         value: "no",
      //       },
      //     ],
      //   },
      //   // security: {
      //   //   groups: [
      //   //     "VRO_E",
      //   //     "LMS_E",
      //   //     "EPMO",
      //   //     "System Admin Group",
      //   //     "SPMO",
      //   //     "Development Unit",
      //   //   ],
      //   // },
      // },
      
      {
        InternalName: "Committees",
        DisplayName: "اللجان",
        DisplayNameEn: "Committees",
        source: "Committees",
        type: "lookup",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // grpfieldkey: 'Title',
        // security: {
        //   groups: [
        //     "VRO_E",
        //     "LMS_E",
        //     "EPMO",
        //     "System Admin Group",
        //     "Project Managers for Project Web App",
        //     "SPMO",
        //     "Development Unit",
        //   ],
        // },
        // "maxchar": 5000,
        // hideonstage: "1"
      },
      {
        InternalName: "IsStrategicProject",
        DisplayName: "هل هو مشروع استراتيجي؟",
        DisplayNameEn: "Is Strategic Project?",
        type: "dropdownValues",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        options: {
          choices: [
            { display: "yes", value: "yes" },
            { display: "no", value: "no" },
          ],
        },
        toggleValues: [
          { value: 'yes', fields: ['InitiativeType', 'RelatedInitiative', 'RelatedInitiativeDeliverable'] }, //we can put more than 1  field
          { value: 'no', fields: [''] }, //we can put more than 1  field
        ],
        requiredValues: [
          { value: "no", fields: ["FundingSources","FundingStatus"] }, //we can put more than 1  field
        ],
        validation: "required",
      },
      
      {
        InternalName: 'InitiativeType',
        DisplayNameEn: 'Initiative Type',
        DisplayName: 'نوع المبادرة',
        ToggleName: "InitiativeType",
        validation: 'required',
        display: 'none',
        dynamic: 'parent', // parent to get the child depends on this field value
        type: 'dropdownValues',
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        toggleValues: [
          { value: 'vision', fields: ['Program'] },
          // {value:'strategically', fields:['StrategyRelatedObjective']}
        ],
        // dontSubmit: true,
        options: {
          choices: [
            {
              display: 'vision',
              value: 'vision',
              customFilterValue: "vision",
              // roles: ['Administrator', 'VROE', 'VROP'],
              // otherFields: [
              //   { fieldName: 'WFModuleCode', value: 'VROCreateProject' },
              //   { fieldName: 'WFStage', value: 'VROCreateProject01' },
              //   { fieldName: 'DraftStatus', value: 'draft' },
              // ],
            },
            {
              display: 'strategically',
              value: 'strategically',
              customFilterValue: "strategically",

              // roles: ['Administrator', 'EPMO'],
              // otherFields: [
              //   { fieldName: 'WFModuleCode', value: 'EPMOCreateProject' },
              //   { fieldName: 'WFStage', value: 'EPMOCreateProject01' },
              //   { fieldName: 'DraftStatus', value: 'draft' },
              // ],
            },
            {
              display: 'lms',
              value: 'lms',
              customFilterValue: "lms",

              // roles: ['Administrator', 'LMSE', 'LMSP'],
              // otherFields: [
              //   { fieldName: 'WFModuleCode', value: 'LMSCreateProject' },
              //   { fieldName: 'WFStage', value: 'LMSCreateProject01' },
              //   { fieldName: 'DraftStatus', value: 'draft' },
              // ],
            },
            // { display: 'others', value: 'others' },

          ],
        },
      },
      {
        InternalName: "RelatedInitiative",
        DisplayName: "المبادرة المرتبطة",
        DisplayNameEn: "Related Initiative",
        ToggleName: "RelatedInitiative",
        type: "lookup",
        //from other list:ma
        source: "Initiatives",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        dynamic: "InitiativeType", //InternalName Of Parent field
        filterField: "Types",//InternalName Of Parent field
        filterFieldType: "Text",//Type In Sharepoint List for Parent field
        targetsiblingarr: ["Sector", "SubSector", "StartDate", "FinishDate", "RelatedObjective"], // get siblings value
        // security: {
        //   groups: [
        //     "VRO_E",
        //     "LMS_E",
        //     "EPMO",
        //     "System Admin Group",
        //     "SPMO",
        //     "Development Unit",
        //   ],
        // },
        accessFilter: [
          {
            role: "VROE",
            conditions: [
              {
                field: "Types",
                type: "Text",
                values: ["vision"],
              },
            ],
          },
          {
            role: "VROP",
            conditions: [
              {
                field: "Types",
                type: "Text",
                values: ["vision"],
              },
            ],
          },
          {
            role: "LMSE",
            conditions: [
              {
                field: "Types",
                type: "Text",
                values: ["lms"],
              },
            ],
          },
          {
            role: "LMSP",
            conditions: [
              {
                field: "Types",
                type: "Text",
                values: ["lms"],
              },
            ],
          },
        ],
        // "state": "disabled",
        // "className":"autofill"
        display: 'none',
      },
      {
        InternalName: "RelatedInitiativeDeliverable",
        DisplayName: " مخرج المبادرة المرتبط",
        DisplayNameEn: "Related Initiative Deliverable",
        ToggleName: "RelatedInitiativeDeliverable",
        type: "lookupmultiselect",
        //from other list:ma
        source: "InitiativeDeliverables",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        grpfieldkey: "Title",
        display: 'none',
        // disableOnWfTaskStage : "S05,S09",
        hideOnWfTaskStage  : "S05;S09",
        state: "disabled",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: "Program",
        DisplayName: "البرنامج",
        DisplayNameEn: "Program",
        ToggleName: 'Program',
        // RequiredName: 'Ministry',
        type: 'lookupWithQuery',
        queryField: 'Types',
        queryFieldType: 'Text', //ex: "Choice"
        queryFieldValue: 'program',
        //from other list:
        source: 'SPillars',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        hideOnWfTaskStage  : "S05;S09",
          "display": "none",
          security: {
            groups: [ ],
            // groups: [], // should be empty array if will use notAllowTo
            notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
              {group:"Project Managers for Project Web App",form:["origin"]},
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
            {group:"Project Managers for Project Web App",form:["origin"]},
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
        validation: 'required',
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
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // ToggleDisabledName:"SubSector"
        // security: {
        //   groups: ["VRO_E", "LMS_E", ],
        // },
      },
      // {
      //     "InternalName": "RelatedInitiativeDeliverable",
      //     "DisplayName": " مخرج المبادرة المرتبط",
      //     "DisplayNameEn": "Related Initiative Deliverable",
      //     "type": "lookup",
      //     //from other list:ma
      //     "source": "InitiativeDeliverables",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title",

      //     "state": "disabled",
      // },
      // {
      //     "InternalName": "RelatedInitiativeMilestone",
      //     "DisplayName": " معلم المبادرة المرتبط",
      //     "DisplayNameEn": "Related Initiative Milestone",
      //     "type": "lookup",
      //     //from other list:ma
      //     "source": "InitiativeMilestones",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title",

      //     "state": "disabled",
      //     // "className":"autofill"
      // },
      // {
      //     "InternalName": "InitiativeVision",
      //     "DisplayNameEn": "Initiative Vision",
      //     "DisplayName": "مبادرة تحقيق الرؤية",
      //     // "ToggleName":"SubRelatedObjective",
      //     "type": "lookupWithQuery",
      //     "queryField": "Types",
      //     "queryFieldType": "Choices", //ex: "Choice"
      //     "queryFieldValue": "vision",
      //     //from other list:
      //     "source": "Initiatives",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title",
      //     // "display":"none"

      // },
      // {
      //     "InternalName": "InitiativeProgram",
      //     "DisplayName": "البرنامج",
      //     "DisplayNameEn": "Program",
      //     "DisplayName": "اسم البرنامج",
      //     "type": "lookup",
      //     "source": "Instruments",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title"
      // },
      // {
      //     "InternalName": "KPIs",
      //     "DisplayName": "مؤشر القياس",
      //     "DisplayNameEn": "KPIs",
      //     "type": "lookup",
      //     "source": "MainKPI",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title",
      //     security: {
      //         groups: ['VRO_E','LMS_E',
      //             'EPMO', 'System Admin Group','SPMO','Development Unit', 'Project Managers for Project Web App'
      //         ]
      //     },
      //     // "maxchar": 5000,
      //     // hideonstage: "1"
      // },
      // {
      //   InternalName: "CorrectivePlan",
      //   DisplayName: "الخطة التصحيحية",
      //   DisplayNameEn: "Corrective Plan",
      //   type: "multiline",
      //   descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
      //   descPhraseEn: "max length of letters equal 5000",
      //   maxchar: 5000,
      //   disableOnWfTaskStage : "S05,S09",
      //   security: {
      //     groups: [ ],
      //     // groups: [], // should be empty array if will use notAllowTo
      //     notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
      //       {group:"Project Managers for Project Web App",form:["origin"]},
      //       // {group:"EPMO",form:["origin" ]}

      //     ]
      //   },
        // security: {
        //   groups: [
        //     "VRO_E",
        //     "LMS_E",
        //     "EPMO",
        //     "System Admin Group",
        //     "SPMO",
        //     "Development Unit",
        //     "Project Managers for Project Web App",
        //   ],
        // },
        // "maxchar": 5000,
        // hideonstage: "1"
      // },
      {
        InternalName: "ProjectType",
        DisplayName: "نوع المشروع",
        DisplayNameEn: "Project Type",
        validation: "required",
        type: "dropdownValues",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        options: {
          choices: [
            { display: "internal", value: "Internal" },
            { display: "external", value: "External" },
          ],
        },
      },
      // {
      //   InternalName: 'Status',
      //   DisplayName: 'مرحلة المشروع',
      //   DisplayNameEn: 'Project Stage',
      //   // type: 'dropdownValues',
      //   // type: 'string',
      //   validation: 'required',
      //   options: {
      //     choices: [
      //       { value: 'notstarted', display: 'notstarted' },
      //       { value: 'completed', display: 'completed' },
      //       { value: 'inprogress', display: 'inprogress' },
      //       { value: 'onhold', display: 'onhold' },
      //       { value: 'cancelled', display: 'cancelled' },
      //       //'لم يبدء', 'مكتمل', 'قيد التقدم', 'معلق ', 'ملغى'
      //     ],
      //   },
      //   security: {
      //     groups: ['VRO_E', 'LMS_E', 'EPMO', 'System Admin Group'],
      //   },
      // },
      {
        InternalName: "Category",
        DisplayName: "تصنيف  المشروع",
        DisplayNameEn: "Category",
        validation: "required",
        type: "dropdownValues",
        options: {
          choices: [
            // شغيلي- تحولي - استراتيجي
            // { display: 'strategyproject', value: 'strategyproject' },
            {
              display: "transformativeproject",
              value: "transformativeproject",
            },
            { display: "operationalproject", value: "operationalproject" },
            { display: "technical", value: "technical" },
            { display: "others", value: "others" },
            { display: "consulting", value: "consulting" },
          ],
        },
      },
      {
        InternalName: "BaselineStartDate",
        DisplayName: "تاريخ بدء الأساس",
        DisplayNameEn: "Baseline Start Date",
        type: "datetime",
        max: "BaselineFinishDate",
        Errmsgkey: 'fromdatepattern',
        descPhraseAr: "التاريخ ضمن مدة المبادرة",
        descPhraseEn: "Date within Initiative period",
        // 
        maxOnChild: true,
        childsId: ["PlannedFinishDate", "PlannedDate", "ActualDate",
          'PlannedOfferingDate',
          'ActualOfferingDate',
          'AwardDate',
          'ContractualDate',
        ],
        targetOn: "min" ,      security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: "BaselineFinishDate",
        DisplayName: "تاريخ إنهاء الأساس",
        DisplayNameEn: "Baseline Finish Date",
        type: "datetime",
        min: "BaselineStartDate",
        Errmsgkey: 'todatepattern',
        descPhraseAr: "التاريخ ضمن مدة المبادرة",
        descPhraseEn: "Date within Initiative period", 
         security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // 
        maxOnChild: true,
        childsId: ["PlannedFinishDate", "PlannedDate", "ActualDate",
          'PlannedOfferingDate',
          'ActualOfferingDate',
          'AwardDate',
          'ContractualDate',],
        targetOn: "max"
      },

      

      {
        InternalName: "Priority",
        DisplayName: "أهمية المشروع",
        DisplayNameEn: "Priority",
        type: "dropdownValues",
        disableOnWfTaskStage : "S05,S09",
        options: {
          choices: [
            // { display: 'pr04low', value: 'pr04low' },
            { display: "pr01veryimportant", value: "pr01veryimportant" },
            { display: "pr02important", value: "pr02important" },
            { display: "pr03medium", value: "pr03medium" },
            //'مهم','مهم جدا','متوسط','منخفض'
          ],
        },
        validation: "required",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // security: {
        //   groups: [
        //     "VRO_E",
        //     "LMS_E",
        //     "EPMO",
        //     "System Admin Group",
        //     "SPMO",
        //     "Development Unit",
        //     "Project Managers for Project Web App",
        //   ],
        // },
        // "state": "disabled",
        // "className":"autofill"
      },
      {
        InternalName: "ExecutionChannels",
        DisplayName: "الجهة المنفذة",
        DisplayNameEn: "Execution Channels",
        type: "multiline",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        maxchar: 5000,
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: "ProjectOverview",
        DisplayName: "ملخص المشروع",
        DisplayNameEn: "Project Overview",
        type: "multiline",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        maxchar: 5000,
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        //"state": "disabled"
      },
      {
        InternalName: "Comments",
        DisplayName: "ملاحظات",
        DisplayNameEn: "Comments",
        type: "multiline",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        maxchar: 5000,
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // security: {
        //   groups: [
        //     "VRO_E",
        //     "LMS_E",
        //     "EPMO",
        //     "System Admin Group",
        //     "Project Managers for Project Web App",
        //     "SPMO",
        //     "Development Unit",
        //   ],
        // },
        // hideonstage: "1"
      },

      {
        InternalName: "ProjectSize",
        DisplayName: "حجم المشروع",
        DisplayNameEn: "Project Size",
        type: "dropdownValues",
        disableOnWfTaskStage : "S05,S09",
        options: {
          choices: [
            { display: "small", value: "small" },
            { display: "medium", value: "medium" },
            { display: "large", value: "large" },
          ],
        },   security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: "ProjectPriority",
        DisplayName: "أولوية المشروع",
        DisplayNameEn: "Project Priority",
        type: "dropdownValues",
        disableOnWfTaskStage : "S05,S09",
        options: {
          choices: [
            { display: "low", value: "low" },
            { display: "medium", value: "medium" },
            { display: "high", value: "high" },
          ],
        },    security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: "CompanyName",
        DisplayName: "اسم الشركة المنفذة",
        DisplayNameEn: "Company Name",
        type: "string",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        maxchar: 255,
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: "IsZeroBudgetProject",
        DisplayName: "هل هو مشروع صفرى؟",
        DisplayNameEn: "Is Zero Budget Project ?",
        // type: "yesnoradio",
        type: 'dropdownValues',
        validation: "required",
        disableOnWfTaskStage : "S05,S09",
        options: {
          choices: [
            { display: "yes", value: "yes" },
            { display: "no", value: "no" },
          ],
        },
        toggleValues: [
          { value: 'yes', fields: [] },
          { value: 'no', fields: ['FundingSection','TenderSection','BudgetSection','Delivrables','Milestones'] },
        ],   security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },

      // {
      //     "InternalName": "PlannedStartDate",
      //     "DisplayName": "تاريخ بداية المشروع المتوقع",
      //     "DisplayNameEn": "Expected Start Date ",
      //     "type": "datetime",
      //     "max": "PlannedFinishDate",
      //     "validation": "required",
      //     // "state": "disabled",
      //     // "className":"autofill"
      // },
      // {
      //     "InternalName": "PlannedFinishDate",
      //     "DisplayName": " تاريخ الانتهاء المجدول",
      //     "DisplayNameEn": "Expected End Date ",
      //     "type": "datetime",
      //     "min": "PlannedStartDate",
      //     "validation": "required",
      //     // "state": "disabled",
      //     // "className":"autofill"
      // },
      // {
      //     "InternalName": "ActualStartDate",
      //     "DisplayName": "تاريخ البدء الفعلي",
      //     "DisplayNameEn": "Actual Start Date",
      //     "type": "datetime",
      //     "max": "ActualFinishDate",
      //     "state": "disabled"
      // },
      // {
      //     "InternalName": "ActualFinishDate",
      //     "DisplayName": "تاريخ الإنهاء الفعلي",
      //     "DisplayNameEn": "Actual Finish Date",
      //     "type": "datetime",
      //     "min": "ActualStartDate",
      //     "state": "disabled"
      // },
      // {
      //     "InternalName": "BaselineBudget",
      //     "DisplayName": "تكلفة الأساس",
      //     "DisplayNameEn": "Baseline Budget",
      //     "type": "float",  hide this field based on 24-03-2022 - EPMO
      //     // "state": "disabled"
      // },
      // {
      //     "InternalName": "Agency",
      //     "DisplayName": "الوكالة",
      //     "DisplayNameEn": "Agency",
      //     "type": "lookup",
      //     "validation": "required",
      //     //from other list:
      //     "BIlanguage": true, //added to handle portfolio bilangual
      //     "DispfieldkeyEn": "NameEn",//added to handle portfolio bilangual
      //     "source": "Internal Entities",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title",
      //     security: {
      //         groups: ['VRO_E','LMS_E',
      //             'EPMO', 'System Admin Group'
      //         ]
      //     },
      // },
      // {
      //     "InternalName": "Section",
      //     "DisplayName": "القسم ذو الصلة",
      //     "DisplayNameEn": "Related Section",
      //     "type": "lookup",
      //     // "validation": "required",
      //     //from other list:
      //     "source": "Internal Entities",
      //     "isSector": "True",
      //     "EntityType": "Section",
      //     "Dispfieldkey": "Name",
      //     "DispfieldkeyEn": "NameEn",
      //     "valfieldkey": "Title",
      //     // "state": "disabled" hide this field based on 24-03-2022 - EPMO
      // },
      // {
      //     "InternalName": "TargetSegments",
      //     "DisplayName": "الشرائح المستهدفة (ان وجد)",
      //     "DisplayNameEn": "Target Segments",
      //     "type": "string",
      //     "state": "disabled"
      // },
      // {
      //     "InternalName": "HumanResourcesRequired",
      //     "DisplayName": "موارد بشرية مطلوبة",
      //     "DisplayNameEn": "Human Resources Required",
      //     "type": "string",
      //     "state": "disabled"
      // },
      // {
      //     "InternalName": "ExecutionRequirements",
      //     "DisplayName": "متطلبات التنفيذ",
      //     "DisplayNameEn": "Execution Requirements",
      //     "type": "string",
      //     "state": "disabled"
      // },
      // {
      //     "InternalName": "ScheduleSource",
      //     "DisplayName": "الجدول الزمني",
      //     "DisplayNameEn": "Schedule",
      //     "type": "string",
      //     //"state": "disabled"
      // },
      // {
      //     "InternalName": "ProjectExecutiveSummary",
      //     "DisplayName": "الملخص التنفيذي للمشروع",
      //     "DisplayNameEn": "Project Executive Summary",
      //     "type": "multiline",
      //     "maxchar": 5000,
      //     //"state": "disabled"
      // },
      // {
      //     "InternalName": "EstimatedCost",
      //     "DisplayName": "التقدير عند الاكتمال",
      //     "DisplayNameEn": "Estimated Cost",
      //     "type": "float",
      //     //"state": "disabled"
      // },
      // {
      //     "InternalName": "EstimatedEffortHours",
      //     "DisplayName": "ساعات العمل المتوقعة",
      //     "DisplayNameEn": "Estimated Effort Hours",
      //     "type": "float",
      //     // //"state": "disabled"
      // },
      // {
      //     "InternalName": "EstimatedDuration",
      //     "DisplayName": "المدة المتوقعة",
      //     "DisplayNameEn": "Estimated Duration",
      //     "type": "float",
      //     // "state": "disabled"
      // },
      // {
      //     "InternalName": "ActualDuration",
      //     "DisplayName": "المدة الفعلية",
      //     "DisplayNameEn": "Acual Duration",
      //     "type": "float",
      //     // "state": "disabled"
      // },

      // {
      //     "InternalName": "ProjectOrganization",
      //     "DisplayName": "منظمة المشروع",
      //     "DisplayNameEn": "Project Organization",
      //     "type": "multiline",
      //     "maxchar": 5000,
      //     //"state": "disabled"
      // },
      // {
      //     "InternalName": "CreatedDate",
      //     "DisplayName": "تاريخ الإنشاء",
      //     "DisplayNameEn": "Created Date",
      //     "type": "datetime",

      // },
      // {
      //     "InternalName": "LastModifiedDate",
      //     "DisplayName": "تاريخ التعديل الأخير",
      //     "DisplayNameEn": "Last Modified Date",
      //     "type": "datetime",

      // },
      // {
      //     "InternalName": "LastPublishingDate",
      //     "DisplayName": "تاريخ النشر الأخير",
      //     "DisplayNameEn": "Last Publishing Date",
      //     "type": "datetime",

      // },
      // {
      //     "InternalName": "LastStatus",
      //     "DisplayName": "اخر حالة",
      //     "DisplayNameEn": "LastStatus",
      //     "type": "datetime",

      // },
      // {
      //     "InternalName": "CancelledDate",
      //     "DisplayName": "تاريخ الالغاء",
      //     "DisplayNameEn": "Cancelled Date",
      //     "type": "datetime",

      // },
    ],
  },
  {
    label: "التمويل",
    labelEn: "Funding",
    description: "",
    descriptionEn: "",
    toggleName: 'FundingSection',
    disableOnWfTaskStage : "S05,S09",
    subFields: [
      {
        InternalName: "FundingSources",
        DisplayName: "مصادر التمويل",
        DisplayNameEn: "Funding Sources",
        type: "dropdownValues",
        // disableOnWfTaskStage : "S05,S09",
        options: {
          choices: [
            { display: "internalfinancing", value: "internalfinancing" },
            { display: "externalfinancing", value: "externalfinancing" },
            // { display: "large", value: "large" },
          ],
        },"RequiredName": "FundingSources",
        toggleValues: [
          { value: 'externalfinancing', fields: ['ExternalFundingSource'] },
        ],
        // validation: "required",
      },
      {
        InternalName: "ExternalFundingSource",
        DisplayName: "مصدر التمويل الخارجي",
        DisplayNameEn: "External FundingSource",
        type: "string",
        ToggleName: "ExternalFundingSource",
        display :'none'
      },
      {
        InternalName: "FundingStatus",
        DisplayName: "حالة التمويل",
        DisplayNameEn: "Funding Status",
        type: "dropdownValues",
        disableOnWfTaskStage : "S05,S09",
        options: {
          choices: [
            { display: "funded", value: "funded" },
            { display: "unfunded", value: "unfunded" },
            { display: "partiallyfunded", value: "partiallyfunded" },
            { display: "zero", value: "zero" },
          ],
        },   security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
    ],
  },
  {
    label: "بند الميزانية",
    labelEn: "Budget Item",
    description: "",
    descriptionEn: "",
    toggleName: 'BudgetSection',
    disableOnWfTaskStage : "S05,S09",
    subFields: [
      // {
      //   InternalName: "PRCode",
      //   DisplayName: "رمز المشتريات",
      //   DisplayNameEn: "Purchase code",
      //   type: "string",
      //   maxchar: 255,
      // },
      // {
      //   InternalName: "ERPCode",
      //   DisplayNameEn: "ERP Code",
      //   DisplayName: "ترميز موارد",
      //   type: "string",
      //   maxchar: "255",
      //   // "validation": "required"
      // },
      {
        InternalName: "BudgetItem",
        DisplayName: "البند المرتبط",
        DisplayNameEn: "Budget Item",
        type: "string", 
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // dynamic: "mainfield", //controls others data
        // //from other list:
        // source: "Budget Items",
        // Dispfieldkey: "Name",
        // valfieldkey: "Title",
        // disableOnWfTaskStage : "S05,S09",
        // "validation": "required",
        // "state": "disabled"
      },
      {
        InternalName: "Amount",
        DisplayName: "التكلفة",
        DisplayNameEn: "Amount",
        type: "float",
        disableOnWfTaskStage : "S05,S09",        
        descPhraseAr: "الحقل مطلوب لادخال المخرجات والمعالم",
        descPhraseEn: "Filed is required to add milestones and Deliverables",
        // "state": "disabled",
        dynamic: "BudgetItem", //being controlled by main field
        numberOfDigits: "15",
        resetElement:["ContractualEngagements","ExpensesDate","RemainingCost"],
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },

      // {
      //   InternalName: "Cost1",
      //   DisplayName: "التكلفة المخصصة لعام",
      //   DisplayNameEn: "Cost 1",
      //   type: "float",
      //   state: "disabled",
      //   dynamic: "BudgetItem",
      // },
      // {
      //   InternalName: "Cost2",
      //   DisplayName: "التكلفة المخصصة لعام",
      //   DisplayNameEn: "Cost 2",
      //   type: "float",
      //   state: "disabled",
      //   dynamic: "BudgetItem",
      // },
      // {
      //   InternalName: "Cost3",
      //   DisplayName: "التكلفة المخصصة لعام",
      //   DisplayNameEn: "Cost 3",
      //   type: "float",
      //   state: "disabled",
      //   dynamic: "BudgetItem",
      // },
      // {
      //   InternalName: "AssignedBudget",
      //   DisplayName: "الميزانية المعتمدة",
      //   DisplayNameEn: "Assigned Budget",
      //   type: "float",
      //   numberOfDigits:"15",
      //   //"state": "disabled"
      //   // "showonstage":"1"
      // },
      {
        InternalName: "ExpectedBudget",
        DisplayName: "الموازنة المتوقعة",
        DisplayNameEn: "Expected Budget",
        type: "float",
        // state: "disabled",
        numberOfDigits: "15",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: "ActualBudget",
        DisplayName: "التكلفة الفعلية",
        DisplayNameEn: "Actual Budget",
        type: "float",
        disableOnWfTaskStage : "S05,S09",
        // "state": "disabled"
        RequiredName: "ActualBudget",        
        descPhraseAr: "الحقل مطلوب لادخال المخرجات والمعالم",
        descPhraseEn: "Filed is required to add milestones and Deliverables", 
        numberOfDigits: "15",
        resetElement:["ContractualEngagements","ExpensesDate","RemainingCost"],
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      // {
      //     "InternalName": "Cost4",
      //     "DisplayName": "التكلفة المخصصة لعام",
      //     "DisplayNameEn": "Cost 4",
      //     "type": "float",
      //     "state": "disabled",
      //     dynamic: "BudgetItem"
      // },
      // {
      //     "InternalName": "Cost5",
      //     "DisplayName": "التكلفة المخصصة لعام",
      //     "DisplayNameEn": "Cost 5",
      //     "type": "float",
      //     "state": "disabled",
      //     dynamic: "BudgetItem"
      // },
      // {
      //     "InternalName": "ContractualValue",
      //     "DisplayName":"قيمة العقد (قيمة المشروع)",
      //     "DisplayNameEn":"Contractual Value",
      //     "type":"float"
      // },
      // {
      //   InternalName: 'ActualCostWorkCompleted',
      //   DisplayName: 'التكلفة الفعلية للعمل المنجز',
      //   DisplayNameEn: 'Actual Cost Work Completed',
      //   type: 'float',
      //   // "state": "disabled"
      // },

      // {
      //   InternalName: 'ProjectBudgetCost',
      //   DisplayName: 'تكلفة ميزانية المشروع',
      //   DisplayNameEn: 'Project Budget Cost',
      //   type: 'float',
      //   // "state": "disabled"
      // },
      {
        InternalName: "ContractualEngagements",
        DisplayName: "الارتباطات التعاقدية",
        DisplayNameEn: "ContractualEngagements",
        type: "float",
        numberOfDigits: "15",
        max:"ActualBudget",
        disableOnWfTaskStage : "S05,S09",
        descPhraseAr: "يجب ان تكون اقل من او يساوي التكلفة الفعلية او التكلفة",
        descPhraseEn: "should be less than or equal Actual Budget or Amount",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // "state": "disabled"
      },
      {
        InternalName: "EngagementPercentage",
        DisplayName: "نسبة الارتباط من التكاليف ",
        DisplayNameEn: "Engagement Percentage",
        type: "floatpercentage",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // "state": "disabled"
      },
      {
        InternalName: "ExpensesDate",
        DisplayName: "المنصرف حتى تاريخه",
        DisplayNameEn: "Expenses",
        type: "float",
        disableOnWfTaskStage : "S05,S09",
        numberOfDigits: "15",
        max:"ActualBudget",
        descPhraseAr: "يجب ان تكون اقل من او يساوي التكلفة الفعلية او التكلفة",
        descPhraseEn: "should be less than or equal Actual Budget or Amount",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // "state": "disabled"
      },
      {
        InternalName: "RemainingCost",
        DisplayName: "التكلفة المتبقية",
        DisplayNameEn: "Remaining Cost",
        type: "float",
        disableOnWfTaskStage : "S05,S09",
        numberOfDigits: "15",
        max:"ActualBudget",
        descPhraseAr: "يجب ان تكون اقل من او يساوي التكلفة الفعلية او التكلفة",
        descPhraseEn: "should be less than or equal Actual Budget or Amount",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },

        // "state": "disabled"
      },
      {
        InternalName: "OutOfCash",
        DisplayName: "نسبة المنصرف من السيولة ",
        DisplayNameEn: "Out Of Cash",
        type: "floatpercentage",
        numberOfDigits: "15",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },

        // "state": "disabled"
      },
      // {
      //     "InternalName": "SpentBudget",
      //     "DisplayName": "المبالغ المصروفة",
      //     "DisplayNameEn": "Spent Budget",
      //     "type": "float"
      // },
      // {
      //   InternalName: "BudgetStatus",
      //   DisplayName: "حالة تمويل المشروع (حسب الحوكمة)",
      //   DisplayNameEn: "Budget Status",
      //   type: "dropdownValues",
      //   disableOnWfTaskStage : "S05,S09",
      //   options: {
      //     choices: [
      //       { display: "finance", value: "finance" },
      //       { display: "notfinanced", value: "notfinanced" },
      //       { display: "nofinance", value: "nofinance" },
      //       { display: "externalfinance", value: "externalfinance" },
      //     ],
      //   },
      //   security: {
      //     groups: [ ],
      //     // groups: [], // should be empty array if will use notAllowTo
      //     notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
      //       {group:"Project Managers for Project Web App",form:["origin"]},
      //       // {group:"EPMO",form:["origin" ]}

      //     ]
      //   },
        // security: {
        //   groups: [
        //     "VRO_E",
        //     "LMS_E",
        //     "EPMO",
        //     "System Admin Group",
        //     "SPMO",
        //     "Development Unit",
        //     "Project Managers for Project Web App",
        //   ],
        // },
        //"state": "disabled"
      // },
    ],
  },
  {
    label: "الطرح والتعاقد",
    labelEn: "Tendering and Contracting",
    description: "",
    descriptionEn: "",
    toggleName: 'TenderSection',
    enableOnWfTaskStage: "S05",
    requireOnWfTaskStage: "S05",    
    disableOnWfTaskStage : "S09",
    subFields: [
      {
        InternalName: "PlannedOfferingDate",
        DisplayName: "التاريخ المخطط للطرح",
        DisplayNameEn: "Planned Date of Offering",
        // type: "datetime",
        type: 'datetimetoparent',
        listname: 'Projects',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
        Errmsgkey:"btwndatepattern",
        enableOnWfTaskStage: "S05",
        requireOnWfTaskStage: "S05",
        disableOnWfTaskStage : "S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'ActualOfferingDate',
        DisplayName: 'تاريخ  الطرح الفعلى',
        DisplayNameEn: 'Actual Offering Date',
        // type: "datetime",
        type: 'datetimetoparent',
        listname: 'Projects',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
        max: 'today',
        Errmsgkey: 'cancelationdatepattern',
        enableOnWfTaskStage: "S05",
        requireOnWfTaskStage: "S05",
        disableOnWfTaskStage : "S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: "AwardDate",
        DisplayName: "تاريخ  الترسية",
        DisplayNameEn: "Award Date",
        // type: "datetime",
        type: 'datetimetoparent',
        listname: 'Projects',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
        Errmsgkey:'btwndatepattern',
        enableOnWfTaskStage: "S05",
        requireOnWfTaskStage: "S05",
        disableOnWfTaskStage : "S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: "ContractualDate",
        DisplayName: "تاريخ التعاقد",
        DisplayNameEn: "Contractual Date",
        // type: "datetime",
        type: 'datetimetoparent',
        listname: 'Projects',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
        Errmsgkey:'btwndatepattern',
        enableOnWfTaskStage: "S05",
        requireOnWfTaskStage: "S05",
        disableOnWfTaskStage : "S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'ApprovedBrochure',
        DisplayName: 'الكراسة المعتمدة',
        DisplayNameEn: 'Approved RFP',
        type: 'file',
        // withAddBtn: 'true',
        // InternalName: 'getfile',
        docPurpose: "Approved_RFP",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // hideOnWfTaskStage : "S09,S05",
          
      },
      {
        InternalName: "RFPStatus",
        DisplayName: "حالة الكراسة",
        DisplayNameEn: "RFP Status",
        type: "dropdownValues",
        disableOnWfTaskStage : "S09",
        // hideOnWfTaskStage : "S09,S05",
        options: {
          choices: [
            { display: "brochureapproved", value: "brochureapproved" },
            { display: "linkinginprogress", value: "linkinginprogress" },
            { display: "linked", value: "linked" },
          ],
        },
        requiredValues: [
          { value: "linked", fields: ["ActualBudget"] }, //we can put more than 1  field
        ],
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
    ],
  },
  // {
  //     label: 'المنافع المتوقعة',
  //     labelEn: 'Expected Benefits',
  //     description: "",
  //     descriptionEn: "",
  //     subFields: [{
  //         "InternalName": "ExpectedBenefits",
  //         "DisplayName": "المنافع المتوقعة",
  //         "DisplayNameEn": "Expected Benefits",
  //         "type": "string",
  //         "state": "disabled"
  //     }]
  // },
  {
    label: "فريق العمل",
    labelEn: "Project Staff",
    description: "",
    descriptionEn: "",
    disableOnWfTaskStage : "S05,S09",
    subFields: [
      // {
      //     "InternalName": "Owner",
      //     "DisplayName": "المالك",
      //     "DisplayNameEn": "Owner",
      //     "type": "picker",
      //     security: {
      //         groups: ['VRO_E','LMS_E',
      //            'EPMO', 'System Admin Group','SPMO','Development Unit',
      //         ]
      //     },

      // },
      {
        InternalName: "ProjectOwner",
        DisplayName: "مالك المشروع",
        DisplayNameEn: "Project Owner",
        type: "picker",
        validation: "required",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // security: {
        //   groups: [
        //     "VRO_E",
        //     "LMS_E",
        //     "EPMO",
        //     "System Admin Group",
        //     "SPMO",
        //     "Development Unit",
        //     "Project Managers for Project Web App",
        //   ],
        // },
      },
      {
        InternalName: "ProjectManager",
        DisplayName: "مدير المشروع",
        DisplayNameEn: "Project Manager",
        type: "picker",
        validation: "required",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      // {

      //     "InternalName": "DirectorUnit",
      //     "DisplayName": " مدير وحدة الانجاز",
      //     "DisplayNameEn": "Director Unit",
      //     "type": "picker",
      //     "validation": "required",

      // },
      {
        InternalName: "ProjectSponsor",
        DisplayName: "راعي المشروع",
        DisplayNameEn: "Project Sponsor",
        type: "picker",
        validation: "required",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // security: {
        //   groups: [
        //     "VRO_E",
        //     "LMS_E",
        //     "EPMO",
        //     "System Admin Group",
        //     "SPMO",
        //     "Development Unit",
        //     "Project Managers for Project Web App",
        //   ],
        // },
      },
      //   {
      //     InternalName: 'ObjectiveOwner',
      //     DisplayName: 'مالك الهدف (الهدف الفرعي)',
      //     DisplayNameEn: 'Objective Owner',
      //     type: 'picker',
      //   },
      // {
      //   InternalName: 'QualityOfficer',
      //   DisplayName: 'ضابط الجودة',
      //   DisplayNameEn: 'Quality Officer',
      //   type: 'picker',
      // },
      // {
      //   InternalName: 'ProjectResponsible',
      //   DisplayName: 'مسؤول المشروع',
      //   DisplayNameEn: 'Project Responsible',
      //   type: 'picker',
      // },
      // ,
      // {
      //     "InternalName": "PMORepresentative",
      //     "DisplayName": "ممثل مكتب تحكم إدارة المشاريع",
      //     "DisplayNameEn": "PMO Representative",
      //     "type": "picker"
      // }
    ],
  },
  // {
  //     label: 'الجهات المشاركة الأساسية',
  //     labelEn: 'The Main Participants',
  //     description: "",
  //     descriptionEn: "",
  //     sectiontype: "master",
  //     targetlist: "Stakeholders",
  //     subFields: [{
  //             "InternalName": "Name",
  //             "DisplayName": "الجهة",
  //             "DisplayNameEn": "Authority Name",
  //             "type": "string",
  //             "state": "disabled"
  //         },
  //         {
  //             "InternalName": "Role",
  //             "DisplayName": "الدور",
  //             "DisplayNameEn": "Role",
  //             "type": "string",
  //             "state": "disabled"
  //         }
  //     ]
  // },
  {
    label: "المشاريع الإعتمادية",
    description: "",
    descriptionEn: "",
    labelEn: "Dependency Project",
    descriptionEn: "",
    sectiontype: "master",
    targetlist: "Dependency Projects",
    disableOnWfTaskStage : "S05,S09",
    subFields: [
      {
        InternalName: "DependencyProject",
        DisplayName: "إعتمادية على مشروع اّخر",
        DisplayNameEn: "Dependency Project",
        type: "lookup",
        //from other list:
        source: "Projects",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        //"state": "disabled"
      },
      {
        InternalName: "Description",
        DisplayName: "وصف الإعتمادية",
        DisplayNameEn: "Description",
        type: "multiline",
        maxchar: 5000,
        disableOnWfTaskStage : "S05,S09",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // type: 'string',
        //"state": "disabled"
      },
    ],
  },
  {
    label: "حالة المشروع",
    labelEn: "Project Status",
    description: "",
    descriptionEn: "",
    disableOnWfTaskStage : "S05,S09",
    subFields: [
      {
        InternalName: "WorkingStatus",
        DisplayName: "حالة العمل",
        DisplayNameEn: "Working Status",
        type: "dropdownValues",
        disableOnWfTaskStage : "S05,S09",
        options: {
          choices: [
            { display: "active", value: "active" },
            { display: "stat14", value: "stat14" },
            { display: "stat13", value: "stat13" },
          ],
        },
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },

      }
    ],
  },
  {
    label: 'بيانات المخرج',
    labelEn: 'Delivrable Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    sectiontype: 'master',
    toggleName:"Delivrables",
    // className: "disable_section", // to make the section disabled on form render
    targetlist: 'Deliverables',
    disableOnWfTaskStage : "S05,S09",
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayName":"رمز المخرج",
      // "DisplayNameEn": "Deliverable Title",

      //     "type":"string",
      //     "validation": "required"
      // },
      {
        InternalName: 'Name',
        DisplayName: 'اسم المخرج',
        DisplayNameEn: 'Name',
        type: 'string',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        validation: 'required',
        maxchar: '255',
        // withletters: true,
        Errmsgkey: "withletterpattern",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'Description',
        DisplayName: 'الوصف',
        DisplayNameEn: 'Description',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      // {
      //     "InternalName": "Weight",
      //     "DisplayName": "الوزن / القيمة (%)",
      //     "DisplayNameEn": "Weight/Value (%)",
      //     "type": "floatpercentage",
      //     "validation": "required",

      // },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن(%)',
        DisplayNameEn: 'Weight (%)',
        type: 'weightfloatpercentage',
        listname: 'Deliverables',
        targetcode: 'ProjectCode',
        targetelement: 'Weight',
        seconedtarget: 'Amount',
        // "state":"disabled",
        validation: 'required',
        disableOnWfTaskStage : "S05,S09",
        descPhraseAr: "من التكلفة",
        descPhraseEn: " From Budget", 
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
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
        disableOnWfTaskStage : "S05,S09",
        descPhraseAr: "من التكلفة",
        descPhraseEn: " From Budget", 
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
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
        InternalName: 'PlannedFinishDate',
        DisplayName: 'تاريخ الانتهاء المخطط',
        DisplayNameEn: 'Planned Finish Date',
        // "type": "datetime",
        type: 'datetimetoparent',
        listname: 'Projects',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
        Errmsgkey:'btwndatepattern',
        // "min": "PlannedStartDate",
        validation: 'required',
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
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

      // {
      //   InternalName: 'Delivered',
      //   DisplayName: 'تم التسليم',
      //   DisplayNameEn: 'Delivered',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       { display: 'yes', value: 'yes' },
      //       { display: 'no', value: 'no' },
      //     ],
      //   },
      // },

      {
        InternalName: 'Delivered',
        DisplayName: 'تم التسليم',
        DisplayNameEn: 'Delivered',
        targetfieldrequired: 'getFile', // to make the attache required on yes
        targetfield: 'Status',
        targetfieldvalue: 'completed',
        type: 'dropdownValues',
        disableOnWfTaskStage : "S05,S09",
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            {
              display: 'no', value: 'no',
            },
          ],
        },
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'DeliveredDate',
        DisplayName: 'تاريخ التسليم',
        DisplayNameEn: 'Delivered Date',
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Projects',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
        max: 'today',
        Errmsgkey: 'cancelationdatepattern',
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        // "validation": "required",
      },
      {
        InternalName: 'AcceptanceCriteria',
        DisplayName: 'معايير قبول المخرج',
        DisplayNameEn: 'Acceptance Criteria',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'Comments',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
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
      {
        //tried
        InternalName: 'RelatedInitiativeDeliverable',
        DisplayName: 'مخرج المبادرة المرتبط',
        DisplayNameEn: 'Related Initiative Deliverable',
        type: 'lookuptoparentchild',
        parentlist: 'Projects', //parent list name
        parentinternalname: 'RelatedInitiative', // internal name in parent list
        source: 'InitiativeDeliverables', // target list
        sourceinternalname: 'InitiativeCode', // column in target list
        Dispfieldkey: 'Name', //display in dropdown
        valfieldkey: 'Title', // value in dropdown
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'ShowInProgramReport',
        DisplayName: 'اظهار في التقرير',
        DisplayNameEn: 'Show In Program Report',
        type: 'dropdownValues',
        disableOnWfTaskStage : "S05,S09",
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
        },    security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },

      },
    ],
  },
  {
    label: 'بيانات المعلم',
    labelEn: 'Milestone Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    sectiontype: 'master',
    // className: "disable_section", // to make the section disabled on form render
    targetlist: 'Milestones',
    toggleName:'Milestones',
    // formValuesBasedOnParent: [
    //   {
    //     parentList: 'Projects',
    //     parentFieldName: 'Title',
    //     fieldName: 'InitiativeType',
    //     basedOnCondition: true,
    //     basedOnFieldName: 'Delivered',
    //     basedOnFieldValue: 'yes',
    //     valueToSet: [
    //       {
    //         condition: 'vision',
    //         values: [
    //           {
    //             fieldNameInList: 'WFModuleCode',
    //             fieldValueInList: 'VROProjMilestone',
    //           },
    //           {
    //             fieldNameInList: 'WFStage',
    //             fieldValueInList: 'VROProjMilestone01',
    //           },
    //         ],
    //       },
    //       {
    //         condition: 'lms',
    //         values: [
    //           {
    //             fieldNameInList: 'WFModuleCode',
    //             fieldValueInList: 'LMSProjMilestone',
    //           },
    //           {
    //             fieldNameInList: 'WFStage',
    //             fieldValueInList: 'LMSProjMilestone01',
    //           },
    //         ],
    //       },
    //       {
    //         condition: 'strategically',
    //         values: [
    //           {
    //             fieldNameInList: 'WFModuleCode',
    //             fieldValueInList: 'EPMOProjMilestone',
    //           },
    //           {
    //             fieldNameInList: 'WFStage',
    //             fieldValueInList: 'EPMOProjMilestone01',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],
    disableOnWfTaskStage : "S05,S09",
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayName":"رمز المعلم",
      //   "DisplayNameEn": "Milestone Title",
      //     "type":"string",
      //     "validation": "required"
      // },
      {
        InternalName: 'Name',
        DisplayName: 'اسم المعلم',
        DisplayNameEn: 'Name',
        type: 'string',
        maxchar: '255',
        // withletters: true,
        Errmsgkey: "withletterpatteWrn",
        validation: 'required',
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      // {
      //   InternalName: 'Weight',
      //   DisplayNameEn: 'Weight',
      //   DisplayName: 'الوزن المكافئ للإنجاز %',
      //   type: 'floatpercentage',
      //   // type: 'weightfloatpercentage',
      //   listname: 'Milestones',
      //   targetcode: 'ProjectCode',
      //   targetelement: 'Weight',
      //   seconedtarget: 'Amount',
      //   validation: 'required',
      //   // "state": "disabled",
      //   // dynamic: "Initiative"
      // },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن(%)',
        DisplayNameEn: 'Weight (%)',
        type: 'weightfloatpercentage',
        listname: 'Milestones',
        targetcode: 'ProjectCode',
        targetelement: 'Weight',
        seconedtarget: 'Amount',
        // "state":"disabled",
        validation: 'required',
        disableOnWfTaskStage : "S05,S09",
        descPhraseAr: "من التكلفة",
        descPhraseEn: " From Budget",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
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
        disableOnWfTaskStage : "S05,S09",
        descPhraseAr: "من التكلفة",
        descPhraseEn: " From Budget", 
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'PlannedDate',
        DisplayName: 'تاريخ الاكتمال المخطط',
        DisplayNameEn: 'Planned Finish Date',
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Projects',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
        Errmsgkey:'btwndatepattern',
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },

      //   {
      //     InternalName: 'CommittedDate',
      //     DisplayName: 'تاريخ الالتزام',
      //     DisplayNameEn: 'Committed Date',
      //     type: 'datetime',
      //     validation: 'required',
      //   },
      // {
      //     "InternalName": "ShowInProgramReport",
      //     "DisplayName": "اظهار في التقرير",
      //     "DisplayNameEn": "Show In Report",
      //      "type": "yesnoradio",
      //     options: {
      //         choices: [{
      //             display: 'yes',
      //             value: 'yes'
      //         }, {
      //             display: 'no',
      //             value: 'no'
      //         }]
      //     }

      // },
      {
        InternalName: 'Deliverables',
        DisplayName: 'المخرجات',
        DisplayNameEn: 'Deliverables',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'Description',
        DisplayName: 'الوصف',
        DisplayNameEn: 'Description',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
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
        // type: 'lookup',
        // source: 'InitiativeMilestones',
        "type": 'lookuptoparentchild',
        "parentlist": "Projects", //parent list name
        "parentinternalname": "RelatedInitiative", // internal name in parent list
        "source": "InitiativeMilestones", // target list
        "sourceinternalname": "InitiativeCode", // column in target list
        "Dispfieldkey": 'Name', //display in dropdown
        "valfieldkey": "Title",// value in dropdown
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'Delivered',
        DisplayName: 'تم التسليم',
        DisplayNameEn: 'Delivered',
        targetfieldrequired: 'getFile,ActualDate', // to make the attache required on yes
        targetfield: 'Status',
        targetfieldvalue: 'completed',
        // validation: 'required',
        type: 'dropdownValues',
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
        disableOnWfTaskStage : "S05,S09",
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
          ],
        },
      },
      {
        InternalName: 'ActualDate',
        DisplayName: 'تاريخ الاكتمال الفعلي',
        DisplayNameEn: 'Actual Date',
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Projects',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
        max: 'today',
        Errmsgkey: 'cancelationdatepattern',
        disableOnWfTaskStage : "S05,S09",
        security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
      },
      {
        InternalName: 'ShowInProgramReport',
        DisplayName: 'اظهار في التقرير',
        DisplayNameEn: 'Show In Program Report',
        type: 'dropdownValues',
        disableOnWfTaskStage : "S05,S09",
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
        },     security: {
          groups: [ ],
          // groups: [], // should be empty array if will use notAllowTo
          notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
            {group:"Project Managers for Project Web App",form:["origin"]},
            // {group:"EPMO",form:["origin" ]}

          ]
        },
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
    // hideOnWfTaskStage  : "S05;S09",
    label: "الوثائق الداعمة",
    labelEn: "Supporting Documents",
    description: "التفاصيل",
    descriptionEn: "Details",
    // disableOnWfTaskStage : "S05,S09",
   
    subFields: [
      {
        InternalName: "getfile",
        DisplayName: "المرفقات",
        DisplayNameEn: "Attachments",
        type: "file",
        withAddBtn: "true",
        // disableOnWfTaskStage : "S05,S09",
        // hideOnWfTaskStage  : "S05;S09",
      },
      {
        InternalName: "FileType",
        DisplayName: "نوع المرفق",
        DisplayNameEn: "File Type",
        type: "multiselect",
        options: {
                  choices:[
                  'الموافقات','دراسة الجدوى','ميثاق المشروع'
                ]
          }
       
      },
    ],
  },
];
