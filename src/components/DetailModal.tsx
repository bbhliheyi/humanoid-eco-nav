import React, { useState } from 'react';
import {
  X,
  Github,
  ExternalLink,
  Star,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  Copy,
  Check,
  DollarSign,
  Tag,
  ShieldCheck,
  ShieldAlert,
  FileText,
} from 'lucide-react';
import { EcosystemItem } from '../types';

interface DetailModalProps {
  item: EcosystemItem | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (item: EcosystemItem) => void;
  allItemMap: Record<string, EcosystemItem>;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  item,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleCopyLink = () => {
    const text = `${item.name} (${item.provider})\nGitHub: ${item.githubUrl || 'N/A'}\n官网: ${
      item.websiteUrl || 'N/A'
    }\n许可证: ${item.license || 'N/A'}\n许可详情: ${item.licenseDetail || 'N/A'}\n简介: ${item.description}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOpen = item.isOpenSource === true;
  const isPartial = item.isOpenSource === 'partial';

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 bg-[#2D2A26]/60 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div
        className="relative w-full max-w-[95vw] xl:max-w-[90vw] bg-[#FFFFFF] border border-[#D8D3CA] rounded-2xl p-5 md:p-8 shadow-2xl my-2 font-sans text-[#2D2A26]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 bg-[#FAF8F5] hover:bg-[#B83232] text-[#2D2A26] hover:text-white border border-[#D8D3CA] rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Status Header */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {isOpen ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[#2D2A26] text-white rounded">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" /> 完全开源
            </span>
          ) : isPartial ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[#FAF8F5] text-[#B83232] border border-[#B83232] rounded">
              <AlertCircle className="w-3.5 h-3.5 text-[#B83232]" /> 部分开源 / 框架闭源
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[#FAF8F5] text-[#635D55] border border-[#D8D3CA] rounded">
              商业/特定授权
            </span>
          )}

          {item.license && (
            <span className="px-2.5 py-1 text-xs bg-[#FAF8F5] text-[#2D2A26] font-mono border border-[#D8D3CA] uppercase font-semibold rounded">
              <ShieldCheck className="w-3.5 h-3.5 inline mr-1 text-[#B83232]" />
              {item.license}
            </span>
          )}
        </div>

        {/* Title & Provider */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-editorial-serif text-[#1A1816] mb-1.5 leading-tight">{item.name}</h2>
        <div className="flex items-center gap-2 text-sm text-[#B83232] font-mono font-bold uppercase tracking-wider mb-5">
          <span>{item.provider}</span>
          {item.releaseDate && (
            <span className="text-xs text-[#8C867E] font-normal font-mono">
              • 发布/核对日期: {item.releaseDate}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="bg-[#FAF8F5] p-4 border border-[#D8D3CA] rounded-xl text-[#524D46] text-xs sm:text-sm leading-relaxed mb-6 font-sans">
          {item.description}
        </div>

        {/* 许可详情 */}
        {item.licenseDetail && (
          <div className="mb-6 border border-[#D8D3CA] rounded-xl overflow-hidden">
            <div className="bg-[#2D2A26] text-white px-4 py-2.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B83232]" />
              <h3 className="text-xs font-bold uppercase tracking-wider">许可详情</h3>
              {item.license && (
                <span className="ml-auto text-[10px] font-mono text-[#D8D3CA] uppercase">{item.license}</span>
              )}
            </div>
            <div className="p-4 bg-[#FAF8F5]">
              <p className="text-xs text-[#524D46] leading-relaxed whitespace-pre-line">{item.licenseDetail}</p>
            </div>
          </div>
        )}

        {/* Detailed Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {item.cost && (
            <div className="bg-[#FAF8F5] p-3.5 border border-[#D8D3CA] rounded-xl">
              <span className="text-xs text-[#635D55] font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-[#B83232]" /> 成本预算
              </span>
              <p className="text-sm font-semibold text-[#2D2A26]">{item.cost}</p>
            </div>
          )}

          {item.trainStack && (
            <div className="bg-[#FAF8F5] p-3.5 border border-[#D8D3CA] rounded-xl">
              <span className="text-xs text-[#635D55] font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Cpu className="w-3.5 h-3.5 text-[#B83232]" /> 训练技术栈
              </span>
              <p className="text-xs font-semibold text-[#2D2A26]">{item.trainStack}</p>
            </div>
          )}

          {item.simBackend && (
            <div className="bg-[#FAF8F5] p-3.5 border border-[#D8D3CA] rounded-xl">
              <span className="text-xs text-[#635D55] font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Layers className="w-3.5 h-3.5 text-[#B83232]" /> 仿真后端
              </span>
              <p className="text-xs font-semibold text-[#2D2A26]">{item.simBackend}</p>
            </div>
          )}

          {item.deployStack && (
            <div className="bg-[#FAF8F5] p-3.5 border border-[#D8D3CA] rounded-xl">
              <span className="text-xs text-[#635D55] font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Cpu className="w-3.5 h-3.5 text-[#B83232]" /> 部署栈/通信
              </span>
              <p className="text-xs font-semibold text-[#2D2A26]">{item.deployStack}</p>
            </div>
          )}

          {item.hardwareOpenSource && (
            <div className="bg-[#FAF8F5] p-3.5 border border-[#D8D3CA] rounded-xl col-span-1 sm:col-span-2">
              <span className="text-xs text-[#635D55] font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Tag className="w-3.5 h-3.5 text-[#B83232]" /> 硬件开源范围
              </span>
              <p className="text-xs font-semibold text-[#2D2A26]">{item.hardwareOpenSource}</p>
            </div>
          )}

          {item.scale && (
            <div className="bg-[#FAF8F5] p-3.5 border border-[#D8D3CA] rounded-xl">
              <span className="text-xs text-[#635D55] font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <FileText className="w-3.5 h-3.5 text-[#B83232]" /> 数据集规模
              </span>
              <p className="text-xs font-semibold text-[#B83232]">{item.scale}</p>
            </div>
          )}

          {item.modelType && (
            <div className="bg-[#FAF8F5] p-3.5 border border-[#D8D3CA] rounded-xl">
              <span className="text-xs text-[#635D55] font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Cpu className="w-3.5 h-3.5 text-[#B83232]" /> 模型类型
              </span>
              <p className="text-xs font-semibold text-[#B83232]">{item.modelType}</p>
            </div>
          )}
        </div>

        {/* Key Features Bullet list */}
        {item.keyFeatures && item.keyFeatures.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-mono font-extrabold text-[#B83232] uppercase tracking-wider mb-3 pb-1 border-b border-[#D8D3CA] flex items-center gap-1.5">
              <span>● 核心亮点与特性</span>
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2D2A26]">
              {item.keyFeatures.map((feat, i) => (
                <li key={i} className="flex items-center gap-2 bg-[#FAF8F5] px-3 py-2 rounded-lg border border-[#D8D3CA]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B83232]" />
                  <span className="text-[#524D46] font-medium">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 开源架构与链路 */}
        {item.techArchitecture && (
          <div className="mb-6 border border-[#D8D3CA] rounded-xl overflow-hidden">
            <div className="bg-[#2D2A26] text-white px-4 py-2.5 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#B83232]" />
              <h3 className="text-xs font-bold uppercase tracking-wider">开源架构与部署链路</h3>
            </div>
            <div className="p-4 space-y-3 bg-[#FAF8F5]">
              <p className="text-xs text-[#524D46] leading-relaxed bg-[#FFFFFF] border border-[#D8D3CA] rounded-lg p-3">
                {item.techArchitecture.overview}
              </p>

              <div>
                <h4 className="text-[10px] font-bold text-[#B83232] uppercase mb-1.5">技术链路</h4>
                <div className="space-y-1">
                  {item.techArchitecture.pipeline.map((step, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] bg-[#FFFFFF] border border-[#D8D3CA] rounded-lg p-2">
                      <span className="w-5 h-5 rounded-full bg-[#2D2A26] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-[#2D2A26]">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.techArchitecture.softwareStack && (
                  <div className="bg-[#FFFFFF] p-2.5 rounded-lg border border-[#D8D3CA]">
                    <span className="text-[9px] font-bold text-[#B83232] uppercase">软件栈</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.techArchitecture.softwareStack.map((s, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 bg-[#FAF8F5] border border-[#D8D3CA] rounded text-[#2D2A26]">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {item.techArchitecture.rendering && (
                  <div className="bg-[#FFFFFF] p-2.5 rounded-lg border border-[#D8D3CA]">
                    <span className="text-[9px] font-bold text-[#B83232] uppercase">渲染</span>
                    <p className="text-[11px] text-[#2D2A26] mt-0.5">{item.techArchitecture.rendering}</p>
                  </div>
                )}
                <div className="bg-[#FFFFFF] p-2.5 rounded-lg border border-[#D8D3CA]">
                  <span className="text-[9px] font-bold text-[#B83232] uppercase">仿真器</span>
                  <p className="text-[11px] font-semibold text-[#2D2A26] mt-0.5">{item.techArchitecture.simulator}</p>
                </div>
                <div className="bg-[#FFFFFF] p-2.5 rounded-lg border border-[#D8D3CA]">
                  <span className="text-[9px] font-bold text-[#B83232] uppercase">系统/ROS</span>
                  <p className="text-[11px] font-semibold text-[#2D2A26] mt-0.5">{item.techArchitecture.system}</p>
                </div>
              </div>

              <div className="bg-[#FFFFFF] p-2.5 rounded-lg border border-[#D8D3CA]">
                <span className="text-[9px] font-bold text-[#B83232] uppercase">架构模式</span>
                <p className="text-[11px] text-[#2D2A26] mt-0.5">{item.techArchitecture.architecturePattern}</p>
              </div>

              <div>
                <span className="text-[9px] font-bold text-[#B83232] uppercase">核心算法</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.techArchitecture.algorithms.map((a, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 bg-[#2D2A26] text-white rounded">{a}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hardware Specifications */}
        {item.hardwareSpecs && (
          <div className="mb-6 border border-[#D8D3CA] rounded-xl overflow-hidden">
            <div className="bg-[#2D2A26] text-white px-4 py-2.5 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#B83232]" />
              <h3 className="text-xs font-bold uppercase tracking-wider">硬件规格详解</h3>
              <span className="text-[10px] text-[#D8D3CA] ml-auto font-mono">
                {item.hardwareSpecs.dof}DoF | {item.hardwareSpecs.height} | {item.hardwareSpecs.weight}
              </span>
            </div>
            <div className="p-4 space-y-3 bg-[#FAF8F5]">
              {/* Layer 1: 驱动关节 */}
              {item.hardwareSpecs.motors && item.hardwareSpecs.motors.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#2D2A26] mb-2 pb-1 border-b-2 border-[#B83232] inline-block">
                    ⚙️ 驱动关节与电机
                  </h4>
                  <div className="overflow-x-auto mt-2">
                    <table className="w-full text-[10px] border-collapse border border-[#D8D3CA] rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-[#2D2A26] text-white">
                          <th className="text-left p-1.5 font-bold">关节位置</th>
                          <th className="text-left p-1.5 font-bold">电机类型</th>
                          <th className="text-left p-1.5 font-bold">型号</th>
                          <th className="text-left p-1.5 font-bold">厂家</th>
                          <th className="text-left p-1.5 font-bold">扭矩</th>
                          <th className="text-left p-1.5 font-bold">控制</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.hardwareSpecs.motors.map((m, i) => (
                          <tr key={i} className={`border-b border-[#D8D3CA]/50 ${i % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#FAF8F5]'}`}>
                            <td className="p-1.5 font-semibold text-[#2D2A26] text-[11px]">{m.location}</td>
                            <td className="p-1.5 text-[#524D46]">{m.type}</td>
                            <td className="p-1.5 text-[#524D46] font-mono text-[9px]">{m.model || '-'}</td>
                            <td className="p-1.5">
                              {m.manufacturerUrl ? (
                                <a href={m.manufacturerUrl} target="_blank" rel="noopener noreferrer" className="text-[#B83232] hover:underline font-semibold inline-flex items-center gap-0.5">
                                  {m.manufacturer || '-'} <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              ) : (
                                <span className="text-[#524D46]">{m.manufacturer || '-'}</span>
                              )}
                            </td>
                            <td className="p-1.5 text-[#B83232] font-bold">{m.torque || '-'}</td>
                            <td className="p-1.5 text-[#524D46] text-[9px]">{m.controlMode || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Layer 2: 计算与电子 */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#2D2A26] mb-2 pb-1 border-b-2 border-[#B83232] inline-block">
                  🖥️ 计算与电子系统
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {item.hardwareSpecs.computeModule && (
                    <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#D8D3CA]">
                      <span className="text-[9px] font-bold text-[#B83232] uppercase">主控/计算模块</span>
                      <p className="text-[11px] font-semibold text-[#2D2A26] mt-1">{item.hardwareSpecs.computeModule}</p>
                      {item.hardwareSpecs.computeRef && (
                        <a href={item.hardwareSpecs.computeRef.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#B83232] hover:underline mt-0.5 inline-flex items-center gap-0.5">
                          {item.hardwareSpecs.computeRef.manufacturer} <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {item.hardwareSpecs.computeRef?.note && (
                        <p className="text-[9px] text-[#8C867E] mt-0.5">{item.hardwareSpecs.computeRef.note}</p>
                      )}
                    </div>
                  )}
                  {item.hardwareSpecs.imu && (
                    <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#D8D3CA]">
                      <span className="text-[9px] font-bold text-[#B83232] uppercase">IMU 惯性测量单元</span>
                      <p className="text-[11px] font-semibold text-[#2D2A26] mt-1">{item.hardwareSpecs.imu}</p>
                      {item.hardwareSpecs.imuRef && (
                        <a href={item.hardwareSpecs.imuRef.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#B83232] hover:underline mt-0.5 inline-flex items-center gap-0.5">
                          {item.hardwareSpecs.imuRef.manufacturer} <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  )}
                  {item.hardwareSpecs.powerSupply && (
                    <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#D8D3CA]">
                      <span className="text-[9px] font-bold text-[#B83232] uppercase">电源系统</span>
                      <p className="text-[11px] font-semibold text-[#2D2A26] mt-1">{item.hardwareSpecs.powerSupply}</p>
                      {item.hardwareSpecs.batteryRef && (
                        <a href={item.hardwareSpecs.batteryRef.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#B83232] hover:underline mt-0.5 inline-flex items-center gap-0.5">
                          {item.hardwareSpecs.batteryRef.manufacturer} <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  )}
                  {item.hardwareSpecs.controllers && (
                    <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#D8D3CA]">
                      <span className="text-[9px] font-bold text-[#B83232] uppercase">控制手柄/遥控</span>
                      <p className="text-[11px] font-semibold text-[#2D2A26] mt-1">{item.hardwareSpecs.controllers}</p>
                    </div>
                  )}
                  {item.hardwareSpecs.communication && (
                    <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#D8D3CA] sm:col-span-2">
                      <span className="text-[9px] font-bold text-[#B83232] uppercase">通信协议</span>
                      <p className="text-[11px] font-semibold text-[#2D2A26] mt-1">{item.hardwareSpecs.communication}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Layer 3: 结构与感知 */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#2D2A26] mb-2 pb-1 border-b-2 border-[#B83232] inline-block">
                  🔩 结构、感知与制造
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {item.hardwareSpecs.materials && (
                    <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#D8D3CA]">
                      <span className="text-[9px] font-bold text-[#B83232] uppercase">结构材料</span>
                      <p className="text-[11px] font-semibold text-[#2D2A26] mt-1">{item.hardwareSpecs.materials}</p>
                    </div>
                  )}
                  {item.hardwareSpecs.manufacturingMethod && (
                    <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#D8D3CA]">
                      <span className="text-[9px] font-bold text-[#B83232] uppercase">制造方式</span>
                      <p className="text-[11px] font-semibold text-[#2D2A26] mt-1">{item.hardwareSpecs.manufacturingMethod}</p>
                    </div>
                  )}
                  {item.hardwareSpecs.layoutDescription && (
                    <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#D8D3CA] sm:col-span-2">
                      <span className="text-[9px] font-bold text-[#B83232] uppercase">结构布局</span>
                      <p className="text-[11px] text-[#524D46] mt-1 leading-relaxed">{item.hardwareSpecs.layoutDescription}</p>
                    </div>
                  )}
                  {item.hardwareSpecs.wiringMethod && (
                    <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#D8D3CA] sm:col-span-2">
                      <span className="text-[9px] font-bold text-[#B83232] uppercase">接线布线方式</span>
                      <p className="text-[11px] text-[#524D46] mt-1 leading-relaxed">{item.hardwareSpecs.wiringMethod}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Layer 4: 感知传感器 */}
              {(item.hardwareSpecs.cameraSetup || item.hardwareSpecs.lidar || item.hardwareSpecs.navigationMethod || (item.hardwareSpecs.sensorSuite && item.hardwareSpecs.sensorSuite.length > 0)) && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#2D2A26] mb-2 pb-1 border-b-2 border-[#B83232] inline-block">
                    📷 感知与传感器
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {item.hardwareSpecs.cameraSetup && (
                      <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#D8D3CA]">
                        <span className="text-[9px] font-bold text-[#B83232] uppercase">相机方案</span>
                        <p className="text-[11px] font-semibold text-[#2D2A26] mt-1">
                          {item.hardwareSpecs.cameraSetup.type} × {item.hardwareSpecs.cameraSetup.quantity}
                          {item.hardwareSpecs.cameraSetup.resolution ? ` @${item.hardwareSpecs.cameraSetup.resolution}` : ''}
                        </p>
                        <p className="text-[10px] text-[#635D55] mt-0.5">{item.hardwareSpecs.cameraSetup.layout}</p>
                      </div>
                    )}
                    {item.hardwareSpecs.navigationMethod && (
                      <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#D8D3CA]">
                        <span className="text-[9px] font-bold text-[#B83232] uppercase">导航方案</span>
                        <p className="text-[11px] text-[#524D46] mt-1 leading-relaxed">{item.hardwareSpecs.navigationMethod}</p>
                      </div>
                    )}
                    {item.hardwareSpecs.lidar && (
                      <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#D8D3CA]">
                        <span className="text-[9px] font-bold text-[#B83232] uppercase">LiDAR / 雷达</span>
                        <p className="text-[11px] font-semibold text-[#2D2A26] mt-1">{item.hardwareSpecs.lidar}</p>
                      </div>
                    )}
                    {item.hardwareSpecs.coolingMethod && (
                      <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#D8D3CA]">
                        <span className="text-[9px] font-bold text-[#B83232] uppercase">散热方式</span>
                        <p className="text-[11px] font-semibold text-[#2D2A26] mt-1">{item.hardwareSpecs.coolingMethod}</p>
                      </div>
                    )}
                  </div>
                  {item.hardwareSpecs.sensorSuite && item.hardwareSpecs.sensorSuite.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.hardwareSpecs.sensorSuite.map((s, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 bg-[#FFFFFF] border border-[#D8D3CA] rounded text-[#524D46]">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Emergency Stop */}
              {item.hardwareSpecs.emergencyStop && (
                <div className="bg-[#FFF5F5] border border-[#B83232]/20 rounded-lg p-3 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#B83232] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#B83232]">急停方案：</span>
                    <span className="text-xs text-[#524D46]">{item.hardwareSpecs.emergencyStop}</span>
                  </div>
                </div>
              )}

              {/* Layer 5: 外部组件供应商 */}
              {item.hardwareSpecs.componentRefs && item.hardwareSpecs.componentRefs.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#2D2A26] mb-2 pb-1 border-b-2 border-[#B83232] inline-block">
                    📦 关键外购组件与供应商
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {item.hardwareSpecs.componentRefs.map((c, i) => (
                      <div key={i} className="bg-[#FFFFFF] p-2.5 rounded-lg border border-[#D8D3CA] flex items-start gap-2">
                        <span className="text-[10px] font-bold text-[#2D2A26] shrink-0">{c.name}</span>
                        <div className="text-[10px] text-[#524D46]">
                          <span>{c.manufacturer}</span>
                          {c.url && (
                            <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-[#B83232] hover:underline ml-1 inline-flex items-center gap-0.5">
                              官网 <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                          {c.note && <p className="text-[9px] text-[#8C867E] mt-0.5">{c.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Official Resources */}
              {item.hardwareSpecs.officialResources && item.hardwareSpecs.officialResources.length > 0 && (
                <div className="pt-2 border-t border-[#D8D3CA]">
                  <h4 className="text-[10px] font-bold text-[#B83232] uppercase mb-2">🔗 平台官方资源</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.hardwareSpecs.officialResources.map((r, i) => (
                      <a
                        key={i}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[10px] px-2.5 py-1.5 bg-[#2D2A26] hover:bg-[#B83232] text-white rounded-lg font-semibold transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {r.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {item.tags.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 bg-[#FAF8F5] text-[#635D55] border border-[#D8D3CA] rounded uppercase font-semibold tracking-wider"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#D8D3CA]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(item)}
              className={`flex items-center gap-1.5 px-4 py-2 border rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-[#B83232] text-white border-[#B83232]'
                  : 'bg-[#FAF8F5] text-[#2D2A26] border-[#D8D3CA] hover:bg-[#EFECE6]'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-white text-white' : ''}`} />
              <span>{isFavorite ? '已收藏' : '加入收藏'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#FAF8F5] text-[#2D2A26] border border-[#D8D3CA] rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#EFECE6] transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#B83232]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '已复制' : '复制基本信息'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {item.githubUrl && (
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2D2A26] hover:bg-[#B83232] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub 仓库</span>
              </a>
            )}

            {item.websiteUrl && (
              <a
                href={item.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#B83232] hover:bg-[#A22B2B] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
              >
                <span>访问官网/论文</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

