var Information_Form  = [
    {
        label: 'بيانات البند المالي',
        labelEn: 'Budget Item Data',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
            // {
            //     "InternalName": "Title",
            //     "DisplayName":"رمز البند",
            //     "type":"string",
            //    "maxchar": "250",
            //     "state":"disabled"
               
            // },
            
            {
                "InternalName": "Types",
                "DisplayNameEn": "Types",
                "DisplayName":"النوع",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'opex', value: 'opex' },
                        { display: 'capex', value: 'capex' },
                    ]
                }
            },
            {
                "InternalName": "Stakeholders",
                "DisplayNameEn": "Stakeholders",
                "DisplayName":"الجهة المعنية",
                "type": "lookup",
                //from other list:
                "source": "Internal Entities",
                "Dispfieldkey": "Name",
                "valfieldkey": "Title",
                "validation": "required"
            
            },
            {
                "InternalName": "Initiative",
                "DisplayNameEn": "Initiative",
                "DisplayName":"اسم المبادرة المرتبطة",
                "type":"string",
                "maxchar": "250",
                "validation": "required"
            
            },
            {
                "InternalName": "Expenses1",
                "DisplayNameEn": "Expenses1",
                "DisplayName":"تصنيف المصروف - مستوى أول (الإدارة المالية)",
                "type":"float"
            
            },
            {
                "InternalName": "Expenses2",
                "DisplayNameEn": "Expenses2",
                "DisplayName":"تصنيف المصروف - مستوى ثاني (الإدارة المالية)",
                "type":"float"
            
            },
            {
                "InternalName": "Name",
                "DisplayNameEn": "Budget Name",
                "DisplayName":"اسم البند",
                "type":"string",
                "maxchar": "250",
            
            },
            {
                "InternalName": "Amount",
                "DisplayNameEn": "Amount",
                "DisplayName":"التكاليف الإجمالية (لكامل السنوات)",
                "type":"float"
            
            },
            {
                "InternalName": "From",
                "DisplayNameEn": "From",
                "DisplayName":"من تاريخ",
                "type":"datetime"
                
            },
            {
                "InternalName": "To",
                "DisplayNameEn": "To",
                "DisplayName":"إلى تاريخ",
                "type":"datetime"
            
            },
            {
                "InternalName": "Cost1",
                "DisplayNameEn": "Cost1",
                "DisplayName":"قيمة البند",
                "type":"float",
                "display":"none"
            },
            {
                "InternalName": "Cost2",
                "DisplayNameEn": "Cost2",
                "DisplayName":"قيمة البند",
                "type":"float",
                "display":"none"
            },
            {
                "InternalName": "Cost3",
                "DisplayNameEn": "Cost3",
                "DisplayName":"قيمة البند",
                "type":"float",
                "display":"none"
            }
        ]
    },
];