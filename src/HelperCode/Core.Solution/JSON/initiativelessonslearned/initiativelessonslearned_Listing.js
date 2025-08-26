var Listing_Info = [

    {
        InternalName: 'Name',
        DisplayName: 'الدرس المستفاد',
        DisplayNameEn: 'Name',
        type: 'string',
        inlisting: true,
        infilter: false
      },
      {
        InternalName: 'Category',
        DisplayName: 'التصنيف',
        DisplayNameEn: 'Category',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'scopemanagement',
              value: 'scopemanagement',
            },
            {
              display: 'schedule',
              value: 'schedule',
            },
            {
              display: 'stakeholders',
              value: 'stakeholders',
            },
            {
              display: 'communication',
              value: 'communication',
            },
            {
              display: 'procurementplan',
              value: 'procurementplan',
            },
            {
              display: 'change',
              value: 'change',
            },
          ],
        },
        inlisting: true,
        infilter: true
      },
      {
        InternalName: 'Types',
        DisplayName: 'النوع',
        DisplayNameEn: 'Types',
        type: 'dropdownValues',
        options: {
          choices: [
            {
              display: 'provenstrength',
              value: 'provenstrength',
            },
            {
              display: 'improvementopportunity',
              value: 'improvementopportunity',
            },
          ],
        },
        inlisting: true,
        infilter: true
      },
      {
        InternalName: 'Comments',
        DisplayName: 'ملاحظات',
        DisplayNameEn: 'Comments',
        type: 'multiline',
        inlisting: false,
        infilter: false
      },
     
];