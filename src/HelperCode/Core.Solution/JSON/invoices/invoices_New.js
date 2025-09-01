var Information_Form = [{
    label: 'بيانات الفاتورة',
    labelEn: 'Invoice Data',
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [
        {
            "InternalName": "Name",
            "DisplayName": "اسم الفاتورة",
            "DisplayNameEn": "Invoice Name",
            "type": "string",
            "validation": "required"

        },
        {
            "InternalName": "TotalAmount",
            "DisplayName": "اجمالي المبلغ",
            "DisplayNameEn": "Total Amount",
            "type": "float",
            "validation": "required"
        },
        {
            "InternalName": "Amount",
            "DisplayName": "القيمة",
            "DisplayNameEn": "Amount",
            "type": "float",
            "state":"disabled"
        },
        {
            "InternalName": "TVA",
            "DisplayName": "الضريبة",
            "DisplayNameEn": "Tax",
            "type": "float",
            "state":"disabled"
        },
    
        // {
        //     "InternalName": "TotalAmount",
        //     "DisplayName": "اجمالي المبلغ",
        //     "DisplayNameEn": "Total Amount",
        //     "type": "float",
        //     "validation": "required"
        // },
        // {
        //     "InternalName": "Amount",
        //     "DisplayName": "القيمة",
        //     "DisplayNameEn": "Amount",
        //     "type": "float",
        //     "state":"disabled"
        // },
        // {
        //     "InternalName": "TVA",
        //     "DisplayName": "الضريبة",
        //     "DisplayNameEn": "Tax",
        //     "type": "float",
        //     "state":"disabled"
        // },
        {
            "InternalName": "Deliverable", 
            "DisplayName": "المخرج المرتبط",
            "DisplayNameEn": "Deliverable",
            "type": "lookupmultiselect",
            //from other list:ma
            "source": "Deliverables",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",
            "grpfieldkey": "Title"
        },
        // {
        //     "InternalName": "Deliverable",
        //     "DisplayName": "المخرج المرتبط",
        //     "DisplayNameEn": "Deliverable",
        //     "type": "lookup",
        //     //from other list:
        //     "source": "Deliverables",
        //     "Dispfieldkey": "Name",
        //     "valfieldkey": "Title"
        // },
        {
            "InternalName": "Status",
            "DisplayName": "الحالة",
            "DisplayNameEn": "Status",
            "type": "dropdownValues",
            options: {
                choices: [{
                        display: 'paid',
                        value: 'paid'
                    },
                    {
                        display: 'notpaid',
                        value: 'notpaid'
                    }
                ]
            }
        },
        {
            "InternalName": "DueDate",
            "DisplayName": "تاريخ استحقاق الدفعة",
            "DisplayNameEn": "Due Date",
            "type": "datetime"
        },
        {
            "InternalName": "Date",
            "DisplayName": "تاريخ الفاتورة",
            "DisplayNameEn": "Invoice Date",
            "type": "datetime"
        },
        {
            "InternalName": "Description",
            "DisplayName": "الوصف",
            "DisplayNameEn": "Description",
            "type": "multiline",
            "maxchar": 5000,
        },
        {
            "InternalName": "Comments",
            "DisplayName": "هل تم انجاز العمل و هل توجد ملاحظات او تأخير؟",
            "DisplayNameEn": "Has the work been completed and are there notes or delays?",
            "type": "multiline",
            "maxchar": 5000,
        }
    ]
},
{
    label: 'الوثائق الداعمة',
    labelEn: 'Supporting Documents',
    description: "",
    descriptionEn: "",
    subFields: [{
        "InternalName": "getfile",
        "DisplayName": "المرفقات",
        "DisplayNameEn": "Supporting Data",
        "type": "file",
        "withAddBtn":"true"
    }]
}
];