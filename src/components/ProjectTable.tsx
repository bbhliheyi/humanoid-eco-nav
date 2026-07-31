import React from 'react';
import { Github, Star, ArrowRightLeft, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { EcosystemItem } from '../types';

interface ProjectTableProps {
  items: EcosystemItem[];
  onSelect: (item: EcosystemItem) => void;
  favorites: string[];
  onToggleFavorite: (item: EcosystemItem) => void;
  compareList: string[];
  onToggleCompare: (item: EcosystemItem) => void;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  items,
  onSelect,
  favorites,
  onToggleFavorite,
  compareList,
  onToggleCompare,
}) => {
  return (
    <div className="overflow-x-auto bg-[#FFFFFF] border border-[#D8D3CA] rounded-xl font-sans shadow-xs">
      <table className="w-full text-left text-xs text-[#524D46]">
        <thead className="bg-[#2D2A26] text-white uppercase text-[10px] tracking-[0.15em] font-mono font-bold">
          <tr>
            <th className="py-3.5 px-4 font-bold">项目名称</th>
            <th className="py-3.5 px-4 font-bold">出品方 / 机构</th>
            <th className="py-3.5 px-4 font-bold">开源状态</th>
            <th className="py-3.5 px-4 font-bold">核心栈 / 特性</th>
            <th className="py-3.5 px-4 font-bold">许可</th>
            <th className="py-3.5 px-4 font-bold text-right">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#D8D3CA]">
          {items.map((item) => {
            const isFav = favorites.includes(item.id);
            const isComp = compareList.includes(item.id);
            const isOpen = item.isOpenSource === true;
            const isPartial = item.isOpenSource === 'partial';

            return (
              <tr
                key={item.id}
                onClick={() => onSelect(item)}
                className="hover:bg-[#FAF8F5] cursor-pointer transition-colors"
              >
                <td className="py-3.5 px-4 font-bold font-editorial-serif text-sm text-[#2D2A26]">
                  <span className="hover:text-[#B83232] transition-colors">{item.name}</span>
                </td>
                <td className="py-3.5 px-4 text-[#B83232] font-mono font-bold uppercase tracking-wider text-[11px]">{item.provider}</td>
                <td className="py-3.5 px-4">
                  {isOpen ? (
                    <span className="inline-flex items-center gap-1 text-white text-[9px] font-bold uppercase tracking-widest bg-[#2D2A26] px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3 text-[#52c41a]" /> 完全开源
                    </span>
                  ) : isPartial ? (
                    <span className="inline-flex items-center gap-1 text-[#B83232] text-[9px] font-bold uppercase tracking-widest bg-[#FAF8F5] border border-[#D8D3CA] px-2 py-0.5 rounded">
                      <AlertCircle className="w-3 h-3 text-[#B83232]" /> 部分开源
                    </span>
                  ) : (
                    <span className="text-[#635D55] text-[10px] font-mono uppercase">开源/商业授权</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-[#524D46] max-w-xs truncate font-sans">
                  {item.trainStack || item.simBackend || item.cost || item.scale || item.description}
                </td>
                <td className="py-3.5 px-4 font-mono text-[10px] font-bold text-[#635D55] uppercase">{item.license || '—'}</td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onToggleCompare(item)}
                      title="对比"
                      className={`p-1.5 rounded transition-all cursor-pointer ${
                        isComp
                          ? 'bg-[#B83232] text-white border border-[#B83232]'
                          : 'bg-[#FAF8F5] text-[#2D2A26] border border-[#D8D3CA] hover:border-[#2D2A26]'
                      }`}
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onToggleFavorite(item)}
                      title="收藏"
                      className={`p-1.5 rounded transition-all cursor-pointer ${
                        isFav
                          ? 'bg-[#2D2A26] text-white border border-[#2D2A26]'
                          : 'bg-[#FAF8F5] text-[#2D2A26] border border-[#D8D3CA] hover:border-[#2D2A26]'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-[#B83232] text-[#B83232]' : ''}`} />
                    </button>
                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 bg-[#FAF8F5] hover:bg-[#2D2A26] text-[#2D2A26] hover:text-white border border-[#D8D3CA] rounded transition-all"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};


