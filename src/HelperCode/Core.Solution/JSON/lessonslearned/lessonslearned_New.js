var Information_Form  = [
    {
        label: 'بيانات الدرس المستفاد',
        labelEn:'Lesson Learned Data',
        description: "التفاصيل",
        descriptionEn:"Details",
        subFields: [
            {
                "InternalName": "ReferenceNumber",
                "DisplayName":"رقم المرجع",
                "DisplayNameEn": "Reference Number",
                "type":"string" ,
                "validation": "required"
            },
            // {
            //     "InternalName": "Title",
            //     "DisplayName":"رمز الدرس المستفاد",
            // "DisplayNameEn": "Lesson Learned Title",
            //     "type":"string",
            //     "validation": "required"
            // },
            {
                "InternalName": "Source",
                "DisplayName":"المصدر",
                "DisplayNameEn": "Source",
                "type":"dropdownValues",
                options:{
                    choices:
                    [
                        { display: 'sector', value: 'sector' },
                        { display: 'pmo', value: 'pmo' }
                    ]
                }
            },
            {
                "InternalName": "Date",
                "DisplayName":"التاريخ",
                "DisplayNameEn": "Date",
                "type":"datetime"
            },
            {
                "InternalName": "Description",
                "DisplayName":"الوصف",
                "DisplayNameEn": "Description",
                "type":"multiline"
            },
            {
                "InternalName": "FutureAdvice",
                "DisplayName":"نصيحة للمشاريع القادمة",
                "DisplayNameEn": "Future Advice",
                "type":"multiline"
            },
            {
                "InternalName": "DevelopmentAreas",
                "DisplayName":"مناطق التحسن في المشروع",
                "DisplayNameEn": "Development Areas",
                "type":"multiline"
            },
            {
                "InternalName": "StrengthAreas",
                "DisplayName":"مناطق القوة في المشروع",
                "DisplayNameEn": "Strength Areas",
                "type":"multiline"
               
            },
            {
                "InternalName": "AchievementsPlan",
                "DisplayName":"خطة الإنجازات",
                "DisplayNameEn": "Achievements Plan",
                "type":"multiline"
               
            },
            {
                "InternalName": "ProjectAchievements",
                "DisplayName":"إنجازات المشروع",
                "DisplayNameEn": "Project Achievements",
                "type":"multiline"
               
            },
            {
                "InternalName": "MajorCauses",
                "DisplayName":"الأسباب الرئيسية",
                "DisplayNameEn": "Major Causes",
                "type":"multiline"
               
            },
            {
                "InternalName": "Recommendation",
                "DisplayName":"التوصية",
                "DisplayNameEn": "Recommendation",
                "type":"multiline"
               
            },
            {
                "InternalName": "NextSteps",
                "DisplayName":"الخطوة القادمة",
                "DisplayNameEn": "Next Steps",
                "type":"multiline"
               
            }
        ]
    
    },
    {
        label: 'المرفقات',
        labelEn:'Attachments',
        description: "",
        descriptionEn:"",
        subFields:[
            {
                "InternalName": "getfile",
                "DisplayName":"المرفقات",
                "DisplayNameEn": "Attachments",
                "type":"file",
            "withAddBtn":"true"
            }
        ]
    }
];