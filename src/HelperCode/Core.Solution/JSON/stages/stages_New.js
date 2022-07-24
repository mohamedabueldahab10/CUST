var Information_Form  = [
    {
        label: 'Project  Stages Data',
        description: "Details",
        subFields: [
            {
                "InternalName": "Title",
                "DisplayName":"المرحلة",
                "type":"string"
               
            },
            {
                "InternalName": "Stage",
                "DisplayName":"الخطوة",
                "type":"string"
            
            },
            {
                "InternalName": "ProjectCode",
                "DisplayName":"رمز المشروع",
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
                "DisplayName":"الملاحظات",
                "type":"multiline"
            }
        ]
    }
];