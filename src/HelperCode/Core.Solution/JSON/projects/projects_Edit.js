var Information_Form = [{
    label: 'بيانات المشروع',
    labelEn: 'Project Data',
    description: "",
    descriptionEn: "",
    subFields: [
        {
            "InternalName": "Portfolio",
            "DisplayName": "المحفظة",
            "DisplayNameEn": "Portfolio",
            "type": "lookup",
            // "validation": "required",
            //from other list:
            "source": "Portfolio",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",
            "BIlanguage" : true, //added to handle portfolio bilangual
            "DispfieldkeyEn": "NameEn",//added to handle portfolio bilangual
            security: {
                groups: [
                    'EPMO', 'Administrators for Project Web App', 'OPMO', 'Project Managers for Project Web App'
                ]
            },
            // "state": "disabled",
            // "className":"autofill"
        },

        {
            "InternalName": "Name",
            "DisplayName": "اسم المشروع",
            "DisplayNameEn": "Project Name",
            "type": "string",
            "validation": "required",
            security: {
                groups: [
                    'EPMO', 'Administrators for Project Web App'
                ]
            },
        },
        {
            "InternalName": "Description",
            "DisplayName": "وصف المشروع والتحديات التي يعالجها",
            "DisplayNameEn": "Description",
            "type": "multiline",
            "validation": "required",
            "maxchar": 5000,
            security: {
                groups: [
                    'EPMO', 'Administrators for Project Web App', 'OPMO', 'Project Managers for Project Web App'
                ]
            },
            // hideonstage: "1"
        },
        {
            "InternalName": "ScopeOfWork",
            "DisplayName": "نطاق المشروع",
            "DisplayNameEn": "ScopeOfWork",
            "type": "multiline",
            "maxchar": 5000,
            "validation": "required",
            security: {
                groups: [
                    'EPMO', 'Administrators for Project Web App', 'OPMO', 'Project Managers for Project Web App'
                ]
            },
            // hideonstage: "1"
        },
        // {
        //     "InternalName": "Comments",
        //     "DisplayName": "ملاحظات",
        //     "DisplayNameEn": "Comments",
        //     "type": "multiline",
        //     "maxchar": 5000,
        //     security: {
        //         groups: [
        //             'EPMO', 'Administrators for Project Web App', 'OPMO', 'Project Managers for Project Web App', 'SPMO','Development Unit'
        //         ]
        //     },
        //     // hideonstage: "1"
        // },
        {
            "InternalName": "PMNotes",
            "DisplayName": "ملاحظات مدير المشروع",
            "DisplayNameEn": "PM Notes",
            "type": "multiline",
            "maxchar": 5000,
            // hideonstage: "1"
        },

        {
            "InternalName": "FlaggedProjects",
            "DisplayName": "مشروع مشار اليه؟",
            "DisplayNameEn": "Is Flagged Project?",
            "validation": "required",
            "type": "yesnoradio",
            options: {
                choices: [{
                    display: 'yes',
                    value: 'yes'
                },
                {
                    display: 'no',
                    value: 'no'
                }
                ]
            },
            security: {
                groups: [
                    'EPMO', 'Administrators for Project Web App', 'OPMO', 'Project Managers for Project Web App', 'SPMO','Development Unit'
                ]
            },
        },
        {
            "InternalName": "NTP",
            "DisplayName": "NTP",
            "DisplayNameEn": "NTP",
            "validation": "required",
            "type": "yesnoradio",
            options: {
                choices: [{
                    display: 'yes',
                    value: 'yes'
                },
                {
                    display: 'no',
                    value: 'no'
                }
                ]
            },
            security: {
                groups: [
                    'EPMO', 'Administrators for Project Web App', 'OPMO', 'SPMO','Development Unit'
                ]
            },
        },
        {
            "InternalName": "Committees",
            "DisplayName": "اللجان",
            "DisplayNameEn": "Committees",
            "type": "string",
            security: {
                groups: [
                    'EPMO', 'Administrators for Project Web App', 'OPMO', 'Project Managers for Project Web App', 'SPMO','Development Unit'
                ]
            },
            // "maxchar": 5000,
            // hideonstage: "1"
        },
        {
            "InternalName": "RelatedInitiative",
            "DisplayName": " المبادرة المرتبطة",
            "DisplayNameEn": "Related Initiative",
            "type": "lookup",
            //from other list:ma
            "source": "Initiatives",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",
            security: {
                groups: [
                    'EPMO', 'Administrators for Project Web App', 'OPMO', 'SPMO','Development Unit'
                ]
            },
            // "state": "disabled",
            // "className":"autofill"
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
        //     // "className":"autofill"
        // },
        {
            "InternalName": "RelatedInitiativeDeliverable",
            "DisplayName": " مخرج المبادرة المرتبط",
            "DisplayNameEn": "Related Initiative Deliverable",
            "type": "lookupmultiselect",
            //from other list:ma
            "source": "InitiativeDeliverables",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",
            "grpfieldkey":"Title",
            "state": "disabled",
        },
        {
            "InternalName": "InitiativeVision",
            "DisplayNameEn": "Initiative Vision",
            "DisplayName": "مبادرة تحقيق الرؤية",
            // "ToggleName":"SubRelatedObjective",
            "type": "lookupWithQuery",
            "queryField": "Types",
            "queryFieldType": "Choices", //ex: "Choice"
            "queryFieldValue": "vision",
            //from other list:
            "source": "Initiatives",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",
            // "display":"none"

        },
        {
            "InternalName": "InitiativeProgram",
            "DisplayName": "البرنامج",
            "DisplayNameEn": "Program", 
            "DisplayName": "اسم البرنامج",
            "type": "lookup",
            "source": "Instruments",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title"
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
            "InternalName": "KPIs",
            "DisplayName": "مؤشر القياس",
            "DisplayNameEn": "KPIs",
            "type": "lookup",
            "source": "MainKPI",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",
            security: {
                groups: [
                    'EPMO', 'Administrators for Project Web App', 'OPMO', 'SPMO','Development Unit', 'Project Managers for Project Web App'
                ]
            },
            // "maxchar": 5000,
            // hideonstage: "1"
        },
        {
            "InternalName": "CorrectivePlan",
            "DisplayName": "الخطة التصحيحية",
            "DisplayNameEn": "Corrective Plan",
            "type": "multiline",
            security: {
                groups: [
                    'EPMO', 'Administrators for Project Web App', 'OPMO', 'SPMO','Development Unit','Project Managers for Project Web App'
                ]
            },
            // "maxchar": 5000,
            // hideonstage: "1"
        },
        {
            "InternalName": "Status",
            "DisplayName": "مرحلة المشروع",
            "DisplayNameEn": "Project Stage",
            "type": "dropdownValues",
            "validation": "required",
            options: {
                choices: [
                    { value: 'notstarted', display: 'notstarted' },
                    { value: 'inprogress', display: 'inprogress' },
                    { value: 'onhold', display: 'onhold' },
                    { value: 'completed', display: 'completed' },
                    { value: 'cancelled', display: 'cancelled' }
                    //'لم يبدء', 'مكتمل', 'قيد التقدم', 'معلق ', 'ملغى'
                ]
            },
            security: {
                groups: [
                    'EPMO', 'Administrators for Project Web App', 
                ]
            },
        },
        {
            "InternalName": "ProjectType",
            "DisplayName": "نوع المشروع",
            "DisplayNameEn": "Project Type",
            "validation": "required",
            "type": "dropdownValues",
            options: {
                choices: [
                    { display: 'internal', value: 'Internal' },
                    { display: 'external', value: 'External' }
                ]
            }
        },
        {
            "InternalName": "Category",
            "DisplayName": "تصنيف  المشروع",
            "DisplayNameEn": "Category",
            "validation": "required",
            "type": "dropdownValues",
            options: {
                choices: [
                    // شغيلي- تحولي - استراتيجي
                    // { display: 'strategyproject', value: 'strategyproject' },
                    { display: 'transformativeproject', value: 'transformativeproject' },
                    { display: 'operationalproject', value: 'operationalproject' }
                ]
            }
        },
        {
            "InternalName": "IsStrategicProject",
            "DisplayName": "هل هو مشروع استراتيجي؟",
            "DisplayNameEn": "Is Strategic Project?",
            "type": "yesnoradio",
            options: {
                choices: [
                    { display: 'yes', value: 'true' },
                    { display: 'no', value: 'false' }
                ]
            },
            "validation": "required"
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
        {
            "InternalName": "BaselineStartDate",
            "DisplayName": "تاريخ بدء الأساس",
            "DisplayNameEn": "Baseline Start Date",
            "type": "datetime",
            "max": "BaselineFinishDate",
            // "state": "disabled"
        },
        {
            "InternalName": "BaselineFinishDate",
            "DisplayName": "تاريخ إنهاء الأساس",
            "DisplayNameEn": "Baseline Finish Date",
            "type": "datetime",
            "min": "BaselineStartDate",
            // "state": "disabled"
        },
        // {
        //     "InternalName": "BaselineBudget",
        //     "DisplayName": "تكلفة الأساس",
        //     "DisplayNameEn": "Baseline Budget",
        //     "type": "float",
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
        //         groups: [
        //             'EPMO', 'Administrators for Project Web App'
        //         ]
        //     },
        // },
        {
            "InternalName": "Sector",
            "DisplayName": "القطاع",
            "DisplayNameEn": "Sector",
            "type": "lookup",
            "validation": "required",
            //from other list:
            "source": "Internal Entities",
            "isSector": "True",
            "EntityType": "Sector",
            "Dispfieldkey": "Name",
            "DispfieldkeyEn": "NameEn",
            "valfieldkey": "Title",
            security: {
                groups: [
                    'EPMO', 'Administrators for Project Web App'
                ]
            },
        },
        {
            "InternalName": "SubSector",
            "DisplayName": "الوكالات",
            "DisplayNameEn": "Departments",
            "type": "lookup",
            //from other list:
            "source": "Internal Entities",
            "isSector": "True",
            "EntityType": "Department",
            "Dispfieldkey": "Name",
            "DispfieldkeyEn": "NameEn",
            "valfieldkey": "Title",
            security: {
                groups: [
                    'EPMO', 'Administrators for Project Web App'
                ]
            },
            // "state": "disabled"
        },
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
        //     // "state": "disabled"
        // }, hide this field based on 24-03-2022 - EPMO
        {
            "InternalName": "Priority",
            "DisplayName": "أهمية المشروع",
            "DisplayNameEn": "Priority",
            "type": "dropdownValues",
            options: {
                choices: [
                    // { display: 'pr04low', value: 'pr04low' },
                    { display: 'pr03medium', value: 'pr03medium' },
                    { display: 'pr02important', value: 'pr02important' },
                    { display: 'pr01veryimportant', value: 'pr01veryimportant' }
                    //'مهم','مهم جدا','متوسط','منخفض'
                ]
            },
            "validation": "required",
            security: {
                groups: [
                    'EPMO', 'Administrators for Project Web App', 'OPMO', 'SPMO','Development Unit','Project Managers for Project Web App'
                ]
            },
            // "state": "disabled",
            // "className":"autofill"
        },


        // {
        //     "InternalName": "TargetSegments",
        //     "DisplayName": "الشرائح المستهدفة (ان وجد)",
        //     "DisplayNameEn": "Target Segments",
        //     "type": "string",
        //     "state": "disabled"
        // },
        {
            "InternalName": "ExecutionChannels",
            "DisplayName": "الجهة المنفذة",
            "DisplayNameEn": "Execution Channels",
            "type": "string"
        },
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
        {
            "InternalName": "ProjectOverview",
            "DisplayName": "ملخص المشروع",
            "DisplayNameEn": "Project Overview",
            "type": "multiline",
            "maxchar": 5000,
            //"state": "disabled"
        },
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
        //     "InternalName": "Assumptions",
        //     "DisplayName": " إفتراضات المشروع",
        //     "DisplayNameEn": "Project Assumptions",
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

    ]
},
{
    label: 'الموازنة',
    labelEn: 'Budget',
    description: "",
    descriptionEn: "",
    subFields: [{
        "InternalName": "BudgetItem",
        "DisplayName": "البند المرتبط",
        "DisplayNameEn": "Budget Item",
        "type": "lookup",
        dynamic: "mainfield", //controls others data
        //from other list:
        "source": "Budget Items",
        "Dispfieldkey": "Name",
        "valfieldkey": "Title",
        // "validation": "required",
        // "state": "disabled"
    },
    {
        "InternalName": "Amount",
        "DisplayName": "التكلفة",
        "DisplayNameEn": "Amount",
        "type": "float",
        // "state": "disabled",
        dynamic: "BudgetItem" //being controlled by main field
    },

    {
        "InternalName": "Cost1",
        "DisplayName": "التكلفة المخصصة لعام",
        "DisplayNameEn": "Cost 1",
        "type": "float",
        "state": "disabled",
        dynamic: "BudgetItem"
    },
    {
        "InternalName": "Cost2",
        "DisplayName": "التكلفة المخصصة لعام",
        "DisplayNameEn": "Cost 2",
        "type": "float",
        "state": "disabled",
        dynamic: "BudgetItem"
    },
    {
        "InternalName": "Cost3",
        "DisplayName": "التكلفة المخصصة لعام",
        "DisplayNameEn": "Cost 3",
        "type": "float",
        "state": "disabled",
        dynamic: "BudgetItem"
    },
    {
        "InternalName": "Cost4",
        "DisplayName": "التكلفة المخصصة لعام",
        "DisplayNameEn": "Cost 4",
        "type": "float",
        "state": "disabled",
        dynamic: "BudgetItem"
    },
    {
        "InternalName": "Cost5",
        "DisplayName": "التكلفة المخصصة لعام",
        "DisplayNameEn": "Cost 5",
        "type": "float",
        "state": "disabled",
        dynamic: "BudgetItem"
    },
    {
        "InternalName": "ExpectedBudget",
        "DisplayName": "الموازنة المتوقعة",
        "DisplayNameEn": "Expected Budget",
        "type": "float",
        "state": "disabled"
    },

    {
        "InternalName": "AssignedBudget",
        "DisplayName": "الموازنة المعتمدة",
        "DisplayNameEn": "Assigned Budget",
        "type": "float",
        //"state": "disabled"
        // "showonstage":"1"
    },
    // {
    //     "InternalName": "ContractualValue",
    //     "DisplayName":"قيمة العقد (قيمة المشروع)",
    //     "DisplayNameEn":"Contractual Value",
    //     "type":"float"
    // },
    {
        "InternalName": "ActualBudget",
        "DisplayName": "الميزانية",
        "DisplayNameEn": "Actual Budget",
        "type": "float",
        // "state": "disabled"
    },
    {
        "InternalName": "ActualCostWorkCompleted",
        "DisplayName": "التكلفة الفعلية للعمل المنجز",
        "DisplayNameEn": "Actual Cost Work Completed",
        "type": "float",
        // "state": "disabled"
    },

    {
        "InternalName": "ProjectBudgetCost",
        "DisplayName": "تكلفة ميزانية المشروع",
        "DisplayNameEn": "Project Budget Cost",
        "type": "float",
        // "state": "disabled"
    },
    {
        "InternalName": "ContractualEngagements",
        "DisplayName": "الارتباطات التعاقدية",
        "DisplayNameEn": "ContractualEngagements",
        "type": "float",
        // "state": "disabled"
    },
    {
        "InternalName": "EngagementPercentage",
        "DisplayName": "نسبة الارتباط من التكاليف ",
        "DisplayNameEn": "Engagement Percentage",
        "type": "floatpercentage",
        // "state": "disabled"
    },
    {
        "InternalName": "EngagementPercentage",
        "DisplayName": "نسبة الارتباط من التكاليف ",
        "DisplayNameEn": "Engagement Percentage",
        "type": "floatpercentage",
        // "state": "disabled"
    },
    {
        "InternalName": "ExpensesDate",
        "DisplayName": "المنصرف حتى تاريخه",
        "DisplayNameEn": "Expenses",
        "type": "float",
        // "state": "disabled"
    },
    {
        "InternalName": "RemainingCost",
        "DisplayName": "التكلفة المتبقية",
        "DisplayNameEn": "Remaining Cost",
        "type": "float",
        // "state": "disabled"
    },
    {
        "InternalName": "OutOfCash",
        "DisplayName": "نسبة المنصرف من السيولة ",
        "DisplayNameEn": "Out Of Cash",
        "type": "floatpercentage",
        // "state": "disabled"
    },
    // {
    //     "InternalName": "SpentBudget",
    //     "DisplayName": "المبالغ المصروفة",
    //     "DisplayNameEn": "Spent Budget",
    //     "type": "float"
    // },
    {
        "InternalName": "BudgetStatus",
        "DisplayName": "حالة تمويل المشروع (حسب الحوكمة)",
        "DisplayNameEn": "Budget Status",
        "type": "dropdownValues",
        options: {
            choices: [
                { display: 'finance', value: 'finance' },
                { display: 'notfinanced', value: 'notfinanced' },
                { display: 'nofinance', value: 'nofinance' },
                { display: 'externalfinance', value: 'externalfinance' },
            ]
        },
        security: {
            groups: [
                'EPMO', 'Administrators for Project Web App', 'OPMO', 'SPMO','Development Unit','Project Managers for Project Web App'
            ]
        },
        //"state": "disabled"
    }
    

    ]
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
    label: 'طاقم عمل المشروع',
    labelEn: 'Project Staff',
    description: "",
    descriptionEn: "",
    subFields: [
        // {
        //     "InternalName": "Owner",
        //     "DisplayName": "المالك",
        //     "DisplayNameEn": "Owner",
        //     "type": "picker",
        //     security: {
        //         groups: [
        //             'EPMO', 'Administrators for Project Web App', 'OPMO', 'SPMO','Development Unit'
        //         ]
        //     },

        // },
        {
            "InternalName": "ProjectOwner",
            "DisplayName": "مالك المشروع",
            "DisplayNameEn": "Project Owner",
            "type": "picker",
            "validation": "required",
            security: {
                groups: [
                    'EPMO', 'Administrators for Project Web App', 'OPMO', 'SPMO','Development Unit','Project Managers for Project Web App'
                ]
            },

        },
        { 
            
            "InternalName": "ProjectManager",
            "DisplayName":"مدير المشروع",
            "DisplayNameEn":"Project Manager",
            "type":"picker",
            "validation": "required",
           
        },
        // { 
            
        //     "InternalName": "DirectorUnit",
        //     "DisplayName":" مدير وحدة الانجاز",
        //     "DisplayNameEn":"Director Unit",
        //     "type":"picker",
        //     "validation": "required",
           
        // },
        {
            "InternalName": "ProjectSponsor",
            "DisplayName": "راعي المشروع",
            "DisplayNameEn": "Project Sponsor",
            "type": "picker",
            "validation": "required",
            security: {
                groups: [
                    'EPMO', 'Administrators for Project Web App', 'OPMO', 'SPMO','Development Unit','Project Managers for Project Web App'
                ]
            },
        },
        {
            "InternalName": "ObjectiveOwner",
            "DisplayName": "مالك الهدف (الهدف الفرعي)",
            "DisplayNameEn": "Objective Owner",
            "type": "picker"
        },
        {
            "InternalName": "QualityOfficer",
            "DisplayName": "ضابط الجودة",
            "DisplayNameEn": "Quality Officer",
            "type": "picker"
        },
        {
            "InternalName": "ProjectResponsible",
            "DisplayName": "مسؤول عن المشروع",
            "DisplayNameEn": "Project Responsible",
            "type": "picker"
        },
        // ,
        // {
        //     "InternalName": "PMORepresentative",
        //     "DisplayName": "ممثل مكتب تحكم إدارة المشاريع",
        //     "DisplayNameEn": "PMO Representative",
        //     "type": "picker"
        // }
    ]
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
    label: 'الإعتمادية على مشروع اّخر',
    description: "",
    descriptionEn: "",
    labelEn: 'Dependency Project',
    descriptionEn: "",
    sectiontype: "master",
    targetlist: "Dependency Projects",
    subFields: [{
        "InternalName": "ProjectCode",
        "DisplayName": "إعتمادية على مشروع اّخر",
        "DisplayNameEn": "Dependency Project",
        "type": "lookup",
        //from other list:
        "source": "Projects",
        "Dispfieldkey": "Name",
        "valfieldkey": "Title",
        //"state": "disabled"
    },
    {
        "InternalName": "Description",
        "DisplayName": "وصف الإعتمادية",
        "DisplayNameEn": "Description",
        "type": "string",
        //"state": "disabled"
    }
    ]
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
    label: 'المرفقات',
    labelEn: 'Attachments',
    description: "",
    descriptionEn: "",
    subFields: [{
        "InternalName": "getfile",
        "DisplayName": "المرفقات",
        "DisplayNameEn": "Attachments",
        "type": "file",
        "fileExtensions": "png,jpeg,svg,xlsx,docx,jpg,txt,pdf,rar,msg",
        "withAddBtn":"true"
    }]
}
];