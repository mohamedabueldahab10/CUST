var Information_Form = [{
    label: 'بيانات المحفظة',
    labelEn: 'Portfolio Data',
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [{
            "InternalName": "Name",
            "DisplayName": "إسم المحفظة باللغة العربية",
            "DisplayNameEn": "Portfolio Name (Arabic)",
            "type": "string"
        },
        {
            "InternalName": "NameEn",
            "DisplayName": "إسم المحفظة باللغة الانجليزية",
            "DisplayNameEn": "Portfolio Name (English)",
            "type": "string"
        },
        {
            "InternalName": "Description",
            "DisplayName": "الوصف",
            "DisplayNameEn": "Description",
            "type": "multiline"

        },
        {
            "InternalName": "Manager",
            "DisplayName": "مدير المحفظة",
            "DisplayNameEn": "Portfolio Manager",
            "type": "picker"

        },

        {
            "InternalName": "Owner",
            "DisplayName": "مالك المحفظة",
            "DisplayNameEn": "Portfolio Owner",
            "type": "picker"


        },
        {
            "InternalName": "Title",
            "DisplayName": "رمز المحفظة",
            "DisplayNameEn": "Portfolio Code",
            "type": "string"
        }
    ]
}, ];