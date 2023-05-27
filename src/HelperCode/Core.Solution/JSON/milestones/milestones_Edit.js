var Information_Form = [
  {
    label: 'بيانات المعلم',
    labelEn: 'Milestone Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    formValuesBasedOnParent: [
      {
        parentList: 'Projects',
        parentFieldName: 'Title',
        fieldName: 'InitiativeType',
        basedOnCondition: true,
        basedOnFieldName: 'Delivered',
        basedOnFieldValue: 'yes',
        valueToSet: [
          {
            condition: 'vision',
            values: [
              {
                fieldNameInList: 'WFModuleCode',
                fieldValueInList: 'VROProjMilestone',
              },
              {
                fieldNameInList: 'WFStage',
                fieldValueInList: 'VROProjMilestone01',
              },
            ],
          },
          {
            condition: 'lms',
            values: [
              {
                fieldNameInList: 'WFModuleCode',
                fieldValueInList: 'LMSProjMilestone',
              },
              {
                fieldNameInList: 'WFStage',
                fieldValueInList: 'LMSProjMilestone01',
              },
            ],
          },
          {
            condition: 'strategically',
            values: [
              {
                fieldNameInList: 'WFModuleCode',
                fieldValueInList: 'EPMOProjMilestone',
              },
              {
                fieldNameInList: 'WFStage',
                fieldValueInList: 'EPMOProjMilestone01',
              },
            ],
          },
        ],
      },
    ],
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayName":"رمز المعلم",
      //   "DisplayNameEn": "Milestone Title",
      //     "type":"string",
      //     "validation": "required"
      // },
      {
        InternalName: 'Name',
        DisplayName: 'اسم المعلم',
        DisplayNameEn: 'Name',
        type: 'string',
        maxchar: '255',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",
        withletters: true,
        Errmsgkey: 'withletterpatteWrn',
        validation: 'required',
        security: {
          groups: ['EPMO', 'System Admin Group'],
        },
      },
      // {
      //   InternalName: 'Weight',
      //   DisplayNameEn: 'Weight',
      //   DisplayName: 'الوزن المكافئ للإنجاز %',
      //   type: 'floatpercentage',
      //   // type: 'weightfloatpercentage',
      //   listname: 'Milestones',
      //   targetcode: 'ProjectCode',
      //   targetelement: 'Weight',
      //   seconedtarget: 'Amount',
      //   validation: 'required',
      //   // "state": "disabled",
      //   // dynamic: "Initiative"
      // },
      {
        InternalName: 'Weight',
        DisplayName: 'الوزن(%)',
        DisplayNameEn: 'Weight (%)',
        type: 'weightfloatpercentage',
        listname: 'Milestones',
        targetcode: 'ProjectCode',
        targetelement: 'Weight',
        seconedtarget: 'Amount',
        descPhraseAr: "من التكلفة",
        descPhraseEn: " From Budget", 
        // "state":"disabled",
        validation: 'required',
        security: {
          groups: ['EPMO', 'System Admin Group'],
        },
      },
      {
        InternalName: 'Amount',
        DisplayName: 'القيمة',
        DisplayNameEn: 'Amount',
        dontSubmit: true,
        type: 'percentbyrelatedparent',
        listname: 'Projects',
        parentinternalname: 'ActualBudget',
        descPhraseAr: "من التكلفة",
        descPhraseEn: " From Budget", 
        targetelement: 'Weight',
        validation: 'required',
        security: {
          groups: ['EPMO', 'System Admin Group'],
        },
      },
      {
        InternalName: 'PlannedDate',
        DisplayName: 'تاريخ الاكتمال المخطط',
        DisplayNameEn: 'Planned Finish Date',
        // type: 'datetime',
        type: 'datetimetoparent',
        validation: 'required',
        listname: 'Projects', // list name
        startinternalname: 'BaselineStartDate', // internalname of parent start
        endinternalname: 'BaselineFinishDate',
        Errmsgkey: 'btwndatepattern',
        security: {
          groups: ['EPMO', 'System Admin Group'],
        },
      },

      //   {
      //     InternalName: 'CommittedDate',
      //     DisplayName: 'تاريخ الالتزام',
      //     DisplayNameEn: 'Committed Date',
      //     type: 'datetime',
      //     validation: 'required',
      //   },
      // {
      //     "InternalName": "ShowInProgramReport",
      //     "DisplayName": "اظهار في التقرير",
      //     "DisplayNameEn": "Show In Report",
      //      "type": "yesnoradio",
      //     options: {
      //         choices: [{
      //             display: 'yes',
      //             value: 'yes'
      //         }, {
      //             display: 'no',
      //             value: 'no'
      //         }]
      //     }

      // },
      {
        InternalName: 'Deliverables',
        DisplayName: 'المخرجات',
        DisplayNameEn: 'Deliverables',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        security: {
          groups: ['EPMO', 'System Admin Group'],
        },
      },
      {
        InternalName: 'Description',
        DisplayName: 'الوصف',
        DisplayNameEn: 'Description',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        security: {
          groups: ['EPMO', 'System Admin Group'],
        },
      },
      // {
      //   InternalName: 'Status',
      //   DisplayName: 'الحالة',
      //   DisplayNameEn: 'Status',
      //   type: 'dropdownValues',
      //   options: {
      //     choices: [
      //       { display: 'onschedule', value: 'onschedule' },
      //       { display: 'completed', value: 'completed' },
      //       { display: 'late', value: 'late' },
      //     ],
      //   },
      // },
      {
        InternalName: 'RelatedInitiativeMilestone',
        DisplayName: 'معلم المبادرة المرتبط',
        DisplayNameEn: 'Related Initiative Milestone',
        // type: 'lookup',
        // source: 'InitiativeMilestones',
        type: 'lookuptoparentchild',
        parentlist: 'Projects', //parent list name
        parentinternalname: 'RelatedInitiative', // internal name in parent list
        source: 'Milestones', // target list
        sourceinternalname: 'InitiativeCode', // column in target list
        Dispfieldkey: 'Name', //display in dropdown
        valfieldkey: 'Title', // value in dropdown
        security: {
          groups: ['EPMO', 'System Admin Group'],
        },
      },
      {
        InternalName: 'Delivered',
        DisplayName: 'مكتمل',
        DisplayNameEn: 'Completed',
        targetfieldrequired: 'getFile,ActualDate', // to make the attache required on yes
        targetfield: 'Status',
        targetfieldvalue: 'completed',
        // validation: 'required',
        type: 'yesnoradio',
        options: {
          choices: [
            { display: 'yes', value: 'yes' },
            { display: 'no', value: 'no' },
          ],
        },
      },
      {
        InternalName: 'ActualDate',
        DisplayName: 'تاريخ الاكتمال الفعلي',
        DisplayNameEn: 'Actual Date',
        // type: 'datetime',
        type: 'datetimetoparent',
        max: 'today',
        listname: 'Projects', // list name
        startinternalname: 'BaselineStartDate', // internalname of parent start
        endinternalname: 'BaselineFinishDate',
        Errmsgkey: 'btwndatepattern',
      },
      {
        InternalName: 'ShowInProgramReport',
        DisplayName: 'اظهار في التقرير',
        DisplayNameEn: 'Show In Program Report',
        type: 'yesnoradio',
        options: {
          choices: [
            {
              display: 'yes',
              value: 'yes',
            },
            {
              display: 'no',
              value: 'no',
            },
          ],
        },
      },
      // {
      //     "InternalName": "SupportDocumentsDescription",
      //     "DisplayNameEn": "Support Documents Description",
      //     "DisplayName": "وصف الوثائق الداعمة",
      //     "type": "multiline",
      //     "maxchar": "500",
      // }
    ],
  },
  {
    label: 'الوثائق داعمة',
    labelEn: 'Supporting Documents',
    description: '',
    descriptionEn: '',
    subFields: [
      {
        InternalName: 'getfile',
        DisplayName: 'الوثائق داعمة',
        DisplayNameEn: 'Supporting Documents',
        type: 'file',
        docPurpose: 'Spporting_Documents',
        withAddBtn: 'true',
        security: {
          groups: ['EPMO', 'System Admin Group'],
        },
      },
      {
        InternalName: 'SupportDocumentsDescription',
        DisplayNameEn: 'Support Documents Description',
        DisplayName: 'وصف الوثائق الداعمة',
        type: 'multiline',
        maxchar: '5000',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
        security: {
          groups: ['EPMO', 'System Admin Group'],
        },
      },
    ],
  },
  {
    label: 'المرفقات',
    labelEn: 'Attachments',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'getfile',
        DisplayName: 'المرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        docPurpose: 'Attachments',
        withAddBtn: 'true',
        security: {
          groups: ['EPMO', 'System Admin Group'],
        },
      },
    ],
  },
  // {
  //   label: 'وثائق داعمة',
  //   labelEn: 'Supporting Documents',
  //   description: 'التفاصيل',
  //   descriptionEn: 'Details',
  //   subFields: [
  //     // {
  //     //   InternalName: 'SupportDocumentsDescription',
  //     //   DisplayNameEn: 'Support Documents Description',
  //     //   DisplayName: 'وصف الوثائق الداعمة',
  //     //   type: 'multiline',
  //     //   maxchar: '500',
  //     // },
  //     // {
  //     //   InternalName: 'Attachment',
  //     //   DisplayName: 'المرفقات',
  //     //   DisplayNameEn: 'Attachment',
  //     //   type: 'file',
  //     //   withAddBtn: 'true',
  //     // },
  //     {
  //       InternalName: 'getfile',
  //       DisplayName: 'مرفقات',
  //       DisplayNameEn: 'Attachments',
  //       type: 'file',
  //       withAddBtn: 'true',
  //       // validation: 'required',
  //     },
  //   ],
  // },
]
