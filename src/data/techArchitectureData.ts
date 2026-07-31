import { TechArchitecture } from '../types';

export const TECH_ARCHITECTURES: Record<string, TechArchitecture> = {

  // ========== 仿真器（Phase 1） ==========
  'isaac-sim': {
    overview: 'NVIDIA 工业级具身智能仿真平台，Omniverse + PhysX 5 + RTX 光追，提供从场景搭建到 RL 训练再到 Sim2Real 的完整闭环',
    pipeline: ['安装 Omniverse Launcher → 安装 Isaac Sim → 导入 URDF/MJCF 模型 → 搭建场景(物理+传感器+光照) → Isaac Lab Python API 训练 → 导出 ONNX/TensorRT 策略 → ROS2 Bridge 真机部署'],
    softwareStack: ['Omniverse Kit', 'PhysX 5', 'Python', 'Isaac Lab', 'ROS2 Bridge', 'TensorRT'],
    rendering: 'NVIDIA RTX 实时光线追踪 (Omniverse RTX Renderer)',
    simulator: 'Isaac Sim (PhysX 5)',
    system: 'Omniverse 平台 + ROS2 Bridge',
    architecturePattern: 'Omniverse 插件架构：USD(Universal Scene Description)统一场景格式，Python/C++ 双语言 API，ROS2 Bridge 连接真机',
    algorithms: ['PhysX 5 GPU Physics', 'RTX Real-time Ray Tracing', 'Domain Randomization', 'Sensor Simulation'],
  },

  'mujoco': {
    overview: 'Google DeepMind 开源物理引擎，JAX GPU 加速(MJX)+ 可微分物理 + MJPC 实时控制，学术界 RL 训练和 Sim2Sim 校验的黄金标准',
    pipeline: ['编译/安装 MuJoCo → 加载 MJCF/URDF → Python bindings 创建 env → MJX(JAX) GPU 并行训练 / 可微分物理梯度回传 → MJPC 在线 MPC 控制 → 导出部署'],
    softwareStack: ['C (核心引擎)', 'Python (bindings)', 'JAX (MJX)', 'NumPy'],
    rendering: '基础 OpenGL 可视化(调试用，非视觉 RL 训练)',
    simulator: 'MuJoCo (自研物理引擎)',
    system: '独立 C 库 + Python bindings (无 ROS 依赖)',
    architecturePattern: '单进程物理引擎 + Python bindings。MJX 变体为纯 JAX GPU 实现，32768+ envs 并行',
    algorithms: ['可微分物理(一阶)', 'Contact Dynamics', 'Convex MPC (MJPC)', 'GPU Parallel (MJX)'],
  },

  // ========== 控制与遥操作（Phase 3） ==========
  'aimrt': {
    overview: '智元高性能机器人运行时中间件，专为具身智能高并发/低时延异构计算设计，支持 EtherCAT+CAN+ROS2 多协议统一调度',
    pipeline: ['安装 AimRT → 配置通信后端(EtherCAT/CAN/ROS2) → 注册 Topic/Service/Action → 部署算法模块 → AimRT 统一调度 → 真机执行'],
    softwareStack: ['C++', 'EtherCAT', 'CAN', 'ROS2', 'protobuf'],
    simulator: '无需仿真器(中间件层)',
    system: 'AimRT + ROS2 + EtherCAT (支持多通信后端)',
    architecturePattern: '统一中间件：抽象底层通信协议差异，上层算法通过统一接口访问所有硬件和执行器',
    algorithms: ['高并发调度', '低时延通信', '多协议统一', '异构计算'],
  },

  'open-television': {
    overview: 'UCSD+MIT 的 Apple Vision Pro 沉浸式遥操作系统，立体 RGB+主动双眼追踪，高精度全身动作采集',
    pipeline: ['佩戴 AVP 头显 → 手部+头部追踪 → 关节重定向(人体→机器人) → ROS2 发布关节指令 → 机器人跟随 → 同步录制 RGB+关节数据 → 训练模仿学习'],
    softwareStack: ['Python', 'ROS2', 'Apple Vision Pro SDK', 'PyTorch'],
    simulator: '无需仿真器(直接真机遥操作)',
    system: 'ROS2 (AVP → Python bridge → ros2 topic)',
    architecturePattern: 'AVP-in-the-Loop：Apple Vision Pro 作为高精度动作输入设备，Python 做重定向+ROS2 桥接',
    algorithms: ['Motion Retargeting', 'Stereo Vision Tracking', 'Imitation Data Collection'],
    rendering: 'Apple Vision Pro 立体渲染',
  },

  'aloha-mobile': {
    overview: 'Stanford 低成本双手灵巧遥操作+移动双臂方案，Leader-Follower 同构主从 + ACT 行为克隆，掀起模仿学习浪潮',
    pipeline: ['组装 ALOHA(Leader+Follower 双臂) → 操作者操控 Leader 臂 → Follower 臂同步跟随 → 录制(关节+RGB) → ACT 训练 → Follower 自主执行'],
    softwareStack: ['Python', 'PyTorch', 'ROS', 'ACT'],
    simulator: '无需仿真器(纯真机数据驱动)',
    system: 'ROS (Leader-Follower 同步)',
    architecturePattern: 'Leader-Follower 同构遥操作：两个完全相同的机械臂，操作者推 Leader → Follower 复现，零延迟力反馈',
    algorithms: ['ACT (Action Chunking Transformer)', 'Leader-Follower Control', 'Imitation Learning'],
  },

  // ========== VLA 模型（Phase 3） ==========
  'isaac-groot': {
    overview: 'NVIDIA 通用人形 VLA 基础模型，快慢双系统架构 + EgoScale 2万小时人类视频预训练，支持跨本体零样本泛化，N1.7 最新版 Apache-2.0 可商用',
    pipeline: ['ViT 视觉编码(RGB图像→patch token) → LLM 语言编码(指令→语义token) → Transformer 交叉注意力融合 → 快系统(200Hz 反射) + 慢系统(10Hz 推理) → 流匹配动作解码 → TensorRT 部署到 Jetson Thor'],
    softwareStack: ['PyTorch', 'CUDA', 'TensorRT', 'Omniverse', 'NVIDIA Cosmos', 'Isaac Sim'],
    rendering: 'Isaac Sim RTX 光追渲染(训练数据生成)',
    simulator: 'Isaac Sim (PhysX 5)',
    system: 'ROS2 + NVIDIA Isaac ROS + Jetson Thor 边缘推理',
    architecturePattern: '快慢双系统(Dual-System)：Fast Reflex(200Hz 直接输出关节目标)+ Slow Reasoning(10Hz CoT 规划子目标)，视觉-语言-动作端到端 Transformer',
    algorithms: ['ViT (Vision Transformer)', 'Cross-Attention Fusion', 'Flow Matching', 'Chain-of-Thought', 'EgoScale Log-linear Scaling Law'],
  },

  'unitree-rl-gym': {
    overview: '宇树官方 H1/G1 人形运控训练框架，基于 legged_gym + Isaac Lab，覆盖 Train→Play→Sim2Sim→Sim2Real 全流程，适配 G1 29-DoF',
    pipeline: ['导入 G1/H1 URDF 29-DoF 模型 → Isaac Lab/Isaac Gym 创建 4096 并行 envs', 'Actor(MLP+ELU): 观测(关节角+IMU+速度+历史)→关节目标位置', 'Critic(MLP+ELU): 估计 V(s)，非对称特权信息(地面摩擦/外力/接触力)', 'PPO+GAE 训练，域随机化(质量±30%/摩擦±50%/电机延迟+观测噪声)', 'Sim2Sim: Isaac→MuJoCo 校验策略在两个仿真器中表现一致', '导出 JIT/TorchScript → unitree_sdk2(CycloneDDS) → 真机 H1/G1 执行'],
    softwareStack: ['Python', 'PyTorch', 'Isaac Lab/Isaac Gym', 'MuJoCo', 'unitree_sdk2', 'CycloneDDS', 'ROS2'],
    rendering: 'Isaac Gym 基础 OpenGL(训练)，真机 RealSense D435i(推理)',
    simulator: 'Isaac Lab / Isaac Gym (PhysX) + MuJoCo (Sim2Sim 校验)',
    system: '独立 Python 训练脚本 → unitree_sdk2 (CycloneDDS/ROS2) 真机部署',
    architecturePattern: 'legged_gym 派生 + unitree_sdk2 桥接：训练侧用 Isaac Lab 标准 RL 管线，部署侧通过 CycloneDDS 零拷贝发布关节指令到真机控制器',
    algorithms: ['PPO + GAE', 'Asymmetric AC (特权信息)', 'Domain Randomization', 'Sim2Sim 校验', 'AMP (Motion Prior)'],
  },

  'amp-mimic': {
    overview: 'Xue Bin Peng 的对抗运动先验(AMP)+深度模仿学习(DeepMimic)框架，赋予人形极具人类质感的自然步态与动作风格',
    pipeline: ['准备参考运动数据(MoCap/动捕/动画) → 定义 Style Discriminator(判别器) → PPO 策略训练时同时骗过判别器(让机器人动作看起来像参考运动) → 判别器不断学习区分真人和机器人 → 对抗训练收敛 → 策略学会自然拟人步态'],
    softwareStack: ['Python', 'PyTorch', 'Isaac Gym', 'MuJoCo'],
    rendering: 'Isaac Gym OpenGL',
    simulator: 'Isaac Gym / MuJoCo',
    system: '独立 Python 训练脚本',
    architecturePattern: 'GAN+RL 融合：PPO 策略(Generator) vs Style Discriminator，对抗训练使策略输出的动作分布逼近人类参考运动分布',
    algorithms: ['AMP (Adversarial Motion Prior)', 'DeepMimic', 'PPO', 'GAN-style Training', 'Motion Style Transfer'],
  },

  'nvidia-cosmos-world': {
    overview: 'NVIDIA Cosmos 世界模型平台(Cosmos-Transfer + Cosmos-Predict)，Transfer 消除视觉 Sim2Real Gap，Predict 做物理推演',
    pipeline: ['Cosmos-Transfer: 仿真渲染图 → Video-to-Video 翻译为真实感图像 → VLA 在真实感数据上训练', 'Cosmos-Predict: 当前帧+动作指令 → Transformer 预测未来多帧(物理推演) → 策略在预测的未来帧上做规划'],
    softwareStack: ['Python', 'PyTorch', 'CUDA', 'TensorRT', 'HuggingFace'],
    rendering: 'Transfer 模型输入仿真渲染图，输出真实感翻译图',
    simulator: 'NVIDIA Cosmos (神经世界模型，可替代/增强传统仿真器)',
    system: '独立 Python 推理服务',
    architecturePattern: '双模型世界平台：Cosmos-Transfer(风格迁移=消除视觉Gap)+Cosmos-Predict(视频预测=替代物理引擎)',
    algorithms: ['Video Diffusion/Flow Matching', 'Sim2Real Domain Transfer', 'Neural Physics Prediction', 'OpenMDW-1.1'],
  },

  'openpi': {
    overview: 'Physical Intelligence 开源 VLA 模型(π0/π0.5)，基于流匹配的端到端动作生成，SigLIP ViT+Gemma 多模态融合，提供完整 Checkpoint 与微调工具链',
    pipeline: ['SigLIP ViT 多视角 RGB 编码 → Gemma/LLaMA 语言编码 → MLP 本体感受编码 → Transformer 多模态融合 → 流匹配 ODE 动作解码 → Euler/RK4 积分生成动作序列 → 导出部署'],
    softwareStack: ['PyTorch', 'JAX(可选)', 'HuggingFace Transformers', 'LeRobot', 'Open X-Embodiment'],
    rendering: '纯真机数据驱动(训练无需渲染)，可选 MuJoCo Sim2Sim',
    simulator: '无需仿真器(真机数据驱动)',
    system: '独立 Python 推理(可封装为 ROS2 节点)',
    architecturePattern: '端到端 VLA + 流匹配：SigLIP ViT+Gemma+MLP → Transformer → Flow Matching ODE 动作头，推理只需 10-50 步',
    algorithms: ['Flow Matching (Conditional ODE)', 'SigLIP ViT', 'Multi-Head Self-Attention', 'Cross-Embodiment Transfer', 'LoRA Fine-tuning'],
  },

  // ========== 训练框架 ==========
  'skrl': {
    overview: '模块化强化学习库，同时支持 PyTorch/JAX/Warp 三种后端，无缝对接 Isaac Lab 和 MuJoCo Playground',
    pipeline: ['选择后端(PyTorch/JAX/NVIDIA Warp) → 配置 Agent(Actor+Critic网络) → 选择算法(PPO/SAC/TD3) → 对接仿真器(Isaac Lab/MuJoCo Playground) → 并行训练 → 导出模型'],
    softwareStack: ['Python', 'PyTorch', 'JAX', 'NVIDIA Warp'],
    simulator: 'Isaac Lab / MuJoCo Playground (后端无关)',
    system: '独立 Python 库 (无 ROS 依赖)',
    architecturePattern: '多后端抽象层 + Agent 工厂模式，算法与仿真器解耦',
    algorithms: ['PPO', 'SAC', 'TD3', 'DDPG', 'CrossQ'],
  },

  'humanoidverse': {
    overview: '上交 LeCAR-Lab 的多仿真器解耦训练框架，支持 Isaac Gym/Isaac Lab/Genesis 三个后端',
    pipeline: ['加载 URDF 人形模型 → 选择仿真后端(IsaacGym/IsaacLab/Genesis) → 统一 Observation/Action 接口 → PPO 训练 → Sim2Sim 跨仿真器校验 → 导出部署'],
    softwareStack: ['Python', 'PyTorch', 'Isaac Gym', 'Isaac Lab', 'Genesis', 'MuJoCo'],
    simulator: 'Isaac Gym / Isaac Lab / Genesis (多后端切换)',
    system: '独立 Python 脚本',
    architecturePattern: '多仿真器适配层，统一接口下可切换物理后端，实现真正跨引擎的 Sim2Sim',
    algorithms: ['PPO', 'Sim2Sim 校验', 'Domain Randomization', 'Asymmetric AC'],
  },

  'asap': {
    overview: 'LeCAR-Lab 的 Delta Action 残差修正框架(RSS 2025)，在真机运行时实时学习残差动作补偿仿真误差',
    pipeline: ['仿真预训练策略 → 零样本真机部署 → 在线采集(真机状态+仿真理想动作) → 训练 Delta Action Model → 残差修正后的动作 = 仿真动作 + Delta 修正 → 真机执行'],
    softwareStack: ['Python', 'PyTorch', 'Isaac Gym', 'Genesis'],
    simulator: 'Isaac Gym / Genesis',
    system: '独立 Python + ROS2 桥接(真机通信)',
    architecturePattern: '残差学习架构：基础策略(仿真训练) + 在线 Delta Model(真机微调)',
    algorithms: ['PPO (基础策略)', 'Delta Action Model (残差网络)', 'Online Fine-tuning'],
  },

  'eureka': {
    overview: 'NVIDIA 的 LLM 自动生成 RL 奖励函数框架，用 GPT 编写和进化奖励函数代码，替代人工试错',
    pipeline: ['输入任务描述(自然语言) → LLM(GPT-4)生成初始奖励函数代码 → Isaac Gym 训练评估 → LLM 根据训练结果反思并改进奖励函数 → 迭代多轮 → 最优奖励函数 + 策略'],
    softwareStack: ['Python', 'GPT-4 API', 'Isaac Gym'],
    simulator: 'Isaac Gym',
    system: '独立 Python + OpenAI API',
    architecturePattern: 'LLM-in-the-Loop：LLM 生成代码 → 仿真评估 → 反馈 → LLM 改进，闭环进化',
    algorithms: ['LLM Reward Generation', 'Evolutionary Search', 'PPO (底层训练)'],
    rendering: '无需渲染(GPT 文本交互)',
  },

  'mujoco-playground': {
    overview: 'Google DeepMind 基于 MJX(JAX)的端到端 GPU 训练平台，单卡数分钟完成人形步态训练',
    pipeline: ['加载 MJCF/URDF 人形模型 → MJX GPU 并行 32768+ envs → JAX PPO 训练(纯 GPU 端到端) → JIT 编译加速 → 导出策略 → Sim2Real 部署'],
    softwareStack: ['Python', 'JAX', 'MJX', 'Brax', 'MuJoCo'],
    simulator: 'MuJoCo MJX (JAX GPU)',
    system: '独立 Python (纯 JAX 生态，无 ROS)',
    architecturePattern: '端到端 GPU 训练：物理步进+神经网络推理+梯度更新全在 GPU 上完成，无 CPU-GPU 数据传输瓶颈',
    algorithms: ['PPO (JAX 实现)', 'SAC', 'Domain Randomization', 'JIT 编译'],
    rendering: 'MuJoCo 基础渲染(可选，训练时通常关闭)',
  },

  'dial-mpc': {
    overview: 'LeCAR-Lab 的采样 GPU MPC 框架，无需 RL 训练即可直接上线控制，全阶力矩级输出',
    pipeline: ['加载 URDF 模型 → 定义代价函数(跟踪/平衡/能耗) → GPU 并行采样数千条候选轨迹 → 评估每条轨迹的代价 → 选最优轨迹的前几步执行 → 滚动时域重复'],
    softwareStack: ['Python', 'PyTorch', 'MuJoCo'],
    simulator: 'MuJoCo',
    system: '独立 Python (无 ROS 依赖)',
    architecturePattern: '采样 MPC：GPU 暴力采样替代解析优化，无需梯度/训练，即插即用',
    algorithms: ['Sampling-based MPC', 'GPU Parallel Rollout', 'Full-order Torque Control'],
  },

  // ========== 仿真器 ==========
  'genesis-world': {
    overview: '统一物理 AI 仿真平台，支持刚体/柔体/液体/气体/可变形物体，高速可微分物理计算',
    pipeline: ['场景构建(代码/导入) → 选择物理求解器(刚体/柔体/流体) → GPU 并行物理步进 → 可微分物理梯度回传 → RL 训练 / 系统辨识 → 导出策略'],
    softwareStack: ['Python', 'CUDA', 'Taichi (可选)'],
    simulator: 'Genesis (自研统一物理引擎)',
    system: '独立 Python 库',
    architecturePattern: '统一物理求解器架构：同一框架内处理多种物理现象(刚体+柔体+流体)，全部 GPU 加速+可微分',
    algorithms: ['可微分物理(全微分)', 'GPU 并行仿真', 'Material Point Method (MPM)', 'RL'],
  },

  'genie-sim': {
    overview: '智元 LLM 驱动的大规模具身场景生成平台，用自然语言快速构建室内家庭与工业数字孪生',
    pipeline: ['自然语言描述场景需求 → LLM 生成场景布局+物体摆放 → Isaac Sim 渲染场景 → 自动生成交互任务 → RL/VLA 策略训练'],
    softwareStack: ['Python', 'LLM(智元自研)', 'Isaac Sim'],
    simulator: 'Isaac Sim (PhysX 5)',
    system: '独立 Python + Isaac Sim',
    architecturePattern: 'LLM-to-Scene：自然语言→3D数字孪生场景的端到端生成，智能体训练数据工厂',
    algorithms: ['LLM 场景生成', '程序化内容生成', 'Domain Randomization'],
    rendering: 'Isaac Sim RTX 光追',
  },

  'lingbot-world': {
    overview: '蚂蚁灵波 14B MoE 生成式世界模型，720P/60fps 实时动作互动，不依赖传统物理引擎',
    pipeline: ['输入当前帧+动作指令 → 14B MoE Transformer 预测下一帧 → 720P/60fps 实时生成 → VLA 策略在这个"神经世界"中训练 → 部署真机'],
    softwareStack: ['Python', 'PyTorch', 'CUDA'],
    simulator: '无(自研生成式神经世界模型，替代传统物理引擎)',
    system: '独立 PyTorch 推理',
    architecturePattern: '生成式世界模型：14B 参数 MoE Transformer 直接预测未来视频帧，替代传统物理引擎的步进计算',
    algorithms: ['MoE Transformer', 'Video Prediction', 'Flow Matching', 'Neural Rendering'],
  },

  'gewu-unity': {
    overview: '国地中心基于 Unity 的 RL 训练环境，集成青龙/灵龙公版机标准 URDF，一键式训练',
    pipeline: ['导入青龙/灵龙 URDF → Unity 场景搭建 → RL 训练(ML-Agents/自定义) → 策略导出 → 青龙/灵龙真机部署'],
    softwareStack: ['C# / Unity', 'Python (RL训练)', 'ML-Agents'],
    simulator: 'Unity (PhysX)',
    system: 'Unity + Python ML-Agents',
    architecturePattern: 'Unity RL Playground：游戏引擎作为仿真后端，提供高保真渲染+物理，面向国地中心公版机',
    algorithms: ['PPO', 'SAC', 'ML-Agents'],
    rendering: 'Unity 引擎渲染',
  },

  'robocasa': {
    overview: 'UT Austin/Stanford 的 100+ 家庭场景仿真基准，包含 HumanoidBench 27 项全身协调测试',
    pipeline: ['加载场景(100+厨房/客厅/卧室) → 加载人形机器人模型 → 选择任务(导航/操作/交互) → 标准化评估协议 → 策略测试 → 输出 benchmark 分数'],
    softwareStack: ['Python', 'MuJoCo', 'robosuite'],
    simulator: 'MuJoCo (robosuite 框架)',
    system: '独立 Python',
    architecturePattern: 'Benchmark-as-Sim：仿真环境即标准化测试，100+场景+27任务提供统一的评估协议',
    algorithms: ['Imitation Learning', 'RL Baseline', 'HumanoidBench 评估协议'],
  },

  'gazebo': {
    overview: 'ROS/ROS2 生态标准仿真器，原生 ROS2 集成，多物理后端可选，多传感器系统联调首选',
    pipeline: ['SDF/URDF 模型导入 → 选择物理引擎(ODE/Bullet/DART) → 加载传感器插件(相机/LiDAR/IMU) → ros2_control 控制器加载 → ROS2 topic 收发 → 算法联调测试'],
    softwareStack: ['C++', 'ROS2', 'Gazebo Sim (Ignition)', 'ros2_control', 'SDFormat'],
    simulator: 'Gazebo (ODE/Bullet/DART)',
    system: 'ROS2 Humble (原生集成)',
    architecturePattern: 'ROS2 原生仿真器：通过 ros2_control 和 sensor plugins 实现与真机完全相同的 ROS2 接口，代码零修改切换',
    algorithms: ['PID', '阻抗控制', 'SLAM', 'Navigation2', 'MoveIt2'],
    rendering: 'Ogre2 (中等保真)',
  },

  'newton': {
    overview: 'NVIDIA PhysX 5 独立物理引擎，高保真接触动力学，不依赖 Omniverse 即可使用',
    pipeline: ['导入 URDF/MJCF → PhysX 5 GPU 加速物理步进 → 高保真接触/摩擦/碰撞解算 → Python/C++ API 获取状态 → 策略训练/验证'],
    softwareStack: ['C++', 'Python bindings', 'CUDA'],
    simulator: 'Newton (PhysX 5 内核)',
    system: '独立 C++/Python 库 (无 ROS 依赖)',
    architecturePattern: '独立物理引擎：与 Isaac Sim 共享 PhysX 5 内核，但去除 Omniverse 依赖，更轻量',
    algorithms: ['Contact Dynamics', 'GPU 加速碰撞检测'],
  },

  // ========== 控制系统 ==========
  'unitree-sdk': {
    overview: '宇树官方第二代通信 SDK，CycloneDDS 亚毫秒级延迟，完全兼容 ROS2 Humble',
    pipeline: ['安装 SDK(apt/pip) → 配置 DDS(CycloneDDS/FastDDS) → 连接机器人(以太网/WiFi) → 订阅关节状态 topic → 发布关节指令 topic → 集成自定义算法'],
    softwareStack: ['C++', 'Python', 'CycloneDDS', 'ROS2 Humble', 'unitree_sdk2'],
    simulator: '无需仿真器(直接真机通信)，可搭配 Isaac Lab 做训练',
    system: 'ROS2 Humble (CycloneDDS)',
    architecturePattern: 'DDS 发布/订阅：所有数据(关节状态/IMU/相机)和指令(关节目标/力矩)通过 DDS topic 传递，去中心化无 Master 节点',
    algorithms: ['DDS 通信', 'CycloneDDS 低延迟', 'ROS2 节点化'],
  },

  'booster-studio': {
    overview: '加速进化全球首款具身智能 IDE，图形化 3D 节点编程 + 一键 Sim2Real 编译部署',
    pipeline: ['创建项目(Booster Studio IDE) → 3D 节点图拖拽编程 → 仿真验证(内置 Isaac Sim/MuJoCo) → 一键编译 → Sim2Real 部署到 Booster 真机 → 在线调试'],
    softwareStack: ['C++', 'Python', 'Isaac Sim', 'MuJoCo', 'Booster SDK'],
    simulator: 'Isaac Sim / MuJoCo / Webots (多后端)',
    system: '自研 IDE + ROS2',
    architecturePattern: '图形化 IDE：3D 节点图代表数据流和控制流，编译后生成 C++/Python 代码，降低具身开发门槛',
    algorithms: ['Visual Programming', 'Sim2Real 一键编译', '在线调试'],
  },

  'groot-wbc': {
    overview: 'NVIDIA 统一人形全身力矩控制平台，解耦 WBC + GEAR-SONIC 行为模型',
    pipeline: ['输入任务(站立/行走/操作) → WBC 解算器分解为各关节力矩(1000Hz) → 约束优化:平衡>操作>姿态 → 力矩指令下发 → 真机执行'],
    softwareStack: ['C++', 'CUDA', 'Eigen', 'OSQP (QP求解器)'],
    simulator: 'Isaac Sim (PhysX 5)',
    system: '独立 C++ 库 + ROS2 桥接',
    architecturePattern: '解耦 WBC：任务优先级 QP 优化 → 关节力矩，支持力控和位控两种模式',
    algorithms: ['QP 优化(OSQP)', '阻抗控制', '逆动力学', '接触力分配'],
  },

  'ocs2-pinocchio': {
    overview: 'ETH Zurich 的最经典开源 MPC+动力学库组合，学界全身轨迹优化标准方案',
    pipeline: ['加载 URDF(Pinocchio 计算运动学/动力学) → 定义 MPC 优化问题(OCS2) → 求解最优轨迹(在线/离线) → 发送关节轨迹到 ros_control → 真机执行'],
    softwareStack: ['C++', 'Eigen', 'Pinocchio', 'OCS2', 'HPIPM (QP求解器)'],
    simulator: 'Gazebo / MuJoCo (ROS 集成)',
    system: 'ROS/ROS2 (ros_control 集成)',
    architecturePattern: '分层优化：OCS2(MPC 轨迹优化) + Pinocchio(高效动力学) + ros_control(硬件抽象)',
    algorithms: ['非线性 MPC', '全身轨迹优化', '递归牛顿-欧拉算法(RNEA)', 'QP 求解'],
  },

  // ========== VLA 模型 ==========
  'psi-zero': {
    overview: 'USC PSI Lab 的全尺寸人形 Loco-Manipulation 基础模型(RSS 2026)，9个真机任务超越商业基线 40%+',
    pipeline: ['视觉编码(ResNet/ViT) → 状态编码(关节+IMU+历史) → Transformer 融合 → 扩散策略头输出动作 → 仿真预训练(Isaac Lab) → Sim2Real 真机部署'],
    softwareStack: ['Python', 'PyTorch', 'Isaac Lab', 'ROS2'],
    simulator: 'Isaac Lab (PhysX 5)',
    system: '独立 Python 推理 + ROS2 部署',
    architecturePattern: 'Loco-Manipulation 统一 Transformer：同一模型处理行走+操作，高容错潜空间控制',
    algorithms: ['Transformer', 'Diffusion Policy', 'Loco-Manipulation Joint Training'],
    rendering: '真机 RealSense 相机',
  },

  'lingbot-vla': {
    overview: '蚂蚁灵波通用跨本体 VLA，2万小时真机训练，适配 17 家厂商 20+ 种机器人形态',
    pipeline: ['视觉编码(多视角 RGB)→语言编码(LLM)→状态编码(本体感受)→Transformer 融合→流匹配动作头→后训练适配新本体(LoRA)'],
    softwareStack: ['Python', 'PyTorch', 'HuggingFace', 'LoRA'],
    simulator: '真机数据驱动(微调时可选 Isaac Sim)',
    system: '独立 Python 推理服务(可封装为 ROS2 节点)',
    architecturePattern: '跨本体 VLA + LoRA 后训练：预训练覆盖 20+ 本体 → LoRA 快速适配新机器人',
    algorithms: ['MoE Transformer', 'Flow Matching', 'LoRA', 'Cross-Embodiment Transfer'],
  },

  'unifolm-vla': {
    overview: '宇树首个端到端 VLA 大脑，WMA-0 世界模型+动作框架，在 G1 上完成 12 类长程日常操作',
    pipeline: ['视觉输入 → UnifoLM-VLA 推理(世界模型预测+动作生成) → 动作映射到 G1 29-DoF 关节 → unitree_sdk2 下发 → 真机执行'],
    softwareStack: ['Python', 'PyTorch', 'unitree_sdk2'],
    simulator: 'Isaac Lab (训练) + 真机 G1 (推理)',
    system: '独立 Python + unitree_sdk2(ROS2)',
    architecturePattern: '世界模型+动作联合框架(WMA-0)：先预测未来状态再生成动作，提高长程一致性',
    algorithms: ['World Model', 'Flow Matching', 'G1 Body Mapping'],
  },

  'agibot-go': {
    overview: '智元 ViLLA 架构 VLA，InternVL-2B 视觉主干 + 隐式动作标记(Implicit Action Token)',
    pipeline: ['RGB 图像输入 → InternVL-2B 视觉编码 → 语言指令编码 → ViLLA 跨模态融合 → 隐式动作标记解码 → AimRT 下发 X1 本体'],
    softwareStack: ['Python', 'PyTorch', 'InternVL-2B', 'AimRT'],
    simulator: 'Isaac Sim (训练) + Genie Sim (场景)',
    system: 'AimRT (智元中间件)',
    architecturePattern: 'ViLLA 架构：视觉+语言+动作三模态端到端，隐式动作标记压缩动作空间',
    algorithms: ['ViLLA (Vision-Language-Latent-Action)', 'InternVL-2B', 'Implicit Action Token'],
  },

  'galaxea-g05': {
    overview: '星海图 Fast-WAM 世界模型 + 双系统全身智能 VLA，跨场景零样本泛化',
    pipeline: ['视觉+语言输入 → Fast-WAM 世界模型预测 → 双系统:快(反射200Hz)+慢(推理10Hz) → 动作生成 → 真机执行'],
    softwareStack: ['Python', 'PyTorch'],
    simulator: '自研仿真',
    system: '独立 Python + 自研控制',
    architecturePattern: 'Fast-WAM 双系统：世界模型预测 + 快慢双通道控制，零样本跨场景迁移',
    algorithms: ['Fast-WAM (World-Action Model)', 'Dual-System Control', 'Zero-Shot Transfer'],
  },

  'holomotion': {
    overview: '地平线 MoE Transformer 通用人形全身控制模型，Any Pose/Command/Terrain/Embodiment',
    pipeline: ['输入(姿态+指令+地形+本体信息) → MoE Transformer 路由到相关专家 → 专家网络输出关节轨迹 → 全身控制器执行'],
    softwareStack: ['Python', 'PyTorch', 'CUDA'],
    simulator: 'Isaac Sim',
    system: '独立 Python 推理',
    architecturePattern: 'MoE 全身控制：不同专家处理不同地形/姿态，门控网络自动选择',
    algorithms: ['MoE Transformer', 'Whole-Body Control', 'Any-4 Generalization'],
  },

  'hex-vla': {
    overview: 'Open-X-Humanoid Qwen-VL + 流匹配动作头 VLA，12M+ 帧跨本体预训练',
    pipeline: ['Qwen-VL 视觉语言编码 → 本体感知预测器 → 流匹配动作头 → 全身动作生成 → 跨本体部署'],
    softwareStack: ['Python', 'PyTorch', 'Qwen-VL', 'HuggingFace'],
    simulator: 'Isaac Sim + MuJoCo',
    system: '独立 Python + ROS2 桥接',
    architecturePattern: 'Qwen-VL + 流匹配：开源大模型视觉能力 + 高效动作生成，12M 帧预训练',
    algorithms: ['Qwen-VL (Vision-Language)', 'Flow Matching', 'Proprioception Predictor', 'Cross-Embodiment Pretraining'],
  },

  'dexora': {
    overview: '清华 36-DoF 灵巧手 VLA(ICRA 2026 最佳论文提名)，100K 仿真+12.2K 真机，成功率 90%+',
    pipeline: ['视觉输入(RGB+深度) → 分布式注意力 VLA → 36-DoF 灵巧手动作生成 → 双手协调执行'],
    softwareStack: ['Python', 'PyTorch', 'ROS2'],
    simulator: 'Isaac Sim + MuJoCo',
    system: 'ROS2 部署',
    architecturePattern: '分布式注意力：36-DoF 高维动作空间拆分为多个注意力区域，各自独立计算再融合',
    algorithms: ['Distributed Attention VLA', 'SAC + Demo Augmentation', 'Bimanual Coordination'],
  },

  'rdt2': {
    overview: '清华 thu-ml 1.2B 参数扩散/流匹配基础动作模型，46数据集 1M+ 轨迹预训练',
    pipeline: ['加载预训练权重 → 输入多模态观测 → RDT2 Transformer 推理 → 扩散/流匹配动作解码 → 适配新任务(少量微调)'],
    softwareStack: ['Python', 'PyTorch', 'HuggingFace Datasets'],
    simulator: '无需仿真器(纯数据驱动)',
    system: '独立 Python',
    architecturePattern: '大规模预训练动作模型：46 数据集联合训练 → 零样本/少样本迁移新任务',
    algorithms: ['Diffusion Policy', 'Flow Matching', '1.2B Transformer', 'Multi-Dataset Pretraining'],
  },

  'nvidia-cosmos': {
    overview: 'NVIDIA 通用物理世界基础模型平台，Cosmos-Transfer 消除视觉 Sim2Real Gap，Cosmos-Predict 推演物理演化',
    pipeline: ['Cosmos-Transfer: 仿真渲染图 → 迁移为真实感图像(Video-to-Video Translation) → VLA 策略在真实感图像上训练', 'Cosmos-Predict: 当前帧+动作 → 预测未来帧(物理推演) → 策略在"神经世界模型"中规划'],
    softwareStack: ['Python', 'PyTorch', 'CUDA', 'TensorRT'],
    simulator: 'NVIDIA Cosmos (自研世界模型，替代传统仿真器)',
    system: '独立 Python 推理服务',
    architecturePattern: '世界模型平台：Transfer(域迁移)+Predict(物理推演)，两个模型组合替代传统渲染管线',
    algorithms: ['Video Diffusion/Flow', 'Sim2Real Domain Transfer', 'Neural Physics Prediction', 'OpenMDW-1.1'],
  },

  'oasis-world-model': {
    overview: 'Decart/Etched 开源交互式 20FPS 视频世界模型(500M/1.2B)，动作条件约束实时生成',
    pipeline: ['输入当前帧+动作指令 → Oasis Transformer → 生成下一帧(20FPS) → 策略在这个"神经世界"中训练 → 实现了无渲染的交互式仿真'],
    softwareStack: ['Python', 'PyTorch'],
    simulator: '无(自研神经世界模型)',
    system: '独立 PyTorch 推理',
    architecturePattern: '纯神经仿真：不需要传统渲染管线，Transformer 直接根据动作预测视频帧',
    algorithms: ['Diffusion Transformer (DiT)', 'Interactive World Model', 'Action-Conditioned Generation'],
  },

  'worldgen-embodied': {
    overview: 'Stanford SVL DiT 生成式 3D 世界模型，自然语言或单张照片直接生成带物理碰撞的交互世界',
    pipeline: ['输入(文字描述/单张照片) → DiT 生成 3D 场景 → 自动添加物理碰撞体 → 导入仿真器训练策略'],
    softwareStack: ['Python', 'PyTorch', 'Diffusion Transformer'],
    simulator: '任意仿真器(生成后可导入 MuJoCo/Isaac)',
    system: '独立 Python',
    architecturePattern: 'Text/Image-to-3D-World：生成式 AI 创建仿真环境，物理碰撞自动生成',
    algorithms: ['Diffusion Transformer (DiT)', '3D Gaussian Splatting', 'Physics Collision Generation'],
  },

  // ========== 数据集 ==========
  'agibot-world-ds': {
    overview: '智元百万级真机具身数据集，100% 真实物理场景，覆盖商业/家庭/工业多场景',
    pipeline: ['遥操作数据采集(VR/动捕/主从) → 同步记录(RGB+关节+力矩+音频) → 数据清洗+标注 → 发布到 HuggingFace → 训练 VLA/模仿学习'],
    softwareStack: ['Python', 'HuggingFace Datasets', 'LeRobot 格式'],
    system: '独立 Python 数据集加载(无 ROS 依赖)',
    architecturePattern: '百万级真实数据工厂：多场景遥操作采集 → 统一格式 → 直接训练',
    algorithms: ['ACT', 'Diffusion Policy', 'Flow Matching', 'Imitation Learning'],
  },

  'robomind-ds': {
    overview: '国地中心 400K+ 轨迹巨型人形数据集，6 种构型 739 项任务，含高维阵列触觉',
    pipeline: ['天工/青龙等多本体遥控采集 → 阵列触觉传感器记录 → 400K+ 轨迹标注 → HuggingFace 发布 → 跨本体训练'],
    softwareStack: ['Python', 'HuggingFace Datasets'],
    system: '独立 Python',
    architecturePattern: '多本体统一数据集：6 种机器人构型统一到标准 55 维动作空间',
    algorithms: ['Multi-Embodiment Training', 'Tactile Data Processing'],
  },

  'humanoid-everyday-ds': {
    overview: 'USC 多模态人形数据集，10.3k 轨迹/300万帧，9 种感知模态(含 LiDAR+触觉+IMU)',
    pipeline: ['Unitree G1/H1 遥控采集 → 9 模态同步记录(RGB/Depth/LiDAR/Tactile/IMU/Audio) → 时间对齐 → 发布'],
    softwareStack: ['Python', 'ROS2 bag', 'HuggingFace'],
    system: 'ROS2 录制 + HuggingFace 发布',
    architecturePattern: '9 模态同步采集：唯一同时包含 LiDAR+触觉+多视角的人形数据集',
    algorithms: ['Multi-Modal Learning', 'Sensor Fusion'],
  },

  'open-x-embodiment-ds': {
    overview: 'DeepMind 全球最大跨形态数据集，22 种机器人/500+技能/100万+ Episodes',
    pipeline: ['21 家机构贡献数据 → 统一数据格式(RLDS) → TensorFlow/PyTorch 加载 → 跨本体预训练 → RT-1/RT-2 等模型'],
    softwareStack: ['Python', 'TensorFlow Datasets', 'PyTorch'],
    system: '独立 Python (RLDS 格式)',
    architecturePattern: '联邦数据集：全球机构贡献 → 统一格式 → 跨本体大规模预训练',
    algorithms: ['RT-1', 'RT-2', 'Cross-Embodiment Pretraining'],
  },

  'egoscale-ds': {
    overview: 'NVIDIA 2万小时人类第一人称视频集，验证了人类视频规模与 VLA 性能的 Log-linear Scaling Law',
    pipeline: ['人类佩戴头戴相机录制日常操作 → 视频+动作标注 → EgoScale 预训练 → VLA 策略性能与视频时长呈对数线性增长'],
    softwareStack: ['Python', 'PyTorch', 'CUDA'],
    system: '独立数据集',
    architecturePattern: '人类视频 Scaling Law：不是采集机器人数据，而是采集人类第一人称视频来训练机器人',
    algorithms: ['EgoScale Log-linear Scaling Law', 'Video Pretraining', 'Imitation from Humans'],
  },

  'unitree-g1-ds': {
    overview: '宇树官方 G1 真机操作数据集，拧瓶盖/倒水/叠衣服等日常双手动作',
    pipeline: ['G1 遥控/自动采集 → 29-DoF 关节+视觉同步录制 → 宇树格式 → 训练模仿学习/VLA'],
    softwareStack: ['Python', 'unitree_sdk2', 'HuggingFace'],
    system: 'unitree_sdk2 + ROS2 录制',
    architecturePattern: 'G1 官方数据集：宇树提供最高质量的 G1 本体训练数据',
    algorithms: ['ACT', 'Diffusion Policy', 'Imitation Learning'],
  },

  'droid-dataset': {
    overview: 'Stanford/Berkeley/CMU 联合的 76K+ 分布式操作数据集，跨 18 实验室 86 场景',
    pipeline: ['18 个实验室用统一协议采集 → 76K 轨迹上传 → 联邦数据集 → 跨场景泛化训练'],
    softwareStack: ['Python', 'PyTorch', 'HuggingFace'],
    system: '独立 Python (统一协议)',
    architecturePattern: '分布式联邦采集：18 个实验室统一采集协议，数据多样性极高',
    algorithms: ['Multi-Scene Transfer', 'Imitation Learning'],
  },

  'lerobot-hub': {
    overview: 'HuggingFace LeRobot 社区数据集 Hub，一键加载各种双臂/人手示教数据',
    pipeline: ['pip install lerobot → 选择数据集 → 一键下载 → PyTorch Dataset 加载 → 训练 ACT/Diffusion/Flow Matching'],
    softwareStack: ['Python', 'PyTorch', 'HuggingFace Hub', 'LeRobot'],
    system: '独立 Python (LeRobot 生态)',
    architecturePattern: 'Hub 模式：社区贡献数据集 → 统一 API → 一键加载训练',
    algorithms: ['ACT', 'Diffusion Policy', 'VQ-BeT', 'Flow Matching'],
  },

  // ========== 四足→人形方案 ==========
  'mit-cheetah': {
    overview: 'MIT 四足 WBC/MPC/状态估计软件栈，人形控制的重要参考架构',
    pipeline: ['状态估计(Kalman Filter+IMU+编码器) → 凸优化 MPC 求解地面反力 → WBC QP 分配关节力矩 → 关节伺服执行'],
    softwareStack: ['C++', 'Eigen', 'LCM (Lightweight Communications)', 'Qt (GUI)'],
    system: '独立 C++ (LCM 通信，可桥接 ROS)',
    architecturePattern: '分层控制：状态估计→MPC 地面反力→WBC 关节力矩，凸优化 QP 保证实时性',
    algorithms: ['Convex MPC', 'WBC QP', 'Kalman Filter', 'Gait Scheduler'],
  },

  'unitree-go2-stack': {
    overview: '宇树 Go2 四足 RL 训练栈，H1/G1 人形运控的直接技术前身',
    pipeline: ['Go2 URDF → legged_gym 派生 PPO 训练 → 域随机化 → 策略部署到 Go2(CycloneDDS) → 相同管线用于 H1/G1(换 URDF+运动学参数)'],
    softwareStack: ['Python', 'PyTorch', 'legged_gym', 'Isaac Gym', 'unitree_sdk2'],
    system: 'unitree_sdk2 (CycloneDDS + ROS2)',
    architecturePattern: '四足→人形管线复用：换 URDF + 调运动学参数 + 增加上肢 DoF，管线完全不变',
    algorithms: ['PPO + GAE', 'Domain Randomization', 'Asymmetric AC'],
  },

  'solo12-odri': {
    overview: 'MPI/NYU 全开源力矩控制四足平台，Pinocchio+TSID WBC 栈，可直接迁移至双足平衡',
    pipeline: ['组装 Solo12 硬件 → 刷入 BLDC 固件 → Pinocchio 运动学+动力学建模 → TSID WBC 全身力控 → 真机力矩控制'],
    softwareStack: ['C++', 'Python', 'Pinocchio', 'TSID', 'ROS2'],
    system: 'ROS2',
    architecturePattern: '力控优先：QDD 电机 + Pinocchio 动力学 + TSID 任务空间逆动力学，力矩控制从四足迁移到双足',
    algorithms: ['TSID (Task Space Inverse Dynamics)', 'Pinocchio Kinematics', 'QP WBC'],
  },

  'raisim': {
    overview: 'ETH 高速腿足物理引擎，接触动力学比 MuJoCo 快 3-5 倍，GR00T 训练后端之一',
    pipeline: ['URDF 导入 → RaiSim GPU 物理步进(接触/摩擦/碰撞) → Python/C++ API 获取状态 → PPO 训练 → 导出策略'],
    softwareStack: ['C++', 'Python', 'CUDA'],
    system: '独立 C++/Python 库',
    architecturePattern: '高速接触求解器：专为腿足接触优化，比通用引擎(MuJoCo)快 3-5 倍',
    algorithms: ['高速接触动力学', 'GPU 并行 RL', '腿足专用物理'],
  },

  'champ-framework': {
    overview: 'ROS 模块化四足运动控制框架，MPC+WBC+FSM 分层架构，OpenLoong/Asimov 参考了其设计',
    pipeline: ['加载 URDF → FSM 步态状态机生成步态模式 → MPC 计算质心轨迹+足端力 → WBC QP 分解关节力矩 → ros_control 执行'],
    softwareStack: ['C++', 'ROS', 'Eigen', 'OSQP'],
    system: 'ROS (ros_control)',
    architecturePattern: 'FSM→MPC→WBC 三级分层：步态模式→质心规划→关节力矩，可迁移至人形双足',
    algorithms: ['Finite State Machine (FSM)', 'MPC', 'WBC QP', 'Gait Planning'],
  },

  'deep-robotics-sdk': {
    overview: 'Deep Robotics 工业四足 Python/C++ SDK，GPU PPO 训练管线可改造用于人形工业部署',
    pipeline: ['安装 SDK → 连接 Lite3/X30 → 订阅传感器数据 → 发布运动指令 → 集成自定义 AI 模块'],
    softwareStack: ['C++', 'Python', 'ROS2'],
    system: 'ROS2',
    architecturePattern: '工业级四足 SDK：GPU PPO 训练 + 多模态感知融合 + C++/Python 双语言',
    algorithms: ['PPO', 'Multi-Modal Perception', 'Industrial Deployment'],
  },

  'open-quadruped': {
    overview: 'Stanford Pupper 极低成本(<$500)全开源四足教育平台，CPG+IMU 平衡控制，入门级人形双足理解起点',
    pipeline: ['3D 打印/购买套件 → 组装 → 烧录固件(Arduino/ESP32) → CPG 步态生成 → IMU 反馈平衡 → Python/ROS 遥控'],
    softwareStack: ['Python', 'Arduino/PlatformIO', 'ROS'],
    system: 'ROS + Arduino',
    architecturePattern: '极简入门：CPG 中央模式发生器 + IMU PD 平衡，不到 1000 行代码',
    algorithms: ['CPG (Central Pattern Generator)', 'IMU PD Control', 'Inverse Kinematics'],
  },

  // ========== 开源平台 ==========
  'berkeley-lite': {
    overview: 'UC Berkeley $5000 极低成本双足人形，3D 打印齿轮箱+准直驱电机，Isaac Lab 训练',
    pipeline: ['3D 打印 CAD 部件 → 组装 QDD 电机+碳纤维骨架 → 树莓派+Teensy 主控 → Isaac Lab 步态训练 → Sim2Real 真机部署'],
    softwareStack: ['Python', 'Isaac Lab', 'MuJoCo', 'ROS2(可选)'],
    system: '独立 Python(训练) + Teensy 固件(控制)',
    architecturePattern: '极简双足：QDD 本体感知+3D 打印，最小可行人形研究平台',
    algorithms: ['PPO', 'Domain Randomization', 'QDD Force Control'],
  },

  'agibot-x1': {
    overview: '智元量产级模块化人形，完整开源设计资料 + AimRT 中间件 + 灵渠 OS，EtherCAT 全关节力控',
    pipeline: ['开源 CAD/PCB 制造 → 组装 FSA 关节模组 → AimRT 中间件(ROS2/EtherCAT) → Isaac Sim 训练 → 灵渠 OS 部署'],
    softwareStack: ['ROS2', 'AimRT', '灵渠 OS', 'Isaac Sim', 'EtherCAT'],
    system: '灵渠 OS (AimRT + ROS2 + EtherCAT)',
    architecturePattern: '三大开源组件：硬件(CAD/PCB)+中间件(AimRT)+OS(灵渠)，EtherCAT 全关节力控',
    algorithms: ['PPO + Sim2Real', 'EtherCAT 力位混合控制', 'AimRT 高并发调度'],
  },

  'openloong': {
    overview: '国地中心国家级公版人形平台，青龙/灵龙双版本，龙腾 2.0B 模型 + 格物仿真',
    pipeline: ['设计图纸(OpenAtom 开源) → 国产化关节模组制造 → 格物(Unity)仿真验证 → 龙腾 2.0B 模型训练 → 昇腾/Jetson 部署 → 青龙/灵龙真机'],
    softwareStack: ['ROS2', '龙腾 2.0B', '格物(Unity)', '昇腾 Atlas', 'OpenAtom'],
    system: 'ROS2 + 格物 (Unity RL Playground)',
    architecturePattern: '国家公版机：统一 URDF+统一仿真+统一模型，华为昇腾生态',
    algorithms: ['龙腾 2.0B VLA', 'RL (格物)', 'EtherCAT 力控'],
  },

  'lerobot-humanoid': {
    overview: 'HuggingFace $2500 桌面级 3D 打印人形，LeRobot Python 库驱动 Dynamixel 舵机',
    pipeline: ['3D 打印 STL 部件 → 组装 Dynamixel 舵机 → 树莓派 5 + U2D2 → LeRobot Python 录制示教 → 训练 ACT/Diffusion → 推理执行'],
    softwareStack: ['Python', 'LeRobot', 'PyTorch', 'Dynamixel SDK'],
    system: 'LeRobot Python (无 ROS 依赖)',
    architecturePattern: '极简数据驱动：3D 打印 + Dynamixel + LeRobot 一键录制+训练，适合模仿学习入门',
    algorithms: ['ACT', 'Diffusion Policy', 'VQ-BeT', 'Flow Matching'],
  },

  'fourier-n1': {
    overview: '傅利叶开源通用人形硬件蓝图+Python SDK，FSA 自研关节 + EtherCAT 全关节力控',
    pipeline: ['结构蓝图+装配指南 → FSA 关节模组制造 → EtherCAT 通信 → Python SDK 控制 → Isaac Sim/MuJoCo 训练 → 真机部署'],
    softwareStack: ['Python', 'FSA SDK', 'Isaac Sim', 'MuJoCo', 'EtherCAT'],
    system: 'Python SDK + EtherCAT (ROS2 可选)',
    architecturePattern: '工业康复技术下放：FSA 自研关节 + 工业级 EtherCAT 力控 + 开源 Python SDK',
    algorithms: ['EtherCAT Force Control', 'Impedance Control', 'RL'],
  },

  'asimov-v1': {
    overview: 'Menlo Research 模块化 DIY 人形，完整 CAD+电气图纸+Isaac Sim 仿真模型',
    pipeline: ['CAD 机械设计+电气图纸 → CNC+3D 打印制造 → 树莓派+STM32 主控 → Isaac Sim 仿真验证 → 板载软件部署'],
    softwareStack: ['Python', 'Isaac Sim', 'ROS2(可选)'],
    system: '自研板载控制软件 (STM32 底层)',
    architecturePattern: '模块化 DIY：每个肢体独立模块，插拔式组装，完整的 CAD+电气+仿真开源',
    algorithms: ['PPO', 'CAN 总线控制', 'IMU 姿态估计'],
  },

  'k-bot': {
    overview: 'K-Scale Labs 低成本双足(已停运)，树莓派+CAN+Dynamixel，全套软硬件开源',
    pipeline: ['3D 打印/CNC 制造 → 组装 Dynamixel+CAN 总线 → 树莓派 4B + Python SDK → 步态策略训练 → 真机行走'],
    softwareStack: ['Python', 'Dynamixel SDK', 'CAN'],
    system: '独立 Python SDK (无 ROS)',
    architecturePattern: '树莓派+CAN+Dynamixel：三件套低成本方案，Python SDK 可直接编程控制',
    algorithms: ['Inverse Kinematics', 'PD Control', 'CAN 通信'],
  },

  'reachy-2': {
    overview: 'Pollen Robotics 开源交互双臂机器人(HuggingFace 收购)，ROS2 Humble + VR 遥操作',
    pipeline: ['组装 Reachy 2(双臂+表情头部) → ROS2 Humble 驱动 → VR 遥操作录制示教 → LeRobot 训练 → 推理执行'],
    softwareStack: ['ROS2 Humble', 'Python', 'LeRobot', 'VR SDK'],
    system: 'ROS2 Humble',
    architecturePattern: '交互机器人：双臂+表情头部，VR 遥操作数据采集+ROS2 执行',
    algorithms: ['Inverse Kinematics', 'VR Teleoperation', 'Imitation Learning'],
  },

  'openarm': {
    overview: 'Enactic 开源双臂力反馈机器人($6500)，LeRobot 集成+双向力反馈遥操作',
    pipeline: ['组装 OpenArm(CAD开源) → Dynamixel+CAN 驱动 → LeRobot 录制主从力反馈数据 → 训练 → 双臂协调执行'],
    softwareStack: ['Python', 'LeRobot', 'Dynamixel SDK'],
    system: '独立 Python (LeRobot 生态)',
    architecturePattern: '力反馈双臂：主从双向力控，操作者能感受到机器人端的阻力',
    algorithms: ['Bilateral Force Feedback', 'ACT', 'Diffusion Policy'],
  },

  'tienkung': {
    overview: '国地中心天工全尺寸双足，URDF+训练框架开源，AMP 拟人步态+LeRobot 集成',
    pipeline: ['天工 URDF(Open-X-Humanoid) → Isaac Lab/Isaac Gym 步态训练 → AMP 拟人风格 → LeRobot 操作训练 → 真机验证'],
    softwareStack: ['Python', 'Isaac Lab', 'AMP', 'LeRobot', 'MuJoCo'],
    system: 'ROS2 + 自研控制器',
    architecturePattern: '天工 Lab：URDF 模型 + Isaac Lab 训练 + AMP 步态风格 + LeRobot 操作',
    algorithms: ['AMP (Adversarial Motion Prior)', 'PPO', 'Sim2Sim 校验'],
  },

  'booster-system': {
    overview: '加速进化清华背景 RoboCup 人形平台，Booster Gym/Train/Studio IDE，本体闭源但 SDK 开源',
    pipeline: ['Booster Studio IDE 编程 → 3D 节点图拖拽 → Booster Gym/Train 仿真训练 → 一键 Sim2Real 编译 → Booster 真机部署'],
    softwareStack: ['C++', 'Python', 'Booster Studio IDE', 'Isaac Lab', 'MuJoCo', 'Webots'],
    system: 'Booster Studio IDE + ROS2',
    architecturePattern: 'IDE 驱动开发：图形化 3D 节点图 → 自动生成代码 → 一键 Sim2Real',
    algorithms: ['PPO', 'Sim2Real', 'Visual Programming'],
  },

  'unitree-h1': {
    overview: '宇树 H1 全尺寸人形，首个实现后空翻，自研 M107 关节+3D LiDAR+CycloneDDS 通信',
    pipeline: ['H1 硬件(宇树闭源) → unitree_sdk2(CycloneDDS+ROS2) → unitree_rl_gym 训练 → Isaac Lab 仿真 → Sim2Real 真机部署'],
    softwareStack: ['unitree_sdk2', 'ROS2', 'unitree_rl_gym', 'Isaac Lab', 'CycloneDDS'],
    system: 'unitree_sdk2 (CycloneDDS + ROS2)',
    architecturePattern: 'H1 全尺寸+后空翻：自研大扭矩 M107 关节 + 3D LiDAR + CycloneDDS 亚毫秒通信',
    algorithms: ['PPO + Domain Rand', '3D LiDAR SLAM', 'CycloneDDS 通信'],
  },

  'unitree-g1': {
    overview: '宇树 G1 29-DoF 中尺寸人形，灵巧操作主力，UnifoLM-VLA+WMA-0 具身大脑',
    pipeline: ['G1 硬件 → unitree_sdk2 → unitree_rl_gym 运控训练 → UnifoLM-VLA 推理 → WMA-0 世界模型规划 → 真机执行'],
    softwareStack: ['unitree_sdk2', 'ROS2', 'unitree_rl_gym', 'UnifoLM-VLA', 'WMA-0'],
    system: 'unitree_sdk2 (ROS2)',
    architecturePattern: 'G1 灵巧操作：29-DoF + 灵巧手 + VLA 大脑 + 世界模型，宇树最具性价比的开放平台',
    algorithms: ['UnifoLM-VLA', 'WMA-0 (World Model)', 'PPO + Domain Rand'],
  },
};
