//export.module = Information_Form ;
//module.exports = Information_Form;
window.Information_Form = [
	{
		label: "بيانات طلب التغيير",
		labelEn: "Change Request Data",
		description: "التفاصيل",
		descriptionEn: "Details",
		subFields: [
			{
				InternalName: "Title",
				DisplayName: "الرمز",
				type: "string",
				validation: "required",
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

			//////////////////////////////////////////////////////////////////////added for cr wf
			{
				InternalName: "moduleSelect",
				DisplayNameEn: "Select Type",
				DisplayName: "اختر النوع",
				validation: "required",
				// dontSubmit: true,
				// display: "none",
				customCr: true,
				type: "dropdownValues",
				options: {
					choices: [

						{
							display: "projects", value: "Projects",

						},
						///// For a



						//--------VRO CR Section -------------
						{
							display: "strategicobjectives", value: "SOs",

						},

						{
							display: "initiatives", value: "Initiatives",

						},

						{
							display: "kpi", value: "MainKPI",

						},
						//-----------End VRO ---------------------------

						//--------LMS CR Section -------------
						{
							display: "strategicobjectives", value: "SOs",
						},

						{
							display: "initiatives", value: "Initiatives",
						},

						{
							display: "kpi", value: "MainKPI",
						},
						//-----------LMS VRO ---------------------------

						//--------EPMO CR Section -------------
						{
							display: "strategicobjectives", value: "SOs",
						},
						{
							display: "initiatives", value: "Initiatives",
						},
						{
							display: "kpi", value: "MainKPI",
						},
						//-----------EPMO VRO ---------------------------
					],
				},
				toggleValues: [
					{ value: "Projects", fields: ["ProjectCode", "projectsUpdateType"] }, //we can put more than 1  field
					{ value: "Initiatives", fields: ["InitiativeCode", "initiativeUpdateType"] }, //we can put more than 1  field
					{
						value: "SOs",
						fields: ["CRRelatedStrategyObjective", "strategicobjectivesUpdateType"],
					}, //we can put more than 1  field
					{ value: "MainKPI", fields: ["CRRelatedMainKpis", "mainkpiUpdateType"] }, //we can put more than 1  field
				],
			},
			// {
			// 	InternalName: "ProjectCode",
			// 	DisplayNameEn: "Related Project",
			// 	DisplayName: "المشروع المرتبط",
			// 	display: "none",
			// 	type: "lookup",
			// 	listKey: "projects",
			// 	ToggleName: "ProjectCode",
			// 	customCr: true,
			// 	source: "Projects",
			// 	Dispfieldkey: "Name",
			// 	valfieldkey: "Title",
			// },
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
			},
			
		
			/////////////////////////////////////////////////////////////////////////////////////////////////////////// end added for cr wf
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
			// {
			// 	InternalName: "Types",
			// 	DisplayName: "نوع التغيير",
			// 	DisplayNameEn: "Types",
			// 	validation: "required",
			// 	type: "dropdownValues",
			// 	options: {
			// 		choices: [
			// 			{ display: "baseline", value: "baseline" },
			// 			{
			// 				display: "performanceindicators",
			// 				value: "performanceindicators",
			// 			},
			// 			{ display: "stakeholders", value: "stakeholders" },
			// 			{ display: "budget", value: "budget" },
			// 			{ display: "projectseparation", value: "projectseparation" },
			// 			{ display: "projectstatus", value: "projectstatus" },
			// 			{ display: "durationoftheproject", value: "durationoftheproject" },
			// 			{ display: "range", value: "range" },
			// 			{ display: "contract", value: "contract" },
			// 			{
			// 				display: "implementationconsultant",
			// 				value: "implementationconsultant",
			// 			},
			// 			{ display: "projectintegration", value: "projectintegration" },
			// 			{ display: "others", value: "others" },
			// 		],
			// 	},
			// },

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
	//     label: 'المرفقات',
	//     labelEn: 'Attachments',
	//     description: "",
	//     descriptionEn: "",
	//     subFields: [{
	//         "InternalName": "getfile",
	//         "DisplayName": "المرفقات",
	//         "DisplayNameEn": "Attachments",
	//         "type": "file"
	//     }]
	// }
];
