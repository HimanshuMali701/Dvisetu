/**
 * DviSetu - Default Seed Mock Data
 * Seed dataset initialized on first launch or reset.
 */

window.GovSeedData = {
  challenges: [
    {
      id: 'CH-101',
      title: 'AI-Based Hospital OPD Queue & Waiting Time Optimization',
      department: 'Department of Health & Family Welfare',
      sector: 'Healthcare & HealthTech',
      status: 'Pilot Running', // Draft | Open | Screening | Evaluation | Pilot Running | Scaled | Closed
      budgetRange: '₹15,00,000 - ₹25,00,000',
      budgetMax: 2500000,
      durationMonths: 6,
      problemStatement: 'Major tertiary government hospitals experience extreme crowding in OPD registration counters, resulting in average patient wait times exceeding 120 minutes. Current token systems lack predictive queue management and real-time patient load balancing across departments.',
      currentProcess: 'Manual queue token distribution at physical counters with static display boards. No integration with doctor availability schedules or preliminary triage classification.',
      expectedOutcome: 'Intelligent digital queuing system reducing OPD wait time by at least 40%, automated SMS/app queue status updates to patients, and dynamic doctor load balancing.',
      tags: ['AI/ML', 'Queue Management', 'HealthTech', 'IoT', 'Mobile App', 'OPD Triage'],
      dataRequirements: 'Anonymized historical OPD attendance records, real-time doctor roster schedule, department room maps.',
      eligibilityCriteria: {
        gstRequired: true,
        dpiitRequired: true,
        certificationRequired: true,
        financialRequirement: true,
        minTurnoverLakhs: 15,
        conflictDeclaration: true
      },
      kpis: [
        { id: 'kpi-1', name: 'Average OPD Waiting Time', baseline: 120, target: 45, unit: 'minutes', higherIsBetter: false },
        { id: 'kpi-2', name: 'Daily Patient Throughput per Counter', baseline: 150, target: 280, unit: 'patients', higherIsBetter: true },
        { id: 'kpi-3', name: 'Patient Satisfaction Rating', baseline: 2.2, target: 4.5, unit: 'out of 5', higherIsBetter: true }
      ],
      createdDate: '2026-08-15'
    },
    {
      id: 'CH-102',
      title: 'IoT & Acoustic Sensor-Based Urban Water Leakage Detection System',
      department: 'Jal Shakti Department & Municipal Corporation',
      sector: 'Urban Infrastructure & Smart City',
      status: 'Scaled',
      budgetRange: '₹30,00,000 - ₹50,00,000',
      budgetMax: 5000000,
      durationMonths: 9,
      problemStatement: 'Non-revenue water loss in urban water distribution supply networks averages 35% due to undetected subterranean pipe cracks and unauthorized taps. Existing detection methods rely on visual surface seepage inspections.',
      currentProcess: 'Periodic physical foot-patrol inspections and customer complaints after water surfacing occurs.',
      expectedOutcome: 'Sub-surface acoustic wave detection sensors with cellular telemetry for real-time pinpoint leakage localization within 2 meters.',
      tags: ['IoT Sensors', 'Acoustic Sensing', 'Smart Water', 'Telemetry', 'GIS Mapping'],
      dataRequirements: 'Municipal pipe network GIS shapefiles, pressure zone boundary data, nocturnal flow meter logs.',
      eligibilityCriteria: {
        gstRequired: true,
        dpiitRequired: true,
        certificationRequired: true,
        financialRequirement: true,
        minTurnoverLakhs: 25,
        conflictDeclaration: true
      },
      kpis: [
        { id: 'kpi-1', name: 'Subterranean Leak Detection Accuracy', baseline: 40, target: 90, unit: '% accuracy', higherIsBetter: true },
        { id: 'kpi-2', name: 'Average Time to Localize Pipe Leak', baseline: 72, target: 6, unit: 'hours', higherIsBetter: false },
        { id: 'kpi-3', name: 'Non-Revenue Water Loss Reduction', baseline: 35, target: 12, unit: '% loss', higherIsBetter: false }
      ],
      createdDate: '2026-06-10'
    },
    {
      id: 'CH-103',
      title: 'Automated Smart Waste Bin Level Monitoring & Route Optimization',
      department: 'Swachh Bharat Urban & Sanitation Mission',
      sector: 'Waste Management & Cleantech',
      status: 'Open',
      budgetRange: '₹10,00,000 - ₹20,00,000',
      budgetMax: 2000000,
      durationMonths: 4,
      problemStatement: 'Municipal garbage collection trucks operate on fixed schedules regardless of bin fill levels, leading to overflow in commercial zones while wasting fuel on half-empty residential bins.',
      currentProcess: 'Fixed daily route garbage trucks with no visibility into bin overflow statuses.',
      expectedOutcome: 'Solar-powered ultrasonic bin fill sensors paired with dynamic driver route navigation app to cut collection fuel costs by 25%.',
      tags: ['Ultrasonic Sensors', 'Waste Management', 'Route Optimization', 'IoT', 'Cleantech'],
      dataRequirements: 'GIS locations of 1,200 public waste bins, vehicle fleet GPS logs, landfill operating hours.',
      eligibilityCriteria: {
        gstRequired: true,
        dpiitRequired: true,
        certificationRequired: false,
        financialRequirement: true,
        minTurnoverLakhs: 10,
        conflictDeclaration: true
      },
      kpis: [
        { id: 'kpi-1', name: 'Public Bin Overflow Incidents', baseline: 45, target: 5, unit: 'incidents/week', higherIsBetter: false },
        { id: 'kpi-2', name: 'Garbage Fleet Fuel Consumption', baseline: 1200, target: 850, unit: 'liters/week', higherIsBetter: false }
      ],
      createdDate: '2026-09-01'
    },
    {
      id: 'CH-104',
      title: 'NLP-Driven Multilingual Public Grievance Classification & Dispatch',
      department: 'Department of Administrative Reforms & Public Grievances',
      sector: 'GovTech & Artificial Intelligence',
      status: 'Evaluation',
      budgetRange: '₹20,00,000 - ₹35,00,000',
      budgetMax: 3500000,
      durationMonths: 6,
      problemStatement: 'Public grievance portal receives over 15,000 petitions daily in 12 regional languages. Manual triaging causes delays of up to 14 days before a grievance reaches the correct departmental nodal officer.',
      currentProcess: 'Human clerks manually read, categorize, and forward grievance tickets in a web portal.',
      expectedOutcome: 'AI NLP system capable of automatically parsing regional language petitions, tagging urgency, detecting duplicate submissions, and auto-routing tickets within 15 minutes.',
      tags: ['NLP', 'Multilingual AI', 'GovTech', 'Grievance Automation', 'Text Analytics'],
      dataRequirements: '50,000 historical anonymized grievance petitions with correct department tags and resolution logs.',
      eligibilityCriteria: {
        gstRequired: true,
        dpiitRequired: true,
        certificationRequired: true,
        financialRequirement: true,
        minTurnoverLakhs: 20,
        conflictDeclaration: true
      },
      kpis: [
        { id: 'kpi-1', name: 'Automated Grievance Dispatch Time', baseline: 240, target: 15, unit: 'minutes', higherIsBetter: false },
        { id: 'kpi-2', name: 'Departmental Routing Accuracy', baseline: 65, target: 92, unit: '% accuracy', higherIsBetter: true }
      ],
      createdDate: '2026-08-20'
    }
  ],

  startups: [
    {
      id: 'SU-201',
      name: 'MedQ HealthTech Innovations Solutions',
      founder: 'Dr. Ananya Sharma & Rajiv Verma',
      sector: 'Healthcare & HealthTech',
      stage: 'Growth Stage',
      location: 'Bengaluru, Karnataka',
      teamSize: 22,
      dpiitRecognized: true,
      dpiitNumber: 'DPIIT-77491',
      gstRegistered: true,
      gstin: '29AAACM1234F1Z9',
      certifications: ['ISO 27001', 'CERT-In Security Cleared', 'HIPAA Compliant'],
      meetsFinancialTurnover: true,
      conflictDeclarationSigned: true,
      pastDeployments: 4,
      capabilityTags: ['AI/ML', 'Queue Management', 'HealthTech', 'Mobile App', 'OPD Triage', 'IoT'],
      pitchSummary: 'MedQ provides an AI-driven OPD queuing engine with WhatsApp appointment tokens, BLE indoor positioning, and hospital HIS integration installed across 12 private hospital chains.'
    },
    {
      id: 'SU-202',
      name: 'AquaTech Sensor Systems Pvt Ltd',
      founder: 'Vikramaditya Rao',
      sector: 'Urban Infrastructure & Smart City',
      stage: 'Scale-up',
      location: 'Hyderabad, Telangana',
      dpiitRecognized: true,
      dpiitNumber: 'DPIIT-33102',
      gstRegistered: true,
      gstin: '36AAACA8899K1Z4',
      certifications: ['ISO 9001', 'STQC Certified', 'CE Mark'],
      meetsFinancialTurnover: true,
      conflictDeclarationSigned: true,
      pastDeployments: 8,
      capabilityTags: ['IoT Sensors', 'Acoustic Sensing', 'Smart Water', 'Telemetry', 'GIS Mapping'],
      pitchSummary: 'AquaTech manufactures high-precision subterranean acoustic sensors and satellite telemetry nodes for city-wide municipal water loss reduction.'
    },
    {
      id: 'SU-203',
      name: 'BhashaAI Analytics Labs',
      founder: 'Siddharth Nair & Priya Menon',
      sector: 'GovTech & Artificial Intelligence',
      stage: 'Early Traction',
      location: 'Kochi, Kerala',
      dpiitRecognized: true,
      dpiitNumber: 'DPIIT-99201',
      gstRegistered: true,
      gstin: '32AAACB5544R1Z1',
      certifications: ['ISO 27001'],
      meetsFinancialTurnover: true,
      conflictDeclarationSigned: true,
      pastDeployments: 2,
      capabilityTags: ['NLP', 'Multilingual AI', 'GovTech', 'Grievance Automation', 'Text Analytics'],
      pitchSummary: 'BhashaAI specializes in Large Language Models fine-tuned on 14 Indic languages for automated document routing and government petition intelligence.'
    },
    {
      id: 'SU-204',
      name: 'EcoBin Smart Cleantech Solutions',
      founder: 'Rajesh Patel',
      sector: 'Waste Management & Cleantech',
      stage: 'Early Stage',
      location: 'Ahmedabad, Gujarat',
      dpiitRecognized: true,
      dpiitNumber: 'DPIIT-11203',
      gstRegistered: true,
      gstin: '24AAACE4433P1Z8',
      certifications: ['CE Mark'],
      meetsFinancialTurnover: true,
      conflictDeclarationSigned: true,
      pastDeployments: 3,
      capabilityTags: ['Ultrasonic Sensors', 'Waste Management', 'Route Optimization', 'IoT', 'Cleantech'],
      pitchSummary: 'EcoBin develops ruggedized ultrasonic bin fill sensors with NB-IoT connectivity and automated driver navigation app for municipal sanitation departments.'
    },
    // Intentionally Failing / Needs Review Startups for Eligibility Demo
    {
      id: 'SU-205',
      name: 'Novus NextGen Tech (Non-DPIIT)',
      founder: 'Karan Malhotra',
      sector: 'Healthcare & HealthTech',
      stage: 'Idea Stage',
      location: 'Delhi NCR',
      dpiitRecognized: false, // FAILS DPIIT
      dpiitNumber: '',
      gstRegistered: true,
      gstin: '07AAACN9900L1Z2',
      certifications: [],
      meetsFinancialTurnover: false, // FAILS FINANCIAL
      conflictDeclarationSigned: true,
      pastDeployments: 0,
      capabilityTags: ['AI/ML', 'Queue Management', 'HealthTech'],
      pitchSummary: 'Early stage student startup proposing a basic mobile ticketing application for clinics.'
    },
    {
      id: 'SU-206',
      name: 'CityPulse IoT Labs (Missing Certifications)',
      founder: 'Meera Deshmukh',
      sector: 'Urban Infrastructure & Smart City',
      stage: 'Early Traction',
      location: 'Pune, Maharashtra',
      dpiitRecognized: true,
      dpiitNumber: 'DPIIT-66712',
      gstRegistered: true,
      gstin: '27AAACC1122D1Z0',
      certifications: [], // FAILS CERTIFICATION REQUIREMENT
      meetsFinancialTurnover: true,
      conflictDeclarationSigned: false, // FAILS CONFLICT DECLARATION
      pastDeployments: 1,
      capabilityTags: ['IoT Sensors', 'Telemetry', 'Smart Water'],
      pitchSummary: 'Hardware prototype maker for urban water pressure monitoring sensors.'
    },
    {
      id: 'SU-207',
      name: 'IndicVoice GovTech',
      founder: 'Rohan Gupta',
      sector: 'GovTech & Artificial Intelligence',
      stage: 'Early Traction',
      location: 'Jaipur, Rajasthan',
      dpiitRecognized: true,
      dpiitNumber: 'DPIIT-44910',
      gstRegistered: true,
      gstin: '08AAACI3322M1Z5',
      certifications: ['ISO 9001'],
      meetsFinancialTurnover: true,
      conflictDeclarationSigned: true,
      pastDeployments: 2,
      capabilityTags: ['NLP', 'Multilingual AI', 'Grievance Automation'],
      pitchSummary: 'Voicebot engine for public grievance helplines in Hindi and Rajasthani dialects.'
    },
    {
      id: 'SU-208',
      name: 'GreenCycle Logistics',
      founder: 'Sanjay Kumar',
      sector: 'Waste Management & Cleantech',
      stage: 'Growth Stage',
      location: 'Chennai, Tamil Nadu',
      dpiitRecognized: true,
      dpiitNumber: 'DPIIT-55123',
      gstRegistered: true,
      gstin: '33AAACG7788S1Z3',
      certifications: ['ISO 14001'],
      meetsFinancialTurnover: true,
      conflictDeclarationSigned: true,
      pastDeployments: 5,
      capabilityTags: ['Waste Management', 'Route Optimization', 'Cleantech'],
      pitchSummary: 'Commercial waste collection dispatch and fleet optimization platform.'
    }
  ],

  applications: [
    {
      id: 'APP-501',
      challengeId: 'CH-101',
      startupId: 'SU-201', // MedQ
      submissionDate: '2026-08-25',
      status: 'Shortlisted', // Submitted | Shortlisted | Rejected | Selected for Pilot
      proposalText: 'MedQ proposes deploying 15 smart kiosk terminals, integrated with hospital HIS, along with WhatsApp queue status alerts and AI doctor load balancing algorithms across OPD wings.',
      proposedBudget: 2200000,
      proposedMonths: 6,
      eligibilityResult: null // computed on fly or stored
    },
    {
      id: 'APP-502',
      challengeId: 'CH-101',
      startupId: 'SU-205', // Novus (Fails eligibility)
      submissionDate: '2026-08-28',
      status: 'Rejected',
      proposalText: 'Novus proposes a mobile app for token generation.',
      proposedBudget: 1400000,
      proposedMonths: 5,
      eligibilityResult: null
    },
    {
      id: 'APP-503',
      challengeId: 'CH-104',
      startupId: 'SU-203', // BhashaAI
      submissionDate: '2026-08-30',
      status: 'Shortlisted',
      proposalText: 'Deploying BhashaAI Indic Transformer model trained on 12 regional languages for automated grievance classification and auto-routing to 45 government departments.',
      proposedBudget: 2800000,
      proposedMonths: 6,
      eligibilityResult: null
    },
    {
      id: 'APP-504',
      challengeId: 'CH-104',
      startupId: 'SU-207', // IndicVoice
      submissionDate: '2026-09-02',
      status: 'Shortlisted',
      proposalText: 'Voice-to-text grievance classification system for rural grievance petitions.',
      proposedBudget: 2600000,
      proposedMonths: 6,
      eligibilityResult: null
    }
  ],

  evaluations: [
    {
      id: 'EVAL-701',
      challengeId: 'CH-101',
      startupId: 'SU-201',
      evaluatorName: 'Dr. R. K. Shrivastava (Sr. Medical Director & Tech Expert)',
      timestamp: '2026-09-05 14:30',
      scores: {
        feasibility: 9,   // 25% -> 22.5
        impact: 9,        // 25% -> 22.5
        innovation: 8,    // 20% -> 16.0
        scalability: 9,   // 15% -> 13.5
        cost: 8,          // 10% -> 8.0
        readiness: 9      // 5%  -> 4.5
      },
      weightedTotal: 87.0,
      comments: 'Excellent past deployment track record in major hospitals. System architecture is robust and complies with hospital data privacy norms.'
    },
    {
      id: 'EVAL-702',
      challengeId: 'CH-104',
      startupId: 'SU-203',
      evaluatorName: 'Prof. S. Mukhopadhyay (IIT Madras AI Chair)',
      timestamp: '2026-09-08 11:15',
      scores: {
        feasibility: 8.5,
        impact: 9.0,
        innovation: 9.5,
        scalability: 8.5,
        cost: 7.5,
        readiness: 8.0
      },
      weightedTotal: 86.8,
      comments: 'State of the art Indic NLP capabilities. Outstanding accuracy on Tamil, Malayalam and Hindi petitions.'
    }
  ],

  pilots: [
    // 1. ACTIVE RUNNING PILOT (CH-101 MedQ) for end-to-end walking in 3 mins
    {
      id: 'PL-901',
      challengeId: 'CH-101',
      startupId: 'SU-201',
      startupName: 'MedQ HealthTech Innovations Solutions',
      challengeTitle: 'AI-Based Hospital OPD Queue & Waiting Time Optimization',
      department: 'Department of Health & Family Welfare',
      startDate: '2026-09-10',
      durationMonths: 6,
      contractValue: 2200000,
      status: 'In Progress', // In Progress | Validation Approved | Scaled Up | Closed
      currentStep: 7, // Stepper current step index
      milestones: [
        {
          id: 'M1',
          title: 'Milestone 1: HIS API Integration & Kiosk Hardware Setup',
          description: 'Deploy 15 OPD Kiosk Terminals and integrate API adapter with District Hospital Information System.',
          percentage: 20,
          amount: 440000,
          status: 'Done', // Done | In Progress | Pending
          approvalDate: '2026-09-20',
          evidenceNote: '15 Kiosks delivered & installed at Victoria Hospital OPD. HIS API endpoints verified.',
          evidenceFile: 'M1_HIS_Integration_Report_Signed.pdf'
        },
        {
          id: 'M2',
          title: 'Milestone 2: OPD Triage & Field Deployment (2 Wings)',
          description: 'Launch digital token system in General OPD and Orthopedics OPD wings with WhatsApp notifications.',
          percentage: 30,
          amount: 660000,
          status: 'In Progress',
          approvalDate: null,
          evidenceNote: 'Field testing active across 4 counters. Patient token generation active.',
          evidenceFile: 'M2_Field_Test_Log.pdf'
        },
        {
          id: 'M3',
          title: 'Milestone 3: Performance & Load Balancing Test',
          description: '30-day continuous stress testing during peak OPD hours (8 AM - 1 PM) with 3,000+ daily patients.',
          percentage: 30,
          amount: 660000,
          status: 'Pending',
          approvalDate: null,
          evidenceNote: '',
          evidenceFile: ''
        },
        {
          id: 'M4',
          title: 'Milestone 4: Final Evaluation & Third-Party Validation',
          description: 'Submission of 6-month KPI audit report and third-party validation clearance.',
          percentage: 20,
          amount: 440000,
          status: 'Pending',
          approvalDate: null,
          evidenceNote: '',
          evidenceFile: ''
        }
      ],
      kpiData: [
        { id: 'kpi-1', name: 'Average OPD Waiting Time', baseline: 120, target: 45, actual: 38, unit: 'minutes', higherIsBetter: false },
        { id: 'kpi-2', name: 'Daily Patient Throughput per Counter', baseline: 150, target: 280, actual: 295, unit: 'patients', higherIsBetter: true },
        { id: 'kpi-3', name: 'Patient Satisfaction Rating', baseline: 2.2, target: 4.5, actual: 4.6, unit: 'out of 5', higherIsBetter: true }
      ],
      contractClauses: {
        dataOwnership: 'All patient data, OPD logs, and operational telemetry remain the exclusive property of the Department of Health & Family Welfare.',
        ipOwnership: 'Core AI algorithms remain startup IP. Government holds an irrevocable, perpetual, royalty-free license for all public health facilities in the state.',
        dataRetention: 'Data retained locally within State Data Centre (SDC) tier-4 server infrastructure for 7 years.',
        securityRequirements: 'STQC security clearance, mandatory TLS 1.3 encryption in transit, AES-256 at rest.',
        confidentiality: 'Strict non-disclosure of hospital operational metrics to third parties without prior written government consent.',
        thirdPartyAccess: 'Restricted to authorized health auditors with multi-factor authentication logging.',
        incidentReporting: 'Mandatory 2-hour notification SLA for critical HIS API downtime or data security alerts.'
      },
      validation: {
        approved: false,
        validatorName: 'National Health Authority (NHA) Tech Evaluation Cell',
        validationDate: null,
        comments: 'Field audit report under review by senior medical director.'
      }
    },
    // 2. PRE-COMPLETED PILOT (CH-102 AquaTech) for historical dashboard data
    {
      id: 'PL-900',
      challengeId: 'CH-102',
      startupId: 'SU-202',
      startupName: 'AquaTech Sensor Systems Pvt Ltd',
      challengeTitle: 'IoT & Acoustic Sensor-Based Urban Water Leakage Detection System',
      department: 'Jal Shakti Department & Municipal Corporation',
      startDate: '2026-01-15',
      durationMonths: 9,
      contractValue: 4500000,
      status: 'Scaled Up',
      currentStep: 10,
      milestones: [
        { id: 'M1', title: 'Sensor Deployment', percentage: 20, amount: 900000, status: 'Done', approvalDate: '2026-02-10' },
        { id: 'M2', title: 'Network Telemetry Integration', percentage: 30, amount: 1350000, status: 'Done', approvalDate: '2026-04-15' },
        { id: 'M3', title: 'Leak Localization Field Audits', percentage: 30, amount: 1350000, status: 'Done', approvalDate: '2026-07-01' },
        { id: 'M4', title: 'Final Validation & Closeout', percentage: 20, amount: 900000, status: 'Done', approvalDate: '2026-08-30' }
      ],
      kpiData: [
        { id: 'kpi-1', name: 'Subterranean Leak Detection Accuracy', baseline: 40, target: 90, actual: 94, unit: '% accuracy', higherIsBetter: true },
        { id: 'kpi-2', name: 'Average Time to Localize Pipe Leak', baseline: 72, target: 6, actual: 4.5, unit: 'hours', higherIsBetter: false },
        { id: 'kpi-3', name: 'Non-Revenue Water Loss Reduction', baseline: 35, target: 12, actual: 11.2, unit: '% loss', higherIsBetter: false }
      ],
      contractClauses: {
        dataOwnership: 'State Water Board Data Property',
        ipOwnership: 'Startup Hardware IP, Government Perpetual License'
      },
      validation: {
        approved: true,
        validatorName: 'Central Ground Water Board (CGWB) Independent Auditor',
        validationDate: '2026-08-28',
        comments: 'Verified 94% leak pinpoint accuracy across 120km municipal water grid.'
      }
    }
  ],

  scaleDecisions: [
    {
      id: 'SD-1001',
      pilotId: 'PL-900',
      challengeTitle: 'IoT & Acoustic Sensor-Based Urban Water Leakage Detection System',
      startupName: 'AquaTech Sensor Systems Pvt Ltd',
      decision: 'Scale Up', // Scale Up | Do Not Scale | Conditional
      scope: 'State-wide (18 Municipal Corporations)',
      budgetAllocated: 25000000,
      timestamp: '2026-09-01',
      reasoning: 'Pilot demonstrated 94% leakage pinpoint accuracy and reduced non-revenue water loss from 35% to 11.2%, exceeding target benchmarks. Full municipal deployment approved.'
    }
  ],

  auditEvents: [
    { id: 'AUD-8801', timestamp: '2026-09-01 10:30:00', action: 'Scale Decision Approved', role: 'gov', entityType: 'Pilot', entityId: 'PL-900', status: 'Authorized', details: 'Authorized state-wide rollout for AquaTech Water Leakage System across 18 corporations.' },
    { id: 'AUD-8802', timestamp: '2026-08-28 16:45:00', action: 'Independent Validation Sign-off', role: 'expert', entityType: 'Validation', entityId: 'PL-900', status: 'Approved', details: 'CGWB Technical Evaluation Cell verified 94% pinpoint leak accuracy.' },
    { id: 'AUD-8803', timestamp: '2026-09-20 11:15:00', action: 'Milestone 1 Payment Released', role: 'gov', entityType: 'Pilot', entityId: 'PL-901', status: 'Disbursed', details: 'Released ₹4,40,000 (20%) after verifying 15 OPD Kiosk installations.' },
    { id: 'AUD-8804', timestamp: '2026-09-10 14:00:00', action: 'Pilot Contract Executed', role: 'gov', entityType: 'Pilot', entityId: 'PL-901', status: 'Active', details: 'Contract executed with MedQ HealthTech Solutions for ₹22,00,000.' },
    { id: 'AUD-8805', timestamp: '2026-09-05 15:30:00', action: 'Expert Evaluation Logged', role: 'expert', entityType: 'Evaluation', entityId: 'EVAL-701', status: 'Completed', details: 'Dr. R. K. Shrivastava scored MedQ proposal 87.0/100 across 6 criteria.' },
    { id: 'AUD-8806', timestamp: '2026-08-25 09:30:00', action: 'Startup Bid Received', role: 'startup', entityType: 'Application', entityId: 'APP-501', status: 'Submitted', details: 'MedQ HealthTech submitted commercial & technical bid for CH-101.' },
    { id: 'AUD-8807', timestamp: '2026-08-15 10:00:00', action: 'Challenge Published', role: 'gov', entityType: 'Challenge', entityId: 'CH-101', status: 'Published', details: 'Department of Health & Family Welfare published OPD queue optimization challenge.' }
  ],

  documents: [
    { id: 'DOC-501', entityId: 'CH-101', title: 'Challenge Specification & RFP Guidelines', category: 'Challenge Spec', fileName: 'CH101_OPD_Queue_RFP_v1.pdf', uploadedBy: 'Dept of Health', uploadDate: '2026-08-15', status: 'Approved' },
    { id: 'DOC-502', entityId: 'APP-501', title: 'MedQ Technical Architecture & Security Plan', category: 'Proposal', fileName: 'MedQ_HIS_Integration_Architecture.pdf', uploadedBy: 'MedQ HealthTech', uploadDate: '2026-08-25', status: 'Approved' },
    { id: 'DOC-503', entityId: 'PL-901', title: 'Milestone 1 Installation Sign-off & Hardware Audit', category: 'Milestone Deliverable', fileName: 'M1_HIS_Integration_Report_Signed.pdf', uploadedBy: 'MedQ HealthTech', uploadDate: '2026-09-20', status: 'Approved' },
    { id: 'DOC-504', entityId: 'PL-900', title: 'Central Ground Water Board Independent Validation Clearance', category: 'Validation Clearance', fileName: 'CGWB_Technical_Validation_Clearance_2026.pdf', uploadedBy: 'CGWB Auditor', uploadDate: '2026-08-28', status: 'Approved' },
    { id: 'DOC-505', entityId: 'SD-1001', title: 'State-wide Procurement Scale-up Sanction Order', category: 'Scale Decree', fileName: 'Govt_Sanction_Order_WaterTech_Scale_2026.pdf', uploadedBy: 'Nodal Procurement Cell', uploadDate: '2026-09-01', status: 'Approved' }
  ]
};
