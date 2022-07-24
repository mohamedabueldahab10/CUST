var Information_Form  = [
    {
        label: 'Closure Validations Data',
        description: "Details",
        subFields: [
            {
                "InternalName": "Title",
                "DisplayName":"رمز وثيقة الاغلاق",
                "type":"string"
               
            },
            {
                "InternalName": "ValidationQuestion",
                "DisplayName":"عنصر المراجعة",
                "type":"string"
            
            },
            {
            "InternalName": "Decision",
            "DisplayName":"القرار",
            "type":"dropdown",
                options:{
                    choices:[
                        'نعم','لا','ليس بحاجة'
                    ]
                }
            },
            {
                "InternalName": "Comments",
                "DisplayName":"ملاحظات",
                "type":"multiline"
            },
        
        ]
    },
];