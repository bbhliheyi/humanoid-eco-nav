# 🤖 人形机器人开源生态导航

> 每个项目标注：**开源内容是什么** + **架构链路** + **部署方式**。链接 GitHub 缩为仓库名，官网缩为品牌名。

**🌐 在线访问**：[bbhliheyi.github.io](https://bbhliheyi.github.io/humanoid-eco-nav)
**📦 源码仓库**：[github.com/bbhliheyi](https://github.com/bbhliheyi/humanoid-eco-nav)

---

## Phase 1: 数字孪生

> 仿真器 + URDF + RL 训练耦合推进。先在数字世界让机器人走起来。

### 仿真引擎 (14)

| 项目 | 开源内容 |
|------|---------|
| [Isaac Sim](https://developer.nvidia.com/isaac/sim) `NVIDIA` | SDK+Python API+Extensions 开源；PhysX 5+Omniverse RTX 渲染核心免费但闭源。ROS2 Bridge 原生集成。 |
| [MuJoCo](https://github.com/google-deepmind/mujoco) `DeepMind` | 完整 C 源码+Python bindings+JAX GPU(MJX 32768 envs)+可微分物理+MJPC 实时 MPC。Apache-2.0。 |
| [Genesis](https://github.com/Genesis-Embodied-AI/genesis-world) `社区` | 统一物理全源码(刚体/柔体/流体/气体)+GPU加速+全可微。Apache-2.0。 |
| [Gazebo](https://github.com/gazebosim/gz-sim) `开源` | 完整 C++ 源码+ROS2 插件生态。ODE/Bullet/DART 多后端可选。多传感器联调首选。Apache-2.0。 |
| [Newton](https://developer.nvidia.com/physx-sdk) `NVIDIA` | PhysX 5 SDK 免费，核心闭源。高保真接触动力学+摩擦建模。NVIDIA EULA。 |
| [Genie Sim](https://github.com/AgibotTech/genie_sim) `智元` | LLM 驱动场景生成 Python 代码。数字孪生产线。Apache-2.0。 |
| [LingBot-World](https://github.com/Robbyant) `蚂蚁` | 14B MoE 生成式世界模型权重+推理。720P/60fps 实时交互。Custom License。 |
| [格物](https://openloong.openatom.cn) `国地中心` | Unity RL Playground+青龙/灵龙 URDF+ML-Agents 配置。OpenAtom。 |
| [RoboCasa](https://github.com/robocasa/robocasa) `UT Austin` | 100+ 家庭场景 MuJoCo 模型+27项 HumanoidBench 评估+Baseline。MIT。 |
| [WorldGen](https://github.com/svl-stanford/worldgen) `Stanford` | DiT 3D 场景生成权重+推理+物理碰撞自动生成。文字→可交互仿真。Apache-2.0。 |
| [RaiSim](https://raisim.com) `ETH` | Python/C++ API 学术免费。高速接触动力学比 MuJoCo 快 3-5 倍。GR00T 训练后端。商用需授权。 |
| [unitree_mujoco](https://github.com/unitreerobotics/unitree_mujoco) `宇树` | H1/G1/Go2 MJCF 模型+MuJoCo 场景+sdk2 集成+地形生成器。BSD-3。 |
| [unitree_sim](https://github.com/unitreerobotics/unitree_sim_isaaclab) `宇树` | H1/G1 Isaac Lab 环境+数据采集回放+模型验证工具。BSD-3。 |
| [EmbodiedGen](https://github.com/HorizonRobotics/EmbodiedGen) `地平线` | 文字/照片→3D 场景生成+多后端导出(Isaac/MuJoCo/SAPIEN/Genesis)。Apache-2.0。 |

### 训练框架 (14)

| 项目 | 开源内容 |
|------|---------|
| [Isaac Lab](https://github.com/isaac-sim/IsaacLab) `NVIDIA` | 完整 Python 训练框架：Obs/Reward/DomainRand Manager 模块化架构 + PPO/SAC/TD3/Dreamer + ONNX/TensorRT 导出 + ROS2 部署。PhysX 5 GPU 4096+ envs。Apache-2.0。 |
| [legged_gym](https://github.com/leggedrobotics/legged_gym) `ETH` | 极简单文件 PPO+GAE+域随机化训练脚本+四足/人形 URDF。人形 RL 事实标准基线。BSD-3。 |
| [MuJoCo Playground](https://github.com/google-deepmind/mujoco_playground) `DeepMind` | 纯 JAX GPU 端到端 PPO(物理+推理+梯度全在 GPU)+人形步态示例。单卡数分钟训练。Apache-2.0。 |
| [unitree_rl_gym](https://github.com/unitreerobotics/unitree_rl_gym) `宇树` | G1/H1 完整 Train→Play→Sim2Sim→Sim2Real。非对称 AC(特权信息)+域随机化+ONNX→sdk2→真机。BSD-3。 |
| [Humanoid-Gym](https://github.com/roboterax/humanoid-gym) `星动纪元` | Sim2Sim 校验框架(Isaac→MuJoCo 自动对比)+XBot URDF+零样本真机部署。MIT。 |
| [HumanoidVerse](https://github.com/LeCAR-Lab/HumanoidVerse) `上交` | 多仿真器统一接口(Isaac/Genesis 一键切换)+Sim2Sim 校验。MIT。 |
| [skrl](https://github.com/Toni-SM/skrl) `社区` | PPO/SAC/TD3/DDPG/CrossQ 多算法+PyTorch/JAX/Warp 三后端。Isaac/MuJoCo 开箱集成。MIT。 |
| [ASAP](https://github.com/LeCAR-Lab/ASAP) `LeCAR-Lab` | Delta Action Model 在线残差学习：仿真预训练→真机在线微调。RSS 2025。MIT。 |
| [Eureka](https://github.com/eureka-research/eureka) `NVIDIA` | LLM(GPT-4)自动生成+进化 RL 奖励函数。DrEureka 自动设计域随机化参数。MIT。 |
| [DeepMimic](https://xbpeng.github.io/projects/AMP) `SFU/Berkeley` | AMP 对抗运动先验+动捕预处理+拟人步态风格判别器。BSD-3。 |
| [DIAL-MPC](https://github.com/LeCAR-Lab/dial-mpc) `LeCAR-Lab` | GPU 暴力采样 MPC 求解器(无需 RL 训练)+MuJoCo 示例。全阶力矩级控制。MIT。 |
| [GR00T-VisualS2R](https://github.com/NVlabs/GR00T-VisualSim2Real) `NVIDIA` | Teacher-Student DAgger 蒸馏(PPO特权→RGB策略)+ONNX+G1 零样本。CVPR 2026。Apache-2.0。 |
| [Genesis-Humanoid](https://github.com/UMass-Embodied-AGI/Genesis-Humanoid) `UMass` | 200K steps/sec@8192 envs + PPO+BC+遥操作。Sim-Real 同代码。Apache-2.0。 |
| [ManiSkill3](https://github.com/haosulab/ManiSkill) `Hillbot` | GPU 并行仿真+PPO/SAC/TD-MPC2 Baseline+Sim2Real 示例+人形任务。Apache-2.0。 |

---

## Phase 2: 硬件驱动

> 电机选型、通信标定、HIL 测试。标注了每项的开源范围。

### 全开源平台

| 平台 | 开源内容 |
|------|---------|
| [roboto_origin](https://github.com/Roboparty/roboto_origin) `萝博` | 全套 CAD/PCB/EBOM/SOP+atom01 软件栈+Party OS。达妙 DM4310 BLDC(腿)+飞特 STS3215(臂)+树莓派4B+STM32F407+ICM-20948+CAN+24V 6S LiPo。淘宝可购零件组装。¥3.5万 23-DoF。Apache-2.0。 |
| [agibot_x1](https://github.com/AgibotTech/agibot_x1) `智元` | 硬件 CAD/PCB+RL 训练(infer/train/hardware 三仓库)+AimRT 中间件+灵渠 OS。自研 FSA 关节+Jetson AGX Orin+BMI088+EtherCAT+RealSense D435i。28-DoF。Apache-2.0。 |
| [OpenLoong](https://openloong.openatom.cn) `国地中心` | 青龙/灵龙全套图纸+电控+URDF+龙腾 2.0B 模型+格物 Unity 仿真。国产化关节+昇腾 Atlas+EtherCAT+TSN。40-DoF。OpenAtom。 |
| [fourier_n1](https://github.com/FFTAI) `傅利叶` | 结构蓝图+装配指南+Python SDK+RL 示例。FSA 自研关节+Jetson Orin+工业 9轴 IMU+EtherCAT+48V。32-DoF。Apache-2.0。 |
| [berkeley_lite](https://github.com/hybridrobotics/berkeley-humanoid-lite) `UC Berkeley` | 3D 打印 STL+齿轮箱 CAD+电路图+Isaac Lab 步态+遥操作代码。QDD 准直驱+T-Motor+树莓派4B+Teensy4.0+MPU6050+CAN+24V LiPo。<$5000 12-DoF。MIT。 |
| [lerobot](https://github.com/huggingface/lerobot) `HuggingFace` | 3D 打印 STL+BOM+LeRobot Python 录制/训练/推理(ACT/Diffusion/Flow Matching)。Dynamixel XL430/XM430+树莓派5+USB 摄像头。~$2500 14-DoF。Apache-2.0。 |
| [asimov-1](https://github.com/asimovinc/asimov-1) `Menlo` | 机械 CAD+电气 CAD+Isaac Sim 仿真+板载固件。T-Motor+3D 打印+树莓派5+STM32H7+ICM-20948+CAN。DIY 18-DoF。MIT。 |
| [Qmini](https://github.com/unitreerobotics/Qmini) `宇树` | BOM+装配指南+RoboTamer4Qmini 控制框架+URDF。Dynamixel 舵机+树莓派5+MPU6050。教育级 12-DoF。BSD-3。 |
| [TienKung](https://github.com/Open-X-Humanoid) `国地中心` | URDF+TienKung-Lab(IsaacLab+AMP)+LeRobot 集成。国产化关节+Jetson/昇腾+EtherCAT。35-DoF。Apache-2.0。 |
| [kbot](https://github.com/kscalelabs/kbot) `K-Scale` | 全套 CAD+软件源码+Python SDK+组装文档。Dynamixel+树莓派4B+STM32+CAN。$8999 15-DoF(已停运)。MIT。 |
| [reachy-2](https://github.com/pollen-robotics) `Pollen(HF)` | 双臂 CAD+ROS2 Humble 驱动+VR 遥操作+Python SDK。HuggingFace 收购。Apache-2.0。 |
| [OpenArm](https://github.com/enactic/OpenArm) `Enactic` | 双臂 CAD+固件+LeRobot 集成+双向力反馈遥操作。Dynamixel。$6500。MIT。 |

### 半开源平台

| 平台 | 开源内容 |
|------|---------|
| [H1/H1-2](https://github.com/unitreerobotics/unitree_sdk2) `宇树` | unitree_sdk2(CycloneDDS+ROS2)+unitree_rl_gym+ROS2 包开源。自研 M107 关节+3D LiDAR+Livox Mid-360+后空翻。本体闭源。BSD-3(SDK)。 |
| [G1](https://github.com/unitreerobotics/unitree_sdk2) `宇树` | 同上+UnifoLM-VLA 权重+WMA-0 世界模型。29-DoF 灵巧操作+腕部相机+灵巧手。本体闭源。BSD-3(SDK)。 |
| [Booster](https://github.com/BoosterRobotics/booster_gym) `加速进化` | Booster Gym/Train/Studio IDE(图形化 3D 节点+一键 Sim2Real)。RoboCup。本体闭源。Proprietary SDK。 |
| [engineai](https://github.com/engineai-robotics) `松延` | 端到端神经网络控制代码+URDF。SA01/PM01 双足。硬件部分闭源。Apache-2.0。 |
| [XBot](https://github.com/roboterax/humanoid-gym) `星动纪元` | Humanoid-Gym 训练框架 MIT 开源。Sim2Sim 校验+零样本。本体闭源。MIT(框架)。 |

### 商用闭源 (26款，供参考)

Tesla Optimus · Figure 02 · Atlas 电动 · 1X Neo · Digit · Apollo · UBTech Walker S · 小米 CyberOne · 达闼 XR4 · 乐聚 KUAVO · Kepler · 星海图 G0/G0.5 · 逐际动力 CL-1 · 魔法原子 · 银河通用 G1 · 众擎 SE01 · 松延 N2 · Fourier GR-2 · PAL TALOS · Kawasaki Kaleido · Toyota T-HR3 · Sanctuary Phoenix · MenteeBot · Rainbow RB-Y1 · 腾讯 Robotics X · XPeng IRON · Dreame

---

## Phase 3: 算法智能

### 真机控制与通信 (13)

| 项目 | 开源内容 |
|------|---------|
| [unitree_sdk2](https://github.com/unitreerobotics/unitree_sdk2) `宇树` | CycloneDDS 亚毫秒 ROS2 通信层 C++/Python 源码+H1/G1/Go2 驱动。发布/订阅去中心化。BSD-3。 |
| [GR00T-WBC](https://github.com/NVlabs/GR00T-WholeBodyControl) `NVIDIA` | QP 优化全身力矩控制器 C++ 源码+解耦 WBC。任务优先级：平衡>操作>姿态。Apache-2.0。 |
| [ocs2+pinocchio](https://github.com/leggedrobotics/ocs2) `ETH` | 非线性 MPC(OCS2)+刚体动力学(Pinocchio)C++ 源码+ros_control。学界标准。BSD-3。 |
| [AimRT](https://github.com/AimRT/AimRT) `智元` | 高性能中间件 C++ 源码。ROS2/HTTP/gRPC 兼容+插件扩展+异构调度。Apache-2.0。 |
| [Open-TeleVision](https://github.com/OpenTeleVision/TeleVision) `UCSD+MIT` | AVP 遥操作 Python 源码+立体视觉+关节重定向+ROS2 桥接。MIT。 |
| [ALOHA](https://github.com/MarkFzp/mobile-aloha) `Stanford` | 双臂 CAD+ACT 训练/推理+遥操作采集+数据集。Leader-Follower 同构。MIT。 |
| [xr_teleop](https://github.com/unitreerobotics/xr_teleoperate) `宇树` | AVP/Quest 双平台遥操作+H1/G1 灵巧手适配。BSD-3。 |
| [OpenWBT](https://github.com/GalaxyGeneralRobots/OpenWBT) `银河+清华` | AVP 全身遥操作(行走+下蹲+弯腰+抓取)+G1/H1 适配。MIT。 |
| [cheetah-software](https://github.com/mit-biomimetics/Cheetah-Software) `MIT` | 凸优化 MPC+WBC QP+卡尔曼状态估计 C++ 源码。人形控制经典参考。MIT。 |
| [odri](https://github.com/open-dynamic-robot-initiative) `MPI/NYU` | BLDC 关节模组 CAD+固件+Pinocchio/TSID WBC+ROS2。力控四足可迁移双足。BSD-3。 |
| [champ](https://github.com/chvmp/champ) `社区` | FSM→MPC→WBC 分层四足控制 ROS 包+Gazebo/MuJoCo。人形参考架构。BSD-3。 |
| [DeepRobotics](https://github.com/DeepRobotics) `深度波动` | Python/C++ SDK+GPU PPO 训练示例。工业四足。Apache-2.0。 |
| [StanfordQuadruped](https://github.com/stanfordroboticsclub/StanfordQuadruped) `Stanford` | 全套 CAD+固件+CPG+IMU 平衡。<$500 入门级。MIT。 |

### VLA 具身大脑 (21)

| 模型 | 开源内容 |
|------|---------|
| [Isaac-GR00T](https://github.com/Nvidia/Isaac-GR00T) `NVIDIA` | 快慢双系统(200Hz反射+10Hz推理)权重+推理+TensorRT+EgoScale 2万h 数据。跨本体零样本。Apache-2.0 可商用。 |
| [openpi](https://github.com/Physical-Intelligence/openpi) `Physical Intel` | π0/π0.5 Flow Matching 权重+推理+微调工具链。SigLIP ViT+Gemma→Transformer→ODE 动作头。Apache-2.0。 |
| [Psi0](https://github.com/physical-superintelligence-lab/Psi0) `USC` | Loco-Manipulation 权重+训练/推理+G1/H1 真机部署。9任务 95%。RSS 2026。MIT。 |
| [lingbot-vla](https://github.com/Robbyant/lingbot-vla) `蚂蚁` | 跨本体后训练框架+LoRA 适配+17厂商20+本体配置。2万h 真机。Apache-2.0。 |
| [HEX](https://github.com/Open-X-Humanoid/HEX) `国地中心` | Qwen-VL+流匹配动作头+12M 帧跨本体预训练数据。Apache-2.0。 |
| [HoloMotion](https://github.com/HorizonRobotics/HoloMotion) `地平线` | MoE Transformer 全身控制权重+推理。Any Pose/Command/Terrain/Embodiment。Apache-2.0。 |
| [unifolm-vla](https://github.com/unitreerobotics/unifolm-vla) `宇树` | VLA 权重+推理+WMA-0 世界模型+G1 29-DoF 映射。12类长程。BSD-3。 |
| [Dexora](https://github.com/dexoravla/Dexora) `清华` | 36-DoF 灵巧手 VLA+分布式注意力+100K 仿真+12.2K 真机。>90%。ICRA 2026。MIT。 |
| [RDT2](https://github.com/thu-ml/RDT2) `清华` | 1.2B 扩散/流匹配权重+46 数据集预处理+训练/微调。1M+ 轨迹。Apache-2.0。 |
| [GEAR-SONIC](https://huggingface.co/nvidia/GEAR-SONIC) `NVIDIA` | 1.2M-42M 行为模型权重+HuggingFace 推理。700h 动捕预训练。Apache-2.0。 |
| [agibot_go](https://github.com/AgibotTech) `智元` | ViLLA VLA 推理+InternVL-2B 视觉主干+隐式动作标记。Apache-2.0。 |
| [Cosmos](https://github.com/nvidia/Cosmos) `NVIDIA` | 世界模型权重(Transfer+Predict)+推理+Post-training。视频域迁移+物理推演。OpenMDW-1.1。 |
| [oasis](https://github.com/decart-ai/oasis) `Decart` | 500M/1.2B 交互式世界模型权重+PyTorch 推理。20FPS 动作条件生成。MIT。 |
| [DexVLA](https://github.com/juruobenruo/DexVLA) `多机构` | Qwen2-VL 基座 VLA 权重+单臂/双臂/灵巧手统一推理。Apache-2.0。 |
| [WholebodyVLA](https://github.com/OpenDriveLab/WholebodyVLA) `上海AI Lab` | 全身移动操作 VLA 权重+潜空间统一表征。行走+操作同时。ICLR 2026。Apache-2.0。 |
| [X-VLA](https://github.com/2toinf/X-VLA) `2toinf` | Soft-Prompt 轻量跨本体适配+权重。AgiBot 挑战赛冠军。ICLR 2026。Apache-2.0。 |
| [InternVLA-M1](https://github.com/InternRobotics/InternVLA-M1) `上海AI Lab` | Qwen2.5-VL 空间引导 VLA 权重+推理。3D 空间理解。MIT。 |
| [DexGraspVLA](https://github.com/Psi-Robot/DexGraspVLA) `灵初+北大` | VLM 规划器+扩散控制器分层代码。>90% 灵巧抓取。AAAI 2026 Oral。Apache-2.0。 |
| [GalaxeaVLA](https://github.com/OpenGalaxea/GalaxeaVLA) `星海图` | 双系统 VLA+Fast-WAM+500h 开放场景数据集。Apache-2.0。 |
| [MiMo-Embodied](https://github.com/XiaomiMiMo/MiMo-Embodied) `小米` | 跨具身统一权重(自动驾驶+机器人)。29 榜单独占鳌头。Apache-2.0。 |
| [RynnVLA-001](https://github.com/alibaba-damo-academy/RynnVLA-001) `阿里` | 视频生成预训练 VLA+人类第一人称 demo。ICRA 2026。Apache-2.0。 |

### 训练数据集 (8)

| 数据集 | 开源内容 |
|--------|---------|
| [AgiBot World](https://agibot-world.com) `智元` | 百万级真机轨迹(RGB+关节+力矩+音频)。100% 真实物理。CC BY-NC 4.0。 |
| [RoboMIND](https://huggingface.co/datasets/x-humanoid-robomind/RoboMIND) `国地中心` | 400K+ 轨迹+6 本体 739 任务+阵列触觉。Apache-2.0。 |
| [Humanoid-Everyday](https://github.com/physical-superintelligence-lab/Humanoid-Everyday) `USC` | 10.3K/300万帧+9 模态(RGB+Depth+LiDAR+Tactile+IMU+Audio)。G1/H1。MIT。 |
| [Open X-Embodiment](https://github.com/google-deepmind/open_x_embodiment) `DeepMind` | 100万+ Episodes+22 种机器人+RLDS 统一格式。CC BY 4.0。 |
| [EgoScale](https://arxiv.org) `NVIDIA` | 2万h 人类第一人称视频。Log-linear Scaling Law 验证。Apache-2.0。 |
| [Unitree G1](https://huggingface.co/UnitreeRobotics) `宇树` | 数万条真机操作(拧瓶盖/倒水/叠衣服)+29-DoF 姿态+视觉。BSD-3。 |
| [DROID](https://droid-dataset.github.io) `Stanford/Berkeley/CMU` | 76K+ 轨迹+18实验室86场景+RGB/Depth/力矩。MIT。 |
| [LeRobot Hub](https://huggingface.co/lerobot) `HuggingFace` | 社区数千条双臂/双手/人形示教。ACT/Diffusion/VQ-BeT 格式。Apache-2.0。 |

---

## Phase 4: 测试部署 + 参考

### 核心论文 (33篇)

| 论文 | 类别 | 会议 | 链接 |
|------|------|------|------|
| legged_gym | Sim2Real | Science Robotics 2022 | [GitHub](https://github.com/leggedrobotics/legged_gym) |
| Humanoid-Gym | Sim2Real | CoRL 2024 | [GitHub](https://github.com/roboterax/humanoid-gym) |
| ASAP | Sim2Real | RSS 2025 | [GitHub](https://github.com/LeCAR-Lab/ASAP) |
| DrEureka | Sim2Real | RSS 2024 | [GitHub](https://github.com/eureka-research/DrEureka) |
| Isaac Gym | Sim2Real | NeurIPS 2021 | [NVIDIA](https://developer.nvidia.com/isaac-gym) |
| Genesis | Sim2Real | arXiv 2024 | [GitHub](https://github.com/Genesis-Embodied-AI/genesis-world) |
| LucidSim | Sim2Real | CoRL 2024 | [GitHub](https://github.com/lucidsim/lucidsim) |
| RT-2 | VLA | CoRL 2023 | [arXiv](https://arxiv.org/abs/2307.15818) |
| RT-1 | VLA | RSS 2023 | [arXiv](https://arxiv.org/abs/2212.06817) |
| Octo | VLA | RSS 2024 | [GitHub](https://github.com/octo-models/octo) |
| Diffusion Policy | VLA | RSS 2023 | [GitHub](https://github.com/columbia-ai-robotics/diffusion_policy) |
| GR00T N1 | VLA | arXiv 2025 | [GitHub](https://github.com/Nvidia/Isaac-GR00T) |
| π0 | VLA | arXiv 2024 | [GitHub](https://github.com/Physical-Intelligence/openpi) |
| EgoScale | VLA | CVPR 2025 | [arXiv](https://arxiv.org) |
| Gato | VLA | arXiv 2022 | [arXiv](https://arxiv.org/abs/2205.06175) |
| HumanPlus | 控制 | CoRL 2024 | [GitHub](https://github.com/ZipengFu/humanplus) |
| OmniH2O | 控制 | CoRL 2024 | [GitHub](https://github.com/CMU-GKG/OmniH2O) |
| Mobile ALOHA | 控制 | arXiv 2024 | [GitHub](https://github.com/MarkFzp/mobile-aloha) |
| ACT | 控制 | CoRL 2023 | [GitHub](https://github.com/tonyzhaozh/act) |
| UMI | 控制 | RSS 2024 | [GitHub](https://github.com/real-stanford/universal_manipulation_interface) |
| H2O | 控制 | CoRL 2023 | [GitHub](https://github.com/ZhengyiLuo/H2O) |
| 3D Diffuser Actor | 控制 | CoRL 2024 | [GitHub](https://github.com/nickgkan/3d_diffuser_actor) |
| Expressive Loco | 控制 | RSS 2024 | [GitHub](https://github.com/hybridrobotics/berkeley-humanoid) |
| Awesome Humanoid 550+ | 综述 | GitHub | [GitHub](https://github.com/YanjieZe/awesome-humanoid-robot-learning) |
| Sim2Real Survey | 综述 | IEEE T-RO 2023 | [IEEE](https://ieeexplore.ieee.org) |
| VLA Survey | 综述 | arXiv 2025 | [arXiv](https://arxiv.org) |
| Humanoid Survey | 综述 | AR 2025 | [arXiv](https://arxiv.org) |
| Imitation Learning Survey | 综述 | AR 2024 | [arXiv](https://arxiv.org) |
| Deep RL for Robotics | 综述 | IEEE T-RO 2021 | [arXiv](https://arxiv.org) |
| PPO | 文献 | arXiv 2017 | [arXiv](https://arxiv.org/abs/1707.06347) |

### 技术百科 (18 术语)

| 类别 | 术语 | 核心要点 |
|------|------|---------|
| 机械结构 | 关节重定向 | IK/AMP/学习三种方法，MPJPE/接触一致性/质心/语义四指标 |
| 硬件 | 驱动关节电机 | BLDC(100-360Nm)/舵机(1-10Nm)/QDD(5-40Nm)，厂商+选型+FOC |
| 硬件 | 主控与计算 | Jetson Orin(275TOPS)/STM32H7/树莓派双层架构，实时性>1kHz |
| 硬件 | IMU 惯性测量 | ICM-20948/BMI088/MPU6050 对比，卡尔曼滤波融合 |
| 硬件 | 通信总线 | EtherCAT(<100μs)/CAN-FD(~1ms)/CAN2.0(~5ms)/TTL 菊花链 |
| 软件 | 实时控制中间件 | FOC→PID→WBC QP→MPC 调用链，RT-Preempt/FreeRTOS |
| 仿真 | 仿真器全景对比 | MuJoCo(JAX最快)/Isaac(光追)/Genesis(可微)/Gazebo(ROS)/Newton |
| 仿真 | Sim2Real 迁移 | 域随机化/Sim2Sim 校验/残差 ASAP/域迁移 Cosmos/系统辨识 |
| 仿真 | 域随机化 | 质量±30%/摩擦[0.2,2.0]/噪声σ=0.01/推力 0-200N |
| RL | Actor-Critic | A2C/A3C/SAC/TD3/PPO 五变体，优势函数 A=Q-V |
| RL | PPO | Clip ε=0.2，GAE λ=0.95，γ=0.99，Adam 3e-4。人形标配 |
| RL | 扩散/流匹配 | DDPM(SDE 100-1000步) vs Flow Matching(ODE 10-50步) |
| 网络 | MLP/Transformer/MoE | RL用MLP(ELU)，VLA用Transformer，大规模用MoE |
| 激活 | ELU/ReLU/GELU/SiLU | RL选ELU(零中心)，VLA选GELU/SiLU(NLP验证) |
| 基础设施 | GPU并行化 | Isaac Lab(4096 envs PhysX) vs MJX(32768 envs JAX) |
| 基础设施 | WBC 全身控制 | 优化型(QP)/学习型(RL)/混合型(ASAP)，四层优先级 |
| VLA | VLA 三种范式 | 端到端(π0)/分层双系统(GR00T)/解耦(LingBot-VLA) |
| VLA | 遥操作数据采集 | AVP($3500)/Quest($500)/动捕($5K-20K)/主从/ALOHA/RGB |

---

## 发展里程碑

2024.03 Humanoid-Gym → 06 HumanPlus → 07 青龙公版 → 12 Genesis/AgiBot World → 2025.03 GR00T N1/格物 → 04 灵犀 X1 → 05 openpi/Berkeley Lite → 06 MuJoCo Playground/ASAP → 10 Eureka → 11 HoloMotion → 12 Dexora/Fourier N1 → 2026.01 roboto_origin → 03 灵渠/Asimov → 04 Psi-Zero → 05 LeRobot/GR00T N1.7 → 06 HEX/Dexora(ICRA) → 07 LingBot-World 2.0/Party OS

---

## 本地运行

```bash
# 克隆仓库
git clone https://github.com/bbhliheyi/humanoid-eco-nav.git
cd humanoid-eco-nav

# 安装依赖
npm install

# 开发模式（热更新，默认 http://localhost:3000）
npm run dev

# 生产构建
npm run build

# 生产预览
npm run preview
```

**技术栈**：React 19 + TypeScript 5.8 + Vite 6 + Tailwind CSS 4 + Lucide React

**项目结构**：
```
src/
├── App.tsx                    # 主应用（路由+状态管理）
├── types.ts                   # TypeScript 类型定义
├── data/
│   ├── humanoidData.ts        # 全部开源项目数据（176条）
│   ├── glossaryData.ts        # 技术百科术语数据（27条）
│   └── techArchitectureData.ts # 架构链路详解数据（64条）
├── components/
│   ├── Navigation.tsx         # 侧边栏导航（按Phase分组）
│   ├── OverviewView.tsx       # 全景总览首页
│   ├── DevelopmentGuide.tsx   # 开发全流程总纲
│   ├── GlossaryView.tsx       # 技术百科（树形架构）
│   ├── DetailModal.tsx        # 项目详情弹窗（硬件规格+架构链路）
│   ├── ProjectCard.tsx        # 项目卡片
│   ├── ProjectTable.tsx       # 项目表格视图
│   └── ...                    # 其他视图组件
```

**数据更新**：编辑 `src/data/humanoidData.ts` 即可修改项目信息，Vite 自动热更新。
