var Listing_Info = [
      
    {
        "InternalName": "Title",
        "DisplayNameEn": "Code",
        "DisplayName": "رمز المؤشر",
        "type": "text",
        inlisting: true,
        infilter: false
    },
    {
        "InternalName": "Name",
        "DisplayNameEn": "Name",
        "DisplayName": "المؤشر ",
        "type": "text",
        inlisting: true,
        infilter: true

    },
    // {
    //     "InternalName": "KPIType",
    //     "DisplayNameEn": "KPI Type",
    //      "DisplayName": "نوع المؤشر",
    //     "type":"text",
    //     inlisting: true,
    //     infilter: true,
    //     needTrans:true,
       
    // } ,
    // {
    //     "InternalName": "Owner",
    //     "DisplayNameEn": "Owner",
    //     "DisplayName": "مالك المؤشر",
    //     "type": "picker",
    //     inlisting: true,
    //     infilter: true

    // } , 
       {
        "InternalName": "Owner",
        "DisplayNameEn": "Owner",
        "DisplayName": "مالك المؤشر",
        "type": "picker",
        inlisting: true,
        infilter: true

    },
    {
        "InternalName": "PerformanceLeader",
        "DisplayNameEn": "Performance Leader",
        "DisplayName": "رائد الأداء",
        "type": "picker",
        inlisting: true,
        infilter: false

    },
   /* {
        "InternalName": "PerformanceLeader2",
        "DisplayNameEn": "Second Performance Leader",
        "DisplayName": "رائد الأداء الثاني",
        "type": "picker",
        inlisting: true,
        infilter: false

    },*/
    // {
    //     "InternalName": "ProgressStatus",
    //     "DisplayName": "حالة الإنجاز",
    //     "DisplayNameEn": "Progress Status",
    //     "type": "text",
    //      inlisting: true,
    //      infilter: true
    //   },
    // {
    //     "InternalName": "RelatedStrategyType",
    //     "DisplayNameEn": "Strategy Type",
    //     "DisplayName": "نوع  الاستراتيجية",
    //     "type":"text",
    //     inlisting: true,
    //     infilter: true,
    //     needTrans:true,
       
    // } ,
      {
        InternalName: 'Classification',
        DisplayNameEn: 'Classification',
        DisplayName: 'تصنيف المؤشر',
        type: 'dropdownValues',
        inlisting: true,
        infilter: true,
        needTrans:true
      },
    {  InternalName: 'NotMeasurableNow',
        DisplayNameEn: 'Measurable Now',
        DisplayName: 'يقاس حاليا',
        type: 'yesnoradio',
         inlisting: true,
        infilter: true,
        needTrans:true
      },
      {  InternalName: 'CompletionStatus',
        DisplayNameEn: 'Completion Status',
        DisplayName: 'مكتمل',
        type: 'yesnoradio',
         inlisting: true,
        infilter: true,
        needTrans:true
      },
    {
        "InternalName": "PeriodType",
        "DisplayName": "تكرار القياس",
        "DisplayNameEn": "Period Type",
        "type": "dropdownValues",
        inlisting: true,
        infilter: true,
        needTrans:true
    },
    {
        "InternalName": "Calculation",
        "DisplayName": "طريقة الاحتساب",
        "DisplayNameEn": "Calculation Method",
        "type": "dropdownValues",
        inlisting: true,
        infilter: true,
        needTrans:true
    },

    /*{
        "InternalName": "Class",
        DisplayName: "الاستراتيجية المرتبطة",
        DisplayNameEn: "Strategy Type",
        type: "dropdownValues",
        inlisting: true,
        infilter: true,
        needTrans:true
    },*/
    {
        "InternalName": "Sector",
        "DisplayName": "القطاع",
        "DisplayNameEn": "Sector",
        "type": "lookup",
        "localStorageVariable":"Dynamo_Internal Entities",
        inlisting: true,
        infilter: true
    },
    {
        "InternalName": "SubSector",
        "DisplayName": "الوكالة",
        "DisplayNameEn": "Department",
        "type": "lookup",
        "localStorageVariable":"Dynamo_Internal Entities",
        inlisting: true,
        infilter: true
    },
    
    // {
    //     "InternalName": "MesurePriority",
    //     "DisplayNameEn": "Mesure Priority",
    //     "DisplayName": "أولوية قياس المؤشر",
    //     "type": "text",
    //     inlisting: true,
    //     infilter: true,
    //     needTrans:true
    // }


];