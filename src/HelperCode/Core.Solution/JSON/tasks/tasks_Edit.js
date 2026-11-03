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
                "state":"disabled"
            },
            {
                "InternalName": "AssignedTo",
                "DisplayName":"مسندة إلى",
                "DisplayNameEn": "Assigned To",
                "type":"picker",
                "state":"disabled"
            },
            {
                "InternalName": "Author",
                "DisplayName":"منشئ المهمة",
                "DisplayNameEn": "Created By",
                "type":"picker",
                "state":"disabled"
            },
            {
                "InternalName": "Body",
                "DisplayName":"الوصف",
                "DisplayNameEn": "Description",
                "type":"multiline",
                "state":"disabled"
            },
            {
                "InternalName": "Priority",
                "DisplayName":"الأولوية",
                "DisplayNameEn": "Priority",
                "type":"dropdownValues",
                "state":"disabled",
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
                "state":"disabled"
            },
            {
                "InternalName": "Status",
                "DisplayName":"الحالة",
                "DisplayNameEn": "Status",
                "type":"dropdownValues",
                "validation": "required",
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
