import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  BotMessageSquare,
  User,
  ArrowRight,
  CheckCircle2,
  Sliders,
  RotateCcw
} from 'lucide-react';
import { RecommendationAction, NavigationTab } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  actionText?: string;
  actionTarget?: NavigationTab;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm-1',
    sender: 'assistant',
    text: "Hello, Commander. I am your CareFlow AI Operations Copilot. I'm actively monitoring patient arrivals, waiting queue trends, and department workloads. What would you like to investigate?"
  }
];

const PRESET_QUERIES = [
  'What happens if we move Dr. Michael Chen to Emergency?',
  'Why is Registration the primary bottleneck right now?',
  'What is the risk of ICU bed exhaustion today?',
  'Recommend 3 immediate actions to reduce wait time below 25 min'
];

interface CopilotViewProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onApplyRecommendation?: () => void;
}

export const CopilotView: React.FC<CopilotViewProps> = ({
  onNavigateTab,
  onApplyRecommendation
}) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: queryText
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let reply: Message;
      const lower = queryText.toLowerCase();

      if (lower.includes('chen') || lower.includes('move') || lower.includes('doctor')) {
        reply = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: 'Reallocating Dr. Michael Chen from Inpatient Wards to Emergency Acute Bay 3 will reduce average ED wait time from 34 min to 26 min (↓ 24%) and drop queue pressure by 17%. Inpatient staffing will remain compliant with 22 doctors active (minimum requirement: 20).',
          actionText: 'Open Simulation Lab',
          actionTarget: 'simulation'
        };
      } else if (lower.includes('bottleneck') || lower.includes('registration')) {
        reply = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: 'Registration is currently taking 142 arrivals/hr against a nominal throughput limit of 110/hr (+29% overload). Desk #5 is staffed, but Station #6 is idle. Reopening Station #6 or activating digital self-service check-in will immediately absorb 18 patients/hr.',
          actionText: 'View Bottlenecks Analysis',
          actionTarget: 'bottlenecks'
        };
      } else if (lower.includes('icu') || lower.includes('bed')) {
        reply = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: 'ICU is currently at 91% occupancy (33 of 36 beds). Based on incoming trauma acuity, 2 additional admissions are forecast before 12:00, leaving only 1 reserve bed. I recommend expediting step-down transfers of 2 stable patients to Ward 3B.',
          actionText: 'View Inpatient Departments',
          actionTarget: 'departments'
        };
      } else {
        reply = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: `Based on real-time stochastic queue modeling: 1) Deploy 1 physician to Emergency Bay 3, 2) Repurpose registration kiosk for ambulatory walk-ins, and 3) Clear 5 pending discharge paperwork orders in Ward 4B. This combined protocol reduces hospital stress score from 64 to 48.`,
          actionText: 'View Action Plans',
          actionTarget: 'recommendations'
        };
      }

      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="space-y-7 pb-12 max-w-4xl mx-auto">
      {/* View Header */}
      <div>
        <h1 className="text-[28px] font-bold text-[#252336] tracking-tight leading-tight">
          CareFlow AI Copilot
        </h1>
        <p className="text-sm text-[#6B6878] mt-1 font-normal">
          Interactive clinical decision-support copilot for scenario analysis, bottleneck explanations, and staffing commands.
        </p>
      </div>

      {/* Preset Query Chips */}
      <div className="flex flex-wrap gap-2">
        {PRESET_QUERIES.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-xs font-medium px-3 py-1.5 rounded-xl bg-white hover:bg-[#EDE9FE]/50 text-[#4A475B] hover:text-[#7C3AED] border border-[#E5E7EB] transition-colors text-left"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-xs flex flex-col h-[480px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 text-xs ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-[#8B7CF6] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl ${
                    isUser
                      ? 'bg-[#8B7CF6] text-white rounded-tr-xs'
                      : 'bg-[#F7F5FA] text-[#252336] border border-[#EDE9FE] rounded-tl-xs'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>

                  {m.actionText && m.actionTarget && (
                    <button
                      onClick={() => onNavigateTab(m.actionTarget!)}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#7C3AED] font-semibold border border-purple-200 hover:bg-purple-50 transition-colors shadow-2xs"
                    >
                      <span>{m.actionText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-[#252336] flex items-center justify-center text-white shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 text-xs">
              <div className="w-7 h-7 rounded-lg bg-[#8B7CF6] flex items-center justify-center text-white shrink-0">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 bg-[#F7F5FA] rounded-2xl border border-[#EDE9FE] text-[#6B6878] italic">
                Evaluating hospital telemetry and running queue projections...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="mt-4 pt-4 border-t border-[#F0EDF6] flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend(inputValue);
            }}
            placeholder="Ask CareFlow Copilot about staff, wait times, bed bottlenecks..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-[#FAF8FC] text-xs focus:bg-white focus:outline-none focus:border-[#8B7CF6] transition-colors"
          />
          <button
            onClick={() => handleSend(inputValue)}
            className="p-2.5 rounded-xl bg-[#8B7CF6] hover:bg-[#7C3AED] text-white shadow-xs transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
