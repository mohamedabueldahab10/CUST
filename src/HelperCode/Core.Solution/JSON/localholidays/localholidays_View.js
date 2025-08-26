var Information_Form = [
  {
      label: "بيانات الإجازات",
      labelEn: "Holiday Data",
      description: "",
      descriptionEn: "",
      subFields: [
          {
              InternalName: "Title",
              DisplayName: "رمز الاجازة",
              DisplayNameEn: "Holiday Code",
              type: "string"
          },
          {
              InternalName: "HolidayName",
              DisplayName: "مسمي الاجازة",
              DisplayNameEn: "Holiday Name",
              type: "string",
          },
          {
            InternalName: "HolidayDate",
            DisplayName: "تاريخ بداية الإجازة",
            DisplayNameEn: "Holiday Start Date",
            type: "datetime",
        },
        {
          InternalName: "HolidayEndDate",
          DisplayName: "تاريخ نهاية الإجازة",
          DisplayNameEn: "Holiday End Date",
          type: "datetime",
        },
        {
          InternalName: "HolidayDuration",
          DisplayName: "مدة الإجازة",
          DisplayNameEn: "Holiday Duration",
          type: "float",
        },
          
      ]
  }
]