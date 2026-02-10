var Information_Form = [
  {
    label: 'بيانات الخطر',
    labelEn: 'Risk Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Title',
        DisplayName: 'رمز الخطر',
        DisplayNameEn: 'Risk Code',
        type: 'string',
      },
      {
        InternalName: 'Name',
        DisplayName: 'اسم الخطر',
        DisplayNameEn: 'Risk Name',
        type: 'string',
      },
        {
        // hol dynamic 3ala l lookup
        InternalName: 'InitiativeCode',
        DisplayNameEn: 'Initiative',
        DisplayName: 'المبادرة المرتبطة',
        type: 'lookup',
        source: 'Initiatives',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        showlink: true,
				linkedto: "initiatives",
        // dynamic:"mainfield",//controls others data
      },
      {
        InternalName: 'Category',
        DisplayName: 'نوع الخطر',
        DisplayNameEn: 'Risk Category',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'financial',
              value: 'financial',
            },
            {
              display: 'legal',
              value: 'legal',
            },
            {
              display: 'contractual',
              value: 'contractual',
            },
            {
              display: 'others',
              value: 'others',
            },
          ],
        },
      },
      {
        InternalName: 'Status',
        DisplayName: 'حالة الخطر',
        DisplayNameEn: 'Status',
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
        type: 'datetime',
      },
      {
        InternalName: 'Description',
        DisplayName: 'وصف الخطر',
        DisplayNameEn: 'Description',
        type: 'multiline',
      },
      {
        InternalName: 'Impact',
        DisplayName: 'الأثر',
        DisplayNameEn: 'Impact',
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
      },
      {
        InternalName: 'ResolutionPlan',
        DisplayName: 'خطة التعامل مع الخطر',
        DisplayNameEn: 'Resolution Plan',
        type: 'multiline',
      },
       {
        InternalName: 'RiskRating',
        DisplayNameEn: 'Risk Rating',
        DisplayName: 'تقييم المخاطر',
        type: "number",   
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
      },
      {
        InternalName: 'Comments',
        DisplayName: 'الملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
      },
      {
        InternalName: 'MitigationStatus',
        DisplayName: 'حالة الاستجابة',
        DisplayNameEn: 'Mitigation Status',
        type: 'dropdownValues',
        options: {
          choices: [
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
            //   value: 'New'
            // }
          ],
        },
      },
      {
        InternalName: 'MitigationOwner',
        DisplayName: 'المسؤول عن الاستجابة',
        DisplayNameEn: 'Mitigation Owner',
        type: 'picker',
      },
      {
        InternalName: 'MitigationTargetDate',
        DisplayName: 'التاريخ المخطط للاستجابة',
        DisplayNameEn: 'Mitigation Target Date',
        type: 'datetime',
      },
      {
        InternalName: 'MitigationActualCompletionDate',
        DisplayName: 'تاريخ الانتهاء من الاستجابة',
        DisplayNameEn: 'Mitigation Actual Completion Date',
        type: 'datetime',
      },
      {
        InternalName: 'MitigationPlan',
        DisplayName: 'خطة الاستجابة',
        DisplayNameEn: 'Mitigation Plan',
        type: 'multiline',
      },
      // {
      //     "InternalName": "RiskClosureDate",
      //     "DisplayName":"تاريخ اغلاق الخطر",
      //     "type":"datetime"
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
      // {
      //   InternalName: 'MoveItToIssueList',
      //   DisplayName: 'نقلها للائحة التحديات',
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
    ]
  },
   {
    label: 'المنظور التحليلي',
    labelEn: 'Analysis Section',
    description: '',
    descriptionEn: '',
    subFields: [
      
         {
        InternalName: 'Analysis',
        DisplayName: 'التحليل',
        DisplayNameEn: 'Analysis',
        type: 'multiline',
      },
       {
        InternalName: 'SuggestSolution',
        DisplayName: 'المعالجة المقترحة',
        DisplayNameEn: 'Suggest Solution',
        type: 'multiline',
      }
   ]},
  {
      label: '',
      labelEn: '',
      description: "",
      descriptionEn: "",
      subFields: [
      // {
      //     "InternalName": "Author",
      //     "DisplayName": "تم الانشاء بواسطة",
      //     "DisplayNameEn": "Author",
      //     "type": "picker",
      //     "state": "disabled",
      // },
    
      {
          "InternalName": "Created",
          "DisplayName": "تاريخ الانشاء ",
          "DisplayNameEn": "Created",
          "type": "datetime",
          "state": "disabled",
      },
      // {
      //     "InternalName": "Editor",
      //     "DisplayName": "تم التعديل بواسطة",
      //     "DisplayNameEn": "Editor",
      //     "type": "picker",
      //     "state": "disabled",
      // },
      {
          "InternalName": "Modified",
          "DisplayName": "تاريخ التعديل",
          "DisplayNameEn": "Modified",
          "type": "datetime",
          "state": "disabled",
      },
  ]
  }
  ];