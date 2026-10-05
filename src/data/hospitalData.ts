import {
  HospitalInfo,
  KpiData,
  EarlyWarningData,
  BottleneckData,
  RecommendationAction,
  DepartmentData,
  ResourceItem,
  TimelineEvent,
  ForecastPoint,
  ScenarioId
} from '../types';

export const HOSPITALS: HospitalInfo[] = [
  {
    id: 'metro-gen',
    name: 'Metro General Hospital',
    type: 'Level 1 Trauma Center',
    totalBeds: 620,
    status: 'High Stress'
  },
  {
    id: 'st-jude',
    name: 'St. Jude Academic Medical Center',
    type: 'Teaching & Research Hospital',
    totalBeds: 480,
    status: 'Elevated'
  },
  {
    id: 'city-central',
    name: 'City Central Urgent Care & Hospital',
    type: 'Community Health Network',
    totalBeds: 320,
    status: 'Normal'
  }
];

export interface ScenarioDataset {
  name: string;
  badge: string;
  description: string;
  kpis: KpiData;
  earlyWarning: EarlyWarningData;
  bottleneck: BottleneckData;
  recommendations: RecommendationAction[];
  departments: DepartmentData[];
  resources: ResourceItem[];
  timeline: TimelineEvent[];
  forecasts: ForecastPoint[];
}

