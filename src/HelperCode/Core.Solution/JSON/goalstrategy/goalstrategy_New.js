
var Information_Form = [
    {
        label: 'الاستراتيجية ',
        labelEn: ' Strategy',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
            {
                "InternalName": "Name",
                "DisplayNameEn": "Name",
                "DisplayName": "الأسم",
                "type": "string",
                "validation": "required"
            },

            {
                "InternalName": "Types",
                "DisplayNameEn": "Strategy Type",
                "DisplayName": "نوع  الاستراتيجية",
                "validation": "required",
                // "toggleValues": ['sub'],
                // "toggleFields": ['Ministry'],
                "toggleValues": [
                    { value: 'sub', fields: ['Ministry'] },
                    { value: 'ministry', fields: ['PillarsExist'] },
                    { value: 'vision', fields: ['PillarsExist'] },
                    // {value:'strategically', fields:['StrategyRelatedObjective']}
                ],
                "type": "dropdownValues",
                options: {
                    choices: [
                        // { display: 'main', value: 'main' },
                        { display: 'sub', value: 'sub' },
                        { display: 'vision', value: 'vision', roles:["Administrator","VROE","VROP"] },
                        { display: 'ministry', value: 'ministry', roles:["Administrator","EPMO","SPM"] },
                        { display: 'sectorial', value: 'sectorial', roles:["Administrator","VROE","VROP","EPMO","SPM","LMSE","LMSP"] },
                        { display: 'lms', value: 'lms', roles:["Administrator","LMSE","LMSP"]},

                        // { display: 'jobmarket', value: 'jobmarket' },
                        // { display: 'transformationally', value: 'transformationally' },
                    ]
                }

            },
            {
                "InternalName": "Description",
                "DisplayNameEn": "Description",
                "DisplayName": "الوصف",
                "type": "multiline",
                // "validation": "required"

            },
            {
                "InternalName": "Ministry",
                "DisplayNameEn": "Ministry",
                "DisplayName": "الوزارة",
                "ToggleName": "Ministry",
                "type": "lookupWithQuery",
                "queryField": "Types",
                "queryFieldType": "dropdownValues", //ex: "Choice"
                "queryFieldValue": "ministry",
                //from other list:

                "source": "GoalStrategy",
                "Dispfieldkey": "Name",
                "valfieldkey": "Title",
                "display": "none"
            },
            {
                "InternalName": "Vision",
                "DisplayNameEn": "Vision",
                "DisplayName": "الرؤية",
                "type": "string",
            },
            {
                "InternalName": "Value",
                "DisplayNameEn": "Value",
                "DisplayName":"القيم",
                "type": "string",
            },
            {
                "InternalName": "Mission",
                "DisplayNameEn": "Mission",
                "DisplayName": "الرسالة",
                "type": "string",
            },
            {
                "InternalName": "ApprovalDate",
                "DisplayName":"تاريخ إعتماد الإستراتيجية",
                "DisplayNameEn": "Approval Date",
                "type":"datetime"
            },
            {
                "InternalName": "PillarsExist",
                "DisplayName": "هل يوجد محاور؟",
                "ToggleName": "PillarsExist",
                "DisplayNameEn": "Is Pillars Exist?",
                "validation": "required",
                "type": "yesnoradio",
                options: {
                    choices: [{
                        display: 'yes',
                        value: 'yes'
                    },
                    {
                        display: 'no',
                        value: 'no'
                    }
                    ]
                },

            },
        ]
    },
    {
        label: 'المحاور الاستراتيجية',
        labelEn: 'Strategy pillars',
        description: "التفاصيل",
        descriptionEn: "Details",
        sectiontype: "master",
        targetlist: "SPillars",
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
                "DisplayName": "المحور الاستراتيجي",
                "type": "string",
                // "validation": "required"

            },
            // {
            //     "InternalName": "RelatedStrategy",
            //     "DisplayNameEn": "Related Strategy",//uat comment
            //     "DisplayName": "الاستراتيجية المرتبطة",
            //     // "ToggleName": "Ministry",
            //     "type": "lookupWithQuery",
            //     "queryField": "Types",
            //     "queryFieldType": "dropdownValues", //ex: "Choice"
            //     "queryFieldValue": "ministry",
            //     //from other list:

            //     "source": "GoalStrategy",
            //     "Dispfieldkey": "Name",
            //     "valfieldkey": "Title",
            //     "validation": "required"
            //     // "display":"none"
            // },
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
                "DisplayName": "الوصف",
                "type": "multiline",
                // "validation": "required"

            },
        ]
    }

];