var Listing_Info = [
	{
		"InternalName": "Title",
		"DisplayNameEn": "Title",
		"DisplayName":"رمز المنفعة",
		"type":"text",
		inlisting: true,
		infilter: false
	},
	{
		"InternalName": "Name",
		"DisplayNameEn": "Name",
		"DisplayName":"المنفعة",
		"type":"text",
		inlisting: true,
		infilter: true
	},	
	{
        InternalName: 'BenefitStatus',
        DisplayNameEn: 'Benefit Status',
        DisplayName: 'حالة المنفعة',
        ToggleName: 'Benefit Status',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'stat15', value: 'لم يتم تحقيقه' },
            { display: 'stat16', value: 'تم تحقيقه جزئياً' },
            { display: 'stat17', value: 'تم تحقيق المستهدف' },
            { display: 'stat18', value: 'لا يقاس' },
            { display: 'stat19', value: 'لا توجد قيمة' },
           
          ],
        }
        },
	{
		"InternalName": "Owner",
		"DisplayNameEn": "Benefit Owner",
		"DisplayName": " مالك المنفعة ",
		"type": "picker",
		inlisting: true,
		infilter: true
	},	
	{
		"InternalName": "Weight",
		"DisplayNameEn": "Weight",
		"DisplayName": "وزن",
		"type": "float",
		inlisting: true,
		infilter: false
	},	
];
