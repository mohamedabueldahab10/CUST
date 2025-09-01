var Listing_Info = [ {
    "InternalName": "Title",
    "DisplayName":"رمز أصحاب المصلحه",
    "type":"string",
    inlisting: true,
    infilter: true
},
{
  InternalName: 'StakeholderName',
  DisplayName: 'الأسم',
  DisplayNameEn: 'StakeholderName',
  type: 'string',
  inlisting: true,
  infilter: true
},
{
  InternalName: 'StakeholderRole',
  DisplayName: 'دوره في المبادرة',
  DisplayNameEn: 'StakeholderRole',
  type: 'string',
  inlisting: true,
  infilter: true
},
{
  InternalName: 'AffectLevel',
  DisplayName: 'مستوى التأثير',
  DisplayNameEn: 'AffectLevel',
  type: 'dropdownValues',
  options: {
    choices: [
      {
        display: 'high',
        value: 'high',
      },
      {
        display: 'medium',
        value: 'medium',
      },
      {
        display: 'low',
        value: 'low',
      },
    ],
  },
  inlisting: true,
  infilter: true
},
{
  InternalName: 'AffectLevelDescription',
  DisplayName: 'وصف طبيعة التأثير',
  DisplayNameEn: 'AffectLevelDescription',
  type: 'multiline',
  inlisting: false,
  infilter: false
},

];