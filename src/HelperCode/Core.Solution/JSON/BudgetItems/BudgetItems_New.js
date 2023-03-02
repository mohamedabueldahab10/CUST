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
       
            // {
            //     "InternalName": "Types",
            //     "DisplayNameEn": "Types",
            //     "DisplayName":"النوع",
            //     "type": "dropdownValues",
            //     options: {
            //         choices: [
            //             { display: 'opex', value: 'opex' },
            //             { display: 'capex', value: 'capex' },
            //         ]
            //     }
            // },
            {
                "InternalName": "Name",
                "DisplayNameEn": "Budget Name",
                "DisplayName":"اسم البند",
                "type":"string",
                "maxchar": "250",
            
            },
            {
                "InternalName": "Stakeholders",
                "DisplayNameEn": "Stakeholders",
                "DisplayName":"الجهة المعنية",
                // "type": "lookup",
                "type": "string",
                //from other list:
                // "source": "Internal Entities",
                // "Dispfieldkey": "Name",
                // "valfieldkey": "Title",
                "validation": "required"
            
            },
            {
                "InternalName": "From",
                "DisplayNameEn": "From",
                "DisplayName":"من تاريخ",
                "type":"datetime",
                "max": "To"
                
            },
            {
                "InternalName": "To",
                "DisplayNameEn": "To",
                "DisplayName":"إلى تاريخ",
                "type":"datetime",
                "min": "From",
            
            },
            // {
            //     "InternalName": "Initiative",
            //     "DisplayNameEn": "Initiative",
            //     "DisplayName":"اسم المبادرة المرتبطة",
            //     "type":"string",
            //     "maxchar": "250",
            //     "validation": "required"
            
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
            //     "DisplayName":"قيمة البند لعام 2021",
            //     "type":"float",
            //     "display":"none"
            // },
            // {
            //     "InternalName": "Cost2",
            //     "DisplayNameEn": "Cost2",
            //     "DisplayName":"قيمة البند لعام 2022",
            //     "type":"float",
            //     "display":"none"
            // },
            // {
            //     "InternalName": "Cost3",
            //     "DisplayNameEn": "Cost3",
            //     "DisplayName":"قيمة البند لعام 2023",
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