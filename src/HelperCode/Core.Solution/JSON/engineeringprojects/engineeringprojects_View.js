var Information_Form = [
    {
        label: "بيانات المشروع",
        labelEn: "Project Data",
        description: "",
        descriptionEn: "",
        subFields: [
            {
                InternalName: "Title",
                DisplayName: "كود المشروع",
                DisplayNameEn: "Project Code",
                type: "string"
            },
            {
                InternalName: "ProjectId",
                DisplayName: "رقم المشروع",
                DisplayNameEn: "Project ID",
                type: "string"
            },
            {
                InternalName: "ProjectName",
                DisplayName: "اسم المشروع",
                DisplayNameEn: "Project Name",
                type: "string"
            },
            {
                InternalName: "ProjectManager",
                DisplayName: "مدير المشروع",
                DisplayNameEn: "Project Manager",
                type: "picker"
            },
            {
                InternalName: "Status",
                DisplayName: "حالة المشروع",
                DisplayNameEn: "Project Status",
                type: "dropdownValues",
                options: {
                    choices: [
                        { display: "epending", value: "epending"},
                        { display: "elate", value: "elate" },
                        { display: "finished", value: "finished" },
                        { display: "regular", value: "regular" },
                        { display: "troubled", value: "troubled" },
                        { display: "stopped", value: "stopped" },
                        { display: "withdrawn", value: "withdrawn" },
                        { display: "completedprimary", value: "completedprimary" },
                    ],
                },
            },
            {
                InternalName: "ProjectType",
                DisplayName: "نوع المشروع",
                DisplayNameEn: "Project Type",
                type: "dropdownValues",
                options: {
                    choices: [
                        { display: "design", value: "design" , roles: ['EngineerDesignManagers'] },
                        { display: "construction", value: "construction" , roles: ['EngineerProjectManagers']},
                        { display: "restoration", value: "restoration" , roles: ['EngineerProjectManagers']}
                    ],
                },
            },
            {
                InternalName: "PlannedStartDate",
                DisplayName: "تاريخ بداية المشروع",
                DisplayNameEn: "Start Date",
                type: "datetime",
                date1Element:"PlannedStartDate",   
                date2Element:"Deadline",
                totalDurElement:"FinishTime",
            },
           
            {
                InternalName: "Deadline",
                DisplayName: "التاريخ النهائي لتسليم المشروع",
                DisplayNameEn: "Deadline",
                type: "datetime",
                date1Element:"PlannedStartDate",   
                date2Element:"Deadline",
                totalDurElement:"FinishTime",
            }
        ]
    },
    {
        label: 'المعلومات المالية',
        labelEn: 'Financial Data',
        description: 'التفاصيل',
        descriptionEn: 'Details',
        subFields: [
            {
                InternalName: "EstimatedCost",
                DisplayName: "تكلفة المشروع الأساسية",
                DisplayNameEn: "Estimated Cost",
                descPhraseAr:"تكلفة المشروع الأساسية - Estimated Cost",
                type: "float"
            },
            {
                InternalName: "CRCost",
                DisplayName: "تكلفة أوامر التغيير",
                DisplayNameEn: "Change Request Cost",
                descPhraseAr:"تكلفة أوامر التغيير - CRCost",
                type: "float"
            },
            {
                InternalName: "ActualCost",
                DisplayName: "التكلفة الفعلية",
                DisplayNameEn: "Actual Cost",
                descPhraseAr:"التكلفة الفعلية - Actual Cost",
                type: "float"
            },
            {
                InternalName: "PlanPercentge",
                DisplayName: "نسبة المخطط",
                DisplayNameEn: "Plan %",
                descPhraseAr:"نسبة المخطط - Plan %",
                type: "float"
            },
            {
                InternalName: "ActualProgress",
                DisplayName: "نسبة الإنجاز الحقيقي",
                DisplayNameEn: "Actual Progress %",
                descPhraseAr:"نسبة الإنجاز الحقيقي - Actual % (Progress %)",
                type: "float"
            },
            {
                InternalName: "Variance",
                DisplayName: "نسبة الإنحراف",
                DisplayNameEn: "Variance %",
                descPhraseAr:"نسبة الإنحراف - Variance %",
                type: "float"

            },
            {
                InternalName: "ProgressPercentage",
                DisplayName: "معدل التقدم الشهري",
                DisplayNameEn: "Progress %",
                descPhraseAr:"معدل التقدم الشهري - Progress Percentage",
                type: "floatpercentage"
                
            },
            {
                InternalName: "FinishTime",
                DisplayName: "نسبة المدة المنقضية",
                DisplayNameEn: "Finish %",
                descPhraseAr:"نسبة المدة المنقضية - Finish Time",
                type: "floatpercentage"
            },
            {
                InternalName: "PaidValue",
                DisplayName: "مبالغ المستخلصات المدفوعة",
                DisplayNameEn: "Paid Value",
                descPhraseAr:"مبالغ المستخلصات المدفوعة - Paid Value",
                type: "float"
            },
           {
                InternalName: "ProgressCost",
                DisplayName: "قيمة الأعمال المنجزة",
                DisplayNameEn: "Progress Cost",
                descPhraseAr:" التكلفة الفعلية - Progress Cost",
                type: "float",
            },
            {
                InternalName: "EarnedValue",
                DisplayName: "مبالغ المستخلصات المرفوعة",
                DisplayNameEn: "Earned Value",
                descPhraseAr:"مبالغ المستخلصات المرفوعة - EV",
                type: "float",
                
            },
        ]
    },
    {
        label: 'بيانات أخري',
        labelEn: 'OtherData',
        description: 'التفاصيل',
        descriptionEn: 'Details',
        subFields: [
            {
                InternalName: "InDirectMP",
                DisplayName: "عدد العمالة الغير مباشرة",
                DisplayNameEn: "In Direct MP",
                descPhraseAr:"عدد العمالة الغير مباشرة - InDirect MP",
                type: "float"
            },
            {
                InternalName: "DirectMP",
                DisplayName: "عدد العمالة المباشرة",
                DisplayNameEn: "Direct MP",
                descPhraseAr:"عدد العمالة المباشرة - Direct MP",
                type: "float"
            },
            {
                InternalName: "ManHours",
                DisplayName: "عدد ساعات العمل",
                DisplayNameEn: "MH",
                descPhraseAr:"عدد ساعات العمل - MH",
                type: "float"
            },
            {
                InternalName: "TotalWorkHours",
                DisplayName: "الإجمالي التراكمي لعدد ساعات العمل",
                DisplayNameEn: "Total Work Hours",
                descPhraseAr:"الإجمالي التراكمي لعدد ساعات العمل - Total Work Hours",
                type: "float"
            },
            {
                InternalName: "Contractor",
                DisplayName: "اسم المقاول",
                DisplayNameEn: "Contractor Name",
                type: "string"
            },
            {
                InternalName: "Consultant",
                DisplayName: "اسم الإستشاري",
                DisplayNameEn: "Consultant Name",
                type: "string"
            },
            {
                InternalName: "UpdateDayNotification",
                DisplayName: "اشعار اليوم لتحديث بيانات المشروع",
                DisplayNameEn: "Update Day Notification",
                type: "float"
            },
            {
                InternalName: "NCR",
                DisplayName: "NCR",
                DisplayNameEn: "NCR",
                type: "string"
            },
            {
                InternalName: "Accidents",
                DisplayName: "الحوادث",
                DisplayNameEn: "Accidents",
                type: "string"
            },
            {
                InternalName: "Injuries",
                DisplayName: "الإصابات",
                DisplayNameEn: "Injuries",
                type: "string"
            },
            {
                InternalName: "Deaths",
                DisplayName: "الوفيات",
                DisplayNameEn: "Deaths",
                type: "string"
            },
        ]
    }
]