import React from 'react';
import { Compass, Cpu, Activity, Boxes, Layers, BrainCircuit, Database, ShieldAlert, Clock, Target, Zap } from 'lucide-react';
import { CategoryId } from '../types';

interface Props {
  onNavigate: (id: CategoryId) => void;
}

const phases = [
  {
    num: '0',
    title: '需求冻结与架构设计',
    duration: '1-2 周',
    icon: Target,
    goal: '在写任何代码前，回答三个问题：做什么？用什么做？怎么验证？',
    deliverables: [
      { name: 'PRD 产品需求文档', detail: '任务场景、性能指标（速度/精度/续航）、环境约束。指标必须可量化' },
      { name: '系统架构图', detail: '计算拓扑、通信协议、传感器配置、供电方案。明确单点故障在哪' },
      { name: '接口契约', detail: 'Topic/Service/Action 清单、CAN-FD 帧定义。仿真和真机必须共用同一套接口' },
      { name: '风险评估表', detail: '技术风险（电机选型错误）、进度风险、成本风险。最坏情况下降级方案' },
    ],
    decisions: [
      '算力分布：边缘（Jetson）vs 云端（GPU）vs 混合（VLA 云端 + 控制本体）',
      '通信主干：ROS2 DDS（CycloneDDS/FastDDS）vs CAN-FD + 以太网混合',
      '仿真策略：Isaac Sim（高保真）vs Genesis（快速迭代）vs Gazebo（ROS 原生）',
    ],
    pitfall: '跳过 Phase 0 直接买电机，3 个月后发现算力不够、通信延迟超标、传感器视角冲突。',
    links: [{ label: '选型指南', cat: 'wizard' as CategoryId }],
  },
  {
    num: '1',
    title: '数字孪生与仿真验证',
    duration: '4-8 周',
    icon: Activity,
    goal: '在硬件到货前，让机器人在仿真中活起来。算法层代码零修改即可切换到真机。',
    deliverables: [
      { name: 'URDF 精标定', detail: 'CAD → 质量/惯性/碰撞盒。W1 完成物理正确的 xacro 文件' },
      { name: 'HAL 仿真后端', detail: 'ros2_control + Gazebo/Isaac Sim 插件。理想电机模型 + 传感器噪声' },
      { name: '单关节轨迹跟踪', detail: 'PID/阻抗控制，位置误差 < 0.01 rad（W3）' },
      { name: '全身零力矩位姿', detail: '重力补偿，各关节力矩与理论值误差 < 10%（W4）' },
      { name: '行走/操作基线', detail: '开源 RL 算法，仿真中稳定行走 10s 以上（W5）' },
      { name: 'Sim-to-Sim 校验', detail: 'Isaac → MuJoCo，同一策略在两个仿真器表现一致（W7）' },
      { name: 'Sim-to-Real 预演', detail: '域随机化 + 噪声注入 + 电机动力学模型。策略对参数扰动鲁棒（W8）' },
    ],
    pitfall: '仿真用理想电机模型，真机电机有延迟和背隙，策略迁移后震荡。必须在仿真中加入电机动力学模型（一阶延迟 + 静摩擦 + 齿隙）。',
    links: [
      { label: '仿真引擎', cat: 'simulators' as CategoryId },
      { label: 'URDF 部署链路', cat: 'urdf-pipeline' as CategoryId },
      { label: '训练框架', cat: 'frameworks' as CategoryId },
      { label: '技术百科', cat: 'glossary' as CategoryId },
    ],
  },
  {
    num: '2',
    title: '硬件集成与驱动开发',
    duration: '4-6 周（与 Phase 1 并行）',
    icon: Cpu,
    goal: '让每一块硬件都能被软件看见和控制。',
    deliverables: [
      { name: '电源系统调试', detail: '上电时序 + 急停链。急停按钮全链路测试通过（W1）' },
      { name: '单电机调试', detail: 'CAN-FD 通信 + 编码器反馈 + PID 整定。单关节正弦跟踪误差 < 0.05 rad（W2）' },
      { name: '全关节联调', detail: '自动标定（零点/限位/方向）→ calibration_result.yaml（W3）' },
      { name: '传感器链路', detail: 'IMU + 相机 + LiDAR 数据通路打通（W4）' },
      { name: 'HAL 真机后端', detail: 'CAN-FD 收发 → real_backend.cpp（W5）' },
      { name: '硬件在环测试', detail: '仿真算法 + 真机执行器。单腿站立，仿真/真机力矩对比（W6）' },
    ],
    keyDocs: [
      'CAN_FD_PROTOCOL.md：帧 ID、字节序、超时机制、CRC 校验',
      'SAFETY_PROCEDURE.md：上电流程、急停测试、故障恢复',
      'CALIBRATION_LOG.md：每个关节的零点、正方向、行程范围',
    ],
    pitfall: '电机驱动调通后直接跑全身控制，结果正方向反了或零点偏移导致机器人自毁。必须先做单关节标定，再逐步扩展到全身。',
    links: [
      { label: '硬件平台', cat: 'platforms' as CategoryId },
      { label: '技术百科（硬件）', cat: 'glossary' as CategoryId },
    ],
  },
  {
    num: '3',
    title: '算法层开发',
    duration: '8-12 周（与 Phase 2 并行）',
    icon: BrainCircuit,
    goal: '让机器人聪明起来。以仿真数据为主，真机数据为辅。算法层绝不直接操作硬件，只通过 HAL 接口交互。',
    deliverables: [
      { name: '视觉感知', detail: 'YOLOv8/RT-DETR 目标检测 mAP>0.85，LingBot-Depth/ZoeDepth 深度 RMSE<5cm' },
      { name: 'SLAM 定位', detail: 'LingBot-Map/FAST-LIO2，万帧 ATE < 1% 轨迹长度' },
      { name: 'WBC 全身控制', detail: 'Pinocchio + QP 求解器，质心跟踪误差 < 1cm' },
      { name: 'MPC 模型预测控制', detail: 'OCS2/acados，行走能耗优化 > 15%' },
      { name: 'VLA 基座模型', detail: 'LingBot-VLA 2.0 / GR00T N1.7，仿真任务成功率 > 80%' },
      { name: '后训练', detail: 'LeRobot v3.0 + LoRA，新任务 < 1000 样本' },
      { name: '动作映射', detail: '55 维标准空间 → 本体子集，映射无遗漏无冲突' },
    ],
    pitfall: '跳过感知直接上 VLA，结果模型对光照变化和遮挡毫无鲁棒性。感知是 VLA 的底座，底座不稳上层必塌。',
    links: [
      { label: 'VLA 模型', cat: 'vla' as CategoryId },
      { label: '控制方案', cat: 'control' as CategoryId },
      { label: '训练数据集', cat: 'datasets' as CategoryId },
      { label: '技术百科（算法）', cat: 'glossary' as CategoryId },
    ],
  },
  {
    num: '4',
    title: '系统集成与 Sim-to-Real',
    duration: '4-6 周',
    icon: Zap,
    goal: '把仿真中跑通的算法，无缝迁移到真机。仿真策略成功率 90% → 域随机化 70% → 真机微调 85%。',
    deliverables: [
      { name: '硬件在环 HIL', detail: '仿真算法 + 真机执行器，传感器用仿真。力矩曲线与仿真一致' },
      { name: '传感器对齐', detail: '真机相机/LiDAR/IMU 数据与仿真标定对齐。外参误差 < 1mm/0.1°' },
      { name: '域迁移', detail: '仿真策略在真机零样本测试。行走不跌倒，操作不碰撞' },
      { name: '真机数据采集', detail: '遥操作/动捕/自动探索 → LeRobot v3.0 格式，> 100 条轨迹' },
      { name: '真机微调', detail: 'Post-Training，任务成功率从 30% 提升到 80%' },
      { name: '长程任务测试', detail: '连续执行 5 个子任务，无人工干预' },
    ],
    pitfall: '仿真中视觉策略完美，真机因为光照变化或相机白平衡导致检测失败。必须在仿真中加入域随机化（颜色抖动、光照变化、纹理替换）。',
    links: [
      { label: 'Sim2Real 技术百科', cat: 'glossary' as CategoryId },
      { label: '仿真引擎', cat: 'simulators' as CategoryId },
    ],
  },
  {
    num: '5',
    title: '测试与迭代',
    duration: '持续',
    icon: ShieldAlert,
    goal: '让机器人从能跑变成可靠。',
    deliverables: [
      { name: '疲劳测试', detail: '连续运行 8h，无内存泄漏、无通信超时、关节温升 < 20°C' },
      { name: '边界测试', detail: '极限位姿、最大负载、最小电量。不触发急停、力矩不超限' },
      { name: '故障注入', detail: '单关节掉线、传感器失效、通信丢包。Graceful 降级（单腿行走变站立）' },
      { name: '人机交互', detail: '语音指令、手势识别、碰撞响应。延迟 < 500ms，碰撞力 < 50N' },
    ],
    dataLoop: '真机运行 → 数据采集 → 自动标注 → 模型更新 → 仿真验证 → OTA 部署 → 回到真机运行（闭环）',
    links: [
      { label: '数据集', cat: 'datasets' as CategoryId },
      { label: '论文（测试基准）', cat: 'papers' as CategoryId },
    ],
  },
  {
    num: '6',
    title: '部署与维护',
    duration: '持续',
    icon: Compass,
    goal: '容器化部署 + OTA 更新 + 监控告警 + 版本管理。',
    deliverables: [
      { name: '容器化', detail: 'Docker 镜像包含全部依赖，现场一键部署' },
      { name: 'OTA 更新', detail: '模型权重 + 固件远程升级，支持回滚' },
      { name: '监控告警', detail: '关节温度、电流、通信延迟实时上报' },
      { name: '日志系统', detail: '结构化日志（ROS bag + 文本），支持事后复盘' },
      { name: '版本管理', detail: '固件版本、模型版本、URDF 版本一一对应' },
    ],
    links: [
      { label: 'URDF 部署链路', cat: 'urdf-pipeline' as CategoryId },
    ],
  },
];

