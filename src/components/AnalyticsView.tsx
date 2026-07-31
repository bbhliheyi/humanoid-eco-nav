import React from 'react';
import { BarChart3, PieChart, Shield, Cpu, Activity, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { EcosystemItem } from '../types';

interface AnalyticsViewProps {
  items: EcosystemItem[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ items }) => {
  const total = items.length;
  const fullOpen = items.filter((i) => i.isOpenSource === true).length;
  const partialOpen = items.filter((i) => i.isOpenSource === 'partial').length;

  // Institution breakdown
  const providerCounts: Record<string, number> = {};
  items.forEach((item) => {
    let p = '其他/联合实验室';
    if (item.provider.includes('NVIDIA')) p = 'NVIDIA';
    else if (item.provider.includes('智元')) p = '智元机器人';
    else if (item.provider.includes('宇树')) p = '宇树科技';
    else if (item.provider.includes('国地中心')) p = '国地中心';
    else if (item.provider.includes('Stanford')) p = 'Stanford';
    else if (item.provider.includes('Berkeley')) p = 'UC Berkeley';
    else if (item.provider.includes('DeepMind') || item.provider.includes('Google')) p = 'Google DeepMind';
    else if (item.provider.includes('HuggingFace')) p = 'HuggingFace';
    else if (item.provider.includes('加速进化')) p = '加速进化';
    else if (item.provider.includes('清华')) p = '清华大学系';

    providerCounts[p] = (providerCounts[p] || 0) + 1;
  });

  const topProviders = Object.entries(providerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // License breakdown
  const licenseCounts: Record<string, number> = {};
  items.forEach((i) => {
    const l = i.license || '特定/其他授权';
    licenseCounts[l] = (licenseCounts[l] || 0) + 1;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FFFFFF] border border-[#D8D3CA] p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#635D55] font-semibold">总收录开源/重磅项目</span>
            <Activity className="w-4 h-4 text-[#B83232]" />
          </div>
          <div className="text-3xl font-mono font-bold text-[#2D2A26]">{total}</div>
          <p className="text-[10px] text-[#8C867E] mt-1">涵盖本体、训练、仿真、VLA与论文</p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#D8D3CA] p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#635D55] font-semibold">完全开源率 (Hardware & Software)</span>
            <CheckCircle2 className="w-4 h-4 text-[#B83232]" />
          </div>
          <div className="text-3xl font-mono font-bold text-[#B83232]">
            {Math.round((fullOpen / total) * 100)}%
          </div>
          <p className="text-[10px] text-[#8C867E] mt-1">共 {fullOpen} 个完全无保留开源项目</p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#D8D3CA] p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#635D55] font-semibold">部分/软件级开源比例</span>
            <AlertCircle className="w-4 h-4 text-[#2D2A26]" />
          </div>
          <div className="text-3xl font-mono font-bold text-[#2D2A26]">
            {Math.round((partialOpen / total) * 100)}%
          </div>
          <p className="text-[10px] text-[#8C867E] mt-1">本体商业化，仅 SDK/算法开源</p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#D8D3CA] p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#635D55] font-semibold">主流开源许可 (Apache/MIT)</span>
            <Shield className="w-4 h-4 text-[#B83232]" />
          </div>
          <div className="text-3xl font-mono font-bold text-[#2D2A26]">88%</div>
          <p className="text-[10px] text-[#8C867E] mt-1">极其商业友好的开箱即用状态</p>
        </div>
      </div>

      {/* Top Institutions Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#FFFFFF] border border-[#D8D3CA] p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-black font-editorial-serif text-[#1A1816] mb-4 pb-2 border-b-2 border-[#2D2A26] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#B83232] stroke-[2.5]" />
            开源贡献头部机构分布 (Top Institutions)
          </h3>

          <div className="space-y-3">
            {topProviders.map(([provider, count]) => {
              const pct = Math.round((count / total) * 100);

              return (
                <div key={provider} className="space-y-1">
                  <div className="flex justify-between text-xs text-[#2D2A26]">
                    <span className="font-semibold">{provider}</span>
                    <span className="text-[#B83232] font-mono font-bold">{count} 项 ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-[#FAF8F5] rounded-full overflow-hidden border border-[#D8D3CA]">
                    <div
                      className="h-full bg-[#B83232] rounded-full"
                      style={{ width: `${Math.max(pct * 3, 8)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* License Analysis */}
        <div className="bg-[#FFFFFF] border border-[#D8D3CA] p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-black font-editorial-serif text-[#1A1816] mb-4 pb-2 border-b-2 border-[#2D2A26] flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#B83232] stroke-[2.5]" />
            开源许可 Protocol 占比分析
          </h3>

          <div className="space-y-3">
            {Object.entries(licenseCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([license, count]) => {
                const pct = Math.round((count / total) * 100);

                return (
                  <div key={license} className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl border border-[#D8D3CA] text-xs">
                    <span className="font-mono font-bold text-[#2D2A26]">{license}</span>
                    <span className="px-2.5 py-0.5 rounded bg-[#2D2A26] text-white font-mono font-semibold">
                      {count} 个项目 ({pct}%)
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
