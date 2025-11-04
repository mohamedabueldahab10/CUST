var Information_Form = [
  {
    label: "بيانات المنفعة",
    labelEn: " Benefit Data",
    description: "التفاصيل",
    descriptionEn: "Details",
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
        InternalName: "Name",
        DisplayNameEn: "Name",
        DisplayName: "المنفعة",
        type: "string",
        validation: "required",
        maxchar: "255",
        withletters: true,
        Errmsgkey: "withletterpattern",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
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
      {
        InternalName: "Owner",
        DisplayNameEn: "Benefit Owner",
        DisplayName: " مالك المنفعة ",
        type: "picker",
        validation: "required",
      },
      {
        InternalName: "Description",
        DisplayNameEn: "Description",
        DisplayName: "وصف المنفعة",
        maxchar: 5000,
        type: "multiline",
        validation: "required",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        InternalName: "Weight",
        DisplayNameEn: "Weight",
        DisplayName: "وزن",
        type: "floatpercentagemaxfromparent",
        validation: "required",
        descPhraseAr: "%يجب ان يكون مجموع أوزان المنافع 100",
        descPhraseAn: "The total weight of benefits must be 100%",
        siblingslistname: "Benefits",
        siblingstargetcode: "InitiativeCode",
      },

      {
        InternalName: "measurementEntity",
        DisplayNameEn: "measurementEntity",
        DisplayName: "جهة القياس",
        maxchar: 200,
        type: "multiline",
      },
      {
        InternalName: "referenceEntity",
        DisplayNameEn: "referenceEntity",
        DisplayName: "جهة المقارنة المعيارية",
        type: "multiline",
        maxchar: 255,
      },
      {
        InternalName: "bencmarkValue",
        DisplayNameEn: "bencmarkValue",
        DisplayName: "قيمة المقارنة الفعلية",
        type: "multiline",
        maxchar: 255,
      },
          {
        InternalName: "benefitEquation",
        DisplayNameEn: "benefitEquation",
        DisplayName: "معادلة المنفعة",
        type: "multiline",
        maxchar: 255,
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
      //   type: "lookupmultiselect",
      //   validation: "required",
      //   source: "MainKPI",
      //   Dispfieldkey: "Name",
      //   valfieldkey: "Title",
      //   grpfieldkey: "Title",
      //   initiativeCodeInList: true, //value in look up drop down should be related to current project
      //   Errmsgkey: "multiselecterr",
      //   //
      //   queryField: "KPIType", //
      //   queryFieldType: "Choice",
      //   queryFieldValue: ["sublevel2", "sublevel3"], // to get the data fot these two values
      // },
      {
        InternalName: "RelatedSubKpis",
        DisplayNameEn: "Related Kpis",
        DisplayName: "المؤشرات المرتبطة",
        type: "lookupmultiselectfromrelatedparent",
        source: "MainKPI",
        Dispfieldkey: "Name",
        valfieldkey: "Title",
        grpfieldkey: "Title",
        Errmsgkey: "multiselecterr",
        currentlistQueryField:"RelatedStrategyObjective",
        parentlistQueryField:"RelatedObjective",
        parentsource:"Initiatives",
      },
     // {
       // InternalName: "RelatedBenefit",
        //DisplayNameEn: "Related Benefit",
        //DisplayName: "المنفعة المرتبطة",
        //type: "lookupwithoutrepeat",
        //source: "Benefits",
        //initiativeCodeInList: true,
        //Dispfieldkey: "Name",
        //valfieldkey: "Title",
        //listname: "BenefitMetrics",
        //targetelement: "RelatedBenefit",
        //
      //},
      {
        InternalName: "MesureStatus",
        DisplayNameEn: "MesureStatus",
        DisplayName: "حالة القياس",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "mersurable", value: "mersurable" },
            { display: "unmersurable", value: "unmersurable" },
            //{ display: "unspecific", value: "unspecific" },
          ],
        },
        validation: "required",
      },
      {
        InternalName: "Polarity",
        DisplayNameEn: "Polarity",
        DisplayName: "قطبية المنفعة",
        type: "dropdown",
        options: {
          choices: ["+", "-"],
        },
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
          { value: "year", fields: ["Years"] },
        ],
        
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
        validation: "required",
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
        type: "yearInput",
        listname: "Initiatives",
        startinternalname: "StartDate",
        endinternalname: "FinishDate",
        max: "ToDate",
        validation: "required",
        
        Errmsgkey: "fromyearpattern",
        security: {
          groups: [
            "EPMO",
            "System Admin Group",
            "Development Unit",
          ],
        },
      },
      {
        InternalName: "ToDate",
        DisplayName: "إلى سنة",
        DisplayNameEn: "To Date",
        type: "yearInput",
        listname: "Initiatives",
        startinternalname: "StartDate",
        endinternalname: "FinishDate",
        min: "FromDate",
        validation: "required",
        
        Errmsgkey: "toyearpattern",
           security: {
          groups: [
            "EPMO",
            "System Admin Group",
            "Development Unit",
          ],
        },
      },
      {
        InternalName: "DataSource",
        DisplayNameEn: "Data Source",
        DisplayName: "مصدر البيانات",
        type: "string",
        maxchar: "255",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
      },
      {
        InternalName: "BenefitStatus",
        DisplayNameEn: "Benefit Status",
        DisplayName: "حالة المنفعة",
        ToggleName: "Benefit Status",
        validation: "required",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "stat15", value: "stat15" },
            { display: "stat16", value: "stat16" },
            { display: "stat17", value: "stat17" },
            { display: "stat18", value: "stat18" },
            { display: "stat19", value: "stat19" },
          ],
        },
        security: {
          groups: [
            "EPMO",
            "System Admin Group",
            "Development Unit",
          ],
        },
      },
     // {
       // InternalName: "BenefitTarget",
        //DisplayNameEn: "Benefit Traget",
        //DisplayName: "مستهدفات المنفعة",
        //maxchar: "500",
        //type: "multiline",
      //},
      {
        InternalName: "PlannedAchievementDate",
        DisplayName: "تاريخ المخطط لتحقيق المنفعة",
        DisplayNameEn: "Planned Achievement Date",
        format: "DateOnly",
        type: "datetime",
        validation: "required",
      },
        {
        InternalName: "assumptions",
        DisplayNameEn: "Assumptions",
        DisplayName: " الافتراضات",
        maxchar: "200",
        type: "multiline",
      },
      {
        InternalName: "Notes",
        DisplayNameEn: "Notes",
        DisplayName: "ملاحظات أداء المنفعة",
        maxchar: "200",
        type: "multiline",
      },
      {
        InternalName: "cumulativeBenefit",
        DisplayNameEn: "CumulativeBenefit",
        DisplayName: " تراكمية المنفعة",
         type: 'yesnoradio',
        options: {
          choices: [
            { display: 'yes', value:  'yes' },
            { display: 'no', value: 'no' },
          ],
        },
      },
        {
        InternalName: "CompletionStatus",
        DisplayNameEn: "Completion Status",
        DisplayName: "مكتمل",
        type: 'yesnoradio',
        options: {
          choices: [
            { display: 'yes', value:  'yes' },
            { display: 'no', value: 'no' },
          ],
        },
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
    label: "بيانات المخرجات",
    labelEn: "Benefit Deliverables",
    description: "التفاصيل",
    descriptionEn: "Details",
    sectiontype: "master",
    targetlist: "BenefitDeliverables",
    subFields: [
      // {
      //   InternalName: "DeliverableID",
      //   DisplayNameEn: "Name",
      //   DisplayName: "المخرج",

      //   type: "lookupchildtoparent",
      //   childlist: "Projects", //child list name
      //   childinternalparentname: "RelatedInitiative", // child internal name related to parent
      //   childinternalparenttype: "Text",
      //   childinternalname: "Title", // child internal name need to use to parent
      //   source: "Deliverables", // target list
      //   sourceinternalname: "ProjectCode", // column in target list
      //   Dispfieldkey: "Name", //display in dropdown
      //   valfieldkey: "Title", // value in dropdown
      //   valsiblingkey: "AcceptanceCriteria", // internal name on sorce list
      //   targetsiblingkey: "AcceptanceCriteria", // internal name on current list
      // },
      {
        InternalName: "DeliverableID",
        DisplayNameEn: "Name",
        DisplayName: "المخرج",
        type: "lookup",
        source: "InitiativeDeliverables", // target list
        Dispfieldkey: "Name", //display in dropdown
        valfieldkey: "Title", // value in dropdown
        valsiblingkey: "Description", // internal name on sorce list
        targetsiblingkey: "AcceptanceCriteria", // internal name on current list
        initiativeCodeInList: true,        
      },
      {
        InternalName: "AcceptanceCriteria",
        DisplayNameEn: "Description",
        DisplayName: "الوصف",
        type: "multiline",
        state: "disabled",
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
    ],
  },
  {
    label: "الوثائق الداعمة",
    description: "",
    subFields: [
      {
        InternalName: "getfile",
        DisplayName: "المستندات",
        DisplayNameEn: "Supporting Data",
        type: "file",
        fileExtensions: "png,jpeg,svg,msg,rar,pptx,xlsx,docx,pdf",
        withAddBtn: "true",
      },
    ],
  },
];
