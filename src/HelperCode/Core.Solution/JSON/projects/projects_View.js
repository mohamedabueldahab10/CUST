var Information_Form = [{
    label: 'بيانات المشروع',
    labelEn: 'Project Data',
    description: "",
    descriptionEn: "",
    subFields: [{ 
            "InternalName": "Portfolio",
            "DisplayName": "المحفظة",
            "DisplayNameEn": "Portfolio",
            "type": "lookup",
            //from other list:
            "source": "Portfolio",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",
            "BIlanguage" : true, //added to handle portfolio bilangual
            "DispfieldkeyEn": "NameEn",//added to handle portfolio bilangual

        },
        {
            "InternalName": "Name",
            "DisplayName": "اسم المشروع",
            "DisplayNameEn": "Project Name",
            "type": "string"
        },
        {
            "InternalName": "Title",
            "DisplayName": "رمز المشروع",
            "DisplayNameEn": "Project Code",
            "type": "code"
        },
        {
            "InternalName": "Description",
            "DisplayName": "وصف المشروع والتحديات التي يعالجها",
            "DisplayNameEn": "Description",
            "type": "multiline",
            // hideonstage: "1"
        },
        {
            "InternalName": "ScopeOfWork",
            "DisplayName": "نطاق المشروع",
            "DisplayNameEn": "ScopeOfWork",
            "type": "multiline",
            "maxchar": 5000,
            // hideonstage: "1"
        },
        {
            "InternalName": "ERPCode",
            "DisplayNameEn": "ERP Code",
            "DisplayName": "ترميز موارد",
            "type": "string",
            "maxchar": "250",
            // "validation": "required"

        },
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
            }
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
            }
        },
        {
            "InternalName": "Committees",
            "DisplayName": "اللجان",
            "DisplayNameEn": "Committees",
            "type": "string",
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
            // security: {
            //     groups: [
            //         'EPMO', 'System Admin Group', 'OPMO', 'SPMO'
            //     ]
            // },
            // "state": "disabled",
            // "className":"autofill"
        },
        {
            "InternalName": "RelatedInitiativeDeliverable",
            "DisplayNameEn": "Related Initiative Deliverable",
            "DisplayName":"مخرج المبادرة المرتبط",
            "type": "multiselectstring",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",
            "source": "InitiativeDeliverables",
             
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
            "DisplayNameEn": "Initiative Program",
            "type": "string",
            // "maxchar": 5000,
            // hideonstage: "1"
        },
        {
            "InternalName": "BaselineDuration",
            "DisplayName": "مدة الأساس بالأيام",
            "DisplayNameEn": "Baseline Duration in Days",
            "type": "float",
            // "maxchar": 5000,
            // hideonstage: "1"
        },
        {
            "InternalName": "KPIs",
            "DisplayName": "مؤشر القياس",
            "DisplayNameEn": "KPIs",
            "type": "lookup",
            "source": "MainKPI",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",
           
            // "maxchar": 5000,
            // hideonstage: "1"
        },
        {
            "InternalName": "CorrectivePlan",
            "DisplayName": "الخطة التصحيحية",
            "DisplayNameEn": "Corrective Plan",
            "type": "multiline",
            // "maxchar": 5000,
            // hideonstage: "1"
        },
        // {
        //     "InternalName": "ProjectStatus",
        //     "DisplayName": "حالة المشروع",
        //     "DisplayNameEn": "Project Status",
        //     "type": "multiline",
        //     "maxchar": 5000,
        //     // hideonstage: "1"
        // },
        {
            "InternalName": "ProjectType",
            "DisplayName": "نوع المشروع",
            "DisplayNameEn": "Project Type",
            "type": "dropdownValues",
            options: {
                choices: [{
                        display: 'internal',
                        value: 'Internal'
                    },
                    {
                        display: 'external',
                        value: 'External'
                    }
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
                choices: [{
                        display: 'yes',
                        value: 'yes'
                    },
                    {
                        display: 'no',
                        value: 'no'
                    }
                ]
            }
        },
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
            "valfieldkey": "Title"
        },
        {
            "InternalName": "SubSector",
            "DisplayName": "الوكالات",
            "DisplayNameEn": "Departments",
            "type": "lookup",
            //from other list:
            "source": "Internal Entities",
            "Dispfieldkey": "Name",
            "DispfieldkeyEn": "NameEn",
            "valfieldkey": "Title"
        },
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
        {
            "InternalName": "Priority",
            "DisplayName": "أهمية المشروع",
            "DisplayNameEn": "Priority",
            "type": "dropdownValues",
            options: {
                choices: [
                    // {
                    //     display: 'pr04low',
                    //     value: 'pr04low'
                    // },
                    {
                        display: 'pr03medium',
                        value: 'pr03medium'
                    },
                    {
                        display: 'pr02important',
                        value: 'pr02important'
                    },
                    {
                        display: 'pr01veryimportant',
                        value: 'pr01veryimportant'
                    }
                    //'مهم','مهم جدا','متوسط','منخفض'
                ]
            }
        },

  
        // {
        //     "InternalName": "TargetSegments",
        //     "DisplayName": "الشرائح المستهدفة (ان وجد)",
        //     "DisplayNameEn": "Target Segments",
        //     "type": "string"
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
        //     "type": "string"
        // },
        // {
        //     "InternalName": "ExecutionRequirements",
        //     "DisplayName": "متطلبات التنفيذ",
        //     "DisplayNameEn": "Execution Requirements",
        //     "type": "string"
        // },
        {
            "InternalName": "Phase",
            "DisplayName": "المرحلة",
            "DisplayNameEn": "Phase",
            "type": "lookup",
            //from other list:
            "source": "Phases",
            "Dispfieldkey": "Name",
            "DispfieldkeyEn": "PhaseNameEn",
            "valfieldkey": "Title"
        },

        {
            "InternalName": "Stage",
            "DisplayName": "الطور",
            "DisplayNameEn": "Stage",
            "type": "lookup",
            //from other list:
            "source": "Stages",
            "Dispfieldkey": "StageName",
            "DispfieldkeyEn": "StageNameEn",
            "valfieldkey": "Title"
        },

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
        {
            "InternalName": "ProjectOverview",
            "DisplayName": "ملخص المشروع",
            "DisplayNameEn": "Project Overview",
            "type": "multiline"
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
        {
            "InternalName": "Status",
            "DisplayName": "مرحلة المشروع",
            "DisplayNameEn": "Project Stage",
            "type": "dropdownValues",
            options: {
                choices: [{
                        display: 'cancelled',
                        value: 'cancelled'
                    },
                    {
                        display: 'pending',
                        value: 'pending'
                    },
                    {
                        display: 'inprogress',
                        value: 'inprogress'
                    },
                    {
                        display: 'notstarted',
                        value: 'notstarted'
                    },
                    {
                        display: 'completed',
                        value: 'completed'
                    }
                ]
            }
        },
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
            "type": "float",
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
        //     // "showonstage": "2"
        // },
        {

            "InternalName": "ProjectManager",
            "DisplayName": "مدير المشروع",
            "DisplayNameEn": "Project Manager",
            "type": "picker",
            "showonstage": "2"
        },
        // { 
        
        //     "InternalName": "DirectorUnit",
        //     "DisplayName":" مدير وحدة الانجاز",
        //     "DisplayNameEn":"Director Unit",
        //     "type":"picker",
           
        // },
        {
            "InternalName": "ProjectOwner",
            "DisplayName": "مالك المشروع",
            "DisplayNameEn": "Project Owner",
            "type": "picker"
        },
        {
            "InternalName": "ProjectSponsor",
            "DisplayName": "راعي المشروع",
            "DisplayNameEn": "Project Sponsor",
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
        //     "type": "picker",
        //     "showonstage": "3"
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
{
    label: 'الإعتمادية على مشروع اّخر',
    description: "",
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
            "valfieldkey": "Title"
        },
        {
            "InternalName": "Description",
            "DisplayName":"وصف الإعتمادية",
            "DisplayNameEn":"Description",
            "type":"string"

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
{
    label: 'البدء بعملية المشتريات',
    labelEn: 'Purchase Start',
    description: "",
    descriptionEn: "",
    subFields: [{
        "InternalName": "PRCode",
        "DisplayName": "رمز المشتريات",
        "DisplayNameEn": "Purchase code",
        "type": "float"
    }]
},
];