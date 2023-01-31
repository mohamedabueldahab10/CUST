var Information_Form = [
    {
        label: 'الهدف من ميثاق المشروع',
        labelEn: 'The Objective of the Project Charter',
        description: "",
        descriptionEn: "",
        subFields: [
            {
                "InternalName": "ProjectCharterObjective",
                "DisplayName": "الهدف من ميثاق المشروع ",
                "DisplayNameEn": "The Objective of the Project Charter",
                "type": "multiline",
                "maxchar": 5000,
                // hideonstage: "1"
            },
        ]
    },
    {
        label: 'معلومات أساسية ',
        labelEn: ' Basic Information ',
        description: "بيانات المبادرة",
        descriptionEn: "Details",
        sectiontype: "master",
        targetlist: "Initiatives",
        subFields: [
            // {
            //     "InternalName": "Title",
            //     "DisplayName":"رمز المبادرة ",
            //     "DisplayNameEn": "Code",
            //     "type":"string" ,
            //     "validation": "required"

            // },
            {
                "InternalName": "Name",
                "DisplayNameEn": "Name",
                "DisplayName": "اسم المبادرة",
                "type": "string",
                "maxchar": "250",
                //"state": "disabled"
            },
            {
                "InternalName": "Title",
                "DisplayName": "رمز المبادرة ",
                "DisplayNameEn": "Code",
                "type": "string",
                //"state": "disabled"

            },
            {
                "InternalName": "InitiativePM",
                "DisplayNameEn": "Initiative Manager",
                "DisplayName": "اسم مدير المبادرة ",
                "type": "picker",
                //"state": "disabled"
            },
               {
                   "InternalName": "Description",
                   "DisplayNameEn": "Description",
                   "DisplayName":"وصف المبادرة",
                   "type":"multiline",
                   "maxchar": "500",

               },
            {
                "InternalName": "InitiativeOwner",
                "DisplayNameEn": "Initiative Owner",
                "DisplayName": " مالك المبادرة",
                "type": "picker",
                //"state": "disabled"
            },
            {
                "InternalName": "ProgramVision",
                "DisplayNameEn": "Program Vision",
                "DisplayName": "برنامج تحقيق الرؤية",
                // "ToggleName":"SubRelatedObjective",
                "type": "string",
                // "queryField": "Types",
                // "queryFieldType": "Choices", //ex: "Choic"
                // "queryFieldValue": "vision",
                // //from other list:
                // "source": "Initiatives",
                // "Dispfieldkey": "Name",
                // "valfieldkey": "Title",
                // "display":"none"
    
            },
            {
                "InternalName": "SubSector",
                "DisplayName": "الوكالة/الجهة",
                "DisplayNameEn": "Departments",
                "type": "lookup",
                //from other list:
                "source": "Internal Entities",
                "isSector": "True",
                "EntityType": "Department",
                "Dispfieldkey": "Name",
                "DispfieldkeyEn": "NameEn",
                "valfieldkey": "Title",
                // "state": "disabled"
            },
            {
                "InternalName": "RelatedStrategyObjective",
                "DisplayNameEn": "Objective Name",
                "DisplayName": "أسم الهدف",
                "type": "lookup",
                "source": "SOs",
                "Dispfieldkey": "Name",
                "valfieldkey": "Title",
                //"state": "disabled"
            },
            {
                "InternalName": "RelatedStrategyObjectiveCode",
                "DisplayNameEn": "Objective ID",
                "DisplayName": "رمز الهدف",
                "type": "lookup",
                "source": "SOs",
                "Dispfieldkey": "Title",
                "valfieldkey": "Title",
                //"state": "disabled"
            },
               {
                   "InternalName": "StartDate",
                   "DisplayName": "تاريخ بداية المبادرة ",
                   "DisplayNameEn": "Start Date",
                   "type": "datetime",
                   "max":"FinishDate"
               },
               {
                "InternalName": "ProgramTotalCost",
                "DisplayName": "التكاليف الكلية حسب سقف البرنامج ",
                "DisplayNameEn": "Program Total Cost",
                "type": "float",
            },
             {
                "InternalName": "Expenditures",
                "DisplayName": "المنصرف الأجمالي ",
                "DisplayNameEn": "Expenditures",
                "type": "float",
            },
            {
                "InternalName": "ActualCost",
                "DisplayName": "التكاليف الكلية المعتمدة ",
                "DisplayNameEn": "Actual Cost",
                "type": "float",
            },
               {
                   "InternalName": "FinishDate",
                   "DisplayName": "تاريخ نهاية المبادرة ",
                   "DisplayNameEn": "Finish Date",
                   "type": "datetime",
                   "max":"StartDate"
               },   

        ]
    },

    {
        label: 'معلومات أساسية ',
        labelEn: 'Basic Information',
        description: "",
        descriptionEn: "",
        
        subFields: [ 
            {
                "InternalName": "Name",
                "DisplayName": "اسم المشروع",
                "DisplayNameEn": "Project Name",
                "type": "string",
                "state": "disabled"
            },
     
            {
                "InternalName": "Title",
                "DisplayName": "رمز المشروع",
                "DisplayNameEn": "Project ID",
                "type": "string",
                "state": "disabled"
            },
            {
                "InternalName": "ScopeOfWork",
                "DisplayName": "نطاق المشروع",
                "DisplayNameEn": "ScopeOfWork",
                "type": "multiline",
                // "validation": "required",
                "maxchar": 5000,
                "state": "disabled"
                // security: {
                //     groups: [
                //         'EPMO', 'Administrators for Project Web App', 'OPMO', 'Project Managers for Project Web App'
                //     ]
                // },
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
                //         'EPMO', 'Administrators for Project Web App', 'OPMO', 'SPMO'
                //     ]
                // },
                "state": "disabled",
                // "className":"autofill"
            },
            {
                "InternalName": "ProjectManager",
                "DisplayName": "اسم مدير المشروع",
                "DisplayNameEn": "Project Manager",
                "type": "picker",
                "state": "disabled"

            },
            {
                "InternalName": "ProjectOwner",
                "DisplayName": "اسم مالك المشروع",
                "DisplayNameEn": "Project Owner",
                "type": "picker",
                "state": "disabled"

            },

            {
                "InternalName": "ActualStartDate",
                "DisplayName": "تاريخ بداية المشروع",
                "DisplayNameEn": "Project Start Date",
                "type": "datetime",
                "max": "ActualFinishDate",
                "state": "disabled"
            },
            {
                "InternalName": "ActualFinishDate",
                "DisplayName": "تاريخ نهاية المشروع",
                "DisplayNameEn": "Project Finish Date",
                "type": "datetime",
                "min": "ActualStartDate",
                "state": "disabled"
            },
            {
                "InternalName": "BaselineStartDate",
                "DisplayName": "تاريخ بدء الأساس",
                "DisplayNameEn": "Baseline Start Date",
                "type": "datetime",
                "max": "BaselineFinishDate",
                "state": "disabled"
            },
            {
                "InternalName": "ActualCostWorkCompleted",
                "DisplayName": "التكلفة الفعلية للعمل المنجز",
                "DisplayNameEn": "Actual Cost Work Completed",
                "type": "float",
                "state": "disabled"
            },
            {
                "InternalName": "AssignedBudget",
                "DisplayName": "الميزانية المخصصة ",
                "DisplayNameEn": "Project Budget",
                "type": "float",
                "state": "disabled"
                //"state": "disabled"
                // "showonstage":"1"
            },//mahmoud
            {
                "InternalName": "Sector",
                "DisplayName": "القطاع",
                "DisplayNameEn": "Sector",
                "type": "lookup",
                // "validation": "required",
                //from other list:
                "source": "Internal Entities",
                "isSector": "True",
                "EntityType": "Sector",
                "Dispfieldkey": "Name",
                "DispfieldkeyEn": "NameEn",
                "valfieldkey": "Title",
                "state": "disabled"
                // security: {
                //     groups: [
                //         'EPMO', 'Administrators for Project Web App'
                //     ]
                // },
            },
            {
                "InternalName": "SubSector",
                "DisplayName": "الوكالة",
                "DisplayNameEn": "Departments",
                "type": "lookup",
                //from other list:
                "source": "Internal Entities",
                "isSector": "True",
                "EntityType": "Department",
                "Dispfieldkey": "Name",
                "DispfieldkeyEn": "NameEn",
                "valfieldkey": "Title",
                "state": "disabled"
            },
           
            {
                "InternalName": "NTP",
                "DisplayName": "NTP",
                "DisplayNameEn": "NTP",
                // "validation": "required",
                "type": "yesnoradio",
                "state": "disabled",
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
                // security: {
                //     groups: [
                //         'EPMO', 'Administrators for Project Web App', 'OPMO', 'SPMO'
                //     ]
                // },
            },
            {
                "InternalName": "Description",
                "DisplayName": "وصف المشروع",
                "DisplayNameEn": "Project Description and Background ",
                "type": "multiline",
                "maxchar": 5000,
                "state": "disabled",
                // hideonstage: "1"
            },
          


        ]
    },
    {
        label: 'أهداف المشروع ',
        labelEn: 'Objectives of the Project ',
        description: "التفاصيل",
        descriptionEn: "Details",
        sectiontype: "master",
        targetlist: "SOs",
        subFields: [
         
         
            {
                "InternalName": "Name",
                "DisplayNameEn": "Project Objectives",
                "DisplayName":"هدف المشروع",
                "type":"string",
                "maxchar": "250",
                
            
            },
            {
                "InternalName": "Description",
                "DisplayNameEn": "Objective Description",
                "DisplayName":"وصف الهدف",
                "type":"multiline",               
            
            },
            //mahmoud
             {
                "InternalName": "KPIs",
                "DisplayName": "مؤشر قياس الأداء",
                "DisplayNameEn": "KPI",
                "type": "float",
                // "maxchar": 5000,
                // hideonstage: "1"
            },
            {
                "InternalName": "Target",
                "DisplayNameEn": "Target",
                "DisplayName":"المستهدف",
                "type":"float"
            },
            {
                "InternalName": "DueDate",
                "DisplayNameEn": "Due Date",
                "DisplayName":"تاريخ الاستحقاق ",
                "type":"datetime"
            },
        ]
    },
   

   
    {
        label: 'تحليل أصحاب العلاقة ',
        labelEn: 'Stakeholder Analysis',
        description: "",
        descriptionEn: "",
        sectiontype: "master",
        targetlist: "Stakeholders",
        subFields: [{
                "InternalName": "Name",
                "DisplayName": "الاسم",
                "DisplayNameEn": "Name",
                "type": "string"
            },
            {
                "InternalName": "Role",
                "DisplayName": "دوره في المشروع",
                "DisplayNameEn": "Role",
                "type": "string",
            },
            {
                "InternalName": "InfluenceLevel",
                "DisplayName":"مستوى التأثير",
                "DisplayNameEn":"Influence Level",
                "type":"dropdownValues",
                options:{
                    choices:[
                        {display:'pr02important', value:'pr02important'},
                        {display:'pr03medium', value:'pr03medium'},
                        {display:'pr04low', value:'pr04low'}
           
                    ]
                }
            },
            {
                "InternalName": "Description",
                "DisplayName": "وصف طبيعة التأثير على المشروع",
                "DisplayNameEn": "Description Of Influence On Project",
                "type": "multiline",
                //"state": "disabled"
            }
        ]
    },
    {
        label: 'نطاق عمل المشروع ',
        description: "",
        descriptionEn: "",
        labelEn: 'Project Scope',
        descriptionEn: "",
        subFields: [
        {
            "InternalName": "WithinScope",
            "DisplayName": "داخل النطاق",
            "DisplayNameEn": "With in Scope",
            "type": "multiline",
            //"state": "disabled",
            //"state": "disabled"
        },
        {
            "InternalName": "OutOfScope",
            "DisplayName": "خارج النطاق",
            "DisplayNameEn": "Out Of Scope",
            "type": "multiline",
            //"state": "disabled"
            //"state": "disabled"
        }
        ]
    },
    {
        label: 'مخرجات المشروع الرئيسة',
        labelEn: 'Project Deliverables',
        description: "المخرجات ",
        descriptionEn: "Deliverables",
        sectiontype: "master",
        targetlist: "Deliverables",
        subFields: [{
                "InternalName": "Name",
                "DisplayName": "اسم المخرج",
                "DisplayNameEn": "Deliverable",
                "type": "string"
            },
            {
                "InternalName": "Description",
                "DisplayName": "وصف مختصر للمخرج",
                "DisplayNameEn": "Description",
                "type": "multiline",
            },
            {
                "InternalName": "PlannedFinishDate",
                "DisplayName": "تاريخ اكتمال المقترح",
                "DisplayNameEn": "Projected Finish Date",
                "type": "datetime",
            },
        ]
    },
    // {
    //     label: 'الوثائق الداعمة',
    //     labelEn: 'Supporting Documents',
    //     description: "",
    //     descriptionEn: "",
    //     subFields: [{
    //         "InternalName": "getfile",
    //         "DisplayName": "المرفقات",
    //         "DisplayNameEn": "Supporting Data",
    //         "type": "file",
    //         "fileExtensions": "png,jpeg,svg,xlsx,docx,jpg,txt"
    //     }]
    // }
];