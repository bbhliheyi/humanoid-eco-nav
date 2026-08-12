import React, { useState, useMemo, useEffect } from 'react';
import { Header as AppHeader } from './components/Header';
import { Navigation as AppNav, CATEGORIES } from './components/Navigation';
import { ProjectCard } from './components/ProjectCard';
import { ProjectTable } from './components/ProjectTable';
import { TimelineView } from './components/TimelineView';
import { DetailModal } from './components/DetailModal';
import { CompareModal } from './components/CompareModal';
import { SelectorWizard } from './components/SelectorWizard';
import { AnalyticsView } from './components/AnalyticsView';
import { PaperList } from './components/PaperList';
import { OverviewView } from './components/OverviewView';
import { UrdfPipelineView } from './components/UrdfPipelineView';
import { GlossaryView } from './components/GlossaryView';
import { DevelopmentGuide } from './components/DevelopmentGuide';

import {
  ECOSYSTEM_ITEMS,
  TIMELINE_DATA,
  PAPER_LIST,
  SELECTOR_SCENARIOS,
} from './data/humanoidData';
import { TECH_ARCHITECTURES } from './data/techArchitectureData';
import { EMERGENCY_STOP } from './data/emergencyStopData';
import { CategoryId, EcosystemItem, FilterState, TimelineMilestone } from './types';
import { Star, ArrowRightLeft, X, ExternalLink, Github, Sparkles } from 'lucide-react';

