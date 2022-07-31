var Listing_Info = [
	
	
	{
		"InternalName": "Title",
		"DisplayNameEn": "Title",
		"DisplayName":"رمز المبادرة",
		"type":"text",
		inlisting: true,
		infilter: true
	},
	{
		"InternalName": "Name",
		"DisplayNameEn": "Name",
		"DisplayName":"اسم المبادرة",
        "type":"text",
		inlisting: true,
		infilter: true
	},
    // {
	// 	"InternalName": "Portfolio",
    //         "DisplayName": "المحفظة",
    //         "DisplayNameEn": "Portfolio",
	// 	"type":"text",	
	// 	inlisting: true,
	// 	infilter: true
	
	// },
	{
		"InternalName": "InitiativeProgressStatus",
		"DisplayName": "حالة الإنجاز",
		"DisplayNameEn": "Initiative Progress Status",
		"type": "text",
		needTrans: true,
		inlisting: true,
		infilter: true
	},
    {
		"InternalName": "Types",
		"DisplayNameEn": "Types",
		"DisplayName":"النوع",
		"type":"text",	
		inlisting: true,
		needTrans: true,
		infilter: true
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
    }
];
