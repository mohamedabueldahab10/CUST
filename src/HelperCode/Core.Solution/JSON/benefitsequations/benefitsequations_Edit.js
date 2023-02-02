var Information_Form = [{
    label: 'معادلات مقياس المنفعة',
    labelEn: 'KPI Equation',
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [
        // {
        //     "InternalName": "Title",
        //     "DisplayName":"رمز التحدي",
        //     "type":"string",
        //     "validation": "required"
        // },
        {
            InternalName: 'RelatedBenefit',// oday 
            DisplayNameEn: 'RelatedBenefit',
            DisplayName: 'المنفعة المرتبطة',
            "type": "lookup",
            "source": "Benefits",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",
            "state": "disabled",
        },

        {
            "InternalName": "Equation",
            "DisplayName": "معادلة المؤشر في البطاقة",
            "DisplayNameEn": "Equation",
            "type": "string"
        },
        {
            "InternalName": "KPIInput", //oday
            "DisplayName": "المعادلة المدخلة",
            "DisplayNameEn": "KPI Input",
            "type": "formula"
        },
        // {
        //     "InternalName": "Quarter",
        //     "DisplayNameEn": "Quarter",
        //     "DisplayName": "الربع",
        //       "type": "dropdown",
        //     //   "state": "disabled",
        //     //   dynamic: "Initiative",
        //     options: {
        //       choices: [
        //         '1', '2','3','4'
        //       ]
        //     }
        //   },
        // {
        //     "InternalName": "Year",
        //     "DisplayNameEn": "Year",
        //     "DisplayName": "السنة",
        //       "type": "dropdown",
        //     //   "state": "disabled",
        //     //   dynamic: "Initiative",
        //     options: {
        //       choices: [
        //         '2020',
        //          '2021',
        //          '2022',
        //          '2023',
        //          '2024',
        //          '2025',
        //          '2026',
        //          '2027',
        //          '2028',
        //          '2029',
        //          '2030',
        //       ]
        //     }
        //   },

        //   {
        //     "InternalName": "MesureStatus",
        //     "DisplayNameEn": "MesureStatus",
        //     "DisplayName": "حالة القياس",
        //       "type": "dropdownValues",
        //     //   "state": "disabled",
        //     //   dynamic: "Initiative",
        //     options: {
        //       choices: [
        //         {
        //             display: 'mersurable',
        //             value: 'mersurable'
        //         },
        //         {
        //             display: 'unmersurable',
        //             value: 'unmersurable'
        //         },
        //         {
        //             display: 'unspecific',
        //             value: 'unspecific'
        //         },
        //       ]
        //     }
        //   },
    ]
},
{
    label: 'مكونات المعادلة',
    labelEn: 'Equation components',
    description: "",
    descriptionEn: "",
    subFields: [
        {
            "InternalName": "A",
            "DisplayName": "المكون الأول (A)",
            "DisplayNameEn": "A",
            "type": "string"
        },
        {
            "InternalName": "B",
            "DisplayName": "المكون الثاني (B)",
            "DisplayNameEn": "B",
            "type": "string"
        },
        {
            "InternalName": "CC",
            "DisplayName": "المكون الثالث (C)",
            "DisplayNameEn": "C",
            "type": "string"
        },
        {
            "InternalName": "D",
            "DisplayName": "المكون الرابع (D)",
            "DisplayNameEn": "D",
            "type": "string"
        },
        {
            "InternalName": "E",
            "DisplayName": "المكون الخامس (E)",
            "DisplayNameEn": "E",
            "type": "string"
        },
        {
            "InternalName": "F",
            "DisplayName": "المكون السادس (F)",
            "DisplayNameEn": "F",
            "type": "string"
        },
        {
            "InternalName": "G",
            "DisplayName": "المكون السابع (G)",
            "DisplayNameEn": "G",
            "type": "string"
        },
        
    ]
},
{
    label: '',
    labelEn: '',
    description: "",
    descriptionEn: "",
    subFields: [
    {
        "InternalName": "Author",
        "DisplayName": "تم الانشاء بواسطة",
        "DisplayNameEn": "Author",
        "type": "picker",
        "state": "disabled",
    },
  
    {
        "InternalName": "Created",
        "DisplayName": "تاريخ الانشاء ",
        "DisplayNameEn": "Created",
        "type": "datetime",
        "state": "disabled",
    },
    {
        "InternalName": "Editor",
        "DisplayName": "تم التعديل بواسطة",
        "DisplayNameEn": "Editor",
        "type": "picker",
        "state": "disabled",
    },
    {
        "InternalName": "Modified",
        "DisplayName": "تاريخ اخر تعديل",
        "DisplayNameEn": "Modified",
        "type": "datetime",
        "state": "disabled",
    },
]
}
];