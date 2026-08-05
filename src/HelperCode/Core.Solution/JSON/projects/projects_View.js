var Information_Form = [
  {
    label: "بيانات المشروع",
    labelEn: "Project Data",
    description: "",
    descriptionEn: "",
    workflowSetValues: [
      //VRO
      { fieldName: 'DraftStatus', value: '', stages:["VROCreateProject03"] },
      { fieldName: 'WFModuleCode', value: '',stages:["VROCreateProject03"]} ,
      { fieldName: 'WFStage', value: '',stages:["VROCreateProject03"]} ,
      { fieldName: 'Stage', value: 'S00.3',stages:["VROCreateProject03"] ,projecttype:["operationally"]} ,
      { fieldName: 'Stage', value: 'S00.1',stages:["VROCreateProject03"] ,projecttype:["strategy"]} ,
      { fieldName: 'Phase', value: 'P5',stages:["VROCreateProject03"]} ,
      { fieldName: 'WorkingStatus', value: 'active',stages:["VROCreateProject03"]} ,
      //EPMO
      { fieldName: 'DraftStatus', value: '', stages:["EPMOCreateProject03"] },
      { fieldName: 'WFModuleCode', value: '',stages:["EPMOCreateProject03"]} ,
      { fieldName: 'WFStage', value: '',stages:["EPMOCreateProject03"]} ,
      { fieldName: 'Stage', value: 'S00.3',stages:["EPMOCreateProject03"],projecttype:["operationally"]} ,
      { fieldName: 'Stage', value: 'S00.1',stages:["EPMOCreateProject03"] ,projecttype:["strategy"]} ,
      { fieldName: 'Phase', value: 'P5',stages:["EPMOCreateProject03"]} ,
      { fieldName: 'WorkingStatus', value: 'active',stages:["EPMOCreateProject03"]} ,
      //LMS
      { fieldName: 'DraftStatus', value: '', stages:["LMSCreateProject03"] },
      { fieldName: 'WFModuleCode', value: '',stages:["LMSCreateProject03"]} ,
      { fieldName: 'WFStage', value: '',stages:["LMSCreateProject03"]} ,
      { fieldName: 'Stage', value: 'S00.3',stages:["LMSCreateProject03"],projecttype:["operationally"]} ,
      { fieldName: 'Stage', value: 'S00.1',stages:["LMSCreateProject03"] ,projecttype:["strategy"]} ,
      { fieldName: 'Phase', value: 'P5',stages:["LMSCreateProject03"]} ,
      { fieldName: 'WorkingStatus', value: 'active',stages:["LMSCreateProject03"]} ,
       //DeptOrgCommiette 
      { fieldName: 'DraftStatus', value: '', stages:["DOC_CreateProject02"] },
      { fieldName: 'WFModuleCode', value: '',stages:["DOC_CreateProject02"]} ,
      { fieldName: 'WFStage', value: '',stages:["DOC_CreateProject02"]} ,
      { fieldName: 'Stage', value: 'S00.3',stages:["DOC_CreateProject02"],projecttype:["operationally"]} ,
      { fieldName: 'Stage', value: 'S00.1',stages:["DOC_CreateProject02"] ,projecttype:["strategy"]} ,
      { fieldName: 'Phase', value: 'P5',stages:["DOC_CreateProject02"]} ,
      { fieldName: 'WorkingStatus', value: 'active',stages:["DOC_CreateProject02"]} ,
       //FSSBCommiette 
      { fieldName: 'DraftStatus', value: '', stages:["FSSBCreateProject02"] },
      { fieldName: 'WFModuleCode', value: '',stages:["FSSBCreateProject02"]} ,
      { fieldName: 'WFStage', value: '',stages:["FSSBCreateProject02"]} ,
      { fieldName: 'Stage', value: 'S00.3',stages:["FSSBCreateProject02"],projecttype:["operationally"]} ,
      { fieldName: 'Stage', value: 'S00.1',stages:["FSSBCreateProject02"] ,projecttype:["strategy"]} ,
      { fieldName: 'Phase', value: 'P5',stages:["FSSBCreateProject02"]} ,
      { fieldName: 'WorkingStatus', value: 'active',stages:["FSSBCreateProject02"]} ,
        //SOD
      { fieldName: 'DraftStatus', value: '', stages:["SODCreateProject03"] },
      { fieldName: 'WFModuleCode', value: '',stages:["SODCreateProject03"]} ,
      { fieldName: 'WFStage', value: '',stages:["SODCreateProject03"]} ,
      { fieldName: 'Stage', value: 'S00.3',stages:["SODCreateProject03"],projecttype:["operationally"]} ,
      { fieldName: 'Stage', value: 'S00.1',stages:["SODCreateProject03"] ,projecttype:["strategy"]} ,
      { fieldName: 'Phase', value: 'P5',stages:["SODCreateProject03"]} ,
      { fieldName: 'WorkingStatus', value: 'active',stages:["SODCreateProject03"]} ,
    ],
    subFields: [
      {
        InternalName: "Title",
        DisplayName: "رمز المشروع",
        DisplayNameEn: "Code",
        type: "string",
      },
      {
        InternalName: "Name",
        DisplayName: "اسم المشروع",
        DisplayNameEn: "Project Name",
        type: "string",
      },
      {
        InternalName: "FileType",
        DisplayName: "نوع المرفق",
        DisplayNameEn: "File Type",
        type: "multiselectForFiles",
        options: {
                  choices:[
                  'الموافقات','دراسة الجدوى','ميثاق المشروع'
                ]
          }
       
      },
      {
        InternalName: "Portfolio",
        DisplayName: "المحفظة",
        DisplayNameEn: "Portfolio",
        type: "lookup",
        //from other list:
        source: "Portfolio",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        BIlanguage: true, //added to handle portfolio bilangual
        DispfieldkeyEn: "NameEn", //added to handle portfolio bilangual
      },
      {
        InternalName: "Description",
        DisplayName: "وصف المشروع والتحديات التي يعالجها",
        DisplayNameEn: "Description",
        type: "multiline",
        // hideonstage: "1"
      },
      {
        InternalName: "ScopeOfWork",
        DisplayName: "نطاق العمل",
        DisplayNameEn: "ScopeOfWork",
        type: "multiline",
        maxchar: 5000,
        // hideonstage: "1"
      },
      {
        InternalName: "OutOfScope",
        DisplayName: "خارج نطاق العمل",
        DisplayNameEn: "Out Of Scope",
        type: "multiline",
        maxchar: 5000,
        //"state": "disabled"
      },
      {
        InternalName: "Assumptions",
        DisplayName: " إفتراضات المشروع",
        DisplayNameEn: "Project Assumptions",
        type: "multiline",
        maxchar: 5000,
        //"state": "disabled"
      },
      {
        InternalName: "PMNotes",
        DisplayName: "ملاحظات مدير المشروع",
        DisplayNameEn: "PM Notes",
        type: "multiline",
        maxchar: 5000,
        // hideonstage: "1"
      },
      // {
      //   InternalName: "FlaggedProjects",
      //   DisplayName: "مشروع مشار اليه؟",
      //   DisplayNameEn: "Is Flagged Project?",
      //   // validation: 'required',
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
      // },
      {
        InternalName: "IsProjectStatusByMilestones",
        DisplayNameEn: "Is Project Status By Milestones?",
        DisplayName: "هل ترغب بإدارة المشروع حسب المعالم (نعم / لا)",
        // validation: "required",
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
        //     "SPMO",
        //     "Development Unit",
        //     "ProjectManager"
        //   ],
        // },
      },
      {
        InternalName: "AgencyType",
        DisplayName: "نوع الجهة",
        DisplayNameEn: "Agency Type",
        // validation: "required",
        type: "dropdownValues",
        // disableOnWfTaskStage : "S05,S09",
        // security: {
        //   groups: [ ],
        //   // groups: [], // should be empty array if will use notAllowTo
        //   notAllowTo:[ // notAllowTo group and on form (origin = normal form , changerequest = change request form)
        //     {group:"Project Managers for Project Web App",form:["origin"]},
        //     // {group:"EPMO",form:["origin" ]}

        //   ]
        // },
        options: {
          choices: [
            { display: "executingagency", value: "executingagency" },
            { display: "owneragency", value: "owneragency" },
          ],
        },
      },
      {
        InternalName: "Committees",
        DisplayName: "اللجان",
        DisplayNameEn: "Committees",
        type: "string",
        // "maxchar": 5000,
        // hideonstage: "1"
      },
      {
        InternalName: "IsStrategicProject",
        DisplayName: "الرجاء اختيار نوع المشروع",
        DisplayNameEn: "Is Strategic Project?",
        type: "dropdownValues",
        options: {
          choices: [
          /*  { display: "yes", value: "yes" },
            { display: "no", value: "no" },*/
            { display: "strategy", value: "strategy" },
            { display: "operationally", value: "operationally" },
          ],
        },
        toggleValues: [
        /*  { value: 'yes', fields: ['InitiativeType','RelatedInitiative','RelatedInitiativeDeliverable' , 'LinkingSection'] }, //we can put more than 1  field
          { value: 'no', fields: [''] }, //we can put more than 1  field*/
          { value: 'strategy', fields: ['InitiativeType','RelatedInitiative','RelatedInitiativeDeliverable' , 'LinkingSection','MDRelatedInitiativeDeliverable','MDRelatedInitiativeMilestone'] }, //we can put more than 1  field
          { value: 'operationally', fields: [''] }, //we can put more than 1  field
        ],
      },
      {
        InternalName: 'InitiativeType',
        DisplayNameEn: 'Initiative Type',
        DisplayName: 'نوع المبادرة',
        ToggleName: "InitiativeType",
        // validation: 'required',
        display: 'none',
        dynamic: 'parent', // parent to get the child depends on this field value
        type: 'dropdownValues',
        toggleValues: [
          { value: 'vision', fields: ['Program','LinkingSection'] },
          { value: 'lms', fields: ['LinkingSection'] },
          // {value:'strategically', fields:['StrategyRelatedObjective']}
        ],
        // dontSubmit: true,
        options: {
          choices: [
            {
              display: 'vision',
              value: 'vision',
              customFilterValue:  "vision",
              roles: ['Administrator', 'VROE', 'VROP'],
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'VROCreateProject' },
                { fieldName: 'WFStage', value: 'VROCreateProject01' },
                { fieldName: 'DraftStatus', value: 'draft' },
              ],
            },
            {
              display: 'strategically',
              value: 'strategically',
              customFilterValue:  "strategically",

                roles: ['Administrator', 'EPMO'],
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'EPMOCRProject' },
                { fieldName: 'WFStage', value: 'EPMOCRProject01' },
                { fieldName: 'DraftStatus', value: 'draft' },
              ],
            },
            {
              display: 'lms',
              value: 'lms',
              customFilterValue:  "lms",

              roles: ['Administrator', 'LMSE', 'LMSP'],
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'LMSCRProject' },
                { fieldName: 'WFStage', value: 'LMSCRProject01' },
                { fieldName: 'DraftStatus', value: 'draft' },
              ],
            },
               {
              display: 'sod',
              value: 'sod',
              customFilterValue: "sod",
              roles: ['Administrator', 'SODVRO-Execution'],
              otherFields: [
                { fieldName: 'Stage', value: 'S01' },
                { fieldName: 'Phase', value: 'P1' },
              ],
              // other roles

            },
            {
              display: 'sod',
              value: 'sod',
              customFilterValue: "sod",
              roles: [ 'ProjectManager', 'SODVRO-Execution','SODVRO-Performance','SODVRO-E'],
              otherFields: [
                { fieldName: 'WFModuleCode', value: 'SODCreateProject' },
                { fieldName: 'WFStage', value: 'SODCreateProject01' },
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
        DisplayName: " المبادرة المرتبطة",
        DisplayNameEn: "Related Initiative",
        ToggleName: "RelatedInitiative",
        display: 'none',
        // type: 'string',
        type: "lookup",
        //from other list:ma
        source: "Initiatives",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        // showlink: true,
				// linkedto: "initiatives",
        // security: {
        //     groups: [
        //         'EPMO', 'System Admin Group', 'SPMO'
        //     ]
        // },
        // "state": "disabled",
        // "className":"autofill"
      },
      {
        InternalName: "RelatedInitiativeDeliverable",
        DisplayNameEn: "Related Initiative Deliverable",
        DisplayName: "مخرج المبادرة المرتبط",
        ToggleName: "RelatedInitiativeDeliverable",
        display: 'none',
        // type: 'string',
        //type: "multiselectstring",
         type: "lookupmultiselect",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        source: "InitiativeDeliverables",
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
          // "display": "none"
      },
      {
        InternalName: "Sector",
        DisplayName: "القطاع",
        DisplayNameEn: "Sector",
        type: "lookup",
        // validation: 'required',
        //from other list:
        source: "Internal Entities",
        isSector: "True",
        EntityType: "Sector",
        Dispfieldkey: "Name",
        DispfieldkeyEn: "NameEn",
        valfieldkey: "Title",
      },

      {
        InternalName: "SubSector",
        DisplayName: "الوكالة",
        DisplayNameEn: "DeputyShip",
        type: "lookup",
        //from other list:
        source: "Internal Entities",
        isSector: "True",
        Dispfieldkey: "Name",
        DispfieldkeyEn: "NameEn",
        valfieldkey: "Title",
      },
      // {
      //   InternalName: "CorrectivePlan",
      //   DisplayName: "الخطة التصحيحية",
      //   DisplayNameEn: "Corrective Plan",
      //   // type: 'string',
      //   type: "multiline",
      //   // "maxchar": 5000,
      //   // hideonstage: "1"
      // },
      // {
      //   InternalName: "Status",
      //   DisplayName: "مرحلة المشروع",
      //   DisplayNameEn: "Status",
      //   type: "string",
      //   translate:'resources',
      //   // maxchar: 255,
      // },
      {
        InternalName: "ProjectType",
        DisplayName: "نوع تطوير المشروع",
        DisplayNameEn: "Project Type",
        type: "dropdownValues",
        // validation: 'required',
        options: {
          choices: [
            {
              display: "internal",
              value: "Internal",
            },
            {
              display: "external",
              value: "External",
            },
          ],
        },
      },
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
        // "state": "disabled"
      },
      {
        InternalName: "BaselineFinishDate",
        DisplayName: "تاريخ إنهاء الأساس",
        DisplayNameEn: "Baseline Finish Date",
        type: "datetime",
        min: "BaselineStartDate",
        // "state": "disabled"
      },
       {
        InternalName: "BaselineDuration",
        DisplayName: "مدة الأساس بالأيام",
        DisplayNameEn: "Baseline Duration",
        type: "float",
        // "maxchar": 5000,
        // hideonstage: "1"
      },
       {
        InternalName: "ActualFinishDate",
        DisplayName: "تاريخ الانتهاء الفعلي",
        DisplayNameEn: "Actual Finish Date",
        type: "datetime", 
      },
      {
        InternalName: "ContractWorkStartDate",
        DisplayName: "تاريخ بدء الاعمال للعقود",
        DisplayNameEn: "Contract Work StartDate",
        type: "datetime", 
      },
       {
        InternalName: "InitiativeStartDate",
        DisplayName: "تاريخ بدء المبادرة",
        DisplayNameEn: "Initiative Start Date",
        type: "datetime",
      },
      {
        InternalName: "InitiativeFinishDate",
        DisplayName: "تاريخ إنهاء المبادرة",
        DisplayNameEn: "Initiative Finish Date",
        type: "datetime",
      },
      {
        InternalName: "Created",
        DisplayName: "تاريخ انشاء المشروع",
        DisplayNameEn: "Created Date",
        type: "datetime",
        // min: "BaselineStartDate",
        // "state": "disabled"
      },

      

      {
        InternalName: "Priority",
        DisplayName: "أهمية المشروع",
        DisplayNameEn: "Priority",
        type: "dropdownValues",
        // validation: 'required',
        options: {
          choices: [
            // {
            //     display: 'pr04low',
            //     value: 'pr04low'
            // },
            {
              display: "pr03medium",
              value: "pr03medium",
            },
            {
              display: "pr02important",
              value: "pr02important",
            },
            {
              display: "pr01veryimportant",
              value: "pr01veryimportant",
            },
            //'مهم','مهم جدا','متوسط','منخفض'
          ],
        },
      },

      {
        InternalName: "ExecutionChannels",
        DisplayName: "الشركة المنفذة / المقاول",
        DisplayNameEn: "Execution Channels",
        // type: 'string',
        type: "multiline",
      },
      {
        InternalName: "OwnerChannels",
        DisplayName: "الجهة المالكة",
        DisplayNameEn: "Owner Channels",
        // type: 'string',
        type: "multiline",
      },
      {
        InternalName: "ProjectOverview",
        DisplayName: "ملخص المشروع",
        DisplayNameEn: "Project Overview",
        type: "multiline",
        // type: 'string',
      },
     
   
      {
        InternalName: "Comments",
        DisplayName: "ملاحظات",
        DisplayNameEn: "Comments",
        type: "multiline",
        maxchar: 5000,
        security: {
          groups: [
            "VRO_E",
            "LMS_E",
            "EPMO",
            "System Admin Group",
            "Project Managers for Project Web App",
            "SPMO",
            "Development Unit",
          ],
        },
        // hideonstage: "1"
      },

      {
        InternalName: "ProjectSize",
        DisplayName: "حجم المشروع",
        DisplayNameEn: "Project Size",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "large", value: "large" },
            { display: "medium", value: "medium" },
            { display: "small", value: "small" },
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
      {
        InternalName: 'DisbursementStatus',
        DisplayNameEn: 'Disbursement Status',
        DisplayName: 'حالة الصرف',
        type: 'float'
      },
      {
        InternalName: "CompanyName",
        DisplayName: "اسم الشركة المنفذة",
        DisplayNameEn: "Company Name",
        type: "string",
        maxchar: 255,
      },
      {
        InternalName: "IsZeroBudgetProject",
        DisplayName: "هل هو مشروع صفرى؟",
        DisplayNameEn: "Is Zero Budget Project ?",
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
          { value: 'no', fields: ['FundingSection','TenderSection','BudgetSection',/*'Delivrables','Milestones' ,*/, 'LinkingSection' ,'MawaredSection','Weight', 'Amount','Quantity','AmountPrice'] },
        ],
      },
       {
        InternalName: "ExternalChannels",
        DisplayName: "هل المشروع يتبع جهة خارجية",
        DisplayNameEn: "ExternalChannels",
        type: "dropdownValues",
       },
      {
        InternalName: "ActualCostWorkCompleted",
        DisplayName: "التكلفة الفعلية للعمل المنجز",
        DisplayNameEn: "Actual Cost Work Completed",
        type: "float",
        // "state": "disabled"
      },

      {
        InternalName: "ProjectBudgetCost",
        DisplayName: "تكلفة ميزانية المشروع",
        DisplayNameEn: "Project Budget Cost",
        type: "float",
        // "state": "disabled"
      },

      // {
      //   InternalName: "WFStage",
      //   DisplayName: " مرحلة سير العمل",
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
        DisplayName: "مرحلة المشروع",
        DisplayNameEn: "Phase",
        type: "lookup",
        //from other list:
        source: "Phases",
        Dispfieldkey: "Name",
        DispfieldkeyEn: "PhaseNameEn",
        valfieldkey: "Title",
      },
      {
        InternalName: "ComplianceStatus",
        DisplayName: "حالة الامتثال للمرحله",
        DisplayNameEn: "ComplianceStatus",
        type: "string"
       },
       {
        InternalName: "ComplianceDegree",
        DisplayName: "عدد الامتثال",
        DisplayNameEn: "ComplianceDegree",
        type: "string"
       },
       {
        InternalName: "NonComplianceDegree",
        DisplayName: "عدد غير ممتثل",
        DisplayNameEn: "NonComplianceDegree",
        type: "string"
       },
{
				InternalName: "WFStage",
				DisplayName: " مرحلة المراجعة والموافقة",
				DisplayNameEn: "Stage",
				type: 'lookup',
				// validation: 'required',
				source: "Tasks Configuration",
				Dispfieldkey: "TaskNameAr",
				DispfieldkeyEn: 'TaskNameEn',
				valfieldkey: "Title",
				}
      // {
      //     "InternalName": "SpentBudget",
      //     "DisplayName": "المبالغ المصروفة",
      //     "DisplayNameEn": "Spent Budget",
      //     "type": "float"
      // },

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
      //     // "className":"autofill"
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
      //     "InternalName": "Agency",
      //     "DisplayName": "الوكالة",
      //     "DisplayNameEn": "Agency",
      //     "type": "lookup",
      //     "validation": "required",
      //     //from other list:
      //     "source": "Internal Entities",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title"
      // },
      //   {
      //     InternalName: 'InitiativeVision',
      //     DisplayNameEn: 'Initiative Vision',
      //     DisplayName: 'مبادرة تحقيق الرؤية',
      //     // "ToggleName":"SubRelatedObjective",
      //     type: 'lookupWithQuery',
      //     queryField: 'Types',
      //     queryFieldType: 'Choices', //ex: "Choice"
      //     queryFieldValue: 'vision',
      //     //from other list:
      //     source: 'Initiatives',
      //     Dispfieldkey: 'Name',
      //     valfieldkey: 'Title',
      //     // "display":"none"
      //   },
      //   {
      //     InternalName: 'InitiativeProgram',
      //     DisplayName: 'البرنامج',
      //     DisplayNameEn: 'Initiative Program',
      //     type: 'string',
      //     // "maxchar": 5000,
      //     // hideonstage: "1"
      //   },
      //   {
      //     InternalName: 'BaselineDuration',
      //     DisplayName: 'مدة الأساس بالأيام',
      //     DisplayNameEn: 'Baseline Duration in Days',
      //     type: 'float',
      //     // "maxchar": 5000,
      //     // hideonstage: "1"
      //   },
      //   {
      //     InternalName: 'KPIs',
      //     DisplayName: 'مؤشر القياس',
      //     DisplayNameEn: 'KPIs',
      //     type: 'lookup',
      //     source: 'MainKPI',
      //     Dispfieldkey: 'Name',
      //     valfieldkey: 'Title',

      //     // "maxchar": 5000,
      //     // hideonstage: "1"
      //   },
      // {
      //     "InternalName": "ProjectStatus",
      //     "DisplayName": "حالة المشروع",
      //     "DisplayNameEn": "Project Status",
      //     "type": "multiline",
      //     "maxchar": 5000,
      //     // hideonstage: "1"
      // },
      // {
      //     "InternalName": "PlannedStartDate",
      //     "DisplayName": "تاريخ بداية المشروع المتوقع",
      //     "DisplayNameEn": "Expected Start Date ",
      //     "type": "datetime",
      //     "max": "PlannedFinishDate"
      // },
      // {
      //     "InternalName": "PlannedFinishDate",
      //     "DisplayName": " تاريخ إنتهاء المشروع المتوقع",
      //     "DisplayNameEn": "Expected End Date ",
      //     "type": "datetime",
      //     "min": "PlannedStartDate"
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
      //     "DisplayName": "تاريخ الانتهاء الفعلي",
      //     "DisplayNameEn": "Actual Finish Date",
      //     "type": "datetime",
      //     "min": "ActualStartDate",
      //     "state": "disabled"
      // },
      // {
      //     "InternalName": "BaselineBudget",
      //     "DisplayName": "تكلفة الأساس",
      //     "DisplayNameEn": "Baseline Budget",
      //     "type": "float",
      //     // "state": "disabled"
      // },
      // {
      //     "InternalName": "Section",
      //     "DisplayName": "القسم ذو الصلة",
      //     "DisplayNameEn": "Related Section",
      //     "type": "lookup",
      //     //from other list:
      //     "source": "Internal Entities",
      //     "Dispfieldkey": "Name",
      //     "DispfieldkeyEn": "NameEn",
      //     "valfieldkey": "Title"
      // }, hide this field based on 24-03-2022 - EPMO

      // {
      //     "InternalName": "TargetSegments",
      //     "DisplayName": "الشرائح المستهدفة (ان وجد)",
      //     "DisplayNameEn": "Target Segments",
      //     "type": "string"
      // },
      // {
      //     "InternalName": "HumanResourcesRequired",
      //     "DisplayName": "موارد بشرية مطلوبة",
      //     "DisplayNameEn": "Human Resources Required",
      //     "type": "string"
      // },
      // {
      //     "InternalName": "ExecutionRequirements",
      //     "DisplayName": "متطلبات التنفيذ",
      //     "DisplayNameEn": "Execution Requirements",
      //     "type": "string"
      // },

      //   {
      //     "InternalName": "SubSector",
      //     "DisplayName": "قطاع ثانوي",
      //     "DisplayNameEn": "Sub Sector",
      //     "type": "string"
      //   },
      // {
      //     "InternalName": "ScheduleSource",
      //     "DisplayName": "الجدول الزمني",
      //     "DisplayNameEn": "Schedule",
      //     "type": "string"
      // },
      // {
      //     "InternalName": "ProjectExecutiveSummary",
      //     "DisplayName": "الملخص التنفيذي للمشروع",
      //     "DisplayNameEn": "Project Executive Summary",
      //     "type": "multiline"
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
      //     "type": "float"
      // },
      // {
      //     "InternalName": "EstimatedDuration",
      //     "DisplayName": "المدة المتوقعة",
      //     "DisplayNameEn": "Estimated Duration",
      //     "type": "float"
      // },
      // {
      //     "InternalName": "ActualDuration",
      //     "DisplayName": "المدة الفعلية",
      //     "DisplayNameEn": "Acual Duration",
      //     "type": "float",
      //     // "state": "disabled"
      // },

      // {
      //     "InternalName": "ProjectApproach",
      //     "DisplayName": "نهج المشروع",
      //     "DisplayNameEn": "Project Approach",
      //     "type": "multiline"
      // },
      // {
      //     "InternalName": "ProjectOrganization",
      //     "DisplayName": "منظمة المشروع",
      //     "DisplayNameEn": "Project Organization",
      //     "type": "multiline"
      // },
      // {
      //     "InternalName": "Assumptions",
      //     "DisplayName": " إفتراضات المشروع",
      //     "DisplayNameEn": "Project Assumptions",
      //     "type": "multiline"
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
      // {
      //     "InternalName": "Delivrables",
      //     "DisplayName":"مخرجات المشروع",
      //     "type":"multiline",
      //     // hideonstage: "1"
      // },
      // {
      //     "InternalName": "",
      //     "DisplayName":"الشرائح المستهدفة(ان وجد)",
      //     "type":"string"
      // },
      // {
      //     "InternalName": "",
      //     "DisplayName":" قنوات التنفيذ(ان وجد)",
      //     "type":"string"
      // },
      // {
      //     "InternalName": "",
      //     "DisplayName":"متطلبات التنفيذ",
      //     "type":"string"
      // },
      // {
      //     "InternalName": "",
      //     "DisplayName":"موارد بشرية اضافية مطلوبة",
      //     "type":"string"
      // }
    ],
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
    label: "التباين",
    labelEn: "Discrepancy",
    toggleName: 'BudgetSection',
    description: "",
    descriptionEn: "",
     subFields: [
        {
        InternalName: "DiscrepancyInDays",
        DisplayName: "قيمة التباين بالأيام",
        DisplayNameEn: "Discrepancy In Days",
        type: "float",
       },
         {
        InternalName: "DiscrepancyPercentage",
        DisplayName: "التباين%",
        DisplayNameEn: "Discrepancy Percentage",
        type: "float",
       },
         {
        InternalName: "DiscrepancyCost",
        DisplayName: "قيمة التباين بالريال",
        DisplayNameEn: "Discrepancy Cost",
        type: "float",
       },
         {
        InternalName: "DiscrepancyCostPercentage",
        DisplayName: "التباين%",
        DisplayNameEn: "Discrepancy Cost Percentage",
        type: "float",
       },
     ]
  },
  {
    label: "التمويل",
    labelEn: "Funding",
    description: "",
    descriptionEn: "",
    toggleName: 'FundingSection',
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
        },
        // "RequiredName": "FundingSources",
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
    label: "الموازنة",
    labelEn: "Budget",
    toggleName: 'BudgetSection',
    description: "",
    descriptionEn: "",
    subFields: [
      // {
      //   InternalName: "PRCode",
      //   DisplayName: "رمز المشتريات",
      //   DisplayNameEn: "Purchase code",
      //   // type: 'float',
      //   type: "string",
      // },

      // {
      //   InternalName: "ERPCode",
      //   DisplayNameEn: "ERP Code",
      //   DisplayName: "ترميز موارد",
      //   type: "string",
      //   maxchar: "250",
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
        // "state": "disabled",
        dynamic: "BudgetItem", //being controlled by main field
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
      //   InternalName: "AssignedBudget",
      //   DisplayName: "الموازنة المعتمدة",
      //   DisplayNameEn: "Assigned Budget",
      //   type: "float",
      //   //"state": "disabled"
      //   // "showonstage":"1"
      // },
      {
        InternalName: "AssignedBudget",
        DisplayName: "الميزانية المعتمدة",
        DisplayNameEn: "Assigned Budget",
        type: "float",
        // numberOfDigits:"15",
        // "state": "disabled"
        // "showonstage":"1"
      },
      {
        InternalName: "ExpectedBudget",
        DisplayName: "الموازنة المتوقعة",
        DisplayNameEn: "Expected Budget",
        type: "float",
        // state: "disabled",
      },
      // {
      //     "InternalName": "ContractualValue",
      //     "DisplayName":"قيمة العقد (قيمة المشروع)",
      //     "DisplayNameEn":"Contractual Value",
      //     "type":"float"
      // },
      {
        InternalName: "ActualBudget",
        DisplayName: "التكلفة الفعلية",
        DisplayNameEn: "Actual Budget",
        type: "float",
        RequiredName: "ActualBudget",
        // "state": "disabled"
      },

      {
        InternalName: "ContractualEngagements",
        DisplayName: "الارتباطات التعاقدية",
        DisplayNameEn: "ContractualEngagements",
        type: "float",
        // "state": "disabled"
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
        // "state": "disabled"
      },
      {
        InternalName: "RemainingCost",
        DisplayName: "التكلفة المتبقية",
        DisplayNameEn: "Remaining Cost",
        type: "float",
        // "state": "disabled"
      },
      {
        InternalName: "OutOfCash",
        DisplayName: "نسبة المنصرف من السيولة ",
        DisplayNameEn: "Out Of Cash",
        type: "float",
        // "state": "disabled"
      },
   
      // {
      //   InternalName: "BudgetStatus",
      //   DisplayName: "حالة تمويل المشروع (حسب الحوكمة)",
      //   DisplayNameEn: "Budget Status",
      //   type: "dropdownValues",
      //   options: {
      //     choices: [
      //       { display: "finance", value: "finance" },
      //       { display: "notfinanced", value: "notfinanced" },
      //       { display: "nofinance", value: "nofinance" },
      //       { display: "externalfinance", value: "externalfinance" },
      //     ],
      //   },
      //   //"state": "disabled"
      // },
    ],
  },
   {
    label: "بند الارتباط",
    labelEn: "Linking Item",
    description: "",
    descriptionEn: "",
    toggleName: 'LinkingSection',
    subFields: [
      {
        InternalName: "LinkingProgress",
        DisplayName: "جاري الارتباط",
        DisplayNameEn: "Linking Progress",
        type: "float",
        numberOfDigits: "15",
      },
      {
        InternalName: "ExpensePlan",
        DisplayName: "مخطط الصرف",
        DisplayNameEn: "Expense Plan",
        type: "float",
        numberOfDigits: "15",
      },
       {
        InternalName: "ExpenseProgress",
        DisplayName: "جاري الصرف",
        DisplayNameEn: "Expense Progress",
        type: "float",
        numberOfDigits: "15",
      },
      {
        InternalName: "ExpenseLately ",
        DisplayName: "متأخر من الصرف",
        DisplayNameEn: "Expense Lately",
        type: "float",
        numberOfDigits: "15" ,
      },  
    ],
   },
  {
    label: "الطرح والتعاقد",
    labelEn: "Tendering and Contracting",
    description: "",
    descriptionEn: "",
    toggleName: 'TenderSection',
    subFields: [
      {
        InternalName: "PlannedOfferingDate",
        DisplayName: "التاريخ المخطط للطرح",
        DisplayNameEn: "Planned Date of Offering",
        type: "datetime",
      },
      {
        InternalName: "ActualOfferingDate",
        DisplayName: "تاريخ  الطرح الفعلى",
        DisplayNameEn: "Actual Offering Date",
        type: "datetime",
      },
      {
        InternalName: "AwardDate",
        DisplayName: "تاريخ  الترسية",
        DisplayNameEn: "Award Date",
        type: "datetime",
      },
      {
        InternalName: "ContractualDate",
        DisplayName: "تاريخ التعاقد",
        DisplayNameEn: "Contractual Date",
        type: "datetime",
      },
      {
        InternalName: "POApprovalDate",
        DisplayName: "تاريخ اعتماد التعاقد",
        DisplayNameEn: "PO Approval Date",
        type: "datetime",
  
        "state": "disabled",
  
      },
      {
        InternalName: 'ApprovedBrochure',
        DisplayName: 'الكراسة المعتمدة',
        DisplayNameEn: 'Approved RFP',
        type: 'file',
        withAddBtn: 'true',
        // InternalName: 'getfile',
        docPurpose:"Approved_RFP",
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
  {
    label: "طاقم عمل المشروع",
    labelEn: "Project Staff",
    description: "",
    descriptionEn: "",
    subFields: [
      // {
      //     "InternalName": "Owner",
      //     "DisplayName": "المالك",
      //     "DisplayNameEn": "Owner",
      //     "type": "picker",
      //     // "showonstage": "2"
      // },
      {
        InternalName: "ProjectOwner",
        DisplayName: "مالك المشروع",
        DisplayNameEn: "Project Owner",
        type: "picker",
        // validation: 'required',
      },
      {
        InternalName: "ProjectManager",
        DisplayName: "مدير المشروع",
        DisplayNameEn: "Project Manager",
        type: "picker",
        // showonstage: "2",
      },
      // {

      //     "InternalName": "DirectorUnit",
      //     "DisplayName":" مدير وحدة الانجاز",
      //     "DisplayNameEn":"Director Unit",
      //     "type":"picker",

      // },
      {
        InternalName: "ProjectSponsor",
        DisplayName: "راعي المشروع",
        DisplayNameEn: "Project Sponsor",
        type: "picker",
      },
       {
        InternalName: "MawaredProjectManager",
        DisplayName: "مستكمل الطلب فى موارد",
        DisplayNameEn: "Mawared Project Manager",
        toggleName: 'MawaredSection',
        type: "picker",
      },
      //   {
      //     InternalName: 'QualityOfficer',
      //     DisplayName: 'ضابط الجودة',
      //     DisplayNameEn: 'Quality Officer',
      //     type: 'picker',
      //   },
      //   {
      //     InternalName: 'ProjectResponsible',
      //     DisplayName: 'مسؤول عن المشروع',
      //     DisplayNameEn: 'Project Responsible',
      //     type: 'picker',
      //   },
      // ,
      // {
      //     "InternalName": "PMORepresentative",
      //     "DisplayName": "ممثل مكتب تحكم إدارة المشاريع",
      //     "DisplayNameEn": "PMO Representative",
      //     "type": "picker",
      //     "showonstage": "3"
      // }
    ],
  },
  {
    label: "المشاريع الإعتمادية",
    description: "",
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
      },
      {
        InternalName: "Description",
        DisplayName: "وصف الإعتمادية",
        DisplayNameEn: "Description",
        type: "multiline",
        // type: 'string',
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
        options: {
          choices: [
            { display: "active", value: "active" },
            { display: "stat14", value: "stat14" },
            { display: "stat13", value: "stat13" },
          ],
        },
      },
      {
        InternalName: "PlannedImplementationDeliverable",
        DisplayName: "نسبة التنفيذ المخططة (المخرجات)",
        DisplayNameEn: "Percentage of planned implementation ((Deliverables)",
        type: "float",
      },
      {
        InternalName: "ActualImplementationDeliverable",
        DisplayName: "نسبة التنفيذ الفعلية (المخرجات)",
        DisplayNameEn: "% of actual implementation (Deliverables)",
        type: "float",
      },
      {
        InternalName: "ProgressStatusDeliverable",
        DisplayName: "حالة الإنجاز ( المخرجات)",
        DisplayNameEn: "Completation Status (Deliverables)",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "stat1", value: "stat1" },
            { display: "stat2", value: "stat2" },
            { display: "stat3", value: "stat3" },
            { display: "stat6", value: "stat6" },
            { display: "stat7", value: "stat7" },
          ],
        },
      },
      {
        InternalName: "PlannedImplementationMilestone",
        DisplayName: "نسبة التنفيذ المخططة (المعالم)",
        DisplayNameEn: "Percentage of planned implementation (Milestones)",
        type: "float",
      },
      {
        InternalName: "ActualImplementationMilestone",
        DisplayName: "نسبة التنفيذ الفعلية (المعالم)",
        DisplayNameEn: "% of actual implementation (Milestones)",
        type: "float",
      },
      {
        InternalName: "ProgressStatusMilestone",
        DisplayName: "حالة الإنجاز (المعالم)",
        DisplayNameEn: "Progress Status (Milestones)",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "stat1", value: "stat1" },
            { display: "stat2", value: "stat2" },
            { display: "stat3", value: "stat3" },
            { display: "stat6", value: "stat6" },
            { display: "stat7", value: "stat7" },
          ],
        },
      },
      {
        InternalName: "PlannedImplementationSchedule",
        DisplayName: "نسبة التنفيذ المخططة (الجدول الزمني)",
        DisplayNameEn: "Percentage of planned implementation (Schedule)",
        type: "float",
      },
      {
        InternalName: "ActualImplementationSchedule",
        DisplayName: "نسبة التنفيذ الفعلية (الجدول الزمني)",
        DisplayNameEn: "% of actual implementation (Schedule)",
        type: "float",
      },
      {
        InternalName: "ProgressStatusSchedule",
        DisplayName: "حالة الإنجاز (الجدول الزمني)",
        DisplayNameEn: "Completation Status (Schedule)",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "stat1", value: "stat1" },
            { display: "stat2", value: "stat2" },
            { display: "stat3", value: "stat3" },
            { display: "stat6", value: "stat6" },
            { display: "stat7", value: "stat7" },
          ],
        },
      },
    ],
  },
  {
    label: 'بيانات المخرج',
    labelEn: 'Delivrable Data',
    toggleName:"Delivrables",
    description: 'التفاصيل',
    descriptionEn: 'Details',
    sectiontype: 'master',
    // className: "disable_section", // to make the section disabled on form render
    targetlist: 'Deliverables',
    subFields: [
      {
        InternalName: 'Title',
        DisplayName: 'رمز المخرج',
        DisplayNameEn: 'Code',
        type: 'string',
      },
      {
        InternalName: 'Name',
        DisplayName: 'اسم المخرج',
        DisplayNameEn: 'Name',
        type: 'string',
      },
      {
        InternalName: 'Description',
        DisplayName: 'الوصف',
        DisplayNameEn: 'Description',
        type: 'multiline',
      },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن',
        DisplayNameEn: 'Weight',
        type: 'floatpercentage',
        ToggleName: "Weight",
      },
      //here is an issue
      //   {
      //     "InternalName": "Amount",
      //     "DisplayName": "القيمة",
      //     "DisplayNameEn": "Amount",
      //     dontSubmit: true,
      //     "type": "percentbyrelatedparent",
      //     "listname":"Projects",
      //     "parentinternalname":"ActualBudget",
      //     "targetelement":"Weight",
      // },
      // {
      //   InternalName: 'Status',
      //   DisplayName: 'الحالة',
      //   DisplayNameEn: 'Status',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       {
      //         display: 'workinprogress',
      //         value: 'workinprogress',
      //       },
      //       {
      //         display: 'completed',
      //         value: 'completed',
      //       },
      //     ],
      //   },
      // },
      // {
      //     "InternalName": "Quantity",
      //     "DisplayName":"الكمية",
      //     "type":"float"
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
      // },
      {
        InternalName: 'PlannedFinishDate',
        DisplayName: 'تاريخ الانتهاء المخطط',
        DisplayNameEn: 'Planned Finish Date',
        type: 'datetime',
        // type: 'datetimetoparent',
        // listname: 'Projects',
        // startinternalname: 'BaselineStartDate',
        // endinternalname: 'BaselineFinishDate',
        // "min": "PlannedStartDate"
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
      //     "type": "datetime"
      // },
      // {
      //     "InternalName": "StartDate",
      //     "DisplayName": "تاريخ البدءالفعلي",
      //     "DisplayNameEn": "Start Date",
      //     "type": "datetime",
      //     "max":"today"
      // },
      // {
      //     "InternalName": "FinishDate",
      //     "DisplayName": "تاريخ الانتهاء الفعلي",
      //     "DisplayNameEn": "Finish Date",
      //     "type": "datetime",
      //     "min": "StartDate",
      //     "max":"today"
      // },
      {
        InternalName: 'Delivered',
        DisplayName: 'تم التسليم',
        DisplayNameEn: 'Delivered',
        type: 'radio',
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
        InternalName: 'DeliveredDate',
        DisplayName: 'تاريخ التسليم',
        DisplayNameEn: 'Delivered Date',
        type: 'datetime',
      },
      {
        InternalName: 'AcceptanceCriteria',
        DisplayName: 'معايير قبول المخرج',
        DisplayNameEn: 'Acceptance Criteria',
        type: 'multiline',
      },
      {
        InternalName: 'Comments',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
      },
      {
        InternalName: 'RelatedInitiativeDeliverable',
        DisplayName: 'مخرج المبادرة المرتبط',
        DisplayNameEn: 'Related Initiative Deliverable',
        type: 'lookuptoparentchild',
        parentlist: 'Projects',
        parentinternalname: 'RelatedInitiative',
        source: 'InitiativeDeliverables',
        sourceinternalname: 'InitiativeCode',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        ToggleName: 'MDRelatedInitiativeDeliverable',
      },
      {
        InternalName: 'ShowInProgramReport',
        DisplayName: 'اظهار في التقرير',
        DisplayNameEn: 'Show In Program Report',
        type: 'radio',
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
    ],
  },
  {
    label: 'بيانات المعلم',
    labelEn: 'Milestone Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    sectiontype: 'master',
    targetlist: 'Milestones',
    toggleName:'Milestones',
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
        ToggleName: "Weight",
      },
      // there is an issue 
      // {
      //   InternalName: 'Amount',
      //   DisplayName: 'القيمة',
      //   DisplayNameEn: 'Amount',
      //   dontSubmit: true,
      //   type: 'percentbyrelatedparent',
      //   listname: 'Projects',
      //   parentinternalname: 'ActualBudget',
      //   targetelement: 'Weight',
      // },
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
        source: 'InitiativeMilestones',
        // source: 'Milestones',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        ToggleName: 'MDRelatedInitiativeMilestone',
        display: 'none',
      },
      {
        InternalName: 'Delivered',
        DisplayName: 'تم التسليم',
        DisplayNameEn: 'Delivered',
        // targetfieldrequired: 'getFile', // to make the attache required on yes
        // targetfield: 'Status',
        // targetfieldvalue: 'completed',
        type: 'radio',
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
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
          ],
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
];