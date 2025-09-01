var Information_Form  = [
  {
    label: 'مؤشرات المبادرات',
    labelEn: 'Initiative KPI Data',
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [
 {
      "InternalName": "Title",
      "DisplayNameEn": "Title",
      "DisplayName": "رمز مؤشر المبادرة",
      "type": "string",
      // "validation": "required"
},

{
    "InternalName": "Initiative",
    "DisplayNameEn": "Initiative",
    "DisplayName": "المبادرة",
    "type": "lookup",
    "source": "Initiatives",
    "Dispfieldkey": "Name",
    "valfieldkey": "Title",
    // "validation": "required"
},
{
      "InternalName": "Name",
      "DisplayNameEn": "Name",
      "DisplayName": "المؤشر",
      "type": "string",
      "maxchar": "250",
      // "validation": "required"

},
{
  "InternalName": "KPILevels",
  "DisplayNameEn": "KPI Levels",
  "DisplayName": "مستويات المؤشر",
  "type": "dropdownValues",
  options: {
      choices: [
          { display: 'hight', value: 'hight' },
          { display: 'medium', value: 'medium' },
          { display: 'low', value: 'low' },
      ]
  }
  // "type": "dropdown",
  // options: {
  //   choices: [
  //     'نوع المهنفئة الراتب ', 'حجم المنشأة', 'الجنس', 'المنطقة الجغرافية', 'التخصصات التعليمية', 'القطاعات الاقتصادية',        ]
  // }
},
{
  "InternalName": "Benchmarking",
  "DisplayNameEn": "Benchmarking",
  "DisplayName": "المقارنة المعيارية",
  "type": "string",
  "maxchar": "250",
}, 
{
  "InternalName": "Description",
  "DisplayNameEn": "Description",
  "DisplayName": "وصف",
  "type": "multiline",
  "maxchar": "500",
},
// {
//   "InternalName": "RelatedInstrumentKPI",
//   "DisplayName": "مؤشر البرامج المرتبطة",
//   "type": "lookup",
//   "source": "InstrumentKPI",
//   "Dispfieldkey": "Name",
//   "valfieldkey": "Title"

// },
{
  "InternalName": "Calculation",
  "DisplayNameEn": "Calculation",
  "DisplayName": "آلية حساب المؤشر",
  options: {
    choices: [
        { display: 'last', value: 'last' },
        { display: 'sum', value: 'sum' },
        { display: 'average', value: 'average' },
    ]
    }
},
{
  "InternalName": "CalculationMethod",
  "DisplayNameEn": "CalculationMethod",
  "DisplayName": "طريقة الحساب",
  "type": "dropdown",
  options: {
    choices: [ 'يدوي',
   'عبر البرنامج',
      

    ]
  }
},
{
  "InternalName": "ResultType",
  "DisplayNameEn": "ResultType",
  "DisplayName": "وحدة القياس",
  "type": "dropdownValues",
  options: {
      choices: [
          { display: 'number', value: 'number' },
          { display: 'percentage', value: 'percentage' },
      ]
  }
},
{
  "InternalName": "Polarity",
  "DisplayNameEn": "Polarity",
  "DisplayName": "القطبية",
  "type": "dropdown",
  options: {
    choices: [
      '+','-'
     ]
  }
},
{
  "InternalName": "PeriodType",
  "DisplayNameEn": "Period Type",
  "DisplayName": "تكرار القياس",
  "type": "dropdownValues",
  options: {
      choices: [
          { display: 'quarter', value: 'quarter' },
          { display: 'yearly', value: 'yearly' },
      ]
  }
},
{
  "InternalName": "Baseline",
  "DisplayNameEn": "Baseline",
  "DisplayName": "خط الأساس",
  "type": "floatpercentage"
},

{
  "InternalName": "KPIType",
  "DisplayNameEn": "KPI Type",
  "DisplayName": "نوع المؤشر",
  "type": "dropdownValues",
  options: {
      choices: [
          { display: 'result', value: 'result' },
          { display: 'input', value: 'input' },
          { display: 'deliverable', value: 'deliverable' },
      ]
  }
},
{
  "InternalName": "Dimensions",
  "DisplayNameEn": "Dimensions",
  "DisplayName": "الأبعاد الرئيسية",
  "type": "lookup",
  "source": "Dimensions",
  "Dispfieldkey": "Dimension",
  "valfieldkey": "Title"
},
{
  "InternalName": "RelatedStrategyObjective",
  "DisplayNameEn": "RelatedStrategyObjective",
  "DisplayName": "الأهداف الاستراتيجية المرتبطة",
  "type": "lookup",
  "source": "SOs",
  "Dispfieldkey": "Name",
  "valfieldkey": "Title"
},
{
  "InternalName": "MesurePriority",
  "DisplayNameEn": "Mesure Priority",
  "DisplayName": "أولوية قياس المؤشر",
  "type": "dropdownValues",
            options: {
                choices: [
                    { display: 'low', value: 'low' },
                    { display: 'high', value: 'high' },
                ]
            }
},
{
  "InternalName": "KPIActivationStatus",
  "DisplayNameEn": "KPI Activation Status",
  "DisplayName": "حالة تفعيل المؤشر",
  "type": "dropdown",
  options: {
    choices: [
      'مفعّل', 'يتمّ تفعيله', 'يتمّ تفعيله في الربع الأوّل', 'يتمّ تفعيله في الربع الثاني', 'يتمّ تفعيله في الربع الثالث'
    ]
  }
},
{
  "InternalName": "Owner",
  "DisplayNameEn": "Owner",
  "DisplayName": "المالك",
  "type": "picker"
},

{
  "InternalName": "Formula",
  "DisplayNameEn": "Formula",
  "DisplayName": "المعادلة",
  "type": "string",
  "maxchar": "250",
},
{
  "InternalName": "RelatedMainKPI",
  "DisplayNameEn": "Related Main KPI",
  "DisplayName": "المؤشر الرئيسي المرتبط",
  "type": "lookup",
  "source": "MainKPI",
  "Dispfieldkey": "Name",
  "valfieldkey": "Title"
}, 
]
},

{
  label: ' ',
  labelEn: '',
  description: "",
  descriptionEn: "",
  subFields: [
	   
  
	{
	  "InternalName": "ActualQ1",
	  "DisplayNameEn": "Actual Q1",
	  "DisplayName": "المحقق للربع الأول",
	  "type": "float"
	},
  
	{
	  "InternalName": "ActualQ2",
	  "DisplayNameEn": "Actual Q2",
	  "DisplayName": "المحقق للربع الثاني",
	  "type": "float"
  
	},
	{
	  "InternalName": "ActualQ3",
	  "DisplayNameEn": "Actual Q3",
	  "DisplayName": "المحقق للربع الثالث",
	  "type": "float"
	},
	{
	  "InternalName": "ActualQ4",
	  "DisplayNameEn": "Actual Q4",
	  "DisplayName": "المحقق للربع الرابع",
	  "type": "float"
	},
	{
	  "InternalName": "Actual",
	  "DisplayNameEn": "Actual",
	  "DisplayName": "الأداء التراكمي",
	  "type": "float"
	},
   
   
	{
	  "InternalName": "TargetQ1",
	  "DisplayNameEn": "Target Q1",
	  "DisplayName": "المستهدف الربع الأول",
	  "type": "floatpercentage"
	},
	{
	  "InternalName": "TargetQ2",
	  "DisplayNameEn": "Target Q2",
	  "DisplayName": "المستهدف الربع الثاني",
	  "type": "floatpercentage"
	},
	{
	  "InternalName": "TargetQ3",
	  "DisplayNameEn": "Target Q3",
	  "DisplayName": "المستهدف الربع الثالث",
	  "type": "floatpercentage"
	},
	{
	  "InternalName": "TargetQ4",
	  "DisplayNameEn": "Target Q4",
	  "DisplayName": "المستهدف الربع الرابع",
	  "type": "floatpercentage"
	},
	{
	  "DisplayNameEn": "Target",
	  "InternalName": "Target",
	  "DisplayName": "المستهدف",
	  "type": "floatpercentage"
	},
  ]
  }

];