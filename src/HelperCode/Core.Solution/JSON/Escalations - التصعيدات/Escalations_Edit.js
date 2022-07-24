var Information_Form  = [
    {
        label: 'Escalations Data',
        description: "Details",
        subFields: [
            {
                "InternalName": "Description",
                "DisplayName":"الوصف",
                "type":"multiline"
               
            },
            {
                "InternalName": "RelatedItemID",
                "DisplayName":"كود العنصر المرتبط",
                "type":"string"
            
            },
            {
                "InternalName": "Source",
                "DisplayName":"المصدر",
                "type":"dropdown",
                options:{
                    choices:[
                        'المشكلة - الخطر','المهمة'
                    ]
                }
            },
            {
                "InternalName": "Status",
                "DisplayName":"الحالة",
                "type":"string"
    
            },
            {
                "InternalName": "Support",
                "DisplayName":"الدعم المطلوب",
                "type":"multiline"
    
            },
            {
                "InternalName": "Title",
                "DisplayName":"رمز الدعم",
                "type":"string"
    
            }
        ]
    },
];