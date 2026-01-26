var Listing_Info = [
        {
          InternalName: 'RelatedChangeItemCode',
          DisplayNameEn: 'Related Change Item',
          DisplayName: 'اسم البند',
          type: 'text',
          inlisting: true,
          infilter: false
        },
			
				 {
    InternalName: 'ApprovalLevel',
    DisplayNameEn: 'Approval Level',
    DisplayName: ' المستوى الاستراتيجي',
    type: 'dropdownValues',
    options: {
                    choices: [
                        { display: 'crlevel1', value: 'level1' },
                        { display: 'crlevel2', value: 'level2' },
                    
                    ]
                },
    inlisting: true,
    needTrans: true,
    infilter: true,
  },
  				 {
    InternalName: 'ApprovalPath',
    DisplayNameEn: 'Approval Path',
    DisplayName: 'مسار سير الموافقات',
    type: 'dropdownValues',
      options: {
                    choices: [
                        { display: 'crstrategic', value: 'strategic' },
                        { display: 'crexecution', value: 'execution' },
                        { display: 'croperationally', value: 'operationally' },
                      
                    ]
                },
    inlisting: true,
    needTrans: true,
    infilter: true,
  },

]