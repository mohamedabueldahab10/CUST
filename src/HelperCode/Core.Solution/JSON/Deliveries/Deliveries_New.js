var Information_Form  = [
    {
        label: 'بيانات التسليم',
        labelEn:'Deliverie Data',
        description: "التفاصيل",
        descriptionEn:"Details",
        subFields: [
            
            // {
            //     "InternalName": "Title",
            //     "DisplayName":"رمز التسليم",
            // "DisplayNameEn": "Delivery Title",
            //     "type":"string",
            //     "state":"disabled"
            // },
            {
                "InternalName": "Name",
                "DisplayName":"اسم التسليم",
                "DisplayNameEn": "Delivery Name",
                "type":"string",
                "validation": "required"
            },
            // {
            //     "InternalName": "PercentageOfDelivery",
            //     "DisplayName":"نسبة التسليم",            
            // "DisplayNameEn": "Percentage Of Delivery",

            //     "type":"percentage"
            // },
            {
                "InternalName": "PlannedDate",
                "DisplayName":"التاريخ المحدد",
                "DisplayNameEn": "Planned Date",
                "type":"datetime"
            },
            // {
            //     "InternalName": "DeliveryDate",
            //     "DisplayName":"تاريخ التسليم",
            // "DisplayNameEn": "Delivery Date",
            //     "type":"datetime"
               
            // },
            {
                "InternalName": "Deliverable",
                "DisplayName":"المخرج المرتبط",
                "DisplayNameEn": "Deliverable",
                "type": "lookup",
                //from other list:
                "source": "Deliverables",
                "Dispfieldkey": "Name",
                "valfieldkey": "Title"
            },
            {
                "InternalName": "Amount",
                "DisplayName":"المبلغ",
                "DisplayNameEn": "Amount",
                "type":"float"
            },
            {
                "InternalName": "Comments",
                "DisplayName":"ملاحظات",
                "DisplayNameEn": "Comments",
                "type":"multiline"
            },
            {
                "InternalName": "Description",
                "DisplayName":"الوصف",
                "DisplayNameEn": "Description",
                "type":"multiline"
            }
        ]
    },
    {
        label: 'المرفقات',
        labelEn:'Attachments',
        description: "",
        descriptionEn:"",
        subFields:[
            {
                "InternalName": "getfile",
                "DisplayName":"المرفقات",
                "DisplayNameEn": "Attachments",
                "type":"file",
                "withAddBtn":"true"
            }
        ]
    }
];