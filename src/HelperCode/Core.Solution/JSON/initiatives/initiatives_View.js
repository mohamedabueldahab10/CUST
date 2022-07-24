var Information_Form  = [
    {
        label: 'المبادرات',
        labelEn: 'Initiative Data',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
        // {
        //     "InternalName": "Title",
        //     "DisplayName":"رمز المبادرة ",
        //     "type":"string" ,
        //     "state":"disabled"

        // },
        {
            "InternalName": "Name",
            "DisplayNameEn": "Name",
            "DisplayName":"اسم المبادرة",
            "type":"string",
            "maxchar": "250",
            "validation": "required"

        },
        {
            "InternalName": "Types",
            "DisplayNameEn": "Types",
            "DisplayName":"النوع",
            "toggleValues": [
                {value:'vision', fields:['RelatedBudgetItem']},//we can put more than 1  field
                ],
            "type": "dropdownValues",
            options: {
                choices: [
                    { display: 'vision', value: 'vision' },                    
                    { display: 'strategically', value: 'strategically' },
                    { display: 'others', value: 'others' },
                ]
            }
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
            "InternalName": "RelatedKPI",
            "DisplayNameEn": "Related KPI",
            "DisplayName":"المؤشر الفرعي المرتبط",
            "type": "string",
            "display":"none"
        },
        {
            "InternalName": "Status",
                "DisplayName": "حالة المبادرة",
                "DisplayNameEn": "Initiative Status",
                "type": "dropdownValues",
                "validation": "required",
                options: {
                    choices: [
                        // { value: 'notstarted', display: 'notstarted' },
                        { value: 'inactive', display: 'inactive' },
                        { value: 'implementationnotstarted', display: 'implementationnotstarted' },
                        { value: 'executioninitiative', display: 'executioninitiative' },
                        { value: 'complete', display: 'complete' },
                        { value: 'canceled', display: 'canceled' },
                        // { value: 'closureinitiative', display: 'closureinitiative' }

                    ]
            },
        },
        {
            "InternalName": "Description",
            "DisplayNameEn": "Description",
            "DisplayName":"وصف المبادرة",
            "type":"multiline",
            "maxchar": "500",
            "validation": "required"

        },
      
        //  {
        //     "InternalName": "RelatedProgram",
        //     "DisplayNameEn": "Related Program",
        //     "DisplayName": "أسم البرنامج التابع له",
        //     "type": "lookup",
        //     "source": "Instruments",
        //     "Dispfieldkey": "Title",
        //     "valfieldkey": "Title"
        //  },
        {
            "InternalName": "RelatedProgram",
            "DisplayNameEn": "Related Program",
            "DisplayName": "أسم البرنامج التابع له",
            "type": "string",
            // "source": "Instruments",
            // "Dispfieldkey": "Title",
            // "valfieldkey": "Title"
        },
        {
            "InternalName": "RelatedObjectiveAgency",
            "DisplayNameEn": "Objective Name",
            "DisplayName": "الارتباط بهدف الوكالة ",
            "type": "lookup",
            "source": "SOs",
            // "state": "disabled",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title"
        },
        {
            "InternalName": "InitiativeOwnerEntity",
            "DisplayNameEn": "Initiative Owner Entity",
            "DisplayName": "الجهة المالكة للمبادرة ",
            "type": "picker",
            // "state": "disabled",
        },
        // {
        //     "InternalName": "RelatedStrategyObjective",
        //     "DisplayNameEn": "Objective Name",
        //     "DisplayName": "الارتباط بهدف الوكالة ",
        //     "type": "lookup",
        //     "source": "SOs",
        //     // "state": "disabled",
        //     "Dispfieldkey": "Name",
        //     "valfieldkey": "Title"
        // },
        {
            "InternalName": "ProgramVision",
            "DisplayNameEn": "Program Vision",
            "DisplayName": "برنامج تحقيق الرؤية",
            "type": "string",
     

        },
        {
            "InternalName": "RelatedObjective",
            "DisplayNameEn": "Related Objective",
            "DisplayName": "الهدف المرتبط",
            "type": "lookup",
            "source": "SOs",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",               
            "state": "disabled"
        },
        {
            "InternalName": "RelatedStrategyObjective",
            "DisplayNameEn": "Related Strategy Objective",
            "ToggleName": "RelatedStrategyObjective",
            "DisplayName": "الهدف الاستراتيجي المرتبط",
            "type": "lookup",
            "source": "SOs",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",               
            // "state": "disabled",
             "display":"none"
        },
        {
            "InternalName": "RelatedStrategy",
            "DisplayNameEn": "Related Strategy",
            "DisplayName": "الاستراتيجية المرتبطة",
            "type": "lookup",
            "source": "GoalStrategy",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title"
         },
        //  {
        //     "InternalName": "Portfolio",
        //     "DisplayName": "المحفظة",
        //     "DisplayNameEn": "Portfolio",
        //     "type": "lookup",
        //     //from other list:
        //     "source": "Portfolio",
        //     "Dispfieldkey": "Name",
        //     "valfieldkey": "Title",
        //     "BIlanguage" : true, //handle portfolio bilangual
        //     "DispfieldkeyEn": "NameEn",// handle portfolio bilangual
        // },
        {
            "InternalName": "Sector",
            "DisplayNameEn": "Sector",
            "DisplayName":"القطاع",
            "type": "lookup",
            //from other list:
            "source": "Internal Entities",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",
        } ,
        {
            "InternalName": "SubSector",
            "DisplayNameEn": "Department",
            "DisplayName":"الوكالة/الجهة ",
            "type": "lookup",
            //from other list:
            "source": "Internal Entities",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title"

        } ,
      
    
        {
            "InternalName": "InitiativeOwner",
            "DisplayNameEn": "Initiative Owner",
            "DisplayName": "مالك المبادرة ",
            "type": "picker"
        },
        {
            "InternalName": "OwnerEmail",
            "DisplayNameEn": "Owner Email",
            "DisplayName": "البريد الإلكتروني لمالك المبادرة",
            "type": "string",
            "maxchar": "500",
          },
        {
            "InternalName": "InitiativePM",
            "DisplayNameEn": "Initiative manager",
            "DisplayName": "مدير المبادرة ",
            "type": "picker"
        },
        {
            "InternalName": "ManagerEmail",
            "DisplayNameEn": "Manager Email",
            "DisplayName": "البريد الإلكتروني لمدير المبادرة",
            "type": "string",
            "maxchar": "500",
          },
        // {
        //     "InternalName": "ObjectiveOwner",
        //     "DisplayNameEn": "Objective Owner",
        //     "DisplayName": "مالك الهدف ",
        //     "type": "string"
        // },
        {
            "InternalName": "StartDate",
            "DisplayName": "تاريخ بداية المبادرة ",
            "DisplayNameEn": "Start Date",
            "type": "datetime",
            "max":"FinishDate"
        },
        {
            "InternalName": "FinishDate",
            "DisplayName": "تاريخ نهاية المبادرة ",
            "DisplayNameEn": "Finish Date",
            "type": "datetime",
            "min":"StartDate"
        },
        {
            "InternalName": "ExpenseStartDate",
            "DisplayName": "تاريخ بداية الصرف",
            "DisplayNameEn": "Expense Start Date",
            "type": "datetime"
        },
        {
            "InternalName": "Classification",
            "DisplayName": "تصنيف المبادرة",
            "DisplayNameEn": "Classification",
            "type": "string",
        },
       
        {
            "InternalName": "InitiativeStatus",
            "DisplayName": "حالة توثيق المبادرة",
            "DisplayNameEn": "Initiative Documentation Status",
            "type": "string",
        },

        {
            "InternalName": "PlannedPercentageCompleted",
            "DisplayName": "نسبة اكتمال المبادرة المخططة ",
            "DisplayNameEn": "Planned Percentage Completed",
            "type": "floatpercentage",
        },
        {
            "InternalName": "ActualPercentageCompleted",
            "DisplayName": "نسبة الإكتمال الفعلية ",
            "DisplayNameEn": "Actual Percentage Completed",
            "type": "floatpercentage",
        },
        {
            "InternalName": "DelayPercentage",
            "DisplayName": "نسبة التأخير ",
            "DisplayNameEn": "Delay Percentage",
            "type": "floatpercentage",
        },
        {
            "InternalName": "DependencyCost",
            "DisplayName": "حجم الارتباط (منصة اعتماد) ",
            "DisplayNameEn": "Dependency Cost",
            "type": "float",
        },
        // {
        //     "InternalName": "StrategicPillar",
        //     "DisplayNameEn": "Strategic Pillar",
        //     "DisplayName":"ركيزة الاستراتيجية",
        //     "type": "lookup",
        //     //from other list:
        //     "source": "SPillars",
        //     "Dispfieldkey": "Name",
        //     "valfieldkey": "Name",
        //     "validation": "required"

        // },
     
     
   

    ]
},
{
    label: 'المعلومات المالية',
    labelEn: 'Financial Data',
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [
        {
            "InternalName": "RelatedBudgetItem",
            // "ToggleName": "RelatedBudgetItem", //ToggleName to select which field
            "DisplayNameEn": "Related Budget Item",
            "DisplayName": "البند المالي المرتبط",
            "type": "lookup",
            //from other list:
            "source": "Budget Items",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",
            // "display":"none"

        },
        {
            "InternalName": "EstimatedCost",
            "DisplayName": "التكلفة التقديرية ",
            "DisplayNameEn": "Estimated Cost",
            "type": "float",
        },
        {
            "InternalName": "InitiativeBudget",
            "DisplayName": "ميزانية المبادرة ",
            "DisplayNameEn": "InitiativeBudget",
            // "state": "disabled",
            "type": "float",
        },
        {
            "InternalName": "ProgramTotalCost",
            "DisplayName": "التكاليف الكلية حسب سقف البرنامج ",
            "DisplayNameEn": "Program Total Cost",
            "type": "float",
        },
        {
            "InternalName": "ActualCost",
            "DisplayName": "التكاليف الكلية المعتمدة ",
            "DisplayNameEn": "Actual Cost",
            "type": "float",
        },
        {
            "InternalName": "CurrentBuget",
            "DisplayName": "السيولة المخصصة للعام المالي الحالي ",
            "DisplayNameEn": "Current Budget",
            "type": "float",
        },
        {
            "InternalName": "Expenditures",
            "DisplayName": "المنصرف الأجمالي ",
            "DisplayNameEn": "Expenditures",
            "type": "float",
        },
        {
            "InternalName": "CurrentExpenditures",
            "DisplayName": "المنصرف من السنة المالية الحالية",
            "DisplayNameEn": "Current Expenditures",
            "type": "float",
        },
    ]
}
];