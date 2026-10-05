import React from 'react';
import {
  Building2,
  Users,
  Clock,
  Activity,
  Bed,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { DepartmentData } from '../types';

interface DepartmentsViewProps {
  departments: DepartmentData[];
}

export const DepartmentsView: React.FC<DepartmentsViewProps> = ({
  departments
}) => {
  const getStatusBadge = (status: DepartmentData['status']) => {
    switch (status) {
      case 'Critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Elevated':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="space-y-7 pb-12">
      {/* View Header */}
      <div>
        <h1 className="text-[28px] font-bold text-[#252336] tracking-tight leading-tight">
          Department Operations
        </h1>
        <p className="text-sm text-[#6B6878] mt-1 font-normal">
          Unit-level throughput, clinical staff allocation, bed occupancy, and current wait-time loads.
        </p>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => {
          const occPercent = Math.round((dept.activePatients / dept.capacity) * 100);

          return (
            <div
              key={dept.id}
              className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EDF6]">
                  <h2 className="text-base font-semibold text-[#252336] tracking-tight truncate">
                    {dept.name}
                  </h2>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded border ${getStatusBadge(
                      dept.status
                    )}`}
                  >
                    {dept.status}
                  </span>
                </div>

                {/* Primary capacity progress */}
                <div className="mt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-medium text-[#6B6878]">
                      Occupancy / Active Load
                    </span>
                    <span className="text-sm font-bold text-[#252336] font-mono tabular-nums">
                      {dept.activePatients}{' '}
                      <span className="text-xs font-normal text-[#6B6878]">
                        / {dept.capacity}
                      </span>{' '}
                      ({occPercent}%)
                    </span>
                  </div>

                  <div className="h-2 w-full bg-[#F3F0F9] rounded-full overflow-hidden mt-1.5">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        occPercent >= 90
                          ? 'bg-rose-500'
                          : occPercent >= 75
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(occPercent, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-[#FAF8FC] rounded-xl border border-[#F0EDF6]">
                    <div className="flex items-center gap-1.5 text-[#6B6878] mb-0.5">
                      <Stethoscope className="w-3.5 h-3.5 text-[#8B7CF6]" />
                      <span>Physicians</span>
                    </div>
                    <span className="font-bold text-[#252336] font-mono">
                      {dept.doctorsActive} on duty{' '}
                      <span className="text-[#8E8A9E] font-normal">
                        ({dept.doctorsTotal})
                      </span>
                    </span>
                  </div>

                  <div className="p-2.5 bg-[#FAF8FC] rounded-xl border border-[#F0EDF6]">
                    <div className="flex items-center gap-1.5 text-[#6B6878] mb-0.5">
                      <Users className="w-3.5 h-3.5 text-[#8B7CF6]" />
                      <span>Nursing Staff</span>
                    </div>
                    <span className="font-bold text-[#252336] font-mono">
                      {dept.nursesActive} on duty{' '}
                      <span className="text-[#8E8A9E] font-normal">
                        ({dept.nursesTotal})
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Wait time and utilization */}
              <div className="mt-5 pt-3.5 border-t border-[#F0EDF6] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-[#6B6878]">
                  <Clock className="w-3.5 h-3.5 text-[#8B7CF6]" />
                  <span>Avg Wait:</span>
                  <span className="font-bold text-[#252336] font-mono">
                    {dept.waitTimeMinutes > 0 ? `${dept.waitTimeMinutes} min` : 'Immediate'}
                  </span>
                </div>

                <div className="text-[11px] text-[#8E8A9E]">
                  Utilization: <span className="font-semibold text-[#252336] font-mono">{dept.utilizationRate}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
