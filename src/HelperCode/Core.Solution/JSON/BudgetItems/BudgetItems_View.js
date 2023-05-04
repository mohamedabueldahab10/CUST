var Information_Form  = [
    {
        label: 'بيانات البند المالي',
        labelEn: 'Budget Item Data',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
            {
                "InternalName": "Title",
                "DisplayNameEn": "Item Code",
                "DisplayName":"رمز البند",
                "type":"string",
                "DisplayNameEn": "Code",
               "maxchar": "250",
                "state":"disabled"
               
            },
            {
                "InternalName": "Name",
                "DisplayNameEn": "Budget Name",
                "DisplayName":"اسم البند",
                "type":"string",
                "maxchar": "250",
            
            },
            // {
            //     "InternalName": "Stakeholders",
            //     "DisplayNameEn": "Stakeholders",
            //     "DisplayName":"الجهات المعنية",
            //     "type": "lookup",
            //     //from other list:
            //     "source": "Internal Entities",
            //     "Dispfieldkey": "Name",
            //     "valfieldkey": "Title"
            
            // },
            {
                "InternalName": "Stakeholders",
                "DisplayNameEn": "Stakeholders",
                "DisplayName":"الجهات المعنية",
                // "type": "lookup",
                "type": "string",
                "maxchar": "255",        
                //from other list:
                // "source": "Internal Entities",
                // "Dispfieldkey": "Name",
                // "valfieldkey": "Title",
            
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
            // {
            //     "InternalName": "Initiative",
            //     "DisplayNameEn": "Initiative",
            //     "DisplayName":"اسم المبادرة المرتبطة",
            //     "type":"string",
            //     "maxchar": "250"
            
            // },
            // {
            //     "InternalName": "Expenses1",
            //     "DisplayNameEn": "Expenses1",
            //     "DisplayName":"تصنيف المصروف - مستوى أول (الإدارة المالية)",
            //     "type":"float"
            
            // },
            // {
            //     "InternalName": "Expenses2",
            //     "DisplayNameEn": "Expenses2",
            //     "DisplayName":"تصنيف المصروف - مستوى ثاني (الإدارة المالية)",
            //     "type":"float"
            
            // },
            // {
            //     "InternalName": "Name",
            //     "DisplayNameEn": "Budget Name",
            //     "DisplayName":"اسم البند",
            //     "type":"string",
            //     "maxchar": "250",
            
            // },
            // {
            //     "InternalName": "Amount",
            //     "DisplayNameEn": "Amount",
            //     "DisplayName":"التكاليف الإجمالية (لكامل السنوات)",
            //     "type":"float"
            
            // },
            // {
            //     "InternalName": "Cost1",
            //     "DisplayNameEn": "Cost1",
            //     "DisplayName":"قيمة البند",
            //     "type":"float",
            //     "display":"none"
            // },
            // {
            //     "InternalName": "Cost2",
            //     "DisplayNameEn": "Cost2",
            //     "DisplayName":"قيمة البند",
            //     "type":"float",
            //     "display":"none"
            // },
            // {
            //     "InternalName": "Cost3",
            //     "DisplayNameEn": "Cost3",
            //     "DisplayName":"قيمة البند",
            //     "type":"float",
            //     "display":"none"
            // },
            {
                "InternalName": "Types",
                "DisplayNameEn": "Type",
                "DisplayName":"النوع",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'opex', value: 'opex' },
                        { display: 'capex', value: 'capex' },
                    ]
                }
            },
        ]
    },
];