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
                "validation": "required"
                
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
                "type": "string"
                //  //from other list:
                //  "source": "Regions",
                //  "Dispfieldkey": "Title",   
                //   "valfieldkey": "Title" 
                
            },
            {
                "InternalName": "Attendees",
                "DisplayName":"الحضور",
                "DisplayNameEn": "Attendees",
                "type":"multiline"
                
                
            },
            {
                "InternalName": "MeetingObjectives",
                "DisplayName":"أهداف الاجتماع وأهم محاور النقاش ",
                "DisplayNameEn": "Meeting Objectives",
                "type":"multiline"
                
                
            },
            {
                "InternalName": "Comments",
                "DisplayName":"ملاحظات",
                "DisplayNameEn": "Comments",
                "type":"multiline"
                
                
            },
            {
                "InternalName": "Decisions",
                "DisplayName":"المقررات",
                "DisplayNameEn": "Decisions",
                "type":"multiline"                
            },
            {
                "InternalName": "FormalAgenda",
                "DisplayName":"جدول الأعمال الرسمي",
                "DisplayNameEn": "Formal Agenda",
                "type":"multiline"
                
                
            }
        ]
    }
];