var Information_Form  = [//for Initiatives List
//     {
//         label: 'بيانات المبادرة',
//         labelEn: 'Initiative Data',
//         description: "التفاصيل",
//         descriptionEn: "Details",
//         //   sectiontype: "master",
//         // targetlist: "Initiatives",
//         subFields: [
//         {
//             "InternalName": "Title",
//             "DisplayName":"رمز المبادرة ",            
//             "DisplayNameEn": "Code",
//             "type":"string" ,
//             "validation": "required"

//         },
//         {
//             "InternalName": "Name",
//             "DisplayNameEn": "Name",
//             "DisplayName":"اسم المبادرة",
//             "type":"string",
//             "maxchar": "250"

//         },
//         // {
//         //     "InternalName": "Description",
//         //     "DisplayNameEn": "Description",
//         //     "DisplayName":"وصف المبادرة",
//         //     "type":"multiline",
//         //     "maxchar": "500",

//         // },
//         // {
//         //     "InternalName": "RelatedStrategyObjective",
//         //     "DisplayNameEn": "Related Objective",
//         //     "DisplayName": "أسم الهدف التابع له",
//         //     "type": "lookup",
//         //     "source": "SOs",
//         //     "Dispfieldkey": "Name",
//         //     "valfieldkey": "Title"
//         //  },
//         //  {
//         //     "InternalName": "RelatedProgram",
//         //     "DisplayNameEn": "Related Program",
//         //     "DisplayName": "أسم البرنامج التابع له",
//         //     "type": "lookup",
//         //     "source": "Instruments",
//         //     "Dispfieldkey": "Title",
//         //     "valfieldkey": "Title"
//         //  },
//         //  {
//         //     "InternalName": "Portfolio",
//         //     "DisplayName": "المحفظة",
//         //     "DisplayNameEn": "Portfolio",
//         //     "type": "lookup",
//         //     //from other list:
//         //     "source": "Portfolio",
//         //     "Dispfieldkey": "Name",
//         //     "valfieldkey": "Title",
//         // },
//         // {
//         //     "InternalName": "Sector",
//         //     "DisplayNameEn": "Sector",
//         //     "DisplayName":"القطاع",
//         //     "type": "lookup",
//         //     //from other list:
//         //     "source": "Internal Entities",
//         //     "Dispfieldkey": "Name",
//         //     "valfieldkey": "Title"

//         // } ,
//         // {
//         //     "InternalName": "Department",
//         //     "DisplayNameEn": "Department",
//         //     "DisplayName":"الوكالة/الجهة ",
//         //     "type": "lookup",
//         //     //from other list:
//         //     "source": "Internal Entities",
//         //     "Dispfieldkey": "Name",
//         //     "valfieldkey": "Title"

//         // } ,
      
    
//         {
//             "InternalName": "InitiativeOwner",
//             "DisplayNameEn": "Initiative Owner",
//             "DisplayName": "مالك المبادرة ",
//             "type": "picker"
//         },
//         // {
//         //     "InternalName": "OwnerEmail",
//         //     "DisplayNameEn": "Owner Email",
//         //     "DisplayName": "البريد الإلكتروني لمالك المبادرة",
//         //      "type": "email", //in view should be string
//         //     "maxchar": "500",
//         //   },
//         // {
//         //     "InternalName": "InitiativePM",
//         //     "DisplayNameEn": "Initiative PM",
//         //     "DisplayName": "مدير المبادرة ",
//         //     "type": "picker"
//         // },
//         // {
//         //     "InternalName": "ManagerEmail",
//         //     "DisplayNameEn": "Manager Email",
//         //     "DisplayName": "البريد الإلكتروني لمدير المبادرة",
//         //      "type": "email", //in view should be string
//         //     "maxchar": "500",
//         //   },
//         // {
//         //     "InternalName": "ObjectiveOwner",
//         //     "DisplayNameEn": "Objective Owner",
//         //     "DisplayName": "مالك الهدف ",
//         //     "type": "string"
//         // },
//         {
//             "InternalName": "StartDate",
//             "DisplayName": "تاريخ بداية  المبادرة ",
//             "DisplayNameEn": "Start Date",
//             "type": "datetime",
//             "max":"FinishDate"
//         },
//         {
//             "InternalName": "FinishDate",
//             "DisplayName": "تاريخ انتهاء  المبادرة ",
//             "DisplayNameEn": "Finish Date",
//             "type": "datetime",
//             "min":"StartDate"
//         },
//         // {
//         //     "InternalName": "EstimatedCost",
//         //     "DisplayName": "التكلفة التقديرية ",
//         //     "DisplayNameEn": "Estimated Cost",
//         //     "type": "float",
//         // },
//         // {
//         //     "InternalName": "Classification",
//         //     "DisplayName": "تصنيف المبادرة",
//         //     "DisplayNameEn": "Classification",
//         //     "type": "string",
//         // },


//         // {
//         //     "InternalName": "PlannedPercentageCompleted",
//         //     "DisplayName": "نسبة اكتمال المبادرة المخططة ",
//         //     "DisplayNameEn": "Planned Percentage Completed",
//         //     "type": "floatpercentage",
//         // },
//         // {
//         //     "InternalName": "ActualPercentageCompleted",
//         //     "DisplayName": "نسبة الإكتمال الفعلية ",
//         //     "DisplayNameEn": "Actual Percentage Completed",
//         //     "type": "floatpercentage",
//         // },
//         // {
//         //     "InternalName": "DelayPercentage",
//         //     "DisplayName": "نسبة التأخير ",
//         //     "DisplayNameEn": "Delay Percentage",
//         //     "type": "floatpercentage",
//         // },
     
//         // {
//         //     "InternalName": "ProgramTotalCost",
//         //     "DisplayName": "التكاليف الكلية حسب سقف البرنامج ",
//         //     "DisplayNameEn": "Program Total Cost",
//         //     "type": "float",
//         // },
//         // {
//         //     "InternalName": "ActualCost",
//         //     "DisplayName": "التكاليف الكلية المعتمدة ",
//         //     "DisplayNameEn": "Actual Cost",
//         //     "type": "float",
//         // },
//         // {
//         //     "InternalName": "DependencyCost",
//         //     "DisplayName": "حجم الارتباط (منصة اعتماد) ",
//         //     "DisplayNameEn": "Dependency Cost",
//         //     "type": "float",
//         // },
//         // {
//         //     "InternalName": "CurrentBuget",
//         //     "DisplayName": "السيولة المخصص للعام المالي الحالي ",
//         //     "DisplayNameEn": "Current Buget",
//         //     "type": "float",
//         // },
//         // {
//         //     "InternalName": "Expenditures",
//         //     "DisplayName": "المنصرف الأجمالي ",
//         //     "DisplayNameEn": "Expenditures",
//         //     "type": "float",
//         // },
//         // {
//         //     "InternalName": "CurrentExpenditures",
//         //     "DisplayName": "المنصرف من العالم المالي الحالي ",
//         //     "DisplayNameEn": "Current Expenditures",
//         //     "type": "float",
//         // },
//         // {
//         //     "InternalName": "StrategicPillar",
//         //     "DisplayNameEn": "Strategic Pillar",
//         //     "DisplayName":"ركيزة الاستراتيجية",
//         //     "type": "lookup",
//         //     //from other list:
//         //     "source": "SPillars",
//         //     "Dispfieldkey": "Name",
//         //     "valfieldkey": "Name",
//         //     "validation": "required"

//         // },
     
//         // {
//         //     "InternalName": "Types",
//         //     "DisplayNameEn": "Types",
//         //     "DisplayName":"النوع",
//         //     "toggleValues": [
//         //         {value:'vision', fields:['RelatedBudgetItem']},//we can put more than 1  field
//         //         ],
//         //     "type": "dropdownValues",
//         //     options: {
//         //         choices: [
//         //             { display: 'vision', value: 'vision' },
//         //             { display: 'others', value: 'others' },
//         //         ]
//         //     }
//         // },
//         // {
//         //     "InternalName": "RelatedBudgetItem",
//         //     "ToggleName": "RelatedBudgetItem", //ToggleName to select which field
//         //     "DisplayNameEn": "Related Budget Item",
//         //     "DisplayName":"البند المالي المرتبط",
//         //     "type": "lookup",
//         //     //from other list:
//         //     "source": "Budget Items",
//         //     "Dispfieldkey": "Name",
//         //     "valfieldkey": "Title",
//         //     "display":"none"

//         // },
//         // {
//         //     "InternalName": "RelatedKPI",
//         //     "DisplayNameEn": "Related KPI",
//         //     "DisplayName":"المؤشر الفرعي المرتبط",
//         //     "type": "lookupWithQuery",
//         //     "queryField": "Types",
//         //     "queryFieldType": "dropdownValues", //ex: "Choice"
//         //     "queryFieldValue": "sub",
//         //     //from other list:
//         //     "source": "MainKPI",
//         //     "Dispfieldkey": "Name",
//         //     "valfieldkey": "Title"
           
//         // },
   

//     ]
// },
{
    label: 'نموذج قبول معالم',
    labelEn: 'Initiative Milestones',
    description: "التفاصيل",
    descriptionEn: "Details",
    // sectiontype: "master",
    // targetlist: "InitiativeMilestones",
    subFields: [
        
        {
            "InternalName": "Title",
            "DisplayNameEn": "Code",
            "DisplayName":"رمز المعلم",
            "type":"string",
            "maxchar": "250",
            "validation": "required"
        },
        {
            "InternalName": "Name",
            "DisplayNameEn": "Name",
            "DisplayName":"اسم المعلم",
            "type":"string",
            "maxchar": "250",
            "validation": "required"
        },
        // {
        //     "InternalName": "PlannedCompletedDate",
        //     "DisplayNameEn": "Planned Completed Date",
        //     "DisplayName":"تاريخ الاكتمال المخطط",
        //     "type":"datetime"
        // },
        // {
        //     "InternalName": "RelatedInitiativeDeliverable",
        //     "DisplayName": "المخرج المرتبط بالمعلم",
        //     "DisplayNameEn": "Related Initiative Deliverable",
        //     "type": "lookup",
        //     //from other list:
        //     "source": "InitiativeDeliverables",
        //     "Dispfieldkey": "Title",
        //     "valfieldkey": "Title"
        // },
        // {
        //     "InternalName": "ProjectName",
        //     "DisplayNameEn": "Project Name",
        //     "DisplayName":"اسم المشروع ",
        //     "type":"string",
        //     "maxchar": "250"
        // },
        {
            "InternalName": "Weight",
            "DisplayNameEn": "Weight",
            "DisplayName":"الوزن المكافئ للإنجاز %",
            "type":"floatpercentage"
        },
        // {
        //     "InternalName": "PercentageCompleted",
        //     "DisplayNameEn": "Percentage Completed",
        //     "DisplayName":"النسبة المكافئة للإنجاز (%)",
        //     "type":"floatpercentage"
        // },
       
        // {
        //     "InternalName": "Completed",
        //     "DisplayNameEn": "Completed",
        //     "DisplayName":"حالة الاكتمال",
        //     "type": "yesnoradio",
        //     options: {
        //         choices: [{
        //                 display: 'yes',
        //                 value: 'yes'
        //             },
        //             {
        //                 display: 'no',
        //                 value: 'no'
        //             }
        //         ]
        //     }
        // },
        {
            "InternalName": "ActualCompletedDate",
            "DisplayNameEn": "Actual Completed Date",
            "DisplayName":"تاريخ الاكتمال الفعلي",
            "type":"datetime",
            "max":"today",
            "Errmsgkey": "cancelationdatepattern",
        },
    ]
},
    {
        label: 'الوثائق الداعمة',
        labelEn: 'Supporting Documents',
        description: "",
        descriptionEn: "",
        subFields:[
            {
                "InternalName": "getfile",
                "DisplayName":"المستندات",                
                "DisplayNameEn": "Documents",
                "type":"file",
                "withAddBtn":"true"
            }
        ]
    }
];