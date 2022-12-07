var Information_Form = [{
        label: 'بيانات طلب التغيير',
        labelEn: 'Change Request Data',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
            {
                "InternalName": "Title",
                "DisplayName":"رمز طلب التغيير",
                "DisplayNameEn": 'Title',
                "type":"string",
                // "validation": "required"
            },
            {
                "InternalName": "WorkflowName",
                "DisplayName": "اسم الإجراء",
                "DisplayNameEn": "Workflow Name",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'crobjective', value: 'crobjective' },
                        { display: 'crkpi', value: 'crkpi', selected: 'selected' },
                        { display: 'crbenefit', value: 'crbenefit' },
                        { display: 'crinitiative', value: 'crinitiative' },
                        { display: 'crproject', value: 'crproject' },
                        { display: 'crnproject', value: 'crnproject' },
                        { display: 'crmilestone', value: 'crmilestone' },
                        { display: 'crdeliverable', value: 'crdeliverable' }
                    ]
                }
            },
            // {
            //     "InternalName": "Requester",
            //     "DisplayName": "مقدم الطلب",
            //     "DisplayNameEn": "Requester",
            //     "type": "picker",
            //     "validation": "required"
            // // },
            // {
            //     "InternalName": "RequestDate",
            //     "DisplayName": "تاريخ الطلب",
            //     "DisplayNameEn": "Request Date",
            //     "type": "datetime"
            // },
            // {
            //     "InternalName": "Priority",
            //     "DisplayName": "الأولوية",
            //     "DisplayNameEn": "Priority",
            //     "type": "dropdownValues",
            //     options: {
            //         choices: [
            //             { display: 'hight', value: 'hight' },
            //             { display: 'medium', value: 'medium' },
            //             { display: 'low', value: 'low' },
            //         ]
            //     }
            // },
            // {
            //     "InternalName": "ImpactOftheChange",
            //     "DisplayName": "أثر التغيير",
            //     "DisplayNameEn": "Impact of the Change",
            //     "type": "multiline",
            //     "maxchar": 5000
            // },
            {
                "InternalName": "Description",
                "DisplayName": "الوصف",
                "DisplayNameEn": "Description",
                "type": "multiline",
                "maxchar": 5000
            },
            {
                "InternalName": "Status",
                "DisplayName": "الحالة",
                "DisplayNameEn": "Status",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'open', value: 'open', selected: 'selected' },
                        { display: 'approved', value: 'approved' },
                        { display: 'rejected', value: 'rejected' },
                    ]
                }
            },
            // {
            //     "InternalName": "ChangeJustifications0",
            //     "DisplayName": "مبررات التغيير",
            //     "DisplayNameEn": "Change Justifications",
            //     "type": "multiline",
            //     "maxchar": 5000
            // },
            // {
            //     "InternalName": "SubmitForApproval",
            //     "DisplayName": "ارسال للموافقة",
            //     "DisplayNameEn": "Submit For Approval",
            //     "type": "dropdownValues",
            //     options: {
            //         choices: [
            //             { display: 'yes', value: 'yes' },
            //             { display: 'no', value: 'no' }
            //         ]
            //     }
            // },
            // {
            //     "InternalName": "ImpactOn",
            //     "DisplayName": "مجال التغيير",
            //     "DisplayNameEn": "Impact On",
            //     "type": "dropdownValues",
            //     options: {
            //         choices: [
            //             { display: 'budget', value: 'budget' },
            //             { display: 'scopeofwork', value: 'scopeofwork' },
            //             { display: 'others', value: 'others' }
            //         ]
            //     }
            // },
            // {
            //     "InternalName": "ImpactOnScope",
            //     "DisplayName": "التأثير على المشروع (نطاق العمل)",
            //     "DisplayNameEn": "Impact on Project Scope",
            //     "type": "multiline",
            //     "maxchar": 5000
            // },
            // {
            //     "InternalName": "ImpactOnDuration",
            //     "DisplayName": "التأثير على المشروع (مدة المشروع)",
            //     "DisplayNameEn": "Impact on Project Duration",
            //     "type": "dropdownValues",
            //     options: {
            //         choices: [
            //             { display: 'contractstartdate', value: 'contractstartdate' },
            //             { display: 'contractenddate', value: 'contractenddate' },
            //             { display: 'extensionperiod', value: 'extensionperiod' },
            //             { display: 'contractperiodbeforeamendment', value: 'contractperiodbeforeamendment' },
            //             { display: 'contracttermafteramendment', value: 'contracttermafteramendment' },
            //         ]
            //     }
            // },
            // {
            //     "InternalName": "ImpactOnCost",
            //     "DisplayName": "التأثير على المشروع (التكلفة)",
            //     "DisplayNameEn": "Impact on Project Cost",
            //     "type": "dropdownValues",
            //     options: {
            //         choices: [
            //             { display: 'originalcontractvalue', value: 'originalcontractvalue' },
            //             { display: 'canceledstages', value: 'canceledstages' },
            //             { display: 'increasepercentage', value: 'increasepercentage' },
            //             { display: 'finalcontractvalue', value: 'finalcontractvalue' }
            //         ]
            //     }
            // },
            // {
            //     "InternalName": "OtherImpact",
            //     "DisplayName": "التأثير على المشروع (أخرى)",
            //     "DisplayNameEn": "Impact on Project (Other)",
            //     "type": "multiline",
            //     "maxchar": 5000
            // },
            // {
            //     "InternalName": "ImpactIfNoChange",
            //     "DisplayName": "الآثار المترتبة في حال عدم قيام التغيير",
            //     "DisplayNameEn": "Impact of not applying the change",
            //     "type": "multiline",
            //     "maxchar": 5000
            // },
            // {
            //     "InternalName": "ChangeImplementedOn",
            //     "DisplayName": "تم تنفيذ التغيير في",
            //     "DisplayNameEn": "Change Implemented On",
            //     "type": "datetime"
            // },
            // {
            //     "InternalName": "ChangeImplementedBy",
            //     "DisplayName": "تم تنفيذ التغيير بواسطة",
            //     "DisplayNameEn": "Change Implemented By",
            //     "type": "picker"
            // },
            // {
            //     "InternalName": "AssignedTo",
            //     "DisplayName": "مخصص إلى",
            //     "DisplayNameEn": "Assigned To",
            //     "type": "picker"
            // },
            // {
            //     "InternalName": "DateResolved",
            //     "DisplayName": "تاريخ تنفيذ الحل",
            //     "DisplayNameEn": "Date Resolved",
            //     "type": "datetime"
            // },
            // {
            //     "InternalName": "RequestStatus",
            //     "DisplayName": "حالة الطلب",
            //     "DisplayNameEn": "Request Status",
            //     "type": "dropdownValues",
            //     options: {
            //         choices: [{
            //                 display: 'submitted',
            //                 value: 'submitted'
            //             },
            //             {
            //                 display: 'approved',
            //                 value: 'approved'
            //             },
            //             {
            //                 display: 'rejected',
            //                 value: 'rejected'
            //             },
            //             {
            //                 display: 'deferred',
            //                 value: 'deferred'
            //             }
            //         ]
            //     }
            // },
            // {
            //     "InternalName": "ResolutionComments",
            //     "DisplayName": "تعليقات حول القرار",
            //     "DisplayNameEn": "Resolution Comments",
            //     "type": "multiline",
            //     "maxchar": 5000
            // }

        ]
    },
    {
        label: 'المرفقات',
        labelEn: 'Attachments',
        description: "",
        descriptionEn: "",
        subFields: [{
            // "InternalName": "getfile",
            "InternalName": "Attachments",
            "DisplayName": "المرفقات",
            "DisplayNameEn": "Attachments",
            "type": "file",
            "withAddBtn":"true"
        }]
    }
];