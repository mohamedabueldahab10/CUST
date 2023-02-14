//export.module = Information_Form ;
//module.exports = Information_Form;
window.Information_Form = [
    {
        label: 'بيانات طلب التغيير',
        labelEn: 'Change Request Data',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [

            // {
            //     "InternalName": "Title",
            //     "DisplayName":"الرمز",
            //     "type":"string",
            //     "validation": "required"
            // },
            {
                "InternalName": "Requester",
                "DisplayName": "مقدم الطلب",
                "DisplayNameEn": "Requester",
                "type": "picker",
                "validation": "required"
            },
            {
                "InternalName": "RequestDate",
                "DisplayName": "تاريخ الطلب",
                "DisplayNameEn": "Request Date",
                "type": "datetime"
            },
            {
                "InternalName": "Priority",
                "DisplayName": "الأولوية",
                "DisplayNameEn": "Priority",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'hight', value: 'hight' },
                        { display: 'medium', value: 'medium' },
                        { display: 'low', value: 'low' },
                    ]
                }
            },
            // {
            //     "InternalName": "Types",
            //     "DisplayName": "نوع التغيير",
            //     "DisplayNameEn": "Types",
            //     "validation": "required",
            //     "type": "dropdownValues",
            //     options: {
            //         choices: [
            //             { display: 'baseline', value: 'baseline' },
            //             { display: 'performanceindicators', value: 'performanceindicators' },
            //             { display: 'stakeholders', value: 'stakeholders' },
            //             { display: 'budget', value: 'budget' },
            //             { display: 'projectseparation', value: 'projectseparation' },
            //             { display: 'projectstatus', value: 'projectstatus' },
            //             { display: 'durationoftheproject', value: 'durationoftheproject' },
            //             { display: 'range', value: 'range' },
            //             { display: 'contract', value: 'contract' },
            //             { display: 'implementationconsultant', value: 'implementationconsultant' },
            //             { display: 'projectintegration', value: 'projectintegration' },
            //             { display: 'others', value: 'others' },
            //         ]
            //     }
            // },
            {
				InternalName: "RequestExecutedBy",
				DisplayNameEn: "Request Executed By",
				DisplayName: "منفذ الطلب",
				type: "picker",
				// enableOnWfTaskStage: "CRIni04",
            	// requireOnWfTaskStage: "CRIni04"
			},
            {
                "InternalName": "Level",
                "DisplayName": "مستوى الاعتماد",
                "DisplayNameEn": "Level",
                "type": "string",
                "validation": "required"
            },
            {
                "InternalName": "ImpactOftheChange",
                "DisplayName": "أثر التغيير",
                "DisplayNameEn": "Impact of the Change",
                "type": "multiline",
                "maxchar": 5000
            },
            {
                "InternalName": "Status",
                "DisplayName": "الحالة",
                "DisplayNameEn": "Status",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'closed', value: 'closed' },
                        { display: 'open', value: 'open', selected: 'selected' }
                    ]
                }
            },
            {
                "InternalName": "Description",
                "DisplayName": "وصف التغيير",
                "DisplayNameEn": "Description",
                "type": "multiline",
                "maxchar": 5000,
                "validation": "required"
            },
            {
                "InternalName": "Days",
                "DisplayName":"الايام",
                "DisplayNameEn": "Days",
                "type": "float",
            },
            {
                "InternalName": "ChangeManagementStatus",
                "DisplayName": " الحاجة إلى إدارة التغيير",
                "DisplayNameEn": "ChangeManagementStatus",
                "type": "string",
            },
            {
                "InternalName": "NeedforChangeManagement",
                "DisplayName": " حالة إدارة التغيير",
                "DisplayNameEn": "Need for Change Management",
                "type": "string",
            },
            {
                "InternalName": "Challenges_CorrectiveActions",
                "DisplayName": "التحدّيات والخطوات التصحيحية من جانب إدارة التغيير",
                "DisplayNameEn": "Challenges_CorrectiveActions",
                "type": "string",
            },
            {
                "InternalName": "ChangeProcessPartner",
                "DisplayName": "شريك اعمال التغيير",
                "DisplayNameEn": "Change Process Partner",
                "type": "picker",
            },
            {
                "InternalName": "ChangeManagementPartner",
                "DisplayName": " شريك أعمال إدارة التغيير",
                "DisplayNameEn": "Change Management Partner",
                "type": "picker",
            },
            {
                "InternalName": "ChangeManagementUpdateDate",
                "DisplayName": "تاريخ تحديث معلومات إدارة التغيير",
                "DisplayNameEn": "Change Management Update Date",
                "type": "datetime",
            },
            {
                "InternalName": "ChangeManagementGoals",
                "DisplayName": "اهداف إدارة التغيير في المشروع",
                "DisplayNameEn": "Change Management Goals",
                "type": "multiline",
            },
            {
                "InternalName": "ChangeManagementRequirements",
                "DisplayName": "متطّلبات إدارة التغيير",
                "DisplayNameEn": "Change Management Requirements",
                "type": "multiline",
            },
            {
                "InternalName": "ChngMngmntRequirementsStatus",
                "DisplayName": " حالة تحقق متطّلبات إدارة التغيير ",
                "DisplayNameEn": "Change Management Requirements Status",
                "type": "string",
            },
            {
                "InternalName": "ChangeJustifications0",
                "DisplayName": "مبررات التغيير",
                "DisplayNameEn": "Change Justifications",
                "type": "multiline",
                "maxchar": 5000,
                "validation": "required"
            },
            {
                "InternalName": "SubmitForApproval",
                "DisplayName": "ارسال للموافقة",
                "DisplayNameEn": "Submit For Approval",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'yes', value: 'yes' },
                        { display: 'no', value: 'no' }
                    ]
                }
            },
            {
                "InternalName": "ImpactOn",
                "DisplayName": "مجال التغيير",
                "DisplayNameEn": "Impact On",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'budget', value: 'budget' },
                        { display: 'scopeofwork', value: 'scopeofwork' },
                        { display: 'others', value: 'others' }
                    ]
                }
            },
            {
                "InternalName": "ImpactOnScope",
                "DisplayName": "التأثير على المشروع (نطاق العمل)",
                "DisplayNameEn": "Impact on Project Scope",
                "type": "multiline",
                "maxchar": 5000
            },
            {
                "InternalName": "ImpactOnDuration",
                "DisplayName": "التأثير على المشروع (مدة المشروع)",
                "DisplayNameEn": "Impact on Project Duration",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'contractstartdate', value: 'contractstartdate' },
                        { display: 'contractenddate', value: 'contractenddate' },
                        { display: 'extensionperiod', value: 'extensionperiod' },
                        { display: 'contractperiodbeforeamendment', value: 'contractperiodbeforeamendment' },
                        { display: 'contracttermafteramendment', value: 'contracttermafteramendment' },
                    ]
                }
            },
            {
                "InternalName": "ImpactOnCost",
                "DisplayName": "التأثير على المشروع (التكلفة)",
                "DisplayNameEn": "Impact on Project Cost",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'originalcontractvalue', value: 'originalcontractvalue' },
                        { display: 'canceledstages', value: 'canceledstages' },
                        { display: 'increasepercentage', value: 'increasepercentage' },
                        { display: 'finalcontractvalue', value: 'finalcontractvalue' }
                    ]
                }
            },
            {
                "InternalName": "OtherImpact",
                "DisplayName": "التأثير على المشروع (أخرى)",
                "DisplayNameEn": "Impact on Project (Other)",
                "type": "multiline",
                "maxchar": 5000
            },
            {
                "InternalName": "ImpactIfNoChange",
                "DisplayName": "الآثار المترتبة في حال عدم قيام التغيير",
                "DisplayNameEn": "Impact of not applying the change",
                "type": "multiline",
                "maxchar": 5000
            },
            {
                "InternalName": "ChangeImplementedOn",
                "DisplayName": "تم تنفيذ التغيير في",
                "DisplayNameEn": "Change Implemented On",
                "type": "datetime"
            },
            {
                "InternalName": "ChangeImplementedBy",
                "DisplayName": "تم تنفيذ التغيير بواسطة",
                "DisplayNameEn": "Change Implemented By",
                "type": "picker"
            },
            {
                "InternalName": "AssignedTo",
                "DisplayName": "مخصص إلى",
                "DisplayNameEn": "Assigned To",
                "type": "picker"
            },
            {
                "InternalName": "DateResolved",
                "DisplayName": "تاريخ تنفيذالحل",
                "DisplayNameEn": "Date Resolved",
                "type": "datetime"
            },
            {
                "InternalName": "RequestStatus",
                "DisplayName": "حالة الطلب",
                "DisplayNameEn": "Request Status",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'completed', value: 'completed' },
                        { display: 'rejected', value: 'rejected' },
                        { display: 'ongoing', value: 'ongoing' },
                    ]
                }
            },
            {
                "InternalName": "ResolutionComments",
                "DisplayName": "تعليقات حول القرار",
                "DisplayNameEn": "Resolution Comments",
                "type": "multiline",
                "maxchar": 5000
            }

        ]
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