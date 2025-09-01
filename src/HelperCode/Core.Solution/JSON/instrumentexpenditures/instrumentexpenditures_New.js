var Information_Form  = [
    {
        label: 'نفقات الأدوات',
      labelEn: 'Instrument Expenditure Data',
      description: "التفاصيل",
      descriptionEn: "Details",
      subFields: [
            // {
            //     "InternalName": "Title",
            //     "DisplayName":"رمز الأداة ",
            //     "type":"string" ,
            //     "state":"disabled"
            
            // },
            {
                "InternalName": "Name",
                "DisplayNameEn": "Name",
                "DisplayName":"اسم الأداة",
                "type":"string",
                "validation": "required"
                
            },
            {
                "InternalName": "InstrumentBudgetItem",
                "DisplayNameEn": "Instrument Budget Item",
                "DisplayName":"رمز البند المرتبط بالأداة",
                "type": "lookup",
                //from other list:
                "source": "Budget Items",
                "Dispfieldkey": "Title",
                "valfieldkey": "Title",
                
            },
            {
                "InternalName": "Amount",
                "DisplayNameEn": "Amount",
                "DisplayName":"القيمة",
                "type":"float"
            
            },
            {
                "InternalName": "Date",
                "DisplayNameEn": "Date",
                "DisplayName":"التاريخ",
                "type":"datetime"
                
            },
            
        ]
    }
];