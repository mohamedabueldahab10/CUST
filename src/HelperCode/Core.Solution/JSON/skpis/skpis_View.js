var Information_Form  = [
    {
        label: 'المؤشرات الاستراتيجية',
        description: "التفاصيل",
        subFields: [
            
            {
                "InternalName": "Title",
                "DisplayName":"رمز المؤشر",
                "type":"string" 
            },
            {
                "InternalName": "Name",
                "DisplayName":"اسم المؤشر",
                "type":"string" 
            },
            {
                "InternalName": "Weight",
                "DisplayName":"القيمة / الوزن",
                "type":"floatpercentage"
            },
            {
                "InternalName": "Owner",
                "DisplayName":"المالك",
                "type":"picker" 
            },
            {
                "InternalName": "Calculation",
                "DisplayName":"عملية حسابية",
                "type":"dropdown",
                options:{
                    choices:[
                        'آخر','متوسط', 'مجموع'
                    ]
                }
            },
            {
                "InternalName": "PeriodType",
                "DisplayName":"المدة الزمنية",
                "type":"dropdown",
                options:{
                    choices:[
                        'فصلي','اسبوعي','شهري','سنوي'
                    ]
                }
            },
            {
                "InternalName": "ResultType",
                "DisplayName":"نوع النتيجة",
                "type":"dropdown",
                options:{
                    choices:[
                        'رقم','النسبة المئوية','العملة '
                    ]
                }
           
            },
            // {
            //     "InternalName": "RelatedObjective",
            //     "DisplayName":"الهدف الاستراتيجي",
            //     "type":"string"
            // },
            {
                "InternalName": "HasGovernmentVision",
                "DisplayName":"لديها رؤية حكومية",
                "type":"radio",
                options:{
                    choices:[
                        'نعم','لا'
                    ]
                }
            },
            {
                "InternalName": "Description",
                "DisplayName":"الوصف",
                "type":"multiline"
            },
           
        ]
    },
];