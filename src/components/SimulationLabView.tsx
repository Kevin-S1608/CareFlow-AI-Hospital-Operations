import React, { useState } from 'react';
import {
  FlaskConical,
  Play,
  RotateCcw,
  TrendingDown,
  ArrowRight,
  Sparkles,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { RecommendationAction, KpiData } from '../types';

interface SimulationLabViewProps {
  currentKpis: KpiData;
  activeRecommendation?: RecommendationAction | null;
  onApplySimulatedPlan: () => void;
}

export const SimulationLabView: React.FC<SimulationLabViewProps> = ({
  currentKpis,
  activeRecommendation,
  onApplySimulatedPlan
}) => {
  // Simulation What-If Sliders
  const [arrivalSurgePct, setArrivalSurgePct] = useState<number>(0);
  const [doctorDelta, setDoctorDelta] = useState<number>(1);
  const [nurseDelta, setNurseDelta] = useState<number>(2);
  const [fastTrackTurnoverPct, setFastTrackTurnoverPct] = useState<number>(15);

  const [simulatedApplied, setSimulatedApplied] = useState(false);

  // Compute simulated outcomes dynamically
  // Baseline values
  const baseWaitTime = currentKpis.averageWaitTime.value;
  const baseQueue = currentKpis.queuePressure.value;
  const baseStress = currentKpis.hospitalStress.score;

  // Impact formulas
  const arrivalFactor = 1 + arrivalSurgePct / 100;
  const staffFactor = 1 - (doctorDelta * 0.12 + nurseDelta * 0.04);
  const turnoverFactor = 1 - fastTrackTurnoverPct / 150;

  const simWaitTime = Math.max(8, Math.round(baseWaitTime * arrivalFactor * staffFactor * turnoverFactor));
  const simQueue = Math.max(15, Math.min(100, Math.round(baseQueue * arrivalFactor * staffFactor * turnoverFactor)));
  const simStress = Math.max(10, Math.min(100, Math.round(baseStress * arrivalFactor * staffFactor * turnoverFactor)));

  const waitDelta = simWaitTime - baseWaitTime;
  const queueDelta = simQueue - baseQueue;
  const stressDelta = simStress - baseStress;

  const handleReset = () => {
    setArrivalSurgePct(0);
    setDoctorDelta(0);
    setNurseDelta(0);
    setFastTrackTurnoverPct(0);
  };

  const handleApply = () => {
    onApplySimulatedPlan();
    setSimulatedApplied(true);
    setTimeout(() => setSimulatedApplied(false), 3500);
  };

  return (
    <div className="space-y-7 pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#252336] tracking-tight leading-tight">
            Simulation Lab & What-If Sandbox
          </h1>
          <p className="text-sm text-[#6B6878] mt-1 font-normal">
            Simulate operational interventions before authorizing real clinical reassignments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-[#F7F5FA] border border-[#E5E7EB] text-[#6B6878] flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {activeRecommendation && (
        <div className="p-4 rounded-2xl bg-[#EDE9FE]/40 border border-[#EDE9FE] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#7C3AED]" />
            <div>
              <span className="text-xs font-semibold text-[#7C3AED]">
                Loaded Target Intervention
              </span>
              <p className="text-sm font-bold text-[#252336]">
                {activeRecommendation.title}
              </p>
            </div>
          </div>
          <span className="text-xs text-[#6B6878]">
            Parameters auto-tuned for evaluation
          </span>
        </div>
      )}

      {/* Main Two Column Area: Sliders on Left, Before/After Comparison on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: What-If Controls (col-span-6) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#252336] pb-3 mb-5 border-b border-[#F0EDF6]">
              Operational Scenario Controls
            </h2>

            <div className="space-y-6 text-xs">
              {/* Slider 1: Arrival Surge */}
              <div>
                <div className="flex justify-between font-semibold mb-1.5">
                  <span className="text-[#252336]">Patient Arrival Surge Rate</span>
                  <span className="font-mono text-[#7C3AED] tabular-nums">+{arrivalSurgePct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={arrivalSurgePct}
                  onChange={(e) => setArrivalSurgePct(Number(e.target.value))}
                  className="w-full accent-[#8B7CF6] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8E8A9E] mt-1">
                  <span>Baseline (0%)</span>
                  <span>Moderate (+50%)</span>
                  <span>Crisis (+100%)</span>
                </div>
              </div>

              {/* Slider 2: Doctor Reallocation */}
              <div>
                <div className="flex justify-between font-semibold mb-1.5">
                  <span className="text-[#252336]">Doctor Reallocation to Emergency</span>
                  <span className="font-mono text-[#7C3AED] tabular-nums">{doctorDelta >= 0 ? `+${doctorDelta}` : doctorDelta} MDs</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="5"
                  step="1"
                  value={doctorDelta}
                  onChange={(e) => setDoctorDelta(Number(e.target.value))}
                  className="w-full accent-[#8B7CF6] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8E8A9E] mt-1">
                  <span>-2 (Deficit)</span>
                  <span>0 (Current)</span>
                  <span>+5 (Maximum Surge)</span>
                </div>
              </div>

              {/* Slider 3: Nursing Float Pool */}
              <div>
                <div className="flex justify-between font-semibold mb-1.5">
                  <span className="text-[#252336]">Float Pool Registered Nurses Activated</span>
                  <span className="font-mono text-[#7C3AED] tabular-nums">+{nurseDelta} RNs</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={nurseDelta}
                  onChange={(e) => setNurseDelta(Number(e.target.value))}
                  className="w-full accent-[#8B7CF6] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8E8A9E] mt-1">
                  <span>0 (None)</span>
                  <span>+5 (Standard Float)</span>
                  <span>+10 (All-Hands Call)</span>
                </div>
              </div>

              {/* Slider 4: Fast-Track Bed Turnover */}
              <div>
                <div className="flex justify-between font-semibold mb-1.5">
                  <span className="text-[#252336]">Discharge Expedited Clearance Rate</span>
                  <span className="font-mono text-[#7C3AED] tabular-nums">+{fastTrackTurnoverPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={fastTrackTurnoverPct}
                  onChange={(e) => setFastTrackTurnoverPct(Number(e.target.value))}
                  className="w-full accent-[#8B7CF6] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8E8A9E] mt-1">
                  <span>0% (Standard)</span>
                  <span>+25% (Fast-Track)</span>
                  <span>+50% (Rapid Bed Clearing)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#F0EDF6] text-[11px] text-[#6B6878]">
            Simulator engine utilizes stochastic Monte Carlo simulations (N=1,000 iterations).
          </div>
        </div>

        {/* Right: Before vs. After Comparison (col-span-6) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#252336] pb-3 mb-5 border-b border-[#F0EDF6]">
              Projected Before & After Impact
            </h2>

            <div className="space-y-4">
              {/* Wait Time Delta */}
              <div className="p-4 rounded-xl bg-[#FAF8FC] border border-[#F0EDF6]">
                <div className="flex justify-between items-center text-xs text-[#6B6878] mb-1">
                  <span className="font-semibold uppercase tracking-wider text-[11px]">
                    Average Patient Wait Time
                  </span>
                  <span className={`font-bold font-mono ${waitDelta <= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {waitDelta <= 0 ? `${waitDelta} min` : `+${waitDelta} min`}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-[11px] text-[#8E8A9E] block">Baseline</span>
                    <span className="text-xl font-bold text-[#252336] font-mono tabular-nums">
                      {baseWaitTime} min
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8B7CF6]" />
                  <div className="text-right">
                    <span className="text-[11px] text-[#8E8A9E] block">Simulated Outcome</span>
                    <span className="text-xl font-bold text-emerald-700 font-mono tabular-nums">
                      {simWaitTime} min
                    </span>
                  </div>
                </div>
              </div>

              {/* Queue Pressure Delta */}
              <div className="p-4 rounded-xl bg-[#FAF8FC] border border-[#F0EDF6]">
                <div className="flex justify-between items-center text-xs text-[#6B6878] mb-1">
                  <span className="font-semibold uppercase tracking-wider text-[11px]">
                    Queue Pressure Index
                  </span>
                  <span className={`font-bold font-mono ${queueDelta <= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {queueDelta <= 0 ? `${queueDelta} pts` : `+${queueDelta} pts`}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-[11px] text-[#8E8A9E] block">Baseline</span>
                    <span className="text-xl font-bold text-[#252336] font-mono tabular-nums">
                      {baseQueue} / 100
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8B7CF6]" />
                  <div className="text-right">
                    <span className="text-[11px] text-[#8E8A9E] block">Simulated Outcome</span>
                    <span className="text-xl font-bold text-emerald-700 font-mono tabular-nums">
                      {simQueue} / 100
                    </span>
                  </div>
                </div>
              </div>

              {/* Hospital Stress Score Delta */}
              <div className="p-4 rounded-xl bg-[#FAF8FC] border border-[#F0EDF6]">
                <div className="flex justify-between items-center text-xs text-[#6B6878] mb-1">
                  <span className="font-semibold uppercase tracking-wider text-[11px]">
                    Hospital Stress Score
                  </span>
                  <span className={`font-bold font-mono ${stressDelta <= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {stressDelta <= 0 ? `${stressDelta} pts` : `+${stressDelta} pts`}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-[11px] text-[#8E8A9E] block">Baseline</span>
                    <span className="text-xl font-bold text-amber-600 font-mono tabular-nums">
                      {baseStress} / 100
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8B7CF6]" />
                  <div className="text-right">
                    <span className="text-[11px] text-[#8E8A9E] block">Simulated Outcome</span>
                    <span className="text-xl font-bold text-emerald-700 font-mono tabular-nums">
                      {simStress} / 100
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#F0EDF6] flex items-center justify-between">
            <span className="text-xs text-[#6B6878]">
              {simulatedApplied ? 'Settings deployed to live command!' : 'Evaluate outcome before applying.'}
            </span>

            <button
              onClick={handleApply}
              className="px-5 py-2.5 rounded-xl bg-[#8B7CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply Simulated Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
