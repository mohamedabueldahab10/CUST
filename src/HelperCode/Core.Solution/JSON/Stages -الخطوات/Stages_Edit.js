var Information_Form  = [
    {
        label: 'Stages Data',
        description: "Details",
        subFields: [
            {
                "InternalName": "Title",
                "DisplayName":"العنوان",
                "type":"string"
            
            },
            {
                "InternalName": "Description",
                "DisplayName":"الوصف",
                "type":"multiline"
               
            },
           
            {
                "InternalName": "RelatedPhase",
                "DisplayName":"المرحلة",
                "type":"string"
            },
            {
                "InternalName": "RelatedURL",
                "DisplayName":"الرابط",
                "type":"string"
            },
            {
                "InternalName": "Active",
                "DisplayName":"نشط",
                "type":"dropdown",
                options:{
                    choices:[
                        'لا','نعم'
                    ]
                }
            },
            {
                "InternalName": "ListSort",
                "DisplayName":"الترتيب",
                "type":"float"
               
            },
           
            {
                "InternalName": "PhaseGate",
                "DisplayName":"تطبيق أمتثال ؟",
                "type":"dropdown",
                options:{
                    choices:[
                        'لا','نعم'
                    ]
                }
            }
        ]
    },
];