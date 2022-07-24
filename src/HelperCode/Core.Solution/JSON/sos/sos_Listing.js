var Listing_Info = [
    {
        "InternalName": "Title",
        "DisplayNameEn": "Code",
        "DisplayName":"رمز الهدف",
        "type":"text",
        inlisting: true,
        infilter: true
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
        "DisplayNameEn": "Objective Type",
        "DisplayName":"نوع الهدف",
        "type":"text",
        inlisting: true,
        infilter: true,
        needTrans:true
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
        "DisplayName": "الوكالات",
        "DisplayNameEn": "Departments",
        "type": "lookup",
        "localStorageVariable":"Dynamo_Internal Entities",
        inlisting: true,
        infilter: true
    },
];