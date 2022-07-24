var Information_Form  = [
    {
        label: 'Project Archiving Docs Data',
        description: "Details",
        subFields: [
            {
                "InternalName": "Title",
                "DisplayName":"الاسم",
                "type":"string"
               
            },
            {
                "InternalName": "ProjectCode",
                "DisplayName":"رمز المشروع",
                "type":"string"
            
            },
            {
                "InternalName": "Description",
                "DisplayName":"الوصف",
                "type":"multiline"
           
            },
            {
                "InternalName": "RelatedDocument1",
                "DisplayName":"وثيقة ذات صلة",
                "type":"dropdown",
                options:{
                    choices:[
                        'Yes','No'
                    ]
                }
            },
            {
                "InternalName": "RelatedDocument2",
                "DisplayName":"وثيقة ذات صلة",
                "type":"dropdown",
                options:{
                    choices:[
                        'Yes','No'
                    ]
                }
            }
        ]
    },
];