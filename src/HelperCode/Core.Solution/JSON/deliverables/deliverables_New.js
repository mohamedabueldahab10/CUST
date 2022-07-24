var Information_Form = [{
        label: 'بيانات المخرج',
        labelEn: 'Delivrable Data',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
            // {
            //     "InternalName": "Title",
            //     "DisplayName":"رمز المخرج",
            //     "type":"string",
            //     "validation": "required"
            // },
            {
                "InternalName": "Name",
                "DisplayName": "اسم المخرج",
                "DisplayNameEn": "Deliverable Name",
                "type": "string",
                "validation": "required"
            },
            // {
            //     "InternalName": "Quantity",
            //     "DisplayName":"الكمية",
            //     "type":"float"
            // },
            {
                "InternalName": "Weight",
                "DisplayName": "الوزن / القيمة (%)",
                "DisplayNameEn": "Weight (%)",
                "type": "floatpercentage",
                "validation": "required"
            },
            {
                "InternalName": "Status",
                "DisplayName": "الحالة",
                "DisplayNameEn": "Status",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'pending', value: 'pending' },
                        { display: 'completed', value: 'completed' }
                    ]
                }
            },
            {
                "InternalName": "AcceptanceCriteria",
                "DisplayName": "معايير قبول المخرج",
                "DisplayNameEn": "Acceptance Criteria",
                "type": "string"
            },
            {
                "InternalName": "PlannedStartDate",
                "DisplayName": "تاريخ البدء المخطط",
                "DisplayNameEn": "Planned Start Date",
                "type": "datetime",
                "max": "PlannedFinishDate",
                "validation": "required"
            },
            {
                "InternalName": "PlannedFinishDate",
                "DisplayName": "تاريخ الانتهاء المخطط",
                "DisplayNameEn": "Planned Finish Date",
                "type": "datetime",
                "min": "PlannedStartDate",
                "validation": "required"
            },
            // {
            //     "InternalName": "SupplyDate",
            //     "DisplayName": "تاريخ التوريد",
            //     "DisplayNameEn": "Supply Date",
            //     "type": "datetime"
            // },
            {
                "InternalName": "CommittedDate",
                "DisplayName": "تاريخ الالتزام",
                "DisplayNameEn": "Committed Date",
                "type": "datetime",
                "validation": "required"
            },
            // {
            //     "InternalName": "StartDate",
            //     "DisplayName":"تاريخ البدءالفعلي",
            // "DisplayNameEn": "Start Date",
            //     "type":"datetime",
            //     "max": "FinishDate"
            // },
            // {
            //     "InternalName": "FinishDate",
            //     "DisplayName":"تاريخ الانتهاء الفعلي",
            // "DisplayNameEn": "Finish Date",
            //     "type":"datetime",
            //     "min": "StartDate"
            // },

            // {
            //     "InternalName": "DeliveredDate",
            //     "DisplayName":"تاريخ التسليم",
            // "DisplayNameEn": "Delivered Date",
            //     "type":"datetime"
            // },

            // {
            //     "InternalName": "Delivered",
            //     "DisplayName":"تم التسليم",
            // "DisplayNameEn": "Delivered",
            //     "type":"radio",
            //             options:{
            //         choices:[
            //             'لا','نعم'     
            //           ]
            //     }

            // },
            {
                "InternalName": "Description",
                "DisplayName": "الوصف",
                "DisplayNameEn": "Description",
                "type": "multiline",
                "maxchar": 5000,
            },
            {
                "InternalName": "Comments",
                "DisplayName": "الملاحظات",
                "DisplayNameEn": "Comments",
                "type": "multiline",
                "maxchar": 5000,
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