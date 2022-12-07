var Information_Form = [
  {
    label: 'بطاقة مقياس المنفعة',
    labelEn: ' Benefit Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayNameEn": "Title",
      //     "DisplayName": "رمز المنفعة",
      //     "type": "string",
      //     "validation": "required",
      //     "maxchar": "250"
      // },
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'المنفعة',
        type: 'string',
        maxchar: '250',
        validation: 'required',
      },

      {
        InternalName: 'Owner',
        DisplayNameEn: 'Benefit Owner',
        DisplayName: ' مالك المنفعة ',
        type: 'picker',
      },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف المنفعة',
        maxchar: '500',
        type: 'multiline',
      },
      {
        InternalName: 'Weight',
        DisplayNameEn: 'Weight',
        DisplayName: 'وزن',
        type: 'floatpercentage',
        // "state": "disabled",
        // dynamic: "Initiative"
      },
      // {
      //   InternalName: 'Equation',
      //   DisplayNameEn: 'Equation',
      //   DisplayName: 'معادلة المقياس',
      //   type: 'string'
      // },
      {
        InternalName: 'RelatedSubKpis',
        DisplayNameEn: 'Related Sub Kpis',
        DisplayName: 'الربط بالمؤشرات الفرعية',
        type: 'lookupWithQuery',
        queryField: 'Types',
        queryFieldType: 'dropdownValues', //ex: "Choice"
        queryFieldValue: 'sub',
        source: 'MainKPI',
        // "state": "disabled",
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
			{
				InternalName: "FromDate",
				DisplayName: "من سنة",
				DisplayNameEn: "From Date",
				max: "ToDate",
				type: "datetime",
      },
			{
				InternalName: "ToDate",
				DisplayName: "من سنة",
				DisplayNameEn: "From Date",
				max: "FromDate",
				type: "datetime",
      },
      {
        InternalName: 'DataSource',
        DisplayNameEn: 'Data Source',
        DisplayName: 'مصدر البيانات',
        type: 'string',
        maxchar: '500',
        // "state": "disabled",
        // dynamic: "Initiative"
      },
      // {
      //   // hol dynamic 3ala l lookup
      //   InternalName: 'InitiativeCode',
      //   DisplayNameEn: 'Initiative',
      //   DisplayName: 'المبادرة المرتبطة',
      //   type: 'lookup',
      //   source: 'Initiatives',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   // dynamic:"mainfield",//controls others data
      // },
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
    ],
  },
  {
    label: 'المخرجات المرتبطة بالمنفعة',
    labelEn: 'Initiative Deliverables',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    sectiontype: 'master',
    targetlist: 'InitiativeDeliverables',
    subFields: [
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'المخرج',
        type: 'string',
        maxchar: '250',
      },
      {
        InternalName: 'DeliverableSuccessKPI',
        DisplayNameEn: 'Deliverable Success KPI',
        DisplayName: 'المقياس',
        type: 'multiline',
      },
    ],
  },
  {
    label: 'وثائق داعمة',
    labelEn: 'Attachments',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Attachments',
        DisplayName: 'مرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        withAddBtn: 'true',
        validation: 'required',
      },
    ],
  },
  // {
  //     label: 'المرفقات',
  //     description: "",
  //     subFields:[
  //         {
  //             "InternalName": "getfile",
  //             "DisplayName":"المستندات",
  //             "type":"file"
  //         }
  //     ]
  // }
]
