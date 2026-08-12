import React from 'react';
import {
  Compass,
  Cpu,
  Boxes,
  Activity,
  Layers,
  BrainCircuit,
  Database,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Zap,
  Dog,
  Workflow,
  FileText,
  Wrench,
  BarChart3,
} from 'lucide-react';
import { CategoryId, EcosystemItem } from '../types';

interface OverviewViewProps {
  onNavigateCategory: (id: CategoryId) => void;
  featuredItems: EcosystemItem[];
  onSelectProject: (item: EcosystemItem) => void;
  totalCount: number;
}

const PIPELINE_STEPS = [
  {
    step: 1,
    title: '需求选型',
    subtitle: '明确目标场景 → 匹配技术栈',
    categoryId: 'wizard' as CategoryId,
    icon: Compass,
    metric: '6 种场景方案',
  },
  {
    step: 2,
    title: '硬件本体',
    subtitle: '全尺寸 / DIY / 机械臂',
    categoryId: 'full-platforms' as CategoryId,
    icon: Cpu,
    metric: '55+ 款人形平台',
  },
  {
    step: 3,
    title: '仿真建模',
    subtitle: 'MuJoCo / Isaac / URDF',
    categoryId: 'simulators' as CategoryId,
    icon: Activity,
    metric: '8 款仿真引擎',
  },
  {
    step: 4,
    title: '训练算法',
    subtitle: 'PPO / SAC / Sim2Real',
    categoryId: 'frameworks' as CategoryId,
    icon: Boxes,
    metric: '11 个训练框架',
  },
  {
    step: 5,
    title: '真机控制',
    subtitle: 'WBC / 遥操作 / 部署',
    categoryId: 'control' as CategoryId,
    icon: Layers,
    metric: '7 个控制方案',
  },
  {
    step: 6,
    title: '具身大脑',
    subtitle: 'VLA 模型 / 世界模型',
    categoryId: 'vla' as CategoryId,
    icon: BrainCircuit,
    metric: '15 个 VLA 模型',
  },
  {
    step: 7,
    title: '数据引擎',
    subtitle: '真机数据集 / 遥操作采集',
    categoryId: 'datasets' as CategoryId,
    icon: Database,
    metric: '8 个数据集',
  },
];

