var Information_Form = [
  {
    //  label: 'الشراكات الاستراتيجية',
    //  labelEn: 'Strategic Partnerships',
    label: 'البيانات الرئيسية',
    labelEn: 'Principal data',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
      {
        //   InternalName: 'PartnerName',
        InternalName: 'Name',
        DisplayName: 'اسم الشريك',
        DisplayNameEn: 'Partner Name',
        type: 'string',
        maxchar: '255',
        validation: 'required',
        withletters:true,
        Errmsgkey:"withletterpattern",
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255", 
      },
      {
        InternalName: 'Classification',
        DisplayName: 'تصنيف الشريك',
        DisplayNameEn: 'Classification',
        type: 'dropdownValues',
        validation: 'required',
        options: {
          choices: [
            {
              value: 'internal',
              display: 'internal',
            },
            {
              value: 'external',
              display: 'external',
            },
          ],
        },
        toggleValues: [
          { value: 'external', fields: ['Types'] }
        ],
      },
      {
        InternalName: 'Types',
        DisplayName: 'نوع الشريك الخارجي',
        DisplayNameEn: 'Type',
        type: 'dropdownValues',
        validation: 'required',
        ToggleName: 'Types',
        options: {
          choices: [
            {
              value: 'governmentsector',
              display: 'governmentsector',
            },
            {
              value: 'semigovernment',
              display: 'semigovernment',
            },
            {
              value: 'privatesector',
              display: 'privatesector',
            },
            {
              value: 'nonprofitsector',
              display: 'nonprofitsector',
            },
          ],
        },
      },
    ],
  },
  {
    label: 'بيانات الممثل',
    labelEn: 'Representative data',
    description: '',
    descriptionEn: '',
    subFields: [
      {
        //   InternalName: 'PartnerRepresentativeName',
        InternalName: 'RepresentativeName',
        DisplayName: 'اسم ممثل الشريك',
        DisplayNameEn: 'Representative Name',
        type: 'string',
        maxchar: '255',
        validation: 'required',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255", 
      },
      {
        //   InternalName: 'PartnerRepresentativeEmail',
        InternalName: 'RepresentativeEmail',
        DisplayName: 'ايميل الممثل للشريك',
        DisplayNameEn: 'Representative Email',
        type: 'email',
        maxchar: '250',
        validation: 'required',
      },
      {
        //   InternalName: 'PartnerRepresentativePhone',
        InternalName: 'RepresentativePhone',
        DisplayName: 'هاتف ممثل الشريك',
        DisplayNameEn: 'Representative Phone',
        // type: 'string',
        type:'phonenumber',
        Errmsgkey:"phonenumberpattern",
        maxchar: '250',
        validation: 'required',
      },
      {
        InternalName: 'JobTitle',
        DisplayName: 'المسمى الوظيفي',
        DisplayNameEn: 'Job Title',
        type: 'string',
        validation: 'required',
        maxchar: '255',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 255 حرف",
        descPhraseEn: "max length of letters equal 255", 
      },
    ],
  },
  {
    label: 'التفاصيل',
    labelEn: 'Details',
    description: '',
    descriptionEn: '',
    subFields: [
      {
        InternalName: 'Comments',
        DisplayName: 'ملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        maxchar: '5000',
        descPhraseAr: "الحد الاقصى لعدد الحروف هو 5000 حرف",
        descPhraseEn: "max length of letters equal 5000", 
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
]
