var Information_Form  = [
    {
        label: 'بيانات صاحب المصلحة',
        labelEn:'Stakeholder Data',
        description: "التفاصيل",
        descriptionEn:"Details",
        subFields: [
            {
                "InternalName": "Name",
                "DisplayName":"اسم صاحب المصلحة",
                "DisplayNameEn":"StakeHolder Name",
                "type":"string",
                "validation": "required"
            },
              {
                "InternalName": "JobTitle",
                "DisplayName":"المسمى الوظيفي",
                "DisplayNameEn":"Job Title",
                "type":"string",
                "validation": "required"
            },
            {
                "InternalName": "Email",
                "DisplayName":"البريد الالكتروني",
                "DisplayNameEn":"Email",
                "type":"string",
                "validation": "required"
            },
            {
                "InternalName": "PhoneNumber",
                "DisplayName":"رقم الهاتف",
                "DisplayNameEn":"Phone Number",
                "type":"floatwithoutformatting",
                "validation": "required"
            },
            {
                "InternalName": "Role",
                "DisplayName":"الدور في المشروع",
                "DisplayNameEn":"Role In Project",
                "type":"string"
            },
            {
                 "InternalName": "StakeholderType",
                "DisplayName": "النوع",
                "DisplayNameEn": "Stakeholder Type",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'stackholderinternal', value: 'stackholderinternal' },
                        { display: 'stackholderexternal', value: 'stackholderexternal' }
                    ]
                }
            },
            {
                "InternalName": "Department",
                "DisplayName":"الإدارة",
                "DisplayNameEn": "Department",
                "DisplayNameEn": "Department",
                "type":"string"
            },
            {
                "InternalName": "Interest",
                "DisplayName":"الاهتمامات",
                "DisplayNameEn": "Interest",
                "type": "dropdownValues",
                options: {
                    choices: [
                        { display: 'high', value: 'high' },
                        { display: 'medium', value: 'medium' },
                        { display: 'low', value: 'low' }
                    ]
                }
            },
            {
                "InternalName": "Description",
                "DisplayName":"الوصف",
                "DisplayNameEn": "Description",
                "type":"multiline"
            },
            {
                "InternalName": "Requirements",
                "DisplayName":"المتطلبات",
                "DisplayNameEn": "Requirements",
                "type":"multiline"
            },
            {
                "InternalName": "Expectations",
                "DisplayName":"التوقعات",
                "DisplayNameEn": "Expectations",
                "type":"multiline"
            },
            {
                "InternalName": "InfluenceLevel",
                "DisplayName":"مستوى التأثير",
                "DisplayNameEn":"Influence Level",
                "type":"dropdownValues",
                options:{
                    choices:[
                        {display:'pr02important', value:'pr02important'},
                        {display:'pr03medium', value:'pr03medium'},
                        {display:'pr04low', value:'pr04low'}
           
                    ]
                }
            },
            // {
            //     "InternalName": "PowerLevel",
            //     "DisplayName":"مستوى الطاقة",
            //     "DisplayNameEn":"Power Level",
            //     "type":"string"
            // },
            {
                "InternalName": "TypeOfEngagement",
                "DisplayName":"نوع المشاركة",
                "DisplayNameEn":"Type Of Engagement",
                "type":"multiline"
            }
        ]
    },
    {
        label: 'المرفقات',
        labelEn:'Attachments',
        description: "",
        descriptionEn:"",
        subFields:[
            {
                "InternalName": "getfile",
                "DisplayName":"المرفقات",
                "DisplayNameEn":"Attachments",
                "type":"file",
                "withAddBtn":"true"
            }
        ]
    }
];
