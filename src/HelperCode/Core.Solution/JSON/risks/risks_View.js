var Information_Form = [{
    label: 'بيانات الخطر',
    labelEn: 'Risk Data',
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [

        {
            "InternalName": "Title",
            "DisplayName": "رمز الخطر",
            "DisplayNameEn": "Risk Code",
            "type": "string"
        },
        {
            "InternalName": "Name",
            "DisplayName": "اسم الخطر",
            "DisplayNameEn": "Risk Name",
            "type": "string"
        },
        {

            "InternalName": "Category",
            "DisplayName": "نوع الخطر",
            "DisplayNameEn": "Risk Category",
            "type": "dropdownValues",
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
      "InternalName": "Status",
      "DisplayName": "حالة الخطر",
      "DisplayNameEn": "Status",
      "type": "dropdownValues",
      options: {
        choices: [

                    {
                        display: 'closed',
                        value: 'closed'
                    },
                    {
                        display: 'open',
                        value: 'open'
                    }
                ]

            }
        },
        {
            "InternalName": "Probability",
            "DisplayName": "إحتمالية الحدوث",
            "DisplayNameEn": "Probability",
            "type": "dropdownValues",
            options: {
                choices: [

                    {
                        display: 'hight',
                        value: 'hight'
                    },
                    {
                        display: 'medium',
                        value: 'medium'
                    },
                    {
                        display: 'low',
                        value: 'low'
                    }
                ]
            }
        },
        {
            "InternalName": "DateIdentified",
            "DisplayName": "تاريخ تحديد الخطر",
            "DisplayNameEn": "Date Identified",
            "type": "datetime"
        },
        {
            "InternalName": "Description",
            "DisplayName": "وصف الخطر",
            "DisplayNameEn": "Description",
            "type": "multiline"
        },
        {
            "InternalName": "Impact",
            "DisplayName": "الأثر",
            "DisplayNameEn": "Impact",
            "type": "dropdownValues",
            options: {
                choices: [

                    {
                        display: 'hight',
                        value: 'hight'
                    },
                    {
                        display: 'medium',
                        value: 'medium'
                    },
                    {
                        display: 'low',
                        value: 'low'
                    }
                ]
            }
        },
        {
            "InternalName": "ImpactDescription",
            "DisplayName": "وصف الأثر",
            "DisplayNameEn": "Impact Description",
            "type": "multiline"
        },
        {
            "InternalName": "ResolutionPlan",
            "DisplayName": "خطة التعامل مع الخطر",
            "DisplayNameEn": "Resolution Plan",
            "type": "multiline"
        },
        {
            "InternalName": "Comments",
            "DisplayName": "الملاحظات",
            "DisplayNameEn": "Comments",
            "type": "multiline"
        },
        {
            "InternalName": "MitigationStatus",
            "DisplayName": "حالة الاستجابة",
            "DisplayNameEn": "Mitigation Status",
            "type": "dropdownValues",
            options: {
                choices: [

                    {
                        display: 'completed',
                        value: 'completed'
                    },
                    {
                        display: 'inprogress',
                        value: 'inprogress'
                    }
                    // ,
                    // {
                    //   display: 'new',
                    //   value: 'New'
                    // }
                ]
            }

        },
        {
            "InternalName": "MitigationOwner",
            "DisplayName": "المسؤول عن الاستجابة",
            "DisplayNameEn": "Mitigation Owner",
            "type": "picker"
        },
        {
            "InternalName": "MitigationTargetDate",
            "DisplayName": "التاريخ المخطط للاستجابة",
            "DisplayNameEn": "Mitigation Target Date",
            "type": "datetime"
        },
        {
            "InternalName": "MitigationActualCompletionDate",
            "DisplayName": "تاريخ الانتهاء من الاستجابة",
            "DisplayNameEn": "Mitigation Actual Completion Date",
            "type": "datetime"
        },
        {
            "InternalName": "MitigationPlan",
            "DisplayName": "خطة الاستجابة",
            "DisplayNameEn": "Mitigation Plan",
            "type": "multiline"
        },
        // {
        //     "InternalName": "RiskClosureDate",
        //     "DisplayName":"تاريخ اغلاق الخطر",
        //     "type":"datetime"
        // },
        {
            "InternalName": "RiskOwner",
            "DisplayName": "مالك الخطر",
            "DisplayNameEn": "Risk Owner",
            "type": "picker"
        },
        {
            "InternalName": "MoveItToIssueList",
            "DisplayName": "نقلها للائحة التحديات",
            "DisplayNameEn": "Move It To Issue List",
            "type": "yesnoradio",
            options: {
                choices: [{
                    display: 'yes',
                    value: 'yes'
                }, {
                    display: 'no',
                    value: 'no'
                }]
            }
        },
        {
            "InternalName": "AgreedAction",
            "DisplayName": "الاجراءات المتفق عليها",
            "DisplayNameEn": "Agreed Action",
            "type": "dropdownValues",
            options: {
                choices: [{
                        display: 'mitigate',
                        value: 'mitigate'
                    },
                    {
                        display: 'monitor',
                        value: 'monitor'
                    },
                    {
                        display: 'leave',
                        value: 'leave'
                    },
                    {
                        display: 'move',
                        value: 'move'
                    },
                    {
                        display: 'avoid',
                        value: 'avoid'
                    },
                    {
                        display: 'assumption',
                        value: 'assumption'
                    }
                ]
            }
        }

    ]
}];