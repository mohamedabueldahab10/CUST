var Information_Form = [
  {
    label: "بيانات المنفعة",
    labelEn: " Benefit Data",
    description: "التفاصيل",
    descriptionEn: "Details",
    formDefaultValues: [
      {
        fieldName: "WFModuleCode",
        value: "InitiativeBenefits",
        roles: [
          "System Admin Group",
          "EPMO",
          "HeadCommitte",
          "Initiative Manager",
          "SPM Admin",
          "LMSU-Execution",
          "VRO_E",
        ],
      },
      {
        fieldName: "WFInitiatedBy",
        value: "LoggedInUser",
        roles: [
          "System Admin Group",
          "EPMO",
          "HeadCommitte",
          "Initiative Manager",
          "SPM Admin",
          "LMSU-Execution",
          "VRO_E",
        ],
      },
      {
        fieldName: "WFStage",
        value: "InitiativeBenefits01",
        roles: [
          "System Admin Group",
          "EPMO",
          "HeadCommitte",
          "Initiative Manager",
          "SPM Admin",
          "LMSU-Execution",
          "VRO_E",
        ],
      },
    ],
    // formDefaultValues: [
    //   //VRO
    //   { fieldName: 'WFModuleCode', value: 'VROBenefitActual',roles: ['VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },
    //   { fieldName: 'WFStage', value: 'VROBenefitActual01',roles: ['VROHead','VROPHead','VROP','VPlanningUnitHead','VPlanningUnit','VROEHead','VROE'], },

    //   //EPMOCRInitiative
    //   { fieldName: 'WFModuleCode', value: 'EPMOBenefitActual',roles: ['EPMO','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },
    //   { fieldName: 'WFStage', value: 'EPMOBenefitActual01',roles: ['EPMO','SPMOHead','SPMO','DU','SPMAdmin','SPMTeam','StrategyTeam','CRCommittee'], },

    //   //LMS
    //   { fieldName: 'WFModuleCode', value: 'LMSBenefitActual',roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },
    //   { fieldName: 'WFStage', value: 'LMSBenefitActual01',roles: ['LMSE','LMSP','LMSUExecution','LMSUPerformance','LMSUControl'], },

    // ],
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
     // {
       // InternalName: "BenefitTarget",
        //DisplayNameEn: "Benefit Traget",
        //DisplayName: "مستهدفات المنفعة",
        //maxchar: "500",
        //type: "multiline",
      //},
           {
        InternalName: "measurementEntity",
        DisplayNameEn: "measurementEntity",
        DisplayName: "جهة القياس",
        maxchar: "200",
        type: "multiline",
      },
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
        InternalName: "referenceEntity",
        DisplayNameEn: "referenceEntity",
        DisplayName: "جهة المقارنة المعيارية",
        type: "multiline",
        maxchar: "255",
      },
      {
        InternalName: "bencmarkValue",
        DisplayNameEn: "bencmarkValue",
        DisplayName: "قيمة المقارنة الفعلية",
        type: "multiline",
        maxchar: "255",
      },
          {
        InternalName: "benefitEquation",
        DisplayNameEn: "benefitEquation",
        DisplayName: "معادلة المنفعة",
        type: "multiline",
        maxchar: "255",
      },

    
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
      //   //////
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
      // {
      //   InternalName: 'DeliverableID',
      //   DisplayNameEn: 'Name',
      //   DisplayName: 'المخرج',

      //   type: 'lookupchildtoparent',
      //   childlist: 'Projects', //child list name
      //   childinternalparentname: 'RelatedInitiative', // child internal name related to parent
      //   childinternalparenttype:'Text',
      //   childinternalname:"Title", // child internal name need to use to parent
      //   source: 'Deliverables', // target list
      //   sourceinternalname: 'ProjectCode', // column in target list
      //   Dispfieldkey: 'Name', //display in dropdown
      //   valfieldkey: 'Title', // value in dropdown

      // },
      //{
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
      //},
             {
        InternalName: "cumulativeBenefit",
        DisplayNameEn: "CumulativeBenefit",
        DisplayName: " تراكمية المنفعة",
        type: 'yesnoradio',
        options: {
          choices: [
            { display: 'yes', value:  "تراكمي" },
            { display: 'no', value: "غير تراكمي" },
          ],
        },
      },
      
      {
        InternalName: "PeriodType",
        DisplayNameEn: "Period Type",
        DisplayName: "دورية القياس",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "monthly", value: "monthly" },
            { display: "quarter", value: "quarter" },
            { display: "midterm", value: "midterm" },
            { display: "year", value: "year" },
          ],
        },
        validation: "required",
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
           // { display: "unspecific", value: "unspecific" },
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
        validation: "required",
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
      // {
      //   InternalName: "PerformanceLeader",
      //   DisplayNameEn: "Initiative Manager",
      //   DisplayName: "مدير المبادرة",
      //   type: "picker",
      //   validation: "required",
      // },
        //{
        //InternalName: 'CompletionStatus',
        //DisplayNameEn: 'Completion Status',
        //DisplayName: 'مكتمل',
        //type: 'yesnoradio',
        //options: {
         // choices: [
          //  { display: 'yes', value: 'yes' },
           // { display: 'no', value: 'no' },
         // ],
        //}, security: {
         // groups: [
           // 'SPM Admin',
         // ],
        //},
      //},
    ],
  },
  {
    label: "بيانات المخرجات",
    labelEn: "Project Deliverable",
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
    label: "وثائق داعمة",
    labelEn: "Supporting Documents",
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [
      {
        InternalName: "getfile",
        DisplayName: "المرفقات",
        DisplayNameEn: "Attachments",
        type: "file",
        withAddBtn: "true",
        fileExtensions: "png,jpeg,svg,msg,rar,pptx,xlsx,docx,pdf",
        validation: "required",
        // fileExtensions: 'png,jpeg,svg,xlsx,docx,jpg,txt,pdf',
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
];
