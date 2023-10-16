var Information_Form = [
  {
    label: "بيانات المشروع",
    labelEn: "Project Data",
    description: "",
    descriptionEn: "",
    // formDefaultValues: [
    //   //VRO
    //   { fieldName: 'WFModuleCode', value: 'VROCreateProject', roles: ['VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'VROE'], },
    //   { fieldName: 'WFStage', value: 'VROCreateProject01', roles: ['VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'VROE'], },

    //   //EPMO
    //   { fieldName: 'WFModuleCode', value: 'EPMOCreateProject',roles: ['EPMO','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },
    //   { fieldName: 'WFStage', value: 'EPMOCreateProject01',roles: ['EPMO','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },

    //   //LMS
    //   { fieldName: 'WFModuleCode', value: 'LMSCreateProject',roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },
    //   { fieldName: 'WFStage', value: 'LMSCreateProject01',roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },

    // ],
    subFields: [
      {
        InternalName: "Name",
        DisplayName: "اسم المشروع",
        DisplayNameEn: "Project Name",
        type: "string",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        maxchar: '255',
        // withletters: true,
        Errmsgkey: "withletterpattern",
        validation: "required",
        // security: {
        //   groups: ["VRO_E", "LMS_E", "EPMO", "System Admin Group"],
        // },
      },
      {
        InternalName: "Portfolio",
        DisplayName: "المحفظة",
        DisplayNameEn: "Portfolio",
        type: "lookup",
        // "validation": "required",
        //from other list:
        source: "Portfolio",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        BIlanguage: true, //added to handle portfolio bilangual
        DispfieldkeyEn: "NameEn", //added to handle portfolio bilangual
        // "state": "disabled",
        // "className":"autofill"
      },
      {
        InternalName: "Description",
        DisplayName: "وصف المشروع والتحديات التي يعالجها",
        DisplayNameEn: "Description",
        type: "multiline",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        validation: "required",
        maxchar: 5000,
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
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        validation: "required",
        maxchar: 5000,
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
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        maxchar: 5000,
        //"state": "disabled"
      },
      {
        InternalName: "Assumptions",
        DisplayName: " إفتراضات المشروع",
        DisplayNameEn: "Project Assumptions",
        type: "multiline",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        maxchar: 5000,
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
        // hideonstage: "1"
      },

      {
        InternalName: "FlaggedProjects",
        DisplayName: "مشروع مشار اليه؟",
        DisplayNameEn: "Is Flagged Project?",
        validation: "required",
        type: "yesnoradio",
        options: {
          choices: [
            {
              display: "yes",
              value: "yes",
            },
            {
              display: "no",
              value: "no",
            },
          ],
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
      },
      // {
      //   InternalName: "NTP",
      //   DisplayName: "NTP",
      //   DisplayNameEn: "NTP",
      //   validation: "required",
      //   type: "yesnoradio",
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
        options: {
          choices: [
            { display: "yes", value: "yes" },
            {
              display: "no", value: "no",
              roles: ['Administrator', 'EPMO','LMSUExecution','VROE',],
              otherFields: [
                { fieldName: 'Phase', value: 'P1' },
                { fieldName: 'Stage', value: 'S01' },
                { fieldName: 'InitiativeType', value: 'strategically' },
              ],
            },
            {//allroles
              // display: "no", value: "no", roles: ['allRoles'],
              display: "no", value: "no", roles: ['VROHead','VROPHead','VROP','ProjectManager','InitiativeOwner','InitiativeManager','ProjectOwner','VPlanningUnitHead','VPlanningUnit','VROEHead','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee','LMSE','LMSP','LMSUPerformance','LMSUControl'],
            
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'EPMOCreateProject' },
                { fieldName: 'WFStage', value: 'EPMOCreateProject01' },
                { fieldName: 'InitiativeType', value: 'strategically' },
                { fieldName: 'DraftStatus', value: 'draft' },
                { fieldName: 'Phase', value: 'P0' },
                { fieldName: 'Stage', value: 'S00' },
              ],
            },


          ],
        },
        toggleValues: [
          { value: 'yes', fields: ['InitiativeType', 'RelatedInitiative', 'RelatedInitiativeDeliverable'] }, //we can put more than 1  field
        ],
        toggleDisabledValues: [
          { value: 'yes', fields: ['Sector', 'SubSector'] },
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
        toggleValues: [
          { value: 'vision', fields: ['Program'] },
          // {value:'strategically', fields:['StrategyRelatedObjective']}
        ],
        // dontSubmit: true,
        options: {
          choices: [
            ///for Admin and EPMO
            {
              display: 'vision',
              value: 'vision',
              customFilterValue: "vision",
              roles: ['Administrator','EPMO','LMSUExecution','VROE',],
              otherFields: [
                { fieldName: 'Stage', value: 'S01' },
                { fieldName: 'Phase', value: 'P1' },
              ],
            },
            {
              display: 'strategically',
              value: 'strategically',
              customFilterValue: "strategically",
              roles: ['Administrator','EPMO','LMSUExecution','VROE'],
              otherFields: [
                { fieldName: 'Stage', value: 'S01' },
                { fieldName: 'Phase', value: 'P1' },
              ],
            },
            {
              display: 'lms',
              value: 'lms',
              customFilterValue: "lms",
              roles: ['Administrator','EPMO','LMSUExecution','VROE',],
              otherFields: [
                { fieldName: 'Stage', value: 'S01' },
                { fieldName: 'Phase', value: 'P1' },
              ],
              // other roles

            },

            {
              display: 'vision',
              value: 'vision',
              customFilterValue: "vision",
              roles: ['VROHead','VROPHead','VROP','ProjectManager','InitiativeOwner','InitiativeManager','ProjectOwner','VPlanningUnitHead','VPlanningUnit','VROEHead','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee','LMSE','LMSP','LMSUPerformance','LMSUControl'],
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'VROCreateProject' },
                { fieldName: 'WFStage', value: 'VROCreateProject01' },
                { fieldName: 'DraftStatus', value: 'draft' },
                { fieldName: 'Phase', value: 'P0' },
                { fieldName: 'Stage', value: 'S00' },
              ],
            },
            {
              display: 'strategically',
              value: 'strategically',
              customFilterValue: "strategically",
              roles: ['VROHead','VROPHead','VROP','ProjectManager','InitiativeOwner','InitiativeManager','ProjectOwner','VPlanningUnitHead','VPlanningUnit','VROEHead','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee','LMSE','LMSP','LMSUPerformance','LMSUControl'],
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'EPMOCreateProject' },
                { fieldName: 'WFStage', value: 'EPMOCreateProject01' },
                { fieldName: 'DraftStatus', value: 'draft' },
                { fieldName: 'Phase', value: 'P0' },
                { fieldName: 'Stage', value: 'S00' },
              ],
            },
            {
              display: 'lms',
              value: 'lms',
              customFilterValue: "lms",
              roles: ['VROHead','VROPHead','VROP','ProjectManager','InitiativeOwner','InitiativeManager','ProjectOwner','VPlanningUnitHead','VPlanningUnit','VROEHead','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee','LMSE','LMSP','LMSUPerformance','LMSUControl'],
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'LMSCreateProject' },
                { fieldName: 'WFStage', value: 'LMSCreateProject01' },
                { fieldName: 'DraftStatus', value: 'draft' },
                { fieldName: 'Phase', value: 'P0' },
                { fieldName: 'Stage', value: 'S00' },
              ],
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
        targetsiblingarr: ["Sector", "SubSector","StartDate","FinishDate","RelatedObjective"], // get siblings value
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
        display: 'none',
        type: "lookupmultiselect",
        //from other list:ma
        source: "InitiativeDeliverables",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        grpfieldkey: "Title",
        state: "disabled",
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
          "display": "none"
      },
      {
        InternalName: "Sector",
        DisplayName: "القطاع",
        DisplayNameEn: "Sector",
        type: "lookup",
        validation: "required",
        valsiblingkey: 'ERPID', // to use it on roles filter on data

        //from other list:
        source: "Internal Entities",
        isSector: "True",
        EntityType: "Sector",
        Dispfieldkey: "Name",
        DispfieldkeyEn: "NameEn",
        valfieldkey: "Title",
        ToggleDisabledName: "Sector",
        // security: {
        //   groups: ["VRO_E", "LMS_E", "EPMO", "System Admin Group"],
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
        ToggleDisabledName: "SubSector",
        valsiblingkey: 'ERPID', // to use it on roles filter on data


        // security: {
        //   groups: ["VRO_E", "LMS_E", "EPMO", "System Admin Group"],
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
      {
        InternalName: "CorrectivePlan",
        DisplayName: "الخطة التصحيحية",
        DisplayNameEn: "Corrective Plan",
        type: "multiline",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        maxchar: 5000,
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
      },
      {
        InternalName: "ProjectType",
        DisplayName: "نوع المشروع",
        DisplayNameEn: "Project Type",
        validation: "required",
        type: "dropdownValues",
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
          ],
        },
      },
      {
        InternalName: "BaselineStartDate",
        DisplayName: "تاريخ بدء الأساس",
        DisplayNameEn: "Baseline Start Date",
        type: "datetime",
        max: "BaselineFinishDate",
        Errmsgkey:'fromdatepattern',
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
        targetOn: "min"
      },
      {
        InternalName: "BaselineFinishDate",
        DisplayName: "تاريخ إنهاء الأساس",
        DisplayNameEn: "Baseline Finish Date",
        type: "datetime",
        min: "BaselineStartDate",
        Errmsgkey:'todatepattern',
        descPhraseAr: "التاريخ ضمن مدة المبادرة",
        descPhraseEn: "Date within Initiative period",
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

      },
      {
        InternalName: "ProjectOverview",
        DisplayName: "ملخص المشروع",
        DisplayNameEn: "Project Overview",
        type: "multiline",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        maxchar: 5000,
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
        options: {
          choices: [
            { display: "small", value: "small" },
            { display: "medium", value: "medium" },
            { display: "large", value: "large" },
          ],
        },
      },
      {
        InternalName: "ProjectPriority",
        DisplayName: "أولوية المشروع",
        DisplayNameEn: "Project Priority",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "low", value: "low" },
            { display: "medium", value: "medium" },
            { display: "high", value: "high" },
          ],
        },
      },
      // {
      //   InternalName: "DisbursementStatus",
      //   DisplayName: "حالة الصرف",
      //   DisplayNameEn: "DisbursementStatus",
      //   type: "float",
      // },

      {
        InternalName: "CompanyName",
        DisplayName: "اسم الشركة المنفذة",
        DisplayNameEn: "Company Name",
        type: "string",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        maxchar: 255,
      },
      {
        InternalName: "IsZeroBudgetProject",
        DisplayName: "هل هو مشروع صفرى؟",
        DisplayNameEn: "Is Zero Budget Project ?",
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
          { value: 'no', fields: ['FundingSection', 'TenderSection', 'BudgetSection', 'Delivrables', 'Milestones'] },
        ],
      },
    ],
  },
  {
    label: "التمويل",
    labelEn: "Funding",
    description: "",
    descriptionEn: "",
    toggleName: 'FundingSection',
    // sectiontype: 'master',
    // layout: 'table',
    // targetlist: 'Funding',
    subFields: [
      {
        InternalName: "FundingSources",
        DisplayName: "مصادر التمويل",
        DisplayNameEn: "Funding Sources",
        type: "string",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        maxchar: 255,
      },
      {
        InternalName: "FundingStatus",
        DisplayName: "حالة التمويل",
        DisplayNameEn: "Funding Status",
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
    ],
  },
  {
    label: "بند الميزانية",
    labelEn: "Budget Item",
    description: "",
    descriptionEn: "",
    toggleName: 'BudgetSection',
    // sectiontype: 'master',
    // layout: 'table',
    // targetlist: 'BudgetItem',
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
        // dynamic: "mainfield", //controls others data
        // //from other list:
        // source: "Budget Items",
        // Dispfieldkey: "Name",
        // valfieldkey: "Title",
        // "validation": "required",
        // "state": "disabled"
      },
      {
        InternalName: "Amount",
        DisplayName: "التكلفة",
        DisplayNameEn: "Amount",
        type: "float",
        className: "disable_enable_section",        
        descPhraseAr: "الحقل مطلوب لادخال المخرجات والمعالم",
        descPhraseEn: "Filed is required to add milestones and Deliverables",
        // "state": "disabled",
        dynamic: "BudgetItem", //being controlled by main field
        numberOfDigits: "15",
        resetElement: ["ContractualEngagements", "ExpensesDate", "RemainingCost"]

      },
      {
        InternalName: "ExpectedBudget",
        DisplayName: "الموازنة المتوقعة",
        DisplayNameEn: "Expected Budget",
        type: "float",
        // state: "disabled",
        numberOfDigits: "15",
      },
      {
        InternalName: "ActualBudget",
        DisplayName: "التكلفة الفعلية",
        DisplayNameEn: "Actual Budget",
        type: "float",
        className: "disable_enable_section",        
        descPhraseAr: "الحقل مطلوب لادخال المخرجات والمعالم",
        descPhraseEn: "Filed is required to add milestones and Deliverables",
        // "state": "disabled",
        RequiredName: "ActualBudget",
        numberOfDigits: "15",
        resetElement: ["ContractualEngagements", "ExpensesDate", "RemainingCost"]
      },
      {
        InternalName: "ContractualEngagements",
        DisplayName: "الارتباطات التعاقدية",
        DisplayNameEn: "ContractualEngagements",
        type: "float",
        // "state": "disabled"
        numberOfDigits: "15",
        max: "ActualBudget",
        descPhraseAr: "يجب ان تكون اقل من او يساوي التكلفة الفعلية او التكلفة",
        descPhraseEn: "should be less than or equal Actual Budget or Amount",

      },
      {
        InternalName: "EngagementPercentage",
        DisplayName: "نسبة الارتباط من التكاليف ",
        DisplayNameEn: "Engagement Percentage",
        type: "floatpercentage",
        // "state": "disabled"
      },
      {
        InternalName: "ExpensesDate",
        DisplayName: "المنصرف حتى تاريخه",
        DisplayNameEn: "Expenses",
        type: "float",
        numberOfDigits: "15",
        max: "ActualBudget",
        descPhraseAr: "يجب ان تكون اقل من او يساوي التكلفة الفعلية او التكلفة",
        descPhraseEn: "should be less than or equal Actual Budget or Amount",
        // "state": "disabled"
      },
      {
        InternalName: "RemainingCost",
        DisplayName: "التكلفة المتبقية",
        DisplayNameEn: "Remaining Cost",
        type: "float",
        numberOfDigits: "15",
        max: "ActualBudget",
        descPhraseAr: "يجب ان تكون اقل من او يساوي التكلفة الفعلية او التكلفة",
        descPhraseEn: "should be less than or equal Actual Budget or Amount",
        // "state": "disabled"
      },
      {
        InternalName: "OutOfCash",
        DisplayName: "نسبة المنصرف من السيولة ",
        DisplayNameEn: "Out Of Cash",
        type: "floatpercentage",
        numberOfDigits: "15",
        // "state": "disabled"
      },
      // {
      //     "InternalName": "SpentBudget",
      //     "DisplayName": "المبالغ المصروفة",
      //     "DisplayNameEn": "Spent Budget",
      //     "type": "float"
      // },
      {
        InternalName: "BudgetStatus",
        DisplayName: "حالة تمويل المشروع (حسب الحوكمة)",
        DisplayNameEn: "Budget Status",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "finance", value: "finance" },
            { display: "notfinanced", value: "notfinanced" },
            { display: "nofinance", value: "nofinance" },
            { display: "externalfinance", value: "externalfinance" },
          ],
        },
        security: {
          groups: [
            "VRO_E",
            "LMS_E",
            "EPMO",
            "System Admin Group",
            "SPMO",
            "Development Unit",
            "Project Managers for Project Web App",
          ],
        },
        //"state": "disabled"
      },
    ],
  },
  {
    label: "الطرح والتعاقد",
    labelEn: "Tendering and Contracting",
    description: "",
    descriptionEn: "",
    toggleName: 'TenderSection',
    // toggleName: 'TenderSection',
    // sectiontype: 'master',
    // layout: 'table',
    // targetlist: 'TenderSection',
    subFields: [
      {
        InternalName: "PlannedOfferingDate",
        DisplayName: "التاريخ المخطط للطرح",
        DisplayNameEn: "Planned Date of Offering",
        type: "datetime",
        // type: 'datetimetoparent',
        // listname: 'Projects',
        // startinternalname: 'BaselineStartDate',
        // endinternalname: 'BaselineFinishDate',
          "min": "PlannedStartDate",
          Errmsgkey:"todatepattern",
      },
      {
        InternalName: "ActualOfferingDate",
        DisplayName: "تاريخ  الطرح الفعلى",
        DisplayNameEn: "Actual Offering Date",
        // type: "datetime",
        type: 'datetimetoparent',
        listname: 'Projects',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
        max: "today",
        Errmsgkey: 'cancelationdatepattern',
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
      },
      {
        InternalName: 'ApprovedBrochure',
        DisplayName: 'الكراسة المعتمدة',
        DisplayNameEn: 'Approved RFP',
        type: 'file',
        // withAddBtn: 'true',
        // InternalName: 'getfile',
        docPurpose: "Approved_RFP",
      },
      {
        InternalName: "RFPStatus",
        DisplayName: "حالة الكراسة",
        DisplayNameEn: "RFP Status",
        type: "dropdownValues",
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
        //"state": "disabled"
      },
      {
        InternalName: "Description",
        DisplayName: "وصف الإعتمادية",
        DisplayNameEn: "Description",
        type: "multiline",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        maxchar: 5000,
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
    subFields: [
      {
        InternalName: "WorkingStatus",
        DisplayName: "حالة العمل",
        DisplayNameEn: "Working Status",
        type: "dropdownValues",
         "state": "disabled",
        options: {
          choices: [
            { display: "active", value: "active", selected: 'selected' },
            // { display: "stat14", value: "stat14" },
            // { display: "stat13", value: "stat13" },
          ],
        },
        // security: {
        //   groups: ["EPMO", "System Admin Group"]
        // },
      }
    ],
  },
  {
    label: 'بيانات المخرج',
    labelEn: 'Delivrable Data',
    toggleName: "Delivrables",
    description: 'التفاصيل (يمكن ادخال القيم عند ادخال التكلفة)',
    descriptionEn: 'Details (you can enter the values when enter the Amount)',
    sectiontype: 'master',
    className: "disable_section", // to make the section disabled on form render
    targetlist: 'Deliverables',
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayName":"رمز المخرج",
      //     "type":"string",
      //     "validation": "required"
      // },
      {
        InternalName: 'Name',
        DisplayName: 'اسم المخرج',
        DisplayNameEn: 'Deliverable Name',
        type: 'string',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        validation: 'required',
        maxchar: '255',
        // withletters: true,
        Errmsgkey: "withletterpattern",
      },
      {
        InternalName: 'Description',
        DisplayName: 'الوصف',
        DisplayNameEn: 'Description',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      // {
      //     "InternalName": "Quantity",
      //     "DisplayName":"الكمية",
      //     "type":"float"
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
        descPhraseAr: "من التكلفة",
        descPhraseEn: " From Budget", 
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
        descPhraseAr: "من التكلفة",
        descPhraseEn: " From Budget", 
      },
      // {
      //   InternalName: 'Status',
      //   DisplayName: 'الحالة',
      //   DisplayNameEn: 'Status',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       { display: 'ontrack', value: 'ontrack' },
      //       { display: 'late', value: 'late' },
      //       { display: 'completed', value: 'completed' },
      //     ],
      //   },
      // },
      // {
      //   InternalName: 'ActualDate',
      //   DisplayName: 'تاريخ الاكتمال الفعلي',
      //   DisplayNameEn: 'Actual Date',
      //   type: 'datetime',
      //   max: 'today',
      //   validation: 'required',
      // },
      // {
      //   InternalName: 'DeliveredDate',
      //   DisplayName: 'تاريخ التسليم',
      //   DisplayNameEn: 'Delivered Date',
      //   type: 'datetime',
      //   max: 'today',
      //   validation: 'required',
      // },
      {
        InternalName: 'PlannedFinishDate',
        DisplayName: 'تاريخ الانتهاء المخطط',
        DisplayNameEn: 'Planned Finish Date',
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Projects',
        startinternalname: 'BaselineStartDate',
        endinternalname: 'BaselineFinishDate',
        // min: 'PlannedStartDate',
        validation: 'required',
        Errmsgkey:'btwndatepattern',
      },
      // {
      //   InternalName: 'Delivered',
      //   DisplayName: 'تم التسليم',
      //   DisplayNameEn: 'Delivered',
      //   type: 'yesnoradio',
      //   targetfield: 'Status',
      //   targetfieldvalue: 'completed',
      //   options: {
      //     choices: [
      //       { display: 'yes', value: 'yes' },
      //       { display: 'no', value: 'no' },
      //     ],
      //   },
      // },
      {
        InternalName: 'AcceptanceCriteria',
        DisplayName: 'معايير قبول المخرج',
        DisplayNameEn: 'Acceptance Criteria',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      // {
      //     "InternalName": "PlannedStartDate",
      //     "DisplayName": "تاريخ البدء المخطط",
      //     "DisplayNameEn": "Planned Start Date",
      //     "type": "datetime",
      //     "max": "PlannedFinishDate",
      //     "validation": "required"
      // },
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
      //     "max": "today"
      // },
      // {
      //     "InternalName": "FinishDate",
      //     "DisplayName": "تاريخ الانتهاء الفعلي",
      //     "DisplayNameEn": "Actual Finish Date",
      //     "type": "datetime",
      //     "min": "StartDate",
      //     "max": "today"
      // },
      // {
      //     "InternalName": "DeliveredDate",
      //     "DisplayName":"تاريخ التسليم",
      // "DisplayNameEn": "Delivered Date",
      //     "type":"datetime"
      // },

      // {
      //     "InternalName": "Delivered",
      //     "DisplayName":"تم التسليم",
      // "DisplayNameEn": "Delivered",
      //     "type":"radio",
      //             options:{
      //         choices:[
      //             'لا','نعم'
      //           ]
      //     }

      // },
      {
        InternalName: 'Comments',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
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
      },
      // {
      //   InternalName: 'RelatedInitiativeDeliverable',
      //   DisplayNameEn: 'Related Initiative Deliverable',
      //   DisplayName:'مخرج المبادرة المرتبط',
      //   type: 'lookup',
      //   source: 'InitiativeDeliverables',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      // },

      {
        InternalName: 'ShowInProgramReport',
        DisplayName: 'اظهار في التقرير',
        DisplayNameEn: 'Show In Program Report',
        type: 'dropdownValues',
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
      {
        InternalName: 'getfile',
        DisplayName: 'المرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        // withAddBtn: 'true',
      },
    ],
  },
  {
    label: 'بيانات المعلم',
    labelEn: 'Milestone Data',
    description: 'التفاصيل (يمكن ادخال القيم عند ادخال التكلفة)',
    descriptionEn: 'Details (you can enter the values when enter the Amount)',
    sectiontype: 'master',
    className: "disable_section", // to make the section disabled on form render
    targetlist: 'Milestones',
    toggleName: 'Milestones',
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
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        maxchar: '255',
        // withletters: true,
        Errmsgkey: "withletterpattern",
        validation: 'required',
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
        descPhraseAr: "من التكلفة",
        descPhraseEn: " From Budget", 
        // "state":"disabled",
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
        descPhraseAr: "من التكلفة",
        descPhraseEn: " From Budget", 
        targetelement: 'Weight',
        validation: 'required',
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
        validation: 'required',
        Errmsgkey:'btwndatepattern',
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
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
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
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
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
        // source: 'InitiativeMilestones', // target list
        source: 'InitiativeMilestones',
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
        type: 'dropdownValues',
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
      {
        InternalName: 'getfile',
        DisplayName: 'المرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        // withAddBtn: 'true',
      },

    ],
  },
  // {
  //     label: 'مخاطر المشروع',
  //     labelEn: 'Project Risks',
  //     description: "",
  //     descriptionEn: "",
  //     sectiontype: "master",
  //     targetlist: "Risks",
  //     subFields: [{
  //             "InternalName": "Name",
  //             "DisplayName": "المخاطر المحتملة",
  //             "DisplayNameEn": "Potential Risks",
  //             "type": "string",
  //             "state": "disabled"
  //         },
  //         {
  //             "InternalName": "Probability",
  //             "DisplayName": "إحتمالية الحدوث",
  //             "DisplayNameEn": "Probability",
  //             "type": "string",
  //             "state": "disabled"
  //         },
  //         {
  //             "InternalName": "ResolutionPlan",
  //             "DisplayName": "خطة التعامل مع المخاطر",
  //             "DisplayNameEn": "Resolution Plan",
  //             "type": "multiline",
  //             "maxchar": 5000,
  //             "state": "disabled"
  //         }
  //     ]
  // },
  {
    label: "الوثائق الداعمة",
    labelEn: "Supporting Documents",
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [
      {
        InternalName: "getfile",
        DisplayName: "المرفقات",
        DisplayNameEn: "Attachments",
        type: "file",
        withAddBtn: "true",
      },
    ],
  },
];
