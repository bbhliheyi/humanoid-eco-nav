import React, { useState } from 'react';
import {
  FileCode,
  Sliders,
  Cpu,
  BrainCircuit,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Terminal,
  Zap,
  ShieldCheck,
  Globe,
  Radio,
  Layers,
  Sparkles,
  Layers3,
  Bot
} from 'lucide-react';

export const UrdfPipelineView: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  // Interactive URDF Diagnoser state
  const [robotDof, setRobotDof] = useState<number>(29);
  const [controlRate, setControlRate] = useState<number>(1000);
  const [canBaud, setCanBaud] = useState<number>(5); // Mbps
  const [vlaLocation, setVlaLocation] = useState<'onboard' | 'remote'>('remote');
  const [vlaOutputType, setVlaOutputType] = useState<'absolute' | 'delta'>('absolute');
  const [simBackend, setSimBackend] = useState<'isaac' | 'mujoco' | 'genesis'>('isaac');

  // Diagnostic calculations
  const canFrameBytes = 64;
  const canHeaderOverhead = 16;
  const canTotalBits = (canFrameBytes + canHeaderOverhead) * 8; // ~640 bits
  const framesPerPacket = Math.ceil((robotDof * 4) / 32); // 4 bytes per float32 angle
  const canBandwidthKbps = (framesPerPacket * canTotalBits * (controlRate / 1000)) / 1000;
  const maxCanKbps = canBaud * 1000 * 0.7; // 70% efficiency limit
  const isCanOk = canBandwidthKbps < maxCanKbps;

  const estimatedNetworkLatencyMs = vlaLocation === 'onboard' ? 2 : 12;
  const totalInferenceCycleMs = 50 + estimatedNetworkLatencyMs; // 20Hz VLA inference = 50ms base

  return (
    <div className="space-y-8 font-sans text-[#2D2A26]">
      {/* Hero Title Header */}
      <div className="bg-[#FFFFFF] border border-[#D8D3CA] p-6 sm:p-8 rounded-2xl shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#D8D3CA] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#B83232] text-xs font-mono font-bold uppercase tracking-[0.2em]">
              <Bot className="w-4 h-4 stroke-[2.5]" />
              <span>CUSTOM URDF END-TO-END DEPLOYMENT GUIDE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-editorial-serif text-[#1A1816] tracking-tight">
              自定义 URDF 到真机验证：全栈端到端部署链路
            </h1>
            <p className="text-xs sm:text-sm text-[#524D46] max-w-3xl leading-relaxed">
              针对双板架构（感知板 + 运控板）、多模态世界模型（NVIDIA Cosmos / 蚂蚁 LingBot-World）与 VLA 策略微调的完全落地工程指引。
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-[#D8D3CA] p-4 rounded-xl font-mono text-xs space-y-1.5 w-full md:w-auto shrink-0">
            <div className="text-[10px] font-bold uppercase text-[#B83232] tracking-wider">架构核心节点</div>
            <div className="text-[#2D2A26] font-semibold">1. URDF 物理自检与 Sim 转换</div>
            <div className="text-[#2D2A26] font-semibold">2. RL 运控 & Sim2Real 域随机化</div>
            <div className="text-[#2D2A26] font-semibold">3. 世界模型数据增强 (Cosmos/LingBot)</div>
            <div className="text-[#2D2A26] font-semibold">4. VLA 大模型微调 & 55-DoF 动作映射</div>
            <div className="text-[#2D2A26] font-semibold">5. 感知板/运控板 CAN-FD 总线部署</div>
          </div>
        </div>

        {/* Pipeline Architecture Diagram */}
        <div className="mt-6 pt-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#B83232] mb-3 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 fill-[#B83232]" />
            <span>端到端数据与控制闭环拓扑 (Topological Dataflow)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="bg-[#FAF8F5] border border-[#D8D3CA] p-3.5 rounded-xl space-y-1.5">
              <span className="text-[10px] font-bold text-[#B83232] uppercase">STAGE 1: 仿真打底</span>
              <div className="font-bold text-[#2D2A26] text-sm font-editorial-serif">URDF 物理加载</div>
              <p className="text-[11px] text-[#635D55] font-sans">Mesh 凸包分解 + 惯量矩阵正定性纠偏，转译至 Isaac Lab / Genesis / MuJoCo MJX。</p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#D8D3CA] p-3.5 rounded-xl space-y-1.5">
              <span className="text-[10px] font-bold text-[#B83232] uppercase">STAGE 2: 世界模型增强</span>
              <div className="font-bold text-[#2D2A26] text-sm font-editorial-serif">世界模型推演 & 迁移</div>
              <p className="text-[11px] text-[#635D55] font-sans">Cosmos-Transfer 消除渲染与真机视觉差异，Cosmos-Predict / LingBot-World 预测轨迹动作合规性。</p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#D8D3CA] p-3.5 rounded-xl space-y-1.5">
              <span className="text-[10px] font-bold text-[#B83232] uppercase">STAGE 3: VLA 大脑</span>
              <div className="font-bold text-[#2D2A26] text-sm font-editorial-serif">VLA 策略微调</div>
              <p className="text-[11px] text-[#635D55] font-sans">在 GPU 上微调 LingBot-VLA / GR00T / openpi，对齐 55/29-DoF 关节输出 10Hz Action Chunk。</p>
            </div>

            <div className="bg-[#2D2A26] text-white p-3.5 rounded-xl space-y-1.5 shadow-xs">
              <span className="text-[10px] font-bold text-[#B83232] uppercase">STAGE 4: 双板真机部署</span>
              <div className="font-bold text-white text-sm font-editorial-serif">感知板 ↔ CAN-FD ↔ 运控板</div>
              <p className="text-[11px] text-[#D8D3CA] font-sans">Jetson 打包 RGB 与状态 → CAN-FD 1kHz 下发 64 字节绝对/增量关节角到 MCU。</p>
            </div>
          </div>
        </div>
      </div>

      {/* Step Selector Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#D8D3CA]">
        {[
          { num: 1, title: '1. URDF 自检与仿真预热', icon: FileCode },
          { num: 2, title: '2. Sim2Real & 域随机化', icon: Sliders },
          { num: 3, title: '3. 世界模型 (Cosmos/LingBot)', icon: Globe },
          { num: 4, title: '4. VLA 策略与动作映射', icon: BrainCircuit },
          { num: 5, title: '5. 双板 CAN-FD 协议部署', icon: Cpu },
        ].map((s) => {
          const Icon = s.icon;
          const isActive = activeStep === s.num;
          return (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap border ${
                isActive
                  ? 'bg-[#2D2A26] text-white border-[#2D2A26] shadow-xs'
                  : 'bg-[#FFFFFF] text-[#524D46] border-[#D8D3CA] hover:border-[#2D2A26]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#B83232]' : ''}`} />
              <span>{s.title}</span>
            </button>
          );
        })}
      </div>

      {/* STEP CONTENT BLOCKS */}

      {/* STEP 1 */}
      {activeStep === 1 && (
        <div className="bg-[#FFFFFF] border border-[#D8D3CA] p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#D8D3CA] pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#B83232] uppercase tracking-widest">PHASE 1 / INGESTION</span>
              <h2 className="text-2xl font-black font-editorial-serif text-[#1A1816]">URDF 质量诊断、网格清洗与物理仿真转译</h2>
            </div>
            <span className="text-xs font-mono px-3 py-1 bg-[#FAF8F5] border border-[#D8D3CA] rounded-md text-[#2D2A26] font-bold">
              STEP 1 OF 5
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-base font-bold font-editorial-serif text-[#1A1816] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B83232]" />
                URDF 文件合规必查项目清单 (Checklist)
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-[#FAF8F5] border border-[#D8D3CA] rounded-xl space-y-1">
                  <div className="font-bold text-[#2D2A26]">1. Mesh 凸包分解与轻量化</div>
                  <p className="text-[#635D55]">原始 CAD 导出的 STL 文件包含过度复杂的表面网格，易导致物理仿真检测卡顿。必须使用 <code className="bg-[#EFECE6] px-1 py-0.5 rounded text-[#B83232]">V-HACD</code> 算法生成凸包碰撞网格。</p>
                </div>

                <div className="p-3 bg-[#FAF8F5] border border-[#D8D3CA] rounded-xl space-y-1">
                  <div className="font-bold text-[#2D2A26]">2. Inertia 惯量矩阵正定性检查</div>
                  <p className="text-[#635D55]">必须满足物理三角形不等式（Ixx + Iyy ≥ Izz），且对角元素严格正数，防止在 PhysX 5 或 MuJoCo 中出现非数报错 (<code className="bg-[#EFECE6] px-1 py-0.5 rounded">NaN Explosion</code>)。</p>
                </div>

                <div className="p-3 bg-[#FAF8F5] border border-[#D8D3CA] rounded-xl space-y-1">
                  <div className="font-bold text-[#2D2A26]">3. Joint Limiting & Damping 参数补全</div>
                  <p className="text-[#635D55]">在 URDF 中显式配置 <code className="bg-[#EFECE6] px-1 py-0.5 rounded">friction="0.1" damping="0.5"</code>，为 PhysX/MuJoCo 模拟准直驱电机阻尼提供物理约束。</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1816] text-[#D8D3CA] p-5 rounded-2xl font-mono text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#3D3A36] pb-2 text-[#FAF8F5]">
                <span className="font-bold text-[#B83232]">Python 仿真装载脚本示例</span>
                <span className="text-[10px]">Isaac Lab / Genesis / MuJoCo</span>
              </div>

              <pre className="text-[11px] leading-relaxed overflow-x-auto text-[#00FF66] font-mono p-2">
{`# 1. Isaac Lab 装载 URDF
from omni.isaac.lab.assets import ArticulationCfg
import omni.isaac.lab.sim as sim_utils

robot_cfg = ArticulationCfg(
    prim_path="{ENV_REGEX_NS}/Robot",
    spawn=sim_utils.UrdfFileCfg(
        asset_path="path/to/wbot.urdf",
        fix_base=False,
        merge_fixed_joints=True,
        make_instanceable=True,
    ),
    init_state=ArticulationCfg.InitialStateCfg(
        pos=(0.0, 0.0, 0.85), # 人形初始站立高度
    )
)

# 2. Genesis 装载 URDF
import genesis as gs
scene = gs.Scene()
robot = scene.add_entity(
    gs.morphs.URDF(file='wbot.urdf', fixed=False)
)`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {activeStep === 2 && (
        <div className="bg-[#FFFFFF] border border-[#D8D3CA] p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#D8D3CA] pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#B83232] uppercase tracking-widest">PHASE 2 / CONTROL & SIM2REAL</span>
              <h2 className="text-2xl font-black font-editorial-serif text-[#1A1816]">运控强化学习 (RL) 与 5 大域随机化 (Domain Randomization)</h2>
            </div>
            <span className="text-xs font-mono px-3 py-1 bg-[#FAF8F5] border border-[#D8D3CA] rounded-md text-[#2D2A26] font-bold">
              STEP 2 OF 5
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-[#FAF8F5] border border-[#D8D3CA] rounded-xl space-y-3">
              <div className="font-bold font-editorial-serif text-base text-[#1A1816] flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#B83232]" />
                1. 地面与物理参数扰动
              </div>
              <ul className="text-xs text-[#524D46] space-y-2 list-disc list-inside">
                <li>地面摩擦系数 <code className="bg-[#EFECE6] px-1 rounded">f_stat</code> 在 <code className="text-[#B83232] font-mono">0.2 ~ 1.2</code> 范围内统一随机化。</li>
                <li>连杆质量添加 <code className="text-[#B83232] font-mono">±10%</code> 扰动，质心偏移 <code className="text-[#B83232] font-mono">±2cm</code>。</li>
              </ul>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#D8D3CA] rounded-xl space-y-3">
              <div className="font-bold font-editorial-serif text-base text-[#1A1816] flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#B83232]" />
                2. 电机阻尼与延时建模
              </div>
              <ul className="text-xs text-[#524D46] space-y-2 list-disc list-inside">
                <li>模拟 CAN-FD 通信时延：在策略输入与指令下发引入 <code className="text-[#B83232] font-mono">10ms ~ 50ms</code> 随机 FIFO 队列。</li>
                <li>电机 $K_p/K_d$ 增益在标准值的 <code className="text-[#B83232] font-mono">85% ~ 115%</code> 震荡。</li>
              </ul>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#D8D3CA] rounded-xl space-y-3">
              <div className="font-bold font-editorial-serif text-base text-[#1A1816] flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#B83232]" />
                3. 盲推抗干扰推力注入
              </div>
              <ul className="text-xs text-[#524D46] space-y-2 list-disc list-inside">
                <li>每间隔 <code className="text-[#B83232] font-mono">5~8 秒</code> 对机器人躯干施加 <code className="text-[#B83232] font-mono">20N ~ 100N</code> 随机冲击力向量。</li>
                <li>配合 AMP (Adversarial Motion Priors) 对抗先验防止出现“蹲走/剪刀腿”。</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-[#FAF8F5] border border-[#D8D3CA] rounded-xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#B83232] uppercase">SIM2SIM VALIDATION PIPELINE</span>
              <p className="text-xs text-[#2D2A26] font-semibold">
                在 Isaac Lab 中训练完毕导出 <code className="bg-[#EFECE6] px-1 rounded font-mono">policy.onnx</code> 后，必须在 MuJoCo (MJX) 中进行 100% 相同控制频率下的动作扭矩曲线对齐测试！
              </p>
            </div>
            <a
              href="https://github.com/roboterax/humanoid-gym"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-[#2D2A26] hover:bg-[#B83232] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
            >
              参考 Humanoid-Gym Sim2Sim
            </a>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {activeStep === 3 && (
        <div className="bg-[#FFFFFF] border border-[#D8D3CA] p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#D8D3CA] pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#B83232] uppercase tracking-widest">PHASE 3 / WORLD MODEL AUGMENTATION</span>
              <h2 className="text-2xl font-black font-editorial-serif text-[#1A1816]">世界模型 (NVIDIA Cosmos / 蚂蚁 LingBot-World) 的真正作用</h2>
            </div>
            <span className="text-xs font-mono px-3 py-1 bg-[#FAF8F5] border border-[#D8D3CA] rounded-md text-[#2D2A26] font-bold">
              STEP 3 OF 5
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#FAF8F5] border border-[#D8D3CA] p-5 rounded-2xl space-y-3">
              <div className="text-xs font-mono font-bold text-[#B83232] uppercase">作用一：风格迁移 (Sim2Real Video Translation)</div>
              <h3 className="font-bold font-editorial-serif text-lg text-[#1A1816]">NVIDIA Cosmos-Transfer</h3>
              <p className="text-xs text-[#524D46] leading-relaxed">
                将 Isaac Sim 渲染出的略带“假感”的仿真视频，通过 Diffusion 模型逐帧翻译为具备真机光影、材质与镜头噪点的真实视频，直接用于 VLA 大模型训练，消除视觉 Gap。
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#D8D3CA] p-5 rounded-2xl space-y-3">
              <div className="text-xs font-mono font-bold text-[#B83232] uppercase">作用二：未来物理推演 (World Generation)</div>
              <h3 className="font-bold font-editorial-serif text-lg text-[#1A1816]">Cosmos-Predict / LingBot-World</h3>
              <p className="text-xs text-[#524D46] leading-relaxed">
                输入当前图像与计划执行的 50 步动作，世界模型可在 500ms 内推演未来 5 秒的视频画面，检测机械臂是否会撞击物体或落空，充当策略的安全“预检过滤器”。
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#D8D3CA] p-5 rounded-2xl space-y-3">
              <div className="text-xs font-mono font-bold text-[#B83232] uppercase">作用三：真机示教格式化</div>
              <h3 className="font-bold font-editorial-serif text-lg text-[#1A1816]">LeRobot 2.0 Dataset Pipeline</h3>
              <p className="text-xs text-[#524D46] leading-relaxed">
                在自定义机器人真机上通过遥操作 (Teleop) 录制的 RGB 画面与 29-DoF/55-DoF 关节轨迹，打包保存为 HuggingFace LeRobot 格式，作为后训练 (Post-training) 黄金数据。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {activeStep === 4 && (
        <div className="bg-[#FFFFFF] border border-[#D8D3CA] p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#D8D3CA] pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#B83232] uppercase tracking-widest">PHASE 4 / VLA ACTION MAPPING</span>
              <h2 className="text-2xl font-black font-editorial-serif text-[#1A1816]">VLA 基础模型微调与 55-DoF / 29-DoF 动作空间映射</h2>
            </div>
            <span className="text-xs font-mono px-3 py-1 bg-[#FAF8F5] border border-[#D8D3CA] rounded-md text-[#2D2A26] font-bold">
              STEP 4 OF 5
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-base font-bold font-editorial-serif text-[#1A1816]">通用 VLA 动作空间解构 (Action Chunk Table)</h3>
              <p className="text-xs text-[#524D46] leading-relaxed">
                主流通用模型（如 LingBot-VLA 2.0 或 GR00T N1.7）通常采用 55 维（或 29 维）统一标定矢量，你需要编写映射转换函数将矢量按索引绑定到你的 URDF 关节：
              </p>

              <div className="bg-[#FAF8F5] border border-[#D8D3CA] p-3.5 rounded-xl font-mono text-[11px] space-y-2">
                <div className="font-bold text-[#B83232]">55维动作块分布表：</div>
                <div className="grid grid-cols-2 gap-2 text-[#2D2A26]">
                  <div>[0:12] → 腿部 12 关节目标角</div>
                  <div>[12:15] → 腰部 3 自由度扭转</div>
                  <div>[15:29] → 双臂 14 关节位姿</div>
                  <div>[29:53] → 双手 24 维灵巧手弯曲度</div>
                  <div>[53:55] → 颈部/头部 2 维度俯仰</div>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1816] text-[#D8D3CA] p-5 rounded-2xl font-mono text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#3D3A36] pb-2 text-[#FAF8F5]">
                <span className="font-bold text-[#B83232]">VLA 推理服务器 Action Chunk 转换</span>
                <span className="text-[10px]">Python Policy Server</span>
              </div>

              <pre className="text-[11px] leading-relaxed overflow-x-auto text-[#00FF66] font-mono p-2">
{`# 接收 10Hz RGB 图像 -> 输出 50x55 Action Chunk
action_chunk = vla_model.predict(
    image=chest_rgb, 
    instruction="拿起红色的水杯"
) # shape: (50, 55)

# 映射到自定义 URDF 的 29 个物理电机
def map_to_urdf_joints(chunk_step):
    target_angles = np.zeros(29, dtype=np.float32)
    target_angles[0:12]  = chunk_step[0:12]   # Leg
    target_angles[12:15] = chunk_step[12:15]  # Waist
    target_angles[15:29] = chunk_step[15:29]  # Arm
    return target_angles`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5 */}
      {activeStep === 5 && (
        <div className="bg-[#FFFFFF] border border-[#D8D3CA] p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#D8D3CA] pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#B83232] uppercase tracking-widest">PHASE 5 / BOARD-LEVEL CAN-FD DEPLOYMENT</span>
              <h2 className="text-2xl font-black font-editorial-serif text-[#1A1816]">双板架构 (感知板 + 运控板) CAN-FD 总线部署规范</h2>
            </div>
            <span className="text-xs font-mono px-3 py-1 bg-[#FAF8F5] border border-[#D8D3CA] rounded-md text-[#2D2A26] font-bold">
              STEP 5 OF 5
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-base font-bold font-editorial-serif text-[#1A1816] flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#B83232]" />
                CAN-FD 64 字节拓扑帧定义 (标准协议)
              </h3>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 bg-[#FAF8F5] border border-[#D8D3CA] rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#B83232] text-sm">ID: 0x100</span>
                    <span className="text-[#635D55] ml-2">(下发) 左腿关节 1~4 目标角度</span>
                  </div>
                  <span className="text-[10px] bg-[#2D2A26] text-white px-2 py-0.5 rounded">float32 × 4 (16B)</span>
                </div>

                <div className="p-3 bg-[#FAF8F5] border border-[#D8D3CA] rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#B83232] text-sm">ID: 0x101</span>
                    <span className="text-[#635D55] ml-2">(下发) 右腿关节 1~4 目标角度</span>
                  </div>
                  <span className="text-[10px] bg-[#2D2A26] text-white px-2 py-0.5 rounded">float32 × 4 (16B)</span>
                </div>

                <div className="p-3 bg-[#FAF8F5] border border-[#D8D3CA] rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#B83232] text-sm">ID: 0x102</span>
                    <span className="text-[#635D55] ml-2">(下发) 上身/手臂 1~8 关节角度</span>
                  </div>
                  <span className="text-[10px] bg-[#2D2A26] text-white px-2 py-0.5 rounded">float32 × 8 (32B)</span>
                </div>

                <div className="p-3 bg-[#FAF8F5] border border-[#D8D3CA] rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#00AA44] text-sm">ID: 0x200</span>
                    <span className="text-[#635D55] ml-2">(反馈) 电机编码器实际位置/力矩</span>
                  </div>
                  <span className="text-[10px] bg-[#EFECE6] text-[#2D2A26] px-2 py-0.5 rounded">64B 压缩</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF8F5] border border-[#D8D3CA] p-5 rounded-2xl space-y-4">
              <h3 className="text-base font-bold font-editorial-serif text-[#1A1816]">运控板 MCU 控制核心逻辑 (C / C++)</h3>

              <div className="space-y-2 text-xs text-[#524D46]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B83232] shrink-0 mt-0.5" />
                  <p><strong>1kHz PD 闭环控制</strong>：VLA 下发的 10Hz/20Hz 动作块，运控板通过三次样条 (Cubic Spline) 插值到 1kHz 下发给 MIT 模式驱动器。</p>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B83232] shrink-0 mt-0.5" />
                  <p><strong>绝对角度 vs 相对增量</strong>：若模型输出为相对增量 Δθ（如 GR00T），运控板需进行当前状态累加，即 θ_target = θ_current + Δθ。</p>
                </div>

                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#B83232] shrink-0 mt-0.5" />
                  <p><strong>防跌倒安全限幅</strong>：感知板/运控板 IMU 检测到俯仰角（Pitch/Roll）超过 30° 时，硬件中断强制将电机 Kp/Kd 归零，防止烧毁驱动板。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE HARDWARE DIAGNOSTIC CALCULATOR */}
      <div className="bg-[#FFFFFF] border-2 border-[#2D2A26] p-6 sm:p-8 rounded-2xl space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D8D3CA] pb-4">
          <div>
            <div className="flex items-center gap-2 text-[#B83232] text-xs font-mono font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>REAL-TIME HARDWARE & NETWORK READINESS CALCULATOR</span>
            </div>
            <h2 className="text-2xl font-black font-editorial-serif text-[#1A1816] mt-0.5">
              自定义机器人真机部署通信带宽与延时实时诊断器
            </h2>
          </div>

          <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 bg-[#2D2A26] text-white rounded-lg">
            INTERACTIVE CALCULATOR
          </span>
        </div>

        {/* Diagnostic Input Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2D2A26] flex items-center justify-between">
              <span>机器人总自由度 (DoF)</span>
              <span className="text-[#B83232] font-mono">{robotDof} 自由度</span>
            </label>
            <input
              type="range"
              min={12}
              max={55}
              value={robotDof}
              onChange={(e) => setRobotDof(Number(e.target.value))}
              className="w-full accent-[#B83232] cursor-pointer"
            />
            <span className="text-[10px] text-[#8C867E]">29-DoF (G1 标准) / 55-DoF (全尺寸灵巧)</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2D2A26] flex items-center justify-between">
              <span>运控板控制频率 (Hz)</span>
              <span className="text-[#B83232] font-mono">{controlRate} Hz</span>
            </label>
            <input
              type="range"
              min={250}
              max={2000}
              step={250}
              value={controlRate}
              onChange={(e) => setControlRate(Number(e.target.value))}
              className="w-full accent-[#B83232] cursor-pointer"
            />
            <span className="text-[10px] text-[#8C867E]">1000Hz 为业界标准闭环控制频率</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2D2A26] flex items-center justify-between">
              <span>CAN-FD 总线波特率</span>
              <span className="text-[#B83232] font-mono">{canBaud} Mbps</span>
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setCanBaud(1)}
                className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-lg border cursor-pointer ${
                  canBaud === 1 ? 'bg-[#2D2A26] text-white border-[#2D2A26]' : 'bg-[#FAF8F5] text-[#2D2A26] border-[#D8D3CA]'
                }`}
              >
                1 Mbps
              </button>
              <button
                onClick={() => setCanBaud(5)}
                className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-lg border cursor-pointer ${
                  canBaud === 5 ? 'bg-[#2D2A26] text-white border-[#2D2A26]' : 'bg-[#FAF8F5] text-[#2D2A26] border-[#D8D3CA]'
                }`}
              >
                5 Mbps
              </button>
            </div>
            <span className="text-[10px] text-[#8C867E]">推荐 5Mbps 应对高频 55-DoF 关节下发</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2D2A26]">VLA 推理节点部署位置</label>
            <div className="flex gap-2">
              <button
                onClick={() => setVlaLocation('onboard')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                  vlaLocation === 'onboard' ? 'bg-[#2D2A26] text-white border-[#2D2A26]' : 'bg-[#FAF8F5] text-[#2D2A26] border-[#D8D3CA]'
                }`}
              >
                板载 Jetson Orin (~2ms)
              </button>
              <button
                onClick={() => setVlaLocation('remote')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                  vlaLocation === 'remote' ? 'bg-[#2D2A26] text-white border-[#2D2A26]' : 'bg-[#FAF8F5] text-[#2D2A26] border-[#D8D3CA]'
                }`}
              >
                局域网 GPU 服务器 (~12ms)
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2D2A26]">VLA 输出策略格式</label>
            <div className="flex gap-2">
              <button
                onClick={() => setVlaOutputType('absolute')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                  vlaOutputType === 'absolute' ? 'bg-[#2D2A26] text-white border-[#2D2A26]' : 'bg-[#FAF8F5] text-[#2D2A26] border-[#D8D3CA]'
                }`}
              >
                绝对关节角度 (LingBot)
              </button>
              <button
                onClick={() => setVlaOutputType('delta')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border cursor-pointer ${
                  vlaOutputType === 'delta' ? 'bg-[#2D2A26] text-white border-[#2D2A26]' : 'bg-[#FAF8F5] text-[#2D2A26] border-[#D8D3CA]'
                }`}
              >
                相对增量 $\Delta \theta$ (GR00T)
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2D2A26]">物理仿真基座选择</label>
            <div className="flex gap-2">
              {(['isaac', 'mujoco', 'genesis'] as const).map((sim) => (
                <button
                  key={sim}
                  onClick={() => setSimBackend(sim)}
                  className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg border cursor-pointer ${
                    simBackend === sim ? 'bg-[#2D2A26] text-white border-[#2D2A26]' : 'bg-[#FAF8F5] text-[#2D2A26] border-[#D8D3CA]'
                  }`}
                >
                  {sim}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Diagnostics Results */}
        <div className="p-5 bg-[#FAF8F5] border border-[#D8D3CA] rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#D8D3CA] pb-3">
            <h3 className="font-bold font-editorial-serif text-lg text-[#1A1816] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#B83232]" />
              硬件性能与通信拓扑评估报告 (Diagnostic Output)
            </h3>
            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-md border ${
              isCanOk ? 'bg-[#00AA44]/10 text-[#00AA44] border-[#00AA44]/30' : 'bg-[#B83232]/10 text-[#B83232] border-[#B83232]/30'
            }`}>
              {isCanOk ? '✓ CAN-FD 带宽达标' : '⚠️ CAN-FD 带宽警告'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-white border border-[#D8D3CA] p-3.5 rounded-xl space-y-1">
              <div className="text-[10px] text-[#8C867E]">估算 CAN-FD 总线吞吐</div>
              <div className="text-base font-black text-[#2D2A26]">{canBandwidthKbps.toFixed(1)} Kbps</div>
              <div className="text-[10px] text-[#524D46]">安全阈值上限: {maxCanKbps.toFixed(0)} Kbps</div>
            </div>

            <div className="bg-white border border-[#D8D3CA] p-3.5 rounded-xl space-y-1">
              <div className="text-[10px] text-[#8C867E]">估计 VLA 端到端推理时延</div>
              <div className="text-base font-black text-[#B83232]">{totalInferenceCycleMs} ms / cycle</div>
              <div className="text-[10px] text-[#524D46]">(相当于 ~20Hz 策略更新速率)</div>
            </div>

            <div className="bg-white border border-[#D8D3CA] p-3.5 rounded-xl space-y-1">
              <div className="text-[10px] text-[#8C867E]">运控板处理逻辑要求</div>
              <div className="text-base font-black text-[#2D2A26]">
                {vlaOutputType === 'absolute' ? '三次样条插值' : '状态积分 + 安全限幅'}
              </div>
              <div className="text-[10px] text-[#524D46]">频率: {controlRate}Hz</div>
            </div>
          </div>

          {!isCanOk && (
            <div className="p-3 bg-[#B83232]/10 border border-[#B83232]/30 rounded-xl text-xs text-[#B83232] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>建议：当前 {robotDof} 自由度在 {controlRate}Hz 控制频率下使用 1Mbps 波特率可能出现总线拥堵，请将 CAN-FD 提升至 5Mbps，或拆分为两条独立 CAN-FD 总线（双腿/双臂分路）。</span>
            </div>
          )}
        </div>
      </div>

      {/* OPEN SOURCE DEPLOYMENT ARCHITECTURES MATRIX */}
      <div className="bg-[#FFFFFF] border border-[#D8D3CA] p-6 sm:p-8 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D8D3CA] pb-4">
          <div>
            <div className="flex items-center gap-2 text-[#B83232] text-xs font-mono font-bold uppercase tracking-widest">
              <Layers3 className="w-4 h-4" />
              <span>PRODUCTION OPEN-SOURCE REAL-ROBOT DEPLOYMENT ARCHITECTURES</span>
            </div>
            <h2 className="text-2xl font-black font-editorial-serif text-[#1A1816] mt-0.5">
              业界主流 6 大完全开源真机部署架构与通信中间件
            </h2>
            <p className="text-xs text-[#524D46] mt-1">
              可直接在 GitHub 上 Fork 并部署到你自定义机器人（如 wbot）的开源基础设施。
            </p>
          </div>

          <span className="text-xs font-mono font-bold px-3 py-1 bg-[#FAF8F5] border border-[#D8D3CA] rounded-lg text-[#2D2A26]">
            6 OPEN-SOURCE ARCHITECTURES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. openpi */}
          <div className="bg-[#FAF8F5] border border-[#D8D3CA] p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-[#2D2A26] transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#B83232] uppercase px-2 py-0.5 bg-[#B83232]/10 rounded">Physical Intelligence</span>
                <span className="text-[10px] font-mono text-[#635D55]">Python / WebSocket</span>
              </div>
              <h3 className="font-bold font-editorial-serif text-lg text-[#1A1816]">openpi (π0 Deployment)</h3>
              <p className="text-xs text-[#524D46] leading-relaxed">
                Physical Intelligence 官方开源的 VLA 真机部署库。提供 WebSocket 异步流通信服务，GPU 端运行 Policy Server，感知板 / 运控板只需轻量级 C++/Python Client 即可接收 50Hz Action Chunk。
              </p>
            </div>
            <div className="pt-2 border-t border-[#D8D3CA] flex items-center justify-between text-xs font-mono">
              <span className="text-[#8C867E]">适用: VLA 大模型真机</span>
              <a
                href="https://github.com/Physical-Intelligence/openpi"
                target="_blank"
                rel="noreferrer"
                className="text-[#B83232] font-bold hover:underline flex items-center gap-1"
              >
                <span>GitHub</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 2. LeRobot Client */}
          <div className="bg-[#FAF8F5] border border-[#D8D3CA] p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-[#2D2A26] transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#B83232] uppercase px-2 py-0.5 bg-[#B83232]/10 rounded">HuggingFace</span>
                <span className="text-[10px] font-mono text-[#635D55]">Python / CAN-FD / Serial</span>
              </div>
              <h3 className="font-bold font-editorial-serif text-lg text-[#1A1816]">LeRobot 0.2 / Robot-Client</h3>
              <p className="text-xs text-[#524D46] leading-relaxed">
                HuggingFace 开源的轻量级真机部署框架。支持各种物理电机（Dynamixel / Feetech / CAN-FD 伺服），内置多相机同步采集与 ACT / Diffusion Policy 实时推演，开箱即用。
              </p>
            </div>
            <div className="pt-2 border-t border-[#D8D3CA] flex items-center justify-between text-xs font-mono">
              <span className="text-[#8C867E]">适用: 桌面双臂 & 桌面双足</span>
              <a
                href="https://github.com/huggingface/lerobot"
                target="_blank"
                rel="noreferrer"
                className="text-[#B83232] font-bold hover:underline flex items-center gap-1"
              >
                <span>GitHub</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 3. Unitree SDK 2.0 (CycloneDDS) */}
          <div className="bg-[#FAF8F5] border border-[#D8D3CA] p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-[#2D2A26] transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#B83232] uppercase px-2 py-0.5 bg-[#B83232]/10 rounded">Unitree Open SDK</span>
                <span className="text-[10px] font-mono text-[#635D55]">C++ / DDS / UDP</span>
              </div>
              <h3 className="font-bold font-editorial-serif text-lg text-[#1A1816]">Unitree SDK 2.0 (CycloneDDS)</h3>
              <p className="text-xs text-[#524D46] leading-relaxed">
                宇树开源的人形/四足通用部署架构，利用 OMG DDS 共享内存与 UDP 组播进行双板通信。暴露出 LowCmd (Kp, Kd, Tau, Pos) 与 LowState IMU / 编码器结构体，控制时延 &lt; 1ms。
              </p>
            </div>
            <div className="pt-2 border-t border-[#D8D3CA] flex items-center justify-between text-xs font-mono">
              <span className="text-[#8C867E]">适用: 全尺寸人形 RL 真机</span>
              <a
                href="https://github.com/unitreerobotics/unitree_sdk2"
                target="_blank"
                rel="noreferrer"
                className="text-[#B83232] font-bold hover:underline flex items-center gap-1"
              >
                <span>GitHub</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 4. Stanford Mobile ALOHA Puppeteer */}
          <div className="bg-[#FAF8F5] border border-[#D8D3CA] p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-[#2D2A26] transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#B83232] uppercase px-2 py-0.5 bg-[#B83232]/10 rounded">Stanford SVL</span>
                <span className="text-[10px] font-mono text-[#635D55]">ROS 2 / C++ / ZMQ</span>
              </div>
              <h3 className="font-bold font-editorial-serif text-lg text-[#1A1816]">Mobile ALOHA Puppeteer Client</h3>
              <p className="text-xs text-[#524D46] leading-relaxed">
                斯坦福 SVL 实验室开源的双手灵巧操作部署中间件，采用低延迟共享内存和 C++ 驱动节点，支持 100Hz 动作下发与双目视觉同步。
              </p>
            </div>
            <div className="pt-2 border-t border-[#D8D3CA] flex items-center justify-between text-xs font-mono">
              <span className="text-[#8C867E]">适用: 遥操作 & 灵巧双手</span>
              <a
                href="https://github.com/tonyhaodev/mobile_aloha"
                target="_blank"
                rel="noreferrer"
                className="text-[#B83232] font-bold hover:underline flex items-center gap-1"
              >
                <span>GitHub</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 5. CMU OmniH2O Real-time Client */}
          <div className="bg-[#FAF8F5] border border-[#D8D3CA] p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-[#2D2A26] transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#B83232] uppercase px-2 py-0.5 bg-[#B83232]/10 rounded">CMU Bipedal Lab</span>
                <span className="text-[10px] font-mono text-[#635D55]">Python / FastDDS</span>
              </div>
              <h3 className="font-bold font-editorial-serif text-lg text-[#1A1816]">CMU OmniH2O / Realtime Teleop</h3>
              <p className="text-xs text-[#524D46] leading-relaxed">
                CMU 开源的全身遥操作与运控真机部署架构。支持将 Apple Vision Pro / 单目 RGB 动捕实时解算为 29-DoF 全身动作并推送到真机。
              </p>
            </div>
            <div className="pt-2 border-t border-[#D8D3CA] flex items-center justify-between text-xs font-mono">
              <span className="text-[#8C867E]">适用: 全身动捕 & RL Balance</span>
              <a
                href="https://github.com/Grounded-Humanoid-OmniH2O/OmniH2O"
                target="_blank"
                rel="noreferrer"
                className="text-[#B83232] font-bold hover:underline flex items-center gap-1"
              >
                <span>GitHub</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 6. ROS 2 Control (CAN-FD Driver) */}
          <div className="bg-[#FAF8F5] border border-[#D8D3CA] p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-[#2D2A26] transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#B83232] uppercase px-2 py-0.5 bg-[#B83232]/10 rounded">Open Source Robotics</span>
                <span className="text-[10px] font-mono text-[#635D55]">ROS 2 Humble / SocketCAN</span>
              </div>
              <h3 className="font-bold font-editorial-serif text-lg text-[#1A1816]">ros2_control (SocketCAN / CAN-FD)</h3>
              <p className="text-xs text-[#524D46] leading-relaxed">
                ROS 2 官方标准的硬件接口层中间件，通过 Linux SocketCAN / CAN-FD 驱动直接连通运控板，提供硬实时控制环路 (Hardware Interface)。
              </p>
            </div>
            <div className="pt-2 border-t border-[#D8D3CA] flex items-center justify-between text-xs font-mono">
              <span className="text-[#8C867E]">适用: 工业标准/通用机器人</span>
              <a
                href="https://github.com/ros-controls/ros2_control"
                target="_blank"
                rel="noreferrer"
                className="text-[#B83232] font-bold hover:underline flex items-center gap-1"
              >
                <span>GitHub</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
