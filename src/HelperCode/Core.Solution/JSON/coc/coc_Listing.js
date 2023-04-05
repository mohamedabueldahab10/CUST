var Listing_Info = [
    {
        "InternalName": "Title",
        "DisplayNameEn": "CoC Code",
        "DisplayName":"رمز شهادة الإنجاز",
        "type":"text",
        inlisting: true,
        infilter: false
    },
    {
        "InternalName": "Amount",
        "DisplayNameEn": "Amount",
        "DisplayName":"المبلغ الإجمالى للمخرجات",
        "type":"number",
        inlisting: true,
        infilter: false,
        
    },
    // {
    //     "InternalName": "TAX",
    //     "DisplayNameEn": "TAX",
    //     "DisplayName":"نسبة الضريبة",
    //     "type":"number",
    //     inlisting: true,
    //     infilter: false
    // },
    {
        InternalName: 'DisbursementStatus',
        DisplayNameEn: 'Disbursement Status',
        DisplayName: 'حالة الصرف',
        type: 'dropdownValues',
        inlisting: true,
        infilter: false,
        needTrans: true,
    },
    {
        "InternalName": "TotalAmount",
        "DisplayNameEn":"Total Amount",
        "DisplayName": "المبلغ الإجمالى",
        "type":"number",
        inlisting: true,
        infilter: false
    }
]