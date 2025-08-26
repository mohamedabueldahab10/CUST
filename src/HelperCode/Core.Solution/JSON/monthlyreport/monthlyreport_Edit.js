var Information_Form  = [
    {
            label: 'الصفحه الأولي فى التقرير الشهري',
            labelEn: 'Analysis Page Report',
            description: '',
            descriptionEn: '',
            subFields: [
             {
                    InternalName: 'Title',
                    DisplayName: 'الكود',
                    DisplayNameEn: 'Title',
                    type: 'string',
                    state: 'disabled'
             },
            {
                InternalName: 'Goal',
                DisplayName: 'الهدف',
                DisplayNameEn: 'Goal',
                type: 'multiline',
                maxchar: 300,
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
                descPhraseEn: "max length of letters equal 255",
            },
            {
                InternalName: 'ExecutionSummary',
                DisplayName: 'الملخص التنفيذي',
                DisplayNameEn: 'Execution Summary',
                type: 'multiline',
                maxchar: 300,
                descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
                descPhraseEn: "max length of letters equal 255",
            }
         ]
    }  
];