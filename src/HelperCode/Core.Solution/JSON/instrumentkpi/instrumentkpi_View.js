var Information_Form  = [
  {
    label: 'مؤشرات البرامج',
    labelEn: 'Instrument KPI Data',
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [

    {
      "InternalName": "RelatedInitiativeKPI",
      "DisplayNameEn": "Related Initiative KPI",
      "DisplayName": "مؤشر المبادرة المرتبط",
      "type": "lookup",
      "source": "InitiativeKPI",
      "Dispfieldkey": "Name",
      "valfieldkey": "Title",
      // "validation": "required"
    },
    {
      "InternalName": "RelatedInstrument",
      "DisplayNameEn": "Related Instrument",
      "DisplayName": "البرنامج المرتبط",
      "type": "lookup",
      "source": "Instruments",
      "Dispfieldkey": "Title",
      "valfieldkey": "Title"
    }, 
    {
      "InternalName": "ConcernedSector",
      "DisplayNameEn": "Concerned Sector",
      "DisplayName": "القطاع المعني",
      "type": "dropdownValues",
      options: {
          choices: [
              { display: 'trainingsupport', value: 'trainingsupport' },
              { display: 'employeesupport', value: 'employeesupport' },
          ]
      }
    },
    {
      "InternalName": "SupportType",
      "DisplayNameEn": "Support Type",
      "DisplayName": "نوع الدعم",
      "type": "dropdownValues",
      options: {
          choices: [
              { display: 'training', value: 'training' },
              { display: 'operational', value: 'opeational' },
              { display: 'moneysupport', value: 'moneysupport' },
              { display: 'unmoneyusupport', value: 'unmoneyusupport' },
          ]
      }
    },
    {
      "InternalName": "InstrumentLevel",
      "DisplayNameEn": "Instrument Level",
      "DisplayName": "حالة البرنامج",
      "type": "dropdownValues",
      options: {
          choices: [
              { display: 'new', value: 'new' },
              { display: 'inprogress', value: 'inprogress' },
              { display: 'onhold', value: 'onhold' },
          ]
      }
    },
    {
        "InternalName": "Name",
        "DisplayNameEn": "Name",
        "DisplayName": "المؤشر",
        "type": "string",
        "maxchar": "250",

    },
    {
      "InternalName": "KPILevels",
      "DisplayNameEn": "KPI Levels",
      "DisplayName": "مستويات المؤشر",
      "type": "dropdown",
      options: {
        choices: [
          'الجنس', 'التخصّصات التعليمية', 'نوع المهنة', 'التخصّصات التعليمية', 'القطاعات الاقتصادية', 'حجم المنشأة', 'فئة الراتب'
        ]
      }
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
      "DisplayName": "وصف المؤشر",
      "type": "multiline",
      "maxchar": "500",
    },
    {
      "InternalName": "Priority",
      "DisplayNameEn": "Priority",
      "DisplayName": "أهميّة المؤشر",
      "type": "multiline",
      "maxchar": "500",
    },
    {
      "InternalName": "RequiredData",
      "DisplayNameEn": "Required Data",
      "DisplayName": "البيانات المطلوبة",
      "type": "string",
      "maxchar": "250",
    },
    {
      "InternalName": "DataAvailability",
      "DisplayNameEn": "Data Availability",
      "DisplayName": "مدى توفّر البيانات",
      "type": "string",
      "maxchar": "250",
    },
    {
      "InternalName": "DataSource",
      "DisplayNameEn": "Data Source",
      "DisplayName": "مصدر البيانات",
      "type": "string",
      "maxchar": "250",
    },
    {
      "InternalName": "SystemName",
      "DisplayNameEn": "System Name",
      "DisplayName": "إسم النظام",
      "type": "dropdown",
      options: {
        choices: [
          'BI', 'EC', 'فالكون', 'CRM', 'ETS', 'NLG', 'postgre', 'طاقات', 'لوحة بيانات دروب', 'SPS', 'نظام ماهر', 'منصة اكاديمية هدف للقيادة', 'ذكاء الأعمال', 'postgre sql'
        ]
      }
    },
    {
      "InternalName": "Calculation",
      "DisplayNameEn": "Calculation",
      "DisplayName": "آلية حساب المؤشر",
      "type": "dropdownValues",
      options: {
        choices: [
            { display: 'last', value: 'last' },
            { display: 'sum', value: 'sum' },
            { display: 'average', value: 'average' },
        ]
        }
    },
    {
      "InternalName": "Status",
      "DisplayNameEn": "Status",
      "DisplayName": "الحالة",
      "type": "dropdownValues",
      options: {
          choices: [
              { display: 'new', value: 'new' },
              { display: 'actual', value: 'actual' },
              { display: 'target', value: 'target' },
              { display: 'actualcompleted', value: 'actualcompleted' },
              { display: 'targetcompleted', value: 'targetcompleted' },
          ]
      }
    },
    {
      "InternalName": "ResultType",
      "DisplayNameEn": "Result Type",
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
      "InternalName": "Actual",
      "DisplayNameEn": "Actual",
      "DisplayName": "المحقق",
      "type": "float"
    },
    {
      "InternalName": "Total",
      "DisplayNameEn": "Total",
      "DisplayName": "الاجمالي",
      "type": "float"
    },
    {
      "InternalName": "Owner",
      "DisplayNameEn": "Owner",
      "DisplayName": "الجهة المالكة للمؤشر",
      "type": "picker"
    },
    {
      "InternalName": "KPIStatus",
      "DisplayNameEn": "KPI Status",
      "DisplayName": "حالة المؤشر",
      "type": "dropdown",
      options: {
        choices: ['جديد']
      }
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
    // {
    //   "InternalName": "RelatedMainKPI",
    //   "DisplayName": "المؤشر الرئيسي المرتبط",
    //   "type": "lookup",
    //   "source": "MainKPI",
    //   "Dispfieldkey": "Name",
    //   "valfieldkey": "Title"
    // },
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
      "DisplayNameEn": "Related Strategy Objective",
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
      "InternalName": "Source",
      "DisplayNameEn": "Source",
      "DisplayName": "المصدر",
      "type": "picker"
    },
    {
      "InternalName": "Formula",
      "DisplayNameEn": "Formula",
      "DisplayName": "المعادلة",
      "type": "string",
      "maxchar": "250",
    },
   

  ]
},
{
  label: '',
  description: "",
  subFields:[
     

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
      "InternalName": "ActualApproved",
      "DisplayNameEn": "Actual Approved",
      "DisplayName": "المحقق معتمد",
      "type": "string"
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
  {
    "InternalName": "TargetApproved",
    "DisplayNameEn": "Target Approved",
    "DisplayName": "المستهدف معتمد",
    "type": "string"
  },
]
}
];
