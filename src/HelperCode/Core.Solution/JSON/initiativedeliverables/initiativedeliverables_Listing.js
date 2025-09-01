var Listing_Info = [
	{
		"InternalName": "Title",
		"DisplayNameEn": "Title",
		"DisplayName":"رمز المخرج",
		"type":"text",
		inlisting: true,
		infilter: false
	}, 
	{
		"InternalName": "Name", 
		"DisplayNameEn": "Name",
		"DisplayName":"اسم المخرج",
		"type":"text", 
		inlisting: true,
		infilter: true
	},	
	// {
	// 	"InternalName": "PlannedCompletedDate",
	// 	"DisplayNameEn": "Planned Completed Date",
	// 	"DisplayName":"تاريخ الاكتمال المخطط",
	// 	"type":"date",
	// 	inlisting: true,
	// 	infilter: false
	// },	
	{
		"InternalName": "PlannedCompletedDate",
		"DisplayNameEn": "Planned Completed Date",
		"DisplayName":"تاريخ الاكتمال المخطط",
		"type":"date",
		inlisting: true,
		infilter: true
	},
	{
		"InternalName": "Weight",
		"DisplayNameEn": "Weight",
		"DisplayName":"الوزن(%)",
		// "type":"text",
		"type": "floatpercentage",
		inlisting: true,
		infilter: false
	},	
	{
		"InternalName": "Delivered",
		"DisplayName": "تم التسليم",
		"DisplayNameEn": "Delivered",
		"type": "yesnoradio",
		needTrans: true,
		inlisting: true,
		infilter: true
	},
	{
		"InternalName": "Completed",
		"DisplayNameEn": "Completed",
		"DisplayName":"اكتمال الموافقة",
		"type": "dropdownValues",
		needTrans: true,
		inlisting: true,
		infilter: true
	},
	// {
	// 	"InternalName": "Completed",
	// 	"DisplayNameEn": "Completed",
	// 	"DisplayName":"حالة الاكتمال",
	// 	"type": "text",
	// 	needTrans: true,
	// 	inlisting: true,
	// 	infilter: true
	// },
	// {
	// 	"InternalName": "Delivered",
	// 	"DisplayNameEn": "Delivered",
	// 	"DisplayName":"تم التسليم",
	// 	"type": "text",
	// 	needTrans: true,
	// 	inlisting: true,
	// 	infilter: true
	// },
];
