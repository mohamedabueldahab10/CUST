var Listing_Info = [{

    "InternalName": "Name",
    "DisplayName": "اسم المشروع",
    "DisplayNameEn": "Project Name",
    "type": "text",
    inlisting: true,
    infilter: true
},
{
    "InternalName": "Title",
    "DisplayName": "رمز المشروع",
    "DisplayNameEn": "Project Code",
    "type": "text",
    inlisting: true,
    infilter: false
}, /////////first 2 will always show up
// {
//     "InternalName": "RelatedIdeaCode",
//     "DisplayName": "رمز الفكرة",
//     "DisplayNameEn": "Idea Code",
//     "type": "text",
//     isItemLinkable: true,
//     inlisting: true,
//     infilter: true
// },
{
    "InternalName": "Portfolio",
    "DisplayName": "المحفظة",
    "DisplayNameEn": "Portfolio",
    "type": "lookup",
    "localStorageVariable":"Dynamo_Portfolio",
    inlisting: true,
    infilter: true
},
{
    "InternalName": "ProjectProgressStatus",
    "DisplayName": "حالة الإنجاز",
    "DisplayNameEn": "Project Progress Status",
    "type": "text",
    needTrans: true,
    inlisting: true,
    infilter: true
},
{
    "InternalName": "Priority",
    "DisplayName": "أهمية المشروع",
    "DisplayNameEn": "Priority",
    "type": "text",
    needTrans: true,
    inlisting: true,
    infilter: true
},
{
    "InternalName": "ProjectType",
    "DisplayName": "نوع المشروع",
    "DisplayNameEn": "Project Type",
    "type": "text",
    needTrans: true,
    inlisting: false,
    infilter: false
},
{
    "InternalName": "Sector",
    "DisplayName": "القطاع",
    "DisplayNameEn": "Sector",
    "type": "lookup",
    "localStorageVariable":"Dynamo_Internal Entities",
    inlisting: false,
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