export const SCENARIO_DATA: Record<ScenarioId, ScenarioDataset> = {
  'normal': {
    name: 'Normal Morning Flow',
    badge: 'Baseline Flow',
    description: 'Steady morning patient check-in rate with balanced staffing across all wings.',
    kpis: {
      patientArrivals: { value: 112, unit: '/hr', trend: '↑ 2%', trendDirection: 'neutral' },
      patientsWaiting: { value: 32, unit: 'pts', trend: '↓ 4%', trendDirection: 'down' },
      averageWaitTime: { value: 21, unit: 'min', trend: '↓ 3 min', trendDirection: 'down' },
      queuePressure: { value: 48, unit: '/100', status: 'Nominal' },
      resourceUtilization: { value: 74, unit: '%', trend: 'Nominal', trendDirection: 'neutral' },
      hospitalStress: { score: 38, max: 100, level: 'LOW', color: '#10B981' }
    },
    earlyWarning: {
      title: 'Gradual Noon Inflow Anticipated',
      timeWindow: '65 min',
      predictedQueuePressure: 55,
      predictedWaitTime: 24,
      confidence: 94,
      dataQuality: 'High',
      description: 'Expected routine outpatient surge between 11:30 and 13:00. Handled by existing shifts.'
    },
    bottleneck: {
      department: 'Outpatient Labs',
      severity: 'LOW',
      why: 'Scheduled morning blood draw volume clusters between 08:30 and 10:00.',
      impact: 'Mild phlebotomy waiting list (approx 8 patients).',
      crossImpact: 'No cascade to acute care or inpatient units.'
    },
    recommendations: [
      {
        id: 'rec-norm-1',
        title: 'Open Self-Service Phlebotomy Kiosk 3',
        category: 'Capacity Expansion',
        description: 'Activate automated check-in kiosk for routine fasting labs to eliminate morning reception line.',
        expectedImpact: { waitTimeDelta: '↓ 12%', queuePressureDelta: '↓ 8%', stressDelta: '↓ 5%' },
        riskIfIgnored: 'Minor lobby crowding until 10:30.',
        explainability: 'Historical trend shows 34% faster queue clearance with self-registration check-in.',
        targetDepartment: 'Registration & Triage',
        applied: false
      }
    ],
    departments: [
      { id: 'ed', name: 'Emergency & Trauma', activePatients: 24, capacity: 45, doctorsActive: 8, doctorsTotal: 10, nursesActive: 16, nursesTotal: 18, waitTimeMinutes: 18, status: 'Normal', utilizationRate: 53 },
      { id: 'triage', name: 'Registration & Triage', activePatients: 14, capacity: 25, doctorsActive: 3, doctorsTotal: 4, nursesActive: 6, nursesTotal: 6, waitTimeMinutes: 12, status: 'Normal', utilizationRate: 56 },
      { id: 'inpatient', name: 'Inpatient Wards', activePatients: 290, capacity: 360, doctorsActive: 22, doctorsTotal: 24, nursesActive: 54, nursesTotal: 58, waitTimeMinutes: 0, status: 'Normal', utilizationRate: 80 },
      { id: 'icu', name: 'Intensive Care Unit (ICU)', activePatients: 28, capacity: 36, doctorsActive: 6, doctorsTotal: 6, nursesActive: 14, nursesTotal: 14, waitTimeMinutes: 0, status: 'Normal', utilizationRate: 77 },
      { id: 'radiology', name: 'Radiology & Imaging', activePatients: 9, capacity: 16, doctorsActive: 4, doctorsTotal: 4, nursesActive: 6, nursesTotal: 6, waitTimeMinutes: 15, status: 'Normal', utilizationRate: 56 },
      { id: 'surgery', name: 'Surgical Suites', activePatients: 8, capacity: 12, doctorsActive: 10, doctorsTotal: 12, nursesActive: 18, nursesTotal: 20, waitTimeMinutes: 0, status: 'Normal', utilizationRate: 66 }
    ],
    resources: [
      { id: 'res-1', name: 'Dr. Sarah Vance', role: 'Attending Physician', department: 'Emergency & Trauma', status: 'Active', shift: '07:00 - 15:00' },
      { id: 'res-2', name: 'Dr. Michael Chen', role: 'Attending Physician', department: 'Inpatient Wards', status: 'Available', shift: '08:00 - 16:00' },
      { id: 'res-3', name: 'Nurse Elena Rostova', role: 'Charge Nurse', department: 'Registration & Triage', status: 'Active', shift: '07:00 - 15:00' },
      { id: 'res-4', name: 'Nurse David Kim', role: 'Triage Nurse', department: 'Registration & Triage', status: 'Available', shift: '08:00 - 16:00' },
      { id: 'res-5', name: 'Dr. Amara Patel', role: 'Attending Physician', department: 'Intensive Care Unit (ICU)', status: 'Active', shift: '07:00 - 19:00' },
      { id: 'res-6', name: 'Tech Mark Walsh', role: 'Radiology Tech', department: 'Radiology & Imaging', status: 'Active', shift: '07:00 - 15:00' }
    ],
    timeline: [
      { id: 't-1', time: '08:00', title: 'Day Shift Roll Call Complete', description: 'Full staff complement checked in across all 6 clinical departments.', type: 'staff', severity: 'info' },
      { id: 't-2', time: '07:30', title: 'Morning Lab Batch Initiated', description: 'Standard outpatient morning specimen processing on track.', type: 'system', severity: 'info' }
    ],
    forecasts: [
      { time: '08:00', currentActual: 98, predictedArrivals: 102, queuePressure: 42, capacityThreshold: 160 },
      { time: '09:00', currentActual: 112, predictedArrivals: 114, queuePressure: 48, capacityThreshold: 160 },
      { time: '10:00', predictedArrivals: 124, queuePressure: 52, capacityThreshold: 160 },
      { time: '11:00', predictedArrivals: 130, queuePressure: 55, capacityThreshold: 160 },
      { time: '12:00', predictedArrivals: 138, queuePressure: 58, capacityThreshold: 160 },
      { time: '13:00', predictedArrivals: 120, queuePressure: 49, capacityThreshold: 160 },
      { time: '14:00', predictedArrivals: 108, queuePressure: 44, capacityThreshold: 160 }
    ]
  },
  'trauma-surge': {
    name: 'Post-Accident Trauma Surge',
    badge: 'Active Surge Warning',
    description: 'Multi-vehicle collision on highway 101 resulting in multiple incoming high-acuity trauma transfers.',
    kpis: {
      patientArrivals: { value: 142, unit: '/hr', trend: '↑ 8%', trendDirection: 'up' },
      patientsWaiting: { value: 58, unit: 'pts', trend: '↑ 14%', trendDirection: 'up' },
      averageWaitTime: { value: 34, unit: 'min', trend: '↑ 6 min', trendDirection: 'up' },
      queuePressure: { value: 76, unit: '/100', status: 'Elevated' },
      resourceUtilization: { value: 87, unit: '%', trend: '↑ 2%', trendDirection: 'up' },
      hospitalStress: { score: 64, max: 100, level: 'HIGH', color: '#F59E0B' }
    },
    earlyWarning: {
      title: 'Potential Capacity Pressure',
      timeWindow: '42 min',
      predictedQueuePressure: 72,
      predictedWaitTime: 18,
      confidence: 92,
      dataQuality: 'High',
      description: 'Incoming EMS telemetry flags 6 additional severe trauma ambulances entering perimeter.'
    },
    bottleneck: {
      department: 'Registration',
      severity: 'HIGH',
      why: 'Arrival volume is increasing faster than registration capacity.',
      impact: 'Waiting queue increasing.',
      crossImpact: 'Cascades into triage delay and delayed physician consultation assignments.'
    },
    recommendations: [
      {
        id: 'rec-surge-1',
        title: 'Move 1 available doctor to Emergency.',
        category: 'Staff Allocation',
        description: 'Reallocate Dr. Michael Chen from General Inpatient Rounds to Emergency Acute Bay 3.',
        expectedImpact: { waitTimeDelta: '↓ 24%', queuePressureDelta: '↓ 17%', stressDelta: '↓ 14%' },
        riskIfIgnored: 'Average ED triage time will breach the 45-minute clinical safety threshold within 30 minutes.',
        explainability: 'Emergency acute bay requires 1 additional physician to absorb incoming trauma wave while Inpatient has 2 physicians above minimum ratio.',
        targetDepartment: 'Emergency & Trauma',
        applied: false
      },
      {
        id: 'rec-surge-2',
        title: 'Activate Rapid Triage Auxiliary Station B',
        category: 'Capacity Expansion',
        description: 'Repurpose Consultation Booth 4 for digital intake triage to clear front lobby intake backlog.',
        expectedImpact: { waitTimeDelta: '↓ 16%', queuePressureDelta: '↓ 12%', stressDelta: '↓ 8%' },
        riskIfIgnored: 'Waiting room capacity reaches 94% threshold in 25 minutes.',
        explainability: 'Parallel registration decouples ambulatory walk-ins from arriving ambulance bays.',
        targetDepartment: 'Registration & Triage',
        applied: false
      },
      {
        id: 'rec-surge-3',
        title: 'Expedite Ward 4B Discharge Paperwork',
        category: 'Discharge Protocol',
        description: 'Release 5 cleared postoperative patients to transfer lounge to free up intermediate monitoring beds.',
        expectedImpact: { waitTimeDelta: '↓ 8%', queuePressureDelta: '↓ 10%', stressDelta: '↓ 9%' },
        riskIfIgnored: 'Inpatient boarding creates an ambulance offload backlog at the emergency ramp.',
        explainability: 'Frees 5 beds prior to peak hospital bed occupancy threshold at 12:30.',
        targetDepartment: 'Inpatient Wards',
        applied: false
      }
    ],
    departments: [
      { id: 'ed', name: 'Emergency & Trauma', activePatients: 42, capacity: 45, doctorsActive: 9, doctorsTotal: 10, nursesActive: 18, nursesTotal: 18, waitTimeMinutes: 34, status: 'Critical', utilizationRate: 93 },
      { id: 'triage', name: 'Registration & Triage', activePatients: 23, capacity: 25, doctorsActive: 3, doctorsTotal: 4, nursesActive: 6, nursesTotal: 6, waitTimeMinutes: 28, status: 'Critical', utilizationRate: 92 },
      { id: 'inpatient', name: 'Inpatient Wards', activePatients: 334, capacity: 360, doctorsActive: 23, doctorsTotal: 24, nursesActive: 55, nursesTotal: 58, waitTimeMinutes: 0, status: 'Elevated', utilizationRate: 92 },
      { id: 'icu', name: 'Intensive Care Unit (ICU)', activePatients: 33, capacity: 36, doctorsActive: 6, doctorsTotal: 6, nursesActive: 14, nursesTotal: 14, waitTimeMinutes: 0, status: 'Elevated', utilizationRate: 91 },
      { id: 'radiology', name: 'Radiology & Imaging', activePatients: 15, capacity: 16, doctorsActive: 4, doctorsTotal: 4, nursesActive: 6, nursesTotal: 6, waitTimeMinutes: 32, status: 'Critical', utilizationRate: 94 },
      { id: 'surgery', name: 'Surgical Suites', activePatients: 11, capacity: 12, doctorsActive: 12, doctorsTotal: 12, nursesActive: 20, nursesTotal: 20, waitTimeMinutes: 0, status: 'Elevated', utilizationRate: 91 }
    ],
    resources: [
      { id: 'res-1', name: 'Dr. Sarah Vance', role: 'Attending Physician', department: 'Emergency & Trauma', status: 'Active', shift: '07:00 - 15:00' },
      { id: 'res-2', name: 'Dr. Michael Chen', role: 'Attending Physician', department: 'Inpatient Wards', status: 'Available', shift: '08:00 - 16:00' },
      { id: 'res-3', name: 'Nurse Elena Rostova', role: 'Charge Nurse', department: 'Registration & Triage', status: 'Active', shift: '07:00 - 15:00' },
      { id: 'res-4', name: 'Nurse David Kim', role: 'Triage Nurse', department: 'Registration & Triage', status: 'Available', shift: '08:00 - 16:00' },
      { id: 'res-5', name: 'Dr. Amara Patel', role: 'Attending Physician', department: 'Intensive Care Unit (ICU)', status: 'Active', shift: '07:00 - 19:00' },
      { id: 'res-6', name: 'Tech Mark Walsh', role: 'Radiology Tech', department: 'Radiology & Imaging', status: 'Active', shift: '07:00 - 15:00' }
    ],
    timeline: [
      { id: 't-1', time: '09:14', title: 'Trauma Code Level 2 Dispatched', description: 'City EMS alerted dispatch of multiple casualty accident inbound.', type: 'surge', severity: 'warning' },
      { id: 't-2', time: '09:05', title: 'Registration Queue Threshold Exceeded', description: 'Active waiting room count passed 50 patient mark.', type: 'system', severity: 'warning' },
      { id: 't-3', time: '08:45', title: 'Radiology CT Scanner 2 Prioritized', description: 'All elective outpatient scans paused for emergency trauma protocols.', type: 'recommendation', severity: 'info' }
    ],
    forecasts: [
      { time: '08:00', currentActual: 104, predictedArrivals: 108, queuePressure: 45, capacityThreshold: 160 },
      { time: '09:00', currentActual: 142, predictedArrivals: 144, queuePressure: 76, capacityThreshold: 160 },
      { time: '10:00', predictedArrivals: 168, queuePressure: 88, capacityThreshold: 160 },
      { time: '11:00', predictedArrivals: 154, queuePressure: 82, capacityThreshold: 160 },
      { time: '12:00', predictedArrivals: 136, queuePressure: 71, capacityThreshold: 160 },
      { time: '13:00', predictedArrivals: 122, queuePressure: 59, capacityThreshold: 160 },
      { time: '14:00', predictedArrivals: 110, queuePressure: 50, capacityThreshold: 160 }
    ]
  },
  'flu-outbreak': {
    name: 'Flu Outbreak & Staff Deficit',
    badge: 'Seasonal Epidemiological Surge',
    description: 'Regional viral respiratory spike coinciding with 12% unplanned nursing staff call-outs.',
    kpis: {
      patientArrivals: { value: 156, unit: '/hr', trend: '↑ 19%', trendDirection: 'up' },
      patientsWaiting: { value: 72, unit: 'pts', trend: '↑ 28%', trendDirection: 'up' },
      averageWaitTime: { value: 48, unit: 'min', trend: '↑ 14 min', trendDirection: 'up' },
      queuePressure: { value: 84, unit: '/100', status: 'Critical' },
      resourceUtilization: { value: 92, unit: '%', trend: '↑ 6%', trendDirection: 'up' },
      hospitalStress: { score: 79, max: 100, level: 'HIGH', color: '#EF4444' }
    },
    earlyWarning: {
      title: 'Pediatric & Geriatric Bed Exhaustion',
      timeWindow: '30 min',
      predictedQueuePressure: 89,
      predictedWaitTime: 56,
      confidence: 89,
      dataQuality: 'High',
      description: 'Isolation rooms at 96% saturation. Inpatient respiratory holding zone required within 45 min.'
    },
    bottleneck: {
      department: 'Inpatient Wards',
      severity: 'CRITICAL',
      why: 'Negative-pressure isolation rooms filled; acute beds blocked awaiting lab antigen PCR confirmation.',
      impact: 'Emergency room boarding delay average exceeds 110 minutes.',
      crossImpact: 'Ambulance diversion status impending if 4 beds not cleared.'
    },
    recommendations: [
      {
        id: 'rec-flu-1',
        title: 'Activate Rapid Respiratory Antigen Triage Protocol',
        category: 'Triage Rebalance',
        description: 'Deploy point-of-care rapid testing in external tent to divert low-acuity viral patients from main ED.',
        expectedImpact: { waitTimeDelta: '↓ 32%', queuePressureDelta: '↓ 22%', stressDelta: '↓ 18%' },
        riskIfIgnored: 'Lobby cross-infection risk escalates and non-respiratory wait times reach 85 minutes.',
        explainability: 'Diversion of Level 4/5 flu presentations frees up 38% of physical lobby chairs.',
        targetDepartment: 'Registration & Triage',
        applied: false
      },
      {
        id: 'rec-flu-2',
        title: 'Authorize Float Nurse Overtime Shift Incentive',
        category: 'Staff Allocation',
        description: 'Call in 6 float-pool registered nurses to cover morning sick calls across 4A and 4B.',
        expectedImpact: { waitTimeDelta: '↓ 18%', queuePressureDelta: '↓ 15%', stressDelta: '↓ 12%' },
        riskIfIgnored: 'Nurse-to-patient ratio deteriorates to 1:6 violating state mandates.',
        explainability: 'Restores nurse staffing to compliance threshold within 40 minutes.',
        targetDepartment: 'Inpatient Wards',
        applied: false
      }
    ],
    departments: [
      { id: 'ed', name: 'Emergency & Trauma', activePatients: 44, capacity: 45, doctorsActive: 9, doctorsTotal: 10, nursesActive: 14, nursesTotal: 18, waitTimeMinutes: 48, status: 'Critical', utilizationRate: 98 },
      { id: 'triage', name: 'Registration & Triage', activePatients: 25, capacity: 25, doctorsActive: 3, doctorsTotal: 4, nursesActive: 4, nursesTotal: 6, waitTimeMinutes: 38, status: 'Critical', utilizationRate: 100 },
      { id: 'inpatient', name: 'Inpatient Wards', activePatients: 352, capacity: 360, doctorsActive: 22, doctorsTotal: 24, nursesActive: 46, nursesTotal: 58, waitTimeMinutes: 0, status: 'Critical', utilizationRate: 98 },
      { id: 'icu', name: 'Intensive Care Unit (ICU)', activePatients: 35, capacity: 36, doctorsActive: 6, doctorsTotal: 6, nursesActive: 13, nursesTotal: 14, waitTimeMinutes: 0, status: 'Critical', utilizationRate: 97 },
      { id: 'radiology', name: 'Radiology & Imaging', activePatients: 14, capacity: 16, doctorsActive: 4, doctorsTotal: 4, nursesActive: 5, nursesTotal: 6, waitTimeMinutes: 24, status: 'Elevated', utilizationRate: 88 },
      { id: 'surgery', name: 'Surgical Suites', activePatients: 9, capacity: 12, doctorsActive: 10, doctorsTotal: 12, nursesActive: 17, nursesTotal: 20, waitTimeMinutes: 0, status: 'Normal', utilizationRate: 75 }
    ],
    resources: [
      { id: 'res-1', name: 'Dr. Sarah Vance', role: 'Attending Physician', department: 'Emergency & Trauma', status: 'Active', shift: '07:00 - 15:00' },
      { id: 'res-2', name: 'Dr. Michael Chen', role: 'Attending Physician', department: 'Inpatient Wards', status: 'Active', shift: '08:00 - 16:00' },
      { id: 'res-3', name: 'Nurse Elena Rostova', role: 'Charge Nurse', department: 'Registration & Triage', status: 'Active', shift: '07:00 - 15:00' },
      { id: 'res-4', name: 'Nurse David Kim', role: 'Triage Nurse', department: 'Registration & Triage', status: 'Active', shift: '08:00 - 16:00' },
      { id: 'res-5', name: 'Dr. Amara Patel', role: 'Attending Physician', department: 'Intensive Care Unit (ICU)', status: 'Active', shift: '07:00 - 19:00' },
      { id: 'res-6', name: 'Tech Mark Walsh', role: 'Radiology Tech', department: 'Radiology & Imaging', status: 'Active', shift: '07:00 - 15:00' }
    ],
    timeline: [
      { id: 't-1', time: '07:15', title: 'Flu Surge Advisory Phase 2', description: 'Epidemiology monitor escalated regional viral index to Level Orange.', type: 'surge', severity: 'warning' },
      { id: 't-2', time: '06:45', title: 'Float Pool Recall Initiated', description: 'Automated SMS sent to off-duty RN registry for emergency surge cover.', type: 'staff', severity: 'warning' }
    ],
    forecasts: [
      { time: '08:00', currentActual: 130, predictedArrivals: 132, queuePressure: 68, capacityThreshold: 160 },
      { time: '09:00', currentActual: 156, predictedArrivals: 160, queuePressure: 84, capacityThreshold: 160 },
      { time: '10:00', predictedArrivals: 178, queuePressure: 92, capacityThreshold: 160 },
      { time: '11:00', predictedArrivals: 185, queuePressure: 95, capacityThreshold: 160 },
      { time: '12:00', predictedArrivals: 172, queuePressure: 90, capacityThreshold: 160 },
      { time: '13:00', predictedArrivals: 158, queuePressure: 82, capacityThreshold: 160 },
      { time: '14:00', predictedArrivals: 140, queuePressure: 74, capacityThreshold: 160 }
    ]
  },
  'shift-handover': {
    name: 'Evening Shift Handover',
    badge: 'Operational Transition',
    description: 'Afternoon to evening clinical shift changeover with transient documentation latency.',
    kpis: {
      patientArrivals: { value: 128, unit: '/hr', trend: '↑ 4%', trendDirection: 'up' },
      patientsWaiting: { value: 44, unit: 'pts', trend: '↑ 6%', trendDirection: 'up' },
      averageWaitTime: { value: 29, unit: 'min', trend: '↑ 4 min', trendDirection: 'up' },
      queuePressure: { value: 62, unit: '/100', status: 'Moderate' },
      resourceUtilization: { value: 81, unit: '%', trend: 'Stable', trendDirection: 'neutral' },
      hospitalStress: { score: 52, max: 100, level: 'MODERATE', color: '#F59E0B' }
    },
    earlyWarning: {
      title: 'Discharge Order Processing Slowdown',
      timeWindow: '50 min',
      predictedQueuePressure: 68,
      predictedWaitTime: 32,
      confidence: 91,
      dataQuality: 'High',
      description: 'Handoff sign-outs causing 15-minute administrative pause on pharmacy and transport dispatches.'
    },
    bottleneck: {
      department: 'Pharmacy & Transport',
      severity: 'MEDIUM',
      why: 'Discharge medication verifications clustering during physician shift sign-out.',
      impact: 'Beds occupied by discharged patients waiting for take-home prescription counseling.',
      crossImpact: 'Delays inpatient bed assignment for emergency department admissions.'
    },
    recommendations: [
      {
        id: 'rec-hand-1',
        title: 'Stagger Nurse Handover in 15-Minute Pods',
        category: 'Staff Allocation',
        description: 'Implement asynchronous pod-based handovers to maintain active floor bedside coverage during 15:00 shift change.',
        expectedImpact: { waitTimeDelta: '↓ 15%', queuePressureDelta: '↓ 11%', stressDelta: '↓ 9%' },
        riskIfIgnored: 'Call-bell response times spike to 8.5 minutes during sign-out block.',
        explainability: 'Ensures 50% floor presence continuously rather than simultaneous unit-wide lock.',
        targetDepartment: 'Inpatient Wards',
        applied: false
      }
    ],
    departments: [
      { id: 'ed', name: 'Emergency & Trauma', activePatients: 32, capacity: 45, doctorsActive: 8, doctorsTotal: 10, nursesActive: 16, nursesTotal: 18, waitTimeMinutes: 29, status: 'Elevated', utilizationRate: 71 },
      { id: 'triage', name: 'Registration & Triage', activePatients: 18, capacity: 25, doctorsActive: 3, doctorsTotal: 4, nursesActive: 5, nursesTotal: 6, waitTimeMinutes: 19, status: 'Normal', utilizationRate: 72 },
      { id: 'inpatient', name: 'Inpatient Wards', activePatients: 318, capacity: 360, doctorsActive: 21, doctorsTotal: 24, nursesActive: 52, nursesTotal: 58, waitTimeMinutes: 0, status: 'Elevated', utilizationRate: 88 },
      { id: 'icu', name: 'Intensive Care Unit (ICU)', activePatients: 30, capacity: 36, doctorsActive: 6, doctorsTotal: 6, nursesActive: 14, nursesTotal: 14, waitTimeMinutes: 0, status: 'Normal', utilizationRate: 83 },
      { id: 'radiology', name: 'Radiology & Imaging', activePatients: 11, capacity: 16, doctorsActive: 4, doctorsTotal: 4, nursesActive: 6, nursesTotal: 6, waitTimeMinutes: 18, status: 'Normal', utilizationRate: 69 },
      { id: 'surgery', name: 'Surgical Suites', activePatients: 9, capacity: 12, doctorsActive: 11, doctorsTotal: 12, nursesActive: 18, nursesTotal: 20, waitTimeMinutes: 0, status: 'Normal', utilizationRate: 75 }
    ],
    resources: [
      { id: 'res-1', name: 'Dr. Sarah Vance', role: 'Attending Physician', department: 'Emergency & Trauma', status: 'Active', shift: '15:00 - 23:00' },
      { id: 'res-2', name: 'Dr. Michael Chen', role: 'Attending Physician', department: 'Inpatient Wards', status: 'Available', shift: '15:00 - 23:00' },
      { id: 'res-3', name: 'Nurse Elena Rostova', role: 'Charge Nurse', department: 'Registration & Triage', status: 'Active', shift: '15:00 - 23:00' },
      { id: 'res-4', name: 'Nurse David Kim', role: 'Triage Nurse', department: 'Registration & Triage', status: 'Active', shift: '15:00 - 23:00' },
      { id: 'res-5', name: 'Dr. Amara Patel', role: 'Attending Physician', department: 'Intensive Care Unit (ICU)', status: 'Active', shift: '15:00 - 23:00' },
      { id: 'res-6', name: 'Tech Mark Walsh', role: 'Radiology Tech', department: 'Radiology & Imaging', status: 'Active', shift: '15:00 - 23:00' }
    ],
    timeline: [
      { id: 't-1', time: '14:45', title: 'Shift Handover Briefing Initiated', description: 'Outgoing charge nurses conducting bedside patient status transition.', type: 'staff', severity: 'info' }
    ],
    forecasts: [
      { time: '14:00', currentActual: 124, predictedArrivals: 126, queuePressure: 58, capacityThreshold: 160 },
      { time: '15:00', currentActual: 128, predictedArrivals: 130, queuePressure: 62, capacityThreshold: 160 },
      { time: '16:00', predictedArrivals: 142, queuePressure: 69, capacityThreshold: 160 },
      { time: '17:00', predictedArrivals: 148, queuePressure: 74, capacityThreshold: 160 },
      { time: '18:00', predictedArrivals: 152, queuePressure: 77, capacityThreshold: 160 },
      { time: '19:00', predictedArrivals: 138, queuePressure: 68, capacityThreshold: 160 },
      { time: '20:00', predictedArrivals: 118, queuePressure: 56, capacityThreshold: 160 }
    ]
  }
};
