var Information_Form = [
  {
    label: 'بيانات خطة التواصل',
    labelEn: 'Communication Plan Data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      // {
      //     "InternalName": "Title",
      //     "DisplayName":"الرمز",
      //     "type":"string"
      // },
      {
        InternalName: 'Activity',
        DisplayName: 'النشاط/الفعالية',
        DisplayNameEn: 'Activity',
        type: 'string',
        validation: 'required',
      },
      {
        InternalName: 'Periodic',
        DisplayName: 'الدورية',
        DisplayNameEn: 'Periodic',
        type: 'string',
      },
      {
        InternalName: 'Impact',
        DisplayName: 'الأثر',
        DisplayNameEn: 'Impact',
        type: 'multiline',
      },
      {
        InternalName: 'Objective',
        DisplayName: 'الهدف',
        DisplayNameEn: 'Objective',
        type: 'multiline',
      },
      {
        InternalName: 'CommunicationTools',
        DisplayName: 'أدوات التواصل',
        DisplayNameEn: 'Communication Tools',
        type: 'multiline',
      },
      // ,
      // {
      //     "InternalName": "FeedbackMechanism",
      //     "DisplayName":"اليات تجميع التغذية الراجعة",
      //     "DisplayNameEn":"Feedback Mechanism",
      //     "type":"multiline"
      // }
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
        DisplayName: 'مرفقات',
         DisplayNameEn: 'Attachments',
        type: 'file',
        withAddBtn: 'true',
        // validation: 'required',
      },
    ],
  },
  // {
  //     label: 'الوثائق الداعمة',
  //     labelEn: 'Supporting Documents',
  //     description: "",
  //     descriptionEn: "",
  //     subFields:[
  //         {
  //             "InternalName": "getfile",
  //             "DisplayName":"المرفقات",
  //             "DisplayNameEn":"Attachments",
  //             "type":"file",
  //             "withAddBtn":"true"
  //         }
  //     ]
  // }
]
