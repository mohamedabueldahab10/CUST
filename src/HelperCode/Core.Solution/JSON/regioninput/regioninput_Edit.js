var Information_Form  = [
    {
        label: 'ادخال المنطقة',
        description: "التفاصيل",
        subFields: [
            //  {
            //     "InternalName": "Title",
            //     "DisplayName":"رمز ادخال المنطقة",
            //     "type":"string",
            //     "state":"disabled"
            // },
            {
                "InternalName": "KPIInput",
                "DisplayName":"المؤشر التشغيلي",
                "type":"string",
                "validation": "required"
                
               
            },
            {
                "InternalName": "Region",
                "DisplayName":"المنطقة",
                "type": "lookup",
                 //from other list:
                 "source": "Regions",
                 "Dispfieldkey": "Title",   
                  "valfieldkey": "Title" 
                
            },
            {
                "InternalName": "Males",
                "DisplayName":"عدد الذكور",
                "type":"float",
                "validation": "required"
            
            },
            {
                "InternalName": "Females",
                "DisplayName":"عدد الإناث",
                "type":"float",
                "validation": "required"
               
            },
            {
                "InternalName": "Both",
                "DisplayName":"المجموع",
                "type":"float"
               
            }
        ]
    }
];