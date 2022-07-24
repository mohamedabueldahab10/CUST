var Information_Form  = [
    {
        label: 'ادخال المنطقة',
        description: "التفاصيل",
        subFields: [
             {
                "InternalName": "Title",
                "DisplayName":"رمز ادخال المنطقة",
                "type":"string"
            },
            {
                "InternalName": "KPIInput",
                "DisplayName":"المؤشر التشغيلي",
                "type":"string"
                
               
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
                "type":"float"
            
            },
            {
                "InternalName": "Females",
                "DisplayName":"عدد الإناث",
                "type":"float"
               
            },
            {
                "InternalName": "Both",
                "DisplayName":"المجموع",
                "type":"float"
               
            }
        ]
    }
];