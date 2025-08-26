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
                type: "string",
                state: "disabled",
            },
            {
                InternalName: "ProjectId",
                DisplayName: "رقم المشروع",
                DisplayNameEn: "Project ID",
                type: "string",
                state: "disabled",
            },
            {
                InternalName: "ProjectName",
                DisplayName: "اسم المشروع",
                DisplayNameEn: "Project Name",
                type: "string",
                state: "disabled",
            },
            {
                InternalName: "ProjectManager",
                DisplayName: "مدير المشروع",
                DisplayNameEn: "Project Manager",
                type: "picker",
                validation: "required",
                state: "disabled",
            },
           /* {
                InternalName: 'ChangeStatus',
                DisplayName: 'تغير حالة المشروع',
                DisplayNameEn: 'Change Status',
                dontSubmit: true,
                type: 'dropdownValues',
                ToggleName: "ChangeStatus",
                options: {
                    choices: [
                      { display: "yes", value: "yes" },
                      { display: "no", value: "no" }
                ]},
              /*  toggleValues: [
                    { value: 'no', fields: ['Status'] }, //we can put more than 1  field
                  ],
                toggleDisabledValues: [
                    { value: 'no', fields: ['Status'] },
                  ],
            },*/
            {
                InternalName: "Status",
                DisplayName: "حالة المشروع",
                DisplayNameEn: "Project Status",
                ToggleName: "Status",
                type: "dropdownValues",
                options: {
                    choices: [
                        { display: "epending", value: "epending" },
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
                InternalName: "PlannedStartDate",
                DisplayName: "تاريخ بداية المشروع",
                DisplayNameEn: "Start Date",
                descPhraseAr:" تاريخ بداية المشروع - Planned StartDate",
                type: "datetime",
                validation: "required",
                autoSetDate: true,
                date1Element:"PlannedStartDate",   
                date2Element:"Deadline",
                totalDurElement:"FinishTime",
                state: "disabled",
                
            },
            {
                InternalName: "Deadline",
                DisplayName: "التاريخ النهائي لتسليم المشروع",
                DisplayNameEn: "Deadline",
                descPhraseAr:"التاريخ النهائي لتسليم المشروع - Deadline",
                type: "datetime",
                validation: "required",
                autoSetDate: true,
                date1Element:"PlannedStartDate",
                date2Element:"Deadline",
                totalDurElement:"FinishTime"
            },
           
            
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
                type: "float",
                numberOfDigits:"15",
                validation: "required",
                sum1Element:"EstimatedCost",
                sum2Element:"CRCost",
                totalElement:"ActualCost"
            },
            {
                InternalName: "CRCost",
                DisplayName: "تكلفة أوامر التغيير",
                DisplayNameEn: "Change Request Cost",
                descPhraseAr:"تكلفة أوامر التغيير - CRCost",
                type: "float",
                numberOfDigits:"15",
                validation: "required",
                sum1Element:"EstimatedCost",
                sum2Element:"CRCost",
                totalElement:"ActualCost"
            },
            {
                InternalName: "ActualCost",
                DisplayName: "التكلفة الفعلية",
                DisplayNameEn: "Actual Cost",
                descPhraseAr:"التكلفة الفعلية - Actual Cost",
                type: "float",
                state: "disabled",
                per1Element:"ActualProgress",
                per2Element:"ActualCost",
                totalperElement:"ProgressCost",
                
            },
            {
                InternalName: "PlanPercentge",
                DisplayName: "نسبة المخطط",
                DisplayNameEn: "Plan %",
                descPhraseAr:"نسبة المخطط - Plan %",
                type: "float",
                validation: "required",
                numberOfDigits:"15",
                sub1Element:"PlanPercentge",
                sub2Element:"ActualProgress",
                totalSubElement:"Variance",
                status1Element:"PlanPercentge",
                status2Element:"ActualProgress",
                status3Element:"FinishTime",
                statuschangeElement:"Status",
            },
            {
                InternalName: "ActualProgress",
                DisplayName: "نسبة الإنجاز الحقيقي",
                DisplayNameEn: "Actual Progress %",
                descPhraseAr:"نسبة الإنجاز الحقيقي - Actual % (Progress %)",
                type: "float",
                validation: "required",
                numberOfDigits:"15",
                sub1Element:"PlanPercentge",
                sub2Element:"ActualProgress",
                totalSubElement:"Variance",
                per1Element:"ActualProgress",
                per2Element:"ActualCost",
                totalperElement:"ProgressCost",
                prog1Element:"ActualProgress",
                prog2Element:"Title",
                totalProgressElement:"ProgressPercentage",
                status1Element:"PlanPercentge",
                status2Element:"ActualProgress",
                status3Element:"FinishTime",
                statuschangeElement:"Status",
            },
            {
                InternalName: "Variance",
                DisplayName: "نسبة الإنحراف",
                DisplayNameEn: "Variance %",
                descPhraseAr:"نسبة الإنحراف - Variance %",
                type: "float",
                state: "disabled",

            },
            {
                InternalName: "ProgressPercentage",
                DisplayName: "معدل التقدم الشهري",
                DisplayNameEn: "Progress %",
                descPhraseAr:"معدل التقدم الشهري - Progress Percentage",
                type: "float",
                state: "disabled",
            },
            {
                InternalName: "FinishTime",
                DisplayName: "نسبة المدة المنقضية",
                DisplayNameEn: "Progress %",
                descPhraseAr:"نسبة المدة المنقضية - Progress Time",
                type: "float",
                state: "disabled",
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
                state: "disabled",
            },
            {
                InternalName: "EarnedValue",
                DisplayName: "مبالغ المستخلصات المرفوعة",
                DisplayNameEn: "Earned Value",
                descPhraseAr:"مبالغ المستخلصات المرفوعة - Earned Value",
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
                type: "float",
                numberOfDigits:"15",
                mb1Element:"InDirectMP",
                mb2Element:"DirectMP",
                totalMBElement:"ManHours",
                totalWRElement:"TotalWorkHours",
                prog2Element:"Title",
            },
            {
                InternalName: "DirectMP",
                DisplayName: "عدد العمالة المباشرة",
                DisplayNameEn: "Direct MP",
                descPhraseAr:"عدد العمالة المباشرة - Direct MP",
                type: "float",
                numberOfDigits:"15",
                mb1Element:"InDirectMP",
                mb2Element:"DirectMP",
                totalMBElement:"ManHours",
                totalWRElement:"TotalWorkHours",
                prog2Element:"Title"
            },
            {
                InternalName: "ManHours",
                DisplayName: "عدد ساعات العمل الشهر الحالي",
                DisplayNameEn: "MH",
                descPhraseAr:"عدد ساعات العمل الشهر الحالي - MH",
                type: "float",
                numberOfDigits:"15",
                state: "disabled"
            },
            {
                InternalName: "TotalWorkHours",
                DisplayName: "الإجمالي التراكمي لعدد ساعات العمل حتى تاريخه",
                DisplayNameEn: "Total Work Hours",
                descPhraseAr:"الإجمالي التراكمي لعدد ساعات العمل حتي تاريخه - Total Work Hours",
                type: "float",
                state: "disabled",
            },
            {
                InternalName: "Contractor",
                DisplayName: "اسم المقاول",
                DisplayNameEn: "Contractor Name",
                type: "string",
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
                descPhraseEn: "max length of letters equal 255",
                maxchar: '255',
                Errmsgkey: "withletterpattern",
                validation: "required",
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
                type: "datetime",
                descPhraseAr: "اليوم الذي سيصل فيه اشعار لتحديث بيانات المشروع",
                descPhraseEn: "Day which notifictaion will be send to update project data",
                validation: "required",
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