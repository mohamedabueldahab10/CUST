var Information_Form = [
  {
    label: 'بيانات المشروع',
    labelEn: 'Project Data',
    description: '',
    descriptionEn: '',
    subFields: [
      {
        InternalName: 'Title',
        DisplayName: 'رمز المشروع',
        DisplayNameEn: 'Code',
        type: 'string',
      },
      {
        InternalName: 'Name',
        DisplayName: 'اسم المشروع',
        DisplayNameEn: 'Project Name',
        type: 'string',
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
        BIlanguage: true, //added to handle portfolio bilangual
        DispfieldkeyEn: 'NameEn', //added to handle portfolio bilangual
      },
      //   {
      //     InternalName: 'Name',
      //     DisplayName: 'اسم المشروع',
      //     DisplayNameEn: 'Project Name',
      //     type: 'string',
      //   },
      //   {
      //     InternalName: 'Title',
      //     DisplayName: 'رمز المشروع',
      //     DisplayNameEn: 'Project Code',
      //     type: 'code',
      //   },
      {
        InternalName: 'Description',
        DisplayName: 'وصف المشروع والتحديات التي يعالجها',
        DisplayNameEn: 'Description',
        type: 'multiline',
        // hideonstage: "1"
      },
      {
        InternalName: 'ScopeOfWork',
        DisplayName: 'نطاق العمل',
        DisplayNameEn: 'ScopeOfWork',
        type: 'multiline',
        maxchar: 5000,
        // hideonstage: "1"
      },
      {
        InternalName: 'OutOfScope',
        DisplayName: 'خارج نطاق العمل',
        DisplayNameEn: 'Out Of Scope',
        type: 'multiline',
        maxchar: 5000,
        //"state": "disabled"
      },
      {
        InternalName: 'Assumptions',
        DisplayName: ' إفتراضات المشروع',
        DisplayNameEn: 'Project Assumptions',
        type: 'multiline',
        maxchar: 5000,
        //"state": "disabled"
      },
      {
        InternalName: 'PMNotes',
        DisplayName: 'ملاحظات مدير المشروع',
        DisplayNameEn: 'PM Notes',
        type: 'multiline',
        maxchar: 5000,
        // hideonstage: "1"
      },
      {
        InternalName: 'FlaggedProjects',
        DisplayName: 'مشروع مشار اليه؟',
        DisplayNameEn: 'Is Flagged Project?',
        // validation: 'required',
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
          ],
        },
      },
      {
        InternalName: 'NTP',
        DisplayName: 'NTP',
        DisplayNameEn: 'NTP',
        // validation: 'required',
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
          ],
        },
      },
      {
        InternalName: 'Committees',
        DisplayName: 'اللجان',
        DisplayNameEn: 'Committees',
        type: 'string',
        // "maxchar": 5000,
        // hideonstage: "1"
      },
      {
        InternalName: 'RelatedInitiative',
        DisplayName: ' المبادرة المرتبطة',
        DisplayNameEn: 'Related Initiative',
        // type: 'string',
        type: 'lookup',
        //from other list:ma
        source: 'Initiatives',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // security: {
        //     groups: [
        //         'EPMO', 'System Admin Group', 'SPMO'
        //     ]
        // },
        // "state": "disabled",
        // "className":"autofill"
      },
      {
        InternalName: 'RelatedInitiativeDeliverable',
        DisplayNameEn: 'Related Initiative Deliverable',
        DisplayName: 'مخرج المبادرة المرتبط',
        // type: 'string',
        type: 'multiselectstring',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        source: 'InitiativeDeliverables',
      },
      {
        InternalName: 'CorrectivePlan',
        DisplayName: 'الخطة التصحيحية',
        DisplayNameEn: 'Corrective Plan',
        // type: 'string',
        type: 'multiline',
        // "maxchar": 5000,
        // hideonstage: "1"
      },
      {
        InternalName: 'ProjectType',
        DisplayName: 'نوع المشروع',
        DisplayNameEn: 'Project Type',
        type: 'dropdownValues',
        // validation: 'required',
        options: {
          choices: [
            {
              display: 'internal',
              value: 'Internal',
            },
            {
              display: 'external',
              value: 'External',
            },
          ],
        },
      },
      {
        InternalName: 'Category',
        DisplayName: 'تصنيف  المشروع',
        DisplayNameEn: 'Category',
        // validation: 'required',
        type: 'dropdownValues',
        options: {
          choices: [
            // شغيلي- تحولي - استراتيجي
            // { display: 'strategyproject', value: 'strategyproject' },
            {
              display: 'transformativeproject',
              value: 'transformativeproject',
            },
            { display: 'operationalproject', value: 'operationalproject' },
          ],
        },
      },
      {
        InternalName: 'IsStrategicProject',
        DisplayName: 'هل هو مشروع استراتيجي؟',
        DisplayNameEn: 'Is Strategic Project?',
        type: 'yesnoradio',
        // validation: 'required',
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
      // {
      //   InternalName: 'Status',
      //   DisplayName: 'مرحلة المشروع',
      //   DisplayNameEn: 'Project Stage',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       {
      //         display: 'cancelled',
      //         value: 'cancelled',
      //       },
      //       {
      //         display: 'pending',
      //         value: 'pending',
      //       },
      //       {
      //         display: 'inprogress',
      //         value: 'inprogress',
      //       },
      //       {
      //         display: 'notstarted',
      //         value: 'notstarted',
      //       },
      //       {
      //         display: 'completed',
      //         value: 'completed',
      //       },
      //     ],
      //   },
      // },
      {
        InternalName: 'BaselineStartDate',
        DisplayName: 'تاريخ بدء الأساس',
        DisplayNameEn: 'Baseline Start Date',
        type: 'datetime',
        max: 'BaselineFinishDate',
        // "state": "disabled"
      },
      {
        InternalName: 'BaselineFinishDate',
        DisplayName: 'تاريخ إنهاء الأساس',
        DisplayNameEn: 'Baseline Finish Date',
        type: 'datetime',
        min: 'BaselineStartDate',
        // "state": "disabled"
      },

      {
        InternalName: 'Sector',
        DisplayName: 'القطاع',
        DisplayNameEn: 'Sector',
        type: 'lookup',
        // validation: 'required',
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
        DisplayName: 'الوكالات',
        DisplayNameEn: 'DeputyShip',
        type: 'lookup',
        //from other list:
        source: 'Internal Entities',
        isSector: 'True',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
      },

      {
        InternalName: 'Priority',
        DisplayName: 'أهمية المشروع',
        DisplayNameEn: 'Priority',
        type: 'dropdownValues',
        // validation: 'required',
        options: {
          choices: [
            // {
            //     display: 'pr04low',
            //     value: 'pr04low'
            // },
            {
              display: 'pr03medium',
              value: 'pr03medium',
            },
            {
              display: 'pr02important',
              value: 'pr02important',
            },
            {
              display: 'pr01veryimportant',
              value: 'pr01veryimportant',
            },
            //'مهم','مهم جدا','متوسط','منخفض'
          ],
        },
      },

      {
        InternalName: 'ExecutionChannels',
        DisplayName: 'الجهة المنفذة',
        DisplayNameEn: 'Execution Channels',
        // type: 'string',
        type: 'multiline',
      },
      {
        InternalName: 'ProjectOverview',
        DisplayName: 'ملخص المشروع',
        DisplayNameEn: 'Project Overview',
        type: 'multiline',
        // type: 'string',
      },
      // {
      //     "InternalName": "BaselineDuration",
      //     "DisplayName": "مدة الأساس",
      //     "DisplayNameEn": "Baseline Duration",
      //     "type": "float",
      //     // "maxchar": 5000,
      //     // hideonstage: "1"
      // },

      {
        InternalName: 'Comments',
        DisplayName: 'ملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,
        security: {
          groups: [
            'VRO_E',
            'LMS_E',
            'EPMO',
            'System Admin Group',
            'Project Managers for Project Web App',
            'SPMO',
            'Development Unit',
          ],
        },
        // hideonstage: "1"
      },

      {
        InternalName: 'ProjectSize',
        DisplayName: 'حجم المشروع',
        DisplayNameEn: 'Project Size',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'large', value: 'large' },
            { display: 'medium', value: 'medium' },
            { display: 'small', value: 'small' },
          ],
        },
      },
      {
        InternalName: 'ProjectPriority',
        DisplayName: 'أولوية المشروع',
        DisplayNameEn: 'Project Priority',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'low', value: 'low' },
            { display: 'medium', value: 'medium' },
            { display: 'high', value: 'high' },
          ],
        },
      },

      {
        InternalName: 'IsZeroBudgetProject',
        DisplayName: 'هل هو مشروع صفرى؟',
        DisplayNameEn: 'Is Zero Budget Project ?',
        type: 'yesnoradio',
        options: {
          choices: [
            { display: 'yes', value: 'true' },
            { display: 'no', value: 'false' },
          ],
        },
      },
      {
        InternalName: 'ActualCostWorkCompleted',
        DisplayName: 'التكلفة الفعلية للعمل المنجز',
        DisplayNameEn: 'Actual Cost Work Completed',
        type: 'float',
        // "state": "disabled"
      },

      {
        InternalName: 'ProjectBudgetCost',
        DisplayName: 'تكلفة ميزانية المشروع',
        DisplayNameEn: 'Project Budget Cost',
        type: 'float',
        // "state": "disabled"
      },

      {
        InternalName: 'Stage',
        DisplayName: 'الطور',
        DisplayNameEn: 'Stage',
        type: 'lookup',
        //from other list:
        source: 'Stages',
        Dispfieldkey: 'StageName',
        DispfieldkeyEn: 'StageNameEn',
        valfieldkey: 'Title',
      },

      {
        InternalName: 'Phase',
        DisplayName: 'المرحلة',
        DisplayNameEn: 'Phase',
        type: 'lookup',
        //from other list:
        source: 'Phases',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'PhaseNameEn',
        valfieldkey: 'Title',
      },

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
    label: 'التمويل',
    labelEn: 'Funding',
    description: '',
    descriptionEn: '',
    subFields: [
      {
        InternalName: 'FundingSources',
        DisplayName: 'مصادر التمويل',
        DisplayNameEn: 'Funding Sources',
        type: 'string',
      },

      {
        InternalName: 'FundingStatus',
        DisplayName: 'حالة التمويل',
        DisplayNameEn: 'Funding Status',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'funded', value: 'funded' },
            { display: 'unfunded', value: 'unfunded' },
            { display: 'partiallyfunded', value: 'partiallyfunded' },
            { display: 'zero', value: 'zero' },
          ],
        },
      },
    ],
  },
  {
    label: 'الموازنة',
    labelEn: 'Budget',
    description: '',
    descriptionEn: '',
    subFields: [
      {
        InternalName: 'PRCode',
        DisplayName: 'رمز المشتريات',
        DisplayNameEn: 'Purchase code',
        // type: 'float',
        type: 'string',
      },

      {
        InternalName: 'ERPCode',
        DisplayNameEn: 'ERP Code',
        DisplayName: 'ترميز موارد',
        type: 'string',
        maxchar: '250',
        // "validation": "required"
      },
      {
        InternalName: 'BudgetItem',
        DisplayName: 'البند المرتبط',
        DisplayNameEn: 'Budget Item',
        type: 'lookup',
        dynamic: 'mainfield', //controls others data
        //from other list:
        source: 'Budget Items',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        // "validation": "required",
        // "state": "disabled"
      },
      {
        InternalName: 'Amount',
        DisplayName: 'التكلفة',
        DisplayNameEn: 'Amount',
        type: 'float',
        // "state": "disabled",
        dynamic: 'BudgetItem', //being controlled by main field
      },

      {
        InternalName: 'Cost1',
        DisplayName: 'التكلفة المخصصة لعام',
        DisplayNameEn: 'Cost 1',
        type: 'float',
        state: 'disabled',
        dynamic: 'BudgetItem',
      },
      {
        InternalName: 'Cost2',
        DisplayName: 'التكلفة المخصصة لعام',
        DisplayNameEn: 'Cost 2',
        type: 'float',
        state: 'disabled',
        dynamic: 'BudgetItem',
      },
      {
        InternalName: 'Cost3',
        DisplayName: 'التكلفة المخصصة لعام',
        DisplayNameEn: 'Cost 3',
        type: 'float',
        state: 'disabled',
        dynamic: 'BudgetItem',
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
      {
        InternalName: 'AssignedBudget',
        DisplayName: 'الموازنة المعتمدة',
        DisplayNameEn: 'Assigned Budget',
        type: 'float',
        //"state": "disabled"
        // "showonstage":"1"
      },
      {
        InternalName: 'ExpectedBudget',
        DisplayName: 'الموازنة المتوقعة',
        DisplayNameEn: 'Expected Budget',
        type: 'float',
        state: 'disabled',
      },
      // {
      //     "InternalName": "ContractualValue",
      //     "DisplayName":"قيمة العقد (قيمة المشروع)",
      //     "DisplayNameEn":"Contractual Value",
      //     "type":"float"
      // },
      {
        InternalName: 'ActualBudget',
        DisplayName: 'التكلفة الفعلية',
        DisplayNameEn: 'Actual Budget',
        type: 'float',
        RequiredName: 'ActualBudget',
        // "state": "disabled"
      },

      {
        InternalName: 'ContractualEngagements',
        DisplayName: 'الارتباطات التعاقدية',
        DisplayNameEn: 'ContractualEngagements',
        type: 'float',
        // "state": "disabled"
      },

      {
        InternalName: 'EngagementPercentage',
        DisplayName: 'نسبة الارتباط من التكاليف ',
        DisplayNameEn: 'Engagement Percentage',
        type: 'floatpercentage',
        // "state": "disabled"
      },

      {
        InternalName: 'ExpensesDate',
        DisplayName: 'المنصرف حتى تاريخه',
        DisplayNameEn: 'Expenses',
        type: 'float',
        // "state": "disabled"
      },
      {
        InternalName: 'RemainingCost',
        DisplayName: 'التكلفة المتبقية',
        DisplayNameEn: 'Remaining Cost',
        type: 'float',
        // "state": "disabled"
      },
      {
        InternalName: 'OutOfCash',
        DisplayName: 'نسبة المنصرف من السيولة ',
        DisplayNameEn: 'Out Of Cash',
        type: 'float',
        // "state": "disabled"
      },

      {
        InternalName: 'BudgetStatus',
        DisplayName: 'حالة تمويل المشروع (حسب الحوكمة)',
        DisplayNameEn: 'Budget Status',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'finance', value: 'finance' },
            { display: 'notfinanced', value: 'notfinanced' },
            { display: 'nofinance', value: 'nofinance' },
            { display: 'externalfinance', value: 'externalfinance' },
          ],
        },
        //"state": "disabled"
      },
    ],
  },
  {
    label: 'الطرح والتعاقد',
    labelEn: 'Tendering and Contracting',
    description: '',
    descriptionEn: '',
    subFields: [
      {
        InternalName: 'PlannedOfferingDate',
        DisplayName: 'التاريخ المخطط للطرح',
        DisplayNameEn: 'Planned Date of Offering',
        type: 'datetime',
      },
      {
        InternalName: 'ActualOfferingDate',
        DisplayName: 'تاريخ  الطرح الفعلى',
        DisplayNameEn: 'Actual Offering Date',
        type: 'datetime',
      },
      {
        InternalName: 'AwardDate',
        DisplayName: 'تاريخ  الترسية',
        DisplayNameEn: 'Award Date',
        type: 'datetime',
      },
      {
        InternalName: 'ContractualDate',
        DisplayName: 'تاريخ التعاقد',
        DisplayNameEn: 'Contractual Date',
        type: 'datetime',
      },
      // {
      //   InternalName: 'ApprovedBrochure',
      //   DisplayName: 'المرفقات',
      //   DisplayNameEn: 'Attachments',
      //   type: 'file',
      //   withAddBtn: 'true',
      // },
      {
        InternalName: 'RFPStatus',
        DisplayName: 'حالة الكراسة',
        DisplayNameEn: 'RFP Status',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'brochureapproved', value: 'brochureapproved' },
            { display: 'linkinginprogress', value: 'linkinginprogress' },
            { display: 'linked', value: 'linked' },
          ],
        },
        requiredValues: [
          { value: 'linked', fields: ['ActualBudget'] }, //we can put more than 1  field
        ],
      },
    ],
  },
  {
    label: 'طاقم عمل المشروع',
    labelEn: 'Project Staff',
    description: '',
    descriptionEn: '',
    subFields: [
      // {
      //     "InternalName": "Owner",
      //     "DisplayName": "المالك",
      //     "DisplayNameEn": "Owner",
      //     "type": "picker",
      //     // "showonstage": "2"
      // },
      {
        InternalName: 'ProjectOwner',
        DisplayName: 'مالك المشروع',
        DisplayNameEn: 'Project Owner',
        type: 'picker',
        // validation: 'required',
      },
      {
        InternalName: 'ProjectManager',
        DisplayName: 'مدير المشروع',
        DisplayNameEn: 'Project Manager',
        type: 'picker',
        showonstage: '2',
      },
      // {

      //     "InternalName": "DirectorUnit",
      //     "DisplayName":" مدير وحدة الانجاز",
      //     "DisplayNameEn":"Director Unit",
      //     "type":"picker",

      // },
      {
        InternalName: 'ProjectSponsor',
        DisplayName: 'راعي المشروع',
        DisplayNameEn: 'Project Sponsor',
        type: 'picker',
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
    label: 'المشاريع الإعتمادية',
    description: '',
    labelEn: 'Dependency Project',
    descriptionEn: '',
    sectiontype: 'master',
    targetlist: 'Dependency Projects',
    subFields: [
      {
        InternalName: 'DependencyProject',
        DisplayName: 'إعتمادية على مشروع اّخر',
        DisplayNameEn: 'Dependency Project',
        type: 'lookup',
        //from other list:
        source: 'Projects',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'Description',
        DisplayName: 'وصف الإعتمادية',
        DisplayNameEn: 'Description',
        type: 'multiline',
        // type: 'string',
      },
    ],
  },
  {
    label: 'المخرجات',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    labelEn: '',
    descriptionEn: 'Delivrables',
    sectiontype: 'master',
    targetlist: 'Delivrables',
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
        InternalName: 'Amount',
        DisplayName: 'القيمة',
        DisplayNameEn: 'Amount',
        dontSubmit: true,
        type: 'percentbyrelatedparent',
        listname: 'Projects',
        parentinternalname: 'ActualBudget',
        targetelement: 'Weight',
      },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن',
        DisplayNameEn: 'Weight',
        type: 'floatpercentage',
      },
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
        InternalName: 'DeliveredDate',
        DisplayName: 'تاريخ التسليم',
        DisplayNameEn: 'Delivered Date',
        type: 'datetime',
      },
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
          ],
        },
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
        DisplayNameEn: 'Related Initiative Deliverable',
        DisplayName: 'مخرج المبادرة المرتبط',
        type: 'lookup',
        source: 'InitiativeDeliverables',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'ShowInProgramReport',
        DisplayName: 'اظهار في التقرير',
        DisplayNameEn: 'Show In Program Report',
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
          ],
        },
      },
    ],
  },
  {
    label: 'المعالم',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    labelEn: 'Milestones',
    descriptionEn: '',
    sectiontype: 'master',
    targetlist: 'Milestones',
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
      {
        InternalName: 'Weight',
        DisplayNameEn: 'Weight',
        DisplayName: 'الوزن المكافئ للإنجاز %',
        type: 'floatpercentage',
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
      },
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
        // source: 'InitiativeMilestones',
        source: 'Milestones',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'Delivered',
        DisplayName: 'تم التسليم',
        DisplayNameEn: 'Delivered',
        targetfieldrequired: 'getFile', // to make the attache required on yes
        targetfield: 'Status',
        targetfieldvalue: 'completed',
        type: 'yesnoradio',
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
      },
      {
        InternalName: 'SupportDocumentsDescription',
        DisplayNameEn: 'Support Documents Description',
        DisplayName: 'وصف الوثائق الداعمة',
        type: 'multiline',
        maxchar: '500',
      },
    ],
  },
  // {
  //     label: 'المنافع المتوقعة',
  //     labelEn: 'Expected Benefits',
  //     description: "",
  //     descriptionEn: "",
  //     subFields: [{
  //             "InternalName": "ExpectedBenefits",
  //             "DisplayName": "المنافع المتوقعة",
  //             "DisplayNameEn": "Expected Benefits",
  //             "type": "string"
  //         }
  //         // ,
  //         // {
  //         //     "InternalName": "Impacts",
  //         //     "DisplayName": "الأثر المتوقع",
  //         //     "DisplayNameEn": "Impact",
  //         //     "type": "multiline"
  //         // }

  //     ]
  // },
  // {
  //     label: 'المساهمة بمؤشرات الأداء الرئيسية',
  //     description: "",
  //     sectiontype:"master",
  //     targetlist:"Project KPIs",
  //     subFields:[
  //         {
  //             "InternalName": "Title",
  //             "DisplayName":"المؤشر التشغيلي",
  //             "DisplayNameEn":"",
  //             "type":"lookup",
  //              "source": "OPKPIs",
  //              "Dispfieldkey": "Name",
  //              "valfieldkey": "Title"
  //         },
  //         {
  //             "InternalName": "ProjectContribution",
  //             "DisplayName":"الأثر المتوقع",
  //             "DisplayNameEn":"Project Contribution",
  //             "type":"string"
  //         },
  //         {
  //             "InternalName": "Description",
  //             "DisplayName":"الوصف",
  //             "DisplayNameEn":"Description",
  //             "type":"multiline"
  //         },
  //     ]
  // },

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
  //             "type": "string"
  //         },
  //         {
  //             "InternalName": "Role",
  //             "DisplayName": "الدور",
  //             "DisplayNameEn": "Role",
  //             "type": "string"
  //         }
  //     ]
  // },

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
  //             "type": "string"
  //         },
  //         {
  //             "InternalName": "Probability",
  //             "DisplayName": "إحتمالية الحدوث",
  //             "DisplayNameEn": "Probability",
  //             "type": "string"
  //         },
  //         {
  //             "InternalName": "ResolutionPlan",
  //             "DisplayName": "خطة التعامل مع المخاطر",
  //             "DisplayNameEn": "Resolution Plan",
  //             "type": "multiline"
  //         }
  //     ]
  // },
  //   {
  //     label: 'البدء بعملية المشتريات',
  //     labelEn: 'Purchase Start',
  //     description: '',
  //     descriptionEn: '',
  //     subFields: [
  //     //   {
  //     //     InternalName: 'PRCode',
  //     //     DisplayName: 'رمز المشتريات',
  //     //     DisplayNameEn: 'Purchase code',
  //     //     type: 'float',
  //     //   },
  //     ],
  //   },
]
