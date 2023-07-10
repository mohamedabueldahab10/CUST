var Information_Form = [{
    label: 'التحديات',
    labelEn: 'Issues Data',
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [
        // {
        //     "InternalName": "Title",
        //     "DisplayName":"رمز التحدي",
        //     "type":"string",
        //     "validation": "required"
        // },
        {
            "InternalName": "Name",
            "DisplayName": "اسم التحدي",
            "DisplayNameEn": "Issue Name",
            "type": "string",
            "validation": "required",
           maxchar: '255',
           withletters:true,
           Errmsgkey:"withletterpattern",
           descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
           descPhraseEn: "max length of letters equal 255", 
        },
        {
            "InternalName": "Category",
            "DisplayName": "نوع التحدي",
            "DisplayNameEn": "Category",
            "type": "dropdownValues",
            options: {
                choices: [

                    {
                        display: 'financial',
                        value: 'financial'
                    },
                    {
                        display: 'legal',
                        value: 'legal'
                    },
                    {
                        display: 'contractual',
                        value: 'contractual'
                    }
                ]
            }
        },
        {
            "InternalName": "Priority",
            "DisplayName": "الأولوية",
            "DisplayNameEn": "Priority",
            "type": "dropdownValues",
            options: {
                choices: [
                    { display: 'critical', value: 'critical' },
                    { display: 'high', value: 'high' },
                    { display: 'medium', value: 'medium' },
                    { display: 'low', value: 'low' }
                ]
            }
        },
        {
            "InternalName": "Impact",
            "DisplayName": "الأثر",
            "DisplayNameEn": "Impact",
            "type": "dropdownValues",
            options: {
                choices: [
                    { display: 'high', value: 'high' },
                    { display: 'medium', value: 'medium' },
                    { display: 'low', value: 'low' },
                ]
            }
        },
        {
            "InternalName": "ImpactDescription",
            "DisplayName": "وصف الأثر",
            "DisplayNameEn": "Impact Description",
            "type": "multiline",
            "maxchar": 5000,
            descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
            descPhraseEn: "max length of letters equal 5000", 
        },
        {
            "InternalName": "AssignedTo",
            "DisplayName": "مالك التحدي",
            "DisplayNameEn": "Owner",
            "type": "picker"
        },
        // {
        //     "InternalName": "ResolutionStatus",
        //     "DisplayName": "الحالة",
        //     "DisplayNameEn": "Resolution Status",
        //     "type": "dropdownValues",
        //     options: {
        //         choices: [
        //             { display: 'new', value: 'new' },
        //             { display: 'inprogress', value: 'inprogress' },
        //             { display: 'closed', value: 'closed' },
        //             { display: 'cancelled', value: 'cancelled' },
        //         ]
        //     }
        // },
        // {
        //     "InternalName": "AssignedTo",
        //     "DisplayName": "مسندة إلى الشخص المسؤول ",
        //     "DisplayNameEn": "Assigned To",
        //     "type": "picker"
        // },
        {
            "InternalName": "DateRaised",
            "DisplayName": "تاريخ تحديد التحدي",
            "DisplayNameEn": "Date Raised",
            "type": "datetimetoparent",
            "listname": "Strategic Partnerships", // Displan name of list
            "startinternalname": "StartDate", // internalname of parent start
            "endinternalname": "FinishDate",
            "max": "IssueClosureDate",
            "Errmsgkey":"btwndatepattern",
        },
        {
            "InternalName": "ResolutionTargetDate",
            "DisplayName": "التاريخ المتوقع للحل",
            "DisplayNameEn": "Resolution Target Date",
            type: 'datetimetoparent',
            listname: 'Strategic Partnerships', // Displan name of list
            startinternalname: 'StartDate', // internalname of parent start
            endinternalname: 'FinishDate',
            Errmsgkey:'btwndatepattern',
        },
        {
            "InternalName": "Resolution",
            "DisplayName": "وصف الحل",
            "DisplayNameEn": "Resolution",
            "type": "multiline",
            "maxchar": 5000,
            descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
            descPhraseEn: "max length of letters equal 5000", 
        },
        // {
        //     "InternalName": "ResolutionActualDate",
        //     "DisplayName": "التاريخ الفعلي للحل",
        //     "DisplayNameEn": "Resolution Actual Date",
        //     "type": "datetime",
        //     "max":"today"
        // },
        // {
        //     "InternalName": "DueDate",
        //     "DisplayName": "تاريخ الإستحقاق",
        //     "DisplayNameEn": "Due Date",
        //     "type": "datetime"
        // },
        {
            "InternalName": "IssueClosureDate",
            "DisplayName": "تاريخ اغلاق التحدي",
            "DisplayNameEn": "Issue Closure Date",
            "type": "datetimetoparent",
            "listname": "Strategic Partnerships", // Displan name of list
            "startinternalname": "StartDate", // internalname of parent start
            "endinternalname": "FinishDate",
            "min": "DateRaised",
            "Errmsgkey":"btwndatepattern",
            "ToggleName": "IssueClosureDate",
            "display": "none"
        },
        // {
        //     "InternalName": "ResolutionOwner",
        //     "DisplayName": "المسؤول عن الحل",
        //     "DisplayNameEn": "Resolution Owner",
        //     "type": "picker"
        // },
        // {
        //     "InternalName": "Description",
        //     "DisplayName": "وصف التحدي",
        //     "DisplayNameEn": "Description",
        //     "type": "multiline",
        //     "maxchar": 5000,
        // },
        {
            "InternalName": "Status",
            "DisplayName":"الحالة الكلية للتحدي",
            "type":"dropdownValues",
            "validation": "required",
            options:{
                choices:[
                    {
                        display: 'open',
                        value: 'open'
                    },
                    {
                        display: 'closed',
                        value: 'closed'
                    },
                ]
            },
            toggleValues: [{ value: 'closed', fields: ['IssueClosureDate'] }],
        },
        {
            "InternalName": "Comments",
            "DisplayName": "الملاحظات",
            "DisplayNameEn": "Comments",
            "type": "multiline",
            "maxchar": 5000,
            descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
            descPhraseEn: "max length of letters equal 5000", 
        },
        // {
        //     "InternalName": "Type",
        //     "DisplayName": "نوع التحدي",
        //     "DisplayNameEn": "Type",
        //     "type": "dropdownValues",
        //     options: {
        //         choices: [{
        //                 display: 'issue',
        //                 value: 'issue'
        //             },
        //             {
        //                 display: 'risk',
        //                 value: 'risk'
        //             },
        //             {
        //                 display: 'newrequest',
        //                 value: 'newrequest'
        //             }
        //         ]
        //     }
        // },
        {
            "InternalName": "RaisedBy",
            "DisplayName": "مرفوع بواسطة",
            "DisplayNameEn": "Reported By",
            "type": "picker"
        }

    ]
},
{
    label: 'الوثائق الداعمة',
    labelEn: 'Supporting Documents',
    description: "",
    descriptionEn: "",
    subFields: [{
        "InternalName": "getfile",
        "DisplayName": "المرفقات",
        "DisplayNameEn": "Attachments",
        "type": "file",
        "withAddBtn":"true"
    }]
}
];