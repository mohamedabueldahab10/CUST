var Information_Form = [{
        label: 'نموذج اغلاق مشروع',
        labelEn: 'Closure form',
        descriptionEn: "Details ",
        description: "معلومات نموذج اغلاق مشروع ",
        subFields: [{
                "InternalName": "ClosureReasons",
                "DisplayName": "أسباب اغلاق المشروع",
                "DisplayNameEn": "Closure Reasons",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { value: 'projectcancelled', display: 'projectcancelled' },
                        { value: 'projectcompleted', display: 'projectcompleted' },
                        { value: 'ownerchange', display: 'ownerchange' },
                        { value: 'others', display: 'others' },

                        // 'الغاء المشروع', 'اكتمال المشروع', 'تغير الجهة المالكة', 'أخرى'
                    ]
                },
                "validation": "required"
            },
            {
                "InternalName": "ClosureReasonsDesc",
                "DisplayName": "شرح أسباب اغلاق المشروع",
                "DisplayNameEn": "Closure Reasons Desc",
                "type": "multiline",
                "maxchar": 5000,
                "validation": "required"
            },
        ]
    },
    {
        label: 'معلومات اغلاق أرشيف المشروع',
        labelEn: 'Closure Data',
        description: "",
        descriptionEn: "",
        subFields: [

            {
                "DisplayName": "المستندات المتعلقة بالمشتريات مثل طلبات العروض، العروض والعقود",
                "DisplayNameEn": "Documents related to procurement such as requests for proposals, proposals and contracts",
                "InternalName": "Decision1",
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
                "InternalName": "Comments1",
                "DisplayName": "وصف المستندات المتعلقة بالمشتريات مثل طلبات العروض، العروض والعقود",
                "DisplayNameEn": "Description of documents related to procurement such as requests for proposals, proposals and contracts",
                "type": "multiline"
            },
        ]
    },
    {
        label: '',
        labelEn: '',
        description: "",
        descriptionEn: "",
        subFields: [

            {
                "DisplayName": "المتسلمات النهائية للمشروع",
                "DisplayNameEn": "Final deliverables of the project",
                "InternalName": "Decision2",
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
                "InternalName": "Comments2",
                "DisplayName": "وصف المتسلمات النهائية للمشروع",
                "DisplayNameEn": "Description of the final deliverables of the project",
                "type": "multiline",
                "maxchar": 5000,
            },
        ]
    },
    {
        label: '',
        labelEn: '',
        description: "",
        descriptionEn: "",
        subFields: [

            {
                "DisplayName": "النسخ المختلفة من ميثاق المشروع والخطة والجدول الزمني والميزانية",
                "DisplayNameEn": "The various versions of the project charter, plan, schedule, and budget",
                "InternalName": "Decision3",
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
                "InternalName": "Comments3",
                "DisplayName": "وصف النسخ المختلفة من ميثاق المشروع والخطة والجدول الزمني والميزانية",
                "DisplayNameEn": "Describe the different versions of the project charter, plan, schedule, and budget",
                "type": "multiline",
                "maxchar": 5000,
            },
        ]
    },
    {
        label: '',
        labelEn: '',
        description: "",
        descriptionEn: "",
        subFields: [

            {
                "DisplayName": "تقارير الحالة الخاصة بالمشروع",
                "DisplayNameEn": "Project status reports",
                "InternalName": "Decision4",
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
                "InternalName": "Comments4",
                "DisplayName": "وصف تقارير الحالة الخاصة بالمشروع",
                "DisplayNameEn": "Description of project status reports",
                "type": "multiline",
                "maxchar": 5000,
            },
        ]
    },
    {
        label: '',
        labelEn: '',
        description: "",
        descriptionEn: "",
        subFields: [

            {
                "DisplayName": "محاضر الاجتماعات",
                "DisplayNameEn": "MOM",
                "InternalName": "Decision5",
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
                "InternalName": "Comments5",
                "DisplayNameEn": "Description  minutes of meeting",
                "DisplayName": "وصف محاضر الاجتماعات",
                "type": "multiline",
                "maxchar": 5000,
            },
        ]
    },
    {
        label: '',
        labelEn: '',
        description: "",
        descriptionEn: "",
        subFields: [

            {
                "DisplayName": "خطط العمل الفرعية",
                "DisplayNameEn": "Sub-work plans",
                "InternalName": "Decision6",
                "type": "yesnoradio",
                options: {
                    choices: [{
                            display: 'yes',
                            value: 'yes'
                        },
                        {
                            display: 'no',
                            value: 'no'
                        },
                    ]
                }
            },
            {
                "InternalName": "Comments6",
                "DisplayName": "وصف خطط العمل الفرعية",
                "DisplayNameEn": "Description of sub-work plans",
                "type": "multiline",
                "maxchar": 5000,
            },
        ]
    },
    {
        label: '',
        labelEn: '',
        description: "",
        descriptionEn: "",
        subFields: [{
                "DisplayName": "سجل المخاطر",
                "DisplayNameEn": "Risk log",
                "InternalName": "Decision7",
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
                "InternalName": "Comments7",
                "DisplayName": "وصف سجل المخاطر",
                "DisplayNameEn": "Description of the risk register",
                "type": "multiline",
                "maxchar": 5000,
            },
        ]
    },
    {
        label: '',
        labelEn: '',
        description: "",
        descriptionEn: "",
        subFields: [

            {
                "DisplayName": "سجل المشكلات",
                "DisplayNameEn": "Problem log",
                "InternalName": "Decision8",
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
                "InternalName": "Comments8",
                "DisplayName": "وصف سجل المشكلات",
                "DisplayNameEn": "Description of the problem log",
                "type": "multiline",
                "maxchar": 5000,
            },
        ]
    },
    {
        label: '',
        labelEn: '',
        description: "",
        descriptionEn: "",
        subFields: [

            {
                "DisplayName": "سجلات التغيير وأية نماذج لطلبات التغيير أو بيانات أثر التغيير",
                "DisplayNameEn": "Change records and any change request forms or change impact statements",
                "InternalName": "Decision9",
                "type": "yesnoradio",
                options: {
                    choices: [{
                            display: 'yes',
                            value: 'yes'
                        },
                        {
                            display: 'no',
                            value: 'no'
                        },
                    ]
                }
            },
            {
                "InternalName": "Comments9",
                "DisplayName": "وصف سجلات التغيير وأية نماذج لطلبات التغيير أو بيانات أثر التغيير",
                "DisplayNameEn": "Description of change records and any change request forms or change impact statements",
                "type": "multiline",
                "maxchar": 5000,
            },
        ]
    },
    {
        label: '',
        labelEn: '',
        description: "",
        descriptionEn: "",
        subFields: [

            {
                "DisplayName": "مستند قبول المشروع",
                "DisplayNameEn": "Project acceptance document",
                "InternalName": "Decision10",
                "type": "yesnoradio",
                options: {
                    choices: [{
                        display: 'yes',
                        value: 'yes'
                    }, {
                        display: 'no',
                        value: 'no'
                    }, ]
                }
            },
            {
                "InternalName": "Comments10",
                "DisplayName": "وصف مستند قبول المشروع",
                "DisplayNameEn": "Description of the project acceptance document",
                "type": "multiline",
                "maxchar": 5000,
            },
        ]
    },
    {
        label: '',
        labelEn: '',
        description: "",
        descriptionEn: "",
        subFields: [

            {
                "DisplayName": "لجنة استلام المشاريع",
                "DisplayNameEn": "Projects Receiving Committeet",
                "InternalName": "Decision11",
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
                "InternalName": "Comments11",
                "DisplayName": "وصف لجنة استلام المشاريع",
                "DisplayNameEn": "Description of the project receiving committee",
                "type": "multiline",
                "maxchar": 5000,
            },
        ]
    }
];