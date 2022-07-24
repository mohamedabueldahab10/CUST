var Information_Form  = [
    {
        label: 'بيانات المهمة',
        labelEn:'Task Data',
        description: "التفاصيل",
        descriptionEn:"Details",
        subFields: [
            {
                "InternalName": "Title",
                "DisplayName":"رمز المهمة",
                "DisplayNameEn": "Task Code",
                "type":"string"
                
                
            },
            {
                "InternalName": "Name",
                "DisplayName":"اسم المهمة",
                "DisplayNameEn": "Task Name",
                "type":"string"
                
                
            },
            {
                "InternalName": "AssignedTo",
                "DisplayName":"نقل الى",
                "DisplayNameEn": "Assigned To",
                "type":"picker"
            
            },
            {
                "InternalName": "Body",
                "DisplayName":"الوصف ",
                "DisplayNameEn": "Body",
                "type":"multiline"
            
            },
            {
                "InternalName": "PercentComplete",
                "DisplayName":"نسبة الإنجاز",
                "DisplayNameEn": "Percent Complete",
                "type":"float"
            
            },
            {
                "InternalName": "Priority",
                "DisplayName":"الاولوية ",
                "DisplayNameEn": "Priority",
                "type":"dropdownValues",
                options:{
                    choices:[
                        { display: 'hight', value: 'hight' },
                        { display: 'medium', value: 'medium' },
                        { display: 'low', value: 'low' }
                    ]
                }
            
            },
            // {
            //     "InternalName": "PlannedStartDate",
            //     "DisplayName":"تاريخ بدء المخطط",
            //     "DisplayNameEn": "Planned Start Date",
            //     "type":"datetime"
           
            // },
            // {
            //     "InternalName": "PlannedFinishDate",
            //     "DisplayName":"تاريخ انتهاء المخطط",
            //     "DisplayNameEn": "Planned Finish Date",
            //     "type":"datetime"
           
            // },
            // {
            //     "InternalName": "ActualStartDate",
            //     "DisplayName":"تاريخ البدء الفعلي",
            //     "DisplayNameEn": "Actual Start Date",
            //     "type":"datetime"
           
            // },
            // {
            //     "InternalName": "ActualFinishDate",
            //     "DisplayName":"تاريخ الانتهاء الفعلي",
            //     "DisplayNameEn": "Actual Finish Date",
            //     "type":"datetime"
           
            // },
            {
                "InternalName": "Status",
                "DisplayName":"الحالة",
                "DisplayNameEn": "Status",
                "type":"dropdownValues",
                options:{
                    choices:[
                        { display: 'cancelled3', value: 'cancelled3' },
                        { display: 'pending3', value: 'pending3' },
                        { display: 'inprogress', value: 'inprogress' },
                        { display: 'notstarted1', value: 'notstarted1' },
                        { display: 'completed3', value: 'completed3' }
                    ]
                }
            },
          
            {
                "InternalName": "TaskOwner",
                "DisplayName":"صاحب المهمة",
                "DisplayNameEn": "Task Owner",
                "type":"picker"
                
                
            },
            {
                "InternalName": "Portfolio",
                "DisplayName":"المحفظة",
                "DisplayNameEn": "Portfolio",
                "type":"string"
                
                
            },
            // {
            //     "InternalName": "ProgressAchived",
            //     "DisplayName":"التقدم المحقق",
            //     "DisplayNameEn": "Progress Achived",
            //     "type":"string"
                
                
            // },
            // {
            //     "InternalName": "PendingActions",
            //     "DisplayName":"الإجراءات المعلقة",
            //     "DisplayNameEn": "Pending Actions",
            //     "type":"multiline"
                
                
            // }
        ]
    },
];