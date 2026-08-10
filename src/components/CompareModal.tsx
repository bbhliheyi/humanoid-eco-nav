import React from 'react';
import { X, ArrowRightLeft, ExternalLink, Github, CheckCircle2, AlertCircle } from 'lucide-react';
import { EcosystemItem } from '../types';
import { getLicenseProfile } from '../lib/licenses';

interface CompareModalProps {
  items: EcosystemItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onSelect: (item: EcosystemItem) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ items, onClose, onRemoveItem, onSelect }) => {
  if (items.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2A26]/50 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-5xl bg-[#FFFFFF] border border-[#D8D3CA] rounded-2xl p-6 md:p-8 shadow-xl max-h-[90vh] overflow-hidden flex flex-col text-[#2D2A26]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#D8D3CA]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2D2A26] text-white rounded-lg">
              <ArrowRightLeft className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-editorial-serif text-[#2D2A26]">人形机器人开源技术方案横向对比</h2>
              <p className="text-xs text-[#B83232] font-mono font-semibold uppercase tracking-wider">已选择 {items.length} 项资源对比 (最多 4 项)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-[#FAF8F5] hover:bg-[#B83232] text-[#2D2A26] hover:text-white border border-[#D8D3CA] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Compare Table */}
        <div className="overflow-x-auto flex-1 bg-[#FAF8F5] border border-[#D8D3CA] rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#D8D3CA] bg-[#2D2A26] text-white">
                <th className="py-3 px-4 font-mono font-semibold uppercase tracking-wider text-[10px] w-36">指标 / 属性</th>
                {items.map((item) => (
                  <th key={item.id} className="py-3 px-4 font-semibold min-w-[220px] relative border-l border-[#3D3A36]">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="absolute top-2.5 right-2.5 text-[#D8D3CA] hover:text-[#B83232] font-bold cursor-pointer"
                      title="移除"
                    >
                      ✕
                    </button>
                    <div className="pr-4">
                      <div className="text-sm font-editorial-serif font-bold text-white hover:text-[#B83232] cursor-pointer transition-colors" onClick={() => onSelect(item)}>
                        {item.name}
                      </div>
                      <div className="text-[10px] font-mono uppercase font-semibold text-[#D8D3CA] tracking-wider mt-0.5">{item.provider}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8D3CA] text-[#524D46]">
              {/* 开源程度 */}
              <tr>
                <td className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px] bg-[#EFECE6] text-[#2D2A26]">开源程度</td>
                {items.map((item) => (
                  <td key={item.id} className="py-3 px-4 border-l border-[#D8D3CA]">
                    {item.isOpenSource === true ? (
                      <span className="text-[#2D2A26] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B83232]" /> 完全开源
                      </span>
                    ) : item.isOpenSource === 'partial' ? (
                      <span className="text-[#B83232] font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> 部分开源
                      </span>
                    ) : (
                      <span className="text-[#635D55]">商用授权</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* 开源许可 */}
              <tr>
                <td className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px] bg-[#EFECE6] text-[#2D2A26]">开源许可 License</td>
                {items.map((item) => (
                  <td key={item.id} className="py-3 px-4 font-mono font-semibold text-[#2D2A26] border-l border-[#D8D3CA]">
                    {item.license || '未知'}
                  </td>
                ))}
              </tr>

              {/* 许可速览 */}
              <tr>
                <td className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px] bg-[#EFECE6] text-[#2D2A26]">许可速览</td>
                {items.map((item) => {
                  const p = getLicenseProfile(item.license);
                  return (
                    <td key={item.id} className="py-3 px-4 border-l border-[#D8D3CA]">
                      {p ? (
                        <div className="space-y-1.5">
                          <div>
                            <span className="text-[9px] font-bold text-[#1B5E20]">✓ 允许</span>
                            <div className="flex flex-wrap gap-1 mt-0.5">
                              {p.allows.map((a) => (
                                <span key={a} className="text-[9px] px-1.5 py-0.5 bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7] rounded">{a}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-[#E65100]">⚠ 限制</span>
                            <div className="flex flex-wrap gap-1 mt-0.5">
                              {p.restrictions.map((r) => (
                                <span key={r} className="text-[9px] px-1.5 py-0.5 bg-[#FFF3E0] text-[#E65100] border border-[#FFCC80] rounded">{r}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-[#8C867E]">未标注</span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* 成本预算 */}
              <tr>
                <td className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px] bg-[#EFECE6] text-[#2D2A26]">硬件/预算成本</td>
                {items.map((item) => (
                  <td key={item.id} className="py-3 px-4 font-semibold text-[#B83232] border-l border-[#D8D3CA]">
                    {item.cost || '未标注/软件平台'}
                  </td>
                ))}
              </tr>

              {/* 训练技术栈 */}
              <tr>
                <td className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px] bg-[#EFECE6] text-[#2D2A26]">训练技术栈</td>
                {items.map((item) => (
                  <td key={item.id} className="py-3 px-4 font-semibold border-l border-[#D8D3CA]">
                    {item.trainStack || item.modelType || '—'}
                  </td>
                ))}
              </tr>

              {/* 仿真后端 */}
              <tr>
                <td className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px] bg-[#EFECE6] text-[#2D2A26]">仿真后端</td>
                {items.map((item) => (
                  <td key={item.id} className="py-3 px-4 font-semibold text-[#2D2A26] border-l border-[#D8D3CA]">
                    {item.simBackend || '—'}
                  </td>
                ))}
              </tr>

              {/* 部署栈 */}
              <tr>
                <td className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px] bg-[#EFECE6] text-[#2D2A26]">部署栈 / 控制</td>
                {items.map((item) => (
                  <td key={item.id} className="py-3 px-4 font-semibold border-l border-[#D8D3CA]">
                    {item.deployStack || '—'}
                  </td>
                ))}
              </tr>

              {/* 核心描述 */}
              <tr>
                <td className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px] bg-[#EFECE6] text-[#2D2A26]">概要介绍</td>
                {items.map((item) => (
                  <td key={item.id} className="py-3 px-4 text-[11px] leading-relaxed text-[#524D46] border-l border-[#D8D3CA]">
                    {item.description}
                  </td>
                ))}
              </tr>

              {/* 快捷跳转 */}
              <tr>
                <td className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px] bg-[#EFECE6] text-[#2D2A26]">外部链接</td>
                {items.map((item) => (
                  <td key={item.id} className="py-3 px-4 border-l border-[#D8D3CA]">
                    <div className="flex items-center gap-2">
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 bg-[#2D2A26] text-white hover:bg-[#B83232] text-[10px] font-bold uppercase tracking-wider rounded flex items-center gap-1 transition-colors"
                        >
                          <Github className="w-3 h-3" /> GitHub
                        </a>
                      )}
                      {item.websiteUrl && (
                        <a
                          href={item.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 bg-[#B83232] text-white hover:bg-[#A22B2B] text-[10px] font-bold uppercase tracking-wider rounded flex items-center gap-1 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" /> 官网
                        </a>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

