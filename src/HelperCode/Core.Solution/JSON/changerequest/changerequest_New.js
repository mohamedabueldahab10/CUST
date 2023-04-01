//export.module = Information_Form ;
//module.exports = Information_Form;
window.Information_Form = [
	{
		label: "بيانات طلب اضافة",
		labelEn: "Add Request Data",
		description: "التفاصيل",
		descriptionEn: "Details",
		subFields: [
			{
				// InternalName: 'Title',
				DisplayNameEn: 'Create Project',
				DisplayName: 'اضافة مشروع',
				type: 'anchor',
				href: "/SitePages/new.aspx?ListKey=projects"
			},
			{
				// InternalName: 'Title',
				DisplayNameEn: 'Create Initiative',
				DisplayName: 'اضافة مبادرة',
				type: 'anchor',
				href: "/SitePages/new.aspx?ListKey=initiatives"
			},
			{
				// InternalName: 'Title',
				DisplayNameEn: 'Create Strategic objective',
				DisplayName: 'اضافة هدف استراتيجي',
				type: 'anchor',
				href: "/SitePages/new.aspx?ListKey=sos"
			},
			{
				// InternalName: 'Title',
				DisplayNameEn: 'Create KPI',
				DisplayName: 'اضافة مؤشر',
				type: 'anchor',
				href: "/SitePages/new.aspx?ListKey=mainkpi"
			},
		]
	},
	{
		label: "بيانات طلب التغيير",
		labelEn: "Change Request Data",
		description: "التفاصيل",
		descriptionEn: "Details",
		subFields: [
			{
				InternalName: "moduleSelect",
				DisplayNameEn: "Select Type",
				DisplayName: "اختر النوع",
				validation: "required",
				// dontSubmit: true,
				// display: "none",
				customCr: true,
				// dynamic: "parent", //main field that affect on other chiled field  
				type: "dropdownValues",
				options: {
					choices: [
						//SOS
						{ display: "strategicobjectives", value: "strategic_SOs", roles: ['Administrator', 'EPMO', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'] },
						{ display: "visionobjectives", value: "vision_SOs", roles: ['Administrator', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'VROE'], },
						{ display: "lmsobjectives", value: "lms_SOs", roles: ['Administrator', 'LMSE', 'LMSP', 'LMSUExecution', 'LMSUPerformance', 'LMSUControl'], },
						//projects
						{ display: "vroprojects", value: "vro_Projects", roles: ['Administrator', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'VROE'] },
						{ display: "epmoprojects", value: "epmo_Projects", roles: ['Administrator', 'EPMO', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'] },
						{ display: "lmsprojects", value: "lms_Projects", roles: ['Administrator', 'LMSE', 'LMSP', 'LMSUExecution', 'LMSUPerformance', 'LMSUControl'], },
						//Initiatives
						{ display: "strategicinitiatives", value: "strategic_Initiatives", roles: ['Administrator', 'EPMO', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'] },
						{ display: "vroinitiatives", value: "vro_Initiatives", roles: ['Administrator', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'VROE'] },
						{ display: "lmsinitiatives", value: "lms_Initiatives", roles: ['Administrator', 'LMSE', 'LMSP', 'LMSUExecution', 'LMSUPerformance', 'LMSUControl'], },
						//KPI
						{ display: "strategickpi", value: "strategic_MainKPI", roles: ['Administrator', 'EPMO', 'SPMOHead', 'SPMO', 'DU', 'SPMAdmin', 'SPMTeam', 'StrategyTeam', 'CRCommittee'] },
						{ display: "vrokpi", value: "vro_MainKPI", roles: ['Administrator', 'VROHead', 'VROPHead', 'VROP', 'VPlanningUnitHead', 'VPlanningUnit', 'VROEHead', 'VROE'] },
						{ display: "lmskpi", value: "lms_MainKPI", roles: ['Administrator', 'LMSE', 'LMSP', 'LMSUExecution', 'LMSUPerformance', 'LMSUControl'], },
					],
				},
				toggleValues: [
					{ value: "vro_Projects", fields: ["ProjectCode", "vroprojectsUpdateType"] }, //we can put more than 1  field
					{ value: "epmo_Projects", fields: ["ProjectCode", "epmoprojectsUpdateType"] }, //we can put more than 1  field
					{ value: "lms_Projects", fields: ["ProjectCode", "lmsprojectsUpdateType"] }, //we can put more than 1  field
					//Initiatives
					{ value: "strategic_Initiatives", fields: ["InitiativeCode", "strategicinitiativesUpdateType"] }, //we can put more than 1  field
					{ value: "vro_Initiatives", fields: ["InitiativeCode", "vroinitiativesUpdateType"] }, //we can put more than 1  field
					{ value: "lms_Initiatives", fields: ["InitiativeCode", "lmsinitiativesUpdateType"] }, //we can put more than 1  field
					//SOS
					{ value: "strategic_SOs", fields: ["CRRelatedStrategyObjective", "strategicbjectivesUpdateType"], },
					{ value: "vision_SOs", fields: ["CRRelatedStrategyObjective", "visionobjectivesUpdateType"], },
					{ value: "lms_SOs", fields: ["CRRelatedStrategyObjective", "lmsobjectivesUpdateType"],},
					//	-----SOS----
					//---KPI------
					{ value: "strategic_MainKPI", fields: ["CRRelatedMainKpis", "strategickpiUpdateType"] }, //we can put more than 1  field
					{ value: "vro_MainKPI", fields: ["CRRelatedMainKpis", "vrokpiUpdateType"] }, //we can put more than 1  field
					{ value: "lms_MainKPI", fields: ["CRRelatedMainKpis", "lmskpiUpdateType"] }, //we can put more than 1  field
				],
			},
			{
				InternalName: "ProjectCode",
				DisplayNameEn: "Related Project",
				DisplayName: "المشروع المرتبط",
				display: "none",
				type: "lookup",
				listKey: "projects",
				ToggleName: "ProjectCode",
				customCr: true,
				source: "Projects",
				Dispfieldkey: "Name",
				valfieldkey: "Title",
				useAccessPolicy: true
			},
			{
				InternalName: "UpdateType",
				DisplayName: "نوع طلب التغيير",
				DisplayNameEn: "Change Request Type",
				display: "none",
				customCr: true,
				ToggleName: "vroprojectsUpdateType",
				type: "dropdownValues",
				options: {
					choices: [
						{
							display: "generalchange",
							value: "automatic",
							//
							fields: [
								{
									InternalName: "getall",
								},

							], otherFields: [
								{ fieldName: 'WFModuleCode', value: 'VROCRProject' },
								{ fieldName: 'WFStage', value: 'VROCRProject01' },
							]
						},
						{
							display: "deletion", value: "delete",
							otherFields: [
								{ fieldName: 'WFModuleCode', value: 'VROCRProject' },
								{ fieldName: 'WFStage', value: 'VROCRProject01' },
							]
						}
						// {
						// 	display: "baseline",
						// 	value: "manual",
						// 	//
						// 	fields: [
						// 		{
						// 			listName: "Projects",
						// 			label: "المشروع",
						// 			labelEn: "Project",
						// 			description: "",
						// 			descriptionEn: "",
						// 			//
						// 			InternalName: "Baseline",
						// 			DisplayName: "خط الأساس",
						// 			DisplayNameEn: "Baseline",
						// 			type: "datetime",
						// 		},

						// 	],
						// },
						// {
						// 	display: "performanceindicators",
						// 	value: "automatic",
						// 	fields: [
						// 		{
						// 			listName: "ProjectsGoalsAndKPIs",
						// 			label: "بيانات هدف المشروع ",
						// 			labelEn: "Goal  Data",
						// 			description: "التفاصيل",
						// 			descriptionEn: "Details",
						// 			//
						// 			InternalName: "ProjectKPI",
						// 			DisplayNameEn: "Project KPI",
						// 			DisplayName: "مؤشر المشروع ",
						// 			type: "lookup",
						// 			source: "MainKPI",
						// 			Dispfieldkey: "Name",
						// 			valfieldkey: "Title",
						// 			validation: "required",
						// 		},
						// 	],
						// },
						// { display: "stakeholders", value: "automatic" },
				// 		{
				// 			display: "budget",
				// 			otherFields: [
				// 				{ fieldName: 'WFModuleCode', value: 'VROCRProject' },
				// 				{ fieldName: 'WFStage', value: 'VROCRProject01' },
				// 				// { fieldName: 'DraftStatus', value: 'draft' },
				// 			],
				// 			value: "manual",
				// 			fields: [
				// 				{
				// 					listName: "",
				// 					label: "طلب تغيير الميزانية",
				// 					labelEn: "Budget Change Request",
				// 					description: "التفاصيل",
				// 					descriptionEn: "Details",
				// 					//
				// 					InternalName: "",
				// 					DisplayName: "تفاصيل طلب التغيير",
				// 					DisplayNameEn: "Change Request Details",
				// 					type: "multiline",
				// 				},
				// 			],
				// 		},
				// 		{ display: "projectseparation", value: "automatic",	
				// 		otherFields: [
				// 			{ fieldName: 'WFModuleCode', value: 'VROCRProject' },
				// 			{ fieldName: 'WFStage', value: 'VROCRProject01' },
				// 			// { fieldName: 'DraftStatus', value: 'draft' },
				// 		], },
				// 		// {
				// 		// 	display: "projecthold",
				// 		// 	value: "automatic",
				// 		// 	fields: [
				// 		// 		{
				// 		// 			InternalName: "Status",
				// 		// 			DisplayName: "حالة المشروع",
				// 		// 			DisplayNameEn: "Project Status",
				// 		// 			type: "dropdownValues",
				// 		// 			validation: "required",
				// 		// 			options: {
				// 		// 				choices: [{ value: "cancelled", display: "cancelled" }],
				// 		// 			},
				// 		// 		},
				// 		// 	],
				// 		// },
				// 		{
				// 			display: "pattr40",
				// 			otherFields: [
				// 				{ fieldName: 'WFModuleCode', value: 'VROCRProject' },
				// 				{ fieldName: 'WFStage', value: 'VROCRProject01' },
				// 				// { fieldName: 'DraftStatus', value: 'draft' },
				// 			],
				// 			value: "automatic",
				// 			fields: [
				// 				{
				// 					listName: "Projects",
				// 					label: "المشروع",
				// 					labelEn: "Project",
				// 					description: "",
				// 					descriptionEn: "",
				// 					InternalName: "BaselineStartDate",
				// 					DisplayName: "تاريخ بدء الأساس",
				// 					DisplayNameEn: "Baseline Start Date",
				// 					type: "datetime",
				// 					max: "BaselineFinishDate",
				// 				},
				// 				{
				// 					listName: "Projects",
				// 					label: "المشروع",
				// 					labelEn: "Project",
				// 					description: "",
				// 					descriptionEn: "",
				// 					InternalName: "BaselineFinishDate",
				// 					DisplayName: "تاريخ إنهاء الأساس",
				// 					DisplayNameEn: "Baseline Finish Date",
				// 					type: "datetime",
				// 					min: "BaselineStartDate",
				// 				},
				// 			],
				// 		},
				// 		{
				// 			display: "range",
				// 			otherFields: [
				// 				{ fieldName: 'WFModuleCode', value: 'VROCRProject' },
				// 				{ fieldName: 'WFStage', value: 'VROCRProject01' },
				// 				// { fieldName: 'DraftStatus', value: 'draft' },
				// 			],
				// 			value: "automatic",
				// 			fields: [
				// 				{
				// 					listName: "Projects",
				// 					label: "المشروع",
				// 					labelEn: "Project",
				// 					description: "",
				// 					descriptionEn: "",
				// 					InternalName: "ScopeOfWork",
				// 					DisplayName: "نطاق العمل",
				// 					DisplayNameEn: "ScopeOfWork",
				// 					type: "multiline",
				// 					validation: "required",
				// 					maxchar: 5000,
				// 				},
				// 			],
				// 		},
				// 		{
				// 			display: "contract",
				// 			otherFields: [
				// 				{ fieldName: 'WFModuleCode', value: 'VROCRProject' },
				// 				{ fieldName: 'WFStage', value: 'VROCRProject01' },
				// 				// { fieldName: 'DraftStatus', value: 'draft' },
				// 			],
				// 			value: "manual",
				// 			fields: [
				// 				{
				// 					listName: "",
				// 					InternalName: "",
				// 					DisplayName: "تفاصيل طلب التغيير",
				// 					DisplayNameEn: "Change Request Details",
				// 					type: "multiline",
				// 				},
				// 			],
				// 		},
				// 		{ display: "implementationconsultant", value: "automatic",	otherFields: [
				// 			{ fieldName: 'WFModuleCode', value: 'VROCRProject' },
				// 			{ fieldName: 'WFStage', value: 'VROCRProject01' },
				// 			// { fieldName: 'DraftStatus', value: 'draft' },
				// 		], },
				// 		{
				// 			display: "others",
				// 			otherFields: [
				// 				{ fieldName: 'WFModuleCode', value: 'VROCRProject' },
				// 				{ fieldName: 'WFStage', value: 'VROCRProject01' },
				// 				// { fieldName: 'DraftStatus', value: 'draft' },
				// 			],
				// 			value: "manual",
				// 			fields: [
				// 				{
				// 					listName: "",
				// 					InternalName: "",
				// 					DisplayName: "تفاصيل طلب التغيير",
				// 					DisplayNameEn: "Change Request Details",
				// 					type: "multiline",
				// 				},
				// 			],
				// 		},
				// 		{ display: "deletion", value: "delete",
				// 		otherFields: [
				// 			{ fieldName: 'WFModuleCode', value: 'VROCRProject' },
				// 			{ fieldName: 'WFStage', value: 'VROCRProject01' },
				// 			// { fieldName: 'DraftStatus', value: 'draft' },
				// 		], }
					],
				},
			},
			{
				InternalName: "UpdateType",
				DisplayName: "نوع طلب التغيير",
				DisplayNameEn: "Change Request Type",
				display: "none",
				customCr: true,
				ToggleName: "lmsprojectsUpdateType",
				type: "dropdownValues",
				
				options: {
					choices: [
						{
							display: "generalchange",
							value: "automatic",
							//
							fields: [
								{
									InternalName: "getall",
								},

							],otherFields: [
								{ fieldName: 'WFModuleCode', value: 'LMSCRProject' },
								{ fieldName: 'WFStage', value: 'LMSCRProject01' },
								// { fieldName: 'DraftStatus', value: 'draft' },
							],
						},
						{
							display: "deletion", value: "delete",
							otherFields: [
								{ fieldName: 'WFModuleCode', value: 'LMSCRProject' },
								{ fieldName: 'WFStage', value: 'LMSCRProject01' },
								// { fieldName: 'DraftStatus', value: 'draft' },
							],
						}
						// {
						// 	display: "baseline",
						// 	value: "manual",
						// 	//
						// 	fields: [
						// 		{
						// 			listName: "Projects",
						// 			label: "المشروع",
						// 			labelEn: "Project",
						// 			description: "",
						// 			descriptionEn: "",
						// 			//
						// 			InternalName: "Baseline",
						// 			DisplayName: "خط الأساس",
						// 			DisplayNameEn: "Baseline",
						// 			type: "datetime",
						// 		},

						// 	],
						// },
						// {
						// 	display: "performanceindicators",
						// 	value: "automatic",
						// 	fields: [
						// 		{
						// 			listName: "ProjectsGoalsAndKPIs",
						// 			label: "بيانات هدف المشروع ",
						// 			labelEn: "Goal  Data",
						// 			description: "التفاصيل",
						// 			descriptionEn: "Details",
						// 			//
						// 			InternalName: "ProjectKPI",
						// 			DisplayNameEn: "Project KPI",
						// 			DisplayName: "مؤشر المشروع ",
						// 			type: "lookup",
						// 			source: "MainKPI",
						// 			Dispfieldkey: "Name",
						// 			valfieldkey: "Title",
						// 			validation: "required",
						// 		},
						// 	],
						// },
						// { display: "stakeholders", value: "automatic" },
						// {
						// 	display: "budget",
						
						// 	value: "manual",
						// 	fields: [
						// 		{
						// 			listName: "",
						// 			label: "طلب تغيير الميزانية",
						// 			labelEn: "Budget Change Request",
						// 			description: "التفاصيل",
						// 			descriptionEn: "Details",
						// 			//
						// 			InternalName: "",
						// 			DisplayName: "تفاصيل طلب التغيير",
						// 			DisplayNameEn: "Change Request Details",
						// 			type: "multiline",
						// 		},
						// 	],
						// },
						// { display: "projectseparation", value: "automatic",otherFields: [
						// 	{ fieldName: 'WFModuleCode', value: 'LMSCRProject' },
						// 	{ fieldName: 'WFStage', value: 'LMSCRProject01' },
						// 	// { fieldName: 'DraftStatus', value: 'draft' },
						// ], },
						// // {
						// // 	display: "projecthold",
						// // 	value: "automatic",
						// // 	fields: [
						// // 		{
						// // 			InternalName: "Status",
						// // 			DisplayName: "حالة المشروع",
						// // 			DisplayNameEn: "Project Status",
						// // 			type: "dropdownValues",
						// // 			validation: "required",
						// // 			options: {
						// // 				choices: [{ value: "cancelled", display: "cancelled" }],
						// // 			},
						// // 		},
						// // 	],
						// // },
						// {
						// 	display: "pattr40",
						// 	otherFields: [
						// 		{ fieldName: 'WFModuleCode', value: 'LMSCRProject' },
						// 		{ fieldName: 'WFStage', value: 'LMSCRProject01' },
						// 		// { fieldName: 'DraftStatus', value: 'draft' },
						// 	],
						// 	value: "automatic",
						// 	fields: [
						// 		{
						// 			listName: "Projects",
						// 			label: "المشروع",
						// 			labelEn: "Project",
						// 			description: "",
						// 			descriptionEn: "",
						// 			InternalName: "BaselineStartDate",
						// 			DisplayName: "تاريخ بدء الأساس",
						// 			DisplayNameEn: "Baseline Start Date",
						// 			type: "datetime",
						// 			max: "BaselineFinishDate",
						// 		},
						// 		{
						// 			listName: "Projects",
						// 			label: "المشروع",
						// 			labelEn: "Project",
						// 			description: "",
						// 			descriptionEn: "",
						// 			InternalName: "BaselineFinishDate",
						// 			DisplayName: "تاريخ إنهاء الأساس",
						// 			DisplayNameEn: "Baseline Finish Date",
						// 			type: "datetime",
						// 			min: "BaselineStartDate",
						// 		},
						// 	],
						// },
						// {
						// 	display: "range",
						// 	otherFields: [
						// 		{ fieldName: 'WFModuleCode', value: 'LMSCRProject' },
						// 		{ fieldName: 'WFStage', value: 'LMSCRProject01' },
						// 		// { fieldName: 'DraftStatus', value: 'draft' },
						// 	],
						// 	value: "automatic",
						// 	fields: [
						// 		{
						// 			listName: "Projects",
						// 			label: "المشروع",
						// 			labelEn: "Project",
						// 			description: "",
						// 			descriptionEn: "",
						// 			InternalName: "ScopeOfWork",
						// 			DisplayName: "نطاق العمل",
						// 			DisplayNameEn: "ScopeOfWork",
						// 			type: "multiline",
						// 			validation: "required",
						// 			maxchar: 5000,
						// 		},
						// 	],
						// },
						// {
						// 	display: "contract",
						// 	otherFields: [
						// 		{ fieldName: 'WFModuleCode', value: 'LMSCRProject' },
						// 		{ fieldName: 'WFStage', value: 'LMSCRProject01' },
						// 		// { fieldName: 'DraftStatus', value: 'draft' },
						// 	],
						// 	value: "manual",
						// 	fields: [
						// 		{
						// 			listName: "",
						// 			InternalName: "",
						// 			DisplayName: "تفاصيل طلب التغيير",
						// 			DisplayNameEn: "Change Request Details",
						// 			type: "multiline",
						// 		},
						// 	],
						// },
						// { display: "implementationconsultant", value: "automatic",
						// otherFields: [
						// 	{ fieldName: 'WFModuleCode', value: 'LMSCRProject' },
						// 	{ fieldName: 'WFStage', value: 'LMSCRProject01' },
						// 	// { fieldName: 'DraftStatus', value: 'draft' },
						// ], },
						// {
						// 	display: "others",
						// 	otherFields: [
						// 		{ fieldName: 'WFModuleCode', value: 'LMSCRProject' },
						// 		{ fieldName: 'WFStage', value: 'LMSCRProject01' },
						// 		// { fieldName: 'DraftStatus', value: 'draft' },
						// 	],
						// 	value: "manual",
						// 	fields: [
						// 		{
						// 			listName: "",
						// 			InternalName: "",
						// 			DisplayName: "تفاصيل طلب التغيير",
						// 			DisplayNameEn: "Change Request Details",
						// 			type: "multiline",
						// 		},
						// 	],
						// },
						// { display: "deletion", value: "delete",
						// otherFields: [
						// 	{ fieldName: 'WFModuleCode', value: 'LMSCRProject' },
						// 	{ fieldName: 'WFStage', value: 'LMSCRProject01' },
						// 	// { fieldName: 'DraftStatus', value: 'draft' },
						// ], }
					],
				},
			},
			{
				InternalName: "UpdateType",
				DisplayName: "نوع طلب التغيير",
				DisplayNameEn: "Change Request Type",
				display: "none",
				customCr: true,
				ToggleName: "epmoprojectsUpdateType",
				
				type: "dropdownValues",
				options: {
					choices: [
						{
							display: "generalchange",
							value: "automatic",
							//
							fields: [
								{
									InternalName: "getall",
								},

							], otherFields: [
								{ fieldName: 'WFModuleCode', value: 'EPMOCRProject' },
								{ fieldName: 'WFStage', value: 'EPMOCRProject01' },
							]
						},
						{
							display: "deletion", value: "delete",
							otherFields: [
								{ fieldName: 'WFModuleCode', value: 'EPMOCRProject' },
								{ fieldName: 'WFStage', value: 'EPMOCRProject01' },
							]
						}
						// {
						// 	display: "baseline",
						// 	value: "manual",
						// 	//
						// 	fields: [
						// 		{
						// 			listName: "Projects",
						// 			label: "المشروع",
						// 			labelEn: "Project",
						// 			description: "",
						// 			descriptionEn: "",
						// 			//
						// 			InternalName: "Baseline",
						// 			DisplayName: "خط الأساس",
						// 			DisplayNameEn: "Baseline",
						// 			type: "datetime",
						// 		},

						// 	],
						// },
						// {
						// 	display: "performanceindicators",
						// 	value: "automatic",
						// 	fields: [
						// 		{
						// 			listName: "ProjectsGoalsAndKPIs",
						// 			label: "بيانات هدف المشروع ",
						// 			labelEn: "Goal  Data",
						// 			description: "التفاصيل",
						// 			descriptionEn: "Details",
						// 			//
						// 			InternalName: "ProjectKPI",
						// 			DisplayNameEn: "Project KPI",
						// 			DisplayName: "مؤشر المشروع ",
						// 			type: "lookup",
						// 			source: "MainKPI",
						// 			Dispfieldkey: "Name",
						// 			valfieldkey: "Title",
						// 			validation: "required",
						// 		},
						// 	],
						// },
						// { display: "stakeholders", value: "automatic" },
						// {
						// 	display: "budget",
						// 	value: "manual",
						// 	fields: [
						// 		{
						// 			listName: "",
						// 			label: "طلب تغيير الميزانية",
						// 			labelEn: "Budget Change Request",
						// 			description: "التفاصيل",
						// 			descriptionEn: "Details",
						// 			//
						// 			InternalName: "",
						// 			DisplayName: "تفاصيل طلب التغيير",
						// 			DisplayNameEn: "Change Request Details",
						// 			type: "multiline",
						// 		},
						// 	],otherFields: [
						// 		{ fieldName: 'WFModuleCode', value: 'EPMOCRProject' },
						// 		{ fieldName: 'WFStage', value: 'EPMOCRProject01' },
						// 		// { fieldName: 'DraftStatus', value: 'draft' },
						// 	],
						// },
						// { display: "projectseparation", value: "automatic", otherFields: [
						// 	{ fieldName: 'WFModuleCode', value: 'EPMOCRProject' },
						// 	{ fieldName: 'WFStage', value: 'EPMOCRProject01' },
						// 	// { fieldName: 'DraftStatus', value: 'draft' },
						// ],},
						// // {
						// // 	display: "projecthold",
						// // 	value: "automatic",
						// // 	fields: [
						// // 		{
						// // 			InternalName: "Status",
						// // 			DisplayName: "حالة المشروع",
						// // 			DisplayNameEn: "Project Status",
						// // 			type: "dropdownValues",
						// // 			validation: "required",
						// // 			options: {
						// // 				choices: [{ value: "cancelled", display: "cancelled" }],
						// // 			},
						// // 		},
						// // 	],
						// // },
						// {
						// 	display: "pattr40",
						// 	value: "automatic",
						// 	otherFields: [
						// 		{ fieldName: 'WFModuleCode', value: 'EPMOCRProject' },
						// 		{ fieldName: 'WFStage', value: 'EPMOCRProject01' },
						// 		// { fieldName: 'DraftStatus', value: 'draft' },
						// 	],
						// 	fields: [
						// 		{
						// 			listName: "Projects",
						// 			label: "المشروع",
						// 			labelEn: "Project",
						// 			description: "",
						// 			descriptionEn: "",
						// 			InternalName: "BaselineStartDate",
						// 			DisplayName: "تاريخ بدء الأساس",
						// 			DisplayNameEn: "Baseline Start Date",
						// 			type: "datetime",
						// 			max: "BaselineFinishDate",
						// 		},
						// 		{
						// 			listName: "Projects",
						// 			label: "المشروع",
						// 			labelEn: "Project",
						// 			description: "",
						// 			descriptionEn: "",
						// 			InternalName: "BaselineFinishDate",
						// 			DisplayName: "تاريخ إنهاء الأساس",
						// 			DisplayNameEn: "Baseline Finish Date",
						// 			type: "datetime",
						// 			min: "BaselineStartDate",
						// 		},
						// 	],
						// },
						// {
						// 	display: "range",
						// 	value: "automatic",
						// 	otherFields: [
						// 		{ fieldName: 'WFModuleCode', value: 'EPMOCRProject' },
						// 		{ fieldName: 'WFStage', value: 'EPMOCRProject01' },
						// 		// { fieldName: 'DraftStatus', value: 'draft' },
						// 	],
						// 	fields: [
						// 		{
						// 			listName: "Projects",
						// 			label: "المشروع",
						// 			labelEn: "Project",
						// 			description: "",
						// 			descriptionEn: "",
						// 			InternalName: "ScopeOfWork",
						// 			DisplayName: "نطاق العمل",
						// 			DisplayNameEn: "ScopeOfWork",
						// 			type: "multiline",
						// 			validation: "required",
						// 			maxchar: 5000,
						// 		},
						// 	],
						// },
						// {
						// 	display: "contract",
						// 	otherFields: [
						// 		{ fieldName: 'WFModuleCode', value: 'EPMOCRProject' },
						// 		{ fieldName: 'WFStage', value: 'EPMOCRProject01' },
						// 		// { fieldName: 'DraftStatus', value: 'draft' },
						// 	],
						// 	value: "manual",
						// 	fields: [
						// 		{
						// 			listName: "",
						// 			InternalName: "",
						// 			DisplayName: "تفاصيل طلب التغيير",
						// 			DisplayNameEn: "Change Request Details",
						// 			type: "multiline",
						// 		},
						// 	],
						// },
						// { display: "implementationconsultant", value: "automatic",
						// otherFields: [
						// 	{ fieldName: 'WFModuleCode', value: 'EPMOCRProject' },
						// 	{ fieldName: 'WFStage', value: 'EPMOCRProject01' },
						// 	// { fieldName: 'DraftStatus', value: 'draft' },
						// ], },
						// {
						// 	display: "others",
						// 	value: "manual",
						// 	otherFields: [
						// 		{ fieldName: 'WFModuleCode', value: 'EPMOCRProject' },
						// 		{ fieldName: 'WFStage', value: 'EPMOCRProject01' },
						// 		// { fieldName: 'DraftStatus', value: 'draft' },
						// 	],
						// 	fields: [
						// 		{
						// 			listName: "",
						// 			InternalName: "",
						// 			DisplayName: "تفاصيل طلب التغيير",
						// 			DisplayNameEn: "Change Request Details",
						// 			type: "multiline",
						// 		},
						// 	],
						// },
						// { display: "deletion", value: "delete",
						// otherFields: [
						// 	{ fieldName: 'WFModuleCode', value: 'EPMOCRProject' },
						// 	{ fieldName: 'WFStage', value: 'EPMOCRProject01' },
						// 	// { fieldName: 'DraftStatus', value: 'draft' },
						// ], }
					],
				},
			},

			{
				InternalName: "InitiativeCode",
				DisplayName: " المبادرة المرتبطة",
				DisplayNameEn: "Related Initiative",
				listKey: "initiatives",
				display: "none",
				type: "lookup",
				ToggleName: "InitiativeCode",
				customCr: true,
				//from other list:ma
				source: "Initiatives",
				Dispfieldkey: "Name",
				valfieldkey: "Title",
				validation: "required",
				useAccessPolicy: true
			},
			{
				InternalName: "UpdateType",
				DisplayName: "نوع طلب التغيير",
				DisplayNameEn: "Change Request Type",
				display: "none",
				customCr: true,
				ToggleName: "strategicinitiativesUpdateType",
				type: "dropdownValues",
				options: {
					choices: [
						{
							display: "generalchange",
							value: "automatic",
							//
							fields: [
								{
									InternalName: "getall",
								},

							], otherFields: [
								{ fieldName: 'WFModuleCode', value: 'LMSCRInitiative' },
								{ fieldName: 'WFStage', value: 'LMSCRInitiative01' },
							]
						},
						{
							display: "deletion", value: "delete",
							otherFields: [
								{ fieldName: 'WFModuleCode', value: 'LMSCRInitiative' },
								{ fieldName: 'WFStage', value: 'LMSCRInitiative01' },
							]
						}
					],
				},
			},
			{
				InternalName: "UpdateType",
				DisplayName: "نوع طلب التغيير",
				DisplayNameEn: "Change Request Type",
				display: "none",
				customCr: true,
				ToggleName: "vroinitiativesUpdateType",
				type: "dropdownValues",
				options: {
					choices: [
						{
							display: "generalchange",
							value: "automatic",
							//
							fields: [
								{
									InternalName: "getall",
								},

							], otherFields: [
								{ fieldName: 'WFModuleCode', value: 'VROCRInitiative' },
								{ fieldName: 'WFStage', value: 'VROCRInitiative01' },
							]
						},
						{ display: "deletion", value: "delete" }
					],
				},
			},
			{
				InternalName: "UpdateType",
				DisplayName: "نوع طلب التغيير",
				DisplayNameEn: "Change Request Type",
				display: "none",
				customCr: true,
				ToggleName: "lmsinitiativesUpdateType",
				type: "dropdownValues",
				options: {
					choices: [
						{
							display: "generalchange",
							value: "automatic",
							//
							fields: [
								{
									InternalName: "getall",
								},

							], otherFields: [
								{ fieldName: 'WFModuleCode', value: 'LMSCRInitiative' },
								{ fieldName: 'WFStage', value: 'LMSCRInitiative01' },
							]
						},
						{ display: "deletion", value: "delete" }
					],
				},
			},
			{
				InternalName: "UpdateType",
				DisplayName: "نوع طلب التغيير",
				DisplayNameEn: "Change Request Type",
				display: "none",
				customCr: true,
				ToggleName: "initiativeUpdateType",
				type: "dropdownValues",
				options: {
					choices: [
						{
							display: "generalchange",
							value: "automatic",
							//
							fields: [
								{
									InternalName: "getall",
								},

							],
						},
						{ display: "deletion", value: "delete" }
					],
				},
			},
			{
				//startegy
				InternalName: "CRRelatedStrategyObjective",
				DisplayNameEn: "Related Objective",
				DisplayName: "الهدف  المرتبط ",
				listKey: "sos",//hada al wizara  هدف الوزارة =
				// ToggleName: "RelatedMainObjective",
				display: "none",
				customCr: true,
				ToggleName: "CRRelatedStrategyObjective",
				type: "lookup",
				source: "SOs",
				Dispfieldkey: "Name",
				valfieldkey: "Title",
				// dontSubmit: true,
				useAccessPolicy: true
				// dynamic: 'moduleSelect',
				// filterField: 'Types',
				// filterFieldType: 'Text',
			},

			{
				//StrategicObjectives
				InternalName: "UpdateType",
				DisplayName: "نوع طلب التغيير",
				DisplayNameEn: "Change Request Type",
				display: "none",
				customCr: true,
				ToggleName: "strategicbjectivesUpdateType",
				type: "dropdownValues",
				options: {
					choices: [
						{
							display: "generalchange",
							value: "automatic",
							//
							fields: [
								{
									InternalName: "getall",

								},

							],
							otherFields: [
								{ fieldName: 'WFModuleCode', value: 'MSCRObjective' },
								{ fieldName: 'WFStage', value: 'MSCRSOS01' },
								// { fieldName: 'DraftStatus', value: 'draft' },
							],
						},
						{
							display: "deletion", value: "delete",
							otherFields: [
								{ fieldName: 'WFModuleCode', value: 'MSCRObjective' },
								{ fieldName: 'WFStage', value: 'MSCRSOS01' },
								// { fieldName: 'DraftStatus', value: 'draft' },
							],
						}
					],
				},
			},
			{
				//Vision Objective
				InternalName: "UpdateType",
				DisplayName: "نوع طلب التغيير",
				DisplayNameEn: "Change Request Type",
				display: "none",
				customCr: true,
				ToggleName: "visionobjectivesUpdateType",
				type: "dropdownValues",
				options: {
					choices: [
						{
							display: "generalchange",
							value: "automatic",
							//
							fields: [
								{
									InternalName: "getall",
								},

							], otherFields: [
								{ fieldName: 'WFModuleCode', value: 'VROCRObjective' },
								{ fieldName: 'WFStage', value: 'VROCRSOS01' },
								// { fieldName: 'DraftStatus', value: 'draft' },
							],
						},
						{
							display: "deletion", value: "delete",
							otherFields: [
								{ fieldName: 'WFModuleCode', value: 'VROCRObjective' },
								{ fieldName: 'WFStage', value: 'VROCRSOS01' },
								// { fieldName: 'DraftStatus', value: 'draft' },
							],
						}
					],
				},
			},
			{
				//Vision Objective
				InternalName: "UpdateType",
				DisplayName: "نوع طلب التغيير",
				DisplayNameEn: "Change Request Type",
				display: "none",
				customCr: true,
				ToggleName: "lmsobjectivesUpdateType",
				type: "dropdownValues",
				options: {
					choices: [
						{
							display: "generalchange",
							value: "automatic",
							//
							fields: [
								{
									InternalName: "getall",
								},

							], otherFields: [
								{ fieldName: 'WFModuleCode', value: 'LMSCRObjective' },
								{ fieldName: 'WFStage', value: 'LMSCRSOS01' },
								// { fieldName: 'DraftStatus', value: 'draft' },
							],
						},
						{
							display: "deletion", value: "delete",
							otherFields: [
								{ fieldName: 'WFModuleCode', value: 'LMSCRObjective' },
								{ fieldName: 'WFStage', value: 'LMSCRSOS01' },
								// { fieldName: 'DraftStatus', value: 'draft' },
							],
						}
					],
				},
			},
			{
				InternalName: "CRRelatedMainKpis",
				DisplayNameEn: "Related KPI",
				DisplayName: "المؤشر المرتبط",
				listKey: "mainkpi",
				display: "none",
				customCr: true,
				ToggleName: "CRRelatedMainKpis",
				type: "lookup",
				source: "MainKPI",
				Dispfieldkey: "Name",
				valfieldkey: "Title",
				useAccessPolicy: true,
				dontSubmit: true,
			},
			{
				InternalName: "UpdateType",
				DisplayName: "نوع طلب التغيير",
				DisplayNameEn: "Change Request Type",
				display: "none",
				customCr: true,
				ToggleName: "strategickpiUpdateType",
				type: "dropdownValues",
				options: {
					choices: [
						{
							display: "generalchange",
							value: "automatic",
							//
							fields: [
								{
									InternalName: "getall",
								},

							], otherFields: [
								{ fieldName: 'WFModuleCode', value: 'MSCRKPI' },
								{ fieldName: 'WFStage', value: 'MSCRKPI01' },
								// { fieldName: 'DraftStatus', value: 'draft' },
							],
						},
						{
							display: "deletion", value: "delete",
							otherFields: [
								{ fieldName: 'WFModuleCode', value: 'MSCRKPI' },
								{ fieldName: 'WFStage', value: 'MSCRKPI01' },
								// { fieldName: 'DraftStatus', value: 'draft' },
							],
						}
					],
				},
			},
			{
				InternalName: "UpdateType",
				DisplayName: "نوع طلب التغيير",
				DisplayNameEn: "Change Request Type",
				display: "none",
				customCr: true,
				ToggleName: "vrokpiUpdateType",
				type: "dropdownValues",
				options: {
					choices: [
						{
							display: "generalchange",
							value: "automatic",
							//
							fields: [
								{
									InternalName: "getall",
								},

							], otherFields: [
								{ fieldName: 'WFModuleCode', value: 'VROCRKPI' },
								{ fieldName: 'WFStage', value: 'VROCRKPI01' },
								// { fieldName: 'DraftStatus', value: 'draft' },
							],
						},
						{
							display: "deletion", value: "delete",
							otherFields: [
								{ fieldName: 'WFModuleCode', value: 'VROCRKPI' },
								{ fieldName: 'WFStage', value: 'VROCRKPI01' },
								// { fieldName: 'DraftStatus', value: 'draft' },
							],
						}
					],
				},
			},
			{
				InternalName: "UpdateType",
				DisplayName: "نوع طلب التغيير",
				DisplayNameEn: "Change Request Type",
				display: "none",
				customCr: true,
				ToggleName: "lmskpiUpdateType",
				type: "dropdownValues",
				options: {
					choices: [
						{
							display: "generalchange",
							value: "automatic",
							//
							fields: [
								{
									InternalName: "getall",
								},

							], otherFields: [
								{ fieldName: 'WFModuleCode', value: 'LMSCRKPI' },
								{ fieldName: 'WFStage', value: 'LMSCRKPI01' },
								// { fieldName: 'DraftStatus', value: 'draft' },
							],
						},
						{
							display: "deletion", value: "delete",
							otherFields: [
								{ fieldName: 'WFModuleCode', value: 'LMSCRKPI' },
								{ fieldName: 'WFStage', value: 'LMSCRKPI01' },
								// { fieldName: 'DraftStatus', value: 'draft' },
							],
						}
					],
				},
			},
			{
				InternalName: "Requester",
				DisplayName: "مقدم الطلب",
				DisplayNameEn: "Requester",
				type: "picker",
				validation: "required",
			},
			{
				InternalName: "Level",
				DisplayName: "مستوى الاعتماد",
				DisplayNameEn: "Level",
				type: "string",
				validation: "required",
			},
			{
				InternalName: "Description",
				DisplayName: "وصف التغيير",
				DisplayNameEn: "Description",
				type: "multiline",
				maxchar: 5000,
				validation: "required",
			},
			{
				InternalName: "ChangeJustifications0",
				DisplayName: "مبررات التغيير",
				DisplayNameEn: "Change Justifications",
				type: "multiline",
				maxchar: 5000,
				validation: "required",
			},
			//

			// {
			// 	InternalName: "RequestDate",
			// 	DisplayName: "تاريخ الطلب",
			// 	DisplayNameEn: "Request Date",
			// 	type: "datetime",
			// },
			// {
			// 	InternalName: "Priority",
			// 	DisplayName: "الأولوية",
			// 	DisplayNameEn: "Priority",
			// 	type: "dropdownValues",
			// 	options: {
			// 		choices: [
			// 			{ display: "hight", value: "hight" },
			// 			{ display: "medium", value: "medium" },
			// 			{ display: "low", value: "low" },
			// 		],
			// 	},
			// },

			// // {
			// // 	InternalName: "Types",
			// // 	DisplayName: "نوع التغيير",
			// // 	DisplayNameEn: "Types",
			// // 	validation: "required",
			// // 	type: "dropdownValues",
			// // 	options: {
			// // 		choices: [
			// // 			{ display: "baseline", value: "baseline" },
			// // 			{
			// // 				display: "performanceindicators",
			// // 				value: "performanceindicators",
			// // 			},
			// // 			{ display: "stakeholders", value: "stakeholders" },
			// // 			{ display: "budget", value: "budget" },
			// // 			{ display: "projectseparation", value: "projectseparation" },
			// // 			{ display: "projectstatus", value: "projectstatus" },
			// // 			{ display: "durationoftheproject", value: "durationoftheproject" },
			// // 			{ display: "range", value: "range" },
			// // 			{ display: "contract", value: "contract" },
			// // 			{
			// // 				display: "implementationconsultant",
			// // 				value: "implementationconsultant",
			// // 			},
			// // 			{ display: "projectintegration", value: "projectintegration" },
			// // 			{ display: "others", value: "others" },
			// // 		],
			// // 	},
			// // },

			// {
			// 	InternalName: "ImpactOftheChange",
			// 	DisplayName: "أثر التغيير",
			// 	DisplayNameEn: "Impact of the Change",
			// 	type: "multiline",
			// 	maxchar: 5000,
			// },
			// {
			// 	InternalName: "Status",
			// 	DisplayName: "الحالة",
			// 	DisplayNameEn: "Status",
			// 	type: "dropdownValues",
			// 	options: {
			// 		choices: [
			// 			{ display: "closed", value: "closed" },
			// 			{ display: "open", value: "open", selected: "selected" },
			// 		],
			// 	},
			// },

			// {
			// 	InternalName: "Days",
			// 	DisplayName: "الايام",
			// 	DisplayNameEn: "Days",
			// 	type: "float",
			// },
			// {
			// 	InternalName: "ChangeManagementStatus",
			// 	DisplayName: " الحاجة إلى إدارة التغيير",
			// 	DisplayNameEn: "ChangeManagementStatus",
			// 	type: "string",
			// },
			// {
			// 	InternalName: "NeedforChangeManagement",
			// 	DisplayName: " حالة إدارة التغيير",
			// 	DisplayNameEn: "Need for Change Management",
			// 	type: "string",
			// },
			// {
			// 	InternalName: "Challenges_CorrectiveActions",
			// 	DisplayName: "التحدّيات والخطوات التصحيحية من جانب إدارة التغيير",
			// 	DisplayNameEn: "Challenges_CorrectiveActions",
			// 	type: "string",
			// },
			// {
			// 	InternalName: "ChangeProcessPartner",
			// 	DisplayName: "شريك اعمال التغيير",
			// 	DisplayNameEn: "Change Process Partner",
			// 	type: "picker",
			// },
			// {
			// 	InternalName: "ChangeManagementPartner",
			// 	DisplayName: " شريك أعمال إدارة التغيير",
			// 	DisplayNameEn: "Change Management Partner",
			// 	type: "picker",
			// },
			// {
			// 	InternalName: "ChangeManagementUpdateDate",
			// 	DisplayName: "تاريخ تحديث معلومات إدارة التغيير",
			// 	DisplayNameEn: "Change Management Update Date",
			// 	type: "datetime",
			// },
			// {
			// 	InternalName: "ChangeManagementGoals",
			// 	DisplayName: "اهداف إدارة التغيير في المشروع",
			// 	DisplayNameEn: "Change Management Goals",
			// 	type: "multiline",
			// },
			// {
			// 	InternalName: "ChangeManagementRequirements",
			// 	DisplayName: "متطّلبات إدارة التغيير",
			// 	DisplayNameEn: "Change Management Requirements",
			// 	type: "multiline",
			// },
			// {
			// 	InternalName: "ChngMngmntRequirementsStatus",
			// 	DisplayName: " حالة تحقق متطّلبات إدارة التغيير ",
			// 	DisplayNameEn: "Change Management Requirements Status",
			// 	type: "string",
			// },

			// {
			// 	InternalName: "SubmitForApproval",
			// 	DisplayName: "ارسال للموافقة",
			// 	DisplayNameEn: "Submit For Approval",
			// 	type: "dropdownValues",
			// 	options: {
			// 		choices: [
			// 			{ display: "yes", value: "yes" },
			// 			{ display: "no", value: "no" },
			// 		],
			// 	},
			// },
			// {
			// 	InternalName: "ImpactOn",
			// 	DisplayName: "مجال التغيير",
			// 	DisplayNameEn: "Impact On",
			// 	type: "dropdownValues",
			// 	options: {
			// 		choices: [
			// 			{ display: "budget", value: "budget" },
			// 			{ display: "scopeofwork", value: "scopeofwork" },
			// 			{ display: "others", value: "others" },
			// 		],
			// 	},
			// },
			// {
			// 	InternalName: "ImpactOnScope",
			// 	DisplayName: "التأثير على المشروع (نطاق العمل)",
			// 	DisplayNameEn: "Impact on Project Scope",
			// 	type: "multiline",
			// 	maxchar: 5000,
			// },
			// {
			// 	InternalName: "ImpactOnDuration",
			// 	DisplayName: "التأثير على المشروع (مدة المشروع)",
			// 	DisplayNameEn: "Impact on Project Duration",
			// 	type: "dropdownValues",
			// 	options: {
			// 		choices: [
			// 			{ display: "contractstartdate", value: "contractstartdate" },
			// 			{ display: "contractenddate", value: "contractenddate" },
			// 			{ display: "extensionperiod", value: "extensionperiod" },
			// 			{
			// 				display: "contractperiodbeforeamendment",
			// 				value: "contractperiodbeforeamendment",
			// 			},
			// 			{
			// 				display: "contracttermafteramendment",
			// 				value: "contracttermafteramendment",
			// 			},
			// 		],
			// 	},
			// },
			// {
			// 	InternalName: "ImpactOnCost",
			// 	DisplayName: "التأثير على المشروع (التكلفة)",
			// 	DisplayNameEn: "Impact on Project Cost",
			// 	type: "dropdownValues",
			// 	options: {
			// 		choices: [
			// 			{
			// 				display: "originalcontractvalue",
			// 				value: "originalcontractvalue",
			// 			},
			// 			{ display: "canceledstages", value: "canceledstages" },
			// 			{ display: "increasepercentage", value: "increasepercentage" },
			// 			{ display: "finalcontractvalue", value: "finalcontractvalue" },
			// 		],
			// 	},
			// },
			// {
			// 	InternalName: "OtherImpact",
			// 	DisplayName: "التأثير على المشروع (أخرى)",
			// 	DisplayNameEn: "Impact on Project (Other)",
			// 	type: "multiline",
			// 	maxchar: 5000,
			// },
			// {
			// 	InternalName: "ImpactIfNoChange",
			// 	DisplayName: "الآثار المترتبة في حال عدم قيام التغيير",
			// 	DisplayNameEn: "Impact of not applying the change",
			// 	type: "multiline",
			// 	maxchar: 5000,
			// },
			// {
			// 	InternalName: "ChangeImplementedOn",
			// 	DisplayName: "تم تنفيذ التغيير في",
			// 	DisplayNameEn: "Change Implemented On",
			// 	type: "datetime",
			// },
			// {
			// 	InternalName: "ChangeImplementedBy",
			// 	DisplayName: "تم تنفيذ التغيير بواسطة",
			// 	DisplayNameEn: "Change Implemented By",
			// 	type: "picker",
			// },
			// {
			// 	InternalName: "AssignedTo",
			// 	DisplayName: "مخصص إلى",
			// 	DisplayNameEn: "Assigned To",
			// 	type: "picker",
			// },
			// {
			// 	InternalName: "DateResolved",
			// 	DisplayName: "تاريخ تنفيذالحل",
			// 	DisplayNameEn: "Date Resolved",
			// 	type: "datetime",
			// },
			// {
			// 	InternalName: "RequestStatus",
			// 	DisplayName: "حالة الطلب",
			// 	DisplayNameEn: "Request Status",
			// 	type: "dropdownValues",
			// 	options: {
			// 		choices: [
			// 			{ display: "completed", value: "completed" },
			// 			{ display: "rejected", value: "rejected" },
			// 			{ display: "ongoing", value: "ongoing" },
			// 		],
			// 	},
			// },
			// {
			// 	InternalName: "ResolutionComments",
			// 	DisplayName: "تعليقات حول القرار",
			// 	DisplayNameEn: "Resolution Comments",
			// 	type: "multiline",
			// 	maxchar: 5000,
			// },
		],
	},
	
	// {
	// 	label: 'الدراسات الخاصة بطلب التغيير ',
	// 	labelEn: 'Change Requests Studies',
	// 	description: "التفاصيل",
	// 	descriptionEn: "Details",
	// 	sectiontype: "master",
	// 	layout:"table",targetlist: "ChangeRequestsStudies",
	// 	subFields: [
	// 		// {
	// 		//     "InternalName": "Title",
	// 		//     "DisplayName":"الرمز",
	// 		//     "type":"string"
	// 		// },
	// 		{
	// 			"InternalName": "CannotQuickTrack",
	// 			"DisplayName": "لا يمكن عمل مسار سريع",
	// 			"DisplayNameEn": "Cannot Quick Track",
	// 			"type": "yesnoradio",
	// 			      options: {
	// 				choices: [
	// 					{ display: 'yes', value: 'yes' },
	// 					{ display: 'no', value: 'no' }
	// 				]
	// 			}

	// 		},
	// 		{
	// 			"InternalName": "CannotDecreaseDuration",
	// 			"DisplayName": "لا يمكن تقليل مدة الكراسة",
	// 			"DisplayNameEn": "Cannot Decrease Duration",
	// 			"type": "yesnoradio",
	// 			      options: {
	// 				choices: [
	// 					{ display: 'yes', value: 'yes' },
	// 					{ display: 'no', value: 'no' }
	// 				]
	// 			}

	// 		},
	// 		{
	// 			"InternalName": "CannotReschedule",
	// 			"DisplayName": "لا يمكن إعادة جدولت التسليمات الرئيسية",
	// 			"DisplayNameEn": "Cannot Reschedule",
	// 			"type": "yesnoradio",
	// 			      options: {
	// 				choices: [
	// 					{ display: 'yes', value: 'yes' },
	// 					{ display: 'no', value: 'no' }
	// 				]
	// 			}

	// 		},
	// 		{
	// 			"InternalName": "CannotDecreaseTasksDuration",
	// 			"DisplayName": "لا يمكن تقليل مدة المهام في المسار الحرج",
	// 			"DisplayNameEn": "Cannot Decrease Tasks Duration",
	// 			"type": "yesnoradio",
	// 			      options: {
	// 				choices: [
	// 					{ display: 'yes', value: 'yes' },
	// 					{ display: 'no', value: 'no' }
	// 				]
	// 			}

	// 		},
	// 		{
	// 			"InternalName": "Others",
	// 			"DisplayName": "أخرى",
	// 			"DisplayNameEn": "Others",
	// 			"type": "string",
	// 		},

	// 		// {
	// 		//     "InternalName": "RelatedCR",
	// 		//     "DisplayName": "طلب التغيير المرتبط",
	// 		//     "DisplayNameEn": "Related CR",
	// 		//     "type": "lookup",
	// 		//     "source": "ChangeRequest",
	// 		//     "Dispfieldkey": "Title",
	// 		//     "valfieldkey": "Title"
	// 		// },
	// 	],
	// },
	// {
	// 	label: 'بيان اثار التغيير المطلوب',
	// 	labelEn: 'Change Requests Impacts',
	// 	description: "التفاصيل",
	// 	descriptionEn: "Details",
	// 	sectiontype: "master",
	// 	layout:"table",targetlist: "ChangeRequestsImpacts",
	// 	subFields: [
	// 		// {
	// 		//     "InternalName": "Title",
	// 		//     "DisplayName":"الرمز",
	// 		//     "type":"string"
	// 		// },
	// 		{
	// 			"InternalName": "ElementsAffectedByChange",
	// 			"DisplayName": "العناصر المتأثرة بالتغيير",
	// 			"DisplayNameEn": "Elements Affected By Change",
	// 			"type": "dropdownValues",
	// 			      options: {
	// 				choices: [
	// 					{ display: 'yes', value: 'yes' },
	// 					{ display: 'no', value: 'no' }
	// 				]
	// 			}

	// 		},
	// 		{
	// 			"InternalName": "Total",
	// 			"DisplayName": "إجمالي الزيادة/ الانخفاض",
	// 			"DisplayNameEn": "Total",
	// 			"type": "float",


	// 		},
	// 		{
	// 			"InternalName": "Baseline",
	// 			"DisplayName": "خط الأساس",
	// 			"DisplayNameEn": "Baseline",
	// 			"type": "datetime"

	// 		},
	// 		{
	// 			"InternalName": "CurrentDate",
	// 			"DisplayName": "الحالي",
	// 			"DisplayNameEn": "Current Date",
	// 			"type": "datetime"

	// 		},
	// 		{
	// 			"InternalName": "NewDate",
	// 			"DisplayName": "الجديد",
	// 			"DisplayNameEn": "New Date",
	// 			"type": "datetime"

	// 		},


	// 		// {
	// 		//     "InternalName": "RelatedCR",
	// 		//     "DisplayName": "طلب التغيير المرتبط",
	// 		//     "DisplayNameEn": "Related CR",
	// 		//     "type": "lookup",
	// 		//     "source": "ChangeRequest",
	// 		//     "Dispfieldkey": "Title",
	// 		//     "valfieldkey": "Title"
	// 		// },
	// 	],
	// },
	// {
	// 	label: '	التسليمات أو المعالم المتأثرة بالتغيير',
	// 	labelEn: 'Impacted Milestones',
	// 	description: "التفاصيل",
	// 	descriptionEn: "Details",
	// 	sectiontype: "master",
	// 	layout:"table",targetlist: "ImpactedMilestones",
	// 	subFields: [
	// 		// {
	// 		//     "InternalName": "Title",
	// 		//     "DisplayName":"الرمز",
	// 		//     "type":"string"
	// 		// },
	// 		{
	// 			"InternalName": "Name",
	// 			"DisplayName": "اسم التسليمة أو المعلم",
	// 			"DisplayNameEn": "Name",
	// 			"type": "string",


	// 		},

	// 		{
	// 			"InternalName": "StartDate",
	// 			"DisplayName": "تاريخ البدء الحالي",
	// 			"DisplayNameEn": "Start Date",
	// 			"type": "datetime"

	// 		},
	// 		{
	// 			"InternalName": "NewStartDate",
	// 			"DisplayName": "تاريخ البدء الجديد",
	// 			"DisplayNameEn": "New Start Date",
	// 			"type": "datetime"

	// 		},
	// 		{
	// 			"InternalName": "FinishDate",
	// 			"DisplayName": "تاريخ الانتهاء الحالي",
	// 			"DisplayNameEn": "Finish Date",
	// 			"type": "datetime"

	// 		},
	// 		{
	// 			"InternalName": "NewFinishDate",
	// 			"DisplayName": "تاريخ الانتهاء الجديد",
	// 			"DisplayNameEn": "New Finish Date",
	// 			"type": "datetime"

	// 		},


	// 		// {
	// 		//     "InternalName": "RelatedCR",
	// 		//     "DisplayName": "طلب التغيير المرتبط",
	// 		//     "DisplayNameEn": "Related CR",
	// 		//     "type": "lookup",
	// 		//     "source": "ChangeRequest",
	// 		//     "Dispfieldkey": "Title",
	// 		//     "valfieldkey": "Title"
	// 		// },
	// 	],
	// },
	// {
	// 	label: 'جدول الكميات',
	// 	labelEn: 'Quantities Table',
	// 	description: "التفاصيل",
	// 	descriptionEn: "Details",
	// 	sectiontype: "master",
	// 	layout:"table",targetlist: "QuantitiesTable",
	// 	subFields: [
	// 		// {
	// 		//     "InternalName": "Title",
	// 		//     "DisplayName":"الرمز",
	// 		//     "type":"string"
	// 		// },
	// 		{
	// 			"InternalName": "Name",
	// 			"DisplayName": "اسم المخرج الحالي حسب جدول الكميات",
	// 			"DisplayNameEn": "Name",
	// 			"type": "string",


	// 		},
	// 		{
	// 			"InternalName": "NewName",
	// 			"DisplayName": "اسم المخرج الجديد",
	// 			"DisplayNameEn": "New Name",
	// 			"type": "string",


	// 		},
	// 		{
	// 			"InternalName": "Number",
	// 			"DisplayName": "العدد",
	// 			"DisplayNameEn": "Number",
	// 			"type": "float",


	// 		},
	// 		{
	// 			"InternalName": "ResultType",
	// 			"DisplayName": "الوحدة",
	// 			"DisplayNameEn": "Result Type",
	// 			"type": "float",


	// 		},
	// 		{
	// 			"InternalName": "Cost",
	// 			"DisplayName": "تكلفة المخرج",
	// 			"DisplayNameEn": "Cost",
	// 			"type": "float",


	// 		},
	// 		{
	// 			InternalName: "IsUniqueOutput",
	// 			DisplayNameEn: "Is Unique Output",
	// 			DisplayName: "هل المخرج له مثيل",
	// 			type: "dropdownValues",
	// 			// validation: "required",
	// 			options: {
	// 			  choices: [
	// 				{ display: "yes", value: "yes" },
	// 				{ display: "no", value: "no" },
	// 				{ display: "noneed", value: "noneed" },
	// 			  ],
	// 			},
	// 		  },
	// 		  {
	// 			"InternalName": "CurrentCost",
	// 			"DisplayName": "التكلفة الاجمالية الحالية",
	// 			"DisplayNameEn": "Current Cost",
	// 			"type": "float",


	// 		},
	// 		  {
	// 			"InternalName": "NewCost",
	// 			"DisplayName": "التكلفة الاجمالية الجديدة",
	// 			"DisplayNameEn": "New Cost",
	// 			"type": "float",


	// 		},



	// 	],
	// },

	// {
	// 	label: "المخاطر ذات العلاقة ",
	// 	labelEn: "Risk Data",
	// 	description: "التفاصيل",
	// 	descriptionEn: "Details",
	// 	sectiontype: "master",
	// 	layout:"table",targetlist: "Risks",
	// 	subFields: [
	// 		// {
	// 		//     "InternalName": "Title",
	// 		//     "DisplayName":"رمز الخطر",
	// 		//     "type":"string",
	// 		//     "validation": "required"
	// 		// },
	// 		{
	// 			InternalName: "Name",
	// 			DisplayName: "اسم الخطر",
	// 			DisplayNameEn: "Risk Name",
	// 			type: "string",
	// 			validation: "required",
	// 		},
	// 		{
	// 			InternalName: "ResolutionPlan",
	// 			DisplayName: "خطة التعامل مع الخطر",
	// 			DisplayNameEn: "Resolution Plan",
	// 			type: "multiline",
	// 			maxchar: 5000,
	// 		},

	// 		{
	// 			InternalName: "Description",
	// 			DisplayName: "وصف الخطر",
	// 			DisplayNameEn: "Description",
	// 			type: "multiline",
	// 			maxchar: 5000,
	// 		},
	// 		// {
	// 		// 	InternalName: "RiskPercentage",
	// 		// 	DisplayName: "نسبة التعرض للخطر ",
	// 		// 	DisplayNameEn: "Risk Percentage",
	// 		// 	type: "float",
	// 		// },


	// 	],
	// },
	// {
	// 	label: 'العوائق',
	// 	labelEn: 'Issues Data',
	// 	description: "التفاصيل",
	// 	descriptionEn: "Details",
	// 	sectiontype: "master",
	// 	layout:"table",targetlist: "Issues",
	// 	subFields: [
	// 		// {
	// 		//     "InternalName": "Title",
	// 		//     "DisplayName":"رمز العائق",
	// 		//     "type":"string",
	// 		//     "validation": "required"
	// 		// },
	// 		{
	// 			"InternalName": "Name",
	// 			"DisplayName": "عنوان العائق",
	// 			"DisplayNameEn": "Issue Name",
	// 			"type": "string",
	// 			"validation": "required"
	// 		},
	// 		{
	// 			"InternalName": "Description",
	// 			"DisplayName": "وصف العائق",
	// 			"DisplayNameEn": "Description",
	// 			"type": "multiline",
	// 			"maxchar": 5000,
	// 		},
	// 		{
	// 			"InternalName": "Priority",
	// 			"DisplayName": "الأولوية",
	// 			"DisplayNameEn": "Priority",
	// 			"type": "dropdownValues",
	// 			options: {
	// 				choices: [
	// 					{ display: 'critical', value: 'critical' },
	// 					{ display: 'hight', value: 'hight' },
	// 					{ display: 'medium', value: 'medium' },
	// 					{ display: 'low', value: 'low' }
	// 				]
	// 			}
	// 		},
	// 		{
	// 			"InternalName": "Resolution",
	// 			"DisplayName": "وصف الحل",
	// 			"DisplayNameEn": "Resolution",
	// 			"type": "multiline",
	// 			"maxchar": 5000,
	// 		},
	// 	]
	// },
	// {
	// 	label: "المرفقات",
	// 	labelEn: "Attachments",
	// 	description: "",
	// 	descriptionEn: "",
	// 	subFields: [
	// 		{
	// 			InternalName: "getfile",
	// 			DisplayName: "المرفقات",
	// 			DisplayNameEn: "Attachments",
	// 			type: "file",
	// 		},
	// 	],
	// },
];
