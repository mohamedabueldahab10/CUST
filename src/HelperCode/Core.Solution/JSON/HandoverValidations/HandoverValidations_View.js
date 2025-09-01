var Information_Form  = [
    {
        label: 'Handover Validations Data',
        description: "Details",
        subFields: [
            {
                "InternalName": "Title",
                "DisplayName":"رمز وثيقة تسليم المشروع",
                "type":"string"
               
            },
            {
                "InternalName": "ValidationQuestion",
                "DisplayName":"عنصر المراجعة ",
                "type":"string"
            
            },
            {
                "InternalName": "Decision",
                "DisplayName":"القرار",
                "type":"dropdown",
                    options:{
                        choices:[
                            'نعم','لا'
                        ]
                    }
            },
            {
                "InternalName": "Comments",
                "DisplayName":"ملاحظات",
                "type":"multiline"
            }
        ]
    },
];