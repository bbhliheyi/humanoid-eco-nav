import React, { useState } from 'react';
import { Compass, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { SelectorScenario, EcosystemItem } from '../types';

interface SelectorWizardProps {
  scenarios: SelectorScenario[];
  allItemMap: Record<string, EcosystemItem>;
  onSelectProject: (item: EcosystemItem) => void;
}

export const SelectorWizard: React.FC<SelectorWizardProps> = ({ scenarios, allItemMap, onSelectProject }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(scenarios[0].id);

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  return (
    <div className="space-y-6 font-sans">
      {/* Banner */}
      <div className="bg-[#FFFFFF] border border-[#D8D3CA] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#2D2A26] text-white rounded-lg">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-[#B83232] uppercase tracking-[0.2em] mb-1">
              SELECTION WIZARD
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-editorial-serif text-[#1A1816] tracking-tight">开发者具身技术栈选型矩阵与向导</h2>
            <p className="text-xs text-[#524D46] mt-1 leading-normal">
              针对不同应用场景（从 3.5 万极客手搓、顶会复现到 VLA 通用大脑与量产部署），智能推介最佳组合架构。
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Scenario Selector Cards */}
        <div className="space-y-2.5 lg:col-span-1">
          <h3 className="text-xs font-semibold text-[#2D2A26] uppercase tracking-wider mb-2 border-b border-[#D8D3CA] pb-1.5">
            选择开发目标与场景
          </h3>

          {scenarios.map((s) => {
            const isSelected = s.id === selectedScenarioId;

            return (
              <div
                key={s.id}
                onClick={() => setSelectedScenarioId(s.id)}
                className={`p-4 border rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#2D2A26] text-white border-[#2D2A26] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#2D2A26] border-[#D8D3CA] hover:border-[#2D2A26] hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className={`text-sm font-bold font-editorial-serif ${isSelected ? 'text-white' : 'text-[#2D2A26]'}`}>
                    {s.title}
                  </h4>
                  <span
                    className={`text-[9px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      isSelected
                        ? 'bg-[#B83232] text-white border-[#B83232]'
                        : 'bg-[#FAF8F5] text-[#635D55] border-[#D8D3CA]'
                    }`}
                  >
                    {s.estimatedDifficulty}
                  </span>
                </div>

                <p className={`text-xs line-clamp-2 ${isSelected ? 'text-[#D8D3CA]' : 'text-[#635D55]'}`}>
                  {s.targetAudience}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right column: Scenario Tech Stack Blueprint */}
        <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#D8D3CA] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-[#D8D3CA] pb-4 mb-4">
              <div>
                <span className="text-[10px] font-mono font-semibold text-[#B83232] uppercase tracking-wider">BEST PRACTICE BLUEPRINT</span>
                <h3 className="text-xl font-bold font-editorial-serif text-[#2D2A26]">{activeScenario.title}</h3>
              </div>
              <span className="px-3 py-1 bg-[#B83232] text-white text-xs font-bold uppercase tracking-wider rounded">
                难度: {activeScenario.estimatedDifficulty}
              </span>
            </div>

            <p className="text-xs text-[#524D46] leading-relaxed mb-6 font-sans">{activeScenario.description}</p>

            {/* Recommended Stack Components */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-[#2D2A26] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#B83232]" /> 架构推荐套组 (点击直达项目)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeScenario.stackItems.map((itemName) => {
                  const matchedItem = (Object.values(allItemMap) as EcosystemItem[]).find(
                    (it) => it.name.toLowerCase().includes(itemName.toLowerCase()) || itemName.toLowerCase().includes(it.name.toLowerCase())
                  );

                  return (
                    <div
                      key={itemName}
                      onClick={() => matchedItem && onSelectProject(matchedItem)}
                      className={`p-3.5 border rounded-xl text-xs transition-all flex items-center justify-between gap-2 ${
                        matchedItem
                          ? 'bg-[#FAF8F5] border-[#D8D3CA] hover:border-[#B83232] cursor-pointer group hover:bg-[#FFFFFF]'
                          : 'bg-[#FAF8F5]/50 border-[#D8D3CA] text-[#8C867E]'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-[#2D2A26] font-editorial-serif text-sm group-hover:text-[#B83232] block transition-colors">
                          {itemName}
                        </span>
                        {matchedItem && (
                          <span className="text-[10px] text-[#B83232] font-semibold uppercase tracking-wider">{matchedItem.provider}</span>
                        )}
                      </div>

                      {matchedItem ? (
                        <ArrowRight className="w-4 h-4 text-[#8C867E] group-hover:text-[#B83232] group-hover:translate-x-1 transition-all" />
                      ) : (
                        <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-[#8C867E]">生态整合项</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Advantages */}
            <div>
              <h4 className="text-xs font-bold text-[#2D2A26] uppercase tracking-wider mb-2 border-b border-[#D8D3CA] pb-1">方案优势与价值</h4>
              <ul className="space-y-1.5 text-xs text-[#524D46]">
                {activeScenario.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B83232] shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

