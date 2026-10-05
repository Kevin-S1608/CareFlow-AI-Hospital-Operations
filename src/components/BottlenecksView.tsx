import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  GitBranch,
  Activity,
  Layers
} from 'lucide-react';
import { BottleneckData } from '../types';

interface BottlenecksViewProps {
  bottleneck: BottleneckData;
  onNavigateRecommendations: () => void;
}

export const BottlenecksView: React.FC<BottlenecksViewProps> = ({
  bottleneck,
  onNavigateRecommendations
}) => {
  return (
    <div className="space-y-7 pb-12">
      {/* View Header */}
      <div>
        <h1 className="text-[28px] font-bold text-[#252336] tracking-tight leading-tight">
          Operational Bottlenecks & Root Cause Analysis
        </h1>
        <p className="text-sm text-[#6B6878] mt-1 font-normal">
          Algorithmic identification of acute hospital choke points, propagation vectors, and cross-wing delays.
        </p>
      </div>

      {/* Primary Bottleneck Diagnostic Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0EDF6]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#252336]">
                Primary Constraint: {bottleneck.department}
              </h2>
              <p className="text-xs text-[#6B6878]">
                Severity index: <span className="font-bold text-rose-600 font-mono">{bottleneck.severity}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateRecommendations}
            className="px-3 py-1.5 rounded-lg bg-[#8B7CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold shadow-2xs transition-colors"
          >
            Review Recommended Fix
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 bg-[#FAF8FC] rounded-xl border border-[#F0EDF6]">
            <span className="text-[11px] font-semibold text-[#7C3AED] uppercase tracking-wider block">
              Direct Root Cause
            </span>
            <p className="text-sm text-[#252336] font-medium mt-1">
              {bottleneck.why}
            </p>
            <p className="text-xs text-[#6B6878] mt-2">
              Arrival throughput (142 pts/hr) exceeds registration desk baseline capacity (110 pts/hr) by +29%.
            </p>
          </div>

          <div className="p-4 bg-[#FAF8FC] rounded-xl border border-[#F0EDF6]">
            <span className="text-[11px] font-semibold text-[#6B6878] uppercase tracking-wider block">
              Downstream & Cross-Department Cascade
            </span>
            <p className="text-sm text-[#252336] font-medium mt-1">
              {bottleneck.impact}
            </p>
            <p className="text-xs text-[#6B6878] mt-2">
              {bottleneck.crossImpact} Triage waiting room capacity reaching 92% occupancy.
            </p>
          </div>
        </div>
      </div>

      {/* Cascading Impact Chain Flow */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs">
        <h2 className="text-base font-semibold text-[#252336] mb-1">
          Downstream Impact Chain
        </h2>
        <p className="text-xs text-[#6B6878] mb-6">
          Step-by-step propagation of delays across the patient continuum if unaddressed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200">
            <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
              Stage 1 · Origin
            </span>
            <h3 className="text-sm font-bold text-rose-900 mt-1">
              Registration Choke
            </h3>
            <p className="text-xs text-rose-800 mt-1">
              58 patients backed up in reception lobby. Average intake duration: 6.8 min/patient.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
              Stage 2 · +15 min
            </span>
            <h3 className="text-sm font-bold text-amber-900 mt-1">
              Triage Assessment Lag
            </h3>
            <p className="text-xs text-amber-800 mt-1">
              Nurse acuity triage delayed. Ambulatory walk-ins compete with incoming emergency bays.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200">
            <span className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-wider block">
              Stage 3 · +35 min
            </span>
            <h3 className="text-sm font-bold text-purple-900 mt-1">
              Emergency Bay Starvation
            </h3>
            <p className="text-xs text-purple-800 mt-1">
              Physicians idle between complex trauma admissions while chart registration is pending.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
              Stage 4 · +60 min
            </span>
            <h3 className="text-sm font-bold text-slate-900 mt-1">
              Ambulance Diversion
            </h3>
            <p className="text-xs text-slate-700 mt-1">
              External ramp offload time breaches 30-minute state ceiling, forcing municipal rerouting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
