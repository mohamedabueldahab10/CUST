var Information_Form  = [
    {
        label: 'S. KPI Target  Data',
        description: "التفاصيل",
        subFields: [
            {
                "InternalName": "StrategicKPI",
                "DisplayName":"الاستراتيجية",
                "type":"string",
                "validation": "required"
            },
            {
                "InternalName": "StrategicObjective",
                "DisplayName":"الهدف الاستراتيجي",
                "type":"string",
                "validation": "required"
            },
            
            {
            "InternalName": "HasGovernmentVision",
            "DisplayName":"لديها رؤية حكومية",
            "type":"dropdown",
                options:{
                    choices:[
                        'نعم','لا'
                    ]
                }
            },
            {
                "InternalName": "KPI",
                "DisplayName":"KPI",
                "type":"string"
            },
            {
                "InternalName": "Result",
                "DisplayName":"النتيجة",
                "type":"float"
   
            },
            {
                "InternalName": "From",
                "DisplayName":"من",
                "type":"datetime" 
            },
            {
                "InternalName": "To",
                "DisplayName":"الى",
                "type":"datetime" 
            }
            
        ]
    }
];