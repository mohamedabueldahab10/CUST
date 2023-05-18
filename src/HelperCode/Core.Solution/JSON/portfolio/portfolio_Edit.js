var Information_Form = [{
    label: 'بيانات المحفظة',
    labelEn: 'Portfolio Data',
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [{
            "InternalName": "Name",
            "DisplayName": "إسم المحفظة باللغة العربية",
            "DisplayNameEn": "Portfolio Name (Arabic)",
            "type": "string",
            "validation": "required",
            "Errmsgkey":"arnamepattern",
            maxchar: '255',
            descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
            descPhraseEn: "max length of letters equal 255", 
        },
        {
            "InternalName": "NameEn",
            "DisplayName": "إسم المحفظة باللغة الانجليزية",
            "DisplayNameEn": "Portfolio Name (English)",
            "type": "string",
            "validation": "required",
            "Errmsgkey":"ennamepattern",
            maxchar: '255',
            descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
            descPhraseEn: "max length of letters equal 255", 
        },
        {
            "InternalName": "Description",
            "DisplayName": "الوصف",
            "DisplayNameEn": "Description",
            "type": "multiline",
            "maxchar": 5000,
            descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
            descPhraseEn: "max length of letters equal 5000", 

        },
        {
            "InternalName": "Manager",
            "DisplayName": "مدير المحفظة",
            "DisplayNameEn": "Portfolio Manager",
            "type": "picker",
            "validation": "required"
        },
        {
            "InternalName": "Owner",
            "DisplayName": "مالك المحفظة",
            "DisplayNameEn": "Portfolio Owner",
            "type": "picker",
            "validation": "required"


        }
        // {
        //     "InternalName": "Title",
        //     "DisplayName":"رمز المحفظة",
        //     "DisplayNameEn":"Portfolio Code",
        //     "type":"string"
        // }
    ]
}, ];