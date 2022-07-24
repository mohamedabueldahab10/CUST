var Information_Form  = [
    {
        label: 'ادخال المؤشرات',
        description: "التفاصيل",
        subFields: [
            // {
            //     "InternalName": "Title",
            //     "DisplayName":"رمز ادخال المؤشر",
            //     "type":"string",
            //     "state":"disabled"
               
            // },
            {
                "InternalName": "KPI",
                "DisplayName":"المؤشر التنفيذي المرتبط",
                "type":"string",
                "validation": "required"
                
               
            },
            {
                "InternalName": "Instrument",
                "DisplayName":"رمز الأداة",
                "type": "lookup",
                //from other list:
                "source": "Instruments",
                "Dispfieldkey": "Title",
                "valfieldkey": "Title"
                
               
            },
            {
                "InternalName": "From",
                "DisplayName":"من",
                "type":"datetime",
                "max": "To"
                
            },
            {
                "InternalName": "To",
                "DisplayName":"الى",
                "type":"datetime",
                "min": "From"
            
            },
            {
                "InternalName": "TargetResult",
                "DisplayName":"النتيجة المستهدفة",
                "type":"float"
               
            },
            {
                "InternalName": "ActualValue",
                "DisplayName":"القيمة الفعلية",
                "type":"float"
               
            }
        ]
    }
];