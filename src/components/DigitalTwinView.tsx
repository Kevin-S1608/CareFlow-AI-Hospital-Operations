import React, { useState } from 'react';
import {
  Network,
  Activity,
  ArrowRight,
  Clock,
  Users,
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

interface StageNode {
  id: string;
  name: string;
  category: string;
  currentQueue: number;
  capacity: number;
  avgDuration: string;
  flowRate: string; // e.g. "14 pts/hr"
  status: 'Nominal' | 'Elevated' | 'Choked';
}

const DEFAULT_STAGES: StageNode[] = [
  { id: 'arrival', name: 'Ambulance & Walk-in', category: 'Entry', currentQueue: 8, capacity: 20, avgDuration: '2.5 min', flowRate: '142 /hr', status: 'Nominal' },
  { id: 'reg', name: 'Intake Registration', category: 'Intake', currentQueue: 23, capacity: 25, avgDuration: '6.8 min', flowRate: '110 /hr', status: 'Choked' },
  { id: 'triage', name: 'Nurse Acuity Triage', category: 'Assessment', currentQueue: 14, capacity: 16, avgDuration: '5.2 min', flowRate: '124 /hr', status: 'Elevated' },
  { id: 'consult', name: 'Physician Consultation', category: 'Clinical', currentQueue: 32, capacity: 36, avgDuration: '18 min', flowRate: '118 /hr', status: 'Elevated' },
  { id: 'diagnostics', name: 'Imaging & Rapid Lab', category: 'Diagnostics', currentQueue: 11, capacity: 14, avgDuration: '24 min', flowRate: '45 /hr', status: 'Nominal' },
  { id: 'discharge', name: 'Inpatient Bed / Discharge', category: 'Outcome', currentQueue: 6, capacity: 15, avgDuration: '12 min', flowRate: '88 /hr', status: 'Nominal' },
];

export const DigitalTwinView: React.FC = () => {
  const [stages, setStages] = useState<StageNode[]>(DEFAULT_STAGES);
  const [selectedStage, setSelectedStage] = useState<StageNode>(DEFAULT_STAGES[1]); // Default registration

  const handleRefreshPulse = () => {
    setStages((prev) =>
      prev.map((s) => ({
        ...s,
        currentQueue: Math.max(2, s.currentQueue + Math.floor(Math.random() * 3) - 1)
      }))
    );
  };

  return (
    <div className="space-y-7 pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#252336] tracking-tight leading-tight">
            Digital Twin & Real-Time Patient Flow
          </h1>
          <p className="text-sm text-[#6B6878] mt-1 font-normal">
            Real-time discrete-event flow simulation tracing intake through consultation, diagnostics, and bed placement.
          </p>
        </div>

        <button
          onClick={handleRefreshPulse}
          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#F7F5FA] border border-[#E5E7EB] text-xs font-semibold text-[#252336] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#8B7CF6]" />
          <span>Synchronize Twin</span>
        </button>
      </div>

      {/* Visual Patient Flow Journey Pipeline */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#F0EDF6]">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-[#7C3AED]" />
            <h2 className="text-base font-semibold text-[#252336]">
              End-to-End Care Continuum Pipeline
            </h2>
          </div>
          <span className="text-xs text-[#6B6878]">
            Click any stage node to inspect local queue telemetry
          </span>
        </div>

        {/* Nodes horizontal stream */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 relative">
          {stages.map((stage, idx) => {
            const isSelected = selectedStage.id === stage.id;
            const isChoked = stage.status === 'Choked';
            const isElevated = stage.status === 'Elevated';
            const occupancyPct = Math.round((stage.currentQueue / stage.capacity) * 100);

            return (
              <div
                key={stage.id}
                onClick={() => setSelectedStage(stage)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#8B7CF6] bg-[#EDE9FE]/20 shadow-xs ring-1 ring-[#8B7CF6]'
                    : isChoked
                    ? 'border-rose-300 bg-rose-50/30 hover:border-rose-400'
                    : isElevated
                    ? 'border-amber-200 bg-amber-50/20 hover:border-amber-300'
                    : 'border-[#E5E7EB] bg-white hover:bg-[#FAF8FC]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#8E8A9E] mb-1 font-semibold uppercase">
                    <span>Stage 0{idx + 1}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isChoked
                          ? 'bg-rose-500 animate-ping'
                          : isElevated
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                  </div>

                  <h3 className="text-xs font-bold text-[#252336] leading-snug">
                    {stage.name}
                  </h3>
                  <span className="text-[10px] text-[#6B6878] font-medium block">
                    {stage.category}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0EDF6]">
                  <div className="flex justify-between items-baseline text-xs mb-1">
                    <span className="text-[11px] text-[#6B6878]">Queue:</span>
                    <span className="font-bold text-[#252336] font-mono tabular-nums">
                      {stage.currentQueue} / {stage.capacity}
                    </span>
                  </div>

                  <div className="h-1.5 w-full bg-[#F3F0F9] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        occupancyPct >= 90
                          ? 'bg-rose-500'
                          : occupancyPct >= 75
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(occupancyPct, 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-[#8E8A9E] font-mono mt-2">
                    <span>Flow: {stage.flowRate}</span>
                    <span>{stage.avgDuration}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Telemetry Detail Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#F0EDF6]">
          <div>
            <span className="text-[11px] font-semibold text-[#8E8A9E] uppercase tracking-wider block">
              Node Micro-Telemetry
            </span>
            <h3 className="text-lg font-bold text-[#252336]">
              {selectedStage.name} ({selectedStage.category})
            </h3>
          </div>

          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-md border ${
              selectedStage.status === 'Choked'
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : selectedStage.status === 'Elevated'
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}
          >
            Status: {selectedStage.status}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 bg-[#FAF8FC] rounded-xl border border-[#F0EDF6]">
            <span className="text-[11px] text-[#6B6878] block">Current Stage Queue</span>
            <span className="text-2xl font-bold text-[#252336] font-mono tabular-nums mt-0.5 block">
              {selectedStage.currentQueue} patients
            </span>
            <span className="text-[11px] text-[#8E8A9E]">Max holding capacity: {selectedStage.capacity}</span>
          </div>

          <div className="p-3.5 bg-[#FAF8FC] rounded-xl border border-[#F0EDF6]">
            <span className="text-[11px] text-[#6B6878] block">Mean Dwell / Processing Time</span>
            <span className="text-2xl font-bold text-[#252336] font-mono tabular-nums mt-0.5 block">
              {selectedStage.avgDuration}
            </span>
            <span className="text-[11px] text-[#8E8A9E]">Target benchmark: 4.0 min</span>
          </div>

          <div className="p-3.5 bg-[#FAF8FC] rounded-xl border border-[#F0EDF6]">
            <span className="text-[11px] text-[#6B6878] block">Throughput Rate</span>
            <span className="text-2xl font-bold text-[#252336] font-mono tabular-nums mt-0.5 block">
              {selectedStage.flowRate}
            </span>
            <span className="text-[11px] text-[#8E8A9E]">Pacing against incoming demand</span>
          </div>

          <div className="p-3.5 bg-[#FAF8FC] rounded-xl border border-[#F0EDF6]">
            <span className="text-[11px] text-[#6B6878] block">Simulation Transit Status</span>
            <span className="text-2xl font-bold text-emerald-600 font-mono tabular-nums mt-0.5 block">
              Active Twin
            </span>
            <span className="text-[11px] text-[#8E8A9E]">Real-time physics tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
};
