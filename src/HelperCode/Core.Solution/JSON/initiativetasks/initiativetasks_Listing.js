var Listing_Info = [ {
    "InternalName": "Title",
    "DisplayName":"رمز المهمة",
    "type":"string",
    inlisting: true,
    infilter: true
},
{
  InternalName: 'TaskName',
  DisplayName: 'اسم المهمة',
  DisplayNameEn: 'TaskName',
  type: 'string',
  inlisting: true,
  infilter: false
},
{
  InternalName: 'InitiativeManager',
  DisplayName: 'مدير المبادرة',
  DisplayNameEn: 'InitiativeManager',
  type: 'string',
  inlisting: true,
  infilter: false
},
{
  InternalName: 'InitiativePMRole',
  DisplayName: 'دور مدير المبادرة',
  DisplayNameEn: 'InitiativePMRole',
  type: 'dropdownValues',
  options: {
    choices: [
      {
        display: 'responsible',
        value: 'responsible',
      },
      {
        display: 'accountable',
        value: 'accountable',
      },
      {
        display: 'consulted',
        value: 'consulted',
      },
      {
        display: 'informed',
        value: 'informed',
      },
    ],
  },
  inlisting: true,
  infilter: true
},
{
  InternalName: 'InitiativeOwner',
  DisplayName: 'مالك المبادرة',
  DisplayNameEn: 'InitiativeOwner',
  type: 'string',
  inlisting: true,
  infilter: false
},
{
  InternalName: 'InitiativeOwnerRole',
  DisplayName: 'دور مالك المبادرة',
  DisplayNameEn: 'InitiativeOwnerRole',
  type: 'dropdownValues',
  options: {
    choices: [
      {
        display: 'responsible',
        value: 'responsible',
      },
      {
        display: 'accountable',
        value: 'accountable',
      },
      {
        display: 'consulted',
        value: 'consulted',
      },
      {
        display: 'informed',
        value: 'informed',
      },
    ],
  },
  inlisting: true,
  infilter: true
},
{
  InternalName: 'ObjectiveOwner',
  DisplayName: 'مالك الهدف',
  DisplayNameEn: 'ObjectiveOwner',
  type: 'string',
  inlisting: true,
  infilter: false
},
{
  InternalName: 'ObjectiveOwnerRole',
  DisplayName: 'دور مالك الهدف',
  DisplayNameEn: 'ObjectiveOwnerRole',
  type: 'dropdownValues',
  options: {
    choices: [
      {
        display: 'responsible',
        value: 'responsible',
      },
      {
        display: 'accountable',
        value: 'accountable',
      },
      {
        display: 'consulted',
        value: 'consulted',
      },
      {
        display: 'informed',
        value: 'informed',
      },
    ],
  },
  inlisting: true,
  infilter: true
},
{
  InternalName: 'SectorManager',
  DisplayName: 'مكتب المشاريع القطاعي',
  DisplayNameEn: 'SectorManager',
  type: 'string',
  inlisting: true,
  infilter: false
},
{
  InternalName: 'SectorManagerRole',
  DisplayName: 'دور مكتب المشاريع القطاعي',
  DisplayNameEn: 'SectorManagerRole',
  type: 'dropdownValues',
  options: {
    choices: [
      {
        display: 'responsible',
        value: 'responsible',
      },
      {
        display: 'accountable',
        value: 'accountable',
      },
      {
        display: 'consulted',
        value: 'consulted',
      },
      {
        display: 'informed',
        value: 'informed',
      },
    ],
  },
  inlisting: true,
  infilter: true
},
   
];