var Information_Form  = [
    {
        label: 'المحاور الاستراتيجية',
      labelEn: 'Strategy pillars',
      description: "التفاصيل",
      descriptionEn: "Details",
      subFields: [
        // {
        //     "InternalName": "Title",
        //     "DisplayNameEn": "Title",
        //     "DisplayName":"رمز  الركيزةالاستراتيجية",
        //     "type":"string",
        //      "state":"disabled"
        // },
        {
            "InternalName": "Name",
            "DisplayNameEn": "Name",
            "DisplayName":"المحور الاستراتيجي",
            "type":"string",
           
        },
        {
            "InternalName": "RelatedStrategy",
            "DisplayNameEn": "Related Strategy",
            "DisplayName":"الاستراتيجية المرتبطة",
            // "ToggleName": "Ministry",
            "type": "lookupWithQuery",
            "queryField": "Types",
            "queryFieldType": "Choice", //ex: "Choice"
            "queryFieldValue": "ministry",
            //from other list:
            
            "source": "GoalStrategy",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",
            // "display":"none"
        },
        // {
        //     "InternalName": "ObjectiveRealized",
        //     "DisplayName":"هل تم تحقيق الهدف؟",
        //     "type":"radio",
        //     options:{
        //         choices:[
        //             'لا','نعم'
        //         ]
        //     }
            
            
        // },
        {
            "InternalName": "Description",
            "DisplayNameEn": "Description",
            "DisplayName":"الوصف",
            "type":"multiline"
       
        },
    ]
}
];