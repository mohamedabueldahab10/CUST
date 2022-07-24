var Information_Form = [
    {
        label: 'خطة تنفيذ المبادرة',
        labelEn: ' Basic Information ',
        description: "البيانات الأساسية للمبادرة",
        descriptionEn: "Details",
        // sectiontype: "master",
        // targetlist: "Initiatives",
        subFields: [
            {
                "InternalName": "Title",
                "DisplayName": "رمز المبادرة الموحد ",
                "DisplayNameEn": "Code",
                "type": "string",
                "validation": "required"

            },
            {
                "InternalName": "Name",
                "DisplayNameEn": "Name",
                "DisplayName": "اسم المبادرة",
                "type": "string",
                "maxchar": "250",
                "validation": "required"
            },
            {
                "InternalName": "InitiativeOwnerEntity",
                "DisplayNameEn": "Initiative Owner Entity",
                "DisplayName": "الجهة المالكة للمبادرة ",
                "type": "picker"
            },
            //    {
            //        "InternalName": "Description",
            //        "DisplayNameEn": "Description",
            //        "DisplayName":"وصف المبادرة",
            //        "type":"multiline",
            //        "maxchar": "500",

            //    },mahmoud
            {
                "InternalName": "RelatedProgram",
                "DisplayNameEn": "Related Program",
                "DisplayName": "اسم البرنامج",
                "type": "lookup",
                "source": "Instruments",
                "Dispfieldkey": "Name",
                "valfieldkey": "Title"
            },
            {
                "InternalName": "InitiativeOwner",
                "DisplayNameEn": "Initiative Owner",
                "DisplayName": "مالك المبادرة",
                "type": "picker"
            },
            // {
            //     "InternalName": "Status",
            //     "DisplayName": "حالة المبادرة",
            //     "DisplayNameEn": "Status",
            //     "type": "dropdownValues",
            //     options: {
            //         choices: [
            //             { display: 'undercontrol', value: 'undercontrol' },
            //             { display: 'completed', value: 'completed' },
            //             { display: 'stat3', value: 'stat3' },
            //             { display: 'late', value: 'late' }
            //         ]
            //     }
            // },

            //mimo
            {
                "InternalName": "Description",
                "DisplayName": "وصف المبادرة",
                "DisplayNameEn": "Description",
                "type": "multiline",
                "maxchar": 5000,
                // hideonstage: "1"
            },
            {
                "InternalName": "RelatedStrategyObjective",
                "DisplayNameEn": "Objective Name",
                "DisplayName": "الارتباط بهدف الوكالة ",
                "type": "lookup",
                "source": "SOs",
                "Dispfieldkey": "Name",
                "valfieldkey": "Title"
            },

            // {
            //     "InternalName": "RelatedStrategyObjectiveCode",
            //     "DisplayNameEn": "Objective ID",
            //     "DisplayName": "رمز الهدف",
            //     "type": "lookup",
            //     "source": "SOs",
            //     "Dispfieldkey": "Title",
            //     "valfieldkey": "Title"
            // },
            {
                "InternalName": "StartDate",
                "DisplayName": "تاريخ بدء المبادرة",
                "DisplayNameEn": "Start Date",
                "type": "datetime",
                "max": "FinishDate"
            },
            {
                "InternalName": "FinishDate",
                "DisplayName": "تاريخ انتهاء المبادرة",
                "DisplayNameEn": "Finish Date",
                "type": "datetime",
                "min": "StartDate"
            },
            {
                "InternalName": "InitiativeBudget",
                "DisplayName": "ميزانية المبادرة ",
                "DisplayNameEn": "InitiativeBudget",
                "type": "float",
            },

        ]
    },
    {
        label: 'مخرجات المبادرة',
        labelEn: 'Initiative Deliverables',
        description: "التفاصيل",
        descriptionEn: "Details",
        sectiontype: "master",
        targetlist: "InitiativeDeliverables",
        subFields: [
            {
                "InternalName": "ProjectName",
                "DisplayNameEn": "Project Name",
                "DisplayName":"اسم المشروع ",
                "type":"string",
                "maxchar": "250"
            },
            {
                "InternalName": "Name",
                "DisplayNameEn": "Name",
                "DisplayName":"اسم المخرج",
                "type":"string",
                "maxchar": "250",
                "validation": "required"
            },//here
            {
                "InternalName": "RelatedBenefits",
                "DisplayNameEn": "Related Benefits",
                "DisplayName": "رقم المنفعة المرتبطة بها ",
                "type": "lookup",
                "source": "Benefits",
                "Dispfieldkey": "Title",
                "valfieldkey": "Title"
              },

            {
                "InternalName": "PlannedCompletedDate",
                "DisplayNameEn": "Planned Completed Date",
                "DisplayName":"تاريخ الاكتمال المخطط",
                "type":"datetime"
            },
            {
                "InternalName": "DeliverableSuccessKPI",
                "DisplayNameEn": "Deliverable Success KPI",
                "DisplayName":"مقياس نجاح المخرج",
                "type":"string",
                "validation": "required"
            },
    
            {
                "InternalName": "Target",
                "DisplayNameEn": "Target",
                "DisplayName":"مستهدف المخرج",
                "type":"float",
                "validation": "required"
            },
            {
                "InternalName": "Weight",
                "DisplayNameEn": "Weight",
                "DisplayName":"وزن المخرج من الميزانية المعتمدة",
                "type":"float"
            },
            {
                "InternalName": "Classification",
                "DisplayName": "تصنيف المخرج",
                "DisplayNameEn": "Classification",
                "type": "string",
            },
            {
                "InternalName": "Completed",
                "DisplayNameEn": "Completed",
                "DisplayName":"حالة الاكتمال",
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
                "InternalName": "ActualCompletedDate",
                "DisplayNameEn": "Actual Completed Date",
                "DisplayName":"تاريخ الاكتمال الفعلي",
                "type":"datetime",
                "max":"today"
            },
        ]
    },
    {
        label: 'المعالم الرئيسية للمبادرة ',
        labelEn: 'Initiative Milestones',
        description: "التفاصيل",
        descriptionEn: "Details",
        sectiontype: "master",
        targetlist: "InitiativeMilestones",
        subFields: [
            
            {
                "InternalName": "Name",
                "DisplayNameEn": "Name",
                "DisplayName":"اسم المعلم",
                "type":"string",
                "maxchar": "250",
                "validation": "required"
            },
            {
                "InternalName": "PlannedCompletedDate",
                "DisplayNameEn": "Planned Completed Date",
                "DisplayName":"تاريخ الاكتمال المخطط",
                "type":"datetime"
            },
            {
                "InternalName": "RelatedInitiativeDeliverable",
                "DisplayName": "المخرج المرتبط بالمعلم",
                "DisplayNameEn": "Related Initiative Deliverbale",
                "type": "lookup",
                //from other list:
                "source": "InitiativeDeliverables",
                "Dispfieldkey": "Title",
                "valfieldkey": "Title"
            },
            {
                "InternalName": "ProjectName",
                "DisplayNameEn": "Project Name",
                "DisplayName":"اسم المشروع ",
                "type":"string",
                "maxchar": "250"
            },
            {
                "InternalName": "Weight",
                "DisplayNameEn": "Weight",
                "DisplayName":"الوزن المكافئ للإنجاز %",
                "type":"floatpercentage"
            },
            {
                "InternalName": "PercentageCompleted",
                "DisplayNameEn": "Percentage Completed",
                "DisplayName":"النسبة المكافئة للإنجاز (%)",
                "type":"floatpercentage"
            },
           
            {
                "InternalName": "Completed",
                "DisplayNameEn": "Completed",
                "DisplayName":"حالة الاكتمال",
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
                "InternalName": "ActualCompletedDate",
                "DisplayNameEn": "Actual Completed Date",
                "DisplayName":"تاريخ الاكتمال الفعلي",
                "type":"datetime",
                "max":"today"
            },
        ]
    },
    {
        label: 'المشاريع',
        labelEn: 'Projects',
        description: "",
        descriptionEn: "",
        sectiontype: "master",
        targetlist: "Projects",   
        subFields: [
            {
                "InternalName": "Name",
                "DisplayName": "اسم المشروع",
                "DisplayNameEn": "Project Name",
                "type": "string",
                "validation": "required"
            },
            // {
            //     "InternalName": "Title",
            //     "DisplayName": "رمز المشروع",
            //     "DisplayNameEn": "Project ID",
            //     "type": "string",
            //     "validation": "required"
            // },

            // {
            //     "InternalName": "ProjectManager",
            //     "DisplayName": "اسم مدير المشروع",
            //     "DisplayNameEn": "Project Manager",
            //     "type": "picker"

            // },
            {
                "InternalName": "Agency",
                "DisplayName": "الوكالة المعنية",
                "DisplayNameEn": "Agency",
                "type": "lookup",
                //from other list:
                "source": "Internal Entities",
                "Dispfieldkey": "Name",
                "valfieldkey": "Title"
            },
            {
                "InternalName": "Owner",
                "DisplayName": "اسم مالك المشروع",
                "DisplayNameEn": "Project Owner",
                "type": "picker"

            },
            {
                "InternalName": "PlannedStartDate",
                "DisplayName": "تاريخ البداية المخطط",
                "DisplayNameEn": "Planned Start Date ",
                "type": "datetime",
                "max": "PlannedFinishDate",
                // "validation": "required",
                // "state": "disabled",
                // "className":"autofill"
            },
            {
                "InternalName": "PlannedFinishDate",
                "DisplayName": " تاريخ النهاية المخطط",
                "DisplayNameEn": "Planned End Date ",
                "type": "datetime",
                "min": "PlannedStartDate",
                "validation": "required",
                // "state": "disabled",
                // "className":"autofill"
            },

            // {
            //     "InternalName": "ActualStartDate",
            //     "DisplayName": "تاريخ بداية المشروع",
            //     "DisplayNameEn": "Project Start Date",
            //     "type": "datetime",
            //     "max": "ActualFinishDate"
            // },
            // {
            //     "InternalName": "ActualFinishDate",
            //     "DisplayName": "تاريخ نهاية المشروع",
            //     "DisplayNameEn": "Project Finish Date",
            //     "type": "datetime",
            //     "min": "ActualStartDate",
            // },
            // {
            //     "InternalName": "AssignedBudget",
            //     "DisplayName": "الميزانية المخصصة ",
            //     "DisplayNameEn": "Project Budget",
            //     "type": "float",
            //     //"state": "disabled"
            //     // "showonstage":"1"
            // },//mahmoud
         
            // {
            //     "InternalName": "Sector",
            //     "DisplayName": "القطاع",
            //     "DisplayNameEn": "Sector",
            //     "type": "lookup",
            //     //"validation": "required",
            //     //from other list:
            //     "source": "Internal Entities",
            //     //"isSector": "True",
            //     //"EntityType": "Sector",
            //     "Dispfieldkey": "Name",
            //     "DispfieldkeyEn": "NameEn",
            //     "valfieldkey": "Title"
            // },
            // {
            //     "InternalName": "Agency",
            //     "DisplayName": "الجهة/الوكالة",
            //     "DisplayNameEn": "Agency/Department",
            //     "type": "lookup",
            //     //from other list:
            //     "source": "Internal Entities",
            //     "Dispfieldkey": "Name",
            //     "valfieldkey": "Title"
            // },
            {
                "InternalName": "Description",
                "DisplayName": "وصف المشروع",
                "DisplayNameEn": "Project Description and Background ",
                "type": "multiline",
                "maxchar": 5000,
                // hideonstage: "1"
            },
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
                //"validation": "required",
                // "state": "disabled",
                // "className":"autofill"
            },
             {
                "InternalName": "IsResourceNeeded",
                "DisplayName": "هل يلزم مورد؟",
                "DisplayNameEn": "Is Resource Needed?",
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
                "InternalName": "AssignedBudget",
                "DisplayName": "ميزانية المشروع",
                "DisplayNameEn": "Assigned Budget",
                "type": "float",
                //"state": "disabled"
                    // "showonstage":"1"
            },
            {
                "InternalName": "ProjectType",
                "DisplayName": "نوع المشروع",
                "DisplayNameEn": "Project Type",
                // "validation": "required",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'operationalproject', value: 'operationalproject' },
                        { display: 'etude', value: 'etude' },
                        { display: 'legislation', value: 'legislation' },
                        { display: 'technical', value: 'technical' },
                        { display: 'others', value: 'others' }
                    ]
                }
            },
            // {
            //     "InternalName": "Portfolio",
            //     "DisplayName": "المحفظة",
            //     "DisplayNameEn": "Portfolio",
            //     "type": "lookup",
            //     "validation": "required",
            //     //from other list:
            //     "source": "Portfolio",
            //     "Dispfieldkey": "Name",
            //     "valfieldkey": "Title",
            //     // "state": "disabled",
            //     // "className":"autofill"
            // },

            // {
            //     "InternalName": "ScopeOfWork",
            //     "DisplayName": "نطاق المشروع",
            //     "DisplayNameEn": "ScopeOfWork",
            //     "type": "multiline",
            //     "maxchar": 5000,
            //     // hideonstage: "1"
            // },
            // {
            //     "InternalName": "PMNotes",
            //     "DisplayName": "ملاحظات مدير المشروع",
            //     "DisplayNameEn": "PM Notes",
            //     "type": "multiline",
            //     "maxchar": 5000,
            //     // hideonstage: "1"
            // },
           
            // {
            //     "InternalName": "NTP",
            //     "DisplayName": "NTP",
            //     "DisplayNameEn": "NTP",
            //     "validation": "required",
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
            // {
            //     "InternalName": "Committees",
            //     "DisplayName": "اللجان",
            //     "DisplayNameEn": "Committees",
            //     "type": "string",
            //     // "maxchar": 5000,
            //     // hideonstage: "1"
            // },
            // {
            //     "InternalName": "RelatedInitiative",
            //     "DisplayName": "المبادرة",
            //     "DisplayNameEn": "Related Initiative",
            //     "type": "lookup",
            //     //from other list:
            //     "source": "Initiatives",
            //     "Dispfieldkey": "Name",
            //     "valfieldkey": "Title",
            //     // "state": "disabled",
            //     // "className":"autofill"
            // },

            // {
            //     "InternalName": "InitiativeProgram",
            //     "DisplayName": "البرنامج",
            //     "DisplayNameEn": "Initiative Program",
            //     "type": "string",
            //     // "maxchar": 5000,
            //     // hideonstage: "1"
            // },
            // {
            //     "InternalName": "BaselineDuration",
            //     "DisplayName": "مدة الأساس",
            //     "DisplayNameEn": "Baseline Duration",
            //     "type": "float",
            //     // "maxchar": 5000,
            //     // hideonstage: "1"
            // },

            // {
            //     "InternalName": "CorrectivePlan",
            //     "DisplayName": "الخطة التصحيحية",
            //     "DisplayNameEn": "Corrective Plan",
            //     "type": "multiline",
            //     // "maxchar": 5000,
            //     // hideonstage: "1"
            // },
            // {
            //     "InternalName": "ProjectStatus",
            //     "DisplayName": "حالة المشروع",
            //     "DisplayNameEn": "Project Status",
            //     "type": "multiline",
            //     "maxchar": 5000,
            //     // hideonstage: "1"
            // },
           
            // {
            //     "InternalName": "Category",
            //     "DisplayName": "تصنيف  المشروع",
            //     "DisplayNameEn": "Category",
            //     "validation": "required",
            //     "type": "dropdownValues",
            //     options: {
            //         choices: [
            //             // شغيلي- تحولي - استراتيجي
            //             { display: 'strategyproject', value: 'strategyproject' },
            //             { display: 'transformativeproject', value: 'transformativeproject' },
            //             { display: 'operationalproject', value: 'operationalproject' }
            //         ]
            //     }
            // },

            

            // {
            //     "InternalName": "BaselineStartDate",
            //     "DisplayName": "تاريخ بدء الأساس",
            //     "DisplayNameEn": "Baseline Start Date",
            //     "type": "datetime",
            //     "max": "BaselineFinishDate",
            //     // "state": "disabled"
            // },
            // {
            //     "InternalName": "BaselineFinishDate",
            //     "DisplayName": "تاريخ إنهاء الأساس",
            //     "DisplayNameEn": "Baseline Finish Date",
            //     "type": "datetime",
            //     "min": "BaselineStartDate",
            //     // "state": "disabled"
            // },
            // {
            //     "InternalName": "BaselineBudget",
            //     "DisplayName": "تكلفة الأساس",
            //     "DisplayNameEn": "Baseline Budget",
            //     "type": "float",
            //     // "state": "disabled"
            // },


            // {
            //     "InternalName": "SubSector",
            //     "DisplayName": "الادارات",
            //     "DisplayNameEn": "Departments",
            //     "type": "lookup",
            //     //from other list:
            //     "source": "Internal Entities",
            //     "isSector": "True",
            //     "EntityType": "Department",
            //     "Dispfieldkey": "Name",
            //     "DispfieldkeyEn": "NameEn",
            //     "valfieldkey": "Title",
            //     //"state": "disabled",
            //     "validation": "required"
            // },
            // {
            //     "InternalName": "Section",
            //     "DisplayName": "القسم ذو الصلة",
            //     "DisplayNameEn": "Related Section",
            //     "type": "lookup",
            //     "validation": "required",
            //     //from other list:
            //     "source": "Internal Entities",
            //     "isSector": "True",
            //     "EntityType": "Section",
            //     "Dispfieldkey": "Name",
            //     "DispfieldkeyEn": "NameEn",
            //     "valfieldkey": "Title",
            //     // "state": "disabled"
            // },
            // {
            //     "InternalName": "Priority",
            //     "DisplayName": "أهمية المشروع",
            //     "DisplayNameEn": "Priority",
            //     "type": "dropdownValues",
            //     options: {
            //         choices: [
            //             // { display: 'pr04low', value: 'pr04low' },
            //             { display: 'pr03medium', value: 'pr03medium' },
            //             { display: 'pr02important', value: 'pr02important' },
            //             { display: 'pr01veryimportant', value: 'pr01veryimportant' }
            //             //'مهم','مهم جدا','متوسط','منخفض'
            //         ]
            //     },
            //     "validation": "required",
            //     // "state": "disabled",
            //     // "className":"autofill"
            // },


            // // {
            // //     "DisplayName": "الشرائح المستهدفة (ان وجد)",
            // //     "DisplayNameEn": "Target Segments",
            // //     "type": "string",
            // //     "state": "disabled"
            // // },
            // {
            //     "InternalName": "ExecutionChannels",
            //     "DisplayName": "الجهة المنفذة",
            //     "DisplayNameEn": "Execution Channels",
            //     "type": "string",
            //     "state": "disabled"
            // },
            // // {
            // //     "InternalName": "HumanResourcesRequired",
            // //     "DisplayName": "موارد بشرية مطلوبة",
            // //     "DisplayNameEn": "Human Resources Required",
            // //     "type": "string",
            // //     "state": "disabled"
            // // },
            // // {
            // //     "InternalName": "ExecutionRequirements",
            // //     "DisplayName": "متطلبات التنفيذ",
            // //     "DisplayNameEn": "Execution Requirements",
            // //     "type": "string",
            // //     "state": "disabled"
            // // },
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
            //     "InternalName": "ProjectOverview",
            //     "DisplayName": "ملخص المشروع",
            //     "DisplayNameEn": "Project Overview",
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


        ]
    },
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
            "fileExtensions": "png,jpeg,svg,xlsx,docx,jpg,txt,pdf",
            "withAddBtn":"true"
        }]
    }
];