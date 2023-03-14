var Information_Form  = [
    {
        label: 'بيانات محضر الاجتماع',
        labelEn:'Meeting Data',
        description: "التفاصيل",
        descriptionEn:"Details",
        subFields: [
            
            // {
            //     "InternalName": "Title",
            //     "DisplayName":"رمز الاجتماع",
           // "DisplayNameEn": "Meeting Name",
            //     "type":"string",
            //     "state":"disabled"
            
            // },
            // {
            //     "InternalName": "ProjectCode",
            //     "DisplayName":"اسم المشروع",
            //     "DisplayNameEn": "Project Name",
            //     "type": "lookup",
            //      //from other list:
            //      "source": "Projects",
            //      "Dispfieldkey": "Name",   
            //       "valfieldkey": "Title" ,
            //     "validation": "required"
                

            // },
            {
                "InternalName": "Subject",
                "DisplayName":"موضوع الاجتماع",
                "DisplayNameEn": "Meeting Subject",
                "type":"string",
                "validation": "required",
                maxchar: 255,

                
            },
            {
                "InternalName": "Date",
                "DisplayName":"تاريخ الاجتماع",
                "DisplayNameEn": "Meeting Date",
                "type":"datewithtime",
                "validation": "required"
            
            },
            {
                "InternalName": "Location",
                "DisplayName":"مكان الاجتماع",
                "DisplayNameEn": "Meeting Location",
                "type": "string",
                maxchar: 255,
                //  //from other list:
                //  "source": "Regions",
                //  "Dispfieldkey": "Title",   
                //   "valfieldkey": "Title" 
                
            },
            {
                "InternalName": "Attendees",
                "DisplayName":"الحضور",
                "DisplayNameEn": "Attendees",
                "type":"multiline",
                maxchar: 5000,
                
                
            },
            {
                "InternalName": "MeetingObjectives",
                "DisplayName":"أهداف الاجتماع وأهم محاور النقاش ",
                "DisplayNameEn": "Meeting Objectives",
                "type":"multiline",
                maxchar: 5000,
                
                
            },
            {
                "InternalName": "FormalAgenda",
                "DisplayName":"جدول الأعمال الرسمي",
                "DisplayNameEn": "Formal Agenda",
                "type":"multiline",
                maxchar: 5000,
                
                
            },
            {
                "InternalName": "Decisions",
                "DisplayName":"المقررات",
                "DisplayNameEn": "Decisions",
                "type":"multiline" ,
                maxchar: 5000,               
            },
            {
                "InternalName": "Comments",
                "DisplayName":"ملاحظات",
                "DisplayNameEn": "Comments",
                "type":"multiline",
                maxchar: 5000,
                
                
            },
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
            "DisplayNameEn": "Supporting Data",
            "type": "file",
            "withAddBtn":"true"
        }]
    }
];