var Information_Form  = [
    {
        label: 'بيانات البرنامج',
      labelEn: 'Program Data',
      description: "التفاصيل",
      descriptionEn: "Details",
      subFields: [

            {
                "InternalName": "Name",
                "DisplayNameEn": "Name",
                "DisplayName":"اسم البرنامج",
                "type":"string",
                "maxchar": "250",
                // "validation": "required"
                
               
            },
            {
                "InternalName": "Initiative",
                "DisplayNameEn": "Initiative",
                "DisplayName":"المبادرة المرتبطة",
                "type": "lookup",
                //from other list:
                "source": "Initiatives",
                "Dispfieldkey": "Name",
                "valfieldkey": "Title"
               
            },
            {
                "InternalName": "Type",
                "DisplayNameEn": "Type",
                "DisplayName":"النوع",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'operationally', value: 'operationally' },
                        { display: 'transformationally', value: 'transformationally' },
                        { display: 'strategically', value: 'strategically' },
                    ]
                }
            },
    
            {
                "InternalName": "Description",
                "DisplayNameEn": "Description",
                "DisplayName":"الوصف",
                "type":"multiline",
                "maxchar": "500",
               
            }
        ]
    },
];