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
                "validation": "required",
                maxchar: '255',
                withletters:true,
                Errmsgkey:"withletterpattern",
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
                descPhraseEn: "max length of letters equal 255", 
            },
            {
                "InternalName": "AchievementDate",
                "DisplayNameEn": "Achievement Date",
                "DisplayName": "تاريخ المنجز",
                type: 'datetimetoparent',
                listname: 'Strategic Partnerships', // Displan name of list
                startinternalname: 'StartDate', // internalname of parent start
                endinternalname: 'FinishDate',
                Errmsgkey:'btwndatepattern',
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
                maxchar: 5000,     
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
                descPhraseEn: "max length of letters equal 5000",    
 
            }
        ]
    },
    {
        label: 'الوثائق الداعمة',
        labelEn: 'Supporting Documents',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
            {
                "InternalName": "Comments",
                "DisplayName": "ملاحظات",
                "DisplayNameEn": "Comments",
                "type": "multiline",
                maxchar: 5000,   
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
                descPhraseEn: "max length of letters equal 5000",      
 
            },
            {
                "InternalName": "getfile",
                "DisplayName": "مرفقات",
                "DisplayNameEn": "Supporting Data",
                "type": "file",
                "withAddBtn":"true",
                "validation": "required",
            }
        ]
    }
 
 ];