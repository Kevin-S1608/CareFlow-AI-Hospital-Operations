import React, { useState } from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Sparkles,
  AlertTriangle,
  Play,
  CheckCircle,
  ShieldAlert,
  Sliders,
  ChevronRight,
  TrendingDown,
  Info
} from 'lucide-react';
import {
  KpiData,
  EarlyWarningData,
  BottleneckData,
  RecommendationAction,
  ForecastPoint,
  NavigationTab
} from '../types';
import { ForecastCharts } from './Charts';

interface OverviewProps {
  kpis: KpiData;
  earlyWarning: EarlyWarningData;
  bottleneck: BottleneckData;
  primaryRecommendation: RecommendationAction;
  forecasts: ForecastPoint[];
  onApplyRecommendation: (id: string) => void;
  onSimulateRecommendation: (rec: RecommendationAction) => void;
  onNavigateTab: (tab: NavigationTab) => void;
}

export const Overview: React.FC<OverviewProps> = ({
  kpis,
  earlyWarning,
  bottleneck,
  primaryRecommendation,
  forecasts,
  onApplyRecommendation,
  onSimulateRecommendation,
  onNavigateTab
}) => {
  const [appliedNotice, setAppliedNotice] = useState(false);

  const handleApply = () => {
    onApplyRecommendation(primaryRecommendation.id);
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 4000);
  };

  // Color mapping helper for stress level
  const getStressLevelBadge = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'HIGH':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'MODERATE':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    }
  };

  return (
    <div className="space-y-7 pb-12">
      {/* Top Page Heading & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#252336] tracking-tight leading-tight">
            Hospital Operations Overview
          </h1>
          <p className="text-sm text-[#6B6878] mt-1 font-normal">
            Real-time operational intelligence, predictive risk, and AI-powered recommendations.
          </p>
        </div>

        {appliedNotice && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 animate-in fade-in slide-in-from-top-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Recommendation applied. Reallocating clinical staff now.</span>
          </div>
        )}
      </div>

      {/* ==================================================
          SECTION 1 — KPI STRIP (EXACTLY 6 KPI CARDS)
          Fits naturally in one row on desktop (~160-180px each)
          ================================================== */}
      <section aria-label="Key Performance Indicators">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {/* 1. Patient Arrivals */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-[#8E8A9E] tracking-wider uppercase">
              Patient Arrivals
            </span>
            <div className="my-2.5">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-[#252336] font-mono tabular-nums">
                  {kpis.patientArrivals.value}
                </span>
                <span className="text-xs font-medium text-[#6B6878]">
                  {kpis.patientArrivals.unit}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-rose-600">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{kpis.patientArrivals.trend}</span>
            </div>
          </div>

          {/* 2. Patients Waiting */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-[#8E8A9E] tracking-wider uppercase">
              Patients Waiting
            </span>
            <div className="my-2.5">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-[#252336] font-mono tabular-nums">
                  {kpis.patientsWaiting.value}
                </span>
                <span className="text-xs font-medium text-[#6B6878]">
                  {kpis.patientsWaiting.unit}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-rose-600">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{kpis.patientsWaiting.trend}</span>
            </div>
          </div>

          {/* 3. Average Wait Time */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-[#8E8A9E] tracking-wider uppercase">
              Average Wait Time
            </span>
            <div className="my-2.5">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-[#252336] font-mono tabular-nums">
                  {kpis.averageWaitTime.value}
                </span>
                <span className="text-xs font-medium text-[#6B6878]">
                  {kpis.averageWaitTime.unit}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-rose-600">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{kpis.averageWaitTime.trend}</span>
            </div>
          </div>

          {/* 4. Queue Pressure */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-[#8E8A9E] tracking-wider uppercase">
              Queue Pressure
            </span>
            <div className="my-2.5">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-[#252336] font-mono tabular-nums">
                  {kpis.queuePressure.value}
                </span>
                <span className="text-xs font-medium text-[#6B6878]">
                  {kpis.queuePressure.unit}
                </span>
              </div>
            </div>
            <div className="text-xs font-semibold text-amber-600">
              <span>{kpis.queuePressure.status}</span>
            </div>
          </div>

          {/* 5. Resource Utilization */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-[#8E8A9E] tracking-wider uppercase">
              Resource Utilization
            </span>
            <div className="my-2.5">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-[#252336] font-mono tabular-nums">
                  {kpis.resourceUtilization.value}
                </span>
                <span className="text-xs font-medium text-[#6B6878]">
                  {kpis.resourceUtilization.unit}
                </span>
              </div>
            </div>
            <div className="text-xs font-semibold text-slate-600">
              <span>{kpis.resourceUtilization.trend}</span>
            </div>
          </div>

          {/* 6. Hospital Stress */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-[#8E8A9E] tracking-wider uppercase">
              Hospital Stress
            </span>
            <div className="my-2.5">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-amber-600 font-mono tabular-nums">
                  {kpis.hospitalStress.score}
                </span>
                <span className="text-xs font-medium text-[#6B6878]">
                  /{kpis.hospitalStress.max}
                </span>
              </div>
            </div>
            <div className="text-xs font-bold text-amber-600">
              <span>{kpis.hospitalStress.level}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 2 — THE MOST IMPORTANT INFORMATION
          Two-column layout (55% / 45%)
          Hospital Operational Health & AI Early Warning
          ================================================== */}
      <section aria-label="Operational Health and Early Warning">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT: Hospital Operational Health (approx 55% -> col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EDF6]">
                <h2 className="text-base font-semibold text-[#252336] tracking-tight">
                  Hospital Operational Health
                </h2>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${getStressLevelBadge(kpis.hospitalStress.level)}`}>
                  {kpis.hospitalStress.level}
                </span>
              </div>

              {/* Stress Gauge and Primary Metric */}
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-[#6B6878] uppercase tracking-wide">
                    Hospital Stress Score
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-4xl font-bold text-[#252336] font-mono tabular-nums">
                      {kpis.hospitalStress.score}
                    </span>
                    <span className="text-sm font-medium text-[#6B6878]">
                      / 100
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-amber-600">
                    Operating in High Stress Band
                  </span>
                  <p className="text-[11px] text-[#6B6878] mt-0.5">
                    Threshold limit: 75 / 100
                  </p>
                </div>
              </div>

              {/* Progress gauge bar */}
              <div className="mt-4">
                <div className="h-2.5 w-full bg-[#F3F0F9] rounded-full overflow-hidden flex">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${kpis.hospitalStress.score}%`,
                      backgroundColor: kpis.hospitalStress.score > 75 ? '#EF4444' : '#F59E0B'
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#9E9AA9] font-mono mt-1">
                  <span>0 (Optimal)</span>
                  <span>40 (Nominal)</span>
                  <span>60 (Elevated)</span>
                  <span>80 (Critical)</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            {/* Below it: Compact three-metric bar */}
            <div className="mt-6 pt-4 border-t border-[#F0EDF6] grid grid-cols-3 gap-4">
              <div>
                <span className="text-[11px] font-medium text-[#6B6878] block">
                  Queue Pressure
                </span>
                <span className="text-base font-bold text-[#252336] font-mono tabular-nums">
                  {kpis.queuePressure.value}%
                </span>
              </div>
              <div>
                <span className="text-[11px] font-medium text-[#6B6878] block">
                  Resource Utilization
                </span>
                <span className="text-base font-bold text-[#252336] font-mono tabular-nums">
                  {kpis.resourceUtilization.value}%
                </span>
              </div>
              <div>
                <span className="text-[11px] font-medium text-[#6B6878] block">
                  Waiting Load
                </span>
                <span className="text-base font-bold text-[#252336] font-mono tabular-nums">
                  {kpis.patientsWaiting.value} pts <span className="text-xs font-normal text-[#6B6878]">/ cap 65</span>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: AI Early Warning (approx 45% -> col-span-5) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EDF6]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="text-base font-semibold text-[#252336] tracking-tight">
                    AI Early Warning
                  </h2>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-[#7C3AED] border border-purple-200">
                  in {earlyWarning.timeWindow}
                </span>
              </div>

              {/* Warning Headline */}
              <div className="mt-4">
                <span className="text-xs font-semibold text-[#7C3AED] uppercase tracking-wide">
                  Emerging Condition
                </span>
                <h3 className="text-xl font-bold text-[#252336] mt-0.5 tracking-tight">
                  {earlyWarning.title}
                </h3>
                <p className="text-xs text-[#6B6878] mt-1 line-clamp-2">
                  {earlyWarning.description}
                </p>
              </div>

              {/* Key Projected Metrics Grid */}
              <div className="mt-5 grid grid-cols-2 gap-3.5">
                <div className="p-3 bg-[#F7F5FA] rounded-xl border border-[#EDE9FE]">
                  <span className="text-[11px] text-[#6B6878] font-medium block">
                    Predicted Queue Pressure
                  </span>
                  <span className="text-xl font-bold text-[#252336] font-mono tabular-nums">
                    {earlyWarning.predictedQueuePressure} <span className="text-xs font-normal text-[#6B6878]">/ 100</span>
                  </span>
                </div>

                <div className="p-3 bg-[#F7F5FA] rounded-xl border border-[#EDE9FE]">
                  <span className="text-[11px] text-[#6B6878] font-medium block">
                    Predicted Waiting Time
                  </span>
                  <span className="text-xl font-bold text-[#252336] font-mono tabular-nums">
                    {earlyWarning.predictedWaitTime} <span className="text-xs font-normal text-[#6B6878]">min</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Model Metadata footer */}
            <div className="mt-5 pt-3.5 border-t border-[#F0EDF6] flex items-center justify-between text-xs text-[#6B6878]">
              <div className="flex items-center gap-1.5">
                <span>Forecast Confidence:</span>
                <span className="font-semibold text-[#252336] font-mono">
                  {earlyWarning.confidence}%
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Data Quality:</span>
                <span className="font-semibold text-emerald-700">
                  {earlyWarning.dataQuality}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3 — CURRENT BOTTLENECK + AI ACTION
          Two-column layout (50% / 50%)
          Left: Current Bottleneck
          Right: AI Recommended Action with Simulate & Apply
          ================================================== */}
      <section aria-label="Bottleneck and Recommended Action">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* LEFT: Current Bottleneck */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EDF6]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="text-base font-semibold text-[#252336] tracking-tight">
                    Current Bottleneck
                  </h2>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                  {bottleneck.severity}
                </span>
              </div>

              {/* Department Name */}
              <div className="mt-4">
                <span className="text-xs font-medium text-[#6B6878] uppercase tracking-wide">
                  Constrained Unit
                </span>
                <h3 className="text-xl font-bold text-[#252336] mt-0.5 tracking-tight">
                  {bottleneck.department}
                </h3>
              </div>

              {/* Root Cause (Why?) */}
              <div className="mt-4 space-y-2.5">
                <div className="p-3 bg-[#FAF8FC] rounded-xl border border-[#F0EDF6]">
                  <span className="text-[11px] font-semibold text-[#7C3AED] uppercase tracking-wider block">
                    Root Cause
                  </span>
                  <p className="text-xs text-[#252336] font-medium mt-0.5">
                    {bottleneck.why}
                  </p>
                </div>

                <div className="p-3 bg-[#FAF8FC] rounded-xl border border-[#F0EDF6]">
                  <span className="text-[11px] font-semibold text-[#6B6878] uppercase tracking-wider block">
                    Downstream Impact
                  </span>
                  <p className="text-xs text-[#4A475B] mt-0.5">
                    {bottleneck.impact} {bottleneck.crossImpact}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F0EDF6] flex justify-end">
              <button
                onClick={() => onNavigateTab('bottlenecks')}
                className="text-xs font-semibold text-[#7C3AED] hover:text-[#6D28D9] flex items-center gap-1 transition-colors"
              >
                <span>Full Bottleneck Analysis</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT: AI Recommended Action */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EDF6]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="text-base font-semibold text-[#252336] tracking-tight">
                    AI Recommended Action
                  </h2>
                </div>
                <span className="text-xs font-medium text-[#7C3AED]">
                  Primary Decision Support
                </span>
              </div>

              {/* Proposed Action */}
              <div className="mt-4">
                <span className="text-xs font-medium text-[#6B6878] uppercase tracking-wide">
                  Suggested Intervention
                </span>
                <h3 className="text-xl font-bold text-[#252336] mt-0.5 tracking-tight">
                  {primaryRecommendation.title}
                </h3>
                <p className="text-xs text-[#6B6878] mt-1">
                  {primaryRecommendation.description}
                </p>
              </div>

              {/* Expected Impact Badges */}
              <div className="mt-5">
                <span className="text-[11px] font-semibold text-[#6B6878] uppercase tracking-wider block mb-2">
                  Expected Impact
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
                    <span className="text-[11px] text-emerald-800 font-medium block">
                      Waiting Time
                    </span>
                    <span className="text-lg font-bold text-emerald-700 font-mono">
                      {primaryRecommendation.expectedImpact.waitTimeDelta}
                    </span>
                  </div>

                  <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
                    <span className="text-[11px] text-emerald-800 font-medium block">
                      Queue Pressure
                    </span>
                    <span className="text-lg font-bold text-emerald-700 font-mono">
                      {primaryRecommendation.expectedImpact.queuePressureDelta}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Simulate and Apply */}
            <div className="mt-6 pt-4 border-t border-[#F0EDF6] flex items-center justify-between gap-3">
              <span className="text-[11px] text-[#8E8A9E]">
                {primaryRecommendation.applied ? 'Status: Active on floor' : 'Ready for authorization'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSimulateRecommendation(primaryRecommendation)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#F7F5FA] hover:bg-[#EFEBF6] border border-[#E5E7EB] text-[#252336] transition-colors flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#8B7CF6]" />
                  <span>Simulate</span>
                </button>

                <button
                  onClick={handleApply}
                  disabled={primaryRecommendation.applied}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    primaryRecommendation.applied
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-[#8B7CF6] hover:bg-[#7C3AED] text-white shadow-xs'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{primaryRecommendation.applied ? 'Applied' : 'Apply'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 4 — SMALL ANALYTICS AREA
          Two large charts side-by-side:
          1. Patient Arrival Forecast
          2. Queue Pressure Forecast
          ================================================== */}
      <section aria-label="Forecast Analytics">
        <ForecastCharts data={forecasts} />
      </section>
    </div>
  );
};
