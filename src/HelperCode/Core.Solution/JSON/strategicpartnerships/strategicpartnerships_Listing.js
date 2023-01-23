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
      "type": "lookup",
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
   {
      "InternalName":"PartnerName",
      "DisplayName":"اسم الشريك",
      "DisplayNameEn":"Partner Name",
      "type":"lookup",
      // "localStorageVariable":"Dynamo_Internal Entities",
      "inlisting":true,
      "infilter":false
   },
   {
      "InternalName":"RelatedStrategyObjective",
      "DisplayName":"الهدف الاستراتيجي المرتبط",
      "DisplayNameEn":"Related Strategy Objective",
      "type":"lookup",
      // "localStorageVariable":"Dynamo_Internal Entities",
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
      "type":"text",
      "inlisting":true,
      "infilter":true,
      "needTrans": true
   }
];
  