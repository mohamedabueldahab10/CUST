var Information_Form  = [
    {
        label: 'المبادرات',
        labelEn: 'Initiative Data',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [
        // {
        //     "InternalName": "Title",
        //     "DisplayName":"رمز المبادرة ",
        //     "DisplayNameEn": "Code",
        //     "type":"string" ,
        //     "validation": "required"

        // },
        {
            "InternalName": "Name",
            "DisplayNameEn": "Name",
            "DisplayName":"اسم المبادرة",
            "type":"string",
            "maxchar": "250",
            "validation": "required"
        },
       
        {
            "InternalName": "Description",
            "DisplayNameEn": "Description",
            "DisplayName":"وصف المبادرة",
            "type":"multiline",
            "maxchar": "500",

        },
        {
            "InternalName": "InitiativeOwner",
            "DisplayNameEn": "Initiative Owner",
            "DisplayName": "مالك المبادرة ",
            "type": "picker"
        },
        {
            "InternalName": "StartDate",
            "DisplayName": "تاريخ بداية المبادرة ",
            "DisplayNameEn": "Start Date",
            "type": "datetime",
            "max":"FinishDate"
        },
        {
            "InternalName": "FinishDate",
            "DisplayName": "تاريخ نهاية المبادرة ",
            "DisplayNameEn": "Finish Date",
            "type": "datetime",
            "max":"StartDate"
        },   

    ]
},
{
    label: 'مخرجات المبادرة',
    labelEn: 'Initiative Deliverables',
    description: "التفاصيل",
    descriptionEn: "Details",
    sectiontype: "master",
    targetlist: "InitiativeDeliverables",
    subFields: [
        {
            "InternalName": "Name",
            "DisplayNameEn": "Name",
            "DisplayName":"اسم المخرج",
            "type":"string",
            "maxchar": "250",
            "validation": "required"
        },
        {
            "InternalName": "PlannedCompletedDate",
            "DisplayNameEn": "Planned Completed Date",
            "DisplayName":"تاريخ الاكتمال المخطط",
            "type":"datetime"
        },
        {
            "InternalName": "DeliverableSuccessKPI",
            "DisplayNameEn": "Deliverable Success KPI",
            "DisplayName":"مقياس نجاح المخرج  (إن وجد)",
            "type":"string"
        },
        {
            "InternalName": "Target",
            "DisplayNameEn": "Target",
            "DisplayName":"المستهدف (إن وجد)",
            "type":"float"
        },
        {
            "InternalName": "Completed",
            "DisplayNameEn": "Completed",
            "DisplayName":"حالة الاكتمال",
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
            }
        },
        {
            "InternalName": "ActualCompletedDate",
            "DisplayNameEn": "Actual Completed Date",
            "DisplayName":"تاريخ الاكتمال الفعلي",
            "type":"datetime",
            "max":"today",
            "Errmsgkey": "cancelationdatepattern",
        },
    ]
},

{
    label: 'معالم المبادرة',
    labelEn: 'Initiative Milestones',
    description: "التفاصيل",
    descriptionEn: "Details",
    sectiontype: "master",
    targetlist: "InitiativeMilestones",
    subFields: [
        
        {
            "InternalName": "Name",
            "DisplayNameEn": "Name",
            "DisplayName":"اسم المعلم",
            "type":"string",
            "maxchar": "250",
            "validation": "required"
        },
        {
            "InternalName": "PlannedCompletedDate",
            "DisplayNameEn": "Planned Completed Date",
            "DisplayName":"تاريخ الاكتمال المخطط",
            "type":"datetime"
        },
        {
            "InternalName": "Weight",
            "DisplayNameEn": "Weight",
            "DisplayName":"الوزن المكافئ للإنجاز %",
            "type":"floatpercentage"
        },
       
        {
            "InternalName": "Completed",
            "DisplayNameEn": "Completed",
            "DisplayName":"حالة الاكتمال",
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
            }
        },
        {
            "InternalName": "ActualCompletedDate",
            "DisplayNameEn": "Actual Completed Date",
            "DisplayName":"تاريخ الاكتمال الفعلي",
            "type":"datetime",
            "max":"today",
            "Errmsgkey": "cancelationdatepattern",
        },
    ]
},

];