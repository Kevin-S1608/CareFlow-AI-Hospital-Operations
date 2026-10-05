import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle,
  Sliders,
  AlertTriangle,
  HelpCircle,
  TrendingDown,
  ArrowRight
} from 'lucide-react';
import { RecommendationAction } from '../types';

interface RecommendationsViewProps {
  recommendations: RecommendationAction[];
  onApplyRecommendation: (id: string) => void;
  onSimulateRecommendation: (rec: RecommendationAction) => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  recommendations,
  onApplyRecommendation,
  onSimulateRecommendation
}) => {
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  const handleApply = (rec: RecommendationAction) => {
    onApplyRecommendation(rec.id);
    setAppliedNotice(`Intervention applied: ${rec.title}`);
    setTimeout(() => setAppliedNotice(null), 3500);
  };

  return (
    <div className="space-y-7 pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#252336] tracking-tight leading-tight">
            AI Operations Recommendations
          </h1>
          <p className="text-sm text-[#6B6878] mt-1 font-normal">
            Autonomous decision-support protocols: proactive staff rebalancing, triage mitigation, and bed turnover.
          </p>
        </div>

        {appliedNotice && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{appliedNotice}</span>
          </div>
        )}
      </div>

      {/* Recommendations Cards List */}
      <div className="space-y-5">
        {recommendations.map((rec, index) => (
          <div
            key={rec.id}
            className={`bg-white rounded-2xl p-6 border transition-all ${
              rec.applied
                ? 'border-emerald-200 bg-emerald-50/15'
                : 'border-[#E5E7EB] shadow-xs'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0EDF6]">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#EDE9FE] text-[#7C3AED] text-xs font-bold flex items-center justify-center font-mono">
                  0{index + 1}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#F7F5FA] text-[#6B6878] border border-[#E5E7EB]">
                  {rec.category}
                </span>
                <span className="text-xs font-medium text-[#8E8A9E]">
                  Target: {rec.targetDepartment}
                </span>
              </div>

              {rec.applied && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1 self-start sm:self-auto">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Protocol Active</span>
                </span>
              )}
            </div>

            {/* Title & Description */}
            <div className="mt-4">
              <h2 className="text-lg font-bold text-[#252336] tracking-tight">
                {rec.title}
              </h2>
              <p className="text-xs text-[#6B6878] mt-1">
                {rec.description}
              </p>
            </div>

            {/* Impact & Explainability Grid */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Expected Impact */}
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Projected Gain
                </span>
                <div className="mt-1.5 space-y-1 font-mono">
                  <div className="flex justify-between text-emerald-900 font-semibold">
                    <span>Wait Time:</span>
                    <span>{rec.expectedImpact.waitTimeDelta}</span>
                  </div>
                  <div className="flex justify-between text-emerald-900 font-semibold">
                    <span>Queue Pressure:</span>
                    <span>{rec.expectedImpact.queuePressureDelta}</span>
                  </div>
                  <div className="flex justify-between text-emerald-900 font-semibold">
                    <span>Stress Score:</span>
                    <span>{rec.expectedImpact.stressDelta}</span>
                  </div>
                </div>
              </div>

              {/* Risk if Ignored */}
              <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200">
                <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
                  Risk If Ignored
                </span>
                <p className="text-xs text-rose-900 mt-1 font-medium">
                  {rec.riskIfIgnored}
                </p>
              </div>

              {/* Explainability Reasoning */}
              <div className="p-3.5 rounded-xl bg-[#FAF8FC] border border-[#F0EDF6]">
                <span className="text-[11px] font-bold text-[#7C3AED] uppercase tracking-wider block">
                  AI Explainability
                </span>
                <p className="text-xs text-[#4A475B] mt-1">
                  {rec.explainability}
                </p>
              </div>
            </div>

            {/* Actions footer */}
            <div className="mt-5 pt-3.5 border-t border-[#F0EDF6] flex items-center justify-between">
              <span className="text-[11px] text-[#8E8A9E]">
                Requires Clinical Supervisor Sign-Off
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSimulateRecommendation(rec)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#F7F5FA] hover:bg-[#EFEBF6] border border-[#E5E7EB] text-[#252336] transition-colors flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#8B7CF6]" />
                  <span>Simulate Impact</span>
                </button>

                <button
                  onClick={() => handleApply(rec)}
                  disabled={rec.applied}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    rec.applied
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-[#8B7CF6] hover:bg-[#7C3AED] text-white shadow-2xs'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{rec.applied ? 'Applied' : 'Apply Action'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
