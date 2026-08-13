import React from 'react';
import {
  ExternalLink,
  Github,
  Star,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  ArrowRightLeft,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { EcosystemItem } from '../types';

interface ProjectCardProps {
  item: EcosystemItem;
  onSelect: (item: EcosystemItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (item: EcosystemItem) => void;
  isCompared: boolean;
  onToggleCompare: (item: EcosystemItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  item,
  onSelect,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare,
}) => {
  const isOpen = item.isOpenSource === true;
  const isPartial = item.isOpenSource === 'partial';

  return (
    <div className="group relative bg-[#FFFFFF] hover:bg-[#FAF8F5] border border-[#D8D3CA] hover:border-[#B83232] rounded-xl p-5 transition-all duration-200 flex flex-col justify-between font-sans shadow-xs hover:shadow-md">
      <div>
        {/* Top bar: Open source status & Quick Actions */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {isOpen ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-[#2D2A26] text-white rounded">
                <CheckCircle2 className="w-3 h-3 text-[#52c41a]" />
                完全开源
              </span>
            ) : isPartial ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-[#EFECE6] text-[#2D2A26] border border-[#D8D3CA] rounded">
                <AlertCircle className="w-3 h-3 text-[#B83232]" />
                部分/框架开源
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-[#EFECE6] text-[#635D55] border border-[#D8D3CA] rounded">
                开源/商业授权
              </span>
            )}

            {item.license && (
              <span className="px-2 py-0.5 text-[10px] bg-[#FFFFFF] text-[#2D2A26] font-mono border border-[#D8D3CA] uppercase font-semibold rounded">
                {item.license}
              </span>
            )}
          </div>

          {/* Buttons: Favorite & Compare */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(item);
              }}
              title={isCompared ? '从对比移除' : '加入对比'}
              className={`p-1.5 border rounded transition-all ${
                isCompared
                  ? 'bg-[#B83232] text-white border-[#B83232]'
                  : 'bg-[#FFFFFF] text-[#2D2A26] border-[#D8D3CA] hover:border-[#2D2A26]'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(item);
              }}
              title={isFavorite ? '取消收藏' : '收藏项目'}
              className={`p-1.5 border rounded transition-all ${
                isFavorite
                  ? 'bg-[#2D2A26] text-white border-[#2D2A26]'
                  : 'bg-[#FFFFFF] text-[#2D2A26] border-[#D8D3CA] hover:border-[#2D2A26]'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-[#B83232] text-[#B83232]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title & Provider */}
        <div className="cursor-pointer" onClick={() => onSelect(item)}>
          <h3 className="text-base sm:text-lg font-bold font-editorial-serif text-[#1A1816] group-hover:text-[#B83232] transition-colors leading-snug">
            {item.name}
          </h3>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#B83232] mt-1 mb-2 flex items-center gap-1.5">
            <span>{item.provider}</span>
            {item.releaseDate && (
              <span className="text-[11px] text-[#8C867E] font-mono">• {item.releaseDate}</span>
            )}
          </p>
          <p className="text-[13px] text-[#524D46] line-clamp-3 leading-relaxed mb-3">
            {item.description}
          </p>

          {/* 功能标签：一眼区分每个开源库的具体能力 */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {item.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-2 py-0.5 bg-[#FFFFFF] border border-[#B83232]/25 text-[#B83232] rounded font-semibold"
                >
                  {t}
                </span>
              ))}
              {item.tags.length > 4 && (
                <span className="text-[10px] px-1.5 py-0.5 text-[#8C867E]">+{item.tags.length - 4}</span>
              )}
            </div>
          )}
        </div>

        {/* Key Metrics / Specs Badges */}
        <div className="space-y-1.5 mb-4 text-[13px] text-[#2D2A26] bg-[#FAF8F5] p-3 rounded-lg border border-[#D8D3CA]">
          {item.cost && (
            <div className="flex items-center justify-between">
              <span className="text-[#635D55] flex items-center gap-1 font-semibold text-xs"><DollarSign className="w-3.5 h-3.5" />成本</span>
              <span className="font-semibold">{item.cost}</span>
            </div>
          )}
          {item.license && (
            <div className="flex items-center justify-between">
              <span className="text-[#635D55] font-semibold text-xs">许可</span>
              <span className="truncate max-w-[160px]">{item.license}</span>
            </div>
          )}
          {item.trainStack && (
            <div className="flex items-center justify-between">
              <span className="text-[#635D55] flex items-center gap-1 font-semibold text-xs"><Cpu className="w-3.5 h-3.5" />栈</span>
              <span className="truncate max-w-[170px]">{item.trainStack}</span>
            </div>
          )}
          {item.simBackend && (
            <div className="flex items-center justify-between">
              <span className="text-[#635D55] flex items-center gap-1 font-semibold text-xs"><Layers className="w-3.5 h-3.5" />仿真</span>
              <span className="truncate max-w-[170px]">{item.simBackend}</span>
            </div>
          )}
          {item.deployStack && (
            <div className="flex items-center justify-between">
              <span className="text-[#635D55] font-semibold text-xs">部署</span>
              <span className="truncate max-w-[170px]">{item.deployStack}</span>
            </div>
          )}
          {item.modelType && (
            <div className="flex items-center justify-between">
              <span className="text-[#635D55] font-semibold text-xs">模型</span>
              <span className="text-[#B83232] truncate max-w-[170px]">{item.modelType}</span>
            </div>
          )}
          {item.scale && (
            <div className="flex items-center justify-between">
              <span className="text-[#635D55] font-semibold text-xs">规模</span>
              <span className="font-semibold text-[#B83232]">{item.scale}</span>
            </div>
          )}
          {item.hardwareSpecs?.emergencyStop && (
            <div className="text-[12px] text-[#524D46] leading-relaxed pt-1.5 border-t border-[#D8D3CA] mt-1">
              <span className="text-[#B83232] font-bold">急停: </span>
              <span className="line-clamp-2">{item.hardwareSpecs.emergencyStop}</span>
            </div>
          )}
          {/* Fallback: show tech architecture summary if no other specs */}
          {!item.cost && !item.trainStack && !item.simBackend && !item.modelType && !item.deployStack && !item.scale && item.techArchitecture && (
            <div className="space-y-1">
              <div className="text-[10px] text-[#635D55] font-semibold uppercase tracking-wider">架构概要</div>
              <div className="flex flex-wrap gap-1">
                <span className="text-[10px] px-1.5 py-0.5 bg-[#EFECE6] rounded text-[#2D2A26]">{item.techArchitecture.system}</span>
                {item.techArchitecture.simulator && <span className="text-[10px] px-1.5 py-0.5 bg-[#EFECE6] rounded text-[#2D2A26]">{item.techArchitecture.simulator}</span>}
                {item.techArchitecture.algorithms.slice(0, 2).map((a, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.5 bg-[#2D2A26] text-white rounded">{a}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer: Tags & Detail Button */}
      <div>
        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-[#EFECE6] text-[#2D2A26] rounded border border-[#D8D3CA]"
            >
              #{tag}
            </span>
          ))}
          {item.tags.length > 4 && (
            <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 bg-[#EFECE6] text-[#635D55] rounded border border-[#D8D3CA]">
              +{item.tags.length - 4}
            </span>
          )}
        </div>

        {/* 架构详解按钮 */}
        {item.techArchitecture && (
          <details className="group mb-3 bg-[#FAF8F5] border border-[#D8D3CA] rounded-lg overflow-hidden text-[11px]">
            <summary className="px-3 py-1.5 cursor-pointer text-[#B83232] font-bold hover:bg-[#EFECE6] transition-colors select-none flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              架构详解
            </summary>
            <div className="px-3 pb-3 space-y-2 border-t border-[#D8D3CA] pt-2">
              <p className="text-xs text-[#524D46] leading-relaxed">{item.techArchitecture.overview}</p>
              <div className="text-xs space-y-0.5">
                <span className="text-[#635D55] font-semibold">仿真器:</span> <span className="text-[#2D2A26]">{item.techArchitecture.simulator}</span>
                <span className="text-[#635D55] font-semibold ml-3">系统:</span> <span className="text-[#2D2A26]">{item.techArchitecture.system}</span>
              </div>
              <div className="text-xs">
                <span className="text-[#635D55] font-semibold">架构:</span> <span className="text-[#2D2A26]">{item.techArchitecture.architecturePattern}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {item.techArchitecture.algorithms.map((a, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.5 bg-[#2D2A26] text-white rounded">{a}</span>
                ))}
              </div>
              <button onClick={() => onSelect(item)} className="text-[10px] text-[#B83232] hover:underline font-semibold">
                查看完整链路与软件栈 →
              </button>
            </div>
          </details>
        )}

        <div className="flex items-center gap-2 pt-2.5 border-t border-[#D8D3CA]">
          <button
            onClick={() => onSelect(item)}
            className="flex-1 py-1.5 px-3 bg-[#FFFFFF] hover:bg-[#2D2A26] text-[#2D2A26] hover:text-white border border-[#D8D3CA] hover:border-[#2D2A26] rounded text-xs font-semibold uppercase tracking-wider transition-all text-center"
          >
            查看档案全貌
          </button>

          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-[#FFFFFF] hover:bg-[#2D2A26] text-[#2D2A26] hover:text-white border border-[#D8D3CA] rounded transition-all"
              title="GitHub 仓库"
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {item.websiteUrl && !item.githubUrl && (
            <a
              href={item.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-[#FFFFFF] hover:bg-[#2D2A26] text-[#2D2A26] hover:text-white border border-[#D8D3CA] rounded transition-all"
              title="官方网站/文档"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

