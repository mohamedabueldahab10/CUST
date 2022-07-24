var Listing_Info = [
      
        // {
        //     "InternalName": "Title",
        //     "DisplayNameEn": "KPI Code",
        //     "DisplayName": "رمز المؤشر",
        //     "type": "text",
        //     inlisting: true,
        //     infilter: true
        // },
        {
            "InternalName": "Name",
            "DisplayNameEn": "Name",
            "DisplayName": "المؤشر ",
            "type": "text",
            inlisting: true,
            infilter: true

        },
        // {
        //     "InternalName": "Owner",
        //     "DisplayNameEn": "Owner",
        //     "DisplayName": "مالك المؤشر",
        //     "type": "picker",
        //     inlisting: true,
        //     infilter: true

        // } , 
           {
            "InternalName": "PerformanceLeader",
            "DisplayNameEn": "Performance Leader",
            "DisplayName": "رائد الأداء",
            "type": "picker",
            inlisting: true,
            infilter: true

        },
        {
            "InternalName": "Types",
            "DisplayNameEn": "Types",
             "DisplayName": "نوع المؤشر",
            "type":"text",
            inlisting: true,
            infilter: true,
            needTrans:true,
           
        } ,
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
            "DisplayName": "الوكالات",
            "DisplayNameEn": "Departments",
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