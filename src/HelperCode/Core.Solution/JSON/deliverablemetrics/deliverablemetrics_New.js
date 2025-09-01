var Information_Form = [
  {
      label: 'بطاقة مقياس المخرج',
      labelEn: ' Deliverable Data',
      description: "التفاصيل",
      descriptionEn: "Details",
      subFields: [

          // {
          //     "InternalName": "Title",
          //     "DisplayNameEn": "Title",
          //     "DisplayName": "رمز المخرج",
          //     "type": "string",
          //     "validation": "required",
          //     "maxchar": "250"
          // },
          {
              "InternalName": "Name",
              "DisplayNameEn": "Name",
              "DisplayName": "مقياس المخرج",
              "type": "string",
              "maxchar": "250",
              "validation": "required"
          },
          {
            "InternalName": "RelatedInitiativeDeliverable",
            "DisplayNameEn": "Related Initiative Deliverable",
            "DisplayName":"مخرج المبادرة المرتبط",
            "type": "lookup",
            "source": "InitiativeDeliverables",
            "Dispfieldkey": "Name",
            "valfieldkey": "Title",
        } ,              
          {
              "InternalName": "Weight",
              "DisplayNameEn": "Weight",
              "DisplayName": "وزن ",
              "type": "float",
              // "state": "disabled",
              // dynamic: "Initiative"
            },
          {
              "InternalName": "Owner",
              "DisplayNameEn": "Owner",
              "DisplayName": "مالك مقياس المخرج",
              "type": "picker",
              // "state": "disabled",
              // dynamic: "Initiative"
            },
            {
              "InternalName": "Quarter",
              "DisplayNameEn": "Quarter",
              "DisplayName": "الربع",
              type: "dropdownValues",
              options: {
                  choices: [
                      { display: "quarter1", value: "quarter1" },
                      { display: "quarter2", value: "quarter2" },
                      { display: "quarter3", value: "quarter3" },
                      { display: "quarter4", value: "quarter4" },
                  ],
              },
              // security: {
              //     groups: [
              //         'SPM Admin', 'SPM Team', 'VRO_P', 'Performance Leaders', 'Administrators for Project Web App', 'OPMO', 'Project Managers for Project Web App'
              //     ]
              // },
          },
          {
            "InternalName": "Year",
            "DisplayNameEn": "Year",
            "DisplayName": "السنة",
            "type": "yearInput",
            //   "state": "disabled",
            //   dynamic: "Initiative",
            // options: {
            //     choices: [
            //         '2020',
            //         '2021',
            //         '2022',
            //         '2023',
            //         '2024',
            //         '2025',
            //         '2026',
            //         '2027',
            //         '2028',
            //         '2029',
            //         '2030',
            //     ]
            // },
            // security: {
            //     groups: [
            //         'SPM Admin', 'SPM Team', 'VRO_P', 'Performance Leaders', 'Administrators for Project Web App', 'OPMO', 'Project Managers for Project Web App'
            //     ]
            // },
        },
            {
              "InternalName": "MesureStatus",
              "DisplayNameEn": "MesureStatus",
              "DisplayName": "حالة القياس",
              "type": "dropdownValues",
              //   "state": "disabled",
              //   dynamic: "Initiative",
              options: {
                  choices: [
                      {
                          display: 'mersurable',
                          value: 'mersurable'
                      },
                      {
                          display: 'unmersurable',
                          value: 'unmersurable'
                      },
                      {
                          display: 'unspecific',
                          value: 'unspecific'
                      },
                  ]
              },
          
          },
            {
              "InternalName": "Polarity",
              "DisplayNameEn": "Polarity",
              "DisplayName": "قطبية المقياس",
                "type": "dropdown",
              //   "state": "disabled",
              //   dynamic: "Initiative",
              options: {
                choices: [
                  '+', '-'
                ]
              }
            },
            {
              "InternalName": "ResultType",
              "DisplayNameEn": "Result Type",
              // "state": "disabled",
              // dynamic: "Initiative",
              "DisplayName": "وحدة القياس",
              "type": "dropdownValues",
              options: {
                choices: [
                  { display: 'number', value: 'number' },
                  { display: 'percentage', value: 'percentage' },
                ]
              }
            },

      ]
  },

];