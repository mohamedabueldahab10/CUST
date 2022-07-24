var Information_Form = [{
        label: 'بيانات الفاتورة',
        labelEn: 'Invoice Data',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
            // {
            //     "InternalName": "Title",
            //     "DisplayName":"رمز الفاتورة",
            // "DisplayNameEn": "Invoice Title",
            //     "type":"string",
            //     "state":"disabled"

            // }, 
            {
                "InternalName": "Name",
                "DisplayName": "اسم الفاتورة",
                "DisplayNameEn": "Invoice Name",
                "type": "string",
                "validation": "required"

            },
            {
                "InternalName": "Amount",
                "DisplayName": "القيمة",
                "DisplayNameEn": "Amount",
                "type": "float",
                "validation": "required"

            },
            {
                "InternalName": "TVA",
                "DisplayName": "القيمة المضافة",
                "DisplayNameEn": "TVA",
                "type": "float"
            },
            {
                "InternalName": "TotalAmount",
                "DisplayName": "اجمالي المبلغ",
                "DisplayNameEn": "Total Amount",
                "type": "float",
                "state":"disabled"
            },
            {
                "InternalName": "Deliverable",
                "DisplayName": "المخرج المرتبط",
                "DisplayNameEn": "Deliverable",
                "type": "lookup",
                //from other list:
                "source": "Deliverables",
                "Dispfieldkey": "Name",
                "valfieldkey": "Title"
            },
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
        label: 'المرفقات',
        labelEn: 'Attachments',
        description: "",
        descriptionEn: "",
        subFields: [{
            "InternalName": "getfile",
            "DisplayName": "المرفقات",
            "DisplayNameEn": "Attachments",
            "type": "file",
            "withAddBtn":"true"
        }]
    }
];