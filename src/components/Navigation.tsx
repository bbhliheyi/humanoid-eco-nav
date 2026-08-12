import React from 'react';
import {
  LayoutGrid,
  Table,
  Clock,
  Cpu,
  Boxes,
  Activity,
  Layers,
  BrainCircuit,
  Database,
  FileText,
  Compass,
  BarChart3,
  Filter,
  Workflow,
  Dog,
  Star,
  ArrowRightLeft,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
  Wrench,
  Cog,
  List,
} from 'lucide-react';
import { CategoryId, FilterState } from '../types';

interface NavigationProps {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
  viewMode: 'grid' | 'table';
  setViewMode: (mode: 'grid' | 'table') => void;
  counts: Record<CategoryId, number>;
  providers: string[];
  favoritesCount: number;
  onOpenFavorites: () => void;
  compareCount: number;
  onOpenCompare: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
}

export const CATEGORIES: { id: CategoryId; name: string; subtitle: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'overview', name: '全景总览', subtitle: '生态图谱与快速导航', icon: Compass },
  { id: 'guide', name: '开发全流程总纲', subtitle: '从需求冻结到部署维护', icon: Compass },
  { id: 'simulators', name: 'Phase 1: 数字孪生', subtitle: '仿真器 + URDF + RL 训练', icon: Activity },
  { id: 'urdf-pipeline', name: '  └ URDF 建模部署', subtitle: '数字孪生全链路', icon: Workflow },
  { id: 'frameworks', name: '  └ 训练框架算法', subtitle: 'PPO / SAC / Sim2Real', icon: Boxes },
  { id: 'full-platforms', name: 'Phase 2: 硬件驱动', subtitle: '全尺寸人形平台（开源+商业）', icon: Cpu },
  { id: 'diy-robots', name: '  └ DIY 与桌面级', subtitle: '低成本 / 3D打印 / 教育', icon: Wrench },
  { id: 'arms-components', name: '  └ 机械臂与组件', subtitle: '7-DoF 手臂 / 模块化部件', icon: Cog },
  { id: 'control', name: 'Phase 3: 算法智能', subtitle: 'WBC / 遥操作 / 运动训练', icon: Layers },
  { id: 'slam', name: '  └ 视觉 SLAM 与导航', subtitle: 'ORB-SLAM3 / VINS / RTAB-Map', icon: Activity },
  { id: 'vla', name: '  └ VLA 具身大脑', subtitle: '基础模型 / 世界模型', icon: BrainCircuit },
  { id: 'datasets', name: '  └ 训练数据集', subtitle: '真机轨迹 / 遥操作采集', icon: Database },
  { id: 'papers', name: '测试部署 + 参考', subtitle: 'S2R / 论文 / 迭代', icon: Compass },
  { id: 'awesome', name: '  └ 开源资源列表', subtitle: 'Awesome Lists / 数据库', icon: List },
  { id: 'timeline', name: '发展里程碑', subtitle: '2024-2026 时间线', icon: Clock },
  { id: 'glossary', name: '技术百科', subtitle: '知识体系 (总分架构)', icon: FileText },
  { id: 'analytics', name: '数据统计', subtitle: '生态全景数据分析', icon: BarChart3 },
];

// 按人形机器人从零开发流程分组
const GROUP_P1 = ['simulators', 'urdf-pipeline', 'frameworks'];
const GROUP_P2 = ['full-platforms', 'diy-robots', 'arms-components'];
const GROUP_P3 = ['control', 'slam', 'vla', 'datasets'];
const GROUP_P4 = ['papers', 'awesome', 'timeline', 'glossary', 'analytics'];

const PHASE_CONFIG: { keys: string[]; label: string; subtitle: string; step: number }[] = [
  { keys: GROUP_P1, label: 'Phase 1: 数字孪生', subtitle: '仿真器+URDF+RL训练', step: 1 },
  { keys: GROUP_P2, label: 'Phase 2: 硬件驱动', subtitle: '全尺寸 / DIY / 机械臂', step: 2 },
  { keys: GROUP_P3, label: 'Phase 3: 算法智能', subtitle: 'WBC + VLA + 数据集', step: 3 },
  { keys: GROUP_P4, label: 'Phase 4: 测试部署', subtitle: 'S2R / 论文 / 资源 / 百科', step: 4 },
];

