import React from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Building2,
  Users2,
  AlertTriangle,
  Sparkles,
  FlaskConical,
  Network,
  Siren,
  BotMessageSquare,
  History,
  Activity
} from 'lucide-react';
import { NavigationTab, HospitalInfo } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  hospital: HospitalInfo;
  surgeMode: boolean;
  recommendationCount?: number;
}

interface NavItemConfig {
  id: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'predictions', label: 'Predictions', icon: TrendingUp },
  { id: 'departments', label: 'Departments', icon: Building2 },
  { id: 'resources', label: 'Resources', icon: Users2 },
  { id: 'bottlenecks', label: 'Bottlenecks', icon: AlertTriangle },
  { id: 'recommendations', label: 'Recommendations', icon: Sparkles },
  { id: 'simulation', label: 'Simulation Lab', icon: FlaskConical },
  { id: 'digital-twin', label: 'Digital Twin', icon: Network },
  { id: 'emergency', label: 'Emergency Mode', icon: Siren },
  { id: 'copilot', label: 'Copilot', icon: BotMessageSquare },
  { id: 'timeline', label: 'Timeline', icon: History },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  hospital,
  surgeMode,
  recommendationCount = 3
}) => {
  return (
    <aside className="w-[230px] shrink-0 h-screen sticky top-0 bg-white border-r border-[#E5E7EB] flex flex-col z-30 select-none">
      {/* Brand Section */}
      <div className="px-5 pt-6 pb-4 border-b border-[#F0EDF6]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#8B7CF6] flex items-center justify-center text-white shadow-xs">
            <Activity className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-[#252336] leading-none">
              CareFlow AI
            </h1>
            <p className="text-[11px] font-medium text-[#6B6878] mt-1 tracking-tight">
              Predict. Optimize. Act.
            </p>
          </div>
        </div>

        {/* Hospital Status indicator */}
        <div className="mt-4 pt-3 border-t border-[#F3F0F9] flex items-center justify-between text-xs">
          <span className="text-[#6B6878] font-medium truncate max-w-[125px]">
            {hospital.name.split(' ')[0]} {hospital.name.split(' ')[1] || ''}
          </span>
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold ${
            surgeMode
              ? 'text-rose-600'
              : hospital.status === 'High Stress'
              ? 'text-amber-600'
              : 'text-emerald-600'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              surgeMode
                ? 'bg-rose-500 animate-pulse'
                : hospital.status === 'High Stress'
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`} />
            {surgeMode ? 'Surge Active' : hospital.status}
          </span>
        </div>
      </div>

      {/* Navigation List - Clean & comfortable typography */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        <div className="px-2 pb-1.5 text-[10px] font-semibold text-[#8E8A9E] uppercase tracking-wider">
          Operations
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isEmergency = item.id === 'emergency';
          
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-colors text-left group ${
                isActive
                  ? 'bg-[#EDE9FE] text-[#7C3AED] font-semibold shadow-2xs'
                  : 'text-[#4A475B] hover:bg-[#F7F5FA] hover:text-[#252336]'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#7C3AED]'
                      : isEmergency && surgeMode
                      ? 'text-rose-500'
                      : 'text-[#8E8A9E] group-hover:text-[#4A475B]'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.id === 'recommendations' && recommendationCount > 0 && (
                <span className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-[#8B7CF6]/15 text-[#7C3AED]">
                  {recommendationCount}
                </span>
              )}
              {isEmergency && surgeMode && (
                <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-700 animate-pulse">
                  ON
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Subtle version footnote, no heavy dashboard widget */}
      <div className="p-3 border-t border-[#F0EDF6] text-center">
        <p className="text-[11px] text-[#A29EAF]">
          CareFlow Core · v3.4 Enterprise
        </p>
      </div>
    </aside>
  );
};
