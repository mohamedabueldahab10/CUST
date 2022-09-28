var Information_Form = [
    {
        label: 'المعلم المبادرة',
        labelEn: 'Initiative Milestone',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [

            // {
            //     "InternalName": "Title",
            //     "DisplayNameEn": "Title",
            //     "DisplayName":"رمز المعلم",
            //     "type":"string",
            //     "maxchar": "250"
            // },
            {
                "InternalName": "Name",
                "DisplayNameEn": "Name",
                "DisplayName": "اسم المعلم",
                "type": "string",
                "maxchar": "250",
                "validation": "required",
                security: {
                    groups: ['VRO_E','LMS_E','System Admin Group',
                        'EPMO'
                    ]
                },
            },
            {
                "InternalName": "PlannedCompletedDate",
                "DisplayNameEn": "Planned Completed Date",
                "DisplayName": "تاريخ الاكتمال المخطط",
                "type": "datetime",
                security: {
                    groups: ['VRO_E','LMS_E','System Admin Group',
                        'EPMO'
                    ]
                },
            },
            {
                "InternalName": "Weight",
                "DisplayNameEn": "Weight",
                "DisplayName": "الوزن المكافئ للإنجاز %",
                "type": "decimalpercentage",
                "validation": "required",
                security: {
                    groups: ['VRO_E','LMS_E','System Admin Group',
                        'EPMO'
                    ]
                },
            },

            {
                "InternalName": "Completed",
                "DisplayNameEn": "Completed",
                "DisplayName": "حالة الاكتمال",
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
                },
                security: {
                    groups: ['VRO_E','LMS_E','System Admin Group',
                        'EPMO'
                    ]
                },
            },
            {
                "InternalName": "ActualCompletedDate",
                "DisplayNameEn": "Actual Completed Date",
                "DisplayName": "تاريخ الاكتمال الفعلي",
                "type": "datetime",
                "max": "today"
            },
            {
                "InternalName": "RelatedInitiativeDeliverable",
                "DisplayNameEn": "Related Initiative Deliverable",
                "DisplayName": "مخرج المبادرة المرتبط",
                "type": "lookup",
                "source": "InitiativeDeliverables",
                "Dispfieldkey": "Name",
                "valfieldkey": "Title",
            },
            {
                "InternalName": "SupportDocumentsDescription",
                "DisplayNameEn": "Support Documents Description",
                "DisplayName": "وصف الوثائق الداعمة",
                "type": "multiline",
                "maxchar": "500",
            }
        ]
    },
    {
        label: 'الوثائق الداعمة',
        labelEn: 'Documents',
        description: "",
        descriptionEn: "",
        subFields: [
            {
                "InternalName": "getfile",
                "DisplayName": "المستندات",
                "DisplayNameEn": "Documents",
                "type": "file",
                "withAddBtn": "true"
            }
        ]
    }
];