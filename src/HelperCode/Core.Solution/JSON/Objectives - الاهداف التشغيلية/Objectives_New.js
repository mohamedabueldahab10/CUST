var Information_Form  = [
    {
        label: 'Objectives Data',
        description: "Details",
        subFields: [
            {
                "InternalName": "Title",
                "DisplayName":"الهدف",
                "type":"string"
            },
            {
                "InternalName": "ObjectiveRealized",
                "DisplayName":"هل تم تحقيق الهدف",
                "type":"dropdown",
                options:{
                    choices:[
                        'لا', 'نعم'
                    ]
                }
               
            },
            {
                "InternalName": "ReasonForNoAchive",
                "DisplayName":"أسباب عدم تحقق الهدف  ",
                "type":"multiline"
            }   
           
        ]
    },
];