var Information_Form = [{
        label: 'بيانات خطة التواصل',
        labelEn: 'Communication Plan Data',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
            // {
            //     "InternalName": "Title",
            //     "DisplayName":"الرمز",
            //     "type":"string"
            // },
            {
                "InternalName": "Activity",
                "DisplayName": "النشاط/الفعالية",
                "DisplayNameEn": "Activity",
                "type": "string",
                "validation": "required",
                maxchar: 255,  
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
                descPhraseEn: "max length of letters equal 255",       
            },
            {
                "InternalName": "Periodic",
                "DisplayName": "الدورية",
                "DisplayNameEn": "Periodic",
                "type": "string",
                maxchar: 255,
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
                descPhraseEn: "max length of letters equal 255", 
            },
            {
                "InternalName": "Impact",
                "DisplayName": "الأثر",
                "DisplayNameEn": "Impact",
                "type": "multiline",
                "maxchar": 5000,
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
                descPhraseEn: "max length of letters equal 5000", 
            },
            {
                "InternalName": "Objective",
                "DisplayName": "الهدف",
                "DisplayNameEn": "Objective",
                "type": "multiline",
                "maxchar": 5000,
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
                descPhraseEn: "max length of letters equal 5000", 
            },
            {
                "InternalName": "CommunicationTools",
                "DisplayName": "أدوات التواصل",
                "DisplayNameEn": "Communication Tools",
                "type": "multiline",
                "maxchar": 5000,
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
                descPhraseEn: "max length of letters equal 5000", 
            }
            // ,
            // {
            //   "InternalName": "FeedbackMechanism",
            //   "DisplayName": "اليات تجميع التغذية الراجعة",
            //   "DisplayNameEn": "Feedback Mechanism",
            //   "type": "multiline","maxchar": 5000,
            // },
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
          DisplayName: 'المرفقات',
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
    //     subFields: [{
    //         "InternalName": "getfile",
    //         "DisplayName": "المرفقات",
    //         "DisplayNameEn": "Supporting Data",
    //         "type": "file",
    //         "withAddBtn":"true"
    //     }]
    // }


];