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
            "maxchar":"250",
            "validation":"required"
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
            }
         },
         {
            "InternalName":"Types",
            "DisplayName":"نوع الشريك الخارجي",
            "DisplayNameEn":"Type",
            "type":"dropdownValues",
            "validation":"required",
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
            "maxchar":"250",
            "validation":"required"
         },
         {
            "InternalName":"RepresentativeEmail",
            "DisplayName":"ايميل الممثل للشريك",
            "DisplayNameEn":"Representative Email",
            "type":"string",
            "maxchar":"250",
            "validation":"required"
         },
         {
            "InternalName":"RepresentativePhone",
            "DisplayName":"هاتف الممثل للشريك",
            "DisplayNameEn":"Representative Phone",
            "type":"string",
            "maxchar":"250",
            "validation":"required"
         },
         {
            "InternalName":"JobTitle",
            "DisplayName":"المسمى الوظيفى",
            "DisplayNameEn":"Job Title",
            "type":"string",
            "maxchar":"250",
            "validation":"required"
         },
      ]
   },
   {
      label: 'التفاصيل',
      labelEn: 'Details',
      description: "التفاصيل",
      descriptionEn: "Details",
      subFields: [
         {
            "InternalName":"Comments",
            "DisplayNameEn":"Comments",
            "DisplayName":"ملاحظات",
            "type":"multiline",
            "maxchar":"500"
         },
         {
            "InternalName": "Attachments",
            "DisplayName": "مرفقات",
            "DisplayNameEn": "Attachments",
            "type": "file",
            "withAddBtn":"true"
         }
      ]
   }

   
   // ,{
   //    label: 'المرفقات',
   //    labelEn: 'Attachments',
   //    description: "",
   //    descriptionEn: "",
   //    subFields: [{
   //       "InternalName": "getfile",
   //       "DisplayName": "المرفقات",
   //       "DisplayNameEn": "Attachments",
   //       "type": "file",
   //       "withAddBtn":"true"
   //    }]
   // }
];