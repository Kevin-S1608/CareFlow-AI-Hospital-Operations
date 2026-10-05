import React, { useState } from 'react';
import {
  Users2,
  Stethoscope,
  DoorClosed,
  CheckCircle,
  Clock,
  ArrowRightLeft,
  Filter,
  Plus
} from 'lucide-react';
import { ResourceItem, DepartmentData } from '../types';

interface ResourcesViewProps {
  resources: ResourceItem[];
  departments: DepartmentData[];
  onReallocate?: (resourceId: string, toDept: string) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  resources,
  departments,
  onReallocate
}) => {
  const [filterRole, setFilterRole] = useState<string>('all');
  const [reallocatedNotice, setReallocatedNotice] = useState<string | null>(null);

  const handleQuickReassign = (res: ResourceItem) => {
    const targetDept = res.department === 'Emergency & Trauma' ? 'Inpatient Wards' : 'Emergency & Trauma';
    if (onReallocate) {
      onReallocate(res.id, targetDept);
    }
    setReallocatedNotice(`Reallocated ${res.name} to ${targetDept}`);
    setTimeout(() => setReallocatedNotice(null), 3000);
  };

  const filtered = resources.filter((r) => {
    if (filterRole === 'all') return true;
    if (filterRole === 'physician') return r.role.includes('Physician');
    if (filterRole === 'nurse') return r.role.includes('Nurse');
    return true;
  });

  return (
    <div className="space-y-7 pb-12">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#252336] tracking-tight leading-tight">
            Resource Allocation & Staff Availability
          </h1>
          <p className="text-sm text-[#6B6878] mt-1 font-normal">
            Real-time clinician shifts, consultation room status, and dynamic staff balancing.
          </p>
        </div>

        {reallocatedNotice && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>{reallocatedNotice}</span>
          </div>
        )}
      </div>

      {/* Resource Utilization Overview Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs">
          <span className="text-[11px] font-semibold text-[#8E8A9E] uppercase tracking-wider block">
            Physicians on Duty
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-bold text-[#252336] font-mono tabular-nums">48</span>
            <span className="text-xs text-[#6B6878]">/ 54 scheduled</span>
          </div>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            89% shift fulfillment rate
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs">
          <span className="text-[11px] font-semibold text-[#8E8A9E] uppercase tracking-wider block">
            Nursing Roster
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-bold text-[#252336] font-mono tabular-nums">114</span>
            <span className="text-xs text-[#6B6878]">/ 122 scheduled</span>
          </div>
          <p className="text-xs text-amber-600 font-semibold mt-1">
            6 float pool RNs called in
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs">
          <span className="text-[11px] font-semibold text-[#8E8A9E] uppercase tracking-wider block">
            Consultation Rooms
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-bold text-[#252336] font-mono tabular-nums">38</span>
            <span className="text-xs text-[#6B6878]">/ 42 active</span>
          </div>
          <p className="text-xs text-slate-600 font-semibold mt-1">
            4 in rapid sanitize cycle
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-xs">
          <span className="text-[11px] font-semibold text-[#8E8A9E] uppercase tracking-wider block">
            Registration Counters
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-bold text-[#252336] font-mono tabular-nums">5</span>
            <span className="text-xs text-[#6B6878]">/ 6 staffed</span>
          </div>
          <p className="text-xs text-rose-600 font-semibold mt-1">
            Station 6 on standby reserve
          </p>
        </div>
      </div>

      {/* Clinician Roster & Reallocation Control Table */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#F0EDF6]">
          <div>
            <h2 className="text-base font-semibold text-[#252336]">
              Clinical Staff Management & Rapid Float Pool
            </h2>
            <p className="text-xs text-[#6B6878]">
              Direct one-click redeployment for immediate frontline bottleneck relief.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilterRole('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                filterRole === 'all'
                  ? 'bg-[#EDE9FE] text-[#7C3AED]'
                  : 'text-[#6B6878] hover:bg-[#F7F5FA]'
              }`}
            >
              All Roles
            </button>
            <button
              onClick={() => setFilterRole('physician')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                filterRole === 'physician'
                  ? 'bg-[#EDE9FE] text-[#7C3AED]'
                  : 'text-[#6B6878] hover:bg-[#F7F5FA]'
              }`}
            >
              Physicians
            </button>
            <button
              onClick={() => setFilterRole('nurse')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                filterRole === 'nurse'
                  ? 'bg-[#EDE9FE] text-[#7C3AED]'
                  : 'text-[#6B6878] hover:bg-[#F7F5FA]'
              }`}
            >
              Nurses
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#F0EDF6] text-[#8E8A9E] uppercase tracking-wider text-[11px]">
                <th className="pb-3 font-semibold">Clinician Name</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Assigned Unit</th>
                <th className="pb-3 font-semibold">Shift Hours</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Rapid Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2F9]">
              {filtered.map((res) => (
                <tr key={res.id} className="hover:bg-[#FAF8FC]">
                  <td className="py-3 font-semibold text-[#252336]">{res.name}</td>
                  <td className="py-3 text-[#6B6878]">{res.role}</td>
                  <td className="py-3 font-medium text-[#252336]">{res.department}</td>
                  <td className="py-3 font-mono text-[#6B6878]">{res.shift}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        res.status === 'Available'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-purple-50 text-[#7C3AED] border border-purple-200'
                      }`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleQuickReassign(res)}
                      className="px-2.5 py-1 rounded-lg bg-[#F7F5FA] hover:bg-[#EDE9FE] text-[#7C3AED] font-semibold border border-[#E5E7EB] hover:border-[#8B7CF6] transition-colors inline-flex items-center gap-1"
                    >
                      <ArrowRightLeft className="w-3 h-3" />
                      <span>Reallocate</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
