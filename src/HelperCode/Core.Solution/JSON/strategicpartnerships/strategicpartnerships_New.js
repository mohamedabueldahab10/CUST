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
                "InternalName": "Sector",
                "DisplayName": "القطاع",
                "DisplayNameEn": "Sector",
                "type": "lookupWithQuery",
                "queryField": "EntityType",
                "queryFieldType": "dropdownValues", //ex: "Choice"
                // dontSubmit: true,
                "queryFieldValue": "Sector",
                dynamic: "parent",
                "source": "Internal Entities",
                // "state": "disabled",
                "Dispfieldkey": "Name",
                "DispfieldkeyEn": "NameEn",
                "valfieldkey": "Title",
                "validation": "required"
            },
            {
                "InternalName": "SubSector",
                "DisplayName": "الوكالات",
                "DisplayNameEn": "Departments",
                "type": "lookup",
                //from other list:
                "source": "Internal Entities",
                // "isSector": "True",
                // "EntityType": "Department",
                "Dispfieldkey": "Name",
                "DispfieldkeyEn": "NameEn",
                "valfieldkey": "Title",
                "validation": "required",
                "isRelatedToParent":true, // to show parent value depends on child like sector and subsector
                dynamic: "Sector", //InternalName Of Parent field
                filterField: "ParentEntity",//InternalName Of Parent field
                filterFieldType: "Text",//Type In Sharepoint List for Parent field

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
        source: 'SPVendors',
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
        type: 'picker',
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
        source: 'Projects',
        Dispfieldkey: 'Name',
        valfieldkey: 'Title',
      },
      {
        InternalName: 'StartDate',
        DisplayName: 'تاريخ بداية الشراكة',
        DisplayNameEn: 'Start Date',
        type: 'datetime',
        validation: 'required',
      },
      {
        InternalName: 'Duration',
        DisplayName: 'مدة الشراكة (شهر)',
        DisplayNameEn: 'Duration (Month)',
        type: 'floatDuration',
        sourceelementdate:"StartDate",
        targetelementdate:"FinishDate",
        validation: 'required',
      },
      {
        InternalName: 'FinishDate',
        DisplayName: 'تاريخ نهاية الشراكة', 
        DisplayNameEn: 'Finish Date',
        type: 'datetime',
        state: 'disabled',
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
    ],
  },
      {
        label: 'الوثائق الداعمة',
        labelEn: 'Supporting Documents',
        description: 'التفاصيل',
        descriptionEn: 'Details',
        subFields: [
          {
            InternalName: 'getfile',
            DisplayName: 'المرفقات',
            DisplayNameEn: 'Attachments',
            type: 'file',
            // withAddBtn: 'true',
          },
        ],
      },
    ]
    