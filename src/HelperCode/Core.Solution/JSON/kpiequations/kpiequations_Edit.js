var Information_Form = [{
    label: 'معادلات المؤشرات',
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
            "InternalName": "KPI",
            "DisplayNameEn": "KPI",
            "DisplayName": "مؤشر الأداء",
            "type": "lookup",
            "source": "MainKPI",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",
            "state": "disabled",
            "dontSubmit": true,
        },

        {
            "InternalName": "Equation",
            "DisplayName": "معادلة المؤشر في البطاقة",
            "DisplayNameEn": "Equation",
            "type": "string",
            "validation": "required",
            descPhraseAr: "مثال: عدد العاملين + عدد العاطلين عن العمل",
            descPhraseEn: "The number of workers + the number of unemployed",  
        },
        {
            "InternalName": "KPIInput",
            "DisplayName": "المعادلة المدخلة",
            "DisplayNameEn": "KPI Input",
            "type": "formula",
            "validation": "required",
            descPhraseAr: "مثال: (A+B)",
            descPhraseEn: "Example: (A+B)", 
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
            "type": "string",
            // "validation": "required",
            descPhraseAr: " مثال: عدد العاملين",
            descPhraseEn: "The number of workers", 
        },
        {
            "InternalName": "URLA",
            "DisplayName": "الرابط المكون الأول (A)",
            "DisplayNameEn": "URLA",
            "type": "string",
            tooltipKey: "componentApiLinkTooltip"
        },
        {
            "InternalName": "B",
            "DisplayName": "المكون الثاني (B)",
            "DisplayNameEn": "B",
            "type": "string",
            // "validation": "required",
            descPhraseAr: " مثال: عدد العاطلين عن العمل",
            descPhraseEn: "The number of unemployed", 
        },
        {
            "InternalName": "URLB",
            "DisplayName": "الرابط المكون الثاني (B)",
            "DisplayNameEn": "URLB",
            "type": "string",
            tooltipKey: "componentApiLinkTooltip"
        },
        {
            "InternalName": "CC",
            "DisplayName": "المكون الثالث (C)",
            "DisplayNameEn": "C",
            "type": "string",
        },
        {
            "InternalName": "URLC",
            "DisplayName": "الرابط المكون الثالث (C)",
            "DisplayNameEn": "URLC",
            "type": "string",
            tooltipKey: "componentApiLinkTooltip"
        },
        {
            "InternalName": "D",
            "DisplayName": "المكون الرابع (D)",
            "DisplayNameEn": "D",
            "type": "string",
        },
        {
            "InternalName": "URLD",
            "DisplayName": "الرابط المكون الرابع (D)",
            "DisplayNameEn": "URLD",
            "type": "string",
            tooltipKey: "componentApiLinkTooltip"
        },
        {
            "InternalName": "E",
            "DisplayName": "المكون الخامس (E)",
            "DisplayNameEn": "E",
            "type": "string",
        },
        {
            "InternalName": "URLE",
            "DisplayName": "الرابط المكون الخامس (E)",
            "DisplayNameEn": "URLE",
            "type": "string",
            tooltipKey: "componentApiLinkTooltip"
        },
        {
            "InternalName": "F",
            "DisplayName": "المكون السادس (F)",
            "DisplayNameEn": "F",
            "type": "string",
        },
        {
            "InternalName": "URLF",
            "DisplayName": "الرابط المكون السادس (F)",
            "DisplayNameEn": "URLF",
            "type": "string",
            tooltipKey: "componentApiLinkTooltip"
        },
        {
            "InternalName": "G",
            "DisplayName": "المكون السابع (G)",
            "DisplayNameEn": "G",
            "type": "string",
        },
        {
            "InternalName": "URLG",
            "DisplayName": "الرابط المكون السابع (G)",
            "DisplayNameEn": "URLG",
            "type": "string",
            tooltipKey: "componentApiLinkTooltip"
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