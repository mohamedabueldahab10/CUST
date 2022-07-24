var Information_Form = [{
    label: 'بيانات الفكرة',
    labelEn: 'Idea Data',
    description: "التفاصيل",
    descriptionEn: "Details",
    subFields: [{
            "InternalName": "Title",
            "DisplayName": "الرمز",
            "DisplayNameEn": "Code",
            "type": "string"

        },
        {
            "InternalName": "Name",
            "DisplayName": "اسم الفكرة/الطلب",
            "DisplayNameEn": "Idea Name",
            "type": "string"

        },
        {
            "InternalName": "Portfolio",
            "DisplayName": "المحفظة",
            "DisplayNameEn": "Portfolio",
            "type": "lookup",
            //from other list:
            "source": "Portfolio",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title"

        },
        {
            "InternalName": "Status",
            "DisplayName": "الحالة",
            "DisplayNameEn": "Status",
            "type": "dropdownValues",
            options: {
                choices: [
                    { value: 'notstarted', display: 'notstarted' },
                    { value: 'completed', display: 'completed' },
                    { value: 'inprogress', display: 'inprogress' },
                    { value: 'onhold', display: 'onhold' },
                    { value: 'cancelled', display: 'cancelled' }
                ]
            }
        },
        {
            "InternalName": "ExpectedBudget",
            "DisplayName": "الموازنة المقترحة",
            "DisplayNameEn": "Expected Budget",
            "type": "float"

        },
        {
            "InternalName": "PlannedStartDate",
            "DisplayName": "تاريخ البدء المتوقع",
            "DisplayNameEn": "Planned Start Date",
            "type": "datetime"

        },
        {
            "InternalName": "PlannedFinishDate",
            "DisplayName": "تاريخ الإنتهاء المتوقع",
            "DisplayNameEn": "Planned Finish Date",
            "type": "datetime"

        },
        {
            "InternalName": "Impact",
            "DisplayName": "التاثير",
            "DisplayNameEn": "Impact",
            "type": "multiline"

        },
        {
            "InternalName": "Description",
            "DisplayName": "الوصف",
            "DisplayNameEn": "Description",
            "type": "multiline"

        },
        {
            "InternalName": "ExecutiveSummary",
            "DisplayName": "الملخص التنفيذي",
            "DisplayNameEn": "Executive Summary",
            "type": "multiline"

        },
        {
            "InternalName": "MajorAssumptions",
            "DisplayName": "الفرضيات الرئيسية",
            "DisplayNameEn": "Major Assumptions",
            "type": "multiline"

        },
        {
            "InternalName": "MajorRisks",
            "DisplayName": "المخاطر الرئيسية",
            "DisplayNameEn": "Major Risks",
            "type": "multiline"

        },
        {
            "InternalName": "EstimatedBusinessBenefits",
            "DisplayName": "الفوائد المتوقعة",
            "DisplayNameEn": "Estimated Business Benefits",
            "type": "multiline"

        },
        // {
        //     "InternalName": "EstimatedCosts",
        //     "DisplayName": "التكاليف المتوقعة",
        //     "DisplayNameEn": "Estimated Costs",
        //     "type": "multiline"

        // },
        // {
        //     "InternalName": "FinancialModels",
        //     "DisplayName": "النماذج المالية",
        //     "DisplayNameEn": "Financial Models",
        //     "type": "multiline"

        // },
        {
            "InternalName": "Alignment",
            "DisplayName": "المواءمة",
            "DisplayNameEn": "Alignment",
            "type": "multiline"

        },
        {
            "InternalName": "Urgency",
            "DisplayName": "الأهمية",
            "DisplayNameEn": "Priority",
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