var Information_Form  = [
    {
        label: 'بيانات المهمة',
        labelEn:'Task Data',
        description: "التفاصيل",
        descriptionEn:"Details",
        subFields: [
            {
                "InternalName": "Name",
                "DisplayName":"عنوان المهمة",
                "DisplayNameEn": "Task Title",
                "type":"string",
                "validation": "required",
                "maxchar": 255
            },
            {
                "InternalName": "AssignedTo",
                "DisplayName":"مسندة إلى",
                "DisplayNameEn": "Assigned To",
                "type":"picker" ,
                "validation": "required"
            },
            {
                "InternalName": "Body",
                "DisplayName":"الوصف",
                "DisplayNameEn": "Description",
                "type":"multiline"
            },
            {
                "InternalName": "Priority",
                "DisplayName":"الأولوية",
                "DisplayNameEn": "Priority",
                "type":"dropdownValues",
                "validation": "required",
                options:{
                    choices:[
                        { display: 'hight', value: 'hight' },
                        { display: 'medium', value: 'medium' },
                        { display: 'low', value: 'low' }
                    ]
                }
            },
            {
                "InternalName": "DueDate",
                "DisplayName":"تاريخ الاستحقاق",
                "DisplayNameEn": "Due Date",
                "type":"datetime",
                "validation": "required"
            },
            {
                "InternalName": "getfile",
                "DisplayName":"المرفقات",
                "DisplayNameEn": "Attachments",
                "type":"file",
                "withAddBtn": "true"
            }
        ]
    },
];
