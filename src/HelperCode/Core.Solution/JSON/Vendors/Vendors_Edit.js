var Information_Form  = [
    {
        label: 'بيانات المتعهدون',
        labelEn: 'Vendors Data',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
            {
                "InternalName": "Title",
                "DisplayName":"رمز المنفذ",
                "DisplayNameEn":"Vendor Title",
                "type":"string",
                "validation": "required"
 
            },
            {
                "InternalName": "Name",
                "DisplayName":"اسم المتعهد",
                "DisplayNameEn":"Vendor Name",
                "type":"string",
                "validation": "required"
            
            },
            {
                "InternalName": "Description",
                "DisplayName":"الوصف",
                "DisplayNameEn":"Description",
                "type":"multiline"
            
            }
        ]
    },
    {
        label: 'الوثائق الداعمة',
        labelEn: 'Supporting Documents',
        description: "",
        descriptionEn: "",
        subFields:[
            {
                "InternalName": "getfile",
                "DisplayName":"المستندات",
                "DisplayNameEn":"Attachments",
                "type":"file",
                "withAddBtn":"true"
            }
        ]
    }
];