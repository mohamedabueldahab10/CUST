var Information_Form = [
  {
    label: 'البيانات الرئيسية',
    labelEn: 'Basic Info',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'الأسم',
        type: 'string',
        validation: 'required',
        maxchar: '255',
        withletters:true,
        Errmsgkey:"withletterpattern",
      },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'الوصف',
        type: 'multiline',
        maxchar: 5000,        
        // "validation": "required"
      },
      {
        InternalName: 'Types',
        DisplayNameEn: 'Strategy Type',
        DisplayName: 'نوع  الاستراتيجية',
        validation: 'required',
        // "toggleValues": ['sub'],
        // "toggleFields": ['Ministry'],
        toggleValues: [
          { value: 'sub', fields: ['Ministry'] },
          { value: 'ministry', fields: ['PillarsExist'] },
          { value: 'vision', fields: ['PillarsExist'] },
          // {value:'strategically', fields:['StrategyRelatedObjective']}
        ],
        type: 'dropdownValues',
        options: {
          choices: [
            // { display: 'main', value: 'main' },
            {
              display: 'ministry',
              value: 'ministry',
              roles: ['Administrator', 'EPMO', 'SPM'],
            },
            {
              display: 'vision',
              value: 'vision',
              roles: ['Administrator', 'VROE', 'VROP'],
            },
            {
              display: 'lms',
              value: 'lms',
              roles: ['Administrator', 'LMSE', 'LMSP'],
            },
            {
              display: 'sectorial',
              value: 'sectorial',
              roles: [
                'Administrator',
                'VROE',
                'VROP',
                'EPMO',
                'SPM',
                'LMSE',
                'LMSP',
              ],
            },
            { display: 'sub', value: 'sub' },

            // { display: 'jobmarket', value: 'jobmarket' },
            // { display: 'transformationally', value: 'transformationally' },
          ],
        },
        requiredValues: [
          { value: 'sub', fields: ['Ministry'] }, //we can put more than 1  field
        ],
      },
      {
        InternalName: 'Ministry',
        DisplayNameEn: 'Related Ministey Startegy',
        DisplayName: 'الاستراتيجية المرتبطة',
        ToggleName: 'Ministry',
        RequiredName: 'Ministry',
        // "type": "lookup",
        type: 'lookupWithQuery',
        queryField: 'Types',
        queryFieldType: 'dropdownValues', //ex: "Choice"
        queryFieldValue: 'ministry',
        validation: 'required',
        //from other list:

        source: 'GoalStrategy',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        display: 'none',
      },
      {
        InternalName: 'Vision',
        DisplayNameEn: 'Vision',
        DisplayName: 'الرؤية',
        type: 'multiline',
        maxchar: 5000,        

      },
      {
        InternalName: 'Value',
        DisplayNameEn: 'Value',
        DisplayName: 'القيم',
        type: 'multiline',
        maxchar: 5000,        

      },
      {
        InternalName: 'Mission',
        DisplayNameEn: 'Mission',
        DisplayName: 'الرسالة',
        type: 'multiline',
        maxchar: 5000,        

      },
      {
        InternalName: 'ApprovalDate',
        DisplayName: 'تاريخ إعتماد الإستراتيجية',
        DisplayNameEn: 'Approval Date',
        type: 'datetime',
        max: 'today'
      },
      {
        InternalName: 'PillarsExist',
        DisplayName: 'هل يوجد محاور استراتيجية / برامج الرؤية ؟',
        ToggleName: 'PillarsExist',
        DisplayNameEn: 'Is Stategic Pillars/Vision Programs Exist?',
        validation: 'required',
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
    ],
  },
  {
    label: 'المحاور الاستراتيجية',
    labelEn: 'Strategy pillars',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    sectiontype: 'master',
    targetlist: 'SPillars',
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayNameEn": "Title",
      //     "DisplayName":"رمز  الركيزةالاستراتيجية",
      //     "type":"string",
      //      "state":"disabled"
      // },

      {
        InternalName: 'Name',
        DisplayNameEn: 'Name',
        DisplayName: 'المحور الاستراتيجي',
        type: 'string',
        validation: 'required',
        maxchar: '255',
        withletters:true,
        Errmsgkey:"withletterpattern",
      },
      // {
      //     "InternalName": "RelatedStrategy",
      //     "DisplayNameEn": "Related Strategy",//uat comment
      //     "DisplayName": "الاستراتيجية المرتبطة",
      //     // "ToggleName": "Ministry",
      //     "type": "lookupWithQuery",
      //     "queryField": "Types",
      //     "queryFieldType": "dropdownValues", //ex: "Choice"
      //     "queryFieldValue": "ministry",
      //     //from other list:

      //     "source": "GoalStrategy",
      //     "Dispfieldkey": "Name",
      //     "valfieldkey": "Title",
      //     "validation": "required"
      //     // "display":"none"
      // },
      // {
      //     "InternalName": "ObjectiveRealized",
      //     "DisplayName":"هل تم تحقيق الهدف؟",
      //     "type":"radio",
      //     options:{
      //         choices:[
      //             'لا','نعم'
      //         ]
      //     }

      // },
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'الوصف',
        type: 'multiline',
        maxchar: 5000,        
        // "validation": "required"
      },
    ],
  },
]
