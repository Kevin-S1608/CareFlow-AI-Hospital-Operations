import React, { useState } from 'react';
import {
  History,
  Filter,
  CheckCircle,
  AlertTriangle,
  Siren,
  Users2,
  Activity,
  Sparkles
} from 'lucide-react';
import { TimelineEvent } from '../types';

interface TimelineViewProps {
  timeline: TimelineEvent[];
}

export const TimelineView: React.FC<TimelineViewProps> = ({ timeline }) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = timeline.filter((e) => {
    if (filterType === 'all') return true;
    return e.type === filterType;
  });

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'surge':
        return <Siren className="w-3.5 h-3.5 text-rose-600" />;
      case 'recommendation':
        return <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />;
      case 'staff':
        return <Users2 className="w-3.5 h-3.5 text-blue-600" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-7 pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#252336] tracking-tight leading-tight">
            Operations Timeline & Audit Trail
          </h1>
          <p className="text-sm text-[#6B6878] mt-1 font-normal">
            Chronological audit log of clinical alerts, automated recommendations, staff reassignments, and intervention effectiveness.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E5E7EB] rounded-xl self-start sm:self-auto text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 font-semibold rounded-lg transition-colors ${
              filterType === 'all'
                ? 'bg-[#EDE9FE] text-[#7C3AED]'
                : 'text-[#6B6878] hover:text-[#252336]'
            }`}
          >
            All Logs
          </button>
          <button
            onClick={() => setFilterType('surge')}
            className={`px-3 py-1 font-semibold rounded-lg transition-colors ${
              filterType === 'surge'
                ? 'bg-rose-100 text-rose-700'
                : 'text-[#6B6878] hover:text-[#252336]'
            }`}
          >
            Surge Alerts
          </button>
          <button
            onClick={() => setFilterType('recommendation')}
            className={`px-3 py-1 font-semibold rounded-lg transition-colors ${
              filterType === 'recommendation'
                ? 'bg-purple-100 text-[#7C3AED]'
                : 'text-[#6B6878] hover:text-[#252336]'
            }`}
          >
            AI Actions
          </button>
          <button
            onClick={() => setFilterType('staff')}
            className={`px-3 py-1 font-semibold rounded-lg transition-colors ${
              filterType === 'staff'
                ? 'bg-blue-100 text-blue-700'
                : 'text-[#6B6878] hover:text-[#252336]'
            }`}
          >
            Staff Moves
          </button>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs">
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#F0EDF6]">
          {filtered.map((item) => (
            <div key={item.id} className="relative group">
              {/* Event node dot */}
              <div className="absolute -left-[27px] top-1.5 w-6 h-6 rounded-full bg-white border border-[#E5E7EB] shadow-2xs flex items-center justify-center">
                {getEventIcon(item.type)}
              </div>

              {/* Event content box */}
              <div className="p-4 rounded-xl bg-[#FAF8FC] border border-[#F0EDF6] hover:border-[#EDE9FE] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#252336]">{item.title}</span>
                    <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-white text-[#6B6878] border border-[#E5E7EB]">
                      {item.type}
                    </span>
                  </div>
                  <span className="font-mono text-[#8E8A9E] text-[11px]">
                    {item.time} Today
                  </span>
                </div>

                <p className="text-xs text-[#6B6878] mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
