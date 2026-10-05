import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  AlertCircle,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  BarChart3,
  Cpu
} from 'lucide-react';
import { ForecastPoint, EarlyWarningData } from '../types';

interface PredictionsViewProps {
  forecasts: ForecastPoint[];
  earlyWarning: EarlyWarningData;
}

export const PredictionsView: React.FC<PredictionsViewProps> = ({
  forecasts,
  earlyWarning
}) => {
  const [timeHorizon, setTimeHorizon] = useState<'2h' | '4h' | '8h'>('4h');

  return (
    <div className="space-y-7 pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#252336] tracking-tight leading-tight">
            Predictive Analytics & Forecasting
          </h1>
          <p className="text-sm text-[#6B6878] mt-1 font-normal">
            Machine learning forecast models, peak arrival windows, and department demand projections.
          </p>
        </div>

        {/* Time horizon pill selector */}
        <div className="flex items-center gap-1 p-1 bg-[#FAF8FC] border border-[#E5E7EB] rounded-xl self-start sm:self-auto">
          {(['2h', '4h', '8h'] as const).map((h) => (
            <button
              key={h}
              onClick={() => setTimeHorizon(h)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                timeHorizon === h
                  ? 'bg-white text-[#7C3AED] shadow-2xs'
                  : 'text-[#6B6878] hover:text-[#252336]'
              }`}
            >
              Next {h}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Forecast Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6B6878]">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#8E8A9E]">
              Peak Inflow Window
            </span>
            <Clock className="w-3.5 h-3.5 text-[#8B7CF6]" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#252336] font-mono tabular-nums">
            10:45 – 11:30
          </div>
          <p className="text-xs text-rose-600 font-semibold mt-1">
            Projected Peak: 168 arrivals/hr (Breaches 160 threshold)
          </p>
          <div className="mt-3 pt-3 border-t border-[#F0EDF6] text-[11px] text-[#6B6878]">
            Confidence: 94.2% · Poisson Arrival Density Model
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6B6878]">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#8E8A9E]">
              Waiting Time Apex
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-[#252336] font-mono tabular-nums">
            52 min
          </div>
          <p className="text-xs text-amber-700 font-semibold mt-1">
            Projected peak delay in Emergency Registration at 11:15
          </p>
          <div className="mt-3 pt-3 border-t border-[#F0EDF6] text-[11px] text-[#6B6878]">
            Standard SLA threshold: 30 min max wait
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#6B6878]">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#8E8A9E]">
              Resource Deficit Alert
            </span>
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-rose-600 font-mono tabular-nums">
            -2 Attending MDs
          </div>
          <p className="text-xs text-[#6B6878] mt-1">
            Staff shortage predicted in Acute Care Bay 3 starting 11:00
          </p>
          <div className="mt-3 pt-3 border-t border-[#F0EDF6] text-[11px] text-[#6B6878]">
            Trigger: Active Trauma Surge & ambulance batching
          </div>
        </div>
      </div>

      {/* Department Demand Projections Table */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs">
        <h2 className="text-base font-semibold text-[#252336] mb-1">
          Department Demand Forecast & Wait-Time Trajectory
        </h2>
        <p className="text-xs text-[#6B6878] mb-5">
          Calculated using queuing theory (M/M/c) and real-time electronic health records telemetry.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#F0EDF6] text-[#8E8A9E] uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-semibold">Department</th>
                <th className="pb-3 font-semibold">Current Wait</th>
                <th className="pb-3 font-semibold">Predicted (+1 hr)</th>
                <th className="pb-3 font-semibold">Predicted (+2 hr)</th>
                <th className="pb-3 font-semibold">Queue Pressure</th>
                <th className="pb-3 font-semibold">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2F9]">
              <tr>
                <td className="py-3.5 font-semibold text-[#252336]">Registration & Triage</td>
                <td className="py-3.5 font-mono">28 min</td>
                <td className="py-3.5 font-mono text-rose-600 font-semibold">44 min (↑ 57%)</td>
                <td className="py-3.5 font-mono text-rose-600 font-semibold">48 min (↑ 71%)</td>
                <td className="py-3.5 font-mono">82 / 100</td>
                <td className="py-3.5">
                  <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200">
                    CRITICAL
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3.5 font-semibold text-[#252336]">Emergency & Trauma</td>
                <td className="py-3.5 font-mono">34 min</td>
                <td className="py-3.5 font-mono text-amber-600 font-semibold">46 min (↑ 35%)</td>
                <td className="py-3.5 font-mono text-amber-600 font-semibold">39 min (↑ 15%)</td>
                <td className="py-3.5 font-mono">76 / 100</td>
                <td className="py-3.5">
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200">
                    HIGH
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3.5 font-semibold text-[#252336]">Radiology & Imaging</td>
                <td className="py-3.5 font-mono">32 min</td>
                <td className="py-3.5 font-mono text-amber-600 font-semibold">40 min (↑ 25%)</td>
                <td className="py-3.5 font-mono text-amber-600 font-semibold">35 min (↑ 9%)</td>
                <td className="py-3.5 font-mono">74 / 100</td>
                <td className="py-3.5">
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200">
                    HIGH
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3.5 font-semibold text-[#252336]">Inpatient Wards</td>
                <td className="py-3.5 font-mono">Direct Adm.</td>
                <td className="py-3.5 font-mono text-slate-600">Bed saturation 94%</td>
                <td className="py-3.5 font-mono text-rose-600 font-semibold">Bed saturation 98%</td>
                <td className="py-3.5 font-mono">70 / 100</td>
                <td className="py-3.5">
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold border border-amber-200">
                    HIGH
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3.5 font-semibold text-[#252336]">Intensive Care Unit</td>
                <td className="py-3.5 font-mono">Direct Adm.</td>
                <td className="py-3.5 font-mono text-slate-600">3 beds remaining</td>
                <td className="py-3.5 font-mono text-slate-600">2 beds remaining</td>
                <td className="py-3.5 font-mono">65 / 100</td>
                <td className="py-3.5">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                    MODERATE
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Confidence & Telemetry Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4 text-[#7C3AED]" />
            <h3 className="text-sm font-semibold text-[#252336]">
              Predictive Model Reliability & Architecture
            </h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-[#F0EDF6]">
              <span className="text-[#6B6878]">Ensemble Model Architecture</span>
              <span className="font-semibold text-[#252336]">Transformer + Temporal CNN</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F0EDF6]">
              <span className="text-[#6B6878]">Forecast Confidence Level</span>
              <span className="font-bold text-emerald-600 font-mono">92.4% (p &lt; 0.01)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F0EDF6]">
              <span className="text-[#6B6878]">Mean Absolute Percentage Error (MAPE)</span>
              <span className="font-semibold text-[#252336] font-mono">4.1%</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#6B6878]">Last Inference Retrain</span>
              <span className="font-semibold text-[#252336]">2 minutes ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-semibold text-[#252336]">
              Hospital Sensor & EHR Telemetry Quality
            </h3>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-[#F0EDF6]">
              <span className="text-[#6B6878]">HL7 / FHIR Integration Stream</span>
              <span className="font-bold text-emerald-600">Active · 99.8% Heartbeat</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F0EDF6]">
              <span className="text-[#6B6878]">Badge RFID Floor Tracking</span>
              <span className="font-semibold text-[#252336]">100% Sensors Calibrated</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#F0EDF6]">
              <span className="text-[#6B6878]">Regional CAD Dispatch Sync</span>
              <span className="font-semibold text-[#252336]">Low Latency (&lt; 400ms)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#6B6878]">Data Quality Rating</span>
              <span className="font-bold text-emerald-600">High Reliability</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
