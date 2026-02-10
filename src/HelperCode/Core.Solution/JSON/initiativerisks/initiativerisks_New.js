var Information_Form = [
  {
    label: 'بيانات الخطر',
    labelEn: 'Risk Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayName":"رمز الخطر",
      //     "type":"string",
      //     "validation": "required"
      // },
      {
        InternalName: 'Name',
        DisplayName: 'اسم الخطر',
        DisplayNameEn: 'Risk Name',
        type: 'string',
        validation: 'required',
        maxchar: '255',
        // withletters:true,
        Errmsgkey:"withletterpattern",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255",  
      },
      {
        InternalName: 'Category',
        DisplayName: 'نوع الخطر',
        DisplayNameEn: 'Risk Category',
        // type: 'string',
        type: 'dropdownValues',
        options: {
            choices: [

                {
                    display: 'financial',
                    value: 'financial'
                },
                {
                    display: 'legal',
                    value: 'legal'
                },
                {
                    display: 'contractual',
                    value: 'contractual'
                },
                {
                    display: 'others',
                    value: 'others'
                }
            ]
        }
      },
      {
        InternalName: 'Status',
        DisplayName: 'حالة الخطر',
        DisplayNameEn: 'Status',
        validation: 'required',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'closed',
              value: 'closed',
            },
            {
              display: 'open',
              value: 'open',
              selected: 'selected',
            },
          ],
        },
      },
      {
        InternalName: 'Probability',
        DisplayName: 'إحتمالية الحدوث',
        DisplayNameEn: 'Probability',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'rare',
              value: 'rare',
            },
            {
              display: 'unlikely',
              value: 'unlikely',
            },
            {
              display: 'possible',
              value: 'possible',
            },
            {
              display: 'likely',
              value: 'likely',
            },
            {
              display: 'frequent',
              value: 'frequent',
            },
          ],
        },
      },
      {
        InternalName: 'DateIdentified',
        DisplayName: 'تاريخ تحديد الخطر',
        DisplayNameEn: 'Date Identified',
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Initiatives',
        startinternalname: 'StartDate',
        endinternalname: 'FinishDate',
        Errmsgkey:'btwndatepattern',
      },
      {
        InternalName: 'Description',
        DisplayName: 'وصف الخطر',
        DisplayNameEn: 'Description',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        InternalName: 'Impact',
        DisplayName: 'الأثر',
        DisplayNameEn: 'Impact',
        validation: 'required',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'verylow',
              value: 'verylow',
            },
            {
              display: 'low',
              value: 'low',
            },
            {
              display: 'medium',
              value: 'medium',
            },
            {
              display: 'high2',
              value: 'high2',
            },
            {
              display: 'critical2',
              value: 'critical2',
            },
          ],
        },
      },
      {
        InternalName: 'ImpactDescription',
        DisplayName: 'وصف الأثر',
        DisplayNameEn: 'Impact Description',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        InternalName: 'ResolutionPlan',
        DisplayName: 'خطة التعامل مع الخطر',
        DisplayNameEn: 'Resolution Plan',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        InternalName: 'Comments',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      {
        InternalName: 'MitigationStatus',
        DisplayName: 'حالة الاستجابة',
        DisplayNameEn: 'Mitigation Status',
        type: 'dropdownValues',
        options: {
          choices: [
            // {
            //     display: 'completed',
            //     value: 'completed'
            // },
            {
              display: 'notstarted',
              value: 'notstarted',
            },
            {
              display: 'inprogress2',
              value: 'inprogress2',
            },
            {
              display: 'donecomplete',
              value: 'donecomplete',
            },
            // ,
            // {
            //   display: 'new',
            //   value: 'new'
            // }
          ],
        },
      },
      {
        InternalName: 'MitigationOwner',
        DisplayName: 'المسؤول عن الاستجابة',
        DisplayNameEn: 'Mitigation Owner',
        type: 'picker',
        validation: 'required',
      },
      {
        InternalName: 'MitigationTargetDate',
        DisplayName: 'التاريخ المخطط للاستجابة',
        DisplayNameEn: 'Mitigation Target Date',
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Initiatives',
        startinternalname: 'StartDate',
        endinternalname: 'FinishDate',
        Errmsgkey:'btwndatepattern',
      },
      {
        InternalName: 'MitigationActualCompletionDate',
        DisplayName: 'تاريخ الانتهاء من الاستجابة',
        DisplayNameEn: 'Mitigation Actual Completion Date',
        // type: 'datetime',
        type: 'datetimetoparent',
        listname: 'Initiatives',
        startinternalname: 'StartDate',
        endinternalname: 'FinishDate',
        Errmsgkey:'btwndatepattern',
      },
      {
        InternalName: 'MitigationPlan',
        DisplayName: 'خطة الاستجابة',
        DisplayNameEn: 'Mitigation Plan',
        type: 'multiline',
        maxchar: 5000,
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000",
      },
      // {
      //     "InternalName": "RiskClosureDate",
      //     "DisplayName":"تاريخ اغلاق الخطر",
      //     "type":"datetime",
      //     "state":"disabled"
      // },
      // {
      //     "InternalName": "RiskOwner",
      //     "DisplayName": "مالك الخطر",
      //     "DisplayNameEn": "Risk Owner",
      //     "type": "picker"
      // },
      {
        InternalName: 'AgreedAction',
        DisplayName: 'الاجراءات المتفق عليها',
        DisplayNameEn: 'Agreed Action',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'mitigate',
              value: 'mitigate',
            },
            {
              display: 'monitor',
              value: 'monitor',
            },
            {
              display: 'leave',
              value: 'leave',
            },
            {
              display: 'move',
              value: 'move',
            },
            {
              display: 'avoid',
              value: 'avoid',
            },
            {
              display: 'assumption',
              value: 'assumption',
            },
          ],
        },
      },
      {
        InternalName: 'RiskRating',
        DisplayNameEn: 'Risk Rating',
        DisplayName: 'تقييم المخاطر',
        type: "number",   
        "state": "disabled"   
      },
       {
        InternalName: 'RiskRatingStatus',
        DisplayName: 'حالة تقييم المخاطر',
        DisplayNameEn: 'Risk Rating Status',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'stat36',
              value: 'stat36',
            },
            {
              display: 'stat37',
              value: 'stat37',
            },
            {
              display: 'stat38',
              value: 'stat38',
            },
            {
              display: 'stat39',
              value: 'stat39',
            },
            {
              display: 'stat40',
              value: 'stat40',
            },
          ],
        },
      "state": "disabled"
      },
      // {
      //   InternalName: 'MoveItToIssueList',
      //   DisplayName: 'نقلها للائحة المعوقات',
      //   DisplayNameEn: 'Move It To Issue List',
      //   type: 'yesnoradio',
      //   options: {
      //     choices: [
      //       {
      //         display: 'yes',
      //         value: 'yes',
      //       },
      //       {
      //         display: 'no',
      //         value: 'no',
      //       },
      //     ],
      //   },
      // },
      {
        InternalName: 'InitiativeEscalation',
        DisplayName: 'التصعيد لخطر مبادرة',
        DisplayNameEn: 'Escalate As Initiative Risk',
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
    label: 'الوثائق الداعمة',
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
      },
    ],
  },
]
