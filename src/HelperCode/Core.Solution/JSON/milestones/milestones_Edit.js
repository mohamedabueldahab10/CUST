var Information_Form = [{
        label: 'بيانات المعلم',
        labelEn: 'Milestone Data',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
            // {
            //     "InternalName": "Title",
            //     "DisplayName":"رمز المعلم",
            //   "DisplayNameEn": "Milestone Title",
            //     "type":"string",
            //     "validation": "required"
            // },
            {
                "InternalName": "Name",
                "DisplayName": "اسم المعلم",
                "DisplayNameEn": "Milestone Name",
                "type": "string",
                "validation": "required"

            },
            {
                "InternalName": "PlannedDate",
                "DisplayName": "تاريخ الاكتمال المخطط",
                "DisplayNameEn": "Planned Date",
                "type": "datetime"
            },
            {
                "InternalName": "ActualDate",
                "DisplayName": "تاريخ الاكتمال الفعلي",
                "DisplayNameEn": "Actual Date",
                "type": "datetime",
                "max":"today"
            },
            // {
            //     "InternalName": "CommittedDate",
            //     "DisplayName":"تاريخ الالتزام",
            // "DisplayNameEn": "Committed Date",
            //     "type":"datetime"
            // },
            {
                "InternalName": "ShowInProgramReport",
                "DisplayName": "اظهار في التقرير",
                "DisplayNameEn": "Show In Report",
                 "type": "yesnoradio",
                options: {
                    choices: [{
                        display: 'yes',
                        value: 'yes'
                    }, {
                        display: 'no',
                        value: 'no'
                    }]
                }

            },
            {
                "InternalName": "Description",
                "DisplayName": "الوصف",
                "DisplayNameEn": "Description",
                "type": "multiline",
                "maxchar": 5000,
            },
            {
                "InternalName": "Status",
                "DisplayName": "الحالة",
                "DisplayNameEn": "Status",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'completed', value: 'completed' },
                        { display: 'late', value: 'late' },
                        { display: 'onschedule', value: 'onschedule' }
                    ]
                }
            },
            {
                "InternalName": "Deliverables",
                "DisplayName": "المخرجات",
                "DisplayNameEn": "Deliverables",
                "type": "multiline",
                "maxchar": 5000,
            },
            {
                "InternalName": "RelatedInitiativeMilestone",
                "DisplayName": "معلم المبادرة المرتبط",
                "DisplayNameEn": "Related Initiative Milestone",
                "type": "lookup",
                "source": "InitiativeMilestones",
                "Dispfieldkey": "Name",
                "valfieldkey": "Title"
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
            "withAddBtn":"true"
        }]
    }
];