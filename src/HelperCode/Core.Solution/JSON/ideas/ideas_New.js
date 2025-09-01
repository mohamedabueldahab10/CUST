var Information_Form = [{
    label: 'بيانات الفكرة',
    labelEn: 'Idea Data',
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [

        {
            "InternalName": "Name",
            "DisplayName": "اسم الفكرة/الطلب",
            "DisplayNameEn": "Idea Name",
            "type": "string",
            "validation": "required",
            "maxchar": 250

        },
        {
            "InternalName": "Portfolio",
            "DisplayName": "المحفظة",
            "DisplayNameEn": "Portfolio",
            "type": "lookup",
            //from other list:
            "source": "Portfolio",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",
            "validation": "required"

        },
        // {
        //     "InternalName": "Status",
        //     "DisplayName": "الحالة",
        //     "DisplayNameEn": "Status",
        //     "type": "dropdownValues",
        //     options: {
        //         choices: [
        //             { value: 'notstarted', display: 'notstarted' },
        //             { value: 'completed', display: 'completed' },
        //             { value: 'inprogress', display: 'inprogress' },
        //             { value: 'onhold', display: 'onhold' },
        //             { value: 'cancelled', display: 'cancelled' }
        //         ]
        //     }
        // },
        {
            "InternalName": "ExpectedBudget",
            "DisplayName": "الموازنة المقترحة",
            "DisplayNameEn": "Expected Budget",
            "type": "float",
            "validation": "required"

        },
        {
            "InternalName": "PlannedStartDate",
            "DisplayName": "تاريخ البدء المتوقع",
            "DisplayNameEn": "Planned Start Date",
            "type": "datetime",
            "max": "PlannedFinishDate",
            "validation": "required",
            "Errmsgkey":"fromdatepattern"
        },
        {
            "InternalName": "PlannedFinishDate",
            "DisplayName": "تاريخ الإنتهاء المتوقع",
            "DisplayNameEn": "Planned Finish Date",
            "type": "datetime",
            "min": "PlannedStartDate",
            "validation": "required",
            "Errmsgkey":"todatepattern"
        },
        {
            "InternalName": "Impact",
            "DisplayName": "التاثير",
            "DisplayNameEn": "Impact",
            "type": "multiline",
            "maxchar": 5000,
            "validation": "required"
        },
        {
            "InternalName": "Description",
            "DisplayName": "الوصف",
            "DisplayNameEn": "Description",
            "type": "multiline",
            "maxchar": 5000,
            "validation": "required"
        },
        {
            "InternalName": "ExecutiveSummary",
            "DisplayName": "الملخص التنفيذي",
            "DisplayNameEn": "Executive Summary",
            "type": "multiline",
            "maxchar": 5000,
            "validation": "required"

        },
        {
            "InternalName": "MajorAssumptions",
            "DisplayName": "الفرضيات الرئيسية",
            "DisplayNameEn": "Major Assumptions",
            "type": "multiline",
            "maxchar": 5000

        },
        {
            "InternalName": "MajorRisks",
            "DisplayName": "المخاطر الرئيسية",
            "DisplayNameEn": "Major Risks",
            "type": "multiline",
            "maxchar": 5000,
            "validation": "required"
        },
        {
            "InternalName": "EstimatedBusinessBenefits",
            "DisplayName": "المنافع التجارية المقدرة",
            "DisplayNameEn": "Estimated Business Benefits",
            "type": "multiline",
            "maxchar": 5000
        },
        {
            "InternalName": "Alignment",
            "DisplayName": "المواءمة",
            "DisplayNameEn": "Alignment",
            "type": "multiline",
            "maxchar": 5000
        },
        {
            "InternalName": "Urgency",
            "DisplayName": "الأهمية",
            "DisplayNameEn": "Priority",
            "validation": "required",
            "type": "dropdownValues",
            options: {
                choices: [
                    { display: 'pr04low', value: 'pr04low' },
                    { display: 'pr03medium', value: 'pr03medium' },
                    { display: 'pr02important', value: 'pr02important' },
                    { display: 'pr01veryimportant', value: 'pr01veryimportant' }
                    //'مهم','مهم جدا','متوسط','منخفض'
                ]
            },
        }

    ]
}, ];