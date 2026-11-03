var Information_Form = [
  {
    label: "بيانات المنفعة",
    labelEn: " Benefit Data",
    description: "التفاصيل",
    descriptionEn: "Details",
    workflowSetValues: [
      { fieldName: 'WFModuleCode', value: '', stages: ['MSActualBenefit04'] },
      { fieldName: 'WFStage', value: '', stages: ['MSActualBenefit04'] },
    ],
    subFields: [
      {
        InternalName: "Title",
        DisplayNameEn: "Title",
        DisplayName: "رمز المنفعة",
        type: "string",
        // "maxchar": "250"
      },
      {
        InternalName: "Name",
        DisplayNameEn: "Name",
        DisplayName: "المنفعة",
        type: "string",
        // "maxchar": "250",
        // "validation": "required"
      },
      // {
      // hol dynamic 3ala l lookup
      //     "InternalName": "InitiativeCode",
      //     "DisplayNameEn": "Initiative",
      //     "DisplayName": "المبادرة المرتبطة",
      //     "type": "lookup",
      //     "source": "Initiatives",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title",
      //     // dynamic:"mainfield",//controls others data

      // },
      {
        InternalName: "Owner",
        DisplayNameEn: "Benefit Owner",
        DisplayName: " مالك المنفعة ",
        type: "picker",
      },
      {
        InternalName: "Description",
        DisplayNameEn: "Description",
        DisplayName: "وصف المنفعة",
        maxchar: "500",
        type: "multiline",
      },
      {
        InternalName: "Weight",
        DisplayNameEn: "Weight",
        DisplayName: "وزن ",
        type: "floatpercentage",
        // "state": "disabled",
        // dynamic: "Initiative"
      },
       {
        InternalName: "measurementEntity",
        DisplayNameEn: "measurementEntity",
        DisplayName: "جهة القياس",
        type: "string",
        // "maxchar": "250",
        // "validation": "required"
      },
      // {
      //   InternalName: 'BenefitScale',
      //   DisplayNameEn: 'Benefit Scale',
      //   DisplayName: 'مقياس المنفعة',
      //   type: 'string',
      // },
      // {
      //   InternalName: 'Formula',
      //   DisplayNameEn: 'Formula',
      //   DisplayName: 'معادلة المقياس',
      //   type: 'string',
      //   maxchar: '250',
      // },
      // {
      //   InternalName: "RelatedSubKpis",
      //   DisplayNameEn: "Related Sub Kpis",
      //   DisplayName: "المؤشرات الفرعية المرتبطة",
      //   type: "multiselectstring",
      //   Dispfieldkey: "Name",
      //   valfieldkey: "Title",
      //   source: "MainKPI",
      //   showlink: true,
      //   linkedto: "mainkpi",
      //   // queryField: 'Types',
      //   // queryFieldType: 'dropdownValues', //ex: "Choice"
      //   // queryFieldValue: 'sub',
      //   // source: 'MainKPI',
      //   // // "state": "disabled",
      //   // Dispfieldkey: 'Name',
      //   // valfieldkey: 'Title',
      // },
      // {
      //   InternalName: 'FromDate',
      //   DisplayName: 'من سنة',
      //   DisplayNameEn: 'From Date',
      //   max: 'ToDate',
      //   type: 'datetime',
      //   validation: 'required',
      // },
      // {
      //   InternalName: 'ToDate',
      //   DisplayName: 'إلى سنة',
      //   DisplayNameEn: 'To Date',
      //   min: 'FromDate',
      //   type: 'datetime',
      //   validation: 'required',
      // },
      // {
      //   InternalName: 'DataSource',
      //   DisplayNameEn: 'Data Source',
      //   DisplayName: 'مصدر البيانات',
      //   type: 'string'
      // },
      // {
      //   InternalName: 'RelatedStrategyObjective',
      //   DisplayNameEn: 'Objective Name',
      //   DisplayName: 'هدف الوكالة',
      //   type: 'lookup',
      //   source: 'SOs',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      // },
      // {
      //   InternalName: 'MinistryGoal',
      //   DisplayNameEn: 'Ministry Goal',
      //   DisplayName: 'هدف الوزارة',
      //   // "ToggleName":"SubRelatedObjective",
      //   type: 'lookupWithQuery',
      //   queryField: 'Types',
      //   queryFieldType: 'Choices', //ex: "Choice"
      //   queryFieldValue: 'ministry',
      //   //from other list:
      //   source: 'SOs',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   // "display":"none"
      // },

      // {
      //     "InternalName": "Owner",
      //     "DisplayNameEn": "Initiative Owner",
      //     "DisplayName": "مالك المبادرة ",
      //     "type": "picker",
      //     // "state": "disabled",
      //     // dynamic: "Initiative" get it based on initiative
      // },
      // {
      //   InternalName: 'DataSource',
      //   DisplayNameEn: 'Data Source',
      //   DisplayName: 'مصدر البيانات',
      //   type: 'string',
      //   maxchar: '500',
      //   // "state": "disabled",
      //   // dynamic: "Initiative"
      // },
      // {
      //   InternalName: 'Polarity',
      //   DisplayNameEn: 'Polarity',
      //   DisplayName: 'قطبية المقياس',
      //   type: 'dropdown',
      //   //   "state": "disabled",
      //   //   dynamic: "Initiative",
      //   options: {
      //     choices: ['+', '-'],
      //   },
      // },
      // {
      //   InternalName: 'ResultType',
      //   DisplayNameEn: 'Result Type',
      //   // "state": "disabled",
      //   // dynamic: "Initiative",
      //   DisplayName: 'وحدة القياس',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       { display: 'number', value: 'number' },
      //       { display: 'percentage', value: 'percentage' },
      //     ],
      //   },
      // },
     // {
       // InternalName: "RelatedBenefit",
       // DisplayNameEn: "RelatedBenefit",
       // DisplayName: "المنفعة المرتبطة",
       // type: "lookup",
       // source: "Benefits",
       // Dispfieldkey: "Name",
       // valfieldkey: "Title",
        // dynamic:"mainfield",//controls others data
      //},
       {
        InternalName: "assumptions",
        DisplayNameEn: "assumptions",
        DisplayName: "الافتراضات ",
        type: "string",
        // "maxchar": "250",
        // "validation": "required"
      },
      {
        InternalName: "PeriodType",
        DisplayNameEn: "Period Type",
        DisplayName: "دورية القياس",
        type: "dropdownValues",
        toggleValues: [
          { value: "monthly", fields: ["Months"] },
          { value: "quarter", fields: ["Quarter"] },
          { value: "midterm", fields: ["Midterms"] },
          { value: "year", fields: [] },
        ],
        state: "disabled",
        options: {
          choices: [
            { display: "monthly", value: "monthly" },
            { display: "quarter", value: "quarter" },
            { display: "midterm", value: "midterm" },
            { display: "year", value: "year" },
          ],
        },
      },
      {
        InternalName: "MesureStatus",
        DisplayNameEn: "MesureStatus",
        DisplayName: "حالة القياس",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "mersurable", value: "mersurable" },
            { display: "unmersurable", value: "unmersurable" },
          //  { display: "unspecific", value: "unspecific" },
          ],
        },
      },
      {
        InternalName: "Polarity",
        DisplayNameEn: "Polarity",
        DisplayName: "قطبية المنفعة",
        type: "string",
      },
      {
        InternalName: "ResultType",
        DisplayNameEn: "Result Type",
        DisplayName: "وحدة القياس",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "number", value: "number" },
            { display: "percentage", value: "percentage" },
          ],
        },
      },
               {
        InternalName: "Note",
        DisplayNameEn: "Note",
        DisplayName: "ملاحظات جهة القياس",
        maxchar: "200",
        type: "multiline",
      },
      {
        InternalName: "FromDate",
        DisplayName: "من سنة",
        DisplayNameEn: "From Date",
        type: "string",
      },
      {
        InternalName: "ToDate",
        DisplayName: "إلى سنة",
        DisplayNameEn: "To Date",
        type: "string",
      },
      {
        InternalName: "DataSource",
        DisplayNameEn: "Data Source",
        DisplayName: "مصدر البيانات",
        type: "string",
        maxchar: "500",
      },   
      {
        InternalName: 'CompletionStatus',
        DisplayNameEn: 'Completion Status',
        DisplayName: 'مكتمل',
        type: 'yesnoradio',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
          ],
        }
      },
      {
        InternalName: "InitiativeCode",
        DisplayNameEn: "Initiative Manager",
        DisplayName: "مدير المبادرة",
        type: "LookupPicker",
        source: "Initiatives", // target list
        Dispfieldkey: "InitiativePM",
        valfieldkey: "Title",
      },
         {
        InternalName: "cumulativeBenefit",
        DisplayNameEn: "cumulativeBenefit",
        DisplayName: " تراكمية المنفعة",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "yes", value: "yes" },
            { display: "no", value: "no" },
          ],
        },
      },
      {
        InternalName: "BenefitStatus",
        DisplayNameEn: "Benefit Status",
        DisplayName: "حالة المنفعة",
        ToggleName: "Benefit Status",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "stat44", value: "stat44" },
            { display: "stat45", value: "stat45" },
            { display: "stat46", value: "stat46" },   
            { display: "stat47", value: "stat47" },
            { display: "stat48", value: "stat48" },
            { display: "stat49", value: "stat49" },
          ],
        },
      },
      {
        InternalName: "WFStage",
        DisplayName: " المرحلة",
        DisplayNameEn: "Stage",
        type: "lookup",
        source: "Tasks Configuration",
        Dispfieldkey: "TaskNameAr",
        DispfieldkeyEn: "TaskNameEn",
        valfieldkey: "Title",
      },
     // {
       // InternalName: "BenefitTarget",
       // DisplayNameEn: "Benefit Traget",
       // DisplayName: "مستهدفات المنفعة",
       // maxchar: "500",
       // type: "multiline",
     // },
      {
        InternalName: "PlannedAchievementDate",
        DisplayName: "تاريخ المخطط لتحقيق المنفعة",
        DisplayNameEn: "Planned Achievement Date",
        format: "DateOnly",
        type: "datetime",
      },
      {
        InternalName: "Notes",
        DisplayNameEn: "Notes",
        DisplayName: "ملاحظات أداء المنفعة",
        maxchar: "200",
        type: "multiline",
      },
    ],
  },
  {
    label: 'مكونات المعادلة',
    labelEn: 'Equation Component',
    description: 'يمكن ادخال القيم عند ادخال معادلة للمنفعة',
    descriptionEn: 'you can enter the values when enter the benefit Equation',
    subFields: [
      {
        InternalName: 'benefitEquation',
        DisplayNameEn: 'Benefit Equation',
        DisplayName: 'معادلة المنفعة',
        type: 'string',
        state: 'disabled',
        //editableBy: "InitiativeManager",
      },
      {
        InternalName: 'Quarter',
        DisplayNameEn: 'Quarter',
        DisplayName: 'الربع',
        ToggleName: 'Quarter',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'quarter1', value: 'ActualQ1' },
            { display: 'quarter2', value: 'ActualQ2' },
            { display: 'quarter3', value: 'ActualQ3' },
            { display: 'quarter4', value: 'ActualQ4' },
          ],
        },
      },
      {
        InternalName: 'Midterms',
        DisplayNameEn: 'Midterms',
        DisplayName: 'النصف السنوي',
        ToggleName: 'Midterms',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'midterm1', value: 'ActualMid1' },
            { display: 'midterm2', value: 'ActualMid2' },
          ],
        },
      },
      {
        InternalName: 'Year',
        DisplayNameEn: 'Year',
        DisplayName: 'السنة',
        type: 'dropdown',
        options: {
          choices: [
            '2020',
            '2021',
            '2022',
            '2023',
            '2024',
            '2025',
            '2026',
            '2027',
            '2028',
            '2029',
            '2030',
          ],
        },
      },
      {
        InternalName: 'Months',
        DisplayNameEn: 'Month',
        DisplayName: 'الشهر',
        ToggleName: 'Months',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'month1', value: 'ActualM1' },
            { display: 'month2', value: 'ActualM2' },
            { display: 'month3', value: 'ActualM3' },
            { display: 'month4', value: 'ActualM4' },
            { display: 'month5', value: 'ActualM5' },
            { display: 'month6', value: 'ActualM6' },
            { display: 'month7', value: 'ActualM7' },
            { display: 'month8', value: 'ActualM8' },
            { display: 'month9', value: 'ActualM9' },
            { display: 'month10', value: 'ActualM10' },
            { display: 'month11', value: 'ActualM11' },
            { display: 'month12', value: 'ActualM12' },
          ],
        },
      },
      {
        InternalName: 'A',
        DisplayName: 'المكون الأول (A)',
        DisplayNameEn: 'A',
        type: 'float',
        //editableBy: "InitiativeManager",
      },
      {
        InternalName: 'B',
        DisplayName: 'المكون الثاني (B)',
        DisplayNameEn: 'B',
        type: 'float',
        //editableBy: "InitiativeManager",
      },
      {
        InternalName: 'CC',
        DisplayName: 'المكون الثالث (C)',
        DisplayNameEn: 'C',
        type: 'float',
        //editableBy: "InitiativeManager",
      },
      {
        InternalName: 'D',
        DisplayName: 'المكون الرابع (D)',
        DisplayNameEn: 'D',
        type: 'float',
        //editableBy: "InitiativeManager",
      },
      {
        InternalName: 'E',
        DisplayName: 'المكون الخامس (E)',
        DisplayNameEn: 'E',
        type: 'float',
        //editableBy: "InitiativeManager",
      },
      {
        InternalName: 'F',
        DisplayName: 'المكون السادس (F)',
        DisplayNameEn: 'F',
        type: 'float',
        //editableBy: "InitiativeManager",
      },
      {
        InternalName: 'G',
        DisplayName: 'المكون السابع (G)',
        DisplayNameEn: 'G',
        type: 'float',
        //editableBy: "InitiativeManager",
      },
      {
        InternalName: 'Equation',
        DisplayNameEn: 'Actual value',
        DisplayName: 'القيمة الفعلية',
        type: 'float',
        //editableBy: "InitiativeManager",
      },
      {
        InternalName: 'ActualkpiDate',
        DisplayName: 'تاريخ رفع القيمه الفعليه',
        DisplayNameEn: 'ActualkpiDate',
        type: 'datetime',
      },
      {
        InternalName: 'PerformanceAnalysis',
        DisplayNameEn: 'Performance Analysis',
        DisplayName: 'تحليل الأداء',
        maxchar: '500',
        type: 'multiline',
      },
      {
        InternalName: 'Actual',
        DisplayName: 'الإجمالي الفعلي السنوي',
        DisplayNameEn: 'Annual Actual Total',
        ToggleName: 'Actual',
        type: 'float',
        dontSubmit: true,
        security: {
          groups: [
            'Initiative Manager',
            'SPM Team',
            'System Admin Group',
            'EPMO',
            'SPM Admin',
          ],
        },
        display: 'none',
      },
    ],
  },
  {
    label: "بيانات المخرجات",
    labelEn: "Benefit Deliverables",
    description: "التفاصيل",
    descriptionEn: "Details",
    sectiontype: "master",
    targetlist: "BenefitDeliverables",
    subFields: [
      {
        InternalName: "DeliverableID",
        DisplayNameEn: "Name",
        DisplayName: "المخرج",
        type: "lookup",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        source: "InitiativeDeliverables",
      },
      {
        InternalName: "AcceptanceCriteria",
        DisplayNameEn: "Description",
        DisplayName: "الوصف",
        type: "multiline",
      },
    ],
  },

  // {
  //     label: 'الوثائق الداعمة',
  //     description: "",
  //     subFields:[
  //         {
  //             "InternalName": "getfile",
  //             "DisplayName":"المستندات",
  //             "type":"file"
  //         }
  //     ]
  // }
];
