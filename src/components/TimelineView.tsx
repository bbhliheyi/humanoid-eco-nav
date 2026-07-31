import React, { useState } from 'react';
import { Clock, Calendar, ChevronRight } from 'lucide-react';
import { TimelineMilestone } from '../types';

interface TimelineViewProps {
  milestones: TimelineMilestone[];
  onSelectMilestone: (m: TimelineMilestone) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ milestones, onSelectMilestone }) => {
  const [selectedYear, setSelectedYear] = useState<string>('ALL');

  const years = ['ALL', '2024', '2025', '2026'];

  const filteredMilestones = milestones.filter((m) => {
    if (selectedYear === 'ALL') return true;
    return m.date.startsWith(selectedYear);
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Intro Banner */}
      <div className="bg-[#FFFFFF] border border-[#D8D3CA] p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#B83232] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-1.5">
              <Clock className="w-4 h-4 stroke-[2.5]" />
              <span>CHRONOLOGY / 2024.03 – 2026.08</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-editorial-serif text-[#1A1816] tracking-tight">人形机器人开源生态爆发生长时间线</h2>
            <p className="text-xs text-[#524D46] mt-1 max-w-2xl leading-relaxed">
              2024–2026 年人形机器人领域实现了从基础 Sim2Real 运控到通用 VLA 具身大模型、全开源 3.5 万元硬件与 14B 世界模型的全方位井喷。
            </p>
          </div>

          {/* Year Filter Pills */}
          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 border border-[#D8D3CA] rounded-xl">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  selectedYear === y
                    ? 'bg-[#2D2A26] text-white shadow-xs'
                    : 'text-[#635D55] hover:bg-[#EFECE6] hover:text-[#2D2A26]'
                }`}
              >
                {y === 'ALL' ? '全部年度' : `${y}年`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#D8D3CA] space-y-6 my-8">
        {filteredMilestones.map((m) => {
          const is2026 = m.date.startsWith('2026');

          return (
            <div
              key={m.id}
              onClick={() => onSelectMilestone(m)}
              className="group relative bg-[#FFFFFF] hover:bg-[#FAF8F5] border border-[#D8D3CA] hover:border-[#B83232] p-5 rounded-2xl transition-all duration-200 cursor-pointer shadow-xs"
            >
              {/* Timeline node dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 border-2 rounded-full ${
                  is2026 ? 'border-[#B83232] bg-[#B83232]' : 'border-[#2D2A26] bg-[#FFFFFF]'
                }`}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-white bg-[#2D2A26] px-2.5 py-0.5 rounded">
                    <Calendar className="w-3 h-3 inline mr-1 text-[#B83232]" />
                    {m.date}
                  </span>
                  <h3 className="text-lg font-bold font-editorial-serif text-[#2D2A26] group-hover:text-[#B83232] transition-colors">
                    {m.title}
                  </h3>
                </div>

                <span className="text-xs font-mono font-bold text-[#B83232] uppercase tracking-wider">{m.institution}</span>
              </div>

              <p className="text-xs text-[#524D46] leading-relaxed mb-3">{m.description}</p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#D8D3CA]">
                <div className="flex flex-wrap gap-1">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-mono font-semibold uppercase tracking-widest px-2 py-0.5 bg-[#FAF8F5] text-[#2D2A26] border border-[#D8D3CA] rounded"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <span className="text-[11px] font-semibold text-[#B83232] group-hover:translate-x-1 transition-transform inline-flex items-center">
                  查看关联方案与详情 <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


