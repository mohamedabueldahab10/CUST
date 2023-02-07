var Information_Form = [
    {
        label: 'المعلم المبادرة',
        labelEn: 'Initiative Milestone',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
            {
                "InternalName": "Title",
                "DisplayNameEn": "Title",
                "DisplayName":"رمز المعلم",
                "type":"string",
                // "maxchar": "250"
            },
            {
                "InternalName": "Name",
                "DisplayNameEn": "Name",
                "DisplayName": "اسم المعلم",
                "type": "string",
                "maxchar": "250"
            },
            // {
            //     "InternalName": "PlannedCompletedDate",
            //     "DisplayNameEn": "Planned Completed Date",
            //     "DisplayName": "تاريخ الاكتمال المخطط",
            //     "type": "datetime"
            // },
            {
                InternalName: 'PlannedDate',
                DisplayName: 'تاريخ الاكتمال المخطط',
                DisplayNameEn: 'Planned Finish Date',
                type: 'datetime',
                validation: 'required',
            },
            {
                "InternalName": "Weight",
                "DisplayNameEn": "Weight",
                "DisplayName": "الوزن المكافئ للإنجاز %",
                "type": "floatpercentage"
            },

            // {
            //     "InternalName": "Completed",
            //     "DisplayNameEn": "Completed",
            //     "DisplayName": "حالة الاكتمال",
            //     "type": "yesnoradio",
            //     options: {
            //         choices: [{
            //             display: 'yes',
            //             value: 'yes'
            //         },
            //         {
            //             display: 'no',
            //             value: 'no'
            //         }
            //         ]
            //     }
            // },
            {
                InternalName: 'Delivered',
                DisplayName: 'تم التسليم',
                DisplayNameEn: 'Delivered',
                type: 'yesnoradio',
                options: {
                    choices: [
                    { display: 'yes', value: 'true' },
                    { display: 'no', value: 'false' },
                    ],
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
    // {
    //     label: 'الوثائق الداعمة',
    //     labelEn: 'Supporting Documents',
    //     description: "",
    //     descriptionEn: "",
    //     subFields:[
    //         {
    //             "InternalName": "getfile",
    //             "DisplayName":"المستندات",                
    //             "DisplayNameEn": "Documents",
    //             "type":"file"
    //         }
    //     ]
    // }
];