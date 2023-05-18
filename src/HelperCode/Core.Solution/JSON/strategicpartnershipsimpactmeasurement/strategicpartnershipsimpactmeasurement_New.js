var Information_Form = [
   {
      label: 'البيانات الرئيسية',
      labelEn: 'Principal data',
      description: "",
      descriptionEn: "",
      subFields: [
         {
            "InternalName":"TargetGroup",
            "DisplayName":"الفئة المستهدفة",
            "DisplayNameEn":"Target Group",
            "type":"string",
            "maxchar":"255",
            "validation":"required",
            descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
            descPhraseEn: "max length of letters equal 255", 
         },
         {
            "InternalName":"ImpactType",
            "DisplayName":"نوع الأثر",
            "DisplayNameEn":"Impact Type",
            "type":"dropdownValues",
            "validation":"required",
            "options":{
               "choices":[
                  {
                     "value":"direct",
                     "display":"direct"
                  },
                  {
                     "value":"indirect",
                     "display":"indirect"
                  }
               ]
            }
         },
         {
            "InternalName":"ImpactClassification",
            "DisplayName":"تصنيف الأثر",
            "DisplayNameEn":"Impact Classification",
            "type":"dropdownValues",
            "validation":"required",
            "options":{
               "choices":[
                  {
                     "value":"economical",
                     "display":"economical"
                  },
                  {
                     "value":"social",
                     "display":"social"
                  },
                  {
                     "value":"impactonervices",
                     "display":"impactonervices"
                  },
                  {
                     "value":"others",
                     "display":"others"
                  }
               ]
            }
         },
         {
            "InternalName":"ImpactDescription",
            "DisplayName":"وصف الأثر",
            "DisplayNameEn":"Impact Description",
            // "type":"string",
            // "maxchar":"255",
            "type": "multiline",
            "validation":"required",
            maxchar: 5000,        
            descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
            descPhraseEn: "max length of letters equal 5000", 

         },
         {
            "InternalName":"ImpactDuration",
            "DisplayName":"المدة الزمنية للأثر",
            "DisplayNameEn":"Impact Duration",
            "type":"dropdownValues",
            "validation":"required",
            "options":{
               "choices":[
                  {
                     "value":"tangibleimpact",
                     "display":"tangibleimpact"
                  },
                  {
                     "value":"significantimpactmediumterm6mth",
                     "display":"significantimpactmediumterm6mth"
                  },
                  {
                     "value":"tangibleimpactmediumtermyear",
                     "display":"tangibleimpactmediumtermyear"
                  },
                  {
                     "value":"significantlongtermimpact",
                     "display":"significantlongtermimpact"
                  }
               ]
            }
         },
         {
            "InternalName":"IsImpactSustainable",
            "DisplayName":"هل أثر المنجز مستدام (أكثر من عشر سنوات)؟",
            "DisplayNameEn":"Is Impact Sustainable (more than ten years)?",
            "type":"dropdownValues",
            "validation":"required",
            "options":{
               "choices":[
                  {
                     "value":"yes",
                     "display":"yes"
                  },
                  {
                     "value":"no",
                     "display":"no"
                  },
                  {
                     "value":"unknown",
                     "display":"unknown"
                  }
               ]
            }
         },
         {
            "InternalName":"ImpactLevel",
            "DisplayName":"مستوى الأثر",
            "DisplayNameEn":"ImpactLevel",
            "type":"dropdownValues",
            "validation":"required",
            "options":{
               "choices":[
                  {
                     "value":"special",
                     "display":"special"
                  },
                  {
                     "value":"high",
                     "display":"high"
                  },
                  {
                     "value":"medium",
                     "display":"medium"
                  },
                  {
                     "value":"low",
                     "display":"low"
                  }
               ]
            }
         },
         {
            InternalName:'AchievementCost',
            DisplayName:'تكلفة المنجز',
            DisplayNameEn:'Achievement Cost',
            type:'string',
            maxchar:'255',
           validation: 'required',
           descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
           descPhraseEn: "max length of letters equal 255", 
         },
         {
            InternalName:'FundingSource',
            DisplayName:'مصدر التمويل',
            DisplayNameEn:'Funding Source',
            type:'string',
            maxchar:'255',
           validation: 'required',
           descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
           descPhraseEn: "max length of letters equal 255", 
         },
      ]
   },
   {
      label: 'التفاصيل',
      labelEn: 'Details',
      description: "",
      descriptionEn: "",
      subFields: [
         {
            "InternalName":"Comments",
            "DisplayNameEn":"Comments",
            "DisplayName":"ملاحظات",
            "type":"multiline",
            "maxchar":"5000",
            descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
            descPhraseEn: "max length of letters equal 5000", 
         },
         {
            "InternalName": "getfile",
            "DisplayName": "مرفقات",
            "DisplayNameEn": "Supporting Data",
            "type": "file",
            "withAddBtn":"true"
         }
      ]
   }

   
   // ,{
   //    label: 'الوثائق الداعمة',
   //    labelEn: 'Supporting Documents',
   //    description: "",
   //    descriptionEn: "",
   //    subFields: [{
   //       "InternalName": "getfile",
   //       "DisplayName": "المرفقات",
   //       "DisplayNameEn": "Supporting Data",
   //       "type": "file",
   //       "withAddBtn":"true"
   //    }]
   // }
];