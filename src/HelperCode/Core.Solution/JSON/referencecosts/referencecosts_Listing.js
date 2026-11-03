var Listing_Info = [
  {
    InternalName: "Title",
    DisplayName: "رمز البند",
    DisplayNameEn: "Item Code",
    type: "text",
    inlisting: true,
    infilter: true
  },
  {
    InternalName: "BrochureType",
    DisplayName: "نوع الكراسة",
    DisplayNameEn: "Brochure Type",
    type: 'lookup',
    source: "PRType",
    Dispfieldkey: "ArName",
    valfieldkey: "Title",
    validation: "required"
  },
  {
    InternalName: "NeedRequestNumber",
    DisplayName: "رقم طلب الاحتياج",
    DisplayNameEn: "Need Request Number",
    type: "text",
    inlisting: true,
    infilter: true
  },
  {
    InternalName: "Quantity",
    DisplayName: "الكمية",
    DisplayNameEn: "Quantity",
    type: "text",
    inlisting: true,
    infilter: true
  },
  {
    InternalName: "ItemPrice",
    DisplayName: "سعر البند",
    DisplayNameEn: "Item Price",
    type: "text",
    inlisting: true,
    infilter: true
  },
  {
    InternalName: "LowestOfferPrice",
    DisplayName: "أقل عرض سعر",
    DisplayNameEn: "Lowest Offer Price",
    type: "text",
    inlisting: true,
    infilter: true
  },
  {
    InternalName: "HighestOfferPrice",
    DisplayName: "أعلى عرض سعر",
    DisplayNameEn: "Highest Offer Price",
    type: "text",
    inlisting: true,
    infilter: true
  },
  {
    InternalName: "AverageOffersPrice",
    DisplayName: "متوسط عروض الأسعار",
    DisplayNameEn: "Average Offers Price",
    type: "text",
    inlisting: true,
    infilter: true
  },
  {
    InternalName: "WinnerCompanyPrice",
    DisplayName: "سعر البند للشركة الفائزة",
    DisplayNameEn: "Winner Company Price",
    type: "text",
    inlisting: true,
    infilter: true
  },
  {
    InternalName: 'Status',
    DisplayName: 'الحالة',
    DisplayNameEn: 'Status',
    type: 'dropdownValues',
    needTrans: true,
    inlisting: true,
    infilter: true,
  }
];
