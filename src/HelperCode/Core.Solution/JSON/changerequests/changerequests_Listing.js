var Listing_Info = [
    {
      InternalName: "Title",
      DisplayNameEn: "Code",
      DisplayName: "رمز طلب التغيير",
      type: "string",
      inlisting: true,
    },
    {
      InternalName: "Sector",
      DisplayName: "القطاع",
      DisplayNameEn: "Sector",
      type: "lookup",
      localStorageVariable: "Dynamo_Internal Entities",
      inlisting: true,
      infilter: true,
    },
    {
      InternalName: "SubSector",
      DisplayName: "الوكالة",
      DisplayNameEn: "DeputyShip",
      type: "lookup",
      localStorageVariable: "Dynamo_Internal Entities",
      inlisting: true,
      infilter: true,
    },
    {
      InternalName: "ChangeItem",
      DisplayName: "عنصر التغيير",
      DisplayNameEn: "Change Item",
      type: "lookup",
      localStorageVariable: "Dynamo_ChangeItems",
      inlisting: true,
      infilter: true,
    },
  ];
  