var Information_Form  = [
    {
        label: 'بيانات المهمة',
        labelEn:'Task Data',
        description: "التفاصيل",
        descriptionEn:"Details",
        subFields: [
            {
                "InternalName": "Title",
                "DisplayName":"رمز المهمة",
                "DisplayNameEn": "Task Code",
                "type":"string"
            },
            {
                "InternalName": "Name",
                "DisplayName":"عنوان المهمة",
                "DisplayNameEn": "Task Title",
                "type":"string"
            },
            {
                "InternalName": "AssignedTo",
                "DisplayName":"مسندة إلى",
                "DisplayNameEn": "Assigned To",
                "type":"picker"
            },
            {
                "InternalName": "Author",
                "DisplayName":"منشئ المهمة",
                "DisplayNameEn": "Created By",
                "type":"picker"
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
                "type":"datetime"
            },
            {
                "InternalName": "Status",
                "DisplayName":"الحالة",
                "DisplayNameEn": "Status",
                "type":"dropdownValues",
                options:{
                    choices:[
                        { display: 'open', value: 'Open' },
                        { display: 'closed', value: 'Closed' },
                        { display: 'cancelled3', value: 'cancelled3' },
                        { display: 'pending3', value: 'pending3' },
                        { display: 'inprogress', value: 'inprogress' },
                        { display: 'notstarted1', value: 'notstarted1' },
                        { display: 'completed3', value: 'completed3' }
                    ]
                }
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
