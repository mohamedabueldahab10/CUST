var Information_Form  = [
    {
        label: 'بيانات المراحل',
        description: "التفاصيل",
        subFields: [
            {
                "InternalName": "Title",
                "DisplayName":"المرحلة",
                "type":"string" ,
                "validation": "required"
            },
            {
                "InternalName": "ListSort",
                "DisplayName":"الترتيب",
                "type":"float"
            },
            {
                "InternalName": "Description",
                "DisplayName":"الوصف",
                "type":"multiline"
            }
        ]
    },
];