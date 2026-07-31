import React from 'react';
import { Search, Bot, Star, SlidersHorizontal, ArrowRightLeft, X } from 'lucide-react';
import { FilterState } from '../types';

interface HeaderProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  favoritesCount: number;
  onOpenFavorites: () => void;
  compareCount: number;
  onOpenCompare: () => void;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  filter,
  setFilter,
  favoritesCount,
  onOpenFavorites,
  compareCount,
  onOpenCompare,
  totalCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#D8D3CA] text-[#2D2A26]">
      {/* Top Editorial Issue Bar */}
      <div className="bg-[#2D2A26] text-[#F7F5F0] px-4 lg:px-8 py-1.5 flex justify-between items-center text-[10px] tracking-[0.2em] font-semibold uppercase font-sans">
        <div className="flex items-center gap-3">
          <span className="text-[#B83232]">ISSUE NO. 42 / 2026</span>
          <span className="hidden sm:inline border-l border-[#524D46] pl-3">ROBOTICS & VLA OPEN ECOLOGY</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="opacity-80 font-mono">INDEXED: {totalCount} RESOURCES</span>
          <span className="hidden md:inline text-[9px] bg-[#B83232] text-white px-2 py-0.5 tracking-widest font-bold uppercase rounded-sm">WARM EDITORIAL ARCHIVE</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="px-4 lg:px-8 py-3.5 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Editorial Title */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2D2A26] text-white rounded-lg">
              <Bot className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-baseline gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black font-editorial-serif text-[#1A1816] tracking-tight">
                  人形机器人<span className="text-[#B83232] font-extrabold ml-1.5">开源生态导航</span>
                </h1>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border border-[#B83232]/40 bg-[#FAF8F5] text-[#B83232] rounded">
                  2026.08 典藏版
                </span>
              </div>
              <p className="text-xs font-sans text-[#635D55] hidden sm:block mt-0.5 leading-normal">
                本体 · 训练算法 · 物理仿真 · 具身控制 · VLA大模型 · 数据集与前沿论文 (核心资源 {totalCount}+)
              </p>
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex items-center gap-2 md:hidden">
            {compareCount > 0 && (
              <button
                onClick={onOpenCompare}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#B83232] text-white text-xs font-semibold uppercase tracking-wider rounded"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>({compareCount})</span>
              </button>
            )}
            <button
              onClick={onOpenFavorites}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FFFFFF] text-[#2D2A26] text-xs font-semibold uppercase tracking-wider border border-[#D8D3CA] rounded"
            >
              <Star className="w-3.5 h-3.5 fill-[#B83232] text-[#B83232]" />
              <span>({favoritesCount})</span>
            </button>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C867E]" />
            <input
              type="text"
              placeholder="搜索项目、机构、算法、许可 (Isaac, 智元, G1, VLA)..."
              value={filter.searchQuery}
              onChange={(e) => setFilter((prev) => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-9 pr-8 py-1.5 bg-[#FFFFFF] border border-[#D8D3CA] hover:border-[#2D2A26]/40 focus:border-[#2D2A26] text-xs text-[#2D2A26] placeholder-[#8C867E] rounded focus:outline-none font-sans transition-all shadow-xs"
            />
            {filter.searchQuery && (
              <button
                onClick={() => setFilter((prev) => ({ ...prev, searchQuery: '' }))}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C867E] hover:text-[#B83232] text-xs p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Buttons Desktop */}
          <div className="hidden md:flex items-center gap-2 font-sans">
            <button
              onClick={() => setFilter((prev) => ({ ...prev, openSourceOnly: !prev.openSourceOnly }))}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border rounded transition-all flex items-center gap-1.5 ${
                filter.openSourceOnly
                  ? 'bg-[#2D2A26] text-white border-[#2D2A26]'
                  : 'bg-[#FFFFFF] text-[#2D2A26] border-[#D8D3CA] hover:bg-[#EFECE6]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{filter.openSourceOnly ? '完全开源' : '全部许可'}</span>
            </button>

            {compareCount > 0 && (
              <button
                onClick={onOpenCompare}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#B83232] hover:bg-[#A22B2B] text-white text-xs font-semibold uppercase tracking-wider rounded border border-[#B83232] transition-all shadow-xs"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>对比 ({compareCount})</span>
              </button>
            )}

            <button
              onClick={onOpenFavorites}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFFFF] text-[#2D2A26] border border-[#D8D3CA] text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#EFECE6] transition-all"
            >
              <Star className="w-3.5 h-3.5 fill-[#B83232] text-[#B83232]" />
              <span>收藏 ({favoritesCount})</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

