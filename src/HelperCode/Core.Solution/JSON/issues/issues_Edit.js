var Information_Form = [{
        label: 'التحديات',
        labelEn: 'Issues Data',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
            // {
            //     "InternalName": "Title",
            //     "DisplayName":"رمز التحدي",
            //     "type":"string",
            //     "validation": "required"
            // },
            {
                "InternalName": "Name",
                "DisplayName": "اسم التحدي",
                "DisplayNameEn": "Issue Name",
                "type": "string",
                "validation": "required"
            },
            {
                "InternalName": "Category",
                "DisplayName": "فئة التحدي",
                "DisplayNameEn": "Category",
                "type": "dropdownValues",
                options: {
                    choices: [

                        {
                            display: 'financial',
                            value: 'financial'
                        },
                        {
                            display: 'legal',
                            value: 'legal'
                        },
                        {
                            display: 'contractual',
                            value: 'contractual'
                        }
                    ]
                }
            },
            {
                "InternalName": "Priority",
                "DisplayName": "الأولوية",
                "DisplayNameEn": "Priority",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'critical', value: 'critical' },
                        { display: 'hight', value: 'hight' },
                        { display: 'medium', value: 'medium' },
                        { display: 'low', value: 'low' }
                    ]
                }
            },
            {
                "InternalName": "ResolutionStatus",
                "DisplayName": "الحالة",
                "DisplayNameEn": "Resolution Status",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'new', value: 'new' },
                        { display: 'inprogress', value: 'inprogress' },
                        { display: 'closed', value: 'closed' },
                        { display: 'cancelled', value: 'cancelled' },
                    ]
                }
            },
            // {
            //     "InternalName": "Status",
            //     "DisplayName":"الحالة الكلية للتحدي",
            //     "type":"dropdown",
            //     options:{
            //         choices:[
            //             'مغلق',' مفتوح'
            //         ]
            //     }
            // },
            {
                "InternalName": "Owner",
                "DisplayName": "مالك التحدي",
                "DisplayNameEn": "Owner",
                "type": "picker"
            },
            {
                "InternalName": "AssignedTo",
                "DisplayName": "مسندة إلى الشخص المسؤول ",
                "DisplayNameEn": "Assigned To",
                "type": "picker"
            },
            {
                "InternalName": "DateRaised",
                "DisplayName": "تاريخ تحديد التحدي",
                "DisplayNameEn": "Date Raised",
                "type": "datetime",
                "max": "IssueClosureDate"
            },
            {
                "InternalName": "ResolutionTargetDate",
                "DisplayName": "التاريخ المتوقع للحل",
                "DisplayNameEn": "Resolution Target Date",
                "type": "datetime"
            },
            {
                "InternalName": "ResolutionActualDate",
                "DisplayName": "التاريخ الفعلي للحل",
                "DisplayNameEn": "Resolution Actual Date",
                "type": "datetime",
                "max":"today"
            },
            // {
            //     "InternalName": "DueDate",
            //     "DisplayName": "تاريخ الإستحقاق",
            //     "DisplayNameEn": "Due Date",
            //     "type": "datetime"
            // },
            {
                "InternalName": "IssueClosureDate",
                "DisplayName": "تاريخ اغلاق التحدي",
                "DisplayNameEn": "Issue Closure Date",
                "type": "datetime",
                "min": "DateRaised"
            },


            {
                "InternalName": "Impact",
                "DisplayName": "الأثر",
                "DisplayNameEn": "Impact",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'hight', value: 'hight' },
                        { display: 'medium', value: 'medium' },
                        { display: 'low', value: 'low' },
                    ]
                }
            },
            {
                "InternalName": "ResolutionOwner",
                "DisplayName": "المسؤول عن الحل",
                "DisplayNameEn": "Resolution Owner",
                "type": "picker"
            },
            {
                "InternalName": "ImpactDescription",
                "DisplayName": "وصف الأثر",
                "DisplayNameEn": "Impact Description",
                "type": "multiline",
                "maxchar": 5000,
            },
            {
                "InternalName": "Description",
                "DisplayName": "وصف التحدي",
                "DisplayNameEn": "Description",
                "type": "multiline",
                "maxchar": 5000,
            },
            {
                "InternalName": "Resolution",
                "DisplayName": "وصف الحل",
                "DisplayNameEn": "Resolution",
                "type": "multiline",
                "maxchar": 5000,
            },
            {
                "InternalName": "Comments",
                "DisplayName": "الملاحظات",
                "DisplayNameEn": "Comments",
                "type": "multiline",
                "maxchar": 5000,
            },
            // {
            //     "InternalName": "Type",
            //     "DisplayName": "نوع التحدي",
            //     "DisplayNameEn": "Type",
            //     "type": "dropdownValues",
            //     options: {
            //         choices: [{
            //                 display: 'issue',
            //                 value: 'issue'
            //             },
            //             {
            //                 display: 'risk',
            //                 value: 'risk'
            //             },
            //             {
            //                 display: 'newrequest',
            //                 value: 'newrequest'
            //             }
            //         ]
            //     }
            // },
            {
                "InternalName": "RaisedBy",
                "DisplayName": "مرفوع بواسطة",
                "DisplayNameEn": "Reported By",
                "type": "picker"
            }

        ]
    },
    {
        label: 'المرفقات',
        labelEn: 'Attachments',
        description: "",
        descriptionEn: "",
        subFields: [{
            "InternalName": "getfile",
            "DisplayName": "المرفقات",
            "DisplayNameEn": "Attachments",
            "type": "file",
            "withAddBtn":"true"
        }]
    }
];