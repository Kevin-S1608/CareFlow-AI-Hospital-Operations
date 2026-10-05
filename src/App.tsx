import React, { useState } from 'react';
import {
  NavigationTab,
  ScenarioId,
  HospitalInfo,
  RecommendationAction,
  KpiData,
  TimelineEvent
} from './types';
import { HOSPITALS, SCENARIO_DATA } from './data/hospitalData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Overview } from './components/Overview';
import { PredictionsView } from './components/PredictionsView';
import { DepartmentsView } from './components/DepartmentsView';
import { ResourcesView } from './components/ResourcesView';
import { BottlenecksView } from './components/BottlenecksView';
import { RecommendationsView } from './components/RecommendationsView';
import { SimulationLabView } from './components/SimulationLabView';
import { DigitalTwinView } from './components/DigitalTwinView';
import { EmergencyModeView } from './components/EmergencyModeView';
import { CopilotView } from './components/CopilotView';
import { TimelineView } from './components/TimelineView';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [selectedHospital, setSelectedHospital] = useState<HospitalInfo>(HOSPITALS[0]);
  const [selectedScenarioId, setSelectedScenarioId] = useState<ScenarioId>('trauma-surge');
  const [surgeMode, setSurgeMode] = useState<boolean>(false);
  const [activeSimulationRec, setActiveSimulationRec] = useState<RecommendationAction | null>(null);

  // Active scenario dataset
  const activeScenario = SCENARIO_DATA[selectedScenarioId];

  // Dynamic state allowing applied recommendations to mutate live KPIs & timeline
  const [appliedRecommendations, setAppliedRecommendations] = useState<Record<string, boolean>>({});
  const [customKpis, setCustomKpis] = useState<KpiData | null>(null);
  const [extraTimelineEvents, setExtraTimelineEvents] = useState<TimelineEvent[]>([]);

  // Current effective KPIs
  const effectiveKpis: KpiData = customKpis || {
    ...activeScenario.kpis,
    hospitalStress: surgeMode
      ? {
          score: Math.min(95, activeScenario.kpis.hospitalStress.score + 15),
          max: 100,
          level: 'CRITICAL',
          color: '#EF4444'
        }
      : activeScenario.kpis.hospitalStress
  };

  // Recommendations with applied state merged
  const effectiveRecommendations: RecommendationAction[] = activeScenario.recommendations.map((r) => ({
    ...r,
    applied: !!appliedRecommendations[r.id]
  }));

  // Timeline with added events merged
  const effectiveTimeline: TimelineEvent[] = [
    ...extraTimelineEvents,
    ...activeScenario.timeline
  ];

  // Handler for Applying an AI Recommendation
  const handleApplyRecommendation = (recId: string) => {
    setAppliedRecommendations((prev) => ({ ...prev, [recId]: true }));

    // Dynamically update operational health metrics
    const currentWait = effectiveKpis.averageWaitTime.value;
    const currentQueue = effectiveKpis.queuePressure.value;
    const currentStress = effectiveKpis.hospitalStress.score;

    setCustomKpis({
      ...effectiveKpis,
      averageWaitTime: {
        ...effectiveKpis.averageWaitTime,
        value: Math.max(14, Math.round(currentWait * 0.76)),
        trend: '↓ 24%',
        trendDirection: 'down'
      },
      queuePressure: {
        ...effectiveKpis.queuePressure,
        value: Math.max(25, Math.round(currentQueue * 0.83)),
        status: 'Moderate'
      },
      hospitalStress: {
        ...effectiveKpis.hospitalStress,
        score: Math.max(28, currentStress - 14),
        level: currentStress - 14 > 60 ? 'HIGH' : 'MODERATE'
      }
    });

    // Append to timeline log
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const targetRec = activeScenario.recommendations.find((r) => r.id === recId);
    setExtraTimelineEvents((prev) => [
      {
        id: `applied-${Date.now()}`,
        time: nowTime,
        title: `Protocol Executed: ${targetRec ? targetRec.title : 'Staff Rebalance'}`,
        description: `Clinical directive deployed. Projected wait-time reduction (-24%) active across triage.`,
        type: 'recommendation',
        severity: 'success'
      },
      ...prev
    ]);
  };

  // Handler for Simulating an AI Recommendation in the Sandbox
  const handleSimulateRecommendation = (rec: RecommendationAction) => {
    setActiveSimulationRec(rec);
    setActiveTab('simulation');
  };

  // Handler for Applying Simulated Settings from Simulation Lab
  const handleApplySimulatedPlan = () => {
    const currentStress = effectiveKpis.hospitalStress.score;
    setCustomKpis({
      ...effectiveKpis,
      averageWaitTime: {
        ...effectiveKpis.averageWaitTime,
        value: Math.max(16, Math.round(effectiveKpis.averageWaitTime.value * 0.65)),
        trend: '↓ 35%',
        trendDirection: 'down'
      },
      queuePressure: {
        ...effectiveKpis.queuePressure,
        value: Math.max(22, Math.round(effectiveKpis.queuePressure.value * 0.76)),
        status: 'Nominal'
      },
      hospitalStress: {
        ...effectiveKpis.hospitalStress,
        score: Math.max(30, currentStress - 16),
        level: 'MODERATE'
      }
    });

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setExtraTimelineEvents((prev) => [
      {
        id: `sim-applied-${Date.now()}`,
        time: nowTime,
        title: 'Simulation Sandbox Parameters Authorized',
        description: 'Custom physician and float-nurse allocation applied across Emergency and Triage.',
        type: 'staff',
        severity: 'success'
      },
      ...prev
    ]);
  };

  // Handler for Surge Mode Toggle
  const handleToggleSurgeMode = () => {
    const nextSurge = !surgeMode;
    setSurgeMode(nextSurge);

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setExtraTimelineEvents((prev) => [
      {
        id: `surge-${Date.now()}`,
        time: nowTime,
        title: nextSurge ? 'Surge Protocol Level 2 ENGAGED' : 'Surge Protocol Disengaged',
        description: nextSurge
          ? 'Emergency triage bypass active. Offload diversion threshold raised.'
          : 'Normal operating continuum restored.',
        type: 'surge',
        severity: nextSurge ? 'danger' : 'info'
      },
      ...prev
    ]);
  };

  // Handler for Scenario Change
  const handleSelectScenario = (id: ScenarioId) => {
    setSelectedScenarioId(id);
    setCustomKpis(null);
    setAppliedRecommendations({});
  };

  return (
    <div className="flex min-h-screen bg-[#F7F5FA] text-[#252336] antialiased">
      {/* LEFT SIDEBAR: 220–240px wide, clean, non-squeezing */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        hospital={selectedHospital}
        surgeMode={surgeMode}
        recommendationCount={effectiveRecommendations.filter((r) => !r.applied).length}
      />

      {/* MAIN APPLICATION AREA */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* TOP HEADER: Single clean horizontal bar */}
        <Header
          selectedHospital={selectedHospital}
          onSelectHospital={setSelectedHospital}
          selectedScenario={selectedScenarioId}
          onSelectScenario={handleSelectScenario}
          surgeMode={surgeMode}
          onToggleSurgeMode={handleToggleSurgeMode}
          onOpenCopilot={() => setActiveTab('copilot')}
          onSelectTab={setActiveTab}
          alertsCount={effectiveRecommendations.filter((r) => !r.applied).length}
        />

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-1 px-8 py-7 max-w-[1400px] w-full mx-auto">
          {activeTab === 'overview' && (
            <Overview
              kpis={effectiveKpis}
              earlyWarning={activeScenario.earlyWarning}
              bottleneck={activeScenario.bottleneck}
              primaryRecommendation={effectiveRecommendations[0]}
              forecasts={activeScenario.forecasts}
              onApplyRecommendation={handleApplyRecommendation}
              onSimulateRecommendation={handleSimulateRecommendation}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'predictions' && (
            <PredictionsView
              forecasts={activeScenario.forecasts}
              earlyWarning={activeScenario.earlyWarning}
            />
          )}

          {activeTab === 'departments' && (
            <DepartmentsView departments={activeScenario.departments} />
          )}

          {activeTab === 'resources' && (
            <ResourcesView
              resources={activeScenario.resources}
              departments={activeScenario.departments}
              onReallocate={() => {
                const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                setExtraTimelineEvents((prev) => [
                  {
                    id: `staff-${Date.now()}`,
                    time: nowTime,
                    title: 'Clinician Reassignment Executed',
                    description: 'Float physician reassigned to frontline acute bay.',
                    type: 'staff',
                    severity: 'info'
                  },
                  ...prev
                ]);
              }}
            />
          )}

          {activeTab === 'bottlenecks' && (
            <BottlenecksView
              bottleneck={activeScenario.bottleneck}
              onNavigateRecommendations={() => setActiveTab('recommendations')}
            />
          )}

          {activeTab === 'recommendations' && (
            <RecommendationsView
              recommendations={effectiveRecommendations}
              onApplyRecommendation={handleApplyRecommendation}
              onSimulateRecommendation={handleSimulateRecommendation}
            />
          )}

          {activeTab === 'simulation' && (
            <SimulationLabView
              currentKpis={effectiveKpis}
              activeRecommendation={activeSimulationRec}
              onApplySimulatedPlan={handleApplySimulatedPlan}
            />
          )}

          {activeTab === 'digital-twin' && <DigitalTwinView />}

          {activeTab === 'emergency' && (
            <EmergencyModeView
              surgeMode={surgeMode}
              onToggleSurgeMode={handleToggleSurgeMode}
            />
          )}

          {activeTab === 'copilot' && (
            <CopilotView
              onNavigateTab={setActiveTab}
              onApplyRecommendation={() => handleApplyRecommendation(effectiveRecommendations[0].id)}
            />
          )}

          {activeTab === 'timeline' && (
            <TimelineView timeline={effectiveTimeline} />
          )}
        </main>
      </div>
    </div>
  );
}
