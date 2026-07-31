import React, { useState } from 'react';
import { FileText, Github, ExternalLink, Calendar, Tag, Filter, Award } from 'lucide-react';
import { EcosystemItem } from '../types';

interface PaperListProps {
  papers: EcosystemItem[];
  onSelect: (item: EcosystemItem) => void;
}

export const PaperList: React.FC<PaperListProps> = ({ papers, onSelect }) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('ALL');

  const subCategories = ['ALL', 'Sim2Real', 'WholeBodyControl', 'VLA', 'Survey'];

  const filteredPapers = papers.filter((p) => {
    if (selectedSubCategory === 'ALL') return true;
    return p.paperCategory === selectedSubCategory;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="bg-[#FFFFFF] border border-[#D8D3CA] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#B83232] text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
            <FileText className="w-4 h-4 stroke-[2.5]" />
            <span>ACADEMIC PAPERS & BENCHMARKS (2024–2026.08)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-editorial-serif text-[#1A1816] tracking-tight">关键学术论文、综述与开源基线</h2>
          <p className="text-xs text-[#524D46] mt-1 max-w-2xl">
            涵盖 RSS、CoRL、ICRA、ICLR 顶会关于 Sim2Real 域随机化、全身控制 (WBC)、VLA 基础模型及 550+ 论文精选综述。
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1 rounded-xl border border-[#D8D3CA]">
          {subCategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubCategory(sub)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedSubCategory === sub
                  ? 'bg-[#2D2A26] text-white shadow-sm font-bold'
                  : 'text-[#635D55] hover:text-[#2D2A26]'
              }`}
            >
              {sub === 'ALL'
                ? '全部论文'
                : sub === 'Sim2Real'
                ? '运动控制 & Sim2Real'
                : sub === 'WholeBodyControl'
                ? '全身控制 WBC'
                : sub === 'VLA'
                ? 'VLA & 具身大模型'
                : '综述与 Survey'}
            </button>
          ))}
        </div>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPapers.map((paper) => {
          const isICRA = paper.venue?.includes('ICRA');
          const isRSS = paper.venue?.includes('RSS');

          return (
            <div
              key={paper.id}
              onClick={() => onSelect(paper)}
              className="bg-[#FFFFFF] hover:bg-[#FAF8F5] border border-[#D8D3CA] hover:border-[#B83232] rounded-2xl p-5 shadow-sm transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#FAF8F5] text-[#B83232] border border-[#D8D3CA] flex items-center gap-1">
                    {isICRA || isRSS ? <Award className="w-3 h-3 text-[#B83232]" /> : null}
                    {paper.venue || 'Top Conference'}
                  </span>
                  <span className="text-xs font-mono text-[#8C867E]">{paper.year}</span>
                </div>

                <h3 className="text-sm font-bold font-editorial-serif text-[#2D2A26] hover:text-[#B83232] transition-colors mb-1.5">
                  {paper.name}
                </h3>

                <p className="text-xs font-mono font-semibold text-[#B83232] mb-3">{paper.provider}</p>

                <p className="text-xs text-[#524D46] line-clamp-3 leading-relaxed mb-4">{paper.description}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {paper.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded font-mono bg-[#EFECE6] text-[#2D2A26] border border-[#D8D3CA]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#D8D3CA] text-xs">
                  <span className="text-[#B83232] hover:underline font-semibold">查看论文详情与 BibTeX</span>
                  {paper.githubUrl && (
                    <a
                      href={paper.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 bg-[#FFFFFF] hover:bg-[#2D2A26] text-[#2D2A26] hover:text-white border border-[#D8D3CA] rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" /> 代码
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
