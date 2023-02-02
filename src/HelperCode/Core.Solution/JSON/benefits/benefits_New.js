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
        validation: 'required',
      },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف المنفعة',
        maxchar: '500',
        type: 'multiline',
        validation: 'required',
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
      // {
      //   InternalName: 'RelatedSubKpis',
      //   DisplayNameEn: 'Related Sub Kpis',
      //   DisplayName: 'المؤشرات الفرعية المرتبطة',
      //   type: 'lookupWithQuery',
      //   queryField: 'Types',
      //   queryFieldType: 'dropdownValues', //ex: "Choice"
      //   queryFieldValue: 'sub',
      //   source: 'MainKPI',
      //   // "state": "disabled",
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   validation: 'required',
      // },
      {
        InternalName: 'RelatedSubKpis',
        DisplayNameEn: 'Related Sub Kpis',
        DisplayName: 'المؤشرات الفرعية المرتبطة',
        type: 'lookupmultiselect',
        validation: 'required',
        source: 'MainKPI',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        grpfieldkey: 'Title',
        
        queryField: 'Types', // if i need to make the field with filter should add this like lookupwithquery type
        queryFieldType: 'dropdownValues', //ex: "Choice"// if i need to make the field with filter should add this
        queryFieldValue: 'sublevel2,sublevel3', // if i need to make the field with filter should add this
      },
      // {
      //   InternalName: 'RelatedSubKpis',
      //   DisplayNameEn: 'Related Sub Kpis',
      //   DisplayName: 'المؤشرات الفرعية المرتبطة',
      //   type: 'lookupwithoutrepeat',
      //   listname: 'Benefits',
      //   targetelement: 'RelatedSubKpis',
      //   source: 'MainKPI',
      //   Dispfieldkey: 'Name',
      //   valfieldkey: 'Title',
      //   queryField: 'Types', // if i need to make the field with filter should add this like lookupwithquery type
      //   queryFieldType: 'dropdownValues', //ex: "Choice"// if i need to make the field with filter should add this
      //   queryFieldValue: 'sub', // if i need to make the field with filter should add this
      // }, //inview should be a lookup type
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
      //   type: 'string',
      //   maxchar: '500',
      //   // "state": "disabled",
      //   // dynamic: "Initiative"
      // },
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
    labelEn: 'Benefit Deliverables',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    sectiontype: 'master',
    targetlist: 'BenefitDeliverables',
    subFields: [
      {
        InternalName: 'DeliverableID',
        DisplayNameEn: 'Name',
        DisplayName: 'المخرج',
        // type: 'lookup',
        // Dispfieldkey: 'Name',
        // valfieldkey: 'Title',
        // source: 'Deliverables',
        type: 'lookuptoparentchild',
        parentlist: 'Projects', //parent list name
        parentinternalname: 'RelatedInitiative', // internal name in parent list
        source: 'Deliverables', // target list
        sourceinternalname: 'InitiativeCode', // column in target list
        Dispfieldkey: 'Name', //display in dropdown
        valfieldkey: 'Title', // value in dropdown
      },
      {
        InternalName: 'AcceptanceCriteria',
        DisplayNameEn: 'Acceptance Criteria',
        DisplayName: 'المقياس',
        type: 'multiline',
        state: 'disabled',
      },
    ],
  },
  {
    label: 'وثائق داعمة',
    labelEn: 'Supporting Documents',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'getfile',
        DisplayName: 'المرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        withAddBtn: 'true',
        // validation: 'required',
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
]
