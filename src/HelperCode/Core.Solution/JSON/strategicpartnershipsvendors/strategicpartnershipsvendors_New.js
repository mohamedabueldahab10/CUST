var Information_Form = [
   {
      label: 'البيانات الرئيسية',
      labelEn: 'Principal data',
      description: "التفاصيل",
      descriptionEn: "Details",
      subFields: [
         {
            "InternalName":"Name",
            "DisplayName":"اسم الشريك",
            "DisplayNameEn":"Partner Name",
            "type":"string",
            "maxchar":"255",
            "validation":"required",
            withletters:true,
            Errmsgkey:"withletterpattern",
            descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
            descPhraseEn: "max length of letters equal 255", 
         },
         {
            "InternalName":"Classification",
            "DisplayName":"تصنيف الشريك",
            "DisplayNameEn":"Classification",
            "type":"dropdownValues",
            "validation":"required",
            "options":{
               "choices":[
                  {
                     "value":"internal",
                     "display":"internal"
                  },
                  {
                     "value":"external",
                     "display":"external"
                  }
               ]
            },
            toggleValues: [
              { value: 'external', fields: ['Types'] }
            ],
         },
         {
            "InternalName":"Types",
            "DisplayName":"نوع الشريك الخارجي",
            "DisplayNameEn":"Type",
            "type":"dropdownValues",
            "validation":"required",
            "ToggleName": "Types",
            "options":{
               "choices":[
                  {
                     "value":"governmentsector",
                     "display":"governmentsector"
                  },
                  {
                     "value":"semigovernment",
                     "display":"semigovernment"
                  },
                  {
                     "value":"privatesector",
                     "display":"privatesector"
                  },
                  {
                     "value":"nonprofitsector",
                     "display":"nonprofitsector"
                  }
               ]
            }
         },
      ]
   },
   {
      label: 'بيانات الممثل',
      labelEn: 'Representative data',
      description: "التفاصيل",
      descriptionEn: "Details",
      subFields: [
         {
            "InternalName":"RepresentativeName",
            "DisplayName":"اسم الممثل للشريك",
            "DisplayNameEn":"Representative Name",
            "type":"string",
            "maxchar":"255",
            "validation":"required",
            descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
            descPhraseEn: "max length of letters equal 255", 
         },
         {
            "InternalName":"RepresentativeEmail",
            "DisplayName":"ايميل الممثل للشريك",
            "DisplayNameEn":"Representative Email",
            "type":"email",
            "maxchar":"250",
            "validation":"required"
         },
         {
            "InternalName":"RepresentativePhone",
            "DisplayName":"هاتف الممثل للشريك",
            "DisplayNameEn":"Representative Phone",
            // "type":"string",
            "type":"phonenumber",
            "Errmsgkey":"phonenumberpattern",
            "maxchar":"250",
            "validation":"required",
         },
         {
            "InternalName":"JobTitle",
            "DisplayName":"المسمى الوظيفى",
            "DisplayNameEn":"Job Title",
            "type":"string",
            "maxchar":"255",
            "validation":"required",
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