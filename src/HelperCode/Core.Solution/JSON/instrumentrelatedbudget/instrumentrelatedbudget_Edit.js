var Information_Form  = [
    {
         label: 'أداة الميزانية المرتبطة',
      labelEn: 'Instrument related budget Data',
      description: "التفاصيل",
      descriptionEn: "Details",
      subFields: [

        //    {
        //         "InternalName": "Title",
        //         "DisplayName":"الرمز المرتبط",
        //         "type":"string",
        //         "state":"disabled"
        //     },
            {
                "InternalName": "Instrument",
                "DisplayNameEn": "Instrument",
                "DisplayName":"رمز الأداة",
                "type": "lookup",
                //from other list:
                "source": "Instruments",
                "Dispfieldkey": "Title",
                "valfieldkey": "Title",
                "validation": "required"
                
               
            },
            {
                "InternalName": "BudgetItem",
                "DisplayNameEn": "BudgetItem",
                "DisplayName":"رمز البند المرتبط",
                "type": "lookup",
                //from other list:
                "source": "Budget Items",
                "Dispfieldkey": "Title",
                "valfieldkey": "Title",
                "validation": "required"
                
            },
            {
                "InternalName": "Amount",
                "DisplayNameEn": "Amount",
                "DisplayName":"القيمة",
                "type":"float"
                
               
            },
            {
                "InternalName": "Cash",
                "DisplayNameEn": "Cash",
                "DisplayName":"نقدا",
                "type":"float"
               
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