var Information_Form = [
	{
		label: "الاهداف الاستراتيجية",
		labelEn: "Strategy objective Data",
		description: "التفاصيل",
		descriptionEn: "Details",
		subFields: [
			//     "InternalName": "Title",
			//     "DisplayName":"رمز الهدف",
			//     "type":"string",
			// "maxchar": "250",
			//     "state":"disabled"

			// },
			{
				InternalName: "Name",
				DisplayNameEn: "Name",
				DisplayName: "اسم الهدف",
				type: "string",
				maxchar: "250",
				validation: "required",
			},

			{
				InternalName: "Description",
				DisplayNameEn: "Description",
				DisplayName: "وصف الهدف",
				type: "multiline",
				maxchar: "500",
			},
			{
				InternalName: "ObjectiveOwner",
				DisplayName: "مالك الهدف",
				DisplayNameEn: "Objective Owner",
				type: "multipicker",
				validation: "required",
			},
			// {
			//     "InternalName": "SOSsecdOwner",
			//     "DisplayName": "صاحب الهدف",
			//     "DisplayNameEn": "Objective Holder",
			//     "type": "string"
			// },
			{
				InternalName: "Types",
				DisplayNameEn: "Objective Type",
				DisplayName: "نوع الهدف",
				toggleValues: [
					{ value: "sub", fields: ["RelatedObjective", "RelatedPortfolio"] },
					{ value: "main", fields: ["RelatedPillar"] },
					{ value: "jobmarket", fields: ["RelatedJobStrategy"] },
					// {value:'strategically', fields:['StrategyRelatedObjective']}
				],
				type: "dropdownValues",
				options: {
					choices: [
						{ display: "main", value: "main" },
						{ display: "sub", value: "sub" },
						// { display: 'vision', value: 'vision' },
						// { display: 'ministry', value: 'ministry' },
						// { display: 'jobmarket', value: 'jobmarket' },
						// { display: 'strategically', value: 'strategically' },
						// { display: 'transformationally', value: 'transformationally' },
					],
				},
				validation: "required",
			},
			{
				InternalName: "RelatedObjective",
				DisplayNameEn: "Related Main Objective",
				DisplayName: "الهدف الرئيسي المرتبط",
				ToggleName: "RelatedObjective",
				type: "lookupWithQuery",
				queryField: "Types",
				queryFieldType: "dropdownValues", //ex: "Choice"
				queryFieldValue: "main",
				//from other list:
				source: "SOs",
				Dispfieldkey: "Name",
				valfieldkey: "Title",
				display: "none",
				//
				dynamic: "RelatedStrategy",
				filterField: "RelatedStrategy",
				filterFieldType: "Text",
			},
			{
				InternalName: "RelatedPortfolio",
				DisplayNameEn: "Related Portfolio",
				ToggleName: "RelatedPortfolio",
				DisplayName: "المحفظة المرتبطة ",
				type: "lookup",
				//from other list:
				source: "Portfolio",
				Dispfieldkey: "Name",
				valfieldkey: "Title",
				display: "none",
			},
			// {
			// 	"InternalName": "RelatedPillar",
			// 	"DisplayNameEn": "Related Pillar",
			// 	"ToggleName": "RelatedPillar",
			// 	"DisplayName": "المحور المرتبط",
			// 	"type": "lookup",
			// 	//from other list:
			// 	"source": "SPillars",
			// 	"Dispfieldkey": "Name",
			// 	"valfieldkey": "Title",
			// 	"display": "none"

			// },
			{
				InternalName: "RelatedStrategy",
				DisplayNameEn: "Related Vision Strategy",
				DisplayName: "الاستراتيجية المرتبطة",
				// "ToggleName": "RelatedStrategy",
				type: "lookup",

				source: "GoalStrategy",
				Dispfieldkey: "Name",
				valfieldkey: "Title",
				// dynamically affected by other dropdown
				dynamic: "parent", //"parentInternalName" or "parent" // if parent it will affect other fields
				//in case not parent add below attrs
				//role access
				accessFilter: [
					{
						role: "VROE",
						conditions: [
							{
								field: "Types",
								type: "Choice",
								values: ["vision"],
							},
						],
					},
					{
						role: "VROP",
						conditions: [
							{
								field: "Types",
								type: "Choice",
								values: ["vision"],
							},
						],
					},
					{
						role: "LMSE",
						conditions: [
							{
								field: "Types",
								type: "Choice",
								values: ["lms"],
							},
						],
					},
					{
						role: "LMSP",
						conditions: [
							{
								field: "Types",
								type: "Choice",
								values: ["lms"],
							},
						],
					},
				],
				// "display":"none"
			},
			// {
			// 	"InternalName": "RelatedStrategyType",
			// 	"DisplayNameEn": "Strategy Type",
			// 	"DisplayName": "نوع  الاستراتيجية",
			// 	"type": "dropdownValues",
			// 	"state": "disabled",
			// 	options: {
			// 		choices: [
			// 			{ display: 'sub', value: 'sub' },
			// 			{ display: 'vision', value: 'vision' },
			// 			{ display: 'ministry', value: 'ministry' },
			// 			{ display: 'sectorial', value: 'sectorial' },
			// 		]
			// 	}
			// },
			{
				InternalName: "RelatedStrategyPillars",
				DisplayNameEn: "Is Pillar / program  Exist?",
				DisplayName: "هل يوجد محور / برنامج ؟",
				type: "dropdownValues",
				state: "disabled",
				options: {
					choices: [
						{ display: "yes", value: "yes" },
						{ display: "no", value: "no" },
					],
				},
			},
			{
				InternalName: "PillarName",
				DisplayNameEn: "Pillar Name",
				DisplayName: "اسم المحور / البرنامج",
				type: "lookup",
				//from other list:
				source: "SPillars",
				Dispfieldkey: "Name",
				valfieldkey: "Title",
				display: "none",
			},
			// {
			// 	"InternalName": "RelatedStrategyPillars",
			// 	"DisplayName": "هل يوجد محور / برنامج ؟",
			// 	"DisplayNameEn": "Is Pillar / program  Exist?",
			// 	"type": "yesnoradio",
			// 	options: {
			// 		choices: [{
			// 			display: 'yes',
			// 			value: 'yes'
			// 		},
			// 		{
			// 			display: 'no',
			// 			value: 'no'
			// 		}
			// 		]
			// 	},

			// },
			{
				InternalName: "RelatedJobStrategy",
				DisplayNameEn: "Related Job Market Strategy",
				DisplayName: "استراتيجية سوق العمل المرتبطة",
				ToggleName: "RelatedJobStrategy",
				type: "lookupWithQuery",
				queryField: "Types",
				queryFieldType: "dropdownValues", //ex: "Choice"
				queryFieldValue: "jobmarket",
				//from other list:

				source: "GoalStrategy",
				Dispfieldkey: "Name",
				valfieldkey: "Title",
				display: "none",
			},
			{
				InternalName: "Sector",
				DisplayName: "القطاع",
				DisplayNameEn: "Sector",
				type: "lookup",
				validation: "required",
				//from other list:
				source: "Internal Entities",
				isSector: "True",
				EntityType: "Sector",
				Dispfieldkey: "Name",
				DispfieldkeyEn: "NameEn",
				valfieldkey: "Title",
			},
			{
				InternalName: "SubSector",
				DisplayName: "الجهة/الوكالة",
				DisplayNameEn: "Departments",
				type: "lookup",
				//from other list:
				source: "Internal Entities",
				isSector: "True",
				EntityType: "Department",
				Dispfieldkey: "Name",
				DispfieldkeyEn: "NameEn",
				valfieldkey: "Title",
			},
			// {
			//     "InternalName": "ObjectiveRealized",
			//     "DisplayNameEn": "Objective Realized",
			//     "DisplayName":"هل تم تحقيق الهدف؟",
			//     "type": "dropdownValues",
			//     options: {
			//         choices: [
			//             { display: 'yes', value: 'yes' },
			//             { display: 'no', value: 'no' },
			//         ]
			//     }
			// },
			// {
			//     "InternalName": "ResultType",
			//     "DisplayNameEn": "Result Type",
			//     "DisplayName": "وحدة القياس",
			//     "type": "dropdownValues",
			//     options: {
			//         choices: [
			//             { display: 'number', value: 'number' },
			//             { display: 'percentage', value: 'percentage' },
			//         ]
			//     }
			//   },
			//   {
			//     "InternalName": "Cancelled",
			//     "DisplayName": "الغاء",
			//     "DisplayNameEn": "Cancelled",
			//     "type": "yesnoradio",
			//     options: {
			//         choices: [{
			//             display: 'yes',
			//             value: 'yes'
			//         }, {
			//             display: 'no',
			//             value: 'no'
			//         }]
			//     }

			// },
		],
	},
];
