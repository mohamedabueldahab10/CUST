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
        validation: 'required',
        descPhraseAr: "يجب ان يكون المستخدم لديه الصلاحية المناسبة",
        descPhraseEn: " User Should have right access", 
      },
       {
        InternalName: 'GroupName',
        DisplayNameEn: 'Group Name',
        DisplayName: 'الصلاحية للمفوض منه',
        type: 'groupsOfPicker',
        parent:'DelegateFrom',
        validation: 'required',
      },

       {
        InternalName: 'DelegateTo',
        DisplayNameEn: 'Delegate To',
        DisplayName: ' المفوض اليه',
        type: 'picker',
        validation: 'required',
      },
      {
        InternalName: 'Notes',
        DisplayNameEn: 'Notes',
        DisplayName: 'الملاحظات',
        type: 'multiline'
      },
      {
        InternalName: "Status",
        DisplayNameEn: "Delegation Status",
        DisplayName: "حالة التفويض",
        validation: "required",
        type: "dropdownValues",
        options: {
          choices: [
            { display: "delactive", value: "delactive" },
            { display: "delpending", value: "delpending" },
            { display: "delcancelled", value: "delcancelled" },
            { display: "delfinished", value: "delfinished" },
          ],
        },
      },
     {
  InternalName: 'FromDate',
  DisplayName: 'تاريخ بداية التفويض',
  DisplayNameEn: 'From Date',
  type: 'datetime',
  max: 'ToDate',
  Errmsgkey: 'fromdatepattern',
  validation: 'required'
},
{
  InternalName: 'ToDate',
  DisplayName: 'تاريخ نهاية التفويض',
  DisplayNameEn: 'To Date',
  type: 'datetime',
  min: 'FromDate',
  Errmsgkey: 'todatepattern',
  validation: 'required'
},
    ],
  },
]
