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
        DisplayNameEn: 'Risk ID',
        type: 'string',
      },
      {
        InternalName: 'Name',
        DisplayName: 'اسم الخطر',
        DisplayNameEn: 'Risk Name',
        type: 'string',
      },
      {
        "InternalName": "ProjectCode",
        "DisplayName": " المشروع المرتبط",
        "DisplayNameEn": "Project Name",
        "type":  "lookup",
         //from other list:
        "source":  "Projects",
        "Dispfieldkey":  "Name",
        "valfieldkey":  "Title",
        showlink: true,
				linkedto: "projects",
        // "validation": "required"
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
              display: 'contractual',
              value: 'contractual',
            },
            {
              display: 'legal',
              value: 'legal',
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
              display: 'open',
              value: 'open',
            },
            {
              display: 'closed',
              value: 'closed',
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
              display: 'hight',
              value: 'hight',
            },
            {
              display: 'medium',
              value: 'medium',
            },
            {
              display: 'low',
              value: 'low',
            },
          ],
        },
      },
      {
        InternalName: 'DateIdentified',
        DisplayName: 'تاريخ التحديد',
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
              display: 'hight',
              value: 'hight',
            },
            {
              display: 'medium',
              value: 'medium',
            },
            {
              display: 'low',
              value: 'low',
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
              display: 'inprogress',
              value: 'inprogress',
            },
            {
              display: 'done',
              value: 'done',
            },
            // {
            //   display: 'completed',
            //   value: 'completed',
            // },
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
      //   {
      //     InternalName: 'RiskOwner',
      //     DisplayName: 'مالك الخطر',
      //     DisplayNameEn: 'Risk Owner',
      //     type: 'picker',
      //   },

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
        InternalName: 'MoveItToIssueList',
        DisplayName: 'نقلها للائحة التحديات',
        DisplayNameEn: 'Move It To Issue List',
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
    ]
  },
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