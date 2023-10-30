var Listing_Info = [
	{
		"InternalName": "Title",
		"DisplayNameEn": "Title",
		"DisplayName": "رمز المعلم",
		"type": "text",
		inlisting: true, 
		infilter: true
	},
	{
		"InternalName": "Name",
		"DisplayNameEn": "Name",
		"DisplayName": "اسم المعلم",
		"type": "text",
		inlisting: true,
		infilter: true
	},
	// {
    //     "InternalName": "PlannedDate",
    //     "DisplayName": "تاريخ الاكتمال المخطط",
    //     "DisplayNameEn": "Planned Finish Date",
    //     "type": "date",
    //     inlisting: true,
    //     infilter: true
    // },
	{
		"InternalName": "Weight",
		"DisplayNameEn": "Weight",
		"DisplayName": "الوزن المكافئ للإنجاز %",
		// "type": "text",
		"type": "floatpercentage",
		inlisting: true,
		infilter: true
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
	// {
	// 	InternalName: "WFStage",
	// 	DisplayName: "المرحلة",
	// 	DisplayNameEn: "WFStage",
	// 	type: "lookup",
	// 	localStorageVariable: "Dynamo_Tasks Configuration",
	// 	inlisting: true,
	// 	infilter: true,
	//   },
	{
		"InternalName": "Completed",
		"DisplayNameEn": "Completed",
		"DisplayName":"اكتمال الموافقة",
		"type": "dropdownValues",
		needTrans: true,
		inlisting: true,
		infilter: true
	},
	{
        "InternalName": "PlannedCompletedDate",
        "DisplayName": "تاريخ الاكتمال المخطط",
        "DisplayNameEn": "Planned Completed Date",
        "type": "date",
        inlisting: true,
        infilter: true
    },
	{
		"InternalName": "ActualCompletedDate",
		"DisplayNameEn": "Actual Completed Date",
		"DisplayName":"تاريخ الاكتمال الفعلي",
        "type": "date",
        inlisting: true,
        infilter: false
    },
];
