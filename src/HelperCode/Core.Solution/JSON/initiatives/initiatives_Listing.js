var Listing_Info = [
  {
    InternalName: 'Title',
    DisplayNameEn: 'Title Code',
    DisplayName: 'رمز المبادرة',
    type: 'text',
    inlisting: true,
    infilter: false,
  },
  {
    InternalName: 'Name',
    DisplayNameEn: 'Name',
    DisplayName: 'اسم المبادرة',
    type: 'text',
    inlisting: true,
    infilter: false,
  },
  // {
  // 	"InternalName": "InitiativePM",
  // 	"DisplayName": "مدير المبادرة",
  // 	"DisplayNameEn": "Initiative Manager",
  // 	"type": "picker",
  // 	inlisting: false,
  // 	infilter: true
  // },
  // {
  // 	"InternalName": "InitiativeOwner",
  // 	"DisplayName": "مالك المبادرة",
  // 	"DisplayNameEn": "Initiative Owner",
  // 	"type": "picker",
  // 	inlisting: false,
  // 	infilter: true
  // },
  // 	"InternalName": "Portfolio",
  //         "DisplayName": "المحفظة",
  //         "DisplayNameEn": "Portfolio",
  // 	"type":"text",
  // 	inlisting: true,
  // 	infilter: true

  // },
  // {
  {
    InternalName: 'Types',
    DisplayNameEn: 'Types',
    DisplayName: 'النوع',
    type: 'text',
    inlisting: true,
    needTrans: true,
    infilter: true,
  },
  {
    InternalName: 'Sector',
    DisplayName: 'القطاع',
    DisplayNameEn: 'Sector',
    type: 'lookup',
    localStorageVariable: 'Dynamo_Internal Entities',
    inlisting: true,
    infilter: true,
  },
  {
    InternalName: 'SubSector',
    DisplayName: 'الوكالة',
    DisplayNameEn: 'Departments',
    type: 'lookup',
    localStorageVariable: 'Dynamo_Internal Entities',
    inlisting: true,
    infilter: true,
  },
  {
    InternalName: 'InitiativeProgressStatus',
    DisplayName: 'حالة الإنجاز',
    DisplayNameEn: 'Initiative Progress Status',
    type: 'text', //formula
    needTrans: true,
    inlisting: true,
    infilter: true,
  },
]
