var Information_Form  = [
    {
        label: 'مخرج المبادرة',
        labelEn: 'Initiative Deliverable',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
            
            // {
            //     "InternalName": "Title",
            //     "DisplayNameEn": "Title",
            //     "DisplayName":"رمز المنفعة",
            //     "type":"string",
            //     "maxchar": "250"
            // },
            {
                "InternalName": "Name",
                "DisplayNameEn": "Name",
                "DisplayName":"اسم المخرج",
                "type":"string",
                "maxchar": "250",
                "validation": "required",
            },
            {
                "InternalName": "PlannedCompletedDate",
                "DisplayNameEn": "Planned Completed Date",
                "DisplayName":"تاريخ الاكتمال المخطط",
                "type":"datetime"
            },
            {
                "InternalName": "DeliverableSuccessKPI",
                "DisplayNameEn": "Deliverable Success KPI",
                "DisplayName":"مقياس نجاح المخرج  (إن وجد)",
                "type":"string"
            },
            {
                "InternalName": "CommittedDate",
                "DisplayName": "تاريخ الالتزام",
                "DisplayNameEn": "Committed Date",
                "type": "datetime",
            },
            {
                "InternalName": "Target",
                "DisplayNameEn": "Target",
                "DisplayName":"المستهدف (إن وجد)",
                "type":"string"
            },
            {
                "InternalName": "Weight",
                "DisplayNameEn": "Weight",
                "DisplayName":"القيمة",
                "type":"floatpercentage",
                "validation": "required",
            },
            {
                "InternalName": "Completed",
                "DisplayNameEn": "Completed",
                "DisplayName":"حالة الاكتمال",
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
                "InternalName": "ActualCompletedDate",
                "DisplayNameEn": "Actual Completed Date",
                "DisplayName":"تاريخ الاكتمال الفعلي",
                "type":"datetime",
                "max":"today"
            },      
            {
                "InternalName": "RelatedBenefits",
                "DisplayNameEn": "Related Benefits",
                "DisplayName":"المنفعة المرتبطة",
                "type": "lookup",
                "source": "Benefits",
                "Dispfieldkey": "Name",
                "valfieldkey": "Title",
            }
        ]
    },
    {
        label: 'الوثائق الداعمة',
        labelEn: 'Documents',
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