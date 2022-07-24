var Information_Form = [
    {
        label: 'بيانات محضر الاجتماع',
        labelEn: 'Meeting Data',
        description: "التفاصيل",
        descriptionEn: "Details",
        subFields: [

            {
                "InternalName": "Title",
                "DisplayName": "رمز الاجتماع",
                "DisplayNameEn": "Meeting Code",
                "type": "string"

            },
            // {
            //     "InternalName": "ProjectCode",
            //     "DisplayName": "اسم المشروع",
            //     "DisplayNameEn": "Project Name",
            //     "type": "lookup",
            //     //from other list:
            //     "source": "Projects",
            //     "Dispfieldkey": "Name",
            //     "valfieldkey": "Title"


            // },
            {
                "InternalName": "Subject",
                "DisplayName": "موضوع الاجتماع",
                "DisplayNameEn": "Meeting Subject",
                "type": "string"


            },
            {
                "InternalName": "Date",
                "DisplayName": "تاريخ الاجتماع",
                "DisplayNameEn": "Meeting Date",
                "type": "datewithtime"

            },
            {
                "InternalName": "Location",
                "DisplayName": "مكان الاجتماع",
                "DisplayNameEn": "Meeting Location",
                "type": "string"

            },
            {
                "InternalName": "Attendees",
                "DisplayName": "الحضور",
                "DisplayNameEn": "Attendees",
                "type": "multiline"


            },
            {
                "InternalName": "MeetingObjectives",
                "DisplayName": "أهداف الاجتماع وأهم محاور النقاش ",
                "DisplayNameEn": "Meeting Objectives",
                "type": "multiline"


            },
            {
                "InternalName": "Comments",
                "DisplayName": "ملاحظات",
                "DisplayNameEn": "Comments",
                "type": "multiline"


            },
            {
                "InternalName": "Decisions",
                "DisplayName": "المقررات",
                "DisplayNameEn": "Decisions",
                "type": "multiline"


            },
            {
                "InternalName": "FormalAgenda",
                "DisplayName": "جدول الأعمال الرسمي",
                "DisplayNameEn": "Formal Agenda",
                "type": "multiline"


            },
            {
                "InternalName": "Author",
                "DisplayName": "كاتب المحضر",
                "DisplayNameEn": "Created By",
                "type": "picker"


            },
        ]
    }
];