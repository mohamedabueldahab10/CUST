var Information_Form  = [
    {
        label: 'بيانات التسليم',
        labelEn:'Deliverie Data',
        description: "التفاصيل",
        descriptionEn:"Details",
        subFields: [
            {
                "InternalName": "Title",
                "DisplayName":"رمز التسليم",
                "DisplayNameEn": "Delivery Code",
                "type":"string"
            },
            {
                "InternalName": "Name",
                "DisplayName":"اسم التسليم",
                "DisplayNameEn": "Delivery Name",
                "type":"string"
            },
            {
                "InternalName": "PlannedDate",
                "DisplayName":"التاريخ المحدد",
                "DisplayNameEn": "Planned Date",
                "type":"datetime"
            },
            {
                "InternalName": "DeliveryDate",
                "DisplayName":"تاريخ التسليم",
                "DisplayNameEn": "Delivery Date",
                "type":"datetime"
               
            },
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
                "InternalName": "PercentageOfDelivery",
                "DisplayName":"نسبة التسليم",
                "DisplayNameEn": "Percentage Of Delivery",
                "type":"floatpercentage"
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
            // {
            //     "InternalName": "AccomplishmentDocuments",
            //     "DisplayName":"مستندات الإنجاز ووثائقه",
            //     "type":"multiline"
            // },
            {
                "InternalName": "Description",
                "DisplayName":"الوصف",
                "DisplayNameEn": "Description",
                "type":"multiline"
            }
        ]
    }
];