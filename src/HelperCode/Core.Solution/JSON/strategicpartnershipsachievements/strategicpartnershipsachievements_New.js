var Information_Form = [
   {
       label: 'المعلومات الأساسية ',
       labelEn: 'Basic Info',
       description: "التفاصيل",
       descriptionEn: "Details",
       subFields: [
           {
               "InternalName": "AchievementName",
               "DisplayNameEn": "Achievement Name",
               "DisplayName": "اسم المنجز",
               "type": "string",
               "validation": "required"
           },
           {
               "InternalName": "AchievementDate",
               "DisplayNameEn": "Achievement Date",
               "DisplayName": "تاريخ المنجز",
               "type": "datetime",
               "validation": "required"

           }
       ]
   },
   {
       label: 'تفاصيل المنجز',
       labelEn: 'Achievements Details',
       description: "التفاصيل",
       descriptionEn: "Details",
       subFields: [
           {
               "InternalName": "Description",
               "DisplayNameEn": "Description",
               "DisplayName": "وصف المنجز",
               "type": "multiline",
               "validation": "required",
           }
       ]
   },
   {
       label: 'الوثائق الداعمة',
       labelEn: 'Attachments',
       description: "التفاصيل",
       descriptionEn: "Details",
       subFields: [
           {
               "InternalName": "Comments",
               "DisplayName": "ملاحظات",
               "DisplayNameEn": "Comments",
               "type": "multiline"
           },
           {
               "InternalName": "Attachments",
               "DisplayName": "مرفقات",
               "DisplayNameEn": "Attachments",
               "type": "file",
               "withAddBtn":"true",
               "validation": "required",
           }
       ]
   }

];