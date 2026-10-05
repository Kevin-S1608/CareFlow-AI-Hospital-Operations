import React, { useState } from 'react';
import {
  Bell,
  Sparkles,
  Flame,
  ChevronDown,
  CheckCircle2,
  Building,
  Layers,
  X
} from 'lucide-react';
import { HospitalInfo, ScenarioId, NavigationTab } from '../types';
import { HOSPITALS, SCENARIO_DATA } from '../data/hospitalData';

interface HeaderProps {
  selectedHospital: HospitalInfo;
  onSelectHospital: (hospital: HospitalInfo) => void;
  selectedScenario: ScenarioId;
  onSelectScenario: (scenarioId: ScenarioId) => void;
  surgeMode: boolean;
  onToggleSurgeMode: () => void;
  onOpenCopilot: () => void;
  onSelectTab: (tab: NavigationTab) => void;
  alertsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  selectedHospital,
  onSelectHospital,
  selectedScenario,
  onSelectScenario,
  surgeMode,
  onToggleSurgeMode,
  onOpenCopilot,
  onSelectTab,
  alertsCount = 2
}) => {
  const [showAlertsDropdown, setShowAlertsDropdown] = useState(false);

  return (
    <header className="h-16 px-8 bg-white border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 z-20 shrink-0">
      {/* Left: Command Center Title + Status */}
      <div className="flex items-center gap-3 min-w-0">
        <h2 className="text-base font-semibold text-[#252336] truncate tracking-tight">
          AI Hospital Operations Command Center
        </h2>
        <span className="hidden sm:inline-block text-[#D1CDDB]">|</span>
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#059669]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>System Operational</span>
        </div>
      </div>

      {/* Right Controls: Hospital selector, Demo scenario selector, Surge Mode, Alerts, Copilot */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Hospital Selector */}
        <div className="relative">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F7F5FA] hover:bg-[#EFEBF6] border border-[#E5E7EB] rounded-lg text-xs font-medium text-[#252336] transition-colors cursor-pointer">
            <Building className="w-3.5 h-3.5 text-[#8B7CF6] shrink-0" />
            <select
              aria-label="Select Hospital"
              value={selectedHospital.id}
              onChange={(e) => {
                const found = HOSPITALS.find((h) => h.id === e.target.value);
                if (found) onSelectHospital(found);
              }}
              className="bg-transparent text-xs font-medium text-[#252336] focus:outline-none cursor-pointer pr-1"
            >
              {HOSPITALS.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Demo Scenario Selector */}
        <div className="relative">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F7F5FA] hover:bg-[#EFEBF6] border border-[#E5E7EB] rounded-lg text-xs font-medium text-[#252336] transition-colors cursor-pointer">
            <Layers className="w-3.5 h-3.5 text-[#8B7CF6] shrink-0" />
            <select
              aria-label="Select Scenario"
              value={selectedScenario}
              onChange={(e) => onSelectScenario(e.target.value as ScenarioId)}
              className="bg-transparent text-xs font-medium text-[#252336] focus:outline-none cursor-pointer pr-1"
            >
              <option value="normal">Scenario: Normal Morning</option>
              <option value="trauma-surge">Scenario: Trauma Surge (Accident)</option>
              <option value="flu-outbreak">Scenario: Flu Outbreak (Deficit)</option>
              <option value="shift-handover">Scenario: Shift Handover</option>
            </select>
          </div>
        </div>

        {/* Surge Mode Toggle */}
        <button
          onClick={onToggleSurgeMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
            surgeMode
              ? 'bg-rose-600 text-white border-rose-700 shadow-sm animate-pulse'
              : 'bg-white hover:bg-rose-50 text-rose-600 border-rose-200'
          }`}
          title="Toggle Surge Operations Mode"
        >
          <Flame className={`w-3.5 h-3.5 ${surgeMode ? 'text-white' : 'text-rose-500'}`} />
          <span className="whitespace-nowrap">
            {surgeMode ? 'Surge Active' : 'Surge Mode'}
          </span>
        </button>

        {/* Alerts Popover Button */}
        <div className="relative">
          <button
            onClick={() => setShowAlertsDropdown(!showAlertsDropdown)}
            className="relative p-2 rounded-lg bg-[#F7F5FA] hover:bg-[#EFEBF6] border border-[#E5E7EB] text-[#4A475B] transition-colors"
            title="Operational Alerts"
          >
            <Bell className="w-4 h-4" />
            {alertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {alertsCount}
              </span>
            )}
          </button>

          {/* Alerts dropdown modal */}
          {showAlertsDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0EDF6]">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-[#252336]">
                    Active Operational Alerts
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.5 rounded">
                    {alertsCount} new
                  </span>
                </div>
                <button
                  onClick={() => setShowAlertsDropdown(false)}
                  className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60">
                  <div className="font-semibold text-amber-900">
                    Registration Queue Threshold Breach
                  </div>
                  <div className="text-[#6B6878] text-[11px] mt-0.5">
                    Waiting room backlog exceeds 50 patients. Action recommended.
                  </div>
                  <button
                    onClick={() => {
                      setShowAlertsDropdown(false);
                      onSelectTab('recommendations');
                    }}
                    className="mt-1.5 text-[11px] font-semibold text-[#7C3AED] hover:underline block"
                  >
                    View Recommendation →
                  </button>
                </div>

                <div className="p-2.5 rounded-lg bg-purple-50/70 border border-purple-200/60">
                  <div className="font-semibold text-[#7C3AED]">
                    Capacity Pressure Alert (in 42 min)
                  </div>
                  <div className="text-[#6B6878] text-[11px] mt-0.5">
                    Predicted Queue Pressure: 72/100. Doctor transfer queued.
                  </div>
                  <button
                    onClick={() => {
                      setShowAlertsDropdown(false);
                      onSelectTab('bottlenecks');
                    }}
                    className="mt-1.5 text-[11px] font-semibold text-[#7C3AED] hover:underline block"
                  >
                    Inspect Bottlenecks →
                  </button>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-[#F0EDF6] text-center">
                <button
                  onClick={() => {
                    setShowAlertsDropdown(false);
                    onSelectTab('timeline');
                  }}
                  className="text-[11px] text-[#6B6878] hover:text-[#252336] font-medium"
                >
                  View full operations log
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CareFlow Copilot Quick Trigger */}
        <button
          onClick={onOpenCopilot}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8B7CF6] hover:bg-[#7C3AED] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden md:inline">CareFlow Copilot</span>
          <span className="md:hidden">Copilot</span>
        </button>
      </div>
    </header>
  );
};
