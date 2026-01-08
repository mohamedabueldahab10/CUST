var Information_Form = [
  {
    label: 'المعلومات الأساسية ',
    labelEn: 'Basic Info',
    description: 'التفاصيل',
    descriptionEn: 'Details',
    subFields: [
    {
        InternalName: 'DelegateFrom',
        DisplayNameEn: 'Delegate From',
        DisplayName: ' المفوض من',
        type: 'picker',
  
      },
       {
        InternalName: 'GroupName',
        DisplayNameEn: 'Group Name',
        DisplayName: 'الصلاحية للمفوض منه',
        type: 'string',
        parent:'DelegateFrom',
   
      },

       {
        InternalName: 'DelegateTo',
        DisplayNameEn: 'Delegate To',
        DisplayName: ' المفوض اليه',
        type: 'picker',
       
      },
      {
        InternalName: 'Notes',
        DisplayNameEn: 'Notes',
        DisplayName: 'الملاحظات',
        type: 'multiline'
      },
      {
        InternalName: "Status",
        DisplayNameEn: "Status",
        DisplayName: "الحالة",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "active", value: "active" },
            { display: "pending", value: "pending" },
            { display: "cancelled", value: "cancelled" },
            { display: "finished", value: "finished" },
          ],
        },
      },
     {
  InternalName: 'FromDate',
  DisplayName: 'تاريخ بداية التفويض',
  DisplayNameEn: 'From Date',
  type: 'datetime',
  max: 'ToDate',

},
{
  InternalName: 'ToDate',
  DisplayName: 'تاريخ نهاية التفويض',
  DisplayNameEn: 'To Date',
  type: 'datetime',
  min: 'FromDate',
  
},
     
    ]
  },
]
