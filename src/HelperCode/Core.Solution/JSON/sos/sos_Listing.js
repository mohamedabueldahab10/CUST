var Listing_Info = [
    {
        "InternalName": "Title",
        "DisplayNameEn": "Objective Code",
        "DisplayName":"رمز الهدف",
        "type":"text",
        inlisting: true,
        infilter: false
    },
    {
        "InternalName": "Name",
        "DisplayNameEn": "Name",
        "DisplayName":"اسم الهدف",
        "type":"text",
        inlisting: true,
        infilter: true
    },
    {
        "InternalName": "ObjectiveOwner",
        "DisplayName": "مالك الهدف",
        "DisplayNameEn": "Objective Owner",
        "type": "multipicker",
        inlisting: true,
        infilter: false,
    },
    // {
    //     "InternalName": "ObjectiveRealized",
    //     "DisplayNameEn": "Objective Realized",
    //     "DisplayName":"هل تم تحقيق الهدف؟",
    //     "type":"text",
    //     inlisting: true,
    //     infilter: true,
    //     needTrans:true
    // },
    {
        "InternalName": "Types",
        "DisplayNameEn": "Types",
        "DisplayName":"نوع الهدف",
        "type":"text",
        inlisting: true,
        infilter: true,
        needTrans:true
    },
    {
        "InternalName": "Status",
        "DisplayName": " الحالة",
        "DisplayNameEn": "Status",
        "type": "status", //create this type to handle status in listing specially for strategicobjectivestatus
        inlisting: true,

    },
    {
        "InternalName": "Sector",
        "DisplayName": "القطاع",
        "DisplayNameEn": "Sector",
        "type": "lookup",
        "localStorageVariable":"Dynamo_Internal Entities",
        inlisting: true,
        infilter: true
    },
    {
        "InternalName": "SubSector",
        "DisplayName": "الوكالة",
        "DisplayNameEn": "Deputyship",
        "type": "lookup",
        "localStorageVariable":"Dynamo_Internal Entities",
        inlisting: true,
        infilter: true
    },
    {
        "InternalName": "Department",
        "DisplayNameEn": "Department",
        "DisplayName":"الإدارة",
        "type":"text",
        inlisting: true,
        infilter: true
    },
];