var Information_Form = [{
    label: 'بيانات المعلم',
    labelEn: 'Milestone Data',
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [{
            "InternalName": "Title",
            "DisplayName": "رمز المعلم",
            "DisplayNameEn": "Milstone Code",
            "type": "string"

        },
        {
            "InternalName": "Name",
            "DisplayName": "اسم المعلم",
            "DisplayNameEn": "Milstone Name",
            "type": "string"

        },
        {
            "InternalName": "PlannedDate",
            "DisplayName": "تاريخ الاكتمال المخطط",
            "DisplayNameEn": "Planned Date",
            "type": "datetime"
        },
        {
            "InternalName": "ActualDate",
            "DisplayName": "تاريخ الاكتمال الفعلي",
            "DisplayNameEn": "Actual Date",
            "type": "datetime",
            "max":"today"
        },
        {
            "InternalName": "ShowInProgramReport",
            "DisplayName": "اظهار في التقرير",
            "DisplayNameEn": "Show In Report",
            "type": "radio"

        },
        {
            "InternalName": "Description",
            "DisplayName": "الوصف",
            "DisplayNameEn": "Description",
            "type": "multiline",
            "maxchar": 5000,
        },
        {
            "InternalName": "Status",
            "DisplayName": "الحالة",
            "DisplayNameEn": "Status",
            "type": "dropdownValues",
            options: {
                choices: [
                    { display: 'completed', value: 'completed' },
                    { display: 'late', value: 'late' },
                    { display: 'onschedule', value: 'onschedule' }
                ]
            }
        },
        {
            "InternalName": "Deliverables",
            "DisplayName": "المخرجات",
            "DisplayNameEn": "Deliverables",
            "type": "multiline",
            "maxchar": 5000,
        },
        {
            "InternalName": "RelatedInitiativeMilestone",
            "DisplayName": "معلم المبادرة المرتبط",
            "DisplayNameEn": "Related Initiative Milestone",
            "type": "lookup",
            "source": "InitiativeMilestones",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title"
        },
        {
            "InternalName": "SupportDocumentsDescription",
            "DisplayNameEn": "Support Documents Description",
            "DisplayName": "وصف الوثائق الداعمة",
            "type": "multiline",
            "maxchar": "500",
        }
    ]
}, ];