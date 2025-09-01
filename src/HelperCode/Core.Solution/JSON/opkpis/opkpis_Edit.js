
    var Information_Form  = [
        {
             label: 'المؤشرات التشغيلية',
          labelEn: 'Objective KPI Data',
          description: "التفاصيل",
          descriptionEn: "Details",
          subFields: [
            // {
            //     "InternalName": "Title",
            //     "DisplayName":"رمز مؤشر قياس الأداء",
            //     "type":"string",
                
                
            // },
            
            {
                "InternalName": "PeriodType",
                "DisplayNameEn": "Period Type",
                "DisplayName": "تكرار القياس",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'quarter', value: 'quarter' },
                        { display: 'monthly', value: 'monthly' },
                        { display: 'yearly', value: 'yearly' },
                    ]
                }
              },
            {
                "InternalName": "ResultType",
                "DisplayNameEn": "Result Type",
                "DisplayName": "وحدة القياس",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'number', value: 'number' },
                        { display: 'percentage', value: 'percentage' },
                    ]
                }
              },
            {
                "InternalName": "RelatedObjective",
                "DisplayNameEn": "Related Objective",
                "DisplayName":"الهدف",
                "type":"string"
            },
            
            {
                "InternalName": "Description",
                "DisplayNameEn": "Description",
                "DisplayName":"الوصف",
                "type":"multiline"
            }
           
        ]
    },
];