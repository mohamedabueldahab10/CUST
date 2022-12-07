var Listing_Info = [
   {
      "InternalName":"Title",
      "DisplayName":"رقم الشراكة",
      "DisplayNameEn":"Partnership Number",
      "type":"text",
      "inlisting":true,
      "infilter":false
   },
   {
      "InternalName":"PartnerName",
      "DisplayName":"اسم الشريك",
      "DisplayNameEn":"Partner Name",
      "type":"lookup",
      "inlisting":true,
      "infilter":false
   },
   {
      "InternalName":"Sector",
      "DisplayName":"القطاع",
      "DisplayNameEn":"Sector",
      "type": "text",
      "localStorageVariable":"Dynamo_Internal Entities",
      "inlisting":true,
      "infilter":true
   },
   {
      "InternalName":"SubSector",
      "DisplayName":"الوكالة",
      "DisplayNameEn":"Deputyship",
      "type": "text",
      "localStorageVariable":"Dynamo_Internal Entities",
      "inlisting":true,
      "infilter":true
   },
   {
      "InternalName": "PartnershipType",
	  "DisplayName": "نوع الشراكة",
	  "DisplayNameEn": "Partnership Type",
      "type":"text",
      "inlisting":true,
      "infilter":true,
      "needTrans": true
   },
   // {
   //    "InternalName": "PartnerType",
	//   "DisplayName": "نوع الشريك",
	//   "DisplayNameEn": "Partner Type",
   //    "type":"text",
   //    "inlisting":true,
   //    "infilter":true,
   //    needTrans: true
   // },
   {
      "InternalName":"Status",
      "DisplayName":"حالة الشراكة",
      "DisplayNameEn":"Status",
      "type":"text",
      "inlisting":true,
      "infilter":true
   }
];
  