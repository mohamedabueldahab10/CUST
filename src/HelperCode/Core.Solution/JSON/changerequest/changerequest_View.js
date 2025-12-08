//NB
//{ display: "strategicobjectives", value: "strategiccrmsStrategicObjectives"},//value should be end by the name of list
window.Information_Form = [
	{
	  label: "البيانات الرئيسية",
	  labelEn: "Basic Info",
	  description: "التفاصيل",
	  descriptionEn: "Details",
	  subFields: [
		{
		  InternalName: "Name",
		  DisplayName: "العنوان",
		  DisplayNameEn: "Name",
		  type: "string",
		},
		{
		  InternalName: "Type",
		  DisplayNameEn: "Type",
		  DisplayName: "النوع",
		  stopinvokeparent: "yes",
		  type: "dropdownValues",
  
		  options: {
			choices: [
			  {
				display: "main",
				value: "MainKPI",
				roles: ["Administrator"],
			  },
			  {
				display: "sublevel2",
				value: "sub2_MainKPI",
				roles: ["Administrator"],
			  },
			  {
				display: "sublevel3",
				value: "sub3_MainKPI",
				roles: ["Administrator"],
			  },
  
			  //Initiatives
			  {
				display: "initiative",
				value: "Initiatives",
				roles: ["Administrator"],
			  },
  
			  //  projects
			  {
				display: "project",
				value: "Projects",
				roles: ["Administrator"],
			  },
			  {
				display: "deliverables",
				value: "Deliverables_Projects",
				roles: ["Administrator"],
			  },
			  {
				display: "milestones",
				value: "Milestones_Projects",
				roles: ["Administrator"],
			  },
			],
		  },
		  toggleValues: [
			{
			  value: "Projects",
			  fields: ["RelatedProject", "projectsUpdateType"],
			},
			{
			  value: "Milestones_Projects",
			  fields: [
				"RelatedProjectsMilestones",
				"milestonescr_projectsUpdateTypes",
			  ],
			},
			{
			  value: "Deliverables_Projects",
			  fields: ["RelatedProjects", "deliverablescr_projectsUpdateType"],
			},
			//Initiatives
			{
			  value: "Initiatives",
			  fields: ["RelatedInitiative", "initiativesUpdateType"],
			}, //we can put more than 1  field
			//SOS
			{
			  value: "SOs",
			  fields: ["CRRelatedObjective", "ObjectivesUpdateType"],
			},
			//---KPI------
			{
			  value: "MainKPI",
			  fields: ["CRMainRelatedKpis", "kpiUpdateType"],
			},
			{
			  value: "sub2_MainKPI",
			  fields: ["CRSub2RelatedKpis", "kpiUpdateType"],
			},
			{
			  value: "sub3_MainKPI",
			  fields: ["CRSub3RelatedKpis", "kpiUpdateType"],
			},
		  ],
		},
		{
		  InternalName: "RelatedItem",
		  DisplayNameEn: "Related Project",
		  DisplayName: "المشروع المرتبط",
		  //display: "none",
		  type: "lookup",
		  queryField: "IsStrategicProject",
		  queryFieldType: "Choice", //ex: "Choice"
		  queryFieldValue: "strategy",
		  listKey: "projects",
		  ToggleName: "RelatedProject",
		  DispfieldkeyEn: "Name",
		  customCr: true,
		  source: "Projects",
		  Dispfieldkey: "Name",
		  valfieldkey: "Title",
		  useAccessPolicy: true,
		  showlink: true,
		  linkedto: "projects",
		},
		{
		  InternalName: "RelatedItem",
		  DisplayNameEn: "Related Project",
		  DisplayName: "المشروع المرتبط",
		  //display: "none",
		  type: "lookup",
		  listKey: "deliverablescr_projects",
		  ToggleName: "RelatedProjects",
		  DispfieldkeyEn: "Name",
		  customCr: true,
		  source: "Projects",
		  Dispfieldkey: "Name",
		  valfieldkey: "Title",
		  useAccessPolicy: true,
		  showlink: true,
		  linkedto: "projects",
		},
		{
		  InternalName: "RelatedItem",
		  DisplayNameEn: "Related Project",
		  DisplayName: "المشروع المرتبط",
		  //display: "none",
		  type: "lookup",
		  listKey: "milestonescr_projects",
		  ToggleName: "RelatedProjectsMilestones",
		  DispfieldkeyEn: "Name",
		  customCr: true,
		  source: "Projects",
		  Dispfieldkey: "Name",
		  valfieldkey: "Title",
		  useAccessPolicy: true,
		  showlink: true,
		  linkedto: "projects",
		},
  
		{
		  InternalName: "RelatedItem",
		  DisplayName: " المبادرة المرتبطة",
		  DisplayNameEn: "Related Initiative",
		  listKey: "initiatives",
		  //display: "none",
		  type: "lookup",
		  ToggleName: "RelatedInitiative",
		  customCr: true,
		  valsiblingkey: "Types", // to use it on roles filter on data
		  //from other list:ma
		  source: "Initiatives",
		  Dispfieldkey: "Name",
		  valfieldkey: "Title",
		  useAccessPolicy: true,
		  showlink: true,
		  linkedto: "initiatives",
		},
		{
		  //startegy
		  InternalName: "RelatedItem",
		  DisplayNameEn: "Related Objective",
		  DisplayName: "الهدف  المرتبط ",
		  listKey: "objectives", //hada al wizara  هدف الوزارة =
		  //display: "none",
		  customCr: true,
		  ToggleName: "CRRelatedObjective",
		  type: "lookup",
		  source: "SOs",
		  Dispfieldkey: "Name",
		  valfieldkey: "Title",
		  useAccessPolicy: true,
		  showlink: true,
		  linkedto: "sos",
		},
		{
		  InternalName: "RelatedItem",
		  DisplayNameEn: "Related Main KPI",
		  DisplayName: "المؤشر الأساسي المرتبط",
		  listKey: "kpis",
		  //display: "none",
		  customCr: true,
		  ToggleName: "CRMainRelatedKpis",
		  type: "lookup",
		  queryField: "KPIType",
		  queryFieldType: "Choice", //ex: "Choice"
		  queryFieldValue: "KPIType",
		  source: "MainKPI",
		  DispfieldkeyEn: "Name",
		  Dispfieldkey: "Name",
		  valfieldkey: "Title",
		  useAccessPolicy: true,
		  showlink: true,
		  linkedto: "mainkpi",
		},
		{
		  InternalName: "RelatedItem",
		  DisplayNameEn: "Related Sub 2 KPI",
		  DisplayName: "المؤشر الفرعي الثاني المرتبط",
		  listKey: "kpis",
		  //display: "none",
		  customCr: true,
		  ToggleName: "CRSub2RelatedKpis",
		  type: "lookup",
		  queryField: "KPIType",
		  queryFieldType: "Choice",
		  queryFieldValue: "sublevel2",
		  source: "MainKPI",
		  Dispfieldkey: "Name",
		  DispfieldkeyEn: "Name",
		  valfieldkey: "Title",
		  useAccessPolicy: true,
		  showlink: true,
		  linkedto: "mainkpi",
		},
		{
		  InternalName: "RelatedItem",
		  DisplayNameEn: "Related Sub 3 KPI",
		  DisplayName: "المؤشر  الفرعي الثالث المرتبط",
		  listKey: "kpis",
		  //display: "none",
		  customCr: true,
		  ToggleName: "CRSub3RelatedKpis",
		  type: "lookup",
		  queryField: "KPIType",
		  queryFieldType: "Choice",
		  queryFieldValue: "sublevel3",
		  source: "MainKPI",
		  Dispfieldkey: "Name",
		  DispfieldkeyEn: "Name",
		  valfieldkey: "Title",
		  useAccessPolicy: true,
		  showlink: true,
		  linkedto: "mainkpi",
		},
		{
		  InternalName: "Category",
		  // descPhraseAr: "التصنيف",
		  // descPhraseEn: "Category",
		  DisplayName: "التصنيف",
		  DisplayNameEn: "Category",
		  //display: "none",
		  customCr: true,
		  ToggleName: "projectsUpdateType",
		  type: "dropdownValues",
		  options: {
			choices: [
			  {
				display: "generalchange",
				value: "generalchange",
				//
				fields: [
				  {
					InternalName: "getall",
				  },
				],
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRProject" },
				  { fieldName: "WFStage", value: "CR01" },
				  { fieldName: "UpdateType", value: "automatic" },
				],
			  },
			  {
				display: "deletion",
				value: "delete",
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRProject" },
				  { fieldName: "WFStage", value: "CR01" },
				  { fieldName: "UpdateType", value: "delete" },
				],
			  },
			  {
				display: "scope",
				value: "scope",
				fields: [
				  {
					listName: "Projects",
					// label: "بيانات الميزانية",
					labelEn: "scope Info",
					description: "التفاصيل",
					descriptionEn: "Details",
  
					InternalName: "ScopeOfWork",
					DisplayName: "نطاق العمل ",
					DisplayNameEn: "Scope Of Work",
					type: "multiline",
					maxchar: "500",
					descPhraseAr: "الحد الاقصى لعدد الحروف هو 500 حرف",
					descPhraseEn: "max length of letters equal 500",
					validation: "required",
				  },
				  {
					InternalName: "OutOfScope",
					DisplayName: "خارج نطاق العمل ",
					DisplayNameEn: "Out Of Scope",
					type: "multiline",
					maxchar: "500",
					descPhraseAr: "الحد الاقصى لعدد الحروف هو 500 حرف",
					descPhraseEn: "max length of letters equal 500",
				  },
				],
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRProject" },
				  { fieldName: "WFStage", value: "CR01" },
				  { fieldName: "UpdateType", value: "automatic" },
				],
			  },
			  {
				display: "financial ",
				value: "financial",
  
				fields: [
				  {
					listName: "Projects",
					label: "معلومات مالية",
					labelEn: "Financial info",
					description: "التفاصيل",
					descriptionEn: "Details",
  
					InternalName: "AssignedBudget",
					DisplayName: "الميزانية المعتمدة",
					DisplayNameEn: "Assigned Budget",
					type: "float",
					numberOfDigits: "15",
				  },
				  {
					InternalName: "ExpectedBudget",
					DisplayName: "الموازنة المتوقعة",
					DisplayNameEn: "Expected Budget",
					type: "float",
					numberOfDigits: "15",
				  },
				  {
					InternalName: "ActualBudget",
					DisplayName: "التكلفة الفعلية",
					DisplayNameEn: "Actual Budget",
					type: "float",
					descPhraseAr: "الحقل مطلوب لادخال المخرجات والمعالم",
					descPhraseEn:
					  "Filed is required to add milestones and Deliverables",
					RequiredName: "ActualBudget",
					numberOfDigits: "15",
					resetElement: [
					  "ContractualEngagements",
					  "ExpensesDate",
					  "RemainingCost",
					],
				  },
				  {
					InternalName: "ContractualEngagements",
					DisplayName: "الارتباطات التعاقدية",
					DisplayNameEn: "ContractualEngagements",
					type: "float",
					numberOfDigits: "15",
					max: "ActualBudget",
					descPhraseAr:
					  "يجب ان تكون اقل من او يساوي التكلفة الفعلية او التكلفة",
					descPhraseEn:
					  "should be less than or equal Actual Budget or Amount",
				  },
				  {
					InternalName: "EngagementPercentage",
					DisplayName: "نسبة الارتباط من التكاليف ",
					DisplayNameEn: "Engagement Percentage",
					type: "floatpercentage",
				  },
				  {
					InternalName: "ExpensesDate",
					DisplayName: "المنصرف حتى تاريخه",
					DisplayNameEn: "Expenses",
					type: "float",
					numberOfDigits: "15",
					max: "ActualBudget",
					descPhraseAr:
					  "يجب ان تكون اقل من او يساوي التكلفة الفعلية او التكلفة",
					descPhraseEn:
					  "should be less than or equal Actual Budget or Amount",
				  },
				  {
					InternalName: "RemainingCost",
					DisplayName: "التكلفة المتبقية",
					DisplayNameEn: "Remaining Cost",
					type: "float",
					numberOfDigits: "15",
					max: "ActualBudget",
					descPhraseAr:
					  "يجب ان تكون اقل من او يساوي التكلفة الفعلية او التكلفة",
					descPhraseEn:
					  "should be less than or equal Actual Budget or Amount",
				  },
				  {
					InternalName: "OutOfCash",
					DisplayName: "نسبة المنصرف من السيولة ",
					DisplayNameEn: "Out Of Cash",
					type: "floatpercentage",
					numberOfDigits: "15",
				  },
				],
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRProject" },
				  { fieldName: "WFStage", value: "CR01" },
				  { fieldName: "UpdateType", value: "automatic" },
				],
			  },
			  {
				display: "schedule",
				value: "schedule",
				fields: [
				  {
					listName: "Projects",
					label: "معلومات الجدول الزمني",
					labelEn: "Schedule info",
					description: "التفاصيل",
					descriptionEn: "Details",
  
					InternalName: "BaselineStartDate",
					DisplayName: "تاريخ بدء الأساس",
					DisplayNameEn: "Baseline Start Date",
					type: "datetime",
					max: "BaselineFinishDate",
					validation: "required",
				  },
				  {
					InternalName: "BaselineFinishDate",
					DisplayName: "تاريخ إنهاء الأساس",
					DisplayNameEn: "Baseline Finish Date",
					type: "datetime",
					min: "BaselineStartDate",
					validation: "required",
				  },
				],
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRProject" },
				  { fieldName: "WFStage", value: "CR01" },
				  { fieldName: "UpdateType", value: "automatic" },
				],
			  },
			  {
				display: "stat14",
				value: "stat14",
				fields: [
				  {
					listName: "Projects",
					label: "حالة المشروع ",
					labelEn: "Project Status",
					description: "التفاصيل",
					descriptionEn: "Details",
  
					InternalName: "WorkingStatus",
					DisplayName: "حالة العمل",
					DisplayNameEn: "Working Status",
					type: "dropdownValues",
					options: {
					  choices: [
						{ display: "active", value: "active" },
						{
						  display: "stat14",
						  value: "stat14",
						  selected: "selected",
						},
						{ display: "stat13", value: "stat13" },
					  ],
  
					  // type: "string",
					  // translate: "resources",
					},
				  },
				],
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRProject" },
				  { fieldName: "WFStage", value: "CR01" },
				  { fieldName: "UpdateType", value: "stat14" },
				],
			  },
			  {
				display: "stat13",
				value: "stat13",
				fields: [
				  {
					listName: "Projects",
					label: "حالة المشروع ",
					labelEn: "Project Status",
					description: "التفاصيل",
					descriptionEn: "Details",
  
					InternalName: "ProjectStatus",
					DisplayName: "حالة المشروع",
					DisplayNameEn: "Project Status",
					type: "dropdownValues",
					options: {
					  choices: [
						{ display: "active", value: "active" },
						{ display: "stat14", value: "stat14" },
						{
						  display: "stat13",
						  value: "stat13",
						  selected: "selected",
						},
					  ],
  
					  // type: "string",
					  // translate: "resources",
					},
				  },
				],
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRProject" },
				  { fieldName: "WFStage", value: "CR01" },
				  { fieldName: "UpdateType", value: "stat13" },
				],
			  },
			],
		  },
		},
		{
		  InternalName: "Category",
		  DisplayName: "التصنيف",
		  DisplayNameEn: "Category",
		  //display: "none",
		  customCr: true,
		  ToggleName: "deliverablescr_projectsUpdateType",
		  type: "dropdownValues",
		  options: {
			choices: [
			  {
				display: "generalchange",
				value: "generalchange",
				//
				fields: [
				  {
					InternalName: "getall",
				  },
				],
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRProject" },
				  { fieldName: "WFStage", value: "CR01" },
				  { fieldName: "UpdateType", value: "automatic" },
				],
			  },
			],
		  },
		},
		{
		  InternalName: "Category",
		  DisplayName: "التصنيف",
		  DisplayNameEn: "Category",
		  //display: "none",
		  customCr: true,
		  ToggleName: "milestonescr_projectsUpdateTypes",
		  type: "dropdownValues",
		  options: {
			choices: [
			  {
				display: "generalchange",
				value: "generalchange",
				//
				fields: [
				  {
					InternalName: "getall",
				  },
				],
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRProject" },
				  { fieldName: "WFStage", value: "CR01" },
				  { fieldName: "UpdateType", value: "automatic" },
				],
			  },
			],
		  },
		},
		{
		  InternalName: "Category",
		  DisplayName: "التصنيف",
		  DisplayNameEn: "Category",
		  //display: "none",
		  customCr: true,
		  ToggleName: "initiativesUpdateType",
		  type: "dropdownValues",
		  options: {
			choices: [
			  {
				display: "generalchange",
				value: "generalchange",
				//
				fields: [
				  {
					InternalName: "getall",
				  },
				],
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRInitiative" },
				  { fieldName: "WFStage", value: "CRINT01" },
				  { fieldName: "UpdateType", value: "automatic" },
				],
			  },
			  {
				display: "deletion",
				value: "delete",
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRInitiative" },
				  { fieldName: "WFStage", value: "CRINT01" },
				  { fieldName: "UpdateType", value: "delete" },
				],
			  },
			  {
				display: "financial",
				value: "financial",
  
				fields: [
				  {
					listName: "Initiatives",
					label: "بيانات الميزانية",
					labelEn: "Financial Info",
					description: "التفاصيل",
					descriptionEn: "Details",
  
					InternalName: "RelatedBudgetItem",
					DisplayNameEn: "Budget Item",
					DisplayName: "بند الميزانية",
					type: "string",
					validation: "required",
				  },
				  {
					InternalName: "EstimatedCost",
					DisplayName: "التكلفة التقديرية ",
					DisplayNameEn: "Estimated Cost",
					type: "number",
					numberOfDigits: "15",
				  },
  
				  {
					InternalName: "ProgramTotalCost",
					DisplayName: "التكاليف الكلية حسب سقف البرنامج ",
					DisplayNameEn: "Program Total Cost",
					type: "float",
					RequiredName: "ProgramTotalCost",
					numberOfDigits: "15",
					resetElement: ["ActualCost"], // reset value of this element when there is no val in current element
					sum1Element: "ProgramTotalCost", // get the value for this elem
					sum2Element: "ActualCost", // get the value for this elem
					totalElement: "InitiativeBudget", // set sum value in this elem
					className: "disable_enable_section", // disable and enable section master  details specific for project and initiative cr
				  },
  
				  {
					InternalName: "ActualCost",
					DisplayName: "التكاليف الكلية المعتمدة ",
					DisplayNameEn: "Actual Cost",
					type: "float",
					numberOfDigits: "15",
					state: "disabled",
					max: "ProgramTotalCost", // max value will be smaller than or equal ProgramTotalCost
					descPhraseAr:
					  "القيمة يجب ان تكون اقل او يساوي التكاليف الكلية حسب سقف البرنامج",
					descPhraseEn:
					  "should be less than or equal the initiative budget",
					sum1Element: "ProgramTotalCost", // get the value for this elem
					sum2Element: "ActualCost", // get the value for this elem
					totalElement: "InitiativeBudget", // set sum value in this elem
				  },
				  {
					InternalName: "InitiativeBudget",
					DisplayName: "ميزانية المبادرة ",
					DisplayNameEn: "InitiativeBudget",
					type: "float",
					numberOfDigits: "15",
					state: "disabled",
					descPhraseAr:
					  "مجموع التكاليف الكلية حسب سقف البرنامج و التكاليف الكلية المعتمدة",
					descPhraseEn: "total of ProgramTotalCost and ActualCost",
					resetElement: [
					  "CurrentBuget",
					  "Expenditures",
					  "CurrentExpenditures",
					],
				  },
				  {
					InternalName: "CurrentBuget",
					DisplayName: "السيولة المخصصة للعام المالي الحالي ",
					DisplayNameEn: "Current Budget",
  
					state: "disabled",
					type: "float",
					numberOfDigits: "15",
					max: "InitiativeBudget",
					descPhraseAr: "يجب ان تكون اقل من او يساوي ميزانية المبادرة",
					descPhraseEn:
					  "should be less than or equal the initiative budget",
				  },
				  {
					InternalName: "ExpenseStartDate",
					DisplayName: "تاريخ بداية الصرف",
					DisplayNameEn: "Expense Start Date",
					// type: 'datetime',
					type: "datetimetoparent",
					listname: "Initiatives",
					startinternalname: "StartDate",
					endinternalname: "FinishDate",
					// min: 'StartDate',
					// max: 'FinishDate',
					Errmsgkey: "btwndatepattern",
					// startinternalname: 'StartDate',
					// endinternalname: 'FinishDate',
				  },
				  {
					InternalName: "Expenditures",
					DisplayName: "المنصرف الأجمالي ",
					DisplayNameEn: "Expenditures",
					type: "number",
					numberOfDigits: "15",
  
					state: "disabled",
					max: "InitiativeBudget",
					descPhraseAr: "يجب ان تكون اقل من او يساوي ميزانية المبادرة",
					descPhraseEn:
					  "should be less than or equal the initiative budget",
				  },
				  {
					InternalName: "CurrentExpenditures",
					DisplayName: "المنصرف من العالم المالي الحالي ",
					DisplayNameEn: "Current Expenditures",
					type: "number",
  
					state: "disabled",
					numberOfDigits: "15",
					max: "InitiativeBudget",
					descPhraseAr: "يجب ان تكون اقل من او يساوي ميزانية المبادرة",
					descPhraseEn:
					  "should be less than or equal the initiative budget",
				  },
				  {
					InternalName: "DependencyCost",
					DisplayName: "حجم الارتباط (منصة اعتماد) ",
					DisplayNameEn: "Dependency Cost",
					type: "floatpercentage",
					ToggleName: "FundingSection",
				  },
				],
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRInitiative" },
				  { fieldName: "WFStage", value: "CRINT01" },
				  { fieldName: "UpdateType", value: "automatic" },
				],
			  },
			  {
				display: "schedule",
				value: "schedule",
				fields: [
				  {
					listName: "Initiatives",
					label: "معلومات الجدول الزمني",
					labelEn: "Schedule Info",
					description: "التفاصيل",
					descriptionEn: "Details",
  
					InternalName: "StartDate",
					DisplayName: "تاريخ بداية المبادرة ",
					DisplayNameEn: "Start Date",
					type: "datetime",
					max: "FinishDate",
					validation: "required",
				  },
				  {
					InternalName: "FinishDate",
					DisplayName: "تاريخ نهاية المبادرة ",
					DisplayNameEn: "Finish Date",
					type: "datetime",
					min: "StartDate",
					validation: "required",
				  },
				],
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRInitiative" },
				  { fieldName: "WFStage", value: "CRINT01" },
				  { fieldName: "UpdateType", value: "automatic" },
				],
			  },
			],
		  },
		},
		{
		  InternalName: "Category",
		  // descPhraseAr: "تغيير عام: تعديل بيانات",
		  // descPhraseEn: "General change: Edit data",
		  DisplayName: "التصنيف",
		  DisplayNameEn: "Category",
		  //display: "none",
		  customCr: true,
		  ToggleName: "kpiUpdateType",
		  type: "dropdownValues",
		  options: {
			choices: [
			  {
				display: "generalchange",
				value: "generalchange",
				//
				fields: [
				  {
					InternalName: "getall",
				  },
				],
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRKPI" },
				  { fieldName: "WFStage", value: "CRKPI01" },
				  { fieldName: "UpdateType", value: "automatic" },
				],
			  },
			  {
				display: "deletion",
				value: "delete",
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRKPI" },
				  { fieldName: "WFStage", value: "CRKPI01" },
				  { fieldName: "UpdateType", value: "delete" },
				],
			  },
			],
		  },
		},
  
		{
		  //StrategicObjectives
		  InternalName: "Category",
		  // descPhraseAr: "تغيير عام: تعديل بيانات",
		  // descPhraseEn: "General change: Edit data",
		  DisplayName: "التصنيف",
		  DisplayNameEn: "Category",
		  //display: "none",
		  customCr: true,
		  ToggleName: "ObjectivesUpdateType",
		  type: "dropdownValues",
		  options: {
			choices: [
			  {
				display: "generalchange",
				value: "generalchange",
				//
				fields: [
				  {
					InternalName: "getall",
				  },
				],
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRObjectives" },
				  { fieldName: "WFStage", value: "CRSos01" },
				  { fieldName: "UpdateType", value: "automatic" },
				],
			  },
			  {
				display: "deletion",
				value: "delete",
				otherFields: [
				  { fieldName: "WFModuleCode", value: "CRObjectives" },
				  { fieldName: "WFStage", value: "CRSos01" },
				  { fieldName: "UpdateType", value: "delete" },
				],
			  },
			],
		  },
		},
		{
		  InternalName: "Description",
		  DisplayName: "الوصف",
		  DisplayNameEn: "Description",
		  //validation: "required",
		  type: "multiline",
		  maxchar: 5000,
		},
		{
		  InternalName: "CurrentSituationExplanation",
		  DisplayName: "الوضع الحالي",
		  DisplayNameEn: "Current Situation Explanation",
		  //validation: "required",
		  type: "multiline",
		  maxchar: 5000,
		},
		{
		  InternalName: "Justifications",
		  DisplayName: "مبررات التغيير",
		  DisplayNameEn: "Justifications",
		  // validation: "required",
		  type: "multiline",
		  maxchar: 5000,
		},
		{
		  InternalName: "Impact",
		  DisplayName: "التأثير",
		  DisplayNameEn: "Impact",
		  type: "dropdownValues",
  
		  options: {
			choices: [
			  { display: "hight", value: "hight" },
			  { display: "medium", value: "medium" },
			  { display: "low", value: "low" },
			],
		  },
		},
		{
		  InternalName: "ImpactDescription",
		  DisplayName: "وصف التأثير",
		  DisplayNameEn: "Impact Description",
		  //validation: "required",
		  type: "multiline",
		},
		{
		  InternalName: "Priority",
		  DisplayName: "الأولوية",
		  DisplayNameEn: "Priority",
		  type: "dropdownValues",
  
		  options: {
			choices: [
			  { display: "hight", value: "hight" },
			  { display: "medium", value: "medium" },
			  { display: "low", value: "low" },
			],
		  },
		},
	  ],
	},
  ];
  