export const DevelopmentGuide: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="space-y-6 font-sans">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[#FFFFFF] border border-[#D8D3CA] rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAF8F5] text-[#B83232] border border-[#D8D3CA] text-[10px] font-semibold tracking-wider uppercase mb-4 rounded">
          <Target className="w-3.5 h-3.5" />
          <span>从零到一 · 全栈人形机器人开发方法论</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-editorial-serif text-[#1A1816] tracking-tight leading-[1.1] mb-3">
          开发全流程<span className="italic text-[#B83232]">总纲指南</span>
        </h1>
        <p className="text-sm text-[#524D46] leading-relaxed max-w-3xl">
          覆盖从需求冻结到量产维护的完整生命周期。每个阶段标注准入条件、交付物检查点和常见陷阱。
          左侧导航提供按阶段组织的开源资源，可直接跳转查看每个环节可用的工具和技术方案。
        </p>
      </div>

      {/* Timeline Overview */}
      <div className="bg-[#FFFFFF] border border-[#D8D3CA] rounded-xl p-6 overflow-x-auto">
        <h2 className="text-lg font-black font-editorial-serif text-[#1A1816] mb-4">全栈开发时间线</h2>
        <div className="flex items-end gap-1 min-w-[800px] h-32 text-[10px] font-mono font-bold">
          {['P0:架构', 'P1:仿真', 'P2:硬件', 'P3:算法', 'P4:S2R', 'P5:测试', 'P6:部署'].map((label, i) => {
            const starts = [0, 1, 1.5, 1.5, 3.5, 5.5, 6.5];
            const ends = [1, 3, 4, 5, 6, 7.5, 8];
            const colors = ['bg-[#2D2A26]', 'bg-[#B83232]', 'bg-[#635D55]', 'bg-[#B83232]', 'bg-[#2D2A26]', 'bg-[#635D55]', 'bg-[#8C867E]'];
            return (
              <div key={label} className="flex-1 flex flex-col items-center">
                <div className="text-[#2D2A26] mb-1 text-center">{label}</div>
                <div className={`w-full ${colors[i]} rounded-sm`} style={{ height: `${(ends[i] - starts[i]) * 12}px`, marginTop: `${starts[i] * 12}px` }} />
                <div className="text-[#8C867E] mt-1">M{starts[i]}-M{ends[i]}</div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-[#8C867E] mt-2 text-center">
          Phase 1（仿真）和 Phase 2（硬件）必须并行推进。等硬件全部调通再写算法，周期至少延长 3 个月。
        </p>
      </div>

      {/* Phase Cards */}
      <div className="space-y-4">
        {phases.map((phase) => {
          const PhaseIcon = phase.icon;
          return (
            <div key={phase.num} className="bg-[#FFFFFF] border border-[#D8D3CA] rounded-xl overflow-hidden shadow-sm">
              {/* Phase Header */}
              <div className="flex items-start gap-4 p-5 border-b border-[#D8D3CA] bg-[#FAF8F5]/50">
                <div className="w-12 h-12 rounded-xl bg-[#2D2A26] text-white flex items-center justify-center font-black text-lg shrink-0">
                  {phase.num}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="text-xl font-black font-editorial-serif text-[#1A1816]">{phase.title}</h2>
                    <span className="text-xs font-mono text-[#B83232] bg-[#EFECE6] px-2 py-0.5 rounded-full font-bold">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-sm text-[#524D46]">
                    <span className="text-[#B83232] font-bold">目标：</span>{phase.goal}
                  </p>
                </div>
              </div>

              {/* Deliverables */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-[#2D2A26] mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#B83232]" /> 交付物与检查点
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {phase.deliverables.map((d, i) => (
                      <div key={i} className="bg-[#FAF8F5] border border-[#D8D3CA] rounded-lg p-3">
                        <div className="text-xs font-bold text-[#2D2A26] mb-0.5">{d.name}</div>
                        <div className="text-[11px] text-[#635D55] leading-relaxed">{d.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Decisions / Docs */}
                {phase.decisions && (
                  <div>
                    <h3 className="text-sm font-bold text-[#2D2A26] mb-2">关键决策</h3>
                    <ul className="space-y-1">
                      {phase.decisions.map((d, i) => (
                        <li key={i} className="text-xs text-[#524D46] flex items-start gap-2">
                          <span className="text-[#B83232] font-bold mt-0.5">•</span> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {phase.keyDocs && (
                  <div>
                    <h3 className="text-sm font-bold text-[#2D2A26] mb-2">关键文档</h3>
                    <ul className="space-y-1">
                      {phase.keyDocs.map((d, i) => (
                        <li key={i} className="text-xs text-[#524D46] font-mono flex items-start gap-2">
                          <span className="text-[#B83232] font-bold mt-0.5">•</span> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {phase.dataLoop && (
                  <div className="bg-[#2D2A26] text-white text-xs font-mono p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                    {phase.dataLoop}
                  </div>
                )}

                {/* Pitfall */}
                <div className="bg-[#FFF5F5] border border-[#B83232]/20 rounded-lg p-3 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#B83232] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#B83232]">常见陷阱：</span>
                    <span className="text-xs text-[#524D46]">{phase.pitfall}</span>
                  </div>
                </div>

                {/* Related Links */}
                {phase.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {phase.links.map((link) => (
                      <button
                        key={link.cat}
                        onClick={() => onNavigate(link.cat)}
                        className="text-xs px-3 py-1.5 bg-[#2D2A26] hover:bg-[#B83232] text-white rounded-lg font-semibold transition-colors cursor-pointer"
                      >
                        {link.label} →
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