const QUICK_LINKS = [
  { label: '技术百科', cat: 'glossary' as CategoryId, desc: 'RL/ML/VLA 术语详解', icon: FileText },
  { label: '核心论文', cat: 'papers' as CategoryId, desc: '顶会方案索引', icon: FileText },
  { label: '发展里程碑', cat: 'timeline' as CategoryId, desc: '2024-2026', icon: Clock },
  { label: 'URDF 部署链路', cat: 'urdf-pipeline' as CategoryId, desc: '建模到真机全链路', icon: Workflow },
  { label: 'URDF 部署链路', cat: 'urdf-pipeline' as CategoryId, desc: '建模到真机', icon: Workflow },
  { label: '数据统计', cat: 'analytics' as CategoryId, desc: '生态全景分析', icon: BarChart3 },
];

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigateCategory,
  featuredItems,
  onSelectProject,
  totalCount,
}) => {
  return (
    <div className="space-y-8 font-sans">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-[#FFFFFF] border border-[#D8D3CA] rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF8F5] text-[#B83232] border border-[#D8D3CA] text-[10px] font-semibold tracking-wider uppercase mb-4 rounded">
            <Sparkles className="w-3.5 h-3.5" />
            <span>从零到一 · 人形机器人开发全流程导航</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-editorial-serif text-[#1A1816] tracking-tight leading-[1.1] mb-3">
            人形机器人<span className="italic text-[#B83232]">开源生态</span>
          </h1>

          <p className="text-sm md:text-base text-[#524D46] leading-relaxed mb-6 max-w-2xl">
            覆盖<strong className="text-[#B83232]">硬件选型 → 仿真建模 → 训练算法 → 真机部署 → VLA 大脑</strong>全链路。
            已收录 <strong className="text-[#B83232] underline underline-offset-4 decoration-[#B83232]/40">{totalCount}+ 核心资源</strong>，
            按工程开发顺序组织，每层可直接跳转查看详情与硬件规格。
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigateCategory('wizard')}
              className="px-5 py-2.5 bg-[#B83232] hover:bg-[#A22B2B] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>启动选型向导</span>
            </button>
            <button
              onClick={() => onNavigateCategory('full-platforms')}
              className="px-5 py-2.5 bg-[#2D2A26] hover:bg-[#B83232] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              <span>浏览 55+ 款硬件平台</span>
            </button>
            <button
              onClick={() => onNavigateCategory('glossary')}
              className="px-5 py-2.5 bg-[#FAF8F5] hover:bg-[#EFECE6] text-[#2D2A26] border border-[#D8D3CA] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#B83232]" />
              <span>查阅技术百科</span>
            </button>
          </div>
        </div>
      </div>

      {/* Development Pipeline */}
      <div>
        <div className="flex items-center justify-between mb-5 border-b-2 border-[#2D2A26] pb-3">
          <h2 className="text-xl sm:text-2xl font-black font-editorial-serif text-[#1A1816]">
            人形机器人开发全流程
          </h2>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B83232] bg-[#FAF8F5] border border-[#D8D3CA] px-2.5 py-1 rounded">
            ① → ⑦ PIPELINE
          </span>
        </div>

        <div className="space-y-2">
          {PIPELINE_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === PIPELINE_STEPS.length - 1;
            return (
              <div key={step.step}>
                <div
                  onClick={() => onNavigateCategory(step.categoryId)}
                  className="group flex items-center gap-4 p-4 bg-[#FFFFFF] hover:bg-[#FAF8F5] border border-[#D8D3CA] hover:border-[#2D2A26] rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  {/* Step Number */}
                  <div className="w-10 h-10 rounded-full bg-[#2D2A26] text-white flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-[#B83232] transition-colors">
                    {step.step}
                  </div>

                  {/* Icon + Content */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2 bg-[#FAF8F5] border border-[#D8D3CA] rounded-lg shrink-0 group-hover:border-[#2D2A26] transition-colors">
                      <Icon className="w-4 h-4 text-[#2D2A26]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold font-editorial-serif text-[#2D2A26] group-hover:text-[#B83232] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-[11px] text-[#635D55]">{step.subtitle}</p>
                    </div>
                  </div>

                  {/* Metric */}
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-[#B83232] bg-[#FAF8F5] border border-[#D8D3CA] px-2.5 py-1 rounded-full group-hover:bg-[#B83232] group-hover:text-white group-hover:border-[#B83232] transition-all">
                      {step.metric}
                    </span>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-4 h-4 text-[#8C867E] group-hover:text-[#B83232] group-hover:translate-x-1 transition-all shrink-0" />
                </div>

                {/* Connector line between steps */}
                {!isLast && (
                  <div className="flex justify-center py-0.5">
                    <div className="w-px h-3 bg-[#D8D3CA]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Links + Featured */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Reference Links */}
        <div>
          <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-[#2D2A26]">
            <h2 className="text-base font-black font-editorial-serif text-[#1A1816]">快速参考</h2>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {QUICK_LINKS.map((link) => {
              const LinkIcon = link.icon;
              return (
                <button
                  key={link.cat}
                  onClick={() => onNavigateCategory(link.cat)}
                  className="flex items-center gap-2 p-2.5 bg-[#FFFFFF] hover:bg-[#FAF8F5] border border-[#D8D3CA] hover:border-[#2D2A26] rounded-lg transition-all cursor-pointer text-left"
                >
                  <LinkIcon className="w-3.5 h-3.5 text-[#B83232] shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-[#2D2A26]">{link.label}</div>
                    <div className="text-[9px] text-[#8C867E]">{link.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-[#2D2A26]">
            <h2 className="text-base font-black font-editorial-serif text-[#1A1816] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B83232]" />
              2026 SOTA 精选项目
            </h2>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#B83232] bg-[#FAF8F5] border border-[#D8D3CA] px-2 py-1 rounded">
              FEATURED
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {featuredItems.slice(0, 6).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectProject(item)}
                className="p-4 bg-[#FFFFFF] hover:bg-[#FAF8F5] border border-[#D8D3CA] hover:border-[#B83232] rounded-xl transition-all cursor-pointer shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B83232] bg-[#FAF8F5] border border-[#D8D3CA] px-2 py-0.5 rounded">
                    {item.provider.split('(')[0].trim()}
                  </span>
                  <span className="text-[9px] text-[#635D55] font-mono border border-[#D8D3CA] px-1.5 py-0.5 rounded">
                    {item.license}
                  </span>
                </div>
                <h3 className="text-sm font-bold font-editorial-serif text-[#2D2A26] mb-1">{item.name}</h3>
                <p className="text-[11px] text-[#524D46] line-clamp-2 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial Note */}
      <div className="bg-[#FFFFFF] border border-[#D8D3CA] rounded-xl p-5 text-xs text-[#2D2A26] space-y-2 shadow-sm">
        <div className="flex items-center gap-2 text-[#B83232] font-semibold text-sm tracking-wider uppercase font-sans">
          <ShieldAlert className="w-4 h-4" />
          <span>开发者须知 · 2026.08 典藏版</span>
        </div>
        <p className="leading-relaxed text-[#524D46]">
          1. <strong>开发流程建议</strong>：左侧导航按从零开发顺序排列（选型 → 硬件 → 仿真 → 训练 → 控制 → VLA → 数据），建议按序查阅。
        </p>
        <p className="leading-relaxed text-[#524D46]">
          2. <strong>硬件规格</strong>：点击任意平台可查看完整硬件详情（电机型号/厂家链接/IMU/相机/接线/导航/传感器）。
        </p>
        <p className="leading-relaxed text-[#524D46]">
          3. <strong>许可证核实</strong>：商用前请务必核对 GitHub LICENSE（部分项目如 H2O/OmniH2O 采用 CC BY-NC 4.0 商业限制）。
        </p>
      </div>
    </div>
  );
};
