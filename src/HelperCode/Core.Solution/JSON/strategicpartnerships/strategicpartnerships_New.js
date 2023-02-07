var Information_Form = [
  {
    label: 'البيانات الرئيسية',
    labelEn: 'Principal data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Name',
        DisplayName: 'اسم الشراكة',
        DisplayNameEn: 'Partnership Name',
        type: 'string',
        validation: 'required',
      },
      {
        InternalName: 'Sector',
        DisplayName: 'القطاع',
        DisplayNameEn: 'Sector',
        type: 'lookup',
        validation: 'required',
        source: 'Internal Entities',
        isSector: 'True',
        EntityType: 'Sector',
        // "source":"SOs",
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'SubSector',
        DisplayName: 'الوكالة',
        DisplayNameEn: 'Deputyship',
        type: 'lookup',
        source: 'Internal Entities',
        isSector: 'True',
        EntityType: 'Department',
        Dispfieldkey: 'Name',
        DispfieldkeyEn: 'NameEn',
        // "source":"SOs",
        valfieldkey: 'Title',
        validation: 'required',
      },
      {
        InternalName: 'PartnershipType',
        DisplayName: 'نوع الشراكة',
        DisplayNameEn: 'Partnership Type',
        type: 'dropdownValues',
        validation: 'required',
        options: {
          choices: [
            {
              value: 'integrativepartnership',
              display: 'integrativepartnership',
            },
            {
              value: 'agencylevelpartnership',
              display: 'agencylevelpartnership',
            },
          ],
        },
      },
      {
        InternalName: 'PartnershipClassification',
        DisplayName: 'تصنيف الشراكة',
        DisplayNameEn: 'Partnership Classification',
        type: 'dropdownValues',
        validation: 'required',
        options: {
          choices: [
            {
              value: 'memorandumofunderstanding',
              display: 'memorandumofunderstanding',
            },
            {
              value: 'memorandumofcooperation',
              display: 'memorandumofcooperation',
            },
            {
              value: 'acooperationagreement',
              display: 'acooperationagreement',
            },
          ],
        },
      },
      {
        InternalName: 'PartnerName',
        DisplayName: 'اسم الشريك',
        DisplayNameEn: 'Partner Name',
        type: 'lookup',
        validation: 'required',
        source: 'SP Vendors',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
    ],
  },
  {
    label: 'التفاصيل',
    labelEn: 'Details',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        InternalName: 'Description',
        DisplayNameEn: 'Description',
        DisplayName: 'وصف الشراكة',
        type: 'multiline',
        maxchar: '500',
        validation: 'required',
      },
      {
        InternalName: 'PartnershipManager',
        DisplayName: 'مدير العلاقة',
        DisplayNameEn: 'Partnership Manager',
        type: 'multipicker',
        // "validation":"required"
      },
      {
        InternalName: 'RelatedStrategyObjective',
        DisplayNameEn: 'Related Strategy Objective',
        ToggleName: 'RelatedStrategyObjective',
        DisplayName: 'الهدف الاستراتيجي المرتبط',
        type: 'lookup',
        source: 'SOs',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
        validation: 'required',
      },
      {
        InternalName: 'RelatedKPI',
        DisplayNameEn: 'Related KPI',
        DisplayName: 'المؤشر الاستراتيجي المرتبط',
        type: 'lookup',
        source: 'MainKPI',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'RelatedInitiative',
        DisplayNameEn: 'Related Initiative',
        DisplayName: 'المبادرة المرتبطة',
        type: 'lookup',
        source: 'Initiatives',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'RelatedProject',
        DisplayNameEn: 'Related Project',
        DisplayName: 'المشروع المرتبط',
        type: 'lookup',
        source: 'Initiatives',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'StartDate',
        DisplayName: 'تاريخ بداية الشراكة',
        DisplayNameEn: 'Start Date',
        type: 'datetime',
        validation: 'required',
        // type: 'datetimetoparent',
        // listname: 'Projects',
        // startinternalname: 'BaselineStartDate',
        // endinternalname: 'BaselineFinishDate',
        max: 'FinishDate',
      },
      {
        InternalName: 'Duration',
        DisplayName: 'مدة الشراكة (شهر)',
        DisplayNameEn: 'Duration (Month)',
        type: 'float',
        validation: 'required',
      },
      {
        InternalName: 'NoticePeriod',
        DisplayName: 'مهلة الإخطار بعدم الرغبة بتجديد الشراكة',
        DisplayNameEn: 'Notice Period',
        type: 'float',
      },
      {
        InternalName: 'LastNotice',
        DisplayName: 'آخر تاريخ للإخطار بعدم الرغبة بتجديد الشراكة',
        DisplayNameEn: 'Last Notice Date (Close)',
        type: 'datetime',
      },
      {
        InternalName: 'LastNoticeEmail',
        DisplayName: 'تاريخ إرسال ايميل الإخطار ونموذج التجديد',
        DisplayNameEn: 'Last Notice Date (Email)',
        type: 'datetime',
      },
      {
        InternalName: 'CancelationDate',
        DisplayName: 'تاريخ الإلغاء في حال الغيت الشراكة',
        DisplayNameEn: 'Cancelation Date',
        type: 'datetime',
      },
      {
        InternalName: 'Status',
        DisplayName: 'حالة الشراكة',
        DisplayNameEn: 'Status',
        // "type":"string"
        type: 'dropdownValues',
        validation: 'required',
        options: {
          choices: [
            {
              value: 'standard',
              display: 'standard',
            },
            {
              value: 'repeatedstandard',
              display: 'repeatedstandard',
            },
            {
              value: 'notstandard',
              display: 'notstandard',
            },
          ],
        },
      },
      {
        InternalName: 'EscalationNeeded',
        DisplayName: 'بحاجة للتصعيد ؟',
        DisplayNameEn: 'Escalation Needed ?',
        //   type: 'string',
        type: 'yesnoradio',
        options: {
          choices: [
            {
              display: 'yes',
              value: 'yes',
            },

            {
              display: 'no',
              value: 'no',
            },
          ],
        },
      },
      {
        InternalName: 'Comments',
        DisplayNameEn: 'Comments',
        DisplayName: 'ملاحظات',
        type: 'multiline',
        maxchar: '500',
      },
      {
        InternalName: 'getfile',
        DisplayName: 'مرفقات',
        DisplayNameEn: 'Attachments',
        type: 'file',
        withAddBtn: 'true',
      },
    ],
  },
  // ,{
  //    label: 'الوثائق الداعمة',
  //    labelEn: 'Supporting Documents',
  //    description: "",
  //    descriptionEn: "",
  //    subFields: [{
  //       "InternalName": "getfile",
  //       "DisplayName": "المرفقات",
  //       "DisplayNameEn": "Attachments",
  //       "type": "file",
  //       "withAddBtn":"true"
  //    }]
  // }

  // OLD
  // {
  //    "label":"الشراكات الاستراتيجية",
  //    "labelEn":"Strategic Partnerships",
  //    "description":"التفاصيل",
  //    "descriptionEn":"Details",
  //    "subFields":[
  //       // {
  //       //    "InternalName":"PartnerType",
  //       //    "DisplayName":"نوع الشريك",
  //       //    "DisplayNameEn":"Partner Type",
  //       //    "type":"dropdownValues",
  //       //    "validation":"required",
  //       //    "options":{
  //       //       "choices":[
  //       //          {
  //       //             "value":"GovernmentSector",
  //       //             "display":"قطاع حكومي"
  //       //          },
  //       //          {
  //       //             "value":"PrivateSector",
  //       //             "display":"قطاع خاص"
  //       //          },
  //       //          {
  //       //             "value":"NonprofitSector",
  //       //             "display":"قطاع غير ربحي"
  //       //          }
  //       //       ]
  //       //    }
  //       // },
  //       {
  //          "InternalName":"PartnerRepresentativeName",
  //          "DisplayName":"اسم ممثل الشريك",
  //          "DisplayNameEn":"Partner Representative Name",
  //          "type":"string",
  //          "maxchar":"250",
  //          "validation":"required"
  //       },
  //       {
  //          "InternalName":"PartnerRepresentativeEmail",
  //          "DisplayName":"ايميل ممثل الشريك",
  //          "DisplayNameEn":"Partner Representative Email",
  //          "type":"string",
  //          "maxchar":"250",
  //          "validation":"required"
  //       },
  //       {
  //          "InternalName":"PartnerRepresentativePhone",
  //          "DisplayName":"هاتف ممثل الشريك",
  //          "DisplayNameEn":"Partner Representative Phone",
  //          "type":"string",
  //          "maxchar":"250",
  //          "validation":"required"
  //       },
  //       {
  //          "InternalName":"Description",
  //          "DisplayNameEn":"Description",
  //          "DisplayName":"وصف الشراكة",
  //          "type":"multiline",
  //          "maxchar":"500",
  //          "validation":"required"
  //       },
  //       {
  //          "InternalName":"PartnershipCommitments",
  //          "DisplayNameEn":"Partnership Commitments",
  //          "DisplayName":"التزامات الشراكة",
  //          "type":"multiline",
  //          "maxchar":"500",
  //          "validation":"required"
  //       },
  //       {
  //          "InternalName":"PartnershipEndDate",
  //          "DisplayName":"تاريخ نهاية الشراكة",
  //          "DisplayNameEn":"Partnership End Date",
  //          "type":"datetime",
  //          "min":"PartnershipStartDate",
  //          "validation":"required"
  //       },
  //       {
  //          "InternalName":"PartnershipStatus",
  //          "DisplayName":"حالة الشراكة",
  //          "DisplayNameEn":"Partnership Status",
  //          "type":"dropdownValues",
  //          "validation":"required",
  //          "options":{
  //             "choices":[
  //                {
  //                   "value":"notstarted",
  //                   "display":"notstarted"
  //                },
  //                {
  //                   "value":"inprogress",
  //                   "display":"inprogress"
  //                },
  //                {
  //                   "value":"completed",
  //                   "display":"completed"
  //                },
  //                {
  //                   "value":"cancelled",
  //                   "display":"cancelled"
  //                }
  //             ]
  //          }
  //       },
  //       {
  //          "InternalName":"NeedEscalation",
  //          "DisplayName":"بحاجة للتصعيد؟",
  //          "DisplayNameEn":"Need Escalation?",
  //          "validation":"required",
  //          "type":"dropdownValues",
  //          "options":{
  //             "choices":[
  //                {
  //                   "display":"yes",
  //                   "value":"yes"
  //                },
  //                {
  //                   "display":"no",
  //                   "value":"no"
  //                }
  //             ]
  //          }
  //       },
  //       {
  //          "InternalName":"Notes",
  //          "DisplayNameEn":"Notes",
  //          "DisplayName":"ملاحظات",
  //          "type":"multiline",
  //          "maxchar":"500",
  //          "validation":"required"
  //       }
  //    ]
  // },
]
