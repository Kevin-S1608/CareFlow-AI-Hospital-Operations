/**
 * CareFlow AI - Hospital Operations Command Center Types
 */

export type NavigationTab = 
  | 'overview'
  | 'predictions'
  | 'departments'
  | 'resources'
  | 'bottlenecks'
  | 'recommendations'
  | 'simulation'
  | 'digital-twin'
  | 'emergency'
  | 'copilot'
  | 'timeline';

export type ScenarioId = 'normal' | 'trauma-surge' | 'flu-outbreak' | 'shift-handover';

export interface HospitalInfo {
  id: string;
  name: string;
  type: string;
  totalBeds: number;
  status: 'Normal' | 'Elevated' | 'High Stress' | 'Surge Critical';
}

export interface KpiData {
  patientArrivals: {
    value: number;
    unit: string;
    trend: string;
    trendDirection: 'up' | 'down' | 'neutral';
  };
  patientsWaiting: {
    value: number;
    unit: string;
    trend: string;
    trendDirection: 'up' | 'down' | 'neutral';
  };
  averageWaitTime: {
    value: number;
    unit: string;
    trend: string;
    trendDirection: 'up' | 'down' | 'neutral';
  };
  queuePressure: {
    value: number;
    unit: string;
    status: 'Nominal' | 'Moderate' | 'Elevated' | 'Critical';
  };
  resourceUtilization: {
    value: number;
    unit: string;
    trend: string;
    trendDirection: 'up' | 'down' | 'neutral';
  };
  hospitalStress: {
    score: number;
    max: number;
    level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
    color: string;
  };
}

export interface EarlyWarningData {
  title: string;
  timeWindow: string;
  predictedQueuePressure: number;
  predictedWaitTime: number;
  confidence: number;
  dataQuality: 'High' | 'Moderate' | 'Sensor Calibrating';
  description: string;
}

export interface BottleneckData {
  department: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  why: string;
  impact: string;
  crossImpact: string;
}

export interface RecommendationAction {
  id: string;
  title: string;
  category: 'Staff Allocation' | 'Capacity Expansion' | 'Discharge Protocol' | 'Triage Rebalance';
  description: string;
  expectedImpact: {
    waitTimeDelta: string;
    queuePressureDelta: string;
    stressDelta: string;
  };
  riskIfIgnored: string;
  explainability: string;
  targetDepartment: string;
  applied: boolean;
}

export interface DepartmentData {
  id: string;
  name: string;
  activePatients: number;
  capacity: number;
  doctorsActive: number;
  doctorsTotal: number;
  nursesActive: number;
  nursesTotal: number;
  waitTimeMinutes: number;
  status: 'Normal' | 'Elevated' | 'Critical';
  utilizationRate: number;
}

export interface ResourceItem {
  id: string;
  name: string;
  role: 'Attending Physician' | 'Triage Nurse' | 'Charge Nurse' | 'Radiology Tech';
  department: string;
  status: 'Active' | 'Available' | 'On Break' | 'Reallocated';
  shift: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'surge' | 'recommendation' | 'staff' | 'system' | 'resolution';
  severity: 'info' | 'warning' | 'success' | 'danger';
}

export interface ForecastPoint {
  time: string;
  currentActual?: number;
  predictedArrivals: number;
  queuePressure: number;
  capacityThreshold: number;
}
