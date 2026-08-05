/*
  هذا الملف هو المكان اللي بنعرّف فيه "كيف الحذف يشتغل" لكل ListKey.
: أي عملية حذف تمر على API موحدة، و الـ API تعتمد على البيانات الموجودة هون.

  ملاحظة مهمة:
  - إذا أضفت ListKey جديدة في List_Name_Config.js، لازم تضيفها هنا يدويًا.
  - لا تعتمد على guessing، خلي DisplayListName مطابق حرفيًا لاسم القائمة في SharePoint.
  - إذا في child lists مرتبطة (مثل deliverables تحت projects)، ضيفها داخل RelatedListNames.

  This file is the deletion map for the unified delete API.
  If a new list key is introduced, add a manual entry here.

  API Contract
  Endpoint: POST ${APIURL}/general/deleteitemandrelatedtasks

  Payload example:
  {
    "ItemId": 9873,                 // Required - current item id (IID)
    "DisplayListName": "Projects",  // Required - SharePoint display list name
    "requestingUserId": 1302,       // Required - current logged-in user id
    "WorkflowNames": "VROCreateProject,EPMOCreateProject,...", // Optional string
    "RelatedListNames": [           // Optional array
      {
        "DisplayListName": "Deliverables",             // Required for child item
        "WorkflowNames": "VROProjDeliverable,...",     // Optional for child
        "RelatedListFilterColumnName": "ProjectCode"   // Required for relation
      }
    ]
  }

  شرح:
  - ItemId: id العنصر الحالي المراد حذفه.
  - DisplayListName: اسم القائمة الأساسية في SharePoint.
  - requestingUserId: id logged in user.
  - WorkflowNames: أسماء workflow مرتبطة بالقائمة الأساسية (comma " , " separated).
  - RelatedListNames: القوائم المرتبطة اللي لازم تُعالج مع الحذف.
    - DisplayListName: اسم القائمة الفرعية.
    - WorkflowNames: workflows للفرعية (إن وجدت).
    - RelatedListFilterColumnName: column name to filter the related list.
*/
window.FormsConfigurationsForDeletionsRestoring = {
    listKeyConfigurations: {
        projects: {
            DisplayListName: "Projects",
            WorkflowNames:
                "VROCreateProject,EPMOCreateProject,LMSCreateProject,SODCreateProject,Project",
            RelatedListNames: [
                {
                    DisplayListName: "Deliverables",
                    WorkflowNames:
                        "VROProjDeliverable,EPMOProjDeliverable,LMSProjDeliverable,SODProjDeliverable",
                    RelatedListFilterColumnName: "ProjectCode",
                },
                {
                    DisplayListName: "Issues",
                    WorkflowNames: "",
                    RelatedListFilterColumnName: "ProjectCode",
                },
                {
                    DisplayListName: "Risks",
                    WorkflowNames: "",
                    RelatedListFilterColumnName: "ProjectCode",
                },
                {
                    DisplayListName: "NewChangeRequests",
                    WorkflowNames: "StrategicCR,ExecutionCR,OperationCR",
                    RelatedListFilterColumnName: "ParentItemCode",
                },
                {
                    DisplayListName: "Stakeholders",
                    WorkflowNames: "",
                    RelatedListFilterColumnName: "ProjectCode",
                },
                {
                    DisplayListName: "Milestones",
                    WorkflowNames:
                        "VROProjMilestone,EPMOProjMilestone,LMSProjMilestone,SODProjMilestone",
                    RelatedListFilterColumnName: "ProjectCode",
                },
                {
                    DisplayListName: "MOM",
                    WorkflowNames: "",
                    RelatedListFilterColumnName: "ProjectCode",
                },
                {
                    DisplayListName: "Lessons Learned",
                    WorkflowNames: "",
                    RelatedListFilterColumnName: "ProjectCode",
                },
                {
                    DisplayListName: "Contracts",
                    WorkflowNames: "",
                    RelatedListFilterColumnName: "ProjectCode",
                },
                {
                    DisplayListName: "Communication Plans",
                    WorkflowNames: "",
                    RelatedListFilterColumnName: "ProjectCode",
                },
                {
                    DisplayListName: "Closure Form",
                    WorkflowNames: "ProjectClosure",
                    RelatedListFilterColumnName: "ProjectCode",
                },
                {
                    DisplayListName: "Certifications",
                    WorkflowNames: "VROCOC,EPMOCOC,LMSCOC,SODCOC",
                    RelatedListFilterColumnName: "ProjectCode",
                },
            ],
        },
        initiatives: {
            DisplayListName: "Initiatives",
            WorkflowNames:
                "VisionInitiative,StrategicallyInitiative,LMSInitiative,SODInitiative,VROCreateInitiative,EPMOCreateInitiative,LMSCreateInitiative,SODCreateInitiative",
            RelatedListNames: [
                {
                    DisplayListName: "InitiativeDeliverables",
                    WorkflowNames:
                        "VROInitiativeDeliverable,EPMOInitiativeDeliverable,LMSInitiativeDeliverable,SODInitiativeDeliverable",
                    RelatedListFilterColumnName: "InitiativeCode",
                },
                {
                    DisplayListName: "InitiativeMilestones",
                    WorkflowNames:
                        "VROInitiativeMilestone,EPMOInitiativeMilestone,LMSInitiativeMilestone,SODInitiativeMilestone",
                    RelatedListFilterColumnName: "InitiativeCode",
                },
                {
                    DisplayListName: "Issues",
                    WorkflowNames: "",
                    RelatedListFilterColumnName: "InitiativeCode",
                },
                {
                    DisplayListName: "Risks",
                    WorkflowNames: "",
                    RelatedListFilterColumnName: "InitiativeCode",
                },
                {
                    DisplayListName: "NewChangeRequests",
                    WorkflowNames: "StrategicCR,ExecutionCR,OperationCR",
                    RelatedListFilterColumnName: "ParentItemCode",
                },
                {
                    DisplayListName: "Benefits",
                    WorkflowNames: "",
                    RelatedListFilterColumnName: "InitiativeCode",
                },
                {
                    DisplayListName: "BenefitMetrics",
                    WorkflowNames:
                        "VROBenefitActual,EPMOBenefitActual,LMSBenefitActual,SODBenefitActual",
                    RelatedListFilterColumnName: "InitiativeCode",
                },
                {
                    DisplayListName: "MOM",
                    WorkflowNames: "",
                    RelatedListFilterColumnName: "InitiativeCode",
                },
                {
                    DisplayListName: "Closure Form",
                    WorkflowNames: "InitiativeClosure",
                    RelatedListFilterColumnName: "InitiativeCode",
                },
            ],
        },
        sos: {
            DisplayListName: "SOs",
            WorkflowNames:
                "VROCreateObjective,LMSCreateObjective,MSCreateObjective,SODCreateObjective",
            RelatedListNames: [
                {
                    DisplayListName: "NewChangeRequests",
                    WorkflowNames: "StrategicCR,ExecutionCR,OperationCR",
                    RelatedListFilterColumnName: "ParentItemCode",
                },
            ],
        },
        mainkpi: {
            DisplayListName: "MainKPI",
            WorkflowNames:
                "VROCreateKPI,EPMOCreateKPI,LMSCreateKPI,SODCreateKPI,MSActualKPI",
            RelatedListNames: [
                {
                    DisplayListName: "KPIResults",
                    WorkflowNames: "",
                    RelatedListFilterColumnName: "KPI",
                },
                {
                    DisplayListName: "NewChangeRequests",
                    WorkflowNames: "StrategicCR,ExecutionCR,OperationCR",
                    RelatedListFilterColumnName: "ParentItemCode",
                },
            ],
        },
        deliverables: {
            DisplayListName: "Deliverables",
            WorkflowNames:
                "VROProjDeliverable,EPMOProjDeliverable,LMSProjDeliverable,SODProjDeliverable",
            RelatedListNames: [],
        },
        milestones: {
            DisplayListName: "Milestones",
            WorkflowNames:
                "VROProjMilestone,EPMOProjMilestone,LMSProjMilestone,SODProjMilestone",
            RelatedListNames: [],
        },
        initiativedeliverables: {
            DisplayListName: "InitiativeDeliverables",
            WorkflowNames:
                "VROInitiativeDeliverable,EPMOInitiativeDeliverable,LMSInitiativeDeliverable,SODInitiativeDeliverable",
            RelatedListNames: [],
        },
        initiativemilestones: {
            DisplayListName: "InitiativeMilestones",
            WorkflowNames:
                "VROInitiativeMilestone,EPMOInitiativeMilestone,LMSInitiativeMilestone,SODInitiativeMilestone",
            RelatedListNames: [],
        },
        risks: {
            DisplayListName: "Risks",
            WorkflowNames: "",
            RelatedListNames: [],
        },
        issues: {
            DisplayListName: "Issues",
            WorkflowNames: "",
            RelatedListNames: [],
        },
        initiativerisks: {
            DisplayListName: "Risks",
            WorkflowNames: "",
            RelatedListNames: [],
        },
        initiativeissues: {
            DisplayListName: "Issues",
            WorkflowNames: "",
            RelatedListNames: [],
        },
        benefits: {
            DisplayListName: "Benefits",
            WorkflowNames: "InitiativeBenefits,MSActualBenefit",
            RelatedListNames: [],
        },
        benefitmetrics: {
            DisplayListName: "BenefitMetrics",
            WorkflowNames:
                "VROBenefitActual,EPMOBenefitActual,LMSBenefitActual,SODBenefitActual",
            RelatedListNames: [],
        },
        changerequests: {
            DisplayListName: "NewChangeRequests",
            WorkflowNames: "StrategicCR,ExecutionCR,OperationCR",
            RelatedListNames: [],
        },
        mainkpiissues: {
            DisplayListName: "MainKPIIssues",
            WorkflowNames: "",
            RelatedListNames: [],
        },
        mainkpianalysis: {
            DisplayListName: "MainKPIAnalysis",
            WorkflowNames: "",
            RelatedListNames: [],
        },
        sosanalysis: {
            DisplayListName: "SOsAnalysis",
            WorkflowNames: "",
            RelatedListNames: [],
        },
        tasks: { DisplayListName: "Tasks", WorkflowNames: "", RelatedListNames: [] },
        engineeringprojects: { DisplayListName: "EngineeringProjects", WorkflowNames: "", RelatedListNames: [] },
        engineeringprojectshistory: { DisplayListName: "engineeringprojectshistory", WorkflowNames: "", RelatedListNames: [] },
        localholidays: { DisplayListName: "LocalHolidays", WorkflowNames: "", RelatedListNames: [] },
        contracts: { DisplayListName: "Contracts", WorkflowNames: "", RelatedListNames: [] },
        lessonslearned: { DisplayListName: "Lessons Learned", WorkflowNames: "", RelatedListNames: [] },
        initiativelessonslearned: { DisplayListName: "Lessons Learned", WorkflowNames: "", RelatedListNames: [] },
        strategicpartnershipslessonslearned: { DisplayListName: "Lessons Learned", WorkflowNames: "", RelatedListNames: [] },
        portfolio: { DisplayListName: "Portfolio", WorkflowNames: "", RelatedListNames: [] },
        committees: { DisplayListName: "Committees", WorkflowNames: "", RelatedListNames: [] },
        compliancemajors: { DisplayListName: "ComplianceMajors", WorkflowNames: "", RelatedListNames: [] },
        nesteddeliverables: { DisplayListName: "NestedDeliverables", WorkflowNames: "", RelatedListNames: [] },
        initiativecompliancemajors: { DisplayListName: "IComplianceMajors", WorkflowNames: "", RelatedListNames: [] },
        monthlyreport: { DisplayListName: "MonthlyReport", WorkflowNames: "", RelatedListNames: [] },
        developmentrequirements: { DisplayListName: "DevelopmentRequirements", WorkflowNames: "", RelatedListNames: [] },
        invoices: { DisplayListName: "Invoices", WorkflowNames: "", RelatedListNames: [] },
        strategicpartnershipsdeliverables: { DisplayListName: "Deliverables", WorkflowNames: "", RelatedListNames: [] },
        projectcharter: { DisplayListName: "Projects", WorkflowNames: "", RelatedListNames: [] },
        deliveries: { DisplayListName: "Deliveries", WorkflowNames: "", RelatedListNames: [] },
        opkpis: { DisplayListName: "OPKPIs", WorkflowNames: "", RelatedListNames: [] },
        kpiinput: { DisplayListName: "KPI Input", WorkflowNames: "", RelatedListNames: [] },
        measurementcyclesupport: { DisplayListName: "MeasurementCycleSupport", WorkflowNames: "", RelatedListNames: [] },
        strategiccalendar: { DisplayListName: "StrategicCalendar", WorkflowNames: "", RelatedListNames: [] },
        projectarchivingdocs: { DisplayListName: "Project Archiving Docs", WorkflowNames: "", RelatedListNames: [] },
        exchangeschema: { DisplayListName: "ExchangeSchema", WorkflowNames: "", RelatedListNames: [] },
        strategicpartnershipsmilestones: { DisplayListName: "Milestones", WorkflowNames: "", RelatedListNames: [] },
        benefitdeliverables: { DisplayListName: "BenefitDeliverables", WorkflowNames: "", RelatedListNames: [] },
        closureform: { DisplayListName: "Closure Form", WorkflowNames: "ProjectClosure", RelatedListNames: [] },
        closureinitiative: { DisplayListName: "Closure Form", WorkflowNames: "InitiativeClosure", RelatedListNames: [] },
        skpis: { DisplayListName: "SKPIs", WorkflowNames: "", RelatedListNames: [] },
        budgetitems: { DisplayListName: "Budget Items", WorkflowNames: "", RelatedListNames: [] },
        instrumentexpenditures: { DisplayListName: "Instrument Expenditures", WorkflowNames: "", RelatedListNames: [] },
        instrumentrelatedbudget: { DisplayListName: "Instrument Related Budget", WorkflowNames: "", RelatedListNames: [] },
        instruments: { DisplayListName: "Instruments", WorkflowNames: "", RelatedListNames: [] },
        benefitmatrix: { DisplayListName: "BenefitMatrix", WorkflowNames: "", RelatedListNames: [] },
        deliverablemetrics: { DisplayListName: "DeliverableMetrics", WorkflowNames: "", RelatedListNames: [] },
        regioninput: { DisplayListName: "Region Input", WorkflowNames: "", RelatedListNames: [] },
        ideas: { DisplayListName: "Ideas", WorkflowNames: "", RelatedListNames: [] },
        stakeholders: { DisplayListName: "Stakeholders", WorkflowNames: "", RelatedListNames: [] },
        initiativeobjectives: { DisplayListName: "InitiativeObjectives", WorkflowNames: "", RelatedListNames: [] },
        initiativestakeholders: { DisplayListName: "InitiativeStakeholders", WorkflowNames: "", RelatedListNames: [] },
        initiativetasks: { DisplayListName: "InitiativeTasks", WorkflowNames: "", RelatedListNames: [] },
        mom: { DisplayListName: "MOM", WorkflowNames: "", RelatedListNames: [] },
        vendors: { DisplayListName: "Vendors", WorkflowNames: "", RelatedListNames: [] },
        communicationplans: { DisplayListName: "Communication Plans", WorkflowNames: "", RelatedListNames: [] },
        taskdetails: { DisplayListName: "Task Details", WorkflowNames: "", RelatedListNames: [] },
        kpiequations: { DisplayListName: "KPIEquations", WorkflowNames: "", RelatedListNames: [] },
        mainkpidatasources: { DisplayListName: "MainKPIDataSources", WorkflowNames: "", RelatedListNames: [] },
        benefitsequations: { DisplayListName: "BenefitsEquations", WorkflowNames: "", RelatedListNames: [] },
        goalstrategy: { DisplayListName: "GoalStrategy", WorkflowNames: "", RelatedListNames: [] },
        strategicpartnerships: { DisplayListName: "Strategic Partnerships", WorkflowNames: "", RelatedListNames: [] },
        achievements: { DisplayListName: "Achievements", WorkflowNames: "", RelatedListNames: [] },
        strategicpartnershipsvendors: { DisplayListName: "Vendors", WorkflowNames: "", RelatedListNames: [] },
        strategicpartnershipsimpactmeasurement: { DisplayListName: "SPImpactMeasurement", WorkflowNames: "", RelatedListNames: [] },
        strategicpartnershipsachievements: { DisplayListName: "SPAchievements", WorkflowNames: "", RelatedListNames: [] },
        coc: { DisplayListName: "Certifications", WorkflowNames: "VROCOC,EPMOCOC,LMSCOC,SODCOC", RelatedListNames: [] },
        analysis: { DisplayListName: "Analysis", WorkflowNames: "", RelatedListNames: [] },
        initiativeskpi: { DisplayListName: "InitiativeKPI", WorkflowNames: "", RelatedListNames: [] },
        instrumentskpi: { DisplayListName: "InstrumentKPI", WorkflowNames: "", RelatedListNames: [] },
        dimensions: { DisplayListName: "Dimensions", WorkflowNames: "", RelatedListNames: [] },
        spillars: { DisplayListName: "SPillars", WorkflowNames: "", RelatedListNames: [] },
        initiativecards: { DisplayListName: "Initiatives", WorkflowNames: "", RelatedListNames: [] },
        initiativeexecution: { DisplayListName: "Initiatives", WorkflowNames: "", RelatedListNames: [] },
        initiativedeliverablesacceptance: { DisplayListName: "InitiativeDeliverables", WorkflowNames: "", RelatedListNames: [] },
        initiativemilestonesacceptance: { DisplayListName: "InitiativeMilestones", WorkflowNames: "", RelatedListNames: [] },
        initiativesample: { DisplayListName: "Initiatives", WorkflowNames: "", RelatedListNames: [] },
        initiativeupdates: { DisplayListName: "Updates", WorkflowNames: "", RelatedListNames: [] },
        projectupdates: { DisplayListName: "Updates", WorkflowNames: "", RelatedListNames: [] },
        strategicpartnershipsissues: { DisplayListName: "Issues", WorkflowNames: "", RelatedListNames: [] },
        strategicpartnershipsmom: { DisplayListName: "MOM", WorkflowNames: "", RelatedListNames: [] },
        initiativemom: { DisplayListName: "MOM", WorkflowNames: "", RelatedListNames: [] },
        strategicpartnershipsrisks: { DisplayListName: "Risks", WorkflowNames: "", RelatedListNames: [] },
        changeitems: { DisplayListName: "ChangeItems", WorkflowNames: "", RelatedListNames: [] },
        changeitemapprovalcontrol: { DisplayListName: "ChangeItemApprovalControl", WorkflowNames: "", RelatedListNames: [] },
        finalapprovallevels: { DisplayListName: "FinalApprovalLevels", WorkflowNames: "", RelatedListNames: [] },
        cryearlycalendar: { DisplayListName: "CRYearlyCalendar", WorkflowNames: "", RelatedListNames: [] },
        delegations: { DisplayListName: "Delegations", WorkflowNames: "", RelatedListNames: [] },
    },
    // Returns deletion config by list key
    getDeletionConfigByListKey: function (listKey) {
        if (!listKey) return null;
        return this.listKeyConfigurations[listKey.toLowerCase()] || null;
    },
    // Returns deletion config by SharePoint display list name
    getDeletionConfigByDisplayListName: function (displayListName) {
        if (!displayListName) return null;
        var normalizedDisplayName = displayListName.toLowerCase();
        var keys = Object.keys(this.listKeyConfigurations);
        for (var i = 0; i < keys.length; i++) {
            var item = this.listKeyConfigurations[keys[i]];
            if (
                item &&
                item.DisplayListName &&
                item.DisplayListName.toLowerCase() == normalizedDisplayName
            ) {
                return item;
            }
        }
        return null;
    },
};
