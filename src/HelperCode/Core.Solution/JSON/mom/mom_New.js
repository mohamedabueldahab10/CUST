var Information_Form = [{
    label: 'بيانات محضر الاجتماع',
    labelEn: 'Meeting Data',
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [

        // {
        //     "InternalName": "Title",
        //     "DisplayName":"رمز الاجتماع",
        // "DisplayNameEn": "Meeting Title",
        //     "type":"string",
        //     "state":"disabled"

        // },
        // {
        //     "InternalName": "ProjectCode",
        //     "DisplayName": "اسم المشروع",
        //     "DisplayNameEn": "Project Name",
        //     "type":   "lookup",
        //       //from other list:
        //      "source":   "Projects",
        //      "Dispfieldkey":   "Name",
        //       "valfieldkey":   "Title",
        //     "validation": "required"
        // },
        {
            "InternalName": "Subject",
            "DisplayName": "الموضوع",
            "DisplayNameEn": "Subject",
            "type": "string",
            "validation": "required"
        },
        {
            "InternalName": "Date",
            "DisplayName": "تاريخ الاجتماع",
            "DisplayNameEn": "Meeting Date",
            "type": "datewithtime",
            "validation": "required"
        },
        {
            "InternalName": "Location",
            "DisplayName": "مكان الاجتماع",
            "DisplayNameEn": "Meeting Location",
            "type":   "string",
              //from other list:
            // "source": "Regions",
              //"Dispfieldkey": "Title",   
               //"valfieldkey": "Title" 

        },
        {
            "InternalName": "Attendees",
            "DisplayName": "الحضور",
            "DisplayNameEn": "Attendees",
            "type": "multiline",
            "maxchar": 5000,


        },
        {
            "InternalName": "MeetingObjectives",
            "DisplayName": "أهداف الاجتماع وأهم محاور النقاش ",
            "DisplayNameEn": "Meeting Objectives",
            "type": "multiline",
            "maxchar": 5000,


        },
        {
            "InternalName": "FormalAgenda",
            "DisplayName": "جدول الأعمال الرسمي",
            "DisplayNameEn": "Formal Agenda",
            "type": "multiline",
            "maxchar": 5000,


        },
        {
            "InternalName": "Decisions",
            "DisplayName": "المقررات",
            "DisplayNameEn": "Decisions",
            "type": "multiline",
            "maxchar": 5000,


        },
        {
            "InternalName": "Comments",
            "DisplayName": "ملاحظات",
            "DisplayNameEn": "Comments",
            "type": "multiline",
            "maxchar": 5000,


        },
        {
            "InternalName": "Attachments",
            "DisplayName":"المرفقات",                
            "DisplayNameEn": "Attachments",
            "type":"file",
            "withAddBtn":"true"
        }
    ]
}];