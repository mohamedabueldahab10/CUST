var Information_Form = [
    {
        label: "ادارة المؤشر",
        labelEn: "KPIs Management",
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
            // {
            //   "InternalName": "Title",
            //   "DisplayNameEn": "KPI code",
            //   "DisplayName": "رمز المؤشر",
            //   "type": "string",
            //   "maxchar": "250", 
            //   "validation": "required"
            // },
            // {
            //   "InternalName": "KPICode",
            //   "DisplayNameEn": "KPI code",
            //   "DisplayName": "رمز المؤشر",
            //   "type": "string",
            //   "maxchar": "250",
            //   "validation": "required"

            // },

            {
                InternalName: "Name",
                DisplayNameEn: "Name",
                DisplayName: "المؤشر ",
                type: "string",
                maxchar: "250",
                validation: "required",
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO'
                    ]
                },
            },
            {
                InternalName: "Types",
                DisplayNameEn: "Types",
                validation: "required",
                DisplayName: "نوع المؤشر",
                toggleValues: [
                    { value: "sub", fields: ["SubRelatedObjective", "RelatedMainKpis", "Portfolio"] }, //we can put more than 1  field
                    { value: "main", fields: ["RelatedMainObjective"] }, //we can put more than 1  field
                    { value: "strategically", fields: ["StrategyRelatedObjective"] },
                ],
                type: "dropdownValues",
                options: {
                    choices: [
                        // { display: "strategically", value: "strategically" },
                        { display: "main", value: "main" },
                        { display: "sub", value: "sub" },
                        // { display: "vision", value: "vision" },
                        // { display: "jobmarket", value: "jobmarket" },
                    ],

                },
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            {
                "InternalName": "CategoryKPI",
                "DisplayNameEn": "Category",
                "DisplayName": "فئة المؤشر",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'result', value: 'result' },
                        { display: 'reason', value: 'reason' },
                    ]
                },
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },

            },
            {
                "InternalName": "Classification",
                "DisplayNameEn": "Classification",
                "DisplayName": "تصنيف المؤشر",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'kpiassigned', value: 'kpiassigned' },
                        { display: 'kpisuscomp', value: 'kpisuscomp' },
                        { display: 'kpivision', value: 'kpivision' },
                        { display: 'kpistrategic', value: 'kpistrategic' }
                    ]
                },
                validation: "required",
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            {
                InternalName: "Description",
                DisplayNameEn: "Description",
                DisplayName: "وصف المؤشر",
                maxchar: "500",
                type: "multiline",
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            {
                InternalName: "Assumptions",
                DisplayNameEn: "Assumptions",
                DisplayName: "الافتراضات",
                maxchar: "500",
                type: "multiline",
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            { //
                "InternalName": "RelatedStrategy",
                "DisplayNameEn": "Related Vision Strategy",
                "DisplayName": "الاستراتيجية المرتبطة",
                // "ToggleName": "RelatedStrategy",
                "type": "lookup",


                "source": "GoalStrategy",
                "Dispfieldkey": "Name",
                "valfieldkey": "Title",
                "validation": "required"
                // "display":"none"
                , security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            { // 
                "InternalName": "RelatedStrategyType",
                "DisplayNameEn": "Strategy Type",
                "DisplayName": "نوع  الاستراتيجية",
                "type": "dropdownValues",
                "state": "disabled",
                options: {
                    choices: [
                        { display: 'sub', value: 'sub' },
                        { display: 'vision', value: 'vision' },
                        { display: 'ministry', value: 'ministry' },
                        { display: 'sectorial', value: 'sectorial' },
                    ]
                }
            },
            {
                InternalName: "SubRelatedObjective",
                DisplayNameEn: " Related Sub Objective",
                DisplayName: "الهدف الفرعي المرتبط",
                ToggleName: "SubRelatedObjective",
                type: "lookupWithQuery",
                queryField: "Types",
                queryFieldType: "dropdownValues", //ex: "Choice"
                queryFieldValue: "sub",
                //from other list:
                source: "SOs",
                Dispfieldkey: "Name",
                valfieldkey: "Title",
                display: "none",
                // "state": "disabled",
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            {
                InternalName: "RelatedMainKpis",
                ToggleName: "RelatedMainKpis",
                DisplayNameEn: "Related Main Kpis",
                DisplayName: "الربط بالمؤشرات الرئيسية",
                type: "lookupWithQuery",
                queryField: "Types",
                queryFieldType: "dropdownValues", //ex: "Choice"
                queryFieldValue: "main",
                source: "MainKPI",
                // "state": "disabled",
                Dispfieldkey: "Name",
                valfieldkey: "Title",
                display: "none",
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            {
                InternalName: "RelatedObjective",
                DisplayNameEn: "Strategy Related Objective",
                DisplayName: "الهدف الاستراتيجي المرتبط",
                ToggleName: "StrategyRelatedObjective",
                type: "lookupWithQuery",
                queryField: "Types",
                queryFieldType: "dropdownValues", //ex: "Choice"
                queryFieldValue: "strategically",
                //from other list:
                source: "SOs",
                Dispfieldkey: "Name",
                valfieldkey: "Title",
                display: "none",
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },


            // {
            //   "InternalName": "MinistryGoal",
            //   "DisplayNameEn": "Ministry Goal",
            //   "DisplayName": "هدف الوزارة",
            //   // "ToggleName":"SubRelatedObjective",
            //   "type": "lookupWithQuery",
            //   "queryField": "Types",
            //   "queryFieldType": "dropdownValues", //ex: "Choice"
            //   "queryFieldValue": "ministry",
            //   //from other list:
            //   "source": "SOs",
            //   "Dispfieldkey": "Name",
            //   "valfieldkey": "Title",
            //   // "display":"none"

            // },
            {
                InternalName: "RelatedStrategyObjective",
                DisplayNameEn: "Related Main Objective",
                DisplayName: "الهدف الرئيسي المرتبط ",
                ToggleName: "RelatedMainObjective",
                type: "lookupWithQuery",
                queryField: "Types",
                queryFieldType: "dropdownValues", //ex: "Choice"
                queryFieldValue: "main",
                source: "SOs",
                Dispfieldkey: "Name",
                valfieldkey: "Title",
                display: "none",
                // "state": "disabled",
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            {
                "InternalName": "Sector",
                "DisplayName": "القطاع المرتبط",
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
                "state": "disabled",
                // security: {
                //     groups: [
                //         'EPMO', 'System Admin Group'
                //     ]
                // },
            },

            {
                "InternalName": "SubSector",
                "DisplayName": "الادارة المرتبطة",
                "DisplayNameEn": "Departments",
                "type": "lookup",
                //from other list:
                "source": "Internal Entities",
                "isSector": "True",
                "EntityType": "Department",
                "Dispfieldkey": "Name",
                "DispfieldkeyEn": "NameEn",
                "valfieldkey": "Title",
                "state": "disabled",
            },
            {
                "InternalName": "Portfolio",
                "DisplayName": "المحفظة المرتبطة",
                "DisplayNameEn": "Portfolio",
                "type": "lookup",
                "ToggleName": "Portfolio",
                // "validation": "required",
                //from other list:
                "source": "Portfolio",
                "Dispfieldkey": "Name",
                "valfieldkey": "Title",
                "BIlanguage": true, //added to handle portfolio bilangual
                "DispfieldkeyEn": "NameEn",//added to handle portfolio bilangual
                "state": "disabled",
                // "className":"autofill"
            },

            // {
            //   "InternalName": "KPIEquation",
            //   "DisplayNameEn": "KPI Equation",
            //   "DisplayName": "معادلة المؤشر",
            //   "type": "string",
            //   "maxchar": "500",
            // },






            //mahmoud



            // {
            //   "InternalName": "ModifiedDate",
            //   "DisplayName": "تاريخ التعديل",
            //   "DisplayNameEn": "Modified Date",
            //   "type": "datetime"
            // },
            // {
            //   "InternalName": "CreatedDate",
            //   "DisplayName": "تاريخ الإنشاء",
            //   "DisplayNameEn": "Created Date",
            //   "type": "datetime"
            // },
            // {
            //   "InternalName": "CreatedBy",
            //   "DisplayName": "إنشاء بواسطة",
            //   "DisplayNameEn": "Created By",
            //   "type": "picker"
            // },
            // {
            //   "InternalName": "ModifiedBy",
            //   "DisplayName": "تم التعديل بواسطة",
            //   "DisplayNameEn": "Modified By",
            //   "type": "picker"
            // },

            // {
            //   "InternalName": "Dimensions",
            //   "DisplayNameEn": "Dimensions",
            //   "DisplayName": "بعد الاطار",
            //   "type": "lookup",
            //   "source": "Dimensions",
            //   "Dispfieldkey": "Dimension",
            //   "valfieldkey": "Title"
            // },
            // {
            //   "InternalName": "Benchmarking",
            //   "DisplayNameEn": "Benchmarking",
            //   "DisplayName": "المقارنة المعيارية",
            //   "type": "string",
            //   "maxchar": "500",
            // },

            // {
            //   "InternalName": "Calculation",
            //   "DisplayNameEn": "Calculation",
            //   "DisplayName": "آلية حساب المؤشر",
            //   "type": "dropdownValues",
            //   options: {
            //     choices: [
            //       { display: 'last', value: 'last' },
            //       { display: 'sum', value: 'sum' },
            //       { display: 'average', value: 'average' },
            //     ]
            //   }
            // },

            // {
            //   "InternalName": "CalculationMethod",
            //   "DisplayNameEn": "Calculation Method",
            //   "DisplayName": "طريقة الحساب",
            //   "type": "dropdown",
            //   options: {
            //     choices: ['يدوي',
            //       ' مؤشرات مبادرات',
            //       'مؤشرات تشغيلية'

            //     ]
            //   }
            // },
            // {
            //   "InternalName": "Status",
            //   "DisplayNameEn": "Status",
            //   "DisplayName": "الحالة",
            //   "type": "dropdownValues",
            //   options: {
            //     choices: [
            //       { display: 'new', value: 'new' },
            //       { display: 'actual', value: 'actual' },
            //       { display: 'target', value: 'target' },
            //       { display: 'actualcompleted', value: 'actualcompleted' },
            //       { display: 'targetcompleted', value: 'targetcompleted' },
            //     ]
            //   }
            // },

            // {
            //   "InternalName": "Target",
            //   "DisplayNameEn": "Target",
            //   "DisplayName": "المستهدف",
            //   "type": "floatpercentage"
            // },
            // {
            //   "InternalName": "Actual",
            //   "DisplayNameEn": "Actual",
            //   "DisplayName": "المحقق",
            //   "type": "float"
            // },
            // {
            //   "InternalName": "Total",
            //   "DisplayNameEn": "Total",
            //   "DisplayName": "الاجمالي",
            //   "type": "float"
            // },

            // {
            //   "InternalName": "MesurePriority",
            //   "DisplayNameEn": "Mesure Priority",
            //   "DisplayName": "أولوية قياس المؤشر",
            //   "type": "dropdownValues",
            //   options: {
            //     choices: [
            //       { display: 'low', value: 'low' },
            //       { display: 'high', value: 'high' },
            //     ]
            //   }
            // },
            // {
            //   "InternalName": "KPIActivationStatus",
            //   "DisplayNameEn": "KPI Activation Status",
            //   "DisplayName": "حالة تفعيل المؤشر",
            //   "type": "dropdown",
            //   options: {
            //     choices: [
            //       'مفعّل', 'يتمّ تفعيله', 'يتمّ تفعيله في الربع الأوّل', 'يتمّ تفعيله في الربع الثاني', 'يتمّ تفعيله في الربع الثالث'
            //     ]
            //   }
            // },

            // // {
            // //   "InternalName": "RelatedStrategyObjective",
            // //   "DisplayNameEn": "Related Strategy Objective",
            // //   "DisplayName": "الأهداف الاستراتيجية المرتبطة",
            // //   "type": "lookup",
            // //   "source": "SOs",
            // //   "Dispfieldkey": "Name",
            // //   "valfieldkey": "Title"
            // // },
            // {
            //   "InternalName": "RelatedInitiativesKPIs",
            //   "DisplayNameEn": "Related Initiatives KPIs",
            //   "DisplayName": "مؤشر المبادرة المرتبطة",
            //   "type": "lookup",
            //   "source": "InitiativeKPI",
            //   "Dispfieldkey": "Name",
            //   "valfieldkey": "Title"
            // },
            // // {
            // //   "InternalName": "Formula",
            // //   "DisplayName": "المعادلة",
            // //   "type": "string"
            // // },
            // {
            //   "InternalName": "Sector",
            //   "DisplayNameEn": "Sector",
            //   "DisplayName": "القطاع",
            //   "type": "lookup",
            //   "source": "Internal Entities",
            //   "Dispfieldkey": "Name",
            //   "valfieldkey": "Title"
            // },
            // {
            //   "InternalName": "RelatedBenefits",
            //   "DisplayNameEn": "Related Benefits",
            //   "DisplayName": "المنافع المرتبطة",
            //   "type": "lookup",
            //   "source": "Benefits",
            //   "Dispfieldkey": "Title",
            //   "valfieldkey": "Title"
            // },

            // {
            //   "InternalName": "Dimensions",
            //   "DisplayName": "الأبعاد الرئيسية",
            //   "type": "lookup",
            //   "source": "Dimensions",
            //   "Dispfieldkey": "Dimension",
            //   "valfieldkey": "Title"
            // },
            // {
            //     "InternalName": "OwnerName",
            //     "DisplayNameEn": "Owner Name",
            //     "DisplayName": "اسم مالك المؤشر",
            //     "type": "string",
            //     security: {
            //         groups: [
            //             'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 'Project Managers for Project Web App'
            //         ]
            //     },
            // },
            {
                InternalName: "Owner",
                DisplayNameEn: "Owner",
                DisplayName: "مالك المؤشر",
                type: "picker",
                validation: "required",
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            {
                InternalName: "PerformanceLeader",
                DisplayNameEn: "Performance Leader",
                DisplayName: "رائد الأداء",
                type: "picker",
                validation: "required",
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            {
                InternalName: "PerformanceLeader2",
                DisplayNameEn: "Second Performance Leader",
                DisplayName: "رائد الأداء الثاني",
                type: "picker",
                validation: "required",
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            {
                InternalName: "DataSource",
                DisplayNameEn: "Data Source",
                DisplayName: "مصدر البيانات",
                type: "string",
                maxchar: "500",
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            {
                "InternalName": "DataSourceResponsible",
                "DisplayNameEn": "Data Source Responsible",
                "DisplayName": "مسؤول مصدر البيانات",
                "type": "string",
                "maxchar": "500",
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            {
                "InternalName": "Email",
                "DisplayNameEn": "Email",
                "DisplayName": "البريد الالكتروني لمسؤول مصدر البيانات",
                "type": "email", //in view should be string
                //   "maxchar": "500",
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },

        ],
    },
    {
        label: 'تفاصيل القياس',
        labelEn: 'Baseline',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
            {
                InternalName: "Polarity",
                DisplayNameEn: "Polarity",
                DisplayName: "قطبية المؤشر",
                type: "dropdown",
                options: {
                    choices: ["+", "-"],
                },
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            {
                InternalName: "PeriodType",
                DisplayNameEn: "Period Type",
                DisplayName: "تكرار القياس",
                type: "dropdownValues",
                toggleValues: [
                    { value: "monthly", fields: ["Months"] }, //we can put more than 1  field
                    { value: "quarter", fields: ["Quarter"] }, //we can put more than 1  field
                    { value: "midterm", fields: ["Midterms"] },
                    { value: "year", fields: ["Years"] },
                ], state: "disabled",
                options: {
                    choices: [
                        { display: "monthly", value: "monthly" },
                        { display: "quarter", value: "quarter" },
                        { display: "midterm", value: "midterm" },
                        { display: "year", value: "year" },
                    ],
                },
                security: {
                    groups: [
                        'SPM Admin', 'Performance Leaders', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },

            {
                InternalName: "ResultType",
                DisplayNameEn: "Result Type",
                DisplayName: "وحدة القياس",
                type: "dropdownValues",
                options: {
                    choices: [
                        { display: "numeric", value: "numeric" },
                        { display: "number", value: "number" },
                        { display: "beneficiary", value: "beneficiary" },
                        { display: "million", value: "million" },
                        { display: "month", value: "month" },
                        { display: "volunteerhour", value: "volunteerhour" },
                        { display: "partnership", value: "partnership" },
                        { display: "side", value: "side" },
                        { display: "organizationalstructure", value: "organizationalstructure" },
                        { display: "volunteer", value: "volunteer" },
                        { display: "percentage", value: "percentage" },
                        { display: "saudiriyal", value: "saudiriyal" },
                    ],
                },
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            {
                InternalName: "Cumulative",
                DisplayNameEn: "Cumulative",
                DisplayName: "تراكمية المؤشر",
                type: "yesnoradio",
                options: {
                    choices: [
                        { display: "yes", value: "yes" },
                        { display: "no", value: "no" },
                    ],
                },
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },

            {
                InternalName: "Weight",
                DisplayNameEn: "Weight",
                DisplayName: "وزن المؤشر",
                type: "floatpercentage",
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            {
                "InternalName": "Baseline",
                "DisplayNameEn": "Baseline",
                "DisplayName": "خط الأساس",
                "type": "number",
                security: {
                    groups: [
                        'SPM Admin', 'SPM Team', 'VRO_P', 'System Admin Group', 'OPMO', 
                    ]
                },
            },
            {
                "InternalName": "MesurePeriod",
                "DisplayName": "فترة قياس خط الأساس",
                "DisplayNameEn": "Mesure Period",
                "min": "FromDate",
                "type": "datetime",
                security: {
                    groups: [
                        'VRO_P', 'System Admin Group', 'SPM Admin', 'OPMO', 
                    ]
                },
                // validation: "required",
            },
            {
                "InternalName": "MesureStatus",
                "DisplayNameEn": "MesureStatus",
                "DisplayName": "حالة القياس",
                "type": "dropdownValues",
                //   "state": "disabled",
                //   dynamic: "Initiative",
                options: {
                    choices: [
                        {
                            display: 'mersurable',
                            value: 'mersurable'
                        },
                        {
                            display: 'unmersurable',
                            value: 'unmersurable'
                        },
                        // {
                        //     display: 'novalue',
                        //     value: 'novalue'
                        // },
                        {
                            display: 'completed',
                            value: 'completed'
                        },
                        {
                            display: 'unspecific',
                            value: 'unspecific'
                        },
                    ]
                },
                security: {
                    groups: [
                        'VRO_P', 'System Admin Group', 'SPM Admin', 'OPMO', 
                    ]
                },
            },

        ]
    },
    {
        label: "مكونات المعادلة",
        labelEn: "Equation components",
        description: "",
        descriptionEn: "",
        subFields: [{
            InternalName: "KPIEquation",
            DisplayNameEn: "KPI Equation",
            DisplayName: "معادلة المؤشر",
            type: "string",
            state: "disabled",
            security: {
                groups: [
                    'VRO_P', 'Performance Leaders', 'OPMO', 'System Admin Group', 
                ]
            },
            //editableBy: "PerformanceLeader",
        },
        {
            "InternalName": "Quarter",
            "DisplayNameEn": "Quarter",
            "DisplayName": "الربع",
            ToggleName: "Quarter",
            type: "dropdownValues",
            options: {
                choices: [
                    { display: "quarter1", value: "ActualQ1" },
                    { display: "quarter2", value: "ActualQ2" },
                    { display: "quarter3", value: "ActualQ3" },
                    { display: "quarter4", value: "ActualQ4" },
                ],
                "display": "none"
            },
            security: {
                groups: [
                    'VRO_P', 'Performance Leaders', 'System Admin Group', 'OPMO', 
                ]
            },
        },
        {
            "InternalName": "Midterms",
            "DisplayNameEn": "Midterms",
            "DisplayName": "النصف السنوي",
            ToggleName: "Midterms",
            type: "dropdownValues",
            options: {
                choices: [
                    { display: "midterm1", value: "ActualMid1" },
                    { display: "midterm2", value: "ActualMid2" },
                ],
                "display": "none"
            },
            security: {
                groups: [
                    'VRO_P', 'Performance Leaders', 'System Admin Group', 'OPMO', 
                ]
            },

        },
        {
            "InternalName": "Years",
            "DisplayNameEn": "Years",
            "DisplayName": "السنوي",
            ToggleName: "Years",
            type: "dropdownValues",
            options: {
                choices: [
                    { display: "yearly", value: "ActualY" },
                    // { display: "midterm2", value: "ActualMid2" },
                ],
                "display": "none"
            },
            security: {
                groups: [
                    'VRO_P', 'Performance Leaders', 'OPMO', 'System Admin Group', 
                ]
            },

        },
        {
            "InternalName": "Year",
            "DisplayNameEn": "Year",
            "DisplayName": "السنة",
            "type": "dropdown",
            //   "state": "disabled",
            //   dynamic: "Initiative",
            options: {
                choices: [
                    '2020',
                    '2021',
                    '2022',
                    '2023',
                    '2024',
                    '2025',
                    '2026',
                    '2027',
                    '2028',
                    '2029',
                    '2030',
                ]
            },
            "validation": "required",
            security: {
                groups: [
                    'VRO_P', 'Performance Leaders', 'OPMO', 'System Admin Group', 
                ]
            },
        },
        {
            InternalName: "Months",
            DisplayNameEn: "Month",
            DisplayName: "الشهر",
            ToggleName: "Months",
            type: "dropdownValues",
            options: {
                choices: [
                    { display: "month1", value: "ActualM1" },
                    { display: "month2", value: "ActualM2" },
                    { display: "month3", value: "ActualM3" },
                    { display: "month4", value: "ActualM4" },
                    { display: "month5", value: "ActualM5" },
                    { display: "month6", value: "ActualM6" },
                    { display: "month7", value: "ActualM7" },
                    { display: "month8", value: "ActualM8" },
                    { display: "month9", value: "ActualM9" },
                    { display: "month10", value: "ActualM10" },
                    { display: "month11", value: "ActualM11" },
                    { display: "month12", value: "ActualM12" },
                ],
            },
            security: {
                groups: [
                    'SPM Team', 'VRO_P', 'Performance Leaders', 'System Admin Group', 'OPMO', 
                ]
            },
            "display": "none"
        },
        // {
        //     "InternalName": "MesureStatus",
        //     "DisplayNameEn": "MesureStatus",
        //     "DisplayName": "حالة القياس",
        //     "type": "dropdownValues",
        //     //   "state": "disabled",
        //     //   dynamic: "Initiative",
        //     options: {
        //         choices: [
        //             { 
        //                 display: 'mersurable',
        //                 value: 'mersurable'
        //             },
        //             {
        //                 display: 'unmersurable',
        //                 value: 'unmersurable'
        //             },
        //             // {
        //             //     display: 'novalue',
        //             //     value: 'novalue'
        //             // },
        //             {
        //                 display: 'completed',
        //                 value: 'completed' 
        //             },
        //             {
        //                 display: 'unspecific',
        //                 value: 'unspecific'
        //             },
        //         ]
        //     },
        //     security: {
        //         groups: [
        //             'VRO_P', 'Performance Leaders', 'Administrators for Project Web App', 'OPMO', 
        //         ]
        //     },
        // },
        {
            InternalName: "A",
            DisplayName: "المكون الأول (A)",
            DisplayNameEn: "A",
            type: "number",
            //editableBy: "PerformanceLeader",
            security: {
                groups: [
                    'VRO_P', 'Performance Leaders', 'OPMO', 'System Admin Group', 
                ]
            },
        },
        {
            InternalName: "B",
            DisplayName: "المكون الثاني (B)",
            DisplayNameEn: "B",
            type: "number",
            //editableBy: "PerformanceLeader",
            security: {
                groups: [
                    'VRO_P', 'Performance Leaders', 'OPMO', 'System Admin Group', 
                ]
            },
        },
        {
            InternalName: "CC",
            DisplayName: "المكون الثالث (C)",
            DisplayNameEn: "C",
            type: "number",
            //editableBy: "PerformanceLeader",
            security: {
                groups: [
                    'VRO_P', 'Performance Leaders', 'OPMO', 'System Admin Group', 
                ]
            },
        },
        {
            InternalName: "D",
            DisplayName: "المكون الرابع (D)",
            DisplayNameEn: "D",
            type: "number",
            //editableBy: "PerformanceLeader",
            security: {
                groups: [
                    'VRO_P', 'Performance Leaders', 'OPMO', 'System Admin Group', 
                ]
            },
        },
        {
            InternalName: "E",
            DisplayName: "المكون الخامس (E)",
            DisplayNameEn: "E",
            type: "number",
            //editableBy: "PerformanceLeader",
            security: {
                groups: [
                    'VRO_P', 'Performance Leaders', 'OPMO', 'System Admin Group', 
                ]
            },
        },
        {
            InternalName: "F",
            DisplayName: "المكون السادس (F)",
            DisplayNameEn: "F",
            type: "number",
            //editableBy: "PerformanceLeader",
            security: {
                groups: [
                    'VRO_P', 'Performance Leaders', 'OPMO', 'System Admin Group', 
                ]
            },
        },
        {
            InternalName: "G",
            DisplayName: "المكون السابع (G)",
            DisplayNameEn: "G",
            type: "number",
            //editableBy: "PerformanceLeader",
            security: {
                groups: [
                    'VRO_P', 'Performance Leaders', 'OPMO', 'System Admin Group', 
                ]
            },
        },
        {
            InternalName: "Equation",
            DisplayNameEn: "Actual value",
            DisplayName: "القيمة الفعلية",
            type: "number",
            state: "disabled",
            //editableBy: "PerformanceLeader",
            security: {
                groups: [
                    'VRO_P', 'Performance Leaders', 'OPMO', 'System Admin Group', 
                ]
            },
        },
        {
            InternalName: "PerformanceAnalysis",
            DisplayNameEn: "Performance Analysis",
            DisplayName: "تحليل الأداء",
            maxchar: "500",
            type: "multiline",
            security: {
                groups: [
                    'VRO_P', 'Performance Leaders', 'OPMO', 'System Admin Group', 
                ]
            },
        },
        ],
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
            security: {
                groups: [
                    'SPM Admin', 'SPM Team', 'VRO_P', 'Performance Leaders', 'System Admin Group', 'OPMO', 
                ]
            },
            "withAddBtn": "true"
        }]
    }
];
