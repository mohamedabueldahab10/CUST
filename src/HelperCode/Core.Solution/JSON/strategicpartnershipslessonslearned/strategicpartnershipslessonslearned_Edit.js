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
                type: 'datetimetoparent',
                listname: 'Strategic Partnerships', // Displan name of list
                startinternalname: 'StartDate', // internalname of parent start
                endinternalname: 'FinishDate',
            },
            {
                "InternalName": "Description",
                "DisplayName":"الوصف",
                "DisplayNameEn": "Description",
                "type":"multiline",
                maxchar: 5000, 
                "validation": "required",
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
                descPhraseEn: "max length of letters equal 5000", 
            },
            {
                "InternalName": "FutureAdvice",
                "DisplayName":"نصيحة للشراكات القادمة",
                "DisplayNameEn": "Future Advice",
                "type":"multiline",
                maxchar: 5000, 
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
                descPhraseEn: "max length of letters equal 5000", 
            },
            {
                "InternalName": "DevelopmentAreas",
                "DisplayName":"مناطق التحسن ",
                "DisplayNameEn": "Development Areas",
                "type":"multiline",
                maxchar: 5000, 
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
                descPhraseEn: "max length of letters equal 5000", 
            },
            {
                "InternalName": "StrengthAreas",
                "DisplayName":"مناطق القوة في الشراكة",
                "DisplayNameEn": "Strength Areas",
                "type":"multiline",
                maxchar: 5000, 
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
                descPhraseEn: "max length of letters equal 5000", 
               
            },
            {
                "InternalName": "AchievementsPlan",
                "DisplayName":"خطة الإنجازات",
                "DisplayNameEn": "Achievements Plan",
                "type":"multiline",
                maxchar: 5000, 
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
                descPhraseEn: "max length of letters equal 5000", 
               
            },
            {
                "InternalName": "ProjectAchievements",
                "DisplayName":"إنجازات الشراكة",
                "DisplayNameEn": "Achievements",
                "type":"multiline",
                maxchar: 5000, 
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
                descPhraseEn: "max length of letters equal 5000", 
               
            },
            {
                "InternalName": "MajorCauses",
                "DisplayName":"الأسباب الرئيسية",
                "DisplayNameEn": "Major Causes",
                "type":"multiline",
                maxchar: 5000, 
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
                descPhraseEn: "max length of letters equal 5000", 
               
            },
            {
                "InternalName": "Recommendation",
                "DisplayName":"التوصية",
                "DisplayNameEn": "Recommendation",
                "type":"multiline",
                maxchar: 5000,
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
                descPhraseEn: "max length of letters equal 5000",  
               
            },
            {
                "InternalName": "NextSteps",
                "DisplayName":"الخطوة القادمة",
                "DisplayNameEn": "Next Steps",
                "type":"multiline",
                maxchar: 5000, 
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
                descPhraseEn: "max length of letters equal 5000", 
               
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
                // "withAddBtn":"true"
            }
        ]
    }
];
