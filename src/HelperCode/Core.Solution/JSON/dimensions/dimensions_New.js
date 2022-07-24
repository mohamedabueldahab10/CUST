var Information_Form  = [
    {
        label: 'بيانات البعد ',
        labelEn: ' Diminsion Data',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
            
            {
                "InternalName": "Title",
                "DisplayNameEn": "Title",
                "DisplayName":"رمز البعد",
                "type":"string",
                "maxchar": "250",
                "state":"disabled"
            },
            {
                "InternalName": "Dimension",
                "DisplayNameEn": "Dimension",
                "DisplayName":"الإسم",
                "type":"string",
                "maxchar": "250",
                "validation": "required"
            },
        ]
    },
    // {
    //     label: 'المرفقات',
    //     description: "",
    //     subFields:[
    //         {
    //             "InternalName": "getfile",
    //             "DisplayName":"المستندات",
    //             "type":"file"
    //         }
    //     ]
    // }
];