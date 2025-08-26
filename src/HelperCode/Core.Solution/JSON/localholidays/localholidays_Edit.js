var Information_Form = [
  {
      label: "بيانات الإجازات",
      labelEn: "Holiday Data",
      description: "",
      descriptionEn: "",
      subFields: [
          {
              InternalName: "HolidayName",
              DisplayName: "مسمي الاجازة",
              DisplayNameEn: "Holiday Name",
              type: "string",
              validation: "required",
          },
          
          {
            InternalName: "HolidayDate",
            DisplayName: "تاريخ بداية الإجازة",
            DisplayNameEn: "Holiday Start Date",
            type: "datetime",
            validation: "required",
            max: "HolidayEndDate",
            startdateelement: "HolidayDate",
            enddateelement: "HolidayEndDate",
            durationelement: "HolidayDuration",
            autoSetDate: true
        },
        {
          InternalName: "HolidayEndDate",
          DisplayName: "تاريخ نهاية الإجازة",
          DisplayNameEn: "Holiday End Date",
          type: "datetime",
            startdateelement: "HolidayDate",
            enddateelement: "HolidayEndDate",
            durationelement: "HolidayDuration",
            autoSetDate: true
        },
        {
            InternalName: "HolidayDuration",
            DisplayName: "مدة الإجازة",
            DisplayNameEn: "Holiday Duration",
            type: "float",
            validation: "required",
            state: 'disabled'
          },
          
      ]
  }
  
]