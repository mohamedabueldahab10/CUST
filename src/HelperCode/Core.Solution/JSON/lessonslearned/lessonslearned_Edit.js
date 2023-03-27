var Information_Form  = [
    {
        label: 'بيانات الدرس المستفاد',
        labelEn:'Lesson Learned Data',
        description: "التفاصيل",
        descriptionEn:"Details",
        subFields: [
            // {
            //     "InternalName": "ReferenceNumber",
            //     "DisplayName":"رقم المرجع",
            //     "DisplayNameEn": "Reference Number",
            //     "type":"string" ,
            //     "validation": "required"
            // },
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
                "validation": "required",
                options:{
                    choices:
                    [
                        { display: 'sector', value: 'sector' },
                        { display: 'epmo', value: 'epmo' }
                    ]
                }
            },
            {
                "InternalName": "Date",
                "DisplayName":"التاريخ",
                "DisplayNameEn": "Date",
                "type":"datetime",
                "validation": "required",
            },
            {
                "InternalName": "Description",
                "DisplayName":"الوصف",
                "DisplayNameEn": "Description",
                "type":"multiline",
                maxchar: 5000, 
            },
            {
                "InternalName": "FutureAdvice",
                "DisplayName":"نصيحة للمشاريع القادمة",
                "DisplayNameEn": "Future Advice",
                "type":"multiline",
                maxchar: 5000, 
            },
            {
                "InternalName": "DevelopmentAreas",
                "DisplayName":"مناطق التحسن في المشروع",
                "DisplayNameEn": "Development Areas",
                "type":"multiline",
                maxchar: 5000, 
            },
            {
                "InternalName": "StrengthAreas",
                "DisplayName":"مناطق القوة في المشروع",
                "DisplayNameEn": "Strength Areas",
                "type":"multiline",
                maxchar: 5000, 
               
            },
            {
                "InternalName": "AchievementsPlan",
                "DisplayName":"خطة الإنجازات",
                "DisplayNameEn": "Achievements Plan",
                "type":"multiline",
                maxchar: 5000, 
               
            },
            {
                "InternalName": "ProjectAchievements",
                "DisplayName":"إنجازات المشروع",
                "DisplayNameEn": "Project Achievements",
                "type":"multiline",
                maxchar: 5000, 
               
            },
            {
                "InternalName": "MajorCauses",
                "DisplayName":"الأسباب الرئيسية",
                "DisplayNameEn": "Major Causes",
                "type":"multiline",
                maxchar: 5000, 
               
            },
            {
                "InternalName": "Recommendation",
                "DisplayName":"التوصية",
                "DisplayNameEn": "Recommendation",
                "type":"multiline",
                maxchar: 5000, 
               
            },
            {
                "InternalName": "NextSteps",
                "DisplayName":"الخطوة القادمة",
                "DisplayNameEn": "Next Steps",
                "type":"multiline",
                maxchar: 5000, 
               
            }
        ]
    
    },
    {
        label: 'الوثائق الداعمة',
        labelEn:'Attachments',
        description: "",
        descriptionEn:"",
        subFields:[
            {
                "InternalName": "getfile",
                // "InternalName": "getfile",
                "DisplayName":"المرفقات",
                "DisplayNameEn": "Supporting Data",
                "type":"file",
                "withAddBtn":"true"
            }
        ]
    }
];
