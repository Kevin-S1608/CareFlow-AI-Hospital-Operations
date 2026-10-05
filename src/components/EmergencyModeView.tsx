import React, { useState } from 'react';
import {
  Siren,
  Flame,
  Radio,
  Users,
  CheckCircle,
  AlertOctagon,
  ArrowUpRight,
  ShieldAlert,
  Send
} from 'lucide-react';

interface EmergencyModeViewProps {
  surgeMode: boolean;
  onToggleSurgeMode: () => void;
}

export const EmergencyModeView: React.FC<EmergencyModeViewProps> = ({
  surgeMode,
  onToggleSurgeMode
}) => {
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState<'mass-casualty' | 'code-black' | 'surge-divert'>('mass-casualty');

  const handleSendRecall = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 4000);
  };

  return (
    <div className="space-y-7 pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#252336] tracking-tight leading-tight">
            Emergency Operations & Surge Management
          </h1>
          <p className="text-sm text-[#6B6878] mt-1 font-normal">
            Crisis protocols, priority triage bypass overrides, and municipal mass-casualty coordination.
          </p>
        </div>

        {/* Master Surge Mode Toggle */}
        <button
          onClick={onToggleSurgeMode}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border shadow-xs ${
            surgeMode
              ? 'bg-rose-600 text-white border-rose-700 shadow-rose-200 animate-pulse'
              : 'bg-white hover:bg-rose-50 text-rose-600 border-rose-200'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>{surgeMode ? 'DISENGAGE SURGE MODE' : 'ENGAGE CRISIS SURGE MODE'}</span>
        </button>
      </div>

      {surgeMode && (
        <div className="p-4 rounded-2xl bg-rose-600 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AlertOctagon className="w-5 h-5 shrink-0" />
            <div>
              <span className="text-xs uppercase tracking-wider font-bold opacity-80">
                Critical State Active
              </span>
              <p className="text-sm font-bold">
                Hospital Command Center is operating under Surge Protocol Level 2.
              </p>
            </div>
          </div>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-lg font-mono">
            Direct Admittance Bypass Enabled
          </span>
        </div>
      )}

      {/* Priority Triage Acuity Queue */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs">
        <h2 className="text-base font-semibold text-[#252336] mb-1">
          Priority Triage Queue (Emergency Severity Index - ESI)
        </h2>
        <p className="text-xs text-[#6B6878] mb-5">
          Dynamic triage ranking sorting incoming clinical cases by acuity rather than arrival timestamp.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-rose-700 uppercase">ESI Level 1</span>
              <span className="text-xs font-bold text-rose-900 font-mono">2 Pts</span>
            </div>
            <h3 className="text-sm font-bold text-[#252336] mt-2">
              Resuscitation (Immediate)
            </h3>
            <p className="text-xs text-[#6B6878] mt-1">
              Active cardiac arrest, severe airway trauma. 0 min wait threshold.
            </p>
            <div className="mt-3 pt-2 border-t border-rose-200/60 text-[11px] font-semibold text-rose-700">
              Bay 1 & Bay 2 Locked
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-amber-700 uppercase">ESI Level 2</span>
              <span className="text-xs font-bold text-amber-900 font-mono">7 Pts</span>
            </div>
            <h3 className="text-sm font-bold text-[#252336] mt-2">
              Emergent (High Risk)
            </h3>
            <p className="text-xs text-[#6B6878] mt-1">
              Severe chest pain, acute stroke signs, unstable vitals.
            </p>
            <div className="mt-3 pt-2 border-t border-amber-200/60 text-[11px] font-semibold text-amber-700">
              Mean Wait: 6 min
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#7C3AED] uppercase">ESI Level 3</span>
              <span className="text-xs font-bold text-[#7C3AED] font-mono">24 Pts</span>
            </div>
            <h3 className="text-sm font-bold text-[#252336] mt-2">
              Urgent (2+ Resources)
            </h3>
            <p className="text-xs text-[#6B6878] mt-1">
              Moderate abdominal pain, closed fractures requiring imaging.
            </p>
            <div className="mt-3 pt-2 border-t border-purple-200/60 text-[11px] font-semibold text-[#7C3AED]">
              Mean Wait: 34 min
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-600 uppercase">ESI Level 4 & 5</span>
              <span className="text-xs font-bold text-slate-900 font-mono">25 Pts</span>
            </div>
            <h3 className="text-sm font-bold text-[#252336] mt-2">
              Less Urgent (Walk-In)
            </h3>
            <p className="text-xs text-[#6B6878] mt-1">
              Minor lacerations, simple rashes, medication refills.
            </p>
            <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] font-semibold text-slate-600">
              Eligible for Fast-Track Kiosk
            </div>
          </div>
        </div>
      </div>

      {/* Rapid Staff Call-In & Municipal Overrides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#F0EDF6]">
              <Radio className="w-4 h-4 text-[#7C3AED]" />
              <h2 className="text-base font-semibold text-[#252336]">
                Automated Off-Duty Staff Recall Broadcast
              </h2>
            </div>
            <p className="text-xs text-[#6B6878]">
              Triggers urgent SMS/pager alert to pre-registered reserve clinician pool (ER Physicians, Trauma Nurses, Surgical Techs).
            </p>

            <div className="mt-4 p-3.5 bg-[#FAF8FC] rounded-xl border border-[#F0EDF6] text-xs space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-[#6B6878]">Targeted Clinicians in Radius:</span>
                <span className="text-[#252336] font-mono">32 verified within 15 min</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-[#6B6878]">Overtime Pay Multiplier:</span>
                <span className="text-emerald-700 font-mono">1.75x Surge Authorized</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#F0EDF6] flex items-center justify-between">
            <span className="text-xs text-[#8E8A9E]">
              {broadcastSent ? 'Emergency broadcast sent!' : 'Ready to dispatch'}
            </span>
            <button
              onClick={handleSendRecall}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{broadcastSent ? 'Broadcast Dispatched' : 'Broadcast Recall Alert'}</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#F0EDF6]">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <h2 className="text-base font-semibold text-[#252336]">
                Municipal Ambulance Divert Status
              </h2>
            </div>
            <p className="text-xs text-[#6B6878]">
              Automated advisory transmitted to County Emergency Medical Services Dispatch system.
            </p>

            <div className="mt-4 p-3.5 bg-[#FAF8FC] rounded-xl border border-[#F0EDF6] text-xs space-y-2">
              <div className="flex justify-between font-semibold">
                <span className="text-[#6B6878]">Current Facility Status:</span>
                <span className="text-amber-700 font-bold">ACCEPTING WITH ADVISORY</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-[#6B6878]">Nearest Alternate Facility:</span>
                <span className="text-[#252336]">St. Jude Med (4.2 miles, 12 min)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#F0EDF6] flex items-center justify-end">
            <span className="text-[11px] text-[#8E8A9E] italic">
              Divert requires Chief Medical Officer dual-authorization.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
