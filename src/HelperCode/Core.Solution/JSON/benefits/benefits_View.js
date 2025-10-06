var Information_Form = [
  {
    label: 'بيانات المنفعة',
    labelEn: ' Benefit Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Title',
        DisplayNameEn: 'Title',
        DisplayName: 'رمز المنفعة',
        type: 'string',
        // "maxchar": "250"
      },
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'المنفعة',
        type: 'string',
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
        DisplayName: 'وزن ',
        type: 'floatpercentage',
        // "state": "disabled",
        // dynamic: "Initiative"
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
      {
        InternalName: 'RelatedSubKpis',
        DisplayNameEn: 'Related Sub Kpis',
        DisplayName: 'المؤشرات الفرعية المرتبطة',
        type: 'multiselectstring',
        "Dispfieldkey": "Name",
                "valfieldkey": "Title",
                "source": "MainKPI",
        // queryField: 'Types',
        // queryFieldType: 'dropdownValues', //ex: "Choice"
        // queryFieldValue: 'sub',
        // source: 'MainKPI',
        // // "state": "disabled",
        // Dispfieldkey: 'Name',
        // valfieldkey: 'Title',
      },
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
    ],
  },
  {
        InternalName: 'BenefitStatus',
        DisplayNameEn: 'Benefit Status',
        DisplayName: 'حالة المنفعة',
        ToggleName: 'Benefit Status',
        type: 'dropdownValues',
        options: {
          choices: [
            { display: 'stat15', value: 'لم يتم تحقيقه' },
            { display: 'stat16', value: 'تم تحقيقه جزئياً' },
            { display: 'stat17', value: 'تم تحقيق المستهدف' },
            { display: 'stat18', value: 'لا يقاس' },
            { display: 'stat19', value: 'لا توجد قيمة' },
           
          ],
        }
        },
        {
        InternalName: 'BenefitTarget',
        DisplayNameEn: 'Benefit Traget',
        DisplayName: 'مستهدفات المنفعة',
        maxchar: '500',
        type: 'multiline',
      },
      {
        InternalName: 'PlannedAchievementDate',
         DisplayName: 'تاريخ المخطط لتحقيق المنفعة',
         DisplayNameEn: 'Planned Achievement Date',
         format: 'DateOnly',
         type: 'datetime',
       },
         {
        InternalName: 'Notes',
        DisplayNameEn: 'Notes',
        DisplayName: 'الملاحظات',
        maxchar: '200',
        type: 'multiline',
      },
  {  
  label: 'بيانات المخرجات',
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
        type: 'lookup',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        source: 'Deliverables',
      },
      {
        InternalName: 'AcceptanceCriteria',
        DisplayNameEn: 'Acceptance Criteria',
        DisplayName: 'المقياس - معايير قبول المخرج',
        type: 'multiline',         
        "state": "disabled",
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