export const Navigation: React.FC<NavigationProps> = ({
  filter,
  setFilter,
  viewMode,
  setViewMode,
  counts,
  providers,
  favoritesCount,
  onOpenFavorites,
  compareCount,
  onOpenCompare,
  sidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const showFilters = ['full-platforms', 'diy-robots', 'arms-components', 'frameworks', 'simulators', 'control', 'slam', 'vla', 'datasets', 'papers', 'awesome'].includes(
    filter.categoryId
  );

  if (sidebarCollapsed) {
    return (
      <aside className="fixed left-0 top-[112px] h-[calc(100vh-112px)] z-20 bg-[#FAF8F5] border-r border-[#D8D3CA] flex flex-col items-center py-3 w-[52px] transition-all duration-200 font-sans">
        <button
          onClick={() => setSidebarCollapsed(false)}
          className="p-1.5 mb-3 text-[#635D55] hover:text-[#B83232] hover:bg-[#EFECE6] rounded transition-colors cursor-pointer"
          title="展开侧边栏"
        >
          <PanelLeftOpen className="w-4 h-4" />
        </button>
        <div className="flex flex-col items-center gap-1 flex-1 overflow-y-auto scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = filter.categoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter((prev) => ({ ...prev, categoryId: cat.id }))}
                className={`p-2 rounded-lg transition-all cursor-pointer relative group ${
                  isActive
                    ? 'bg-[#2D2A26] text-white shadow-sm'
                    : 'text-[#635D55] hover:bg-[#EFECE6] hover:text-[#2D2A26]'
                }`}
                title={`${cat.name} (${counts[cat.id] ?? 0})`}
              >
                <Icon className="w-4 h-4" />
                {counts[cat.id] > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B83232] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {counts[cat.id] > 99 ? '99' : counts[cat.id]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <button
          onClick={onOpenFavorites}
          className="p-2 mt-2 text-[#635D55] hover:text-[#B83232] rounded-lg hover:bg-[#EFECE6] transition-colors cursor-pointer relative"
          title="收藏库"
        >
          <Star className="w-4 h-4" />
          {favoritesCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B83232] text-white text-[8px] font-bold rounded-full flex items-center justify-center">{favoritesCount}</span>
          )}
        </button>
      </aside>
    );
  }

  return (
    <aside className="fixed left-0 top-[112px] h-[calc(100vh-112px)] z-20 bg-[#FAF8F5] border-r border-[#D8D3CA] flex flex-col w-[264px] transition-all duration-200 font-sans text-[#2D2A26]">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#D8D3CA]">
        <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B83232] bg-[#EFECE6] px-2.5 py-1 rounded">
          开发导航
        </span>
        <button
          onClick={() => setSidebarCollapsed(true)}
          className="p-1.5 text-[#8C867E] hover:text-[#B83232] hover:bg-[#EFECE6] rounded transition-colors cursor-pointer"
          title="折叠侧边栏"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Category List - 按开发流程分组 */}
      <div className="flex-1 overflow-y-auto scrollbar-thin py-2">
        {/* 全景总览 */}
        {CATEGORIES.filter((c) => c.id === 'overview').map((cat) => {
          const Icon = cat.icon;
          const isActive = filter.categoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setFilter((prev) => ({ ...prev, categoryId: cat.id }))}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all cursor-pointer mb-1 ${
                isActive
                  ? 'bg-[#FFFFFF] text-[#2D2A26] font-bold border-l-[4px] border-[#B83232] shadow-xs'
                  : 'text-[#2D2A26] hover:bg-[#FFFFFF]/70 border-l-[4px] border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#B83232]' : 'text-[#635D55]'} shrink-0`} />
              <div className="flex-1 text-left min-w-0">
                <div className="truncate">{cat.name}</div>
                <div className={`truncate text-xs font-normal ${isActive ? 'text-[#B83232]' : 'text-[#8C867E]'}`}>{cat.subtitle}</div>
              </div>
            </button>
          );
        })}

        <div className="border-t border-[#D8D3CA] mx-4 my-2" />

        {/* Development Phases */}
        {PHASE_CONFIG.map((phase) => {
          const phaseCategories = CATEGORIES.filter((c) => phase.keys.includes(c.id));
          if (phaseCategories.length === 0) return null;

          return (
            <div key={phase.label} className="mb-3">
              <div className="px-4 py-2 flex items-center gap-2.5">
                <span className="text-xs font-bold text-white bg-[#2D2A26] w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                  {phase.step}
                </span>
                <div>
                  <div className="text-sm font-bold text-[#2D2A26] leading-tight">{phase.label}</div>
                  <div className="text-xs text-[#8C867E] leading-tight">{phase.subtitle}</div>
                </div>
              </div>
              {phaseCategories.map((cat) => {
                const Icon = cat.icon;
                const isActive = filter.categoryId === cat.id;
                const count = counts[cat.id] ?? 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFilter((prev) => ({ ...prev, categoryId: cat.id }))}
                    className={`w-full flex items-center gap-2.5 pl-12 pr-4 py-2 text-sm transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#FFFFFF] text-[#2D2A26] font-bold border-l-[4px] border-[#B83232] shadow-xs'
                        : 'text-[#524D46] hover:bg-[#FFFFFF]/70 hover:text-[#2D2A26] border-l-[4px] border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#B83232]' : 'text-[#8C867E]'} shrink-0`} />
                    <span className="flex-1 text-left truncate">{cat.name}</span>
                    {count > 0 && (
                      <span className={`text-xs px-2 py-0.5 font-mono font-bold rounded-full ${
                        isActive
                          ? 'bg-[#B83232] text-white'
                          : 'bg-[#EFECE6] text-[#8C867E]'
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Bottom Section: Filters + Actions */}
      <div className="border-t border-[#D8D3CA] bg-[#FFFFFF]/60">
        {showFilters && (
          <div className="px-4 py-3 border-b border-[#D8D3CA]/60">
            <div className="flex items-center bg-[#EFECE6] rounded overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#2D2A26] text-white' : 'text-[#635D55] hover:bg-[#D8D3CA]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>卡片视图</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'table' ? 'bg-[#2D2A26] text-white' : 'text-[#635D55] hover:bg-[#D8D3CA]'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>表格视图</span>
              </button>
            </div>
          </div>
        )}

        {showFilters && (
          <div className="px-4 py-3 space-y-2 border-b border-[#D8D3CA]/60">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C867E] uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-[#B83232]" />
              <span>筛选与排序</span>
            </div>
            <select
              value={filter.providerFilter}
              onChange={(e) => setFilter((prev) => ({ ...prev, providerFilter: e.target.value }))}
              className="w-full bg-[#FFFFFF] text-[#2D2A26] text-xs border border-[#D8D3CA] px-2.5 py-2 rounded focus:outline-none focus:border-[#2D2A26] font-sans"
            >
              <option value="">全部机构 / 出品方</option>
              {providers.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <select
              value={filter.sortBy}
              onChange={(e) =>
                setFilter((prev) => ({
                  ...prev,
                  sortBy: e.target.value as 'featured' | 'date' | 'name' | 'provider',
                }))
              }
              className="w-full bg-[#FFFFFF] text-[#2D2A26] text-xs border border-[#D8D3CA] px-2.5 py-2 rounded focus:outline-none focus:border-[#2D2A26] font-sans"
            >
              <option value="featured">默认推荐排序</option>
              <option value="date">按发布年份/时间</option>
              <option value="name">按项目名称首字母</option>
              <option value="provider">按机构出品方</option>
            </select>
            <label className="flex items-center gap-2 text-xs font-semibold text-[#524D46] cursor-pointer">
              <input
                type="checkbox"
                checked={filter.openSourceOnly}
                onChange={(e) => setFilter((prev) => ({ ...prev, openSourceOnly: e.target.checked }))}
                className="w-3.5 h-3.5 accent-[#B83232] cursor-pointer"
              />
              仅显示完全开源项目
            </label>
            {(filter.providerFilter || filter.openSourceOnly || filter.searchQuery) && (
              <button
                onClick={() =>
                  setFilter((prev) => ({
                    ...prev,
                    providerFilter: '',
                    openSourceOnly: false,
                    searchQuery: '',
                  }))
                }
                className="w-full text-xs text-[#B83232] hover:underline font-semibold tracking-wider py-1 cursor-pointer"
              >
                重置所有筛选条件
              </button>
            )}
          </div>
        )}

        <div className="px-4 py-3 space-y-2">
          <button
            onClick={onOpenFavorites}
            className="w-full flex items-center gap-2.5 px-3 py-2 bg-[#FFFFFF] text-[#2D2A26] border border-[#D8D3CA] text-xs font-semibold rounded-lg hover:bg-[#EFECE6] transition-all cursor-pointer"
          >
            <Star className="w-4 h-4 fill-[#B83232] text-[#B83232]" />
            <span>我的收藏库</span>
            {favoritesCount > 0 && (
              <span className="ml-auto text-xs bg-[#B83232] text-white px-2 py-0.5 rounded-full font-mono font-bold">
                {favoritesCount}
              </span>
            )}
          </button>
          {compareCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="w-full flex items-center gap-2.5 px-3 py-2 bg-[#B83232] text-white text-xs font-semibold rounded-lg hover:bg-[#A22B2B] transition-all cursor-pointer"
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>横向对比</span>
              <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full font-mono font-bold">
                {compareCount}
              </span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