export default function App() {
  const [filter, setFilter] = useState<FilterState>({
    searchQuery: '',
    categoryId: 'overview',
    providerFilter: '',
    licenseFilter: '',
    openSourceOnly: false,
    sortBy: 'featured',
    selectedTags: [],
  });

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedItem, setSelectedItem] = useState<EcosystemItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('humanoid_favorites');
      return saved ? JSON.parse(saved) : ['roboto-origin', 'isaac-groot', 'openpi'];
    } catch (e) {
      return ['roboto-origin', 'isaac-groot', 'openpi'];
    }
  });

  const [compareList, setCompareList] = useState<string[]>(['roboto-origin', 'isaac-groot']);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('humanoid_favorites', JSON.stringify(favorites));
    } catch (e) {
      // ignore
    }
  }, [favorites]);

  // Merge techArchitecture into all ecosystem items
  const ALL_ITEMS = useMemo(() => {
    return ECOSYSTEM_ITEMS.map((i) => {
      const item = TECH_ARCHITECTURES[i.id]
        ? { ...i, techArchitecture: TECH_ARCHITECTURES[i.id] }
        : i;
      if (EMERGENCY_STOP[i.id] && item.hardwareSpecs) {
        return {
          ...item,
          hardwareSpecs: { ...item.hardwareSpecs, emergencyStop: EMERGENCY_STOP[i.id] },
        };
      }
      return item;
    });
  }, []);

  // Build item map for fast lookup
  const allItemMap = useMemo(() => {
    const map: Record<string, EcosystemItem> = {};
    ALL_ITEMS.forEach((i) => (map[i.id] = i));
    PAPER_LIST.forEach((p) => (map[p.id] = p));
    return map;
  }, [ALL_ITEMS]);

  // Filter items based on active category & filters
  const filteredItems = useMemo(() => {
    let list = ALL_ITEMS.filter((item) => {
      if (filter.categoryId === 'papers') return false; // Handled separately
      if (filter.categoryId !== 'overview' && item.category !== filter.categoryId) return false;
      return true;
    });

    if (filter.searchQuery.trim()) {
      const q = filter.searchQuery.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.provider.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q)) ||
          (i.license && i.license.toLowerCase().includes(q))
      );
    }

    if (filter.providerFilter) {
      list = list.filter((i) => i.provider.includes(filter.providerFilter));
    }

    if (filter.openSourceOnly) {
      list = list.filter((i) => i.isOpenSource === true);
    }

    // Sort
    if (filter.sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter.sortBy === 'provider') {
      list.sort((a, b) => a.provider.localeCompare(b.provider));
    } else if (filter.sortBy === 'date') {
      list.sort((a, b) => (b.releaseDate || '').localeCompare(a.releaseDate || ''));
    }

    return list;
  }, [filter]);

  // Unique provider list for dropdown
  const uniqueProviders = useMemo(() => {
    const set = new Set<string>();
    ALL_ITEMS.forEach((i) => {
      let p = i.provider;
      if (p.includes('(')) p = p.split('(')[0].trim();
      set.add(p);
    });
    return Array.from(set).slice(0, 15);
  }, []);

  // Item counts for tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryId, number> = {
      overview: ECOSYSTEM_ITEMS.length,
      timeline: TIMELINE_DATA.length,
      'full-platforms': ALL_ITEMS.filter((i) => i.category === 'full-platforms').length,
      'diy-robots': ALL_ITEMS.filter((i) => i.category === 'diy-robots').length,
      'arms-components': ALL_ITEMS.filter((i) => i.category === 'arms-components').length,
      frameworks: ALL_ITEMS.filter((i) => i.category === 'frameworks').length,
      simulators: ALL_ITEMS.filter((i) => i.category === 'simulators').length,
      control: ALL_ITEMS.filter((i) => i.category === 'control').length,
      slam: ALL_ITEMS.filter((i) => i.category === 'slam').length,
      vla: ALL_ITEMS.filter((i) => i.category === 'vla').length,
      datasets: ALL_ITEMS.filter((i) => i.category === 'datasets').length,
      papers: PAPER_LIST.filter((p) => p.category !== 'deployment').length,
      deployment: PAPER_LIST.filter((p) => p.category === 'deployment').length + ALL_ITEMS.filter((i) => i.category === 'deployment').length,
      guide: 0, // Standalone guide
      glossary: 0,
      wizard: SELECTOR_SCENARIOS.length,
      'urdf-pipeline': 5,
      analytics: ECOSYSTEM_ITEMS.length,
    };
    return counts;
  }, []);

  // Handlers
  const toggleFavorite = (item: EcosystemItem) => {
    setFavorites((prev) =>
      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
    );
  };

  const toggleCompare = (item: EcosystemItem) => {
    setCompareList((prev) => {
      if (prev.includes(item.id)) return prev.filter((id) => id !== item.id);
      if (prev.length >= 4) return prev;
      return [...prev, item.id];
    });
  };

  const selectedCompareItems = useMemo(() => {
    return compareList.map((id) => allItemMap[id]).filter(Boolean);
  }, [compareList, allItemMap]);

  const featuredItems = useMemo(() => {
    return [
      allItemMap['roboto-origin'],
      allItemMap['isaac-groot'],
      allItemMap['openpi'],
      allItemMap['agibot-x1'],
      allItemMap['psi-zero'],
      allItemMap['dexora'],
    ].filter(Boolean);
  }, [allItemMap]);

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#2D2A26] font-sans antialiased selection:bg-[#B83232] selection:text-white">
      {/* Top Header (full width) */}
      <AppHeader
        filter={filter}
        setFilter={setFilter}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        compareCount={compareList.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        totalCount={ECOSYSTEM_ITEMS.length + PAPER_LIST.length}
      />

      <div className="flex">
        {/* Sidebar Navigation */}
        <AppNav
          filter={filter}
          setFilter={setFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          counts={categoryCounts}
          providers={uniqueProviders}
          favoritesCount={favorites.length}
          onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
          compareCount={compareList.length}
          onOpenCompare={() => setIsCompareModalOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        {/* Main Container with sidebar offset */}
        <main
          className={`flex-1 py-6 px-4 lg:px-6 transition-all duration-200 ${
            sidebarCollapsed ? 'ml-[52px]' : 'ml-[264px]'
          }`}
        >
          {filter.categoryId === 'overview' && (
            <OverviewView
              onNavigateCategory={(cat) => setFilter((prev) => ({ ...prev, categoryId: cat }))}
              featuredItems={featuredItems}
              onSelectProject={setSelectedItem}
              totalCount={ECOSYSTEM_ITEMS.length}
            />
          )}

          {filter.categoryId === 'timeline' && (
            <TimelineView
              milestones={TIMELINE_DATA}
              onSelectMilestone={(m) => {
                if (m.relatedItemId && allItemMap[m.relatedItemId]) {
                  setSelectedItem(allItemMap[m.relatedItemId]);
                }
              }}
            />
          )}

          {filter.categoryId === 'guide' && (
            <DevelopmentGuide onNavigate={(cat) => setFilter((prev) => ({ ...prev, categoryId: cat }))} />
          )}

          {filter.categoryId === 'urdf-pipeline' && (
            <UrdfPipelineView />
          )}

          {filter.categoryId === 'wizard' && (
            <SelectorWizard
              scenarios={SELECTOR_SCENARIOS}
              allItemMap={allItemMap}
              onSelectProject={setSelectedItem}
            />
          )}

          {filter.categoryId === 'deployment' && (
            <div className="space-y-8">
              <PaperList
                papers={PAPER_LIST.filter((p) => p.category === 'deployment')}
                onSelect={setSelectedItem}
                subCategories={['ALL', 'Sim2Real']}
                badge="SIM2REAL & DEPLOYMENT (2024–2026.08)"
                title="测试部署：Sim2Real 与基准验证"
                subtitle="Sim2Real 迁移、域随机化、仿真到真机部署的开源论文与基准测试信息。"
              />
              {filteredItems.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredItems.map((item) => (
                    <ProjectCard
                      key={item.id}
                      item={item}
                      onSelect={setSelectedItem}
                      isFavorite={favorites.includes(item.id)}
                      onToggleFavorite={toggleFavorite}
                      isCompared={compareList.includes(item.id)}
                      onToggleCompare={toggleCompare}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {filter.categoryId === 'papers' && (
            <PaperList
              papers={PAPER_LIST}
              onSelect={setSelectedItem}
              subCategories={['ALL', 'WholeBodyControl', 'VLA', 'Survey']}
              badge="ACADEMIC PAPERS & OPEN BASELINES (2024–2026.08)"
              title="开源基线 / 学术论文"
              subtitle="全身控制 (WBC)、VLA 基础模型、综述与开源资源列表：涵盖 RSS、CoRL、ICRA、ICLR 顶会及 550+ 论文精选。"
            />
          )}

          {filter.categoryId === 'glossary' && (
            <GlossaryView allItemMap={allItemMap} onSelectProject={setSelectedItem} />
          )}

          {filter.categoryId === 'analytics' && (
            <AnalyticsView items={ECOSYSTEM_ITEMS} />
          )}

          {['full-platforms', 'diy-robots', 'arms-components', 'frameworks', 'simulators', 'control', 'slam', 'vla', 'datasets'].includes(
            filter.categoryId
          ) && (
            <div>
              {filteredItems.length === 0 ? (
                <div className="text-center py-16 bg-[#FFFFFF] rounded-2xl border border-[#D8D3CA] shadow-xs">
                  <p className="text-[#635D55] text-sm">没有找到匹配此筛选条件的项目</p>
                  <button
                    onClick={() =>
                      setFilter((prev) => ({
                        ...prev,
                        searchQuery: '',
                        providerFilter: '',
                        openSourceOnly: false,
                      }))
                    }
                    className="mt-3 px-4 py-2 bg-[#2D2A26] text-white rounded-lg text-xs font-semibold hover:bg-[#B83232] transition-colors cursor-pointer"
                  >
                    重置筛选条件
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredItems.map((item) => (
                    <ProjectCard
                      key={item.id}
                      item={item}
                      onSelect={setSelectedItem}
                      isFavorite={favorites.includes(item.id)}
                      onToggleFavorite={toggleFavorite}
                      isCompared={compareList.includes(item.id)}
                      onToggleCompare={toggleCompare}
                    />
                  ))}
                </div>
              ) : (
                <ProjectTable
                  items={filteredItems}
                  onSelect={setSelectedItem}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  compareList={compareList}
                  onToggleCompare={toggleCompare}
                />
              )}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className={`border-t border-[#D8D3CA] bg-[#FAF8F5] py-8 px-4 text-center text-xs text-[#635D55] space-y-1.5 font-sans transition-all duration-200 ${sidebarCollapsed ? 'ml-[52px]' : 'ml-[264px]'}`}>
        <p className="font-semibold text-[#2D2A26]">人形机器人开源生态导航平台 (Humanoid Open-Source Ecosystem Platform)</p>
        <p className="text-[11px] text-[#8C867E]">
          数据截至 2026 年 8 月最新整理核对版 • 支持 GitHub / HuggingFace 实时跳转与选型对比
        </p>
      </footer>

      {/* Sticky Floating Compare Trigger Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#2D2A26] text-white border border-[#524D46] shadow-2xl px-5 py-3 rounded-2xl flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-[#B83232]" />
            <span className="text-xs font-semibold">已选对比 ({compareList.length}/4)</span>
          </div>

          <div className="flex items-center gap-1.5">
            {compareList.map((id) => {
              const item = allItemMap[id];
              if (!item) return null;
              return (
                <span
                  key={id}
                  className="px-2 py-0.5 bg-[#3D3A36] text-[#D8D3CA] text-[10px] font-mono rounded truncate max-w-[100px]"
                >
                  {item.name}
                </span>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3 py-1.5 bg-[#B83232] hover:bg-[#A22B2B] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              打开横向对比表
            </button>
            <button
              onClick={() => setCompareList([])}
              className="text-xs text-[#D8D3CA] hover:text-white underline cursor-pointer"
            >
              清空
            </button>
          </div>
        </div>
      )}

      {/* Item Detail Modal */}
      <DetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isFavorite={selectedItem ? favorites.includes(selectedItem.id) : false}
        onToggleFavorite={toggleFavorite}
        allItemMap={allItemMap}
      />

      {/* Compare Modal */}
      {isCompareModalOpen && (
        <CompareModal
          items={selectedCompareItems}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveItem={(id) => setCompareList((prev) => prev.filter((i) => i !== id))}
          onSelect={(item) => {
            setIsCompareModalOpen(false);
            setSelectedItem(item);
          }}
        />
      )}

      {/* Favorites Side Drawer */}
      {isFavoritesDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#2D2A26]/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#FFFFFF] h-full p-6 border-l border-[#D8D3CA] flex flex-col justify-between overflow-y-auto text-[#2D2A26]">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#D8D3CA]">
                <div className="flex items-center gap-2 text-[#2D2A26] font-bold text-base font-editorial-serif">
                  <Star className="w-5 h-5 fill-[#B83232] text-[#B83232]" />
                  <span>我的收藏库 ({favorites.length})</span>
                </div>
                <button
                  onClick={() => setIsFavoritesDrawerOpen(false)}
                  className="p-2 bg-[#FAF8F5] text-[#2D2A26] rounded-full hover:bg-[#B83232] hover:text-white border border-[#D8D3CA] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {favorites.length === 0 ? (
                <p className="text-xs text-[#8C867E] text-center py-10">暂未收藏任何开源项目</p>
              ) : (
                <div className="space-y-3">
                  {favorites.map((id) => {
                    const item = allItemMap[id];
                    if (!item) return null;

                    return (
                      <div
                        key={id}
                        onClick={() => {
                          setIsFavoritesDrawerOpen(false);
                          setSelectedItem(item);
                        }}
                        className="p-3.5 bg-[#FAF8F5] hover:bg-[#EFECE6] border border-[#D8D3CA] hover:border-[#2D2A26] rounded-xl cursor-pointer transition-all flex items-center justify-between gap-2"
                      >
                        <div>
                          <h4 className="text-xs font-bold font-editorial-serif text-[#2D2A26]">{item.name}</h4>
                          <span className="text-[10px] text-[#B83232] font-mono uppercase font-semibold">{item.provider}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item);
                          }}
                          className="text-[#8C867E] hover:text-[#B83232] p-1 text-xs cursor-pointer font-bold"
                          title="移除收藏"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#D8D3CA]">
              <button
                onClick={() => setIsFavoritesDrawerOpen(false)}
                className="w-full py-2.5 bg-[#2D2A26] text-white rounded-xl text-xs font-semibold hover:bg-[#B83232] transition-colors cursor-pointer"
              >
                关闭面板
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
