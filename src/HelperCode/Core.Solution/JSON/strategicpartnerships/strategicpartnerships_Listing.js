var Listing_Info = [
   {
      "InternalName":"Title",
      "DisplayName":"رقم الشراكة",
      "DisplayNameEn":"Partnership Code",
      "type":"text",
      "inlisting":true,
      "infilter":false
   },
   {
      "InternalName":"Name",
      "DisplayName":"اسم الشراكة",
      "DisplayNameEn":"Partnership Name",
      "type":"text",
      "inlisting":true,
      "infilter":true
   },
   {
      "InternalName":"Sector",
      "DisplayName":"القطاع",
      "DisplayNameEn":"Sector",
      "type": "lookup",
      "localStorageVariable":"Dynamo_Internal Entities",
      "inlisting":true,
      "infilter":true
   },
   {
      "InternalName":"SubSector",
      "DisplayName":"الوكالة", 
      "DisplayNameEn":"Deputyship",
      "type":"lookupmultiselect",
      "localStorageVariable":"Dynamo_Internal Entities",
      "inlisting":true,
      "infilter":false 
   },
   {
      "InternalName": "PartnershipType",
	  "DisplayName": "نوع الشراكة",
	  "DisplayNameEn": "Partnership Type",
      "type":"dropdownValues",
      "inlisting":true,
      "infilter":true,
      "needTrans": true
   },
   // {
   //    "InternalName":"PartnerName",
   //    "DisplayName":"اسم الشريك",
   //    "DisplayNameEn":"Partner Name",
   //    "type":"lookup",
   //    "localStorageVariable":"Dynamo_Vendors",
   //    "inlisting":true,
   //    "infilter":false
   // },
   {
      "InternalName":"RelatedStrategyObjective",
      "DisplayName":"الهدف الاستراتيجي المرتبط",
      "DisplayNameEn":"Related Strategy Objective",
      "type": "lookup",
      "localStorageVariable":"Dynamo_SOs",
      "inlisting":true,
      "infilter":false
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
      // "type":"text",
      "type":"dropdownValues",
      "inlisting":true,
      "infilter":true,
      "needTrans": true,
   }
];
  